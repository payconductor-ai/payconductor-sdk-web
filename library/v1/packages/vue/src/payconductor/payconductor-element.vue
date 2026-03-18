<template>
  <div
    class="payconductor-element"
    :style="{
      width: '100%',
    }"
  >
    <template v-if="!isLoaded">
      <div
        class="payconductor-skeleton"
        :style="{
          height: height || IFRAME_DEFAULT_HEIGHT_VALUE,
        }"
      ></div>
    </template>

    <template v-if="isLoaded && iframeUrl">
      <iframe
        allow="payment"
        title="PayConductor"
        ref="iframeRef"
        :src="iframeUrl"
        :style="{
          width: '100%',
          height: height || iframeHeight || IFRAME_DEFAULT_HEIGHT_VALUE,
          border: 'none',
        }"
      ></iframe>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { IFRAME_DEFAULT_HEIGHT_VALUE, POST_MESSAGES } from "./constants";
import { PayConductorContextValue } from "./types";
import { SKELETON_CSS, SKELETON_STYLE_ID } from "./utils";

export interface PayConductorCheckoutElementProps {
  height?: string;
}

export default defineComponent({
  name: "pay-conductor-checkout-element",

  props: ["height"],

  data() {
    return {
      iframeUrl: "",
      isLoaded: false,
      iframeHeight: "",
      IFRAME_DEFAULT_HEIGHT_VALUE,
    };
  },

  mounted() {
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
      this.iframeUrl = ctx.frame.iframeUrl || "";
      this.isLoaded = true;
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
        this.iframeHeight = event.data.data.height + "px";
      }
      if (
        event.data?.type === POST_MESSAGES.READY &&
        this.height &&
        !heightSent
      ) {
        heightSent = true;
        const iframe = document.querySelector(
          ".payconductor-element iframe"
        ) as HTMLIFrameElement;
        if (iframe?.contentWindow) {
          iframe.contentWindow.postMessage(
            {
              type: POST_MESSAGES.CONFIG,
              data: {
                height: this.height,
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
  },
});
</script>