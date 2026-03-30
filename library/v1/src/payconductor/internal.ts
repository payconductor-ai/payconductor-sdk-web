import { ALLOWED_ORIGINS, POST_MESSAGES, REQUEST_TIMEOUT } from "./constants";
import { IncomingMessage, OutgoingMessage, PayConductorConfig, PaymentMethod, PaymentResult, PaymentStatus } from "./iframe/types";
import { collectBrowserData } from "./three-ds/browser";
import { PayConductor3DSSDK } from "./three-ds/handler";
import { ThreeDSecureResultStatus } from "./three-ds/types";
import type { ConfirmPaymentOptions, PendingRequest } from "./types";
import { generateRequestId, isValidOrigin } from "./utils";

export function createPendingRequestsMap(): Map<string, PendingRequest> {
    return new Map<string, PendingRequest>();
}

export function sendMessageToIframe(
    iframe: HTMLIFrameElement | Element | undefined,
    pendingMap: Map<string, PendingRequest> | null,
    type: OutgoingMessage | IncomingMessage,
    data?: unknown,
): Promise<unknown> {
    return new Promise((resolve, reject) => {
        if (!iframe || !("contentWindow" in iframe)) {
            reject(new Error("Iframe not defined"));
            return;
        }

        if (!iframe?.contentWindow) {
            reject(new Error("Iframe not ready"));
            return;
        }

        if (!pendingMap) {
            reject(new Error("Pending requests not initialized"));
            return;
        }

        const requestId = generateRequestId();
        pendingMap.set(requestId, {resolve, reject});

        iframe.contentWindow.postMessage({type, data, requestId}, "*");

        setTimeout(() => {
            if (pendingMap?.has(requestId)) {
                pendingMap.delete(requestId);
                reject(new Error("Request timeout"));
            }
        }, REQUEST_TIMEOUT);
    });
}

function sendConfirmPayment(
    iframe: HTMLIFrameElement | Element | undefined,
    pendingMap: Map<string, PendingRequest> | null,
    data: Record<string, unknown>,
): Promise<PaymentResult> {
    return sendMessageToIframe(iframe, pendingMap, POST_MESSAGES.CONFIRM_PAYMENT, data) as Promise<PaymentResult>;
}

function toggle3DSVisibility(show: boolean) {
    const registered = window.PayConductor3DS;
    if (show) registered?.show?.(); else registered?.hide?.();
    const checkout = document.querySelector(".payconductor-element") as HTMLElement | null;
    if (checkout) checkout.style.display = show ? "none" : "";
}

function resolve3DSContainer(options: ConfirmPaymentOptions): HTMLElement | undefined {
    const registered = window.PayConductor3DS;
    return (
        registered?.container?.() ??
        options.threeDsContainer ??
        (options.threeDsContainerId ? document.getElementById(options.threeDsContainerId) : undefined) ??
        undefined
    );
}

export async function confirmPayment(
    iframe: HTMLIFrameElement | Element | undefined,
    pendingMap: Map<string, PendingRequest> | null,
    options: ConfirmPaymentOptions,
): Promise<PaymentResult> {
    const result = await sendConfirmPayment(iframe, pendingMap, { orderId: options.orderId });

    const needs3DS =
        result.statusDetail === "ThreeDsAwaitingChallenge" &&
        result.threeDSecure?.status === "NeedChallenge";

    if (!needs3DS || !result.threeDSecure) return result;

    toggle3DSVisibility(true);
    options.onThreeDSChallenge?.();

    const handler = new PayConductor3DSSDK(result.threeDSecure);
    const challengeResult = await handler.authenticate({
        container: resolve3DSContainer(options),
        onComplete: options.onThreeDSComplete,
        onError: options.onThreeDSError,
    });
    handler.destroy();

    toggle3DSVisibility(false);

    if (challengeResult.status !== ThreeDSecureResultStatus.Success) {
        return {
            ...result,
            status: PaymentStatus.Failed,
            message: challengeResult.status === ThreeDSecureResultStatus.Timeout
                ? "3DS challenge timed out"
                : challengeResult.error?.message || "3DS challenge failed",
        };
    }

    return await sendMessageToIframe(iframe, pendingMap, POST_MESSAGES.CONFIRM_PAYMENT, {
        orderId: options.orderId,
        confirmThreeDS: true,
        threeDSecure: {
            type: "internal",
            authToken: result.threeDSecure?.authToken,
            dsTransactionId: challengeResult.dsTransactionId ?? result.threeDSecure?.dsTransactionId,
            browser: collectBrowserData(),
        },
    }) as PaymentResult;
}

export function validatePayment(
    iframe: HTMLIFrameElement | Element | undefined,
    pendingMap: Map<string, PendingRequest> | null,
    data: unknown,
): Promise<boolean> {
    return sendMessageToIframe(
        iframe,
        pendingMap,
        POST_MESSAGES.VALIDATE,
        data,
    ) as Promise<boolean>;
}

export function resetPayment(
    iframe: HTMLIFrameElement | Element | undefined,
    pendingMap: Map<string, PendingRequest> | null,
): Promise<void> {
    return sendMessageToIframe(iframe, pendingMap, POST_MESSAGES.RESET) as Promise<void>;
}

export function sendConfig(
    iframe: HTMLIFrameElement | Element | undefined,
    pendingMap: Map<string, PendingRequest> | null,
    config: Pick<
        PayConductorConfig,
        | "theme"
        | "locale"
        | "paymentMethods"
        | "defaultPaymentMethod"
        | "showPaymentButtons"
        | "nuPayConfig"
    >,
): Promise<void> {
    return sendMessageToIframe(
        iframe,
        pendingMap,
        POST_MESSAGES.CONFIG,
        config,
    ) as Promise<void>;
}

export function sendInit(
    iframe: HTMLIFrameElement | Element | undefined,
    pendingMap: Map<string, PendingRequest> | null,
    config: PayConductorConfig,
): Promise<void> {
    return sendMessageToIframe(
        iframe,
        pendingMap,
        POST_MESSAGES.INIT,
        config,
    ) as Promise<void>;
}

type MessagePayload = {
    requestId?: string;
    type?: string;
    data?: PaymentResult | { paymentMethod: PaymentMethod };
    error?: { message?: string };
};

export function handleMessageEvent(
    event: MessageEvent,
    pendingMap: Map<string, PendingRequest> | null,
    setError: (value: string | null) => void,
    onReady?: () => void,
    onError?: (error: Error) => void,
    onPaymentComplete?: (data: PaymentResult) => void,
    onPaymentFailed?: (data: PaymentResult) => void,
    onPaymentPending?: (data: PaymentResult) => void,
    onPaymentMethodSelected?: (method: PaymentMethod) => void,
) {
    const payload: MessagePayload = event.data;
    const { requestId, type, data, error } = payload;

    if (type === POST_MESSAGES.READY) {
        onReady?.();
		
        if (requestId && pendingMap?.has(requestId)) {
            const {resolve} = pendingMap.get(requestId)!;
            pendingMap.delete(requestId);
            resolve(data);
        }

        return;
    }

    if (!isValidOrigin(event.origin, ALLOWED_ORIGINS)) {
        return;
    }

    if (requestId && pendingMap && pendingMap.has(requestId)) {
        const { resolve, reject } = pendingMap.get(requestId)!;

        pendingMap.delete(requestId);

        if (error) {
            reject(new Error(String(error.message)));
        } else {
            resolve(data);
        }

        return;
    }

    if (type === POST_MESSAGES.ERROR) {
        setError(error?.message || "Unknown error");
        onError?.(new Error(String(error?.message)));
        return;
    }

    if (type === POST_MESSAGES.PAYMENT_COMPLETE) {
        if (data && typeof data === "object" && "status" in data) {
            onPaymentComplete?.(data);
        }
        return;
    }

    if (type === POST_MESSAGES.PAYMENT_FAILED) {
        if (data && typeof data === "object" && "status" in data) {
            onPaymentFailed?.(data);
        }
        return;
    }

    if (type === POST_MESSAGES.PAYMENT_PENDING) {
        if (data && typeof data === "object" && "status" in data) {
            onPaymentPending?.(data);
        }
        return;
    }

    if (type === POST_MESSAGES.PAYMENT_METHOD_SELECTED) {
        if (data && typeof data === "object" && "paymentMethod" in data) {
            onPaymentMethodSelected?.(data.paymentMethod);
        }
        return;
    }

    if (type === POST_MESSAGES.RESIZE) {
        return;
    }
}
