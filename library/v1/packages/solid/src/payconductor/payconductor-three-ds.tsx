import { onMount, createSignal, createMemo } from "solid-js";

export interface PayConductorThreeDSElementProps {
  height?: string;
}

function PayConductorThreeDSElement(props: PayConductorThreeDSElementProps) {
  const [visible, setVisible] = createSignal(false);

  onMount(() => {
    const handleShow = () => {
      setVisible(true);
    };
    const handleHide = () => {
      setVisible(false);
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

  return (
    <>
      <div
        class="payconductor-three-ds"
        id="payconductor-3ds-container"
        style={{
          width: "100%",
          display: visible() ? "block" : "none",
          "min-height": visible() ? props.height || "600px" : "0",
        }}
      ></div>
    </>
  );
}

export default PayConductorThreeDSElement;
