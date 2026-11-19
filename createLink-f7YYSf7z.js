//# allFunctionsCalledOnLoad
import { a as i18n } from "./langPack-BmdJGr44.js";
import { C as createSignal, g as createEffect, p as createComponent, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { c as insert, g as template, o as className } from "./web-BPyQozky.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
import { i as createPopup, n as PopupElement, o as usePopupContext } from "./indexTsx-v9mB9bAq.js";
import { t as InputField } from "./inputField-CaCo30N0.js";
import { t as subscribeOn } from "./subscribeOn-DnCla7ws.js";
import { n as normalizeLinkUrl } from "./normalizeLinkUrl-Rr-N4Ncf.js";
var createLink_module_default = {
	popup: "_popup_1ym01_1",
	fields: "_fields_1ym01_5"
};
//#endregion
//#region src/components/popups/createLink.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div>`);
function showCreateLinkPopup(options = {}) {
	return new Promise((resolve, reject) => {
		let settled = false;
		createPopup(() => {
			const textInputField = new InputField({
				label: "Chat.Input.Editor.Link.Text",
				plainText: true,
				required: true,
				withLinebreaks: false
			});
			const urlInputField = new InputField({
				label: "URL",
				plainText: true,
				required: true,
				validate: () => !!normalizeLinkUrl(urlInputField.value),
				withLinebreaks: false
			});
			const urlInput = urlInputField.input;
			urlInput.autocapitalize = "none";
			urlInput.spellcheck = false;
			if (options.text) textInputField.setValueSilently(options.text);
			if (options.url) urlInputField.setValueSilently(options.url);
			const [valid, setValid] = createSignal(false);
			const updateValidity = () => setValid(textInputField.isValid() && urlInputField.isValid());
			subscribeOn(textInputField.input)("input", updateValidity);
			subscribeOn(urlInputField.input)("input", updateValidity);
			subscribeOn(textInputField.input)("keydown", (event) => {
				if (event.key !== "Enter") return;
				event.preventDefault();
				event.stopPropagation();
				urlInputField.input.focus();
				urlInputField.select();
			});
			updateValidity();
			const Fields = () => {
				const popup = usePopupContext();
				createEffect(() => {
					if (!popup.shown()) return;
					queueMicrotask(() => {
						if (popup.destroyed || !popup.shown()) return;
						const field = textInputField.value ? urlInputField : textInputField;
						field.input.focus();
						field.select();
					});
				});
				return (() => {
					var _el$ = _tmpl$();
					insert(_el$, () => textInputField.container, null);
					insert(_el$, () => urlInputField.container, null);
					createRenderEffect(() => className(_el$, createLink_module_default.fields));
					return _el$;
				})();
			};
			return createComponent(PopupElement, {
				get ["class"]() {
					return classNames("popup-create-link", createLink_module_default.popup);
				},
				closable: true,
				onClose: () => {
					if (!settled) reject();
				},
				get children() {
					return [
						createComponent(PopupElement.Header, { get children() {
							return [createComponent(PopupElement.CloseButton, {}), createComponent(PopupElement.Title, { get children() {
								return i18n(options.editing ? "Chat.Input.Editor.Link.EditTitle" : "Chat.Input.Editor.Link.Title");
							} })];
						} }),
						createComponent(PopupElement.Body, { get children() {
							return createComponent(Fields, {});
						} }),
						createComponent(PopupElement.Footer, { get children() {
							return createComponent(PopupElement.FooterButton, {
								confirm: true,
								get disabled() {
									return !valid();
								},
								get langKey() {
									return options.editing ? "Save" : "Create";
								},
								callback: () => {
									const url = normalizeLinkUrl(urlInputField.value);
									if (!textInputField.isValid() || !url) return false;
									settled = true;
									resolve({
										text: textInputField.value,
										url
									});
								}
							});
						} })
					];
				}
			});
		});
	});
}
//#endregion
export { showCreateLinkPopup as default };
