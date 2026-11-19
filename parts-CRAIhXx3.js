//# allFunctionsCalledOnLoad
import { t as doubleRaf } from "./schedulers-Cx0-7a1P.js";
import { A as mergeProps, C as createSignal, I as splitProps, M as onCleanup, R as useContext, _ as createMemo, b as createResource, f as children, g as createEffect, h as createContext, i as For, m as createComputed, o as Match, p as createComponent, s as Show, u as Switch, v as createReaction, w as createUniqueId, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { n as deferredPromise } from "./cancellablePromise-bof--dnO.js";
import { _ as use, a as classList, c as insert, f as setAttribute, g as template, o as className, r as addEventListener, s as delegateEvents, u as memo } from "./web-BPyQozky.js";
import { r as useHotReloadGuard } from "./hotReloadGuard-BUNVkeQ4.js";
import { t as ripple } from "./ripple-D7hcIc_t.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
import { t as IconTsx } from "./iconTsx-B4lOk4A6.js";
import { t as I18nTsx } from "./i18n-CGMFiAW0.js";
import { t as Button } from "./buttonTsx-Bwphkm9r.js";
import { t as Scrollable } from "./scrollable2-Bau9Hoih.js";
import { i as createPopup, n as PopupElement, o as usePopupContext, u as isSendShortcutPressed } from "./indexTsx-v9mB9bAq.js";
import { o as createMiddleware } from "./sticker-5twBOy1Y.js";
import { t as requestRAF } from "./requestRAF-CwdYaVwH.js";
import { t as InputField } from "./inputField-CaCo30N0.js";
import { t as InputFieldTsx } from "./inputFieldTsx-0SbEFdGE.js";
import { t as Transition } from "./transition-Cmlc134D.js";
import { t as TransitionGroup } from "./transitionGroup-yCGzBwpt.js";
import { c as createContextMenu } from "./confirmationPopup-Bz6mK0o-.js";
import { T as richMessageToPage } from "./canPollPeerStories-D3HoBvLX.js";
import { Lt as Skeleton, nn as EmojiDocumentIcon } from "./appDialogsManager-CXguiKc3.js";
import { t as anchorCallback } from "./anchorCallback-BbwAJdBk.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { r as copyTextToClipboard } from "./clipboard-DzscV-ca.js";
import { r as prepareTextWithEntitiesForCopying } from "./prepareTextWithEntitiesForCopying-CwW8yyp7.js";
import { t as cloneDOMRect } from "./cloneDOMRect-DCQvg4jX.js";
import { p as StaticCheckbox } from "./geoPin-BKDcrfIw.js";
import { l as instantViewStyles } from "./instantViewFormatting-sqXAtEbL.js";
import { n as InstantViewBlocks } from "./instantView-BpUJR69w.js";
import { t as SimpleFormField } from "./simpleFormField-CGA0MMzH.js";
import { t as createMutation } from "./createMutation-BLuhs8D-.js";
import { a as previewCard_module_default, i as processEntities, n as EmojifyCheckbox } from "./previewCard-BwZZGFS2.js";
import { t as AutoHeight } from "./autoHeight-CPfajIaf.js";
import { t as editableFieldContent_module_default } from "./editableFieldContent.module-Bmodf0Jz.js";
import { t as tonePopupShell_module_default } from "./tonePopupShell.module-BzcGjn7j.js";
var aiEditorPopup_module_default = {
	popup: "_popup_zdhzm_1",
	container: "_container_zdhzm_6"
};
var bodyContent_module_default = {
	bodyContent: "_bodyContent_146q0_16",
	padded: "_padded_146q0_29",
	scrollable: "_scrollable_146q0_33",
	scrollableContent: "_scrollableContent_146q0_38",
	tabs: "_tabs_146q0_43",
	tab: "_tab_146q0_43",
	tone: "_tone_146q0_51",
	active: "_active_146q0_79",
	tabIcon: "_tabIcon_146q0_90",
	tabLabel: "_tabLabel_146q0_93",
	tabContent: "_tabContent_146q0_98",
	tonesRest: "_tonesRest_146q0_104",
	tonesBorder: "_tonesBorder_146q0_108",
	createResult: "_createResult_146q0_121",
	promptField: "_promptField_146q0_126",
	promptInput: "_promptInput_146q0_130",
	exit: "_exit_146q0_135",
	autoHeight: "_autoHeight_146q0_142",
	tonesList: "_tonesList_146q0_146",
	toneName: "_toneName_146q0_183",
	toneIcon: "_toneIcon_146q0_192",
	toneContextMenuIcon: "_toneContextMenuIcon_146q0_200",
	toneSkeleton: "_toneSkeleton_146q0_215",
	toneSkeletonIcon: "_toneSkeletonIcon_146q0_224",
	toneSkeletonText: "_toneSkeletonText_146q0_230",
	footerButtons: "_footerButtons_146q0_234",
	applyButton: "_applyButton_146q0_243",
	sendButtonWrapper: "_sendButtonWrapper_146q0_248",
	roundButton: "_roundButton_146q0_256",
	roundButtonIcon: "_roundButtonIcon_146q0_266",
	alwaysUse: "_alwaysUse_146q0_270",
	sectionWrapper: "_sectionWrapper_146q0_275",
	sectionArrow: "_sectionArrow_146q0_278",
	hidden: "_hidden_146q0_278",
	sectionArrowStart: "_sectionArrowStart_146q0_293",
	sectionArrowEnd: "_sectionArrowEnd_146q0_297"
};
//#endregion
//#region src/components/popups/aiEditorPopup/composerParts.tsx
var AiComposerSection = (props) => {
	return createComponent(AutoHeight, {
		get outerClass() {
			return classNames(bodyContent_module_default.tabContent, props.class);
		},
		get children() {
			return props.children;
		}
	});
};
var AiComposerPromptField = (props) => {
	return createComponent(InputFieldTsx, {
		allowStartingSpace: true,
		canWrapCustomEmojis: false,
		get ["class"]() {
			return bodyContent_module_default.promptInput;
		},
		get instanceRef() {
			return props.instanceRef;
		},
		get label() {
			return props.label;
		},
		get maxLength() {
			return props.maxLength;
		},
		get onRawInput() {
			return props.onRawInput;
		},
		showLengthOn: 100,
		get value() {
			return props.value;
		},
		withLinebreaks: true
	});
};
function useAiComposerPromptMaxLength() {
	const { useAppConfig } = useHotReloadGuard();
	const appConfig = useAppConfig();
	return () => appConfig.aicompose_tone_prompt_length_max || 1024;
}
function useAiComposerPromptGeneration(options) {
	const [appliedPrompt, setAppliedPrompt] = createSignal();
	const active = options.active || (() => true);
	const generate = () => {
		const prompt = options.prompt();
		if (!options.canGenerate()) return;
		if (appliedPrompt() !== prompt) {
			setAppliedPrompt(prompt);
			return;
		}
		setAppliedPrompt();
		queueMicrotask(() => {
			if (active() && options.prompt() === prompt) setAppliedPrompt(prompt);
		});
	};
	const reset = (nextPrompt) => {
		if (nextPrompt === void 0 || nextPrompt !== appliedPrompt()) setAppliedPrompt();
	};
	return {
		appliedPrompt,
		generate,
		reset
	};
}
function useAiComposerPromptInput(options) {
	let inputField;
	let removeKeydownListener;
	const instanceRef = (field) => {
		removeKeydownListener?.();
		inputField = field;
		const onKeyDown = (event) => {
			if (!isSendShortcutPressed(event)) return;
			event.preventDefault();
			options.onSubmit();
		};
		field.input.addEventListener("keydown", onKeyDown);
		removeKeydownListener = () => field.input.removeEventListener("keydown", onKeyDown);
	};
	createEffect(() => {
		if (!options.active()) return;
		doubleRaf().then(() => {
			if (options.active() && inputField?.input.isConnected) inputField.input.focus();
		});
	});
	onCleanup(() => removeKeydownListener?.());
	return instanceRef;
}
//#endregion
//#region src/components/popups/aiEditorPopup/context.ts
/** What a tab asks for, for as long as it is shown */
function useAiEditorRequest(context, args) {
	const [, setRequest] = context.requestSignal;
	createComputed(() => {
		setRequest(args());
		onCleanup(() => setRequest());
	});
}
/** The request saved for the chat, to the tab it is of when it asks first: the popup opens showing it made */
function takeSavedSendStyle(context, isOfTab) {
	const style = context.savedSendStyle;
	if (!style || !context.showSavedSendStyle || !isOfTab(style)) return;
	context.showSavedSendStyle = false;
	return style;
}
function createAiEditorPopupContextValue(props, close, lifecycle) {
	const [actionPending, setActionPending] = createSignal(false);
	const wrapAction = (action) => action && (async (...args) => {
		if (!lifecycle.isActive() || actionPending()) return false;
		setActionPending(true);
		try {
			const applied = await action(...args);
			if (!lifecycle.isActive()) return false;
			if (applied === false) return false;
			close();
			return true;
		} catch (error) {
			if (lifecycle.isActive()) lifecycle.onError(error);
			return false;
		} finally {
			setActionPending(false);
		}
	});
	return {
		...props,
		actionPending,
		/** Will get overriden if undefined once the tones are fetched */
		initialTones: props.initialTones,
		onApply: wrapAction(props.onApply),
		onApplyRichMessage: wrapAction(props.onApplyRichMessage),
		onSend: wrapAction(props.onSend),
		onSendRichMessage: wrapAction(props.onSendRichMessage),
		promptTextSignal: createSignal(""),
		primaryActionSignal: createSignal(),
		resultTextSignal: createSignal(),
		resultRichMessageSignal: createSignal(),
		requestSignal: createSignal(),
		showSavedSendStyle: true
	};
}
var AiEditorPopupContext = createContext();
var useAiEditorPopupContext = () => {
	return useContext(AiEditorPopupContext);
};
//#endregion
//#region src/components/popups/aiEditorPopup/provider.tsx
function AiEditorPopupProvider(props) {
	const [local, contextProps] = splitProps(props, ["children"]);
	const popup = usePopupContext();
	const { toastNew } = useHotReloadGuard();
	const middleware = popup.middlewareHelper.get();
	const value = createAiEditorPopupContextValue(contextProps, popup.hide, {
		isActive: () => !popup.destroyed && middleware(),
		onError: () => toastNew({ langPackKey: "Error.AnError" })
	});
	return createComponent(AiEditorPopupContext.Provider, {
		value,
		get children() {
			return local.children;
		}
	});
}
//#endregion
//#region src/components/popups/aiEditorPopup/createTonePopup/limits.ts
var useCreateToneLimits = () => {
	const { useAppConfig } = useHotReloadGuard();
	const appConfig = useAppConfig();
	return {
		maxTitleLength: () => appConfig.aicompose_tone_title_length_max || 12,
		maxInstructionsLength: () => appConfig.aicompose_tone_prompt_length_max || 1024
	};
};
var styles_module_default = {
	header: "_header_1e3zk_16",
	emoji: "_emoji_1e3zk_23",
	emojiButton: "_emojiButton_1e3zk_34",
	inputFieldScrollable: "_inputFieldScrollable_1e3zk_48",
	checkboxContainer: "_checkboxContainer_1e3zk_53",
	checkboxText: "_checkboxText_1e3zk_76"
};
//#endregion
//#region src/components/popups/aiEditorPopup/createTonePopup/CreateTonePopup.tsx
var _tmpl$$1 = /*#__PURE__*/ template(`<div><div><div>`);
var _tmpl$2$1 = /*#__PURE__*/ template(`<div><div>`);
var CreateTonePopup = (inProps) => {
	const props = mergeProps({
		titleLangKey: "AiEditor.NewStyle.Title",
		submitLangKey: "Create",
		errorLangKey: "AiEditor.NewStyle.Error"
	}, inProps);
	const { useEmojiDropdown, rootScope, toastNew } = useHotReloadGuard();
	const [styleName, setStyleName] = createSignal(props.initialValues?.title ?? "");
	const [instructions, setInstructions] = createSignal(props.initialValues?.prompt ?? "");
	const [docId, setDocId] = createSignal(props.initialValues?.emojiId);
	const [displayAuthor, setDisplayAuthor] = createSignal(props.initialValues?.displayAuthor ?? false);
	const [emojiButton, setEmojiButton] = createSignal();
	const { maxTitleLength, maxInstructionsLength } = useCreateToneLimits();
	const canSubmit = createMemo(() => {
		if (!styleName().length || styleName().length > maxTitleLength()) return false;
		if (!instructions().length || instructions().length > maxInstructionsLength()) return false;
		if (!docId()) return false;
		if (props.initialValues && props.initialValues.title === styleName() && props.initialValues.emojiId === docId() && props.initialValues.displayAuthor === displayAuthor() && props.initialValues.prompt === instructions()) return false;
		return true;
	});
	const submitMutation = createMutation(props.onSubmit, { onError: () => toastNew({ langPackKey: props.errorLangKey }) });
	createEffect(() => {
		const { emoticonsDropdown } = useEmojiDropdown({
			element: emojiButton(),
			onClick: (emoji) => {
				emoticonsDropdown.toggle(false);
				if (!emoji.docId) {
					toastNew({ langPackKey: "AiEditor.NewStyle.EmojiUnsupported" });
					return;
				}
				setDocId(emoji.docId);
			},
			noRegularEmoji: true,
			noPacks: false,
			noSearchGroups: false,
			canUsePremiumEmojiAlways: true,
			customParentElement: document.body,
			getOpenPosition: () => {
				const rect = emojiButton().getBoundingClientRect();
				const cloned = cloneDOMRect(rect);
				cloned.top = rect.bottom + 8;
				return cloned;
			}
		});
	});
	const instructionsInputField = new InputField({
		canWrapCustomEmojis: false,
		withLinebreaks: true,
		onRawInput: (value) => {
			setInstructions(value);
		}
	});
	instructionsInputField.input.classList.replace("input-field-input", editableFieldContent_module_default.editableFieldContent);
	instructionsInputField.setValueSilently(props.initialValues?.prompt ?? "");
	return createComponent(PopupElement, {
		get ["class"]() {
			return tonePopupShell_module_default.popup;
		},
		get children() {
			return [
				createComponent(PopupElement.Header, { get children() {
					return [createComponent(PopupElement.CloseButton, {}), createComponent(PopupElement.Title, { get title() {
						return props.titleLangKey;
					} })];
				} }),
				createComponent(PopupElement.Body, { get children() {
					return [
						(() => {
							var _el$ = _tmpl$$1(), _el$2 = _el$.firstChild, _el$3 = _el$2.firstChild;
							use(setEmojiButton, _el$2);
							insert(_el$3, createComponent(Show, {
								get when() {
									return docId();
								},
								get fallback() {
									return createComponent(IconTsx, { icon: "ai_style_tone" });
								},
								keyed: true,
								children: (docId) => createComponent(EmojiDocumentIcon, {
									docId,
									get managers() {
										return rootScope.managers;
									},
									color: "primary-text-color",
									size: 64,
									onFail: () => setDocId()
								})
							}));
							createRenderEffect((_p$) => {
								var _v$ = styles_module_default.header, _v$2 = styles_module_default.emojiButton, _v$3 = styles_module_default.emoji;
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
						})(),
						createComponent(Section, {
							caption: "AiEditor.NewStyle.StyleNameDescription",
							get children() {
								return createComponent(SimpleFormField, {
									get value() {
										return styleName();
									},
									onChange: setStyleName,
									get children() {
										return [createComponent(SimpleFormField.Label, {
											get maxLength() {
												return maxTitleLength();
											},
											get children() {
												return createComponent(I18nTsx, { key: "AiEditor.NewStyle.StyleName" });
											}
										}), createComponent(SimpleFormField.Input, { forceFieldValue: true })];
									}
								});
							}
						}),
						createComponent(Section, {
							caption: "AiEditor.NewStyle.InstructionsDescription",
							get children() {
								return createComponent(SimpleFormField, {
									get value() {
										return instructions();
									},
									onChange: setInstructions,
									withMinHeight: true,
									get children() {
										return [createComponent(SimpleFormField.Label, {
											get maxLength() {
												return maxInstructionsLength();
											},
											get children() {
												return createComponent(I18nTsx, { key: "AiEditor.NewStyle.Instructions" });
											}
										}), createComponent(SimpleFormField.InputStub, { get children() {
											return createComponent(Scrollable, {
												get ["class"]() {
													return styles_module_default.inputFieldScrollable;
												},
												relative: true,
												get children() {
													return instructionsInputField.input;
												}
											});
										} })];
									}
								});
							}
						}),
						(() => {
							var _el$4 = _tmpl$2$1(), _el$5 = _el$4.firstChild;
							use(ripple, _el$4, () => true);
							_el$4.$$click = () => setDisplayAuthor((p) => !p);
							insert(_el$4, createComponent(StaticCheckbox, {
								round: true,
								get checked() {
									return displayAuthor();
								}
							}), _el$5);
							insert(_el$5, createComponent(I18nTsx, { key: "AiEditor.NewStyle.AddLink" }));
							createRenderEffect((_p$) => {
								var _v$4 = styles_module_default.checkboxContainer, _v$5 = styles_module_default.checkboxText;
								_v$4 !== _p$.e && className(_el$4, _p$.e = _v$4);
								_v$5 !== _p$.t && className(_el$5, _p$.t = _v$5);
								return _p$;
							}, {
								e: void 0,
								t: void 0
							});
							return _el$4;
						})()
					];
				} }),
				createComponent(PopupElement.Footer, { get children() {
					return createComponent(PopupElement.FooterButton, {
						get disabled() {
							return !canSubmit() || submitMutation.isPending();
						},
						get langKey() {
							return props.submitLangKey;
						},
						callback: () => submitMutation.mutateAsync({
							emojiId: docId(),
							title: styleName(),
							prompt: instructions(),
							displayAuthor: displayAuthor()
						})
					});
				} })
			];
		}
	});
};
delegateEvents(["click"]);
//#endregion
//#region src/components/popups/aiEditorPopup/createTonePopup/index.tsx
function showCreateTonePopup(props) {
	const { HotReloadGuard, ...rest } = props;
	createPopup(() => createComponent(HotReloadGuard, { get children() {
		return createComponent(CreateTonePopup, rest);
	} }));
}
//#endregion
//#region src/components/popups/aiEditorPopup/parts.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div><div>`);
var _tmpl$2 = /*#__PURE__*/ template(`<button type=button>`);
var _tmpl$3 = /*#__PURE__*/ template(`<div>`);
var _tmpl$4 = /*#__PURE__*/ template(`<button type=button><div>`);
var Tabs = (props) => {
	return (() => {
		var _el$ = _tmpl$(), _el$2 = _el$.firstChild;
		insert(_el$2, createComponent(For, {
			get each() {
				return props.items;
			},
			children: (item) => (() => {
				var _el$3 = _tmpl$2();
				_el$3.$$click = () => props.onTabChange(item.key);
				use(ripple, _el$3, () => true);
				insert(_el$3, createComponent(IconTsx, {
					get ["class"]() {
						return bodyContent_module_default.tabIcon;
					},
					get icon() {
						return item.icon;
					},
					"aria-hidden": "true"
				}), null);
				insert(_el$3, createComponent(I18nTsx, {
					get ["class"]() {
						return bodyContent_module_default.tabLabel;
					},
					get key() {
						return item.label;
					}
				}), null);
				createRenderEffect((_p$) => {
					var _v$3 = props.activeKey === item.key, _v$4 = bodyContent_module_default.tab, _v$5 = { [bodyContent_module_default.active]: props.activeKey === item.key };
					_v$3 !== _p$.e && setAttribute(_el$3, "aria-pressed", _p$.e = _v$3);
					_v$4 !== _p$.t && className(_el$3, _p$.t = _v$4);
					_p$.a = classList(_el$3, _v$5, _p$.a);
					return _p$;
				}, {
					e: void 0,
					t: void 0,
					a: void 0
				});
				return _el$3;
			})()
		}));
		createRenderEffect((_p$) => {
			var _v$ = bodyContent_module_default.padded, _v$2 = bodyContent_module_default.tabs;
			_v$ !== _p$.e && className(_el$, _p$.e = _v$);
			_v$2 !== _p$.t && className(_el$2, _p$.t = _v$2);
			return _p$;
		}, {
			e: void 0,
			t: void 0
		});
		return _el$;
	})();
};
var CopyResultButton = () => {
	const { toastNew, I18n } = useHotReloadGuard();
	const { resultTextSignal: [resultText] } = useAiEditorPopupContext();
	const onClick = async () => {
		const result = resultText();
		if (!result) return;
		const { text, html } = prepareTextWithEntitiesForCopying(result);
		try {
			await copyTextToClipboard(text, html, { rethrow: true });
			toastNew({ langPackKey: "TextCopied" });
		} catch {
			toastNew({ langPackKey: "TextCopyFailed" });
		}
	};
	return createComponent(Button, {
		get ["class"]() {
			return bodyContent_module_default.roundButton;
		},
		primaryFilled: true,
		get disabled() {
			return !resultText();
		},
		get ["aria-label"]() {
			return I18n.format("Copy", true);
		},
		onClick,
		get children() {
			return createComponent(IconTsx, {
				get ["class"]() {
					return bodyContent_module_default.roundButtonIcon;
				},
				icon: "copy_filled"
			});
		}
	});
};
var MAX_CACHED_COMPOSED_MESSAGES = 50;
var cachedComposedMessages = /* @__PURE__ */ new Map();
var getCachedComposedMessageKey = (args) => {
	if (args.customPrompt) return void 0;
	try {
		return JSON.stringify(args);
	} catch {
		return;
	}
};
var getCachedComposedMessage = (args) => {
	const key = getCachedComposedMessageKey(args);
	return key ? cachedComposedMessages.get(key) : void 0;
};
var setCachedComposedMessage = (key, data) => {
	cachedComposedMessages.set(key, data);
	if (cachedComposedMessages.size > MAX_CACHED_COMPOSED_MESSAGES) cachedComposedMessages.delete(cachedComposedMessages.keys().next().value);
};
var ComposeError = class extends Error {
	constructor(isPremiumFlood) {
		super();
		this.isPremiumFlood = isPremiumFlood;
		this.name = "ComposeError";
	}
};
var Result = (props) => {
	const { rootScope, toastNew, wrapRichText, showPremiumPopup } = useHotReloadGuard();
	const { richMessage, resultTextSignal: [, setResultText], resultRichMessageSignal: [, setResultRichMessage] } = useAiEditorPopupContext();
	const popupContext = usePopupContext();
	let appearDeferred = props.isAppearing ? deferredPromise() : void 0;
	if (appearDeferred) createReaction(() => {
		appearDeferred?.resolve?.();
		appearDeferred = void 0;
	})(() => props.isAppearing);
	const composeMessageWithAiArgs = () => ({
		...props.composeMessageWithAiArgs,
		richMessage
	});
	const [composedMessage] = createResource(composeMessageWithAiArgs, (args) => {
		const cached = getCachedComposedMessage(args);
		if (cached) return cached;
		return (async () => {
			const [result] = await Promise.all([rootScope.managers.aiTonesManager.composeMessageWithAi(args), appearDeferred]);
			if (result.ok === false) throw new ComposeError(result.isPremiumFlood);
			const key = getCachedComposedMessageKey(args);
			if (key) setCachedComposedMessage(key, result.data);
			return result.data;
		})();
	}, { initialValue: getCachedComposedMessage(composeMessageWithAiArgs()) });
	createEffect(() => {
		props.onPendingChange?.(composedMessage.state === "pending" || composedMessage.state === "refreshing");
	});
	onCleanup(() => props.onPendingChange?.(false));
	let scrollableRef, scrollableContextRef;
	const [skeletonHeight, setSkeletonHeight] = createSignal();
	const isPremiumFloodError = createMemo(() => composedMessage.error instanceof ComposeError && composedMessage.error.isPremiumFlood);
	const textToRender = createMemo(() => {
		if (composedMessage.state !== "ready") return;
		const localComposedMessage = composedMessage();
		if (localComposedMessage.resultRichMessage) return;
		if (props.useDiffText) return localComposedMessage.diffText || localComposedMessage.resultText;
		return localComposedMessage.resultText;
	});
	const richPageToRender = createMemo(() => {
		if (composedMessage.state !== "ready") return;
		const result = composedMessage().resultRichMessage;
		return result && richMessageToPage(result);
	});
	createComputed(() => {
		if (composedMessage.state !== "ready") return;
		setResultText(composedMessage().resultText);
		setResultRichMessage(composedMessage().resultRichMessage);
		onCleanup(() => {
			setResultText();
			setResultRichMessage();
		});
	});
	createEffect(() => {
		if (composedMessage.state !== "ready" && scrollableRef?.isConnected) setSkeletonHeight(scrollableRef.clientHeight);
	});
	return [(() => {
		var _el$4 = _tmpl$(), _el$5 = _el$4.firstChild;
		insert(_el$5, createComponent(Show, {
			get when() {
				return props.overrideTitle;
			},
			get fallback() {
				return createComponent(I18nTsx, {
					key: "AiEditor.Result",
					get ["class"]() {
						return previewCard_module_default.resultTitle;
					}
				});
			},
			get children() {
				return props.overrideTitle;
			}
		}));
		insert(_el$4, createComponent(Show, {
			get when() {
				return props.onEmojify;
			},
			get children() {
				return createComponent(EmojifyCheckbox, {
					get checked() {
						return props.emojify;
					},
					get onClick() {
						return props.onEmojify;
					}
				});
			}
		}), null);
		createRenderEffect((_p$) => {
			var _v$6 = previewCard_module_default.resultHeader, _v$7 = previewCard_module_default.resultTitleWrapper;
			_v$6 !== _p$.e && className(_el$4, _p$.e = _v$6);
			_v$7 !== _p$.t && className(_el$5, _p$.t = _v$7);
			return _p$;
		}, {
			e: void 0,
			t: void 0
		});
		return _el$4;
	})(), (() => {
		var _el$6 = _tmpl$3();
		insert(_el$6, createComponent(Transition, {
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
								return richPageToRender();
							},
							keyed: true,
							children: (page) => createComponent(Scrollable, {
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
									return createComponent(InstantViewBlocks, {
										webPageId: 0,
										page,
										openNewPage: () => {},
										collapse: () => {},
										get ["class"]() {
											return instantViewStyles.RichMessage;
										},
										get contentClass() {
											return classNames(previewCard_module_default.richTextScrollableContent, previewCard_module_default.nonInteractive);
										},
										paddings: 0,
										get displayTextDiff() {
											return props.useDiffText;
										},
										style: { "--padding-horizontal": "0px" }
									});
								}
							})
						}),
						createComponent(Match, {
							get when() {
								return textToRender();
							},
							keyed: true,
							children: (text) => createComponent(Scrollable, {
								tabIndex: 0,
								ref(r$) {
									var _ref$2 = scrollableRef;
									typeof _ref$2 === "function" ? _ref$2(r$) : scrollableRef = r$;
								},
								contextRef: (value) => void (scrollableContextRef = value),
								relative: true,
								get ["class"]() {
									return previewCard_module_default.richTextScrollable;
								},
								withBorders: "manual",
								get children() {
									var _el$8 = _tmpl$3();
									insert(_el$8, () => wrapRichText(text.text, {
										entities: processEntities(text.entities),
										middleware: createMiddleware().get()
									}));
									createRenderEffect(() => className(_el$8, classNames(previewCard_module_default.richTextScrollableContent, previewCard_module_default.nonInteractive)));
									return _el$8;
								}
							})
						}),
						createComponent(Match, {
							get when() {
								return composedMessage.state === "pending" || composedMessage.state === "refreshing";
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
								var _el$7 = _tmpl$3();
								insert(_el$7, createComponent(Show, {
									get when() {
										return isPremiumFloodError();
									},
									get fallback() {
										return createComponent(I18nTsx, { key: "AiEditor.ComposeError" });
									},
									get children() {
										return createComponent(I18nTsx, {
											key: "AiEditor.PremiumFlood",
											get args() {
												return [anchorCallback(() => {
													popupContext?.hide();
													showPremiumPopup();
												})];
											}
										});
									}
								}));
								createRenderEffect(() => className(_el$7, previewCard_module_default.error));
								return _el$7;
							}
						})
					];
				} });
			}
		}));
		createRenderEffect(() => className(_el$6, previewCard_module_default.resultContent));
		return _el$6;
	})()];
};
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
var TONE_ICON_SIZE = 30;
var Tone = (props) => {
	const { rootScope } = useHotReloadGuard();
	const labelId = createUniqueId();
	let button;
	createEffect(() => {
		if (!props.withContextMenu) return;
		const { destroy } = createContextMenu({
			buttons: [
				...props.withContextMenu.onEdit ? [{
					icon: "edit",
					text: "Edit",
					onClick: props.withContextMenu.onEdit
				}] : [],
				{
					icon: "forward",
					text: "Share",
					onClick: props.withContextMenu.onShare
				},
				{
					icon: "delete",
					text: props.withContextMenu.isSaved ? "Remove" : "Delete",
					danger: true,
					onClick: props.withContextMenu.onDelete
				}
			],
			listenTo: button
		});
		onCleanup(() => destroy());
	});
	return (() => {
		var _el$9 = _tmpl$4(), _el$0 = _el$9.firstChild;
		addEventListener(_el$9, "click", props.onClick, true);
		use(ripple, _el$9, () => true);
		var _ref$3 = button;
		typeof _ref$3 === "function" ? use(_ref$3, _el$9) : button = _el$9;
		setAttribute(_el$9, "aria-labelledby", labelId);
		insert(_el$9, createComponent(Show, {
			get when() {
				return props.docId;
			},
			get fallback() {
				return createComponent(IconTsx, {
					get ["class"]() {
						return bodyContent_module_default.toneIcon;
					},
					get icon() {
						return props.icon;
					}
				});
			},
			keyed: true,
			children: (docId) => createComponent(EmojiDocumentIcon, {
				docId,
				get color() {
					return props.selected ? "primary-color" : "primary-text-color";
				},
				size: TONE_ICON_SIZE,
				get ["class"]() {
					return bodyContent_module_default.toneIcon;
				},
				get managers() {
					return rootScope.managers;
				}
			})
		}), _el$0);
		setAttribute(_el$0, "id", labelId);
		insert(_el$0, () => props.name);
		insert(_el$9, createComponent(Show, {
			get when() {
				return props.withContextMenu;
			},
			get children() {
				return createComponent(IconTsx, {
					icon: "more",
					get ["class"]() {
						return bodyContent_module_default.toneContextMenuIcon;
					}
				});
			}
		}), null);
		createRenderEffect((_p$) => {
			var _v$8 = props.selected, _v$9 = bodyContent_module_default.tone, _v$0 = { [bodyContent_module_default.active]: props.selected }, _v$1 = bodyContent_module_default.toneName;
			_v$8 !== _p$.e && setAttribute(_el$9, "aria-pressed", _p$.e = _v$8);
			_v$9 !== _p$.t && className(_el$9, _p$.t = _v$9);
			_p$.a = classList(_el$9, _v$0, _p$.a);
			_v$1 !== _p$.o && className(_el$0, _p$.o = _v$1);
			return _p$;
		}, {
			e: void 0,
			t: void 0,
			a: void 0,
			o: void 0
		});
		return _el$9;
	})();
};
var CreateTone = (props) => {
	const { HotReloadGuard, rootScope } = useHotReloadGuard();
	return (() => {
		var _el$1 = _tmpl$4(), _el$10 = _el$1.firstChild;
		_el$1.$$click = () => {
			showCreateTonePopup({
				onSubmit: async (args) => {
					const createdTone = await rootScope.managers.aiTonesManager.createTone(args);
					props.onCreate(createdTone);
				},
				HotReloadGuard
			});
		};
		use(ripple, _el$1, () => true);
		insert(_el$1, createComponent(IconTsx, {
			get ["class"]() {
				return bodyContent_module_default.toneIcon;
			},
			icon: "edit_stars_add",
			"aria-hidden": "true"
		}), _el$10);
		insert(_el$10, createComponent(I18nTsx, { key: "Create" }));
		createRenderEffect((_p$) => {
			var _v$10 = bodyContent_module_default.tone, _v$11 = bodyContent_module_default.toneName;
			_v$10 !== _p$.e && className(_el$1, _p$.e = _v$10);
			_v$11 !== _p$.t && className(_el$10, _p$.t = _v$11);
			return _p$;
		}, {
			e: void 0,
			t: void 0
		});
		return _el$1;
	})();
};
var useIsAppearing = (hasAnimation) => {
	const [isAppearing, setIsAppearing] = createSignal(true);
	const track = createReaction(() => setIsAppearing(false));
	const finishedAnimation = createMemo(() => !hasAnimation());
	requestRAF(() => {
		track(finishedAnimation);
	});
	return isAppearing;
};
var useTransitionGroupWhenMeasured = () => {
	const [measured, setMeasured] = createSignal(false);
	const Wrapper = (props) => {
		const resolved = children(() => props.children);
		return createComponent(Show, {
			get when() {
				return measured();
			},
			get fallback() {
				return resolved();
			},
			get children() {
				return createComponent(TransitionGroup, {
					name: "fade-2",
					moveClass: "t-move-std",
					onBeforeExit: (el) => {
						el.classList.add(bodyContent_module_default.exit);
					},
					get children() {
						return resolved();
					}
				});
			}
		});
	};
	return {
		Wrapper,
		onMeasured: () => setMeasured(true)
	};
};
delegateEvents(["click"]);
//#endregion
export { useAiComposerPromptGeneration as _, Tone as a, bodyContent_module_default as b, useTransitionGroupWhenMeasured as c, AiEditorPopupContext as d, takeSavedSendStyle as f, AiComposerSection as g, AiComposerPromptField as h, Tabs as i, showCreateTonePopup as l, useAiEditorRequest as m, CreateTone as n, cachedComposedMessages as o, useAiEditorPopupContext as p, Result as r, useIsAppearing as s, CopyResultButton as t, AiEditorPopupProvider as u, useAiComposerPromptInput as v, aiEditorPopup_module_default as x, useAiComposerPromptMaxLength as y };
