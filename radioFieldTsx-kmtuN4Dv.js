//# allFunctionsCalledOnLoad
import { t as Icon } from "./icon-DbP6Es97.js";
import { t as apiManagerProxy } from "./apiManagerProxy-DmQXvxSF.js";
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { I as splitProps, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { s as getDeepProperty } from "./liteMode-DeLStZfQ.js";
import { t as attachClassName } from "./classname-DB9i2ReQ.js";
import { n as simulateEvent } from "./dispatchEvent-CZVxCUd_.js";
import { g as RADIO_FIELD_RIGHT_CLASS } from "./confirmationPopup-Bz6mK0o-.js";
import { t as subscribeOn } from "./subscribeOn-DnCla7ws.js";
//#region src/components/radioField.ts
/**
* The radio control only. Any visible label belongs to the hosting Row.Title.
*/
var RadioField = class {
	constructor(options) {
		const container = this.container = document.createElement("span");
		container.classList.add("radio-field");
		if (options.alignRight) container.classList.add(RADIO_FIELD_RIGHT_CLASS);
		const input = this.input = document.createElement("input");
		input.type = "radio";
		input.name = "input-radio-" + options.name;
		if (options.value !== void 0) {
			input.value = options.value;
			const getValueForState = () => "valueForState" in options ? options.valueForState : options.value;
			if (options.stateKey) {
				apiManagerProxy.getState().then((state) => {
					input.checked = getDeepProperty(state, options.stateKey) === getValueForState();
				});
				input.addEventListener("change", () => {
					rootScope.managers.appStateManager.setByKey(options.stateKey, getValueForState());
				});
			}
		}
		const main = this.main = document.createElement("div");
		main.classList.add("radio-field-main");
		container.append(input, main);
	}
	get checked() {
		return this.input.checked;
	}
	set checked(checked) {
		this.setValueSilently(checked);
		simulateEvent(this.input, "change");
	}
	get locked() {
		return !!this.lockIcon;
	}
	set locked(locked) {
		if (!locked) {
			this.lockIcon?.remove();
			this.lockIcon = void 0;
			this.main.classList.remove("is-locked");
			return;
		}
		if (this.lockIcon) return;
		this.main.prepend(this.lockIcon = Icon("premium_lock", "radio-field-lock"));
		this.main.classList.add("is-locked");
	}
	setValueSilently(checked) {
		this.input.checked = checked;
	}
};
//#endregion
//#region src/components/radioFieldTsx.tsx
/** The control only — mount it through `Row.RadioField` and put its label in `Row.Title`. */
function RadioFieldTsx(props) {
	const [local, radioProps] = splitProps(props, [
		"ariaLabel",
		"checked",
		"class",
		"locked",
		"onChange"
	]);
	const radioField = new RadioField(radioProps);
	createRenderEffect(() => {
		if (local.checked !== void 0) radioField.setValueSilently(local.checked);
	});
	createRenderEffect(() => {
		radioField.locked = !!local.locked;
	});
	createRenderEffect(() => {
		const ariaLabel = local.ariaLabel;
		if (ariaLabel) radioField.input.setAttribute("aria-label", ariaLabel);
		else radioField.input.removeAttribute("aria-label");
	});
	subscribeOn(radioField.input)("change", (event) => {
		local.onChange?.(radioField.checked, event);
	});
	attachClassName(radioField.container, () => local.class);
	return radioField.container;
}
//#endregion
export { RadioFieldTsx as t };
