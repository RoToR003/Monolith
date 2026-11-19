//# allFunctionsCalledOnLoad
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { n as getAppWindow } from "./appWindow-bo-KtJhy.js";
import { t as clamp } from "./clamp-9UaNhw6N.js";
import { n as mediaSizes } from "./mediaSizes-C1MTaleW.js";
import { t as throttle } from "./throttle-DxyCT6GJ.js";
var SIDEBAR_COLLAPSE_FACTOR = .65;
var FOLDERS_SIDEBAR_WIDTH = 72;
var FOLDERS_SIDEBAR_OFFSET = 80;
var PAGE_CHATS_PADDING_ROOT_DESKTOP = 16;
var PAGE_CHATS_PADDING_ROOT_HANDHELD = 0;
var PAGE_CHATS_PADDING_CHAT_DESKTOP = 16;
var PAGE_CHATS_PADDING_CHAT_HANDHELD = 8;
var CHAT_WIDTH_MAX = 696;
var STORAGE_KEY_LEFT = "sidebar-left-width";
var STORAGE_KEY_RIGHT = "sidebar-right-width";
var userPreferredLeftWidth;
var userPreferredLeftCollapsed = false;
var userPreferredRightWidth;
var openTabsLeftSidebar = false;
var foldersSidebarShown = false;
(function loadUserPreferences() {
	const rawLeft = localStorage.getItem(STORAGE_KEY_LEFT);
	if (rawLeft != null) {
		const n = parseInt(rawLeft);
		if (!isNaN(n)) {
			if (n === 0) userPreferredLeftCollapsed = true;
			else userPreferredLeftWidth = clamp(n, 320, 480);
		}
	}
	const rawRight = localStorage.getItem(STORAGE_KEY_RIGHT);
	if (rawRight != null) {
		const n = parseInt(rawRight);
		if (!isNaN(n)) userPreferredRightWidth = clamp(n, 320, 480);
	}
})();
var persistLeftPreference = throttle(() => {
	localStorage.setItem(STORAGE_KEY_LEFT, (userPreferredLeftCollapsed ? 0 : userPreferredLeftWidth) + "");
}, 200);
var persistRightPreference = throttle(() => {
	localStorage.setItem(STORAGE_KEY_RIGHT, userPreferredRightWidth + "");
}, 200);
/**
* Called by the left resize handle while the user drags. `width <= 0`
* records a collapsed preference; any other value is clamped to MIN/MAX
* before storing.
*/
function setUserPreferredLeft(width) {
	if (width <= 0) {
		userPreferredLeftCollapsed = true;
		userPreferredLeftWidth = void 0;
	} else {
		userPreferredLeftCollapsed = false;
		userPreferredLeftWidth = clamp(width, 320, 480);
	}
	persistLeftPreference();
	updateColumnWidths();
}
/**
* Called by the right resize handle while the user drags. The width is
* clamped to MIN/MAX — the right column has no collapsed state.
*/
function setUserPreferredRight(width) {
	userPreferredRightWidth = clamp(width, 320, 480);
	persistRightPreference();
	updateColumnWidths();
}
function isUserCollapsedLeft() {
	return userPreferredLeftCollapsed;
}
/**
* Toggle the "open tabs" override. When the sidebar is collapsed and a tab
* (settings, archive, etc.) opens, the rendered width should be
* DEFAULT_COLUMN_WIDTH instead of SIDEBAR_COLLAPSED_WIDTH. The actual width
* change is animated by CSS (transition on #column-left.is-collapsed width).
*/
function setOpenTabsLeftSidebar(value) {
	if (openTabsLeftSidebar === value) return;
	openTabsLeftSidebar = value;
	updateColumnWidths();
}
/**
* Mirror the folders sidebar visibility into the width math. Adds
* FOLDERS_SIDEBAR_OFFSET to the docked-layout threshold so the right column
* starts to float a bit sooner when the folders panel reserves space.
*/
function setFoldersSidebarShown(value) {
	if (foldersSidebarShown === value) return;
	foldersSidebarShown = value;
	updateColumnWidths();
}
function computeVisualLeftWidth() {
	const vw = getAppWindow().innerWidth;
	const isMobile = mediaSizes.isMobile;
	const isFloatingLeft = mediaSizes.isLessThanFloatingLeftSidebar && !isMobile;
	const defaultColumnWidth = Math.min(vw, 360);
	if (isMobile) return vw;
	if (isFloatingLeft) return defaultColumnWidth;
	if (userPreferredLeftCollapsed && !openTabsLeftSidebar) return 80;
	return userPreferredLeftWidth ?? defaultColumnWidth;
}
function computeLayoutLeftWidth() {
	const vw = getAppWindow().innerWidth;
	const isMobile = mediaSizes.isMobile;
	const isFloatingLeft = mediaSizes.isLessThanFloatingLeftSidebar && !isMobile;
	const defaultColumnWidth = Math.min(vw, 360);
	if (isMobile) return vw;
	if (isFloatingLeft) return defaultColumnWidth;
	if (userPreferredLeftCollapsed) return 80;
	return userPreferredLeftWidth ?? defaultColumnWidth;
}
function computeRightWidth() {
	const vw = getAppWindow().innerWidth;
	if (mediaSizes.isMobile) return vw;
	return userPreferredRightWidth ?? Math.min(vw, 360);
}
var last = {
	visual: -1,
	layout: -1,
	right: -1,
	middle: -1,
	defaultColumn: -1,
	foldersWidth: -1,
	foldersOffset: -1,
	chatWidth: -1,
	rightSidebarFits: -1,
	pageChatsPaddingRoot: -1,
	pageChatsPaddingChat: -1,
	floats: void 0
};
var installed = false;
function updateColumnWidths() {
	const root = document.documentElement;
	const vw = getAppWindow().innerWidth;
	const isMobile = mediaSizes.isMobile;
	const rootStyle = getComputedStyle(root);
	const availableWidth = vw - ((parseFloat(rootStyle.paddingLeft) || 0) + (parseFloat(rootStyle.paddingRight) || 0));
	const defaultColumnWidth = Math.min(vw, 360);
	const visualLeftWidth = computeVisualLeftWidth();
	const layoutLeftWidth = computeLayoutLeftWidth();
	const rightWidth = computeRightWidth();
	const foldersOffset = foldersSidebarShown ? FOLDERS_SIDEBAR_OFFSET : 0;
	const rightColumnFits = foldersOffset + layoutLeftWidth + rightWidth + CHAT_WIDTH_MAX + 64;
	const floats = isMobile || availableWidth < rightColumnFits;
	const middleWidth = isMobile ? vw : availableWidth - 32;
	const isFloatingLeft = mediaSizes.isLessThanFloatingLeftSidebar && !isMobile;
	const chatAvailableWidth = isMobile || isFloatingLeft ? middleWidth : availableWidth - foldersOffset - layoutLeftWidth - 48;
	const chatWidth = isMobile ? vw : Math.min(chatAvailableWidth, CHAT_WIDTH_MAX);
	const rightSidebarFits = 1480;
	const pageChatsPaddingRoot = isMobile ? PAGE_CHATS_PADDING_ROOT_HANDHELD : PAGE_CHATS_PADDING_ROOT_DESKTOP;
	const pageChatsPaddingChat = isMobile ? PAGE_CHATS_PADDING_CHAT_HANDHELD : PAGE_CHATS_PADDING_CHAT_DESKTOP;
	if (last.defaultColumn !== defaultColumnWidth) {
		root.style.setProperty("--default-column-width", defaultColumnWidth + "px");
		last.defaultColumn = defaultColumnWidth;
	}
	if (last.visual !== visualLeftWidth) {
		root.style.setProperty("--left-column-visual-width", visualLeftWidth + "px");
		last.visual = visualLeftWidth;
	}
	if (last.layout !== layoutLeftWidth) {
		root.style.setProperty("--left-column-width", layoutLeftWidth + "px");
		last.layout = layoutLeftWidth;
	}
	if (last.right !== rightWidth) {
		root.style.setProperty("--right-column-width", rightWidth + "px");
		last.right = rightWidth;
	}
	if (last.middle !== middleWidth) {
		root.style.setProperty("--middle-column-width", middleWidth + "px");
		root.style.setProperty("--middle-column-width-value", "" + middleWidth);
		last.middle = middleWidth;
	}
	if (last.foldersWidth !== FOLDERS_SIDEBAR_WIDTH) {
		root.style.setProperty("--folders-sidebar-width", "72px");
		last.foldersWidth = FOLDERS_SIDEBAR_WIDTH;
	}
	if (last.foldersOffset !== foldersOffset) {
		root.style.setProperty("--folders-sidebar-offset", foldersOffset + "px");
		last.foldersOffset = foldersOffset;
	}
	if (last.chatWidth !== chatWidth) {
		root.style.setProperty("--chat-width", chatWidth + "px");
		last.chatWidth = chatWidth;
	}
	if (last.rightSidebarFits !== rightSidebarFits) {
		root.style.setProperty("--right-sidebar-fits", "1480px");
		last.rightSidebarFits = rightSidebarFits;
	}
	if (last.pageChatsPaddingRoot !== pageChatsPaddingRoot) {
		root.style.setProperty("--page-chats-padding", pageChatsPaddingRoot + "px");
		last.pageChatsPaddingRoot = pageChatsPaddingRoot;
	}
	if (last.pageChatsPaddingChat !== pageChatsPaddingChat) {
		const center = document.getElementById("column-center");
		if (center) {
			center.style.setProperty("--page-chats-padding", pageChatsPaddingChat + "px");
			last.pageChatsPaddingChat = pageChatsPaddingChat;
		}
	}
	if (last.floats !== floats) {
		document.body.classList.toggle("right-column-floats", floats);
		last.floats = floats;
	}
}
function installColumnWidthsUpdater() {
	if (installed) return;
	installed = true;
	mediaSizes.addEventListener("resize", updateColumnWidths);
	rootScope.addEventListener("resizing_left_sidebar", updateColumnWidths);
	updateColumnWidths();
}
updateColumnWidths();
//#endregion
export { setOpenTabsLeftSidebar as a, updateColumnWidths as c, setFoldersSidebarShown as i, installColumnWidthsUpdater as n, setUserPreferredLeft as o, isUserCollapsedLeft as r, setUserPreferredRight as s, SIDEBAR_COLLAPSE_FACTOR as t };
