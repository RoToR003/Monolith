//# allFunctionsCalledOnLoad
import { C as createSignal, M as onCleanup, N as onMount, _ as createMemo, d as batch, g as createEffect, m as createComputed, o as Match, p as createComponent, s as Show, u as Switch, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { _ as use, a as classList, c as insert, g as template, o as className, p as setStyleProperty, r as addEventListener, s as delegateEvents, u as memo } from "./web-BPyQozky.js";
import { r as useHotReloadGuard } from "./hotReloadGuard-BUNVkeQ4.js";
import { t as observeResize } from "./resizeObserver-DddVtfLC.js";
import { t as ripple } from "./ripple-D7hcIc_t.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
import { t as IconTsx } from "./iconTsx-B4lOk4A6.js";
import { t as I18nTsx } from "./i18n-CGMFiAW0.js";
import { t as Scrollable } from "./scrollable2-Bau9Hoih.js";
import { o as createMiddleware } from "./sticker-5twBOy1Y.js";
import { t as requestRAF } from "./requestRAF-CwdYaVwH.js";
import { t as Transition } from "./transition-Cmlc134D.js";
import { M as useIsCleaned } from "./openEditors-7FmA7q_V.js";
import { p as StaticCheckbox } from "./geoPin-BKDcrfIw.js";
var previewCard_module_default = {
	originalHeader: "_originalHeader_ruowg_26",
	clickable: "_clickable_ruowg_38",
	originalArrow: "_originalArrow_ruowg_46",
	originalArrowIcon: "_originalArrowIcon_ruowg_60",
	toggled: "_toggled_ruowg_63",
	originalCheckbox: "_originalCheckbox_ruowg_70",
	originalContent: "_originalContent_ruowg_77",
	collapsible: "_collapsible_ruowg_81",
	collapsed: "_collapsed_ruowg_84",
	originalOverlay: "_originalOverlay_ruowg_87",
	hasTransition: "_hasTransition_ruowg_102",
	originalFakeHeight: "_originalFakeHeight_ruowg_106",
	divider: "_divider_ruowg_110",
	resultHeader: "_resultHeader_ruowg_120",
	resultTitleWrapper: "_resultTitleWrapper_ruowg_133",
	resultTitle: "_resultTitle_ruowg_133",
	resultLanguage: "_resultLanguage_ruowg_145",
	resultContent: "_resultContent_ruowg_161",
	richTextScrollable: "_richTextScrollable_ruowg_168",
	richTextScrollableContent: "_richTextScrollableContent_ruowg_186",
	nonInteractive: "_nonInteractive_ruowg_195",
	resultSkeleton: "_resultSkeleton_ruowg_203",
	emojifyCheckbox: "_emojifyCheckbox_ruowg_208",
	copyButton: "_copyButton_ruowg_230",
	hidden: "_hidden_ruowg_236",
	error: "_error_ruowg_241"
};
//#endregion
//#region src/components/popups/previewCard/index.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div>`);
var _tmpl$2 = /*#__PURE__*/ template(`<div dir=auto>`);
var _tmpl$3 = /*#__PURE__*/ template(`<div><div></div><div>`);
/** Make quotes uncollapsible for previewing */
var processEntities = (entities = []) => {
	return entities.map((entity) => entity._ === "messageEntityBlockquote" ? {
		...entity,
		pFlags: {
			...entity.pFlags,
			collapsed: void 0
		}
	} : entity);
};
var shouldBeCollapsibleFrom = 60;
var Original = (props) => {
	const { wrapRichText } = useHotReloadGuard();
	const [isCollapsed, setIsCollapsed] = createSignal(false);
	const [originalContentHeight, setOriginalContentHeight] = createSignal();
	const [hasOnEmojifyRaffed, setHasOnEmojifyRaffed] = createSignal(!!props.onEmojify);
	const isCollapsible = createMemo(() => originalContentHeight() > shouldBeCollapsibleFrom);
	const isActuallyCollapsible = createMemo(() => isCollapsible() && !hasOnEmojifyRaffed());
	const isActuallyCollapsed = createMemo(() => isCollapsed() && !props.onEmojify);
	let originalContentRef;
	let originalScrollableRef;
	onMount(() => {
		if (!originalContentRef) return;
		const unobserve = observeResize(originalContentRef, () => {
			batch(() => {
				setOriginalContentHeight(originalContentRef.scrollHeight);
				setIsCollapsed(isCollapsible());
				props.onMeasured?.();
			});
			unobserve();
		});
		onCleanup(() => unobserve());
	});
	createComputed(() => {
		if (!props.onEmojify) {
			setHasOnEmojifyRaffed(false);
			return;
		}
		const isCleaned = useIsCleaned();
		requestRAF(() => {
			if (isCleaned()) return;
			setHasOnEmojifyRaffed(true);
		});
	});
	createEffect(() => {
		if (!isActuallyCollapsed() || !originalScrollableRef) return;
		originalScrollableRef.scrollTo({ top: 0 });
	});
	return [
		(() => {
			var _el$ = _tmpl$();
			_el$.$$click = () => isActuallyCollapsible() && setIsCollapsed((p) => !p);
			use(ripple, _el$, () => isActuallyCollapsible());
			insert(_el$, createComponent(Show, {
				get when() {
					return props.title;
				},
				get fallback() {
					return createComponent(I18nTsx, { key: "AiEditor.Original" });
				},
				get children() {
					return props.title;
				}
			}), null);
			insert(_el$, createComponent(Transition, {
				name: "fade-2",
				get children() {
					return createComponent(Switch, { get children() {
						return [createComponent(Match, {
							get when() {
								return props.onEmojify;
							},
							get children() {
								return createComponent(EmojifyCheckbox, {
									get ["class"]() {
										return previewCard_module_default.originalCheckbox;
									},
									checked: false,
									onClick: () => {
										requestRAF(() => {
											props.onEmojify?.();
										});
									}
								});
							}
						}), createComponent(Match, {
							get when() {
								return isActuallyCollapsible();
							},
							get children() {
								var _el$2 = _tmpl$();
								insert(_el$2, createComponent(IconTsx, {
									icon: "arrowhead",
									get ["class"]() {
										return previewCard_module_default.originalArrowIcon;
									}
								}));
								createRenderEffect((_p$) => {
									var _v$ = previewCard_module_default.originalArrow, _v$2 = { [previewCard_module_default.toggled]: isActuallyCollapsed() };
									_v$ !== _p$.e && className(_el$2, _p$.e = _v$);
									_p$.t = classList(_el$2, _v$2, _p$.t);
									return _p$;
								}, {
									e: void 0,
									t: void 0
								});
								return _el$2;
							}
						})];
					} });
				}
			}), null);
			createRenderEffect((_p$) => {
				var _v$3 = previewCard_module_default.originalHeader, _v$4 = { [previewCard_module_default.clickable]: isActuallyCollapsible() };
				_v$3 !== _p$.e && className(_el$, _p$.e = _v$3);
				_p$.t = classList(_el$, _v$4, _p$.t);
				return _p$;
			}, {
				e: void 0,
				t: void 0
			});
			return _el$;
		})(),
		(() => {
			var _el$3 = _tmpl$3(), _el$4 = _el$3.firstChild, _el$6 = _el$4.nextSibling;
			var _ref$ = originalContentRef;
			typeof _ref$ === "function" ? use(_ref$, _el$4) : originalContentRef = _el$4;
			insert(_el$4, createComponent(Scrollable, {
				get tabIndex() {
					return isActuallyCollapsed() ? -1 : 0;
				},
				ref(r$) {
					var _ref$2 = originalScrollableRef;
					typeof _ref$2 === "function" ? _ref$2(r$) : originalScrollableRef = r$;
				},
				get ["class"]() {
					return previewCard_module_default.richTextScrollable;
				},
				relative: true,
				withBorders: "manual",
				get hideThumb() {
					return isActuallyCollapsed();
				},
				get children() {
					var _el$5 = _tmpl$2();
					use((el) => props.wireContent?.(el), _el$5);
					insert(_el$5, () => wrapRichText(props.text.text, {
						textColor: "primary-text-color",
						entities: processEntities(props.text.entities),
						middleware: createMiddleware().get()
					}));
					createRenderEffect(() => className(_el$5, classNames(previewCard_module_default.richTextScrollableContent, !props.interactive && previewCard_module_default.nonInteractive, props.interactive && "spoilers-container")));
					return _el$5;
				}
			}));
			createRenderEffect((_p$) => {
				var _v$5 = previewCard_module_default.originalContent, _v$6 = {
					[previewCard_module_default.collapsible]: isCollapsible(),
					[previewCard_module_default.collapsed]: isActuallyCollapsed()
				}, _v$7 = originalContentHeight() + "px", _v$8 = previewCard_module_default.originalOverlay, _v$9 = { [previewCard_module_default.hasTransition]: !props.isAppearing };
				_v$5 !== _p$.e && className(_el$3, _p$.e = _v$5);
				_p$.t = classList(_el$3, _v$6, _p$.t);
				_v$7 !== _p$.a && setStyleProperty(_el$3, "--original-content-height", _p$.a = _v$7);
				_v$8 !== _p$.o && className(_el$6, _p$.o = _v$8);
				_p$.i = classList(_el$6, _v$9, _p$.i);
				return _p$;
			}, {
				e: void 0,
				t: void 0,
				a: void 0,
				o: void 0,
				i: void 0
			});
			return _el$3;
		})(),
		createComponent(Show, {
			get when() {
				return memo(() => !!isCollapsible())() && !isActuallyCollapsed();
			},
			get children() {
				var _el$7 = _tmpl$();
				createRenderEffect((_p$) => {
					var _v$0 = previewCard_module_default.originalFakeHeight, _v$1 = originalContentHeight() + "px";
					_v$0 !== _p$.e && className(_el$7, _p$.e = _v$0);
					_v$1 !== _p$.t && setStyleProperty(_el$7, "--original-content-height", _p$.t = _v$1);
					return _p$;
				}, {
					e: void 0,
					t: void 0
				});
				return _el$7;
			}
		})
	];
};
var Divider = () => {
	return (() => {
		var _el$8 = _tmpl$();
		createRenderEffect(() => className(_el$8, previewCard_module_default.divider));
		return _el$8;
	})();
};
var EmojifyCheckbox = (props) => {
	return (() => {
		var _el$9 = _tmpl$();
		use(ripple, _el$9, () => true);
		addEventListener(_el$9, "click", props.onClick, true);
		insert(_el$9, createComponent(StaticCheckbox, {
			round: true,
			get checked() {
				return props.checked;
			}
		}), null);
		insert(_el$9, createComponent(I18nTsx, { key: "AiEditor.Emojify" }), null);
		createRenderEffect(() => className(_el$9, classNames(previewCard_module_default.emojifyCheckbox, props.class)));
		return _el$9;
	})();
};
delegateEvents(["click"]);
//#endregion
export { previewCard_module_default as a, processEntities as i, EmojifyCheckbox as n, Original as r, Divider as t };
