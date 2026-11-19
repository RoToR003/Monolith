//# allFunctionsCalledOnLoad
import { p as createComponent, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { _ as use, c as insert, g as template, o as className, s as delegateEvents } from "./web-BPyQozky.js";
import { r as useHotReloadGuard } from "./hotReloadGuard-BUNVkeQ4.js";
import { t as ripple } from "./ripple-D7hcIc_t.js";
var inlineRippleLink_module_default = { inlineRippleLink: "_inlineRippleLink_1nv8a_16" };
//#endregion
//#region src/components/popups/aiEditorPopup/creatorLink.tsx
var _tmpl$ = /*#__PURE__*/ template(`<span>`);
var CreatorLink = (props) => {
	const { appImManager, PeerTitleTsx } = useHotReloadGuard();
	return (() => {
		var _el$ = _tmpl$();
		_el$.$$click = () => {
			appImManager.setInnerPeer({ peerId: props.peerId });
			props.onClick?.();
		};
		use(ripple, _el$, () => true);
		insert(_el$, createComponent(PeerTitleTsx, {
			get peerId() {
				return props.peerId;
			},
			limitSymbols: 32
		}));
		createRenderEffect(() => className(_el$, inlineRippleLink_module_default.inlineRippleLink));
		return _el$;
	})();
};
delegateEvents(["click"]);
//#endregion
//#region src/components/popups/aiEditorPopup/limits.ts
var useMaxSavedTones = () => {
	const { usePremium, useAppConfig } = useHotReloadGuard();
	const isPremium = usePremium();
	const appConfig = useAppConfig();
	return () => isPremium() ? appConfig.aicompose_tone_saved_limit_premium || 20 : appConfig.aicompose_tone_saved_limit_default || 5;
};
//#endregion
export { CreatorLink as n, useMaxSavedTones as t };
