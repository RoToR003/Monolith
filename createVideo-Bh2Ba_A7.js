//# allFunctionsCalledOnLoad
import { n as __exportAll } from "./rolldown-runtime-CwcJO0Gh.js";
import { f as DEBUG } from "./userAgent-ByGXcznk.js";
import { t as apiManagerProxy } from "./apiManagerProxy-DmQXvxSF.js";
import { n as logger } from "./logger-7zf0rNYS.js";
import { t as __vitePreload } from "./preload-helper-B0NHKCoo.js";
import { r as getCurrentAccount } from "./getCurrentAccount-D0KQFbZ6.js";
import { n as getHeavyAnimationPromise } from "./useHeavyAnimationCheck-sWeBPI3f.js";
import { t as clearMediaElementSource } from "./clearMediaElementSource-CfCKljUR.js";
import { t as assumeType } from "./assumeType-CmXHXz9E.js";
//#region src/lib/hls/common.ts
var QUALITY_FILE_MIME_TYPE = "application/x-mpegurl";
var log = logger("HLS");
logger("SW-HLS");
function isDocumentHlsQualityFile(doc) {
	assumeType(doc);
	return doc?.mime_type === QUALITY_FILE_MIME_TYPE;
}
//#endregion
//#region src/lib/hls/hlsInstancesByVideo.ts
var hlsInstancesByVideo = /* @__PURE__ */ new WeakMap();
//#endregion
//#region src/lib/hls/initVideoHls.ts
async function initVideoHls({ video, src, middleware }) {
	const { default: Hls } = await __vitePreload(async () => {
		const { default: Hls } = await import("./hls-DDBOJHa_.js");
		return { default: Hls };
	}, []);
	log("initing video hls", src);
	const hls = new Hls({
		debug: DEBUG,
		startLevel: 0,
		testBandwidth: false,
		backBufferLength: 30,
		maxBufferLength: 60,
		maxMaxBufferLength: 60,
		maxFragLookUpTolerance: .001,
		maxBufferHole: 1,
		nudgeMaxRetry: 1e4
	});
	hlsInstancesByVideo.set(video, hls);
	hls.loadSource(src);
	hls.attachMedia(video);
	middleware?.onDestroy(() => {
		log("destroying Hls instance for video", src);
		hls.destroy();
	});
}
//#endregion
//#region src/helpers/dom/createVideo.ts
var createVideo_exports = /* @__PURE__ */ __exportAll({ default: () => createVideo });
function updateStreamInUse(url, inUse, accountNumber) {
	if (url.includes("stream/")) apiManagerProxy.serviceMessagePort?.invokeVoid("toggleStreamInUse", {
		url,
		inUse,
		accountNumber
	});
}
function createVideo({ pip, middleware }) {
	const video = document.createElement("video");
	if (!pip) video.disablePictureInPicture = true;
	video.setAttribute("playsinline", "true");
	middleware?.onDestroy(async () => {
		await getHeavyAnimationPromise();
		clearMediaElementSource(video);
	});
	let originalSrc = video.src;
	let srcAccountNumber = getCurrentAccount();
	Object.defineProperty(video, "src", {
		get: () => {
			return originalSrc;
		},
		set: (newValue) => {
			updateStreamInUse(originalSrc, false, srcAccountNumber);
			srcAccountNumber = getCurrentAccount();
			updateStreamInUse(newValue, true, srcAccountNumber);
			originalSrc = newValue;
			if (newValue.startsWith("hls/")) initVideoHls({
				video,
				src: newValue,
				middleware
			});
			else video.setAttribute("src", newValue);
		}
	});
	return video;
}
//#endregion
export { isDocumentHlsQualityFile as i, createVideo_exports as n, hlsInstancesByVideo as r, createVideo as t };
