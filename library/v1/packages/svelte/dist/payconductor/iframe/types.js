// PayConductor Shared Types
// Served statically at iframe.payconductor.ai/types.ts
// Used by the iFrame (imported directly) and the SDK Web (synced with: bun sync)
export var PaymentMethod;
(function (PaymentMethod) {
    PaymentMethod["Pix"] = "Pix";
    PaymentMethod["CreditCard"] = "CreditCard";
    PaymentMethod["DebitCard"] = "DebitCard";
    PaymentMethod["BankSlip"] = "BankSlip";
    PaymentMethod["Crypto"] = "Crypto";
    PaymentMethod["ApplePay"] = "ApplePay";
    PaymentMethod["NuPay"] = "NuPay";
    PaymentMethod["PicPay"] = "PicPay";
    PaymentMethod["AmazonPay"] = "AmazonPay";
    PaymentMethod["SepaDebit"] = "SepaDebit";
    PaymentMethod["GooglePay"] = "GooglePay";
})(PaymentMethod || (PaymentMethod = {}));
export var PaymentMethodLayout;
(function (PaymentMethodLayout) {
    PaymentMethodLayout["Grid"] = "grid";
    PaymentMethodLayout["Vertical"] = "vertical";
    PaymentMethodLayout["Horizontal"] = "horizontal";
})(PaymentMethodLayout || (PaymentMethodLayout = {}));
export var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["Succeeded"] = "succeeded";
    PaymentStatus["Pending"] = "pending";
    PaymentStatus["Failed"] = "failed";
})(PaymentStatus || (PaymentStatus = {}));
export var DeviceType;
(function (DeviceType) {
    DeviceType["Android"] = "android";
    DeviceType["IOS"] = "ios";
    DeviceType["Web"] = "web";
})(DeviceType || (DeviceType = {}));
export var InputStyleKey;
(function (InputStyleKey) {
    InputStyleKey["Padding"] = "padding";
    InputStyleKey["Radius"] = "radius";
    InputStyleKey["Color"] = "color";
    InputStyleKey["Background"] = "background";
    InputStyleKey["Shadow"] = "shadow";
})(InputStyleKey || (InputStyleKey = {}));
export var OutgoingMessage;
(function (OutgoingMessage) {
    OutgoingMessage["Init"] = "Init";
    OutgoingMessage["Config"] = "Config";
    OutgoingMessage["Update"] = "Update";
    OutgoingMessage["ConfirmPayment"] = "ConfirmPayment";
    OutgoingMessage["Validate"] = "Validate";
    OutgoingMessage["Reset"] = "Reset";
})(OutgoingMessage || (OutgoingMessage = {}));
export var IncomingMessage;
(function (IncomingMessage) {
    IncomingMessage["Ready"] = "Ready";
    IncomingMessage["Error"] = "Error";
    IncomingMessage["PaymentComplete"] = "PaymentComplete";
    IncomingMessage["PaymentFailed"] = "PaymentFailed";
    IncomingMessage["PaymentPending"] = "PaymentPending";
    IncomingMessage["ValidationError"] = "ValidationError";
    IncomingMessage["PaymentMethodSelected"] = "PaymentMethodSelected";
})(IncomingMessage || (IncomingMessage = {}));
export var ErrorCode;
(function (ErrorCode) {
    ErrorCode["InvalidClient"] = "InvalidClient";
    ErrorCode["InvalidToken"] = "InvalidToken";
    ErrorCode["NetworkError"] = "NetworkError";
    ErrorCode["IframeNotReady"] = "IframeNotReady";
    ErrorCode["PaymentDeclined"] = "PaymentDeclined";
    ErrorCode["ValidationError"] = "ValidationError";
    ErrorCode["Timeout"] = "Timeout";
})(ErrorCode || (ErrorCode = {}));
export const defaultTheme = {
    primaryColor: "#0066ff",
    secondaryColor: "#5a6b7c",
    backgroundColor: "transparent",
    surfaceColor: "#f8fafc",
    textColor: "#0f172a",
    textSecondaryColor: "#64748b",
    errorColor: "#ef4444",
    successColor: "#22c55e",
    warningColor: "#f59e0b",
    borderColor: "#e2e8f0",
    disabledColor: "#cbd5e1",
    fontFamily: '"Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        md: "1rem",
        lg: "1.125rem",
        xl: "1.25rem"
    },
    fontWeight: {
        normal: 400,
        medium: 500,
        bold: 600
    },
    lineHeight: "1.5",
    spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px"
    },
    borderRadius: "8px",
    borderWidth: "1px",
    boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    boxShadowHover: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    inputBackground: "#ffffff",
    inputBorderColor: "#cbd5e1",
    inputBorderRadius: "8px",
    inputHeight: "44px",
    inputPadding: "12px 16px",
    buttonHeight: "48px",
    buttonPadding: "16px 24px",
    buttonBorderRadius: "8px",
    transitionDuration: "0.2s",
    transitionTimingFunction: "ease"
};
