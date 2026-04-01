import { CreateCustomerCard, SaveTokensBody } from './types';
import { IntegrationProvider } from '../iframe/types';

export declare class PayConductorTokenizeApiError extends Error {
    readonly title?: unknown | undefined;
    constructor(message: string, title?: unknown | undefined);
}
export declare class PayConductorTokenizeApi {
    private readonly publicKey;
    constructor(publicKey: string);
    getSettings(): Promise<{
        settings: {
            settings: Record<string, string | number | boolean>;
            key: IntegrationProvider;
            integrationId: string;
        }[];
    }>;
    createToken(input: CreateCustomerCard): Promise<{
        token: string;
        customerId: string;
    }>;
    saveTokens(data: SaveTokensBody[], customerId: string, cardToken: string): Promise<void>;
    private parseResponseError;
    private get baseUrl();
    private get headers();
}
