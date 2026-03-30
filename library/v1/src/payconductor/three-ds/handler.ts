import type { ThreeDSecureData, ThreeDSecureOptions, ThreeDSecureResult } from "./types";
import { ThreeDSecureResultStatus } from "./types";
import { loadScript } from "../loader";

const SDK_URLS = {
	lyra: "https://static.payzen.lat/static/js/authenticate-client/V1.0/kr-authenticate.umd.js",
	stone: {
		Production: "https://3ds-nx-js.stone.com.br/live/v2/3ds2.min.js",
		Sandbox: "https://3ds-nx-js.stone.com.br/test/v2/3ds2.min.js",
	},
	pagseguro: "https://assets.pagseguro.com.br/checkout-sdk-js/rc/dist/browser/pagseguro.min.js",
} as const;

const DEFAULT_TIMEOUT_MS = 5 * 60 * 1000;
const LYRA_TIMEOUT_MS = 10 * 60 * 1000;

type ProviderFn = (options: ThreeDSecureOptions) => Promise<ThreeDSecureResult>;

function detectWindowSize(): "01" | "02" | "03" | "04" | "05" {
	const w = window.innerWidth;
	if (w <= 480) return "01";
	if (w <= 768) return "02";
	if (w <= 1024) return "03";
	return "04";
}

export class PayConductor3DSSDK {
	private iframe: HTMLIFrameElement | null = null;
	private messageListener: ((event: MessageEvent) => void) | null = null;
	private timeoutId: ReturnType<typeof setTimeout> | null = null;
	private tempElements: HTMLElement[] = [];

	private readonly data: ThreeDSecureData;

	private readonly providers: Record<string, ProviderFn> = {
		MercadoPago: (o) => this.mercadoPago(o),
		PayConductor: (o) => this.payConductor(o),
		PagarMe: (o) => this.pagarMe(o),
		PagSeguro: (o) => this.pagSeguro(o),
	};

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
		const opts: ThreeDSecureOptions = { ...options, threeDSecure: this.data };

		if (!this.needsChallenge) {
			return { status: ThreeDSecureResultStatus.Success };
		}

		const provider = this.providers[this.data.acquirer ?? ""];
		if (provider) return provider(opts);

		if (this.data.authToken && !this.data.operationUrl && !this.data.threeDsUrl) {
			return {
				status: ThreeDSecureResultStatus.Success,
				authToken: this.data.authToken,
				dsTransactionId: this.data.dsTransactionId,
			};
		}

		return this.fail(`Unsupported 3DS provider: ${this.data.acquirer}`);
	}

	destroy(): void {
		if (this.timeoutId) { clearTimeout(this.timeoutId); this.timeoutId = null; }
		if (this.messageListener) { window.removeEventListener("message", this.messageListener); this.messageListener = null; }
		if (this.iframe) { this.iframe.remove(); this.iframe = null; }
		for (const el of this.tempElements) el.remove();
		this.tempElements = [];
	}

	//#region Providers

	private mercadoPago(options: ThreeDSecureOptions): Promise<ThreeDSecureResult> {
		const { onComplete, onError, onTimeout } = options;
		const { threeDsUrl, creq } = this.data;

		if (!threeDsUrl || !creq) {
			return Promise.resolve(this.fail("Missing threeDsUrl or creq", onError));
		}

		const container = this.resolveContainer(options);
		if (!container) return Promise.resolve(this.fail("Container not found", onError));

		return new Promise<ThreeDSecureResult>((resolve) => {
			this.injectChallengeStyles();

			this.iframe = document.createElement("iframe");
			this.iframe.name = "payconductor-3ds-challenge";
			this.iframe.id = "payconductor-3ds-challenge";
			container.appendChild(this.iframe);

			this.messageListener = (event: MessageEvent) => {
				if (event.data?.status === "COMPLETE") {
					this.destroy();
					onComplete?.();
					resolve({ status: ThreeDSecureResultStatus.Success });
				}
			};
			window.addEventListener("message", this.messageListener);
			this.startTimeout(options.timeoutMs ?? DEFAULT_TIMEOUT_MS, onTimeout, resolve);

			const iframeDoc = this.iframe.contentWindow?.document;
			if (!iframeDoc) {
				this.destroy();
				resolve(this.fail("Cannot access iframe document", onError));
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

	private async payConductor(options: ThreeDSecureOptions): Promise<ThreeDSecureResult> {
		const { onComplete, onError, onTimeout } = options;
		const { operationUrl, publicKey } = this.data;

		if (!operationUrl || !publicKey) {
			return this.fail("Missing operationUrl or publicKey", onError);
		}

		try { await loadScript(SDK_URLS.lyra); }
		catch { return this.fail("Failed to load 3DS SDK", onError); }

		const KrAuthenticate = window.KrAuthenticate;
		if (!KrAuthenticate) {
			return this.fail("KrAuthenticate not available", onError);
		}

		return new Promise<ThreeDSecureResult>((resolve) => {
			this.startTimeout(options.timeoutMs ?? LYRA_TIMEOUT_MS, onTimeout, resolve);

			const container = this.resolveContainer(options);
			const krOptions = container && container !== document.body ? { element: container } : undefined;
			const sdk = new KrAuthenticate(publicKey, krOptions);

			sdk.authenticate(operationUrl, () => {
				this.clearTimeout();
				onComplete?.();
				resolve({ status: ThreeDSecureResultStatus.Success });
			});
		});
	}

	private async pagarMe(options: ThreeDSecureOptions): Promise<ThreeDSecureResult> {
		const { onComplete, onError, onTimeout } = options;
		const { authToken } = this.data;

		if (!authToken) return this.fail("Missing authToken for PagarMe 3DS", onError);

		const env = this.data.environment ?? "Production";

		try { await loadScript(SDK_URLS.stone[env]); }
		catch { return this.fail("Failed to load Stone 3DS SDK", onError); }

		const sdk = window.TDS;
		if (!sdk) return this.fail("Stone TDS SDK not available", onError);

		const container = this.resolveContainer(options) || document.body;
		const methodContainer = this.createTempElement();

		return new Promise<ThreeDSecureResult>((resolve) => {
			this.startTimeout(options.timeoutMs ?? DEFAULT_TIMEOUT_MS, onTimeout, resolve);

			sdk.init(
				{
					token: authToken,
					tds_method_container_element: methodContainer,
					challenge_container_element: container,
					use_default_challenge_iframe_style: true,
					challenge_window_size: detectWindowSize(),
				},
				options.providerData ?? {},
			).then((responses) => {
				this.clearTimeout();
				if (!responses?.length) {
					resolve(this.fail("PagarMe 3DS returned no response", onError));
					return;
				}

				const result = responses[0];
				if (result.challenge_canceled) {
					resolve(this.fail("3DS challenge canceled by user", onError));
					return;
				}

				if (result.trans_status === "Y" || result.trans_status === "A") {
					onComplete?.();
					resolve({ status: ThreeDSecureResultStatus.Success, dsTransactionId: result.tds_server_trans_id });
				} else {
					resolve(this.fail(`3DS failed with status: ${result.trans_status}`, onError));
				}
			}).catch((err: unknown) => {
				this.clearTimeout();
				resolve(this.fail(err instanceof Error ? err.message : "PagarMe 3DS failed", onError));
			});
		});
	}

	private async pagSeguro(options: ThreeDSecureOptions): Promise<ThreeDSecureResult> {
		const { onComplete, onError } = options;
		const { authToken, operationUrl } = this.data;

		if (!authToken || !operationUrl) {
			return this.fail("Missing authToken or operationUrl for PagSeguro 3DS", onError);
		}

		const env = this.data.environment === "Sandbox" ? "SANDBOX" : "PROD";

		try { await loadScript(SDK_URLS.pagseguro); }
		catch { return this.fail("Failed to load PagSeguro SDK", onError); }

		const sdk = window.PagSeguro;
		if (!sdk) return this.fail("PagSeguro SDK not available", onError);

		sdk.setUp({ session: authToken, env });

		try {
			const result = await sdk.authenticate3DS(
				options.providerData as unknown as PagSeguroAuthRequestGlobal ?? { data: {} },
			);

			if (result.status === "AUTH_FLOW_COMPLETED" || result.status === "AUTH_NOT_SUPPORTED") {
				onComplete?.();
				return { status: ThreeDSecureResultStatus.Success, dsTransactionId: result.id };
			}

			if (result.status === "CHANGE_PAYMENT_METHOD") {
				return this.fail("PagSeguro requires a different payment method", onError);
			}

			return { status: ThreeDSecureResultStatus.Success, dsTransactionId: result.id };
		} catch (err: unknown) {
			return this.fail(err instanceof Error ? err.message : "PagSeguro 3DS failed", onError);
		}
	}

	//#endregion

	//#region Helpers

	private fail(message: string, onError?: (error: Error) => void): ThreeDSecureResult {
		const error = new Error(message);
		onError?.(error);
		return { status: ThreeDSecureResultStatus.Failed, error };
	}

	private resolveContainer(options: ThreeDSecureOptions): HTMLElement | null {
		if (options.container) return options.container;
		if (options.containerId) return document.getElementById(options.containerId);
		return document.body;
	}

	private startTimeout(ms: number, onTimeout: (() => void) | undefined, resolve: (r: ThreeDSecureResult) => void): void {
		this.timeoutId = setTimeout(() => { this.destroy(); onTimeout?.(); resolve({ status: ThreeDSecureResultStatus.Timeout }); }, ms);
	}

	private clearTimeout(): void {
		if (this.timeoutId) { clearTimeout(this.timeoutId); this.timeoutId = null; }
	}

	private createTempElement(): HTMLElement {
		const el = document.createElement("div");
		el.style.display = "none";
		document.body.appendChild(el);
		this.tempElements.push(el);
		return el;
	}

	private injectChallengeStyles(): void {
		if (document.getElementById("payconductor-3ds-styles")) return;
		const style = document.createElement("style");
		style.id = "payconductor-3ds-styles";
		style.textContent = `
			#payconductor-3ds-challenge { width: 500px; height: 600px; border: none; }
			@media only screen and (max-width: 980px) { #payconductor-3ds-challenge { width: 100%; height: 440px; } }
		`;
		document.head.appendChild(style);
	}

	//#endregion
}
