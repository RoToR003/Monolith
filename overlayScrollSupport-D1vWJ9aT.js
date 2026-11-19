//# allFunctionsCalledOnLoad
import { a as IS_CHROMIUM, c as IS_MOBILE_SAFARI, l as IS_SAFARI, s as IS_MOBILE, t as CHROMIUM_VERSION } from "./userAgent-ByGXcznk.js";
import { C as createSignal, _ as createMemo } from "./solid-9Vxm0VIz.js";
import { t as observeResize } from "./resizeObserver-DddVtfLC.js";
//#region src/helpers/dom/scrollbarWidth.ts
var [_scrollbarWidth, setScrollbarWidth] = createSignal(0);
var initialized = false;
function init() {
	initialized = true;
	const outer = document.createElement("div");
	outer.id = "scrollbar-width";
	outer.style.cssText = "position:fixed;top:-200px;left:-200px;width:100px;height:100px;overflow:scroll;visibility:hidden;pointer-events:none;opacity:0;";
	const inner = document.createElement("div");
	inner.style.cssText = "width:100%;height:200px;";
	outer.appendChild(inner);
	document.documentElement.appendChild(outer);
	function measure() {
		setScrollbarWidth(outer.offsetWidth - outer.clientWidth);
	}
	measure();
	observeResize(inner, measure);
}
var scrollbarWidth = () => {
	if (!initialized) init();
	return _scrollbarWidth();
};
//#endregion
//#region src/environment/overlayScrollSupport.ts
var USE_NATIVE_SCROLL = IS_MOBILE;
var STATIC_OVERLAY_SCROLL = IS_MOBILE || !IS_CHROMIUM && (!IS_SAFARI || IS_MOBILE_SAFARI) || CHROMIUM_VERSION < 113 || CHROMIUM_VERSION >= 145;
var IS_OVERLAY_SCROLL_SUPPORTED = createMemo(() => STATIC_OVERLAY_SCROLL && scrollbarWidth() === 0);
var USE_CUSTOM_SCROLL = createMemo(() => !USE_NATIVE_SCROLL && !IS_OVERLAY_SCROLL_SUPPORTED());
//#endregion
export { USE_CUSTOM_SCROLL as n, USE_NATIVE_SCROLL as r, IS_OVERLAY_SCROLL_SUPPORTED as t };
