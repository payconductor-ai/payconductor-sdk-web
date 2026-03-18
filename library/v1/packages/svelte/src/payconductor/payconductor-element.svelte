<script context="module" lang="ts">
  export interface PayConductorCheckoutElementProps {
    height?: string;
  }
</script>

<script lang="ts">
  import { onMount } from "svelte";

  import { IFRAME_DEFAULT_HEIGHT_VALUE, POST_MESSAGES } from "./constants";
  import { PayConductorContextValue } from "./types";
  import { SKELETON_CSS, SKELETON_STYLE_ID } from "./utils";

  export let height: PayConductorCheckoutElementProps["height"] = undefined;
  function stringifyStyles(stylesObj) {
    let styles = "";
    for (let key in stylesObj) {
      const dashedKey = key.replace(/[A-Z]/g, function (match) {
        return "-" + match.toLowerCase();
      });
      styles += dashedKey + ":" + stylesObj[key] + ";";
    }
    return styles;
  }

  let iframeRef;

  let iframeUrl = "";
  let isLoaded = false;
  let iframeHeight = "";

  onMount(() => {
    if (
      typeof document !== "undefined" &&
      !document.getElementById(SKELETON_STYLE_ID)
    ) {
      const styleEl = document.createElement("style");
      styleEl.id = SKELETON_STYLE_ID;
      styleEl.textContent = SKELETON_CSS;
      document.head.appendChild(styleEl);
    }
    const init = (ctx: PayConductorContextValue) => {
      if (!ctx?.frame) return;
      iframeUrl = ctx.frame.iframeUrl || "";
      isLoaded = true;
      console.log("init", {
        PayConductor: window.PayConductor,
      });
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
      if (
        event.data?.type === POST_MESSAGES.RESIZE &&
        event.data?.data?.height
      ) {
        iframeHeight = event.data.data.height + "px";
      }
      if (event.data?.type === POST_MESSAGES.READY && height && !heightSent) {
        heightSent = true;
        const iframe = document.querySelector(
          ".payconductor-element iframe"
        ) as HTMLIFrameElement;
        if (iframe?.contentWindow) {
          iframe.contentWindow.postMessage(
            {
              type: POST_MESSAGES.CONFIG,
              data: {
                height: height,
              },
              requestId: "element-height",
            },
            "*"
          );
        }
      }
    };
    window.addEventListener("message", handleMessages);
    return () => window.removeEventListener("message", handleMessages);
  });
</script>

<div
  style={stringifyStyles({
    width: "100%",
  })}
  class="payconductor-element"
>
  {#if !isLoaded}
    <div
      style={stringifyStyles({
        height: height || IFRAME_DEFAULT_HEIGHT_VALUE,
      })}
      class="payconductor-skeleton"
    />
  {/if}
  {#if isLoaded && iframeUrl}
    <iframe
      style={stringifyStyles({
        width: "100%",
        height: height || iframeHeight || IFRAME_DEFAULT_HEIGHT_VALUE,
        border: "none",
      })}
      allow="payment"
      title="PayConductor"
      bind:this={iframeRef}
      src={iframeUrl}
    />
  {/if}
</div>