//# allFunctionsCalledOnLoad
import { g as getPeerActiveUsernames } from "./objectUrlUtils-5x08MNuO.js";
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { a as i18n } from "./langPack-BmdJGr44.js";
import { C as createSignal, p as createComponent } from "./solid-9Vxm0VIz.js";
import { u as memo } from "./web-BPyQozky.js";
import { r as useHotReloadGuard } from "./hotReloadGuard-BUNVkeQ4.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { r as setButtonLoader } from "./putPreloader-Bxq7N1RV.js";
import { n as attachClickEvent } from "./clickEvent-COk4YpLP.js";
import { t as Button } from "./button-DpTvniRN.js";
import { i as Row, r as showPeerPopup, s as CheckboxFieldTsx, t as confirmationPopup } from "./confirmationPopup-Bz6mK0o-.js";
import { i as usePromiseCollector } from "./mediaHeader-CnpQNwOl.js";
import { t as anchorCallback } from "./anchorCallback-BbwAJdBk.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { r as wrapSolidComponent } from "./wrapSolidComponent-BASCjNJG.js";
import { r as toastNew } from "./toast-B6VD5M7R.js";
import { r as copyTextToClipboard } from "./clipboard-DzscV-ca.js";
import { t as toggleDisability } from "./toggleDisability-2oUcKWqw.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { t as toastError } from "./toastError-BSN4cjN_.js";
import { t as RadioFormTsx } from "./radioFormTsx-DmQSa7Gk.js";
import { t as ButtonCorner } from "./buttonCorner-HdHn23eT.js";
import { t as handleChannelsTooMuch } from "./channelsTooMuch-CxXSuR84.js";
import { t as getPeerEditableUsername } from "./getPeerEditableUsername-BUgQbT4O.js";
import { n as UsernamesSection, r as UsernameInputField, t as purchaseUsernameCaption } from "./purchaseUsernameCaption-B5g1Cm5z.js";
//#region src/components/sidebarRight/tabs/chatType.tsx
var ChatType = () => {
	const [tab] = useSuperTab();
	const promiseCollector = usePromiseCollector();
	const { apiManagerProxy } = useHotReloadGuard();
	const { chatId, chatFull } = tab.payload;
	promiseCollector.collect((async () => {
		tab.container.classList.add("edit-peer-container", "group-type-container");
		const isBroadcast = await tab.managers.appChatsManager.isBroadcast(chatId);
		const linkedChatId = chatFull.linked_chat_id;
		const privacySignal = createSignal();
		const joinToSendSignal = createSignal(false);
		const joinRequestSignal = createSignal(false);
		const noForwardsSignal = createSignal(false);
		const noForwardsBusySignal = createSignal(false);
		const privacyValues = [{
			langPackKey: isBroadcast ? "ChannelPrivate" : "MegaPrivate",
			subtitle: i18n(isBroadcast ? "ChannelPrivateInfo" : "MegaPrivateInfo"),
			value: "private"
		}, {
			langPackKey: isBroadcast ? "ChannelPublic" : "MegaPublic",
			subtitle: i18n(isBroadcast ? "ChannelPublicInfo" : "MegaPublicInfo"),
			value: "public"
		}];
		tab.title.replaceChildren(i18n(isBroadcast ? "ChannelType" : "GroupType"));
		const publicContainer = document.createElement("div");
		let joinRequestSection;
		let onChange = () => {};
		const onPrivacyChange = (value) => {
			privacySignal[1](value);
			const a = [[privateSection], [publicContainer]];
			if (value === "public") a.reverse();
			a[0].forEach((container) => container.classList.remove("hide"));
			a[1].forEach((container) => container.classList.add("hide"));
			onChange();
			if (joinRequestSection && !linkedChatId && !isBroadcast) joinRequestSection.classList.toggle("hide", value !== "public");
		};
		const section = wrapSolidComponent(() => createComponent(Section, {
			name: isBroadcast ? "ChannelType" : "GroupType",
			get children() {
				return createComponent(RadioFormTsx, {
					get selected() {
						return privacySignal[0]();
					},
					values: privacyValues,
					onChange: onPrivacyChange
				});
			}
		}), tab.middlewareHelper.get());
		let chat = apiManagerProxy.getChat(chatId);
		const chatUpdateListeners = { basic: [] };
		const addChatUpdateListener = (callback, type = "basic") => {
			chatUpdateListeners[type].push(callback);
		};
		tab.listenerSetter.add(rootScope)("chat_update", (updatedChatId) => {
			if (chatId === updatedChatId) {
				chat = apiManagerProxy.getChat(chatId);
				chatUpdateListeners["basic"].forEach((callback) => callback());
			}
		});
		const inviteLinkSignal = createSignal(chatFull.exported_invite.link);
		const btnRevoke = Button("btn-primary btn-transparent danger", {
			icon: "delete",
			text: "RevokeLink"
		});
		attachClickEvent(btnRevoke, () => {
			showPeerPopup("revoke-link", {
				buttons: [{
					langKey: "RevokeButton",
					callback: () => {
						const toggle = toggleDisability([btnRevoke], true);
						tab.managers.appProfileManager.getChatInviteLink(chatId, true).then((link) => {
							inviteLinkSignal[1](link);
						}, (err) => {
							toastError(err, "revoke link error");
						}).finally(toggle);
					}
				}],
				titleLangKey: "RevokeLink",
				descriptionLangKey: "RevokeAlert"
			});
		}, { listenerSetter: tab.listenerSetter });
		const privateSection = wrapSolidComponent(() => createComponent(Section, { get children() {
			return [createComponent(Row, {
				clickable: () => {
					copyTextToClipboard(inviteLinkSignal[0]());
					toastNew({ langPackKey: "LinkCopied" });
				},
				get children() {
					return [createComponent(Row.Title, { get children() {
						return inviteLinkSignal[0]();
					} }), createComponent(Row.Subtitle, { get children() {
						return i18n(isBroadcast ? "ChannelPrivateLinkHelp" : "MegaPrivateLinkHelp");
					} })];
				}
			}), btnRevoke];
		} }), tab.middlewareHelper.get());
		const inputWrapper = document.createElement("div");
		inputWrapper.classList.add("input-wrapper");
		const placeholder = "t.me/";
		let changedPrivacy, changedJoinToSend, changedJoinRequest;
		onChange = () => {
			changedPrivacy = privacySignal[0]() === "private" && originalValue !== placeholder || linkInputField.isValidToChange() && linkInputField.input.classList.contains("valid");
			changedJoinToSend = !isBroadcast && joinToSendSignal[0]() !== originalJoinToSend;
			changedJoinRequest = joinRequestSignal[0]() !== originalJoinRequest;
			applyBtn.classList.toggle("is-visible", changedPrivacy || changedJoinToSend || changedJoinRequest);
			const { error } = linkInputField;
			const isPurchase = error?.type === "USERNAME_PURCHASE_AVAILABLE";
			setUsername(isPurchase ? linkInputField.getValue() : void 0);
		};
		const linkInputField = new UsernameInputField({
			label: "SetUrlPlaceholder",
			name: "group-public-link",
			plainText: true,
			listenerSetter: tab.listenerSetter,
			availableText: "Link.Available",
			invalidText: "Link.Invalid",
			takenText: "Link.Taken",
			onChange,
			peerId: chatId.toPeerId(true),
			head: placeholder
		}, tab.managers);
		const { setUsername, element: p } = purchaseUsernameCaption();
		const originalValue = placeholder + (getPeerEditableUsername(chat) || "");
		inputWrapper.append(linkInputField.container);
		const publicSection = wrapSolidComponent(() => createComponent(Section, {
			noDelimiter: true,
			get caption() {
				return [p, memo(() => i18n(isBroadcast ? "Channel.UsernameAboutChannel" : "Channel.UsernameAboutGroup"))];
			},
			children: inputWrapper
		}), tab.middlewareHelper.get());
		const usernamesSection = wrapSolidComponent(() => createComponent(UsernamesSection, {
			get peerId() {
				return chatId.toPeerId(true);
			},
			peer: chat,
			usernameInputField: linkInputField
		}), tab.middlewareHelper.get());
		publicContainer.append(publicSection, usernamesSection);
		const applyBtn = ButtonCorner({
			icon: "check",
			className: "is-visible",
			ariaLabel: "Save"
		});
		tab.content.append(applyBtn);
		const getUsername = () => privacySignal[0]() === "public" ? linkInputField.getValue() : "";
		const changePrivacy = async () => {
			const username = getUsername();
			const channelId = await tab.managers.appChatsManager.migrateChat(chatId);
			if (!username) return tab.managers.appChatsManager.makeChannelPrivate(channelId);
			else return tab.managers.appChatsManager.updateUsername(channelId, username);
		};
		const confirmChangingPrivacy = async () => {
			if (!getUsername()) {
				const chat = apiManagerProxy.getChat(chatId);
				const wasUsername = getPeerEditableUsername(chat);
				if (wasUsername) await confirmationPopup({
					descriptionLangKey: isBroadcast ? "ChannelVisibility.Confirm.MakePrivate.Channel" : "ChannelVisibility.Confirm.MakePrivate.Group",
					descriptionLangArgs: [wasUsername],
					button: { langKey: "OK" }
				});
			}
		};
		attachClickEvent(applyBtn, async () => {
			if (changedPrivacy) await confirmChangingPrivacy();
			const unsetLoader = setButtonLoader(applyBtn);
			try {
				if (changedPrivacy) await changePrivacy();
				if (changedJoinToSend || changedJoinRequest) {
					const joinToSendValue = joinToSendSignal[0]();
					const joinRequestValue = joinRequestSignal[0]();
					const callbacks = [changedJoinToSend && (() => tab.managers.appChatsManager.toggleJoinToSend(chatId, joinToSendValue)), changedJoinRequest && (() => tab.managers.appChatsManager.toggleJoinRequest(chatId, joinRequestValue))].filter(Boolean);
					for (const callback of callbacks) await handleChannelsTooMuch(callback);
				}
				tab.close();
			} catch (err) {
				console.error("changePrivacy error", err);
				unsetLoader();
			}
		}, { listenerSetter: tab.listenerSetter });
		tab.scrollable.append(section, privateSection, publicContainer);
		let originalJoinToSend, originalJoinRequest;
		{
			const canToggleJoinRequest = () => {
				if (isBroadcast) return true;
				return linkedChatId ? joinToSendSignal[0]() : privacySignal[0]() === "public";
			};
			const toggleJoinRequestVisibility = () => {
				if (!canToggleJoinRequest() && joinRequestSignal[0]()) joinRequestSignal[1](false);
			};
			const onChatUpdate = () => {
				originalJoinToSend = !!chat.pFlags.join_to_send;
				originalJoinRequest = !!chat.pFlags.join_request;
				joinToSendSignal[1](originalJoinToSend);
				joinRequestSignal[1](originalJoinRequest);
				toggleJoinRequestVisibility();
				onChange();
			};
			let sectionCaption;
			const section = joinRequestSection = wrapSolidComponent(() => createComponent(Section, {
				name: isBroadcast ? void 0 : "ChannelSettingsJoinTitle",
				caption: true,
				captionRef: (element) => sectionCaption = element,
				get children() {
					return [!isBroadcast && createComponent(Row, {
						classList: { hide: !linkedChatId },
						get children() {
							return [createComponent(Row.CheckboxFieldToggle, { get children() {
								return createComponent(CheckboxFieldTsx, {
									signal: joinToSendSignal,
									toggle: true,
									onChange: () => {
										toggleJoinRequestVisibility();
										onChange();
									}
								});
							} }), createComponent(Row.Title, { get children() {
								return i18n("ChannelSettingsJoinToSend");
							} })];
						}
					}), createComponent(Row, {
						get classList() {
							return { hide: !canToggleJoinRequest() };
						},
						get children() {
							return [createComponent(Row.CheckboxFieldToggle, { get children() {
								return createComponent(CheckboxFieldTsx, {
									signal: joinRequestSignal,
									toggle: true,
									onChange
								});
							} }), createComponent(Row.Title, { get children() {
								return i18n(isBroadcast ? "ChannelSettingsJoinRequestChannel" : "ChannelSettingsJoinRequest");
							} })];
						}
					})];
				}
			}), tab.middlewareHelper.get());
			addChatUpdateListener(onChatUpdate);
			onChatUpdate();
			const updateCaption = async () => {
				const guardBotId = (await tab.managers.appProfileManager.getCachedFullChat(chatId))?.guard_bot_id;
				const nodes = [i18n(linkedChatId && !isBroadcast ? "ChannelSettingsJoinToSendInfo" : "ChannelSettingsJoinRequestInfo")];
				const guardBotUsername = guardBotId && getPeerActiveUsernames(await tab.managers.appUsersManager.getUser(guardBotId.toUserId()))[0];
				if (guardBotUsername) {
					const peerId = guardBotId.toPeerId(false);
					const anchor = anchorCallback(async () => {
						const participant = await tab.managers.appProfileManager.getParticipant(chatId, peerId);
						if (participant) hotReloadGuard.tabs.openUserPermissionsTab(tab.slider, chatId, participant, true);
					});
					anchor.dir = "ltr";
					anchor.append("@" + guardBotUsername);
					nodes.push(" ", i18n("GuardBotManagedBy", [anchor]));
				}
				sectionCaption.replaceChildren(...nodes);
			};
			await updateCaption();
			tab.listenerSetter.add(rootScope)("chat_full_update", (updatedChatId) => {
				if (chatId === updatedChatId) updateCaption();
			});
			tab.scrollable.append(section);
		}
		{
			const section = wrapSolidComponent(() => createComponent(Section, {
				name: "SavingContentTitle",
				caption: isBroadcast ? "RestrictSavingContentInfoChannel" : "RestrictSavingContentInfoGroup",
				get children() {
					return createComponent(Row, {
						get disabled() {
							return noForwardsBusySignal[0]();
						},
						get children() {
							return [createComponent(Row.CheckboxFieldToggle, { get children() {
								return createComponent(CheckboxFieldTsx, {
									signal: noForwardsSignal,
									toggle: true,
									get disabled() {
										return noForwardsBusySignal[0]();
									},
									onChange: (checked) => {
										noForwardsBusySignal[1](true);
										tab.managers.appProfileManager.toggleNoForwards(chatId.toPeerId(true), checked).finally(() => {
											noForwardsBusySignal[1](false);
										});
									}
								});
							} }), createComponent(Row.Title, { get children() {
								return i18n("RestrictSavingContent");
							} })];
						}
					});
				}
			}), tab.middlewareHelper.get());
			const onChatUpdate = () => {
				noForwardsSignal[1](!!chat.pFlags.noforwards);
			};
			addChatUpdateListener(onChatUpdate);
			onChatUpdate();
			tab.scrollable.append(section);
		}
		onPrivacyChange(originalValue !== placeholder || getPeerActiveUsernames(chat).length ? "public" : "private");
		linkInputField.setOriginalValue(originalValue, true);
	})());
	return null;
};
//#endregion
export { ChatType as default };
