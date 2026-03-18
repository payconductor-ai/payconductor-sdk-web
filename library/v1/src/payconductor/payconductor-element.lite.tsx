import {onMount, useRef, useStore} from "@builder.io/mitosis";
import {IFRAME_DEFAULT_HEIGHT_VALUE, POST_MESSAGES} from "./constants";
import {PayConductorContextValue} from "./types";
import {SKELETON_CSS, SKELETON_STYLE_ID} from "./utils";

export interface PayConductorCheckoutElementProps {
    height?: string;
}

export default function PayConductorCheckoutElement(
    props: PayConductorCheckoutElementProps,
) {
    const iframeRef = useRef<any>(null);

    const state = useStore({
        iframeUrl: "",
        isLoaded: false,
        iframeHeight: "",
    });

    onMount(() => {
        if (typeof document !== "undefined" && !document.getElementById(SKELETON_STYLE_ID)) {
            const styleEl = document.createElement("style");
            styleEl.id = SKELETON_STYLE_ID;
            styleEl.textContent = SKELETON_CSS;
            document.head.appendChild(styleEl);
        }

        const init = (ctx: PayConductorContextValue) => {
            if (!ctx?.frame) return;
            state.iframeUrl = ctx.frame.iframeUrl || "";
            state.isLoaded = true;
            console.log("init", {PayConductor: window.PayConductor});
        };

        const ctx = typeof window !== "undefined" ? window.PayConductor : null;

        if (ctx) {
            init(ctx);
        } else {
            const handler = (e: Event) => {
                init((e as CustomEvent).detail as PayConductorContextValue);
                window.removeEventListener("payconductor:registered", handler);
            };
            window.addEventListener("payconductor:registered", handler);
        }

        let heightSent = false;

        const handleMessages = (event: MessageEvent) => {
            if (event.data?.type === POST_MESSAGES.RESIZE && event.data?.data?.height) {
                state.iframeHeight = event.data.data.height + "px";
            }

            if (event.data?.type === POST_MESSAGES.READY && props.height && !heightSent) {
                heightSent = true;
                const iframe = document.querySelector(".payconductor-element iframe") as HTMLIFrameElement;
                if (iframe?.contentWindow) {
                    iframe.contentWindow.postMessage(
                        {type: POST_MESSAGES.CONFIG, data: {height: props.height}, requestId: "element-height"},
                        "*",
                    );
                }
            }
        };

        window.addEventListener("message", handleMessages);

        return () => window.removeEventListener("message", handleMessages);
    });

    return (
        <div
            class="payconductor-element"
            style={{width: "100%"}}
        >
            {!state.isLoaded && (
                <div
                    class="payconductor-skeleton"
                    style={{height: props.height || IFRAME_DEFAULT_HEIGHT_VALUE}}
                />
            )}
            {state.isLoaded && state.iframeUrl && (
                <iframe
                    allow="payment"
                    ref={iframeRef}
                    src={state.iframeUrl}
                    style={{
                        width: "100%",
                        height: props.height || state.iframeHeight || IFRAME_DEFAULT_HEIGHT_VALUE,
                        border: "none",
                    }}
                    title="PayConductor"
                />
            )}
        </div>
    );
}
