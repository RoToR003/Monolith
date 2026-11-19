//# allFunctionsCalledOnLoad
import { c as IS_MOBILE_SAFARI, h as Modes } from "./userAgent-ByGXcznk.js";
import { n as appNavigationController } from "./appNavigationController-Ct0fx8yF.js";
import { t as IS_TOUCH_SUPPORTED } from "./touchSupport-B2RWO3zD.js";
import { t as findUpClassName } from "./findUpClassName-3V5me58N.js";
import { t as Icon } from "./icon-DbP6Es97.js";
import { t as apiManagerProxy } from "./apiManagerProxy-DmQXvxSF.js";
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { a as i18n, u as langPack_default } from "./langPack-BmdJGr44.js";
import { C as createSignal, L as untrack, M as onCleanup, _ as createMemo, g as createEffect, i as For, j as on, o as Match, p as createComponent, s as Show, u as Switch, v as createReaction, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { r as getOverlayRoot } from "./appWindow-bo-KtJhy.js";
import { n as bindManagersToSession } from "./bindManagersToAccount-BL82O9H9.js";
import { r as appState } from "./contentSettings-DMhHR-0w.js";
import { _ as use, c as insert, g as template, n as Portal, u as memo } from "./web-BPyQozky.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { t as findUpAsChild } from "./findUpAsChild-CPjgnY00.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
import { t as IconTsx } from "./iconTsx-B4lOk4A6.js";
import { t as ListenerSetter } from "./listenerSetter-BER6qAXn.js";
import { t as getFirstChild } from "./dist-Fd6wPWkH.js";
import { t as I18nTsx } from "./i18n-CGMFiAW0.js";
import { t as Button } from "./buttonTsx-Bwphkm9r.js";
import { t as PreloaderTsx } from "./putPreloader-Bxq7N1RV.js";
import { n as isElementRTL } from "./isDocumentRTL-z8ksM2Dv.js";
import { n as attachClickEvent } from "./clickEvent-COk4YpLP.js";
import { i as createPopup, n as PopupElement } from "./indexTsx-v9mB9bAq.js";
import { o as createMiddleware } from "./sticker-5twBOy1Y.js";
import { t as lottieLoader } from "./lottieLoader-B3FXw0K7.js";
import { t as InputField } from "./inputField-CaCo30N0.js";
import { a as AnimationList } from "./animations-DCmLIda3.js";
import { C as ButtonMenuSync, Cn as CheckboxField, Tn as getInlineArrowKeys, bn as getMediaThumbIfNeeded, l as verifyMenuItem, p as positionMenu, t as confirmationPopup, u as attachContextMenuListener, wn as contextMenuController } from "./confirmationPopup-Bz6mK0o-.js";
import { _ as canCopyStoryLink } from "./getChatMigratedTo-ChhMNXuu.js";
import { n as wrapEmojiText } from "./wrapEmojiText-DT39R5Tj.js";
import { a as LottieAnimation } from "./mediaHeader-CnpQNwOl.js";
import { i as fastSmoothScroll, t as Scrollable } from "./scrollable-C2-FwBtK.js";
import { r as toastNew } from "./toast-B6VD5M7R.js";
import { t as Tabs } from "./tabs-BOYPH0Vn.js";
import { n as copyPendingTextToClipboard, r as copyTextToClipboard } from "./clipboard-DzscV-ca.js";
import { n as Sortable, r as getSortableRun, t as PRESSABLE_DRAG_THRESHOLD } from "./sortable-DnDolsys.js";
import { n as createDateBubble, t as cancelClickOrNextIfNotClick } from "./cancelClickOrNextIfNotClick-CdSUKxfB.js";
import { t as createSubmenuTrigger } from "./createSubmenuTrigger-D4mDfhvb.js";
import { n as ChipTabs, t as ChipTab } from "./chipTabs-C2nG11aJ.js";
import { a as useStories, i as createStoriesStore, n as StoriesContext } from "./store-DlmW-tY7.js";
import { t as showStoriesStealthModePopup } from "./storiesStealthMode-Ca6sS80N.js";
import { t as AppSelection } from "./selection-Dbz2UaL0.js";
import { t as wrapStoryGridItem } from "./gridItem-9u6NBAI5.js";
//#region src/components/reorderMode.tsx
var _tmpl$$1 = /*#__PURE__*/ template(`<div class="search-super-selection-container search-super-reorder-bar"><div class="search-super-selection-count search-super-reorder-title">`);
var _tmpl$2$1 = /*#__PURE__*/ template(`<div>`);
/**
* The mode a profile's owner rearranges the items of one of its lists in (the albums and the stories
* of a profile, the gift collections): what carries this class can be dragged to a new place.
*/
var REORDERABLE_CLASS_NAME = "is-reorderable";
/** Escape and the back gesture leave the mode, as they leave a selection */
function createReorderMode(options) {
	const [active, setActive] = createSignal(false);
	let navigationItem;
	const stop = () => {
		if (navigationItem) {
			appNavigationController.removeItem(navigationItem);
			navigationItem = void 0;
		}
		setActive(false);
	};
	onCleanup(stop);
	return {
		active,
		start: () => {
			if (active()) return;
			options?.onStart?.();
			setActive(true);
			if (!IS_MOBILE_SAFARI) appNavigationController.pushItem(navigationItem = {
				type: "multiselect",
				onPop: () => {
					navigationItem = void 0;
					setActive(false);
				}
			});
		},
		stop
	};
}
/** The ids of a run of items, `dataset[key]`, with the one at `from` put at `to` */
function moveInRun(items, from, to, key) {
	const ids = items.map((item) => +item.dataset[key]);
	ids.splice(to, 0, ...ids.splice(from, 1));
	return ids;
}
/**
* Lets the elements of a list be put in a new order by dragging them while the reorder is on, and
* with the layer, by Alt and an arrow along the line - one place at a time, focus kept on the moved
* element. Only the ones carrying `REORDERABLE_CLASS_NAME` take part, and only in their run.
*/
function attachReorder({ list, axis, scrollable, active, key, onMove }) {
	const sortable = new Sortable({
		list,
		axis,
		scrollable,
		middleware: createMiddleware().get(),
		threshold: PRESSABLE_DRAG_THRESHOLD,
		moveInDom: false,
		sortableClassName: REORDERABLE_CLASS_NAME,
		enabled: active,
		onSort: (prevIdx, newIdx, { items, from, to }) => onMove(moveInRun(items, from, to, key))
	});
	createEffect(on(active, (active) => {
		if (!active) {
			sortable.cancel();
			returnFocus();
		}
	}, { defer: true }));
	const returnFocus = () => {
		if (!Modes.a11y) return;
		const focused = list.ownerDocument.activeElement;
		if (focused && focused !== list.ownerDocument.body && !focused.closest(`.${REORDER_BAR_CLASS_NAME}`)) return;
		list.querySelector("[aria-selected=\"true\"]")?.focus();
	};
	const onKeyDown = (e) => {
		if (!Modes.a11y || !active() || !e.altKey || e.defaultPrevented) return;
		const { next, previous } = getInlineArrowKeys(isElementRTL(list));
		const step = e.key === next ? 1 : e.key === previous ? -1 : 0;
		const item = findUpAsChild(e.target, list);
		if (!step || !item?.classList.contains("is-reorderable")) return;
		e.preventDefault();
		const items = getSortableRun(item, REORDERABLE_CLASS_NAME);
		const from = items.indexOf(item);
		const to = from + step;
		if (to < 0 || to >= items.length) return;
		onMove(moveInRun(items, from, to, key));
		item.focus();
	};
	list.addEventListener("keydown", onKeyDown);
	onCleanup(() => list.removeEventListener("keydown", onKeyDown));
}
var REORDER_BAR_CLASS_NAME = "search-super-reorder-bar";
/** What the bar says while the mode is on: its name, and the button that leaves it */
function ReorderBarContent(props) {
	return (() => {
		var _el$ = _tmpl$$1(), _el$2 = _el$.firstChild;
		insert(_el$2, createComponent(I18nTsx, { get key() {
			return props.titleKey;
		} }));
		insert(_el$, createComponent(Button, {
			icon: "check",
			"class": "btn-icon primary",
			get ["aria-label"]() {
				return langPack_default.format("Done", true);
			},
			onClick: () => props.onDone()
		}), null);
		return _el$;
	})();
}
/** The plates that show their bar in a profile's tab row, which every list's plate shares, by how each gives way */
var shownPlates = /* @__PURE__ */ new WeakMap();
/**
* The row shows a bar while any plate in it does, and only while it goes `forwards`, as a selection's transitions
* leave it. One bar at a time: a plate that comes makes those shown give way, their selection or reorder ending.
*/
function setPlateShown(mount, giveWay, shown) {
	let plates = shownPlates.get(mount);
	if (!plates) shownPlates.set(mount, plates = /* @__PURE__ */ new Set());
	if (shown) {
		[...plates].forEach((other) => untrack(other));
		plates.add(giveWay);
	} else plates.delete(giveWay);
	const selecting = plates.size > 0;
	mount.classList.toggle("is-selecting", selecting);
	mount.classList.toggle("forwards", selecting);
	mount.classList.toggle("backwards", !selecting);
}
/**
* The bar of a selection or of a reorder, over the profile's own tab row (`mount`) while `shown`;
* with nowhere to mount into, it brings the plate the search tabs would have sat on.
*/
function SelectionPlate(props) {
	if (props.mount) {
		const mount = props.mount;
		const giveWay = () => props.giveWay?.();
		let wasShown = false;
		createEffect(() => {
			const shown = props.shown();
			if (shown !== wasShown) setPlateShown(mount, giveWay, wasShown = shown);
		});
		onCleanup(() => {
			if (wasShown) setPlateShown(mount, giveWay, wasShown = false);
		});
		return createComponent(Portal, {
			mount,
			get children() {
				var _el$3 = _tmpl$2$1();
				insert(_el$3, () => props.children);
				createRenderEffect(() => _el$3.classList.toggle("search-super-selection-idle", !props.shown()));
				return _el$3;
			}
		});
	}
	return createComponent(Tabs.MenuShell, {
		"class": "search-super-tabs-scrollable sticky is-single search-super-selection-plate",
		get classList() {
			return {
				"is-selecting": props.shown(),
				"forwards": props.shown(),
				"backwards": !props.shown()
			};
		},
		get children() {
			return props.children;
		}
	});
}
//#endregion
//#region src/components/stories/selection.ts
function toastStoryPinnedToProfile(managers, peerId, pin) {
	if (peerId.isUser()) return toastNew({ langPackKey: pin ? "StoryPinnedToProfile" : "StoryArchivedFromProfile" });
	else managers.appChatsManager.isBroadcast(peerId.toChatId()).then((isBroadcast) => {
		let key;
		if (isBroadcast) key = pin ? "StoryPinnedToChannel" : "StoryArchivedFromChannel";
		else key = pin ? "StoryPinnedToGroup" : "StoryArchivedFromGroup";
		toastNew({ langPackKey: key });
	});
}
var StoriesSelection = class extends AppSelection {
	constructor(options) {
		super({
			managers: options.managers,
			verifyTarget: (e, target) => !!target && this.isSelecting,
			getElementFromTarget: (target) => {
				let el = target;
				while (el && !el.classList.contains("search-super-item")) el = el.parentElement;
				return el;
			},
			targetLookupClassName: "search-super-item",
			lookupBetweenParentClassName: "tabs-tab",
			lookupBetweenElementsQuery: ".search-super-item"
		});
		this.toggleByElement = (element) => {
			const mid = +element.dataset.mid;
			const peerId = element.dataset.peerId.toPeerId();
			if (!this.toggleMid(peerId, mid)) return;
			this.updateElementSelection(element, this.isMidSelected(peerId, mid));
		};
		this.onDeleteStoriesClick = async (ids, peerId) => {
			const managers = bindManagersToSession(this.managers);
			peerId ?? (peerId = this.getSelectedStoriesPeerId());
			ids || (ids = [...this.selectedMids.get(peerId)]);
			await confirmationPopup({
				titleLangKey: ids.length === 1 ? "DeleteStoryTitle" : "DeleteStoriesTitle",
				descriptionLangKey: ids.length === 1 ? "DeleteStorySubtitle" : "DeleteStoriesSubtitle",
				descriptionLangArgs: [ids.length],
				button: {
					langKey: "Delete",
					isDanger: true
				}
			});
			this.cancelSelection();
			managers.appStoriesManager.deleteStories(peerId, ids);
		};
		this.onPinStoriesClick = (ids, pin, peerId) => {
			const managers = bindManagersToSession(this.managers);
			peerId ?? (peerId = this.getSelectedStoriesPeerId());
			ids || (ids = [...this.selectedMids.get(peerId)]);
			const promise = managers.appStoriesManager.togglePinned(peerId, ids, pin);
			this.cancelSelection();
			promise.then(async () => {
				if (ids.length === 1) toastStoryPinnedToProfile(managers, peerId, pin);
				else {
					let key;
					if (peerId.isUser()) key = pin ? "StorySavedTitle" : "StoryArchived";
					else if (await managers.appChatsManager.isBroadcast(peerId.toChatId())) key = pin ? "StorySavedChannelTitle" : "StoryChannelArchived";
					else key = pin ? "StorySavedGroupTitle" : "StoryGroupArchived";
					toastNew({
						langPackKey: key,
						langPackArguments: [ids.length]
					});
				}
			});
		};
		this.onPinStoriesToTopClick = (ids, pin = true, peerId) => {
			peerId ?? (peerId = this.getSelectedStoriesPeerId());
			ids || (ids = [...this.selectedMids.get(peerId)]);
			const promise = this.managers.appStoriesManager.togglePinnedToTop(peerId, ids, pin);
			this.cancelSelection();
			promise.catch((err) => {
				if (err.type === "STORY_ID_TOO_MANY") toastNew({
					langPackKey: "StoriesPinLimit",
					langPackArguments: [+err.message]
				});
			});
		};
		this.onToggleSelection = (forwards, animate) => {
			this._setSelecting(forwards);
			this.mainContainer.classList.toggle("is-selecting", forwards);
			if (!forwards) this.selectedText = void 0;
		};
		this.isStoriesArchive = options.isArchive;
		this.forPicker = options.forPicker;
		this.mainContainer = options.container;
		const [selecting, setSelecting] = createSignal(false);
		const [count, setCount] = createSignal(0);
		const [cantPin, setCantPin] = createSignal(true);
		const [cantDelete, setCantDelete] = createSignal(true);
		this.selecting = selecting;
		this._setSelecting = setSelecting;
		this.count = count;
		this._setCount = setCount;
		this.cantPin = cantPin;
		this._setCantPin = setCantPin;
		this.cantDelete = cantDelete;
		this._setCantDelete = setCantDelete;
		!IS_TOUCH_SUPPORTED && this.attachListeners(options.container, options.listenerSetter);
	}
	getSelectedStoriesPeerId() {
		return [...this.selectedMids.keys()][0];
	}
	async updateContainer(forceSelection = false) {
		if (!this.selectedMids.size && !forceSelection) return;
		const peerId = this.selectedMids.keys().next().value;
		const r = await this.managers.appStoriesManager.cantPinDeleteStories(peerId, Array.from(this.selectedMids.get(peerId) ?? []));
		this._setCount(this.length());
		this._setCantPin(r.cantPin);
		this._setCantDelete(r.cantDelete);
	}
	toggleSelection(toggleCheckboxes = true, forceSelection = false) {
		const ret = super.toggleSelection(toggleCheckboxes, forceSelection || this.forPicker);
		if (ret && toggleCheckboxes) Array.from(this.mainContainer.querySelectorAll(".search-super-item")).forEach((element) => {
			this.toggleElementCheckbox(element, this.isSelecting);
		});
		return ret;
	}
	getSelectedStoryIds(peerId) {
		const mids = this.selectedMids.get(peerId);
		if (mids?.size) return [...mids];
		return [];
	}
};
var chooseStoryPopup_module_default = { popup: "_popup_5zn4p_1" };
//#endregion
//#region src/components/popups/chooseStoryPopup.tsx
function showChooseStoryPopup(options) {
	const { peerId, albumId } = options;
	let finished = false;
	const finish = (result) => {
		finished = true;
		options.onFinish(result);
	};
	createPopup(() => {
		const listenerSetter = new ListenerSetter();
		onCleanup(() => listenerSetter.removeAll());
		const scrollable = new Scrollable();
		scrollable.container.classList.add("search-super");
		onCleanup(() => scrollable.destroy());
		const { render, state, selection, actions } = StoriesProfileList({
			peerId,
			archive: true,
			scrollable,
			listenerSetter,
			withSelection: true,
			forPicker: true
		});
		const el = getFirstChild(render, (v) => v instanceof Element);
		if (el) scrollable.append(el);
		actions.load();
		selection.toggleSelection(true, true);
		const originalIds = /* @__PURE__ */ new Set();
		createEffect(on(() => state.peer?.stories, (stories) => {
			if (!stories) return;
			for (const story of stories) if (story._ === "storyItem" && story.albums?.includes(albumId) && !originalIds.has(story.id)) {
				originalIds.add(story.id);
				if (!selection.isMidSelected(peerId, story.id)) selection.toggleMid(peerId, story.id);
			}
		}));
		scrollable.onScrolledBottom = () => {
			actions.load();
		};
		const getResult = () => {
			const currentMids = selection.selectedMids.get(peerId);
			const current = currentMids ? new Set(currentMids) : /* @__PURE__ */ new Set();
			const added = [];
			const removed = [];
			for (const id of current) if (!originalIds.has(id)) added.push(id);
			for (const id of originalIds) if (!current.has(id)) removed.push(id);
			return {
				added,
				removed
			};
		};
		const [canConfirm, setCanConfirm] = createSignal(false);
		createEffect(on(selection.count, () => {
			const { added, removed } = getResult();
			setCanConfirm(!!(added.length || removed.length) || !!originalIds.size);
		}));
		return createComponent(PopupElement, {
			get ["class"]() {
				return chooseStoryPopup_module_default.popup;
			},
			closable: true,
			onClose: () => !finished && options.onFinish(null),
			get children() {
				return [
					createComponent(PopupElement.Header, { get children() {
						return [createComponent(PopupElement.CloseButton, {}), createComponent(PopupElement.Title, { title: "Stories.Albums.AddToAlbum" })];
					} }),
					createComponent(PopupElement.Body, { get children() {
						return scrollable.container;
					} }),
					createComponent(PopupElement.Footer, { get children() {
						return createComponent(PopupElement.FooterButton, {
							langKey: "Confirm",
							get disabled() {
								return !canConfirm();
							},
							callback: () => finish(getResult())
						});
					} })
				];
			}
		});
	});
}
//#endregion
//#region src/components/stories/albums.ts
async function openCreateAlbumPopup(peerId, storyIds) {
	const managers = bindManagersToSession(rootScope.managers);
	const inputField = new InputField({
		maxLength: 64,
		placeholder: "Stories.Albums.CreatePlaceholder",
		required: true
	});
	try {
		await confirmationPopup({
			titleLangKey: "Stories.Albums.CreateTitle",
			inputField,
			button: { langKey: "Create" }
		});
	} catch (e) {
		return;
	}
	return (await managers.appStoriesManager.createAlbum(peerId, inputField.value, storyIds)).album_id;
}
function createAddToAlbumSubmenuTrigger(options) {
	const managers = bindManagersToSession(rootScope.managers);
	return createSubmenuTrigger({
		options: {
			icon: "folder",
			text: "Stories.Albums.AddToAlbum",
			verify: options.verify
		},
		createSubmenu: async () => {
			const peerId = options.getPeerId();
			const storyIds = options.getStoryIds();
			const [stories, albums] = await Promise.all([managers.appStoriesManager.getStoriesById(peerId, storyIds), options.getAlbums()]);
			const buttons = (albums || []).map((album) => {
				const checkboxField = new CheckboxField({ checked: stories.every((story) => {
					return story?._ === "storyItem" && !!story.albums?.includes(album.album_id);
				}) });
				const span = document.createElement("span");
				span.classList.add("stories-album-title");
				span.append(wrapEmojiText(album.title));
				return {
					textElement: span,
					onClick: () => {
						const wasChecked = checkboxField.checked;
						checkboxField.checked = !wasChecked;
						managers.appStoriesManager.updateAlbum(peerId, album.album_id, { [wasChecked ? "deleteStories" : "addStories"]: storyIds }).catch(() => {
							checkboxField.checked = wasChecked;
							toastNew({ langPackKey: "Error.AnError" });
						});
					},
					checkboxField,
					noCheckboxClickListener: true,
					keepOpen: true
				};
			});
			if (options.onCreateAlbum) buttons.unshift({
				icon: "folder_add",
				text: "Stories.Albums.CreateTitle",
				onClick: options.onCreateAlbum
			});
			return ButtonMenuSync({
				buttons,
				listenerSetter: options.listenerSetter
			});
		}
	});
}
//#endregion
//#region src/components/stories/share.ts
/** Whether a story has a link to copy (`canCopyStoryLink`), by what the tab knows of its peer and the app config */
function hasStoryLink(story, peerId) {
	return canCopyStoryLink(story, apiManagerProxy.getPeer(peerId), appState.appConfig);
}
/**
* Copies a story's link (`appStoriesManager.getStoryLink`: the username's at once, or the server's) and says
* so; a link the server would not give, or a write the browser refused, is said to be an error. To be called
* within the click, where the write starts (`copyPendingTextToClipboard`). Resolves to whether it was copied.
*/
async function copyStoryLink(managers, peerId, storyId) {
	let linkError;
	const link = Promise.resolve(managers.appStoriesManager.getStoryLink(peerId, storyId)).catch((err) => {
		throw linkError = err;
	});
	try {
		await copyPendingTextToClipboard(link);
	} catch (err) {
		if (linkError?.type !== "MIDDLEWARE") toastNew({ langPackKey: "Error.AnError" });
		return false;
	}
	toastNew({ langPackKey: "LinkCopied" });
	return true;
}
/**
* A story shared the way messages are forwarded, as iOS and Android share one: to as many chats as
* are picked, after a comment if one is written, with its link to copy while nobody is picked.
*/
function handleShareStory(options) {
	const { story, peerId } = options;
	hotReloadGuard.showForwardPopup(void 0, void 0, void 0, options.onClose, {
		peerId,
		id: story.id,
		canCopyLink: hasStoryLink(story, peerId),
		onSent: options.onSent
	});
}
//#endregion
//#region src/components/stories/profileList.tsx
var _tmpl$ = /*#__PURE__*/ template(`<span class=stories-album-chip-title>`);
var _tmpl$2 = /*#__PURE__*/ template(`<div class=grid-album-placeholder>`);
var _tmpl$3 = /*#__PURE__*/ template(`<div class=grid>`);
var _tmpl$4 = /*#__PURE__*/ template(`<div class=stories-album-content>`);
var _tmpl$5 = /*#__PURE__*/ template(`<div class=stories-album-wrapper>`);
var _tmpl$6 = /*#__PURE__*/ template(`<div class=search-super-selection-container><div class=search-super-selection-count>`);
var _tmpl$7 = /*#__PURE__*/ template(`<div class="search-super-content-container search-super-content-stories">`);
var ALL_ALBUMS_ID = -1;
var ADD_ALBUM_ID = -2;
var ALBUM_CHIP_CLASS_NAME = "stories-album-chip";
function createStoriesReorder({ peerId, state, actions, selection, managers }) {
	const mode = createReorderMode({ onStart: () => {
		if (selection?.isSelecting) selection.cancelSelection();
	} });
	createEffect(() => {
		if (selection?.selecting()) untrack(mode.stop);
	});
	const onError = () => toastNew({ langPackKey: "Error.AnError" });
	return {
		...mode,
		canMoveStories: () => state.albumId !== void 0,
		moveStories: (albumId, ids) => {
			if (state.albumId === albumId) actions.reorder({ stories: ids });
			managers.appStoriesManager.reorderAlbumStories(peerId, albumId, ids)?.catch(onError);
		},
		moveAlbums: (ids) => {
			actions.reorder({ albums: ids });
			managers.appStoriesManager.reorderAlbums(peerId, ids)?.catch(onError);
		}
	};
}
/**
* Whether a touch starts on a story tile that is being rearranged: what follows is a drag across the grid,
* which a swipe between the tabs or albums around it must leave alone
*/
function isStoryReorderTarget(target) {
	return !!target.closest?.(`.search-super-item.${REORDERABLE_CLASS_NAME}`);
}
var StoriesContextMenu = class {
	constructor(attachTo, selection, listenerSetter, state, reorder) {
		this.attachTo = attachTo;
		this.selection = selection;
		this.listenerSetter = listenerSetter;
		this.state = state;
		this.reorder = reorder;
		attachContextMenuListener({
			element: attachTo,
			callback: (e) => {
				if (reorder?.active()) return;
				if (this.init) {
					this.init();
					this.init = null;
				}
				let item;
				try {
					item = findUpClassName(e.target, "search-super-item");
				} catch (e) {}
				if (!item) return;
				if (!("touches" in e)) e.preventDefault();
				if (this.element.classList.contains("active")) return false;
				if (!("touches" in e)) e.cancelBubble = true;
				const r = async () => {
					this.target = item;
					this.peerId = item.dataset.peerId.toPeerId();
					this.mid = +item.dataset.mid;
					this.isSelected = selection?.isMidSelected(this.peerId, this.mid);
					this.storyItem = await rootScope.managers.appStoriesManager.getStoryById(this.peerId, this.mid);
					if (!(await Promise.all(this.buttons.map(async (button) => {
						const good = await verifyMenuItem(button);
						button.element.classList.toggle("hide", !good);
						return good;
					}))).some((v) => v)) return;
					item.classList.add("menu-open");
					positionMenu(e, this.element);
					contextMenuController.openBtnMenu(this.element, () => {
						item.classList.remove("menu-open");
					});
				};
				r();
			},
			listenerSetter
		});
	}
	init() {
		const managers = bindManagersToSession(rootScope.managers);
		const getSelectedIds = () => {
			if (this.selection && this.selection.isSelecting) return this.selection.getSelectedStoryIds(this.peerId);
			return [this.storyItem.id];
		};
		const hasRightsOnSelected = (right) => {
			const ids = getSelectedIds();
			return managers.appStoriesManager.hasRightsMany(this.peerId, ids, right);
		};
		this.buttons = [
			{
				icon: "archive",
				text: "Archive",
				onClick: () => managers.appStoriesManager.togglePinned(this.peerId, [this.storyItem.id], false).then(() => toastStoryPinnedToProfile(managers, this.peerId, false)),
				verify: () => !this.state.albumId && this.storyItem?.pFlags.pinned && managers.appStoriesManager.hasRights(this.peerId, this.storyItem.id, "pin")
			},
			{
				icon: "unarchive",
				text: "Unarchive",
				onClick: () => managers.appStoriesManager.togglePinned(this.peerId, [this.storyItem.id], true).then(() => toastStoryPinnedToProfile(managers, this.peerId, true)),
				verify: () => !this.state.albumId && this.storyItem && !this.storyItem.pFlags.pinned && managers.appStoriesManager.hasRights(this.peerId, this.storyItem.id, "pin")
			},
			{
				icon: "pin",
				text: "ChatList.Context.Pin",
				onClick: () => managers.appStoriesManager.togglePinnedToTop(this.peerId, [this.storyItem.id], true).catch((err) => {
					if (err.type === "STORY_ID_TOO_MANY") toastNew({
						langPackKey: "StoriesPinLimit",
						langPackArguments: [+err.message]
					});
				}),
				verify: () => !this.state.albumId && this.state.pinned && this.storyItem?.pinnedIndex === void 0 && managers.appStoriesManager.hasRights(this.peerId, this.storyItem.id, "pin")
			},
			{
				icon: "unpin",
				text: "ChatList.Context.Unpin",
				onClick: () => managers.appStoriesManager.togglePinnedToTop(this.peerId, [this.storyItem.id], false),
				verify: () => !this.state.albumId && this.state.pinned && this.storyItem?.pinnedIndex !== void 0 && managers.appStoriesManager.hasRights(this.peerId, this.storyItem.id, "pin")
			},
			{
				icon: "menu",
				text: "Stories.Reorder",
				onClick: () => this.reorder.start(),
				verify: () => !!this.reorder && this.state.canEdit && this.reorder.canMoveStories()
			},
			createAddToAlbumSubmenuTrigger({
				getPeerId: () => this.peerId,
				getStoryIds: getSelectedIds,
				getAlbums: () => this.state.peer?.albums,
				verify: () => !this.state.albumId && !!this.state.peer?.albums?.length && hasRightsOnSelected("edit"),
				listenerSetter: this.listenerSetter
			}),
			{
				icon: "crossround",
				text: "Stories.Albums.RemoveFromAlbum",
				onClick: () => {
					const albumId = this.state.albumId;
					const storyIds = getSelectedIds();
					if (this.selection.isSelecting) this.selection.cancelSelection();
					rootScope.managers.appStoriesManager.updateAlbum(this.peerId, albumId, { deleteStories: storyIds }).then(() => {
						toastNew({
							langPackKey: "Stories.Albums.Removed",
							langPackArguments: [storyIds.length]
						});
					}).catch(() => {
						toastNew({ langPackKey: "Error.AnError" });
					});
				},
				verify: () => this.state.albumId !== void 0 && hasRightsOnSelected("edit")
			},
			{
				icon: "link",
				text: "CopyLink",
				onClick: () => copyStoryLink(managers, this.peerId, this.storyItem.id),
				verify: () => hasStoryLink(this.storyItem, this.peerId)
			},
			{
				icon: "forward",
				text: "ShareFile",
				onClick: async () => {
					handleShareStory({
						story: this.storyItem,
						peerId: this.peerId
					});
				},
				verify: async () => {
					const username = await rootScope.managers.appPeersManager.getPeerUsername(this.peerId);
					if (!username) return false;
					const story = this.storyItem;
					return !!story.pFlags.public && (!story.pFlags.noforwards || !!username);
				}
			},
			{
				icon: "eyecross",
				text: "Stories.StealthMode.View",
				onClick: () => {
					const { peerId } = this;
					const id = this.storyItem.id;
					showStoriesStealthModePopup({ onActivate: () => {
						hotReloadGuard.createStoriesViewerWithPeer({
							peerId,
							id
						});
					} });
				},
				verify: () => this.peerId !== rootScope.myId
			},
			{
				icon: "select",
				text: "Message.Context.Select",
				onClick: () => this.selection.toggleByElement(this.target),
				verify: () => !!this.selection && !this.isSelected && this.state.canEdit
			},
			{
				icon: "select",
				text: "Message.Context.Selection.Clear",
				onClick: () => this.selection.cancelSelection(),
				verify: () => !!this.selection && this.isSelected
			},
			{
				icon: "delete",
				className: "danger",
				text: "Delete",
				onClick: () => this.selection.onDeleteStoriesClick([this.storyItem.id], this.peerId),
				verify: () => managers.appStoriesManager.hasRights(this.peerId, this.storyItem.id, "delete")
			}
		];
		this.element = ButtonMenuSync({
			buttons: this.buttons,
			listenerSetter: this.listenerSetter
		});
		this.element.classList.add("search-contextmenu", "contextmenu");
		getOverlayRoot().append(this.element);
		this.buttons.forEach((button) => button.onOpen?.());
	}
};
function StoriesAlbums(props) {
	const [stories] = useStories();
	const reorder = props.reorder;
	const hasAlbums = () => stories.ready && stories.peer.albums && stories.peer.albums.length > 0;
	const chosenAlbumId = () => stories.albumId === void 0 ? ALL_ALBUMS_ID : stories.albumId;
	const handleChange = (value) => {
		const albumId = Number(value);
		if (albumId === ADD_ALBUM_ID) {
			openCreateAlbumPopup(props.peerId).then((albumId) => {
				if (albumId !== void 0) props.onAlbumChange(albumId);
			});
			return false;
		}
		if (props.selection?.isSelecting) props.selection.cancelSelection();
		props.onAlbumChange(albumId === ALL_ALBUMS_ID ? void 0 : albumId);
	};
	return createComponent(Show, {
		get when() {
			return hasAlbums();
		},
		get children() {
			return createComponent(ChipTabs, {
				"class": "search-super-content-stories-albums",
				get value() {
					return chosenAlbumId().toString();
				},
				onChange: handleChange,
				view: "surface",
				center: true,
				needIntersectionObserver: true,
				scrollableRef: reorder && ((list) => attachReorder({
					list,
					axis: "x",
					scrollable: { container: list },
					active: reorder.active,
					key: "value",
					onMove: reorder.moveAlbums
				})),
				contextMenuButtons: async (id_) => {
					const id = Number(id_);
					if (id === ALL_ALBUMS_ID || id === ADD_ALBUM_ID || reorder?.active()) return [];
					const album = stories.peer.albums?.find((a) => a.album_id === id);
					if (!album) return [];
					return [
						{
							icon: "link",
							text: "CopyLink",
							onClick: async () => {
								const username = await rootScope.managers.appPeersManager.getPeerUsername(props.peerId);
								copyTextToClipboard(`https://t.me/${username}/a/${id}`);
								toastNew({ langPackKey: "LinkCopied" });
							},
							verify: async () => {
								return !!await rootScope.managers.appPeersManager.getPeerUsername(props.peerId);
							}
						},
						{
							icon: "add",
							text: "Stories.Albums.AddStories",
							verify: () => stories.canEdit,
							onClick: () => openAddToAlbumPopup(props.peerId, id)
						},
						{
							icon: "edit",
							text: "Stories.Albums.Rename",
							verify: () => stories.canEdit,
							onClick: async () => {
								const managers = bindManagersToSession(rootScope.managers);
								const inputField = new InputField({
									maxLength: 64,
									placeholder: "Stories.Albums.CreatePlaceholder",
									required: true
								});
								inputField.value = album.title;
								try {
									await confirmationPopup({
										titleLangKey: "Stories.Albums.RenameTitle",
										inputField,
										button: { langKey: "Edit" }
									});
								} catch (e) {
									return;
								}
								if (inputField.value === album.title) return;
								managers.appStoriesManager.updateAlbum(props.peerId, id, { title: inputField.value }).catch(() => {
									toastNew({ langPackKey: "Error.AnError" });
								});
							}
						},
						{
							icon: "menu",
							text: "Stories.Reorder",
							verify: () => !!reorder && stories.canEdit,
							onClick: () => reorder.start()
						},
						{
							icon: "delete",
							text: "Stories.Albums.Delete",
							verify: () => stories.canEdit,
							danger: true,
							onClick: async () => {
								const managers = bindManagersToSession(rootScope.managers);
								try {
									await confirmationPopup({
										titleLangKey: "Stories.Albums.Delete",
										descriptionLangKey: "Stories.Albums.DeleteConfirm",
										button: {
											langKey: "Delete",
											isDanger: true
										}
									});
								} catch (e) {
									return;
								}
								managers.appStoriesManager.deleteAlbum(props.peerId, id).catch(() => {
									toastNew({ langPackKey: "Error.AnError" });
								});
							}
						}
					];
				},
				get children() {
					return [
						createComponent(ChipTab, {
							get value() {
								return ALL_ALBUMS_ID.toString();
							},
							get children() {
								return i18n("StoryAlbumAll");
							}
						}),
						createComponent(For, {
							get each() {
								return stories.peer.albums;
							},
							children: (album) => createComponent(ChipTab, {
								get ["class"]() {
									return classNames(ALBUM_CHIP_CLASS_NAME, reorder?.active() && "is-reorderable");
								},
								get value() {
									return album.album_id.toString();
								},
								get children() {
									var _el$ = _tmpl$();
									insert(_el$, () => wrapEmojiText(album.title));
									return _el$;
								}
							})
						}),
						createComponent(Show, {
							get when() {
								return stories.canEdit;
							},
							get children() {
								return createComponent(ChipTab, {
									get value() {
										return ADD_ALBUM_ID.toString();
									},
									get children() {
										return [createComponent(IconTsx, { icon: "add" }), createComponent(I18nTsx, { key: "Stories.Albums.AddAlbum" })];
									}
								});
							}
						})
					];
				}
			});
		}
	});
}
async function openAddToAlbumPopup(peerId, albumId) {
	const managers = bindManagersToSession(rootScope.managers);
	const result = await new Promise((resolve) => {
		showChooseStoryPopup({
			peerId,
			albumId,
			onFinish: resolve
		});
	});
	if (!result) return;
	const { added, removed } = result;
	if (!added.length && !removed.length) return;
	managers.appStoriesManager.updateAlbum(peerId, albumId, {
		addStories: added.length ? added : void 0,
		deleteStories: removed.length ? removed : void 0
	}).catch(() => {
		toastNew({ langPackKey: "Error.AnError" });
	});
}
function StoriesGrid(props) {
	const [stories, actions] = useStories();
	const reorder = props.reorder;
	const [viewerId, setViewerId] = createSignal();
	const items = /* @__PURE__ */ new Map();
	createReaction(() => {
		props.onReady?.();
	})(() => stories.ready);
	createEffect(() => {
		const id = viewerId();
		if (!id) return;
		const onExit = () => {
			setViewerId(void 0);
		};
		const target = createMemo(() => {
			const storyId = stories.peer.stories[stories.peer.index].id;
			return items.get(storyId);
		});
		untrack(() => {
			const peer = stories.peer;
			const index = peer.stories.findIndex((story) => story.id === id);
			actions.set({
				peer,
				index
			});
		});
		hotReloadGuard.createStoriesViewer({
			onExit,
			target,
			splitByDays: true
		});
	});
	const Item = (storyItem) => {
		const { container, div, media, thumb } = wrapStoryGridItem({
			peerId: stories.peer.peerId,
			storyItem,
			onClick: () => {
				if (reorder?.active()) return;
				setViewerId(storyItem.id);
			},
			own: () => stories.canEdit,
			pinned: () => props.pinned && !stories.albumId && storyItem.pinnedIndex !== void 0
		});
		createEffect(() => {
			div.classList.toggle(REORDERABLE_CLASS_NAME, !!reorder?.active() && reorder.canMoveStories());
		});
		createEffect(() => {
			const t = thumb();
			const element = media() || t;
			if (!element) return;
			items.set(storyItem.id, element);
			onCleanup(() => {
				items.delete(storyItem.id);
			});
			if (stories.peer.stories.length === 1) {
				const messageMedia = storyItem.media;
				const media = messageMedia.photo || messageMedia.document;
				const gotThumb = getMediaThumbIfNeeded({
					photo: media,
					cacheContext: {
						type: "x",
						url: "",
						downloaded: 0
					},
					useBlur: true,
					ignoreCache: true,
					onlyStripped: true
				});
				if (gotThumb && element.parentElement) {
					const thumb = gotThumb.image;
					element.parentElement.prepend(thumb);
					gotThumb.loadPromise.then(() => {
						const img = document.createElement("img");
						img.alt = "";
						img.className = thumb.className;
						img.src = thumb.toDataURL();
						thumb.replaceWith(img);
					});
					onCleanup(() => {
						thumb.remove();
					});
				}
			}
		});
		let archiveIcon;
		createEffect(() => {
			if (props.archive && !storyItem.pFlags.pinned) {
				archiveIcon ?? (archiveIcon = Icon("hide", "grid-item-archived"));
				div.append(archiveIcon);
			} else if (archiveIcon) archiveIcon.remove();
		});
		if (props.selection?.isSelecting) props.selection.toggleElementCheckbox(div, true);
		return container;
	};
	const isEmpty = () => stories.peer?.stories?.length === 0;
	const isLoading = () => !stories.ready || !stories.loaded && isEmpty();
	const SLIDE_DURATION = 250;
	const SLIDE_EASING = "cubic-bezier(.4, 0, .2, 1)";
	const [direction, setDirection] = createSignal(0);
	let scrollDiff = 0;
	const slideKeyframes = (_element, removed) => {
		const dir = direction() * (langPack_default.getIsRTL() ? -1 : 1);
		const yOffset = scrollDiff ? ` translateY(${scrollDiff}px)` : "";
		if (removed) return [{ transform: `translateX(${-dir * 100}%)${yOffset}` }, { transform: `translateX(0)${yOffset}` }];
		return [{ transform: `translateX(${dir * 100}%)` }, { transform: "translateX(0)" }];
	};
	const scrollPositions = /* @__PURE__ */ new Map();
	let wrapperRef;
	const getScrollBase = () => {
		const searchSuper = wrapperRef?.closest(".search-super");
		if (!searchSuper) return 0;
		return searchSuper.offsetTop === 0 ? 0 : searchSuper.offsetTop - 56;
	};
	const setAlbumIdAnimated = (albumId) => {
		const albums = stories.peer?.albums;
		const oldIndex = stories.albumId === void 0 ? -1 : albums?.findIndex((a) => a.album_id === stories.albumId) ?? -1;
		const newIndex = albumId === void 0 ? -1 : albums?.findIndex((a) => a.album_id === albumId) ?? -1;
		const dir = newIndex > oldIndex ? 1 : newIndex < oldIndex ? -1 : 0;
		const scrollable = props.scrollable.container;
		const scrollBase = getScrollBase();
		const oldScrollTop = scrollable.scrollTop;
		const oldScroll = oldScrollTop - scrollBase;
		if (oldScroll >= 0) scrollPositions.set(stories.albumId, Math.max(0, oldScroll));
		if (dir) setDirection(dir);
		actions.setAlbumId(albumId);
		const targetScrollTop = scrollBase + (scrollPositions.get(albumId) ?? 0);
		if (oldScroll >= 0) {
			scrollDiff = targetScrollTop - oldScrollTop;
			scrollable.scrollTop = targetScrollTop;
		} else {
			scrollDiff = 0;
			const searchSuper = wrapperRef?.closest(".search-super");
			if (searchSuper) fastSmoothScroll({
				element: searchSuper,
				container: scrollable,
				position: "center",
				axis: "y",
				getElementPosition: ({ elementPosition }) => {
					return elementPosition - 24;
				}
			});
		}
	};
	props.onSetAlbumAnimated?.(setAlbumIdAnimated);
	const albumContent = createMemo(() => {
		stories.albumId;
		return untrack(() => (() => {
			var _el$2 = _tmpl$4();
			insert(_el$2, createComponent(Switch, { get children() {
				return [
					createComponent(Match, {
						get when() {
							return isLoading();
						},
						get children() {
							var _el$3 = _tmpl$2();
							insert(_el$3, createComponent(PreloaderTsx, {}));
							return _el$3;
						}
					}),
					createComponent(Match, {
						get when() {
							return memo(() => !!isEmpty())() && stories.albumId !== void 0;
						},
						get children() {
							var _el$4 = _tmpl$2();
							insert(_el$4, createComponent(LottieAnimation, {
								lottieLoader,
								name: "UtyanStories",
								"class": "sticker-container"
							}), null);
							insert(_el$4, createComponent(I18nTsx, {
								key: "Stories.Albums.EmptyTitle",
								"class": "title"
							}), null);
							insert(_el$4, createComponent(I18nTsx, {
								key: "Stories.Albums.EmptySubtitle",
								"class": "subtitle"
							}), null);
							insert(_el$4, createComponent(Button, {
								"class": "btn-primary btn-color-primary btn-control",
								text: "Stories.Albums.AddToAlbum",
								onClick: () => openAddToAlbumPopup(props.peerId, stories.albumId)
							}), null);
							return _el$4;
						}
					}),
					createComponent(Match, {
						when: true,
						get children() {
							var _el$5 = _tmpl$3();
							use((list) => reorder && stories.albumId !== void 0 && attachReorder({
								list,
								axis: "grid",
								scrollable: props.scrollable,
								active: reorder.active,
								key: "mid",
								onMove: reorder.moveStories.bind(null, stories.albumId)
							}), _el$5);
							insert(_el$5, createComponent(For, {
								get each() {
									return stories.peer.stories;
								},
								children: Item
							}));
							createRenderEffect((_p$) => {
								var _v$ = !!(stories.peer.stories.length === 2), _v$2 = !!(stories.peer.stories.length === 1);
								_v$ !== _p$.e && _el$5.classList.toggle("two", _p$.e = _v$);
								_v$2 !== _p$.t && _el$5.classList.toggle("one", _p$.t = _v$2);
								return _p$;
							}, {
								e: void 0,
								t: void 0
							});
							return _el$5;
						}
					})
				];
			} }));
			return _el$2;
		})());
	});
	return (() => {
		var _el$6 = _tmpl$5();
		var _ref$ = wrapperRef;
		typeof _ref$ === "function" ? use(_ref$, _el$6) : wrapperRef = _el$6;
		insert(_el$6, createComponent(AnimationList, {
			animationOptions: {
				duration: SLIDE_DURATION,
				easing: SLIDE_EASING
			},
			keyframes: slideKeyframes,
			mode: "replacement",
			get children() {
				return albumContent();
			}
		}));
		return _el$6;
	})();
}
function StoriesSelectionToolbar(props) {
	const shown = () => props.selection.selecting() || !!props.reorder?.active();
	const reordering = createMemo((was) => {
		const selecting = props.selection.selecting(), reordering = !!props.reorder?.active();
		return selecting || reordering ? reordering : was;
	}, false);
	const reorderContent = createComponent(ReorderBarContent, {
		titleKey: "Stories.Reorder",
		onDone: () => props.reorder.stop()
	});
	const selectionContent = (() => {
		var _el$7 = _tmpl$6(), _el$8 = _el$7.firstChild;
		insert(_el$7, createComponent(Button, {
			icon: "close",
			"class": "search-super-selection-cancel btn-icon",
			get ["aria-label"]() {
				return langPack_default.format("Close", true);
			},
			onClick: () => props.selection.cancelSelection()
		}), _el$8);
		insert(_el$8, createComponent(I18nTsx, {
			key: "StoriesCount",
			get args() {
				return [String(props.selection.count())];
			}
		}));
		insert(_el$7, createComponent(Show, {
			get when() {
				return props.albumId !== void 0;
			},
			get children() {
				return createComponent(Button, {
					icon: "crossround",
					"class": "search-super-selection-remove btn-icon",
					get ["aria-label"]() {
						return langPack_default.format("Stories.Albums.RemoveFromAlbum", true);
					},
					onClick: () => {
						const mids = props.selection.selectedMids.get(props.peerId);
						if (mids?.size) {
							const count = mids.size;
							rootScope.managers.appStoriesManager.updateAlbum(props.peerId, props.albumId, { deleteStories: [...mids] }).then(() => {
								toastNew({
									langPackKey: "Stories.Albums.Removed",
									langPackArguments: [count]
								});
							}).catch(() => {
								toastNew({ langPackKey: "Error.AnError" });
							});
						}
						props.selection.cancelSelection();
					}
				});
			}
		}), null);
		insert(_el$7, createComponent(Show, {
			get when() {
				return memo(() => !!(props.pinned && !props.albumId))() && !props.selection.cantPin();
			},
			get children() {
				return createComponent(Button, {
					icon: "pin",
					"class": "search-super-selection-pintotop btn-icon",
					get ["aria-label"]() {
						return langPack_default.format("PinMessage", true);
					},
					onClick: () => props.selection.onPinStoriesToTopClick(void 0, true)
				});
			}
		}), null);
		insert(_el$7, createComponent(Show, {
			get when() {
				return !props.selection.cantPin();
			},
			get children() {
				return createComponent(Button, {
					get icon() {
						return props.selection.isStoriesArchive ? "unarchive" : "archive";
					},
					"class": "search-super-selection-pin btn-icon",
					get ["aria-label"]() {
						return langPack_default.format(props.selection.isStoriesArchive ? "Unarchive" : "Archive", true);
					},
					onClick: () => props.selection.onPinStoriesClick(void 0, props.selection.isStoriesArchive)
				});
			}
		}), null);
		insert(_el$7, createComponent(Show, {
			get when() {
				return !props.selection.cantDelete();
			},
			get children() {
				return createComponent(Button, {
					icon: "delete",
					"class": "search-super-selection-delete btn-icon danger",
					get ["aria-label"]() {
						return langPack_default.format("Delete", true);
					},
					onClick: () => props.selection.onDeleteStoriesClick()
				});
			}
		}), null);
		return _el$7;
	})();
	const content = createComponent(Show, {
		get when() {
			return reordering();
		},
		fallback: selectionContent,
		children: reorderContent
	});
	const giveWay = () => {
		if (props.selection.isSelecting) props.selection.cancelSelection();
		props.reorder?.stop();
	};
	return createComponent(SelectionPlate, {
		shown,
		get mount() {
			return props.mount;
		},
		giveWay,
		children: content
	});
}
function profileStoriesButtonMenu(props) {
	return [{
		icon: "archive",
		text: "MyStories.ShowArchive",
		onClick: () => {
			props.slider.createTab(hotReloadGuard.tabs.AppMyStoriesTab).open({
				...hotReloadGuard.tabs.AppMyStoriesTab.getInitArgs(),
				isArchive: true,
				chatId: props.peerId.isAnyChat() ? props.peerId.toChatId() : void 0
			});
		},
		verify: () => Promise.resolve(props.canEdit?.() ?? true).then((canEdit) => props.verify() && !props.isArchive && canEdit)
	}, {
		icon: "folder",
		text: "Stories.Albums.CreateAlbum",
		onClick: async () => {
			const albumId = await openCreateAlbumPopup(props.peerId);
			if (albumId !== void 0) props.onAlbumCreated?.(albumId);
		},
		verify: () => Promise.resolve(props.canEdit?.() ?? true).then((canEdit) => props.verify() && !props.isArchive && canEdit)
	}];
}
function StoriesProfileList(props) {
	const contextValue = createStoriesStore({
		peerId: props.peerId,
		pinned: props.pinned,
		archive: props.archive,
		initialAlbumId: props.initialAlbumId,
		manualLoad: true,
		onLoad: props.onLoad
	});
	const [state, actions] = contextValue;
	createEffect(() => {
		const count = state.peer?.count ?? 0;
		if (state.albumId === void 0) props.onCountChange?.(count);
	});
	const managers = bindManagersToSession(rootScope.managers);
	const selection = props.withSelection ? new StoriesSelection({
		container: props.scrollable.container,
		managers,
		listenerSetter: props.listenerSetter,
		isArchive: props.archive,
		chatId: props.peerId.isAnyChat() ? props.peerId.toChatId() : void 0,
		forPicker: props.forPicker
	}) : void 0;
	const reorder = props.pinned && selection && !props.forPicker ? createStoriesReorder({
		peerId: props.peerId,
		state,
		actions,
		selection,
		managers
	}) : void 0;
	let setAlbumAnimated;
	let containerRef;
	return {
		render: createComponent(StoriesContext.Provider, {
			value: contextValue,
			get children() {
				var _el$9 = _tmpl$7();
				var _ref$2 = containerRef;
				typeof _ref$2 === "function" ? use(_ref$2, _el$9) : containerRef = _el$9;
				insert(_el$9, (() => {
					var _c$ = memo(() => !!(props.pinned && !props.forPicker));
					return () => _c$() && createComponent(StoriesAlbums, {
						selection,
						onAlbumChange: (id) => setAlbumAnimated?.(id),
						get peerId() {
							return props.peerId;
						},
						reorder
					});
				})(), null);
				insert(_el$9, createComponent(StoriesGrid, {
					get scrollable() {
						return props.scrollable;
					},
					onReady: () => {
						new StoriesContextMenu(containerRef, selection, props.listenerSetter, state, reorder);
						if (selection) attachClickEvent(containerRef, (e) => {
							if (selection.isSelecting) {
								const item = findUpClassName(e.target, "search-super-item");
								if (!item) return;
								selection.cancelElementClick(e, item, cancelClickOrNextIfNotClick);
								selection.toggleByElement(item);
							}
						}, {
							capture: true,
							passive: false,
							listenerSetter: props.listenerSetter
						});
						props.onReady?.();
					},
					get peerId() {
						return props.peerId;
					},
					selection,
					get pinned() {
						return props.pinned;
					},
					get archive() {
						return props.archive;
					},
					reorder,
					onSetAlbumAnimated: (fn) => setAlbumAnimated = fn
				}), null);
				insert(_el$9, (() => {
					var _c$2 = memo(() => !!(selection && !props.forPicker));
					return () => _c$2() && createComponent(StoriesSelectionToolbar, {
						selection,
						get albumId() {
							return state.albumId;
						},
						get peerId() {
							return props.peerId;
						},
						get pinned() {
							return props.pinned;
						},
						get mount() {
							return props.selectionMount;
						},
						reorder
					});
				})(), null);
				return _el$9;
			}
		}),
		state,
		actions,
		selection,
		setAlbum: (albumId, skipAnimation = false) => {
			if (!skipAnimation) {
				setAlbumAnimated(albumId);
				return;
			}
			actions.setAlbumId(albumId);
		}
	};
}
//#endregion
//#region src/components/sharedMediaScrollDate.ts
var SHARED_MEDIA_SCROLL_DATE_HIDE_TIMEOUT = 1e3;
var SAME_ROW_TOLERANCE = 1;
function supportsSharedMediaScrollDate(type) {
	return type === "media" || type === "gifs" || type === "stories";
}
function findSharedMediaScrollDateItemIndex(itemCount, anchorTop, getItemBottom) {
	let left = 0;
	let right = itemCount - 1;
	let result = -1;
	while (left <= right) {
		const middle = left + right >> 1;
		if (getItemBottom(middle) > anchorTop) {
			result = middle;
			right = middle - 1;
		} else left = middle + 1;
	}
	if (result === -1) return result;
	const rowBottom = getItemBottom(result);
	while (result > 0 && Math.abs(getItemBottom(result - 1) - rowBottom) < SAME_ROW_TOLERANCE) --result;
	return result;
}
//#endregion
//#region src/components/sharedMediaScrollDateBadge.ts
function createSharedMediaScrollDateBadge(options) {
	let element;
	let timestamp;
	let hideTimeout;
	const hide = () => {
		window.clearTimeout(hideTimeout);
		hideTimeout = 0;
		element?.classList.remove("is-visible");
	};
	const update = (canShow) => {
		if (!canShow) {
			hide();
			return;
		}
		const items = options.getItems();
		if (!items.length) {
			hide();
			return;
		}
		const anchorTop = options.getAnchorTop();
		const bounds = /* @__PURE__ */ new Map();
		const getItemBottom = (index) => {
			let rect = bounds.get(index);
			if (!rect) {
				rect = items[index].getBoundingClientRect();
				bounds.set(index, rect);
			}
			return rect.bottom;
		};
		const index = findSharedMediaScrollDateItemIndex(items.length, anchorTop, getItemBottom);
		const nextTimestamp = index === -1 ? 0 : +items[index].dataset.timestamp;
		if (!nextTimestamp) {
			hide();
			return;
		}
		if (timestamp !== nextTimestamp) {
			const date = /* @__PURE__ */ new Date(nextTimestamp * 1e3);
			date.setHours(0, 0, 0, 0);
			const nextElement = createDateBubble(nextTimestamp, date);
			if (element) element.replaceChildren(...Array.from(nextElement.childNodes));
			else {
				element = nextElement;
				element.classList.add("search-super-scroll-date");
				options.mount(element);
			}
			timestamp = nextTimestamp;
		}
		window.clearTimeout(hideTimeout);
		element.classList.add("is-visible");
		hideTimeout = window.setTimeout(hide, SHARED_MEDIA_SCROLL_DATE_HIDE_TIMEOUT);
	};
	const reset = () => {
		hide();
		timestamp = void 0;
	};
	const destroy = () => {
		reset();
		element?.remove();
		element = void 0;
	};
	return {
		destroy,
		hide,
		reset,
		update
	};
}
//#endregion
export { profileStoriesButtonMenu as a, hasStoryLink as c, REORDERABLE_CLASS_NAME as d, ReorderBarContent as f, createReorderMode as h, isStoryReorderTarget as i, createAddToAlbumSubmenuTrigger as l, attachReorder as m, supportsSharedMediaScrollDate as n, copyStoryLink as o, SelectionPlate as p, StoriesProfileList as r, handleShareStory as s, createSharedMediaScrollDateBadge as t, openCreateAlbumPopup as u };
