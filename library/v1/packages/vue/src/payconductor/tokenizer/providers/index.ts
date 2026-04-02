import type { AbstractTokenizerProvider, TokenizerProviderInput } from "../types";
import { MercadoPagoTokenizerProvider } from "./mercado-pago";
import { IntegrationProvider } from "../../iframe/types";
type TokenizerProviderConstructor = new (input: TokenizerProviderInput) => AbstractTokenizerProvider;
export const tokenizerProviders: Partial<Record<IntegrationProvider, TokenizerProviderConstructor>> = {
  [IntegrationProvider.MercadoPago]: MercadoPagoTokenizerProvider
}