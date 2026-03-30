import { AbstractTokenizeProvider } from '../types';

export declare class MercadoPagoTokenizeProvider extends AbstractTokenizeProvider {
    scriptUrl: string;
    tokenize(): Promise<string>;
}
