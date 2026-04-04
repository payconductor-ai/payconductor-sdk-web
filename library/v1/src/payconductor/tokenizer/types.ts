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

export abstract class AbstractTokenizerProvider {
	constructor(protected readonly input: TokenizerProviderInput) {}

	abstract scriptUrl: string;
	abstract tokenize(): Promise<string>;
}

export type SaveTokensBody = {
	integrationId: string;
	providerKey: IntegrationProvider;
	token: string;
};

export type CreateCustomerCard = {
	customer: CreateCustomerInput;
	card: CreateCardInput;
	saveCard: boolean;
};
