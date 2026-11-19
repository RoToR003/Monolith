//# allFunctionsCalledOnLoad
import { s as IS_MOBILE } from "./userAgent-ByGXcznk.js";
import { t as App } from "./app-BuFf8z8C.js";
import { t as clamp } from "./clamp-9UaNhw6N.js";
//#region src/helpers/getTimeFormat.ts
function getTimeFormat() {
	const t = document.createElement("input");
	t.type = "time";
	t.value = "15:00";
	t.style.visibility = "hidden";
	document.body.append(t);
	const offsetWidth = t.offsetWidth;
	t.remove();
	return offsetWidth > 110 ? "h12" : "h23";
}
//#endregion
//#region src/helpers/color.ts
/**
* https://stackoverflow.com/a/54070620/6758968
* r, g, b in [0, 255]
* @returns h in [0,360) and s, v in [0,1]
*/
function rgbToHsv(r, g, b) {
	r /= 255, g /= 255, b /= 255;
	const v = Math.max(r, g, b), c = v - Math.min(r, g, b);
	const h = c && (v === r ? (g - b) / c : v == g ? 2 + (b - r) / c : 4 + (r - g) / c);
	return [
		60 * (h < 0 ? h + 6 : h),
		v && c / v,
		v
	];
}
/**
* https://stackoverflow.com/a/54024653/6758968
* @param h [0, 360]
* @param s [0, 1]
* @param v [0, 1]
* @returns r, g, b in [0, 255]
*/
function hsvToRgb(h, s, v) {
	const f = (n, k = (n + h / 60) % 6) => Math.round((v - v * s * Math.max(Math.min(k, 4 - k, 1), 0)) * 255);
	return [
		f(5),
		f(3),
		f(1)
	];
}
/**
* @returns h [0, 360], s [0, 100], l [0, 100], a [0, 1]
*/
function rgbaToHsla(r, g, b, a = 1) {
	r /= 255, g /= 255, b /= 255;
	const max = Math.max(r, g, b), min = Math.min(r, g, b);
	let h, s;
	const l = (max + min) / 2;
	if (max === min) h = s = 0;
	else {
		const d = max - min;
		s = l > .5 ? d / (2 - max - min) : d / (max + min);
		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			case b: h = (r - g) / d + 4;
		}
		h /= 6;
	}
	return {
		h: h * 360,
		s: s * 100,
		l: l * 100,
		a
	};
}
function hslaToString(hsla) {
	return `hsla(${hsla.h}, ${hsla.s}%, ${hsla.l}%, ${hsla.a})`;
}
/**
* Converts an HSL color value to RGB. Conversion formula
* adapted from http://en.wikipedia.org/wiki/HSL_color_space.
*
* @param   {number}  h       The hue [0, 360]
* @param   {number}  s       The saturation [0, 1]
* @param   {number}  l       The lightness [0, 1]
* @return  {Array}           The RGB representation [0, 255]
*/
function hslaToRgba(h, s, l, a) {
	h /= 360, s /= 100, l /= 100;
	let r, g, b;
	if (s === 0) r = g = b = l;
	else {
		const hue2rgb = function hue2rgb(p, q, t) {
			if (t < 0) t += 1;
			if (t > 1) t -= 1;
			if (t < 1 / 6) return p + (q - p) * 6 * t;
			if (t < 1 / 2) return q;
			if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
			return p;
		};
		const q = l < .5 ? l * (1 + s) : l + s - l * s;
		const p = 2 * l - q;
		r = hue2rgb(p, q, h + 1 / 3);
		g = hue2rgb(p, q, h);
		b = hue2rgb(p, q, h - 1 / 3);
	}
	return [
		r,
		g,
		b,
		a
	].map((v) => Math.round(v * 255));
}
function hslaStringToRgba(hsla) {
	const splitted = hsla.slice(5, -1).split(", ");
	const alpha = +splitted.pop();
	const arr = splitted.map((val) => {
		if (val.endsWith("%")) return +val.slice(0, -1);
		return +val;
	});
	return hslaToRgba(arr[0], arr[1], arr[2], alpha);
}
function hexaToRgba(hexa) {
	const arr = [];
	const offset = hexa[0] === "#" ? 1 : 0;
	if (hexa.length === 5 + offset) hexa = (offset ? "#" : "") + "0" + hexa.slice(offset);
	if (hexa.length === 3 + offset) for (let i = offset; i < hexa.length; ++i) arr.push(parseInt(hexa[i] + hexa[i], 16));
	else if (hexa.length === 4 + offset) {
		for (let i = offset; i < hexa.length - 1; ++i) arr.push(parseInt(hexa[i] + hexa[i], 16));
		arr.push(parseInt(hexa[hexa.length - 1], 16));
	} else for (let i = offset; i < hexa.length; i += 2) arr.push(parseInt(hexa.slice(i, i + 2), 16));
	return arr;
}
function hexToRgb(hex) {
	return hexaToRgba(hex.slice(0, 7));
}
function rgbIntToHex(int, alpha) {
	let str = `#${int.toString(16).padStart(6, "0")}`;
	if (alpha !== void 0) str += `${Math.floor(alpha * 255).toString(16).padStart(2, "0")}`;
	return str;
}
function hexaToHsla(hexa) {
	const rgba = hexaToRgba(hexa);
	return rgbaToHsla(rgba[0], rgba[1], rgba[2], rgba[3]);
}
function rgbaToHexa(rgba) {
	return "#" + rgba.map((v) => ("0" + v.toString(16)).slice(-2)).join("");
}
function hslaStringToHexa(hsla) {
	return rgbaToHexa(hslaStringToRgba(hsla));
}
function hslaStringToHex(hsla) {
	return hslaStringToHexa(hsla).slice(0, -2);
}
/**
* @param weight [0, 1]
*/
function mixColors(color1, color2, weight) {
	const out = new Array(3);
	for (let i = 0; i < 3; ++i) {
		const v1 = color1[i], v2 = color2[i];
		out[i] = Math.floor(v2 + (v1 - v2) * weight);
	}
	return out;
}
/**
* Applies the plus-lighter compositing formula to an opaque backdrop.
* `sourceOpacity` is kept separate so callers can reproduce an alpha gradient
* without relying on CSS blend modes.
*/
function mixColorsPlusLighter(backdrop, source, sourceOpacity) {
	return backdrop.map((value, index) => {
		return clamp(Math.round(value + source[index] * sourceOpacity), 0, 255);
	});
}
function computePerceivedBrightness(color) {
	return (color[0] * .2126 + color[1] * .7152 + color[2] * .0722) / 255;
}
function getAverageColor(color1, color2) {
	return color1.map((v, i) => Math.round((v + color2[i]) / 2));
}
function getAccentColor(baseHsv, baseColor, elementColor) {
	const hsvTemp3 = rgbToHsv(...baseColor);
	const hsvTemp4 = rgbToHsv(...elementColor);
	const dist = Math.min(1.5 * hsvTemp3[1] / baseHsv[1], 1);
	hsvTemp3[0] = Math.min(360, hsvTemp4[0] - hsvTemp3[0] + baseHsv[0]);
	hsvTemp3[1] = Math.min(1, hsvTemp4[1] * baseHsv[1] / hsvTemp3[1]);
	hsvTemp3[2] = Math.min(1, (hsvTemp4[2] / hsvTemp3[2] + dist - 1) * baseHsv[2] / dist);
	if (hsvTemp3[2] < .3) return elementColor;
	return hsvToRgb(...hsvTemp3);
}
function changeColorAccent(baseHsv, accentHsv, color, isDarkTheme) {
	const colorHsv = rgbToHsv(...color);
	if (Math.min(Math.abs(colorHsv[0] - baseHsv[0]), Math.abs(colorHsv[0] - baseHsv[0] - 360)) > 30) return color;
	const dist = baseHsv[1] ? Math.min(1.5 * colorHsv[1] / baseHsv[1], 1) : 0;
	colorHsv[0] = Math.min(360, colorHsv[0] + accentHsv[0] - baseHsv[0]);
	colorHsv[1] = baseHsv[1] ? Math.min(1, colorHsv[1] * accentHsv[1] / baseHsv[1]) : 0;
	colorHsv[2] = baseHsv[2] ? Math.min(1, colorHsv[2] * (1 - dist + dist * accentHsv[2] / baseHsv[2])) : 0;
	let newColor = hsvToRgb(...colorHsv);
	const origBrightness = computePerceivedBrightness(color);
	const newBrightness = computePerceivedBrightness(newColor);
	if (isDarkTheme ? origBrightness > newBrightness : origBrightness < newBrightness) {
		const fallbackAmount = .4 * origBrightness / newBrightness + .6;
		newColor = changeBrightness(newColor, fallbackAmount);
	}
	return newColor;
}
function changeBrightness(color, amount) {
	return color.map((v) => clamp(Math.round(v * amount), 0, 255));
}
function getHexColorFromTelegramColor(color) {
	const hex = (color < 0 ? 16777215 + color : color).toString(16);
	return "#" + (hex.length >= 6 ? hex : "0".repeat(6 - hex.length) + hex);
}
function getRgbColorFromTelegramColor(color) {
	return hexToRgb(getHexColorFromTelegramColor(color));
}
function getWallPaperColors(wallPaper) {
	const settings = wallPaper?.settings;
	if (!settings) return [];
	return [
		settings.background_color,
		settings.second_background_color,
		settings.third_background_color,
		settings.fourth_background_color
	].filter((color, index) => color != null && (index === 0 || color !== 0)).map(getHexColorFromTelegramColor);
}
function getColorsFromWallPaper(wallPaper) {
	return getWallPaperColors(wallPaper).join(",");
}
function rgbaToRgb(rgba, bg) {
	const a = rgba[3];
	return rgba.slice(0, 3).map((color, idx) => {
		return clamp(Math.round((a * (color / 255) + (1 - a) * (bg[idx] / 255)) * 255), 0, 255);
	});
}
function calculateLuminance(rgb) {
	const [r, g, b] = rgb;
	return .2126 * r / 255 + .7152 * g / 255 + .0722 * b / 255;
}
/**
* WCAG relative luminance — sRGB-gamma–linearized, unlike the cheaper non-linear
* `calculateLuminance` / `computePerceivedBrightness`. Use this when you need
* real contrast math (e.g. clamping a colour to a contrast ratio against white).
* @param rgb r, g, b in [0, 255]
*/
function relativeLuminance(rgb) {
	return channelsLuminance(rgb[0], rgb[1], rgb[2]);
}
/** `relativeLuminance` of a colour given by its channels, for a loop over many colours */
function channelsLuminance(r, g, b) {
	return .2126 * linearize(r) + .7152 * linearize(g) + .0722 * linearize(b);
}
function linearize(c) {
	c /= 255;
	return c <= .03928 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4;
}
/** WCAG contrast ratio of two colours, from 1 to 21 */
function getContrastRatio(a, b) {
	const [x, y] = [relativeLuminance(a), relativeLuminance(b)];
	return (Math.max(x, y) + .05) / (Math.min(x, y) + .05);
}
/**
* Scales a `#rrggbb` colour toward black until its WCAG relative luminance is
* ≤ `maxL`, preserving hue (the r:g:b ratios). Colours already at/below `maxL`
* pass through unchanged; non-`#rrggbb` input is returned untouched.
*/
function darkenToMaxLuminance(hex, maxL) {
	if (!/^#[0-9a-f]{6}$/i.test(hex)) return hex;
	const r = parseInt(hex.slice(1, 3), 16);
	const g = parseInt(hex.slice(3, 5), 16);
	const b = parseInt(hex.slice(5, 7), 16);
	if (relativeLuminance([
		r,
		g,
		b
	]) <= maxL) return hex;
	let lo = 0, hi = 1;
	for (let i = 0; i < 20; i++) {
		const f = (lo + hi) / 2;
		if (relativeLuminance([
			r * f,
			g * f,
			b * f
		]) > maxL) hi = f;
		else lo = f;
	}
	const c = (v) => Math.round(v * lo).toString(16).padStart(2, "0");
	return "#" + c(r) + c(g) + c(b);
}
/** The luminance above which a colour is light: black reads on it better than white, which reads better under it */
var LIGHT_LUMINANCE = .179;
/** Adjust only colours that fail text contrast, retaining the original hue. */
function ensureTextContrast(hex, background, ratio = 4.9) {
	const rgb = hexToRgb(hex);
	const backgroundLuminance = relativeLuminance(background);
	if (getContrastRatio(rgb, background) >= ratio) return hex;
	if (backgroundLuminance > .179) return darkenToMaxLuminance(hex, (backgroundLuminance + .05) / ratio - .05);
	const target = ratio * (backgroundLuminance + .05) - .05;
	let low = 0, high = 1;
	for (let i = 0; i < 20; ++i) {
		const amount = (low + high) / 2;
		if (relativeLuminance(rgb.map((value) => value + (255 - value) * amount)) < target) low = amount;
		else high = amount;
	}
	return rgbaToHexa(rgb.map((value) => Math.ceil(value + (255 - value) * high)));
}
function getTextColor(luminance) {
	return luminance > .5 ? [
		0,
		0,
		0
	] : [
		255,
		255,
		255
	];
}
function calculateOpacity(luminance, targetContrast) {
	const adaptiveOpacity = (luminance - (luminance > .5 ? 0 : 1) + targetContrast) / targetContrast;
	return +Math.max(.5, Math.min(.64, adaptiveOpacity)).toFixed(2);
}
//#endregion
//#region src/config/themePresets.ts
var dayClassicAccentPresets = [
	{
		id: 106,
		accent_color: 16078723,
		message_colors: [14087679, 13237758],
		wallpaper: {
			intensity: 50,
			background_color: 9289963,
			second_background_color: 12177898,
			third_background_color: 13021679,
			fourth_background_color: 15456239
		}
	},
	{
		id: 102,
		accent_color: 16736169,
		message_colors: [16774359],
		wallpaper: {
			intensity: 50,
			background_color: 15377262,
			second_background_color: 15787142,
			third_background_color: 15900351,
			fourth_background_color: 15253614
		}
	},
	{
		id: 104,
		accent_color: 5938729,
		message_colors: [16775391],
		wallpaper: {
			intensity: 50,
			background_color: 8372873,
			second_background_color: 14996851,
			third_background_color: 11523703,
			fourth_background_color: 15777914
		}
	},
	{
		id: 101,
		accent_color: 8282085,
		message_colors: [16114431],
		wallpaper: {
			intensity: 50,
			background_color: 14988010,
			second_background_color: 8615618,
			third_background_color: 15383001,
			fourth_background_color: 11834342
		}
	},
	{
		id: 107,
		accent_color: 2931181,
		message_colors: [11401141, 16580491],
		wallpaper: {
			intensity: 50,
			background_color: 1715738,
			second_background_color: 4678204,
			third_background_color: 2240036,
			fourth_background_color: 3228713
		}
	},
	{
		id: 103,
		accent_color: 1677682,
		message_colors: [16776903],
		wallpaper: {
			intensity: 50,
			background_color: 14478226,
			second_background_color: 9429462,
			third_background_color: 6792178,
			fourth_background_color: 8771205
		}
	},
	{
		id: 105,
		accent_color: 14323929,
		message_colors: [9764857, 13434823],
		wallpaper: {
			intensity: 50,
			background_color: 16761778,
			second_background_color: 14860543,
			third_background_color: 16770994
		}
	}
];
var dayAccentPresets = [
	{
		id: 101,
		accent_color: 35071,
		message_colors: [35071, 16733172]
	},
	{
		id: 102,
		accent_color: 45211,
		message_colors: [11462982, 45211]
	},
	{
		id: 103,
		accent_color: 13840915,
		message_colors: [16374528, 13840915]
	},
	{
		id: 104,
		accent_color: 15371501,
		message_colors: [15371501, 49901]
	}
];
var nightAccentPresets = [
	{
		id: 102,
		accent_color: 45211,
		message_colors: [11462982, 45211],
		wallpaper: {
			dark: true,
			intensity: 35,
			background_color: 14988010,
			second_background_color: 8615618,
			third_background_color: 15383001,
			fourth_background_color: 11834342
		}
	},
	{
		id: 103,
		accent_color: 13840915,
		message_colors: [16374528, 13840915],
		wallpaper: {
			dark: true,
			intensity: 40,
			background_color: 16696470,
			second_background_color: 14511289,
			third_background_color: 9842623,
			fourth_background_color: 5200853
		}
	},
	{
		id: 104,
		accent_color: 15371501,
		message_colors: [15371501, 49901],
		wallpaper: {
			dark: true,
			intensity: 30,
			background_color: 9100274,
			second_background_color: 8949228,
			third_background_color: 14917610,
			fourth_background_color: 6790381
		}
	}
];
var BASE_COLOR_RGB = {
	blue: 35071,
	cyan: 49901,
	green: 2732839,
	pink: 15428772,
	orange: 15761920,
	purple: 9728750,
	red: 13840915,
	yellow: 15578112,
	gray: 7177118
};
var BASE_COLOR_INDEX = {
	blue: 10,
	cyan: 11,
	green: 12,
	pink: 13,
	orange: 14,
	purple: 15,
	red: 16,
	yellow: 17,
	gray: 18
};
function baseColorAccent(name, base) {
	if (base === "baseThemeNight" && name === "blue") return 4098295;
	return BASE_COLOR_RGB[name];
}
var TINTED_BASE_WALLPAPERS = {
	blue: {
		intensity: 40,
		background_color: 1979735,
		second_background_color: 1581110,
		third_background_color: 1852242,
		fourth_background_color: 1451578,
		dark: true
	},
	cyan: {
		intensity: 40,
		background_color: 1979735,
		second_background_color: 1382966,
		third_background_color: 1852242,
		fourth_background_color: 2770241,
		dark: true
	},
	green: {
		intensity: 40,
		background_color: 2967606,
		second_background_color: 1518361,
		third_background_color: 3556145,
		fourth_background_color: 1061425,
		dark: true
	},
	pink: {
		intensity: 40,
		background_color: 2886434,
		second_background_color: 2687008,
		third_background_color: 1444386,
		fourth_background_color: 3872820,
		dark: true
	},
	orange: {
		intensity: 40,
		background_color: 2892059,
		second_background_color: 4466967,
		third_background_color: 2234655,
		fourth_background_color: 3876628,
		dark: true
	},
	purple: {
		intensity: 40,
		background_color: 3808314,
		second_background_color: 2365756,
		third_background_color: 3747390,
		fourth_background_color: 1709618,
		dark: true
	},
	red: {
		intensity: 40,
		background_color: 2892059,
		second_background_color: 4469546,
		third_background_color: 2234655,
		fourth_background_color: 3878198,
		dark: true
	},
	yellow: {
		intensity: 40,
		background_color: 2893074,
		second_background_color: 4535819,
		third_background_color: 2235656,
		fourth_background_color: 3878675,
		dark: true
	},
	gray: {
		intensity: 40,
		background_color: 1845041,
		second_background_color: 1711141,
		third_background_color: 2568251,
		fourth_background_color: 1776417,
		dark: true
	}
};
function withMul(rgbInt, hMul, sMul, vMul) {
	const hsv = rgbToHsv(rgbInt >> 16 & 255, rgbInt >> 8 & 255, rgbInt & 255);
	const out = hsvToRgb(hsv[0] * hMul % 360, Math.min(1, hsv[1] * sMul), Math.min(1, hsv[2] * vMul));
	return out[0] << 16 | out[1] << 8 | out[2];
}
function darkBubbleColors(accent) {
	const bottom = withMul(accent, 1.019, .731, .59);
	return [withMul(bottom, .966, .61, .98), bottom];
}
function nearestTintedBaseColor(accentRgb) {
	const ar = accentRgb >> 16 & 255, ag = accentRgb >> 8 & 255, ab = accentRgb & 255;
	let bestName = "blue";
	let bestDist = Infinity;
	Object.keys(BASE_COLOR_RGB).forEach((name) => {
		const c = BASE_COLOR_RGB[name];
		const cr = c >> 16 & 255, cg = c >> 8 & 255, cb = c & 255;
		const d = (cr - ar) ** 2 + (cg - ag) ** 2 + (cb - ab) ** 2;
		if (d < bestDist) {
			bestDist = d;
			bestName = name;
		}
	});
	return bestName;
}
function getCloudThemeWallpaper(theme, themeSettings) {
	const wallPaper = themeSettings.wallpaper;
	return themeSettings.base_theme._ === "baseThemeDay" && wallPaper?._ === "wallPaperNoFile" && getColorsFromWallPaper(wallPaper) === "#ffffff" ? theme.settings.find((s) => s.base_theme._ === "baseThemeClassic")?.wallpaper ?? wallPaper : wallPaper;
}
function blendWallpaperForTinted(wallPaper, accent) {
	const wpSettings = wallPaper.settings;
	if (!wpSettings || typeof wpSettings.background_color !== "number") return wallPaper;
	const targetWp = TINTED_BASE_WALLPAPERS[nearestTintedBaseColor(accent)];
	if (!targetWp) return wallPaper;
	const BASE_WEIGHT = .85;
	const blend = (target, pick) => {
		const dr = target >> 16 & 255, dg = target >> 8 & 255, db = target & 255;
		const pr = pick >> 16 & 255, pg = pick >> 8 & 255, pb = pick & 255;
		const r = Math.round(dr * BASE_WEIGHT + pr * .15000000000000002);
		const g = Math.round(dg * BASE_WEIGHT + pg * .15000000000000002);
		const b = Math.round(db * BASE_WEIGHT + pb * .15000000000000002);
		return r << 16 | g << 8 | b;
	};
	return {
		...wallPaper,
		pFlags: {
			...wallPaper.pFlags,
			dark: true
		},
		settings: {
			...wpSettings,
			background_color: blend(targetWp.background_color, wpSettings.background_color),
			second_background_color: wpSettings.second_background_color !== void 0 ? blend(targetWp.second_background_color ?? targetWp.background_color, wpSettings.second_background_color) : void 0,
			third_background_color: wpSettings.third_background_color !== void 0 ? blend(targetWp.third_background_color ?? targetWp.background_color, wpSettings.third_background_color) : void 0,
			fourth_background_color: wpSettings.fourth_background_color !== void 0 ? blend(targetWp.fourth_background_color ?? targetWp.background_color, wpSettings.fourth_background_color) : void 0,
			intensity: targetWp.dark ? -targetWp.intensity : targetWp.intensity
		}
	};
}
function baseColorPreset(name, base) {
	const accent = baseColorAccent(name, base);
	const isDarkBase = base === "baseThemeTinted" || base === "baseThemeNight";
	return {
		id: BASE_COLOR_INDEX[name],
		accent_color: accent,
		message_colors: isDarkBase ? darkBubbleColors(accent) : [accent],
		wallpaper: base === "baseThemeTinted" ? TINTED_BASE_WALLPAPERS[name] : void 0
	};
}
var BASE_COLORS_DARK = [
	"blue",
	"cyan",
	"green",
	"pink",
	"orange",
	"purple",
	"red",
	"yellow",
	"gray"
];
var BASE_COLORS_NIGHT = [
	"blue",
	"cyan",
	"green",
	"pink",
	"orange",
	"purple",
	"red",
	"yellow"
];
var BASE_COLORS_DAY = [
	"blue",
	"cyan",
	"green",
	"pink",
	"orange",
	"purple",
	"red",
	"yellow",
	"gray"
];
function getAccentPresetsForBase(base) {
	switch (base) {
		case "baseThemeClassic": return [...dayClassicAccentPresets, ...BASE_COLORS_DAY.map((c) => baseColorPreset(c, base))];
		case "baseThemeNight": return [...nightAccentPresets, ...BASE_COLORS_NIGHT.map((c) => baseColorPreset(c, base))];
		case "baseThemeDay": return [...dayAccentPresets, ...BASE_COLORS_DAY.map((c) => baseColorPreset(c, base))];
		case "baseThemeTinted": return BASE_COLORS_DARK.map((c) => baseColorPreset(c, base));
		default: return [];
	}
}
var PRESET_WALLPAPER_ID_PREFIX = "preset:wp:";
function buildPresetWallpaper(preset) {
	const wp = preset.wallpaper;
	if (!wp) return void 0;
	return {
		_: "wallPaper",
		pFlags: {
			default: true,
			pattern: true,
			...wp.dark ? { dark: true } : {}
		},
		access_hash: "",
		document: void 0,
		id: PRESET_WALLPAPER_ID_PREFIX + preset.id,
		slug: "pattern",
		settings: {
			_: "wallPaperSettings",
			pFlags: {},
			intensity: wp.dark ? -wp.intensity : wp.intensity,
			background_color: wp.background_color,
			second_background_color: wp.second_background_color,
			third_background_color: wp.third_background_color,
			fourth_background_color: wp.fourth_background_color
		}
	};
}
function presetToThemeSettings(preset, base) {
	return {
		_: "themeSettings",
		pFlags: {},
		base_theme: { _: base },
		accent_color: preset.accent_color,
		message_colors: preset.message_colors,
		wallpaper: buildPresetWallpaper(preset)
	};
}
function presetThemeId(preset) {
	return "preset:" + preset.id;
}
//#endregion
//#region src/config/state.ts
var TINTED_DEFAULT_PRESET = getAccentPresetsForBase("baseThemeTinted")[0];
var STATE_VERSION = App.version;
var BUILD = App.build;
var DEFAULT_THEME = {
	_: "theme",
	access_hash: "",
	id: "",
	settings: [
		{
			_: "themeSettings",
			pFlags: {},
			base_theme: { _: "baseThemeClassic" },
			accent_color: 3379436,
			message_colors: [6072403],
			wallpaper: {
				_: "wallPaper",
				pFlags: {
					default: true,
					pattern: true
				},
				access_hash: "",
				document: void 0,
				id: "",
				slug: "pattern",
				settings: {
					_: "wallPaperSettings",
					pFlags: {},
					intensity: 50,
					background_color: 14409147,
					second_background_color: 7054727,
					third_background_color: 14014605,
					fourth_background_color: 8960132
				}
			}
		},
		{
			_: "themeSettings",
			pFlags: {},
			base_theme: { _: "baseThemeNight" },
			accent_color: 8877281,
			message_colors: [8877281],
			wallpaper: {
				_: "wallPaper",
				pFlags: {
					default: true,
					pattern: true,
					dark: true
				},
				access_hash: "",
				document: void 0,
				id: "",
				slug: "pattern",
				settings: {
					_: "wallPaperSettings",
					pFlags: {},
					intensity: -50,
					background_color: 16696470,
					second_background_color: 14511289,
					third_background_color: 9842623,
					fourth_background_color: 5200853
				}
			}
		},
		{
			_: "themeSettings",
			pFlags: {},
			base_theme: { _: "baseThemeTinted" },
			accent_color: TINTED_DEFAULT_PRESET.accent_color,
			message_colors: TINTED_DEFAULT_PRESET.message_colors,
			wallpaper: {
				_: "wallPaper",
				pFlags: {
					default: true,
					pattern: true,
					dark: true
				},
				access_hash: "",
				document: void 0,
				id: "",
				slug: "pattern",
				settings: {
					_: "wallPaperSettings",
					pFlags: {},
					intensity: -40,
					background_color: 1979735,
					second_background_color: 1581110,
					third_background_color: 1852242,
					fourth_background_color: 1451578
				}
			}
		},
		{
			_: "themeSettings",
			pFlags: {},
			base_theme: { _: "baseThemeDay" },
			accent_color: 2981589,
			message_colors: [2981589],
			wallpaper: {
				_: "wallPaper",
				pFlags: {
					default: true,
					pattern: true
				},
				access_hash: "",
				document: void 0,
				id: "",
				slug: "pattern",
				settings: {
					_: "wallPaperSettings",
					pFlags: {},
					intensity: 50,
					background_color: 11657466,
					second_background_color: 8564952,
					third_background_color: 10541288,
					fourth_background_color: 15069432
				}
			}
		}
	],
	slug: "",
	title: "",
	emoticon: "🏠",
	pFlags: { default: true }
};
var DEFAULT_HIGHLIGHTING_COLORS = {
	baseThemeClassic: "hsla(86.4, 43.846153%, 45.117647%, .4)",
	baseThemeNight: "hsla(299.142857, 44.166666%, 37.470588%, .4)",
	baseThemeTinted: "hsla(258.461538, 50%, 65.490196%, .4)",
	baseThemeDay: "hsla(210, 67.741935%, 50.588235%, .4)"
};
var makeDefaultAppTheme = (name) => {
	return {
		...DEFAULT_THEME,
		name,
		settings: DEFAULT_THEME.settings.map((s) => ({
			...s,
			highlightingColor: DEFAULT_HIGHLIGHTING_COLORS[s.base_theme._] ?? ""
		}))
	};
};
var SETTINGS_INIT = {
	messagesTextSize: 16,
	distanceUnit: "kilometers",
	sendShortcut: "enter",
	autoDownload: {
		photo: {
			contacts: true,
			private: true,
			groups: true,
			channels: true
		},
		video: {
			contacts: true,
			private: true,
			groups: true,
			channels: true
		},
		file: {
			contacts: true,
			private: true,
			groups: true,
			channels: true
		}
	},
	autoDownloadNew: {
		_: "autoDownloadSettings",
		file_size_max: 3145728,
		pFlags: {
			video_preload_large: true,
			audio_preload_next: true
		},
		photo_size_max: 1048576,
		video_size_max: 15728640,
		video_upload_maxbitrate: 100,
		small_queue_active_operations_max: 0,
		large_queue_active_operations_max: 0
	},
	stickers: {
		suggest: "all",
		dynamicPackOrder: true,
		loop: true,
		hiddenGroupSets: {},
		hiddenGroupEmojiSets: {}
	},
	emoji: {
		suggest: true,
		big: true
	},
	themes: [
		makeDefaultAppTheme("day"),
		makeDefaultAppTheme("night"),
		makeDefaultAppTheme("tinted"),
		makeDefaultAppTheme("light")
	],
	theme: "system",
	increaseContrast: false,
	lastThemeNames: {
		dark: "night",
		light: "day"
	},
	chatTips: {
		index: 0,
		hidden: false
	},
	notifications: {
		sound: false,
		push: true,
		desktop: true,
		sentMessageSound: true,
		suggested: false,
		volume: .5
	},
	timeFormat: getTimeFormat(),
	liteMode: {
		all: false,
		animations: false,
		motion: false,
		blur: false,
		chat: false,
		chat_background: false,
		chat_spoilers: false,
		effects: false,
		effects_premiumstickers: false,
		effects_reactions: false,
		effects_emoji: false,
		emoji: false,
		emoji_appear: false,
		emoji_messages: false,
		emoji_panel: false,
		gif: false,
		stickers: false,
		stickers_chat: false,
		stickers_panel: false,
		video: false
	},
	savedAsForum: false,
	notifyAllAccounts: true,
	tabsInSidebar: false,
	showPeerIds: false,
	settingsSearchRecent: [],
	playbackParams: {
		volume: 1,
		boost: 0,
		muted: false,
		playbackRate: 1,
		playbackRates: {
			voice: 1,
			video: 1,
			audio: 1
		},
		loop: false,
		round: false
	},
	chatContextMenuHintWasShown: false,
	seenTooltips: {
		storySound: false,
		noForwards: false,
		sidebarResize: false,
		guestBotPrivacy: 0,
		storyReactions: false,
		storyStealthReply: false,
		walletGram: 0
	},
	translations: {
		peers: {},
		enabledPeers: {},
		enabled: true,
		showInMenu: true,
		doNotTranslate: []
	},
	aiSendStyles: {},
	passcode: {
		enabled: false,
		autoLockTimeoutMins: 0,
		lockShortcutEnabled: false,
		lockShortcut: ["Alt"],
		canAttemptAgainOn: null
	},
	instantView: { scale: 1 },
	cacheTTL: 604800,
	cacheSize: 0,
	showArchiveInChatList: true,
	mediaEditor: { colorByBrush: {} },
	customDeviceModel: "",
	callDevices: {
		speakerId: "",
		microphoneId: "",
		cameraId: "",
		micVolume: 1,
		noiseSuppression: true
	},
	recordingMediaType: "voice",
	contactsSortMode: "online",
	stories: { highQuality: true }
};
var STATE_INIT = {
	allDialogsLoaded: {},
	dialogsPaginationOffsets: {},
	pinnedOrders: {},
	communityDialogs: {},
	joinedCommunityIds: null,
	botCommands: {},
	noPaidMessagesToken: null,
	contactsListCachedTime: 0,
	updates: {},
	filtersArr: [],
	maxSeenMsgId: 0,
	stateCreatedTime: Date.now(),
	recentEmoji: [],
	recentCustomEmoji: [],
	emojiVariants: {},
	topPeersCache: {},
	recentSearch: [],
	recentlyClosedChats: [],
	walletAddresses: {},
	version: STATE_VERSION,
	build: BUILD,
	authState: { _: IS_MOBILE ? "authStateSignIn" : "authStateSignQr" },
	userId: void 0,
	hiddenPinnedMessages: {},
	closedReplyKeyboards: {},
	droppedForceReplies: {},
	hideChatJoinRequests: {},
	botConnectionReviews: [],
	notifySettings: {},
	confirmedWebViews: [],
	hiddenSimilarChannels: [],
	appConfig: {},
	accountThemes: {},
	birthdayContactsDismissedDayKey: void 0,
	dontShowPaidMessageWarningFor: [],
	accountContentSettings: {},
	unconfirmedAuthorizations: [],
	currentAuthorizationDate: 0
};
var COMMON_STATE_INIT = { settings: SETTINGS_INIT };
//#endregion
export { hslaStringToRgba as A, rgbaToHsla as B, getHexColorFromTelegramColor as C, hexaToHsla as D, hexToRgb as E, mixColorsPlusLighter as F, relativeLuminance as I, rgbIntToHex as L, hslaToString as M, hsvToRgb as N, hexaToRgba as O, mixColors as P, rgbToHsv as R, getContrastRatio as S, getTextColor as T, rgbaToRgb as V, darkenToMaxLuminance as _, blendWallpaperForTinted as a, getAverageColor as b, presetThemeId as c, calculateLuminance as d, calculateOpacity as f, computePerceivedBrightness as g, channelsLuminance as h, STATE_INIT as i, hslaToRgba as j, hslaStringToHex as k, presetToThemeSettings as l, changeColorAccent as m, DEFAULT_THEME as n, getAccentPresetsForBase as o, changeBrightness as p, SETTINGS_INIT as r, getCloudThemeWallpaper as s, COMMON_STATE_INIT as t, LIGHT_LUMINANCE as u, ensureTextContrast as v, getRgbColorFromTelegramColor as w, getColorsFromWallPaper as x, getAccentColor as y, rgbaToHexa as z };
