//# allFunctionsCalledOnLoad
import { W as copy, g as getPeerActiveUsernames } from "./objectUrlUtils-5x08MNuO.js";
import { t as apiManagerProxy } from "./apiManagerProxy-DmQXvxSF.js";
import "./rootScope-CZS0lmz8.js";
import { c as deepEqual } from "./encryptedStorageLayer-gN9TBXzg.js";
import { C as createSignal, M as onCleanup, g as createEffect, x as createRoot } from "./solid-9Vxm0VIz.js";
import { n as createStore } from "./store-PwRn5fa3.js";
import { n as attachClickEvent } from "./clickEvent-COk4YpLP.js";
import { t as throttle } from "./throttle-DxyCT6GJ.js";
import { t as confirmationPopup } from "./confirmationPopup-Bz6mK0o-.js";
import { Ht as CHAT_LEGACY_ADMIN_RIGHTS, in as isParticipantCreator, un as hasRights } from "./getChatMigratedTo-ChhMNXuu.js";
import { t as ButtonIcon } from "./buttonIcon-CthJWloV.js";
import { t as toggleDisability } from "./toggleDisability-2oUcKWqw.js";
import { t as CheckboxFields } from "./checkboxFields-CNHKTV_g.js";
//#region src/lib/appManagers/utils/chats/combineParticipantBannedRights.ts
function combineParticipantBannedRights(chat, rights) {
	if (chat.default_banned_rights) {
		rights = copy(rights);
		const defaultRights = chat.default_banned_rights.pFlags;
		for (const i in defaultRights) rights.pFlags[i] = defaultRights[i];
	}
	return rights;
}
//#endregion
//#region src/components/sidebarRight/tabs/groupPermissions/sharedPermissions.ts
var _ChatAdministratorRights;
var ChatPermissions = class extends CheckboxFields {
	constructor(options, managers) {
		super({
			listenerSetter: options.listenerSetter,
			fields: [],
			asRestrictions: true
		});
		this.options = options;
		this.managers = managers;
		this.construct();
	}
	async construct() {
		const options = this.options;
		const peerId = options.chatId.toPeerId(true);
		const chat = this.chat = apiManagerProxy.getChat(options.chatId);
		const isForum = apiManagerProxy.isForum(peerId);
		const defaultBannedRights = this.defaultBannedRights = chat.default_banned_rights;
		const rights = this.rights = options.participant ? combineParticipantBannedRights(chat, options.participant.banned_rights) : defaultBannedRights;
		this.untilDate = rights.until_date || 2147483647;
		const mediaNested = [
			{
				flags: ["send_photos"],
				text: "UserRestrictionsSendPhotos",
				exceptionText: "UserRestrictionsNoSendPhotos"
			},
			{
				flags: ["send_videos"],
				text: "UserRestrictionsSendVideos",
				exceptionText: "UserRestrictionsNoSendVideos"
			},
			{
				flags: ["send_stickers", "send_gifs"],
				text: "UserRestrictionsSendStickers",
				exceptionText: "UserRestrictionsNoSendStickers"
			},
			{
				flags: ["send_audios"],
				text: "UserRestrictionsSendMusic",
				exceptionText: "UserRestrictionsNoSendMusic"
			},
			{
				flags: ["send_docs"],
				text: "UserRestrictionsSendFiles",
				exceptionText: "UserRestrictionsNoSendDocs"
			},
			{
				flags: ["send_voices"],
				text: "UserRestrictionsSendVoices",
				exceptionText: "UserRestrictionsNoSendVoice"
			},
			{
				flags: ["send_roundvideos"],
				text: "UserRestrictionsSendRound",
				exceptionText: "UserRestrictionsNoSendRound"
			},
			{
				flags: ["embed_links"],
				text: "UserRestrictionsEmbedLinks",
				exceptionText: "UserRestrictionsNoEmbedLinks"
			},
			{
				flags: ["send_polls"],
				text: "UserRestrictionsSendPolls",
				exceptionText: "UserRestrictionsNoSendPolls"
			}
		];
		let v = [
			{
				flags: ["send_plain"],
				text: "UserRestrictionsSend",
				exceptionText: "UserRestrictionsNoSend"
			},
			{
				flags: ["send_media"],
				text: "UserRestrictionsSendMedia",
				exceptionText: "UserRestrictionsNoSendMedia",
				nested: mediaNested
			},
			{
				flags: ["invite_users"],
				text: "UserRestrictionsInviteUsers",
				exceptionText: "UserRestrictionsNoInviteUsers"
			},
			{
				flags: ["pin_messages"],
				text: "UserRestrictionsPinMessages",
				exceptionText: "UserRestrictionsNoPinMessages"
			},
			isForum && {
				flags: ["manage_topics"],
				text: "CreateTopicsPermission",
				exceptionText: "UserRestrictionsNoChangeInfo"
			},
			{
				flags: ["edit_rank"],
				text: options.forChat ? "UserRestrictionsEditRank" : "UserRestrictionsEditRankSingle",
				exceptionText: "UserRestrictionsNoEditRank"
			},
			{
				flags: ["change_info"],
				text: "UserRestrictionsChangeInfo",
				exceptionText: "UserRestrictionsNoChangeInfo"
			}
		];
		v = v.filter(Boolean);
		const map = {};
		v.push(...mediaNested);
		v.forEach((info) => {
			const mainFlag = info.flags[0];
			map[mainFlag] = info;
			info.checked = hasRights(chat, mainFlag, rights);
		});
		mediaNested.forEach((info) => info.nestedTo = map.send_media);
		map.send_media.toggleWith = {
			unchecked: mediaNested,
			checked: mediaNested
		};
		map.embed_links.toggleWith = { checked: [map.send_plain] };
		map.send_plain.toggleWith = { unchecked: [map.embed_links] };
		this.fields = v;
		for (const info of this.fields) if (!options.forChat && defaultBannedRights.pFlags[info.flags[0]]) info.restrictionText = "UserRestrictionsDisabled";
		else if (getPeerActiveUsernames(chat)[0] && (info.flags.includes("pin_messages") || info.flags.includes("change_info"))) info.restrictionText = options.participant ? "UserRestrictionsDisabled" : "EditCantEditPermissionsPublic";
		for (const info of this.fields) {
			if (info.nestedTo) continue;
			const { nodes } = this.createField(info);
			options.appendTo.append(...nodes);
		}
		this.fields.forEach((field) => {
			field.checkboxField.listenerSetter.add(field.checkboxField.input)("change", () => {
				this.options?.onSomethingChanged?.();
			});
		});
	}
	setUntilDate(untilDate) {
		this.untilDate = untilDate;
		this.options.onSomethingChanged?.();
	}
	takeOut() {
		const rights = {
			_: "chatBannedRights",
			until_date: this.untilDate,
			pFlags: {}
		};
		const IGNORE_FLAGS = /* @__PURE__ */ new Set(["send_media"]);
		for (const info of this.fields) {
			if (!!info.checkboxField.checked) continue;
			info.flags.forEach((flag) => {
				if (IGNORE_FLAGS.has(flag)) return;
				rights.pFlags[flag] = true;
			});
		}
		if (this.rights?.pFlags.manage_linked_peers) rights.pFlags.manage_linked_peers = true;
		return rights;
	}
};
var ChatAdministratorRights = class ChatAdministratorRights extends CheckboxFields {
	constructor(options) {
		super({
			listenerSetter: options.listenerSetter,
			fields: [],
			asRestrictions: true
		});
		this.options = options;
		this.construct();
	}
	construct() {
		const options = this.options;
		const chat = options.chat;
		const isBroadcast = !!chat?.pFlags.broadcast;
		const isForum = !!chat?.pFlags.forum;
		const rights = this.rights = options.rights ?? (options.participant ? options.participant.admin_rights : void 0);
		const manageMessagesNested = isBroadcast && [
			{
				flags: ["post_messages"],
				text: "EditAdminPostMessages"
			},
			{
				flags: ["edit_messages"],
				text: "EditAdminEditMessages"
			},
			{
				flags: ["delete_messages"],
				text: "EditAdminDeleteMessages"
			}
		];
		const manageStoriesNested = isBroadcast && [
			{
				flags: ["post_stories"],
				text: "AdminRights.PostStories"
			},
			{
				flags: ["edit_stories"],
				text: "AdminRights.EditStories"
			},
			{
				flags: ["delete_stories"],
				text: "AdminRights.DeleteStories"
			}
		];
		const isCreator = isParticipantCreator(options.participant);
		const manageMessagesNestedKey = "post_messages_nested";
		const manageStoriesNestedKey = "post_stories_nested";
		let v = options.fields?.map((field) => ({
			...field,
			flags: [...field.flags]
		})) || [
			{
				flags: ["change_info"],
				text: isBroadcast ? "EditAdminChangeChannelInfo" : "EditAdminChangeGroupInfo"
			},
			{
				flags: ["manage_welcome_messages"],
				text: options.isBot ? isBroadcast ? "AdminRights.SendWelcomeMessages" : "AdminRights.GroupSendWelcomeMessages" : "AdminRights.ManageWelcomeMessages"
			},
			isBroadcast && {
				flags: [manageMessagesNestedKey],
				text: "AdminRights.ManageMessages",
				nested: manageMessagesNested
			},
			isBroadcast && {
				flags: [manageStoriesNestedKey],
				text: "AdminRights.ManageStories",
				nested: manageStoriesNested
			},
			!isBroadcast && {
				flags: ["delete_messages"],
				text: isBroadcast ? "EditAdminDeleteMessages" : "EditAdminGroupDeleteMessages"
			},
			!isBroadcast && {
				flags: ["ban_users"],
				text: "EditAdminBanUsers"
			},
			!isBroadcast && {
				flags: ["invite_users"],
				text: "EditAdminAddUsersViaLink"
			},
			!isBroadcast && {
				flags: ["pin_messages"],
				text: "EditAdminPinMessages"
			},
			isForum && {
				flags: ["manage_topics"],
				text: "ManageTopicsPermission"
			},
			{
				flags: ["manage_call"],
				text: isBroadcast ? "StartVoipChatPermission" : "Channel.EditAdmin.ManageCalls"
			},
			!isBroadcast && {
				flags: ["manage_ranks"],
				text: "EditAdminManageRanks",
				checked: rights || chat._ !== "chat" ? void 0 : false
			},
			isBroadcast && {
				flags: ["invite_users"],
				text: "Channel.EditAdmin.PermissionInviteSubscribers"
			},
			isBroadcast && {
				flags: ["manage_direct_messages"],
				text: "Channel.EditAdmin.ManageDirectMessages"
			},
			!isBroadcast && {
				flags: ["anonymous"],
				text: "EditAdminSendAnonymously",
				checked: rights ? void 0 : false
			},
			{
				flags: ["add_admins"],
				text: "EditAdminAddAdmins",
				checked: rights ? void 0 : isCreator
			}
		];
		const map = {};
		v = v.filter(Boolean);
		if (manageMessagesNested) v.push(...manageMessagesNested);
		if (manageStoriesNested) v.push(...manageStoriesNested);
		v.forEach((info) => {
			const mainFlag = info.flags[0];
			map[mainFlag] = info;
			info.checked ?? (info.checked = options.canGrant ? !!rights?.pFlags[mainFlag] : hasRights(chat, mainFlag, rights));
		});
		if (manageMessagesNested) {
			manageMessagesNested.forEach((info) => info.nestedTo = map[manageMessagesNestedKey]);
			map[manageMessagesNestedKey].toggleWith = {
				unchecked: manageMessagesNested,
				checked: manageMessagesNested
			};
		}
		if (manageStoriesNested) {
			manageStoriesNested.forEach((info) => info.nestedTo = map[manageStoriesNestedKey]);
			map[manageStoriesNestedKey].toggleWith = {
				unchecked: manageStoriesNested,
				checked: manageStoriesNested
			};
		}
		this.fields = v;
		const CREATOR_EXCEPTIONS = /* @__PURE__ */ new Set(["anonymous"]);
		for (const info of this.fields) {
			const mainFlag = info.flags[0];
			if (!options.canEdit) info.restrictionText = "EditAdminCantEdit";
			else if (options.canGrant ? !options.canGrant(mainFlag) : isCreator && !CREATOR_EXCEPTIONS.has(mainFlag) || !hasRights(chat, mainFlag)) info.restrictionText = "EditCantEditPermissions";
		}
		for (const info of this.fields) {
			if (info.nestedTo) continue;
			const { nodes } = this.createField(info);
			options.appendTo.append(...nodes);
		}
		this.fields.forEach((field) => {
			field.checkboxField.listenerSetter.add(field.checkboxField.input)("change", () => {
				this.options?.onSomethingChanged?.();
			});
		});
	}
	takeOut() {
		let rights = {
			_: "chatAdminRights",
			pFlags: this.options.preserveUnhandledRights ? { ...this.rights?.pFlags } : {}
		};
		for (const info of this.fields) {
			info.flags.forEach((flag) => {
				delete rights.pFlags[flag];
			});
			if (!info.checkboxField.checked) continue;
			info.flags.forEach((flag) => {
				rights.pFlags[flag] = true;
			});
		}
		if (this.rights?.pFlags.manage_linked_peers && !this.fields.some((field) => {
			return field.flags.includes("manage_linked_peers");
		})) rights.pFlags.manage_linked_peers = true;
		if (this.options.chat?._ === "chat" && deepEqual(rights, ChatAdministratorRights.CHAT_LEGACY_ADMIN_RIGHTS)) rights = CHAT_LEGACY_ADMIN_RIGHTS;
		rights.pFlags.other = true;
		return rights;
	}
};
_ChatAdministratorRights = ChatAdministratorRights;
_ChatAdministratorRights.CHAT_LEGACY_ADMIN_RIGHTS = {
	_: "chatAdminRights",
	pFlags: {
		change_info: true,
		delete_messages: true,
		ban_users: true,
		invite_users: true,
		pin_messages: true,
		manage_call: true
	}
};
var createSolidTabState = ({ tab, save, alwaysShowSave, unsavedConfirmationProps = {} }) => createRoot((dispose) => {
	tab.middlewareHelper.get().onDestroy(dispose);
	const initialState = {};
	const [store, set] = createStore({});
	const [saveIcon, setSaveIcon] = createSignal(ButtonIcon("check primary appear-zoom", { ariaLabel: "Save" }));
	const [saving, setSaving] = createSignal(false);
	const [valid, setValid] = createSignal(true);
	const [hasChanges, setHasChanges] = createSignal(false);
	const throttledSetHasChanges = throttle(setHasChanges, 200, true);
	createEffect(() => {
		throttledSetHasChanges(!deepEqual(store, initialState));
	});
	createEffect(() => {
		if (!saveIcon()) return;
		saveIcon().classList.toggle("appear-zoom--active", hasChanges() || !!alwaysShowSave);
	});
	createEffect(() => {
		toggleDisability(saveIcon(), !valid() || saving());
	});
	const initiateSaving = async () => {
		setSaving(true);
		try {
			await save();
			dispose();
			tab.close();
		} catch (err) {
			setSaving(false);
			throw err;
		}
	};
	const detach = attachClickEvent(saveIcon(), initiateSaving);
	onCleanup(detach);
	tab.isConfirmationNeededOnClose = async () => {
		if (!hasChanges() || saving()) return;
		const saveButton = unsavedConfirmationProps.button || { langKey: "Save" };
		try {
			await confirmationPopup({
				button: saveButton,
				buttons: [saveButton, {
					isCancel: true,
					langKey: "Discard"
				}],
				titleLangKey: "UnsavedChanges",
				descriptionLangKey: "UnsavedChangesDescription",
				...unsavedConfirmationProps,
				rejectWithReason: true
			});
			await initiateSaving();
		} catch (_reason) {
			if (_reason !== "canceled") throw new Error();
		}
	};
	onCleanup(() => {
		tab.isConfirmationNeededOnClose = void 0;
	});
	return {
		setInitial: (state) => {
			Object.assign(initialState, state);
			set(state);
		},
		store,
		set,
		saveIcon,
		saving,
		valid,
		setValid,
		hasChanges,
		dispose,
		save: initiateSaving
	};
});
//#endregion
export { ChatPermissions as n, createSolidTabState as r, ChatAdministratorRights as t };
