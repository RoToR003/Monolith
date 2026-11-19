//# allFunctionsCalledOnLoad
import { a as i18n } from "./langPack-BmdJGr44.js";
import { A as mergeProps, I as splitProps, g as createEffect, j as on } from "./solid-9Vxm0VIz.js";
import { n as InputState, t as InputField } from "./inputField-CaCo30N0.js";
//#region src/components/inputFieldTsx.tsx
var InputFieldTsx = (inProps) => {
	const props = mergeProps({ InputFieldClass: InputField }, inProps);
	const [, options] = splitProps(props, [
		"class",
		"value",
		"InputFieldClass",
		"errorLabel",
		"errorLabelOptions",
		"errorDescriptionId",
		"disabled"
	]);
	const obj = new props.InputFieldClass(options);
	props.instanceRef?.(obj);
	createEffect(on(() => props.class, (value, prev) => {
		prev && obj.container.classList.remove(prev);
		value && obj.container.classList.add(value);
	}));
	createEffect(on(() => [props.errorLabel, props.errorLabelOptions], ([error, options], prev) => {
		if (!error && !prev) return;
		if (error !== void 0) obj.setError(error, options);
		else obj.setState(InputState.Neutral);
	}));
	createEffect(on(() => props.errorDescriptionId, (value, prev) => {
		const describedBy = new Set((obj.input.getAttribute("aria-describedby") || "").split(/\s+/).filter(Boolean));
		if (prev) describedBy.delete(prev);
		if (value) describedBy.add(value);
		if (describedBy.size) obj.input.setAttribute("aria-describedby", [...describedBy].join(" "));
		else obj.input.removeAttribute("aria-describedby");
	}));
	createEffect(on(() => props.value, (value) => {
		if (value !== obj.value && value !== void 0) obj.value = value;
	}));
	createEffect(on(() => [props.label, props.labelOptions], ([value, options]) => {
		if (value !== obj.label?.textContent) obj.label.replaceChildren(i18n(value, options));
	}));
	createEffect(on(() => props.disabled, (value) => {
		obj.input.toggleAttribute("disabled", !!value);
	}));
	return obj.container;
};
//#endregion
export { InputFieldTsx as t };
