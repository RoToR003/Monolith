//# allFunctionsCalledOnLoad
import { a as i18n } from "./langPack-BmdJGr44.js";
import { C as createSignal, _ as createMemo, p as createComponent, s as Show, x as createRoot } from "./solid-9Vxm0VIz.js";
import { n as deferredPromise } from "./cancellablePromise-bof--dnO.js";
import { c as insert, g as template, r as addEventListener, s as delegateEvents } from "./web-BPyQozky.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { t as liteMode } from "./liteMode-DeLStZfQ.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
import { t as Scrollable } from "./scrollable2-Bau9Hoih.js";
import { c as getAnimatedOptions, o as CROSS_FADE_KEYFRAMES } from "./animations-DCmLIda3.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { o as reapplyTextHighlights } from "./textHighlight-BHWnL6Fg.js";
//#region src/components/searchGroup.tsx
var _tmpl$ = /*#__PURE__*/ template(`<span class="cursor-pointer hover-underline">`);
/**
* How long a group takes to go from one query's results to the next one's: a fade and the height it
* follows, quicker with reduced animations, where a fade stands alone
*/
function getSearchTransitionDuration() {
	return liteMode.getAnimationLevel() === 2 ? 250 : 180;
}
/** Ends the rows a group showed, the dialog elements' own parts with them */
function destroySearchRows(rows) {
	rows.forEach((row) => {
		const dialogElement = row.dialogElement;
		if (dialogElement) dialogElement.remove();
		else row.remove();
	});
}
/**
* Puts what the groups were given aside (`startDraft`) in place of what they show. Done for all of
* them at once, so the reads of every group come before the writes of any: one layout for the lot.
* Animated, a group that comes grows in (`fadeOnly`: fades in, when nothing was shown before), one that
* goes shrinks away, and one that stays crossfades its rows while its height follows them
*/
function commitSearchGroups(groups, options) {
	const commits = groups.map((group) => group.commitDraft(options)).filter(Boolean);
	commits.forEach((commit) => commit.measure());
	commits.forEach((commit) => commit.apply());
	commits.forEach((commit) => commit.measureApplied());
	commits.forEach((commit) => commit.play());
	return Promise.all(commits.map((commit) => commit.finished)).then(() => {});
}
function createSearchGroup(options) {
	const { name, type, clearable = true, className, clickable = true, autonomous = true, onFound, noIcons, middleware, scrollableX } = options;
	const NameRight = (props) => {
		return (() => {
			var _el$ = _tmpl$();
			addEventListener(_el$, "click", props.onClick, true);
			insert(_el$, () => props.children);
			return _el$;
		})();
	};
	const [hide, setHide] = createSignal(true);
	const [showingMore, setShowingMore] = createSignal(false);
	const [showMoreClassName, setShowMoreClassName] = createSignal();
	const [_nameRight, setNameRight] = createSignal();
	const nameRight = createMemo(() => {
		const _ = _nameRight();
		if (_) return NameRight(_);
		if (!showMoreClassName()) return;
		return createComponent(NameRight, {
			onClick: () => {
				setShowingMore((v) => !v);
			},
			get children() {
				return i18n(showingMore() ? "Separator.ShowLess" : "Separator.ShowMore");
			}
		});
	});
	const list = hotReloadGuard.appDialogsManager.createChatList();
	let container;
	let nameEl;
	let placeholder;
	let draft;
	let finishTransition;
	createRoot((dispose) => {
		createComponent(Section, {
			name,
			nameRef: (ref) => nameEl = ref,
			get nameRight() {
				return nameRight();
			},
			get ["class"]() {
				return classNames("search-group", "search-group-" + type, className, hide() && "hide", showMoreClassName() && !showingMore() && showMoreClassName(), scrollableX && "search-group-with-scroll");
			},
			ref: (ref) => container = ref,
			innerClass: "search-group-inner",
			contentProps: { class: "search-group-content" },
			get children() {
				return createComponent(Show, {
					when: scrollableX,
					fallback: list,
					get children() {
						return createComponent(Scrollable, {
							"class": "search-group-scrollable-x",
							axis: "x",
							children: list
						});
					}
				});
			}
		});
		middleware?.onClean(dispose);
	});
	if (clickable) hotReloadGuard.appDialogsManager.setListClickListener({
		list,
		onFound,
		withContext: void 0,
		autonomous
	});
	const setShowMore = (toggleClassName) => {
		if (showMoreClassName() !== toggleClassName) setShowingMore(false);
		setShowMoreClassName(toggleClassName);
	};
	const discardDraft = () => {
		if (!draft) return;
		destroySearchRows(Array.from(draft.list.children));
		draft = void 0;
	};
	const commitDraft = ({ animate, fadeOnly }) => {
		const _draft = draft;
		if (!_draft) return;
		draft = void 0;
		finishTransition?.();
		const { merge } = _draft;
		const wasShown = !hide();
		const willShow = merge ? wasShown || _draft.active : _draft.active;
		const oldRows = merge ? [] : Array.from(list.children);
		const newRows = Array.from(_draft.list.children);
		const hasRows = newRows.length || merge && list.childElementCount;
		const oldPlaceholder = placeholder;
		let newPlaceholder = merge ? hasRows ? void 0 : _draft.placeholder || oldPlaceholder : _draft.placeholder;
		if (isSamePlaceholder(oldPlaceholder, newPlaceholder)) newPlaceholder = oldPlaceholder;
		const leavingPlaceholder = oldPlaceholder !== newPlaceholder ? oldPlaceholder : void 0;
		const applyRows = () => {
			if (merge) {
				list.prepend(...newRows.filter((row) => row.dataset.sponsored));
				list.append(...newRows.filter((row) => !row.dataset.sponsored));
			} else list.append(...newRows);
			reapplyTextHighlights(container);
		};
		const applyRest = () => {
			if (newPlaceholder && newPlaceholder !== oldPlaceholder) container.append(newPlaceholder);
			placeholder = newPlaceholder;
			if (!merge || _draft.showMoreClassName) setShowMore(_draft.showMoreClassName);
			setHide(!willShow);
		};
		if (!animate || !container.isConnected || !wasShown && !willShow) return {
			measure: () => {},
			apply: () => {
				destroySearchRows(oldRows);
				leavingPlaceholder?.remove();
				applyRows();
				applyRest();
			},
			measureApplied: () => {},
			play: () => {},
			finished: Promise.resolve()
		};
		const animations = [];
		const finished = deferredPromise();
		const options = getAnimatedOptions(getSearchTransitionDuration());
		let fromHeight, toHeight, padding;
		let listRect;
		let placeholderTop;
		let leavingRows;
		const cleanupStyles = () => {
			container.style.removeProperty("overflow");
			if (leavingPlaceholder) {
				leavingPlaceholder.remove();
				leavingPlaceholder.style.removeProperty("position");
				leavingPlaceholder.style.removeProperty("top");
				leavingPlaceholder.style.removeProperty("inset-inline");
			}
			if (leavingRows) {
				destroySearchRows(Array.from(leavingRows.children));
				leavingRows.remove();
				leavingRows = void 0;
			}
		};
		const finish = finishTransition = () => {
			finishTransition = void 0;
			animations.forEach((animation) => animation.cancel());
			animations.length = 0;
			if (!willShow) {
				destroySearchRows(oldRows);
				applyRows();
				applyRest();
			}
			cleanupStyles();
			finished.resolve();
		};
		const lastAnimation = () => animations[animations.length - 1];
		const onFinished = () => {
			lastAnimation()?.finished.then(() => {
				if (finishTransition === finish) finish();
			}, () => {});
		};
		if (!wasShown) return {
			measure: () => {
				padding = getVerticalPadding(container);
			},
			apply: () => {
				destroySearchRows(oldRows);
				applyRows();
				applyRest();
			},
			measureApplied: () => {
				toHeight = container.offsetHeight;
			},
			play: () => {
				container.style.overflow = "hidden";
				animations.push(container.animate(fadeOnly ? CROSS_FADE_KEYFRAMES : growFromNothingKeyframes(toHeight, padding), options));
				onFinished();
			},
			finished
		};
		if (!willShow) return {
			measure: () => {
				padding = getVerticalPadding(container);
				fromHeight = container.offsetHeight;
			},
			apply: () => {},
			measureApplied: () => {},
			play: () => {
				container.style.overflow = "hidden";
				animations.push(container.animate(growFromNothingKeyframes(fromHeight, padding).reverse(), {
					...options,
					fill: "forwards"
				}));
				onFinished();
			},
			finished
		};
		return {
			measure: () => {
				fromHeight = container.offsetHeight;
				if (oldRows.length) {
					const parentRect = list.parentElement.getBoundingClientRect();
					const rect = list.getBoundingClientRect();
					listRect = {
						top: rect.top - parentRect.top,
						left: rect.left - parentRect.left,
						width: rect.width,
						height: rect.height
					};
				}
				if (leavingPlaceholder) placeholderTop = leavingPlaceholder.getBoundingClientRect().top - container.getBoundingClientRect().top;
			},
			apply: () => {
				if (oldRows.length) {
					leavingRows = list.cloneNode(false);
					leavingRows.removeAttribute("id");
					leavingRows.classList.add("search-group-leaving");
					leavingRows.setAttribute("aria-hidden", "true");
					leavingRows.inert = true;
					leavingRows.style.top = listRect.top + "px";
					leavingRows.style.left = listRect.left + "px";
					leavingRows.style.width = listRect.width + "px";
					leavingRows.style.height = listRect.height + "px";
					leavingRows.append(...oldRows);
					list.after(leavingRows);
				}
				if (leavingPlaceholder) {
					leavingPlaceholder.style.position = "absolute";
					leavingPlaceholder.style.top = placeholderTop + "px";
					leavingPlaceholder.style.insetInline = "0";
				}
				applyRows();
				applyRest();
			},
			measureApplied: () => {
				toHeight = container.offsetHeight;
			},
			play: () => {
				container.style.overflow = "hidden";
				const fadeOut = CROSS_FADE_KEYFRAMES.slice().reverse();
				if (Math.abs(toHeight - fromHeight) > .5) animations.push(container.animate([{ height: fromHeight + "px" }, { height: toHeight + "px" }], options));
				if (leavingRows) animations.push(leavingRows.animate(fadeOut, {
					...options,
					fill: "forwards"
				}));
				if (leavingPlaceholder) animations.push(leavingPlaceholder.animate(fadeOut, {
					...options,
					fill: "forwards"
				}));
				if (merge) newRows.forEach((row) => animations.push(row.animate(CROSS_FADE_KEYFRAMES, options)));
				else if (newRows.length) animations.push(list.animate(CROSS_FADE_KEYFRAMES, options));
				if (newPlaceholder && newPlaceholder !== oldPlaceholder) animations.push(newPlaceholder.animate(CROSS_FADE_KEYFRAMES, options));
				if (animations.length) onFinished();
				else finish();
			},
			finished
		};
	};
	const group = {
		container,
		/** where the rows go: the draft's list while there is one */
		get list() {
			return draft ? draft.list : list;
		},
		nameEl,
		autonomous,
		noIcons,
		createPlaceholder: void 0,
		get placeholder() {
			return draft ? draft.placeholder : placeholder;
		},
		get isDrafting() {
			return !!draft;
		},
		/** what is on screen, a draft aside */
		get isShown() {
			return !hide();
		},
		/** whether it is to be on screen once its draft is committed */
		get willShow() {
			if (!draft) return !hide();
			return draft.merge ? !hide() || draft.active : draft.active;
		},
		/**
		* A look-alike of the group as it is shown, holding its rows - moved, not copied - to be laid over
		* the tab while it crossfades as a whole. Its notice goes too, unless the draft's is the same one
		* and stays (`commitDraft`). A custom element of the title (a menu) is left out: one made again
		* would start over
		*/
		ghost() {
			finishTransition?.();
			const keepPlaceholder = isSamePlaceholder(placeholder, draft?.placeholder);
			const ghostOf = (element) => {
				if (element === list) {
					const clone = element.cloneNode(false);
					clone.append(...Array.from(element.childNodes));
					return clone;
				}
				if (!element.contains(list)) {
					const clone = element.cloneNode(true);
					clone.querySelectorAll("*").forEach((child) => {
						if (child.tagName.includes("-")) child.remove();
					});
					return clone;
				}
				const clone = element.cloneNode(false);
				Array.from(element.children).forEach((child) => {
					if (child !== placeholder) clone.append(ghostOf(child));
				});
				return clone;
			};
			const clone = ghostOf(container);
			clone.removeAttribute("id");
			if (placeholder && !keepPlaceholder) {
				clone.append(placeholder);
				placeholder = void 0;
			}
			return clone;
		},
		addPlaceholder(el) {
			group.removePlaceholder();
			if (draft) {
				draft.placeholder = el;
				return;
			}
			placeholder = el;
			container.append(el);
		},
		removePlaceholder() {
			if (draft) {
				draft.placeholder = void 0;
				return;
			}
			placeholder?.remove();
			placeholder = void 0;
		},
		clear() {
			if (draft) {
				destroySearchRows(Array.from(draft.list.children));
				draft.active = false;
				draft.placeholder = void 0;
				return;
			}
			finishTransition?.();
			setHide(true);
			group.removePlaceholder();
			if (clearable) destroySearchRows(Array.from(list.children));
		},
		setActive() {
			if (draft) {
				draft.active = true;
				return;
			}
			setHide(false);
		},
		toggle() {
			if (group.list.childElementCount) group.setActive();
			else if (draft?.merge) {} else group.clear();
		},
		needShowMoreButton(toggleClassName = "is-short-5") {
			if (draft) {
				draft.showMoreClassName = toggleClassName;
				return;
			}
			setShowMoreClassName(toggleClassName);
		},
		/**
		* From now on the group gets the rows of a new query aside, out of the document, while it goes on
		* showing what it has until `commitSearchGroups` - from scratch, or to add them to what it shows
		* (`merge`). A draft under way is dropped
		*/
		startDraft(merge) {
			discardDraft();
			const draftList = list.cloneNode(false);
			draftList.removeAttribute("id");
			draft = {
				list: draftList,
				active: false,
				merge
			};
		},
		discardDraft,
		commitDraft,
		setNameRight
	};
	return group;
}
/** Two notices of nothing found that say the same (`dataset.key`): the one on screen stays for the other */
function isSamePlaceholder(shown, next) {
	return !!shown && !!next && shown !== next && !!next.dataset.key && next.dataset.key === shown.dataset.key;
}
/** The padding the box of `element` cannot shrink past, which a negative margin takes back while it grows */
function getVerticalPadding(element) {
	const style = getComputedStyle(element);
	return parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
}
/** From nothing to `height`: the margin takes back the padding a box of no height still has */
function growFromNothingKeyframes(height, padding) {
	return [{
		height: "0px",
		marginBottom: -padding + "px",
		opacity: 0
	}, {
		height: height + "px",
		marginBottom: "0px",
		opacity: 1
	}];
}
delegateEvents(["click"]);
//#endregion
export { getSearchTransitionDuration as i, createSearchGroup as n, destroySearchRows as r, commitSearchGroups as t };
