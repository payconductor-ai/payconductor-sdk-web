import { DocumentType, IntegrationProvider } from "../iframe/types";

export type CreateCustomerInput = {
	documentNumber: string;
	documentType: `${DocumentType}`;
	email: string;
	name: string;
	phoneNumber: string;
	address?: {
		city: string;
		country: string;
		neighborhood: string;
		number: string;
		state: string;
		street: string;
		zipCode: string;
	};
};

export type CreateCardInput = {
	cvv: string;
	expiration: {
		month: number;
		year: number;
	};
	holderName: string;
	number: string;
};

export type TokenizerProviderInput = {
	customer: CreateCustomerInput;
	card: CreateCardInput;
	setting: Record<string, string | number | boolean>;
	saveCard?: boolean;
};

export type CardTokenizerRequest = Omit<TokenizerProviderInput, "setting">;

export type TokenizerFingerprints = {
	mercadoPagoSessionId?: string;
};

export abstract class AbstractTokenizerProvider {
	constructor(protected readonly input: TokenizerProviderInput) {}

	abstract scriptUrl: string;
	abstract tokenize(): Promise<string>;

	/**
	 * Fingerprints de dispositivo que precisam acompanhar o token na cobrança.
	 * Provedores que não precisam não sobrescrevem: o padrão é não enviar nada.
	 */
	async getFingerprints(): Promise<TokenizerFingerprints | undefined> {
		return undefined;
	}
}

export type SaveTokensBody = {
	integrationId: string;
	providerKey: IntegrationProvider;
	token: string;
	/** Fingerprints de dispositivo que precisam acompanhar o token na cobrança. */
	fingerprints?: TokenizerFingerprints;
};

export type CreateCustomerCard = {
	customer: CreateCustomerInput;
	card: CreateCardInput;
	saveCard: boolean;
};
