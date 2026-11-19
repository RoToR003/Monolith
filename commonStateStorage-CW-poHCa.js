//# allFunctionsCalledOnLoad
import { p as MOUNT_CLASS_TO } from "./userAgent-ByGXcznk.js";
import { S as T_ME_PREFIXES } from "./rootScope-CZS0lmz8.js";
import { c as IS_WORKER, n as logger } from "./logger-7zf0rNYS.js";
import { a as getCommonDatabaseState, i as DeferredIsUsingPasscode, t as EncryptedStorageLayer } from "./encryptedStorageLayer-gN9TBXzg.js";
import { n as IDBStorage } from "./idb-BZfkipS3.js";
import { t as originalString } from "./regex-DmbDaFB2.js";
import { n as deferredPromise } from "./cancellablePromise-bof--dnO.js";
//#region src/lib/richTextProcessor/matchUrlProtocol.ts
var SKIP_PROTOCOLS = /* @__PURE__ */ new Set(["javascript:"]);
function matchUrlProtocol(text) {
	if (!text) return null;
	try {
		const protocol = new URL(text).protocol;
		if (SKIP_PROTOCOLS.has(protocol)) return null;
		return protocol;
	} catch (err) {
		return null;
	}
}
var STRIPPED_REG_EXP = /[\t\n\r]/g;
var PROTOCOL_REG_EXP = /^[\x00-\x20]*([a-z][a-z\d+\-.]*):/i;
function matchUrlProtocolText(text) {
	const match = text?.replace(STRIPPED_REG_EXP, "").match(PROTOCOL_REG_EXP);
	return match && match[1].toLowerCase() + ":";
}
function normalizeUrlProtocol(url) {
	const protocol = matchUrlProtocolText(url);
	return protocol && !SKIP_PROTOCOLS.has(protocol) ? url : "https://" + url;
}
/** Whether a URL is a web page's: http or https — not a script, data, or another app's scheme. */
function isWebPageUrl(url) {
	return url.protocol === "https:" || url.protocol === "http:";
}
//#endregion
//#region src/lib/richTextProcessor/index.ts
var ALPHA_CHARS_REG_EXP = "a-z\\u00c0-\\u00d6\\u00d8-\\u00f6\\u00f8-\\u00ff\\u0100-\\u024f\\u0253\\u0254\\u0256\\u0257\\u0259\\u025b\\u0263\\u0268\\u026f\\u0272\\u0289\\u028b\\u02bb\\u0300-\\u036f\\u1e00-\\u1eff\\u0400-\\u04ff\\u0500-\\u0527\\u2de0-\\u2dff\\ua640-\\ua69f\\u0591-\\u05bf\\u05c1-\\u05c2\\u05c4-\\u05c5\\u05c7\\u05d0-\\u05ea\\u05f0-\\u05f4\\ufb1d-\\ufb28\\ufb2a-\\ufb36\\ufb38-\\ufb3c\\ufb3e\\ufb40-\\ufb41\\ufb43-\\ufb44\\ufb46-\\ufb4f\\u0610-\\u061a\\u0620-\\u065f\\u066e-\\u06d3\\u06d5-\\u06dc\\u06de-\\u06e8\\u06ea-\\u06ef\\u06fa-\\u06fc\\u06ff\\u0750-\\u077f\\u08a0\\u08a2-\\u08ac\\u08e4-\\u08fe\\ufb50-\\ufbb1\\ufbd3-\\ufd3d\\ufd50-\\ufd8f\\ufd92-\\ufdc7\\ufdf0-\\ufdfb\\ufe70-\\ufe74\\ufe76-\\ufefc\\u200c\\u0e01-\\u0e3a\\u0e40-\\u0e4e\\u1100-\\u11ff\\u3130-\\u3185\\uA960-\\uA97F\\uAC00-\\uD7AF\\uD7B0-\\uD7FF\\u3003\\u3005\\u303b\\uff21-\\uff3a\\uff41-\\uff5a\\uff66-\\uff9f\\uffa1-\\uffdc";
"" + ALPHA_CHARS_REG_EXP;
var URL_ALPHANUMERIC_REG_EXP_PART = "[" + ALPHA_CHARS_REG_EXP + "0-9]";
var URL_PROTOCOL_REG_EXP_PART = "((?:https?|ftp)://|mailto:)?";
var URL_REG_EXP = URL_PROTOCOL_REG_EXP_PART + "(?:" + URL_ALPHANUMERIC_REG_EXP_PART + "{1,64}(?::" + URL_ALPHANUMERIC_REG_EXP_PART + "{0,64})?@)?(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])(?:\\.(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])){3}|" + URL_ALPHANUMERIC_REG_EXP_PART + "[" + ALPHA_CHARS_REG_EXP + "·0-9-]{0,64}(?:\\." + URL_ALPHANUMERIC_REG_EXP_PART + "[" + ALPHA_CHARS_REG_EXP + "·0-9-]{0,64}){0,10}(?:\\.(xn--[0-9a-z]{2,16}|[" + ALPHA_CHARS_REG_EXP + "]{2,24})))(?::\\d{2,5})?(?:/(?:\\S{0,255}[^\\s.;,(\\[\\]{}<>\"'])?)?";
new RegExp("^" + URL_PROTOCOL_REG_EXP_PART.slice(0, -1), "i");
var FULL_REG_EXP = new RegExp("(^| )(@)([a-zA-Z\\d_]{5,32})|(((?:https?|ftp)://|mailto:)?(?:[a-z\\u00c0-\\u00d6\\u00d8-\\u00f6\\u00f8-\\u00ff\\u0100-\\u024f\\u0253\\u0254\\u0256\\u0257\\u0259\\u025b\\u0263\\u0268\\u026f\\u0272\\u0289\\u028b\\u02bb\\u0300-\\u036f\\u1e00-\\u1eff\\u0400-\\u04ff\\u0500-\\u0527\\u2de0-\\u2dff\\ua640-\\ua69f\\u0591-\\u05bf\\u05c1-\\u05c2\\u05c4-\\u05c5\\u05c7\\u05d0-\\u05ea\\u05f0-\\u05f4\\ufb1d-\\ufb28\\ufb2a-\\ufb36\\ufb38-\\ufb3c\\ufb3e\\ufb40-\\ufb41\\ufb43-\\ufb44\\ufb46-\\ufb4f\\u0610-\\u061a\\u0620-\\u065f\\u066e-\\u06d3\\u06d5-\\u06dc\\u06de-\\u06e8\\u06ea-\\u06ef\\u06fa-\\u06fc\\u06ff\\u0750-\\u077f\\u08a0\\u08a2-\\u08ac\\u08e4-\\u08fe\\ufb50-\\ufbb1\\ufbd3-\\ufd3d\\ufd50-\\ufd8f\\ufd92-\\ufdc7\\ufdf0-\\ufdfb\\ufe70-\\ufe74\\ufe76-\\ufefc\\u200c\\u0e01-\\u0e3a\\u0e40-\\u0e4e\\u1100-\\u11ff\\u3130-\\u3185\\uA960-\\uA97F\\uAC00-\\uD7AF\\uD7B0-\\uD7FF\\u3003\\u3005\\u303b\\uff21-\\uff3a\\uff41-\\uff5a\\uff66-\\uff9f\\uffa1-\\uffdc0-9]{1,64}(?::[a-z\\u00c0-\\u00d6\\u00d8-\\u00f6\\u00f8-\\u00ff\\u0100-\\u024f\\u0253\\u0254\\u0256\\u0257\\u0259\\u025b\\u0263\\u0268\\u026f\\u0272\\u0289\\u028b\\u02bb\\u0300-\\u036f\\u1e00-\\u1eff\\u0400-\\u04ff\\u0500-\\u0527\\u2de0-\\u2dff\\ua640-\\ua69f\\u0591-\\u05bf\\u05c1-\\u05c2\\u05c4-\\u05c5\\u05c7\\u05d0-\\u05ea\\u05f0-\\u05f4\\ufb1d-\\ufb28\\ufb2a-\\ufb36\\ufb38-\\ufb3c\\ufb3e\\ufb40-\\ufb41\\ufb43-\\ufb44\\ufb46-\\ufb4f\\u0610-\\u061a\\u0620-\\u065f\\u066e-\\u06d3\\u06d5-\\u06dc\\u06de-\\u06e8\\u06ea-\\u06ef\\u06fa-\\u06fc\\u06ff\\u0750-\\u077f\\u08a0\\u08a2-\\u08ac\\u08e4-\\u08fe\\ufb50-\\ufbb1\\ufbd3-\\ufd3d\\ufd50-\\ufd8f\\ufd92-\\ufdc7\\ufdf0-\\ufdfb\\ufe70-\\ufe74\\ufe76-\\ufefc\\u200c\\u0e01-\\u0e3a\\u0e40-\\u0e4e\\u1100-\\u11ff\\u3130-\\u3185\\uA960-\\uA97F\\uAC00-\\uD7AF\\uD7B0-\\uD7FF\\u3003\\u3005\\u303b\\uff21-\\uff3a\\uff41-\\uff5a\\uff66-\\uff9f\\uffa1-\\uffdc0-9]{0,64})?@)?(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])(?:\\.(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])){3}|[a-z\\u00c0-\\u00d6\\u00d8-\\u00f6\\u00f8-\\u00ff\\u0100-\\u024f\\u0253\\u0254\\u0256\\u0257\\u0259\\u025b\\u0263\\u0268\\u026f\\u0272\\u0289\\u028b\\u02bb\\u0300-\\u036f\\u1e00-\\u1eff\\u0400-\\u04ff\\u0500-\\u0527\\u2de0-\\u2dff\\ua640-\\ua69f\\u0591-\\u05bf\\u05c1-\\u05c2\\u05c4-\\u05c5\\u05c7\\u05d0-\\u05ea\\u05f0-\\u05f4\\ufb1d-\\ufb28\\ufb2a-\\ufb36\\ufb38-\\ufb3c\\ufb3e\\ufb40-\\ufb41\\ufb43-\\ufb44\\ufb46-\\ufb4f\\u0610-\\u061a\\u0620-\\u065f\\u066e-\\u06d3\\u06d5-\\u06dc\\u06de-\\u06e8\\u06ea-\\u06ef\\u06fa-\\u06fc\\u06ff\\u0750-\\u077f\\u08a0\\u08a2-\\u08ac\\u08e4-\\u08fe\\ufb50-\\ufbb1\\ufbd3-\\ufd3d\\ufd50-\\ufd8f\\ufd92-\\ufdc7\\ufdf0-\\ufdfb\\ufe70-\\ufe74\\ufe76-\\ufefc\\u200c\\u0e01-\\u0e3a\\u0e40-\\u0e4e\\u1100-\\u11ff\\u3130-\\u3185\\uA960-\\uA97F\\uAC00-\\uD7AF\\uD7B0-\\uD7FF\\u3003\\u3005\\u303b\\uff21-\\uff3a\\uff41-\\uff5a\\uff66-\\uff9f\\uffa1-\\uffdc0-9][a-z\\u00c0-\\u00d6\\u00d8-\\u00f6\\u00f8-\\u00ff\\u0100-\\u024f\\u0253\\u0254\\u0256\\u0257\\u0259\\u025b\\u0263\\u0268\\u026f\\u0272\\u0289\\u028b\\u02bb\\u0300-\\u036f\\u1e00-\\u1eff\\u0400-\\u04ff\\u0500-\\u0527\\u2de0-\\u2dff\\ua640-\\ua69f\\u0591-\\u05bf\\u05c1-\\u05c2\\u05c4-\\u05c5\\u05c7\\u05d0-\\u05ea\\u05f0-\\u05f4\\ufb1d-\\ufb28\\ufb2a-\\ufb36\\ufb38-\\ufb3c\\ufb3e\\ufb40-\\ufb41\\ufb43-\\ufb44\\ufb46-\\ufb4f\\u0610-\\u061a\\u0620-\\u065f\\u066e-\\u06d3\\u06d5-\\u06dc\\u06de-\\u06e8\\u06ea-\\u06ef\\u06fa-\\u06fc\\u06ff\\u0750-\\u077f\\u08a0\\u08a2-\\u08ac\\u08e4-\\u08fe\\ufb50-\\ufbb1\\ufbd3-\\ufd3d\\ufd50-\\ufd8f\\ufd92-\\ufdc7\\ufdf0-\\ufdfb\\ufe70-\\ufe74\\ufe76-\\ufefc\\u200c\\u0e01-\\u0e3a\\u0e40-\\u0e4e\\u1100-\\u11ff\\u3130-\\u3185\\uA960-\\uA97F\\uAC00-\\uD7AF\\uD7B0-\\uD7FF\\u3003\\u3005\\u303b\\uff21-\\uff3a\\uff41-\\uff5a\\uff66-\\uff9f\\uffa1-\\uffdc·0-9-]{0,64}(?:\\.[a-z\\u00c0-\\u00d6\\u00d8-\\u00f6\\u00f8-\\u00ff\\u0100-\\u024f\\u0253\\u0254\\u0256\\u0257\\u0259\\u025b\\u0263\\u0268\\u026f\\u0272\\u0289\\u028b\\u02bb\\u0300-\\u036f\\u1e00-\\u1eff\\u0400-\\u04ff\\u0500-\\u0527\\u2de0-\\u2dff\\ua640-\\ua69f\\u0591-\\u05bf\\u05c1-\\u05c2\\u05c4-\\u05c5\\u05c7\\u05d0-\\u05ea\\u05f0-\\u05f4\\ufb1d-\\ufb28\\ufb2a-\\ufb36\\ufb38-\\ufb3c\\ufb3e\\ufb40-\\ufb41\\ufb43-\\ufb44\\ufb46-\\ufb4f\\u0610-\\u061a\\u0620-\\u065f\\u066e-\\u06d3\\u06d5-\\u06dc\\u06de-\\u06e8\\u06ea-\\u06ef\\u06fa-\\u06fc\\u06ff\\u0750-\\u077f\\u08a0\\u08a2-\\u08ac\\u08e4-\\u08fe\\ufb50-\\ufbb1\\ufbd3-\\ufd3d\\ufd50-\\ufd8f\\ufd92-\\ufdc7\\ufdf0-\\ufdfb\\ufe70-\\ufe74\\ufe76-\\ufefc\\u200c\\u0e01-\\u0e3a\\u0e40-\\u0e4e\\u1100-\\u11ff\\u3130-\\u3185\\uA960-\\uA97F\\uAC00-\\uD7AF\\uD7B0-\\uD7FF\\u3003\\u3005\\u303b\\uff21-\\uff3a\\uff41-\\uff5a\\uff66-\\uff9f\\uffa1-\\uffdc0-9][a-z\\u00c0-\\u00d6\\u00d8-\\u00f6\\u00f8-\\u00ff\\u0100-\\u024f\\u0253\\u0254\\u0256\\u0257\\u0259\\u025b\\u0263\\u0268\\u026f\\u0272\\u0289\\u028b\\u02bb\\u0300-\\u036f\\u1e00-\\u1eff\\u0400-\\u04ff\\u0500-\\u0527\\u2de0-\\u2dff\\ua640-\\ua69f\\u0591-\\u05bf\\u05c1-\\u05c2\\u05c4-\\u05c5\\u05c7\\u05d0-\\u05ea\\u05f0-\\u05f4\\ufb1d-\\ufb28\\ufb2a-\\ufb36\\ufb38-\\ufb3c\\ufb3e\\ufb40-\\ufb41\\ufb43-\\ufb44\\ufb46-\\ufb4f\\u0610-\\u061a\\u0620-\\u065f\\u066e-\\u06d3\\u06d5-\\u06dc\\u06de-\\u06e8\\u06ea-\\u06ef\\u06fa-\\u06fc\\u06ff\\u0750-\\u077f\\u08a0\\u08a2-\\u08ac\\u08e4-\\u08fe\\ufb50-\\ufbb1\\ufbd3-\\ufd3d\\ufd50-\\ufd8f\\ufd92-\\ufdc7\\ufdf0-\\ufdfb\\ufe70-\\ufe74\\ufe76-\\ufefc\\u200c\\u0e01-\\u0e3a\\u0e40-\\u0e4e\\u1100-\\u11ff\\u3130-\\u3185\\uA960-\\uA97F\\uAC00-\\uD7AF\\uD7B0-\\uD7FF\\u3003\\u3005\\u303b\\uff21-\\uff3a\\uff41-\\uff5a\\uff66-\\uff9f\\uffa1-\\uffdc·0-9-]{0,64}){0,10}(?:\\.(xn--[0-9a-z]{2,16}|[a-z\\u00c0-\\u00d6\\u00d8-\\u00f6\\u00f8-\\u00ff\\u0100-\\u024f\\u0253\\u0254\\u0256\\u0257\\u0259\\u025b\\u0263\\u0268\\u026f\\u0272\\u0289\\u028b\\u02bb\\u0300-\\u036f\\u1e00-\\u1eff\\u0400-\\u04ff\\u0500-\\u0527\\u2de0-\\u2dff\\ua640-\\ua69f\\u0591-\\u05bf\\u05c1-\\u05c2\\u05c4-\\u05c5\\u05c7\\u05d0-\\u05ea\\u05f0-\\u05f4\\ufb1d-\\ufb28\\ufb2a-\\ufb36\\ufb38-\\ufb3c\\ufb3e\\ufb40-\\ufb41\\ufb43-\\ufb44\\ufb46-\\ufb4f\\u0610-\\u061a\\u0620-\\u065f\\u066e-\\u06d3\\u06d5-\\u06dc\\u06de-\\u06e8\\u06ea-\\u06ef\\u06fa-\\u06fc\\u06ff\\u0750-\\u077f\\u08a0\\u08a2-\\u08ac\\u08e4-\\u08fe\\ufb50-\\ufbb1\\ufbd3-\\ufd3d\\ufd50-\\ufd8f\\ufd92-\\ufdc7\\ufdf0-\\ufdfb\\ufe70-\\ufe74\\ufe76-\\ufefc\\u200c\\u0e01-\\u0e3a\\u0e40-\\u0e4e\\u1100-\\u11ff\\u3130-\\u3185\\uA960-\\uA97F\\uAC00-\\uD7AF\\uD7B0-\\uD7FF\\u3003\\u3005\\u303b\\uff21-\\uff3a\\uff41-\\uff5a\\uff66-\\uff9f\\uffa1-\\uffdc]{2,24})))(?::\\d{2,5})?(?:/(?:\\S{0,255}[^\\s.;,(\\[\\]{}<>\"'])?)?)|(\\n)|(" + originalString + ")|(^|[\\s\\(\\]])((?:#[0-9_a-z\\u00c0-\\u00d6\\u00d8-\\u00f6\\u00f8-\\u00ff\\u0100-\\u024f\\u0253\\u0254\\u0256\\u0257\\u0259\\u025b\\u0263\\u0268\\u026f\\u0272\\u0289\\u028b\\u02bb\\u0300-\\u036f\\u1e00-\\u1eff\\u0400-\\u04ff\\u0500-\\u0527\\u2de0-\\u2dff\\ua640-\\ua69f\\u0591-\\u05bf\\u05c1-\\u05c2\\u05c4-\\u05c5\\u05c7\\u05d0-\\u05ea\\u05f0-\\u05f4\\ufb1d-\\ufb28\\ufb2a-\\ufb36\\ufb38-\\ufb3c\\ufb3e\\ufb40-\\ufb41\\ufb43-\\ufb44\\ufb46-\\ufb4f\\u0610-\\u061a\\u0620-\\u065f\\u066e-\\u06d3\\u06d5-\\u06dc\\u06de-\\u06e8\\u06ea-\\u06ef\\u06fa-\\u06fc\\u06ff\\u0750-\\u077f\\u08a0\\u08a2-\\u08ac\\u08e4-\\u08fe\\ufb50-\\ufbb1\\ufbd3-\\ufd3d\\ufd50-\\ufd8f\\ufd92-\\ufdc7\\ufdf0-\\ufdfb\\ufe70-\\ufe74\\ufe76-\\ufefc\\u200c\\u0e01-\\u0e3a\\u0e40-\\u0e4e\\u1100-\\u11ff\\u3130-\\u3185\\uA960-\\uA97F\\uAC00-\\uD7AF\\uD7B0-\\uD7FF\\u3003\\u3005\\u303b\\uff21-\\uff3a\\uff41-\\uff5a\\uff66-\\uff9f\\uffa1-\\uffdc]{2,64}|\\$[A-Z]{1,8}(?![A-Z\\d_]))(?:@[a-zA-Z\\d_]{5,32})?)|(^|\\s)\\/([a-zA-Z\\d_]{1,32})(?:@([a-zA-Z\\d_]{5,32}))?(\\b|$)|(?:\\s|^)((?:(\\d{1,2}):(?:[0-5]?[0-9])|(?:\\d{1,2}|\\d{3,})):(?:[0-5][0-9]))(?:\\s|$)", "i");
var EMAIL_REG_EXP = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var MARKDOWN_REG_EXP = /(^|\s|\n)(````?)([\s\S]+?)(````?)([\s\n\.,:?!;]|$)|(^|\s|\x01)(`|~~|\*\*|__|_-_|\|\|)([^\n]+?)\7([\x01\s\.,:?!;]|$)|@(\d+)\s*\((.+?)\)|(\[(.+?)\]\((.+?)\))/m;
var SITE_HASHTAGS = {
	"Telegram": "tg://search_hashtag?hashtag={1}",
	"Twitter": "https://twitter.com/hashtag/{1}",
	"Instagram": "https://instagram.com/explore/tags/{1}/",
	"Google Plus": "https://plus.google.com/explore/{1}"
};
var MARKDOWN_ENTITIES = {
	"`": "messageEntityCode",
	"``": "messageEntityPre",
	"**": "messageEntityBold",
	"__": "messageEntityItalic",
	"~~": "messageEntityStrike",
	"_-_": "messageEntityUnderline",
	"||": "messageEntitySpoiler"
};
new Set(Object.values(MARKDOWN_ENTITIES));
var SINGLE_ENTITIES = /* @__PURE__ */ new Set([
	"messageEntityPre",
	"messageEntityCode",
	"messageEntityFormattedDate"
]);
var PASS_CONFLICTING_ENTITIES = /* @__PURE__ */ new Set([
	"messageEntityEmoji",
	"messageEntityLinebreak",
	"messageEntityCaret"
]);
var PASS_SINGLE_CONFLICTING_ENTITIES = new Set(PASS_CONFLICTING_ENTITIES);
var PASS_SINGLE_CONFLICTING_ENTITIES_WITH_QUOTE = /* @__PURE__ */ new Set(["messageEntityCode", "messageEntityFormattedDate"]);
for (const i in MARKDOWN_ENTITIES) PASS_CONFLICTING_ENTITIES.add(MARKDOWN_ENTITIES[i]);
var PHONE_NUMBER_REG_EXP = /^\+\d+$/;
var LOCAL_ENTITIES = /* @__PURE__ */ new Set([
	"messageEntityLinebreak",
	"messageEntityCaret",
	"messageEntityHighlight",
	"messageEntityBotCommand",
	"messageEntityTimestamp",
	"messageEntityIcon"
]);
//#endregion
//#region src/lib/richTextProcessor/matchTelegramUrlHost.ts
var TELEGRAM_LINK_HOSTS = ["t.me", "telegram.me"];
/**
* Tells whether a url sits on one of `hosts` (or a subdomain of one).
*
* Every host decision has to go through the PARSED url: a check on the raw text would also trust
* `t.me.evil.com` (nothing ends the host), `t.me@evil.com` (the host is a login there) and a
* `telesco.pe/…` buried in some other host's path. Userinfo is refused outright rather than
* ignored — a url that hides a login has nothing to gain from an internal handler.
*
* Returns the matched host plus the labels in front of it (`durov.t.me` → `durov`), or undefined
* when the url is on some other host.
*/
function matchUrlHost(url, hosts) {
	if (!url || !["http:", "https:"].includes(url.protocol) || url.username || url.password) return;
	const hostname = url.hostname.toLowerCase();
	const host = hosts.find((host) => hostname === host) ?? hosts.find((host) => hostname.endsWith("." + host));
	if (!host) return;
	return {
		host,
		subdomain: hostname === host ? "" : hostname.slice(0, -host.length - 1)
	};
}
/**
* Tells a Telegram link host from any other one.
*
* The RETURNED OBJECT is the verdict — `prefix` is not. It carries the username the host itself
* spells (`durov.t.me` → `durov`) and stays undefined on a plain `t.me/durov`, so a caller that
* tests `match?.prefix` instead of `match` treats every non-subdomain link as external.
*/
function matchTelegramUrlHost(url) {
	const match = matchUrlHost(url, TELEGRAM_LINK_HOSTS);
	if (!match) return;
	const prefixLabels = match.subdomain ? match.subdomain.split(".") : [];
	while (prefixLabels.length && T_ME_PREFIXES.has(prefixLabels[prefixLabels.length - 1])) prefixLabels.pop();
	return { prefix: prefixLabels.join(".") || void 0 };
}
//#endregion
//#region src/lib/richTextProcessor/wrapUrl.ts
/** The links that ask to connect through a proxy: a browser cannot, so no handler opens them */
var PROXY_LINK_TYPES = ["proxy", "socks"];
var ANCHOR_HANDLER_NAME_REG_EXP = /^[A-Za-z_$][\w$]*$/;
/**
* The window function a link's handler is, as addAnchorListener sets it and an anchor's inline `onclick` calls it:
* `<protocol>_<name>`, a link's `-` (tg://ton-connect) spelled `_` - in that code the name is an identifier, or the
* call is not one: `tg_ton-connect(this)` subtracts, and throws a ReferenceError on click.
*/
function getAnchorHandlerName(name, protocol) {
	return (protocol ? protocol + "_" : "") + name.replace(/-/g, "_");
}
/** Whether a handler of this name can be called by it from an inline `onclick` (see `getAnchorHandlerName`) */
function isAnchorHandlerName(name) {
	return ANCHOR_HANDLER_NAME_REG_EXP.test(name);
}
/**
* Whether a link handler of this name is there: a function the app set on the window itself. The window also
* shows the document's elements by their ids, and a `tg:` link spells the name, which goes into an inline
* `onclick` as code: `tg_x=alert(1)(this)` - an element with that id, a rich text's anchor say, is no handler, and
* a name the code cannot call it by (see `getAnchorHandlerName`) is none either
*/
function hasAnchorHandler(name) {
	return isAnchorHandlerName(name) && Object.prototype.hasOwnProperty.call(window, name) && typeof window[name] === "function";
}
function wrapUrl(url, safe) {
	url = normalizeUrlProtocol(url);
	const out = { url };
	let parsedUrl;
	try {
		parsedUrl = new URL(url);
	} catch (err) {}
	const telegramUrlMatch = parsedUrl && matchTelegramUrlHost(parsedUrl);
	let tgMatch;
	let onclick;
	if (telegramUrlMatch) {
		const { prefix } = telegramUrlMatch;
		if (prefix) parsedUrl.pathname = prefix + (parsedUrl.pathname === "/" ? "" : parsedUrl.pathname);
		const fullPath = parsedUrl.pathname.slice(1);
		const path = fullPath.split("/");
		const isOneSegment = !prefix && (path.length === 1 || path.length === 2 && !path[1]);
		if (path[0] && path[0][0] === "$" && path[0].length > 1) onclick = "invoice";
		else if (path[0].toLowerCase() === "getpremium") onclick = "premium_offer";
		else if (/^\+/.test(fullPath) && !PHONE_NUMBER_REG_EXP.test(fullPath)) onclick = "joinchat";
		else if (hasAnchorHandler("sendgrams") && path[0].toLowerCase() === "sendgrams" && isOneSegment) onclick = "sendgrams";
		else if (PROXY_LINK_TYPES.includes(path[0].toLowerCase()) && isOneSegment && parsedUrl.search.length > 1) onclick = path[0].toLowerCase();
		else if (path[0]) switch (path[0]) {
			case "m":
			case "addlist":
			case "joinchat":
			case "addstickers":
			case "addemoji":
			case "voicechat":
			case "call":
			case "invoice":
			case "boost":
			case "giftcode":
			case "share":
			case "nft":
			case "addstyle":
			case "contact": if (path.length !== 1 && !prefix) {
				onclick = path[0];
				break;
			}
			default: if (path.length <= 2 || path[1]?.match(/^\d+(?:\?(?:comment|thread)=\d+)?$/) || [
				"s",
				"c",
				"a"
			].includes(path[1])) {
				onclick = "im";
				break;
			}
		}
	} else if (matchUrlHost(parsedUrl, ["telesco.pe"])?.subdomain === "" && /^\/[^/]+\/\d+/.test(parsedUrl.pathname)) onclick = "im";
	else if (/^ton:\/\/transfer\//i.test(url)) onclick = getAnchorHandlerName("transfer", "ton");
	else if (/^tc:/i.test(url)) onclick = getAnchorHandlerName("tonconnect", "tc");
	else if (tgMatch = url.match(/^tg:(?:\/\/)?(.+?)(?:\?|$)/)) {
		onclick = getAnchorHandlerName(tgMatch[1].split("/")[0], "tg");
		switch (tgMatch[1]) {
			case "iv": try {
				if (!safe) throw "unsafe";
				out.url = normalizeUrlProtocol(decodeURIComponent(parsedUrl.searchParams.get("url")));
			} catch (err) {
				onclick = void 0;
			}
		}
	}
	if (!onclick || !hasAnchorHandler(onclick)) onclick = tgMatch && onclick && hasAnchorHandler("unknownDeepLink") ? "unknownDeepLink" : void 0;
	out.onclick = onclick;
	return out;
}
MOUNT_CLASS_TO && (MOUNT_CLASS_TO.wrapUrl = wrapUrl);
//#endregion
//#region src/helpers/schedulers/throttleWith.ts
function throttleWith(schedulerFn, fn, shouldRunFirst = false) {
	let isPending;
	let waiting;
	let args;
	const ret = (..._args) => {
		isPending = true;
		args = _args;
		if (waiting) return;
		if (shouldRunFirst) {
			isPending = false;
			fn(...args);
		}
		const _waiting = waiting = Math.random();
		schedulerFn(() => {
			if (waiting !== _waiting) return;
			ret.clear();
			if (!isPending) return;
			isPending = false;
			fn(...args);
		});
	};
	ret.clear = () => {
		waiting = void 0;
	};
	return ret;
}
//#endregion
//#region src/lib/storage.ts
var _AppStorage;
function noop() {}
var AppStorage = class AppStorage {
	constructor(db, storeName) {
		this.db = db;
		this.storeName = storeName;
		this._save = async () => {
			const deferred = this.saveDeferred;
			this.saveDeferred = deferredPromise();
			const set = this.keysToSet;
			if (set.size) {
				const keys = Array.from(set.values());
				set.clear();
				const values = keys.map((key) => this.cache[key]);
				try {
					(await this.getStorage()).save(keys, values);
				} catch (e) {
					this.log.error("set error", e, keys, values);
				}
			}
			deferred.resolve();
			if (set.size) this.saveThrottled();
		};
		this._delete = async () => {
			const deferred = this.deleteDeferred;
			this.deleteDeferred = deferredPromise();
			const set = this.keysToDelete;
			if (set.size) {
				const keys = Array.from(set.values());
				set.clear();
				try {
					(await this.getStorage()).delete(keys);
				} catch (e) {
					this.log.error("delete error", e, keys);
				}
			}
			deferred.resolve();
			if (set.size) this.deleteThrottled();
		};
		this._get = async () => {
			const keys = Array.from(this.getPromises.keys());
			(await this.getStorage()).get(keys).then((values) => {
				for (let i = 0, length = keys.length; i < length; ++i) {
					const key = keys[i];
					const deferred = this.getPromises.get(key);
					if (deferred) {
						deferred.resolve(this.cache[key] = values[i]);
						this.getPromises.delete(key);
					}
				}
			}, (error) => {
				if (!(/* @__PURE__ */ new Set(["NO_ENTRY_FOUND", "STORAGE_OFFLINE"])).has(error.type)) {
					this.useStorage = false;
					this.log.error("get error", error, keys, this.storeName);
				}
				for (let i = 0, length = keys.length; i < length; ++i) {
					const key = keys[i];
					const deferred = this.getPromises.get(key);
					if (deferred) {
						deferred.resolve(void 0);
						this.getPromises.delete(key);
					}
				}
			}).finally(() => {
				if (this.getPromises.size) this.getThrottled();
			});
		};
		this.log = logger(`AS-${db.name}-${storeName}`);
		this.cache = {};
		this.getPromises = /* @__PURE__ */ new Map();
		this.keysToSet = /* @__PURE__ */ new Set();
		this.saveDeferred = deferredPromise();
		this.keysToDelete = /* @__PURE__ */ new Set();
		this.deleteDeferred = deferredPromise();
		const store = db.stores.find((store) => store.name === storeName);
		this.isEncryptable = !!store?.encryptedName;
		this.encryptedStoreName = store?.encryptedName;
		if (AppStorage.STORAGES.length) this.useStorage = AppStorage.STORAGES[0].useStorage;
		else this.useStorage = true;
		this.savingFreezed = false;
		AppStorage.STORAGES.push(this);
		this.saveThrottled = throttleWith(queueMicrotask, this._save, false);
		this.deleteThrottled = throttleWith(queueMicrotask, this._delete, false);
		this.getThrottled = throttleWith(queueMicrotask, this._get, false);
	}
	getPlainStorage() {
		return new IDBStorage(this.db, this.storeName);
	}
	getEncryptedStorage() {
		return EncryptedStorageLayer.getInstance(this.db, this.encryptedStoreName);
	}
	getStorage() {
		if (this.storage) return Promise.resolve(this.storage);
		return this.storagePromise ?? (this.storagePromise = this.createStorage().then((storage) => this.storage ?? (this.storage = storage)).finally(() => this.storagePromise = void 0));
	}
	async createStorage() {
		if (!(this.isEncryptable ? await DeferredIsUsingPasscode.isUsingPasscode() : false)) return this.getPlainStorage();
		const storage = this.getEncryptedStorage();
		await storage.ensureLoaded();
		await this.encryptLeftovers(storage);
		return storage;
	}
	/**
	* A store that was never opened while the passcode was being enabled had nothing to migrate back then
	* (see `toggleEncrypted`), so its data was left lying in the unencrypted store - fold it in on the first open
	*/
	async encryptLeftovers(encryptedStorage) {
		const plainStorage = this.getPlainStorage();
		try {
			const entries = await plainStorage.getAllEntries();
			if (!entries.length) return;
			this.log.warn("found unencrypted entries, encrypting them", entries.length);
			await encryptedStorage.mergeDecrypted(Object.fromEntries(entries));
			await plainStorage.clear();
		} catch (err) {
			this.log.error("encrypt leftovers error", err);
		}
	}
	isAvailable() {
		return this.useStorage;
	}
	getCache() {
		return this.cache;
	}
	getFromCache(key) {
		return this.cache[key];
	}
	setToCache(key, value) {
		return this.cache[key] = value;
	}
	async get(key, useCache = true) {
		if (this.cache.hasOwnProperty(key) && useCache) return this.getFromCache(key);
		else if (this.useStorage) {
			const r = this.getPromises.get(key);
			if (r) return r;
			const p = deferredPromise();
			this.getPromises.set(key, p);
			this.getThrottled();
			return p;
		}
	}
	async getAll() {
		return (await this.getStorage()).getAll().catch(() => []);
	}
	async getAllKeys() {
		return (await this.getStorage()).getAllKeys().catch(() => []);
	}
	async getAllEntries() {
		return (await this.getStorage()).getAllEntries().catch(() => []);
	}
	warnAboutSaving() {}
	set(obj, onlyLocal = false) {
		const canUseStorage = this.useStorage && !onlyLocal && !this.savingFreezed;
		this.warnAboutSaving();
		let setSomething = false;
		for (const key in obj) if (obj.hasOwnProperty(key)) {
			const value = obj[key];
			this.setToCache(key, value);
			if (canUseStorage) {
				this.keysToSet.add(key);
				this.keysToDelete.delete(key);
				this.saveThrottled();
			}
			setSomething = true;
		}
		return canUseStorage && setSomething ? this.saveDeferred : Promise.resolve();
	}
	delete(key, saveLocal = false) {
		this.warnAboutSaving();
		key = "" + key;
		if (!saveLocal) delete this.cache[key];
		if (this.useStorage) {
			this.keysToSet.delete(key);
			this.keysToDelete.add(key);
			this.deleteThrottled();
		}
		return this.useStorage ? this.deleteDeferred : Promise.resolve();
	}
	async clear(saveLocal = false) {
		if (!saveLocal) for (const i in this.cache) delete this.cache[i];
		try {
			await Promise.all([this.getPlainStorage().clear(), this.isEncryptable && this.getEncryptedStorage().clear()]);
		} catch {}
	}
	async unfreezeAsync(callback) {
		const prevFreezed = this.savingFreezed;
		this.savingFreezed = false;
		try {
			await callback();
		} catch (err) {
			console.error("unfreezeAsync callback error:", err);
		}
		this.savingFreezed = prevFreezed;
	}
	static toggleStorage(enabled, clearWrite) {
		return Promise.all(this.STORAGES.map((storage) => {
			storage.useStorage = enabled;
			if (!IS_WORKER || !clearWrite) return;
			if (!enabled) {
				storage.keysToSet.clear();
				storage.keysToDelete.clear();
				storage.getPromises.forEach((deferred) => deferred.resolve(void 0));
				storage.getPromises.clear();
			} else return storage.set(storage.cache);
		})).catch(noop);
	}
	static freezeSaving(callback, names) {
		this.STORAGES.forEach((storage) => storage.savingFreezed = true);
		try {
			callback();
		} catch (err) {
			console.error("freezeSaving callback error:", err);
		}
		this.STORAGES.forEach((storage) => storage.savingFreezed = false);
	}
	static async freezeSavingAsync(callback) {
		this.STORAGES.forEach((storage) => storage.savingFreezed = true);
		try {
			await callback();
		} catch (err) {
			console.error("freezeSavingAsync callback error:", err);
		}
		this.STORAGES.forEach((storage) => storage.savingFreezed = false);
	}
	/**
	* The direction is taken from the argument, never from `this.storage`: the store might not have been
	* opened yet, and by the time this runs `getStorage` would already answer with the layer the new flag
	* dictates, so the data would be read from the empty destination and left in the source
	*/
	async toggleEncrypted(shouldEncrypt) {
		if (!this.isEncryptable) return;
		const encryptedStorage = this.getEncryptedStorage();
		const plainStorage = this.getPlainStorage();
		if (shouldEncrypt) {
			const entries = await plainStorage.getAllEntries().catch((err) => {
				this.log.error("toggle encrypted read error", err);
			});
			await encryptedStorage.mergeDecrypted(Object.fromEntries(entries || []));
			if (entries) await plainStorage.clear();
			this.storage = encryptedStorage;
		} else {
			await encryptedStorage.ensureLoaded();
			const entries = await encryptedStorage.getAllEntries();
			if (entries.length) await plainStorage.save(entries.map((entry) => entry[0]), entries.map((entry) => entry[1]));
			await encryptedStorage.clear();
			this.storage = plainStorage;
		}
		this.storagePromise = void 0;
	}
	/**
	* Has to be awaited BEFORE the encryption key is replaced, otherwise a store nobody has opened yet
	* would stay encrypted with the old key and become unreadable
	*/
	async loadEncrypted() {
		if (!this.isEncryptable) return;
		if (!await DeferredIsUsingPasscode.isUsingPasscode()) return;
		await this.getStorage();
	}
	async reEncrypt() {
		if (!(this.storage instanceof EncryptedStorageLayer)) return;
		await this.storage.reEncrypt();
	}
	static async toggleEncryptedForAll(shouldEncrypt) {
		await this.freezeSavingAsync(async () => {
			await Promise.all(this.STORAGES.map((storage) => storage.toggleEncrypted(shouldEncrypt)));
		});
	}
	static async loadEncryptedForAll() {
		await Promise.all(this.STORAGES.map((storage) => storage.loadEncrypted().catch((err) => {
			storage.log.error("load encrypted error", err);
		})));
	}
	static async reEncryptEncrypted() {
		await this.freezeSavingAsync(async () => {
			await Promise.all(this.STORAGES.map((storage) => storage.reEncrypt()));
		});
	}
};
_AppStorage = AppStorage;
_AppStorage.STORAGES = [];
MOUNT_CLASS_TO && (MOUNT_CLASS_TO.AppStorage = AppStorage);
//#endregion
//#region src/lib/commonStateStorage.ts
var CommonStateStorage = class extends AppStorage {
	constructor() {
		super(getCommonDatabaseState(), "session");
	}
};
var commonStateStorage = new CommonStateStorage();
commonStateStorage.get("settings", false).then((settings) => {
	DeferredIsUsingPasscode.resolveDeferred(settings?.passcode?.enabled || false);
});
MOUNT_CLASS_TO.commonStateStorage = commonStateStorage;
//#endregion
export { matchUrlProtocol as C, isWebPageUrl as S, PASS_SINGLE_CONFLICTING_ENTITIES_WITH_QUOTE as _, getAnchorHandlerName as a, SITE_HASHTAGS as b, matchTelegramUrlHost as c, FULL_REG_EXP as d, LOCAL_ENTITIES as f, PASS_SINGLE_CONFLICTING_ENTITIES as g, PASS_CONFLICTING_ENTITIES as h, PROXY_LINK_TYPES as i, matchUrlHost as l, MARKDOWN_REG_EXP as m, AppStorage as n, isAnchorHandlerName as o, MARKDOWN_ENTITIES as p, throttleWith as r, wrapUrl as s, commonStateStorage as t, EMAIL_REG_EXP as u, PHONE_NUMBER_REG_EXP as v, normalizeUrlProtocol as w, URL_REG_EXP as x, SINGLE_ENTITIES as y };
