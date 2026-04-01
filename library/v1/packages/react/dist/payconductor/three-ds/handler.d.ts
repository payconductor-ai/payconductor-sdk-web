import { ThreeDSecureData, ThreeDSecureOptions, ThreeDSecureResult } from './types';
import { IntegrationProvider } from '../iframe/types';

export declare class PayConductor3DSSDK {
    private readonly data;
    private provider;
    constructor(threeDSecure: ThreeDSecureData);
    get needsChallenge(): boolean;
    get acquirer(): IntegrationProvider | undefined;
    authenticate(options?: Omit<ThreeDSecureOptions, "threeDSecure">): Promise<ThreeDSecureResult>;
    destroy(): void;
}
