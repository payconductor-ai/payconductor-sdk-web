import { ALLOWED_ORIGINS, POST_MESSAGES, REQUEST_TIMEOUT } from "./constants";
import { generateRequestId, isValidOrigin } from "./utils";
export function createPendingRequestsMap() {
    return new Map();
}
export function sendMessageToIframe(iframe, pendingMap, type, data) {
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
        pendingMap.set(requestId, {
            resolve,
            reject
        });
        iframe.contentWindow.postMessage({
            type,
            data,
            requestId
        }, "*");
        setTimeout(() => {
            if (pendingMap?.has(requestId)) {
                pendingMap.delete(requestId);
                reject(new Error("Request timeout"));
            }
        }, REQUEST_TIMEOUT);
    });
}
export function confirmPayment(iframe, pendingMap, options) {
    return sendMessageToIframe(iframe, pendingMap, POST_MESSAGES.CONFIRM_PAYMENT, {
        orderId: options.orderId
    });
}
export function validatePayment(iframe, pendingMap, data) {
    return sendMessageToIframe(iframe, pendingMap, POST_MESSAGES.VALIDATE, data);
}
export function resetPayment(iframe, pendingMap) {
    return sendMessageToIframe(iframe, pendingMap, POST_MESSAGES.RESET);
}
export function sendConfig(iframe, pendingMap, config) {
    return sendMessageToIframe(iframe, pendingMap, POST_MESSAGES.CONFIG, config);
}
export function sendInit(iframe, pendingMap, config) {
    return sendMessageToIframe(iframe, pendingMap, POST_MESSAGES.INIT, config);
}
export function handleMessageEvent(event, pendingMap, setIsReady, setError, onReady, onError, onPaymentComplete, onPaymentFailed, onPaymentPending, onPaymentMethodSelected) {
    const payload = event.data;
    const { requestId, type, data, error } = payload;
    if (type === POST_MESSAGES.READY) {
        setIsReady(true);
        if (window.PayConductor && window.PayConductor.frame)
            window.PayConductor.frame.isReady = true;
        onReady?.();
        if (requestId && pendingMap?.has(requestId)) {
            const { resolve } = pendingMap.get(requestId);
            pendingMap.delete(requestId);
            resolve(data);
        }
        return;
    }
    if (!isValidOrigin(event.origin, ALLOWED_ORIGINS)) {
        return;
    }
    if (requestId && pendingMap && pendingMap.has(requestId)) {
        const { resolve, reject } = pendingMap.get(requestId);
        pendingMap.delete(requestId);
        if (error) {
            reject(new Error(String(error.message)));
        }
        else {
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
}
