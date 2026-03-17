import { jsx as S } from "react/jsx-runtime";
import { useState as C, useEffect as D, useRef as g } from "react";
const L = "https://iframe.payconductor.ai/v1", F = "http://localhost:5175/v1", V = 3e4, H = "600px";
var B = /* @__PURE__ */ ((e) => (e.Pix = "Pix", e.CreditCard = "CreditCard", e.DebitCard = "DebitCard", e.BankSlip = "BankSlip", e.Crypto = "Crypto", e.ApplePay = "ApplePay", e.NuPay = "NuPay", e.PicPay = "PicPay", e.AmazonPay = "AmazonPay", e.SepaDebit = "SepaDebit", e.GooglePay = "GooglePay", e))(B || {}), k = /* @__PURE__ */ ((e) => (e.Grid = "grid", e.Vertical = "vertical", e.Horizontal = "horizontal", e))(k || {}), G = /* @__PURE__ */ ((e) => (e.Succeeded = "succeeded", e.Pending = "pending", e.Failed = "failed", e))(G || {}), Y = /* @__PURE__ */ ((e) => (e.Android = "android", e.IOS = "ios", e.Web = "web", e))(Y || {}), K = /* @__PURE__ */ ((e) => (e.Padding = "padding", e.Radius = "radius", e.Color = "color", e.Background = "background", e.Shadow = "shadow", e))(K || {}), T = /* @__PURE__ */ ((e) => (e.Init = "Init", e.Config = "Config", e.Update = "Update", e.ConfirmPayment = "ConfirmPayment", e.Validate = "Validate", e.Reset = "Reset", e))(T || {}), h = /* @__PURE__ */ ((e) => (e.Ready = "Ready", e.Error = "Error", e.PaymentComplete = "PaymentComplete", e.PaymentFailed = "PaymentFailed", e.PaymentPending = "PaymentPending", e.ValidationError = "ValidationError", e.PaymentMethodSelected = "PaymentMethodSelected", e))(h || {}), W = /* @__PURE__ */ ((e) => (e.InvalidClient = "InvalidClient", e.InvalidToken = "InvalidToken", e.NetworkError = "NetworkError", e.IframeNotReady = "IframeNotReady", e.PaymentDeclined = "PaymentDeclined", e.ValidationError = "ValidationError", e.Timeout = "Timeout", e))(W || {});
const ce = {
  primaryColor: "#0066ff",
  secondaryColor: "#5a6b7c",
  backgroundColor: "transparent",
  surfaceColor: "#f8fafc",
  textColor: "#0f172a",
  textSecondaryColor: "#64748b",
  errorColor: "#ef4444",
  successColor: "#22c55e",
  warningColor: "#f59e0b",
  borderColor: "#e2e8f0",
  disabledColor: "#cbd5e1",
  fontFamily: '"Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  fontSize: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem"
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    bold: 600
  },
  lineHeight: "1.5",
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px"
  },
  borderRadius: "8px",
  borderWidth: "1px",
  boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  boxShadowHover: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  inputBackground: "#ffffff",
  inputBorderColor: "#cbd5e1",
  inputBorderRadius: "8px",
  inputHeight: "44px",
  inputPadding: "12px 16px",
  buttonHeight: "48px",
  buttonPadding: "16px 24px",
  buttonBorderRadius: "8px",
  transitionDuration: "0.2s",
  transitionTimingFunction: "ease"
}, q = typeof window < "u" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") && !window.location.search.includes("production"), z = q ? F : L, j = [F, L], Q = H, $ = V, u = {
  INIT: T.Init,
  CONFIG: T.Config,
  UPDATE: T.Update,
  CONFIRM_PAYMENT: T.ConfirmPayment,
  VALIDATE: T.Validate,
  RESET: T.Reset,
  READY: h.Ready,
  ERROR: h.Error,
  PAYMENT_COMPLETE: h.PaymentComplete,
  PAYMENT_FAILED: h.PaymentFailed,
  PAYMENT_PENDING: h.PaymentPending,
  VALIDATION_ERROR: h.ValidationError,
  PAYMENT_METHOD_SELECTED: h.PaymentMethodSelected
}, le = {
  INVALID_CLIENT: "InvalidClient",
  INVALID_TOKEN: "InvalidToken",
  NETWORK_ERROR: "NetworkError",
  IFRAME_NOT_READY: "IframeNotReady",
  PAYMENT_DECLINED: "PaymentDeclined",
  VALIDATION_ERROR: "ValidationError",
  TIMEOUT: "Timeout"
};
function J(e) {
  const r = new URLSearchParams({
    publicKey: e.publicKey
  });
  return `${z}?${r.toString()}`;
}
function X() {
  return crypto.randomUUID();
}
function Z(e, r) {
  return r.some((n) => {
    try {
      return new URL(n).origin === e;
    } catch {
      return n === e;
    }
  });
}
function v() {
  return /* @__PURE__ */ new Map();
}
function b(e, r, n, t) {
  return new Promise((d, l) => {
    if (!e || !("contentWindow" in e)) {
      l(new Error("Iframe not defined"));
      return;
    }
    if (!(e != null && e.contentWindow)) {
      l(new Error("Iframe not ready"));
      return;
    }
    if (!r) {
      l(new Error("Pending requests not initialized"));
      return;
    }
    const m = X();
    r.set(m, {
      resolve: d,
      reject: l
    }), e.contentWindow.postMessage({
      type: n,
      data: t,
      requestId: m
    }, "*"), setTimeout(() => {
      r != null && r.has(m) && (r.delete(m), l(new Error("Request timeout")));
    }, $);
  });
}
function p(e, r, n) {
  return b(e, r, u.CONFIRM_PAYMENT, {
    orderId: n.orderId
  });
}
function ee(e, r, n) {
  return b(e, r, u.VALIDATE, n);
}
function te(e, r) {
  return b(e, r, u.RESET);
}
function ne(e, r, n) {
  return b(e, r, u.CONFIG, n);
}
function re(e, r, n) {
  return b(e, r, u.INIT, n);
}
function oe(e, r, n, t, d, l, m, P, y) {
  const E = e.data, {
    requestId: w,
    type: I,
    data: c,
    error: f
  } = E;
  if (I === u.READY) {
    if (t == null || t(), w && (r != null && r.has(w))) {
      const {
        resolve: R
      } = r.get(w);
      r.delete(w), R(c);
    }
    return;
  }
  if (Z(e.origin, j)) {
    if (w && r && r.has(w)) {
      const {
        resolve: R,
        reject: A
      } = r.get(w);
      r.delete(w), f ? A(new Error(String(f.message))) : R(c);
      return;
    }
    if (I === u.ERROR) {
      n((f == null ? void 0 : f.message) || "Unknown error"), d == null || d(new Error(String(f == null ? void 0 : f.message)));
      return;
    }
    if (I === u.PAYMENT_COMPLETE) {
      c && typeof c == "object" && "status" in c && (l == null || l(c));
      return;
    }
    if (I === u.PAYMENT_FAILED) {
      c && typeof c == "object" && "status" in c && (m == null || m(c));
      return;
    }
    if (I === u.PAYMENT_PENDING) {
      c && typeof c == "object" && "status" in c && (P == null || P(c));
      return;
    }
    if (I === u.PAYMENT_METHOD_SELECTED) {
      c && typeof c == "object" && "paymentMethod" in c && (y == null || y(c.paymentMethod));
      return;
    }
  }
}
function ue(e) {
  const [r, n] = C(
    () => !1
  ), [t, d] = C(() => null), [l, m] = C(
    () => ""
  ), [P, y] = C(() => null);
  return D(() => {
    const E = (...o) => {
      e.debug && console.log("[PayConductor]", ...o);
    }, w = J({
      publicKey: e.publicKey
    });
    m(w), n(!0);
    const I = v();
    let c = !1;
    E("init", e.publicKey), E("iframeUrl", w);
    const f = () => {
      var s, a;
      const o = (a = (s = window.PayConductor) == null ? void 0 : s.frame) == null ? void 0 : a.iframe;
      if (o) {
        if (o instanceof HTMLIFrameElement)
          return o;
        if (typeof o == "object" && o !== null) {
          const i = o;
          if ("current" in i && i.current instanceof HTMLIFrameElement)
            return i.current;
          if ("value" in i && i.value instanceof HTMLIFrameElement)
            return i.value;
        }
        return o;
      }
      return document.querySelector(
        ".payconductor-element iframe"
      ) ?? void 0;
    }, R = {
      get iframe() {
        return document.querySelector(
          ".payconductor-element iframe"
        ) ?? null;
      },
      set iframe(o) {
      },
      iframeUrl: w,
      error: null
    }, A = {
      publicKey: e.publicKey,
      theme: e.theme,
      locale: e.locale,
      paymentMethods: e.paymentMethods,
      defaultPaymentMethod: e.defaultPaymentMethod
    }, O = {
      confirmPayment: (o) => {
        var a;
        E("→ CONFIRM_PAYMENT", {
          orderId: o.orderId
        });
        const s = f();
        return s != null && s.contentWindow && s.contentWindow.postMessage(
          {
            type: u.CONFIG,
            data: {
              publicKey: e.publicKey,
              orderId: o.orderId,
              theme: e.theme,
              locale: e.locale,
              paymentMethods: e.paymentMethods,
              defaultPaymentMethod: e.defaultPaymentMethod,
              showPaymentButtons: e.showPaymentButtons,
              nuPayConfig: e.nuPayConfig
            }
          },
          "*"
        ), A.orderId = o.orderId, (a = window.PayConductor) != null && a.config && (window.PayConductor.config.orderId = o.orderId), p(s, I, o);
      },
      validate: (o) => (E("→ VALIDATE", o), ee(f(), I, o)),
      reset: () => (E("→ RESET"), te(f(), I)),
      getSelectedPaymentMethod: () => P
    };
    window.PayConductor = {
      frame: R,
      config: A,
      api: O,
      selectedPaymentMethod: P
    }, E("registered"), window.dispatchEvent(
      new CustomEvent("payconductor:registered", {
        detail: window.PayConductor
      })
    );
    const N = async () => {
      if (!c) {
        const o = f();
        if (!o) {
          E("→ CONFIG skipped: iframe not found");
          return;
        }
        c = !0, E("→ CONFIG", {
          theme: e.theme,
          locale: e.locale,
          paymentMethods: e.paymentMethods,
          defaultPaymentMethod: e.defaultPaymentMethod,
          showPaymentButtons: e.showPaymentButtons
        }), ne(o, I, {
          theme: e.theme,
          locale: e.locale,
          paymentMethods: e.paymentMethods,
          defaultPaymentMethod: e.defaultPaymentMethod,
          showPaymentButtons: e.showPaymentButtons,
          nuPayConfig: e.nuPayConfig
        });
      }
    }, x = (o) => {
      var s;
      (s = o.data) != null && s.type && E("←", o.data.type, o.data.data ?? ""), oe(
        o,
        I,
        (a) => {
          var i;
          d(a), R.error = a, (i = window.PayConductor) != null && i.frame && (window.PayConductor.frame.error = a);
        },
        () => {
          var a;
          (a = e.onReady) == null || a.call(e), N();
        },
        (a) => {
          var i;
          (i = e.onError) == null || i.call(e, a);
        },
        (a) => {
          var i;
          (i = e.onPaymentComplete) == null || i.call(e, a);
        },
        (a) => {
          var i;
          (i = e.onPaymentFailed) == null || i.call(e, a);
        },
        (a) => {
          var i;
          (i = e.onPaymentPending) == null || i.call(e, a);
        },
        (a) => {
          var i;
          y(a), window.PayConductor && (window.PayConductor.selectedPaymentMethod = a), (i = e.onPaymentMethodSelected) == null || i.call(e, a);
        }
      );
    };
    window.addEventListener("message", x);
    const U = () => {
      var s, a, i;
      const o = f();
      if (!o)
        return !1;
      try {
        if ((((s = o.contentDocument) == null ? void 0 : s.readyState) ?? ((i = (a = o.contentWindow) == null ? void 0 : a.document) == null ? void 0 : i.readyState)) === "complete")
          return N(), !0;
      } catch {
      }
      return !1;
    }, M = () => {
      if (U())
        return;
      const o = f();
      if (o) {
        o.addEventListener("load", () => N(), {
          once: !0
        });
        return;
      }
      setTimeout(M, 50);
    };
    M();
  }, []), /* @__PURE__ */ S(
    "div",
    {
      className: "payconductor",
      id: "payconductor",
      style: {
        display: "contents"
      },
      children: e.children
    }
  );
}
function fe(e) {
  const r = g(null), [n, t] = C(() => ""), [d, l] = C(() => !1);
  return D(() => {
    const m = (y) => {
      y != null && y.frame && (t(y.frame.iframeUrl || ""), l(!0), console.log("init", {
        PayConductor: window.PayConductor
      }));
    }, P = typeof window < "u" ? window.PayConductor : null;
    if (P)
      m(P);
    else {
      const y = (E) => {
        m(E.detail), window.removeEventListener("payconductor:registered", y);
      };
      window.addEventListener("payconductor:registered", y);
    }
  }, []), /* @__PURE__ */ S(
    "div",
    {
      className: "payconductor-element",
      style: {
        width: "100%"
      },
      children: d && n ? /* @__PURE__ */ S(
        "iframe",
        {
          allow: "payment",
          title: "PayConductor",
          ref: r,
          src: n,
          style: {
            width: "100%",
            height: e.height || Q,
            border: "none"
          }
        }
      ) : null
    }
  );
}
function se() {
  const e = typeof window < "u" ? window.PayConductor : null, r = e != null && e.config ? {
    publicKey: e.config.publicKey,
    orderId: e.config.orderId,
    theme: e.config.theme,
    locale: e.config.locale
  } : {}, n = e != null && e.frame ? {
    iframe: e.frame.iframe,
    error: e.frame.error
  } : {
    iframe: null,
    error: null
  };
  return {
    ...r,
    ...n
  };
}
function _(e) {
  var r;
  if ((r = e == null ? void 0 : e.frame) != null && r.iframe) {
    const n = e.frame.iframe;
    if (n instanceof HTMLIFrameElement)
      return n;
    if (n && typeof n == "object") {
      if ("current" in n) {
        const t = n.current;
        if (t instanceof HTMLIFrameElement)
          return t;
      }
      if ("value" in n) {
        const t = n.value;
        if (t instanceof HTMLIFrameElement)
          return t;
      }
    }
  }
  return document.querySelector(".payconductor-element iframe") ?? null;
}
function me() {
  const e = () => typeof window < "u" ? window.PayConductor : null, r = (n, t) => {
    const d = e();
    if (!d)
      return;
    const l = _(d);
    l != null && l.contentWindow && l.contentWindow.postMessage({
      type: n,
      data: t
    }, "*");
  };
  return {
    init: async (n) => {
      const t = _(e()), d = v();
      return re(t || void 0, d, n);
    },
    confirmPayment: async (n) => {
      if (!n.orderId)
        throw new Error("Order ID is required");
      const t = e();
      if (!(t != null && t.api))
        throw new Error("PayConductor not initialized");
      return t.api.confirmPayment(n);
    },
    validate: (n) => {
      const t = e();
      return t ? t.api.validate(n) : Promise.resolve(!1);
    },
    reset: () => {
      const n = e();
      return n ? n.api.reset() : Promise.resolve();
    },
    getSelectedPaymentMethod: () => {
      var n;
      return ((n = e()) == null ? void 0 : n.selectedPaymentMethod) ?? null;
    },
    updateConfig: (n) => {
      var d;
      const t = (d = e()) == null ? void 0 : d.config;
      r(u.CONFIG, {
        publicKey: t == null ? void 0 : t.publicKey,
        orderId: t == null ? void 0 : t.orderId,
        theme: n.theme ?? (t == null ? void 0 : t.theme),
        locale: n.locale ?? (t == null ? void 0 : t.locale),
        paymentMethods: n.paymentMethods ?? (t == null ? void 0 : t.paymentMethods)
      });
    },
    updateOrderId: (n) => {
      var d;
      const t = (d = e()) == null ? void 0 : d.config;
      r(u.CONFIG, {
        publicKey: t == null ? void 0 : t.publicKey,
        orderId: n,
        theme: t == null ? void 0 : t.theme,
        locale: t == null ? void 0 : t.locale,
        paymentMethods: t == null ? void 0 : t.paymentMethods
      });
    },
    update: (n) => {
      r(u.UPDATE, n);
    },
    submit: async () => {
      const n = _(e()), t = v();
      try {
        return await b(n || void 0, t, u.CONFIRM_PAYMENT, {}), {
          paymentMethod: void 0
        };
      } catch (d) {
        return {
          error: {
            message: d instanceof Error ? d.message : "Payment failed",
            code: "payment_error",
            type: "payment_error"
          }
        };
      }
    }
  };
}
export {
  j as ALLOWED_ORIGINS,
  Y as DeviceType,
  le as ERROR_CODES,
  W as ErrorCode,
  z as IFRAME_BASE_URL,
  Q as IFRAME_DEFAULT_HEIGHT_VALUE,
  h as IncomingMessage,
  K as InputStyleKey,
  T as OutgoingMessage,
  u as POST_MESSAGES,
  ue as PayConductor,
  fe as PayConductorCheckoutElement,
  B as PaymentMethod,
  k as PaymentMethodLayout,
  G as PaymentStatus,
  $ as REQUEST_TIMEOUT,
  J as buildIframeUrl,
  ue as default,
  ce as defaultTheme,
  X as generateRequestId,
  Z as isValidOrigin,
  se as usePayConductor,
  me as usePayconductorElement
};
//# sourceMappingURL=index.es.js.map
