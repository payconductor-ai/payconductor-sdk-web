import { AbstractTokenizerProvider, TokenizerProviderInput } from '../types';
import { IntegrationProvider } from '../../iframe/types';

type TokenizerProviderConstructor = new (input: TokenizerProviderInput) => AbstractTokenizerProvider;
export declare const tokenizerProviders: Partial<Record<IntegrationProvider, TokenizerProviderConstructor>>;
export {};
