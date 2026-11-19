//# allFunctionsCalledOnLoad
import { l as IS_SAFARI, p as MOUNT_CLASS_TO } from "./userAgent-ByGXcznk.js";
import { n as fastRaf } from "./schedulers-Cx0-7a1P.js";
import { t as EventListenerBase } from "./eventListenerBase-da40Q-0t.js";
import { t as hotEffect } from "./hotModule-aCRkP77w.js";
import { j as getVisibleRect } from "./renderer-L80wjxct.js";
//#region src/helpers/scrollSaver.ts
var ScrollSaver = class {
	/**
	*
	* @param scrollable to reset scroll position and direction
	* @param reverse true means top
	*/
	constructor(scrollable, query, reverse) {
		this.scrollable = scrollable;
		this.query = query;
		this.reverse = reverse;
	}
	get container() {
		return this.scrollable.container;
	}
	getSaved() {
		return {
			scrollHeight: this.scrollHeight,
			scrollTop: this.scrollTop,
			clientHeight: this.clientHeight
		};
	}
	findElements() {
		if (!this.query) return [];
		const { container } = this;
		const containerRect = container.getBoundingClientRect();
		const bubbles = Array.from(container.querySelectorAll(this.query));
		const elements = [];
		for (const bubble of bubbles) {
			const elementRect = bubble.getBoundingClientRect();
			if (getVisibleRect(bubble, container, void 0, elementRect, containerRect)) elements.push({
				element: bubble,
				rect: elementRect
			});
			else if (elements.length) break;
		}
		if (!elements.length) {
			const bubble = bubbles[0];
			if (bubble) elements.push({
				element: bubble,
				rect: bubble.getBoundingClientRect()
			});
		}
		return elements;
	}
	replaceSaved(from, to) {
		if (!this.elements) return;
		const idx = this.elements.findIndex(({ element }) => from === element);
		if (idx !== -1) this.elements[idx].element = to;
	}
	findAndSetElements() {
		this.elements = this.findElements();
	}
	save() {
		this.findAndSetElements();
		this._save();
	}
	_save() {
		const { scrollTop, scrollHeight, clientHeight } = this.container;
		this.scrollHeight = scrollHeight;
		this.scrollTop = scrollTop;
		this.clientHeight = clientHeight;
		this.scrollHeightMinusTop = this.reverse ? scrollHeight - scrollTop : scrollTop;
		this.scrolledToEnd = scrollHeight - Math.ceil(scrollTop + clientHeight) <= 1;
	}
	onRestore(useReflow) {
		this.scrollable.onSizeChange();
	}
	setScrollTop(newScrollTop, useReflow) {
		this.scrollable.setScrollPositionSilently(this.scrollTop = newScrollTop);
		if (IS_SAFARI) fastRaf(() => {
			if (this.scrollTop === newScrollTop) this.scrollable.setScrollPositionSilently(this.scrollTop = newScrollTop);
		});
		this.onRestore(useReflow);
	}
	getAnchor() {
		return this.elements[this.reverse ? 0 : this.elements.length - 1];
	}
	restore(useReflow) {
		const { scrollPosition: scrollTop, scrollSize: scrollHeight } = this.scrollable;
		this.scrollHeight = scrollHeight;
		if (!this.elements.length && this.query) {
			this.setScrollTop(this.reverse ? scrollHeight : 0, useReflow);
			return;
		}
		let anchor;
		anchor = this.getAnchor();
		if (!anchor?.element?.parentElement) {
			this.findAndSetElements();
			anchor = this.getAnchor();
			if (!anchor) {
				this._restore(useReflow);
				return;
			}
		}
		const { element, rect } = anchor;
		const newRect = element.getBoundingClientRect();
		const containerRect = this.container.getBoundingClientRect();
		const isOverflowingTop = rect.top < containerRect.top;
		const isOverflowingBottom = rect.bottom > containerRect.bottom;
		let positionKey = this.reverse ? "top" : "bottom";
		if (this.reverse ? isOverflowingTop && !isOverflowingBottom : isOverflowingBottom && !isOverflowingTop) positionKey = this.reverse ? "bottom" : "top";
		const newPosition = newRect[positionKey];
		let position = rect[positionKey];
		const modifiedHeight = rect.height - newRect.height;
		if (isOverflowingTop && isOverflowingBottom && modifiedHeight > 0) position = containerRect[positionKey];
		if (newPosition === position && !this.scrolledToEnd) return;
		const diff = newPosition - position;
		if (!Math.abs(diff)) return;
		this.setScrollTop(scrollTop + diff, useReflow);
	}
	_restore(useReflow) {
		const { scrollHeightMinusTop: previousScrollHeightMinusTop, scrollable } = this;
		const scrollHeight = this.scrollHeight;
		const newScrollTop = this.reverse ? scrollHeight - previousScrollHeightMinusTop : previousScrollHeightMinusTop;
		this.setScrollTop(newScrollTop, useReflow);
	}
};
MOUNT_CLASS_TO && (MOUNT_CLASS_TO.ScrollSaver = ScrollSaver);
//#endregion
//#region src/components/telegramWebView.ts
var weakMap = /* @__PURE__ */ new WeakMap();
/**
* The document HTML embeds are written into (public/embed.html): a srcdoc frame would inherit the app page's
* Content-Security-Policy. It asks for the markup once it has loaded.
*/
var EMBED_DOCUMENT = "embed.html";
var EMBED_READY = "tweb-embed-ready";
var EMBED_HTML = "tweb-embed-html";
hotEffect(void 0, () => {
	const onMessage = (e) => {
		weakMap.get(e.source)?.onMessage(e.origin, e.data);
	};
	window.addEventListener("message", onMessage);
	return () => window.removeEventListener("message", onMessage);
});
var TelegramWebView = class extends EventListenerBase {
	constructor({ url, sandbox, allow, html, origin, onLoad }) {
		super(false);
		this.onTelegramWebViewEvent = ({ eventType, eventData }) => {
			if (eventData === "") eventData = void 0;
			this.dispatchEvent(eventType, eventData);
		};
		const iframe = this.iframe = document.createElement("iframe");
		if (url) iframe.src = url;
		if (sandbox) iframe.setAttribute("sandbox", sandbox);
		if (allow) iframe.allow = allow;
		if (html) this.html = html;
		if (origin) this.origin = origin;
		if (onLoad) {
			this.onLoad = onLoad;
			iframe.addEventListener("load", onLoad, { once: true });
		}
	}
	setOrigin(origin) {
		this.origin = origin;
	}
	onMessage(origin, data) {
		if (this.html && typeof data === "object" && data?.type === EMBED_READY) {
			this.iframe.contentWindow.postMessage({
				type: EMBED_HTML,
				html: this.html
			}, "*");
			return;
		}
		if (this.origin && origin !== this.origin || typeof data !== "string") return;
		this.onTelegramWebViewEvent(JSON.parse(data));
	}
	onMount() {
		weakMap.set(this.iframe.contentWindow, this);
		if (this.html) this.iframe.src = EMBED_DOCUMENT;
	}
	destroy() {
		this.cleanup();
		weakMap.delete(this.iframe.contentWindow);
		this.iframe.removeEventListener("load", this.onLoad);
	}
	dispatchWebViewEvent(eventType, eventData) {
		if (this.lastDispatchedWebViewEvent?.type !== eventType) this.lastDispatchedWebViewEvent = {
			type: eventType,
			count: 0
		};
		++this.lastDispatchedWebViewEvent.count;
		this.iframe.contentWindow.postMessage(JSON.stringify({
			eventType,
			eventData
		}), this.origin || "*");
	}
};
//#endregion
export { ScrollSaver as n, TelegramWebView as t };
