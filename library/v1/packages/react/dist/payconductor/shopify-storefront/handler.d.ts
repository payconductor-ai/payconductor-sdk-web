import { ShopifyStorefrontConfig } from './types';

export declare class PayConductorShopifyStorefrontSDK {
    private readonly config;
    private static readonly CHECKOUT_SELECTORS;
    private static readonly BUY_NOW_SELECTORS;
    private static readonly PRODUCT_FORM_SELECTOR;
    private static readonly CHECKOUT_SUBMITTER_NAME;
    private static readonly OVERLAY_ID;
    private static readonly ERROR_MESSAGE;
    private static readonly RETRY_LABEL;
    private static readonly CLOSE_LABEL;
    private static readonly LOG_PREFIX;
    private readonly root;
    private readonly api;
    private readonly cart;
    private isRedirecting;
    private retry;
    constructor(config: ShopifyStorefrontConfig);
    static init(script: HTMLOrSVGScriptElement | null): void;
    listen(): void;
    private readonly handleClick;
    private readonly handleSubmit;
    private intercept;
    private run;
    private setBusy;
    private buyNow;
    private checkout;
    private toPayload;
    private clearPaidCart;
    private showError;
    private writePendingCart;
    private log;
    private static createButton;
    private static findInPath;
    private static toProperties;
    private static readPendingCart;
    private static isPendingCart;
}
