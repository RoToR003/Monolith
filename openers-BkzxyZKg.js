//# allFunctionsCalledOnLoad
import { n as __exportAll } from "./rolldown-runtime-CwcJO0Gh.js";
import { t as noop } from "./noop-H9NNBLfX.js";
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { n as bindManagersToSession } from "./bindManagersToAccount-BL82O9H9.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
//#region src/lib/settingsSearch/openers.ts
var openers_exports = /* @__PURE__ */ __exportAll({
	A11Y_ONLY_ENTRIES: () => A11Y_ONLY_ENTRIES,
	NON_NAVIGABLE_SECTIONS: () => NON_NAVIGABLE_SECTIONS,
	WALLET_ENTRIES: () => WALLET_ENTRIES,
	openSectionTab: () => openSectionTab
});
/**
* Sections the search cannot open on its own: wizard steps and detail views that
* only make sense with the state their opener hands them (a specific session, a
* folder being edited, a password entered on the previous step).
*
* They — and everything below them — are dropped from the index, so every result
* the user sees is actually reachable. The row that leads into them is still
* indexed, since it lives in the parent section.
*/
var NON_NAVIGABLE_SECTIONS = /* @__PURE__ */ new Set([
	"AppTwoStepVerificationEnterPasswordTab",
	"AppTwoStepVerificationReEnterPasswordTab",
	"AppTwoStepVerificationHintTab",
	"AppTwoStepVerificationEmailTab",
	"AppTwoStepVerificationEmailConfirmationTab",
	"AppTwoStepVerificationSetTab",
	"AppPasscodeEnterPasswordTab",
	"AppSessionTab",
	"AppConnectedBotSessionTab",
	"AppEditFolderTab",
	"AppPasskeysTab",
	"AppIncludedChatsTab",
	"AppSharedFolderTab",
	"AppAddMembersTab",
	"AppChangeLoginEmailTab",
	"AppBusinessHoursDayTab",
	"AppTimezoneTab",
	"AppExperimentalTab",
	"AppNotificationExceptionsTab"
]);
/**
* Rows a tab renders only with the a11y layer (`?a11y=1`). The extractor indexes them either way;
* without the layer their results would open a screen that does not have them.
*/
var A11Y_ONLY_ENTRIES = /* @__PURE__ */ new Set(["AppGeneralSettingsTab:GeneralSettings.IncreaseContrast"]);
/** Rows of the wallet, which Settings shows only once it is released (`WALLET_RELEASED`) */
var WALLET_ENTRIES = /* @__PURE__ */ new Set(["AppSettingsTab:WalletAttachMoney"]);
var getConstructor = (sectionId) => {
	return hotReloadGuard.tabs[sectionId];
};
/**
* Creates the tab and opens it — unless the navigation was abandoned while its
* payload was loading, in which case there is nothing left to open it over.
*/
var openTab = async (slider, ctor, middleware, ...args) => {
	if (middleware && !middleware()) return;
	const tab = slider.createTab(ctor);
	await tab.open(...args);
	return tab;
};
/**
* Sections whose payload the search has to fetch itself. Everything else opens
* through {@link openSectionTab}, which passes the tab's own `getInitArgs` when
* it declares one and nothing otherwise.
*/
var SECTION_OPENERS = {
	AppPrivacyLastSeenTab: async (slider, middleware) => {
		const settings = await rootScope.managers.appPrivacyManager.getGlobalPrivacySettings();
		return openTab(slider, hotReloadGuard.tabs.AppPrivacyLastSeenTab, middleware, settings);
	},
	AppPrivacyGiftsTab: async (slider, middleware) => {
		const settings = await rootScope.managers.appPrivacyManager.getGlobalPrivacySettings();
		return openTab(slider, hotReloadGuard.tabs.AppPrivacyGiftsTab, middleware, settings);
	},
	AppActiveSessionsTab: async (slider, middleware) => {
		const managers = bindManagersToSession(rootScope.managers);
		const authorizations = await managers.appAccountManager.getAuthorizations();
		let connectedBot;
		try {
			connectedBot = await managers.appBusinessManager.getConnectedBot();
		} catch {}
		return openTab(slider, hotReloadGuard.tabs.AppActiveSessionsTab, middleware, {
			authorizations: authorizations.authorizations,
			connectedBot,
			ttlDays: authorizations.authorization_ttl_days
		});
	},
	AppBlockedUsersTab: async (slider, middleware) => {
		const { peerIds } = await rootScope.managers.appUsersManager.getBlocked();
		return openTab(slider, hotReloadGuard.tabs.AppBlockedUsersTab, middleware, { peerIds });
	},
	AppChatAutomationTab: async (slider, middleware) => {
		let connectedBot;
		try {
			connectedBot = await rootScope.managers.appBusinessManager.getConnectedBot();
		} catch {}
		return openTab(slider, hotReloadGuard.tabs.AppChatAutomationTab, middleware, { connectedBot });
	},
	AppPrivacyMessagesTab: (slider, middleware) => {
		return openTab(slider, hotReloadGuard.tabs.AppPrivacyMessagesTab, middleware, { onSaved: () => {} });
	},
	AppBusinessHoursTab: (slider) => hotReloadGuard.tabs.openBusinessEditorTab(slider, hotReloadGuard.tabs.AppBusinessHoursTab),
	AppBusinessLocationTab: (slider) => hotReloadGuard.tabs.openBusinessEditorTab(slider, hotReloadGuard.tabs.AppBusinessLocationTab),
	AppBusinessChatLinksTab: (slider) => hotReloadGuard.tabs.openBusinessEditorTab(slider, hotReloadGuard.tabs.AppBusinessChatLinksTab),
	AppBusinessIntroTab: (slider) => hotReloadGuard.tabs.openBusinessEditorTab(slider, hotReloadGuard.tabs.AppBusinessIntroTab),
	AppPasscodeLockTab: (slider) => hotReloadGuard.tabs.AppPasscodeLockTab.openChecked(slider),
	AppTwoStepVerificationTab: async (slider, middleware) => {
		const state = await rootScope.managers.passwordManager.getState();
		if (middleware && !middleware()) return;
		return hotReloadGuard.tabs.AppTwoStepVerificationTab.openChecked(slider, state);
	},
	AppActiveWebSessionsTab: async (slider, middleware) => {
		const authorizations = await rootScope.managers.appSeamlessLoginManager.getWebAuthorizations();
		return openTab(slider, hotReloadGuard.tabs.AppActiveWebSessionsTab, middleware, authorizations);
	},
	AppEditProfileTab: (slider, middleware) => {
		return openTab(slider, hotReloadGuard.tabs.AppEditProfileTab, middleware, hotReloadGuard.tabs.getEditProfileInitArgs(true));
	},
	AppMessagesAutoDeleteTab: async (slider, middleware) => {
		const period = await rootScope.managers.appPrivacyManager.getDefaultAutoDeletePeriod();
		return openTab(slider, hotReloadGuard.tabs.AppMessagesAutoDeleteTab, middleware, {
			period,
			onSaved: noop
		});
	}
};
/**
* Opens one section in `slider` and resolves with its tab once it is on screen.
* `fromTab` is the tab we descend from — a tab's `getInitArgs` prefetches through
* its managers, the same way the Settings list does it. Resolves with nothing when
* `middleware` says the navigation was abandoned while the payload was loading.
*/
async function openSectionTab(sectionId, slider, fromTab, middleware) {
	const opener = SECTION_OPENERS[sectionId];
	if (opener) return await opener(slider, middleware);
	const ctor = getConstructor(sectionId);
	return openTab(slider, ctor, middleware, ...ctor.getInitArgs ? [await ctor.getInitArgs(fromTab)] : []);
}
//#endregion
export { openers_exports as a, openSectionTab as i, NON_NAVIGABLE_SECTIONS as n, WALLET_ENTRIES as r, A11Y_ONLY_ENTRIES as t };
