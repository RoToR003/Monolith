//# allFunctionsCalledOnLoad
import { t as findUpClassName } from "./findUpClassName-3V5me58N.js";
import "./rootScope-CZS0lmz8.js";
import { M as onCleanup, N as onMount } from "./solid-9Vxm0VIz.js";
import { r as useHotReloadGuard } from "./hotReloadGuard-BUNVkeQ4.js";
import { n as mediaSizes } from "./mediaSizes-C1MTaleW.js";
import { n as animationIntersector } from "./animationIntersector-vAjH_7t1.js";
import { n as attachClickEvent } from "./clickEvent-COk4YpLP.js";
import { t as InputSearch } from "./inputSearch-DWd-Jn5r.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { t as GifsMasonry } from "./gifsMasonry-BY1f4odR.js";
//#region src/components/sidebarRight/tabs/gifs.tsx
var ANIMATIONGROUP = "GIFS-SEARCH";
var Gifs = () => {
	const [tab] = useSuperTab();
	const { appSidebarRight, appImManager } = useHotReloadGuard();
	let inputSearch;
	let gifsDiv;
	let masonry;
	let nextOffset = "";
	let loadedAll = false;
	let gifBotPeerId;
	let searchPromise;
	const reset = () => {
		searchPromise = null;
		nextOffset = "";
		loadedAll = false;
		masonry.clear();
	};
	const search = async (query, newSearch = true) => {
		if (searchPromise || loadedAll) return;
		if (!gifBotPeerId) gifBotPeerId = (await tab.managers.appUsersManager.resolveUsername("gif")).id.toPeerId(false);
		try {
			searchPromise = tab.managers.appInlineBotsManager.getInlineResults(0, gifBotPeerId, query, nextOffset);
			const { results, next_offset } = await searchPromise;
			if (inputSearch.value !== query) return;
			searchPromise = null;
			nextOffset = next_offset;
			if (newSearch) gifsDiv.replaceChildren();
			if (results.length) results.forEach((result) => {
				if (result._ === "botInlineMediaResult" && result.document) masonry.add(result.document);
			});
			else loadedAll = true;
			tab.scrollable.onScroll();
		} catch (err) {
			searchPromise = null;
			console.error("gifs loading error:", err);
			throw err;
		}
	};
	const onGifsClick = async (e) => {
		const target = findUpClassName(e.target, "gif");
		if (!target) return;
		const fileId = target.dataset.docId;
		if (await appImManager.chat.input.sendMessageWithDocument({
			document: fileId,
			target
		})) {
			if (mediaSizes.isMobile) appSidebarRight.onCloseBtnClick();
		} else console.warn("got no doc by id:", fileId);
	};
	onMount(() => {
		tab.container.id = "search-gifs-container";
		inputSearch = new InputSearch({
			placeholder: "SearchGifsTitle",
			onChange: (value) => {
				reset();
				search(value);
			}
		});
		tab.title.replaceWith(inputSearch.container);
		gifsDiv = document.createElement("div");
		gifsDiv.classList.add("gifs-masonry");
		attachClickEvent(gifsDiv, onGifsClick, { listenerSetter: tab.listenerSetter });
		tab.scrollable.append(gifsDiv);
		masonry = new GifsMasonry(gifsDiv, ANIMATIONGROUP, tab.scrollable);
		appSidebarRight.toggleSidebar(true).then(() => {
			search("", true);
			tab.scrollable.onScrolledBottom = () => {
				search(inputSearch.value, false);
			};
		});
	});
	onCleanup(() => {
		reset();
		gifsDiv.replaceChildren();
		animationIntersector.checkAnimations(void 0, ANIMATIONGROUP);
		inputSearch.remove();
	});
	return null;
};
//#endregion
export { Gifs as default };
