//# allFunctionsCalledOnLoad
import { n as fastRaf } from "./schedulers-Cx0-7a1P.js";
import { C as FontFamily } from "./themeController-2cytOOn0.js";
import { t as clamp } from "./clamp-9UaNhw6N.js";
import { t as hotEffect } from "./hotModule-aCRkP77w.js";
import { n as mediaSizes } from "./mediaSizes-C1MTaleW.js";
import { t as getTextWidth } from "./getTextWidth-DuqOrM4A.js";
//#region src/components/middleEllipsis.ts
/**
* Attibute modifier to create middle ellipsis
* When the attribute value is left blank the ellipsis will be in the middle
* When positive the attribute value will be used as a percentage
* When negative the attribute value will be used as character index counted from the end
* @example
*   <div data-middle-ellipsis>A Javascript solution to middle ellipsis</div>
*   <div data-middle-ellipsis="20">A Javascript solution to middle ellipsis</div>
*   <div data-middle-ellipsis="-3">A Javascript solution to middle ellipsis</div>
*/
var ellipsis = "…";
var TAG_NAME = "middle-ellipsis-element";
var map = /* @__PURE__ */ new Map();
var testQueue = /* @__PURE__ */ new Set();
var pendingTest = false;
function setTestQueue() {
	if (pendingTest) return;
	pendingTest = true;
	fastRaf(() => {
		pendingTest = false;
		testQueueElements();
	});
}
function testQueueElements() {
	testQueue.forEach(testElement);
	testQueue.clear();
}
hotEffect(void 0, () => {
	const onResize = () => {
		for (const [key] of map) testQueue.add(key);
		setTestQueue();
	};
	window.addEventListener("resize", onResize, {
		capture: true,
		passive: true
	});
	return () => window.removeEventListener("resize", onResize, { capture: true });
});
function getElementWidth(element) {
	const getSize = element.getSize;
	if (getSize) return getSize();
	const type = element.dataset.sizeType;
	if (type) return mediaSizes.active[type].width;
	const line = element.parentElement;
	if (line && getComputedStyle(element).display === "inline") {
		const preceding = document.createRange();
		preceding.setStart(line, 0);
		preceding.setEndBefore(element);
		return line.getBoundingClientRect().width - preceding.getBoundingClientRect().width;
	}
	return element.getBoundingClientRect().width;
}
function testElement(element) {
	let mapped = map.get(element);
	const firstTime = !mapped;
	let { text, textLength, from, multiplier, font, textWidth, elementWidth } = mapped || {};
	if (firstTime) {
		text = element.textContent;
		textLength = text.length;
		from = 50;
		multiplier = from > 0 && from / 100;
		let fontSize = element.dataset.fontSize;
		if (fontSize && +fontSize) fontSize += "px";
		font = `${element.dataset.fontWeight || "400"} ${fontSize || "16px"} ${FontFamily}`;
		textWidth = getTextWidth(text, font);
		elementWidth = getElementWidth(element);
		mapped = {
			text,
			textLength,
			from,
			multiplier,
			font,
			textWidth,
			elementWidth
		};
		map.set(element, mapped);
	}
	const newElementWidth = getElementWidth(element);
	const widthChanged = firstTime || elementWidth !== newElementWidth;
	!firstTime && widthChanged && (mapped.elementWidth = elementWidth = newElementWidth);
	if (widthChanged) {
		if (textWidth > elementWidth) {
			element.setAttribute("title", text);
			let smallerText = text;
			let smallerWidth = elementWidth;
			while (smallerText.length > 3) {
				const smallerTextLength = smallerText.length;
				const half = multiplier && clamp(multiplier * smallerTextLength << 0, 1, smallerTextLength - 2) || Math.max(smallerTextLength + from - 1, 1);
				const half1 = smallerText.substr(0, half).replace(/\s*$/, "");
				const half2 = smallerText.substr(half + 1).replace(/^\s*/, "");
				smallerText = half1 + half2;
				smallerWidth = getTextWidth(smallerText + ellipsis, font);
				if (smallerWidth < elementWidth) {
					element.textContent = half1 + ellipsis + half2;
					break;
				}
			}
			mapped.elementWidth = getElementWidth(element);
		} else element.removeAttribute("title");
	}
}
var MiddleEllipsisElement = class extends HTMLElement {
	static create() {
		return new (customElements.get(TAG_NAME))();
	}
	connectedCallback() {
		map.set(this, null);
		if (this.dataset.sizeType || this.getSize) testElement(this);
		else {
			testQueue.add(this);
			setTestQueue();
		}
	}
	disconnectedCallback() {
		map.delete(this);
		testQueue.delete(this);
	}
};
if (!customElements.get(TAG_NAME)) customElements.define(TAG_NAME, MiddleEllipsisElement);
//#endregion
export { MiddleEllipsisElement as t };
