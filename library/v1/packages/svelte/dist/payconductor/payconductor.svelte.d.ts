import { SvelteComponent } from "svelte";
export interface PayConductorEmbedProps extends Omit<PayConductorConfig, "orderId"> {
    children?: any;
    showActionButtons?: boolean;
    debug?: boolean;
    onReady?: () => void;
    onError?: (error: Error) => void;
    onPaymentComplete?: (result: PaymentResult) => void;
    onPaymentFailed?: (result: PaymentResult) => void;
    onPaymentPending?: (result: PaymentResult) => void;
    onPaymentMethodSelected?: (method: PaymentMethod) => void;
}
import type { PayConductorConfig, PaymentMethod, PaymentResult } from "./iframe/types";
declare const __propDef: {
    props: {
        debug?: PayConductorEmbedProps["debug"];
        publicKey: PayConductorEmbedProps["publicKey"];
        theme?: PayConductorEmbedProps["theme"];
        locale?: PayConductorEmbedProps["locale"];
        paymentMethods?: PayConductorEmbedProps["paymentMethods"];
        defaultPaymentMethod?: PayConductorEmbedProps["defaultPaymentMethod"];
        showPaymentButtons?: PayConductorEmbedProps["showPaymentButtons"];
        nuPayConfig?: PayConductorEmbedProps["nuPayConfig"];
        onReady?: PayConductorEmbedProps["onReady"];
        onError?: PayConductorEmbedProps["onError"];
        onPaymentComplete?: PayConductorEmbedProps["onPaymentComplete"];
        onPaymentFailed?: PayConductorEmbedProps["onPaymentFailed"];
        onPaymentPending?: PayConductorEmbedProps["onPaymentPending"];
        onPaymentMethodSelected?: PayConductorEmbedProps["onPaymentMethodSelected"];
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type PayconductorProps = typeof __propDef.props;
export type PayconductorEvents = typeof __propDef.events;
export type PayconductorSlots = typeof __propDef.slots;
export default class Payconductor extends SvelteComponent<PayconductorProps, PayconductorEvents, PayconductorSlots> {
}
export {};
