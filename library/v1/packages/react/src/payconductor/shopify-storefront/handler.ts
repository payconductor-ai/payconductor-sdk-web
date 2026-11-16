import { PayConductorShopifyStorefrontApi, ShopifyAjaxCartApi } from "./api";
import { type PendingCart, SalesChannelCheckoutStatus, type SalesChannelCartRequest, type ShopifyAjaxCart, type ShopifyAjaxCartItem, type ShopifyStorefrontConfig, ShopifyStorefrontStorageKey } from "./types";
export class PayConductorShopifyStorefrontSDK {
  private static readonly CHECKOUT_SELECTORS = '[name="checkout"], a[href$="/checkout"]';
  private static readonly BUY_NOW_SELECTORS = '.shopify-payment-button__button, shopify-buy-it-now-button button, shopify-accelerated-checkout button, [data-shopify="payment-button"] button';
  private static readonly PRODUCT_FORM_SELECTOR = 'form[action$="/cart/add"]';
  private static readonly CHECKOUT_SUBMITTER_NAME = "checkout";
  private static readonly OVERLAY_ID = "payconductor-checkout-error";
  private static readonly ERROR_MESSAGE = "Não foi possível iniciar o pagamento. Tente novamente.";
  private static readonly RETRY_LABEL = "Tentar novamente";
  private static readonly CLOSE_LABEL = "Fechar";
  private static readonly LOG_PREFIX = "[PayConductor]";
  private readonly root = window.Shopify?.routes?.root ?? "/";
  private readonly api: PayConductorShopifyStorefrontApi;
  private readonly cart: ShopifyAjaxCartApi;
  private isRedirecting = false;
  private retry: () => Promise<void> = () => this.checkout();
  constructor(private readonly config: ShopifyStorefrontConfig) {
    this.api = new PayConductorShopifyStorefrontApi(config.api);
    this.cart = new ShopifyAjaxCartApi(this.root);
  }
  static init(script: HTMLOrSVGScriptElement | null): void {
    if (!(script instanceof HTMLScriptElement)) {
      return;
    }
    const {
      api,
      shop,
      integration,
      interceptBuyNow,
      debug
    } = script.dataset;
    if (!api || !shop || !integration) {
      return;
    }
    new PayConductorShopifyStorefrontSDK({
      api,
      shop,
      integrationId: integration,
      interceptBuyNow: interceptBuyNow === "true",
      debug: debug === "true"
    }).listen();
  }
  listen(): void {
    document.addEventListener("click", this.handleClick, true);
    document.addEventListener("submit", this.handleSubmit, true);
    window.addEventListener("pageshow", () => this.setBusy(false));
    this.clearPaidCart().catch(error => this.log(error));
  }
  private readonly handleClick = (event: MouseEvent): void => {
    const sdk = PayConductorShopifyStorefrontSDK;
    if (sdk.findInPath(event, sdk.CHECKOUT_SELECTORS)) {
      this.intercept(event, () => this.checkout());
      return;
    }
    if (this.config.interceptBuyNow && sdk.findInPath(event, sdk.BUY_NOW_SELECTORS)) {
      const form = sdk.findInPath(event, sdk.PRODUCT_FORM_SELECTOR) ?? document.querySelector(sdk.PRODUCT_FORM_SELECTOR);
      this.intercept(event, () => this.buyNow(form instanceof HTMLFormElement ? form : null));
    }
  };
  private readonly handleSubmit = (event: SubmitEvent): void => {
    if (event.submitter?.getAttribute("name") === PayConductorShopifyStorefrontSDK.CHECKOUT_SUBMITTER_NAME) {
      this.intercept(event, () => this.checkout());
    }
  };
  private intercept(event: Event, action: () => Promise<void>): void {
    event.preventDefault();
    event.stopImmediatePropagation();
    this.run(action);
  }
  private run(action: () => Promise<void>): void {
    if (this.isRedirecting) {
      return;
    }
    this.retry = action;
    this.setBusy(true);
    action().catch(error => {
      this.log(error);
      this.setBusy(false);
      this.showError();
    });
  }
  private setBusy(busy: boolean): void {
    this.isRedirecting = busy;
    document.documentElement.style.cursor = busy ? "progress" : "";
  }
  private async buyNow(form: HTMLFormElement | null): Promise<void> {
    if (!form) {
      throw new Error("Formulário do produto não encontrado");
    }
    await this.cart.add(form);
    this.retry = () => this.checkout();
    await this.checkout();
  }
  private async checkout(): Promise<void> {
    const cart = await this.cart.get();
    const result = await this.api.createCartLink(this.toPayload(cart));
    if (result.status === SalesChannelCheckoutStatus.Disabled) {
      document.removeEventListener("click", this.handleClick, true);
      document.removeEventListener("submit", this.handleSubmit, true);
      window.location.assign(`${this.root}checkout`);
      return;
    }
    if (!result.url || !result.paymentLinkId) {
      throw new Error("Resposta sem link de pagamento");
    }
    this.writePendingCart({
      cartToken: cart.token,
      paymentLinkId: result.paymentLinkId
    });
    window.location.assign(result.url);
  }
  private toPayload(cart: ShopifyAjaxCart): SalesChannelCartRequest {
    return {
      integrationId: this.config.integrationId,
      shop: this.config.shop,
      cartToken: cart.token,
      items: cart.items.map(item => ({
        variantId: String(item.variant_id),
        qty: item.quantity,
        properties: PayConductorShopifyStorefrontSDK.toProperties(item.properties)
      })),
      discountCodes: cart.discount_codes?.filter(discount => discount.applicable).map(discount => discount.code),
      note: cart.note || undefined
    };
  }
  private async clearPaidCart(): Promise<void> {
    const pending = PayConductorShopifyStorefrontSDK.readPendingCart();
    if (!pending) {
      return;
    }
    const [cart, view] = await Promise.all([this.cart.get(), this.api.getPaymentLinkAvailability(pending.paymentLinkId)]);
    if (cart.token === pending.cartToken && view.availability.isAvailable) {
      return;
    }
    const paid = cart.token === pending.cartToken && view.availability.reason === "exhausted";
    if (paid) {
      await this.cart.clear();
    }
    localStorage.removeItem(ShopifyStorefrontStorageKey.PendingCart);
    if (paid && cart.items.length > 0) {
      window.location.reload();
    }
  }
  private showError(): void {
    const sdk = PayConductorShopifyStorefrontSDK;
    document.getElementById(sdk.OVERLAY_ID)?.remove();
    const overlay = document.createElement("div");
    overlay.id = sdk.OVERLAY_ID;
    overlay.setAttribute("role", "alertdialog");
    overlay.setAttribute("aria-modal", "true");
    Object.assign(overlay.style, {
      position: "fixed",
      inset: "0",
      zIndex: "2147483647",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "rgba(0, 0, 0, 0.5)"
    });
    const dialog = document.createElement("div");
    Object.assign(dialog.style, {
      background: "#fff",
      color: "#111",
      padding: "24px",
      margin: "16px",
      maxWidth: "360px",
      borderRadius: "12px",
      textAlign: "center",
      fontFamily: "inherit"
    });
    const message = document.createElement("p");
    message.textContent = sdk.ERROR_MESSAGE;
    message.style.margin = "0 0 16px";
    const retry = sdk.createButton(sdk.RETRY_LABEL, true, () => {
      overlay.remove();
      this.run(this.retry);
    });
    const close = sdk.createButton(sdk.CLOSE_LABEL, false, () => overlay.remove());
    dialog.append(message, retry, close);
    overlay.append(dialog);
    document.body.append(overlay);
    retry.focus();
  }
  private writePendingCart(pending: PendingCart): void {
    try {
      localStorage.setItem(ShopifyStorefrontStorageKey.PendingCart, JSON.stringify(pending));
    } catch (error) {
      this.log(error);
    }
  }
  private log(error: unknown): void {
    if (this.config.debug) {
      console.error(PayConductorShopifyStorefrontSDK.LOG_PREFIX, error);
    }
  }
  private static createButton(label: string, primary: boolean, onClick: () => void): HTMLButtonElement {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = label;
    Object.assign(button.style, {
      margin: "4px",
      padding: "10px 16px",
      borderRadius: "8px",
      border: "1px solid #111",
      background: primary ? "#111" : "transparent",
      color: primary ? "#fff" : "#111",
      cursor: "pointer",
      font: "inherit"
    });
    button.addEventListener("click", onClick);
    return button;
  }
  private static findInPath(event: Event, selectors: string): Element | null {
    for (const node of event.composedPath()) {
      if (node instanceof Element && node.matches(selectors)) {
        return node;
      }
    }
    return null;
  }
  private static toProperties(properties: ShopifyAjaxCartItem["properties"]): Record<string, string> | undefined {
    const entries = Object.entries(properties ?? {}).filter((entry): entry is [string, string] => typeof entry[1] === "string" && entry[1] !== "");
    return entries.length > 0 ? Object.fromEntries(entries) : undefined;
  }
  private static readPendingCart(): PendingCart | null {
    try {
      const value: unknown = JSON.parse(localStorage.getItem(ShopifyStorefrontStorageKey.PendingCart) ?? "null");
      return PayConductorShopifyStorefrontSDK.isPendingCart(value) ? value : null;
    } catch {
      return null;
    }
  }
  private static isPendingCart(value: unknown): value is PendingCart {
    return typeof value === "object" && value !== null && "cartToken" in value && typeof value.cartToken === "string" && "paymentLinkId" in value && typeof value.paymentLinkId === "string";
  }
}