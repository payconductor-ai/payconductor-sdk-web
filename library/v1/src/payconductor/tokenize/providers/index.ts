import { IntegrationProvider, type TokenizeProviderInput } from "../types";
import { MercadoPagoProvider } from "./mercado-pago";

export function instanceProvider(
	provider: IntegrationProvider,
	data: TokenizeProviderInput,
) {
	switch (provider) {
		case IntegrationProvider.MercadoPago:
			return new MercadoPagoProvider(data);
		default:
			return null;
	}
}
