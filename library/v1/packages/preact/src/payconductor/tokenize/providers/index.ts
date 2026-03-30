import type { AbstractTokenizeProvider, TokenizeProviderInput } from "../types";
import { IntegrationProvider } from "../types";
import { MercadoPagoTokenizeProvider } from "./mercado-pago";
type TokenizeProviderConstructor = new (input: TokenizeProviderInput) => AbstractTokenizeProvider;
export const tokenizeProviders: Partial<Record<IntegrationProvider, TokenizeProviderConstructor>> = {
  [IntegrationProvider.MercadoPago]: MercadoPagoTokenizeProvider
}