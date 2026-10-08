import { PaymentResult } from '../iframe/types';
import { ThreeDSMode, ThreeDSecureCompletionPayload, ThreeDSecureData, ThreeDSecurePollingOptions } from './types';

export declare class PayConductorThreeDSApiError extends Error {
    readonly title?: unknown | undefined;
    constructor(message: string, title?: unknown | undefined);
}
export declare class PayConductorThreeDSApi {
    private readonly publicKey;
    constructor(publicKey: string);
    completeChallenge(orderId: string, body: ThreeDSecureCompletionPayload): Promise<void>;
    getOrderStatus(orderId: string): Promise<PaymentResult>;
    /**
     * Aguarda o pedido sair de `ThreeDsAwaitingChallenge`.
     * No modo `Auto` não existe `statusDetail`; a espera é enquanto o pedido seguir `Pending`.
     */
    pollOrderStatus(orderId: string, { maxAttempts, intervalMs, mode }?: ThreeDSecurePollingOptions & {
        mode?: ThreeDSMode;
    }): Promise<{
        order: PaymentResult | null;
        timedOut: boolean;
    }>;
    getThreeDSecureData(orderId: string): Promise<ThreeDSecureData>;
    private parseResponseError;
    private get headers();
}
