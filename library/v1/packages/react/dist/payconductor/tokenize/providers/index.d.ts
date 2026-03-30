import { AbstractTokenizeProvider, TokenizeProviderInput, IntegrationProvider } from '../types';

type TokenizeProviderConstructor = new (input: TokenizeProviderInput) => AbstractTokenizeProvider;
export declare const tokenizeProviders: Partial<Record<IntegrationProvider, TokenizeProviderConstructor>>;
export {};
