import { AbstractTokenizeProvider } from "../types";
import { DocumentType } from "../../iframe/types";
export class MercadoPagoTokenizeProvider extends AbstractTokenizeProvider {
  scriptUrl = "https://sdk.mercadopago.com/js/v2";
  async tokenize(): Promise<string> {
    if (!("publicKey" in this.input.setting)) {
      throw new Error("MercadoPago public key is missing in settings");
    }
    if (!this.input.customer.documentNumber) {
      throw new Error("Customer document number is required for tokenization");
    }
    const MP = window.MercadoPago;
    if (!MP) throw new Error("MercadoPago SDK not available");
    const mp = new MP(this.input.setting.publicKey as string);
    const {
      expiration,
      cvv,
      number,
      holderName
    } = this.input.card;
    const res = await mp.createCardToken({
      cardExpirationMonth: String(expiration.month),
      cardExpirationYear: String(expiration.year),
      cardholderName: holderName,
      cardNumber: number,
      securityCode: cvv,
      identificationType: this.input.customer.documentType === DocumentType.Cpf ? "CPF" : "CNPJ",
      identificationNumber: this.input.customer.documentNumber
    });
    return res.id;
  }
}