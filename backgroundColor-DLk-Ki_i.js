//# allFunctionsCalledOnLoad
import { t as findUpClassName } from "./findUpClassName-3V5me58N.js";
import { M as onCleanup, N as onMount, i as For, p as createComponent, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { O as hexaToRgba, a as blendWallpaperForTinted } from "./state-JPIG5PpJ.js";
import { _ as use, c as insert, f as setAttribute, g as template, p as setStyleProperty } from "./web-BPyQozky.js";
import { r as useHotReloadGuard } from "./hotReloadGuard-BUNVkeQ4.js";
import { n as attachClickEvent } from "./clickEvent-COk4YpLP.js";
import { t as throttle } from "./throttle-DxyCT6GJ.js";
import { d as highlightingColor } from "./index-B7axFZql.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { n as markGridCornerItem, t as GRID_CORNER_CLASSES } from "./markGridCornerItem-DM140HkM.js";
import { t as ColorPicker } from "./colorPicker-B2LywNda.js";
//#region src/components/sidebarLeft/tabs/backgroundColor.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div><div class=search-super-content-media-grid>`);
var _tmpl$2 = /*#__PURE__*/ template(`<div class="grid-item background-item"><div class=grid-item-media>`);
var COLORS = [
	"#E6EBEE",
	"#B2CEE1",
	"#008DD0",
	"#C6E7CB",
	"#C4E1A6",
	"#60B16E",
	"#CCD0AF",
	"#A6A997",
	"#7A7072",
	"#FDD7AF",
	"#FDB76E",
	"#DD8851"
];
var BackgroundColor = () => {
	const [tab] = useSuperTab();
	const { themeController, appImManager } = useHotReloadGuard();
	const theme = themeController.getTheme();
	const colorPicker = new ColorPicker();
	let grid;
	let applyColor;
	const setActive = () => {
		const active = grid.querySelector(".active");
		const color = (themeController.getThemeSettings(theme)?.wallpaper)?.settings?.background_color;
		const target = color ? grid.querySelector(`.grid-item[data-color="#${color.toString(16).padStart(6, "0")}"]`) : null;
		if (active === target) return;
		active?.classList.remove("active", ...GRID_CORNER_CLASSES);
		if (target) {
			target.classList.add("active");
			markGridCornerItem(grid, target);
		}
	};
	const _applyColor = (hex, updateColorPicker = true) => {
		if (updateColorPicker) colorPicker.setColor(hex);
		else {
			const rgba = hexaToRgba(hex);
			const settings = themeController.getThemeSettings(theme);
			const hsla = highlightingColor(rgba);
			let wallPaper = {
				_: "wallPaperNoFile",
				id: 0,
				pFlags: {},
				settings: {
					_: "wallPaperSettings",
					background_color: parseInt(hex.slice(1), 16),
					pFlags: {}
				}
			};
			if (theme.name === "tinted") wallPaper = blendWallpaperForTinted(wallPaper, settings.accent_color);
			themeController.setWallpaperForCurrentTheme(wallPaper, hsla);
			appImManager.applyCurrentTheme({ broadcastEvent: true });
			setActive();
		}
	};
	const onColorChange = (color) => {
		applyColor(color.hex, false);
	};
	onMount(() => {
		tab.container.classList.add("background-container", "background-color-container");
		tab.middlewareHelper.get().onDestroy(colorPicker.attachAutoResize());
		applyColor = throttle(_applyColor, 16, true);
		attachClickEvent(grid, (e) => {
			const target = findUpClassName(e.target, "grid-item");
			if (!target || target.classList.contains("active")) return;
			const color = target.dataset.color;
			if (!color) return;
			applyColor(color);
		}, { listenerSetter: tab.listenerSetter });
		setTimeout(() => {
			const settings = themeController.getThemeSettings(theme);
			const color = settings?.wallpaper?.settings?.background_color;
			const isColored = !!color && settings.wallpaper._ === "wallPaperNoFile";
			if (isColored) colorPicker.onChange = onColorChange;
			colorPicker.setColor(color && "#" + color.toString(16) || "#cccccc");
			if (!isColored) colorPicker.onChange = onColorChange;
		}, 0);
	});
	onCleanup(() => {
		colorPicker.onChange = void 0;
	});
	return [createComponent(Section, { get children() {
		return colorPicker.container;
	} }), (() => {
		var _el$ = _tmpl$(), _el$2 = _el$.firstChild;
		var _ref$ = grid;
		typeof _ref$ === "function" ? use(_ref$, _el$2) : grid = _el$2;
		insert(_el$2, createComponent(For, {
			each: COLORS,
			children: (color) => (() => {
				var _el$3 = _tmpl$2(), _el$4 = _el$3.firstChild;
				setStyleProperty(_el$4, "background-color", color);
				createRenderEffect(() => setAttribute(_el$3, "data-color", color.toLowerCase()));
				return _el$3;
			})()
		}));
		return _el$;
	})()];
};
//#endregion
export { BackgroundColor as default };
