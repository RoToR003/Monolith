//# allFunctionsCalledOnLoad
import { C as createSignal, M as onCleanup, R as useContext, b as createResource, g as createEffect, o as Match, p as createComponent, s as Show, u as Switch, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { t as bindActiveWindowListener } from "./appWindow-bo-KtJhy.js";
import { n as bindManagersToSession } from "./bindManagersToAccount-BL82O9H9.js";
import { t as cancelEvent } from "./cancelEvent-Cw8vYZHp.js";
import { _ as use, c as insert, g as template, o as className, s as delegateEvents, u as memo } from "./web-BPyQozky.js";
import { r as useHotReloadGuard } from "./hotReloadGuard-BUNVkeQ4.js";
import { n as hotReloadGuard, t as SolidJSHotReloadGuardProvider } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { w as getCodeBlockClickTarget } from "./renderer-L80wjxct.js";
import { t as ripple } from "./ripple-D7hcIc_t.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
import { t as I18nTsx } from "./i18n-CGMFiAW0.js";
import { t as Button } from "./buttonTsx-Bwphkm9r.js";
import { t as Scrollable } from "./scrollable2-Bau9Hoih.js";
import { i as createPopup, n as PopupElement, t as PopupContext } from "./indexTsx-v9mB9bAq.js";
import { o as createMiddleware } from "./sticker-5twBOy1Y.js";
import { t as requestRAF } from "./requestRAF-CwdYaVwH.js";
import { t as Transition } from "./transition-Cmlc134D.js";
import { t as TransitionGroup } from "./transitionGroup-yCGzBwpt.js";
import { T as richMessageToPage, u as flattenRichMessageContent } from "./canPollPeerStories-D3HoBvLX.js";
import { Lt as Skeleton, Ot as toastCopyRestricted } from "./appDialogsManager-CXguiKc3.js";
import { C as ButtonIconTsx } from "./openEditors-7FmA7q_V.js";
import { r as toastNew } from "./toast-B6VD5M7R.js";
import { t as useObserveResize } from "./useObserveResize-C3AyElRi.js";
import { r as copyTextToClipboard } from "./clipboard-DzscV-ca.js";
import { t as Space } from "./space-XGOOgiuc.js";
import { r as prepareTextWithEntitiesForCopying } from "./prepareTextWithEntitiesForCopying-CwW8yyp7.js";
import { l as debounce } from "./pickKeys-Ckq7_h-r.js";
import { l as instantViewStyles } from "./instantViewFormatting-sqXAtEbL.js";
import { n as InstantViewBlocks } from "./instantView-BpUJR69w.js";
import { a as previewCard_module_default, r as Original, t as Divider } from "./previewCard-BwZZGFS2.js";
import { t as AutoHeight } from "./autoHeight-CPfajIaf.js";
var bodyContent_module_default = {
	bodyContent: "_bodyContent_1h99r_1",
	scrollable: "_scrollable_1h99r_10",
	scrollableContent: "_scrollableContent_1h99r_15",
	card: "_card_1h99r_20",
	exit: "_exit_1h99r_33",
	footerButtons: "_footerButtons_1h99r_37",
	okButton: "_okButton_1h99r_46"
};
//#endregion
//#region src/components/popups/translate/parts.tsx
var _tmpl$$1 = /*#__PURE__*/ template(`<div><div>`);
var _tmpl$2$1 = /*#__PURE__*/ template(`<div>`);
var _tmpl$3$1 = /*#__PURE__*/ template(`<div dir=auto>`);
var ResultSkeleton = (props) => {
	return createComponent(Skeleton.Div, {
		get ["class"]() {
			return previewCard_module_default.resultSkeleton;
		},
		secondary: true,
		get style() {
			return memo(() => !!props.height)() ? { height: props.height + "px" } : void 0;
		}
	});
};
var Result = (props) => {
	const { rootScope, wrapRichText } = useHotReloadGuard();
	const [translation] = createResource(() => props.language, async (lang) => {
		const managers = bindManagersToSession(rootScope.managers);
		if (props.message?.rich_message) return {
			type: "rich",
			value: await managers.appTranslationsManager.translateRichMessage({
				peerId: props.message.peerId,
				mid: props.message.mid,
				lang
			})
		};
		return {
			type: "text",
			value: await managers.appTranslationsManager.translateText({
				...props.message ? {
					peerId: props.message.peerId,
					mid: props.message.mid
				} : { text: props.textWithEntities },
				lang
			})
		};
	});
	let scrollableRef, scrollableContextRef;
	const [skeletonHeight, setSkeletonHeight] = createSignal();
	createEffect(() => {
		if (translation.state !== "ready" && scrollableRef?.isConnected) setSkeletonHeight(scrollableRef.clientHeight);
	});
	const onCopyClick = async () => {
		if (translation.state !== "ready") return;
		const translated = translation();
		if (!translated?.value) return;
		const textWithEntities = translated.type === "rich" ? flattenRichMessageContent(translated.value) : translated.value;
		const { text, html } = prepareTextWithEntitiesForCopying(textWithEntities);
		try {
			await copyTextToClipboard(text, html, { rethrow: true });
			toastNew({ langPackKey: "TextCopied" });
		} catch {
			toastNew({ langPackKey: "TextCopyFailed" });
		}
	};
	return [(() => {
		var _el$ = _tmpl$$1(), _el$2 = _el$.firstChild;
		insert(_el$2, () => props.title, null);
		insert(_el$2, createComponent(Show, {
			get when() {
				return !props.noCopy;
			},
			get children() {
				return createComponent(ButtonIconTsx, {
					get ["class"]() {
						return previewCard_module_default.copyButton;
					},
					get classList() {
						return { [previewCard_module_default.hidden]: translation.state !== "ready" };
					},
					icon: "copy",
					onClick: onCopyClick
				});
			}
		}), null);
		createRenderEffect((_p$) => {
			var _v$ = previewCard_module_default.resultHeader, _v$2 = previewCard_module_default.resultTitleWrapper;
			_v$ !== _p$.e && className(_el$, _p$.e = _v$);
			_v$2 !== _p$.t && className(_el$2, _p$.t = _v$2);
			return _p$;
		}, {
			e: void 0,
			t: void 0
		});
		return _el$;
	})(), (() => {
		var _el$3 = _tmpl$2$1();
		insert(_el$3, createComponent(Transition, {
			name: "fade-2",
			mode: "outin",
			onAfterEnter: (el) => {
				if (el === scrollableRef) requestRAF(() => {
					scrollableContextRef?.onSizeChange?.();
				});
			},
			get children() {
				return createComponent(Switch, { get children() {
					return [
						createComponent(Match, {
							get when() {
								return memo(() => translation.state === "ready")() && translation();
							},
							keyed: true,
							children: (translated) => createComponent(Scrollable, {
								tabIndex: 0,
								ref(r$) {
									var _ref$ = scrollableRef;
									typeof _ref$ === "function" ? _ref$(r$) : scrollableRef = r$;
								},
								contextRef: (value) => void (scrollableContextRef = value),
								relative: true,
								get ["class"]() {
									return previewCard_module_default.richTextScrollable;
								},
								withBorders: "manual",
								get children() {
									var _el$5 = _tmpl$3$1();
									use((el) => props.wireCaptionClick?.(el), _el$5);
									insert(_el$5, (() => {
										var _c$ = memo(() => translated.type === "rich");
										return () => _c$() ? createComponent(InstantViewBlocks, {
											get webPageId() {
												return props.message.mid;
											},
											get page() {
												return richMessageToPage(translated.value);
											},
											openNewPage: (page) => {
												hotReloadGuard.openInstantViewInAppBrowser({
													cachedPage: page,
													HotReloadGuardProvider: SolidJSHotReloadGuardProvider
												});
											},
											collapse: () => {},
											get ["class"]() {
												return instantViewStyles.RichMessage;
											},
											paddings: 0
										}) : wrapRichText(translated.value.text, {
											textColor: "primary-text-color",
											middleware: createMiddleware().get(),
											entities: translated.value.entities
										});
									})());
									createRenderEffect(() => className(_el$5, classNames(previewCard_module_default.richTextScrollableContent, "spoilers-container")));
									return _el$5;
								}
							})
						}),
						createComponent(Match, {
							get when() {
								return translation.state === "pending" || translation.state === "refreshing";
							},
							get children() {
								return createComponent(ResultSkeleton, { get height() {
									return skeletonHeight();
								} });
							}
						}),
						createComponent(Match, {
							when: true,
							get children() {
								var _el$4 = _tmpl$2$1();
								insert(_el$4, createComponent(I18nTsx, { key: "Translate.Error" }));
								createRenderEffect(() => className(_el$4, previewCard_module_default.error));
								return _el$4;
							}
						})
					];
				} });
			}
		}));
		createRenderEffect(() => className(_el$3, previewCard_module_default.resultContent));
		return _el$3;
	})()];
};
//#endregion
//#region src/components/popups/translate/bodyContent.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div>`);
var _tmpl$2 = /*#__PURE__*/ template(`<div><div>`);
var _tmpl$3 = /*#__PURE__*/ template(`<span>`);
function TranslatePopupBodyContent(props) {
	const options = props.options;
	const deferredCloseCallbacks = props.deferredCloseCallbacks;
	const { usePeerTranslation, pickLanguage, onMediaCaptionClick } = useHotReloadGuard();
	const context = useContext(PopupContext);
	const peerTranslation = usePeerTranslation(options.peerId);
	const [isAppearing, setIsAppearing] = createSignal(true);
	let originalTextWithEntities = options.textWithEntities;
	if (options.message) originalTextWithEntities = options.message.rich_message ? flattenRichMessageContent(options.message.rich_message) : {
		_: "textWithEntities",
		text: options.message.message,
		entities: options.message.totalEntities
	};
	const wireCaptionClick = (div) => {
		const onClick = (e) => {
			const callback = onMediaCaptionClick(div, e);
			if (!callback) return;
			div.removeEventListener("click", onClick, { capture: true });
			deferredCloseCallbacks.push(callback);
			context.hide();
		};
		div.addEventListener("click", onClick, { capture: true });
		onCleanup(() => div.removeEventListener("click", onClick, { capture: true }));
	};
	const keepFromCopying = (div) => {
		if (!options.noForwards) return;
		const refuse = (e) => {
			cancelEvent(e);
			toastCopyRestricted(options.peerId);
		};
		const onCopy = (e) => {
			const selection = div.ownerDocument.getSelection();
			for (let i = 0; i < (selection?.rangeCount ?? 0); ++i) if (selection.getRangeAt(i).intersectsNode(div)) {
				refuse(e);
				return;
			}
		};
		const onCodeCopy = (e) => {
			const codeTarget = getCodeBlockClickTarget(e.target);
			if (codeTarget && !codeTarget.isWrapToggle) refuse(e);
		};
		const unbind = [bindActiveWindowListener((w) => w.document, "copy", onCopy, { capture: true }), bindActiveWindowListener((w) => w.document, "cut", onCopy, { capture: true })];
		div.addEventListener("click", onCodeCopy, { capture: true });
		onCleanup(() => {
			unbind.forEach((callback) => callback());
			div.removeEventListener("click", onCodeCopy, { capture: true });
		});
	};
	const onLanguageClick = () => {
		pickLanguage(false).then((language) => {
			peerTranslation.setLanguage(language);
		});
	};
	const [scrollableEl, setScrollableEl] = createSignal();
	const [scrollableContentEl, setScrollableContentEl] = createSignal();
	let scrollableContextRef;
	const updateScrollable = debounce(() => {
		scrollableContextRef?.onSizeChange();
	}, 100, false, true);
	useObserveResize(scrollableContentEl, updateScrollable);
	useObserveResize(scrollableEl, updateScrollable);
	return (() => {
		var _el$ = _tmpl$2(), _el$3 = _el$.firstChild;
		use(keepFromCopying, _el$);
		insert(_el$, createComponent(Scrollable, {
			tabIndex: 0,
			ref: setScrollableEl,
			get ["class"]() {
				return bodyContent_module_default.scrollable;
			},
			relative: true,
			withBorders: "both",
			contextRef: (value) => void (scrollableContextRef = value),
			get children() {
				var _el$2 = _tmpl$();
				insert(_el$2, createComponent(AutoHeight, {
					ref: setScrollableContentEl,
					get outerClass() {
						return bodyContent_module_default.card;
					},
					overflowHidden: true,
					get children() {
						return createComponent(TransitionGroup, {
							name: "fade-2",
							moveClass: "t-move-std",
							onBeforeExit: (el) => {
								el.classList.add(bodyContent_module_default.exit);
							},
							get children() {
								return [
									createComponent(Original, {
										get title() {
											return createComponent(I18nTsx, {
												key: "AiEditor.TranslateFrom",
												get args() {
													return [createComponent(I18nTsx, { get key() {
														return `Language.${options.detectedLanguage}`;
													} })];
												}
											});
										},
										text: originalTextWithEntities,
										interactive: true,
										wireContent: wireCaptionClick,
										get isAppearing() {
											return isAppearing();
										},
										onMeasured: () => requestRAF(() => setIsAppearing(false))
									}),
									createComponent(Divider, {}),
									createComponent(Result, {
										get message() {
											return options.message;
										},
										get textWithEntities() {
											return options.textWithEntities;
										},
										get language() {
											return peerTranslation.language();
										},
										wireCaptionClick,
										get noCopy() {
											return options.noForwards;
										},
										get title() {
											return createComponent(I18nTsx, {
												get ["class"]() {
													return previewCard_module_default.resultTitle;
												},
												key: "AiEditor.TranslateTo",
												get args() {
													return [(() => {
														var _el$4 = _tmpl$3();
														_el$4.$$click = onLanguageClick;
														use(ripple, _el$4, () => true);
														insert(_el$4, createComponent(I18nTsx, { get key() {
															return `Language.${peerTranslation.language()}`;
														} }));
														createRenderEffect(() => className(_el$4, previewCard_module_default.resultLanguage));
														return _el$4;
													})()];
												}
											});
										}
									})
								];
							}
						});
					}
				}));
				createRenderEffect(() => className(_el$2, bodyContent_module_default.scrollableContent));
				return _el$2;
			}
		}), _el$3);
		insert(_el$, createComponent(Space, { amount: "0.5rem" }), _el$3);
		insert(_el$3, createComponent(Button, {
			get ["class"]() {
				return bodyContent_module_default.okButton;
			},
			primaryFilled: true,
			onClick: () => context.hide(),
			get children() {
				return createComponent(I18nTsx, { key: "OK" });
			}
		}));
		createRenderEffect((_p$) => {
			var _v$ = bodyContent_module_default.bodyContent, _v$2 = bodyContent_module_default.footerButtons;
			_v$ !== _p$.e && className(_el$, _p$.e = _v$);
			_v$2 !== _p$.t && className(_el$3, _p$.t = _v$2);
			return _p$;
		}, {
			e: void 0,
			t: void 0
		});
		return _el$;
	})();
}
delegateEvents(["click"]);
var translate_module_default = {
	popup: "_popup_hgnml_1",
	container: "_container_hgnml_6",
	header: "_header_hgnml_11"
};
//#endregion
//#region src/components/popups/translate/index.tsx
function TranslatePopup(props) {
	const deferredCloseCallbacks = [];
	return createComponent(PopupElement, {
		get ["class"]() {
			return translate_module_default.popup;
		},
		get containerClass() {
			return translate_module_default.container;
		},
		closable: true,
		onCloseAfterTimeout: () => {
			deferredCloseCallbacks.splice(0).forEach((cb) => cb());
		},
		get children() {
			return [createComponent(PopupElement.Header, {
				get ["class"]() {
					return translate_module_default.header;
				},
				get children() {
					return [createComponent(PopupElement.CloseButton, {}), createComponent(PopupElement.Title, { get children() {
						return createComponent(I18nTsx, { key: "Translate" });
					} })];
				}
			}), createComponent(PopupElement.Body, { get children() {
				return createComponent(TranslatePopupBodyContent, {
					get options() {
						return props.options;
					},
					deferredCloseCallbacks
				});
			} })];
		}
	});
}
function openTranslatePopup(options, HotReloadGuard) {
	createPopup(() => createComponent(HotReloadGuard, { get children() {
		return createComponent(TranslatePopup, { options });
	} }));
}
//#endregion
export { openTranslatePopup };
