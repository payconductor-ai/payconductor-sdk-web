import { AbstractThreeDSProvider, ThreeDSecureResult } from '../types';

export declare class SandboxThreeDSProvider extends AbstractThreeDSProvider {
    private timeoutId;
    authenticate(): Promise<ThreeDSecureResult>;
    cleanup(): void;
    private renderChallenge;
    private createButton;
}
