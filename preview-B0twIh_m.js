//# allFunctionsCalledOnLoad
import { l as IS_SAFARI } from "./userAgent-ByGXcznk.js";
import { t as noop } from "./noop-H9NNBLfX.js";
import { rt as IS_H265_SUPPORTED, t as apiManagerProxy } from "./apiManagerProxy-DmQXvxSF.js";
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { a as i18n } from "./langPack-BmdJGr44.js";
import { A as mergeProps, C as createSignal, M as onCleanup, g as createEffect, j as on } from "./solid-9Vxm0VIz.js";
import { n as deferredPromise } from "./cancellablePromise-bof--dnO.js";
import { o as unwrap } from "./store-PwRn5fa3.js";
import { n as hotListen, t as hotEffect } from "./hotModule-aCRkP77w.js";
import { _ as use, g as template, m as spread } from "./web-BPyQozky.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { o as useAppSettings, t as liteMode } from "./liteMode-DeLStZfQ.js";
import { o as createMiddleware } from "./sticker-5twBOy1Y.js";
import { t as appDownloadManager } from "./appDownloadManager-ClHW2-Dl.js";
import { t as choosePhotoSize } from "./choosePhotoSize-VRMYg-1A.js";
import { Et as usePremium, vn as wrapPhoto } from "./confirmationPopup-Bz6mK0o-.js";
import { n as wrapVideo } from "./video-ByfiTxvV.js";
import { t as showFeatureDetailsPopup } from "./featureDetails-CneJjJj-.js";
import { n as createFeatureDetailsIconSticker } from "./untrackActions-C9U0KjUP.js";
var preview_module_default = { Unsupported: "_Unsupported_1hosw_1" };
//#endregion
//#region src/components/stories/quality.ts
var STORY_QUALITY_ICON = "image_original";
function isStoryHighQuality(peerId, storyItem) {
	if (peerId === rootScope.myId || storyItem.pFlags.out) return true;
	const [appSettings] = useAppSettings();
	return usePremium()() && appSettings.stories.highQuality;
}
function getStoryVideoDocuments(media, highQuality) {
	const doc = media.document;
	const altDoc = media.alt_documents?.[0];
	return altDoc && !highQuality ? { doc: altDoc } : {
		doc,
		altDoc
	};
}
function showStoryQualityUpgradePopup(onClose) {
	showFeatureDetailsPopup({
		sticker: { element: createFeatureDetailsIconSticker(STORY_QUALITY_ICON, "background-gradient-stories") },
		title: i18n("Story.UpgradeQuality.Title"),
		subtitle: i18n("Story.UpgradeQuality.Text"),
		rows: [],
		buttons: [{
			text: i18n("Story.UpgradeQuality.Action"),
			onClick: () => {
				hotReloadGuard.showPremiumPopup({ feature: "stories" });
			}
		}],
		onClose
	});
}
//#endregion
//#region src/components/stories/preview.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div>`);
var processing = false;
var pollStories = () => {
	if (processing) return;
	const promises = [];
	wrappedStories.forEach((map, peerId) => {
		const ids = [...map.keys()];
		const promise = rootScope.managers.appStoriesManager.getStoriesById(peerId, ids, true).then(() => {
			ids.forEach((id) => {
				if (!map.get(id).mounted) {
					map.delete(id);
					if (!map.size) wrappedStories.delete(peerId);
				}
			});
		});
		promises.push(promise);
	});
	Promise.all(promises).then(() => {
		processing = false;
	});
};
var wrappedStories = /* @__PURE__ */ new Map();
window.wrappedStories = wrappedStories;
hotEffect(void 0, () => {
	const interval = setInterval(pollStories, 3e5);
	return () => clearInterval(interval);
});
var prefetchedStreams = /* @__PURE__ */ new Set();
hotListen(void 0, rootScope, "account_switched", () => {
	wrappedStories.clear();
	prefetchedStreams.clear();
});
var readyToPaint = (element) => {
	if (!(element instanceof HTMLImageElement)) return;
	element.decoding = "sync";
	return element.decode().catch(noop);
};
var getViewerPhotoSize = (photo) => choosePhotoSize(photo, Infinity, Infinity);
var preloadStoryMedia = async (peerId, storyItem) => {
	const media = unwrap(storyItem.media);
	if (media?._ === "messageMediaPhoto") {
		const photo = media.photo;
		if (photo?._ === "photo") await appDownloadManager.downloadMediaURL({
			media: photo,
			thumb: getViewerPhotoSize(photo)
		});
		return;
	}
	if (media?._ !== "messageMediaDocument") return;
	const { doc, altDoc } = getStoryVideoDocuments(media, isStoryHighQuality(peerId, storyItem));
	if (!doc?.supportsStreaming) return;
	for (const _doc of altDoc && !IS_H265_SUPPORTED ? [doc, altDoc] : [doc]) {
		const url = apiManagerProxy.getCacheContext(_doc).url;
		if (!url || prefetchedStreams.has(url)) continue;
		prefetchedStreams.add(url);
		try {
			const response = await fetch(url, { headers: { Range: "bytes=0-" } });
			response.body?.cancel().catch(noop);
			if (!response.ok) prefetchedStreams.delete(url);
		} catch {
			prefetchedStreams.delete(url);
		}
	}
};
var preloadStoriesMedia = async (stories, middleware) => {
	for (const { peerId, storyItem } of stories) {
		if (!middleware()) return;
		await preloadStoryMedia(peerId, storyItem).catch(noop);
	}
};
var wrapStoryMedia = (props) => {
	const [thumb, setThumb] = createSignal();
	const [media, setMedia] = createSignal();
	const [ready, setReady] = createSignal(false);
	let map = wrappedStories.get(props.peerId);
	if (!map) wrappedStories.set(props.peerId, map = /* @__PURE__ */ new Map());
	let c = map.get(props.storyItem.id);
	if (!c) map.set(props.storyItem.id, c = { mounted: 0 });
	++c.mounted;
	onCleanup(() => {
		--c.mounted;
	});
	const messageMedia = unwrap(props.storyItem.media);
	const middleware = createMiddleware().get();
	let div;
	const container = (() => {
		var _el$ = _tmpl$();
		var _ref$ = div;
		typeof _ref$ === "function" ? use(_ref$, _el$) : div = _el$;
		spread(_el$, mergeProps(() => props.containerProps || {}), false, false);
		return _el$;
	})();
	const setChildrenClassName = (wrapped, className) => {
		[wrapped.images.thumb, wrapped.images.full].filter(Boolean).forEach((image) => {
			image.classList.add(className);
		});
	};
	const wrappers = {
		photo: (messageMedia) => {
			const photo = messageMedia.document || messageMedia.photo;
			const result = wrapPhoto({
				...props,
				container: div,
				photo,
				middleware,
				...props.forPreview && {
					...props.noAspecter && { size: choosePhotoSize(photo, 150, 200) },
					useRenderCache: false
				},
				...props.forViewer && {
					size: getViewerPhotoSize(photo),
					useRenderCache: false
				},
				withoutPreloader: !props.withPreloader
			});
			result.then(async (result) => {
				if (!middleware()) return;
				if (props.childrenClassName) setChildrenClassName(result, props.childrenClassName);
				if (props.forViewer && result.images.full instanceof HTMLImageElement) result.images.full.decoding = "sync";
				await result.loadPromises.thumb;
				if (!middleware()) return;
				if (props.forViewer) {
					await readyToPaint(result.images.thumb || result.images.full);
					if (!middleware()) return;
				}
				setThumb(result.images.thumb);
				setReady(true);
				await result.loadPromises.full;
				if (!middleware()) return;
				setMedia(result.images.full);
			});
			return result;
		},
		video: (messageMedia) => {
			const { doc: document, altDoc: altDocument } = getStoryVideoDocuments(messageMedia, props.highQuality ?? true);
			const result = wrapVideo({
				...props,
				container: div,
				doc: document,
				altDoc: altDocument,
				middleware,
				...props.forViewer && {
					noInfo: true,
					noAutoplayAttribute: true
				},
				...props.forPreview && {
					...props.noAspecter && { photoSize: choosePhotoSize(document, 200, 200, false) },
					onlyPreview: true
				},
				withoutPreloader: !props.withPreloader
			});
			result.then(async (result) => {
				if (!middleware()) return;
				if (props.childrenClassName) {
					if (result?.thumb) setChildrenClassName(result.thumb, props.childrenClassName);
					if (result?.video) result.video.classList.add(props.childrenClassName);
				}
				if (result?.thumb) await result.thumb.loadPromises.thumb;
				if (!middleware()) return;
				const thumb = result?.thumb && (result.thumb.images.full || result.thumb.images.thumb);
				if (props.forViewer) {
					await readyToPaint(thumb);
					if (!middleware()) return;
				}
				if (thumb) setThumb(thumb);
				setReady(true);
				const video = result?.video;
				if (video && props.forViewer) {
					video.loop = false;
					video.muted = true;
					if (thumb && !video.parentElement && liteMode.isAvailable("animations")) video.classList.add("fade-in");
					if (IS_SAFARI) video.load();
				}
				await result?.loadPromise;
				if (!middleware()) return;
				setMedia(video);
			});
			return result;
		},
		unsupported: () => {
			const placeholder = document.createElement("div");
			placeholder.classList.add(preview_module_default.Unsupported);
			if (props.forViewer) placeholder.append(i18n("Story.Unsupported"));
			div.append(placeholder);
			queueMicrotask(() => {
				if (!middleware()) return;
				setReady(true);
				if (props.forViewer) setMedia(placeholder);
			});
		}
	};
	let mediaResult, unsupported = false;
	switch (messageMedia._) {
		case "messageMediaPhoto":
			mediaResult = wrappers.photo(messageMedia);
			break;
		case "messageMediaDocument":
			mediaResult = wrappers.video(messageMedia);
			break;
		default:
			unsupported = true;
			wrappers.unsupported();
	}
	return {
		container,
		div,
		media,
		mediaResult,
		thumb,
		ready,
		unsupported
	};
};
var StoryPreview = (props) => {
	let { loadPromises } = props;
	if (loadPromises) delete props.loadPromises;
	const loadPromise = loadPromises && deferredPromise();
	loadPromises?.push(loadPromise);
	loadPromises = void 0;
	const [storyItem, setStoryItem] = createSignal(void 0, { equals: false });
	const [f, setF] = createSignal();
	rootScope.managers.acknowledged.appStoriesManager.getStoryById(props.peerId, props.storyId).then(async (result) => {
		if (!result.cached) loadPromise?.resolve();
		const storyItem = await result.result;
		setStoryItem(storyItem);
	});
	const onStoryItem = (storyItem) => {
		if (!storyItem) {
			props.onExpiredStory?.();
			loadPromise.resolve();
			return;
		}
		onCleanup(() => {
			loadPromise?.reject();
		});
		const { container, ready } = wrapStoryMedia({
			...props,
			storyItem,
			forPreview: true
		});
		createEffect(on(() => ready(), () => {
			loadPromise?.resolve();
			setF(container);
		}, { defer: true }));
	};
	createEffect(on(() => storyItem(), onStoryItem, { defer: true }));
	return f;
};
//#endregion
export { getStoryVideoDocuments as a, STORY_QUALITY_ICON as i, preloadStoriesMedia as n, isStoryHighQuality as o, wrapStoryMedia as r, showStoryQualityUpgradePopup as s, StoryPreview as t };
