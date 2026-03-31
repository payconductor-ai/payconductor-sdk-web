import { loadScript } from "../../loader";
import { AbstractThreeDSProvider, ThreeDSecureResultStatus } from "../types";
import type { ThreeDSecureResult } from "../types";

const SDK_URL = "https://assets.pagseguro.com.br/checkout-sdk-js/rc/dist/browser/pagseguro.min.js";

export class PagSeguroThreeDSProvider extends AbstractThreeDSProvider {
	async authenticate(): Promise<ThreeDSecureResult> {
		const { authToken, card, customer, amount, installments, billingAddress } = this.data;

		if (!authToken) return this.fail("Missing authToken (session) for PagSeguro 3DS");
		if (!card) return this.fail("Missing card data for PagSeguro 3DS");
		if (!amount) return this.fail("Missing amount for PagSeguro 3DS");

		const env = this.data.environment === "Sandbox" ? "SANDBOX" : "PROD";

		try { await loadScript(SDK_URL); }
		catch { return this.fail("Failed to load PagSeguro SDK"); }

		const sdk = window.PagSeguro;
		if (!sdk) return this.fail("PagSeguro SDK not available");

		sdk.setUp({ session: authToken, env });

		try {
			const result = await sdk.authenticate3DS({
				data: {
					customer: customer ? {
						name: customer.name,
						email: customer.email,
						phones: customer.phones,
					} : undefined,
					paymentMethod: {
						type: "CREDIT_CARD",
						installments: installments ?? 1,
						card: {
							number: card.number,
							expMonth: card.expMonth,
							expYear: card.expYear,
							holder: { name: card.holderName },
						},
					},
					amount: { value: amount.value, currency: amount.currency },
					billingAddress,
					dataOnly: false,
				},
			});

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

	cleanup(): void {}
}
