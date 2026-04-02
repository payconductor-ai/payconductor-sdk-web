import { AbstractTokenizerProvider } from '../types';

export declare class MercadoPagoTokenizerProvider extends AbstractTokenizerProvider {
    scriptUrl: string;
    tokenize(): Promise<string>;
}
