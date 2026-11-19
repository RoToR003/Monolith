//# allFunctionsCalledOnLoad
import { u as langPack_default } from "./langPack-BmdJGr44.js";
import { C as createSignal } from "./solid-9Vxm0VIz.js";
import { t as InputField } from "./inputField-CaCo30N0.js";
//#region src/components/timeInputs.tsx
/**
* The `HH : MM` pair of number fields shared by the schedule date picker and the
* business-hours time picker: digits only, auto-advance from hours to minutes,
* and an over-max first pair spills its second digit into the minutes field
* (typing `9` `3` `0` into hours gives `09:30`).
*/
var padTime = (value) => ("0" + value).slice(-2);
function createTimeInputs(options) {
	const maxHours = options.maxHours ?? 23;
	const [hours, setHours] = createSignal(padTime(options.hours));
	const [minutes, setMinutes] = createSignal(padTime(options.minutes));
	const hoursInputField = new InputField({ plainText: true });
	const minutesInputField = new InputField({ plainText: true });
	hoursInputField.input.setAttribute("aria-label", langPack_default.format("AccDescr.Hours", true));
	minutesInputField.input.setAttribute("aria-label", langPack_default.format("AccDescr.Minutes", true));
	hoursInputField.setValueSilently(hours());
	minutesInputField.setValueSilently(minutes());
	const minutesOfDay = () => (+hours() || 0) * 60 + (+minutes() || 0);
	const handle = (max, inputField, setStateValue, onInput, onOverflow) => {
		const maxString = "" + max;
		options.listenerSetter.add(inputField.input)("input", () => {
			let value = inputField.value.replace(/\D/g, "");
			if (value.length > maxString.length) value = value.slice(0, maxString.length);
			else if (value.length === 1 && maxString.length === 2 && +value[0] > +maxString[0] || value.length === 2 && +value > max) {
				if (value.length === 2 && onOverflow) onOverflow(+value[1]);
				value = "0" + value[0];
			}
			inputField.setValueSilently(value);
			setStateValue(value);
			onInput(value.length);
			options.onChange?.(minutesOfDay());
		});
	};
	handle(maxHours, hoursInputField, setHours, (length) => {
		if (length === 2) minutesInputField.input.focus();
	}, (digit) => {
		const next = (digit + minutesInputField.value).slice(0, 2);
		minutesInputField.setValueSilently(next);
		setMinutes(next);
	});
	handle(59, minutesInputField, setMinutes, (length) => {
		if (!length) hoursInputField.input.focus();
	});
	const setTime = (value) => {
		const h = padTime(Math.floor(value / 60));
		const m = padTime(value % 60);
		hoursInputField.setValueSilently(h);
		minutesInputField.setValueSilently(m);
		setHours(h);
		setMinutes(m);
	};
	return {
		hours,
		minutes,
		hoursInputField,
		minutesInputField,
		minutesOfDay,
		setTime
	};
}
//#endregion
export { padTime as n, createTimeInputs as t };
