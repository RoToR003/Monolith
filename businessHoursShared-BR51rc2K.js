//# allFunctionsCalledOnLoad
import { a as i18n } from "./langPack-BmdJGr44.js";
import "./index-B7axFZql.js";
import { t as OpeningHours } from "./openingHours-DvQwjHAK.js";
//#region src/components/sidebarLeft/tabs/businessHoursShared.ts
/** Android's `OpeningHoursDayActivity.is24()`: exactly one period covering the day. */
function isFullDay(periods) {
	return periods.length === 1 && periods[0].start === 0 && periods[0].end === 1439;
}
function copyBusinessDays(days) {
	return days.map((periods) => periods.map((period) => ({
		start: period.start,
		end: period.end
	})));
}
function periodsEqual(a, b) {
	return a.length === b.length && a.every((period, index) => period.start === b[index].start && period.end === b[index].end);
}
function businessDaysEqual(a, b) {
	return a.length === b.length && a.every((periods, day) => periodsEqual(periods, b[day]));
}
/** `Closed` / `Open 24 hours` / `9:00 AM - 6:00 PM` — the day row's value. */
function formatDayPeriods(periods) {
	if (!periods.length) return i18n("BusinessHoursDayClosed");
	if (OpeningHours.isFull(periods)) return i18n("BusinessHoursDayFullOpened");
	return periods.map((period) => new OpeningHours.Period(period.start, period.end).toString()).join(", ");
}
//#endregion
export { periodsEqual as a, isFullDay as i, copyBusinessDays as n, formatDayPeriods as r, businessDaysEqual as t };
