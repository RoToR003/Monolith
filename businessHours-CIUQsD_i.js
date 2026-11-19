//# allFunctionsCalledOnLoad
import { a as i18n } from "./langPack-BmdJGr44.js";
import { C as createSignal, _ as createMemo, b as createResource, i as For, p as createComponent, s as Show } from "./solid-9Vxm0VIz.js";
import { i as produce, n as createStore, o as unwrap } from "./store-PwRn5fa3.js";
import { n as Portal, u as memo } from "./web-BPyQozky.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { A as ONE_DAY_MINUTES, U as getWeekDays } from "./index-B7axFZql.js";
import { r as GrowHeightReveal } from "./animations-DCmLIda3.js";
import { i as Row, s as CheckboxFieldTsx } from "./confirmationPopup-Bz6mK0o-.js";
import { i as usePromiseCollector, t as MediaHeader } from "./mediaHeader-CnpQNwOl.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { r as toastNew } from "./toast-B6VD5M7R.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { n as SaveButton, t as useIsConfirmationNeededOnClose } from "./useIsConfirmationNeededOnClose-D8OTEl9F.js";
import { t as OpeningHours } from "./openingHours-DvQwjHAK.js";
import { n as getTimezoneName, t as getSystemTimezoneId } from "./timezones-Dpjwg9c5.js";
import { n as copyBusinessDays, r as formatDayPeriods, t as businessDaysEqual } from "./businessHoursShared-BR51rc2K.js";
//#region src/components/sidebarLeft/tabs/businessHours.tsx
/** Server-side cap on how many open intervals the whole week may hold. */
var PERIODS_COUNT_LIMIT = 28;
/** Mon–Fri open all day — what Android seeds an account with no hours yet. */
var defaultDays = () => Array.from({ length: 7 }, (_, day) => day < 5 ? [{
	start: 0,
	end: ONE_DAY_MINUTES - 1
}] : []);
var BusinessHoursTab = () => {
	const [tab] = useSuperTab();
	const promiseCollector = usePromiseCollector();
	const loadPromise = Promise.all([Promise.resolve(tab.payload.userFull), Promise.resolve(tab.payload.timezones)]).then(([userFull, timezones]) => ({
		workHours: userFull?.business_work_hours,
		timezones: timezones || []
	}));
	promiseCollector.collect(loadPromise);
	const [data] = createResource(() => loadPromise);
	return [createComponent(MediaHeader, {
		marginBottom: true,
		get children() {
			return [
				createComponent(MediaHeader.Sticker, {
					get animationData() {
						return tab.payload.animationData;
					},
					size: 130,
					restartOnClick: false
				}),
				createComponent(MediaHeader.Title, { get children() {
					return i18n("BusinessHours");
				} }),
				createComponent(MediaHeader.Subtitle, { get children() {
					return i18n("BusinessHoursInfo");
				} })
			];
		}
	}), createComponent(Show, {
		get when() {
			return data();
		},
		get children() {
			return createComponent(BusinessHoursForm, {
				get workHours() {
					return data().workHours;
				},
				get timezones() {
					return data().timezones;
				}
			});
		}
	})];
};
var BusinessHoursForm = (props) => {
	const [tab] = useSuperTab();
	const savedDays = props.workHours ? copyBusinessDays(OpeningHours.getDaysHours(props.workHours.weekly_open)) : void 0;
	const savedTimezoneId = props.workHours?.timezone_id || getSystemTimezoneId(props.timezones);
	const [enabled, setEnabled] = createSignal(!!props.workHours);
	const [timezoneId, setTimezoneId] = createSignal(savedTimezoneId);
	const [days, setDays] = createStore(savedDays ? copyBusinessDays(savedDays) : defaultDays());
	const [saving, setSaving] = createSignal(false);
	const weekDays = getWeekDays();
	const hasChanges = createMemo(() => {
		if (!!savedDays !== enabled()) return true;
		if (savedTimezoneId !== timezoneId()) return true;
		return !!savedDays && enabled() && !businessDaysEqual(savedDays, days);
	});
	/**
	* How many more intervals this day may take. Every other day keeps at least one
	* slot free so it can still be switched to "open 24 hours" — same as Android.
	*/
	const maxPeriodsFor = () => PERIODS_COUNT_LIMIT - days.reduce((sum, periods) => sum + Math.max(1, periods.length), 0);
	/**
	* A day that runs past midnight cannot overlap the next day's own opening, so
	* once `day` has hours the previous day's overflow is cut back to midnight.
	*/
	const adaptPrevDay = (day) => {
		if (!days[day].length) return;
		const prevDay = (7 + day - 1) % 7;
		setDays(produce((all) => {
			const periods = all[prevDay];
			const last = periods[periods.length - 1];
			if (!last || last.end <= 1439) return;
			last.end = ONE_DAY_MINUTES - 1;
			if (last.start >= last.end) periods.pop();
		}));
	};
	const toggleDay = (day, open) => {
		setDays(day, open ? [{
			start: 0,
			end: ONE_DAY_MINUTES - 1
		}] : []);
		if (open) adaptPrevDay(day);
	};
	const openDay = (day) => {
		const prevDay = (7 + day - 1) % 7;
		const prevDayMaxTime = days[prevDay].reduce((max, period) => Math.max(max, period.end), 0);
		const nextDay = (day + 1) % 7;
		const nextDayMinTime = days[nextDay].reduce((min, period) => Math.min(min, period.start), ONE_DAY_MINUTES);
		tab.slider.createTab(hotReloadGuard.tabs.AppBusinessHoursDayTab).open({
			dayName: weekDays[day],
			periods: unwrap(days[day]).map((period) => ({ ...period })),
			min: Math.max(0, prevDayMaxTime + 1 - ONE_DAY_MINUTES),
			max: ONE_DAY_MINUTES + nextDayMinTime - 1,
			maxPeriodsCount: maxPeriodsFor(),
			onSave: (periods) => {
				setDays(day, periods);
				adaptPrevDay(day);
			}
		});
	};
	const openTimezones = () => {
		tab.slider.createTab(hotReloadGuard.tabs.AppTimezoneTab).open({
			timezones: props.timezones,
			selected: timezoneId(),
			onSelect: setTimezoneId
		});
	};
	/**
	* Resolves to whether the hours were saved. The header button closes the tab once
	* they are; the "unsaved changes" popup does not, since the slider is already
	* closing the tab — closing it here as well would close the tab beneath it too.
	*/
	const save = async (close) => {
		if (saving()) return false;
		setSaving(true);
		const weeklyOpen = OpeningHours.fromDaysHours(unwrap(days));
		const workHours = enabled() && weeklyOpen.length ? {
			_: "businessWorkHours",
			pFlags: {},
			timezone_id: timezoneId(),
			weekly_open: weeklyOpen
		} : void 0;
		try {
			await tab.managers.appBusinessManager.updateBusinessWorkHours(workHours);
			tab.isConfirmationNeededOnClose = void 0;
			if (close) tab.close();
			return true;
		} catch (err) {
			console.error("updateBusinessWorkHours error:", err);
			toastNew({ langPackKey: "Error.AnError" });
			return false;
		} finally {
			setSaving(false);
		}
	};
	tab.isConfirmationNeededOnClose = useIsConfirmationNeededOnClose({
		hasChanges,
		saveAllSettings: async () => {
			if (!await save(false)) throw new Error("BUSINESS_HOURS_NOT_SAVED");
		},
		descriptionLangKey: "UnsavedChangesDescription.BusinessHours",
		waitForSave: true
	});
	return [
		createComponent(Portal, {
			get mount() {
				return tab.header;
			},
			get children() {
				return createComponent(SaveButton, {
					get hasChanges() {
						return memo(() => !!hasChanges())() && !saving();
					},
					onClick: () => save(true)
				});
			}
		}),
		createComponent(Section, { get children() {
			return createComponent(Row, { get children() {
				return [createComponent(Row.CheckboxFieldToggle, { get children() {
					return createComponent(CheckboxFieldTsx, {
						get checked() {
							return enabled();
						},
						toggle: true,
						onChange: setEnabled
					});
				} }), createComponent(Row.Title, { get children() {
					return i18n("BusinessHoursShow");
				} })];
			} });
		} }),
		createComponent(GrowHeightReveal, {
			get when() {
				return enabled();
			},
			appear: false,
			get children() {
				return [createComponent(Section, {
					name: "BusinessHours",
					get children() {
						return createComponent(For, {
							each: days,
							children: (periods, day) => createComponent(Row, {
								clickable: () => openDay(day()),
								get children() {
									return [
										createComponent(Row.Title, { get children() {
											return weekDays[day()];
										} }),
										createComponent(Row.Subtitle, { get children() {
											return formatDayPeriods(periods);
										} }),
										createComponent(Row.RightContent, {
											onClick: (e) => e.stopPropagation(),
											get children() {
												return createComponent(CheckboxFieldTsx, {
													get checked() {
														return !!periods.length;
													},
													toggle: true,
													onChange: (checked) => toggleDay(day(), checked)
												});
											}
										})
									];
								}
							})
						});
					}
				}), createComponent(Section, { get children() {
					return createComponent(Row, {
						clickable: openTimezones,
						get children() {
							return createComponent(Row.Title, {
								get titleRight() {
									return getTimezoneName(props.timezones, timezoneId());
								},
								titleRightSecondary: true,
								get children() {
									return i18n("BusinessHoursTimezone");
								}
							});
						}
					});
				} })];
			}
		})
	];
};
//#endregion
export { BusinessHoursTab as default };
