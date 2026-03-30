import { AbstractThreeDSProvider, ThreeDSecureResult } from '../types';

export declare class MercadoPagoThreeDSProvider extends AbstractThreeDSProvider {
    private iframe;
    private messageListener;
    private timeoutId;
    authenticate(): Promise<ThreeDSecureResult>;
    cleanup(): void;
}
