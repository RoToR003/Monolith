//# allFunctionsCalledOnLoad
import "./app-BuFf8z8C.js";
import { t as themeController } from "./themeController-2cytOOn0.js";
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { u as langPack_default } from "./langPack-BmdJGr44.js";
import { A as mergeProps, C as createSignal, M as onCleanup, p as createComponent, s as Show, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { a as isSessionLeaving, i as getManagersSession } from "./getCurrentAccount-D0KQFbZ6.js";
import { n as bindManagersToSession } from "./bindManagersToAccount-BL82O9H9.js";
import { o as unwrap } from "./store-PwRn5fa3.js";
import { c as insert, g as template, o as className } from "./web-BPyQozky.js";
import { t as ListenerSetter } from "./listenerSetter-BER6qAXn.js";
import { t as Button } from "./buttonTsx-Bwphkm9r.js";
import { i as createPopup, n as PopupElement, o as usePopupContext } from "./indexTsx-v9mB9bAq.js";
import { m as ChatBackgroundStore, o as isSameWallPaper, r as getChatBackgroundFromFullPeer } from "./index-B7axFZql.js";
import { t as confirmationPopup } from "./confirmationPopup-Bz6mK0o-.js";
import { Jt as createWallPaperGrid, Kt as AppBackgroundTab, Yt as getWallPaperKey, qt as buildFromWallPapers } from "./appDialogsManager-CXguiKc3.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { r as toastNew } from "./toast-B6VD5M7R.js";
import showChatWallPaperPreviewPopup, { discardPickedWallPaper, t as chatWallPaper_module_default } from "./chatWallPaperPreview-D3SDP8gV.js";
//#region src/components/popups/chatWallPaper.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div>`);
/**
* Drops the chat's wallpaper once confirmed — or with `revert`, the one the other side set for both,
* putting this side's own back. False when it was not confirmed.
*/
async function resetChatWallPaper(peerId, managers, options = {}) {
	try {
		await confirmationPopup({
			descriptionLangKey: "RemoveWallpaperMessage",
			button: {
				langKey: "Reset",
				isDanger: true
			}
		});
	} catch (err) {
		return false;
	}
	managers.appThemesManager.setChatWallPaper(peerId, options).catch(() => {
		toastNew({ langPackKey: "Error.AnError" });
	});
	return true;
}
function Picker(props) {
	const context = usePopupContext();
	const { peerId, managers } = props;
	const listenerSetter = new ListenerSetter();
	const finish = () => {
		context.hide();
		props.onApplied?.();
	};
	const own = props.fullPeer?.wallpaper;
	const { theme } = getChatBackgroundFromFullPeer(props.fullPeer);
	const resetPaper = unwrap(themeController.getThemeWallpaper(theme ?? themeController.getTheme()));
	const ownVariesReset = !!own && !!resetPaper && getWallPaperKey(own) === getWallPaperKey(resetPaper) && !isSameWallPaper(own, resetPaper);
	let resetTile;
	const onReset = async () => {
		if (!own || resetPaper && isSameWallPaper(own, resetPaper)) {
			context.hide();
			return;
		}
		if (await resetChatWallPaper(peerId, managers)) finish();
	};
	const preview = (wallPaper, upload) => {
		showChatWallPaperPreviewPopup({
			peerId,
			wallPaper,
			upload,
			managers,
			onApplied: finish
		});
	};
	const wallPaperGrid = createWallPaperGrid({
		listenerSetter,
		onClick: (wallPaper, tile) => tile === resetTile ? onReset() : preview(wallPaper)
	});
	const [loaded, setLoaded] = createSignal(false);
	buildFromWallPapers((wallPapers) => {
		const keys = /* @__PURE__ */ new Set();
		const add = (wallPaper, label) => {
			const key = wallPaper && getWallPaperKey(wallPaper);
			if (!wallPaper || keys.has(key)) return;
			keys.add(key);
			return wallPaperGrid.add(wallPaper, true, label);
		};
		resetTile = resetPaper && add(resetPaper, langPack_default.format("Reset", true))?.container;
		if (ownVariesReset) keys.delete(getWallPaperKey(own));
		if (own) add(own);
		wallPapers.forEach((wallPaper) => {
			if (wallPaper.slug !== "pattern") add(wallPaper);
		});
		const active = own ?? resetPaper;
		if (active) wallPaperGrid.setActive(getWallPaperKey(active));
		setLoaded(true);
	});
	let disposed = false;
	const onUploadClick = () => {
		AppBackgroundTab.pickWallPaperFile(managers).then((picked) => {
			if (!picked) return;
			if (disposed) discardPickedWallPaper(picked.wallPaper, managers);
			else preview(picked.wallPaper, true);
		});
	};
	onCleanup(() => {
		disposed = true;
		listenerSetter.removeAll();
		wallPaperGrid.destroy();
	});
	return [createComponent(Section, {
		noShadow: true,
		get children() {
			return createComponent(Button, {
				"class": "btn-primary btn-transparent",
				icon: "cameraadd",
				text: "ChatBackground.UploadWallpaper",
				onClick: onUploadClick
			});
		}
	}), createComponent(Show, {
		get when() {
			return loaded();
		},
		get children() {
			var _el$ = _tmpl$();
			insert(_el$, () => wallPaperGrid.grid);
			createRenderEffect(() => className(_el$, `${chatWallPaper_module_default.grid} background-container`));
			return _el$;
		}
	})];
}
/**
* The wallpapers a private chat can take, tdesktop's BackgroundBox for one chat: its reset tile
* first, the one in use marked, a picked image or a tile previewed before it is applied.
*/
async function showChatWallPaperPopup(options) {
	const managers = bindManagersToSession(options.managers || rootScope.managers);
	const session = getManagersSession(managers);
	const wallPapersPromise = ChatBackgroundStore.getCachedWallPapers() ? void 0 : managers.appThemesManager.getWallPapers().catch(() => void 0);
	const fullPeer = await managers.appProfileManager.getProfileByPeerId(options.peerId).catch(() => void 0);
	const wallPapers = await wallPapersPromise;
	if (isSessionLeaving(session)) return;
	if (wallPapers) ChatBackgroundStore.setCachedWallPapers(wallPapers);
	if (options.middleware && !options.middleware()) return;
	createPopup(() => createComponent(PopupElement, {
		get ["class"]() {
			return chatWallPaper_module_default.popup;
		},
		managers,
		closable: true,
		get children() {
			return [createComponent(PopupElement.Header, { get children() {
				return [createComponent(PopupElement.CloseButton, {}), createComponent(PopupElement.Title, { title: "ChatBackground" })];
			} }), createComponent(PopupElement.Body, { get children() {
				return createComponent(PopupElement.Scrollable, { get children() {
					return createComponent(Picker, mergeProps(options, {
						fullPeer,
						managers
					}));
				} });
			} })];
		}
	}));
}
//#endregion
export { showChatWallPaperPopup as default, resetChatWallPaper };
