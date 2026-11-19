//# allFunctionsCalledOnLoad
import { c as IS_MOBILE_SAFARI, o as IS_FIREFOX, p as MOUNT_CLASS_TO } from "./userAgent-ByGXcznk.js";
import { t as CURRENT_ACCOUNT_QUERY_PARAM } from "./constants-DqJIiZwa.js";
import { n as logger } from "./logger-7zf0rNYS.js";
import { r as tabId } from "./superMessagePort-DhrhiTig.js";
import { t as bindActiveWindowListener } from "./appWindow-bo-KtJhy.js";
import { c as getCurrentAccountFromURL, r as getCurrentAccount } from "./getCurrentAccount-D0KQFbZ6.js";
import { t as cancelEvent } from "./cancelEvent-Cw8vYZHp.js";
//#region src/helpers/dom/blurActiveElement.ts
function blurActiveElement() {
	if (document.activeElement?.blur) {
		document.activeElement.blur();
		return true;
	}
	return false;
}
//#endregion
//#region src/helpers/dom/isSwipingBackSafari.ts
function isSwipingBackSafari(e) {
	return IS_MOBILE_SAFARI && e instanceof TouchEvent && e.touches[0].clientX < 30;
}
//#endregion
//#region src/lib/accounts/createAppURLForAccount.ts
function createAppURLForAccount(accountNumber, hashParams, keepHash = false) {
	const url = new URL(location.href);
	const filteredEntries = Object.entries(hashParams || {}).filter((entry) => entry[1]);
	const filteredParams = Object.fromEntries(filteredEntries);
	if (filteredEntries.length) {
		const hashSearchParams = new URLSearchParams();
		for (const key in filteredParams) hashSearchParams.set(key, filteredParams[key]);
		url.hash = `#/im?${hashSearchParams.toString()}`;
	} else if (!keepHash) url.hash = "";
	if (accountNumber === 1) url.searchParams.delete(CURRENT_ACCOUNT_QUERY_PARAM);
	else url.searchParams.set(CURRENT_ACCOUNT_QUERY_PARAM, accountNumber + "");
	return url;
}
//#endregion
//#region src/components/appNavigationController.ts
var USE_NAVIGATION_API = "navigation" in window && !IS_FIREFOX;
var TRY_TO_TRAVERSE = USE_NAVIGATION_API && true;
function isOtherAccountURL(url) {
	return getCurrentAccountFromURL(url) !== getCurrentAccount();
}
var AppNavigationController = class {
	constructor() {
		this.escapeHandlers = [];
		this.onNavigate = (event) => {
			this.modificationResolve?.();
			const log = this.log.bindPrefix("navigate");
			log(event, navigation.currentEntry);
			const fixHashIfNeeded = () => {
				const destinationHash = new URL(event.destination.url).hash;
				if (event.navigationType === "traverse" && (destinationHash !== this.currentHash || isOtherAccountURL(event.destination.url))) this.modifyHistoryFromEvent(() => {
					log("will fix hash", destinationHash, this.currentHash);
					this.replaceState();
				});
			};
			if (event.destination.index > navigation.currentEntry.index) {
				log("ignoring forward navigation");
				cancelEvent(event);
				event.intercept();
				fixHashIfNeeded();
				return;
			}
			if (event.navigationType === this.ignoreNextNavigations[0]) {
				log("ignoring event", event.navigationType);
				this.ignoreNextNavigations.shift();
				fixHashIfNeeded();
				return;
			}
			if ((event.navigationType === "push" || event.navigationType === "replace" && !event.destination.sameDocument) && event.destination.getState() === this.id) {
				event.intercept({
					handler: () => {
						log("push-like intercepted");
					},
					focusReset: "manual",
					scroll: "manual"
				});
				return;
			}
			if (event.navigationType === "reload" || event.navigationType === "replace" || !event.destination.sameDocument) return;
			const url = new URL(event.destination.url);
			if (event.navigationType === "push") {
				this.overrideHash(url.hash);
				this.onHashChange?.();
				return;
			}
			let hash = url.hash;
			if (event.destination.index < navigation.currentEntry.index) {
				hash = this.currentHash;
				fixHashIfNeeded();
			}
			this._onPopState(hash, 0);
		};
		this.onPopState = (e) => {
			let hash = window.location.hash;
			if (isOtherAccountURL(location.href)) {
				const url = createAppURLForAccount(getCurrentAccount(), void 0, true);
				url.hash = hash = this.currentHash;
				history.replaceState(history.state, "", url);
			}
			this._onPopState(hash, e.state);
		};
		this.onKeyDown = (e) => {
			const item = this.navigations[this.navigations.length - 1];
			if (!item) return;
			if (e.key === "Escape" && !e.defaultPrevented && this.canCloseOnEscape() && (item.onEscape ? item.onEscape(e) : true)) {
				cancelEvent(e);
				this.back(item.type);
			}
		};
		this.onTouchStart = (e) => {
			if (e.touches.length > 1) return;
			this.debug && this.log("touchstart");
			if (isSwipingBackSafari(e)) {
				this.isPossibleSwipe = true;
				window.addEventListener("touchend", () => {
					setTimeout(() => {
						this.isPossibleSwipe = false;
					}, 100);
				}, {
					passive: true,
					once: true
				});
			}
		};
		this.navigations = [];
		this.id = tabId;
		this.manual = false;
		this.log = logger("NC");
		this.debug = true;
		this.currentHash = window.location.hash;
		this.overriddenHash = "";
		this.isPossibleSwipe = false;
		this.ignoreNextNavigations = [];
		this.popping = false;
		this.modificationQueue = [];
		this.modificationBusy = false;
		history.scrollRestoration = "manual";
		if (USE_NAVIGATION_API) navigation.addEventListener("navigate", this.onNavigate);
		else {
			window.addEventListener("popstate", this.onPopState);
			if (!USE_NAVIGATION_API) this.pushState();
		}
		bindActiveWindowListener((w) => w, "keydown", this.onKeyDown, {
			capture: true,
			passive: false
		});
		if (IS_MOBILE_SAFARI) window.addEventListener("touchstart", this.onTouchStart, { passive: true });
	}
	_onPopState(hash, id) {
		this.debug && this.log("popstate", this.isPossibleSwipe, hash, id);
		if (hash !== this.currentHash) {
			this.debug && this.log.warn(`hash changed, new=${hash}, current=${this.currentHash}, overridden=${this.overriddenHash}`);
			if ((USE_NAVIGATION_API || id === this.id) && this.overriddenHash && this.overriddenHash !== hash) this.overrideHash(this.overriddenHash, true);
			else if (id && !this.overriddenHash && hash) this.overrideHash(void 0, true);
			else {
				this.currentHash = hash;
				this.onHashChange?.();
				return;
			}
		}
		if (!USE_NAVIGATION_API && id !== this.id) {
			this.pushState();
			if (!this.navigations.length) return;
		}
		const item = this.navigations.pop();
		if (!item) {
			this.pushState();
			return;
		}
		this.manual = !this.isPossibleSwipe;
		this.popping = true;
		this.handleItem(item, this.navigations.length);
		this.popping = false;
	}
	overrideHash(hash = "", forceReplace) {
		if (hash && hash[0] !== "#") hash = "#" + hash;
		else if (hash === "#") hash = "";
		if (this.currentHash === hash && !forceReplace) return;
		this.overriddenHash = this.currentHash = hash;
		this.modifyHistoryFromEvent(() => {
			this.replaceState();
		});
	}
	handleItem(item, wasIndex = this.navigations.indexOf(item)) {
		const good = item.onPop(!this.manual ? false : void 0);
		this.debug && this.log("popstate, navigation:", item, this.navigations);
		if (good === false) this.spliceItems(Math.min(this.navigations.length, wasIndex), 0, item);
		else if (!item.noBlurOnPop) blurActiveElement();
		if (good !== false) this.onItemDeleted(item);
		this.manual = false;
	}
	onItemDeleted(item) {
		if (item.removed) return;
		this.log.warn("onItemDeleted", item);
		if (TRY_TO_TRAVERSE && !item.noHistory && !this.popping) this.modifyHistoryFromEvent(() => {
			this.log("onItemDeleted: back");
			this.ignoreNextNavigations.unshift("traverse");
			if (USE_NAVIGATION_API) navigation.back();
			else history.back();
		});
		item.removed = true;
	}
	findItemByType(type) {
		for (let i = this.navigations.length - 1; i >= 0; --i) {
			const item = this.navigations[i];
			if (item.type === type) return {
				item,
				index: i
			};
		}
	}
	back(type) {
		if (type) {
			const ret = this.findItemByType(type);
			if (ret) {
				this.backByItem(ret.item, ret.index);
				return;
			}
		}
		history.back();
	}
	backByItem(item, index = this.navigations.indexOf(item)) {
		if (index === -1) return;
		this.manual = true;
		this.spliceItems(index, 1);
		this.handleItem(item, index);
	}
	onItemAdded(item) {
		this.debug && this.log("onItemAdded", item, this.navigations);
		delete item.removed;
		if (!item.noHistory) this.modifyHistoryFromEvent(() => {
			this.log("onItemAdded: push");
			this.pushState();
		});
	}
	pushItem(item) {
		this.navigations.push(item);
		this.onItemAdded(item);
	}
	unshiftItem(item) {
		this.navigations.unshift(item);
		this.onItemAdded(item);
	}
	spliceItems(index, length, ...items) {
		this.navigations.splice(index, length, ...items).forEach((item) => {
			this.onItemDeleted(item);
		});
		items.forEach((item) => {
			this.onItemAdded(item);
		});
	}
	pushState() {
		this.debug && this.log.warn("push");
		this.manual = false;
		if (USE_NAVIGATION_API) navigation.navigate(location.href, {
			state: this.id,
			history: "push"
		});
		else history.pushState(this.id, "");
	}
	replaceState(url) {
		this.debug && this.log.warn("replace");
		if (!url) {
			url = createAppURLForAccount(getCurrentAccount(), void 0, true);
			url.hash = this.overriddenHash;
		}
		if (USE_NAVIGATION_API) navigation.navigate(url, {
			state: this.id,
			history: "replace"
		});
		else history.replaceState(this.id, "", url);
	}
	removeItem(item) {
		const index = this.navigations.indexOf(item);
		if (index === -1) return;
		this.spliceItems(index, 1);
	}
	removeByType(type, single = false) {
		for (let i = this.navigations.length - 1; i >= 0; --i) if (this.navigations[i].type === type) {
			this.spliceItems(i, 1);
			if (single) break;
		}
	}
	canCloseOnEscape() {
		return this.escapeHandlers.every((fn) => fn());
	}
	registerEscapeHandler(handler) {
		this.escapeHandlers.push(handler);
		return () => {
			this.escapeHandlers = this.escapeHandlers.filter((fn) => fn !== handler);
		};
	}
	modifyHistoryFromEvent(callback) {
		if (!USE_NAVIGATION_API) {
			callback?.();
			return;
		}
		if (callback) this.modificationQueue.push(callback);
		if (this.modificationBusy) return;
		this.modificationBusy = true;
		setTimeout(() => {
			const callback = this.modificationQueue.shift();
			if (!callback) return;
			this.modificationResolve = () => {
				this.modificationResolve = void 0;
				this.modificationBusy = false;
				if (this.modificationQueue.length) this.modifyHistoryFromEvent();
			};
			callback();
		}, 0);
	}
	getNextIndex() {
		return this.navigations.length;
	}
	findItem(predicate) {
		const index = this.navigations.findIndex(predicate);
		return index === -1 ? void 0 : {
			index,
			item: this.navigations[index]
		};
	}
	reload(urlOrRemoveHash) {
		this.spliceItems(0, Infinity);
		if (typeof urlOrRemoveHash === "boolean") urlOrRemoveHash && this.overrideHash();
		else this.modifyHistoryFromEvent(() => {
			this.replaceState(urlOrRemoveHash);
		});
		this.modifyHistoryFromEvent(() => {
			this.leaving = true;
			location.reload();
		});
	}
	/**
	* The tab switched to another account in place: nothing of the previous one is left to go back
	* to - but what outlives the switch (a call's panels, `kept`) - and the address names the new one
	* (a reload, a push or the service worker read it from there).
	*/
	resetForAccountSwitch(url, kept = []) {
		for (let index = this.navigations.length - 1; index >= 0; --index) if (!kept.includes(this.navigations[index])) this.spliceItems(index, 1);
		this.currentHash = this.overriddenHash = url.hash;
		this.modifyHistoryFromEvent(() => {
			this.replaceState(url);
		});
	}
	close() {
		try {
			window.close();
		} catch (e) {}
	}
	/**
	* Better to call from event
	*/
	focus() {
		window.focus();
	}
	navigateToUrl(url) {
		if (USE_NAVIGATION_API) navigation.removeEventListener("navigate", this.onNavigate);
		else window.removeEventListener("popstate", this.onPopState);
		setTimeout(() => {
			this.leaving = true;
			location.href = url;
		}, 100);
	}
};
var appNavigationController = new AppNavigationController();
MOUNT_CLASS_TO.appNavigationController = appNavigationController;
//#endregion
export { blurActiveElement as a, isSwipingBackSafari as i, appNavigationController as n, createAppURLForAccount as r, USE_NAVIGATION_API as t };
