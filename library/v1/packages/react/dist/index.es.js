var Y = Object.defineProperty;
var G = (e, t, n) => t in e ? Y(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var T = (e, t, n) => G(e, typeof t != "symbol" ? t + "" : t, n);
import { jsx as A, jsxs as $ } from "react/jsx-runtime";
import { useState as v, useEffect as L, useRef as J } from "react";
const K = "https://iframe.payconductor.ai/v1", z = "http://localhost:5175/v1", Z = 3e4, Q = "600px";
var X = /* @__PURE__ */ ((e) => (e.Pix = "Pix", e.CreditCard = "CreditCard", e.DebitCard = "DebitCard", e.BankSlip = "BankSlip", e.Crypto = "Crypto", e.ApplePay = "ApplePay", e.NuPay = "NuPay", e.PicPay = "PicPay", e.AmazonPay = "AmazonPay", e.SepaDebit = "SepaDebit", e.GooglePay = "GooglePay", e))(X || {}), ee = /* @__PURE__ */ ((e) => (e.Grid = "grid", e.Vertical = "vertical", e.Horizontal = "horizontal", e))(ee || {}), B = /* @__PURE__ */ ((e) => (e.Succeeded = "succeeded", e.Pending = "pending", e.Failed = "failed", e))(B || {}), te = /* @__PURE__ */ ((e) => (e.Android = "android", e.IOS = "ios", e.Web = "web", e))(te || {}), ne = /* @__PURE__ */ ((e) => (e.Padding = "padding", e.Radius = "radius", e.Color = "color", e.Background = "background", e.Shadow = "shadow", e))(ne || {}), I = /* @__PURE__ */ ((e) => (e.Init = "Init", e.Config = "Config", e.Update = "Update", e.ConfirmPayment = "ConfirmPayment", e.Validate = "Validate", e.Reset = "Reset", e))(I || {}), C = /* @__PURE__ */ ((e) => (e.Ready = "Ready", e.Error = "Error", e.PaymentComplete = "PaymentComplete", e.PaymentFailed = "PaymentFailed", e.PaymentPending = "PaymentPending", e.ValidationError = "ValidationError", e.PaymentMethodSelected = "PaymentMethodSelected", e.Resize = "Resize", e.ThreeDSChallenge = "ThreeDSChallenge", e.ThreeDSComplete = "ThreeDSComplete", e.ThreeDSFailed = "ThreeDSFailed", e))(C || {}), re = /* @__PURE__ */ ((e) => (e.InvalidClient = "InvalidClient", e.InvalidToken = "InvalidToken", e.NetworkError = "NetworkError", e.IframeNotReady = "IframeNotReady", e.PaymentDeclined = "PaymentDeclined", e.ValidationError = "ValidationError", e.Timeout = "Timeout", e))(re || {});
const He = {
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
}, ae = typeof window < "u" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") && !window.location.search.includes("production"), oe = ae ? z : K, ie = [z, K], O = Q, se = Z, E = {
  INIT: I.Init,
  CONFIG: I.Config,
  UPDATE: I.Update,
  CONFIRM_PAYMENT: I.ConfirmPayment,
  VALIDATE: I.Validate,
  RESET: I.Reset,
  READY: C.Ready,
  ERROR: C.Error,
  PAYMENT_COMPLETE: C.PaymentComplete,
  PAYMENT_FAILED: C.PaymentFailed,
  PAYMENT_PENDING: C.PaymentPending,
  VALIDATION_ERROR: C.ValidationError,
  PAYMENT_METHOD_SELECTED: C.PaymentMethodSelected,
  RESIZE: C.Resize
}, qe = {
  INVALID_CLIENT: "InvalidClient",
  INVALID_TOKEN: "InvalidToken",
  NETWORK_ERROR: "NetworkError",
  IFRAME_NOT_READY: "IframeNotReady",
  PAYMENT_DECLINED: "PaymentDeclined",
  VALIDATION_ERROR: "ValidationError",
  TIMEOUT: "Timeout"
};
function de() {
  return {
    userAgent: navigator.userAgent,
    language: navigator.language,
    colorDepth: String(screen.colorDepth),
    screenHeight: String(screen.height),
    screenWidth: String(screen.width),
    timeZoneOffset: String((/* @__PURE__ */ new Date()).getTimezoneOffset()),
    javaEnabled: !1,
    javaScriptEnabled: !0
  };
}
var g = /* @__PURE__ */ ((e) => (e.Success = "Success", e.Failed = "Failed", e.Timeout = "Timeout", e))(g || {});
class M {
  constructor(t, n) {
    T(this, "overlay", null);
    T(this, "modalContent", null);
    this.data = t, this.options = n;
  }
  fail(t) {
    var r, a;
    const n = new Error(t);
    return (a = (r = this.options).onError) == null || a.call(r, n), {
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
const ce = 5 * 60 * 1e3;
class le extends M {
  constructor() {
    super(...arguments);
    T(this, "iframe", null);
    T(this, "messageListener", null);
    T(this, "timeoutId", null);
  }
  async authenticate() {
    const {
      threeDsUrl: n,
      creq: r
    } = this.data;
    if (!n || !r)
      return this.fail("Missing threeDsUrl or creq");
    const a = this.resolveContainer();
    return new Promise((s) => {
      var u;
      this.iframe = document.createElement("iframe"), this.iframe.name = "payconductor-3ds-challenge", this.iframe.id = "payconductor-3ds-challenge", a.appendChild(this.iframe), this.messageListener = (h) => {
        var y, c, w;
        ((y = h.data) == null ? void 0 : y.status) === "COMPLETE" && (this.cleanup(), (w = (c = this.options).onComplete) == null || w.call(c), s({
          status: g.Success
        }));
      }, window.addEventListener("message", this.messageListener), this.timeoutId = setTimeout(() => {
        var h, y;
        this.cleanup(), (y = (h = this.options).onTimeout) == null || y.call(h), s({
          status: g.Timeout
        });
      }, this.options.timeoutMs ?? ce);
      const d = (u = this.iframe.contentWindow) == null ? void 0 : u.document;
      if (!d) {
        this.cleanup(), s(this.fail("Cannot access iframe document"));
        return;
      }
      const o = d.createElement("form");
      o.name = "threeDsChallengeForm", o.setAttribute("target", "payconductor-3ds-challenge"), o.setAttribute("method", "post"), o.setAttribute("action", n);
      const i = d.createElement("input");
      i.setAttribute("type", "hidden"), i.setAttribute("name", "creq"), i.setAttribute("value", r), o.appendChild(i), this.iframe.appendChild(o), o.submit();
    });
  }
  cleanup() {
    this.timeoutId && (clearTimeout(this.timeoutId), this.timeoutId = null), this.messageListener && (window.removeEventListener("message", this.messageListener), this.messageListener = null), this.iframe && (this.iframe.remove(), this.iframe = null), this.closeModal();
  }
}
const N = /* @__PURE__ */ new Map();
function _(e) {
  const t = N.get(e);
  if (t) return t;
  const n = new Promise((r, a) => {
    if (document.querySelector(`script[src="${e}"]`)) {
      r();
      return;
    }
    const s = document.createElement("script");
    s.src = e, s.async = !0, s.onload = () => r(), s.onerror = () => {
      N.delete(e), a(new Error(`Failed to load script: ${e}`));
    }, (document.head || document.body).appendChild(s);
  });
  return N.set(e, n), n;
}
const ue = "https://static.payzen.lat/static/js/authenticate-client/V1.0/kr-authenticate.umd", he = 10 * 60 * 1e3;
class me extends M {
  constructor() {
    super(...arguments);
    T(this, "timeoutId", null);
  }
  async authenticate() {
    const {
      operationUrl: n,
      publicKey: r
    } = this.data;
    if (!n || !r)
      return this.fail("Missing operationUrl or publicKey");
    try {
      await _(ue);
    } catch {
      return this.fail("Failed to load 3DS SDK");
    }
    const a = window.KrAuthenticate;
    if (!a) return this.fail("KrAuthenticate not available");
    const s = this.resolveContainer();
    return new Promise((d) => {
      this.timeoutId = setTimeout(() => {
        var i, u;
        this.cleanup(), (u = (i = this.options).onTimeout) == null || u.call(i), d({
          status: g.Timeout
        });
      }, this.options.timeoutMs ?? he), new a(r, {
        element: s
      }).authenticate(n, () => {
        var i, u;
        this.cleanup(), (u = (i = this.options).onComplete) == null || u.call(i), d({
          status: g.Success
        });
      });
    });
  }
  cleanup() {
    this.timeoutId && (clearTimeout(this.timeoutId), this.timeoutId = null), this.closeModal();
  }
}
const fe = {
  Production: "https://3ds-nx-js.stone.com.br/live/v2/3ds2.min",
  Sandbox: "https://3ds-nx-js.stone.com.br/test/v2/3ds2.min"
}, ye = 5 * 60 * 1e3;
function we() {
  const e = window.innerWidth;
  return e <= 480 ? "01" : e <= 768 ? "02" : e <= 1024 ? "03" : "04";
}
class Ee extends M {
  constructor() {
    super(...arguments);
    T(this, "timeoutId", null);
    T(this, "methodContainer", null);
  }
  async authenticate() {
    const {
      authToken: n
    } = this.data;
    if (!n) return this.fail("Missing authToken for PagarMe 3DS");
    const r = this.data.environment ?? "Production";
    try {
      await _(fe[r]);
    } catch {
      return this.fail("Failed to load Stone 3DS SDK");
    }
    const a = window.TDS;
    if (!a) return this.fail("Stone TDS SDK not available");
    const s = this.resolveContainer();
    return this.methodContainer = document.createElement("div"), this.methodContainer.style.display = "none", document.body.appendChild(this.methodContainer), new Promise((d) => {
      this.timeoutId = setTimeout(() => {
        var o, i;
        this.cleanup(), (i = (o = this.options).onTimeout) == null || i.call(o), d({
          status: g.Timeout
        });
      }, this.options.timeoutMs ?? ye), a.init({
        token: n,
        tds_method_container_element: this.methodContainer,
        challenge_container_element: s,
        use_default_challenge_iframe_style: !0,
        challenge_window_size: we()
      }, this.options.providerData ?? {}).then((o) => {
        var u, h;
        if (this.cleanup(), !(o != null && o.length)) {
          d(this.fail("PagarMe 3DS returned no response"));
          return;
        }
        const i = o[0];
        if (i.challenge_canceled) {
          d(this.fail("3DS challenge canceled by user"));
          return;
        }
        i.trans_status === "Y" || i.trans_status === "A" ? ((h = (u = this.options).onComplete) == null || h.call(u), d({
          status: g.Success,
          dsTransactionId: i.tds_server_trans_id
        })) : d(this.fail(`3DS failed with status: ${i.trans_status}`));
      }).catch((o) => {
        this.cleanup(), d(this.fail(o instanceof Error ? o.message : "PagarMe 3DS failed"));
      });
    });
  }
  cleanup() {
    this.timeoutId && (clearTimeout(this.timeoutId), this.timeoutId = null), this.methodContainer && (this.methodContainer.remove(), this.methodContainer = null), this.closeModal();
  }
}
const ge = "https://assets.pagseguro.com.br/checkout-sdk-js/rc/dist/browser/pagseguro.min";
class Pe extends M {
  async authenticate() {
    var s, d;
    const {
      authToken: t,
      operationUrl: n
    } = this.data;
    if (!t || !n)
      return this.fail("Missing authToken or operationUrl for PagSeguro 3DS");
    const r = this.data.environment === "Sandbox" ? "SANDBOX" : "PROD";
    try {
      await _(ge);
    } catch {
      return this.fail("Failed to load PagSeguro SDK");
    }
    const a = window.PagSeguro;
    if (!a) return this.fail("PagSeguro SDK not available");
    a.setUp({
      session: t,
      env: r
    });
    try {
      const o = await a.authenticate3DS(this.options.providerData ?? {
        data: {}
      });
      return o.status === "AUTH_FLOW_COMPLETED" || o.status === "AUTH_NOT_SUPPORTED" ? ((d = (s = this.options).onComplete) == null || d.call(s), {
        status: g.Success,
        dsTransactionId: o.id
      }) : o.status === "CHANGE_PAYMENT_METHOD" ? this.fail("PagSeguro requires a different payment method") : {
        status: g.Success,
        dsTransactionId: o.id
      };
    } catch (o) {
      return this.fail(o instanceof Error ? o.message : "PagSeguro 3DS failed");
    }
  }
  cleanup() {
    this.closeModal();
  }
}
const Te = {
  MercadoPago: le,
  PayConductor: me,
  PagarMe: Ee,
  PagSeguro: Pe
};
class H {
  constructor(t) {
    T(this, "data");
    T(this, "provider", null);
    this.data = t;
  }
  get needsChallenge() {
    return this.data.status === "NeedChallenge" || this.data.statusDetail === "ThreeDsAwaitingChallenge";
  }
  get acquirer() {
    return this.data.acquirer;
  }
  async authenticate(t) {
    if (!this.needsChallenge)
      return {
        status: g.Success
      };
    const n = {
      ...t,
      threeDSecure: this.data
    }, r = this.resolveProvider(), a = r ? Te[r] : void 0;
    return a ? (this.provider = new a(this.data, n), this.provider.authenticate()) : this.data.authToken && !this.data.operationUrl && !this.data.threeDsUrl ? {
      status: g.Success,
      authToken: this.data.authToken,
      dsTransactionId: this.data.dsTransactionId
    } : {
      status: g.Failed,
      error: new Error(`Unsupported 3DS provider: ${r ?? "unknown"}`)
    };
  }
  destroy() {
    this.provider && (this.provider.cleanup(), this.provider = null);
  }
  resolveProvider() {
    if (this.data.acquirer) return this.data.acquirer;
    if (this.data.operationUrl && this.data.publicKey) return "PayConductor";
    if (this.data.threeDsUrl && this.data.creq) return "MercadoPago";
  }
}
const F = "payconductor-skeleton-style", Se = `
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
  const t = new URLSearchParams({
    publicKey: e.publicKey
  });
  return `${oe}?${t.toString()}`;
}
function pe() {
  return crypto.randomUUID();
}
function ve(e, t) {
  return t.some((n) => {
    try {
      return new URL(n).origin === e;
    } catch {
      return n === e;
    }
  });
}
function x() {
  return /* @__PURE__ */ new Map();
}
function D(e, t, n, r) {
  return new Promise((a, s) => {
    if (!e || !("contentWindow" in e)) {
      s(new Error("Iframe not defined"));
      return;
    }
    if (!(e != null && e.contentWindow)) {
      s(new Error("Iframe not ready"));
      return;
    }
    if (!t) {
      s(new Error("Pending requests not initialized"));
      return;
    }
    const d = pe();
    t.set(d, {
      resolve: a,
      reject: s
    }), e.contentWindow.postMessage({
      type: n,
      data: r,
      requestId: d
    }, "*"), setTimeout(() => {
      t != null && t.has(d) && (t.delete(d), s(new Error("Request timeout")));
    }, se);
  });
}
function be(e, t, n) {
  return D(e, t, E.CONFIRM_PAYMENT, n);
}
async function Ie(e, t, n) {
  var o, i, u, h, y;
  const r = await be(e, t, {
    orderId: n.orderId
  });
  if (!(r.statusDetail === "ThreeDsAwaitingChallenge" || ((o = r.threeDSecure) == null ? void 0 : o.status) === "NeedChallenge") || !r.threeDSecure) return r;
  (i = n.onThreeDSChallenge) == null || i.call(n);
  const s = new H({
    ...r.threeDSecure,
    statusDetail: r.statusDetail
  }), d = await s.authenticate({
    onComplete: n.onThreeDSComplete,
    onError: n.onThreeDSError
  });
  return s.destroy(), d.status !== g.Success ? {
    ...r,
    status: B.Failed,
    message: d.status === g.Timeout ? "3DS challenge timed out" : ((u = d.error) == null ? void 0 : u.message) || "3DS challenge failed"
  } : await D(e, t, E.CONFIRM_PAYMENT, {
    orderId: n.orderId,
    confirmThreeDS: !0,
    threeDSecure: {
      type: "internal",
      authToken: (h = r.threeDSecure) == null ? void 0 : h.authToken,
      dsTransactionId: d.dsTransactionId ?? ((y = r.threeDSecure) == null ? void 0 : y.dsTransactionId),
      browser: de()
    }
  });
}
function De(e, t, n) {
  return D(e, t, E.VALIDATE, n);
}
function ke(e, t) {
  return D(e, t, E.RESET);
}
function Ae(e, t, n) {
  return D(e, t, E.CONFIG, n);
}
function Me(e, t, n) {
  return D(e, t, E.INIT, n);
}
function _e(e, t, n, r, a, s, d, o, i) {
  const u = e.data, {
    requestId: h,
    type: y,
    data: c,
    error: w
  } = u;
  if (y === E.READY) {
    if (r == null || r(), h && (t != null && t.has(h))) {
      const {
        resolve: S
      } = t.get(h);
      t.delete(h), S(c);
    }
    return;
  }
  if (ve(e.origin, ie)) {
    if (h && t && t.has(h)) {
      const {
        resolve: S,
        reject: b
      } = t.get(h);
      t.delete(h), w ? b(new Error(String(w.message))) : S(c);
      return;
    }
    if (y === E.ERROR) {
      n((w == null ? void 0 : w.message) || "Unknown error"), a == null || a(new Error(String(w == null ? void 0 : w.message)));
      return;
    }
    if (y === E.PAYMENT_COMPLETE) {
      c && typeof c == "object" && "status" in c && (s == null || s(c));
      return;
    }
    if (y === E.PAYMENT_FAILED) {
      c && typeof c == "object" && "status" in c && (d == null || d(c));
      return;
    }
    if (y === E.PAYMENT_PENDING) {
      c && typeof c == "object" && "status" in c && (o == null || o(c));
      return;
    }
    if (y === E.PAYMENT_METHOD_SELECTED) {
      c && typeof c == "object" && "paymentMethod" in c && (i == null || i(c.paymentMethod));
      return;
    }
    E.RESIZE;
  }
}
function je(e) {
  const [t, n] = v(
    () => !1
  ), [r, a] = v(() => null), [s, d] = v(
    () => ""
  ), [o, i] = v(() => null);
  return L(() => {
    const u = (...l) => {
      e.debug && console.log("[PayConductor]", ...l);
    }, h = Ce({
      publicKey: e.publicKey
    });
    d(h), n(!0);
    const y = x();
    let c = !1;
    u("init", e.publicKey), u("iframeUrl", h);
    const w = () => {
      var P, m;
      const l = (m = (P = window.PayConductor) == null ? void 0 : P.frame) == null ? void 0 : m.iframe;
      if (l) {
        if (l instanceof HTMLIFrameElement) return l;
        if (typeof l == "object" && l !== null) {
          const f = l;
          if ("current" in f && f.current instanceof HTMLIFrameElement)
            return f.current;
          if ("value" in f && f.value instanceof HTMLIFrameElement)
            return f.value;
        }
        return l;
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
      set iframe(l) {
      },
      iframeUrl: h,
      error: null
    }, b = {
      publicKey: e.publicKey,
      theme: e.theme,
      locale: e.locale,
      paymentMethods: e.paymentMethods,
      defaultPaymentMethod: e.defaultPaymentMethod
    }, k = {
      confirmPayment: (l) => {
        var m;
        u("→ CONFIRM_PAYMENT", {
          orderId: l.orderId
        });
        const P = w();
        return P != null && P.contentWindow && P.contentWindow.postMessage(
          {
            type: E.CONFIG,
            data: {
              publicKey: e.publicKey,
              orderId: l.orderId,
              theme: e.theme,
              locale: e.locale,
              paymentMethods: e.paymentMethods,
              defaultPaymentMethod: e.defaultPaymentMethod,
              showPaymentButtons: e.showPaymentButtons,
              nuPayConfig: e.nuPayConfig
            }
          },
          "*"
        ), b.orderId = l.orderId, (m = window.PayConductor) != null && m.config && (window.PayConductor.config.orderId = l.orderId), Ie(P, y, l);
      },
      validate: (l) => (u("→ VALIDATE", l), De(w(), y, l)),
      reset: () => (u("→ RESET"), ke(w(), y)),
      getSelectedPaymentMethod: () => o
    };
    window.PayConductor = {
      frame: S,
      config: b,
      api: k,
      selectedPaymentMethod: o
    }, u("registered"), window.dispatchEvent(
      new CustomEvent("payconductor:registered", {
        detail: window.PayConductor
      })
    );
    const p = async () => {
      if (!c) {
        const l = w();
        if (!l) {
          u("→ CONFIG skipped: iframe not found");
          return;
        }
        c = !0, u("→ CONFIG", {
          theme: e.theme,
          locale: e.locale,
          paymentMethods: e.paymentMethods,
          defaultPaymentMethod: e.defaultPaymentMethod,
          showPaymentButtons: e.showPaymentButtons
        }), Ae(l, y, {
          theme: e.theme,
          locale: e.locale,
          paymentMethods: e.paymentMethods,
          defaultPaymentMethod: e.defaultPaymentMethod,
          showPaymentButtons: e.showPaymentButtons,
          nuPayConfig: e.nuPayConfig
        });
      }
    }, V = (l) => {
      var P;
      (P = l.data) != null && P.type && u("←", l.data.type, l.data.data ?? ""), _e(
        l,
        y,
        (m) => {
          var f;
          a(m), S.error = m, (f = window.PayConductor) != null && f.frame && (window.PayConductor.frame.error = m);
        },
        () => {
          var m;
          (m = e.onReady) == null || m.call(e), p();
        },
        (m) => {
          var f;
          (f = e.onError) == null || f.call(e, m);
        },
        (m) => {
          var f;
          (f = e.onPaymentComplete) == null || f.call(e, m);
        },
        (m) => {
          var f;
          (f = e.onPaymentFailed) == null || f.call(e, m);
        },
        (m) => {
          var f;
          (f = e.onPaymentPending) == null || f.call(e, m);
        },
        (m) => {
          var f;
          i(m), window.PayConductor && (window.PayConductor.selectedPaymentMethod = m), (f = e.onPaymentMethodSelected) == null || f.call(e, m);
        }
      );
    };
    window.addEventListener("message", V);
    const W = () => {
      var P, m, f;
      const l = w();
      if (!l) return !1;
      try {
        if ((((P = l.contentDocument) == null ? void 0 : P.readyState) ?? ((f = (m = l.contentWindow) == null ? void 0 : m.document) == null ? void 0 : f.readyState)) === "complete")
          return p(), !0;
      } catch {
      }
      return !1;
    }, U = () => {
      if (W()) return;
      const l = w();
      if (l) {
        l.addEventListener("load", () => p(), {
          once: !0
        });
        return;
      }
      setTimeout(U, 50);
    };
    U();
  }, []), /* @__PURE__ */ A(
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
function Ve(e) {
  const t = J(null), [n, r] = v(() => ""), [a, s] = v(() => !1), [d, o] = v(() => "");
  return L(() => {
    if (typeof document < "u" && !document.getElementById(F)) {
      const c = document.createElement("style");
      c.id = F, c.textContent = Se, document.head.appendChild(c);
    }
    const i = (c) => {
      c != null && c.frame && (r(c.frame.iframeUrl || ""), s(!0), console.log("init", {
        PayConductor: window.PayConductor
      }));
    }, u = typeof window < "u" ? window.PayConductor : null;
    if (u)
      i(u);
    else {
      const c = (w) => {
        i(w.detail), window.removeEventListener("payconductor:registered", c);
      };
      window.addEventListener("payconductor:registered", c);
    }
    let h = !1;
    const y = (c) => {
      var w, S, b, k;
      if (((w = c.data) == null ? void 0 : w.type) === E.RESIZE && ((b = (S = c.data) == null ? void 0 : S.data) != null && b.height) && o(c.data.data.height + "px"), ((k = c.data) == null ? void 0 : k.type) === E.READY && e.height && !h) {
        h = !0;
        const p = document.querySelector(
          ".payconductor-element iframe"
        );
        p != null && p.contentWindow && p.contentWindow.postMessage(
          {
            type: E.CONFIG,
            data: {
              height: e.height
            },
            requestId: "element-height"
          },
          "*"
        );
      }
    };
    return window.addEventListener("message", y), () => window.removeEventListener("message", y);
  }, []), /* @__PURE__ */ $(
    "div",
    {
      className: "payconductor-element",
      style: {
        width: "100%"
      },
      children: [
        a ? null : /* @__PURE__ */ A(
          "div",
          {
            className: "payconductor-skeleton",
            style: {
              height: e.height || O
            }
          }
        ),
        a && n ? /* @__PURE__ */ A(
          "iframe",
          {
            allow: "payment",
            title: "PayConductor",
            ref: t,
            src: n,
            style: {
              width: "100%",
              height: e.height || d || O,
              border: "none"
            }
          }
        ) : null
      ]
    }
  );
}
function We(e) {
  const [t, n] = v(() => !1);
  return L(() => {
    const r = () => {
      n(!0);
    }, a = () => {
      n(!1);
    };
    return window.addEventListener("payconductor:3ds:show", r), window.addEventListener("payconductor:3ds:hide", a), typeof window < "u" && (window.PayConductor3DS = {
      container: () => document.getElementById("payconductor-3ds-container"),
      show: r,
      hide: a
    }, window.dispatchEvent(new CustomEvent("payconductor:3ds:registered"))), () => {
      window.removeEventListener("payconductor:3ds:show", r), window.removeEventListener("payconductor:3ds:hide", a), window.PayConductor3DS = null;
    };
  }, []), /* @__PURE__ */ A(
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
function Ye() {
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
function R(e) {
  var t;
  if ((t = e == null ? void 0 : e.frame) != null && t.iframe) {
    const n = e.frame.iframe;
    if (n instanceof HTMLIFrameElement) return n;
    if (n && typeof n == "object") {
      if ("current" in n) {
        const r = n.current;
        if (r instanceof HTMLIFrameElement) return r;
      }
      if ("value" in n) {
        const r = n.value;
        if (r instanceof HTMLIFrameElement) return r;
      }
    }
  }
  return document.querySelector(".payconductor-element iframe") ?? null;
}
function Ge() {
  const e = () => typeof window < "u" ? window.PayConductor : null, t = (n, r) => {
    const a = e();
    if (!a) return;
    const s = R(a);
    s != null && s.contentWindow && s.contentWindow.postMessage({
      type: n,
      data: r
    }, "*");
  };
  return {
    init: async (n) => {
      const r = R(e()), a = x();
      return Me(r || void 0, a, n);
    },
    confirmPayment: async (n) => {
      if (!n.orderId)
        throw new Error("Order ID is required");
      const r = e();
      if (!(r != null && r.api)) throw new Error("PayConductor not initialized");
      return r.api.confirmPayment(n);
    },
    validate: (n) => {
      const r = e();
      return r ? r.api.validate(n) : Promise.resolve(!1);
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
      var a;
      const r = (a = e()) == null ? void 0 : a.config;
      t(E.CONFIG, {
        publicKey: r == null ? void 0 : r.publicKey,
        orderId: r == null ? void 0 : r.orderId,
        theme: n.theme ?? (r == null ? void 0 : r.theme),
        locale: n.locale ?? (r == null ? void 0 : r.locale),
        paymentMethods: n.paymentMethods ?? (r == null ? void 0 : r.paymentMethods)
      });
    },
    updateOrderId: (n) => {
      var a;
      const r = (a = e()) == null ? void 0 : a.config;
      t(E.CONFIG, {
        publicKey: r == null ? void 0 : r.publicKey,
        orderId: n,
        theme: r == null ? void 0 : r.theme,
        locale: r == null ? void 0 : r.locale,
        paymentMethods: r == null ? void 0 : r.paymentMethods
      });
    },
    update: (n) => {
      t(E.UPDATE, n);
    },
    submit: async () => {
      const n = R(e()), r = x();
      try {
        return await D(n || void 0, r, E.CONFIRM_PAYMENT, {}), {
          paymentMethod: void 0
        };
      } catch (a) {
        return {
          error: {
            message: a instanceof Error ? a.message : "Payment failed",
            code: "payment_error",
            type: "payment_error"
          }
        };
      }
    }
  };
}
function $e(e) {
  let t = null;
  return {
    handleChallenge: async (a, s) => {
      var i;
      if (!(a.status === "NeedChallenge" || a.statusDetail === "ThreeDsAwaitingChallenge"))
        return {
          status: g.Success
        };
      (i = e == null ? void 0 : e.onChallenge) == null || i.call(e), t = new H(a);
      const o = await t.authenticate({
        providerData: s,
        onComplete: e == null ? void 0 : e.onComplete,
        onError: e == null ? void 0 : e.onError,
        onTimeout: e == null ? void 0 : e.onTimeout
      });
      return t.destroy(), t = null, o;
    },
    destroy: () => {
      t == null || t.destroy(), t = null;
    }
  };
}
class Ne extends Error {
  constructor(t, n) {
    super(t), this.title = n, this.name = "PayConductorApiError";
  }
}
class Re {
  constructor(t) {
    this.publicKey = t;
  }
  async getSettings() {
    const t = await fetch(`${this.baseUrl}/card-tokenization/settings`, {
      method: "GET",
      headers: this.headers
    });
    return t.ok || await this.parseResponseError("Failed to fetch settings", t), t.json();
  }
  async createToken(t) {
    const n = await fetch(`${this.baseUrl}/card-tokenization/tokenize`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(t)
    });
    return n.ok || await this.parseResponseError("Failed to generate token", n), n.json();
  }
  async saveTokens(t, n, r) {
    const a = await fetch(`${this.baseUrl}/card-tokenization/save-tokens/${n}/${r}`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(t)
    });
    a.ok || await this.parseResponseError("Failed to save tokens", a);
  }
  async parseResponseError(t, n) {
    var a, s, d, o;
    let r = "";
    try {
      const i = await n.json();
      i != null && i.message ? r = i.message : (a = i == null ? void 0 : i.error) != null && a.message ? r = i.error : (d = (s = i == null ? void 0 : i.error) == null ? void 0 : s.value) != null && d.message ? r = i.error.value.message : (o = i == null ? void 0 : i.value) != null && o.message ? r = i.value.message : r = JSON.stringify(i);
    } catch {
    }
    throw new Ne(r, t);
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
var q = /* @__PURE__ */ ((e) => (e.Cpf = "Cpf", e.Cnpj = "Cnpj", e))(q || {}), j = /* @__PURE__ */ ((e) => (e.Asaas = "Asaas", e.Sandbox = "Sandbox", e.MercadoPago = "MercadoPago", e.NuPay = "NuPay", e.PicPay = "PicPay", e.Woovi = "Woovi", e.PagarMe = "PagarMe", e.PagSeguro = "PagSeguro", e.BancoDoBrasil = "BancoDoBrasil", e))(j || {});
class xe {
  constructor(t) {
    this.input = t;
  }
}
class Le extends xe {
  constructor() {
    super(...arguments);
    T(this, "scriptUrl", "https://sdk.mercadopago.com/js/v2");
  }
  async tokenize() {
    if (!("publicKey" in this.input.setting))
      throw new Error("MercadoPago public key is missing in settings");
    if (!this.input.customer.documentNumber)
      throw new Error("Customer document number is required for tokenization");
    const n = window.MercadoPago;
    if (!n) throw new Error("MercadoPago SDK not available");
    const r = new n(this.input.setting.publicKey), {
      expiration: a,
      cvv: s,
      number: d,
      holderName: o
    } = this.input.card;
    return (await r.createCardToken({
      cardExpirationMonth: String(a.month),
      cardExpirationYear: String(a.year),
      cardholderName: o,
      cardNumber: d,
      securityCode: s,
      identificationType: this.input.customer.documentType === q.Cpf ? "CPF" : "CNPJ",
      identificationNumber: this.input.customer.documentNumber
    })).id;
  }
}
const Ue = {
  [j.MercadoPago]: Le
};
class Oe {
  constructor(t) {
    T(this, "api");
    this.publicKey = t, this.api = new Re(this.publicKey);
  }
  async tokenizeCard(t) {
    this.validateCard(t);
    const {
      customerId: n,
      token: r
    } = await this.api.createToken({
      card: t.card,
      customer: t.customer,
      saveCard: !1
    }), {
      settings: a
    } = await this.api.getSettings(), d = (await Promise.all(a.map(async (o) => {
      const i = Ue[o.key];
      if (!i) return null;
      const u = new i({
        ...t,
        setting: o.settings
      });
      return await _(u.scriptUrl), {
        token: await u.tokenize(),
        integrationId: o.integrationId,
        providerKey: o.key
      };
    }))).filter((o) => o !== null);
    return d.length > 0 && await this.api.saveTokens(d, n, r), r;
  }
  validateCard(t) {
    const {
      number: n,
      cvv: r,
      expiration: a,
      holderName: s
    } = t.card;
    if (!n || !r || !(a != null && a.month) || !(a != null && a.year) || !s)
      throw new Error("Invalid card data");
  }
}
function Je(e) {
  const t = new Oe(e.publicKey);
  return {
    tokenizeCard: async (r) => {
      var a, s;
      try {
        const d = await t.tokenizeCard(r);
        return (a = e.onSuccess) == null || a.call(e, d), d;
      } catch (d) {
        const o = d instanceof Error ? d : new Error("Tokenization failed");
        return (s = e.onError) == null || s.call(e, o), null;
      }
    }
  };
}
export {
  ie as ALLOWED_ORIGINS,
  te as DeviceType,
  qe as ERROR_CODES,
  re as ErrorCode,
  oe as IFRAME_BASE_URL,
  O as IFRAME_DEFAULT_HEIGHT_VALUE,
  C as IncomingMessage,
  ne as InputStyleKey,
  I as OutgoingMessage,
  E as POST_MESSAGES,
  je as PayConductor,
  H as PayConductor3DSSDK,
  Ve as PayConductorCheckoutElement,
  We as PayConductorThreeDSElement,
  Oe as PayConductorTokenizeSDK,
  X as PaymentMethod,
  ee as PaymentMethodLayout,
  B as PaymentStatus,
  se as REQUEST_TIMEOUT,
  Se as SKELETON_CSS,
  F as SKELETON_STYLE_ID,
  Ce as buildIframeUrl,
  je as default,
  He as defaultTheme,
  pe as generateRequestId,
  ve as isValidOrigin,
  _ as loadScript,
  Ye as usePayConductor,
  Ge as usePayconductorElement,
  $e as useThreeDS,
  Je as useTokenize
};
//# sourceMappingURL=index.es.js.map
