//# allFunctionsCalledOnLoad
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { a as i18n } from "./langPack-BmdJGr44.js";
import { C as createSignal, M as onCleanup, g as createEffect, p as createComponent, s as Show } from "./solid-9Vxm0VIz.js";
import { n as Portal } from "./web-BPyQozky.js";
import { t as Button } from "./buttonTsx-Bwphkm9r.js";
import { o as createMiddleware } from "./sticker-5twBOy1Y.js";
import { Gt as getPeerTitle, dt as wrapPeerTitle } from "./confirmationPopup-Bz6mK0o-.js";
import { in as isParticipantCreator, mn as getParticipantPeerId, rn as isParticipantAdmin, un as hasRights } from "./getChatMigratedTo-ChhMNXuu.js";
import { i as usePromiseCollector } from "./mediaHeader-CnpQNwOl.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { r as toastNew } from "./toast-B6VD5M7R.js";
import { a as showPickUserPopup } from "./pickUser-D8S6yVuK.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { t as useCommunityTabGuard } from "./useCommunityTabGuard-CjtFqUbl.js";
import { t as createParticipantContextMenu } from "./createParticipantContextMenu-Ch5EtcJW.js";
import { n as createSelectorForTab, t as createSelectorForParticipants } from "./participantsSelector-DN30gTi4.js";
import { n as createCommunityParticipantCandidatesLoader, t as createCommunityParticipantsLoader } from "./createCommunityParticipantsLoader-DV3CuSi1.js";
//#region src/components/sidebarRight/tabs/removedUsersSource.ts
var isRemovedParticipant = (participant) => {
	return participant?._ === "channelParticipantBanned" && !!participant.pFlags.left;
};
//#endregion
//#region src/components/sidebarRight/tabs/chatRemovedUsersSource.ts
async function createChatRemovedUsersSource(options) {
	const { tab, chatId, middleware } = options;
	const peerId = chatId.toPeerId(true);
	const [chat, isBroadcast] = await Promise.all([tab.managers.appChatsManager.getChat(chatId), tab.managers.appChatsManager.isBroadcast(chatId)]);
	return {
		canChangePermissions: hasRights(chat, "change_permissions"),
		caption: isBroadcast ? "NoBlockedChannel2" : "NoBlockedGroup2",
		createSelector: (selectorOptions) => {
			const result = createSelectorForParticipants({
				...selectorOptions,
				peerId,
				channelParticipantsFilter: (q) => ({
					_: "channelParticipantsKicked",
					q
				}),
				channelParticipantsUpdatePeerId: peerId,
				channelParticipantsUpdateFilter: isRemovedParticipant
			});
			result.selector;
			return result;
		},
		openAddParticipant: () => {
			const popup = showPickUserPopup({
				titleLangKey: "RemovedUsers",
				peerType: ["channelParticipants"],
				peerId,
				onSelect: (chosen) => {
					const participant = popup.selector.participants.get(chosen[0].peerId);
					return tab.managers.appChatsManager.kickFromChat(chatId, participant);
				},
				placeholder: "SearchPlaceholder"
			});
		},
		attachSelectorBehavior: (currentSelector) => {
			createParticipantContextMenu({
				chatId,
				listenTo: currentSelector.scrollable.container,
				participants: currentSelector.participants,
				slider: tab.slider,
				middleware
			});
		}
	};
}
//#endregion
//#region src/components/sidebarRight/tabs/communityRemovedUsersSource.ts
var makeRemovedParticipant = (participantId) => ({
	_: "channelParticipantBanned",
	pFlags: { left: true },
	peer: {
		_: "peerUser",
		user_id: participantId.toUserId()
	},
	kicked_by: rootScope.myId.toUserId(),
	date: Math.floor(Date.now() / 1e3),
	banned_rights: {
		_: "chatBannedRights",
		pFlags: { view_messages: true },
		until_date: 0
	}
});
async function createCommunityRemovedUsersSource(options) {
	const { tab, communityId, middleware } = options;
	const manager = tab.managers.appCommunitiesManager;
	const participantsManager = tab.managers.appProfileManager;
	const canChangePermissions = await manager.hasRights(communityId, "ban_users");
	let selector;
	let working = false;
	const syncParticipant = async (participantId, participant) => {
		if (!middleware()) return;
		if (!isRemovedParticipant(participant)) {
			selector.participants.delete(participantId);
			selector.deletePeerId(participantId);
			return;
		}
		const updatedParticipantId = getParticipantPeerId(participant);
		selector.participants.set(updatedParticipantId, participant);
		if (!selector.getElementByKey(updatedParticipantId)) await selector.renderResultsFunc([updatedParticipantId], false);
	};
	const getParticipant = async (participantId) => {
		try {
			return await participantsManager.getChannelParticipant(communityId, participantId);
		} catch {
			return;
		}
	};
	const runMutation = async (name, callback) => {
		if (working) return;
		working = true;
		try {
			await callback();
		} catch (error) {
			console.error(`${name} community participant error`, error);
			toastNew({ langPackKey: "Error.AnError" });
		} finally {
			working = false;
		}
	};
	const banParticipant = (participantId) => {
		return runMutation("ban", async () => {
			const participant = await getParticipant(participantId);
			if (isRemovedParticipant(participant)) {
				await syncParticipant(participantId, participant);
				return;
			}
			if (isParticipantCreator(participant) || isParticipantAdmin(participant) && !participant.pFlags.can_edit) {
				toastNew({ langPackKey: "AddBannedErrorAdmin" });
				return;
			}
			const title = await getPeerTitle({
				peerId: participantId,
				plainText: true,
				onlyFirstName: true
			});
			await manager.toggleParticipantBanned({
				communityId,
				participantId
			});
			const updatedParticipant = await getParticipant(participantId);
			await syncParticipant(participantId, isRemovedParticipant(updatedParticipant) ? updatedParticipant : makeRemovedParticipant(participantId));
			toastNew({
				langPackKey: "Community.Banned",
				langPackArguments: [title]
			});
		});
	};
	const unbanParticipant = (participantId) => {
		return runMutation("unban", async () => {
			await manager.toggleParticipantBanned({
				communityId,
				participantId,
				unban: true
			});
			await syncParticipant(participantId);
		});
	};
	return {
		canChangePermissions,
		caption: "Community.RemovedUsersInfo",
		createSelector: (selectorOptions) => {
			const result = createSelectorForTab({
				...selectorOptions,
				peerType: ["custom"],
				channelParticipantsUpdatePeerId: communityId.toPeerId(true),
				channelParticipantsUpdateFilter: isRemovedParticipant,
				getMoreCustom: createCommunityParticipantsLoader({
					communityId,
					manager: participantsManager,
					filter: (q) => ({
						_: "channelParticipantsKicked",
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
		openAddParticipant: () => {
			showPickUserPopup({
				titleLangKey: "RemovedUsers",
				peerType: ["custom"],
				excludePeerIds: new Set(selector.participants.keys()),
				getMoreCustom: createCommunityParticipantCandidatesLoader({
					communityId,
					manager,
					limit: 50,
					kind: "ban"
				}),
				onSelect: (chosen) => banParticipant(chosen[0].peerId),
				placeholder: "SearchPlaceholder"
			});
		},
		attachSelectorBehavior: (currentSelector) => {
			createParticipantContextMenu({
				listenTo: currentSelector.scrollable.container,
				slider: tab.slider,
				chatId: communityId,
				participants: currentSelector.participants,
				middleware,
				bannedParticipantAdapter: {
					hasRights: () => manager.hasRights(communityId, "ban_users"),
					unban: unbanParticipant
				}
			});
		}
	};
}
//#endregion
//#region src/components/sidebarRight/tabs/removedUsers.tsx
var RemovedUsers = () => {
	const [tab] = useSuperTab();
	const promiseCollector = usePromiseCollector();
	const communityId = "communityId" in tab.payload ? tab.payload.communityId : void 0;
	const chatId = "chatId" in tab.payload ? tab.payload.chatId : void 0;
	if (communityId !== void 0) useCommunityTabGuard(tab, communityId);
	const middleware = createMiddleware().get(tab.middlewareHelper.get());
	const [source, setSource] = createSignal();
	const [selector, setSelector] = createSignal();
	const [captionElement, setCaptionElement] = createSignal();
	onCleanup(() => {
		tab.container.classList.remove("edit-peer-container", "removed-users-container");
		selector()?.container?.remove();
	});
	createEffect(() => {
		const currentSelector = selector();
		const element = captionElement();
		if (currentSelector && element) currentSelector.scrollable.container.insertBefore(element, currentSelector.heightContainer);
	});
	promiseCollector.collect((async () => {
		const removedUsersSource = communityId === void 0 ? await createChatRemovedUsersSource({
			tab,
			chatId,
			middleware
		}) : await createCommunityRemovedUsersSource({
			tab,
			communityId,
			middleware
		});
		if (!middleware()) return;
		tab.container.classList.add("edit-peer-container", "removed-users-container");
		const selectorResult = removedUsersSource.createSelector({
			appendTo: tab.content,
			managers: tab.managers,
			middleware,
			getSubtitleForElement: async (participantId) => {
				const participant = selector()?.participants.get(participantId);
				if (!isRemovedParticipant(participant)) return;
				return i18n("UserRemovedBy", [await wrapPeerTitle({ peerId: participant.kicked_by.toPeerId(false) })]);
			}
		});
		setSelector(selectorResult.selector);
		selectorResult.selector.scrollable.container.querySelector(".gradient-delimiter")?.remove();
		removedUsersSource.attachSelectorBehavior(selectorResult.selector);
		setSource(removedUsersSource);
		await selectorResult.loadPromise;
	})());
	return [createComponent(Portal, {
		get mount() {
			return tab.content;
		},
		get children() {
			return createComponent(Show, {
				get when() {
					return source()?.canChangePermissions;
				},
				get children() {
					return createComponent(Button.Corner, {
						"class": "is-visible",
						icon: "addmember_filled",
						get ["aria-label"]() {
							return i18n("RemovedUsers").textContent;
						},
						tabIndex: 0,
						onClick: () => source()?.openAddParticipant()
					});
				}
			});
		}
	}), createComponent(Show, {
		get when() {
			return source();
		},
		children: (source) => createComponent(Show, {
			get when() {
				return selector();
			},
			children: (selector) => createComponent(Portal, {
				get mount() {
					return selector().scrollable.container;
				},
				get children() {
					return createComponent(Section, {
						ref: setCaptionElement,
						noContent: true,
						get caption() {
							return source().caption;
						}
					});
				}
			})
		})
	})];
};
//#endregion
export { RemovedUsers as default };
