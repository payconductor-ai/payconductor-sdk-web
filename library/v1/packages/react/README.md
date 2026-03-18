# @payconductor/react

React SDK for [PayConductor](https://payconductor.ai) payment integration.

[![npm version](https://img.shields.io/npm/v/@payconductor/react.svg?style=flat-square)](https://www.npmjs.com/package/@payconductor/react)

## Requirements

Minimum React version: **v16.8**.

## Installation

```bash
npm install @payconductor/react @payconductor/sdk
# or
yarn add @payconductor/react @payconductor/sdk
# or
pnpm add @payconductor/react @payconductor/sdk
# or
bun add @payconductor/react @payconductor/sdk
```

## Quick Start

```tsx
import {
  PayConductor,
  PayConductorCheckoutElement,
  usePayConductor,
  usePayconductorElement,
  type PaymentMethod,
  type PaymentResult,
} from '@payconductor/react';
import {
  AvailablePaymentMethods,
  Configuration,
  DocumentType,
  OrderApi,
  type OrderCreateRequest,
} from '@payconductor/sdk';

const sdkConfig = new Configuration({
  username: import.meta.env.VITE_PAYCONDUCTOR_CLIENT_ID || 'your_client_id',
  password: import.meta.env.VITE_PAYCONDUCTOR_CLIENT_SECRET || 'your_client_secret',
});
const orderApi = new OrderApi(sdkConfig);

function CheckoutForm() {
  const { isReady, error } = usePayConductor();
  const { confirmPayment, getSelectedPaymentMethod } = usePayconductorElement();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFinalize = async () => {
    if (!isReady) return;
    setIsProcessing(true);
    setErrorMessage(null);

    try {
      // 1. Create the Draft order via @payconductor/sdk to get the orderId
      const orderRequest: OrderCreateRequest = {
        chargeAmount: 100.00,
        clientIp: '0.0.0.0',
        customer: {
          documentNumber: '12345678900',
          documentType: DocumentType.Cpf,
          email: 'customer@example.com',
          name: 'Customer Name',
        },
        discountAmount: 0,
        externalId: `order-${Date.now()}`,
        payment: {
          paymentMethod: 'Draft',
          availablePaymentMethods: [
            AvailablePaymentMethods.CreditCard,
            AvailablePaymentMethods.Pix,
            AvailablePaymentMethods.BankSlip,
          ],
        },
        shippingFee: 0,
        taxFee: 0,
      };
      const { data } = await orderApi.orderCreate(orderRequest);

      // 2. Confirm payment with the obtained orderId
      const result: PaymentResult = await confirmPayment({ orderId: data.id });
      if (result.status === 'succeeded') alert('Payment successful!');
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'Payment failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const selectedMethod = getSelectedPaymentMethod();

  return (
    <div>
      {/* The iframe is rendered here */}
      <PayConductorCheckoutElement height="600px" />

      {selectedMethod && <p>Selected method: <strong>{selectedMethod}</strong></p>}

      <button type="button" onClick={handleFinalize} disabled={!isReady || isProcessing}>
        {isProcessing ? 'Processing...' : 'Checkout'}
      </button>

      {errorMessage && <div>{errorMessage}</div>}
      {error && <div>Error: {error}</div>}
    </div>
  );
}

export default function App() {
  return (
    <PayConductor
      publicKey={import.meta.env.VITE_PAYCONDUCTOR_CLIENT_ID || "your_client_id"}
      locale="pt-BR"
      debug={true}
      theme={{ primaryColor: '#0066ff', borderRadius: '8px' }}
      onReady={() => console.log('Ready')}
      onPaymentComplete={(result: PaymentResult) => console.log('Complete:', result)}
      onPaymentMethodSelected={(method: PaymentMethod) => console.log('Method:', method)}
    >
      <CheckoutForm />
    </PayConductor>
  );
}
```

## API Reference

### `<PayConductor />`

Provider component that initializes the payment session. **Does not render the iframe directly** — use `<PayConductorCheckoutElement>` for that.

| Prop | Type | Description |
|------|------|-------------|
| `publicKey` | `string` | Your PayConductor public key |
| `theme` | `PayConductorTheme` | Theme customization options |
| `locale` | `string` | Locale (e.g. `'pt-BR'`, `'en-US'`) |
| `paymentMethods` | `PaymentMethod[] \| "all"` | Available payment methods |
| `defaultPaymentMethod` | `PaymentMethod` | Pre-selected payment method |
| `paymentMethodsConfig` | `PaymentMethodConfig[]` | Per-method config (installments, discounts) |
| `methodsDirection` | `"vertical" \| "horizontal"` | Layout direction of payment methods |
| `showPaymentButtons` | `boolean` | Show native action buttons inside the iframe |
| `nuPayConfig` | `NuPayData` | Required when NuPay is an available method |
| `debug` | `boolean` | Enable prefixed console.log for key events |
| `onReady` | `() => void` | Called when the iframe is ready |
| `onError` | `(error: Error) => void` | Called when an error occurs |
| `onPaymentComplete` | `(result: PaymentResult) => void` | Called when payment succeeds |
| `onPaymentFailed` | `(result: PaymentResult) => void` | Called when payment fails |
| `onPaymentPending` | `(result: PaymentResult) => void` | Called when payment is pending |
| `onPaymentMethodSelected` | `(method: PaymentMethod) => void` | Called when user selects a payment method |

### `<PayConductorCheckoutElement />`

Renders the payment iframe. Place it inside `<PayConductor>` wherever you want the iframe in your layout.

| Prop | Type | Description |
|------|------|-------------|
| `height` | `string` | Iframe height (default: `'600px'`) |

### `usePayConductor()`

Hook that provides frame state.

```tsx
const { isReady, error } = usePayConductor();
```

| Property | Type | Description |
|----------|------|-------------|
| `isReady` | `boolean` | Whether the iframe is ready |
| `error` | `string \| null` | Error message, if any |

### `usePayconductorElement()`

Hook that provides payment action methods.

```tsx
const {
  init,
  confirmPayment,
  validate,
  reset,
  getSelectedPaymentMethod,
  updateConfig,
  updateorderId,
  update,
  submit,
} = usePayconductorElement();
```

| Method | Signature | Description |
|--------|-----------|-------------|
| `init` | `(config: PayConductorConfig) => Promise<void>` | Sends full config to the iframe |
| `confirmPayment` | `({ orderId: string }) => Promise<PaymentResult>` | Triggers payment confirmation in iframe |
| `validate` | `(data: unknown) => Promise<boolean>` | Validates current form data |
| `reset` | `() => Promise<void>` | Resets the payment form |
| `getSelectedPaymentMethod` | `() => PaymentMethod \| null` | Returns the payment method selected by user |
| `updateConfig` | `(config: Partial<PayConductorConfig>) => void` | Updates theme, locale, or paymentMethods |
| `updateorderId` | `(orderId: string) => void` | Updates the order id in the iframe |
| `update` | `(options: UpdateOptions) => void` | Updates billing details |
| `submit` | `() => Promise<SubmitResult>` | Submits the form (validate + format) |

## TypeScript

```ts
import type {
  PaymentResult,
  PaymentMethod,
  PayConductorTheme,
  PayConductorConfig,
  PaymentConfirmData,
  PixPaymentData,
  CreditCardPaymentData,
  BankSlipPaymentData,
  NuPayPaymentData,
  PicPayPaymentData,
  CardPaymentData,
  BillingDetails,
} from '@payconductor/react';
```

## Payment Flow

```
1. <PayConductor publicKey="pk_xxx"> mounts
   └─ Registers window.PayConductor, stores iframeUrl

2. <PayConductorCheckoutElement /> mounts
   └─ Reads iframeUrl, renders the iframe

3. iframe loads → fetches payment methods → sends Ready
   SDK receives Ready → sends config (theme, locale, paymentMethods)

4. User selects payment method
   └─ onPaymentMethodSelected fires
   └─ getSelectedPaymentMethod() returns the chosen method

5. User clicks "Checkout" (your button, outside the iframe)
   └─ @payconductor/sdk creates Draft order → returns orderId
   └─ confirmPayment({ orderId })
   └─ iframe collects form data → POST /orders/:id/confirm

6. SDK receives PaymentComplete/Failed/Pending → callbacks fire
```

## License

MIT
