import type { ThreeDSecureData, ThreeDSecureOptions, ThreeDSecureResult, AbstractThreeDSProvider } from "./types";
import { ThreeDSecureResultStatus } from "./types";
import { threeDSProviders } from "./providers";
import { PayConductorThreeDSApi } from "./api";
import { IntegrationProvider } from "../iframe/types";

// ? Acquirers that require a server-side notification after a successful 3DS native challenge
const MANUAL_AUTH_ACQUIRERS: (IntegrationProvider | string)[] = [IntegrationProvider.PagSeguro];
export class PayConductor3DSSDK {
  private readonly data: ThreeDSecureData;
  private provider: AbstractThreeDSProvider | null = null;
  constructor(threeDSecure: ThreeDSecureData) {
    this.data = threeDSecure;
  }
  get needsChallenge() {
    return this.data.status === "NeedChallenge" || this.data.statusDetail === "ThreeDsAwaitingChallenge";
  }
  get acquirer() {
    return this.data.acquirer;
  }
  async authenticate(options?: Omit<ThreeDSecureOptions, "threeDSecure">): Promise<ThreeDSecureResult> {
    if (!this.needsChallenge) {
      return {
        status: ThreeDSecureResultStatus.Success
      };
    }
    const {
      acquirer
    } = this.data;
    if (!acquirer) {
      return {
        status: ThreeDSecureResultStatus.Failed,
        error: new Error("Missing 3DS acquirer")
      };
    }
    const ProviderClass = threeDSProviders[acquirer as keyof typeof threeDSProviders];
    if (!ProviderClass) {
      return {
        status: ThreeDSecureResultStatus.Failed,
        error: new Error(`Unsupported 3DS provider: ${acquirer}`)
      };
    }
    const opts: ThreeDSecureOptions = {
      ...options,
      threeDSecure: this.data
    };
    this.provider = new ProviderClass(this.data, opts);
    const result = await this.provider.authenticate();
    if (result.status === ThreeDSecureResultStatus.Success && result.dsTransactionId && MANUAL_AUTH_ACQUIRERS.includes(acquirer) && this.data.orderId && this.data.publicKey) {
      const api = new PayConductorThreeDSApi(this.data.publicKey);
      await api.completeManualChallenge(this.data.orderId, result.dsTransactionId);
    }
    return result;
  }
  destroy() {
    if (this.provider) {
      this.provider.cleanup();
      this.provider = null;
    }
  }
}