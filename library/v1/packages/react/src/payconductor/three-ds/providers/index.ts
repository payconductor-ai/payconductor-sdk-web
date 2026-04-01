import type { AbstractThreeDSProvider, ThreeDSecureData, ThreeDSecureOptions } from "../types";
import { MercadoPagoThreeDSProvider } from "./mercado-pago";
import { PayConductorThreeDSProvider } from "./payconductor";
import { PagarMeThreeDSProvider } from "./pagarme";
import { PagSeguroThreeDSProvider } from "./pagseguro";
import { IntegrationProvider } from "../../iframe/types";
type ThreeDSProviderConstructor = new (data: ThreeDSecureData, options: ThreeDSecureOptions) => AbstractThreeDSProvider;
export const threeDSProviders: Partial<Record<IntegrationProvider | "PayConductor", ThreeDSProviderConstructor>> = {
  [IntegrationProvider.MercadoPago]: MercadoPagoThreeDSProvider,
  PayConductor: PayConductorThreeDSProvider,
  [IntegrationProvider.PagarMe]: PagarMeThreeDSProvider,
  [IntegrationProvider.PagSeguro]: PagSeguroThreeDSProvider
}