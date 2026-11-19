//# allFunctionsCalledOnLoad
import { d as ctx, h as Modes } from "./userAgent-ByGXcznk.js";
import { n as fastRaf } from "./schedulers-Cx0-7a1P.js";
import { t as Icon } from "./icon-DbP6Es97.js";
import { a as i18n, d as setBlankToAnchor, u as langPack_default } from "./langPack-BmdJGr44.js";
import { C as createSignal, M as onCleanup, N as onMount, p as createComponent, s as Show, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { t as tsNow } from "./tsNow-DUzGGNNb.js";
import { t as cancelEvent } from "./cancelEvent-Cw8vYZHp.js";
import { c as insert, g as template, o as className, t as Dynamic } from "./web-BPyQozky.js";
import { n as mediaSizes } from "./mediaSizes-C1MTaleW.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
import { t as Button } from "./buttonTsx-Bwphkm9r.js";
import { n as attachClickEvent } from "./clickEvent-COk4YpLP.js";
import { t as lottieLoader } from "./lottieLoader-B3FXw0K7.js";
import { n as InputState, t as InputField } from "./inputField-CaCo30N0.js";
import { n as preloadPasswordMonkey } from "./password-CY8CwFDA.js";
import { l as formatDuration, r as wrapFormattedDuration, s as toHHMMSS } from "./wrapDuration-BQgz9hDF.js";
import { t as MediaHeader } from "./mediaHeader-CnpQNwOl.js";
import { t as anchorCallback } from "./anchorCallback-BbwAJdBk.js";
import { i as wrapEmailPattern } from "./emailVerification-C8QYZSyu.js";
import { r as toastNew } from "./toast-B6VD5M7R.js";
import { n as CodeInputFieldCompat } from "./codeInputField-CuXF8PSB.js";
import { t as focusWhenSettled } from "./focusWhenSettled-C7GmSekj.js";
import { n as preloadTrackingMonkey, t as TrackingMonkey } from "./tracking-FB0DWOAE.js";
import { t as getFloodWaitTime } from "./getFloodWaitTime-CA7439If.js";
import { n as useAuthFlow, t as authFlow_module_default } from "./mountAuthFlow-D-_L6zCe.js";
import { n as simpleConfirmation, t as whenDetached } from "./whenDetached-Da0StEoY.js";
import { t as AuthCard } from "./AuthCard-CS3Ku-Aa.js";
import { t as AuthCardError } from "./AuthCardError-C9ELtFaQ.js";
import { a as getResendLangKey, c as isEmailCode, d as withPhoneNumber, i as getCodeLength, n as getCodeBeginning, o as getResendPendingLangKey, r as getCodeInputKind, s as getResendTimeout, t as beginsOk, u as sentCodeToCardSpec } from "./sentCode-CjBd3iOg.js";
import { t as continueLogin } from "./continueLogin-bBDNivsU.js";
//#region src/pages/cards/AuthCodeCard.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div>`);
preloadTrackingMonkey();
/** A phone number inside a sentence: it reads left to right in any language. */
function wrapLeftToRight(text) {
	const span = document.createElement("span");
	span.dir = "ltr";
	span.textContent = text;
	return span;
}
/**
* Card variant of `pageAuthCode` — every code the server can ask for, except the
* one that needs a login email first (that one goes to the `emailSetup` cards,
* see `sentCodeToCardSpec`).
*
* Digit codes (app / SMS / call / missed call / Fragment / email) submit
* themselves once the last box is filled; a secret word or phrase
* (`auth.sentCodeTypeSmsWord` / `…SmsPhrase`) is free text, so it gets a plain
* field with a Next button and is checked against the `beginning` the server
* disclosed before a server attempt is spent.
*
* Where the typed code goes differs too: a login email proves the *email*, so it
* travels in `auth.signIn.email_verification`; everything else is `phone_code`.
*
* Branches:
* - `auth.signIn` → success → IM
* - `authorizationSignUpRequired` → signUp card
* - `SESSION_PASSWORD_NEEDED` → password card
*
* `auth.resendCode` and `auth.resetLoginEmail` answer with a new `auth.sentCode`
* that can be of any type — including one this card does not own — so both route
* back through `sentCodeToCardSpec` instead of assuming they stay here. When the
* answer does stay here, it is applied in place (rebuilding the input, animation
* and subtitle inline) rather than bouncing through the navigation system, which
* would flash the card.
*/
function AuthCodeCard(props) {
	const { managers, navigate, toIm, isLeaving } = useAuthFlow();
	let sentCode = props.spec.payload;
	const [sentTypeContent, setSentTypeContent] = createSignal();
	const [resetEmailContent, setResetEmailContent] = createSignal();
	const [resendContent, setResendContent] = createSignal();
	const [inputKind, setInputKind] = createSignal(getCodeInputKind(sentCode.type));
	const [submitting, setSubmitting] = createSignal(false);
	const [errorContent, setErrorContent] = createSignal();
	const stickerHost = document.createElement("div");
	const stickerSize = mediaSizes.isMobile ? 100 : 130;
	let monkey;
	let player;
	let resetEmailTimer;
	let resendTimer;
	let resending = false;
	let gone = false;
	const isGone = () => gone || isLeaving();
	const phoneEl = document.createElement(Modes.a11y ? "span" : "h4");
	phoneEl.classList.add(authFlow_module_default.phone);
	phoneEl.dir = "ltr";
	const editButton = document.createElement("span");
	editButton.classList.add(authFlow_module_default.phoneEdit);
	editButton.setAttribute("role", "button");
	editButton.setAttribute("aria-label", langPack_default.format("Edit", true));
	if (Modes.a11y) editButton.tabIndex = 0;
	editButton.append(Icon("edit"));
	attachClickEvent(editButton, () => {
		managers.appAccountManager.cancelCode(sentCode.phone_number, sentCode.phone_code_hash);
		navigate({ name: "signIn" });
	});
	const inputHost = document.createElement("div");
	inputHost.classList.add(authFlow_module_default.codeInputHost);
	let codeInputField;
	let textInputField;
	let currentInputKind;
	const activeInput = () => codeInputField?.input ?? textInputField?.input;
	function clearError() {
		if (codeInputField) codeInputField.error = false;
		textInputField?.setState(InputState.Neutral);
		setErrorContent(void 0);
	}
	function markError(content) {
		if (codeInputField) codeInputField.error = true;
		textInputField?.setState(InputState.Error);
		setErrorContent(content);
	}
	function showError(key) {
		markError(i18n(key));
	}
	/**
	* Leaves the field's nodes where they are: the card unmounts before its exit
	* animation starts, and a field pulled out of it then would collapse the card
	* while it is still fading out. Only a rebuild detaches them.
	*/
	function disposeInput() {
		codeInputField?.cleanup();
		codeInputField = void 0;
		textInputField = void 0;
	}
	function rebuildInput() {
		const kind = getCodeInputKind(sentCode.type);
		const length = getCodeLength(sentCode.type);
		disposeInput();
		inputHost.replaceChildren();
		currentInputKind = kind;
		setInputKind(kind);
		if (kind === "digits") {
			codeInputField = new CodeInputFieldCompat({
				length,
				onChange: clearError,
				onFill: (code) => submitCode(code),
				class: authFlow_module_default.codeInputField
			});
			inputHost.append(codeInputField.container);
			return;
		}
		textInputField = new InputField({
			plainText: true,
			label: sentCode.type._ === "auth.sentCodeTypeSmsWord" ? "Login.Code.SecretWord" : "Login.Code.SecretPhrase",
			name: "sms-word",
			onRawInput: clearError
		});
		textInputField.container.classList.add(authFlow_module_default.wordInputField);
		textInputField.input.addEventListener("keydown", (e) => {
			if (e.key !== "Enter") return;
			cancelEvent(e);
			submitTextCode();
		});
		inputHost.append(textInputField.container);
	}
	function submitTextCode() {
		const value = textInputField?.value.trim();
		if (!value || submitting()) return;
		submitCode(value);
	}
	function submitCode(code) {
		if (currentInputKind === "text" && !beginsOk(code, getCodeBeginning(sentCode.type))) {
			showError("Login.Code.WordBeginningInvalid");
			return;
		}
		setSubmitting(true);
		setInputDisabled(true);
		const params = {
			phone_number: sentCode.phone_number,
			phone_code_hash: sentCode.phone_code_hash
		};
		if (isEmailCode(sentCode.type)) params.email_verification = {
			_: "emailVerificationCode",
			code
		};
		else params.phone_code = code;
		managers.appAccountManager.signIn(params).then(async (response) => {
			switch (response._) {
				case "auth.authorization":
					await managers.apiManager.setUser(response.user);
					toIm();
					break;
				case "auth.authorizationSignUpRequired": navigate({
					name: "signUp",
					payload: {
						phone_number: sentCode.phone_number,
						phone_code_hash: sentCode.phone_code_hash
					}
				});
			}
		}).catch((err) => {
			let good = false;
			switch (err.type) {
				case "SESSION_PASSWORD_NEEDED":
					good = true;
					navigate({ name: "password" });
					break;
				case "PHONE_CODE_EXPIRED":
					showError("PHONE_CODE_EXPIRED");
					break;
				case "PHONE_CODE_EMPTY":
				case "PHONE_CODE_INVALID":
					showError(invalidCodeLangKey());
					break;
				default: {
					const floodWait = getFloodWaitTime(err);
					if (floodWait.hasWaitTime) markError(i18n("Login.Code.TooManyAttempts", [wrapFormattedDuration(formatDuration(floodWait.waitTime))]));
					else markError(err.type);
					break;
				}
			}
			setSubmitting(false);
			setInputDisabled(false);
			if (!good) {
				clearInputValue();
				fastRaf(() => activeInput()?.focus());
			}
		});
	}
	function invalidCodeLangKey() {
		switch (sentCode.type._) {
			case "auth.sentCodeTypeSmsWord":
			case "auth.sentCodeTypeSmsPhrase": return "Login.Code.WordInvalid";
			default: return "PHONE_CODE_INVALID";
		}
	}
	function setInputDisabled(disabled) {
		if (codeInputField) codeInputField.disabled = disabled;
		textInputField?.input.toggleAttribute("disabled", disabled);
	}
	function clearInputValue() {
		if (codeInputField) codeInputField.value = "";
	}
	function rebuildAnimation() {
		monkey?.remove();
		monkey = void 0;
		player?.remove();
		player = void 0;
		stickerHost.replaceChildren();
		if (sentCode.type._ === "auth.sentCodeTypeFragmentSms") {
			const container = document.createElement("div");
			container.classList.add("media-sticker-wrapper");
			stickerHost.append(container);
			return lottieLoader.loadAnimationAsAsset({
				container,
				loop: true,
				autoplay: true,
				width: stickerSize,
				height: stickerSize
			}, "jolly_roger").then((animation) => {
				player = animation;
				return lottieLoader.waitForFirstFrame(animation);
			}).then(() => {});
		}
		monkey = new TrackingMonkey(codeInputField ?? textInputField, stickerSize);
		stickerHost.append(monkey.container);
		return monkey.load();
	}
	/**
	* Every answer that replaces `sentCode` also replaces the `phone_code_hash`
	* the sign-in hangs on, so the stored state has to follow it — a reload that
	* restored the previous one would sign in with a dead hash.
	*/
	function persistSentCode() {
		managers.appStateManager.pushToState("authState", {
			_: "authStateAuthCode",
			sentCode
		});
	}
	/**
	* Any of the code types can turn into any other one mid-flow, including one
	* that belongs to a different card — route first, apply in place second.
	*/
	function applyNewSentCode(next) {
		const spec = sentCodeToCardSpec(next);
		if (spec.name !== "authCode") {
			navigate(spec);
			return;
		}
		sentCode = next;
		applySentCode();
	}
	function stopResendTimer() {
		if (resendTimer) {
			clearTimeout(resendTimer);
			resendTimer = void 0;
		}
	}
	function updateResend() {
		stopResendTimer();
		const key = getResendLangKey(sentCode.next_type);
		if (!key) {
			setResendContent(void 0);
			return;
		}
		if (resending) return;
		const diff = sentCode.resend_deadline - tsNow(true);
		if (diff > 0) {
			setResendContent(i18n(getResendPendingLangKey(sentCode.next_type), [toHHMMSS(diff)]));
			resendTimer = ctx.setTimeout(updateResend, 1e3);
			return;
		}
		setResendContent(i18n(key, [anchorCallback(resendCode)]));
	}
	function resendCode() {
		if (resending) return;
		resending = true;
		stopResendTimer();
		setResendContent(i18n("Login.Code.Resending"));
		managers.appAccountManager.resendCode(sentCode.phone_number, sentCode.phone_code_hash).then((code) => {
			resending = false;
			return continueLogin(code, {
				managers,
				navigate,
				toIm,
				phone_number: sentCode.phone_number,
				phone_code_hash: sentCode.phone_code_hash,
				onSentCode: applyNewSentCode
			});
		}).catch((err) => {
			resending = false;
			if (isGone()) return;
			console.error("auth.resendCode error:", err);
			toastNew({ langPackKey: "Error.AnError" });
			updateResend();
		});
	}
	function handleResetEmail() {
		managers.appAccountManager.resetLoginEmail(sentCode.phone_number, sentCode.phone_code_hash).then((code) => {
			if (code._ === "auth.sentCode") {
				const next = withPhoneNumber(code, sentCode.phone_number);
				if (next.type._ === "auth.sentCodeTypeEmailCode") {
					next.resend_deadline = sentCode.resend_deadline;
					sentCode = next;
					persistSentCode();
					updatePendingEmail(next.type);
				} else applyNewSentCode(next);
			} else {
				console.error(code);
				toastNew({ langPackKey: "Error.AnError" });
			}
		}).catch((err) => {
			if (isGone()) return;
			if (err.type.includes("TASK_ALREADY_EXISTS")) simpleConfirmation({
				titleLangKey: "Login.ResetEmail.NeedPremium",
				descriptionLangKey: "Login.ResetEmail.NeedPremiumText",
				button: { langKey: "OK" }
			});
			else {
				console.error(err);
				toastNew({ langPackKey: "Error.AnError" });
			}
		});
	}
	function updatePendingEmail(type) {
		if (resetEmailTimer) {
			clearTimeout(resetEmailTimer);
			resetEmailTimer = void 0;
		}
		if (type.reset_pending_date != null) {
			const diff = type.reset_pending_date - tsNow(true);
			if (diff <= 0 || type.reset_pending_date <= 0) {
				setResetEmailContent(i18n("Login.ResetEmail.PleaseWait"));
				handleResetEmail();
				return;
			}
			setResetEmailContent(i18n("Login.ResetEmail.Pending", [wrapFormattedDuration(formatDuration(diff, 2)), anchorCallback(handleResetEmail)]));
			resetEmailTimer = ctx.setTimeout(() => updatePendingEmail(type), 3e4);
			return;
		}
		if (type.reset_available_period != null) setResetEmailContent(i18n("TroubleEmail", [anchorCallback(() => {
			simpleConfirmation({
				titleLangKey: "Login.ResetEmail.Title",
				descriptionLangKey: "Login.ResetEmail.Text",
				descriptionArgs: [wrapFormattedDuration(formatDuration(type.reset_available_period, 2))],
				button: { langKey: "Login.ResetEmail.Title" }
			}).then(() => handleResetEmail());
		})]));
	}
	function applySentCode() {
		var _sentCode;
		const isOnScreen = inputHost.isConnected;
		rebuildInput();
		if (isOnScreen) fastRaf(() => activeInput()?.focus());
		phoneEl.innerText = sentCode.phone_number ?? "";
		setErrorContent(void 0);
		setSubmitting(false);
		if (resetEmailTimer) {
			clearTimeout(resetEmailTimer);
			resetEmailTimer = void 0;
		}
		setResetEmailContent(void 0);
		let key;
		let args;
		const type = sentCode.type;
		switch (type._) {
			case "auth.sentCodeTypeSms":
			case "auth.sentCodeTypeFirebaseSms":
				key = "Login.Code.SentSms";
				break;
			case "auth.sentCodeTypeApp":
				key = "Login.Code.SentInApp";
				break;
			case "auth.sentCodeTypeCall":
				key = "Login.Code.SentCall";
				break;
			case "auth.sentCodeTypeMissedCall":
				key = "Login.Code.SentMissedCall";
				args = [wrapLeftToRight(type.prefix)];
				break;
			case "auth.sentCodeTypeSmsWord":
			case "auth.sentCodeTypeSmsPhrase": {
				const isWord = type._ === "auth.sentCodeTypeSmsWord";
				const phone = wrapLeftToRight(sentCode.phone_number);
				if (type.beginning) {
					key = isWord ? "Login.Code.SentSmsWordBeginning" : "Login.Code.SentSmsPhraseBeginning";
					args = [phone, type.beginning];
				} else {
					key = isWord ? "Login.Code.SentSmsWord" : "Login.Code.SentSmsPhrase";
					args = [phone];
				}
				break;
			}
			case "auth.sentCodeTypeFragmentSms": {
				key = "PhoneNumber.Code.Fragment.Info";
				const a = document.createElement("a");
				setBlankToAnchor(a);
				a.href = type.url;
				args = [a];
				break;
			}
			case "auth.sentCodeTypeEmailCode":
				key = "Login.Code.SentEmail";
				args = [wrapEmailPattern(type.email_pattern)];
				updatePendingEmail(type);
				break;
			default:
				key = "Login.Code.SentUnknown";
				args = [type._];
		}
		setSentTypeContent(i18n(key, args));
		(_sentCode = sentCode).resend_deadline ?? (_sentCode.resend_deadline = tsNow(true) + getResendTimeout(sentCode));
		updateResend();
		persistSentCode();
		rebuildAnimation().catch(() => {});
	}
	let cancelFocus;
	onMount(() => {
		preloadPasswordMonkey();
		applySentCode();
		cancelFocus = focusWhenSettled(activeInput());
	});
	onCleanup(() => {
		gone = true;
		cancelFocus?.();
		if (resetEmailTimer) clearTimeout(resetEmailTimer);
		stopResendTimer();
		disposeInput();
		const leaving = monkey, leavingPlayer = player;
		monkey = player = void 0;
		whenDetached(stickerHost.closest("." + authFlow_module_default.card), () => {
			leaving?.remove();
			leavingPlayer?.remove();
		});
	});
	return createComponent(AuthCard, {
		get ["class"]() {
			return authFlow_module_default.pageAuthCode;
		},
		get header() {
			return createComponent(MediaHeader, { get children() {
				return [
					createComponent(MediaHeader.Sticker, {
						element: stickerHost,
						size: stickerSize
					}),
					createComponent(MediaHeader.Title, {
						get tag() {
							return Modes.a11y ? "h1" : void 0;
						},
						get children() {
							return createComponent(Dynamic, {
								get component() {
									return Modes.a11y ? "span" : "div";
								},
								get ["class"]() {
									return authFlow_module_default.phoneWrapper;
								},
								get children() {
									return [phoneEl, editButton];
								}
							});
						}
					}),
					createComponent(MediaHeader.Subtitle, {
						"class": "secondary",
						get children() {
							return sentTypeContent();
						}
					})
				];
			} });
		},
		inputWrapper: false,
		get children() {
			return [
				inputHost,
				createComponent(AuthCardError, {
					get content() {
						return errorContent();
					},
					get describes() {
						return activeInput();
					}
				}),
				createComponent(Show, {
					get when() {
						return inputKind() === "text";
					},
					get children() {
						return createComponent(Button, {
							get ["class"]() {
								return classNames("btn-primary btn-color-primary", authFlow_module_default.wordSubmit);
							},
							get disabled() {
								return submitting();
							},
							onClick: submitTextCode,
							text: "Login.Next"
						});
					}
				}),
				createComponent(Show, {
					get when() {
						return resendContent();
					},
					get children() {
						var _el$ = _tmpl$();
						insert(_el$, resendContent);
						createRenderEffect(() => className(_el$, authFlow_module_default.cardLink));
						return _el$;
					}
				}),
				createComponent(Show, {
					get when() {
						return resetEmailContent();
					},
					get children() {
						var _el$2 = _tmpl$();
						insert(_el$2, resetEmailContent);
						createRenderEffect(() => className(_el$2, authFlow_module_default.cardLink));
						return _el$2;
					}
				})
			];
		}
	});
}
//#endregion
export { AuthCodeCard as default };
