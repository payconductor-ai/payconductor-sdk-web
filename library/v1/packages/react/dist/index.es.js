var j = Object.defineProperty;
var $ = (e, n, t) => n in e ? j(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t;
var p = (e, n, t) => $(e, typeof n != "symbol" ? n + "" : n, t);
import { jsx as N, jsxs as q } from "react/jsx-runtime";
import { useState as A, useEffect as F, useRef as W } from "react";
const H = "https://iframe.payconductor.ai/v1", Y = "http://localhost:5175/v1", J = 3e5, X = "600px";
var Z = /* @__PURE__ */ ((e) => (e.Pix = "Pix", e.CreditCard = "CreditCard", e.DebitCard = "DebitCard", e.BankSlip = "BankSlip", e.Crypto = "Crypto", e.ApplePay = "ApplePay", e.NuPay = "NuPay", e.PicPay = "PicPay", e.AmazonPay = "AmazonPay", e.SepaDebit = "SepaDebit", e.GooglePay = "GooglePay", e))(Z || {}), Q = /* @__PURE__ */ ((e) => (e.Grid = "grid", e.Vertical = "vertical", e.Horizontal = "horizontal", e))(Q || {}), ee = /* @__PURE__ */ ((e) => (e.Succeeded = "succeeded", e.Pending = "pending", e.Failed = "failed", e))(ee || {}), te = /* @__PURE__ */ ((e) => (e.ThreeDsAwaitingChallenge = "ThreeDsAwaitingChallenge", e))(te || {}), ne = /* @__PURE__ */ ((e) => (e.Authenticated = "Authenticated", e.NotAuthenticated = "NotAuthenticated", e.NeedChallenge = "NeedChallenge", e))(ne || {}), ae = /* @__PURE__ */ ((e) => (e.Pending = "Pending", e.Authenticated = "Authenticated", e.Failed = "Failed", e.NotEnrolled = "NotEnrolled", e))(ae || {}), G = /* @__PURE__ */ ((e) => (e.Cpf = "Cpf", e.Cnpj = "Cnpj", e))(G || {}), I = /* @__PURE__ */ ((e) => (e.Asaas = "Asaas", e.Sandbox = "Sandbox", e.SandboxSplit = "SandboxSplit", e.MercadoPago = "MercadoPago", e.NuPay = "NuPay", e.PicPay = "PicPay", e.Woovi = "Woovi", e.EfiBank = "EfiBank", e.BrasPag = "BrasPag", e.PagarMe = "PagarMe", e.BancoDoBrasil = "BancoDoBrasil", e.PagSeguro = "PagSeguro", e.Ebanx = "Ebanx", e.OnlyUp = "OnlyUp", e.Barte = "Barte", e.BarteSplit = "BarteSplit", e.PagSmileA55 = "PagSmileA55", e.Avantti = "Avantti", e.MonsterGateway = "MonsterGateway", e.SAC = "SAC", e.Lyra = "Lyra", e))(I || {}), re = /* @__PURE__ */ ((e) => (e.Visa = "Visa", e.Mastercard = "Mastercard", e.AmericanExpress = "AmericanExpress", e.DinersClub = "DinersClub", e.Discover = "Discover", e.JCB = "JCB", e.UnionPay = "UnionPay", e.Maestro = "Maestro", e.Mir = "Mir", e.Elo = "Elo", e.Hiper = "Hiper", e.Hipercard = "Hipercard", e.Verve = "Verve", e.Unknown = "Unknown", e))(re || {}), _ = /* @__PURE__ */ ((e) => (e.Production = "Production", e.Sandbox = "Sandbox", e))(_ || {}), ie = /* @__PURE__ */ ((e) => (e.USD = "USD", e.EUR = "EUR", e.BRL = "BRL", e.ARS = "ARS", e.CAD = "CAD", e.COP = "COP", e.GBP = "GBP", e.JPY = "JPY", e.MXN = "MXN", e.MZN = "MZN", e.CNY = "CNY", e.SAR = "SAR", e.ETH = "ETH", e.BNB = "BNB", e.BTC = "BTC", e.USDT = "USDT", e.USDC = "USDC", e.DOGE = "DOGE", e.SOL = "SOL", e))(ie || {}), oe = /* @__PURE__ */ ((e) => (e.Android = "android", e.IOS = "ios", e.Web = "web", e.Chrome = "chrome", e.Safari = "safari", e))(oe || {}), se = /* @__PURE__ */ ((e) => (e.Padding = "padding", e.Radius = "radius", e.Color = "color", e.Background = "background", e.Shadow = "shadow", e))(se || {}), M = /* @__PURE__ */ ((e) => (e.Init = "Init", e.Config = "Config", e.Update = "Update", e.ConfirmPayment = "ConfirmPayment", e.Validate = "Validate", e.Reset = "Reset", e))(M || {}), v = /* @__PURE__ */ ((e) => (e.Ready = "Ready", e.Error = "Error", e.CheckoutSessionCreated = "CheckoutSessionCreated", e.PaymentComplete = "PaymentComplete", e.PaymentFailed = "PaymentFailed", e.PaymentPending = "PaymentPending", e.ValidationError = "ValidationError", e.PaymentMethodSelected = "PaymentMethodSelected", e.Resize = "Resize", e.ThreeDSChallenge = "ThreeDSChallenge", e.ThreeDSComplete = "ThreeDSComplete", e.ThreeDSFailed = "ThreeDSFailed", e))(v || {}), de = /* @__PURE__ */ ((e) => (e.InvalidClient = "InvalidClient", e.InvalidToken = "InvalidToken", e.NetworkError = "NetworkError", e.IframeNotReady = "IframeNotReady", e.PaymentDeclined = "PaymentDeclined", e.ValidationError = "ValidationError", e.Timeout = "Timeout", e))(de || {});
const Je = {
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
}, ce = typeof window < "u" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") && !window.location.search.includes("production"), le = ce ? Y : H, ue = [Y, H], B = X, he = J, P = {
  INIT: M.Init,
  CONFIG: M.Config,
  UPDATE: M.Update,
  CONFIRM_PAYMENT: M.ConfirmPayment,
  VALIDATE: M.Validate,
  RESET: M.Reset,
  READY: v.Ready,
  ERROR: v.Error,
  PAYMENT_COMPLETE: v.PaymentComplete,
  PAYMENT_FAILED: v.PaymentFailed,
  PAYMENT_PENDING: v.PaymentPending,
  VALIDATION_ERROR: v.ValidationError,
  PAYMENT_METHOD_SELECTED: v.PaymentMethodSelected,
  RESIZE: v.Resize
}, Xe = {
  INVALID_CLIENT: "InvalidClient",
  INVALID_TOKEN: "InvalidToken",
  NETWORK_ERROR: "NetworkError",
  IFRAME_NOT_READY: "IframeNotReady",
  PAYMENT_DECLINED: "PaymentDeclined",
  VALIDATION_ERROR: "ValidationError",
  TIMEOUT: "Timeout"
}, z = "payconductor-skeleton-style", me = `
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
function fe(e) {
  const n = new URLSearchParams({
    publicKey: e.publicKey
  });
  return `${le}?${n.toString()}`;
}
function ye() {
  return crypto.randomUUID();
}
function we(e, n) {
  return n.some((t) => {
    try {
      return new URL(t).origin === e;
    } catch {
      return t === e;
    }
  });
}
function O() {
  return /* @__PURE__ */ new Map();
}
function D(e, n, t, a) {
  return new Promise((r, o) => {
    if (!e || !("contentWindow" in e)) {
      o(new Error("Iframe not defined"));
      return;
    }
    if (!(e != null && e.contentWindow)) {
      o(new Error("Iframe not ready"));
      return;
    }
    if (!n) {
      o(new Error("Pending requests not initialized"));
      return;
    }
    const d = ye();
    n.set(d, {
      resolve: r,
      reject: o
    }), e.contentWindow.postMessage({
      type: t,
      data: a,
      requestId: d
    }, "*"), setTimeout(() => {
      n != null && n.has(d) && (n.delete(d), o(new Error("Request timeout")));
    }, he);
  });
}
function Ee(e, n, t) {
  return D(e, n, P.CONFIRM_PAYMENT, t);
}
async function ge(e, n, t) {
  return await Ee(e, n, {
    orderId: t.orderId
  });
}
function Pe(e, n, t) {
  return D(e, n, P.VALIDATE, t);
}
function Se(e, n) {
  return D(e, n, P.RESET);
}
function be(e, n, t) {
  return D(e, n, P.CONFIG, t);
}
function Ce(e, n, t) {
  return D(e, n, P.INIT, t);
}
function pe(e, n, t, a, r, o, d, s, i, l, g, w) {
  const m = e.data, {
    requestId: y,
    type: h,
    data: E,
    error: C
  } = m;
  if (h === P.READY) {
    if (a == null || a(), y && (n != null && n.has(y))) {
      const {
        resolve: T
      } = n.get(y);
      n.delete(y), T(E);
    }
    return;
  }
  if (we(e.origin, ue)) {
    if (y && n && n.has(y)) {
      const {
        resolve: T,
        reject: x
      } = n.get(y);
      n.delete(y), C ? x(new Error(String(C.message))) : T(E);
      return;
    }
    if (h === P.ERROR) {
      t((C == null ? void 0 : C.message) || "Unknown error"), r == null || r(new Error(String(C == null ? void 0 : C.message)));
      return;
    }
    if (h === P.PAYMENT_COMPLETE) {
      E && typeof E == "object" && "status" in E && (o == null || o(E));
      return;
    }
    if (h === P.PAYMENT_FAILED) {
      E && typeof E == "object" && "status" in E && (d == null || d(E));
      return;
    }
    if (h === P.PAYMENT_PENDING) {
      E && typeof E == "object" && "status" in E && (s == null || s(E));
      return;
    }
    if (h === P.PAYMENT_METHOD_SELECTED) {
      E && typeof E == "object" && "paymentMethod" in E && (i == null || i(E.paymentMethod));
      return;
    }
    if (h !== P.RESIZE) {
      if (h === v.ThreeDSChallenge) {
        l == null || l();
        return;
      }
      if (h === v.ThreeDSComplete) {
        g == null || g();
        return;
      }
      if (h === v.ThreeDSFailed) {
        w == null || w();
        return;
      }
    }
  }
}
function Ze(e) {
  const [n, t] = A(
    () => !1
  ), [a, r] = A(() => null), [o, d] = A(
    () => ""
  ), [s, i] = A(() => null);
  return F(() => {
    const l = (...u) => {
      e.debug && console.log("[PayConductor]", ...u);
    }, g = fe({
      publicKey: e.publicKey
    });
    d(g), t(!0);
    const w = O();
    let m = !1;
    l("init", e.publicKey), l("iframeUrl", g);
    const y = () => {
      var S, c;
      const u = (c = (S = window.PayConductor) == null ? void 0 : S.frame) == null ? void 0 : c.iframe;
      if (u) {
        if (u instanceof HTMLIFrameElement) return u;
        if (typeof u == "object" && u !== null) {
          const f = u;
          if ("current" in f && f.current instanceof HTMLIFrameElement)
            return f.current;
          if ("value" in f && f.value instanceof HTMLIFrameElement)
            return f.value;
        }
        return u;
      }
      return document.querySelector(
        ".payconductor-element iframe"
      ) ?? void 0;
    }, h = {
      get iframe() {
        return document.querySelector(
          ".payconductor-element iframe"
        ) ?? null;
      },
      set iframe(u) {
      },
      iframeUrl: g,
      error: null
    }, E = {
      publicKey: e.publicKey,
      theme: e.theme,
      locale: e.locale,
      paymentMethods: e.paymentMethods,
      defaultPaymentMethod: e.defaultPaymentMethod
    }, C = {
      confirmPayment: (u) => {
        var c;
        l("→ CONFIRM_PAYMENT", {
          orderId: u.orderId
        });
        const S = y();
        return S != null && S.contentWindow && S.contentWindow.postMessage(
          {
            type: P.CONFIG,
            data: {
              publicKey: e.publicKey,
              orderId: u.orderId,
              theme: e.theme,
              locale: e.locale,
              paymentMethods: e.paymentMethods,
              defaultPaymentMethod: e.defaultPaymentMethod,
              showPaymentButtons: e.showPaymentButtons,
              nuPayConfig: e.nuPayConfig
            }
          },
          "*"
        ), E.orderId = u.orderId, (c = window.PayConductor) != null && c.config && (window.PayConductor.config.orderId = u.orderId), ge(S, w, u);
      },
      validate: (u) => (l("→ VALIDATE", u), Pe(y(), w, u)),
      reset: () => (l("→ RESET"), Se(y(), w)),
      getSelectedPaymentMethod: () => s
    };
    window.PayConductor = {
      frame: h,
      config: E,
      api: C,
      selectedPaymentMethod: s
    }, l("registered"), window.dispatchEvent(
      new CustomEvent("payconductor:registered", {
        detail: window.PayConductor
      })
    );
    const T = async () => {
      if (!m) {
        const u = y();
        if (!u) {
          l("→ CONFIG skipped: iframe not found");
          return;
        }
        m = !0, l("→ CONFIG", {
          theme: e.theme,
          locale: e.locale,
          paymentMethods: e.paymentMethods,
          defaultPaymentMethod: e.defaultPaymentMethod,
          showPaymentButtons: e.showPaymentButtons
        }), be(u, w, {
          theme: e.theme,
          locale: e.locale,
          paymentMethods: e.paymentMethods,
          defaultPaymentMethod: e.defaultPaymentMethod,
          showPaymentButtons: e.showPaymentButtons,
          nuPayConfig: e.nuPayConfig
        });
      }
    }, x = (u) => {
      var S;
      (S = u.data) != null && S.type && l("←", u.data.type, u.data.data ?? ""), pe(
        u,
        w,
        (c) => {
          var f;
          r(c), h.error = c, (f = window.PayConductor) != null && f.frame && (window.PayConductor.frame.error = c);
        },
        () => {
          var c;
          (c = e.onReady) == null || c.call(e), T();
        },
        (c) => {
          var f;
          (f = e.onError) == null || f.call(e, c);
        },
        (c) => {
          var f;
          (f = e.onPaymentComplete) == null || f.call(e, c);
        },
        (c) => {
          var f;
          (f = e.onPaymentFailed) == null || f.call(e, c);
        },
        (c) => {
          var f;
          (f = e.onPaymentPending) == null || f.call(e, c);
        },
        (c) => {
          var f;
          i(c), window.PayConductor && (window.PayConductor.selectedPaymentMethod = c), (f = e.onPaymentMethodSelected) == null || f.call(e, c);
        },
        () => {
          var c;
          (c = e.onThreeDSChallenge) == null || c.call(e);
        },
        () => {
          var c;
          (c = e.onThreeDSComplete) == null || c.call(e);
        },
        () => {
          var c;
          (c = e.onThreeDSFailed) == null || c.call(e);
        }
      );
    };
    window.addEventListener("message", x);
    const V = () => {
      var S, c, f;
      const u = y();
      if (!u) return !1;
      try {
        if ((((S = u.contentDocument) == null ? void 0 : S.readyState) ?? ((f = (c = u.contentWindow) == null ? void 0 : c.document) == null ? void 0 : f.readyState)) === "complete")
          return T(), !0;
      } catch {
      }
      return !1;
    }, K = () => {
      if (V()) return;
      const u = y();
      if (u) {
        u.addEventListener("load", () => T(), {
          once: !0
        });
        return;
      }
      setTimeout(K, 50);
    };
    K();
  }, []), /* @__PURE__ */ N(
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
function Qe(e) {
  const n = W(null), [t, a] = A(() => ""), [r, o] = A(() => !1), [d, s] = A(() => "");
  return F(() => {
    if (typeof document < "u" && !document.getElementById(z)) {
      const m = document.createElement("style");
      m.id = z, m.textContent = me, document.head.appendChild(m);
    }
    const i = (m) => {
      m != null && m.frame && (a(m.frame.iframeUrl || ""), o(!0), console.log("init", {
        PayConductor: window.PayConductor
      }));
    }, l = typeof window < "u" ? window.PayConductor : null;
    if (l)
      i(l);
    else {
      const m = (y) => {
        i(y.detail), window.removeEventListener("payconductor:registered", m);
      };
      window.addEventListener("payconductor:registered", m);
    }
    let g = !1;
    const w = (m) => {
      var y, h, E, C;
      if (((y = m.data) == null ? void 0 : y.type) === P.RESIZE && ((E = (h = m.data) == null ? void 0 : h.data) != null && E.height) && s(m.data.data.height + "px"), ((C = m.data) == null ? void 0 : C.type) === P.READY && e.height && !g) {
        g = !0;
        const T = document.querySelector(
          ".payconductor-element iframe"
        );
        T != null && T.contentWindow && T.contentWindow.postMessage(
          {
            type: P.CONFIG,
            data: {
              height: e.height
            },
            requestId: "element-height"
          },
          "*"
        );
      }
    };
    return window.addEventListener("message", w), () => window.removeEventListener("message", w);
  }, []), /* @__PURE__ */ q(
    "div",
    {
      className: "payconductor-element",
      style: {
        width: "100%"
      },
      children: [
        r ? null : /* @__PURE__ */ N(
          "div",
          {
            className: "payconductor-skeleton",
            style: {
              height: e.height || B
            }
          }
        ),
        r && t ? /* @__PURE__ */ N(
          "iframe",
          {
            allow: "payment",
            title: "PayConductor",
            ref: n,
            src: t,
            style: {
              width: "100%",
              height: e.height || d || B,
              border: "none"
            }
          }
        ) : null
      ]
    }
  );
}
function et(e) {
  const [n, t] = A(() => !1);
  return F(() => {
    const a = () => {
      t(!0);
    }, r = () => {
      t(!1);
    };
    return window.addEventListener("payconductor:3ds:show", a), window.addEventListener("payconductor:3ds:hide", r), typeof window < "u" && (window.PayConductor3DS = {
      container: () => document.getElementById("payconductor-3ds-container"),
      show: a,
      hide: r
    }, window.dispatchEvent(new CustomEvent("payconductor:3ds:registered"))), () => {
      window.removeEventListener("payconductor:3ds:show", a), window.removeEventListener("payconductor:3ds:hide", r), window.PayConductor3DS = null;
    };
  }, []), /* @__PURE__ */ N(
    "div",
    {
      className: "payconductor-three-ds",
      id: "payconductor-3ds-container",
      style: {
        width: "100%",
        display: n ? "block" : "none",
        minHeight: n ? e.height || "600px" : "0"
      }
    }
  );
}
function tt() {
  const e = typeof window < "u" ? window.PayConductor : null, n = e != null && e.config ? {
    publicKey: e.config.publicKey,
    orderId: e.config.orderId,
    theme: e.config.theme,
    locale: e.config.locale
  } : {}, t = e != null && e.frame ? {
    iframe: e.frame.iframe,
    error: e.frame.error
  } : {
    iframe: null,
    error: null
  };
  return {
    ...n,
    ...t
  };
}
function L(e) {
  var n;
  if ((n = e == null ? void 0 : e.frame) != null && n.iframe) {
    const t = e.frame.iframe;
    if (t instanceof HTMLIFrameElement) return t;
    if (t && typeof t == "object") {
      if ("current" in t) {
        const a = t.current;
        if (a instanceof HTMLIFrameElement) return a;
      }
      if ("value" in t) {
        const a = t.value;
        if (a instanceof HTMLIFrameElement) return a;
      }
    }
  }
  return document.querySelector(".payconductor-element iframe") ?? null;
}
function nt() {
  const e = () => typeof window < "u" ? window.PayConductor : null, n = (t, a) => {
    const r = e();
    if (!r) return;
    const o = L(r);
    o != null && o.contentWindow && o.contentWindow.postMessage({
      type: t,
      data: a
    }, "*");
  };
  return {
    init: async (t) => {
      const a = L(e()), r = O();
      return Ce(a || void 0, r, t);
    },
    confirmPayment: async (t) => {
      if (!t.orderId)
        throw new Error("Order ID is required");
      const a = e();
      if (!(a != null && a.api)) throw new Error("PayConductor not initialized");
      return a.api.confirmPayment(t);
    },
    validate: (t) => {
      const a = e();
      return a ? a.api.validate(t) : Promise.resolve(!1);
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
      var r;
      const a = (r = e()) == null ? void 0 : r.config;
      n(P.CONFIG, {
        publicKey: a == null ? void 0 : a.publicKey,
        orderId: a == null ? void 0 : a.orderId,
        theme: t.theme ?? (a == null ? void 0 : a.theme),
        locale: t.locale ?? (a == null ? void 0 : a.locale),
        paymentMethods: t.paymentMethods ?? (a == null ? void 0 : a.paymentMethods)
      });
    },
    updateOrderId: (t) => {
      var r;
      const a = (r = e()) == null ? void 0 : r.config;
      n(P.CONFIG, {
        publicKey: a == null ? void 0 : a.publicKey,
        orderId: t,
        theme: a == null ? void 0 : a.theme,
        locale: a == null ? void 0 : a.locale,
        paymentMethods: a == null ? void 0 : a.paymentMethods
      });
    },
    update: (t) => {
      n(P.UPDATE, t);
    },
    submit: async () => {
      const t = L(e()), a = O();
      try {
        return await D(t || void 0, a, P.CONFIRM_PAYMENT, {}), {
          paymentMethod: void 0
        };
      } catch (r) {
        return {
          error: {
            message: r instanceof Error ? r.message : "Payment failed",
            code: "payment_error",
            type: "payment_error"
          }
        };
      }
    }
  };
}
var b = /* @__PURE__ */ ((e) => (e.Success = "Success", e.Failed = "Failed", e.Timeout = "Timeout", e))(b || {});
class R {
  constructor(n, t) {
    p(this, "overlay", null);
    p(this, "modalContent", null);
    this.data = n, this.options = t;
  }
  fail(n) {
    var a, r;
    const t = new Error(n);
    return (r = (a = this.options).onError) == null || r.call(a, t), {
      status: "Failed",
      error: t
    };
  }
  //#region Modal
  showModal() {
    return this.injectStyles(), this.overlay = document.createElement("div"), this.overlay.id = "payconductor-3ds-overlay", this.modalContent = document.createElement("div"), this.modalContent.id = "payconductor-3ds-modal", this.overlay.appendChild(this.modalContent), document.body.appendChild(this.overlay), this.modalContent;
  }
  closeModal() {
    this.overlay && (this.overlay.remove(), this.overlay = null, this.modalContent = null);
  }
  resolveContainer() {
    return this.modalContent ?? this.showModal();
  }
  injectStyles() {
    if (document.getElementById("payconductor-3ds-styles")) return;
    const n = document.createElement("style");
    n.id = "payconductor-3ds-styles", n.textContent = `
			#payconductor-3ds-overlay {
				position: fixed;
				inset: 0;
				z-index: 99999;
				display: flex;
				align-items: center;
				justify-content: center;
				background: rgba(0, 0, 0, 0.6);
			}
			#payconductor-3ds-modal {
				width: 500px;
				max-width: 95vw;
				min-height: 600px;
				border-radius: 8px;
				overflow: hidden;
				background: #fff;
			}
			#payconductor-3ds-modal iframe {
				width: 100%;
				height: 600px;
				border: none;
				display: block;
			}
			@media only screen and (max-width: 600px) {
				#payconductor-3ds-modal {
					width: 100vw;
					max-width: 100vw;
					min-height: 440px;
					border-radius: 0;
				}
				#payconductor-3ds-modal iframe {
					height: 440px;
				}
			}
		`, document.head.appendChild(n);
  }
  //#endregion
}
const Te = 5 * 60 * 1e3;
class ve extends R {
  constructor() {
    super(...arguments);
    p(this, "iframe", null);
    p(this, "messageListener", null);
    p(this, "timeoutId", null);
  }
  async authenticate() {
    const {
      threeDsUrl: t,
      creq: a
    } = this.data;
    if (!t || !a)
      return this.fail("Missing threeDsUrl or creq");
    const r = this.resolveContainer();
    return new Promise((o) => {
      var l;
      this.iframe = document.createElement("iframe"), this.iframe.name = "payconductor-3ds-challenge", this.iframe.id = "payconductor-3ds-challenge", r.appendChild(this.iframe), this.messageListener = (g) => {
        var w, m, y;
        ((w = g.data) == null ? void 0 : w.status) === "COMPLETE" && (this.cleanup(), (y = (m = this.options).onComplete) == null || y.call(m), o({
          status: b.Success
        }));
      }, window.addEventListener("message", this.messageListener), this.timeoutId = setTimeout(() => {
        var g, w;
        this.cleanup(), (w = (g = this.options).onTimeout) == null || w.call(g), o({
          status: b.Timeout
        });
      }, this.options.timeoutMs ?? Te);
      const d = (l = this.iframe.contentWindow) == null ? void 0 : l.document;
      if (!d) {
        this.cleanup(), o(this.fail("Cannot access iframe document"));
        return;
      }
      const s = d.createElement("form");
      s.name = "threeDsChallengeForm", s.setAttribute("target", "payconductor-3ds-challenge"), s.setAttribute("method", "post"), s.setAttribute("action", t);
      const i = d.createElement("input");
      i.setAttribute("type", "hidden"), i.setAttribute("name", "creq"), i.setAttribute("value", a), s.appendChild(i), this.iframe.appendChild(s), s.submit();
    });
  }
  cleanup() {
    this.timeoutId && (clearTimeout(this.timeoutId), this.timeoutId = null), this.messageListener && (window.removeEventListener("message", this.messageListener), this.messageListener = null), this.iframe && (this.iframe.remove(), this.iframe = null), this.closeModal();
  }
}
const U = /* @__PURE__ */ new Map();
function k(e) {
  const n = U.get(e);
  if (n) return n;
  const t = new Promise((a, r) => {
    if (document.querySelector(`script[src="${e}"]`)) {
      a();
      return;
    }
    const o = document.createElement("script");
    o.src = e, o.async = !0, o.onload = () => a(), o.onerror = () => {
      U.delete(e), r(new Error(`Failed to load script: ${e}`));
    }, (document.head || document.body).appendChild(o);
  });
  return U.set(e, t), t;
}
const Ae = "https://static.payzen.lat/static/js/authenticate-client/V1.0/kr-authenticate.umd", Me = 10 * 60 * 1e3;
class Ie extends R {
  constructor() {
    super(...arguments);
    p(this, "timeoutId", null);
  }
  async authenticate() {
    const {
      operationUrl: t,
      publicKey: a
    } = this.data;
    if (!t || !a)
      return this.fail("Missing operationUrl or publicKey");
    try {
      await k(Ae);
    } catch {
      return this.fail("Failed to load 3DS SDK");
    }
    const r = window.KrAuthenticate;
    return r ? new Promise((o) => {
      this.timeoutId = setTimeout(() => {
        var s, i;
        this.cleanup(), (i = (s = this.options).onTimeout) == null || i.call(s), o({
          status: b.Timeout
        });
      }, this.options.timeoutMs ?? Me), new r(a).authenticate(t, () => {
        var s, i;
        this.cleanup(), (i = (s = this.options).onComplete) == null || i.call(s), o({
          status: b.Success
        });
      });
    }) : this.fail("KrAuthenticate not available");
  }
  cleanup() {
    this.timeoutId && (clearTimeout(this.timeoutId), this.timeoutId = null);
  }
}
const De = {
  [_.Production]: "https://3ds-nx-js.stone.com.br/live/v2/3ds2.min",
  [_.Sandbox]: "https://3ds-nx-js.stone.com.br/test/v2/3ds2.min"
}, _e = 5 * 60 * 1e3;
function Ne() {
  const e = window.innerWidth;
  return e <= 480 ? "01" : e <= 768 ? "02" : e <= 1024 ? "03" : "04";
}
class Re extends R {
  constructor() {
    super(...arguments);
    p(this, "timeoutId", null);
    p(this, "methodContainer", null);
  }
  async authenticate() {
    const {
      authToken: t,
      card: a
    } = this.data;
    if (!t) return this.fail("Missing authToken for PagarMe 3DS");
    if (!a) return this.fail("Missing card data for PagarMe 3DS");
    const r = this.data.environment ?? _.Production;
    try {
      await k(De[r]);
    } catch {
      return this.fail("Failed to load Stone 3DS SDK");
    }
    const o = window.TDS;
    if (!o) return this.fail("Stone TDS SDK not available");
    const d = this.resolveContainer();
    return this.methodContainer = document.createElement("div"), this.methodContainer.style.display = "none", document.body.appendChild(this.methodContainer), new Promise((s) => {
      this.timeoutId = setTimeout(() => {
        var i, l;
        this.cleanup(), (l = (i = this.options).onTimeout) == null || l.call(i), s({
          status: b.Timeout
        });
      }, this.options.timeoutMs ?? _e), o.init({
        token: t,
        tds_method_container_element: this.methodContainer,
        challenge_container_element: d,
        use_default_challenge_iframe_style: !0,
        challenge_window_size: Ne()
      }, this.buildOrderData()).then((i) => {
        var g, w;
        if (this.cleanup(), !(i != null && i.length)) {
          s(this.fail("PagarMe 3DS returned no response"));
          return;
        }
        const l = i[0];
        if (l.challenge_canceled) {
          s(this.fail("3DS challenge canceled by user"));
          return;
        }
        l.trans_status === "Y" || l.trans_status === "A" ? ((w = (g = this.options).onComplete) == null || w.call(g), s({
          status: b.Success,
          dsTransactionId: l.tds_server_trans_id
        })) : s(this.fail(`3DS failed with status: ${l.trans_status}`));
      }).catch((i) => {
        this.cleanup(), s(this.fail(i instanceof Error ? i.message : "PagarMe 3DS failed"));
      });
    });
  }
  cleanup() {
    this.timeoutId && (clearTimeout(this.timeoutId), this.timeoutId = null), this.methodContainer && (this.methodContainer.remove(), this.methodContainer = null), this.closeModal();
  }
  buildOrderData() {
    var d;
    const {
      card: t,
      customer: a,
      amount: r,
      billingAddress: o
    } = this.data;
    return {
      payments: [{
        payment_method: "credit_card",
        credit_card: {
          card: {
            number: t == null ? void 0 : t.number,
            holder_name: t == null ? void 0 : t.holderName,
            exp_month: Number(t == null ? void 0 : t.expMonth),
            exp_year: Number(t == null ? void 0 : t.expYear),
            billing_address: o ? {
              country: o.country,
              state: o.state,
              city: o.city,
              zip_code: o.zipCode,
              line_1: `${o.number}, ${o.street}${o.district ? `, ${o.district}` : ""}`,
              line_2: o.complement ?? ""
            } : void 0
          }
        },
        amount: r
      }],
      ...a ? {
        customer: {
          name: a.name,
          email: a.email,
          ...a.document ? {
            document: a.document
          } : {},
          ...(d = a.phones) != null && d.length ? {
            phones: Object.fromEntries(a.phones.map((s) => [s.type === "HOME" ? "home_phone" : "mobile_phone", {
              country_code: s.countryCode,
              area_code: s.areaCode,
              number: s.number
            }]))
          } : {}
        }
      } : {}
    };
  }
}
const ke = "https://assets.pagseguro.com.br/checkout-sdk-js/rc/dist/browser/pagseguro.min";
class xe extends R {
  async authenticate() {
    var w, m, y;
    const {
      authToken: n,
      card: t,
      customer: a,
      amount: r,
      currency: o,
      billingAddress: d
    } = this.data;
    if (!n) return this.fail("Missing authToken (session) for PagSeguro 3DS");
    if (!t) return this.fail("Missing card data for PagSeguro 3DS");
    if (!a) return this.fail("Missing customer data for PagSeguro 3DS");
    if (!r) return this.fail("Missing amount for PagSeguro 3DS");
    if (!d) return this.fail("Missing billingAddress for PagSeguro 3DS");
    const s = this.data.environment === _.Sandbox ? "SANDBOX" : "PROD";
    try {
      await k(ke);
    } catch {
      return this.fail("Failed to load PagSeguro SDK");
    }
    const i = window.PagSeguro;
    if (!i) return this.fail("PagSeguro SDK not available");
    i.setUp({
      session: n,
      env: s
    });
    const l = ((w = a.phones) == null ? void 0 : w.map((h) => ({
      country: h.countryCode,
      area: h.areaCode,
      number: h.number,
      type: h.type ?? "MOBILE"
    }))) ?? [{
      country: "55",
      area: "11",
      number: "999999999",
      type: "MOBILE"
    }];
    l.some((h) => h.type === "MOBILE") || (l[0].type = "MOBILE");
    try {
      const h = await i.authenticate3DS({
        data: {
          customer: {
            name: a.name,
            email: a.email,
            phones: l
          },
          paymentMethod: {
            type: this.data.installments === 0 ? "DEBIT_CARD" : "CREDIT_CARD",
            installments: this.data.installments ?? 1,
            card: {
              number: t.number,
              expMonth: t.expMonth,
              expYear: t.expYear,
              holder: {
                name: t.holderName
              }
            }
          },
          amount: {
            value: r,
            currency: o ?? "BRL"
          },
          billingAddress: {
            street: d.street,
            number: d.number,
            complement: d.complement,
            regionCode: d.state,
            country: d.country.length === 2 ? this.toAlpha3(d.country) : d.country,
            city: d.city,
            postalCode: d.zipCode.replace(/\D/g, "")
          },
          dataOnly: !1
        }
      });
      return h.status === "AUTH_FLOW_COMPLETED" || h.status === "AUTH_NOT_SUPPORTED" ? ((y = (m = this.options).onComplete) == null || y.call(m), {
        status: b.Success,
        dsTransactionId: h.id
      }) : h.status === "CHANGE_PAYMENT_METHOD" ? this.fail("PagSeguro requires a different payment method") : {
        status: b.Success,
        dsTransactionId: h.id
      };
    } catch (h) {
      return this.fail(h instanceof Error ? h.message : "PagSeguro 3DS failed");
    }
  }
  cleanup() {
  }
  toAlpha3(n) {
    return {
      BR: "BRA",
      US: "USA",
      AR: "ARG",
      CL: "CHL",
      CO: "COL",
      MX: "MEX",
      PE: "PER",
      UY: "URY"
    }[n.toUpperCase()] ?? n;
  }
}
const Le = {
  // Agnostic providers
  [I.Lyra]: Ie,
  // Acquirer-specific providers
  [I.MercadoPago]: ve,
  [I.PagarMe]: Re,
  [I.PagSeguro]: xe
};
class Ue extends Error {
  constructor(n, t) {
    super(n), this.title = t, this.name = "PayConductorThreeDSApiError";
  }
}
class Oe {
  constructor(n) {
    this.publicKey = n;
  }
  async completeManualChallenge(n, t) {
    const a = await fetch(`${this.baseUrl}/three-ds/complete/${n}`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        providerTransactionId: t
      })
    });
    a.ok || await this.parseResponseError("Failed to complete native 3DS challenge", a);
  }
  async parseResponseError(n, t) {
    var r, o, d, s;
    let a = "";
    try {
      const i = await t.json();
      i != null && i.message ? a = i.message : (r = i == null ? void 0 : i.error) != null && r.message ? a = i.error : (d = (o = i == null ? void 0 : i.error) == null ? void 0 : o.value) != null && d.message ? a = i.error.value.message : (s = i == null ? void 0 : i.value) != null && s.message ? a = i.value.message : a = JSON.stringify(i);
    } catch {
    }
    throw new Ue(a, n);
  }
  get baseUrl() {
    return typeof window < "u" && window.location.href.includes("localhost") ? "http://localhost:3000/api/v1/sdk" : "https://payconductor.ai/api/v1/sdk";
  }
  get headers() {
    return {
      Authorization: `Basic ${btoa(`${this.publicKey}:x`)}`,
      "Content-Type": "application/json"
    };
  }
}
const Fe = [I.PagSeguro];
class Ke {
  constructor(n) {
    p(this, "data");
    p(this, "provider", null);
    this.data = n;
  }
  get needsChallenge() {
    return this.data.status === "NeedChallenge" || this.data.statusDetail === "ThreeDsAwaitingChallenge";
  }
  get acquirer() {
    return this.data.acquirer;
  }
  async authenticate(n) {
    if (!this.needsChallenge)
      return {
        status: b.Success
      };
    const {
      acquirer: t
    } = this.data;
    if (!t)
      return {
        status: b.Failed,
        error: new Error("Missing 3DS acquirer")
      };
    const a = Le[t];
    if (!a)
      return {
        status: b.Failed,
        error: new Error(`Unsupported 3DS provider: ${t}`)
      };
    const r = {
      ...n,
      threeDSecure: this.data
    };
    this.provider = new a(this.data, r);
    const o = await this.provider.authenticate();
    return o.status === b.Success && o.dsTransactionId && Fe.includes(t) && this.data.orderId && this.data.publicKey && await new Oe(this.data.publicKey).completeManualChallenge(this.data.orderId, o.dsTransactionId), o;
  }
  destroy() {
    this.provider && (this.provider.cleanup(), this.provider = null);
  }
}
function at(e) {
  let n = null;
  return {
    handleChallenge: async (r) => {
      var s;
      if (!(r.status === "NeedChallenge" || r.statusDetail === "ThreeDsAwaitingChallenge"))
        return {
          status: b.Success
        };
      (s = e == null ? void 0 : e.onChallenge) == null || s.call(e), n = new Ke(r);
      const d = await n.authenticate({
        onComplete: e == null ? void 0 : e.onComplete,
        onError: e == null ? void 0 : e.onError,
        onTimeout: e == null ? void 0 : e.onTimeout
      });
      return n.destroy(), n = null, d;
    },
    destroy: () => {
      n == null || n.destroy(), n = null;
    }
  };
}
class Be extends Error {
  constructor(n, t) {
    super(n), this.title = t, this.name = "PayConductorTokenizerApiError";
  }
}
class ze {
  constructor(n) {
    this.publicKey = n;
  }
  async getSettings() {
    const n = await fetch(`${this.baseUrl}/card-tokenization/settings`, {
      method: "GET",
      headers: this.headers
    });
    return n.ok || await this.parseResponseError("Failed to fetch settings", n), await n.json();
  }
  async createToken(n) {
    const t = await fetch(`${this.baseUrl}/card-tokenization/tokenize`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(n)
    });
    return t.ok || await this.parseResponseError("Failed to generate token", t), await t.json();
  }
  async saveTokens(n, t, a) {
    const r = await fetch(`${this.baseUrl}/card-tokenization/save-tokens/${t}/${a}`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(n)
    });
    r.ok || await this.parseResponseError("Failed to save tokens", r);
  }
  async parseResponseError(n, t) {
    var r, o, d, s;
    let a = "";
    try {
      const i = await t.json();
      i != null && i.message ? a = i.message : (r = i == null ? void 0 : i.error) != null && r.message ? a = i.error : (d = (o = i == null ? void 0 : i.error) == null ? void 0 : o.value) != null && d.message ? a = i.error.value.message : (s = i == null ? void 0 : i.value) != null && s.message ? a = i.value.message : a = JSON.stringify(i);
    } catch {
    }
    throw new Be(a, n);
  }
  get baseUrl() {
    return typeof window < "u" && window.location.href.includes("localhost") ? "http://localhost:3000/api/v1/sdk" : "https://payconductor.ai/api/v1/sdk";
  }
  get headers() {
    return {
      Authorization: `Basic ${btoa(`${this.publicKey}:x`)}`,
      "Content-Type": "application/json"
    };
  }
}
class He {
  constructor(n) {
    this.input = n;
  }
}
class Ye extends He {
  constructor() {
    super(...arguments);
    p(this, "scriptUrl", "https://sdk.mercadopago.com/js/v2");
  }
  async tokenize() {
    if (!("publicKey" in this.input.setting))
      throw new Error("MercadoPago public key is missing in settings");
    if (!this.input.customer.documentNumber)
      throw new Error("Customer document number is required for tokenization");
    const t = window.MercadoPago;
    if (!t) throw new Error("MercadoPago SDK not available");
    const a = new t(this.input.setting.publicKey), {
      expiration: r,
      cvv: o,
      number: d,
      holderName: s
    } = this.input.card;
    return (await a.createCardToken({
      cardExpirationMonth: String(r.month),
      cardExpirationYear: String(r.year),
      cardholderName: s,
      cardNumber: d,
      securityCode: o,
      identificationType: this.input.customer.documentType === G.Cpf ? "CPF" : "CNPJ",
      identificationNumber: this.input.customer.documentNumber
    })).id;
  }
}
const Ge = {
  [I.MercadoPago]: Ye
};
class Ve {
  constructor(n) {
    p(this, "api");
    this.publicKey = n, this.api = new ze(this.publicKey);
  }
  async tokenizeCard(n) {
    this.validateCard(n);
    const {
      customerId: t,
      token: a
    } = await this.api.createToken({
      card: n.card,
      customer: n.customer,
      saveCard: !1
    }), {
      settings: r
    } = await this.api.getSettings(), d = (await Promise.all(r.map(async (s) => {
      const i = Ge[s.key];
      if (!i) return null;
      const l = new i({
        ...n,
        setting: s.settings
      });
      return await k(l.scriptUrl), {
        token: await l.tokenize(),
        integrationId: s.integrationId,
        providerKey: s.key
      };
    }))).filter((s) => s !== null);
    return d.length > 0 && await this.api.saveTokens(d, t, a), a;
  }
  validateCard(n) {
    const {
      number: t,
      cvv: a,
      expiration: r,
      holderName: o
    } = n.card;
    if (!t || !a || !(r != null && r.month) || !(r != null && r.year) || !o)
      throw new Error("Invalid card data");
  }
}
function rt(e) {
  const n = new Ve(e.publicKey);
  return {
    tokenizeCard: async (a) => {
      var r, o;
      try {
        const d = await n.tokenizeCard(a);
        return (r = e.onSuccess) == null || r.call(e, d), d;
      } catch (d) {
        const s = d instanceof Error ? d : new Error("Tokenization failed");
        return (o = e.onError) == null || o.call(e, s), null;
      }
    }
  };
}
export {
  ue as ALLOWED_ORIGINS,
  re as CardBrand,
  te as ChargeStatusDetail,
  ie as CurrencyType,
  oe as DeviceType,
  G as DocumentType,
  Xe as ERROR_CODES,
  de as ErrorCode,
  le as IFRAME_BASE_URL,
  B as IFRAME_DEFAULT_HEIGHT_VALUE,
  v as IncomingMessage,
  se as InputStyleKey,
  I as IntegrationProvider,
  _ as OrganizationEnvironment,
  M as OutgoingMessage,
  P as POST_MESSAGES,
  Ze as PayConductor,
  Ke as PayConductor3DSSDK,
  Qe as PayConductorCheckoutElement,
  et as PayConductorThreeDSElement,
  Ve as PayConductorTokenizerSDK,
  Z as PaymentMethod,
  Q as PaymentMethodLayout,
  ee as PaymentStatus,
  he as REQUEST_TIMEOUT,
  me as SKELETON_CSS,
  z as SKELETON_STYLE_ID,
  ae as ThreeDSResultStatus,
  ne as ThreeDsAuthenticationStatus,
  fe as buildIframeUrl,
  Ze as default,
  Je as defaultTheme,
  ye as generateRequestId,
  we as isValidOrigin,
  k as loadScript,
  tt as usePayConductor,
  nt as usePayconductorElement,
  at as useThreeDS,
  rt as useTokenizer
};
//# sourceMappingURL=index.es.js.map
