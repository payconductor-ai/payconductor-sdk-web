import { loadScript } from "../../loader";
import { AbstractTokenizerProvider } from "../types";
import type { TokenizerFingerprints } from "../types";
import { DocumentType } from "../../iframe/types";

// Template literal: o renameImport do Mitosis remove "" de strings literais.
const SECURITY_SCRIPT_URL = `https://www.mercadopago.com/v2/security.js`;
const DEVICE_SESSION_POLL_INTERVAL_MS = 100;
const DEVICE_SESSION_TIMEOUT_MS = 1500;
export class MercadoPagoTokenizerProvider extends AbstractTokenizerProvider {
  scriptUrl = "https://sdk.mercadopago.com/js/v2";
  private deviceSessionId?: string;
  async getFingerprints(): Promise<TokenizerFingerprints | undefined> {
    const sessionId = await this.resolveDeviceSessionId();
    return sessionId ? {
      mercadoPagoSessionId: sessionId
    } : undefined;
  }
  async tokenize(): Promise<string> {
    const {
      publicKey
    } = this.input.setting;
    if (typeof publicKey !== "string" || !publicKey.trim()) {
      throw new Error("MercadoPago public key is missing in settings");
    }
    if (!this.input.customer.documentNumber) {
      throw new Error("Customer document number is required for tokenization");
    }
    const MP = window.MercadoPago;
    if (!MP) throw new Error("MercadoPago SDK not available");
    const mp = new MP(publicKey.trim());
    const {
      expiration,
      cvv,
      number,
      holderName
    } = this.input.card;
    const res = await mp.createCardToken({
      cardExpirationMonth: String(expiration.month).padStart(2, "0"),
      cardExpirationYear: String(expiration.year),
      cardholderName: holderName,
      cardNumber: number,
      securityCode: cvv,
      identificationType: this.input.customer.documentType === DocumentType.Cpf ? "CPF" : "CNPJ",
      identificationNumber: this.input.customer.documentNumber
    }).catch((error: unknown) => {
      throw new Error(this.describeMercadoPagoError(error));
    });
    if ("id" in res && res.id) return res.id;
    throw new Error(this.describeMercadoPagoError(res));
  }

  /** Lê o `MP_DEVICE_SESSION_ID` sem derrubar a tokenização quando indisponível. */
  private async resolveDeviceSessionId(): Promise<string | undefined> {
    if (this.deviceSessionId) return this.deviceSessionId;
    if (window.MP_DEVICE_SESSION_ID) {
      this.deviceSessionId = window.MP_DEVICE_SESSION_ID;
      return this.deviceSessionId;
    }
    try {
      await loadScript(SECURITY_SCRIPT_URL, {
        attributes: {
          view: "checkout"
        }
      });
    } catch {
      return undefined;
    }
    this.deviceSessionId = await this.waitForDeviceSessionId();
    return this.deviceSessionId;
  }

  /** O security.js grava o id de forma assíncrona; aguarda por um curto período. */
  private async waitForDeviceSessionId(): Promise<string | undefined> {
    const startedAt = Date.now();
    while (!window.MP_DEVICE_SESSION_ID) {
      if (Date.now() - startedAt >= DEVICE_SESSION_TIMEOUT_MS) {
        return undefined;
      }
      await new Promise(resolve => setTimeout(resolve, DEVICE_SESSION_POLL_INTERVAL_MS));
    }
    return window.MP_DEVICE_SESSION_ID;
  }
  private describeMercadoPagoError(error: unknown): string {
    if (typeof error === "string") return error;
    if (Array.isArray(error)) return error.map(item => this.describeMercadoPagoError(item)).join("; ");
    if (typeof error === "object" && error !== null) {
      if ("cause" in error && Array.isArray(error.cause) && error.cause.length > 0) {
        return this.describeMercadoPagoError(error.cause);
      }
      if ("message" in error && typeof error.message === "string") return error.message;
      if ("description" in error && typeof error.description === "string") return error.description;
    }
    return "Failed to tokenize card";
  }
}