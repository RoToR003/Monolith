//# allFunctionsCalledOnLoad
import { h as Modes } from "./userAgent-ByGXcznk.js";
import { I as blobConstruct } from "./objectUrlUtils-5x08MNuO.js";
import { t as apiManagerProxy } from "./apiManagerProxy-DmQXvxSF.js";
import { u as langPack_default } from "./langPack-BmdJGr44.js";
import { C as createSignal, M as onCleanup, N as onMount, p as createComponent, s as Show, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { c as insert, f as setAttribute, g as template, o as className, p as setStyleProperty, s as delegateEvents, u as memo } from "./web-BPyQozky.js";
import { t as liteMode } from "./liteMode-DeLStZfQ.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
import { t as IconTsx } from "./iconTsx-B4lOk4A6.js";
import { t as getMiddleware } from "./middleware-D6HuIqPm.js";
import { t as lottieLoader } from "./lottieLoader-B3FXw0K7.js";
import { t as appDownloadManager } from "./appDownloadManager-ClHW2-Dl.js";
import { D as A11yButton } from "./openEditors-7FmA7q_V.js";
import { t as MediaHeader } from "./mediaHeader-CnpQNwOl.js";
import { t as safeWindowOpen } from "./safeWindowOpen-BUv4gymx.js";
import { a as walletNftPicture, c as getWalletNftCollection, n as WalletNftImage, o as WALLET_NFT_LOTTIE_MAX_SIZE, r as WalletNftName, u as getWalletNftLottie } from "./collectibles-BaTGzfgT.js";
var collectibleHeader_module_default = {
	header: "_header_aajyq_21",
	sticker: "_sticker_aajyq_25",
	media: "_media_aajyq_29",
	image: "_image_aajyq_39",
	lottie: "_lottie_aajyq_40",
	title: "_title_aajyq_61",
	collection: "_collection_aajyq_70",
	collectionLink: "_collectionLink_aajyq_76",
	collectionName: "_collectionName_aajyq_88",
	chevron: "_chevron_aajyq_94"
};
//#endregion
//#region src/components/wallet/collectibleHeader.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div>`);
var _tmpl$2 = /*#__PURE__*/ template(`<a target=_blank rel="noopener noreferrer"><span dir=auto>`);
var _tmpl$3 = /*#__PURE__*/ template(`<span dir=auto>`);
var isGzip = (bytes) => bytes[0] === 31 && bytes[1] === 139;
/** `{` past a byte order mark and whitespace: a JSON object, the only thing a lottie can be */
function isJsonObject(bytes) {
	let i = bytes[0] === 239 && bytes[1] === 187 && bytes[2] === 191 ? 3 : 0;
	while (bytes[i] === 32 || bytes[i] === 9 || bytes[i] === 10 || bytes[i] === 13) ++i;
	return bytes[i] === 123;
}
/**
* The collectible's animation through the server's proxy, unpacked when it came gzipped, no bigger than the
* client shows either way (iOS `walletCollectibleLottieData`); played once over the picture.
*/
async function loadWalletNftLottie(document, container, size, middleware) {
	const blob = await appDownloadManager.downloadMedia({ media: document });
	if (!middleware() || !blob || blob.size > 5242880) return;
	const buffer = await blob.arrayBuffer();
	let bytes = new Uint8Array(buffer);
	if (isGzip(bytes)) bytes = await apiManagerProxy.invokeCrypto("gzipUncompress", buffer, false, WALLET_NFT_LOTTIE_MAX_SIZE);
	if (!middleware() || !isJsonObject(bytes)) return;
	return lottieLoader.loadAnimationWorker({
		container,
		animationData: blobConstruct(bytes, "application/json"),
		width: size,
		height: size,
		loop: false,
		autoplay: true,
		name: "wallet_nft_" + document.url,
		group: "none",
		needUpscale: true,
		liteModeKey: "animations",
		middleware
	});
}
/**
* The collectible's picture, its animation over it when it has one: played once as it shows, a click plays it
* again (iOS `WalletCollectibleHeaderComponent`).
*/
function WalletCollectibleMedia(props) {
	const size = props.size ?? 164;
	const lottie = getWalletNftLottie(props.item);
	let lottieContainer;
	const [player, setPlayer] = createSignal();
	onMount(() => {
		if (!lottie) return;
		const middleware = getMiddleware();
		onCleanup(() => middleware.destroy());
		loadWalletNftLottie(lottie, lottieContainer, size, middleware.get()).then((value) => {
			setPlayer(value || void 0);
		}, () => {});
	});
	const playable = () => !!player() && liteMode.isAvailable("animations");
	const replay = () => {
		if (playable()) player().playOrRestart();
	};
	return (() => {
		var _el$ = _tmpl$();
		setStyleProperty(_el$, "--wallet-collectible-size", size + "px");
		insert(_el$, createComponent(WalletNftImage, {
			get document() {
				return walletNftPicture(props.item);
			},
			size,
			get ["class"]() {
				return collectibleHeader_module_default.image;
			}
		}), null);
		insert(_el$, createComponent(Show, {
			when: lottie,
			get children() {
				return createComponent(A11yButton, {
					as: "div",
					ref(r$) {
						var _ref$ = lottieContainer;
						typeof _ref$ === "function" ? _ref$(r$) : lottieContainer = r$;
					},
					get ["class"]() {
						return collectibleHeader_module_default.lottie;
					},
					role: "button",
					get ["aria-label"]() {
						return langPack_default.format("Wallet.Collectible.PlayAnimation", true);
					},
					get ["aria-hidden"]() {
						return !playable() || void 0;
					},
					get disabled() {
						return !playable();
					},
					onClick: replay
				});
			}
		}), null);
		createRenderEffect(() => className(_el$, classNames(collectibleHeader_module_default.media, props.class)));
		return _el$;
	})();
}
/** The collectible's name, two lines at most, its `#N` in the secondary colour */
function WalletCollectibleTitle(props) {
	return createComponent(MediaHeader.Title, {
		size: 20,
		get ["class"]() {
			return collectibleHeader_module_default.title;
		},
		get children() {
			return createComponent(WalletNftName, { get item() {
				return props.item;
			} });
		}
	});
}
/**
* The collection the metadata names, under the title: a link with a chevron when it has a page on Fragment.
* `fallback` takes its place for an item that names none.
*/
function WalletCollectibleCollection(props) {
	const collection = getWalletNftCollection(props.item);
	return createComponent(Show, {
		get when() {
			return collection.name;
		},
		get fallback() {
			return memo(() => !!props.fallback)() && createComponent(MediaHeader.Subtitle, {
				color: "secondary",
				get children() {
					return props.fallback;
				}
			});
		},
		get children() {
			return createComponent(MediaHeader.Subtitle, {
				color: "secondary",
				get ["class"]() {
					return collectibleHeader_module_default.collection;
				},
				get children() {
					return createComponent(Show, {
						get when() {
							return collection.url;
						},
						get fallback() {
							return (() => {
								var _el$4 = _tmpl$3();
								insert(_el$4, () => collection.name);
								return _el$4;
							})();
						},
						get children() {
							var _el$2 = _tmpl$2(), _el$3 = _el$2.firstChild;
							_el$2.$$click = (e) => {
								e.preventDefault();
								safeWindowOpen(collection.url);
							};
							insert(_el$3, () => collection.name);
							insert(_el$2, createComponent(IconTsx, {
								icon: "next",
								get ["class"]() {
									return collectibleHeader_module_default.chevron;
								},
								"aria-hidden": "true"
							}), null);
							createRenderEffect((_p$) => {
								var _v$ = collectibleHeader_module_default.collectionLink, _v$2 = collection.url, _v$3 = Modes.a11y ? void 0 : -1, _v$4 = collectibleHeader_module_default.collectionName;
								_v$ !== _p$.e && className(_el$2, _p$.e = _v$);
								_v$2 !== _p$.t && setAttribute(_el$2, "href", _p$.t = _v$2);
								_v$3 !== _p$.a && setAttribute(_el$2, "tabindex", _p$.a = _v$3);
								_v$4 !== _p$.o && className(_el$3, _p$.o = _v$4);
								return _p$;
							}, {
								e: void 0,
								t: void 0,
								a: void 0,
								o: void 0
							});
							return _el$2;
						}
					});
				}
			});
		}
	});
}
/**
* A collectible at the top of a screen (iOS `WalletCollectibleHeaderComponent`): its picture or animation,
* 164 px with rounded corners, its name, and the collection it belongs to. Usernames and numbers leave the
* collection out (`collection={false}`): theirs is said by what they are.
*/
function WalletCollectibleHeader(props) {
	return createComponent(MediaHeader, {
		get ["class"]() {
			return classNames(collectibleHeader_module_default.header, props.class);
		},
		get children() {
			return [
				createComponent(MediaHeader.Sticker, {
					size: 164,
					get ["class"]() {
						return collectibleHeader_module_default.sticker;
					},
					element: () => createComponent(WalletCollectibleMedia, { get item() {
						return props.item;
					} })
				}),
				createComponent(WalletCollectibleTitle, { get item() {
					return props.item;
				} }),
				createComponent(Show, {
					get when() {
						return props.collection ?? true;
					},
					get children() {
						return createComponent(WalletCollectibleCollection, { get item() {
							return props.item;
						} });
					}
				}),
				memo(() => props.children)
			];
		}
	});
}
delegateEvents(["click"]);
//#endregion
export { WalletCollectibleTitle as i, WalletCollectibleHeader as n, WalletCollectibleMedia as r, WalletCollectibleCollection as t };
