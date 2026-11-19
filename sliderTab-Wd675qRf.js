//# allFunctionsCalledOnLoad
import { t as noop } from "./noop-H9NNBLfX.js";
import { t as EventListenerBase } from "./eventListenerBase-da40Q-0t.js";
import { a as i18n } from "./langPack-BmdJGr44.js";
import { n as deferredPromise } from "./cancellablePromise-bof--dnO.js";
import { a as isSessionLeaving, i as getManagersSession } from "./getCurrentAccount-D0KQFbZ6.js";
import { t as getMiddleware } from "./middleware-D6HuIqPm.js";
import { t as ListenerSetter } from "./listenerSetter-BER6qAXn.js";
import { t as updateScrollRegionFocusable } from "./scrollRegion-DQB9Uktd.js";
import { t as Scrollable } from "./scrollable-C2-FwBtK.js";
import { t as ButtonIcon } from "./buttonIcon-CthJWloV.js";
//#region src/components/sliderTab.ts
var SliderSuperTab = class {
	/** A reopened tab slides in again, so what waits on `shown` has to wait anew. */
	resetShown() {
		if (this.shown.isFulfilled) this.shown = deferredPromise();
	}
	constructor(slider, destroyable) {
		this.shown = deferredPromise();
		this._constructor(slider, destroyable);
	}
	_constructor(slider, destroyable = true) {
		this.slider = slider;
		this.middlewareHelper = slider ? slider.getMiddleware().create() : getMiddleware();
		this.destroyable = destroyable;
		this.container = document.createElement("div");
		this.container.classList.add("tabs-tab", "sidebar-slider-item");
		this.header = document.createElement("div");
		this.header.classList.add("sidebar-header");
		this.closeBtn = ButtonIcon("left sidebar-close-button", { noRipple: true });
		this.title = document.createElement("div");
		this.title.classList.add("sidebar-header__title");
		this.header.append(this.closeBtn, this.title);
		this.content = document.createElement("div");
		this.content.classList.add("sidebar-content");
		this.scrollable = new Scrollable(this.content, void 0, void 0, true);
		this.scrollable.attachBorderListeners(this.container);
		this.container.append(this.header, this.content);
		this.slider?.addTab(this);
		this.listenerSetter = new ListenerSetter();
	}
	close() {
		return this.slider.closeTab(this);
	}
	async open(...args) {
		const session = getManagersSession(this.managers);
		if (this.init) try {
			const result = this.init(...args);
			this.init = null;
			if (result instanceof Promise) await result;
		} catch (err) {
			console.error("open tab error", err);
		}
		if (isSessionLeaving(session)) {
			this.onCloseAfterTimeout();
			return;
		}
		updateScrollRegionFocusable(this.scrollable.container, this.title.textContent);
		this.slider.selectTab(this);
	}
	init(...args) {}
	onOpen() {}
	onOpenAfterTimeout() {}
	onClose() {}
	onCloseAfterTimeout() {
		if (this.destroyable) {
			this.slider?.deleteTab(this);
			this.container.remove();
			this.scrollable.destroy();
			this.listenerSetter?.removeAll();
			this.middlewareHelper?.destroy();
		}
	}
	setTitle(key) {
		this.title.replaceChildren(i18n(key));
	}
};
var SliderSuperTabEventable = class extends SliderSuperTab {
	constructor(slider) {
		super(slider);
		this.eventListener = new EventListenerBase();
	}
	onClose() {
		this.eventListener.dispatchEvent("close");
	}
	onCloseAfterTimeout() {
		const results = this.eventListener.dispatchResultableEvent("destroy");
		this.eventListener.dispatchEvent("destroyAfter", Promise.all(results).then(noop, noop));
		this.eventListener.cleanup();
		return super.onCloseAfterTimeout();
	}
};
//#endregion
export { SliderSuperTabEventable as n, SliderSuperTab as t };
