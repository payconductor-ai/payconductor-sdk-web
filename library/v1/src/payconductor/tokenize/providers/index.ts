import { IntegrationProvider, type TokenizeProviderFn } from "../types";
import { tokenizeMercadoPago } from "./mercado-pago";

export const tokenizeProviders: Partial<Record<IntegrationProvider, TokenizeProviderFn>> = {
	[IntegrationProvider.MercadoPago]: tokenizeMercadoPago,
};
