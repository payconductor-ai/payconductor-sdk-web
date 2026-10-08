var X = Object.defineProperty;
var Z = (e, a, t) => a in e ? X(e, a, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[a] = t;
var b = (e, a, t) => Z(e, typeof a != "symbol" ? a + "" : a, t);
import { jsx as N, jsxs as Q } from "react/jsx-runtime";
import { useState as I, useEffect as z, useRef as ee } from "react";
const te = "https://app.payconductor.ai", ne = "http://localhost:3000", G = "https://iframe.payconductor.ai/v1", V = "http://localhost:5175/v1", ae = 3e5, ie = "600px";
var re = /* @__PURE__ */ ((e) => (e.Pix = "Pix", e.CreditCard = "CreditCard", e.DebitCard = "DebitCard", e.BankSlip = "BankSlip", e.Crypto = "Crypto", e.ApplePay = "ApplePay", e.NuPay = "NuPay", e.PicPay = "PicPay", e.AmazonPay = "AmazonPay", e.SepaDebit = "SepaDebit", e.GooglePay = "GooglePay", e))(re || {}), oe = /* @__PURE__ */ ((e) => (e.Grid = "grid", e.Vertical = "vertical", e.Horizontal = "horizontal", e))(oe || {}), se = /* @__PURE__ */ ((e) => (e.Succeeded = "succeeded", e.Pending = "pending", e.Failed = "failed", e))(se || {}), de = /* @__PURE__ */ ((e) => (e.ThreeDsAwaitingChallenge = "ThreeDsAwaitingChallenge", e))(de || {}), ce = /* @__PURE__ */ ((e) => (e.Authenticated = "Authenticated", e.NotAuthenticated = "NotAuthenticated", e.NeedChallenge = "NeedChallenge", e))(ce || {}), le = /* @__PURE__ */ ((e) => (e.Pending = "Pending", e.Authenticated = "Authenticated", e.Failed = "Failed", e.NotEnrolled = "NotEnrolled", e))(le || {}), q = /* @__PURE__ */ ((e) => (e.Cpf = "Cpf", e.Cnpj = "Cnpj", e))(q || {}), v = /* @__PURE__ */ ((e) => (e.Asaas = "Asaas", e.Sandbox = "Sandbox", e.SandboxSplit = "SandboxSplit", e.MercadoPago = "MercadoPago", e.NuPay = "NuPay", e.PicPay = "PicPay", e.Woovi = "Woovi", e.EfiBank = "EfiBank", e.BrasPag = "BrasPag", e.PagarMe = "PagarMe", e.BancoDoBrasil = "BancoDoBrasil", e.PagSeguro = "PagSeguro", e.Ebanx = "Ebanx", e.OnlyUp = "OnlyUp", e.Barte = "Barte", e.BarteSplit = "BarteSplit", e.PagSmileA55 = "PagSmileA55", e.Avantti = "Avantti", e.MonsterGateway = "MonsterGateway", e.SAC = "SAC", e.Lyra = "Lyra", e))(v || {}), ue = /* @__PURE__ */ ((e) => (e.Visa = "Visa", e.Mastercard = "Mastercard", e.AmericanExpress = "AmericanExpress", e.DinersClub = "DinersClub", e.Discover = "Discover", e.JCB = "JCB", e.UnionPay = "UnionPay", e.Maestro = "Maestro", e.Mir = "Mir", e.Elo = "Elo", e.Hiper = "Hiper", e.Hipercard = "Hipercard", e.Verve = "Verve", e.Unknown = "Unknown", e))(ue || {}), R = /* @__PURE__ */ ((e) => (e.Production = "Production", e.Sandbox = "Sandbox", e))(R || {}), he = /* @__PURE__ */ ((e) => (e.USD = "USD", e.EUR = "EUR", e.BRL = "BRL", e.ARS = "ARS", e.CAD = "CAD", e.COP = "COP", e.GBP = "GBP", e.JPY = "JPY", e.MXN = "MXN", e.MZN = "MZN", e.CNY = "CNY", e.SAR = "SAR", e.ETH = "ETH", e.BNB = "BNB", e.BTC = "BTC", e.USDT = "USDT", e.USDC = "USDC", e.DOGE = "DOGE", e.SOL = "SOL", e))(he || {}), me = /* @__PURE__ */ ((e) => (e.Android = "android", e.IOS = "ios", e.Web = "web", e.Chrome = "chrome", e.Safari = "safari", e))(me || {}), fe = /* @__PURE__ */ ((e) => (e.Padding = "padding", e.Radius = "radius", e.Color = "color", e.Background = "background", e.Shadow = "shadow", e))(fe || {}), M = /* @__PURE__ */ ((e) => (e.Init = "Init", e.Config = "Config", e.Update = "Update", e.ConfirmPayment = "ConfirmPayment", e.Validate = "Validate", e.Reset = "Reset", e))(M || {}), T = /* @__PURE__ */ ((e) => (e.Ready = "Ready", e.Error = "Error", e.CheckoutSessionCreated = "CheckoutSessionCreated", e.PaymentComplete = "PaymentComplete", e.PaymentFailed = "PaymentFailed", e.PaymentPending = "PaymentPending", e.ValidationError = "ValidationError", e.PaymentMethodSelected = "PaymentMethodSelected", e.Resize = "Resize", e.ThreeDSChallenge = "ThreeDSChallenge", e.ThreeDSComplete = "ThreeDSComplete", e.ThreeDSFailed = "ThreeDSFailed", e))(T || {}), ye = /* @__PURE__ */ ((e) => (e.InvalidClient = "InvalidClient", e.InvalidToken = "InvalidToken", e.NetworkError = "NetworkError", e.IframeNotReady = "IframeNotReady", e.PaymentDeclined = "PaymentDeclined", e.ValidationError = "ValidationError", e.Timeout = "Timeout", e))(ye || {});
const at = {
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
}, W = typeof window < "u" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") && !window.location.search.includes("production"), Ee = W ? V : G, _ = `${W ? ne : te}/api/v1/sdk`, ge = [V, G], j = ie, we = ae, p = {
  INIT: M.Init,
  CONFIG: M.Config,
  UPDATE: M.Update,
  CONFIRM_PAYMENT: M.ConfirmPayment,
  VALIDATE: M.Validate,
  RESET: M.Reset,
  READY: T.Ready,
  ERROR: T.Error,
  PAYMENT_COMPLETE: T.PaymentComplete,
  PAYMENT_FAILED: T.PaymentFailed,
  PAYMENT_PENDING: T.PaymentPending,
  VALIDATION_ERROR: T.ValidationError,
  PAYMENT_METHOD_SELECTED: T.PaymentMethodSelected,
  RESIZE: T.Resize
}, it = {
  INVALID_CLIENT: "InvalidClient",
  INVALID_TOKEN: "InvalidToken",
  NETWORK_ERROR: "NetworkError",
  IFRAME_NOT_READY: "IframeNotReady",
  PAYMENT_DECLINED: "PaymentDeclined",
  VALIDATION_ERROR: "ValidationError",
  TIMEOUT: "Timeout"
}, H = "payconductor-skeleton-style", pe = `
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
function be(e) {
  const a = new URLSearchParams({
    publicKey: e.publicKey
  });
  return `${Ee}?${a.toString()}`;
}
function Pe() {
  return crypto.randomUUID();
}
function Se(e, a) {
  return a.some((t) => {
    try {
      return new URL(t).origin === e;
    } catch {
      return t === e;
    }
  });
}
function B() {
  return /* @__PURE__ */ new Map();
}
function x(e, a, t, n) {
  return new Promise((i, r) => {
    if (!e || !("contentWindow" in e)) {
      r(new Error("Iframe not defined"));
      return;
    }
    if (!(e != null && e.contentWindow)) {
      r(new Error("Iframe not ready"));
      return;
    }
    if (!a) {
      r(new Error("Pending requests not initialized"));
      return;
    }
    const s = Pe();
    a.set(s, {
      resolve: i,
      reject: r
    }), e.contentWindow.postMessage({
      type: t,
      data: n,
      requestId: s
    }, "*"), setTimeout(() => {
      a != null && a.has(s) && (a.delete(s), r(new Error("Request timeout")));
    }, we);
  });
}
function Ce(e, a, t) {
  return x(e, a, p.CONFIRM_PAYMENT, t);
}
async function Ae(e, a, t) {
  return await Ce(e, a, {
    orderId: t.orderId
  });
}
function Te(e, a, t) {
  return x(e, a, p.VALIDATE, t);
}
function ve(e, a) {
  return x(e, a, p.RESET);
}
function Ie(e, a, t) {
  return x(e, a, p.CONFIG, t);
}
function Me(e, a, t) {
  return x(e, a, p.INIT, t);
}
function xe(e, a, t, n, i, r, s, d, o, c, w, E) {
  const m = e.data, {
    requestId: f,
    type: u,
    data: g,
    error: C
  } = m;
  if (u === p.READY) {
    if (n == null || n(), f && (a != null && a.has(f))) {
      const {
        resolve: A
      } = a.get(f);
      a.delete(f), A(g);
    }
    return;
  }
  if (Se(e.origin, ge)) {
    if (f && a && a.has(f)) {
      const {
        resolve: A,
        reject: O
      } = a.get(f);
      a.delete(f), C ? O(new Error(String(C.message))) : A(g);
      return;
    }
    if (u === p.ERROR) {
      t((C == null ? void 0 : C.message) || "Unknown error"), i == null || i(new Error(String(C == null ? void 0 : C.message)));
      return;
    }
    if (u === p.PAYMENT_COMPLETE) {
      g && typeof g == "object" && "status" in g && (r == null || r(g));
      return;
    }
    if (u === p.PAYMENT_FAILED) {
      g && typeof g == "object" && "status" in g && (s == null || s(g));
      return;
    }
    if (u === p.PAYMENT_PENDING) {
      g && typeof g == "object" && "status" in g && (d == null || d(g));
      return;
    }
    if (u === p.PAYMENT_METHOD_SELECTED) {
      g && typeof g == "object" && "paymentMethod" in g && (o == null || o(g.paymentMethod));
      return;
    }
    if (u !== p.RESIZE) {
      if (u === T.ThreeDSChallenge) {
        c == null || c();
        return;
      }
      if (u === T.ThreeDSComplete) {
        w == null || w();
        return;
      }
      if (u === T.ThreeDSFailed) {
        E == null || E();
        return;
      }
    }
  }
}
function rt(e) {
  const [a, t] = I(
    () => !1
  ), [n, i] = I(() => null), [r, s] = I(
    () => ""
  ), [d, o] = I(() => null);
  return z(() => {
    const c = (...h) => {
      e.debug && console.log("[PayConductor]", ...h);
    }, w = be({
      publicKey: e.publicKey
    });
    s(w), t(!0);
    const E = B();
    let m = !1;
    c("init", e.publicKey), c("iframeUrl", w);
    const f = () => {
      var S, l;
      const h = (l = (S = window.PayConductor) == null ? void 0 : S.frame) == null ? void 0 : l.iframe;
      if (h) {
        if (h instanceof HTMLIFrameElement) return h;
        if (typeof h == "object" && h !== null) {
          const y = h;
          if ("current" in y && y.current instanceof HTMLIFrameElement)
            return y.current;
          if ("value" in y && y.value instanceof HTMLIFrameElement)
            return y.value;
        }
        return h;
      }
      return document.querySelector(
        ".payconductor-element iframe"
      ) ?? void 0;
    }, u = {
      get iframe() {
        return document.querySelector(
          ".payconductor-element iframe"
        ) ?? null;
      },
      set iframe(h) {
      },
      iframeUrl: w,
      error: null
    }, g = {
      publicKey: e.publicKey,
      theme: e.theme,
      locale: e.locale,
      paymentMethods: e.paymentMethods,
      defaultPaymentMethod: e.defaultPaymentMethod
    }, C = {
      confirmPayment: (h) => {
        var l;
        c("→ CONFIRM_PAYMENT", {
          orderId: h.orderId
        });
        const S = f();
        return S != null && S.contentWindow && S.contentWindow.postMessage(
          {
            type: p.CONFIG,
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
        ), g.orderId = h.orderId, (l = window.PayConductor) != null && l.config && (window.PayConductor.config.orderId = h.orderId), Ae(S, E, h);
      },
      validate: (h) => (c("→ VALIDATE", h), Te(f(), E, h)),
      reset: () => (c("→ RESET"), ve(f(), E)),
      getSelectedPaymentMethod: () => d
    };
    window.PayConductor = {
      frame: u,
      config: g,
      api: C,
      selectedPaymentMethod: d
    }, c("registered"), window.dispatchEvent(
      new CustomEvent("payconductor:registered", {
        detail: window.PayConductor
      })
    );
    const A = async () => {
      if (!m) {
        const h = f();
        if (!h) {
          c("→ CONFIG skipped: iframe not found");
          return;
        }
        m = !0, c("→ CONFIG", {
          theme: e.theme,
          locale: e.locale,
          paymentMethods: e.paymentMethods,
          defaultPaymentMethod: e.defaultPaymentMethod,
          showPaymentButtons: e.showPaymentButtons
        }), Ie(h, E, {
          theme: e.theme,
          locale: e.locale,
          paymentMethods: e.paymentMethods,
          defaultPaymentMethod: e.defaultPaymentMethod,
          showPaymentButtons: e.showPaymentButtons,
          nuPayConfig: e.nuPayConfig
        });
      }
    }, O = (h) => {
      var S;
      (S = h.data) != null && S.type && c("←", h.data.type, h.data.data ?? ""), xe(
        h,
        E,
        (l) => {
          var y;
          i(l), u.error = l, (y = window.PayConductor) != null && y.frame && (window.PayConductor.frame.error = l);
        },
        () => {
          var l;
          (l = e.onReady) == null || l.call(e), A();
        },
        (l) => {
          var y;
          (y = e.onError) == null || y.call(e, l);
        },
        (l) => {
          var y;
          (y = e.onPaymentComplete) == null || y.call(e, l);
        },
        (l) => {
          var y;
          (y = e.onPaymentFailed) == null || y.call(e, l);
        },
        (l) => {
          var y;
          (y = e.onPaymentPending) == null || y.call(e, l);
        },
        (l) => {
          var y;
          o(l), window.PayConductor && (window.PayConductor.selectedPaymentMethod = l), (y = e.onPaymentMethodSelected) == null || y.call(e, l);
        },
        () => {
          var l;
          (l = e.onThreeDSChallenge) == null || l.call(e);
        },
        () => {
          var l;
          (l = e.onThreeDSComplete) == null || l.call(e);
        },
        () => {
          var l;
          (l = e.onThreeDSFailed) == null || l.call(e);
        }
      );
    };
    window.addEventListener("message", O);
    const J = () => {
      var S, l, y;
      const h = f();
      if (!h) return !1;
      try {
        if ((((S = h.contentDocument) == null ? void 0 : S.readyState) ?? ((y = (l = h.contentWindow) == null ? void 0 : l.document) == null ? void 0 : y.readyState)) === "complete")
          return A(), !0;
      } catch {
      }
      return !1;
    }, K = () => {
      if (J()) return;
      const h = f();
      if (h) {
        h.addEventListener("load", () => A(), {
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
function ot(e) {
  const a = ee(null), [t, n] = I(() => ""), [i, r] = I(() => !1), [s, d] = I(() => "");
  return z(() => {
    if (typeof document < "u" && !document.getElementById(H)) {
      const m = document.createElement("style");
      m.id = H, m.textContent = pe, document.head.appendChild(m);
    }
    const o = (m) => {
      m != null && m.frame && (n(m.frame.iframeUrl || ""), r(!0), console.log("init", {
        PayConductor: window.PayConductor
      }));
    }, c = typeof window < "u" ? window.PayConductor : null;
    if (c)
      o(c);
    else {
      const m = (f) => {
        o(f.detail), window.removeEventListener("payconductor:registered", m);
      };
      window.addEventListener("payconductor:registered", m);
    }
    let w = !1;
    const E = (m) => {
      var f, u, g, C;
      if (((f = m.data) == null ? void 0 : f.type) === p.RESIZE && ((g = (u = m.data) == null ? void 0 : u.data) != null && g.height) && d(m.data.data.height + "px"), ((C = m.data) == null ? void 0 : C.type) === p.READY && e.height && !w) {
        w = !0;
        const A = document.querySelector(
          ".payconductor-element iframe"
        );
        A != null && A.contentWindow && A.contentWindow.postMessage(
          {
            type: p.CONFIG,
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
  }, []), /* @__PURE__ */ Q(
    "div",
    {
      className: "payconductor-element",
      style: {
        width: "100%"
      },
      children: [
        i ? null : /* @__PURE__ */ N(
          "div",
          {
            className: "payconductor-skeleton",
            style: {
              height: e.height || j
            }
          }
        ),
        i && t ? /* @__PURE__ */ N(
          "iframe",
          {
            allow: "payment",
            title: "PayConductor",
            ref: a,
            src: t,
            style: {
              width: "100%",
              height: e.height || s || j,
              border: "none"
            }
          }
        ) : null
      ]
    }
  );
}
function st(e) {
  const [a, t] = I(() => !1);
  return z(() => {
    const n = () => {
      t(!0);
    }, i = () => {
      t(!1);
    };
    return window.addEventListener("payconductor:3ds:show", n), window.addEventListener("payconductor:3ds:hide", i), typeof window < "u" && (window.PayConductor3DS = {
      container: () => document.getElementById("payconductor-3ds-container"),
      show: n,
      hide: i
    }, window.dispatchEvent(new CustomEvent("payconductor:3ds:registered"))), () => {
      window.removeEventListener("payconductor:3ds:show", n), window.removeEventListener("payconductor:3ds:hide", i), window.PayConductor3DS = null;
    };
  }, []), /* @__PURE__ */ N(
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
function dt() {
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
function U(e) {
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
function ct() {
  const e = () => typeof window < "u" ? window.PayConductor : null, a = (t, n) => {
    const i = e();
    if (!i) return;
    const r = U(i);
    r != null && r.contentWindow && r.contentWindow.postMessage({
      type: t,
      data: n
    }, "*");
  };
  return {
    init: async (t) => {
      const n = U(e()), i = B();
      return Me(n || void 0, i, t);
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
      var i;
      const n = (i = e()) == null ? void 0 : i.config;
      a(p.CONFIG, {
        publicKey: n == null ? void 0 : n.publicKey,
        orderId: n == null ? void 0 : n.orderId,
        theme: t.theme ?? (n == null ? void 0 : n.theme),
        locale: t.locale ?? (n == null ? void 0 : n.locale),
        paymentMethods: t.paymentMethods ?? (n == null ? void 0 : n.paymentMethods)
      });
    },
    updateOrderId: (t) => {
      var i;
      const n = (i = e()) == null ? void 0 : i.config;
      a(p.CONFIG, {
        publicKey: n == null ? void 0 : n.publicKey,
        orderId: t,
        theme: n == null ? void 0 : n.theme,
        locale: n == null ? void 0 : n.locale,
        paymentMethods: n == null ? void 0 : n.paymentMethods
      });
    },
    update: (t) => {
      a(p.UPDATE, t);
    },
    submit: async () => {
      const t = U(e()), n = B();
      try {
        return await x(t || void 0, n, p.CONFIRM_PAYMENT, {}), {
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
var P = /* @__PURE__ */ ((e) => (e.Success = "Success", e.Failed = "Failed", e.Timeout = "Timeout", e))(P || {}), D = /* @__PURE__ */ ((e) => (e.Authenticated = "Y", e.Attempted = "A", e.ChallengeRequired = "C", e.NotAuthenticated = "N", e.Unavailable = "U", e.Rejected = "R", e.InformationOnly = "I", e))(D || {});
class k {
  constructor(a, t) {
    b(this, "overlay", null);
    b(this, "modalContent", null);
    this.data = a, this.options = t;
  }
  /** Os SDKs de 3DS dos provedores (Pagar.me, PagSeguro) esperam o valor em centavos. */
  get amountInCents() {
    return this.data.amount === void 0 ? void 0 : Math.round(this.data.amount * 100);
  }
  fail(a, t = {}) {
    var i, r;
    const n = new Error(a);
    return (r = (i = this.options).onError) == null || r.call(i, n), {
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
class De extends k {
  constructor() {
    super(...arguments);
    b(this, "iframe", null);
    b(this, "messageListener", null);
    b(this, "timeoutId", null);
  }
  async authenticate() {
    const {
      threeDsUrl: t,
      creq: n
    } = this.data;
    if (!t || !n)
      return this.fail("Missing threeDsUrl or creq");
    const i = this.resolveContainer();
    return new Promise((r) => {
      var c;
      this.iframe = document.createElement("iframe"), this.iframe.name = "payconductor-3ds-challenge", this.iframe.id = "payconductor-3ds-challenge", i.appendChild(this.iframe), this.messageListener = (w) => {
        var E, m, f;
        ((E = w.data) == null ? void 0 : E.status) === "COMPLETE" && (this.cleanup(), (f = (m = this.options).onComplete) == null || f.call(m), r({
          status: P.Success
        }));
      }, window.addEventListener("message", this.messageListener), this.timeoutId = setTimeout(() => {
        var w, E;
        this.cleanup(), (E = (w = this.options).onTimeout) == null || E.call(w), r({
          status: P.Timeout
        });
      }, this.options.timeoutMs ?? _e);
      const s = (c = this.iframe.contentWindow) == null ? void 0 : c.document;
      if (!s) {
        this.cleanup(), r(this.fail("Cannot access iframe document"));
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
const F = /* @__PURE__ */ new Map();
function L(e) {
  const a = F.get(e);
  if (a) return a;
  const t = new Promise((n, i) => {
    if (document.querySelector(`script[src="${e}"]`)) {
      n();
      return;
    }
    const r = document.createElement("script");
    r.src = e, r.async = !0, r.onload = () => n(), r.onerror = () => {
      F.delete(e), i(new Error(`Failed to load script: ${e}`));
    }, (document.head || document.body).appendChild(r);
  });
  return F.set(e, t), t;
}
const Re = "https://static.payzen.lat/static/js/authenticate-client/V1.0/kr-authenticate.umd.js", ke = 10 * 60 * 1e3;
class Ne extends k {
  constructor() {
    super(...arguments);
    b(this, "timeoutId", null);
  }
  async authenticate() {
    const {
      operationUrl: t,
      publicKey: n
    } = this.data;
    if (!t || !n)
      return this.fail("Missing operationUrl or publicKey");
    try {
      await L(Re);
    } catch {
      return this.fail("Failed to load 3DS SDK");
    }
    const i = window.KrAuthenticate;
    return i ? new Promise((r) => {
      this.timeoutId = setTimeout(() => {
        var d, o;
        this.cleanup(), (o = (d = this.options).onTimeout) == null || o.call(d), r({
          status: P.Timeout
        });
      }, this.options.timeoutMs ?? ke), new i(n).authenticate(t, () => {
        var d, o;
        this.cleanup(), (o = (d = this.options).onComplete) == null || o.call(d), r({
          status: P.Success
        });
      });
    }) : this.fail("KrAuthenticate not available");
  }
  cleanup() {
    this.timeoutId && (clearTimeout(this.timeoutId), this.timeoutId = null);
  }
}
const Le = {
  [R.Production]: "https://3ds-nx-js.stone.com.br/live/v2/3ds2.min.js",
  [R.Sandbox]: "https://3ds-nx-js.stone.com.br/test/v2/3ds2.min.js"
}, Oe = 5 * 60 * 1e3;
function Ue() {
  const e = window.innerWidth;
  return e <= 480 ? "01" : e <= 768 ? "02" : e <= 1024 ? "03" : "04";
}
class Fe extends k {
  constructor() {
    super(...arguments);
    b(this, "timeoutId", null);
    b(this, "methodContainer", null);
  }
  async authenticate() {
    const {
      authToken: t,
      card: n
    } = this.data;
    if (!t) return this.fail("Missing authToken for PagarMe 3DS");
    if (!n) return this.fail("Missing card data for PagarMe 3DS");
    const i = this.data.environment ?? R.Production;
    try {
      await L(Le[i]);
    } catch {
      return this.fail("Failed to load Stone 3DS SDK");
    }
    const r = window.TDS;
    if (!r) return this.fail("Stone TDS SDK not available");
    const s = this.resolveContainer();
    return this.methodContainer = document.createElement("div"), this.methodContainer.style.display = "none", document.body.appendChild(this.methodContainer), new Promise((d) => {
      this.timeoutId = setTimeout(() => {
        var o, c;
        this.cleanup(), (c = (o = this.options).onTimeout) == null || c.call(o), d({
          status: P.Timeout
        });
      }, this.options.timeoutMs ?? Oe), r.init({
        token: t,
        tds_method_container_element: this.methodContainer,
        challenge_container_element: s,
        use_default_challenge_iframe_style: !0,
        challenge_window_size: Ue()
      }, this.buildOrderData()).then((o) => {
        var m, f;
        if (this.cleanup(), !(o != null && o.length)) {
          d(this.fail("PagarMe 3DS returned no response"));
          return;
        }
        const c = o[0], w = Object.values(D).find((u) => u === c.trans_status), E = {
          transStatus: w,
          providerTransactionId: c.tds_server_trans_id,
          challengeCanceled: c.challenge_canceled
        };
        if (c.challenge_canceled) {
          d(this.fail("3DS challenge canceled by user", E));
          return;
        }
        w === D.Authenticated || w === D.Attempted ? ((f = (m = this.options).onComplete) == null || f.call(m), d({
          ...E,
          status: P.Success,
          dsTransactionId: c.tds_server_trans_id
        })) : d(this.fail(`3DS failed with status: ${c.trans_status}`, E));
      }).catch((o) => {
        this.cleanup(), d(this.fail(o instanceof Error ? o.message : "PagarMe 3DS failed"));
      });
    });
  }
  cleanup() {
    this.timeoutId && (clearTimeout(this.timeoutId), this.timeoutId = null), this.methodContainer && (this.methodContainer.remove(), this.methodContainer = null), this.closeModal();
  }
  buildOrderData() {
    var r;
    const {
      card: t,
      customer: n,
      billingAddress: i
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
            billing_address: i ? {
              country: i.country,
              state: i.state,
              city: i.city,
              zip_code: i.zipCode,
              line_1: `${i.number}, ${i.street}${i.district ? `, ${i.district}` : ""}`,
              line_2: i.complement ?? ""
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
          ...(r = n.phones) != null && r.length ? {
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
const Be = "https://assets.pagseguro.com.br/checkout-sdk-js/rc/dist/browser/pagseguro.min.js";
class ze extends k {
  async authenticate() {
    var E, m, f;
    const {
      authToken: a,
      card: t,
      customer: n,
      currency: i,
      billingAddress: r
    } = this.data, s = this.amountInCents;
    if (!a) return this.fail("Missing authToken (session) for PagSeguro 3DS");
    if (!t) return this.fail("Missing card data for PagSeguro 3DS");
    if (!n) return this.fail("Missing customer data for PagSeguro 3DS");
    if (!s) return this.fail("Missing amount for PagSeguro 3DS");
    if (!r) return this.fail("Missing billingAddress for PagSeguro 3DS");
    const d = this.data.environment === R.Sandbox ? "SANDBOX" : "PROD";
    try {
      await L(Be);
    } catch {
      return this.fail("Failed to load PagSeguro SDK");
    }
    const o = window.PagSeguro;
    if (!o) return this.fail("PagSeguro SDK not available");
    o.setUp({
      session: a,
      env: d
    });
    const c = ((E = n.phones) == null ? void 0 : E.map((u) => ({
      country: u.countryCode,
      area: u.areaCode,
      number: u.number,
      type: u.type ?? "MOBILE"
    }))) ?? [{
      country: "55",
      area: "11",
      number: "999999999",
      type: "MOBILE"
    }];
    c.some((u) => u.type === "MOBILE") || (c[0].type = "MOBILE");
    try {
      const u = await o.authenticate3DS({
        data: {
          customer: {
            name: n.name,
            email: n.email,
            phones: c
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
            value: s,
            currency: i ?? "BRL"
          },
          billingAddress: {
            street: r.street,
            number: r.number,
            complement: r.complement,
            regionCode: r.state,
            country: r.country.length === 2 ? this.toAlpha3(r.country) : r.country,
            city: r.city,
            postalCode: r.zipCode.replace(/\D/g, "")
          },
          dataOnly: !1
        }
      });
      return u.status === "AUTH_FLOW_COMPLETED" || u.status === "AUTH_NOT_SUPPORTED" ? ((f = (m = this.options).onComplete) == null || f.call(m), {
        status: P.Success,
        dsTransactionId: u.id
      }) : u.status === "CHANGE_PAYMENT_METHOD" ? this.fail("PagSeguro requires a different payment method") : {
        status: P.Success,
        dsTransactionId: u.id
      };
    } catch (u) {
      return this.fail(u instanceof Error ? u.message : "PagSeguro 3DS failed");
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
const Ke = 5 * 60 * 1e3, Y = "payconductor-3ds-sandbox-title";
class $ extends k {
  constructor() {
    super(...arguments);
    b(this, "timeoutId", null);
  }
  async authenticate() {
    const {
      authToken: t
    } = this.data;
    if (!t) return this.fail("Missing authToken for 3DS challenge");
    const n = this.resolveContainer();
    return new Promise((i) => {
      this.timeoutId = setTimeout(() => {
        var r, s;
        this.cleanup(), (s = (r = this.options).onTimeout) == null || s.call(r), i({
          status: P.Timeout
        });
      }, this.options.timeoutMs ?? Ke), this.renderChallenge(n, {
        onConfirm: () => {
          var r, s;
          this.cleanup(), (s = (r = this.options).onComplete) == null || s.call(r), i({
            status: P.Success,
            transStatus: D.Authenticated,
            providerTransactionId: t
          });
        },
        onCancel: () => {
          this.cleanup(), i(this.fail("3DS challenge canceled by user", {
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
    const i = document.createElement("div");
    i.setAttribute("role", "dialog"), i.setAttribute("aria-modal", "true"), i.setAttribute("aria-labelledby", Y), i.style.cssText = "min-height:inherit;box-sizing:border-box;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:32px;font-family:system-ui,-apple-system,sans-serif;text-align:center;color:#111827";
    const r = document.createElement("h2");
    r.id = Y, r.textContent = "Autenticação 3DS (sandbox)", r.style.cssText = "margin:0;font-size:20px";
    const s = document.createElement("p");
    s.textContent = "Simulação do desafio do banco emissor. Confirme para aprovar a autenticação ou cancele para simular a desistência do comprador.", s.style.cssText = "margin:0 0 8px;max-width:360px;font-size:14px;line-height:1.5;color:#4b5563";
    const d = this.createButton("Confirmar autenticação", "background:#111827;color:#fff;border-color:#111827", n.onConfirm), o = this.createButton("Cancelar", "background:#fff;color:#111827;border-color:#d1d5db", n.onCancel);
    i.append(r, s, d, o), t.appendChild(i), d.focus();
  }
  createButton(t, n, i) {
    const r = document.createElement("button");
    return r.type = "button", r.textContent = t, r.style.cssText = `width:100%;max-width:320px;padding:12px 16px;border:1px solid;border-radius:6px;font:inherit;font-size:14px;font-weight:600;cursor:pointer;${n}`, r.addEventListener("click", i), r;
  }
}
const je = {
  // Agnostic providers
  [v.Lyra]: Ne,
  // Acquirer-specific providers
  [v.MercadoPago]: De,
  [v.PagarMe]: Fe,
  [v.PagSeguro]: ze,
  [v.Sandbox]: $,
  [v.SandboxSplit]: $
};
class He extends Error {
  constructor(a, t) {
    super(a), this.title = t, this.name = "PayConductorThreeDSApiError";
  }
}
class Ye {
  constructor(a) {
    this.publicKey = a;
  }
  async completeManualChallenge(a, t) {
    const n = await fetch(`${_}/three-ds/complete/${a}`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        providerTransactionId: t
      })
    });
    n.ok || await this.parseResponseError("Failed to complete native 3DS challenge", n);
  }
  async getThreeDSecureData(a) {
    const t = await fetch(`${_}/three-ds/challenge/${a}`, {
      method: "GET",
      headers: this.headers
    });
    t.ok || await this.parseResponseError("Failed to fetch 3DS data", t);
    const n = await t.json();
    return Object.fromEntries(Object.entries(n.threeDSecure).filter(([, i]) => i != null));
  }
  async parseResponseError(a, t) {
    var i, r, s, d;
    let n = "";
    try {
      const o = await t.json();
      o != null && o.message ? n = o.message : (i = o == null ? void 0 : o.error) != null && i.message ? n = o.error : (s = (r = o == null ? void 0 : o.error) == null ? void 0 : r.value) != null && s.message ? n = o.error.value.message : (d = o == null ? void 0 : o.value) != null && d.message ? n = o.value.message : n = JSON.stringify(o);
    } catch {
    }
    throw new He(n, a);
  }
  get headers() {
    return {
      Authorization: `Basic ${btoa(`${this.publicKey}:x`)}`,
      "Content-Type": "application/json"
    };
  }
}
const $e = [v.PagSeguro];
class Ge {
  constructor(a) {
    b(this, "data");
    b(this, "provider", null);
    b(this, "api");
    this.data = a, this.api = new Ye(this.data.publicKey);
  }
  get needsChallenge() {
    return this.data.status === "NeedChallenge" || this.data.statusDetail === "ThreeDsAwaitingChallenge";
  }
  get acquirer() {
    return this.data.acquirer;
  }
  async authenticate(a) {
    var d;
    const t = await this.api.getThreeDSecureData(this.data.orderId);
    if (this.data = {
      ...this.data,
      ...t
    }, !this.needsChallenge)
      return {
        status: P.Success
      };
    const {
      acquirer: n
    } = this.data;
    if (!n)
      return {
        status: P.Failed,
        error: new Error("Missing 3DS acquirer")
      };
    const i = je[n];
    if (!i)
      return {
        status: P.Failed,
        error: new Error(`Unsupported 3DS provider: ${n}`)
      };
    (d = a == null ? void 0 : a.onChallenge) == null || d.call(a);
    const r = {
      ...a,
      threeDSecure: this.data
    };
    this.provider = new i(this.data, r);
    const s = await this.provider.authenticate();
    return s.status === P.Success && s.dsTransactionId && $e.includes(n) && await this.api.completeManualChallenge(this.data.orderId, s.dsTransactionId), s;
  }
  destroy() {
    this.provider && (this.provider.cleanup(), this.provider = null);
  }
}
function lt(e) {
  let a = null;
  return {
    handleChallenge: async (i) => {
      const r = new Ge(i);
      a = r;
      try {
        return await r.authenticate({
          onChallenge: e == null ? void 0 : e.onChallenge,
          onComplete: e == null ? void 0 : e.onComplete,
          onError: e == null ? void 0 : e.onError,
          onTimeout: e == null ? void 0 : e.onTimeout
        });
      } finally {
        r.destroy(), a = null;
      }
    },
    destroy: () => {
      a == null || a.destroy(), a = null;
    }
  };
}
class Ve extends Error {
  constructor(a, t) {
    super(a), this.title = t, this.name = "PayConductorTokenizerApiError";
  }
}
class qe {
  constructor(a) {
    this.publicKey = a;
  }
  async getSettings() {
    const a = await fetch(`${_}/card-tokenization/settings`, {
      method: "GET",
      headers: this.headers
    });
    return a.ok || await this.parseResponseError("Failed to fetch settings", a), await a.json();
  }
  async createToken(a) {
    const t = await fetch(`${_}/card-tokenization/tokenize`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(a)
    });
    return t.ok || await this.parseResponseError("Failed to generate token", t), await t.json();
  }
  async saveTokens(a, t, n) {
    const i = await fetch(`${_}/card-tokenization/save-tokens/${t}/${n}`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(a)
    });
    i.ok || await this.parseResponseError("Failed to save tokens", i);
  }
  async parseResponseError(a, t) {
    var i, r, s, d;
    let n = "";
    try {
      const o = await t.json();
      o != null && o.message ? n = o.message : (i = o == null ? void 0 : o.error) != null && i.message ? n = o.error : (s = (r = o == null ? void 0 : o.error) == null ? void 0 : r.value) != null && s.message ? n = o.error.value.message : (d = o == null ? void 0 : o.value) != null && d.message ? n = o.value.message : n = JSON.stringify(o);
    } catch {
    }
    throw new Ve(n, a);
  }
  get headers() {
    return {
      Authorization: `Basic ${btoa(`${this.publicKey}:x`)}`,
      "Content-Type": "application/json"
    };
  }
}
class We {
  constructor(a) {
    this.input = a;
  }
}
class Je extends We {
  constructor() {
    super(...arguments);
    b(this, "scriptUrl", "https://sdk.mercadopago.com/js/v2");
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
    const i = new n(t.trim()), {
      expiration: r,
      cvv: s,
      number: d,
      holderName: o
    } = this.input.card, c = await i.createCardToken({
      cardExpirationMonth: String(r.month).padStart(2, "0"),
      cardExpirationYear: String(r.year),
      cardholderName: o,
      cardNumber: d,
      securityCode: s,
      identificationType: this.input.customer.documentType === q.Cpf ? "CPF" : "CNPJ",
      identificationNumber: this.input.customer.documentNumber
    }).catch((w) => {
      throw new Error(this.describeMercadoPagoError(w));
    });
    if ("id" in c && c.id) return c.id;
    throw new Error(this.describeMercadoPagoError(c));
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
const Xe = {
  [v.MercadoPago]: Je
};
class Ze {
  constructor(a) {
    b(this, "api");
    this.publicKey = a, this.api = new qe(this.publicKey);
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
      settings: i
    } = await this.api.getSettings(), s = (await Promise.all(i.map(async (d) => {
      const o = Xe[d.key];
      if (!o) return null;
      const c = new o({
        ...a,
        setting: d.settings
      });
      return await L(c.scriptUrl), {
        token: await c.tokenize(),
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
      expiration: i,
      holderName: r
    } = a.card;
    if (!t || !n || !(i != null && i.month) || !(i != null && i.year) || !r)
      throw new Error("Invalid card data");
  }
}
function ut(e) {
  const a = new Ze(e.publicKey);
  return {
    tokenizeCard: async (n) => {
      var i, r;
      try {
        const s = await a.tokenizeCard(n);
        return (i = e.onSuccess) == null || i.call(e, s), s;
      } catch (s) {
        const d = s instanceof Error ? s : new Error("Tokenization failed");
        return (r = e.onError) == null || r.call(e, d), null;
      }
    }
  };
}
export {
  ge as ALLOWED_ORIGINS,
  ue as CardBrand,
  de as ChargeStatusDetail,
  he as CurrencyType,
  me as DeviceType,
  q as DocumentType,
  it as ERROR_CODES,
  ye as ErrorCode,
  Ee as IFRAME_BASE_URL,
  j as IFRAME_DEFAULT_HEIGHT_VALUE,
  T as IncomingMessage,
  fe as InputStyleKey,
  v as IntegrationProvider,
  R as OrganizationEnvironment,
  M as OutgoingMessage,
  p as POST_MESSAGES,
  rt as PayConductor,
  Ge as PayConductor3DSSDK,
  ot as PayConductorCheckoutElement,
  st as PayConductorThreeDSElement,
  Ze as PayConductorTokenizerSDK,
  re as PaymentMethod,
  oe as PaymentMethodLayout,
  se as PaymentStatus,
  we as REQUEST_TIMEOUT,
  _ as SDK_API_BASE_URL,
  pe as SKELETON_CSS,
  H as SKELETON_STYLE_ID,
  le as ThreeDSResultStatus,
  D as ThreeDSTransStatus,
  P as ThreeDSecureResultStatus,
  ce as ThreeDsAuthenticationStatus,
  be as buildIframeUrl,
  rt as default,
  at as defaultTheme,
  Pe as generateRequestId,
  Se as isValidOrigin,
  L as loadScript,
  dt as usePayConductor,
  ct as usePayconductorElement,
  lt as useThreeDS,
  ut as useTokenizer
};
//# sourceMappingURL=index.es.js.map
