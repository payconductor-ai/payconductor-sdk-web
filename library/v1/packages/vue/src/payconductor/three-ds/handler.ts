import type { ThreeDSecureData, ThreeDSecureOptions, ThreeDSecureResult, AbstractThreeDSProvider } from "./types";
import { ThreeDSecureResultStatus } from "./types";
import { threeDSProviders } from "./providers";
export class PayConductor3DSSDK {
  private readonly data: ThreeDSecureData;
  private provider: AbstractThreeDSProvider | null = null;
  constructor(threeDSecure: ThreeDSecureData) {
    this.data = threeDSecure;
  }
  get needsChallenge(): boolean {
    return this.data.status === "NeedChallenge";
  }
  get acquirer(): string | undefined {
    return this.data.acquirer;
  }
  async authenticate(options?: Omit<ThreeDSecureOptions, "threeDSecure">): Promise<ThreeDSecureResult> {
    if (!this.needsChallenge) {
      return {
        status: ThreeDSecureResultStatus.Success
      };
    }
    const opts: ThreeDSecureOptions = {
      ...options,
      threeDSecure: this.data
    };
    const acquirer = (this.data.acquirer ?? "") as keyof typeof threeDSProviders;
    const ProviderClass = threeDSProviders[acquirer];
    if (ProviderClass) {
      this.provider = new ProviderClass(this.data, opts);
      return this.provider.authenticate();
    }
    if (this.data.authToken && !this.data.operationUrl && !this.data.threeDsUrl) {
      return {
        status: ThreeDSecureResultStatus.Success,
        authToken: this.data.authToken,
        dsTransactionId: this.data.dsTransactionId
      };
    }
    return {
      status: ThreeDSecureResultStatus.Failed,
      error: new Error(`Unsupported 3DS provider: ${this.data.acquirer}`)
    };
  }
  destroy(): void {
    if (this.provider) {
      this.provider.cleanup();
      this.provider = null;
    }
  }
}