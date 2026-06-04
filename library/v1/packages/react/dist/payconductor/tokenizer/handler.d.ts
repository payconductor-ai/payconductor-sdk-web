import { CardTokenizerRequest } from './types';

export declare class PayConductorTokenizerSDK {
    private readonly publicKey;
    private readonly api;
    constructor(publicKey: string);
    tokenizeCard(input: CardTokenizerRequest): Promise<string>;
    private validateCard;
}
