import { PayConductor3DSSDK } from "../three-ds";
import type { ThreeDSecureData, ThreeDSecureResult } from "../three-ds/types";
import { ThreeDSecureResultStatus } from "../three-ds/types";
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
export function useThreeDS(options?: UseThreeDSOptions): UseThreeDSReturn {
  let handler: PayConductor3DSSDK | null = null;
  const handleChallenge = async (threeDSecure: ThreeDSecureData, providerData?: Record<string, unknown>): Promise<ThreeDSecureResult> => {
    // TODO: Definir tipagem do enum
    const needs = threeDSecure.status === "NeedChallenge" || threeDSecure.statusDetail === "ThreeDsAwaitingChallenge";
    if (!needs) {
      return {
        status: ThreeDSecureResultStatus.Success
      };
    }
    options?.onChallenge?.();
    handler = new PayConductor3DSSDK(threeDSecure);
    const result = await handler.authenticate({
      providerData,
      onComplete: options?.onComplete,
      onError: options?.onError,
      onTimeout: options?.onTimeout
    });
    handler.destroy();
    handler = null;
    return result;
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