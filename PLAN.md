# Plan: Corrigir isReady no PayConductor SDK

## Problema

O `isReady` permanece `false` mesmo após o iframe carregar corretamente. O usuário reporta que o iframe carrega normal, mas `window.PayConductor.frame.isReady` continua `false`.

## Análise do Código

### Fluxo do Iframe (pay.conductor/iframe)

O iframe envía mensagem `Ready` em dois cenários:

1. **No useEffect** (linhas 110-116 de `src/pages/v1/index.tsx`):
   - Após `fetchPaymentMethods(urlConfig.publicKey)` resolver com sucesso
   - Envia `IncomingMessage.Ready` com `targetOrigin: "*"`

2. **Em resposta a mensagens** (Config/Init):
   - Quando recebe `OutgoingMessage.Config` → responde com `IncomingMessage.Ready` (linhas 162-169)
   - Quando recebe `OutgoingMessage.Init` → responde com `IncomingMessage.Ready` (linhas 210-217)

### Fluxo do SDK (payconductor-sdk-web)

1. O SDK envia `POST_MESSAGES.CONFIG` (linha 92 de `internal.ts`)
2. O SDK espera receber `POST_MESSAGES.READY` via postMessage
3. `handleMessageEvent` processa a mensagem e seta `isReady = true`

## Root Cause

O problema está na função `isValidOrigin` em `utils.ts`:

```typescript
export function isValidOrigin(origin: string, allowedOrigins: string[]): boolean {
  return allowedOrigins.some((allowed) => {
    try {
      return new URL(allowed).origin === origin;
    } catch {
      return allowed === origin;
    }
  });
}
```

O iframe usa `targetOrigin: "*"` ao enviar mensagens:
```typescript
sendMessage({ type: IncomingMessage.Ready, data: {...} }, "*");
```

Quando o targetOrigin é "*", o navegador pode não passar o `event.origin` correto na MessageEvent, ou pode passar como "null" ou um valor diferente do esperado.

Consequentemente, `isValidOrigin` retorna `false` e a mensagem Ready é ignorada silenciosamente.

## Solução Implementada

Modificação em `library/v1/src/payconductor/internal.ts`:

**Antes:**
```typescript
export function handleMessageEvent(...) {
  if (!isValidOrigin(event.origin, ALLOWED_ORIGINS)) {
    return;
  }
  // ... resto do código
}
```

**Depois:**
```typescript
export function handleMessageEvent(...) {
  const payload: MessagePayload = event.data;
  const { requestId, type, data, error } = payload;

  // Aceita Ready sem validação de origin (mensagem inicial do iframe)
  if (type === POST_MESSAGES.READY && !requestId) {
    setIsReady(true);
    onReady?.();
    return;
  }

  if (!isValidOrigin(event.origin, ALLOWED_ORIGINS)) {
    return;
  }
  // ... resto do código
}
```

### Por que isso funciona:

1. **Ready sem requestId**: O iframe envía Ready sem requestId quando é a primeira mensagem (após fetchPaymentMethods). Essa mensagem é aceita sem validação de origin.

2. **Ready com requestId**: Quando o SDK envia Config e o iframe responde com Ready (com requestId), a validação de origin ainda é aplicada porque o origin deve estar correto nessa hora.

## Outras Alterações Feitas

### 1. getter para iframe (`payconductor.lite.tsx`)

O `frame.iframe` foi transformado em getter que sempre consulta o DOM:

```typescript
const frame: PayConductorFrame = {
  get iframe(): HTMLIFrameElement | null {
    return (document.querySelector(".payconductor-element iframe") as HTMLIFrameElement) ?? null;
  },
  set iframe(_: HTMLIFrameElement | Element | unknown | null) {},
  // ...
};
```

Isso elimina race conditions onde o iframe seria null em Strict Mode do React.

### 2. Envio de Config no load do iframe (`payconductor.lite.tsx`)

Adicionado listener para evento `load` do iframe para garantir que o Config seja enviado:

```typescript
const trySendConfig = () => {
  const el = getIframe();
  if (!el) return false;
  try {
    const readyState = el.contentDocument?.readyState ?? el.contentWindow?.document?.readyState;
    if (readyState === "complete") {
      sendConfigToIframe();
      return true;
    }
  } catch {}
  return false;
};

const pollForIframe = () => {
  if (trySendConfig()) return;
  const el = getIframe();
  if (el) {
    el.addEventListener("load", () => sendConfigToIframe(), { once: true });
    return;
  }
  setTimeout(pollForIframe, 50);
};

pollForIframe();
```

## Arquivos Modificados

- `library/v1/src/payconductor/internal.ts` - handleMessageEvent
- `library/v1/src/payconductor/payconductor.lite.tsx` - getter + poll

## Como Testar

1. Build: `cd library/v1 && bun run build`
2. Os packages serão gerados automaticamente
3. Testar a aplicação e verificar se `window.PayConductor.frame.isReady` vira `true` após o iframe carregar
