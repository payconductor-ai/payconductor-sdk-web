import { AbstractTokenizeProvider, TokenizeProviderInput } from '../types';
import { IntegrationProvider } from '../../iframe/types';

type TokenizeProviderConstructor = new (input: TokenizeProviderInput) => AbstractTokenizeProvider;
export declare const tokenizeProviders: Partial<Record<IntegrationProvider, TokenizeProviderConstructor>>;
export {};
