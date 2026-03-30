import { CardTokenizeRequest } from './types';

export declare class PayConductorTokenizeSDK {
    private readonly publicKey;
    private readonly api;
    constructor(publicKey: string);
    tokenizeCard(input: CardTokenizeRequest): Promise<string>;
    private validateCard;
}
