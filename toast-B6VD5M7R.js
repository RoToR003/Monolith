//# allFunctionsCalledOnLoad
import { n as __exportAll } from "./rolldown-runtime-CwcJO0Gh.js";
import { a as i18n } from "./langPack-BmdJGr44.js";
import { r as getOverlayRoot } from "./appWindow-bo-KtJhy.js";
import { n as hotListen } from "./hotModule-aCRkP77w.js";
import { t as replaceContent } from "./replaceContent-Bi6ru3li.js";
import { t as OverlayClickHandler } from "./overlayClickHandler-CXjT0xwp.js";
//#region src/components/toast.ts
var toast_exports = /* @__PURE__ */ __exportAll({
	hideToast: () => hideToast,
	toast: () => toast,
	toastNew: () => toastNew
});
var toastsContainer = document.createElement("div");
toastsContainer.classList.add("toasts-container");
toastsContainer.setAttribute("role", "status");
toastsContainer.setAttribute("aria-live", "polite");
var toastEl = document.createElement("div");
toastEl.classList.add("toast");
var timeout;
var x = new OverlayClickHandler("toast", false, true);
hotListen(void 0, x, "toggle", (open) => {
	if (!open) hideToast();
});
function hideToast() {
	x.close();
	toastEl.classList.remove("is-visible");
	timeout && clearTimeout(+timeout);
	timeout = window.setTimeout(() => {
		toastEl.remove();
		timeout = void 0;
	}, 200);
}
function toast(content, onClose, duration = 3e3) {
	x.close();
	replaceContent(toastEl, content);
	if (!toastEl.parentElement) {
		if (!toastsContainer.parentNode) getOverlayRoot().append(toastsContainer);
		toastsContainer.append(toastEl);
		toastEl.offsetLeft;
	}
	toastEl.classList.add("is-visible");
	timeout && clearTimeout(+timeout);
	x.open(toastEl);
	timeout = window.setTimeout(hideToast, duration);
	if (onClose) x.addEventListener("toggle", onClose, { once: true });
}
function toastNew(options) {
	toast(i18n(options.langPackKey, options.langPackArguments), options.onClose, options.duration);
}
//#endregion
export { toast_exports as i, toast as n, toastNew as r, hideToast as t };
