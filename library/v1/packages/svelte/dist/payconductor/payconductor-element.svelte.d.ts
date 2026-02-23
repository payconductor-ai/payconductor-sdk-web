import { SvelteComponent } from "svelte";
export interface PayConductorCheckoutElementProps {
    height?: string;
}
declare const __propDef: {
    props: {
        height?: PayConductorCheckoutElementProps["height"];
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type PayconductorElementProps = typeof __propDef.props;
export type PayconductorElementEvents = typeof __propDef.events;
export type PayconductorElementSlots = typeof __propDef.slots;
export default class PayconductorElement extends SvelteComponent<PayconductorElementProps, PayconductorElementEvents, PayconductorElementSlots> {
}
export {};
