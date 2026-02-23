<script context="module"></script>

<script>import { onMount } from "svelte";
import {
  confirmPayment,
  createPendingRequestsMap,
  handleMessageEvent,
  resetPayment,
  sendConfig,
  validatePayment
} from "./internal";
import { buildIframeUrl } from "./utils";
export let debug = void 0;
export let publicKey;
export let theme = void 0;
export let locale = void 0;
export let paymentMethods = void 0;
export let defaultPaymentMethod = void 0;
export let showPaymentButtons = void 0;
export let nuPayConfig = void 0;
export let onReady = void 0;
export let onError = void 0;
export let onPaymentComplete = void 0;
export let onPaymentFailed = void 0;
export let onPaymentPending = void 0;
export let onPaymentMethodSelected = void 0;
function stringifyStyles(stylesObj) {
  let styles = "";
  for (let key in stylesObj) {
    const dashedKey = key.replace(/[A-Z]/g, function(match) {
      return "-" + match.toLowerCase();
    });
    styles += dashedKey + ":" + stylesObj[key] + ";";
  }
  return styles;
}
let isLoaded = false;
let isReady = false;
let error = null;
let iframeUrl = "";
let selectedPaymentMethod = null;
onMount(() => {
  const log = (...args) => {
    if (debug)
      console.log("[PayConductor]", ...args);
  };
  const iframeUrl2 = buildIframeUrl({
    publicKey
  });
  iframeUrl2 = iframeUrl2;
  isLoaded = true;
  const pendingMap = createPendingRequestsMap();
  let configSent = false;
  log("init", publicKey);
  log("iframeUrl", iframeUrl2);
  const getIframe = () => {
    const ref = window.PayConductor?.frame?.iframe;
    if (ref) {
      if (ref instanceof HTMLIFrameElement)
        return ref;
      if (typeof ref === "object" && ref !== null) {
        const obj = ref;
        if ("current" in obj && obj.current instanceof HTMLIFrameElement)
          return obj.current;
        if ("value" in obj && obj.value instanceof HTMLIFrameElement)
          return obj.value;
      }
      return ref;
    }
    return document.querySelector(
      ".payconductor-element iframe"
    ) ?? void 0;
  };
  const frame = {
    get iframe() {
      return document.querySelector(
        ".payconductor-element iframe"
      ) ?? null;
    },
    set iframe(_) {
    },
    iframeUrl: iframeUrl2,
    isReady: window.PayConductor && window.PayConductor.frame ? window.PayConductor.frame.isReady : false,
    error: null
  };
  const config = {
    publicKey,
    theme,
    locale,
    paymentMethods,
    defaultPaymentMethod
  };
  const api = {
    confirmPayment: (options) => {
      log("\u2192 CONFIRM_PAYMENT", {
        orderId: options.orderId
      });
      return confirmPayment(getIframe(), pendingMap, options);
    },
    validate: (data) => {
      log("\u2192 VALIDATE", data);
      return validatePayment(getIframe(), pendingMap, data);
    },
    reset: () => {
      log("\u2192 RESET");
      return resetPayment(getIframe(), pendingMap);
    },
    getSelectedPaymentMethod: () => selectedPaymentMethod
  };
  window.PayConductor = {
    frame,
    config,
    api,
    selectedPaymentMethod
  };
  log("registered");
  window.dispatchEvent(
    new CustomEvent("payconductor:registered", {
      detail: window.PayConductor
    })
  );
  const sendConfigToIframe = async () => {
    if (!configSent) {
      const iframe = getIframe();
      if (!iframe) {
        log("\u2192 CONFIG skipped: iframe not found");
        return;
      }
      configSent = true;
      log("\u2192 CONFIG", {
        theme,
        locale,
        paymentMethods,
        defaultPaymentMethod,
        showPaymentButtons
      });
      sendConfig(iframe, pendingMap, {
        theme,
        locale,
        paymentMethods,
        defaultPaymentMethod,
        showPaymentButtons,
        nuPayConfig
      });
    }
  };
  const eventHandler = (event) => {
    if (event.data?.type) {
      log("\u2190", event.data.type, event.data.data ?? "");
    }
    handleMessageEvent(
      event,
      pendingMap,
      (val) => {
        isReady = val;
        frame.isReady = val;
        if (window.PayConductor?.frame)
          window.PayConductor.frame.isReady = val;
        if (val)
          sendConfigToIframe();
      },
      (val) => {
        error = val;
        frame.error = val;
        if (window.PayConductor?.frame)
          window.PayConductor.frame.error = val;
      },
      () => {
        onReady?.();
      },
      (err) => {
        onError?.(err);
      },
      (data) => {
        onPaymentComplete?.(data);
      },
      (data) => {
        onPaymentFailed?.(data);
      },
      (data) => {
        onPaymentPending?.(data);
      },
      (method) => {
        selectedPaymentMethod = method;
        if (window.PayConductor)
          window.PayConductor.selectedPaymentMethod = method;
        onPaymentMethodSelected?.(method);
      }
    );
  };
  window.addEventListener("message", eventHandler);
  const trySendConfig = () => {
    const el = getIframe();
    if (!el)
      return false;
    try {
      const readyState = el.contentDocument?.readyState ?? el.contentWindow?.document?.readyState;
      if (readyState === "complete") {
        sendConfigToIframe();
        return true;
      }
    } catch {
    }
    return false;
  };
  const pollForIframe = () => {
    if (trySendConfig())
      return;
    const el = getIframe();
    if (el) {
      el.addEventListener("load", () => sendConfigToIframe(), {
        once: true
      });
      return;
    }
    setTimeout(pollForIframe, 50);
  };
  pollForIframe();
});
</script>

<div
  style={stringifyStyles({
    display: "contents",
  })}
  class="payconductor"
  id="payconductor"
>
  <slot />
</div>