//# allFunctionsCalledOnLoad
import { a as safeAssign } from "./idb-BZfkipS3.js";
import { t as RangeSelector } from "./rangeSelector-Bspn3Z0a.js";
//#region src/components/rangeStepsSelector.ts
var RangeStepsSelector = class {
	constructor(options) {
		this.onIndex = (index) => {
			if (!this.steps[index]) return;
			const label = this.steps[index][0];
			this.range.setValueText(typeof label === "string" ? label : label.textContent);
			this.onValue?.(this.steps[index][1]);
			this.optionsElements.forEach(({ container }, idx) => {
				container.classList.toggle("active", index >= idx);
				container.classList.toggle("is-chosen", index === idx);
			});
		};
		safeAssign(this, options);
		this.generateSteps ?? (this.generateSteps = (values) => values.map(this.generateStep));
		const container = this.container = document.createElement("div");
		container.classList.add("range-setting-selector", "range-steps-selector");
		this.middleware.onClean(() => {
			this.range.removeListeners();
		});
		const range = this.range = new RangeSelector({
			step: 1,
			ariaLabel: options.ariaLabel
		});
		range.setListeners();
		range.setHandlers({ onScrub: this.onIndex });
		container.append(range.container);
	}
	createOption(label, idx, maxIndex) {
		const option = document.createElement("div");
		option.classList.add("range-setting-selector-option");
		const text = document.createElement("div");
		text.classList.add("range-setting-selector-option-text");
		text.replaceChildren(label);
		option.append(text);
		option.style.insetInlineStart = `${idx / maxIndex * 100}%`;
		if (idx === 0 && !this.noFirstLast) option.classList.add("is-first");
		else if (idx === maxIndex) {
			option.style.insetInlineStart = "";
			option.style.insetInlineEnd = "0";
			!this.noFirstLast && option.classList.add("is-last");
		}
		return {
			container: option,
			text
		};
	}
	setSteps(steps, index) {
		if (this.optionsElements) this.optionsElements.forEach(({ container }) => container.remove());
		const maxIndex = steps.length - 1;
		this.range.setMinMax(0, maxIndex);
		this.steps = steps;
		this.optionsElements = steps.map(([label], idx) => {
			const option = this.createOption(label, idx, maxIndex);
			this.range.container.append(option.container);
			return option;
		});
		if (index !== void 0) this.setIndex(index);
	}
	setIndex(index) {
		this.range.setProgress(index);
		this.onIndex(index);
	}
	removeListeners() {
		this.range.removeListeners();
	}
	get value() {
		return this.steps[this.range.value][1];
	}
};
//#endregion
export { RangeStepsSelector as t };
