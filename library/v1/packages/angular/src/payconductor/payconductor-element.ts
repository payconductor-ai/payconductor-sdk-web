import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { Component, ViewChild, ElementRef, Input } from "@angular/core";

export interface PayConductorCheckoutElementProps {
  height?: string;
}

import { IFRAME_DEFAULT_HEIGHT_VALUE, POST_MESSAGES } from "./constants";
import { PayConductorContextValue } from "./types";
import { SKELETON_CSS, SKELETON_STYLE_ID } from "./utils";

@Component({
  selector: "pay-conductor-checkout-element",
  template: `
    <div
      class="payconductor-element"
      [ngStyle]='{
          width: "100%"
        }'
    >
      <ng-container *ngIf="!isLoaded"
        ><div
          class="payconductor-skeleton"
          [ngStyle]="{
          height: height || IFRAME_DEFAULT_HEIGHT_VALUE
        }"
        ></div
      ></ng-container>
      <ng-container *ngIf="isLoaded && iframeUrl"
        ><iframe
          allow="payment"
          title="PayConductor"
          #iframeRef
          [attr.src]="iframeUrl"
          [ngStyle]='{
          width: "100%",
          height: height || iframeHeight || IFRAME_DEFAULT_HEIGHT_VALUE,
          border: "none"
        }'
        ></iframe
      ></ng-container>
    </div>
  `,
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
})
export default class PayConductorCheckoutElement {
  IFRAME_DEFAULT_HEIGHT_VALUE = IFRAME_DEFAULT_HEIGHT_VALUE;

  @Input() height!: PayConductorCheckoutElementProps["height"];

  @ViewChild("iframeRef") iframeRef!: ElementRef;

  iframeUrl = "";
  isLoaded = false;
  iframeHeight = "";

  ngOnInit() {
    if (typeof window !== "undefined") {
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
    }
  }
}

@NgModule({
  declarations: [PayConductorCheckoutElement],
  imports: [CommonModule],
  exports: [PayConductorCheckoutElement],
})
export class PayConductorCheckoutElementModule {}
