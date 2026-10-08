import { SDK_API_BASE_URL, API_BASE_URL } from "../constants";
import { ChargeStatusDetail, PaymentStatus } from "../iframe/types";
import type { PaymentResult } from "../iframe/types";
import { ThreeDSMode } from "./types";
import type { ThreeDSecureCompletionPayload, ThreeDSecureData, ThreeDSecurePollingOptions } from "./types";
export class PayConductorThreeDSApiError extends Error {
  constructor(message: string, public readonly title?: unknown) {
    super(message);
    this.name = "PayConductorThreeDSApiError";
  }
}
export class PayConductorThreeDSApi {
  constructor(private readonly publicKey: string) {}
  async completeChallenge(orderId: string, body: ThreeDSecureCompletionPayload): Promise<void> {
    const res = await fetch(`${SDK_API_BASE_URL}/three-ds/complete/${orderId}`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(body)
    });
    if (!res.ok) await this.parseResponseError("Falha ao concluir a autenticação 3DS", res);
  }
  async getOrderStatus(orderId: string): Promise<PaymentResult> {
    const res = await fetch(`${API_BASE_URL}/orders/${orderId}/status`, {
      method: "GET",
      headers: this.headers
    });
    if (!res.ok) await this.parseResponseError("Falha ao consultar o status do pedido", res);
    return mapOrderStatusToPaymentResult(await res.json());
  }

  /**
   * Aguarda o pedido sair de `ThreeDsAwaitingChallenge`.
   * No modo `Auto` não existe `statusDetail`; a espera é enquanto o pedido seguir `Pending`.
   */
  async pollOrderStatus(orderId: string, {
    maxAttempts = 30,
    intervalMs = 2000,
    mode
  }: ThreeDSecurePollingOptions & {
    mode?: ThreeDSMode;
  } = {}): Promise<{
    order: PaymentResult | null;
    timedOut: boolean;
  }> {
    let last: PaymentResult | null = null;
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      last = await this.getOrderStatus(orderId);
      const challengeStillOpen = last.status === PaymentStatus.Pending && (last.statusDetail === ChargeStatusDetail.ThreeDsAwaitingChallenge || mode === ThreeDSMode.Auto);
      if (!challengeStillOpen) return {
        order: last,
        timedOut: false
      };
      await new Promise(resolve => setTimeout(resolve, intervalMs));
    }
    return {
      order: last,
      timedOut: true
    };
  }
  async getThreeDSecureData(orderId: string): Promise<ThreeDSecureData> {
    const res = await fetch(`${SDK_API_BASE_URL}/three-ds/challenge/${orderId}`, {
      method: "GET",
      headers: this.headers
    });
    if (!res.ok) await this.parseResponseError("Falha ao buscar dados 3DS", res);
    const json = (await res.json()) as {
      mode?: ThreeDSMode;
      statusDetail?: string | null;
      threeDSecure: ThreeDSecureData;
    };

    // Remove chaves nulas/indefinidas para que não sobrescrevam os dados
    // resumidos já informados na instância do SDK (ex.: publicKey).
    const data = Object.fromEntries(Object.entries(json.threeDSecure ?? {}).filter(([, value]) => value !== null && value !== undefined)) as ThreeDSecureData;

    // `mode` e `statusDetail` vêm no nível superior da resposta.
    return {
      ...data,
      ...(json.mode ? {
        mode: json.mode
      } : {}),
      statusDetail: data.statusDetail ?? json.statusDetail ?? undefined
    };
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

/** Converte o `ChargeStatus` do backend no `PaymentStatus` do SDK. */
function mapChargeStatusToPaymentStatus(status?: string): PaymentStatus {
  switch (status) {
    case "Completed":
      return PaymentStatus.Succeeded;
    case "Pending":
    case "Generating":
      return PaymentStatus.Pending;
    default:
      return PaymentStatus.Failed;
  }
}

/**
 * Mapeia o `orderConfirmedResponseModel` de `GET /orders/:id/status`
 * (mesmo formato do order, sem campos internos) para `PaymentResult`.
 */
function mapOrderStatusToPaymentResult(raw: unknown): PaymentResult {
  const data = (raw ?? {}) as {
    id?: string;
    status?: string;
    statusDetail?: string | null;
    amount?: number;
    currency?: string;
    errorCode?: string | null;
    errorMessage?: string | null;
  };
  const result = {
    ...data,
    orderId: data.id ?? "",
    status: mapChargeStatusToPaymentStatus(data.status),
    statusDetail: data.statusDetail ?? undefined,
    amount: data.amount ?? 0,
    currency: data.currency ?? "BRL",
    errorCode: data.errorCode ?? undefined,
    errorMessage: data.errorMessage ?? undefined,
    message: data.errorMessage ?? undefined
  };
  return result as PaymentResult;
}