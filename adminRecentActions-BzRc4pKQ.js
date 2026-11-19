//# allFunctionsCalledOnLoad
import { h as Modes, s as IS_MOBILE } from "./userAgent-ByGXcznk.js";
import { t as pause } from "./pause-BSJh-z46.js";
import { c as deepEqual, n as asyncThrottle } from "./encryptedStorageLayer-gN9TBXzg.js";
import { a as i18n, u as langPack_default } from "./langPack-BmdJGr44.js";
import { A as mergeProps, C as createSignal, D as getOwner, L as untrack, M as onCleanup, N as onMount, P as runWithOwner, S as createSelector, _ as createMemo, b as createResource, d as batch, f as children, g as createEffect, i as For, j as on, k as mapArray, m as createComputed, p as createComponent, r as ErrorBoundary, s as Show, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { _ as use, a as classList, c as insert, f as setAttribute, g as template, n as Portal, o as className, p as setStyleProperty, r as addEventListener, s as delegateEvents, t as Dynamic, u as memo } from "./web-BPyQozky.js";
import { r as useHotReloadGuard } from "./hotReloadGuard-BUNVkeQ4.js";
import { i as setAppSettings, t as liteMode } from "./liteMode-DeLStZfQ.js";
import { u as wrapRichText } from "./renderer-L80wjxct.js";
import { t as ripple } from "./ripple-D7hcIc_t.js";
import { t as IconTsx } from "./iconTsx-B4lOk4A6.js";
import { t as I18nTsx } from "./i18n-CGMFiAW0.js";
import { t as Button$1 } from "./buttonTsx-Bwphkm9r.js";
import { t as buttonKeyDown } from "./buttonKeyDown-CqZzefS3.js";
import { n as createFocusTrap } from "./focusTrap-CKEkJXZv.js";
import { o as createMiddleware } from "./sticker-5twBOy1Y.js";
import { t as requestRAF } from "./requestRAF-CwdYaVwH.js";
import { t as lowerBound } from "./lowerBound-DXL9JCGb.js";
import { P as formatDate } from "./index-B7axFZql.js";
import { t as Transition } from "./transition-Cmlc134D.js";
import { E as lastItem, mn as getParticipantPeerId } from "./getChatMigratedTo-ChhMNXuu.js";
import { U as getPeerId } from "./canPollPeerStories-D3HoBvLX.js";
import { l as formatDuration, r as wrapFormattedDuration } from "./wrapDuration-BQgz9hDF.js";
import { Xt as PhotoTsx } from "./appDialogsManager-CXguiKc3.js";
import { C as ButtonIconTsx, M as useIsCleaned, i as useElementSize } from "./openEditors-7FmA7q_V.js";
import { a as participantRightsMap, i as TopicName, n as getPhoto, o as removeChatBannedRightsFromParticipant, r as useParticipantClickHandler, s as isBannedParticipant, t as diffFlags } from "./utils-B5WAc8p7.js";
import { t as resolveAdminRightFlagI18n } from "./adminRightsI18nResolver-oCYjSlYl.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { t as Space } from "./space-XGOOgiuc.js";
import { l as debounce } from "./pickKeys-Ckq7_h-r.js";
import { n as createSetSignal, r as FlagFilters, t as useFlagFilters } from "./useFlagFilters-DIMg9yXK.js";
import { t as HeightTransition } from "./heightTransition-DUH4NxQ7.js";
import { t as track } from "./track-DjRO1FyT.js";
import { t as useScrollPosition } from "./useScrollPosition-DI_ULjVI.js";
import { t as useResizeObserver } from "./useResizeObserver-DB3oDROf.js";
var styles_module_default$2 = { Container: "_Container_6yug7_1" };
//#endregion
//#region src/components/dynamicVirtualList/index.tsx
var _tmpl$$9 = /*#__PURE__*/ template(`<div>`);
var viewportThreshold = .05;
var stableResizeTimeout = 50;
var scrollAdjustmentThreshold = 1;
var createListItemStates = (list) => {
	const rawStates = mapArray(list, (payload, idx) => {
		const [cachedHeight, setCachedHeight] = createSignal();
		const [offset, setOffset] = createSignal(0);
		const [translate, setTranslate] = createSignal(0);
		return {
			payload,
			prevCachedHeight: 0,
			cachedHeight,
			setCachedHeight,
			offset,
			setOffset,
			translate,
			setTranslate,
			idx,
			needScrollAdjustment: false
		};
	});
	return createMemo(() => rawStates());
};
var createListHeight = ({ listItemStates, estimateItemHeight, verticalPadding }) => {
	const [height, setHeight] = createSignal(0);
	createComputed(() => {
		batch(() => {
			const newHeight = listItemStates().reduce((acc, item) => {
				const height = untrack(() => item.cachedHeight() ?? estimateItemHeight(item.payload));
				item.prevCachedHeight = height;
				item.setCachedHeight(height);
				item.setOffset(acc);
				return acc + height;
			}, verticalPadding());
			setHeight(newHeight + verticalPadding());
		});
	});
	return [height, setHeight];
};
var createVirtualRenderState = ({ list, scrollable, maxBatchSize: batchSize, estimateItemHeight, verticalPadding, renderAtLeastFromBottom }) => {
	const scrollTop = useScrollPosition(scrollable);
	const size = useElementSize(scrollable);
	const clientHeight = () => size.height;
	const listItemStates = createListItemStates(list);
	const [height, setHeight] = createListHeight({
		listItemStates,
		estimateItemHeight,
		verticalPadding
	});
	const [renderedItems, setRenderedItems] = createSignal([], { equals: (a, b) => a.length === b.length && a.every((item, i) => item === b[i]) });
	const [trackedRenderedItems, setTrackedRenderedItems] = createSignal([]);
	createEffect(() => {
		trackedRenderedItems();
		const list = listItemStates();
		const localBatchSize = untrack(batchSize);
		const prevRenderedItems = untrack(renderedItems);
		const toRender = [];
		const prevMinIdx = prevRenderedItems.length ? prevRenderedItems.reduce((minIdx, item) => Math.min(minIdx, item.idx()), Infinity) : 0;
		let scrollTopAdjustment = 0;
		for (const item of prevRenderedItems) if (item.needScrollAdjustment) {
			const heightDiff = (untrack(item.cachedHeight) || 0) - item.prevCachedHeight;
			scrollTopAdjustment += heightDiff;
			item.needScrollAdjustment = false;
		}
		const localScrollTop = scrollTop() + scrollTopAdjustment, localClientHeight = clientHeight();
		const viewportTop = localScrollTop - viewportThreshold * localClientHeight, viewportBottom = localScrollTop + localClientHeight * 1.05;
		let totalHeightDiff = 0, queuedCount = 0, currentOffset = 0;
		batch(() => {
			let i = lowerBound(0, prevMinIdx - 1, viewportTop, (idx) => untrack(() => list[idx].offset() + (list[idx].cachedHeight() || 0)));
			const fromBottomIdx = list.length - renderAtLeastFromBottom({ clientHeight: localClientHeight });
			i = Math.min(i, fromBottomIdx);
			i = Math.max(i, 0);
			currentOffset = untrack(() => list[i]?.offset()) || verticalPadding();
			for (; i < list.length; i++) {
				const item = list[i];
				const height = untrack(item.cachedHeight) || 0;
				const heightDiff = height - item.prevCachedHeight;
				totalHeightDiff += heightDiff;
				item.prevCachedHeight = height;
				item.setOffset(currentOffset);
				const top = currentOffset, bottom = top + height;
				const wasVisible = prevRenderedItems.includes(item);
				const isVisible = (bottom > viewportTop || i >= fromBottomIdx) && top < viewportBottom;
				if (!wasVisible && isVisible) queuedCount += 1;
				if (!(queuedCount > localBatchSize) && isVisible) {
					toRender.push(item);
					item.needScrollAdjustment = i < prevMinIdx;
				} else if (toRender.length) break;
				currentOffset += height;
			}
			toRender.forEach((item) => void item.cachedHeight());
			if (Math.abs(scrollTopAdjustment) > scrollAdjustmentThreshold) untrack(scrollable).scrollTop += scrollTopAdjustment;
			setHeight((prev) => prev + totalHeightDiff);
			setRenderedItems(toRender);
		});
	});
	return {
		scrollTop,
		clientHeight,
		height,
		renderedItems,
		onMeasure: () => {
			setTrackedRenderedItems(untrack(renderedItems));
		}
	};
};
var createItemComponent = ({ component, measureElementHeight }) => {
	const registerResizeCallback = useResizeObserver();
	return (props) => {
		let ref;
		const [isMeasuring, setIsMeasuring] = createSignal(false);
		const owner = getOwner();
		const isCleaned = useIsCleaned();
		const { offset, setCachedHeight, idx } = props.item;
		const [stableOffset, setStableOffset] = createSignal(0);
		const [translation, setTranslation] = createSignal(0);
		let timeoutId;
		onCleanup(() => {
			self.clearTimeout(timeoutId);
			props.item.needScrollAdjustment = false;
		});
		let afterMeasure = true;
		requestRAF(() => {
			if (isCleaned()) return;
			const height = measureElementHeight(ref);
			setCachedHeight(height);
			setIsMeasuring(false);
			afterMeasure = true;
			runWithOwner(owner, () => {
				registerResizeCallback(ref, ({ size }) => {
					setCachedHeight(measureElementHeight(ref));
				});
			});
		});
		createComputed(on(offset, () => {
			if (afterMeasure) {
				afterMeasure = false;
				setStableOffset(offset());
				return;
			}
			const diff = offset() - stableOffset();
			if (!diff) return;
			setTranslation(diff);
			self.clearTimeout(timeoutId);
			timeoutId = self.setTimeout(() => {
				batch(() => {
					setStableOffset(offset());
					setTranslation(0);
				});
			}, stableResizeTimeout);
		}));
		return createComponent(Dynamic, {
			get component() {
				return component();
			},
			ref(r$) {
				var _ref$ = ref;
				typeof _ref$ === "function" ? _ref$(r$) : ref = r$;
			},
			get payload() {
				return props.item.payload;
			},
			get isMeasuring() {
				return isMeasuring();
			},
			get offset() {
				return memo(() => !!isMeasuring())() ? 0 : stableOffset();
			},
			get translation() {
				return memo(() => !!isMeasuring())() ? 0 : translation();
			},
			get idx() {
				return idx();
			}
		});
	};
};
var DynamicVirtualList = (inProps) => {
	const props = mergeProps({
		nearBottomThreshold: 120,
		verticalPadding: 0,
		renderAtLeastFromBottom: () => 0
	}, inProps);
	const { scrollTop, clientHeight, height, renderedItems, onMeasure } = createVirtualRenderState({
		list: () => props.list,
		estimateItemHeight: (...args) => props.estimateItemHeight(...args),
		maxBatchSize: () => props.maxBatchSize,
		scrollable: () => props.scrollable,
		verticalPadding: () => props.verticalPadding,
		renderAtLeastFromBottom: (args) => props.renderAtLeastFromBottom(args)
	});
	createEffect(() => {
		if (!props.onNearBottom) return;
		if (scrollTop() + clientHeight() >= height() - props.nearBottomThreshold) untrack(() => props.onNearBottom());
	});
	const Item = createItemComponent({
		component: () => props.Item,
		measureElementHeight: (...args) => {
			onMeasure();
			return props.measureElementHeight(...args);
		}
	});
	return (() => {
		var _el$ = _tmpl$$9();
		insert(_el$, createComponent(For, {
			get each() {
				return renderedItems();
			},
			children: (item) => createComponent(Item, { item })
		}));
		createRenderEffect((_p$) => {
			var _v$ = styles_module_default$2.Container, _v$2 = `${height()}px`;
			_v$ !== _p$.e && className(_el$, _p$.e = _v$);
			_v$2 !== _p$.t && setStyleProperty(_el$, "--height", _p$.t = _v$2);
			return _p$;
		}, {
			e: void 0,
			t: void 0
		});
		return _el$;
	})();
};
var expandToggleButton_module_default = {
	Placeholder: "_Placeholder_1chcr_16",
	Icon: "_Icon_1chcr_20",
	first: "_first_1chcr_29",
	toggled: "_toggled_1chcr_33",
	second: "_second_1chcr_36"
};
//#endregion
//#region src/components/sidebarRight/tabs/adminRecentActions/expandToggleButton.tsx
var _tmpl$$8 = /*#__PURE__*/ template(`<button class=btn-icon>`);
var ExpandToggleButton = (props) => {
	return (() => {
		var _el$ = _tmpl$$8();
		addEventListener(_el$, "click", props.onClick, true);
		use(ripple, _el$, () => true);
		insert(_el$, createComponent(IconTsx, {
			icon: "plus",
			get ["class"]() {
				return expandToggleButton_module_default.Placeholder;
			}
		}), null);
		insert(_el$, createComponent(IconTsx, {
			icon: "arrowhead",
			get ["class"]() {
				return `${expandToggleButton_module_default.Icon} ${expandToggleButton_module_default.first}`;
			},
			get classList() {
				return { [expandToggleButton_module_default.toggled]: props.expanded };
			}
		}), null);
		insert(_el$, createComponent(IconTsx, {
			icon: "arrowhead",
			get ["class"]() {
				return `${expandToggleButton_module_default.Icon} ${expandToggleButton_module_default.second}`;
			},
			get classList() {
				return { [expandToggleButton_module_default.toggled]: props.expanded };
			}
		}), null);
		createRenderEffect((_p$) => {
			var _v$ = langPack_default.format(props.expanded ? "Separator.ShowLess" : "Separator.ShowMore", true), _v$2 = props.expanded;
			_v$ !== _p$.e && setAttribute(_el$, "aria-label", _p$.e = _v$);
			_v$2 !== _p$.t && setAttribute(_el$, "aria-expanded", _p$.t = _v$2);
			return _p$;
		}, {
			e: void 0,
			t: void 0
		});
		return _el$;
	})();
};
delegateEvents(["click"]);
var styles_module_default$1 = {
	Container: "_Container_1yj7p_1",
	ContainerBackdropFill: "_ContainerBackdropFill_1yj7p_21",
	ContainerBackdropExtension: "_ContainerBackdropExtension_1yj7p_30",
	ContainerEnterActive: "_ContainerEnterActive_1yj7p_40",
	ContainerExitActive: "_ContainerExitActive_1yj7p_40",
	ContainerEnter: "_ContainerEnter_1yj7p_40",
	ContainerExitTo: "_ContainerExitTo_1yj7p_43",
	Card: "_Card_1yj7p_48",
	hideThumb: "_hideThumb_1yj7p_59",
	Overlay: "_Overlay_1yj7p_63",
	TopLevelCheckbox: "_TopLevelCheckbox_1yj7p_69"
};
//#endregion
//#region src/components/sidebarRight/tabs/adminRecentActions/filters/index.tsx
var _tmpl$$7 = /*#__PURE__*/ template(`<div>`);
var _tmpl$2$2 = /*#__PURE__*/ template(`<div><div><div></div><div></div></div><div role=dialog aria-modal=true>`);
var focusDelay = 100;
var Filters = (props) => {
	const filtersControls = useFlagFilters({
		channelId: () => props.channelId,
		isBroadcast: () => props.isBroadcast
	});
	createComputed(() => {
		track(() => props.open);
		filtersControls.setFromCommittedFilters(props.committedFilters);
	});
	const onReset = () => batch(() => {
		props.onCommit(null);
		props.onClose?.();
	});
	const onCommit = (committedFilters) => batch(() => {
		props.onCommit(committedFilters);
		props.onClose?.();
	});
	let inputEl;
	const onInputRef = (el) => {
		inputEl = el;
		if (IS_MOBILE) return;
		setTimeout(() => el.focus(), focusDelay);
	};
	let cardEl;
	createEffect(on(() => props.open, (open) => {
		if (!open || !cardEl) return;
		const focusTrap = createFocusTrap(cardEl);
		focusTrap.activate(void 0, inputEl);
		onCleanup(() => focusTrap.deactivate());
	}));
	const onKeyDown = (e) => {
		if (Modes.a11y && e.key === "Escape") {
			e.preventDefault();
			e.stopPropagation();
			props.onClose?.();
		}
	};
	return [createComponent(Transition, {
		name: "fade",
		get children() {
			return createComponent(Show, {
				get when() {
					return props.open;
				},
				get children() {
					var _el$ = _tmpl$$7();
					addEventListener(_el$, "click", props.onClose, true);
					createRenderEffect(() => className(_el$, styles_module_default$1.Overlay));
					return _el$;
				}
			});
		}
	}), createComponent(Transition, {
		get enterActiveClass() {
			return styles_module_default$1.ContainerEnterActive;
		},
		get exitActiveClass() {
			return styles_module_default$1.ContainerExitActive;
		},
		get enterClass() {
			return styles_module_default$1.ContainerEnter;
		},
		get exitToClass() {
			return styles_module_default$1.ContainerExitTo;
		},
		get children() {
			return createComponent(Show, {
				get when() {
					return props.open;
				},
				get children() {
					var _el$2 = _tmpl$2$2(), _el$3 = _el$2.firstChild, _el$4 = _el$3.firstChild, _el$5 = _el$4.nextSibling, _el$6 = _el$3.nextSibling;
					_el$6.$$keydown = onKeyDown;
					var _ref$ = cardEl;
					typeof _ref$ === "function" ? use(_ref$, _el$6) : cardEl = _el$6;
					insert(_el$6, createComponent(FlagFilters, {
						filtersControls,
						inputRef: onInputRef,
						onCommit,
						onReset,
						hasSearch: true
					}));
					createRenderEffect((_p$) => {
						var _v$ = styles_module_default$1.Container, _v$2 = styles_module_default$1.ContainerBackdropFill, _v$3 = styles_module_default$1.ContainerBackdropExtension, _v$4 = styles_module_default$1.Card, _v$5 = langPack_default.format("AdminRecentActionsFilters.ByType", true);
						_v$ !== _p$.e && className(_el$2, _p$.e = _v$);
						_v$2 !== _p$.t && className(_el$4, _p$.t = _v$2);
						_v$3 !== _p$.a && className(_el$5, _p$.a = _v$3);
						_v$4 !== _p$.o && className(_el$6, _p$.o = _v$4);
						_v$5 !== _p$.i && setAttribute(_el$6, "aria-label", _p$.i = _v$5);
						return _p$;
					}, {
						e: void 0,
						t: void 0,
						a: void 0,
						o: void 0,
						i: void 0
					});
					return _el$2;
				}
			});
		}
	})];
};
delegateEvents(["click", "keydown"]);
var chatPhoto_module_default = {
	Container: "_Container_2z5pa_1",
	rounded: "_rounded_2z5pa_8",
	Photo: "_Photo_2z5pa_8",
	forum: "_forum_2z5pa_11"
};
//#endregion
//#region src/components/sidebarRight/tabs/adminRecentActions/chatPhoto.tsx
var _tmpl$$6 = /*#__PURE__*/ template(`<div>`);
var boxSize = 120;
var ChatPhoto = (props) => {
	return (() => {
		var _el$ = _tmpl$$6();
		insert(_el$, createComponent(PhotoTsx, {
			get ["class"]() {
				return chatPhoto_module_default.Photo;
			},
			get photo() {
				return props.photo;
			},
			boxWidth: boxSize,
			boxHeight: boxSize,
			withoutPreloader: true
		}));
		createRenderEffect((_p$) => {
			var _v$ = chatPhoto_module_default.Container, _v$2 = {
				[chatPhoto_module_default.forum]: props.isForum,
				[chatPhoto_module_default.rounded]: props.rounded
			};
			_v$ !== _p$.e && className(_el$, _p$.e = _v$);
			_p$.t = classList(_el$, _v$2, _p$.t);
			return _p$;
		}, {
			e: void 0,
			t: void 0
		});
		return _el$;
	})();
};
var keyValuePair_module_default = {
	Container: "_Container_1ib6g_1",
	hoverable: "_hoverable_1ib6g_13",
	Value: "_Value_1ib6g_17",
	Border: "_Border_1ib6g_21"
};
//#endregion
//#region src/components/sidebarRight/tabs/adminRecentActions/keyValuePair.tsx
var _tmpl$$5 = /*#__PURE__*/ template(`<div><div></div><div>:</div><div>`);
var KeyValuePair = (props) => {
	return (() => {
		var _el$ = _tmpl$$5(), _el$2 = _el$.firstChild, _el$3 = _el$2.nextSibling, _el$4 = _el$3.firstChild, _el$5 = _el$3.nextSibling;
		addEventListener(_el$, "click", props.onClick, true);
		addEventListener(_el$, "keydown", props.onClick ? buttonKeyDown : void 0, true);
		insert(_el$3, () => props.label, _el$4);
		insert(_el$5, () => props.value);
		createRenderEffect((_p$) => {
			var _v$ = keyValuePair_module_default.Container, _v$2 = {
				"interactable": props.interactable || !!props.onClick,
				[keyValuePair_module_default.hoverable]: !!props.onClick
			}, _v$3 = props.onClick ? "button" : void 0, _v$4 = props.onClick && Modes.a11y ? 0 : void 0, _v$5 = keyValuePair_module_default.Border, _v$6 = keyValuePair_module_default.Value;
			_v$ !== _p$.e && className(_el$, _p$.e = _v$);
			_p$.t = classList(_el$, _v$2, _p$.t);
			_v$3 !== _p$.a && setAttribute(_el$, "role", _p$.a = _v$3);
			_v$4 !== _p$.o && setAttribute(_el$, "tabindex", _p$.o = _v$4);
			_v$5 !== _p$.i && className(_el$2, _p$.i = _v$5);
			_v$6 !== _p$.n && className(_el$5, _p$.n = _v$6);
			return _p$;
		}, {
			e: void 0,
			t: void 0,
			a: void 0,
			o: void 0,
			i: void 0,
			n: void 0
		});
		return _el$;
	})();
};
var BooleanKeyValue = (props) => createComponent(KeyValuePair, {
	get label() {
		return props.label || i18n("AdminRecentActions.ChangedTo");
	},
	get value() {
		return memo(() => !!props.value)() ? i18n("AdminRecentActions.Enabled") : i18n("AdminRecentActions.Disabled");
	}
});
var InviteKeyValue = (props) => {
	return createComponent(KeyValuePair, {
		get label() {
			return createComponent(I18nTsx, { key: "InviteLink" });
		},
		get value() {
			return memo(() => props.invite._ === "chatInviteExported")() ? props.invite.link : createComponent(I18nTsx, { key: "AdminRecentActions.PublicJoinRequest" });
		}
	});
};
var ParticipantKeyValue = (props) => {
	const { PeerTitleTsx } = useHotReloadGuard();
	return createComponent(Show, {
		get when() {
			return props.peerId;
		},
		get children() {
			return createComponent(KeyValuePair, {
				get label() {
					return props.label || createComponent(I18nTsx, { key: "AdminRecentActions.Participant" });
				},
				get value() {
					return createComponent(PeerTitleTsx, {
						get peerId() {
							return props.peerId;
						},
						limitSymbols: 32
					});
				},
				get onClick() {
					return useParticipantClickHandler(props.peerId);
				}
			});
		}
	});
};
delegateEvents(["keydown", "click"]);
var logDiff_module_default = {
	Container: "_Container_17fdd_1",
	vertical: "_vertical_17fdd_1",
	Block: "_Block_17fdd_8",
	added: "_added_17fdd_23",
	removed: "_removed_17fdd_27",
	unroundedTop: "_unroundedTop_17fdd_31",
	unroundedBottom: "_unroundedBottom_17fdd_35",
	unroundedRight: "_unroundedRight_17fdd_39",
	unroundedLeft: "_unroundedLeft_17fdd_43",
	Border: "_Border_17fdd_48",
	Line: "_Line_17fdd_62",
	Separator: "_Separator_17fdd_66",
	Strip: "_Strip_17fdd_71",
	Content: "_Content_17fdd_83"
};
//#endregion
//#region src/components/sidebarRight/tabs/adminRecentActions/logDiff.tsx
var _tmpl$$4 = /*#__PURE__*/ template(`<div><div>`);
var _tmpl$2$1 = /*#__PURE__*/ template(`<div>`);
var _tmpl$3$1 = /*#__PURE__*/ template(`<div><div></div><div>`);
var LogDiff = (props) => {
	const resolvedAdded = children(() => props.added);
	const resolvedRemoved = children(() => props.removed);
	const addedAsArray = createMemo(() => resolvedAdded.toArray().filter(Boolean));
	const removedAsArray = createMemo(() => resolvedRemoved.toArray().filter(Boolean));
	const hasAdded = createMemo(() => addedAsArray().length > 0);
	const hasRemoved = createMemo(() => removedAsArray().length > 0);
	return (() => {
		var _el$ = _tmpl$2$1();
		insert(_el$, createComponent(Show, {
			get when() {
				return hasAdded();
			},
			get children() {
				var _el$2 = _tmpl$$4(), _el$3 = _el$2.firstChild;
				insert(_el$2, createComponent(For, {
					get each() {
						return addedAsArray();
					},
					children: (item) => (() => {
						var _el$7 = _tmpl$3$1(), _el$8 = _el$7.firstChild, _el$9 = _el$8.nextSibling;
						insert(_el$8, createComponent(IconTsx, { icon: "plus" }));
						insert(_el$9, item);
						createRenderEffect((_p$) => {
							var _v$9 = logDiff_module_default.Line, _v$0 = `${logDiff_module_default.Strip} ${logDiff_module_default.added}`, _v$1 = logDiff_module_default.Content;
							_v$9 !== _p$.e && className(_el$7, _p$.e = _v$9);
							_v$0 !== _p$.t && className(_el$8, _p$.t = _v$0);
							_v$1 !== _p$.a && className(_el$9, _p$.a = _v$1);
							return _p$;
						}, {
							e: void 0,
							t: void 0,
							a: void 0
						});
						return _el$7;
					})()
				}), null);
				createRenderEffect((_p$) => {
					var _v$ = `${logDiff_module_default.Block} ${logDiff_module_default.added}`, _v$2 = { [props.vertical ? logDiff_module_default.unroundedRight : logDiff_module_default.unroundedBottom]: hasRemoved() }, _v$3 = `${logDiff_module_default.Border} ${logDiff_module_default.added}`;
					_v$ !== _p$.e && className(_el$2, _p$.e = _v$);
					_p$.t = classList(_el$2, _v$2, _p$.t);
					_v$3 !== _p$.a && className(_el$3, _p$.a = _v$3);
					return _p$;
				}, {
					e: void 0,
					t: void 0,
					a: void 0
				});
				return _el$2;
			}
		}), null);
		insert(_el$, createComponent(Show, {
			get when() {
				return memo(() => !!hasAdded())() && hasRemoved();
			},
			get children() {
				var _el$4 = _tmpl$2$1();
				createRenderEffect(() => className(_el$4, logDiff_module_default.Separator));
				return _el$4;
			}
		}), null);
		insert(_el$, createComponent(Show, {
			get when() {
				return hasRemoved();
			},
			get children() {
				var _el$5 = _tmpl$$4(), _el$6 = _el$5.firstChild;
				insert(_el$5, createComponent(For, {
					get each() {
						return removedAsArray();
					},
					children: (item) => (() => {
						var _el$0 = _tmpl$3$1(), _el$1 = _el$0.firstChild, _el$10 = _el$1.nextSibling;
						insert(_el$1, createComponent(IconTsx, { icon: "minus" }));
						insert(_el$10, item);
						createRenderEffect((_p$) => {
							var _v$10 = logDiff_module_default.Line, _v$11 = `${logDiff_module_default.Strip} ${logDiff_module_default.removed}`, _v$12 = logDiff_module_default.Content;
							_v$10 !== _p$.e && className(_el$0, _p$.e = _v$10);
							_v$11 !== _p$.t && className(_el$1, _p$.t = _v$11);
							_v$12 !== _p$.a && className(_el$10, _p$.a = _v$12);
							return _p$;
						}, {
							e: void 0,
							t: void 0,
							a: void 0
						});
						return _el$0;
					})()
				}), null);
				createRenderEffect((_p$) => {
					var _v$4 = `${logDiff_module_default.Block} ${logDiff_module_default.removed}`, _v$5 = { [props.vertical ? logDiff_module_default.unroundedLeft : logDiff_module_default.unroundedTop]: hasAdded() }, _v$6 = `${logDiff_module_default.Border} ${logDiff_module_default.removed}`;
					_v$4 !== _p$.e && className(_el$5, _p$.e = _v$4);
					_p$.t = classList(_el$5, _v$5, _p$.t);
					_v$6 !== _p$.a && className(_el$6, _p$.a = _v$6);
					return _p$;
				}, {
					e: void 0,
					t: void 0,
					a: void 0
				});
				return _el$5;
			}
		}), null);
		createRenderEffect((_p$) => {
			var _v$7 = logDiff_module_default.Container, _v$8 = {
				[logDiff_module_default.vertical]: props.vertical,
				interactable: !props.vertical
			};
			_v$7 !== _p$.e && className(_el$, _p$.e = _v$7);
			_p$.t = classList(_el$, _v$8, _p$.t);
			return _p$;
		}, {
			e: void 0,
			t: void 0
		});
		return _el$;
	})();
};
var previewMessageButtons_module_default = {
	Container: "_Container_1wvd6_1",
	Button: "_Button_1wvd6_7",
	added: "_added_1wvd6_17",
	removed: "_removed_1wvd6_23"
};
//#endregion
//#region src/components/sidebarRight/tabs/adminRecentActions/previewMessageButtons.tsx
var _tmpl$$3 = /*#__PURE__*/ template(`<div>`);
var PreviewMessageButtons = (props) => {
	const { rootScope, appImManager, ChatType } = useHotReloadGuard();
	const getNonEmpty = (message) => message && (message._ === "message" || message._ === "messageService") ? message : void 0;
	const nonEmptyAdded = createMemo(() => getNonEmpty(props.added));
	const nonEmptyRemoved = createMemo(() => getNonEmpty(props.removed));
	const onClick = async (message) => {
		const newMessage = await rootScope.managers.appMessagesManager.saveLogsMessage(props.channelId.toPeerId(true), message);
		appImManager.setPeer({
			peerId: props.channelId.toPeerId(true),
			messages: [newMessage],
			type: ChatType.Static
		});
	};
	return createComponent(Show, {
		get when() {
			return nonEmptyAdded() || nonEmptyRemoved();
		},
		get children() {
			var _el$ = _tmpl$$3();
			insert(_el$, createComponent(Show, {
				get when() {
					return memo(() => !!nonEmptyAdded())() && props.addedKey;
				},
				get children() {
					return createComponent(Button$1, {
						get ["class"]() {
							return `interactable ${previewMessageButtons_module_default.Button} ${previewMessageButtons_module_default.added}`;
						},
						onClick: () => onClick(nonEmptyAdded()),
						get children() {
							return createComponent(I18nTsx, { get key() {
								return props.addedKey;
							} });
						}
					});
				}
			}), null);
			insert(_el$, createComponent(Show, {
				get when() {
					return memo(() => !!nonEmptyRemoved())() && props.removedKey;
				},
				get children() {
					return createComponent(Button$1, {
						get ["class"]() {
							return `interactable ${previewMessageButtons_module_default.Button} ${previewMessageButtons_module_default.removed}`;
						},
						onClick: () => onClick(nonEmptyRemoved()),
						get children() {
							return createComponent(I18nTsx, { get key() {
								return props.removedKey;
							} });
						}
					});
				}
			}), null);
			createRenderEffect(() => className(_el$, previewMessageButtons_module_default.Container));
			return _el$;
		}
	});
};
//#endregion
//#region src/components/sidebarRight/tabs/adminRecentActions/logEntriesResolver.tsx
var logEntriesMap = {
	"channelAdminLogEventActionChangeTitle": ({ action, isBroadcast }) => ({
		group: "info",
		Message: () => i18n(isBroadcast ? "AdminRecentActionMessage.ChangeTitleChannel" : "AdminRecentActionMessage.ChangeTitleGroup"),
		ExpandableContent: () => createComponent(LogDiff, {
			get added() {
				return action.new_value;
			},
			get removed() {
				return action.prev_value;
			}
		})
	}),
	"channelAdminLogEventActionChangeAbout": ({ action, isBroadcast }) => ({
		group: "info",
		Message: () => i18n(isBroadcast ? "AdminRecentActionMessage.ChangeAboutChannel" : "AdminRecentActionMessage.ChangeAboutGroup"),
		ExpandableContent: () => createComponent(LogDiff, {
			get added() {
				return action.new_value;
			},
			get removed() {
				return action.prev_value;
			}
		})
	}),
	"channelAdminLogEventActionChangeUsername": ({ action, isBroadcast }) => ({
		group: "identity",
		Message: () => i18n(isBroadcast ? "AdminRecentActionMessage.ChangeUsernameChannel" : "AdminRecentActionMessage.ChangeUsernameGroup"),
		ExpandableContent: () => createComponent(LogDiff, {
			get added() {
				return action.new_value;
			},
			get removed() {
				return action.prev_value;
			}
		})
	}),
	"channelAdminLogEventActionChangePhoto": ({ action, isBroadcast, isForum }) => ({
		group: "media",
		Message: () => i18n(isBroadcast ? "AdminRecentActionMessage.ChangePhotoChannel" : "AdminRecentActionMessage.ChangePhotoGroup"),
		ExpandableContent: () => createComponent(LogDiff, {
			vertical: true,
			get added() {
				return memo(() => action.new_photo?._ === "photo")() && createComponent(ChatPhoto, {
					get photo() {
						return action.new_photo;
					},
					rounded: true,
					isForum
				});
			},
			get removed() {
				return memo(() => action.prev_photo?._ === "photo")() && createComponent(ChatPhoto, {
					get photo() {
						return action.prev_photo;
					},
					rounded: true,
					isForum
				});
			}
		})
	}),
	"channelAdminLogEventActionToggleInvites": ({ action }) => ({
		group: "invites",
		Message: () => i18n("AdminRecentActionMessage.ToggleInvites"),
		ExpandableContent: () => createComponent(BooleanKeyValue, { get value() {
			return action.new_value;
		} })
	}),
	"channelAdminLogEventActionToggleSignatures": ({ action }) => ({
		group: "identity",
		Message: () => i18n("AdminRecentActionMessage.ToggleSignatures"),
		ExpandableContent: () => createComponent(BooleanKeyValue, { get value() {
			return action.new_value;
		} })
	}),
	"channelAdminLogEventActionUpdatePinned": ({ channelId, action }) => ({
		group: "pinned",
		Message: () => i18n("AdminRecentActionMessage.UpdatePinnedMessage"),
		ExpandableContent: () => {
			const photo = getPhoto(action.message);
			const justMessage = action.message?._ === "message" ? action.message : void 0;
			const hasPhotoDiff = photo;
			const hasMessageDiff = justMessage?.message;
			const middleware = createMiddleware().get();
			const pinned = action.message?._ === "message" && action.message.pFlags?.pinned;
			return [
				createComponent(Show, {
					when: hasPhotoDiff,
					get children() {
						return createComponent(LogDiff, {
							vertical: true,
							get added() {
								return pinned && photo && createComponent(ChatPhoto, { photo });
							},
							get removed() {
								return !pinned && photo && createComponent(ChatPhoto, { photo });
							}
						});
					}
				}),
				hasPhotoDiff && hasMessageDiff && createComponent(Space, { amount: "4px" }),
				createComponent(Show, {
					when: hasMessageDiff,
					get children() {
						return createComponent(LogDiff, {
							get added() {
								return pinned && justMessage && wrapRichText(justMessage.message, {
									entities: justMessage.entities,
									middleware
								});
							},
							get removed() {
								return !pinned && justMessage && wrapRichText(justMessage.message, {
									entities: justMessage.entities,
									middleware
								});
							}
						});
					}
				}),
				createComponent(Space, { amount: "8px" }),
				createComponent(PreviewMessageButtons, {
					channelId,
					get added() {
						return pinned ? action.message : void 0;
					},
					get removed() {
						return pinned ? void 0 : action.message;
					},
					addedKey: "AdminRecentActions.ViewPinned",
					removedKey: "AdminRecentActions.ViewUnpinned"
				})
			];
		}
	}),
	"channelAdminLogEventActionEditMessage": ({ channelId, action }) => ({
		group: "messages",
		Message: () => i18n("AdminRecentActionMessage.EditedMessage"),
		ExpandableContent: () => {
			const prevPhoto = getPhoto(action.prev_message);
			const newPhoto = getPhoto(action.new_message);
			const prevMessage = action.prev_message?._ === "message" ? action.prev_message : void 0;
			const newMessage = action.new_message?._ === "message" ? action.new_message : void 0;
			const hasPhotoDiff = prevPhoto?.id !== newPhoto?.id;
			const hasMessageDiff = prevMessage?.message !== newMessage?.message || !deepEqual(prevMessage?.entities, newMessage?.entities);
			const middleware = createMiddleware().get();
			return [
				createComponent(Show, {
					when: hasPhotoDiff,
					get children() {
						return createComponent(LogDiff, {
							vertical: true,
							get added() {
								return newPhoto && createComponent(ChatPhoto, { photo: newPhoto });
							},
							get removed() {
								return prevPhoto && createComponent(ChatPhoto, { photo: prevPhoto });
							}
						});
					}
				}),
				createComponent(Show, {
					when: hasPhotoDiff && hasMessageDiff,
					get children() {
						return createComponent(Space, { amount: "4px" });
					}
				}),
				createComponent(Show, {
					when: hasMessageDiff,
					get children() {
						return createComponent(LogDiff, {
							get added() {
								return newMessage && wrapRichText(newMessage.message, {
									entities: newMessage.entities,
									middleware
								});
							},
							get removed() {
								return prevMessage && wrapRichText(prevMessage.message, {
									entities: prevMessage.entities,
									middleware
								});
							}
						});
					}
				}),
				createComponent(Space, { amount: "8px" }),
				createComponent(PreviewMessageButtons, {
					channelId,
					get added() {
						return action.new_message;
					},
					get removed() {
						return action.prev_message;
					},
					addedKey: "AdminRecentActions.ViewUpdatedMessage",
					removedKey: "AdminRecentActions.ViewPreviousMessage"
				})
			];
		}
	}),
	"channelAdminLogEventActionDeleteMessage": ({ channelId, action }) => ({
		group: "messages",
		Message: () => i18n("AdminRecentActionMessage.DeletedMessage"),
		ExpandableContent: () => {
			const prevPhoto = getPhoto(action.message);
			const prevMessage = action.message?._ === "message" ? structuredClone(action.message) : void 0;
			const hasPhotoDiff = prevPhoto;
			const hasMessageDiff = prevMessage?.message;
			const middleware = createMiddleware().get();
			if (prevMessage && prevMessage.media?._ === "messageMediaPoll") {
				if (!prevMessage.media.poll.pFlags) prevMessage.media.poll.pFlags = {};
				prevMessage.media.poll.pFlags.closed = true;
			}
			return [
				createComponent(Show, {
					when: hasPhotoDiff,
					get children() {
						return createComponent(LogDiff, {
							vertical: true,
							get removed() {
								return prevPhoto && createComponent(ChatPhoto, { photo: prevPhoto });
							}
						});
					}
				}),
				hasPhotoDiff && hasMessageDiff && createComponent(Space, { amount: "4px" }),
				createComponent(Show, {
					when: hasMessageDiff,
					get children() {
						return createComponent(LogDiff, { get removed() {
							return prevMessage && wrapRichText(prevMessage.message, {
								entities: prevMessage.entities,
								middleware
							});
						} });
					}
				}),
				createComponent(Space, { amount: "8px" }),
				createComponent(PreviewMessageButtons, {
					channelId,
					get removed() {
						return prevMessage || action.message;
					},
					removedKey: "AdminRecentActions.ViewDeletedMessage"
				})
			];
		}
	}),
	"channelAdminLogEventActionParticipantJoin": ({ isBroadcast }) => ({
		group: "join",
		Message: () => i18n(isBroadcast ? "AdminRecentActionMessage.ParticipantJoinedChannel" : "AdminRecentActionMessage.ParticipantJoinedGroup")
	}),
	"channelAdminLogEventActionParticipantLeave": ({ isBroadcast }) => ({
		group: "leave",
		Message: () => i18n(isBroadcast ? "AdminRecentActionMessage.ParticipantLeftChannel" : "AdminRecentActionMessage.ParticipantLeftGroup")
	}),
	"channelAdminLogEventActionParticipantInvite": ({ action }) => ({
		group: "invites",
		Message: () => i18n("AdminRecentActionMessage.ParticipantInvited"),
		ExpandableContent: () => createComponent(ParticipantKeyValue, { get peerId() {
			return getParticipantPeerId(action.participant);
		} })
	}),
	"channelAdminLogEventActionParticipantToggleBan": ({ channelId, action }) => ({
		group: "permissions",
		Message: () => i18n(isBannedParticipant(action.new_participant) ? "AdminRecentActionMessage.ParticipantBanned" : "AdminRecentActionMessage.ParticipantPermissionsToggled"),
		ExpandableContent: () => {
			const { apiManagerProxy } = useHotReloadGuard();
			const prevBannedParticipant = action.prev_participant?._ === "channelParticipantBanned" ? action.prev_participant : void 0;
			const newBannedParticipant = action.new_participant?._ === "channelParticipantBanned" ? action.new_participant : void 0;
			const channel = apiManagerProxy.getChat(channelId);
			const removeDefaultRights = (rights) => channel?._ === "channel" && rights ? removeChatBannedRightsFromParticipant(channel, rights) : rights;
			const peerId = getParticipantPeerId(action.prev_participant || action.new_participant);
			const diff = diffFlags(removeDefaultRights(prevBannedParticipant?.banned_rights)?.pFlags, removeDefaultRights(newBannedParticipant?.banned_rights)?.pFlags);
			return [createComponent(ParticipantKeyValue, { peerId }), createComponent(Show, {
				get when() {
					return !isBannedParticipant(action.new_participant);
				},
				get children() {
					return [createComponent(Space, { amount: "4px" }), createComponent(LogDiff, {
						get removed() {
							return diff.new.map((key) => participantRightsMap[key]).filter(Boolean).map((key) => i18n(key));
						},
						get added() {
							return diff.old.map((key) => participantRightsMap[key]).filter(Boolean).map((key) => i18n(key));
						}
					})];
				}
			})];
		}
	}),
	"channelAdminLogEventActionParticipantToggleAdmin": ({ action, isBroadcast }) => ({
		group: "permissions",
		Message: () => i18n("AdminRecentActionMessage.AdminToggled"),
		ExpandableContent: () => {
			const { PeerTitleTsx } = useHotReloadGuard();
			const prevParticipantRights = "admin_rights" in action.prev_participant ? action.prev_participant.admin_rights : null;
			const newParticipantRights = "admin_rights" in action.new_participant ? action.new_participant.admin_rights : null;
			const diff = diffFlags(prevParticipantRights?.pFlags, newParticipantRights?.pFlags);
			const peerId = getParticipantPeerId(action.prev_participant || action.new_participant);
			return [createComponent(Show, {
				when: peerId,
				get children() {
					return [createComponent(KeyValuePair, {
						get label() {
							return i18n("AdminRecentActions.ChangedPermissionsToUser");
						},
						get value() {
							return createComponent(PeerTitleTsx, {
								peerId,
								limitSymbols: 32
							});
						},
						get onClick() {
							return useParticipantClickHandler(peerId);
						}
					}), createComponent(Space, { amount: "4px" })];
				}
			}), createComponent(LogDiff, {
				get added() {
					return diff.new.map((key) => i18n(resolveAdminRightFlagI18n(key, { isBroadcast })));
				},
				get removed() {
					return diff.old.map((key) => i18n(resolveAdminRightFlagI18n(key, { isBroadcast })));
				}
			})];
		}
	}),
	"channelAdminLogEventActionChangeStickerSet": () => ({
		group: "appearance",
		Message: () => i18n("AdminRecentActionMessage.ChangeStickerSet")
	}),
	"channelAdminLogEventActionTogglePreHistoryHidden": () => ({
		group: "permissions",
		Message: () => i18n("AdminRecentActionMessage.TogglePreHistoryHidden")
	}),
	"channelAdminLogEventActionDefaultBannedRights": ({ action }) => ({
		group: "permissions",
		Message: () => i18n("AdminRecentActionMessage.DefaultBannedRightsChanged"),
		ExpandableContent: () => {
			const diff = diffFlags(action.prev_banned_rights?.pFlags, action.new_banned_rights?.pFlags);
			return createComponent(LogDiff, {
				get removed() {
					return diff.new.map((key) => participantRightsMap[key]).filter(Boolean).map((key) => i18n(key));
				},
				get added() {
					return diff.old.map((key) => participantRightsMap[key]).filter(Boolean).map((key) => i18n(key));
				}
			});
		}
	}),
	"channelAdminLogEventActionStopPoll": ({ channelId, action }) => ({
		group: "messages",
		Message: () => i18n("AdminRecentActionMessage.PollStopped"),
		ExpandableContent: () => createComponent(PreviewMessageButtons, {
			channelId,
			get removed() {
				return action.message;
			},
			removedKey: "AdminRecentActions.ViewStopped"
		})
	}),
	"channelAdminLogEventActionChangeLinkedChat": ({ action }) => ({
		group: "links",
		Message: () => i18n("AdminRecentActionMessage.ChangeLinkedChat"),
		ExpandableContent: () => {
			const { PeerTitleTsx } = useHotReloadGuard();
			return createComponent(KeyValuePair, {
				get label() {
					return createComponent(I18nTsx, { key: "DiscussionController.Channel.Title" });
				},
				get value() {
					return memo(() => !!action.new_value)() ? createComponent(PeerTitleTsx, {
						get peerId() {
							return action.new_value.toPeerId(true);
						},
						limitSymbols: 32
					}) : i18n("AdminRecentActions.Disabled");
				}
			});
		}
	}),
	"channelAdminLogEventActionChangeLocation": ({ isBroadcast, action }) => ({
		group: "location",
		Message: () => i18n(isBroadcast ? "AdminRecentActionMessage.ChangeLocationChannel" : "AdminRecentActionMessage.ChangeLocationGroup"),
		ExpandableContent: () => {
			const prevLocation = action.prev_value?._ === "channelLocation" ? action.prev_value : void 0;
			const newLocation = action.new_value?._ === "channelLocation" ? action.new_value : void 0;
			return createComponent(LogDiff, {
				get added() {
					return newLocation?.address;
				},
				get removed() {
					return prevLocation?.address;
				}
			});
		}
	}),
	"channelAdminLogEventActionToggleSlowMode": ({ action }) => ({
		group: "permissions",
		Message: () => i18n("AdminRecentActionMessage.ToggleSlowMode"),
		ExpandableContent: () => createComponent(KeyValuePair, {
			get label() {
				return createComponent(I18nTsx, { key: "AdminRecentActions.SlowModeDuration" });
			},
			get value() {
				return memo(() => !!action.new_value)() ? wrapFormattedDuration(formatDuration(action.new_value)) : i18n("AdminRecentActions.Disabled");
			}
		})
	}),
	"channelAdminLogEventActionStartGroupCall": () => ({
		group: "calls",
		Message: () => i18n("AdminRecentActionMessage.StartGroupCall")
	}),
	"channelAdminLogEventActionDiscardGroupCall": () => ({
		group: "calls",
		Message: () => i18n("AdminRecentActionMessage.DiscardGroupCall")
	}),
	"channelAdminLogEventActionParticipantMute": ({ action }) => ({
		group: "calls",
		Message: () => i18n("AdminRecentActionMessage.ParticipantMuted"),
		ExpandableContent: () => createComponent(ParticipantKeyValue, { get peerId() {
			return getPeerId(action.participant?.peer);
		} })
	}),
	"channelAdminLogEventActionParticipantUnmute": ({ action }) => ({
		group: "calls",
		Message: () => i18n("AdminRecentActionMessage.ParticipantUnmuted"),
		ExpandableContent: () => createComponent(ParticipantKeyValue, { get peerId() {
			return getPeerId(action.participant?.peer);
		} })
	}),
	"channelAdminLogEventActionToggleGroupCallSetting": ({ action }) => ({
		group: "calls",
		Message: () => i18n("AdminRecentActionMessage.ToggleGroupCallSetting"),
		ExpandableContent: () => createComponent(BooleanKeyValue, {
			get label() {
				return createComponent(I18nTsx, { key: "AdminRecentActions.JoinMuted" });
			},
			get value() {
				return action.join_muted;
			}
		})
	}),
	"channelAdminLogEventActionParticipantJoinByInvite": ({ action }) => ({
		group: "join",
		Message: () => i18n("AdminRecentActionMessage.ParticipantJoinedByInvite"),
		ExpandableContent: () => createComponent(InviteKeyValue, { get invite() {
			return action.invite;
		} })
	}),
	"channelAdminLogEventActionExportedInviteDelete": ({ action }) => ({
		group: "invites",
		Message: () => i18n("AdminRecentActionMessage.ExportedInviteDeleted"),
		ExpandableContent: () => createComponent(InviteKeyValue, { get invite() {
			return action.invite;
		} })
	}),
	"channelAdminLogEventActionExportedInviteRevoke": ({ action }) => ({
		group: "invites",
		Message: () => i18n("AdminRecentActionMessage.ExportedInviteRevoked"),
		ExpandableContent: () => createComponent(InviteKeyValue, { get invite() {
			return action.invite;
		} })
	}),
	"channelAdminLogEventActionExportedInviteEdit": ({ action }) => ({
		group: "invites",
		Message: () => i18n("AdminRecentActionMessage.ExportedInviteEdited"),
		ExpandableContent: () => createComponent(InviteKeyValue, { get invite() {
			return action.new_invite;
		} })
	}),
	"channelAdminLogEventActionParticipantVolume": ({ action }) => ({
		group: "calls",
		Message: () => i18n("AdminRecentActionMessage.ParticipantVolumeChanged"),
		ExpandableContent: () => createComponent(ParticipantKeyValue, { get peerId() {
			return getPeerId(action.participant?.peer);
		} })
	}),
	"channelAdminLogEventActionChangeHistoryTTL": ({ action }) => ({
		group: "messages",
		Message: () => i18n("AdminRecentActionMessage.ChangeHistoryTTL"),
		ExpandableContent: () => createComponent(KeyValuePair, {
			get label() {
				return createComponent(I18nTsx, { key: "AdminRecentActions.AutoDeleteTimer" });
			},
			get value() {
				return memo(() => !!action.new_value)() ? wrapFormattedDuration(formatDuration(action.new_value)) : i18n("AdminRecentActions.Disabled");
			}
		})
	}),
	"channelAdminLogEventActionParticipantJoinByRequest": ({ action }) => ({
		group: "participants",
		Message: () => i18n(action.invite._ === "chatInvitePublicJoinRequests" ? "AdminRecentActionMessage.ParticipantJoinedByPublicRequest" : "AdminRecentActionMessage.ParticipantJoinedByRequest"),
		ExpandableContent: () => [createComponent(InviteKeyValue, { get invite() {
			return action.invite;
		} }), createComponent(ParticipantKeyValue, {
			get label() {
				return i18n("AdminRecentActions.ApprovedBy");
			},
			get peerId() {
				return action.approved_by.toPeerId();
			}
		})]
	}),
	"channelAdminLogEventActionToggleNoForwards": ({ action }) => ({
		group: "permissions",
		Message: () => action.new_value ? i18n("AdminRecentActionMessage.ToggleNoForwardsEnabled") : i18n("AdminRecentActionMessage.ToggleNoForwardsDisabled")
	}),
	"channelAdminLogEventActionSendMessage": ({ action, channelId }) => ({
		group: "messages",
		Message: () => i18n("AdminRecentActionMessage.MessageSent"),
		ExpandableContent: () => createComponent(PreviewMessageButtons, {
			channelId,
			get added() {
				return action.message;
			},
			addedKey: "AdminRecentActions.ViewSentMessage"
		})
	}),
	"channelAdminLogEventActionChangeAvailableReactions": () => ({
		group: "reactions",
		Message: () => i18n("AdminRecentActionMessage.ChangeAvailableReactions")
	}),
	"channelAdminLogEventActionChangeUsernames": () => ({
		group: "identity",
		Message: () => i18n("AdminRecentActionMessage.ChangeUsernames")
	}),
	"channelAdminLogEventActionToggleForum": ({ action }) => ({
		group: "forum",
		Message: () => i18n("AdminRecentActionMessage.ToggleForum"),
		ExpandableContent: () => createComponent(BooleanKeyValue, { get value() {
			return action.new_value;
		} })
	}),
	"channelAdminLogEventActionCreateTopic": ({ action }) => ({
		group: "topics",
		Message: () => i18n("AdminRecentActionMessage.TopicCreated"),
		ExpandableContent: () => createComponent(LogDiff, { get added() {
			return createComponent(TopicName, { get topic() {
				return action.topic;
			} });
		} })
	}),
	"channelAdminLogEventActionEditTopic": ({ action }) => ({
		group: "topics",
		Message: () => i18n("AdminRecentActionMessage.TopicEdited"),
		ExpandableContent: () => createComponent(LogDiff, {
			get added() {
				return createComponent(TopicName, { get topic() {
					return action.new_topic;
				} });
			},
			get removed() {
				return createComponent(TopicName, { get topic() {
					return action.prev_topic;
				} });
			}
		})
	}),
	"channelAdminLogEventActionDeleteTopic": ({ action }) => ({
		group: "topics",
		Message: () => i18n("AdminRecentActionMessage.TopicDeleted"),
		ExpandableContent: () => createComponent(LogDiff, { get removed() {
			return createComponent(TopicName, { get topic() {
				return action.topic;
			} });
		} })
	}),
	"channelAdminLogEventActionPinTopic": ({ action }) => ({
		group: "topics",
		Message: () => i18n(action.new_topic ? "AdminRecentActionMessage.TopicPinned" : "AdminRecentActionMessage.TopicUnpinned"),
		ExpandableContent: () => createComponent(LogDiff, {
			get added() {
				return memo(() => !!action.new_topic)() ? createComponent(TopicName, { get topic() {
					return action.new_topic;
				} }) : void 0;
			},
			get removed() {
				return memo(() => !!action.prev_topic)() ? createComponent(TopicName, { get topic() {
					return action.prev_topic;
				} }) : void 0;
			}
		})
	}),
	"channelAdminLogEventActionToggleAntiSpam": ({ action }) => ({
		group: "permissions",
		Message: () => i18n("AdminRecentActionMessage.ToggleAntiSpam"),
		ExpandableContent: () => createComponent(BooleanKeyValue, { get value() {
			return action.new_value;
		} })
	}),
	"channelAdminLogEventActionChangePeerColor": () => ({
		group: "appearance",
		Message: () => i18n("AdminRecentActionMessage.ChangePeerColor")
	}),
	"channelAdminLogEventActionChangeProfilePeerColor": () => ({
		group: "appearance",
		Message: () => i18n("AdminRecentActionMessage.ChangeProfilePeerColor")
	}),
	"channelAdminLogEventActionChangeWallpaper": () => ({
		group: "appearance",
		Message: () => i18n("AdminRecentActionMessage.ChangeWallpaper")
	}),
	"channelAdminLogEventActionChangeEmojiStatus": () => ({
		group: "appearance",
		Message: () => i18n("AdminRecentActionMessage.ChangeEmojiStatus")
	}),
	"channelAdminLogEventActionChangeEmojiStickerSet": () => ({
		group: "appearance",
		Message: () => i18n("AdminRecentActionMessage.ChangeEmojiStickerSet")
	}),
	"channelAdminLogEventActionToggleSignatureProfiles": ({ action }) => ({
		group: "identity",
		Message: () => i18n("AdminRecentActionMessage.ToggleSignatureProfiles"),
		ExpandableContent: () => createComponent(BooleanKeyValue, { get value() {
			return action.new_value;
		} })
	}),
	"channelAdminLogEventActionParticipantSubExtend": ({ action }) => ({
		group: "participants",
		Message: () => i18n("AdminRecentActionMessage.ParticipantSubscriptionExtended"),
		ExpandableContent: () => createComponent(ParticipantKeyValue, { get peerId() {
			return getParticipantPeerId(action.new_participant);
		} })
	}),
	"channelAdminLogEventActionToggleAutotranslation": ({ action }) => ({
		group: "translations",
		Message: () => i18n("AdminRecentActionMessage.ToggleAutoTranslation"),
		ExpandableContent: () => createComponent(BooleanKeyValue, { get value() {
			return action.new_value;
		} })
	}),
	"channelAdminLogEventActionParticipantEditRank": ({ action }) => ({
		group: "permissions",
		Message: () => i18n("AdminRecentActionMessage.ChangeRank")
	})
};
var resolveLogEntry = ({ channelId, event, isBroadcast, isForum }) => {
	const resolver = logEntriesMap[event.action._];
	if (!resolver) return null;
	return resolver({
		channelId,
		action: event.action,
		isBroadcast,
		isForum
	});
};
var groupToIconMap = {
	info: "info",
	identity: "username",
	media: "image",
	permissions: "permissions",
	messages: "message",
	participants: "group",
	join: "adduser",
	invites: "link",
	leave: "deleteuser",
	links: "link",
	location: "location",
	calls: "phone",
	topics: "topics",
	appearance: "brush",
	reactions: "reactions",
	forum: "comments",
	translations: "language",
	pinned: "pin",
	other: "more"
};
var logEntry_module_default = {
	Container: "_Container_175yv_2",
	Header: "_Header_175yv_20",
	Group: "_Group_175yv_27",
	Icon: "_Icon_175yv_32",
	NameRow: "_NameRow_175yv_38",
	PeerTitle: "_PeerTitle_175yv_44",
	PeerTitleText: "_PeerTitleText_175yv_55",
	PeerTitleTextClickArea: "_PeerTitleTextClickArea_175yv_62",
	Message: "_Message_175yv_79",
	"Date": "_Date_175yv_90",
	ExpandableContent: "_ExpandableContent_175yv_103",
	ExpandableContentWrapper: "_ExpandableContentWrapper_175yv_109",
	ExpandableContentTitle: "_ExpandableContentTitle_175yv_112",
	ExpandableContentSpace: "_ExpandableContentSpace_175yv_115"
};
//#endregion
//#region src/components/sidebarRight/tabs/adminRecentActions/logEntry.tsx
var _tmpl$$2 = /*#__PURE__*/ template(`<div>`);
var _tmpl$2 = /*#__PURE__*/ template(`<div><div>`);
var _tmpl$3 = /*#__PURE__*/ template(`<div><div><div>`);
var _tmpl$4 = /*#__PURE__*/ template(`<div><div><div><div></div></div><div>`);
var LogEntry = (props) => {
	const [hasRunningAnimations, setHasRunningAnimations] = createSignal(false);
	return (() => {
		var _el$ = _tmpl$4(), _el$2 = _el$.firstChild, _el$3 = _el$2.firstChild, _el$4 = _el$3.firstChild, _el$8 = _el$3.nextSibling;
		_el$.$$click = (e) => {
			if (e.target.closest(".interactable")) return;
			!hasRunningAnimations() && props.onExpandedChange?.(!props.expanded);
		};
		insert(_el$2, createComponent(Dynamic, {
			get component() {
				return Modes.a11y && props.onExpandedChange ? "button" : "div";
			},
			get type() {
				return Modes.a11y && props.onExpandedChange ? "button" : void 0;
			},
			get ["class"]() {
				return logEntry_module_default.Icon;
			},
			get ["aria-label"]() {
				return memo(() => !!props.onExpandedChange)() ? langPack_default.format("AccDescr.LogEntryDetails", true) : void 0;
			},
			get ["aria-expanded"]() {
				return memo(() => !!props.onExpandedChange)() ? !!props.expanded : void 0;
			},
			get children() {
				return createComponent(IconTsx, { get icon() {
					return props.icon;
				} });
			}
		}), _el$3);
		insert(_el$4, createComponent(Dynamic, {
			get component() {
				return Modes.a11y && props.onPeerTitleClick ? "button" : "div";
			},
			get type() {
				return Modes.a11y && props.onPeerTitleClick ? "button" : void 0;
			},
			get ["class"]() {
				return `${logEntry_module_default.PeerTitleText} interactable`;
			},
			get onClick() {
				return props.onPeerTitleClick;
			},
			get children() {
				return [(() => {
					var _el$5 = _tmpl$$2();
					createRenderEffect(() => className(_el$5, logEntry_module_default.PeerTitleTextClickArea));
					return _el$5;
				})(), memo(() => props.peerTitle)];
			}
		}));
		insert(_el$3, createComponent(HeightTransition, {
			onRunningAnimations: (value) => setHasRunningAnimations(!!value),
			get children() {
				return createComponent(Show, {
					get when() {
						return !props.expanded;
					},
					get children() {
						var _el$6 = _tmpl$2(), _el$7 = _el$6.firstChild;
						insert(_el$7, () => props.message);
						createRenderEffect(() => className(_el$7, logEntry_module_default.Message));
						return _el$6;
					}
				});
			}
		}), null);
		insert(_el$8, () => formatDate(props.date, {
			withTime: true,
			shortMonth: true
		}));
		insert(_el$, createComponent(HeightTransition, {
			scale: true,
			get children() {
				return createComponent(Show, {
					get when() {
						return props.expanded;
					},
					get children() {
						var _el$9 = _tmpl$3(), _el$0 = _el$9.firstChild, _el$1 = _el$0.firstChild;
						insert(_el$1, () => props.message);
						insert(_el$0, createComponent(Show, {
							get when() {
								return props.expandableContent;
							},
							get children() {
								return [(() => {
									var _el$10 = _tmpl$$2();
									createRenderEffect(() => className(_el$10, logEntry_module_default.ExpandableContentSpace));
									return _el$10;
								})(), memo(() => props.expandableContent)];
							}
						}), null);
						createRenderEffect((_p$) => {
							var _v$ = logEntry_module_default.ExpandableContentWrapper, _v$2 = logEntry_module_default.ExpandableContent, _v$3 = logEntry_module_default.ExpandableContentTitle;
							_v$ !== _p$.e && className(_el$9, _p$.e = _v$);
							_v$2 !== _p$.t && className(_el$0, _p$.t = _v$2);
							_v$3 !== _p$.a && className(_el$1, _p$.a = _v$3);
							return _p$;
						}, {
							e: void 0,
							t: void 0,
							a: void 0
						});
						return _el$9;
					}
				});
			}
		}), null);
		createRenderEffect((_p$) => {
			var _v$4 = logEntry_module_default.Container, _v$5 = logEntry_module_default.Header, _v$6 = logEntry_module_default.Group, _v$7 = logEntry_module_default.PeerTitle, _v$8 = logEntry_module_default.Date;
			_v$4 !== _p$.e && className(_el$, _p$.e = _v$4);
			_v$5 !== _p$.t && className(_el$2, _p$.t = _v$5);
			_v$6 !== _p$.a && className(_el$3, _p$.a = _v$6);
			_v$7 !== _p$.o && className(_el$4, _p$.o = _v$7);
			_v$8 !== _p$.i && className(_el$8, _p$.i = _v$8);
			return _p$;
		}, {
			e: void 0,
			t: void 0,
			a: void 0,
			o: void 0,
			i: void 0
		});
		return _el$;
	})();
};
delegateEvents(["click"]);
var noActionsPlaceholder_module_default = {
	Overlay: "_Overlay_1amcu_1",
	Container: "_Container_1amcu_10",
	Icon: "_Icon_1amcu_22",
	Title: "_Title_1amcu_27"
};
//#endregion
//#region src/components/sidebarRight/tabs/adminRecentActions/noActionsPlaceholder.tsx
var _tmpl$$1 = /*#__PURE__*/ template(`<div><div><div></div><div>`);
var NoActionsPlaceholder = (props) => {
	return (() => {
		var _el$ = _tmpl$$1(), _el$2 = _el$.firstChild, _el$3 = _el$2.firstChild, _el$4 = _el$3.nextSibling;
		insert(_el$2, createComponent(IconTsx, {
			icon: "clipboard",
			get ["class"]() {
				return noActionsPlaceholder_module_default.Icon;
			}
		}), _el$3);
		insert(_el$3, createComponent(I18nTsx, { get key() {
			return props.forFilters ? "AdminRecentActionsPlaceholder.WithFilterTitle" : "AdminRecentActionsPlaceholder.Title";
		} }));
		insert(_el$4, createComponent(I18nTsx, { get key() {
			return props.forFilters ? "AdminRecentActionsPlaceholder.WithFilterDescription" : "AdminRecentActionsPlaceholder.Description";
		} }));
		createRenderEffect((_p$) => {
			var _v$ = noActionsPlaceholder_module_default.Overlay, _v$2 = noActionsPlaceholder_module_default.Container, _v$3 = noActionsPlaceholder_module_default.Title;
			_v$ !== _p$.e && className(_el$, _p$.e = _v$);
			_v$2 !== _p$.t && className(_el$2, _p$.t = _v$2);
			_v$3 !== _p$.a && className(_el$3, _p$.a = _v$3);
			return _p$;
		}, {
			e: void 0,
			t: void 0,
			a: void 0
		});
		return _el$;
	})();
};
var styles_module_default = {
	IconsFlex: "_IconsFlex_1utce_1",
	Item: "_Item_1utce_6",
	hidden: "_hidden_1utce_14",
	absolute: "_absolute_1utce_18"
};
//#endregion
//#region src/components/sidebarRight/tabs/adminRecentActions/index.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div>`);
var fetchLimit = 30;
var fetchThrottleTimeout = 200;
var maxBatchSize = 20;
var itemSizeEstimate = 70;
var itemSizeEstimateExpanded = 120;
var animateInDuration = 200;
var staggerDelay = 20;
var staggerDelayExpanded = 50;
var reAnimateDelay = 120;
var thumbUpdateDebounceTimeout = 100;
var AdminRecentActionsTab = () => {
	const { rootScope, PeerTitleTsx, apiManagerProxy, appImManager, ChatType, I18n } = useHotReloadGuard();
	const [tab] = useSuperTab();
	const isForum = apiManagerProxy.isForum(tab.payload.channelId.toPeerId(true));
	let shouldAnimateIn = true, isQueuedUnsettingShouldAnimate = false, isFirstAnimation = true, reachedTheEnd = false, savedScrollTop = 0;
	const [isFiltersOpen, setIsFiltersOpen] = createSignal(false);
	const [committedFilters, setCommittedFilters] = createSignal(null);
	const [cachedAreAllExpanded, setCachedAreAllExpanded] = createSignal(true);
	const [toggledLogs, setToggledLogs] = createSetSignal();
	const [logs, setLogs] = createSignal([]);
	const fetchLogs = (offsetId) => rootScope.managers.appChatsManager.getAdminLogs({
		channelId: tab.payload.channelId,
		search: committedFilters()?.search,
		admins: committedFilters()?.admins,
		flags: committedFilters()?.flags,
		limit: fetchLimit,
		offsetId
	}).then(({ items }) => items);
	const [initialLogs] = createResource(() => committedFilters() || {}, () => fetchLogs());
	const areAllExpanded = createMemo(() => cachedAreAllExpanded() && !toggledLogs().size);
	const isExpanded = createSelector(() => [cachedAreAllExpanded(), toggledLogs()], (log, [cachedAreAllExpanded, toggledLogs]) => {
		return cachedAreAllExpanded ? !toggledLogs.has(log) : toggledLogs.has(log);
	});
	createComputed(() => {
		shouldAnimateIn = true;
		isQueuedUnsettingShouldAnimate = false;
		reachedTheEnd = false;
		batch(() => {
			setLogs(initialLogs() || []);
			setToggledLogs(/* @__PURE__ */ new Set());
		});
		savedScrollTop = tab.scrollable.container.scrollTop;
		tab.scrollable.container.scrollTop = 0;
	});
	const fetchMore = asyncThrottle(async () => {
		if (initialLogs.loading || reachedTheEnd) return;
		const lastLog = lastItem(logs());
		if (!lastLog) return;
		const newLogs = await fetchLogs(lastLog.id);
		if (!newLogs.length) {
			reachedTheEnd = true;
			return;
		}
		const newLogsIds = new Set(newLogs.map((log) => String(log.id)));
		setLogs([...logs().filter((log) => !newLogsIds.has(String(log.id))), ...newLogs]);
	}, fetchThrottleTimeout);
	const updateThumb = debounce(() => {
		tab.scrollable.updateThumb();
	}, thumbUpdateDebounceTimeout);
	const onAllToggle = () => {
		const value = areAllExpanded();
		batch(() => {
			setCachedAreAllExpanded(!value);
			setToggledLogs(/* @__PURE__ */ new Set());
		});
	};
	const onToggle = (log) => {
		batch(() => {
			setToggledLogs((prev) => {
				const set = new Set(prev);
				set.has(log) ? set.delete(log) : set.add(log);
				return set;
			});
			if (toggledLogs().size === logs().length) {
				setCachedAreAllExpanded(!cachedAreAllExpanded());
				setToggledLogs(/* @__PURE__ */ new Set());
			}
		});
	};
	const onChatView = () => {
		setAppSettings("logsDiffView", false);
		tab.close();
		appImManager.setInnerPeer({
			peerId: tab.payload.channelId.toPeerId(true),
			type: ChatType.Logs
		});
	};
	const onNearBottom = () => {
		fetchMore();
		updateThumb();
	};
	return [
		createComponent(Portal, {
			get mount() {
				return tab.header;
			},
			get children() {
				var _el$ = _tmpl$();
				insert(_el$, createComponent(Transition, {
					name: "fade",
					mode: "outin",
					get children() {
						return createComponent(Show, {
							get when() {
								return logs().length;
							},
							get children() {
								return createComponent(ExpandToggleButton, {
									get expanded() {
										return areAllExpanded();
									},
									onClick: onAllToggle
								});
							}
						});
					}
				}), null);
				insert(_el$, createComponent(Transition, {
					name: "fade",
					mode: "outin",
					get children() {
						return createComponent(Show, {
							get when() {
								return logs().length || committedFilters();
							},
							get children() {
								return createComponent(ButtonIconTsx, {
									icon: "filter",
									get ["aria-label"]() {
										return I18n.format("AdminRecentActionsFilters.ByType", true);
									},
									onClick: () => setIsFiltersOpen(!isFiltersOpen())
								});
							}
						});
					}
				}), null);
				insert(_el$, createComponent(ButtonIconTsx, {
					icon: "message",
					get ["aria-label"]() {
						return I18n.format("SavedViewAsMessages", true);
					},
					onClick: onChatView
				}), null);
				createRenderEffect(() => className(_el$, styles_module_default.IconsFlex));
				return _el$;
			}
		}),
		createComponent(Portal, {
			get mount() {
				return tab.content;
			},
			get children() {
				return createComponent(Filters, {
					get channelId() {
						return tab.payload.channelId;
					},
					get isBroadcast() {
						return tab.payload.isBroadcast;
					},
					get open() {
						return isFiltersOpen();
					},
					onClose: () => setIsFiltersOpen(false),
					get committedFilters() {
						return committedFilters();
					},
					onCommit: setCommittedFilters
				});
			}
		}),
		createComponent(Transition, {
			name: "fade-2",
			onExit: (_el, done) => {
				const el = _el;
				el.classList.add(styles_module_default.absolute);
				el.style.transform = `translateY(${-savedScrollTop}px)`;
				pause(200).then(done);
			},
			onAfterExit: () => {
				tab.scrollable.updateThumb();
			},
			get children() {
				return [createComponent(Show, {
					get when() {
						return memo(() => initialLogs.state === "ready")() && initialLogs()?.length === 0;
					},
					get children() {
						return createComponent(NoActionsPlaceholder, { get forFilters() {
							return !!committedFilters();
						} });
					}
				}), createComponent(Show, {
					keyed: true,
					get when() {
						return memo(() => !!logs().length)() ? initialLogs() : false;
					},
					get children() {
						return createComponent(DynamicVirtualList, {
							get list() {
								return logs();
							},
							measureElementHeight: (el) => el.offsetHeight,
							estimateItemHeight: () => cachedAreAllExpanded() ? itemSizeEstimateExpanded : itemSizeEstimate,
							maxBatchSize,
							get scrollable() {
								return tab.scrollable.container;
							},
							onNearBottom,
							verticalPadding: 8,
							renderAtLeastFromBottom: ({ clientHeight }) => Math.ceil(clientHeight / itemSizeEstimate),
							Item: (props) => {
								let ref;
								const log = createMemo(() => props.payload);
								const entry = createMemo(() => resolveLogEntry({
									channelId: tab.payload.channelId,
									event: log(),
									isBroadcast: tab.payload.isBroadcast,
									isForum
								}));
								const areAnimationsAvailable = liteMode.isAvailable("animations");
								const [forceHide, setForceHide] = createSignal(areAnimationsAvailable && shouldAnimateIn);
								if (shouldAnimateIn && areAnimationsAvailable) {
									onMount(() => {
										ref?.animate({
											opacity: [0, 1],
											...liteMode.isAvailable("motion") && { transform: ["translateY(-4px)", "translateY(0)"] }
										}, {
											duration: animateInDuration,
											delay: props.idx * (cachedAreAllExpanded() ? staggerDelayExpanded : staggerDelay) + (!isFirstAnimation ? reAnimateDelay : 0)
										}).finished.then(() => {
											setForceHide(false);
										});
									});
									if (!isQueuedUnsettingShouldAnimate) {
										isQueuedUnsettingShouldAnimate = true;
										queueMicrotask(() => {
											shouldAnimateIn = false;
											isFirstAnimation = false;
										});
									}
								}
								return (() => {
									var _el$2 = _tmpl$();
									use((el) => {
										ref = el;
										if (props.ref instanceof Function) props.ref(el);
									}, _el$2);
									insert(_el$2, createComponent(Show, {
										get when() {
											return entry();
										},
										get children() {
											return createComponent(LogEntry, {
												get peerTitle() {
													return createComponent(PeerTitleTsx, {
														get peerId() {
															return log().user_id.toPeerId();
														},
														limitSymbols: 32
													});
												},
												get message() {
													return createComponent(Dynamic, { get component() {
														return entry().Message;
													} });
												},
												get date() {
													return /* @__PURE__ */ new Date(log().date * 1e3);
												},
												get icon() {
													return groupToIconMap[entry().group];
												},
												onExpandedChange: () => onToggle(log()),
												get expanded() {
													return isExpanded(log());
												},
												get expandableContent() {
													return memo(() => !!entry().ExpandableContent)() && createComponent(ErrorBoundary, {
														fallback: [],
														get children() {
															return createComponent(Dynamic, { get component() {
																return entry().ExpandableContent;
															} });
														}
													});
												},
												get onPeerTitleClick() {
													return useParticipantClickHandler(log().user_id.toPeerId());
												}
											});
										}
									}));
									createRenderEffect((_p$) => {
										var _v$ = styles_module_default.Item, _v$2 = { [styles_module_default.hidden]: forceHide() || props.isMeasuring }, _v$3 = `${props.offset}px`, _v$4 = `${props.translation}px`;
										_v$ !== _p$.e && className(_el$2, _p$.e = _v$);
										_p$.t = classList(_el$2, _v$2, _p$.t);
										_v$3 !== _p$.a && setStyleProperty(_el$2, "--top", _p$.a = _v$3);
										_v$4 !== _p$.o && setStyleProperty(_el$2, "--translation", _p$.o = _v$4);
										return _p$;
									}, {
										e: void 0,
										t: void 0,
										a: void 0,
										o: void 0
									});
									return _el$2;
								})();
							}
						});
					}
				})];
			}
		})
	];
};
//#endregion
export { AdminRecentActionsTab as default };
