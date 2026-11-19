//# allFunctionsCalledOnLoad
import { s as IS_MOBILE } from "./userAgent-ByGXcznk.js";
import { n as appNavigationController } from "./appNavigationController-Ct0fx8yF.js";
import { t as noop } from "./noop-H9NNBLfX.js";
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { n as logger, t as LogTypes } from "./logger-7zf0rNYS.js";
import { a as i18n, u as langPack_default } from "./langPack-BmdJGr44.js";
import { C as createSignal, M as onCleanup, N as onMount, S as createSelector, _ as createMemo, g as createEffect, i as For, m as createComputed, p as createComponent, s as Show, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { n as bindManagersToSession } from "./bindManagersToAccount-BL82O9H9.js";
import { o as unwrap } from "./store-PwRn5fa3.js";
import { _ as use, a as classList, c as insert, f as setAttribute, g as template, o as className, r as addEventListener, s as delegateEvents } from "./web-BPyQozky.js";
import { t as IconTsx } from "./iconTsx-B4lOk4A6.js";
import { t as Scrollable$1 } from "./scrollable2-Bau9Hoih.js";
import { t as CLICK_EVENT_NAME } from "./clickEvent-COk4YpLP.js";
import { o as createMiddleware } from "./sticker-5twBOy1Y.js";
import { t as defineSolidElement } from "./defineSolidElement-DU5LO9SF.js";
import { t as Transition } from "./transition-Cmlc134D.js";
import { S as ButtonMenuItem, Tn as getInlineArrowKeys, wn as contextMenuController } from "./confirmationPopup-Bz6mK0o-.js";
import { gn as isDialog } from "./getChatMigratedTo-ChhMNXuu.js";
import { U as getPeerId } from "./canPollPeerStories-D3HoBvLX.js";
import { en as getIconForFilter, rn as extractEmojiFromFilterTitle, tn as FolderAnimatedIcon } from "./appDialogsManager-CXguiKc3.js";
import { j as showTooltip } from "./openEditors-7FmA7q_V.js";
import { t as wrapFolderTitle } from "./folderTitle-Bk4Q-S9l.js";
import { t as isRTL } from "./isRTL-DBt4_PcD.js";
//#region src/components/addToFolderDropdownMenu/kindaFuzzyFinder.ts
function kindaFuzzyFinder(str, toFind) {
	return kindaFuzzyFinderImpl(str.toLowerCase(), toFind.toLowerCase(), toFind.length);
}
function kindaFuzzyFinderImpl(str, toFind, fm) {
	let bestIndicies = [], bestScore = 0;
	const n = str.length;
	const m = toFind.length;
	for (let j = 0; j < m; j++) for (let i = 0; i < n; i++) {
		if (str[i] !== toFind[j]) continue;
		const { found } = kindaFuzzyFinderImpl(str.slice(i + 1), toFind.slice(j + 1), fm);
		const newIndicies = [i, ...found.map((fi) => fi + i + 1)];
		const s = score(str, toFind, newIndicies, fm, true) - punishments.missing(fm) * j;
		if (s > bestScore) {
			bestScore = s;
			bestIndicies = newIndicies;
		}
	}
	return {
		found: bestIndicies,
		score: score(str, toFind, bestIndicies, fm, true)
	};
}
var punishments = {
	missing: (length) => 1 / length,
	gap: (length, gap) => .25 / length * gap
};
function score(str, toFind, indicies, fm, punishLastMissing) {
	const n = str.length, m = toFind.length, k = indicies.length;
	if (!k) return 0;
	let result = 1;
	let fi = 0, prevsi = -1;
	for (let i = 0; i < k && fi < m; i++) {
		const si = indicies[i];
		if (!(si < n)) break;
		while (str[si] !== toFind[fi] && fi < m) {
			fi++;
			result -= punishments.missing(fm);
		}
		fi++;
		if (prevsi != -1 && si - prevsi > 1) result -= punishments.gap(m, si - prevsi - 1);
		prevsi = si;
	}
	if (punishLastMissing) result -= (fm - fi) * punishments.missing(fm);
	return result;
}
var styles_module_default = {
	Container: "_Container_1j19f_1",
	withScrollable: "_withScrollable_1j19f_5",
	Scrollable: "_Scrollable_1j19f_10",
	ScrollableContainer: "_ScrollableContainer_1j19f_19",
	mobile: "_mobile_1j19f_25",
	Label: "_Label_1j19f_29",
	LabelText: "_LabelText_1j19f_40",
	Input: "_Input_1j19f_48",
	EmptySearchTip: "_EmptySearchTip_1j19f_59",
	Char: "_Char_1j19f_71",
	single: "_single_1j19f_79",
	middle: "_middle_1j19f_83",
	start: "_start_1j19f_87",
	end: "_end_1j19f_94",
	Hidden: "_Hidden_1j19f_102",
	Item: "_Item_1j19f_106",
	selected: "_selected_1j19f_106",
	ItemLabel: "_ItemLabel_1j19f_109",
	ItemLabelText: "_ItemLabelText_1j19f_116",
	ItemLabelEnter: "_ItemLabelEnter_1j19f_119",
	ItemIcon: "_ItemIcon_1j19f_122",
	ItemIconCheck: "_ItemIconCheck_1j19f_125"
};
//#endregion
//#region src/components/addToFolderDropdownMenu/utils.ts
var log = logger("AddToFolderDropdownMenu", LogTypes.Debug);
async function fetchDialogFilters() {
	return (await rootScope.managers.filtersStorage.getDialogFilters()).filter((filter) => filter.id !== 1 && filter.id !== 0).sort((a, b) => {
		if (!a.id || !b.id) return 0;
		return a?.localId - b?.localId;
	});
}
var p = (p) => Math.abs(p);
async function addToFilter(filter, peerId) {
	const managers = bindManagersToSession(rootScope.managers);
	log.debug("addToFilter before", filter);
	filter = { ...filter };
	if (filter._ === "dialogFilter") {
		filter.excludePeerIds = filter.excludePeerIds?.filter((excludedPeerId) => p(excludedPeerId) !== p(peerId));
		filter.exclude_peers = filter.exclude_peers?.filter((inputPeer) => p(getPeerId(inputPeer)) !== p(peerId));
	}
	if (!filter.pinnedPeerIds.find((pinnedPeerId) => p(pinnedPeerId) === p(peerId))) {
		filter.includePeerIds = [...(filter.includePeerIds || []).filter((includedPeerId) => p(includedPeerId) !== p(peerId)), peerId];
		filter.include_peers = [...(filter.include_peers || []).filter((inputPeer) => p(getPeerId(inputPeer)) !== p(peerId)), await managers.appPeersManager.getInputPeerById(peerId)];
	}
	log.debug("addToFilter after", filter);
	await managers.filtersStorage.updateDialogFilter(filter);
}
async function removeFromFilter(filter, peerId) {
	const managers = bindManagersToSession(rootScope.managers);
	log.debug("removeFromFilter before", filter);
	filter = { ...filter };
	filter.includePeerIds = filter.includePeerIds?.filter((includedPeerId) => p(peerId) !== p(includedPeerId));
	filter.include_peers = filter.include_peers?.filter((inputPeer) => p(getPeerId(inputPeer)) !== p(peerId));
	filter.pinnedPeerIds = filter.pinnedPeerIds?.filter((pinnedPeerId) => p(peerId) !== p(pinnedPeerId));
	filter.pinned_peers = filter.pinned_peers?.filter((inputPeer) => p(getPeerId(inputPeer)) !== p(peerId));
	if (filter._ === "dialogFilter") {
		filter.excludePeerIds = [...(filter.excludePeerIds || []).filter((excludedPeerId) => p(excludedPeerId) !== p(peerId)), peerId];
		filter.exclude_peers = [...(filter.exclude_peers || []).filter((inputPeer) => p(getPeerId(inputPeer)) !== p(peerId)), await managers.appPeersManager.getInputPeerById(peerId)];
	}
	log.debug("removeFromFilter after", filter);
	await managers.filtersStorage.updateDialogFilter(filter);
}
function wrapFolderTitleInSpan(title, middleware) {
	const span = document.createElement("span");
	const fragment = wrapFolderTitle(title, middleware, true);
	span.append(fragment);
	const rtl = isRTL(span.textContent);
	span.dir = rtl ? "rtl" : "ltr";
	span.querySelector("custom-emoji-renderer-element")?.setTextColor("primary-text-color");
	const treeWalker = document.createTreeWalker(span, NodeFilter.SHOW_TEXT);
	const nodes = [];
	const charSpansGroups = [];
	while (treeWalker.nextNode()) nodes.push(treeWalker.currentNode);
	for (const node of nodes) {
		const fragment = document.createDocumentFragment();
		const charSpans = node.nodeValue.split("").map((char) => {
			const charSpan = document.createElement("span");
			charSpan.innerText = char;
			return charSpan;
		});
		charSpansGroups.push(charSpans);
		fragment.append(...charSpans);
		node.parentNode.replaceChild(fragment, node);
	}
	return {
		span,
		charSpansGroups,
		rtl
	};
}
/** `rtl` - the title runs right to left, so a run of characters begins at its right end */
function highlightTextNodes(nodeGroups, indicies, rtl) {
	const [firstCharClass, lastCharClass] = rtl ? [styles_module_default.end, styles_module_default.start] : [styles_module_default.start, styles_module_default.end];
	let acc = 0;
	const toCleanup = [];
	for (const nodeGroup of nodeGroups) {
		const n = nodeGroup.length;
		const localIndicies = indicies.filter((i) => i >= acc && i < acc + n).map((i) => i - acc);
		const m = localIndicies.length;
		acc += n;
		for (let i = 0; i < m; i++) {
			let j = i;
			while (j < m - 1 && localIndicies[j + 1] - 1 === localIndicies[j]) j++;
			if (j === i) {
				const nodeSingle = nodeGroup[localIndicies[i]];
				nodeSingle.classList.add(styles_module_default.Char, styles_module_default.single);
				toCleanup.push(nodeSingle);
				continue;
			}
			const nodeStart = nodeGroup[localIndicies[i]];
			const nodeEnd = nodeGroup[localIndicies[j]];
			nodeStart.classList.add(styles_module_default.Char, firstCharClass);
			nodeEnd.classList.add(styles_module_default.Char, lastCharClass);
			toCleanup.push(nodeStart, nodeEnd);
			for (let k = i + 1; k < j; k++) {
				const nodeMiddle = nodeGroup[localIndicies[k]];
				nodeMiddle.classList.add(styles_module_default.Char, styles_module_default.middle);
				toCleanup.push(nodeMiddle);
			}
			i = j;
		}
	}
	onCleanup(() => {
		toCleanup.forEach((el) => {
			el.className = "";
		});
	});
}
//#endregion
//#region src/components/addToFolderDropdownMenu/hooks.tsx
var _tmpl$$1 = /*#__PURE__*/ template(`<span>`);
var MIN_FUZZY_SCORE = .25;
var createButtonMenuIcon = ({ filter, isChecked, docId, emoji }) => {
	const [failedToFetchIcon, setFailedToFetchIcon] = createSignal(false);
	return (() => {
		var _el$ = _tmpl$$1();
		insert(_el$, createComponent(Show, {
			get when() {
				return (docId || emoji) && !failedToFetchIcon();
			},
			get fallback() {
				return createComponent(IconTsx, { get icon() {
					return getIconForFilter(filter);
				} });
			},
			get children() {
				return createComponent(FolderAnimatedIcon, {
					get managers() {
						return rootScope.managers;
					},
					color: "primary-text-color",
					docId,
					emoji,
					size: 20,
					onFail: () => setFailedToFetchIcon(true),
					get dontAnimate() {
						return filter.pFlags?.title_noanimate;
					}
				});
			}
		}), null);
		insert(_el$, createComponent(Transition, {
			name: "t-zoom",
			get children() {
				return createComponent(Show, {
					get when() {
						return isChecked();
					},
					get children() {
						var _el$2 = _tmpl$$1();
						insert(_el$2, createComponent(IconTsx, { icon: "check" }));
						createRenderEffect(() => className(_el$2, styles_module_default.ItemIconCheck));
						return _el$2;
					}
				});
			}
		}), null);
		createRenderEffect(() => className(_el$, `btn-menu-item-icon ${styles_module_default.ItemIcon}`));
		return _el$;
	})();
};
var createButtonMenuLabel = ({ label, isSelected }) => (() => {
	var _el$3 = _tmpl$$1();
	insert(_el$3, label, null);
	insert(_el$3, createComponent(Show, {
		get when() {
			return isSelected();
		},
		get children() {
			return createComponent(IconTsx, {
				icon: "enter",
				get ["class"]() {
					return styles_module_default.ItemLabelEnter;
				}
			});
		}
	}), null);
	createRenderEffect(() => className(_el$3, styles_module_default.ItemLabel));
	return _el$3;
})();
var createFolderItems = ({ filters, isInFilter, isSelected, onToggle, currentFilter }) => createMemo(() => {
	const middleware = createMiddleware();
	log.debug("creating folder items");
	onCleanup(() => {
		log.debug("destroying folder items middleware");
		middleware.destroy();
	});
	return filters().map((filter) => {
		const extractedTitle = extractEmojiFromFilterTitle(filter.title);
		const { span, charSpansGroups, rtl } = wrapFolderTitleInSpan(extractedTitle.text, middleware.get());
		span.classList.add(styles_module_default.ItemLabelText);
		const options = {
			iconElement: createButtonMenuIcon({
				filter,
				isChecked: () => isInFilter(filter),
				docId: extractedTitle.docId,
				emoji: extractedTitle.emoji
			}),
			textElement: createButtonMenuLabel({
				label: span,
				isSelected: () => isSelected(filter.id)
			}),
			onClick: noop
		};
		const buttonMenuItem = ButtonMenuItem(options);
		options.element?.addEventListener(CLICK_EVENT_NAME, async (e) => {
			if (e.shiftKey && currentFilter() !== filter.id) e.stopPropagation();
			onToggle(filter);
		}, true);
		options.element?.classList.add(styles_module_default.Item);
		if (options.element) {
			options.element.setAttribute("role", "menuitemcheckbox");
			if (span.textContent) options.element.setAttribute("aria-label", span.textContent);
		}
		createEffect(() => {
			options.element?.setAttribute("aria-checked", "" + isInFilter(filter));
		});
		createEffect(() => {
			if (!isSelected(filter.id)) return;
			options.element?.classList.add(styles_module_default.selected);
			onCleanup(() => void options.element?.classList.remove(styles_module_default.selected));
		});
		return {
			filter,
			textContent: span.textContent,
			buttonMenuItem,
			element: options.element,
			charSpansGroups,
			rtl
		};
	});
});
var useToggleDialogInFilter = ({ dialog, onNewDialog, isInFilter }) => {
	let hasRequestInProgress = false;
	return async (filter) => {
		const managers = bindManagersToSession(rootScope.managers);
		if (hasRequestInProgress || !filter) return;
		const unwrapped = unwrap(filter);
		hasRequestInProgress = true;
		try {
			await (isInFilter(filter) ? removeFromFilter(unwrapped, dialog().peerId) : addToFilter(unwrapped, dialog().peerId));
			const newDialog = await managers.dialogsStorage.getAnyDialog(dialog().peerId);
			if (!isDialog(newDialog)) return;
			onNewDialog(newDialog);
		} catch {} finally {
			hasRequestInProgress = false;
		}
	};
};
var createSearchableFolders = ({ folderItems, search, isSelected, setSelected }) => createMemo(() => {
	if (!search()) return {
		folders: folderItems(),
		visibleFoldersCount: folderItems().length
	};
	const sortedFolders = folderItems().map((src) => ({
		finderResult: kindaFuzzyFinder(src.textContent, search()),
		src
	})).sort(({ finderResult: { found: found1, score: score1 } }, { finderResult: { found: found2, score: score2 } }) => score1 === score2 ? (found1[0] || 0) - (found2[0] || 0) : score2 - score1);
	setSelected(0);
	onCleanup(() => void setSelected());
	const visibleFoldersCount = sortedFolders.filter(({ src, finderResult }) => {
		if (finderResult.score >= MIN_FUZZY_SCORE) {
			createEffect(() => {
				if (isSelected(src.filter.id)) src.element.scrollIntoView({ block: "center" });
			});
			highlightTextNodes(src.charSpansGroups, finderResult.found, src.rtl);
			return true;
		}
		src.buttonMenuItem.forEach((el) => el.classList.add(styles_module_default.Hidden));
		onCleanup(() => void src.buttonMenuItem.forEach((el) => el.classList.remove(styles_module_default.Hidden)));
	}).length;
	return {
		folders: sortedFolders.map(({ src }) => src),
		visibleFoldersCount
	};
});
var useTooltipHint = ({ pivot }) => {
	let closeTooltip = noop;
	setTimeout(() => {
		closeTooltip = void 0;
	}, 200);
	onCleanup(() => {
		closeTooltip?.();
	});
	const showHint = () => {
		if (closeTooltip) return;
		closeTooltip = showTooltip({
			element: pivot(),
			vertical: "top",
			textElement: i18n("AddToFolderTip"),
			lighter: true,
			auto: true,
			useOverlay: false,
			onClose: () => {
				closeTooltip = void 0;
			}
		}).close;
	};
	const closeAndDisableTooltip = () => {
		closeTooltip?.();
		closeTooltip = noop;
	};
	return {
		showHint,
		closeAndDisableTooltip
	};
};
var useInputKeydown = ({ search, setSearch, selected, setSelected, selectedFilter, currentFilter, onToggle, visibleFoldersCount }) => {
	return (e) => {
		if ([
			"ArrowUp",
			"ArrowLeft",
			"ArrowDown",
			"ArrowRight",
			"Enter"
		].includes(e.code)) e.preventDefault();
		if (e.code === "Escape") {
			if (search()) setSearch("");
			else contextMenuController.close();
		}
		if (e.code === "Enter" && selectedFilter()) {
			onToggle(selectedFilter());
			if (!e.shiftKey || currentFilter() === selectedFilter().id) contextMenuController.close();
			return;
		}
		if (typeof selected() !== "number") return;
		const inlineKeys = getInlineArrowKeys();
		const increment = e.code === "ArrowUp" || e.code === inlineKeys.previous ? -1 : e.code === "ArrowDown" || e.code === inlineKeys.next ? 1 : 0;
		setSelected((prev) => (prev + increment + visibleFoldersCount()) % visibleFoldersCount());
	};
};
//#endregion
//#region src/components/addToFolderDropdownMenu/index.tsx
var _tmpl$ = /*#__PURE__*/ template(`<input>`);
var _tmpl$2 = /*#__PURE__*/ template(`<div>`);
var _tmpl$3 = /*#__PURE__*/ template(`<div style=--max-visible-items:6>`);
var HAVE_SCROLL_WHEN_ABOVE = 8;
var AddToFolderDropdownMenu = defineSolidElement({
	name: "add-to-folder-dropdown-menu",
	component: (props, _, controls) => {
		props.element.classList.add("btn-menu", styles_module_default.Container);
		props.element.setAttribute("role", "menu");
		let infoIcon, label, thumb;
		const [search, setSearch] = createSignal("");
		const [selected, setSelected] = createSignal();
		const [selectableFolders, setSelectableFolders] = createSignal([]);
		const isInFilter = createSelector(() => props.dialog, (filter, dialog) => !!dialog?.[`index_${filter.localId}`]);
		const selectedFilter = createMemo(() => selectableFolders()[selected()]?.filter);
		const isSelected = createSelector(() => selectedFilter()?.id);
		const renderAsScrollable = createMemo(() => props.filters.length > HAVE_SCROLL_WHEN_ABOVE);
		const toggleDialogInFilter = useToggleDialogInFilter({
			dialog: () => props.dialog,
			onNewDialog: (newDialog) => {
				props.dialog = newDialog;
				props.onNewDialog?.(newDialog);
			},
			isInFilter
		});
		const searchableFolders = createSearchableFolders({
			folderItems: createFolderItems({
				filters: () => props.filters,
				isInFilter,
				isSelected,
				onToggle: toggleDialogInFilter,
				currentFilter: props.currentFilter
			}),
			search,
			isSelected,
			setSelected
		});
		const { showHint, closeAndDisableTooltip } = useTooltipHint({ pivot: () => infoIcon });
		controls.closeTooltip = closeAndDisableTooltip;
		const onInputKeyDown = useInputKeydown({
			search,
			setSearch,
			selected,
			setSelected,
			selectedFilter,
			currentFilter: props.currentFilter,
			onToggle: toggleDialogInFilter,
			visibleFoldersCount: () => searchableFolders().visibleFoldersCount
		});
		onMount(() => {
			thumb?.addEventListener(CLICK_EVENT_NAME, (e) => {
				e.stopPropagation();
			}, true);
		});
		createComputed(() => {
			setSelectableFolders(searchableFolders().folders);
		});
		createEffect(() => {
			if (typeof selected() !== "number") label?.scrollIntoView({ block: "center" });
		});
		createEffect(() => {
			props.element.classList.toggle(styles_module_default.withScrollable, renderAsScrollable());
		});
		const cleanupEscapeHandler = appNavigationController.registerEscapeHandler(() => !search());
		onCleanup(() => {
			props.onCleanup?.();
			cleanupEscapeHandler();
		});
		const Items = () => createComponent(For, {
			get each() {
				return searchableFolders().folders;
			},
			children: (folder) => folder.buttonMenuItem
		});
		return createComponent(Show, {
			get when() {
				return renderAsScrollable();
			},
			get fallback() {
				return createComponent(Items, {});
			},
			get children() {
				var _el$ = _tmpl$3();
				insert(_el$, createComponent(Show, {
					when: !IS_MOBILE,
					get children() {
						var _el$2 = _tmpl$();
						use((el) => void setTimeout(() => void el.focus(), 100), _el$2);
						addEventListener(_el$2, "keydown", onInputKeyDown, true);
						_el$2.addEventListener("blur", (e) => {
							e.target.focus();
						});
						_el$2.$$input = (e) => void setSearch(e.target.value);
						createRenderEffect((_p$) => {
							var _v$ = styles_module_default.Input, _v$2 = langPack_default.format("AddToFolderSearch", true);
							_v$ !== _p$.e && className(_el$2, _p$.e = _v$);
							_v$2 !== _p$.t && setAttribute(_el$2, "aria-label", _p$.t = _v$2);
							return _p$;
						}, {
							e: void 0,
							t: void 0
						});
						createRenderEffect(() => _el$2.value = search());
						return _el$2;
					}
				}), null);
				insert(_el$, createComponent(Show, {
					get when() {
						return !searchableFolders().visibleFoldersCount;
					},
					get children() {
						return (() => {
							const el = i18n("AddToFolderEmptySearchResult");
							el.classList.add(styles_module_default.EmptySearchTip);
							return el;
						})();
					}
				}), null);
				insert(_el$, createComponent(Scrollable$1, {
					get ["class"]() {
						return styles_module_default.Scrollable;
					},
					thumbRef: (el) => void (thumb = el),
					get children() {
						return [createComponent(Show, {
							when: !IS_MOBILE,
							get children() {
								var _el$3 = _tmpl$2();
								addEventListener(_el$3, "pointerenter", showHint);
								var _ref$ = label;
								typeof _ref$ === "function" ? use(_ref$, _el$3) : label = _el$3;
								insert(_el$3, () => {
									const el = i18n("AddToFolderSearch");
									el.classList.add(styles_module_default.LabelText);
									return el;
								}, null);
								insert(_el$3, createComponent(IconTsx, {
									ref(r$) {
										var _ref$2 = infoIcon;
										typeof _ref$2 === "function" ? _ref$2(r$) : infoIcon = r$;
									},
									icon: "info",
									"aria-hidden": false,
									get ["aria-label"]() {
										return langPack_default.format("AddToFolderTip", true);
									}
								}), null);
								createRenderEffect(() => className(_el$3, styles_module_default.Label));
								return _el$3;
							}
						}), createComponent(Items, {})];
					}
				}), null);
				createRenderEffect((_p$) => {
					var _v$3 = styles_module_default.ScrollableContainer, _v$4 = { [styles_module_default.mobile]: IS_MOBILE };
					_v$3 !== _p$.e && className(_el$, _p$.e = _v$3);
					_p$.t = classList(_el$, _v$4, _p$.t);
					return _p$;
				}, {
					e: void 0,
					t: void 0
				});
				return _el$;
			}
		});
	}
});
delegateEvents(["input", "keydown"]);
//#endregion
export { AddToFolderDropdownMenu as default, fetchDialogFilters };
