import { IntegrationProvider, OrganizationEnvironment } from "../iframe/types";

export type ThreeDSecureData = {
	orderId: string;
	publicKey: string;

	status?: string;
	statusDetail?: string;
	acquirer?: IntegrationProvider | "PayConductor" | string;
	environment?: OrganizationEnvironment;
	authToken?: string;
	threeDsUrl?: string;
	creq?: string;
	operationUrl?: string;
	dsTransactionId?: string;
	version?: string;
	card?: {
		number: string;
		expMonth: string;
		expYear: string;
		holderName: string;
	};
	customer?: {
		name: string;
		email: string;
		document?: string;
		phones?: Array<{ countryCode: string; areaCode: string; number: string; type?: string }>;
	};
	/** Valor da cobrança em decimal (ex: 150.9), como retornado pela API do PayConductor */
	amount?: number;
	currency?: string;
	installments?: number;
	billingAddress?: {
		street: string;
		number: string;
		complement?: string;
		district?: string;
		state: string;
		country: string;
		city: string;
		zipCode: string;
	};
};

/**
 * Dados mínimos para instanciar o SDK de 3DS.
 * O restante (status, acquirer, authToken, card, etc.) é obtido
 * pela API através do `orderId` ao chamar `authenticate`.
 */
export type ThreeDSecureInit = Pick<ThreeDSecureData, "orderId" | "publicKey">;

export type ThreeDSecureOptions = {
	threeDSecure: ThreeDSecureData;
	onChallenge?: () => void;
	onComplete?: () => void;
	onError?: (error: Error) => void;
	onTimeout?: () => void;
	timeoutMs?: number;
};

export enum ThreeDSecureResultStatus {
	Success = "Success",
	Failed = "Failed",
	Timeout = "Timeout",
}

export enum ThreeDSTransStatus {
	Authenticated = "Y",
	Attempted = "A",
	ChallengeRequired = "C",
	NotAuthenticated = "N",
	Unavailable = "U",
	Rejected = "R",
	InformationOnly = "I",
}

export type ThreeDSecureResult = {
	status: ThreeDSecureResultStatus;
	error?: Error;
	authToken?: string;
	dsTransactionId?: string;
	providerTransactionId?: string;
	transStatus?: ThreeDSTransStatus;
	challengeCanceled?: boolean;
};

export abstract class AbstractThreeDSProvider {
	private overlay: HTMLElement | null = null;
	private modalContent: HTMLElement | null = null;

	constructor(
		protected readonly data: ThreeDSecureData,
		protected readonly options: ThreeDSecureOptions,
	) {}

	abstract authenticate(): Promise<ThreeDSecureResult>;
	abstract cleanup(): void;

	/** Os SDKs de 3DS dos provedores (Pagar.me, PagSeguro) esperam o valor em centavos. */
	protected get amountInCents(): number | undefined {
		return this.data.amount === undefined ? undefined : Math.round(this.data.amount * 100);
	}

	protected fail(
		message: string,
		details: Omit<ThreeDSecureResult, "status" | "error"> = {},
	): ThreeDSecureResult {
		const error = new Error(message);
		this.options.onError?.(error);
		return { ...details, status: ThreeDSecureResultStatus.Failed, error };
	}

	//#region Modal

	protected showModal(): HTMLElement {
		this.injectStyles();

		this.overlay = document.createElement("div");
		this.overlay.id = "payconductor-3ds-overlay";

		this.modalContent = document.createElement("div");
		this.modalContent.id = "payconductor-3ds-modal";

		this.overlay.appendChild(this.modalContent);
		document.body.appendChild(this.overlay);

		return this.modalContent;
	}

	protected closeModal(): void {
		if (this.overlay) {
			this.overlay.remove();
			this.overlay = null;
			this.modalContent = null;
		}
	}

	protected resolveContainer(): HTMLElement {
		return this.modalContent ?? this.showModal();
	}

	private injectStyles(): void {
		if (document.getElementById("payconductor-3ds-styles")) return;
		const style = document.createElement("style");
		style.id = "payconductor-3ds-styles";
		style.textContent = `
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
		`;
		document.head.appendChild(style);
	}

	//#endregion
}
