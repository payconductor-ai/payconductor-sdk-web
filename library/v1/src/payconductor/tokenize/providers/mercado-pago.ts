import { loadScript } from "../../loader";
import { DocumentType, type TokenizeProviderInput } from "../types";

const SDK_URL = "https://sdk.mercadopago.com/js/v2";

export async function tokenizeMercadoPago(input: TokenizeProviderInput): Promise<string> {
	if (!("publicKey" in input.setting)) {
		throw new Error("MercadoPago public key is missing in settings");
	}

	if (!input.customer.documentNumber) {
		throw new Error("Customer document number is required for tokenization");
	}

	await loadScript(SDK_URL);

	const MP = window.MercadoPago;
	if (!MP) throw new Error("MercadoPago SDK not available");

	const mp = new MP(input.setting.publicKey as string);
	const { expiration, cvv, number, holderName } = input.card;

	const res = await mp.createCardToken({
		cardExpirationMonth: String(expiration.month),
		cardExpirationYear: String(expiration.year),
		cardholderName: holderName,
		cardNumber: number,
		securityCode: cvv,
		identificationType: input.customer.documentType === DocumentType.Cpf ? "CPF" : "CNPJ",
		identificationNumber: input.customer.documentNumber,
	});

	return res.id;
}
