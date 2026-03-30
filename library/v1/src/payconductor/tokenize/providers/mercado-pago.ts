import { AbstractCardTokenizeProvider } from "../types";
import { DocumentType } from "../types";

export class MercadoPagoProvider extends AbstractCardTokenizeProvider {
	scriptUrl = "https://sdk.mercadopago.com/js/v2";

	async tokenize(): Promise<string> {
		if (!("publicKey" in this.input.setting)) {
			throw new Error("Mercado Pago public key is missing in settings");
		}

		if (!this.input.customer.documentNumber) {
			throw new Error(
				"Customer document number is required for tokenization",
			);
		}

		if (!window.MercadoPago) {
			throw new Error("MercadoPago SDK not loaded");
		}

		const mercadoPago = new window.MercadoPago(
			this.input.setting.publicKey,
		);

		const { expiration, cvv, number, holderName } = this.input.card;

		const res = await mercadoPago.createCardToken({
			cardExpirationMonth: String(expiration.month),
			cardExpirationYear: String(expiration.year),
			cardholderName: holderName,
			cardNumber: number,
			securityCode: cvv,
			identificationType:
				this.input.customer.documentType === DocumentType.Cpf
					? "CPF"
					: "CNPJ",
			identificationNumber: this.input.customer.documentNumber,
		});

		return res.id;
	}
}
