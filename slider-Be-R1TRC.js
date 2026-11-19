//# allFunctionsCalledOnLoad
import { n as appNavigationController } from "./appNavigationController-Ct0fx8yF.js";
import { n as indexOfAndSplice } from "./superMessagePort-DhrhiTig.js";
import { a as safeAssign } from "./idb-BZfkipS3.js";
import { n as bindManagersToSession } from "./bindManagersToAccount-BL82O9H9.js";
import { t as getMiddleware } from "./middleware-D6HuIqPm.js";
import { t as TransitionSlider } from "./transition-BRcIGNUC.js";
import { n as SliderSuperTabEventable, t as SliderSuperTab } from "./sliderTab-Wd675qRf.js";
//#region src/components/slider.ts
var TRANSITION_TIME = 250;
var TAB_DESTROY_DELAY = 280;
var tabsBeingDestroyed = /* @__PURE__ */ new Set();
function trackTabsDestruction(promise) {
	const settled = () => tabsBeingDestroyed.delete(promise);
	tabsBeingDestroyed.add(promise);
	promise.then(settled, settled);
}
/**
* Settles once no tab of any slider is on its way out any more - including tabs whose destruction starts
* while it waits.
*/
async function whenTabsDestroyed() {
	while (tabsBeingDestroyed.size) await Promise.all(tabsBeingDestroyed);
}
var SidebarSlider = class {
	constructor(options) {
		this.historyTabIds = [];
		this.canHideFirst = false;
		this.onCloseBtnClick = () => {
			if (appNavigationController.findItemByType(this.navigationType)) {
				appNavigationController.back(this.navigationType);
				this.onTabsCountChange?.();
			} else if (this.historyTabIds.length) this.closeTab(this.historyTabIds[this.historyTabIds.length - 1]);
		};
		this.closeTab = (id, animate, isNavigation) => {
			if (id !== void 0 && this.historyTabIds[this.historyTabIds.length - 1] !== id) {
				this.removeTabFromHistory(id);
				return false;
			}
			const closingId = this.historyTabIds.pop();
			this.onCloseTab(closingId, animate, isNavigation);
			const tab = this.historyTabIds[this.historyTabIds.length - 1];
			this._selectTab(tab !== void 0 ? tab instanceof SliderSuperTab ? tab.container : tab : this.canHideFirst ? -1 : 0, animate);
			return true;
		};
		safeAssign(this, options);
		this.tabs ?? (this.tabs = /* @__PURE__ */ new Map());
		this.tabsContainer = this.sidebarEl.querySelector(".sidebar-slider");
		this._selectTab = TransitionSlider({
			content: this.tabsContainer,
			type: "navigation",
			transitionTime: TRANSITION_TIME
		});
		if (!this.canHideFirst) this._selectTab(0);
		this.middlewareHelper = getMiddleware();
	}
	getMiddleware() {
		return this.middlewareHelper.get();
	}
	pushNavigationItem(tab) {
		const navigationItem = {
			type: this.navigationType,
			onPop: (canAnimate) => {
				if (tab.isConfirmationNeededOnClose) {
					const result = tab.isConfirmationNeededOnClose();
					if (result) {
						Promise.resolve(result).then(() => {
							appNavigationController.removeItem(navigationItem);
							this.onTabsCountChange?.();
							this.closeTab(void 0, void 0, true);
						}, () => {});
						return false;
					}
				}
				this.closeTab(void 0, canAnimate, true);
				this.onTabsCountChange?.();
				return true;
			}
		};
		appNavigationController.pushItem(navigationItem);
		this.onTabsCountChange?.();
	}
	async selectTab(id) {
		if (this.historyTabIds[this.historyTabIds.length - 1] === id) return false;
		const tab = id instanceof SliderSuperTab ? id : this.tabs.get(id);
		this.onOpenTab && await this.onOpenTab();
		if (tab) {
			tab.onOpen?.();
			setTimeout(() => {
				tab.onOpenAfterTimeout?.();
				tab.shown.resolve();
			}, TRANSITION_TIME);
		}
		this.pushNavigationItem(tab);
		this.historyTabIds.push(id);
		this._selectTab(id instanceof SliderSuperTab ? id.container : id);
		return true;
	}
	removeTabFromHistory(id) {
		indexOfAndSplice(this.historyTabIds, id);
		this.onCloseTab(id, void 0);
	}
	closeAllTabs() {
		const hasTabs = this.hasTabsInNavigation();
		for (let i = this.historyTabIds.length - 1; i >= 0; --i) {
			const tabId = this.historyTabIds[i];
			(tabId instanceof SliderSuperTab ? tabId : this.tabs.get(tabId)).close();
		}
		return hasTabs;
	}
	async closeTabsNaturallyUntil(target) {
		while (this.historyTabIds.length && this.historyTabIds[this.historyTabIds.length - 1] !== target) {
			const tabId = this.historyTabIds[this.historyTabIds.length - 1];
			const confirmation = (tabId instanceof SliderSuperTab ? tabId : this.tabs.get(tabId))?.isConfirmationNeededOnClose?.();
			if (confirmation) {
				if (!await Promise.resolve(confirmation).then(() => true, () => false)) return false;
				if (this.historyTabIds[this.historyTabIds.length - 1] !== tabId) continue;
			}
			this.closeTab(tabId, void 0, false);
		}
		return !target || this.historyTabIds.includes(target);
	}
	closeAllTabsNaturally() {
		return this.closeTabsNaturallyUntil();
	}
	closeTabsUntilTab(target) {
		if (!this.historyTabIds.includes(target)) return Promise.resolve(false);
		return this.closeTabsNaturallyUntil(target);
	}
	sliceTabsUntilTab(tabConstructor, preserveTab) {
		for (let i = this.historyTabIds.length - 1; i >= 0; --i) {
			const tab = this.historyTabIds[i];
			if (tab === preserveTab) continue;
			else if (tab instanceof tabConstructor) break;
			this.removeTabFromHistory(tab);
		}
	}
	getTab(tabConstructor) {
		return this.historyTabIds.find((t) => t instanceof tabConstructor);
	}
	getHistory() {
		return this.historyTabIds;
	}
	isTabExists(tabConstructor) {
		return !!this.getTab(tabConstructor);
	}
	onCloseTab(id, animate, isNavigation) {
		if (!isNavigation) {
			appNavigationController.removeByType(this.navigationType, true);
			this.onTabsCountChange?.();
		}
		const tab = id instanceof SliderSuperTab ? id : this.tabs.get(id);
		if (tab) {
			tab.resetShown();
			try {
				tab.onClose?.();
			} catch (err) {
				console.error("tab onClose error", tab);
			}
			if (tab.onCloseAfterTimeout) trackTabsDestruction(new Promise((resolve) => {
				setTimeout(() => {
					let saved;
					if (tab instanceof SliderSuperTabEventable) tab.eventListener.addEventListener("destroyAfter", (promise) => saved = promise, { once: true });
					try {
						tab.onCloseAfterTimeout();
					} finally {
						resolve(saved);
					}
				}, TAB_DESTROY_DELAY);
			}));
		}
	}
	addTab(tab) {
		if (!tab.container.parentElement) {
			this.tabsContainer.append(tab.container);
			if (tab.closeBtn) tab.closeBtn.addEventListener("click", this.onCloseBtnClick);
		}
	}
	deleteTab(tab) {
		this.tabs.delete(tab);
	}
	createTab(ctor, destroyable = true, doNotAppend) {
		if (ctor.noSame && this.historyTabIds[this.historyTabIds.length - 1] instanceof ctor) return this.historyTabIds[this.historyTabIds.length - 1];
		const tab = new ctor(doNotAppend ? void 0 : this, destroyable);
		tab.managers = bindManagersToSession(this.managers);
		return tab;
	}
	reveal() {}
	hasTabsInNavigation() {
		return !!appNavigationController.findItemByType(this.navigationType);
	}
};
//#endregion
export { trackTabsDestruction as n, whenTabsDestroyed as r, SidebarSlider as t };
