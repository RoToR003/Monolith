//# allFunctionsCalledOnLoad
import { i as windowSize } from "./themeController-2cytOOn0.js";
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { n as logger } from "./logger-7zf0rNYS.js";
import { n as deferredPromise } from "./cancellablePromise-bof--dnO.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { t as getMiddleware } from "./middleware-D6HuIqPm.js";
import { t as ListenerSetter } from "./listenerSetter-BER6qAXn.js";
import { t as isDocumentRTL } from "./isDocumentRTL-z8ksM2Dv.js";
import { t as throttle } from "./throttle-DxyCT6GJ.js";
import { s as crossfadeContent } from "./animations-DCmLIda3.js";
import { d as cancelContextMenuOpening } from "./confirmationPopup-Bz6mK0o-.js";
import { _n as isForumTopic, cn as getDialogIndex } from "./getChatMigratedTo-ChhMNXuu.js";
import { n as DialogsPlaceholder } from "./appSelectPeers-BYpCZNpe.js";
import { t as handleHorizontalSwipe } from "./handleHorizontalSwipe-CT4nOIYZ.js";
import { r as attachPinnedDialogsReorder } from "./dialogsPinnedReorder-BJ4mUWQw.js";
//#region src/helpers/sequentialCursorFetcher.ts
var SequentialCursorFetcher = class {
	constructor(fetcher) {
		this.fetcher = fetcher;
		this.fetchedItemsCount = 0;
		this.neededCount = 0;
		this.isFetching = false;
		this.needToFetchMore = false;
	}
	fetchUntil(neededCount, currentCount) {
		this.neededCount = Math.max(this.neededCount, neededCount);
		if (typeof currentCount !== "undefined") this.fetchedItemsCount = currentCount;
		this.triggerFetching();
	}
	tryToFetchMore() {
		this.needToFetchMore = true;
		this.triggerFetching();
	}
	setFetchedItemsCount(count) {
		this.fetchedItemsCount = count;
	}
	setNeededCount(count) {
		this.neededCount = count;
	}
	setCursor(cursor) {
		this.cursor = cursor;
	}
	reset() {
		this.fetchedItemsCount = 0;
		this.neededCount = 0;
		this.isFetching = false;
		this.cursor = void 0;
	}
	triggerFetching() {
		if (this.isFetching) return;
		this.isFetching = true;
		this.fetchUntilNeededCount().catch(() => {}).finally(() => {
			this.isFetching = false;
		});
	}
	async fetchUntilNeededCount() {
		while (this.fetchedItemsCount < this.neededCount || this.needToFetchMore) {
			const { cursor, count, totalCount } = await this.fetcher(this.cursor);
			this.needToFetchMore = false;
			if (count === 0) break;
			this.cursor = cursor;
			if (totalCount !== void 0) this.fetchedItemsCount = totalCount;
			else this.fetchedItemsCount += count;
		}
	}
};
var NOT_IMPLEMENTED_ERROR = /* @__PURE__ */ new Error("not implemented");
/**
* Shows the peer's ongoing activity in place of the last message. Applied both
* from the `peer_typings` event and when a dialog element is (re)built, since a
* row created while the peer is already typing gets no event of its own.
*
* Returns whether the row is left showing an activity that can no longer be
* rendered, i.e. the caller has to put the last message back.
*/
async function setDialogTyping({ dom, peerId, threadId, animate }) {
	const getTypingElement = () => dom.lastMessageSpan.querySelector(":scope > .peer-typing-container");
	const oldTypingElement = getTypingElement();
	const newTypingElement = await hotReloadGuard.appImManager.getPeerTyping(peerId, oldTypingElement, threadId);
	if (newTypingElement) {
		if (!oldTypingElement) {
			crossfadeContent(dom.lastMessageSpan, newTypingElement, getTypingElement() ? "update" : animate ? "crossfade" : "replace", { duration: 120 });
			dom.lastMessageSpan.classList.add("user-typing");
			dom.showsActivity = true;
		}
		return false;
	}
	return !!oldTypingElement;
}
var AutonomousDialogListBase = class {
	constructor({ appDialogsManager }) {
		this.cursorFetcher = new SequentialCursorFetcher((cursor) => this.loadDialogs(cursor));
		this.hasReachedTheEnd = false;
		this.skipMigrated = true;
		this.requestItemForIdx = (idx, itemsLength) => {
			this.cursorFetcher.fetchUntil(idx + 1, itemsLength);
		};
		this.onListShrinked = () => {
			const items = this.sortedList.getSortedItems();
			const last = items[items.length - 1];
			this.cursorFetcher.setFetchedItemsCount(items.length);
			this.cursorFetcher.setNeededCount(items.length);
			this.cursorFetcher.setCursor(last?.index);
			this.loadDialogsDeferred?.reject();
		};
		this.log = logger("CL");
		this.managers = rootScope.managers;
		this.listenerSetter = new ListenerSetter();
		this.middlewareHelper = getMiddleware();
		this.appDialogsManager = appDialogsManager;
	}
	setIndexKey(indexKey) {
		this.indexKey = indexKey;
		this.sortedList.indexKey = indexKey;
	}
	deleteDialogByKey(key) {
		this.sortedList.delete(key);
	}
	deleteDialog(dialog) {
		return this.deleteDialogByKey(this.getDialogKey(dialog));
	}
	/**
	* @returns Returns `true` if a new dialog was just added
	*/
	addOrDeleteDialogIfNeeded(dialog, key) {
		if (!this.canUpdateDialog(dialog)) {
			this.deleteDialog(dialog);
			return false;
		}
		if (!this.sortedList.has(key)) {
			this.sortedList.add(key);
			return true;
		}
		return false;
	}
	updateDialog(dialog) {
		const key = this.getDialogKey(dialog);
		if (this.addOrDeleteDialogIfNeeded(dialog, key)) return;
		const dialogElement = this.getDialogElement(key);
		if (!dialogElement) return;
		this.appDialogsManager.setLastMessageN({
			dialog,
			dialogElement,
			setUnread: true
		});
		this.sortedList.update(key);
	}
	canUpdateDialog(dialog) {
		const sortedItems = this.sortedList.getSortedItems();
		const last = sortedItems[sortedItems.length - 1];
		const bottomIndex = last?.index;
		const dialogIndex = getDialogIndex(dialog, this.indexKey);
		return !last || dialogIndex >= bottomIndex || this.hasReachedTheEnd;
	}
	onChatsScroll() {
		this.requestItemForIdx(0);
	}
	onScrolledBottom() {
		this.cursorFetcher.tryToFetchMore();
	}
	createPlaceholder() {
		const placeholder = this.placeholder = new DialogsPlaceholder(this.placeholderOptions);
		const getRectFrom = this.getRectFromForPlaceholder();
		placeholder.attach({
			container: this.sortedList.list.parentElement,
			getRectFrom,
			onRemove: () => {
				if (this.placeholder === placeholder) {
					this.placeholder = void 0;
					this.scrollable?.onScroll?.();
				}
			},
			blockScrollable: this.scrollable
		});
		return placeholder;
	}
	async loadDialogs(offsetIndex) {
		this.loadDialogsDeferred?.reject();
		const deferred = this.loadDialogsDeferred = deferredPromise();
		this.loadDialogsInner({
			offsetIndex,
			canFinish: () => !deferred.isRejected
		}).then(deferred.resolve.bind(deferred), deferred.reject.bind(deferred)).finally(() => {
			this.placeholder?.detach(this.sortedList?.itemsLength() || 0);
		});
		return this.loadDialogsDeferred;
	}
	getDialogKey(dialog) {
		throw NOT_IMPLEMENTED_ERROR;
	}
	getDialogKeyFromElement(element) {
		throw NOT_IMPLEMENTED_ERROR;
	}
	getRectFromForPlaceholder() {
		throw NOT_IMPLEMENTED_ERROR;
	}
	getDialogFromElement(element) {
		throw NOT_IMPLEMENTED_ERROR;
	}
	getFilterId() {
		throw NOT_IMPLEMENTED_ERROR;
	}
	checkForDialogsPlaceholder() {
		if (this.placeholder || this.loadedDialogsAtLeastOnce) return;
		this.placeholder = this.createPlaceholder();
	}
	guessLoadCount() {
		return Math.max(windowSize.height / 64 * 1.25 | 0, 20);
	}
	async preloadDialogs() {
		const filterId = this.getFilterId();
		await this.managers.acknowledged.dialogsStorage.getDialogs({
			offsetIndex: 0,
			limit: this.guessLoadCount(),
			filterId,
			skipMigrated: this.skipMigrated
		});
		this.checkForDialogsPlaceholder();
	}
	async dialogsFetcher(offsetIndex, limit) {
		return await (await this.managers.acknowledged.dialogsStorage.getDialogs({
			offsetIndex,
			limit,
			filterId: this.getFilterId(),
			skipMigrated: this.skipMigrated
		})).result;
	}
	async loadDialogsInner({ offsetIndex, removePlaceholder = true, canFinish }) {
		this.checkForDialogsPlaceholder();
		/**
		* The first time getDialogs might return `count: null`, which is not good for this
		* infinite loading implementation, that's why we're refetching after 0.5 seconds to
		* make sure we get the latest total count of dialogs to properly render the whole list
		*/
		let shouldRefetch = false;
		if (this.appDialogsManager.isFirstDialogsLoad && !offsetIndex) {
			this.appDialogsManager.isFirstDialogsLoad = false;
			shouldRefetch = true;
		}
		const result = await this.dialogsFetcher(offsetIndex, this.guessLoadCount());
		if (shouldRefetch) {
			const id = this.refetchTimeout = self.setTimeout(async () => {
				try {
					const { totalCount } = await this.loadDialogsInner({ canFinish: () => id === this.refetchTimeout });
					this.cursorFetcher.setFetchedItemsCount(totalCount);
				} catch {}
			}, 500);
		}
		const newOffsetIndex = result.dialogs.reduce((prev, curr) => {
			const index = getDialogIndex(curr, this.indexKey);
			return index < prev ? index : prev;
		}, offsetIndex || Infinity);
		const items = await Promise.all(result.dialogs.map(async (dialog) => {
			const key = this.getDialogKey(dialog);
			return this.sortedList.createItemForKey(key);
		}));
		if (!canFinish()) throw new Error();
		this.loadedDialogsAtLeastOnce = true;
		this.hasReachedTheEnd = !!result.isEnd;
		this.sortedList.addDeferredItems(items, result.count || 0);
		if (removePlaceholder) this.placeholder?.detach(this.sortedList.itemsLength());
		return {
			cursor: newOffsetIndex === Infinity ? void 0 : newOffsetIndex,
			count: result.dialogs.length,
			totalCount: this.sortedList.itemsLength()
		};
	}
	async setTyping(dialog) {
		const key = this.getDialogKey(dialog);
		const dom = this.getDialogDom(key);
		if (!dom) return;
		if (await setDialogTyping({
			dom,
			peerId: dialog.peerId,
			threadId: isForumTopic(dialog) ? dialog.id : void 0,
			animate: true
		})) this.unsetTyping(dialog);
	}
	unsetTyping(dialog) {
		const key = this.getDialogKey(dialog);
		const dialogElement = this.getDialogElement(key);
		if (!dialogElement) return;
		dialogElement.dom.showsActivity = false;
		this.appDialogsManager.setLastMessageN({
			dialog,
			lastMessage: null,
			dialogElement,
			setUnread: null
		});
	}
	getDialogDom(key) {
		return this.getDialogElement(key)?.dom;
	}
	getDialogElement(key) {
		return this.sortedList.getDialogElement(key);
	}
	getListElement(key) {
		return this.getDialogElement(key)?.dom.listEl;
	}
	bindScrollable() {
		this.scrollable.onScrolledBottom = throttle(() => {
			this.onScrolledBottom();
		}, 200, false);
	}
	clear() {
		this.sortedList.clear();
		this.placeholder?.remove();
		this.loadDialogsDeferred?.reject();
		this.loadDialogsDeferred = void 0;
		this.cursorFetcher.reset();
		this.hasReachedTheEnd = false;
		self.clearTimeout(this.refetchTimeout);
		this.refetchTimeout = void 0;
	}
	reset() {
		this.loadDialogsRenderPromise = void 0;
		this.loadDialogsPromise = void 0;
	}
	/**
	* Builds the list again, and returns the loading of its first page - asked for at once, so the
	* one going on when this returns
	*/
	fullReset() {
		this.reset();
		this.clear();
		this.onChatsScroll();
		return this.loadDialogsDeferred;
	}
	/**
	* Lets the pinned block of this list be reordered by dragging one of its rows, like every other
	* client - the list answers for what the reorder needs to know (`attachPinnedDialogsReorder`).
	* `canReorder` is for a list that can be reordered only while a mode is on.
	*/
	attachPinnedReorder(canReorder) {
		return attachPinnedDialogsReorder({
			list: this.sortedList.list,
			scrollable: this.scrollable,
			middleware: this.middlewareHelper.get(),
			sortedList: this.sortedList,
			managers: this.managers,
			getFilterId: () => this.getFilterId(),
			getDialogKey: (element) => this.getDialogKeyFromElement(element),
			canReorder
		});
	}
	destroy() {
		this.clear();
		this.scrollable.destroy();
		this.listenerSetter.removeAll();
		this.middlewareHelper.destroy();
		this.sortedList?.destroy();
	}
};
//#endregion
//#region src/helpers/dom/handleTabSwipe.ts
function handleTabSwipe(options) {
	return handleHorizontalSwipe({
		...options,
		onSwipe: (xDiff, yDiff, e) => {
			xDiff *= isDocumentRTL() ? 1 : -1;
			yDiff *= -1;
			if (Math.abs(xDiff) > 50) {
				options.onSwipe(xDiff, yDiff, e);
				cancelContextMenuOpening();
				return true;
			}
		}
	});
}
//#endregion
export { AutonomousDialogListBase as n, setDialogTyping as r, handleTabSwipe as t };
