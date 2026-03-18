import { IFRAME_BASE_URL } from "./constants";
export const SKELETON_STYLE_ID = "payconductor-skeleton-style";
export const SKELETON_CSS = `
	@keyframes payconductor-shimmer {
	  0% { background-position: -200% 0; }
	  100% { background-position: 200% 0; }
	}
	.payconductor-skeleton {
	  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
	  background-size: 200% 100%;
	  animation: payconductor-shimmer 1.5s infinite linear;
	  border-radius: 4px;
	  width: 100%;
	}
`;
import type { PayConductorConfig } from "./iframe/types";
export function buildIframeUrl(config: PayConductorConfig): string {
  const params = new URLSearchParams({
    publicKey: config.publicKey
  });
  return `${IFRAME_BASE_URL}?${params.toString()}`;
}
export function generateRequestId(): string {
  return crypto.randomUUID();
}
export function isValidOrigin(origin: string, allowedOrigins: string[]): boolean {
  return allowedOrigins.some(allowed => {
    try {
      return new URL(allowed).origin === origin;
    } catch {
      return allowed === origin;
    }
  });
}