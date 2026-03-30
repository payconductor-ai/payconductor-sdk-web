<template>
  <div
    class="payconductor-three-ds"
    id="payconductor-3ds-container"
    :style="{
      width: '100%',
      display: visible ? 'block' : 'none',
      minHeight: visible ? height || '600px' : '0',
    }"
  ></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export interface PayConductorThreeDSElementProps {
  height?: string;
}

export default defineComponent({
  name: "pay-conductor-three-ds-element",

  props: ["height"],

  data() {
    return { visible: false };
  },

  mounted() {
    const handleShow = () => {
      this.visible = true;
    };
    const handleHide = () => {
      this.visible = false;
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
  },
});
</script>