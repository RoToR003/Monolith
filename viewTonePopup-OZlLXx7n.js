//# allFunctionsCalledOnLoad
import { C as createSignal, _ as createMemo, b as createResource, d as batch, o as Match, p as createComponent, s as Show, u as Switch, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { _ as use, c as insert, g as template, o as className, s as delegateEvents, u as memo } from "./web-BPyQozky.js";
import { r as useHotReloadGuard } from "./hotReloadGuard-BUNVkeQ4.js";
import { t as ripple } from "./ripple-D7hcIc_t.js";
import { t as IconTsx } from "./iconTsx-B4lOk4A6.js";
import { t as I18nTsx } from "./i18n-CGMFiAW0.js";
import { t as Scrollable } from "./scrollable2-Bau9Hoih.js";
import { i as createPopup, n as PopupElement } from "./indexTsx-v9mB9bAq.js";
import { o as createMiddleware } from "./sticker-5twBOy1Y.js";
import { t as Transition } from "./transition-Cmlc134D.js";
import { Lt as Skeleton, nn as EmojiDocumentIcon } from "./appDialogsManager-CXguiKc3.js";
import { t as MediaHeader } from "./mediaHeader-CnpQNwOl.js";
import { t as Space } from "./space-XGOOgiuc.js";
import { t as createMutation } from "./createMutation-BLuhs8D-.js";
import { t as AutoHeight } from "./autoHeight-CPfajIaf.js";
import { t as tonePopupShell_module_default } from "./tonePopupShell.module-BzcGjn7j.js";
import { n as CreatorLink, t as useMaxSavedTones } from "./limits-BQ7M1Civ.js";
var styles_module_default = {
	popupBody: "_popupBody_1gedd_16",
	header: "_header_1gedd_20",
	emoji: "_emoji_1gedd_24",
	emojiButton: "_emojiButton_1gedd_35",
	description: "_description_1gedd_40",
	comparison: "_comparison_1gedd_45",
	comparisonHeader: "_comparisonHeader_1gedd_50",
	comparisonDivider: "_comparisonDivider_1gedd_60",
	comparisonContent: "_comparisonContent_1gedd_67",
	comparisonContentSkeletonWrapper: "_comparisonContentSkeletonWrapper_1gedd_73",
	comparisonContentSkeleton: "_comparisonContentSkeleton_1gedd_73",
	anotherExampleButton: "_anotherExampleButton_1gedd_81",
	note: "_note_1gedd_101"
};
//#endregion
//#region src/components/popups/aiEditorPopup/viewTonePopup/ViewTonePopup.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div>`);
var _tmpl$2 = /*#__PURE__*/ template(`<div dir=auto>`);
var _tmpl$3 = /*#__PURE__*/ template(`<div><div></div><div></div><div>`);
var ViewTonePopup = (props) => {
	const { rootScope, toastNew, confirmationPopup, wrapRichText, useAppConfig, PeerTitleTsx, appImManager } = useHotReloadGuard();
	const appConfig = useAppConfig();
	const maxNum = () => appConfig.aicompose_tone_examples_num || 3;
	const maxSavedTones = useMaxSavedTones();
	const [show, setShow] = createSignal(true);
	const [docId, setDocId] = createSignal(props.tone.emoji_id);
	const [exampleNum, setExampleNum] = createSignal(props.tone.example_english ? 1 : 0);
	const [canFetch, setCanFetch] = createSignal(exampleNum() === 0);
	const [example] = createResource(() => canFetch() ? exampleNum() : void 0, (num) => rootScope.managers.aiTonesManager.fetchExample(props.tone, num), { initialValue: props.tone.example_english });
	const isCreator = () => props.tone.pFlags.creator;
	const canHaveMoreTones = () => props.savedTones < maxSavedTones();
	const hasFooterButton = createMemo(() => props.isSaved || isCreator() || canHaveMoreTones());
	const getErrorLangKey = () => {
		if (isCreator() || props.isSaved) return "AiEditor.StyleRemoveError";
		return "AiEditor.StyleAddError";
	};
	const getSuccessLangKey = () => {
		if (isCreator() || props.isSaved) return "AiEditor.StyleRemoved";
		return "AiEditor.StyleAdded";
	};
	const mutation = createMutation(() => {
		if (isCreator()) return rootScope.managers.aiTonesManager.deleteTone(props.tone.id);
		if (props.isSaved || canHaveMoreTones()) return rootScope.managers.aiTonesManager.saveTone(props.tone, props.isSaved);
		return Promise.reject();
	}, {
		onError: () => toastNew({ langPackKey: getErrorLangKey() }),
		onSuccess: () => toastNew({ langPackKey: getSuccessLangKey() })
	});
	const onAnotherExample = () => {
		if (exampleNum() >= maxNum()) return;
		batch(() => {
			setExampleNum(exampleNum() + 1);
			setCanFetch(true);
		});
	};
	const onSubmit = async () => {
		if (isCreator()) try {
			await confirmationPopup({
				titleLangKey: "AiEditor.DeleteStyle.Title",
				descriptionLangKey: "AiEditor.DeleteStyle.Description",
				button: {
					langKey: "Delete",
					isDanger: true
				}
			});
		} catch {
			return false;
		}
		await mutation.mutateAsync();
		return true;
	};
	const Content = (props) => {
		return createComponent(AutoHeight, { get children() {
			return createComponent(Transition, {
				name: "fade-2",
				mode: "outin",
				get children() {
					return createComponent(Show, {
						get when() {
							return memo(() => example.state === "ready")() && (props.final ? example().to : example().from);
						},
						get fallback() {
							return (() => {
								var _el$ = _tmpl$();
								insert(_el$, createComponent(Skeleton.Div, {
									secondary: true,
									get ["class"]() {
										return styles_module_default.comparisonContentSkeleton;
									}
								}));
								createRenderEffect(() => className(_el$, styles_module_default.comparisonContentSkeletonWrapper));
								return _el$;
							})();
						},
						keyed: true,
						children: (content) => createComponent(Scrollable, {
							relative: true,
							get ["class"]() {
								return styles_module_default.comparisonContent;
							},
							get children() {
								var _el$2 = _tmpl$2();
								insert(_el$2, () => wrapRichText(content.text, {
									entities: content.entities,
									middleware: createMiddleware().get()
								}));
								return _el$2;
							}
						})
					});
				}
			});
		} });
	};
	return createComponent(PopupElement, {
		get ["class"]() {
			return tonePopupShell_module_default.popup;
		},
		get show() {
			return show();
		},
		get children() {
			return [
				createComponent(PopupElement.Header, { get children() {
					return createComponent(PopupElement.CloseButton, {});
				} }),
				createComponent(PopupElement.Body, {
					get ["class"]() {
						return styles_module_default.popupBody;
					},
					get children() {
						return [
							createComponent(MediaHeader, {
								get ["class"]() {
									return styles_module_default.header;
								},
								get children() {
									return [
										createComponent(Show, {
											get when() {
												return docId();
											},
											keyed: true,
											children: (docId) => createComponent(MediaHeader.Sticker, {
												get ["class"]() {
													return styles_module_default.emojiButton;
												},
												size: 96,
												get element() {
													return (() => {
														var _el$9 = _tmpl$();
														insert(_el$9, createComponent(EmojiDocumentIcon, {
															docId,
															get managers() {
																return rootScope.managers;
															},
															color: "primary-text-color",
															size: 64,
															onFail: () => setDocId()
														}));
														createRenderEffect(() => className(_el$9, styles_module_default.emoji));
														return _el$9;
													})();
												}
											})
										}),
										createComponent(MediaHeader.Title, {
											size: 20,
											get children() {
												return props.tone.title;
											}
										}),
										createComponent(MediaHeader.Subtitle, {
											color: "secondary",
											get ["class"]() {
												return styles_module_default.description;
											},
											get children() {
												return createComponent(I18nTsx, { key: "AiEditor.ViewStyle.Description" });
											}
										})
									];
								}
							}),
							createComponent(Space, { amount: "1rem" }),
							(() => {
								var _el$3 = _tmpl$3(), _el$4 = _el$3.firstChild, _el$6 = _el$4.nextSibling, _el$7 = _el$6.nextSibling;
								insert(_el$4, createComponent(I18nTsx, { key: "AiEditor.ViewStyle.Before" }), null);
								insert(_el$4, createComponent(Transition, {
									name: "fade-2",
									get children() {
										return createComponent(Show, {
											get when() {
												return exampleNum() < maxNum();
											},
											get children() {
												var _el$5 = _tmpl$();
												use(ripple, _el$5, () => true);
												_el$5.$$click = onAnotherExample;
												insert(_el$5, createComponent(IconTsx, { icon: "flip" }), null);
												insert(_el$5, createComponent(I18nTsx, { key: "AiEditor.ViewStyle.AnotherExample" }), null);
												createRenderEffect(() => className(_el$5, styles_module_default.anotherExampleButton));
												return _el$5;
											}
										});
									}
								}), null);
								insert(_el$3, createComponent(Content, {}), _el$6);
								insert(_el$7, createComponent(I18nTsx, { key: "AiEditor.ViewStyle.After" }));
								insert(_el$3, createComponent(Content, { final: true }), null);
								createRenderEffect((_p$) => {
									var _v$ = styles_module_default.comparison, _v$2 = styles_module_default.comparisonHeader, _v$3 = styles_module_default.comparisonDivider, _v$4 = styles_module_default.comparisonHeader;
									_v$ !== _p$.e && className(_el$3, _p$.e = _v$);
									_v$2 !== _p$.t && className(_el$4, _p$.t = _v$2);
									_v$3 !== _p$.a && className(_el$6, _p$.a = _v$3);
									_v$4 !== _p$.o && className(_el$7, _p$.o = _v$4);
									return _p$;
								}, {
									e: void 0,
									t: void 0,
									a: void 0,
									o: void 0
								});
								return _el$3;
							})(),
							createComponent(Space, { amount: "0.75rem" }),
							createComponent(Switch, { get children() {
								return [createComponent(Match, {
									get when() {
										return memo(() => !!!isCreator())() && props.tone.author_id;
									},
									keyed: true,
									children: (authorId) => (() => {
										var _el$0 = _tmpl$();
										insert(_el$0, createComponent(I18nTsx, {
											key: "AiEditor.ViewStyle.CreatedBy",
											get args() {
												return [createComponent(CreatorLink, {
													get peerId() {
														return authorId.toPeerId();
													},
													onClick: () => setShow(false)
												})];
											}
										}));
										createRenderEffect(() => className(_el$0, styles_module_default.note));
										return _el$0;
									})()
								}), createComponent(Match, {
									get when() {
										return memo(() => !!isCreator())() && props.tone.installs_count;
									},
									keyed: true,
									children: (installsCount) => (() => {
										var _el$1 = _tmpl$();
										insert(_el$1, createComponent(I18nTsx, {
											key: "AiEditor.ViewStyle.InstallsCountCreatedByYou",
											get args() {
												return [installsCount.toString()];
											}
										}));
										createRenderEffect(() => className(_el$1, styles_module_default.note));
										return _el$1;
									})()
								})];
							} }),
							createComponent(Show, {
								get when() {
									return !hasFooterButton();
								},
								get children() {
									return [createComponent(Space, { amount: "1rem" }), (() => {
										var _el$8 = _tmpl$();
										insert(_el$8, createComponent(I18nTsx, { key: "AiEditor.ViewStyle.MaxSavedTones" }));
										createRenderEffect(() => className(_el$8, styles_module_default.note));
										return _el$8;
									})()];
								}
							})
						];
					}
				}),
				createComponent(Show, {
					get when() {
						return hasFooterButton();
					},
					get children() {
						return createComponent(PopupElement.Footer, { get children() {
							return createComponent(PopupElement.FooterButton, {
								get disabled() {
									return mutation.isPending();
								},
								get color() {
									return isCreator() || props.isSaved ? "danger" : "primary";
								},
								callback: onSubmit,
								get children() {
									return createComponent(Switch, { get children() {
										return [
											createComponent(Match, {
												get when() {
													return props.isSaved;
												},
												get children() {
													return createComponent(I18nTsx, { key: "AiEditor.ViewStyle.RemoveStyle" });
												}
											}),
											createComponent(Match, {
												get when() {
													return isCreator();
												},
												get children() {
													return createComponent(I18nTsx, { key: "AiEditor.ViewStyle.DeleteStyle" });
												}
											}),
											createComponent(Match, {
												get when() {
													return canHaveMoreTones();
												},
												get children() {
													return createComponent(I18nTsx, { key: "AiEditor.ViewStyle.SaveStyle" });
												}
											})
										];
									} });
								}
							});
						} });
					}
				})
			];
		}
	});
};
delegateEvents(["click"]);
//#endregion
//#region src/components/popups/aiEditorPopup/viewTonePopup/index.tsx
function showViewTonePopup(props) {
	const { HotReloadGuard, ...rest } = props;
	createPopup(() => createComponent(HotReloadGuard, { get children() {
		return createComponent(ViewTonePopup, rest);
	} }));
}
//#endregion
export { showViewTonePopup as default };
