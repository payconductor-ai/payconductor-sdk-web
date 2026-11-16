export enum SalesChannelCheckoutStatus {
	Redirect = "Redirect",
	Disabled = "Disabled",
}

export enum ShopifyStorefrontStorageKey {
	PendingCart = "payconductor:pending-cart",
}

export type PaymentLinkUnavailableReason = "inactive" | "expired" | "exhausted";

export type ShopifyStorefrontConfig = {
	api: string;
	shop: string;
	integrationId: string;
	interceptBuyNow: boolean;
	debug: boolean;
};

export type ShopifyAjaxCartItem = {
	variant_id: number;
	quantity: number;
	properties: Record<string, unknown> | null;
};

export type ShopifyAjaxCart = {
	token: string;
	note: string | null;
	items: ShopifyAjaxCartItem[];
	discount_codes?: { code: string; applicable: boolean }[];
};

export type SalesChannelCartLine = {
	variantId: string;
	qty: number;
	properties?: Record<string, string>;
};

export type SalesChannelCartRequest = {
	integrationId: string;
	shop: string;
	cartToken: string;
	items: SalesChannelCartLine[];
	discountCodes?: string[];
	note?: string;
};

export type SalesChannelCartResponse = {
	status: SalesChannelCheckoutStatus;
	url?: string;
	paymentLinkId?: string;
};

export type PaymentLinkAvailability = {
	availability: {
		isAvailable: boolean;
		reason: PaymentLinkUnavailableReason | null;
	};
};

export type PendingCart = {
	cartToken: string;
	paymentLinkId: string;
};
