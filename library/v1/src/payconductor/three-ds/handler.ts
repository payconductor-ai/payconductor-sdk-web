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

		const { acquirer } = this.data;

		if (!acquirer) {
			return { status: ThreeDSecureResultStatus.Failed, error: new Error("Missing 3DS acquirer") };
		}

		const ProviderClass = threeDSProviders[acquirer as keyof typeof threeDSProviders];

		if (!ProviderClass) {
			return { status: ThreeDSecureResultStatus.Failed, error: new Error(`Unsupported 3DS provider: ${acquirer}`) };
		}

		const opts: ThreeDSecureOptions = { ...options, threeDSecure: this.data };
		this.provider = new ProviderClass(this.data, opts);
		return this.provider.authenticate();
	}

	destroy(): void {
		if (this.provider) {
			this.provider.cleanup();
			this.provider = null;
		}
	}
}
