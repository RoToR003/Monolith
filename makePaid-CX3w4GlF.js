//# allFunctionsCalledOnLoad
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { u as langPack_default } from "./langPack-BmdJGr44.js";
import { C as createSignal, p as createComponent } from "./solid-9Vxm0VIz.js";
import { n as bindManagersToSession } from "./bindManagersToAccount-BL82O9H9.js";
import { u as memo } from "./web-BPyQozky.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { i as createPopup, n as PopupElement } from "./indexTsx-v9mB9bAq.js";
import { o as createMiddleware } from "./sticker-5twBOy1Y.js";
import { t as InputField } from "./inputField-CaCo30N0.js";
import { V as currencyStarIcon } from "./confirmationPopup-Bz6mK0o-.js";
import { t as anchorCallback } from "./anchorCallback-BbwAJdBk.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { t as shake } from "./shake-1vPuqgfm.js";
//#region src/components/popups/makePaid.tsx
function InputStarsField(options) {
	const inputField = new InputField({
		inputMode: "numeric",
		label: options.label,
		placeholder: options.placeholder,
		plainText: true,
		withLinebreaks: false
	});
	inputField.container.classList.add("popup-make-paid-input");
	const ariaLabelKey = options.label || options.placeholder;
	if (ariaLabelKey) inputField.input.setAttribute("aria-label", langPack_default.format(ariaLabelKey, true));
	const star = currencyStarIcon();
	star.classList.add("popup-make-paid-star");
	inputField.container.append(star);
	const onInput = () => {
		let newValue = ("" + +inputField.value).replace(/[^0-9]/g, "");
		if (+newValue > options.max) newValue = "" + options.max;
		inputField.setValueSilently(newValue);
		options.onValue?.(+newValue);
	};
	inputField.input.addEventListener("input", onInput);
	options.middleware.onDestroy(() => {
		inputField.input.removeEventListener("input", onInput);
	});
	return inputField;
}
async function showMakePaidPopup(onSave, editingFrom) {
	const managers = bindManagersToSession(rootScope.managers);
	const appConfig = await rootScope.managers.apiManager.getAppConfig();
	const [show, setShow] = createSignal(true);
	createPopup(() => {
		const inputField = InputStarsField({
			middleware: createMiddleware().get(),
			label: "PaidMedia.Enter",
			max: appConfig.stars_paid_post_amount_max
		});
		if (editingFrom) inputField.value = "" + editingFrom;
		return createComponent(PopupElement, {
			managers,
			"class": "popup-make-paid",
			closable: true,
			get show() {
				return show();
			},
			initialFocus: () => inputField.input,
			get children() {
				return [
					createComponent(PopupElement.Header, { get children() {
						return [createComponent(PopupElement.CloseButton, {}), createComponent(PopupElement.Title, { title: "PaidMedia.Title" })];
					} }),
					createComponent(PopupElement.Body, { get children() {
						return createComponent(Section, {
							caption: "PaidMedia.Caption",
							get captionArgs() {
								return [anchorCallback(() => {
									hotReloadGuard.showStarsPopup();
								})];
							},
							get children() {
								return inputField.container;
							}
						});
					} }),
					createComponent(PopupElement.Footer, { get children() {
						return [createComponent(PopupElement.FooterButton, {
							langKey: "PaidMedia.Button",
							callback: () => {
								const value = parseInt(inputField.value || "0");
								if (value > 0) {
									onSave(value);
									return;
								}
								shake(inputField.container);
								return false;
							}
						}), memo(() => editingFrom && createComponent(PopupElement.FooterButton, {
							color: "secondary",
							langKey: "PaidMedia.KeepFree",
							callback: () => onSave(0)
						}))];
					} })
				];
			}
		});
	});
}
//#endregion
export { showMakePaidPopup as n, InputStarsField as t };
