//# allFunctionsCalledOnLoad
import { c as joinElementsWith, u as langPack_default } from "./langPack-BmdJGr44.js";
import { y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { c as insert, f as setAttribute, g as template } from "./web-BPyQozky.js";
//#region src/components/sidebarLeft/tabs/joinSessionParts.tsx
var _tmpl$ = /*#__PURE__*/ template(`<span>`);
/**
* The parts of a session's line (device and system, IP address and country) joined into one, each
* isolated in its own direction: a device named in Arabic does not reorder the rest, and an IP
* address — passed as `{ltr}` — always reads left to right. The parts follow one another in the
* layout's direction, which the line states itself: inside a `dir="auto"` row part made of
* nothing but isolates, the text would otherwise fall back to left to right.
*/
function joinSessionParts(parts, separator) {
	return (() => {
		var _el$ = _tmpl$();
		insert(_el$, () => joinElementsWith(parts.filter((part) => typeof part === "string" ? part : part?.ltr).map((part) => {
			const isLtr = typeof part !== "string";
			const text = isLtr ? part.ltr : part;
			return (() => {
				var _el$2 = _tmpl$();
				setAttribute(_el$2, "dir", isLtr ? "ltr" : "auto");
				insert(_el$2, text);
				return _el$2;
			})();
		}), separator));
		createRenderEffect(() => setAttribute(_el$, "dir", langPack_default.isRTL() ? "rtl" : "ltr"));
		return _el$;
	})();
}
//#endregion
export { joinSessionParts as t };
