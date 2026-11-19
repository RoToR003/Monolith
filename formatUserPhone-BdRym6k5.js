//# allFunctionsCalledOnLoad
import { i as formatPhoneNumber } from "./telInputField-CGJ5qn0G.js";
//#region src/components/wrappers/formatUserPhone.ts
function formatUserPhone(phone) {
	return "+" + formatPhoneNumber(phone).formatted;
}
function formatSharedPhone(phone, defaultCountryCode) {
	const { formatted, code } = formatPhoneNumber(phone, { defaultCountryCode });
	return (code ? "+" : "") + formatted;
}
function makeContactPhoneFormatter(accountPhones, defaultCountryCode) {
	const getDigits = (value) => value.replace(/\D/g, "");
	const accountDigits = accountPhones.filter(Boolean).map(getDigits);
	return (value) => accountDigits.includes(getDigits(value)) && !value.trimStart().startsWith("0") ? formatUserPhone(value) : formatSharedPhone(value, defaultCountryCode);
}
//#endregion
export { makeContactPhoneFormatter as n, formatUserPhone as t };
