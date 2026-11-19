//# allFunctionsCalledOnLoad
import { a as i18n } from "./langPack-BmdJGr44.js";
import { C as createSignal, _ as createMemo, i as For, p as createComponent } from "./solid-9Vxm0VIz.js";
import { n as Portal } from "./web-BPyQozky.js";
import { r as useHotReloadGuard } from "./hotReloadGuard-BUNVkeQ4.js";
import { r as resolveFirst } from "./dist-Fd6wPWkH.js";
import { t as I18nTsx } from "./i18n-CGMFiAW0.js";
import { B as getDefaultOptions, R as findExistingOrCreateCustomOption, z as findMatchingCustomOption } from "./confirmationPopup-Bz6mK0o-.js";
import { Qt as wrapAsyncClickHandler, St as getAutoDeleteUnavailablePeerIds } from "./appDialogsManager-CXguiKc3.js";
import { t as anchorCallback } from "./anchorCallback-BbwAJdBk.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { n as toast } from "./toast-B6VD5M7R.js";
import { a as showPickUserPopup } from "./pickUser-D8S6yVuK.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { t as Space } from "./space-XGOOgiuc.js";
import { t as RadioFieldTsx } from "./radioFieldTsx-kmtuN4Dv.js";
import { n as SaveButton, t as useIsConfirmationNeededOnClose } from "./useIsConfirmationNeededOnClose-D8OTEl9F.js";
import showAutoDeleteMessagesCustomTimePopup from "./customTimePopup-CNftebCJ.js";
import { t as SettingsTabLottieAnimation } from "./settingsTabLottieAnimation-B4U2pG04.js";
//#region src/components/applyAutoDeleteToChats.ts
/**
* tdesktop's `BuildApplyToExisting`: the chats picked here take the default auto-delete period
* (`period` in seconds, 0 turns it off) as well — those it can be set in, which is every private chat
* and every group or channel whose info the user may change.
*/
function applyAutoDeleteToChats(managers, period) {
	showPickUserPopup({
		titleLangKey: "SelectChats",
		placeholder: "Search",
		peerType: ["dialogs"],
		multiSelect: true,
		exceptSelf: true,
		excludeMonoforums: true,
		excludePeerIds: new Set(getAutoDeleteUnavailablePeerIds()),
		chatRightsActions: ["change_info"],
		footerButtonProps: { langKey: "Apply" },
		onSelect: (chosen) => {
			if (!chosen.length) return;
			Promise.allSettled(chosen.map(({ peerId }) => {
				return managers.appPrivacyManager.setAutoDeletePeriodFor(peerId, period);
			})).then((results) => {
				const succeeded = results.filter((result) => result.status === "fulfilled").length;
				toast(wrapAppliedToChats(period, succeeded, chosen.length - succeeded));
			});
		}
	});
}
/** The chats the server took, and an error for the rest: in one toast, which shows one at a time */
function wrapAppliedToChats(period, succeeded, failed) {
	const content = document.createDocumentFragment();
	if (succeeded) {
		const chats = i18n("Chats", [succeeded]);
		content.append(period ? i18n("AutodeleteTimerEnabledForChats", [findExistingOrCreateCustomOption(period).label(), chats]) : i18n("AutodeleteTimerDisabledForChats", [chats]));
	}
	if (failed) {
		if (succeeded) content.append(" ");
		content.append(i18n("Error.AnError"));
	}
	return content;
}
//#endregion
//#region src/components/sidebarLeft/tabs/autoDeleteMessages/index.tsx
var AutoDeleteMessages = () => {
	const { Row, rootScope, HotReloadGuard, i18n } = useHotReloadGuard();
	const [tab] = useSuperTab();
	const initialPeriod = findMatchingCustomOption(tab.payload.period)?.value || tab.payload.period;
	const defaultOptions = getDefaultOptions({ offLabel: () => resolveFirst(() => createComponent(I18nTsx, { key: "Off" }), (item) => item instanceof Element)() });
	const [period, setPeriod] = createSignal(initialPeriod);
	const hasChanges = createMemo(() => period() !== initialPeriod);
	const options = createMemo(() => {
		const result = [...defaultOptions];
		const localPeriod = period();
		for (let i = defaultOptions.length - 1; i >= 0; i--) {
			const value = defaultOptions[i].value;
			if (localPeriod === value) break;
			if (localPeriod > value) {
				result.splice(i + 1, 0, findExistingOrCreateCustomOption(localPeriod));
				break;
			}
		}
		return result;
	});
	const saveSettings = wrapAsyncClickHandler(async () => {
		if (!hasChanges()) return;
		try {
			await rootScope.managers.appPrivacyManager.setDefaultAutoDeletePeriod(period());
			tab.payload.onSaved(period());
		} finally {
			tab.close();
		}
	});
	tab.isConfirmationNeededOnClose = useIsConfirmationNeededOnClose({
		descriptionLangKey: "UnsavedChangesDescription.Privacy",
		hasChanges,
		saveAllSettings: saveSettings
	});
	const onOptionClick = (option) => {
		setPeriod(option.value);
	};
	const onCustomOptionClick = () => {
		showAutoDeleteMessagesCustomTimePopup({
			HotReloadGuard,
			descriptionLangKey: "AutoDeleteMessages.InfoDefault",
			onFinish: (value) => {
				setPeriod(value);
			},
			period: period()
		});
	};
	const applyToExistingLink = anchorCallback(() => applyAutoDeleteToChats(tab.managers, period()));
	return [
		createComponent(Portal, {
			get mount() {
				return tab.header;
			},
			get children() {
				return createComponent(SaveButton, {
					get hasChanges() {
						return hasChanges();
					},
					onClick: () => void saveSettings()
				});
			}
		}),
		createComponent(Space, { amount: "1rem" }),
		createComponent(SettingsTabLottieAnimation, { name: "UtyanDisappear" }),
		createComponent(Space, { amount: "2rem" }),
		createComponent(Section, {
			name: "AutoDeleteMessages.SectionTitle",
			get caption() {
				return i18n("GlobalAutoDeleteInfo", [applyToExistingLink]);
			},
			get children() {
				return [createComponent(For, {
					get each() {
						return options();
					},
					children: (option) => createComponent(Row, { get children() {
						return [createComponent(Row.RadioField, { get children() {
							return createComponent(RadioFieldTsx, {
								get checked() {
									return period() === option.value;
								},
								name: "auto-delete-period",
								get value() {
									return String(option.value);
								},
								onChange: (checked) => checked && onOptionClick(option)
							});
						} }), createComponent(Row.Title, { get children() {
							return option.label();
						} })];
					} })
				}), createComponent(Row, {
					clickable: onCustomOptionClick,
					get children() {
						return [createComponent(Row.Icon, { icon: "tools" }), createComponent(Row.Title, { get children() {
							return createComponent(I18nTsx, { key: "AutoDeleteMessages.SetOtherTime" });
						} })];
					}
				})];
			}
		})
	];
};
//#endregion
export { AutoDeleteMessages as default };
