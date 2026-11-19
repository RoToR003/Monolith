//# allFunctionsCalledOnLoad
import { t as findUpClassName } from "./findUpClassName-3V5me58N.js";
import { t as makeError } from "./makeError-CiXxcKtE.js";
import { a as i18n, m as setInnerHTML } from "./langPack-BmdJGr44.js";
import { M as onCleanup, N as onMount } from "./solid-9Vxm0VIz.js";
import { r as useHotReloadGuard } from "./hotReloadGuard-BUNVkeQ4.js";
import { M as LazyLoadQueue } from "./renderer-L80wjxct.js";
import { t as forEachReverse } from "./forEachReverse-pJ5a3thw.js";
import { n as animationIntersector } from "./animationIntersector-vAjH_7t1.js";
import { n as attachClickEvent } from "./clickEvent-COk4YpLP.js";
import { a as wrapSticker } from "./sticker-5twBOy1Y.js";
import { J as isStickerSetAdded } from "./getChatMigratedTo-ChhMNXuu.js";
import { n as wrapEmojiText } from "./wrapEmojiText-DT39R5Tj.js";
import { t as InputSearch } from "./inputSearch-DWd-Jn5r.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { At as attachMediaPeekListeners, m as showStickersPopup } from "./emoticonsDropdown-Cb_qGCUN.js";
import { o as getStickerSetInputByStickerSet, r as getStickerSetInputById } from "./pickKeys-Ckq7_h-r.js";
import { t as toastError } from "./toastError-BSN4cjN_.js";
//#region src/components/sidebarRight/tabs/stickers.tsx
var READ_VISIBLE_RATIO = .95;
var Stickers = () => {
	const [tab] = useSuperTab();
	const { appImManager, appSidebarRight } = useHotReloadGuard();
	const middleware = tab.middlewareHelper.get();
	let inputSearch;
	let setsDiv;
	const lazyLoadQueue = new LazyLoadQueue();
	let oldFeaturedOffset = 0, loadingOldFeatured = false;
	let readObserver;
	const renderSet = (set) => {
		const div = document.createElement("div");
		div.classList.add("sticker-set");
		const header = document.createElement("div");
		header.classList.add("sticker-set-header");
		const details = document.createElement("div");
		details.classList.add("sticker-set-details");
		details.innerHTML = "<div class=\"sticker-set-name\"></div>";
		setInnerHTML(details.firstElementChild, wrapEmojiText(set.title));
		const countDiv = document.createElement("div");
		countDiv.classList.add("sticker-set-count");
		countDiv.append(i18n("Stickers", [set.count]));
		details.append(countDiv);
		const button = document.createElement("button");
		button.classList.add("btn-primary", "btn-color-primary", "sticker-set-button");
		const added = isStickerSetAdded(set);
		button.append(i18n(added ? "Stickers.SearchAdded" : "Stickers.SearchAdd"));
		if (added) button.classList.add("gray");
		header.append(details, button);
		const stickersDiv = document.createElement("div");
		stickersDiv.classList.add("sticker-set-stickers");
		const count = Math.min(5, set.count);
		for (let i = 0; i < count; ++i) {
			const stickerDiv = document.createElement("div");
			stickerDiv.classList.add("sticker-set-sticker");
			stickersDiv.append(stickerDiv);
		}
		tab.managers.appStickersManager.getStickerSet(getStickerSetInputById(set)).then((set) => {
			if (!middleware()) return;
			for (let i = 0; i < count; ++i) {
				const div = stickersDiv.children[i];
				const doc = set.documents[i];
				if (doc._ === "documentEmpty") continue;
				wrapSticker({
					doc,
					div,
					lazyLoadQueue,
					group: "STICKERS-SEARCH",
					play: true,
					loop: true,
					width: 68,
					height: 68,
					withLock: true
				});
			}
		});
		div.dataset.stickerSet = "" + set.id;
		div.dataset.access_hash = "" + set.access_hash;
		div.dataset.title = set.title;
		div.append(header, stickersDiv);
		setsDiv.append(div);
		return div;
	};
	const getRenderedSet = (id) => {
		return setsDiv.querySelector(`.sticker-set[data-sticker-set="${id}"]`);
	};
	/**
	* Trending sets are shown — those not in the list yet rendered — as the user is to see them: each,
	* new or kept from before (a search's), is marked read once it is on the screen whole (as tdesktop's
	* readVisibleFeatured does); one read already the manager lets alone
	*/
	const renderFeaturedSets = (coveredSets) => {
		coveredSets.forEach((covered) => {
			const set = covered.set;
			readObserver.observe(getRenderedSet(set.id) || renderSet(set));
		});
	};
	const loadOldFeatured = () => {
		const offset = oldFeaturedOffset;
		if (inputSearch.value || loadingOldFeatured || offset === void 0) return;
		loadingOldFeatured = true;
		tab.managers.appStickersManager.getOldFeaturedStickers(offset).then(({ sets, nextOffset }) => {
			loadingOldFeatured = false;
			if (!middleware() || inputSearch.value || oldFeaturedOffset !== offset) return;
			oldFeaturedOffset = nextOffset;
			renderFeaturedSets(sets);
			tab.scrollable.checkForTriggers();
		}, () => {
			loadingOldFeatured = false;
		});
	};
	const filterRendered = (query, coveredSets) => {
		coveredSets = coveredSets.slice();
		const children = Array.from(setsDiv.children);
		forEachReverse(children, (el) => {
			const id = el.dataset.stickerSet;
			const index = coveredSets.findIndex((covered) => covered.set.id === id);
			if (index !== -1) coveredSets.splice(index, 1);
			else if (!query || !el.dataset.title.toLowerCase().includes(query.toLowerCase())) {
				readObserver.unobserve(el);
				el.remove();
			}
		});
		animationIntersector.checkAnimations(void 0, "STICKERS-SEARCH");
		return coveredSets;
	};
	const renderFeatured = () => {
		return tab.managers.appStickersManager.getFeaturedStickers().then((coveredSets) => {
			if (!middleware() || inputSearch.value) return;
			oldFeaturedOffset = 0;
			filterRendered("", coveredSets);
			renderFeaturedSets(coveredSets);
			tab.scrollable.checkForTriggers();
		});
	};
	const search = (query) => {
		if (!query) return renderFeatured();
		return tab.managers.appStickersManager.searchStickerSets(query, false).then((coveredSets) => {
			if (!middleware() || inputSearch.value !== query) return;
			coveredSets = filterRendered(query, coveredSets);
			coveredSets.forEach((set) => {
				renderSet(set.set);
			});
		});
	};
	onMount(() => {
		tab.container.id = "stickers-container";
		tab.container.classList.add("chatlist-container");
		inputSearch = new InputSearch({
			placeholder: "StickersTab.SearchPlaceholder",
			onChange: (value) => {
				search(value);
			}
		});
		tab.title.replaceWith(inputSearch.container);
		setsDiv = document.createElement("div");
		setsDiv.classList.add("sticker-sets");
		tab.scrollable.append(setsDiv);
		readObserver = new IntersectionObserver((entries) => {
			const ids = entries.filter((entry) => entry.intersectionRatio >= READ_VISIBLE_RATIO).map((entry) => {
				readObserver.unobserve(entry.target);
				return entry.target.dataset.stickerSet;
			});
			if (ids.length) tab.managers.appStickersManager.readFeaturedStickerSets(ids);
		}, {
			root: tab.scrollable.container,
			threshold: READ_VISIBLE_RATIO
		});
		tab.scrollable.onScrolledBottom = loadOldFeatured;
		attachMediaPeekListeners({
			listenTo: setsDiv,
			listenerSetter: tab.listenerSetter
		});
		attachClickEvent(setsDiv, (e) => {
			const sticker = findUpClassName(e.target, "sticker-set-sticker");
			if (sticker && appImManager.chat.peerId) {
				const docId = sticker.dataset.docId;
				appImManager.chat.input.sendMessageWithDocument({
					document: docId,
					target: sticker
				});
				return;
			}
			const target = findUpClassName(e.target, "sticker-set");
			if (!target) return;
			const id = target.dataset.stickerSet;
			const access_hash = target.dataset.access_hash;
			const button = findUpClassName(e.target, "sticker-set-button");
			const input = getStickerSetInputById({
				id,
				access_hash
			});
			if (button) {
				e.preventDefault();
				e.cancelBubble = true;
				button.setAttribute("disabled", "true");
				tab.managers.appStickersManager.getStickerSet(input).then((full) => {
					if (!full) throw makeError("UNKNOWN");
					return tab.managers.appStickersManager.toggleStickerSet(full.set).then((changed) => {
						if (changed) {
							button.textContent = "";
							const added = isStickerSetAdded(full.set);
							button.append(i18n(added ? "Stickers.SearchAdded" : "Stickers.SearchAdd"));
							button.classList.toggle("gray", added);
						}
					});
				}).catch((err) => {
					toastError(err, "toggle sticker set error");
				}).finally(() => {
					button.removeAttribute("disabled");
				});
			} else tab.managers.appStickersManager.getStickerSet(input).then((full) => {
				showStickersPopup(getStickerSetInputByStickerSet(full.set));
			});
		}, { listenerSetter: tab.listenerSetter });
		(tab.slider === appSidebarRight ? appSidebarRight.toggleSidebar(true) : Promise.resolve()).then(() => {
			renderFeatured();
		});
	});
	onCleanup(() => {
		readObserver?.disconnect();
		lazyLoadQueue.clear();
		setsDiv.replaceChildren();
		animationIntersector.checkAnimations(void 0, "STICKERS-SEARCH");
	});
	return null;
};
//#endregion
export { Stickers as default };
