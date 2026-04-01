import { loadScript } from "../../loader";
import { AbstractThreeDSProvider, ThreeDSecureResultStatus } from "../types";
import type { ThreeDSecureResult } from "../types";
import { OrganizationEnvironment } from "../../iframe/types";
const SDK_URL = "https://assets.pagseguro.com.br/checkout-sdk-js/rc/dist/browser/pagseguro.min";
export class PagSeguroThreeDSProvider extends AbstractThreeDSProvider {
  async authenticate(): Promise<ThreeDSecureResult> {
    const {
      authToken,
      card,
      customer,
      amount,
      currency,
      billingAddress
    } = this.data;
    if (!authToken) return this.fail("Missing authToken (session) for PagSeguro 3DS");
    if (!card) return this.fail("Missing card data for PagSeguro 3DS");
    if (!customer) return this.fail("Missing customer data for PagSeguro 3DS");
    if (!amount) return this.fail("Missing amount for PagSeguro 3DS");
    if (!billingAddress) return this.fail("Missing billingAddress for PagSeguro 3DS");
    const env = this.data.environment === OrganizationEnvironment.Sandbox ? "SANDBOX" : "PROD";
    try {
      await loadScript(SDK_URL);
    } catch {
      return this.fail("Failed to load PagSeguro SDK");
    }
    const sdk = window.PagSeguro;
    if (!sdk) return this.fail("PagSeguro SDK not available");
    sdk.setUp({
      session: authToken,
      env
    });
    const phones = customer.phones?.map(p => ({
      country: p.countryCode,
      area: p.areaCode,
      number: p.number,
      type: p.type ?? "MOBILE"
    })) ?? [{
      country: "55",
      area: "11",
      number: "999999999",
      type: "MOBILE"
    }];
    const hasMobile = phones.some(p => p.type === "MOBILE");
    if (!hasMobile) {
      phones[0].type = "MOBILE";
    }
    try {
      const result = await sdk.authenticate3DS({
        data: {
          customer: {
            name: customer.name,
            email: customer.email,
            phones
          },
          paymentMethod: {
            type: this.data.installments === 0 ? "DEBIT_CARD" : "CREDIT_CARD",
            installments: this.data.installments ?? 1,
            card: {
              number: card.number,
              expMonth: card.expMonth,
              expYear: card.expYear,
              holder: {
                name: card.holderName
              }
            }
          },
          amount: {
            value: amount,
            currency: currency ?? "BRL"
          },
          billingAddress: {
            street: billingAddress.street,
            number: billingAddress.number,
            complement: billingAddress.complement,
            regionCode: billingAddress.state,
            country: billingAddress.country.length === 2 ? this.toAlpha3(billingAddress.country) : billingAddress.country,
            city: billingAddress.city,
            postalCode: billingAddress.zipCode.replace(/\D/g, "")
          },
          dataOnly: false
        }
      });
      if (result.status === "AUTH_FLOW_COMPLETED" || result.status === "AUTH_NOT_SUPPORTED") {
        this.options.onComplete?.();
        return {
          status: ThreeDSecureResultStatus.Success,
          dsTransactionId: result.id
        };
      }
      if (result.status === "CHANGE_PAYMENT_METHOD") {
        return this.fail("PagSeguro requires a different payment method");
      }
      return {
        status: ThreeDSecureResultStatus.Success,
        dsTransactionId: result.id
      };
    } catch (err: unknown) {
      return this.fail(err instanceof Error ? err.message : "PagSeguro 3DS failed");
    }
  }
  cleanup(): void {}
  private toAlpha3(code: string): string {
    const map: Record<string, string> = {
      BR: "BRA",
      US: "USA",
      AR: "ARG",
      CL: "CHL",
      CO: "COL",
      MX: "MEX",
      PE: "PER",
      UY: "URY"
    };
    return map[code.toUpperCase()] ?? code;
  }
}