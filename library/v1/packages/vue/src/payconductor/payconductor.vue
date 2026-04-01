<template>
  <div
    class="payconductor"
    id="payconductor"
    :style="{
      display: 'contents',
    }"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import type {
  PayConductorConfig,
  PaymentMethod,
  PaymentResult,
} from "./iframe/types";
import {
  confirmPayment,
  createPendingRequestsMap,
  handleMessageEvent,
  resetPayment,
  sendConfig,
  validatePayment,
} from "./internal";
import type {
  PayConductorApi,
  PayConductorFrame,
  PayConductorState,
  PendingRequest,
} from "./types";
import { POST_MESSAGES } from "./constants";
import { buildIframeUrl } from "./utils";

export interface PayConductorEmbedProps
  extends Omit<PayConductorConfig, "orderId"> {
  children?: any;
  showActionButtons?: boolean;
  debug?: boolean;
  onReady?: () => void;
  onError?: (error: Error) => void;
  onPaymentComplete?: (result: PaymentResult) => void;
  onPaymentFailed?: (result: PaymentResult) => void;
  onPaymentPending?: (result: PaymentResult) => void;
  onPaymentMethodSelected?: (method: PaymentMethod) => void;
  onThreeDSChallenge?: () => void;
  onThreeDSComplete?: () => void;
  onThreeDSFailed?: () => void;
}

export default defineComponent({
  name: "pay-conductor",

  props: [
    "debug",
    "publicKey",
    "theme",
    "locale",
    "paymentMethods",
    "defaultPaymentMethod",
    "showPaymentButtons",
    "nuPayConfig",
    "onReady",
    "onError",
    "onPaymentComplete",
    "onPaymentFailed",
    "onPaymentPending",
    "onPaymentMethodSelected",
    "onThreeDSChallenge",
    "onThreeDSComplete",
    "onThreeDSFailed",
  ],

  data() {
    return {
      isLoaded: false,
      error: null,
      iframeUrl: "",
      selectedPaymentMethod: null,
    };
  },

  mounted() {
    const log = (...args: any[]) => {
      if (this.debug) console.log("[PayConductor]", ...args);
    };
    const iframeUrl = buildIframeUrl({
      publicKey: this.publicKey,
    });
    this.iframeUrl = iframeUrl;
    this.isLoaded = true;
    const pendingMap: Map<string, PendingRequest> = createPendingRequestsMap();
    let configSent = false;
    log("init", this.publicKey);
    log("iframeUrl", iframeUrl);
    const getIframe = (): HTMLIFrameElement | undefined => {
      const ref = window.PayConductor?.frame?.iframe;
      if (ref) {
        if (ref instanceof HTMLIFrameElement) return ref;
        if (typeof ref === "object" && ref !== null) {
          const obj = ref as Record<string, unknown>;
          if ("current" in obj && obj.current instanceof HTMLIFrameElement)
            return obj.current;
          if ("value" in obj && obj.value instanceof HTMLIFrameElement)
            return obj.value;
        }
        return ref as HTMLIFrameElement;
      }
      return (
        (document.querySelector(
          ".payconductor-element iframe"
        ) as HTMLIFrameElement) ?? undefined
      );
    };
    const frame: PayConductorFrame = {
      get iframe(): HTMLIFrameElement | null {
        return (
          (document.querySelector(
            ".payconductor-element iframe"
          ) as HTMLIFrameElement) ?? null
        );
      },
      set iframe(_: HTMLIFrameElement | Element | unknown | null) {},
      iframeUrl,
      error: null,
    };
    const config: PayConductorConfig = {
      publicKey: this.publicKey,
      theme: this.theme,
      locale: this.locale,
      paymentMethods: this.paymentMethods,
      defaultPaymentMethod: this.defaultPaymentMethod,
    };
    const api: PayConductorApi = {
      confirmPayment: (options: { orderId: string }) => {
        log("→ CONFIRM_PAYMENT", {
          orderId: options.orderId,
        });
        const iframe = getIframe();
        if (iframe?.contentWindow) {
          iframe.contentWindow.postMessage(
            {
              type: POST_MESSAGES.CONFIG,
              data: {
                publicKey: this.publicKey,
                orderId: options.orderId,
                theme: this.theme,
                locale: this.locale,
                paymentMethods: this.paymentMethods,
                defaultPaymentMethod: this.defaultPaymentMethod,
                showPaymentButtons: this.showPaymentButtons,
                nuPayConfig: this.nuPayConfig,
              },
            },
            "*"
          );
        }
        config.orderId = options.orderId;
        if (window.PayConductor?.config) {
          window.PayConductor.config.orderId = options.orderId;
        }
        return confirmPayment(iframe, pendingMap, options);
      },
      validate: (data: unknown) => {
        log("→ VALIDATE", data);
        return validatePayment(getIframe(), pendingMap, data);
      },
      reset: () => {
        log("→ RESET");
        return resetPayment(getIframe(), pendingMap);
      },
      getSelectedPaymentMethod: () => this.selectedPaymentMethod,
    };
    window.PayConductor = {
      frame,
      config,
      api,
      selectedPaymentMethod: this.selectedPaymentMethod,
    };
    log("registered");
    window.dispatchEvent(
      new CustomEvent("payconductor:registered", {
        detail: window.PayConductor,
      })
    );
    const sendConfigToIframe = async () => {
      if (!configSent) {
        const iframe = getIframe();
        if (!iframe) {
          log("→ CONFIG skipped: iframe not found");
          return;
        }
        configSent = true;
        log("→ CONFIG", {
          theme: this.theme,
          locale: this.locale,
          paymentMethods: this.paymentMethods,
          defaultPaymentMethod: this.defaultPaymentMethod,
          showPaymentButtons: this.showPaymentButtons,
        });
        sendConfig(iframe, pendingMap, {
          theme: this.theme,
          locale: this.locale,
          paymentMethods: this.paymentMethods,
          defaultPaymentMethod: this.defaultPaymentMethod,
          showPaymentButtons: this.showPaymentButtons,
          nuPayConfig: this.nuPayConfig,
        });
      }
    };
    const eventHandler = (event: MessageEvent) => {
      if (event.data?.type) {
        log("←", event.data.type, event.data.data ?? "");
      }
      handleMessageEvent(
        event,
        pendingMap,
        (val) => {
          this.error = val;
          frame.error = val;
          if (window.PayConductor?.frame) {
            window.PayConductor.frame.error = val;
          }
        },
        () => {
          this.onReady?.();
          sendConfigToIframe();
        },
        (err) => {
          this.onError?.(err);
        },
        (data) => {
          this.onPaymentComplete?.(data as PaymentResult);
        },
        (data) => {
          this.onPaymentFailed?.(data as PaymentResult);
        },
        (data) => {
          this.onPaymentPending?.(data as PaymentResult);
        },
        (method) => {
          this.selectedPaymentMethod = method;
          if (window.PayConductor) {
            window.PayConductor.selectedPaymentMethod = method;
          }
          this.onPaymentMethodSelected?.(method);
        },
        () => {
          this.onThreeDSChallenge?.();
        },
        () => {
          this.onThreeDSComplete?.();
        },
        () => {
          this.onThreeDSFailed?.();
        }
      );
    };
    window.addEventListener("message", eventHandler);
    const trySendConfig = () => {
      const el = getIframe();
      if (!el) return false;
      try {
        const readyState =
          el.contentDocument?.readyState ??
          el.contentWindow?.document?.readyState;
        if (readyState === "complete") {
          sendConfigToIframe();
          return true;
        }
      } catch {}
      return false;
    };
    const pollForIframe = () => {
      if (trySendConfig()) return;
      const el = getIframe();
      if (el) {
        el.addEventListener("load", () => sendConfigToIframe(), {
          once: true,
        });
        return;
      }
      setTimeout(pollForIframe, 50);
    };
    pollForIframe();
  },
});
</script>