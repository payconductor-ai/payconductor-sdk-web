import { ThreeDSecureData, ThreeDSecureOptions, ThreeDSecureResult } from './types';

export declare class PayConductor3DSSDK {
    private readonly data;
    private provider;
    constructor(threeDSecure: ThreeDSecureData);
    get needsChallenge(): boolean;
    get acquirer(): string | undefined;
    authenticate(options?: Omit<ThreeDSecureOptions, "threeDSecure">): Promise<ThreeDSecureResult>;
    destroy(): void;
    private resolveProvider;
}
