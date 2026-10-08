import { PayConductor3DSSDK } from "../three-ds";
import type { ThreeDSecureInit, ThreeDSecurePollingOptions, ThreeDSecureResult } from "../three-ds/types";
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
export function useThreeDS(options?: UseThreeDSOptions): UseThreeDSReturn {
  let handler: PayConductor3DSSDK | null = null;
  const authenticate = async (threeDSecure: ThreeDSecureInit): Promise<ThreeDSecureResult> => {
    // O SDK carrega o restante dos dados pela API e conduz o fluxo inteiro
    // (desafio + complete + polling).
    const sdk = new PayConductor3DSSDK(threeDSecure);
    handler = sdk;
    try {
      return await sdk.authenticate({
        onChallenge: options?.onChallenge,
        onComplete: options?.onComplete,
        onError: options?.onError,
        onTimeout: options?.onTimeout,
        complete: options?.complete,
        poll: options?.poll,
        polling: options?.polling
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
    authenticate,
    destroy
  };
}