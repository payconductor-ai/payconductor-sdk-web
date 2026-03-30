export type ThreeDSecureBrowserData = {
    ip?: string;
    userAgent?: string;
    acceptHeader?: string;
    language?: string;
    colorDepth?: string;
    screenHeight?: string;
    screenWidth?: string;
    timeZoneOffset?: string;
    javaEnabled: boolean;
    javaScriptEnabled: boolean;
};
export declare function collectBrowserData(): ThreeDSecureBrowserData;
