import { ThreeDSecureInit, ThreeDSecureOptions, ThreeDSecureResult } from './types';

export declare class PayConductor3DSSDK {
    private data;
    private provider;
    private api;
    constructor(threeDSecure: ThreeDSecureInit);
    get needsChallenge(): boolean;
    get acquirer(): string | undefined;
    authenticate(options?: Omit<ThreeDSecureOptions, "threeDSecure">): Promise<ThreeDSecureResult>;
    destroy(): void;
}
