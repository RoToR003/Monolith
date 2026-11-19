//# allFunctionsCalledOnLoad
import { i as onAppWindowChange, n as getAppWindow, r as getOverlayRoot } from "./appWindow-bo-KtJhy.js";
//#region src/components/wallet/visual/dom.ts
/** Pixels per CSS pixel of the window the app is in (a Document PiP one may stand on another screen), capped at 3. */
function pixelRatio() {
	return Math.min(getAppWindow().devicePixelRatio || 1, 3);
}
/** Offset of `el` inside `root` along the offsetParent chain. */
function offsetIn(el, root) {
	let x = 0, y = 0;
	for (let n = el; n && n !== root; n = n.offsetParent) {
		x += n.offsetLeft;
		y += n.offsetTop;
	}
	return {
		x,
		y
	};
}
/**
* The width `el` is laid out with, unlike its box on screen not scaled by a transform around it (the amount line is
* scaled to fit, a popup scales as it opens). For a box that is no inline one — a flex item, a positioned element.
*/
function layoutWidth(el) {
	return parseFloat((el.ownerDocument.defaultView || getAppWindow()).getComputedStyle(el).width) || 0;
}
var SVG_NS = "http://www.w3.org/2000/svg";
var filterHost = null;
var filterSeed = 0;
var unfollowWindow;
function svgElement(name) {
	return getOverlayRoot().ownerDocument.createElementNS(SVG_NS, name);
}
/**
* Adds a filter to the shared hidden <svg>, created on demand and removed
* with its last filter. The filter gets a unique id.
*/
function addFilter(filter, prefix) {
	if (!filterHost) {
		filterHost = svgElement("svg");
		filterHost.setAttribute("width", "0");
		filterHost.setAttribute("height", "0");
		filterHost.setAttribute("aria-hidden", "true");
		filterHost.style.position = "absolute";
		getOverlayRoot().append(filterHost);
		unfollowWindow = onAppWindowChange(() => filterHost && getOverlayRoot().append(filterHost));
	}
	filter.id = `wallet-${prefix}-${++filterSeed}`;
	filterHost.append(filter);
}
function removeFilter(filter) {
	if (filter.parentNode !== filterHost) return;
	filter.remove();
	if (!filterHost.childElementCount) {
		filterHost.remove();
		filterHost = null;
		unfollowWindow?.();
		unfollowWindow = void 0;
	}
}
/** Vertical smear of a drum line: one step for the whole line, its cells move in time. */
function smearFilter() {
	const filter = svgElement("filter");
	filter.setAttribute("x", "-20%");
	filter.setAttribute("y", "-60%");
	filter.setAttribute("width", "140%");
	filter.setAttribute("height", "220%");
	const blur = svgElement("feGaussianBlur");
	blur.setAttribute("stdDeviation", "0 0");
	filter.append(blur);
	addFilter(filter, "drum");
	return {
		id: filter.id,
		filter,
		blur
	};
}
/** The drop filter of one digit cell: blur, alpha threshold and a slight edge softening. */
function gooFilter() {
	const filter = svgElement("filter");
	filter.setAttribute("x", "-40%");
	filter.setAttribute("y", "-40%");
	filter.setAttribute("width", "180%");
	filter.setAttribute("height", "180%");
	filter.setAttribute("color-interpolation-filters", "sRGB");
	const blur = svgElement("feGaussianBlur");
	blur.setAttribute("in", "SourceGraphic");
	blur.setAttribute("stdDeviation", "0");
	const threshold = svgElement("feColorMatrix");
	threshold.setAttribute("values", "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -8");
	const soft = svgElement("feGaussianBlur");
	soft.setAttribute("stdDeviation", "0.45");
	filter.append(blur, threshold, soft);
	addFilter(filter, "goo");
	return {
		id: filter.id,
		filter,
		blur
	};
}
//#endregion
export { removeFilter as a, pixelRatio as i, layoutWidth as n, smearFilter as o, offsetIn as r, gooFilter as t };
