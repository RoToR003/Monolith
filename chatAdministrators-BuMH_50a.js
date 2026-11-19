//# allFunctionsCalledOnLoad
import { a as i18n } from "./langPack-BmdJGr44.js";
import { C as createSignal, M as onCleanup, p as createComponent, s as Show } from "./solid-9Vxm0VIz.js";
import { n as Portal } from "./web-BPyQozky.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { t as Button } from "./buttonTsx-Bwphkm9r.js";
import { o as createMiddleware } from "./sticker-5twBOy1Y.js";
import { dt as wrapPeerTitle, i as Row, s as CheckboxFieldTsx } from "./confirmationPopup-Bz6mK0o-.js";
import { mn as getParticipantPeerId, rn as isParticipantAdmin, un as hasRights } from "./getChatMigratedTo-ChhMNXuu.js";
import { i as usePromiseCollector } from "./mediaHeader-CnpQNwOl.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { r as toastNew } from "./toast-B6VD5M7R.js";
import { a as showPickUserPopup } from "./pickUser-D8S6yVuK.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { t as useCommunityTabGuard } from "./useCommunityTabGuard-CjtFqUbl.js";
import { t as handleChannelsTooMuch } from "./channelsTooMuch-CxXSuR84.js";
import { i as canOpenAdminEditor } from "./addBotToChat-DlkmZrNl.js";
import { t as createParticipantContextMenu } from "./createParticipantContextMenu-Ch5EtcJW.js";
import { n as createSelectorForTab, t as createSelectorForParticipants } from "./participantsSelector-DN30gTi4.js";
import { t as isCommunityAdminCandidate } from "./isAdminCandidate-CXXLpr1g.js";
import { n as createCommunityParticipantCandidatesLoader, t as createCommunityParticipantsLoader } from "./createCommunityParticipantsLoader-DV3CuSi1.js";
//#region src/components/sidebarRight/tabs/chatAdministratorsSource.ts
async function createChatAdministratorsSource(options) {
	const { tab, chatId, middleware } = options;
	const peerId = chatId.toPeerId(true);
	const [chat, isBroadcast, chatFull, appConfig] = await Promise.all([
		tab.managers.appChatsManager.getChat(chatId),
		tab.managers.appChatsManager.isBroadcast(chatId),
		tab.managers.appProfileManager.getChatFull(chatId),
		tab.managers.apiManager.getAppConfig()
	]);
	const canSeeAntiSpam = !isBroadcast && chat.participants_count >= appConfig.telegram_antispam_group_size_min;
	return {
		canAddAdmins: hasRights(chat, "add_admins"),
		antiSpam: canSeeAntiSpam ? {
			checked: !!chatFull?.pFlags?.antispam,
			disabled: !hasRights(chat, "delete_messages"),
			toggle: (checked) => handleChannelsTooMuch(() => {
				return tab.managers.appChatsManager.toggleAntiSpam(chatId, checked);
			})
		} : void 0,
		createSelector: (selectorOptions) => {
			return createSelectorForParticipants({
				...selectorOptions,
				peerId,
				channelParticipantsFilter: (q) => {
					return {
						_: "channelParticipantsAdmins",
						q
					};
				},
				channelParticipantsUpdateFilter: isParticipantAdmin
			});
		},
		openAddAdmin: (openPermissions) => {
			const { managers } = tab;
			const searchGlobally = chat._ === "channel";
			let closed = false;
			const popup = showPickUserPopup({
				titleLangKey: "Administrators",
				peerType: searchGlobally ? ["channelParticipants", "custom"] : ["channelParticipants"],
				getMoreCustom: searchGlobally ? async (q) => {
					if (!q) return {
						result: [],
						isEnd: true
					};
					const { my_results, results } = await managers.appUsersManager.searchContacts(q);
					return {
						result: my_results.concat(results).filter((peerId) => peerId.isUser()),
						isEnd: true
					};
				} : void 0,
				meAsSaved: false,
				peerId,
				onSelect: async (chosen) => {
					const userId = chosen[0].peerId;
					let participant = popup.selector.participants.get(userId);
					if (!participant) {
						let missing;
						let error;
						try {
							({participant, missing} = await managers.appProfileManager.getParticipantOrMissing(chatId, userId));
						} catch (err) {
							error = err;
						}
						if (closed || !middleware() || error?.type === "MIDDLEWARE") return;
						if (error) {
							toastNew({ langPackKey: "Error.AnError" });
							return;
						}
						if (!canOpenAdminEditor(chat, missing)) {
							toastNew({ langPackKey: "AddAdminErrorNotAMember" });
							return;
						}
					}
					openPermissions(participant);
				},
				onClose: () => {
					closed = true;
				},
				placeholder: "SearchPlaceholder"
			});
		},
		openPermissions: ({ participant }) => {
			if (participant) hotReloadGuard.tabs.openUserPermissionsTab(tab.slider, chatId, participant, true);
		},
		attachSelectorBehavior: (selector) => {
			createParticipantContextMenu({
				chatId,
				listenTo: selector.scrollable.container,
				participants: selector.participants,
				slider: tab.slider,
				middleware
			});
		}
	};
}
//#endregion
//#region src/components/sidebarRight/tabs/communityAdministratorsSource.ts
async function createCommunityAdministratorsSource(options) {
	const { tab, communityId } = options;
	const canAddAdmins = await tab.managers.appCommunitiesManager.hasRights(communityId, "add_admins");
	let selector;
	return {
		canAddAdmins,
		createSelector: (selectorOptions) => {
			const result = createSelectorForTab({
				...selectorOptions,
				peerType: ["custom"],
				getMoreCustom: createCommunityParticipantsLoader({
					communityId,
					manager: tab.managers.appProfileManager,
					filter: (q) => ({
						_: "channelParticipantsAdmins",
						q
					}),
					onParticipant: (participantId, participant) => {
						selector.participants.set(participantId, participant);
					},
					limit: 50
				})
			});
			selector = result.selector;
			return result;
		},
		openAddAdmin: (openPermissions) => {
			showPickUserPopup({
				titleLangKey: "Administrators",
				peerType: ["custom"],
				exceptSelf: true,
				filterPeerTypeBy: isCommunityAdminCandidate,
				getMoreCustom: createCommunityParticipantCandidatesLoader({
					communityId,
					manager: tab.managers.appCommunitiesManager,
					limit: 50
				}),
				onSelect: (chosen) => {
					openPermissions(chosen[0].peerId);
				},
				placeholder: "SearchPlaceholder"
			});
		},
		openPermissions: ({ participantId, participant, onUpdated }) => {
			hotReloadGuard.tabs.openCommunityUserPermissionsTab(tab.slider, communityId, participantId, participant, onUpdated);
		}
	};
}
//#endregion
//#region src/components/sidebarRight/tabs/chatAdministrators.tsx
var ChatAdministrators = () => {
	const [tab] = useSuperTab();
	const promiseCollector = usePromiseCollector();
	const communityId = "communityId" in tab.payload ? tab.payload.communityId : void 0;
	const chatId = "chatId" in tab.payload ? tab.payload.chatId : void 0;
	if (communityId !== void 0) useCommunityTabGuard(tab, communityId);
	const middleware = createMiddleware().get(tab.middlewareHelper.get());
	const [administratorSource, setAdministratorSource] = createSignal();
	const [selector, setSelector] = createSignal();
	const [antiSpamChecked, setAntiSpamChecked] = createSignal(false);
	let openPermissions;
	onCleanup(() => {
		tab.container.classList.remove("edit-peer-container", "chat-administrators-container");
		selector()?.container?.remove();
	});
	promiseCollector.collect((async () => {
		const source = communityId === void 0 ? await createChatAdministratorsSource({
			tab,
			chatId,
			middleware
		}) : await createCommunityAdministratorsSource({
			tab,
			communityId
		});
		if (!middleware()) return;
		tab.container.classList.add("edit-peer-container", "chat-administrators-container");
		const syncParticipant = async (participantId, updatedParticipant) => {
			if (!middleware()) return;
			const currentSelector = selector();
			if (!currentSelector) return;
			if (!updatedParticipant || !isParticipantAdmin(updatedParticipant)) {
				currentSelector.participants.delete(participantId);
				currentSelector.deletePeerId(participantId);
				return;
			}
			const updatedParticipantId = getParticipantPeerId(updatedParticipant);
			currentSelector.participants.set(updatedParticipantId, updatedParticipant);
			if (!currentSelector.getElementByKey(updatedParticipantId)) await currentSelector.renderResultsFunc([updatedParticipantId], false);
		};
		openPermissions = (participantOrPeerId) => {
			const currentSelector = selector();
			const participant = typeof participantOrPeerId === "object" ? participantOrPeerId : currentSelector?.participants.get(participantOrPeerId);
			const participantId = participant ? getParticipantPeerId(participant) : participantOrPeerId;
			source.openPermissions({
				participantId,
				participant,
				onUpdated: (updatedParticipant) => {
					return syncParticipant(participantId, updatedParticipant);
				}
			});
		};
		const selectorResult = source.createSelector({
			appendTo: tab.content,
			managers: tab.managers,
			middleware,
			getSubtitleForElement: async (peerId) => {
				const participant = selector()?.participants.get(peerId);
				if (!participant) return;
				if (participant._ === "channelParticipantCreator" || participant._ === "chatParticipantCreator") return i18n("ChannelCreator");
				let promotedBy;
				if (participant._ === "channelParticipantAdmin") promotedBy = participant.promoted_by;
				else if (participant._ === "chatParticipantAdmin") promotedBy = participant.inviter_id;
				else return;
				return i18n("EditAdminPromotedBy", [await wrapPeerTitle({ peerId: promotedBy.toPeerId(false) })]);
			},
			onSelect: (participantId) => {
				openPermissions(selector()?.participants.get(participantId) || participantId);
			}
		});
		setSelector(selectorResult.selector);
		source.attachSelectorBehavior?.(selectorResult.selector);
		setAntiSpamChecked(!!source.antiSpam?.checked);
		setAdministratorSource(source);
		await selectorResult.loadPromise;
	})());
	const toggleAntiSpam = async (checked) => {
		const antiSpam = administratorSource()?.antiSpam;
		if (!antiSpam || checked === antiSpamChecked()) return;
		const previousChecked = antiSpamChecked();
		setAntiSpamChecked(checked);
		try {
			await antiSpam.toggle(checked);
		} catch (error) {
			console.error("toggleAntiSpam error", error);
			setAntiSpamChecked(previousChecked);
		}
	};
	return [createComponent(Portal, {
		get mount() {
			return tab.content;
		},
		get children() {
			return createComponent(Show, {
				get when() {
					return administratorSource()?.canAddAdmins;
				},
				get children() {
					return createComponent(Button.Corner, {
						"class": "is-visible",
						icon: "addmember_filled",
						get ["aria-label"]() {
							return i18n("EditAdminAddAdmins").textContent;
						},
						tabIndex: 0,
						onClick: () => {
							administratorSource()?.openAddAdmin(openPermissions);
						}
					});
				}
			});
		}
	}), createComponent(Show, {
		get when() {
			return administratorSource()?.antiSpam;
		},
		children: (antiSpam) => createComponent(Show, {
			get when() {
				return selector();
			},
			children: (selector) => createComponent(Portal, {
				get mount() {
					return selector().scrollable.container;
				},
				get children() {
					return createComponent(Section, {
						noDelimiter: true,
						caption: "ChannelAntiSpamInfo",
						get children() {
							return createComponent(Row, { get children() {
								return [createComponent(Row.CheckboxFieldToggle, { get children() {
									return createComponent(CheckboxFieldTsx, {
										toggle: true,
										get checked() {
											return antiSpamChecked();
										},
										get disabled() {
											return antiSpam().disabled;
										},
										onChange: (checked) => void toggleAntiSpam(checked)
									});
								} }), createComponent(Row.Title, { get children() {
									return i18n("ChannelAntiSpam");
								} })];
							} });
						}
					});
				}
			})
		})
	})];
};
//#endregion
export { ChatAdministrators as default };
