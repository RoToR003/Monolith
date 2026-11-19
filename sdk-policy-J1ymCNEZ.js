//# allFunctionsCalledOnLoad
import { t as _defineProperty } from "./defineProperty-_J0dqq22.js";
/** Bytes of keys and values (UTF-8) per storage area and message (4 KB: a 50-item to-do list; docs/decisions.md, "Strict limits from the start"). */
var STORAGE_QUOTA_BYTES = 4096;
var DEFAULT_LOCALE = "en-US";
/** A press whose end the host never saw (the finger left the view) counts as lifted this long after it began. */
var HAPTIC_PRESS_MAX_MS = 3e4;
var THEME_KEYS = [
	"bg_color",
	"text_color",
	"hint_color",
	"link_color",
	"button_color",
	"button_text_color",
	"secondary_bg_color",
	"accent_text_color",
	"subtitle_text_color",
	"destructive_text_color",
	"section_bg_color",
	"section_header_text_color",
	"section_separator_color",
	"header_bg_color",
	"bottom_bar_bg_color"
];
var HAPTIC_IMPACT_STYLES = [
	"light",
	"medium",
	"heavy",
	"rigid",
	"soft"
];
var HAPTIC_NOTIFICATION_TYPES = [
	"error",
	"success",
	"warning"
];
var TELEGRAM_HOSTS = [
	"t.me",
	"telegram.me",
	"telegram.dog"
];
/** The viewer's username: 5–32 characters of A–Z, a–z, 0–9 and _. */
var VIEWER_USERNAME = /^[A-Za-z0-9_]{5,32}$/;
/** The chat kinds a host may report (`Chat.type` of the Bot API); a value outside them is no chat type (null). */
var CHAT_TYPES = [
	"private",
	"group",
	"supergroup",
	"channel"
];
/** Methods that need the task's user gesture (docs/protocol.md, "User activation"); one press unlocks one of them. `request` has its own gate (`RequestGate`). */
var PRIVILEGED_METHODS = /* @__PURE__ */ new Set([
	"openLink",
	"openTelegramLink",
	"copyText"
]);
/**
* The bridge methods a preview (an inline result before it is sent: `WidgetContext.preview`) may call; everything
* else is refused there: no request, link, copy or haptic. A preview gets no input either (its host drops the
* renderer's events and gesture claims).
*/
var PREVIEW_METHODS = /* @__PURE__ */ new Set(["ready", "setResizeAnchor"]);
function allowedInPreview(method) {
	return typeof method === "string" && PREVIEW_METHODS.has(method);
}
/** UTF-8 length of a JS string; a lone surrogate counts 3 bytes (what U+FFFD takes). */
function utf8Length(s) {
	let n = 0;
	for (let i = 0; i < s.length; i++) {
		const c = s.charCodeAt(i);
		if (c < 128) n += 1;
		else if (c < 2048) n += 2;
		else if (c >= 55296 && c <= 56319 && i + 1 < s.length && (s.charCodeAt(i + 1) & 64512) === 56320) {
			n += 4;
			i++;
		} else n += 3;
	}
	return n;
}
var HEX = "0123456789ABCDEF";
var isHex = (c) => c >= 48 && c <= 57 || c >= 65 && c <= 70 || c >= 97 && c <= 102;
/** ASCII that may stand unescaped after the authority: RFC 3986 unreserved, reserved and `%`. */
var URL_ASCII = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~:/?#[]@!$&'()*+,;=%";
/** Lowercases A–Z only: a Unicode mapping (U+212A KELVIN SIGN → `k`) must not turn a non-ASCII host into an ASCII one. */
var asciiLower = (s) => s.replace(/[A-Z]/g, (c) => String.fromCharCode(c.charCodeAt(0) + 32));
var isTelegramHost = (host) => TELEGRAM_HOSTS.some((t) => host === t || host.endsWith("." + t));
var PUNY_BASE = 36;
var PUNY_TMIN = 1;
var PUNY_TMAX = 26;
var PUNY_SKEW = 38;
var PUNY_DAMP = 700;
var punyDigit = (d) => String.fromCharCode(d < 26 ? 97 + d : 22 + d);
function punyAdapt(delta, points, first) {
	delta = first ? Math.floor(delta / PUNY_DAMP) : delta >> 1;
	delta += Math.floor(delta / points);
	let k = 0;
	for (; delta > 455; k += PUNY_BASE) delta = Math.floor(delta / 35);
	return k + Math.floor(36 * delta / (delta + PUNY_SKEW));
}
function punycode(label) {
	const points = Array.from(label, (c) => c.codePointAt(0));
	let out = points.filter((c) => c < 128).map((c) => String.fromCharCode(c)).join("");
	const basic = out.length;
	if (basic) out += "-";
	let n = 128, delta = 0, bias = 72;
	for (let h = basic; h < points.length; ++delta, ++n) {
		let m = Infinity;
		for (const c of points) if (c >= n && c < m) m = c;
		delta += (m - n) * (h + 1);
		n = m;
		for (const c of points) {
			if (c < n) ++delta;
			if (c !== n) continue;
			let q = delta;
			for (let k = PUNY_BASE;; k += PUNY_BASE) {
				const t = k <= bias ? PUNY_TMIN : k >= bias + PUNY_TMAX ? PUNY_TMAX : k - bias;
				if (q < t) break;
				out += punyDigit(t + (q - t) % (PUNY_BASE - t));
				q = Math.floor((q - t) / (PUNY_BASE - t));
			}
			out += punyDigit(q);
			bias = punyAdapt(delta, h + 1, h === basic);
			delta = 0;
			++h;
		}
	}
	return out;
}
/** tweb: what IDNA keeps as it is where its case folding would change it: the deviations ß and ς (UTS #46 nontransitional), ı. */
var IDNA_KEEPS = /* @__PURE__ */ new Set([
	"ß",
	"ς",
	"ı"
]);
/** What IDNA folds otherwise than lowercasing does, where lowercasing twice over shows nothing: Cherokee, to its capitals. */
var IDNA_FOLDS_OTHERWISE = /[\u13a0-\u13ff\uab70-\uabbf]/u;
/**
* tweb: a host label as it goes on the wire: an ASCII one lowercased (A–Z), a Unicode one in its `xn--` form — mapped
* code point by code point as the browser's URL parser maps it (UTS #46): its compatibility form (NFKC), lowercased alone
* (the whole label's final-sigma rule made `ΟΣ` `ος`, another host than the browser's `οσ`; a ς the compatibility form
* makes, of the lunate or a mathematical final sigma, is σ), then NFC — letters, marks, digits and hyphens, not a mark first; or null.
* Refused rather than sent to a host the browser would not reach: a label that comes out all ASCII (U+212A KELVIN SIGN
* lowercases to `k`, a full-width name to its ASCII one: it would pass for another host), a code point IDNA ignores (a
* variation selector), and one IDNA folds otherwise than lowercasing does (`ᾳ` to `αι`, Cherokee).
*/
function hostLabel(label) {
	if (!/[^\x00-\x7f]/.test(label)) return asciiLower(label);
	const mapped = Array.from(label, (c) => IDNA_KEEPS.has(c) ? c : Array.from(c.normalize("NFKC"), (d) => d === "ς" ? "σ" : d.toLowerCase()).join("")).join("").normalize("NFC");
	if (!/[^\x00-\x7f]/.test(mapped) || !/^[\p{L}\p{N}-][\p{L}\p{M}\p{N}-]*$/u.test(mapped) || /\p{Default_Ignorable_Code_Point}/u.test(mapped)) return null;
	for (const c of mapped) if (!IDNA_KEEPS.has(c) && (IDNA_FOLDS_OTHERWISE.test(c) || c.toUpperCase().toLowerCase().normalize("NFC") !== c)) return null;
	return "xn--" + punycode(mapped);
}
/**
* The URL a link call opens, or null when it breaks the rules: an absolute
* `https:` URL, no user name or password, an ASCII host of LDH labels (an IDN in
* its `xn--` form; tweb: one given in Unicode is put in it), an optional port, at most 256 characters once non-ASCII
* characters after the host are percent-encoded as UTF-8. `openTelegramLink`
* takes only t.me, telegram.me and telegram.dog (and their subdomains), any
* path; `openLink` takes every other host. Scheme and host come out lowercase,
* the rest as given.
*/
function checkLink(method, url) {
	if (typeof url !== "string" || utf8Length(url) > 256) return null;
	if (asciiLower(url.slice(0, 8)) !== "https://") return null;
	let end = 8;
	while (end < url.length && url[end] !== "/" && url[end] !== "?" && url[end] !== "#") end++;
	const authority = url.slice(8, end);
	if (authority.includes("@")) return null;
	const colon = authority.indexOf(":");
	const labels = (colon < 0 ? authority : authority.slice(0, colon)).split(".").map(hostLabel);
	if (labels.includes(null)) return null;
	const host = labels.join(".");
	const port = colon < 0 ? null : authority.slice(colon + 1);
	if (port !== null && !/^[0-9]{1,5}$/.test(port)) return null;
	if (port !== null && Number(port) > 65535) return null;
	if (host.length === 0 || host.length > 253) return null;
	for (const label of host.split(".")) if (label.length === 0 || label.length > 63 || !/^[a-z0-9-]+$/.test(label) || label[0] === "-" || label[label.length - 1] === "-") return null;
	if (isTelegramHost(host) !== (method === "openTelegramLink")) return null;
	let rest = "";
	for (let i = end; i < url.length; i++) {
		const c = url.charCodeAt(i);
		if (c < 128) {
			if (!URL_ASCII.includes(url[i])) return null;
			if (c === 37 && !(i + 2 < url.length && isHex(url.charCodeAt(i + 1)) && isHex(url.charCodeAt(i + 2)))) return null;
			rest += url[i];
			continue;
		}
		let cp = c;
		if (c >= 55296 && c <= 56319 && i + 1 < url.length && (url.charCodeAt(i + 1) & 64512) === 56320) cp = 65536 + (c - 55296 << 10) + (url.charCodeAt(++i) - 56320);
		else if (c >= 55296 && c <= 57343) return null;
		const bytes = cp < 2048 ? [192 | cp >> 6, 128 | cp & 63] : cp < 65536 ? [
			224 | cp >> 12,
			128 | cp >> 6 & 63,
			128 | cp & 63
		] : [
			240 | cp >> 18,
			128 | cp >> 12 & 63,
			128 | cp >> 6 & 63,
			128 | cp & 63
		];
		for (const b of bytes) rest += "%" + HEX[b >> 4] + HEX[b & 15];
	}
	const out = "https://" + host + (port === null ? "" : ":" + port) + rest;
	return out.length > 256 ? null : out;
}
/** The haptic of a `haptic` bridge call's args, or null: `['impact', style]`, `['notification', type]`, `['selection']`. */
function checkHaptic(args) {
	if (!Array.isArray(args)) return null;
	if (args[0] === "impact" && args.length === 2 && HAPTIC_IMPACT_STYLES.includes(args[1])) return {
		haptic: "impact",
		value: args[1]
	};
	if (args[0] === "notification" && args.length === 2 && HAPTIC_NOTIFICATION_TYPES.includes(args[1])) return {
		haptic: "notification",
		value: args[1]
	};
	if (args[0] === "selection" && args.length === 1) return { haptic: "selection" };
	return null;
}
/** The resize anchor of a `setResizeAnchor` call's argument, or null: exactly `'top'` or `'bottom'`. */
function checkResizeAnchor(edge) {
	return edge === "top" || edge === "bottom" ? edge : null;
}
/** The action of a bridge call, or null when the method is unknown or its arguments are wrong (`bridge-rejected`). */
function checkBridgeCall(method, args) {
	if (!Array.isArray(args)) return null;
	switch (method) {
		case "ready": return args.length === 0 ? { kind: "ready" } : null;
		case "openLink":
		case "openTelegramLink": {
			const url = args.length === 1 ? checkLink(method, args[0]) : null;
			return url === null ? null : {
				kind: method,
				url
			};
		}
		case "haptic": {
			const h = checkHaptic(args);
			return h === null ? null : {
				kind: "haptic",
				...h
			};
		}
		case "setResizeAnchor": {
			const edge = args.length === 1 ? checkResizeAnchor(args[0]) : null;
			return edge === null ? null : {
				kind: "setResizeAnchor",
				edge
			};
		}
		case "watchPublicData": return args.length === 1 && typeof args[0] === "boolean" ? {
			kind: "watchPublicData",
			on: args[0]
		} : null;
		case "request": {
			const id = args[0];
			const data = args.length === 2 || args.length === 3 ? checkRequestData(args[1]) : null;
			const options = args.length === 3 ? checkRequestOptions(args[2]) : { wallet: false };
			if (data === null || options === null || !isRequestId(id)) return null;
			return options.wallet ? {
				kind: "request",
				id,
				data,
				wallet: true
			} : {
				kind: "request",
				id,
				data
			};
		}
		case "wallet": {
			const [id, name, arg, label] = args;
			const data = args.length === 4 ? checkRequestData(label) : null;
			if (data === null || !isRequestId(id)) return null;
			if (name === "sendTransaction") {
				const transaction = checkWalletTransaction(arg);
				return transaction === null ? null : {
					kind: "wallet",
					id,
					call: {
						method: "sendTransaction",
						transaction,
						data
					}
				};
			}
			if (name === "signData") {
				const payload = checkSignDataPayload(arg);
				return payload === null ? null : {
					kind: "wallet",
					id,
					call: {
						method: "signData",
						payload,
						data
					}
				};
			}
			return null;
		}
		case "copyText": {
			const text = args.length === 1 ? checkCopyText(args[0]) : null;
			return text === null ? null : {
				kind: "copyText",
				text
			};
		}
		default: return null;
	}
}
/** No lone surrogate: the string has a UTF-8 form (what the server and the clipboard take). */
function wellFormed(s) {
	for (let i = 0; i < s.length; i++) {
		const c = s.charCodeAt(i);
		if (c < 55296 || c > 57343) continue;
		if (c > 56319 || i + 1 >= s.length || (s.charCodeAt(i + 1) & 64512) !== 56320) return false;
		i++;
	}
	return true;
}
/** A request's `data`, or null: a well-formed string of 1–64 UTF-8 bytes. */
function checkRequestData(data) {
	if (typeof data !== "string" || !wellFormed(data)) return null;
	const n = utf8Length(data);
	return n >= 1 && n <= 64 ? data : null;
}
var isRequestId = (id) => typeof id === "number" && Number.isInteger(id) && id >= 1 && id <= 2147483647;
/** A `request`'s options, or null: an object with at most `wallet`, a boolean (absent or null: false). */
function checkRequestOptions(options) {
	if (!isPlainObject(options) || !onlyKeys(options, ["wallet"])) return null;
	const w = options.wallet;
	return w === void 0 || w === null ? { wallet: false } : typeof w === "boolean" ? { wallet: w } : null;
}
/** A `copyText` text, or null: a well-formed string of 1–256 UTF-16 code units. */
function checkCopyText(text) {
	return typeof text === "string" && text.length >= 1 && text.length <= 256 && wellFormed(text) ? text : null;
}
/**
* One of `chatData` / `publicData`: a well-formed string of 1–1024 UTF-8 bytes without a NUL (the server's rule for
* its text fields); null for none (null, absent, the empty string the bot clears it with) and for anything else.
*/
function checkWidgetDataValue(value) {
	return typeof value === "string" && value.length > 0 && wellFormed(value) && !value.includes("\0") && utf8Length(value) <= 1024 ? value : null;
}
/**
* The full state of the bot's two strings, as the client passes it at creation and in `setData`. A forwarded copy
* has no `chatData` (the server never copies it): the glue drops what the client passed, silently.
*/
function checkWidgetData(data, copy) {
	const d = typeof data === "object" && data !== null ? data : {};
	const out = {
		chatData: null,
		publicData: null,
		rejected: []
	};
	for (const field of ["chatData", "publicData"]) {
		const v = d[field];
		if (field === "chatData" && copy) continue;
		out[field] = checkWidgetDataValue(v);
		if (out[field] === null && v !== void 0 && v !== null && v !== "") out.rejected.push(field);
	}
	return out;
}
/**
* Who looks at the widget, as the widget sees it (Mini Apps' `WebAppUser`): `id`, `first_name`, `last_name`,
* `username`, `is_premium`. The input has the same field names. No viewer (null) without a positive integer id of at
* most 53 bits; a field that breaks its rule is left out and listed in `rejected` (in this order): a name 1–64 UTF-16
* code units without a lone surrogate, a username 5–32 characters of A–Z, a–z, 0–9 and _, `is_premium` a boolean,
* kept only when true. Absent (undefined or null) fields are left out without a word.
*/
function checkViewer(viewer) {
	const v = typeof viewer === "object" && viewer !== null ? viewer : {};
	const id = v.id;
	if (typeof id !== "number" || !Number.isInteger(id) || id < 1 || id > 9007199254740991) return {
		viewer: null,
		rejected: []
	};
	const out = { id };
	const rejected = [];
	const name = (s) => typeof s === "string" && s.length >= 1 && s.length <= 64 && wellFormed(s);
	for (const field of ["first_name", "last_name"]) {
		const s = v[field];
		if (s === void 0 || s === null) continue;
		if (name(s)) out[field] = s;
		else rejected.push(field);
	}
	if (v.username !== void 0 && v.username !== null) {
		if (typeof v.username === "string" && VIEWER_USERNAME.test(v.username)) out.username = v.username;
		else rejected.push("username");
	}
	if (v.is_premium !== void 0 && v.is_premium !== null) {
		if (v.is_premium === true) out.is_premium = true;
		else if (v.is_premium !== false) rejected.push("is_premium");
	}
	return {
		viewer: out,
		rejected
	};
}
/** Why a viewer field was left out (`data-rejected`: `viewer.<field>: <why>; the widget does not see it`). */
var VIEWER_FIELD_RULES = {
	first_name: "not text of 1–64 UTF-16 code units",
	last_name: "not text of 1–64 UTF-16 code units",
	username: "not 5–32 characters of A–Z, a–z, 0–9 and _",
	is_premium: "not a boolean"
};
/** A client's `WidgetViewer` in the widget's field names, for `checkViewer`. */
function viewerUser(viewer) {
	if (typeof viewer !== "object" || viewer === null) return null;
	return {
		id: viewer.id,
		first_name: viewer.firstName,
		last_name: viewer.lastName,
		username: viewer.username,
		is_premium: viewer.isPremium
	};
}
function checkChatType(chatType) {
	return CHAT_TYPES.includes(chatType) ? chatType : null;
}
/**
* The bot's answer to a request as the widget gets it: `result`, a well-formed string of at most 1024 UTF-8 bytes
* without a NUL (empty allowed), or none. Null when it breaks the rules (the widget gets `INVALID_ANSWER`). An
* answer carries no data: the bot edits its data with separate calls, which reach the host as `setData`.
*/
function checkRequestAnswer(answer) {
	const r = typeof answer === "object" && answer !== null ? answer.result : void 0;
	if (r === void 0 || r === null) return { result: null };
	return typeof r === "string" && wellFormed(r) && !r.includes("\0") && utf8Length(r) <= 1024 ? { result: r } : null;
}
/** What a client's failed request becomes in the widget: `'TIMEOUT'`, `'RATE_LIMITED'`, `'FAILED'`, or `{ code }` with one of them; anything else is `FAILED`. */
function requestFailure(reason) {
	const code = typeof reason === "object" && reason !== null ? reason.code : reason;
	return code === "TIMEOUT" || code === "RATE_LIMITED" ? code : "FAILED";
}
/** What a client's failed wallet call becomes in the widget: a request's failures, `'REJECTED'`, `'BAD_REQUEST'` (or `{ code }`); anything else is `FAILED`. */
function walletFailure(reason) {
	const code = typeof reason === "object" && reason !== null ? reason.code : reason;
	return code === "REJECTED" || code === "BAD_REQUEST" ? code : requestFailure(code);
}
/** TON Connect's network ids: the mainnet and the testnet. */
var WALLET_NETWORKS = ["-239", "-3"];
var isPlainObject = (v) => typeof v === "object" && v !== null && !Array.isArray(v);
var onlyKeys = (o, keys) => Object.keys(o).every((k) => keys.includes(k));
/** Absent: undefined or null (a JSON null the bot wrote). */
var absent = (v) => v === void 0 || v === null;
var RAW_ADDRESS = /^(0|-1):[0-9a-fA-F]{64}$/;
var FRIENDLY_ADDRESS = /^[A-Za-z0-9+/_-]{48}$/;
var AMOUNT = /^(0|[1-9][0-9]{0,36})$/;
var BASE64 = /^[A-Za-z0-9+/_-]+={0,2}$/;
/** A TON address, or null: raw (`0:` or `-1:` and 64 hex digits) or user-friendly (48 characters of base64 or base64url); a transaction's `from`. The wallet checks the rest. */
function checkWalletAddress(address) {
	return typeof address === "string" && (RAW_ADDRESS.test(address) || FRIENDLY_ADDRESS.test(address)) ? address : null;
}
/** A message's destination, or null: user-friendly only (TON Connect: the wallet must refuse a raw one; the bounce flag is in it). */
function checkWalletDestination(address) {
	return typeof address === "string" && FRIENDLY_ADDRESS.test(address) ? address : null;
}
var base64 = (v, max) => typeof v === "string" && v.length <= max && BASE64.test(v);
/** The optional `network` and `from` of a transaction or a payload into `out`; false when one breaks its rule. */
function walletTarget(input, out) {
	if (!absent(input.network)) {
		if (!WALLET_NETWORKS.includes(input.network)) return false;
		out.network = input.network;
	}
	if (!absent(input.from)) {
		const from = checkWalletAddress(input.from);
		if (from === null) return false;
		out.from = from;
	}
	return true;
}
/**
* A transaction for `sendTransaction`, or null: TON Connect's fields only (`valid_until`, `network`, `from`,
* `messages`), 1–255 messages of `address`, `amount` and optionally `payload` and `stateInit`. `valid_until` an
* integer of 1 to 2^32 − 1 (Unix seconds), `network` `-239` or `-3`, `from` raw or user-friendly, a message's
* `address` user-friendly only, amounts decimal strings of nanotons (at most 37 digits, no leading zero), payloads
* base64 of at most 8192 characters each and 65536 together. Absent and null fields are left out. The wallet checks
* the rest (the network and the sender against the account, the cells, the expiry) and refuses with `BAD_REQUEST`.
*/
function checkWalletTransaction(tx) {
	if (!isPlainObject(tx) || !onlyKeys(tx, [
		"valid_until",
		"network",
		"from",
		"messages"
	])) return null;
	const out = { messages: [] };
	if (!absent(tx.valid_until)) {
		const v = tx.valid_until;
		if (typeof v !== "number" || !Number.isInteger(v) || v < 1 || v > 4294967295) return null;
		out.valid_until = v;
	}
	if (!walletTarget(tx, out)) return null;
	const messages = tx.messages;
	if (!Array.isArray(messages) || messages.length < 1 || messages.length > 255) return null;
	let total = 0;
	for (const m of messages) {
		if (!isPlainObject(m) || !onlyKeys(m, [
			"address",
			"amount",
			"payload",
			"stateInit"
		])) return null;
		const address = checkWalletDestination(m.address);
		if (address === null || typeof m.amount !== "string" || !AMOUNT.test(m.amount)) return null;
		const message = {
			address,
			amount: m.amount
		};
		for (const field of ["payload", "stateInit"]) {
			if (absent(m[field])) continue;
			if (!base64(m[field], 8192)) return null;
			message[field] = m[field];
			total += m[field].length;
		}
		out.messages.push(message);
	}
	return total <= 65536 ? out : null;
}
/** Text the server and the bot can take: well-formed, no NUL, 1 to `max` UTF-8 bytes. */
var signText = (v, max) => typeof v === "string" && v.length > 0 && wellFormed(v) && !v.includes("\0") && utf8Length(v) <= max;
/**
* A `signData` payload, or null: TON Connect's three kinds with their fields only, and optionally `network` and
* `from` as a transaction's. `text`: 1–4096 UTF-8 bytes; `binary`: `bytes`, base64 of at most 4096 characters;
* `cell`: `schema` (TL-B, 1–1024 UTF-8 bytes) and `cell`, base64 of at most 4096 characters. Absent and null fields
* are left out. No domain: the client signs for the bot of the message (`bot<bot_id>`).
*/
function checkSignDataPayload(payload) {
	if (!isPlainObject(payload)) return null;
	const common = [
		"type",
		"network",
		"from"
	];
	let out;
	switch (payload.type) {
		case "text":
			if (!onlyKeys(payload, [...common, "text"]) || !signText(payload.text, 4096)) return null;
			out = {
				type: "text",
				text: payload.text
			};
			break;
		case "binary":
			if (!onlyKeys(payload, [...common, "bytes"]) || !base64(payload.bytes, 4096)) return null;
			out = {
				type: "binary",
				bytes: payload.bytes
			};
			break;
		case "cell":
			if (!onlyKeys(payload, [
				...common,
				"schema",
				"cell"
			]) || !signText(payload.schema, 1024) || !base64(payload.cell, 4096)) return null;
			out = {
				type: "cell",
				schema: payload.schema,
				cell: payload.cell
			};
			break;
		default: return null;
	}
	return walletTarget(payload, out) ? out : null;
}
/** What the widget's promise rejects with for a refused request. */
function requestRefusal(verdict) {
	switch (verdict) {
		case "foreground":
		case "background":
		case "held":
		case "granted": return null;
		case "busy": return "BUSY";
		case "rate-limited": return "RATE_LIMITED";
		default: return "NOT_ALLOWED";
	}
}
/**
* The client's sandbox policy for requests, from the server's flags only: on a tap whenever `canQuery`; without one
* only with `backgroundQuery`: one when the widget appears on screen (`show`, and at creation), then at most one per
* 5 s counted from the start of the last background request, while it stays visible; one made while it is off screen
* is held (`held`) and is the one of its next appearance (`show` returns true: the glue sends it then). One request
* in flight, a held one included. `gesture`: the task has a press no privileged call consumed yet (the glue consumes
* it on `foreground`). `finish` when the answer or the failure has gone into the widget, or when the glue drops a
* held request (the widget stopped); `answeredAt` when an answer with no error went in then.
*
* The wallet (docs/sdk-v1.md §2.18): only with `wallet` (the client has Gram Wallet for this user). A request that
* asks for the wallet (`withWallet`) and a wallet call (`decideWallet`) need the visible widget and a press, or the
* grant: the answer to the last call made by a press or a grant (a request or a wallet call) lets one wallet call
* follow within 10 s, so a tap can pay for what the bot answers (tap → request → transaction). Any call that goes
* out as `foreground` or `granted` uses up the grant; its answer brings the next one.
*/
var RequestGate = class {
	constructor() {
		_defineProperty(this, "inFlight", false);
		_defineProperty(this, "held", false);
		_defineProperty(this, "lastBackground", null);
		_defineProperty(
			this,
			/** The call in flight went out on a press or the grant: its answer grants one wallet call. */
			"granting",
			false
		);
		_defineProperty(this, "grantAt", null);
	}
	get busy() {
		return this.inFlight;
	}
	decide(now, s) {
		if (!s.canQuery) return "disabled";
		if (s.withWallet && !s.wallet) return "no-wallet";
		if (this.inFlight) return "busy";
		if (s.gesture && s.visible) return this.out("foreground");
		if (!s.backgroundQuery || s.withWallet) return "no-activation";
		if (!s.visible) {
			this.inFlight = this.held = true;
			return "held";
		}
		if (this.lastBackground !== null && now - this.lastBackground < 5e3) return "rate-limited";
		this.lastBackground = now;
		this.inFlight = true;
		return "background";
	}
	/** A wallet call (`sendTransaction`, `signData`): on a press, or on the grant within 10 s of its answer. */
	decideWallet(now, s) {
		if (!s.canQuery) return "disabled";
		if (!s.wallet) return "no-wallet";
		if (this.inFlight) return "busy";
		if (s.gesture && s.visible) return this.out("foreground");
		if (s.visible && this.grantAt !== null && now - this.grantAt <= 1e4) return this.out("granted");
		return "no-activation";
	}
	out(verdict) {
		this.inFlight = this.granting = true;
		this.grantAt = null;
		return verdict;
	}
	finish(answeredAt) {
		if (this.granting && answeredAt !== void 0) this.grantAt = answeredAt;
		this.inFlight = this.held = this.granting = false;
	}
	/**
	* The widget appeared on screen (it was hidden): its next background request may go out at once. True when a held
	* request goes out now, as this appearance's background request (the glue sends it; it stays in flight).
	*/
	show(now) {
		this.lastBackground = null;
		if (!this.held) return false;
		this.held = false;
		this.lastBackground = now;
		return true;
	}
};
/**
* Haptics need a visible widget and room in the bucket (5 calls, refilled at 10 per second), and a touch: while a
* finger is down on the widget and for 5 s after it is lifted they are free (under the rate limit); outside that, the
* first call opens a series whose first second passes, then nothing until the next touch, or 10 s after the series
* began when there was none (docs/sdk-v1.md §2.6; a widget cannot buzz the phone from a timer). `press` / `release`
* are the host's trusted presses (the renderer's claim at a primary pointerdown and its release), never the widget's
* events. `play` delivers; `drop` drops silently; `report` drops and reports `haptic-limit` (at most once per second).
*/
var HapticGate = class {
	constructor() {
		_defineProperty(this, "tokens", 5);
		_defineProperty(this, "last", null);
		_defineProperty(this, "reported", null);
		_defineProperty(
			this,
			/** A press is on since then. */
			"down",
			null
		);
		_defineProperty(
			this,
			/** The last press ended then. */
			"lifted",
			null
		);
		_defineProperty(
			this,
			/** The last series (haptics outside a touch) began then. */
			"series",
			null
		);
	}
	/** A finger or a mouse button went down on the widget (trusted input only). */
	press(now) {
		this.down = now;
	}
	/** The press ended: the finger was lifted or the press was cancelled. */
	release(now) {
		this.down = null;
		this.lifted = now;
	}
	decide(now, visible) {
		if (this.last !== null) this.tokens = Math.min(5, this.tokens + Math.max(0, now - this.last) * 10 / 1e3);
		this.last = now;
		if (this.down !== null && now - this.down > 3e4) this.release(this.down + HAPTIC_PRESS_MAX_MS);
		const touching = this.down !== null || this.lifted !== null && now - this.lifted <= 5e3;
		let allowed = visible;
		if (allowed && !touching && !(this.series !== null && now - this.series < 1e3)) {
			const touchedSince = this.lifted !== null && (this.series === null || this.lifted > this.series);
			if (this.series === null || touchedSince || now - this.series >= 1e4) this.series = now;
			else allowed = false;
		}
		if (allowed && this.tokens >= 1) {
			this.tokens -= 1;
			return "play";
		}
		if (this.reported !== null && now - this.reported < 1e3) return "drop";
		this.reported = now;
		return "report";
	}
};
/** The theme keys of `params` whose values are `#rrggbb` (lowercased); everything else is dropped. */
function checkThemeParams(params) {
	const out = {};
	if (typeof params !== "object" || params === null || Array.isArray(params)) return out;
	for (const key of THEME_KEYS) {
		const v = params[key];
		if (typeof v === "string" && /^#[0-9a-fA-F]{6}$/.test(v)) out[key] = v.toLowerCase();
	}
	return out;
}
/** A BCP 47 tag of at most 35 characters (`ru`, `en-US`, `pt-BR`, `zh-Hant-TW`), or null. */
function checkLocale(locale) {
	if (typeof locale !== "string" || locale.length === 0 || locale.length > 35) return null;
	return /^[A-Za-z]{2,8}(-[A-Za-z0-9]{1,8})*$/.test(locale) ? locale : null;
}
/** UTF-8 bytes of an area's keys and values. */
function storageBytes(area) {
	let n = 0;
	for (const k of Object.keys(area)) n += utf8Length(k) + utf8Length(area[k]);
	return n;
}
/** An object of strings within the quota, or null. */
function checkStorageArea(area) {
	if (typeof area !== "object" || area === null || Array.isArray(area)) return null;
	const out = {};
	for (const k of Object.keys(area)) {
		const v = area[k];
		if (typeof v !== "string") return null;
		Object.defineProperty(out, k, {
			value: v,
			enumerable: true,
			writable: true,
			configurable: true
		});
	}
	return storageBytes(out) <= 4096 ? out : null;
}
/** A commit (or a preload) of `local` and/or `session`, each checked whole; null when anything is wrong (`storage-rejected`). */
function checkStorageCommit(commit) {
	if (typeof commit !== "object" || commit === null || Array.isArray(commit)) return null;
	const out = {};
	for (const k of Object.keys(commit)) {
		if (k !== "local" && k !== "session") return null;
		const area = checkStorageArea(commit[k]);
		if (area === null) return null;
		out[k] = area;
	}
	return out;
}
/** What a key the client did not pass falls back to. Clients pass every key (docs/sdk-v1.md §5.1). */
var DEFAULT_THEME_PARAMS = {
	light: {
		bg_color: "#ffffff",
		text_color: "#000000",
		hint_color: "#707579",
		link_color: "#3390ec",
		button_color: "#3390ec",
		button_text_color: "#ffffff",
		secondary_bg_color: "#f4f4f5",
		accent_text_color: "#3390ec",
		subtitle_text_color: "#707579",
		destructive_text_color: "#e53935",
		section_bg_color: "#ffffff",
		section_header_text_color: "#3390ec",
		section_separator_color: "#e7e7e7",
		header_bg_color: "#ffffff",
		bottom_bar_bg_color: "#ffffff"
	},
	dark: {
		bg_color: "#212121",
		text_color: "#ffffff",
		hint_color: "#aaaaaa",
		link_color: "#8774e1",
		button_color: "#8774e1",
		button_text_color: "#ffffff",
		secondary_bg_color: "#181818",
		accent_text_color: "#8774e1",
		subtitle_text_color: "#aaaaaa",
		destructive_text_color: "#ff595a",
		section_bg_color: "#212121",
		section_header_text_color: "#8774e1",
		section_separator_color: "#3d3d3d",
		header_bg_color: "#212121",
		bottom_bar_bg_color: "#212121"
	}
};
function completeThemeParams(params, scheme) {
	return {
		...DEFAULT_THEME_PARAMS[scheme],
		...checkThemeParams(params)
	};
}
/** The reference text tokens: what a client on defaults gets, and what every reference picture is drawn with. */
var DEFAULT_TEXT_TOKENS = {
	fontSize: "15px",
	lineHeight: "1.35",
	padding: "8px 12px"
};
var LENGTH = /^(0|[0-9]{1,4}(\.[0-9]{1,3})?(px|em|rem))$/;
var COLOR = /^#[0-9a-fA-F]{6}$/;
var GENERIC = /* @__PURE__ */ new Set([
	"system-ui",
	"sans-serif",
	"serif",
	"monospace",
	"ui-sans-serif",
	"ui-serif",
	"ui-monospace",
	"ui-rounded"
]);
var FONT = /^(?:(normal|italic) )?(?:(normal|bold|[1-9]00) )?[0-9]{1,3}(?:\.[0-9]{1,2})?(?:px|em|rem)(?:\/[0-9]{1,3}(?:\.[0-9]{1,2})?(?:px|em|rem)?)? ([a-z-]+(?:, ?[a-z-]+)*)$/;
function opacity(v) {
	const s = typeof v === "number" ? String(v) : typeof v === "string" ? v : "";
	return /^(0(\.[0-9]{1,3})?|1(\.0{1,3})?|\.[0-9]{1,3})$/.test(s) ? s : null;
}
var padding = (v) => typeof v === "string" && /^\S+( \S+){0,3}$/.test(v) && v.split(" ").every((p) => LENGTH.test(p)) ? v : null;
/** A number in [min, max] with at most `decimals` decimals, as a number or its plain decimal string (+ `unit`); shortest form. */
function bounded(v, min, max, decimals, unit) {
	let n;
	if (typeof v === "number") n = v;
	else if (typeof v === "string" && new RegExp(`^[0-9]{1,2}(\\.[0-9]{1,${decimals}})?${unit}$`).test(v)) n = parseFloat(v);
	else return null;
	if (!Number.isFinite(n) || n < min || n > max) return null;
	const f = 10 ** decimals;
	return String(Math.round(n * f) / f) + unit;
}
var BUTTON_VARS = [
	[
		"bg",
		"--tg-button-bg",
		(v) => typeof v === "string" && COLOR.test(v) ? v.toLowerCase() : null
	],
	[
		"text",
		"--tg-button-text",
		(v) => typeof v === "string" && COLOR.test(v) ? v.toLowerCase() : null
	],
	[
		"radius",
		"--tg-button-radius",
		(v) => typeof v === "string" && LENGTH.test(v) ? v : null
	],
	[
		"font",
		"--tg-button-font",
		(v) => {
			const m = typeof v === "string" ? FONT.exec(v) : null;
			return m && m[3].split(",").every((f) => GENERIC.has(f.trim())) ? v : null;
		}
	],
	[
		"padding",
		"--tg-button-padding",
		padding
	],
	[
		"height",
		"--tg-button-height",
		(v) => typeof v === "string" && LENGTH.test(v) ? v : null
	],
	[
		"pressedOpacity",
		"--tg-button-pressed-opacity",
		opacity
	],
	[
		"disabledOpacity",
		"--tg-button-disabled-opacity",
		opacity
	]
];
/** Text tokens: font size 8–64 px (a number or `"15px"`), line height 1–3 (unitless), padding as the button's. */
var TEXT_VARS = [
	[
		"fontSize",
		"--tg-text-font-size",
		(v) => bounded(v, 8, 64, 2, "px")
	],
	[
		"lineHeight",
		"--tg-text-line-height",
		(v) => bounded(v, 1, 3, 3, "")
	],
	[
		"padding",
		"--tg-text-padding",
		padding
	]
];
var CONTENT_SAFE_AREA_FIELDS = [
	"top",
	"right",
	"bottom",
	"left",
	"cornerLeft",
	"cornerRight"
];
/** No chrome over the widget: what every host has until the client passes its own. */
var NO_CONTENT_SAFE_AREA = Object.freeze({
	top: 0,
	right: 0,
	bottom: 0,
	left: 0,
	cornerLeft: 0,
	cornerRight: 0
});
/** Every field a finite number of logical px in its range (insets 0–64, corners 0–200), at most two decimals; anything else is 0. */
function checkContentSafeArea(area) {
	const a = typeof area === "object" && area !== null ? area : {};
	const out = { ...NO_CONTENT_SAFE_AREA };
	for (const field of CONTENT_SAFE_AREA_FIELDS) {
		const v = a[field];
		const max = field.startsWith("corner") ? 200 : 64;
		if (typeof v === "number" && Number.isFinite(v) && v >= 0 && v <= max) out[field] = Math.round(v * 100) / 100;
	}
	return out;
}
/** The root variables of the content safe area, by field. */
var SAFE_AREA_VARS = [
	["top", "--tg-content-safe-area-inset-top"],
	["right", "--tg-content-safe-area-inset-right"],
	["bottom", "--tg-content-safe-area-inset-bottom"],
	["left", "--tg-content-safe-area-inset-left"],
	["cornerLeft", "--tg-content-safe-area-corner-left"],
	["cornerRight", "--tg-content-safe-area-corner-right"]
];
/**
* The `env()` names the validator rewrites to the root variable the renderer sets (docs/sdk-v1.md §2.17):
* `env(safe-area-inset-bottom, 8px)` → `var(--tg-content-safe-area-inset-bottom, 8px)`. Exact names, as in CSS.
*/
var SAFE_AREA_ENV_VARIABLES = Object.freeze({
	"safe-area-inset-top": "--tg-content-safe-area-inset-top",
	"safe-area-inset-right": "--tg-content-safe-area-inset-right",
	"safe-area-inset-bottom": "--tg-content-safe-area-inset-bottom",
	"safe-area-inset-left": "--tg-content-safe-area-inset-left"
});
/** The CSS variables of a content safe area (checked; every one always set, `0px` for none). */
function contentSafeAreaVariables(area) {
	const a = checkContentSafeArea(area);
	const vars = {};
	for (const [field, name] of SAFE_AREA_VARS) vars[name] = a[field] + "px";
	return vars;
}
/** Every variable name the renderer may set on the widget's root: the theme's and the content safe area's. */
var THEME_VARIABLES = [
	...THEME_KEYS.map((k) => "--tg-theme-" + k.replace(/_/g, "-")),
	"--tg-color-scheme",
	...BUTTON_VARS.map(([, name]) => name),
	...TEXT_VARS.map(([, name]) => name),
	...SAFE_AREA_VARS.map(([, name]) => name)
];
/**
* The CSS variables of a theme (docs/sdk-v1.md §2.3, §2.4, §3.4): names from the fixed list, values that match their
* grammar. The palette and the text tokens are always complete (the scheme's defaults, `DEFAULT_TEXT_TOKENS`); a
* button token is set only when the client passed it (the template's default stands for it).
*/
function themeVariables(theme) {
	const t = typeof theme === "object" && theme !== null ? theme : {};
	const scheme = t.colorScheme === "dark" ? "dark" : "light";
	const params = completeThemeParams(t.params, scheme);
	const vars = {};
	for (const k of THEME_KEYS) vars["--tg-theme-" + k.replace(/_/g, "-")] = params[k];
	vars["--tg-color-scheme"] = scheme;
	const button = typeof t.button === "object" && t.button !== null ? t.button : {};
	for (const [field, name, check] of BUTTON_VARS) {
		const v = check(button[field]);
		if (v !== null) vars[name] = v;
	}
	const text = typeof t.text === "object" && t.text !== null ? t.text : {};
	for (const [field, name, check] of TEXT_VARS) vars[name] = check(text[field]) ?? DEFAULT_TEXT_TOKENS[field];
	return vars;
}
/** A host's `theme` option: a plain scheme (the API before v1) or a WidgetTheme, with its palette checked. */
function toWidgetTheme(theme) {
	if (theme === "light" || theme === "dark") return {
		colorScheme: theme,
		params: {}
	};
	const t = typeof theme === "object" && theme !== null ? theme : {};
	const button = typeof t.button === "object" && t.button !== null ? t.button : void 0;
	const text = typeof t.text === "object" && t.text !== null ? t.text : void 0;
	return {
		colorScheme: t.colorScheme === "dark" ? "dark" : "light",
		params: checkThemeParams(t.params),
		...button ? { button } : {},
		...text ? { text } : {}
	};
}
//#endregion
export { viewerUser as C, toWidgetTheme as S, checkWidgetData as _, SAFE_AREA_ENV_VARIABLES as a, requestRefusal as b, VIEWER_FIELD_RULES as c, checkChatType as d, checkContentSafeArea as f, checkViewer as g, checkStorageCommit as h, RequestGate as i, allowedInPreview as l, checkRequestAnswer as m, HapticGate as n, STORAGE_QUOTA_BYTES as o, checkLocale as p, PRIVILEGED_METHODS as r, THEME_VARIABLES as s, DEFAULT_LOCALE as t, checkBridgeCall as u, contentSafeAreaVariables as v, walletFailure as w, themeVariables as x, requestFailure as y };
