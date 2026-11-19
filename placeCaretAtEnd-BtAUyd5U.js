//# allFunctionsCalledOnLoad
import { t as IS_TOUCH_SUPPORTED } from "./touchSupport-B2RWO3zD.js";
//#region src/components/chat/inputEditor/registry.ts
var editors = /* @__PURE__ */ new WeakMap();
function getChatInputEditor(input) {
	return editors.get(input);
}
function registerChatInputEditor(input, editor) {
	editors.set(input, editor);
	return () => {
		if (editors.get(input) === editor) editors.delete(input);
	};
}
//#endregion
//#region src/helpers/dom/placeCaretAtEnd.ts
function placeCaretAtEnd(el, ignoreTouchCheck = false, focus = true) {
	const activeElement = el.ownerDocument.activeElement;
	const isEditableFocused = !!activeElement && (activeElement.tagName === "INPUT" || activeElement.isContentEditable);
	if (IS_TOUCH_SUPPORTED && (!ignoreTouchCheck || !isEditableFocused)) return;
	const editor = getChatInputEditor(el);
	if (editor) {
		editor.focusAtEnd(focus);
		return;
	}
	focus && el.focus();
	if (el instanceof HTMLInputElement) {
		const length = el.value.length;
		el.selectionStart = length;
		el.selectionEnd = length;
	} else {
		const view = el.ownerDocument.defaultView;
		if (!view) return;
		const range = el.ownerDocument.createRange();
		range.selectNodeContents(el);
		range.collapse(false);
		const sel = view.getSelection();
		if (!sel) return;
		sel.removeAllRanges();
		sel.addRange(range);
	}
}
window.placeCaretAtEnd = placeCaretAtEnd;
//#endregion
export { getChatInputEditor as n, registerChatInputEditor as r, placeCaretAtEnd as t };
