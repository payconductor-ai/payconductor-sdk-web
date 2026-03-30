import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { Component, Input } from "@angular/core";

export interface PayConductorThreeDSElementProps {
  height?: string;
}

@Component({
  selector: "pay-conductor-three-ds-element",
  template: `
    <div
      class="payconductor-three-ds"
      id="payconductor-3ds-container"
      [ngStyle]='{
          width: "100%",
          display: visible ? "block" : "none",
          minHeight: visible ? height || "600px" : "0"
        }'
    ></div>
  `,
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
})
export default class PayConductorThreeDSElement {
  @Input() height!: PayConductorThreeDSElementProps["height"];

  visible = false;

  ngOnInit() {
    if (typeof window !== "undefined") {
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
    }
  }
}

@NgModule({
  declarations: [PayConductorThreeDSElement],
  imports: [CommonModule],
  exports: [PayConductorThreeDSElement],
})
export class PayConductorThreeDSElementModule {}
