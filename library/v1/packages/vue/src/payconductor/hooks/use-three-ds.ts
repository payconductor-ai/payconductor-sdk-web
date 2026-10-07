import { PayConductor3DSSDK } from "../three-ds";
import type { ThreeDSecureInit, ThreeDSecureResult } from "../three-ds/types";
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
export function useThreeDS(options?: UseThreeDSOptions): UseThreeDSReturn {
  let handler: PayConductor3DSSDK | null = null;
  const handleChallenge = async (threeDSecure: ThreeDSecureInit): Promise<ThreeDSecureResult> => {
    // O SDK carrega o restante dos dados pela API e só dispara
    // `onChallenge` quando uma challenge é realmente necessária.
    const sdk = new PayConductor3DSSDK(threeDSecure);
    handler = sdk;
    try {
      return await sdk.authenticate({
        onChallenge: options?.onChallenge,
        onComplete: options?.onComplete,
        onError: options?.onError,
        onTimeout: options?.onTimeout
      });
    } finally {
      sdk.destroy();
      handler = null;
    }
  };
  const destroy = () => {
    handler?.destroy();
    handler = null;
  };
  return {
    handleChallenge,
    destroy
  };
}