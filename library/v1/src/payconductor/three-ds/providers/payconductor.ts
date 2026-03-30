import { loadScript } from "../../loader";
import { AbstractThreeDSProvider, ThreeDSecureResultStatus } from "../types";
import type { ThreeDSecureResult } from "../types";

const SDK_URL = "https://static.payzen.lat/static/js/authenticate-client/V1.0/kr-authenticate.umd.js";
const TIMEOUT_MS = 10 * 60 * 1000;

export class PayConductorThreeDSProvider extends AbstractThreeDSProvider {
	private timeoutId: ReturnType<typeof setTimeout> | null = null;

	async authenticate(): Promise<ThreeDSecureResult> {
		const { operationUrl, publicKey } = this.data;

		if (!operationUrl || !publicKey) {
			return this.fail("Missing operationUrl or publicKey");
		}

		try { await loadScript(SDK_URL); }
		catch { return this.fail("Failed to load 3DS SDK"); }

		const KrAuthenticate = window.KrAuthenticate;
		if (!KrAuthenticate) return this.fail("KrAuthenticate not available");

		return new Promise<ThreeDSecureResult>((resolve) => {
			this.timeoutId = setTimeout(() => {
				this.cleanup();
				this.options.onTimeout?.();
				resolve({ status: ThreeDSecureResultStatus.Timeout });
			}, this.options.timeoutMs ?? TIMEOUT_MS);

			const container = this.resolveContainer();
			const krOptions = container && container !== document.body ? { element: container } : undefined;
			const sdk = new KrAuthenticate(publicKey, krOptions);

			sdk.authenticate(operationUrl, () => {
				this.cleanup();
				this.options.onComplete?.();
				resolve({ status: ThreeDSecureResultStatus.Success });
			});
		});
	}

	cleanup(): void {
		if (this.timeoutId) { clearTimeout(this.timeoutId); this.timeoutId = null; }
	}
}
