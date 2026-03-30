import {
  Fragment,
  component$,
  h,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";

export interface PayConductorThreeDSElementProps {
  height?: string;
}
export const PayConductorThreeDSElement = component$(
  (props: PayConductorThreeDSElementProps) => {
    const state = useStore<any>({ visible: false });
    useVisibleTask$(() => {
      const handleShow = () => {
        state.visible = true;
      };
      const handleHide = () => {
        state.visible = false;
      };
      window.addEventListener("payconductor:3ds:show", handleShow);
      window.addEventListener("payconductor:3ds:hide", handleHide);
      if (typeof window !== "undefined") {
        window.PayConductor3DS = {
          container: () =>
            document.getElementById("payconductor-3ds-container"),
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
      <div
        class="payconductor-three-ds"
        id="payconductor-3ds-container"
        style={{
          width: "100%",
          display: state.visible ? "block" : "none",
          minHeight: state.visible ? props.height || "600px" : "0",
        }}
      ></div>
    );
  }
);

export default PayConductorThreeDSElement;
