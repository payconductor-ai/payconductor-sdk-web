import { PayConductorConfig } from './iframe/types';
export declare const SKELETON_STYLE_ID = "payconductor-skeleton-style";
export declare const SKELETON_CSS = "\n\t@keyframes payconductor-shimmer {\n\t  0% { background-position: -200% 0; }\n\t  100% { background-position: 200% 0; }\n\t}\n\t.payconductor-skeleton {\n\t  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);\n\t  background-size: 200% 100%;\n\t  animation: payconductor-shimmer 1.5s infinite linear;\n\t  border-radius: 4px;\n\t  width: 100%;\n\t}\n";
export declare function buildIframeUrl(config: PayConductorConfig): string;
export declare function generateRequestId(): string;
export declare function isValidOrigin(origin: string, allowedOrigins: string[]): boolean;
