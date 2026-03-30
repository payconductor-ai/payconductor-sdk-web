import { AbstractThreeDSProvider, ThreeDSecureResult } from '../types';

export declare class PagarMeThreeDSProvider extends AbstractThreeDSProvider {
    private timeoutId;
    private methodContainer;
    authenticate(): Promise<ThreeDSecureResult>;
    cleanup(): void;
}
