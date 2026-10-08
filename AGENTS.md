# AGENTS.md — PayConductor SDK Web

Instruções para agentes de IA (Copilot, Claude, Cursor, etc.) que trabalham neste repositório.

## 1. Idioma e comportamento

- **Sempre se comunique em Português (PT-BR)**, inclusive em explicações, planos e resumos de mudanças.
- Mantenha **termos técnicos em inglês** quando forem nomes próprios de código: comandos, APIs, tipos, arquivos, flags, mensagens de commit e identificadores (ex.: `useStore`, `postMessage`, `PaymentResult`, `bun run build`).
- Seja objetivo. Explique o *porquê* das decisões, não apenas o *o quê*.
- Antes de mudanças não triviais: investigue o contexto, proponha um plano curto e só então edite.
- Nunca invente APIs, scripts ou caminhos. Se algo não existir no repositório, diga explicitamente.

## 2. Visão geral

Monorepo de um SDK de pagamentos multi-framework, construído com **Bun workspaces** e **Mitosis**.

- `package.json` (raiz): privado, `@payconductor/sdk-web-repo`, script `sync`. **A versão na raiz controla o deploy do CDN.**
- `library/v1/`: pacote de build (`@payconductor/sdk-web-v1`, privado) com a fonte (`.lite.tsx` + TS) e o `mitosis.config.cjs`.
- `library/v1/packages/*`: pacotes por framework (`react`, `qwik`, `svelte`, `vue`, `solid`, `angular`). O `react` é publicado como `@payconductor/react`.
- `library/v1/examples/*`: apps de exemplo (Vite/Qwik). O pacote `react` é o que está mais maduro.
- `scripts/sdk.ts`: sincroniza tipos/constantes do iframe remoto.

## 3. Arquitetura e layout

> Regra de ouro: **a fonte da verdade é `library/v1/src/**`**. Tudo em `library/v1/packages/*/src` é **gerado** pelo Mitosis e é apagado a cada build.

- `library/v1/src/index.ts`: superfície pública de exports. Toda API nova precisa ser exportada aqui.
- `library/v1/src/payconductor/`:
  - `*.lite.tsx` — componentes Mitosis: `payconductor.lite.tsx`, `payconductor-element.lite.tsx`, `payconductor-three-ds.lite.tsx`.
  - `internal.ts` — orquestração de postMessage (confirm/validate/reset do pagamento).
  - `constants.ts` — `POST_MESSAGES`, `ERROR_CODES`, `IFRAME_BASE_URL`, `ALLOWED_ORIGINS`.
  - `utils.ts` — helpers (`buildIframeUrl`, `generateRequestId`, `isValidOrigin`).
  - `types.ts` / `iframe/types.ts` — tipos do SDK e do contrato do iframe.
  - `hooks/` — hooks públicos: `use-payconductor.ts`, `use-element.ts` (`usePayconductorElement`), `use-three-ds.ts`, `use-tokenize.ts`, `use-tokenizer.ts`, reexportados por `hooks/index.ts`.
  - `three-ds/` e `tokenizer/` — SDKs especializados, com `api.ts`, `handler.ts`, `providers/` e `types.ts`.
  - `iframe/constants.ts` e `iframe/types.ts` — **arquivos sincronizados** (ver seção 6).
- `library/v1/src/esm/` — entradas dos bundles de CDN (`three-ds.ts`, `tokenizer.ts`) que expõem classes em `window`.

## 4. Comandos

```bash
# Dependências (na raiz)
bun install

# Sincronizar tipos/constantes do iframe (na raiz) — interativo
bun sync

# Build dos componentes Mitosis (gera packages/*/src) — em library/v1
cd library/v1
bun run build          # clean:src + mitosis build
npm run lint           # eslint + regras do @builder.io/mitosis

# Build dos bundles de CDN (esm -> IIFE) — em library/v1
bun run build:sdk      # gera dist/payconductor-3ds.js e dist/payconductor-tokenizer.js

# Build de tudo — em library/v1
npm run build:all

# Build do pacote React (publicado no npm) — em library/v1/packages/react
bun run build          # tsc -b && vite build -> dist/
```

- **Não há test runner nem script de teste neste repositório.** Não assuma `npm test`; valide mudanças manualmente via build/lint e pelos exemplos.
- **Não há CHANGELOG.** O versionamento é lido diretamente dos `package.json`.
- Sempre prefira os scripts existentes (`bun run ...`) em vez de invocar ferramentas cruas (`mitosis`, `esbuild`, `tsc`) diretamente.

## 5. Regras de código

- **Mitosis/JSX**: use `import { onMount, useStore, useRef } from "@builder.io/mitosis"`. O `tsconfig` define `jsxImportSource: "@builder.io/mitosis"`. Siga as regras de `plugin:@builder.io/mitosis/recommended` (evite APIs não suportadas pelos targets).
- **TypeScript**: `strict: true`, mas `noImplicitAny: false`; `moduleResolution: "bundler"`. Prefira `import type` para tipos.
- **Estilo observado**: indentação com **tabs** em `src/**` (alguns `.lite.tsx` usam 4 espaços — siga o arquivo que editar). Aspas duplas em imports. Ponto e vírgula presentes. Nomes de classes/arquivos em kebab-case (`use-payconductor.ts`, `payconductor.lite.tsx`).
- **Comentários**: use comentários curtos em português quando o *porquê* não for óbvio (ex.: regras de acquirer, workarounds). Evite comentar o óbvio.
- **Exports**: toda API pública deve ser re-exportada em `library/v1/src/index.ts`.
- Antes de finalizar: rode `npm run lint` (em `library/v1`) e, se mexeu em `.lite.tsx`, rode `bun run build` para conferir a geração e os erros de tsc.

## 6. Fluxos de trabalho

### Adicionar/alterar um componente ou hook
1. Edite em `library/v1/src/payconductor/**` (nunca em `packages/*/src`).
2. Exporte o que for público em `src/index.ts`.
3. `cd library/v1 && bun run build` para regenerar `packages/*/src` e validar.
4. Se impactar o pacote publicado, builde `packages/react`.

### Alterar tipos/constantes do contrato do iframe
1. **Nunca edite manualmente** `src/payconductor/iframe/types.ts` e `iframe/constants.ts` de forma duradoura.
2. Use `bun sync` (raiz), que baixa `/shared/types.ts` e `/shared/constants.ts`. Em dev aponta para `http://localhost:5175`; em prod para `https://iframe.payconductor.ai`.
3. Se precisar de ajuste local temporário, sinalize claramente que será sobrescrito no próximo sync.

### Adicionar suporte a um novo framework (target Mitosis)
1. Adicione o target em `library/v1/mitosis.config.cjs` (`targets` + `options`).
2. Crie/ajuste o pacote em `library/v1/packages/<framework>` e registre nos workspaces se necessário.
3. Rode `bun run build` e valide o `src` gerado.
4. O bundle de CDN **não** depende de framework; mantenha `src/esm/*` independente.

### Release / deploy do CDN
1. Faça o bump de versão no `package.json` da **raiz**.
2. Merge/push na `main` alterando `package.json`.
3. O workflow `.github/workflows/deploy-cdn.yml` compara `HEAD~1` com `HEAD`; **se a versão mudou**, roda `bun install`, `bun run scripts/build-esm.ts`, sobe para `s3://<bucket>/sdk/v1/<versão>/` e `sdk/v1/latest/`, e invalida o CloudFront de `/sdk/v1/latest/*`.
4. Se a versão **não** mudou, o deploy não roda. Bump é obrigatório para publicar.

## 7. Padrões

- **Comunicação iframe**: sempre via `postMessage` com tipos de `POST_MESSAGES`; valide origem com `ALLOWED_ORIGINS`/`isValidOrigin`. Gere ids de requisição com `generateRequestId()` e respeite `REQUEST_TIMEOUT`.
- **Config do iframe**: monte a URL com `buildIframeUrl({ publicKey })`; nunca concatene query strings manualmente.
- **Hooks**: exponha estado do SDK (`isReady`, `error`) e ações (`confirmPayment`, `getSelectedPaymentMethod`) seguindo o padrão de `use-payconductor.ts` / `use-element.ts`.
- **Providers (3DS/Tokenizer)**: cada acquirer implementa `AbstractThreeDSProvider` em `three-ds/providers/`; registre no índice de providers. Acquires que exigem notificação server-side pós-challenge ficam em `MANUAL_AUTH_ACQUIRERS` (ex.: `IntegrationProvider.PagSeguro` → `completeManualChallenge`).
- **Erros**: use `PayConductorThreeDSApiError` e os códigos de `ERROR_CODES`. Não lance strings soltas.
- **Logs**: use o prefixo `[PayConductor]` e respeite a flag `debug` (não logue em produção).
- **Bundles de CDN**: entradas em `src/esm/*` apenas registram classes/APIs globais; não adicione lógica de negócio nelas.

## 8. Gotchas (armadilhas conhecidas)

- **Mitosis `renameImport`**: a regex `/\.js(['"])/g` remove `.js` de **qualquer** string literal. **Nunca coloque URLs/paths terminando em `.js` em string literal** — use template literals (`` ` ``) para evitar a remoção.
- **`clean:src` apaga `packages/*/src`**: qualquer alteração feita ali some no próximo `bun run build`. Edite só a fonte.
- **Arquivos sincronizados**: `iframe/types.ts` e `iframe/constants.ts` são sobrescritos por `bun sync`.
- **Build do CDN não roda sem bump de versão** na raiz (o workflow compara com o commit anterior).
- **`mitosis.config.cjs` habilita apenas o target `react`** atualmente, embora existam pacotes de outros frameworks.

## 9. Do / Don't

**Faça**
- Editar a fonte em `library/v1/src/**` e reexportar em `src/index.ts`.
- Rodar `bun run build` + `npm run lint` antes de concluir.
- Usar template literals para qualquer texto com `.js`.
- Comunicar-se em português.

**Não faça**
- Editar `library/v1/packages/*/src` (gerado).
- Editar manualmente `iframe/types.ts` / `iframe/constants.ts`.
- Assumir testes automatizados ou CHANGELOG.
- Usar `&&` em comandos PowerShell; encadeie com `;`.
- Publicar/deployar sem bump de versão na raiz.

## 10. Convenções de git, versão e publicação *(inferidas)*

> Estas convenções foram inferidas do repositório e do workflow de deploy; ajuste-as se a equipe usar outro padrão.

- **Idioma de commits e PRs**: português (alinhado ao requisito de comunicação). Use o imperativo e um escopo curto quando fizer sentido, ex.: `feat(three-ds): suporta challenge manual do PagSeguro`, `fix(react): corrige timeout do confirmPayment`.
- **Branches**: trabalho em branch de feature; deploy acontece na `main`.
- **Versão do CDN**: bump no `package.json` **da raiz** é o gatilho de release.
- **Versão de pacotes npm**: cada pacote versiona independentemente (ex.: `library/v1/packages/react/package.json` → `@payconductor/react`), com `publishConfig.access: "public"`.
- **Antes de pedir review**: `bun run build`, `npm run lint` e build do pacote afetado, tudo verde.

## 11. Prompt padrão para a IA

Use como referência ao pedir mudanças:

> "Neste repositório, edite apenas a fonte em `library/v1/src/**` (nunca `packages/*/src`). Ao terminar, exporte APIs públicas em `src/index.ts`, rode `bun run build` e `npm run lint` em `library/v1`, e me responda em português explicando o que mudou e por quê."
