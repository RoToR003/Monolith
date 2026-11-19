//# allFunctionsCalledOnLoad
import { W as copy } from "./objectUrlUtils-5x08MNuO.js";
import { u as langPack_default } from "./langPack-BmdJGr44.js";
import { A as ONE_DAY_MINUTES, B as formatTime, j as ONE_WEEK_MINUTES } from "./index-B7axFZql.js";
//#region src/helpers/openingHours.ts
var _OpeningHours;
var Period = class Period {
	constructor(start, end) {
		this.start = start;
		this.end = end;
	}
	toString() {
		return Period.timeToString(this.start) + " - " + Period.timeToString(this.end);
	}
	static timeToString(time, includeNextDay = true) {
		const min = time % 60;
		const hours = (time - min) / 60 % 24;
		const rightNow = /* @__PURE__ */ new Date();
		rightNow.setHours(hours, min);
		const str = formatTime(rightNow).textContent;
		if (time > 1440 && includeNextDay) return langPack_default.format("BusinessHoursNextDay", true, [str]);
		return str;
	}
};
var OpeningHours = class {
	static adaptWeeklyOpen(hours, utcOffset) {
		const array = copy(hours);
		const array2 = new Array();
		for (let i = 0; i < array.length; ++i) {
			const weekly = array[i];
			let newWeekly = { ...weekly };
			if (utcOffset !== 0) {
				const start = weekly.start_minute % ONE_DAY_MINUTES;
				const end = start + (weekly.end_minute - weekly.start_minute);
				if (start === 0 && (end === 1440 || end === 1439)) {
					newWeekly.start_minute = weekly.start_minute;
					newWeekly.end_minute = weekly.end_minute;
					array2.push(newWeekly);
					continue;
				}
			}
			newWeekly.start_minute = weekly.start_minute + utcOffset;
			newWeekly.end_minute = weekly.end_minute + utcOffset;
			array2.push(newWeekly);
			if (newWeekly.start_minute < 0) {
				if (newWeekly.end_minute < 0) {
					newWeekly.start_minute += ONE_WEEK_MINUTES;
					newWeekly.end_minute += ONE_WEEK_MINUTES;
				} else {
					newWeekly.start_minute = 0;
					newWeekly = { ...weekly };
					newWeekly.start_minute = ONE_WEEK_MINUTES + weekly.start_minute + utcOffset;
					newWeekly.end_minute = ONE_WEEK_MINUTES - 1;
					array2.push(newWeekly);
				}
			} else if (newWeekly.end_minute > 10080) {
				if (newWeekly.start_minute > 10080) {
					newWeekly.start_minute -= ONE_WEEK_MINUTES;
					newWeekly.end_minute -= ONE_WEEK_MINUTES;
				}
			}
		}
		array2.sort((a, b) => a.start_minute - b.start_minute);
		return array2;
	}
	/**
	* @returns periods starting from Monday
	*/
	static getDaysHours(hours) {
		const days = new Array(7);
		for (let i = 0; i < days.length; ++i) days[i] = [];
		for (let i = 0; i < hours.length; ++i) {
			const period = hours[i];
			const day = Math.floor(period.start_minute / ONE_DAY_MINUTES % 7);
			const start = period.start_minute % ONE_DAY_MINUTES;
			const end = start + (period.end_minute - period.start_minute);
			days[day].push(new Period(start, end));
		}
		for (let i = 0; i < 7; ++i) {
			const start = ONE_DAY_MINUTES * i;
			const end = ONE_DAY_MINUTES * (i + 1);
			let m = start;
			for (let j = 0; j < hours.length; ++j) {
				const period = hours[j];
				if (period.start_minute <= m && period.end_minute >= m) m = period.end_minute + 1;
			}
			if (m >= end) {
				const prevDay = (7 + i - 1) % 7;
				if (days[prevDay].length && days[prevDay][days[prevDay].length - 1].end >= 1440) days[prevDay][days[prevDay].length - 1].end = ONE_DAY_MINUTES - 1;
				let periodEnd = Math.min(m - start - 1, ONE_DAY_MINUTES * 2 - 1);
				const nextDay = days[(7 + i + 1) % 7];
				if (periodEnd >= 1440 && nextDay.length && nextDay[0].start < periodEnd - 1440) periodEnd = ONE_DAY_MINUTES + nextDay[0].start - 1;
				days[i].length = 0;
				days[i].push(new Period(0, periodEnd));
			} else {
				const nextDay = (i + 1) % 7;
				if (days[i].length && days[nextDay].length) {
					const todayLast = days[i][days[i].length - 1];
					const tomorrowFirst = days[nextDay][0];
					if (todayLast.end > 1440 && todayLast.end - 1440 + 1 === tomorrowFirst.start) {
						todayLast.end = ONE_DAY_MINUTES - 1;
						tomorrowFirst.start = 0;
					}
				}
			}
		}
		return days;
	}
	/** Inverse of {@link OpeningHours.getDaysHours} — flattens per-day periods back into the API shape. */
	static fromDaysHours(days) {
		const hours = [];
		days?.forEach((periods, day) => {
			periods?.forEach((period) => {
				hours.push({
					_: "businessWeeklyOpen",
					start_minute: day * ONE_DAY_MINUTES + period.start,
					end_minute: day * ONE_DAY_MINUTES + period.end
				});
			});
		});
		return hours;
	}
	static is24x7(hours) {
		if (!hours || !hours.weekly_open.length) return false;
		let last = 0;
		for (let i = 0; i < hours.weekly_open.length; ++i) {
			const period = hours.weekly_open[i];
			if (period.start_minute > last + 1) return false;
			last = period.end_minute;
		}
		return last >= ONE_WEEK_MINUTES - 1;
	}
	static isOpenNow(adapted_weekly_open) {
		const date = /* @__PURE__ */ new Date();
		const nowWeekday = (7 + date.getDay() - 1) % 7;
		const nowHours = date.getHours();
		const nowMinutes = date.getMinutes();
		let openNow = false;
		const nowPeriodTime = nowMinutes + nowHours * 60 + nowWeekday * ONE_DAY_MINUTES;
		for (let i = 0; i < adapted_weekly_open.length; ++i) {
			const weeklyPeriod = adapted_weekly_open[i];
			if (nowPeriodTime >= weeklyPeriod.start_minute && nowPeriodTime <= weeklyPeriod.end_minute || nowPeriodTime + 10080 >= weeklyPeriod.start_minute && nowPeriodTime + 10080 <= weeklyPeriod.end_minute || nowPeriodTime - 10080 >= weeklyPeriod.start_minute && nowPeriodTime - 10080 <= weeklyPeriod.end_minute) {
				openNow = true;
				break;
			}
		}
		return {
			openNow,
			nowWeekday,
			nowHours,
			nowPeriodTime
		};
	}
	static isFull(periods) {
		if (!periods || !periods.length) return false;
		let lastTime = 0;
		for (let i = 0; i < periods.length; ++i) {
			const p = periods[i];
			if (lastTime < p.start) return false;
			lastTime = p.end;
		}
		return lastTime === 1439 || lastTime === 1440;
	}
};
_OpeningHours = OpeningHours;
_OpeningHours.Period = Period;
//#endregion
export { OpeningHours as t };
