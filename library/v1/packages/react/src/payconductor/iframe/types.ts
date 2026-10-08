// PayConductor Shared Types
// Served statically at iframe.payconductor.ai/types.ts
// Used by the iFrame (imported directly) and the SDK Web (synced with bun sync)

export enum PaymentMethod {
  Pix = "Pix",
  CreditCard = "CreditCard",
  DebitCard = "DebitCard",
  BankSlip = "BankSlip",
  Crypto = "Crypto",
  ApplePay = "ApplePay",
  NuPay = "NuPay",
  PicPay = "PicPay",
  AmazonPay = "AmazonPay",
  SepaDebit = "SepaDebit",
  GooglePay = "GooglePay",
  Spei = "Spei",
}
export enum CryptoNetwork {
  Ethereum = "ETH",
  Tron = "TRX",
  Polygon = "MATIC",
  Ton = "TON",
  Solana = "SOL",
  Bitcoin = "BTC",
  BinanceSmartChain = "BSC",
}
export enum PaymentMethodLayout {
  Grid = "grid",
  Vertical = "vertical",
  Horizontal = "horizontal",
}
export enum PaymentStatus {
  Succeeded = "succeeded",
  Pending = "pending",
  Failed = "failed",
}
export enum ChargeStatusDetail {
  ThreeDsAwaitingChallenge = "ThreeDsAwaitingChallenge",
}
export enum ThreeDsAuthenticationStatus {
  Authenticated = "Authenticated",
  NotAuthenticated = "NotAuthenticated",
  NeedChallenge = "NeedChallenge",
}
export enum ThreeDSResultStatus {
  Pending = "Pending",
  Authenticated = "Authenticated",
  Failed = "Failed",
  NotEnrolled = "NotEnrolled",
}
export enum DocumentType {
  Cpf = "Cpf",
  Cnpj = "Cnpj",
  Ssn = "Ssn",
  Nif = "Nif",
  Dni = "Dni",
  Sin = "Sin",
  Nid = "Nid",
  Cf = "Cf",
  SteuerId = "SteuerId",
  Cic = "Cic",
  Id = "Id",
  Ci = "Ci",
  Passport = "Passport",
}
export enum IntegrationProvider {
  Asaas = "Asaas",
  Sandbox = "Sandbox",
  SandboxSplit = "SandboxSplit",
  MercadoPago = "MercadoPago",
  NuPay = "NuPay",
  PicPay = "PicPay",
  Woovi = "Woovi",
  EfiBank = "EfiBank",
  BrasPag = "BrasPag",
  PagarMe = "PagarMe",
  BancoDoBrasil = "BancoDoBrasil",
  PagSeguro = "PagSeguro",
  Ebanx = "Ebanx",
  OnlyUp = "OnlyUp",
  Barte = "Barte",
  BarteSplit = "BarteSplit",
  PagSmileA55 = "PagSmileA55",
  Avantti = "Avantti",
  MonsterGateway = "MonsterGateway",
  SAC = "SAC",
}
export enum CardBrand {
  Visa = "Visa",
  Mastercard = "Mastercard",
  AmericanExpress = "AmericanExpress",
  DinersClub = "DinersClub",
  Discover = "Discover",
  JCB = "JCB",
  UnionPay = "UnionPay",
  Maestro = "Maestro",
  Mir = "Mir",
  Elo = "Elo",
  Hiper = "Hiper",
  Hipercard = "Hipercard",
  Verve = "Verve",
  Unknown = "Unknown",
}
export enum OrganizationEnvironment {
  Production = "Production",
  Sandbox = "Sandbox",
}
export enum CurrencyType {
  USD = "USD",
  EUR = "EUR",
  BRL = "BRL",
  ARS = "ARS",
  CAD = "CAD",
  COP = "COP",
  GBP = "GBP",
  JPY = "JPY",
  MXN = "MXN",
  CLP = "CLP",
  PEN = "PEN",
  MZN = "MZN",
  CNY = "CNY",
  SAR = "SAR",
  ETH = "ETH",
  BNB = "BNB",
  BTC = "BTC",
  USDT = "USDT",
  USDC = "USDC",
  DOGE = "DOGE",
  SOL = "SOL",
}
export enum DeviceType {
  Android = "android",
  IOS = "ios",
  Web = "web",
  Chrome = "chrome",
  Safari = "safari",
}
export enum InputStyleKey {
  Padding = "padding",
  Radius = "radius",
  Color = "color",
  Background = "background",
  Shadow = "shadow",
}
export enum OutgoingMessage {
  Init = "Init",
  Config = "Config",
  Update = "Update",
  ConfirmPayment = "ConfirmPayment",
  Validate = "Validate",
  Reset = "Reset",
}
export enum IncomingMessage {
  Ready = "Ready",
  Error = "Error",
  CheckoutSessionCreated = "CheckoutSessionCreated",
  PaymentComplete = "PaymentComplete",
  PaymentFailed = "PaymentFailed",
  PaymentPending = "PaymentPending",
  ValidationError = "ValidationError",
  PaymentMethodSelected = "PaymentMethodSelected",
  Resize = "Resize",
  ThreeDSChallenge = "ThreeDSChallenge",
  ThreeDSComplete = "ThreeDSComplete",
  ThreeDSFailed = "ThreeDSFailed",
}
export enum ErrorCode {
  InvalidClient = "InvalidClient",
  InvalidToken = "InvalidToken",
  NetworkError = "NetworkError",
  IframeNotReady = "IframeNotReady",
  PaymentDeclined = "PaymentDeclined",
  ValidationError = "ValidationError",
  Timeout = "Timeout",
}
export type InputStyleConfig = {
  padding?: string;
  radius?: string;
  color?: string;
  background?: string;
  shadow?: string;
};
export type PaymentMethodsConfig = {
  layout?: PaymentMethodLayout;
  gap?: string;
  inputStyle?: InputStyleConfig;
};
export type PaymentMethodConfig = {
  method: PaymentMethod;
  discount?: number;
  showBrands?: boolean;
  installments?: {
    count: number;
    amount: number;
  }[];
};
export type PaymentMethodsWalletsConfig = {
  googlePay?: {
    gateway: string;
    gatewayMerchantId: string;
    merchantName: string;
  };
  applePay?: {
    merchantName: string;
  };
};
export type PaymentMethodsResponse = {
  methods: PaymentMethod[];
  wallets: PaymentMethodsWalletsConfig;
};
export type ApplePayMerchantValidationResponse = {
  session: {
    epochTimestamp: number;
    expiresAt: number;
    merchantSessionIdentifier: string;
    nonce: string;
    merchantIdentifier: string;
    domainName: string;
    displayName: string;
    signature: string;
    operationalAnalyticsIdentifier: string;
    // Pode conter outros campos, Apple não documenta todos
  };
};
export type PayConductorTheme = {
  primaryColor?: string;
  secondaryColor?: string;
  backgroundColor?: string;
  surfaceColor?: string;
  textColor?: string;
  textSecondaryColor?: string;
  errorColor?: string;
  successColor?: string;
  warningColor?: string;
  borderColor?: string;
  disabledColor?: string;
  fontFamily?: string;
  fontSize?: {
    xs?: string;
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
  };
  fontWeight?: {
    normal?: number;
    medium?: number;
    bold?: number;
  };
  lineHeight?: string;
  spacing?: {
    xs?: string;
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
  };
  borderRadius?: string;
  borderWidth?: string;
  boxShadow?: string;
  boxShadowHover?: string;
  inputBackground?: string;
  inputBorderColor?: string;
  inputBorderRadius?: string;
  inputHeight?: string;
  inputPadding?: string;
  buttonHeight?: string;
  buttonPadding?: string;
  buttonBorderRadius?: string;
  transitionDuration?: string;
  transitionTimingFunction?: string;
};
export const defaultTheme: PayConductorTheme = {
  primaryColor: "#0066ff",
  secondaryColor: "#5a6b7c",
  backgroundColor: "transparent",
  surfaceColor: "#f8fafc",
  textColor: "#0f172a",
  textSecondaryColor: "#64748b",
  errorColor: "#ef4444",
  successColor: "#22c55e",
  warningColor: "#f59e0b",
  borderColor: "#e2e8f0",
  disabledColor: "#cbd5e1",
  fontFamily: '"Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  fontSize: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem"
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    bold: 600
  },
  lineHeight: "1.5",
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px"
  },
  borderRadius: "8px",
  borderWidth: "1px",
  boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  boxShadowHover: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  inputBackground: "#ffffff",
  inputBorderColor: "#cbd5e1",
  inputBorderRadius: "8px",
  inputHeight: "44px",
  inputPadding: "12px 16px",
  buttonHeight: "48px",
  buttonPadding: "16px 24px",
  buttonBorderRadius: "8px",
  transitionDuration: "0.2s",
  transitionTimingFunction: "ease"
};
export type PayConductorConfig = {
  publicKey: string;
  merchantId?: string;
  theme?: PayConductorTheme;
  locale?: string;
  paymentMethods?: PaymentMethod[] | "all";
  defaultPaymentMethod?: PaymentMethod;
  paymentMethodsConfig?: PaymentMethodConfig[];
  methodsDirection?: "vertical" | "horizontal";
  showPaymentButtons?: boolean;
  height?: string;
  /** Required when NuPay is an available payment method */
  nuPayConfig?: NuPayData;
};
export type BillingDetails = {
  name: string;
  email?: string;
  phone?: string;
  address?: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
};
export type CardData = {
  number: string;
  expMonth: string;
  expYear: string;
  cvc: string;
};
export type CreatePaymentMethodOptions = {
  billingDetails: BillingDetails;
  card?: CardData;
};
export type PaymentMethodResult = {
  id: string;
  type: PaymentMethod;
  card?: {
    brand: string;
    last4: string;
    expMonth: number;
    expYear: number;
  };
  billingDetails?: BillingDetails;
};
export type ThreeDSecureBrowserData = {
  ip?: string;
  userAgent?: string;
  acceptHeader?: string;
  language?: string;
  colorDepth?: string;
  screenHeight?: string;
  screenWidth?: string;
  timeZoneOffset?: string;
  javaEnabled: boolean;
  javaScriptEnabled: boolean;
};
export type ThreeDSecureInternalInput = {
  type: "internal";
  authToken?: string;
  dsTransactionId?: string;
  providerTransactionId?: string;
  browser?: ThreeDSecureBrowserData;
};
export type ThreeDSecureExternalInput = {
  type: "external";
  status: string;
  eci: string;
  version: string;
  cavv: string;
  providerTransactionId: string;
  directoryTransactionId: string;
  browser?: ThreeDSecureBrowserData;
};
export type ThreeDSecureInput = ThreeDSecureInternalInput | ThreeDSecureExternalInput;

// ---------- Payment Result ----------
// Espelha `orderConfirmedResponseModel` do servidor de forma autossuficiente,
// sem importar de `@server/models`, mantendo compatibilidade com
// `OrderConfirmedResponseSerialized`.

export type TransactionParty = {
  name: string | null;
  document: string | null;
  bankIspb: string | null;
  bankAccount: string | null;
  bankBranch: string | null;
  bankName: string | null;
};
export type ThreeDSecureCustomer = {
  name: string;
  email: string;
  document?: string;
  phones?: {
    countryCode: string;
    areaCode: string;
    number: string;
  }[];
};
export type ThreeDSecureBillingAddress = {
  street: string;
  number: string;
  complement?: string;
  district?: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
};
export type ThreeDSecureOrderResponse = {
  authToken?: string;
  threeDsUrl?: string;
  creq?: string;
  dsTransactionId?: string;
  version?: string;
  status: ThreeDsAuthenticationStatus | string;
  acquirer?: IntegrationProvider | "PayConductor" | string;
  operationUrl?: string;
  publicKey?: string;
  environment?: OrganizationEnvironment | string;
  customer?: ThreeDSecureCustomer;
  amount?: number;
  currency?: CurrencyType | string;
  installments?: number;
  billingAddress?: ThreeDSecureBillingAddress;
};
export type PixInfo = {
  copyAndPasteCode: string;
  qrCodeUrl: string;
  endToEndId: string | null;
  payer: TransactionParty | null;
  receiver: TransactionParty | null;
};
export type CreditCardInfo = {
  authorizationCode?: string;
  threeDSecure?: ThreeDSecureOrderResponse;
  cardToken?: string | null;
};
export type BankSlipInfo = {
  barCode: string;
  digitableLine: string;
  pdfUrl?: string;
  emvCode?: string;
};
export type NuPayInfo = {
  paymentUrl: string;
};
export type PicPayInfo = {
  copyAndPasteCode: string;
  qrCodeUrl: string;
};
export type CryptoInfo = {
  address: string;
  qrCodePayload: string | null;
};
export type SpeiInfo = {
  clabe: string;
  bankName: string | null;
  beneficiaryName: string | null;
  reference: string | null;
};
export type PaymentResult = {
  pix?: PixInfo;
  creditCard?: CreditCardInfo;
  bankSlip?: BankSlipInfo;
  nuPay?: NuPayInfo;
  picPay?: PicPayInfo;
  crypto?: CryptoInfo;
  spei?: SpeiInfo;
  orderId: string;
  status: PaymentStatus;
  statusDetail?: ChargeStatusDetail | string;
  amount: number;
  currency: CurrencyType | string;
  message?: string;
  errorCode?: string;
  errorMessage?: string;
};
export interface MessagePayload {
  type: OutgoingMessage | IncomingMessage;
  data?: unknown;
  requestId?: string;
  error?: {
    code: string;
    message: string;
    field?: string;
  };
}
export type CardTokenData = {
  token: string;
};
export type CardFullData = {
  number: string;
  holderName: string;
  cvv: string;
  expiration: {
    month: number;
    year: number;
  };
};
export type CardPaymentData = CardTokenData | CardFullData;

// ------- payment-methods.ts -------

export type PixPaymentData = {
  paymentMethod: PaymentMethod.Pix;
  expirationInSeconds?: number;
};
export type CreditCardPaymentData = {
  paymentMethod: PaymentMethod.CreditCard;
  card: CardPaymentData;
  installments: number;
  softDescriptor?: string;
};
export type BankSlipPaymentData = {
  paymentMethod: PaymentMethod.BankSlip;
  expirationInDays?: number;
};
export type NuPayData = {
  cancelUrl: string;
  merchantName: string;
  returnUrl: string;
  storeName?: string;
};
export type NuPayPaymentData = {
  paymentMethod: PaymentMethod.NuPay;
  nuPay: NuPayData;
};
export type PicPayPaymentData = {
  paymentMethod: PaymentMethod.PicPay;
};
export type CryptoPaymentData = {
  paymentMethod: PaymentMethod.Crypto;
  network: CryptoNetwork;
};
export type SpeiPaymentData = {
  paymentMethod: PaymentMethod.Spei;
  expirationInSeconds?: number;
};
export type GooglePayToken = {
  signature: string;
  intermediateSigningKey: {
    signedKey: string;
    signatures: string[];
  };
  protocolVersion: string;
  signedMessage: string;
};
export type ApplePayToken = {
  version: string;
  data: string;
  signature: string;
  header: {
    ephemeralPublicKey: string;
    publicKeyHash: string;
    transactionId: string;
  };
};
export type GooglePayPaymentData = {
  paymentMethod: PaymentMethod.GooglePay;
  googlePay: {
    signature: string;
    intermediateSigningKey: {
      signedKey: string;
      signatures: string[];
    };
    protocolVersion: string;
    signedMessage: string;
  };
  installments?: number;
};
export type ApplePayPaymentData = {
  paymentMethod: PaymentMethod.ApplePay;
  applePay: {
    version: string;
    data: string;
    signature: string;
    header: {
      ephemeralPublicKey: string;
      publicKeyHash: string;
      transactionId: string;
    };
  };
  installments?: number;
};
export type PaymentConfirmData = PixPaymentData | CreditCardPaymentData | BankSlipPaymentData | NuPayPaymentData | PicPayPaymentData | CryptoPaymentData | SpeiPaymentData | GooglePayPaymentData | ApplePayPaymentData