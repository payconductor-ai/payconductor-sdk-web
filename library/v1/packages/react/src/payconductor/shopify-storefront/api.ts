import type { PaymentLinkAvailability, SalesChannelCartRequest, SalesChannelCartResponse, ShopifyAjaxCart } from "./types";
export class PayConductorShopifyStorefrontApiError extends Error {
  constructor(message: string, public readonly status?: number) {
    super(message);
    this.name = "PayConductorShopifyStorefrontApiError";
  }
}
class StorefrontRequest {
  static async json<T>(url: string, init?: RequestInit): Promise<T> {
    const response = await fetch(url, {
      ...init,
      headers: {
        Accept: "application/json",
        ...init?.headers
      }
    });
    if (!response.ok) {
      throw new PayConductorShopifyStorefrontApiError(`${url} respondeu ${response.status}`, response.status);
    }
    return (await response.json()) as T;
  }
}
export class PayConductorShopifyStorefrontApi {
  private static readonly CART_PATH = "/api/v1/sales-channel/shopify/cart";
  private static readonly PAYMENT_LINK_PATH = "/api/v1/payment-links/";
  constructor(private readonly baseUrl: string) {}
  createCartLink(input: SalesChannelCartRequest): Promise<SalesChannelCartResponse> {
    return StorefrontRequest.json(`${this.baseUrl}${PayConductorShopifyStorefrontApi.CART_PATH}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(input)
    });
  }
  getPaymentLinkAvailability(paymentLinkId: string): Promise<PaymentLinkAvailability> {
    return StorefrontRequest.json(`${this.baseUrl}${PayConductorShopifyStorefrontApi.PAYMENT_LINK_PATH}${encodeURIComponent(paymentLinkId)}`);
  }
}
export class ShopifyAjaxCartApi {
  constructor(private readonly root: string) {}
  get(): Promise<ShopifyAjaxCart> {
    return StorefrontRequest.json(`${this.root}cart.js`);
  }
  add(form: HTMLFormElement): Promise<unknown> {
    return StorefrontRequest.json(`${this.root}cart/add.js`, {
      method: "POST",
      body: new FormData(form)
    });
  }
  clear(): Promise<unknown> {
    return StorefrontRequest.json(`${this.root}cart/clear.js`, {
      method: "POST"
    });
  }
}