//# allFunctionsCalledOnLoad
import { h as Modes } from "./userAgent-ByGXcznk.js";
import { a as i18n } from "./langPack-BmdJGr44.js";
import { M as onCleanup, N as onMount, i as For, p as createComponent, s as Show, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { _ as use, c as insert, f as setAttribute, g as template, o as className, s as delegateEvents } from "./web-BPyQozky.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
import { t as IconTsx } from "./iconTsx-B4lOk4A6.js";
import { t as getMiddleware } from "./middleware-D6HuIqPm.js";
import { ln as walletNftName, vn as wrapPhoto } from "./confirmationPopup-Bz6mK0o-.js";
import { t as stargiftsGrid_module_default } from "./stargiftsGrid.module-DsZKykwX.js";
import { i as canonicalTonAddress } from "./transferMessages-BVUO3_q3.js";
//#region src/lib/wallet/nftKind.ts
var FRAGMENT_NFT_HOST = "https://nft.fragment.com/";
var FRAGMENT_HOST = "https://fragment.com/";
/** the one collection numbers and usernames are minted in, by canonical address */
var FRAGMENT_COLLECTIONS = /* @__PURE__ */ new Map([["0:0e41dc1dc3c9067ed24248580e12b3359818d83dee0304fabcf80845eafafdb2", {
	segment: "number",
	kind: "number"
}], ["0:80d78a35f955a14b679faa887ff4cd5bfc0f43b4a4eea2a7e6927f3701b273c2", {
	segment: "username",
	kind: "username"
}]]);
var SLUG = /^[A-Za-z0-9_-]+$/;
var DOTTED_SLUG = /^[A-Za-z0-9_.-]+$/;
var USERNAME = /^[A-Za-z0-9_]+$/;
var NUMBER = /^\+[0-9 ]*$/;
/** `https://nft.fragment.com/<segment>/<slug>.json` */
function fragmentSlug(uri, segment) {
	const prefix = FRAGMENT_NFT_HOST + segment + "/";
	if (!uri?.startsWith(prefix)) return "";
	let slug = uri.slice(prefix.length);
	if (slug.endsWith(".json")) slug = slug.slice(0, -5);
	return DOTTED_SLUG.test(slug) ? slug : "";
}
/** `https://nft.fragment.com/<segment>/<slug>.<anything>`: a picture, an animation or the metadata */
function fragmentMediaSlug(url, segment) {
	const prefix = FRAGMENT_NFT_HOST + segment + "/";
	if (!url?.startsWith(prefix)) return "";
	const slug = url.slice(prefix.length).split(".", 1)[0];
	return SLUG.test(slug) ? slug : "";
}
function mediaSlug(input, segment) {
	for (const url of [
		input.image,
		input.lottie,
		input.imageSmall,
		input.contentUrl
	]) {
		const slug = fragmentMediaSlug(url, segment);
		if (slug) return slug;
	}
	return "";
}
/** `@username` or `+888 0768 4929`, as Fragment names them */
function keyFromName(name, kind) {
	if (!name) return "";
	if (kind === "username") {
		const key = name.startsWith("@") ? name.slice(1) : name;
		return USERNAME.test(key) ? key : "";
	}
	if (kind === "number") return NUMBER.test(name) ? name.slice(1).replace(/ /g, "") : "";
	return "";
}
function classifyNft(input) {
	const entry = FRAGMENT_COLLECTIONS.get(canonicalTonAddress(input.collection));
	if (entry) return {
		kind: entry.kind,
		key: fragmentSlug(input.contentUri, entry.segment) || mediaSlug(input, entry.segment) || keyFromName(input.name, entry.kind)
	};
	const slug = fragmentSlug(input.contentUri, "gift") || mediaSlug(input, "gift");
	return slug ? {
		kind: "gift",
		key: slug
	} : {
		kind: "generic",
		key: ""
	};
}
/**
* The server's item. A no-proxy document counts as none, as in tdesktop: the client never fetches one, the
* browser would reveal the user's IP to its host.
*/
function classifyWalletNft(item) {
	const url = (document) => document?._ === "webDocument" ? document.url : void 0;
	return classifyNft({
		collection: item.collection_address,
		name: item.name,
		image: url(item.image),
		lottie: url(item.lottie),
		imageSmall: url(item.image_small),
		contentUrl: url(item.content_url)
	});
}
/** Where the collectible is sold: its page on fragment.com, or nothing for one that is not Telegram's */
function getWalletNftFragmentUrl({ kind, key }) {
	if (!key || kind === "generic") return;
	return FRAGMENT_HOST + kind + "/" + key;
}
/**
* Whether the gift `payments.getUniqueStarGift` returned for an item's slug is that item: the gift's on-chain
* address is the item's own. Any other answer means the item's metadata names a gift it is not.
*/
function isWalletNftGift(gift, address) {
	if (gift?._ !== "starGiftUnique" || !gift.gift_address) return false;
	const canonical = canonicalTonAddress(address);
	return !!canonical && canonicalTonAddress(gift.gift_address) === canonical;
}
/** A trait its metadata lists, by its type in lower case (`model`, `symbol`, `backdrop`) */
function getWalletNftTrait(item, type) {
	return item.attributes?.find((attribute) => attribute.trait_type?.trim().toLowerCase() === type)?.value?.trim() || void 0;
}
/** A gift's model and backdrop, from the traits its metadata lists */
function getWalletNftGiftLook(item) {
	const model = getWalletNftTrait(item, "model"), backdrop = getWalletNftTrait(item, "backdrop");
	return model && backdrop ? {
		model,
		backdrop
	} : void 0;
}
/** A collectible's animation is shown only up to this size, packed or not (iOS `walletCollectibleLottieMaximumSize`) */
var WALLET_NFT_LOTTIE_MAX_SIZE = 5242880;
/** The animation the server proxies, when it may be fetched and is not bigger than the client shows */
function getWalletNftLottie(item) {
	const lottie = item.lottie;
	if (lottie?._ !== "webDocument" || lottie.size > 5242880) return;
	return lottie;
}
/** `Plush Pepe #12` → `['Plush Pepe ', '#12']`: the number is drawn in the secondary colour (iOS) */
function splitWalletNftNumber(name) {
	const match = /#[0-9]+$/.exec(name);
	return match ? [name.slice(0, match.index), match[0]] : [name, ""];
}
var isJsonObject = (value) => !!value && typeof value === "object" && !Array.isArray(value);
function nonEmpty(value) {
	return typeof value === "string" && value.trim() ? value.trim() : void 0;
}
/** An https page on fragment.com itself, normalized, or nothing: the metadata is anybody's to write */
function getFragmentPageUrl(value) {
	const string = nonEmpty(value);
	if (!string) return;
	let url;
	try {
		url = new URL(string);
	} catch (err) {
		return;
	}
	if (url.protocol !== "https:" || url.hostname !== "fragment.com" || url.port || url.username || url.password) return;
	return url.href;
}
var extraCache = /* @__PURE__ */ new WeakMap();
/** The item's `extra`: the metadata the server passes on as JSON, or an empty object when it is none */
function getWalletNftExtra(item) {
	let extra = extraCache.get(item);
	if (extra) return extra;
	try {
		const parsed = item.extra?.data ? JSON.parse(item.extra.data) : void 0;
		extra = isJsonObject(parsed) ? parsed : {};
	} catch (err) {
		extra = {};
	}
	extraCache.set(item, extra);
	return extra;
}
/**
* The collection's name and Fragment page from the item's metadata (iOS `walletCollectible(from:)`): the flat
* `collection_name` / `collection_url`, or the nested `collection` object of the TON API.
*/
function getWalletNftCollection(item) {
	const extra = getWalletNftExtra(item);
	const collection = isJsonObject(extra.collection) ? extra.collection : {};
	return {
		name: nonEmpty(extra.collection_name) ?? nonEmpty(collection.name),
		url: getFragmentPageUrl(extra.collection_url) ?? getFragmentPageUrl(collection.external_link) ?? getFragmentPageUrl(collection.url)
	};
}
var collectibles_module_default = {
	grid: "_grid_1676x_21",
	item: "_item_1676x_25",
	image: "_image_1676x_45",
	text: "_text_1676x_59",
	placeholder: "_placeholder_1676x_66",
	name: "_name_1676x_71",
	kind: "_kind_1676x_81",
	number: "_number_1676x_94"
};
//#endregion
//#region src/components/wallet/collectibles.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div>`);
var _tmpl$2 = /*#__PURE__*/ template(`<span>`);
var _tmpl$3 = /*#__PURE__*/ template(`<span dir=auto>`);
var _tmpl$4 = /*#__PURE__*/ template(`<button type=button><span><span></span><span>`);
/**
* A collectible's picture from its web document, or a placeholder when it has none the client may show: a
* no-proxy document is none (lib/wallet/nftKind.ts).
*/
function WalletNftImage(props) {
	let container;
	const document = () => props.document?._ === "webDocument" ? props.document : void 0;
	onMount(() => {
		const photo = document();
		if (!photo) return;
		const middleware = getMiddleware();
		onCleanup(() => middleware.destroy());
		wrapPhoto({
			container,
			photo,
			boxWidth: props.size,
			boxHeight: props.size,
			middleware: middleware.get(),
			withoutPreloader: true,
			size: {
				_: "photoSizeEmpty",
				type: ""
			}
		});
	});
	return (() => {
		var _el$ = _tmpl$();
		var _ref$ = container;
		typeof _ref$ === "function" ? use(_ref$, _el$) : container = _el$;
		insert(_el$, createComponent(Show, {
			get when() {
				return !document();
			},
			get children() {
				return props.placeholder ?? createComponent(IconTsx, {
					icon: "gift",
					get ["class"]() {
						return collectibles_module_default.placeholder;
					}
				});
			}
		}));
		createRenderEffect(() => className(_el$, classNames(collectibles_module_default.image, props.class)));
		return _el$;
	})();
}
/** The picture to show: the big one or the small one first, whichever of them the client may fetch */
function walletNftPicture(item, small) {
	return (small ? [item.image_small, item.image] : [item.image, item.image_small]).find((document) => document?._ === "webDocument");
}
/** A collectible's name, its trailing `#N` in the secondary colour (iOS); it reads in its own direction */
function WalletNftName(props) {
	const parts = () => splitWalletNftNumber(walletNftName(props.item));
	return (() => {
		var _el$2 = _tmpl$3();
		insert(_el$2, () => parts()[0], null);
		insert(_el$2, createComponent(Show, {
			get when() {
				return parts()[1];
			},
			get children() {
				var _el$3 = _tmpl$2();
				insert(_el$3, () => parts()[1]);
				createRenderEffect(() => className(_el$3, collectibles_module_default.number));
				return _el$3;
			}
		}), null);
		return _el$2;
	})();
}
/**
* What the collectible is, under its name (tdesktop's `CollectibleSubtitleText`): a username or a number by its
* collection, a gift by its model and backdrop, anything else by the collection its metadata names (iOS), or as
* a collectible.
*/
function walletNftKindText(item) {
	const { kind } = classifyWalletNft(item);
	if (kind === "username") return i18n("WalletCollectibleUsername");
	if (kind === "number") return i18n("WalletCollectibleNumber");
	const look = kind === "gift" && getWalletNftGiftLook(item);
	if (look) return i18n("WalletCollectibleModelBackdrop", [look.model, look.backdrop]);
	return getWalletNftCollection(item).name || i18n("WalletCollectible");
}
function WalletCollectibles(props) {
	return (() => {
		var _el$4 = _tmpl$();
		insert(_el$4, createComponent(For, {
			get each() {
				return props.items;
			},
			children: (item) => (() => {
				var _el$5 = _tmpl$4(), _el$6 = _el$5.firstChild, _el$7 = _el$6.firstChild, _el$8 = _el$7.nextSibling;
				_el$5.$$click = () => props.onOpen(item);
				insert(_el$5, createComponent(WalletNftImage, {
					get document() {
						return walletNftPicture(item, true);
					},
					size: 90,
					get ["class"]() {
						return stargiftsGrid_module_default.itemSticker;
					}
				}), _el$6);
				insert(_el$7, createComponent(WalletNftName, { item }));
				insert(_el$8, () => walletNftKindText(item));
				createRenderEffect((_p$) => {
					var _v$ = classNames(stargiftsGrid_module_default.gridItem, collectibles_module_default.item), _v$2 = Modes.a11y ? void 0 : -1, _v$3 = collectibles_module_default.text, _v$4 = collectibles_module_default.name, _v$5 = collectibles_module_default.kind;
					_v$ !== _p$.e && className(_el$5, _p$.e = _v$);
					_v$2 !== _p$.t && setAttribute(_el$5, "tabindex", _p$.t = _v$2);
					_v$3 !== _p$.a && className(_el$6, _p$.a = _v$3);
					_v$4 !== _p$.o && className(_el$7, _p$.o = _v$4);
					_v$5 !== _p$.i && className(_el$8, _p$.i = _v$5);
					return _p$;
				}, {
					e: void 0,
					t: void 0,
					a: void 0,
					o: void 0,
					i: void 0
				});
				return _el$5;
			})()
		}));
		createRenderEffect(() => className(_el$4, classNames(stargiftsGrid_module_default.grid, collectibles_module_default.grid)));
		return _el$4;
	})();
}
delegateEvents(["click"]);
//#endregion
export { walletNftPicture as a, getWalletNftCollection as c, getWalletNftTrait as d, isWalletNftGift as f, walletNftKindText as i, getWalletNftFragmentUrl as l, WalletNftImage as n, WALLET_NFT_LOTTIE_MAX_SIZE as o, WalletNftName as r, classifyWalletNft as s, WalletCollectibles as t, getWalletNftLottie as u };
