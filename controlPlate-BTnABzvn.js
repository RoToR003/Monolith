//# allFunctionsCalledOnLoad
import { y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { c as insert, g as template, o as className } from "./web-BPyQozky.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
//#region src/components/chat/controlPlate.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div><div class=chat-input-plate-side></div><div class=chat-input-plate-center></div><div class=chat-input-plate-side>`);
/**
* Marker class for the unified chat-input plate layout. Anything carrying this
* class is one of the new uniform-width footer plates (as opposed to the bare
* single buttons the control container used to hold).
*/
var CHAT_INPUT_PLATE_CLASS = "chat-input-plate";
/**
* A plate with nothing on either side for now: the side slots go and the centre
* spans the whole plate — they are kept only to balance an icon on one side.
*/
var CHAT_INPUT_PLATE_SINGLE_CLASS = "is-single";
/**
* Unified chat-input control plate.
*
* Every non-typing state of the chat-input footer — join channel, unblock,
* bot start, pinned, message selection, … — renders through this single
* layout instead of the bespoke per-state markup that used to live in the
* control container and the selection wrapper.
*
* The layout mirrors the topbar translation plate (`translation.tsx`): an
* optional icon button on each side and a centered main button —
* `Button.Icon + Button + Button.Icon`. The side slots reserve symmetric
* space even when one is empty so the centre button always stays centred, which
* makes every plate exactly the same width as the message-input row. Plates
* therefore cross-fade in place (opacity only) instead of morphing width.
* With both sides empty the plate takes `CHAT_INPUT_PLATE_SINGLE_CLASS`.
*/
function ChatInputPlate(props) {
	return (() => {
		var _el$ = _tmpl$(), _el$2 = _el$.firstChild, _el$3 = _el$2.nextSibling, _el$4 = _el$3.nextSibling;
		insert(_el$2, () => props.left);
		insert(_el$3, () => props.center);
		insert(_el$4, () => props.right);
		createRenderEffect(() => className(_el$, classNames(CHAT_INPUT_PLATE_CLASS, "rows-wrapper-row", props.class)));
		return _el$;
	})();
}
//#endregion
export { ChatInputPlate as n, CHAT_INPUT_PLATE_SINGLE_CLASS as t };
