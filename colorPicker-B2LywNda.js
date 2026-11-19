//# allFunctionsCalledOnLoad
import { u as langPack_default } from "./langPack-BmdJGr44.js";
import { B as rgbaToHsla, D as hexaToHsla, j as hslaToRgba, z as rgbaToHexa } from "./state-JPIG5PpJ.js";
import { t as clamp } from "./clamp-9UaNhw6N.js";
import { t as observeResize } from "./resizeObserver-DddVtfLC.js";
import { n as InputState, t as InputField } from "./inputField-CaCo30N0.js";
import { E as attachGrabListeners, S as createElementFromMarkup } from "./openEditors-7FmA7q_V.js";
//#region src/components/colorPicker.ts
var _ColorPicker;
var defaultPickerBoxWidth = 380;
var defaultPickerBoxHeight = 198;
var pickerBoxRatio = defaultPickerBoxWidth / defaultPickerBoxHeight;
var defaultSliderWidth = defaultPickerBoxWidth;
var sliderHeight = 24;
var ColorPicker = class ColorPicker {
	constructor({ buildLayout = ColorPicker.defaultBuildLayout, pickerBoxWidth = defaultPickerBoxWidth, pickerBoxHeight = defaultPickerBoxHeight, sliderWidth = defaultSliderWidth, thickSlider = false } = {}) {
		this.hue = 0;
		this.saturation = 100;
		this.lightness = 50;
		this.alpha = 1;
		this.elements = {};
		this.onGrabStart = () => {
			document.documentElement.style.cursor = this.elements.boxDragger.style.cursor = "grabbing";
		};
		this.onGrabEnd = () => {
			document.documentElement.style.cursor = this.elements.boxDragger.style.cursor = "";
		};
		const id = ColorPicker.idSeed++;
		const pickerBox = createElementFromMarkup(`
      <svg class="${ColorPicker.BASE_CLASS + "-box"}" viewBox="0 0 ${pickerBoxWidth} ${pickerBoxHeight}" style="width: ${pickerBoxWidth}px; height: ${pickerBoxHeight}px;">
        <defs>
          <linearGradient id="color-picker-saturation-${id}" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#fff"></stop>
            <stop offset="100%" stop-color="hsl(0,100%,50%)"></stop>
          </linearGradient>
          <linearGradient id="color-picker-brightness-${id}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="rgba(0,0,0,0)"></stop>
            <stop offset="100%" stop-color="#000"></stop>
          </linearGradient>
          <pattern id="color-picker-pattern-${id}" width="100%" height="100%">
            <rect x="0" y="0" width="100%" height="100%" fill="url(#color-picker-saturation-${id})"></rect>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#color-picker-brightness-${id})"></rect>
          </pattern>
        </defs>
        <rect id="color-picker-box-rect-${id}" rx="10" ry="10" x="0" y="0" width="${pickerBoxWidth}" height="${pickerBoxHeight}" fill="url(#color-picker-pattern-${id})"></rect>
        <svg class="${ColorPicker.BASE_CLASS + "-dragger"} ${ColorPicker.BASE_CLASS + "-box-dragger"}" x="0" y="0">
          <circle r="11" fill="inherit" stroke="#fff" stroke-width="2"></circle>
        </svg>
      </svg>
    `);
		const slider = createElementFromMarkup(`
      <div class="${ColorPicker.BASE_CLASS + "-sliders"}" style="width: ${sliderWidth}px; height: ${sliderHeight}px">
        <svg class="${ColorPicker.BASE_CLASS + "-color-slider"}" viewBox="0 0 ${sliderWidth} ${sliderHeight}">
          <defs>
            <linearGradient id="hue-${id}" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stop-color="#f00"></stop>
              <stop offset="16.666%" stop-color="#f0f"></stop>
              <stop offset="33.333%" stop-color="#00f"></stop>
              <stop offset="50%" stop-color="#0ff"></stop>
              <stop offset="66.666%" stop-color="#0f0"></stop>
              <stop offset="83.333%" stop-color="#ff0"></stop>
              <stop offset="100%" stop-color="#f00"></stop>
            </linearGradient>
          </defs>
          <rect id="color-picker-hue-rect-${id}" rx="${thickSlider ? 10 : 4}" x="0" y="${thickSlider ? 3 : 9}" width="${sliderWidth}" height="${thickSlider ? 20 : 8}" fill="url(#hue-${id})"></rect>
          <svg class="${ColorPicker.BASE_CLASS + "-dragger"} ${ColorPicker.BASE_CLASS + "-color-slider-dragger"}" x="0" y="13">
            <circle r="11" fill="inherit" stroke="#fff" stroke-width="2"></circle>
          </svg>
        </svg>
      </div>
    `);
		this.elements.box = pickerBox;
		this.elements.boxDragger = pickerBox.lastElementChild;
		this.elements.saturation = pickerBox.querySelector(`#color-picker-saturation-${id}`);
		this.elements.boxRect = pickerBox.querySelector(`#color-picker-box-rect-${id}`);
		this.elements.sliders = slider;
		this.elements.hue = slider.firstElementChild;
		this.elements.hueDragger = this.elements.hue.lastElementChild;
		this.elements.hueRect = slider.querySelector(`#color-picker-hue-rect-${id}`);
		this.hexInputField = new InputField({
			plainText: true,
			label: "Appearance.Color.Hex"
		});
		this.rgbInputField = new InputField({
			plainText: true,
			label: "Appearance.Color.RGB"
		});
		this.container = buildLayout({
			pickerBox,
			slider,
			hexInput: this.hexInputField.container,
			rgbInput: this.rgbInputField.container
		});
		this.hexInputField.input.addEventListener("input", () => {
			let value = this.hexInputField.value.replace(/#/g, "").slice(0, 6);
			const match = value.match(/([a-fA-F\d]+)/);
			const valid = match && match[0].length === value.length && [6].includes(value.length);
			this.hexInputField.setState(valid ? InputState.Neutral : InputState.Error);
			value = "#" + value;
			this.hexInputField.setValueSilently(value);
			if (valid) this.setColor(value, false, true);
		});
		const rgbRegExp = /^(?:rgb)?\(?([01]?\d\d?|2[0-4]\d|25[0-5])(?:\W+)([01]?\d\d?|2[0-4]\d|25[0-5])\W+(?:([01]?\d\d?|2[0-4]\d|25[0-5])\)?)$/;
		this.rgbInputField.input.addEventListener("input", () => {
			const match = this.rgbInputField.value.match(rgbRegExp);
			this.rgbInputField.setState(match ? InputState.Neutral : InputState.Error);
			if (match) this.setColor(rgbaToHsla(+match[1], +match[2], +match[3]), true, false);
		});
		this.attachBoxListeners();
		this.attachHueListeners();
	}
	static defaultBuildLayout(parts) {
		const container = document.createElement("div");
		container.classList.add(ColorPicker.BASE_CLASS);
		const inputs = document.createElement("div");
		inputs.className = ColorPicker.BASE_CLASS + "-inputs";
		inputs.append(parts.hexInput, parts.rgbInput);
		container.append(parts.pickerBox, parts.slider, inputs);
		return container;
	}
	adjustSize({ pickerBoxWidth, pickerBoxHeight, sliderWidth }) {
		this.elements.box.setAttribute("viewBox", `0 0 ${pickerBoxWidth} ${pickerBoxHeight}`);
		this.elements.box.style.width = `${pickerBoxWidth}px`;
		this.elements.box.style.height = `${pickerBoxHeight}px`;
		this.elements.boxRect.setAttribute("width", `${pickerBoxWidth}`);
		this.elements.boxRect.setAttribute("height", `${pickerBoxHeight}`);
		this.elements.sliders.style.width = `${sliderWidth}px`;
		this.elements.sliders.style.height = `${sliderHeight}px`;
		this.elements.hue.setAttribute("viewBox", `0 0 ${sliderWidth} ${sliderHeight}`);
		this.elements.hueRect.setAttribute("width", `${sliderWidth}`);
	}
	attachAutoResize() {
		return observeResize(this.container, (entry) => {
			const width = entry.contentRect.width;
			this.adjustSize({
				pickerBoxWidth: width,
				pickerBoxHeight: width / pickerBoxRatio,
				sliderWidth: width
			});
		});
	}
	attachBoxListeners() {
		attachGrabListeners(this.elements.box, () => {
			this.onGrabStart();
			this.boxRect = this.elements.box.getBoundingClientRect();
		}, (pos) => {
			this.saturationHandler(pos.x, pos.y);
		}, () => {
			this.onGrabEnd();
		});
	}
	attachHueListeners() {
		attachGrabListeners(this.elements.hue, () => {
			this.onGrabStart();
			this.hueRect = this.elements.hue.getBoundingClientRect();
		}, (pos) => {
			this.hueHandler(pos.x);
		}, () => {
			this.onGrabEnd();
		});
	}
	setColor(color, updateHexInput = true, updateRgbInput = true) {
		if (color === void 0) color = {
			h: 0,
			s: 100,
			l: 50,
			a: 1
		};
		else if (typeof color === "string") {
			if (color[0] === "#") color = hexaToHsla(color);
			else {
				const rgb = color.match(/[.?\d]+/g);
				color = rgbaToHsla(+rgb[0], +rgb[1], +rgb[2], rgb[3] === void 0 ? 1 : +rgb[3]);
			}
		}
		this.boxRect = this.elements.box.getBoundingClientRect();
		const boxX = this.boxRect.width / 100 * color.s;
		const percentY = 100 - color.l / (100 - color.s / 2) * 100;
		const boxY = this.boxRect.height / 100 * percentY;
		this.saturationHandler(this.boxRect.left + boxX, this.boxRect.top + boxY, false);
		this.setHuePercents(color.h / 360, false);
		this.hue = color.h;
		this.saturation = color.s;
		this.lightness = color.l;
		this.alpha = color.a;
		this.updatePicker(updateHexInput, updateRgbInput);
	}
	getCurrentColor() {
		const rgbaArray = hslaToRgba(this.hue, this.saturation, this.lightness, this.alpha);
		const hexa = rgbaToHexa(rgbaArray);
		const hex = hexa.slice(0, -2);
		return {
			hsl: `hsl(${this.hue}, ${this.saturation}%, ${this.lightness}%)`,
			rgb: `rgb(${rgbaArray[0]}, ${rgbaArray[1]}, ${rgbaArray[2]})`,
			hex,
			hsla: `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${this.alpha})`,
			rgba: `rgba(${rgbaArray[0]}, ${rgbaArray[1]}, ${rgbaArray[2]}, ${rgbaArray[3]})`,
			hexa,
			rgbaArray
		};
	}
	updatePicker(updateHexInput = true, updateRgbInput = true) {
		const color = this.getCurrentColor();
		this.elements.boxDragger.setAttributeNS(null, "fill", color.hex);
		if (updateHexInput) {
			this.hexInputField.setValueSilently(color.hex);
			this.hexInputField.setState(InputState.Neutral);
		}
		if (updateRgbInput) {
			this.rgbInputField.setValueSilently(color.rgbaArray.slice(0, -1).join(", "));
			this.rgbInputField.setState(InputState.Neutral);
		}
		if (this.onChange) this.onChange(color);
	}
	hueHandler(pageX, update = true) {
		const percents = clamp(pageX - this.hueRect.left, 0, this.hueRect.width) / this.hueRect.width;
		this.setHuePercents(langPack_default.getIsRTL() ? 1 - percents : percents, update);
	}
	setHuePercents(percents, update = true) {
		this.hue = Math.round(360 * percents);
		const hsla = `hsla(${this.hue}, 100%, 50%, ${this.alpha})`;
		this.elements.hueDragger.setAttributeNS(null, "x", percents * 100 + "%");
		this.elements.hueDragger.setAttributeNS(null, "fill", hsla);
		this.elements.saturation.lastElementChild.setAttributeNS(null, "stop-color", hsla);
		if (update) this.updatePicker();
	}
	saturationHandler(pageX, pageY, update = true) {
		const maxX = this.boxRect.width;
		const maxY = this.boxRect.height;
		const eventX = clamp(pageX - this.boxRect.left, 0, maxX);
		const eventY = clamp(pageY - this.boxRect.top, 0, maxY);
		const posX = eventX / maxX * 100;
		const posY = eventY / maxY * 100;
		const boxDragger = this.elements.boxDragger;
		boxDragger.setAttributeNS(null, "x", posX + "%");
		boxDragger.setAttributeNS(null, "y", posY + "%");
		const saturation = clamp(posX, 0, 100);
		const lightnessX = 100 - saturation / 2;
		const lightnessY = 100 - clamp(posY, 0, 100);
		const lightness = clamp(lightnessY / 100 * lightnessX, 0, 100);
		this.saturation = saturation;
		this.lightness = lightness;
		if (update) this.updatePicker();
	}
};
_ColorPicker = ColorPicker;
_ColorPicker.BASE_CLASS = "color-picker";
_ColorPicker.idSeed = 0;
//#endregion
export { ColorPicker as t };
