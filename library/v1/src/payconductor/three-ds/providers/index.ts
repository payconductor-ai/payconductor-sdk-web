import type { AbstractThreeDSProvider, ThreeDSecureData, ThreeDSecureOptions } from "../types";
import { MercadoPagoThreeDSProvider } from "./mercado-pago";
import { PayConductorThreeDSProvider } from "./payconductor";
import { PagarMeThreeDSProvider } from "./pagarme";
import { PagSeguroThreeDSProvider } from "./pagseguro";
import { IntegrationProvider } from "../../iframe/types";

type ThreeDSProviderConstructor = new (data: ThreeDSecureData, options: ThreeDSecureOptions) => AbstractThreeDSProvider;

export const threeDSProviders: Partial<Record<IntegrationProvider, ThreeDSProviderConstructor>> = {
	// Agnostic providers
	[IntegrationProvider.Lyra]: PayConductorThreeDSProvider,

	// Acquirer-specific providers
	[IntegrationProvider.MercadoPago]: MercadoPagoThreeDSProvider,
	[IntegrationProvider.PagarMe]: PagarMeThreeDSProvider,
	[IntegrationProvider.PagSeguro]: PagSeguroThreeDSProvider,
};
