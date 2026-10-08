import { ThreeDSecureInit, ThreeDSecurePollingOptions, ThreeDSecureResult } from '../three-ds/types';

export type UseThreeDSOptions = {
    onChallenge?: () => void;
    onComplete?: (result: ThreeDSecureResult) => void;
    onError?: (error: Error) => void;
    onTimeout?: () => void;
    complete?: boolean;
    poll?: boolean;
    polling?: ThreeDSecurePollingOptions;
};
export type UseThreeDSReturn = {
    authenticate: (threeDSecure: ThreeDSecureInit) => Promise<ThreeDSecureResult>;
    destroy: () => void;
};
export declare function useThreeDS(options?: UseThreeDSOptions): UseThreeDSReturn;
