<script context="module"></script>

<script>import { onMount } from "svelte";
import { IFRAME_DEFAULT_HEIGHT_VALUE } from "./constants";
export let height = void 0;
function stringifyStyles(stylesObj) {
  let styles = "";
  for (let key in stylesObj) {
    const dashedKey = key.replace(/[A-Z]/g, function(match) {
      return "-" + match.toLowerCase();
    });
    styles += dashedKey + ":" + stylesObj[key] + ";";
  }
  return styles;
}
let iframeRef;
let iframeUrl = "";
let isLoaded = false;
onMount(() => {
  const init = (ctx2) => {
    if (!ctx2?.frame)
      return;
    iframeUrl = ctx2.frame.iframeUrl || "";
    isLoaded = true;
    if (window.PayConductor && window.PayConductor.frame)
      window.PayConductor.frame.isReady = true;
    console.log("init", {
      PayConductor: window.PayConductor
    });
  };
  const ctx = typeof window !== "undefined" ? window.PayConductor : null;
  if (ctx) {
    init(ctx);
  } else {
    const handler = (e) => {
      init(e.detail);
      window.removeEventListener("payconductor:registered", handler);
    };
    window.addEventListener("payconductor:registered", handler);
  }
});
</script>

<div
  style={stringifyStyles({
    width: "100%",
  })}
  class="payconductor-element"
>
  {#if isLoaded && iframeUrl}
    <iframe
      style={stringifyStyles({
        width: "100%",
        height: height || IFRAME_DEFAULT_HEIGHT_VALUE,
        border: "none",
      })}
      allow="payment"
      title="PayConductor"
      bind:this={iframeRef}
      src={iframeUrl}
    />
  {/if}
</div>