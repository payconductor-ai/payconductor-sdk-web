export type ThreeDSecureData = {
	status?: string;
	statusDetail?: string;
	acquirer?: string;
	environment?: "Sandbox" | "Production";
	authToken?: string;
	threeDsUrl?: string;
	creq?: string;
	operationUrl?: string;
	publicKey?: string;
	dsTransactionId?: string;
	version?: string;
};

export type ThreeDSecureOptions = {
	threeDSecure: ThreeDSecureData;
	onComplete?: () => void;
	onError?: (error: Error) => void;
	onTimeout?: () => void;
	timeoutMs?: number;
	providerData?: Record<string, unknown>;
};

export enum ThreeDSecureResultStatus {
	Success = "Success",
	Failed = "Failed",
	Timeout = "Timeout",
}

export type ThreeDSecureResult = {
	status: ThreeDSecureResultStatus;
	error?: Error;
	authToken?: string;
	dsTransactionId?: string;
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

	protected fail(message: string): ThreeDSecureResult {
		const error = new Error(message);
		this.options.onError?.(error);
		return { status: ThreeDSecureResultStatus.Failed, error };
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
