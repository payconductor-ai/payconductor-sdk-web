export function usePayConductor() {
    const ctx = typeof window !== "undefined" ? window.PayConductor : null;
    const config = ctx?.config ? {
        publicKey: ctx.config.publicKey,
        orderId: ctx.config.orderId,
        theme: ctx.config.theme,
        locale: ctx.config.locale
    } : {};
    const frame = ctx?.frame ? {
        iframe: ctx.frame.iframe,
        isReady: ctx.frame.isReady,
        error: ctx.frame.error
    } : {
        iframe: null,
        isReady: false,
        error: null
    };
    return {
        ...config,
        ...frame
    };
}
