import { PayConductor3DSSDK } from "../three-ds";
import type { ThreeDSecureData, ThreeDSecureResult } from "../three-ds/types";
import { ThreeDSecureResultStatus } from "../three-ds/types";

export type UseThreeDSOptions = {
	containerId?: string;
	container?: HTMLElement;
	onChallenge?: () => void;
	onComplete?: () => void;
	onError?: (error: Error) => void;
	onTimeout?: () => void;
};

export type UseThreeDSReturn = {
	handleChallenge: (threeDSecure: ThreeDSecureData, providerData?: Record<string, unknown>) => Promise<ThreeDSecureResult>;
	destroy: () => void;
};

export function useThreeDS(options?: UseThreeDSOptions): UseThreeDSReturn {
	let handler: PayConductor3DSSDK | null = null;

	const getContainer = (): HTMLElement | undefined => {
		const registered = window.PayConductor3DS;
		if (registered?.container) {
			const el = registered.container();
			if (el) return el;
		}
		if (options?.container) return options.container;
		if (options?.containerId) return document.getElementById(options.containerId) || undefined;
		return undefined;
	};

	const toggleVisibility = (show: boolean) => {
		const registered = window.PayConductor3DS;
		if (show) registered?.show?.(); else registered?.hide?.();
		const checkout = document.querySelector(".payconductor-element") as HTMLElement;
		if (checkout) checkout.style.display = show ? "none" : "";
	};

	const handleChallenge = async (
		threeDSecure: ThreeDSecureData,
		providerData?: Record<string, unknown>,
	): Promise<ThreeDSecureResult> => {
		if (threeDSecure.status !== "NeedChallenge") {
			return { status: ThreeDSecureResultStatus.Success };
		}

		toggleVisibility(true);
		options?.onChallenge?.();

		handler = new PayConductor3DSSDK(threeDSecure);

		const result = await handler.authenticate({
			container: getContainer(),
			providerData,
			onComplete: () => { toggleVisibility(false); options?.onComplete?.(); },
			onError: (error) => { toggleVisibility(false); options?.onError?.(error); },
			onTimeout: () => { toggleVisibility(false); options?.onTimeout?.(); },
		});

		if (result.status !== ThreeDSecureResultStatus.Success) {
			toggleVisibility(false);
		}

		handler.destroy();
		handler = null;
		return result;
	};

	const destroy = () => {
		handler?.destroy();
		handler = null;
		toggleVisibility(false);
	};

	return { handleChallenge, destroy };
}
