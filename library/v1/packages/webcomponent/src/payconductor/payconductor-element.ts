export interface PayConductorCheckoutElementProps {
  height?: string;
}

import { IFRAME_DEFAULT_HEIGHT_VALUE, POST_MESSAGES } from "./constants";
import { PayConductorContextValue } from "./types";
import { SKELETON_CSS, SKELETON_STYLE_ID } from "./utils";

/**
 * Usage:
 *
 *  <pay-conductor-checkout-element></pay-conductor-checkout-element>
 *
 */
class PayConductorCheckoutElement extends HTMLElement {
  get _iframeRef() {
    return this._root.querySelector(
      "[data-ref='PayConductorCheckoutElement-iframeRef']"
    );
  }

  get _root() {
    return this.shadowRoot || this;
  }

  constructor() {
    super();
    const self = this;

    this.state = { iframeUrl: "", isLoaded: false, iframeHeight: "" };
    if (!this.props) {
      this.props = {};
    }

    this.componentProps = ["height"];

    // used to keep track of all nodes created by show/for
    this.nodesToDestroy = [];
    // batch updates
    this.pendingUpdate = false;

    if (undefined) {
      this.attachShadow({ mode: "open" });
    }
  }

  destroyAnyNodes() {
    // destroy current view template refs before rendering again
    this.nodesToDestroy.forEach((el) => el.remove());
    this.nodesToDestroy = [];
  }

  connectedCallback() {
    this.getAttributeNames().forEach((attr) => {
      const jsVar = attr.replace(/-/g, "");
      const regexp = new RegExp(jsVar, "i");
      this.componentProps.forEach((prop) => {
        if (regexp.test(prop)) {
          const attrValue = this.getAttribute(attr);
          if (this.props[prop] !== attrValue) {
            this.props[prop] = attrValue;
          }
        }
      });
    });

    this._root.innerHTML = `
      <div
        class="payconductor-element"
        data-el="div-pay-conductor-checkout-element-1"
      >
        <template data-el="show-pay-conductor-checkout-element">
          <div
            class="payconductor-skeleton"
            data-el="div-pay-conductor-checkout-element-2"
          ></div>
        </template>
        <template data-el="show-pay-conductor-checkout-element-2">
          <iframe
            allow="payment"
            title="PayConductor"
            data-el="iframe-pay-conductor-checkout-element-1"
            data-ref="PayConductorCheckoutElement-iframeRef"
          ></iframe>
        </template>
      </div>`;
    this.pendingUpdate = true;

    this.render();
    this.onMount();
    this.pendingUpdate = false;
    this.update();
  }

  showContent(el) {
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLTemplateElement/content
    // grabs the content of a node that is between <template> tags
    // iterates through child nodes to register all content including text elements
    // attaches the content after the template

    const elementFragment = el.content.cloneNode(true);
    const children = Array.from(elementFragment.childNodes);
    children.forEach((child) => {
      if (el?.scope) {
        child.scope = el.scope;
      }
      if (el?.context) {
        child.context = el.context;
      }
      this.nodesToDestroy.push(child);
    });
    el.after(elementFragment);
  }

  onMount() {
    // onMount
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
      this.state.iframeUrl = ctx.frame.iframeUrl || "";
      this.update();
      this.state.isLoaded = true;
      this.update();
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
        this.state.iframeHeight = event.data.data.height + "px";
        this.update();
      }
      if (
        event.data?.type === POST_MESSAGES.READY &&
        this.props.height &&
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
                height: this.props.height,
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

  onUpdate() {}

  update() {
    if (this.pendingUpdate === true) {
      return;
    }
    this.pendingUpdate = true;
    this.render();
    this.onUpdate();
    this.pendingUpdate = false;
  }

  render() {
    // re-rendering needs to ensure that all nodes generated by for/show are refreshed
    this.destroyAnyNodes();
    this.updateBindings();
  }

  updateBindings() {
    this._root
      .querySelectorAll("[data-el='div-pay-conductor-checkout-element-1']")
      .forEach((el) => {
        Object.assign(el.style, {
          width: "100%",
        });
      });

    this._root
      .querySelectorAll("[data-el='show-pay-conductor-checkout-element']")
      .forEach((el) => {
        const whenCondition = !this.state.isLoaded;
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='div-pay-conductor-checkout-element-2']")
      .forEach((el) => {
        Object.assign(el.style, {
          height: this.props.height || IFRAME_DEFAULT_HEIGHT_VALUE,
        });
      });

    this._root
      .querySelectorAll("[data-el='show-pay-conductor-checkout-element-2']")
      .forEach((el) => {
        const whenCondition = this.state.isLoaded && this.state.iframeUrl;
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='iframe-pay-conductor-checkout-element-1']")
      .forEach((el) => {
        el.setAttribute("src", this.state.iframeUrl);
        Object.assign(el.style, {
          width: "100%",
          height:
            this.props.height ||
            this.state.iframeHeight ||
            IFRAME_DEFAULT_HEIGHT_VALUE,
          border: "none",
        });
      });
  }

  // Helper to render content
  renderTextNode(el, text) {
    const textNode = document.createTextNode(text);
    if (el?.scope) {
      textNode.scope = el.scope;
    }
    if (el?.context) {
      textNode.context = el.context;
    }
    el.after(textNode);
    this.nodesToDestroy.push(el.nextSibling);
  }
}

customElements.define(
  "pay-conductor-checkout-element",
  PayConductorCheckoutElement
);
