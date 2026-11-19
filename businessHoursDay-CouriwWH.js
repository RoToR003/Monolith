//# allFunctionsCalledOnLoad
import { a as i18n } from "./langPack-BmdJGr44.js";
import { C as createSignal, L as untrack, N as onMount, R as useContext, _ as createMemo, p as createComponent, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { t as clamp } from "./clamp-9UaNhw6N.js";
import { i as produce, n as createStore } from "./store-PwRn5fa3.js";
import { c as insert, g as template, n as Portal, o as className } from "./web-BPyQozky.js";
import { t as ListenerSetter } from "./listenerSetter-BER6qAXn.js";
import { i as createPopup, n as PopupElement, t as PopupContext } from "./indexTsx-v9mB9bAq.js";
import { A as ONE_DAY_MINUTES } from "./index-B7axFZql.js";
import { n as GrowHeightList, r as GrowHeightReveal } from "./animations-DCmLIda3.js";
import { i as Row, s as CheckboxFieldTsx } from "./confirmationPopup-Bz6mK0o-.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { t as createTimeInputs } from "./timeInputs-D49SN0XZ.js";
import { n as SaveButton, t as useIsConfirmationNeededOnClose } from "./useIsConfirmationNeededOnClose-D8OTEl9F.js";
import { t as OpeningHours } from "./openingHours-DvQwjHAK.js";
import { a as periodsEqual, i as isFullDay } from "./businessHoursShared-BR51rc2K.js";
var timePicker_module_default = {
	inputs: "_inputs_18pnd_1",
	separator: "_separator_18pnd_14",
	hint: "_hint_18pnd_19"
};
//#endregion
//#region src/components/popups/timePicker.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div><span>:`);
var _tmpl$2 = /*#__PURE__*/ template(`<div>`);
/**
* A single `HH : MM` field with hard bounds — the web counterpart of Android's
* `AlertsCreator.createTimePickerDialog` (a two-wheel picker there).
*/
function showTimePickerPopup(options) {
	function Inner() {
		const context = useContext(PopupContext);
		const listenerSetter = new ListenerSetter();
		untrack(() => context.middlewareHelper).get().onDestroy(() => listenerSetter.removeAll());
		const timeInputs = createTimeInputs({
			listenerSetter,
			hours: Math.floor(options.value / 60),
			minutes: options.value % 60,
			maxHours: Math.floor(options.max / 60)
		});
		return [
			createComponent(PopupElement.Header, { get children() {
				return [createComponent(PopupElement.CloseButton, {}), createComponent(PopupElement.Title, { get children() {
					return i18n(options.titleLangKey);
				} })];
			} }),
			createComponent(PopupElement.Body, { get children() {
				return [(() => {
					var _el$ = _tmpl$(), _el$2 = _el$.firstChild;
					insert(_el$, () => timeInputs.hoursInputField.container, _el$2);
					insert(_el$, () => timeInputs.minutesInputField.container, null);
					createRenderEffect((_p$) => {
						var _v$ = timePicker_module_default.inputs, _v$2 = timePicker_module_default.separator;
						_v$ !== _p$.e && className(_el$, _p$.e = _v$);
						_v$2 !== _p$.t && className(_el$2, _p$.t = _v$2);
						return _p$;
					}, {
						e: void 0,
						t: void 0
					});
					return _el$;
				})(), (() => {
					var _el$3 = _tmpl$2();
					insert(_el$3, () => i18n("BusinessHoursDayInfo"));
					createRenderEffect(() => className(_el$3, timePicker_module_default.hint));
					return _el$3;
				})()];
			} }),
			createComponent(PopupElement.Footer, { get children() {
				return createComponent(PopupElement.FooterButton, {
					color: "primary",
					callback: async () => {
						options.onPick(clamp(timeInputs.minutesOfDay(), options.min, options.max));
					},
					get children() {
						return i18n("Save");
					}
				});
			} })
		];
	}
	createPopup(() => createComponent(PopupElement, {
		"class": "popup-time-picker",
		closable: true,
		get children() {
			return createComponent(Inner, {});
		}
	}));
}
/** `8:00 AM` / `1:30 AM (Next day)` — the value a picker row shows. */
function formatPeriodTime(value) {
	return OpeningHours.Period.timeToString(value, value >= ONE_DAY_MINUTES);
}
//#endregion
//#region src/components/sidebarLeft/tabs/businessHoursDay.tsx
var DEFAULT_OPEN = 480;
var DEFAULT_CLOSE = 1200;
var fullDay = () => ({
	start: 0,
	end: ONE_DAY_MINUTES - 1
});
/**
* One day of the business-hours schedule — Android's `OpeningHoursDayActivity`.
* Edits stay here until Save hands them to the hours tab; leaving with unsaved
* edits asks whether to save or discard them.
*/
var BusinessHoursDay = () => {
	const [tab] = useSuperTab();
	const { min, max, maxPeriodsCount } = tab.payload;
	const [periods, setPeriods] = createStore(tab.payload.periods.map((period) => ({ ...period })));
	const [enabled, setEnabled] = createSignal(!!tab.payload.periods.length);
	const result = () => enabled() ? periods.map((period) => ({
		start: period.start,
		end: period.end
	})) : [];
	const hasChanges = createMemo(() => !periodsEqual(tab.payload.periods, result()));
	const save = () => {
		tab.payload.onSave(result());
		tab.isConfirmationNeededOnClose = void 0;
	};
	tab.isConfirmationNeededOnClose = useIsConfirmationNeededOnClose({
		hasChanges,
		saveAllSettings: async () => save(),
		descriptionLangKey: "UnsavedChangesDescription.BusinessHours"
	});
	onMount(() => {
		tab.title.replaceChildren(tab.payload.dayName);
	});
	const is24 = createMemo(() => isFullDay(periods));
	const canAdd = createMemo(() => {
		if (periods.length >= maxPeriodsCount) return false;
		if (!periods.length || is24()) return true;
		return periods[periods.length - 1].end < Math.min(ONE_DAY_MINUTES - 2, max - 2);
	});
	const infoCaption = (isLast) => isLast && !canAdd() ? "BusinessHoursDayInfo" : void 0;
	const toggle = (value) => {
		setEnabled(value);
		if (value && !periods.length) setPeriods([fullDay()]);
	};
	const add = () => {
		setPeriods(produce((list) => {
			if (!list.length || isFullDay(list)) {
				list.length = 0;
				const start = clamp(DEFAULT_OPEN, min, max - 1);
				list.push({
					start,
					end: clamp(DEFAULT_CLOSE, start + 1, max)
				});
				return;
			}
			const lastEnd = list[list.length - 1].end;
			const start = clamp(lastEnd + 30, min, max - 1);
			list.push({
				start,
				end: clamp(Math.floor((lastEnd + 1560) / 2), start + 1, max)
			});
		}));
	};
	const remove = (index) => {
		setPeriods(produce((list) => {
			list.splice(index, 1);
			if (!list.length) list.push(fullDay());
		}));
	};
	const pickTime = (index, edge) => {
		const period = periods[index];
		const previous = index > 0 ? periods[index - 1] : void 0;
		const next = index + 1 < periods.length ? periods[index + 1] : void 0;
		showTimePickerPopup({
			titleLangKey: edge === "start" ? "BusinessHoursDayOpenHourPicker" : "BusinessHoursDayCloseHourPicker",
			value: period[edge],
			min: edge === "start" ? previous ? previous.end + 1 : min : period.start + 1,
			max: edge === "start" ? period.end - 1 : next ? next.start - 1 : max,
			onPick: (value) => setPeriods(index, edge, value)
		});
	};
	return [
		createComponent(Portal, {
			get mount() {
				return tab.header;
			},
			get children() {
				return createComponent(SaveButton, {
					get hasChanges() {
						return hasChanges();
					},
					onClick: () => {
						save();
						tab.close();
					}
				});
			}
		}),
		createComponent(Section, {
			get caption() {
				return infoCaption(enabled() && is24());
			},
			get children() {
				return createComponent(Row, { get children() {
					return [createComponent(Row.CheckboxFieldToggle, { get children() {
						return createComponent(CheckboxFieldTsx, {
							get checked() {
								return enabled();
							},
							toggle: true,
							onChange: toggle
						});
					} }), createComponent(Row.Title, { get children() {
						return i18n("BusinessHoursDayOpen");
					} })];
				} });
			}
		}),
		createComponent(GrowHeightReveal, {
			get when() {
				return enabled();
			},
			appear: false,
			get children() {
				return [createComponent(GrowHeightList, {
					get each() {
						return is24() ? [] : periods;
					},
					children: (period, index) => createComponent(Section, {
						get caption() {
							return infoCaption(index() === periods.length - 1);
						},
						get children() {
							return [
								createComponent(Row, {
									clickable: () => pickTime(index(), "start"),
									get children() {
										return createComponent(Row.Title, {
											get titleRight() {
												return formatPeriodTime(period.start);
											},
											titleRightSecondary: true,
											get children() {
												return i18n("BusinessHoursDayOpenHour");
											}
										});
									}
								}),
								createComponent(Row, {
									clickable: () => pickTime(index(), "end"),
									get children() {
										return createComponent(Row.Title, {
											get titleRight() {
												return formatPeriodTime(period.end);
											},
											titleRightSecondary: true,
											get children() {
												return i18n("BusinessHoursDayCloseHour");
											}
										});
									}
								}),
								createComponent(Row, {
									color: "danger",
									clickable: () => remove(index()),
									get children() {
										return createComponent(Row.Title, {
											"class": "danger",
											get children() {
												return i18n("Remove");
											}
										});
									}
								})
							];
						}
					})
				}), createComponent(GrowHeightReveal, {
					get when() {
						return canAdd();
					},
					appear: false,
					get children() {
						return createComponent(Section, {
							caption: "BusinessHoursDayInfo",
							get children() {
								return createComponent(Row, {
									clickable: add,
									get children() {
										return [createComponent(Row.Icon, { icon: "add" }), createComponent(Row.Title, {
											"class": "primary",
											get children() {
												return i18n("BusinessHoursDayAdd");
											}
										})];
									}
								});
							}
						});
					}
				})];
			}
		})
	];
};
//#endregion
export { BusinessHoursDay as default };
