import { IntegrationProvider, OrganizationEnvironment } from '../iframe/types';

export type ThreeDSecureData = {
    orderId: string;
    status?: string;
    statusDetail?: string;
    acquirer?: IntegrationProvider | "PayConductor" | string;
    environment?: OrganizationEnvironment;
    authToken?: string;
    threeDsUrl?: string;
    creq?: string;
    operationUrl?: string;
    publicKey?: string;
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
export type ThreeDSecureOptions = {
    threeDSecure: ThreeDSecureData;
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
export type ThreeDSecureResult = {
    status: ThreeDSecureResultStatus;
    error?: Error;
    authToken?: string;
    dsTransactionId?: string;
};
export declare abstract class AbstractThreeDSProvider {
    protected readonly data: ThreeDSecureData;
    protected readonly options: ThreeDSecureOptions;
    private overlay;
    private modalContent;
    constructor(data: ThreeDSecureData, options: ThreeDSecureOptions);
    abstract authenticate(): Promise<ThreeDSecureResult>;
    abstract cleanup(): void;
    protected fail(message: string): ThreeDSecureResult;
    protected showModal(): HTMLElement;
    protected closeModal(): void;
    protected resolveContainer(): HTMLElement;
    private injectStyles;
}
