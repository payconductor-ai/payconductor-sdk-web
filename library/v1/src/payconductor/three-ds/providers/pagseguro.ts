import { loadScript } from "../../loader";
import { AbstractThreeDSProvider, ThreeDSecureResultStatus } from "../types";
import type { ThreeDSecureResult } from "../types";

const SDK_URL = "https://assets.pagseguro.com.br/checkout-sdk-js/rc/dist/browser/pagseguro.min.js";

export class PagSeguroThreeDSProvider extends AbstractThreeDSProvider {
	async authenticate(): Promise<ThreeDSecureResult> {
		const { authToken, operationUrl } = this.data;

		if (!authToken || !operationUrl) {
			return this.fail("Missing authToken or operationUrl for PagSeguro 3DS");
		}

		const env = this.data.environment === "Sandbox" ? "SANDBOX" : "PROD";

		try { await loadScript(SDK_URL); }
		catch { return this.fail("Failed to load PagSeguro SDK"); }

		const sdk = window.PagSeguro;
		if (!sdk) return this.fail("PagSeguro SDK not available");

		sdk.setUp({ session: authToken, env });

		try {
			const result = await sdk.authenticate3DS(
				this.options.providerData as unknown as PagSeguroAuthRequestGlobal ?? { data: {} },
			);

			if (result.status === "AUTH_FLOW_COMPLETED" || result.status === "AUTH_NOT_SUPPORTED") {
				this.options.onComplete?.();
				return { status: ThreeDSecureResultStatus.Success, dsTransactionId: result.id };
			}

			if (result.status === "CHANGE_PAYMENT_METHOD") {
				return this.fail("PagSeguro requires a different payment method");
			}

			return { status: ThreeDSecureResultStatus.Success, dsTransactionId: result.id };
		} catch (err: unknown) {
			return this.fail(err instanceof Error ? err.message : "PagSeguro 3DS failed");
		}
	}

	cleanup(): void {
		this.closeModal();
	}
}
