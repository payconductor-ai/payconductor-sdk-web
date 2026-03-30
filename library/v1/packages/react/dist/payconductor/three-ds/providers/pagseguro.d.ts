import { AbstractThreeDSProvider, ThreeDSecureResult } from '../types';

export declare class PagSeguroThreeDSProvider extends AbstractThreeDSProvider {
    authenticate(): Promise<ThreeDSecureResult>;
    cleanup(): void;
}
