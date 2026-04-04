import { PayConductorTokenizerSDK } from "../tokenizer";
import type { CardTokenizerRequest } from "../tokenizer/types";
export type UseTokenizerOptions = {
  publicKey: string;
  onSuccess?: (token: string) => void;
  onError?: (error: Error) => void;
};
export type UseTokenizerReturn = {
  tokenizeCard: (input: CardTokenizerRequest) => Promise<string | null>;
};
export function useTokenizer(options: UseTokenizerOptions): UseTokenizerReturn {
  const sdk = new PayConductorTokenizerSDK(options.publicKey);
  const tokenizeCard = async (input: CardTokenizerRequest): Promise<string | null> => {
    try {
      const token = await sdk.tokenizeCard(input);
      options.onSuccess?.(token);
      return token;
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Tokenization failed");
      options.onError?.(error);
      return null;
    }
  };
  return {
    tokenizeCard
  };
}