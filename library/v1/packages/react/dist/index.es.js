import { jsx as L } from "react/jsx-runtime";
import { useState as M, useEffect as O, useRef as V } from "react";
const U = "https://iframe.payconductor.ai/v1", v = "http://localhost:5175/v1", Y = 3e4, G = "600px";
var T = /* @__PURE__ */ ((e) => (e.Init = "Init", e.Config = "Config", e.Update = "Update", e.ConfirmPayment = "ConfirmPayment", e.Validate = "Validate", e.Reset = "Reset", e))(T || {}), h = /* @__PURE__ */ ((e) => (e.Ready = "Ready", e.Error = "Error", e.PaymentComplete = "PaymentComplete", e.PaymentFailed = "PaymentFailed", e.PaymentPending = "PaymentPending", e.ValidationError = "ValidationError", e.PaymentMethodSelected = "PaymentMethodSelected", e))(h || {});
const H = typeof window < "u" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") && !window.location.search.includes("production"), q = H ? v : U, W = [v, U], B = G, j = Y, l = {
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
}, ne = {
  INVALID_CLIENT: "InvalidClient",
  INVALID_TOKEN: "InvalidToken",
  NETWORK_ERROR: "NetworkError",
  IFRAME_NOT_READY: "IframeNotReady",
  PAYMENT_DECLINED: "PaymentDeclined",
  VALIDATION_ERROR: "ValidationError",
  TIMEOUT: "Timeout"
};
function k(e) {
  const r = new URLSearchParams({
    publicKey: e.publicKey
  });
  return `${q}?${r.toString()}`;
}
function g() {
  return crypto.randomUUID();
}
function z(e, r) {
  return r.some((n) => {
    try {
      return new URL(n).origin === e;
    } catch {
      return n === e;
    }
  });
}
function S() {
  return /* @__PURE__ */ new Map();
}
function A(e, r, n, t) {
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
    const s = g();
    r.set(s, {
      resolve: d,
      reject: u
    }), e.contentWindow.postMessage({
      type: n,
      data: t,
      requestId: s
    }, "*"), setTimeout(() => {
      r != null && r.has(s) && (r.delete(s), u(new Error("Request timeout")));
    }, j);
  });
}
function Q(e, r, n) {
  return A(e, r, l.CONFIRM_PAYMENT, {
    orderId: n.orderId
  });
}
function $(e, r, n) {
  return A(e, r, l.VALIDATE, n);
}
function J(e, r) {
  return A(e, r, l.RESET);
}
function X(e, r, n) {
  return A(e, r, l.CONFIG, n);
}
function Z(e, r, n) {
  return A(e, r, l.INIT, n);
}
function x(e, r, n, t, d, u, s, w, y) {
  const E = e.data, {
    requestId: I,
    type: P,
    data: c,
    error: f
  } = E;
  if (P === l.READY) {
    if (t == null || t(), I && (r != null && r.has(I))) {
      const {
        resolve: R
      } = r.get(I);
      r.delete(I), R(c);
    }
    return;
  }
  if (z(e.origin, W)) {
    if (I && r && r.has(I)) {
      const {
        resolve: R,
        reject: N
      } = r.get(I);
      r.delete(I), f ? N(new Error(String(f.message))) : R(c);
      return;
    }
    if (P === l.ERROR) {
      n((f == null ? void 0 : f.message) || "Unknown error"), d == null || d(new Error(String(f == null ? void 0 : f.message)));
      return;
    }
    if (P === l.PAYMENT_COMPLETE) {
      c && typeof c == "object" && "status" in c && (u == null || u(c));
      return;
    }
    if (P === l.PAYMENT_FAILED) {
      c && typeof c == "object" && "status" in c && (s == null || s(c));
      return;
    }
    if (P === l.PAYMENT_PENDING) {
      c && typeof c == "object" && "status" in c && (w == null || w(c));
      return;
    }
    if (P === l.PAYMENT_METHOD_SELECTED) {
      c && typeof c == "object" && "paymentMethod" in c && (y == null || y(c.paymentMethod));
      return;
    }
  }
}
function re(e) {
  const [r, n] = M(
    () => !1
  ), [t, d] = M(() => null), [u, s] = M(
    () => ""
  ), [w, y] = M(() => null);
  return O(() => {
    const E = (...o) => {
      e.debug && console.log("[PayConductor]", ...o);
    }, I = k({
      publicKey: e.publicKey
    });
    s(I), n(!0);
    const P = S();
    let c = !1;
    E("init", e.publicKey), E("iframeUrl", I);
    const f = () => {
      var m, a;
      const o = (a = (m = window.PayConductor) == null ? void 0 : m.frame) == null ? void 0 : a.iframe;
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
      iframeUrl: I,
      error: null
    }, N = {
      publicKey: e.publicKey,
      theme: e.theme,
      locale: e.locale,
      paymentMethods: e.paymentMethods,
      defaultPaymentMethod: e.defaultPaymentMethod
    }, F = {
      confirmPayment: (o) => {
        var a;
        E("→ CONFIRM_PAYMENT", {
          orderId: o.orderId
        });
        const m = f();
        return m != null && m.contentWindow && m.contentWindow.postMessage(
          {
            type: l.CONFIG,
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
        ), N.orderId = o.orderId, (a = window.PayConductor) != null && a.config && (window.PayConductor.config.orderId = o.orderId), Q(m, P, o);
      },
      validate: (o) => (E("→ VALIDATE", o), $(f(), P, o)),
      reset: () => (E("→ RESET"), J(f(), P)),
      getSelectedPaymentMethod: () => w
    };
    window.PayConductor = {
      frame: R,
      config: N,
      api: F,
      selectedPaymentMethod: w
    }, E("registered"), window.dispatchEvent(
      new CustomEvent("payconductor:registered", {
        detail: window.PayConductor
      })
    );
    const _ = async () => {
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
        }), X(o, P, {
          theme: e.theme,
          locale: e.locale,
          paymentMethods: e.paymentMethods,
          defaultPaymentMethod: e.defaultPaymentMethod,
          showPaymentButtons: e.showPaymentButtons,
          nuPayConfig: e.nuPayConfig
        });
      }
    }, b = (o) => {
      var m;
      (m = o.data) != null && m.type && E("←", o.data.type, o.data.data ?? ""), x(
        o,
        P,
        (a) => {
          var i;
          d(a), R.error = a, (i = window.PayConductor) != null && i.frame && (window.PayConductor.frame.error = a);
        },
        () => {
          var a;
          (a = e.onReady) == null || a.call(e), _();
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
    window.addEventListener("message", b);
    const K = () => {
      var m, a, i;
      const o = f();
      if (!o)
        return !1;
      try {
        if ((((m = o.contentDocument) == null ? void 0 : m.readyState) ?? ((i = (a = o.contentWindow) == null ? void 0 : a.document) == null ? void 0 : i.readyState)) === "complete")
          return _(), !0;
      } catch {
      }
      return !1;
    }, D = () => {
      if (K())
        return;
      const o = f();
      if (o) {
        o.addEventListener("load", () => _(), {
          once: !0
        });
        return;
      }
      setTimeout(D, 50);
    };
    D();
  }, []), /* @__PURE__ */ L(
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
function oe(e) {
  const r = V(null), [n, t] = M(() => ""), [d, u] = M(() => !1);
  return O(() => {
    const s = (y) => {
      y != null && y.frame && (t(y.frame.iframeUrl || ""), u(!0), console.log("init", {
        PayConductor: window.PayConductor
      }));
    }, w = typeof window < "u" ? window.PayConductor : null;
    if (w)
      s(w);
    else {
      const y = (E) => {
        s(E.detail), window.removeEventListener("payconductor:registered", y);
      };
      window.addEventListener("payconductor:registered", y);
    }
  }, []), /* @__PURE__ */ L(
    "div",
    {
      className: "payconductor-element",
      style: {
        width: "100%"
      },
      children: d && n ? /* @__PURE__ */ L(
        "iframe",
        {
          allow: "payment",
          title: "PayConductor",
          ref: r,
          src: n,
          style: {
            width: "100%",
            height: e.height || B,
            border: "none"
          }
        }
      ) : null
    }
  );
}
function ae() {
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
function C(e) {
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
function ie() {
  const e = () => typeof window < "u" ? window.PayConductor : null, r = (n, t) => {
    const d = e();
    if (!d)
      return;
    const u = C(d);
    u != null && u.contentWindow && u.contentWindow.postMessage({
      type: n,
      data: t
    }, "*");
  };
  return {
    init: async (n) => {
      const t = C(e()), d = S();
      return Z(t || void 0, d, n);
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
      r(l.CONFIG, {
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
      r(l.CONFIG, {
        publicKey: t == null ? void 0 : t.publicKey,
        orderId: n,
        theme: t == null ? void 0 : t.theme,
        locale: t == null ? void 0 : t.locale,
        paymentMethods: t == null ? void 0 : t.paymentMethods
      });
    },
    update: (n) => {
      r(l.UPDATE, n);
    },
    submit: async () => {
      const n = C(e()), t = S();
      try {
        return await A(n || void 0, t, l.CONFIRM_PAYMENT, {}), {
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
  W as ALLOWED_ORIGINS,
  ne as ERROR_CODES,
  q as IFRAME_BASE_URL,
  B as IFRAME_DEFAULT_HEIGHT_VALUE,
  l as POST_MESSAGES,
  re as PayConductor,
  oe as PayConductorCheckoutElement,
  j as REQUEST_TIMEOUT,
  k as buildIframeUrl,
  re as default,
  g as generateRequestId,
  z as isValidOrigin,
  ae as usePayConductor,
  ie as usePayconductorElement
};
//# sourceMappingURL=index.es.js.map
