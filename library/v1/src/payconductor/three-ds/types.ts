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
