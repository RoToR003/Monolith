//# allFunctionsCalledOnLoad
//#region src/components/wrappers/buttonTypes.ts
/**
* What a page read outside a chat can still do. The rest act on the message the button belongs
* to, so a page opened in the in-app browser shows them disabled, as desktop and WebA do.
*/
var CHATLESS_BUTTON_TYPES = /* @__PURE__ */ new Set([
	"inlineButtonTypeUrl",
	"inlineButtonTypeCopy",
	"inlineButtonTypeUserProfile",
	"inlineButtonTypeDisabled"
]);
var BUTTON_TYPE_ICONS = {
	inlineButtonTypeUrl: "arrow_next",
	inlineButtonTypeSwitchInline: "forward_filled",
	inlineButtonTypeBuy: "card_filled",
	inlineButtonTypeWebView: "webview",
	buttonTypeSimpleWebView: "webview",
	inlineButtonTypeGame: "play_filled",
	inlineButtonTypeCopy: "copy"
};
function getButtonTypeIcon(type) {
	return BUTTON_TYPE_ICONS[type._];
}
/** A keyboard button's style and a rich page button's style carry the same three colours. */
function getButtonBackground(style) {
	if (!style) return;
	if (style.pFlags.bg_success) return "success";
	if (style.pFlags.bg_danger) return "danger";
	if (style.pFlags.bg_primary) return "primary";
}
/** Where a row of buttons sits on its line; a row without an alignment stretches across it. */
function getPageButtonRowAlign(block) {
	const { align_left, align_center, align_right } = block.pFlags;
	return align_left ? "left" : align_center ? "center" : align_right ? "right" : void 0;
}
//#endregion
export { getPageButtonRowAlign as i, getButtonBackground as n, getButtonTypeIcon as r, CHATLESS_BUTTON_TYPES as t };
