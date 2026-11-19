//# allFunctionsCalledOnLoad
import { n as __exportAll } from "./rolldown-runtime-CwcJO0Gh.js";
import { a as i18n, s as join, u as langPack_default } from "./langPack-BmdJGr44.js";
//#region src/helpers/formatDuration.ts
var formatDuration_exports = /* @__PURE__ */ __exportAll({
	DurationType: () => DurationType,
	default: () => formatDuration
});
var DurationType = /* @__PURE__ */ function(DurationType) {
	DurationType[DurationType["Seconds"] = 0] = "Seconds";
	DurationType[DurationType["Minutes"] = 1] = "Minutes";
	DurationType[DurationType["Hours"] = 2] = "Hours";
	DurationType[DurationType["Days"] = 3] = "Days";
	DurationType[DurationType["Weeks"] = 4] = "Weeks";
	DurationType[DurationType["Months"] = 5] = "Months";
	DurationType[DurationType["Years"] = 6] = "Years";
	return DurationType;
}({});
function formatDuration(duration, showLast = 2) {
	if (!duration) duration = 1;
	const d = [];
	const p = [
		{
			m: 1,
			t: 0
		},
		{
			m: 60,
			t: 1
		},
		{
			m: 60,
			t: 2
		},
		{
			m: 24,
			t: 3
		},
		{
			m: 7,
			t: 4
		},
		{
			m: 365 / 12 / 7,
			t: 5
		},
		{
			m: 12,
			t: 6
		}
	];
	let t = 1;
	p.forEach((o, idx) => {
		t = Math.round(t * o.m);
		if (duration < t) return;
		let dd = duration / t;
		if (idx !== p.length - 1) {
			const modulus = p[idx === p.length - 1 ? idx : idx + 1].m;
			dd %= modulus;
		}
		d.push({
			duration: dd | 0,
			type: o.t
		});
	});
	const out = d.slice(-showLast).reverse();
	for (let i = out.length - 1; i >= 0; --i) if (out[i].duration === 0) out.splice(i, 1);
	return out;
}
//#endregion
//#region src/helpers/string/toHHMMSS.ts
function toHHMMSS(str, leadZero = false) {
	const sec_num = parseInt(str + "", 10);
	let hours = Math.floor(sec_num / 3600);
	let minutes = Math.floor((sec_num - hours * 3600) / 60);
	let seconds = sec_num - hours * 3600 - minutes * 60;
	if (hours && hours < 10 && leadZero) hours = "0" + hours;
	if (minutes < 10 && (hours || leadZero)) minutes = "0" + minutes;
	if (seconds < 10) seconds = "0" + seconds;
	return (hours ? hours + ":" : "") + minutes + ":" + seconds;
}
//#endregion
//#region src/components/wrappers/wrapDuration.ts
var wrapDuration_exports = /* @__PURE__ */ __exportAll({
	DURATION_LANG_KEYS: () => DURATION_LANG_KEYS,
	wrapCallDuration: () => wrapCallDuration,
	wrapFormattedDuration: () => wrapFormattedDuration,
	wrapLeftDuration: () => wrapLeftDuration,
	wrapSlowModeLeftDuration: () => wrapSlowModeLeftDuration,
	wrapStoriesStealthModeDuration: () => wrapStoriesStealthModeDuration
});
var DURATION_LANG_KEYS = {
	[DurationType.Seconds]: "Seconds",
	[DurationType.Minutes]: "Minutes",
	[DurationType.Hours]: "Hours",
	[DurationType.Days]: "Days",
	[DurationType.Weeks]: "Weeks",
	[DurationType.Months]: "Months",
	[DurationType.Years]: "Years"
};
function wrapFormattedDuration(formatted, plain) {
	if (plain) {
		const strings = formatted.map((d) => langPack_default.format(DURATION_LANG_KEYS[d.type], true, [d.duration]));
		return join(strings, false, plain);
	}
	const elements = formatted.map((d) => i18n(DURATION_LANG_KEYS[d.type], [d.duration]));
	const fragment = document.createElement("span");
	fragment.append(...join(elements, false));
	return fragment;
}
function wrapCallDuration(duration, plain) {
	return wrapFormattedDuration(formatDuration(duration, 2), plain);
}
function wrapLeftDuration(timeLeft) {
	const formatted = formatDuration(timeLeft, 3);
	if (formatted[0].type <= DurationType.Hours) return toHHMMSS(timeLeft, true);
	else {
		formatted.splice(1, Infinity);
		return wrapFormattedDuration(formatted);
	}
}
function wrapSlowModeLeftDuration(timeLeft) {
	const formatted = formatDuration(timeLeft, 3);
	if (formatted[0].type === DurationType.Seconds) return wrapFormattedDuration(formatted);
	else return toHHMMSS(timeLeft, true);
}
function wrapStoriesStealthModeDuration(duration) {
	return wrapFormattedDuration(formatDuration(duration, 1));
}
//#endregion
export { wrapSlowModeLeftDuration as a, DurationType as c, wrapLeftDuration as i, formatDuration as l, wrapDuration_exports as n, wrapStoriesStealthModeDuration as o, wrapFormattedDuration as r, toHHMMSS as s, wrapCallDuration as t, formatDuration_exports as u };
