//# allFunctionsCalledOnLoad
import { p as createComponent } from "./solid-9Vxm0VIz.js";
import { c as insert, g as template, u as memo } from "./web-BPyQozky.js";
import { t as IconTsx } from "./iconTsx-B4lOk4A6.js";
import { t as I18nTsx } from "./i18n-CGMFiAW0.js";
import { L as formatFullSentTime } from "./index-B7axFZql.js";
import { C as ButtonIconTsx } from "./openEditors-7FmA7q_V.js";
import { t as showDatePickerPopup } from "./datePicker-D1G1w7Ns.js";
import { t as SimpleFormField } from "./simpleFormField-CGA0MMzH.js";
var commonStyles_module_default = { Icon: "_Icon_17ee9_1" };
//#endregion
//#region src/components/chat/suggestPostPopup/publishTimeField.tsx
var _tmpl$ = /*#__PURE__*/ template(`<span>`);
var PUBLISH_MIN_DELAY_MINUTES = 10;
var PublishTimeField = (props) => {
	const onContainerClick = () => {
		const minTimeDate = /* @__PURE__ */ new Date();
		minTimeDate.setMinutes(minTimeDate.getMinutes() + PUBLISH_MIN_DELAY_MINUTES);
		const minDate = new Date(minTimeDate);
		minDate.setHours(0, 0, 0, 0);
		showDatePickerPopup({
			initDate: new Date(minTimeDate),
			minDate,
			minTimeDate,
			withTime: true,
			onPick: (timestamp) => {
				props.onChange(timestamp);
			}
		});
	};
	const onCrossClick = (event) => {
		event.stopPropagation();
		props.onChange(void 0);
	};
	return createComponent(SimpleFormField, {
		clickable: true,
		get withEndButtonIcon() {
			return !!props.value;
		},
		onClick: onContainerClick,
		get children() {
			return [
				createComponent(SimpleFormField.InputStub, { get children() {
					return memo(() => !!props.value)() ? (() => {
						var _el$ = _tmpl$();
						insert(_el$, () => formatFullSentTime(props.value));
						return _el$;
					})() : createComponent(I18nTsx, { get key() {
						return props.noTimeLangKey;
					} });
				} }),
				createComponent(SimpleFormField.Label, {
					active: true,
					get children() {
						return createComponent(I18nTsx, { key: "SuggestedPosts.PublishingTime.Label" });
					}
				}),
				createComponent(SimpleFormField.SideContent, {
					last: true,
					get children() {
						return memo(() => !!props.value)() ? createComponent(ButtonIconTsx, {
							icon: "cross",
							tabIndex: -1,
							onClick: onCrossClick
						}) : createComponent(IconTsx, {
							get ["class"]() {
								return commonStyles_module_default.Icon;
							},
							icon: "down"
						});
					}
				})
			];
		}
	});
};
//#endregion
export { commonStyles_module_default as n, PublishTimeField as t };
