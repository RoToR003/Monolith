//# allFunctionsCalledOnLoad
const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["chart-W_MlZWtU.js","langPack-BmdJGr44.js","userAgent-ByGXcznk.js","rolldown-runtime-CwcJO0Gh.js","app-BuFf8z8C.js","icon-DbP6Es97.js","rootScope-CZS0lmz8.js","eventListenerBase-da40Q-0t.js","logger-7zf0rNYS.js","mainMessagePort-B60c5YFT.js","superMessagePort-DhrhiTig.js","makeError-CiXxcKtE.js","encryptedStorageLayer-gN9TBXzg.js","idb-BZfkipS3.js","pause-BSJh-z46.js","cancellablePromise-bof--dnO.js","noop-H9NNBLfX.js","cryptoMessagePort-D8QFBtT1.js","commonStateStorage-CW-poHCa.js","regex-DmbDaFB2.js","solid-9Vxm0VIz.js","preload-helper-B0NHKCoo.js","appWindow-bo-KtJhy.js","chart-0XzqibSK.css"])))=>i.map(i=>d[i]);
import { i as __toESM, n as __exportAll } from "./rolldown-runtime-CwcJO0Gh.js";
import { f as DEBUG, h as Modes, n as IS_ANDROID } from "./userAgent-ByGXcznk.js";
import { n as appNavigationController } from "./appNavigationController-Ct0fx8yF.js";
import { t as findUpClassName } from "./findUpClassName-3V5me58N.js";
import { n as fastRaf, t as doubleRaf } from "./schedulers-Cx0-7a1P.js";
import { C as FontFamily, D as FontSize, T as FontFull, o as customProperties, t as themeController } from "./themeController-2cytOOn0.js";
import { t as noop } from "./noop-H9NNBLfX.js";
import { t as Icon } from "./icon-DbP6Es97.js";
import { H as isObject, g as getPeerActiveUsernames } from "./objectUrlUtils-5x08MNuO.js";
import { B as useChat, U as useUser, t as apiManagerProxy } from "./apiManagerProxy-DmQXvxSF.js";
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { t as EventListenerBase } from "./eventListenerBase-da40Q-0t.js";
import { n as indexOfAndSplice } from "./superMessagePort-DhrhiTig.js";
import { t as makeError } from "./makeError-CiXxcKtE.js";
import { a as i18n, c as joinElementsWith, m as setInnerHTML, r as _i18n, s as join, u as langPack_default } from "./langPack-BmdJGr44.js";
import { C as createSignal, I as splitProps, L as untrack, M as onCleanup, N as onMount, R as useContext, _ as createMemo, a as Index, b as createResource, d as batch, g as createEffect, i as For, j as on, o as Match, p as createComponent, s as Show, u as Switch, x as createRoot, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { n as deferredPromise } from "./cancellablePromise-bof--dnO.js";
import { t as __vitePreload } from "./preload-helper-B0NHKCoo.js";
import { t as tsNow } from "./tsNow-DUzGGNNb.js";
import { n as getAppWindow, r as getOverlayRoot } from "./appWindow-bo-KtJhy.js";
import { a as isSessionLeaving, i as getManagersSession } from "./getCurrentAccount-D0KQFbZ6.js";
import { n as bindManagersToSession } from "./bindManagersToAccount-BL82O9H9.js";
import { t as getServerMessageId } from "./getServerMessageId-1hhP4U5Q.js";
import { t as cancelEvent } from "./cancelEvent-Cw8vYZHp.js";
import { E as hexToRgb, L as rgbIntToHex, P as mixColors, p as changeBrightness, w as getRgbColorFromTelegramColor, z as rgbaToHexa } from "./state-JPIG5PpJ.js";
import { t as clamp } from "./clamp-9UaNhw6N.js";
import { n as createStore, o as unwrap } from "./store-PwRn5fa3.js";
import { c as useAppState, s as useAppConfig } from "./contentSettings-DMhHR-0w.js";
import { _ as use, c as insert, d as render, f as setAttribute, g as template, h as style, o as className$3, p as setStyleProperty, r as addEventListener, s as delegateEvents, t as Dynamic, u as memo } from "./web-BPyQozky.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { t as liteMode } from "./liteMode-DeLStZfQ.js";
import { t as lerp } from "./lerp-DAS1FxCk.js";
import { t as accumulate } from "./accumulate-DzVphodg.js";
import { a as makeMediaSize } from "./mediaSizes-C1MTaleW.js";
import { i as getCountryEmoji } from "./emoji-Bi9QRCod.js";
import { M as LazyLoadQueue, d as replaceNonNumber, u as wrapRichText } from "./renderer-L80wjxct.js";
import { t as findUpAsChild } from "./findUpAsChild-CPjgnY00.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
import { t as IconTsx } from "./iconTsx-B4lOk4A6.js";
import { t as getMiddleware } from "./middleware-D6HuIqPm.js";
import { t as ListenerSetter } from "./listenerSetter-BER6qAXn.js";
import { n as resolveElements } from "./dist-Fd6wPWkH.js";
import { t as I18nTsx } from "./i18n-CGMFiAW0.js";
import { t as Button } from "./buttonTsx-Bwphkm9r.js";
import { n as putPreloader, t as PreloaderTsx } from "./putPreloader-Bxq7N1RV.js";
import { t as Scrollable } from "./scrollable2-Bau9Hoih.js";
import { t as buttonKeyDown } from "./buttonKeyDown-CqZzefS3.js";
import { i as simulateClickEvent, n as attachClickEvent } from "./clickEvent-COk4YpLP.js";
import { i as createPopup, n as PopupElement, r as addCancelButton, t as PopupContext } from "./indexTsx-v9mB9bAq.js";
import { t as placeCaretAtEnd } from "./placeCaretAtEnd-BtAUyd5U.js";
import { t as Button$1 } from "./button-DpTvniRN.js";
import { F as getUnsafeRandomInt, a as wrapSticker, b as wrapMediaSpoiler, n as StickerTsx, o as createMiddleware } from "./sticker-5twBOy1Y.js";
import { r as renderImageFromUrlPromise } from "./blur-BvAbRYUw.js";
import { n as animateSingle } from "./animation-Dd3Xpw_9.js";
import { t as lottieLoader } from "./lottieLoader-B3FXw0K7.js";
import { i as BezierEasing } from "./easings-DXRWZVIJ.js";
import { t as assumeType } from "./assumeType-CmXHXz9E.js";
import { o as isWebDocument } from "./mimeTypeMap-CnhjI2wm.js";
import { n as InputState, s as getRichValueWithCaret, t as InputField } from "./inputField-CaCo30N0.js";
import { n as PasswordInputHelpers, t as PasswordInputField } from "./passwordInputField-QceorkLx.js";
import { t as InputFieldTsx } from "./inputFieldTsx-0SbEFdGE.js";
import { n as numberThousandSplitterForStars, t as numberThousandSplitter } from "./numberThousandSplitter-CGiPNwwW.js";
import { B as formatTime, L as formatFullSentTime, O as randomLong, P as formatDate, l as getCollectibleName, z as formatMonthsDuration } from "./index-B7axFZql.js";
import { t as Transition } from "./transition-Cmlc134D.js";
import { f as createListTransition, i as SimpleAnimation, r as GrowHeightReveal, t as Animated } from "./animations-DCmLIda3.js";
import { A as AvatarNewTsx, C as ButtonMenuSync, Cn as CheckboxField, M as avatarNew, P as wrapPhotoToAvatar, St as wrapMessageActionTextNew, V as currencyStarIcon, Vt as partition, _ as ROW_SELECTION_CHECKBOX_CLASS, _t as Sparkles, b as ROW_WITH_CHECKBOX_AND_MEDIA_CLASS, c as createContextMenu, dt as wrapPeerTitle, ft as PeerTitle, ht as generateTitleIcons, i as Row, k as AvatarNew, m as positionMenuTrigger, mn as Currencies, pn as paymentsWrapCurrencyAmount, r as showPeerPopup, s as CheckboxFieldTsx, t as confirmationPopup, v as ROW_SELECTION_MEDIA_CLASS, vn as wrapPhoto } from "./confirmationPopup-Bz6mK0o-.js";
import { _t as starsTransactionProviders, gt as getStarsTransactionPresentation, hn as filterUnique, ht as getStarsTransactionMessagePeerId, mt as getStarsTransactionFullAmount, vt as putInOrder, wt as inputStarGiftEquals, yt as setBooleanFlag } from "./getChatMigratedTo-ChhMNXuu.js";
import { G as formatNanoton, K as nanotonToJsNumber, U as getPeerId, i as formatStarsAmountExact, q as parseNanotonFromDecimal, r as formatStarsAmount, z as wrapMessageEntities } from "./canPollPeerStories-D3HoBvLX.js";
import { n as wrapEmojiText } from "./wrapEmojiText-DT39R5Tj.js";
import { i as wrapLeftDuration, l as formatDuration, r as wrapFormattedDuration, t as wrapCallDuration } from "./wrapDuration-BQgz9hDF.js";
import { t as require_BigInteger } from "./BigInteger-0a0WsWCs.js";
import { t as subscribeOn } from "./subscribeOn-DnCla7ws.js";
import { C as ButtonIconTsx, c as smoothScrollBehavior, s as SuperStickerRenderer } from "./openEditors-7FmA7q_V.js";
import { a as LottieAnimation, t as MediaHeader } from "./mediaHeader-CnpQNwOl.js";
import { t as anchorCallback } from "./anchorCallback-BbwAJdBk.js";
import { i as Star3D, o as getGiftAssetName, r as showGiftLinkPopup } from "./giftLink-okcHtE1m.js";
import { a as wrapLocalSticker, i as emptyPlaceholder$1, o as getChatMembersString, t as AppSelectPeers } from "./appSelectPeers-BYpCZNpe.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { r as wrapSolidComponent } from "./wrapSolidComponent-BASCjNJG.js";
import { n as easeInOutSineApply } from "./easeInOutSine-Dxgh7RmF.js";
import { n as toast, r as toastNew, t as hideToast } from "./toast-B6VD5M7R.js";
import { t as TransitionSlider } from "./transition-BRcIGNUC.js";
import { n as horizontalMenu, t as Tabs } from "./tabs-BOYPH0Vn.js";
import { t as formatNumber } from "./formatNumber-B_dJh0pa.js";
import { r as copyTextToClipboard } from "./clipboard-DzscV-ca.js";
import { t as ButtonMenuToggle } from "./buttonMenuToggle-1aKRQh1m.js";
import { t as getTextWidth } from "./getTextWidth-DuqOrM4A.js";
import { i as useStars, n as prefetchStars } from "./stars-RHwyveTa.js";
import { r as AnimatedSuper, t as AnimatedCounter } from "./animatedCounter-DSopLGin.js";
import { a as showPickUserPopup, n as showContactPickerPopup, r as showPickUser2Popup, s as showSharingPicker2Popup } from "./pickUser-D8S6yVuK.js";
import { t as RangeSelector } from "./rangeSelector-Bspn3Z0a.js";
import { n as LimitLine } from "./limit-j5BxQxwd.js";
import { t as InviteLink } from "./inviteLink-DcZkMktu.js";
import { t as toggleDisability } from "./toggleDisability-2oUcKWqw.js";
import { t as createListenerSetter } from "./createListenerSetter-B9GrRG19.js";
import { t as PeerTitleTsx } from "./peerTitleTsx-DcpEYRoE.js";
import { i as TablePeer, n as TableButton, r as TableButtonWithTooltip, t as Table } from "./table-Bjjwur0y.js";
import { p as generatePhotoForExtendedMediaPreview } from "./audio-BL6xvRqa.js";
import { t as attachPlainMessageEditor } from "./plainField-DIjPnqVa.js";
import { t as safeWindowOpen } from "./safeWindowOpen-BUv4gymx.js";
import { a as StarsStar, i as StarsStackedStars, n as StarsBalance, r as StarsChange, t as StarsAmount } from "./starsAmount-DnM7V5Ca.js";
import { n as SliderSuperTabEventable } from "./sliderTab-Wd675qRf.js";
import { t as toastError } from "./toastError-BSN4cjN_.js";
import { r as wrapReplyDivAndCaption, t as showDatePickerPopup } from "./datePicker-D1G1w7Ns.js";
import { r as wrapEmojiPattern } from "./emojiPattern-D0r3S8QS.js";
import { i as formatPhoneNumber, n as CountryInputField, r as filterCountries, t as TelInputField } from "./telInputField-CGJ5qn0G.js";
import { n as ScrollSaver, t as TelegramWebView } from "./telegramWebView-BuAWwP2h.js";
import { p as StaticCheckbox } from "./geoPin-BKDcrfIw.js";
import { t as createArray } from "./createArray-sIAdGFqT.js";
import { t as matchEmail } from "./matchEmail-DTfylaPT.js";
import { t as RadioFormTsx } from "./radioFormTsx-DmQSa7Gk.js";
import { r as wrapStoryMedia } from "./preview-B0twIh_m.js";
import { n as FeatureRows } from "./featureDetails-CneJjJj-.js";
import { t as untrackActions } from "./untrackActions-C9U0KjUP.js";
import { t as stargiftsGrid_module_default } from "./stargiftsGrid.module-DsZKykwX.js";
import { t as shake } from "./shake-1vPuqgfm.js";
import { t as passwordPopup } from "./password-BDXrf6Bz.js";
import { t as GiftAttributeValue } from "./giftAttributeValue-D2nPeLve.js";
import { t as RangeStepsSelector } from "./rangeStepsSelector-Bh8olSph.js";
import { t as getPollCountryName } from "./getPollCountryName-OfmUTr_N.js";
import { t as createSubmenuTrigger } from "./createSubmenuTrigger-D4mDfhvb.js";
import { t as ButtonMenuToggleTsx } from "./buttonMenuToggleTsx-qF_itysT.js";
import { n as ChipTabs, t as ChipTab } from "./chipTabs-C2nG11aJ.js";
import { t as InlineSelect } from "./inlineSelect-CUZ60ySC.js";
import { t as FakeBubbles } from "./fakeBubbles-D-6pHQXV.js";
import { t as service_module_default } from "./service.module-X48sUWGP.js";
import { n as ButtonMenuSelectText, t as ButtonMenuSelect } from "./buttonMenuSelect-XBdJRNlz.js";
import { t as createOptimisticSave } from "./createOptimisticSave-CgP3bGGy.js";
//#region src/helpers/cacheCallback.ts
function cacheCallback(callback) {
	const stringResults = {}, numberResults = {};
	return (value) => {
		var _ref;
		const key = "_" + value;
		return (_ref = typeof value === "string" ? stringResults : numberResults)[key] ?? (_ref[key] = callback(value));
	};
}
//#endregion
//#region src/helpers/cards/cardBrands.ts
var CARD_BRAND_REGEXP = {
	visa: /^4/,
	mastercard: /^(51|52|53|54|55|222|23|24|25|26|27)/,
	amex: /^(34|37)/,
	discover: /^(60|64|65)/,
	diners: /^(30|38|39)/,
	diners14: /^(36)/,
	jcb: /^(35)/,
	unionpay: /^(62[0-6,8-9]|627[0-6,8-9]|6277[0-7,9]|62778[1-9]|81)/,
	elo: /^(5067|509|636368|627780)/,
	mir: /^(2\d+)/
};
var CARD_BRANDS = {
	visa: {
		minLength: 16,
		maxLength: 16,
		cvcMaxLength: 3,
		cvcMinLength: null
	},
	mastercard: {
		minLength: 16,
		maxLength: 16,
		cvcMaxLength: 3,
		cvcMinLength: null
	},
	amex: {
		minLength: 15,
		maxLength: 15,
		cvcMaxLength: 4,
		cvcMinLength: 3
	},
	unionpay: {
		minLength: 13,
		maxLength: 19,
		cvcMaxLength: 3,
		cvcMinLength: null
	},
	diners: {
		minLength: 16,
		maxLength: 16,
		cvcMaxLength: 3,
		cvcMinLength: null
	},
	diners14: {
		minLength: 14,
		maxLength: 14,
		cvcMaxLength: 3,
		cvcMinLength: null
	},
	discover: {
		minLength: 16,
		maxLength: 16,
		cvcMaxLength: 3,
		cvcMinLength: null
	},
	jcb: {
		minLength: 16,
		maxLength: 16,
		cvcMaxLength: 3,
		cvcMinLength: null
	},
	elo: {
		minLength: 16,
		maxLength: 16,
		cvcMaxLength: 3,
		cvcMinLength: null
	},
	mir: {
		minLength: 16,
		maxLength: 16,
		cvcMaxLength: 3,
		cvcMinLength: null
	},
	unknown: {
		minLength: 16,
		maxLength: 16,
		cvcMaxLength: 4,
		cvcMinLength: 3
	}
};
var detectCardBrand = cacheCallback((card = "") => {
	const keys = Object.keys(CARD_BRAND_REGEXP);
	const sanitizedCard = replaceNonNumber(card);
	let brand;
	let last = 0;
	keys.forEach((key) => {
		const regExp = CARD_BRAND_REGEXP[key];
		const match = sanitizedCard.match(regExp);
		if (match) {
			const result = match[0];
			if (result && result.length > last) {
				brand = key;
				last = result.length;
			}
		}
	});
	return brand || "unknown";
});
function cardBrandToUnifiedBrand(brand) {
	return brand === "diners14" ? "diners" : brand;
}
function detectUnifiedCardBrand(card = "") {
	return cardBrandToUnifiedBrand(detectCardBrand(card));
}
//#endregion
//#region src/helpers/string/buggedNumbers.ts
var delta = "０".charCodeAt(0) - "0".charCodeAt(0);
var buggedRegExp = /[０-９]/g;
function getDistanceFromBuggedToNormal(char) {
	return String.fromCharCode(char.charCodeAt(0) - delta);
}
function fixBuggedNumbers(str) {
	return str.replace(buggedRegExp, getDistanceFromBuggedToNormal);
}
//#endregion
//#region src/helpers/cards/patternCharacters.ts
function makeOptionalCharacter(result, consumed) {
	return {
		type: "optional",
		result,
		consumed
	};
}
function makeRequiredCharacter(result, consumed, partial) {
	return {
		type: "required",
		result,
		consumed,
		partial
	};
}
function makeFormattingCharacter(result, consumed) {
	return {
		type: "formatting",
		result,
		consumed
	};
}
function wrapCharacterRegExpFactory(regExp, optional) {
	return (str) => {
		const _regExp = new RegExp("^".concat(regExp.source.replace(/^\^/, "")));
		const match = str.match(_regExp);
		const makeCharacter = optional ? makeOptionalCharacter : makeRequiredCharacter;
		if (match) {
			const result = match[0];
			return makeCharacter(result, match.index + result.length);
		}
		return makeCharacter("", str.length);
	};
}
function makeCapitalPatternCharacter(str) {
	const char = wrapCharacterRegExpFactory(/\w/)(str);
	return char.result ? makeRequiredCharacter(char.result.toUpperCase(), char.consumed) : char;
}
var makeMonthDigitPatternCharacter = wrapCharacterRegExpFactory(/1[0-2]|0?[1-9]|0/);
function digit$1(str) {
	return wrapCharacterRegExpFactory(/[0-9]/)(fixBuggedNumbers(str));
}
var patternCharacters = {
	digit: digit$1,
	capitalCharacter: makeCapitalPatternCharacter,
	month: (str) => {
		const char = makeMonthDigitPatternCharacter(fixBuggedNumbers(str));
		const cleanedResult = replaceNonNumber(char.result);
		if (["0", "1"].includes(char.result) && str.length === 1 || char.result === "0" && str.length >= 2) return makeRequiredCharacter(char.result, str.length, true);
		return makeRequiredCharacter(cleanedResult.length === 1 ? "0" + cleanedResult : cleanedResult, char.consumed);
	},
	formattingCharacter: (str) => {
		return (str1) => {
			return makeFormattingCharacter(str, str === str1[0] ? 1 : 0);
		};
	},
	optionalPattern: (regExp) => {
		return (str) => {
			const char = wrapCharacterRegExpFactory(regExp, true)(str);
			return char.result ? char : makeOptionalCharacter("", 0);
		};
	}
};
//#endregion
//#region src/helpers/cards/cardFormattingPatterns.ts
var digit = patternCharacters.digit;
var capitalCharacter = patternCharacters.capitalCharacter;
var spaceCharacter = patternCharacters.formattingCharacter(" ");
var yearOptionalPattern = patternCharacters.optionalPattern(/\d\d/);
var sixteenPattern = [
	digit,
	digit,
	digit,
	digit,
	spaceCharacter,
	digit,
	digit,
	digit,
	digit,
	digit,
	digit,
	spaceCharacter,
	digit,
	digit,
	digit,
	digit,
	digit
];
var fifteenPattern = [
	digit,
	digit,
	digit,
	digit,
	spaceCharacter,
	digit,
	digit,
	digit,
	digit,
	digit,
	digit,
	spaceCharacter,
	digit,
	digit,
	digit,
	digit
];
var requiredPostcodes = /* @__PURE__ */ new Set([
	"DZ",
	"AR",
	"AM",
	"AU",
	"AT",
	"AZ",
	"PT",
	"BD",
	"BY",
	"BE",
	"BA",
	"BR",
	"BN",
	"BG",
	"CA",
	"IC",
	"CN",
	"CO",
	"HR",
	"CY",
	"CZ",
	"DK",
	"EC",
	"GB",
	"EE",
	"FO",
	"FI",
	"FR",
	"GE",
	"DE",
	"GR",
	"GL",
	"GU",
	"GG",
	"NL",
	"HU",
	"IN",
	"ID",
	"IL",
	"IT",
	"JP",
	"JE",
	"KZ",
	"KR",
	"FM",
	"KG",
	"LV",
	"LI",
	"LT",
	"LU",
	"MK",
	"MG",
	"PT",
	"MY",
	"MH",
	"MQ",
	"YT",
	"MX",
	"MN",
	"ME",
	"NL",
	"NZ",
	"GB",
	"NO",
	"PK",
	"PH",
	"PL",
	"FM",
	"PT",
	"PR",
	"RE",
	"RU",
	"SA",
	"SF",
	"RS",
	"SG",
	"SK",
	"SI",
	"ZA",
	"ES",
	"LK",
	"SX",
	"VI",
	"VI",
	"SE",
	"CH",
	"TW",
	"TJ",
	"TH",
	"TU",
	"TN",
	"TR",
	"TM",
	"VI",
	"UA",
	"GB",
	"US",
	"UY",
	"UZ",
	"VA",
	"VN",
	"GB",
	"FM"
]);
var generateFourPattern = cacheCallback((length) => {
	const out = [];
	for (let i = 0, k = 0; i < length;) if (k === 4) {
		out.push(spaceCharacter);
		k = 0;
	} else {
		out.push(digit);
		++i;
		++k;
	}
	return out;
});
function generateCardNumberPattern(card) {
	const brand = detectCardBrand(card);
	if (brand === "amex") return sixteenPattern;
	if (brand === "diners14") return fifteenPattern;
	const { minLength, maxLength } = CARD_BRANDS[brand];
	const s = replaceNonNumber(card).length;
	return generateFourPattern(Math.min(Math.max(minLength, s), maxLength));
}
var cardFormattingPatterns = {
	cardNumber: generateCardNumberPattern,
	cardExpiry: () => [
		patternCharacters.month,
		patternCharacters.formattingCharacter("/"),
		digit,
		digit,
		yearOptionalPattern
	],
	cardCvc: (card) => cardFormattingPatterns.cardCvcFromBrand(detectCardBrand(card)),
	cardCvcFromBrand: cacheCallback((brand) => {
		const { cvcMinLength, cvcMaxLength } = CARD_BRANDS[brand];
		const pattern = createArray(cvcMinLength || cvcMaxLength, digit);
		if (cvcMinLength && cvcMinLength < cvcMaxLength) {
			const i = cvcMaxLength - cvcMinLength;
			const h = patternCharacters.optionalPattern(/\d/);
			if (i) pattern.push(...createArray(i, h));
		}
		return pattern;
	}),
	postalCodeFromCountry: cacheCallback((iso2) => {
		switch (iso2) {
			case "US": return createArray(5, digit);
			case "CA": return IS_ANDROID ? null : [
				capitalCharacter,
				capitalCharacter,
				capitalCharacter,
				spaceCharacter,
				capitalCharacter,
				capitalCharacter,
				capitalCharacter
			];
			default:
				const optionalDigits = createArray(10, patternCharacters.optionalPattern(/\d/));
				if (requiredPostcodes.has(iso2)) optionalDigits[0] = digit;
				return optionalDigits;
		}
	})
};
//#endregion
//#region src/helpers/cards/formatValueByPattern.ts
function accumulateLengths(strs) {
	return accumulate(strs.map((str) => str.length), 0);
}
function formatValueByPattern(getPattern, value, options = {}, pushRest) {
	const pattern = getPattern(value);
	if (!pattern) return {
		value,
		selection: null,
		autocorrectComplete: !!value
	};
	const length = pattern.length;
	const c = [];
	const s = [];
	let l = 0;
	let i = 0;
	let f = options.selectionStart === 0 ? 0 : null;
	let d = options.selectionEnd === 0 ? 0 : null;
	const p = () => {
		if (f === null && i + 1 >= options.selectionStart) f = accumulateLengths(c) + (pushRest ? s.length : 0);
		if (d === null && i + 1 >= options.selectionEnd) d = accumulateLengths(c) + (pushRest ? s.length : 0);
	};
	const m = (e) => {
		if (e > 0) {
			p();
			i += e;
		}
	};
	for (; l < length;) {
		const getCharacter = pattern[l];
		const character = getCharacter(value.slice(i));
		const { type, result, consumed } = character;
		if (type === "required") {
			if (result) {
				c.push(...s, result);
				s.length = 0;
				++l;
				if (character.partial) {
					m(value.length - i);
					break;
				}
				m(consumed);
			} else {
				if (!consumed) break;
				m(1);
			}
		} else if (type === "optional") {
			if (result) {
				c.push(...s, result);
				s.length = 0;
				m(consumed);
			}
			++l;
		} else if (type === "formatting") {
			if (!pushRest && i >= value.length) break;
			s.push(result);
			++l;
			m(consumed);
		}
	}
	if (pushRest) c.push(...s);
	return {
		value: c.join(""),
		selection: {
			selectionStart: f === null || value.length && options.selectionStart === value.length ? accumulateLengths(c) : f,
			selectionEnd: d === null || value.length && options.selectionEnd === value.length ? accumulateLengths(c) : d
		},
		autocorrectComplete: l === length
	};
}
//#endregion
//#region src/helpers/cards/formatInputValueByPattern.ts
function formatInputValueByPattern(options) {
	const { value: originalValue, getPattern, deleting, input } = options;
	const pushRest = !deleting && !!originalValue.length;
	const result = formatValueByPattern(getPattern, originalValue, {
		selectionStart: input ? input.selectionStart : 0,
		selectionEnd: input ? input.selectionEnd : 0
	}, pushRest);
	const { value, selection } = result;
	return {
		value,
		meta: {
			autocorrectComplete: result.autocorrectComplete,
			empty: !value
		},
		selection
	};
}
//#endregion
//#region src/helpers/cards/getSmartGlocalTokenizeUrl.ts
var PATH = "/cds/v1/tokenize/card";
/**
* Where Smart Glocal turns a card into a token. The payment form may name its own endpoint, which is
* taken only when it is exactly that endpoint on a Smart Glocal host: the card number and the code go
* there. Anything else falls back to Smart Glocal's own one, its playground for a test invoice.
*/
function getSmartGlocalTokenizeUrl(tokenizeUrl, isTest) {
	let url;
	try {
		url = new URL(tokenizeUrl);
	} catch (err) {}
	if (url && url.href === tokenizeUrl && url.protocol === "https:" && url.hostname.endsWith(".smart-glocal.com") && !url.port && !url.username && !url.password && url.pathname === PATH && !url.search && !url.hash) return url.href;
	return `https://${isTest ? "tgb-playground" : "tgb"}.smart-glocal.com${PATH}`;
}
//#endregion
//#region src/helpers/cards/validateCard.ts
var nbspRegExp = /* @__PURE__ */ new RegExp("‎", "g");
function makeValidationError(code) {
	return code ? {
		type: "invalid",
		code
	} : null;
}
function validateCompleteCardNumber(card) {
	const t = "0".charCodeAt(0);
	const n = card.length % 2;
	let a = 0;
	for (let i = card.length - 1; i >= 0; --i) {
		const c = n === i % 2;
		let o = card.charCodeAt(i) - t;
		if (c) o *= 2;
		if (o > 9) o -= 9;
		a += o;
	}
	return !(a % 10);
}
function validateExpiry(year, month, options) {
	const date = options.date || /* @__PURE__ */ new Date();
	const _year = year < 100 ? date.getFullYear() % 100 : date.getFullYear();
	const nextMonth = date.getMonth() + 1;
	if (isNaN(year) || isNaN(month)) return options?.ignoreIncomplete ? null : "incomplete";
	if (year - _year < 0) return "invalid_expiry_year_past";
	if (year - _year > 50) return "invalid_expiry_year";
	return !(year - _year) && month < nextMonth ? "invalid_expiry_month_past" : null;
}
function getCardInfoByNumber(card) {
	const sanitized = replaceNonNumber(card);
	const brand = detectCardBrand(card);
	return {
		sanitized,
		brand,
		minLength: CARD_BRANDS[brand].minLength
	};
}
function makeCardNumberError(str, length, ignoreIncomplete) {
	if (str.length >= length) return validateCompleteCardNumber(str) || detectCardBrand(str) === "mir" ? null : makeValidationError("invalid");
	return ignoreIncomplete ? null : makeValidationError("incomplete");
}
function validateCardNumber(str, options = {}) {
	const { sanitized, minLength } = getCardInfoByNumber(str);
	return makeCardNumberError(sanitized, minLength, options.ignoreIncomplete);
}
function validateCardExpiry(str, options = {}) {
	const [monthStr, yearStr = ""] = str.replace(nbspRegExp, "").split(/ ?\/ ?/);
	const [month, year] = [monthStr, yearStr].map((str) => +str);
	const s = yearStr.length === 2 ? year % 100 : year;
	return yearStr.length < 2 || yearStr.length === 3 ? options.ignoreIncomplete ? null : makeValidationError("incomplete") : makeValidationError(validateExpiry(s, month, options));
}
function validateAnyIncomplete(formatted, str, options = {}) {
	return formatted.meta.autocorrectComplete || options.ignoreIncomplete ? null : makeValidationError("incomplete");
}
//#endregion
//#region src/helpers/getWebViewTgLink.ts
function getWebViewTgLink(pathFull) {
	return "https://t.me/" + (pathFull || "").replace(/^\/+/, "");
}
//#endregion
//#region src/components/popups/paymentVerification.tsx
function createVerificationIframe(options) {
	const result = new TelegramWebView({
		...options,
		sandbox: "allow-forms allow-scripts allow-same-origin allow-modals"
	});
	const { iframe } = result;
	iframe.allow = "payment";
	iframe.title = langPack_default.format("Checkout.WebConfirmation.Title", true);
	iframe.classList.add("payment-verification");
	return result;
}
function showPaymentVerificationPopup(options) {
	const [show, setShow] = createSignal(true);
	const telegramWebView = createVerificationIframe({ url: options.url });
	telegramWebView.addEventListener("web_app_open_tg_link", (e) => {
		options.onFinish?.();
		setShow(false);
		if (options.openPathAfter) hotReloadGuard.appImManager.openUrl(getWebViewTgLink(e.path_full));
	});
	createPopup(() => {
		onMount(() => telegramWebView.onMount());
		onCleanup(() => telegramWebView.destroy());
		return createComponent(PopupElement, {
			"class": "popup-payment popup-payment-verification",
			closable: true,
			get show() {
				return show();
			},
			get onClose() {
				return options.onClose;
			},
			get children() {
				return [createComponent(PopupElement.Header, { get children() {
					return [createComponent(PopupElement.CloseButton, {}), createComponent(PopupElement.Title, { title: "Checkout.WebConfirmation.Title" })];
				} }), createComponent(PopupElement.Body, { get children() {
					return telegramWebView.iframe;
				} })];
			}
		});
	});
	return { hide: () => setShow(false) };
}
//#endregion
//#region src/components/popups/paymentSaveInformationRow.tsx
function PaymentSaveInformationRow(props) {
	return createComponent(Row, {
		get disabled() {
			return props.disabled;
		},
		get children() {
			return [
				createComponent(Row.Title, { get children() {
					return i18n(props.title);
				} }),
				createComponent(Row.Subtitle, { get children() {
					return i18n(props.subtitle);
				} }),
				createComponent(Row.CheckboxField, { get children() {
					return createComponent(CheckboxFieldTsx, {
						get checked() {
							return props.checked;
						},
						get disabled() {
							return props.disabled;
						},
						get onChange() {
							return props.onChange;
						}
					});
				} })
			];
		}
	});
}
//#endregion
//#region src/components/popups/paymentCard.tsx
var _tmpl$$31 = /*#__PURE__*/ template(`<form class=popup-payment-input-fields><div class=input-fields-row>`);
var _tmpl$2$18 = /*#__PURE__*/ template(`<div class=popup-payment-input-fields>`);
var InputFieldCorrected = class extends InputField {
	constructor(options) {
		super(options);
		this.options = options;
		this.onKeyDown = (e) => {
			this.lastKeyDown = e.key;
			this.options.onKeyDown?.(e);
		};
		this.onInput = () => {
			const value = this.value;
			const deleting = this.lastKeyDown === "Backspace" && (this.lastTransformed && this.lastTransformed.value.length || 0) - value.length === 1;
			const result = this.lastTransformed = formatInputValueByPattern({
				value,
				getPattern: this.options.formatMethod,
				deleting,
				input: this.input
			});
			const transformedValue = result.value;
			if (transformedValue !== value) {
				this.setValueSilently(transformedValue);
				if (result.selection) {
					this.input.selectionStart = result.selection.selectionStart;
					this.input.selectionEnd = result.selection.selectionEnd;
				}
			}
			this.validateNew(transformedValue, { ignoreIncomplete: true });
			this.options.onChange?.(result);
		};
		this.onBlur = () => {
			const value = this.lastTransformed?.value;
			if (value) this.validateNew(value);
		};
		this.validate = () => {
			return this.validateNew();
		};
		this.input.addEventListener("keydown", this.onKeyDown);
		this.input.addEventListener("input", this.onInput);
		this.input.addEventListener("blur", this.onBlur);
	}
	update() {
		this.onInput();
	}
	validateNew(value = this.lastTransformed?.value ?? "", t = {}, justReturn) {
		let result;
		if (this.options.validateMethod) result = this.options.validateMethod?.(value, t);
		else result = validateAnyIncomplete(this.lastTransformed, value, t);
		if (result?.code) {
			const langPackKey = this.options.errorKeys?.[result.code];
			!justReturn && this.setState(InputState.Error, langPackKey);
			return false;
		}
		!justReturn && this.setState(InputState.Neutral);
		return true;
	}
};
/**
* A card number, an expiry date, a code: their characters keep left-to-right order in any language
* (the groups of a card number would swap places in a right-to-left line), while the field keeps
* its direction and starts on the side its label does — see `.popup-payment-ltr-input`.
*/
function keepInputLeftToRight(inputField) {
	inputField.input.classList.add("popup-payment-ltr-input");
}
function handleInputFieldsOnChange(inputFields, _onChange) {
	const onChange = () => {
		_onChange(inputFields.every((inputField) => {
			return "validateNew" in inputField ? inputField.validateNew(void 0, void 0, true) : inputField.isValid();
		}));
	};
	inputFields.forEach((inputField) => {
		if (inputField instanceof InputFieldCorrected) {
			const original = inputField.options.onChange;
			inputField.options.onChange = (...args) => {
				original?.(...args);
				onChange();
			};
			if ("update" in inputField) inputField.update();
		} else inputField.input.addEventListener("input", onChange);
	});
	return { validate: onChange };
}
function createCountryZipFields(country, zip) {
	let countryInputField, postcodeInputField;
	if (country || zip) {
		if (country) countryInputField = new CountryInputField({
			noPhoneCodes: true,
			onCountryChange: () => {
				postcodeInputField?.update();
			},
			required: true,
			autocomplete: "country"
		});
		if (zip) postcodeInputField = new InputFieldCorrected({
			label: "PaymentShippingZipPlaceholder",
			plainText: true,
			inputMode: "numeric",
			autocomplete: "postal-code",
			formatMethod: () => {
				const { country } = countryInputField.getSelected();
				const iso2 = country?.iso2;
				return cardFormattingPatterns.postalCodeFromCountry(iso2 && iso2.toUpperCase());
			}
		});
		if (zip) keepInputLeftToRight(postcodeInputField);
	}
	return {
		countryInputField,
		postcodeInputField
	};
}
var SUPPORTED_NATIVE_PROVIDERS = /* @__PURE__ */ new Set(["stripe", "smartglocal"]);
var NATIVE_SUPPORTED = (paymentForm, method) => SUPPORTED_NATIVE_PROVIDERS.has(paymentForm.native_provider) && !method;
function showPaymentCardPopup(options) {
	const { paymentForm, user, savedCard, method } = options;
	const [show, setShow] = createSignal(false);
	const [payDisabled, setPayDisabled] = createSignal(true);
	const isNative = NATIVE_SUPPORTED(paymentForm, method);
	let onPay;
	let Content;
	let focusField;
	let telegramWebView;
	if (!isNative) {
		telegramWebView = createVerificationIframe({ url: method?.url || paymentForm.url });
		telegramWebView.addEventListener("payment_form_submit", (data) => {
			const cardOut = {
				title: data.title,
				save: false
			};
			options.onFinish?.({
				token: data.credentials,
				card: cardOut
			});
			setShow(false);
			if (!method && paymentForm.pFlags.can_save_credentials) confirmationPopup({
				titleLangKey: "PaymentCardSavePaymentInformation",
				descriptionLangKey: "PaymentCardSavePaymentInformationInfoLine1",
				button: { langKey: "Save" }
			}).then(() => {
				cardOut.save = true;
			}, noop);
		});
		Content = () => telegramWebView.iframe;
		setShow(true);
	}
	if (isNative) {
		const nativeParams = JSON.parse(paymentForm.native_params.data);
		let lastBrand, brandIconTempId = 0, lastBrandImg;
		const setBrandIcon = (brand) => {
			if (lastBrand === brand) return;
			const tempId = ++brandIconTempId;
			lastBrand = brand;
			const path = getPaymentBrandIconPath(brand);
			if (!path) {
				if (lastBrandImg) {
					lastBrandImg.remove();
					lastBrandImg = void 0;
				}
				return;
			}
			const img = new Image();
			img.classList.add("input-field-icon");
			renderImageFromUrlPromise(img, path, false).then(() => {
				if (brandIconTempId !== tempId) return;
				if (lastBrandImg) lastBrandImg.replaceWith(img);
				else cardInputField.container.append(img);
				lastBrandImg = img;
			});
		};
		const cardInputField = new InputFieldCorrected({
			label: "PaymentCardNumber",
			plainText: true,
			inputMode: "numeric",
			autocomplete: "cc-number",
			formatMethod: cardFormattingPatterns.cardNumber,
			validateMethod: validateCardNumber,
			errorKeys: {
				invalid: "PaymentCard.Error.Invalid",
				incomplete: "PaymentCard.Error.Incomplete"
			},
			onChange: (transformed) => {
				setBrandIcon(detectUnifiedCardBrand(transformed.value));
				cvcInputField.update();
			}
		});
		let nameInputField;
		if (nativeParams.need_cardholder_name) nameInputField = new InputField({
			label: "Checkout.NewCard.CardholderNamePlaceholder",
			maxLength: 255,
			required: true,
			autocomplete: "cc-name"
		});
		const formatted = formatPhoneNumber(user.phone);
		const expireInputField = new InputFieldCorrected({
			label: "SecureId.Identity.Placeholder.ExpiryDate",
			plainText: true,
			inputMode: "numeric",
			autocomplete: "cc-exp",
			formatMethod: cardFormattingPatterns.cardExpiry,
			validateMethod: formatted.country.iso2 === "RU" ? (str, options) => {
				return validateCardExpiry(str, {
					...options || {},
					date: new Date(2022, 0, 1)
				});
			} : validateCardExpiry
		});
		expireInputField.input.addEventListener("input", () => {
			let value = expireInputField.value;
			if (value.length < 5) return;
			const splitted = value.split("/");
			if (splitted[1].length !== 4) return;
			value = [splitted[0], splitted[1].slice(2)].join("/");
			expireInputField.setValueSilently(value);
		}, { capture: true });
		const cvcInputField = new InputFieldCorrected({
			labelText: "CVC",
			plainText: true,
			inputMode: "numeric",
			autocomplete: "cc-csc",
			name: "cvc",
			formatMethod: () => cardFormattingPatterns.cardCvc(cardInputField.value)
		});
		new PasswordInputHelpers(cvcInputField.container, cvcInputField.input);
		[
			cardInputField,
			expireInputField,
			cvcInputField
		].forEach(keepInputLeftToRight);
		const switchFocusOrder = [
			cardInputField,
			expireInputField,
			cvcInputField,
			nameInputField
		].filter(Boolean);
		switchFocusOrder.forEach((inputField) => {
			const onKeyDown = (e) => {
				if (!inputField.value && e.key === "Backspace") {
					const previousInputField = switchFocusOrder[switchFocusOrder.indexOf(inputField) - 1];
					if (previousInputField) placeCaretAtEnd(previousInputField.input, true);
				}
			};
			if (inputField instanceof InputFieldCorrected) {
				inputField.options.onKeyDown = onKeyDown;
				const original = inputField.options.onChange;
				inputField.options.onChange = (transformed) => {
					original?.(transformed);
					if (inputField.input.ownerDocument.activeElement === inputField.input && transformed.meta.autocorrectComplete) for (let i = switchFocusOrder.indexOf(inputField), length = switchFocusOrder.length; i < length; ++i) {
						const nextInputField = switchFocusOrder[i];
						if (nextInputField instanceof InputFieldCorrected ? !nextInputField.validateNew(void 0, void 0, true) : !nextInputField.value) {
							placeCaretAtEnd(nextInputField.input, true);
							break;
						}
					}
				};
			} else inputField.input.addEventListener("keydown", onKeyDown);
		});
		const { countryInputField, postcodeInputField } = createCountryZipFields(nativeParams.need_country, nativeParams.need_zip);
		const hasBilling = !!(nativeParams.need_country || nativeParams.need_zip);
		const canSave = !!paymentForm.pFlags.can_save_credentials;
		let savePaymentInformation = canSave;
		const SaveRow = () => createComponent(PaymentSaveInformationRow, {
			checked: canSave,
			disabled: !canSave,
			title: "PaymentCardSavePaymentInformation",
			subtitle: canSave ? "PaymentCardSavePaymentInformationInfoLine1" : "Checkout.2FA.Text",
			onChange: (checked) => savePaymentInformation = checked
		});
		Content = () => [createComponent(Section, {
			name: "PaymentInfo.Card.Title",
			get children() {
				var _el$ = _tmpl$$31(), _el$2 = _el$.firstChild;
				insert(_el$, () => cardInputField.container, _el$2);
				insert(_el$2, () => expireInputField.container, null);
				insert(_el$2, () => cvcInputField.container, null);
				insert(_el$, () => nameInputField?.container, null);
				insert(_el$, !hasBilling && createComponent(SaveRow, {}), null);
				return _el$;
			}
		}), createComponent(Show, {
			when: hasBilling,
			get children() {
				return createComponent(Section, {
					name: "PaymentInfo.Billing.Title",
					get children() {
						var _el$3 = _tmpl$2$18();
						insert(_el$3, () => [countryInputField, postcodeInputField].filter(Boolean).map((i) => i.container), null);
						insert(_el$3, createComponent(SaveRow, {}), null);
						return _el$3;
					}
				});
			}
		})];
		onPay = async () => {
			const data = {
				cardNumber: cardInputField.value,
				expiryFull: expireInputField.value,
				expiryMonth: expireInputField.value.split("/")[0],
				expiryYear: expireInputField.value.split("/")[1],
				cvc: cvcInputField.value,
				cardholderName: nameInputField?.value,
				country: countryInputField?.value,
				zip: postcodeInputField?.value,
				save: savePaymentInformation
			};
			const tokenize = async (url, init) => {
				try {
					return await (await fetch(url, init)).json();
				} catch (err) {
					toastNew({ langPackKey: "PaymentConnectionFailed" });
					throw err;
				}
			};
			const nativeProvider = paymentForm.native_provider;
			let out;
			if (nativeProvider === "stripe") {
				const body = new URLSearchParams();
				for (const [key, value] of [
					["number", data.cardNumber],
					["exp_month", data.expiryMonth],
					["exp_year", data.expiryYear],
					["cvc", data.cvc],
					["address_zip", data.zip],
					["address_country", countryInputField?.getSelected().country?.iso2 || data.country],
					["name", data.cardholderName]
				]) if (value) body.append(`card[${key}]`, value);
				const json = await tokenize("https://api.stripe.com/v1/tokens", {
					method: "POST",
					credentials: "same-origin",
					headers: {
						"Content-Type": "application/x-www-form-urlencoded",
						"Authorization": `Bearer ${nativeParams.publishable_key}`
					},
					body
				});
				if (!json.id) {
					const { type, code, message } = json.error || {};
					const field = {
						invalid_number: cardInputField,
						incorrect_number: cardInputField,
						invalid_expiry_month: expireInputField,
						invalid_expiry_year: expireInputField,
						expired_card: expireInputField,
						invalid_cvc: cvcInputField,
						incorrect_cvc: cvcInputField
					}[code];
					field?.setError(field === cardInputField ? "PaymentCard.Error.Invalid" : void 0);
					if (type === "card_error" && message) toast(message);
					else toastNew({ langPackKey: "Error.AnError" });
					throw makeError(void 0, `stripe: ${code || type}`);
				}
				out = {
					type: "card",
					id: json.id
				};
			} else if (nativeProvider === "smartglocal") {
				const params = { card: {
					number: data.cardNumber.replace(/[^\d]+/g, ""),
					expiration_month: data.expiryMonth,
					expiration_year: data.expiryYear,
					security_code: data.cvc.replace(/[^\d]+/g, "")
				} };
				const json = await tokenize(getSmartGlocalTokenizeUrl(nativeParams.tokenize_url, paymentForm.invoice.pFlags.test), {
					method: "POST",
					headers: {
						"Accept": "application/json",
						"Content-Type": "application/json",
						"X-PUBLIC-TOKEN": nativeParams.public_token
					},
					body: JSON.stringify(params)
				});
				const token = json.status === "ok" && json.data?.token;
				if (!token) {
					toastNew({ langPackKey: "Error.AnError" });
					throw makeError(void 0, "smartglocal: no token");
				}
				out = {
					type: "card",
					token
				};
			}
			options.onFinish?.({
				token: out,
				card: data
			});
		};
		handleInputFieldsOnChange([
			cardInputField,
			nameInputField,
			expireInputField,
			cvcInputField,
			countryInputField,
			postcodeInputField
		].filter(Boolean), (valid) => {
			setPayDisabled(!valid);
		});
		if (savedCard) {
			cardInputField.value = savedCard.cardNumber;
			expireInputField.value = savedCard.expiryFull;
			cvcInputField.value = savedCard.cvc;
			nameInputField && (nameInputField.value = savedCard.cardholderName);
			countryInputField && (countryInputField.value = savedCard.country);
			postcodeInputField && (postcodeInputField.value = savedCard.zip);
		}
		setShow(true);
		if (!cardInputField.validateNew(void 0, void 0, true)) focusField = cardInputField.input;
	}
	createPopup(() => {
		onMount(() => telegramWebView?.onMount());
		onCleanup(() => telegramWebView?.destroy());
		return createComponent(PopupElement, {
			"class": "popup-payment popup-payment-card",
			closable: true,
			get show() {
				return show();
			},
			initialFocus: () => focusField,
			get children() {
				return [
					createComponent(PopupElement.Header, { get children() {
						return [createComponent(PopupElement.CloseButton, {}), createComponent(PopupElement.Title, { title: "PaymentCardInfo" })];
					} }),
					memo(() => isNative ? createComponent(PopupElement.Scrollable, { get children() {
						return createComponent(PopupElement.Body, { get children() {
							return createComponent(Dynamic, { component: Content });
						} });
					} }) : createComponent(PopupElement.Body, { get children() {
						return createComponent(Dynamic, { component: Content });
					} })),
					memo(() => isNative && createComponent(PopupElement.Footer, { get children() {
						return createComponent(PopupElement.FooterButton, {
							confirm: true,
							preloader: true,
							pendingLangKey: "PleaseWait",
							get disabled() {
								return payDisabled();
							},
							langKey: "PaymentInfo.Done",
							callback: onPay
						});
					} }))
				];
			}
		});
	});
}
//#endregion
//#region src/components/popups/paymentCardConfirmation.tsx
function showPaymentCardConfirmationPopup(options) {
	const { card, passwordState } = options;
	const [disabled, setDisabled] = createSignal(true);
	const passwordInputField = new PasswordInputField({ labelText: passwordState.hint ?? "" });
	const onPay = async () => {
		const managers = bindManagersToSession(rootScope.managers);
		try {
			const inputCheckPassword = await managers.passwordManager.getInputCheckPassword(passwordInputField.value, passwordState);
			const tmpPassword = await managers.passwordManager.getTmpPassword(inputCheckPassword, 60);
			options.onFinish?.(tmpPassword);
		} catch (err) {
			if (err.type === "PASSWORD_HASH_INVALID") passwordInputField.setError("PASSWORD_HASH_INVALID");
			else if (!err.handled) toastNew({ langPackKey: "Error.AnError" });
			err.handled = true;
			throw err;
		}
	};
	const onInput = () => {
		setDisabled(!passwordInputField.value);
		passwordInputField.setState(InputState.Neutral);
	};
	passwordInputField.input.addEventListener("input", onInput);
	onInput();
	createPopup(() => {
		return createComponent(PopupElement, {
			"class": "popup-payment popup-payment-card-confirmation",
			closable: true,
			show: true,
			initialFocus: () => passwordInputField.input,
			get children() {
				return [
					createComponent(PopupElement.Header, { get children() {
						return [createComponent(PopupElement.CloseButton, {}), createComponent(PopupElement.Title, { title: "Checkout.PasswordEntry.Title" })];
					} }),
					createComponent(PopupElement.Scrollable, { get children() {
						return createComponent(PopupElement.Body, { get children() {
							return createComponent(Section, {
								caption: "Checkout.PasswordEntry.Text",
								captionArgs: [card],
								get children() {
									return passwordInputField.container;
								}
							});
						} });
					} }),
					createComponent(PopupElement.Footer, { get children() {
						return createComponent(PopupElement.FooterButton, {
							confirm: true,
							preloader: true,
							pendingLangKey: "PleaseWait",
							get disabled() {
								return disabled();
							},
							langKey: "Checkout.PasswordEntry.Pay",
							callback: onPay
						});
					} })
				];
			}
		});
	});
}
//#endregion
//#region src/components/popups/paymentMethods.tsx
function PaymentMethodRow(props) {
	return createComponent(Row, {
		"class": "payment-item-row",
		noWrap: true,
		get children() {
			return [createComponent(Row.Title, { get children() {
				return props.title;
			} }), createComponent(Row.CheckboxField, { get children() {
				return createComponent(CheckboxFieldTsx, {
					"class": "disable-hover",
					get checked() {
						return props.checked;
					},
					round: true,
					onChange: () => props.onSelect()
				});
			} })];
		}
	});
}
function showPaymentMethodsPopup(options) {
	const { paymentForm, user, savedCard } = options;
	const [show, setShow] = createSignal(true);
	createPopup(() => {
		const selectMethod = (onClick) => {
			setShow(false);
			onClick();
		};
		const savedCardTitle = savedCard && getCardDetailsInfo(savedCard).str;
		return createComponent(PopupElement, {
			"class": "popup-payment popup-payment-methods",
			closable: true,
			get show() {
				return show();
			},
			get children() {
				return [createComponent(PopupElement.Header, { get children() {
					return [createComponent(PopupElement.CloseButton, {}), createComponent(PopupElement.Title, { title: "PaymentMethod" })];
				} }), createComponent(PopupElement.Body, { get children() {
					return createComponent(Section, { get children() {
						return [
							createComponent(PaymentMethodRow, {
								get title() {
									return i18n("PaymentMethodNewCard");
								},
								onSelect: () => selectMethod(() => showPaymentCardPopup({
									paymentForm,
									user,
									onFinish: options.onFinish
								}))
							}),
							memo(() => savedCardTitle && createComponent(PaymentMethodRow, {
								checked: true,
								title: savedCardTitle,
								onSelect: () => selectMethod(() => {})
							})),
							memo(() => paymentForm.additional_methods?.map((method) => createComponent(PaymentMethodRow, {
								get title() {
									return wrapEmojiText(method.title);
								},
								onSelect: () => selectMethod(() => showPaymentCardPopup({
									paymentForm,
									user,
									method,
									onFinish: options.onFinish
								}))
							})))
						];
					} });
				} })];
			}
		});
	});
}
//#endregion
//#region src/components/popups/paymentShipping.tsx
var _tmpl$$30 = /*#__PURE__*/ template(`<div class=popup-payment-input-fields>`);
function showPaymentShippingPopup(options) {
	const { paymentForm, inputInvoice, focus } = options;
	const [disabled, setDisabled] = createSignal(true);
	const invoice = paymentForm.invoice;
	const savedInfo = paymentForm.saved_info;
	let addressFields, address1InputField, address2InputField, cityInputField, stateInputField, countryInputField, postcodeInputField;
	if (invoice.pFlags.shipping_address_requested) {
		address1InputField = new InputField({
			label: "PaymentShippingAddress1Placeholder",
			maxLength: 64,
			required: true
		});
		address2InputField = new InputField({
			label: "PaymentShippingAddress2Placeholder",
			maxLength: 64
		});
		cityInputField = new InputField({
			label: "PaymentShippingCityPlaceholder",
			maxLength: 64,
			required: true
		});
		stateInputField = new InputField({
			label: "PaymentShippingStatePlaceholder",
			maxLength: 64
		});
		const res = createCountryZipFields(true, true);
		countryInputField = res.countryInputField;
		postcodeInputField = res.postcodeInputField;
		addressFields = [
			address1InputField,
			address2InputField,
			cityInputField,
			stateInputField,
			countryInputField,
			postcodeInputField
		].filter(Boolean).map((inputField) => inputField.container);
	}
	let receiverFields;
	let nameInputField, emailInputField, telInputField;
	if ([
		invoice.pFlags.name_requested,
		invoice.pFlags.email_requested,
		invoice.pFlags.phone_requested
	].includes(true)) {
		const validateEmail = () => {
			const value = emailInputField.value;
			const match = matchEmail(value);
			if (!match || match[0].length !== value.length) return false;
			return true;
		};
		const validatePhone = () => {
			return !!telInputField.value.match(/\d/);
		};
		if (invoice.pFlags.name_requested) nameInputField = new InputField({
			label: "PaymentShippingName",
			maxLength: 256,
			required: true
		});
		if (invoice.pFlags.email_requested) emailInputField = new InputField({
			label: "PaymentShippingEmailPlaceholder",
			maxLength: 64,
			required: true,
			validate: validateEmail
		});
		if (invoice.pFlags.phone_requested) telInputField = new TelInputField({
			required: true,
			validate: validatePhone
		});
		receiverFields = [
			nameInputField,
			emailInputField,
			telInputField
		].filter(Boolean).map((inputField) => inputField.container);
	}
	let savePaymentInformation = true;
	const SaveRow = () => createComponent(PaymentSaveInformationRow, {
		checked: true,
		title: "PaymentShippingSave",
		subtitle: "PaymentShippingSaveInfo",
		onChange: (checked) => savePaymentInformation = checked
	});
	const onDone = async () => {
		const selectedCountry = countryInputField && countryInputField.getSelected().country;
		const data = {
			_: "paymentRequestedInfo",
			shipping_address: selectedCountry && {
				_: "postAddress",
				street_line1: address1InputField.value,
				street_line2: address2InputField.value,
				city: cityInputField.value,
				state: stateInputField.value,
				country_iso2: selectedCountry?.iso2,
				post_code: postcodeInputField.value
			},
			name: nameInputField?.value,
			email: emailInputField?.value,
			phone: telInputField?.value
		};
		try {
			const requestedInfo = await rootScope.managers.appPaymentsManager.validateRequestedInfo(inputInvoice, data, savePaymentInformation);
			options.onFinish?.({
				shippingAddress: data,
				requestedInfo
			});
		} catch (err) {
			const inputField = {
				ADDRESS_STREET_LINE1_INVALID: address1InputField,
				ADDRESS_STREET_LINE2_INVALID: address2InputField,
				ADDRESS_COUNTRY_INVALID: countryInputField,
				ADDRESS_CITY_INVALID: cityInputField,
				ADDRESS_STATE_INVALID: stateInputField,
				ADDRESS_POSTCODE_INVALID: postcodeInputField,
				REQ_INFO_NAME_INVALID: nameInputField,
				REQ_INFO_EMAIL_INVALID: emailInputField,
				REQ_INFO_PHONE_INVALID: telInputField
			}[err.type];
			if (inputField) inputField.setError();
			else toastNew({ langPackKey: err.type === "SHIPPING_NOT_AVAILABLE" ? "PaymentNoShippingMethod" : "Error.AnError" });
			err.handled = true;
			throw err;
		}
	};
	if (savedInfo) {
		const shippingAddress = savedInfo.shipping_address;
		if (shippingAddress && addressFields) {
			address1InputField.value = shippingAddress.street_line1;
			address2InputField.value = shippingAddress.street_line2;
			cityInputField.value = shippingAddress.city;
			stateInputField.value = shippingAddress.state;
			countryInputField.selectCountryByIso2(shippingAddress.country_iso2);
			postcodeInputField.value = shippingAddress.post_code;
		}
		savedInfo.name && nameInputField && (nameInputField.value = savedInfo.name);
		savedInfo.email && emailInputField && (emailInputField.value = savedInfo.email);
		savedInfo.phone && telInputField && (telInputField.value = savedInfo.phone);
	}
	const { validate } = handleInputFieldsOnChange([
		address1InputField,
		address2InputField,
		cityInputField,
		stateInputField,
		countryInputField,
		postcodeInputField,
		nameInputField,
		emailInputField,
		telInputField
	].filter(Boolean), (valid) => {
		setDisabled(!valid);
	});
	validate();
	let focusField;
	if (focus) focusField = {
		name: nameInputField,
		email: emailInputField,
		phone: telInputField
	}[focus];
	else focusField = address1InputField;
	createPopup(() => createComponent(PopupElement, {
		"class": "popup-payment popup-payment-shipping",
		closable: true,
		show: true,
		initialFocus: () => focusField?.input,
		get children() {
			return [
				createComponent(PopupElement.Header, { get children() {
					return [createComponent(PopupElement.CloseButton, {}), createComponent(PopupElement.Title, { title: "PaymentShippingInfo" })];
				} }),
				createComponent(PopupElement.Scrollable, { get children() {
					return createComponent(PopupElement.Body, { get children() {
						return [memo(() => addressFields && createComponent(Section, {
							name: "PaymentShippingAddress",
							get children() {
								var _el$ = _tmpl$$30();
								insert(_el$, addressFields, null);
								insert(_el$, !receiverFields && createComponent(SaveRow, {}), null);
								return _el$;
							}
						})), memo(() => receiverFields && createComponent(Section, {
							name: "PaymentShippingReceiver",
							get children() {
								var _el$2 = _tmpl$$30();
								insert(_el$2, receiverFields, null);
								insert(_el$2, createComponent(SaveRow, {}), null);
								return _el$2;
							}
						}))];
					} });
				} }),
				createComponent(PopupElement.Footer, { get children() {
					return createComponent(PopupElement.FooterButton, {
						confirm: true,
						preloader: true,
						pendingLangKey: "PleaseWait",
						get disabled() {
							return disabled();
						},
						langKey: "PaymentInfo.Done",
						callback: onDone
					});
				} })
			];
		}
	}));
}
//#endregion
//#region src/components/popups/paymentShippingMethods.tsx
function showPaymentShippingMethodsPopup(options) {
	const { paymentForm, requestedInfo, shippingOption } = options;
	const selectedShippingId = shippingOption?.id || requestedInfo.shipping_options[0].id;
	const values = requestedInfo.shipping_options.map((option) => ({
		checked: option.id === selectedShippingId,
		text: option.title,
		value: option.id,
		subtitle: paymentsWrapCurrencyAmount(accumulate(option.prices.map(({ amount }) => +amount), 0), paymentForm.invoice.currency)
	}));
	let lastShippingId = selectedShippingId;
	createPopup(() => createComponent(PopupElement, {
		"class": "popup-payment popup-payment-shipping-methods",
		closable: true,
		show: true,
		get children() {
			return [
				createComponent(PopupElement.Header, { get children() {
					return [createComponent(PopupElement.CloseButton, {}), createComponent(PopupElement.Title, { title: "PaymentShippingMethod" })];
				} }),
				createComponent(PopupElement.Scrollable, { get children() {
					return createComponent(PopupElement.Body, { get children() {
						return createComponent(Section, {
							name: "PaymentCheckoutShippingMethod",
							get children() {
								return createComponent(RadioFormTsx, {
									name: "shipping-method",
									values,
									onChange: (value) => lastShippingId = value
								});
							}
						});
					} });
				} }),
				createComponent(PopupElement.Footer, { get children() {
					return createComponent(PopupElement.FooterButton, {
						confirm: true,
						langKey: "PaymentInfo.Done",
						callback: () => {
							options.onFinish?.(requestedInfo.shipping_options.find((option) => option.id === lastShippingId));
						}
					});
				} })
			];
		}
	}));
}
//#endregion
//#region src/components/popups/paymentErrorLangKey.ts
var PAYMENT_ERRORS = {
	PAYMENT_FAILED: "PaymentFailed",
	REQUESTED_INFO_INVALID: "PaymentFailed",
	SHIPPING_OPTION_INVALID: "PaymentFailed",
	PAYMENT_CREDENTIALS_INVALID: "PaymentFailed",
	PAYMENT_CREDENTIALS_ID_INVALID: "PaymentFailed",
	BOT_PRECHECKOUT_FAILED: "PaymentPrecheckoutFailed"
};
/** The toast for a payment the server refused: a card one or a Stars one; any other refusal is a generic error. */
function paymentErrorLangKey(type) {
	return PAYMENT_ERRORS[type] || "Error.AnError";
}
//#endregion
//#region src/helpers/maybe2x.ts
function maybe2x(str) {
	return str + (window.devicePixelRatio > 1 ? "@2x" : "");
}
//#endregion
//#region src/helpers/dom/createImageSource.ts
/** A new image element with `url` loaded into it */
async function createImageSource(url) {
	const img = new Image();
	await renderImageFromUrlPromise(img, url);
	return img;
}
//#endregion
//#region src/components/popups/starsHero.tsx
var _tmpl$$29 = /*#__PURE__*/ template(`<div class="popup-stars-image popup-stars-hero">`);
/** The picture of a Stars popup's header: the particles on their own, loaded before the popup opens. */
async function createStarsParticles() {
	const img = await createImageSource(`assets/img/${maybe2x("stars_pay")}.png`);
	img.alt = "";
	img.classList.add("popup-stars-image");
	return img;
}
/**
* The gold 3D star in the place of the picture it stands for (194 wide), 120 px with 12 px of room above and
* below: the star brings its own particle field (the poster has none).
*/
function StarsHero() {
	return (() => {
		var _el$ = _tmpl$$29();
		insert(_el$, createComponent(Star3D, {
			kind: "stars",
			size: 120
		}));
		return _el$;
	})();
}
//#endregion
//#region src/helpers/solid/createLoadableList.ts
var createLoadableList = (props = {}) => {
	return createSignal({
		rendered: [],
		values: [],
		left: 0,
		count: 0,
		...props
	}, { equals: false });
};
//#endregion
//#region src/components/sidebarRight/tabs/statistics.tsx
var _tmpl$$28 = /*#__PURE__*/ template(`<span dir=ltr>`);
var _tmpl$2$17 = /*#__PURE__*/ template(`<span class=statistics-overview-item-value-description>`);
var _tmpl$3$12 = /*#__PURE__*/ template(`<div class=statistics-overview-item><div class=statistics-overview-item-value></div><div class=statistics-overview-item-name>`);
var _tmpl$4$11 = /*#__PURE__*/ template(`<div class=statistics-overview>`);
var _tmpl$5$8 = /*#__PURE__*/ template(`<div class=statistics-chart>`);
var _tmpl$6$6 = /*#__PURE__*/ template(`<div>`);
var CHANNEL_GRAPHS_TITLES = {
	growth_graph: "GrowthChartTitle",
	followers_graph: "FollowersChartTitle",
	mute_graph: "Notifications",
	top_hours_graph: "TopHoursChartTitle",
	views_by_source_graph: "ViewsBySourceChartTitle",
	new_followers_by_source_graph: "NewFollowersBySourceChartTitle",
	languages_graph: "LanguagesChartTitle",
	interactions_graph: "InteractionsChartTitle",
	iv_interactions_graph: "IVInteractionsChartTitle",
	reactions_by_emotion_graph: "ReactionsByEmotionChartTitle",
	story_interactions_graph: "StoryInteractionsChartTitle",
	story_reactions_by_emotion_graph: "StoryReactionsByEmotionChartTitle"
};
var GROUP_GRAPH_TITLES = {
	growth_graph: "GrowthChartTitle",
	members_graph: "GroupMembersChartTitle",
	new_members_by_source_graph: "NewMembersBySourceChartTitle",
	languages_graph: "MembersLanguageChartTitle",
	messages_graph: "MessagesChartTitle",
	actions_graph: "ActionsChartTitle",
	top_hours_graph: "TopHoursChartTitle",
	weekdays_graph: "TopDaysOfWeekChartTitle"
};
var MESSAGE_GRAPH_TITLES = {
	views_graph: "ViewsAndSharesChartTitle",
	reactions_by_emotion_graph: "ReactionsByEmotionChartTitle",
	votes_graph: "PollStats.Votes"
};
var STORY_GRAPH_TITLES = {
	views_graph: "ViewsAndSharesChartTitle",
	reactions_by_emotion_graph: "ReactionsByEmotionChartTitle"
};
var POLL_GRAPH_TITLES = { votes_graph: "PollStats.Votes" };
var getStatisticsErrorText = (error) => {
	if (typeof error === "string") return error;
	if (!error || typeof error !== "object") return;
	const apiErrorType = error.type;
	if (apiErrorType) return apiErrorType;
	const message = error.message;
	if (typeof message === "string") return message;
};
var CHANNEL_OVERVIEW_ITEMS = {
	followers: "FollowersChartTitle",
	enabled_notifications: "EnabledNotifications",
	views_per_post: "ViewsPerPost",
	views_per_story: "ViewsPerStory",
	shares_per_post: "SharesPerPost",
	shares_per_story: "SharesPerStory",
	reactions_per_post: "ReactionsPerPost",
	reactions_per_story: "ReactionsPerStory"
};
var GROUP_OVERVIEW_ITEMS = {
	members: "MembersOverviewTitle",
	messages: "MessagesOverview",
	viewers: "ViewingMembers",
	posters: "PostingMembers"
};
var MESSAGE_OVERVIEW_ITEMS = {
	views: "StatisticViews",
	public_shares: "PublicShares",
	reactions: "Reactions",
	private_shares: "PrivateShares"
};
var STORY_OVERVIEW_ITEMS = MESSAGE_OVERVIEW_ITEMS;
var TChartPromise;
var _TChart;
function ensureTChart() {
	return TChartPromise ?? (TChartPromise = __vitePreload(() => import("./chart-W_MlZWtU.js").then((module) => {
		_TChart = module.default;
	}), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23])));
}
function extractColor(color) {
	return color.substring(color.indexOf("#"));
}
var makeAbsStats = (value, approximate) => {
	return {
		_: "statsAbsValueAndPrev",
		current: value,
		previous: 0,
		approximate
	};
};
var MoreButton = (props) => {
	return createComponent(Button, {
		get text() {
			return props.key || "PollResults.LoadMore";
		},
		get textArgs() {
			return [props.count];
		},
		onClick: (e) => props.callback(e),
		"class": "btn btn-primary btn-transparent primary",
		icon: "down"
	});
};
var StatisticsOverviewItem = ({ value, title, includeZeroValue, describePercentage }) => {
	const isPercentage = value._ === "statsPercentValue";
	let v;
	if (isPercentage) {
		v = `${(value.part / value.total * 100).toFixed(2)}%`;
		if (describePercentage) v = [
			(() => {
				var _el$ = _tmpl$$28();
				insert(_el$, () => `≈${value.part}`);
				return _el$;
			})(),
			" ",
			(() => {
				var _el$2 = _tmpl$2$17();
				insert(_el$2, v);
				return _el$2;
			})()
		];
	} else {
		v = formatNumber(value.current, 1);
		if (value.approximate) v = (() => {
			var _el$3 = _tmpl$$28();
			insert(_el$3, "≈" + v);
			return _el$3;
		})();
		if (!value.current && !value.previous && !includeZeroValue) return;
		if (value.current !== value.previous && value.previous) {
			const diff = value.current - value.previous;
			const str = `${`${diff > 0 ? "+" : "-"}${formatNumber(Math.abs(diff), 1)}`} (${+(Math.abs(1 - value.current / value.previous) * 100).toFixed(2)}%)`;
			v = [
				v,
				" ",
				(() => {
					var _el$4 = _tmpl$$28();
					insert(_el$4, str);
					createRenderEffect(() => className$3(_el$4, classNames("statistics-overview-item-value-description", diff > 0 ? "green" : "red")));
					return _el$4;
				})()
			];
		}
	}
	return (() => {
		var _el$5 = _tmpl$3$12(), _el$6 = _el$5.firstChild, _el$7 = _el$6.nextSibling;
		insert(_el$6, v);
		insert(_el$7, () => i18n(title));
		return _el$5;
	})();
};
var StatisticsOverviewItems = (props) => {
	return (() => {
		var _el$8 = _tmpl$4$11();
		insert(_el$8, createComponent(For, {
			get each() {
				return props.items;
			},
			children: StatisticsOverviewItem
		}));
		return _el$8;
	})();
};
var AppStatisticsTab = class AppStatisticsTab extends SliderSuperTabEventable {
	constructor(..._args) {
		super(..._args);
		this.renderPeer = async (peer) => {
			const peerId = peer._ === "message" ? peer.peerId : peer.user_id.toPeerId(false);
			const loadPromises = [];
			const { dom } = hotReloadGuard.appDialogsManager.addDialogNew({
				peerId,
				container: false,
				rippleEnabled: true,
				avatarSize: "abitbigger",
				loadPromises,
				wrapOptions: { middleware: this.middlewareHelper.get() },
				meAsSaved: false
			});
			let toJoin;
			if (peer._ === "message") {
				toJoin = [await getChatMembersString(peerId.toChatId()), i18n("Views", [formatNumber(peer.views, 1)])];
				dom.listEl.dataset.mid = "" + peer.mid;
			} else if (peer._ === "statsGroupTopPoster") toJoin = [peer.messages && i18n("messages", [peer.messages]), peer.avg_chars && i18n("CharactersPerMessage", [i18n("Characters", [peer.avg_chars])])];
			else if (peer._ === "statsGroupTopAdmin") toJoin = [
				peer.deleted && i18n("Deletions", [peer.deleted]),
				peer.banned && i18n("Bans", [peer.banned]),
				peer.kicked && i18n("Restrictions", [peer.kicked])
			];
			else toJoin = [peer.invitations && i18n("Invitations", [peer.invitations])];
			toJoin = toJoin.filter(Boolean);
			if (toJoin.length) dom.lastMessageSpan.replaceChildren(...join(toJoin, false));
			await Promise.all(loadPromises);
			return {
				container: dom.listEl,
				peerId
			};
		};
		this.renderPublicForward = async (publicForward) => {
			if (publicForward._ === "publicForwardMessage") {
				const message = publicForward.message;
				return this.renderRecentPost({
					_: "postInteractionCountersMessage",
					forwards: message.forwards,
					msg_id: message.mid,
					views: message.views,
					reactions: message.reactions ? message.reactions.results.reduce((acc, v) => acc + v.count, 0) : 0
				}, message.peerId, message);
			}
			const storyItem = publicForward.story;
			if (!storyItem) return;
			const storyViews = storyItem.views;
			return this.renderRecentPost({
				_: "postInteractionCountersStory",
				forwards: storyViews?.forwards_count || 0,
				story_id: storyItem.id,
				views: storyViews?.views_count || 0,
				reactions: storyViews?.reactions_count || 0
			}, getPeerId(publicForward.peer), void 0, storyItem);
		};
	}
	onOpenAfterTimeout() {
		this.openPromise.resolve();
	}
	_construct(recentPosts, topPosters, topAdmins, topInviters, publicForwards, currentPost) {
		const dateElement = new langPack_default.IntlDateElement({ options: {} });
		const getLabelDate = (value, options = {}) => {
			options.displayYear ?? (options.displayYear = true);
			options.isMonthShort ?? (options.isMonthShort = true);
			const date = new Date(value);
			dateElement.update({
				date,
				options: {
					weekday: options.displayWeekDay ? options.isShort ? "short" : "long" : void 0,
					year: options.displayYear ? "numeric" : void 0,
					hour: options.displayHours ? "2-digit" : void 0,
					minute: options.displayHours ? "2-digit" : void 0,
					month: options.isMonthShort ? "short" : "long",
					day: "numeric"
				}
			});
			return dateElement.element.textContent;
		};
		const getLabelTime = (value) => {
			const date = new Date(value);
			dateElement.update({
				date,
				options: {
					hour: "2-digit",
					minute: "2-digit"
				}
			});
			return dateElement.element.textContent;
		};
		const makeColors = () => {
			const surface = customProperties.getProperty("surface-color");
			const primary = customProperties.getProperty("primary-color");
			const secondary = customProperties.getProperty("secondary-color");
			const surfaceRgb = hexToRgb(surface);
			const miniMask = mixColors(hexToRgb(secondary), mixColors(hexToRgb(primary), surfaceRgb, .1), .2);
			const miniFrame = mixColors(hexToRgb(secondary), mixColors(hexToRgb(primary), surfaceRgb, .3), .4);
			return {
				primary: customProperties.getProperty("primary-color"),
				secondary: customProperties.getProperty("secondary-color"),
				background: surface,
				backgroundRgb: surfaceRgb,
				text: customProperties.getProperty("primary-text-color"),
				dates: customProperties.getProperty("secondary-text-color"),
				grid: `rgba(${hexToRgb(customProperties.getProperty("secondary-text-color")).join(", ")}, 0.2)`,
				axis: {
					x: customProperties.getProperty("secondary-text-color"),
					y: customProperties.getProperty("secondary-text-color")
				},
				barsSelectionBackground: `rgba(${surfaceRgb.join(", ")}, 0.5)`,
				miniMask: `rgba(${miniMask.join(", ")}, 0.6)`,
				miniFrame: `rgb(${miniFrame.join(", ")})`
			};
		};
		let colors = makeColors();
		this.listenerSetter.add(rootScope)("theme_changed", () => {
			colors = makeColors();
		});
		const titles = this.isPoll ? POLL_GRAPH_TITLES : this.isBroadcast ? CHANNEL_GRAPHS_TITLES : this.isMegagroup ? GROUP_GRAPH_TITLES : this.isStory ? STORY_GRAPH_TITLES : MESSAGE_GRAPH_TITLES;
		const graphs = Object.keys(titles).map((key) => {
			const statsGraph = this.stats[key];
			return statsGraph && {
				statsGraph,
				title: titles[key],
				percentage: key === "languages_graph",
				dcId: this.graphDcIds.get(key) ?? this.dcId
			};
		}).filter(Boolean);
		const renderGraph = ({ statsGraph, title, percentage, dcId }) => {
			onMount(() => {
				let data = JSON.parse(statsGraph.json.data);
				const prepareData = (data, percentage) => {
					for (const i in data.colors) {
						const color = data.colors[i];
						data.colors[i] = extractColor(color);
					}
					if (percentage) {
						for (const i in data.types) if (data.types[i] === "bar") data.types[i] = "area";
					}
					return data;
				};
				data = prepareData(data, percentage);
				const addOptions = {
					getLabelDate,
					getLabelTime,
					tooltipOnHover: true
				};
				const zoomToken = statsGraph.zoom_token;
				const tChart = _TChart.render({
					container,
					data: {
						...data,
						...addOptions,
						x_on_zoom: zoomToken ? async (x) => {
							const statsGraph = await this.managers.appStatisticsManager.loadAsyncGraph(zoomToken, x, dcId);
							if (statsGraph._ === "statsGraphError") return;
							return {
								...prepareData(JSON.parse(statsGraph.json.data), percentage),
								...addOptions
							};
						} : void 0
					},
					settings: {
						darkMode: themeController.isNight(),
						ALL_LABEL: langPack_default.format("Chart.Tooltip.All", true),
						DATES_SIDE: "left",
						DATES_WEIGHT: "normal",
						DATES_FONT_SIZE: 14,
						ZOOM_TEXT: langPack_default.format("ZoomOut", true),
						FONT: {
							family: FontFamily,
							bold: "500",
							normal: "400"
						},
						COLORS: colors
					}
				});
				const setStyles = () => {
					[
						["primary-color", colors.primary],
						["background-color", colors.background],
						["background-color-rgb", colors.backgroundRgb.join(", ")],
						["text-color", colors.text],
						["secondary-color", colors.secondary],
						["font-family", FontFamily]
					].forEach(([property, value]) => {
						tChart.$wrapper.style.setProperty(`--tchart-${property}`, value);
					});
				};
				setStyles();
				this.listenerSetter.add(rootScope)("theme_changed", () => {
					tChart.setDarkMode(themeController.isNight(), { ...colors });
					setStyles();
				});
			});
			const titleElement = document.createElement("div");
			const captionElement = document.createElement("div");
			titleElement.classList.add("statistics-title");
			const t = i18n(title);
			t.classList.add("statistics-title-text");
			titleElement.append(t);
			let container;
			return createComponent(Section, {
				name: titleElement,
				nameRight: captionElement,
				get children() {
					var _el$9 = _tmpl$5$8();
					var _ref$ = container;
					typeof _ref$ === "function" ? use(_ref$, _el$9) : container = _el$9;
					return _el$9;
				}
			});
		};
		const overviewTitles = this.isPoll ? void 0 : this.stats._ === "stats.broadcastStats" ? CHANNEL_OVERVIEW_ITEMS : this.isMegagroup ? GROUP_OVERVIEW_ITEMS : this.isStory ? STORY_OVERVIEW_ITEMS : MESSAGE_OVERVIEW_ITEMS;
		const overviewItems = Object.keys(overviewTitles || {}).map((key) => {
			const value = this.stats[key];
			return value && {
				value,
				title: overviewTitles[key]
			};
		}).filter(Boolean);
		const formatDateRange = (min, max) => {
			return joinElementsWith([min, max].map((timestamp) => {
				return new langPack_default.IntlDateElement({
					date: /* @__PURE__ */ new Date(timestamp * 1e3),
					options: {
						month: "short",
						day: "numeric",
						year: "numeric"
					}
				}).element;
			}), " — ");
		};
		const period = this.stats.period;
		const topPeersTitles = [
			"TopMembers",
			"TopAdmins",
			"TopInviters"
		];
		let postsContainer;
		const ret = [
			currentPost && createComponent(Section, { get children() {
				return currentPost.container;
			} }),
			memo(() => memo(() => !!!!overviewItems.length)() && createComponent(Section, {
				name: "StatisticOverview",
				get nameRight() {
					return period && formatDateRange(period.min_date, period.max_date);
				},
				get children() {
					return createComponent(StatisticsOverviewItems, { items: overviewItems });
				}
			})),
			createComponent(For, {
				each: graphs,
				children: renderGraph
			}),
			memo(() => memo(() => !!!!recentPosts.length)() && createComponent(Section, {
				ref(r$) {
					var _ref$2 = postsContainer;
					typeof _ref$2 === "function" ? _ref$2(r$) : postsContainer = r$;
				},
				name: "RecentPosts",
				get children() {
					return recentPosts.map(({ container }) => container);
				}
			})),
			createComponent(For, {
				each: [
					topPosters,
					topAdmins,
					topInviters
				],
				children: (topPeers, idx) => {
					if (!topPeers.length) return;
					topPeers = topPeers.slice();
					const chatlist = hotReloadGuard.appDialogsManager.createChatList();
					chatlist.append(...topPeers.splice(0, 10).map(({ container }) => container));
					const [moreButton, setMoreButton] = createSignal(!!topPeers.length && MoreButton({
						count: topPeers.length,
						callback: () => {
							setMoreButton(void 0);
							chatlist.append(...topPeers.map(({ container }) => container));
						}
					}));
					return createComponent(Section, {
						get name() {
							return topPeersTitles[idx()];
						},
						get nameRight() {
							return period && formatDateRange(period.min_date, period.max_date);
						},
						get children() {
							return [chatlist, memo(() => moreButton())];
						}
					});
				}
			}),
			memo(() => memo(() => !!!!publicForwards().count)() && createComponent(Section, {
				name: "PublicSharesCount",
				get nameArgs() {
					return [publicForwards().count];
				},
				get children() {
					return [(() => {
						var _el$0 = _tmpl$6$6();
						use((el) => {
							hotReloadGuard.appDialogsManager.setListClickListener({
								list: el,
								onFound: (target) => {
									if (target.dataset.storyId) {
										hotReloadGuard.createStoriesViewerWithPeer({
											target: () => target.querySelector(".avatar"),
											peerId: target.dataset.peerId.toPeerId(),
											id: +target.dataset.storyId
										});
										return false;
									}
								},
								withContext: void 0,
								autonomous: void 0,
								openInner: true
							});
						}, _el$0);
						insert(_el$0, () => publicForwards().rendered);
						return _el$0;
					})(), createComponent(Show, {
						get when() {
							return !!publicForwards().loadMore;
						},
						get children() {
							return createComponent(MoreButton, {
								get count() {
									return publicForwards().count - publicForwards().rendered.length;
								},
								callback: () => publicForwards().loadMore()
							});
						}
					})];
				}
			}))
		];
		if (postsContainer) {
			const map = /* @__PURE__ */ new Map();
			recentPosts.forEach(({ container, postInteractionCounters }) => {
				map.set(container, postInteractionCounters);
			});
			const findTarget = (e) => findUpClassName(e.target, "statistics-post");
			let counters;
			const onOpenClick = () => {
				this.slider.createTab(AppStatisticsTab).open(this.chatId, counters.msg_id, counters.story_id);
			};
			attachClickEvent(postsContainer, (e) => {
				counters = map.get(findTarget(e));
				if (!counters) return;
				onOpenClick();
			}, { listenerSetter: this.listenerSetter });
			createContextMenu({
				buttons: [
					{
						icon: "statistics_filled",
						text: "ViewStatistics",
						onClick: onOpenClick
					},
					{
						icon: "message",
						text: "Message.Context.Goto",
						onClick: () => {
							hotReloadGuard.appImManager.setInnerPeer({
								peerId: this.chatId.toPeerId(true),
								lastMsgId: counters.msg_id
							});
						},
						verify: () => counters._ === "postInteractionCountersMessage"
					},
					{
						icon: "stories",
						text: "ViewStory",
						onClick: () => {
							hotReloadGuard.createStoriesViewerWithPeer({
								peerId: this.chatId.toPeerId(true),
								id: counters.story_id
							});
						},
						verify: () => counters._ === "postInteractionCountersStory"
					}
				],
				listenTo: postsContainer,
				listenerSetter: this.listenerSetter,
				findElement: (e) => {
					const target = findTarget(e);
					counters = map.get(target);
					return target;
				},
				middleware: this.middlewareHelper.get()
			});
		}
		return ret;
	}
	async renderRecentPost(postInteractionCounters, peerId = this.chatId.toPeerId(true), message, storyItem, noLabels) {
		const subtitleRightFragment = document.createDocumentFragment();
		const a = [["reactions", postInteractionCounters.reactions], ["reply", postInteractionCounters.forwards]];
		!noLabels && a.forEach(([icon, count]) => {
			if (!count) return;
			const i = Icon(icon, "statistics-post-counter-icon");
			if (icon === "reply") i.classList.add("icon-reflect");
			const e = document.createElement("span");
			e.classList.add("statistics-post-counter");
			e.append(i, formatNumber(count, 1));
			subtitleRightFragment.append(e);
		});
		const middleware = this.middlewareHelper.get();
		const mediaEl = document.createElement("div");
		mediaEl.classList.add("statistics-post-media");
		let titleElement;
		let subtitleElement;
		const container = wrapSolidComponent(() => createComponent(Row, {
			clickable: true,
			noWrap: true,
			as: message || storyItem ? "a" : void 0,
			"class": "statistics-post",
			get children() {
				return [
					createComponent(Row.Title, {
						ref(r$) {
							var _ref$3 = titleElement;
							typeof _ref$3 === "function" ? _ref$3(r$) : titleElement = r$;
						},
						"class": "statistics-post-title",
						get titleRight() {
							return noLabels ? void 0 : i18n("Views", [numberThousandSplitter(postInteractionCounters.views)]);
						}
					}),
					createComponent(Row.Subtitle, {
						ref(r$) {
							var _ref$4 = subtitleElement;
							typeof _ref$4 === "function" ? _ref$4(r$) : subtitleElement = r$;
						},
						subtitleRight: noLabels ? void 0 : subtitleRightFragment
					}),
					createComponent(Row.Media, {
						element: mediaEl,
						size: "abitbigger"
					})
				];
			}
		}), middleware);
		if (message || storyItem) {
			const { node, readyThumbPromise, setStoriesSegments } = avatarNew({
				middleware,
				size: 42,
				isDialog: true,
				peerId
			});
			container.dataset.peerId = "" + peerId;
			if (storyItem) {
				setStoriesSegments([{
					length: 1,
					type: "unread"
				}]);
				container.dataset.storyId = "" + storyItem.id;
			} else container.dataset.mid = "" + message.mid;
			mediaEl.append(node);
			await readyThumbPromise;
			titleElement.append(await wrapPeerTitle({ peerId }));
			subtitleElement.append(formatFullSentTime(message?.date || storyItem?.date));
		} else if (postInteractionCounters._ === "postInteractionCountersMessage") {
			container.classList.add("statistics-post-message");
			message || (message = this.messages.get(postInteractionCounters.msg_id));
			if (!await wrapReplyDivAndCaption({
				titleEl: subtitleElement,
				title: formatFullSentTime(message.date),
				subtitleEl: titleElement,
				message,
				mediaEl,
				middleware,
				withoutMediaType: true
			})) {
				const { node, readyThumbPromise } = avatarNew({
					middleware,
					peerId,
					size: 42
				});
				mediaEl.append(node);
				await readyThumbPromise;
			}
		} else {
			container.classList.add("statistics-post-story");
			storyItem || (storyItem = this.stories.get(postInteractionCounters.story_id));
			titleElement.append(i18n("Story"));
			subtitleElement.append(formatFullSentTime(storyItem.date));
			const border = document.createElement("div");
			border.classList.add("avatar-stories-simple", "is-unread");
			mediaEl.append(border);
			await createRoot((dispose) => {
				middleware.onDestroy(dispose);
				const { ready, div } = wrapStoryMedia({
					storyItem,
					peerId: this.chatId.toPeerId(true),
					forPreview: true,
					noInfo: true,
					withPreloader: false,
					noAspecter: true
				});
				const deferred = deferredPromise();
				createEffect(() => {
					if (ready()) {
						mediaEl.append(div);
						deferred.resolve();
					}
				});
				return deferred;
			});
		}
		return {
			container,
			postInteractionCounters
		};
	}
	async loadStats() {
		const managers = bindManagersToSession(this.managers);
		const peerId = this.peerId;
		const manager = managers.appStatisticsManager;
		const loadLimit = 100;
		const func = this.isPoll ? manager.getPollStats : this.isBroadcast ? manager.getBroadcastStats : this.isMegagroup ? manager.getMegagroupStats : this.isStory ? manager.getStoryStats : manager.getMessageStats;
		const postPromise = this.isMessage ? managers.appMessagesManager.reloadMessage(peerId, this.mid) : void 0;
		const postPublicForwardsPromise = this.isMessage ? manager.getMessagePublicForwards({
			peerId,
			mid: this.mid,
			limit: loadLimit
		}) : void 0;
		const storyPromise = this.isStory ? managers.appStoriesManager.getStoryById(peerId, this.storyId) : void 0;
		const storyPublicForwardsPromise = this.isStory ? manager.getStoryPublicForwards({
			peerId,
			id: this.storyId,
			limit: loadLimit
		}) : void 0;
		const statsPromise = func({
			peerId,
			dark: themeController.isNight(),
			storyId: this.storyId,
			mid: this.mid
		});
		const loadPollStats = (message) => {
			if (message?._ !== "message" || message.media?._ !== "messageMediaPoll" || !message.media.results.pFlags.can_view_stats) return;
			return manager.getPollStats({
				peerId,
				mid: this.mid,
				dark: themeController.isNight()
			});
		};
		const pollStatsPromise = this.isMessage ? managers.appMessagesManager.getMessageByPeer(peerId, this.mid).then((message) => {
			return loadPollStats(message) || postPromise.then(loadPollStats);
		}).catch(() => void 0) : void 0;
		const [{ stats, dcId }, pollStatsResult] = await Promise.all([statsPromise, pollStatsPromise]);
		this.graphDcIds = /* @__PURE__ */ new Map();
		if (this.isMessage && pollStatsResult) {
			stats.votes_graph = pollStatsResult.stats.votes_graph;
			this.graphDcIds.set("votes_graph", pollStatsResult.dcId);
		}
		this.stats = stats;
		this.dcId = dcId;
		const promises = [];
		for (const key in stats) {
			const value = stats[key];
			if (value._ === "statsGraphAsync") {
				const isOptionalPollGraph = this.isMessage && key === "votes_graph";
				const promise = manager.loadAsyncGraph(value.token, void 0, this.graphDcIds.get(key) ?? dcId).then((statsGraph) => {
					if (statsGraph._ === "statsGraphError") {
						if (this.isPoll && statsGraph.error) throw new Error(statsGraph.error);
						delete stats[key];
						return;
					}
					stats[key] = statsGraph;
				}, (err) => {
					if (isOptionalPollGraph) {
						delete stats[key];
						return;
					}
					throw err;
				});
				promises.push(promise);
			} else if (value._ === "statsGraphError") {
				if (this.isPoll && value.error) throw new Error(value.error);
				delete stats[key];
			}
		}
		const recentPosts = stats.recent_posts_interactions || [];
		recentPosts.forEach((postInteractionCounters) => {
			let promise;
			if (postInteractionCounters._ === "postInteractionCountersMessage") promise = managers.appMessagesManager.reloadMessage(peerId, postInteractionCounters.msg_id).then((message) => {
				if (!message) {
					indexOfAndSplice(recentPosts, postInteractionCounters);
					return;
				}
				this.messages.set(message.mid, message);
			});
			else promise = managers.appStoriesManager.getStoryById(peerId, postInteractionCounters.story_id).then((storyItem) => {
				if (!storyItem) {
					indexOfAndSplice(recentPosts, postInteractionCounters);
					return;
				}
				this.stories.set(storyItem.id, storyItem);
			});
			promises.push(promise);
		});
		const renderedPublicForwards = Promise.all([
			postPromise,
			postPublicForwardsPromise,
			storyPromise,
			storyPublicForwardsPromise
		]).then(async ([message, messagePublicForwards, storyItem, storyPublicForwards]) => {
			const [f, setF] = createLoadableList();
			if (!message && !storyItem) return f;
			assumeType(stats);
			if (message) {
				assumeType(message);
				this.messages.set(message.mid, message);
				const totalPublicForwards = messagePublicForwards.count;
				stats.views = makeAbsStats(message.views);
				stats.reactions = makeAbsStats(message.reactions ? message.reactions.results.reduce((acc, v) => acc + v.count, 0) : 0);
				stats.public_shares = makeAbsStats(totalPublicForwards);
				stats.private_shares = makeAbsStats(message.forwards - totalPublicForwards, true);
				setF((value) => (value.count = totalPublicForwards, value));
				let offset;
				const r = async (statsPublicForwards) => {
					offset = statsPublicForwards.next_offset;
					const promises = statsPublicForwards.forwards.map(this.renderPublicForward);
					const rendered = await Promise.all(promises);
					setF((value) => {
						value.rendered.push(...rendered.map(({ container }) => container));
						value.loadMore = offset ? () => {
							return manager.getMessagePublicForwards({
								peerId,
								mid: this.mid,
								limit: loadLimit,
								offset
							}).then(r);
						} : void 0;
						return value;
					});
				};
				await r(messagePublicForwards);
			} else {
				const totalPublicForwards = storyPublicForwards.count;
				const storyViews = storyItem.views;
				stats.views = makeAbsStats(storyViews.views_count);
				stats.reactions = makeAbsStats(storyViews.reactions_count || 0);
				stats.public_shares = makeAbsStats(totalPublicForwards);
				stats.private_shares = makeAbsStats(Math.abs((storyViews.forwards_count || 0) - totalPublicForwards), true);
				setF((value) => (value.count = totalPublicForwards, value));
				let offset;
				const r = async (statsPublicForwards) => {
					offset = statsPublicForwards.next_offset;
					const promises = statsPublicForwards.forwards.map(this.renderPublicForward);
					const rendered = await Promise.all(promises);
					setF((value) => {
						value.rendered.push(...rendered.map(({ container }) => container));
						value.loadMore = offset ? () => {
							return manager.getStoryPublicForwards({
								peerId,
								id: storyItem.id,
								limit: loadLimit,
								offset
							}).then(r);
						} : void 0;
						return value;
					});
				};
				await r(storyPublicForwards);
			}
			return f;
		});
		promises.push(renderedPublicForwards);
		const topPosters = stats.top_posters || [];
		const topAdmins = stats.top_admins || [];
		const topInvites = stats.top_inviters || [];
		const renderedTopPosters = topPosters.map(this.renderPeer);
		const renderedTopAdmins = topAdmins.map(this.renderPeer);
		const renderedTopInviters = topInvites.map(this.renderPeer);
		return Promise.all(promises).then(() => {
			const recentPostsPromises = recentPosts.map((postInteractionCounters) => {
				return this.renderRecentPost(postInteractionCounters);
			});
			const currentPostPromise = this.isMessage ? this.renderRecentPost({
				_: "postInteractionCountersMessage",
				msg_id: this.mid,
				forwards: 0,
				reactions: 0,
				views: 0
			}, void 0, void 0, void 0, true) : void 0;
			const promises = [
				Promise.all(recentPostsPromises),
				Promise.all(renderedTopPosters),
				Promise.all(renderedTopAdmins),
				Promise.all(renderedTopInviters),
				renderedPublicForwards,
				currentPostPromise
			];
			return Promise.all(promises);
		});
	}
	async init(chatIdOrPeerId, mid, storyId, mode) {
		const managers = bindManagersToSession(this.managers);
		this.container.classList.add("statistics-container");
		this.isPoll = mode === "poll";
		this.chatId = this.isPoll ? chatIdOrPeerId.toChatId() : chatIdOrPeerId;
		this.peerId = this.isPoll ? chatIdOrPeerId : this.chatId.toPeerId(true);
		this.mid = mid;
		this.storyId = storyId;
		this.messages = /* @__PURE__ */ new Map();
		this.stories = /* @__PURE__ */ new Map();
		this.graphDcIds = /* @__PURE__ */ new Map();
		this.openPromise = deferredPromise();
		if (!this.isPoll && mid) this.isMessage = true;
		else if (!this.isPoll && storyId) this.isStory = true;
		else if (!this.isPoll) {
			this.isBroadcast = await managers.appChatsManager.isBroadcast(this.chatId);
			this.isMegagroup = await managers.appChatsManager.isMegagroup(this.chatId);
		}
		this.setTitle(this.isPoll ? "PollStats.Title" : this.isBroadcast ? "Statistics" : this.isMegagroup ? "GroupStats.Title" : this.isStory ? "StoryStatistics" : "PostStatistics");
		const promise = Promise.all([
			ensureTChart(),
			this.openPromise,
			this.loadStats()
		]);
		promise.catch(() => void 0);
		const [hide, setHide] = createSignal(false);
		const [placeholderState, setPlaceholderState] = createSignal("loading");
		const [statisticsError, setStatisticsError] = createSignal();
		const middleware = this.middlewareHelper.get();
		const element = await emptyPlaceholder$1({
			title: () => placeholderState() === "error" ? statisticsError() || i18n("Error.AnError") : i18n(placeholderState() === "empty" ? "PollStats.NoVotes" : "LoadingStats"),
			description: () => placeholderState() === "loading" ? i18n("LoadingStatsDescription") : void 0,
			assetName: "StatsEmoji",
			middleware,
			hide,
			isFullSize: true
		});
		if (!middleware() || !element) return;
		this.scrollable.append(element);
		promise.then(async ([_, __, loaded]) => {
			if (!middleware()) return;
			if (this.isPoll && this.stats.votes_graph?._ !== "statsGraph") {
				setPlaceholderState("empty");
				return;
			}
			const div = document.createElement("div");
			if (!middleware()) return;
			this.scrollable.append(div);
			const dispose = render(() => this._construct(...loaded), div);
			this.eventListener.addEventListener("destroy", dispose);
			if (liteMode.isAvailable("animations")) {
				const keyframes = [{ opacity: "1" }, { opacity: "0" }];
				const options = {
					duration: 200,
					fill: "forwards",
					easing: "ease-in-out"
				};
				const animations = [element.animate(keyframes, options), div.animate(keyframes.slice().reverse(), options)];
				await Promise.all(animations.map((animation) => animation.finished)).catch(() => void 0);
				if (!middleware()) return;
			}
			setHide(true);
		}, (error) => {
			if (middleware() && this.isPoll) {
				setStatisticsError(getStatisticsErrorText(error));
				setPlaceholderState("error");
			}
		});
	}
};
var stargiftBadge_module_default = {
	badge: "_badge_1mqgy_1",
	text: "_text_1mqgy_15"
};
//#endregion
//#region src/components/stargifts/stargiftBadge.tsx
var _tmpl$$27 = /*#__PURE__*/ template(`<div><div>`);
function StarGiftBadge(props) {
	return (() => {
		var _el$ = _tmpl$$27(), _el$2 = _el$.firstChild;
		insert(_el$2, () => props.children);
		createRenderEffect((_p$) => {
			var _v$ = classNames(stargiftBadge_module_default.badge, props.class), _v$2 = props.backdropAttr ? `linear-gradient(180deg, ${rgbIntToHex(props.backdropAttr.center_color)} 0%, ${rgbIntToHex(props.backdropAttr.edge_color)} 100%)` : void 0, _v$3 = classNames(stargiftBadge_module_default.text, props.textClass);
			_v$ !== _p$.e && className$3(_el$, _p$.e = _v$);
			_v$2 !== _p$.t && setStyleProperty(_el$, "background", _p$.t = _v$2);
			_v$3 !== _p$.a && className$3(_el$2, _p$.a = _v$3);
			return _p$;
		}, {
			e: void 0,
			t: void 0,
			a: void 0
		});
		return _el$;
	})();
}
var stargiftBackdrop_module_default = {
	wrap: "_wrap_1lkn1_16",
	halo: "_halo_1lkn1_24",
	haloSmall: "_haloSmall_1lkn1_37",
	canvas: "_canvas_1lkn1_42"
};
//#endregion
//#region src/components/stargifts/stargiftBackdrop.tsx
var _tmpl$$26 = /*#__PURE__*/ template(`<div><div>`);
var MIN_OPACITY = .1;
var MID_OPACITY = .2;
var MAX_OPACITY = .3;
var CANVAS_WIDTH = 266;
var CANVAS_HEIGHT = 184;
var SMALL_CANVAS_WIDTH = 120;
var SMALL_CANVAS_HEIGHT = 120;
var POSITIONS = [
	[
		55,
		47,
		18,
		MAX_OPACITY
	],
	[
		23,
		26,
		18,
		MID_OPACITY
	],
	[
		0,
		64,
		18,
		MID_OPACITY
	],
	[
		0,
		165,
		18,
		MIN_OPACITY
	],
	[
		17,
		125,
		18,
		MID_OPACITY
	],
	[
		58,
		141,
		22,
		MAX_OPACITY
	],
	[
		81,
		13,
		24,
		MAX_OPACITY
	],
	[
		38,
		82,
		26,
		MAX_OPACITY
	],
	[
		187,
		46,
		18,
		MAX_OPACITY
	],
	[
		219,
		26,
		18,
		MID_OPACITY
	],
	[
		119,
		5,
		18,
		MAX_OPACITY
	],
	[
		242,
		64,
		18,
		MID_OPACITY
	],
	[
		245,
		165,
		18,
		MIN_OPACITY
	],
	[
		225,
		125,
		18,
		MID_OPACITY
	],
	[
		118,
		151,
		22,
		MAX_OPACITY
	],
	[
		180,
		141,
		22,
		MAX_OPACITY
	],
	[
		155,
		13,
		24,
		MAX_OPACITY
	],
	[
		196,
		82,
		26,
		MAX_OPACITY
	]
];
var POSITIONS_SMALL = [
	[
		49,
		1,
		20,
		MAX_OPACITY
	],
	[
		93,
		12,
		20,
		MAX_OPACITY
	],
	[
		99,
		42,
		20,
		MAX_OPACITY
	],
	[
		89,
		86,
		20,
		MAX_OPACITY
	],
	[
		49,
		97,
		20,
		MAX_OPACITY
	],
	[
		9,
		86,
		20,
		MAX_OPACITY
	],
	[
		0,
		42,
		20,
		MAX_OPACITY
	],
	[
		5,
		12,
		20,
		MAX_OPACITY
	]
];
function StarGiftBackdrop(props) {
	const middlewareHelper = getMiddleware();
	const [patternCanvas, setPatternCanvas] = createSignal();
	function render() {
		const middleware = middlewareHelper.get();
		const currentEmoji = props.patternEmoji;
		wrapEmojiPattern({
			docId: props.patternEmoji,
			middleware,
			canvasWidth: props.small ? SMALL_CANVAS_WIDTH : CANVAS_WIDTH,
			canvasHeight: props.small ? SMALL_CANVAS_HEIGHT : CANVAS_HEIGHT,
			emojiSize: 24,
			positions: props.small ? POSITIONS_SMALL : POSITIONS,
			color: rgbIntToHex(props.backdrop.pattern_color)
		}).then((canvas) => {
			if (!middleware()) return;
			if (currentEmoji !== props.patternEmoji) return;
			canvas.classList.add(stargiftBackdrop_module_default.canvas, props.canvasClass);
			setPatternCanvas(canvas);
		});
	}
	createEffect(on(() => [props.patternEmoji, props.backdrop], () => {
		render();
	}));
	return (() => {
		var _el$ = _tmpl$$26(), _el$2 = _el$.firstChild;
		insert(_el$, createComponent(Transition, { get children() {
			return patternCanvas();
		} }), _el$2);
		createRenderEffect((_p$) => {
			var _v$ = classNames(stargiftBackdrop_module_default.wrap, props.class), _v$2 = rgbIntToHex(props.backdrop.edge_color), _v$3 = rgbIntToHex(props.backdrop.center_color), _v$4 = classNames(stargiftBackdrop_module_default.halo, props.small && stargiftBackdrop_module_default.haloSmall);
			_v$ !== _p$.e && className$3(_el$, _p$.e = _v$);
			_v$2 !== _p$.t && setStyleProperty(_el$, "--stargift-backdrop-edge-color", _p$.t = _v$2);
			_v$3 !== _p$.a && setStyleProperty(_el$, "--stargift-backdrop-center-color", _p$.a = _v$3);
			_v$4 !== _p$.o && className$3(_el$2, _p$.o = _v$4);
			return _p$;
		}, {
			e: void 0,
			t: void 0,
			a: void 0,
			o: void 0
		});
		return _el$;
	})();
}
var transferStarGift_module_default = {
	popup: "_popup_1fro1_1",
	popupContainer: "_popupContainer_1fro1_6",
	graph: "_graph_1fro1_11",
	starsBalance: "_starsBalance_1fro1_15",
	table: "_table_1fro1_21",
	buttons: "_buttons_1fro1_26"
};
var starGiftPreview_module_default = { wrap: "_wrap_beq2m_1" };
//#endregion
//#region src/components/stargifts/starGiftPreview.tsx
var _tmpl$$25 = /*#__PURE__*/ template(`<div>`);
/** A collectible gift's model on its backdrop and pattern. The size comes with `class`. */
function StarGiftPreview(props) {
	return (() => {
		var _el$ = _tmpl$$25();
		insert(_el$, createComponent(StarGiftBackdrop, {
			get backdrop() {
				return props.gift.collectibleAttributes?.backdrop;
			},
			get patternEmoji() {
				return props.gift.collectibleAttributes?.pattern.document;
			},
			small: true,
			get canvasClass() {
				return props.canvasClass;
			}
		}), null);
		insert(_el$, createComponent(StickerTsx, {
			get sticker() {
				return props.gift.collectibleAttributes?.model.document;
			},
			get width() {
				return props.stickerSize;
			},
			get height() {
				return props.stickerSize;
			},
			autoStyle: true,
			get extraOptions() {
				return props.stickerOptions ?? { play: true };
			}
		}), null);
		createRenderEffect(() => className$3(_el$, classNames(starGiftPreview_module_default.wrap, props.class)));
		return _el$;
	})();
}
var transferPreview_module_default = {
	graph: "_graph_l3hve_1",
	giftWrap: "_giftWrap_l3hve_13",
	giftBackdropCanvas: "_giftBackdropCanvas_l3hve_18"
};
//#endregion
//#region src/components/stargifts/transferPreview.tsx
var _tmpl$$24 = /*#__PURE__*/ template(`<div>`);
function StarGiftTransferPreview(props) {
	return (() => {
		var _el$ = _tmpl$$24();
		insert(_el$, createComponent(StarGiftPreview, {
			get gift() {
				return props.gift;
			},
			"class": transferPreview_module_default.giftWrap,
			canvasClass: transferPreview_module_default.giftBackdropCanvas,
			stickerSize: 48,
			stickerOptions: {
				play: true,
				loop: true
			}
		}), null);
		insert(_el$, createComponent(IconTsx, { icon: "next" }), null);
		insert(_el$, createComponent(AvatarNewTsx, {
			get peerId() {
				return props.recipient;
			},
			size: 60
		}), null);
		createRenderEffect(() => className$3(_el$, classNames(transferPreview_module_default.graph, props.class)));
		return _el$;
	})();
}
var floatingStarsBalance_module_default = {
	container: "_container_x9sli_1",
	getMore: "_getMore_x9sli_23",
	tonUsd: "_tonUsd_x9sli_32"
};
//#endregion
//#region src/components/popups/floatingStarsBalance.tsx
var _tmpl$$23 = /*#__PURE__*/ template(`<div>`);
var _tmpl$2$16 = /*#__PURE__*/ template(`<b>`);
var _tmpl$3$11 = /*#__PURE__*/ template(`<div>~`);
var _tmpl$4$10 = /*#__PURE__*/ template(`<a>`);
function FloatingStarsBalance(props) {
	const balance = useStars();
	const balanceTon = useStars(true);
	const [appConfig] = createResource(() => rootScope.managers.apiManager.getAppConfig());
	const converted = () => {
		const rate = appConfig.latest?.ton_usd_rate;
		if (!rate) return "...";
		return paymentsWrapCurrencyAmount(nanotonToJsNumber(balanceTon()) * rate * 100, "USD");
	};
	return (() => {
		var _el$ = _tmpl$$23();
		insert(_el$, createComponent(I18nTsx, {
			key: "StarsBalanceLong",
			get args() {
				return memo(() => !!props.ton)() ? [createComponent(IconTsx, { icon: "gram_filled" }), (() => {
					var _el$2 = _tmpl$2$16();
					insert(_el$2, () => formatNanoton(balanceTon()));
					return _el$2;
				})()] : [createComponent(StarsStar, {}), (() => {
					var _el$3 = _tmpl$2$16();
					insert(_el$3, balance);
					return _el$3;
				})()];
			}
		}), null);
		insert(_el$, (() => {
			var _c$ = memo(() => !!props.ton);
			return () => _c$() ? (() => {
				var _el$4 = _tmpl$3$11();
				_el$4.firstChild;
				insert(_el$4, converted, null);
				createRenderEffect(() => className$3(_el$4, floatingStarsBalance_module_default.tonUsd));
				return _el$4;
			})() : (() => {
				var _el$6 = _tmpl$4$10();
				_el$6.$$click = () => hotReloadGuard.showStarsPopup();
				insert(_el$6, () => i18n("GetMoreStars"));
				createRenderEffect(() => className$3(_el$6, floatingStarsBalance_module_default.getMore));
				return _el$6;
			})();
		})(), null);
		createRenderEffect(() => className$3(_el$, classNames(floatingStarsBalance_module_default.container, props.class)));
		return _el$;
	})();
}
delegateEvents(["click"]);
//#endregion
//#region src/components/popups/transferStarGift.tsx
var import_BigInteger = /* @__PURE__ */ __toESM(require_BigInteger());
var _tmpl$$22 = /*#__PURE__*/ template(`<div>`);
function transferStarGiftConfirmationPopup(options) {
	const appConfig = useAppConfig();
	const [show, setShow] = createSignal(false);
	const isFreeTransfer = !options.fromOffer && Number(options.gift.saved?.transfer_stars ?? "0") === 0;
	let submitted = false;
	const tableContent = createMemo(() => {
		const { gift: { raw: gift, collectibleAttributes } } = options;
		if (gift._ !== "starGiftUnique") return [];
		const rows = [
			["StarGiftModel", createComponent(GiftAttributeValue, {
				get name() {
					return collectibleAttributes.model.name;
				},
				get rarity() {
					return collectibleAttributes.model.rarity;
				}
			})],
			["StarGiftBackdrop", createComponent(GiftAttributeValue, {
				get name() {
					return collectibleAttributes.backdrop.name;
				},
				get rarity() {
					return collectibleAttributes.backdrop.rarity;
				}
			})],
			["StarGiftPattern", createComponent(GiftAttributeValue, {
				get name() {
					return collectibleAttributes.pattern.name;
				},
				get rarity() {
					return collectibleAttributes.pattern.rarity;
				}
			})]
		];
		if (gift.value_amount) rows.push(["StarGiftValue", ["~", memo(() => paymentsWrapCurrencyAmount(gift.value_amount, gift.value_currency))]]);
		return rows;
	});
	const popupText = () => {
		if (options.fromOffer) {
			let amount;
			let amountAfterComission;
			if (options.fromOffer.price._ === "starsTonAmount") {
				amount = i18n("SuggestedPosts.TONAmount", [formatNanoton(options.fromOffer.price.amount, 2)]);
				const commission = appConfig.ton_stargift_resale_commission_permille;
				const nanotonAfter = (0, import_BigInteger.default)(options.fromOffer.price.amount).multiply(commission).divide(1e3).toString();
				amountAfterComission = i18n("SuggestedPosts.TONAmount", [formatNanoton(nanotonAfter, 2)]);
			} else {
				amount = i18n("Stars", [numberThousandSplitterForStars(options.fromOffer.price.amount)]);
				const commission = appConfig.stars_stargift_resale_commission_permille;
				amountAfterComission = i18n("Stars", [numberThousandSplitterForStars(Math.floor(Number(options.fromOffer.price.amount) * (commission / 1e3)))]);
			}
			return createComponent(MediaHeader.Subtitle, { get children() {
				return createComponent(I18nTsx, {
					key: "StarGiftOffer.AcceptOfferText",
					get args() {
						return [
							getCollectibleName(options.gift.raw),
							createComponent(PeerTitleTsx, {
								get peerId() {
									return options.recipient;
								},
								onlyFirstName: true
							}),
							amount,
							amountAfterComission
						];
					}
				});
			} });
		}
		return createComponent(MediaHeader.Subtitle, { get children() {
			return createComponent(I18nTsx, {
				key: isFreeTransfer ? "StarGiftConfirmFreeTransferText" : "StarGiftConfirmTransferPopupText",
				get args() {
					return [
						getCollectibleName(options.gift.raw),
						createComponent(PeerTitleTsx, {
							get peerId() {
								return options.recipient;
							},
							onlyFirstName: true
						}),
						i18n("Stars", [numberThousandSplitterForStars(options.gift.saved.transfer_stars)])
					];
				}
			});
		} });
	};
	const submitButtonText = () => {
		if (options.fromOffer) {
			const ton = options.fromOffer.price._ === "starsTonAmount";
			return createComponent(I18nTsx, {
				key: "StarGiftOffer.AcceptOfferButton",
				get args() {
					return [paymentsWrapCurrencyAmount(options.fromOffer.price.amount, ton ? "TON" : "XTR")];
				}
			});
		}
		if (isFreeTransfer) return createComponent(I18nTsx, { key: "StarGiftTransferFull" });
		return createComponent(I18nTsx, {
			key: "StarGiftTransferFullFor",
			get args() {
				return [paymentsWrapCurrencyAmount(options.gift.saved.transfer_stars, "XTR")];
			}
		});
	};
	createPopup(() => {
		doubleRaf().then(() => setShow(true));
		return createComponent(PopupElement, {
			get ["class"]() {
				return transferStarGift_module_default.popup;
			},
			get containerClass() {
				return transferStarGift_module_default.popupContainer;
			},
			get containerProps() {
				return { "aria-label": langPack_default.format("StarGiftTransfer", true) };
			},
			get show() {
				return show();
			},
			onClose: () => {
				if (!submitted) options.handleCancel?.();
			},
			old: true,
			get children() {
				return [
					createComponent(FloatingStarsBalance, { get ["class"]() {
						return transferStarGift_module_default.starsBalance;
					} }),
					createComponent(PopupElement.Body, { get children() {
						return [
							createComponent(StarGiftTransferPreview, {
								get ["class"]() {
									return transferStarGift_module_default.graph;
								},
								get gift() {
									return options.gift;
								},
								get recipient() {
									return options.recipient;
								}
							}),
							memo(() => popupText()),
							(() => {
								var _el$ = _tmpl$$22();
								insert(_el$, createComponent(Table, { get content() {
									return tableContent();
								} }));
								createRenderEffect(() => className$3(_el$, transferStarGift_module_default.table));
								return _el$;
							})()
						];
					} }),
					createComponent(PopupElement.Buttons, {
						get ["class"]() {
							return transferStarGift_module_default.buttons;
						},
						get children() {
							return [createComponent(PopupElement.Button, {
								callback: () => {
									submitted = true;
									return options.handleSubmit();
								},
								get children() {
									return submitButtonText();
								}
							}), createComponent(PopupElement.Button, {
								cancel: true,
								callback: () => {
									submitted = true;
									options.handleCancel?.();
								},
								get children() {
									return createComponent(I18nTsx, { key: "Cancel" });
								}
							})];
						}
					})
				];
			}
		});
	});
}
function transferStarGift(gift, toPeerId) {
	const { saved, input } = gift;
	const raw = gift.raw;
	const now = tsNow(true);
	if (saved.can_transfer_at !== void 0 && saved.can_transfer_at > now) {
		toastNew({
			langPackKey: "StarGiftTransferCooldown",
			langPackArguments: [wrapFormattedDuration(formatDuration(saved.can_transfer_at - now, 2))]
		});
		return Promise.resolve(false);
	}
	const deferred = deferredPromise();
	let peerSelectorResolved = false;
	async function handleSelection(peerId) {
		if (peerSelectorResolved) return;
		peerSelectorResolved = true;
		if (peerId === "fragment") {
			try {
				await confirmationPopup({
					titleLangKey: "StarGiftFragmentTransferTitle",
					descriptionLangKey: "StarGiftFragmentTransferText",
					descriptionLangArgs: [getCollectibleName(raw)],
					button: { langKey: "StarGiftFragmentTransferConfirm" }
				});
				const url = await passwordPopup({
					titleLangKey: "PleaseEnterCurrentPassword",
					descriptionLangKey: "StarGiftFragmentTransferPassword",
					descriptionLangArgs: [getCollectibleName(raw)],
					button: { langKey: "Confirm" },
					callback: (password) => rootScope.managers.appGiftsManager.getGiftWithdrawalUrl(input, password)
				});
				safeWindowOpen(url.url);
				deferred.resolve(true);
			} catch (e) {
				deferred.resolve(false);
			}
			return;
		}
		transferStarGiftConfirmationPopup({
			gift,
			recipient: peerId,
			handleSubmit: async () => {
				const managers = bindManagersToSession(rootScope.managers);
				const inputPeer = await managers.appPeersManager.getInputPeerById(peerId);
				if (Number(saved?.transfer_stars ?? "0") === 0) {
					await managers.appGiftsManager.transferStarGift(gift.input, peerId, gift.ownerId);
					deferred.resolve(true);
				} else (await createPaymentPopup({
					inputInvoice: {
						_: "inputInvoiceStarGiftTransfer",
						stargift: gift.input,
						to_id: inputPeer
					},
					noShowIfStars: true
				})).addEventListener("finish", (result) => {
					if (result === "paid") {
						if (gift.ownerId !== void 0) rootScope.dispatchEvent("star_gift_list_update", { peerId: gift.ownerId });
						rootScope.dispatchEvent("star_gift_list_update", { peerId });
						deferred.resolve(true);
					} else deferred.resolve(false);
				});
			},
			handleCancel: () => deferred.resolve(false)
		});
	}
	if (toPeerId) {
		handleSelection(toPeerId);
		return deferred;
	}
	const isOwnedByChannel = gift.ownerId && gift.ownerId.isAnyChat();
	const popup = showPickUserPopup({
		placeholder: "StarGiftTransferTo",
		onSelect: ([{ peerId }]) => handleSelection(peerId),
		exceptSelf: !isOwnedByChannel,
		selfPresence: "StarGiftTransferToMyself",
		filterPeerTypeBy: ["isRegularUser", "isBroadcast"],
		titleLangKey: "StarGiftTransferTo",
		onClose: () => {
			if (!peerSelectorResolved) deferred.resolve(false);
		}
	});
	if (saved.can_export_at !== void 0 && saved.can_export_at < now) {
		const fragmentRow = wrapSolidComponent(() => createComponent(Row, {
			clickable: () => {
				handleSelection("fragment");
				popup.hide();
			},
			get children() {
				return [createComponent(Row.Icon, { icon: "ton" }), createComponent(Row.Title, { get children() {
					return i18n("StarGiftFragmentTransferItem");
				} })];
			}
		}), popup.middleware);
		popup.selector.list.before(fragmentRow);
	}
	return deferred;
}
var starGiftWear_module_default = {
	popup: "_popup_9ar9b_1",
	container: "_container_9ar9b_15",
	header: "_header_9ar9b_22",
	backdrop: "_backdrop_9ar9b_33",
	close: "_close_9ar9b_38",
	avatar: "_avatar_9ar9b_42",
	body: "_body_9ar9b_49"
};
//#endregion
//#region src/helpers/createBadge.ts
function createBadge(tag, size, color) {
	const badge = document.createElement(tag);
	badge.className = `badge badge-${size} badge-${color} is-badge-empty`;
	return badge;
}
//#endregion
//#region src/components/premium/premiumOptionsForm.tsx
var _tmpl$$21 = /*#__PURE__*/ template(`<form class=popup-gift-premium-options>`);
var _tmpl$2$15 = /*#__PURE__*/ template(`<span><span class=popup-gift-premium-discount>-<!>%`);
function PremiumOptionsForm(props) {
	const isGiftCode = props.periodOptions[0]._ === "premiumGiftCodeOption";
	const shortestOption = props.periodOptions.slice().sort((a, b) => a.months - b.months)[0];
	const wrapCurrency = (amount) => paymentsWrapCurrencyAmount(amount, shortestOption.currency, false, true, true);
	const keys = isGiftCode ? void 0 : {
		12: "PremiumTierAnnual",
		6: "PremiumTierSemiannual",
		1: "PremiumTierMonthly"
	};
	const initialIndex = Math.max(0, Math.min(props.checked ?? 0, props.periodOptions.length - 1));
	const [selectedIndex, setSelectedIndex] = createSignal(initialIndex);
	const users = () => props.users ?? 1;
	createEffect(() => props.onOption(props.periodOptions[selectedIndex()]));
	return (() => {
		var _el$ = _tmpl$$21();
		insert(_el$, createComponent(For, {
			get each() {
				return props.periodOptions;
			},
			children: (option, index) => {
				const amountPerUser = +option.amount / (isGiftCode ? option.users : 1);
				const title = () => props.titleForOption?.(option) ?? (keys ? i18n(keys[option.months] || "Months", [option.months]) : formatMonthsDuration(option.months, false));
				const subtitle = () => props.subtitleForOption?.(option) ?? (isGiftCode ? i18n("Multiplier", [wrapCurrency(amountPerUser), users()]) : option !== shortestOption ? i18n("PricePerMonth", [wrapCurrency(+option.amount / option.months)]) : void 0);
				const shortestAmount = +shortestOption.amount * option.months / shortestOption.months;
				const discount = Math.round((1 - +option.amount / shortestAmount) * 100);
				const withDiscount = (content) => option === shortestOption ? content : (() => {
					var _el$2 = _tmpl$2$15(), _el$3 = _el$2.firstChild, _el$6 = _el$3.firstChild.nextSibling;
					_el$6.nextSibling;
					insert(_el$3, discount, _el$6);
					insert(_el$2, content, null);
					return _el$2;
				})();
				return createComponent(Row, {
					"class": "popup-gift-premium-option",
					get style() {
						return { "--primary-color": [
							"#C564F3",
							"#AC64F3",
							"#9377FF"
						][index()] };
					},
					get children() {
						return [
							createComponent(Row.Title, { get children() {
								return memo(() => !!props.discountInTitle)() ? withDiscount(title()) : title();
							} }),
							createComponent(Show, {
								get when() {
									return subtitle();
								},
								children: (value) => createComponent(Row.Subtitle, { get children() {
									return memo(() => !!props.discountInTitle)() ? value() : withDiscount(value());
								} })
							}),
							createComponent(Row.RightContent, {
								"class": "row-title-right-secondary",
								get children() {
									return wrapCurrency(isGiftCode ? amountPerUser * users() : option.amount);
								}
							}),
							createComponent(Row.CheckboxField, { get children() {
								return createComponent(CheckboxFieldTsx, {
									asRadio: true,
									get checked() {
										return index() === selectedIndex();
									},
									get name() {
										return props.name ?? "premium-period";
									},
									round: true,
									onChange: (isChecked) => isChecked && setSelectedIndex(index())
								});
							} })
						];
					}
				});
			}
		}));
		return _el$;
	})();
}
//#endregion
//#region src/components/sidebarRight/tabs/boosts.tsx
var boosts_exports = /* @__PURE__ */ __exportAll({
	CPrepaidGiveaway: () => CPrepaidGiveaway,
	default: () => AppBoostsTab
});
var getColorByMonths = (months) => {
	return months === 12 ? "red" : months === 3 ? "green" : "blue";
};
var getBoostsDays = (from, to) => Math.round((to - from) / 86400);
var getBoostMonths = (from, to) => Math.round(getBoostsDays(from, to) / 30);
var CPrepaidGiveaway = (props) => {
	const { quantity } = props.giveaway;
	const stars = props.giveaway.stars;
	const months = props.giveaway.months;
	const boosts = stars ? props.giveaway.boosts : (props.appConfig.giveaway_boosts_per_premium || 1) * quantity;
	const avatar = AvatarNew({ size: 42 });
	if (stars) avatar.set({
		icon: "star",
		color: "stars"
	});
	else avatar.set({
		icon: "gift_premium_filled",
		color: getColorByMonths(months)
	});
	return createComponent(Row, {
		get clickable() {
			return props.clickable;
		},
		get children() {
			return [
				createComponent(Row.Title, {
					"class": "text-bold",
					get children() {
						return i18n(stars ? "Stars" : "BoostingGiveawayMsgInfoPlural1", [stars || quantity]);
					}
				}),
				createComponent(Row.Subtitle, { get children() {
					return i18n(stars ? "Giveaway.Prepaid.For" : "Giveaway.Prepaid.Subtitle", [quantity, i18n("Giveaway.Prepaid.Period", [months])]);
				} }),
				createComponent(Row.RightContent, { get children() {
					return createComponent(BoostsBadge, { boosts });
				} }),
				createComponent(Row.Media, {
					size: "abitbigger",
					get children() {
						return avatar.node;
					}
				})
			];
		}
	});
};
var AppBoostsTab = class extends SliderSuperTabEventable {
	constructor(..._args) {
		super(..._args);
		this.renderBoost = async (boost) => {
			const boosts = 1 * (boost.multiplier || 1);
			const months = getBoostMonths(boost.date, boost.expires);
			let peerId = boost.user_id?.toPeerId(false);
			if (peerId === rootScope.myId && boost.pFlags.unclaimed) peerId = void 0;
			let badge;
			if (boosts > 1) {
				badge = document.createElement("span");
				badge.classList.add("boosts-user-boosts", "boosts-user-badge");
				badge.append(Icon("boost_filled"), ` ${boosts}`);
			}
			let title;
			if (peerId) {
				title = await wrapPeerTitle({ peerId });
				title.classList.add("boosts-user-name");
			} else if (boost.stars) title = i18n("Stars", [boost.stars]);
			else title = i18n(boost.pFlags.unclaimed ? "BoostingUnclaimed" : "BoostingToBeDistributed");
			let subtitle;
			if (peerId || boost.stars) subtitle = i18n("BoostsExpiration", [boosts, formatFullSentTime(boost.expires, void 0, true)]);
			else {
				subtitle = document.createElement("span");
				subtitle.append(...joinElementsWith([i18n("BoostingShortMonths", [months]), formatFullSentTime(boost.expires, void 0, true)], " • "));
			}
			let rightContent;
			if (boost.pFlags.giveaway || boost.pFlags.gift) {
				rightContent = document.createElement("span");
				rightContent.classList.add("boosts-user-badge-right", "boosts-user-badge");
				rightContent.append(Icon(boost.pFlags.giveaway ? "gift_premium_filled" : "gift"), i18n(boost.pFlags.giveaway ? "BoostingGiveaway" : "BoostingGift"));
				rightContent.classList.toggle("is-gift", !boost.pFlags.giveaway && !!boost.pFlags.gift);
			}
			const middleware = this.middlewareHelper.get();
			const avatar = avatarNew({
				peerId,
				size: 42,
				middleware
			});
			const container = wrapSolidComponent(() => createComponent(Row, {
				clickable: true,
				noWrap: true,
				get children() {
					return [
						createComponent(Row.Title, {
							"class": "boosts-user-title",
							get children() {
								return [title, badge];
							}
						}),
						createComponent(Row.Subtitle, { children: subtitle }),
						createComponent(Show, {
							when: rightContent,
							get children() {
								return createComponent(Row.RightContent, { element: rightContent });
							}
						}),
						createComponent(Row.Media, {
							size: "abitbigger",
							get children() {
								return avatar.node;
							}
						})
					];
				}
			}), middleware);
			if (peerId) container.dataset.peerId = "" + peerId;
			if (peerId) await avatar.readyThumbPromise;
			else if (boost.stars) avatar.set({
				icon: "star",
				color: "stars"
			});
			else avatar.set({
				icon: boost.pFlags.unclaimed ? "deleteuser" : "noncontacts",
				color: getColorByMonths(months)
			});
			this.targets.set(container, boost);
			return container;
		};
	}
	_construct(boostsStatus, appConfig, boostsList, giftsBoostsList) {
		const limitLine = new LimitLine({
			progress: true,
			hint: {
				icon: "boost_filled",
				noStartEnd: true
			}
		});
		const progress = boostsStatus.next_level_boosts === void 0 ? 1 : (boostsStatus.boosts - boostsStatus.current_level_boosts) / (boostsStatus.next_level_boosts - boostsStatus.current_level_boosts);
		limitLine.setProgress(progress, "" + boostsStatus.boosts, {
			from1: i18n("BoostsLevel", [boostsStatus.level]),
			to1: i18n("BoostsLevel", [boostsStatus.level + 1]),
			from2: i18n("BoostsLevel", [boostsStatus.level]),
			to2: i18n("BoostsLevel", [boostsStatus.level + 1])
		});
		limitLine._setHintActive();
		const url = boostsStatus.boost_url;
		const inviteLink = new InviteLink({
			listenerSetter: this.listenerSetter,
			url
		});
		const boostsViaGiftsButton = Button$1("btn-primary btn-transparent primary", {
			icon: "gift_premium_filled",
			text: "BoostingGetBoostsViaGifts"
		});
		attachClickEvent(boostsViaGiftsButton, () => {
			showBoostsViaGiftsPopup(this.peerId);
		}, { listenerSetter: this.listenerSetter });
		const boostButton = Button$1("btn-primary btn-transparent primary", {
			icon: "addboost",
			text: this.isBroadcast ? "BoostChannel" : "BoostGroup"
		});
		attachClickEvent(boostButton, () => {
			showBoostPopup(this.peerId);
		}, { listenerSetter: this.listenerSetter });
		const noBoostersHint = i18n("NoBoostersHint");
		noBoostersHint.classList.add("boosts-no-boosters");
		let tabs, content;
		const MenuTab = (props) => {
			return createComponent(Tabs.MenuTab, {
				"class": "boosts-users-tab",
				get children() {
					return i18n(props.key, [props.count]);
				}
			});
		};
		const ContentTab = (props) => {
			return createComponent(Tabs.ContentTab, {
				get ["class"]() {
					return classNames("boosts-users-content", !props.list.count && "is-empty");
				},
				get hide() {
					return props.hide;
				},
				get children() {
					return createComponent(Show, {
						get when() {
							return props.list.count;
						},
						fallback: noBoostersHint,
						get children() {
							return [memo(() => props.list.rendered), createComponent(Show, {
								get when() {
									return !!props.list.loadMore;
								},
								get children() {
									return createComponent(MoreButton, {
										get count() {
											return props.list.count - props.list.rendered.length;
										},
										callback: () => props.list.loadMore(),
										get key() {
											return props.moreKey;
										}
									});
								}
							})];
						}
					});
				}
			});
		};
		const [tab, setTab] = createSignal(0);
		const [prepaidGiveaways, setPrepaidGiveaways] = createSignal(boostsStatus.prepaid_giveaways?.slice() || [], { equals: false });
		const onlyGiftedBoosts = createMemo(() => boostsStatus.gift_boosts === boostsStatus.boosts);
		const showGifts = createMemo(() => !onlyGiftedBoosts() && !!giftsBoostsList().count);
		const _self$ = this;
		const ret = [
			createComponent(Section, { get children() {
				return [memo(() => limitLine.container), createComponent(StatisticsOverviewItems, { get items() {
					return [
						{
							title: "BoostsLevel2",
							value: makeAbsStats(boostsStatus.level),
							includeZeroValue: true
						},
						{
							title: "PremiumSubscribers",
							value: boostsStatus.premium_audience,
							includeZeroValue: true,
							describePercentage: true
						},
						{
							title: "BoostsExisting",
							value: makeAbsStats(boostsStatus.boosts),
							includeZeroValue: true
						},
						{
							title: "BoostsToLevel",
							value: makeAbsStats(boostsStatus.next_level_boosts - boostsStatus.boosts)
						}
					];
				} })];
			} }),
			memo(() => memo(() => !!(_self$.canCreateGiveaway && prepaidGiveaways().length))() && createComponent(Section, {
				name: "Giveaway.Prepaid",
				nameArgs: [1],
				caption: "BoostingSelectPaidGiveaway",
				get children() {
					return createComponent(For, {
						get each() {
							return prepaidGiveaways();
						},
						children: (prepaidGiveaway) => {
							return createComponent(CPrepaidGiveaway, {
								giveaway: prepaidGiveaway,
								appConfig,
								clickable: () => {
									showBoostsViaGiftsPopup(_self$.peerId, prepaidGiveaway, () => {
										setPrepaidGiveaways((giveaways) => {
											indexOfAndSplice(giveaways, prepaidGiveaway);
											return giveaways;
										});
									});
								}
							});
						}
					});
				}
			})),
			createComponent(Tabs.MenuShell, {
				betweenSections: true,
				get children() {
					return createComponent(Tabs.Menu, {
						ref(r$) {
							var _ref$ = tabs;
							typeof _ref$ === "function" ? _ref$(r$) : tabs = r$;
						},
						"class": "boosts-users-tabs",
						get children() {
							return [createComponent(MenuTab, {
								key: "BoostingBoostsCount",
								get count() {
									return boostsList().count;
								}
							}), memo(() => memo(() => !!showGifts())() && createComponent(MenuTab, {
								key: "BoostingGiftsCount",
								get count() {
									return giftsBoostsList().count;
								}
							}))];
						}
					});
				}
			}),
			createComponent(Section, {
				"class": "boosts-users-container",
				get children() {
					return createComponent(Tabs.Content, {
						ref(r$) {
							var _ref$2 = content;
							typeof _ref$2 === "function" ? _ref$2(r$) : content = r$;
						},
						"class": "boosts-users-contents",
						onClick: async (e) => {
							const target = findUpClassName(e.target, "row");
							const boost = _self$.targets.get(target);
							if (!boost) return;
							if (boost.stars) {
								createPaymentPopup({
									noPaymentForm: true,
									transaction: {
										_: "starsTransaction",
										date: boost.date,
										id: "",
										peer: {
											_: "starsTransactionPeer",
											peer: {
												_: "peerChannel",
												channel_id: _self$.peerId.toChatId()
											}
										},
										pFlags: {},
										amount: formatStarsAmount(boost.stars),
										giveaway_post_id: boost.giveaway_msg_id
									},
									boost
								});
								return;
							}
							const slug = boost.used_gift_slug;
							const peerId = boost.user_id?.toPeerId(false);
							if (peerId && !boost.pFlags.gift && !boost.pFlags.unclaimed && !boost.pFlags.giveaway) hotReloadGuard.appImManager.setInnerPeer({ peerId: boost.user_id.toPeerId(false) });
							else if (peerId && peerId !== rootScope.myId) showGiftLinkPopup(slug, void 0, {
								_: "payments.checkedGiftCode",
								chats: [],
								date: boost.date,
								days: getBoostsDays(boost.date, boost.expires),
								pFlags: { via_giveaway: boost.pFlags.giveaway || void 0 },
								users: [],
								from_id: await _self$.managers.appPeersManager.getOutputPeer(_self$.peerId),
								giveaway_msg_id: boost.giveaway_msg_id,
								slug,
								to_id: peerId.toUserId(),
								used_date: slug ? 1 : void 0
							});
							else if (slug) showGiftLinkPopup(slug);
							else toastNew({ langPackKey: "BoostingRecipientWillBeSelected" });
						},
						get children() {
							return [createComponent(ContentTab, {
								get list() {
									return boostsList();
								},
								get hide() {
									return tab() !== 0;
								},
								moreKey: "BoostingShowMoreBoosts"
							}), memo(() => memo(() => !!showGifts())() && createComponent(ContentTab, {
								get list() {
									return giftsBoostsList();
								},
								get hide() {
									return tab() !== 1;
								},
								moreKey: "BoostingShowMoreGifts"
							}))];
						}
					});
				}
			}),
			createComponent(Section, {
				name: "LinkForBoosting",
				caption: "BoostingShareThisLink",
				get children() {
					return inviteLink.container;
				}
			}),
			createComponent(Section, {
				get caption() {
					return _self$.canCreateGiveaway ? "BoostingGetMoreBoosts" : void 0;
				},
				get children() {
					return [boostButton, memo(() => _self$.canCreateGiveaway && boostsViaGiftsButton)];
				}
			})
		];
		horizontalMenu(tabs, content, (index) => {
			setTab(index);
		}, void 0, void 0, void 0, this.listenerSetter)(tab());
		return ret;
	}
	async init(peerId) {
		const managers = bindManagersToSession(this.managers);
		this.container.classList.add("boosts-container");
		this.peerId = peerId;
		this.isBroadcast = await managers.appPeersManager.isBroadcast(peerId);
		this.targets = /* @__PURE__ */ new Map();
		this.setTitle("Boosts");
		const createLoader = (gifts) => {
			const middleware = this.middlewareHelper.get();
			let offset = "", isFirst = true;
			const loadMore = async () => {
				const limit = isFirst ? 20 : 100;
				isFirst = false;
				const boostsList = await this.managers.appBoostsManager.getBoostsList({
					peerId,
					offset,
					limit,
					gifts
				});
				if (!middleware()) return;
				const promises = boostsList.boosts.map(this.renderBoost);
				const rendered = await Promise.all(promises);
				setF((value) => {
					value.count = boostsList.count;
					offset = boostsList.next_offset;
					if (!offset) value.loadMore = void 0;
					value.rendered.push(...rendered);
					return value;
				});
			};
			const [f, setF] = createLoadableList({ loadMore });
			return f;
		};
		const [boostsList, giftsBoostsList] = createRoot((dispose) => {
			this.middlewareHelper.get().onDestroy(dispose);
			return [createLoader(false), createLoader(true)];
		});
		const [boostsStatus, appConfig, _, __, canCreateGiveaway] = await Promise.all([
			managers.appBoostsManager.getBoostsStatus(peerId),
			managers.apiManager.getAppConfig(),
			boostsList().loadMore(),
			giftsBoostsList().loadMore(),
			managers.appChatsManager.hasRights(peerId.toChatId(), "create_giveaway")
		]);
		this.canCreateGiveaway = canCreateGiveaway;
		const div = document.createElement("div");
		this.scrollable.append(div);
		const dispose = render(() => this._construct(boostsStatus, appConfig, boostsList, giftsBoostsList), div);
		this.eventListener.addEventListener("destroy", dispose);
	}
};
//#endregion
//#region src/helpers/giveaway/isGiveawayUntilDateValid.ts
function isGiveawayUntilDateValid(untilDate, now, periodMax) {
	return untilDate > now && untilDate <= now + periodMax;
}
//#endregion
//#region src/components/popups/pickCountry.tsx
var _tmpl$$20 = /*#__PURE__*/ template(`<span class=selector-countries-emoji>`);
function showPickCountryPopup(options) {
	let lastFiltered;
	const getCountryName = (iso2) => {
		if (options.naming === "poll") return getPollCountryName(iso2);
		const country = langPack_default.countriesList.find((item) => item.iso2.toLowerCase() === iso2.toLowerCase());
		return country ? langPack_default.format(country.default_name, true) : iso2;
	};
	const popup = showPickUserPopup({
		peerType: ["custom"],
		renderResultsFunc: (iso2s) => {
			const middleware = popup.selector.getRowsMiddleware();
			iso2s.forEach((iso2) => {
				const country = lastFiltered.get(iso2);
				const emoji = getCountryEmoji(country.iso2);
				const checkbox = popup.selector.checkbox(popup.selector.selected.has(iso2), void 0, getCountryName(country.iso2));
				const row = wrapSolidComponent(() => createComponent(Row, {
					ref: (element) => {
						element.dataset.peerId = String(iso2);
					},
					clickable: true,
					havePadding: true,
					get children() {
						return [checkbox, createComponent(Row.Title, { get children() {
							return [
								(() => {
									var _el$ = _tmpl$$20();
									insert(_el$, () => wrapEmojiText(emoji));
									return _el$;
								})(),
								" ",
								memo(() => getCountryName(country.iso2))
							];
						} })];
					}
				}), middleware);
				popup.selector.list.append(row);
			});
		},
		placeholder: "Search",
		onSelect: (selected) => {
			options.onSelect(selected.map(({ key }) => key));
		},
		multiSelect: true,
		footerButtonProps: { langKey: "Save" },
		getMoreCustom: async (q) => {
			let filtered = filterCountries(q, options.excludeVirtual);
			if (options.naming === "poll") {
				const normalizedQuery = q.trim().toLowerCase();
				const matchesPollName = filterCountries("", options.excludeVirtual).filter((country) => getCountryName(country.iso2).toLowerCase().includes(normalizedQuery));
				filtered = [...new Map([...filtered, ...matchesPollName].map((country) => [country.iso2, country])).values()].sort((a, b) => getCountryName(a.iso2).localeCompare(getCountryName(b.iso2)));
			}
			lastFiltered = /* @__PURE__ */ new Map();
			return {
				result: filtered.map((country) => {
					lastFiltered.set(country.iso2, country);
					return country.iso2;
				}),
				isEnd: true
			};
		},
		titleLangKey: options.titleLangKey,
		checkboxSide: "left",
		noPlaceholder: true
	});
	const add = popup.selector.add.bind(popup.selector);
	popup.selector.add = ({ key, scroll }) => {
		const iso2 = String(key);
		const ret = add({
			key,
			title: getCountryName(iso2),
			scroll
		});
		if (isObject(ret)) ret.avatar.render({ peerTitle: getCountryEmoji(iso2) });
		return ret;
	};
	popup.selector.searchSection.container.classList.add("is-countries");
	popup.selector.container.classList.add("is-countries");
	popup.selector.addInitial(options.initial || []);
	if (options.limit) popup.selector.setLimit(options.limit, () => {
		if (options.limitReachedLangKey) toastNew({
			langPackKey: options.limitReachedLangKey,
			langPackArguments: [options.limit]
		});
	});
	return popup;
}
//#endregion
//#region src/components/popups/boostsViaGiftsState.ts
function createBoostsViaGiftsState(initialType) {
	const [type, setType] = createSignal(initialType);
	const stars = createMemo(() => type() === "stars");
	const specific = createMemo(() => type() === "specific");
	const getPurposeFactory = (factories) => {
		return specific() ? factories.specific : factories.giveaway;
	};
	return {
		type,
		stars,
		specific,
		selectPremium: () => setType("premium"),
		selectSpecific: () => setType("specific"),
		selectStars: () => setType("stars"),
		getPurposeFactory
	};
}
//#endregion
//#region src/components/popups/boostsViaGifts.tsx
var _tmpl$$19 = /*#__PURE__*/ template(`<span class=popup-boosts-badge>`);
var _tmpl$2$14 = /*#__PURE__*/ template(`<span class=popup-boosts-button-text>`);
var _tmpl$3$10 = /*#__PURE__*/ template(`<span>`);
var _tmpl$4$9 = /*#__PURE__*/ template(`<form>`);
var _tmpl$5$7 = /*#__PURE__*/ template(`<span class="primary is-flex"> `);
var _tmpl$6$5 = /*#__PURE__*/ template(`<span class="popup-boosts-stars-amount text-bold"> `);
var _tmpl$7$4 = /*#__PURE__*/ template(`<div class=popup-boosts-additional-row><div class=popup-boosts-additional-row-count></div><input class="input-clear popup-boosts-additional-row-input">`);
var BoostsBadge = (props) => {
	return (() => {
		var _el$ = _tmpl$$19();
		insert(_el$, createComponent(IconTsx, {
			icon: "boost_filled",
			"class": "popup-boosts-badge-icon"
		}), null);
		insert(_el$, () => props.boosts, null);
		return _el$;
	})();
};
var BoostsConfirmButton = (props) => {
	return createComponent(PopupElement.FooterButton, {
		"class": "popup-boosts-button",
		get disabled() {
			return props.disabled;
		},
		get callback() {
			return props.callback;
		},
		get children() {
			return [(() => {
				var _el$2 = _tmpl$2$14();
				insert(_el$2, () => i18n(props.langKey(), props.langArgs?.()));
				return _el$2;
			})(), (() => {
				var _el$3 = _tmpl$3$10();
				insert(_el$3, createComponent(IconTsx, {
					icon: "boost_filled",
					"class": "popup-boosts-button-badge-icon"
				}), null);
				insert(_el$3, () => props.boosts(), null);
				createRenderEffect(() => className$3(_el$3, classNames("popup-boosts-button-badge", !props.boosts() && "hide")));
				return _el$3;
			})()];
		}
	});
};
async function showBoostsViaGiftsPopup(peerId, prepaidGiveaway, onCreated) {
	const managers = bindManagersToSession(rootScope.managers);
	const middlewareHelper = getMiddleware();
	const middleware = middlewareHelper.get();
	const listenerSetter = new ListenerSetter();
	const [show, setShow] = createSignal(false);
	const [scrollableRef, setScrollableRef] = createSignal();
	const [premiumGiftCodeOptions, appConfig, starsOptions] = await Promise.all([
		rootScope.managers.appPaymentsManager.getPremiumGiftCodeOptions(peerId),
		rootScope.managers.apiManager.getAppConfig(),
		rootScope.managers.appPaymentsManager.getStarsGiveawayOptions()
	]);
	const subscribersLimit = appConfig.giveaway_add_peers_max ?? 10;
	const channelsLimit = subscribersLimit;
	const countriesLimit = appConfig.giveaway_countries_max ?? 10;
	const Content = () => {
		const [subscriptionsCount, setSubscriptionsCount] = createSignal(10);
		const [expiration, setExpiration] = createSignal(tsNow(true) + 259200);
		const [peerIds, setPeerIds] = createSignal([peerId]);
		const [specificPeerIds, setSpecificPeerIds] = createSignal([]);
		const giveawayState = createBoostsViaGiftsState(prepaidGiveaway?._ === "prepaidStarsGiveaway" ? "stars" : "premium");
		const { stars, specific } = giveawayState;
		const [starsOption, setStarsOption] = createSignal(starsOptions?.[0]);
		const [starsWinner, setStarsWinner] = createSignal(starsOption() && starsOption().winners[0]);
		const [durationForm, setDurationForm] = createSignal();
		const [option, setOption] = createSignal();
		const [countries, setCountries] = createSignal();
		const [onlyNewSubscribers, setOnlyNewSubscribers] = createSignal(false);
		const [additionalPrizes, setAdditionalPrizes] = createSignal(false);
		const [additionalPrize, setAdditionalPrize] = createSignal("");
		const [showPrizes, setShowPrizes] = createSignal(true);
		const isPrepaid = createMemo(() => !!prepaidGiveaway);
		const count = createMemo(() => stars() ? starsWinner().users : subscriptionsCount());
		const boosts = createMemo(() => stars() ? starsOption().yearly_boosts : count() * (appConfig.giveaway_boosts_per_premium ?? 1));
		let range;
		if (!isPrepaid()) {
			range = new RangeStepsSelector({
				ariaLabel: "BoostsViaGifts.Quantity",
				generateStep: (value) => ["" + value, value],
				onValue: (value) => {
					if (stars()) setStarsWinner(starsOption().winners.find((winner) => winner.users === value));
					else setSubscriptionsCount(value);
				},
				middleware,
				noFirstLast: true
			});
			createEffect(() => {
				if (stars()) {
					const stepValues = starsOption().winners.map((winner) => winner.users);
					const steps = range.generateSteps(stepValues);
					const winner = untrack(starsWinner);
					let index = stepValues.findIndex((v) => v >= winner.users);
					if (index === -1) index = stepValues.length - 1;
					else if (stepValues[index] !== winner.users) index = Math.max(0, index - 1);
					range.setSteps(steps, index);
					return;
				}
				const stepValues = [
					1,
					3,
					5,
					7,
					10,
					25,
					50,
					100
				].filter((v) => premiumGiftCodeOptions.some((o) => o.users === v));
				const steps = range.generateSteps(stepValues);
				const focusValue = untrack(subscriptionsCount);
				range.setSteps(steps, Math.max(0, stepValues.indexOf(focusValue)));
			});
		} else setSubscriptionsCount(prepaidGiveaway.quantity);
		const radioOptions = {
			round: true,
			asRadio: true
		};
		let expirationRow;
		const onExpirationClick = () => {
			const now = tsNow(true);
			const minTimeDate = /* @__PURE__ */ new Date(now * 1e3);
			const minDate = new Date(minTimeDate);
			minDate.setHours(0, 0, 0, 0);
			const maxDate = /* @__PURE__ */ new Date((now + (appConfig.giveaway_period_max ?? 604800)) * 1e3);
			const initDate = /* @__PURE__ */ new Date(expiration() * 1e3);
			showDatePickerPopup({
				initDate,
				withTime: true,
				minDate,
				minTimeDate,
				onPick: (timestamp) => {
					setExpiration(timestamp);
				},
				btnConfirmLangKey: "Save",
				maxDate
			});
		};
		const selectSpecific = () => {
			setSubscriptionsCount(specificPeerIds().length);
			giveawayState.selectSpecific();
			scrollableRef()?.onSizeChange();
		};
		const createNextIcon = () => Icon("next", "popup-boosts-specific-next");
		let prepaidRowContainer, giveawayTypeRows;
		if (prepaidGiveaway) prepaidRowContainer = createComponent(CPrepaidGiveaway, {
			giveaway: prepaidGiveaway,
			appConfig
		});
		else {
			const createTypeCheckbox = (checked) => {
				const field = new CheckboxField({
					...radioOptions,
					checked,
					name: "giveaway-type"
				});
				field.label.classList.add(ROW_SELECTION_CHECKBOX_CLASS);
				return field;
			};
			const premiumCheckboxField = createTypeCheckbox(!stars());
			const createAvatar = AvatarNew({ size: 42 });
			createAvatar.set({
				icon: "gift_premium_filled",
				color: "premium"
			});
			const starsCheckboxField = createTypeCheckbox(stars());
			const specificAvatar = AvatarNew({ size: 42 });
			specificAvatar.set({
				icon: "star",
				color: "stars"
			});
			listenerSetter.add(premiumCheckboxField.input)("change", () => {
				giveawayState.selectPremium();
			});
			listenerSetter.add(premiumCheckboxField.input)("click", (e) => {
				if (stars()) return;
				cancelEvent(e);
				showPickUserPopup({
					peerType: ["channelParticipants"],
					peerId,
					onSelect: (arr) => {
						setSpecificPeerIds(arr.map(({ peerId }) => peerId));
						selectSpecific();
					},
					multiSelect: true,
					placeholder: "SearchPlaceholder",
					exceptSelf: true,
					titleLangKey: "Giveaway.Type.Specific.Modal.SelectUsers",
					initial: specificPeerIds()
				}).selector.setLimit(subscribersLimit, () => {
					toastNew({
						langPackKey: "Giveaway.MaximumSubscribers",
						langPackArguments: [subscribersLimit]
					});
				});
			});
			listenerSetter.add(starsCheckboxField.input)("change", () => {
				giveawayState.selectStars();
			});
			const getPremiumSubtitle = () => {
				const peerIds = specificPeerIds();
				if (!!(!peerIds.length || peerIds.length > 2)) return [memo(() => i18n(peerIds.length > 2 ? "Recipient" : "BoostsViaGifts.CreateSubtitle", [peerIds.length])), memo(createNextIcon)];
				const titles = peerIds.map((peerId) => new PeerTitle({ peerId }).element);
				return join(titles, false);
			};
			giveawayTypeRows = (() => {
				var _el$4 = _tmpl$4$9();
				insert(_el$4, createComponent(Row, {
					"class": `popup-boosts-type popup-boosts-specific ${ROW_WITH_CHECKBOX_AND_MEDIA_CLASS}`,
					get children() {
						return [
							createComponent(Row.Title, { get children() {
								return i18n("BoostingPremium");
							} }),
							createComponent(Row.Subtitle, {
								get ["class"]() {
									return specificPeerIds().length === 1 || specificPeerIds().length === 2 ? "primary" : "primary is-flex";
								},
								get children() {
									return getPremiumSubtitle();
								}
							}),
							createComponent(Row.CheckboxField, { get children() {
								return premiumCheckboxField.label;
							} }),
							createComponent(Row.Media, {
								size: "abitbigger",
								"class": ROW_SELECTION_MEDIA_CLASS,
								get children() {
									return createAvatar.node;
								}
							})
						];
					}
				}), null);
				insert(_el$4, createComponent(Row, {
					"class": `popup-boosts-type ${ROW_WITH_CHECKBOX_AND_MEDIA_CLASS}`,
					get children() {
						return [
							createComponent(Row.Title, { get children() {
								return i18n("BoostingStars");
							} }),
							createComponent(Row.Subtitle, { get children() {
								return i18n("BoostsViaGifts.CreateSubtitle");
							} }),
							createComponent(Row.CheckboxField, { get children() {
								return starsCheckboxField.label;
							} }),
							createComponent(Row.Media, {
								size: "abitbigger",
								"class": ROW_SELECTION_MEDIA_CLASS,
								get children() {
									return specificAvatar.node;
								}
							})
						];
					}
				}), null);
				return _el$4;
			})();
		}
		const premiumPromoAnchor = anchorCallback(() => {
			hotReloadGuard.showPremiumPopup();
		});
		let lastOptionIndex;
		createEffect(() => {
			const _count = subscriptionsCount();
			const periods = /* @__PURE__ */ new Map();
			premiumGiftCodeOptions.forEach((option, _, arr) => {
				const months = option.months;
				if (periods.has(months)) return;
				const sorted = arr.filter((o) => o.months === months).sort((a, b) => a.users - b.users);
				const nearestOption = sorted[sorted.findIndex((o) => o.users >= _count)] || sorted[sorted.length - 1];
				periods.set(months, nearestOption);
			});
			const options = [...periods.values()].sort((a, b) => b.months - a.months);
			const durationForm = createComponent(PremiumOptionsForm, {
				periodOptions: options,
				onOption: (option) => {
					lastOptionIndex = options.indexOf(option);
					setOption(option);
				},
				checked: lastOptionIndex,
				users: _count,
				discountInTitle: true
			});
			setDurationForm(() => durationForm);
		});
		const addChannelButton = Button$1("btn btn-primary btn-transparent primary", {
			icon: "add",
			text: "AddChannel"
		});
		attachClickEvent(addChannelButton, async () => {
			const toggle = toggleDisability(addChannelButton, true);
			const popup = showPickUserPopup({
				filterPeerTypeBy: ["isBroadcast"],
				onSelect: (arr) => {
					setPeerIds([peerId, ...arr.map(({ peerId }) => peerId)]);
				},
				multiSelect: true,
				placeholder: "SearchPlaceholder",
				titleLangKey: "AddChannels",
				initial: peerIds().filter((peerId) => peerId !== peerId),
				excludePeerIds: /* @__PURE__ */ new Set([peerId]),
				onCloseAfterTimeout: () => toggle()
			});
			popup.selector.setLimit(channelsLimit, () => {
				toastNew({
					langPackKey: "BoostingSelectUpToWarningChannelsPlural",
					langPackArguments: [channelsLimit]
				});
			});
			const _add = popup.selector.add.bind(popup.selector);
			let ignorePrivatePeerId;
			popup.selector.add = (options) => {
				const peerId = options.key.toPeerId();
				const chat = apiManagerProxy.getChat(peerId.toChatId());
				if (!getPeerActiveUsernames(chat)[0] && ignorePrivatePeerId !== peerId && popup.selector.getSelected().length < channelsLimit) {
					confirmationPopup({
						titleLangKey: "BoostingGiveawayPrivateChannel",
						descriptionLangKey: "BoostingGiveawayPrivateChannelWarning",
						button: { langKey: "Add" }
					}).then(() => {
						ignorePrivatePeerId = peerId;
						popup.selector.add({ key: peerId });
						popup.selector.toggleElementCheckboxByKey(peerId, true);
						ignorePrivatePeerId = void 0;
					});
					return false;
				}
				return _add(options);
			};
		}, { listenerSetter });
		const getCountriesSubtitle = () => {
			return (() => {
				var _el$5 = _tmpl$5$7(), _el$6 = _el$5.firstChild;
				insert(_el$5, () => i18n(countries() ? "BoostingFromCountriesCount" : "BoostingFromAllCountries", [countries()?.length]), _el$6);
				insert(_el$5, createNextIcon, null);
				return _el$5;
			})();
		};
		const onSubscriberTypeClick = (onlyNew) => {
			const wasSelected = onlyNewSubscribers() === onlyNew;
			setOnlyNewSubscribers(onlyNew);
			if (!wasSelected) return;
			showPickCountryPopup({
				excludeVirtual: true,
				initial: countries(),
				limit: countriesLimit,
				limitReachedLangKey: "BoostingSelectUpToWarningCountriesPlural",
				onSelect: setCountries,
				titleLangKey: "BoostingSelectCountry"
			});
		};
		const allSubscribersCheckboxField = new CheckboxField({
			...radioOptions,
			checked: true,
			name: "giveaway-users"
		});
		const newSubscribersCheckboxField = new CheckboxField({
			...radioOptions,
			name: "giveaway-users"
		});
		listenerSetter.add(allSubscribersCheckboxField.input)("click", () => {
			onSubscriberTypeClick(false);
		});
		listenerSetter.add(newSubscribersCheckboxField.input)("click", () => {
			onSubscriberTypeClick(true);
		});
		const notSpecific = [
			memo(() => memo(() => !!(!isPrepaid() && stars()))() && createComponent(Section, {
				name: "BoostingStarsOptions",
				caption: "BoostingStarsOptionsInfo",
				get children() {
					var _el$8 = _tmpl$4$9();
					insert(_el$8, createComponent(For, {
						each: starsOptions,
						children: (option) => {
							const checkboxField = new CheckboxField({
								...radioOptions,
								checked: starsOption() === option,
								name: "giveaway-stars-quantity"
							});
							listenerSetter.add(checkboxField.input)("change", () => {
								setStarsOption(option);
							});
							const subtitle = createMemo(() => {
								const winner = option.winners.find((winner) => winner.users === starsWinner().users);
								if (!winner) return;
								return i18n("BoostingStarOptionPerUser", [numberThousandSplitterForStars(+winner.per_user_stars)]);
							});
							return createComponent(Row, {
								"class": "popup-boosts-stars-row",
								noRipple: true,
								get children() {
									return [
										createComponent(Row.Title, { get children() {
											var _el$9 = _tmpl$6$5(), _el$0 = _el$9.firstChild;
											insert(_el$9, createComponent(StarsStackedStars, {
												get stars() {
													return +option.stars;
												},
												size: 18
											}), _el$0);
											insert(_el$9, () => i18n("Stars", [numberThousandSplitterForStars(+option.stars)]), null);
											return _el$9;
										} }),
										createComponent(Row.Subtitle, { get children() {
											return subtitle();
										} }),
										createComponent(Row.RightContent, { get children() {
											return paymentsWrapCurrencyAmount(option.amount, option.currency);
										} }),
										createComponent(Row.CheckboxField, { get children() {
											return checkboxField.label;
										} })
									];
								}
							});
						}
					}));
					return _el$8;
				}
			})),
			memo(() => memo(() => !!!isPrepaid())() && createComponent(Section, {
				get name() {
					return stars() ? "BoostingStarsQuantityPrizes" : "BoostsViaGifts.Quantity";
				},
				get nameRight() {
					return memo(() => !!!stars())() && createComponent(BoostsBadge, { get boosts() {
						return boosts();
					} });
				},
				get caption() {
					return stars() ? "BoostingStarsQuantityPrizesInfo" : "BoostsViaGifts.QuantitySubtitle";
				},
				get children() {
					return range.container;
				}
			})),
			createComponent(Section, {
				name: "BoostsViaGifts.Channels",
				get children() {
					return [createComponent(For, {
						get each() {
							return peerIds();
						},
						children: (peerId, idx) => {
							const peerTitle = new PeerTitle();
							peerTitle.update({ peerId });
							peerTitle.element.classList.add("text-bold");
							let subtitleElement;
							(() => {
								var _el$1 = _tmpl$3$10();
								var _ref$ = subtitleElement;
								typeof _ref$ === "function" ? use(_ref$, _el$1) : subtitleElement = _el$1;
								insert(_el$1, (() => {
									var _c$ = memo(() => idx() === 0);
									return () => _c$() && i18n("BoostsViaGifts.ChannelSubscription", [boosts()]);
								})(), null);
								insert(_el$1, (() => {
									var _c$2 = memo(() => idx() !== 0);
									return () => _c$2() && getChatMembersString(peerId.toChatId(), void 0, void 0, true);
								})(), null);
								return _el$1;
							})();
							return createComponent(Row, {
								"class": "popup-boosts-channel",
								contextMenu: peerId !== peerId ? { buttons: [{
									icon: "delete",
									danger: true,
									text: "Remove",
									onClick: () => {
										setPeerIds((peerIds) => peerIds.filter((_peerId) => _peerId !== peerId));
									}
								}] } : void 0,
								get children() {
									return [
										createComponent(Row.Title, { get children() {
											return peerTitle.element;
										} }),
										createComponent(Row.Subtitle, { children: subtitleElement }),
										createComponent(Row.Media, {
											size: "abitbigger",
											get children() {
												return AvatarNew({
													peerId,
													size: 42
												}).node;
											}
										})
									];
								}
							});
						}
					}), addChannelButton];
				}
			}),
			createComponent(Section, {
				name: "BoostsViaGifts.Users",
				caption: "BoostsViaGifts.UsersSubtitle",
				get children() {
					var _el$7 = _tmpl$4$9();
					insert(_el$7, createComponent(Row, { get children() {
						return [
							createComponent(Row.Title, { get children() {
								return i18n("AllSubscribers");
							} }),
							createComponent(Row.Subtitle, { get children() {
								return getCountriesSubtitle();
							} }),
							createComponent(Row.CheckboxField, { get children() {
								return allSubscribersCheckboxField.label;
							} })
						];
					} }), null);
					insert(_el$7, createComponent(Row, { get children() {
						return [
							createComponent(Row.Title, { get children() {
								return i18n("OnlyNewSubscribers");
							} }),
							createComponent(Row.Subtitle, { get children() {
								return getCountriesSubtitle();
							} }),
							createComponent(Row.CheckboxField, { get children() {
								return newSubscribersCheckboxField.label;
							} })
						];
					} }), null);
					return _el$7;
				}
			})
		];
		const additionalPrizeDiv = (() => {
			var _el$10 = _tmpl$7$4(), _el$11 = _el$10.firstChild, _el$12 = _el$11.nextSibling;
			insert(_el$11, count);
			_el$12.$$input = (e) => {
				const target = e.target;
				let value = target.value;
				const isOverflow = value.length > 128;
				if (isOverflow) target.value = value = value.slice(0, 128);
				setAdditionalPrize(value);
				if (isOverflow) shake(target);
			};
			use((el) => {
				_i18n(el, "BoostsViaGifts.AdditionalPrizeLabel", void 0, "placeholder");
			}, _el$12);
			return _el$10;
		})();
		const notSpecific2 = [
			createComponent(Section, {
				get caption() {
					return memo(() => !!additionalPrizes())() ? "BoostsViaGifts.AdditionalPrizesSubtitle" : stars() ? "BoostingStarsGiveawayAdditionPrizeHint" : "BoostsViaGifts.AdditionalPrizesSubtitleOff";
				},
				get captionArgs() {
					return memo(() => !!additionalPrizes())() ? memo(() => !!stars())() ? [i18n(additionalPrize() ? "BoostsViaGifts.AdditionalStarsPrizesDetailedWith" : "BoostsViaGifts.AdditionalStarsPrizesDetailed", [
						starsOption().stars,
						count(),
						additionalPrize()
					].filter(Boolean))] : [i18n(additionalPrize() ? "BoostsViaGifts.AdditionalPrizesDetailedWith" : "BoostsViaGifts.AdditionalPrizesDetailed", [
						subscriptionsCount(),
						additionalPrize(),
						formatMonthsDuration(option().months, true)
					].filter(Boolean))] : void 0;
				},
				get children() {
					return [createComponent(Row, { get children() {
						return [createComponent(Row.CheckboxFieldToggle, { get children() {
							return createComponent(CheckboxFieldTsx, {
								signal: [additionalPrizes, setAdditionalPrizes],
								toggle: true
							});
						} }), createComponent(Row.Title, { get children() {
							return i18n("BoostsViaGifts.AdditionalPrizes");
						} })];
					} }), memo(() => additionalPrizes() && additionalPrizeDiv)];
				}
			}),
			createComponent(Section, {
				caption: "BoostsViaGifts.ShowWinnersSubtitle",
				get children() {
					return createComponent(Row, { get children() {
						return [createComponent(Row.CheckboxFieldToggle, { get children() {
							return createComponent(CheckboxFieldTsx, {
								signal: [showPrizes, setShowPrizes],
								toggle: true
							});
						} }), createComponent(Row.Title, { get children() {
							return i18n("BoostsViaGifts.ShowWinners");
						} })];
					} });
				}
			}),
			createComponent(Section, {
				name: "BoostsViaGifts.End",
				get caption() {
					return stars() ? "BoostsViaGifts.Stars.EndSubtitle" : "BoostsViaGifts.EndSubtitle";
				},
				get captionArgs() {
					return [count()];
				},
				get children() {
					return createComponent(Row, {
						ref(r$) {
							var _ref$2 = expirationRow;
							typeof _ref$2 === "function" ? _ref$2(r$) : expirationRow = r$;
						},
						clickable: onExpirationClick,
						get children() {
							return createComponent(Row.Title, {
								get titleRight() {
									return formatFullSentTime(expiration());
								},
								titleRightClass: "primary",
								titleRightSecondary: true,
								get children() {
									return i18n("Ends");
								}
							});
						}
					});
				}
			})
		];
		const ret = [
			createComponent(MediaHeader, {
				marginTop: true,
				marginBottom: true,
				get children() {
					return [
						createComponent(MediaHeader.Sticker, {
							size: 168,
							element: () => createComponent(Star3D, {
								get kind() {
									return stars() ? "stars" : "premium";
								},
								size: 120
							})
						}),
						createComponent(MediaHeader.Title, {
							size: 20,
							get children() {
								return i18n("BoostsViaGifts.Title");
							}
						}),
						createComponent(MediaHeader.Subtitle, { get children() {
							return i18n(isPrepaid() && prepaidGiveaway._ === "prepaidGiveaway" ? "BoostingGetMoreBoosts" : "BoostingGetMoreBoosts2");
						} })
					];
				}
			}),
			createComponent(Section, { get children() {
				return [memo(() => isPrepaid() && prepaidRowContainer), memo(() => !isPrepaid() && giveawayTypeRows)];
			} }),
			memo(() => !specific() && notSpecific),
			memo(() => memo(() => !!(!isPrepaid() && !stars()))() && createComponent(Section, {
				name: "BoostsViaGifts.Duration",
				caption: "BoostsViaGifts.DurationSubtitle",
				captionArgs: [premiumPromoAnchor],
				get children() {
					return durationForm();
				}
			})),
			memo(() => !specific() && notSpecific2)
		];
		const createGiveawayStoreInput = async () => {
			const peers = await Promise.all(peerIds().map((peerId) => rootScope.managers.appPeersManager.getInputPeerById(peerId)));
			const common = {
				pFlags: {
					only_new_subscribers: onlyNewSubscribers() || void 0,
					winners_are_visible: showPrizes() || void 0
				},
				boost_peer: peers[0],
				random_id: randomLong(),
				until_date: expiration(),
				additional_peers: peers.length > 1 ? peers.slice(1) : void 0,
				countries_iso2: countries()?.length ? countries() : void 0,
				prize_description: additionalPrizes() && additionalPrize() || void 0
			};
			if (stars()) return {
				...starsOption(),
				...common,
				_: "inputStorePaymentStarsGiveaway",
				users: starsWinner().users
			};
			return {
				...option(),
				...common,
				_: "inputStorePaymentPremiumGiveaway"
			};
		};
		const createSpecificStoreInput = async () => {
			const managers = bindManagersToSession(rootScope.managers);
			const { amount, currency } = option();
			const users = await Promise.all(specificPeerIds().map((peerId) => managers.appUsersManager.getUserInput(peerId.toUserId())));
			return {
				_: "inputStorePaymentPremiumGiftCode",
				amount,
				currency,
				boost_peer: await managers.appPeersManager.getInputPeerById(peerId),
				users
			};
		};
		const continueWithPrepaid = async (purpose) => {
			const managers = bindManagersToSession(rootScope.managers);
			await confirmationPopup({
				titleLangKey: "BoostingStartGiveawayConfirmTitle",
				descriptionLangKey: "BoostingStartGiveawayConfirmText",
				button: { langKey: "Start" }
			});
			return managers.appPaymentsManager.launchPrepaidGiveaway(peerId, prepaidGiveaway.id, purpose);
		};
		const continueWithCreating = async (purpose) => {
			const popup = await createPaymentPopup({ inputInvoice: purpose._ === "inputStorePaymentStarsGiveaway" ? {
				_: "inputInvoiceStars",
				purpose
			} : {
				_: "inputInvoicePremiumGiftCode",
				purpose,
				option: option()
			} });
			await new Promise((resolve, reject) => {
				popup.addEventListener("finish", (result) => {
					if (result === "cancelled" || result === "failed") reject();
					else resolve();
				});
			});
		};
		return [
			createComponent(PopupElement.Header, {
				floating: true,
				get children() {
					return [createComponent(PopupElement.CloseButton, {}), createComponent(PopupElement.Title, { title: "BoostsViaGifts.Title" })];
				}
			}),
			createComponent(PopupElement.Scrollable, {
				contextRef: setScrollableRef,
				get children() {
					return createComponent(PopupElement.Body, { children: ret });
				}
			}),
			createComponent(PopupElement.Footer, { get children() {
				return createComponent(BoostsConfirmButton, {
					langKey: () => "BoostsViaGifts.Start",
					boosts,
					callback: async () => {
						if (!specific()) {
							const now = tsNow(true);
							const periodMax = appConfig.giveaway_period_max ?? 604800;
							if (!isGiveawayUntilDateValid(expiration(), now, periodMax)) {
								toastNew({ langPackKey: "BoostsViaGifts.InvalidEndDate" });
								shake(expirationRow);
								return false;
							}
						}
						try {
							const purpose = await giveawayState.getPurposeFactory({
								giveaway: createGiveawayStoreInput,
								specific: createSpecificStoreInput
							})();
							await (isPrepaid() ? continueWithPrepaid(purpose) : continueWithCreating(purpose));
							onCreated?.();
							setShow(false);
						} catch (err) {
							console.error("boosts via gifts error", err);
						}
						return false;
					}
				});
			} })
		];
	};
	createPopup(() => {
		onCleanup(() => {
			listenerSetter.removeAll();
			middlewareHelper.destroy();
		});
		return createComponent(PopupElement, {
			managers,
			"class": "popup-boosts",
			closable: true,
			get show() {
				return show();
			},
			get children() {
				return createComponent(Content, {});
			}
		});
	});
	setShow(true);
}
delegateEvents(["input"]);
//#endregion
//#region src/components/popups/reassignBoost.tsx
var _tmpl$$18 = /*#__PURE__*/ template(`<div class=popup-boost-avatars-avatar-container>`);
var _tmpl$2$13 = /*#__PURE__*/ template(`<div><div class=popup-boost-avatars-left></div><div class=popup-boost-avatars-right>`);
var _tmpl$3$9 = /*#__PURE__*/ template(`<span>`);
var className$2 = "popup-boost";
async function showReassignBoostPopup(peerId, myBoosts, appConfig) {
	const managers = bindManagersToSession(rootScope.managers);
	const middlewareHelper = getMiddleware();
	const middleware = middlewareHelper.get();
	const descriptionPeerTitle = await wrapPeerTitle({ peerId });
	const [show, setShow] = createSignal(false);
	const deferredCloseCallbacks = [];
	const hideWithCallback = (callback) => {
		deferredCloseCallbacks.push(callback);
		setShow(false);
	};
	createPopup(() => {
		onCleanup(() => middlewareHelper.destroy());
		const [selected, setSelected] = createSignal([]);
		const [count, setCount] = createSignal(0);
		const [processing, setProcessing] = createSignal(false);
		const map = /* @__PURE__ */ new Map();
		const Avatars = () => {
			const createAvatar = (props) => {
				const avatar = untrack(() => {
					return AvatarNew({
						peerId: props.peerId,
						size: 60
					});
				});
				avatar.node.classList.add(`${className$2}-avatars-avatar`);
				avatar.node.append();
				return avatar;
			};
			const avatar = createAvatar({
				peerId,
				right: true
			});
			const peerIds = createMemo((previous) => {
				const previosIndexes = /* @__PURE__ */ new Map();
				previous?.forEach((peerId, index) => {
					previosIndexes.set(peerId, index);
				});
				const current = filterUnique(selected().map((myBoost) => getPeerId(myBoost.peer)).reverse());
				current.sort((a, b) => (previosIndexes.get(a) ?? 0) - (previosIndexes.get(b) ?? 0));
				return current;
			});
			const offset = 26;
			const realList = createComponent(For, {
				get each() {
					return peerIds();
				},
				children: (peerId, index) => {
					const { element } = createAvatar({ peerId });
					const diff = createMemo(() => peerIds().length - index() - 1);
					return (() => {
						var _el$ = _tmpl$$18();
						insert(_el$, element, null);
						insert(_el$, createComponent(IconTsx, {
							icon: "boostcircle_filled",
							get ["class"]() {
								return classNames(`${className$2}-avatars-avatar-icon`, !diff() && "is-visible");
							}
						}), null);
						createRenderEffect((_$p) => style(_el$, `--offset: calc(${diff() * -26}px * var(--reflect))`, _$p));
						return _el$;
					})();
				}
			});
			const transitionList = createListTransition(resolveElements(() => realList).toArray, {
				exitMethod: "keep-index",
				onChange: ({ added, removed, finishRemoved }) => {
					const options = {
						duration: liteMode.isAvailable("motion") ? 200 : 0,
						easing: "ease-in-out"
					};
					const keyframes = [{ transform: "translateX(var(--offset)) scale(0)" }, { transform: "translateX(var(--offset)) scale(1)" }];
					queueMicrotask(() => {
						for (const element of added) element.animate(keyframes, options);
						const reversedKeyframes = keyframes.slice().reverse();
						const promises = [];
						for (const element of removed) {
							const animation = element.animate(reversedKeyframes, options);
							promises.push(animation.finished);
						}
						Promise.all(promises).then(() => finishRemoved(removed));
					});
				}
			});
			return (() => {
				var _el$2 = _tmpl$2$13(), _el$3 = _el$2.firstChild, _el$4 = _el$3.nextSibling;
				insert(_el$3, transitionList);
				insert(_el$2, createComponent(IconTsx, {
					icon: "next",
					"class": `${className$2}-avatars-arrow`
				}), _el$4);
				insert(_el$4, () => avatar.element);
				createRenderEffect((_p$) => {
					var _v$ = classNames(`${className$2}-avatars`, peerIds().length && "has-left"), _v$2 = `transform: translateX(calc(${Math.max(0, peerIds().length - 1) * (offset / 2)}px * var(--reflect)))`;
					_v$ !== _p$.e && className$3(_el$2, _p$.e = _v$);
					_p$.t = style(_el$2, _v$2, _p$.t);
					return _p$;
				}, {
					e: void 0,
					t: void 0
				});
				return _el$2;
			})();
		};
		const leftTimes = /* @__PURE__ */ new Map();
		const body = document.createElement("div");
		body.classList.add("popup-body");
		const selector = new AppSelectPeers({
			middleware,
			appendTo: body,
			onChange: (length) => {
				setSelected(selector.getSelected().map((key) => map.get(key)));
				setCount(length);
			},
			onFirstRender: () => {
				setShow(true);
			},
			multiSelect: true,
			noSearch: true,
			sectionNameLangPackKey: "BoostingRemoveBoostFrom",
			avatarSize: "abitbigger",
			managers: rootScope.managers,
			peerType: [],
			getSubtitleForElement: (key) => {
				const myBoost = map.get(key);
				return createRoot((dispose) => {
					middleware.onDestroy(() => {
						dispose();
						clearInterval(interval);
					});
					const expirationSpan = i18n("BoostsExpiration", [1, formatFullSentTime(myBoost.expires, void 0, true)]);
					const [timestamp, setTimestamp] = createSignal(tsNow(true));
					const leftTime = createMemo((prev) => {
						const left = Math.max(0, (myBoost.cooldown_until_date || 0) - timestamp());
						if (!left && prev !== void 0) clearInterval(interval);
						return left;
					});
					leftTimes.set(key, leftTime);
					const interval = leftTime() ? window.setInterval(() => {
						setTimestamp(tsNow(true));
					}, 1e3) : void 0;
					return (() => {
						var _el$5 = _tmpl$3$9();
						insert(_el$5, (() => {
							var _c$ = memo(() => !!leftTime());
							return () => _c$() ? i18n("BoostingAvailableIn", [wrapLeftDuration(leftTime())]) : expirationSpan;
						})());
						return _el$5;
					})();
				});
			},
			getPeerIdFromKey: (key) => key.split("_")[1].toPeerId(),
			processElementAfter: (key, dialogElement) => {
				const leftTime = leftTimes.get(key);
				createRoot((dispose) => {
					middleware.onDestroy(dispose);
					createEffect(() => {
						dialogElement.container.classList.toggle("is-unavailable", !!leftTime());
					});
				});
			}
		});
		const _add = selector.add.bind(selector);
		selector.add = (...args) => {
			if (selector.getElementByKey(args[0].key).classList.contains("is-unavailable")) {
				toastNew({
					langPackKey: "Boost.Reassign.Wait",
					langPackArguments: [i18n("MoreBoosts", [appConfig.boosts_per_sent_gift ?? 1]), anchorCallback(() => {
						hideToast();
						hideWithCallback(() => {
							hotReloadGuard.appImManager.initGifting();
						});
					})]
				});
				return false;
			}
			return _add(...args);
		};
		const keys = myBoosts.my_boosts.map((myBoost) => {
			const boostPeerId = getPeerId(myBoost.peer);
			if (boostPeerId === peerId) return;
			const key = "S" + myBoost.slot + "_" + boostPeerId;
			map.set(key, myBoost);
			return key;
		}).filter(Boolean);
		selector.scrollable.attachBorderListeners();
		selector.renderResultsFunc(keys);
		const onClick = async (e) => {
			cancelEvent(e);
			setProcessing(true);
			try {
				const slots = selected().map((myBoost) => myBoost.slot);
				const uniquePeers = filterUnique(selected().map((myBoost) => getPeerId(myBoost.peer)));
				await rootScope.managers.appBoostsManager.applyBoost(peerId, slots);
				setShow(false);
				toastNew({
					langPackKey: "BoostingReassignedFromPlural",
					langPackArguments: [slots.length, i18n("BoostingFromOtherChannel", [uniquePeers.length])]
				});
			} catch (err) {
				console.error("error replacing boosts", err);
			}
			setProcessing(false);
			return false;
		};
		return createComponent(PopupElement, {
			managers,
			"class": className$2,
			closable: true,
			get show() {
				return show();
			},
			onCloseAfterTimeout: () => deferredCloseCallbacks.splice(0).forEach((callback) => callback()),
			get children() {
				return [
					createComponent(PopupElement.Header, {
						floating: true,
						get children() {
							return createComponent(PopupElement.CloseButton, {});
						}
					}),
					memo(() => Avatars()),
					createComponent(MediaHeader.Title, {
						"class": `${className$2}-title`,
						size: 20,
						get children() {
							return i18n("Boost.Replace");
						}
					}),
					createComponent(MediaHeader.Subtitle, {
						"class": `${className$2}-description`,
						get children() {
							return i18n("Boost.Reassign.Description", [
								descriptionPeerTitle,
								i18n("Boost.GiftPremium", [anchorCallback(() => {
									hideWithCallback(() => {
										hotReloadGuard.appImManager.initGifting();
									});
								})]),
								i18n("Boost.Additional", [appConfig.boosts_per_sent_gift ?? 1])
							]);
						}
					}),
					body,
					createComponent(PopupElement.Footer, { get children() {
						return createComponent(BoostsConfirmButton, {
							get disabled() {
								return !count() || processing();
							},
							callback: onClick,
							langKey: () => "Boost.Reassign",
							langArgs: () => [count() || 1],
							boosts: count
						});
					} })
				];
			}
		});
	});
}
//#endregion
//#region src/components/popups/boost.tsx
var boost_exports = /* @__PURE__ */ __exportAll({ default: () => showBoostPopup });
var className$1 = "popup-boost";
async function showBoostPopup(peerId, { reason, managers: openerManagers, onClose } = {}) {
	const managers = bindManagersToSession(openerManagers || rootScope.managers);
	const middlewareHelper = getMiddleware();
	const [boostsStatus, myBoosts, appConfig, isPremiumPurchaseBlocked, isBroadcast] = await Promise.all([
		managers.appBoostsManager.getBoostsStatus(peerId).catch(() => void 0),
		managers.appBoostsManager.getMyBoosts(),
		managers.apiManager.getAppConfig(),
		apiManagerProxy.isPremiumPurchaseBlocked(),
		managers.appPeersManager.isBroadcast(peerId)
	]);
	if (isSessionLeaving(getManagersSession(managers))) {
		middlewareHelper.destroy();
		onClose?.();
		return;
	}
	if (!boostsStatus) {
		toastNew({ langPackKey: "CantBoostChat" });
		middlewareHelper.destroy();
		onClose?.();
		return;
	}
	const entity = AppSelectPeers.renderEntity({
		key: peerId,
		middleware: middlewareHelper.get(),
		avatarSize: 30
	});
	entity.element.classList.add(`${className$1}-entity`, "selector-user-alone", "hover-primary");
	const entityBoosts = createBadge("span", 20, "premium");
	entityBoosts.classList.add(`${className$1}-entity-badge`);
	entity.element.append(entityBoosts);
	const descriptionPeerTitle = await wrapPeerTitle({ peerId });
	await entity.avatar.readyThumbPromise;
	const limitLine = new LimitLine({
		progress: true,
		hint: {
			icon: "boost_filled",
			noStartEnd: true
		}
	});
	const [show, setShow] = createSignal(true);
	const deferredCloseCallbacks = [];
	const hideWithCallback = (callback) => {
		deferredCloseCallbacks.push(callback);
		setShow(false);
	};
	createPopup(() => {
		const [status, setStatus] = createSignal(boostsStatus, { equals: false });
		const [boosts, setBoosts] = createSignal(myBoosts, { equals: false });
		const [updated, setUpdated] = createSignal(false);
		const hasStories = () => status().level > 0 || status().next_level_boosts === status().boosts;
		const needBoostsForNextLevel = () => status().next_level_boosts - status().boosts;
		const isMaxLevel = () => status().next_level_boosts === void 0;
		const hasMyBoost = () => !!status().pFlags.my_boost;
		const givenBoosts = () => boosts().my_boosts.filter((myBoost) => getPeerId(myBoost.peer) === peerId);
		const showReason = () => !!reason && !isMaxLevel() && !updated();
		const title = () => {
			if (showReason()) return i18n(reason.titleLangKey);
			if (hasMyBoost()) return i18n(isBroadcast ? "YouBoostedChannel" : "YouBoostedGroup");
			if (isMaxLevel()) return i18n("BoostsMaxLevelReached");
			if (hasStories()) return i18n(isBroadcast ? "HelpUpgradeChannel" : "HelpUpgradeGroup");
			return i18n("Boost.EnableStoriesFor");
		};
		const description = () => {
			if (showReason()) return i18n(reason.descriptionLangKey, reason.descriptionArgs);
			if (updated() && status().level === 0 && hasStories()) return i18n(isBroadcast ? "Boost.DescriptionJustReachedLevel1" : "Boost.DescriptionJustReachedLevel1.Group");
			if (isMaxLevel() || updated() && status().level > 0) return i18n(isBroadcast ? "Boost.DescriptionJustReachedLevel" : "Boost.DescriptionJustReachedLevel.Group", [status().level, i18n("Boost.StoriesCount", [status().level + 1])]);
			if (hasStories()) return i18n("ChannelNeedBoostsDescriptionForNewFeatures", [descriptionPeerTitle, i18n("MoreBoosts", [needBoostsForNextLevel()])]);
			return i18n(isBroadcast ? "ChannelNeedBoostsDescriptionLevel1" : "GroupNeedBoostsDescriptionLevel1", [i18n("MoreBoosts", [needBoostsForNextLevel()])]);
		};
		const handleErrorType = (type) => {
			if (type === "PREMIUM_ACCOUNT_REQUIRED") showPremiumNeeded();
			else if (type.includes("FLOOD_WAIT")) {
				const wait = +type.split("_")[2];
				confirmationPopup({
					titleLangKey: "CantBoostTooOften",
					descriptionLangKey: "CantBoostTooOftenDescription",
					descriptionLangArgs: [wrapFormattedDuration(formatDuration(wait, 2), false)],
					button: {
						langKey: "OK",
						isCancel: true
					}
				});
			} else if (type === "PREMIUM_GIFTED_NOT_ALLOWED") confirmationPopup({
				titleLangKey: "CantBoostWithGiftedPremium",
				descriptionLangKey: "CantBoostWithGiftedPremiumDescription",
				button: {
					langKey: "OK",
					isCancel: true
				}
			});
		};
		const showPremiumNeeded = () => {
			confirmationPopup({
				titleLangKey: "PremiumNeeded",
				descriptionLangKey: "PremiumNeededForBoosting",
				button: { langKey: "Yes" }
			}).then(() => {
				hotReloadGuard.showPremiumPopup();
			});
		};
		const onClick = async (e) => {
			cancelEvent(e);
			try {
				const given = givenBoosts();
				const availableBoost = boosts().my_boosts.find((myBoost) => !myBoost.peer);
				let type;
				if (!rootScope.premium) type = "PREMIUM_ACCOUNT_REQUIRED";
				else if (given.length === boosts().my_boosts.length) {
					await confirmationPopup({
						titleLangKey: "BoostingMoreBoostsNeeded",
						descriptionLangKey: "Boost.GetMoreBoosts",
						descriptionLangArgs: [appConfig.boosts_per_sent_gift ?? 1, await wrapPeerTitle({ peerId })],
						button: { langKey: "GiftPremium" }
					});
					hideWithCallback(() => {
						hotReloadGuard.appImManager.initGifting();
					});
					return;
				} else if (!availableBoost) {
					setShow(false);
					showReassignBoostPopup(peerId, boosts(), appConfig);
					return;
				}
				if (type) throw { type };
				await managers.appBoostsManager.applyBoost(peerId, [availableBoost.slot]);
				const [nextBoosts, nextStatus] = await Promise.all([managers.appBoostsManager.getMyBoosts(), managers.appBoostsManager.getBoostsStatus(peerId)]);
				setUpdated(true);
				setBoosts(nextBoosts);
				setStatus(nextStatus);
			} catch (err) {
				handleErrorType(err.type);
			}
			return false;
		};
		const buttons = () => {
			const button = isMaxLevel() || givenBoosts().length === boosts().my_boosts.length && isPremiumPurchaseBlocked ? {
				langKey: "OK",
				isCancel: true
			} : {
				langKey: isBroadcast ? "BoostChannel" : "BoostGroup",
				iconLeft: "boost_filled",
				callback: onClick
			};
			return addCancelButton([button]);
		};
		createEffect(() => {
			const status$ = status();
			const progress = isMaxLevel() ? 1 : (status$.boosts - status$.current_level_boosts) / (status$.next_level_boosts - status$.current_level_boosts);
			limitLine.setProgress(progress, "" + status$.boosts, {
				from1: i18n("BoostsLevel", [status$.level]),
				to1: i18n("BoostsLevel", [status$.level + 1]),
				from2: i18n("BoostsLevel", [status$.level]),
				to2: i18n("BoostsLevel", [status$.level + 1])
			});
			entityBoosts.textContent = `x${givenBoosts().length}`;
			entityBoosts.classList.toggle("is-badge-empty", !hasMyBoost());
		});
		const listenerSetter = new ListenerSetter();
		attachClickEvent(entity.element, () => {
			hideWithCallback(() => {
				hotReloadGuard.appImManager.setInnerPeer({ peerId });
			});
		}, { listenerSetter });
		onCleanup(() => {
			listenerSetter.removeAll();
			middlewareHelper.destroy();
		});
		limitLine._setHintActive();
		return createComponent(PopupElement, {
			managers,
			"class": "popup-peer " + className$1,
			closable: true,
			old: true,
			get show() {
				return show();
			},
			onCloseAfterTimeout: () => {
				deferredCloseCallbacks.splice(0).forEach((callback) => callback());
				onClose?.();
			},
			get children() {
				return [
					memo(() => limitLine.container),
					createComponent(MediaHeader.Title, {
						"class": `${className$1}-title`,
						size: 20,
						get children() {
							return title();
						}
					}),
					memo(() => entity.element),
					createComponent(MediaHeader.Subtitle, {
						"class": `${className$1}-description`,
						get children() {
							return description();
						}
					}),
					createComponent(PopupElement.Buttons, { get children() {
						return createComponent(For, {
							get each() {
								return buttons();
							},
							children: (button) => createComponent(PopupElement.Button, {
								get langKey() {
									return button.langKey;
								},
								get danger() {
									return button.isDanger;
								},
								get cancel() {
									return button.isCancel;
								},
								get iconLeft() {
									return button.iconLeft;
								},
								get callback() {
									return button.callback;
								}
							})
						});
					} })
				];
			}
		});
	});
}
//#endregion
//#region src/components/popups/starGiftWear.tsx
var _tmpl$$17 = /*#__PURE__*/ template(`<div><div><div class=profile-avatars-info><div class=profile-name></div><div class=profile-subtitle><span class=online></span></div></div></div><div>`);
function showStarGiftWearPopup(options) {
	const gift$ = options.gift;
	const peerId = options.peerId || rootScope.myId;
	const { collectibleAttributes } = gift$;
	const gift = gift$.raw;
	const [show, setShow] = createSignal(true);
	const onWear = () => {
		const managers = bindManagersToSession(rootScope.managers);
		(peerId === rootScope.myId ? managers.appUsersManager.updateEmojiStatus({
			_: "inputEmojiStatusCollectible",
			collectible_id: gift$.raw.id
		}) : managers.appChatsManager.updateEmojiStatus(peerId.toChatId(), {
			_: "inputEmojiStatusCollectible",
			collectible_id: gift$.raw.id
		})).then(() => {
			setShow(false);
		}).catch((err) => {
			if (err.type === "BOOSTS_REQUIRED") {
				showBoostPopup(peerId);
				return;
			}
			toastNew({ langPackKey: "Error.AnError" });
		});
	};
	createPopup(() => createComponent(PopupElement, {
		get ["class"]() {
			return starGiftWear_module_default.popup;
		},
		closable: true,
		get show() {
			return show();
		},
		old: true,
		get children() {
			return [
				createComponent(PopupElement.Header, {
					floating: true,
					get children() {
						return createComponent(PopupElement.CloseButton, { "class": starGiftWear_module_default.close });
					}
				}),
				createComponent(PopupElement.Body, { get children() {
					var _el$ = _tmpl$$17(), _el$2 = _el$.firstChild, _el$3 = _el$2.firstChild, _el$4 = _el$3.firstChild, _el$6 = _el$4.nextSibling.firstChild, _el$7 = _el$2.nextSibling;
					className$3(_el$, starGiftWear_module_default.container);
					className$3(_el$2, classNames(starGiftWear_module_default.header, "profile-container need-white is-collapsed"));
					insert(_el$2, (() => {
						var _c$ = memo(() => gift._ === "starGiftUnique");
						return () => _c$() && createComponent(StarGiftBackdrop, {
							get ["class"]() {
								return starGiftWear_module_default.backdrop;
							},
							get backdrop() {
								return collectibleAttributes.backdrop;
							},
							get patternEmoji() {
								return collectibleAttributes.pattern.document;
							}
						});
					})(), _el$3);
					insert(_el$2, createComponent(AvatarNewTsx, {
						"class": starGiftWear_module_default.avatar,
						peerId,
						size: 120
					}), _el$3);
					insert(_el$4, createComponent(PeerTitleTsx, {
						peerId,
						withIcons: true
					}), null);
					insert(_el$4, createComponent(StickerTsx, {
						"class": "emoji-status",
						get sticker() {
							return gift$.sticker;
						},
						width: 24,
						height: 24,
						extraOptions: {
							play: true,
							loop: false
						}
					}), null);
					insert(_el$6, createComponent(I18nTsx, { key: "Online" }));
					className$3(_el$7, starGiftWear_module_default.body);
					insert(_el$7, createComponent(MediaHeader, {
						marginBottom: true,
						get children() {
							return [createComponent(MediaHeader.Title, {
								size: 20,
								get children() {
									return createComponent(I18nTsx, {
										key: "StarGiftWearTitle",
										get args() {
											return [getCollectibleName(gift)];
										}
									});
								}
							}), createComponent(MediaHeader.Subtitle, { get children() {
								return createComponent(I18nTsx, { key: "StarGiftWearSubtitle" });
							} })];
						}
					}), null);
					insert(_el$7, createComponent(FeatureRows, { rows: [
						{
							icon: "menu_feature_unique",
							title: createComponent(I18nTsx, { key: "StarGiftWearBenefit1Title" }),
							subtitle: createComponent(I18nTsx, { key: "StarGiftWearBenefit1Text" })
						},
						{
							icon: "menu_feature_cover",
							title: createComponent(I18nTsx, { key: "StarGiftWearBenefit2Title" }),
							subtitle: createComponent(I18nTsx, { key: "StarGiftWearBenefit2Text" })
						},
						{
							icon: "menu_verification",
							title: createComponent(I18nTsx, { key: "StarGiftWearBenefit3Title" }),
							subtitle: createComponent(I18nTsx, { key: "StarGiftWearBenefit3Text" })
						}
					] }), null);
					return _el$;
				} }),
				createComponent(PopupElement.Footer, { get children() {
					return createComponent(PopupElement.FooterButton, {
						langKey: "StarGiftWearStart",
						callback: () => {
							onWear();
							return false;
						}
					});
				} })
			];
		}
	}));
}
function openStarGiftWear(gift, peerId) {
	if (!rootScope.premium) {
		hotReloadGuard.showPremiumPopup();
		return false;
	}
	showStarGiftWearPopup({
		gift,
		peerId
	});
}
//#endregion
//#region src/components/stargifts/stargiftsGrid.tsx
var _tmpl$$16 = /*#__PURE__*/ template(`<div><div>`);
var _tmpl$2$12 = /*#__PURE__*/ template(`<div>`);
var _tmpl$3$8 = /*#__PURE__*/ template(`<div><span dir=ltr>`);
var _tmpl$4$8 = /*#__PURE__*/ template(`<div><span>`);
var _tmpl$5$6 = /*#__PURE__*/ template(`<div><img src=assets/img/anon_paid_reaction.png alt=Anonymous>`);
function StarGiftGridItem(props) {
	const profileCollections = createMemo(() => props.profileCollections ?? []);
	let containerRef;
	let stickerRef;
	onMount(() => {
		props.renderer.renderSticker(props.item.sticker, stickerRef);
		props.renderer.observeAnimated(stickerRef);
		if (props.view === "profile" && !props.hasSelection) {
			const { raw, saved, input, isIncoming, isWearing } = props.item;
			const profilePeerId = props.profilePeerId ?? rootScope.myId;
			const isEditableUniqueGift = Boolean(raw._ === "starGiftUnique" && props.canManageGifts && saved);
			const buttons = [
				{
					icon: "forward",
					text: "ShareFile",
					verify: () => raw._ === "starGiftUnique",
					onClick: () => {
						const managers = bindManagersToSession(rootScope.managers);
						showSharingPicker2Popup().then(({ peerId, threadId, monoforumThreadId }) => {
							managers.appMessagesManager.sendText({
								peerId,
								threadId,
								replyToMonoforumPeerId: monoforumThreadId,
								text: "https://t.me/nft/" + raw.slug
							});
							hotReloadGuard.appImManager.setInnerPeer({
								peerId,
								threadId,
								monoforumThreadId
							});
						});
					}
				},
				{
					icon: saved?.pFlags.pinned_to_top ? "unpin" : "pin",
					text: saved?.pFlags.pinned_to_top ? "StarGiftUnpin" : "StarGiftPin",
					verify: () => isEditableUniqueGift,
					onClick: () => {
						rootScope.managers.appGiftsManager.togglePinnedGift(input, profilePeerId);
					}
				},
				{
					icon: "link",
					text: "CopyLink",
					verify: () => raw._ === "starGiftUnique",
					onClick: () => {
						copyTextToClipboard("https://t.me/nft/" + raw.slug);
						toastNew({ langPackKey: "LinkCopied" });
					}
				},
				{
					icon: "gem_transfer",
					text: "StarGiftTransferFull",
					verify: () => isEditableUniqueGift,
					onClick: () => {
						transferStarGift(props.item);
					}
				},
				createSubmenuTrigger({
					options: {
						icon: "folder",
						text: "StarGiftCollectionsAddToCollection",
						verify: () => isEditableUniqueGift && profileCollections().length > 0
					},
					createSubmenu: () => {
						if (!saved || !input || !props.profilePeerId || !profileCollections().length) return ButtonMenuSync({ buttons: [] });
						const buttons = profileCollections().map((collection) => {
							const checkboxField = new CheckboxField({ checked: !!saved.collection_id?.includes(collection.collection_id) });
							return {
								regularText: collection.title,
								onClick: () => {
									const wasChecked = checkboxField.checked;
									checkboxField.checked = !wasChecked;
									rootScope.managers.appGiftsManager.updateCollection({
										peerId: props.profilePeerId,
										collectionId: collection.collection_id,
										[wasChecked ? "delete" : "add"]: [input]
									}).catch(() => {
										checkboxField.checked = wasChecked;
										toastNew({ langPackKey: "Error.AnError" });
									});
								},
								checkboxField,
								noCheckboxClickListener: true,
								keepOpen: true
							};
						});
						return ButtonMenuSync({ buttons });
					}
				}),
				{
					icon: isWearing ? "crownoff" : "crown",
					text: isWearing ? "StarGiftWearStopFull" : "StarGiftWearFull",
					verify: () => isEditableUniqueGift,
					onClick: () => {
						const managers = bindManagersToSession(rootScope.managers);
						if (isWearing) {
							if (profilePeerId === rootScope.myId) managers.appUsersManager.updateEmojiStatus({ _: "emojiStatusEmpty" });
							else managers.appChatsManager.updateEmojiStatus(profilePeerId.toChatId(), { _: "emojiStatusEmpty" }).catch(() => {
								toastNew({ langPackKey: "Error.AnError" });
							});
						} else openStarGiftWear(props.item, profilePeerId);
					}
				},
				{
					icon: saved.pFlags.unsaved ? "eye" : "eyecross",
					text: saved.pFlags.unsaved ? "Show" : "Hide",
					verify: () => isIncoming || isEditableUniqueGift,
					onClick: () => {
						rootScope.managers.appGiftsManager.toggleGiftHidden(input, !saved.pFlags.unsaved);
					}
				}
			];
			createContextMenu({
				listenTo: containerRef,
				buttons,
				onElementReady: () => {
					buttons.forEach((button) => button.onOpen?.());
				}
			});
		}
	});
	const ariaLabel = () => props.item.raw.title || langPack_default.format("StarGiftTitle", true);
	const isPinned = () => props.item.saved?.pFlags.pinned_to_top;
	const isPremium = () => props.view === "list" && props.item.raw._ === "starGift" && props.item.raw.pFlags.require_premium && props.item.raw.availability_remains > 0;
	const isLocked = () => props.view === "list" && props.item.raw._ === "starGift" && props.item.raw.locked_until_date > tsNow(true);
	return (() => {
		var _el$ = _tmpl$$16(), _el$2 = _el$.firstChild;
		var _ref$ = containerRef;
		typeof _ref$ === "function" ? use(_ref$, _el$) : containerRef = _el$;
		addEventListener(_el$, "keydown", buttonKeyDown, true);
		addEventListener(_el$, "click", props.onClick, true);
		className$3(_el$, classNames(stargiftsGrid_module_default.gridItem, {
			profile: stargiftsGrid_module_default.viewProfile,
			transfer: stargiftsGrid_module_default.viewTransfer,
			list: stargiftsGrid_module_default.viewList,
			resale: stargiftsGrid_module_default.viewResale
		}[props.view], isPremium() && stargiftsGrid_module_default.itemPremium));
		insert(_el$, (() => {
			var _c$ = memo(() => !!props.hasSelection);
			return () => _c$() && (Modes.a11y ? createComponent(StaticCheckbox, {
				round: true,
				"aria-hidden": "true",
				get ["class"]() {
					return stargiftsGrid_module_default.checkbox;
				},
				get checked() {
					return props.selected;
				}
			}) : createComponent(CheckboxFieldTsx, {
				round: true,
				get ["class"]() {
					return stargiftsGrid_module_default.checkbox;
				},
				get checked() {
					return props.selected;
				}
			}));
		})(), _el$2);
		insert(_el$, (() => {
			var _c$2 = memo(() => !!isPremium());
			return () => _c$2() && (() => {
				var _el$3 = _tmpl$2$12();
				createRenderEffect(() => className$3(_el$3, stargiftsGrid_module_default.itemPremiumBackground));
				return _el$3;
			})();
		})(), _el$2);
		insert(_el$, (() => {
			var _c$3 = memo(() => !!props.item.collectibleAttributes);
			return () => _c$3() && createComponent(StarGiftBackdrop, {
				get ["class"]() {
					return stargiftsGrid_module_default.itemBackdrop;
				},
				small: true,
				get backdrop() {
					return props.item.collectibleAttributes.backdrop;
				},
				get patternEmoji() {
					return props.item.collectibleAttributes.pattern.document;
				}
			});
		})(), _el$2);
		insert(_el$, (() => {
			var _c$4 = memo(() => !!(isPinned() && !props.item.resellOnlyTon));
			return () => _c$4() && createComponent(IconTsx, {
				icon: "pin2_filled",
				get ["class"]() {
					return stargiftsGrid_module_default.itemPin;
				}
			});
		})(), _el$2);
		insert(_el$, (() => {
			var _c$5 = memo(() => !!isLocked());
			return () => _c$5() && createComponent(IconTsx, {
				icon: "time_lock_filled",
				get ["class"]() {
					return stargiftsGrid_module_default.itemLock;
				}
			});
		})(), _el$2);
		insert(_el$, (() => {
			var _c$6 = memo(() => !!(props.item.resellOnlyTon && props.view !== "transfer"));
			return () => _c$6() && (() => {
				var _el$4 = _tmpl$2$12();
				insert(_el$4, createComponent(IconTsx, { icon: "gram_filled" }));
				createRenderEffect(() => className$3(_el$4, stargiftsGrid_module_default.tonIcon));
				return _el$4;
			})();
		})(), _el$2);
		insert(_el$, (() => {
			var _c$7 = memo(() => !!(props.view === "profile" && props.item.saved?.pFlags.unsaved));
			return () => _c$7() && createComponent(IconTsx, {
				icon: "hide",
				get ["class"]() {
					return stargiftsGrid_module_default.itemUnsaved;
				}
			});
		})(), _el$2);
		var _ref$2 = stickerRef;
		typeof _ref$2 === "function" ? use(_ref$2, _el$2) : stickerRef = _el$2;
		className$3(_el$2, stargiftsGrid_module_default.itemSticker);
		insert(_el$, (() => {
			var _c$8 = memo(() => !!(props.view === "list" && props.item.raw._ === "starGift"));
			return () => _c$8() && (() => {
				var _el$5 = _tmpl$3$8(), _el$6 = _el$5.firstChild;
				insert(_el$5, createComponent(StarsStar, {}), _el$6);
				insert(_el$6, (() => {
					var _c$10 = memo(() => !!(props.item.isResale && props.item.raw.resell_min_stars));
					return () => _c$10() ? `${numberThousandSplitterForStars(props.item.raw.resell_min_stars)}+` : numberThousandSplitterForStars(props.item.raw.stars);
				})());
				createRenderEffect(() => className$3(_el$5, stargiftsGrid_module_default.itemPrice));
				return _el$5;
			})();
		})(), null);
		insert(_el$, (() => {
			var _c$9 = memo(() => !!(props.item.resellPriceStars && props.view !== "transfer"));
			return () => _c$9() && (() => {
				var _el$7 = _tmpl$4$8(), _el$8 = _el$7.firstChild;
				insert(_el$7, createComponent(IconTsx, { icon: "star" }), _el$8);
				insert(_el$8, () => numberThousandSplitterForStars(props.item.resellPriceStars));
				createRenderEffect(() => className$3(_el$7, stargiftsGrid_module_default.itemPrice));
				return _el$7;
			})();
		})(), null);
		insert(_el$, (() => {
			var _c$0 = memo(() => props.view === "transfer");
			return () => _c$0() && (() => {
				var _el$9 = _tmpl$2$12();
				insert(_el$9, () => i18n("StarGiftTransferFull"));
				createRenderEffect(() => className$3(_el$9, stargiftsGrid_module_default.itemPrice));
				return _el$9;
			})();
		})(), null);
		insert(_el$, (() => {
			var _c$1 = memo(() => !!(props.view === "profile" && props.item.raw._ === "starGift" && !props.hasSelection));
			return () => _c$1() && (() => {
				var _el$0 = _tmpl$2$12();
				insert(_el$0, (() => {
					var _c$11 = memo(() => !!(props.item.saved.from_id && !props.item.saved.pFlags.name_hidden));
					return () => _c$11() ? createComponent(AvatarNewTsx, {
						get peerId() {
							return getPeerId(props.item.saved.from_id);
						},
						size: 20
					}) : (() => {
						var _el$1 = _tmpl$5$6();
						createRenderEffect(() => className$3(_el$1, stargiftsGrid_module_default.itemFromAnonymous));
						return _el$1;
					})();
				})());
				createRenderEffect(() => className$3(_el$0, stargiftsGrid_module_default.itemFrom));
				return _el$0;
			})();
		})(), null);
		insert(_el$, () => {
			const gift = props.item.raw;
			if (gift._ !== "starGift") {
				if (props.view === "profile" && props.item.resellPriceStars) return createComponent(StarGiftBadge, {
					get ["class"]() {
						return stargiftsGrid_module_default.badgeResale;
					},
					get children() {
						return i18n("StarGiftResaleBadgeProfile");
					}
				});
				return createComponent(StarGiftBadge, {
					get ["class"]() {
						return stargiftsGrid_module_default.badgeUnique;
					},
					get backdropAttr() {
						return props.item.collectibleAttributes.backdrop;
					},
					get children() {
						return memo(() => !!(isPinned() || props.view === "resale"))() ? `#${gift.num}` : i18n("StarGiftLimitedBadgeNum", [formatNumber(gift.availability_total, 1)]);
					}
				});
			}
			if (props.view === "list" && props.item.isResale) return createComponent(StarGiftBadge, {
				get ["class"]() {
					return stargiftsGrid_module_default.badgeResale;
				},
				get children() {
					return i18n("StarGiftResaleBadge");
				}
			});
			if (isPremium()) return createComponent(StarGiftBadge, {
				get ["class"]() {
					return stargiftsGrid_module_default.badgePremium;
				},
				get children() {
					return i18n("StarGiftPremiumBadge");
				}
			});
			if (props.view === "list" && gift.availability_remains === 0) return createComponent(StarGiftBadge, {
				get ["class"]() {
					return stargiftsGrid_module_default.badgeSoldout;
				},
				get children() {
					return i18n("StarGiftSoldOutBadge");
				}
			});
			if (props.item.raw.availability_total) return createComponent(StarGiftBadge, { get children() {
				return memo(() => props.view === "list")() ? i18n("StarGiftLimitedBadge") : i18n("StarGiftLimitedBadgeNum", [formatNumber(gift.availability_total, 1)]);
			} });
		}, null);
		createRenderEffect((_p$) => {
			var _v$ = rgbaToHexa(changeBrightness(getRgbColorFromTelegramColor(props.item.collectibleAttributes?.backdrop?.edge_color ?? 0), .9)), _v$2 = props.hasSelection ? "checkbox" : "button", _v$3 = props.hasSelection ? !!props.selected : void 0, _v$4 = Modes.a11y ? 0 : void 0, _v$5 = ariaLabel();
			_v$ !== _p$.e && setStyleProperty(_el$, "--overlay-color", _p$.e = _v$);
			_v$2 !== _p$.t && setAttribute(_el$, "role", _p$.t = _v$2);
			_v$3 !== _p$.a && setAttribute(_el$, "aria-checked", _p$.a = _v$3);
			_v$4 !== _p$.o && setAttribute(_el$, "tabindex", _p$.o = _v$4);
			_v$5 !== _p$.i && setAttribute(_el$, "aria-label", _p$.i = _v$5);
			return _p$;
		}, {
			e: void 0,
			t: void 0,
			a: void 0,
			o: void 0,
			i: void 0
		});
		return _el$;
	})();
}
/**
* The stickers of a grid of gifts, drawn as they come into the scrolled view (and still unless `autoplay`), and gone
* with the owner. `scrollParent` must be in the document: make it in `onMount`, or after the scroller's own ref.
*/
function createStarGiftsRenderer(options) {
	const lazyLoadQueue = new LazyLoadQueue();
	const renderer = new SuperStickerRenderer({
		regularLazyLoadQueue: lazyLoadQueue,
		group: "none",
		managers: options.managers ?? rootScope.managers,
		intersectionObserverInit: { root: options.scrollParent },
		visibleRenderOptions: {
			loop: false,
			play: options.autoplay ?? true,
			width: 120,
			height: 120
		},
		withLock: false,
		playOnHover: options.playOnHover
	});
	onCleanup(() => {
		renderer.destroy();
		lazyLoadQueue.clear();
	});
	return renderer;
}
function StarGiftsGrid(props) {
	const stickerRenderer = createStarGiftsRenderer({
		scrollParent: props.scrollParent,
		autoplay: props.autoplay,
		playOnHover: true
	});
	return (() => {
		var _el$10 = _tmpl$2$12();
		insert(_el$10, createComponent(For, {
			get each() {
				return props.items;
			},
			children: (item) => createComponent(StarGiftGridItem, {
				item,
				get view() {
					return props.view;
				},
				get profilePeerId() {
					return props.profilePeerId;
				},
				get canManageGifts() {
					return props.canManageGifts;
				},
				get profileCollections() {
					return props.profileCollections;
				},
				get hasSelection() {
					return props.selected !== void 0;
				},
				get selected() {
					return props.selected?.(item);
				},
				onClick: () => props.onClick?.(item),
				renderer: stickerRenderer
			})
		}));
		createRenderEffect(() => className$3(_el$10, classNames(stargiftsGrid_module_default.grid, props.class)));
		return _el$10;
	})();
}
delegateEvents(["click", "keydown"]);
var buyResaleGift_module_default = {
	popup: "_popup_vf7x1_16",
	confirmation: "_confirmation_vf7x1_34",
	onlyTon: "_onlyTon_vf7x1_39",
	graph: "_graph_vf7x1_47",
	messageInput: "_messageInput_vf7x1_51",
	hideNameRow: "_hideNameRow_vf7x1_56",
	starsBalance: "_starsBalance_vf7x1_60"
};
//#endregion
//#region src/components/popups/buyResaleGift.tsx
var _tmpl$$15 = /*#__PURE__*/ template(`<div>`);
var _tmpl$2$11 = /*#__PURE__*/ template(`<span>&nbsp;#`);
function showBuyResaleGiftPopup(options) {
	const { recipientId, gift: myGift } = options;
	const gift = myGift.raw;
	const [show, setShow] = createSignal(true);
	let finished = false;
	const finish = (result) => {
		finished = true;
		options.onFinish?.(result);
		setShow(false);
	};
	createPopup(() => {
		const [ton, setTon] = createSignal(myGift.resellOnlyTon ?? false);
		const isSelf = recipientId === rootScope.myId;
		const [anonymous, setAnonymous] = createSignal(isSelf);
		const [textWithEntities, setTextWithEntities] = createSignal();
		const onBuy = async () => {
			try {
				await buy();
			} catch (err) {
				console.error("buy resale gift", err);
				toastNew({ langPackKey: "Error.AnError" });
			}
			return false;
		};
		const buy = async () => {
			const popup = await createPaymentPopup({
				inputInvoice: {
					_: "inputInvoiceStarGiftResale",
					pFlags: {
						ton: ton() ? true : void 0,
						show_name: anonymous() ? void 0 : true
					},
					slug: gift.slug,
					to_id: await rootScope.managers.appPeersManager.getInputPeerById(recipientId),
					message: textWithEntities()
				},
				noShowIfStars: true,
				purpose: "stargift",
				expectedPrice: ton() ? {
					amount: myGift.resellPriceTon,
					currency: "TON"
				} : {
					amount: myGift.resellPriceStars,
					currency: "XTR"
				}
			});
			const result = await new Promise((resolve) => popup.addEventListener("finish", resolve));
			if (result === "paid" || result === "pending") finish(true);
		};
		return createComponent(PopupElement, {
			get ["class"]() {
				return buyResaleGift_module_default.popup;
			},
			closable: true,
			get show() {
				return show();
			},
			onClose: () => !finished && options.onFinish?.(false),
			get children() {
				return [createComponent(PopupElement.Body, { get children() {
					return [
						memo(() => memo(() => !!gift.pFlags.resale_ton_only)() ? (() => {
							var _el$ = _tmpl$$15();
							insert(_el$, createComponent(I18nTsx, { key: "StarGiftResaleOnlyTon" }));
							createRenderEffect(() => className$3(_el$, buyResaleGift_module_default.onlyTon));
							return _el$;
						})() : createComponent(ChipTabs, {
							get value() {
								return ton() ? "ton" : "stars";
							},
							view: "primary",
							onChange: (value) => setTon(value === "ton"),
							get children() {
								return [createComponent(ChipTab, {
									value: "stars",
									get children() {
										return createComponent(I18nTsx, { key: "StarGiftResalePayInStars" });
									}
								}), createComponent(ChipTab, {
									value: "ton",
									get children() {
										return createComponent(I18nTsx, { key: "StarGiftResalePayInTon" });
									}
								})];
							}
						})),
						createComponent(StarGiftTransferPreview, {
							"class": buyResaleGift_module_default.graph,
							gift: myGift,
							recipient: recipientId
						}),
						createComponent(MediaHeader, {
							"class": buyResaleGift_module_default.confirmation,
							align: "start",
							get children() {
								return [createComponent(MediaHeader.Title, {
									size: 20,
									get children() {
										return createComponent(I18nTsx, { key: "ConfirmPayment" });
									}
								}), createComponent(MediaHeader.Subtitle, { get children() {
									return createComponent(I18nTsx, {
										get key() {
											return recipientId !== rootScope.myId ? "StarGiftResaleBuyTextWithRecipient" : "StarGiftResaleBuyText";
										},
										get args() {
											return [
												(() => {
													var _el$2 = _tmpl$2$11(), _el$3 = _el$2.firstChild;
													insert(_el$2, () => gift.title, _el$3);
													insert(_el$2, () => numberThousandSplitter(gift.num), null);
													return _el$2;
												})(),
												ton() ? paymentsWrapCurrencyAmount(myGift.resellPriceTon, "TON", false, false, true) : paymentsWrapCurrencyAmount(myGift.resellPriceStars, "XTR", false, false, true),
												recipientId !== rootScope.myId && createComponent(PeerTitleTsx, { peerId: recipientId })
											];
										}
									});
								} })];
							}
						}),
						createComponent(InputFieldTsx, {
							"class": buyResaleGift_module_default.messageInput,
							placeholder: "StarGiftMessagePlaceholder",
							instanceRef: (input) => {
								input.input.addEventListener("input", () => {
									const value = getRichValueWithCaret(input.input, true);
									setTextWithEntities(value.value ? {
										_: "textWithEntities",
										text: value.value,
										entities: value.entities
									} : void 0);
								});
							},
							get maxLength() {
								return useAppState()[0].appConfig.stargifts_message_length_max;
							}
						}),
						createComponent(Row, {
							"class": buyResaleGift_module_default.hideNameRow,
							get children() {
								return [createComponent(Row.CheckboxFieldToggle, { get children() {
									return createComponent(CheckboxFieldTsx, {
										get checked() {
											return anonymous();
										},
										toggle: true,
										onChange: setAnonymous
									});
								} }), createComponent(Row.Title, { get children() {
									return i18n("StarGiftHideMyName");
								} })];
							}
						}),
						createComponent(FloatingStarsBalance, {
							get ["class"]() {
								return buyResaleGift_module_default.starsBalance;
							},
							get ton() {
								return ton();
							}
						})
					];
				} }), createComponent(PopupElement.Buttons, { get children() {
					return [createComponent(PopupElement.Button, {
						langKey: "StarGiftResaleBuyConfirm",
						get langArgs() {
							return [ton() ? paymentsWrapCurrencyAmount(myGift.resellPriceTon, "TON") : paymentsWrapCurrencyAmount(myGift.resellPriceStars, "XTR")];
						},
						callback: onBuy
					}), createComponent(PopupElement.Button, {
						langKey: "Cancel",
						callback: () => finish(false)
					})];
				} })];
			}
		});
	});
}
var sellStarGift_module_default = { popup: "_popup_qj6qf_16" };
var stargiftPriceInputField_module_default = {
	input: "_input_19dah_1",
	inputIcon: "_inputIcon_19dah_4",
	inputApproxLabel: "_inputApproxLabel_19dah_18"
};
//#endregion
//#region src/components/stargifts/stargiftPriceInputField.tsx
var StarGiftPriceInputFieldClass = class extends InputField {
	constructor(options) {
		super(options);
		this.container.classList.add(stargiftPriceInputField_module_default.input);
		this.input.classList.add("popup-payment-ltr-input");
		this.icon = document.createElement("div");
		this.icon.classList.add(stargiftPriceInputField_module_default.inputIcon);
		this.approxLabel = document.createElement("div");
		this.approxLabel.classList.add(stargiftPriceInputField_module_default.inputApproxLabel);
		this.container.append(this.icon, this.approxLabel);
		this.setIcon("stars");
		this.setApproxText("≈$0.00");
	}
	setIcon(icon) {
		if (icon === "ton") this.icon.replaceChildren(Icon("gram_filled"));
		else this.icon.replaceChildren(currencyStarIcon());
	}
	setApproxText(text) {
		const span = document.createElement("span");
		span.dir = "ltr";
		span.textContent = text;
		this.approxLabel.replaceChildren(span);
	}
};
function StarGiftPriceInputField(props) {
	const appConfig = useAppConfig();
	let inputRef;
	createEffect(on(() => [props.ton, props.value], ([ton, valueStr]) => {
		if (ton) {
			const float = Number(valueStr);
			const usd = appConfig.ton_usd_rate * float;
			inputRef.setApproxText(`≈${paymentsWrapCurrencyAmount(usd * 100, "USD")}`);
			return;
		}
		const value = +valueStr;
		const usd = appConfig.stars_usd_sell_rate_x1000 / 1e3 * value / 100;
		inputRef.setApproxText(`≈${paymentsWrapCurrencyAmount(usd * 100, "USD")}`);
	}));
	createEffect(on(() => props.ton, (ton, prev) => {
		if (!inputRef) return;
		inputRef.setIcon(ton ? "ton" : "stars");
		if (prev !== void 0) {
			props.onValueChange("");
			fastRaf(() => {
				inputRef.input.focus();
			});
		}
	}));
	return createComponent(InputFieldTsx, {
		InputFieldClass: StarGiftPriceInputFieldClass,
		get value() {
			return props.value;
		},
		get ["class"]() {
			return props.class;
		},
		plainText: true,
		onRawInput: (value) => {
			let cleanValue = value.replace(/,/g, ".");
			const parts = cleanValue.split(".");
			if (parts.length > 2) cleanValue = parts[0] + "." + parts.slice(1).join("");
			cleanValue = cleanValue.replace(/[^0-9.]/g, "");
			if (!props.ton) cleanValue = cleanValue.replace(/\./g, "");
			if (value !== cleanValue) inputRef.setValueSilently(cleanValue);
			props.onValueChange(cleanValue);
		},
		get label() {
			return props.label;
		},
		get errorLabel() {
			return props.errorLabel;
		},
		get errorLabelOptions() {
			return props.errorLabelOptions;
		},
		get disabled() {
			return props.disabled;
		},
		instanceRef: (ref) => {
			inputRef = ref;
			props.instanceRef?.(ref);
		}
	});
}
//#endregion
//#region src/components/popups/sellStarGift.tsx
async function showSellStarGiftPopup(options) {
	const { gift, allowUnlist } = options;
	const managers = bindManagersToSession(rootScope.managers);
	const [appConfig, floorPrice] = await Promise.all([managers.apiManager.getAppConfig(), managers.appGiftsManager.getFloorPrice(gift.raw.title)]);
	const [show, setShow] = createSignal(true);
	let finished = false;
	createPopup(() => {
		const [ton, setTon] = createSignal(gift.resellOnlyTon ?? false);
		const [sellAmount, setSellAmount] = createSignal("");
		if (gift.resellOnlyTon && gift.resellPriceTon) setSellAmount(String(nanotonToJsNumber(gift.resellPriceTon)));
		else if (gift.resellPriceStars) setSellAmount(String(gift.resellPriceStars));
		else if (floorPrice) setSellAmount(String(import_BigInteger.default.min(floorPrice, appConfig.stars_stargift_resale_amount_max)));
		const [loading, setLoading] = createSignal(false);
		const inputError = createMemo(() => {
			const sellAmount$ = sellAmount();
			if (!sellAmount$) return void 0;
			if (ton()) {
				const nanoton = parseNanotonFromDecimal(sellAmount$);
				const min = appConfig.ton_stargift_resale_amount_min;
				const max = appConfig.ton_stargift_resale_amount_max;
				if (nanoton.lt(min)) return ["StarGiftMinSellAmountTon", [formatNanoton(min)]];
				if (nanoton.gt(max)) return ["StarGiftMaxSellAmountTon", [formatNanoton(max)]];
				return;
			}
			const value = +sellAmount$;
			const min = appConfig.stars_stargift_resale_amount_min;
			const max = appConfig.stars_stargift_resale_amount_max;
			if (value < min) return ["StarGiftMinSellAmountStars", [min]];
			if (value > max) return ["StarGiftMaxSellAmountStars", [max]];
		});
		const afterCommission = createMemo(() => {
			if (ton()) {
				const nanoton = parseNanotonFromDecimal(sellAmount());
				const commission = appConfig.ton_stargift_resale_commission_permille;
				const nanotonAfter = nanoton.multiply(commission).divide(1e3).toString();
				return formatNanoton(nanotonAfter, 2);
			}
			const value = +sellAmount();
			const commission = appConfig.stars_stargift_resale_commission_permille;
			return Math.floor(value * (commission / 1e3));
		});
		const percentage = () => (ton() ? appConfig.ton_stargift_resale_commission_permille : appConfig.stars_stargift_resale_commission_permille) / 10;
		const isUnlisting = () => !sellAmount() && allowUnlist;
		let inputRef;
		const onConfirm = () => {
			setLoading(true);
			const amount = isUnlisting() ? null : ton() ? {
				_: "starsTonAmount",
				amount: parseNanotonFromDecimal(sellAmount()).toString()
			} : {
				_: "starsAmount",
				amount: +sellAmount(),
				nanos: 0
			};
			managers.appGiftsManager.updateResalePrice(gift.input, amount).then(() => {
				finished = true;
				options.onFinish?.(amount === null ? "unlist" : "list");
				setShow(false);
			}).catch(() => {
				toastNew({ langPackKey: "Error.AnError" });
				setLoading(false);
			});
		};
		return createComponent(PopupElement, {
			managers,
			get ["class"]() {
				return sellStarGift_module_default.popup;
			},
			closable: true,
			get show() {
				return show();
			},
			initialFocus: () => inputRef,
			onClose: () => !finished && options.onFinish?.("cancel"),
			get children() {
				return [
					createComponent(PopupElement.Header, { get children() {
						return [createComponent(PopupElement.CloseButton, {}), createComponent(PopupElement.Title, { title: "StarGiftSellTitlePopup" })];
					} }),
					createComponent(PopupElement.Body, { get children() {
						return [createComponent(Section, {
							get caption() {
								return createComponent(I18nTsx, {
									get key() {
										return memo(() => !!sellAmount())() ? ton() ? "StarGiftYouWillReceiveTon" : "StarGiftYouWillReceiveStars" : "StarGiftYouWillReceivePercent";
									},
									get args() {
										return memo(() => !!sellAmount())() ? [String(afterCommission()), String(percentage())] : String(percentage());
									}
								});
							},
							get children() {
								return createComponent(StarGiftPriceInputField, {
									get label() {
										return ton() ? "StarGiftSellTitleTon" : "StarGiftSellTitleStars";
									},
									get value() {
										return sellAmount();
									},
									onValueChange: setSellAmount,
									get ton() {
										return ton();
									},
									get errorLabel() {
										return inputError()?.[0];
									},
									get errorLabelOptions() {
										return inputError()?.[1];
									},
									instanceRef: (ref) => {
										inputRef = ref.input;
									},
									get disabled() {
										return loading();
									}
								});
							}
						}), createComponent(Section, {
							caption: "StarGiftOnlyAcceptTonInfo",
							get children() {
								return createComponent(Row, {
									get disabled() {
										return loading();
									},
									get children() {
										return [createComponent(Row.CheckboxField, { get children() {
											return createComponent(CheckboxFieldTsx, {
												get checked() {
													return ton();
												},
												get disabled() {
													return loading();
												},
												onChange: setTon
											});
										} }), createComponent(Row.Title, { get children() {
											return i18n("StarGiftOnlyAcceptTon");
										} })];
									}
								});
							}
						})];
					} }),
					createComponent(PopupElement.Footer, { get children() {
						return createComponent(PopupElement.FooterButton, {
							get langKey() {
								return isUnlisting() ? "StarGiftUnlistButton" : "StarGiftSellButton";
							},
							get disabled() {
								return !!inputError() || !sellAmount() && !allowUnlist;
							},
							callback: () => {
								onConfirm();
								return false;
							}
						});
					} })
				];
			}
		});
	});
}
//#endregion
//#region src/lib/appManagers/utils/gifts/updateStarGift.ts
function updateStarGift(gift, update) {
	const { unsaved, converted, resalePrice, wearing, addCollectionId, removeCollectionId } = update;
	if (unsaved !== void 0) gift.saved.pFlags.unsaved = unsaved ? true : void 0;
	if (converted !== void 0) gift.isConverted = converted;
	if (resalePrice !== void 0) {
		if (resalePrice.length === 0) {
			gift.resellPriceStars = null;
			gift.resellPriceTon = null;
			gift.resellOnlyTon = false;
			const raw = gift.raw;
			raw.pFlags.resale_ton_only = void 0;
			raw.resell_amount = void 0;
		} else {
			gift.resellOnlyTon = false;
			for (const price of resalePrice) if (price._ === "starsAmount") gift.resellPriceStars = price.amount;
			else if (price._ === "starsTonAmount") {
				gift.resellPriceTon = price.amount;
				gift.resellOnlyTon = true;
			}
			const raw = gift.raw;
			raw.pFlags.resale_ton_only = gift.resellOnlyTon ? true : void 0;
			raw.resell_amount = resalePrice;
		}
	}
	if (wearing !== void 0) gift.isWearing = wearing;
	if (addCollectionId !== void 0) {
		const ids = gift.saved.collection_id ?? [];
		if (!ids.includes(addCollectionId)) gift.saved.collection_id = [...ids, addCollectionId];
	}
	if (removeCollectionId !== void 0) {
		const ids = gift.saved.collection_id;
		if (ids) {
			gift.saved.collection_id = ids.filter((id) => id !== removeCollectionId);
			if (!gift.saved.collection_id.length) gift.saved.collection_id = void 0;
		}
	}
}
var starGiftValue_module_default = {
	popup: "_popup_1k94w_16",
	sticker: "_sticker_1k94w_27",
	value: "_value_1k94w_31",
	table: "_table_1k94w_42",
	footer: "_footer_1k94w_54"
};
//#endregion
//#region src/components/popups/starGiftValue.tsx
var _tmpl$$14 = /*#__PURE__*/ template(`<span>`);
var _tmpl$2$10 = /*#__PURE__*/ template(`<span dir=ltr>%`);
var _tmpl$3$7 = /*#__PURE__*/ template(`<div dir=auto>`);
var _tmpl$4$7 = /*#__PURE__*/ template(`<div>`);
function showStarGiftValuePopup(options) {
	const myGift = options.gift;
	const [show, setShow] = createSignal(true);
	createPopup(() => {
		const value = options.value;
		const gift = myGift.raw;
		const tableContent = createMemo(() => {
			const rows = [];
			if (value.initial_sale_date) rows.push(["StarGiftInitialSale", (() => {
				var _el$ = _tmpl$$14();
				insert(_el$, () => formatFullSentTime(value.initial_sale_date));
				return _el$;
			})()]);
			rows.push(["StarGiftInitialPrice", (() => {
				var _el$2 = _tmpl$$14();
				insert(_el$2, createComponent(StarsStar, {}), null);
				insert(_el$2, createComponent(I18nTsx, {
					key: "StarGiftInitialPriceValue",
					get args() {
						return [numberThousandSplitterForStars(value.initial_sale_stars), paymentsWrapCurrencyAmount(value.initial_sale_price, value.currency)];
					}
				}), null);
				return _el$2;
			})()]);
			if (value.last_sale_date) rows.push(["StarGiftLastSale", (() => {
				var _el$3 = _tmpl$$14();
				insert(_el$3, () => formatFullSentTime(value.last_sale_date));
				return _el$3;
			})()]);
			if (value.last_sale_price) {
				const diff = (0, import_BigInteger.default)(value.last_sale_price).minus(value.initial_sale_price).multiply(100).divide(value.initial_sale_price).toJSNumber();
				rows.push(["StarGiftLastPrice", [(() => {
					var _el$4 = _tmpl$$14();
					insert(_el$4, createComponent(StarsStar, {}), null);
					insert(_el$4, () => paymentsWrapCurrencyAmount(value.last_sale_price, value.currency), null);
					return _el$4;
				})(), createComponent(TableButton, { get children() {
					var _el$5 = _tmpl$2$10(), _el$6 = _el$5.firstChild;
					insert(_el$5, diff > 0 ? "+" : "", _el$6);
					insert(_el$5, () => Math.round(diff), _el$6);
					return _el$5;
				} })]]);
			}
			if (value.floor_price) rows.push(["StarGiftMinimumPrice", [memo(() => paymentsWrapCurrencyAmount(value.floor_price, value.currency)), createComponent(TableButtonWithTooltip, {
				get tooltipTextElement() {
					return i18n("StarGiftMinimumPriceTooltip", [paymentsWrapCurrencyAmount(value.floor_price, value.currency), gift.title]);
				},
				children: "?"
			})]]);
			if (value.average_price) rows.push(["StarGiftAveragePrice", [memo(() => paymentsWrapCurrencyAmount(value.average_price, value.currency)), createComponent(TableButtonWithTooltip, {
				get tooltipTextElement() {
					return i18n("StarGiftAveragePriceTooltip", [paymentsWrapCurrencyAmount(value.average_price, value.currency), gift.title]);
				},
				children: "?"
			})]]);
			return rows;
		});
		return createComponent(PopupElement, {
			get ["class"]() {
				return starGiftValue_module_default.popup;
			},
			closable: true,
			get show() {
				return show();
			},
			old: true,
			get containerProps() {
				return { "aria-label": i18n("StarGiftValue").textContent };
			},
			get children() {
				return [
					createComponent(PopupElement.Header, {
						floating: true,
						get children() {
							return createComponent(PopupElement.CloseButton, {});
						}
					}),
					createComponent(PopupElement.Body, { get children() {
						return [
							createComponent(StickerTsx, {
								"class": starGiftValue_module_default.sticker,
								get sticker() {
									return myGift.sticker;
								},
								width: 120,
								height: 120,
								autoStyle: true,
								extraOptions: {
									play: true,
									loop: false
								}
							}),
							(() => {
								var _el$7 = _tmpl$3$7();
								className$3(_el$7, starGiftValue_module_default.value);
								insert(_el$7, () => paymentsWrapCurrencyAmount(value.value, value.currency));
								return _el$7;
							})(),
							createComponent(MediaHeader.Subtitle, { get children() {
								return createComponent(I18nTsx, {
									get key() {
										return memo(() => !!value.pFlags.value_is_average)() ? "StarGiftValueAboutAverage" : value.pFlags.last_sale_on_fragment ? "StarGiftValueAboutLastFragment" : "StarGiftValueAboutLastTelegram";
									},
									get args() {
										return [gift.title];
									}
								});
							} }),
							(() => {
								var _el$8 = _tmpl$4$7();
								className$3(_el$8, starGiftValue_module_default.table);
								insert(_el$8, createComponent(Table, {
									get content() {
										return tableContent();
									},
									cellClass: "popup-star-gift-info-table-cell",
									get footerClass() {
										return gift._ === "starGiftUnique" ? "popup-star-gift-info-footer-unique" : void 0;
									}
								}));
								return _el$8;
							})()
						];
					} }),
					createComponent(PopupElement.Footer, {
						"class": starGiftValue_module_default.footer,
						get children() {
							return [memo(() => memo(() => !!!!value.listed_count)() && createComponent(PopupElement.FooterButton, {
								color: "secondary",
								callback: () => showSendGiftPopup({
									peerId: rootScope.myId,
									resaleParams: { giftId: gift.gift_id }
								}),
								get children() {
									return createComponent(I18nTsx, {
										key: "StarGiftViewResaleTelegram",
										get args() {
											return [(() => {
												var _el$9 = _tmpl$$14();
												insert(_el$9, () => value.listed_count, null);
												insert(_el$9, createComponent(StickerTsx, {
													get sticker() {
														return myGift.sticker;
													},
													width: 24,
													height: 24,
													autoStyle: true,
													extraOptions: { play: false }
												}), null);
												return _el$9;
											})(), createComponent(IconTsx, { icon: "next" })];
										}
									});
								}
							})), memo(() => memo(() => !!!!value.fragment_listed_count)() && createComponent(PopupElement.FooterButton, {
								color: "secondary",
								callback: () => safeWindowOpen(value.fragment_listed_url),
								get children() {
									return createComponent(I18nTsx, {
										key: "StarGiftViewResaleFragment",
										get args() {
											return [(() => {
												var _el$0 = _tmpl$$14();
												insert(_el$0, () => value.fragment_listed_count, null);
												insert(_el$0, createComponent(StickerTsx, {
													get sticker() {
														return myGift.sticker;
													},
													width: 24,
													height: 24,
													autoStyle: true,
													extraOptions: { play: false }
												}), null);
												return _el$0;
											})(), createComponent(IconTsx, { icon: "next" })];
										}
									});
								}
							}))];
						}
					})
				];
			}
		});
	});
}
//#endregion
//#region src/components/quizHint.ts
var hideQuizHint = (element, onHide, timeout) => {
	element.classList.remove("active");
	clearTimeout(timeout);
	setTimeout(() => {
		onHide?.();
		element.remove();
		if (prevQuizHint === element && prevQuizHintOnHide === onHide && prevQuizHintTimeout === timeout) {
			prevQuizHint = prevQuizHintOnHide = null;
			prevQuizHintTimeout = 0;
		}
	}, 200);
};
var prevQuizHint;
var prevQuizHintOnHide;
var prevQuizHintTimeout;
var isListenerSet = false;
var setQuizHint = (options) => {
	if (prevQuizHint) hideQuizHint(prevQuizHint, prevQuizHintOnHide, prevQuizHintTimeout);
	const element = document.createElement("div");
	element.classList.add("quiz-hint", "from-" + options.from);
	options.class && element.classList.add(options.class);
	const container = document.createElement("div");
	container.classList.add("quiz-hint-container");
	let titleEl;
	if (options.title) {
		titleEl = document.createElement("div");
		titleEl.classList.add("quiz-hint-title");
		titleEl.append(options.title);
		container.classList.add("has-title");
	}
	const textEl = document.createElement("div");
	textEl.classList.add("quiz-hint-text");
	let textRightEl;
	if (options.textRight) {
		textRightEl = document.createElement("div");
		textRightEl.classList.add("quiz-hint-text-right");
		textRightEl.append(options.textRight);
		container.classList.add("has-right-text");
	}
	container.append(...[
		options.icon && Icon(options.icon, "quiz-hint-icon"),
		titleEl,
		textEl,
		textRightEl
	].filter(Boolean));
	element.append(container);
	setInnerHTML(textEl, options.textElement);
	options.appendTo.append(element);
	element.offsetLeft;
	element.classList.add("active");
	const hide = () => {
		hideQuizHint(element, options.onHide, timeout);
	};
	prevQuizHint = element;
	prevQuizHintOnHide = options.onHide;
	const timeout = prevQuizHintTimeout = options.duration && window.setTimeout(hide, options.duration);
	options.canCloseOnPeerChange ?? (options.canCloseOnPeerChange = true);
	if (!options.canCloseOnPeerChange) element.dataset.dontCloseOnPeerChange = "1";
	if (!isListenerSet) {
		isListenerSet = true;
		hotReloadGuard.appImManager.addEventListener("peer_changed", () => {
			if (prevQuizHint && prevQuizHint.dataset.dontCloseOnPeerChange !== "1") hideQuizHint(prevQuizHint, prevQuizHintOnHide, prevQuizHintTimeout);
		});
	}
	return { hide };
};
//#endregion
//#region src/helpers/array/randomItem.ts
function randomItem(arr) {
	return arr[getUnsafeRandomInt(0, arr.length - 1)];
}
function randomItemExcept(arr, except) {
	const idx = arr.indexOf(except);
	if (idx === -1) return randomItem(arr);
	let num = getUnsafeRandomInt(0, arr.length - 1);
	if (num === idx) {
		num = idx + (Math.random() < .5 ? -1 : 1);
		if (num < 0) num = arr.length - 1;
		else if (num >= arr.length) num = 0;
	}
	return arr[num];
}
var limitLineTsx_module_default = {
	container: "_container_dt0bd_16",
	line: "_line_dt0bd_30",
	hasHint: "_hasHint_dt0bd_39",
	linePart: "_linePart_dt0bd_42",
	reverse: "_reverse_dt0bd_51",
	lineFilled: "_lineFilled_dt0bd_54",
	slider: "_slider_dt0bd_66",
	hint: "_hint_dt0bd_89",
	active: "_active_dt0bd_111",
	hintTail: "_hintTail_dt0bd_115",
	hintTailContainer: "_hintTailContainer_dt0bd_127",
	hintIcon: "_hintIcon_dt0bd_135",
	justIcon: "_justIcon_dt0bd_140"
};
//#endregion
//#region src/components/limitLineTsx.tsx
var _tmpl$$13 = /*#__PURE__*/ template(`<div>`);
var _tmpl$2$9 = /*#__PURE__*/ template(`<div><div><div>`);
function LimitLineTsx(props) {
	const [progress, setProgress] = createSignal(props.progress);
	const [hintActive, setHintActive] = createSignal(false);
	let containerRef;
	let hintRef;
	let tailRef;
	let tailContainerRef;
	const isSlider = props.onScrub !== void 0;
	const isReverse = () => props.reverse ?? false;
	const isFilledFromRight = () => isReverse() !== langPack_default.getIsRTL();
	createEffect(on(langPack_default.isRTL, () => updateHintPosition(), { defer: true }));
	onMount(() => {
		new ResizeObserver(updateHintPosition).observe(hintRef);
		doubleRaf().then(() => {
			setHintActive(true);
			updateHintPosition();
		});
	});
	function updateHintPosition() {
		const hintWidth = hintRef.clientWidth;
		const parentWidth = hintRef.parentElement.offsetWidth;
		const progress$ = progress();
		let sliderTipPosition = progress$ * parentWidth;
		if (isSlider) sliderTipPosition += 30 * (1 - progress$) - 15;
		if (isFilledFromRight()) sliderTipPosition = parentWidth - sliderTipPosition;
		const hintLeft = sliderTipPosition - hintWidth / 2;
		const hintPadding = isSlider ? 8 : 0;
		const minHintLeft = hintPadding;
		const maxHintLeft = parentWidth - hintWidth - hintPadding;
		const hintLeftClamped = clamp(hintLeft, minHintLeft, maxHintLeft);
		if (hintLeftClamped < parentWidth / 2) {
			hintRef.style.setProperty("--left", hintLeftClamped + "px");
			hintRef.style.setProperty("--right", "auto");
		} else {
			hintRef.style.setProperty("--left", "auto");
			hintRef.style.setProperty("--right", parentWidth - hintWidth - hintLeftClamped + "px");
		}
		const tailWidth = 46;
		const halfTailWidth = tailWidth / 2;
		const extra = 15;
		const extraHalf = extra / 2;
		const tailLeft = sliderTipPosition - halfTailWidth;
		let tailLeft2 = tailLeft;
		const tailLeftMin = isSlider ? -15 : -23;
		const tailLeftMax = isSlider ? parentWidth - tailWidth + extra : parentWidth;
		if (isSlider) {
			if (tailLeftMax - tailLeft < extra) tailLeft2 += lerp(0, extra, 1 - (tailLeftMax - tailLeft) / extra);
			if (tailLeft < extraHalf) tailLeft2 -= lerp(0, extra, 1 - -(-7.5 - tailLeft) / extra);
		}
		const tailLeftClamped = clamp(tailLeft2, tailLeftMin, tailLeftMax);
		tailContainerRef.style.setProperty("--tail-left", tailLeftClamped - hintLeftClamped + "px");
		tailRef.style.setProperty("--tail-left-relative", String(clamp((sliderTipPosition - hintLeftClamped) / hintWidth, 0, 1)));
		const cutoffStart = isSlider ? 8 : 0;
		const tailCutoffLeft = tailLeft2 > cutoffStart ? 0 : clamp(Math.abs(tailLeft2 - cutoffStart) / tailWidth * 100, 0, 50);
		const tailRight = parentWidth - tailLeft2 - tailWidth;
		const tailCutoffRight = tailRight > cutoffStart ? 0 : clamp(Math.abs(tailRight - cutoffStart) / tailWidth * 100, 0, 50);
		tailContainerRef.style.clipPath = `inset(0 ${tailCutoffRight}% 0 ${tailCutoffLeft}%)`;
		const borderRadius = 24;
		const roundingAt = isSlider ? 20 : 14;
		const roundingStart = borderRadius - roundingAt;
		const leftProgress = tailLeft2 < roundingAt ? Math.max(0, roundingStart + tailLeft2) / borderRadius : 1;
		const rightProgress = tailRight < roundingAt ? Math.max(0, roundingStart + tailRight) / borderRadius : 1;
		const radiusLeftBottom = leftProgress === 1 ? borderRadius : lerp(0, borderRadius, leftProgress);
		const radiusRightBottom = rightProgress === 1 ? borderRadius : lerp(0, borderRadius, rightProgress);
		hintRef.style.setProperty("--border-radius", `${borderRadius}px ${borderRadius}px ${radiusRightBottom}px ${radiusLeftBottom}px`);
	}
	let line;
	let range;
	if (isSlider) {
		range = new RangeSelector({
			step: 1e-4,
			ariaLabel: props.ariaLabel,
			min: 0,
			max: 1,
			useProperty: true,
			offsetAxisValue: 30
		}, progress());
		range.setListeners();
		range.setHandlers({ onScrub: props.onScrub });
		range.container.classList.add(limitLineTsx_module_default.line, limitLineTsx_module_default.slider);
		createEffect(() => range.setValueText(props.ariaValueText));
		line = range.container;
		if (props.filledProgressElement) onMount(() => {
			range.container.querySelector(".progress-line__filled").appendChild(props.filledProgressElement);
		});
	} else line = (() => {
		var _el$ = _tmpl$$13();
		insert(_el$, createComponent(Show, {
			get when() {
				return props.progressFrom || props.progressTo;
			},
			get children() {
				return [(() => {
					var _el$2 = _tmpl$$13();
					insert(_el$2, () => props.progressFrom, null);
					insert(_el$2, () => props.progressTo, null);
					createRenderEffect(() => className$3(_el$2, classNames(limitLineTsx_module_default.linePart, props.progressClass)));
					return _el$2;
				})(), (() => {
					var _el$3 = _tmpl$$13();
					insert(_el$3, () => props.progressFrom, null);
					insert(_el$3, () => props.progressTo, null);
					createRenderEffect(() => className$3(_el$3, classNames(`${limitLineTsx_module_default.linePart} ${limitLineTsx_module_default.lineFilled}`, props.progressFilledClass)));
					return _el$3;
				})()];
			}
		}));
		createRenderEffect(() => className$3(_el$, limitLineTsx_module_default.line));
		return _el$;
	})();
	createEffect(on(() => props.progress, (val, prev) => {
		if (prev !== void 0 && liteMode.isAvailable("motion") && !isSlider && props.animateProgress !== false) {
			const duration = 200;
			const startTime = performance.now();
			const diff = val - prev;
			animateSingle(() => {
				const v = clamp((performance.now() - startTime) / duration, 0, 1);
				const value = prev + easeInOutSineApply(v, 1) * diff;
				setProgress(value);
				updateHintPosition();
				return v < 1;
			}, containerRef);
		} else {
			setProgress(val);
			updateHintPosition();
			range?.setProgress(val);
		}
	}));
	return (() => {
		var _el$4 = _tmpl$$13();
		var _ref$ = containerRef;
		typeof _ref$ === "function" ? use(_ref$, _el$4) : containerRef = _el$4;
		insert(_el$4, createComponent(Show, {
			get when() {
				return "hint" in props || props.hintIcon;
			},
			get children() {
				var _el$5 = _tmpl$2$9(), _el$6 = _el$5.firstChild, _el$7 = _el$6.firstChild;
				var _ref$2 = hintRef;
				typeof _ref$2 === "function" ? use(_ref$2, _el$5) : hintRef = _el$5;
				insert(_el$5, (() => {
					var _c$ = memo(() => !!props.hintIcon);
					return () => _c$() && createComponent(IconTsx, {
						get icon() {
							return props.hintIcon;
						},
						get ["class"]() {
							return limitLineTsx_module_default.hintIcon;
						}
					});
				})(), _el$6);
				insert(_el$5, () => props.hint, _el$6);
				var _ref$3 = tailContainerRef;
				typeof _ref$3 === "function" ? use(_ref$3, _el$6) : tailContainerRef = _el$6;
				var _ref$4 = tailRef;
				typeof _ref$4 === "function" ? use(_ref$4, _el$7) : tailRef = _el$7;
				createRenderEffect((_p$) => {
					var _v$ = classNames(limitLineTsx_module_default.hint, hintActive() && limitLineTsx_module_default.active), _v$2 = limitLineTsx_module_default.hintTailContainer, _v$3 = limitLineTsx_module_default.hintTail;
					_v$ !== _p$.e && className$3(_el$5, _p$.e = _v$);
					_v$2 !== _p$.t && className$3(_el$6, _p$.t = _v$2);
					_v$3 !== _p$.a && className$3(_el$7, _p$.a = _v$3);
					return _p$;
				}, {
					e: void 0,
					t: void 0,
					a: void 0
				});
				return _el$5;
			}
		}), null);
		insert(_el$4, line, null);
		createRenderEffect((_p$) => {
			var _v$4 = classNames(limitLineTsx_module_default.container, props.hintJustIcon && limitLineTsx_module_default.justIcon, ("hint" in props || props.hintIcon) && limitLineTsx_module_default.hasHint, isReverse() && limitLineTsx_module_default.reverse, props.class), _v$5 = progress() * 100 + "%";
			_v$4 !== _p$.e && className$3(_el$4, _p$.e = _v$4);
			_v$5 !== _p$.t && setStyleProperty(_el$4, "--limit-progress", _p$.t = _v$5);
			return _p$;
		}, {
			e: void 0,
			t: void 0
		});
		return _el$4;
	})();
}
var starGiftUpgradePrice_module_default = {
	popup: "_popup_1afsy_1",
	popupContainer: "_popupContainer_1afsy_5",
	scrollableContent: "_scrollableContent_1afsy_10",
	limitLine: "_limitLine_1afsy_17",
	limitLineHint: "_limitLineHint_1afsy_25",
	table: "_table_1afsy_32",
	tableKeyCell: "_tableKeyCell_1afsy_35",
	tableValue: "_tableValue_1afsy_38",
	about: "_about_1afsy_48"
};
//#endregion
//#region src/helpers/easing/easeOutCirc.ts
function easeOutCircApply(v, c) {
	return c * Math.sqrt(1 - --v * v);
}
//#endregion
//#region src/helpers/solid/createCurrentTime.ts
function createCurrentTime(options = {}) {
	const { fn = tsNow, updateInterval = 3e4, updateWrapper } = options;
	const [time, setTime] = createSignal(fn());
	const interval = setInterval(updateWrapper ? () => {
		updateWrapper(() => setTime(fn()));
	} : () => {
		setTime(fn());
	}, updateInterval);
	onCleanup(() => clearInterval(interval));
	return time;
}
//#endregion
//#region src/components/popups/starGiftUpgradePrice.tsx
var _tmpl$$12 = /*#__PURE__*/ template(`<div>`);
var _tmpl$2$8 = /*#__PURE__*/ template(`<span>`);
function createStarGiftUpgradePricePopup(props) {
	const [show, setShow] = createSignal(false);
	let minPrice = Infinity;
	let maxPrice = 0;
	for (const price of props.preview.prices) {
		const val = Number(price.upgrade_stars);
		if (val < minPrice) minPrice = val;
		if (val > maxPrice) maxPrice = val;
	}
	const now = createCurrentTime({
		fn: () => tsNow(true),
		updateInterval: 1e3
	});
	const currentPriceNext = createMemo(() => {
		const now$ = now();
		for (let i = props.preview.next_prices.length - 1; i >= 0; i--) if (props.preview.next_prices[i].date <= now$) return props.preview.next_prices[i];
		return props.preview.next_prices[0];
	});
	const progress = () => easeOutCircApply((Number(currentPriceNext().upgrade_stars) - minPrice) / (maxPrice - minPrice), 1);
	const currentPriceIdx = createMemo(() => {
		const now$ = now();
		for (let i = props.preview.prices.length - 1; i >= 0; i--) if (props.preview.prices[i].date <= now$) return i;
		return 0;
	});
	const futurePrices = createMemo(() => props.preview.prices.slice(currentPriceIdx()));
	function formatDateTime(unix) {
		const date = /* @__PURE__ */ new Date(unix * 1e3);
		return [
			memo(() => formatTime(date)),
			", ",
			memo(() => new langPack_default.IntlDateElement({
				date,
				options: {
					month: "short",
					day: "numeric"
				}
			}).element)
		];
	}
	return createPopup(() => {
		onMount(() => fastRaf(() => setShow(true)));
		return createComponent(PopupElement, {
			get ["class"]() {
				return starGiftUpgradePrice_module_default.popup;
			},
			get containerClass() {
				return starGiftUpgradePrice_module_default.popupContainer;
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
					createComponent(PopupElement.Scrollable, { get children() {
						return createComponent(PopupElement.Body, { get children() {
							var _el$ = _tmpl$$12();
							insert(_el$, createComponent(LimitLineTsx, {
								get ["class"]() {
									return starGiftUpgradePrice_module_default.limitLine;
								},
								get progress() {
									return progress();
								},
								get progressTo() {
									return createComponent(I18nTsx, {
										key: "StarsCount",
										get args() {
											return [String(maxPrice)];
										}
									});
								},
								get progressFrom() {
									return createComponent(I18nTsx, {
										key: "StarsCount",
										get args() {
											return [String(minPrice)];
										}
									});
								},
								reverse: true,
								get hint() {
									return (() => {
										var _el$2 = _tmpl$2$8();
										insert(_el$2, () => currentPriceNext().upgrade_stars);
										createRenderEffect(() => className$3(_el$2, starGiftUpgradePrice_module_default.limitLineHint));
										return _el$2;
									})();
								},
								hintIcon: "star"
							}), null);
							insert(_el$, createComponent(MediaHeader, { get children() {
								return [createComponent(MediaHeader.Title, { get children() {
									return createComponent(I18nTsx, { key: "StarGiftUpgradePriceTitle" });
								} }), createComponent(MediaHeader.Subtitle, { get children() {
									return createComponent(I18nTsx, { key: "StarGiftUpgradePriceSubtitle" });
								} })];
							} }), null);
							insert(_el$, createComponent(Table, {
								get ["class"]() {
									return starGiftUpgradePrice_module_default.table;
								},
								get keyCellClass() {
									return starGiftUpgradePrice_module_default.tableKeyCell;
								},
								get content() {
									return futurePrices().map((it) => [(() => {
										var _el$3 = _tmpl$2$8();
										insert(_el$3, () => formatDateTime(it.date));
										return _el$3;
									})(), (() => {
										var _el$4 = _tmpl$2$8();
										insert(_el$4, createComponent(StarsStar, {}), null);
										insert(_el$4, () => numberThousandSplitterForStars(it.upgrade_stars), null);
										createRenderEffect(() => className$3(_el$4, starGiftUpgradePrice_module_default.tableValue));
										return _el$4;
									})()]);
								}
							}), null);
							insert(_el$, createComponent(I18nTsx, {
								key: "StarGiftUpgradePriceAbout",
								get ["class"]() {
									return starGiftUpgradePrice_module_default.about;
								}
							}), null);
							createRenderEffect(() => className$3(_el$, starGiftUpgradePrice_module_default.scrollableContent));
							return _el$;
						} });
					} }),
					createComponent(PopupElement.Footer, { get children() {
						return createComponent(PopupElement.FooterButton, {
							iconLeft: "okay_filled",
							langKey: "StarGiftUpgradePriceUnderstood",
							callback: () => setShow(false)
						});
					} })
				];
			}
		});
	});
}
//#endregion
//#region src/components/popups/starGiftUpgrade.tsx
var _tmpl$$11 = /*#__PURE__*/ template(`<div class=popup-star-gift-upgrade-container><div class=popup-star-gift-upgrade-body>`);
var _tmpl$2$7 = /*#__PURE__*/ template(`<div class=popup-star-gift-upgrade-footer>`);
var _tmpl$3$6 = /*#__PURE__*/ template(`<span class=popup-star-gift-upgrade-price-wrap>`);
var _tmpl$4$6 = /*#__PURE__*/ template(`<div class=popup-star-gift-upgrade-price-decrease-link>`);
async function createStarGiftUpgradePopup(props) {
	const managers = bindManagersToSession(rootScope.managers);
	const [preview, peerTitle] = await Promise.all([rootScope.managers.appGiftsManager.getUpgradePreview(props.gift.raw.id), props.descriptionForPeerId ? wrapPeerTitle({ peerId: props.descriptionForPeerId }) : void 0]);
	const [show, setShow] = createSignal(true);
	let upgradePromise;
	const freeUpgrade = props.gift.isUpgradedBySender;
	const canPrepay = props.gift.saved?.prepaid_upgrade_hash !== void 0;
	const keepInfoSignal = createSignal(true);
	const [model, setModel] = createSignal();
	const [backdrop, setBackdrop] = createSignal();
	const [pattern, setPattern] = createSignal();
	const randomize = () => {
		setModel((v) => randomItemExcept(preview.models, v));
		setBackdrop((v) => randomItemExcept(preview.backdrops, v));
		setPattern((v) => randomItemExcept(preview.patterns, v));
	};
	randomize();
	const onPaymentFormError = (err) => {
		toastError(err, "star gift upgrade form error");
		return false;
	};
	async function handleUpgrade() {
		const managers = bindManagersToSession(rootScope.managers);
		if (props.descriptionForPeerId && canPrepay) {
			const deferred = deferredPromise();
			createPaymentPopup({
				inputInvoice: {
					_: "inputInvoiceStarGiftPrepaidUpgrade",
					hash: props.gift.saved?.prepaid_upgrade_hash,
					peer: await managers.appPeersManager.getInputPeerById(props.descriptionForPeerId)
				},
				noShowIfStars: true
			}).then((popup) => {
				popup.addEventListener("finish", (result) => {
					deferred.resolve(result === "paid");
				});
			}, (err) => deferred.resolve(onPaymentFormError(err)));
			return deferred;
		}
		upgradePromise = deferredPromise();
		if (freeUpgrade) {
			await managers.appGiftsManager.upgradeStarGift(props.gift.input, keepInfoSignal[0]());
			return upgradePromise;
		}
		createPaymentPopup({
			inputInvoice: {
				_: "inputInvoiceStarGiftUpgrade",
				stargift: props.gift.input,
				pFlags: { keep_original_details: keepInfoSignal[0]() ? true : void 0 }
			},
			noShowIfStars: true
		}).then((popup) => {
			popup.addEventListener("finish", (result) => {
				if (result !== "paid") upgradePromise.resolve(false);
			});
		}, (err) => upgradePromise.resolve(onPaymentFormError(err)));
		return upgradePromise;
	}
	const now = createCurrentTime({
		fn: () => tsNow(true),
		updateInterval: 1e3
	});
	const [nextPrices, setNextPrices] = createSignal(preview.next_prices);
	const currentPriceIdx = createMemo(() => {
		const now$ = now();
		const nextPrices$ = nextPrices();
		for (let i = nextPrices$.length - 1; i >= 0; i--) if (nextPrices$[i].date <= now$) return i;
		return 0;
	});
	const hasFuturePrices = () => currentPriceIdx() < nextPrices().length - 1;
	const currentPrice = () => nextPrices()[currentPriceIdx()];
	const currentPriceRemains = () => {
		const nextPrice = nextPrices()[currentPriceIdx() + 1];
		return nextPrice ? nextPrice.date - now() : 0;
	};
	const priceCounter = new AnimatedCounter({
		reverse: true,
		duration: 1e3
	});
	createEffect(() => priceCounter.setCount(Number(currentPrice().upgrade_stars)));
	createPopup(() => {
		const middleware = createMiddleware();
		createEffect(() => {
			const model$ = model();
			wrapSticker({
				doc: model$.document,
				div: stickerContainer,
				width: 120,
				height: 120,
				play: true,
				loop: false,
				middleware: middleware.get()
			}).then(({ render }) => render).then((player_) => {
				const player = player_;
				player.playOrRestart();
				player.addEventListener("enterFrame", (frameNo) => {
					if (frameNo === player.maxFrame) {
						player.stop(false);
						randomize();
					}
				});
			});
		});
		subscribeOn(rootScope)("star_gift_upgrade", (event) => {
			if (!upgradePromise) return;
			if (!(event.savedId === props.gift.saved?.saved_id || event.fromMsgId === props.gift.saved?.msg_id)) return;
			showStarGiftInfoPopup({
				gift: event.gift,
				upgradeAnimation: preview
			});
			upgradePromise.resolve(true);
		});
		let stickerContainer;
		return createComponent(PopupElement, {
			managers,
			"class": "popup-star-gift-upgrade",
			get show() {
				return show();
			},
			old: true,
			get children() {
				return [
					createComponent(PopupElement.Header, {
						floating: true,
						get children() {
							return createComponent(PopupElement.CloseButton, { "class": "popup-star-gift-upgrade-close" });
						}
					}),
					createComponent(PopupElement.Body, { get children() {
						var _el$ = _tmpl$$11(), _el$2 = _el$.firstChild;
						insert(_el$, createComponent(MediaHeader, {
							"class": "popup-star-gift-upgrade-header",
							onBackdrop: true,
							get children() {
								return [
									createComponent(MediaHeader.Backdrop, { get children() {
										return createComponent(StarGiftBackdrop, {
											get backdrop() {
												return backdrop();
											},
											get patternEmoji() {
												return pattern().document;
											}
										});
									} }),
									createComponent(MediaHeader.Sticker, {
										size: 120,
										ref(r$) {
											var _ref$ = stickerContainer;
											typeof _ref$ === "function" ? _ref$(r$) : stickerContainer = r$;
										}
									}),
									createComponent(MediaHeader.Title, { get children() {
										return i18n(props.descriptionForPeerId ? "StarGiftUpgradeTitleFor" : "StarGiftUpgradeTitle");
									} }),
									createComponent(MediaHeader.Subtitle, { get children() {
										return i18n(props.descriptionForPeerId ? "StarGiftUpgradeSubtitleFor" : "StarGiftUpgradeSubtitle", [peerTitle]);
									} })
								];
							}
						}), _el$2);
						insert(_el$2, createComponent(FeatureRows, { get rows() {
							return [
								{
									icon: "gem",
									title: createComponent(I18nTsx, { key: "StarGiftUpgradeUniqueTitle" }),
									subtitle: createComponent(I18nTsx, {
										get key() {
											return props.descriptionForPeerId ? "StarGiftUpgradeUniqueTextPrepaid" : "StarGiftUpgradeUniqueText";
										},
										get args() {
											return memo(() => !!props.descriptionForPeerId)() ? [peerTitle.cloneNode(true)] : [];
										}
									})
								},
								{
									icon: "gem_exchange",
									title: createComponent(I18nTsx, { key: "StarGiftUpgradeTransferableTitle" }),
									subtitle: createComponent(I18nTsx, {
										get key() {
											return props.descriptionForPeerId ? "StarGiftUpgradeTransferableTextPrepaid" : "StarGiftUpgradeTransferableText";
										},
										get args() {
											return memo(() => !!props.descriptionForPeerId)() ? [peerTitle.cloneNode(true)] : [];
										}
									})
								},
								{
									icon: "trade",
									title: createComponent(I18nTsx, { key: "StarGiftUpgradeTradableTitle" }),
									subtitle: createComponent(I18nTsx, {
										get key() {
											return props.descriptionForPeerId ? "StarGiftUpgradeTradableTextPrepaid" : "StarGiftUpgradeTradableText";
										},
										get args() {
											return memo(() => !!props.descriptionForPeerId)() ? [peerTitle.cloneNode(true)] : [];
										}
									})
								}
							];
						} }));
						insert(_el$, (() => {
							var _c$ = memo(() => !!!props.descriptionForPeerId);
							return () => _c$() && (() => {
								var _el$3 = _tmpl$2$7();
								insert(_el$3, createComponent(Row, { get children() {
									return [createComponent(Row.CheckboxField, { get children() {
										return createComponent(CheckboxFieldTsx, { signal: keepInfoSignal });
									} }), createComponent(Row.Title, { get children() {
										return i18n("StarGiftUpgradeKeepInfo");
									} })];
								} }));
								return _el$3;
							})();
						})(), null);
						return _el$;
					} }),
					createComponent(PopupElement.Footer, { get children() {
						return [memo(() => memo(() => !!(props.descriptionForPeerId && !canPrepay))() ? createComponent(PopupElement.FooterButton, {
							langKey: "OK",
							callback: () => setShow(false)
						}) : createComponent(PopupElement.FooterButton, {
							callback: handleUpgrade,
							get children() {
								return [createComponent(I18nTsx, {
									get key() {
										return freeUpgrade ? "StarGiftUpgradeFree" : props.descriptionForPeerId ? "StarGiftUpgradePrepaid" : "StarGiftUpgrade";
									},
									get args() {
										return freeUpgrade ? [] : [(() => {
											var _el$4 = _tmpl$3$6();
											insert(_el$4, createComponent(IconTsx, {
												icon: "star",
												"class": "currency-star-icon"
											}), null);
											insert(_el$4, () => priceCounter.container, null);
											return _el$4;
										})()];
									}
								}), memo(() => memo(() => !!(!freeUpgrade && hasFuturePrices()))() && createComponent(I18nTsx, {
									"class": "popup-star-gift-upgrade-price-decrease",
									key: "StarGiftPriceDecrease",
									get args() {
										return [wrapLeftDuration(currentPriceRemains())];
									}
								}))];
							}
						})), memo(() => memo(() => !!(hasFuturePrices() && !canPrepay))() && (() => {
							var _el$5 = _tmpl$4$6();
							_el$5.$$click = () => createStarGiftUpgradePricePopup({ preview });
							insert(_el$5, createComponent(I18nTsx, { key: "StarGiftPriceDecreaseLink" }), null);
							insert(_el$5, createComponent(IconTsx, { icon: "next" }), null);
							return _el$5;
						})())];
					} })
				];
			}
		});
	});
}
delegateEvents(["click"]);
var confetti_module_default = {
	container: "_container_15qcy_1",
	canvas: "_canvas_15qcy_10"
};
//#endregion
//#region src/components/confetti.tsx
var _tmpl$$10 = /*#__PURE__*/ template(`<div><canvas>`);
var COLORS = [
	"#FF8724",
	"#CD89D0",
	"#1E9AFF",
	"#56CE6B",
	"#E8BC2C"
];
var GRAVITY = 800;
var AIR_RESISTANCE = .98;
function createParticle(x, y, vx, vy, size) {
	return {
		x,
		y,
		vx,
		vy,
		color: COLORS[Math.floor(Math.random() * COLORS.length)],
		shape: Math.random() > .5 ? "circle" : "pill",
		size: size + Math.random() * size,
		rotation: Math.random() * Math.PI * 2,
		rotationSpeed: (Math.random() - .5) * .3,
		flickerFrequency: .05 + Math.random() * .1
	};
}
function drawParticle(ctx, particle, frameCount) {
	const { x, y, color, shape, size, rotation, flickerFrequency } = particle;
	const opacity = .7 + .3 * Math.abs(Math.sin(frameCount * flickerFrequency));
	ctx.save();
	ctx.translate(x, y);
	ctx.rotate(rotation);
	ctx.globalAlpha = opacity;
	ctx.fillStyle = color;
	if (shape === "circle") {
		ctx.beginPath();
		ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
		ctx.fill();
	} else {
		const width = size * .5;
		const height = size * 1.5;
		const radius = width / 2;
		ctx.beginPath();
		ctx.moveTo(-width / 2, -height / 2 + radius);
		ctx.arcTo(-width / 2, -height / 2, 0, -height / 2, radius);
		ctx.arcTo(width / 2, -height / 2, width / 2, -height / 2 + radius, radius);
		ctx.lineTo(width / 2, height / 2 - radius);
		ctx.arcTo(width / 2, height / 2, 0, height / 2, radius);
		ctx.arcTo(-width / 2, height / 2, -width / 2, height / 2 - radius, radius);
		ctx.closePath();
		ctx.fill();
	}
	ctx.restore();
}
function ConfettiContainer(props) {
	let canvas;
	let ctx;
	const particles = [];
	let frameCount = 0;
	let lastTime = 0;
	let animationId = null;
	let width = 0;
	let height = 0;
	let dpr = 1;
	const resizeCanvas = () => {
		const rect = canvas.parentElement.getBoundingClientRect();
		dpr = window.devicePixelRatio || 1;
		width = rect.width;
		height = rect.height;
		canvas.width = width * dpr;
		canvas.height = height * dpr;
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.scale(dpr, dpr);
	};
	const animate = (currentTime) => {
		if (lastTime === 0) lastTime = currentTime;
		const dt = (currentTime - lastTime) / 1e3;
		lastTime = currentTime;
		frameCount++;
		ctx.clearRect(0, 0, width, height);
		for (let i = particles.length - 1; i >= 0; i--) {
			const p = particles[i];
			p.vy += GRAVITY * dt;
			p.vx *= AIR_RESISTANCE;
			p.x += p.vx * dt;
			p.y += p.vy * dt;
			p.rotation += p.rotationSpeed;
			if (p.y > height + 50) {
				particles.splice(i, 1);
				continue;
			}
			drawParticle(ctx, p, frameCount);
		}
		if (particles.length > 0) animationId = requestAnimationFrame(animate);
		else {
			props.onEnd?.();
			animationId = null;
		}
	};
	const startAnimation = () => {
		if (animationId !== null) return;
		lastTime = 0;
		animationId = requestAnimationFrame(animate);
	};
	const create = (options) => {
		const { mode } = options;
		resizeCanvas();
		if (mode === "poppers") {
			const { size = 6, speedScale = 1, count = 100 } = options;
			const leftSpawnX = -10;
			const rightSpawnX = width + 10;
			const spawnY = height / 2;
			const spawnSpread = 50;
			for (let i = 0; i < count / 2; i++) {
				const leftAngle = -Math.PI / 4 + (Math.random() - .5) * Math.PI / 3;
				const leftSpeed = (500 + Math.random() * 400) * speedScale;
				particles.push(createParticle(leftSpawnX, spawnY + (Math.random() - .5) * spawnSpread, Math.cos(leftAngle) * leftSpeed, Math.sin(leftAngle) * leftSpeed, size));
				const rightAngle = -Math.PI * 3 / 4 + (Math.random() - .5) * Math.PI / 3;
				const rightSpeed = (500 + Math.random() * 400) * speedScale;
				particles.push(createParticle(rightSpawnX, spawnY + (Math.random() - .5) * spawnSpread, Math.cos(rightAngle) * rightSpeed, Math.sin(rightAngle) * rightSpeed, size));
			}
		}
		startAnimation();
		return () => {
			particles.length = 0;
			if (animationId !== null) {
				cancelAnimationFrame(animationId);
				animationId = null;
			}
			ctx.clearRect(0, 0, width, height);
		};
	};
	const setContainerRef = (el) => {
		props.ref({
			canvas: el,
			create
		});
	};
	const setCanvasRef = (el) => {
		canvas = el;
		ctx = el.getContext("2d");
	};
	onCleanup(() => {
		if (animationId !== null) cancelAnimationFrame(animationId);
	});
	return (() => {
		var _el$ = _tmpl$$10(), _el$2 = _el$.firstChild;
		use(setContainerRef, _el$);
		use(setCanvasRef, _el$2);
		createRenderEffect((_p$) => {
			var _v$ = classNames(confetti_module_default.container, props.class), _v$2 = confetti_module_default.canvas;
			_v$ !== _p$.e && className$3(_el$, _p$.e = _v$);
			_v$2 !== _p$.t && className$3(_el$2, _p$.t = _v$2);
			return _p$;
		}, {
			e: void 0,
			t: void 0
		});
		return _el$;
	})();
}
var createStarGiftOffer_module_default = {
	popup: "_popup_6rlcm_16",
	balance: "_balance_6rlcm_21",
	input: "_input_6rlcm_29",
	chipTabs: "_chipTabs_6rlcm_33"
};
//#endregion
//#region src/components/popups/createStarGiftOffer.tsx
async function showCreateStarGiftOfferPopup(options) {
	const managers = bindManagersToSession(rootScope.managers);
	const gift = options.gift.raw;
	const peerTitle = await wrapPeerTitle({
		peerId: getPeerId(gift.owner_id),
		onlyFirstName: true
	});
	const [show, setShow] = createSignal(true);
	return createPopup(() => {
		const appConfig = useAppConfig();
		const [ton, setTon] = createSignal(false);
		const [offerAmount, setOfferAmount] = createSignal("");
		const [offerDuration, setOfferDuration] = createSignal(86400);
		const [durationSelectOpen, setDurationSelectOpen] = createSignal(false);
		const durationOptions = [
			{
				value: 21600,
				label: () => i18n("Hours", [6])
			},
			{
				value: 43200,
				label: () => i18n("Hours", [12])
			},
			{
				value: 86400,
				label: () => i18n("Hours", [24])
			},
			{
				value: 129600,
				label: () => i18n("Hours", [36])
			},
			{
				value: 172800,
				label: () => i18n("Hours", [48])
			},
			{
				value: 259200,
				label: () => i18n("Hours", [72])
			}
		];
		let isCreated = false;
		let inputRef;
		let durationRowRef;
		const handleSubmit = async () => {
			const starsAmount = ton() ? {
				_: "starsTonAmount",
				amount: parseNanotonFromDecimal(offerAmount()).toString()
			} : {
				_: "starsAmount",
				amount: +offerAmount(),
				nanos: 0
			};
			try {
				await rootScope.managers.appGiftsManager.createGiftOffer({
					peerId: getPeerId(gift.owner_id),
					slug: gift.slug,
					amount: starsAmount,
					duration: offerDuration()
				});
				isCreated = true;
				options.onFinish?.("created");
			} catch (err) {
				if (err.type === "BALANCE_TOO_LOW") hotReloadGuard.showStarsPopup({
					itemPrice: starsAmount.amount,
					ton: ton(),
					onTopup: async () => {
						await handleSubmit();
					},
					purpose: "stargift"
				});
			}
		};
		const limits = createMemo(() => {
			const minStars = gift.offer_min_stars;
			const maxStars = Math.max(minStars * 2, appConfig.stars_stargift_resale_amount_max);
			const minStarsUsd = appConfig.stars_usd_sell_rate_x1000 / 1e3 * minStars / 100;
			const minTonFromStars = parseNanotonFromDecimal(String(minStarsUsd / appConfig.ton_usd_rate));
			const minTonFromConfig = (0, import_BigInteger.default)(appConfig.ton_stargift_resale_amount_min);
			const minTon = import_BigInteger.default.max(minTonFromStars, minTonFromConfig);
			return {
				minStars,
				maxStars,
				minTon,
				maxTon: import_BigInteger.default.max(minTon.multiply(2), appConfig.ton_stargift_resale_amount_max)
			};
		});
		const inputError = createMemo(() => {
			const offerAmount$ = offerAmount();
			if (!offerAmount$) return void 0;
			const { minStars, maxStars, minTon, maxTon } = limits();
			if (ton()) {
				const nanoton = parseNanotonFromDecimal(offerAmount$);
				if (nanoton.lt(minTon)) return ["StarGiftMinSellAmountTon", [formatNanoton(minTon)]];
				if (nanoton.gt(maxTon)) return ["StarGiftMaxSellAmountTon", [formatNanoton(maxTon)]];
				return;
			}
			const value = +offerAmount$;
			if (value < minStars) return ["StarGiftMinSellAmountStars", [minStars]];
			if (value > maxStars) return ["StarGiftMaxSellAmountStars", [maxStars]];
		});
		return createComponent(PopupElement, {
			managers,
			get ["class"]() {
				return createStarGiftOffer_module_default.popup;
			},
			get show() {
				return show();
			},
			initialFocus: () => inputRef,
			closable: true,
			onClose: () => {
				if (!isCreated) options.onFinish?.("cancel");
			},
			get children() {
				return [
					createComponent(FloatingStarsBalance, {
						get ["class"]() {
							return createStarGiftOffer_module_default.balance;
						},
						get ton() {
							return ton();
						}
					}),
					createComponent(PopupElement.Header, { get children() {
						return [createComponent(PopupElement.CloseButton, {}), createComponent(PopupElement.Title, { get children() {
							return createComponent(I18nTsx, { key: "StarGiftOffer.CreateOfferTitle" });
						} })];
					} }),
					createComponent(PopupElement.Body, { get children() {
						return [createComponent(Section, {
							get caption() {
								return ton() ? "StarGiftOffer.CreateOfferSubtitleTON" : "StarGiftOffer.CreateOfferSubtitleStars";
							},
							get captionArgs() {
								return [getCollectibleName(gift)];
							},
							get children() {
								return [createComponent(ChipTabs, {
									get ["class"]() {
										return createStarGiftOffer_module_default.chipTabs;
									},
									get value() {
										return ton() ? "ton" : "stars";
									},
									view: "primary",
									onChange: (value) => setTon(value === "ton"),
									get children() {
										return [createComponent(ChipTab, {
											value: "stars",
											get children() {
												return createComponent(I18nTsx, { key: "StarGiftOffer.CreateOfferStars" });
											}
										}), createComponent(ChipTab, {
											value: "ton",
											get children() {
												return createComponent(I18nTsx, { key: "StarGiftOffer.CreateOfferTON" });
											}
										})];
									}
								}), createComponent(StarGiftPriceInputField, {
									get ["class"]() {
										return createStarGiftOffer_module_default.input;
									},
									get ton() {
										return ton();
									},
									get label() {
										return ton() ? "StarGiftOffer.CreateOfferPlaceholderTON" : "StarGiftOffer.CreateOfferPlacholderStars";
									},
									get value() {
										return offerAmount();
									},
									onValueChange: setOfferAmount,
									get errorLabel() {
										return inputError()?.[0];
									},
									get errorLabelOptions() {
										return inputError()?.[1];
									},
									instanceRef: (ref) => {
										inputRef = ref.input;
									}
								})];
							}
						}), createComponent(Section, {
							get caption() {
								return ton() ? "StarGiftOffer.OfferDurationDescriptionTON" : "StarGiftOffer.OfferDurationDescriptionStars";
							},
							captionArgs: [peerTitle],
							get children() {
								return createComponent(Row, {
									ref(r$) {
										var _ref$ = durationRowRef;
										typeof _ref$ === "function" ? _ref$(r$) : durationRowRef = r$;
									},
									clickable: () => setDurationSelectOpen((v) => !v),
									get children() {
										return [createComponent(Row.Title, { get children() {
											return createComponent(I18nTsx, { key: "StarGiftOffer.OfferDuration" });
										} }), createComponent(Row.RightContent, { get children() {
											return createComponent(InlineSelect, {
												get value() {
													return offerDuration();
												},
												onChange: setOfferDuration,
												options: durationOptions,
												parent: durationRowRef,
												get isOpen() {
													return durationSelectOpen();
												},
												onClose: () => setDurationSelectOpen(false)
											});
										} })];
									}
								});
							}
						})];
					} }),
					createComponent(PopupElement.Footer, { get children() {
						return createComponent(PopupElement.FooterButton, {
							get disabled() {
								return !offerAmount() || inputError() !== void 0;
							},
							callback: handleSubmit,
							get children() {
								return createComponent(I18nTsx, {
									key: "StarGiftOffer.CreateOfferSubmit",
									get args() {
										return [ton() ? paymentsWrapCurrencyAmount(parseNanotonFromDecimal(offerAmount()).toString(), "TON") : paymentsWrapCurrencyAmount(offerAmount(), "XTR")];
									}
								});
							}
						});
					} })
				];
			}
		});
	});
}
//#endregion
//#region src/components/stargifts/canManageGifts.ts
async function getCanManagePeerGifts(peerId) {
	if (peerId === rootScope.myId) return true;
	return peerId.isAnyChat() && rootScope.managers.appChatsManager.hasRights(peerId.toChatId(), "post_messages");
}
//#endregion
//#region src/components/popups/starGiftInfo.tsx
var _tmpl$$9 = /*#__PURE__*/ template(`<div class=popup-star-gift-info-upgrade-backdrops>`);
var _tmpl$2$6 = /*#__PURE__*/ template(`<div class=popup-star-gift-info-upgrade-models-container><div class=popup-star-gift-info-upgrade-models>`);
var _tmpl$3$5 = /*#__PURE__*/ template(`<span class=animated-counter>`);
var _tmpl$4$5 = /*#__PURE__*/ template(`<span dir=ltr>~`);
var _tmpl$5$5 = /*#__PURE__*/ template(`<span>`);
var _tmpl$6$4 = /*#__PURE__*/ template(`<div>`);
var _tmpl$7$3 = /*#__PURE__*/ template(`<div><div class=popup-star-gift-info-table>`);
var _tmpl$8$2 = /*#__PURE__*/ template(`<button class=popup-star-gift-info-change-price>`);
var _tmpl$9$2 = /*#__PURE__*/ template(`<div class=popup-star-gift-info-price>`);
var _tmpl$0$2 = /*#__PURE__*/ template(`<a href=https://telegram.org/blog/telegram-stars target=_blank>`);
var _tmpl$1$1 = /*#__PURE__*/ template(`<div class=popup-star-gift-info-actions>`);
var _tmpl$10$1 = /*#__PURE__*/ template(`<div class=popup-star-gift-info-hint> <a href=#>`);
var _tmpl$11 = /*#__PURE__*/ template(`<div class=popup-star-gift-info-hint>`);
var attributeValueKeyFrames = (element, removed) => [{
	opacity: 0,
	transform: `translateY(${removed ? "-14px" : "14px"}) scaleY(0.5)`
}, {
	opacity: 1,
	transform: "translateY(0)"
}];
var attributeIntervalEasing = BezierEasing(.5, 0, 1, 1);
function calculateEasedIntervals(count, duration) {
	const intervals = [];
	for (let i = 0; i < count; i++) {
		const t0 = i / count;
		const interval = (attributeIntervalEasing((i + 1) / count) - attributeIntervalEasing(t0)) * duration;
		intervals.push(interval);
	}
	return intervals;
}
function AnimatedAttributeValue(props) {
	const [position, setPosition] = createSignal(0);
	const items = [];
	while (items.length < props.count - 1) {
		const left = props.count - 1 - items.length;
		items.push(...props.items.slice(0, left));
	}
	items.push(props.actual);
	const intervals = calculateEasedIntervals(items.length, props.duration);
	onMount(() => {
		function scheduleNext(index) {
			setTimeout(() => {
				const nextIndex = index + 1;
				setPosition(nextIndex);
				if (nextIndex < items.length - 1) scheduleNext(nextIndex);
				else props.onComplete?.();
			}, intervals[index]);
		}
		function scheduleRandom() {
			let randomIndex = Math.floor(Math.random() * items.length);
			if (position() === randomIndex) randomIndex = (randomIndex + 1) % items.length;
			setPosition(randomIndex);
			setTimeout(() => {
				if (props.started) scheduleNext(0);
				else scheduleRandom();
			}, 150);
		}
		if (props.started) scheduleNext(0);
		else scheduleRandom();
	});
	return createComponent(SimpleAnimation, {
		keyframes: attributeValueKeyFrames,
		mode: "replacement",
		appear: true,
		get children() {
			return createComponent(Switch, { get children() {
				return createComponent(Index, {
					each: items,
					children: (item, index) => createComponent(Match, {
						get when() {
							return index === position();
						},
						get children() {
							return createComponent(GiftAttributeValue, {
								get name() {
									return item().name;
								},
								get rarity() {
									return item().rarity;
								},
								get onClick() {
									return props.onClick;
								}
							});
						}
					})
				});
			} });
		}
	});
}
function UpgradeAnimation(props) {
	const MODEL_WIDTH = 120;
	const MODELS_DURATION = 2e3;
	const BACKDROPS_DURATION = 700;
	const models = [];
	while (models.length < 19) {
		const left = 19 - models.length;
		models.push(...props.preview.models.slice(0, left));
	}
	models.push(props.actualModel);
	const backdrops = [];
	while (backdrops.length < 4) {
		const left = 4 - backdrops.length;
		backdrops.push(...props.preview.backdrops.slice(0, left));
	}
	backdrops.push(props.actualBackdrop);
	const totalSections = backdrops.length + 2;
	const sectionSize = 100 / totalSections;
	const colors = backdrops.map((b) => rgbIntToHex(b.edge_color));
	const lastColor = colors[colors.length - 1];
	const gradientStopsStr = [
		`${colors[0]} 0%`,
		`${colors[0]} ${sectionSize}%`,
		...colors.flatMap((color, i) => {
			const base = (i + 1) * sectionSize;
			return [`${color} ${base + sectionSize * .33}%`, `${color} ${base + sectionSize * .67}%`];
		}),
		`${lastColor} ${(totalSections - 1) * sectionSize}%`,
		`${lastColor} 100%`
	].join(", ");
	let modelsContainer;
	let backdropEl;
	const [loading, setLoading] = createSignal(true);
	onMount(async () => {
		const middleware = createMiddleware();
		let lastPlayer;
		await Promise.all(models.map(async (model, idx) => {
			const div = document.createElement("div");
			const isLast = idx === models.length - 1;
			div.classList.add("popup-star-gift-info-upgrade-model");
			if (isLast) div.classList.add("last");
			modelsContainer.appendChild(div);
			return wrapSticker({
				doc: model.document,
				div,
				width: MODEL_WIDTH,
				height: MODEL_WIDTH,
				play: false,
				needFadeIn: false,
				middleware: middleware.get()
			}).then(({ render }) => render).then((player) => {
				if (isLast) lastPlayer = player;
			});
		}));
		props.onReady();
		setLoading(false);
		const containerWidth = modelsContainer.parentElement.offsetWidth;
		const totalModelsWidth = 4300;
		const reflect = langPack_default.getIsRTL() ? -1 : 1;
		const startGap = (containerWidth - MODEL_WIDTH) / 2;
		const startOffset = startGap * reflect;
		const endOffset = -(totalModelsWidth - containerWidth + startGap) * reflect;
		const containerCenter = containerWidth / 2;
		const modelDivs = Array.from(modelsContainer.children);
		const animation = modelsContainer.animate([{ transform: `translateX(${startOffset}px)` }, { transform: `translateX(${endOffset}px)` }], {
			duration: MODELS_DURATION,
			easing: "cubic-bezier(1.00,1.00,0.35,1.00)",
			fill: "forwards"
		});
		let rafId;
		let finishing = false;
		const updateModels = () => {
			const containerRect = modelsContainer.parentElement.getBoundingClientRect();
			for (const div of modelDivs) {
				const rect = div.getBoundingClientRect();
				const modelCenter = rect.left + rect.width / 2 - containerRect.left;
				const distFromCenter = Math.abs(modelCenter - containerCenter);
				const t = Math.min(distFromCenter / containerCenter, 1);
				const scaleY = 1 - t * .2;
				const scaleX = 1 - t * .5;
				div.style.transform = `scale(${scaleX}, ${scaleY})`;
				if (!finishing) {
					const opacity = 1 - t * .5;
					div.style.opacity = `${opacity}`;
				}
			}
			if (animation.playState === "running") rafId = requestAnimationFrame(updateModels);
		};
		rafId = requestAnimationFrame(updateModels);
		animation.addEventListener("finish", () => cancelAnimationFrame(rafId));
		setTimeout(() => {
			modelsContainer.classList.add("finishing");
			finishing = true;
			lastPlayer.playOrRestart();
			lastPlayer.addEventListener("enterFrame", (frameNo) => {
				if (frameNo === lastPlayer.maxFrame) {
					lastPlayer.stop(false);
					middleware.destroy();
					props.onComplete();
				}
			});
		}, 1500);
		setTimeout(() => {
			props.confetti.create({ mode: "poppers" });
		}, 1250);
		setTimeout(() => backdropEl.animate([{ backgroundPosition: `${reflect > 0 ? 0 : 100}% 0%` }, { backgroundPosition: `${reflect > 0 ? 100 : 0}% 0%` }], {
			duration: BACKDROPS_DURATION,
			easing: "linear",
			fill: "forwards"
		}), 50);
		setTimeout(() => {
			backdropEl.classList.add("finishing");
		}, 500);
	});
	return [(() => {
		var _el$ = _tmpl$$9();
		var _ref$ = backdropEl;
		typeof _ref$ === "function" ? use(_ref$, _el$) : backdropEl = _el$;
		setStyleProperty(_el$, "background-size", `${totalSections * 100}% 100%`);
		createRenderEffect((_$p) => setStyleProperty(_el$, "background", `linear-gradient(to ${langPack_default.getIsRTL() ? "left" : "right"}, ${gradientStopsStr})`));
		return _el$;
	})(), (() => {
		var _el$2 = _tmpl$2$6(), _el$3 = _el$2.firstChild;
		insert(_el$2, createComponent(Show, {
			get when() {
				return loading();
			},
			get children() {
				return createComponent(PreloaderTsx, {});
			}
		}), _el$3);
		var _ref$2 = modelsContainer;
		typeof _ref$2 === "function" ? use(_ref$2, _el$3) : modelsContainer = _el$3;
		createRenderEffect((_$p) => setStyleProperty(_el$3, "display", loading() ? "none" : void 0));
		return _el$2;
	})()];
}
function AnimatedCollectibleNumber(props) {
	let containerRef;
	onMount(() => {
		const targetStr = String(props.targetNumber);
		const digitCount = targetStr.length;
		const digitAnimators = [];
		for (let i = 0; i < digitCount; i++) {
			const posFromRight = digitCount - i;
			if (posFromRight < digitCount && posFromRight % 3 === 0) {
				const comma = document.createElement("div");
				comma.className = "animated-counter-decimal";
				comma.textContent = ",";
				containerRef.appendChild(comma);
			}
			const item = document.createElement("div");
			item.className = "animated-counter-decimal";
			const placeholder = document.createElement("div");
			placeholder.className = "animated-counter-decimal-placeholder";
			const animator = new AnimatedSuper({ duration: 100 });
			animator.container.className = "animated-counter-decimal-wrapper";
			item.append(placeholder, animator.container);
			containerRef.appendChild(item);
			digitAnimators.push({
				animator,
				placeholder
			});
		}
		const getRandomDigit = () => Math.floor(Math.random() * 10);
		const setDigits = (lockedFromLeft, animate) => {
			for (let i = 0; i < digitCount; i++) {
				const { animator, placeholder } = digitAnimators[i];
				let newDigit;
				if (i < lockedFromLeft) newDigit = parseInt(targetStr[i]);
				else {
					newDigit = getRandomDigit();
					if (i === 0 && newDigit === 0) newDigit = 1;
				}
				const previousDigit = animator.rows[Object.keys(animator.rows)[0]] ? parseInt(Object.keys(animator.rows)[0]) : -1;
				const row = animator.getRow(newDigit, animate);
				row.textContent = placeholder.textContent = String(newDigit);
				if (animate && previousDigit !== newDigit) animator.animate(newDigit, previousDigit, newDigit > previousDigit, true);
				else if (!animate) animator.setNewRow(newDigit);
			}
		};
		setDigits(0, false);
		const totalUpdates = 10;
		const intervals = calculateEasedIntervals(totalUpdates, 2e3);
		let updateCount = 0;
		function scheduleNext() {
			setTimeout(() => {
				updateCount++;
				const progress = updateCount / totalUpdates;
				const lockedDigits = Math.min(digitCount, Math.floor(progress * (digitCount + 1)));
				if (updateCount >= totalUpdates) setDigits(digitCount, true);
				else {
					setDigits(lockedDigits, true);
					scheduleNext();
				}
			}, intervals[updateCount]);
		}
		function scheduleRandom() {
			setTimeout(() => {
				setDigits(0, true);
				if (props.started) scheduleNext();
				else scheduleRandom();
			}, 150);
		}
		if (props.started) scheduleNext();
		else scheduleRandom();
	});
	return (() => {
		var _el$4 = _tmpl$3$5();
		var _ref$3 = containerRef;
		typeof _ref$3 === "function" ? use(_ref$3, _el$4) : containerRef = _el$4;
		return _el$4;
	})();
}
function showStarGiftInfoPopup(options) {
	const myGift = options.gift;
	const { onClickAway, resaleRecipient, onAttributeClick, upgradeAnimation } = options;
	const isResale = myGift.resellPriceStars !== void 0 && getPeerId(myGift.raw.owner_id) !== rootScope.myId;
	const canUpgrade = myGift.raw._ === "starGift" && myGift.saved?.pFlags.can_upgrade && (myGift.ownerId === rootScope.myId || myGift.saved?.prepaid_upgrade_hash !== void 0);
	let cancelled = false;
	const [show, setShow] = createSignal(true);
	const handle = { hide: () => {
		cancelled = true;
		setShow(false);
	} };
	let containerEl;
	function Inner(props) {
		const context = useContext(PopupContext);
		const middleware = untrack(() => context.middlewareHelper).get();
		const { saved, raw: gift, ownerId, sticker, isIncoming, isConverted, collectibleAttributes } = myGift;
		const isUnavailable = !saved && gift.availability_remains === 0;
		const fromId = saved ? getPeerId(saved.from_id) : 0;
		const date = saved ? /* @__PURE__ */ new Date(saved.date * 1e3) : null;
		const firstSaleDate = gift.first_sale_date ? /* @__PURE__ */ new Date(gift.first_sale_date * 1e3) : null;
		const lastSaleDate = gift.last_sale_date ? /* @__PURE__ */ new Date(gift.last_sale_date * 1e3) : null;
		const starsValue = gift.stars;
		let input = myGift.input;
		if (!input && gift._ === "starGiftUnique") input = {
			_: "inputSavedStarGiftSlug",
			slug: gift.slug
		};
		const ownerPeerId = myGift.ownerId;
		const isEditableUniqueGift = gift._ === "starGiftUnique" && ownerPeerId !== void 0 && props.canManageGifts;
		const canSave = saved && (gift._ === "starGift" && isIncoming && !isConverted || isEditableUniqueGift);
		const [isListed, setIsListed] = createSignal(gift.resell_amount !== void 0);
		const [resellOnlyTon, setResellOnlyTon] = createSignal(myGift.resellOnlyTon);
		const [resellPriceTon, setResellPriceTon] = createSignal(myGift.resellPriceTon);
		const [resellPriceStars, setResellPriceStars] = createSignal(myGift.resellPriceStars);
		const [isWearing, setIsWearing] = createSignal(myGift.isWearing);
		const [upgradeAnimationStarted, setUpgradeAnimationStarted] = createSignal(false);
		const [upgradeAnimationComplete, setUpgradeAnimationComplete] = createSignal(!upgradeAnimation);
		subscribeOn(rootScope)("star_gift_update", (event) => {
			if (inputStarGiftEquals(myGift, event.input)) {
				if (event.resalePrice) {
					setIsListed(event.resalePrice.length > 0);
					updateStarGift(myGift, event);
					setResellOnlyTon(myGift.resellOnlyTon);
					setResellPriceTon(myGift.resellPriceTon);
					setResellPriceStars(myGift.resellPriceStars);
				}
				if (event.wearing !== void 0) {
					setIsWearing(event.wearing);
					createSnackbar({
						icon: event.wearing ? "crown_filled" : "crownoff_filled",
						textElement: event.wearing ? i18n("SetAsEmojiStatusInfo") : i18n("StarGiftWearStopped", [getCollectibleName(gift)])
					});
				}
			}
		});
		subscribeOn(rootScope)("emoji_status_change", async () => {
			const self = await rootScope.managers.appUsersManager.getSelf();
			const wearingGiftId = self?.emoji_status?._ === "emojiStatusCollectible" ? self.emoji_status.collectible_id : null;
			setIsWearing(wearingGiftId === gift.id);
		});
		const openPeer = (peerId) => {
			hotReloadGuard.appImManager.setInnerPeer({ peerId });
			onClickAway?.();
			context.hide();
		};
		const handleAttributeClick = (attribute) => {
			if (onAttributeClick) {
				onAttributeClick(attribute);
				return;
			}
			showSendGiftPopup({
				peerId: rootScope.myId,
				resaleParams: {
					giftId: gift.gift_id,
					filter: attribute
				}
			});
		};
		let loading = false;
		const toggleGiftHidden = () => {
			if (loading) return;
			loading = true;
			context.managers.appGiftsManager.toggleGiftHidden(input, !saved.pFlags.unsaved).then(() => {
				context.hide();
			});
		};
		const handleConfirm = async () => {
			if (canUpgrade) {
				await createStarGiftUpgradePopup({
					gift: myGift,
					descriptionForPeerId: myGift.ownerId === rootScope.myId ? void 0 : myGift.ownerId
				});
				return;
			}
			if (!isResale) return;
			const recipientId = resaleRecipient ?? rootScope.myId;
			const giftUnique = myGift.raw;
			showBuyResaleGiftPopup({
				recipientId,
				gift: myGift,
				onFinish: async (bought) => {
					if (!bought) return;
					context.hide();
					if (recipientId === rootScope.myId) toastNew({
						langPackKey: "StarGiftResaleBoughtSelf",
						langPackArguments: [`${giftUnique.title} #${numberThousandSplitter(giftUnique.num, ",")}`]
					});
					else toastNew({
						langPackKey: "StarGiftResaleBoughtOther",
						langPackArguments: [await wrapPeerTitle({
							peerId: recipientId,
							onlyFirstName: true
						})]
					});
				}
			});
			return false;
		};
		const confirmContent = () => {
			if (isResale) {
				const recipient = resaleRecipient ?? rootScope.myId;
				const nodes = [i18n(recipient !== rootScope.myId ? "StarGiftResaleSend" : "StarGiftResaleBuy", [myGift.resellOnlyTon ? paymentsWrapCurrencyAmount(myGift.resellPriceTon, "TON") : paymentsWrapCurrencyAmount(myGift.resellPriceStars, "XTR")])];
				if (myGift.resellOnlyTon) {
					const span = i18n("StarGiftResaleStarsAmount", [paymentsWrapCurrencyAmount(myGift.resellPriceStars, "XTR")]);
					span.classList.add("popup-star-gift-info-resale-stars-amount");
					nodes.push(span);
				}
				return nodes;
			}
			if (canUpgrade) return [i18n(myGift.saved?.prepaid_upgrade_hash ? "StarGiftGiftUpgrade" : "StarGiftStatusUpgrade"), Icon("arrow_up_circle_filled")];
			return i18n("OK");
		};
		const tableContent = createMemo(() => {
			const rows = [];
			if (gift._ === "starGiftUnique") {
				if (gift.owner_id) rows.push(["StarGiftOwner", createComponent(TablePeer, {
					get peerId() {
						return getPeerId(gift.owner_id);
					},
					onClick: () => openPeer(getPeerId(gift.owner_id))
				})]);
				else if (gift.owner_name) rows.push(["StarGiftOwner", gift.owner_name]);
				rows.push(["StarGiftModel", upgradeAnimation ? createComponent(AnimatedAttributeValue, {
					get items() {
						return upgradeAnimation.models;
					},
					get actual() {
						return collectibleAttributes.model;
					},
					duration: 2e3,
					count: 10,
					onClick: () => handleAttributeClick(collectibleAttributes.model),
					get started() {
						return upgradeAnimationStarted();
					}
				}) : createComponent(GiftAttributeValue, {
					get name() {
						return collectibleAttributes.model.name;
					},
					get rarity() {
						return collectibleAttributes.model.rarity;
					},
					onClick: () => handleAttributeClick(collectibleAttributes.model)
				})]);
				rows.push(["StarGiftBackdrop", upgradeAnimation ? createComponent(AnimatedAttributeValue, {
					get items() {
						return upgradeAnimation.backdrops;
					},
					get actual() {
						return collectibleAttributes.backdrop;
					},
					duration: 800,
					count: 4,
					onClick: () => handleAttributeClick(collectibleAttributes.backdrop),
					get started() {
						return upgradeAnimationStarted();
					}
				}) : createComponent(GiftAttributeValue, {
					get name() {
						return collectibleAttributes.backdrop.name;
					},
					get rarity() {
						return collectibleAttributes.backdrop.rarity;
					},
					onClick: () => handleAttributeClick(collectibleAttributes.backdrop)
				})]);
				rows.push(["StarGiftPattern", upgradeAnimation ? createComponent(AnimatedAttributeValue, {
					get items() {
						return upgradeAnimation.patterns;
					},
					get actual() {
						return collectibleAttributes.pattern;
					},
					duration: 1e3,
					count: 5,
					onClick: () => handleAttributeClick(collectibleAttributes.pattern),
					get started() {
						return upgradeAnimationStarted();
					}
				}) : createComponent(GiftAttributeValue, {
					get name() {
						return collectibleAttributes.pattern.name;
					},
					get rarity() {
						return collectibleAttributes.pattern.rarity;
					},
					onClick: () => handleAttributeClick(collectibleAttributes.pattern)
				})]);
				rows.push(["StarGiftAvailability", i18n("StarGiftAvailabilityIssued", [numberThousandSplitter(gift.availability_issued), numberThousandSplitter(gift.availability_total)])]);
				if (props.value) rows.push(["StarGiftValue", [(() => {
					var _el$5 = _tmpl$4$5();
					_el$5.firstChild;
					insert(_el$5, () => paymentsWrapCurrencyAmount(props.value.value, props.value.currency), null);
					return _el$5;
				})(), createComponent(TableButton, {
					text: "StarGiftValueLearnMore",
					onClick: () => {
						showStarGiftValuePopup({
							gift: myGift,
							value: props.value
						});
					}
				})]]);
				return rows;
			}
			if (fromId !== 0) rows.push(["StarGiftFromShort", [createComponent(TablePeer, {
				peerId: fromId,
				onClick: () => openPeer(fromId)
			}), createComponent(TableButton, {
				text: "StarGiftSendInline",
				onClick: () => {
					context.hide();
					showSendGiftPopup({ peerId: fromId });
				}
			})]]);
			if (date) rows.push(["StarGiftDate", (() => {
				var _el$7 = _tmpl$5$5();
				insert(_el$7, () => formatFullSentTime(date.getTime() / 1e3 | 0));
				return _el$7;
			})()]);
			if (isUnavailable) {
				if (firstSaleDate) rows.push(["StarGiftUnavailableFirstSale", (() => {
					var _el$8 = _tmpl$5$5();
					insert(_el$8, () => formatFullSentTime(firstSaleDate.getTime() / 1e3 | 0));
					return _el$8;
				})()]);
				if (lastSaleDate) rows.push(["StarGiftUnavailableLastSale", (() => {
					var _el$9 = _tmpl$5$5();
					insert(_el$9, () => formatFullSentTime(lastSaleDate.getTime() / 1e3 | 0));
					return _el$9;
				})()]);
			}
			const canConvert = saved?.convert_stars && isIncoming && !isConverted && tsNow(true) - (date.getTime() / 1e3 | 0) < useAppState()[0].appConfig.stargifts_convert_period_max;
			rows.push(["StarGiftValue", [
				createComponent(StarsStar, {}),
				starsValue,
				canConvert && createComponent(TableButton, {
					text: "StarGiftConvertButton",
					get textArgs() {
						return [saved.convert_stars];
					},
					onClick: async () => {
						const managers = context.managers;
						try {
							await confirmationPopup({
								managers,
								titleLangKey: "StarGiftSellTitlePopup",
								descriptionLangKey: "StarGiftConvertText",
								descriptionLangArgs: [saved.convert_stars],
								button: {
									langKey: "StarGiftConvertButton",
									langArgs: [saved.convert_stars]
								}
							});
						} catch (err) {
							return;
						}
						try {
							await managers.appGiftsManager.convertGift(input);
							context.hide();
							toastNew({
								langPackKey: "StarGiftGotStars",
								langPackArguments: [+saved.convert_stars]
							});
						} catch (err) {
							toastNew({ langPackKey: "Error.AnError" });
						}
					}
				})
			]]);
			if (gift.availability_total > 0) rows.push(["StarGiftAvailability", i18n("StarGiftAvailabilityValue2", [numberThousandSplitter(gift.availability_remains ?? 0), numberThousandSplitter(gift.availability_total)])]);
			if (gift._ === "starGift" && saved?.pFlags.can_upgrade) rows.push(["StarGiftStatus", i18n("StarGiftStatusNonUnique")]);
			return rows;
		});
		const [originalDetails, setOriginalDetails] = createSignal(collectibleAttributes?.original);
		const tableFooter = () => {
			if (originalDetails()) {
				const wrapPeer = (peer) => {
					const peerId = getPeerId(peer);
					return createComponent(PeerTitleTsx, {
						peerId,
						onlyFirstName: true,
						onClick: () => openPeer(peerId)
					});
				};
				let key;
				const args = [];
				if (collectibleAttributes.original.sender_id) {
					key = collectibleAttributes.original.message ? "StarGiftOriginalDetailsSenderComment" : "StarGiftOriginalDetailsSender";
					args.push(wrapPeer(collectibleAttributes.original.sender_id));
				} else key = collectibleAttributes.original.message ? "StarGiftOriginalDetailsComment" : "StarGiftOriginalDetailsBasic";
				args.push(wrapPeer(collectibleAttributes.original.recipient_id));
				args.push(formatDate(/* @__PURE__ */ new Date(collectibleAttributes.original.date * 1e3)));
				if (collectibleAttributes.original.message) {
					const span = document.createElement("span");
					const wrapped = wrapMessageEntities(collectibleAttributes.original.message.text, collectibleAttributes.original.message.entities);
					span.append(wrapRichText(wrapped.message, { entities: wrapped.totalEntities }));
					args.push(span);
				}
				return (() => {
					var _el$0 = _tmpl$6$4();
					insert(_el$0, createComponent(I18nTsx, {
						key,
						args
					}), null);
					insert(_el$0, (() => {
						var _c$ = memo(() => !!saved?.drop_original_details_stars);
						return () => _c$() && createComponent(ButtonIconTsx, {
							icon: "delete",
							get ["aria-label"]() {
								return langPack_default.format("Delete", true);
							},
							onClick: async () => {
								let popup;
								try {
									popup = await createPaymentPopup({ inputInvoice: {
										_: "inputInvoiceStarGiftDropOriginalDetails",
										stargift: input
									} });
								} catch (err) {
									toastError(err, "drop original details form error");
									return;
								}
								popup.addEventListener("finish", (result) => {
									if (result === "paid") {
										setOriginalDetails(void 0);
										delete collectibleAttributes.original;
									}
								});
							}
						});
					})(), null);
					createRenderEffect(() => className$3(_el$0, classNames("popup-star-gift-info-original", saved?.drop_original_details_stars && "has-delete")));
					return _el$0;
				})();
			}
			if (saved?.message) return wrapRichText(saved.message.text, { entities: saved.message.entities });
		};
		const handleShare = () => {
			const managers = bindManagersToSession(rootScope.managers);
			showSharingPicker2Popup().then(({ peerId, threadId, monoforumThreadId }) => {
				managers.appMessagesManager.sendText({
					peerId,
					threadId,
					replyToMonoforumPeerId: monoforumThreadId,
					text: "https://t.me/nft/" + gift.slug
				});
				hotReloadGuard.appImManager.setInnerPeer({
					peerId,
					threadId,
					monoforumThreadId
				});
				context.hide();
			});
		};
		const handleSetAsTheme = async () => {
			let peerId;
			try {
				peerId = await showPickUser2Popup({
					peerType: ["dialogs", "contacts"],
					filterPeerTypeBy: ["isRegularUser", "isBot"],
					titleLangKey: "SelectChat"
				});
			} catch (err) {
				return;
			}
			context.managers.appThemesManager.setChatTheme(peerId, {
				_: "chatThemeUniqueGift",
				gift,
				theme_settings: []
			}).catch(() => {
				toastNew({ langPackKey: "Error.AnError" });
			});
			hotReloadGuard.appImManager.setInnerPeer({ peerId });
			context.hide();
		};
		const handleSell = async (changePrice = false) => {
			if (!isEditableUniqueGift || !saved) return;
			if (isListed() && !changePrice) {
				await confirmationPopup({
					titleLangKey: "StarGiftUnlistTitle",
					titleLangArgs: [getCollectibleName(gift)],
					descriptionLangKey: "StarGiftUnlistText",
					button: { langKey: "StarGiftUnlistConfirm" }
				});
				await context.managers.appGiftsManager.updateResalePrice(input, null);
				createSnackbar({
					icon: "tag_alt_crossed_filled",
					textElement: i18n("StarGiftResaleRemoved", [getCollectibleName(gift)])
				});
				return;
			}
			const now = tsNow(true);
			if (saved.can_resell_at !== void 0 && saved.can_resell_at > now) {
				toastNew({
					langPackKey: "StarGiftResaleCooldown",
					langPackArguments: [wrapFormattedDuration(formatDuration(saved.can_resell_at - now, 2))]
				});
				return;
			}
			showSellStarGiftPopup({
				gift: myGift,
				allowUnlist: changePrice,
				onFinish: (result) => {
					if (result !== "cancel") createSnackbar({
						icon: result === "list" ? "tag_alt_filled" : "tag_alt_crossed_filled",
						textElement: i18n(result === "list" ? "StarGiftResaleListed" : "StarGiftResaleRemoved", [getCollectibleName(gift)])
					});
				}
			});
		};
		const createSnackbar = (params) => {
			return setQuizHint({
				class: "popup-star-gift-info-snackbar",
				appendTo: containerEl,
				from: "bottom",
				duration: 5e3,
				...params
			});
		};
		let stickerContainer;
		onMount(() => {
			if (isEditableUniqueGift) context.managers.appGiftsManager.getStarGiftOptions().catch(() => {});
			wrapSticker({
				doc: sticker,
				div: stickerContainer,
				width: 120,
				height: 120,
				play: !upgradeAnimation,
				needFadeIn: !!upgradeAnimation,
				middleware
			});
		});
		let confetti;
		const content = (() => {
			var _el$1 = _tmpl$7$3(), _el$10 = _el$1.firstChild;
			insert(_el$1, createComponent(ConfettiContainer, { ref(r$) {
				var _ref$4 = confetti;
				typeof _ref$4 === "function" ? _ref$4(r$) : confetti = r$;
			} }), _el$10);
			insert(_el$1, createComponent(MediaHeader, {
				"class": "popup-star-gift-info-header",
				get onBackdrop() {
					return gift._ === "starGiftUnique";
				},
				get children() {
					return [
						memo(() => memo(() => gift._ === "starGiftUnique")() && createComponent(MediaHeader.Backdrop, { get children() {
							return createComponent(StarGiftBackdrop, {
								get backdrop() {
									return collectibleAttributes.backdrop;
								},
								get patternEmoji() {
									return collectibleAttributes.pattern.document;
								}
							});
						} })),
						createComponent(MediaHeader.Sticker, {
							size: 120,
							get ["class"]() {
								return !upgradeAnimationComplete() ? "hide" : void 0;
							},
							ref(r$) {
								var _ref$5 = stickerContainer;
								typeof _ref$5 === "function" ? _ref$5(r$) : stickerContainer = r$;
							}
						}),
						memo(() => memo(() => !!(upgradeAnimation && !upgradeAnimationComplete()))() && createComponent(UpgradeAnimation, {
							preview: upgradeAnimation,
							get actualModel() {
								return collectibleAttributes.model;
							},
							get actualBackdrop() {
								return collectibleAttributes.backdrop;
							},
							onReady: () => setUpgradeAnimationStarted(true),
							onComplete: () => setUpgradeAnimationComplete(true),
							confetti
						})),
						memo(() => memo(() => !!isListed())() && (() => {
							var _el$11 = _tmpl$8$2();
							_el$11.$$click = () => handleSell(true);
							insert(_el$11, (() => {
								var _c$3 = memo(() => !!resellOnlyTon());
								return () => _c$3() ? paymentsWrapCurrencyAmount(resellPriceTon(), "TON") : paymentsWrapCurrencyAmount(resellPriceStars(), "XTR");
							})());
							return _el$11;
						})()),
						createComponent(ButtonIconTsx, {
							"class": "popup-star-gift-info-close",
							icon: "close",
							get ["aria-label"]() {
								return langPack_default.format("Close", true);
							},
							onClick: () => context.hide()
						}),
						memo(() => memo(() => gift._ === "starGiftUnique")() && createComponent(ButtonMenuToggleTsx, {
							"class": "popup-star-gift-info-menu-toggle",
							icon: "more",
							buttonOptions: { ariaLabel: "MultiAccount.More" },
							direction: "bottom-left",
							get buttons() {
								return [
									{
										icon: saved?.pFlags.pinned_to_top ? "unpin" : "pin",
										text: saved?.pFlags.pinned_to_top ? "StarGiftUnpin" : "StarGiftPin",
										verify: () => isEditableUniqueGift,
										onClick: () => {
											if (ownerPeerId === void 0) return;
											context.managers.appGiftsManager.togglePinnedGift(input, ownerPeerId).then(() => {
												context.hide();
											});
										}
									},
									{
										icon: "tag_alt",
										text: "StarGiftChangePrice",
										verify: () => isEditableUniqueGift && isListed(),
										onClick: () => handleSell(true)
									},
									{
										icon: "tag_alt",
										text: "StarGiftOffer.CreateOffer",
										verify: () => gift.offer_min_stars !== void 0,
										onClick: () => showCreateStarGiftOfferPopup({
											gift: myGift,
											onFinish: (res) => res === "created" && context.hide()
										})
									},
									{
										icon: "image",
										text: "GiftThemesSetIn",
										verify: () => !!gift.pFlags.theme_available && [gift.owner_id, gift.host_id].some((peer) => peer && getPeerId(peer) === rootScope.myId),
										onClick: handleSetAsTheme
									},
									{
										icon: "forward",
										text: "ShareFile",
										onClick: handleShare
									},
									{
										icon: "link",
										text: "CopyLink",
										onClick: () => {
											copyTextToClipboard("https://t.me/nft/" + gift.slug);
											toastNew({ langPackKey: "LinkCopied" });
										}
									}
								];
							}
						})),
						createComponent(MediaHeader.Title, { get children() {
							return memo(() => gift._ === "starGift")() ? i18n(isUnavailable ? "StarGiftUnavailableTitle" : isIncoming ? "StarGiftReceivedTitle" : "StarGiftTitle") : gift.title;
						} }),
						createComponent(Show, {
							get when() {
								return gift._ === "starGift";
							},
							get children() {
								return [memo(() => isUnavailable ? createComponent(MediaHeader.Subtitle, {
									color: "danger",
									get children() {
										return i18n("StarGiftUnavailableSubtitle");
									}
								}) : (() => {
									var _el$12 = _tmpl$9$2();
									insert(_el$12, createComponent(StarsStar, {}), null);
									insert(_el$12, starsValue, null);
									return _el$12;
								})()), memo(() => isIncoming && !isConverted && createComponent(MediaHeader.Subtitle, { get children() {
									return [
										memo(() => i18n("StarGiftReceivedSubtitle", [saved.convert_stars])),
										" ",
										(() => {
											var _el$13 = _tmpl$0$2();
											insert(_el$13, () => i18n("StarGiftReceivedSubtitleLink"));
											return _el$13;
										})()
									];
								} }))];
							}
						}),
						memo(() => memo(() => gift._ === "starGiftUnique")() && createComponent(MediaHeader.Subtitle, {
							"class": "popup-star-gift-info-collectible-number",
							get children() {
								return memo(() => !!gift.released_by)() ? createComponent(I18nTsx, {
									key: "StarGiftCollectibleNumWithAuthor",
									get args() {
										return [upgradeAnimation ? createComponent(AnimatedCollectibleNumber, {
											get targetNumber() {
												return gift.num;
											},
											get started() {
												return upgradeAnimationStarted();
											}
										}) : numberThousandSplitter(gift.num, ","), createComponent(PeerTitleTsx, {
											get peerId() {
												return getPeerId(gift.released_by);
											},
											username: true,
											onClick: () => openPeer(getPeerId(gift.released_by))
										})];
									}
								}) : createComponent(I18nTsx, {
									key: "StarGiftCollectibleNum",
									get args() {
										return [upgradeAnimation ? createComponent(AnimatedCollectibleNumber, {
											get targetNumber() {
												return gift.num;
											},
											get started() {
												return upgradeAnimationStarted();
											}
										}) : numberThousandSplitter(gift.num, ",")];
									}
								});
							}
						})),
						memo(() => isEditableUniqueGift && (() => {
							var _el$14 = _tmpl$1$1();
							insert(_el$14, createComponent(Button.Tile, {
								noRipple: true,
								"class": "popup-star-gift-info-action",
								icon: "gem_transfer_filled",
								text: "StarGiftTransfer",
								onClick: () => transferStarGift(myGift).then((ok) => {
									if (ok) context.hide();
								})
							}), null);
							insert(_el$14, createComponent(Button.Tile, {
								noRipple: true,
								"class": "popup-star-gift-info-action",
								get icon() {
									return isWearing() ? "crownoff_filled" : "crown_filled";
								},
								get text() {
									return isWearing() ? "StarGiftWearStop" : "StarGiftWear";
								},
								onClick: () => {
									const managers = bindManagersToSession(rootScope.managers);
									if (ownerPeerId === void 0) return;
									if (isWearing()) {
										if (ownerPeerId === rootScope.myId) managers.appUsersManager.updateEmojiStatus({ _: "emojiStatusEmpty" });
										else managers.appChatsManager.updateEmojiStatus(ownerPeerId.toChatId(), { _: "emojiStatusEmpty" }).catch(() => {
											toastNew({ langPackKey: "Error.AnError" });
										});
									} else openStarGiftWear(myGift, ownerPeerId);
								}
							}), null);
							insert(_el$14, createComponent(Button.Tile, {
								noRipple: true,
								"class": "popup-star-gift-info-action",
								get icon() {
									return isListed() ? "tag_alt_crossed_filled" : "tag_alt_filled";
								},
								get text() {
									return isListed() ? "StarGiftUnlistButton" : "StarGiftSell";
								},
								onClick: () => handleSell()
							}), null);
							return _el$14;
						})())
					];
				}
			}), _el$10);
			insert(_el$10, createComponent(Table, {
				get content() {
					return tableContent();
				},
				get footer() {
					return tableFooter();
				},
				cellClass: "popup-star-gift-info-table-cell",
				get footerClass() {
					return gift._ === "starGiftUnique" ? "popup-star-gift-info-footer-unique" : void 0;
				}
			}));
			insert(_el$1, canSave && (() => {
				var _el$15 = _tmpl$10$1(), _el$16 = _el$15.firstChild, _el$17 = _el$16.nextSibling;
				insert(_el$15, (() => {
					var _c$4 = memo(() => !!saved.pFlags.unsaved);
					return () => _c$4() ? i18n("StarGiftHiddenHint") : i18n("StarGiftVisibleHint");
				})(), _el$16);
				_el$17.$$click = toggleGiftHidden;
				insert(_el$17, () => i18n(saved.pFlags.unsaved ? "StarGiftVisibleShowLink" : "StarGiftVisibleHideLink"));
				return _el$15;
			})(), null);
			insert(_el$1, (() => {
				var _c$2 = memo(() => !!saved?.pFlags.name_hidden);
				return () => _c$2() && (() => {
					var _el$18 = _tmpl$11();
					insert(_el$18, () => i18n("StarGiftHiddenSender"));
					return _el$18;
				})();
			})(), null);
			createRenderEffect(() => className$3(_el$1, `popup-star-gift-info-container ${gift._ === "starGiftUnique" ? "is-collectible" : ""}`));
			return _el$1;
		})();
		return [createComponent(PopupElement.Body, { children: content }), createComponent(PopupElement.Footer, { get children() {
			return createComponent(PopupElement.FooterButton, {
				confirm: true,
				get ["class"]() {
					return classNames(isResale && "popup-star-gift-info-resale-button", isResale && myGift.resellOnlyTon && "popup-star-gift-info-resale-button-twoline");
				},
				callback: handleConfirm,
				get children() {
					return confirmContent();
				}
			});
		} })];
	}
	(async () => {
		const managers = bindManagersToSession(rootScope.managers);
		const raw = myGift.raw;
		const [value, canManageGifts] = await Promise.all([raw._ === "starGiftUnique" ? rootScope.managers.appGiftsManager.getGiftValue(raw.slug) : Promise.resolve(null), myGift.ownerId !== void 0 ? getCanManagePeerGifts(myGift.ownerId) : Promise.resolve(false)]);
		if (cancelled) return;
		createPopup(() => createComponent(PopupElement, {
			managers,
			"class": "popup-star-gift-info",
			closable: true,
			get show() {
				return show();
			},
			containerProps: { ref: (element) => containerEl = element },
			old: true,
			get children() {
				return createComponent(Inner, {
					value,
					canManageGifts
				});
			}
		}));
	})();
	return handle;
}
delegateEvents(["click"]);
//#endregion
//#region src/components/chat/bubbles/service.tsx
var _tmpl$$8 = /*#__PURE__*/ template(`<div><div>`);
function ServiceBubble(props) {
	const [text, { refetch }] = createResource(() => wrapMessageActionTextNew({ message: props.message }));
	createEffect(on(() => props.message, refetch));
	return (() => {
		var _el$ = _tmpl$$8(), _el$2 = _el$.firstChild;
		className$3(_el$2, service_module_default.text);
		insert(_el$2, text);
		insert(_el$, () => props.children, null);
		createRenderEffect(() => className$3(_el$, classNames(service_module_default.wrap, props.class)));
		return _el$;
	})();
}
var starGift_module_default = {
	bubble: "_bubble_q6tjh_1",
	bubbleIsUnique: "_bubbleIsUnique_q6tjh_12",
	sticker: "_sticker_q6tjh_22",
	from: "_from_q6tjh_29",
	fromUser: "_fromUser_q6tjh_49",
	message: "_message_q6tjh_58",
	badge: "_badge_q6tjh_69",
	upgradeButton: "_upgradeButton_q6tjh_77",
	backdrop: "_backdrop_q6tjh_85",
	uniqueGiftInfo: "_uniqueGiftInfo_q6tjh_92",
	uniqueGiftTitle: "_uniqueGiftTitle_q6tjh_98",
	uniqueGiftProps: "_uniqueGiftProps_q6tjh_103",
	uniqueGiftPropName: "_uniqueGiftPropName_q6tjh_111",
	uniqueGiftPropValue: "_uniqueGiftPropValue_q6tjh_117",
	webPageBox: "_webPageBox_q6tjh_123",
	webPageBackdrop: "_webPageBackdrop_q6tjh_129",
	webPageBackdropCanvas: "_webPageBackdropCanvas_q6tjh_134",
	webPageSticker: "_webPageSticker_q6tjh_138"
};
//#endregion
//#region src/components/chat/bubbles/starGift.tsx
var _tmpl$$7 = /*#__PURE__*/ template(`<div><div></div><div><div></div><div></div><div>`);
var _tmpl$2$5 = /*#__PURE__*/ template(`<span>`);
var _tmpl$3$4 = /*#__PURE__*/ template(`<div><div>`);
var _tmpl$4$4 = /*#__PURE__*/ template(`<div>`);
var _tmpl$5$4 = /*#__PURE__*/ template(`<div role=button>`);
function StarGiftBubble(props) {
	const message = createMemo(() => {
		if (props.gift.raw._ === "starGiftUnique") return (() => {
			var _el$ = _tmpl$$7(), _el$2 = _el$.firstChild, _el$3 = _el$2.nextSibling, _el$4 = _el$3.firstChild, _el$5 = _el$4.nextSibling, _el$6 = _el$5.nextSibling;
			className$3(_el$, starGift_module_default.uniqueGiftInfo);
			className$3(_el$2, starGift_module_default.uniqueGiftTitle);
			insert(_el$2, () => getCollectibleName(props.gift.raw));
			className$3(_el$3, starGift_module_default.uniqueGiftProps);
			insert(_el$3, createComponent(I18nTsx, {
				"class": starGift_module_default.uniqueGiftPropName,
				key: "StarGiftModel"
			}), _el$4);
			className$3(_el$4, starGift_module_default.uniqueGiftPropValue);
			insert(_el$4, () => props.gift.collectibleAttributes.model.name);
			insert(_el$3, createComponent(I18nTsx, {
				"class": starGift_module_default.uniqueGiftPropName,
				key: "StarGiftBackdrop"
			}), _el$5);
			className$3(_el$5, starGift_module_default.uniqueGiftPropValue);
			insert(_el$5, () => props.gift.collectibleAttributes.backdrop.name);
			insert(_el$3, createComponent(I18nTsx, {
				"class": starGift_module_default.uniqueGiftPropName,
				key: "StarGiftPattern"
			}), _el$6);
			className$3(_el$6, starGift_module_default.uniqueGiftPropValue);
			insert(_el$6, () => props.gift.collectibleAttributes.pattern.name);
			return _el$;
		})();
		if (props.message) return wrapRichText(props.message.text, { entities: props.message.entities });
		if (props.asUpgrade && props.ownerId) return createComponent(I18nTsx, {
			key: "StarGiftDefaultMessageUpgradeOut",
			get args() {
				return createComponent(PeerTitleTsx, { get peerId() {
					return props.ownerId;
				} });
			}
		});
		if (props.asUpgrade) return createComponent(I18nTsx, { key: "StarGiftDefaultMessageUpgrade" });
		if (props.gift.isConverted && props.gift.isIncoming) return createComponent(I18nTsx, {
			key: "StarGiftGotStars",
			get args() {
				return `${props.gift.raw.convert_stars}`;
			}
		});
		if (props.gift.raw.convert_stars !== void 0 && !props.gift.isUpgraded) return props.gift.isIncoming ? createComponent(I18nTsx, {
			key: "StarGiftDefaultMessageConvertable",
			get args() {
				return (() => {
					var _el$7 = _tmpl$2$5();
					insert(_el$7, () => props.gift.raw.convert_stars);
					return _el$7;
				})();
			}
		}) : createComponent(I18nTsx, {
			key: "StarGiftDefaultMessageConvertableOut",
			get args() {
				return [`${props.gift.raw.convert_stars}`, createComponent(PeerTitleTsx, { get peerId() {
					return props.ownerId;
				} })];
			}
		});
		return props.gift.isIncoming ? createComponent(I18nTsx, { key: "StarGiftDefaultMessage" }) : createComponent(I18nTsx, {
			key: "StarGiftDefaultMessageOut",
			get args() {
				return createComponent(PeerTitleTsx, { get peerId() {
					return props.ownerId;
				} });
			}
		});
	});
	return (() => {
		var _el$8 = _tmpl$3$4(), _el$9 = _el$8.firstChild;
		className$3(_el$8, classNames(starGift_module_default.bubble, props.gift.raw._ === "starGiftUnique" && starGift_module_default.bubbleIsUnique, service_module_default.addon));
		insert(_el$8, (() => {
			var _c$ = memo(() => !!props.gift.raw.availability_total);
			return () => _c$() && createComponent(StarGiftBadge, {
				get ["class"]() {
					return starGift_module_default.badge;
				},
				get backdropAttr() {
					return props.gift.collectibleAttributes?.backdrop;
				},
				get children() {
					return createComponent(I18nTsx, {
						key: "StarGiftLimitedBadgeNum",
						get args() {
							return [formatNumber(props.gift.raw.availability_total, 1)];
						}
					});
				}
			});
		})(), _el$9);
		insert(_el$8, (() => {
			var _c$2 = memo(() => !!props.gift.collectibleAttributes);
			return () => _c$2() && createComponent(StarGiftBackdrop, {
				get ["class"]() {
					return starGift_module_default.backdrop;
				},
				get backdrop() {
					return props.gift.collectibleAttributes.backdrop;
				},
				get patternEmoji() {
					return props.gift.collectibleAttributes.pattern.document;
				}
			});
		})(), _el$9);
		insert(_el$8, createComponent(StickerTsx, {
			"class": starGift_module_default.sticker,
			get sticker() {
				return props.gift.sticker;
			},
			width: 120,
			height: 120,
			get extraOptions() {
				return props.wrapStickerOptions;
			}
		}), _el$9);
		insert(_el$8, createComponent(I18nTsx, {
			get key() {
				return props.asPrepaidUpgrade ? "StarGiftUpgradeFrom" : "StarGiftFrom";
			},
			"class": starGift_module_default.from,
			get args() {
				return (() => {
					var _el$0 = _tmpl$4$4();
					insert(_el$0, createComponent(AvatarNewTsx, {
						get peerId() {
							return props.fromId;
						},
						size: 16
					}), null);
					insert(_el$0, createComponent(PeerTitleTsx, { get peerId() {
						return props.fromId;
					} }), null);
					createRenderEffect(() => className$3(_el$0, starGift_module_default.fromUser));
					return _el$0;
				})();
			}
		}), _el$9);
		className$3(_el$9, starGift_module_default.message);
		insert(_el$9, message);
		insert(_el$8, (() => {
			var _c$3 = memo(() => !!props.asUpgrade);
			return () => _c$3() ? createComponent(Button, {
				get ["class"]() {
					return classNames("bubble-service-button", starGift_module_default.upgradeButton);
				},
				get onClick() {
					return props.onViewClick;
				},
				iconAfter: "unpack_filled",
				get children() {
					return [createComponent(Sparkles, {
						mode: "button",
						isDiv: true
					}), createComponent(I18nTsx, { key: "ActionGiftPremiumUnpack" })];
				}
			}) : createComponent(Button, {
				"class": "bubble-service-button",
				get onClick() {
					return props.onViewClick;
				},
				get children() {
					return [createComponent(Sparkles, {
						mode: "button",
						isDiv: true
					}), createComponent(I18nTsx, { key: "ActionGiftPremiumView" })];
				}
			});
		})(), null);
		return _el$8;
	})();
}
function UniqueStarGiftWebPageBox(props) {
	return (() => {
		var _el$1 = _tmpl$5$4();
		addEventListener(_el$1, "keydown", buttonKeyDown, true);
		_el$1.$$click = (evt) => simulateClickEvent(evt.target.closest(".webpage-quote"));
		className$3(_el$1, starGift_module_default.webPageBox);
		setAttribute(_el$1, "aria-label", langPack_default.format("ActionGiftPremiumView", true));
		insert(_el$1, createComponent(StarGiftBackdrop, {
			"class": starGift_module_default.webPageBackdrop,
			canvasClass: starGift_module_default.webPageBackdropCanvas,
			get backdrop() {
				return props.gift.collectibleAttributes.backdrop;
			},
			get patternEmoji() {
				return props.gift.collectibleAttributes.pattern.document;
			}
		}), null);
		insert(_el$1, createComponent(StickerTsx, {
			"class": starGift_module_default.webPageSticker,
			width: 120,
			height: 120,
			get extraOptions() {
				return props.wrapStickerOptions;
			},
			get sticker() {
				return props.gift.collectibleAttributes.model.document;
			}
		}), null);
		createRenderEffect(() => setAttribute(_el$1, "tabindex", Modes.a11y ? 0 : void 0));
		return _el$1;
	})();
}
delegateEvents(["click", "keydown"]);
var premiumGift_module_default = {
	bubble: "_bubble_1i3yw_1",
	withMedia: "_withMedia_1i3yw_11",
	sticker: "_sticker_1i3yw_20",
	subtitle: "_subtitle_1i3yw_28"
};
//#endregion
//#region src/components/chat/bubbles/premiumGift.tsx
var _tmpl$$6 = /*#__PURE__*/ template(`<div><span>`);
var _tmpl$2$4 = /*#__PURE__*/ template(`<span class=text-bold>`);
function PremiumGiftBubble(props) {
	return (() => {
		var _el$ = _tmpl$$6(), _el$2 = _el$.firstChild;
		className$3(_el$, classNames(premiumGift_module_default.bubble, service_module_default.addon, "media" in props && premiumGift_module_default.withMedia, props.class));
		insert(_el$, (() => {
			var _c$ = memo(() => !!props.sticker);
			return () => _c$() && createComponent(StickerTsx, {
				get sticker() {
					return props.sticker;
				},
				width: 160,
				height: 160,
				autoStyle: true,
				get ["class"]() {
					return premiumGift_module_default.sticker;
				},
				get extraOptions() {
					return {
						play: liteMode.isAvailable("stickers_chat"),
						middleware: props.lottieOptions?.middleware
					};
				}
			});
		})(), _el$2);
		insert(_el$, (() => {
			var _c$2 = memo(() => !!props.assetName);
			return () => _c$2() && createComponent(LottieAnimation, {
				get ["class"]() {
					return premiumGift_module_default.sticker;
				},
				size: 160,
				get name() {
					return props.assetName;
				},
				lottieLoader,
				get lottieOptions() {
					return {
						autoplay: liteMode.isAvailable("stickers_chat"),
						...props.lottieOptions
					};
				}
			});
		})(), _el$2);
		insert(_el$, () => props.media, _el$2);
		insert(_el$, (() => {
			var _c$3 = memo(() => !!props.title);
			return () => _c$3() && (() => {
				var _el$3 = _tmpl$2$4();
				insert(_el$3, () => props.title);
				return _el$3;
			})();
		})(), _el$2);
		className$3(_el$2, premiumGift_module_default.subtitle);
		insert(_el$2, () => props.subtitle);
		insert(_el$, (() => {
			var _c$4 = memo(() => !!props.buttonText);
			return () => _c$4() && createComponent(Button, {
				"class": "bubble-service-button",
				get onClick() {
					return props.buttonCallback;
				},
				get children() {
					return props.buttonText;
				}
			});
		})(), null);
		return _el$;
	})();
}
//#endregion
//#region src/components/transitionTsx.tsx
var _tmpl$$5 = /*#__PURE__*/ template(`<div>`);
function TransitionSliderTsx(props) {
	const [, rest] = splitProps(props, [
		"children",
		"currentPage",
		"class",
		"tabClass"
	]);
	let ref;
	onMount(() => {
		const transitionTo = TransitionSlider({
			...rest,
			content: ref
		});
		createEffect(on(() => props.currentPage, (currentPage) => transitionTo(currentPage)));
	});
	return (() => {
		var _el$ = _tmpl$$5();
		var _ref$ = ref;
		typeof _ref$ === "function" ? use(_ref$, _el$) : ref = _el$;
		insert(_el$, createComponent(For, {
			get each() {
				return props.children;
			},
			children: (child) => (() => {
				var _el$2 = _tmpl$$5();
				insert(_el$2, child);
				createRenderEffect(() => className$3(_el$2, classNames("tabs-tab", props.tabClass)));
				return _el$2;
			})()
		}));
		createRenderEffect(() => className$3(_el$, classNames("tabs-container", props.class)));
		return _el$;
	})();
}
//#endregion
//#region src/helpers/number/approxEquals.ts
function approxEquals(a, b, epsilon = .001) {
	return Math.abs(a - b) < epsilon;
}
//#endregion
//#region src/lib/appManagers/utils/gifts/getStarGiftSendPolicy.ts
function getStarGiftSendPolicy(gift, disallowedGifts) {
	const uniqueAllowed = !disallowedGifts?.disallow_unique_stargifts;
	if (gift.isResale || gift.raw._ === "starGiftUnique") return {
		allowed: uniqueAllowed,
		forceUpgrade: false,
		upgradeAllowed: false
	};
	const limited = !!gift.raw.pFlags.limited;
	const baseAllowed = limited ? !disallowedGifts?.disallow_limited_stargifts : !disallowedGifts?.disallow_unlimited_stargifts;
	const upgradeAllowed = limited && gift.raw.upgrade_stars !== void 0 && uniqueAllowed;
	return {
		allowed: baseAllowed || upgradeAllowed,
		forceUpgrade: !baseAllowed && upgradeAllowed,
		upgradeAllowed
	};
}
function createProfileGiftsStore(props) {
	const initialState = {
		collections: void 0,
		items: [],
		loading: false,
		loaded: false,
		canManageGifts: props.peerId === rootScope.myId,
		chatNotificationsEnabled: void 0,
		chosenCollection: -1,
		sort: "date",
		unlimited: true,
		limited: true,
		upgradable: true,
		unique: true,
		displayed: true,
		hidden: true,
		...props.initialFilters,
		get hasCollections() {
			return store.collections !== void 0 && store.collections.length > 0;
		}
	};
	const [store, setStore] = createStore(initialState);
	let currentOffset = "";
	let nextReqId = 0;
	let fetchedCanManageGifts = false;
	let notificationsRevision = 0;
	const managers = props.managers ?? bindManagersToSession(rootScope.managers);
	const getCollectionId = (collection) => collection.collection_id;
	const saveCollectionsOrder = createOptimisticSave((ids) => {
		return managers.appGiftsManager.reorderCollections(props.peerId, ids);
	}, (ids) => {
		if (ids) setStore("collections", putInOrder(unwrap(store.collections), ids, getCollectionId));
		props.onSaveFailed?.();
	}, async () => {
		return (await managers.appGiftsManager.getCollections(props.peerId))?.map(getCollectionId);
	});
	const saveNotifications = createOptimisticSave((enabled) => {
		return managers.appGiftsManager.toggleChatGiftNotifications(props.peerId, enabled);
	}, (enabled) => {
		setStore("chatNotificationsEnabled", enabled);
		props.onSaveFailed?.();
	}, () => managers.appGiftsManager.getChatGiftNotifications(props.peerId));
	const fetchCanManageGifts = () => getCanManagePeerGifts(props.peerId);
	const collectionCache = /* @__PURE__ */ new Map();
	async function loadNext(reload = false) {
		if (!reload && (store.loading || store.loaded)) return;
		setStore("loading", true);
		const id = ++nextReqId;
		const notificationsRevisionAtStart = notificationsRevision;
		const collectionId = store.chosenCollection === -1 ? void 0 : store.chosenCollection;
		const [res, canManageGifts] = await Promise.all([managers.appGiftsManager.getProfileGifts({
			peerId: props.peerId,
			offset: currentOffset,
			sort: store.sort,
			unlimited: store.unlimited,
			limited: store.limited,
			upgradable: store.upgradable,
			unique: store.unique,
			displayed: store.displayed,
			hidden: store.hidden,
			withCollections: store.collections === void 0,
			collectionId,
			limit: 99
		}), fetchedCanManageGifts ? Promise.resolve(store.canManageGifts) : fetchCanManageGifts()]);
		if (id !== nextReqId) return;
		currentOffset = res.next;
		batch(() => {
			if (!fetchedCanManageGifts) {
				fetchedCanManageGifts = true;
				setStore("canManageGifts", canManageGifts);
			}
			setStore("items", reload ? res.gifts : store.items.concat(res.gifts));
			setStore("loaded", !res.next);
			setStore("loading", false);
			if (res.collections) setStore("collections", res.collections);
			if (res.chatNotificationsEnabled !== void 0 && notificationsRevisionAtStart === notificationsRevision) setStore("chatNotificationsEnabled", res.chatNotificationsEnabled);
		});
		if (collectionId === void 0 && store.unlimited && store.limited && store.upgradable && store.unique && store.displayed && store.hidden) props.onCountChange?.(res.count);
	}
	function reload(background = false) {
		currentOffset = "";
		fetchedCanManageGifts = false;
		batch(() => {
			setStore("loading", true);
			setStore("loaded", false);
			if (!background) setStore("items", []);
		});
		loadNext(true);
	}
	const actions = {
		loadNext,
		setFilters: (filters) => {
			const onlyCollectionChange = Object.keys(filters).length === 1 && filters.chosenCollection !== void 0;
			const switchingCollection = onlyCollectionChange && filters.chosenCollection !== store.chosenCollection;
			if (!onlyCollectionChange) collectionCache.clear();
			if (switchingCollection) collectionCache.set(store.chosenCollection, {
				items: unwrap(store.items),
				offset: currentOffset,
				loaded: store.loaded
			});
			setStore(filters);
			if (switchingCollection) {
				const cached = collectionCache.get(store.chosenCollection);
				if (cached) {
					currentOffset = cached.offset;
					batch(() => {
						setStore("items", cached.items);
						setStore("loaded", cached.loaded);
						setStore("loading", false);
					});
					return;
				}
			}
			reload();
		},
		deleteCollection: (collectionId) => {
			collectionCache.delete(collectionId);
			const deletingChosenCollection = store.chosenCollection === collectionId;
			batch(() => {
				if (deletingChosenCollection) setStore("chosenCollection", -1);
				setStore("collections", store.collections.filter((it) => it.collection_id !== collectionId));
			});
			if (deletingChosenCollection) reload();
		},
		reorderCollections: (ids) => {
			const collections = unwrap(store.collections);
			setStore("collections", putInOrder(collections, ids, getCollectionId));
			saveCollectionsOrder(ids, collections.map(getCollectionId));
		},
		toggleChatNotifications: (enabled) => {
			const shown = store.chatNotificationsEnabled;
			setStore("chatNotificationsEnabled", enabled);
			++notificationsRevision;
			saveNotifications(enabled, shown);
		},
		updateCollection: (collection, options) => {
			collectionCache.delete(collection.collection_id);
			const needSwitch = options?.switch ?? true;
			let needReload = options?.reload ?? needSwitch;
			batch(() => {
				const newArray = store.collections.slice();
				const idx = newArray.findIndex((it) => it.collection_id === collection.collection_id);
				if (idx !== -1) newArray[idx] = collection;
				else newArray.push(collection);
				setStore("collections", newArray);
				if (needSwitch) {
					setStore("chosenCollection", collection.collection_id);
					needReload = true;
				}
			});
			if (needReload) reload();
		},
		handleSwipe: (xDiff, setCollectionOverride) => {
			if (!store.hasCollections) return false;
			const direction = xDiff > 0 ? 1 : -1;
			const collections$ = store.collections;
			const chosenCollection$ = store.chosenCollection;
			const newIndex = (chosenCollection$ === -1 ? -1 : collections$.findIndex((it) => it.collection_id === chosenCollection$)) + direction;
			if (newIndex < -1 || newIndex >= collections$.length) return false;
			const newCollectionId = newIndex === -1 ? -1 : collections$[newIndex].collection_id;
			if (setCollectionOverride) setCollectionOverride(newCollectionId);
			else actions.setFilters({ chosenCollection: newCollectionId });
			return true;
		}
	};
	untrackActions(actions);
	const listenerSetter = createListenerSetter();
	onMount(() => {
		listenerSetter.add(rootScope)("star_gift_update", (event) => {
			collectionCache.clear();
			const items = unwrap(store.items);
			const idx = items.findIndex((it) => inputStarGiftEquals(it, event.input));
			if (idx !== -1) {
				const newList = items.slice();
				const newItem = { ...newList[idx] };
				newList[idx] = newItem;
				updateStarGift(newItem, event);
				setStore("items", newList);
			}
		});
		listenerSetter.add(rootScope)("pinned_stargifts", (event) => {
			if (event.peerId !== props.peerId) return;
			collectionCache.clear();
			const items = unwrap(store.items).slice();
			for (let i = 0; i < items.length; i++) {
				const item = items[i];
				const shouldBePinned = event.gifts.some((it) => inputStarGiftEquals(item, it));
				if (shouldBePinned !== !!item.saved.pFlags.pinned_to_top) {
					items[i] = { ...item };
					setBooleanFlag(items[i].saved.pFlags, "pinned_to_top", shouldBePinned);
				}
			}
			items.sort((a, b) => {
				if (a.saved.pFlags.pinned_to_top && !b.saved.pFlags.pinned_to_top) return -1;
				if (!a.saved.pFlags.pinned_to_top && b.saved.pFlags.pinned_to_top) return 1;
				if (a.saved.pFlags.pinned_to_top && b.saved.pFlags.pinned_to_top) return event.gifts.findIndex((it) => inputStarGiftEquals(a, it)) - event.gifts.findIndex((it) => inputStarGiftEquals(b, it));
				return b.saved.date - a.saved.date;
			});
			setStore("items", items);
		});
		listenerSetter.add(rootScope)("star_gift_list_update", ({ peerId }) => {
			if (peerId !== props.peerId) return;
			collectionCache.clear();
			setTimeout(() => {
				currentOffset = "";
				loadNext(true);
			}, 500);
		});
	});
	return [store, actions];
}
var sendGift_module_default = {
	popup: "_popup_1qse1_1",
	isChosenGift: "_isChosenGift_1qse1_25",
	mainContainer: "_mainContainer_1qse1_31",
	mainHeader: "_mainHeader_1qse1_39",
	isScrolled: "_isScrolled_1qse1_58",
	recipientAvatar: "_recipientAvatar_1qse1_67",
	recipientBackground: "_recipientBackground_1qse1_76",
	intro: "_intro_1qse1_83",
	premiumOptionsContainer: "_premiumOptionsContainer_1qse1_87",
	premiumOption: "_premiumOption_1qse1_87",
	premiumOptionSticker: "_premiumOptionSticker_1qse1_110",
	premiumOptionTitle: "_premiumOptionTitle_1qse1_115",
	premiumOptionSubtitle: "_premiumOptionSubtitle_1qse1_122",
	premiumOptionPrice: "_premiumOptionPrice_1qse1_128",
	premiumOptionPriceStars: "_premiumOptionPriceStars_1qse1_142",
	premiumOptionPriceStarsInner: "_premiumOptionPriceStarsInner_1qse1_156",
	premiumOptionBadge: "_premiumOptionBadge_1qse1_164",
	premiumOptionBadgeText: "_premiumOptionBadgeText_1qse1_167",
	categoriesContainer: "_categoriesContainer_1qse1_172",
	categoriesContainerPinned: "_categoriesContainerPinned_1qse1_181",
	giftsGridContainer: "_giftsGridContainer_1qse1_190",
	secondPageContainer: "_secondPageContainer_1qse1_197",
	secondPageBody: "_secondPageBody_1qse1_206",
	scrollable: "_scrollable_1qse1_21",
	secondPageHeader: "_secondPageHeader_1qse1_216",
	bubblesContainer: "_bubblesContainer_1qse1_228",
	formSheet: "_formSheet_1qse1_234",
	limitedProgressWrap: "_limitedProgressWrap_1qse1_248",
	limitedProgressBar: "_limitedProgressBar_1qse1_252",
	limitedProgressProgress: "_limitedProgressProgress_1qse1_260",
	limitedProgressText: "_limitedProgressText_1qse1_272",
	formInput: "_formInput_1qse1_286",
	formHint: "_formHint_1qse1_292",
	formSend: "_formSend_1qse1_300",
	starsBalance: "_starsBalance_1qse1_313",
	resaleHeader: "_resaleHeader_1qse1_325",
	resaleHeaderInner: "_resaleHeaderInner_1qse1_332",
	resaleTitle: "_resaleTitle_1qse1_344",
	resaleSubtitle: "_resaleSubtitle_1qse1_349",
	resaleFilters: "_resaleFilters_1qse1_356",
	resaleFilterChip: "_resaleFilterChip_1qse1_373",
	resaleFilterChipSort: "_resaleFilterChipSort_1qse1_397",
	resaleFilterChipCount: "_resaleFilterChipCount_1qse1_401",
	resaleFilterChipBackdrop: "_resaleFilterChipBackdrop_1qse1_405",
	emptyPlaceholder: "_emptyPlaceholder_1qse1_412",
	resaleGrid: "_resaleGrid_1qse1_430"
};
//#endregion
//#region src/components/popups/sendGift.tsx
var _tmpl$$4 = /*#__PURE__*/ template(`<div>`);
var _tmpl$2$3 = /*#__PURE__*/ template(`<div role=button><div></div><div></div><div>`);
var _tmpl$3$3 = /*#__PURE__*/ template(`<span dir=ltr>-<!>%`);
var _tmpl$4$3 = /*#__PURE__*/ template(`<div><div>`);
var _tmpl$5$3 = /*#__PURE__*/ template(`<div><div><div class=popup-title></div></div><div><img alt></div><div>`);
var _tmpl$6$3 = /*#__PURE__*/ template(`<div role=button aria-haspopup=menu>`);
var _tmpl$7$2 = /*#__PURE__*/ template(`<div><div><div><div></div></div><div></div></div><div>`);
var _tmpl$8$1 = /*#__PURE__*/ template(`<div class=btn-menu-item-icon>`);
var _tmpl$9$1 = /*#__PURE__*/ template(`<div class=btn-menu-item-text><span> `);
var _tmpl$0$1 = /*#__PURE__*/ template(`<div class=btn-menu-item-icon><div>`);
var _tmpl$1 = /*#__PURE__*/ template(`<div><div><div></div><div>`);
var _tmpl$10 = /*#__PURE__*/ template(`<div><div><div class=popup-title></div></div><div>`);
function prioritizeBirthdayGifts(gifts) {
	return gifts.slice().sort((a, b) => {
		const isBirthdayGift = (gift) => gift.raw._ === "starGift" && !gift.isResale && !!gift.raw.pFlags.birthday;
		return Number(isBirthdayGift(b)) - Number(isBirthdayGift(a));
	});
}
function isStarGiftAllowed(gift, disallowedGifts) {
	return getStarGiftSendPolicy(gift, disallowedGifts).allowed;
}
function isBirthdayNearby(birthday) {
	if (!birthday) return false;
	const now = /* @__PURE__ */ new Date();
	return [
		-1,
		0,
		1
	].some((offset) => {
		const date = new Date(now);
		date.setDate(date.getDate() + offset);
		return birthday.day === date.getDate() && birthday.month === date.getMonth() + 1;
	});
}
function GiftOptionsPage(props) {
	const [isPinned, setIsPinned] = createSignal(false);
	const isToSelf = props.peerId === rootScope.myId;
	const [category, setCategory] = createSignal(props.initialCategory ?? "All");
	let categoriesContainer;
	let container;
	const giftPremiumSection = !!props.premiumOptions.length && props.peer._ === "user" && !isToSelf && [createComponent(MediaHeader, {
		get ["class"]() {
			return sendGift_module_default.intro;
		},
		get children() {
			return [createComponent(MediaHeader.Title, { get children() {
				return i18n("GiftPremium");
			} }), createComponent(MediaHeader.Subtitle, { get children() {
				return createComponent(I18nTsx, {
					key: "GiftTelegramPremiumDescription",
					get args() {
						return createComponent(PeerTitleTsx, {
							get peerId() {
								return props.peerId;
							},
							get onlyFirstName() {
								return props.peer._ === "user";
							}
						});
					}
				});
			} })];
		}
	}), (() => {
		var _el$ = _tmpl$$4();
		insert(_el$, createComponent(For, {
			get each() {
				return props.premiumOptions;
			},
			children: (option) => {
				return (() => {
					var _el$2 = _tmpl$2$3(), _el$3 = _el$2.firstChild, _el$4 = _el$3.nextSibling, _el$5 = _el$4.nextSibling;
					addEventListener(_el$2, "keydown", buttonKeyDown, true);
					_el$2.$$click = () => props.onGiftChosen(option);
					insert(_el$2, createComponent(LottieAnimation, {
						lottieLoader,
						get ["class"]() {
							return sendGift_module_default.premiumOptionSticker;
						},
						get name() {
							return `Gift${option.months}`;
						},
						size: 84
					}), _el$3);
					insert(_el$3, () => formatMonthsDuration(option.months, false));
					insert(_el$4, () => i18n("PremiumStickersShort"));
					insert(_el$5, () => paymentsWrapCurrencyAmount(option.price, option.currency));
					insert(_el$2, (() => {
						var _c$ = memo(() => !!option.discountPercent);
						return () => _c$() && createComponent(StarGiftBadge, {
							get ["class"]() {
								return sendGift_module_default.premiumOptionBadge;
							},
							get textClass() {
								return sendGift_module_default.premiumOptionBadgeText;
							},
							get children() {
								var _el$6 = _tmpl$3$3(), _el$9 = _el$6.firstChild.nextSibling;
								_el$9.nextSibling;
								insert(_el$6, () => Math.round(option.discountPercent), _el$9);
								return _el$6;
							}
						});
					})(), null);
					insert(_el$2, (() => {
						var _c$2 = memo(() => !!option.priceStars);
						return () => _c$2() && (() => {
							var _el$0 = _tmpl$4$3(), _el$1 = _el$0.firstChild;
							insert(_el$0, () => i18n("PremiumOr"), _el$1);
							insert(_el$1, createComponent(StarsStar, {}), null);
							insert(_el$1, () => numberThousandSplitterForStars(option.priceStars), null);
							createRenderEffect((_p$) => {
								var _v$6 = sendGift_module_default.premiumOptionPriceStars, _v$7 = sendGift_module_default.premiumOptionPriceStarsInner;
								_v$6 !== _p$.e && className$3(_el$0, _p$.e = _v$6);
								_v$7 !== _p$.t && className$3(_el$1, _p$.t = _v$7);
								return _p$;
							}, {
								e: void 0,
								t: void 0
							});
							return _el$0;
						})();
					})(), null);
					createRenderEffect((_p$) => {
						var _v$ = sendGift_module_default.premiumOption, _v$2 = Modes.a11y ? 0 : void 0, _v$3 = sendGift_module_default.premiumOptionTitle, _v$4 = sendGift_module_default.premiumOptionSubtitle, _v$5 = sendGift_module_default.premiumOptionPrice;
						_v$ !== _p$.e && className$3(_el$2, _p$.e = _v$);
						_v$2 !== _p$.t && setAttribute(_el$2, "tabindex", _p$.t = _v$2);
						_v$3 !== _p$.a && className$3(_el$3, _p$.a = _v$3);
						_v$4 !== _p$.o && className$3(_el$4, _p$.o = _v$4);
						_v$5 !== _p$.i && className$3(_el$5, _p$.i = _v$5);
						return _p$;
					}, {
						e: void 0,
						t: void 0,
						a: void 0,
						o: void 0,
						i: void 0
					});
					return _el$2;
				})();
			}
		}));
		createRenderEffect(() => className$3(_el$, sendGift_module_default.premiumOptionsContainer));
		return _el$;
	})()];
	const handleCategoryChanged = (it) => {
		const wasPinned = isPinned();
		setCategory(it);
		fastRaf(() => {
			container.scrollTo({
				top: categoriesContainer.offsetTop - 56,
				behavior: wasPinned ? "instant" : smoothScrollBehavior()
			});
		});
	};
	const allowedOwnedGifts = createMemo(() => unwrap(props.profileStore.items).filter((gift) => isStarGiftAllowed(gift, props.disallowedGifts)));
	const filteredGiftOptions = createMemo(() => {
		const category$ = category();
		if (category$ === "All") return props.giftOptions;
		if (category$ === "Collectibles") return props.giftOptions.filter((it) => it.raw.availability_remains > 0 && it.raw.upgrade_stars !== void 0 || it.isResale);
		return allowedOwnedGifts();
	});
	const handleGiftClick = async (item) => {
		if (category() === "Owned") {
			transferStarGift(item, props.peerId).then((result) => {
				if (result) props.onClose();
			});
			return;
		}
		const gift = item.raw;
		if (gift.availability_remains === 0 && !gift.resell_min_stars) {
			showStarGiftInfoPopup({ gift: item });
			return;
		}
		if (gift.pFlags.require_premium && !rootScope.premium) {
			hotReloadGuard.showPremiumPopup();
			return;
		}
		if (gift.per_user_total && !gift.per_user_remains) {
			toastNew({
				langPackKey: "StarGiftLimitReached",
				langPackArguments: [gift.per_user_total]
			});
			return;
		}
		if (gift.locked_until_date > tsNow(true)) {
			const result = await rootScope.managers.appGiftsManager.checkCanSendGift(gift.id);
			if (result._ === "payments.checkCanSendGiftResultFail") {
				confirmationPopup({
					button: {
						langKey: "OK",
						isCancel: true
					},
					description: wrapRichText(result.reason.text, { entities: result.reason.entities })
				});
				return;
			}
		}
		props.onGiftChosen(item);
	};
	onMount(() => {
		fastRaf(() => {
			container.style.setProperty("--height", `${container.offsetHeight}px`);
		});
	});
	return createComponent(Scrollable, {
		ref(r$) {
			var _ref$ = container;
			typeof _ref$ === "function" ? _ref$(r$) : container = r$;
		},
		onScroll: () => {
			container.classList.toggle(sendGift_module_default.isScrolled, container.scrollTop > 0);
			const containerRect = container.getBoundingClientRect();
			const rect = categoriesContainer.getBoundingClientRect();
			setIsPinned(approxEquals(rect.top - containerRect.top, 56, .1));
		},
		onScrolledBottom: () => {
			if (category() === "Owned") props.profileStoreActions.loadNext();
		},
		get children() {
			var _el$10 = _tmpl$5$3(), _el$11 = _el$10.firstChild, _el$12 = _el$11.firstChild, _el$13 = _el$11.nextSibling, _el$14 = _el$13.firstChild, _el$15 = _el$13.nextSibling;
			insert(_el$11, createComponent(ButtonIconTsx, {
				icon: "close",
				get ["aria-label"]() {
					return langPack_default.format("Close", true);
				},
				get onClick() {
					return props.onClose;
				}
			}), _el$12);
			insert(_el$12, () => i18n("StarGiftSendGift"));
			insert(_el$13, createComponent(AvatarNewTsx, {
				get peerId() {
					return props.peerId;
				},
				size: 100
			}), null);
			insert(_el$10, giftPremiumSection, _el$15);
			insert(_el$10, createComponent(MediaHeader, {
				get ["class"]() {
					return sendGift_module_default.intro;
				},
				get children() {
					return [createComponent(MediaHeader.Title, { get children() {
						return isToSelf ? i18n("StarGiftSendGiftSelf") : i18n("StarGiftSendGift");
					} }), createComponent(MediaHeader.Subtitle, { get children() {
						return createComponent(I18nTsx, {
							key: isToSelf ? "SendStarGiftSubtitleSelf" : "SendStarGiftSubtitle",
							get args() {
								return isToSelf ? void 0 : [createComponent(PeerTitleTsx, {
									get peerId() {
										return props.peerId;
									},
									get onlyFirstName() {
										return props.peer._ === "user";
									}
								})];
							}
						});
					} })];
				}
			}), _el$15);
			insert(_el$10, createComponent(ChipTabs, {
				get value() {
					return category();
				},
				onChange: handleCategoryChanged,
				get view() {
					return isPinned() ? "secondary" : "surface";
				},
				get ["class"]() {
					return classNames(sendGift_module_default.categoriesContainer, isPinned() && sendGift_module_default.categoriesContainerPinned);
				},
				ref(r$) {
					var _ref$2 = categoriesContainer;
					typeof _ref$2 === "function" ? _ref$2(r$) : categoriesContainer = r$;
				},
				center: true,
				get children() {
					return [
						createComponent(ChipTab, {
							value: "All",
							get children() {
								return i18n("StarGiftCategoryAll");
							}
						}),
						createComponent(Show, {
							get when() {
								return !isToSelf && allowedOwnedGifts().length > 0;
							},
							get children() {
								return createComponent(ChipTab, {
									value: "Owned",
									get children() {
										return i18n("StarGiftCategoryOwned");
									}
								});
							}
						}),
						createComponent(ChipTab, {
							value: "Collectibles",
							get children() {
								return i18n("StarGiftCategoryCollectibles");
							}
						})
					];
				}
			}), _el$15);
			insert(_el$15, createComponent(Show, {
				get when() {
					return memo(() => category() === "Owned")() && props.profileStore.loading;
				},
				get children() {
					return createComponent(PreloaderTsx, {});
				}
			}), null);
			insert(_el$15, createComponent(StarGiftsGrid, {
				get items() {
					return filteredGiftOptions();
				},
				get view() {
					return category() === "Owned" ? "transfer" : "list";
				},
				scrollParent: container,
				onClick: handleGiftClick
			}), null);
			createRenderEffect((_p$) => {
				var _v$8 = sendGift_module_default.mainContainer, _v$9 = sendGift_module_default.mainHeader, _v$0 = sendGift_module_default.recipientAvatar, _v$1 = sendGift_module_default.recipientBackground, _v$10 = `assets/img/${maybe2x("stars_pay")}.png`, _v$11 = sendGift_module_default.giftsGridContainer;
				_v$8 !== _p$.e && className$3(_el$10, _p$.e = _v$8);
				_v$9 !== _p$.t && className$3(_el$11, _p$.t = _v$9);
				_v$0 !== _p$.a && className$3(_el$13, _p$.a = _v$0);
				_v$1 !== _p$.o && className$3(_el$14, _p$.o = _v$1);
				_v$10 !== _p$.i && setAttribute(_el$14, "src", _p$.i = _v$10);
				_v$11 !== _p$.n && className$3(_el$15, _p$.n = _v$11);
				return _p$;
			}, {
				e: void 0,
				t: void 0,
				a: void 0,
				o: void 0,
				i: void 0,
				n: void 0
			});
			return _el$10;
		}
	});
}
function createSomeOrAll(options) {
	const [chosen, setChosen] = createSignal(null);
	return [
		() => {
			const chosen$ = chosen();
			if (chosen$ === null) return options();
			return chosen$;
		},
		(value) => {
			if (value && (value.length === options().length || value.length === 0)) value = null;
			setChosen(value);
		},
		() => chosen() !== null
	];
}
function ResaleOptionsPage(props) {
	const [total, setTotal] = createSignal(null);
	const [sort, setSort] = createSignal("price");
	const [sortPopupVisible, setSortPopupVisible] = createSignal(false);
	const [items, setItems] = createSignal([]);
	const [loading, setLoading] = createSignal(true);
	const [modelOptions, setModelOptions] = createSignal([]);
	const [chosenModelOptions, setChosenModelOptions, hasChosenModelOptions] = createSomeOrAll(modelOptions);
	const [modelPopupVisible, setModelPopupVisible] = createSignal(false);
	const [patternOptions, setPatternOptions] = createSignal([]);
	const [chosenPatternOptions, setChosenPatternOptions, hasChosenPatternOptions] = createSomeOrAll(patternOptions);
	const [patternPopupVisible, setPatternPopupVisible] = createSignal(false);
	const [backdropOptions, setBackdropOptions] = createSignal([]);
	const [chosenBackdropOptions, setChosenBackdropOptions, hasChosenBackdropOptions] = createSomeOrAll(backdropOptions);
	const [backdropPopupVisible, setBackdropPopupVisible] = createSignal(false);
	if (props.initialFilter) switch (props.initialFilter._) {
		case "starGiftAttributeModel":
			setChosenModelOptions([props.initialFilter]);
			break;
		case "starGiftAttributePattern":
			setChosenPatternOptions([props.initialFilter]);
			break;
		case "starGiftAttributeBackdrop": setChosenBackdropOptions([props.initialFilter]);
	}
	let offset = "";
	let attributesHash = 0;
	let tempId = 0;
	const countersMap = /* @__PURE__ */ new Map();
	function getCounterKey(attribute) {
		switch (attribute._) {
			case "starGiftAttributeModel":
			case "starGiftAttributePattern": return `model:${attribute.document.id}`;
			case "starGiftAttributeIdModel":
			case "starGiftAttributeIdPattern": return `model:${attribute.document_id}`;
			case "starGiftAttributeIdBackdrop":
			case "starGiftAttributeBackdrop": return `backdrop:${attribute.backdrop_id}`;
		}
	}
	let lastRequestedOffset = null;
	async function loadMore() {
		const _tempId = tempId;
		if (lastRequestedOffset === offset) return;
		if (offset === void 0) return;
		lastRequestedOffset = offset;
		const filters = [];
		if (hasChosenModelOptions()) for (const option of chosenModelOptions()) filters.push({
			_: "starGiftAttributeIdModel",
			document_id: option.document.id
		});
		if (hasChosenPatternOptions()) for (const option of chosenPatternOptions()) filters.push({
			_: "starGiftAttributeIdPattern",
			document_id: option.document.id
		});
		if (hasChosenBackdropOptions()) for (const option of chosenBackdropOptions()) filters.push({
			_: "starGiftAttributeIdBackdrop",
			backdrop_id: option.backdrop_id
		});
		const res = await rootScope.managers.appGiftsManager.getResaleOptions({
			giftId: props.gift.raw.id,
			sort: sort(),
			attributesHash,
			filters,
			offset
		});
		if (_tempId !== tempId) return;
		if (res.counters) for (const it of res.counters) countersMap.set(getCounterKey(it.attribute), it.count);
		if (res.attributes) {
			setModelOptions(res.attributes.models.filter((it) => countersMap.get(getCounterKey(it)) ?? false));
			setPatternOptions(res.attributes.patterns.filter((it) => countersMap.get(getCounterKey(it)) ?? false));
			setBackdropOptions(res.attributes.backdrops.filter((it) => countersMap.get(getCounterKey(it)) ?? false));
			attributesHash = res.attributesHash;
		}
		setItems((prev) => [...prev, ...res.items]);
		offset = res.next;
		setTotal(res.count);
		setLoading(false);
	}
	onMount(() => {
		loadMore();
	});
	function loadFromStart() {
		offset = "";
		setItems([]);
		countersMap.clear();
		attributesHash = 0;
		lastRequestedOffset = null;
		tempId += 1;
		setLoading(true);
		loadMore();
	}
	subscribeOn(rootScope)("star_gift_update", (event) => {
		const idx = items().findIndex((it) => inputStarGiftEquals(it, event.input));
		if (idx !== -1) {
			if (event.resalePrice) loadFromStart();
			else updateStarGift(items()[idx], event);
		}
	});
	createEffect(on(() => [
		sort(),
		hasChosenModelOptions(),
		hasChosenPatternOptions(),
		hasChosenBackdropOptions()
	], loadFromStart, { defer: true }));
	const SORT_OPTIONS = {
		price: {
			icon: "sort_price",
			text: "StarGiftResaleSortPriceShort"
		},
		date: {
			icon: "sort_date",
			text: "StarGiftResaleSortDateShort"
		},
		num: {
			icon: "sort_num",
			text: "StarGiftResaleSortNumShort"
		}
	};
	let container;
	return (() => {
		var _el$16 = _tmpl$7$2(), _el$17 = _el$16.firstChild, _el$18 = _el$17.firstChild, _el$19 = _el$18.firstChild, _el$20 = _el$18.nextSibling, _el$25 = _el$17.nextSibling;
		insert(_el$18, createComponent(ButtonIconTsx, {
			get icon() {
				return props.isFirst ? "close" : "back";
			},
			get ["aria-label"]() {
				return langPack_default.format("Close", true);
			},
			get onClick() {
				return memo(() => !!props.isFirst)() ? props.onClose : props.onBack;
			}
		}), _el$19);
		insert(_el$19, () => props.gift.raw.title, null);
		insert(_el$19, createComponent(I18nTsx, {
			get ["class"]() {
				return sendGift_module_default.resaleSubtitle;
			},
			key: "StarGiftResaleSubtitle",
			get args() {
				return [total() !== null ? numberThousandSplitter(total()) : "..."];
			}
		}), null);
		insert(_el$20, createComponent(Scrollable, {
			axis: "x",
			get children() {
				return [
					(() => {
						var _el$21 = _tmpl$6$3();
						use((el) => {
							ButtonMenuToggle({
								container: el,
								appendTo: getOverlayRoot(),
								onOpen: (e, menu) => {
									setSortPopupVisible(true);
									positionMenuTrigger(el, menu, "bottom-right", { top: 8 });
								},
								onClose: () => setSortPopupVisible(false),
								direction: "bottom-right",
								buttons: [
									{
										icon: "sort_price",
										text: "StarGiftResaleSortPrice",
										onClick: () => setSort("price")
									},
									{
										icon: "sort_date",
										text: "StarGiftResaleSortDate",
										onClick: () => setSort("date")
									},
									{
										icon: "sort_num",
										text: "StarGiftResaleSortNum",
										onClick: () => setSort("num")
									}
								]
							});
						}, _el$21);
						insert(_el$21, createComponent(IconTsx, { get icon() {
							return SORT_OPTIONS[sort()].icon;
						} }), null);
						insert(_el$21, createComponent(I18nTsx, { get key() {
							return SORT_OPTIONS[sort()].text;
						} }), null);
						createRenderEffect((_p$) => {
							var _v$12 = `${sendGift_module_default.resaleFilterChip} ${sendGift_module_default.resaleFilterChipSort} btn-menu-toggle`, _v$13 = Modes.a11y ? 0 : void 0, _v$14 = sortPopupVisible();
							_v$12 !== _p$.e && className$3(_el$21, _p$.e = _v$12);
							_v$13 !== _p$.t && setAttribute(_el$21, "tabindex", _p$.t = _v$13);
							_v$14 !== _p$.a && setAttribute(_el$21, "aria-expanded", _p$.a = _v$14);
							return _p$;
						}, {
							e: void 0,
							t: void 0,
							a: void 0
						});
						return _el$21;
					})(),
					createComponent(ButtonMenuSelect, {
						get value() {
							return chosenModelOptions();
						},
						onValueChange: setChosenModelOptions,
						get options() {
							return modelOptions();
						},
						deselectAllOnFirstSelect: true,
						needStickerRenderer: true,
						renderOption: (props) => {
							let stickerRef;
							onMount(() => {
								props.stickerRenderer.renderSticker(props.option.document, stickerRef);
								props.stickerRenderer.observeAnimated(stickerRef);
							});
							return [
								(() => {
									var _el$26 = _tmpl$8$1();
									var _ref$4 = stickerRef;
									typeof _ref$4 === "function" ? use(_ref$4, _el$26) : stickerRef = _el$26;
									return _el$26;
								})(),
								(() => {
									var _el$27 = _tmpl$9$1(), _el$28 = _el$27.firstChild;
									_el$28.firstChild;
									insert(_el$27, createComponent(ButtonMenuSelectText, {
										get text() {
											return props.option.name;
										},
										get highlight() {
											return props.highlight;
										}
									}), _el$28);
									insert(_el$28, () => countersMap.get(getCounterKey(props.option)) ?? 0, null);
									createRenderEffect(() => className$3(_el$28, sendGift_module_default.resaleFilterChipCount));
									return _el$27;
								})(),
								memo(() => memo(() => !!props.chosen)() && createComponent(IconTsx, {
									icon: "check",
									"class": "btn-menu-item-icon-right"
								}))
							];
						},
						optionSearchText: (it) => it.name,
						optionKey: (it) => String(it.document.id),
						onToggleMenu: setModelPopupVisible,
						direction: "bottom-right",
						get children() {
							var _el$22 = _tmpl$6$3();
							addEventListener(_el$22, "keydown", buttonKeyDown, true);
							insert(_el$22, createComponent(I18nTsx, {
								get key() {
									return hasChosenModelOptions() ? "StarGiftNModels" : "StarGiftModel";
								},
								get args() {
									return [String(chosenModelOptions().length)];
								}
							}), null);
							insert(_el$22, createComponent(IconTsx, { get icon() {
								return modelPopupVisible() ? "down_up" : "up_down";
							} }), null);
							createRenderEffect((_p$) => {
								var _v$15 = sendGift_module_default.resaleFilterChip, _v$16 = Modes.a11y ? 0 : void 0, _v$17 = modelPopupVisible();
								_v$15 !== _p$.e && className$3(_el$22, _p$.e = _v$15);
								_v$16 !== _p$.t && setAttribute(_el$22, "tabindex", _p$.t = _v$16);
								_v$17 !== _p$.a && setAttribute(_el$22, "aria-expanded", _p$.a = _v$17);
								return _p$;
							}, {
								e: void 0,
								t: void 0,
								a: void 0
							});
							return _el$22;
						}
					}),
					createComponent(ButtonMenuSelect, {
						get value() {
							return chosenBackdropOptions();
						},
						onValueChange: setChosenBackdropOptions,
						get options() {
							return backdropOptions();
						},
						deselectAllOnFirstSelect: true,
						renderOption: (props) => [
							(() => {
								var _el$30 = _tmpl$0$1(), _el$31 = _el$30.firstChild;
								createRenderEffect((_p$) => {
									var _v$30 = sendGift_module_default.resaleFilterChipBackdrop, _v$31 = rgbIntToHex(props.option.center_color), _v$32 = rgbIntToHex(props.option.edge_color);
									_v$30 !== _p$.e && className$3(_el$31, _p$.e = _v$30);
									_v$31 !== _p$.t && setStyleProperty(_el$31, "--backdrop-center-color", _p$.t = _v$31);
									_v$32 !== _p$.a && setStyleProperty(_el$31, "--backdrop-edge-color", _p$.a = _v$32);
									return _p$;
								}, {
									e: void 0,
									t: void 0,
									a: void 0
								});
								return _el$30;
							})(),
							(() => {
								var _el$32 = _tmpl$9$1(), _el$33 = _el$32.firstChild;
								_el$33.firstChild;
								insert(_el$32, createComponent(ButtonMenuSelectText, {
									get text() {
										return props.option.name;
									},
									get highlight() {
										return props.highlight;
									}
								}), _el$33);
								insert(_el$33, () => countersMap.get(getCounterKey(props.option)) ?? 0, null);
								createRenderEffect(() => className$3(_el$33, sendGift_module_default.resaleFilterChipCount));
								return _el$32;
							})(),
							memo(() => memo(() => !!props.chosen)() && createComponent(IconTsx, {
								icon: "check",
								"class": "btn-menu-item-icon-right"
							}))
						],
						optionSearchText: (it) => it.name,
						optionKey: (it) => String(it.backdrop_id),
						onToggleMenu: setBackdropPopupVisible,
						direction: "bottom-left",
						get children() {
							var _el$23 = _tmpl$6$3();
							addEventListener(_el$23, "keydown", buttonKeyDown, true);
							insert(_el$23, createComponent(I18nTsx, {
								get key() {
									return hasChosenBackdropOptions() ? "StarGiftNBackdrops" : "StarGiftBackdrop";
								},
								get args() {
									return [String(chosenBackdropOptions().length)];
								}
							}), null);
							insert(_el$23, createComponent(IconTsx, { get icon() {
								return backdropPopupVisible() ? "down_up" : "up_down";
							} }), null);
							createRenderEffect((_p$) => {
								var _v$18 = sendGift_module_default.resaleFilterChip, _v$19 = Modes.a11y ? 0 : void 0, _v$20 = backdropPopupVisible();
								_v$18 !== _p$.e && className$3(_el$23, _p$.e = _v$18);
								_v$19 !== _p$.t && setAttribute(_el$23, "tabindex", _p$.t = _v$19);
								_v$20 !== _p$.a && setAttribute(_el$23, "aria-expanded", _p$.a = _v$20);
								return _p$;
							}, {
								e: void 0,
								t: void 0,
								a: void 0
							});
							return _el$23;
						}
					}),
					createComponent(ButtonMenuSelect, {
						get value() {
							return chosenPatternOptions();
						},
						onValueChange: setChosenPatternOptions,
						get options() {
							return patternOptions();
						},
						deselectAllOnFirstSelect: true,
						needStickerRenderer: true,
						stickerOptions: { textColor: "primary-text-color" },
						renderOption: (props) => {
							let stickerRef;
							onMount(() => {
								props.stickerRenderer.renderSticker(props.option.document, stickerRef);
								props.stickerRenderer.observeAnimated(stickerRef);
							});
							return [
								(() => {
									var _el$35 = _tmpl$8$1();
									var _ref$5 = stickerRef;
									typeof _ref$5 === "function" ? use(_ref$5, _el$35) : stickerRef = _el$35;
									return _el$35;
								})(),
								(() => {
									var _el$36 = _tmpl$9$1(), _el$37 = _el$36.firstChild;
									_el$37.firstChild;
									insert(_el$36, createComponent(ButtonMenuSelectText, {
										get text() {
											return props.option.name;
										},
										get highlight() {
											return props.highlight;
										}
									}), _el$37);
									insert(_el$37, () => countersMap.get(getCounterKey(props.option)) ?? 0, null);
									createRenderEffect(() => className$3(_el$37, sendGift_module_default.resaleFilterChipCount));
									return _el$36;
								})(),
								memo(() => memo(() => !!props.chosen)() && createComponent(IconTsx, {
									icon: "check",
									"class": "btn-menu-item-icon-right"
								}))
							];
						},
						optionSearchText: (it) => it.name,
						optionKey: (it) => String(it.document.id),
						onToggleMenu: setPatternPopupVisible,
						direction: "bottom-left",
						get children() {
							var _el$24 = _tmpl$6$3();
							addEventListener(_el$24, "keydown", buttonKeyDown, true);
							insert(_el$24, createComponent(I18nTsx, {
								get key() {
									return hasChosenPatternOptions() ? "StarGiftNPatterns" : "StarGiftPattern";
								},
								get args() {
									return [String(chosenPatternOptions().length)];
								}
							}), null);
							insert(_el$24, createComponent(IconTsx, { get icon() {
								return patternPopupVisible() ? "down_up" : "up_down";
							} }), null);
							createRenderEffect((_p$) => {
								var _v$21 = sendGift_module_default.resaleFilterChip, _v$22 = Modes.a11y ? 0 : void 0, _v$23 = patternPopupVisible();
								_v$21 !== _p$.e && className$3(_el$24, _p$.e = _v$21);
								_v$22 !== _p$.t && setAttribute(_el$24, "tabindex", _p$.t = _v$22);
								_v$23 !== _p$.a && setAttribute(_el$24, "aria-expanded", _p$.a = _v$23);
								return _p$;
							}, {
								e: void 0,
								t: void 0,
								a: void 0
							});
							return _el$24;
						}
					})
				];
			}
		}));
		insert(_el$25, createComponent(Scrollable, {
			ref(r$) {
				var _ref$3 = container;
				typeof _ref$3 === "function" ? _ref$3(r$) : container = r$;
			},
			onScrolledBottom: loadMore,
			get children() {
				return createComponent(Animated, {
					type: "cross-fade",
					get children() {
						return createComponent(Show, {
							get when() {
								return memo(() => !!!loading())() && items().length > 0;
							},
							get fallback() {
								return memo(() => !!loading())() ? createComponent(PreloaderTsx, {}) : (() => {
									var _el$39 = _tmpl$$4();
									insert(_el$39, createComponent(I18nTsx, { key: "StarGiftResaleNothingFound" }));
									createRenderEffect(() => className$3(_el$39, sendGift_module_default.emptyPlaceholder));
									return _el$39;
								})();
							},
							get children() {
								return createComponent(StarGiftsGrid, {
									get ["class"]() {
										return sendGift_module_default.resaleGrid;
									},
									get items() {
										return items();
									},
									view: "resale",
									scrollParent: container,
									autoplay: false,
									onClick: (item) => {
										const popup = showStarGiftInfoPopup({
											gift: item,
											resaleRecipient: props.peerId,
											onClickAway: props.onClose,
											onAttributeClick: (attribute) => {
												switch (attribute._) {
													case "starGiftAttributeModel":
														setChosenModelOptions([attribute]);
														break;
													case "starGiftAttributeBackdrop":
														setChosenBackdropOptions([attribute]);
														break;
													case "starGiftAttributePattern": setChosenPatternOptions([attribute]);
												}
												popup.hide();
											}
										});
									}
								});
							}
						});
					}
				});
			}
		}));
		createRenderEffect((_p$) => {
			var _v$24 = sendGift_module_default.secondPageContainer, _v$25 = sendGift_module_default.resaleHeader, _v$26 = sendGift_module_default.resaleHeaderInner, _v$27 = `popup-title ${sendGift_module_default.resaleTitle}`, _v$28 = sendGift_module_default.resaleFilters, _v$29 = sendGift_module_default.secondPageBody;
			_v$24 !== _p$.e && className$3(_el$16, _p$.e = _v$24);
			_v$25 !== _p$.t && className$3(_el$17, _p$.t = _v$25);
			_v$26 !== _p$.a && className$3(_el$18, _p$.a = _v$26);
			_v$27 !== _p$.o && className$3(_el$19, _p$.o = _v$27);
			_v$28 !== _p$.i && className$3(_el$20, _p$.i = _v$28);
			_v$29 !== _p$.n && className$3(_el$25, _p$.n = _v$29);
			return _p$;
		}, {
			e: void 0,
			t: void 0,
			a: void 0,
			o: void 0,
			i: void 0,
			n: void 0
		});
		return _el$16;
	})();
}
function StarGiftLimitedProgress(props) {
	const left = i18n("StarGiftLimitedLeft", [props.gift.availability_remains]);
	const progress = 100 * props.gift.availability_remains / props.gift.availability_total;
	return (() => {
		var _el$40 = _tmpl$1(), _el$41 = _el$40.firstChild, _el$42 = _el$41.firstChild, _el$43 = _el$42.nextSibling;
		setStyleProperty(_el$43, "background-image", `linear-gradient(calc(90deg * var(--reflect)), #fff ${progress}%, var(--secondary-text-color) ${progress}%)`);
		insert(_el$43, left, null);
		insert(_el$43, () => i18n("StarGiftLimitedSold2", [props.gift.availability_total - props.gift.availability_remains]), null);
		createRenderEffect((_p$) => {
			var _v$33 = sendGift_module_default.limitedProgressWrap, _v$34 = sendGift_module_default.limitedProgressBar, _v$35 = sendGift_module_default.limitedProgressProgress, _v$36 = `${100 * props.gift.availability_remains / props.gift.availability_total}%`, _v$37 = sendGift_module_default.limitedProgressText;
			_v$33 !== _p$.e && className$3(_el$40, _p$.e = _v$33);
			_v$34 !== _p$.t && className$3(_el$41, _p$.t = _v$34);
			_v$35 !== _p$.a && className$3(_el$42, _p$.a = _v$35);
			_v$36 !== _p$.o && setStyleProperty(_el$42, "width", _p$.o = _v$36);
			_v$37 !== _p$.i && className$3(_el$43, _p$.i = _v$37);
			return _p$;
		}, {
			e: void 0,
			t: void 0,
			a: void 0,
			o: void 0,
			i: void 0
		});
		return _el$40;
	})();
}
function ChosenGiftPage(props) {
	const giftPolicy = props.chosenGift.type === "stargift" ? getStarGiftSendPolicy(props.chosenGift, props.disallowedGifts) : void 0;
	const [textWithEntities, setTextWithEntities] = createSignal();
	const [anonymous, setAnonymous] = createSignal(false);
	const [payWithStars, setPayWithStars] = createSignal(false);
	const [withUpgrade, setWithUpgrade] = createSignal(!!giftPolicy?.forceUpgrade);
	const [sending, setSending] = createSignal(false);
	const message = createMemo(() => ({
		_: "messageService",
		pFlags: { out: true },
		id: 0,
		peer_id: {
			_: "peerUser",
			user_id: props.peerId.toUserId()
		},
		date: 0,
		action: props.chosenGift.type === "stargift" ? {
			_: "messageActionStarGift",
			gift: props.chosenGift.raw,
			pFlags: {}
		} : {
			_: "messageActionGiftPremium",
			currency: payWithStars() ? "XTR" : props.chosenGift.currency,
			amount: payWithStars() ? props.chosenGift.priceStars : props.chosenGift.price,
			days: props.chosenGift.months * 30
		}
	}));
	async function handleSubmit() {
		const managers = bindManagersToSession(rootScope.managers);
		setSending(true);
		let invoice;
		if (props.chosenGift.type === "stargift") {
			const peer = await managers.appPeersManager.getInputPeerById(props.peerId);
			invoice = {
				_: "inputInvoiceStarGift",
				pFlags: {
					hide_name: anonymous() ? true : void 0,
					include_upgrade: withUpgrade() ? true : void 0
				},
				message: textWithEntities(),
				peer,
				gift_id: props.chosenGift.raw.id
			};
		} else {
			const payWithStars$ = payWithStars();
			const inputUser = await managers.appUsersManager.getUserInput(props.peerId.toUserId());
			if (payWithStars$) invoice = {
				_: "inputInvoicePremiumGiftStars",
				user_id: inputUser,
				months: props.chosenGift.months,
				message: textWithEntities()
			};
			else invoice = {
				_: "inputInvoicePremiumGiftCode",
				purpose: {
					_: "inputStorePaymentPremiumGiftCode",
					users: [inputUser],
					currency: props.chosenGift.currency,
					amount: props.chosenGift.price,
					message: textWithEntities()
				},
				option: props.chosenGift.raw
			};
		}
		try {
			(await createPaymentPopup({
				inputInvoice: invoice,
				noShowIfStars: true,
				purpose: "stargift"
			})).addEventListener("finish", (result) => {
				if (result === "paid" || result === "pending") {
					props.onClose();
					if (props.chosenGift.type === "stargift" && props.chosenGift.raw._ === "starGift" && props.chosenGift.raw.per_user_total && props.chosenGift.raw.per_user_remains) toastNew({
						langPackKey: "StarGiftLimitSent",
						langPackArguments: [props.chosenGift.raw.per_user_remains - 1]
					});
				} else setSending(false);
			});
		} catch (err) {
			setSending(false);
			toastNew({ langPackKey: "Error.AnError" });
			console.error("send gift error", err);
		}
	}
	return (() => {
		var _el$44 = _tmpl$10(), _el$45 = _el$44.firstChild, _el$46 = _el$45.firstChild, _el$47 = _el$45.nextSibling;
		insert(_el$45, createComponent(ButtonIconTsx, {
			icon: "back",
			get ["aria-label"]() {
				return langPack_default.format("StarsRating.Back", true);
			},
			get onClick() {
				return props.onBack;
			}
		}), _el$46);
		insert(_el$46, () => i18n("StarGiftSendGift"));
		insert(_el$45, StarsBalance, null);
		insert(_el$47, createComponent(Scrollable, { get children() {
			return [
				createComponent(FakeBubbles, {
					get peerId() {
						return props.peerId;
					},
					get ["class"]() {
						return sendGift_module_default.bubblesContainer;
					},
					get children() {
						return createComponent(ServiceBubble, {
							get message() {
								return message();
							},
							get children() {
								return memo(() => props.chosenGift.type === "stargift")() ? createComponent(StarGiftBubble, {
									get gift() {
										return props.chosenGift;
									},
									get fromId() {
										return rootScope.myId;
									},
									get asUpgrade() {
										return withUpgrade();
									},
									get ownerId() {
										return props.peerId;
									},
									get message() {
										return textWithEntities();
									},
									wrapStickerOptions: {
										play: true,
										loop: false
									}
								}) : createComponent(PremiumGiftBubble, {
									get title() {
										return i18n("ActionGiftPremiumTitle2", [formatMonthsDuration(props.chosenGift.months, false)]);
									},
									get subtitle() {
										return memo(() => !!textWithEntities())() ? wrapRichText(textWithEntities().text, { entities: textWithEntities().entities }) : i18n("ActionGiftPremiumSubtitle2");
									},
									get buttonText() {
										return i18n("ActionGiftPremiumView");
									},
									get assetName() {
										return `Gift${props.chosenGift.months}`;
									}
								});
							}
						});
					}
				}),
				(() => {
					var _el$48 = _tmpl$$4();
					insert(_el$48, (() => {
						var _c$3 = memo(() => !!(props.chosenGift.type === "stargift" && props.chosenGift.raw.availability_total));
						return () => _c$3() && createComponent(StarGiftLimitedProgress, { get gift() {
							return props.chosenGift.raw;
						} });
					})(), null);
					insert(_el$48, createComponent(InputFieldTsx, {
						get ["class"]() {
							return sendGift_module_default.formInput;
						},
						placeholder: "StarGiftMessagePlaceholder",
						instanceRef: (input) => {
							input.input.setAttribute("aria-label", langPack_default.format("StarGiftMessagePlaceholder", true));
							const editor = attachPlainMessageEditor(input.input);
							onCleanup(() => editor.destroy());
							input.input.addEventListener("input", () => {
								const value = getRichValueWithCaret(input.input, true);
								setTextWithEntities(value.value ? {
									_: "textWithEntities",
									text: value.value,
									entities: value.entities
								} : void 0);
							});
						},
						get maxLength() {
							return useAppState()[0].appConfig.stargifts_message_length_max;
						}
					}), null);
					insert(_el$48, (() => {
						var _c$4 = memo(() => props.chosenGift.type === "stargift");
						return () => _c$4() && createComponent(Row, { get children() {
							return [createComponent(Row.CheckboxFieldToggle, { get children() {
								return createComponent(CheckboxFieldTsx, {
									get checked() {
										return anonymous();
									},
									toggle: true,
									onChange: setAnonymous
								});
							} }), createComponent(Row.Title, { get children() {
								return i18n("StarGiftHideMyName");
							} })];
						} });
					})(), null);
					insert(_el$48, (() => {
						var _c$5 = memo(() => !!("months" in props.chosenGift && props.chosenGift.priceStars));
						return () => _c$5() && createComponent(Row, { get children() {
							return [createComponent(Row.CheckboxFieldToggle, { get children() {
								return createComponent(CheckboxFieldTsx, {
									get checked() {
										return payWithStars();
									},
									toggle: true,
									onChange: setPayWithStars
								});
							} }), createComponent(Row.Title, { get children() {
								return createComponent(I18nTsx, {
									key: "PayWithStars",
									get args() {
										return [createComponent(StarsStar, {}), numberThousandSplitterForStars(props.chosenGift.priceStars)];
									}
								});
							} })];
						} });
					})(), null);
					createRenderEffect(() => className$3(_el$48, sendGift_module_default.formSheet));
					return _el$48;
				})(),
				(() => {
					var _el$49 = _tmpl$$4();
					insert(_el$49, (() => {
						var _c$6 = memo(() => props.chosenGift.type === "stargift");
						return () => _c$6() ? i18n("StarGiftHideMyNameHint", [wrapRichText(props.peerName), wrapRichText(props.peerName)]) : "";
					})());
					createRenderEffect(() => className$3(_el$49, sendGift_module_default.formHint));
					return _el$49;
				})(),
				memo(() => memo(() => !!(props.chosenGift.type === "stargift" && props.chosenGift.raw.upgrade_stars && giftPolicy?.upgradeAllowed && !giftPolicy.forceUpgrade))() && [(() => {
					var _el$50 = _tmpl$$4();
					insert(_el$50, createComponent(Row, { get children() {
						return [createComponent(Row.CheckboxFieldToggle, { get children() {
							return createComponent(CheckboxFieldTsx, {
								get checked() {
									return withUpgrade();
								},
								toggle: true,
								onChange: setWithUpgrade
							});
						} }), createComponent(Row.Title, { get children() {
							return createComponent(I18nTsx, {
								key: "StarGiftMakeUnique",
								get args() {
									return [createComponent(StarsStar, {}), numberThousandSplitterForStars(props.chosenGift.raw.upgrade_stars)];
								}
							});
						} })];
					} }));
					createRenderEffect(() => className$3(_el$50, sendGift_module_default.formSheet));
					return _el$50;
				})(), (() => {
					var _el$51 = _tmpl$$4();
					insert(_el$51, createComponent(I18nTsx, {
						key: "StarGiftMakeUniqueHint",
						get args() {
							return [wrapRichText(props.peerName), (() => {
								const a = anchorCallback(() => createStarGiftUpgradePopup({
									gift: props.chosenGift,
									descriptionForPeerId: props.peerId
								}));
								a.append(i18n("StarGiftMakeUniqueLink"));
								return a;
							})()];
						}
					}));
					createRenderEffect(() => className$3(_el$51, sendGift_module_default.formHint));
					return _el$51;
				})()])
			];
		} }));
		insert(_el$44, createComponent(Button, {
			get ["class"]() {
				return `${sendGift_module_default.formSend} btn-primary btn-color-primary`;
			},
			onClick: handleSubmit,
			get disabled() {
				return sending();
			},
			get children() {
				return createComponent(I18nTsx, {
					key: "StarGiftSend",
					get args() {
						return [(() => {
							if (props.chosenGift.type === "stargift") {
								const gift = props.chosenGift.raw;
								let stars = gift.stars;
								if (withUpgrade()) stars = (0, import_BigInteger.default)(stars).add(gift.upgrade_stars).toString();
								return paymentsWrapCurrencyAmount(stars, "XTR");
							}
							if (payWithStars()) return paymentsWrapCurrencyAmount(props.chosenGift.priceStars, "XTR");
							return paymentsWrapCurrencyAmount(props.chosenGift.price, props.chosenGift.currency);
						})()];
					}
				});
			}
		}), null);
		createRenderEffect((_p$) => {
			var _v$38 = sendGift_module_default.secondPageContainer, _v$39 = sendGift_module_default.secondPageHeader, _v$40 = sendGift_module_default.secondPageBody;
			_v$38 !== _p$.e && className$3(_el$44, _p$.e = _v$38);
			_v$39 !== _p$.t && className$3(_el$45, _p$.t = _v$39);
			_v$40 !== _p$.a && className$3(_el$47, _p$.a = _v$40);
			return _p$;
		}, {
			e: void 0,
			t: void 0,
			a: void 0
		});
		return _el$44;
	})();
}
async function showSendGiftPopup(options) {
	const managers = bindManagersToSession(rootScope.managers);
	const { peerId, birthday, resaleParams } = options;
	const [show, setShow] = createSignal(true);
	let containerEl;
	const [profileStore, profileStoreActions] = createProfileGiftsStore({
		peerId: rootScope.myId,
		initialFilters: {
			unlimited: false,
			limited: false,
			upgradable: false
		}
	});
	const [loadedPremiumOptions, loadedGiftOptions, peer, cachedBirthdayNearby, userFull] = await Promise.all([
		peerId.isUser() ? rootScope.managers.appGiftsManager.getPremiumGiftOptions() : [],
		rootScope.managers.appGiftsManager.getStarGiftOptions(),
		rootScope.managers.appPeersManager.getPeer(peerId),
		peerId.isUser() ? rootScope.managers.appPromoManager.isCachedBirthdayNearby(peerId).catch(() => false) : false,
		peerId.isUser() && peerId !== rootScope.myId ? rootScope.managers.appProfileManager.getProfile(peerId.toUserId()).catch(() => void 0) : void 0,
		!resaleParams && peerId !== rootScope.myId && profileStoreActions.loadNext()
	]);
	const disallowedGifts = userFull?.disallowed_gifts?.pFlags;
	const premiumOptions = disallowedGifts?.disallow_premium_gifts ? [] : loadedPremiumOptions;
	const allowedGiftOptions = loadedGiftOptions.filter((gift) => isStarGiftAllowed(gift, disallowedGifts));
	const allowedOwnedGifts = unwrap(profileStore.items).filter((gift) => isStarGiftAllowed(gift, disallowedGifts));
	const giftOptions = birthday || cachedBirthdayNearby || isBirthdayNearby(userFull?.birthday) ? prioritizeBirthdayGifts(allowedGiftOptions) : allowedGiftOptions;
	const hasAvailableGift = premiumOptions.length > 0 || giftOptions.length > 0 || allowedOwnedGifts.length > 0;
	if (!resaleParams && peer._ === "user" && peerId !== rootScope.myId && !hasAvailableGift) {
		setShow(false);
		toastNew({ langPackKey: "GiftRecipientDoesNotAccept" });
		return;
	}
	const [chosenGift, setChosenGift] = createSignal();
	if (resaleParams) {
		const selectedGift = giftOptions.find((it) => it.raw.id === resaleParams.giftId && it.isResale);
		if (!selectedGift && disallowedGifts && loadedGiftOptions.some((it) => it.raw.id === resaleParams.giftId && it.isResale)) {
			setShow(false);
			toastNew({ langPackKey: "GiftRecipientDoesNotAccept" });
			return;
		}
		setChosenGift(selectedGift);
	}
	const [currentPage, setCurrentPage] = createSignal(resaleParams ? 2 : 0);
	const secondPageNavigationItem = {
		type: "left",
		onPop: () => void setCurrentPage(0)
	};
	onCleanup(() => {
		appNavigationController.removeItem(secondPageNavigationItem);
	});
	createPopup(() => createComponent(PopupElement, {
		managers,
		get ["class"]() {
			return sendGift_module_default.popup;
		},
		closable: true,
		get show() {
			return show();
		},
		containerProps: { ref: (element) => containerEl = element },
		get children() {
			return [createComponent(TransitionSliderTsx, {
				type: "navigation",
				transitionTime: 150,
				animateFirst: false,
				onTransitionStart: (id) => {
					containerEl.classList.toggle(sendGift_module_default.isChosenGift, id === 1);
					if (id === 0) appNavigationController.removeItem(secondPageNavigationItem);
					else appNavigationController.pushItem(secondPageNavigationItem);
				},
				onTransitionEnd: (id) => {
					if (id === 0) setChosenGift(void 0);
				},
				get currentPage() {
					return currentPage();
				},
				get children() {
					return [
						createComponent(GiftOptionsPage, {
							peer,
							peerId,
							premiumOptions,
							giftOptions,
							disallowedGifts,
							onGiftChosen: (option) => {
								setChosenGift(option);
								setCurrentPage(option.isResale ? 2 : 1);
							},
							onClose: () => setShow(false),
							profileStore,
							profileStoreActions,
							get initialCategory() {
								return options.category;
							}
						}),
						createComponent(Show, {
							get when() {
								return memo(() => chosenGift() !== void 0)() && !chosenGift().isResale;
							},
							get children() {
								return createComponent(ChosenGiftPage, {
									peerId,
									get peerName() {
										return memo(() => peer._ === "user")() ? peer.first_name : peer.title;
									},
									get chosenGift() {
										return chosenGift();
									},
									disallowedGifts,
									onBack: () => setCurrentPage(0),
									onClose: () => setShow(false)
								});
							}
						}),
						createComponent(Show, {
							get when() {
								return memo(() => chosenGift() !== void 0)() && chosenGift().isResale;
							},
							get children() {
								return createComponent(ResaleOptionsPage, {
									get gift() {
										return chosenGift();
									},
									peerId,
									isFirst: resaleParams !== void 0,
									onBack: () => setCurrentPage(0),
									onClose: () => setShow(false),
									get initialFilter() {
										return resaleParams?.filter;
									}
								});
							}
						})
					];
				}
			}), createComponent(FloatingStarsBalance, { get ["class"]() {
				return sendGift_module_default.starsBalance;
			} })];
		}
	}));
}
delegateEvents(["click", "keydown"]);
//#endregion
//#region src/components/popups/sendGiftPicker.ts
/**
* The recipient picker behind every "send a gift" entry — the Settings row, the
* birthday suggestion and `tg://settings/send-gift` all open the same one, and
* pass only what is their own (the birthdays it puts on top, for instance).
*/
function showSendGiftPicker(options) {
	return showPickUserPopup({
		titleLangKey: "SendGiftTo",
		placeholder: "Chat.Menu.SendGift",
		selfPresence: "SendGiftSelfCaption",
		meAsSaved: false,
		filterPeerTypeBy: ["isRegularUser", "isBroadcast"],
		onSelect: ([{ peerId }]) => {
			showSendGiftPopup({ peerId });
		},
		...options
	});
}
//#endregion
//#region src/components/popups/joinChatInvite.tsx
var _tmpl$$3 = /*#__PURE__*/ template(`<div class="popup-join-chat-invite-request-caption secondary">`);
var getJoinLangKey = (chatInvite) => {
	if (chatInvite._ === "chatInvitePeek") return chatInvite.chat.pFlags.broadcast ? "JoinByPeekChannelTitle" : "JoinByPeekGroupTitle";
	if (chatInvite.pFlags.request_needed) return "RequestJoin.Button";
	if (chatInvite.pFlags.broadcast) return "JoinByPeekChannelTitle";
	return "JoinByPeekGroupTitle";
};
async function wrapChatInviteTitle(chatInvite, middleware) {
	const title = document.createElement("div");
	title.classList.add("peer-title");
	const icons = await generateTitleIcons({
		peerId: 0,
		noVerifiedIcon: false,
		noFakeIcon: false,
		noPremiumIcon: false,
		peer: {
			_: "channel",
			pFlags: {
				verified: chatInvite.pFlags.verified,
				scam: chatInvite.pFlags.scam,
				fake: chatInvite.pFlags.fake
			},
			date: 0,
			id: 0,
			photo: void 0,
			title: ""
		},
		wrapOptions: { middleware }
	});
	const titleFragment = wrapEmojiText(chatInvite.title);
	if (icons.elements.length || icons.botVerification) {
		title.classList.add("with-icons");
		const titleInner = document.createElement("span");
		titleInner.classList.add("peer-title-inner");
		titleInner.append(titleFragment);
		if (icons.botVerification) titleInner.append(icons.botVerification);
		title.append(titleInner, ...icons.elements);
	} else setInnerHTML(title, titleFragment);
	return title;
}
async function wrapChatInviteAvatar(chatInvite, middleware, size) {
	const avatarElem = avatarNew({
		middleware,
		size,
		isDialog: false,
		isSubscribed: !!chatInvite.subscription_pricing || void 0
	});
	if (chatInvite.photo?._ === "photo") {
		await wrapPhotoToAvatar(avatarElem, chatInvite.photo);
		if (chatInvite.subscription_pricing) avatarElem.setIsSubscribed(true);
	} else {
		avatarElem.render({ peerTitle: chatInvite.title });
		await avatarElem.readyThumbPromise;
	}
	return avatarElem;
}
function openChatFromInvite(chatId) {
	const peerId = chatId.toPeerId(true);
	hotReloadGuard.appImManager.open({ peerId });
}
function importChatInvite(hash, chatTitle) {
	rootScope.managers.appChatInvitesManager.importChatInvite(hash).then((result) => {
		if (typeof result === "object") {
			hotReloadGuard.appImManager.openJoinChatWebView(result, chatTitle);
			return;
		}
		if (result) openChatFromInvite(result);
	}, (error) => {
		if (error.type === "INVITE_REQUEST_SENT") toastNew({ langPackKey: "RequestToJoinSent" });
	});
}
async function showJoinChatInvitePopup(hash, chatInvite) {
	const middlewareHelper = getMiddleware();
	const middleware = middlewareHelper.get();
	const [avatarElem, title] = await Promise.all([wrapChatInviteAvatar(chatInvite, middleware, 100), wrapChatInviteTitle(chatInvite, middleware)]);
	const isBroadcast = chatInvite.pFlags.broadcast;
	showPeerPopup("popup-join-chat-invite", {
		closable: true,
		noHeader: true,
		body: true,
		buttons: addCancelButton([{
			langKey: getJoinLangKey(chatInvite),
			callback: () => {
				importChatInvite(hash, chatInvite.title);
			}
		}]),
		content: [
			createComponent(MediaHeader, { get children() {
				return [
					createComponent(MediaHeader.Sticker, {
						size: 100,
						get element() {
							return avatarElem.node;
						}
					}),
					createComponent(MediaHeader.Title, { children: title }),
					createComponent(MediaHeader.Subtitle, {
						color: "secondary",
						get children() {
							return i18n(isBroadcast ? "Subscribers" : "Members", [numberThousandSplitter(chatInvite.participants_count)]);
						}
					})
				];
			} }),
			memo(() => memo(() => !!chatInvite.about)() && createComponent(MediaHeader.Subtitle, {
				"class": "popup-join-chat-invite-about",
				get children() {
					return wrapEmojiText(chatInvite.about);
				}
			})),
			memo(() => memo(() => !!chatInvite.pFlags.request_needed)() && (() => {
				var _el$ = _tmpl$$3();
				insert(_el$, () => i18n(isBroadcast ? "RequestToJoinChannelDescription" : "RequestToJoinGroupDescription"));
				return _el$;
			})())
		],
		onCloseAfterTimeout: () => middlewareHelper.destroy()
	});
}
//#endregion
//#region src/lib/appManagers/utils/payments/starsSubscription.ts
function getStarsSubscriptionPresentation(subscription, now, business = false) {
	const expired = subscription.until_date <= now;
	const canceled = !!(subscription.pFlags.canceled || subscription.pFlags.bot_canceled);
	const missingBalance = !!subscription.pFlags.missing_balance;
	const canRefulfill = !!subscription.pFlags.can_refulfill && !expired;
	const botCanceledKey = business ? "Stars.Subscription.BusinessCancelled" : "Stars.Subscription.BotCancelled";
	return {
		expired,
		canceled,
		missingBalance,
		canRefulfill,
		statusKey: subscription.pFlags.bot_canceled ? botCanceledKey : subscription.pFlags.canceled ? "Stars.Subscriptions.Cancelled" : expired ? "Stars.Subscription.Expired" : missingBalance ? "Stars.Subscription.MissingBalance" : void 0,
		dateKey: expired ? "Stars.Subscriptions.Expired" : canceled ? "Stars.Subscriptions.Expires" : "Stars.Subscriptions.Renews",
		dateLabelKey: expired ? "Stars.Subscription.Expired" : canceled ? "Stars.Subscription.Expires" : "Stars.Subscription.Renews",
		captionKey: canRefulfill ? "Stars.Subscription.RestoreCaption" : subscription.pFlags.bot_canceled ? botCanceledKey : expired ? "Stars.Subscription.ExpiredCaption" : subscription.pFlags.canceled ? "Stars.Subscription.Cancelled" : missingBalance ? "Stars.Subscription.MissingBalanceCaption" : "Stars.Subscription.Active",
		showPrice: !canceled && !expired
	};
}
//#endregion
//#region src/helpers/getStarsSpendPurposePeerId.ts
/**
* Peer the stars are about to be spent on, to be passed as `spend_purpose_peer` of `inputStorePaymentStarsTopup`.
* Only bots and channels count as a purpose, monoforums resolve to their broadcast.
*/
function getStarsSpendPurposePeerId(peerId) {
	if (!peerId) return;
	const peer = apiManagerProxy.getPeer(peerId);
	if (!peer) return;
	if (peer._ === "channel") return peer.pFlags?.monoforum && peer.linked_monoforum_id ? peer.linked_monoforum_id.toPeerId(true) : peerId;
	return peer._ === "user" && peer.pFlags?.bot ? peerId : void 0;
}
//#endregion
//#region src/components/popups/stars.tsx
var stars_exports = /* @__PURE__ */ __exportAll({
	STARS_POPUP_KIND: () => STARS_POPUP_KIND,
	StarsTransactionsList: () => StarsTransactionsList,
	default: () => showStarsPopup,
	getExamplesAnchor: () => getExamplesAnchor,
	getStarsTransactionTitle: () => getStarsTransactionTitle,
	getStarsTransactionTitleAndMedia: () => getStarsTransactionTitleAndMedia,
	renderStarsTransaction: () => renderStarsTransaction,
	showGiftStarsPicker: () => showGiftStarsPicker
});
var _tmpl$$2 = /*#__PURE__*/ template(`<b>`);
var _tmpl$2$2 = /*#__PURE__*/ template(`<div class="popup-stars-empty text-center">`);
var _tmpl$3$2 = /*#__PURE__*/ template(`<div>`);
var _tmpl$4$2 = /*#__PURE__*/ template(`<span class="popup-stars-cancelled danger">`);
var _tmpl$5$2 = /*#__PURE__*/ template(`<div class=popup-stars-options>`);
var _tmpl$6$2 = /*#__PURE__*/ template(`<div class=popup-stars-option><div class=popup-stars-option-title><span dir=ltr></span></div><div class=popup-stars-option-subtitle>`);
function getStarsTransactionTitle(transaction) {
	const presentation = getStarsTransactionPresentation(transaction);
	return i18n(presentation.titleKey, presentation.titleArgs);
}
function getExamplesAnchor(hide) {
	let loading = false;
	const popularAppBotsPromise = rootScope.managers.appAttachMenuBotsManager.getPopularAppBots();
	const anchor = anchorCallback(async () => {
		if (loading) return;
		loading = true;
		const { userIds: botIds } = await popularAppBotsPromise;
		loading = false;
		showPickUserPopup({
			onSelect: ([obj]) => {
				hide(() => {
					hotReloadGuard.appImManager.setInnerPeer(obj);
				});
			},
			peerType: ["custom"],
			getMoreCustom: async () => {
				return {
					result: botIds.map((botId) => botId.toPeerId(false)),
					isEnd: true
				};
			},
			titleLangKey: "SearchAppsExamples"
		});
	});
	anchor.append(i18n("GiftStarsSubtitleLinkName"));
	return anchor;
}
var starsTransactionPeerIcons = {
	starsTransactionPeerAppStore: "apple_filled",
	starsTransactionPeerPlayMarket: "android_filled",
	starsTransactionPeerPremiumBot: "premium",
	starsTransactionPeerFragment: "ton",
	starsTransactionPeerAds: "ads",
	starsTransactionPeerAPI: "bots",
	starsTransactionPeerUnsupported: "info"
};
async function getStarsTransactionTitleAndMedia({ transaction, middleware, size, paidMedia, paidMediaPeerId, chatInvite, subscription, photo }) {
	const managers = bindManagersToSession(rootScope.managers);
	const presentation = transaction && getStarsTransactionPresentation(transaction);
	const [title, media] = await Promise.all([(() => {
		if (subscription) return wrapPeerTitle({ peerId: getPeerId(subscription.peer) });
		if (chatInvite) return wrapChatInviteTitle(chatInvite, middleware);
		if (paidMedia?.extended_media?.length || transaction?.extended_media?.length) return wrapPeerTitle({ peerId: paidMediaPeerId || getPeerId(transaction.peer.peer) });
		if (transaction?.stargift) {
			const gift = transaction.stargift;
			const title = gift._ === "starGiftUnique" ? `${gift.title} #${gift.num}` : gift.title;
			if (title) return wrapEmojiText(title);
		}
		if (!transaction || transaction.peer._ === "starsTransactionPeer") return wrapPeerTitle({ peerId: transaction ? getPeerId(transaction.peer.peer) : paidMediaPeerId });
		if (getStarsTransactionPresentation(transaction).anonymousGift) return i18n("Stars.Transaction.UnknownPeer");
		const provider = starsTransactionProviders[transaction.peer._];
		return i18n(provider || "Stars.Transaction.Unsupported");
	})(), (async () => {
		const renderIcon = () => {
			const container = document.createElement("div");
			container.classList.add("popup-stars-transaction-media");
			const icon = presentation?.anonymousGift ? "gift" : presentation?.kind === "search" ? "search" : presentation?.kind === "api" ? "bots" : presentation?.kind === "adsProceeds" ? "ads" : starsTransactionPeerIcons[transaction?.peer._] || presentation?.icon || "star";
			container.append(Icon(icon));
			return container;
		};
		const _wrapPhoto = async (container, photo) => {
			const loadPromises = [];
			wrapPhoto({
				container,
				photo,
				boxWidth: size,
				boxHeight: size,
				middleware,
				loadPromises,
				withoutPreloader: true,
				size: isWebDocument(photo) ? {
					_: "photoSizeEmpty",
					type: ""
				} : void 0
			});
			await Promise.all(loadPromises);
		};
		const itemPhoto = photo || subscription?.photo;
		if (itemPhoto) {
			const container = document.createElement("div");
			container.classList.add("popup-stars-transaction-media");
			container.style.width = container.style.height = size + "px";
			await _wrapPhoto(container, itemPhoto);
			return container;
		}
		if (chatInvite) return (await wrapChatInviteAvatar(chatInvite, middleware, 90)).node;
		if (paidMedia?.extended_media?.length || transaction?.extended_media?.length) {
			const array = paidMedia?.extended_media || transaction.extended_media;
			let media;
			if (paidMedia) {
				const extendedMedia = paidMedia.extended_media[0];
				media = generatePhotoForExtendedMediaPreview(extendedMedia);
			} else {
				const extendedMedia = transaction.extended_media[0];
				media = extendedMedia.photo || extendedMedia.document;
			}
			if (!media) return renderIcon();
			const container = document.createElement("div");
			container.classList.add("popup-stars-transaction-media", "is-paid-media");
			if (paidMedia) {
				const spoilerContainer = await wrapMediaSpoiler({
					media,
					animationGroup: "chat",
					middleware,
					width: size,
					height: size
				});
				container.append(spoilerContainer);
			} else await _wrapPhoto(container, media);
			const length = array.length;
			if (length > 1) {
				const counter = document.createElement("span");
				counter.classList.add("popup-stars-transaction-media-counter");
				counter.textContent = "" + length;
				container.append(counter);
			}
			return container;
		}
		if (transaction?.stargift) {
			const container = document.createElement("div");
			container.classList.add("popup-stars-transaction-media");
			const gift = await managers.appGiftsManager.wrapGift(transaction.stargift);
			if (gift?.sticker) await wrapSticker({
				doc: gift.sticker,
				div: container,
				width: size,
				height: size,
				middleware,
				play: false,
				loop: false
			});
			else container.append(Icon("gift"));
			return container;
		}
		if (transaction?.photo) {
			const container = document.createElement("div");
			container.classList.add("popup-stars-transaction-media", "is-paid-media");
			await _wrapPhoto(container, transaction?.photo);
			return container;
		}
		if (presentation && [
			"search",
			"api",
			"adsProceeds"
		].includes(presentation.kind)) return renderIcon();
		let peerId;
		if (subscription) peerId = getPeerId(subscription.peer);
		else if (transaction && transaction.peer._ === "starsTransactionPeer") peerId = getPeerId(transaction.peer.peer);
		else if (paidMediaPeerId) peerId = paidMediaPeerId;
		if (peerId) {
			const avatar = avatarNew({
				peerId,
				size,
				middleware
			});
			await avatar.readyThumbPromise;
			return avatar.node;
		}
		return renderIcon();
	})()]);
	return {
		title,
		media
	};
}
/**
* Picks who the stars are for, then opens the top-up for them — the row inside
* this popup and `tg://settings/stars/gift` are the same thing.
*/
function showGiftStarsPicker() {
	return showSendGiftPicker({
		titleLangKey: "TelegramStarsGift",
		onSelect: ([{ peerId }]) => {
			showStarsPopup({ giftPeerId: peerId });
		}
	});
}
async function renderStarsTransaction(transaction, middleware, ledgerPeerId) {
	const { title, media } = await getStarsTransactionTitleAndMedia({
		transaction,
		middleware,
		size: 42
	});
	return createRoot((dispose) => {
		middleware.onDestroy(dispose);
		const presentation = getStarsTransactionPresentation(transaction);
		const operation = getStarsTransactionTitle(transaction);
		const useOperationTitle = [
			"media",
			"search",
			"api",
			"adsProceeds",
			"business"
		].includes(presentation.kind);
		const productTitle = ["payment", "subscription"].includes(presentation.kind) && transaction.title;
		const _title = useOperationTitle ? operation : productTitle ? wrapEmojiText(productTitle) : title;
		const midtitle = useOperationTitle || productTitle ? title : operation;
		const subtitle = formatFullSentTime(transaction.date);
		const amount = formatStarsAmountExact(transaction.amount);
		const subtitleStatus = presentation.statusKey && i18n(presentation.statusKey);
		let container;
		createComponent(Row, {
			ref(r$) {
				var _ref$ = container;
				typeof _ref$ === "function" ? _ref$(r$) : container = r$;
			},
			"class": "transaction-row",
			noWrap: true,
			role: "button",
			tabIndex: 0,
			get style() {
				return {
					"grid-template-columns": amount.length > 14 ? "3.5rem minmax(0, 1fr)" : "3.5rem minmax(0, 1fr) auto",
					"grid-template-areas": amount.length > 14 ? "\"left title\" \"left midtitle\" \"left subtitle\" \"right right\"" : void 0
				};
			},
			clickable: () => {
				createPaymentPopup({
					transaction,
					ledgerPeerId
				});
			},
			get children() {
				return [
					createComponent(Row.Title, { get children() {
						var _el$ = _tmpl$$2();
						insert(_el$, _title);
						return _el$;
					} }),
					createComponent(Row.Midtitle, { children: midtitle }),
					createComponent(Row.Subtitle, { children: subtitleStatus ? [
						subtitle,
						" — ",
						subtitleStatus
					] : subtitle }),
					createComponent(Row.RightContent, { get children() {
						return createComponent(StarsChange, {
							stars: amount,
							get ton() {
								return transaction.amount._ === "starsTonAmount";
							}
						});
					} }),
					createComponent(Row.Media, {
						size: "abitbigger",
						children: media
					})
				];
			}
		});
		return container;
	});
}
function StarsTransactionsList(props) {
	const [tab, setTab] = createSignal(0);
	const lists = [
		void 0,
		true,
		false
	].map((inbound) => {
		const [rows, setRows] = createSignal([]);
		const [loading, setLoading] = createSignal(false);
		const [error, setError] = createSignal(false);
		const [ended, setEnded] = createSignal(false);
		let offset = "";
		const seen = /* @__PURE__ */ new Set();
		const key = (transaction) => `${transaction.id}:${!!transaction.pFlags.refund}:${getStarsTransactionPresentation(transaction).incoming}`;
		const load = async () => {
			if (loading() || ended()) return;
			setLoading(true);
			setError(false);
			try {
				const status = await rootScope.managers.appPaymentsManager.getStarsTransactions(offset, inbound, props.ton, props.peerId);
				if (!props.middleware()) return;
				const transactions = (status.history || []).filter((transaction) => !seen.has(key(transaction)));
				const rendered = await Promise.all(transactions.map((transaction) => renderStarsTransaction(transaction, props.middleware, props.peerId)));
				if (!props.middleware()) return;
				transactions.forEach((transaction) => seen.add(key(transaction)));
				setRows((rows) => [...rows, ...rendered]);
				setEnded(!status.next_offset || status.next_offset === offset);
				offset = status.next_offset;
			} catch (err) {
				if (props.middleware()) setError(true);
			} finally {
				if (props.middleware()) setLoading(false);
			}
		};
		return {
			rows,
			loading,
			error,
			ended,
			load
		};
	});
	lists[0].load();
	props.setLoadMore(() => {
		const list = lists[tab()];
		if (!list.error()) list.load();
	});
	return createComponent(Tabs.Simple, {
		tab,
		onChange: (index) => {
			setTab(index);
			if (!lists[index].rows().length) lists[index].load();
		},
		"class": "popup-stars-transactions",
		get menu() {
			return [
				i18n("StarsTransactionsAll"),
				i18n("StarsTransactionsIncoming"),
				i18n("StarsTransactionsOutgoing")
			];
		},
		contentWrapper: (content) => createComponent(Section, {
			"class": "popup-stars-transactions-section",
			children: content
		}),
		get content() {
			return lists.map((list) => (() => {
				var _el$2 = _tmpl$3$2();
				insert(_el$2, () => list.rows(), null);
				insert(_el$2, createComponent(Show, {
					get when() {
						return list.error();
					},
					get children() {
						return createComponent(Button, {
							"class": "btn-primary btn-transparent",
							text: "Stars.Transaction.Retry",
							onClick: () => void list.load()
						});
					}
				}), null);
				insert(_el$2, createComponent(Show, {
					get when() {
						return memo(() => !!list.ended())() && !list.rows().length;
					},
					get children() {
						var _el$3 = _tmpl$2$2();
						insert(_el$3, () => i18n("Stars.Transaction.Empty"));
						return _el$3;
					}
				}), null);
				insert(_el$2, createComponent(Show, {
					get when() {
						return memo(() => !!!list.ended())() && !list.error();
					},
					get children() {
						return createComponent(Button, {
							"class": "btn-primary btn-transparent",
							get text() {
								return list.loading() ? "Loading" : "ShowMoreOptions";
							},
							get disabled() {
								return list.loading();
							},
							onClick: () => void list.load()
						});
					}
				}), null);
				return _el$2;
			})());
		}
	});
}
/** So `starsPay` can take away whichever Stars popup is open when it finishes. */
var STARS_POPUP_KIND = Symbol("stars-popup");
function showStarsPopup(options = {}) {
	const managers = bindManagersToSession(rootScope.managers);
	const middlewareHelper = getMiddleware();
	const middleware = middlewareHelper.get();
	const listenerSetter = new ListenerSetter();
	const [show, setShow] = createSignal(false);
	const purposePeerId = getStarsSpendPurposePeerId(options.spendPurposePeerId);
	const handle = { hide: () => setShow(false) };
	let options$;
	let appConfig$;
	let purchaseBlocked;
	let toppedUp;
	let content;
	let onScrolledBottom;
	const setLoadMore = (load) => onScrolledBottom = load;
	const deferredCloseCallbacks = [];
	const hideWithCallback = (callback) => {
		deferredCloseCallbacks.push(callback);
		setShow(false);
	};
	const renderSubscription = async (subscription) => {
		const peerId = getPeerId(subscription.peer);
		const title = await wrapPeerTitle({ peerId });
		title.classList.add("text-bold");
		const { media } = await getStarsTransactionTitleAndMedia({
			transaction: void 0,
			subscription,
			middleware,
			size: 42
		});
		const user = peerId.isUser() && useUser(peerId.toUserId());
		const business = user && user._ === "user" && !user.pFlags.bot;
		const presentation = getStarsSubscriptionPresentation(subscription, tsNow(true), business);
		return createRoot((dispose) => {
			middleware.onDestroy(dispose);
			let container;
			createComponent(Row, {
				ref(r$) {
					var _ref$2 = container;
					typeof _ref$2 === "function" ? _ref$2(r$) : container = r$;
				},
				"class": "transaction-row",
				noWrap: true,
				clickable: async () => {
					(await createPaymentPopup({
						subscription,
						noPaymentForm: true
					})).addEventListener("finish", (result) => {
						if (result === "paid") setShow(false);
					});
				},
				get children() {
					return [
						createComponent(Row.Title, {
							get titleRight() {
								return memo(() => !!presentation.showPrice)() && createComponent(StarsAmount, { get stars() {
									return subscription.pricing.amount;
								} });
							},
							children: title
						}),
						createComponent(Row.Midtitle, {
							get midtitleRight() {
								return memo(() => !!presentation.statusKey)() && (() => {
									var _el$4 = _tmpl$4$2();
									insert(_el$4, () => i18n(presentation.statusKey));
									return _el$4;
								})();
							},
							get children() {
								return memo(() => !!subscription.title)() && wrapEmojiText(subscription.title);
							}
						}),
						createComponent(Row.Subtitle, {
							get subtitleRight() {
								return memo(() => !!presentation.showPrice)() && (subscription.pricing.period === 2592e3 ? i18n("Stars.Subscriptions.PerMonth") : i18n("Stars.Subscription.PerPeriod", [wrapCallDuration(subscription.pricing.period)]));
							},
							get children() {
								return i18n(presentation.dateKey, [formatFullSentTime(subscription.until_date, void 0, true)]);
							}
						}),
						createComponent(Row.Media, {
							size: "abitbigger",
							children: media
						})
					];
				}
			});
			return container;
		});
	};
	function renderContent(image, peerTitle, avatar) {
		const stars = useStars(options.ton);
		const starsNeeded = createMemo(() => {
			if (!options.itemPrice) return import_BigInteger.default.zero;
			return (0, import_BigInteger.default)(options.itemPrice.toString()).minus(stars());
		});
		const topupOptions = createMemo(() => {
			if (options.ton) return [];
			if (options.itemPrice) {
				const filtered = options$.filter((option) => starsNeeded().lt(option.stars));
				if (!filtered.length) return [options$[options$.length - 1]];
				return filtered;
			}
			return options$;
		});
		const alwaysVisible = topupOptions().length > 3 ? topupOptions().filter((option) => !option.pFlags.extended) : topupOptions();
		const [extended, setExtended] = createSignal(topupOptions().length <= 3);
		const displayingRows = createMemo(() => Math.ceil((extended() ? topupOptions().length : alwaysVisible.length) / 2));
		let busy = false;
		let title;
		if (options.giftPeerId && !options.itemPrice) title = i18n("GiftStarsTitle");
		else if (options.itemPrice) {
			if (options.ton) title = i18n("TonNeededTitle", [formatNanoton(starsNeeded().toString())]);
			else title = i18n("StarsNeededTitle", [starsNeeded().toJSNumber()]);
		} else if (options.ton) title = i18n("GramBalance");
		else title = i18n("TelegramStars");
		let subtitle;
		if (options.giftPeerId && !options.purpose) subtitle = [
			memo(() => i18n("GiftStarsSubtitle", [peerTitle])),
			" ",
			memo(() => getExamplesAnchor(hideWithCallback))
		];
		else if (options.ton) subtitle = i18n("TonNeededText");
		else if (options.purpose) {
			let langPackKey;
			if (options.purpose === "reaction") langPackKey = "Stars.TopUp.Reaction";
			else {
				const key = `Stars.TopUp.Label_`;
				if (langPack_default.strings.get(key + options.purpose)) langPackKey = key + options.purpose;
				else langPackKey = key + "default";
			}
			subtitle = i18n(langPackKey, [peerTitle]);
		} else if (options.itemPrice) subtitle = i18n(options.paymentForm ? "StarsNeededText" : "Stars.Subscribe.Need", [peerTitle]);
		else subtitle = i18n(purchaseBlocked ? "StarsPurchaseUnavailable" : "TelegramStarsInfo");
		const firstSection = !purchaseBlocked && createComponent(Section, {
			get caption() {
				return options.ton ? "Stars.Transaction.GramTOS" : "Stars.TOS";
			},
			get children() {
				return [(() => {
					var _el$5 = _tmpl$5$2();
					insert(_el$5, createComponent(Show, {
						get when() {
							return options.ton;
						},
						get children() {
							return createComponent(Button, {
								"class": "btn-primary btn-color-primary",
								text: "FragmentTopUp",
								onClick: () => {
									safeWindowOpen(appConfig$.ton_topup_url);
								}
							});
						}
					}), null);
					insert(_el$5, createComponent(For, {
						get each() {
							return topupOptions();
						},
						children: (option, idx) => {
							const index = createMemo(() => extended() || option.pFlags.extended ? idx() : alwaysVisible.indexOf(option));
							const translateX = createMemo(() => index() % 2 ? "calc((100% + .5rem) * var(--reflect))" : "0");
							const translateY = createMemo(() => Math.floor(index() / 2) * 79 + Math.floor(index() / 2) * 8 + "px");
							const isFullWidth = createMemo(() => {
								if (!((extended() ? topupOptions() : alwaysVisible).length % 2)) return false;
								if (extended() || option.pFlags.extended) return index() === topupOptions().length - 1;
								return index() === alwaysVisible.length - 1;
							});
							const iconsElements = StarsStackedStars({
								stars: +option.stars,
								size: 26
							});
							return (() => {
								var _el$6 = _tmpl$6$2(), _el$7 = _el$6.firstChild, _el$8 = _el$7.firstChild, _el$9 = _el$7.nextSibling;
								_el$6.$$click = async () => {
									if (busy) return;
									busy = true;
									const inputInvoice = {
										_: "inputInvoiceStars",
										purpose: options.giftPeerId ? {
											_: "inputStorePaymentStarsGift",
											amount: option.amount,
											currency: option.currency,
											stars: option.stars,
											user_id: await managers.appUsersManager.getUserInput(options.giftPeerId.toUserId())
										} : {
											_: "inputStorePaymentStarsTopup",
											amount: option.amount,
											currency: option.currency,
											stars: option.stars,
											spend_purpose_peer: purposePeerId ? await managers.appPeersManager.getInputPeerById(purposePeerId) : void 0
										}
									};
									try {
										(await createPaymentPopup({
											inputInvoice,
											paymentForm: await managers.appPaymentsManager.getPaymentForm(inputInvoice)
										})).addEventListener("finish", (result) => {
											if (result === "paid") {
												toppedUp = true;
												if (options.onTopup) {
													setShow(false);
													options.onTopup(+option.stars);
												}
											}
										});
									} catch (err) {
										console.error("stars error", err);
										toastNew({ langPackKey: "Error.AnError" });
									}
									busy = false;
								};
								insert(_el$8, () => `+${option.stars}`);
								insert(_el$7, iconsElements, null);
								insert(_el$9, () => paymentsWrapCurrencyAmount(option.amount, option.currency));
								createRenderEffect((_p$) => {
									var _v$ = !!(option.pFlags.extended && !extended()), _v$2 = !!isFullWidth(), _v$3 = `translate(${translateX()}, ${translateY()})`;
									_v$ !== _p$.e && _el$6.classList.toggle("invisible", _p$.e = _v$);
									_v$2 !== _p$.t && _el$6.classList.toggle("full", _p$.t = _v$2);
									_v$3 !== _p$.a && setStyleProperty(_el$6, "transform", _p$.a = _v$3);
									return _p$;
								}, {
									e: void 0,
									t: void 0,
									a: void 0
								});
								return _el$6;
							})();
						}
					}), null);
					createRenderEffect((_$p) => setStyleProperty(_el$5, "height", displayingRows() * 79 + (displayingRows() - 1) * 8 + "px"));
					return _el$5;
				})(), createComponent(GrowHeightReveal, {
					get when() {
						return !extended();
					},
					appear: false,
					get children() {
						return createComponent(Button, {
							"class": "btn-primary btn-transparent primary popup-stars-more",
							icon: "down",
							text: "ShowMoreOptions",
							onClick: () => setExtended((v) => !v)
						});
					}
				})];
			}
		});
		let subscriptionsOffset;
		const loadMoreSubscriptions = async () => {
			const starsStatus = await rootScope.managers.appPaymentsManager.getStarsSubscriptions(subscriptionsOffset);
			if (!middleware()) return;
			const promises = (starsStatus.subscriptions || []).map(renderSubscription);
			const rendered = await Promise.all(promises);
			if (!middleware()) return;
			setSubscriptionsLoader((value) => {
				value.count += rendered.length;
				subscriptionsOffset = starsStatus.subscriptions_next_offset;
				if (!subscriptionsOffset) value.loadMore = void 0;
				value.rendered.push(...rendered);
				return value;
			});
		};
		const [subscriptionsLoader, setSubscriptionsLoader] = createLoadableList({ loadMore: loadMoreSubscriptions });
		if (!options.ton) subscriptionsLoader().loadMore();
		const subscriptionsSection = createComponent(Section, {
			"class": "popup-stars-subscriptions-section",
			name: "Stars.Subscriptions",
			get children() {
				return [(() => {
					var _el$0 = _tmpl$3$2();
					insert(_el$0, () => subscriptionsLoader().rendered);
					return _el$0;
				})(), createComponent(Show, {
					get when() {
						return !!subscriptionsLoader().loadMore;
					},
					get children() {
						return createComponent(MoreButton, {
							get count() {
								return subscriptionsLoader().count - subscriptionsLoader().rendered.length;
							},
							callback: () => subscriptionsLoader().loadMore()
						});
					}
				})];
			}
		});
		const transactionsSection = createComponent(StarsTransactionsList, {
			get ton() {
				return options.ton;
			},
			middleware,
			setLoadMore: (load) => setLoadMore(load)
		});
		const restSection = [
			memo(() => memo(() => !!(appConfig$.stars_gifts_enabled && !options.ton && !purchaseBlocked))() && createComponent(Section, { get children() {
				return createComponent(Button, {
					"class": "btn-primary btn-transparent primary",
					text: "TelegramStarsGift",
					onClick: async () => {
						setShow(false);
						const peerId = await showContactPickerPopup();
						showStarsPopup({
							giftPeerId: peerId,
							onTopup: async (stars) => {
								toastNew({
									langPackKey: "StarsGiftSentPopupInfo",
									langPackArguments: [stars, await wrapPeerTitle({ peerId })]
								});
							}
						});
					}
				});
			} })),
			memo(() => !!subscriptionsLoader().count && subscriptionsSection),
			transactionsSection
		];
		const giftSection = !purchaseBlocked && !options.ton && !options.giftPeerId && !options.itemPrice && createComponent(Section, { get children() {
			return createComponent(Row, {
				clickable: showGiftStarsPicker,
				get children() {
					return [createComponent(Row.Icon, { icon: "gift" }), createComponent(Row.Title, { get children() {
						return i18n("TelegramStarsGift");
					} })];
				}
			});
		} });
		return [
			createComponent(MediaHeader, {
				"class": "popup-stars-intro",
				get children() {
					return [
						memo(() => memo(() => !!(options.ton || options.giftPeerId))() ? image : createComponent(StarsHero, {})),
						avatar,
						createComponent(MediaHeader.Title, { children: title }),
						createComponent(MediaHeader.Subtitle, { children: subtitle })
					];
				}
			}),
			firstSection,
			giftSection,
			memo(() => starsNeeded() === import_BigInteger.default.zero && !options.giftPeerId && restSection)
		];
	}
	function openPopup() {
		createPopup(() => {
			onCleanup(() => {
				listenerSetter.removeAll();
				middlewareHelper.destroy();
			});
			return createComponent(PopupElement, {
				managers,
				"class": "popup-stars",
				kind: STARS_POPUP_KIND,
				closable: true,
				get show() {
					return show();
				},
				onClose: () => {
					if (!toppedUp && options.onCancel) options.onCancel();
				},
				onCloseAfterTimeout: () => deferredCloseCallbacks.splice(0).forEach((callback) => callback()),
				get children() {
					return [createComponent(PopupElement.Header, {
						floating: true,
						get children() {
							return [
								createComponent(PopupElement.CloseButton, {}),
								createComponent(PopupElement.Title, { get title() {
									return options.ton ? "GramBalance" : "TelegramStars";
								} }),
								memo(() => memo(() => !!!options.historyPeerId)() && createComponent(StarsBalance, { get ton() {
									return options.ton;
								} }))
							];
						}
					}), createComponent(PopupElement.Scrollable, {
						contextRef: (ref) => ref,
						onScrolledBottom: () => onScrolledBottom?.(),
						get children() {
							return createComponent(PopupElement.Body, { get children() {
								return typeof content === "function" ? content() : content;
							} });
						}
					})];
				}
			});
		});
		setShow(true);
	}
	async function construct() {
		if (options.historyPeerId) {
			const title = await wrapPeerTitle({ peerId: options.historyPeerId });
			if (!middleware()) return;
			content = [createComponent(MediaHeader, {
				"class": "popup-stars-intro",
				get children() {
					return [createComponent(MediaHeader.Title, {
						"class": "popup-stars-history-title",
						children: title
					}), createComponent(MediaHeader.Subtitle, { get children() {
						return i18n("Stars.Transaction.History");
					} })];
				}
			}), createComponent(StarsTransactionsList, {
				get peerId() {
					return options.historyPeerId;
				},
				get ton() {
					return options.ton;
				},
				middleware,
				setLoadMore
			})];
			openPopup();
			setShow(true);
			return;
		}
		const [image, peerTitle, topupOptions, avatar, appConfig, _] = await Promise.all([
			(async () => {
				if (options.ton) {
					const stickerDiv = document.createElement("div");
					stickerDiv.classList.add("popup-stars-image");
					stickerDiv.style.width = stickerDiv.style.height = "100px";
					return wrapLocalSticker({
						assetName: "Diamond",
						width: 100,
						height: 100,
						middleware,
						loop: true,
						autoplay: true
					}).then(({ container }) => {
						stickerDiv.append(container);
						return stickerDiv;
					});
				}
				return options.giftPeerId ? createStarsParticles() : void 0;
			})(),
			options.peerId || options.paymentForm?.bot_id || options.giftPeerId ? wrapPeerTitle({ peerId: options.peerId || options.giftPeerId || options.paymentForm.bot_id.toPeerId(false) }) : void 0,
			options.giftPeerId ? managers.appPaymentsManager.getStarsGiftOptions(options.giftPeerId.toUserId()) : managers.appPaymentsManager.getStarsTopupOptions(),
			options.giftPeerId && (async () => {
				const avatar = avatarNew({
					peerId: options.giftPeerId,
					size: 100,
					middleware
				});
				await avatar.readyThumbPromise;
				avatar.node.classList.add("popup-stars-gift-avatar");
				return avatar.node;
			})(),
			managers.apiManager.getAppConfig(),
			options.itemPrice && prefetchStars(middleware)
		]);
		options$ = topupOptions;
		appConfig$ = appConfig;
		purchaseBlocked = !options.ton && !!appConfig.stars_purchase_blocked;
		if (purchaseBlocked && (options.itemPrice || options.giftPeerId)) {
			confirmationPopup({
				titleLangKey: "StarsNotAvailableTitle",
				descriptionLangKey: "StarsNotAvailableText",
				button: {
					langKey: "OK",
					isCancel: true
				}
			}).catch(() => {});
			setShow(false);
			options.onCancel?.();
			return;
		}
		if (!options.ton && purposePeerId && appConfig.stars_spend_topup_invoice_disabled) {
			toastNew({ langPackKey: "PaymentInvoiceDisabledStarsText" });
			setShow(false);
			options.onCancel?.();
			return;
		}
		content = () => untrack(() => renderContent(image, peerTitle, avatar));
		openPopup();
	}
	construct();
	return handle;
}
delegateEvents(["click"]);
//#endregion
//#region src/components/popups/starsPay.tsx
var _tmpl$$1 = /*#__PURE__*/ template(`<div class=popup-footer-caption>`);
var _tmpl$2$1 = /*#__PURE__*/ template(`<span class=popup-stars-pay-boosts>`);
var _tmpl$3$1 = /*#__PURE__*/ template(`<span dir=ltr>`);
var _tmpl$4$1 = /*#__PURE__*/ template(`<div class=popup-stars-pay-images><div class=popup-stars-pay-avatar>`);
var _tmpl$5$1 = /*#__PURE__*/ template(`<div class=popup-stars-pay-padding>`);
var _tmpl$6$1 = /*#__PURE__*/ template(`<div class=popup-stars-pay-tos>`);
var _tmpl$7$1 = /*#__PURE__*/ template(`<div>`);
var TEST_FIRST_TIME = DEBUG && false;
function showStarsPayPopup(options) {
	const emitter = new EventListenerBase();
	const managers = bindManagersToSession(rootScope.managers);
	const middlewareHelper = getMiddleware();
	const middleware = middlewareHelper.get();
	const { inputInvoice, paidMedia, message, transaction, ledgerPeerId, chatInvite, subscription, boost, noShowIfStars, purpose } = options;
	let expectedPrice = options.expectedPrice;
	let paymentForm = options.paymentForm;
	const isReceipt = !!transaction || paymentForm?._ === "payments.paymentReceiptStars";
	const isOutGift = !!transaction?.pFlags.gift && getStarsTransactionPresentation(transaction).outgoing;
	const form = paymentForm || transaction;
	let peerId;
	if (chatInvite || paymentForm?._ === "payments.paymentFormStarGift") peerId = 0;
	else if (paymentForm) peerId = paymentForm.bot_id.toPeerId(false);
	else if (subscription) peerId = getPeerId(subscription.peer);
	else if (transaction.peer._ === "starsTransactionPeer") peerId = getPeerId(transaction.peer.peer);
	const isTon = transaction?.amount._ === "starsTonAmount" || paymentForm?.invoice.currency === "TON";
	let result = "cancelled";
	let finished = false;
	let popupOpened = false;
	let popupClosed = false;
	const deferredCloseCallbacks = [];
	const [show, setShow] = createSignal(true);
	const [paying, setPaying] = createSignal(false);
	const [fulfilling, setFulfilling] = createSignal(false);
	const emitFinish = () => {
		if (finished) return;
		finished = true;
		emitter.dispatchEvent("finish", result);
	};
	const drainDeferred = () => deferredCloseCallbacks.splice(0).forEach((callback) => callback());
	/** The popup only exists once its content has loaded — before that, finishing is all there is to do. */
	const closePopup = () => {
		if (popupOpened) {
			setShow(false);
			return;
		}
		middlewareHelper.destroy();
		emitFinish();
		drainDeferred();
	};
	/** The payment is over, one way or the other. */
	const finishPayment = () => popupClosed ? emitFinish() : closePopup();
	const onPopupClose = () => {
		popupClosed = true;
		if (!paying()) emitFinish();
	};
	/** A payment that did not go through: the payer is told, and with no popup to stay on, the caller is too. */
	const failPayment = (err) => {
		result = "failed";
		setPaying(false);
		toastNew({ langPackKey: paymentErrorLangKey(err?.type) });
		if (err) err.handled = true;
		if (popupClosed || !popupOpened) finishPayment();
	};
	const hidePopupsWithCallback = (callback, e) => {
		cancelEvent(e);
		deferredCloseCallbacks.push(callback);
		closePopup();
		PopupElement.getPopups(STARS_POPUP_KIND)?.[0]?.hide();
	};
	const reloadForm = async () => {
		if (!paymentForm) return;
		paymentForm = await managers.appPaymentsManager.getPaymentForm(inputInvoice);
	};
	const confirmFormPrice = async () => {
		const { currency, prices: [{ amount }] } = paymentForm.invoice;
		if (currency !== expectedPrice.currency) {
			result = "failed";
			toastNew({ langPackKey: "Error.AnError" });
			return false;
		}
		if (expectedPrice.amount !== void 0 && (0, import_BigInteger.default)(amount).equals(expectedPrice.amount)) return true;
		try {
			await confirmationPopup({
				titleLangKey: "StarGiftResalePriceChangedTitle",
				descriptionLangKey: "StarGiftResalePriceChangedText",
				descriptionLangArgs: [paymentsWrapCurrencyAmount(amount, currency)],
				button: {
					langKey: "StarGiftResaleBuyConfirm",
					langArgs: [paymentsWrapCurrencyAmount(amount, currency)]
				}
			});
		} catch (err) {
			result = "cancelled";
			return false;
		}
		expectedPrice = {
			amount,
			currency
		};
		return true;
	};
	let test = TEST_FIRST_TIME;
	const onConfirm = async (retried) => {
		if (isReceipt || subscription?.pFlags.bot_canceled || !paymentForm && !chatInvite && !subscription) {
			closePopup();
			return;
		}
		if (paying() || popupClosed) return;
		if (expectedPrice && paymentForm) {
			setPaying(true);
			const confirmed = await confirmFormPrice();
			setPaying(false);
			if (!confirmed) {
				finishPayment();
				return;
			}
		}
		const itemPrice = paymentForm ? +paymentForm.invoice.prices[0].amount : chatInvite ? +chatInvite.subscription_pricing.amount : +subscription.pricing.amount;
		setPaying(true);
		result = "pending";
		try {
			if (test) {
				test = false;
				throw makeError("BALANCE_TOO_LOW");
			} else if (subscription) await managers.appPaymentsManager.changeStarsSubscription(subscription.id, !subscription.pFlags.canceled);
			else {
				const balance = await managers.appPaymentsManager[isTon ? "getStarsStatusTon" : "getStarsStatus"]();
				if ((0, import_BigInteger.default)(balance.balance.amount).lt(itemPrice)) throw makeError("BALANCE_TOO_LOW");
				await managers.appPaymentsManager.sendStarsForm(inputInvoice, paymentForm?.form_id || chatInvite.subscription_form_id);
			}
		} catch (err) {
			const type = err.type;
			if (type === "BALANCE_TOO_LOW" && !popupClosed) {
				result = "cancelled";
				setPaying(false);
				hotReloadGuard.showStarsPopup({
					itemPrice,
					paymentForm,
					ton: isTon,
					onTopup: async () => {
						try {
							await Promise.all([reloadForm(), managers.appPaymentsManager[isTon ? "getStarsStatusTon" : "getStarsStatus"](true)]);
						} catch (err) {
							failPayment(err);
							return;
						}
						onConfirm();
					},
					onCancel: () => {
						result = "cancelled";
						finishPayment();
					},
					purpose,
					spendPurposePeerId: peerId
				});
			} else if (type === "FORM_EXPIRED" && paymentForm && !retried && !popupClosed) {
				try {
					await reloadForm();
				} catch (err) {
					failPayment(err);
					return;
				}
				setPaying(false);
				if (popupClosed) {
					result = "cancelled";
					finishPayment();
					return;
				}
				onConfirm(true);
			} else if (type === "BALANCE_TOO_LOW") {
				result = "cancelled";
				setPaying(false);
				finishPayment();
			} else failPayment(err);
			return;
		}
		result = "paid";
		setPaying(false);
		finishPayment();
	};
	const construct = async () => {
		const managers = bindManagersToSession(rootScope.managers);
		const [image, { title: transactionTitle, media: avatar }, link] = await Promise.all([
			(async () => {
				return boost ? void 0 : createStarsParticles();
			})(),
			(async () => {
				const result = await getStarsTransactionTitleAndMedia({
					transaction,
					middleware,
					size: 90,
					paidMedia,
					paidMediaPeerId: message ? message.fwdFromId || message.fromId : peerId,
					chatInvite,
					subscription,
					photo: form?._ === "payments.paymentFormStarGift" ? void 0 : form?.photo
				});
				if (boost) result.media = void 0;
				else if (transaction && (transaction.pFlags.gift || transaction.giveaway_post_id || transaction.premium_gift_months)) {
					const size = 128;
					result.media = await wrapLocalSticker({
						width: size,
						height: size,
						assetName: transaction.premium_gift_months ? getGiftAssetName(transaction.premium_gift_months * 30) : transaction.amount._ === "starsTonAmount" ? "Diamond" : "Gift3",
						middleware,
						loop: false,
						autoplay: liteMode.isAvailable("stickers_chat")
					}).then(({ container, promise }) => {
						container.classList.add("popup-stars-pay-sticker");
						container.style.width = container.style.height = "128px";
						promise.catch(() => {
							if (middleware()) container.replaceChildren(IconTsx({ icon: transaction.amount._ === "starsTonAmount" ? "gram_filled" : "gift" }));
						});
						return container;
					});
				} else result.media.classList.add("popup-stars-pay-item");
				return result;
			})(),
			(async () => {
				if (!transaction) return;
				const peerId = getStarsTransactionMessagePeerId(transaction, ledgerPeerId || rootScope.myId, rootScope.myId);
				const mid = transaction.giveaway_post_id || transaction.msg_id;
				if (!peerId || !mid) return;
				const serverMsgId = getServerMessageId(mid);
				return peerId.isUser() ? void 0 : `https://t.me/c/${peerId.toChatId()}/${serverMsgId}`;
			})()
		]);
		if (noShowIfStars) {
			onConfirm();
			return;
		}
		popupOpened = true;
		createPopup(() => {
			const _title = transactionTitle;
			const subscriptionUser = subscription && peerId.isUser() && useUser(peerId.toUserId());
			const subscriptionPresentation = subscription && getStarsSubscriptionPresentation(subscription, tsNow(true), subscriptionUser && subscriptionUser._ === "user" && !subscriptionUser.pFlags.bot);
			/** The price the popup talks about — from the form, the invite, the subscription or the transaction. */
			let amount;
			if (paymentForm) {
				const labeledPrice = paymentForm.invoice.prices[0];
				amount = isTon ? formatNanoton(labeledPrice.amount, 9, false) : labeledPrice.amount;
			} else if (chatInvite) amount = chatInvite.subscription_pricing.amount;
			else if (subscription) amount = subscription.pricing.amount;
			else amount = formatStarsAmountExact(transaction.amount);
			const Footer = () => {
				let confirmText, confirmColor, confirmIcon;
				let caption, fulfillKey;
				if (isReceipt) confirmText = i18n("OK");
				else if (chatInvite) {
					confirmText = i18n("Stars.Subscribe.Button");
					caption = (() => {
						var _el$ = _tmpl$$1();
						insert(_el$, () => i18n("Stars.Subscribe.Terms"));
						return _el$;
					})();
				} else if (subscription) {
					if (subscription.pFlags.bot_canceled) confirmText = i18n("OK");
					else if (subscription.pFlags.canceled) confirmText = i18n("Stars.Subscription.Renew");
					else {
						confirmText = i18n("Stars.Subscription.Cancel");
						confirmColor = "danger";
					}
					if (subscriptionPresentation.canRefulfill || !subscription.pFlags.bot_canceled && !peerId.isUser() && !subscriptionPresentation.expired) {
						const chat = !peerId.isUser() && useChat(peerId.toChatId());
						if (subscriptionPresentation.canRefulfill || chat?.pFlags?.left) fulfillKey = peerId.isUser() ? "Stars.Subscription.Restore" : "Stars.Subscription.Fulfill";
					}
				} else {
					confirmText = i18n("Stars.ConfirmPurchaseButton", [amount]);
					confirmIcon = isTon ? "gram_filled" : "star";
				}
				const onFulfill = async () => {
					setFulfilling(true);
					try {
						await managers.appPaymentsManager.fulfillStarsSubscription(subscription.id);
						hidePopupsWithCallback(() => {
							hotReloadGuard.appImManager.setInnerPeer({ peerId });
						});
					} catch (err) {
						console.error("fulfill error", err);
						toastNew({ langPackKey: paymentErrorLangKey(err.type) });
						setFulfilling(false);
					}
				};
				return createComponent(PopupElement.Footer, { get children() {
					return [
						createComponent(PopupElement.FooterButton, {
							color: confirmColor,
							iconRight: confirmIcon,
							get disabled() {
								return paying() || fulfilling();
							},
							callback: () => {
								onConfirm();
								return false;
							},
							get children() {
								return [confirmText, memo(() => memo(() => !!paying())() && putPreloader(void 0, true))];
							}
						}),
						caption,
						memo(() => fulfillKey && createComponent(PopupElement.FooterButton, {
							get disabled() {
								return paying() || fulfilling();
							},
							callback: () => {
								onFulfill();
								return false;
							},
							get children() {
								return i18n(fulfillKey);
							}
						}))
					];
				} });
			};
			const Content = () => {
				const presentation = transaction && getStarsTransactionPresentation(transaction);
				let noStarsChange = false;
				let title, subtitle;
				if (transaction && !boost) {
					title = presentation.kind === "payment" && transaction.title ? wrapEmojiText(transaction.title) : i18n(presentation.titleKey, presentation.titleArgs);
					subtitle = (transaction.description || presentation.kind === "subscription" && transaction.title) && wrapEmojiText(transaction.description || transaction.title);
					if (["messages", "live"].includes(presentation.kind) && presentation.incoming && !transaction.pFlags.refund) {
						const commission = transaction.starref_commission_permille;
						subtitle = commission === void 0 ? void 0 : i18n("PaidMessages.YouReceiveWithCommissionNotice", [(1e3 - commission) / 10]);
					}
				} else if (paidMedia) {
					const [photos, videos] = partition(paidMedia.extended_media, (extendedMedia) => {
						if (extendedMedia._ === "messageExtendedMedia") return extendedMedia.media._ !== "messageMediaDocument";
						else return extendedMedia.video_duration === void 0;
					});
					const multiplePhotosLang = i18n("Stars.Unlock.Photos", [photos.length]);
					const multipleVideosLang = i18n("Stars.Unlock.Videos", [videos.length]);
					title = i18n("StarsConfirmPurchaseTitle");
					subtitle = i18n(peerId.isUser() ? "Stars.Unlock.FromBot" : "Stars.Unlock", [
						photos.length && videos.length ? i18n("Stars.Unlock.Media", [multiplePhotosLang, multipleVideosLang]) : (photos.length || videos.length) === 1 ? i18n(photos.length ? "Stars.Unlock.Photo" : "Stars.Unlock.Video") : photos.length ? multiplePhotosLang : multipleVideosLang,
						_title,
						i18n("Stars.Unlock.Stars", [amount])
					]);
				} else if (transaction?.giveaway_post_id) {
					title = i18n(!transaction.id ? "Stars" : "StarsGiveawayPrizeReceived", [formatStarsAmount(transaction.amount)]);
					if (!transaction.id) {
						subtitle = (() => {
							var _el$2 = _tmpl$2$1();
							insert(_el$2, createComponent(IconTsx, { icon: "boost_filled" }), null);
							insert(_el$2, () => i18n("BoostingBoostsCountTitle", [boost.multiplier || 1]), null);
							return _el$2;
						})();
						noStarsChange = true;
					}
				} else if (form?._ === "payments.paymentFormStarGift") {
					title = i18n("StarsConfirmPurchaseTitle");
					subtitle = i18n(inputInvoice._ === "inputInvoiceStarGiftTransfer" ? isTon ? "Stars.Transaction.ConfirmGramTransfer" : "StarGiftConfirmTransferText" : isTon ? "Stars.Transaction.ConfirmGramPurchase" : "StarGiftConfirmPurchaseText", [amount]);
				} else if (inputInvoice?._ === "inputInvoiceStarGiftDropOriginalDetails") {
					title = i18n("StarGiftDropOriginalDetailsTitle");
					subtitle = i18n("StarGiftDropOriginalDetailsText");
				} else if (chatInvite) {
					title = i18n("Stars.Subscribe.Title");
					if (_title instanceof HTMLElement) _title.style.display = "inline";
					subtitle = i18n("Stars.Subscribe.Description", [_title, i18n("Stars.Unlock.Stars", [amount])]);
				} else if (subscription) {
					title = subscription.title ? wrapEmojiText(subscription.title) : i18n("Stars.Subscription");
					subtitle = subscription.pricing.period === 2592e3 ? i18n("Stars.Subscription.Fee", [StarsAmount({ stars: amount })]) : i18n("Stars.Subscription.FeeForPeriod", [StarsAmount({ stars: amount }), wrapCallDuration(subscription.pricing.period)]);
					subtitle.classList.add("secondary");
				} else {
					title = isReceipt ? wrapEmojiText(form.title) : i18n("StarsConfirmPurchaseTitle");
					subtitle = isReceipt ? wrapEmojiText(form.description) : i18n("StarsConfirmPurchaseText", [
						amount,
						wrapEmojiText(paymentForm.title),
						_title
					]);
				}
				const transactionId = transaction?.id ?? paymentForm?.transaction_id;
				const onTransactionClick = () => {
					copyTextToClipboard(transactionId);
					toastNew({ langPackKey: "StarsTransactionIDCopied" });
				};
				const messagePeerId = transaction && getStarsTransactionMessagePeerId(transaction, ledgerPeerId || rootScope.myId, rootScope.myId);
				const messageMid = transaction && (transaction.giveaway_post_id || transaction.msg_id);
				const messageAnchor = messagePeerId && messageMid && anchorCallback((e) => {
					hidePopupsWithCallback(() => hotReloadGuard.appImManager.setInnerPeer({
						peerId: messagePeerId,
						lastMsgId: messageMid
					}), e);
				});
				if (messageAnchor) messageAnchor.append(link || i18n("Message"));
				const makeTablePeer = (tablePeerId) => TablePeer({
					peerId: tablePeerId,
					onClick: () => {
						hidePopupsWithCallback(() => {
							hotReloadGuard.appImManager.setInnerPeer({
								peerId: tablePeerId,
								stack: message ? {
									peerId: message.peerId,
									mid: message.mid
								} : void 0
							});
						});
					}
				});
				const tablePeer = (isReceipt || subscription) && peerId && makeTablePeer(peerId);
				const transactionIdSpan = transactionId && (() => {
					var _el$3 = _tmpl$3$1();
					_el$3.$$click = onTransactionClick;
					insert(_el$3, () => wrapRichText(transactionId, { entities: [{
						_: "messageEntityCode",
						length: transactionId.length,
						offset: 0
					}] }));
					return _el$3;
				})();
				let tableContent;
				if (subscription) tableContent = [
					["Stars.Subscription", tablePeer],
					["Stars.Subscription.Subscribed", formatFullSentTime(subscription.until_date - subscription.pricing.period)],
					[subscriptionPresentation.dateLabelKey, formatFullSentTime(subscription.until_date)],
					subscriptionPresentation.statusKey && ["StarGiftStatus", i18n(subscriptionPresentation.statusKey)]
				];
				else if (transaction && !boost) {
					const ownerId = ledgerPeerId || rootScope.myId;
					const amountElement = (value) => createComponent(StarsChange, {
						reverse: true,
						noSign: true,
						inline: true,
						get stars() {
							return formatStarsAmountExact(value);
						},
						get ton() {
							return value._ === "starsTonAmount";
						}
					});
					const provider = starsTransactionProviders[transaction.peer._];
					const hasAffiliate = transaction.starref_peer && ![
						"messages",
						"live",
						"resale",
						"offer"
					].includes(presentation.kind);
					let peerLabel = presentation.incoming ? "BoostingFrom" : "BoostingTo";
					if (presentation.kind === "affiliate") peerLabel = "Stars.Transaction.MiniApp";
					else if (hasAffiliate) peerLabel = "Stars.Transaction.Referred";
					else if (presentation.kind === "resale") peerLabel = presentation.outgoing ? "Stars.Transaction.BoughtFrom" : "Stars.Transaction.SoldTo";
					tableContent = [
						peerId ? [peerLabel, tablePeer] : presentation.anonymousGift ? ["BoostingFrom", i18n("Stars.Transaction.UnknownPeer")] : ["Stars.Via", i18n(provider || "Stars.Transaction.Unsupported")],
						transaction.giveaway_post_id && ["BoostingTo", makeTablePeer(ownerId)],
						transaction.giveaway_post_id && ["BoostingGift", amountElement(transaction.amount)],
						messageAnchor && [transaction.giveaway_post_id ? "BoostingReason" : transaction.extended_media?.length ? "StarsTransactionMedia" : "Message", messageAnchor]
					];
					if (presentation.kind === "affiliate" || hasAffiliate) tableContent.push(["BoostingReason", i18n("Stars.Transaction.AffiliateProgram")]);
					const gift = transaction.stargift;
					if (gift) {
						const giftTitle = gift._ === "starGiftUnique" ? `${gift.title} #${gift.num}` : gift.title || i18n("StarGiftTitle");
						const giftAnchor = gift._ === "starGiftUnique" && anchorCallback(() => {
							hidePopupsWithCallback(() => hotReloadGuard.appImManager.openUrl(`https://t.me/nft/${gift.slug}`));
						});
						if (giftAnchor) giftAnchor.append(giftTitle);
						tableContent.push(["StarGiftTitle", giftAnchor || giftTitle]);
						if (gift._ === "starGiftUnique") {
							for (const attribute of gift.attributes) {
								const key = attribute._ === "starGiftAttributeModel" ? "StarGiftModel" : attribute._ === "starGiftAttributeBackdrop" ? "StarGiftBackdrop" : attribute._ === "starGiftAttributePattern" ? "StarGiftPattern" : void 0;
								if (key && "name" in attribute) tableContent.push([key, wrapEmojiText(attribute.name)]);
							}
							tableContent.push(["StarGiftAvailability", i18n("StarGiftAvailabilityIssued", [gift.availability_issued, gift.availability_total])]);
						} else if (gift.availability_total !== void 0) tableContent.push(["StarGiftAvailability", i18n("StarGiftAvailabilityValue2", [gift.availability_remains || 0, gift.availability_total])]);
					}
					if (hasAffiliate) tableContent.push(["Stars.Transaction.Referrer", makeTablePeer(getPeerId(transaction.starref_peer))]);
					if (transaction.starref_amount) tableContent.push(["Stars.Transaction.CommissionAmount", amountElement(transaction.starref_amount)]);
					const fullAmount = getStarsTransactionFullAmount(transaction);
					if (fullAmount) tableContent.push(["PaidMessages.FullPrice", amountElement(fullAmount)]);
					if (transaction.starref_commission_permille !== void 0) tableContent.push(["Stars.Transaction.CommissionLabel", `${transaction.starref_commission_permille / 10}%`]);
					if (transaction.subscription_period) tableContent.push(["Stars.Transaction.Period", i18n("Stars.Transaction.PeriodSeconds", [transaction.subscription_period])]);
					if (transaction.premium_gift_months) tableContent.push(["Stars.Transaction.Duration", i18n("Stars.Transaction.Months", [transaction.premium_gift_months])]);
					if (transaction.floodskip_number !== void 0 || transaction.paid_messages !== void 0) tableContent.push(["Stars.Transaction.Messages", String(transaction.floodskip_number ?? transaction.paid_messages)]);
					if (transaction.ads_proceeds_from_date !== void 0 && transaction.ads_proceeds_to_date !== void 0) tableContent.push(["Stars.Transaction.RevenuePeriod", [
						memo(() => formatFullSentTime(transaction.ads_proceeds_from_date)),
						" — ",
						memo(() => formatFullSentTime(transaction.ads_proceeds_to_date))
					]]);
					tableContent.push(transactionIdSpan && ["StarsTransactionID", transactionIdSpan], ["StarsTransactionDate", formatFullSentTime(transaction.date, void 0, true)]);
					if (presentation.statusKey) tableContent.push(["StarGiftStatus", i18n(presentation.statusKey)]);
					if (!transaction.pFlags.pending && !transaction.pFlags.failed) {
						if (transaction.transaction_date) tableContent.push(["Stars.Transaction.Completed", formatFullSentTime(transaction.transaction_date, void 0, true)]);
						if (transaction.transaction_url && /^https?:\/\//i.test(transaction.transaction_url)) {
							const anchor = anchorCallback(() => safeWindowOpen(transaction.transaction_url));
							anchor.append(i18n("Stars.Transaction.View"));
							tableContent.push(["Stars.Transaction.Blockchain", anchor]);
						}
					}
				} else if (transaction?.giveaway_post_id) {
					messageAnchor?.replaceChildren(i18n("BoostingGiveaway"));
					tableContent = [
						["BoostingFrom", tablePeer],
						transaction.id && ["BoostingTo", makeTablePeer(rootScope.myId)],
						[transaction.id ? "BoostingGift" : "Giveaway.Prize", i18n("Stars", [formatStarsAmount(transaction.amount)])],
						["BoostingReason", messageAnchor],
						transaction.id && ["StarsTransactionID", transactionIdSpan],
						["StarsTransactionDate", formatFullSentTime(form.date, void 0, true)]
					];
				} else if (isReceipt) tableContent = [
					peerId ? [transaction?.subscription_period ? "Stars.Subscription" : "BoostingTo", tablePeer] : ["Stars.Via", _title],
					["StarsTransactionID", transactionIdSpan],
					["StarsTransactionDate", formatFullSentTime(form.date, void 0, true)]
				];
				return (() => {
					var _el$4 = _tmpl$5$1();
					insert(_el$4, createComponent(MediaHeader, {
						"class": "popup-stars-intro",
						get children() {
							return [
								memo(() => boost ? createComponent(StarsHero, {}) : image),
								(() => {
									var _el$5 = _tmpl$4$1(), _el$6 = _el$5.firstChild;
									_el$6.$$click = async () => {
										if (!isReceipt || !transaction?.extended_media?.length) return;
										const extendedMedia = transaction.extended_media;
										const media = extendedMedia.map((messageMedia) => {
											return messageMedia.photo || messageMedia.document;
										});
										const standaloneMessage = await managers.appMessagesManager.generateStandaloneOutgoingMessage(messagePeerId || peerId);
										standaloneMessage.media = {
											_: "messageMediaPaidMedia",
											extended_media: extendedMedia.map((messageMedia) => {
												return {
													_: "messageExtendedMedia",
													media: messageMedia
												};
											}),
											stars_amount: 0
										};
										standaloneMessage.id = getServerMessageId(transaction.msg_id);
										standaloneMessage.mid = transaction.msg_id;
										const targets = media.map((media, index) => {
											return {
												element: null,
												mid: standaloneMessage.mid,
												peerId: standaloneMessage.peerId,
												index,
												message: standaloneMessage
											};
										});
										targets[0].element = avatar;
										new hotReloadGuard.AppMediaViewer(true).setSearchContext({
											peerId: 0,
											inputFilter: { _: "inputMessagesFilterEmpty" },
											useSearch: false
										}).openMedia({
											message: standaloneMessage,
											index: 0,
											target: targets[0].element,
											fromRight: 0,
											reverse: false,
											prevTargets: [],
											nextTargets: targets.slice(1)
										});
									};
									insert(_el$6, avatar);
									return _el$5;
								})(),
								createComponent(MediaHeader.Title, { children: title }),
								memo(() => tableContent && !subscription && !noStarsChange && createComponent(StarsChange, {
									get stars() {
										return !transaction ? String(amount).startsWith("-") ? String(amount).slice(1) : "-" + amount : amount;
									},
									get isRefund() {
										return !!transaction?.pFlags?.refund;
									},
									noSign: isOutGift,
									ton: isTon
								})),
								memo(() => subtitle && createComponent(MediaHeader.Subtitle, { children: subtitle }))
							];
						}
					}), null);
					insert(_el$4, tableContent && [
						createComponent(Table, {
							"class": "popup-stars-pay-table",
							get content() {
								return tableContent.filter(Boolean);
							}
						}),
						(() => {
							var _el$7 = _tmpl$6$1();
							insert(_el$7, () => i18n(isTon ? "Stars.Transaction.GramTOS" : "Stars.TransactionTOS"));
							return _el$7;
						})(),
						subscription && (() => {
							var _el$8 = _tmpl$7$1();
							insert(_el$8, () => i18n(subscriptionPresentation.captionKey, [formatFullSentTime(subscription.until_date)]));
							createRenderEffect(() => className$3(_el$8, classNames("popup-stars-pay-tos", "popup-stars-pay-tos2", subscriptionPresentation.statusKey && "danger")));
							return _el$8;
						})()
					], null);
					return _el$4;
				})();
			};
			return createComponent(PopupElement, {
				managers,
				"class": "popup-stars popup-stars-pay",
				closable: true,
				old: true,
				get show() {
					return show();
				},
				onClose: onPopupClose,
				onCloseAfterTimeout: () => {
					middlewareHelper.destroy();
					drainDeferred();
				},
				get children() {
					return [
						createComponent(PopupElement.Header, { get children() {
							return [createComponent(PopupElement.CloseButton, {}), memo(() => memo(() => !!(!isReceipt && (!subscription || tsNow(true) > subscription.until_date)))() && createComponent(StarsBalance, { ton: isTon }))];
						} }),
						createComponent(PopupElement.Body, {
							"class": isReceipt ? "is-receipt" : void 0,
							get children() {
								return createComponent(PopupElement.Scrollable, { get children() {
									return createComponent(Content, {});
								} });
							}
						}),
						createComponent(Footer, {})
					];
				}
			});
		});
	};
	construct();
	return emitter;
}
delegateEvents(["click"]);
//#endregion
//#region src/components/popups/payment.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div class="payment-item-details-photo media-container-contain">`);
var _tmpl$2 = /*#__PURE__*/ template(`<div class=payment-item-preloader-container>`);
var _tmpl$3 = /*#__PURE__*/ template(`<div class=payment-item><div class=payment-item-details><div class=payment-item-details-lines><div class=payment-item-details-lines-title></div><div class=payment-item-details-lines-description></div><div class=payment-item-details-lines-bot-name>`);
var _tmpl$4 = /*#__PURE__*/ template(`<div><span dir=auto></span><span dir=auto>`);
var _tmpl$5 = /*#__PURE__*/ template(`<div><span></span><span dir=ltr>`);
var _tmpl$6 = /*#__PURE__*/ template(`<div class=payment-item-tips>`);
var _tmpl$7 = /*#__PURE__*/ template(`<div class=payment-item-prices>`);
var _tmpl$8 = /*#__PURE__*/ template(`<button class=payment-item-tips-tip dir=auto>`);
var _tmpl$9 = /*#__PURE__*/ template(`<hr>`);
var _tmpl$0 = /*#__PURE__*/ template(`<div>`);
var USE_NATIVE_SYMBOL = true;
var iconPath = "assets/img/";
var icons = [
	"amex",
	"card",
	"diners",
	"discover",
	"jcb",
	"mastercard",
	"visa",
	"unionpay",
	"mir",
	"logo"
];
function getPaymentBrandIconPath(brand) {
	if (!icons.includes(brand)) return;
	return `${iconPath}${brand}.svg`;
}
var InputRightNumber = class {
	constructor(options = {}) {
		this.options = options;
		const input = this.input = document.createElement("input");
		input.type = "tel";
		input.classList.add("input-clear");
		const haveToIgnoreEvents = input instanceof HTMLInputElement ? 1 : 2;
		const onSelectionChange = () => {
			if (ignoreNextSelectionChange) {
				--ignoreNextSelectionChange;
				return;
			}
			ignoreNextSelectionChange = haveToIgnoreEvents;
			placeCaretAtEnd(input);
		};
		const onFocus = () => {
			setTimeout(() => {
				ignoreNextSelectionChange = haveToIgnoreEvents;
				placeCaretAtEnd(input);
				getAppWindow().document.addEventListener("selectionchange", onSelectionChange);
			}, 0);
		};
		const onFocusOut = () => {
			input.addEventListener("focus", onFocus, { once: true });
			getAppWindow().document.removeEventListener("selectionchange", onSelectionChange);
		};
		let ignoreNextSelectionChange;
		input.addEventListener("focusout", onFocusOut);
		onFocusOut();
	}
	get value() {
		return this.input.value;
	}
	set value(value) {
		this.input.value = value;
		this.onValue();
	}
	onValue() {
		if (this.input.ownerDocument.activeElement === this.input) placeCaretAtEnd(this.input);
		this.setWidth();
	}
	setWidth() {
		const width = getTextWidth(this.value, this.options?.fontWeight ? `${this.options.fontWeight} ${FontSize} ${FontFamily}` : FontFull);
		this.input.style.width = width + "px";
	}
};
var className = "payment-item";
var createPaymentRowState = (options = {}) => ({
	title: createSignal(options.title || ""),
	subtitleVisible: createSignal(options.subtitleVisible ?? !!options.title),
	media: createSignal(),
	hidden: createSignal(!!options.hidden)
});
/** The invoice illustration: a `WebDocument` the photo wrapper fills the container with. */
var PaymentItemPhoto = (props) => {
	const boxSize = makeMediaSize(100, 100);
	const sizeAttribute = props.photo.attributes.find((attribute) => attribute._ === "documentAttributeImageSize");
	const fittedSize = sizeAttribute && makeMediaSize(sizeAttribute.w, sizeAttribute.h).aspectFitted(boxSize);
	return (() => {
		var _el$ = _tmpl$();
		use((container) => wrapPhoto({
			photo: props.photo,
			container,
			boxWidth: boxSize.width,
			boxHeight: boxSize.height,
			size: {
				_: "photoSizeEmpty",
				type: ""
			}
		}), _el$);
		createRenderEffect((_$p) => style(_el$, fittedSize && {
			width: fittedSize.width + "px",
			height: fittedSize.height + "px"
		}, _$p));
		return _el$;
	})();
};
var PaymentRow = (props) => createComponent(Row, {
	get ["class"]() {
		return `${className}-row${props.class ? " " + props.class : ""}`;
	},
	get classList() {
		return { hide: props.state.hidden[0]() };
	},
	get clickable() {
		return props.clickable;
	},
	noWrap: true,
	get children() {
		return [
			createComponent(Show, {
				get when() {
					return props.state.media[0]();
				},
				get fallback() {
					return memo(() => !!props.icon)() && createComponent(Row.Icon, { get icon() {
						return props.icon;
					} });
				},
				children: (media) => createComponent(Row.Media, {
					size: "small",
					get ["class"]() {
						return props.mediaClass;
					},
					get children() {
						return media();
					}
				})
			}),
			createComponent(Row.Title, { get children() {
				return props.state.title[0]() || i18n(props.label, props.labelArgs);
			} }),
			createComponent(Row.Subtitle, {
				get ["class"]() {
					return props.state.subtitleVisible[0]() ? void 0 : "hide";
				},
				get children() {
					return i18n(props.label, props.labelArgs);
				}
			})
		];
	}
});
function showPaymentPopup(options) {
	const emitter = new EventListenerBase();
	const middlewareHelper = getMiddleware();
	const middleware = middlewareHelper.get();
	const listenerSetter = new ListenerSetter();
	const inputInvoice = options.inputInvoice;
	const [show, setShow] = createSignal(true);
	const [loading, setLoading] = createSignal(true);
	const [titleKey, setTitleKey] = createSignal("PaymentCheckout");
	const [titleSuffix, setTitleSuffix] = createSignal("");
	const [scrollableRef, setScrollableRef] = createSignal();
	const [payButton, setPayButton] = createSignal();
	const [payDisabled, setPayDisabled] = createSignal(false);
	let payButtonElement;
	const paymentForm = options.paymentForm;
	let result = "cancelled";
	let opened = false;
	let closed = false;
	const [item, setItem] = createSignal();
	const [Prices, setPrices] = createSignal();
	const [Rows, setRows] = createSignal();
	function openPopup() {
		if (opened) return;
		opened = true;
		createPopup(() => {
			onCleanup(() => {
				listenerSetter.removeAll();
				middlewareHelper.destroy();
			});
			return createComponent(PopupElement, {
				get ["class"]() {
					return "popup-payment" + (loading() ? " is-loading" : "");
				},
				closable: true,
				get show() {
					return show();
				},
				onClose: () => {
					closed = true;
					emitter.dispatchEvent("finish", result);
				},
				get children() {
					return [
						createComponent(PopupElement.Header, { get children() {
							return [createComponent(PopupElement.CloseButton, {}), createComponent(PopupElement.Title, { get children() {
								return [memo(() => i18n(titleKey())), memo(() => titleSuffix())];
							} })];
						} }),
						createComponent(PopupElement.Scrollable, {
							contextRef: setScrollableRef,
							get children() {
								return createComponent(PopupElement.Body, { get children() {
									return [
										createComponent(Show, {
											get when() {
												return item();
											},
											children: (item) => createComponent(Section, { get children() {
												var _el$3 = _tmpl$3(), _el$4 = _el$3.firstChild, _el$5 = _el$4.firstChild, _el$6 = _el$5.firstChild, _el$7 = _el$6.nextSibling, _el$8 = _el$7.nextSibling;
												insert(_el$4, createComponent(Show, {
													get when() {
														return item().photo;
													},
													children: (photo) => createComponent(PaymentItemPhoto, { get photo() {
														return photo();
													} })
												}), _el$5);
												insert(_el$6, () => wrapEmojiText(item().title));
												insert(_el$7, () => wrapEmojiText(item().description));
												insert(_el$8, createComponent(PeerTitleTsx, { get peerId() {
													return item().botPeerId;
												} }));
												insert(_el$3, createComponent(Show, {
													get when() {
														return Prices();
													},
													keyed: true,
													children: (Prices) => createComponent(Dynamic, { component: Prices })
												}), null);
												return _el$3;
											} })
										}),
										createComponent(Show, {
											get when() {
												return loading();
											},
											get children() {
												var _el$2 = _tmpl$2();
												insert(_el$2, () => putPreloader(void 0, true));
												return _el$2;
											}
										}),
										createComponent(Show, {
											get when() {
												return Rows();
											},
											keyed: true,
											children: (Rows) => createComponent(Section, { get children() {
												return createComponent(Dynamic, { component: Rows });
											} })
										})
									];
								} });
							}
						}),
						createComponent(Show, {
							get when() {
								return payButton();
							},
							get children() {
								return createComponent(PopupElement.Footer, { get children() {
									return createComponent(PopupElement.FooterButton, {
										confirm: true,
										preloader: true,
										pendingLangKey: "PleaseWait",
										get disabled() {
											return payDisabled();
										},
										get callback() {
											return payButton().callback;
										},
										ref: (element) => payButtonElement = element,
										get children() {
											return payButton().label();
										}
									});
								} });
							}
						})
					];
				}
			});
		});
	}
	async function build() {
		setLoading(true);
		openPopup();
		let confirmed = false;
		const onConfirmed = () => {
			if (confirmed) return;
			result = "paid";
			confirmed = true;
			hideVerification?.();
			setShow(false);
		};
		const { message } = options;
		if (paymentForm._ === "payments.paymentFormStarGift") throw new Error("not implemented");
		if (message) listenerSetter.add(rootScope)("payment_sent", ({ peerId, mid }) => {
			if (message.peerId === peerId && message.mid === mid) onConfirmed();
		});
		const mediaInvoice = message?.media;
		const isReceipt = options.isReceipt ?? (mediaInvoice ? !!mediaInvoice.receipt_msg_id || mediaInvoice.extended_media?._ === "messageExtendedMedia" : paymentForm._ === "payments.paymentReceipt");
		const isTest = mediaInvoice ? mediaInvoice.pFlags.test : paymentForm.invoice.pFlags.test;
		const isStars = paymentForm._ === "payments.paymentFormStars";
		const photo = mediaInvoice ? mediaInvoice.photo : paymentForm.photo;
		const title = mediaInvoice ? mediaInvoice.title : paymentForm.title;
		const description = mediaInvoice ? mediaInvoice.description : paymentForm.description;
		setTitleKey(isReceipt ? "PaymentReceipt" : "PaymentCheckout");
		if (isTest) setTitleSuffix(" (Test)");
		setItem({
			photo,
			title,
			description,
			botPeerId: paymentForm.bot_id.toPeerId()
		});
		let savedInfo = paymentForm.saved_info || paymentForm.info;
		const savedCredentials = paymentForm.saved_credentials?.[0];
		let lastRequestedInfo;
		let interactions = 0;
		let [passwordState, providerPeerTitle] = await Promise.all([savedCredentials && rootScope.managers.passwordManager.getState(), wrapPeerTitle({ peerId: isStars ? 0 : paymentForm.provider_id.toPeerId() })]);
		const wrapAmount = (amount, skipSymbol) => {
			return paymentsWrapCurrencyAmount(amount, currency, skipSymbol, USE_NATIVE_SYMBOL, true);
		};
		const { invoice } = paymentForm;
		const currency = invoice.currency;
		const isRecurring = invoice.pFlags.recurring && !isReceipt;
		const hasTerms = !!invoice.terms_url;
		const peerTitle2 = isRecurring || hasTerms ? await wrapPeerTitle({ peerId: paymentForm.bot_id.toPeerId() }) : void 0;
		setLoading(false);
		const totalAmount = accumulate(invoice.prices.map(({ amount }) => +amount), 0);
		const canTip = invoice.max_tip_amount !== void 0 && !isReceipt || !!paymentForm.tip_amount;
		const [shippingPrices, setShippingPrices] = createSignal([]);
		const [tipAmount, setTipAmount] = createSignal(0);
		const getShippingAmount = () => accumulate(shippingPrices().map(({ amount }) => +amount), 0);
		const getTipsAmount = () => canTip ? tipAmount() : 0;
		const getTotalTotal = () => totalAmount + getTipsAmount() + getShippingAmount();
		const inputRightNumber = canTip ? new InputRightNumber({ fontWeight: 500 }) : void 0;
		const setTip = (amount) => {
			amount = Math.min(+amount, +invoice.max_tip_amount);
			inputRightNumber.value = wrapAmount(amount, true);
			setTipAmount(amount);
		};
		if (canTip) {
			inputRightNumber.input.classList.add("input-clear", `${className}-tips-input`);
			inputRightNumber.input.setAttribute("aria-label", i18n(isReceipt ? "PaymentTip" : "PaymentTipOptional").textContent);
			inputRightNumber.input.readOnly = isReceipt;
			inputRightNumber.input.addEventListener("input", () => {
				setTip(+inputRightNumber.value.replace(/\D/g, ""));
			});
			setTip(isReceipt ? +paymentForm.tip_amount : 0);
		}
		const currencyData = Currencies[currency];
		const symbolParts = [currencyData.native || currencyData.symbol, currencyData.space_between ? " " : ""];
		if (!currencyData.symbol_left) symbolParts.reverse();
		const currencySymbol = symbolParts.join("");
		const PriceLine = (props) => (() => {
			var _el$9 = _tmpl$4(), _el$0 = _el$9.firstChild, _el$1 = _el$0.nextSibling;
			insert(_el$0, () => props.label);
			insert(_el$1, () => props.amount);
			createRenderEffect(() => className$3(_el$9, classNames(`${className}-prices-price`, props.class)));
			return _el$9;
		})();
		setPrices(() => () => (() => {
			var _el$10 = _tmpl$7();
			insert(_el$10, createComponent(For, {
				get each() {
					return [...invoice.prices, ...shippingPrices()];
				},
				children: (price) => createComponent(PriceLine, {
					get label() {
						return wrapEmojiText(price.label);
					},
					get amount() {
						return wrapAmount(price.amount);
					}
				})
			}), null);
			insert(_el$10, createComponent(Show, {
				when: canTip,
				get children() {
					return [(() => {
						var _el$11 = _tmpl$5(), _el$12 = _el$11.firstChild, _el$13 = _el$12.nextSibling;
						_el$11.$$mousedown = (e) => {
							if (!findUpAsChild(e.target, inputRightNumber.input)) placeCaretAtEnd(inputRightNumber.input);
						};
						insert(_el$12, () => i18n(isReceipt ? "PaymentTip" : "PaymentTipOptional"));
						insert(_el$13, () => currencyData.symbol_left && currencySymbol, null);
						insert(_el$13, () => inputRightNumber.input, null);
						insert(_el$13, () => !currencyData.symbol_left && currencySymbol, null);
						createRenderEffect((_p$) => {
							var _v$ = classNames(`${className}-prices-price`, isReceipt && "disable-hover"), _v$2 = isReceipt ? void 0 : { cursor: "text" };
							_v$ !== _p$.e && className$3(_el$11, _p$.e = _v$);
							_p$.t = style(_el$11, _v$2, _p$.t);
							return _p$;
						}, {
							e: void 0,
							t: void 0
						});
						return _el$11;
					})(), createComponent(Show, {
						when: !isReceipt,
						get children() {
							var _el$14 = _tmpl$6();
							insert(_el$14, createComponent(For, {
								get each() {
									return invoice.suggested_tip_amounts;
								},
								children: (suggested) => (() => {
									var _el$15 = _tmpl$8();
									_el$15.$$click = () => setTip(tipAmount() === +suggested ? 0 : +suggested);
									insert(_el$15, () => wrapAmount(suggested));
									createRenderEffect((_p$) => {
										var _v$3 = !!(tipAmount() === +suggested), _v$4 = tipAmount() === +suggested;
										_v$3 !== _p$.e && _el$15.classList.toggle("active", _p$.e = _v$3);
										_v$4 !== _p$.t && setAttribute(_el$15, "aria-pressed", _p$.t = _v$4);
										return _p$;
									}, {
										e: void 0,
										t: void 0
									});
									return _el$15;
								})()
							}));
							return _el$14;
						}
					})];
				}
			}), null);
			insert(_el$10, createComponent(PriceLine, {
				"class": "is-total",
				get label() {
					return i18n("PaymentTransactionTotal");
				},
				get amount() {
					return wrapAmount(getTotalTotal());
				}
			}), null);
			return _el$10;
		})());
		const setRowIcon = async (row, icon) => {
			const img = new Image();
			img.classList.add("media-photo");
			await renderImageFromUrlPromise(img, getPaymentBrandIconPath(icon));
			row.media[1](img);
		};
		const setRowTitle = (row, title) => {
			row.title[1](title || "");
			row.subtitleVisible[1](!!title);
		};
		const setCardSubtitle = (card) => {
			const { brand, str, icon } = getCardDetailsInfo(card);
			setRowIcon(methodRow, icon || brand.toLowerCase());
			setRowTitle(methodRow, str);
		};
		const onMethodClick = async () => {
			++interactions;
			const user = useUser(rootScope.myId);
			assumeType(paymentForm);
			const onFinish = ({ token, card }) => {
				previousToken = token, previousCardDetails = card;
				setCardSubtitle(card);
			};
			if (paymentForm.additional_methods) showPaymentMethodsPopup({
				paymentForm,
				user,
				savedCard: previousCardDetails,
				onFinish
			});
			else showPaymentCardPopup({
				paymentForm,
				user,
				savedCard: previousCardDetails,
				onFinish
			});
		};
		let previousCardDetails, previousToken;
		const methodRow = createPaymentRowState();
		if (savedCredentials) setCardSubtitle(savedCredentials);
		else if (paymentForm.credentials_title) setCardSubtitle({ title: paymentForm.credentials_title });
		const providerRow = createPaymentRowState({ title: providerPeerTitle });
		const providerAvatar = avatarNew({
			middleware,
			size: 32,
			peerId: isStars ? 0 : paymentForm.provider_id.toPeerId()
		});
		providerRow.media[1](providerAvatar.node);
		let shippingAddressRow, shippingNameRow, shippingEmailRow, shippingPhoneRow, shippingMethodRow;
		let lastShippingOption, onShippingAddressClick, onShippingMethodClick;
		let setShippingOption;
		const setShippingTitle = invoice.pFlags.shipping_address_requested ? (info) => {
			const postAddress = info.shipping_address;
			setRowTitle(shippingAddressRow, postAddress && [
				postAddress.city,
				postAddress.street_line1,
				postAddress.street_line2
			].filter(Boolean).join(", "));
			shippingMethodRow.hidden[1](!lastRequestedInfo?.shipping_options && !isReceipt);
		} : void 0;
		const setShippingInfo = (info) => {
			setShippingTitle?.(info);
			shippingNameRow && setRowTitle(shippingNameRow, info.name);
			shippingEmailRow && setRowTitle(shippingEmailRow, info.email);
			shippingPhoneRow && setRowTitle(shippingPhoneRow, info.phone && "+" + formatPhoneNumber(info.phone).formatted);
		};
		const setRequestedInfo = (requestedInfo) => {
			lastRequestedInfo = requestedInfo;
			if (lastShippingOption) setShippingOption(requestedInfo.shipping_options?.find(({ id }) => id === lastShippingOption.id));
		};
		if (!isReceipt) onShippingAddressClick = (focus) => {
			++interactions;
			showPaymentShippingPopup({
				paymentForm,
				inputInvoice,
				focus,
				onFinish: ({ shippingAddress, requestedInfo }) => {
					setRequestedInfo(requestedInfo);
					savedInfo = paymentForm.saved_info = shippingAddress;
					setShippingInfo(shippingAddress);
				}
			});
		};
		if (invoice.pFlags.shipping_address_requested) {
			setShippingOption = (shippingOption) => {
				const scrollSaver = new ScrollSaver(scrollableRef(), void 0, true);
				scrollSaver.save();
				lastShippingOption = shippingOption;
				setRowTitle(shippingMethodRow, shippingOption?.title);
				setShippingPrices(shippingOption ? shippingOption.prices : []);
				scrollSaver.restore();
				scrollableRef()?.onSizeChange();
			};
			shippingAddressRow = createPaymentRowState();
			shippingMethodRow = createPaymentRowState({ hidden: true });
			onShippingMethodClick = () => {
				++interactions;
				showPaymentShippingMethodsPopup({
					paymentForm,
					requestedInfo: lastRequestedInfo,
					shippingOption: lastShippingOption,
					onFinish: (shippingOption) => {
						setShippingOption(shippingOption);
					}
				});
			};
			const shippingOption = paymentForm.shipping;
			if (shippingOption) setShippingOption(shippingOption);
		}
		if (invoice.pFlags.name_requested) shippingNameRow = createPaymentRowState();
		if (invoice.pFlags.email_requested) shippingEmailRow = createPaymentRowState();
		if (invoice.pFlags.phone_requested) shippingPhoneRow = createPaymentRowState();
		if (savedInfo) setShippingInfo(savedInfo);
		const acceptTermsSignal = createSignal(!(!isReceipt && (isRecurring || hasTerms)));
		setRows(() => () => (() => {
			var _el$16 = _tmpl$0();
			insert(_el$16, createComponent(PaymentRow, {
				state: methodRow,
				label: "PaymentCheckoutMethod",
				icon: "card_filled",
				"class": `${className}-method-row`,
				mediaClass: "media-container-cover",
				clickable: isReceipt ? void 0 : onMethodClick
			}), null);
			insert(_el$16, createComponent(PaymentRow, {
				state: providerRow,
				label: "PaymentCheckoutProvider"
			}), null);
			insert(_el$16, createComponent(Show, {
				when: shippingAddressRow,
				get children() {
					return createComponent(PaymentRow, {
						state: shippingAddressRow,
						label: "PaymentShippingAddress",
						icon: "location_filled",
						get clickable() {
							return isReceipt ? void 0 : onShippingAddressClick.bind(null, void 0);
						}
					});
				}
			}), null);
			insert(_el$16, createComponent(Show, {
				when: shippingMethodRow,
				get children() {
					return createComponent(PaymentRow, {
						state: shippingMethodRow,
						label: "PaymentCheckoutShippingMethod",
						icon: "shipping",
						clickable: isReceipt ? void 0 : onShippingMethodClick
					});
				}
			}), null);
			insert(_el$16, createComponent(Show, {
				when: shippingNameRow,
				get children() {
					return createComponent(PaymentRow, {
						state: shippingNameRow,
						label: "PaymentCheckoutName",
						icon: "newprivate_filled",
						get clickable() {
							return isReceipt ? void 0 : onShippingAddressClick.bind(null, "name");
						}
					});
				}
			}), null);
			insert(_el$16, createComponent(Show, {
				when: shippingEmailRow,
				get children() {
					return createComponent(PaymentRow, {
						state: shippingEmailRow,
						label: "PaymentShippingEmailPlaceholder",
						icon: "mention_filled",
						get clickable() {
							return isReceipt ? void 0 : onShippingAddressClick.bind(null, "email");
						}
					});
				}
			}), null);
			insert(_el$16, createComponent(Show, {
				when: shippingPhoneRow,
				get children() {
					return createComponent(PaymentRow, {
						state: shippingPhoneRow,
						label: "PaymentCheckoutPhoneNumber",
						icon: "phone_filled",
						get clickable() {
							return isReceipt ? void 0 : onShippingAddressClick.bind(null, "phone");
						}
					});
				}
			}), null);
			insert(_el$16, createComponent(Show, {
				when: !isReceipt && (isRecurring || hasTerms),
				get children() {
					return [_tmpl$9(), createComponent(Row, {
						"class": `${className}-row`,
						noWrap: true,
						get children() {
							return [createComponent(Row.CheckboxField, { get children() {
								return createComponent(CheckboxFieldTsx, { signal: acceptTermsSignal });
							} }), createComponent(Row.Title, { get children() {
								return i18n(isRecurring ? "Payments.Recurrent.Accept" : "Payments.Terms.Accept", [wrapRichText(invoice.terms_url), peerTitle2]);
							} })];
						}
					})];
				}
			}), null);
			return _el$16;
		})());
		let hideVerification, lastTmpPasword;
		const validateSavedInfo = async () => {
			const info = savedInfo;
			const since = interactions;
			let requestedInfo;
			try {
				requestedInfo = await rootScope.managers.appPaymentsManager.validateRequestedInfo(inputInvoice, info);
			} catch (err) {
				console.error("validateRequestedInfo", err);
			}
			if (closed || interactions !== since || savedInfo !== info || payDisabled()) return false;
			if (!requestedInfo) {
				onShippingAddressClick();
				return false;
			}
			setRequestedInfo(requestedInfo);
			setShippingInfo(info);
			return onClick();
		};
		const onClick = () => {
			const managers = bindManagersToSession(rootScope.managers);
			const missingInfo = invoice.pFlags.name_requested && !savedInfo?.name ? "name" : invoice.pFlags.email_requested && !savedInfo?.email ? "email" : invoice.pFlags.phone_requested && !savedInfo?.phone ? "phone" : void 0;
			const requestsInfo = invoice.pFlags.shipping_address_requested || invoice.pFlags.name_requested || invoice.pFlags.email_requested || invoice.pFlags.phone_requested;
			const savedInfoComplete = !!savedInfo && !missingInfo && (!invoice.pFlags.shipping_address_requested || !!savedInfo.shipping_address);
			if (requestsInfo && savedInfoComplete && !lastRequestedInfo) return validateSavedInfo();
			if (invoice.pFlags.shipping_address_requested) {
				if (!lastRequestedInfo) {
					onShippingAddressClick();
					return false;
				} else if (!lastShippingOption && lastRequestedInfo.shipping_options) {
					onShippingMethodClick();
					return false;
				}
			} else if (missingInfo) {
				onShippingAddressClick(missingInfo);
				return false;
			}
			if (!previousCardDetails && !lastTmpPasword) {
				if (!savedCredentials) {
					onMethodClick();
					return false;
				}
				Promise.resolve(passwordState ?? managers.passwordManager.getState()).then((_passwordState) => {
					showPaymentCardConfirmationPopup({
						card: savedCredentials.title,
						passwordState: _passwordState,
						onFinish: (tmpPassword) => {
							passwordState = void 0;
							lastTmpPasword = tmpPassword;
							simulateClickEvent(payButtonElement);
							const diff = tmpPassword.valid_until - tsNow(true) - 5;
							setTimeout(() => {
								if (lastTmpPasword === tmpPassword) lastTmpPasword = void 0;
							}, diff * 1e3);
						}
					});
				});
				return false;
			}
			return Promise.resolve().then(async () => {
				const credentials = lastTmpPasword ? {
					_: "inputPaymentCredentialsSaved",
					id: savedCredentials.id,
					tmp_password: lastTmpPasword.tmp_password
				} : {
					_: "inputPaymentCredentials",
					data: {
						_: "dataJSON",
						data: JSON.stringify(previousToken)
					},
					pFlags: { save: previousCardDetails.save || void 0 }
				};
				try {
					result = "pending";
					const paymentResult = await managers.appPaymentsManager.sendPaymentForm(inputInvoice, paymentForm.form_id, lastRequestedInfo?.id, lastShippingOption?.id, credentials, getTipsAmount());
					if (paymentResult._ === "payments.paymentResult") onConfirmed();
					else await new Promise((resolve, reject) => {
						hideVerification = showPaymentVerificationPopup({
							url: paymentResult.url,
							openPathAfter: !mediaInvoice?.extended_media,
							onFinish: () => {
								hideVerification = void 0;
								onConfirmed();
							},
							onClose: () => {
								hideVerification = void 0;
								if (confirmed) resolve();
								else {
									const err = makeError(void 0, "payment not finished");
									err.handled = true;
									reject(err);
									result = "failed";
								}
							}
						}).hide;
					});
				} catch (err) {
					result = "failed";
					const type = err.type;
					if (type === "TMP_PASSWORD_INVALID") {
						passwordState = lastTmpPasword = void 0;
						simulateClickEvent(payButtonElement);
						err.handled = true;
					} else if (!err.handled) {
						toastNew({ langPackKey: paymentErrorLangKey(type) });
						err.handled = true;
					}
					throw err;
				}
			});
		};
		const onChange = () => {
			setPayDisabled(!acceptTermsSignal[0]());
		};
		if (isReceipt) setPayButton({
			callback: () => {},
			label: () => i18n("Done")
		});
		else setPayButton({
			callback: () => {
				const result = onClick();
				return result instanceof Promise ? result : false;
			},
			label: () => i18n("PaymentCheckoutPay", [wrapAmount(getTotalTotal())])
		});
		onChange();
		if (!isReceipt && (isRecurring || hasTerms)) createRoot((dispose) => {
			middlewareHelper.onDestroy(dispose);
			createEffect(onChange);
		});
		scrollableRef()?.onSizeChange();
	}
	build().catch((err) => {
		console.error("payment popup error", err);
		setShow(false);
	});
	return emitter;
}
async function createPaymentPopup(options) {
	let promise;
	if (!options.paymentForm && !options.transaction && !options.noPaymentForm) {
		if (options.isReceipt) promise = rootScope.managers.appPaymentsManager.getPaymentReceipt(options.message.peerId, options.message.media.receipt_msg_id || options.inputInvoice.msg_id);
		else promise = rootScope.managers.appPaymentsManager.getPaymentForm(options.inputInvoice);
	} else promise = Promise.resolve(options.paymentForm);
	const paymentForm = await promise;
	if (options.noPaymentForm || options.transaction || options.giftAction || paymentForm._ === "payments.paymentFormStars" || paymentForm._ === "payments.paymentReceiptStars" || paymentForm._ === "payments.paymentFormStarGift") return showStarsPayPopup({
		...options,
		paymentForm
	});
	return showPaymentPopup({
		...options,
		paymentForm
	});
}
function getCardDetailsInfo(card) {
	let brand;
	let str;
	let icon;
	if ("title" in card) {
		brand = card.title.split(" ").shift();
		str = card.title;
		icon = card.icon;
	} else {
		brand = detectUnifiedCardBrand(card.cardNumber);
		str = brand + " *" + card.cardNumber.split(" ").pop();
	}
	return {
		brand,
		str,
		icon
	};
}
delegateEvents(["mousedown", "click"]);
//#endregion
export { transferStarGiftConfirmationPopup as A, createStarGiftsRenderer as C, boosts_exports as D, showPickCountryPopup as E, createLoadableList as F, createImageSource as I, maybe2x as L, StarGiftBackdrop as M, AppStatisticsTab as N, PremiumOptionsForm as O, MoreButton as P, getWebViewTgLink as R, StarGiftsGrid as S, showBoostPopup as T, easeOutCircApply as _, stars_exports as a, randomItemExcept as b, showSendGiftPopup as c, PremiumGiftBubble as d, StarGiftBubble as f, createCurrentTime as g, ConfettiContainer as h, showStarsPopup as i, StarGiftPreview as j, createBadge as k, createProfileGiftsStore as l, showStarGiftInfoPopup as m, createPaymentPopup as n, showJoinChatInvitePopup as o, UniqueStarGiftWebPageBox as p, showGiftStarsPicker as r, showSendGiftPicker as s, InputRightNumber as t, TransitionSliderTsx as u, LimitLineTsx as v, boost_exports as w, setQuizHint as x, randomItem as y };
