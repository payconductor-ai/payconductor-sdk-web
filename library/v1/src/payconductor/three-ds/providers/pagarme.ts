import { loadScript } from "../../loader";
import { AbstractThreeDSProvider, ThreeDSecureResultStatus } from "../types";
import type { ThreeDSecureResult } from "../types";

const SDK_URLS = {
	Production: "https://3ds-nx-js.stone.com.br/live/v2/3ds2.min.js",
	Sandbox: "https://3ds-nx-js.stone.com.br/test/v2/3ds2.min.js",
} as const;

const DEFAULT_TIMEOUT_MS = 5 * 60 * 1000;

function detectWindowSize(): "01" | "02" | "03" | "04" | "05" {
	const w = window.innerWidth;
	if (w <= 480) return "01";
	if (w <= 768) return "02";
	if (w <= 1024) return "03";
	return "04";
}

export class PagarMeThreeDSProvider extends AbstractThreeDSProvider {
	private timeoutId: ReturnType<typeof setTimeout> | null = null;
	private methodContainer: HTMLElement | null = null;

	async authenticate(): Promise<ThreeDSecureResult> {
		const { authToken, card, customer, amount, billingAddress } = this.data;

		if (!authToken) return this.fail("Missing authToken for PagarMe 3DS");
		if (!card) return this.fail("Missing card data for PagarMe 3DS");

		const env = this.data.environment ?? "Production";

		try { await loadScript(SDK_URLS[env]); }
		catch { return this.fail("Failed to load Stone 3DS SDK"); }

		const tds = window.TDS;
		if (!tds) return this.fail("Stone TDS SDK not available");

		const container = this.resolveContainer();

		this.methodContainer = document.createElement("div");
		this.methodContainer.style.display = "none";
		document.body.appendChild(this.methodContainer);

		const orderData = this.buildOrderData();

		return new Promise<ThreeDSecureResult>((resolve) => {
			this.timeoutId = setTimeout(() => {
				this.cleanup();
				this.options.onTimeout?.();
				resolve({ status: ThreeDSecureResultStatus.Timeout });
			}, this.options.timeoutMs ?? DEFAULT_TIMEOUT_MS);

			tds.init(
				{
					token: authToken,
					tds_method_container_element: this.methodContainer as HTMLElement,
					challenge_container_element: container,
					use_default_challenge_iframe_style: true,
					challenge_window_size: detectWindowSize(),
				},
				orderData,
			).then((responses) => {
				this.cleanup();
				if (!responses?.length) {
					resolve(this.fail("PagarMe 3DS returned no response"));
					return;
				}

				const result = responses[0];
				if (result.challenge_canceled) {
					resolve(this.fail("3DS challenge canceled by user"));
					return;
				}

				if (result.trans_status === "Y" || result.trans_status === "A") {
					this.options.onComplete?.();
					resolve({ status: ThreeDSecureResultStatus.Success, dsTransactionId: result.tds_server_trans_id });
				} else {
					resolve(this.fail(`3DS failed with status: ${result.trans_status}`));
				}
			}).catch((err: unknown) => {
				this.cleanup();
				resolve(this.fail(err instanceof Error ? err.message : "PagarMe 3DS failed"));
			});
		});
	}

	cleanup(): void {
		if (this.timeoutId) { clearTimeout(this.timeoutId); this.timeoutId = null; }
		if (this.methodContainer) { this.methodContainer.remove(); this.methodContainer = null; }
		this.closeModal();
	}

	private buildOrderData(): Record<string, unknown> {
		const { card, customer, amount, billingAddress } = this.data;

		return {
			payments: [{
				payment_method: "credit_card",
				credit_card: {
					card: {
						number: card?.number,
						holder_name: card?.holderName,
						exp_month: card?.expMonth,
						exp_year: card?.expYear,
						billing_address: billingAddress ? {
							country: billingAddress.country,
							state: billingAddress.regionCode,
							city: billingAddress.city,
							zip_code: billingAddress.postalCode,
							line_1: `${billingAddress.number}, ${billingAddress.street}`,
							line_2: billingAddress.complement,
						} : undefined,
					},
				},
				amount: amount?.value,
			}],
			...(customer ? {
				customer: {
					name: customer.name,
					email: customer.email,
					...(customer.phones?.length ? {
						phones: {
							mobile_phone: {
								country_code: customer.phones[0].country,
								area_code: customer.phones[0].area,
								number: customer.phones[0].number,
							},
						},
					} : {}),
				},
			} : {}),
		};
	}
}
