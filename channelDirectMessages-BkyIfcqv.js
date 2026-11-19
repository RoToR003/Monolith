//# allFunctionsCalledOnLoad
import { a as i18n } from "./langPack-BmdJGr44.js";
import { C as createSignal, _ as createMemo, p as createComponent, s as Show } from "./solid-9Vxm0VIz.js";
import { n as Portal } from "./web-BPyQozky.js";
import { r as useHotReloadGuard } from "./hotReloadGuard-BUNVkeQ4.js";
import { t as Transition } from "./transition-Cmlc134D.js";
import { s as CheckboxFieldTsx } from "./confirmationPopup-Bz6mK0o-.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { t as useStarsCommissionAndWithdrawalPrice } from "./useStarsCommissionAndWithdrawalPrice-CBMOduwU.js";
import { n as SaveButton, t as useIsConfirmationNeededOnClose } from "./useIsConfirmationNeededOnClose-D8OTEl9F.js";
import { t as StarRangeInput } from "./starsRangeInput-DkDwusE1.js";
//#region src/components/sidebarRight/tabs/channelDirectMessages.tsx
var ChannelDirectMessages = () => {
	const [tab] = useSuperTab();
	const { apiManagerProxy, rootScope, Row } = useHotReloadGuard();
	const chat = tab.payload.chat;
	if (!chat) return [];
	const linkedChat = chat.linked_monoforum_id ? apiManagerProxy.getChat(chat.linked_monoforum_id) : void 0;
	const initialEnabled = !!linkedChat;
	const initialStars = linkedChat?._ === "channel" ? +linkedChat.send_paid_messages_stars || 0 : 0;
	const [enabled, setEnabled] = createSignal(initialEnabled);
	const [stars, setStars] = createSignal(initialStars);
	const hasChanges = createMemo(() => initialEnabled !== enabled() || enabled() && initialStars !== stars());
	const { commissionPercents, willReceiveDollars } = useStarsCommissionAndWithdrawalPrice(stars);
	let isSaving = false;
	async function saveSettings() {
		if (isSaving) return;
		isSaving = true;
		try {
			await rootScope.managers.appChatsManager.updateChannelPaidMessagesPrice(chat.id, enabled() ? stars() : 0, enabled());
			tab.close();
		} finally {
			isSaving = false;
		}
	}
	tab.isConfirmationNeededOnClose = useIsConfirmationNeededOnClose({
		saveAllSettings: saveSettings,
		hasChanges,
		descriptionLangKey: "UnsavedChangesDescription.Channel"
	});
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
		createComponent(Section, {
			caption: "ChannelDirectMessages.Settings.SwitchLabelCaption",
			get children() {
				return createComponent(Row, { get children() {
					return [createComponent(Row.CheckboxFieldToggle, { get children() {
						return createComponent(CheckboxFieldTsx, {
							toggle: true,
							get checked() {
								return enabled();
							},
							onChange: setEnabled
						});
					} }), createComponent(Row.Title, { get children() {
						return i18n("ChannelDirectMessages.Settings.SwitchLabel");
					} })];
				} });
			}
		}),
		createComponent(Transition, {
			name: "fade",
			get children() {
				return createComponent(Show, {
					get when() {
						return enabled();
					},
					get children() {
						return createComponent(Section, {
							name: "PaidMessages.SetPrice",
							"class": "overflow-hidden",
							caption: "PaidMessages.SetPriceChannelDescription",
							get captionArgs() {
								return [commissionPercents(), willReceiveDollars()];
							},
							get children() {
								return createComponent(StarRangeInput, {
									get value() {
										return stars();
									},
									onChange: setStars,
									startFromZero: true
								});
							}
						});
					}
				});
			}
		})
	];
};
//#endregion
export { ChannelDirectMessages as default };
