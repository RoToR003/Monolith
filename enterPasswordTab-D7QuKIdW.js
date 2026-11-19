//# allFunctionsCalledOnLoad
import { a as i18n } from "./langPack-BmdJGr44.js";
import { C as createSignal, M as onCleanup, g as createEffect, p as createComponent, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { _ as use, c as insert, g as template, o as className } from "./web-BPyQozky.js";
import { t as ripple } from "./ripple-D7hcIc_t.js";
import { t as PasswordInputField } from "./passwordInputField-QceorkLx.js";
import { t as InputFieldTsx } from "./inputFieldTsx-0SbEFdGE.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { t as Space } from "./space-XGOOgiuc.js";
import { t as usePasscodeActions } from "./actions-StFhfjLY.js";
import { t as SettingsTabLottieAnimation } from "./settingsTabLottieAnimation-B4U2pG04.js";
import { t as common_module_default } from "./common.module-x2zhfStI.js";
//#region src/components/sidebarLeft/tabs/passcodeLock/enterPasswordTab.tsx
var _tmpl$ = /*#__PURE__*/ template(`<form action autocomplete=off><div></div><div><button type=submit class="btn-primary btn-color-primary btn-large">`);
var EnterPasswordTab = () => {
	const [tab] = useSuperTab();
	const actions = usePasscodeActions();
	let inputField;
	const [value, setValue] = createSignal("");
	const [isError, setIsError] = createSignal(false);
	createEffect(() => {
		value();
		setIsError(false);
	});
	setTimeout(() => {
		inputField.input.focus();
	}, 400);
	onCleanup(() => {
		setValue("");
		inputField.input.value = "";
	});
	const canSubmit = () => value() && value().length <= 32;
	let isSubmitting = false;
	async function onSubmit(e) {
		e.preventDefault();
		if (!canSubmit() || isSubmitting) return;
		isSubmitting = true;
		try {
			await tab.payload.onSubmit(value(), tab, actions);
		} catch {
			setIsError(true);
		} finally {
			isSubmitting = false;
		}
	}
	return createComponent(Section, {
		caption: "PasscodeLock.Notice",
		get children() {
			return [
				createComponent(SettingsTabLottieAnimation, { name: "UtyanPasscode" }),
				createComponent(Space, { amount: "1.125rem" }),
				(() => {
					var _el$ = _tmpl$(), _el$2 = _el$.firstChild, _el$3 = _el$2.nextSibling, _el$4 = _el$3.firstChild;
					_el$.addEventListener("submit", onSubmit);
					insert(_el$2, createComponent(InputFieldTsx, {
						InputFieldClass: PasswordInputField,
						instanceRef: (ref) => void (inputField = ref),
						maxLength: 32,
						autocomplete: "off",
						get value() {
							return value();
						},
						get errorLabel() {
							return isError() ? "PasscodeLock.PasscodesDontMatch" : void 0;
						},
						get label() {
							return tab.payload.inputLabel;
						},
						onRawInput: setValue
					}));
					insert(_el$, createComponent(Space, { amount: "1rem" }), _el$3);
					use(ripple, _el$4, () => true);
					insert(_el$4, () => i18n(tab.payload.buttonText));
					createRenderEffect((_p$) => {
						var _v$ = common_module_default.AdditionalPadding, _v$2 = common_module_default.AdditionalPadding, _v$3 = !canSubmit();
						_v$ !== _p$.e && className(_el$2, _p$.e = _v$);
						_v$2 !== _p$.t && className(_el$3, _p$.t = _v$2);
						_v$3 !== _p$.a && (_el$4.disabled = _p$.a = _v$3);
						return _p$;
					}, {
						e: void 0,
						t: void 0,
						a: void 0
					});
					return _el$;
				})(),
				createComponent(Space, { amount: "1rem" })
			];
		}
	});
};
//#endregion
export { EnterPasswordTab as default };
