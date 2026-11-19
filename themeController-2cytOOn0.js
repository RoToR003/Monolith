//# allFunctionsCalledOnLoad
import { h as Modes, p as MOUNT_CLASS_TO } from "./userAgent-ByGXcznk.js";
import { t as IS_TOUCH_SUPPORTED } from "./touchSupport-B2RWO3zD.js";
import { t as noop } from "./noop-H9NNBLfX.js";
import { t as pause } from "./pause-BSJh-z46.js";
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { c as IS_WORKER, n as logger } from "./logger-7zf0rNYS.js";
import { C as createSignal, L as untrack } from "./solid-9Vxm0VIz.js";
import { i as onAppWindowChange, n as getAppWindow } from "./appWindow-bo-KtJhy.js";
import { A as hslaStringToRgba, B as rgbaToHsla, C as getHexColorFromTelegramColor, E as hexToRgb, I as relativeLuminance, N as hsvToRgb, P as mixColors, R as rgbToHsv, _ as darkenToMaxLuminance, a as blendWallpaperForTinted, b as getAverageColor, c as presetThemeId, h as channelsLuminance, j as hslaToRgba, k as hslaStringToHex, l as presetToThemeSettings, m as changeColorAccent, r as SETTINGS_INIT, s as getCloudThemeWallpaper, u as LIGHT_LUMINANCE, v as ensureTextContrast, w as getRgbColorFromTelegramColor, y as getAccentColor, z as rgbaToHexa } from "./state-JPIG5PpJ.js";
import { t as clamp } from "./clamp-9UaNhw6N.js";
import { t as joinDeepPath } from "./setDeepProperty-IYhQYgHt.js";
import { o as useAppSettings, t as liteMode } from "./liteMode-DeLStZfQ.js";
import { t as crc32 } from "./crc32-BBj7ogy1.js";
import { i as zlibSync } from "./browser-CNMy5TzU.js";
import { t as lerp } from "./lerp-DAS1FxCk.js";
import { t as accumulate } from "./accumulate-DzVphodg.js";
import { n as mediaSizes } from "./mediaSizes-C1MTaleW.js";
import { t as dispatchHeavyAnimationEvent } from "./useHeavyAnimationCheck-sWeBPI3f.js";
//#region src/config/font.ts
var FontFamilyName = "Roboto";
var FontFamily = "Roboto, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen-Sans, Ubuntu, Cantarell, \"Helvetica Neue\", sans-serif";
var FontSize = "16px";
var FontFull = `400 ${FontSize} ${FontFamily}`;
var FontFullBold = `500 ${FontSize} ${FontFamily}`;
var GRADIENT_POSITIONS = [
	{
		x: .8,
		y: .1
	},
	{
		x: .6,
		y: .2
	},
	{
		x: .35,
		y: .25
	},
	{
		x: .25,
		y: .6
	},
	{
		x: .2,
		y: .9
	},
	{
		x: .4,
		y: .8
	},
	{
		x: .65,
		y: .75
	},
	{
		x: .75,
		y: .4
	}
];
var GRADIENT_PHASES = GRADIENT_POSITIONS.length;
/**
* The freeform gradient of up to four colours at a phase, `progress` of the way to it from the phase after it
* (1 is the phase itself): RGBA pixels of a picture of `width`×`height`
*/
function getGradientPixels(colors, phase, progress = 1, width = 50, height = 50, pixels = new Uint8ClampedArray(width * height * 4)) {
	const colorsLength = colors.length;
	const positionsForPhase = (phase) => {
		const result = [];
		for (let i = 0; i != 4; ++i) {
			result[i] = { ...GRADIENT_POSITIONS[(phase + i * 2) % GRADIENT_POSITIONS.length] };
			result[i].y = 1 - result[i].y;
		}
		return result;
	};
	const previous = positionsForPhase((phase + 1) % GRADIENT_POSITIONS.length);
	const current = positionsForPhase(phase);
	let offset = 0;
	for (let y = 0; y < height; ++y) {
		const centerDistanceY = y / height - .5;
		const centerDistanceY2 = centerDistanceY * centerDistanceY;
		for (let x = 0; x < width; ++x) {
			const centerDistanceX = x / width - .5;
			const swirlFactor = .35 * Math.sqrt(centerDistanceX * centerDistanceX + centerDistanceY2);
			const theta = swirlFactor * swirlFactor * .8 * 8;
			const sinTheta = Math.sin(theta);
			const cosTheta = Math.cos(theta);
			const pixelX = Math.max(0, Math.min(1, .5 + centerDistanceX * cosTheta - centerDistanceY * sinTheta));
			const pixelY = Math.max(0, Math.min(1, .5 + centerDistanceX * sinTheta + centerDistanceY * cosTheta));
			let distanceSum = 0;
			let r = 0;
			let g = 0;
			let b = 0;
			for (let i = 0; i < colorsLength; ++i) {
				const colorX = previous[i].x + (current[i].x - previous[i].x) * progress;
				const colorY = previous[i].y + (current[i].y - previous[i].y) * progress;
				const distanceX = pixelX - colorX;
				const distanceY = pixelY - colorY;
				let distance = Math.max(0, .9 - Math.sqrt(distanceX * distanceX + distanceY * distanceY));
				distance = distance * distance * distance * distance;
				distanceSum += distance;
				r += distance * colors[i].r;
				g += distance * colors[i].g;
				b += distance * colors[i].b;
			}
			pixels[offset++] = r / distanceSum;
			pixels[offset++] = g / distanceSum;
			pixels[offset++] = b / distanceSum;
			pixels[offset++] = 255;
		}
	}
	return pixels;
}
//#endregion
//#region src/helpers/bytes/bytesToDataURL.ts
function bytesToDataURL(bytes, mimeType = "image/jpeg") {
	return `data:${mimeType};base64,${btoa(String.fromCharCode(...bytes))}`;
}
//#endregion
//#region src/helpers/holdCount.ts
/** One more holder of `key` */
function holdCount(counts, key) {
	counts.set(key, (counts.get(key) || 0) + 1);
}
/** One holder of `key` less: true when it was the last, and `key` is held no more */
function releaseCount(counts, key) {
	const count = counts.get(key) - 1;
	if (count > 0) {
		counts.set(key, count);
		return false;
	}
	counts.delete(key);
	return true;
}
//#endregion
//#region src/helpers/dom/setStyleProperty.ts
/**
* A property of an element's own style set to a value only when it holds another: the same value set again is parsed
* anew and can restyle the element for nothing
*/
function setStyleProperty(style, name, value) {
	if (style.getPropertyValue(name) !== value) style.setProperty(name, value);
}
//#endregion
//#region src/helpers/outgoingMessageGradient.ts
var MESSAGE_OUT_GRADIENT_PROPERTY = "--message-out-gradient";
var IMAGE_PROPERTY = "--message-out-gradient-image";
var MESSAGE_OUT_GRADIENT_IMAGE_PROPERTY = `${IMAGE_PROPERTY}-0`;
var FREEFORM_PROPERTY = "--message-out-gradient-freeform";
var RENDERING_PROPERTY = "--message-out-gradient-rendering";
var DISPLAY_PROPERTY = "--message-out-gradient-display";
var NEXT_DISPLAY_PROPERTY = "--message-out-gradient-next-display";
var CONTENT_BACKGROUND_PROPERTY = "--message-out-gradient-content-background";
var UNDER_PROPERTY = "--message-out-gradient-under";
var LIGHT_PRIMARY_PROPERTY = "--message-out-gradient-light-primary-color";
var SOLID_PROPERTY = "--message-out-gradient-solid-color";
var PHASE_CLASS = "message-out-gradient-phase-";
var ADVANCING_CLASS = "is-message-out-gradient-advancing";
var ADVANCE_CLASS = "message-out-gradient-advance-";
var ADVANCE_STEP = 50;
var ADVANCE_STEPS = [5, 12];
var COLUMN_HEIGHT = 4096;
var images = /* @__PURE__ */ new Map();
var pictures = /* @__PURE__ */ new Map();
var SMOOTH = "auto";
var NEAREST = "pixelated";
var READABLE_CONTRAST = 4.5;
var STEPS_BETWEEN = 16;
var MAX_STEPS_BETWEEN = 32;
var MESSAGE_OUT_TINT = .08;
function tintOver(under, color) {
	return under.map((value, channel) => value + (color[channel] - value) * MESSAGE_OUT_TINT);
}
var isLight = (textColor) => relativeLuminance(textColor) > LIGHT_LUMINANCE;
/**
* Whether the outgoing text reads on a colour of the gradient, and on a tint of the text over it: a reaction's counter
* is of the bubbles' own colour, which is the text's under light text (the night's) and under dark text no lighter than
* it takes to read (`keepReadableOnOutgoingMessageGradient`), and it stands on a tint of itself. Read on the side of the
* text the colour is moved to (`moveFromText`), of channels past their ends too
*/
function readsUnder(color, textColor, ratio = READABLE_CONTRAST) {
	const textLuminance = relativeLuminance(textColor);
	const light = isLight(textColor);
	const reads = (under) => {
		const luminance = relativeLuminance(under);
		return (light ? (textLuminance + .05) / (luminance + .05) : (luminance + .05) / (textLuminance + .05)) >= ratio;
	};
	return reads(color) && reads(tintOver(color, textColor));
}
/**
* A colour moved away from the text by an amount, as ensureTextContrast moves one: under light text its channels times
* e^-amount, toward black, under dark text its distance from white so, toward white. 0 leaves it as it is, and below 0
* moves it toward the text, past the channels' ends too, to tell by how much a colour that reads could be
*/
function moveFromText(color, light, amount) {
	const scale = Math.exp(-amount);
	return color.map((value) => light ? value * scale : 255 - (255 - value) * scale);
}
function roundColor(color) {
	return color.map((value) => clamp(Math.round(value), 0, 255));
}
function getReadableAmount(color, textColor) {
	const light = isLight(textColor);
	let [low, high] = [-4, 8];
	for (let i = 0; i < 16; ++i) {
		const amount = (low + high) / 2;
		if (readsUnder(moveFromText(color, light, amount), textColor)) high = amount;
		else low = amount;
	}
	return high;
}
function makeReadable(color, textColor) {
	return roundColor(moveFromText(color, isLight(textColor), Math.max(0, getReadableAmount(color, textColor))));
}
var SOFTNESS = .1;
var smoothAmount = (amount) => SOFTNESS * Math.log1p(Math.exp(amount / SOFTNESS));
/**
* The gradient's colours for the theme's ones under the outgoing text of this colour: from the bottom up, evenly
* spaced; nothing for one colour. Each is moved from the text as far as it takes to read it - darker under white text,
* as on Desktop, lighter under dark text - and smoothly where that starts (`smoothAmount`), and more are put between
* the theme's until every mix of two that stand side by side reads as well
*/
function getOutgoingMessageGradientColors(colors, textColor) {
	const hexes = (colors || []).map(getHexColorFromTelegramColor);
	if (new Set(hexes).size < 2) return;
	const theme = hexes.map(hexToRgb);
	const light = isLight(textColor);
	for (let steps = STEPS_BETWEEN;; steps *= 2) {
		const gradient = theme.flatMap((color, index) => {
			const next = theme[index + 1];
			return Array.from({ length: next ? steps : 1 }, (_, step) => {
				const mixed = next ? mixColors(next, color, step / steps) : color;
				return roundColor(moveFromText(mixed, light, smoothAmount(getReadableAmount(mixed, textColor))));
			});
		});
		if (getPainted(gradient).every((color) => readsUnder(color, textColor, 4.45)) || steps >= MAX_STEPS_BETWEEN) return gradient;
	}
}
function getPainted(colors) {
	return colors.flatMap((color, index) => index ? [
		.25,
		.5,
		.75
	].map((t) => mixColors(color, colors[index - 1], t)).concat([color]) : [color]);
}
var MIX_STEPS = 20;
function getMixes(colors) {
	const mixes = [];
	const mix = (index, left, r, g, b) => {
		const [cr, cg, cb] = colors[index];
		if (index === colors.length - 1) {
			const weight = left / MIX_STEPS;
			mixes.push([
				r + cr * weight,
				g + cg * weight,
				b + cb * weight
			]);
			return;
		}
		for (let steps = 0; steps <= left; ++steps) {
			const weight = steps / MIX_STEPS;
			mix(index + 1, left - steps, r + cr * weight, g + cg * weight, b + cb * weight);
		}
	};
	mix(0, MIX_STEPS, 0, 0, 0);
	return mixes;
}
function getDarkestMix(colors) {
	return getMixes(colors).reduce((darkest, [r, g, b]) => Math.min(darkest, channelsLuminance(r, g, b)), Infinity);
}
/**
* Three colours or four that move (`message_colors_animated`) are the wallpapers' freeform gradient of them, as on
* Android: its points' colours, each moved to read the text on (`readsUnder`), and all of them further, to white, as far
* as it takes for every mix of them, and the text's tint over it, to read too (a mix of colours can be darker than any of
* them; under light text it is not lighter than all of them, nor is a tint over it)
*/
function getOutgoingMessageFreeformColors(colors, textColor) {
	const hexes = (colors || []).slice(0, 4).map(getHexColorFromTelegramColor);
	if (hexes.length < 3 || new Set(hexes).size < 2) return;
	const points = hexes.map((hex) => makeReadable(hexToRgb(hex), textColor));
	const textLuminance = relativeLuminance(textColor);
	const toWhite = (by) => points.map((color) => color.map((value) => Math.ceil(value + (255 - value) * by)));
	const read = (by) => {
		return (getDarkestMix(toWhite(by).map((point) => tintOver(point, textColor))) + .05) / (textLuminance + .05) >= READABLE_CONTRAST;
	};
	if (textLuminance > .179 || read(0)) return points;
	let [low, high] = [0, 1];
	for (let i = 0; i < 10; ++i) {
		const by = (low + high) / 2;
		if (read(by)) high = by;
		else low = by;
	}
	return toWhite(high);
}
var gradients = /* @__PURE__ */ new Map();
function getOutgoingMessageGradient(colors, animated, textColor) {
	const key = [
		colors?.join(),
		animated,
		textColor.join()
	].join("|");
	if (gradients.has(key)) return gradients.get(key);
	const freeform = animated && getOutgoingMessageFreeformColors(colors, textColor);
	const vertical = !freeform && getOutgoingMessageGradientColors(colors, textColor);
	const gradient = freeform ? {
		colors: freeform,
		freeform: { textColor },
		solid: getSolidColor(freeform, true, textColor)
	} : vertical ? {
		colors: vertical,
		solid: getSolidColor(vertical, false, textColor)
	} : void 0;
	gradients.set(key, gradient);
	return gradient;
}
/**
* The one colour that stands for the gradient, the one it shows most (widget-sandbox's SDK §5.1): the mean of what it
* is painted in, moved to read the text on as its colours are. The vertical one's colours are evenly spaced, each two
* mixed between them, so its ends weigh half; the freeform one's are its points, as on Android
*/
function getSolidColor(colors, freeform, textColor) {
	const weights = colors.map((_, index) => freeform || index && index < colors.length - 1 ? 1 : .5);
	const total = accumulate(weights, 0);
	return makeReadable([
		0,
		1,
		2
	].map((channel) => {
		return colors.reduce((sum, color, index) => sum + color[channel] * weights[index], 0) / total;
	}), textColor);
}
function makeOutgoingMessageGradient(colors) {
	return colors ? `linear-gradient(to top, ${colors.map(rgbaToHexa).join(", ")})` : "none";
}
var PNG_SIGNATURE = [
	137,
	80,
	78,
	71,
	13,
	10,
	26,
	10
];
function makePicture(width, height, pixels) {
	const stride = width * 3 + 1;
	const rows = new Uint8Array(stride * height);
	for (let row = 0; row < height; ++row) {
		rows[row * stride] = 2;
		for (let column = 0; column < width; ++column) for (let channel = 0; channel < 3; ++channel) {
			const from = (row * width + column) * 4 + channel;
			rows[row * stride + 1 + column * 3 + channel] = pixels[from] - (row ? pixels[from - width * 4] : 0);
		}
	}
	const header = /* @__PURE__ */ new Uint8Array(13);
	const headerView = new DataView(header.buffer);
	headerView.setUint32(0, width);
	headerView.setUint32(4, height);
	header.set([8, 2], 8);
	const chunks = [
		["IHDR", header],
		["IDAT", zlibSync(rows)],
		["IEND", /* @__PURE__ */ new Uint8Array(0)]
	];
	const bytes = new Uint8Array(chunks.reduce((size, [, data]) => size + 12 + data.length, PNG_SIGNATURE.length));
	const view = new DataView(bytes.buffer);
	bytes.set(PNG_SIGNATURE);
	let at = PNG_SIGNATURE.length;
	for (const [type, data] of chunks) {
		view.setUint32(at, data.length);
		for (let i = 0; i < 4; ++i) bytes[at + 4 + i] = type.charCodeAt(i);
		bytes.set(data, at + 8);
		view.setUint32(at + 8 + data.length, crc32(bytes.subarray(at + 4, at + 8 + data.length)));
		at += 12 + data.length;
	}
	return bytesToDataURL(bytes, "image/png");
}
function makeImage(key, width, height, rendering, make) {
	let image = images.get(key);
	if (!image) {
		const [pixels, shown = pixels] = make();
		const url = makePicture(width, height, pixels);
		images.set(key, image = `url("${url}")`);
		pictures.set(url, {
			url,
			rendering,
			width,
			height,
			pixels: shown
		});
	}
	return image;
}
function getColumnValues(colors, height) {
	const values = new Float32Array(height * 3);
	for (let row = 0; row < height; ++row) {
		const at = (height - row - .5) / height * (colors.length - 1);
		const index = Math.min(Math.floor(at), colors.length - 2);
		const [from, to] = [colors[index], colors[index + 1]];
		for (let channel = 0; channel < 3; ++channel) values[row * 3 + channel] = lerp(from[channel], to[channel], at - index);
	}
	return values;
}
var GOLDEN_RATIO = (Math.sqrt(5) - 1) / 2;
var getThreshold = (row) => row * GOLDEN_RATIO % 1;
function toPixels(values, toWhole) {
	const height = values.length / 3;
	const pixels = new Uint8ClampedArray(height * 4);
	for (let row = 0; row < height; ++row) {
		for (let channel = 0; channel < 3; ++channel) pixels[row * 4 + channel] = toWhole(values[row * 3 + channel], row);
		pixels[row * 4 + 3] = 255;
	}
	return pixels;
}
function makeOutgoingMessageGradientImage(colors) {
	const key = colors?.map(rgbaToHexa).join();
	if (!key) return "none";
	return makeImage(key, 1, COLUMN_HEIGHT, NEAREST, () => {
		const values = getColumnValues(colors, COLUMN_HEIGHT);
		return [toPixels(values, (value, row) => Math.floor(value + getThreshold(row))), toPixels(values, Math.round)];
	});
}
function getFreeformKey({ colors, freeform }) {
	return [...colors, freeform.textColor].map(rgbaToHexa).join();
}
var freeformPixels = /* @__PURE__ */ new Map();
/** the freeform gradient's picture at a phase: mixes of its points' colours, which all read (`getOutgoingMessageFreeformColors`) */
function getOutgoingMessageFreeformPixels(gradient, phase) {
	const key = `${getFreeformKey(gradient)}@${phase}`;
	let pixels = freeformPixels.get(key);
	if (!pixels) freeformPixels.set(key, pixels = getGradientPixels(gradient.colors.map(([r, g, b]) => ({
		r,
		g,
		b
	})), phase));
	return pixels;
}
function makeFreeformImage(gradient, phase) {
	return makeImage(`${getFreeformKey(gradient)}@${phase}`, 50, 50, SMOOTH, () => {
		return [getOutgoingMessageFreeformPixels(gradient, phase)];
	});
}
/**
* A colour of the bubbles' own under dark text (the time, the ticks, the links, a reaction's counter), darkened to be read
* all over their gradient, the freeform one's moves included, and on its own tint over it (a reaction)
*/
function keepReadableOnOutgoingMessageGradient(hex, gradient) {
	const painted = gradient.freeform ? getMixes(gradient.colors) : getPainted(gradient.colors);
	const luminances = painted.map(relativeLuminance);
	const contrast = (a, b) => (Math.max(a, b) + .05) / (Math.min(a, b) + .05);
	const reads = (accent) => {
		const rgb = hexToRgb(accent);
		const luminance = relativeLuminance(rgb);
		return painted.every((color, index) => {
			return contrast(luminance, luminances[index]) >= READABLE_CONTRAST && contrast(luminance, relativeLuminance(tintOver(color, rgb))) >= READABLE_CONTRAST;
		});
	};
	let [low, high] = [0, (Math.min(...luminances) + .05) / READABLE_CONTRAST - .05];
	if (reads(darkenToMaxLuminance(hex, high))) return darkenToMaxLuminance(hex, high);
	for (let i = 0; i < 16; ++i) {
		const luminance = (low + high) / 2;
		if (reads(darkenToMaxLuminance(hex, luminance))) low = luminance;
		else high = luminance;
	}
	return darkenToMaxLuminance(hex, low);
}
var frameMoves = /* @__PURE__ */ new WeakMap();
function setClasses(frame, phase, advance) {
	for (let index = 0; index < GRADIENT_PHASES; ++index) frame.classList.toggle(PHASE_CLASS + index, index === phase);
	for (let step = ADVANCE_STEPS[0]; step <= ADVANCE_STEPS[1]; ++step) frame.classList.toggle(ADVANCE_CLASS + step * ADVANCE_STEP, step === advance);
	frame.classList.toggle(ADVANCING_CLASS, advance !== void 0);
}
var appliedListeners = /* @__PURE__ */ new Set();
function subscribeOutgoingMessageGradient(callback) {
	appliedListeners.add(callback);
	return () => void appliedListeners.delete(callback);
}
/** whether the outgoing bubbles where the element is are of a gradient (a read of its computed style) */
function hasOutgoingMessageGradient(element) {
	const image = getComputedStyle(element).getPropertyValue(MESSAGE_OUT_GRADIENT_IMAGE_PROPERTY).trim();
	return !!image && image !== "none";
}
/** the outgoing bubbles' gradient of a theme on the element it is applied on (`themeController`) */
function applyOutgoingMessageGradient(element, gradient) {
	let background = "none";
	const images = new Array(GRADIENT_PHASES).fill("none");
	if (gradient?.freeform) {
		images.forEach((_, index) => images[index] = makeFreeformImage(gradient, index));
		background = images[0];
	} else if (gradient) {
		images.fill(makeOutgoingMessageGradientImage(gradient.colors));
		background = makeOutgoingMessageGradient(gradient.colors);
	}
	const set = (name, value) => setStyleProperty(element.style, name, value);
	set(MESSAGE_OUT_GRADIENT_PROPERTY, background);
	images.forEach((image, index) => set(`${IMAGE_PROPERTY}-${index}`, image));
	set(FREEFORM_PROPERTY, gradient?.freeform ? "1" : "0");
	set(RENDERING_PROPERTY, gradient && !gradient.freeform ? NEAREST : SMOOTH);
	set(DISPLAY_PROPERTY, gradient ? "block" : "none");
	set(NEXT_DISPLAY_PROPERTY, gradient?.freeform ? "block" : "none");
	set(CONTENT_BACKGROUND_PROPERTY, gradient ? "transparent" : "initial");
	set(UNDER_PROPERTY, gradient ? "initial" : "transparent");
	set(LIGHT_PRIMARY_PROPERTY, gradient ? "var(--light-message-out-primary-color)" : "initial");
	set(SOLID_PROPERTY, gradient ? rgbaToHexa(gradient.solid) : "initial");
	appliedListeners.forEach((callback) => callback());
}
/**
* The freeform gradient of the frame's outgoing bubbles moves on to its next phase, as the wallpaper does when a message
* is sent, and in the same time: the pieces of the next phase come up over those of this one (their opacity, which
* the compositor animates) and then take its place, so nothing is painted again while it moves. Returns whether it moves
*/
function advanceOutgoingMessageGradient(frame, duration) {
	let element = frame;
	while (element && !element.style.getPropertyValue(FREEFORM_PROPERTY)) element = element.parentElement;
	if (element?.style.getPropertyValue(FREEFORM_PROPERTY) !== "1") return false;
	let move = frameMoves.get(frame);
	if (!move) frameMoves.set(frame, move = { phase: 0 });
	if (move.advancing !== void 0) return false;
	const phase = (move.phase + GRADIENT_PHASES - 1) % GRADIENT_PHASES;
	const done = () => {
		move.phase = phase;
		move.advancing = void 0;
		setClasses(frame, phase);
	};
	if (!duration) {
		done();
		return true;
	}
	const step = clamp(Math.round(duration / ADVANCE_STEP), ADVANCE_STEPS[0], ADVANCE_STEPS[1]);
	setClasses(frame, move.phase, step);
	move.advancing = window.setTimeout(done, step * ADVANCE_STEP + 32);
	return true;
}
/**
* The gradient the content of an outgoing bubble shows: the picture it is filled with (the next phase's, while it moves
* to it), and the box it spans (the chat's frame). Nothing where the bubble is of one colour, which it is too where its
* piece is not drawn (no picture of the gradient, as in one that holds a widget; no clip for a fixed piece)
*/
function readOutgoingMessageGradient(content) {
	const frame = content.closest(".bubbles");
	const piece = frame && content.querySelector(":scope > .bubble-gradient");
	const pseudo = frame?.classList.contains(ADVANCING_CLASS) ? "::after" : "::before";
	const url = piece && getComputedStyle(piece, pseudo).backgroundImage.match(/^url\("?([^")]+)"?\)$/)?.[1];
	const picture = url && pictures.get(url);
	if (!picture) return;
	return {
		picture,
		frame: frame.getBoundingClientRect()
	};
}
/**
* The pieces of the gradient are fixed to the frame, until a transform on what they are in (a bubble swiped or moved
* aside by a change of another, its wrapper zoomed in by a ladder) takes them in, and they are laid out in that instead:
* placed there where the frame is, against where the element is laid out (past a transform of its own, which may be on
* already), they keep their colours while it lasts (`--message-out-gradient-held-top`, `-height`, which only the moving
* states read). The reads are made now; what is returned writes
*/
function measureOutgoingMessageGradientHold(elements) {
	const held = elements.filter((element) => element.offsetParent && element.closest(".bubble.is-out"));
	const frame = held[0]?.closest(".bubbles");
	if (!frame || !hasOutgoingMessageGradient(frame)) return;
	const frameRect = frame.getBoundingClientRect();
	const places = held.map((element) => {
		const parent = element.offsetParent;
		const parentRect = parent.getBoundingClientRect();
		return {
			left: parentRect.left + parent.clientLeft + element.offsetLeft,
			top: parentRect.top + parent.clientTop + element.offsetTop
		};
	});
	return () => held.forEach((element, index) => {
		element.style.setProperty("--message-out-gradient-held-left", `${frameRect.left - places[index].left}px`);
		element.style.setProperty("--message-out-gradient-held-top", `${frameRect.top - places[index].top}px`);
		element.style.setProperty("--message-out-gradient-held-width", `${frameRect.width}px`);
		element.style.setProperty("--message-out-gradient-held-height", `${frameRect.height}px`);
	});
}
function holdOutgoingMessageGradient(elements) {
	measureOutgoingMessageGradientHold(elements)?.();
}
/**
* A move of what all the bubbles are in (`container`, by a `translate` along y from `from` to `to`) takes in the pieces
* of the gradient in it, the chat's and every bubble's (both phases'), which are then laid out against its padding box, as tall as it is, and a
* freeform one as wide: each piece seen on the way is moved from there onto the frame, and back as the container
* goes, so that it stays on the frame and the bubbles go through the gradient as they would scrolled there. The reads
* are made now, with no transform on the container; what is returned starts the moves, in the container's time
*/
function measureOutgoingMessageGradientCounterMove(container, from, to) {
	const frame = container.closest(".bubbles");
	const image = frame && getComputedStyle(frame).getPropertyValue(MESSAGE_OUT_GRADIENT_IMAGE_PROPERTY).trim();
	const { clientWidth: width, clientHeight: height } = container;
	if (!image || image === "none" || !height) return;
	if (!("pseudoElement" in KeyframeEffect.prototype)) return null;
	const frameRect = frame.getBoundingClientRect();
	const rect = container.getBoundingClientRect();
	const y = frameRect.top - (rect.top + container.clientTop);
	const scaleY = frameRect.height / height;
	const freeform = {
		x: frameRect.left + frameRect.width / 2 - (rect.left + container.clientLeft + width / 2),
		scaleX: frameRect.width / width
	};
	const column = {
		x: 0,
		scaleX: 1
	};
	const reach = Math.max(Math.abs(from), Math.abs(to));
	const moves = [];
	container.querySelectorAll(".bubbles-gradient, .bubble.is-out .bubble-gradient, .bubble.is-out .bubble-tail").forEach((element) => {
		if (element.closest(".is-gradient-held, .is-gesturing-reply, .can-zoom-fade")) return;
		const elementRect = element.getBoundingClientRect();
		if (elementRect.bottom <= frameRect.top - reach || elementRect.top >= frameRect.bottom + reach) return;
		for (const pseudoElement of ["::before", "::after"]) {
			const style = getComputedStyle(element, pseudoElement);
			if (style.position === "fixed" && style.display !== "none") moves.push({
				element,
				pseudoElement,
				across: parseFloat(style.width) > 1 ? freeform : column
			});
		}
	});
	return (options) => moves.map(({ element, pseudoElement, across: { x, scaleX } }) => element.animate([{
		translate: `${x}px ${y - from}px`,
		scale: `${scaleX} ${scaleY}`
	}, {
		translate: `${x}px ${y - to}px`,
		scale: `${scaleX} ${scaleY}`
	}], {
		...options,
		pseudoElement
	}));
}
var MESSAGE_OUT_GRADIENT_HELD_CLASS = "is-gradient-held";
var heldBy = /* @__PURE__ */ new WeakMap();
/** marks the elements as moved (a write); what is returned unmarks them, once the last of their moves is over */
function markOutgoingMessageGradientHeld(elements) {
	for (const element of elements) {
		holdCount(heldBy, element);
		element.classList.add(MESSAGE_OUT_GRADIENT_HELD_CLASS);
	}
	return () => {
		for (const element of elements) if (releaseCount(heldBy, element)) element.classList.remove(MESSAGE_OUT_GRADIENT_HELD_CLASS);
	};
}
function getPictureColor({ width, height, pixels }, across, down) {
	const [x, y] = [clamp(across * width - .5, 0, width - 1), clamp(down * height - .5, 0, height - 1)];
	const [left, top] = [Math.floor(x), Math.floor(y)];
	const [right, bottom] = [Math.min(left + 1, width - 1), Math.min(top + 1, height - 1)];
	const at = (column, row) => {
		const offset = (row * width + column) * 4;
		return [
			pixels[offset],
			pixels[offset + 1],
			pixels[offset + 2]
		];
	};
	const [above, below] = [mixColors(at(left, top), at(right, top), 1 - (x - left)), mixColors(at(left, bottom), at(right, bottom), 1 - (x - left))];
	return rgbaToHexa(mixColors(above, below, 1 - (y - top)));
}
function getOutgoingMessageGradientColorAt({ picture, frame }, box) {
	return getPictureColor(picture, ((box.left + box.right) / 2 - frame.left) / (frame.right - frame.left), ((box.top + box.bottom) / 2 - frame.top) / (frame.bottom - frame.top));
}
//#endregion
//#region src/helpers/dom/customProperties.ts
var CustomProperties = class {
	constructor() {
		this.resetCache = () => {
			this.computedStyle = void 0;
			const cache = this.cache;
			this.cache = {};
			for (const i in cache) this.getProperty(i);
		};
		this.cache = {};
		this.nightElement = document.createElement("div");
		this.nightElement.className = "night";
		this.nightElement.style.display = "none";
		document.body.append(this.nightElement);
		rootScope.addEventListener("theme_changed", this.resetCache);
		mediaSizes.addEventListener("resize", this.resetCache);
	}
	getProperty(name, night) {
		const values = this.cache[name];
		const index = night ? 1 : 0;
		if (values?.[index]) return values[index];
		this.computedStyle ?? (this.computedStyle = window.getComputedStyle(document.documentElement));
		this.nightComputedStyle ?? (this.nightComputedStyle = window.getComputedStyle(this.nightElement));
		const value = (night ? this.nightComputedStyle : this.computedStyle).getPropertyValue("--" + name).trim();
		return this.setPropertyCache(name, value, night);
	}
	getPropertyAsColor(name) {
		if (name[0] === "#") return name;
		const value = this.getProperty(name);
		if (value[0] === "#") return value;
		return `rgb(${value})`;
	}
	getPropertyAsSize(name) {
		const value = this.getProperty(name);
		let size;
		if (value[value.length - 1] === "%") {} else if (value.indexOf("rem")) size = +value.replace("rem", "") * 16;
		else size = +value.replace("px", "");
		return size;
	}
	setPropertyCache(name, value, night) {
		var _this$cache;
		return ((_this$cache = this.cache)[name] ?? (_this$cache[name] = []))[night ? 1 : 0] = value;
	}
};
var customProperties = new CustomProperties();
MOUNT_CLASS_TO && (MOUNT_CLASS_TO.customProperties = customProperties);
//#endregion
//#region src/helpers/solid/createUnifiedSignal.ts
/**
* do not use getter in JSX
*/
function createUnifiedSignal(...args) {
	const [getter, setter] = createSignal(...args);
	return (...args) => {
		if (args.length === 0) return getter();
		return setter(...args);
	};
}
//#endregion
//#region src/helpers/windowSize.ts
var WindowSize = class {
	constructor() {
		if (IS_WORKER) return;
		this._width = createUnifiedSignal();
		this._height = createUnifiedSignal();
		this.set = () => this.setDimensions();
		this.bindViewport(getAppWindow());
		onAppWindowChange((win) => this.bindViewport(win));
	}
	bindViewport(win) {
		this.viewport?.removeEventListener("resize", this.set);
		this.viewport = win;
		this.viewport.addEventListener("resize", this.set);
		this.set();
	}
	setDimensions() {
		const w = this.viewport;
		this._width(w.width || w.innerWidth);
		this._height(w.height || w.innerHeight);
	}
	get width() {
		return this._width();
	}
	get height() {
		return this._height();
	}
};
var windowSize = new WindowSize();
MOUNT_CLASS_TO && (MOUNT_CLASS_TO.windowSize = windowSize);
//#endregion
//#region src/config/transitions.ts
var Transitions = { standard: {
	easing: "cubic-bezier(.4, .0, .2, 1)",
	duration: {
		true: 300,
		false: 250
	}
} };
function getTransition(type, forwards = true, keyframes) {
	const transition = Transitions[type];
	if (!forwards && keyframes) keyframes = keyframes.slice().reverse();
	if (typeof transition.duration !== "number") return {
		...transition,
		duration: transition.duration["" + forwards],
		keyframes
	};
	return {
		...transition,
		keyframes
	};
}
//#endregion
//#region src/helpers/themeController.ts
var THEME_TRANSITION_TIMEOUT = 2e3;
var appColorMap = {
	"primary-color": {
		rgb: true,
		light: true,
		lightFilled: true,
		dark: true,
		darkRgb: true
	},
	"message-out-primary-color": {
		light: true,
		lightFilled: true,
		rgb: true
	},
	"surface-color": { rgb: true },
	"danger-color": {
		rgb: true,
		light: true,
		dark: true
	},
	"primary-text-color": { rgb: true },
	"secondary-text-color": {
		light: true,
		lightFilled: true,
		rgb: true
	},
	"message-background-color": {
		light: true,
		lightFilled: true,
		dark: true,
		darkFilled: true
	},
	"message-out-background-color": {
		light: true,
		lightFilled: true,
		dark: true,
		darkFilled: true,
		rgb: true
	},
	"saved-color": { lightFilled: true },
	"green-color": { rgb: true },
	"background-color": { rgb: true },
	"body-background-color": { rgb: true },
	"border-color": {},
	"secondary-color": {},
	"link-color": {},
	"input-search-background-color": {},
	"reaction-paid-outside-background-color": {},
	"reaction-paid-outside-color": {},
	"reaction-paid-outside-chosen-background-color": {}
};
var PAID_REACTION_OUTSIDE_DAY_COLORS = {
	"reaction-paid-outside-background-color": "#FEF1D4",
	"reaction-paid-outside-color": "#D3720A",
	"reaction-paid-outside-chosen-background-color": "#FFBC2E"
};
var colorMap = {
	day: {
		"primary-color": "#3390ec",
		"message-out-primary-color": "#5CA853",
		"message-background-color": "#ffffff",
		"surface-color": "#ffffff",
		"danger-color": "#df3f40",
		"primary-text-color": "#000000",
		"secondary-text-color": "#707579",
		"saved-color": "#359AD4",
		"green-color": "#70b768",
		"background-color": "#f4f4f5",
		"body-background-color": "#ffffff",
		"border-color": "#dfe1e5",
		"secondary-color": "#c4c9cc",
		"input-search-background-color": "#ffffff",
		...PAID_REACTION_OUTSIDE_DAY_COLORS
	},
	night: {
		"primary-color": "#8774E1",
		"message-out-primary-color": "#8774E1",
		"message-background-color": "#212121",
		"surface-color": "#212121",
		"danger-color": "#ff595a",
		"primary-text-color": "#ffffff",
		"secondary-text-color": "#aaaaaa",
		"saved-color": "#8774E1",
		"green-color": "#5CC85E",
		"background-color": "#181818",
		"body-background-color": "#181818",
		"border-color": "#0f0f0f",
		"secondary-color": "#707579",
		"input-search-background-color": "#181818",
		"reaction-paid-outside-background-color": "#D3720A33",
		"reaction-paid-outside-color": "#FFD738",
		"reaction-paid-outside-chosen-background-color": "#D3720A"
	},
	tinted: {
		"primary-color": "#3685FA",
		"message-out-primary-color": "#3685FA",
		"message-background-color": "#232E3B",
		"surface-color": "#1D2733",
		"danger-color": "#FF595A",
		"primary-text-color": "#FFFFFF",
		"secondary-text-color": "#7D8B99",
		"saved-color": "#3685FA",
		"green-color": "#61D36B",
		"background-color": "#151E27",
		"body-background-color": "#151E27",
		"border-color": "#0F151B",
		"secondary-color": "#7D8B99",
		"input-search-background-color": "#212D3B",
		"reaction-paid-outside-background-color": "#FEF1D4",
		"reaction-paid-outside-color": "#D3720A",
		"reaction-paid-outside-chosen-background-color": "#D3720A"
	},
	light: {
		"primary-color": "#2D7ED5",
		"message-out-primary-color": "#2D7ED5",
		"message-background-color": "#F0F0F0",
		"surface-color": "#FFFFFF",
		"danger-color": "#DF3F40",
		"primary-text-color": "#333333",
		"secondary-text-color": "#8C8E91",
		"saved-color": "#2D7ED5",
		"green-color": "#04AC35",
		"background-color": "#F4F4F5",
		"body-background-color": "#FFFFFF",
		"border-color": "#DFE1E5",
		"secondary-color": "#C4C9CC",
		"input-search-background-color": "#FFFFFF",
		...PAID_REACTION_OUTSIDE_DAY_COLORS
	}
};
var themeNameToBaseTheme = {
	day: "baseThemeClassic",
	night: "baseThemeNight",
	light: "baseThemeDay",
	tinted: "baseThemeTinted"
};
var NIGHT_THEME_NAMES = /* @__PURE__ */ new Set(["night", "tinted"]);
var log = logger("THEME");
var ThemeController = class {
	constructor() {
		rootScope.addEventListener("theme_change", (coordinates) => {
			this.setTheme(typeof coordinates === "object" ? coordinates : void 0);
		});
		rootScope.addEventListener("theme_changed", () => {
			this.setWorkerThemeParams();
		});
		const themeKey = joinDeepPath("settings", "theme");
		rootScope.addEventListener("settings_updated", ({ key, value }) => {
			if (key === joinDeepPath("settings", "increaseContrast")) {
				this.setTheme();
				return;
			}
			if (key !== themeKey) return;
			const [, setAppSettings] = useAppSettings();
			if (value === "night" || value === "tinted") setAppSettings("lastThemeNames", "dark", value);
			else if (value === "day" || value === "light") setAppSettings("lastThemeNames", "light", value);
		});
	}
	setWorkerThemeParams() {
		rootScope.managers.apiManager.setThemeParams({
			_: "dataJSON",
			data: JSON.stringify(this.getThemeParamsForWebView())
		});
	}
	get themeColorElem() {
		if (this._themeColorElem !== void 0) return this._themeColorElem;
		return this._themeColorElem = document.head.querySelector("[name=\"theme-color\"]") || null;
	}
	setThemeColor(color = this.themeColor) {
		if (!color) color = colorMap[this.getResolvedThemeName()]?.["surface-color"] || (this.isNight() ? "#212121" : "#ffffff");
		const themeColorElem = this.themeColorElem;
		if (themeColorElem) themeColorElem.setAttribute("content", color);
	}
	setThemeListener() {
		try {
			const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
			const checkDarkMode = () => {
				this.systemTheme = darkModeMediaQuery.matches ? "night" : "day";
				if (rootScope.myId) rootScope.dispatchEvent("theme_change");
				else this.setTheme();
			};
			if ("addEventListener" in darkModeMediaQuery) darkModeMediaQuery.addEventListener("change", checkDarkMode);
			else if ("addListener" in darkModeMediaQuery) darkModeMediaQuery.addListener(checkDarkMode);
			checkDarkMode();
		} catch (err) {}
	}
	applyHighlightingColor({ hsla, element = document.documentElement } = {}) {
		if (!hsla) {
			hsla = "hsla(85.5319, 36.9171%, 40.402%, .4)";
			const theme = this.getTheme();
			const themeSettings = this.getThemeSettings(theme);
			if (themeSettings?.highlightingColor) hsla = themeSettings.highlightingColor;
		}
		const highlightingRgba = hslaStringToRgba(hsla);
		element.style.setProperty("--message-highlighting-color", hsla);
		element.style.setProperty("--message-highlighting-color-rgb", highlightingRgba.slice(0, 3).join(","));
		element.style.setProperty("--message-highlighting-alpha", "" + highlightingRgba[3] / 255);
		if (!IS_TOUCH_SUPPORTED && hsla) this.themeColor = hslaStringToHex(hsla);
	}
	isHighContrast() {
		return Modes.a11y && !!useAppSettings()[0].increaseContrast;
	}
	_setTheme(silent) {
		const _log = log.bindPrefix("setTheme");
		_log(`set colors, silent=${silent}`);
		const isNight = this.isNight();
		document.head.querySelector("[name=\"color-scheme\"]")?.setAttribute("content", isNight ? "dark" : "light");
		document.documentElement.classList.toggle("night", isNight);
		document.documentElement.classList.toggle("high-contrast", this.isHighContrast());
		this.setThemeColor();
		const theme = this.getTheme();
		this.applyTheme(theme);
		let style = this.styleElement;
		if (!style) {
			style = this.styleElement = document.createElement("style");
			document.head.append(style);
		}
		const e = document.createElement("div");
		this.applyTheme(isNight ? theme : this.getTheme("night"), e, true);
		style.textContent = `.night {${e.style.cssText}}`;
		this.applyHighlightingColor();
		!silent && rootScope.dispatchEventSingle("theme_changed");
		_log("end");
	}
	setTheme(coordinates) {
		const _log = log.bindPrefix("setTheme");
		const animationLevel = liteMode.getAnimationLevel();
		const fast = !("startViewTransition" in document) || !this.applied || !animationLevel;
		_log(`start, fast=${fast}, coordinates=${JSON.stringify(coordinates)}, animationLevel=${animationLevel}`);
		if (fast) {
			const silent = !this.applied;
			const wasApplied = this.applied;
			this.applied = true;
			this._setTheme(silent);
			if (!wasApplied) this.setWorkerThemeParams();
			return;
		}
		if (animationLevel < 2) coordinates = void 0;
		const reverse = !this.isNight();
		if (coordinates) {
			document.documentElement.classList.add("no-view-transition");
			document.documentElement.classList.toggle("reverse", reverse);
			document.documentElement.offsetLeft;
		}
		const transition = document.startViewTransition(async () => {
			_log("view transition started");
			this._setTheme();
			const bg = this.appChatBackground;
			if (bg) await Promise.race([bg.getReadyPromise(), pause(500)]);
		});
		dispatchHeavyAnimationEvent(transition.finished.catch(noop), THEME_TRANSITION_TIMEOUT);
		const safetyTimeout = setTimeout(() => {
			_log("view transition safety timeout — forcing skip");
			transition.skipTransition?.();
		}, THEME_TRANSITION_TIMEOUT);
		transition.finished.catch(noop).then(() => clearTimeout(safetyTimeout));
		if (!coordinates) {
			transition.ready.catch(noop);
			_log("view transition is not needed");
			return;
		}
		const { x, y } = coordinates;
		const pseudoElement = `::view-transition-${reverse ? "old" : "new"}(root)`;
		let clipAnimation;
		transition.ready.then(() => {
			_log("view transition ready");
			const box = getComputedStyle(document.documentElement, pseudoElement);
			const width = parseFloat(box.width);
			const height = parseFloat(box.height);
			const measured = width > 0 && height > 0;
			const endRadius = Math.hypot(Math.max(x, (measured ? width : windowSize.width) - x), Math.max(y, (measured ? height : windowSize.height) - y));
			const circle = measured ? (radius) => `circle(${radius / Math.hypot(width, height) * Math.SQRT2 * 100}% at ${x / width * 100}% ${y / height * 100}%)` : (radius) => `circle(${radius}px at ${x}px ${y}px)`;
			const { easing, duration, keyframes } = getTransition("standard", !reverse, [{ clipPath: circle(0) }, { clipPath: circle(endRadius) }]);
			clipAnimation = document.documentElement.animate(keyframes, {
				duration: duration * 2,
				easing,
				pseudoElement,
				fill: "forwards"
			});
		}).catch(noop);
		transition.finished.catch(noop).finally(() => {
			clipAnimation?.cancel();
			_log("view transition end");
			document.documentElement.classList.remove("no-view-transition", "reverse");
		});
	}
	async switchTheme(name, coordinates) {
		const [appSettings, setAppSettings] = useAppSettings();
		if (name === void 0) {
			const last = appSettings.lastThemeNames;
			name = this.isNight() ? last?.light ?? "day" : last?.dark ?? "night";
		}
		await setAppSettings("theme", name);
		rootScope.dispatchEvent("theme_change", coordinates);
	}
	isNight() {
		return this.isNightThemeName(this.getTheme()?.name);
	}
	isNightThemeName(name) {
		return NIGHT_THEME_NAMES.has(name);
	}
	getResolvedThemeName() {
		const [appSettings] = useAppSettings();
		const setting = appSettings.theme;
		return setting === "system" ? this.systemTheme : setting;
	}
	getTheme(name = this.getResolvedThemeName()) {
		const [appSettings] = useAppSettings();
		return appSettings.themes.find((t) => t.name === name) ?? SETTINGS_INIT.themes.find((t) => t.name === name);
	}
	getThemeName(theme) {
		const appTheme = theme;
		if (appTheme?.name && appTheme.name !== "system") return appTheme.name;
		return this.getResolvedThemeName();
	}
	getBaseThemeForName(name) {
		return themeNameToBaseTheme[name] ?? (this.isNightThemeName(name) ? "baseThemeNight" : "baseThemeClassic");
	}
	bindColorApplier(options, defaultMixColor) {
		const appliedColors = /* @__PURE__ */ new Set();
		const fallbackName = options.themeName ?? (options.isNight ? "night" : "day");
		return {
			applyAppColor: (_options) => {
				appliedColors.add(_options.name);
				return this.applyAppColor({
					mixColor: defaultMixColor,
					..._options,
					...options
				});
			},
			finalize: () => {
				for (const name in appColorMap) if (!appliedColors.has(name)) this.applyAppColor({
					name,
					hex: colorMap[fallbackName][name],
					mixColor: defaultMixColor,
					...options
				});
			}
		};
	}
	applyAppColor({ name, hex, element, lightenAlpha = .08, darkenAlpha = lightenAlpha, mixColor, isNight = this.isNight(), themeName, saveToCache }) {
		const appColor = appColorMap[name];
		const resolvedName = themeName ?? (isNight ? "night" : "day");
		mixColor ?? (mixColor = hexToRgb(colorMap[resolvedName]["surface-color"]));
		const increaseContrast = this.isHighContrast();
		if (increaseContrast) {
			if (name === "message-out-background-color" && isNight) hex = ensureTextContrast(hex, [
				255,
				255,
				255
			]);
			if (name === "message-out-primary-color") {
				const messageSurface = isNight ? hexToRgb(ensureTextContrast(rgbaToHexa(mixColor), [
					255,
					255,
					255
				])) : mixColor;
				hex = ensureTextContrast(hex, messageSurface);
			}
			if (name === "primary-color" || name === "secondary-text-color" || name === "danger-color" || name === "link-color" || name === "green-color") {
				const background = hexToRgb(colorMap[resolvedName]["background-color"]);
				const surfaceLuminance = relativeLuminance(mixColor);
				const backgroundLuminance = relativeLuminance(background);
				const limitingSurface = isNight ? surfaceLuminance > backgroundLuminance ? mixColor : background : surfaceLuminance < backgroundLuminance ? mixColor : background;
				hex = ensureTextContrast(hex, isNight ? mixColors([
					255,
					255,
					255
				], limitingSurface, .05) : limitingSurface);
			}
		}
		if (name === "primary-color" || name === "secondary-text-color" || name === "danger-color") {
			const buttonColorName = name.replace("-text", "").replace("-color", "-button-color");
			element.style.setProperty("--" + buttonColorName, increaseContrast ? ensureTextContrast(hex, [
				255,
				255,
				255
			]) : hex);
		}
		const rgb = hexToRgb(hex);
		const hsla = rgbaToHsla(...rgb);
		const lightenedRgb = mixColors(rgb, mixColor, lightenAlpha);
		const darkenedHsla = {
			...hsla,
			l: hsla.l - darkenAlpha * 100
		};
		const properties = [
			[name, hex],
			appColor.rgb && [name + "-rgb", rgb.join(",")],
			appColor.light && ["light-" + name, `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${lightenAlpha})`],
			appColor.lightFilled && ["light-filled-" + name, rgbaToHexa(lightenedRgb)],
			appColor.dark && ["dark-" + name, `hsl(${darkenedHsla.h}, ${darkenedHsla.s}%, ${darkenedHsla.l}%)`]
		];
		saveToCache ?? (saveToCache = element === document.documentElement);
		properties.filter(Boolean).forEach(([name, value]) => {
			element.style.setProperty("--" + name, value);
			if (saveToCache) customProperties.setPropertyCache(name, value, isNight);
		});
	}
	applyAccentPreset(preset) {
		const currentTheme = this.getTheme();
		const baseTheme = this.getBaseThemeForName(currentTheme.name);
		const settings = presetToThemeSettings(preset, baseTheme);
		const synthetic = {
			_: "theme",
			id: presetThemeId(preset),
			access_hash: "",
			slug: "",
			title: "",
			pFlags: {},
			settings: [settings]
		};
		return this.applyNewTheme(synthetic);
	}
	resetActiveTheme() {
		const currentTheme = this.getTheme();
		const defaultTheme = SETTINGS_INIT.themes.find((t) => t.name === currentTheme.name);
		if (!defaultTheme) return Promise.resolve();
		return this.applyNewTheme({
			...defaultTheme,
			settings: defaultTheme.settings
		});
	}
	async applyNewTheme(theme) {
		const currentTheme = this.getTheme();
		const themeName = currentTheme.name;
		const isNight = this.isNightThemeName(themeName);
		const baseTheme = this.getBaseThemeForName(themeName);
		const [appSettings] = useAppSettings();
		const themes = appSettings.themes.slice();
		const themeSettings = theme.settings.find((s) => s.base_theme._ === baseTheme) ?? theme.settings.find((s) => s.base_theme._ === (isNight ? "baseThemeNight" : "baseThemeClassic"));
		const themeId = String(theme.id ?? "");
		const isCurated = themeId === "" || themeId.startsWith("preset:");
		let effectiveWallpaper = getCloudThemeWallpaper(theme, themeSettings);
		if (themeName === "tinted" && !isCurated && effectiveWallpaper) effectiveWallpaper = blendWallpaperForTinted(effectiveWallpaper, themeSettings.accent_color);
		effectiveWallpaper ?? (effectiveWallpaper = this.getThemeWallpaper(currentTheme));
		const newSettings = theme.settings.map((s) => ({
			...s,
			wallpaper: s.base_theme._ === themeSettings.base_theme._ ? effectiveWallpaper : s.wallpaper,
			highlightingColor: ""
		}));
		const targetSettings = newSettings.find((s) => s.base_theme._ === themeSettings.base_theme._);
		const newAppTheme = {
			...theme,
			name: themeName,
			settings: newSettings
		};
		await this.AppBackgroundTab.setBackgroundDocument(effectiveWallpaper, targetSettings);
		let idx = themes.indexOf(currentTheme);
		if (idx < 0) idx = themes.findIndex((t) => t.name === themeName);
		if (idx < 0) themes.push(newAppTheme);
		else themes[idx] = newAppTheme;
		const [, setAppSettings] = useAppSettings();
		await setAppSettings("themes", themes);
	}
	isNightTheme(theme) {
		return this.isNightThemeName(this.getThemeName(theme));
	}
	getThemeSettings(theme, isNight) {
		if (!theme?.settings) return void 0;
		if (!Array.isArray(theme.settings)) return theme.settings;
		const themeName = this.getThemeName(theme);
		const baseTheme = this.getBaseThemeForName(themeName);
		return theme.settings.find((s) => s.base_theme._ === baseTheme) ?? theme.settings.find((s) => s.base_theme._ === (isNight ?? this.isNightThemeName(themeName) ? "baseThemeNight" : "baseThemeClassic"));
	}
	getThemeWallpaper(theme) {
		const settings = this.getThemeSettings(theme);
		return (settings && (theme.name ? settings.wallpaper : getCloudThemeWallpaper(theme, settings))) ?? this.getThemeSettings(this.getTheme())?.wallpaper ?? this.getThemeSettings(SETTINGS_INIT.themes.find((t) => t.name === this.getResolvedThemeName())).wallpaper;
	}
	setWallpaperForCurrentTheme(wallpaper, highlightingColor) {
		const theme = this.getTheme();
		const [appSettings, setAppSettings] = useAppSettings();
		const themes = appSettings.themes.slice();
		let idx = themes.indexOf(theme);
		if (idx < 0) idx = themes.findIndex((t) => t.name === theme.name);
		if (idx < 0) return Promise.resolve();
		const t = themes[idx];
		let settings;
		if (Array.isArray(t.settings)) {
			const themeName = this.getThemeName(t);
			const baseTheme = this.getBaseThemeForName(themeName);
			let sIdx = t.settings.findIndex((s) => s.base_theme._ === baseTheme);
			if (sIdx < 0) sIdx = t.settings.findIndex((s) => s.base_theme._ === (this.isNightThemeName(themeName) ? "baseThemeNight" : "baseThemeClassic"));
			if (sIdx < 0) sIdx = 0;
			settings = t.settings.map((s, i) => i === sIdx ? {
				...s,
				wallpaper,
				highlightingColor
			} : s);
		} else settings = {
			...t.settings,
			wallpaper,
			highlightingColor
		};
		themes[idx] = {
			...t,
			settings
		};
		return setAppSettings("themes", themes);
	}
	applyTheme(theme, element = document.documentElement, saveToCache) {
		const themeName = this.getThemeName(theme);
		const isNight = this.isNightThemeName(themeName);
		const themeSettings = this.getThemeSettings(theme, isNight);
		const baseColors = colorMap[themeName] || colorMap[isNight ? "night" : "day"];
		let hsvTemp1 = rgbToHsv(...hexToRgb(baseColors["primary-color"]));
		let hsvTemp2 = rgbToHsv(...getRgbColorFromTelegramColor(themeSettings.accent_color));
		let tintedSurfaceRgb;
		let tintedAccentRgb;
		let mainBackgroundColor;
		let additionalBackgroundColor;
		let inputBackgroundColor;
		let mainSeparatorColor;
		let mainSecondaryColor;
		let mainSecondaryTextColor;
		if (themeName === "tinted") {
			const rawAccentRgb = getRgbColorFromTelegramColor(themeSettings.accent_color);
			const accHsv = rgbToHsv(...rawAccentRgb);
			const clampedV = Math.max(accHsv[2], .18);
			tintedAccentRgb = hsvToRgb(accHsv[0], accHsv[1], clampedV);
			const withMul = (h, s, b) => rgbaToHexa(hsvToRgb(accHsv[0] * h % 360, Math.min(1, accHsv[1] * s), Math.min(1, clampedV * b)));
			mainBackgroundColor = withMul(1.024, .585, .25);
			additionalBackgroundColor = withMul(1.024, .573, .18);
			inputBackgroundColor = withMul(1.02, .609, .15);
			mainSeparatorColor = withMul(1.033, .426, .34);
			mainSecondaryColor = withMul(1.019, .109, .59);
			mainSecondaryTextColor = withMul(.956, .17, 1);
			tintedSurfaceRgb = hexToRgb(mainBackgroundColor);
		}
		const newAccentRgb = tintedAccentRgb ?? changeColorAccent(hsvTemp1, hsvTemp2, hexToRgb(baseColors["primary-color"]), !isNight);
		const newAccentHex = rgbaToHexa(newAccentRgb);
		const defaultMixColor = tintedSurfaceRgb;
		const { applyAppColor, finalize } = this.bindColorApplier({
			element,
			isNight,
			themeName,
			saveToCache
		}, defaultMixColor);
		applyAppColor({
			name: "primary-color",
			hex: newAccentHex,
			darkenAlpha: .04
		});
		applyAppColor({
			name: "link-color",
			hex: newAccentHex
		});
		applyAppColor({
			name: "saved-color",
			hex: newAccentHex,
			lightenAlpha: .64,
			mixColor: [
				255,
				255,
				255
			]
		});
		if (themeName === "tinted") {
			applyAppColor({
				name: "surface-color",
				hex: mainBackgroundColor
			});
			applyAppColor({
				name: "background-color",
				hex: additionalBackgroundColor
			});
			applyAppColor({
				name: "body-background-color",
				hex: additionalBackgroundColor
			});
			applyAppColor({
				name: "message-background-color",
				hex: mainBackgroundColor
			});
			applyAppColor({
				name: "input-search-background-color",
				hex: inputBackgroundColor
			});
			applyAppColor({
				name: "border-color",
				hex: mainSeparatorColor
			});
			applyAppColor({
				name: "secondary-color",
				hex: mainSecondaryColor
			});
			applyAppColor({
				name: "secondary-text-color",
				hex: mainSecondaryTextColor
			});
		}
		const bubbleSettings = themeSettings.message_colors?.length ? themeSettings : untrack(() => this.getThemeSettings(this.getTheme(themeName)));
		const messageColors = bubbleSettings?.message_colors;
		const outgoingTextColor = hexToRgb(baseColors["primary-text-color"]);
		const outgoingGradient = this.isHighContrast() ? void 0 : getOutgoingMessageGradient(messageColors, !!bubbleSettings?.pFlags?.message_colors_animated, outgoingTextColor);
		applyOutgoingMessageGradient(element, outgoingGradient);
		if (!messageColors?.length) return;
		const messageLightenAlpha = isNight ? 1 : .12;
		const baseMessageColor = hexToRgb(baseColors["message-out-primary-color"]);
		hsvTemp1 = rgbToHsv(...baseMessageColor);
		const surfaceForMessage = tintedSurfaceRgb ?? hexToRgb(baseColors["surface-color"]);
		const baseMessageOutBackgroundColor = mixColors(baseMessageColor, surfaceForMessage, messageLightenAlpha);
		let myMessagesAccent = getRgbColorFromTelegramColor(messageColors[0]);
		if (messageColors.length > 1) {
			messageColors.slice(1).forEach((nextColor) => {
				myMessagesAccent = getAverageColor(myMessagesAccent, getRgbColorFromTelegramColor(nextColor));
			});
			myMessagesAccent = getAccentColor(hsvTemp1, baseMessageOutBackgroundColor, myMessagesAccent);
		}
		hsvTemp2 = rgbToHsv(...myMessagesAccent);
		const accentColor2 = themeSettings.outbox_accent_color !== void 0 && rgbToHsv(...getRgbColorFromTelegramColor(themeSettings.outbox_accent_color));
		let newMessageOutBackgroundColor = mixColors(myMessagesAccent, surfaceForMessage, messageLightenAlpha);
		if (!isNight) {
			const messageOutBackgroundColorHsl = rgbaToHsla(...newMessageOutBackgroundColor);
			messageOutBackgroundColorHsl.s = Math.min(messageOutBackgroundColorHsl.s + (isNight ? 8 : 63), 100);
			newMessageOutBackgroundColor = hslaToRgba(messageOutBackgroundColorHsl.h, messageOutBackgroundColorHsl.s, messageOutBackgroundColorHsl.l, messageOutBackgroundColorHsl.a).slice(0, 3);
		}
		applyAppColor({
			name: "message-out-background-color",
			hex: rgbaToHexa(newMessageOutBackgroundColor),
			lightenAlpha: messageLightenAlpha
		});
		const outgoingAccent = rgbaToHexa(accentColor2 ? hsvToRgb(...accentColor2) : myMessagesAccent);
		applyAppColor({
			name: "message-out-primary-color",
			hex: isNight ? "#ffffff" : outgoingGradient ? keepReadableOnOutgoingMessageGradient(outgoingAccent, outgoingGradient) : outgoingAccent,
			mixColor: newMessageOutBackgroundColor,
			lightenAlpha: MESSAGE_OUT_TINT
		});
		finalize();
	}
	getThemeParamsForWebView() {
		const themePropertiesMap = {
			bg_color: "surface-color",
			button_color: "primary-color",
			button_text_color: "#ffffff",
			hint_color: "secondary-text-color",
			link_color: "link-color",
			secondary_bg_color: "background-color",
			text_color: "primary-text-color",
			header_bg_color: "surface-color",
			accent_text_color: "primary-color",
			section_bg_color: "surface-color",
			section_header_text_color: "primary-color",
			subtitle_text_color: "secondary-text-color",
			destructive_text_color: "danger-color"
		};
		const themeParams = {};
		for (const key in themePropertiesMap) {
			const value = themePropertiesMap[key];
			themeParams[key] = value[0] === "#" ? value : customProperties.getProperty(value);
		}
		return themeParams;
	}
};
var themeController = new ThemeController();
MOUNT_CLASS_TO && (MOUNT_CLASS_TO.themeController = themeController);
//#endregion
export { FontFamily as C, FontSize as D, FontFullBold as E, getGradientPixels as S, FontFull as T, holdCount as _, createUnifiedSignal as a, GRADIENT_PHASES as b, getOutgoingMessageGradientColorAt as c, markOutgoingMessageGradientHeld as d, measureOutgoingMessageGradientCounterMove as f, setStyleProperty as g, subscribeOutgoingMessageGradient as h, windowSize as i, hasOutgoingMessageGradient as l, readOutgoingMessageGradient as m, Transitions as n, customProperties as o, measureOutgoingMessageGradientHold as p, getTransition as r, advanceOutgoingMessageGradient as s, themeController as t, holdOutgoingMessageGradient as u, releaseCount as v, FontFamilyName as w, GRADIENT_POSITIONS as x, bytesToDataURL as y };
