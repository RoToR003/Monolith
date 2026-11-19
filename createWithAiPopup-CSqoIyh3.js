//# allFunctionsCalledOnLoad
import { A as mergeProps, C as createSignal, p as createComponent, s as Show, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { _ as use, c as insert, g as template, o as className, s as delegateEvents } from "./web-BPyQozky.js";
import { r as useHotReloadGuard } from "./hotReloadGuard-BUNVkeQ4.js";
import { t as ripple } from "./ripple-D7hcIc_t.js";
import { t as I18nTsx } from "./i18n-CGMFiAW0.js";
import { t as Button } from "./buttonTsx-Bwphkm9r.js";
import { i as createPopup, n as PopupElement } from "./indexTsx-v9mB9bAq.js";
import { r as GrowHeightReveal } from "./animations-DCmLIda3.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { a as previewCard_module_default } from "./previewCard-BwZZGFS2.js";
import { _ as useAiComposerPromptGeneration, b as bodyContent_module_default, g as AiComposerSection, h as AiComposerPromptField, p as useAiEditorPopupContext, r as Result, t as CopyResultButton, u as AiEditorPopupProvider, v as useAiComposerPromptInput, x as aiEditorPopup_module_default, y as useAiComposerPromptMaxLength } from "./parts-CRAIhXx3.js";
//#region src/components/popups/aiEditorPopup/createWithAiPopup.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div><div>`);
var _tmpl$2 = /*#__PURE__*/ template(`<span>`);
var EMPTY_TEXT = {
	_: "textWithEntities",
	text: "",
	entities: []
};
var CreateWithAiPopupBody = () => {
	const { I18n, pickLanguage } = useHotReloadGuard();
	const context = useAiEditorPopupContext();
	const { promptTextSignal: [promptText, setPromptText], resultTextSignal: [resultText], resultRichMessageSignal: [resultRichMessage] } = context;
	const [emojify, setEmojify] = createSignal(false);
	const [language, setLanguage] = createSignal(I18n.langCodeNormalized() || "en");
	const [pending, setPending] = createSignal(false);
	const maxPromptLength = useAiComposerPromptMaxLength();
	const promptLength = () => [...promptText()].length;
	const canGenerate = () => !!promptText().trim() && promptLength() <= maxPromptLength() && !pending();
	const hasResult = () => !!(resultRichMessage() || resultText());
	const { appliedPrompt, generate, reset: resetAppliedPrompt } = useAiComposerPromptGeneration({
		canGenerate,
		prompt: promptText
	});
	const setPromptInputField = useAiComposerPromptInput({
		active: () => true,
		onSubmit: generate
	});
	const onPromptInput = (value) => {
		setPromptText(value);
		resetAppliedPrompt(value);
	};
	const onLanguageClick = async () => {
		try {
			setLanguage(await pickLanguage(false));
		} catch {}
	};
	const applyOrGenerate = () => {
		const richMessage = resultRichMessage();
		if (richMessage) context.onApplyRichMessage?.(richMessage);
		else if (resultText()) context.onApply(resultText());
		else generate();
	};
	return (() => {
		var _el$ = _tmpl$(), _el$2 = _el$.firstChild;
		insert(_el$, createComponent(Section, { get children() {
			return createComponent(AiComposerPromptField, {
				instanceRef: setPromptInputField,
				label: "AiEditor.Create.Placeholder",
				get maxLength() {
					return maxPromptLength();
				},
				onRawInput: onPromptInput,
				get value() {
					return promptText();
				}
			});
		} }), _el$2);
		insert(_el$, createComponent(GrowHeightReveal, {
			get when() {
				return appliedPrompt();
			},
			get children() {
				return createComponent(Section, { get children() {
					return createComponent(AiComposerSection, {
						get ["class"]() {
							return bodyContent_module_default.createResult;
						},
						get children() {
							return createComponent(Show, {
								get when() {
									return appliedPrompt();
								},
								keyed: true,
								children: (prompt) => createComponent(Result, {
									get overrideTitle() {
										return createComponent(I18nTsx, {
											get ["class"]() {
												return previewCard_module_default.resultTitle;
											},
											key: "AiEditor.Create.InLanguage",
											get args() {
												return [(() => {
													var _el$3 = _tmpl$2();
													_el$3.$$click = onLanguageClick;
													use(ripple, _el$3, () => true);
													insert(_el$3, createComponent(I18nTsx, { get key() {
														return `Language.${language()}`;
													} }));
													createRenderEffect(() => className(_el$3, previewCard_module_default.resultLanguage));
													return _el$3;
												})()];
											}
										});
									},
									get emojify() {
										return emojify();
									},
									onEmojify: () => setEmojify(!emojify()),
									onPendingChange: setPending,
									get composeMessageWithAiArgs() {
										return {
											text: EMPTY_TEXT,
											createRichMessage: true,
											customPrompt: prompt,
											translateTo: language(),
											emojify: emojify()
										};
									}
								})
							});
						}
					});
				} });
			}
		}), _el$2);
		insert(_el$2, createComponent(Show, {
			get when() {
				return hasResult();
			},
			get children() {
				return createComponent(CopyResultButton, {});
			}
		}), null);
		insert(_el$2, createComponent(Button, {
			get ["class"]() {
				return bodyContent_module_default.applyButton;
			},
			primaryFilled: true,
			get disabled() {
				return context.actionPending() || !hasResult() && !canGenerate();
			},
			onClick: applyOrGenerate,
			get children() {
				return createComponent(I18nTsx, { get key() {
					return hasResult() ? "AiEditor.Create.AddToMessage" : "AiEditor.Generate";
				} });
			}
		}), null);
		createRenderEffect((_p$) => {
			var _v$ = bodyContent_module_default.bodyContent, _v$2 = bodyContent_module_default.footerButtons;
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
var CreateWithAiPopup = (props) => {
	const contextProps = {
		...props,
		text: EMPTY_TEXT
	};
	return createComponent(PopupElement, {
		get ["class"]() {
			return aiEditorPopup_module_default.popup;
		},
		get containerClass() {
			return aiEditorPopup_module_default.container;
		},
		get children() {
			return [createComponent(PopupElement.Header, { get children() {
				return [createComponent(PopupElement.CloseButton, {}), createComponent(PopupElement.Title, { get children() {
					return createComponent(I18nTsx, { key: "AiEditor.Create.Title" });
				} })];
			} }), createComponent(PopupElement.Body, { get children() {
				return createComponent(AiEditorPopupProvider, mergeProps(contextProps, { get children() {
					return createComponent(CreateWithAiPopupBody, {});
				} }));
			} })];
		}
	});
};
function openCreateWithAiPopup(props, HotReloadGuard) {
	createPopup(() => createComponent(HotReloadGuard, { get children() {
		return createComponent(CreateWithAiPopup, props);
	} }));
}
delegateEvents(["click"]);
//#endregion
export { openCreateWithAiPopup };
