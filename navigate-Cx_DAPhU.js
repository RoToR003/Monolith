//# allFunctionsCalledOnLoad
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { n as highlightMenuControl, r as highlightSettingsEntry } from "./highlight-UNm3NgBo.js";
import { t as findSettingsLink } from "./link-CiovtA04.js";
import { i as openSectionTab } from "./openers-BkzxyZKg.js";
//#region src/lib/settingsSearch/navigate.ts
/**
* Opens the section itself, without the tabs above it: iOS pushes the target
* controller (`present(.push, blockedPeersController(...))`), tdesktop switches
* straight to the section and Android presents the fragment — the path is told
* by the result's breadcrumbs, not by walking it. Back returns to Settings.
*/
async function openSettingsSection(sectionId, anchorLangKey, settingsTab, inMenu) {
	const slider = settingsTab.slider;
	const middleware = settingsTab.middlewareHelper.get();
	if (!await slider.closeTabsUntilTab(settingsTab)) return;
	const tab = sectionId === "AppSettingsTab" ? settingsTab : await openSectionTab(sectionId, slider, settingsTab, middleware);
	if (!tab || !anchorLangKey) return;
	if (inMenu) {
		highlightMenuControl(tab.header.querySelector(".btn-menu-toggle"), anchorLangKey);
		return;
	}
	highlightSettingsEntry(tab, anchorLangKey);
}
var openSettingsSearchItem = (item, settingsTab) => {
	return openSettingsSection(item.sectionId, item.anchorLangKey, settingsTab, item.kind === "menu");
};
/** Opens `tg://settings/<path>?highlight=<key>`; false when the path is unknown. */
async function openSettingsDeepLink(path, highlight, slider) {
	const link = findSettingsLink(path);
	if (!link) return false;
	const opened = slider.getTab(hotReloadGuard.tabs.AppSettingsTab);
	if (opened && !await slider.closeTabsUntilTab(opened)) return true;
	const settingsTab = opened || slider.createTab(hotReloadGuard.tabs.AppSettingsTab);
	await settingsTab.open();
	await openSettingsSection(link.sectionId, highlight || link.highlight, settingsTab);
	return true;
}
//#endregion
export { openSettingsDeepLink, openSettingsSearchItem };
