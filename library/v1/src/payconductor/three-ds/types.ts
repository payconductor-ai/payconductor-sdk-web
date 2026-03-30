export type ThreeDSecureData = {
	status: string;
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
	container?: HTMLElement;
	containerId?: string;
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

	protected resolveContainer(): HTMLElement | null {
		if (this.options.container) return this.options.container;
		if (this.options.containerId) return document.getElementById(this.options.containerId);
		return document.body;
	}
}
