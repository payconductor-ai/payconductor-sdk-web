import { CardTokenizerRequest } from '../tokenizer/types';

export type UseTokenizerOptions = {
    publicKey: string;
    onSuccess?: (token: string) => void;
    onError?: (error: Error) => void;
};
export type UseTokenizerReturn = {
    tokenizeCard: (input: CardTokenizerRequest) => Promise<string | null>;
};
export declare function useTokenizer(options: UseTokenizerOptions): UseTokenizerReturn;
