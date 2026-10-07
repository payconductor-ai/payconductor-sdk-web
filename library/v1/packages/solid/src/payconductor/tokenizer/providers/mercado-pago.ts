import { AbstractTokenizerProvider } from "../types";
import { DocumentType } from "../../iframe/types";
export class MercadoPagoTokenizerProvider extends AbstractTokenizerProvider {
  scriptUrl = "https://sdk.mercadopago.com/js/v2";
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