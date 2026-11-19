//# allFunctionsCalledOnLoad
import { t as apiManagerProxy } from "./apiManagerProxy-DmQXvxSF.js";
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { a as i18n, s as join } from "./langPack-BmdJGr44.js";
import { n as bindManagersToSession } from "./bindManagersToAccount-BL82O9H9.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { n as attachClickEvent } from "./clickEvent-COk4YpLP.js";
import { t as Button } from "./button-DpTvniRN.js";
import { dt as wrapPeerTitle, r as showPeerPopup, t as confirmationPopup } from "./confirmationPopup-Bz6mK0o-.js";
import { un as hasRights } from "./getChatMigratedTo-ChhMNXuu.js";
import { r as toastNew } from "./toast-B6VD5M7R.js";
import { a as showPickUserPopup } from "./pickUser-D8S6yVuK.js";
import { t as DelimiterWithText } from "./giveaway-nNKsrrB6.js";
import { a as getBotAdminRightsForChat, t as openBotAdminEditor } from "./addBotToChat-DlkmZrNl.js";
//#region src/components/addChatUsers.ts
async function handleMissingInvitees(chatId, missingInvitees) {
	if (!missingInvitees.length) return;
	const inviteLink = await rootScope.managers.appProfileManager.getChatInviteLink(chatId);
	const premiumRequireIds = /* @__PURE__ */ new Set();
	const canInviteAsPremiumIds = /* @__PURE__ */ new Set();
	const missingInviteeIds = missingInvitees.map((invitee) => {
		const peerId = invitee.user_id.toPeerId(false);
		if (invitee.pFlags.premium_required_for_pm) premiumRequireIds.add(peerId);
		if (invitee.pFlags.premium_would_allow_invite) canInviteAsPremiumIds.add(peerId);
		return peerId;
	});
	const hasPremiumSection = canInviteAsPremiumIds.size > 0;
	const getTitle = (peerId) => wrapPeerTitle({
		peerId,
		onlyFirstName: true
	});
	const length = missingInviteeIds.length;
	const title = length > 1 ? void 0 : await getTitle(hasPremiumSection ? [...canInviteAsPremiumIds][0] : missingInviteeIds[0]);
	const cantSendMessages = premiumRequireIds.size === missingInviteeIds.length;
	const onPremiumClick = () => {
		hotReloadGuard.showPremiumPopup();
		popup.hide();
	};
	let footerButton;
	const onCountUpdate = (count) => {
		footerButton.replaceChildren(i18n(cantSendMessages ? "InviteViaLink.Premium.Subscribe" : count ? "InviteViaLink.Send" : "InviteViaLink.Skip"));
	};
	const initial = missingInviteeIds.filter((peerId) => !premiumRequireIds.has(peerId));
	const popup = showPickUserPopup({
		peerType: ["custom"],
		getMoreCustom: async () => ({
			result: missingInviteeIds,
			isEnd: true
		}),
		onSelect: async (chosen) => {
			const peerIds = chosen.map((c) => c.peerId);
			if (cantSendMessages) {
				onPremiumClick();
				return;
			}
			const length = peerIds.length;
			if (!length) return;
			peerIds.forEach((peerId) => {
				rootScope.managers.appMessagesManager.sendText({
					peerId,
					text: inviteLink
				});
			});
			toastNew({
				langPackKey: "InviteViaLink.LinkShared",
				langPackArguments: [length, length > 1 ? void 0 : await getTitle(peerIds[0])]
			});
		},
		onChange: onCountUpdate,
		multiSelect: true,
		titleLangKey: hasPremiumSection ? "InviteViaLink.Premium" : "InviteViaLink.Title",
		initial,
		headerSearch: false,
		noSearch: true,
		footerButtonProps: { ref: (element) => footerButton = element },
		chatRightsActions: ["send_messages"],
		autoHeight: cantSendMessages
	});
	onCountUpdate(initial.length);
	if (hasPremiumSection) {
		const container = document.createElement("div");
		container.classList.add("popup-add-members-premium-container");
		const subtitle = i18n("InviteViaLink.Premium.Subtitle", [length, title || length]);
		subtitle.classList.add("popup-add-members-premium-subtitle");
		container.append(subtitle);
		if (!cantSendMessages) {
			const header = i18n("InviteViaLink.Title");
			header.classList.add("popup-add-members-premium-header");
			const subtitle2 = i18n("InviteViaLink.Premium.Subtitle2");
			subtitle2.classList.add("popup-add-members-premium-subtitle");
			const premiumButton = Button(`btn-primary popup-gift-premium-confirm action-button shimmer`, { text: "InviteViaLink.Premium.Subscribe" });
			attachClickEvent(premiumButton, onPremiumClick);
			container.append(premiumButton, DelimiterWithText({ langKey: "PremiumOr" }), header, subtitle2);
		} else {
			popup.selector.list.remove();
			footerButton.classList.add("popup-gift-premium-confirm", "action-button", "shimmer");
		}
		popup.selector.section.content.prepend(container);
	} else {
		const subtitle = i18n("InviteViaLink.Subtitle", [length, title || length]);
		subtitle.classList.add("popup-add-members-subtitle");
		popup.selector.section.content.prepend(subtitle);
	}
}
/** what to tell of a refusal to add members: the reason where it is known, as tdesktop and Android do */
function getAddMembersErrorLangKey(err, isBroadcast) {
	switch (err?.type) {
		case "USER_PRIVACY_RESTRICTED": return isBroadcast ? "InviteToChannelError" : "InviteToGroupError";
		case "USER_BOT": return "CantAddBotAsAdmin";
		case "BOTS_TOO_MUCH": return isBroadcast ? "ChannelUserCantBot" : "GroupUserCantBot";
		case "YOU_BLOCKED_USER": return "YouBlockedUser";
		case "USER_KICKED": return "AddUserErrorBlacklisted";
		default: return "Error.AnError";
	}
}
async function addChatUsers({ peerId, slider, skippable = false }) {
	const managers = bindManagersToSession(rootScope.managers);
	const id = peerId.toChatId();
	const isChannel = await managers.appChatsManager.isChannel(id);
	const isBroadcast = await managers.appChatsManager.isBroadcast(id);
	const showConfirmation = async (peerIds, callback) => {
		let titleLangKey, titleLangArgs, descriptionLangKey, descriptionLangArgs, checkboxes;
		if (peerIds.length > 1) {
			const titles = await Promise.all(peerIds.map(async (peerId) => {
				const b = document.createElement("b");
				b.append(await wrapPeerTitle({ peerId }));
				return b;
			}));
			titleLangKey = "AddMembersAlertTitle";
			titleLangArgs = [i18n(isBroadcast ? "Subscribers" : "Members", [peerIds.length])];
			descriptionLangKey = "AddMembersAlertCountText";
			descriptionLangArgs = [join(titles)];
			if (!isChannel) checkboxes = [{
				text: "AddMembersForwardMessages",
				checked: true
			}];
		} else {
			titleLangKey = "AddOneMemberAlertTitle";
			descriptionLangKey = "AddMembersAlertNamesText";
			const b = document.createElement("b");
			b.append(await wrapPeerTitle({ peerId: peerIds[0] }));
			descriptionLangArgs = [b];
			if (!isChannel) checkboxes = [{
				text: peerIds.length > 1 ? "AddMembersForwardMessages" : "AddOneMemberForwardMessages",
				textArgs: peerIds.length > 1 ? void 0 : [await wrapPeerTitle({ peerId: peerIds[0] })],
				checked: true
			}];
		}
		descriptionLangArgs.push(await wrapPeerTitle({ peerId }));
		showPeerPopup("popup-add-members", {
			peerId,
			titleLangKey,
			titleLangArgs,
			descriptionLangKey,
			descriptionLangArgs,
			buttons: [{
				langKey: "Add",
				callback
			}],
			checkboxes
		});
	};
	const onError = (err) => {
		if (err?.type === "MIDDLEWARE") return;
		toastNew({ langPackKey: getAddMembersErrorLangKey(err, isBroadcast) });
	};
	const offerBotsAsAdmins = async (peerIds) => {
		const chat = apiManagerProxy.getChat(id);
		if (peerIds.length !== 1 || !hasRights(chat, "add_admins")) {
			toastNew({ langPackKey: "CantAddBotAsAdmin" });
			return;
		}
		try {
			await confirmationPopup({
				descriptionLangKey: "CantAddBotAsAdmin",
				button: { langKey: "SetAsAdmin" }
			});
		} catch {
			return;
		}
		const botId = peerIds[0].toUserId();
		const userFull = await managers.appProfileManager.getProfile(botId);
		await openBotAdminEditor({
			managers,
			chat,
			botId,
			rights: getBotAdminRightsForChat({
				chat,
				userFull,
				scope: "channelAdmin"
			})
		});
	};
	const tab = slider.createTab(hotReloadGuard.tabs.AppAddMembersTab);
	tab.open({
		type: "channel",
		skippable,
		takeOut: (peerIds) => {
			if (isBroadcast && peerIds.some((peerId) => apiManagerProxy.getUser(peerId.toUserId())?.pFlags?.bot)) {
				tab.payload.attachToPromise(offerBotsAsAdmins(peerIds).catch(onError).then(() => false));
				return false;
			}
			showConfirmation(peerIds, (e, checked) => {
				const promise = isChannel ? rootScope.managers.appChatsManager.inviteToChannel(id, peerIds) : rootScope.managers.appChatsManager.addChatUser(id, peerIds, checked.size ? void 0 : 0);
				promise.then((missingInvitees) => handleMissingInvitees(id, missingInvitees), onError);
				tab.payload.attachToPromise(promise);
			});
			return false;
		},
		title: isBroadcast ? "ChannelAddSubscribers" : "GroupAddMembers",
		placeholder: "SendMessageTo"
	});
}
//#endregion
export { handleMissingInvitees as n, addChatUsers as t };
