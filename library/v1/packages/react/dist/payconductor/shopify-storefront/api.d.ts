import { PaymentLinkAvailability, SalesChannelCartRequest, SalesChannelCartResponse, ShopifyAjaxCart } from './types';

export declare class PayConductorShopifyStorefrontApiError extends Error {
    readonly status?: number | undefined;
    constructor(message: string, status?: number | undefined);
}
export declare class PayConductorShopifyStorefrontApi {
    private readonly baseUrl;
    private static readonly CART_PATH;
    private static readonly PAYMENT_LINK_PATH;
    constructor(baseUrl: string);
    createCartLink(input: SalesChannelCartRequest): Promise<SalesChannelCartResponse>;
    getPaymentLinkAvailability(paymentLinkId: string): Promise<PaymentLinkAvailability>;
}
export declare class ShopifyAjaxCartApi {
    private readonly root;
    constructor(root: string);
    get(): Promise<ShopifyAjaxCart>;
    add(form: HTMLFormElement): Promise<unknown>;
    clear(): Promise<unknown>;
}
