import { CreateCustomerCard, IntegrationProvider, SaveTokensBody } from './types';

export declare class PayConductorApiError extends Error {
    readonly title?: unknown | undefined;
    constructor(message: string, title?: unknown | undefined);
}
export declare class PayConductorApi {
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
