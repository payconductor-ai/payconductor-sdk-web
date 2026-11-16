# 3DS em vendas com cartão tokenizado

> SDK Web (`payconductor-sdk-web`) + monorepo (`server`, `shared`, `iframe`, `link`). Proposta para aprovação.

## Contexto

Venda com cartão tokenizado hoje não passa por 3DS. O bloco 3DS do fluxo pula o token de propósito:

```ts
// server/.../routing-processor/nodes/three-ds/index.ts:76-82
// Os provedores 3DS exigem o número do cartão; cartão tokenizado segue sem 3DS.
if ("token" in payment.card) {
	return await this.follow(FlowEdgeType.Success);
}
```

A cobrança sai sem autenticação mesmo com 3DS configurado no fluxo. Por causa disso, o checkout hospedado tokeniza o cartão e joga o token fora: em `shared/.../credit-card/index.ts` o `_cardToken` não é usado e o `return` com token está comentado.

O atalho existe porque o 3DS precisa do PAN e o pedido tokenizado não tem o PAN à mão. Duas restrições definem a solução:

- O backend não pode devolver o PAN para o browser.
- Pagar.me (`TDS.init` da Stone) e PagSeguro (`authenticate3DS`) rodam o desafio no browser e pedem o número completo. Lyra (agnóstico) autentica no servidor e MercadoPago (`Auto`) usa o próprio token, então esses dois só dependem do backend.

Ou seja, no servidor o PAN pode vir do vault. No browser, só do que o comprador acabou de digitar.

## Decisão

### Backend

| Mudança | Por quê |
|---------|---------|
| O `ThreeDSNode` deixa de pular o token. O `buildAuthContext` busca o PAN no vault (`CardEncryptedPan.getEncryptedPanByCustomerCard`, que a cobrança já usa). | Lyra e a elegibilidade da Pagar.me dependem do número. O vault já tem esse dado e ele não sai do servidor. |
| Campo opcional no cartão do pedido, `panAvailableOnClient` (nome a definir). Sem ele, pedido com token só usa o 3DS agnóstico. | Sem esse sinal, um one-click num fluxo com Pagar.me fica 30 min em `ThreeDsAwaitingChallenge` esperando um desafio que ninguém abre. O default mantém o comportamento seguro. |
| `GET /sdk/three-ds/challenge/:orderId` passa a devolver `cardSummary: { token, bin, lastFour, brand }`. | O SDK consegue conferir se o cartão digitado é o do pedido sem o PAN voltar. O nome não pode ser `card`: o SDK faz `{ ...this.data, ...fullData }` e sobrescreveria o cartão passado pelo dev. |
| `saveFrontTokens` vira upsert. O `creditCard.cardToken` do pedido passa a ser o `card_...` público (hoje é o `customerCardId`). Tokenizar um cartão que já existe regrava o CVV no cache. | Hoje, tokenizar duas vezes duplica `customerCardAcquirerTokens`, o token do pedido não bate com o do Tokenizer e o cartão já salvo fica sem CVV para a cobrança depois do 3DS. |

### SDK

| Mudança | Por quê |
|---------|---------|
| O `card` do 3DS usa o mesmo `CreateCardInput` do Tokenizer (com `cvv`). | O dev monta o cartão uma vez, e o `toThreeDSecureCard` do checkout deixa de existir. |
| Registro de tokens em memória, compartilhado entre Tokenizer e 3DS. | Reaproveita o token em vez de gerar outro, inclusive quando o dev já tokenizou manualmente. |
| O `authenticate()` valida antes do desafio e devolve `CardRequired` ou `CardMismatch` sem chamar `complete`. | Hoje, se o dev esquece o `card`, o provider falha, o `complete` vai como falha técnica e o backend recusa a venda. Um erro de integração não pode derrubar a compra. |
| `authenticate()` em pedido sem desafio devolve `Success` com o status do pedido. | Hoje volta `Failed` (o `GET` do desafio responde 400), o que obriga o dev a chamar `requiresChallenge` antes. |
| Novo `PayConductor3DSSDK.confirmCardPayment()`, também exposto no `useThreeDS`. | É a auto-tokenização. Para pedido criado sem pagamento, ele tokeniza (ou reaproveita), confirma com o token e roda o 3DS numa chamada só. |

## Como fica

Lojista que tokeniza e cria o pedido no próprio backend: o código continua igual. O que muda acontece por dentro (sem tokenização duplicada, com conferência do cartão e sem recusa por erro de integração).

```ts
const card = { number, holderName, cvv, expiration: { month, year } };

const token = await new PayConductorTokenizerSDK(publicKey).tokenizeCard({ card, customer });
const order = await meuBackend.criarPedido({ card: { token, panAvailableOnClient: true } });

// reaproveita o token do registro, confere bin/últimos 4 e usa o PAN só no desafio
const result = await new PayConductor3DSSDK({ orderId: order.id, publicKey, card }).authenticate();
```

Pedido criado sem pagamento (o que `iframe` e `link` fazem hoje na mão):

```ts
const result = await PayConductor3DSSDK.confirmCardPayment({ publicKey, orderId, card, installments: 1 });
// tokeniza ou reaproveita, POST /orders/:id/confirm com { token }, desafio, complete e polling
```

O reuso é um mapa em memória no `globalThis`. Ele fica ali, e não num módulo, porque no CDN o `payconductor-3ds.js` e o `payconductor-tokenizer.js` são IIFEs separadas e não compartilham estado:

```ts
// esboço
const KEY = Symbol.for("payconductor.cardTokens");
const registry: Map<string, Promise<{ token: string; customerId: string }>> =
	((globalThis as any)[KEY] ??= new Map());

// chave: SHA-256 (crypto.subtle) de publicKey + PAN + validade; expira em 30 min, igual ao CVV no cache
// guarda a Promise para um duplo clique reaproveitar a tokenização em andamento
// não guarda PAN nem CVV e nunca vai para localStorage/sessionStorage
```

E a validação antes do desafio, no handler:

```ts
// esboço
if (ProviderClass.requiresCard) { // Pagar.me e PagSeguro
	if (!card) return integrationError(ERROR_CODES.CARD_REQUIRED);
	if (summary && !matches(card, summary)) return integrationError(ERROR_CODES.CARD_MISMATCH);
}
// integrationError devolve Failed sem chamar complete: o desafio segue pendente e dá para tentar de novo
```

## Por que não tokenizar dentro do `authenticate()`

Foi a primeira ideia. Só que, quando o pedido já tem token, o backend já tem o cartão no vault, e tokenizar de novo não acrescenta nada ao 3DS. Gasta chamadas, gera outro token de frente no MercadoPago e hoje ainda duplica linhas no banco. A tokenização automática só faz sentido quando o pedido ainda não tem cartão, e por isso ela fica no `confirmCardPayment`. No `authenticate()`, o SDK só reaproveita o token e confere o cartão.

Também descartamos devolver o PAN no desafio, que é exatamente o que não podemos fazer, e guardar o cartão no `sessionStorage` para sobreviver a reload, que seria armazenar dado de cartão no browser.

## Riscos

- A conferência de bin/últimos 4 ajuda na integração, mas não é controle de segurança, porque o comprador controla o browser. Quem amarra autenticação e cobrança é a adquirente (`transaction_id` da Stone, `id` do PagSeguro). Ainda falta confirmar isso com elas.
- O card token do MercadoPago é de uso único. Reaproveitar o `card_...` não pode significar reaproveitar um token MP já consumido.
- Hash de PAN sem chave é fraco. Por isso o registro fica só em memória e não é logado.

## Entrega

1. Backend: vault no 3DS, `panAvailableOnClient`, `cardSummary`, upsert e alinhamento do `cardToken`.
2. SDK: formato único de cartão, registro, validações e retorno de pedido sem desafio. Sai na 1.x com `card` opcional no tipo e `CardRequired` em runtime, e passa a ser obrigatório no 2.0. Pode andar em paralelo com o item 1, já que sem `cardSummary` o SDK só pula a conferência.
3. `confirmCardPayment` e migração de `shared`, `iframe` e `link` para token.

Depois do deploy do backend: rodar `bun sync` aqui, fazer o bump na raiz para publicar o CDN e rodar `bun update @payconductor/react` em `shared`, `iframe` e `link` antes de ligar o token no checkout.

## Para decidir

1. `panAvailableOnClient` como sinal (e qual nome)? O custo do default seguro é que o lojista que cria o pedido no backend precisa mandar o campo para ter o 3DS da Pagar.me.
2. Sair na 1.x com erro em runtime ou ir direto para a 2.0?
3. No `confirmCardPayment`, a tokenização aceita `orderId` para o backend achar o cliente, ou o pedido expõe o `customerId`? Prefiro `orderId`.
4. Regravar o CVV no cache sempre que um cartão existente for tokenizado de novo?

## Aceite

- [ ] Pedido com token e `panAvailableOnClient`, em fluxo com Pagar.me ou PagSeguro, abre o desafio no browser e cobra autenticado.
- [ ] Pedido com token em fluxo com Lyra autentica sem PAN no browser.
- [ ] Pedido com token, sem o sinal e sem agnóstico disponível, não fica preso em `ThreeDsAwaitingChallenge`.
- [ ] Dois `tokenizeCard` com o mesmo cartão fazem uma chamada só, sem linha duplicada, e o `authenticate()` depois deles não tokeniza.
- [ ] `CardRequired` e `CardMismatch` não chamam `complete`, e o pedido continua aguardando o desafio.
- [ ] Nenhuma resposta da API nem log do SDK contém PAN.

O SDK não tem test runner. A validação é `bun run build`, `npm run lint`, build do `packages/react` e um exemplo novo em `examples/react`. O teste com a Stone precisa de domínio público, porque o sandbox recusa `localhost`.
