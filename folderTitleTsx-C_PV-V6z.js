//# allFunctionsCalledOnLoad
import { u as memo } from "./web-BPyQozky.js";
import { o as createMiddleware } from "./sticker-5twBOy1Y.js";
import { U as documentFragmentToNodes } from "./confirmationPopup-Bz6mK0o-.js";
import { t as wrapFolderTitle } from "./folderTitle-Bk4Q-S9l.js";
//#region src/components/folderTitleTsx.tsx
/** A folder's title, with the emoji and custom emoji in it - alive for as long as it is shown */
function FolderTitleTsx(props) {
	return memo(() => documentFragmentToNodes(wrapFolderTitle(props.title, createMiddleware().get(), true, { textColor: props.textColor })));
}
//#endregion
export { FolderTitleTsx as t };
