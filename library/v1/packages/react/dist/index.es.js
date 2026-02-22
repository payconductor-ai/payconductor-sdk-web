import { jsx as D } from "react/jsx-runtime";
import { useState as M, useEffect as U, useRef as H } from "react";
const v = "https://iframe.payconductor.ai/v1", F = "http://localhost:5175/v1", q = 3e4, W = "600px";
var T = /* @__PURE__ */ ((e) => (e.Init = "Init", e.Config = "Config", e.Update = "Update", e.ConfirmPayment = "ConfirmPayment", e.Validate = "Validate", e.Reset = "Reset", e))(T || {}), h = /* @__PURE__ */ ((e) => (e.Ready = "Ready", e.Error = "Error", e.PaymentComplete = "PaymentComplete", e.PaymentFailed = "PaymentFailed", e.PaymentPending = "PaymentPending", e.ValidationError = "ValidationError", e.PaymentMethodSelected = "PaymentMethodSelected", e))(h || {});
const B = typeof window < "u" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") && !window.location.search.includes("production"), k = B ? F : v, j = [F, v], Q = W, $ = q, l = {
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
  return `${k}?${r.toString()}`;
}
function g() {
  return crypto.randomUUID();
}
function J(e, r) {
  return r.some((t) => {
    try {
      return new URL(t).origin === e;
    } catch {
      return t === e;
    }
  });
}
function L() {
  return /* @__PURE__ */ new Map();
}
function A(e, r, t, n) {
  return new Promise((i, u) => {
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
      resolve: i,
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
  return A(e, r, l.CONFIRM_PAYMENT, {
    orderId: t.orderId
  });
}
function X(e, r, t) {
  return A(e, r, l.VALIDATE, t);
}
function Z(e, r) {
  return A(e, r, l.RESET);
}
function x(e, r, t) {
  return A(e, r, l.CONFIG, t);
}
function p(e, r, t) {
  return A(e, r, l.INIT, t);
}
function ee(e, r, t, n, i, u, s, R, m, I) {
  if (!J(e.origin, j))
    return;
  const C = e.data, {
    requestId: f,
    type: E,
    data: d,
    error: y
  } = C;
  if (f && (r != null && r.has(f))) {
    const {
      resolve: w,
      reject: _
    } = r.get(f);
    r.delete(f), y ? _(new Error(String(y.message))) : w(d);
    return;
  }
  if (E === l.READY) {
    t(!0), i == null || i();
    return;
  }
  if (E === l.ERROR) {
    n((y == null ? void 0 : y.message) || "Unknown error"), u == null || u(new Error(String(y == null ? void 0 : y.message)));
    return;
  }
  if (E === l.PAYMENT_COMPLETE) {
    d && typeof d == "object" && "status" in d && (s == null || s(d));
    return;
  }
  if (E === l.PAYMENT_FAILED) {
    d && typeof d == "object" && "status" in d && (R == null || R(d));
    return;
  }
  if (E === l.PAYMENT_PENDING) {
    d && typeof d == "object" && "status" in d && (m == null || m(d));
    return;
  }
  if (E === l.PAYMENT_METHOD_SELECTED) {
    d && typeof d == "object" && "paymentMethod" in d && (I == null || I(d.paymentMethod));
    return;
  }
}
function ae(e) {
  const [r, t] = M(
    () => !1
  ), [n, i] = M(
    () => !1
  ), [u, s] = M(() => null), [R, m] = M(
    () => ""
  ), [I, C] = M(() => null);
  return U(() => {
    const f = (...o) => {
      e.debug && console.log("[PayConductor]", ...o);
    }, E = z({
      publicKey: e.publicKey
    });
    m(E), t(!0);
    const d = L();
    let y = !1;
    f("init", e.publicKey), f("iframeUrl", E);
    const w = () => {
      var P, a;
      const o = (a = (P = window.PayConductor) == null ? void 0 : P.frame) == null ? void 0 : a.iframe;
      if (o) {
        if (o instanceof HTMLIFrameElement) return o;
        if (typeof o == "object" && o !== null) {
          if ("current" in o) return o.current ?? void 0;
          if ("value" in o) return o.value ?? void 0;
        }
        return o;
      }
      return document.querySelector(
        ".payconductor-element iframe"
      ) ?? void 0;
    }, _ = {
      get iframe() {
        return document.querySelector(
          ".payconductor-element iframe"
        ) ?? null;
      },
      set iframe(o) {
      },
      iframeUrl: E,
      isReady: !1,
      error: null
    }, V = {
      publicKey: e.publicKey,
      theme: e.theme,
      locale: e.locale,
      paymentMethods: e.paymentMethods,
      defaultPaymentMethod: e.defaultPaymentMethod
    }, Y = {
      confirmPayment: (o) => (f("→ CONFIRM_PAYMENT", {
        orderId: o.orderId
      }), b(w(), d, o)),
      validate: (o) => (f("→ VALIDATE", o), X(w(), d, o)),
      reset: () => (f("→ RESET"), Z(w(), d)),
      getSelectedPaymentMethod: () => I
    };
    window.PayConductor = {
      frame: _,
      config: V,
      api: Y,
      selectedPaymentMethod: I
    }, f("registered"), window.dispatchEvent(
      new CustomEvent("payconductor:registered", {
        detail: window.PayConductor
      })
    );
    const S = async () => {
      if (!y) {
        const o = w();
        if (!o) {
          f("→ CONFIG skipped: iframe not found");
          return;
        }
        y = !0, f("→ CONFIG", {
          theme: e.theme,
          locale: e.locale,
          paymentMethods: e.paymentMethods,
          defaultPaymentMethod: e.defaultPaymentMethod,
          showPaymentButtons: e.showPaymentButtons
        }), x(o, d, {
          theme: e.theme,
          locale: e.locale,
          paymentMethods: e.paymentMethods,
          defaultPaymentMethod: e.defaultPaymentMethod,
          showPaymentButtons: e.showPaymentButtons,
          nuPayConfig: e.nuPayConfig
        });
      }
    }, K = (o) => {
      var P;
      (P = o.data) != null && P.type && f("←", o.data.type, o.data.data ?? ""), ee(
        o,
        d,
        (a) => {
          var c;
          i(a), _.isReady = a, (c = window.PayConductor) != null && c.frame && (window.PayConductor.frame.isReady = a), a && S();
        },
        (a) => {
          var c;
          s(a), _.error = a, (c = window.PayConductor) != null && c.frame && (window.PayConductor.frame.error = a);
        },
        () => {
          var a;
          (a = e.onReady) == null || a.call(e);
        },
        (a) => {
          var c;
          (c = e.onError) == null || c.call(e, a);
        },
        (a) => {
          var c;
          (c = e.onPaymentComplete) == null || c.call(e, a);
        },
        (a) => {
          var c;
          (c = e.onPaymentFailed) == null || c.call(e, a);
        },
        (a) => {
          var c;
          (c = e.onPaymentPending) == null || c.call(e, a);
        },
        (a) => {
          var c;
          C(a), window.PayConductor && (window.PayConductor.selectedPaymentMethod = a), (c = e.onPaymentMethodSelected) == null || c.call(e, a);
        }
      );
    };
    window.addEventListener("message", K);
    const G = () => {
      var P, a, c;
      const o = w();
      if (!o) return !1;
      try {
        if ((((P = o.contentDocument) == null ? void 0 : P.readyState) ?? ((c = (a = o.contentWindow) == null ? void 0 : a.document) == null ? void 0 : c.readyState)) === "complete")
          return S(), !0;
      } catch {
      }
      return !1;
    }, O = () => {
      if (G()) return;
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
  const r = H(null), [t, n] = M(() => ""), [i, u] = M(() => !1);
  return U(() => {
    const s = (m) => {
      m != null && m.frame && (n(m.frame.iframeUrl || ""), u(!0));
    }, R = typeof window < "u" ? window.PayConductor : null;
    if (R)
      s(R);
    else {
      const m = (I) => {
        s(I.detail), window.removeEventListener("payconductor:registered", m);
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
      children: i && t ? /* @__PURE__ */ D(
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
function N(e) {
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
    const i = e();
    if (!i) return;
    const u = N(i);
    u != null && u.contentWindow && u.contentWindow.postMessage({
      type: t,
      data: n
    }, "*");
  };
  return {
    init: async (t) => {
      const n = N(e()), i = L();
      return p(n || void 0, i, t);
    },
    confirmPayment: async (t) => {
      const n = N(e()), i = L();
      if (!t.orderId)
        throw new Error("Order ID is required");
      return b(n || void 0, i, t);
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
      var i;
      const n = (i = e()) == null ? void 0 : i.config;
      r(l.CONFIG, {
        publicKey: n == null ? void 0 : n.publicKey,
        orderId: n == null ? void 0 : n.orderId,
        theme: t.theme ?? (n == null ? void 0 : n.theme),
        locale: t.locale ?? (n == null ? void 0 : n.locale),
        paymentMethods: t.paymentMethods ?? (n == null ? void 0 : n.paymentMethods)
      });
    },
    updateorderId: (t) => {
      var i;
      const n = (i = e()) == null ? void 0 : i.config;
      r(l.CONFIG, {
        publicKey: n == null ? void 0 : n.publicKey,
        orderId: t,
        theme: n == null ? void 0 : n.theme,
        locale: n == null ? void 0 : n.locale,
        paymentMethods: n == null ? void 0 : n.paymentMethods
      });
    },
    update: (t) => {
      r(l.UPDATE, t);
    },
    submit: async () => {
      const t = N(e()), n = L();
      try {
        return await A(t || void 0, n, l.CONFIRM_PAYMENT, {}), {
          paymentMethod: void 0
        };
      } catch (i) {
        return {
          error: {
            message: i instanceof Error ? i.message : "Payment failed",
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
  oe as ERROR_CODES,
  k as IFRAME_BASE_URL,
  Q as IFRAME_DEFAULT_HEIGHT_VALUE,
  l as POST_MESSAGES,
  ae as PayConductor,
  ie as PayConductorCheckoutElement,
  $ as REQUEST_TIMEOUT,
  z as buildIframeUrl,
  ae as default,
  g as generateRequestId,
  J as isValidOrigin,
  de as usePayConductor,
  ce as usePayconductorElement
};
//# sourceMappingURL=index.es.js.map
