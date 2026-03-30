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
export function collectBrowserData(): ThreeDSecureBrowserData {
  return {
    userAgent: navigator.userAgent,
    language: navigator.language,
    colorDepth: String(screen.colorDepth),
    screenHeight: String(screen.height),
    screenWidth: String(screen.width),
    timeZoneOffset: String(new Date().getTimezoneOffset()),
    javaEnabled: false,
    javaScriptEnabled: true
  };
}