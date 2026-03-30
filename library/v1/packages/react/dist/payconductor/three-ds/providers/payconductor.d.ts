import { AbstractThreeDSProvider, ThreeDSecureResult } from '../types';

export declare class PayConductorThreeDSProvider extends AbstractThreeDSProvider {
    private timeoutId;
    authenticate(): Promise<ThreeDSecureResult>;
    cleanup(): void;
}
