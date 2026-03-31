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
		return (
			this.data.status === "NeedChallenge" ||
			this.data.statusDetail === "ThreeDsAwaitingChallenge"
		);
	}

	get acquirer(): string | undefined {
		return this.data.acquirer;
	}

	async authenticate(options?: Omit<ThreeDSecureOptions, "threeDSecure">): Promise<ThreeDSecureResult> {
		if (!this.needsChallenge) {
			return { status: ThreeDSecureResultStatus.Success };
		}

		const opts: ThreeDSecureOptions = { ...options, threeDSecure: this.data };
		const providerKey = this.resolveProvider();
		const ProviderClass = providerKey
			? threeDSProviders[providerKey as keyof typeof threeDSProviders]
			: undefined;

		if (ProviderClass) {
			this.provider = new ProviderClass(this.data, opts);
			return this.provider.authenticate();
		}

		if (this.data.authToken && !this.data.operationUrl && !this.data.threeDsUrl) {
			return {
				status: ThreeDSecureResultStatus.Success,
				authToken: this.data.authToken,
				dsTransactionId: this.data.dsTransactionId,
			};
		}

		return {
			status: ThreeDSecureResultStatus.Failed,
			error: new Error(`Unsupported 3DS provider: ${providerKey ?? "unknown"}`),
		};
	}

	destroy(): void {
		if (this.provider) {
			this.provider.cleanup();
			this.provider = null;
		}
	}

	private resolveProvider(): string | undefined {
		if (this.data.acquirer) return this.data.acquirer;

		// Lyra/PayConductor: has operationUrl + publicKey, no acquirer
		if (this.data.operationUrl && this.data.publicKey) return "PayConductor";

		// MercadoPago: has threeDsUrl + creq
		if (this.data.threeDsUrl && this.data.creq) return "MercadoPago";

		return undefined;
	}
}
