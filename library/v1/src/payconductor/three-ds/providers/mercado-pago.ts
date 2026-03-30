import { AbstractThreeDSProvider, ThreeDSecureResultStatus } from "../types";
import type { ThreeDSecureResult } from "../types";

const DEFAULT_TIMEOUT_MS = 5 * 60 * 1000;

export class MercadoPagoThreeDSProvider extends AbstractThreeDSProvider {
	private iframe: HTMLIFrameElement | null = null;
	private messageListener: ((event: MessageEvent) => void) | null = null;
	private timeoutId: ReturnType<typeof setTimeout> | null = null;

	async authenticate(): Promise<ThreeDSecureResult> {
		const { threeDsUrl, creq } = this.data;

		if (!threeDsUrl || !creq) {
			return this.fail("Missing threeDsUrl or creq");
		}

		const container = this.resolveContainer();
		if (!container) return this.fail("Container not found");

		return new Promise<ThreeDSecureResult>((resolve) => {
			this.injectStyles();

			this.iframe = document.createElement("iframe");
			this.iframe.name = "payconductor-3ds-challenge";
			this.iframe.id = "payconductor-3ds-challenge";
			container.appendChild(this.iframe);

			this.messageListener = (event: MessageEvent) => {
				if (event.data?.status === "COMPLETE") {
					this.cleanup();
					this.options.onComplete?.();
					resolve({ status: ThreeDSecureResultStatus.Success });
				}
			};
			window.addEventListener("message", this.messageListener);

			this.timeoutId = setTimeout(() => {
				this.cleanup();
				this.options.onTimeout?.();
				resolve({ status: ThreeDSecureResultStatus.Timeout });
			}, this.options.timeoutMs ?? DEFAULT_TIMEOUT_MS);

			const iframeDoc = this.iframe.contentWindow?.document;
			if (!iframeDoc) {
				this.cleanup();
				resolve(this.fail("Cannot access iframe document"));
				return;
			}

			const form = iframeDoc.createElement("form");
			form.name = "threeDsChallengeForm";
			form.setAttribute("target", "payconductor-3ds-challenge");
			form.setAttribute("method", "post");
			form.setAttribute("action", threeDsUrl);

			const input = iframeDoc.createElement("input");
			input.setAttribute("type", "hidden");
			input.setAttribute("name", "creq");
			input.setAttribute("value", creq);
			form.appendChild(input);

			this.iframe.appendChild(form);
			form.submit();
		});
	}

	cleanup(): void {
		if (this.timeoutId) { clearTimeout(this.timeoutId); this.timeoutId = null; }
		if (this.messageListener) { window.removeEventListener("message", this.messageListener); this.messageListener = null; }
		if (this.iframe) { this.iframe.remove(); this.iframe = null; }
	}

	private injectStyles(): void {
		if (document.getElementById("payconductor-3ds-styles")) return;
		const style = document.createElement("style");
		style.id = "payconductor-3ds-styles";
		style.textContent = `
			#payconductor-3ds-challenge { width: 500px; height: 600px; border: none; }
			@media only screen and (max-width: 980px) { #payconductor-3ds-challenge { width: 100%; height: 440px; } }
		`;
		document.head.appendChild(style);
	}
}
