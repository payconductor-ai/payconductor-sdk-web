import { PayConductorTokenizeSDK } from "../tokenize";
import type { CardTokenizeRequest } from "../tokenize/types";
export type UseTokenizeOptions = {
  publicKey: string;
  onSuccess?: (token: string) => void;
  onError?: (error: Error) => void;
};
export type UseTokenizeReturn = {
  tokenizeCard: (input: CardTokenizeRequest) => Promise<string | null>;
};
export function useTokenize(options: UseTokenizeOptions): UseTokenizeReturn {
  const sdk = new PayConductorTokenizeSDK(options.publicKey);
  const tokenizeCard = async (input: CardTokenizeRequest): Promise<string | null> => {
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