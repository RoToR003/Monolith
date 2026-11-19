//# allFunctionsCalledOnLoad
import { t as apiManagerProxy } from "./apiManagerProxy-DmQXvxSF.js";
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { a as i18n } from "./langPack-BmdJGr44.js";
import { r as useHotReloadGuard } from "./hotReloadGuard-BUNVkeQ4.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { n as attachClickEvent } from "./clickEvent-COk4YpLP.js";
import { t as replaceContent } from "./replaceContent-Bi6ru3li.js";
import { U as getPeerId } from "./canPollPeerStories-D3HoBvLX.js";
import { t as Scrollable } from "./scrollable-C2-FwBtK.js";
import { t as ButtonIcon } from "./buttonIcon-CthJWloV.js";
import { t as InputSearch } from "./inputSearch-DWd-Jn5r.js";
import { n as createSearchGroup } from "./searchGroup-DTbovFet.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { t as showDatePickerPopup } from "./datePicker-D1G1w7Ns.js";
//#region src/components/appSearch.ts
var AppSearch = class {
	constructor(container, searchInput, searchGroups, middleware, onSearch, noIcons, fromSavedDialog) {
		this.container = container;
		this.searchInput = searchInput;
		this.searchGroups = searchGroups;
		this.onSearch = onSearch;
		this.noIcons = noIcons;
		this.fromSavedDialog = fromSavedDialog;
		this.minMsgId = 0;
		this.loadedCount = -1;
		this.foundCount = -1;
		this.searchPromise = null;
		this.searchTimeout = 0;
		this.query = "";
		this.listsContainer = null;
		this.threadId = 0;
		this.middlewareHelper = middleware.create();
		this.scrollable = new Scrollable(this.container);
		this.listsContainer = this.scrollable.container;
		for (const i in this.searchGroups) this.listsContainer.append(this.searchGroups[i].container);
		if (this.searchGroups.messages) this.scrollable.setVirtualContainer(this.searchGroups.messages.list);
		this.searchInput.onChange = (value) => {
			this.query = value;
			this.reset(false);
			this.searchMore();
		};
		this.scrollable.onScrolledBottom = () => {
			if (!this.query.trim()) return;
			if (!this.searchTimeout) this.searchTimeout = window.setTimeout(() => {
				this.searchMore();
				this.searchTimeout = 0;
			}, 0);
		};
	}
	reset(all = true) {
		if (all) {
			this.searchInput.value = "";
			this.query = "";
			this.peerId = void 0;
			this.threadId = 0;
		}
		this.middlewareHelper.clean();
		this.minMsgId = 0;
		this.loadedCount = -1;
		this.foundCount = -1;
		for (const i in this.searchGroups) this.searchGroups[i].clear();
		this.searchPromise = null;
	}
	beginSearch(peerId, threadId = 0, query = "") {
		this.peerId = peerId;
		this.threadId = threadId;
		if (this.query !== query) this.searchInput.inputField.value = query;
		this.searchInput.input.focus();
	}
	searchMore() {
		if (this.searchPromise) return this.searchPromise;
		const query = this.query;
		if (!query.trim()) {
			this.onSearch?.(0);
			return;
		}
		if (this.foundCount !== -1 && this.loadedCount >= this.foundCount) return Promise.resolve();
		const offsetId = this.minMsgId || 0;
		const middleware = this.middlewareHelper.get();
		return this.searchPromise = rootScope.managers.appMessagesManager.getHistory({
			peerId: this.peerId,
			query,
			inputFilter: { _: "inputMessagesFilterEmpty" },
			offsetId,
			limit: 20,
			threadId: this.threadId
		}).then((res) => {
			if (!middleware()) return;
			this.searchPromise = null;
			if (this.searchInput.value !== query) return;
			let { count, messages, history } = res;
			if (!messages) messages = history.map((mid) => apiManagerProxy.getMessageByPeer(this.peerId, mid));
			messages = res.messages = messages.filter(Boolean);
			if (messages.length && messages[0].mid === this.minMsgId) messages.shift();
			const searchGroup = this.searchGroups.messages;
			messages.forEach((message) => {
				try {
					const peerId = this.peerId ? message.fromId : message.peerId;
					hotReloadGuard.appDialogsManager.addDialogAndSetLastMessage({
						peerId: this.fromSavedDialog ? rootScope.myId : peerId,
						container: this.scrollable,
						avatarSize: "bigger",
						meAsSaved: false,
						message,
						query,
						noIcons: this.noIcons,
						wrapOptions: { middleware },
						threadId: this.fromSavedDialog ? message.saved_peer_id ? getPeerId(message.saved_peer_id) : rootScope.myId : void 0
					});
				} catch (err) {
					console.error("[appSearch] render search result", err);
				}
			});
			searchGroup.toggle();
			this.minMsgId = messages.length && messages[messages.length - 1].mid;
			if (this.loadedCount === -1) this.loadedCount = 0;
			this.loadedCount += messages.length;
			if (this.foundCount === -1) {
				this.foundCount = count;
				if (searchGroup.nameEl) replaceContent(searchGroup.nameEl, i18n(count ? "Chat.Search.MessagesFound" : "Chat.Search.NoMessagesFound", [count]));
				this.onSearch?.(this.foundCount);
			}
		}).catch((err) => {
			if (!middleware()) return;
			console.error("search error", err);
			this.searchPromise = null;
		});
	}
};
//#endregion
//#region src/components/sidebarRight/tabs/search.tsx
var PrivateSearch = () => {
	const [tab] = useSuperTab();
	const { appSidebarRight } = useHotReloadGuard();
	const { peerId, threadId, onDatePick, query } = tab.payload;
	let _peerId;
	let _threadId = 0;
	let _query = "";
	let _onDatePick;
	tab.container.id = "search-private-container";
	tab.container.classList.add("chatlist-container");
	const inputSearch = new InputSearch({ placeholder: "Search" });
	tab.title.replaceWith(inputSearch.container);
	const btnPickDate = ButtonIcon("calendar sidebar-header-right", { ariaLabel: "JumpToDate" });
	tab.header.append(btnPickDate);
	const c = document.createElement("div");
	c.classList.add("chatlist-container");
	tab.scrollable.container.replaceWith(c);
	const appSearch = new AppSearch(c, inputSearch, { messages: createSearchGroup({
		name: "Chat.Search.PrivateSearch",
		type: "messages",
		middleware: tab.middlewareHelper.get()
	}) }, tab.middlewareHelper.get(), void 0, void 0, !!(peerId === rootScope.myId && threadId));
	if (!_peerId) {
		_query = query;
		_peerId = peerId;
		_threadId = threadId;
		_onDatePick = onDatePick;
		btnPickDate.classList.toggle("hide", !_onDatePick);
		if (_onDatePick) attachClickEvent(btnPickDate, () => {
			showDatePickerPopup({
				initDate: /* @__PURE__ */ new Date(),
				onPick: _onDatePick
			});
		}, { listenerSetter: tab.listenerSetter });
		query && appSearch.searchInput.inputField.setValueSilently(query);
		appSidebarRight.toggleSidebar(true);
	} else appSearch.beginSearch(_peerId, _threadId, query);
	tab._onOpenAfterTimeout = () => {
		appSearch.beginSearch(_peerId, _threadId, _query);
	};
	return null;
};
//#endregion
export { PrivateSearch as default };
