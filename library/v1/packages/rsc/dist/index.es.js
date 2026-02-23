"use client";
import { jsx as D } from "react/jsx-runtime";
import { useState as A, useEffect as U, useRef as G } from "react";
const F = "https://iframe.payconductor.ai/v1", v = "http://localhost:5175/v1", q = 3e4, W = "600px";
var T = /* @__PURE__ */ ((e) => (e.Init = "Init", e.Config = "Config", e.Update = "Update", e.ConfirmPayment = "ConfirmPayment", e.Validate = "Validate", e.Reset = "Reset", e))(T || {}), h = /* @__PURE__ */ ((e) => (e.Ready = "Ready", e.Error = "Error", e.PaymentComplete = "PaymentComplete", e.PaymentFailed = "PaymentFailed", e.PaymentPending = "PaymentPending", e.ValidationError = "ValidationError", e.PaymentMethodSelected = "PaymentMethodSelected", e))(h || {});
const B = typeof window < "u" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") && !window.location.search.includes("production"), j = B ? v : F, k = [v, F], Q = W, $ = q, f = {
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
}, oe = {
  INVALID_CLIENT: "InvalidClient",
  INVALID_TOKEN: "InvalidToken",
  NETWORK_ERROR: "NetworkError",
  IFRAME_NOT_READY: "IframeNotReady",
  PAYMENT_DECLINED: "PaymentDeclined",
  VALIDATION_ERROR: "ValidationError",
  TIMEOUT: "Timeout"
};
function z(e) {
  const r = new URLSearchParams({
    publicKey: e.publicKey
  });
  return `${j}?${r.toString()}`;
}
function J() {
  return crypto.randomUUID();
}
function X(e, r) {
  return r.some((t) => {
    try {
      return new URL(t).origin === e;
    } catch {
      return t === e;
    }
  });
}
function N() {
  return /* @__PURE__ */ new Map();
}
function C(e, r, t, n) {
  return new Promise((d, u) => {
    if (!e || !("contentWindow" in e)) {
      u(new Error("Iframe not defined"));
      return;
    }
    if (!(e != null && e.contentWindow)) {
      u(new Error("Iframe not ready"));
      return;
    }
    if (!r) {
      u(new Error("Pending requests not initialized"));
      return;
    }
    const s = J();
    r.set(s, {
      resolve: d,
      reject: u
    }), e.contentWindow.postMessage({
      type: t,
      data: n,
      requestId: s
    }, "*"), setTimeout(() => {
      r != null && r.has(s) && (r.delete(s), u(new Error("Request timeout")));
    }, $);
  });
}
function b(e, r, t) {
  return C(e, r, f.CONFIRM_PAYMENT, {
    orderId: t.orderId
  });
}
function Z(e, r, t) {
  return C(e, r, f.VALIDATE, t);
}
function g(e, r) {
  return C(e, r, f.RESET);
}
function x(e, r, t) {
  return C(e, r, f.CONFIG, t);
}
function p(e, r, t) {
  return C(e, r, f.INIT, t);
}
function ee(e, r, t, n, d, u, s, R, m, P) {
  const L = e.data, {
    requestId: l,
    type: E,
    data: c,
    error: y
  } = L;
  if (E === f.READY) {
    if (t(!0), window.PayConductor && window.PayConductor.frame && (window.PayConductor.frame.isReady = !0), d == null || d(), l && (r != null && r.has(l))) {
      const {
        resolve: w
      } = r.get(l);
      r.delete(l), w(c);
    }
    return;
  }
  if (X(e.origin, k)) {
    if (l && r && r.has(l)) {
      const {
        resolve: w,
        reject: M
      } = r.get(l);
      r.delete(l), y ? M(new Error(String(y.message))) : w(c);
      return;
    }
    if (E === f.ERROR) {
      n((y == null ? void 0 : y.message) || "Unknown error"), u == null || u(new Error(String(y == null ? void 0 : y.message)));
      return;
    }
    if (E === f.PAYMENT_COMPLETE) {
      c && typeof c == "object" && "status" in c && (s == null || s(c));
      return;
    }
    if (E === f.PAYMENT_FAILED) {
      c && typeof c == "object" && "status" in c && (R == null || R(c));
      return;
    }
    if (E === f.PAYMENT_PENDING) {
      c && typeof c == "object" && "status" in c && (m == null || m(c));
      return;
    }
    if (E === f.PAYMENT_METHOD_SELECTED) {
      c && typeof c == "object" && "paymentMethod" in c && (P == null || P(c.paymentMethod));
      return;
    }
  }
}
function ae(e) {
  const [r, t] = A(
    () => !1
  ), [n, d] = A(
    () => !1
  ), [u, s] = A(() => null), [R, m] = A(
    () => ""
  ), [P, L] = A(() => null);
  return U(() => {
    const l = (...o) => {
      e.debug && console.log("[PayConductor]", ...o);
    }, E = z({
      publicKey: e.publicKey
    });
    m(E), t(!0);
    const c = N();
    let y = !1;
    l("init", e.publicKey), l("iframeUrl", E);
    const w = () => {
      var I, i;
      const o = (i = (I = window.PayConductor) == null ? void 0 : I.frame) == null ? void 0 : i.iframe;
      if (o) {
        if (o instanceof HTMLIFrameElement) return o;
        if (typeof o == "object" && o !== null) {
          const a = o;
          if ("current" in a && a.current instanceof HTMLIFrameElement)
            return a.current;
          if ("value" in a && a.value instanceof HTMLIFrameElement)
            return a.value;
        }
        return o;
      }
      return document.querySelector(
        ".payconductor-element iframe"
      ) ?? void 0;
    }, M = {
      get iframe() {
        return document.querySelector(
          ".payconductor-element iframe"
        ) ?? null;
      },
      set iframe(o) {
      },
      iframeUrl: E,
      isReady: window.PayConductor && window.PayConductor.frame ? window.PayConductor.frame.isReady : !1,
      error: null
    }, V = {
      publicKey: e.publicKey,
      theme: e.theme,
      locale: e.locale,
      paymentMethods: e.paymentMethods,
      defaultPaymentMethod: e.defaultPaymentMethod
    }, Y = {
      confirmPayment: (o) => (l("→ CONFIRM_PAYMENT", {
        orderId: o.orderId
      }), b(w(), c, o)),
      validate: (o) => (l("→ VALIDATE", o), Z(w(), c, o)),
      reset: () => (l("→ RESET"), g(w(), c)),
      getSelectedPaymentMethod: () => P
    };
    window.PayConductor = {
      frame: M,
      config: V,
      api: Y,
      selectedPaymentMethod: P
    }, l("registered"), window.dispatchEvent(
      new CustomEvent("payconductor:registered", {
        detail: window.PayConductor
      })
    );
    const S = async () => {
      if (!y) {
        const o = w();
        if (!o) {
          l("→ CONFIG skipped: iframe not found");
          return;
        }
        y = !0, l("→ CONFIG", {
          theme: e.theme,
          locale: e.locale,
          paymentMethods: e.paymentMethods,
          defaultPaymentMethod: e.defaultPaymentMethod,
          showPaymentButtons: e.showPaymentButtons
        }), x(o, c, {
          theme: e.theme,
          locale: e.locale,
          paymentMethods: e.paymentMethods,
          defaultPaymentMethod: e.defaultPaymentMethod,
          showPaymentButtons: e.showPaymentButtons,
          nuPayConfig: e.nuPayConfig
        });
      }
    }, K = (o) => {
      var I;
      (I = o.data) != null && I.type && l("←", o.data.type, o.data.data ?? ""), ee(
        o,
        c,
        (i) => {
          var a;
          d(i), M.isReady = i, (a = window.PayConductor) != null && a.frame && (window.PayConductor.frame.isReady = i), i && S();
        },
        (i) => {
          var a;
          s(i), M.error = i, (a = window.PayConductor) != null && a.frame && (window.PayConductor.frame.error = i);
        },
        () => {
          var i;
          (i = e.onReady) == null || i.call(e);
        },
        (i) => {
          var a;
          (a = e.onError) == null || a.call(e, i);
        },
        (i) => {
          var a;
          (a = e.onPaymentComplete) == null || a.call(e, i);
        },
        (i) => {
          var a;
          (a = e.onPaymentFailed) == null || a.call(e, i);
        },
        (i) => {
          var a;
          (a = e.onPaymentPending) == null || a.call(e, i);
        },
        (i) => {
          var a;
          L(i), window.PayConductor && (window.PayConductor.selectedPaymentMethod = i), (a = e.onPaymentMethodSelected) == null || a.call(e, i);
        }
      );
    };
    window.addEventListener("message", K);
    const H = () => {
      var I, i, a;
      const o = w();
      if (!o) return !1;
      try {
        if ((((I = o.contentDocument) == null ? void 0 : I.readyState) ?? ((a = (i = o.contentWindow) == null ? void 0 : i.document) == null ? void 0 : a.readyState)) === "complete")
          return S(), !0;
      } catch {
      }
      return !1;
    }, O = () => {
      if (H()) return;
      const o = w();
      if (o) {
        o.addEventListener("load", () => S(), {
          once: !0
        });
        return;
      }
      setTimeout(O, 50);
    };
    O();
  }, []), /* @__PURE__ */ D(
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
function ie(e) {
  const r = G(null), [t, n] = A(() => ""), [d, u] = A(() => !1);
  return U(() => {
    const s = (m) => {
      m != null && m.frame && (n(m.frame.iframeUrl || ""), u(!0), window.PayConductor && window.PayConductor.frame && (window.PayConductor.frame.isReady = !0), console.log("init", {
        PayConductor: window.PayConductor
      }));
    }, R = typeof window < "u" ? window.PayConductor : null;
    if (R)
      s(R);
    else {
      const m = (P) => {
        s(P.detail), window.removeEventListener("payconductor:registered", m);
      };
      window.addEventListener("payconductor:registered", m);
    }
  }, []), /* @__PURE__ */ D(
    "div",
    {
      className: "payconductor-element",
      style: {
        width: "100%"
      },
      children: d && t ? /* @__PURE__ */ D(
        "iframe",
        {
          allow: "payment",
          title: "PayConductor",
          ref: r,
          src: t,
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
function de() {
  const e = typeof window < "u" ? window.PayConductor : null, r = e != null && e.config ? {
    publicKey: e.config.publicKey,
    orderId: e.config.orderId,
    theme: e.config.theme,
    locale: e.config.locale
  } : {}, t = e != null && e.frame ? {
    iframe: e.frame.iframe,
    isReady: e.frame.isReady,
    error: e.frame.error
  } : {
    iframe: null,
    isReady: !1,
    error: null
  };
  return {
    ...r,
    ...t
  };
}
function _(e) {
  var r;
  if ((r = e == null ? void 0 : e.frame) != null && r.iframe) {
    const t = e.frame.iframe;
    if (t instanceof HTMLIFrameElement) return t;
    if (t && typeof t == "object") {
      if ("current" in t) {
        const n = t.current;
        if (n instanceof HTMLIFrameElement) return n;
      }
      if ("value" in t) {
        const n = t.value;
        if (n instanceof HTMLIFrameElement) return n;
      }
    }
  }
  return document.querySelector(".payconductor-element iframe") ?? null;
}
function ce() {
  const e = () => typeof window < "u" ? window.PayConductor : null, r = (t, n) => {
    const d = e();
    if (!d) return;
    const u = _(d);
    u != null && u.contentWindow && u.contentWindow.postMessage({
      type: t,
      data: n
    }, "*");
  };
  return {
    init: async (t) => {
      const n = _(e()), d = N();
      return p(n || void 0, d, t);
    },
    confirmPayment: async (t) => {
      const n = _(e()), d = N();
      if (!t.orderId)
        throw new Error("Order ID is required");
      return b(n || void 0, d, t);
    },
    validate: (t) => {
      const n = e();
      return n ? n.api.validate(t) : Promise.resolve(!1);
    },
    reset: () => {
      const t = e();
      return t ? t.api.reset() : Promise.resolve();
    },
    getSelectedPaymentMethod: () => {
      var t;
      return ((t = e()) == null ? void 0 : t.selectedPaymentMethod) ?? null;
    },
    updateConfig: (t) => {
      var d;
      const n = (d = e()) == null ? void 0 : d.config;
      r(f.CONFIG, {
        publicKey: n == null ? void 0 : n.publicKey,
        orderId: n == null ? void 0 : n.orderId,
        theme: t.theme ?? (n == null ? void 0 : n.theme),
        locale: t.locale ?? (n == null ? void 0 : n.locale),
        paymentMethods: t.paymentMethods ?? (n == null ? void 0 : n.paymentMethods)
      });
    },
    updateorderId: (t) => {
      var d;
      const n = (d = e()) == null ? void 0 : d.config;
      r(f.CONFIG, {
        publicKey: n == null ? void 0 : n.publicKey,
        orderId: t,
        theme: n == null ? void 0 : n.theme,
        locale: n == null ? void 0 : n.locale,
        paymentMethods: n == null ? void 0 : n.paymentMethods
      });
    },
    update: (t) => {
      r(f.UPDATE, t);
    },
    submit: async () => {
      const t = _(e()), n = N();
      try {
        return await C(t || void 0, n, f.CONFIRM_PAYMENT, {}), {
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
  k as ALLOWED_ORIGINS,
  oe as ERROR_CODES,
  j as IFRAME_BASE_URL,
  Q as IFRAME_DEFAULT_HEIGHT_VALUE,
  f as POST_MESSAGES,
  ae as PayConductor,
  ie as PayConductorCheckoutElement,
  $ as REQUEST_TIMEOUT,
  z as buildIframeUrl,
  ae as default,
  J as generateRequestId,
  X as isValidOrigin,
  de as usePayConductor,
  ce as usePayconductorElement
};
//# sourceMappingURL=index.es.js.map
