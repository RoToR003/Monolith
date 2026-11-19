//# allFunctionsCalledOnLoad
import { u as langPack_default } from "./langPack-BmdJGr44.js";
import { g as createEffect, j as on } from "./solid-9Vxm0VIz.js";
import { t as attachClassName } from "./classname-DB9i2ReQ.js";
import { n as resolveElements } from "./dist-Fd6wPWkH.js";
//#region src/helpers/solid/i18n.tsx
function I18nTsx(props) {
	const argsEls = resolveElements(() => props.args, (it) => it instanceof Node || typeof it === "string");
	const args = () => argsEls.toArray();
	const el = new langPack_default.IntlElement({
		key: props.key,
		args: args()
	});
	attachClassName(el.element, () => props.class);
	createEffect(on(() => [props.key, args()], ([key, args], _prev) => {
		el.update({
			key,
			args
		});
	}, { defer: true }));
	return el.element;
}
//#endregion
export { I18nTsx as t };
