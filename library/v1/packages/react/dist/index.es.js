var ie = Object.defineProperty;
var oe = (e, a, t) => a in e ? ie(e, a, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[a] = t;
var C = (e, a, t) => oe(e, typeof a != "symbol" ? a + "" : a, t);
import { jsx as k, jsxs as se } from "react/jsx-runtime";
import { useState as T, useEffect as K, useRef as de } from "react";
const Z = "https://app.payconductor.ai/api/v1", Q = "http://localhost:3000/api/v1", ee = "https://iframe.payconductor.ai/v1", te = "http://localhost:5175/v1", ce = 3e5, le = "600px";
var ue = /* @__PURE__ */ ((e) => (e.Pix = "Pix", e.CreditCard = "CreditCard", e.DebitCard = "DebitCard", e.BankSlip = "BankSlip", e.Crypto = "Crypto", e.ApplePay = "ApplePay", e.NuPay = "NuPay", e.PicPay = "PicPay", e.AmazonPay = "AmazonPay", e.SepaDebit = "SepaDebit", e.GooglePay = "GooglePay", e.Spei = "Spei", e))(ue || {}), he = /* @__PURE__ */ ((e) => (e.Ethereum = "ETH", e.Tron = "TRX", e.Polygon = "MATIC", e.Ton = "TON", e.Solana = "SOL", e.Bitcoin = "BTC", e.BinanceSmartChain = "BSC", e))(he || {}), me = /* @__PURE__ */ ((e) => (e.Grid = "Grid", e.Vertical = "Vertical", e.Horizontal = "Horizontal", e))(me || {}), _ = /* @__PURE__ */ ((e) => (e.Succeeded = "Succeeded", e.Pending = "Pending", e.Failed = "Failed", e))(_ || {}), j = /* @__PURE__ */ ((e) => (e.ThreeDsAwaitingChallenge = "ThreeDsAwaitingChallenge", e))(j || {}), fe = /* @__PURE__ */ ((e) => (e.Authenticated = "Authenticated", e.NotAuthenticated = "NotAuthenticated", e.NeedChallenge = "NeedChallenge", e))(fe || {}), ye = /* @__PURE__ */ ((e) => (e.Pending = "Pending", e.Authenticated = "Authenticated", e.Failed = "Failed", e.NotEnrolled = "NotEnrolled", e))(ye || {}), ae = /* @__PURE__ */ ((e) => (e.Cpf = "Cpf", e.Cnpj = "Cnpj", e.Ssn = "Ssn", e.Nif = "Nif", e.Dni = "Dni", e.Sin = "Sin", e.Nid = "Nid", e.Cf = "Cf", e.SteuerId = "SteuerId", e.Cic = "Cic", e.Id = "Id", e.Ci = "Ci", e.Passport = "Passport", e))(ae || {}), I = /* @__PURE__ */ ((e) => (e.Asaas = "Asaas", e.Sandbox = "Sandbox", e.SandboxSplit = "SandboxSplit", e.MercadoPago = "MercadoPago", e.NuPay = "NuPay", e.PicPay = "PicPay", e.Woovi = "Woovi", e.EfiBank = "EfiBank", e.BrasPag = "BrasPag", e.PagarMe = "PagarMe", e.PagarMeSplit = "PagarMeSplit", e.BancoDoBrasil = "BancoDoBrasil", e.PagSeguro = "PagSeguro", e.Ebanx = "Ebanx", e.OnlyUp = "OnlyUp", e.Barte = "Barte", e.BarteSplit = "BarteSplit", e.PagSmileA55 = "PagSmileA55", e.Avantti = "Avantti", e.MonsterGateway = "MonsterGateway", e.SAC = "SAC", e.Lyra = "Lyra", e))(I || {}), ge = /* @__PURE__ */ ((e) => (e.Visa = "Visa", e.Mastercard = "Mastercard", e.AmericanExpress = "AmericanExpress", e.DinersClub = "DinersClub", e.Discover = "Discover", e.JCB = "JCB", e.UnionPay = "UnionPay", e.Maestro = "Maestro", e.Mir = "Mir", e.Elo = "Elo", e.Hiper = "Hiper", e.Hipercard = "Hipercard", e.Verve = "Verve", e.Unknown = "Unknown", e))(ge || {}), N = /* @__PURE__ */ ((e) => (e.Production = "Production", e.Sandbox = "Sandbox", e))(N || {}), Ee = /* @__PURE__ */ ((e) => (e.USD = "USD", e.EUR = "EUR", e.BRL = "BRL", e.ARS = "ARS", e.CAD = "CAD", e.COP = "COP", e.GBP = "GBP", e.JPY = "JPY", e.MXN = "MXN", e.CLP = "CLP", e.PEN = "PEN", e.MZN = "MZN", e.CNY = "CNY", e.SAR = "SAR", e.ETH = "ETH", e.BNB = "BNB", e.BTC = "BTC", e.USDT = "USDT", e.USDC = "USDC", e.DOGE = "DOGE", e.SOL = "SOL", e))(Ee || {}), we = /* @__PURE__ */ ((e) => (e.Android = "Android", e.IOS = "Ios", e.Web = "Web", e.Chrome = "Chrome", e.Safari = "Safari", e))(we || {}), Se = /* @__PURE__ */ ((e) => (e.Padding = "Padding", e.Radius = "Radius", e.Color = "Color", e.Background = "Background", e.Shadow = "Shadow", e))(Se || {}), M = /* @__PURE__ */ ((e) => (e.Init = "Init", e.Config = "Config", e.Update = "Update", e.ConfirmPayment = "ConfirmPayment", e.Validate = "Validate", e.Reset = "Reset", e))(M || {}), v = /* @__PURE__ */ ((e) => (e.Ready = "Ready", e.Error = "Error", e.CheckoutSessionCreated = "CheckoutSessionCreated", e.PaymentComplete = "PaymentComplete", e.PaymentFailed = "PaymentFailed", e.PaymentPending = "PaymentPending", e.ValidationError = "ValidationError", e.PaymentMethodSelected = "PaymentMethodSelected", e.Resize = "Resize", e.ThreeDSChallenge = "ThreeDSChallenge", e.ThreeDSComplete = "ThreeDSComplete", e.ThreeDSFailed = "ThreeDSFailed", e))(v || {}), Pe = /* @__PURE__ */ ((e) => (e.InvalidClient = "InvalidClient", e.InvalidToken = "InvalidToken", e.NetworkError = "NetworkError", e.IframeNotReady = "IframeNotReady", e.PaymentDeclined = "PaymentDeclined", e.ValidationError = "ValidationError", e.Timeout = "Timeout", e))(Pe || {});
const ct = {
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
}, H = window.location.search.includes("development"), Ce = H ? te : ee, x = H ? `${Q}/sdk` : `${Z}/sdk`, be = H ? Q : Z, Ae = [te, ee], q = le, pe = ce, S = {
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
}, lt = {
  INVALID_CLIENT: "InvalidClient",
  INVALID_TOKEN: "InvalidToken",
  NETWORK_ERROR: "NetworkError",
  IFRAME_NOT_READY: "IframeNotReady",
  PAYMENT_DECLINED: "PaymentDeclined",
  VALIDATION_ERROR: "ValidationError",
  TIMEOUT: "Timeout"
}, V = "payconductor-skeleton-style", ve = `
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
function Ie(e) {
  const a = new URLSearchParams({
    publicKey: e.publicKey
  });
  return `${Ce}?${a.toString()}`;
}
function Te() {
  return crypto.randomUUID();
}
function Me(e, a) {
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
function D(e, a, t, n) {
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
    const s = Te();
    a.set(s, {
      resolve: r,
      reject: i
    }), e.contentWindow.postMessage({
      type: t,
      data: n,
      requestId: s
    }, "*"), setTimeout(() => {
      a != null && a.has(s) && (a.delete(s), i(new Error("Request timeout")));
    }, pe);
  });
}
function De(e, a, t) {
  return D(e, a, S.CONFIRM_PAYMENT, t);
}
async function _e(e, a, t) {
  return await De(e, a, {
    orderId: t.orderId
  });
}
function xe(e, a, t) {
  return D(e, a, S.VALIDATE, t);
}
function Re(e, a) {
  return D(e, a, S.RESET);
}
function Ne(e, a, t) {
  return D(e, a, S.CONFIG, t);
}
function Oe(e, a, t) {
  return D(e, a, S.INIT, t);
}
function ke(e, a, t, n, r, i, s, d, o, l, f, g) {
  const c = e.data, {
    requestId: u,
    type: w,
    data: E,
    error: A
  } = c;
  if (w === S.READY) {
    if (n == null || n(), u && (a != null && a.has(u))) {
      const {
        resolve: p
      } = a.get(u);
      a.delete(u), p(E);
    }
    return;
  }
  if (Me(e.origin, Ae)) {
    if (u && a && a.has(u)) {
      const {
        resolve: p,
        reject: U
      } = a.get(u);
      a.delete(u), A ? U(new Error(String(A.message))) : p(E);
      return;
    }
    if (w === S.ERROR) {
      t((A == null ? void 0 : A.message) || "Unknown error"), r == null || r(new Error(String(A == null ? void 0 : A.message)));
      return;
    }
    if (w === S.PAYMENT_COMPLETE) {
      E && typeof E == "object" && "status" in E && (i == null || i(E));
      return;
    }
    if (w === S.PAYMENT_FAILED) {
      E && typeof E == "object" && "status" in E && (s == null || s(E));
      return;
    }
    if (w === S.PAYMENT_PENDING) {
      E && typeof E == "object" && "status" in E && (d == null || d(E));
      return;
    }
    if (w === S.PAYMENT_METHOD_SELECTED) {
      E && typeof E == "object" && "paymentMethod" in E && (o == null || o(E.paymentMethod));
      return;
    }
    if (w !== S.RESIZE) {
      if (w === v.ThreeDSChallenge) {
        l == null || l();
        return;
      }
      if (w === v.ThreeDSComplete) {
        f == null || f();
        return;
      }
      if (w === v.ThreeDSFailed) {
        g == null || g();
        return;
      }
    }
  }
}
function ut(e) {
  const [a, t] = T(
    () => !1
  ), [n, r] = T(() => null), [i, s] = T(
    () => ""
  ), [d, o] = T(() => null);
  return K(() => {
    const l = (...m) => {
      e.debug && console.log("[PayConductor]", ...m);
    }, f = Ie({
      publicKey: e.publicKey
    });
    s(f), t(!0);
    const g = z();
    let c = !1;
    l("init", e.publicKey), l("iframeUrl", f);
    const u = () => {
      var b, h;
      const m = (h = (b = window.PayConductor) == null ? void 0 : b.frame) == null ? void 0 : h.iframe;
      if (m) {
        if (m instanceof HTMLIFrameElement) return m;
        if (typeof m == "object" && m !== null) {
          const y = m;
          if ("current" in y && y.current instanceof HTMLIFrameElement)
            return y.current;
          if ("value" in y && y.value instanceof HTMLIFrameElement)
            return y.value;
        }
        return m;
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
      set iframe(m) {
      },
      iframeUrl: f,
      error: null
    }, E = {
      publicKey: e.publicKey,
      theme: e.theme,
      locale: e.locale,
      paymentMethods: e.paymentMethods,
      defaultPaymentMethod: e.defaultPaymentMethod
    }, A = {
      confirmPayment: (m) => {
        var h;
        l("→ CONFIRM_PAYMENT", {
          orderId: m.orderId
        });
        const b = u();
        return b != null && b.contentWindow && b.contentWindow.postMessage(
          {
            type: S.CONFIG,
            data: {
              publicKey: e.publicKey,
              orderId: m.orderId,
              theme: e.theme,
              locale: e.locale,
              paymentMethods: e.paymentMethods,
              defaultPaymentMethod: e.defaultPaymentMethod,
              showPaymentButtons: e.showPaymentButtons,
              nuPayConfig: e.nuPayConfig
            }
          },
          "*"
        ), E.orderId = m.orderId, (h = window.PayConductor) != null && h.config && (window.PayConductor.config.orderId = m.orderId), _e(b, g, m);
      },
      validate: (m) => (l("→ VALIDATE", m), xe(u(), g, m)),
      reset: () => (l("→ RESET"), Re(u(), g)),
      getSelectedPaymentMethod: () => d
    };
    window.PayConductor = {
      frame: w,
      config: E,
      api: A,
      selectedPaymentMethod: d
    }, l("registered"), window.dispatchEvent(
      new CustomEvent("payconductor:registered", {
        detail: window.PayConductor
      })
    );
    const p = async () => {
      if (!c) {
        const m = u();
        if (!m) {
          l("→ CONFIG skipped: iframe not found");
          return;
        }
        c = !0, l("→ CONFIG", {
          theme: e.theme,
          locale: e.locale,
          paymentMethods: e.paymentMethods,
          defaultPaymentMethod: e.defaultPaymentMethod,
          showPaymentButtons: e.showPaymentButtons
        }), Ne(m, g, {
          theme: e.theme,
          locale: e.locale,
          paymentMethods: e.paymentMethods,
          defaultPaymentMethod: e.defaultPaymentMethod,
          showPaymentButtons: e.showPaymentButtons,
          nuPayConfig: e.nuPayConfig
        });
      }
    }, U = (m) => {
      var b;
      (b = m.data) != null && b.type && l("←", m.data.type, m.data.data ?? ""), ke(
        m,
        g,
        (h) => {
          var y;
          r(h), w.error = h, (y = window.PayConductor) != null && y.frame && (window.PayConductor.frame.error = h);
        },
        () => {
          var h;
          (h = e.onReady) == null || h.call(e), p();
        },
        (h) => {
          var y;
          (y = e.onError) == null || y.call(e, h);
        },
        (h) => {
          var y;
          (y = e.onPaymentComplete) == null || y.call(e, h);
        },
        (h) => {
          var y;
          (y = e.onPaymentFailed) == null || y.call(e, h);
        },
        (h) => {
          var y;
          (y = e.onPaymentPending) == null || y.call(e, h);
        },
        (h) => {
          var y;
          o(h), window.PayConductor && (window.PayConductor.selectedPaymentMethod = h), (y = e.onPaymentMethodSelected) == null || y.call(e, h);
        },
        () => {
          var h;
          (h = e.onThreeDSChallenge) == null || h.call(e);
        },
        () => {
          var h;
          (h = e.onThreeDSComplete) == null || h.call(e);
        },
        () => {
          var h;
          (h = e.onThreeDSFailed) == null || h.call(e);
        }
      );
    };
    window.addEventListener("message", U);
    const re = () => {
      var b, h, y;
      const m = u();
      if (!m) return !1;
      try {
        if ((((b = m.contentDocument) == null ? void 0 : b.readyState) ?? ((y = (h = m.contentWindow) == null ? void 0 : h.document) == null ? void 0 : y.readyState)) === "complete")
          return p(), !0;
      } catch {
      }
      return !1;
    }, G = () => {
      if (re()) return;
      const m = u();
      if (m) {
        m.addEventListener("load", () => p(), {
          once: !0
        });
        return;
      }
      setTimeout(G, 50);
    };
    G();
  }, []), /* @__PURE__ */ k(
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
function ht(e) {
  const a = de(null), [t, n] = T(() => ""), [r, i] = T(() => !1), [s, d] = T(() => "");
  return K(() => {
    if (typeof document < "u" && !document.getElementById(V)) {
      const c = document.createElement("style");
      c.id = V, c.textContent = ve, document.head.appendChild(c);
    }
    const o = (c) => {
      c != null && c.frame && (n(c.frame.iframeUrl || ""), i(!0), console.log("init", {
        PayConductor: window.PayConductor
      }));
    }, l = typeof window < "u" ? window.PayConductor : null;
    if (l)
      o(l);
    else {
      const c = (u) => {
        o(u.detail), window.removeEventListener("payconductor:registered", c);
      };
      window.addEventListener("payconductor:registered", c);
    }
    let f = !1;
    const g = (c) => {
      var u, w, E, A;
      if (((u = c.data) == null ? void 0 : u.type) === S.RESIZE && ((E = (w = c.data) == null ? void 0 : w.data) != null && E.height) && d(c.data.data.height + "px"), ((A = c.data) == null ? void 0 : A.type) === S.READY && e.height && !f) {
        f = !0;
        const p = document.querySelector(
          ".payconductor-element iframe"
        );
        p != null && p.contentWindow && p.contentWindow.postMessage(
          {
            type: S.CONFIG,
            data: {
              height: e.height
            },
            requestId: "element-height"
          },
          "*"
        );
      }
    };
    return window.addEventListener("message", g), () => window.removeEventListener("message", g);
  }, []), /* @__PURE__ */ se(
    "div",
    {
      className: "payconductor-element",
      style: {
        width: "100%"
      },
      children: [
        r ? null : /* @__PURE__ */ k(
          "div",
          {
            className: "payconductor-skeleton",
            style: {
              height: e.height || q
            }
          }
        ),
        r && t ? /* @__PURE__ */ k(
          "iframe",
          {
            allow: "payment",
            title: "PayConductor",
            ref: a,
            src: t,
            style: {
              width: "100%",
              height: e.height || s || q,
              border: "none"
            }
          }
        ) : null
      ]
    }
  );
}
function mt(e) {
  const [a, t] = T(() => !1);
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
  }, []), /* @__PURE__ */ k(
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
function ft() {
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
function yt() {
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
      return Oe(n || void 0, r, t);
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
      a(S.CONFIG, {
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
      a(S.CONFIG, {
        publicKey: n == null ? void 0 : n.publicKey,
        orderId: t,
        theme: n == null ? void 0 : n.theme,
        locale: n == null ? void 0 : n.locale,
        paymentMethods: n == null ? void 0 : n.paymentMethods
      });
    },
    update: (t) => {
      a(S.UPDATE, t);
    },
    submit: async () => {
      const t = F(e()), n = z();
      try {
        return await D(t || void 0, n, S.CONFIRM_PAYMENT, {}), {
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
var $ = /* @__PURE__ */ ((e) => (e.Auto = "Auto", e.Manual = "Manual", e.Agnostic = "Agnostic", e))($ || {}), P = /* @__PURE__ */ ((e) => (e.Success = "Success", e.Failed = "Failed", e.Timeout = "Timeout", e))(P || {}), R = /* @__PURE__ */ ((e) => (e.Authenticated = "Y", e.Attempted = "A", e.ChallengeRequired = "C", e.NotAuthenticated = "N", e.Unavailable = "U", e.Rejected = "R", e.InformationOnly = "I", e))(R || {});
class O {
  constructor(a, t) {
    C(this, "overlay", null);
    C(this, "modalContent", null);
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
const Le = 5 * 60 * 1e3;
class Ue extends O {
  constructor() {
    super(...arguments);
    C(this, "iframe", null);
    C(this, "messageListener", null);
    C(this, "timeoutId", null);
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
      this.iframe = document.createElement("iframe"), this.iframe.name = "payconductor-3ds-challenge", this.iframe.id = "payconductor-3ds-challenge", r.appendChild(this.iframe), this.messageListener = (f) => {
        var g;
        ((g = f.data) == null ? void 0 : g.status) === "COMPLETE" && (this.cleanup(), i({
          status: P.Success
        }));
      }, window.addEventListener("message", this.messageListener), this.timeoutId = setTimeout(() => {
        this.cleanup(), i({
          status: P.Timeout
        });
      }, this.options.timeoutMs ?? Le);
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
const Fe = "https://static.payzen.lat/static/js/authenticate-client/V1.0/kr-authenticate.umd.js", Be = 10 * 60 * 1e3;
class ze extends O {
  constructor() {
    super(...arguments);
    C(this, "timeoutId", null);
  }
  async authenticate() {
    const {
      operationUrl: t,
      publicKey: n
    } = this.data;
    if (!t || !n)
      return this.fail("Missing operationUrl or publicKey");
    try {
      await L(Fe);
    } catch {
      return this.fail("Failed to load 3DS SDK");
    }
    const r = window.KrAuthenticate;
    return r ? new Promise((i) => {
      this.timeoutId = setTimeout(() => {
        this.cleanup(), i({
          status: P.Timeout
        });
      }, this.options.timeoutMs ?? Be), new r(n).authenticate(t, () => {
        this.cleanup(), i({
          status: P.Success
        });
      });
    }) : this.fail("KrAuthenticate not available");
  }
  cleanup() {
    this.timeoutId && (clearTimeout(this.timeoutId), this.timeoutId = null);
  }
}
const Ke = {
  [N.Production]: "https://3ds-nx-js.stone.com.br/live/v2/3ds2.min.js",
  [N.Sandbox]: "https://3ds-nx-js.stone.com.br/test/v2/3ds2.min.js"
}, je = 5 * 60 * 1e3;
function Y(e) {
  return {
    country: e.country,
    state: e.state,
    city: e.city,
    zip_code: e.zipCode,
    line_1: `${e.number}, ${e.street}${e.district ? `, ${e.district}` : ""}`,
    line_2: e.complement ?? ""
  };
}
function He(e) {
  return e ? ["country", "state", "city", "zipCode", "number", "street", "district"].every((t) => {
    var n;
    return (n = e[t]) == null ? void 0 : n.trim();
  }) && /^[A-Za-z]{2}$/.test(e.country.trim()) : !1;
}
function $e() {
  const e = window.innerWidth;
  return e <= 480 ? "01" : e <= 768 ? "02" : e <= 1024 ? "03" : "04";
}
class W extends O {
  constructor() {
    super(...arguments);
    C(this, "timeoutId", null);
    C(this, "methodContainer", null);
  }
  async authenticate() {
    const {
      authToken: t,
      card: n
    } = this.data, {
      hasPhysicalItems: r,
      billingAddress: i
    } = this.data;
    if (r === !0 && !He(i))
      return this.fail("Incomplete delivery address for PagarMe 3DS");
    if (!t) return this.fail("Missing authToken for PagarMe 3DS");
    if (!n) return this.fail("Missing card data for PagarMe 3DS");
    const s = this.data.environment ?? N.Production;
    try {
      await L(Ke[s]);
    } catch {
      return this.fail("Failed to load Stone 3DS SDK");
    }
    const d = window.TDS;
    if (!d) return this.fail("Stone TDS SDK not available");
    const o = this.resolveContainer();
    return this.methodContainer = document.createElement("div"), this.methodContainer.style.display = "none", document.body.appendChild(this.methodContainer), new Promise((l) => {
      this.timeoutId = setTimeout(() => {
        this.cleanup(), l({
          status: P.Timeout
        });
      }, this.options.timeoutMs ?? je), d.init({
        token: t,
        tds_method_container_element: this.methodContainer,
        challenge_container_element: o,
        use_default_challenge_iframe_style: !0,
        challenge_window_size: $e()
      }, this.buildOrderData()).then((f) => {
        if (this.cleanup(), !(f != null && f.length)) {
          l(this.fail("PagarMe 3DS returned no response"));
          return;
        }
        const g = f[0], c = Object.values(R).find((w) => w === g.trans_status), u = {
          transStatus: c,
          providerTransactionId: g.tds_server_trans_id,
          challengeCanceled: g.challenge_canceled
        };
        if (g.challenge_canceled) {
          l(this.fail("3DS challenge canceled by user", u));
          return;
        }
        c === R.Authenticated || c === R.Attempted ? l({
          ...u,
          status: P.Success,
          dsTransactionId: g.tds_server_trans_id
        }) : l(this.fail(`3DS failed with status: ${g.trans_status}`, u));
      }).catch((f) => {
        this.cleanup(), l(this.fail(f instanceof Error ? f.message : "PagarMe 3DS failed"));
      });
    });
  }
  cleanup() {
    this.timeoutId && (clearTimeout(this.timeoutId), this.timeoutId = null), this.methodContainer && (this.methodContainer.remove(), this.methodContainer = null), this.closeModal();
  }
  buildOrderData() {
    var s;
    const {
      card: t,
      customer: n,
      billingAddress: r,
      hasPhysicalItems: i
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
            billing_address: r ? Y(r) : void 0
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
          ...(s = n.phones) != null && s.length ? {
            phones: Object.fromEntries(n.phones.map((d) => [d.type === "HOME" ? "home_phone" : "mobile_phone", {
              country_code: d.countryCode,
              area_code: d.areaCode,
              number: d.number
            }]))
          } : {}
        }
      } : {},
      ...i === !0 ? {
        shipping: {
          recipient_name: (n == null ? void 0 : n.name) || (t == null ? void 0 : t.holderName),
          electronic_delivery: !1,
          address: Y(r)
        }
      } : i === !1 ? {
        shipping: {
          recipient_name: (n == null ? void 0 : n.name) || (t == null ? void 0 : t.holderName),
          electronic_delivery: !0
        }
      } : {}
    };
  }
}
const Ge = "https://assets.pagseguro.com.br/checkout-sdk-js/rc/dist/browser/pagseguro.min.js";
class qe extends O {
  async authenticate() {
    var g;
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
    const d = this.data.environment === N.Sandbox ? "SANDBOX" : "PROD";
    try {
      await L(Ge);
    } catch {
      return this.fail("Failed to load PagSeguro SDK");
    }
    const o = window.PagSeguro;
    if (!o) return this.fail("PagSeguro SDK not available");
    o.setUp({
      session: a,
      env: d
    });
    const l = ((g = n.phones) == null ? void 0 : g.map((c) => ({
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
        status: P.Success,
        dsTransactionId: c.id
      } : c.status === "CHANGE_PAYMENT_METHOD" ? this.fail("PagSeguro requires a different payment method") : {
        status: P.Success,
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
const Ve = 5 * 60 * 1e3, J = "payconductor-3ds-sandbox-title";
class X extends O {
  constructor() {
    super(...arguments);
    C(this, "timeoutId", null);
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
          status: P.Timeout
        });
      }, this.options.timeoutMs ?? Ve), this.renderChallenge(n, {
        onConfirm: () => {
          this.cleanup(), r({
            status: P.Success,
            transStatus: R.Authenticated,
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
    r.setAttribute("role", "dialog"), r.setAttribute("aria-modal", "true"), r.setAttribute("aria-labelledby", J), r.style.cssText = "min-height:inherit;box-sizing:border-box;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:32px;font-family:system-ui,-apple-system,sans-serif;text-align:center;color:#111827";
    const i = document.createElement("h2");
    i.id = J, i.textContent = "Autenticação 3DS (sandbox)", i.style.cssText = "margin:0;font-size:20px";
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
const Ye = {
  // Agnostic providers
  [I.Lyra]: ze,
  // Acquirer-specific providers
  [I.MercadoPago]: Ue,
  [I.PagarMe]: W,
  [I.PagarMeSplit]: W,
  [I.PagSeguro]: qe,
  [I.Sandbox]: X,
  [I.SandboxSplit]: X
};
class ne extends Error {
  constructor(a, t) {
    super(a), this.title = t, this.name = "PayConductorThreeDSApiError";
  }
}
class We {
  constructor(a) {
    this.publicKey = a;
  }
  async completeChallenge(a, t) {
    const n = await fetch(`${x}/three-ds/complete/${a}`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(t)
    });
    n.ok || await this.parseResponseError("Falha ao concluir a autenticação 3DS", n);
  }
  async getOrderStatus(a) {
    const t = await fetch(`${be}/orders/${a}/status`, {
      method: "GET",
      headers: this.headers
    });
    return t.ok || await this.parseResponseError("Falha ao consultar o status do pedido", t), Xe(await t.json());
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
      if (i = await this.getOrderStatus(a), !(i.status === _.Pending && (i.statusDetail === j.ThreeDsAwaitingChallenge || r === $.Auto))) return {
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
    const t = await fetch(`${x}/three-ds/challenge/${a}`, {
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
    throw new ne(n, a);
  }
  get headers() {
    return {
      Authorization: `Basic ${btoa(`${this.publicKey}:x`)}`,
      "Content-Type": "application/json"
    };
  }
}
function Je(e) {
  switch (e) {
    case "Completed":
      return _.Succeeded;
    case "Pending":
    case "Generating":
      return _.Pending;
    default:
      return _.Failed;
  }
}
function Xe(e) {
  const a = e ?? {};
  return {
    ...a,
    orderId: a.id ?? "",
    status: Je(a.status),
    statusDetail: a.statusDetail ?? void 0,
    amount: a.amount ?? 0,
    currency: a.currency ?? "BRL",
    errorCode: a.errorCode ?? void 0,
    errorMessage: a.errorMessage ?? void 0,
    message: a.errorMessage ?? void 0
  };
}
class Ze {
  constructor(a) {
    C(this, "data");
    C(this, "provider", null);
    C(this, "api");
    this.data = a, this.api = new We(this.data.publicKey);
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
    return a.status && a.status !== "Pending" ? !1 : a.statusDetail === "ThreeDsAwaitingChallenge" || ((t = a.threeDSecure) == null ? void 0 : t.status) === "NeedChallenge" || ((r = (n = a.creditCard) == null ? void 0 : n.threeDSecure) == null ? void 0 : r.status) === "NeedChallenge";
  }
  /**
   * Executa o fluxo completo de 3DS: carrega os dados, resolve o provedor,
   * conduz o desafio, envia o `complete` (só no modo `Manual`) e faz o polling
   * do pedido. O integrador não precisa ramificar por modo.
   */
  async authenticate(a) {
    var c;
    try {
      const u = await this.api.getThreeDSecureData(this.data.orderId);
      this.data = {
        ...this.data,
        ...u
      };
    } catch (u) {
      if (u instanceof ne)
        return {
          status: P.Failed,
          error: u
        };
      throw u;
    }
    if (!this.needsChallenge)
      return {
        status: P.Success
      };
    const {
      acquirer: t,
      mode: n
    } = this.data;
    if (!t)
      return this.finish({
        status: P.Failed,
        error: new Error("Adquirente 3DS não informada na cobrança"),
        failureReason: "Adquirente 3DS não informada na cobrança"
      }, a);
    const r = Ye[t];
    if (!r) {
      const u = `Provedor 3DS não suportado: ${t}`;
      return this.finish({
        status: P.Failed,
        error: new Error(u),
        failureReason: u
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
    const l = n ? n === $.Manual : this.data.statusDetail === j.ThreeDsAwaitingChallenge;
    let f;
    if (l && (a == null ? void 0 : a.complete) !== !1)
      try {
        await this.api.completeChallenge(this.data.orderId, this.buildCompletionPayload(s, o));
      } catch (u) {
        f = u;
      }
    if ((a == null ? void 0 : a.poll) !== !1 && s.status === P.Success) {
      const {
        order: u,
        timedOut: w
      } = await this.api.pollOrderStatus(this.data.orderId, {
        ...a == null ? void 0 : a.polling,
        mode: n
      });
      d.order = u ?? void 0, d.timedOut = w;
    } else f && !d.error && (d.error = this.toError(f));
    return this.finish(d, a);
  }
  destroy() {
    this.provider && (this.provider.cleanup(), this.provider = null);
  }
  /** Mensagem amigável da falha do desafio (pt-BR). */
  deriveFailureReason(a) {
    var t;
    if (a.status !== P.Success)
      return a.status === P.Timeout ? "Tempo da autenticação 3DS esgotado" : ((t = a.error) == null ? void 0 : t.message) || "Falha na autenticação 3DS";
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
    return (n = t == null ? void 0 : t.onComplete) == null || n.call(t, a), a.failureReason && ((r = t == null ? void 0 : t.onError) == null || r.call(t, new Error(a.failureReason))), (a.status === P.Timeout || a.timedOut) && ((i = t == null ? void 0 : t.onTimeout) == null || i.call(t)), a;
  }
  toError(a) {
    return a instanceof Error ? a : new Error("Falha ao concluir a autenticação 3DS");
  }
}
function gt(e) {
  let a = null;
  return {
    authenticate: async (r) => {
      const i = new Ze(r);
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
class Qe extends Error {
  constructor(a, t) {
    super(a), this.title = t, this.name = "PayConductorTokenizerApiError";
  }
}
class et {
  constructor(a) {
    this.publicKey = a;
  }
  async getSettings() {
    const a = await fetch(`${x}/card-tokenization/settings`, {
      method: "GET",
      headers: this.headers
    });
    return a.ok || await this.parseResponseError("Failed to fetch settings", a), await a.json();
  }
  async createToken(a) {
    const t = await fetch(`${x}/card-tokenization/tokenize`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(a)
    });
    return t.ok || await this.parseResponseError("Failed to generate token", t), await t.json();
  }
  async saveTokens(a, t, n) {
    const r = await fetch(`${x}/card-tokenization/save-tokens/${t}/${n}`, {
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
    throw new Qe(n, a);
  }
  get headers() {
    return {
      Authorization: `Basic ${btoa(`${this.publicKey}:x`)}`,
      "Content-Type": "application/json"
    };
  }
}
class tt {
  constructor(a) {
    this.input = a;
  }
}
class at extends tt {
  constructor() {
    super(...arguments);
    C(this, "scriptUrl", "https://sdk.mercadopago.com/js/v2");
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
      identificationType: this.input.customer.documentType === ae.Cpf ? "CPF" : "CNPJ",
      identificationNumber: this.input.customer.documentNumber
    }).catch((f) => {
      throw new Error(this.describeMercadoPagoError(f));
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
const nt = {
  [I.MercadoPago]: at
};
class rt {
  constructor(a) {
    C(this, "api");
    this.publicKey = a, this.api = new et(this.publicKey);
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
      const o = nt[d.key];
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
function Et(e) {
  const a = new rt(e.publicKey);
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
  Ae as ALLOWED_ORIGINS,
  be as API_BASE_URL,
  ge as CardBrand,
  j as ChargeStatusDetail,
  he as CryptoNetwork,
  Ee as CurrencyType,
  we as DeviceType,
  ae as DocumentType,
  lt as ERROR_CODES,
  Pe as ErrorCode,
  Ce as IFRAME_BASE_URL,
  q as IFRAME_DEFAULT_HEIGHT_VALUE,
  v as IncomingMessage,
  Se as InputStyleKey,
  I as IntegrationProvider,
  N as OrganizationEnvironment,
  M as OutgoingMessage,
  S as POST_MESSAGES,
  ut as PayConductor,
  Ze as PayConductor3DSSDK,
  ht as PayConductorCheckoutElement,
  mt as PayConductorThreeDSElement,
  rt as PayConductorTokenizerSDK,
  ue as PaymentMethod,
  me as PaymentMethodLayout,
  _ as PaymentStatus,
  pe as REQUEST_TIMEOUT,
  x as SDK_API_BASE_URL,
  ve as SKELETON_CSS,
  V as SKELETON_STYLE_ID,
  $ as ThreeDSMode,
  ye as ThreeDSResultStatus,
  R as ThreeDSTransStatus,
  P as ThreeDSecureResultStatus,
  fe as ThreeDsAuthenticationStatus,
  Ie as buildIframeUrl,
  ut as default,
  ct as defaultTheme,
  Te as generateRequestId,
  Me as isValidOrigin,
  L as loadScript,
  ft as usePayConductor,
  yt as usePayconductorElement,
  gt as useThreeDS,
  Et as useTokenizer
};
//# sourceMappingURL=index.es.js.map
