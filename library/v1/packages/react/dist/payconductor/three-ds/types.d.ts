import { IntegrationProvider, OrganizationEnvironment } from '../iframe/types';

export type ThreeDSecureData = {
    orderId: string;
    publicKey: string;
    status?: string;
    statusDetail?: string;
    acquirer?: IntegrationProvider | "PayConductor" | string;
    environment?: OrganizationEnvironment;
    authToken?: string;
    threeDsUrl?: string;
    creq?: string;
    operationUrl?: string;
    dsTransactionId?: string;
    version?: string;
    card?: {
        number: string;
        expMonth: string;
        expYear: string;
        holderName: string;
    };
    customer?: {
        name: string;
        email: string;
        document?: string;
        phones?: Array<{
            countryCode: string;
            areaCode: string;
            number: string;
            type?: string;
        }>;
    };
    /** Valor da cobrança em decimal (ex: 150.9), como retornado pela API do PayConductor */
    amount?: number;
    currency?: string;
    installments?: number;
    billingAddress?: {
        street: string;
        number: string;
        complement?: string;
        district?: string;
        state: string;
        country: string;
        city: string;
        zipCode: string;
    };
};
/**
 * Dados mínimos para instanciar o SDK de 3DS.
 * O restante (status, acquirer, authToken, card, etc.) é obtido
 * pela API através do `orderId` ao chamar `authenticate`.
 */
export type ThreeDSecureInit = Pick<ThreeDSecureData, "orderId" | "publicKey" | "card">;
export type ThreeDSecureOptions = {
    threeDSecure: ThreeDSecureData;
    onChallenge?: () => void;
    onComplete?: () => void;
    onError?: (error: Error) => void;
    onTimeout?: () => void;
    timeoutMs?: number;
};
export declare enum ThreeDSecureResultStatus {
    Success = "Success",
    Failed = "Failed",
    Timeout = "Timeout"
}
export declare enum ThreeDSTransStatus {
    Authenticated = "Y",
    Attempted = "A",
    ChallengeRequired = "C",
    NotAuthenticated = "N",
    Unavailable = "U",
    Rejected = "R",
    InformationOnly = "I"
}
export type ThreeDSecureResult = {
    status: ThreeDSecureResultStatus;
    error?: Error;
    authToken?: string;
    dsTransactionId?: string;
    providerTransactionId?: string;
    transStatus?: ThreeDSTransStatus;
    challengeCanceled?: boolean;
};
export declare abstract class AbstractThreeDSProvider {
    protected readonly data: ThreeDSecureData;
    protected readonly options: ThreeDSecureOptions;
    private overlay;
    private modalContent;
    constructor(data: ThreeDSecureData, options: ThreeDSecureOptions);
    abstract authenticate(): Promise<ThreeDSecureResult>;
    abstract cleanup(): void;
    /** Os SDKs de 3DS dos provedores (Pagar.me, PagSeguro) esperam o valor em centavos. */
    protected get amountInCents(): number | undefined;
    protected fail(message: string, details?: Omit<ThreeDSecureResult, "status" | "error">): ThreeDSecureResult;
    protected showModal(): HTMLElement;
    protected closeModal(): void;
    protected resolveContainer(): HTMLElement;
    private injectStyles;
}
