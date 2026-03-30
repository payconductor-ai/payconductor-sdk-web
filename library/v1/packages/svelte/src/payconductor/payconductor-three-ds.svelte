<script context="module" lang="ts">
  export interface PayConductorThreeDSElementProps {
    height?: string;
  }
</script>

<script lang="ts">
  import { onMount } from "svelte";

  export let height: PayConductorThreeDSElementProps["height"] = undefined;
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

  let visible = false;

  onMount(() => {
    const handleShow = () => {
      visible = true;
    };
    const handleHide = () => {
      visible = false;
    };
    window.addEventListener("payconductor:3ds:show", handleShow);
    window.addEventListener("payconductor:3ds:hide", handleHide);
    if (typeof window !== "undefined") {
      window.PayConductor3DS = {
        container: () => document.getElementById("payconductor-3ds-container"),
        show: handleShow,
        hide: handleHide,
      };
      window.dispatchEvent(new CustomEvent("payconductor:3ds:registered"));
    }
    return () => {
      window.removeEventListener("payconductor:3ds:show", handleShow);
      window.removeEventListener("payconductor:3ds:hide", handleHide);
      window.PayConductor3DS = null;
    };
  });
</script>

<div
  style={stringifyStyles({
    width: "100%",
    display: visible ? "block" : "none",
    minHeight: visible ? height || "600px" : "0",
  })}
  class="payconductor-three-ds"
  id="payconductor-3ds-container"
/>