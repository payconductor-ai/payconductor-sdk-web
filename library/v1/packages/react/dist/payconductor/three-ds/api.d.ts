export declare class PayConductorThreeDSApiError extends Error {
    readonly title?: unknown | undefined;
    constructor(message: string, title?: unknown | undefined);
}
export declare class PayConductorThreeDSApi {
    private readonly publicKey;
    constructor(publicKey: string);
    completeManualChallenge(orderId: string, providerTransactionId: string): Promise<void>;
    private parseResponseError;
    private get baseUrl();
    private get headers();
}
