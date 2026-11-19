//# allFunctionsCalledOnLoad
import { p as MOUNT_CLASS_TO } from "./userAgent-ByGXcznk.js";
import { t as EventListenerBase } from "./eventListenerBase-da40Q-0t.js";
import { i as onAppWindowChange, n as getAppWindow } from "./appWindow-bo-KtJhy.js";
import { n as createStore } from "./store-PwRn5fa3.js";
//#region src/helpers/calcImageInBox.ts
function calcImageInBox(imageW, imageH, boxW, boxH, noZoom = true) {
	if (imageW < boxW && imageH < boxH && noZoom) return makeMediaSize(imageW, imageH);
	let boxedImageW = boxW;
	let boxedImageH = boxH;
	if (imageW / imageH > boxW / boxH) boxedImageH = imageH * boxW / imageW | 0;
	else {
		boxedImageW = imageW * boxH / imageH | 0;
		if (boxedImageW > boxW) {
			boxedImageH = boxedImageH * boxW / boxedImageW | 0;
			boxedImageW = boxW;
		}
	}
	if (noZoom && boxedImageW >= imageW && boxedImageH >= imageH) {
		boxedImageW = imageW;
		boxedImageH = imageH;
	}
	return makeMediaSize(boxedImageW, boxedImageH);
}
MOUNT_CLASS_TO.calcImageInBox = calcImageInBox;
//#endregion
//#region src/helpers/mediaSize.ts
var MediaSize = class {
	constructor(width = 0, height = width) {
		this.width = width;
		this.height = height;
	}
	aspect(boxSize, fitted) {
		return calcImageInBox(this.width, this.height, boxSize.width, boxSize.height, fitted);
	}
	aspectFitted(boxSize) {
		return this.aspect(boxSize, true);
	}
	aspectCovered(boxSize) {
		return this.aspect(boxSize, false);
	}
};
function makeMediaSize(width, height) {
	return new MediaSize(width, height);
}
//#endregion
//#region src/helpers/mediaSizes.ts
var ScreenSize = /* @__PURE__ */ function(ScreenSize) {
	ScreenSize[ScreenSize["mobile"] = 0] = "mobile";
	ScreenSize[ScreenSize["medium"] = 1] = "medium";
	ScreenSize[ScreenSize["large"] = 2] = "large";
	return ScreenSize;
}({});
var MOBILE_SIZE = 600;
var FLOATING_LEFT_SIDEBAR_SIZE = 925;
var LARGE_SIZE = 1680;
var CUSTOM_EMOJI_SIZE = makeMediaSize(20, 20);
var ESG_CUSTOM_EMOJI_SIZE = makeMediaSize(36, 36);
var EMOJI_STATUS_SIZE = makeMediaSize(18, 18);
var [store, setStore] = createStore({
	isMobile: false,
	isFloatingLeftSidebar: false,
	isLessThanFloatingLeftSidebar: false,
	active: void 0,
	activeScreen: void 0
});
var MediaSizes = class extends EventListenerBase {
	constructor() {
		super();
		this.screenSizes = [
			{
				key: 0,
				value: MOBILE_SIZE
			},
			{
				key: 1,
				value: FLOATING_LEFT_SIDEBAR_SIZE
			},
			{
				key: 2,
				value: LARGE_SIZE
			}
		];
		this.sizes = {
			handhelds: {
				regular: makeMediaSize(340, 340),
				webpage: makeMediaSize(340, 200),
				album: makeMediaSize(340, 0),
				esgSticker: makeMediaSize(68, 68),
				animatedSticker: makeMediaSize(180, 180),
				staticSticker: makeMediaSize(180, 180),
				emojiSticker: makeMediaSize(112, 112),
				poll: makeMediaSize(240, 0),
				round: makeMediaSize(240, 240),
				documentName: makeMediaSize(200, 0),
				invoice: makeMediaSize(340, 340),
				extendedInvoice: makeMediaSize(340, 340),
				customEmoji: CUSTOM_EMOJI_SIZE,
				esgCustomEmoji: ESG_CUSTOM_EMOJI_SIZE,
				emojiStatus: EMOJI_STATUS_SIZE,
				popupSticker: makeMediaSize(68, 68)
			},
			desktop: {
				regular: makeMediaSize(420, 400),
				webpage: makeMediaSize(420, 380),
				album: makeMediaSize(420, 0),
				esgSticker: makeMediaSize(72, 72),
				animatedSticker: makeMediaSize(200, 200),
				staticSticker: makeMediaSize(200, 200),
				emojiSticker: makeMediaSize(112, 112),
				poll: makeMediaSize(330, 0),
				round: makeMediaSize(280, 280),
				documentName: makeMediaSize(240, 0),
				invoice: makeMediaSize(320, 320),
				extendedInvoice: makeMediaSize(420, 400),
				customEmoji: CUSTOM_EMOJI_SIZE,
				esgCustomEmoji: ESG_CUSTOM_EMOJI_SIZE,
				emojiStatus: EMOJI_STATUS_SIZE,
				popupSticker: makeMediaSize(80, 80)
			}
		};
		this.isMobile = false;
		this.isFloatingLeftSidebar = false;
		this.isLessThanFloatingLeftSidebar = false;
		this.handleResize = () => {
			const innerWidth = this.win.innerWidth;
			let activeScreen = this.screenSizes[0].key;
			for (let i = this.screenSizes.length - 1; i >= 0; --i) if (this.screenSizes[i].value < innerWidth) {
				activeScreen = (this.screenSizes[i + 1] || this.screenSizes[i]).key;
				break;
			}
			const wasScreen = this.activeScreen;
			const isMobile = activeScreen === 0;
			const isLessThanFloatingLeftSidebar = innerWidth <= FLOATING_LEFT_SIDEBAR_SIZE;
			this.activeScreen = activeScreen;
			this.isMobile = isMobile;
			this.isLessThanFloatingLeftSidebar = isLessThanFloatingLeftSidebar;
			this.isFloatingLeftSidebar = activeScreen === 1 && isLessThanFloatingLeftSidebar;
			this.active = isMobile ? this.sizes.handhelds : this.sizes.desktop;
			setStore({
				isMobile: this.isMobile,
				isFloatingLeftSidebar: this.isFloatingLeftSidebar,
				isLessThanFloatingLeftSidebar: this.isLessThanFloatingLeftSidebar,
				active: this.active,
				activeScreen: this.activeScreen
			});
			if (wasScreen !== activeScreen) {
				if (wasScreen !== void 0) this.dispatchEvent("changeScreen", wasScreen, activeScreen);
			}
			if (wasScreen !== void 0) this.dispatchEvent("resize");
		};
		this.onWinResize = () => {
			if (this.rAF) this.win.cancelAnimationFrame(this.rAF);
			this.rAF = this.win.requestAnimationFrame(() => {
				this.handleResize();
				this.rAF = 0;
			});
		};
		this.bindWindow(getAppWindow());
		onAppWindowChange((win) => this.bindWindow(win));
	}
	bindWindow(win) {
		this.win?.removeEventListener("resize", this.onWinResize);
		this.win = win;
		this.win.addEventListener("resize", this.onWinResize);
		this.handleResize();
	}
};
var mediaSizes = new MediaSizes();
MOUNT_CLASS_TO.mediaSizes = mediaSizes;
function useMediaSizes() {
	return store;
}
//#endregion
export { makeMediaSize as a, MediaSize as i, mediaSizes as n, calcImageInBox as o, useMediaSizes as r, ScreenSize as t };
