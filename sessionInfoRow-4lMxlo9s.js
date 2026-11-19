//# allFunctionsCalledOnLoad
import { p as createComponent } from "./solid-9Vxm0VIz.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
import { i as Row } from "./confirmationPopup-Bz6mK0o-.js";
var sessionDetails_module_default = {
	heroHeader: "_heroHeader_1cz47_16",
	deviceIcon: "_deviceIcon_1cz47_20",
	deviceName: "_deviceName_1cz47_31",
	value: "_value_1cz47_43",
	deviceValue: "_deviceValue_1cz47_48",
	profileLink: "_profileLink_1cz47_52",
	manageRow: "_manageRow_1cz47_65"
};
//#endregion
//#region src/components/sidebarLeft/tabs/sessionInfoRow.tsx
var EMPTY_VALUE = "—";
/**
* One "label → value" line of a session's info section, shared by the device
* session and the connected bot session views.
*/
function SessionInfoRow(props) {
	return createComponent(Row, { get children() {
		return createComponent(Row.Title, {
			get titleRight() {
				return props.value || EMPTY_VALUE;
			},
			get titleRightClass() {
				return classNames("text-overflow-no-wrap", props.valueClass || sessionDetails_module_default.value);
			},
			titleRightSecondary: true,
			get children() {
				return props.label;
			}
		});
	} });
}
//#endregion
export { sessionDetails_module_default as n, SessionInfoRow as t };
