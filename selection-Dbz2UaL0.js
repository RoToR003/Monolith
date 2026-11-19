//# allFunctionsCalledOnLoad
import { c as IS_MOBILE_SAFARI, h as Modes } from "./userAgent-ByGXcznk.js";
import { a as blurActiveElement, n as appNavigationController } from "./appNavigationController-Ct0fx8yF.js";
import { t as IS_TOUCH_SUPPORTED } from "./touchSupport-B2RWO3zD.js";
import { t as findUpClassName } from "./findUpClassName-3V5me58N.js";
import { t as EventListenerBase } from "./eventListenerBase-da40Q-0t.js";
import { a as safeAssign } from "./idb-BZfkipS3.js";
import { a as i18n, u as langPack_default } from "./langPack-BmdJGr44.js";
import { n as getAppWindow } from "./appWindow-bo-KtJhy.js";
import { n as bindManagersToSession } from "./bindManagersToAccount-BL82O9H9.js";
import { n as isEphemeralMessageId } from "./getServerMessageId-1hhP4U5Q.js";
import { t as cancelEvent } from "./cancelEvent-Cw8vYZHp.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { n as isInDOM } from "./sequentialDom-CRhA0kB2.js";
import { t as findUpAsChild } from "./findUpAsChild-CPjgnY00.js";
import { t as ListenerSetter } from "./listenerSetter-BER6qAXn.js";
import { n as attachClickEvent } from "./clickEvent-COk4YpLP.js";
import { t as Button } from "./button-DpTvniRN.js";
import { t as SetTransition } from "./singleTransition-UfxhQocw.js";
import { t as replaceContent } from "./replaceContent-Bi6ru3li.js";
import { O as randomLong } from "./index-B7axFZql.js";
import { Cn as CheckboxField, u as attachContextMenuListener } from "./confirmationPopup-Bz6mK0o-.js";
import { ot as makeFullMid } from "./getChatMigratedTo-ChhMNXuu.js";
import { X as flatten } from "./canPollPeerStories-D3HoBvLX.js";
import { t as ButtonIcon } from "./buttonIcon-CthJWloV.js";
import { t as ChatType } from "./chatType-C89v744i.js";
import { t as showDeleteMessagesPopup } from "./deleteMessages-HZOHTHZe.js";
import { a as showSelectedMessagesReport, d as getSelectionElementFromTarget, f as showSendNowPopup, l as getSelectedText, u as cancelSelection } from "./reportAd-BfPVxygc.js";
import { i as swallowNextClick } from "./sortable-DnDolsys.js";
import { i as isWidgetTarget } from "./gestures-CSyJN1uf.js";
import { n as ChatInputPlate } from "./controlPlate-BTnABzvn.js";
//#region src/environment/standalone.ts
var IS_STANDALONE = window.matchMedia("(display-mode: standalone)").matches;
//#endregion
//#region src/components/chat/selectionRange.ts
function getBubbleByClassName(element, className) {
	const bubble = findUpClassName(element, "bubble");
	return bubble?.classList.contains(className) ? bubble : void 0;
}
var getAlbumBubble = (element) => getBubbleByClassName(element, "is-album");
/**
* A grouped bubble (album, grouped documents) is a single drag unit: its outer bubble carries the
* group's main mid, so hovering it right after one of its items would count as a second element and
* start the selection without ever leaving the group. Only an item-to-item move inside the group is
* a real range.
*/
function isSameGroupedSelectionUnit(anchor, element) {
	const bubble = getBubbleByClassName(anchor, "is-grouped");
	if (!bubble || bubble !== getBubbleByClassName(element, "is-grouped")) return false;
	return !(anchor.classList.contains("grouped-item") && element.classList.contains("grouped-item"));
}
function expandAlbumSelectionRange(options) {
	const { first, last, elements, getGroupedItems } = options;
	const albums = /* @__PURE__ */ new Map();
	const firstAlbum = getAlbumBubble(first);
	const lastAlbum = getAlbumBubble(last);
	const sharedEndpointAlbum = firstAlbum && firstAlbum === lastAlbum && first.classList.contains("grouped-item") && last.classList.contains("grouped-item") ? firstAlbum : void 0;
	const addAlbum = (element) => {
		const album = getAlbumBubble(element);
		if (album && album !== sharedEndpointAlbum && !albums.has(album)) {
			const items = getGroupedItems(album);
			if (items.length) albums.set(album, items);
		}
	};
	elements.forEach(addAlbum);
	if (!sharedEndpointAlbum) {
		addAlbum(first);
		addAlbum(last);
	}
	if (!albums.size) return elements;
	const expanded = elements.filter((element) => {
		const album = getAlbumBubble(element);
		return !album || !albums.has(album);
	});
	albums.forEach((items) => expanded.push(...items));
	return [...new Set(expanded)];
}
function setAlbumItemsSelection(options) {
	const { album, selected, getGroupedItems, setElementSelection } = options;
	if (!album.classList.contains("is-album")) return false;
	getGroupedItems(album).forEach((item) => setElementSelection(item, selected));
	return true;
}
//#endregion
//#region src/components/chat/isSameMessageSelectionGroup.ts
function getMessageSelectionGroup(selectedMids) {
	for (const mids of selectedMids.values()) {
		const mid = mids.values().next().value;
		if (mid !== void 0) return isEphemeralMessageId(mid);
	}
}
function isSameMessageSelectionGroup(selectedMids, isEphemeral) {
	const selectionGroup = getMessageSelectionGroup(selectedMids);
	return selectionGroup === void 0 || selectionGroup === isEphemeral;
}
//#endregion
//#region src/components/chat/selection.ts
var accumulateMapSet = (map) => {
	return [...map.values()].reduce((acc, v) => acc + v.size, 0);
};
var AppSelection = class extends EventListenerBase {
	constructor(options) {
		super(false);
		this.selectedMids = /* @__PURE__ */ new Map();
		this.isSelecting = false;
		this.selectionRoles = /* @__PURE__ */ new WeakMap();
		this.dragThreshold = 0;
		this.onMouseDown = (e) => {
			const element = findUpClassName(e.target, this.targetLookupClassName);
			if (e.button !== 0) return;
			if (this.verifyTarget && !this.verifyTarget(e, element)) return;
			const activeWindow = getAppWindow();
			const activeDocument = activeWindow.document;
			const { clientX: startX, clientY: startY } = e;
			const seen = /* @__PURE__ */ new Map();
			let selecting;
			let dragAnchor;
			let firstTarget = element;
			const processElement = (element, checkBetween = true) => {
				const key = this.getKeyFromElement(element);
				if (key === void 0) return;
				if (!isInDOM(firstTarget)) firstTarget = element;
				if (seen.has(key)) return;
				if (dragAnchor && this.isSameSelectionUnit(dragAnchor, element)) return;
				const isSelected = this.isElementShouldBeSelected(element);
				if (selecting === void 0) selecting = !isSelected;
				seen.set(key, element);
				dragAnchor ?? (dragAnchor = element);
				if (selecting && !isSelected || !selecting && isSelected) {
					const seenLength = seen.size;
					if (this.toggleByElement && checkBetween) {
						if (seenLength < 2) {
							if (findUpAsChild(element, firstTarget)) firstTarget = element;
						}
						const elementsBetween = this.getElementsBetween(firstTarget, element);
						if (elementsBetween.length) elementsBetween.forEach((element) => {
							processElement(element, false);
						});
					}
					if (!this.length()) {
						if (seenLength === 2 && this.toggleByElement) for (const element of seen.values()) this.toggleByElement(element, selecting);
					} else if (this.toggleByElement) this.toggleByElement(element, selecting);
				}
			};
			let canceledSelection = false, travelled = !this.dragThreshold;
			const onMouseMove = (e) => {
				if (!travelled) {
					if (Math.hypot(e.clientX - startX, e.clientY - startY) < this.dragThreshold) return;
					travelled = true;
				}
				if (!canceledSelection) {
					cancelSelection();
					canceledSelection = true;
					document.body.classList.add("no-select");
				}
				const element = this.getElementFromTarget(e.target);
				if (!element) return;
				if (this.verifyMouseMoveTarget && !this.verifyMouseMoveTarget(e, element, selecting)) {
					this.listenerSetter.removeManual(this.listenElement, "mousemove", onMouseMove);
					this.listenerSetter.removeManual(activeDocument, "mouseup", onMouseUp, documentListenerOptions);
					return;
				}
				processElement(element);
			};
			const onMouseUp = (e) => {
				document.body.classList.remove("no-select");
				if (seen.size) swallowNextClick(activeWindow);
				this.listenerSetter.removeManual(this.listenElement, "mousemove", onMouseMove);
				cancelSelection();
			};
			const documentListenerOptions = { once: true };
			this.listenerSetter.add(this.listenElement)("mousemove", onMouseMove);
			this.listenerSetter.add(activeDocument)("mouseup", onMouseUp, documentListenerOptions);
		};
		this.cancelSelection = (doNotAnimate) => {
			if (doNotAnimate) this.doNotAnimate = true;
			this.onCancelSelection?.();
			this.clearSelection();
			this.toggleSelection();
			cancelSelection();
			if (doNotAnimate) this.doNotAnimate = void 0;
		};
		safeAssign(this, options);
		this.navigationType = "multiselect-" + randomLong();
	}
	attachListeners(listenElement, listenerSetter) {
		if (this.listenElement) this.listenerSetter.removeAll();
		this.listenElement = listenElement;
		this.listenerSetter = listenerSetter;
		if (!listenElement) {
			if (this.navigationType) appNavigationController.removeByType(this.navigationType);
			return;
		}
		if (IS_TOUCH_SUPPORTED) {
			listenerSetter.add(listenElement)("touchend", () => {
				if (!this.isSelecting) return;
				this.selectedText = getSelectedText();
			});
			attachContextMenuListener({
				element: listenElement,
				callback: (e) => {
					if (this.holdOn(e.target)) cancelEvent(e);
				},
				listenerSetter
			});
			return;
		}
		listenerSetter.add(listenElement)("mousedown", this.onMouseDown);
	}
	/**
	* A finger held on `target` — the touch screen's long press, or one a widget's renderer gave the bubble at the
	* shared gesture policy's moment: the selection starts with its message, or toggles it. The finger is still down.
	* Returns what ends the hold (none: it selects nothing), for a press let go where this document does not see it (in a
	* widget's frame); one it sees ends it by itself.
	*/
	holdOn(target) {
		const listenElement = this.listenElement;
		if (!listenElement || this.isSelecting || target.closest("reaction-element") || this.verifyTouchLongPress && !this.verifyTouchLongPress(target)) return;
		this.onTouchLongPress?.();
		document.body.classList.add("no-select");
		const doc = listenElement.ownerDocument;
		const release = () => {
			document.body.classList.remove("no-select");
			listenElement.removeEventListener("touchend", onTouchEnd, { capture: true });
			listenElement.removeEventListener("touchcancel", release, { capture: true });
			doc.removeEventListener("pointerup", onPointerEnd, { capture: true });
			doc.removeEventListener("pointercancel", onPointerEnd, { capture: true });
		};
		const onTouchEnd = (e) => {
			cancelEvent(e);
			release();
		};
		const onPointerEnd = (e) => {
			if (e.pointerType !== "touch") release();
		};
		listenElement.addEventListener("touchend", onTouchEnd, { capture: true });
		listenElement.addEventListener("touchcancel", release, { capture: true });
		doc.addEventListener("pointerup", onPointerEnd, { capture: true });
		doc.addEventListener("pointercancel", onPointerEnd, { capture: true });
		if (IS_MOBILE_SAFARI && IS_STANDALONE) listenElement.addEventListener("mousedown", cancelEvent, {
			once: true,
			capture: true
		});
		cancelSelection();
		const element = this.getElementFromTarget(target);
		if (element) this.toggleByElement(element);
		return release;
	}
	/**
	* Whether `element` is a part of the same selectable unit the drag has started on, and so must not
	* count as another element of the range
	*/
	isSameSelectionUnit(anchor, element) {
		return false;
	}
	/**
	* What an element the drag runs over is held under, so it is passed over on the way back. One per
	* message here; a selection of something else (a chat list) answers in its own terms.
	*/
	getKeyFromElement(element) {
		const mid = +element.dataset.mid;
		if (!mid || !element.dataset.peerId) return;
		return makeFullMid(element.dataset.peerId.toPeerId(), mid);
	}
	/** What the element's checkbox is named after */
	getCheckboxName(element) {
		return element.dataset.mid;
	}
	/** Drops everything the selection holds, out of wherever it is held */
	clearSelection() {
		this.selectedMids.clear();
	}
	getElementsBetween(first, last) {
		if (first === last) return [];
		const firstRect = first.getBoundingClientRect();
		const lastRect = last.getBoundingClientRect();
		const isHigher = (firstRect.top - lastRect.top || (firstRect.left - lastRect.left) * (langPack_default.getIsRTL() ? -1 : 1)) < 0;
		const parent = findUpClassName(first, this.lookupBetweenParentClassName);
		if (!parent) return [];
		const elements = Array.from(parent.querySelectorAll(this.lookupBetweenElementsQuery));
		let firstIndex = elements.indexOf(first);
		let lastIndex = elements.indexOf(last);
		if (!isHigher) [lastIndex, firstIndex] = [firstIndex, lastIndex];
		return elements.slice(firstIndex + 1, lastIndex);
	}
	isElementShouldBeSelected(element) {
		return this.isMidSelected(element.dataset.peerId.toPeerId(), +element.dataset.mid);
	}
	appendCheckbox(element, checkboxField) {
		element.prepend(checkboxField.label);
	}
	toggleElementCheckbox(element, show) {
		const hasCheckbox = !!this.getCheckboxInputFromElement(element);
		if (show) {
			if (hasCheckbox) return false;
			const checkboxField = new CheckboxField({
				name: this.getCheckboxName(element),
				round: true
			});
			checkboxField.input.setAttribute("aria-label", element.getAttribute("aria-label") || element.textContent || langPack_default.format("Message.Context.Select", true));
			if (Modes.a11y && element.getAttribute("role") === "button") {
				this.selectionRoles.set(element, {
					role: "button",
					tabIndex: element.getAttribute("tabindex")
				});
				element.setAttribute("role", "group");
				element.removeAttribute("tabindex");
			}
			if (this.isSelecting) {
				if (this.isElementShouldBeSelected(element)) {
					checkboxField.input.checked = true;
					element.classList.add("is-selected");
				}
			}
			this.appendCheckbox(element, checkboxField);
		} else if (hasCheckbox) {
			this.getCheckboxInputFromElement(element).parentElement.remove();
			const previous = this.selectionRoles.get(element);
			if (previous) {
				element.setAttribute("role", previous.role);
				if (previous.tabIndex !== null) element.setAttribute("tabindex", previous.tabIndex);
				this.selectionRoles.delete(element);
			}
			this.toggleElementSelected(element, false);
		}
		return true;
	}
	getCheckboxInputFromElement(element) {
		const field = element.firstElementChild;
		const input = field?.firstElementChild;
		if (!field?.classList.contains("checkbox-field") || !input?.classList.contains("checkbox-field-input")) return;
		return input;
	}
	/**
	* Swallows a click the selection acts on. One on the element's own checkbox is not prevented: the
	* browser has ticked the box before the click is dispatched, and puts it back once a prevented
	* click is over - over the mark the selection has set by then. So the tick is undone here and the
	* click keeps its default, which leaves the box to the selection
	*/
	cancelElementClick(e, element, cancel = cancelEvent) {
		const input = element && this.getCheckboxInputFromElement(element);
		if (e.type !== "click" || !input || e.target !== input) {
			cancel(e);
			return;
		}
		input.checked = !input.checked;
		e.stopPropagation();
	}
	async updateContainer(forceSelection = false) {
		const managers = bindManagersToSession(this.managers);
		const size = this.selectedMids.size;
		if (!size && !forceSelection) return;
		let cantForward = !size;
		let cantDelete = !size;
		const cantSend = !size;
		for (const [peerId, mids] of this.selectedMids) {
			const storageKey = this.getStorageKey(peerId);
			const r = await managers.appMessagesManager.cantForwardDeleteMids(storageKey, Array.from(mids));
			cantForward || (cantForward = r.cantForward);
			cantDelete || (cantDelete = r.cantDelete);
			if (cantForward && cantDelete) break;
		}
		this.onUpdateContainer?.(cantForward, cantDelete, cantSend);
	}
	getStorageKey(peerId) {
		return `${peerId}_${this.isScheduled ? "scheduled" : "history"}`;
	}
	getSelectedMids() {
		return flatten([...this.selectedMids.values()].map((set) => [...set])).sort((a, b) => a - b);
	}
	getSelectedMessages() {
		const selectedMessagesPromises = [];
		this.selectedMids.forEach((mids, peerId) => {
			const storageKey = this.getStorageKey(peerId);
			const p = Array.from(mids).map((mid) => this.managers.appMessagesManager.getMessageFromStorage(storageKey, mid));
			selectedMessagesPromises.push(...p);
		});
		return Promise.all(selectedMessagesPromises);
	}
	toggleSelection(toggleCheckboxes = true, forceSelection = false) {
		const wasSelecting = this.isSelecting;
		const size = this.length();
		this.isSelecting = !!size || forceSelection;
		if (wasSelecting === this.isSelecting) return false;
		this.dispatchEvent("toggle", this.isSelecting);
		if (!IS_TOUCH_SUPPORTED) {
			this.listenElement.classList.toggle("no-select", this.isSelecting);
			if (wasSelecting) cancelSelection();
		}
		blurActiveElement();
		const forwards = !!size || forceSelection;
		const toggleResult = this.onToggleSelection?.(forwards, !this.doNotAnimate);
		if (!IS_MOBILE_SAFARI) {
			if (forwards) appNavigationController.pushItem({
				type: this.navigationType,
				onPop: () => {
					this.cancelSelection();
				}
			});
			else appNavigationController.removeByType(this.navigationType);
		}
		if (forceSelection) (toggleResult || Promise.resolve()).then(() => this.updateContainer(forceSelection));
		return true;
	}
	cleanup() {
		this.doNotAnimate = true;
		this.clearSelection();
		this.toggleSelection(false);
		this.doNotAnimate = void 0;
	}
	updateElementSelection(element, isSelected) {
		this.toggleElementCheckbox(element, true);
		const input = this.getCheckboxInputFromElement(element);
		input.checked = isSelected;
		this.toggleSelection();
		this.updateContainer();
		this.toggleElementSelected(element, isSelected);
	}
	/**
	* Marks an element as one of the selected ones, and fades that mark in and out. `SetTransition`
	* says so with `animating`/`forwards`/`backwards` ON THE ELEMENT ITSELF, so a list whose elements
	* already speak those classes - a chat row does, for its muted state and its badges - marks them
	* some other way instead of letting this replay what it finds.
	*/
	toggleElementSelected(element, isSelected) {
		SetTransition({
			element,
			className: "is-selected",
			forwards: isSelected,
			duration: 200
		});
	}
	isMidSelected(peerId, mid) {
		return !!this.selectedMids.get(peerId)?.has(mid);
	}
	length() {
		return accumulateMapSet(this.selectedMids);
	}
	toggleMid(peerId, mid, unselect) {
		let set = this.selectedMids.get(peerId);
		if (unselect || unselect === void 0 && set?.has(mid)) {
			if (set) {
				set.delete(mid);
				if (!set.size) this.selectedMids.delete(peerId);
			}
		} else {
			if (!set) {
				set = /* @__PURE__ */ new Set();
				this.selectedMids.set(peerId, set);
			}
			set.add(mid);
		}
		return true;
	}
	/**
	* ! Call this method only to handle deleted messages
	*/
	deleteSelectedMids(peerId, mids, batch) {
		const set = this.selectedMids.get(peerId);
		if (!set) return;
		mids.forEach((mid) => {
			set.delete(mid);
		});
		if (!set.size) this.selectedMids.delete(peerId);
		const after = () => {
			this.updateContainer();
			this.toggleSelection();
		};
		if (!batch) after();
		return after;
	}
};
var SearchSelection = class extends AppSelection {
	constructor(searchSuper, managers, listenerSetter) {
		super({
			managers,
			verifyTarget: (e, target) => !!target && this.isSelecting,
			getElementFromTarget: (target) => findUpClassName(target, "search-super-item"),
			targetLookupClassName: "search-super-item",
			lookupBetweenParentClassName: "tabs-tab",
			lookupBetweenElementsQuery: ".search-super-item"
		});
		this.searchSuper = searchSuper;
		this.toggleByElement = (element, selected) => {
			const mid = +element.dataset.mid;
			const peerId = element.dataset.peerId.toPeerId();
			const isSelected = this.isMidSelected(peerId, mid);
			if (selected !== void 0 && selected === isSelected) return;
			if (!this.toggleMid(peerId, mid)) return;
			this.updateElementSelection(element, this.isMidSelected(peerId, mid));
		};
		this.onUpdateContainer = (cantForward, cantDelete) => {
			const length = this.length();
			replaceContent(this.selectionCountEl, i18n("messages", [length]));
			this.selectionGotoBtn.classList.toggle("hide", length !== 1);
			this.selectionForwardBtn.classList.toggle("hide", cantForward);
			this.selectionDeleteBtn && this.selectionDeleteBtn.classList.toggle("hide", cantDelete);
		};
		this.onToggleSelection = (forwards, animate) => {
			SetTransition({
				element: this.searchSuper.navScrollableContainer,
				className: "is-selecting",
				forwards,
				duration: animate ? 200 : 0,
				onTransitionEnd: () => {
					if (!this.isSelecting) {
						this.containerListenerSetter?.removeAll();
						this.containerListenerSetter = null;
						this.selectionContainer.remove();
						this.selectionContainer = this.selectionForwardBtn = this.selectionDeleteBtn = null;
						this.selectedText = void 0;
					}
				}
			});
			SetTransition({
				element: this.searchSuper.container,
				className: "is-selecting",
				forwards,
				duration: 200
			});
			if (this.isSelecting) {
				if (!this.selectionContainer) {
					const BASE_CLASS = "search-super-selection";
					this.selectionContainer = document.createElement("div");
					this.selectionContainer.classList.add(BASE_CLASS + "-container");
					this.containerListenerSetter = new ListenerSetter();
					const btnCancel = ButtonIcon(`close ${BASE_CLASS}-cancel`, {
						noRipple: true,
						ariaLabel: "Cancel"
					});
					attachClickEvent(btnCancel, () => this.cancelSelection(), {
						listenerSetter: this.containerListenerSetter,
						once: true
					});
					this.selectionCountEl = document.createElement("div");
					this.selectionCountEl.classList.add(BASE_CLASS + "-count");
					const attachClickOptions = { listenerSetter: this.containerListenerSetter };
					this.selectionGotoBtn = ButtonIcon(`message ${BASE_CLASS}-goto`, { ariaLabel: "Message.Context.Goto" });
					attachClickEvent(this.selectionGotoBtn, () => {
						const peerId = [...this.selectedMids.keys()][0];
						const mid = [...this.selectedMids.get(peerId)][0];
						this.cancelSelection();
						hotReloadGuard.appImManager.setInnerPeer({
							peerId,
							lastMsgId: mid,
							threadId: this.searchSuper.mediaTab.type === "saved" ? this.searchSuper.searchContext.peerId : this.searchSuper.searchContext.threadId
						});
					}, attachClickOptions);
					this.selectionForwardBtn = ButtonIcon(`forward ${BASE_CLASS}-forward`, { ariaLabel: "Forward" });
					attachClickEvent(this.selectionForwardBtn, () => {
						const obj = {};
						for (const [fromPeerId, mids] of this.selectedMids) obj[fromPeerId] = Array.from(mids).sort((a, b) => a - b);
						hotReloadGuard.showForwardPopup(obj, () => {
							this.cancelSelection();
						});
					}, attachClickOptions);
					if (this.isPrivate) {
						this.selectionDeleteBtn = ButtonIcon(`delete danger ${BASE_CLASS}-delete`, { ariaLabel: "Delete" });
						attachClickEvent(this.selectionDeleteBtn, () => {
							const peerId = this.searchSuper.searchContext.peerId;
							showDeleteMessagesPopup(peerId, this.getSelectedMids(), ChatType.Chat, () => {
								this.cancelSelection();
							});
						}, attachClickOptions);
					}
					this.selectionContainer.append(...[
						btnCancel,
						this.selectionCountEl,
						this.selectionGotoBtn,
						this.selectionForwardBtn,
						this.selectionDeleteBtn
					].filter(Boolean));
					const transitionElement = this.selectionContainer;
					transitionElement.style.opacity = "0";
					this.searchSuper.navScrollableContainer.append(transitionElement);
					transitionElement.offsetLeft;
					transitionElement.style.opacity = "";
				}
			}
		};
		this.isPrivate = !searchSuper.showSender;
		!IS_TOUCH_SUPPORTED && this.attachListeners(searchSuper.container, listenerSetter);
	}
	toggleSelection(toggleCheckboxes = true, forceSelection = false) {
		const ret = super.toggleSelection(toggleCheckboxes, forceSelection);
		if (ret && toggleCheckboxes) Array.from(this.searchSuper.tabsContainer.querySelectorAll(".search-super-item")).forEach((element) => {
			this.toggleElementCheckbox(element, this.isSelecting);
		});
		return ret;
	}
};
var ChatSelection = class extends AppSelection {
	get isReportSelection() {
		return !!this.reportSelectionData;
	}
	constructor(chat, bubbles, input, managers) {
		super({
			managers,
			getElementFromTarget: getSelectionElementFromTarget,
			verifyTarget: (e, target) => {
				return !(!this.selectedMids.size && !e.target.classList.contains("bubble") && !e.target.classList.contains("document-selection") && target);
			},
			verifyMouseMoveTarget: (e, element, selecting) => {
				return !(e.target !== element && !e.target.classList.contains("document-selection") && selecting === void 0 && !this.selectedMids.size);
			},
			verifyTouchLongPress: (target) => !this.chat.input.recording && !isWidgetTarget(target),
			targetLookupClassName: "bubble",
			lookupBetweenParentClassName: "bubbles-inner",
			lookupBetweenElementsQuery: ".bubble:not(.is-multiple-documents), .grouped-item",
			onTouchLongPress: () => {
				const { replySwipeHandler } = this.chat.bubbles;
				replySwipeHandler?.reset();
			}
		});
		this.chat = chat;
		this.bubbles = bubbles;
		this.input = input;
		this.toggleByElement = (bubble, selected) => {
			if (!this.canSelectBubble(bubble)) return;
			const mid = +bubble.dataset.mid;
			const peerId = bubble.dataset.peerId.toPeerId();
			if (bubble.classList.contains("is-grouped")) {
				if (selected !== void 0 && setAlbumItemsSelection({
					album: bubble,
					selected,
					getGroupedItems: (album) => this.bubbles.getBubbleGroupedItems(album),
					setElementSelection: (element, selected) => this.toggleByElement(element, selected)
				})) return;
				if (!this.isGroupedBubbleSelected(bubble)) {
					const set = this.selectedMids.get(peerId);
					if (set) this.getMidsFromGroupContainer(bubble).forEach(({ mid }) => set.delete(mid));
				}
				this.bubbles.getBubbleGroupedItems(bubble).map((item) => this.toggleByElement(item));
				return;
			}
			const isSelected = this.isMidSelected(peerId, mid);
			if (selected !== void 0 && selected === isSelected) return;
			if (!this.toggleMid(peerId, mid)) return;
			this.refreshSelectionGroup();
			if (bubble.classList.contains("grouped-item")) {
				const groupContainer = findUpClassName(bubble, "bubble");
				const isGroupedSelected = this.isGroupedBubbleSelected(groupContainer);
				const isGroupedMidsSelected = this.isGroupedMidsSelected(groupContainer);
				if (isGroupedMidsSelected || isGroupedSelected) this.updateElementSelection(groupContainer, isGroupedMidsSelected);
			}
			this.updateElementSelection(bubble, this.isMidSelected(peerId, mid));
		};
		this.onToggleSelection = async (forwards, animate) => {
			if (forwards) this.chat.themeChooser?.close();
			await this.chat.input.center(animate);
			SetTransition({
				element: this.input.chatInput,
				className: "is-selecting",
				forwards,
				duration: animate ? 200 : 0
			});
			SetTransition({
				element: this.listenElement,
				className: "is-selecting",
				forwards,
				duration: animate ? 200 : 0,
				onTransitionEnd: () => {
					if (!this.isSelecting) {
						this.removeSelectionContainer();
						this.selectedText = void 0;
					}
				}
			});
			if (this.isSelecting && this.selectionContainer && this.selectionContainerForReport !== !!this.isReportSelection) this.removeSelectionContainer();
			if (this.isSelecting && !this.selectionContainer) {
				this.selectionContainerForReport = !!this.isReportSelection;
				this.selectionInputWrapper = document.createElement("div");
				this.selectionInputWrapper.classList.add("chat-input-wrapper", "selection-wrapper");
				this.containerListenerSetter = new ListenerSetter();
				const attachClickOptions = { listenerSetter: this.containerListenerSetter };
				this.selectionCountEl = document.createElement("div");
				this.selectionCountEl.classList.add("selection-container-count");
				if (this.isReportSelection) {
					const cancelBtn = ButtonIcon("close selection-container-close", { ariaLabel: "Cancel" });
					attachClickEvent(cancelBtn, () => this.cancelSelection(), attachClickOptions);
					this.selectionReportBtn = Button("btn-primary btn-transparent text-bold chat-input-plate-button selection-container-report");
					this.selectionReportBtn.append(this.selectionCountEl);
					attachClickEvent(this.selectionReportBtn, () => {
						const mids = this.getSelectedMids();
						const data = this.reportSelectionData;
						if (!mids.length || !data) return;
						showSelectedMessagesReport(this.chat.peerId, mids, data.option, data.text, () => {
							this.cancelSelection();
						});
					}, attachClickOptions);
					this.selectionContainer = ChatInputPlate({
						class: "selection-container",
						left: cancelBtn,
						center: this.selectionReportBtn
					});
				} else {
					const countButton = Button("btn-primary btn-transparent text-bold chat-input-plate-button");
					countButton.append(this.selectionCountEl);
					attachClickEvent(countButton, () => this.cancelSelection(), attachClickOptions);
					this.selectionDeleteBtn = ButtonIcon("delete danger selection-container-delete", { ariaLabel: "Delete" });
					attachClickEvent(this.selectionDeleteBtn, () => {
						showDeleteMessagesPopup(this.chat.peerId, this.getSelectedMids(), this.chat.type, () => {
							this.cancelSelection();
						});
					}, attachClickOptions);
					let rightButton;
					if (this.chat.type === ChatType.Scheduled) {
						rightButton = this.selectionSendNowBtn = ButtonIcon("send2 selection-container-send", { ariaLabel: "MessageScheduleSend" });
						attachClickEvent(this.selectionSendNowBtn, () => {
							showSendNowPopup(this.chat.peerId, [...this.selectedMids.get(this.chat.peerId)], () => {
								this.cancelSelection();
							});
						}, attachClickOptions);
					} else {
						rightButton = this.selectionForwardBtn = ButtonIcon("forward selection-container-forward", { ariaLabel: "Forward" });
						attachClickEvent(this.selectionForwardBtn, () => {
							const obj = {};
							for (const [fromPeerId, mids] of this.selectedMids) obj[fromPeerId] = Array.from(mids).sort((a, b) => a - b);
							hotReloadGuard.showForwardPopup(obj, () => {
								this.cancelSelection();
							});
						}, attachClickOptions);
					}
					this.selectionContainer = ChatInputPlate({
						class: "selection-container",
						left: this.selectionDeleteBtn,
						center: countButton,
						right: rightButton
					});
				}
				this.selectionInputWrapper.style.opacity = "0";
				this.selectionInputWrapper.append(this.selectionContainer);
				this.input.inputContainer.append(this.selectionInputWrapper);
				this.selectionInputWrapper.offsetLeft;
				this.selectionInputWrapper.style.opacity = "";
			}
		};
		this.onUpdateContainer = (cantForward, cantDelete, cantSend) => {
			if (!this.selectionCountEl) return;
			const length = this.length();
			if (this.selectionContainerForReport) replaceContent(this.selectionCountEl, length ? i18n("Report2MessagesCount", [length]) : i18n("Chat.Menu.SelectMessages"));
			else replaceContent(this.selectionCountEl, i18n("messages", [length]));
			this.selectionSendNowBtn?.toggleAttribute("disabled", cantSend);
			this.selectionForwardBtn?.toggleAttribute("disabled", cantForward);
			this.selectionDeleteBtn?.toggleAttribute("disabled", cantDelete);
			this.selectionReportBtn?.toggleAttribute("disabled", !length);
		};
		this.onCancelSelection = async () => {
			this.reportSelectionData = void 0;
		};
	}
	isSameSelectionUnit(anchor, element) {
		return isSameGroupedSelectionUnit(anchor, element);
	}
	getElementsBetween(first, last) {
		const elements = super.getElementsBetween(first, last);
		if (first === last) return elements;
		return expandAlbumSelectionRange({
			first,
			last,
			elements,
			getGroupedItems: (bubble) => this.bubbles.getBubbleGroupedItems(bubble)
		});
	}
	appendCheckbox(bubble, checkboxField) {
		checkboxField.label.classList.add("bubble-select-checkbox");
		if (bubble.classList.contains("document-container")) bubble.querySelector(".document, .audio").append(checkboxField.label);
		else super.appendCheckbox(bubble, checkboxField);
	}
	enterReportSelection(data) {
		if (this.isSelecting) this.cancelSelection(true);
		this.reportSelectionData = data;
		if (!this.toggleSelection(true, true)) Promise.resolve(this.onToggleSelection(true, !this.doNotAnimate)).then(() => this.updateContainer(true));
	}
	cleanup() {
		this.reportSelectionData = void 0;
		super.cleanup();
	}
	async updateContainer(forceSelection = false) {
		if (this.isReportSelection) {
			this.onUpdateContainer(true, true, true);
			return;
		}
		return super.updateContainer(forceSelection);
	}
	toggleSelection(toggleCheckboxes = true, forceSelection = false) {
		const ret = super.toggleSelection(toggleCheckboxes, forceSelection || this.isReportSelection);
		if (ret && !this.isSelecting) {
			this.reportSelectionData = void 0;
			this.refreshSelectionGroup();
		}
		if (ret && toggleCheckboxes) {
			const history = this.bubbles.getRenderedHistory("asc");
			for (const fullMid of history) {
				if (this.bubbles.skippedMids.has(fullMid)) continue;
				const bubble = this.bubbles.getBubble(fullMid);
				this.toggleElementCheckbox(bubble, this.isSelecting);
			}
		}
		return ret;
	}
	toggleElementCheckbox(bubble, show) {
		if (show && !this.canSelectBubble(bubble)) return;
		const ret = super.toggleElementCheckbox(bubble, show);
		if (ret) {
			if (bubble.classList.contains("is-grouped")) this.bubbles.getBubbleGroupedItems(bubble).forEach((item) => this.toggleElementCheckbox(item, show));
		}
		return ret;
	}
	isElementShouldBeSelected(element) {
		const isGrouped = element.classList.contains("is-grouped");
		return super.isElementShouldBeSelected(element) && (!isGrouped || this.isGroupedMidsSelected(element));
	}
	isGroupedBubbleSelected(bubble) {
		return this.getCheckboxInputFromElement(bubble)?.checked;
	}
	getMidsFromGroupContainer(groupContainer) {
		const elements = this.chat.bubbles.getBubbleGroupedItems(groupContainer);
		if (!elements.length) elements.push(groupContainer);
		return elements.map((element) => {
			return {
				mid: +element.dataset.mid,
				peerId: element.dataset.peerId.toPeerId()
			};
		});
	}
	isGroupedMidsSelected(groupContainer) {
		const mids = this.getMidsFromGroupContainer(groupContainer);
		const selectedMids = mids.filter(({ peerId, mid }) => this.isMidSelected(peerId, mid));
		return mids.length === selectedMids.length;
	}
	getCheckboxInputFromElement(bubble) {
		return bubble.classList.contains("document-container") ? bubble.querySelector(".bubble-select-checkbox > .checkbox-field-input") : super.getCheckboxInputFromElement(bubble);
	}
	canSelectBubble(bubble) {
		return bubble && !bubble.classList.contains("is-date") && this.chat.type !== ChatType.Logs && this.chat.type !== ChatType.Welcome && !(this.isReportSelection && bubble.classList.contains("service")) && !bubble.classList.contains("is-outgoing") && !bubble.classList.contains("is-error") && !bubble.classList.contains("bubble-first") && !bubble.classList.contains("avoid-selection") && isSameMessageSelectionGroup(this.selectedMids, bubble.classList.contains("is-ephemeral"));
	}
	refreshSelectionGroup() {
		const isEphemeral = getMessageSelectionGroup(this.selectedMids);
		const groups = /* @__PURE__ */ new Map();
		const history = this.bubbles.getRenderedHistory("asc");
		for (const fullMid of history) {
			if (this.bubbles.skippedMids.has(fullMid)) continue;
			const bubble = this.bubbles.getBubble(fullMid);
			if (!bubble) continue;
			const isCompatible = isEphemeral === void 0 || isEphemeral === bubble.classList.contains("is-ephemeral");
			bubble.classList.toggle("selection-group-incompatible", !isCompatible);
			if (this.isSelecting) this.toggleElementCheckbox(bubble, isCompatible);
			const group = findUpClassName(bubble, "bubbles-group");
			if (group) groups.set(group, !!groups.get(group) || isCompatible);
		}
		for (const [group, hasCompatibleBubble] of groups) group.classList.toggle("selection-group-incompatible", !hasCompatibleBubble);
	}
	removeSelectionContainer() {
		this.containerListenerSetter?.removeAll();
		this.containerListenerSetter = null;
		this.selectionInputWrapper.remove();
		this.selectionInputWrapper = this.selectionContainer = this.selectionCountEl = this.selectionSendNowBtn = this.selectionForwardBtn = this.selectionDeleteBtn = this.selectionReportBtn = null;
		this.selectionContainerForReport = void 0;
	}
};
//#endregion
export { ChatSelection as n, SearchSelection as r, AppSelection as t };
