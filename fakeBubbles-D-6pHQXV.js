//# allFunctionsCalledOnLoad
import { t as themeController } from "./themeController-2cytOOn0.js";
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { N as onMount, g as createEffect, j as on, p as createComponent, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { _ as use, c as insert, g as template, o as className } from "./web-BPyQozky.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
import { t as ChatBackground } from "./index-B7axFZql.js";
import { t as subscribeOn } from "./subscribeOn-DnCla7ws.js";
var fakeBubbles_module_default = {
	root: "_root_lkxec_1",
	content: "_content_lkxec_16"
};
//#endregion
//#region src/components/chat/bubbles/fakeBubbles.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div><div>`);
function FakeBubbles(props) {
	let container;
	const applyTheme = () => themeController.applyTheme(props.theme ?? themeController.getTheme(), container);
	onMount(() => {
		subscribeOn(rootScope)("theme_changed", applyTheme);
		createEffect(on(() => props.theme, applyTheme));
	});
	return (() => {
		var _el$ = _tmpl$(), _el$2 = _el$.firstChild;
		var _ref$ = container;
		typeof _ref$ === "function" ? use(_ref$, _el$) : container = _el$;
		insert(_el$, createComponent(ChatBackground, {
			get managers() {
				return rootScope.managers;
			},
			themeController,
			get peerId() {
				return props.peerId;
			},
			get theme() {
				return props.theme;
			},
			get wallPaper() {
				return props.wallPaper;
			},
			onHighlightColor: (hsla) => themeController.applyHighlightingColor({
				hsla,
				element: container
			})
		}), _el$2);
		insert(_el$2, () => props.children);
		createRenderEffect((_p$) => {
			var _v$ = classNames(fakeBubbles_module_default.root, props.class), _v$2 = classNames(fakeBubbles_module_default.content, props.contentClass);
			_v$ !== _p$.e && className(_el$, _p$.e = _v$);
			_v$2 !== _p$.t && className(_el$2, _p$.t = _v$2);
			return _p$;
		}, {
			e: void 0,
			t: void 0
		});
		return _el$;
	})();
}
//#endregion
export { FakeBubbles as t };
