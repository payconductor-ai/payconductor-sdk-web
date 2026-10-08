import { ThreeDSecureInit, ThreeDSecureResult } from '../three-ds/types';

export type UseThreeDSOptions = {
    onChallenge?: () => void;
    onComplete?: () => void;
    onError?: (error: Error) => void;
    onTimeout?: () => void;
};
export type UseThreeDSReturn = {
    handleChallenge: (threeDSecure: ThreeDSecureInit) => Promise<ThreeDSecureResult>;
    destroy: () => void;
};
export declare function useThreeDS(options?: UseThreeDSOptions): UseThreeDSReturn;
