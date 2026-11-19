//# allFunctionsCalledOnLoad
import { s as IS_MOBILE } from "./userAgent-ByGXcznk.js";
import { n as Transitions } from "./themeController-2cytOOn0.js";
import { H as usePeers, t as apiManagerProxy } from "./apiManagerProxy-DmQXvxSF.js";
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { t as I18n } from "./langPack-BmdJGr44.js";
import { C as createSignal, M as onCleanup, N as onMount, _ as createMemo, g as createEffect, i as For, j as on, m as createComputed, p as createComponent, s as Show, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { n as bindManagersToSession } from "./bindManagersToAccount-BL82O9H9.js";
import { t as clamp } from "./clamp-9UaNhw6N.js";
import { _ as use, c as insert, g as template, n as Portal, o as className, p as setStyleProperty, s as delegateEvents } from "./web-BPyQozky.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { o as useAppSettings, t as liteMode } from "./liteMode-DeLStZfQ.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
import { t as getMiddleware } from "./middleware-D6HuIqPm.js";
import { n as attachClickEvent } from "./clickEvent-COk4YpLP.js";
import { n as replaceButtonIcon } from "./button-DpTvniRN.js";
import { r as cancelAnimationByKey } from "./animation-Dd3Xpw_9.js";
import { t as replaceContent } from "./replaceContent-Bi6ru3li.js";
import { c as createContextMenu } from "./confirmationPopup-Bz6mK0o-.js";
import { bt as MENU_ITEM_DELETE, vt as confirmDeleteContacts, yt as DialogsSelectionBase } from "./appDialogsManager-CXguiKc3.js";
import { i as useElementSize } from "./openEditors-7FmA7q_V.js";
import { i as fastSmoothScroll } from "./scrollable-C2-FwBtK.js";
import { t as getUserStatusString } from "./getUserStatusString-YlDGsxzx.js";
import { o as SectionName } from "./emailVerification-C8QYZSyu.js";
import { t as ButtonIcon } from "./buttonIcon-CthJWloV.js";
import { t as InputSearch } from "./inputSearch-DWd-Jn5r.js";
import { t as createListenerSetter } from "./createListenerSetter-B9GrRG19.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { t as ButtonCorner } from "./buttonCorner-HdHn23eT.js";
import { n as showCreateContactPopup, t as wheelDeltaToPixels } from "./wheelDeltaToPixels-BwGrEa5k.js";
import { t as canFocus } from "./canFocus-CUva3cbc.js";
import { i as findDialogListElement } from "./dialogElement-CPjhySC8.js";
import { n as sortContacts } from "./sortContacts-CwsyJyhF.js";
import { a as findItemAtOffset, i as createItemsLayout, n as VerticalVirtualList, t as VIRTUAL_LIST_ITEM_CLASS_NAME } from "./verticalVirtualList-DwtKY1Ch.js";
import { t as flashControl } from "./highlight-UNm3NgBo.js";
var sectionIndex_module_default = {
	index: "_index_7dn5v_1",
	letter: "_letter_7dn5v_13",
	active: "_active_7dn5v_24"
};
//#endregion
//#region src/components/sectionIndex.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div aria-hidden=true>`);
var _tmpl$2 = /*#__PURE__*/ template(`<span>`);
var COLUMN_WIDTH = 22;
var APPROACH_WIDTH = 32;
var SLOT_HEIGHT = 15;
var MIN_SLOT_HEIGHT = 12;
var VERTICAL_INSET = 10;
var EASE = .6;
var FISHEYE_REACH_SLOTS = 2.2;
/** Where the letters go in a strip of this height: every n-th of them when they do not all fit */
function layoutSectionIndexSlots(letters, height) {
	const count = letters.length;
	if (!count || height <= 0) return {
		slots: [],
		pitch: 0
	};
	const fullHeight = Math.max(height - 20, MIN_SLOT_HEIGHT);
	const usable = Math.max(fullHeight - 37, MIN_SLOT_HEIGHT);
	const maxFit = Math.max(usable / MIN_SLOT_HEIGHT | 0, 1);
	const skip = count <= maxFit ? 1 : Math.ceil(count / maxFit);
	const kept = [];
	for (let i = 0; i < count; i += skip) kept.push(i);
	if (kept[kept.length - 1] !== count - 1) kept.push(count - 1);
	const pitch = Math.min(SLOT_HEIGHT, usable / kept.length | 0);
	const blockTop = VERTICAL_INSET + Math.max(0, (fullHeight - kept.length * pitch) / 2 | 0);
	return {
		slots: kept.map((sourceIndex, idx) => ({
			letter: letters[sourceIndex].letter,
			sourceIndex,
			y: blockTop + pitch * idx + (pitch / 2 | 0)
		})),
		pitch
	};
}
function SectionIndex(props) {
	let root;
	const letterElements = [];
	const layout = createMemo(() => layoutSectionIndexSlots(props.letters, props.height));
	let scales = [];
	let cursorX = -1, cursorY = -1;
	let current = -1;
	let scrubbing = false;
	let frame;
	const isRTL = () => I18n.getIsRTL();
	/** How much a letter swells: by how near the pointer is to it, and to the strip */
	const getSlotScale = (slotY) => {
		const { pitch } = layout();
		if (cursorY < 0 || !pitch) return 1;
		const vertical = clamp(Math.abs(slotY - cursorY) / (FISHEYE_REACH_SLOTS * pitch), 0, 1);
		const verticalFalloff = Math.cos(Math.PI / 2 * vertical);
		const away = isRTL() ? clamp((cursorX - COLUMN_WIDTH) / APPROACH_WIDTH, 0, 1) : clamp(-cursorX / APPROACH_WIDTH, 0, 1);
		const horizontalFalloff = 1 - away * away * (3 - 2 * away);
		return 1 + .8 * verticalFalloff * horizontalFalloff;
	};
	const paint = () => {
		const { slots, pitch } = layout();
		const count = slots.length;
		if (!count) return;
		const half = pitch / 2 | 0;
		const extra = scales.reduce((sum, scale) => sum + scale * pitch, 0) - count * pitch;
		let edge = slots[0].y - half - extra / 2;
		for (let i = 0; i < count; ++i) {
			const element = letterElements[i];
			const scale = scales[i];
			const size = scale * pitch;
			const center = edge + (size - pitch) / 2 + half;
			edge += size;
			if (!element) continue;
			element.style.transform = `translateY(${center - pitch / 2}px)` + (scale > 1.001 ? ` scale(${scale})` : "");
			element.classList.toggle(sectionIndex_module_default.active, current === i || props.visibleLetters.has(slots[i].letter));
		}
	};
	/** One frame of the letters easing towards the size the pointer asks of them */
	const animateFrame = () => {
		frame = void 0;
		let moving = false;
		layout().slots.forEach((slot, idx) => {
			const target = getSlotScale(slot.y);
			const delta = target - scales[idx];
			if (Math.abs(delta) > .002) {
				scales[idx] += delta * EASE;
				moving = true;
			} else scales[idx] = target;
		});
		paint();
		if (moving) frame = requestAnimationFrame(animateFrame);
	};
	const startAnimation = () => {
		frame ?? (frame = requestAnimationFrame(animateFrame));
	};
	/**
	* Follows the pointer while it is over the strip, its approach - the stretch of the list beside
	* it - or the gap between the strip and the edge, and lets go of it anywhere else
	*/
	const setCursor = (e) => {
		const rect = root.getBoundingClientRect();
		const outerRect = props.approachElement.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		const left = isRTL() ? outerRect.left - rect.left : -32;
		const right = isRTL() ? 54 : outerRect.right - rect.left;
		const inside = scrubbing || x >= left && x <= right && y >= 0 && y <= rect.height;
		const [wasX, wasY] = [cursorX, cursorY];
		cursorX = inside ? x : -1;
		cursorY = inside ? y : -1;
		if (wasX !== cursorX || wasY !== cursorY) startAnimation();
	};
	/**
	* The pointer has left the list: the letters settle back. Not by where it left - an event of
	* leaving can still carry a point on the very edge, which the strip would take as near
	*/
	const onLeave = () => {
		if (scrubbing || cursorY < 0) return;
		cursorX = cursorY = -1;
		startAnimation();
	};
	const getSlotAtY = (y) => {
		let best = -1, bestDistance = 0;
		layout().slots.forEach((slot, idx) => {
			const distance = Math.abs(slot.y - y);
			if (best < 0 || distance < bestDistance) {
				best = idx;
				bestDistance = distance;
			}
		});
		return best;
	};
	const scrubTo = (slotIdx, animate) => {
		if (slotIdx < 0 || slotIdx === current) return;
		current = slotIdx;
		props.onJump(props.letters[layout().slots[slotIdx].sourceIndex].top, animate);
		paint();
	};
	const onPointerDown = (e) => {
		if (e.button !== 0) return;
		e.preventDefault();
		root.setPointerCapture(e.pointerId);
		scrubbing = true;
		setCursor(e);
		scrubTo(getSlotAtY(cursorY), true);
	};
	const onPointerMove = (e) => {
		setCursor(e);
		if (scrubbing) scrubTo(getSlotAtY(cursorY), false);
	};
	const onPointerUp = (e) => {
		if (!scrubbing) return;
		scrubbing = false;
		current = -1;
		setCursor(e);
		paint();
	};
	const onWheel = (e) => {
		e.preventDefault();
		const { scrollable } = props;
		cancelAnimationByKey(scrollable);
		scrollable.scrollTop += wheelDeltaToPixels(e.deltaY, e.deltaMode, scrollable.clientHeight);
	};
	createEffect(() => {
		scales = layout().slots.map(() => 1);
		queueMicrotask(() => cursorY < 0 ? paint() : startAnimation());
	});
	createEffect(() => {
		props.visibleLetters;
		paint();
	});
	onMount(() => {
		const { approachElement } = props;
		approachElement.addEventListener("pointermove", onPointerMove);
		approachElement.addEventListener("pointerleave", onLeave);
		root.addEventListener("wheel", onWheel, { passive: false });
		onCleanup(() => {
			approachElement.removeEventListener("pointermove", onPointerMove);
			approachElement.removeEventListener("pointerleave", onLeave);
			if (frame !== void 0) cancelAnimationFrame(frame);
		});
	});
	return (() => {
		var _el$ = _tmpl$();
		_el$.addEventListener("pointercancel", onPointerUp);
		_el$.$$pointerup = onPointerUp;
		_el$.$$pointerdown = onPointerDown;
		var _ref$ = root;
		typeof _ref$ === "function" ? use(_ref$, _el$) : root = _el$;
		insert(_el$, createComponent(For, {
			get each() {
				return layout().slots;
			},
			children: (slot, idx) => (() => {
				var _el$2 = _tmpl$2();
				use((element) => letterElements[idx()] = element, _el$2);
				insert(_el$2, () => slot.letter);
				createRenderEffect((_p$) => {
					var _v$ = sectionIndex_module_default.letter, _v$2 = layout().pitch + "px", _v$3 = layout().pitch + "px";
					_v$ !== _p$.e && className(_el$2, _p$.e = _v$);
					_v$2 !== _p$.t && setStyleProperty(_el$2, "height", _p$.t = _v$2);
					_v$3 !== _p$.a && setStyleProperty(_el$2, "line-height", _p$.a = _v$3);
					return _p$;
				}, {
					e: void 0,
					t: void 0,
					a: void 0
				});
				return _el$2;
			})()
		}));
		createRenderEffect(() => className(_el$, sectionIndex_module_default.index));
		return _el$;
	})();
}
delegateEvents(["pointerdown", "pointerup"]);
var contactsList_module_default = {
	item: "_item_392uh_1",
	section: "_section_392uh_2",
	reordering: "_reordering_392uh_6",
	lifted: "_lifted_392uh_10"
};
//#endregion
//#region src/components/sidebarLeft/contactsList.tsx
/** An `abitbigger` chat row, which is what a contact is shown as */
var ROW_HEIGHT = 56;
/** A section's letter above its first contact: a section name, as tall as `.section` holds it */
var SECTION_HEIGHT = 40;
/** How far outside the screen rows are kept rendered, so a scroll does not show them being built */
var THRESHOLD_PADDING = 224;
/**
* How long a change of someone's last seen waits before the list is put in that order again -
* tdesktop's `kSortByOnlineThrottle`: statuses change all the time, and the rows would never rest
*/
var SORT_BY_ONLINE_THROTTLE = 3e3;
/** How often the "last seen" lines are brought up to date - "5 minutes ago" does not stay true */
var STATUS_REFRESH_INTERVAL = 3e4;
/** The space under the last row, as the chat list leaves it */
var PADDING_BOTTOM = 8;
/** How long the rows glide to their new places - Android's `DefaultItemAnimator` moves list items so */
var REORDER_TIME = 250;
/** How long a deleted row fades out while the rows under it close the gap - Android's remove */
var REMOVE_TIME = 120;
var isSection = (item) => typeof item === "string";
var getItemHeight = (item) => isSection(item) ? SECTION_HEIGHT : ROW_HEIGHT;
/**
* The contacts, as the contacts tab lists them: by how recently each was seen, or alphabetically
* the way tdesktop has it - sectioned by first letter, with the strip of letters along the side
* (`SectionIndex`). A search lists what it found in the same order, without the sections.
*
* The list is virtual: only the rows on screen, and a few around them, exist at all - an address
* book runs into thousands, and every row carries an avatar and a live status.
*/
function ContactsList(props) {
	const peers = usePeers();
	const listenerSetter = createListenerSetter();
	const middlewareHelper = getMiddleware();
	onCleanup(() => middlewareHelper.destroy());
	const [peerIds, setPeerIds] = createSignal([]);
	const [sortVersion, setSortVersion] = createSignal(0);
	const resort = () => setSortVersion((version) => version + 1);
	const [statusTick, setStatusTick] = createSignal(0);
	let loadToken = 0;
	/** @param glide whether the rows glide to where the fresh list puts them - not for a list of its own */
	const load = (glide) => {
		const token = ++loadToken;
		const middleware = middlewareHelper.get();
		props.managers.appUsersManager.getContactsPeerIds(props.query, false, "none").then((peerIds) => {
			if (token !== loadToken || !middleware()) return;
			if (glide) reorder(() => setPeerIds(peerIds));
			else setPeerIds(peerIds);
		});
	};
	createEffect(on(() => props.query, () => load()));
	const sorted = createMemo(() => {
		sortVersion();
		return sortContacts(peerIds(), props.sortMode, (userId) => apiManagerProxy.getUser(userId));
	});
	const contactsSet = createMemo(() => new Set(peerIds()));
	let list;
	let reorderTimeout;
	let moves;
	let removals;
	let animations = [];
	let fading = [];
	/** @param cancel whether the rows are to jump to their places, the list having become another */
	const endReorder = (cancel) => {
		clearTimeout(reorderTimeout);
		reorderTimeout = void 0;
		if (cancel) animations.forEach((animation) => animation.cancel());
		animations = [];
		fading.forEach(({ remove }) => remove());
		fading = [];
		list?.classList.remove(contactsList_module_default.reordering);
		list?.querySelectorAll("." + contactsList_module_default.lifted).forEach((element) => element.classList.remove(contactsList_module_default.lifted));
	};
	const reorder = (update) => {
		const { scrollable } = props;
		const scrollTop = scrollable.scrollTop;
		moves = [];
		removals = [];
		update();
		const made = moves, removed = removals;
		moves = removals = void 0;
		if (!made.length && !removed.length || scrollable.scrollTop !== scrollTop || !liteMode.isAvailable("motion")) {
			removed.forEach(({ remove }) => remove());
			return;
		}
		endReorder(true);
		list.classList.add(contactsList_module_default.reordering);
		for (const removal of removed) {
			list.prepend(removal.element);
			fading.push(removal);
			animations.push(removal.element.animate([{ opacity: 1 }, { opacity: 0 }], {
				duration: REMOVE_TIME,
				easing: Transitions.standard.easing,
				fill: "forwards"
			}));
		}
		for (const { element, from, to } of made) {
			element.classList.toggle(contactsList_module_default.lifted, Math.abs(to - from) > ROW_HEIGHT);
			animations.push(element.animate([{ transform: `translateY(${from}px)` }, { transform: `translateY(${to}px)` }], {
				duration: REORDER_TIME,
				easing: Transitions.standard.easing
			}));
		}
		reorderTimeout = window.setTimeout(endReorder, REORDER_TIME);
	};
	createComputed(on([() => props.sortMode, () => props.query], () => endReorder(true), { defer: true }));
	onCleanup(() => endReorder(true));
	const content = createMemo(() => {
		const { peerIds, sections } = sorted();
		if (!sections || props.query) return {
			items: peerIds,
			sectionByIdx: void 0
		};
		const items = [];
		const sectionByIdx = [];
		peerIds.forEach((peerId, idx) => {
			const section = sections[idx];
			if (section !== sections[idx - 1]) {
				items.push(section);
				sectionByIdx.push(section);
			}
			items.push(peerId);
			sectionByIdx.push(section);
		});
		return {
			items,
			sectionByIdx
		};
	});
	const layout = createMemo(() => content().sectionByIdx && createItemsLayout(content().items, getItemHeight));
	const letters = createMemo(() => {
		const { items, sectionByIdx } = content();
		if (!sectionByIdx) return [];
		const itemsLayout = layout();
		const letters = [];
		items.forEach((item, idx) => {
			if (isSection(item)) letters.push({
				letter: item,
				top: itemsLayout.top(idx)
			});
		});
		return letters;
	});
	const [scrollTop, setScrollTop] = createSignal(0);
	const scrollableSize = useElementSize(() => props.scrollable);
	const viewportHeight = () => scrollableSize.height || props.scrollable.clientHeight;
	const visibleLetters = createMemo(() => {
		const visible = /* @__PURE__ */ new Set();
		const { items, sectionByIdx } = content();
		if (!sectionByIdx) return visible;
		const itemsLayout = layout();
		const top = scrollTop(), bottom = top + viewportHeight();
		for (let idx = findItemAtOffset(itemsLayout, items.length, top); idx < items.length && itemsLayout.top(idx) < bottom; ++idx) if (!isSection(items[idx])) visible.add(sectionByIdx[idx]);
		return visible;
	});
	const jumpTo = (top, animate) => {
		const { scrollable } = props;
		if (!animate) {
			cancelAnimationByKey(scrollable);
			scrollable.scrollTop = top;
			return;
		}
		fastSmoothScroll({
			container: scrollable,
			element: scrollable,
			getElementPosition: () => top - scrollable.scrollTop,
			position: "start"
		});
	};
	let sortTimeout;
	const cancelSortTimeout = () => {
		clearTimeout(sortTimeout);
		sortTimeout = void 0;
	};
	createEffect(on(() => props.sortMode, cancelSortTimeout));
	onCleanup(cancelSortTimeout);
	listenerSetter.add(rootScope)("user_update", (userId) => {
		if (props.sortMode !== "online" || sortTimeout !== void 0 || !contactsSet().has(userId.toPeerId())) return;
		sortTimeout = window.setTimeout(() => {
			sortTimeout = void 0;
			reorder(resort);
		}, SORT_BY_ONLINE_THROTTLE);
	});
	listenerSetter.add(rootScope)("peer_title_edit", ({ peerId, threadId }) => {
		if (!threadId && contactsSet().has(peerId)) reorder(resort);
	});
	let reloadTimeout;
	listenerSetter.add(rootScope)("contacts_update", () => {
		clearTimeout(reloadTimeout);
		reloadTimeout = window.setTimeout(() => load(true), 0);
	});
	onCleanup(() => clearTimeout(reloadTimeout));
	onMount(() => {
		const interval = window.setInterval(() => setStatusTick((tick) => tick + 1), STATUS_REFRESH_INTERVAL);
		onCleanup(() => clearInterval(interval));
		listenerSetter.add(props.scrollable)("scroll", () => setScrollTop(props.scrollable.scrollTop));
	});
	/** Places an item where the list puts it, and says where it came from when that is to glide */
	const placeItem = (element, top) => {
		let lastTop;
		createRenderEffect(() => {
			const _top = top();
			if (moves && lastTop !== void 0 && lastTop !== _top) moves.push({
				element,
				from: lastTop,
				to: _top
			});
			lastTop = _top;
			element.style.transform = `translateY(${_top}px)`;
		});
	};
	const ContactRow = (rowProps) => {
		const dialogElement = hotReloadGuard.appDialogsManager.addDialogNew({
			peerId: rowProps.peerId,
			container: false,
			avatarSize: "abitbigger",
			autonomous: true,
			meAsSaved: false,
			wrapOptions: { middleware: middlewareHelper.get() },
			withStories: true
		});
		const { listEl, lastMessageSpan } = dialogElement.dom;
		listEl.classList.add(VIRTUAL_LIST_ITEM_CLASS_NAME, contactsList_module_default.item);
		placeItem(listEl, () => rowProps.top);
		createEffect(() => {
			statusTick();
			replaceContent(lastMessageSpan, getUserStatusString(peers[rowProps.peerId]));
		});
		onMount(() => {
			props.selection.applyToElement(listEl, false);
		});
		onCleanup(() => {
			if (removals && !contactsSet().has(rowProps.peerId)) {
				removals.push({
					element: listEl,
					remove: () => dialogElement.remove()
				});
				return;
			}
			dialogElement.destroy();
		});
		return listEl;
	};
	const ListItem = (itemProps) => {
		const { item } = itemProps;
		if (isSection(item)) {
			let name;
			const section = createComponent(SectionName, {
				ref(r$) {
					var _ref$ = name;
					typeof _ref$ === "function" ? _ref$(r$) : name = r$;
				},
				get ["class"]() {
					return classNames(VIRTUAL_LIST_ITEM_CLASS_NAME, contactsList_module_default.section);
				},
				children: item
			});
			placeItem(name, () => itemProps.top);
			return section;
		}
		return createComponent(ContactRow, {
			peerId: item,
			get top() {
				return itemProps.top;
			}
		});
	};
	onMount(() => {
		props.ref({
			list,
			getSortedItems: () => sorted().peerIds.map((id) => ({ id }))
		});
	});
	return [createComponent(VerticalVirtualList, {
		ref(r$) {
			var _ref$2 = list;
			typeof _ref$2 === "function" ? _ref$2(r$) : list = r$;
		},
		"class": "chatlist virtual-chatlist",
		get list() {
			return content().items;
		},
		get layout() {
			return layout();
		},
		ListItem,
		get scrollableHost() {
			return props.scrollable;
		},
		itemHeight: ROW_HEIGHT,
		thresholdPadding: THRESHOLD_PADDING,
		animate: false,
		extraPaddingBottom: PADDING_BOTTOM
	}), createComponent(Show, {
		get when() {
			return letters().length >= 2;
		},
		get children() {
			return createComponent(Portal, {
				get mount() {
					return props.indexContainer;
				},
				get children() {
					return createComponent(SectionIndex, {
						get letters() {
							return letters();
						},
						get height() {
							return viewportHeight();
						},
						get visibleLetters() {
							return visibleLetters();
						},
						onJump: jumpTo,
						get scrollable() {
							return props.scrollable;
						},
						get approachElement() {
							return props.indexContainer;
						}
					});
				}
			});
		}
	})];
}
//#endregion
//#region src/components/contactsSelection.ts
var MENU_ITEMS = [MENU_ITEM_DELETE];
/**
* Selecting several contacts at once, the way Android's `ContactsActivity` does it: the bar counts
* them, and deleting them is all there is to do - so it is a button of the bar, not a menu. The
* bar and the selecting itself are `DialogsSelectionBase`, the very ones the chats are selected with.
*
* One of these belongs to one contacts tab, and goes away with it.
*/
var ContactsSelection = class extends DialogsSelectionBase {
	constructor(..._args) {
		super(..._args);
		this.countLangKey = "ContactsSelected";
	}
	getMenuItems() {
		return MENU_ITEMS;
	}
	/** A contact of the list, and not a section header between them */
	canSelect(element) {
		return this.isRowOfList(element) && !!element.dataset.peerId;
	}
	async updateActions() {
		this.actions = { delete: true };
	}
	perform() {
		return this.deleteContacts(this.getOrderedKeys());
	}
	/**
	* Asks, as a contact's own page asks, and deletes the contacts - the ones selected, or the one a
	* row's own menu was opened on
	* @returns `false` when the delete was called off
	*/
	async deleteContacts(peerIds) {
		const managers = bindManagersToSession(this.managers);
		try {
			await confirmDeleteContacts(peerIds);
		} catch {
			return false;
		}
		managers.appUsersManager.deleteContacts(peerIds.map((peerId) => peerId.toUserId()));
	}
};
//#endregion
//#region src/components/sidebarLeft/contactsContextMenu.ts
/**
* The menu of a contact's row: it is where the selection of contacts starts, as the chats' does,
* and where one contact is deleted without selecting it first
*/
function attachContactsContextMenu({ list, selection, listenerSetter }) {
	let row;
	return createContextMenu({
		listenTo: list,
		listenerSetter,
		findElement: (e) => findDialogListElement(e.target),
		onOpen: (e, target) => {
			if (selection.isSelecting || !selection.canSelect(target)) throw "Selecting contacts";
			row = target;
		},
		onClose: () => {
			row = void 0;
		},
		buttons: [{
			icon: "select",
			text: "Message.Context.Select",
			onClick: () => selection.toggleByElement(row)
		}, {
			icon: "delete",
			text: "DeleteContact",
			danger: true,
			onClick: () => {
				selection.deleteContacts([row.dataset.peerId.toPeerId()]);
			}
		}]
	});
}
//#endregion
//#region src/components/sidebarLeft/tabs/contacts.tsx
var Contacts = () => {
	const [tab] = useSuperTab();
	const [query, setQuery] = createSignal("");
	const [appSettings, setAppSettings] = useAppSettings();
	const sortMode = () => appSettings.contactsSortMode;
	let contactsList;
	const selection = new ContactsSelection({
		managers: tab.managers,
		getHeader: () => tab.header,
		getSortedList: () => contactsList,
		getDialogKey: (element) => element.dataset.peerId.toPeerId(),
		listContainer: tab.scrollable.container
	});
	onCleanup(() => selection.cleanup());
	const onList = (list) => {
		contactsList = list;
		hotReloadGuard.appDialogsManager.setListClickListener({
			list: list.list,
			autonomous: true,
			selection
		});
		attachContactsContextMenu({
			list: list.list,
			selection,
			listenerSetter: tab.listenerSetter
		});
	};
	const sortButton = ButtonIcon("sort_name sidebar-header-right", {
		noRipple: true,
		ariaLabel: "AccDescrContactSorting"
	});
	createEffect(() => {
		replaceButtonIcon(sortButton, sortMode() === "online" ? "sort_name" : "sort_online");
	});
	attachClickEvent(sortButton, () => {
		setAppSettings("contactsSortMode", sortMode() === "online" ? "name" : "online");
	}, { listenerSetter: tab.listenerSetter });
	onMount(() => {
		tab.container.id = "contacts-container";
		const btnAdd = ButtonCorner({
			icon: "add",
			className: "is-visible",
			ariaLabel: "AddContact"
		});
		tab.content.append(btnAdd);
		attachClickEvent(btnAdd, () => {
			showCreateContactPopup();
		}, { listenerSetter: tab.listenerSetter });
		const inputSearch = new InputSearch({
			placeholder: "Search",
			onChange: setQuery
		});
		tab.title.replaceWith(inputSearch.container);
		tab.header.append(sortButton);
		tab.shown.then(() => {
			if (tab.payload?.highlight === "sort") {
				flashControl(sortButton, tab.middlewareHelper.get());
				return;
			}
			if (IS_MOBILE || !canFocus(true)) return;
			inputSearch.input.focus();
		});
	});
	return createComponent(ContactsList, {
		get managers() {
			return tab.managers;
		},
		get query() {
			return query();
		},
		get sortMode() {
			return sortMode();
		},
		get scrollable() {
			return tab.scrollable.container;
		},
		get indexContainer() {
			return tab.content;
		},
		selection,
		ref: onList
	});
};
//#endregion
export { Contacts as default };
