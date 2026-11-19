//# allFunctionsCalledOnLoad
import { C as makeColorsGradient, S as getPeerColorStripesCount, g as getCollectibleColors, t as apiManagerProxy, x as getPeerColorIndexByPeer } from "./apiManagerProxy-DmQXvxSF.js";
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { a as i18n, s as join, u as langPack_default } from "./langPack-BmdJGr44.js";
import { i as For, p as createComponent, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { L as rgbIntToHex, w as getRgbColorFromTelegramColor } from "./state-JPIG5PpJ.js";
import { _ as use, c as insert, f as setAttribute, g as template, o as className, u as memo } from "./web-BPyQozky.js";
import { t as liteMode } from "./liteMode-DeLStZfQ.js";
import { i as getCountryEmoji } from "./emoji-Bi9QRCod.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
import { t as IconTsx } from "./iconTsx-B4lOk4A6.js";
import { o as createMiddleware } from "./sticker-5twBOy1Y.js";
import { L as formatFullSentTime, z as formatMonthsDuration } from "./index-B7axFZql.js";
import { dt as wrapPeerTitle, t as confirmationPopup } from "./confirmationPopup-Bz6mK0o-.js";
import { n as wrapEmojiText } from "./wrapEmojiText-DT39R5Tj.js";
import { o as getGiftAssetName, r as showGiftLinkPopup } from "./giftLink-okcHtE1m.js";
import { a as wrapLocalSticker, t as AppSelectPeers } from "./appSelectPeers-BYpCZNpe.js";
//#region src/components/peerColors.ts
function setPeerColorToElement({ peerId, element, messageHighlighting, colorAsOut, color }) {
	const colorProperty = "--peer-color-rgb";
	const borderBackgroundProperty = "--peer-border-background";
	const peer = apiManagerProxy.getPeer(peerId);
	if (!color && peer?._ === "user") color = peer.color;
	let peerColorRgbValue, peerBorderBackgroundValue;
	if (messageHighlighting || colorAsOut) {
		const property = messageHighlighting ? "message-empty" : "message-out";
		peerColorRgbValue = `var(--${property}-primary-color-rgb)`;
		peerBorderBackgroundValue = `var(--${property}-peer-${getPeerColorStripesCount(peer, color)}-border-background)`;
	} else if (color?._ === "peerColorCollectible") {
		const { accentColor, colors } = getCollectibleColors(color);
		peerColorRgbValue = getRgbColorFromTelegramColor(accentColor).join(", ");
		peerBorderBackgroundValue = makeColorsGradient(colors.map((it) => rgbIntToHex(it)));
	} else {
		const colorIndex = color?.color ?? getPeerColorIndexByPeer(peer);
		if (colorIndex === -1) {
			element.style.removeProperty(colorProperty);
			element.style.removeProperty(borderBackgroundProperty);
			return;
		}
		peerColorRgbValue = `var(--peer-${colorIndex}-color-rgb)`;
		peerBorderBackgroundValue = `var(--peer-${colorIndex}-border-background)`;
	}
	element.style.setProperty(colorProperty, peerColorRgbValue);
	element.style.setProperty(borderBackgroundProperty, peerBorderBackgroundValue);
}
//#endregion
//#region src/components/chat/giveaway.tsx
var _tmpl$ = /*#__PURE__*/ template(`<span><span class=delimiter-with-text-stripe></span><span></span><span class=delimiter-with-text-stripe>`);
var _tmpl$2 = /*#__PURE__*/ template(`<a class=bubble-giveaway-link>`);
var _tmpl$3 = /*#__PURE__*/ template(`<b>`);
var _tmpl$4 = /*#__PURE__*/ template(`<br>`);
var _tmpl$5 = /*#__PURE__*/ template(`<div class=bubble-giveaway-channels>`);
var _tmpl$6 = /*#__PURE__*/ template(`<div class=bubble-giveaway-countries>`);
var _tmpl$7 = /*#__PURE__*/ template(`<div class=bubble-giveaway-and-more>`);
var _tmpl$8 = /*#__PURE__*/ template(`<div><div class=bubble-giveaway-sticker><div></div></div><div class=bubble-giveaway-row><div class=bubble-giveaway-row-title></div></div><div class=bubble-giveaway-row><div class=bubble-giveaway-row-title></div></div><div class=bubble-giveaway-row><div class=bubble-giveaway-row-title>`);
function DelimiterWithText(props) {
	return (() => {
		var _el$ = _tmpl$(), _el$3 = _el$.firstChild.nextSibling;
		insert(_el$3, () => i18n(props.langKey));
		createRenderEffect((_p$) => {
			var _v$ = classNames("delimiter-with-text", props.class), _v$2 = props.textClass;
			_v$ !== _p$.e && className(_el$, _p$.e = _v$);
			_v$2 !== _p$.t && className(_el$3, _p$.t = _v$2);
			return _p$;
		}, {
			e: void 0,
			t: void 0
		});
		return _el$;
	})();
}
async function onGiveawayClick(message) {
	const giveaway = message.media;
	const giveawayInfo = await rootScope.managers.appPaymentsManager.getGiveawayInfo(message.peerId, message.mid);
	const d = document.createDocumentFragment();
	const duration = formatMonthsDuration(giveaway.months, true);
	const giveawayPeerId = message.fwdFromId || message.peerId;
	const isMediaResults = giveaway._ === "messageMediaGiveawayResults";
	const isResults = giveawayInfo._ === "payments.giveawayInfoResults";
	const isRefunded = isResults && giveawayInfo.pFlags.refunded;
	const isWinner = !isRefunded && isResults && giveawayInfo.pFlags.winner;
	const isParticipating = !isResults && giveawayInfo.pFlags.participating;
	const isStars = !!giveaway.stars;
	const onlyNewSubscribers = giveaway.pFlags.only_new_subscribers;
	const quantity = isMediaResults ? giveaway.winners_count + giveaway.unclaimed_count : giveaway.quantity;
	const additionalPeersLength = isMediaResults ? giveaway.additional_peers_count || 0 : giveaway.channels.length - 1;
	const formatDate = (timestamp) => formatFullSentTime(timestamp, void 0, true);
	let subtitleKey = "Giveaway.Info";
	const subtitleArgs = [
		formatDate(isResults ? giveawayInfo.finish_date : giveaway.until_date),
		i18n("Giveaway.Info.Users", [quantity]),
		await wrapPeerTitle({ peerId: giveawayPeerId })
	];
	if (additionalPeersLength) {
		subtitleKey += ".Several";
		subtitleArgs.push(i18n("Giveaway.Info.OtherChannels", [additionalPeersLength]));
	}
	if (onlyNewSubscribers) {
		subtitleKey += ".Date";
		subtitleArgs.push(formatDate(giveawayInfo.start_date));
	}
	if (isResults) subtitleKey += ".End";
	let subsubtitleKey, subsubtitleArgs, subsubtitleAtTop;
	if (isRefunded) subsubtitleKey = "BoostingGiveawayCanceledByPayment";
	else if (isWinner) {
		subsubtitleKey = "Giveaway.Won";
		subsubtitleArgs = [wrapEmojiText("🏆")];
		subsubtitleAtTop = true;
	} else if (isResults) {
		subsubtitleKey = "BoostingGiveawayYouNotWon";
		subsubtitleAtTop = true;
	} else if (giveawayInfo.joined_too_early_date) {
		subsubtitleKey = "BoostingGiveawayNotEligible";
		subsubtitleArgs = [formatDate(giveawayInfo.joined_too_early_date)];
	} else if (giveawayInfo.disallowed_country) subsubtitleKey = "BoostingGiveawayNotEligibleCountry";
	else if (giveawayInfo.admin_disallowed_chat_id) {
		subsubtitleKey = "BoostingGiveawayNotEligibleAdmin";
		subsubtitleArgs = [await wrapPeerTitle({ peerId: giveawayInfo.admin_disallowed_chat_id.toPeerId(true) })];
	} else {
		subsubtitleKey = isParticipating ? "Giveaway.Participation" : "Giveaway.TakePart";
		subsubtitleArgs = [await wrapPeerTitle({ peerId: giveawayPeerId })];
		if (additionalPeersLength) {
			subsubtitleKey += ".Multi";
			subsubtitleArgs.push(i18n("Giveaway.Info.OtherChannels", [additionalPeersLength]));
		}
		if (!isParticipating && giveawayInfo.start_date) subsubtitleArgs.push(formatDate(giveaway.until_date));
	}
	let titleLangPackKey;
	if (isStars) titleLangPackKey = isResults ? "BoostingStarsGiveawayHowItWorksTextEnd" : "BoostingStarsGiveawayHowItWorksText";
	else titleLangPackKey = isResults ? "BoostingGiveawayHowItWorksTextEnd" : "BoostingGiveawayHowItWorksText";
	const title = i18n(titleLangPackKey, [
		giveaway.stars || quantity,
		await wrapPeerTitle({ peerId: giveawayPeerId }),
		quantity,
		duration
	]);
	const subtitle = i18n(subtitleKey, subtitleArgs);
	const subsubtitle = i18n(subsubtitleKey, subsubtitleArgs);
	if (subsubtitleAtTop || isRefunded) subsubtitle.classList.add("popup-description-framed");
	if (isRefunded) subsubtitle.classList.add("popup-description-danger");
	d.append(...[
		...subsubtitleAtTop ? [subsubtitle, document.createElement("br")] : [],
		title,
		document.createElement("br"),
		document.createElement("br"),
		...giveaway.prize_description ? [
			i18n("Giveaway.AlsoPrizes", [
				await wrapPeerTitle({ peerId: giveawayPeerId }),
				quantity,
				wrapEmojiText(giveaway.prize_description),
				i18n("Giveaway.AlsoPrizes2", [quantity])
			]),
			document.createElement("br"),
			document.createElement("br")
		] : [],
		subtitle,
		...isResults && giveawayInfo.activated_count ? [" ", i18n("BoostingGiveawayUsedLinksPlural", [giveawayInfo.activated_count])] : [],
		...!subsubtitleAtTop ? [
			document.createElement("br"),
			document.createElement("br"),
			subsubtitle
		] : []
	].filter(Boolean));
	await confirmationPopup({
		titleLangKey: isResults ? "BoostingGiveawayEnd" : "BoostingGiveAwayAbout",
		description: d,
		button: isWinner ? { langKey: "BoostingGiveawayViewPrize" } : {
			langKey: "OK",
			isCancel: true
		}
	});
	if (isWinner) showGiftLinkPopup(giveawayInfo.gift_code_slug);
}
function Giveaway(props) {
	const middleware = createMiddleware().get();
	const giveaway = props.giveaway;
	const isResults = giveaway._ === "messageMediaGiveawayResults";
	const quantity = isResults ? giveaway.stars ?? giveaway.winners_count : giveaway.stars ?? giveaway.quantity;
	const countriesElements = !isResults && giveaway.countries_iso2?.map((iso2) => {
		const span = document.createElement("span");
		span.classList.add("bubble-giveaway-country");
		const country = langPack_default.countriesList.find((country) => country.iso2 === iso2);
		span.append(wrapEmojiText(getCountryEmoji(iso2) + " " + (country.name || country.default_name)));
		return span;
	});
	const headerDuration = formatMonthsDuration(giveaway.months, true);
	let header;
	if (isResults) {
		let a;
		(() => {
			var _el$4 = _tmpl$2();
			var _ref$ = a;
			typeof _ref$ === "function" ? use(_ref$, _el$4) : a = _el$4;
			insert(_el$4, () => langPack_default.format("BoostingGiveaway", true));
			createRenderEffect(() => setAttribute(_el$4, "data-saved-from", `${giveaway.channel_id.toPeerId(true)}_${giveaway.launch_msg_id}`));
			return _el$4;
		})();
		header = memo(() => i18n("Giveaway.Results.Subtitle", [giveaway.winners_count, a]));
	} else header = giveaway.prize_description ? [
		(() => {
			var _el$5 = _tmpl$3();
			insert(_el$5, `${quantity} `);
			return _el$5;
		})(),
		memo(() => wrapEmojiText(giveaway.prize_description)),
		createComponent(DelimiterWithText, { langKey: "Giveaway.With" }),
		memo(() => memo(() => !!giveaway.stars)() ? i18n("Giveaway.WithStars", [giveaway.quantity, i18n("Giveaway.WithStars.Stars", [+giveaway.stars])]) : i18n(+quantity > 1 ? "Giveaway.WithSubscriptionsPlural" : "Giveaway.WithSubscriptionsSingle", [headerDuration]))
	] : [
		memo(() => i18n(giveaway.stars ? "BoostingStarsGiveawayMsgInfoPlural1" : "BoostingGiveawayMsgInfoPlural1", [quantity])),
		_tmpl$4(),
		memo(() => i18n(giveaway.stars ? "BoostingStarsGiveawayMsgInfoPlural2" : "BoostingGiveawayMsgInfoPlural2", [giveaway.stars ? giveaway.quantity : headerDuration]))
	];
	const renderEntity = (peerId) => {
		const entity = AppSelectPeers.renderEntity({
			key: peerId,
			middleware,
			avatarSize: 30,
			meAsSaved: false
		});
		setPeerColorToElement({
			peerId,
			element: entity.element
		});
		entity.element.classList.add("bubble-giveaway-channel", "hover-primary");
		return entity.element;
	};
	const channelsWrapped = !isResults && (() => {
		var _el$7 = _tmpl$5();
		insert(_el$7, createComponent(For, {
			get each() {
				return giveaway.channels;
			},
			children: (chatId) => renderEntity(chatId.toPeerId(true))
		}));
		return _el$7;
	})();
	const countriesWrapped = countriesElements && (() => {
		var _el$8 = _tmpl$6();
		insert(_el$8, () => i18n("BoostingGiveAwayFromCountries", [join(countriesElements)]));
		return _el$8;
	})();
	let middle;
	if (isResults) middle = [(() => {
		var _el$9 = _tmpl$5();
		insert(_el$9, createComponent(For, {
			get each() {
				return giveaway.winners;
			},
			children: (userId) => renderEntity(userId.toPeerId(false))
		}));
		return _el$9;
	})(), memo(() => memo(() => giveaway.winners_count > giveaway.winners.length)() && (() => {
		var _el$0 = _tmpl$7();
		insert(_el$0, () => i18n("Giveaway.Results.AndMore", [giveaway.winners_count - giveaway.winners.length]));
		return _el$0;
	})())];
	else middle = [
		memo(() => i18n(giveaway.pFlags.only_new_subscribers ? "BoostingGiveawayMsgNewSubsPlural" : "BoostingGiveawayMsgAllSubsPlural", [giveaway.channels.length])),
		channelsWrapped,
		countriesWrapped
	];
	let stickerDiv;
	const ret = (() => {
		var _el$1 = _tmpl$8(), _el$10 = _el$1.firstChild, _el$11 = _el$10.firstChild, _el$12 = _el$10.nextSibling, _el$13 = _el$12.firstChild, _el$14 = _el$12.nextSibling, _el$15 = _el$14.firstChild, _el$16 = _el$14.nextSibling, _el$17 = _el$16.firstChild;
		var _ref$2 = stickerDiv;
		typeof _ref$2 === "function" ? use(_ref$2, _el$10) : stickerDiv = _el$10;
		insert(_el$11, (() => {
			var _c$ = memo(() => !!giveaway.stars);
			return () => _c$() && createComponent(IconTsx, { icon: "star" });
		})(), null);
		insert(_el$11, () => giveaway.stars ? ` ${quantity}` : `X${quantity}`, null);
		insert(_el$13, () => i18n(isResults ? "Giveaway.Results.Title" : "BoostingGiveawayPrizes", [isResults ? giveaway.winners_count : quantity]));
		insert(_el$12, header, null);
		insert(_el$15, () => i18n(isResults ? "BoostingGiveawayResultsMsgWinners" : "BoostingGiveawayMsgParticipants", [isResults ? giveaway.winners_count : quantity]));
		insert(_el$14, middle, null);
		insert(_el$17, (() => {
			var _c$2 = memo(() => !!(isResults && giveaway.stars));
			return () => _c$2() ? i18n(giveaway.winners_count > 1 ? "Giveaway.Results.Stars.Winners.Single" : "Giveaway.Results.Stars.Winners.Single", [i18n("Giveaway.Results.Stars.Winners.Stars", [quantity])]) : i18n(isResults ? "Giveaway.Results.Footer" : "BoostingWinnersDate", [quantity, giveaway.stars]);
		})());
		insert(_el$16, () => !isResults && formatFullSentTime(giveaway.until_date), null);
		createRenderEffect((_p$) => {
			var _v$3 = classNames("bubble-giveaway", "no-select", "disable-hover", isResults && "bubble-giveaway-results"), _v$4 = classNames("bubble-giveaway-sticker-counter", giveaway.stars && "bubble-giveaway-sticker-counter-stars");
			_v$3 !== _p$.e && className(_el$1, _p$.e = _v$3);
			_v$4 !== _p$.t && className(_el$11, _p$.t = _v$4);
			return _p$;
		}, {
			e: void 0,
			t: void 0
		});
		return _el$1;
	})();
	const size = isResults ? 80 : 160;
	const promise = wrapLocalSticker({
		width: size,
		height: size,
		assetName: isResults ? "Congratulations" : getGiftAssetName(giveaway.months * 30),
		middleware,
		loop: false,
		autoplay: liteMode.isAvailable("stickers_chat")
	}).then(({ container, promise }) => {
		stickerDiv.style.position = "relative";
		stickerDiv.style.width = stickerDiv.style.height = size + "px";
		stickerDiv.append(container);
		return promise;
	});
	props.loadPromises.push(promise);
	return ret;
}
//#endregion
export { setPeerColorToElement as i, Giveaway as n, onGiveawayClick as r, DelimiterWithText as t };
