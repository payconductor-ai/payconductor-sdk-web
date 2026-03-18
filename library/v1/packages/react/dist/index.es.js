import { jsx as _, jsxs as H } from "react/jsx-runtime";
import { useState as N, useEffect as O, useRef as V } from "react";
const x = "https://iframe.payconductor.ai/v1", F = "http://localhost:5175/v1", B = 3e4, Y = "600px";
var G = /* @__PURE__ */ ((e) => (e.Pix = "Pix", e.CreditCard = "CreditCard", e.DebitCard = "DebitCard", e.BankSlip = "BankSlip", e.Crypto = "Crypto", e.ApplePay = "ApplePay", e.NuPay = "NuPay", e.PicPay = "PicPay", e.AmazonPay = "AmazonPay", e.SepaDebit = "SepaDebit", e.GooglePay = "GooglePay", e))(G || {}), K = /* @__PURE__ */ ((e) => (e.Grid = "grid", e.Vertical = "vertical", e.Horizontal = "horizontal", e))(K || {}), W = /* @__PURE__ */ ((e) => (e.Succeeded = "succeeded", e.Pending = "pending", e.Failed = "failed", e))(W || {}), q = /* @__PURE__ */ ((e) => (e.Android = "android", e.IOS = "ios", e.Web = "web", e))(q || {}), z = /* @__PURE__ */ ((e) => (e.Padding = "padding", e.Radius = "radius", e.Color = "color", e.Background = "background", e.Shadow = "shadow", e))(z || {}), b = /* @__PURE__ */ ((e) => (e.Init = "Init", e.Config = "Config", e.Update = "Update", e.ConfirmPayment = "ConfirmPayment", e.Validate = "Validate", e.Reset = "Reset", e))(b || {}), I = /* @__PURE__ */ ((e) => (e.Ready = "Ready", e.Error = "Error", e.PaymentComplete = "PaymentComplete", e.PaymentFailed = "PaymentFailed", e.PaymentPending = "PaymentPending", e.ValidationError = "ValidationError", e.PaymentMethodSelected = "PaymentMethodSelected", e.Resize = "Resize", e))(I || {}), j = /* @__PURE__ */ ((e) => (e.InvalidClient = "InvalidClient", e.InvalidToken = "InvalidToken", e.NetworkError = "NetworkError", e.IframeNotReady = "IframeNotReady", e.PaymentDeclined = "PaymentDeclined", e.ValidationError = "ValidationError", e.Timeout = "Timeout", e))(j || {});
const se = {
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
}, Z = typeof window < "u" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") && !window.location.search.includes("production"), Q = Z ? F : x, $ = [F, x], D = Y, p = B, u = {
  INIT: b.Init,
  CONFIG: b.Config,
  UPDATE: b.Update,
  CONFIRM_PAYMENT: b.ConfirmPayment,
  VALIDATE: b.Validate,
  RESET: b.Reset,
  READY: I.Ready,
  ERROR: I.Error,
  PAYMENT_COMPLETE: I.PaymentComplete,
  PAYMENT_FAILED: I.PaymentFailed,
  PAYMENT_PENDING: I.PaymentPending,
  VALIDATION_ERROR: I.ValidationError,
  PAYMENT_METHOD_SELECTED: I.PaymentMethodSelected,
  RESIZE: I.Resize
}, fe = {
  INVALID_CLIENT: "InvalidClient",
  INVALID_TOKEN: "InvalidToken",
  NETWORK_ERROR: "NetworkError",
  IFRAME_NOT_READY: "IframeNotReady",
  PAYMENT_DECLINED: "PaymentDeclined",
  VALIDATION_ERROR: "ValidationError",
  TIMEOUT: "Timeout"
}, M = "payconductor-skeleton-style", J = `
	@keyframes payconductor-shimmer {
	  0% { background-position: -200% 0; }
	  100% { background-position: 200% 0; }
	}
	.payconductor-skeleton {
	  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
	  background-size: 200% 100%;
	  animation: payconductor-shimmer 1.5s infinite linear;
	  border-radius: 4px;
	  width: 100%;
	}
`;
function X(e) {
  const r = new URLSearchParams({
    publicKey: e.publicKey
  });
  return `${Q}?${r.toString()}`;
}
function ee() {
  return crypto.randomUUID();
}
function te(e, r) {
  return r.some((n) => {
    try {
      return new URL(n).origin === e;
    } catch {
      return n === e;
    }
  });
}
function L() {
  return /* @__PURE__ */ new Map();
}
function A(e, r, n, t) {
  return new Promise((c, s) => {
    if (!e || !("contentWindow" in e)) {
      s(new Error("Iframe not defined"));
      return;
    }
    if (!(e != null && e.contentWindow)) {
      s(new Error("Iframe not ready"));
      return;
    }
    if (!r) {
      s(new Error("Pending requests not initialized"));
      return;
    }
    const h = ee();
    r.set(h, {
      resolve: c,
      reject: s
    }), e.contentWindow.postMessage({
      type: n,
      data: t,
      requestId: h
    }, "*"), setTimeout(() => {
      r != null && r.has(h) && (r.delete(h), s(new Error("Request timeout")));
    }, p);
  });
}
function ne(e, r, n) {
  return A(e, r, u.CONFIRM_PAYMENT, {
    orderId: n.orderId
  });
}
function re(e, r, n) {
  return A(e, r, u.VALIDATE, n);
}
function oe(e, r) {
  return A(e, r, u.RESET);
}
function ae(e, r, n) {
  return A(e, r, u.CONFIG, n);
}
function ie(e, r, n) {
  return A(e, r, u.INIT, n);
}
function de(e, r, n, t, c, s, h, P, T) {
  const y = e.data, {
    requestId: m,
    type: f,
    data: o,
    error: l
  } = y;
  if (f === u.READY) {
    if (t == null || t(), m && (r != null && r.has(m))) {
      const {
        resolve: w
      } = r.get(m);
      r.delete(m), w(o);
    }
    return;
  }
  if (te(e.origin, $)) {
    if (m && r && r.has(m)) {
      const {
        resolve: w,
        reject: C
      } = r.get(m);
      r.delete(m), l ? C(new Error(String(l.message))) : w(o);
      return;
    }
    if (f === u.ERROR) {
      n((l == null ? void 0 : l.message) || "Unknown error"), c == null || c(new Error(String(l == null ? void 0 : l.message)));
      return;
    }
    if (f === u.PAYMENT_COMPLETE) {
      o && typeof o == "object" && "status" in o && (s == null || s(o));
      return;
    }
    if (f === u.PAYMENT_FAILED) {
      o && typeof o == "object" && "status" in o && (h == null || h(o));
      return;
    }
    if (f === u.PAYMENT_PENDING) {
      o && typeof o == "object" && "status" in o && (P == null || P(o));
      return;
    }
    if (f === u.PAYMENT_METHOD_SELECTED) {
      o && typeof o == "object" && "paymentMethod" in o && (T == null || T(o.paymentMethod));
      return;
    }
    u.RESIZE;
  }
}
function me(e) {
  const [r, n] = N(
    () => !1
  ), [t, c] = N(() => null), [s, h] = N(
    () => ""
  ), [P, T] = N(() => null);
  return O(() => {
    const y = (...a) => {
      e.debug && console.log("[PayConductor]", ...a);
    }, m = X({
      publicKey: e.publicKey
    });
    h(m), n(!0);
    const f = L();
    let o = !1;
    y("init", e.publicKey), y("iframeUrl", m);
    const l = () => {
      var E, i;
      const a = (i = (E = window.PayConductor) == null ? void 0 : E.frame) == null ? void 0 : i.iframe;
      if (a) {
        if (a instanceof HTMLIFrameElement)
          return a;
        if (typeof a == "object" && a !== null) {
          const d = a;
          if ("current" in d && d.current instanceof HTMLIFrameElement)
            return d.current;
          if ("value" in d && d.value instanceof HTMLIFrameElement)
            return d.value;
        }
        return a;
      }
      return document.querySelector(
        ".payconductor-element iframe"
      ) ?? void 0;
    }, w = {
      get iframe() {
        return document.querySelector(
          ".payconductor-element iframe"
        ) ?? null;
      },
      set iframe(a) {
      },
      iframeUrl: m,
      error: null
    }, C = {
      publicKey: e.publicKey,
      theme: e.theme,
      locale: e.locale,
      paymentMethods: e.paymentMethods,
      defaultPaymentMethod: e.defaultPaymentMethod
    }, S = {
      confirmPayment: (a) => {
        var i;
        y("→ CONFIRM_PAYMENT", {
          orderId: a.orderId
        });
        const E = l();
        return E != null && E.contentWindow && E.contentWindow.postMessage(
          {
            type: u.CONFIG,
            data: {
              publicKey: e.publicKey,
              orderId: a.orderId,
              theme: e.theme,
              locale: e.locale,
              paymentMethods: e.paymentMethods,
              defaultPaymentMethod: e.defaultPaymentMethod,
              showPaymentButtons: e.showPaymentButtons,
              nuPayConfig: e.nuPayConfig
            }
          },
          "*"
        ), C.orderId = a.orderId, (i = window.PayConductor) != null && i.config && (window.PayConductor.config.orderId = a.orderId), ne(E, f, a);
      },
      validate: (a) => (y("→ VALIDATE", a), re(l(), f, a)),
      reset: () => (y("→ RESET"), oe(l(), f)),
      getSelectedPaymentMethod: () => P
    };
    window.PayConductor = {
      frame: w,
      config: C,
      api: S,
      selectedPaymentMethod: P
    }, y("registered"), window.dispatchEvent(
      new CustomEvent("payconductor:registered", {
        detail: window.PayConductor
      })
    );
    const R = async () => {
      if (!o) {
        const a = l();
        if (!a) {
          y("→ CONFIG skipped: iframe not found");
          return;
        }
        o = !0, y("→ CONFIG", {
          theme: e.theme,
          locale: e.locale,
          paymentMethods: e.paymentMethods,
          defaultPaymentMethod: e.defaultPaymentMethod,
          showPaymentButtons: e.showPaymentButtons
        }), ae(a, f, {
          theme: e.theme,
          locale: e.locale,
          paymentMethods: e.paymentMethods,
          defaultPaymentMethod: e.defaultPaymentMethod,
          showPaymentButtons: e.showPaymentButtons,
          nuPayConfig: e.nuPayConfig
        });
      }
    }, U = (a) => {
      var E;
      (E = a.data) != null && E.type && y("←", a.data.type, a.data.data ?? ""), de(
        a,
        f,
        (i) => {
          var d;
          c(i), w.error = i, (d = window.PayConductor) != null && d.frame && (window.PayConductor.frame.error = i);
        },
        () => {
          var i;
          (i = e.onReady) == null || i.call(e), R();
        },
        (i) => {
          var d;
          (d = e.onError) == null || d.call(e, i);
        },
        (i) => {
          var d;
          (d = e.onPaymentComplete) == null || d.call(e, i);
        },
        (i) => {
          var d;
          (d = e.onPaymentFailed) == null || d.call(e, i);
        },
        (i) => {
          var d;
          (d = e.onPaymentPending) == null || d.call(e, i);
        },
        (i) => {
          var d;
          T(i), window.PayConductor && (window.PayConductor.selectedPaymentMethod = i), (d = e.onPaymentMethodSelected) == null || d.call(e, i);
        }
      );
    };
    window.addEventListener("message", U);
    const k = () => {
      var E, i, d;
      const a = l();
      if (!a)
        return !1;
      try {
        if ((((E = a.contentDocument) == null ? void 0 : E.readyState) ?? ((d = (i = a.contentWindow) == null ? void 0 : i.document) == null ? void 0 : d.readyState)) === "complete")
          return R(), !0;
      } catch {
      }
      return !1;
    }, v = () => {
      if (k())
        return;
      const a = l();
      if (a) {
        a.addEventListener("load", () => R(), {
          once: !0
        });
        return;
      }
      setTimeout(v, 50);
    };
    v();
  }, []), /* @__PURE__ */ _(
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
function ye(e) {
  const r = V(null), [n, t] = N(() => ""), [c, s] = N(() => !1), [h, P] = N(() => "");
  return O(() => {
    if (typeof document < "u" && !document.getElementById(M)) {
      const o = document.createElement("style");
      o.id = M, o.textContent = J, document.head.appendChild(o);
    }
    const T = (o) => {
      o != null && o.frame && (t(o.frame.iframeUrl || ""), s(!0), console.log("init", {
        PayConductor: window.PayConductor
      }));
    }, y = typeof window < "u" ? window.PayConductor : null;
    if (y)
      T(y);
    else {
      const o = (l) => {
        T(l.detail), window.removeEventListener("payconductor:registered", o);
      };
      window.addEventListener("payconductor:registered", o);
    }
    let m = !1;
    const f = (o) => {
      var l, w, C, S;
      if (((l = o.data) == null ? void 0 : l.type) === u.RESIZE && ((C = (w = o.data) == null ? void 0 : w.data) != null && C.height) && P(o.data.data.height + "px"), ((S = o.data) == null ? void 0 : S.type) === u.READY && e.height && !m) {
        m = !0;
        const R = document.querySelector(
          ".payconductor-element iframe"
        );
        R != null && R.contentWindow && R.contentWindow.postMessage(
          {
            type: u.CONFIG,
            data: {
              height: e.height
            },
            requestId: "element-height"
          },
          "*"
        );
      }
    };
    return window.addEventListener("message", f), () => window.removeEventListener("message", f);
  }, []), /* @__PURE__ */ H(
    "div",
    {
      className: "payconductor-element",
      style: {
        width: "100%"
      },
      children: [
        c ? null : /* @__PURE__ */ _(
          "div",
          {
            className: "payconductor-skeleton",
            style: {
              height: e.height || D
            }
          }
        ),
        c && n ? /* @__PURE__ */ _(
          "iframe",
          {
            allow: "payment",
            title: "PayConductor",
            ref: r,
            src: n,
            style: {
              width: "100%",
              height: e.height || h || D,
              border: "none"
            }
          }
        ) : null
      ]
    }
  );
}
function Ee() {
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
function g(e) {
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
function he() {
  const e = () => typeof window < "u" ? window.PayConductor : null, r = (n, t) => {
    const c = e();
    if (!c)
      return;
    const s = g(c);
    s != null && s.contentWindow && s.contentWindow.postMessage({
      type: n,
      data: t
    }, "*");
  };
  return {
    init: async (n) => {
      const t = g(e()), c = L();
      return ie(t || void 0, c, n);
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
      var c;
      const t = (c = e()) == null ? void 0 : c.config;
      r(u.CONFIG, {
        publicKey: t == null ? void 0 : t.publicKey,
        orderId: t == null ? void 0 : t.orderId,
        theme: n.theme ?? (t == null ? void 0 : t.theme),
        locale: n.locale ?? (t == null ? void 0 : t.locale),
        paymentMethods: n.paymentMethods ?? (t == null ? void 0 : t.paymentMethods)
      });
    },
    updateOrderId: (n) => {
      var c;
      const t = (c = e()) == null ? void 0 : c.config;
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
      const n = g(e()), t = L();
      try {
        return await A(n || void 0, t, u.CONFIRM_PAYMENT, {}), {
          paymentMethod: void 0
        };
      } catch (c) {
        return {
          error: {
            message: c instanceof Error ? c.message : "Payment failed",
            code: "payment_error",
            type: "payment_error"
          }
        };
      }
    }
  };
}
export {
  $ as ALLOWED_ORIGINS,
  q as DeviceType,
  fe as ERROR_CODES,
  j as ErrorCode,
  Q as IFRAME_BASE_URL,
  D as IFRAME_DEFAULT_HEIGHT_VALUE,
  I as IncomingMessage,
  z as InputStyleKey,
  b as OutgoingMessage,
  u as POST_MESSAGES,
  me as PayConductor,
  ye as PayConductorCheckoutElement,
  G as PaymentMethod,
  K as PaymentMethodLayout,
  W as PaymentStatus,
  p as REQUEST_TIMEOUT,
  J as SKELETON_CSS,
  M as SKELETON_STYLE_ID,
  X as buildIframeUrl,
  me as default,
  se as defaultTheme,
  ee as generateRequestId,
  te as isValidOrigin,
  Ee as usePayConductor,
  he as usePayconductorElement
};
//# sourceMappingURL=index.es.js.map
