import type { AbstractTokenizeProvider, TokenizeProviderInput } from "../types";
import { MercadoPagoTokenizeProvider } from "./mercado-pago";
import { IntegrationProvider } from "../../iframe/types";
type TokenizeProviderConstructor = new (input: TokenizeProviderInput) => AbstractTokenizeProvider;
export const tokenizeProviders: Partial<Record<IntegrationProvider, TokenizeProviderConstructor>> = {
  [IntegrationProvider.MercadoPago]: MercadoPagoTokenizeProvider
}