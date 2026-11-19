//# allFunctionsCalledOnLoad
import { n as __exportAll } from "./rolldown-runtime-CwcJO0Gh.js";
import { n as fastRaf } from "./schedulers-Cx0-7a1P.js";
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { a as i18n, u as langPack_default } from "./langPack-BmdJGr44.js";
import { A as mergeProps, C as createSignal, I as splitProps, M as onCleanup, N as onMount, g as createEffect, p as createComponent, s as Show, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { _ as use, c as insert, f as setAttribute, g as template, m as spread, o as className$1, u as memo } from "./web-BPyQozky.js";
import { n as mediaSizes } from "./mediaSizes-C1MTaleW.js";
import { u as wrapRichText } from "./renderer-L80wjxct.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
import { t as I18nTsx } from "./i18n-CGMFiAW0.js";
import { t as Button } from "./buttonTsx-Bwphkm9r.js";
import { n as InputState } from "./inputField-CaCo30N0.js";
import { t as InputFieldTsx } from "./inputFieldTsx-0SbEFdGE.js";
import { t as Animated } from "./animations-DCmLIda3.js";
import { t as subscribeOn } from "./subscribeOn-DnCla7ws.js";
import { t as MediaHeader } from "./mediaHeader-CnpQNwOl.js";
import { t as CodeInputField } from "./codeInputField-CuXF8PSB.js";
import { t as focusWhenSettled } from "./focusWhenSettled-C7GmSekj.js";
//#region src/components/generateDelimiter.ts
var generateDelimiter = () => {
	const delimiter = document.createElement("div");
	delimiter.classList.add("gradient-delimiter");
	return delimiter;
};
//#endregion
//#region src/components/section.tsx
var _tmpl$$1 = /*#__PURE__*/ template(`<div>`);
var _tmpl$2$1 = /*#__PURE__*/ template(`<div class=sidebar-left-section-name-right>`);
var className = "sidebar-left-section";
var SectionContent = (props) => {
	const [local, rest] = splitProps(props, [
		"ref",
		"class",
		"children"
	]);
	return (() => {
		var _el$ = _tmpl$$1();
		var _ref$ = local.ref;
		typeof _ref$ === "function" ? use(_ref$, _el$) : local.ref = _el$;
		spread(_el$, mergeProps(rest, { get ["class"]() {
			return classNames(className + "-content", local.class);
		} }), false, true);
		insert(_el$, () => local.children);
		return _el$;
	})();
};
/**
* The title of a section - and, on its own, of a stretch of a list that is divided by them (the
* letters of the contacts sorted by name)
*/
var SectionName = (props) => {
	return (() => {
		var _el$2 = _tmpl$$1();
		var _ref$2 = props.ref;
		typeof _ref$2 === "function" ? use(_ref$2, _el$2) : props.ref = _el$2;
		insert(_el$2, () => props.children, null);
		insert(_el$2, (() => {
			var _c$ = memo(() => !!props.right);
			return () => _c$() && (() => {
				var _el$3 = _tmpl$2$1();
				insert(_el$3, () => props.right);
				return _el$3;
			})();
		})(), null);
		createRenderEffect(() => className$1(_el$2, classNames("sidebar-left-h2", className + "-name", props.class)));
		return _el$2;
	})();
};
var SectionCaption = (props) => {
	return createComponent(SectionContent, {
		ref(r$) {
			var _ref$3 = props.captionRef;
			typeof _ref$3 === "function" ? _ref$3(r$) : props.captionRef = r$;
		},
		"class": className + "-caption",
		get children() {
			return memo(() => typeof props.caption === "string")() ? i18n(props.caption, props.captionArgs) : props.caption;
		}
	});
};
var Section = (props) => {
	const [, rest] = splitProps(props, [
		"name",
		"nameRef",
		"nameArgs",
		"nameRight",
		"innerClass",
		"caption",
		"captionArgs",
		"captionOld",
		"captionTop",
		"captionRef",
		"noDelimiter",
		"fakeGradientDelimiter",
		"noShadow",
		"noMarginBottom",
		"noContent",
		"class",
		"contentProps",
		"ref"
	]);
	return (() => {
		var _el$4 = _tmpl$$1();
		var _ref$4 = props.ref;
		typeof _ref$4 === "function" ? use(_ref$4, _el$4) : props.ref = _el$4;
		spread(_el$4, mergeProps({ get ["class"]() {
			return classNames(className + "-container", props.noMarginBottom && "no-margin-bottom", props.class);
		} }, rest), false, true);
		insert(_el$4, (() => {
			var _c$2 = memo(() => !!(props.caption && props.captionTop));
			return () => _c$2() && createComponent(SectionCaption, props);
		})(), null);
		insert(_el$4, (() => {
			var _c$3 = memo(() => !!!props.noContent);
			return () => _c$3() && (() => {
				var _el$5 = _tmpl$$1();
				insert(_el$5, (() => {
					var _c$5 = memo(() => !!props.fakeGradientDelimiter);
					return () => _c$5() && generateDelimiter();
				})(), null);
				insert(_el$5, createComponent(SectionContent, mergeProps(() => props.contentProps, { get children() {
					return [memo(() => memo(() => !!props.name)() && createComponent(SectionName, {
						ref(r$) {
							var _ref$5 = props.nameRef;
							typeof _ref$5 === "function" ? _ref$5(r$) : props.nameRef = r$;
						},
						get right() {
							return props.nameRight;
						},
						get children() {
							return memo(() => typeof props.name === "string")() ? i18n(props.name, props.nameArgs) : props.name;
						}
					})), memo(() => props.children)];
				} })), null);
				insert(_el$5, (() => {
					var _c$6 = memo(() => !!(props.caption && !props.captionTop && props.captionOld));
					return () => _c$6() && createComponent(SectionCaption, props);
				})(), null);
				createRenderEffect(() => className$1(_el$5, classNames(className, props.noShadow && "no-shadow", props.noDelimiter && "no-delimiter", props.innerClass)));
				return _el$5;
			})();
		})(), null);
		insert(_el$4, (() => {
			var _c$4 = memo(() => !!(props.caption && !props.captionTop && !props.captionOld));
			return () => _c$4() && createComponent(SectionCaption, props);
		})(), null);
		return _el$4;
	})();
};
/**
* A `<Section>` renders one content element. Some panels stack several inside the same
* section (a button, then a list that is reordered by index), which needs its own element —
* this appends one next to the existing content, like the old SettingSection's
* `generateContentElement()` did.
*/
function appendSectionContent(section) {
	if (typeof section?.querySelector !== "function") throw new Error(`appendSectionContent: expected the section element, got ${typeof section}. A \`<Section/>\` value has to go through \`unwrapSolidElement\` before it is cast to HTMLElement.`);
	const inner = section.querySelector("." + className);
	if (!inner) throw new Error("appendSectionContent: this section has no content element to append next to (`noContent`?)");
	const content = document.createElement("div");
	content.classList.add(className + "-content");
	inner.append(content);
	return content;
}
var emailVerification_module_default = {
	page: "_page_grblq_16",
	input: "_input_grblq_23",
	footer: "_footer_grblq_29",
	button: "_button_grblq_36",
	buttonContainer: "_buttonContainer_grblq_41",
	secondaryButton: "_secondaryButton_grblq_46",
	onCard: "_onCard_grblq_50",
	onTab: "_onTab_grblq_57",
	emailPattern: "_emailPattern_grblq_70",
	error: "_error_grblq_75"
};
//#endregion
//#region src/components/emailVerification.tsx
var emailVerification_exports = /* @__PURE__ */ __exportAll({
	EnterCodeStep: () => EnterCodeStep,
	EnterEmailStep: () => EnterEmailStep,
	wrapEmailPattern: () => wrapEmailPattern
});
var _tmpl$ = /*#__PURE__*/ template(`<div class=input-wrapper>`);
var _tmpl$2 = /*#__PURE__*/ template(`<div>`);
var _tmpl$3 = /*#__PURE__*/ template(`<div role=alert>`);
var VARIANT_CLASSES = {
	card: emailVerification_module_default.onCard,
	tab: emailVerification_module_default.onTab
};
/** Auth cards size their sticker with the screen; the popup's is fixed, a tab's the tabs' own. */
function stickerSize(variant) {
	if (variant === "tab") return 130;
	if (variant !== "card") return 120;
	return mediaSizes.isMobile ? 100 : 130;
}
/** A tab holds the step's field and its button in a section, the way the other settings tabs hold theirs. */
function StepForm(props) {
	if (props.variant !== "tab") return props.children;
	return createComponent(Section, { get children() {
		var _el$ = _tmpl$();
		insert(_el$, () => props.children);
		return _el$;
	} });
}
function SecondaryButton(props) {
	return createComponent(Show, {
		get when() {
			return props.action;
		},
		children: (action) => createComponent(Button, {
			get ["class"]() {
				return classNames(emailVerification_module_default.button, emailVerification_module_default.secondaryButton, "btn-primary btn-secondary btn-primary-transparent primary");
			},
			get text() {
				return action().text;
			},
			onClick: () => action().onClick()
		})
	});
}
/** Renders `a***b@c***.com`-style patterns with the masked runs as spoilers. */
function wrapEmailPattern(pattern) {
	if (pattern.includes(" ") || !pattern.includes("*")) return pattern;
	const entities = [];
	for (let i = 0; i < pattern.length;) {
		const idx = pattern.indexOf("*", i);
		if (idx === -1) break;
		let endIdx = idx + 1;
		while (pattern[endIdx] === "*") endIdx++;
		entities.push({
			_: "messageEntitySpoiler",
			offset: idx,
			length: endIdx - idx
		});
		i = endIdx;
	}
	const wrapper = document.createElement("span");
	wrapper.dir = "ltr";
	wrapper.classList.add(emailVerification_module_default.emailPattern);
	wrapper.append(wrapRichText(pattern, {
		entities,
		noTextFormat: true
	}));
	return wrapper;
}
var emailVerificationErrorIdSeed = 0;
function EnterEmailStep(props) {
	const [error, setError] = createSignal(void 0);
	const [email, setEmail] = createSignal("");
	const [loading, setLoading] = createSignal(false);
	const errorDescriptionId = "email-verification-error-" + ++emailVerificationErrorIdSeed;
	let inputRef;
	function onSubmit() {
		if (!email().includes("@")) {
			inputRef.setError();
			return;
		}
		setLoading(true);
		(props.managers ?? rootScope.managers).appAccountManager.sendVerifyEmailCode(props.purpose, email()).then((sentCode) => {
			setLoading(false);
			props.onCodeSent({
				...sentCode,
				email_pattern: email()
			});
		}).catch((err) => {
			if (props.onError?.(err)) {
				setLoading(false);
				return;
			}
			if (err.type === "EMAIL_INVALID") setError("EmailSetup.InvalidEmail");
			else if (err.type === "EMAIL_NOT_ALLOWED") setError("EmailSetup.BadEmail");
			else {
				console.error(err);
				setError("Error.AnError");
			}
			setTimeout(() => {
				setLoading(false);
			}, 200);
		});
	}
	onMount(() => {
		inputRef.input.setAttribute("aria-label", langPack_default.format("EmailSetup.InputCaption", true));
		onCleanup(focusWhenSettled(inputRef.input));
		subscribeOn(inputRef.input)("keydown", (e) => {
			if (e.key === "Enter") {
				e.preventDefault();
				onSubmit();
			}
		});
	});
	return (() => {
		var _el$2 = _tmpl$2();
		insert(_el$2, createComponent(MediaHeader, {
			get marginBottom() {
				return props.variant === "tab";
			},
			get children() {
				return [
					createComponent(MediaHeader.Sticker, {
						name: "Mailbox",
						get size() {
							return stickerSize(props.variant);
						}
					}),
					createComponent(MediaHeader.Title, { get children() {
						return createComponent(I18nTsx, { get key() {
							return props.isInitialSetup ? "EmailSetup.Title" : "EmailSetup.ChangeTitle";
						} });
					} }),
					createComponent(MediaHeader.Subtitle, {
						get ["class"]() {
							return props.variant === "card" ? "secondary" : void 0;
						},
						get children() {
							return createComponent(I18nTsx, { get key() {
								return props.isInitialSetup ? "EmailSetup.Subtitle" : "EmailSetup.ChangeSubtitle";
							} });
						}
					})
				];
			}
		}), null);
		insert(_el$2, createComponent(StepForm, {
			get variant() {
				return props.variant;
			},
			get children() {
				return [createComponent(InputFieldTsx, {
					instanceRef: (ref) => inputRef = ref,
					get ["class"]() {
						return emailVerification_module_default.input;
					},
					label: "EmailSetup.InputCaption",
					get disabled() {
						return loading();
					},
					get value() {
						return email();
					},
					get errorLabel() {
						return error() ? null : void 0;
					},
					get errorDescriptionId() {
						return error() ? errorDescriptionId : void 0;
					},
					onRawInput: (val) => {
						setEmail(val);
						setError(void 0);
						inputRef.setState(InputState.Neutral);
					}
				}), (() => {
					var _el$3 = _tmpl$2();
					insert(_el$3, createComponent(Animated, {
						type: "cross-fade",
						get children() {
							return createComponent(Show, {
								get when() {
									return !error();
								},
								get fallback() {
									return (() => {
										var _el$5 = _tmpl$3();
										setAttribute(_el$5, "id", errorDescriptionId);
										insert(_el$5, createComponent(I18nTsx, { get key() {
											return error();
										} }));
										createRenderEffect(() => className$1(_el$5, emailVerification_module_default.error));
										return _el$5;
									})();
								},
								get children() {
									var _el$4 = _tmpl$2();
									insert(_el$4, createComponent(Button, {
										get ["class"]() {
											return classNames(emailVerification_module_default.button, "btn-primary btn-color-primary");
										},
										text: "Continue",
										get disabled() {
											return loading();
										},
										onClick: onSubmit
									}));
									createRenderEffect(() => className$1(_el$4, emailVerification_module_default.buttonContainer));
									return _el$4;
								}
							});
						}
					}));
					createRenderEffect(() => className$1(_el$3, emailVerification_module_default.footer));
					return _el$3;
				})()];
			}
		}), null);
		insert(_el$2, createComponent(SecondaryButton, { get action() {
			return props.secondaryAction;
		} }), null);
		createRenderEffect(() => className$1(_el$2, classNames(emailVerification_module_default.page, VARIANT_CLASSES[props.variant], props.class)));
		return _el$2;
	})();
}
function EnterCodeStep(props) {
	const [error, setError] = createSignal(void 0);
	const [loading, setLoading] = createSignal(false);
	const codeSignal = createSignal("");
	let inputRef;
	createEffect(() => {
		if (props.visible === false) return;
		onCleanup(focusWhenSettled(inputRef));
	});
	function onSubmit() {
		setLoading(true);
		(props.managers ?? rootScope.managers).appAccountManager.verifyEmail(props.purpose, {
			_: "emailVerificationCode",
			code: codeSignal[0]()
		}).then((result) => {
			setLoading(false);
			props.onSuccess(result);
		}).catch((err) => {
			if (err.type === "EMAIL_VERIFY_EXPIRED") {
				setLoading(false);
				return props.onExpired();
			}
			if (props.onError?.(err)) {
				setLoading(false);
				return;
			}
			if (err.type === "CODE_INVALID") setError("EmailSetup.WrongCode");
			else {
				console.error(err);
				setError("Error.AnError");
			}
			codeSignal[1]("");
			setTimeout(() => {
				setLoading(false);
				fastRaf(() => inputRef.focus());
			}, 200);
		});
	}
	return (() => {
		var _el$6 = _tmpl$2();
		insert(_el$6, createComponent(MediaHeader, {
			get marginBottom() {
				return props.variant === "tab";
			},
			get children() {
				return [
					createComponent(MediaHeader.Sticker, {
						name: "LoveLetter",
						get size() {
							return stickerSize(props.variant);
						}
					}),
					createComponent(MediaHeader.Title, { get children() {
						return createComponent(I18nTsx, { key: "EmailSetup.CheckEmail" });
					} }),
					createComponent(MediaHeader.Subtitle, {
						get ["class"]() {
							return props.variant === "card" ? "secondary" : void 0;
						},
						get children() {
							return createComponent(I18nTsx, {
								key: "EmailSetup.CheckEmailSubtitle",
								get args() {
									return [wrapEmailPattern(props.sentCode.email_pattern)];
								}
							});
						}
					})
				];
			}
		}), null);
		insert(_el$6, createComponent(StepForm, {
			get variant() {
				return props.variant;
			},
			get children() {
				return [createComponent(CodeInputField, {
					label: "AccDescr.EmailCode",
					ref(r$) {
						var _ref$ = inputRef;
						typeof _ref$ === "function" ? _ref$(r$) : inputRef = r$;
					},
					valueSignal: codeSignal,
					get ["class"]() {
						return emailVerification_module_default.input;
					},
					get length() {
						return props.sentCode.length;
					},
					get disabled() {
						return loading();
					},
					onFill: onSubmit,
					get error() {
						return error() != null;
					},
					onChange: () => setError(void 0)
				}), (() => {
					var _el$7 = _tmpl$2();
					insert(_el$7, createComponent(Animated, {
						type: "cross-fade",
						get children() {
							return createComponent(Show, {
								get when() {
									return !error();
								},
								get fallback() {
									return (() => {
										var _el$9 = _tmpl$3();
										insert(_el$9, createComponent(I18nTsx, { get key() {
											return error();
										} }));
										createRenderEffect(() => className$1(_el$9, emailVerification_module_default.error));
										return _el$9;
									})();
								},
								get children() {
									var _el$8 = _tmpl$2();
									insert(_el$8, createComponent(Button, {
										get ["class"]() {
											return classNames(emailVerification_module_default.button, "btn-primary btn-color-primary");
										},
										text: "Continue",
										get disabled() {
											return loading() || codeSignal[0]().length !== props.sentCode.length;
										},
										onClick: onSubmit
									}));
									createRenderEffect(() => className$1(_el$8, emailVerification_module_default.buttonContainer));
									return _el$8;
								}
							});
						}
					}));
					createRenderEffect(() => className$1(_el$7, emailVerification_module_default.footer));
					return _el$7;
				})()];
			}
		}), null);
		insert(_el$6, createComponent(SecondaryButton, { get action() {
			return props.secondaryAction;
		} }), null);
		createRenderEffect(() => className$1(_el$6, classNames(emailVerification_module_default.page, VARIANT_CLASSES[props.variant], props.class)));
		return _el$6;
	})();
}
//#endregion
export { Section as a, generateDelimiter as c, wrapEmailPattern as i, EnterEmailStep as n, SectionName as o, emailVerification_exports as r, appendSectionContent as s, EnterCodeStep as t };
