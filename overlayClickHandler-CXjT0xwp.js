//# allFunctionsCalledOnLoad
import { c as IS_MOBILE_SAFARI, h as Modes } from "./userAgent-ByGXcznk.js";
import { n as appNavigationController } from "./appNavigationController-Ct0fx8yF.js";
import { t as IS_TOUCH_SUPPORTED } from "./touchSupport-B2RWO3zD.js";
import { t as EventListenerBase } from "./eventListenerBase-da40Q-0t.js";
import { r as getOverlayRoot } from "./appWindow-bo-KtJhy.js";
import { t as cancelEvent } from "./cancelEvent-Cw8vYZHp.js";
import { t as findUpAsChild } from "./findUpAsChild-CPjgnY00.js";
import { r as hasMouseMovedSinceDown, t as CLICK_EVENT_NAME } from "./clickEvent-COk4YpLP.js";
//#region src/helpers/overlayClickHandler.ts
var OverlayClickHandler = class extends EventListenerBase {
	constructor(navigationType, withOverlay, passKeyboardActivation) {
		super(false);
		this.navigationType = navigationType;
		this.withOverlay = withOverlay;
		this.passKeyboardActivation = passKeyboardActivation;
		this.realmDocument = document;
		this.realmWindow = window;
		this.onClick = (e) => {
			if (hasMouseMovedSinceDown(e)) return;
			if (this.element) {
				if (!(this.element === this.element.ownerDocument.body) && findUpAsChild(e.target, this.element)) return;
			}
			const keyboardActivation = Modes.a11y && e.type === "click" && e.detail === 0;
			if (this.listenerOptions?.capture && !(this.passKeyboardActivation && keyboardActivation)) cancelEvent(e);
			this.close(e);
		};
		this.listenerOptions = withOverlay ? {} : { capture: true };
	}
	close(e) {
		if (this.element) {
			this.overlay?.remove();
			this.element = void 0;
			this.dispatchEvent("toggle", false);
		}
		if (!IS_TOUCH_SUPPORTED) this.realmWindow.removeEventListener("contextmenu", this.onClick, this.listenerOptions);
		this.realmDocument.removeEventListener(CLICK_EVENT_NAME, this.onClick, this.listenerOptions);
		if (!IS_MOBILE_SAFARI && this.navigationType) appNavigationController.removeByType(this.navigationType);
	}
	open(element = getOverlayRoot()) {
		this.close();
		const doc = this.realmDocument = element.ownerDocument || document;
		const win = this.realmWindow = doc.defaultView || window;
		if (!IS_MOBILE_SAFARI && this.navigationType) appNavigationController.pushItem({
			type: this.navigationType,
			onEscape: this.onEscape,
			noBlurOnPop: Modes.a11y,
			onPop: (canAnimate) => {
				this.close();
			}
		});
		this.element = element;
		if ((!this.overlay || this.overlay.ownerDocument !== doc) && this.withOverlay) {
			this.overlay = doc.createElement("div");
			this.overlay.classList.add("btn-menu-overlay");
			this.overlay.addEventListener(CLICK_EVENT_NAME, (e) => {
				cancelEvent(e);
				this.onClick(e);
			});
		}
		const isRoot = this.element === doc.body;
		if (this.overlay) {
			if (isRoot) this.element.append(this.overlay);
			else this.element.parentElement.insertBefore(this.overlay, this.element);
		}
		if (!IS_TOUCH_SUPPORTED) win.addEventListener("contextmenu", this.onClick, {
			...this.listenerOptions,
			once: true
		});
		doc.addEventListener(CLICK_EVENT_NAME, this.onClick, this.listenerOptions);
		this.dispatchEvent("toggle", true);
	}
};
//#endregion
export { OverlayClickHandler as t };
