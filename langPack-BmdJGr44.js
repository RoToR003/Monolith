//# allFunctionsCalledOnLoad
import { h as Modes, p as MOUNT_CLASS_TO, s as IS_MOBILE } from "./userAgent-ByGXcznk.js";
import { t as App } from "./app-BuFf8z8C.js";
import { t as Icon } from "./icon-DbP6Es97.js";
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { c as deepEqual } from "./encryptedStorageLayer-gN9TBXzg.js";
import { a as safeAssign } from "./idb-BZfkipS3.js";
import { C as matchUrlProtocol, s as wrapUrl, t as commonStateStorage } from "./commonStateStorage-CW-poHCa.js";
import { C as createSignal } from "./solid-9Vxm0VIz.js";
import { t as __vitePreload } from "./preload-helper-B0NHKCoo.js";
//#region src/helpers/string/capitalizeFirstLetter.ts
function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}
//#endregion
//#region src/helpers/dom/setInnerHTML.ts
function setInnerHTML(elem, html) {
	setDirection(elem);
	if (html === void 0) elem.replaceChildren();
	else if (typeof html === "string") {
		if (!html) elem.replaceChildren();
		else elem.textContent = html;
	} else elem.replaceChildren(html);
}
function setDirection(elem) {
	elem.setAttribute("dir", "auto");
}
function getDirection() {
	return "auto";
}
//#endregion
//#region src/lib/richTextProcessor/setBlankToAnchor.ts
function setBlankToAnchor(anchor) {
	anchor.target = "_blank";
	anchor.rel = "noopener noreferrer";
	return anchor;
}
//#endregion
//#region src/lib/langPack.ts
var langPack = {
	"messageActionChatCreate": "ActionCreateGroup",
	"messageActionChatCreateYou": "ActionYouCreateGroup",
	"messageActionChatEditTitle": "ActionChangedTitle",
	"messageActionChatEditPhoto": "ActionChangedPhoto",
	"messageActionChatEditVideo": "ActionChangedVideo",
	"messageActionChatDeletePhoto": "ActionRemovedPhoto",
	"messageActionChatReturn": "ActionAddUserSelf",
	"messageActionChatReturnYou": "ActionAddUserSelfYou",
	"messageActionChatJoined": "ActionAddUserSelfMega",
	"messageActionChatJoinedYou": "ChannelMegaJoined",
	"messageActionChatAddUser": "ActionAddUser",
	"messageActionChatAddUsers": "ActionAddUser",
	"messageActionChatLeave": "ActionLeftUser",
	"messageActionChatLeaveYou": "YouLeft",
	"messageActionChatDeleteUser": "ActionKickUser",
	"messageActionChatJoinedByLink": "ActionInviteUser",
	"messageActionPinMessage": "Chat.Service.Group.UpdatedPinnedMessage",
	"messageActionContactSignUp": "Chat.Service.PeerJoinedTelegram",
	"messageActionChannelCreate": "ActionCreateChannel",
	"messageActionChannelEditTitle": "Chat.Service.Channel.UpdatedTitle",
	"messageActionChannelEditPhoto": "Chat.Service.Channel.UpdatedPhoto",
	"messageActionChannelEditVideo": "Chat.Service.Channel.UpdatedVideo",
	"messageActionChannelDeletePhoto": "Chat.Service.Channel.RemovedPhoto",
	"messageActionHistoryClear": "HistoryCleared",
	"messageActionDiscussionStarted": "DiscussionStarted",
	"messageActionChannelJoined": "ChannelJoined",
	"messageActionChannelMigrateFrom": "ActionMigrateFromGroup",
	"messageActionPhoneCall.video_in_ok": "ChatList.Service.VideoCall.incoming",
	"messageActionPhoneCall.video_out_ok": "ChatList.Service.VideoCall.outgoing",
	"messageActionPhoneCall.video_missed": "ChatList.Service.VideoCall.Missed",
	"messageActionPhoneCall.video_cancelled": "ChatList.Service.VideoCall.Cancelled",
	"messageActionPhoneCall.in_ok": "ChatList.Service.Call.incoming",
	"messageActionPhoneCall.out_ok": "ChatList.Service.Call.outgoing",
	"messageActionPhoneCall.missed": "ChatList.Service.Call.Missed",
	"messageActionPhoneCall.cancelled": "ChatList.Service.Call.Cancelled",
	"messageActionGroupCall.started": "Chat.Service.VoiceChatStarted.Channel",
	"messageActionGroupCall.started_by": "Chat.Service.VoiceChatStarted",
	"messageActionGroupCall.started_byYou": "Chat.Service.VoiceChatStartedYou",
	"messageActionGroupCall.ended": "Chat.Service.VoiceChatFinished.Channel",
	"messageActionGroupCall.ended_by": "Chat.Service.VoiceChatFinished",
	"messageActionGroupCall.ended_byYou": "Chat.Service.VoiceChatFinishedYou",
	"messageActionBotAllowed": "Chat.Service.BotPermissionAllowed"
};
var RTL_LANG_CODES = /* @__PURE__ */ new Set([
	"ar",
	"arc",
	"ckb",
	"dv",
	"fa",
	"he",
	"iw",
	"ps",
	"sd",
	"ug",
	"ur",
	"yi"
]);
function isRTLLangCode(langCode) {
	return !!langCode && RTL_LANG_CODES.has(langCode.split("-", 1)[0].toLowerCase());
}
var UNSUPPORTED_LANG_PACK_KEY = IS_MOBILE ? "Message.Unsupported.Mobile" : "Message.Unsupported.Desktop";
var TEST_LOCAL = false;
var I18n;
(function(_I18n) {
	const strings = _I18n.strings = /* @__PURE__ */ new Map();
	const untranslatedKeys = _I18n.untranslatedKeys = /* @__PURE__ */ new Set();
	const countriesList = _I18n.countriesList = [];
	let pluralRules;
	let cacheLangPackPromise;
	let lastRequestedLangCode;
	let lastRequestedNormalizedLangCode;
	let lastAppliedLangCode;
	let timeFormat;
	const [isRTL, setIsRTL] = createSignal(false);
	_I18n.isRTL = isRTL, _I18n.setIsRTL = setIsRTL;
	function getLastRequestedLangCode() {
		return lastRequestedLangCode;
	}
	_I18n.getLastRequestedLangCode = getLastRequestedLangCode;
	function getLastRequestedNormalizedLangCode() {
		return lastRequestedNormalizedLangCode;
	}
	_I18n.getLastRequestedNormalizedLangCode = getLastRequestedNormalizedLangCode;
	function getLastAppliedLangCode() {
		return lastAppliedLangCode;
	}
	_I18n.getLastAppliedLangCode = getLastAppliedLangCode;
	function getTimeFormat() {
		return timeFormat;
	}
	_I18n.getTimeFormat = getTimeFormat;
	function getIsRTL() {
		return isRTL();
	}
	_I18n.getIsRTL = getIsRTL;
	const [langCodeNormalized, setLangCodeNormalized] = createSignal();
	_I18n.langCodeNormalized = langCodeNormalized, _I18n.setLangCodeNormalized = setLangCodeNormalized;
	let localVersion = 1;
	const localStrings = {};
	function getLocalVersion() {
		return localVersion;
	}
	_I18n.getLocalVersion = getLocalVersion;
	function importLocalStrings() {
		return Promise.all([localStrings.lang ?? __vitePreload(() => import("./lang-Bs2ALvmI.js"), []), localStrings.langSign ?? __vitePreload(() => import("./langSign-B34CDaYf.js"), [])]);
	}
	let forcedRTL = Modes.rtl || void 0;
	let languageRTL;
	function forceRTL(rtl) {
		forcedRTL = rtl;
		applyDirection(lastRequestedLangCode, languageRTL);
	}
	_I18n.forceRTL = forceRTL;
	function applyDirection(langCode, rtl = isRTLLangCode(langCode)) {
		languageRTL = rtl;
		rtl = forcedRTL ?? rtl;
		setIsRTL(rtl);
		if (typeof document === "undefined") return;
		const root = document.documentElement;
		root.dir = rtl ? "rtl" : "ltr";
		root.classList.toggle("is-rtl", rtl);
		if (langCode) root.lang = langCode;
	}
	_I18n.applyDirection = applyDirection;
	function setLangCode(langCode) {
		lastRequestedLangCode = langCode;
		lastRequestedNormalizedLangCode = langCode.split("-")[0];
		setLangCodeNormalized(lastRequestedNormalizedLangCode.split("-")[0]);
	}
	function getCacheLangPack(dontLoadLocal) {
		return Promise.all([commonStateStorage.get("langPack").then((langPack) => langPack || (dontLoadLocal ? void 0 : loadLocalLangPack())), polyfillPromise]).then(([langPack]) => langPack);
	}
	_I18n.getCacheLangPack = getCacheLangPack;
	function getCacheLangPackAndApply() {
		return cacheLangPackPromise || (cacheLangPackPromise = getCacheLangPack(true).then(async (langPack) => {
			if (!langPack) {
				langPack = await loadLocalLangPack();
				langPack = await saveLangPack(langPack, false);
			}
			setLangCode(langPack.lang_code);
			applyLangPack(langPack);
			return langPack;
		}).finally(() => {
			cacheLangPackPromise = void 0;
		}));
	}
	_I18n.getCacheLangPackAndApply = getCacheLangPackAndApply;
	function setTimeFormat(format, haveToUpdate = !!timeFormat && timeFormat !== format) {
		if (timeFormat !== format) cachedDateTimeFormats.clear();
		timeFormat = format;
		if (haveToUpdate) Array.from(document.querySelectorAll(`.i18n`)).forEach((element) => {
			const instance = weakMap.get(element);
			if (instance instanceof IntlDateElement) instance.update();
		});
	}
	_I18n.setTimeFormat = setTimeFormat;
	function loadLocalLangPack() {
		const defaultCode = App.langPackCode;
		return Promise.all([importLocalStrings(), __vitePreload(() => import("./countries-CfnIzVsp.js"), [])]).then(([[lang, langSign], countries]) => {
			const strings = [];
			formatLocalStrings(lang.default, strings);
			formatLocalStrings(langSign.default, strings);
			return {
				_: "langPackDifference",
				from_version: 0,
				lang_code: defaultCode,
				strings,
				version: App.langPackVersion,
				countries: countries.default,
				localVersion
			};
		});
	}
	_I18n.loadLocalLangPack = loadLocalLangPack;
	function loadLangPack(langCode, web, ignoreCache) {
		web = true;
		return Promise.all([
			rootScope.managers.appLangPackManager.getLangPack(langCode, web ? "web" : App.langPack, ignoreCache),
			!web && rootScope.managers.appLangPackManager.getLangPack(langCode, "android", ignoreCache),
			importLocalStrings(),
			rootScope.managers.appLangPackManager.getCountriesList(langCode, ignoreCache),
			polyfillPromise,
			rootScope.managers.appLangPackManager.getLanguage(langCode, web ? "web" : App.langPack).catch(() => void 0)
		]);
	}
	_I18n.loadLangPack = loadLangPack;
	function getStrings(langCode, strings) {
		return rootScope.managers.appLangPackManager.getStrings(langCode, strings);
	}
	_I18n.getStrings = getStrings;
	function formatLocalStrings(strings, pushTo = []) {
		for (const i in strings) {
			const v = strings[i];
			if (typeof v === "string") pushTo.push({
				_: "langPackString",
				key: i,
				value: v
			});
			else pushTo.push({
				_: "langPackStringPluralized",
				key: i,
				...v
			});
		}
		return pushTo;
	}
	_I18n.formatLocalStrings = formatLocalStrings;
	function getLangPackAndApply(langCode, web, ignoreCache) {
		const previousLangCode = lastRequestedLangCode;
		setLangCode(langCode);
		return loadLangPack(langCode, web, ignoreCache).catch((err) => {
			if (previousLangCode && lastRequestedLangCode === langCode) setLangCode(previousLangCode);
			throw err;
		}).then(([langPack1, langPack2, [localLangPack1, localLangPack2], countries, _, language]) => {
			let strings = [];
			const pushLocal = () => [localLangPack1, localLangPack2].forEach((l) => {
				for (const string of formatLocalStrings(l.default)) {
					string.local = true;
					strings.push(string);
				}
			});
			if (!TEST_LOCAL) pushLocal();
			strings = strings.concat(...[langPack1.strings, langPack2.strings].filter(Boolean));
			if (TEST_LOCAL) pushLocal();
			langPack1.strings = strings;
			langPack1.countries = countries;
			langPack1.localVersion = localVersion;
			if (language) langPack1.rtl = !!language.pFlags.rtl;
			return saveLangPack(langPack1, true);
		});
	}
	_I18n.getLangPackAndApply = getLangPackAndApply;
	function saveLangPack(langPack, apply) {
		langPack.version || (langPack.version = App.langPackVersion);
		if (!apply) return langPack;
		return commonStateStorage.set({ langPack }).then(() => {
			applyLangPack(langPack);
			return langPack;
		});
	}
	_I18n.saveLangPack = saveLangPack;
	const polyfillPromise = _I18n.polyfillPromise = (function checkIfPolyfillNeeded() {
		if (typeof Intl !== "undefined" && typeof Intl.PluralRules !== "undefined") return Promise.resolve();
		else return __vitePreload(() => import("./pluralPolyfill-CgbYLpVu.js").then((_Intl) => {
			window.Intl = Object.assign(typeof Intl !== "undefined" ? Intl : {}, _Intl.default);
		}), []);
	})();
	function applyLangPack(langPack) {
		const currentLangCode = lastRequestedLangCode;
		if (langPack.lang_code !== currentLangCode) return;
		try {
			pluralRules = new Intl.PluralRules(lastRequestedNormalizedLangCode);
		} catch (err) {
			console.error("pluralRules error", err);
			pluralRules = new Intl.PluralRules(lastRequestedNormalizedLangCode.split("-", 1)[0]);
		}
		try {
			pluralRules = new Intl.PluralRules(langPack.lang_code);
		} catch (err) {
			console.error("pluralRules error", err);
			pluralRules = new Intl.PluralRules(langPack.lang_code.split("-", 1)[0]);
		}
		strings.clear();
		untranslatedKeys.clear();
		for (const string of langPack.strings) strings.set(string.key, string);
		const rtl = langPack.rtl ?? isRTLLangCode(langPack.lang_code);
		if (rtl) strings.forEach((string, key) => {
			if (string.local) untranslatedKeys.add(key);
		});
		if (langPack.countries) {
			countriesList.length = 0;
			countriesList.push(...langPack.countries.countries);
			langPack.countries.countries.forEach((country) => {
				if (country.name) {
					const langPackKey = country.default_name;
					strings.set(langPackKey, {
						_: "langPackString",
						key: langPackKey,
						value: country.name
					});
				}
			});
		}
		applyDirection(currentLangCode, rtl);
		if (lastAppliedLangCode !== currentLangCode) {
			if (lastAppliedLangCode && rootScope.myId) {
				rootScope.managers.appReactionsManager.resetAvailableReactions();
				rootScope.managers.appUsersManager.indexMyself();
				rootScope.managers.dialogsStorage.indexMyDialog();
			}
			lastAppliedLangCode = currentLangCode;
			cachedDateTimeFormats.clear();
			rootScope.dispatchEvent("language_change", currentLangCode);
		}
		updateElements();
	}
	_I18n.applyLangPack = applyLangPack;
	function updateElements() {
		Array.from(document.querySelectorAll(`.i18n`)).forEach((element) => {
			const instance = weakMap.get(element);
			if (instance) instance.update();
		});
		rootScope.dispatchEventSingle("language_apply");
	}
	/**
	* dev: the edited lang.ts / langSign.ts (or the version the dev server bumps) taken in place. The bundled strings
	* win over the server's there anyway (TEST_LOCAL), so this gives what applying the whole pack again would.
	*/
	let localUpdates = Promise.resolve();
	function applyLocalUpdate(update) {
		return localUpdates = localUpdates.then(() => applyLocalUpdateNow(update)).catch((err) => {
			console.error("local strings update failed", err);
		});
	}
	_I18n.applyLocalUpdate = applyLocalUpdate;
	async function applyLocalUpdateNow(update) {
		localVersion = update.version ?? localVersion;
		if (!update.lang && !update.langSign) return;
		const previous = await importLocalStrings();
		if (update.lang) localStrings.lang = update.lang;
		if (update.langSign) localStrings.langSign = update.langSign;
		if (!lastAppliedLangCode) return;
		previous.forEach((module) => Object.keys(module.default).forEach((key) => {
			strings.delete(key);
			untranslatedKeys.delete(key);
		}));
		(await importLocalStrings()).forEach((module) => {
			formatLocalStrings(module.default).forEach((string) => {
				string.local = true;
				strings.set(string.key, string);
				if (languageRTL) untranslatedKeys.add(string.key);
			});
		});
		updateElements();
	}
	function pushNextArgument(out, args, indexHolder, i) {
		const arg = args[i === void 0 ? indexHolder.i++ : i];
		if (Array.isArray(arg)) out.push(...arg);
		else out.push(arg);
	}
	const IconMap = {
		">": "next",
		"<": "previous"
	};
	const iconsNoWhitespace = "><";
	const iconsKeys = Object.keys(IconMap);
	function superFormatter(input, args, indexHolder) {
		if (!indexHolder) {
			indexHolder = { i: 0 };
			const indexes = input.match(/(%|un)\d+/g);
			if (indexes?.length) indexHolder.i = Math.max(...indexes.map((str) => +str.replace(/\D/g, "")));
		}
		const out = [];
		const regExp = new RegExp(`(\\*\\*|__)(.+?)\\1|(\\n)|(\\[.+?\\]\\(.*?\\))|(?:^|\\s)(${iconsKeys.join("|")})(?:$|\\s)|un\\d|%\\d\\$.|%\\S`, "g");
		let lastIndex = 0;
		input.replace(regExp, (match, p1, p2, p3, p4, p5, offset, string) => {
			if (offset > lastIndex) out.push(string.slice(lastIndex, offset));
			if (p1) {
				let element;
				switch (p1) {
					case "**":
						element = document.createElement("b");
						break;
					case "__": element = document.createElement("i");
				}
				element.append(...superFormatter(p2, args, indexHolder));
				out.push(element);
			} else if (p3) out.push(document.createElement("br"));
			else if (p4) {
				const idx = p4.lastIndexOf("]");
				const text = p4.slice(1, idx);
				const url = p4.slice(idx + 2, p4.length - 1);
				let a;
				if (url && matchUrlProtocol(url)) {
					a = document.createElement("a");
					const wrappedUrl = wrapUrl(url);
					a.href = wrappedUrl.url;
					if (wrappedUrl.onclick) a.setAttribute("onclick", wrappedUrl.onclick + "(this)");
					setBlankToAnchor(a);
				} else {
					a = args?.[indexHolder.i++];
					if (a instanceof DocumentFragment) a = a.firstChild;
					if (typeof a !== "object") a = void 0;
					else if (a) a.textContent = "";
				}
				const formatted = superFormatter(text, args, indexHolder);
				if (!a) out.push(...formatted);
				else {
					a.append(...formatted);
					out.push(a);
				}
			} else if (p5) {
				const noWhitespace = iconsNoWhitespace.includes(p5);
				if (!noWhitespace && !match.startsWith(p5)) out.push(match[0]);
				const className = "inline-icon";
				const i = IconMap[p5];
				if (typeof i === "function") {
					const element = i();
					element.classList.add(className);
					out.push(element);
				} else out.push(Icon(i, className));
				if (!noWhitespace && match.startsWith(p5)) out.push(match[match.length - 1]);
			} else if (args) {
				const index = match.replace(/\D/g, "");
				pushNextArgument(out, args, indexHolder, !index || Number.isNaN(+index) ? void 0 : Math.min(args.length - 1, +index - 1));
			}
			lastIndex = offset + match.length;
			return "";
		});
		if (lastIndex !== input.length) out.push(input.slice(lastIndex));
		return out;
	}
	_I18n.superFormatter = superFormatter;
	function format(key, plain, args) {
		const str = strings.get(key);
		let input;
		if (str) {
			if (str._ === "langPackStringPluralized" && args?.length) {
				let v = args[0];
				if (typeof v === "string") v = +v.replace(/\D/g, "");
				input = str[pluralRules.select(v) + "_value"] || str["other_value"];
			} else if (str._ === "langPackString") input = str.value;
			else input = key;
		} else input = key;
		const result = superFormatter(input, args);
		if (plain) return result.map((item) => item instanceof HTMLBRElement ? "\n" : item instanceof Node ? item.textContent : item).join("");
		else return result;
	}
	_I18n.format = format;
	const weakMap = _I18n.weakMap = /* @__PURE__ */ new WeakMap();
	class IntlElementBase {
		constructor(options) {
			this.element = options?.element || document.createElement("span");
			this.element.classList.add("i18n");
			this.property = options?.property;
			weakMap.set(this.element, this);
		}
	}
	/**
	* English standing in for a string a right-to-left pack lacks reads left to right, its full stop
	* at its end: its text goes into a left-to-right isolate. The spaces at its edges, which join it
	* to its neighbours, stay outside, and the element itself keeps the direction of its line.
	*/
	function isolateUntranslated(element) {
		const isolate = document.createElement("span");
		isolate.dir = "ltr";
		isolate.append(...Array.from(element.childNodes));
		const edge = (node, pattern) => {
			if (node?.nodeType !== Node.TEXT_NODE) return;
			const text = node;
			const match = pattern.exec(text.data);
			if (!match || match[0].length === text.data.length) return;
			text.data = text.data.slice(0, match.index) + text.data.slice(match.index + match[0].length);
			return match[0];
		};
		const leading = edge(isolate.firstChild, /^\s+/);
		const trailing = edge(isolate.lastChild, /\s+$/);
		element.append(...[
			leading,
			isolate,
			trailing
		].filter(Boolean));
	}
	class IntlElement extends IntlElementBase {
		constructor(options = {}) {
			super({
				...options,
				property: options.property ?? "innerHTML"
			});
			if (options?.key) this.update(options);
		}
		update(options) {
			safeAssign(this, options);
			if (!this.key) {
				this.element.replaceChildren();
				return;
			}
			if (this.property === "innerHTML") {
				this.element.replaceChildren(...format(this.key, false, this.args));
				if (this.args?.length) this.element.normalize();
				if (untranslatedKeys.has(this.key)) isolateUntranslated(this.element);
			} else {
				const v = this.element[this.property];
				const formatted = format(this.key, true, this.args);
				if (v === void 0) this.element.dataset[this.property] = formatted;
				else this.element[this.property] = formatted;
			}
		}
		compareAndUpdateBool(options) {
			if (this.key === options.key && deepEqual(this.args, options.args)) return false;
			this.update(options);
			return true;
		}
		compareAndUpdate(options) {
			if (this.key === options.key && deepEqual(this.args, options.args)) return;
			return this.update(options);
		}
	}
	_I18n.IntlElement = IntlElement;
	const cachedDateTimeFormats = /* @__PURE__ */ new Map();
	function getDateTimeFormat(options = {}) {
		const json = JSON.stringify(options);
		let dateTimeFormat = cachedDateTimeFormats.get(json);
		if (!dateTimeFormat) {
			dateTimeFormat = new Intl.DateTimeFormat(lastRequestedNormalizedLangCode + (timeFormat ? "-u-hc-" + timeFormat : ""), options);
			cachedDateTimeFormats.set(json, dateTimeFormat);
		}
		return dateTimeFormat;
	}
	_I18n.getDateTimeFormat = getDateTimeFormat;
	const timeStringsCache = /* @__PURE__ */ new WeakMap();
	const TIME_STRING_OPTIONS = {
		hour: "2-digit",
		minute: "2-digit"
	};
	const TIME_STRING_OPTIONS_JSON = JSON.stringify(TIME_STRING_OPTIONS);
	function warmTimeStrings(dateTimeFormat, timeStrings) {
		if (cachedDateTimeFormats.get(TIME_STRING_OPTIONS_JSON) !== dateTimeFormat) return;
		const date = /* @__PURE__ */ new Date();
		let budget = 240;
		for (let minutesKey = 0; minutesKey < 1440; ++minutesKey) {
			if (timeStrings.has(minutesKey)) continue;
			if (--budget < 0) {
				scheduleWarmTimeStrings(dateTimeFormat, timeStrings);
				return;
			}
			const hours = minutesKey / 60 | 0, minutes = minutesKey % 60;
			date.setHours(hours, minutes, 0, 0);
			if (date.getHours() === hours && date.getMinutes() === minutes) timeStrings.set(minutesKey, dateTimeFormat.format(date));
		}
	}
	function scheduleWarmTimeStrings(dateTimeFormat, timeStrings) {
		const warm = () => warmTimeStrings(dateTimeFormat, timeStrings);
		globalThis.requestIdleCallback ? globalThis.requestIdleCallback(warm) : setTimeout(warm, 100);
	}
	function formatTimeString(date) {
		const dateTimeFormat = cachedDateTimeFormats.get(TIME_STRING_OPTIONS_JSON) || getDateTimeFormat(TIME_STRING_OPTIONS);
		let timeStrings = timeStringsCache.get(dateTimeFormat);
		if (!timeStrings) {
			timeStringsCache.set(dateTimeFormat, timeStrings = /* @__PURE__ */ new Map());
			scheduleWarmTimeStrings(dateTimeFormat, timeStrings);
		}
		const minutesKey = date.getHours() * 60 + date.getMinutes();
		let text = timeStrings.get(minutesKey);
		if (text === void 0) timeStrings.set(minutesKey, text = dateTimeFormat.format(date));
		return text;
	}
	class IntlDateElement extends IntlElementBase {
		constructor(options) {
			super({
				...options,
				property: options.property ?? "textContent"
			});
			setDirection(this.element);
			if (options?.date) this.update(options);
		}
		update(options) {
			safeAssign(this, options);
			let text;
			if (this.options.hour && this.options.minute && Object.keys(this.options).length === 2) text = formatTimeString(this.date);
			else text = capitalizeFirstLetter(getDateTimeFormat(this.options).format(this.date));
			this.element[this.property] = text;
		}
	}
	_I18n.IntlDateElement = IntlDateElement;
	function i18n(key, args) {
		return new IntlElement({
			key,
			args
		}).element;
	}
	_I18n.i18n = i18n;
	function i18n_(options) {
		return new IntlElement(options).element;
	}
	_I18n.i18n_ = i18n_;
	function _i18n(element, key, args, property) {
		return new IntlElement({
			element,
			key,
			args,
			property
		}).element;
	}
	_I18n._i18n = _i18n;
})(I18n || (I18n = {}));
var langPack_default = I18n;
var i18n = I18n.i18n;
var i18n_ = I18n.i18n_;
var _i18n = I18n._i18n;
function joinElementsWith(elements, joiner) {
	const arr = elements.slice(0, 1);
	for (let i = 1; i < elements.length; ++i) {
		const isLast = elements.length - 1 === i;
		arr.push(typeof joiner === "function" ? joiner(isLast) : joiner);
		arr.push(elements[i]);
	}
	return arr;
}
function join(elements, useLast = true, plain) {
	const joined = joinElementsWith(elements, (isLast) => {
		const langPackKey = isLast && useLast ? "AutoDownloadSettings.LastDelimeter" : "AutoDownloadSettings.Delimeter";
		return plain ? I18n.format(langPackKey, true) : i18n(langPackKey);
	});
	return plain ? joined.join("") : joined;
}
async function handleUpdateLangPack(update) {
	const { difference } = update;
	if (difference.lang_code !== I18n.getLastRequestedLangCode()) return;
	const storedLangPack = await I18n.getCacheLangPack();
	if (storedLangPack?.lang_code !== difference.lang_code || storedLangPack.lang_code !== I18n.getLastRequestedLangCode()) return;
	if (storedLangPack.version !== difference.from_version) {
		handleUpdateLangPackTooLong(difference);
		return;
	}
	if (difference.strings) {
		const storedStrings = storedLangPack.strings || (storedLangPack.strings = []);
		for (const string of difference.strings) {
			const existingIndex = storedStrings.findIndex((s) => s.key === string.key);
			if (existingIndex !== -1) storedStrings[existingIndex] = string;
			else storedStrings.push(string);
		}
	}
	storedLangPack.version = difference.version;
	storedLangPack.from_version = difference.from_version;
	await I18n.saveLangPack(storedLangPack, true);
}
function handleUpdateLangPackTooLong(update) {
	const { lang_code } = update;
	if (lang_code !== I18n.getLastRequestedLangCode()) return;
	checkLangPackForUpdates();
}
function handleStateCleared() {
	handleUpdateLangPackTooLong({ lang_code: I18n.getLastRequestedLangCode() });
}
async function checkLangPackForUpdates() {
	const storedLangPack = await I18n.getCacheLangPack();
	if (storedLangPack.rtl === void 0) {
		const language = await rootScope.managers.appLangPackManager.getLanguage(storedLangPack.lang_code, "web").catch(() => void 0);
		if (language && storedLangPack.lang_code === I18n.getLastRequestedLangCode()) {
			storedLangPack.rtl = !!language.pFlags.rtl;
			await I18n.saveLangPack(storedLangPack, true);
		}
	}
	const difference = await rootScope.managers.appLangPackManager.getDifference(storedLangPack.lang_code, storedLangPack.version);
	if (difference.version > storedLangPack.version) return handleUpdateLangPack({ difference });
}
rootScope.addEventListener("langpack_update", handleUpdateLangPack);
rootScope.addEventListener("langpack_update_too_long", handleUpdateLangPackTooLong);
rootScope.addEventListener("state_cleared", handleStateCleared);
MOUNT_CLASS_TO && (MOUNT_CLASS_TO.I18n = I18n);
//#endregion
export { i18n as a, joinElementsWith as c, setBlankToAnchor as d, getDirection as f, capitalizeFirstLetter as h, checkLangPackForUpdates as i, langPack as l, setInnerHTML as m, UNSUPPORTED_LANG_PACK_KEY as n, i18n_ as o, setDirection as p, _i18n as r, join as s, I18n as t, langPack_default as u };
