//# allFunctionsCalledOnLoad
import { h as Modes } from "./userAgent-ByGXcznk.js";
import { n as appNavigationController } from "./appNavigationController-Ct0fx8yF.js";
import { t as apiManagerProxy } from "./apiManagerProxy-DmQXvxSF.js";
import { m as REAL_FOLDERS, n as rootScope } from "./rootScope-CZS0lmz8.js";
import { n as indexOfAndSplice } from "./superMessagePort-DhrhiTig.js";
import { a as i18n, u as langPack_default } from "./langPack-BmdJGr44.js";
import { A as mergeProps, C as createSignal, L as untrack, R as useContext, _ as createMemo, g as createEffect, i as For, p as createComponent, s as Show, x as createRoot } from "./solid-9Vxm0VIz.js";
import { n as deferredPromise } from "./cancellablePromise-bof--dnO.js";
import { t as cancelEvent } from "./cancelEvent-Cw8vYZHp.js";
import { a as reconcile, n as createStore } from "./store-PwRn5fa3.js";
import { c as insert, d as render, g as template, u as memo } from "./web-BPyQozky.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { a as makeMediaSize } from "./mediaSizes-C1MTaleW.js";
import { t as observeResize } from "./resizeObserver-DddVtfLC.js";
import { i as createPopup, n as PopupElement, t as PopupContext } from "./indexTsx-v9mB9bAq.js";
import { i as findAndSplice } from "./parseEntities-C5qsCJ5K.js";
import { d as findUpAttribute } from "./inputField-CaCo30N0.js";
import { t as whichChild } from "./whichChild-CwhWxnKO.js";
import { M as avatarNew, dt as wrapPeerTitle, i as Row } from "./confirmationPopup-Bz6mK0o-.js";
import { cn as getDialogIndex } from "./getChatMigratedTo-ChhMNXuu.js";
import { n as wrapEmojiText } from "./wrapEmojiText-DT39R5Tj.js";
import { C as ButtonIconTsx } from "./openEditors-7FmA7q_V.js";
import { i as fastSmoothScroll } from "./scrollable-C2-FwBtK.js";
import { t as AppSelectPeers } from "./appSelectPeers-BYpCZNpe.js";
import { r as wrapSolidComponent } from "./wrapSolidComponent-BASCjNJG.js";
import { t as TransitionSlider } from "./transition-BRcIGNUC.js";
import { i as selectTarget, t as Tabs } from "./tabs-BOYPH0Vn.js";
import { n as createSearchGroup } from "./searchGroup-DTbovFet.js";
import { t as Badge } from "./badge-nljW65F0.js";
import { t as FolderTitleTsx } from "./folderTitleTsx-C_PV-V6z.js";
import { t as showLimitPopup } from "./limit-j5BxQxwd.js";
//#region src/components/topPeersList.ts
/**
* Renders one peer the way the left sidebar's search renders its top-peers row: a bigger avatar
* over a first-name-only title, no subtitle, no status icons. Shared so surfaces that show the
* same "people" tiles from a different source — the empty-column Chats tip card — look identical
* to the search instead of re-implementing the item.
*/
function renderTopPeerItem({ peerId, container, middleware, autonomous = true, noIcons = true }) {
	const dialog = hotReloadGuard.appDialogsManager.addDialogNew({
		peerId,
		container,
		onlyFirstName: true,
		avatarSize: "bigger",
		autonomous,
		noIcons,
		wrapOptions: { middleware },
		withStories: true
	});
	dialog.dom.subtitleEl.remove();
	return dialog;
}
function createTopPeersList({ middleware, onFound, group, modifyPeers, className }) {
	const autonomous = !group;
	group ?? (group = createSearchGroup({
		type: "contacts",
		className: "search-group-people" + (className ? " " + className : ""),
		autonomous,
		onFound,
		noIcons: true,
		middleware,
		scrollableX: true,
		clickable: !!onFound
	}));
	const promise = rootScope.managers.appUsersManager.getTopPeers("correspondents").then((peers) => {
		if (!middleware()) return;
		if (modifyPeers) peers = modifyPeers(peers.slice());
		peers.forEach((peer) => {
			renderTopPeerItem({
				peerId: peer.id,
				container: group.list,
				middleware,
				autonomous,
				noIcons: group.noIcons
			});
		});
		group.toggle();
	});
	return {
		group,
		promise
	};
}
//#endregion
//#region src/stores/folders.ts
async function getNotificationCountForFilter(filterId, managers) {
	const { unreadUnmutedCount, unreadCount, unreadMentionsCount } = await managers.dialogsStorage.getFolderUnreadCount(filterId);
	return {
		count: filterId === 0 ? unreadUnmutedCount : unreadCount,
		muted: !unreadUnmutedCount && !!unreadCount && !unreadMentionsCount
	};
}
var useFoldersStore = createRoot(() => {
	const [selectedFolderId, _setSelectedFolderId] = createSignal(0);
	const [folderItems, setFolderItems] = createStore([]);
	const selectedFolderIndex = createMemo(() => folderItems.findIndex(({ id }) => id === selectedFolderId()));
	let setSelectedFolderId;
	const [onClick, setOnClick] = createSignal();
	createEffect(() => {
		setSelectedFolderId = onClick();
	});
	let lastMark = 0;
	const marks = /* @__PURE__ */ new Map();
	const markFolder = (folderId) => {
		const mark = ++lastMark;
		marks.set(folderId, mark);
		return mark;
	};
	const isLatestMark = (folderId, mark) => marks.get(folderId) === mark;
	let order = [];
	const sortByOrder = (items) => {
		return items.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
	};
	function updateFolderItem(folderId, payload) {
		const idx = folderItems.findIndex((item) => item.id === folderId);
		if (idx === -1) return;
		const folderItem = folderItems[idx];
		setFolderItems(idx, reconcile({
			...folderItem,
			...payload
		}));
	}
	async function updateFolderNotifications(folderId) {
		const mark = marks.get(folderId);
		const notifications = await getNotificationCountForFilter(folderId, rootScope.managers);
		if (isLatestMark(folderId, mark)) updateFolderItem(folderId, { notifications });
	}
	function updateAllFolderNotifications() {
		for (const folderItem of folderItems) {
			if (!folderItem.id) continue;
			updateFolderNotifications(folderItem.id);
		}
	}
	async function makeFolderItemPayload(filter) {
		const [notifications, folder] = await Promise.all([getNotificationCountForFilter(filter.id, rootScope.managers), rootScope.managers.dialogsStorage.getFolder(filter.id)]);
		return {
			id: filter.id,
			notifications,
			chatsCount: folder?.dialogs?.length || 0,
			filter
		};
	}
	async function updateOrAddFolder(filter) {
		const mark = markFolder(filter.id);
		if (!order.includes(filter.id)) order.push(filter.id);
		const payload = await makeFolderItemPayload(filter);
		if (!isLatestMark(filter.id, mark)) return;
		if (folderItems.some((item) => item.id === filter.id)) updateFolderItem(filter.id, payload);
		else setFolderItems(sortByOrder([...folderItems, payload]));
	}
	function deleteFolder(filterId) {
		markFolder(filterId);
		indexOfAndSplice(order, filterId);
		const items = [...folderItems];
		const existingItemIndex = items.findIndex((item) => item.id === filterId);
		if (existingItemIndex === -1) return;
		items.splice(existingItemIndex, 1);
		const length = items.length;
		setFolderItems(items);
		const selectedId = untrack(selectedFolderId);
		if (length >= selectedId || selectedId === filterId) setSelectedFolderId(0);
	}
	function updateItemsOrder(newOrder) {
		order = newOrder.filter((folderId) => folderId !== 1);
		setFolderItems(sortByOrder([...folderItems]));
	}
	let lastHydrationId = 0;
	let listenersInited = false;
	async function hydrateFilters(filters) {
		const hydrationId = ++lastHydrationId;
		const folderFilters = filters.filter((filter) => filter.id !== 1).sort((a, b) => a.localId - b.localId);
		const marked = folderFilters.map((filter) => markFolder(filter.id));
		const hydratedIds = folderFilters.map((filter) => filter.id);
		const leaving = /* @__PURE__ */ new Map();
		for (const folderId of [...order, ...folderItems.map((item) => item.id)]) if (!hydratedIds.includes(folderId) && !leaving.has(folderId)) leaving.set(folderId, markFolder(folderId));
		order = [...hydratedIds, ...leaving.keys()];
		const items = await Promise.all(folderFilters.map(makeFolderItemPayload));
		if (hydrationId !== lastHydrationId) return;
		const gone = /* @__PURE__ */ new Set();
		leaving.forEach((mark, folderId) => {
			if (isLatestMark(folderId, mark)) {
				gone.add(folderId);
				indexOfAndSplice(order, folderId);
			}
		});
		const nextItems = folderItems.filter((item) => !gone.has(item.id));
		items.forEach((item, idx) => {
			if (!isLatestMark(item.id, marked[idx])) return;
			const existingIdx = nextItems.findIndex((nextItem) => nextItem.id === item.id);
			if (existingIdx === -1) nextItems.push(item);
			else nextItems[existingIdx] = item;
		});
		setFolderItems(sortByOrder(nextItems));
		if (!listenersInited) {
			listenersInited = true;
			initListeners();
		}
	}
	function resetForAccountSwitch() {
		++lastHydrationId;
		marks.clear();
		order = [];
		setFolderItems([]);
		_setSelectedFolderId(0);
	}
	function initListeners() {
		rootScope.addEventListener("dialog_flush", ({ dialog }) => {
			if (!dialog) return;
			updateAllFolderNotifications();
		});
		rootScope.addEventListener("folder_unread", (filter) => {
			if (filter.id < 0) return;
			updateFolderNotifications(filter.id);
		});
		const onFilterUpsert = (filter) => {
			if (REAL_FOLDERS.has(filter.id)) return;
			return updateOrAddFolder(filter);
		};
		rootScope.addEventListener("filter_update", onFilterUpsert);
		rootScope.addEventListener("filter_new", onFilterUpsert);
		rootScope.addEventListener("filter_delete", (filter) => {
			deleteFolder(filter.id);
		});
		rootScope.addEventListener("filter_order", (order) => {
			updateItemsOrder(order);
		});
		rootScope.addEventListener("filter_joined", (filter) => {
			setSelectedFolderId(filter.id);
		});
		rootScope.addEventListener("premium_toggle", async (isPremium) => {
			if (isPremium) return;
			const folderId = untrack(selectedFolderId);
			if (!await rootScope.managers.filtersStorage.isFilterIdAvailable(folderId) && untrack(selectedFolderId) === folderId) setSelectedFolderId(0);
		});
	}
	return {
		selectedFolderId,
		setSelectedFolderId: _setSelectedFolderId,
		selectedFolderIndex,
		folderItems,
		hydrateFilters,
		resetForAccountSwitch,
		onClick,
		setOnClick
	};
});
function useFolders() {
	return useFoldersStore;
}
//#endregion
//#region src/components/foldersTabs.tsx
var _tmpl$ = /*#__PURE__*/ template(`<span class=text-super dir=auto>`);
function FoldersTabs(props) {
	const { folderItems } = useFolders();
	const Tab = (item) => {
		const title = () => {
			if (item.id === 0) return i18n("FilterAllChatsShort");
			return createComponent(FolderTitleTsx, {
				get title() {
					return item.filter.title;
				},
				textColor: "secondary-text-color"
			});
		};
		return createComponent(Tabs.MenuTab, {
			ref: (ref) => ref.dataset.filterId = "" + item.filter.id,
			get children() {
				return [(() => {
					var _el$ = _tmpl$();
					insert(_el$, title);
					return _el$;
				})(), createComponent(Badge, {
					tag: "div",
					size: 20,
					get color() {
						return item.notifications.muted ? "gray" : "primary";
					},
					get count() {
						return item.notifications.count;
					}
				})];
			}
		});
	};
	return createComponent(Tabs, { get children() {
		return [memo(() => memo(() => !!props.gradientProps)() && createComponent(Tabs.MenuGradient, mergeProps(() => props.gradientProps))), createComponent(Tabs.MenuScrollable, mergeProps(() => props.scrollableProps || {}, { get children() {
			return createComponent(Tabs.Menu, mergeProps(() => props.menuProps || {}, { get children() {
				return createComponent(For, {
					each: folderItems,
					children: Tab
				});
			} }));
		} }))];
	} });
}
//#endregion
//#region src/components/popups/pickUser.tsx
async function wrapTopicRow({ peerId, threadId, middleware }) {
	const size = makeMediaSize(32, 32);
	const title = threadId ? await wrapPeerTitle({
		peerId,
		threadId
	}) : i18n("AllMessages");
	let media;
	if (threadId) {
		const avatar = avatarNew({
			peerId,
			threadId,
			middleware,
			size: size.width,
			wrapOptions: {
				middleware,
				textColor: "primary-text-color",
				customEmojiSize: size
			}
		});
		await avatar.readyThumbPromise;
		media = avatar.node;
	} else media = wrapEmojiText("💬");
	const row = wrapSolidComponent(() => createComponent(Row, {
		clickable: true,
		"class": "selector-forum-topic",
		classList: { "selector-forum-topic-all": !threadId },
		get children() {
			return [createComponent(Row.Title, { children: title }), createComponent(Row.Media, {
				size: "abitbigger",
				children: media
			})];
		}
	}), middleware);
	row.dataset.peerId = [peerId, threadId].filter(Boolean).join("_");
	return row;
}
function showPickUserPopup(options) {
	let multiSelect;
	if (typeof options.multiSelect === "boolean") multiSelect = options.multiSelect ? "enabled" : "disabled";
	else multiSelect = options.multiSelect;
	multiSelect || (multiSelect = "disabled");
	const _onSelect = options.onSelect;
	const [show, setShow] = createSignal(false);
	const [canGoBack, setCanGoBack] = createSignal(false);
	const [multiSelectMode, setMultiSelectMode] = createSignal(multiSelect);
	let selector;
	let forumSelector;
	let transition;
	let forumNavigationItem;
	let isMonoforum = false;
	const selected = [];
	let context;
	let managers;
	let middleware;
	let night;
	const tabsContainer = document.createElement("div");
	tabsContainer.classList.add("tabs-container");
	let busy = false;
	const finalize = async () => {
		if (busy) return;
		busy = true;
		try {
			const res = _onSelect(selected);
			if (res instanceof Promise) await res;
			busy = false;
		} catch (err) {
			busy = false;
			throw err;
		}
		setShow(false);
	};
	const onSingleSelect = async (sel, key, adding) => {
		key = "" + key;
		const [_peerId, _threadId] = key.split("_");
		const peerId = _peerId.toPeerId();
		const threadId = _threadId ? +_threadId : void 0;
		const item = {
			peerId,
			threadId: isMonoforum ? void 0 : threadId,
			monoforumThreadId: isMonoforum ? threadId : void 0,
			key
		};
		if (adding) selected.push(item);
		else findAndSplice(selected, (item) => item.key === key);
		if (sel.multiSelect === "enabled" && selected.length || !selected.length) return;
		await finalize();
	};
	const trackMultiSelectMode = (sel) => {
		const originalSetMultiSelectMode = sel.setMultiSelectMode.bind(sel);
		sel.setMultiSelectMode = (mode) => {
			originalSetMultiSelectMode(mode);
			setMultiSelectMode(mode);
		};
		setMultiSelectMode(sel.multiSelect);
	};
	const enableMultiSelect = () => {
		(canGoBack() ? forumSelector : selector)?.setMultiSelectMode("enabled");
	};
	const onBackClick = () => {
		if (forumSelector) {
			const selected = forumSelector.getSelected();
			selector.removeBatch(selector.getSelected(), false);
			selector.setMultiSelectMode(forumSelector.multiSelect);
			selector.addInitial(selected);
		}
		transition?.(selector.container);
		if (forumNavigationItem) {
			appNavigationController.removeItem(forumNavigationItem);
			forumNavigationItem = void 0;
		}
		setCanGoBack(false);
	};
	const createForumSelector = async ({ peerId, placeholder, isMonoforum: _isMonoforum }) => {
		const fsMiddlewareHelper = middleware.create();
		const fsMiddleware = fsMiddlewareHelper.get();
		const deferred = deferredPromise();
		let offsetIndex, lastQuery, firstRender = true;
		isMonoforum = _isMonoforum;
		const selected = selector.getSelected();
		const fs = forumSelector = new AppSelectPeers({
			middleware: fsMiddleware,
			appendTo: tabsContainer,
			managers,
			rippleEnabled: false,
			night,
			multiSelect,
			placeholder,
			peerType: ["custom"],
			onChange: (length, changes) => {
				changes.forEach(({ key, add }) => onSingleSelect(fs, key, add));
			},
			getMoreCustom: async (q, middleware) => {
				if (lastQuery !== q) {
					offsetIndex = void 0;
					lastQuery = q;
				}
				const limit = 20;
				let result;
				if (_isMonoforum) result = await managers.monoforumDialogsStorage.getDialogs({
					parentPeerId: peerId,
					limit,
					offsetIndex
				});
				else result = await managers.dialogsStorage.getDialogs({
					query: q,
					filterId: peerId,
					limit,
					skipMigrated: true,
					offsetIndex
				});
				if (!middleware()) return;
				offsetIndex = getDialogIndex(result.dialogs[result.dialogs.length - 1]);
				return {
					result: _isMonoforum ? result.dialogs.map((dialog) => dialog.peerId) : result.dialogs.map((forumTopic) => forumTopic.id),
					isEnd: result.isEnd
				};
			},
			renderResultsFunc: async (threadIds, append) => {
				const middleware = fs.middlewareHelperLoader.get();
				const rowsMiddleware = fs.getRowsMiddleware();
				if (firstRender) {
					firstRender = false;
					if (apiManagerProxy.isBotforum(peerId)) threadIds.unshift(void 0);
				}
				const promises = threadIds.map((threadId) => {
					return wrapTopicRow({
						peerId,
						threadId,
						middleware: rowsMiddleware
					});
				});
				const elements = await Promise.all(promises);
				if (!middleware()) return;
				elements.forEach((element) => {
					const sel = fs.selected.has(element.dataset.peerId);
					element.prepend(fs.checkbox(sel, void 0, element.querySelector(".peer-title, .row-title")));
				});
				fs.list[!append ? "append" : "prepend"](...elements);
			},
			onFirstRender: () => {
				deferred.resolve();
			},
			noSearch: _isMonoforum && !selected.length
		});
		fs.setMultiSelectMode(selector.multiSelect);
		trackMultiSelectMode(fs);
		fs.addInitial(selected);
		fs.container.classList.add("tabs-tab");
		fs.container.middlewareHelper = fsMiddlewareHelper;
		if (_isMonoforum && fs.selectorSearch) fs.selectorSearch.inputSearch.container.classList.add("hide");
		await deferred;
		setCanGoBack(true);
		transition?.(fs.container);
		const navigationItem = forumNavigationItem = {
			type: "popup",
			onPop: () => {
				onBackClick();
			}
		};
		appNavigationController.pushItem(navigationItem);
		middleware.onClean(() => {
			isMonoforum = false;
			appNavigationController.removeItem(navigationItem);
		});
	};
	const createFolderTabs = (afterElement) => {
		let menu;
		let prevId = -1;
		const mount = document.createElement("div");
		mount.classList.add("popup-forward-folder-tabs-container", "collapsable");
		afterElement.after(mount);
		let scrollableContext;
		const sectionContainer = selector.selectorSearch.section.container;
		const unobserve = observeResize(sectionContainer, () => {
			mount.style.top = sectionContainer.offsetHeight + "px";
		});
		const lateMiddleware = untrack(() => context.lateMiddlewareHelper).get();
		lateMiddleware.onClean(unobserve);
		const deferred = deferredPromise();
		const scrollToStart = (callback) => {
			let clicked = false;
			const onFinish = () => {
				if (!clicked) {
					clicked = true;
					callback();
				}
			};
			fastSmoothScroll({
				container: selector.scrollable.container,
				element: selector.section.container,
				position: "start",
				getElementPosition: ({ elementPosition }) => elementPosition - mount.offsetHeight - sectionContainer.offsetHeight,
				startCallback: ({ duration, path }) => {
					if (path >= 0) onFinish();
					else setTimeout(onFinish, Math.max(0, duration / 2));
				}
			}).finally(callback);
		};
		const onTabClick = (target, id) => {
			return selectTarget({
				target,
				id,
				tabs: menu,
				onClick: async () => {
					const filterId = +(target.dataset.filterId || 0);
					if (!(REAL_FOLDERS.has(filterId) || (await rootScope.managers.filtersStorage.isFilterIdAvailable(filterId) ?? true))) {
						showLimitPopup("folders");
						return false;
					}
					if (prevId !== -1) await new Promise((resolve) => scrollToStart(resolve));
					selector.setFolderId(filterId);
					prevId = id;
				},
				prevId,
				scrollableX: scrollableContext
			});
		};
		const dispose = render(() => FoldersTabs({
			scrollableProps: {
				class: "popup-forward-folder-tabs",
				scrollableProps: { contextRef: (ref) => scrollableContext = ref }
			},
			menuProps: {
				ref: (ref) => {
					menu = ref;
					queueMicrotask(async () => {
						const first = ref.firstElementChild;
						if (first) await onTabClick(first, 0);
						deferred.resolve();
					});
				},
				onClick: (e) => {
					cancelEvent(e);
					const target = findUpAttribute(e.target, "data-filter-id");
					if (!target) return;
					const id = whichChild(target);
					onTabClick(target, id);
				}
			},
			gradientProps: {
				color: "background",
				className: "popup-forward-folder-tabs-gradient"
			}
		}), mount);
		lateMiddleware.onClean(dispose);
		selector.onSearchChange = (query) => {
			mount.classList.toggle("is-collapsed", !!query);
		};
		return deferred;
	};
	function Inner() {
		context = useContext(PopupContext);
		managers = untrack(() => context.managers);
		middleware = untrack(() => context.middlewareHelper.get());
		night = untrack(() => context.night);
		selector = new AppSelectPeers({
			...options,
			multiSelect,
			middleware,
			appendTo: tabsContainer,
			onChange: (length, changes) => {
				changes.forEach(({ key, add }) => onSingleSelect(selector, key, add));
				options.onChange?.(length, changes);
			},
			onSelect: async (peerId, adding, e) => {
				let _isMonoforum = false;
				if (options.useTopics && e.isTrusted && (apiManagerProxy.isForum(peerId) || apiManagerProxy.isBotforum(peerId) || (_isMonoforum = await managers.appPeersManager.canManageDirectMessages(peerId) && await managers.appPeersManager.isMonoforum(peerId)))) {
					createForumSelector({
						peerId,
						placeholder: options.placeholder,
						isMonoforum: _isMonoforum
					});
					return false;
				}
			},
			onFirstRender: () => {
				setShow(true);
				selector.checkForTriggers();
			},
			noPlaceholder: true,
			rippleEnabled: false,
			avatarSize: "abitbigger",
			managers,
			night,
			noInstantLoad: true,
			noSearch: options.noSearch
		});
		selector.container.classList.add("tabs-tab");
		trackMultiSelectMode(selector);
		const loadPromises = [];
		if (options.showTopPeers) {
			const { group, promise } = createTopPeersList({
				middleware,
				className: "popup-forward-top-peers collapsable",
				modifyPeers: (peers) => {
					findAndSplice(peers, (peer) => peer.id === rootScope.myId);
					if (!options.exceptSelf) peers.unshift({
						id: rootScope.myId,
						rating: 0
					});
					return peers;
				}
			});
			selector.heightContainer.before(group.container);
			loadPromises.push(createFolderTabs(group.container));
			const prevOnSearchChange = selector.onSearchChange;
			selector.onSearchChange = (query) => {
				group.container.classList.toggle("is-collapsed", !!query);
				prevOnSearchChange?.(query);
			};
			if (multiSelect !== "disabled") promise.then(() => {
				group.list.querySelectorAll(".chatlist-chat").forEach((el) => {
					const peerId = el.dataset.peerId.toPeerId();
					const sel = selector.selected.has(peerId);
					el.prepend(selector.checkbox(sel, "white"));
				});
			});
		}
		if (options.initial) selector.addInitial(options.initial);
		selector.container.classList.add("active");
		if (options.useTopics) {
			transition = TransitionSlider({
				content: tabsContainer,
				type: "tabs",
				transitionTime: 150,
				animateFirst: false,
				onTransitionEnd: (id) => {
					if (!id) Array.from(tabsContainer.children).forEach((el) => {
						if (el !== selector.container) {
							el.middlewareHelper?.destroy();
							el.remove();
						}
					});
					else selector.clearInput();
				}
			});
			transition(selector.container);
		}
		Promise.all(loadPromises).then(() => {
			selector.loadFirst();
		});
		return tabsContainer;
	}
	function FooterInner() {
		if (options.footer) return options.footer({ multiSelect: multiSelectMode });
		return createComponent(PopupElement.FooterButton, mergeProps({
			confirm: true,
			get langKey() {
				return Modes.a11y ? "Next" : void 0;
			},
			callback: () => {
				finalize();
			}
		}, () => options.footerButtonProps || {}));
	}
	createPopup(() => {
		return createComponent(PopupElement, {
			"class": "popup-forward selector-picker",
			get containerClass() {
				return options.autoHeight ? "popup-forward-auto-height" : void 0;
			},
			get containerProps() {
				return options.containerProps;
			},
			closable: true,
			get show() {
				return show();
			},
			onClose: () => {
				options.onClose?.();
			},
			onCloseAfterTimeout: () => {
				selector?.destroy();
				selector = void 0;
				options.onCloseAfterTimeout?.();
			},
			get btnConfirmOnEnter() {
				return options.btnConfirmOnEnter;
			},
			initialFocus: () => selector?.inputSearch?.input,
			get children() {
				return [
					createComponent(PopupElement.Header, { get children() {
						return [
							createComponent(PopupElement.CloseButton, {
								get canGoBack() {
									return canGoBack();
								},
								onBackClick
							}),
							createComponent(PopupElement.Title, { get title() {
								return memo(() => !!options.titleLangArgs)() ? i18n(options.titleLangKey, options.titleLangArgs) : options.titleLangKey;
							} }),
							createComponent(Show, {
								get when() {
									return multiSelectMode() === "hidden";
								},
								get children() {
									return createComponent(ButtonIconTsx, {
										icon: "checkround",
										"class": "popup-forward-multiselect",
										get ["aria-label"]() {
											return langPack_default.format("Message.Context.Select", true);
										},
										onClick: enableMultiSelect
									});
								}
							})
						];
					} }),
					createComponent(PopupElement.Body, { get children() {
						return createComponent(Inner, {});
					} }),
					createComponent(Show, {
						get when() {
							return multiSelect !== "disabled" || options.footer;
						},
						get children() {
							return createComponent(PopupElement.Footer, {
								"class": "popup-forward-footer",
								floating: true,
								get children() {
									return createComponent(FooterInner, {});
								}
							});
						}
					})
				];
			}
		});
	});
	return {
		get selector() {
			return selector;
		},
		get middleware() {
			return middleware;
		},
		hide() {
			setShow(false);
		},
		finalize
	};
}
async function showPickUser2Popup({ peerType, filterPeerTypeBy, chatRightsActions, multiSelect, limit, limitCallback, titleLangKey, placeholder, exceptSelf, excludePeerIds }) {
	return new Promise((resolve, reject) => {
		let resolved = false;
		const popup = showPickUserPopup({
			peerType,
			placeholder: placeholder || "SelectChat",
			onSelect: (chosen) => {
				if (!chosen.length) return;
				resolved = true;
				resolve(multiSelect ? chosen.map((c) => c.peerId) : chosen[0].peerId);
			},
			multiSelect,
			footerButtonProps: multiSelect ? { langKey: "Send" } : void 0,
			filterPeerTypeBy,
			chatRightsActions,
			titleLangKey,
			exceptSelf,
			excludePeerIds,
			onClose: () => {
				if (!resolved) reject();
			}
		});
		if (limit) popup.selector?.setLimit(limit, limitCallback);
	});
}
async function showPickUser3Popup(types = [
	"users",
	"bots",
	"groups",
	"channels"
], chatRightsActions) {
	if (!Array.isArray(types)) types = [];
	const filterPeerTypeBy = AppSelectPeers.convertPeerTypes(types);
	const peerType = ["dialogs"];
	if (types.includes("users")) peerType.push("contacts");
	if (!filterPeerTypeBy.length) throw void 0;
	return showPickUser2Popup({
		peerType,
		filterPeerTypeBy,
		chatRightsActions,
		titleLangKey: "ShareWith"
	});
}
/**
* A picker footer that offers the link until a recipient is ticked. Confirming
* an empty selection is a dead button, and the link itself is what someone who
* opened the picker and picked nobody still wants — so that is what the button
* becomes. Shared by the conference invite picker and every `shareUrlToPeers`
* batch; both feed the returned pair straight into their picker options.
*/
function createCopyLinkFooter(options) {
	const [selectedCount, setSelectedCount] = createSignal(0);
	return {
		onChange: (length) => setSelectedCount(length),
		footer: () => createComponent(PopupElement.FooterButton, {
			confirm: true,
			get langKey() {
				return memo(() => !!selectedCount())() ? options.confirmLangKey : "CopyLink";
			},
			callback: () => {
				if (selectedCount()) {
					options.confirm();
					return;
				}
				options.copy();
				return false;
			}
		})
	};
}
function showSharingPickerPopup(options) {
	options.chatRightsActions ?? (options.chatRightsActions = ["send_plain"]);
	options.placeholder ?? (options.placeholder = "ShareModal.Search.Placeholder");
	options.selfPresence ?? (options.selfPresence = "ChatYourSelf");
	return showPickUserPopup({
		titleLangKey: "ShareWith",
		showTopPeers: true,
		footerButtonProps: { langKey: "Send" },
		...options,
		peerType: ["dialogs", "contacts"]
	});
}
function showSharingPicker2Popup(options) {
	return new Promise((resolve, reject) => {
		let resolved = false;
		showSharingPickerPopup({
			...options || {},
			onSelect: (chosen) => {
				resolved = true;
				resolve(chosen[0]);
			},
			onClose: () => {
				if (!resolved) reject();
			}
		});
	});
}
function showReplyPickerPopup(options = {}) {
	return showSharingPicker2Popup({
		placeholder: "ReplyToDialog",
		selfPresence: "SavedMessagesInfoQuote",
		...options
	});
}
function showContactPickerPopup() {
	return new Promise((resolve, reject) => {
		let resolved = false;
		showPickUserPopup({
			titleLangKey: "Contacts",
			peerType: ["contacts"],
			placeholder: "Search",
			onSelect: (chosen) => {
				resolved = true;
				resolve(chosen[0].peerId);
			},
			onClose: () => {
				if (!resolved) reject();
			}
		});
	});
}
//#endregion
export { showPickUserPopup as a, showSharingPickerPopup as c, createTopPeersList as d, renderTopPeerItem as f, showPickUser3Popup as i, FoldersTabs as l, showContactPickerPopup as n, showReplyPickerPopup as o, showPickUser2Popup as r, showSharingPicker2Popup as s, createCopyLinkFooter as t, useFolders as u };
