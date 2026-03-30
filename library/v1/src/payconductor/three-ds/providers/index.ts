import type { AbstractThreeDSProvider, ThreeDSecureData, ThreeDSecureOptions } from "../types";
import { MercadoPagoThreeDSProvider } from "./mercado-pago";
import { PayConductorThreeDSProvider } from "./payconductor";
import { PagarMeThreeDSProvider } from "./pagarme";
import { PagSeguroThreeDSProvider } from "./pagseguro";
import { IntegrationProvider } from "../../tokenize/types";

type ThreeDSProviderConstructor = new (data: ThreeDSecureData, options: ThreeDSecureOptions) => AbstractThreeDSProvider;

export const threeDSProviders: Partial<Record<IntegrationProvider | "PayConductor", ThreeDSProviderConstructor>> = {
	MercadoPago: MercadoPagoThreeDSProvider,
	PayConductor: PayConductorThreeDSProvider,
	PagarMe: PagarMeThreeDSProvider,
	PagSeguro: PagSeguroThreeDSProvider,
};
