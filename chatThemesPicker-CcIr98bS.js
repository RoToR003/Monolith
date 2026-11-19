//# allFunctionsCalledOnLoad
import { l as IS_SAFARI } from "./userAgent-ByGXcznk.js";
import { t as findUpClassName } from "./findUpClassName-3V5me58N.js";
import { t as themeController } from "./themeController-2cytOOn0.js";
import { t as noop } from "./noop-H9NNBLfX.js";
import { t as Icon } from "./icon-DbP6Es97.js";
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { a as i18n, u as langPack_default } from "./langPack-BmdJGr44.js";
import { M as onCleanup, b as createResource, g as createEffect, j as on, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { n as bindManagersToSession } from "./bindManagersToAccount-BL82O9H9.js";
import { a as blendWallpaperForTinted, n as DEFAULT_THEME, s as getCloudThemeWallpaper } from "./state-JPIG5PpJ.js";
import { _ as use, g as template, o as className } from "./web-BPyQozky.js";
import { t as liteMode } from "./liteMode-DeLStZfQ.js";
import { t as ListenerSetter } from "./listenerSetter-BER6qAXn.js";
import { t as isDocumentRTL } from "./isDocumentRTL-z8ksM2Dv.js";
import { n as attachClickEvent } from "./clickEvent-COk4YpLP.js";
import { a as wrapSticker, o as createMiddleware } from "./sticker-5twBOy1Y.js";
import { Gt as getPeerTitle, M as avatarNew } from "./confirmationPopup-Bz6mK0o-.js";
import { W as createSerializedQueue } from "./getChatMigratedTo-ChhMNXuu.js";
import { n as wrapEmojiText } from "./wrapEmojiText-DT39R5Tj.js";
import { Kt as AppBackgroundTab } from "./appDialogsManager-CXguiKc3.js";
import { n as ScrollableX } from "./scrollable-C2-FwBtK.js";
import { r as attachPickerGrid, t as useBaseTheme } from "./useBaseTheme-kxtvTIO1.js";
import { t as wrapStickerEmoji } from "./stickerEmoji-Ccji1LLa.js";
//#region src/components/chatThemesPicker.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div>`);
var AVAILABLE_BASE_THEMES = /* @__PURE__ */ new Set([
	"baseThemeClassic",
	"baseThemeNight",
	"baseThemeDay",
	"baseThemeTinted"
]);
var BASE_THEME_TO_THEME_NAME = {
	baseThemeClassic: "day",
	baseThemeNight: "night",
	baseThemeDay: "light",
	baseThemeTinted: "tinted"
};
var EMOTICON_SIZE = 49;
/**
* A cloud theme as it looks on `base`, whatever the app's own theme is: its settings for that base
* (or the night / classic ones), and the name `themeController.applyTheme` lands back on them by.
*/
function pinThemeToBase(theme, base) {
	const isNight = base === "baseThemeNight" || base === "baseThemeTinted";
	const entry = theme.settings?.find((s) => s.base_theme._ === base) ?? theme.settings?.find((s) => s.base_theme._ === (isNight ? "baseThemeNight" : "baseThemeClassic")) ?? theme.settings?.[0];
	const effectiveBase = entry?.base_theme._ ?? base;
	return {
		...theme,
		name: BASE_THEME_TO_THEME_NAME[effectiveBase] ?? (isNight ? "night" : "day"),
		settings: entry ? [entry] : theme.settings
	};
}
/**
* Horizontal-scrollable strip of cloud chat themes (emoji-on-wallpaper tiles).
*
* Lifted out of `generalSettings.tsx`'s `ThemeSection` so the My QR popup can
* share the exact same tiles without dragging in `themeController.applyNewTheme`
* side effects. The component is pure-UI: selection state is owned externally
* via `selectedId` + `onSelect`; clicking a tile only animates and emits — it's
* up to the caller to apply the theme globally if that's what they want.
*
* Mirrors the legacy picker's behaviour:
*  - First tile is `DEFAULT_THEME` (the "no custom theme" sentinel, id === '').
*  - Each cloud theme renders its wallpaper for the active base + its emoticon
*    as a Lottie sticker that scales-pulse-restores on click.
*  - Wallpaper variants are pre-blended for `baseThemeTinted` on non-curated
*    themes, matching `themeController.applyNewTheme`'s preview path.
*
* A chat's theme picker passes its own `items` instead: a tile for no theme, the gifts that can
* be a theme (their model in place of the emoticon) and the emoticon themes.
*/
function ChatThemesPicker(props) {
	const middleware = createMiddleware().get();
	const managers = bindManagersToSession(rootScope.managers);
	const themesMap = /* @__PURE__ */ new Map();
	const tilesById = /* @__PURE__ */ new Map();
	let lastOnFrameNo;
	const appBaseTheme = useBaseTheme();
	const getBaseTheme = () => props.baseTheme?.() ?? appBaseTheme();
	const applyThemeOnItem = (themeItem) => {
		const theme = themeItem.item.theme;
		if (!theme) return;
		const base = getBaseTheme();
		const isNight = base === "baseThemeNight" || base === "baseThemeTinted";
		themeController.applyTheme(pinThemeToBase(theme, base), themeItem.container);
		themeItem.container.querySelector(".background-item")?.remove();
		const wallPaperContainer = themeItem.wallPaperContainers[base] ?? themeItem.wallPaperContainers[isNight ? "baseThemeNight" : "baseThemeClassic"];
		if (wallPaperContainer) themeItem.container.prepend(wallPaperContainer);
	};
	const scrollable = new ScrollableX(null);
	scrollable.container.classList.add("themes-container");
	scrollable.container.setAttribute("role", "toolbar");
	scrollable.container.setAttribute("aria-label", langPack_default.format("ColorTheme", true));
	const detachPickerGrid = attachPickerGrid(scrollable.container, ".theme-container", (container) => {
		const item = themesMap.get(container)?.item;
		if (item?.label) return langPack_default.format(item.label, true);
		return item?.theme?.emoticon || item?.theme?.title || langPack_default.format("ThemeDay", true);
	});
	const setActive = (container, active) => {
		container.classList.toggle("active", active);
		container.setAttribute("aria-pressed", String(active));
	};
	if (!props.shownWhenReady) {
		scrollable.container.style.opacity = "0";
		scrollable.container.style.transition = "opacity .2s ease";
	}
	const [themesPromise] = createResource(() => props.items ? void 0 : managers.appThemesManager.getThemes());
	const items = () => {
		if (props.items) return props.items();
		const themes = themesPromise();
		if (!themes) return;
		const defaultThemes = themes.filter((theme) => theme.pFlags.default);
		defaultThemes.unshift(DEFAULT_THEME);
		return defaultThemes.map((theme) => ({
			id: String(theme.id ?? ""),
			theme
		}));
	};
	const buildTile = async (item) => {
		const container = document.createElement("div");
		const themeItem = {
			container,
			item,
			wallPaperContainers: {},
			disposers: []
		};
		const { theme } = item;
		themesMap.set(container, themeItem);
		tilesById.set(item.id, themeItem);
		const themeId = String(theme?.id ?? "");
		const isCurated = themeId === "" || themeId.startsWith("preset:");
		const blend = props.blendTinted !== false && !isCurated;
		theme?.settings.filter((themeSettings) => AVAILABLE_BASE_THEMES.has(themeSettings.base_theme._)).forEach((themeSettings) => {
			const wp = themeSettings.base_theme._ === "baseThemeTinted" && blend && themeSettings.wallpaper ? blendWallpaperForTinted(themeSettings.wallpaper, themeSettings.accent_color) : getCloudThemeWallpaper(theme, themeSettings);
			const result = AppBackgroundTab.addWallPaper(wp, void 0, themeSettings.base_theme._);
			if (!result) return;
			themeItem.wallPaperContainers[themeSettings.base_theme._] = result.container;
			themeItem.disposers.push(result.dispose);
		});
		if (theme && !themeItem.wallPaperContainers["baseThemeTinted"] && blend) {
			const nightEntry = theme.settings.find((s) => s.base_theme._ === "baseThemeNight");
			if (nightEntry?.wallpaper) {
				const blendedWp = blendWallpaperForTinted(nightEntry.wallpaper, nightEntry.accent_color);
				const result = AppBackgroundTab.addWallPaper(blendedWp, void 0, "baseThemeTinted");
				if (result) {
					themeItem.wallPaperContainers["baseThemeTinted"] = result.container;
					themeItem.disposers.push(result.dispose);
				}
			}
		}
		applyThemeOnItem(themeItem);
		setActive(container, item.id === props.selectedId());
		const loadPromises = [];
		let emoticonContainer;
		const emoticon = item.emoticon ?? theme?.emoticon;
		if (item.sticker || emoticon) {
			emoticonContainer = document.createElement("div");
			emoticonContainer.classList.add("theme-emoticon");
			const setPlayer = (player) => {
				themeItem.player = player;
			};
			if (item.sticker) wrapSticker({
				doc: item.sticker,
				div: emoticonContainer,
				width: EMOTICON_SIZE,
				height: EMOTICON_SIZE,
				middleware,
				loadPromises,
				play: false,
				loop: false,
				group: "none"
			}).then(({ render }) => render).then(setPlayer, noop);
			else wrapStickerEmoji({
				div: emoticonContainer,
				width: EMOTICON_SIZE,
				height: EMOTICON_SIZE,
				emoji: emoticon,
				managers,
				loadPromises,
				middleware,
				play: false,
				group: "none"
			}).then(({ render }) => render).then(setPlayer, () => {
				emoticonContainer.classList.add("is-static");
				emoticonContainer.replaceChildren(wrapEmojiText(emoticon));
			});
		}
		container.classList.add("theme-container");
		await Promise.all(loadPromises).catch(noop);
		if (item.label) {
			container.classList.add("is-empty");
			const label = i18n(item.label);
			label.classList.add("theme-label");
			container.append(label);
		}
		if (emoticonContainer) container.append(emoticonContainer);
		if (theme) {
			const bubble = document.createElement("div");
			bubble.classList.add("theme-bubble");
			const bubbleIn = bubble.cloneNode();
			bubbleIn.classList.add("is-in");
			bubble.classList.add("is-out");
			if (item.takenBy) {
				const avatar = avatarNew({
					middleware,
					peerId: item.takenBy,
					size: 16,
					isDialog: false
				});
				avatar.render();
				avatar.node.classList.add("theme-bubble-avatar");
				bubbleIn.classList.add("is-taken");
				bubbleIn.append(avatar.node, Icon("forward", "theme-bubble-icon"));
				getPeerTitle({
					peerId: item.takenBy,
					plainText: true
				}).then((title) => {
					container.setAttribute("aria-description", title);
				});
			}
			container.append(bubbleIn, bubble);
		}
		return themeItem;
	};
	const disposeTile = (themeItem) => {
		themeItem.container.remove();
		themeItem.disposers.forEach((dispose) => dispose());
		tilesById.delete(themeItem.item.id);
		themesMap.delete(themeItem.container);
	};
	const checkLoadMore = () => {
		const id = props.loadMoreAfter?.();
		const container = id !== void 0 && tilesById.get(id)?.container;
		if (!container?.isConnected) return;
		const tile = container.getBoundingClientRect();
		const strip = scrollable.container.getBoundingClientRect();
		if ((isDocumentRTL() ? strip.left - tile.right : tile.left - strip.right) < strip.width) props.onLoadMore?.();
	};
	let revealed = false;
	const syncTiles = async (list) => {
		await managers.appStickersManager.getAnimatedEmojiStickerSet().catch(noop);
		if (!middleware()) return;
		await Promise.all(list.filter((item) => !tilesById.has(item.id)).map(buildTile));
		if (!middleware()) return;
		const parent = scrollable.container;
		const ids = new Set(list.map((item) => item.id));
		tilesById.forEach((themeItem, id) => {
			if (!ids.has(id)) disposeTile(themeItem);
		});
		let previous;
		for (const item of list) {
			const { container } = tilesById.get(item.id);
			const next = previous ? previous.nextElementSibling : parent.firstElementChild;
			if (next !== container) parent.insertBefore(container, next);
			previous = container;
		}
		if (!revealed) {
			revealed = true;
			if (!props.shownWhenReady) requestAnimationFrame(() => {
				scrollable.container.style.opacity = "1";
			});
			props.onReady?.();
		}
		checkLoadMore();
	};
	const syncs = createSerializedQueue();
	createEffect(on(items, (list) => {
		if (list) syncs.enqueue(() => syncTiles(list)).catch(noop);
	}));
	if (props.onLoadMore) {
		scrollable.onAdditionalScroll = checkLoadMore;
		scrollable.setListeners();
	}
	createEffect(() => {
		const id = props.selectedId();
		themesMap.forEach((themeItem) => setActive(themeItem.container, themeItem.item.id === id));
	});
	createEffect(on(getBaseTheme, () => {
		themesMap.forEach((themeItem) => applyThemeOnItem(themeItem));
		if (props.recenterOnBaseChange) {
			const active = scrollable.container.querySelector(".active");
			if (active) scrollable.scrollIntoViewNew({
				element: active,
				position: "center",
				axis: "x"
			});
		}
	}, { defer: true }));
	const listenerSetter = new ListenerSetter();
	attachClickEvent(scrollable.container, async (e) => {
		const container = findUpClassName(e.target, "theme-container");
		if (!container) return;
		const themeItem = themesMap.get(container);
		if (!themeItem) return;
		props.onSelect(themeItem.item.theme, themeItem.item);
		lastOnFrameNo?.(-1);
		const { player } = themeItem;
		if (!player || !liteMode.isAvailable("motion")) return;
		if (IS_SAFARI) {
			if (player.paused) player.restart();
			return;
		}
		if (player.paused) player.stop(true);
		player.el[0].style.transform = "scale(2)";
		const onFrameNo = lastOnFrameNo = (frameNo) => {
			if (player.maxFrame === frameNo || frameNo === -1) {
				player.el[0].style.transform = "";
				player.removeEventListener("enterFrame", onFrameNo);
				if (lastOnFrameNo === onFrameNo) lastOnFrameNo = void 0;
			}
		};
		setTimeout(() => {
			if (lastOnFrameNo !== onFrameNo) return;
			player.play();
			player.addEventListener("enterFrame", onFrameNo);
		}, 250);
	}, { listenerSetter });
	onCleanup(() => {
		scrollable.removeListeners();
		detachPickerGrid();
		listenerSetter.removeAll();
		tilesById.forEach(disposeTile);
	});
	return (() => {
		var _el$ = _tmpl$();
		use((el) => {
			el.append(scrollable.container);
			const ref = props.ref;
			if (typeof ref === "function") ref(el);
		}, _el$);
		createRenderEffect(() => className(_el$, props.class));
		return _el$;
	})();
}
//#endregion
export { ChatThemesPicker as t };
