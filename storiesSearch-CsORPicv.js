//# allFunctionsCalledOnLoad
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { a as i18n, p as setDirection } from "./langPack-BmdJGr44.js";
import { C as createSignal, L as untrack, M as onCleanup, N as onMount, _ as createMemo, g as createEffect, i as For, o as Match, p as createComponent, s as Show, u as Switch, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { n as bindManagersToSession } from "./bindManagersToAccount-BL82O9H9.js";
import { c as insert, g as template, o as className, u as memo } from "./web-BPyQozky.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
import { t as I18nTsx } from "./i18n-CGMFiAW0.js";
import { t as PreloaderTsx } from "./putPreloader-Bxq7N1RV.js";
import { t as lottieLoader } from "./lottieLoader-B3FXw0K7.js";
import { A as AvatarNewTsx, i as Row } from "./confirmationPopup-Bz6mK0o-.js";
import { n as wrapEmojiText } from "./wrapEmojiText-DT39R5Tj.js";
import { a as LottieAnimation } from "./mediaHeader-CnpQNwOl.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { t as PeerTitleTsx } from "./peerTitleTsx-DcpEYRoE.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { t as getPollCountryName } from "./getPollCountryName-OfmUTr_N.js";
import { a as useStories, i as createStoriesStore, n as StoriesContext } from "./store-DlmW-tY7.js";
import { t as MapPreview } from "./mapPreview-DBrifbKc.js";
import { t as wrapStoryGridItem } from "./gridItem-9u6NBAI5.js";
var storiesSearch_module_default = {
	author: "_author_1lrrk_1",
	authorName: "_authorName_1lrrk_21",
	grid: "_grid_1lrrk_28",
	placeholder: "_placeholder_1lrrk_41",
	sticker: "_sticker_1lrrk_50",
	placeholderTitle: "_placeholderTitle_1lrrk_57"
};
//#endregion
//#region src/components/sidebarLeft/tabs/storiesSearch.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div aria-hidden=true>`);
var _tmpl$2 = /*#__PURE__*/ template(`<div>`);
var _tmpl$3 = /*#__PURE__*/ template(`<div class=sidebar-header__rows><div class=sidebar-header__subtitle>`);
var AUTHOR_AVATAR_SIZE = 18;
var getKey = (peer) => `${peer.peerId}_${peer.stories[0].id}`;
/** where the stories were posted from: its map, its name and its address */
function Place(props) {
	const geo = props.area.geo;
	const venue = props.area._ === "mediaAreaVenue" ? props.area : void 0;
	let address;
	if (venue) address = venue.address;
	else {
		const parts = props.area.address;
		address = parts && [
			parts.street,
			parts.city,
			parts.state,
			parts.country_iso2 && getPollCountryName(parts.country_iso2)
		].filter(Boolean).join(", ");
	}
	return createComponent(Section, {
		noDelimiter: true,
		get children() {
			return [createComponent(Show, {
				get when() {
					return geo?._ === "geoPoint";
				},
				get children() {
					return createComponent(MapPreview, { geo });
				}
			}), createComponent(Row, { get children() {
				return [
					createComponent(Row.Icon, { icon: "location_filled" }),
					createComponent(Row.Title, { get children() {
						return memo(() => !!venue?.title)() ? wrapEmojiText(venue.title) : i18n("ChatLocation");
					} }),
					createComponent(Show, {
						when: address,
						get children() {
							return createComponent(Row.Subtitle, { get children() {
								return wrapEmojiText(address);
							} });
						}
					})
				];
			} })];
		}
	});
}
function FoundStories(props) {
	const [tab] = useSuperTab();
	const [stories, actions] = useStories();
	const [viewerPeer, setViewerPeer] = createSignal();
	const items = /* @__PURE__ */ new Map();
	createEffect(() => {
		const peer = viewerPeer();
		if (!peer) return;
		untrack(() => actions.set({
			peer,
			index: 0
		}));
		const target = createMemo(() => stories.peer && items.get(getKey(stories.peer)));
		hotReloadGuard.createStoriesViewer({
			onExit: () => setViewerPeer(void 0),
			target,
			pinned: true
		});
	});
	createEffect(() => {
		if (stories.hasViewer && !stories.loaded && stories.index >= stories.peers.length - 4) actions.load();
	});
	tab.scrollable.onScrolledBottom = () => {
		actions.load();
	};
	const Item = (peer) => {
		const { container, media, thumb } = wrapStoryGridItem({
			peerId: peer.peerId,
			storyItem: peer.stories[0],
			onClick: () => setViewerPeer(peer),
			withAuthor: !props.search.peerId
		});
		createEffect(() => {
			const element = media() || thumb();
			if (!element) return;
			const key = getKey(peer);
			items.set(key, element);
			onCleanup(() => items.delete(key));
		});
		if (!props.search.peerId) container.append((() => {
			var _el$ = _tmpl$();
			insert(_el$, createComponent(AvatarNewTsx, {
				get peerId() {
					return peer.peerId;
				},
				size: AUTHOR_AVATAR_SIZE
			}), null);
			insert(_el$, createComponent(PeerTitleTsx, {
				get ["class"]() {
					return storiesSearch_module_default.authorName;
				},
				get peerId() {
					return peer.peerId;
				}
			}), null);
			createRenderEffect(() => className(_el$, storiesSearch_module_default.author));
			return _el$;
		})());
		return container;
	};
	const count = () => stories.peers.length;
	return createComponent(Switch, { get children() {
		return [
			createComponent(Match, {
				get when() {
					return !stories.ready;
				},
				get children() {
					var _el$2 = _tmpl$2();
					insert(_el$2, createComponent(PreloaderTsx, {}));
					createRenderEffect(() => className(_el$2, storiesSearch_module_default.placeholder));
					return _el$2;
				}
			}),
			createComponent(Match, {
				get when() {
					return !count();
				},
				get children() {
					return createComponent(Show, {
						get when() {
							return !props.search.area;
						},
						get children() {
							var _el$3 = _tmpl$2();
							insert(_el$3, createComponent(LottieAnimation, {
								lottieLoader,
								name: "UtyanStories",
								get ["class"]() {
									return storiesSearch_module_default.sticker;
								}
							}), null);
							insert(_el$3, createComponent(I18nTsx, {
								key: "NoHashtagStoriesTitle",
								get ["class"]() {
									return storiesSearch_module_default.placeholderTitle;
								}
							}), null);
							createRenderEffect(() => className(_el$3, storiesSearch_module_default.placeholder));
							return _el$3;
						}
					});
				}
			}),
			createComponent(Match, {
				when: true,
				get children() {
					return createComponent(Section, {
						noDelimiter: true,
						get name() {
							return memo(() => !!props.search.area)() ? i18n("LocationStories", [stories.foundCount]) : void 0;
						},
						"class": "search-super-content-stories",
						get children() {
							var _el$4 = _tmpl$2();
							insert(_el$4, createComponent(For, {
								get each() {
									return stories.peers;
								},
								children: Item
							}));
							createRenderEffect((_p$) => {
								var _v$ = classNames("grid", storiesSearch_module_default.grid), _v$2 = !!(count() === 2), _v$3 = !!(count() === 1);
								_v$ !== _p$.e && className(_el$4, _p$.e = _v$);
								_v$2 !== _p$.t && _el$4.classList.toggle("two", _p$.t = _v$2);
								_v$3 !== _p$.a && _el$4.classList.toggle("one", _p$.a = _v$3);
								return _p$;
							}, {
								e: void 0,
								t: void 0,
								a: void 0
							});
							return _el$4;
						}
					});
				}
			})
		];
	} });
}
var StoriesSearchTab = () => {
	const [tab] = useSuperTab();
	const { search } = tab.payload;
	const contextValue = createStoriesStore({
		search,
		manualLoad: true
	});
	const [stories, actions] = contextValue;
	onMount(() => {
		if (!search.hashtag) return;
		const managers = bindManagersToSession(rootScope.managers);
		const title = document.createElement("span");
		title.textContent = search.hashtag;
		setDirection(title);
		tab.title.replaceChildren(title);
		if (search.peerId) managers.appPeersManager.getPeerUsername(search.peerId).then((username) => {
			if (username) title.append("@" + username);
		});
		const rows = (() => {
			var _el$5 = _tmpl$3(), _el$6 = _el$5.firstChild;
			insert(_el$5, () => tab.title, _el$6);
			insert(_el$6, (() => {
				var _c$ = memo(() => !!stories.ready);
				return () => _c$() ? i18n("StoriesCount", [stories.foundCount]) : i18n("Loading");
			})());
			return _el$5;
		})();
		tab.header.append(rows);
		onCleanup(() => rows.replaceWith(tab.title));
	});
	actions.load();
	return createComponent(StoriesContext.Provider, {
		value: contextValue,
		get children() {
			return [createComponent(Show, {
				get when() {
					return search.area;
				},
				children: (area) => createComponent(Place, { get area() {
					return area();
				} })
			}), createComponent(FoundStories, { search })];
		}
	});
};
//#endregion
export { StoriesSearchTab as default };
