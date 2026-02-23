import { IFRAME_BASE_URL } from "./constants";
export function buildIframeUrl(config) {
    const params = new URLSearchParams({
        publicKey: config.publicKey
    });
    return `${IFRAME_BASE_URL}?${params.toString()}`;
}
export function generateRequestId() {
    return crypto.randomUUID();
}
export function isValidOrigin(origin, allowedOrigins) {
    return allowedOrigins.some(allowed => {
        try {
            return new URL(allowed).origin === origin;
        }
        catch {
            return allowed === origin;
        }
    });
}
