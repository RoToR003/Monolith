//# allFunctionsCalledOnLoad
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { a as i18n } from "./langPack-BmdJGr44.js";
import { C as createSignal, M as onCleanup, i as For, p as createComponent, s as Show } from "./solid-9Vxm0VIz.js";
import { t as cancelEvent } from "./cancelEvent-Cw8vYZHp.js";
import { M as LazyLoadQueue } from "./renderer-L80wjxct.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
import { t as Button } from "./buttonTsx-Bwphkm9r.js";
import { t as subscribeOn } from "./subscribeOn-DnCla7ws.js";
import { i as usePromiseCollector } from "./mediaHeader-CnpQNwOl.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { m as showStickersPopup } from "./emoticonsDropdown-Cb_qGCUN.js";
import { o as getStickerSetInputByStickerSet } from "./pickKeys-Ckq7_h-r.js";
import { t as StickerSetRow } from "./stickerSetRow-Dh90LptU.js";
import { t as SearchEmpty } from "./searchStatus-DMXeLaKl.js";
//#region src/components/sidebarLeft/tabs/archivedStickers.tsx
/**
* The sticker sets the user has archived — by hand, or by the server to make room for new ones — page by page
* as the list is scrolled (Android's ArchivedStickersActivity, tdesktop's archived section). Each can be
* added back from here, and archived again; a click opens the set.
*/
var ArchivedStickers = () => {
	const [tab] = useSuperTab();
	const promiseCollector = usePromiseCollector();
	const lazyLoadQueue = new LazyLoadQueue();
	onCleanup(() => lazyLoadQueue.clear());
	const [sets, setSets] = createSignal([]);
	const [loaded, setLoaded] = createSignal(false);
	const [added, setAdded] = createSignal(/* @__PURE__ */ new Set());
	const setAddedState = (id, isAdded) => {
		const ids = new Set(added());
		isAdded ? ids.add(id) : ids.delete(id);
		setAdded(ids);
	};
	subscribeOn(rootScope)("stickers_installed", (set) => setAddedState(set.id, true));
	subscribeOn(rootScope)("stickers_deleted", (set) => setAddedState(set.id, false));
	const middleware = tab.middlewareHelper.get();
	let loading = false;
	const load = () => {
		if (loading) return;
		loading = true;
		const loadedSets = sets();
		const offsetId = loadedSets[loadedSets.length - 1]?.id;
		return tab.managers.appStickersManager.getArchivedStickers(offsetId).then((archived) => {
			loading = false;
			if (!middleware()) return;
			const known = new Set(loadedSets.map((set) => set.id));
			const fresh = archived.sets.filter((set) => !known.has(set.id));
			setSets([...loadedSets, ...fresh]);
			setLoaded(true);
			if (!fresh.length) tab.scrollable.onScrolledBottom = null;
			else tab.scrollable.checkForTriggers();
		}, () => {
			loading = false;
		});
	};
	tab.scrollable.onScrolledBottom = load;
	promiseCollector.collect(load());
	const renderAction = (set) => {
		const isAdded = () => added().has(set.id);
		return createComponent(Button, {
			get ["class"]() {
				return classNames("btn-primary btn-color-primary btn-control-small", isAdded() && "active");
			},
			get text() {
				return isAdded() ? "Stickers.SearchAdded" : "Stickers.SearchAdd";
			},
			onClick: (event) => {
				cancelEvent(event);
				const { appStickersManager } = tab.managers;
				return isAdded() ? appStickersManager.archiveStickerSet(set) : appStickersManager.toggleStickerSet(set);
			}
		});
	};
	return createComponent(Show, {
		get when() {
			return sets().length;
		},
		get fallback() {
			return createComponent(Show, {
				get when() {
					return loaded();
				},
				get children() {
					return createComponent(SearchEmpty, { get children() {
						return i18n("ArchivedStickersEmpty");
					} });
				}
			});
		},
		get children() {
			return createComponent(Section, {
				caption: "ArchivedStickersInfo",
				get children() {
					return createComponent(For, {
						get each() {
							return sets();
						},
						children: (set) => createComponent(StickerSetRow, {
							set,
							isEmoji: false,
							lazyLoadQueue,
							action: () => renderAction(set),
							onClick: () => showStickersPopup(getStickerSetInputByStickerSet(set))
						})
					});
				}
			});
		}
	});
};
//#endregion
export { ArchivedStickers as default };
