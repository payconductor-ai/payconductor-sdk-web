export type ThreeDSecureData = {
    status?: string;
    statusDetail?: string;
    acquirer?: string;
    environment?: "Sandbox" | "Production";
    authToken?: string;
    threeDsUrl?: string;
    creq?: string;
    operationUrl?: string;
    publicKey?: string;
    dsTransactionId?: string;
    version?: string;
};
export type ThreeDSecureOptions = {
    threeDSecure: ThreeDSecureData;
    onComplete?: () => void;
    onError?: (error: Error) => void;
    onTimeout?: () => void;
    timeoutMs?: number;
    providerData?: Record<string, unknown>;
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
