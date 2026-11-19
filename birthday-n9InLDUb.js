//# allFunctionsCalledOnLoad
import { t as doubleRaf } from "./schedulers-Cx0-7a1P.js";
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { u as langPack_default } from "./langPack-BmdJGr44.js";
import { C as createSignal, g as createEffect, p as createComponent, s as Show, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { n as bindManagersToSession } from "./bindManagersToAccount-BL82O9H9.js";
import { t as cancelEvent } from "./cancelEvent-Cw8vYZHp.js";
import { c as insert, g as template, o as className, u as memo } from "./web-BPyQozky.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { t as IconTsx } from "./iconTsx-B4lOk4A6.js";
import { t as I18nTsx } from "./i18n-CGMFiAW0.js";
import { i as createPopup, n as PopupElement } from "./indexTsx-v9mB9bAq.js";
import { t as InputField } from "./inputField-CaCo30N0.js";
import { G as numberOfDaysEachMonth, H as getMonths, V as getDaysPerMonthForYear } from "./index-B7axFZql.js";
import { D as A11yButton } from "./openEditors-7FmA7q_V.js";
import { t as MediaHeader } from "./mediaHeader-CnpQNwOl.js";
import { r as toastNew } from "./toast-B6VD5M7R.js";
import { t as PeerTitleTsx } from "./peerTitleTsx-DcpEYRoE.js";
import { r as createButtonMenuSelect } from "./buttonMenuSelect-XBdJRNlz.js";
var birthday_module_default = {
	popup: "_popup_a7zcj_1",
	popupBody: "_popupBody_a7zcj_5",
	privacyInfo: "_privacyInfo_a7zcj_13",
	privacyInfoLink: "_privacyInfoLink_a7zcj_21",
	datePicker: "_datePicker_a7zcj_33",
	day: "_day_a7zcj_40",
	year: "_year_a7zcj_41",
	month: "_month_a7zcj_44",
	monthMenu: "_monthMenu_a7zcj_53"
};
//#endregion
//#region src/components/popups/birthday.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div class=btn-menu-item-text>`);
var _tmpl$2 = /*#__PURE__*/ template(`<div>`);
var MIN_YEAR = 1900;
async function saveMyBirthday(date) {
	try {
		await rootScope.managers.appProfileManager.setMyBirthday(date);
		return true;
	} catch (error) {
		console.error(error);
		toastNew({ langPackKey: "Error.AnError" });
		return false;
	}
}
async function suggestUserBirthday(userId, date) {
	try {
		await rootScope.managers.appProfileManager.suggestUserBirthday(userId, date);
		return true;
	} catch (error) {
		console.error(error);
		toastNew({ langPackKey: "Error.AnError" });
		return false;
	}
}
async function showBirthdayPopup(props) {
	const managers = bindManagersToSession(rootScope.managers);
	const privacy = props.suggestForPeer ? null : await rootScope.managers.appPrivacyManager.getPrivacy("inputPrivacyKeyBirthday");
	const isContactsOnly = !privacy || privacy.length === 2 && privacy[0]._ === "privacyValueAllowContacts" && privacy[1]._ === "privacyValueDisallowAll";
	createPopup(() => {
		const [show, setShow] = createSignal(false);
		const [day, setDay] = createSignal(props.initialDate?.day);
		const [month, setMonth] = createSignal();
		const [year, setYear] = createSignal(props.initialDate?.year);
		const monthOptions = getMonths().map((m, idx) => ({
			text: m,
			value: idx + 1
		}));
		if (props.initialDate?.month) setMonth(monthOptions[props.initialDate.month - 1]);
		const daysPerMonth = (year$ = year()) => year$ ? getDaysPerMonthForYear(year$) : numberOfDaysEachMonth;
		const dayField = new InputField({
			label: "BirthdayPopup.Day",
			plainText: true
		});
		dayField.container.classList.add(birthday_module_default.day);
		dayField.input.setAttribute("aria-label", langPack_default.format("BirthdayPopup.Day", true));
		const monthField = new InputField({
			label: "BirthdayPopup.Month",
			plainText: true
		});
		monthField.container.classList.add(birthday_module_default.month);
		monthField.input.setAttribute("aria-label", langPack_default.format("BirthdayPopup.Month", true));
		const yearField = new InputField({
			label: "BirthdayPopup.Year",
			plainText: true
		});
		yearField.container.classList.add(birthday_module_default.year);
		yearField.input.setAttribute("aria-label", langPack_default.format("BirthdayPopup.Year", true));
		if (props.initialDate?.day) dayField.setValueSilently(String(props.initialDate.day));
		if (props.initialDate?.year) yearField.setValueSilently(String(props.initialDate.year));
		const now = /* @__PURE__ */ new Date();
		const nowYear = now.getFullYear();
		const nowMonth = now.getMonth() + 1;
		const nowDay = now.getDate();
		let enteredDay = dayField.value;
		function updateDayInput() {
			const cleanValue = enteredDay.replace(/[^0-9]/g, "");
			if (!cleanValue) {
				setDay(void 0);
				return;
			}
			const month$ = month();
			const valueNum = Number(cleanValue);
			const daysInMonth = month$ ? daysPerMonth()[month$.value - 1] : 31;
			if (yearField.value === String(nowYear) && month$?.value === nowMonth && valueNum > nowDay) {
				dayField.setValueSilently(nowDay.toString());
				setDay(nowDay);
			} else if (valueNum > daysInMonth) {
				dayField.setValueSilently(daysInMonth.toString());
				setDay(daysInMonth);
			} else if (valueNum < 1) {
				dayField.setValueSilently("1");
				setDay(1);
			} else {
				if (dayField.value !== enteredDay) dayField.setValueSilently(enteredDay);
				setDay(valueNum);
			}
		}
		function availableMonths() {
			if (yearField.value === String(nowYear)) return monthOptions.filter((m) => m.value <= nowMonth);
			return monthOptions;
		}
		function selectMonth(option) {
			setMonth(option);
			updateDayInput();
		}
		let typedBuffer = "";
		let typedTimeout;
		const resetTypedBuffer = () => {
			clearTimeout(typedTimeout);
			typedBuffer = "";
		};
		function findTypedMonth(buffer) {
			const options = availableMonths();
			if (/^\d+$/.test(buffer)) {
				const n = Number(buffer);
				return options.find((option) => option.value === n);
			}
			const lower = buffer.toLocaleLowerCase();
			return options.find((option) => option.text.toLocaleLowerCase().startsWith(lower));
		}
		function onMonthTyped(data) {
			clearTimeout(typedTimeout);
			typedTimeout = window.setTimeout(resetTypedBuffer, 1e3);
			typedBuffer += data;
			let option = findTypedMonth(typedBuffer);
			if (!option && typedBuffer.length > data.length) {
				typedBuffer = data;
				option = findTypedMonth(typedBuffer);
			}
			if (option) selectMonth(option);
		}
		dayField.input.addEventListener("input", () => {
			enteredDay = dayField.value;
			updateDayInput();
		});
		monthField.input.addEventListener("beforeinput", (e) => {
			cancelEvent(e);
			if (e.inputType === "insertText" && e.data) onMonthTyped(e.data);
			else if (e.inputType === "deleteContentBackward" || e.inputType === "deleteContentForward") {
				resetTypedBuffer();
				selectMonth(void 0);
				monthField.value = "";
			}
		});
		monthField.input.addEventListener("keydown", (e) => {
			if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
			e.preventDefault();
			const options = availableMonths();
			const current = month();
			const idx = current ? options.findIndex((option) => option.value === current.value) : -1;
			const next = e.key === "ArrowDown" ? idx + 1 : idx === -1 ? 0 : idx - 1;
			const option = options[Math.min(Math.max(next, 0), options.length - 1)];
			if (option) selectMonth(option);
		});
		monthField.input.addEventListener("paste", (e) => cancelEvent(e));
		const { open: openMonthsMenu, close: closeMonthsMenu } = createButtonMenuSelect({
			class: birthday_module_default.monthMenu,
			direction: "bottom-center",
			get value() {
				return month() ? [month()] : [];
			},
			onValueChange: (value) => {
				selectMonth(value[0]);
				monthField.input.focus();
			},
			get options() {
				return availableMonths();
			},
			single: true,
			activateFocus: false,
			optionKey: (v) => v.value.toString(),
			renderOption: (props) => [(() => {
				var _el$ = _tmpl$();
				insert(_el$, () => props.option.text);
				return _el$;
			})(), memo(() => memo(() => !!props.chosen)() && createComponent(IconTsx, {
				icon: "check",
				"class": "btn-menu-item-icon-right"
			}))]
		});
		monthField.input.addEventListener("focus", () => openMonthsMenu(monthField.container));
		monthField.input.addEventListener("click", () => openMonthsMenu(monthField.container));
		monthField.input.addEventListener("blur", (e) => {
			if (e.relatedTarget?.closest(".btn-menu")) return;
			closeMonthsMenu();
		});
		yearField.input.addEventListener("input", () => {
			const value = yearField.value;
			const valueNum = Number(value);
			if (isNaN(valueNum)) {
				const cleanValue = value.replace(/[^0-9]/g, "");
				yearField.setValueSilently(cleanValue);
				setYear(Number(cleanValue));
			} else if (value.length >= 4) {
				if (valueNum < MIN_YEAR) {
					yearField.setValueSilently(String(MIN_YEAR));
					setYear(MIN_YEAR);
				} else if (valueNum >= nowYear) {
					yearField.setValueSilently(nowYear.toString());
					setYear(nowYear);
					if (month() && month().value > nowMonth) setMonth(monthOptions[nowMonth - 1]);
				} else setYear(valueNum);
				updateDayInput();
			} else setYear(void 0);
		});
		yearField.input.addEventListener("blur", () => {
			if (yearField.value.length !== 4) yearField.value = "";
		});
		function openPrivacySettings() {
			hotReloadGuard.appSidebarLeft.createTab(hotReloadGuard.tabs.AppPrivacyBirthdayTab).open();
			setShow(false);
		}
		createEffect(() => {
			const month$ = month();
			if (month$) monthField.value = month$.text;
		});
		const doubleRafPromise = doubleRaf();
		return createComponent(PopupElement, {
			managers,
			get ["class"]() {
				return birthday_module_default.popup;
			},
			get show() {
				return show();
			},
			old: true,
			get children() {
				return [
					createComponent(PopupElement.Header, {
						floating: true,
						get children() {
							return createComponent(PopupElement.CloseButton, {});
						}
					}),
					createComponent(PopupElement.Body, {
						get ["class"]() {
							return birthday_module_default.popupBody;
						},
						get children() {
							return [
								createComponent(MediaHeader, {
									marginBottom: true,
									get children() {
										return [createComponent(MediaHeader.Sticker, {
											name: "UtyanBirthday",
											size: 120,
											onReady: (animation) => {
												doubleRafPromise.then(() => {
													setShow(true);
													animation.playOrRestart();
												});
											}
										}), createComponent(MediaHeader.Title, { get children() {
											return createComponent(I18nTsx, {
												get key() {
													return props.suggestForPeer ? "BirthdayPopup.TitleForPeer" : "BirthdayPopup.Title";
												},
												get args() {
													return [props.suggestForPeer ? createComponent(PeerTitleTsx, { get peerId() {
														return props.suggestForPeer;
													} }) : void 0];
												}
											});
										} })];
									}
								}),
								(() => {
									var _el$2 = _tmpl$2();
									insert(_el$2, () => dayField.container, null);
									insert(_el$2, () => monthField.container, null);
									insert(_el$2, () => yearField.container, null);
									createRenderEffect(() => className(_el$2, birthday_module_default.datePicker));
									return _el$2;
								})(),
								createComponent(Show, {
									get when() {
										return !props.suggestForPeer;
									},
									get children() {
										var _el$3 = _tmpl$2();
										insert(_el$3, createComponent(I18nTsx, {
											key: isContactsOnly ? "BirthdayPopup.OnlyContacts" : "BirthdayPopup.Choose",
											get args() {
												return [createComponent(A11yButton, {
													as: "a",
													get ["class"]() {
														return birthday_module_default.privacyInfoLink;
													},
													onClick: openPrivacySettings,
													get children() {
														return [createComponent(I18nTsx, { key: isContactsOnly ? "BirthdayPopup.OnlyContactsLink" : "BirthdayPopup.ChooseLink" }), createComponent(IconTsx, { icon: "next" })];
													}
												})];
											}
										}));
										createRenderEffect(() => className(_el$3, birthday_module_default.privacyInfo));
										return _el$3;
									}
								})
							];
						}
					}),
					createComponent(PopupElement.Footer, { get children() {
						return [
							createComponent(Show, {
								get when() {
									return memo(() => !!props.fromSuggestion)() && props.initialDate.year;
								},
								get children() {
									return createComponent(PopupElement.FooterButton, {
										langKey: "BirthdayPopup.HideYear",
										color: "secondary",
										callback: () => {
											setYear(void 0);
											yearField.setValueSilently("");
											return false;
										}
									});
								}
							}),
							createComponent(Show, {
								get when() {
									return memo(() => !!props.fromProfile)() && props.initialDate;
								},
								get children() {
									return createComponent(PopupElement.FooterButton, {
										langKey: "BirthdayPopup.Remove",
										color: "secondary",
										callback: async () => {
											await props.onSave(null);
											return true;
										}
									});
								}
							}),
							createComponent(PopupElement.FooterButton, {
								get disabled() {
									return !day() || !month();
								},
								get langKey() {
									return memo(() => !!props.fromSuggestion)() ? "BirthdayPopup.SaveFromSuggestion" : props.suggestForPeer ? "BirthdayPopup.Suggest" : "Save";
								},
								callback: async () => {
									if (!day() || !month()) return;
									await props.onSave({
										_: "birthday",
										day: day(),
										month: month().value,
										year: year()
									});
									return true;
								}
							})
						];
					} })
				];
			}
		});
	});
}
//#endregion
export { showBirthdayPopup as n, suggestUserBirthday as r, saveMyBirthday as t };
