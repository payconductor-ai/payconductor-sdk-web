import type {
	AbstractThreeDSProvider,
	ThreeDSecureCompletionPayload,
	ThreeDSecureData,
	ThreeDSecureInit,
	ThreeDSecureOptions,
	ThreeDSecureResult,
} from "./types";
import { ThreeDSMode, ThreeDSecureResultStatus } from "./types";
import { threeDSProviders } from "./providers";
import { PayConductorThreeDSApi, PayConductorThreeDSApiError } from "./api";
import { ChargeStatusDetail } from "../iframe/types";

export class PayConductor3DSSDK {
	private data: ThreeDSecureData;
	private provider: AbstractThreeDSProvider | null = null;
	private api: PayConductorThreeDSApi;

	constructor(threeDSecure: ThreeDSecureInit) {
		this.data = threeDSecure;
		this.api = new PayConductorThreeDSApi(this.data.publicKey);
	}

	get needsChallenge() {
		return (
			this.data.status === "NeedChallenge" ||
			this.data.statusDetail === "ThreeDsAwaitingChallenge"
		);
	}

	get acquirer() {
		return this.data.acquirer;
	}

	/** Indica se o pedido precisa de autenticação 3DS. */
	static requiresChallenge(order: {
		status?: string | null;
		statusDetail?: string | null;
		threeDSecure?: { status?: string } | null;
		creditCard?: { threeDSecure?: { status?: string } } | null;
	}): boolean {
		if(order.status && order.status !== "Pending") {
			return false;
		}
		return (
			order.statusDetail === "ThreeDsAwaitingChallenge" ||
			order.threeDSecure?.status === "NeedChallenge" ||
			order.creditCard?.threeDSecure?.status === "NeedChallenge"
		);
	}

	/**
	 * Executa o fluxo completo de 3DS: carrega os dados, resolve o provedor,
	 * conduz o desafio, envia o `complete` (só no modo `Manual`) e faz o polling
	 * do pedido. O integrador não precisa ramificar por modo.
	 */
	async authenticate(options?: Omit<ThreeDSecureOptions, "threeDSecure">): Promise<ThreeDSecureResult> {
		try {
			// O SDK é instanciado com dados resumidos; o restante é carregado aqui.
			const fullData = await this.api.getThreeDSecureData(this.data.orderId);
			this.data = { ...this.data, ...fullData };
		} catch (error) {
			if (error instanceof PayConductorThreeDSApiError) {
				return { status: ThreeDSecureResultStatus.Failed, error };
			}
			throw error;
		}

		if (!this.needsChallenge) {
			return { status: ThreeDSecureResultStatus.Success };
		}

		const { acquirer, mode } = this.data;

		if (!acquirer) {
			return this.finish(
				{
					status: ThreeDSecureResultStatus.Failed,
					error: new Error("Adquirente 3DS não informada na cobrança"),
					failureReason: "Adquirente 3DS não informada na cobrança",
				},
				options,
			);
		}

		const ProviderClass = threeDSProviders[acquirer as keyof typeof threeDSProviders];

		if (!ProviderClass) {
			const failureReason = `Provedor 3DS não suportado: ${acquirer}`;
			return this.finish(
				{
					status: ThreeDSecureResultStatus.Failed,
					error: new Error(failureReason),
					failureReason,
				},
				options,
			);
		}

		options?.onChallenge?.();

		const provider = new ProviderClass(this.data, {
			threeDSecure: this.data,
			timeoutMs: options?.timeoutMs,
		});
		this.provider = provider;

		let challenge: ThreeDSecureResult;
		try {
			challenge = await provider.authenticate();
		} finally {
			// Equivalente ao destroy(); o provedor não deve sobreviver ao desafio.
			provider.cleanup();
			this.provider = null;
		}

		const result: ThreeDSecureResult = { ...challenge };
		const failureReason = this.deriveFailureReason(challenge);
		result.failureReason = failureReason;

		// Só o modo `Manual` tem requisição pendente no backend. Sem `mode`,
		// usa o `statusDetail`, que é a condição usada pelo backend.
		const requiresCompletion = mode
			? mode === ThreeDSMode.Manual
			: this.data.statusDetail === ChargeStatusDetail.ThreeDsAwaitingChallenge;

		let completionError: unknown;

		if (requiresCompletion && options?.complete !== false) {
			try {
				await this.api.completeChallenge(
					this.data.orderId,
					this.buildCompletionPayload(challenge, failureReason),
				);
			} catch (error) {
				// Falha do `complete` não pode quebrar o fluxo; o resultado real
				// do pedido vem do polling.
				completionError = error;
			}
		}

		const pollingEnabled =
			options?.poll !== false && challenge.status === ThreeDSecureResultStatus.Success;

		if (pollingEnabled) {
			const { order, timedOut } = await this.api.pollOrderStatus(this.data.orderId, {
				...options?.polling,
				mode,
			});
			result.order = order ?? undefined;
			result.timedOut = timedOut;
		} else if (completionError && !result.error) {
			result.error = this.toError(completionError);
		}

		return this.finish(result, options);
	}

	destroy() {
		if (this.provider) {
			this.provider.cleanup();
			this.provider = null;
		}
	}

	/** Mensagem amigável da falha do desafio (pt-BR). */
	private deriveFailureReason(result: ThreeDSecureResult): string | undefined {
		if (result.status === ThreeDSecureResultStatus.Success) {
			return undefined;
		}
		if (result.status === ThreeDSecureResultStatus.Timeout) {
			return "Tempo da autenticação 3DS esgotado";
		}
		return result.error?.message || "Falha na autenticação 3DS";
	}

	/**
	 * Payload do `complete`. `failureReason` só vai quando é falha técnica
	 * (sem `transStatus` do emissor nem cancelamento) — string vazia quebra o backend.
	 */
	private buildCompletionPayload(
		result: ThreeDSecureResult,
		failureReason: string | undefined,
	): ThreeDSecureCompletionPayload {
		const challengeCanceled = result.challengeCanceled === true;
		const transStatus = result.transStatus;
		const providerTransactionId = result.providerTransactionId ?? result.dsTransactionId;
		const isTechnicalFailure = Boolean(failureReason) && !transStatus && !challengeCanceled;

		return {
			providerTransactionId,
			transStatus,
			challengeCanceled,
			failureReason: isTechnicalFailure ? failureReason : undefined,
		};
	}

	private finish(
		result: ThreeDSecureResult,
		options?: Omit<ThreeDSecureOptions, "threeDSecure">,
	): ThreeDSecureResult {
		options?.onComplete?.(result);
		if (result.failureReason) {
			options?.onError?.(new Error(result.failureReason));
		}
		if (result.status === ThreeDSecureResultStatus.Timeout || result.timedOut) {
			options?.onTimeout?.();
		}
		return result;
	}

	private toError(error: unknown): Error {
		return error instanceof Error ? error : new Error("Falha ao concluir a autenticação 3DS");
	}
}
