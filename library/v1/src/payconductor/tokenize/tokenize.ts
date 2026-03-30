import { loadScript } from "../loader";
import { PayConductorApi } from "./api";
import { instanceProvider } from "./providers";
import type { CardTokenizeRequest, SaveTokensBody } from "./types";

export class PayConductorTokenizeSDK {
	private readonly api: PayConductorApi;

	constructor(private readonly publicKey: string) {
		this.api = new PayConductorApi(this.publicKey);
	}

	async tokenizeCard(input: CardTokenizeRequest): Promise<string> {
		this.validateCard(input);

		const { customerId, token: cardToken } = await this.api.createToken({
			card: input.card,
			customer: input.customer,
			saveCard: false,
		});

		const { settings } = await this.api.getSettings();

		const results = await Promise.all(
			settings.map(async (setting) => {
				const instance = instanceProvider(setting.key, {
					...input,
					setting: setting.settings,
				});

				if (!instance) return null;

				await loadScript(instance.scriptUrl);
				const token = await instance.tokenize();

				return {
					token,
					integrationId: setting.integrationId,
					providerKey: setting.key,
				} satisfies SaveTokensBody;
			}),
		);

		const filtered = results.filter((e) => e !== null);

		if (filtered.length > 0) {
			await this.api.saveTokens(filtered, customerId, cardToken);
		}

		return cardToken;
	}

	private validateCard(input: CardTokenizeRequest) {
		const { number, cvv, expiration, holderName } = input.card;
		if (!number || !cvv || !expiration?.month || !expiration?.year || !holderName) {
			throw new Error("Invalid card data");
		}
	}
}
