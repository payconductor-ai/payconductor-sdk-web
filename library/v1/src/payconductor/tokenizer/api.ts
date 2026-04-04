import type {
	CreateCustomerCard,
	SaveTokensBody,
} from "./types";
import { IntegrationProvider } from "../iframe/types";

export class PayConductorTokenizerApiError extends Error {
	constructor(
		message: string,
		public readonly title?: unknown,
	) {
		super(message);
		this.name = "PayConductorTokenizerApiError";
	}
}

export class PayConductorTokenizerApi {
	constructor(private readonly publicKey: string) {}

	async getSettings() {
		const res = await fetch(`${this.baseUrl}/card-tokenization/settings`, {
			method: "GET",
			headers: this.headers,
		});

		if (!res.ok) await this.parseResponseError("Failed to fetch settings", res);

		return await res.json() as Promise<{
			settings: {
				settings: Record<string, string | number | boolean>;
				key: IntegrationProvider;
				integrationId: string;
			}[];
		}>;
	}

	async createToken(input: CreateCustomerCard) {
		const res = await fetch(`${this.baseUrl}/card-tokenization/tokenize`, {
			method: "POST",
			headers: this.headers,
			body: JSON.stringify(input),
		});

		if (!res.ok)
			await this.parseResponseError("Failed to generate token", res);

		return await res.json() as Promise<{ token: string; customerId: string }>;
	}

	async saveTokens(
		data: SaveTokensBody[],
		customerId: string,
		cardToken: string,
	) {
		const res = await fetch(
			`${this.baseUrl}/card-tokenization/save-tokens/${customerId}/${cardToken}`,
			{
				method: "POST",
				headers: this.headers,
				body: JSON.stringify(data),
			},
		);

		if (!res.ok) await this.parseResponseError("Failed to save tokens", res);
	}

	private async parseResponseError(
		errorTitle: string,
		res: Response,
	): Promise<never> {
		let errorMessage = "";
		try {
			const errorData = await res.json();
			if (errorData?.message) {
				errorMessage = errorData.message;
			} else if (errorData?.error?.message) {
				errorMessage = errorData.error;
			} else if (errorData?.error?.value?.message) {
				errorMessage = errorData.error.value.message;
			} else if (errorData?.value?.message) {
				errorMessage = errorData.value.message;
			} else {
				errorMessage = JSON.stringify(errorData);
			}
		} catch {
			// Response wasn't JSON
		}
		throw new PayConductorTokenizerApiError(errorMessage, errorTitle);
	}

	private get baseUrl() {
		if (
			typeof window !== "undefined" &&
			window.location.href.includes("localhost")
		) {
			return "http://localhost:3000/api/v1/sdk";
		}
		return "https://payconductor.ai/api/v1/sdk";
	}

	private get headers() {
		return {
			Authorization: `Basic ${btoa(`${this.publicKey}:x`)}`,
			"Content-Type": "application/json",
		};
	}
}
