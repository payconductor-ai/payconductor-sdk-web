import { CardTokenizeRequest } from '../tokenize/types';

export type UseTokenizeOptions = {
    publicKey: string;
    onSuccess?: (token: string) => void;
    onError?: (error: Error) => void;
};
export type UseTokenizeReturn = {
    tokenizeCard: (input: CardTokenizeRequest) => Promise<string | null>;
};
export declare function useTokenize(options: UseTokenizeOptions): UseTokenizeReturn;
