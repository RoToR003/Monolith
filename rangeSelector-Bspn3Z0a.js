//# allFunctionsCalledOnLoad
import { a as safeAssign } from "./idb-BZfkipS3.js";
import { u as langPack_default } from "./langPack-BmdJGr44.js";
import { t as clamp } from "./clamp-9UaNhw6N.js";
import { n as isElementRTL } from "./isDocumentRTL-z8ksM2Dv.js";
import { E as attachGrabListeners, T as keepLeftToRight, w as onRangeInlineArrowKey } from "./openEditors-7FmA7q_V.js";
//#region src/components/rangeSelector.ts
var RangeSelector = class {
	constructor(options, value = 0) {
		this.mousedown = false;
		this.rtl = false;
		this.events = {};
		this.withTransition = false;
		this.useTransform = false;
		this.useProperty = false;
		this.vertical = false;
		this.offsetAxisValue = 0;
		this.keepLTR = false;
		this.onMouseMove = (event) => {
			this.scrub(event);
		};
		this.onMouseDown = (event) => {
			this.rect = this.container.getBoundingClientRect();
			this.rtl = !this.vertical && isElementRTL(this.container);
			this.mousedown = true;
			this.scrub(event);
			this.container.classList.add("is-focused");
			this.events?.onMouseDown && this.events.onMouseDown(event);
		};
		this.onMouseUp = (event) => {
			this.mousedown = false;
			this.container.classList.remove("is-focused");
			this.events?.onMouseUp && this.events.onMouseUp(event);
		};
		this.onInput = () => {
			const value = +this.seek.value;
			this.setFilled(value);
			this.events?.onScrub && this.events.onScrub(value);
		};
		safeAssign(this, options);
		this.container = document.createElement("div");
		this.container.classList.add("progress-line");
		if (this.keepLTR) keepLeftToRight(this.container);
		if (this.useTransform) this.container.classList.add("use-transform");
		else if (this.withTransition) this.container.classList.add("with-transition");
		this.filled = document.createElement("div");
		this.filled.classList.add("progress-line__filled");
		const seek = this.seek = document.createElement("input");
		seek.classList.add("progress-line__seek");
		seek.type = "range";
		if (options.ariaLabel) seek.setAttribute("aria-label", langPack_default.format(options.ariaLabel, true));
		seek.step = "" + this.step;
		this.setMinMax(this.min, this.max);
		seek.value = "" + value;
		if (value) this.setProgress(value);
		const stepStr = "" + this.step;
		const index = stepStr.indexOf(".");
		this.decimals = index === -1 ? 0 : stepStr.length - index - 1;
		this.container.append(this.filled, seek);
	}
	setMinMax(min, max) {
		this.min = min ?? this.min ?? (this.min = 0);
		this.max = max ?? this.max ?? (this.max = 0);
		this.seek.min = "" + min;
		this.seek.max = "" + max;
	}
	get value() {
		return +this.seek.value;
	}
	setHandlers(events) {
		this.events = events;
	}
	setValueText(value) {
		if (value === void 0) this.seek.removeAttribute("aria-valuetext");
		else this.seek.setAttribute("aria-valuetext", value);
	}
	setListeners() {
		this.seek.addEventListener("input", this.onInput);
		if (!this.vertical) this.seek.addEventListener("keydown", onRangeInlineArrowKey);
		this._removeListeners = attachGrabListeners(this.container, this.onMouseDown, this.onMouseMove, this.onMouseUp);
	}
	setProgress(value) {
		this.seek.value = "" + value;
		this.setFilled(+this.seek.value);
	}
	addProgress(value) {
		this.seek.value = "" + (+this.seek.value + value);
		this.setFilled(+this.seek.value);
	}
	setFilled(value) {
		let percents = (value - this.min) / (this.max - this.min);
		percents = clamp(percents, 0, 1);
		if (this.useTransform) this.filled.style.transform = `scaleX(${percents})`;
		else if (this.useProperty) this.container.style.setProperty("--progress", "" + percents);
		else this.filled.style.width = percents * 100 + "%";
	}
	/**
	* Make sure rect is set
	* @returns value [0..1]
	*/
	getValueByEvent(event) {
		let rectMax = this.vertical ? this.rect.height : this.rect.width;
		if (this.offsetAxisValue) rectMax -= this.offsetAxisValue;
		let offsetAxisValue = clamp(this.vertical ? -(event.y - this.rect.bottom) : event.x - this.rect.left - this.offsetAxisValue / 2, 0, rectMax);
		if (this.rtl) offsetAxisValue = rectMax - offsetAxisValue;
		return offsetAxisValue / rectMax;
	}
	scrub(event, snapValue) {
		let value = this.min + this.getValueByEvent(event) * (this.max - this.min);
		if (value - this.min < (this.max - this.min) / 2) value -= this.step / 10;
		value = +value.toFixed(this.decimals);
		value = clamp(value, this.min, this.max);
		if (snapValue) value = snapValue(value);
		this.setProgress(value);
		this.events?.onScrub && this.events.onScrub(value);
		return value;
	}
	removeListeners() {
		if (this._removeListeners) {
			this._removeListeners();
			this._removeListeners = null;
		}
		this.seek.removeEventListener("input", this.onInput);
		this.seek.removeEventListener("keydown", onRangeInlineArrowKey);
		this.events = {};
	}
};
//#endregion
export { RangeSelector as t };
