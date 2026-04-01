export declare enum PaymentMethod {
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
    GooglePay = "GooglePay"
}
export declare enum PaymentMethodLayout {
    Grid = "grid",
    Vertical = "vertical",
    Horizontal = "horizontal"
}
export declare enum PaymentStatus {
    Succeeded = "succeeded",
    Pending = "pending",
    Failed = "failed"
}
export declare enum StatusDetail {
    ThreeDsAwaitingChallenge = "ThreeDsAwaitingChallenge"
}
export declare enum ThreeDsAuthenticationStatus {
    Authenticated = "Authenticated",
    NotAuthenticated = "NotAuthenticated",
    NeedChallenge = "NeedChallenge"
}
export declare enum ThreeDSResultStatus {
    Pending = "Pending",
    Authenticated = "Authenticated",
    Failed = "Failed",
    NotEnrolled = "NotEnrolled"
}
export declare enum DocumentType {
    Cpf = "Cpf",
    Cnpj = "Cnpj"
}
export declare enum IntegrationProvider {
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
    Shield = "Shield",
    Hopy = "Hopy",
    SAC = "SAC"
}
export declare enum CardBrand {
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
    Unknown = "Unknown"
}
export declare enum OrganizationEnvironment {
    Production = "Production",
    Sandbox = "Sandbox"
}
export declare enum CurrencyType {
    USD = "USD",
    EUR = "EUR",
    BRL = "BRL",
    ARS = "ARS",
    CAD = "CAD",
    COP = "COP",
    GBP = "GBP",
    JPY = "JPY",
    MXN = "MXN",
    MZN = "MZN",
    CNY = "CNY",
    SAR = "SAR",
    ETH = "ETH",
    BNB = "BNB",
    BTC = "BTC",
    USDT = "USDT",
    USDC = "USDC",
    DOGE = "DOGE",
    SOL = "SOL"
}
export declare enum DeviceType {
    Android = "android",
    IOS = "ios",
    Web = "web"
}
export declare enum InputStyleKey {
    Padding = "padding",
    Radius = "radius",
    Color = "color",
    Background = "background",
    Shadow = "shadow"
}
export declare enum OutgoingMessage {
    Init = "Init",
    Config = "Config",
    Update = "Update",
    ConfirmPayment = "ConfirmPayment",
    Validate = "Validate",
    Reset = "Reset"
}
export declare enum IncomingMessage {
    Ready = "Ready",
    Error = "Error",
    PaymentComplete = "PaymentComplete",
    PaymentFailed = "PaymentFailed",
    PaymentPending = "PaymentPending",
    ValidationError = "ValidationError",
    PaymentMethodSelected = "PaymentMethodSelected",
    Resize = "Resize",
    ThreeDSChallenge = "ThreeDSChallenge",
    ThreeDSComplete = "ThreeDSComplete",
    ThreeDSFailed = "ThreeDSFailed"
}
export declare enum ErrorCode {
    InvalidClient = "InvalidClient",
    InvalidToken = "InvalidToken",
    NetworkError = "NetworkError",
    IframeNotReady = "IframeNotReady",
    PaymentDeclined = "PaymentDeclined",
    ValidationError = "ValidationError",
    Timeout = "Timeout"
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
export type PaymentMethodsResponse = {
    methods: PaymentMethod[];
    config: PaymentMethodsConfig;
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
export declare const defaultTheme: PayConductorTheme;
export type PayConductorConfig = {
    publicKey: string;
    orderId?: string;
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
export type PaymentResult = {
    orderId: string;
    status: PaymentStatus;
    statusDetail?: StatusDetail | string;
    amount: number;
    currency: CurrencyType | string;
    message?: string;
    errorCode?: string;
    errorMessage?: string;
    threeDSecure?: {
        status: ThreeDsAuthenticationStatus | string;
        acquirer?: IntegrationProvider;
        environment?: OrganizationEnvironment;
        authToken?: string;
        threeDsUrl?: string;
        creq?: string;
        operationUrl?: string;
        publicKey?: string;
        dsTransactionId?: string;
        version?: string;
    };
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
export type CardTokenData = {
    token: string;
    firstSixCardNumber?: string;
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
export type PaymentConfirmData = PixPaymentData | CreditCardPaymentData | BankSlipPaymentData | NuPayPaymentData | PicPayPaymentData;
