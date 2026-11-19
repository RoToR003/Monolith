//# allFunctionsCalledOnLoad
import { E as DialogColors } from "./apiManagerProxy-DmQXvxSF.js";
import { m as REAL_FOLDERS } from "./rootScope-CZS0lmz8.js";
import { C as createSignal, _ as createMemo, p as createComponent, x as createRoot, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { r as appState } from "./contentSettings-DMhHR-0w.js";
import { c as insert, f as setAttribute, g as template, o as className, u as memo } from "./web-BPyQozky.js";
import { r as useMediaSizes } from "./mediaSizes-C1MTaleW.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
import { S as useIsSidebarCollapsed } from "./index-B7axFZql.js";
import { Et as usePremium } from "./confirmationPopup-Bz6mK0o-.js";
import { cn as getDialogIndex, ln as getDialogIndexKey } from "./getChatMigratedTo-ChhMNXuu.js";
import { t as FolderTitleTsx } from "./folderTitleTsx-C_PV-V6z.js";
var folderTag_module_default = {
	tag: "_tag_gd3l6_1",
	dot: "_dot_gd3l6_35",
	color0: "_color0_gd3l6_43",
	color1: "_color1_gd3l6_47",
	color2: "_color2_gd3l6_51",
	color3: "_color3_gd3l6_55",
	color4: "_color4_gd3l6_59",
	color5: "_color5_gd3l6_63",
	color6: "_color6_gd3l6_67"
};
//#endregion
//#region src/components/folderTags/folderTag.tsx
var _tmpl$ = /*#__PURE__*/ template(`<span>`);
/** What gives an element `--folder-tag-color-rgb`, the colour of a tag */
var getFolderTagColorClassName = (color) => folderTag_module_default[`color${color}`];
/** A folder's colour on its own, where the folder is listed rather than a chat tagged with it */
function FolderTagColorDot(props) {
	return (() => {
		var _el$ = _tmpl$();
		createRenderEffect(() => className(_el$, classNames(folderTag_module_default.dot, getFolderTagColorClassName(props.color), props.class)));
		return _el$;
	})();
}
/** A folder's tag: its title in its colour - or, without a title, whatever is put in it */
function FolderTag(props) {
	return (() => {
		var _el$2 = _tmpl$();
		insert(_el$2, (() => {
			var _c$ = memo(() => !!props.title);
			return () => _c$() ? createComponent(FolderTitleTsx, { get title() {
				return props.title;
			} }) : props.children;
		})());
		createRenderEffect((_p$) => {
			var _v$ = classNames(folderTag_module_default.tag, getFolderTagColorClassName(props.color), "folder-tag", props.class), _v$2 = props.dir ?? (props.title ? "auto" : void 0);
			_v$ !== _p$.e && className(_el$2, _p$.e = _v$);
			_v$2 !== _p$.t && setAttribute(_el$2, "dir", _p$.t = _v$2);
			return _p$;
		}, {
			e: void 0,
			t: void 0
		});
		return _el$2;
	})();
}
//#endregion
//#region src/stores/folderTags.ts
/** The peer colours a folder tag can wear, as the clients count them */
var FOLDER_TAG_COLORS_COUNT = DialogColors.length;
/** The colour of a folder's tag, or nothing for a folder that has none */
function getFolderTagColor(filter) {
	const color = filter?.color;
	return color === void 0 || color < 0 ? void 0 : color % FOLDER_TAG_COLORS_COUNT;
}
/**
* The folders whose tags a chat wears, in the order the folders go: every one with a colour that
* has the chat, except `excludeFilterId` - the folder the list belongs to, whose tag would only
* repeat the tab it is open in. All chats and the archive have no tag of their own.
*/
function getDialogFolderTags(dialog, filters, excludeFilterId) {
	if (!dialog) return [];
	return filters.filter((filter) => {
		return filter.id !== excludeFilterId && getDialogIndex(dialog, getDialogIndexKey(filter.localId)) !== void 0;
	});
}
var store = createRoot(() => {
	const premium = usePremium();
	const [isSidebarCollapsed] = useIsSidebarCollapsed();
	const mediaSizes = useMediaSizes();
	const [forumOpen, setForumOpen] = createSignal(false);
	const chatListNarrow = createMemo(() => {
		return forumOpen() || isSidebarCollapsed() && !mediaSizes.isLessThanFloatingLeftSidebar;
	});
	return {
		shown: createMemo(() => !!appState.filtersTagsEnabled && premium()),
		filters: createMemo(() => {
			return (appState.filtersArr || []).filter((filter) => !REAL_FOLDERS.has(filter.id) && getFolderTagColor(filter) !== void 0).sort((a, b) => a.localId - b.localId);
		}),
		chatListNarrow,
		setForumOpen
	};
});
/** Whether the chat list shows folder tags at all - the account's switch, and Premium */
function useFolderTagsShown() {
	return store.shown;
}
/** The folders that have a tag, in their order */
function useFolderTagFilters() {
	return store.filters;
}
/**
* Whether the chat list is down to its avatars: a forum open over it, or the sidebar collapsed
* (`appDialogsManager.isChatListNarrow` reads it). Its rows have no room for a tag then, and go back
* to their height.
*/
function useChatListNarrow() {
	return store.chatListNarrow;
}
/** Whether a forum is open over the chat list - `appDialogsManager.forumTab` says so as it changes */
function setChatListForumOpen(open) {
	store.setForumOpen(open);
}
//#endregion
export { useChatListNarrow as a, FolderTag as c, setChatListForumOpen as i, FolderTagColorDot as l, getDialogFolderTags as n, useFolderTagFilters as o, getFolderTagColor as r, useFolderTagsShown as s, FOLDER_TAG_COLORS_COUNT as t, getFolderTagColorClassName as u };
