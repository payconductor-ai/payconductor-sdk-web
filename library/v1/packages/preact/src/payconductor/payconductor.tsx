/** @jsx h */
import { h, Fragment } from "preact";
import { useState, useEffect } from "preact/hooks";

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

function PayConductor(props: PayConductorEmbedProps) {
  const [isLoaded, setIsLoaded] = useState<PayConductorState["isLoaded"]>(
    () => false
  );

  const [error, setError] = useState<PayConductorState["error"]>(() => null);

  const [iframeUrl, setIframeUrl] = useState<PayConductorState["iframeUrl"]>(
    () => ""
  );

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    PayConductorState["selectedPaymentMethod"]
  >(() => null);

  useEffect(() => {
    const log = (...args: any[]) => {
      if (props.debug) console.log("[PayConductor]", ...args);
    };
    const iframeUrl = buildIframeUrl({
      publicKey: props.publicKey,
    });
    setIframeUrl(iframeUrl);
    setIsLoaded(true);
    const pendingMap: Map<string, PendingRequest> = createPendingRequestsMap();
    let configSent = false;
    log("init", props.publicKey);
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
      publicKey: props.publicKey,
      theme: props.theme,
      locale: props.locale,
      paymentMethods: props.paymentMethods,
      defaultPaymentMethod: props.defaultPaymentMethod,
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
                publicKey: props.publicKey,
                orderId: options.orderId,
                theme: props.theme,
                locale: props.locale,
                paymentMethods: props.paymentMethods,
                defaultPaymentMethod: props.defaultPaymentMethod,
                showPaymentButtons: props.showPaymentButtons,
                nuPayConfig: props.nuPayConfig,
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
      getSelectedPaymentMethod: () => selectedPaymentMethod,
    };
    window.PayConductor = {
      frame,
      config,
      api,
      selectedPaymentMethod: selectedPaymentMethod,
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
          theme: props.theme,
          locale: props.locale,
          paymentMethods: props.paymentMethods,
          defaultPaymentMethod: props.defaultPaymentMethod,
          showPaymentButtons: props.showPaymentButtons,
        });
        sendConfig(iframe, pendingMap, {
          theme: props.theme,
          locale: props.locale,
          paymentMethods: props.paymentMethods,
          defaultPaymentMethod: props.defaultPaymentMethod,
          showPaymentButtons: props.showPaymentButtons,
          nuPayConfig: props.nuPayConfig,
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
          setError(val);
          frame.error = val;
          if (window.PayConductor?.frame) {
            window.PayConductor.frame.error = val;
          }
        },
        () => {
          props.onReady?.();
          sendConfigToIframe();
        },
        (err) => {
          props.onError?.(err);
        },
        (data) => {
          props.onPaymentComplete?.(data as PaymentResult);
        },
        (data) => {
          props.onPaymentFailed?.(data as PaymentResult);
        },
        (data) => {
          props.onPaymentPending?.(data as PaymentResult);
        },
        (method) => {
          setSelectedPaymentMethod(method);
          if (window.PayConductor) {
            window.PayConductor.selectedPaymentMethod = method;
          }
          props.onPaymentMethodSelected?.(method);
        },
        () => {
          props.onThreeDSChallenge?.();
        },
        () => {
          props.onThreeDSComplete?.();
        },
        () => {
          props.onThreeDSFailed?.();
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
  }, []);

  return (
    <div
      className="payconductor"
      id="payconductor"
      style={{
        display: "contents",
      }}
    >
      {props.children}
    </div>
  );
}

export default PayConductor;
