var fe = Object.defineProperty;
var ye = (e, t, n) => t in e ? fe(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var f = (e, t, n) => ye(e, typeof t != "symbol" ? t + "" : t, n);
import { jsx as j, jsxs as ge } from "react/jsx-runtime";
import { useState as R, useEffect as Y, useRef as Ee } from "react";
const se = "https://app.payconductor.ai/api/v1", oe = "http://localhost:3000/api/v1", ce = "https://iframe.payconductor.ai/v1", de = "http://localhost:5175/v1", we = 3e5, Se = "600px";
var be = /* @__PURE__ */ ((e) => (e.Pix = "Pix", e.CreditCard = "CreditCard", e.DebitCard = "DebitCard", e.BankSlip = "BankSlip", e.Crypto = "Crypto", e.ApplePay = "ApplePay", e.NuPay = "NuPay", e.PicPay = "PicPay", e.AmazonPay = "AmazonPay", e.SepaDebit = "SepaDebit", e.GooglePay = "GooglePay", e.Spei = "Spei", e))(be || {}), pe = /* @__PURE__ */ ((e) => (e.Ethereum = "ETH", e.Tron = "TRX", e.Polygon = "MATIC", e.Ton = "TON", e.Solana = "SOL", e.Bitcoin = "BTC", e.BinanceSmartChain = "BSC", e))(pe || {}), Pe = /* @__PURE__ */ ((e) => (e.Grid = "Grid", e.Vertical = "Vertical", e.Horizontal = "Horizontal", e))(Pe || {}), k = /* @__PURE__ */ ((e) => (e.Succeeded = "Succeeded", e.Pending = "Pending", e.Failed = "Failed", e))(k || {}), G = /* @__PURE__ */ ((e) => (e.ThreeDsAwaitingChallenge = "ThreeDsAwaitingChallenge", e))(G || {}), Ce = /* @__PURE__ */ ((e) => (e.Authenticated = "Authenticated", e.NotAuthenticated = "NotAuthenticated", e.NeedChallenge = "NeedChallenge", e))(Ce || {}), Ie = /* @__PURE__ */ ((e) => (e.Pending = "Pending", e.Authenticated = "Authenticated", e.Failed = "Failed", e.NotEnrolled = "NotEnrolled", e))(Ie || {}), le = /* @__PURE__ */ ((e) => (e.Cpf = "Cpf", e.Cnpj = "Cnpj", e.Ssn = "Ssn", e.Nif = "Nif", e.Dni = "Dni", e.Sin = "Sin", e.Nid = "Nid", e.Cf = "Cf", e.SteuerId = "SteuerId", e.Cic = "Cic", e.Id = "Id", e.Ci = "Ci", e.Passport = "Passport", e))(le || {}), A = /* @__PURE__ */ ((e) => (e.Asaas = "Asaas", e.Sandbox = "Sandbox", e.SandboxSplit = "SandboxSplit", e.MercadoPago = "MercadoPago", e.NuPay = "NuPay", e.PicPay = "PicPay", e.Woovi = "Woovi", e.EfiBank = "EfiBank", e.BrasPag = "BrasPag", e.PagarMe = "PagarMe", e.PagarMeSplit = "PagarMeSplit", e.BancoDoBrasil = "BancoDoBrasil", e.PagSeguro = "PagSeguro", e.Ebanx = "Ebanx", e.OnlyUp = "OnlyUp", e.Barte = "Barte", e.BarteSplit = "BarteSplit", e.PagSmileA55 = "PagSmileA55", e.Avantti = "Avantti", e.MonsterGateway = "MonsterGateway", e.SAC = "SAC", e.Lyra = "Lyra", e))(A || {}), ve = /* @__PURE__ */ ((e) => (e.Visa = "Visa", e.Mastercard = "Mastercard", e.AmericanExpress = "AmericanExpress", e.DinersClub = "DinersClub", e.Discover = "Discover", e.JCB = "JCB", e.UnionPay = "UnionPay", e.Maestro = "Maestro", e.Mir = "Mir", e.Elo = "Elo", e.Hiper = "Hiper", e.Hipercard = "Hipercard", e.Verve = "Verve", e.Unknown = "Unknown", e))(ve || {}), N = /* @__PURE__ */ ((e) => (e.Production = "Production", e.Sandbox = "Sandbox", e))(N || {}), Te = /* @__PURE__ */ ((e) => (e.USD = "USD", e.EUR = "EUR", e.BRL = "BRL", e.ARS = "ARS", e.CAD = "CAD", e.COP = "COP", e.GBP = "GBP", e.JPY = "JPY", e.MXN = "MXN", e.CLP = "CLP", e.PEN = "PEN", e.MZN = "MZN", e.CNY = "CNY", e.SAR = "SAR", e.ETH = "ETH", e.BNB = "BNB", e.BTC = "BTC", e.USDT = "USDT", e.USDC = "USDC", e.DOGE = "DOGE", e.SOL = "SOL", e))(Te || {}), Ae = /* @__PURE__ */ ((e) => (e.Android = "Android", e.IOS = "Ios", e.Web = "Web", e.Chrome = "Chrome", e.Safari = "Safari", e))(Ae || {}), Re = /* @__PURE__ */ ((e) => (e.Padding = "Padding", e.Radius = "Radius", e.Color = "Color", e.Background = "Background", e.Shadow = "Shadow", e))(Re || {}), _ = /* @__PURE__ */ ((e) => (e.Init = "Init", e.Config = "Config", e.Update = "Update", e.ConfirmPayment = "ConfirmPayment", e.Validate = "Validate", e.Reset = "Reset", e))(_ || {}), T = /* @__PURE__ */ ((e) => (e.Ready = "Ready", e.Error = "Error", e.CheckoutSessionCreated = "CheckoutSessionCreated", e.PaymentComplete = "PaymentComplete", e.PaymentFailed = "PaymentFailed", e.PaymentPending = "PaymentPending", e.ValidationError = "ValidationError", e.PaymentMethodSelected = "PaymentMethodSelected", e.Resize = "Resize", e.ThreeDSChallenge = "ThreeDSChallenge", e.ThreeDSComplete = "ThreeDSComplete", e.ThreeDSFailed = "ThreeDSFailed", e))(T || {}), _e = /* @__PURE__ */ ((e) => (e.InvalidClient = "InvalidClient", e.InvalidToken = "InvalidToken", e.NetworkError = "NetworkError", e.IframeNotReady = "IframeNotReady", e.PaymentDeclined = "PaymentDeclined", e.ValidationError = "ValidationError", e.Timeout = "Timeout", e))(_e || {});
const Ct = {
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
}, q = window.location.search.includes("development"), Me = q ? de : ce, x = q ? `${oe}/sdk` : `${se}/sdk`, Oe = q ? oe : se, ke = [de, ce], X = Se, xe = we, b = {
  INIT: _.Init,
  CONFIG: _.Config,
  UPDATE: _.Update,
  CONFIRM_PAYMENT: _.ConfirmPayment,
  VALIDATE: _.Validate,
  RESET: _.Reset,
  READY: T.Ready,
  ERROR: T.Error,
  PAYMENT_COMPLETE: T.PaymentComplete,
  PAYMENT_FAILED: T.PaymentFailed,
  PAYMENT_PENDING: T.PaymentPending,
  VALIDATION_ERROR: T.ValidationError,
  PAYMENT_METHOD_SELECTED: T.PaymentMethodSelected,
  RESIZE: T.Resize
}, It = {
  INVALID_CLIENT: "InvalidClient",
  INVALID_TOKEN: "InvalidToken",
  NETWORK_ERROR: "NetworkError",
  IFRAME_NOT_READY: "IframeNotReady",
  PAYMENT_DECLINED: "PaymentDeclined",
  VALIDATION_ERROR: "ValidationError",
  TIMEOUT: "Timeout"
}, Z = "payconductor-skeleton-style", De = `
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
function Le(e) {
  const t = new URLSearchParams({
    publicKey: e.publicKey
  });
  return `${Me}?${t.toString()}`;
}
function Ne() {
  return crypto.randomUUID();
}
function Ue(e, t) {
  return t.some((n) => {
    try {
      return new URL(n).origin === e;
    } catch {
      return n === e;
    }
  });
}
function K() {
  return /* @__PURE__ */ new Map();
}
function O(e, t, n, a) {
  return new Promise((i, r) => {
    if (!e || !("contentWindow" in e)) {
      r(new Error("Iframe not defined"));
      return;
    }
    if (!(e != null && e.contentWindow)) {
      r(new Error("Iframe not ready"));
      return;
    }
    if (!t) {
      r(new Error("Pending requests not initialized"));
      return;
    }
    const o = Ne();
    t.set(o, {
      resolve: i,
      reject: r
    }), e.contentWindow.postMessage({
      type: n,
      data: a,
      requestId: o
    }, "*"), setTimeout(() => {
      t != null && t.has(o) && (t.delete(o), r(new Error("Request timeout")));
    }, xe);
  });
}
function Fe(e, t, n) {
  return O(e, t, b.CONFIRM_PAYMENT, n);
}
async function Be(e, t, n) {
  return await Fe(e, t, {
    orderId: n.orderId
  });
}
function je(e, t, n) {
  return O(e, t, b.VALIDATE, n);
}
function ze(e, t) {
  return O(e, t, b.RESET);
}
function He(e, t, n) {
  return O(e, t, b.CONFIG, n);
}
function $e(e, t, n) {
  return O(e, t, b.INIT, n);
}
function Ke(e, t, n, a, i, r, o, c, s, l, y, g) {
  const d = e.data, {
    requestId: u,
    type: S,
    data: w,
    error: I
  } = d;
  if (S === b.READY) {
    if (a == null || a(), u && (t != null && t.has(u))) {
      const {
        resolve: v
      } = t.get(u);
      t.delete(u), v(w);
    }
    return;
  }
  if (Ue(e.origin, ke)) {
    if (u && t && t.has(u)) {
      const {
        resolve: v,
        reject: z
      } = t.get(u);
      t.delete(u), I ? z(new Error(String(I.message))) : v(w);
      return;
    }
    if (S === b.ERROR) {
      n((I == null ? void 0 : I.message) || "Unknown error"), i == null || i(new Error(String(I == null ? void 0 : I.message)));
      return;
    }
    if (S === b.PAYMENT_COMPLETE) {
      w && typeof w == "object" && "status" in w && (r == null || r(w));
      return;
    }
    if (S === b.PAYMENT_FAILED) {
      w && typeof w == "object" && "status" in w && (o == null || o(w));
      return;
    }
    if (S === b.PAYMENT_PENDING) {
      w && typeof w == "object" && "status" in w && (c == null || c(w));
      return;
    }
    if (S === b.PAYMENT_METHOD_SELECTED) {
      w && typeof w == "object" && "paymentMethod" in w && (s == null || s(w.paymentMethod));
      return;
    }
    if (S !== b.RESIZE) {
      if (S === T.ThreeDSChallenge) {
        l == null || l();
        return;
      }
      if (S === T.ThreeDSComplete) {
        y == null || y();
        return;
      }
      if (S === T.ThreeDSFailed) {
        g == null || g();
        return;
      }
    }
  }
}
function vt(e) {
  const [t, n] = R(
    () => !1
  ), [a, i] = R(() => null), [r, o] = R(
    () => ""
  ), [c, s] = R(() => null);
  return Y(() => {
    const l = (...m) => {
      e.debug && console.log("[PayConductor]", ...m);
    }, y = Le({
      publicKey: e.publicKey
    });
    o(y), n(!0);
    const g = K();
    let d = !1;
    l("init", e.publicKey), l("iframeUrl", y);
    const u = () => {
      var C, h;
      const m = (h = (C = window.PayConductor) == null ? void 0 : C.frame) == null ? void 0 : h.iframe;
      if (m) {
        if (m instanceof HTMLIFrameElement) return m;
        if (typeof m == "object" && m !== null) {
          const E = m;
          if ("current" in E && E.current instanceof HTMLIFrameElement)
            return E.current;
          if ("value" in E && E.value instanceof HTMLIFrameElement)
            return E.value;
        }
        return m;
      }
      return document.querySelector(
        ".payconductor-element iframe"
      ) ?? void 0;
    }, S = {
      get iframe() {
        return document.querySelector(
          ".payconductor-element iframe"
        ) ?? null;
      },
      set iframe(m) {
      },
      iframeUrl: y,
      error: null
    }, w = {
      publicKey: e.publicKey,
      theme: e.theme,
      locale: e.locale,
      paymentMethods: e.paymentMethods,
      defaultPaymentMethod: e.defaultPaymentMethod
    }, I = {
      confirmPayment: (m) => {
        var h;
        l("→ CONFIRM_PAYMENT", {
          orderId: m.orderId
        });
        const C = u();
        return C != null && C.contentWindow && C.contentWindow.postMessage(
          {
            type: b.CONFIG,
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
        ), w.orderId = m.orderId, (h = window.PayConductor) != null && h.config && (window.PayConductor.config.orderId = m.orderId), Be(C, g, m);
      },
      validate: (m) => (l("→ VALIDATE", m), je(u(), g, m)),
      reset: () => (l("→ RESET"), ze(u(), g)),
      getSelectedPaymentMethod: () => c
    };
    window.PayConductor = {
      frame: S,
      config: w,
      api: I,
      selectedPaymentMethod: c
    }, l("registered"), window.dispatchEvent(
      new CustomEvent("payconductor:registered", {
        detail: window.PayConductor
      })
    );
    const v = async () => {
      if (!d) {
        const m = u();
        if (!m) {
          l("→ CONFIG skipped: iframe not found");
          return;
        }
        d = !0, l("→ CONFIG", {
          theme: e.theme,
          locale: e.locale,
          paymentMethods: e.paymentMethods,
          defaultPaymentMethod: e.defaultPaymentMethod,
          showPaymentButtons: e.showPaymentButtons
        }), He(m, g, {
          theme: e.theme,
          locale: e.locale,
          paymentMethods: e.paymentMethods,
          defaultPaymentMethod: e.defaultPaymentMethod,
          showPaymentButtons: e.showPaymentButtons,
          nuPayConfig: e.nuPayConfig
        });
      }
    }, z = (m) => {
      var C;
      (C = m.data) != null && C.type && l("←", m.data.type, m.data.data ?? ""), Ke(
        m,
        g,
        (h) => {
          var E;
          i(h), S.error = h, (E = window.PayConductor) != null && E.frame && (window.PayConductor.frame.error = h);
        },
        () => {
          var h;
          (h = e.onReady) == null || h.call(e), v();
        },
        (h) => {
          var E;
          (E = e.onError) == null || E.call(e, h);
        },
        (h) => {
          var E;
          (E = e.onPaymentComplete) == null || E.call(e, h);
        },
        (h) => {
          var E;
          (E = e.onPaymentFailed) == null || E.call(e, h);
        },
        (h) => {
          var E;
          (E = e.onPaymentPending) == null || E.call(e, h);
        },
        (h) => {
          var E;
          s(h), window.PayConductor && (window.PayConductor.selectedPaymentMethod = h), (E = e.onPaymentMethodSelected) == null || E.call(e, h);
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
    window.addEventListener("message", z);
    const me = () => {
      var C, h, E;
      const m = u();
      if (!m) return !1;
      try {
        if ((((C = m.contentDocument) == null ? void 0 : C.readyState) ?? ((E = (h = m.contentWindow) == null ? void 0 : h.document) == null ? void 0 : E.readyState)) === "complete")
          return v(), !0;
      } catch {
      }
      return !1;
    }, J = () => {
      if (me()) return;
      const m = u();
      if (m) {
        m.addEventListener("load", () => v(), {
          once: !0
        });
        return;
      }
      setTimeout(J, 50);
    };
    J();
  }, []), /* @__PURE__ */ j(
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
function Tt(e) {
  const t = Ee(null), [n, a] = R(() => ""), [i, r] = R(() => !1), [o, c] = R(() => "");
  return Y(() => {
    if (typeof document < "u" && !document.getElementById(Z)) {
      const d = document.createElement("style");
      d.id = Z, d.textContent = De, document.head.appendChild(d);
    }
    const s = (d) => {
      d != null && d.frame && (a(d.frame.iframeUrl || ""), r(!0), console.log("init", {
        PayConductor: window.PayConductor
      }));
    }, l = typeof window < "u" ? window.PayConductor : null;
    if (l)
      s(l);
    else {
      const d = (u) => {
        s(u.detail), window.removeEventListener("payconductor:registered", d);
      };
      window.addEventListener("payconductor:registered", d);
    }
    let y = !1;
    const g = (d) => {
      var u, S, w, I;
      if (((u = d.data) == null ? void 0 : u.type) === b.RESIZE && ((w = (S = d.data) == null ? void 0 : S.data) != null && w.height) && c(d.data.data.height + "px"), ((I = d.data) == null ? void 0 : I.type) === b.READY && e.height && !y) {
        y = !0;
        const v = document.querySelector(
          ".payconductor-element iframe"
        );
        v != null && v.contentWindow && v.contentWindow.postMessage(
          {
            type: b.CONFIG,
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
  }, []), /* @__PURE__ */ ge(
    "div",
    {
      className: "payconductor-element",
      style: {
        width: "100%"
      },
      children: [
        i ? null : /* @__PURE__ */ j(
          "div",
          {
            className: "payconductor-skeleton",
            style: {
              height: e.height || X
            }
          }
        ),
        i && n ? /* @__PURE__ */ j(
          "iframe",
          {
            allow: "payment",
            title: "PayConductor",
            ref: t,
            src: n,
            style: {
              width: "100%",
              height: e.height || o || X,
              border: "none"
            }
          }
        ) : null
      ]
    }
  );
}
function At(e) {
  const [t, n] = R(() => !1);
  return Y(() => {
    const a = () => {
      n(!0);
    }, i = () => {
      n(!1);
    };
    return window.addEventListener("payconductor:3ds:show", a), window.addEventListener("payconductor:3ds:hide", i), typeof window < "u" && (window.PayConductor3DS = {
      container: () => document.getElementById("payconductor-3ds-container"),
      show: a,
      hide: i
    }, window.dispatchEvent(new CustomEvent("payconductor:3ds:registered"))), () => {
      window.removeEventListener("payconductor:3ds:show", a), window.removeEventListener("payconductor:3ds:hide", i), window.PayConductor3DS = null;
    };
  }, []), /* @__PURE__ */ j(
    "div",
    {
      className: "payconductor-three-ds",
      id: "payconductor-3ds-container",
      style: {
        width: "100%",
        display: t ? "block" : "none",
        minHeight: t ? e.height || "600px" : "0"
      }
    }
  );
}
function Rt() {
  const e = typeof window < "u" ? window.PayConductor : null, t = e != null && e.config ? {
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
    ...t,
    ...n
  };
}
function H(e) {
  var t;
  if ((t = e == null ? void 0 : e.frame) != null && t.iframe) {
    const n = e.frame.iframe;
    if (n instanceof HTMLIFrameElement) return n;
    if (n && typeof n == "object") {
      if ("current" in n) {
        const a = n.current;
        if (a instanceof HTMLIFrameElement) return a;
      }
      if ("value" in n) {
        const a = n.value;
        if (a instanceof HTMLIFrameElement) return a;
      }
    }
  }
  return document.querySelector(".payconductor-element iframe") ?? null;
}
function _t() {
  const e = () => typeof window < "u" ? window.PayConductor : null, t = (n, a) => {
    const i = e();
    if (!i) return;
    const r = H(i);
    r != null && r.contentWindow && r.contentWindow.postMessage({
      type: n,
      data: a
    }, "*");
  };
  return {
    init: async (n) => {
      const a = H(e()), i = K();
      return $e(a || void 0, i, n);
    },
    confirmPayment: async (n) => {
      if (!n.orderId)
        throw new Error("Order ID is required");
      const a = e();
      if (!(a != null && a.api)) throw new Error("PayConductor not initialized");
      return a.api.confirmPayment(n);
    },
    validate: (n) => {
      const a = e();
      return a ? a.api.validate(n) : Promise.resolve(!1);
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
      var i;
      const a = (i = e()) == null ? void 0 : i.config;
      t(b.CONFIG, {
        publicKey: a == null ? void 0 : a.publicKey,
        orderId: a == null ? void 0 : a.orderId,
        theme: n.theme ?? (a == null ? void 0 : a.theme),
        locale: n.locale ?? (a == null ? void 0 : a.locale),
        paymentMethods: n.paymentMethods ?? (a == null ? void 0 : a.paymentMethods)
      });
    },
    updateOrderId: (n) => {
      var i;
      const a = (i = e()) == null ? void 0 : i.config;
      t(b.CONFIG, {
        publicKey: a == null ? void 0 : a.publicKey,
        orderId: n,
        theme: a == null ? void 0 : a.theme,
        locale: a == null ? void 0 : a.locale,
        paymentMethods: a == null ? void 0 : a.paymentMethods
      });
    },
    update: (n) => {
      t(b.UPDATE, n);
    },
    submit: async () => {
      const n = H(e()), a = K();
      try {
        return await O(n || void 0, a, b.CONFIRM_PAYMENT, {}), {
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
var W = /* @__PURE__ */ ((e) => (e.Auto = "Auto", e.Manual = "Manual", e.Agnostic = "Agnostic", e))(W || {}), P = /* @__PURE__ */ ((e) => (e.Success = "Success", e.Failed = "Failed", e.Timeout = "Timeout", e))(P || {}), D = /* @__PURE__ */ ((e) => (e.Authenticated = "Y", e.Attempted = "A", e.ChallengeRequired = "C", e.NotAuthenticated = "N", e.Unavailable = "U", e.Rejected = "R", e.InformationOnly = "I", e))(D || {});
class U {
  constructor(t, n) {
    f(this, "overlay", null);
    f(this, "modalContent", null);
    this.data = t, this.options = n;
  }
  /** Os SDKs de 3DS dos provedores (Pagar.me, PagSeguro) esperam o valor em centavos. */
  get amountInCents() {
    return this.data.amount === void 0 ? void 0 : Math.round(this.data.amount * 100);
  }
  fail(t, n = {}) {
    const a = new Error(t);
    return {
      ...n,
      status: "Failed",
      error: a
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
    const t = document.createElement("style");
    t.id = "payconductor-3ds-styles", t.textContent = `
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
		`, document.head.appendChild(t);
  }
  //#endregion
}
const Ve = 5 * 60 * 1e3;
class Ye extends U {
  constructor() {
    super(...arguments);
    f(this, "iframe", null);
    f(this, "messageListener", null);
    f(this, "timeoutId", null);
  }
  async authenticate() {
    const {
      threeDsUrl: n,
      creq: a
    } = this.data;
    if (!n || !a)
      return this.fail("Missing threeDsUrl or creq");
    const i = this.resolveContainer();
    return new Promise((r) => {
      var l;
      this.iframe = document.createElement("iframe"), this.iframe.name = "payconductor-3ds-challenge", this.iframe.id = "payconductor-3ds-challenge", i.appendChild(this.iframe), this.messageListener = (y) => {
        var g;
        ((g = y.data) == null ? void 0 : g.status) === "COMPLETE" && (this.cleanup(), r({
          status: P.Success
        }));
      }, window.addEventListener("message", this.messageListener), this.timeoutId = setTimeout(() => {
        this.cleanup(), r({
          status: P.Timeout
        });
      }, this.options.timeoutMs ?? Ve);
      const o = (l = this.iframe.contentWindow) == null ? void 0 : l.document;
      if (!o) {
        this.cleanup(), r(this.fail("Cannot access iframe document"));
        return;
      }
      const c = o.createElement("form");
      c.name = "threeDsChallengeForm", c.setAttribute("target", "payconductor-3ds-challenge"), c.setAttribute("method", "post"), c.setAttribute("action", n);
      const s = o.createElement("input");
      s.setAttribute("type", "hidden"), s.setAttribute("name", "creq"), s.setAttribute("value", a), c.appendChild(s), this.iframe.appendChild(c), c.submit();
    });
  }
  cleanup() {
    this.timeoutId && (clearTimeout(this.timeoutId), this.timeoutId = null), this.messageListener && (window.removeEventListener("message", this.messageListener), this.messageListener = null), this.iframe && (this.iframe.remove(), this.iframe = null), this.closeModal();
  }
}
const $ = /* @__PURE__ */ new Map();
function F(e, {
  attributes: t,
  async: n = !0,
  parent: a
} = {}) {
  const i = $.get(e);
  if (i) return i;
  const r = new Promise((o, c) => {
    if (document.querySelector(`script[src="${e}"]`)) {
      o();
      return;
    }
    const s = document.createElement("script");
    s.src = e, s.async = n;
    for (const [l, y] of Object.entries(t ?? {}))
      s.setAttribute(l, y);
    s.onload = () => o(), s.onerror = () => {
      $.delete(e), c(new Error(`Failed to load script: ${e}`));
    }, (a ?? document.head).appendChild(s);
  });
  return $.set(e, r), r;
}
const Ge = "https://static.payzen.lat/static/js/authenticate-client/V1.0/kr-authenticate.umd.js", qe = 10 * 60 * 1e3;
class We extends U {
  constructor() {
    super(...arguments);
    f(this, "timeoutId", null);
  }
  async authenticate() {
    const {
      operationUrl: n,
      publicKey: a
    } = this.data;
    if (!n || !a)
      return this.fail("Missing operationUrl or publicKey");
    try {
      await F(Ge);
    } catch {
      return this.fail("Failed to load 3DS SDK");
    }
    const i = window.KrAuthenticate;
    return i ? new Promise((r) => {
      this.timeoutId = setTimeout(() => {
        this.cleanup(), r({
          status: P.Timeout
        });
      }, this.options.timeoutMs ?? qe), new i(a).authenticate(n, () => {
        this.cleanup(), r({
          status: P.Success
        });
      });
    }) : this.fail("KrAuthenticate not available");
  }
  cleanup() {
    this.timeoutId && (clearTimeout(this.timeoutId), this.timeoutId = null);
  }
}
const Je = {
  [N.Production]: "https://3ds-nx-js.stone.com.br/live/v2/3ds2.min.js",
  [N.Sandbox]: "https://3ds-nx-js.stone.com.br/test/v2/3ds2.min.js"
}, Xe = 5 * 60 * 1e3;
function Q(e) {
  return {
    country: e.country,
    state: e.state,
    city: e.city,
    zip_code: e.zipCode,
    line_1: `${e.number}, ${e.street}${e.district ? `, ${e.district}` : ""}`,
    line_2: e.complement ?? ""
  };
}
function Ze(e) {
  return e ? ["country", "state", "city", "zipCode", "number", "street", "district"].every((n) => {
    var a;
    return (a = e[n]) == null ? void 0 : a.trim();
  }) && /^[A-Za-z]{2}$/.test(e.country.trim()) : !1;
}
function Qe() {
  const e = window.innerWidth;
  return e <= 480 ? "01" : e <= 768 ? "02" : e <= 1024 ? "03" : "04";
}
class ee extends U {
  constructor() {
    super(...arguments);
    f(this, "timeoutId", null);
    f(this, "methodContainer", null);
  }
  async authenticate() {
    const {
      authToken: n,
      card: a
    } = this.data, {
      hasPhysicalItems: i,
      billingAddress: r
    } = this.data;
    if (i === !0 && !Ze(r))
      return this.fail("Incomplete delivery address for PagarMe 3DS");
    if (!n) return this.fail("Missing authToken for PagarMe 3DS");
    if (!a) return this.fail("Missing card data for PagarMe 3DS");
    const o = this.data.environment ?? N.Production;
    try {
      await F(Je[o]);
    } catch {
      return this.fail("Failed to load Stone 3DS SDK");
    }
    const c = window.TDS;
    if (!c) return this.fail("Stone TDS SDK not available");
    const s = this.resolveContainer();
    return this.methodContainer = document.createElement("div"), this.methodContainer.style.display = "none", document.body.appendChild(this.methodContainer), new Promise((l) => {
      this.timeoutId = setTimeout(() => {
        this.cleanup(), l({
          status: P.Timeout
        });
      }, this.options.timeoutMs ?? Xe), c.init({
        token: n,
        tds_method_container_element: this.methodContainer,
        challenge_container_element: s,
        use_default_challenge_iframe_style: !0,
        challenge_window_size: Qe()
      }, this.buildOrderData()).then((y) => {
        if (this.cleanup(), !(y != null && y.length)) {
          l(this.fail("PagarMe 3DS returned no response"));
          return;
        }
        const g = y[0], d = Object.values(D).find((S) => S === g.trans_status), u = {
          transStatus: d,
          providerTransactionId: g.tds_server_trans_id,
          challengeCanceled: g.challenge_canceled
        };
        if (g.challenge_canceled) {
          l(this.fail("3DS challenge canceled by user", u));
          return;
        }
        d === D.Authenticated || d === D.Attempted ? l({
          ...u,
          status: P.Success,
          dsTransactionId: g.tds_server_trans_id
        }) : l(this.fail(`3DS failed with status: ${g.trans_status}`, u));
      }).catch((y) => {
        this.cleanup(), l(this.fail(y instanceof Error ? y.message : "PagarMe 3DS failed"));
      });
    });
  }
  cleanup() {
    this.timeoutId && (clearTimeout(this.timeoutId), this.timeoutId = null), this.methodContainer && (this.methodContainer.remove(), this.methodContainer = null), this.closeModal();
  }
  buildOrderData() {
    var o;
    const {
      card: n,
      customer: a,
      billingAddress: i,
      hasPhysicalItems: r
    } = this.data;
    return {
      payments: [{
        payment_method: "credit_card",
        credit_card: {
          card: {
            number: n == null ? void 0 : n.number,
            holder_name: n == null ? void 0 : n.holderName,
            exp_month: Number(n == null ? void 0 : n.expiration.month),
            exp_year: Number(n == null ? void 0 : n.expiration.year),
            billing_address: i ? Q(i) : void 0
          }
        },
        amount: this.amountInCents
      }],
      ...a ? {
        customer: {
          name: a.name,
          email: a.email,
          ...a.document ? {
            document: a.document
          } : {},
          ...(o = a.phones) != null && o.length ? {
            phones: Object.fromEntries(a.phones.map((c) => [c.type === "HOME" ? "home_phone" : "mobile_phone", {
              country_code: c.countryCode,
              area_code: c.areaCode,
              number: c.number
            }]))
          } : {}
        }
      } : {},
      ...r === !0 ? {
        shipping: {
          recipient_name: (a == null ? void 0 : a.name) || (n == null ? void 0 : n.holderName),
          electronic_delivery: !1,
          address: Q(i)
        }
      } : r === !1 ? {
        shipping: {
          recipient_name: (a == null ? void 0 : a.name) || (n == null ? void 0 : n.holderName),
          electronic_delivery: !0
        }
      } : {}
    };
  }
}
const et = "https://assets.pagseguro.com.br/checkout-sdk-js/rc/dist/browser/pagseguro.min.js";
class tt extends U {
  async authenticate() {
    var g;
    const {
      authToken: t,
      card: n,
      customer: a,
      currency: i,
      billingAddress: r
    } = this.data, o = this.amountInCents;
    if (!t) return this.fail("Missing authToken (session) for PagSeguro 3DS");
    if (!n) return this.fail("Missing card data for PagSeguro 3DS");
    if (!a) return this.fail("Missing customer data for PagSeguro 3DS");
    if (!o) return this.fail("Missing amount for PagSeguro 3DS");
    if (!r) return this.fail("Missing billingAddress for PagSeguro 3DS");
    const c = this.data.environment === N.Sandbox ? "SANDBOX" : "PROD";
    try {
      await F(et);
    } catch {
      return this.fail("Failed to load PagSeguro SDK");
    }
    const s = window.PagSeguro;
    if (!s) return this.fail("PagSeguro SDK not available");
    s.setUp({
      session: t,
      env: c
    });
    const l = ((g = a.phones) == null ? void 0 : g.map((d) => ({
      country: d.countryCode,
      area: d.areaCode,
      number: d.number,
      type: d.type ?? "MOBILE"
    }))) ?? [{
      country: "55",
      area: "11",
      number: "999999999",
      type: "MOBILE"
    }];
    l.some((d) => d.type === "MOBILE") || (l[0].type = "MOBILE");
    try {
      const d = await s.authenticate3DS({
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
              number: n.number,
              expMonth: n.expiration.month,
              expYear: n.expiration.year,
              holder: {
                name: n.holderName
              }
            }
          },
          amount: {
            value: o,
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
      return d.status === "AUTH_FLOW_COMPLETED" || d.status === "AUTH_NOT_SUPPORTED" ? {
        status: P.Success,
        dsTransactionId: d.id
      } : d.status === "CHANGE_PAYMENT_METHOD" ? this.fail("PagSeguro requires a different payment method") : {
        status: P.Success,
        dsTransactionId: d.id
      };
    } catch (d) {
      return this.fail(d instanceof Error ? d.message : "PagSeguro 3DS failed");
    }
  }
  cleanup() {
  }
  toAlpha3(t) {
    return {
      BR: "BRA",
      US: "USA",
      AR: "ARG",
      CL: "CHL",
      CO: "COL",
      MX: "MEX",
      PE: "PER",
      UY: "URY"
    }[t.toUpperCase()] ?? t;
  }
}
const nt = 5 * 60 * 1e3, te = "payconductor-3ds-sandbox-title";
class ne extends U {
  constructor() {
    super(...arguments);
    f(this, "timeoutId", null);
  }
  async authenticate() {
    const {
      authToken: n
    } = this.data;
    if (!n) return this.fail("Missing authToken for 3DS challenge");
    const a = this.resolveContainer();
    return new Promise((i) => {
      this.timeoutId = setTimeout(() => {
        this.cleanup(), i({
          status: P.Timeout
        });
      }, this.options.timeoutMs ?? nt), this.renderChallenge(a, {
        onConfirm: () => {
          this.cleanup(), i({
            status: P.Success,
            transStatus: D.Authenticated,
            providerTransactionId: n
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
  renderChallenge(n, a) {
    const i = document.createElement("div");
    i.setAttribute("role", "dialog"), i.setAttribute("aria-modal", "true"), i.setAttribute("aria-labelledby", te), i.style.cssText = "min-height:inherit;box-sizing:border-box;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:32px;font-family:system-ui,-apple-system,sans-serif;text-align:center;color:#111827";
    const r = document.createElement("h2");
    r.id = te, r.textContent = "Autenticação 3DS (sandbox)", r.style.cssText = "margin:0;font-size:20px";
    const o = document.createElement("p");
    o.textContent = "Simulação do desafio do banco emissor. Confirme para aprovar a autenticação ou cancele para simular a desistência do comprador.", o.style.cssText = "margin:0 0 8px;max-width:360px;font-size:14px;line-height:1.5;color:#4b5563";
    const c = this.createButton("Confirmar autenticação", "background:#111827;color:#fff;border-color:#111827", a.onConfirm), s = this.createButton("Cancelar", "background:#fff;color:#111827;border-color:#d1d5db", a.onCancel);
    i.append(r, o, c, s), n.appendChild(i), c.focus();
  }
  createButton(n, a, i) {
    const r = document.createElement("button");
    return r.type = "button", r.textContent = n, r.style.cssText = `width:100%;max-width:320px;padding:12px 16px;border:1px solid;border-radius:6px;font:inherit;font-size:14px;font-weight:600;cursor:pointer;${a}`, r.addEventListener("click", i), r;
  }
}
const at = {
  // Agnostic providers
  [A.Lyra]: We,
  // Acquirer-specific providers
  [A.MercadoPago]: Ye,
  [A.PagarMe]: ee,
  [A.PagarMeSplit]: ee,
  [A.PagSeguro]: tt,
  [A.Sandbox]: ne,
  [A.SandboxSplit]: ne
};
class ue extends Error {
  constructor(t, n) {
    super(t), this.title = n, this.name = "PayConductorThreeDSApiError";
  }
}
class it {
  constructor(t) {
    this.publicKey = t;
  }
  async completeChallenge(t, n) {
    const a = await fetch(`${x}/three-ds/complete/${t}`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(n)
    });
    a.ok || await this.parseResponseError("Falha ao concluir a autenticação 3DS", a);
  }
  async getOrderStatus(t) {
    const n = await fetch(`${Oe}/orders/${t}/status`, {
      method: "GET",
      headers: this.headers
    });
    return n.ok || await this.parseResponseError("Falha ao consultar o status do pedido", n), st(await n.json());
  }
  /**
   * Aguarda o pedido sair de `ThreeDsAwaitingChallenge`.
   * No modo `Auto` não existe `statusDetail`; a espera é enquanto o pedido seguir `Pending`.
   */
  async pollOrderStatus(t, {
    maxAttempts: n = 30,
    intervalMs: a = 2e3,
    mode: i
  } = {}) {
    let r = null;
    for (let o = 0; o < n; o++) {
      if (r = await this.getOrderStatus(t), !(r.status === k.Pending && (r.statusDetail === G.ThreeDsAwaitingChallenge || i === W.Auto))) return {
        order: r,
        timedOut: !1
      };
      await new Promise((s) => setTimeout(s, a));
    }
    return {
      order: r,
      timedOut: !0
    };
  }
  async getThreeDSecureData(t) {
    const n = await fetch(`${x}/three-ds/challenge/${t}`, {
      method: "GET",
      headers: this.headers
    });
    n.ok || await this.parseResponseError("Falha ao buscar dados 3DS", n);
    const a = await n.json(), i = Object.fromEntries(Object.entries(a.threeDSecure ?? {}).filter(([, r]) => r != null));
    return {
      ...i,
      ...a.mode ? {
        mode: a.mode
      } : {},
      statusDetail: i.statusDetail ?? a.statusDetail ?? void 0
    };
  }
  async parseResponseError(t, n) {
    var i, r, o, c;
    let a = "";
    try {
      const s = await n.json();
      s != null && s.message ? a = s.message : (i = s == null ? void 0 : s.error) != null && i.message ? a = s.error : (o = (r = s == null ? void 0 : s.error) == null ? void 0 : r.value) != null && o.message ? a = s.error.value.message : (c = s == null ? void 0 : s.value) != null && c.message ? a = s.value.message : a = JSON.stringify(s);
    } catch {
    }
    throw new ue(a, t);
  }
  get headers() {
    return {
      Authorization: `Basic ${btoa(`${this.publicKey}:x`)}`,
      "Content-Type": "application/json"
    };
  }
}
function rt(e) {
  switch (e) {
    case "Completed":
      return k.Succeeded;
    case "Pending":
    case "Generating":
      return k.Pending;
    default:
      return k.Failed;
  }
}
function st(e) {
  const t = e ?? {};
  return {
    ...t,
    orderId: t.id ?? "",
    status: rt(t.status),
    statusDetail: t.statusDetail ?? void 0,
    amount: t.amount ?? 0,
    currency: t.currency ?? "BRL",
    errorCode: t.errorCode ?? void 0,
    errorMessage: t.errorMessage ?? void 0,
    message: t.errorMessage ?? void 0
  };
}
class ot {
  constructor(t) {
    f(this, "data");
    f(this, "provider", null);
    f(this, "api");
    this.data = t, this.api = new it(this.data.publicKey);
  }
  get needsChallenge() {
    return this.data.status === "NeedChallenge" || this.data.statusDetail === "ThreeDsAwaitingChallenge";
  }
  get acquirer() {
    return this.data.acquirer;
  }
  /** Indica se o pedido precisa de autenticação 3DS. */
  static requiresChallenge(t) {
    var n, a, i;
    return t.status && t.status !== "Pending" ? !1 : t.statusDetail === "ThreeDsAwaitingChallenge" || ((n = t.threeDSecure) == null ? void 0 : n.status) === "NeedChallenge" || ((i = (a = t.creditCard) == null ? void 0 : a.threeDSecure) == null ? void 0 : i.status) === "NeedChallenge";
  }
  /**
   * Executa o fluxo completo de 3DS: carrega os dados, resolve o provedor,
   * conduz o desafio, envia o `complete` (só no modo `Manual`) e faz o polling
   * do pedido. O integrador não precisa ramificar por modo.
   */
  async authenticate(t) {
    var d;
    try {
      const u = await this.api.getThreeDSecureData(this.data.orderId);
      this.data = {
        ...this.data,
        ...u
      };
    } catch (u) {
      if (u instanceof ue)
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
      acquirer: n,
      mode: a
    } = this.data;
    if (!n)
      return this.finish({
        status: P.Failed,
        error: new Error("Adquirente 3DS não informada na cobrança"),
        failureReason: "Adquirente 3DS não informada na cobrança"
      }, t);
    const i = at[n];
    if (!i) {
      const u = `Provedor 3DS não suportado: ${n}`;
      return this.finish({
        status: P.Failed,
        error: new Error(u),
        failureReason: u
      }, t);
    }
    (d = t == null ? void 0 : t.onChallenge) == null || d.call(t);
    const r = new i(this.data, {
      threeDSecure: this.data,
      timeoutMs: t == null ? void 0 : t.timeoutMs
    });
    this.provider = r;
    let o;
    try {
      o = await r.authenticate();
    } finally {
      r.cleanup(), this.provider = null;
    }
    const c = {
      ...o
    }, s = this.deriveFailureReason(o);
    c.failureReason = s;
    const l = a ? a === W.Manual : this.data.statusDetail === G.ThreeDsAwaitingChallenge;
    let y;
    if (l && (t == null ? void 0 : t.complete) !== !1)
      try {
        await this.api.completeChallenge(this.data.orderId, this.buildCompletionPayload(o, s));
      } catch (u) {
        y = u;
      }
    if ((t == null ? void 0 : t.poll) !== !1 && o.status === P.Success) {
      const {
        order: u,
        timedOut: S
      } = await this.api.pollOrderStatus(this.data.orderId, {
        ...t == null ? void 0 : t.polling,
        mode: a
      });
      c.order = u ?? void 0, c.timedOut = S;
    } else y && !c.error && (c.error = this.toError(y));
    return this.finish(c, t);
  }
  destroy() {
    this.provider && (this.provider.cleanup(), this.provider = null);
  }
  /** Mensagem amigável da falha do desafio (pt-BR). */
  deriveFailureReason(t) {
    var n;
    if (t.status !== P.Success)
      return t.status === P.Timeout ? "Tempo da autenticação 3DS esgotado" : ((n = t.error) == null ? void 0 : n.message) || "Falha na autenticação 3DS";
  }
  /**
   * Payload do `complete`. `failureReason` só vai quando é falha técnica
   * (sem `transStatus` do emissor nem cancelamento) — string vazia quebra o backend.
   */
  buildCompletionPayload(t, n) {
    const a = t.challengeCanceled === !0, i = t.transStatus;
    return {
      providerTransactionId: t.providerTransactionId ?? t.dsTransactionId,
      transStatus: i,
      challengeCanceled: a,
      failureReason: !!n && !i && !a ? n : void 0
    };
  }
  finish(t, n) {
    var a, i, r;
    return (a = n == null ? void 0 : n.onComplete) == null || a.call(n, t), t.failureReason && ((i = n == null ? void 0 : n.onError) == null || i.call(n, new Error(t.failureReason))), (t.status === P.Timeout || t.timedOut) && ((r = n == null ? void 0 : n.onTimeout) == null || r.call(n)), t;
  }
  toError(t) {
    return t instanceof Error ? t : new Error("Falha ao concluir a autenticação 3DS");
  }
}
function Mt(e) {
  let t = null;
  return {
    authenticate: async (i) => {
      const r = new ot(i);
      t = r;
      try {
        return await r.authenticate({
          onChallenge: e == null ? void 0 : e.onChallenge,
          onComplete: e == null ? void 0 : e.onComplete,
          onError: e == null ? void 0 : e.onError,
          onTimeout: e == null ? void 0 : e.onTimeout,
          complete: e == null ? void 0 : e.complete,
          poll: e == null ? void 0 : e.poll,
          polling: e == null ? void 0 : e.polling
        });
      } finally {
        r.destroy(), t = null;
      }
    },
    destroy: () => {
      t == null || t.destroy(), t = null;
    }
  };
}
class ct extends Error {
  constructor(t, n) {
    super(t), this.title = n, this.name = "PayConductorTokenizerApiError";
  }
}
class dt {
  constructor(t) {
    this.publicKey = t;
  }
  async getSettings() {
    const t = await fetch(`${x}/card-tokenization/settings`, {
      method: "GET",
      headers: this.headers
    });
    return t.ok || await this.parseResponseError("Failed to fetch settings", t), await t.json();
  }
  async createToken(t) {
    const n = await fetch(`${x}/card-tokenization/tokenize`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(t)
    });
    return n.ok || await this.parseResponseError("Failed to generate token", n), await n.json();
  }
  async saveTokens(t, n, a) {
    const i = await fetch(`${x}/card-tokenization/save-tokens/${n}/${a}`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(t)
    });
    i.ok || await this.parseResponseError("Failed to save tokens", i);
  }
  async parseResponseError(t, n) {
    var i, r, o, c;
    let a = "";
    try {
      const s = await n.json();
      s != null && s.message ? a = s.message : (i = s == null ? void 0 : s.error) != null && i.message ? a = s.error : (o = (r = s == null ? void 0 : s.error) == null ? void 0 : r.value) != null && o.message ? a = s.error.value.message : (c = s == null ? void 0 : s.value) != null && c.message ? a = s.value.message : a = JSON.stringify(s);
    } catch {
    }
    throw new ct(a, t);
  }
  get headers() {
    return {
      Authorization: `Basic ${btoa(`${this.publicKey}:x`)}`,
      "Content-Type": "application/json"
    };
  }
}
class lt {
  constructor(t) {
    this.input = t;
  }
  /**
   * Fingerprints de dispositivo que precisam acompanhar o token na cobrança.
   * Provedores que não precisam não sobrescrevem: o padrão é não enviar nada.
   */
  async getFingerprints() {
  }
}
const ut = "https://www.mercadopago.com/v2/security.js", ht = 100, mt = 1500;
class ft extends lt {
  constructor() {
    super(...arguments);
    f(this, "scriptUrl", "https://sdk.mercadopago.com/js/v2");
    f(this, "deviceSessionId");
  }
  async getFingerprints() {
    const n = await this.resolveDeviceSessionId();
    return n ? {
      mercadoPagoSessionId: n
    } : void 0;
  }
  async tokenize() {
    const {
      publicKey: n
    } = this.input.setting;
    if (typeof n != "string" || !n.trim())
      throw new Error("MercadoPago public key is missing in settings");
    if (!this.input.customer.documentNumber)
      throw new Error("Customer document number is required for tokenization");
    const a = window.MercadoPago;
    if (!a) throw new Error("MercadoPago SDK not available");
    const i = new a(n.trim()), {
      expiration: r,
      cvv: o,
      number: c,
      holderName: s
    } = this.input.card, l = await i.createCardToken({
      cardExpirationMonth: String(r.month).padStart(2, "0"),
      cardExpirationYear: String(r.year),
      cardholderName: s,
      cardNumber: c,
      securityCode: o,
      identificationType: this.input.customer.documentType === le.Cpf ? "CPF" : "CNPJ",
      identificationNumber: this.input.customer.documentNumber
    }).catch((y) => {
      throw new Error(this.describeMercadoPagoError(y));
    });
    if ("id" in l && l.id) return l.id;
    throw new Error(this.describeMercadoPagoError(l));
  }
  /** Lê o `MP_DEVICE_SESSION_ID` sem derrubar a tokenização quando indisponível. */
  async resolveDeviceSessionId() {
    if (this.deviceSessionId) return this.deviceSessionId;
    if (window.MP_DEVICE_SESSION_ID)
      return this.deviceSessionId = window.MP_DEVICE_SESSION_ID, this.deviceSessionId;
    try {
      await F(ut, {
        attributes: {
          view: "checkout"
        }
      });
    } catch {
      return;
    }
    return this.deviceSessionId = await this.waitForDeviceSessionId(), this.deviceSessionId;
  }
  /** O security.js grava o id de forma assíncrona; aguarda por um curto período. */
  async waitForDeviceSessionId() {
    const n = Date.now();
    for (; !window.MP_DEVICE_SESSION_ID; ) {
      if (Date.now() - n >= mt)
        return;
      await new Promise((a) => setTimeout(a, ht));
    }
    return window.MP_DEVICE_SESSION_ID;
  }
  describeMercadoPagoError(n) {
    if (typeof n == "string") return n;
    if (Array.isArray(n)) return n.map((a) => this.describeMercadoPagoError(a)).join("; ");
    if (typeof n == "object" && n !== null) {
      if ("cause" in n && Array.isArray(n.cause) && n.cause.length > 0)
        return this.describeMercadoPagoError(n.cause);
      if ("message" in n && typeof n.message == "string") return n.message;
      if ("description" in n && typeof n.description == "string") return n.description;
    }
    return "Failed to tokenize card";
  }
}
const yt = {
  [A.MercadoPago]: ft
};
class gt {
  constructor(t) {
    f(this, "api");
    this.publicKey = t, this.api = new dt(this.publicKey);
  }
  async tokenizeCard(t) {
    this.validateCard(t);
    const {
      customerId: n,
      token: a
    } = await this.api.createToken({
      card: t.card,
      customer: t.customer,
      saveCard: !1
    }), {
      settings: i
    } = await this.api.getSettings(), o = (await Promise.all(i.map(async (c) => {
      const s = yt[c.key];
      if (!s) return null;
      const l = new s({
        ...t,
        setting: c.settings
      });
      await F(l.scriptUrl);
      const y = await l.getFingerprints();
      return {
        token: await l.tokenize(),
        integrationId: c.integrationId,
        providerKey: c.key,
        ...y ? {
          fingerprints: y
        } : {}
      };
    }))).filter((c) => c !== null);
    return o.length > 0 && await this.api.saveTokens(o, n, a), a;
  }
  validateCard(t) {
    const {
      number: n,
      cvv: a,
      expiration: i,
      holderName: r
    } = t.card;
    if (!n || !a || !(i != null && i.month) || !(i != null && i.year) || !r)
      throw new Error("Invalid card data");
  }
}
function Ot(e) {
  const t = new gt(e.publicKey);
  return {
    tokenizeCard: async (a) => {
      var i, r;
      try {
        const o = await t.tokenizeCard(a);
        return (i = e.onSuccess) == null || i.call(e, o), o;
      } catch (o) {
        const c = o instanceof Error ? o : new Error("Tokenization failed");
        return (r = e.onError) == null || r.call(e, c), null;
      }
    }
  };
}
class Et extends Error {
  constructor(t, n) {
    super(t), this.status = n, this.name = "PayConductorShopifyStorefrontApiError";
  }
}
class L {
  static async json(t, n) {
    const a = await fetch(t, {
      ...n,
      headers: {
        Accept: "application/json",
        ...n == null ? void 0 : n.headers
      }
    });
    if (!a.ok)
      throw new Et(`${t} respondeu ${a.status}`, a.status);
    return await a.json();
  }
}
const M = class M {
  constructor(t) {
    this.baseUrl = t;
  }
  createCartLink(t) {
    return L.json(`${this.baseUrl}${M.CART_PATH}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(t)
    });
  }
  getPaymentLinkAvailability(t) {
    return L.json(`${this.baseUrl}${M.PAYMENT_LINK_PATH}${encodeURIComponent(t)}`);
  }
};
f(M, "CART_PATH", "/api/v1/sales-channel/shopify/cart"), f(M, "PAYMENT_LINK_PATH", "/api/v1/payment-links/");
let V = M;
class wt {
  constructor(t) {
    this.root = t;
  }
  get() {
    return L.json(`${this.root}cart.js`);
  }
  add(t) {
    return L.json(`${this.root}cart/add.js`, {
      method: "POST",
      body: new FormData(t)
    });
  }
  clear() {
    return L.json(`${this.root}cart/clear.js`, {
      method: "POST"
    });
  }
}
var he = /* @__PURE__ */ ((e) => (e.Redirect = "Redirect", e.Disabled = "Disabled", e))(he || {}), B = /* @__PURE__ */ ((e) => (e.PendingCart = "payconductor:pending-cart", e))(B || {}), ie, re;
const p = class p {
  constructor(t) {
    f(this, "root", ((re = (ie = window.Shopify) == null ? void 0 : ie.routes) == null ? void 0 : re.root) ?? "/");
    f(this, "api");
    f(this, "cart");
    f(this, "isRedirecting", !1);
    f(this, "retry", () => this.checkout());
    f(this, "handleClick", (t) => {
      const n = p;
      if (n.findInPath(t, n.CHECKOUT_SELECTORS)) {
        this.intercept(t, () => this.checkout());
        return;
      }
      if (this.config.interceptBuyNow && n.findInPath(t, n.BUY_NOW_SELECTORS)) {
        const a = n.findInPath(t, n.PRODUCT_FORM_SELECTOR) ?? document.querySelector(n.PRODUCT_FORM_SELECTOR);
        this.intercept(t, () => this.buyNow(a instanceof HTMLFormElement ? a : null));
      }
    });
    f(this, "handleSubmit", (t) => {
      var n;
      ((n = t.submitter) == null ? void 0 : n.getAttribute("name")) === p.CHECKOUT_SUBMITTER_NAME && this.intercept(t, () => this.checkout());
    });
    this.config = t, this.api = new V(t.api), this.cart = new wt(this.root);
  }
  static init(t) {
    if (!(t instanceof HTMLScriptElement))
      return;
    const {
      api: n,
      shop: a,
      integration: i,
      interceptBuyNow: r,
      debug: o
    } = t.dataset;
    !n || !a || !i || new p({
      api: n,
      shop: a,
      integrationId: i,
      interceptBuyNow: r === "true",
      debug: o === "true"
    }).listen();
  }
  listen() {
    document.addEventListener("click", this.handleClick, !0), document.addEventListener("submit", this.handleSubmit, !0), window.addEventListener("pageshow", () => this.setBusy(!1)), this.clearPaidCart().catch((t) => this.log(t));
  }
  intercept(t, n) {
    t.preventDefault(), t.stopImmediatePropagation(), this.run(n);
  }
  run(t) {
    this.isRedirecting || (this.retry = t, this.setBusy(!0), t().catch((n) => {
      this.log(n), this.setBusy(!1), this.showError();
    }));
  }
  setBusy(t) {
    this.isRedirecting = t, document.documentElement.style.cursor = t ? "progress" : "";
  }
  async buyNow(t) {
    if (!t)
      throw new Error("Formulário do produto não encontrado");
    await this.cart.add(t), this.retry = () => this.checkout(), await this.checkout();
  }
  async checkout() {
    const t = await this.cart.get(), n = await this.api.createCartLink(this.toPayload(t));
    if (n.status === he.Disabled) {
      document.removeEventListener("click", this.handleClick, !0), document.removeEventListener("submit", this.handleSubmit, !0), window.location.assign(`${this.root}checkout`);
      return;
    }
    if (!n.url || !n.paymentLinkId)
      throw new Error("Resposta sem link de pagamento");
    this.writePendingCart({
      cartToken: t.token,
      paymentLinkId: n.paymentLinkId
    }), window.location.assign(n.url);
  }
  toPayload(t) {
    var n;
    return {
      integrationId: this.config.integrationId,
      shop: this.config.shop,
      cartToken: t.token,
      items: t.items.map((a) => ({
        variantId: String(a.variant_id),
        qty: a.quantity,
        properties: p.toProperties(a.properties)
      })),
      discountCodes: (n = t.discount_codes) == null ? void 0 : n.filter((a) => a.applicable).map((a) => a.code),
      note: t.note || void 0
    };
  }
  async clearPaidCart() {
    const t = p.readPendingCart();
    if (!t)
      return;
    const [n, a] = await Promise.all([this.cart.get(), this.api.getPaymentLinkAvailability(t.paymentLinkId)]);
    if (n.token === t.cartToken && a.availability.isAvailable)
      return;
    const i = n.token === t.cartToken && a.availability.reason === "exhausted";
    i && await this.cart.clear(), localStorage.removeItem(B.PendingCart), i && n.items.length > 0 && window.location.reload();
  }
  showError() {
    var c;
    const t = p;
    (c = document.getElementById(t.OVERLAY_ID)) == null || c.remove();
    const n = document.createElement("div");
    n.id = t.OVERLAY_ID, n.setAttribute("role", "alertdialog"), n.setAttribute("aria-modal", "true"), Object.assign(n.style, {
      position: "fixed",
      inset: "0",
      zIndex: "2147483647",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "rgba(0, 0, 0, 0.5)"
    });
    const a = document.createElement("div");
    Object.assign(a.style, {
      background: "#fff",
      color: "#111",
      padding: "24px",
      margin: "16px",
      maxWidth: "360px",
      borderRadius: "12px",
      textAlign: "center",
      fontFamily: "inherit"
    });
    const i = document.createElement("p");
    i.textContent = t.ERROR_MESSAGE, i.style.margin = "0 0 16px";
    const r = t.createButton(t.RETRY_LABEL, !0, () => {
      n.remove(), this.run(this.retry);
    }), o = t.createButton(t.CLOSE_LABEL, !1, () => n.remove());
    a.append(i, r, o), n.append(a), document.body.append(n), r.focus();
  }
  writePendingCart(t) {
    try {
      localStorage.setItem(B.PendingCart, JSON.stringify(t));
    } catch (n) {
      this.log(n);
    }
  }
  log(t) {
    this.config.debug && console.error(p.LOG_PREFIX, t);
  }
  static createButton(t, n, a) {
    const i = document.createElement("button");
    return i.type = "button", i.textContent = t, Object.assign(i.style, {
      margin: "4px",
      padding: "10px 16px",
      borderRadius: "8px",
      border: "1px solid #111",
      background: n ? "#111" : "transparent",
      color: n ? "#fff" : "#111",
      cursor: "pointer",
      font: "inherit"
    }), i.addEventListener("click", a), i;
  }
  static findInPath(t, n) {
    for (const a of t.composedPath())
      if (a instanceof Element && a.matches(n))
        return a;
    return null;
  }
  static toProperties(t) {
    const n = Object.entries(t ?? {}).filter((a) => typeof a[1] == "string" && a[1] !== "");
    return n.length > 0 ? Object.fromEntries(n) : void 0;
  }
  static readPendingCart() {
    try {
      const t = JSON.parse(localStorage.getItem(B.PendingCart) ?? "null");
      return p.isPendingCart(t) ? t : null;
    } catch {
      return null;
    }
  }
  static isPendingCart(t) {
    return typeof t == "object" && t !== null && "cartToken" in t && typeof t.cartToken == "string" && "paymentLinkId" in t && typeof t.paymentLinkId == "string";
  }
};
f(p, "CHECKOUT_SELECTORS", '[name="checkout"], a[href$="/checkout"]'), f(p, "BUY_NOW_SELECTORS", '.shopify-payment-button__button, shopify-buy-it-now-button button, shopify-accelerated-checkout button, [data-shopify="payment-button"] button'), f(p, "PRODUCT_FORM_SELECTOR", 'form[action$="/cart/add"]'), f(p, "CHECKOUT_SUBMITTER_NAME", "checkout"), f(p, "OVERLAY_ID", "payconductor-checkout-error"), f(p, "ERROR_MESSAGE", "Não foi possível iniciar o pagamento. Tente novamente."), f(p, "RETRY_LABEL", "Tentar novamente"), f(p, "CLOSE_LABEL", "Fechar"), f(p, "LOG_PREFIX", "[PayConductor]");
let ae = p;
export {
  ke as ALLOWED_ORIGINS,
  Oe as API_BASE_URL,
  ve as CardBrand,
  G as ChargeStatusDetail,
  pe as CryptoNetwork,
  Te as CurrencyType,
  Ae as DeviceType,
  le as DocumentType,
  It as ERROR_CODES,
  _e as ErrorCode,
  Me as IFRAME_BASE_URL,
  X as IFRAME_DEFAULT_HEIGHT_VALUE,
  T as IncomingMessage,
  Re as InputStyleKey,
  A as IntegrationProvider,
  N as OrganizationEnvironment,
  _ as OutgoingMessage,
  b as POST_MESSAGES,
  vt as PayConductor,
  ot as PayConductor3DSSDK,
  Tt as PayConductorCheckoutElement,
  ae as PayConductorShopifyStorefrontSDK,
  At as PayConductorThreeDSElement,
  gt as PayConductorTokenizerSDK,
  be as PaymentMethod,
  Pe as PaymentMethodLayout,
  k as PaymentStatus,
  xe as REQUEST_TIMEOUT,
  x as SDK_API_BASE_URL,
  De as SKELETON_CSS,
  Z as SKELETON_STYLE_ID,
  W as ThreeDSMode,
  Ie as ThreeDSResultStatus,
  D as ThreeDSTransStatus,
  P as ThreeDSecureResultStatus,
  Ce as ThreeDsAuthenticationStatus,
  Le as buildIframeUrl,
  vt as default,
  Ct as defaultTheme,
  Ne as generateRequestId,
  Ue as isValidOrigin,
  F as loadScript,
  Rt as usePayConductor,
  _t as usePayconductorElement,
  Mt as useThreeDS,
  Ot as useTokenizer
};
//# sourceMappingURL=index.es.js.map
