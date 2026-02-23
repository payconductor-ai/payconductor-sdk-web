import { POST_MESSAGES } from "../constants";
import { confirmPayment, createPendingRequestsMap, sendInit, sendMessageToIframe } from "../internal";
function getIframeFromContext(ctx) {
    if (ctx?.frame?.iframe) {
        const iframeRef = ctx.frame.iframe;
        if (iframeRef instanceof HTMLIFrameElement)
            return iframeRef;
        if (iframeRef && typeof iframeRef === "object") {
            if ("current" in iframeRef) {
                const el = iframeRef.current;
                if (el instanceof HTMLIFrameElement)
                    return el;
            }
            if ("value" in iframeRef) {
                const el = iframeRef.value;
                if (el instanceof HTMLIFrameElement)
                    return el;
            }
        }
    }
    return document.querySelector(".payconductor-element iframe") ?? null;
}
export function usePayconductorElement() {
    const getCtx = () => typeof window !== "undefined" ? window.PayConductor : null;
    const sendToIframe = (type, data) => {
        const ctx = getCtx();
        if (!ctx)
            return;
        const iframe = getIframeFromContext(ctx);
        if (iframe?.contentWindow) {
            iframe.contentWindow.postMessage({
                type,
                data
            }, "*");
        }
    };
    return {
        init: async (config) => {
            const iframe = getIframeFromContext(getCtx());
            const pendingMap = createPendingRequestsMap();
            return sendInit(iframe || undefined, pendingMap, config);
        },
        confirmPayment: async (options) => {
            const iframe = getIframeFromContext(getCtx());
            const pendingMap = createPendingRequestsMap();
            if (!options.orderId) {
                throw new Error("Order ID is required");
            }
            return confirmPayment(iframe || undefined, pendingMap, options);
        },
        validate: (data) => {
            const ctx = getCtx();
            if (!ctx)
                return Promise.resolve(false);
            return ctx.api.validate(data);
        },
        reset: () => {
            const ctx = getCtx();
            if (!ctx)
                return Promise.resolve();
            return ctx.api.reset();
        },
        getSelectedPaymentMethod: () => {
            return getCtx()?.selectedPaymentMethod ?? null;
        },
        updateConfig: (config) => {
            const currentConfig = getCtx()?.config;
            sendToIframe(POST_MESSAGES.CONFIG, {
                publicKey: currentConfig?.publicKey,
                orderId: currentConfig?.orderId,
                theme: config.theme ?? currentConfig?.theme,
                locale: config.locale ?? currentConfig?.locale,
                paymentMethods: config.paymentMethods ?? currentConfig?.paymentMethods
            });
        },
        updateorderId: (orderId) => {
            const currentConfig = getCtx()?.config;
            sendToIframe(POST_MESSAGES.CONFIG, {
                publicKey: currentConfig?.publicKey,
                orderId: orderId,
                theme: currentConfig?.theme,
                locale: currentConfig?.locale,
                paymentMethods: currentConfig?.paymentMethods
            });
        },
        update: (options) => {
            sendToIframe(POST_MESSAGES.UPDATE, options);
        },
        submit: async () => {
            const iframe = getIframeFromContext(getCtx());
            const pendingMap = createPendingRequestsMap();
            try {
                await sendMessageToIframe(iframe || undefined, pendingMap, POST_MESSAGES.CONFIRM_PAYMENT, {});
                return {
                    paymentMethod: undefined
                };
            }
            catch (error) {
                const message = error instanceof Error ? error.message : "Payment failed";
                return {
                    error: {
                        message,
                        code: "payment_error",
                        type: "payment_error"
                    }
                };
            }
        }
    };
}
