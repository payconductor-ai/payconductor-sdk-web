var W = Object.defineProperty;
var G = (e, r, t) => r in e ? W(e, r, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[r] = t;
var p = (e, r, t) => G(e, typeof r != "symbol" ? r + "" : r, t);
import { jsx as _, jsxs as $ } from "react/jsx-runtime";
import { useState as b, useEffect as L, useRef as J } from "react";
const K = "https://iframe.payconductor.ai/v1", z = "http://localhost:5175/v1", Z = 3e4, X = "600px";
var Q = /* @__PURE__ */ ((e) => (e.Pix = "Pix", e.CreditCard = "CreditCard", e.DebitCard = "DebitCard", e.BankSlip = "BankSlip", e.Crypto = "Crypto", e.ApplePay = "ApplePay", e.NuPay = "NuPay", e.PicPay = "PicPay", e.AmazonPay = "AmazonPay", e.SepaDebit = "SepaDebit", e.GooglePay = "GooglePay", e))(Q || {}), ee = /* @__PURE__ */ ((e) => (e.Grid = "grid", e.Vertical = "vertical", e.Horizontal = "horizontal", e))(ee || {}), B = /* @__PURE__ */ ((e) => (e.Succeeded = "succeeded", e.Pending = "pending", e.Failed = "failed", e))(B || {}), te = /* @__PURE__ */ ((e) => (e.Android = "android", e.IOS = "ios", e.Web = "web", e))(te || {}), ne = /* @__PURE__ */ ((e) => (e.Padding = "padding", e.Radius = "radius", e.Color = "color", e.Background = "background", e.Shadow = "shadow", e))(ne || {}), v = /* @__PURE__ */ ((e) => (e.Init = "Init", e.Config = "Config", e.Update = "Update", e.ConfirmPayment = "ConfirmPayment", e.Validate = "Validate", e.Reset = "Reset", e))(v || {}), P = /* @__PURE__ */ ((e) => (e.Ready = "Ready", e.Error = "Error", e.PaymentComplete = "PaymentComplete", e.PaymentFailed = "PaymentFailed", e.PaymentPending = "PaymentPending", e.ValidationError = "ValidationError", e.PaymentMethodSelected = "PaymentMethodSelected", e.Resize = "Resize", e.ThreeDSChallenge = "ThreeDSChallenge", e.ThreeDSComplete = "ThreeDSComplete", e.ThreeDSFailed = "ThreeDSFailed", e))(P || {}), re = /* @__PURE__ */ ((e) => (e.InvalidClient = "InvalidClient", e.InvalidToken = "InvalidToken", e.NetworkError = "NetworkError", e.IframeNotReady = "IframeNotReady", e.PaymentDeclined = "PaymentDeclined", e.ValidationError = "ValidationError", e.Timeout = "Timeout", e))(re || {});
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
}, ae = typeof window < "u" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") && !window.location.search.includes("production"), oe = ae ? z : K, ie = [z, K], U = X, se = Z, E = {
  INIT: v.Init,
  CONFIG: v.Config,
  UPDATE: v.Update,
  CONFIRM_PAYMENT: v.ConfirmPayment,
  VALIDATE: v.Validate,
  RESET: v.Reset,
  READY: P.Ready,
  ERROR: P.Error,
  PAYMENT_COMPLETE: P.PaymentComplete,
  PAYMENT_FAILED: P.PaymentFailed,
  PAYMENT_PENDING: P.PaymentPending,
  VALIDATION_ERROR: P.ValidationError,
  PAYMENT_METHOD_SELECTED: P.PaymentMethodSelected,
  RESIZE: P.Resize
}, Ye = {
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
var C = /* @__PURE__ */ ((e) => (e.Success = "Success", e.Failed = "Failed", e.Timeout = "Timeout", e))(C || {});
class A {
  constructor(r, t) {
    p(this, "overlay", null);
    p(this, "modalContent", null);
    this.data = r, this.options = t;
  }
  fail(r) {
    var n, a;
    const t = new Error(r);
    return (a = (n = this.options).onError) == null || a.call(n, t), {
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
    const r = document.createElement("style");
    r.id = "payconductor-3ds-styles", r.textContent = `
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
		`, document.head.appendChild(r);
  }
  //#endregion
}
const ce = 5 * 60 * 1e3;
class ue extends A {
  constructor() {
    super(...arguments);
    p(this, "iframe", null);
    p(this, "messageListener", null);
    p(this, "timeoutId", null);
  }
  async authenticate() {
    const {
      threeDsUrl: t,
      creq: n
    } = this.data;
    if (!t || !n)
      return this.fail("Missing threeDsUrl or creq");
    const a = this.resolveContainer();
    return new Promise((o) => {
      var u;
      this.iframe = document.createElement("iframe"), this.iframe.name = "payconductor-3ds-challenge", this.iframe.id = "payconductor-3ds-challenge", a.appendChild(this.iframe), this.messageListener = (m) => {
        var h, c, w;
        ((h = m.data) == null ? void 0 : h.status) === "COMPLETE" && (this.cleanup(), (w = (c = this.options).onComplete) == null || w.call(c), o({
          status: C.Success
        }));
      }, window.addEventListener("message", this.messageListener), this.timeoutId = setTimeout(() => {
        var m, h;
        this.cleanup(), (h = (m = this.options).onTimeout) == null || h.call(m), o({
          status: C.Timeout
        });
      }, this.options.timeoutMs ?? ce);
      const d = (u = this.iframe.contentWindow) == null ? void 0 : u.document;
      if (!d) {
        this.cleanup(), o(this.fail("Cannot access iframe document"));
        return;
      }
      const s = d.createElement("form");
      s.name = "threeDsChallengeForm", s.setAttribute("target", "payconductor-3ds-challenge"), s.setAttribute("method", "post"), s.setAttribute("action", t);
      const i = d.createElement("input");
      i.setAttribute("type", "hidden"), i.setAttribute("name", "creq"), i.setAttribute("value", n), s.appendChild(i), this.iframe.appendChild(s), s.submit();
    });
  }
  cleanup() {
    this.timeoutId && (clearTimeout(this.timeoutId), this.timeoutId = null), this.messageListener && (window.removeEventListener("message", this.messageListener), this.messageListener = null), this.iframe && (this.iframe.remove(), this.iframe = null), this.closeModal();
  }
}
const k = /* @__PURE__ */ new Map();
function R(e) {
  const r = k.get(e);
  if (r) return r;
  const t = new Promise((n, a) => {
    if (document.querySelector(`script[src="${e}"]`)) {
      n();
      return;
    }
    const o = document.createElement("script");
    o.src = e, o.async = !0, o.onload = () => n(), o.onerror = () => {
      k.delete(e), a(new Error(`Failed to load script: ${e}`));
    }, (document.head || document.body).appendChild(o);
  });
  return k.set(e, t), t;
}
const le = "https://static.payzen.lat/static/js/authenticate-client/V1.0/kr-authenticate.umd", he = 10 * 60 * 1e3;
class me extends A {
  constructor() {
    super(...arguments);
    p(this, "timeoutId", null);
  }
  async authenticate() {
    const {
      operationUrl: t,
      publicKey: n
    } = this.data;
    if (!t || !n)
      return this.fail("Missing operationUrl or publicKey");
    try {
      await R(le);
    } catch {
      return this.fail("Failed to load 3DS SDK");
    }
    const a = window.KrAuthenticate;
    return a ? new Promise((o) => {
      this.timeoutId = setTimeout(() => {
        var s, i;
        this.cleanup(), (i = (s = this.options).onTimeout) == null || i.call(s), o({
          status: C.Timeout
        });
      }, this.options.timeoutMs ?? he), new a(n).authenticate(t, () => {
        var s, i;
        this.cleanup(), (i = (s = this.options).onComplete) == null || i.call(s), o({
          status: C.Success
        });
      });
    }) : this.fail("KrAuthenticate not available");
  }
  cleanup() {
    this.timeoutId && (clearTimeout(this.timeoutId), this.timeoutId = null);
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
class ge extends A {
  constructor() {
    super(...arguments);
    p(this, "timeoutId", null);
    p(this, "methodContainer", null);
  }
  async authenticate() {
    const {
      authToken: t,
      card: n
    } = this.data;
    if (!t) return this.fail("Missing authToken for PagarMe 3DS");
    if (!n) return this.fail("Missing card data for PagarMe 3DS");
    const a = this.data.environment ?? "Production";
    try {
      await R(fe[a]);
    } catch {
      return this.fail("Failed to load Stone 3DS SDK");
    }
    const o = window.TDS;
    if (!o) return this.fail("Stone TDS SDK not available");
    const d = this.resolveContainer();
    return this.methodContainer = document.createElement("div"), this.methodContainer.style.display = "none", document.body.appendChild(this.methodContainer), new Promise((s) => {
      this.timeoutId = setTimeout(() => {
        var i, u;
        this.cleanup(), (u = (i = this.options).onTimeout) == null || u.call(i), s({
          status: C.Timeout
        });
      }, this.options.timeoutMs ?? ye), o.init({
        token: t,
        tds_method_container_element: this.methodContainer,
        challenge_container_element: d,
        use_default_challenge_iframe_style: !0,
        challenge_window_size: we()
      }, this.buildOrderData()).then((i) => {
        var m, h;
        if (this.cleanup(), !(i != null && i.length)) {
          s(this.fail("PagarMe 3DS returned no response"));
          return;
        }
        const u = i[0];
        if (u.challenge_canceled) {
          s(this.fail("3DS challenge canceled by user"));
          return;
        }
        u.trans_status === "Y" || u.trans_status === "A" ? ((h = (m = this.options).onComplete) == null || h.call(m), s({
          status: C.Success,
          dsTransactionId: u.tds_server_trans_id
        })) : s(this.fail(`3DS failed with status: ${u.trans_status}`));
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
      customer: n,
      amount: a,
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
        amount: a
      }],
      ...n ? {
        customer: {
          name: n.name,
          email: n.email,
          ...n.document ? {
            document: n.document
          } : {},
          ...(d = n.phones) != null && d.length ? {
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
const Ee = "https://assets.pagseguro.com.br/checkout-sdk-js/rc/dist/browser/pagseguro.min";
class Ce extends A {
  async authenticate() {
    var h, c, w;
    const {
      authToken: r,
      card: t,
      customer: n,
      amount: a,
      currency: o,
      billingAddress: d
    } = this.data;
    if (!r) return this.fail("Missing authToken (session) for PagSeguro 3DS");
    if (!t) return this.fail("Missing card data for PagSeguro 3DS");
    if (!n) return this.fail("Missing customer data for PagSeguro 3DS");
    if (!a) return this.fail("Missing amount for PagSeguro 3DS");
    if (!d) return this.fail("Missing billingAddress for PagSeguro 3DS");
    const s = this.data.environment === "Sandbox" ? "SANDBOX" : "PROD";
    try {
      await R(Ee);
    } catch {
      return this.fail("Failed to load PagSeguro SDK");
    }
    const i = window.PagSeguro;
    if (!i) return this.fail("PagSeguro SDK not available");
    i.setUp({
      session: r,
      env: s
    });
    const u = ((h = n.phones) == null ? void 0 : h.map((g) => ({
      country: g.countryCode,
      area: g.areaCode,
      number: g.number,
      type: g.type ?? "MOBILE"
    }))) ?? [{
      country: "55",
      area: "11",
      number: "999999999",
      type: "MOBILE"
    }];
    u.some((g) => g.type === "MOBILE") || (u[0].type = "MOBILE");
    try {
      const g = await i.authenticate3DS({
        data: {
          customer: {
            name: n.name,
            email: n.email,
            phones: u
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
            value: a,
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
      return g.status === "AUTH_FLOW_COMPLETED" || g.status === "AUTH_NOT_SUPPORTED" ? ((w = (c = this.options).onComplete) == null || w.call(c), {
        status: C.Success,
        dsTransactionId: g.id
      }) : g.status === "CHANGE_PAYMENT_METHOD" ? this.fail("PagSeguro requires a different payment method") : {
        status: C.Success,
        dsTransactionId: g.id
      };
    } catch (g) {
      return this.fail(g instanceof Error ? g.message : "PagSeguro 3DS failed");
    }
  }
  cleanup() {
  }
  toAlpha3(r) {
    return {
      BR: "BRA",
      US: "USA",
      AR: "ARG",
      CL: "CHL",
      CO: "COL",
      MX: "MEX",
      PE: "PER",
      UY: "URY"
    }[r.toUpperCase()] ?? r;
  }
}
const Se = {
  MercadoPago: ue,
  PayConductor: me,
  PagarMe: ge,
  PagSeguro: Ce
};
class H {
  constructor(r) {
    p(this, "data");
    p(this, "provider", null);
    this.data = r;
  }
  get needsChallenge() {
    return this.data.status === "NeedChallenge" || this.data.statusDetail === "ThreeDsAwaitingChallenge";
  }
  get acquirer() {
    return this.data.acquirer;
  }
  async authenticate(r) {
    if (!this.needsChallenge)
      return {
        status: C.Success
      };
    const {
      acquirer: t
    } = this.data;
    if (!t)
      return {
        status: C.Failed,
        error: new Error("Missing 3DS acquirer")
      };
    const n = Se[t];
    if (!n)
      return {
        status: C.Failed,
        error: new Error(`Unsupported 3DS provider: ${t}`)
      };
    const a = {
      ...r,
      threeDSecure: this.data
    };
    return this.provider = new n(this.data, a), this.provider.authenticate();
  }
  destroy() {
    this.provider && (this.provider.cleanup(), this.provider = null);
  }
}
const F = "payconductor-skeleton-style", pe = `
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
function Pe(e) {
  const r = new URLSearchParams({
    publicKey: e.publicKey
  });
  return `${oe}?${r.toString()}`;
}
function Te() {
  return crypto.randomUUID();
}
function be(e, r) {
  return r.some((t) => {
    try {
      return new URL(t).origin === e;
    } catch {
      return t === e;
    }
  });
}
function x() {
  return /* @__PURE__ */ new Map();
}
function D(e, r, t, n) {
  return new Promise((a, o) => {
    if (!e || !("contentWindow" in e)) {
      o(new Error("Iframe not defined"));
      return;
    }
    if (!(e != null && e.contentWindow)) {
      o(new Error("Iframe not ready"));
      return;
    }
    if (!r) {
      o(new Error("Pending requests not initialized"));
      return;
    }
    const d = Te();
    r.set(d, {
      resolve: a,
      reject: o
    }), e.contentWindow.postMessage({
      type: t,
      data: n,
      requestId: d
    }, "*"), setTimeout(() => {
      r != null && r.has(d) && (r.delete(d), o(new Error("Request timeout")));
    }, se);
  });
}
function Ie(e, r, t) {
  return D(e, r, E.CONFIRM_PAYMENT, t);
}
async function ve(e, r, t) {
  var s, i, u, m, h;
  const n = await Ie(e, r, {
    orderId: t.orderId
  });
  if (!(n.statusDetail === "ThreeDsAwaitingChallenge" || ((s = n.threeDSecure) == null ? void 0 : s.status) === "NeedChallenge") || !n.threeDSecure) return n;
  (i = t.onThreeDSChallenge) == null || i.call(t);
  const o = new H({
    ...n.threeDSecure,
    statusDetail: n.statusDetail
  }), d = await o.authenticate({
    onComplete: t.onThreeDSComplete,
    onError: t.onThreeDSError
  });
  return o.destroy(), d.status !== C.Success ? {
    ...n,
    status: B.Failed,
    message: d.status === C.Timeout ? "3DS challenge timed out" : ((u = d.error) == null ? void 0 : u.message) || "3DS challenge failed"
  } : await D(e, r, E.CONFIRM_PAYMENT, {
    orderId: t.orderId,
    confirmThreeDS: !0,
    threeDSecure: {
      type: "internal",
      authToken: (m = n.threeDSecure) == null ? void 0 : m.authToken,
      dsTransactionId: d.dsTransactionId ?? ((h = n.threeDSecure) == null ? void 0 : h.dsTransactionId),
      browser: de()
    }
  });
}
function De(e, r, t) {
  return D(e, r, E.VALIDATE, t);
}
function Me(e, r) {
  return D(e, r, E.RESET);
}
function _e(e, r, t) {
  return D(e, r, E.CONFIG, t);
}
function Ae(e, r, t) {
  return D(e, r, E.INIT, t);
}
function Re(e, r, t, n, a, o, d, s, i) {
  const u = e.data, {
    requestId: m,
    type: h,
    data: c,
    error: w
  } = u;
  if (h === E.READY) {
    if (n == null || n(), m && (r != null && r.has(m))) {
      const {
        resolve: g
      } = r.get(m);
      r.delete(m), g(c);
    }
    return;
  }
  if (be(e.origin, ie)) {
    if (m && r && r.has(m)) {
      const {
        resolve: g,
        reject: I
      } = r.get(m);
      r.delete(m), w ? I(new Error(String(w.message))) : g(c);
      return;
    }
    if (h === E.ERROR) {
      t((w == null ? void 0 : w.message) || "Unknown error"), a == null || a(new Error(String(w == null ? void 0 : w.message)));
      return;
    }
    if (h === E.PAYMENT_COMPLETE) {
      c && typeof c == "object" && "status" in c && (o == null || o(c));
      return;
    }
    if (h === E.PAYMENT_FAILED) {
      c && typeof c == "object" && "status" in c && (d == null || d(c));
      return;
    }
    if (h === E.PAYMENT_PENDING) {
      c && typeof c == "object" && "status" in c && (s == null || s(c));
      return;
    }
    if (h === E.PAYMENT_METHOD_SELECTED) {
      c && typeof c == "object" && "paymentMethod" in c && (i == null || i(c.paymentMethod));
      return;
    }
    E.RESIZE;
  }
}
function je(e) {
  const [r, t] = b(
    () => !1
  ), [n, a] = b(() => null), [o, d] = b(
    () => ""
  ), [s, i] = b(() => null);
  return L(() => {
    const u = (...l) => {
      e.debug && console.log("[PayConductor]", ...l);
    }, m = Pe({
      publicKey: e.publicKey
    });
    d(m), t(!0);
    const h = x();
    let c = !1;
    u("init", e.publicKey), u("iframeUrl", m);
    const w = () => {
      var S, f;
      const l = (f = (S = window.PayConductor) == null ? void 0 : S.frame) == null ? void 0 : f.iframe;
      if (l) {
        if (l instanceof HTMLIFrameElement) return l;
        if (typeof l == "object" && l !== null) {
          const y = l;
          if ("current" in y && y.current instanceof HTMLIFrameElement)
            return y.current;
          if ("value" in y && y.value instanceof HTMLIFrameElement)
            return y.value;
        }
        return l;
      }
      return document.querySelector(
        ".payconductor-element iframe"
      ) ?? void 0;
    }, g = {
      get iframe() {
        return document.querySelector(
          ".payconductor-element iframe"
        ) ?? null;
      },
      set iframe(l) {
      },
      iframeUrl: m,
      error: null
    }, I = {
      publicKey: e.publicKey,
      theme: e.theme,
      locale: e.locale,
      paymentMethods: e.paymentMethods,
      defaultPaymentMethod: e.defaultPaymentMethod
    }, M = {
      confirmPayment: (l) => {
        var f;
        u("→ CONFIRM_PAYMENT", {
          orderId: l.orderId
        });
        const S = w();
        return S != null && S.contentWindow && S.contentWindow.postMessage(
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
        ), I.orderId = l.orderId, (f = window.PayConductor) != null && f.config && (window.PayConductor.config.orderId = l.orderId), ve(S, h, l);
      },
      validate: (l) => (u("→ VALIDATE", l), De(w(), h, l)),
      reset: () => (u("→ RESET"), Me(w(), h)),
      getSelectedPaymentMethod: () => s
    };
    window.PayConductor = {
      frame: g,
      config: I,
      api: M,
      selectedPaymentMethod: s
    }, u("registered"), window.dispatchEvent(
      new CustomEvent("payconductor:registered", {
        detail: window.PayConductor
      })
    );
    const T = async () => {
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
        }), _e(l, h, {
          theme: e.theme,
          locale: e.locale,
          paymentMethods: e.paymentMethods,
          defaultPaymentMethod: e.defaultPaymentMethod,
          showPaymentButtons: e.showPaymentButtons,
          nuPayConfig: e.nuPayConfig
        });
      }
    }, q = (l) => {
      var S;
      (S = l.data) != null && S.type && u("←", l.data.type, l.data.data ?? ""), Re(
        l,
        h,
        (f) => {
          var y;
          a(f), g.error = f, (y = window.PayConductor) != null && y.frame && (window.PayConductor.frame.error = f);
        },
        () => {
          var f;
          (f = e.onReady) == null || f.call(e), T();
        },
        (f) => {
          var y;
          (y = e.onError) == null || y.call(e, f);
        },
        (f) => {
          var y;
          (y = e.onPaymentComplete) == null || y.call(e, f);
        },
        (f) => {
          var y;
          (y = e.onPaymentFailed) == null || y.call(e, f);
        },
        (f) => {
          var y;
          (y = e.onPaymentPending) == null || y.call(e, f);
        },
        (f) => {
          var y;
          i(f), window.PayConductor && (window.PayConductor.selectedPaymentMethod = f), (y = e.onPaymentMethodSelected) == null || y.call(e, f);
        }
      );
    };
    window.addEventListener("message", q);
    const V = () => {
      var S, f, y;
      const l = w();
      if (!l) return !1;
      try {
        if ((((S = l.contentDocument) == null ? void 0 : S.readyState) ?? ((y = (f = l.contentWindow) == null ? void 0 : f.document) == null ? void 0 : y.readyState)) === "complete")
          return T(), !0;
      } catch {
      }
      return !1;
    }, O = () => {
      if (V()) return;
      const l = w();
      if (l) {
        l.addEventListener("load", () => T(), {
          once: !0
        });
        return;
      }
      setTimeout(O, 50);
    };
    O();
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
function qe(e) {
  const r = J(null), [t, n] = b(() => ""), [a, o] = b(() => !1), [d, s] = b(() => "");
  return L(() => {
    if (typeof document < "u" && !document.getElementById(F)) {
      const c = document.createElement("style");
      c.id = F, c.textContent = pe, document.head.appendChild(c);
    }
    const i = (c) => {
      c != null && c.frame && (n(c.frame.iframeUrl || ""), o(!0), console.log("init", {
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
    let m = !1;
    const h = (c) => {
      var w, g, I, M;
      if (((w = c.data) == null ? void 0 : w.type) === E.RESIZE && ((I = (g = c.data) == null ? void 0 : g.data) != null && I.height) && s(c.data.data.height + "px"), ((M = c.data) == null ? void 0 : M.type) === E.READY && e.height && !m) {
        m = !0;
        const T = document.querySelector(
          ".payconductor-element iframe"
        );
        T != null && T.contentWindow && T.contentWindow.postMessage(
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
    return window.addEventListener("message", h), () => window.removeEventListener("message", h);
  }, []), /* @__PURE__ */ $(
    "div",
    {
      className: "payconductor-element",
      style: {
        width: "100%"
      },
      children: [
        a ? null : /* @__PURE__ */ _(
          "div",
          {
            className: "payconductor-skeleton",
            style: {
              height: e.height || U
            }
          }
        ),
        a && t ? /* @__PURE__ */ _(
          "iframe",
          {
            allow: "payment",
            title: "PayConductor",
            ref: r,
            src: t,
            style: {
              width: "100%",
              height: e.height || d || U,
              border: "none"
            }
          }
        ) : null
      ]
    }
  );
}
function Ve(e) {
  const [r, t] = b(() => !1);
  return L(() => {
    const n = () => {
      t(!0);
    }, a = () => {
      t(!1);
    };
    return window.addEventListener("payconductor:3ds:show", n), window.addEventListener("payconductor:3ds:hide", a), typeof window < "u" && (window.PayConductor3DS = {
      container: () => document.getElementById("payconductor-3ds-container"),
      show: n,
      hide: a
    }, window.dispatchEvent(new CustomEvent("payconductor:3ds:registered"))), () => {
      window.removeEventListener("payconductor:3ds:show", n), window.removeEventListener("payconductor:3ds:hide", a), window.PayConductor3DS = null;
    };
  }, []), /* @__PURE__ */ _(
    "div",
    {
      className: "payconductor-three-ds",
      id: "payconductor-3ds-container",
      style: {
        width: "100%",
        display: r ? "block" : "none",
        minHeight: r ? e.height || "600px" : "0"
      }
    }
  );
}
function We() {
  const e = typeof window < "u" ? window.PayConductor : null, r = e != null && e.config ? {
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
function Ge() {
  const e = () => typeof window < "u" ? window.PayConductor : null, r = (t, n) => {
    const a = e();
    if (!a) return;
    const o = N(a);
    o != null && o.contentWindow && o.contentWindow.postMessage({
      type: t,
      data: n
    }, "*");
  };
  return {
    init: async (t) => {
      const n = N(e()), a = x();
      return Ae(n || void 0, a, t);
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
      var a;
      const n = (a = e()) == null ? void 0 : a.config;
      r(E.CONFIG, {
        publicKey: n == null ? void 0 : n.publicKey,
        orderId: n == null ? void 0 : n.orderId,
        theme: t.theme ?? (n == null ? void 0 : n.theme),
        locale: t.locale ?? (n == null ? void 0 : n.locale),
        paymentMethods: t.paymentMethods ?? (n == null ? void 0 : n.paymentMethods)
      });
    },
    updateOrderId: (t) => {
      var a;
      const n = (a = e()) == null ? void 0 : a.config;
      r(E.CONFIG, {
        publicKey: n == null ? void 0 : n.publicKey,
        orderId: t,
        theme: n == null ? void 0 : n.theme,
        locale: n == null ? void 0 : n.locale,
        paymentMethods: n == null ? void 0 : n.paymentMethods
      });
    },
    update: (t) => {
      r(E.UPDATE, t);
    },
    submit: async () => {
      const t = N(e()), n = x();
      try {
        return await D(t || void 0, n, E.CONFIRM_PAYMENT, {}), {
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
  let r = null;
  return {
    handleChallenge: async (a) => {
      var s;
      if (!(a.status === "NeedChallenge" || a.statusDetail === "ThreeDsAwaitingChallenge"))
        return {
          status: C.Success
        };
      (s = e == null ? void 0 : e.onChallenge) == null || s.call(e), r = new H(a);
      const d = await r.authenticate({
        onComplete: e == null ? void 0 : e.onComplete,
        onError: e == null ? void 0 : e.onError,
        onTimeout: e == null ? void 0 : e.onTimeout
      });
      return r.destroy(), r = null, d;
    },
    destroy: () => {
      r == null || r.destroy(), r = null;
    }
  };
}
class ke extends Error {
  constructor(r, t) {
    super(r), this.title = t, this.name = "PayConductorApiError";
  }
}
class Ne {
  constructor(r) {
    this.publicKey = r;
  }
  async getSettings() {
    const r = await fetch(`${this.baseUrl}/card-tokenization/settings`, {
      method: "GET",
      headers: this.headers
    });
    return r.ok || await this.parseResponseError("Failed to fetch settings", r), r.json();
  }
  async createToken(r) {
    const t = await fetch(`${this.baseUrl}/card-tokenization/tokenize`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(r)
    });
    return t.ok || await this.parseResponseError("Failed to generate token", t), t.json();
  }
  async saveTokens(r, t, n) {
    const a = await fetch(`${this.baseUrl}/card-tokenization/save-tokens/${t}/${n}`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(r)
    });
    a.ok || await this.parseResponseError("Failed to save tokens", a);
  }
  async parseResponseError(r, t) {
    var a, o, d, s;
    let n = "";
    try {
      const i = await t.json();
      i != null && i.message ? n = i.message : (a = i == null ? void 0 : i.error) != null && a.message ? n = i.error : (d = (o = i == null ? void 0 : i.error) == null ? void 0 : o.value) != null && d.message ? n = i.error.value.message : (s = i == null ? void 0 : i.value) != null && s.message ? n = i.value.message : n = JSON.stringify(i);
    } catch {
    }
    throw new ke(n, r);
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
var Y = /* @__PURE__ */ ((e) => (e.Cpf = "Cpf", e.Cnpj = "Cnpj", e))(Y || {}), j = /* @__PURE__ */ ((e) => (e.Asaas = "Asaas", e.Sandbox = "Sandbox", e.MercadoPago = "MercadoPago", e.NuPay = "NuPay", e.PicPay = "PicPay", e.Woovi = "Woovi", e.PagarMe = "PagarMe", e.PagSeguro = "PagSeguro", e.BancoDoBrasil = "BancoDoBrasil", e))(j || {});
class xe {
  constructor(r) {
    this.input = r;
  }
}
class Le extends xe {
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
    const n = new t(this.input.setting.publicKey), {
      expiration: a,
      cvv: o,
      number: d,
      holderName: s
    } = this.input.card;
    return (await n.createCardToken({
      cardExpirationMonth: String(a.month),
      cardExpirationYear: String(a.year),
      cardholderName: s,
      cardNumber: d,
      securityCode: o,
      identificationType: this.input.customer.documentType === Y.Cpf ? "CPF" : "CNPJ",
      identificationNumber: this.input.customer.documentNumber
    })).id;
  }
}
const Oe = {
  [j.MercadoPago]: Le
};
class Ue {
  constructor(r) {
    p(this, "api");
    this.publicKey = r, this.api = new Ne(this.publicKey);
  }
  async tokenizeCard(r) {
    this.validateCard(r);
    const {
      customerId: t,
      token: n
    } = await this.api.createToken({
      card: r.card,
      customer: r.customer,
      saveCard: !1
    }), {
      settings: a
    } = await this.api.getSettings(), d = (await Promise.all(a.map(async (s) => {
      const i = Oe[s.key];
      if (!i) return null;
      const u = new i({
        ...r,
        setting: s.settings
      });
      return await R(u.scriptUrl), {
        token: await u.tokenize(),
        integrationId: s.integrationId,
        providerKey: s.key
      };
    }))).filter((s) => s !== null);
    return d.length > 0 && await this.api.saveTokens(d, t, n), n;
  }
  validateCard(r) {
    const {
      number: t,
      cvv: n,
      expiration: a,
      holderName: o
    } = r.card;
    if (!t || !n || !(a != null && a.month) || !(a != null && a.year) || !o)
      throw new Error("Invalid card data");
  }
}
function Je(e) {
  const r = new Ue(e.publicKey);
  return {
    tokenizeCard: async (n) => {
      var a, o;
      try {
        const d = await r.tokenizeCard(n);
        return (a = e.onSuccess) == null || a.call(e, d), d;
      } catch (d) {
        const s = d instanceof Error ? d : new Error("Tokenization failed");
        return (o = e.onError) == null || o.call(e, s), null;
      }
    }
  };
}
export {
  ie as ALLOWED_ORIGINS,
  te as DeviceType,
  Ye as ERROR_CODES,
  re as ErrorCode,
  oe as IFRAME_BASE_URL,
  U as IFRAME_DEFAULT_HEIGHT_VALUE,
  P as IncomingMessage,
  ne as InputStyleKey,
  v as OutgoingMessage,
  E as POST_MESSAGES,
  je as PayConductor,
  H as PayConductor3DSSDK,
  qe as PayConductorCheckoutElement,
  Ve as PayConductorThreeDSElement,
  Ue as PayConductorTokenizeSDK,
  Q as PaymentMethod,
  ee as PaymentMethodLayout,
  B as PaymentStatus,
  se as REQUEST_TIMEOUT,
  pe as SKELETON_CSS,
  F as SKELETON_STYLE_ID,
  Pe as buildIframeUrl,
  je as default,
  He as defaultTheme,
  Te as generateRequestId,
  be as isValidOrigin,
  R as loadScript,
  We as usePayConductor,
  Ge as usePayconductorElement,
  $e as useThreeDS,
  Je as useTokenize
};
//# sourceMappingURL=index.es.js.map
