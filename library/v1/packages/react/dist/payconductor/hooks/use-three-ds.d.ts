import { ThreeDSecureData, ThreeDSecureResult } from '../three-ds/types';

export type UseThreeDSOptions = {
    onChallenge?: () => void;
    onComplete?: () => void;
    onError?: (error: Error) => void;
    onTimeout?: () => void;
};
export type UseThreeDSReturn = {
    handleChallenge: (threeDSecure: ThreeDSecureData, providerData?: Record<string, unknown>) => Promise<ThreeDSecureResult>;
    destroy: () => void;
};
export declare function useThreeDS(options?: UseThreeDSOptions): UseThreeDSReturn;
