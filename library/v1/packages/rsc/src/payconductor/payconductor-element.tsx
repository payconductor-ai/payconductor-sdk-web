"use client";
import * as React from "react";
import { useState, useRef, useEffect } from "react";

export interface PayConductorCheckoutElementProps {
  height?: string;
}

import { IFRAME_DEFAULT_HEIGHT_VALUE, POST_MESSAGES } from "./constants";
import { PayConductorContextValue } from "./types";
import { SKELETON_CSS, SKELETON_STYLE_ID } from "./utils";

function PayConductorCheckoutElement(props: PayConductorCheckoutElementProps) {
  const iframeRef = useRef<any>(null);
  const [iframeUrl, setIframeUrl] = useState(() => "");

  const [isLoaded, setIsLoaded] = useState(() => false);

  const [iframeHeight, setIframeHeight] = useState(() => "");

  useEffect(() => {
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
      setIframeUrl(ctx.frame.iframeUrl || "");
      setIsLoaded(true);
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
        setIframeHeight(event.data.data.height + "px");
      }
      if (
        event.data?.type === POST_MESSAGES.READY &&
        props.height &&
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
                height: props.height,
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
  }, []);

  return (
    <div
      className="payconductor-element"
      style={{
        width: "100%",
      }}
    >
      {!isLoaded ? (
        <div
          className="payconductor-skeleton"
          style={{
            height: props.height || IFRAME_DEFAULT_HEIGHT_VALUE,
          }}
        />
      ) : null}
      {isLoaded && iframeUrl ? (
        <iframe
          allow="payment"
          title="PayConductor"
          ref={iframeRef}
          src={iframeUrl}
          style={{
            width: "100%",
            height: props.height || iframeHeight || IFRAME_DEFAULT_HEIGHT_VALUE,
            border: "none",
          }}
        />
      ) : null}
    </div>
  );
}

export default PayConductorCheckoutElement;
