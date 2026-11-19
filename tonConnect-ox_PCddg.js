//# allFunctionsCalledOnLoad
import { i as __toESM, n as __exportAll } from "./rolldown-runtime-CwcJO0Gh.js";
import { t as App } from "./app-BuFf8z8C.js";
import { t as pause } from "./pause-BSJh-z46.js";
import { M as onCleanup, p as createComponent, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { t as bytesToHex } from "./bytesToHex-BQHuRHPP.js";
import { c as insert, g as template, o as className, p as setStyleProperty, u as memo } from "./web-BPyQozky.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
import { o as usePopupContext } from "./indexTsx-v9mB9bAq.js";
import { t as bytesFromHex } from "./bytesFromHex-DEB8Alee.js";
import { rt as parseTonAddress } from "./getChatMigratedTo-ChhMNXuu.js";
import { t as require_BigInteger } from "./BigInteger-0a0WsWCs.js";
import { r as toastNew } from "./toast-B6VD5M7R.js";
import { n as bytesToBase64 } from "./bytesCmp-BHLrucCP.js";
import { t as base64ToBytes } from "./base64ToBytes-BKoIm5Yd.js";
import { n as WalletNftImage } from "./collectibles-BaTGzfgT.js";
import { i as showWalletAlert } from "./alerts-DVBlV8XN.js";
import { i as walletError, n as WalletSession, o as withTabsLock, r as isSendOutcomeUnknown } from "./walletSession-BmKSk61G.js";
import { a as signDataDigest, i as sealToPeer, n as openChallenge, o as signDigest, r as openFromPeer, t as deriveSessionKeyPair } from "./tonConnectCrypto-C-ijOt-x.js";
var tonConnect_module_default = {
	popup: "_popup_1pwqg_6",
	body: "_body_1pwqg_10",
	icon: "_icon_1pwqg_14",
	iconImage: "_iconImage_1pwqg_21",
	iconLetter: "_iconLetter_1pwqg_27",
	iconLoading: "_iconLoading_1pwqg_40",
	domain: "_domain_1pwqg_44",
	text: "_text_1pwqg_50",
	card: "_card_1pwqg_59",
	caption: "_caption_1pwqg_64",
	error: "_error_1pwqg_72",
	footer: "_footer_1pwqg_80",
	amountHeader: "_amountHeader_1pwqg_91",
	amount: "_amount_1pwqg_91",
	amountFraction: "_amountFraction_1pwqg_108",
	amountSuffix: "_amountSuffix_1pwqg_112",
	recipient: "_recipient_1pwqg_116",
	section: "_section_1pwqg_124",
	actionAmount: "_actionAmount_1pwqg_128",
	actionIncoming: "_actionIncoming_1pwqg_133",
	actionFailed: "_actionFailed_1pwqg_137",
	fee: "_fee_1pwqg_141",
	warning: "_warning_1pwqg_148",
	dataTitle: "_dataTitle_1pwqg_152",
	data: "_data_1pwqg_152",
	blind: "_blind_1pwqg_171",
	blindTitle: "_blindTitle_1pwqg_180",
	rowIcon: "_rowIcon_1pwqg_189",
	empty: "_empty_1pwqg_193"
};
//#endregion
//#region src/components/wallet/tonConnect/parts.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div aria-hidden=true>`);
var _tmpl$2 = /*#__PURE__*/ template(`<div>`);
/** an app's icon from its manifest (proxied by Telegram, never fetched from the app), or the first letter of its name */
function TonConnectAppIcon(props) {
	const size = () => props.size ?? 88;
	const letter = () => Array.from(props.name?.trim() || "")[0];
	return (() => {
		var _el$ = _tmpl$();
		insert(_el$, createComponent(WalletNftImage, {
			get document() {
				return memo(() => !!props.loading)() ? void 0 : props.icon;
			},
			get size() {
				return size();
			},
			get ["class"]() {
				return tonConnect_module_default.iconImage;
			},
			get placeholder() {
				return (() => {
					var _el$2 = _tmpl$2();
					insert(_el$2, (() => {
						var _c$ = memo(() => !!props.loading);
						return () => _c$() ? "" : letter();
					})());
					createRenderEffect(() => className(_el$2, classNames(tonConnect_module_default.iconLetter, (props.loading || !letter()) && tonConnect_module_default.iconLoading)));
					return _el$2;
				})();
			}
		}));
		createRenderEffect((_p$) => {
			var _v$ = classNames(tonConnect_module_default.icon, props.class), _v$2 = size() + "px";
			_v$ !== _p$.e && className(_el$, _p$.e = _v$);
			_v$2 !== _p$.t && setStyleProperty(_el$, "--tonconnect-icon-size", _p$.t = _v$2);
			return _p$;
		}, {
			e: void 0,
			t: void 0
		});
		return _el$;
	})();
}
var FAILURE_TEXTS = {
	unavailable: "WalletTonConnectRequestUnavailable",
	invalidLink: "Wallet.Connect.InvalidLink",
	invalidManifest: "Wallet.Connect.ManifestInvalid",
	wrongNetwork: "Wallet.Connect.WrongNetwork",
	keyMismatch: "Wallet.Connect.KeyMismatch",
	keyChanging: "Wallet.Connect.KeyChanging",
	noKey: "Wallet.Connect.Restore",
	expired: "Wallet.Request.Expired",
	handledElsewhere: "Wallet.Connect.HandledElsewhere",
	outcomeUnknown: "Wallet.Connect.OutcomeUnknown",
	bridgeUnavailable: "Wallet.Connect.Undelivered",
	failed: "Wallet.Request.NotSent"
};
function getTonConnectFailureText(failure) {
	return FAILURE_TEXTS[failure] || "Wallet.Connect.Failed";
}
/**
* Says what became of a request: what may have gone out gets an alert that waits for an answer (iOS outcomeUnknown),
* the rest a toast
*/
function showTonConnectFailure(failure) {
	if (failure === "outcomeUnknown") {
		showWalletAlert({
			title: "Wallet.Transfer.PendingTitle",
			text: "Wallet.Connect.OutcomeUnknown"
		});
		return;
	}
	toastNew({ langPackKey: getTonConnectFailureText(failure) });
}
/** a block of text that keeps its line breaks, under a popup's header */
function TonConnectText(props) {
	return (() => {
		var _el$3 = _tmpl$2();
		insert(_el$3, () => props.children);
		createRenderEffect(() => className(_el$3, classNames(tonConnect_module_default.text, props.class)));
		return _el$3;
	})();
}
/** hands a popup's own hide out, so the flow can close the sheet when what it shows is gone */
function PopupCloser(props) {
	const context = usePopupContext();
	props.register(() => context.hide());
	onCleanup(() => props.register(void 0));
	return [];
}
//#endregion
//#region src/lib/wallet/tonConnectWire.ts
var import_BigInteger = /* @__PURE__ */ __toESM(require_BigInteger());
/** what this wallet signs: a `cell` signData needs a TL-B encoder it does not have */
var TON_CONNECT_SIGN_DATA_TYPES = ["text", "binary"];
/** a link longer than this is no link a dApp makes */
var MAX_LINK_LENGTH = 262144;
var MAX_TRACE_ID_LENGTH = 100;
var MAX_REQUEST_ID_LENGTH = 100;
var MAX_PACKET_LENGTH = 1048576;
var START_PARAM_PREFIX = "tonconnect-";
var LINK_FIELDS = [
	"id",
	"v",
	"r",
	"ret",
	"trace_id"
];
var TonConnectErrorCode = /* @__PURE__ */ function(TonConnectErrorCode) {
	TonConnectErrorCode[TonConnectErrorCode["UNKNOWN"] = 0] = "UNKNOWN";
	TonConnectErrorCode[TonConnectErrorCode["BAD_REQUEST"] = 1] = "BAD_REQUEST";
	TonConnectErrorCode[TonConnectErrorCode["MANIFEST_NOT_FOUND"] = 2] = "MANIFEST_NOT_FOUND";
	TonConnectErrorCode[TonConnectErrorCode["MANIFEST_CONTENT"] = 3] = "MANIFEST_CONTENT";
	TonConnectErrorCode[TonConnectErrorCode["UNKNOWN_APP"] = 100] = "UNKNOWN_APP";
	TonConnectErrorCode[TonConnectErrorCode["USER_DECLINED"] = 300] = "USER_DECLINED";
	TonConnectErrorCode[TonConnectErrorCode["METHOD_NOT_SUPPORTED"] = 400] = "METHOD_NOT_SUPPORTED";
	return TonConnectErrorCode;
}({});
var ERROR_MESSAGES = {
	[0]: "Unknown error",
	[1]: "Bad request",
	[2]: "Manifest not found",
	[3]: "Invalid manifest",
	[100]: "Unknown app",
	[300]: "User declined the request",
	[400]: "Method not supported"
};
function tonConnectErrorMessage(code) {
	return ERROR_MESSAGES[code] ?? ERROR_MESSAGES[0];
}
var TonConnectWireError = class extends Error {
	constructor(code, message) {
		super(message || tonConnectErrorMessage(code));
		this.code = code;
	}
};
function badRequest(message) {
	throw new TonConnectWireError(1, message);
}
function isObject(value) {
	return !!value && typeof value === "object" && !Array.isArray(value);
}
function optionalString(object, key) {
	const value = object[key];
	if (value === void 0 || value === null) return;
	if (typeof value !== "string") badRequest(key + " must be a string");
	return value;
}
function urlHost(url) {
	return url.hostname.toLowerCase();
}
/**
* `startapp=tonconnect-…`: the connect query squeezed into a Mini App start parameter, the way the TON Connect SDK
* writes it — "--" for "%", "__" for "=", "-" for "&", undone in that order
*/
function decodeTonConnectStartParam(startapp) {
	if (!startapp?.startsWith(START_PARAM_PREFIX)) return;
	return startapp.slice(11).replace(/--/g, "%").replace(/__/g, "=").replace(/-/g, "&");
}
/**
* Whether a link is a TON Connect one: `tc://`, `tg://ton-connect`, the wallet's own links with the connect fields
* (`t.me/sendgrams?id=…`, `tg://sendgrams?…`) or a `tonconnect-` start parameter (also addressed to the wallet by
* name, `tg://resolve?domain=sendgrams&startapp=…`). A malformed one is still one: it must not fall through to a
* payment link.
*/
function isTonConnectUrl(value) {
	let url;
	try {
		url = new URL(value);
	} catch (err) {
		return false;
	}
	const scheme = url.protocol.slice(0, -1).toLowerCase();
	const host = urlHost(url);
	const telegramScheme = scheme === "tg" || scheme === "telegram";
	if (scheme === "tc" || telegramScheme && host === "ton-connect") return true;
	const params = url.searchParams;
	const carriesStart = params.getAll("startapp").some((value) => value.startsWith(START_PARAM_PREFIX));
	if (scheme === "https" && host === "t.me" && /^\/sendgrams\/?$/i.test(url.pathname) || telegramScheme && host === "sendgrams") return carriesStart || [
		"id",
		"v",
		"r"
	].some((name) => params.has(name));
	return telegramScheme && host === "resolve" && params.get("domain")?.toLowerCase() === "sendgrams" && carriesStart;
}
/** `+` is a space in a query; URLSearchParams agrees */
function parseQuery(query) {
	const params = new URLSearchParams(query);
	const fields = {};
	for (const [name, value] of params) {
		if (!LINK_FIELDS.includes(name)) continue;
		if (fields[name] !== void 0) return;
		fields[name] = value;
	}
	return fields;
}
/**
* Reads a TON Connect link; nothing when it is malformed. The rules are iOS's (`TonConnectLink`): a 64-hex `id`,
* `v` 2 when given and required with `r`, a `trace_id` of at most 100 characters, and a `tonconnect-` start
* parameter that is the only connect field of its link.
*/
function parseTonConnectUrl(value) {
	if (!value || value.length > MAX_LINK_LENGTH || !isTonConnectUrl(value)) return;
	let url;
	try {
		url = new URL(value);
	} catch (err) {
		return;
	}
	if (url.username || url.password || url.hash) return;
	let query = url.search.slice(1);
	const starts = url.searchParams.getAll("startapp");
	if (starts.some((start) => start.startsWith(START_PARAM_PREFIX))) {
		if (starts.length !== 1 || [
			"id",
			"v",
			"r"
		].some((name) => url.searchParams.has(name))) return;
		query = decodeTonConnectStartParam(starts[0]);
	}
	return parseTonConnectQuery(query);
}
function parseTonConnectQuery(query) {
	const fields = parseQuery(query);
	if (!fields) return;
	const id = fields.id;
	if (!id || !/^[0-9a-fA-F]{64}$/.test(id)) return;
	if (fields.v !== void 0 && fields.v !== "2") return;
	const traceId = fields.trace_id;
	if (traceId !== void 0 && (traceId.length > MAX_TRACE_ID_LENGTH || !isPrintableAscii(traceId))) return;
	const link = {
		clientId: id.toLowerCase(),
		traceId: traceId || void 0,
		ret: fields.ret
	};
	if (fields.r !== void 0) {
		if (!fields.r || fields.v !== "2") return;
		try {
			link.request = parseConnectRequest(fields.r);
		} catch (err) {
			return;
		}
	}
	return link;
}
function isPrintableAscii(value) {
	return /^[\x20-\x7e]*$/.test(value);
}
/** an https URL with a host and nothing a manifest URL has no business carrying */
function isManifestUrl(value) {
	try {
		const url = new URL(value);
		return url.protocol === "https:" && !!url.hostname && !url.username && !url.password && !url.hash;
	} catch (err) {
		return false;
	}
}
/** a network id is a canonical decimal int32 */
function isNetworkId(value) {
	const number = Number(value);
	return /^-?\d+$/.test(value) && String(number) === value && number >= -2147483648 && number <= 2147483647;
}
/**
* The `r` of a connect link: `{manifestUrl, items: [{name: 'ton_addr', network?}, {name: 'ton_proof', payload}]}`.
* `ton_addr` is required, every item once; an item this wallet does not know refuses the link (iOS).
*/
function parseConnectRequest(json) {
	const object = parseJsonObject(json);
	if (Object.keys(object).some((key) => key !== "manifestUrl" && key !== "items")) badRequest("unknown connect request field");
	const manifestUrl = object.manifestUrl;
	const items = object.items;
	if (typeof manifestUrl !== "string" || !isManifestUrl(manifestUrl) || !Array.isArray(items) || !items.length) badRequest("connect request");
	const request = {
		manifestUrl,
		items: []
	};
	for (const item of items) {
		const name = isObject(item) ? item.name : void 0;
		if (typeof name !== "string" || !name || request.items.includes(name)) badRequest("connect item");
		request.items.push(name);
		const keys = Object.keys(item);
		if (name === "ton_addr") {
			if (keys.some((key) => key !== "name" && key !== "network")) badRequest("ton_addr");
			const network = optionalString(item, "network");
			if (network !== void 0 && !isNetworkId(network)) badRequest("network");
			request.network = network;
		} else if (name === "ton_proof") {
			if (keys.some((key) => key !== "name" && key !== "payload")) badRequest("ton_proof");
			const payload = item.payload;
			if (typeof payload !== "string") badRequest("ton_proof payload");
			request.proofPayload = payload;
		} else badRequest("unknown connect item");
	}
	if (!request.items.includes("ton_addr")) badRequest("ton_addr is required");
	return request;
}
/** JSON that is an object, with no key given twice (a parser would quietly keep one of them) */
function parseJsonObject(json) {
	if (!json || json.length > MAX_PACKET_LENGTH || hasDuplicateKeys(json)) badRequest("JSON");
	let value;
	try {
		value = JSON.parse(json);
	} catch (err) {
		badRequest("JSON");
	}
	if (!isObject(value)) badRequest("JSON object expected");
	return value;
}
/** iOS's TonConnectJSONStructure: duplicate keys, escaped spellings included, refuse the packet */
function hasDuplicateKeys(json) {
	const stack = [];
	let expectKey = false;
	for (let i = 0; i < json.length; ++i) {
		const char = json[i];
		if (char === "\"") {
			let end = i + 1;
			for (; end < json.length && json[end] !== "\""; ++end) if (json[end] === "\\") ++end;
			if (expectKey && stack.length) {
				let key;
				try {
					key = JSON.parse(json.slice(i, end + 1));
				} catch (err) {
					return true;
				}
				const keys = stack[stack.length - 1];
				if (keys.has(key)) return true;
				keys.add(key);
			}
			expectKey = false;
			i = end;
		} else if (char === "{") {
			stack.push(/* @__PURE__ */ new Set());
			expectKey = true;
		} else if (char === "[") {
			stack.push(void 0);
			expectKey = false;
		} else if (char === "}" || char === "]") {
			stack.pop();
			expectKey = false;
		} else if (char === ",") expectKey = !!stack[stack.length - 1];
	}
	return false;
}
/** a manifest's host, lowercase, without the trailing dots of an absolute name */
function getTonConnectHost(url) {
	try {
		return new URL(url).hostname.toLowerCase().replace(/\.+$/, "");
	} catch (err) {
		return "";
	}
}
/**
* The domain a signature binds: the manifest's host, with its port when it is not the scheme's own (iOS
* TonConnectManifestInfo). URL drops a default port by itself.
*/
function getTonConnectDomain(url) {
	const host = getTonConnectHost(url);
	if (!host) return "";
	try {
		const port = new URL(url).port;
		return port ? host + ":" + port : host;
	} catch (err) {
		return "";
	}
}
/**
* Whether a dApp may have a `ton_proof` for `domain` (tdesktop TonConnectProofDomainAllowed). A proof for
* telegram.org, or for the domain of the server's wallet-ownership challenge, is byte for byte the proof the server
* takes as the wallet's own (wallet.replaceWallet, wallet.enableBackup): only the domain tells the two apart.
*/
function isTonConnectProofDomainAllowed(domain, ownershipDomain) {
	const normalize = (value) => (value || "").toLowerCase().replace(/\.+$/, "");
	const normalized = normalize(domain);
	const ownership = normalize(ownershipDomain);
	return !!normalized && normalized !== "telegram.org" && (!ownership || normalized !== ownership);
}
function isTonConnectRequestId(id) {
	return typeof id === "string" && id.length >= 1 && id.length <= MAX_REQUEST_ID_LENGTH && isPrintableAscii(id);
}
function sameAccount(a, b) {
	return !!a && !!b && a.workchain === b.workchain && a.hash.length === b.hash.length && a.hash.every((byte, i) => byte === b.hash[i]);
}
/** `network` and `from` must name this wallet, when given */
function checkSigningContext(object, context) {
	const network = optionalString(object, "network");
	if (network !== void 0 && network !== "-239") badRequest("TON Connect request network differs from the active network");
	const from = optionalString(object, "from");
	if (from !== void 0 && !sameAccount(parseTonAddress(from), parseTonAddress(context.address))) badRequest("TON Connect request signer differs from the connected account");
	return {
		network,
		from
	};
}
function isBase64(value) {
	return /^[A-Za-z0-9+/_-]+={0,2}$/.test(value);
}
function decodeBase64(value) {
	if (!isBase64(value) && value !== "") badRequest("base64");
	try {
		return base64ToBytes(value.replace(/-/g, "+").replace(/_/g, "/"));
	} catch (err) {
		badRequest("base64");
	}
}
function canonicalAmount(value) {
	if (typeof value !== "string" || !/^\d{1,40}$/.test(value)) badRequest("amount");
	return value.replace(/^0+(?=\d)/, "");
}
function parseMessage(value) {
	if (!isObject(value)) badRequest("message");
	const address = value.address;
	const parts = typeof address === "string" && !address.includes(":") ? parseTonAddress(address) : void 0;
	if (!parts || parts.testnet) badRequest("Expected a friendly destination address");
	const extra = value.extra_currency;
	if (extra !== void 0 && extra !== null && (!isObject(extra) || Object.keys(extra).length)) throw new TonConnectWireError(400, "Extra currencies are not supported");
	const payload = optionalString(value, "payload");
	const stateInit = optionalString(value, "stateInit");
	for (const boc of [payload, stateInit]) if (boc !== void 0 && (!boc || !isBase64(boc))) badRequest("Invalid transaction cell");
	return {
		address,
		amount: canonicalAmount(value.amount),
		payload,
		stateInit,
		bounce: parts.bounceable
	};
}
function parseTransaction(object, context) {
	checkSigningContext(object, context);
	if (object.validUntil !== void 0) badRequest("validUntil");
	const validUntil = object.valid_until;
	if (validUntil !== void 0 && validUntil !== null) {
		if (typeof validUntil !== "number" || !Number.isInteger(validUntil) || validUntil < 0 || validUntil > 4294967295) badRequest("valid_until");
		if (context.now > validUntil) badRequest("TON Connect request has expired");
	}
	if (object.items !== void 0) throw new TonConnectWireError(400, "Structured transactions are not supported");
	const list = object.messages;
	if (!Array.isArray(list) || !list.length) badRequest("messages");
	if (list.length > 255) throw new TonConnectWireError(400, "Outgoing message batch exceeds wallet capability");
	const messages = list.map(parseMessage);
	const intent = {
		expiration: typeof validUntil === "number" ? {
			kind: "exact",
			unixTimestamp: validUntil
		} : { kind: "engineDefault" },
		messages: messages.map((message) => ({
			destination: message.address,
			amount: {
				kind: "exact",
				nanograms: message.amount
			},
			body: message.payload ? {
				kind: "rawPayload",
				boc: message.payload
			} : { kind: "empty" },
			bounce: message.bounce,
			stateInit: message.stateInit ?? null
		}))
	};
	return {
		messages,
		validUntil: typeof validUntil === "number" ? validUntil : void 0,
		intent
	};
}
function parseSignData(object, context) {
	const { network, from } = checkSigningContext(object, context);
	const type = object.type;
	if (type === "text") {
		const text = object.text;
		if (typeof text !== "string") badRequest("text");
		return {
			json: {
				type,
				text,
				network,
				from
			},
			payload: {
				type,
				text
			}
		};
	}
	if (type === "binary") {
		const bytes = object.bytes;
		if (typeof bytes !== "string") badRequest("bytes");
		return {
			json: {
				type,
				bytes,
				network,
				from
			},
			payload: {
				type,
				bytes: decodeBase64(bytes)
			}
		};
	}
	if (type === "cell") throw new TonConnectWireError(400, "Cell data is not supported");
	badRequest("Unknown signing data type");
}
/**
* A dApp's request as it came out of its box: `{method, params: [json], id}`. One this wallet cannot do, or that
* names another network or account, comes back as `invalid`, to be answered with its error; one with no usable id
* cannot be answered at all and throws.
*/
function parseAppRequest(plaintext, context) {
	const object = parseJsonObject(plaintext);
	const id = object.id;
	if (!isTonConnectRequestId(id)) badRequest("Request ID must contain 1-100 printable ASCII characters");
	const method = typeof object.method === "string" ? object.method : "";
	const params = object.params;
	try {
		const param = () => {
			if (!Array.isArray(params) || params.length !== 1 || typeof params[0] !== "string") badRequest("Expected one JSON parameter");
			return parseJsonObject(params[0]);
		};
		switch (method) {
			case "sendTransaction": return {
				id,
				method,
				kind: "sendTransaction",
				...parseTransaction(param(), context)
			};
			case "signData": return {
				id,
				method,
				kind: "signData",
				...parseSignData(param(), context)
			};
			case "disconnect": return {
				id,
				method,
				kind: "disconnect"
			};
			default: throw new TonConnectWireError(400, "Method is not supported");
		}
	} catch (err) {
		if (!(err instanceof TonConnectWireError)) throw err;
		return {
			id,
			method,
			kind: "invalid",
			code: err.code,
			message: err.message
		};
	}
}
/** the `id` of an event is a number: the server's 64-bit one goes in as its digits */
function eventJson(event, eventId, payload) {
	const id = String(eventId);
	if (!/^\d{1,20}$/.test(id)) throw new Error("TONCONNECT_EVENT_ID_INVALID");
	return "{\"event\":" + JSON.stringify(event) + ",\"id\":" + id + ",\"payload\":" + payload + "}";
}
function tonConnectFeatures() {
	return [{
		name: "SendTransaction",
		maxMessages: 255,
		extraCurrencySupported: false
	}, {
		name: "SignData",
		types: [...TON_CONNECT_SIGN_DATA_TYPES]
	}];
}
function buildConnectEvent(options) {
	const items = [{
		name: "ton_addr",
		address: options.account.address,
		network: options.account.network,
		walletStateInit: options.account.walletStateInit,
		publicKey: options.account.publicKey
	}];
	const proof = options.proof;
	if (proof) items.push({
		name: "ton_proof",
		proof: {
			timestamp: proof.timestamp,
			domain: {
				lengthBytes: new TextEncoder().encode(proof.domain).length,
				value: proof.domain
			},
			payload: proof.payload,
			signature: proof.signature
		}
	});
	return eventJson("connect", options.eventId, JSON.stringify({
		items,
		device: {
			platform: "browser",
			appName: "Telegram",
			appVersion: options.appVersion,
			maxProtocolVersion: 2,
			features: tonConnectFeatures()
		}
	}));
}
function buildConnectErrorEvent(eventId, code, message = tonConnectErrorMessage(code)) {
	return eventJson("connect_error", eventId, JSON.stringify({
		code,
		message
	}));
}
function buildDisconnectEvent(eventId) {
	return eventJson("disconnect", eventId, "{}");
}
function buildSuccessResponse(id, result) {
	return JSON.stringify({
		result,
		id
	});
}
function buildErrorResponse(id, code, message = tonConnectErrorMessage(code)) {
	return JSON.stringify({
		error: {
			code,
			message
		},
		id
	});
}
/** the answer to a signed `signData`: the payload goes back as the dApp sent it, with what the signature binds */
function buildSignDataResult(options) {
	const payload = { type: options.json.type };
	if (options.json.type === "text") payload.text = options.json.text;
	else payload.bytes = options.json.bytes;
	if (options.json.network !== void 0) payload.network = options.json.network;
	if (options.json.from !== void 0) payload.from = options.json.from;
	return {
		signature: options.signature,
		address: options.address,
		timestamp: options.timestamp,
		domain: options.domain,
		payload
	};
}
/** the raw form of an address, `workchain:hex` */
function toRawTonAddress(address) {
	const parts = parseTonAddress(address);
	if (!parts) return;
	let hex = "";
	parts.hash.forEach((byte) => hex += byte.toString(16).padStart(2, "0"));
	return parts.workchain + ":" + hex;
}
/** the sum of what the messages send, nanograms */
function sumTonConnectAmounts(messages) {
	return messages.reduce((total, message) => total.add((0, import_BigInteger.default)(message.amount)), import_BigInteger.default.zero).toString();
}
//#endregion
//#region src/lib/wallet/tonConnect.ts
var tonConnect_exports = /* @__PURE__ */ __exportAll({
	TonConnectError: () => TonConnectError,
	answerTonConnectConnect: () => answerTonConnectConnect,
	answerTonConnectRequest: () => answerTonConnectRequest,
	checkTonConnectManifest: () => checkTonConnectManifest,
	createTonConnectSession: () => createTonConnectSession,
	disconnectTonConnectSessions: () => disconnectTonConnectSessions,
	findTonConnectRequest: () => findTonConnectRequest,
	getStoredTonConnectReply: () => getStoredTonConnectReply,
	getTonConnectManifestInfo: () => getTonConnectManifestInfo,
	getTonConnectOperationId: () => getTonConnectOperationId,
	getTonConnectRequestKey: () => getTonConnectRequestKey,
	isTonConnectRequestSilent: () => isTonConnectRequestSilent,
	isTonConnectSessionActive: () => isTonConnectSessionActive,
	openTonConnectRequest: () => openTonConnectRequest,
	previewTonConnectRequest: () => previewTonConnectRequest,
	retryTonConnectReplies: () => retryTonConnectReplies,
	tonConnectFailure: () => tonConnectFailure
});
var TonConnectError = class extends Error {
	constructor(failure, cause) {
		super(failure);
		this.failure = failure;
		this.cause = cause;
		this.type = "TONCONNECT_FAILURE";
	}
};
function tonConnectFailure(err) {
	if (err instanceof TonConnectError) return err.failure;
	switch (err?.type) {
		case "TONCONNECT_REQUEST_ALREADY_CLAIMED":
		case "TONCONNECT_REQUEST_NOT_FOUND":
		case "TONCONNECT_BAD_REQUEST_ID":
		case "TONCONNECT_SESSION_NOT_FOUND":
		case "TONCONNECT_SESSION_CLOSED":
		case "TONCONNECT_SESSION_NOT_ACTIVE": return "handledElsewhere";
		case "TONCONNECT_REQUEST_EXPIRED": return "expired";
		case "TONCONNECT_DAPP_CLIENT_ID_INVALID":
		case "TONCONNECT_MANIFEST_URL_INVALID": return "invalidLink";
		case "TONCONNECT_CLIENT_ID_OCCUPIED": return "keyMismatch";
		case "WALLET_KEY_MISMATCH": return "keyMismatch";
		case "WALLET_KEY_MISSING": return "noKey";
		case "ROTATION_PENDING": return "keyChanging";
	}
}
function fail(failure) {
	throw new TonConnectError(failure);
}
var textEncoder = new TextEncoder();
var textDecoder = new TextDecoder();
function getServerTime(wallet) {
	return wallet.managers.timeManager.getServerTime();
}
function isTonConnectSessionActive(session) {
	return !!session && !session.pFlags.pending && !session.pFlags.closing && !session.pFlags.closed;
}
/** the session's key pair from the signing seed; a session another key registered is not this wallet's to answer */
async function getSessionKeys(signer, session) {
	if (!/^[0-9a-f]{64}$/i.test(session.dapp_client_id) || !session.nonce?.length) fail("unavailable");
	const peer = bytesFromHex(session.dapp_client_id.toLowerCase());
	const pair = await deriveSessionKeyPair(signer.seed, peer, session.nonce);
	const clientId = bytesToHex(pair.publicKey);
	if (session.client_id && session.client_id.toLowerCase() !== clientId) {
		pair.secretKey.fill(0);
		fail("keyMismatch");
	}
	return {
		secretKey: pair.secretKey,
		clientId,
		peer
	};
}
async function seal(keys, json) {
	return sealToPeer(keys.secretKey, keys.peer, textEncoder.encode(json));
}
/** registers `W` for the session and answers the server's challenge to it */
async function proveSessionKey(wallet, sessionId, keys) {
	const challenge = await wallet.managers.appWalletManager.tonConnectRegisterKey(sessionId, keys.clientId);
	return {
		answer: await openChallenge(keys.secretKey, challenge.challenge),
		eventId: challenge.event_id
	};
}
/** a challenge the server no longer takes: the key is registered again and the step tried once more (tdesktop) */
async function withFreshChallenge(task, retryOn = ["TONCONNECT_CHALLENGE_INVALID"]) {
	try {
		return await task();
	} catch (err) {
		if (!retryOn.includes(err?.type)) throw err;
		return task();
	}
}
/** what the connect sheet shows of a dApp: its manifest's name, falling back to its host */
function getTonConnectManifestInfo(session) {
	const manifest = session?.manifest;
	if (!manifest) return;
	const domain = getTonConnectDomain(manifest.url);
	return {
		name: manifest.name?.replace(/[\u0000-\u001f\u007f‎‏‪-‮⁦-⁩]/g, "").trim() || getTonConnectHost(manifest.url),
		domain,
		url: manifest.url,
		icon: manifest.icon
	};
}
/**
* Whether the server's manifest can stand for the link: it must be the one the link points at — the same host
* (tdesktop, Android), and a proof only for a domain that is no wallet-ownership one.
*/
function checkTonConnectManifest(session, link, ownershipDomain) {
	const info = getTonConnectManifestInfo(session);
	const host = info && getTonConnectHost(info.url);
	if (!info || !host || host !== getTonConnectHost(link.request.manifestUrl)) fail("invalidManifest");
	if (link.request.proofPayload !== void 0 && !isTonConnectProofDomainAllowed(host, ownershipDomain)) fail("invalidManifest");
	if (link.request.network !== void 0 && link.request.network !== "-239") fail("wrongNetwork");
	return info;
}
/** a pending session for a connect link; one already connected was connected elsewhere */
async function createTonConnectSession(link) {
	const session = await WalletSession.get().managers.appWalletManager.tonConnectCreateSession(link.clientId, link.request.manifestUrl);
	if (isTonConnectSessionActive(session)) fail("handledElsewhere");
	if (session.pFlags.closed || session.pFlags.closing) fail("unavailable");
	return session;
}
/**
* Approves a connection (the address, and a proof when asked for) or declines it with `connect_error`; either way
* the key is registered first, since only an event under it reaches the dApp.
*/
async function answerTonConnectConnect(options) {
	const { session, link, approve } = options;
	const wallet = WalletSession.get();
	const proofPayload = approve ? link.request.proofPayload : void 0;
	let info;
	if (approve) info = checkTonConnectManifest(session, link, proofPayload !== void 0 ? await wallet.managers.appWalletManager.getTonConnectOwnershipDomain() : void 0);
	await wallet.withTonConnectSigner(options.status, async (signer) => {
		const keys = await getSessionKeys(signer, session);
		try {
			await withFreshChallenge(async () => {
				const { answer, eventId } = await proveSessionKey(wallet, session.id, keys);
				let json;
				if (approve) {
					const account = await signer.account();
					if (toRawTonAddress(account.address) !== toRawTonAddress(options.status.state.address) || account.network !== "-239") fail("keyMismatch");
					let proof;
					if (proofPayload !== void 0) {
						const timestamp = await getServerTime(wallet);
						const domain = getTonConnectHost(info.url);
						const signature = await signer.signProof(domain, timestamp, proofPayload);
						proof = {
							timestamp,
							domain,
							payload: proofPayload,
							signature: bytesToBase64(signature)
						};
					}
					json = buildConnectEvent({
						eventId,
						account,
						proof,
						appVersion: App.version || "1"
					});
				} else json = buildConnectErrorEvent(eventId, options.errorCode ?? TonConnectErrorCode.USER_DECLINED);
				const body = await seal(keys, json);
				const accepted = await wallet.managers.appWalletManager.tonConnectSubmitConnectResult({
					sessionId: session.id,
					challengeAnswer: answer,
					body,
					error: !approve,
					traceId: link.traceId
				});
				answer.fill(0);
				if (!accepted) fail("bridgeUnavailable");
			}, ["TONCONNECT_CHALLENGE_INVALID", "TONCONNECT_SESSION_NOT_ACTIVE"]);
		} finally {
			keys.secretKey.fill(0);
		}
	});
	wallet.managers.appWalletManager.getTonConnectSessions(true).catch(() => {});
}
function getTonConnectRequestKey(sessionId, msgId) {
	return String(sessionId) + ":" + msgId;
}
function getTonConnectOperationId(sessionId, msgId) {
	return "ton-connect:" + String(sessionId) + ":" + msgId;
}
/**
* The request `msgId` of a session, or — for a dApp's wake-up link — the one `traceId` names (the link may come
* before the bridge delivered the request: tried again a few times, as Android does). Nothing when it is gone.
*/
async function findTonConnectRequest(lookup) {
	const wallet = WalletSession.get();
	const attempts = "dappClientId" in lookup ? 10 : 1;
	for (let attempt = 0; attempt < attempts; ++attempt) {
		let pending;
		try {
			pending = await wallet.managers.appWalletManager.tonConnectGetPending("sessionId" in lookup ? { sessionId: lookup.sessionId } : { dappClientId: lookup.dappClientId });
		} catch (err) {
			if (attempt + 1 >= attempts) throw err;
			await pause(500);
			continue;
		}
		const now = await getServerTime(wallet);
		const requests = pending.requests.filter((request) => String(request.session_id) === String(pending.session.id) && request.expires > now);
		const found = "msgId" in lookup ? requests.find((request) => request.msg_id === lookup.msgId) : requests.find((request) => !lookup.traceId || request.trace_id === lookup.traceId);
		if (found) return {
			session: pending.session,
			envelope: found
		};
		if (attempt + 1 < attempts) await pause(500);
	}
}
/** opens a request with the session's key and reads it against the wallet; one with no usable id cannot be answered */
async function openTonConnectRequest(status, session, envelope) {
	const wallet = WalletSession.get();
	const now = await getServerTime(wallet);
	if (envelope.expires <= now) fail("expired");
	return {
		session,
		envelope,
		request: await wallet.withTonConnectSigner(status, async (signer) => {
			if (!session.client_id) fail("unavailable");
			const keys = await getSessionKeys(signer, session);
			try {
				const plaintext = await openFromPeer(keys.secretKey, keys.peer, envelope.body);
				return parseAppRequest(textDecoder.decode(plaintext), {
					address: status.state.address,
					now
				});
			} finally {
				keys.secretKey.fill(0);
			}
		}),
		info: getTonConnectManifestInfo(session),
		address: status.state.address,
		operationId: getTonConnectOperationId(session.id, envelope.msg_id)
	};
}
/** what the request popup shows of a transfer: the engine's emulation of exactly what would be signed */
function previewTonConnectRequest(status, loaded) {
	if (loaded.request.kind !== "sendTransaction") throw walletError("TONCONNECT_NOT_A_TRANSFER");
	return WalletSession.get().previewTonConnect(status, loaded.operationId, loaded.request.intent);
}
/** a request the user never sees: an invalid one, a disconnect, one of a session that is not connected */
function isTonConnectRequestSilent(loaded) {
	return loaded.request.kind === "invalid" || loaded.request.kind === "disconnect" || !isTonConnectSessionActive(loaded.session);
}
function getRepliesPrefix(wallet) {
	return "tweb-wallet-tonconnect:" + wallet.vault.ownerId + ":";
}
function readReplies(wallet) {
	const prefix = getRepliesPrefix(wallet), replies = {};
	try {
		for (let i = 0; i < localStorage.length; ++i) {
			const storageKey = localStorage.key(i);
			if (storageKey?.startsWith(prefix)) {
				const reply = JSON.parse(localStorage.getItem(storageKey));
				if (reply) replies[storageKey.slice(prefix.length)] = reply;
			}
		}
	} catch (err) {}
	return replies;
}
function readReply(wallet, key) {
	try {
		return JSON.parse(localStorage.getItem(getRepliesPrefix(wallet) + key)) || void 0;
	} catch (err) {}
}
function writeReply(wallet, key, reply) {
	try {
		if (reply) localStorage.setItem(getRepliesPrefix(wallet) + key, JSON.stringify(reply));
		else localStorage.removeItem(getRepliesPrefix(wallet) + key);
	} catch (err) {
		if (reply?.phase === "executing") throw err;
	}
}
/** the reply this device already prepared for a request, if any */
function getStoredTonConnectReply(sessionId, msgId) {
	return readReply(WalletSession.get(), getTonConnectRequestKey(sessionId, msgId));
}
/** one device, one tab answers a request: the others find it taken */
function withRequestLock(wallet, sessionId, msgId, task) {
	return withTabsLock(getRepliesPrefix(wallet) + getTonConnectRequestKey(sessionId, msgId), true, task).then((result) => {
		return result === void 0 ? fail("handledElsewhere") : result;
	});
}
async function submitReply(wallet, key, reply) {
	const managers = wallet.managers;
	if (reply.phase === "prepared") {
		try {
			if (!await managers.appWalletManager.tonConnectSubmitResponse({
				sessionId: reply.sessionId,
				msgId: reply.msgId,
				body: base64ToBytes(reply.body),
				traceId: reply.traceId
			})) fail("bridgeUnavailable");
		} catch (err) {
			const failure = tonConnectFailure(err);
			if (failure === "expired" || failure === "handledElsewhere") writeReply(wallet, key);
			throw failure ? new TonConnectError(failure, err) : err;
		}
		if (reply.close) {
			reply = {
				...reply,
				phase: "closing",
				body: void 0
			};
			writeReply(wallet, key, reply);
		}
	}
	if (reply.phase === "closing") {
		if (!await managers.appWalletManager.tonConnectCloseSession(reply.sessionId).catch((err) => {
			if (tonConnectFailure(err) === "handledElsewhere") return true;
			throw err;
		})) fail("bridgeUnavailable");
	}
	writeReply(wallet, key);
}
/** sends what earlier tabs prepared and could not deliver; a transfer caught mid-way is left to the engine's journal */
async function retryTonConnectReplies() {
	const wallet = WalletSession.get();
	const now = await getServerTime(wallet);
	const replies = readReplies(wallet);
	for (const key in replies) {
		const reply = replies[key];
		if (reply.expires <= now && !reply.close) {
			writeReply(wallet, key);
			continue;
		}
		if (reply.phase === "executing") continue;
		await withTabsLock(getRepliesPrefix(wallet) + key, true, async () => {
			const current = readReply(wallet, key);
			if (current && current.phase !== "executing") await submitReply(wallet, key, current);
		}).catch(() => {});
	}
}
/**
* Answers a request: the server is asked for it first (claimed, declined or not), then it is carried out and the
* encrypted answer kept until the server took it. A decline, an invalid request and one of a session that is not
* connected are claimed as declined and answered with their error.
*/
function answerTonConnectRequest(status, loaded, approve) {
	const { session, envelope, request } = loaded;
	const wallet = WalletSession.get();
	const key = getTonConnectRequestKey(session.id, envelope.msg_id);
	return withRequestLock(wallet, session.id, envelope.msg_id, async () => {
		const stored = readReply(wallet, key);
		if (stored && stored.phase !== "executing") {
			await submitReply(wallet, key, stored);
			return {
				approved: !!stored.approved,
				failure: stored.failure
			};
		} else if (stored) fail("outcomeUnknown");
		const now = await getServerTime(wallet);
		if (envelope.expires <= now || request.kind === "sendTransaction" && request.validUntil !== void 0 && request.validUntil <= now) fail("expired");
		const inactive = !isTonConnectSessionActive(session);
		const declined = !approve || request.kind === "invalid" || inactive;
		const signedAddress = parseTonAddress(loaded.address);
		const signedDomain = loaded.info?.domain;
		if (!declined && request.kind === "signData" && (!signedAddress || !signedDomain)) fail("invalidManifest");
		return wallet.withTonConnectSigner(status, async (signer) => {
			const keys = await getSessionKeys(signer, session);
			try {
				let claimed;
				try {
					claimed = await withFreshChallenge(async () => {
						let answer;
						if (!session.pFlags.closed && !session.pFlags.closing) answer = (await proveSessionKey(wallet, session.id, keys)).answer;
						try {
							return await wallet.managers.appWalletManager.tonConnectClaimRequest({
								sessionId: session.id,
								msgId: envelope.msg_id,
								appRequestId: request.id,
								challengeAnswer: answer,
								declined
							});
						} finally {
							answer?.fill(0);
						}
					});
				} catch (err) {
					throw err instanceof TonConnectError ? err : new TonConnectError(tonConnectFailure(err) || "unavailable", err);
				}
				if (!claimed) fail("handledElsewhere");
				let json, close = false, failure;
				if (!approve) json = buildErrorResponse(request.id, TonConnectErrorCode.USER_DECLINED);
				else if (request.kind === "invalid") json = buildErrorResponse(request.id, request.code, request.message);
				else if (inactive) json = buildErrorResponse(request.id, TonConnectErrorCode.UNKNOWN_APP);
				else if (request.kind === "disconnect") {
					json = buildSuccessResponse(request.id, {});
					close = true;
				} else if (request.kind === "sendTransaction") {
					writeReply(wallet, key, {
						sessionId: String(session.id),
						msgId: envelope.msg_id,
						phase: "executing",
						expires: envelope.expires
					});
					try {
						const outcome = await wallet.sendTonConnect(status, loaded.operationId, request.intent);
						const phase = outcome.result.phase;
						if (outcome.result.signedBoc && (phase === "submitted" || phase === "handedOff" || phase === "confirmed" || phase === "submissionUnknown")) {
							json = buildSuccessResponse(request.id, outcome.result.signedBoc);
							if (phase === "submissionUnknown") failure = "outcomeUnknown";
						} else {
							failure = phase === "submissionUnknown" || phase === "submitted" ? "outcomeUnknown" : "failed";
							json = buildErrorResponse(request.id, TonConnectErrorCode.UNKNOWN);
						}
					} catch (err) {
						failure = isSendOutcomeUnknown(err, { rpcStarted: false }) ? "outcomeUnknown" : "failed";
						json = buildErrorResponse(request.id, TonConnectErrorCode.UNKNOWN);
					}
				} else try {
					const timestamp = await getServerTime(wallet);
					const digest = await signDataDigest(signedAddress, signedDomain, timestamp, request.payload);
					const signature = await signDigest(signer.seed, digest);
					json = buildSuccessResponse(request.id, buildSignDataResult({
						signature: bytesToBase64(signature),
						address: signedAddress.workchain + ":" + bytesToHex(signedAddress.hash),
						timestamp,
						domain: signedDomain,
						json: request.json
					}));
				} catch (err) {
					failure = "failed";
					json = buildErrorResponse(request.id, TonConnectErrorCode.UNKNOWN);
				}
				const reply = {
					sessionId: String(session.id),
					msgId: envelope.msg_id,
					phase: "prepared",
					body: bytesToBase64(await seal(keys, json)),
					traceId: envelope.trace_id,
					close,
					approved: approve && !declined && !failure,
					failure,
					expires: envelope.expires
				};
				writeReply(wallet, key, reply);
				await submitReply(wallet, key, reply);
				return {
					approved: reply.approved,
					failure
				};
			} finally {
				keys.secretKey.fill(0);
			}
		});
	});
}
/**
* The wallet leaves: each session gets the wallet's own `disconnect` event under its key, then closes. A session a
* key from before an update registered closes without one — the dApp could not open it.
*/
async function disconnectTonConnectSessions(status, sessions) {
	const wallet = WalletSession.get();
	const managers = wallet.managers;
	const open = sessions.filter((session) => !session.pFlags.closed);
	if (!open.length) return;
	let failed;
	await wallet.withTonConnectSigner(status, async (signer) => {
		for (const session of open) try {
			let body;
			const keys = await getSessionKeys(signer, session).catch((err) => {
				if (tonConnectFailure(err) === "keyMismatch") return;
				throw err;
			});
			if (keys && session.client_id) try {
				body = await seal(keys, buildDisconnectEvent(await managers.appWalletManager.tonConnectNextEventId(session.id)));
			} finally {
				keys.secretKey.fill(0);
			}
			if (!await managers.appWalletManager.tonConnectCloseSession(session.id, body).catch((err) => {
				if (tonConnectFailure(err) === "handledElsewhere") return true;
				throw err;
			})) fail("bridgeUnavailable");
		} catch (err) {
			failed ?? (failed = err);
		}
	});
	if (failed) throw failed;
}
//#endregion
export { TonConnectText as C, tonConnect_module_default as E, TonConnectAppIcon as S, showTonConnectFailure as T, TonConnectErrorCode as _, disconnectTonConnectSessions as a, toRawTonAddress as b, getTonConnectManifestInfo as c, isTonConnectSessionActive as d, openTonConnectRequest as f, tonConnect_exports as g, tonConnectFailure as h, createTonConnectSession as i, getTonConnectRequestKey as l, retryTonConnectReplies as m, answerTonConnectRequest as n, findTonConnectRequest as o, previewTonConnectRequest as p, checkTonConnectManifest as r, getStoredTonConnectReply as s, answerTonConnectConnect as t, isTonConnectRequestSilent as u, parseTonConnectUrl as v, getTonConnectFailureText as w, PopupCloser as x, sumTonConnectAmounts as y };
