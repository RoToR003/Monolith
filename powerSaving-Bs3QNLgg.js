//# allFunctionsCalledOnLoad
import { t as pause } from "./pause-BSJh-z46.js";
import { a as i18n } from "./langPack-BmdJGr44.js";
import { N as onMount, g as createEffect, j as on, p as createComponent } from "./solid-9Vxm0VIz.js";
import { _ as use, c as insert, g as template } from "./web-BPyQozky.js";
import { n as useReducedMotion, o as useAppSettings, t as liteMode } from "./liteMode-DeLStZfQ.js";
import { n as attachClickEvent } from "./clickEvent-COk4YpLP.js";
import { X as flatten } from "./canPollPeerStories-D3HoBvLX.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { r as toastNew } from "./toast-B6VD5M7R.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { t as CheckboxFields } from "./checkboxFields-CNHKTV_g.js";
//#region src/components/sidebarLeft/tabs/powerSaving.tsx
var _tmpl$ = /*#__PURE__*/ template(`<form>`);
var PowerSaving = () => {
	const [tab] = useSuperTab();
	const [appSettings, setAppSettings] = useAppSettings();
	let formEl;
	let infoContentEl;
	let sectionContentEl;
	onMount(() => {
		tab.container.classList.add("power-saving-container");
		const keys = [
			"all",
			"video",
			"gif",
			["stickers", [
				"stickers_panel",
				"stickers_chat",
				"emoji_appear"
			]],
			["effects", [
				"effects_reactions",
				"effects_premiumstickers",
				"effects_emoji"
			]],
			["chat", ["chat_background", "chat_spoilers"]],
			"animations",
			"motion",
			"blur"
		];
		const motionInfoKey = () => liteMode.isMotionHeldBySystem() ? "LiteMode.Key.motion.HeldBySystem" : "LiteMode.Key.motion.Info";
		const wrap = (key) => {
			const isArray = Array.isArray(key);
			const mainKey = isArray ? key[0] : key;
			const nested = isArray ? flatten(key[1].map(wrap)) : void 0;
			const value = appSettings.liteMode[mainKey];
			return [{
				key: mainKey,
				text: mainKey === "all" ? "LiteMode.EnableText" : `LiteMode.Key.${mainKey}.Title`,
				description: mainKey === "motion" ? motionInfoKey() : void 0,
				checked: mainKey === "all" ? value : !value,
				nested,
				name: "power-saving-" + mainKey
			}, ...nested || []];
		};
		const fields = flatten(keys.map(wrap));
		const checkboxFields = new CheckboxFields({
			fields,
			listenerSetter: tab.listenerSetter
		});
		fields.forEach((field, idx) => {
			const created = checkboxFields.createField(field);
			if (!created) return;
			const { nodes } = created;
			(idx === 0 ? infoContentEl : sectionContentEl).append(...nodes);
		});
		attachClickEvent(sectionContentEl, () => {
			if (appSettings.liteMode.all) toastNew({ langPackKey: "LiteMode.DisableAlert" });
		}, { listenerSetter: tab.listenerSetter });
		const animationsField = fields.find((field) => field.key === "animations");
		const motionField = fields.find((field) => field.key === "motion");
		const isMotionHeld = () => !animationsField.checkboxField.checked || liteMode.isMotionHeldBySystem();
		const updateDisability = (values) => {
			fields.forEach((field) => {
				if (field.key === "all") return;
				const disable = values.all || field === motionField && isMotionHeld();
				if (field.nested) checkboxFields.setNestedCounter(field, disable ? 0 : void 0);
				field.checkboxField.input.classList.toggle("is-fake-disabled", disable);
				field.row.toggleDisability(disable);
			});
			const motionHeld = isMotionHeld();
			motionField.checkboxField.input.disabled = motionHeld;
			motionField.checkboxField.setValueSilently(!motionHeld && !values.motion);
		};
		tab.listenerSetter.add(formEl)("change", async () => {
			const values = {};
			fields.forEach((field) => {
				const checked = field.checkboxField.checked;
				values[field.key] = field.key === "all" ? checked : field === motionField && field.checkboxField.input.disabled ? appSettings.liteMode.motion : !checked;
			});
			updateDisability(values);
			if (values.all && !appSettings.liteMode.all) await pause(200);
			setAppSettings("liteMode", values);
		});
		updateDisability(appSettings.liteMode);
		createEffect(on(useReducedMotion(), () => {
			motionField.row.container.querySelector(".row-subtitle")?.replaceChildren(i18n(motionInfoKey()));
			updateDisability(appSettings.liteMode);
		}, { defer: true }));
	});
	return (() => {
		var _el$ = _tmpl$();
		var _ref$ = formEl;
		typeof _ref$ === "function" ? use(_ref$, _el$) : formEl = _el$;
		insert(_el$, createComponent(Section, {
			caption: "LiteMode.Info",
			contentProps: { ref: (el) => infoContentEl = el }
		}), null);
		insert(_el$, createComponent(Section, { contentProps: { ref: (el) => sectionContentEl = el } }), null);
		return _el$;
	})();
};
//#endregion
export { PowerSaving as default };
