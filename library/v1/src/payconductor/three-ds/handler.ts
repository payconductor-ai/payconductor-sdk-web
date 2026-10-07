import type { ThreeDSecureData, ThreeDSecureInit, ThreeDSecureOptions, ThreeDSecureResult, AbstractThreeDSProvider } from "./types";
import { ThreeDSecureResultStatus } from "./types";
import { threeDSProviders } from "./providers";
import { PayConductorThreeDSApi } from "./api";
import { IntegrationProvider } from "../iframe/types";

// ? Acquirers that require a server-side notification after a successful 3DS native challenge
const MANUAL_AUTH_ACQUIRERS: (IntegrationProvider | string)[] = [IntegrationProvider.PagSeguro];

export class PayConductor3DSSDK {
	private data: ThreeDSecureData;
	private provider: AbstractThreeDSProvider | null = null;
	private api: PayConductorThreeDSApi;

	constructor(threeDSecure: ThreeDSecureInit) {
		this.data = threeDSecure;
		this.api = new PayConductorThreeDSApi(this.data.publicKey);
	}

	get needsChallenge() {
		return (
			this.data.status === "NeedChallenge" ||
			this.data.statusDetail === "ThreeDsAwaitingChallenge"
		);
	}

	get acquirer() {
		return this.data.acquirer;
	}

	async authenticate(options?: Omit<ThreeDSecureOptions, "threeDSecure">): Promise<ThreeDSecureResult> {
		// O SDK é instanciado com dados resumidos; o restante é carregado aqui.
		const fullData = await this.api.getThreeDSecureData(this.data.orderId);
		this.data = { ...this.data, ...fullData };

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

		options?.onChallenge?.();

		const opts: ThreeDSecureOptions = { ...options, threeDSecure: this.data };
		this.provider = new ProviderClass(this.data, opts);
		const result = await this.provider.authenticate();

		if (
			result.status === ThreeDSecureResultStatus.Success &&
			result.dsTransactionId &&
			MANUAL_AUTH_ACQUIRERS.includes(acquirer)
		) {
			await this.api.completeManualChallenge(this.data.orderId, result.dsTransactionId);
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
