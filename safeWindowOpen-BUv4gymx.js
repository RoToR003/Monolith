//# allFunctionsCalledOnLoad
import { d as setBlankToAnchor } from "./langPack-BmdJGr44.js";
import { w as normalizeUrlProtocol } from "./commonStateStorage-CW-poHCa.js";
import { g as isSuspiciousUrl } from "./renderer-L80wjxct.js";
//#region src/helpers/dom/safeWindowOpen.ts
function safeWindowOpen(url) {
	url = normalizeUrlProtocol(url);
	const showMaskedAlert = window.showMaskedAlert;
	if (showMaskedAlert && isSuspiciousUrl(url)) {
		const anchor = setBlankToAnchor(document.createElement("a"));
		anchor.href = url;
		showMaskedAlert(anchor);
		return;
	}
	window.open(url, "_blank", "noreferrer");
}
//#endregion
export { safeWindowOpen as t };
