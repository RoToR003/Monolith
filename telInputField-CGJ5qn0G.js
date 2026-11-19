//# allFunctionsCalledOnLoad
import { h as Modes, i as IS_APPLE_MOBILE, n as IS_ANDROID, r as IS_APPLE } from "./userAgent-ByGXcznk.js";
import { n as appNavigationController } from "./appNavigationController-Ct0fx8yF.js";
import { t as findUpClassName } from "./findUpClassName-3V5me58N.js";
import { t as IS_EMOJI_SUPPORTED } from "./emojiSupport-Cdbu9YLM.js";
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { a as i18n, m as setInnerHTML, u as langPack_default } from "./langPack-BmdJGr44.js";
import { t as cancelEvent } from "./cancelEvent-Cw8vYZHp.js";
import { i as getCountryEmoji } from "./emoji-Bi9QRCod.js";
import { t as placeCaretAtEnd } from "./placeCaretAtEnd-BtAUyd5U.js";
import { t as InputField } from "./inputField-CaCo30N0.js";
import { t as findUpTag } from "./findUpTag-CkbKEw4y.js";
import { O as randomLong } from "./index-B7axFZql.js";
import { n as wrapEmojiText } from "./wrapEmojiText-DT39R5Tj.js";
import { i as fastSmoothScroll, t as Scrollable } from "./scrollable-C2-FwBtK.js";
//#region src/helpers/formatPhoneNumber.ts
var prefixes = /* @__PURE__ */ new Map();
var byCountryCode = /* @__PURE__ */ new Map();
var maxPrefixLength = 0;
var setPrefix = (country, code, prefix = "") => {
	prefix = code.country_code + prefix;
	maxPrefixLength = Math.max(maxPrefixLength, prefix.length);
	prefixes.set(prefix, {
		country,
		code
	});
	if (!byCountryCode.has(code.country_code)) byCountryCode.set(code.country_code, {
		country,
		code
	});
};
function applyPattern(code, str, national) {
	const patterns = code.patterns || [];
	const searchForPattern = national ? str : str.slice(code.country_code.length);
	let pattern = "", mostMatchedPatternMatches = 0, mostMatchedPattern = "";
	for (let i = patterns.length - 1; i >= 0; --i) {
		pattern = patterns[i];
		const _pattern = pattern.replace(/ /g, "");
		let patternMatches = 0;
		for (let k = 0, length = Math.min(searchForPattern.length, _pattern.length); k < length; ++k) if (searchForPattern[k] === _pattern[k]) patternMatches += 1.01;
		else if (_pattern[k] === "X") ++patternMatches;
		else {
			patternMatches = 0;
			break;
		}
		if (patternMatches > mostMatchedPatternMatches) {
			mostMatchedPatternMatches = patternMatches;
			mostMatchedPattern = pattern;
		}
	}
	pattern = mostMatchedPattern || pattern;
	pattern = pattern.replace(/\d/g, "X");
	if (!national) pattern = code.country_code + " " + pattern;
	pattern.split("").forEach((symbol, idx) => {
		if (symbol === " " && str[idx] !== " " && str.length > idx) str = str.slice(0, idx) + " " + str.slice(idx);
	});
	let leftPattern = pattern && pattern.length > str.length ? pattern.slice(str.length) : "";
	if (leftPattern) leftPattern = leftPattern.replace(/X/g, "‒");
	return {
		formatted: str,
		leftPattern
	};
}
function formatPhoneNumber(originalStr, options) {
	originalStr = originalStr || "";
	if (!prefixes.size) langPack_default.countriesList.forEach((country) => {
		country.country_codes.forEach((code) => {
			if (code.prefixes) code.prefixes.forEach((prefix) => {
				setPrefix(country, code, prefix);
			});
			else setPrefix(country, code);
		});
	});
	const str = originalStr.replace(/\D/g, "");
	const defaultCountryCode = options?.defaultCountryCode;
	if (defaultCountryCode && !originalStr.trimStart().startsWith("+") && !str.startsWith(defaultCountryCode)) {
		const prefixCountry = byCountryCode.get(defaultCountryCode);
		if (prefixCountry) {
			const { formatted, leftPattern } = applyPattern(prefixCountry.code, str, true);
			return {
				formatted,
				country: prefixCountry.country,
				code: void 0,
				leftPattern
			};
		}
		return {
			formatted: str,
			country: void 0,
			code: void 0,
			leftPattern: ""
		};
	}
	const phoneCode = str.slice(0, maxPrefixLength);
	let prefixCountry;
	for (let i = phoneCode.length - 1; i >= 0; --i) {
		prefixCountry = prefixes.get(phoneCode.slice(0, i + 1));
		if (prefixCountry) break;
	}
	if (!prefixCountry) return {
		formatted: str,
		country: void 0,
		code: void 0,
		leftPattern: ""
	};
	const country = prefixCountry.country;
	const { formatted, leftPattern } = applyPattern(prefixCountry.code, str, false);
	return {
		formatted,
		country,
		code: prefixCountry.code,
		leftPattern
	};
}
//#endregion
//#region src/components/countryInputField.ts
var countries;
var setCountries = () => {
	countries = langPack_default.countriesList.filter((country) => !country.pFlags?.hidden).sort((a, b) => (a.name || a.default_name).localeCompare(b.name || b.default_name));
};
var init = () => {
	init = void 0;
	setCountries();
	rootScope.addEventListener("language_apply", () => {
		setCountries();
	});
};
var VIRTUAL_COUNTRIES = /* @__PURE__ */ new Set(["FT"]);
var countryOptionsIdSeed = 0;
function filterCountries(value, excludeVirtual) {
	init?.();
	value = value.toLowerCase();
	return countries.filter((c) => {
		if (excludeVirtual && VIRTUAL_COUNTRIES.has(c.iso2)) return false;
		const names = [
			c.name,
			c.default_name,
			c.iso2
		];
		names.filter(Boolean).forEach((name) => {
			const abbr = name.split(" ").filter((word) => /\w/.test(word)).map((word) => word[0]).join("");
			if (abbr.length > 1) names.push(abbr);
		});
		return !!names.filter(Boolean).find((str) => str.toLowerCase().indexOf(value) !== -1);
	});
}
var CountryInputField = class extends InputField {
	constructor(options = {}) {
		super({
			label: "Country",
			name: randomLong(),
			...options
		});
		this.options = options;
		this.hidePicker = () => {
			if (this.hideTimeout !== void 0) return;
			if (Modes.a11y) {
				appNavigationController.removeByType("autocomplete-helper");
				this.selectWrapper.inert = true;
			}
			this.input.setAttribute("aria-expanded", "false");
			this.selectWrapper.classList.remove("active");
			this.hideTimeout = window.setTimeout(() => {
				this.selectWrapper.classList.add("hide");
				this.hideTimeout = void 0;
			}, 200);
		};
		this.selectCountryByTarget = (target) => {
			this.selectWrapper.querySelector("[aria-selected=\"true\"]")?.setAttribute("aria-selected", "false");
			target.setAttribute("aria-selected", "true");
			const defaultName = target.querySelector("[data-default-name]").dataset.defaultName;
			const phoneCode = target.querySelector(".phone-code")?.innerText;
			const countryCode = phoneCode && phoneCode.replace(/\D/g, "");
			this.value = i18n(defaultName);
			this.lastCountrySelected = countries.find((c) => c.default_name === defaultName);
			this.lastCountryCodeSelected = countryCode && this.lastCountrySelected.country_codes.find((_countryCode) => _countryCode.country_code === countryCode);
			this.options.onCountryChange?.(this.lastCountrySelected, this.lastCountryCodeSelected);
			this.hidePicker();
		};
		init?.();
		this.liMap = /* @__PURE__ */ new Map();
		this.container.classList.add("input-select");
		const selectWrapper = this.selectWrapper = document.createElement("div");
		selectWrapper.classList.add("select-wrapper", "z-depth-3", "hide");
		const arrowDown = document.createElement("span");
		arrowDown.classList.add("arrow", "arrow-down");
		this.container.append(arrowDown);
		const selectList = document.createElement("ul");
		selectList.id = "country-options-" + ++countryOptionsIdSeed;
		selectList.setAttribute("role", "listbox");
		selectWrapper.appendChild(selectList);
		this.input.setAttribute("role", "combobox");
		this.input.removeAttribute("aria-multiline");
		this.input.setAttribute("aria-autocomplete", "list");
		this.input.setAttribute("aria-controls", selectList.id);
		this.input.setAttribute("aria-expanded", "false");
		new Scrollable(selectWrapper);
		let initSelect = () => {
			initSelect = null;
			countries.forEach((c) => {
				if (options.noPhoneCodes && VIRTUAL_COUNTRIES.has(c.iso2)) return;
				const emoji = getCountryEmoji(c.iso2);
				const liArr = [];
				for (let i = 0, length = Math.min(c.country_codes.length, options.noPhoneCodes ? 1 : Infinity); i < length; ++i) {
					const countryCode = c.country_codes[i];
					const li = document.createElement("li");
					li.setAttribute("role", "option");
					li.setAttribute("aria-selected", "false");
					const wrapped = wrapEmojiText(emoji);
					if (IS_EMOJI_SUPPORTED) {
						const spanEmoji = document.createElement("span");
						setInnerHTML(spanEmoji, wrapped);
						li.append(spanEmoji);
					} else setInnerHTML(li, wrapped);
					const el = i18n(c.default_name);
					el.dataset.defaultName = c.default_name;
					li.append(el);
					if (!options.noPhoneCodes) {
						const span = document.createElement("span");
						span.classList.add("phone-code");
						const code = document.createElement("span");
						code.dir = "ltr";
						code.textContent = "+" + countryCode.country_code;
						span.append(code);
						li.appendChild(span);
					}
					liArr.push(li);
					selectList.append(li);
				}
				this.liMap.set(c.iso2, liArr);
			});
			selectList.addEventListener("mousedown", (e) => {
				if (e.button !== 0) return;
				const target = findUpTag(e.target, "LI");
				this.selectCountryByTarget(target);
			});
			this.container.appendChild(selectWrapper);
		};
		initSelect();
		this.input.addEventListener("focus", (e) => {
			if (initSelect) initSelect();
			else countries.forEach((c) => {
				const arr = this.liMap.get(c.iso2);
				if (!arr) return;
				arr.forEach((li) => li.style.display = "");
			});
			clearTimeout(this.hideTimeout);
			this.hideTimeout = void 0;
			selectWrapper.classList.remove("hide");
			selectWrapper.inert = false;
			selectWrapper.offsetWidth;
			selectWrapper.classList.add("active");
			this.input.setAttribute("aria-expanded", "true");
			if (Modes.a11y && !appNavigationController.findItemByType("autocomplete-helper")) appNavigationController.pushItem({
				type: "autocomplete-helper",
				onPop: () => {
					this.hidePicker();
				}
			});
			this.select();
			fastSmoothScroll({
				container: findUpClassName(this.container, "scrollable-y"),
				element: this.input,
				position: "start",
				margin: 4
			});
			setTimeout(() => {
				if (!mouseDownHandlerAttached) {
					document.addEventListener("mousedown", onMouseDown, { capture: true });
					mouseDownHandlerAttached = true;
				}
			}, 0);
		});
		let mouseDownHandlerAttached = false;
		const onMouseDown = (e) => {
			if (findUpClassName(e.target, "input-select")) return;
			if (e.target === this.input) return;
			this.hidePicker();
			document.removeEventListener("mousedown", onMouseDown, { capture: true });
			mouseDownHandlerAttached = false;
		};
		const onKeyPress = (e) => {
			const key = e.key;
			if (e.ctrlKey || key === "Control") return false;
			const filtered = new Set(filterCountries(this.value).map((c) => c.iso2));
			this.liMap.forEach((arr, iso2) => {
				arr.forEach((li) => li.style.display = filtered.has(iso2) ? "" : "none");
			});
			if (!filtered.size) countries.forEach((c) => {
				const arr = this.liMap.get(c.iso2);
				if (!arr) return;
				arr.forEach((li) => li.style.display = "");
			});
			else if (filtered.size === 1 && key === "Enter") {
				cancelEvent(e);
				this.selectCountryByTarget(this.liMap.get([...filtered][0])[0]);
			}
		};
		this.input.addEventListener("keyup", onKeyPress);
		this.input.addEventListener("keydown", (e) => {
			if (e.key === "Enter") {
				onKeyPress(e);
				return;
			}
			if (!Modes.a11y || this.selectWrapper.classList.contains("hide")) return;
			if (e.key === "Tab") this.hidePicker();
		});
		arrowDown.addEventListener("mousedown", (e) => {
			if (this.input.matches(":focus")) {
				this.hidePicker();
				this.input.blur();
			} else {
				e.cancelBubble = true;
				e.preventDefault();
				this.input.focus();
			}
		});
	}
	getSelected() {
		return {
			country: this.lastCountrySelected,
			code: this.lastCountryCodeSelected
		};
	}
	selectCountryByIso2(iso2) {
		const target = this.liMap.get(iso2)?.[0];
		if (target) this.selectCountryByTarget(target);
	}
	override(country, code, countryName) {
		this.setValueSilently(country ? i18n(country.default_name) : countryName);
		this.lastCountrySelected = country;
		this.lastCountryCodeSelected = code;
		this.options.onCountryChange?.(this.lastCountrySelected, this.lastCountryCodeSelected);
	}
};
//#endregion
//#region src/components/telInputField.ts
var MAX_DIGITS = 36;
var TelInputField = class extends InputField {
	constructor(options = {}) {
		super({
			label: "Contacts.PhoneNumber.Placeholder",
			name: "phone",
			...options
		});
		this.pasted = false;
		this.lastValue = "";
		this.container.classList.add("input-field-phone");
		const telEl = this.input;
		telEl.dir = "ltr";
		if (telEl instanceof HTMLInputElement) {
			telEl.type = "tel";
			telEl.autocomplete = "rr55RandomRR55";
		} else {
			telEl.inputMode = "decimal";
			const pixelRatio = window.devicePixelRatio;
			if (pixelRatio > 1) {
				let letterSpacing;
				if (IS_APPLE) letterSpacing = pixelRatio * -.16;
				else if (IS_ANDROID) letterSpacing = 0;
				telEl.style.setProperty("--letter-spacing", letterSpacing + "px");
			}
			const originalFunc = this.setValueSilently.bind(this);
			this.setValueSilently = (value) => {
				originalFunc(value);
				placeCaretAtEnd(this.input, true);
			};
		}
		telEl.addEventListener("input", () => {
			telEl.classList.remove("error");
			if (this.pastedValue !== void 0) {
				this.setValueSilently(this.pastedValue);
				this.pastedValue = void 0;
			}
			const digits = this.value.replace(/\D/g, "");
			if (digits.length > MAX_DIGITS) this.setValueSilently("+" + digits.slice(0, MAX_DIGITS));
			const value = this.value;
			if (Math.abs(value.length - this.lastValue.length) > 1 && !this.pasted && IS_APPLE_MOBILE) this.setValueSilently(this.lastValue + value);
			this.pasted = false;
			this.setLabel();
			let formattedPhoneNumber, formatted, leftPattern = "";
			if (this.value.replace(/\++/, "+") === "+") this.setValueSilently("+");
			else {
				formattedPhoneNumber = formatPhoneNumber(this.value);
				formatted = formattedPhoneNumber.formatted;
				formattedPhoneNumber.country;
				leftPattern = formattedPhoneNumber.leftPattern;
				formattedPhoneNumber.code;
				this.setValueSilently(this.lastValue = formatted ? "+" + formatted : "");
			}
			telEl.dataset.leftPattern = leftPattern;
			options.onInput && options.onInput(formattedPhoneNumber);
		});
		telEl.addEventListener("paste", (e) => {
			this.pasted = true;
			const clipboard = e.clipboardData?.getData("text/plain");
			const pastedDigits = clipboard?.replace(/\D/g, "");
			if (!pastedDigits) return;
			if (clipboard.trimStart().startsWith("+") || pastedDigits.startsWith("00")) this.pastedValue = "+" + (pastedDigits.startsWith("00") ? pastedDigits.slice(2) : pastedDigits);
			else {
				const currentDigits = this.value.replace(/\D/g, "");
				this.pastedValue = "+" + currentDigits + (currentDigits ? pastedDigits.replace(/^0/, "") : pastedDigits);
			}
		});
		telEl.addEventListener("keypress", (e) => {
			const key = e.key;
			if (/\D/.test(key) && !(e.metaKey || e.ctrlKey) && key !== "Backspace" && !(key === "+" && e.shiftKey)) {
				e.preventDefault();
				return false;
			}
		});
	}
};
//#endregion
export { formatPhoneNumber as i, CountryInputField as n, filterCountries as r, TelInputField as t };
