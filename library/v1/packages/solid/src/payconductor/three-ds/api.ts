import { SDK_API_BASE_URL } from "../constants";
import type { ThreeDSecureData } from "./types";
export class PayConductorThreeDSApiError extends Error {
  constructor(message: string, public readonly title?: unknown) {
    super(message);
    this.name = "PayConductorThreeDSApiError";
  }
}
export class PayConductorThreeDSApi {
  constructor(private readonly publicKey: string) {}
  async completeManualChallenge(orderId: string, providerTransactionId: string): Promise<void> {
    const res = await fetch(`${SDK_API_BASE_URL}/three-ds/complete/${orderId}`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        providerTransactionId
      })
    });
    if (!res.ok) await this.parseResponseError("Failed to complete native 3DS challenge", res);
  }
  async getThreeDSecureData(orderId: string): Promise<ThreeDSecureData> {
    const res = await fetch(`${SDK_API_BASE_URL}/three-ds/challenge/${orderId}`, {
      method: "GET",
      headers: this.headers
    });
    if (!res.ok) await this.parseResponseError("Failed to fetch 3DS data", res);
    const json = (await res.json()) as ThreeDSecureData;

    // Remove chaves nulas/indefinidas para que não sobrescrevam os dados
    // resumidos já informados na instância do SDK (ex.: publicKey).
    return Object.fromEntries(Object.entries(json).filter(([, value]) => value !== null && value !== undefined)) as ThreeDSecureData;
  }
  private async parseResponseError(errorTitle: string, res: Response): Promise<never> {
    let errorMessage = "";
    try {
      const errorData = await res.json();
      if (errorData?.message) {
        errorMessage = errorData.message;
      } else if (errorData?.error?.message) {
        errorMessage = errorData.error;
      } else if (errorData?.error?.value?.message) {
        errorMessage = errorData.error.value.message;
      } else if (errorData?.value?.message) {
        errorMessage = errorData.value.message;
      } else {
        errorMessage = JSON.stringify(errorData);
      }
    } catch {
      // Response wasn't JSON
    }
    throw new PayConductorThreeDSApiError(errorMessage, errorTitle);
  }
  private get headers() {
    return {
      Authorization: `Basic ${btoa(`${this.publicKey}:x`)}`,
      "Content-Type": "application/json"
    };
  }
}