var te = Object.defineProperty;
var ae = (e, a, t) => a in e ? te(e, a, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[a] = t;
var P = (e, a, t) => ae(e, typeof a != "symbol" ? a + "" : a, t);
import { jsx as O, jsxs as ne } from "react/jsx-runtime";
import { useState as I, useEffect as K, useRef as re } from "react";
const ie = "https://app.payconductor.ai", oe = "http://localhost:3000", W = "https://iframe.payconductor.ai/v1", J = "http://localhost:5175/v1", se = 3e5, de = "600px";
var ce = /* @__PURE__ */ ((e) => (e.Pix = "Pix", e.CreditCard = "CreditCard", e.DebitCard = "DebitCard", e.BankSlip = "BankSlip", e.Crypto = "Crypto", e.ApplePay = "ApplePay", e.NuPay = "NuPay", e.PicPay = "PicPay", e.AmazonPay = "AmazonPay", e.SepaDebit = "SepaDebit", e.GooglePay = "GooglePay", e))(ce || {}), le = /* @__PURE__ */ ((e) => (e.Grid = "grid", e.Vertical = "vertical", e.Horizontal = "horizontal", e))(le || {}), R = /* @__PURE__ */ ((e) => (e.Succeeded = "succeeded", e.Pending = "pending", e.Failed = "failed", e))(R || {}), j = /* @__PURE__ */ ((e) => (e.ThreeDsAwaitingChallenge = "ThreeDsAwaitingChallenge", e))(j || {}), ue = /* @__PURE__ */ ((e) => (e.Authenticated = "Authenticated", e.NotAuthenticated = "NotAuthenticated", e.NeedChallenge = "NeedChallenge", e))(ue || {}), he = /* @__PURE__ */ ((e) => (e.Pending = "Pending", e.Authenticated = "Authenticated", e.Failed = "Failed", e.NotEnrolled = "NotEnrolled", e))(he || {}), X = /* @__PURE__ */ ((e) => (e.Cpf = "Cpf", e.Cnpj = "Cnpj", e))(X || {}), T = /* @__PURE__ */ ((e) => (e.Asaas = "Asaas", e.Sandbox = "Sandbox", e.SandboxSplit = "SandboxSplit", e.MercadoPago = "MercadoPago", e.NuPay = "NuPay", e.PicPay = "PicPay", e.Woovi = "Woovi", e.EfiBank = "EfiBank", e.BrasPag = "BrasPag", e.PagarMe = "PagarMe", e.BancoDoBrasil = "BancoDoBrasil", e.PagSeguro = "PagSeguro", e.Ebanx = "Ebanx", e.OnlyUp = "OnlyUp", e.Barte = "Barte", e.BarteSplit = "BarteSplit", e.PagSmileA55 = "PagSmileA55", e.Avantti = "Avantti", e.MonsterGateway = "MonsterGateway", e.SAC = "SAC", e.Lyra = "Lyra", e))(T || {}), me = /* @__PURE__ */ ((e) => (e.Visa = "Visa", e.Mastercard = "Mastercard", e.AmericanExpress = "AmericanExpress", e.DinersClub = "DinersClub", e.Discover = "Discover", e.JCB = "JCB", e.UnionPay = "UnionPay", e.Maestro = "Maestro", e.Mir = "Mir", e.Elo = "Elo", e.Hiper = "Hiper", e.Hipercard = "Hipercard", e.Verve = "Verve", e.Unknown = "Unknown", e))(me || {}), k = /* @__PURE__ */ ((e) => (e.Production = "Production", e.Sandbox = "Sandbox", e))(k || {}), fe = /* @__PURE__ */ ((e) => (e.USD = "USD", e.EUR = "EUR", e.BRL = "BRL", e.ARS = "ARS", e.CAD = "CAD", e.COP = "COP", e.GBP = "GBP", e.JPY = "JPY", e.MXN = "MXN", e.MZN = "MZN", e.CNY = "CNY", e.SAR = "SAR", e.ETH = "ETH", e.BNB = "BNB", e.BTC = "BTC", e.USDT = "USDT", e.USDC = "USDC", e.DOGE = "DOGE", e.SOL = "SOL", e))(fe || {}), ye = /* @__PURE__ */ ((e) => (e.Android = "android", e.IOS = "ios", e.Web = "web", e.Chrome = "chrome", e.Safari = "safari", e))(ye || {}), ge = /* @__PURE__ */ ((e) => (e.Padding = "padding", e.Radius = "radius", e.Color = "color", e.Background = "background", e.Shadow = "shadow", e))(ge || {}), D = /* @__PURE__ */ ((e) => (e.Init = "Init", e.Config = "Config", e.Update = "Update", e.ConfirmPayment = "ConfirmPayment", e.Validate = "Validate", e.Reset = "Reset", e))(D || {}), v = /* @__PURE__ */ ((e) => (e.Ready = "Ready", e.Error = "Error", e.CheckoutSessionCreated = "CheckoutSessionCreated", e.PaymentComplete = "PaymentComplete", e.PaymentFailed = "PaymentFailed", e.PaymentPending = "PaymentPending", e.ValidationError = "ValidationError", e.PaymentMethodSelected = "PaymentMethodSelected", e.Resize = "Resize", e.ThreeDSChallenge = "ThreeDSChallenge", e.ThreeDSComplete = "ThreeDSComplete", e.ThreeDSFailed = "ThreeDSFailed", e))(v || {}), Ee = /* @__PURE__ */ ((e) => (e.InvalidClient = "InvalidClient", e.InvalidToken = "InvalidToken", e.NetworkError = "NetworkError", e.IframeNotReady = "IframeNotReady", e.PaymentDeclined = "PaymentDeclined", e.ValidationError = "ValidationError", e.Timeout = "Timeout", e))(Ee || {});
const ot = {
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
}, Z = window.location.search.includes("development"), we = Z ? J : W, M = `${Z ? oe : ie}/api/v1/sdk`, Se = [J, W], G = de, be = se, w = {
  INIT: D.Init,
  CONFIG: D.Config,
  UPDATE: D.Update,
  CONFIRM_PAYMENT: D.ConfirmPayment,
  VALIDATE: D.Validate,
  RESET: D.Reset,
  READY: v.Ready,
  ERROR: v.Error,
  PAYMENT_COMPLETE: v.PaymentComplete,
  PAYMENT_FAILED: v.PaymentFailed,
  PAYMENT_PENDING: v.PaymentPending,
  VALIDATION_ERROR: v.ValidationError,
  PAYMENT_METHOD_SELECTED: v.PaymentMethodSelected,
  RESIZE: v.Resize
}, st = {
  INVALID_CLIENT: "InvalidClient",
  INVALID_TOKEN: "InvalidToken",
  NETWORK_ERROR: "NetworkError",
  IFRAME_NOT_READY: "IframeNotReady",
  PAYMENT_DECLINED: "PaymentDeclined",
  VALIDATION_ERROR: "ValidationError",
  TIMEOUT: "Timeout"
}, Y = "payconductor-skeleton-style", Pe = `
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
function Ce(e) {
  const a = new URLSearchParams({
    publicKey: e.publicKey
  });
  return `${we}?${a.toString()}`;
}
function pe() {
  return crypto.randomUUID();
}
function Ae(e, a) {
  return a.some((t) => {
    try {
      return new URL(t).origin === e;
    } catch {
      return t === e;
    }
  });
}
function z() {
  return /* @__PURE__ */ new Map();
}
function x(e, a, t, n) {
  return new Promise((r, i) => {
    if (!e || !("contentWindow" in e)) {
      i(new Error("Iframe not defined"));
      return;
    }
    if (!(e != null && e.contentWindow)) {
      i(new Error("Iframe not ready"));
      return;
    }
    if (!a) {
      i(new Error("Pending requests not initialized"));
      return;
    }
    const s = pe();
    a.set(s, {
      resolve: r,
      reject: i
    }), e.contentWindow.postMessage({
      type: t,
      data: n,
      requestId: s
    }, "*"), setTimeout(() => {
      a != null && a.has(s) && (a.delete(s), i(new Error("Request timeout")));
    }, be);
  });
}
function ve(e, a, t) {
  return x(e, a, w.CONFIRM_PAYMENT, t);
}
async function Te(e, a, t) {
  return await ve(e, a, {
    orderId: t.orderId
  });
}
function Ie(e, a, t) {
  return x(e, a, w.VALIDATE, t);
}
function De(e, a) {
  return x(e, a, w.RESET);
}
function Me(e, a, t) {
  return x(e, a, w.CONFIG, t);
}
function xe(e, a, t) {
  return x(e, a, w.INIT, t);
}
function Re(e, a, t, n, r, i, s, d, o, l, y, E) {
  const c = e.data, {
    requestId: m,
    type: b,
    data: g,
    error: p
  } = c;
  if (b === w.READY) {
    if (n == null || n(), m && (a != null && a.has(m))) {
      const {
        resolve: A
      } = a.get(m);
      a.delete(m), A(g);
    }
    return;
  }
  if (Ae(e.origin, Se)) {
    if (m && a && a.has(m)) {
      const {
        resolve: A,
        reject: U
      } = a.get(m);
      a.delete(m), p ? U(new Error(String(p.message))) : A(g);
      return;
    }
    if (b === w.ERROR) {
      t((p == null ? void 0 : p.message) || "Unknown error"), r == null || r(new Error(String(p == null ? void 0 : p.message)));
      return;
    }
    if (b === w.PAYMENT_COMPLETE) {
      g && typeof g == "object" && "status" in g && (i == null || i(g));
      return;
    }
    if (b === w.PAYMENT_FAILED) {
      g && typeof g == "object" && "status" in g && (s == null || s(g));
      return;
    }
    if (b === w.PAYMENT_PENDING) {
      g && typeof g == "object" && "status" in g && (d == null || d(g));
      return;
    }
    if (b === w.PAYMENT_METHOD_SELECTED) {
      g && typeof g == "object" && "paymentMethod" in g && (o == null || o(g.paymentMethod));
      return;
    }
    if (b !== w.RESIZE) {
      if (b === v.ThreeDSChallenge) {
        l == null || l();
        return;
      }
      if (b === v.ThreeDSComplete) {
        y == null || y();
        return;
      }
      if (b === v.ThreeDSFailed) {
        E == null || E();
        return;
      }
    }
  }
}
function dt(e) {
  const [a, t] = I(
    () => !1
  ), [n, r] = I(() => null), [i, s] = I(
    () => ""
  ), [d, o] = I(() => null);
  return K(() => {
    const l = (...h) => {
      e.debug && console.log("[PayConductor]", ...h);
    }, y = Ce({
      publicKey: e.publicKey
    });
    s(y), t(!0);
    const E = z();
    let c = !1;
    l("init", e.publicKey), l("iframeUrl", y);
    const m = () => {
      var C, u;
      const h = (u = (C = window.PayConductor) == null ? void 0 : C.frame) == null ? void 0 : u.iframe;
      if (h) {
        if (h instanceof HTMLIFrameElement) return h;
        if (typeof h == "object" && h !== null) {
          const f = h;
          if ("current" in f && f.current instanceof HTMLIFrameElement)
            return f.current;
          if ("value" in f && f.value instanceof HTMLIFrameElement)
            return f.value;
        }
        return h;
      }
      return document.querySelector(
        ".payconductor-element iframe"
      ) ?? void 0;
    }, b = {
      get iframe() {
        return document.querySelector(
          ".payconductor-element iframe"
        ) ?? null;
      },
      set iframe(h) {
      },
      iframeUrl: y,
      error: null
    }, g = {
      publicKey: e.publicKey,
      theme: e.theme,
      locale: e.locale,
      paymentMethods: e.paymentMethods,
      defaultPaymentMethod: e.defaultPaymentMethod
    }, p = {
      confirmPayment: (h) => {
        var u;
        l("→ CONFIRM_PAYMENT", {
          orderId: h.orderId
        });
        const C = m();
        return C != null && C.contentWindow && C.contentWindow.postMessage(
          {
            type: w.CONFIG,
            data: {
              publicKey: e.publicKey,
              orderId: h.orderId,
              theme: e.theme,
              locale: e.locale,
              paymentMethods: e.paymentMethods,
              defaultPaymentMethod: e.defaultPaymentMethod,
              showPaymentButtons: e.showPaymentButtons,
              nuPayConfig: e.nuPayConfig
            }
          },
          "*"
        ), g.orderId = h.orderId, (u = window.PayConductor) != null && u.config && (window.PayConductor.config.orderId = h.orderId), Te(C, E, h);
      },
      validate: (h) => (l("→ VALIDATE", h), Ie(m(), E, h)),
      reset: () => (l("→ RESET"), De(m(), E)),
      getSelectedPaymentMethod: () => d
    };
    window.PayConductor = {
      frame: b,
      config: g,
      api: p,
      selectedPaymentMethod: d
    }, l("registered"), window.dispatchEvent(
      new CustomEvent("payconductor:registered", {
        detail: window.PayConductor
      })
    );
    const A = async () => {
      if (!c) {
        const h = m();
        if (!h) {
          l("→ CONFIG skipped: iframe not found");
          return;
        }
        c = !0, l("→ CONFIG", {
          theme: e.theme,
          locale: e.locale,
          paymentMethods: e.paymentMethods,
          defaultPaymentMethod: e.defaultPaymentMethod,
          showPaymentButtons: e.showPaymentButtons
        }), Me(h, E, {
          theme: e.theme,
          locale: e.locale,
          paymentMethods: e.paymentMethods,
          defaultPaymentMethod: e.defaultPaymentMethod,
          showPaymentButtons: e.showPaymentButtons,
          nuPayConfig: e.nuPayConfig
        });
      }
    }, U = (h) => {
      var C;
      (C = h.data) != null && C.type && l("←", h.data.type, h.data.data ?? ""), Re(
        h,
        E,
        (u) => {
          var f;
          r(u), b.error = u, (f = window.PayConductor) != null && f.frame && (window.PayConductor.frame.error = u);
        },
        () => {
          var u;
          (u = e.onReady) == null || u.call(e), A();
        },
        (u) => {
          var f;
          (f = e.onError) == null || f.call(e, u);
        },
        (u) => {
          var f;
          (f = e.onPaymentComplete) == null || f.call(e, u);
        },
        (u) => {
          var f;
          (f = e.onPaymentFailed) == null || f.call(e, u);
        },
        (u) => {
          var f;
          (f = e.onPaymentPending) == null || f.call(e, u);
        },
        (u) => {
          var f;
          o(u), window.PayConductor && (window.PayConductor.selectedPaymentMethod = u), (f = e.onPaymentMethodSelected) == null || f.call(e, u);
        },
        () => {
          var u;
          (u = e.onThreeDSChallenge) == null || u.call(e);
        },
        () => {
          var u;
          (u = e.onThreeDSComplete) == null || u.call(e);
        },
        () => {
          var u;
          (u = e.onThreeDSFailed) == null || u.call(e);
        }
      );
    };
    window.addEventListener("message", U);
    const ee = () => {
      var C, u, f;
      const h = m();
      if (!h) return !1;
      try {
        if ((((C = h.contentDocument) == null ? void 0 : C.readyState) ?? ((f = (u = h.contentWindow) == null ? void 0 : u.document) == null ? void 0 : f.readyState)) === "complete")
          return A(), !0;
      } catch {
      }
      return !1;
    }, $ = () => {
      if (ee()) return;
      const h = m();
      if (h) {
        h.addEventListener("load", () => A(), {
          once: !0
        });
        return;
      }
      setTimeout($, 50);
    };
    $();
  }, []), /* @__PURE__ */ O(
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
function ct(e) {
  const a = re(null), [t, n] = I(() => ""), [r, i] = I(() => !1), [s, d] = I(() => "");
  return K(() => {
    if (typeof document < "u" && !document.getElementById(Y)) {
      const c = document.createElement("style");
      c.id = Y, c.textContent = Pe, document.head.appendChild(c);
    }
    const o = (c) => {
      c != null && c.frame && (n(c.frame.iframeUrl || ""), i(!0), console.log("init", {
        PayConductor: window.PayConductor
      }));
    }, l = typeof window < "u" ? window.PayConductor : null;
    if (l)
      o(l);
    else {
      const c = (m) => {
        o(m.detail), window.removeEventListener("payconductor:registered", c);
      };
      window.addEventListener("payconductor:registered", c);
    }
    let y = !1;
    const E = (c) => {
      var m, b, g, p;
      if (((m = c.data) == null ? void 0 : m.type) === w.RESIZE && ((g = (b = c.data) == null ? void 0 : b.data) != null && g.height) && d(c.data.data.height + "px"), ((p = c.data) == null ? void 0 : p.type) === w.READY && e.height && !y) {
        y = !0;
        const A = document.querySelector(
          ".payconductor-element iframe"
        );
        A != null && A.contentWindow && A.contentWindow.postMessage(
          {
            type: w.CONFIG,
            data: {
              height: e.height
            },
            requestId: "element-height"
          },
          "*"
        );
      }
    };
    return window.addEventListener("message", E), () => window.removeEventListener("message", E);
  }, []), /* @__PURE__ */ ne(
    "div",
    {
      className: "payconductor-element",
      style: {
        width: "100%"
      },
      children: [
        r ? null : /* @__PURE__ */ O(
          "div",
          {
            className: "payconductor-skeleton",
            style: {
              height: e.height || G
            }
          }
        ),
        r && t ? /* @__PURE__ */ O(
          "iframe",
          {
            allow: "payment",
            title: "PayConductor",
            ref: a,
            src: t,
            style: {
              width: "100%",
              height: e.height || s || G,
              border: "none"
            }
          }
        ) : null
      ]
    }
  );
}
function lt(e) {
  const [a, t] = I(() => !1);
  return K(() => {
    const n = () => {
      t(!0);
    }, r = () => {
      t(!1);
    };
    return window.addEventListener("payconductor:3ds:show", n), window.addEventListener("payconductor:3ds:hide", r), typeof window < "u" && (window.PayConductor3DS = {
      container: () => document.getElementById("payconductor-3ds-container"),
      show: n,
      hide: r
    }, window.dispatchEvent(new CustomEvent("payconductor:3ds:registered"))), () => {
      window.removeEventListener("payconductor:3ds:show", n), window.removeEventListener("payconductor:3ds:hide", r), window.PayConductor3DS = null;
    };
  }, []), /* @__PURE__ */ O(
    "div",
    {
      className: "payconductor-three-ds",
      id: "payconductor-3ds-container",
      style: {
        width: "100%",
        display: a ? "block" : "none",
        minHeight: a ? e.height || "600px" : "0"
      }
    }
  );
}
function ut() {
  const e = typeof window < "u" ? window.PayConductor : null, a = e != null && e.config ? {
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
    ...a,
    ...t
  };
}
function F(e) {
  var a;
  if ((a = e == null ? void 0 : e.frame) != null && a.iframe) {
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
function ht() {
  const e = () => typeof window < "u" ? window.PayConductor : null, a = (t, n) => {
    const r = e();
    if (!r) return;
    const i = F(r);
    i != null && i.contentWindow && i.contentWindow.postMessage({
      type: t,
      data: n
    }, "*");
  };
  return {
    init: async (t) => {
      const n = F(e()), r = z();
      return xe(n || void 0, r, t);
    },
    confirmPayment: async (t) => {
      if (!t.orderId)
        throw new Error("Order ID is required");
      const n = e();
      if (!(n != null && n.api)) throw new Error("PayConductor not initialized");
      return n.api.confirmPayment(t);
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
      var r;
      const n = (r = e()) == null ? void 0 : r.config;
      a(w.CONFIG, {
        publicKey: n == null ? void 0 : n.publicKey,
        orderId: n == null ? void 0 : n.orderId,
        theme: t.theme ?? (n == null ? void 0 : n.theme),
        locale: t.locale ?? (n == null ? void 0 : n.locale),
        paymentMethods: t.paymentMethods ?? (n == null ? void 0 : n.paymentMethods)
      });
    },
    updateOrderId: (t) => {
      var r;
      const n = (r = e()) == null ? void 0 : r.config;
      a(w.CONFIG, {
        publicKey: n == null ? void 0 : n.publicKey,
        orderId: t,
        theme: n == null ? void 0 : n.theme,
        locale: n == null ? void 0 : n.locale,
        paymentMethods: n == null ? void 0 : n.paymentMethods
      });
    },
    update: (t) => {
      a(w.UPDATE, t);
    },
    submit: async () => {
      const t = F(e()), n = z();
      try {
        return await x(t || void 0, n, w.CONFIRM_PAYMENT, {}), {
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
var H = /* @__PURE__ */ ((e) => (e.Auto = "Auto", e.Manual = "Manual", e.Agnostic = "Agnostic", e))(H || {}), S = /* @__PURE__ */ ((e) => (e.Success = "Success", e.Failed = "Failed", e.Timeout = "Timeout", e))(S || {}), _ = /* @__PURE__ */ ((e) => (e.Authenticated = "Y", e.Attempted = "A", e.ChallengeRequired = "C", e.NotAuthenticated = "N", e.Unavailable = "U", e.Rejected = "R", e.InformationOnly = "I", e))(_ || {});
class N {
  constructor(a, t) {
    P(this, "overlay", null);
    P(this, "modalContent", null);
    this.data = a, this.options = t;
  }
  /** Os SDKs de 3DS dos provedores (Pagar.me, PagSeguro) esperam o valor em centavos. */
  get amountInCents() {
    return this.data.amount === void 0 ? void 0 : Math.round(this.data.amount * 100);
  }
  fail(a, t = {}) {
    const n = new Error(a);
    return {
      ...t,
      status: "Failed",
      error: n
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
    const a = document.createElement("style");
    a.id = "payconductor-3ds-styles", a.textContent = `
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
		`, document.head.appendChild(a);
  }
  //#endregion
}
const _e = 5 * 60 * 1e3;
class ke extends N {
  constructor() {
    super(...arguments);
    P(this, "iframe", null);
    P(this, "messageListener", null);
    P(this, "timeoutId", null);
  }
  async authenticate() {
    const {
      threeDsUrl: t,
      creq: n
    } = this.data;
    if (!t || !n)
      return this.fail("Missing threeDsUrl or creq");
    const r = this.resolveContainer();
    return new Promise((i) => {
      var l;
      this.iframe = document.createElement("iframe"), this.iframe.name = "payconductor-3ds-challenge", this.iframe.id = "payconductor-3ds-challenge", r.appendChild(this.iframe), this.messageListener = (y) => {
        var E;
        ((E = y.data) == null ? void 0 : E.status) === "COMPLETE" && (this.cleanup(), i({
          status: S.Success
        }));
      }, window.addEventListener("message", this.messageListener), this.timeoutId = setTimeout(() => {
        this.cleanup(), i({
          status: S.Timeout
        });
      }, this.options.timeoutMs ?? _e);
      const s = (l = this.iframe.contentWindow) == null ? void 0 : l.document;
      if (!s) {
        this.cleanup(), i(this.fail("Cannot access iframe document"));
        return;
      }
      const d = s.createElement("form");
      d.name = "threeDsChallengeForm", d.setAttribute("target", "payconductor-3ds-challenge"), d.setAttribute("method", "post"), d.setAttribute("action", t);
      const o = s.createElement("input");
      o.setAttribute("type", "hidden"), o.setAttribute("name", "creq"), o.setAttribute("value", n), d.appendChild(o), this.iframe.appendChild(d), d.submit();
    });
  }
  cleanup() {
    this.timeoutId && (clearTimeout(this.timeoutId), this.timeoutId = null), this.messageListener && (window.removeEventListener("message", this.messageListener), this.messageListener = null), this.iframe && (this.iframe.remove(), this.iframe = null), this.closeModal();
  }
}
const B = /* @__PURE__ */ new Map();
function L(e) {
  const a = B.get(e);
  if (a) return a;
  const t = new Promise((n, r) => {
    if (document.querySelector(`script[src="${e}"]`)) {
      n();
      return;
    }
    const i = document.createElement("script");
    i.src = e, i.async = !0, i.onload = () => n(), i.onerror = () => {
      B.delete(e), r(new Error(`Failed to load script: ${e}`));
    }, (document.head || document.body).appendChild(i);
  });
  return B.set(e, t), t;
}
const Ne = "https://static.payzen.lat/static/js/authenticate-client/V1.0/kr-authenticate.umd.js", Oe = 10 * 60 * 1e3;
class Le extends N {
  constructor() {
    super(...arguments);
    P(this, "timeoutId", null);
  }
  async authenticate() {
    const {
      operationUrl: t,
      publicKey: n
    } = this.data;
    if (!t || !n)
      return this.fail("Missing operationUrl or publicKey");
    try {
      await L(Ne);
    } catch {
      return this.fail("Failed to load 3DS SDK");
    }
    const r = window.KrAuthenticate;
    return r ? new Promise((i) => {
      this.timeoutId = setTimeout(() => {
        this.cleanup(), i({
          status: S.Timeout
        });
      }, this.options.timeoutMs ?? Oe), new r(n).authenticate(t, () => {
        this.cleanup(), i({
          status: S.Success
        });
      });
    }) : this.fail("KrAuthenticate not available");
  }
  cleanup() {
    this.timeoutId && (clearTimeout(this.timeoutId), this.timeoutId = null);
  }
}
const Ue = {
  [k.Production]: "https://3ds-nx-js.stone.com.br/live/v2/3ds2.min.js",
  [k.Sandbox]: "https://3ds-nx-js.stone.com.br/test/v2/3ds2.min.js"
}, Fe = 5 * 60 * 1e3;
function Be() {
  const e = window.innerWidth;
  return e <= 480 ? "01" : e <= 768 ? "02" : e <= 1024 ? "03" : "04";
}
class ze extends N {
  constructor() {
    super(...arguments);
    P(this, "timeoutId", null);
    P(this, "methodContainer", null);
  }
  async authenticate() {
    const {
      authToken: t,
      card: n
    } = this.data;
    if (!t) return this.fail("Missing authToken for PagarMe 3DS");
    if (!n) return this.fail("Missing card data for PagarMe 3DS");
    const r = this.data.environment ?? k.Production;
    try {
      await L(Ue[r]);
    } catch {
      return this.fail("Failed to load Stone 3DS SDK");
    }
    const i = window.TDS;
    if (!i) return this.fail("Stone TDS SDK not available");
    const s = this.resolveContainer();
    return this.methodContainer = document.createElement("div"), this.methodContainer.style.display = "none", document.body.appendChild(this.methodContainer), new Promise((d) => {
      this.timeoutId = setTimeout(() => {
        this.cleanup(), d({
          status: S.Timeout
        });
      }, this.options.timeoutMs ?? Fe), i.init({
        token: t,
        tds_method_container_element: this.methodContainer,
        challenge_container_element: s,
        use_default_challenge_iframe_style: !0,
        challenge_window_size: Be()
      }, this.buildOrderData()).then((o) => {
        if (this.cleanup(), !(o != null && o.length)) {
          d(this.fail("PagarMe 3DS returned no response"));
          return;
        }
        const l = o[0], y = Object.values(_).find((c) => c === l.trans_status), E = {
          transStatus: y,
          providerTransactionId: l.tds_server_trans_id,
          challengeCanceled: l.challenge_canceled
        };
        if (l.challenge_canceled) {
          d(this.fail("3DS challenge canceled by user", E));
          return;
        }
        y === _.Authenticated || y === _.Attempted ? d({
          ...E,
          status: S.Success,
          dsTransactionId: l.tds_server_trans_id
        }) : d(this.fail(`3DS failed with status: ${l.trans_status}`, E));
      }).catch((o) => {
        this.cleanup(), d(this.fail(o instanceof Error ? o.message : "PagarMe 3DS failed"));
      });
    });
  }
  cleanup() {
    this.timeoutId && (clearTimeout(this.timeoutId), this.timeoutId = null), this.methodContainer && (this.methodContainer.remove(), this.methodContainer = null), this.closeModal();
  }
  buildOrderData() {
    var i;
    const {
      card: t,
      customer: n,
      billingAddress: r
    } = this.data;
    return {
      payments: [{
        payment_method: "credit_card",
        credit_card: {
          card: {
            number: t == null ? void 0 : t.number,
            holder_name: t == null ? void 0 : t.holderName,
            exp_month: Number(t == null ? void 0 : t.expiration.month),
            exp_year: Number(t == null ? void 0 : t.expiration.year),
            billing_address: r ? {
              country: r.country,
              state: r.state,
              city: r.city,
              zip_code: r.zipCode,
              line_1: `${r.number}, ${r.street}${r.district ? `, ${r.district}` : ""}`,
              line_2: r.complement ?? ""
            } : void 0
          }
        },
        amount: this.amountInCents
      }],
      ...n ? {
        customer: {
          name: n.name,
          email: n.email,
          ...n.document ? {
            document: n.document
          } : {},
          ...(i = n.phones) != null && i.length ? {
            phones: Object.fromEntries(n.phones.map((s) => [s.type === "HOME" ? "home_phone" : "mobile_phone", {
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
const Ke = "https://assets.pagseguro.com.br/checkout-sdk-js/rc/dist/browser/pagseguro.min.js";
class je extends N {
  async authenticate() {
    var E;
    const {
      authToken: a,
      card: t,
      customer: n,
      currency: r,
      billingAddress: i
    } = this.data, s = this.amountInCents;
    if (!a) return this.fail("Missing authToken (session) for PagSeguro 3DS");
    if (!t) return this.fail("Missing card data for PagSeguro 3DS");
    if (!n) return this.fail("Missing customer data for PagSeguro 3DS");
    if (!s) return this.fail("Missing amount for PagSeguro 3DS");
    if (!i) return this.fail("Missing billingAddress for PagSeguro 3DS");
    const d = this.data.environment === k.Sandbox ? "SANDBOX" : "PROD";
    try {
      await L(Ke);
    } catch {
      return this.fail("Failed to load PagSeguro SDK");
    }
    const o = window.PagSeguro;
    if (!o) return this.fail("PagSeguro SDK not available");
    o.setUp({
      session: a,
      env: d
    });
    const l = ((E = n.phones) == null ? void 0 : E.map((c) => ({
      country: c.countryCode,
      area: c.areaCode,
      number: c.number,
      type: c.type ?? "MOBILE"
    }))) ?? [{
      country: "55",
      area: "11",
      number: "999999999",
      type: "MOBILE"
    }];
    l.some((c) => c.type === "MOBILE") || (l[0].type = "MOBILE");
    try {
      const c = await o.authenticate3DS({
        data: {
          customer: {
            name: n.name,
            email: n.email,
            phones: l
          },
          paymentMethod: {
            type: this.data.installments === 0 ? "DEBIT_CARD" : "CREDIT_CARD",
            installments: this.data.installments ?? 1,
            card: {
              number: t.number,
              expMonth: t.expiration.month,
              expYear: t.expiration.year,
              holder: {
                name: t.holderName
              }
            }
          },
          amount: {
            value: s,
            currency: r ?? "BRL"
          },
          billingAddress: {
            street: i.street,
            number: i.number,
            complement: i.complement,
            regionCode: i.state,
            country: i.country.length === 2 ? this.toAlpha3(i.country) : i.country,
            city: i.city,
            postalCode: i.zipCode.replace(/\D/g, "")
          },
          dataOnly: !1
        }
      });
      return c.status === "AUTH_FLOW_COMPLETED" || c.status === "AUTH_NOT_SUPPORTED" ? {
        status: S.Success,
        dsTransactionId: c.id
      } : c.status === "CHANGE_PAYMENT_METHOD" ? this.fail("PagSeguro requires a different payment method") : {
        status: S.Success,
        dsTransactionId: c.id
      };
    } catch (c) {
      return this.fail(c instanceof Error ? c.message : "PagSeguro 3DS failed");
    }
  }
  cleanup() {
  }
  toAlpha3(a) {
    return {
      BR: "BRA",
      US: "USA",
      AR: "ARG",
      CL: "CHL",
      CO: "COL",
      MX: "MEX",
      PE: "PER",
      UY: "URY"
    }[a.toUpperCase()] ?? a;
  }
}
const He = 5 * 60 * 1e3, V = "payconductor-3ds-sandbox-title";
class q extends N {
  constructor() {
    super(...arguments);
    P(this, "timeoutId", null);
  }
  async authenticate() {
    const {
      authToken: t
    } = this.data;
    if (!t) return this.fail("Missing authToken for 3DS challenge");
    const n = this.resolveContainer();
    return new Promise((r) => {
      this.timeoutId = setTimeout(() => {
        this.cleanup(), r({
          status: S.Timeout
        });
      }, this.options.timeoutMs ?? He), this.renderChallenge(n, {
        onConfirm: () => {
          this.cleanup(), r({
            status: S.Success,
            transStatus: _.Authenticated,
            providerTransactionId: t
          });
        },
        onCancel: () => {
          this.cleanup(), r(this.fail("3DS challenge canceled by user", {
            challengeCanceled: !0
          }));
        }
      });
    });
  }
  cleanup() {
    this.timeoutId && (clearTimeout(this.timeoutId), this.timeoutId = null), this.closeModal();
  }
  renderChallenge(t, n) {
    const r = document.createElement("div");
    r.setAttribute("role", "dialog"), r.setAttribute("aria-modal", "true"), r.setAttribute("aria-labelledby", V), r.style.cssText = "min-height:inherit;box-sizing:border-box;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:32px;font-family:system-ui,-apple-system,sans-serif;text-align:center;color:#111827";
    const i = document.createElement("h2");
    i.id = V, i.textContent = "Autenticação 3DS (sandbox)", i.style.cssText = "margin:0;font-size:20px";
    const s = document.createElement("p");
    s.textContent = "Simulação do desafio do banco emissor. Confirme para aprovar a autenticação ou cancele para simular a desistência do comprador.", s.style.cssText = "margin:0 0 8px;max-width:360px;font-size:14px;line-height:1.5;color:#4b5563";
    const d = this.createButton("Confirmar autenticação", "background:#111827;color:#fff;border-color:#111827", n.onConfirm), o = this.createButton("Cancelar", "background:#fff;color:#111827;border-color:#d1d5db", n.onCancel);
    r.append(i, s, d, o), t.appendChild(r), d.focus();
  }
  createButton(t, n, r) {
    const i = document.createElement("button");
    return i.type = "button", i.textContent = t, i.style.cssText = `width:100%;max-width:320px;padding:12px 16px;border:1px solid;border-radius:6px;font:inherit;font-size:14px;font-weight:600;cursor:pointer;${n}`, i.addEventListener("click", r), i;
  }
}
const $e = {
  // Agnostic providers
  [T.Lyra]: Le,
  // Acquirer-specific providers
  [T.MercadoPago]: ke,
  [T.PagarMe]: ze,
  [T.PagSeguro]: je,
  [T.Sandbox]: q,
  [T.SandboxSplit]: q
}, Ge = M.replace(/\/sdk\/?$/, "");
class Q extends Error {
  constructor(a, t) {
    super(a), this.title = t, this.name = "PayConductorThreeDSApiError";
  }
}
class Ye {
  constructor(a) {
    this.publicKey = a;
  }
  async completeChallenge(a, t) {
    const n = await fetch(`${M}/three-ds/complete/${a}`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(t)
    });
    n.ok || await this.parseResponseError("Falha ao concluir a autenticação 3DS", n);
  }
  async getOrderStatus(a) {
    const t = await fetch(`${Ge}/orders/${a}/status`, {
      method: "GET",
      headers: this.headers
    });
    return t.ok || await this.parseResponseError("Falha ao consultar o status do pedido", t), qe(await t.json());
  }
  /**
   * Aguarda o pedido sair de `ThreeDsAwaitingChallenge`.
   * No modo `Auto` não existe `statusDetail`; a espera é enquanto o pedido seguir `Pending`.
   */
  async pollOrderStatus(a, {
    maxAttempts: t = 30,
    intervalMs: n = 2e3,
    mode: r
  } = {}) {
    let i = null;
    for (let s = 0; s < t; s++) {
      if (i = await this.getOrderStatus(a), !(i.status === R.Pending && (i.statusDetail === j.ThreeDsAwaitingChallenge || r === H.Auto))) return {
        order: i,
        timedOut: !1
      };
      await new Promise((o) => setTimeout(o, n));
    }
    return {
      order: i,
      timedOut: !0
    };
  }
  async getThreeDSecureData(a) {
    const t = await fetch(`${M}/three-ds/challenge/${a}`, {
      method: "GET",
      headers: this.headers
    });
    t.ok || await this.parseResponseError("Falha ao buscar dados 3DS", t);
    const n = await t.json(), r = Object.fromEntries(Object.entries(n.threeDSecure ?? {}).filter(([, i]) => i != null));
    return {
      ...r,
      ...n.mode ? {
        mode: n.mode
      } : {},
      statusDetail: r.statusDetail ?? n.statusDetail ?? void 0
    };
  }
  async parseResponseError(a, t) {
    var r, i, s, d;
    let n = "";
    try {
      const o = await t.json();
      o != null && o.message ? n = o.message : (r = o == null ? void 0 : o.error) != null && r.message ? n = o.error : (s = (i = o == null ? void 0 : o.error) == null ? void 0 : i.value) != null && s.message ? n = o.error.value.message : (d = o == null ? void 0 : o.value) != null && d.message ? n = o.value.message : n = JSON.stringify(o);
    } catch {
    }
    throw new Q(n, a);
  }
  get headers() {
    return {
      Authorization: `Basic ${btoa(`${this.publicKey}:x`)}`,
      "Content-Type": "application/json"
    };
  }
}
function Ve(e) {
  switch (e) {
    case "Completed":
      return R.Succeeded;
    case "Pending":
    case "Generating":
      return R.Pending;
    default:
      return R.Failed;
  }
}
function qe(e) {
  const a = e ?? {};
  return {
    ...a,
    orderId: a.id ?? "",
    status: Ve(a.status),
    statusDetail: a.statusDetail ?? void 0,
    amount: a.amount ?? 0,
    currency: a.currency ?? "BRL",
    errorCode: a.errorCode ?? void 0,
    errorMessage: a.errorMessage ?? void 0,
    message: a.errorMessage ?? void 0
  };
}
class We {
  constructor(a) {
    P(this, "data");
    P(this, "provider", null);
    P(this, "api");
    this.data = a, this.api = new Ye(this.data.publicKey);
  }
  get needsChallenge() {
    return this.data.status === "NeedChallenge" || this.data.statusDetail === "ThreeDsAwaitingChallenge";
  }
  get acquirer() {
    return this.data.acquirer;
  }
  /** Indica se o pedido precisa de autenticação 3DS. */
  static requiresChallenge(a) {
    var t, n, r;
    return a.statusDetail === "ThreeDsAwaitingChallenge" || ((t = a.threeDSecure) == null ? void 0 : t.status) === "NeedChallenge" || ((r = (n = a.creditCard) == null ? void 0 : n.threeDSecure) == null ? void 0 : r.status) === "NeedChallenge";
  }
  /**
   * Executa o fluxo completo de 3DS: carrega os dados, resolve o provedor,
   * conduz o desafio, envia o `complete` (só no modo `Manual`) e faz o polling
   * do pedido. O integrador não precisa ramificar por modo.
   */
  async authenticate(a) {
    var c;
    try {
      const m = await this.api.getThreeDSecureData(this.data.orderId);
      this.data = {
        ...this.data,
        ...m
      };
    } catch (m) {
      if (m instanceof Q)
        return {
          status: S.Failed,
          error: m
        };
      throw m;
    }
    if (!this.needsChallenge)
      return {
        status: S.Success
      };
    const {
      acquirer: t,
      mode: n
    } = this.data;
    if (!t)
      return this.finish({
        status: S.Failed,
        error: new Error("Adquirente 3DS não informada na cobrança"),
        failureReason: "Adquirente 3DS não informada na cobrança"
      }, a);
    const r = $e[t];
    if (!r) {
      const m = `Provedor 3DS não suportado: ${t}`;
      return this.finish({
        status: S.Failed,
        error: new Error(m),
        failureReason: m
      }, a);
    }
    (c = a == null ? void 0 : a.onChallenge) == null || c.call(a);
    const i = new r(this.data, {
      threeDSecure: this.data,
      timeoutMs: a == null ? void 0 : a.timeoutMs
    });
    this.provider = i;
    let s;
    try {
      s = await i.authenticate();
    } finally {
      i.cleanup(), this.provider = null;
    }
    const d = {
      ...s
    }, o = this.deriveFailureReason(s);
    d.failureReason = o;
    const l = n ? n === H.Manual : this.data.statusDetail === j.ThreeDsAwaitingChallenge;
    let y;
    if (l && (a == null ? void 0 : a.complete) !== !1)
      try {
        await this.api.completeChallenge(this.data.orderId, this.buildCompletionPayload(s, o));
      } catch (m) {
        y = m;
      }
    if ((a == null ? void 0 : a.poll) !== !1 && s.status === S.Success) {
      const {
        order: m,
        timedOut: b
      } = await this.api.pollOrderStatus(this.data.orderId, {
        ...a == null ? void 0 : a.polling,
        mode: n
      });
      d.order = m ?? void 0, d.timedOut = b;
    } else y && !d.error && (d.error = this.toError(y));
    return this.finish(d, a);
  }
  destroy() {
    this.provider && (this.provider.cleanup(), this.provider = null);
  }
  /** Mensagem amigável da falha do desafio (pt-BR). */
  deriveFailureReason(a) {
    var t;
    if (a.status !== S.Success)
      return a.status === S.Timeout ? "Tempo da autenticação 3DS esgotado" : ((t = a.error) == null ? void 0 : t.message) || "Falha na autenticação 3DS";
  }
  /**
   * Payload do `complete`. `failureReason` só vai quando é falha técnica
   * (sem `transStatus` do emissor nem cancelamento) — string vazia quebra o backend.
   */
  buildCompletionPayload(a, t) {
    const n = a.challengeCanceled === !0, r = a.transStatus;
    return {
      providerTransactionId: a.providerTransactionId ?? a.dsTransactionId,
      transStatus: r,
      challengeCanceled: n,
      failureReason: !!t && !r && !n ? t : void 0
    };
  }
  finish(a, t) {
    var n, r, i;
    return (n = t == null ? void 0 : t.onComplete) == null || n.call(t, a), a.failureReason && ((r = t == null ? void 0 : t.onError) == null || r.call(t, new Error(a.failureReason))), (a.status === S.Timeout || a.timedOut) && ((i = t == null ? void 0 : t.onTimeout) == null || i.call(t)), a;
  }
  toError(a) {
    return a instanceof Error ? a : new Error("Falha ao concluir a autenticação 3DS");
  }
}
function mt(e) {
  let a = null;
  return {
    authenticate: async (r) => {
      const i = new We(r);
      a = i;
      try {
        return await i.authenticate({
          onChallenge: e == null ? void 0 : e.onChallenge,
          onComplete: e == null ? void 0 : e.onComplete,
          onError: e == null ? void 0 : e.onError,
          onTimeout: e == null ? void 0 : e.onTimeout,
          complete: e == null ? void 0 : e.complete,
          poll: e == null ? void 0 : e.poll,
          polling: e == null ? void 0 : e.polling
        });
      } finally {
        i.destroy(), a = null;
      }
    },
    destroy: () => {
      a == null || a.destroy(), a = null;
    }
  };
}
class Je extends Error {
  constructor(a, t) {
    super(a), this.title = t, this.name = "PayConductorTokenizerApiError";
  }
}
class Xe {
  constructor(a) {
    this.publicKey = a;
  }
  async getSettings() {
    const a = await fetch(`${M}/card-tokenization/settings`, {
      method: "GET",
      headers: this.headers
    });
    return a.ok || await this.parseResponseError("Failed to fetch settings", a), await a.json();
  }
  async createToken(a) {
    const t = await fetch(`${M}/card-tokenization/tokenize`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(a)
    });
    return t.ok || await this.parseResponseError("Failed to generate token", t), await t.json();
  }
  async saveTokens(a, t, n) {
    const r = await fetch(`${M}/card-tokenization/save-tokens/${t}/${n}`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(a)
    });
    r.ok || await this.parseResponseError("Failed to save tokens", r);
  }
  async parseResponseError(a, t) {
    var r, i, s, d;
    let n = "";
    try {
      const o = await t.json();
      o != null && o.message ? n = o.message : (r = o == null ? void 0 : o.error) != null && r.message ? n = o.error : (s = (i = o == null ? void 0 : o.error) == null ? void 0 : i.value) != null && s.message ? n = o.error.value.message : (d = o == null ? void 0 : o.value) != null && d.message ? n = o.value.message : n = JSON.stringify(o);
    } catch {
    }
    throw new Je(n, a);
  }
  get headers() {
    return {
      Authorization: `Basic ${btoa(`${this.publicKey}:x`)}`,
      "Content-Type": "application/json"
    };
  }
}
class Ze {
  constructor(a) {
    this.input = a;
  }
}
class Qe extends Ze {
  constructor() {
    super(...arguments);
    P(this, "scriptUrl", "https://sdk.mercadopago.com/js/v2");
  }
  async tokenize() {
    const {
      publicKey: t
    } = this.input.setting;
    if (typeof t != "string" || !t.trim())
      throw new Error("MercadoPago public key is missing in settings");
    if (!this.input.customer.documentNumber)
      throw new Error("Customer document number is required for tokenization");
    const n = window.MercadoPago;
    if (!n) throw new Error("MercadoPago SDK not available");
    const r = new n(t.trim()), {
      expiration: i,
      cvv: s,
      number: d,
      holderName: o
    } = this.input.card, l = await r.createCardToken({
      cardExpirationMonth: String(i.month).padStart(2, "0"),
      cardExpirationYear: String(i.year),
      cardholderName: o,
      cardNumber: d,
      securityCode: s,
      identificationType: this.input.customer.documentType === X.Cpf ? "CPF" : "CNPJ",
      identificationNumber: this.input.customer.documentNumber
    }).catch((y) => {
      throw new Error(this.describeMercadoPagoError(y));
    });
    if ("id" in l && l.id) return l.id;
    throw new Error(this.describeMercadoPagoError(l));
  }
  describeMercadoPagoError(t) {
    if (typeof t == "string") return t;
    if (Array.isArray(t)) return t.map((n) => this.describeMercadoPagoError(n)).join("; ");
    if (typeof t == "object" && t !== null) {
      if ("cause" in t && Array.isArray(t.cause) && t.cause.length > 0)
        return this.describeMercadoPagoError(t.cause);
      if ("message" in t && typeof t.message == "string") return t.message;
      if ("description" in t && typeof t.description == "string") return t.description;
    }
    return "Failed to tokenize card";
  }
}
const et = {
  [T.MercadoPago]: Qe
};
class tt {
  constructor(a) {
    P(this, "api");
    this.publicKey = a, this.api = new Xe(this.publicKey);
  }
  async tokenizeCard(a) {
    this.validateCard(a);
    const {
      customerId: t,
      token: n
    } = await this.api.createToken({
      card: a.card,
      customer: a.customer,
      saveCard: !1
    }), {
      settings: r
    } = await this.api.getSettings(), s = (await Promise.all(r.map(async (d) => {
      const o = et[d.key];
      if (!o) return null;
      const l = new o({
        ...a,
        setting: d.settings
      });
      return await L(l.scriptUrl), {
        token: await l.tokenize(),
        integrationId: d.integrationId,
        providerKey: d.key
      };
    }))).filter((d) => d !== null);
    return s.length > 0 && await this.api.saveTokens(s, t, n), n;
  }
  validateCard(a) {
    const {
      number: t,
      cvv: n,
      expiration: r,
      holderName: i
    } = a.card;
    if (!t || !n || !(r != null && r.month) || !(r != null && r.year) || !i)
      throw new Error("Invalid card data");
  }
}
function ft(e) {
  const a = new tt(e.publicKey);
  return {
    tokenizeCard: async (n) => {
      var r, i;
      try {
        const s = await a.tokenizeCard(n);
        return (r = e.onSuccess) == null || r.call(e, s), s;
      } catch (s) {
        const d = s instanceof Error ? s : new Error("Tokenization failed");
        return (i = e.onError) == null || i.call(e, d), null;
      }
    }
  };
}
export {
  Se as ALLOWED_ORIGINS,
  me as CardBrand,
  j as ChargeStatusDetail,
  fe as CurrencyType,
  ye as DeviceType,
  X as DocumentType,
  st as ERROR_CODES,
  Ee as ErrorCode,
  we as IFRAME_BASE_URL,
  G as IFRAME_DEFAULT_HEIGHT_VALUE,
  v as IncomingMessage,
  ge as InputStyleKey,
  T as IntegrationProvider,
  k as OrganizationEnvironment,
  D as OutgoingMessage,
  w as POST_MESSAGES,
  dt as PayConductor,
  We as PayConductor3DSSDK,
  ct as PayConductorCheckoutElement,
  lt as PayConductorThreeDSElement,
  tt as PayConductorTokenizerSDK,
  ce as PaymentMethod,
  le as PaymentMethodLayout,
  R as PaymentStatus,
  be as REQUEST_TIMEOUT,
  M as SDK_API_BASE_URL,
  Pe as SKELETON_CSS,
  Y as SKELETON_STYLE_ID,
  H as ThreeDSMode,
  he as ThreeDSResultStatus,
  _ as ThreeDSTransStatus,
  S as ThreeDSecureResultStatus,
  ue as ThreeDsAuthenticationStatus,
  Ce as buildIframeUrl,
  dt as default,
  ot as defaultTheme,
  pe as generateRequestId,
  Ae as isValidOrigin,
  L as loadScript,
  ut as usePayConductor,
  ht as usePayconductorElement,
  mt as useThreeDS,
  ft as useTokenizer
};
//# sourceMappingURL=index.es.js.map
