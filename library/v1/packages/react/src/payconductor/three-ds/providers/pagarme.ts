import { loadScript } from "../../loader";
import { AbstractThreeDSProvider, ThreeDSecureResultStatus, ThreeDSTransStatus } from "../types";
import type { ThreeDSecureData, ThreeDSecureResult } from "../types";
import { OrganizationEnvironment } from "../../iframe/types";
const SDK_URLS: Record<OrganizationEnvironment, string> = {
  [OrganizationEnvironment.Production]: `https://3ds-nx-js.stone.com.br/live/v2/3ds2.min.js`,
  [OrganizationEnvironment.Sandbox]: `https://3ds-nx-js.stone.com.br/test/v2/3ds2.min.js`
};
const DEFAULT_TIMEOUT_MS = 5 * 60 * 1000;
type ThreeDSecureAddress = NonNullable<ThreeDSecureData["billingAddress"]>;
function toStoneAddress(address: ThreeDSecureAddress) {
  return {
    country: address.country,
    state: address.state,
    city: address.city,
    zip_code: address.zipCode,
    line_1: `${address.number}, ${address.street}${address.district ? `, ${address.district}` : ""}`,
    line_2: address.complement ?? ""
  };
}
function hasCompleteStoneShippingAddress(address: ThreeDSecureAddress | undefined): address is ThreeDSecureAddress {
  if (!address) return false;
  const requiredFields: Array<keyof ThreeDSecureAddress> = ["country", "state", "city", "zipCode", "number", "street", "district"];
  return requiredFields.every(field => address[field]?.trim()) && /^[A-Za-z]{2}$/.test(address.country.trim());
}
function detectWindowSize(): "01" | "02" | "03" | "04" | "05" {
  const w = window.innerWidth;
  if (w <= 480) return "01";
  if (w <= 768) return "02";
  if (w <= 1024) return "03";
  return "04";
}
export class PagarMeThreeDSProvider extends AbstractThreeDSProvider {
  private timeoutId: ReturnType<typeof setTimeout> | null = null;
  private methodContainer: HTMLElement | null = null;
  async authenticate(): Promise<ThreeDSecureResult> {
    const {
      authToken,
      card
    } = this.data;
    const {
      hasPhysicalItems,
      billingAddress
    } = this.data;
    if (hasPhysicalItems === true && !hasCompleteStoneShippingAddress(billingAddress)) {
      return this.fail("Incomplete delivery address for PagarMe 3DS");
    }
    if (!authToken) return this.fail("Missing authToken for PagarMe 3DS");
    if (!card) return this.fail("Missing card data for PagarMe 3DS");
    const env = this.data.environment ?? OrganizationEnvironment.Production;
    try {
      await loadScript(SDK_URLS[env]);
    } catch {
      return this.fail("Failed to load Stone 3DS SDK");
    }
    const tds = window.TDS;
    if (!tds) return this.fail("Stone TDS SDK not available");
    const container = this.resolveContainer();
    this.methodContainer = document.createElement("div");
    this.methodContainer.style.display = "none";
    document.body.appendChild(this.methodContainer);
    return new Promise<ThreeDSecureResult>(resolve => {
      this.timeoutId = setTimeout(() => {
        this.cleanup();
        resolve({
          status: ThreeDSecureResultStatus.Timeout
        });
      }, this.options.timeoutMs ?? DEFAULT_TIMEOUT_MS);
      tds.init({
        token: authToken,
        tds_method_container_element: this.methodContainer as HTMLElement,
        challenge_container_element: container,
        use_default_challenge_iframe_style: true,
        challenge_window_size: detectWindowSize()
      }, this.buildOrderData()).then(responses => {
        this.cleanup();
        if (!responses?.length) {
          resolve(this.fail("PagarMe 3DS returned no response"));
          return;
        }
        const result = responses[0];
        const transStatus = Object.values(ThreeDSTransStatus).find(status => status === result.trans_status);
        const details = {
          transStatus,
          providerTransactionId: result.tds_server_trans_id,
          challengeCanceled: result.challenge_canceled
        };
        if (result.challenge_canceled) {
          resolve(this.fail("3DS challenge canceled by user", details));
          return;
        }
        if (transStatus === ThreeDSTransStatus.Authenticated || transStatus === ThreeDSTransStatus.Attempted) {
          resolve({
            ...details,
            status: ThreeDSecureResultStatus.Success,
            dsTransactionId: result.tds_server_trans_id
          });
        } else {
          resolve(this.fail(`3DS failed with status: ${result.trans_status}`, details));
        }
      }).catch((err: unknown) => {
        this.cleanup();
        resolve(this.fail(err instanceof Error ? err.message : "PagarMe 3DS failed"));
      });
    });
  }
  cleanup(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    if (this.methodContainer) {
      this.methodContainer.remove();
      this.methodContainer = null;
    }
    this.closeModal();
  }
  private buildOrderData(): Record<string, unknown> {
    const {
      card,
      customer,
      billingAddress,
      hasPhysicalItems
    } = this.data;
    return {
      payments: [{
        payment_method: "credit_card",
        credit_card: {
          card: {
            number: card?.number,
            holder_name: card?.holderName,
            exp_month: Number(card?.expiration.month),
            exp_year: Number(card?.expiration.year),
            billing_address: billingAddress ? toStoneAddress(billingAddress) : undefined
          }
        },
        amount: this.amountInCents
      }],
      ...(customer ? {
        customer: {
          name: customer.name,
          email: customer.email,
          ...(customer.document ? {
            document: customer.document
          } : {}),
          ...(customer.phones?.length ? {
            phones: Object.fromEntries(customer.phones.map(p => [p.type === "HOME" ? "home_phone" : "mobile_phone", {
              country_code: p.countryCode,
              area_code: p.areaCode,
              number: p.number
            }]))
          } : {})
        }
      } : {}),
      ...(hasPhysicalItems === true ? {
        shipping: {
          recipient_name: customer?.name || card?.holderName,
          electronic_delivery: false,
          address: toStoneAddress(billingAddress!)
        }
      } : hasPhysicalItems === false ? {
        shipping: {
          recipient_name: customer?.name || card?.holderName,
          electronic_delivery: true
        }
      } : {})
    };
  }
}