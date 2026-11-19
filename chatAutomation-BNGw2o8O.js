//# allFunctionsCalledOnLoad
import "./themeController-2cytOOn0.js";
import { g as getPeerActiveUsernames } from "./objectUrlUtils-5x08MNuO.js";
import { c as deepEqual } from "./encryptedStorageLayer-gN9TBXzg.js";
import { a as i18n, s as join, u as langPack_default } from "./langPack-BmdJGr44.js";
import { C as createSignal, M as onCleanup, _ as createMemo, g as createEffect, i as For, j as on, p as createComponent, s as Show, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { t as cancelEvent } from "./cancelEvent-Cw8vYZHp.js";
import { n as createStore } from "./store-PwRn5fa3.js";
import { c as insert, g as template, n as Portal, o as className, u as memo } from "./web-BPyQozky.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { t as IconTsx } from "./iconTsx-B4lOk4A6.js";
import { t as Button } from "./buttonTsx-Bwphkm9r.js";
import { n as attachClickEvent } from "./clickEvent-COk4YpLP.js";
import { t as Button$1 } from "./button-DpTvniRN.js";
import { t as InputFieldTsx } from "./inputFieldTsx-0SbEFdGE.js";
import { ft as PeerTitle, i as Row, t as confirmationPopup } from "./confirmationPopup-Bz6mK0o-.js";
import { x as isSameUserId } from "./getChatMigratedTo-ChhMNXuu.js";
import { t as MediaHeader } from "./mediaHeader-CnpQNwOl.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { r as toastNew } from "./toast-B6VD5M7R.js";
import { t as getTextWidth } from "./getTextWidth-DuqOrM4A.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { t as CheckboxFields } from "./checkboxFields-CNHKTV_g.js";
import { t as RadioFieldTsx } from "./radioFieldTsx-kmtuN4Dv.js";
import { n as SaveButton, t as useIsConfirmationNeededOnClose } from "./useIsConfirmationNeededOnClose-D8OTEl9F.js";
import { n as SearchLoading, t as SearchEmpty } from "./searchStatus-DMXeLaKl.js";
import { n as normalizeBusinessBotUsername } from "./appBusinessManager-DSu7OvZE.js";
var chatAutomation_module_default = {
	heroHeader: "_heroHeader_ubpua_1",
	recipientRow: "_recipientRow_ubpua_5",
	recipientTitle: "_recipientTitle_ubpua_9",
	recipientSummary: "_recipientSummary_ubpua_14",
	recipientSummaryText: "_recipientSummaryText_ubpua_23",
	recipientSummaryIcon: "_recipientSummaryIcon_ubpua_30"
};
//#endregion
//#region src/components/sidebarLeft/tabs/chatAutomationRecipients.ts
var INCLUDED_CATEGORY_KEYS = [
	"newChats",
	"contacts",
	"nonContacts"
];
var EXCLUDED_CATEGORY_KEYS = [
	"existingChats",
	"contacts",
	"nonContacts"
];
function getChatAutomationRecipientSectionKinds(excludeSelected) {
	return excludeSelected ? ["excluded"] : ["included", "excluded"];
}
function getChatAutomationRecipientCategoryKeys(editIncluded, excludeUsersOnly = false) {
	if (excludeUsersOnly) return [];
	return editIncluded ? INCLUDED_CATEGORY_KEYS : EXCLUDED_CATEGORY_KEYS;
}
var emptyCategories = () => ({
	existingChats: false,
	newChats: false,
	contacts: false,
	nonContacts: false
});
function makeChatAutomationRecipientsDraft(recipients) {
	const excludeSelected = recipients ? !!recipients.pFlags.exclude_selected : true;
	const categories = {
		existingChats: !!recipients?.pFlags.existing_chats,
		newChats: !!recipients?.pFlags.new_chats,
		contacts: !!recipients?.pFlags.contacts,
		nonContacts: !!recipients?.pFlags.non_contacts
	};
	const excludedUserIds = [...recipients?.exclude_users || []];
	return {
		excludeSelected,
		categories,
		userIds: excludeChatAutomationUserIds([...recipients?.users || []], excludedUserIds),
		excludedUserIds
	};
}
function changeChatAutomationRecipientMode(draft, excludeSelected) {
	if (draft.excludeSelected === excludeSelected) return draft;
	return {
		excludeSelected,
		categories: emptyCategories(),
		userIds: [],
		excludedUserIds: [...draft.excludedUserIds]
	};
}
function excludeChatAutomationUserIds(includedUserIds, excludedUserIds) {
	const excluded = new Set(excludedUserIds.map(String));
	return includedUserIds.filter((userId) => !excluded.has(String(userId)));
}
function normalizeChatAutomationUserIds(userIds) {
	const unique = /* @__PURE__ */ new Map();
	userIds.forEach((userId) => unique.set(String(userId), userId));
	return [...unique.values()].sort((a, b) => {
		const aString = String(a);
		const bString = String(b);
		return aString < bString ? -1 : aString > bString ? 1 : 0;
	});
}
function toBusinessBotRecipients(draft) {
	const excludedUserIds = normalizeChatAutomationUserIds(draft.excludedUserIds);
	const userIds = normalizeChatAutomationUserIds(excludeChatAutomationUserIds(draft.userIds, excludedUserIds));
	return {
		_: "businessBotRecipients",
		pFlags: {
			existing_chats: draft.categories.existingChats || void 0,
			new_chats: draft.categories.newChats || void 0,
			contacts: draft.categories.contacts || void 0,
			non_contacts: draft.categories.nonContacts || void 0,
			exclude_selected: draft.excludeSelected || void 0
		},
		users: userIds.length ? [...userIds] : void 0,
		exclude_users: excludedUserIds.length ? excludedUserIds : void 0
	};
}
//#endregion
//#region src/components/sidebarLeft/tabs/chatAutomation.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div class=chatlist-container>`);
var _tmpl$2 = /*#__PURE__*/ template(`<div class=input-wrapper>`);
var _tmpl$3 = /*#__PURE__*/ template(`<span>`);
var RIGHT_KEYS = [
	"reply",
	"read_messages",
	"delete_sent_messages",
	"delete_received_messages",
	"edit_name",
	"edit_bio",
	"edit_profile_photo",
	"edit_username",
	"view_gifts",
	"sell_gifts",
	"change_gift_settings",
	"transfer_and_upgrade_gifts",
	"transfer_stars",
	"manage_stories"
];
var DEFAULT_RIGHTS = /* @__PURE__ */ new Set([
	"reply",
	"read_messages",
	"delete_sent_messages",
	"delete_received_messages"
]);
var RIGHT_GROUPS = [
	{
		id: "messages",
		title: "ChatAutomation.ManageMessages",
		fixedRights: ["ChatAutomation.ReadMessages"],
		rights: [
			{
				key: "reply",
				title: "ChatAutomation.Reply"
			},
			{
				key: "read_messages",
				title: "ChatAutomation.MarkRead"
			},
			{
				key: "delete_sent_messages",
				title: "ChatAutomation.DeleteSent"
			},
			{
				key: "delete_received_messages",
				title: "ChatAutomation.DeleteReceived"
			}
		]
	},
	{
		id: "profile",
		title: "ChatAutomation.ManageProfile",
		warning: "ChatAutomation.UsernameWarning",
		rights: [
			{
				key: "edit_name",
				title: "ChatAutomation.EditName"
			},
			{
				key: "edit_bio",
				title: "ChatAutomation.EditBio"
			},
			{
				key: "edit_profile_photo",
				title: "ChatAutomation.EditPhoto"
			},
			{
				key: "edit_username",
				title: "ChatAutomation.EditUsername"
			}
		]
	},
	{
		id: "gifts",
		title: "ChatAutomation.ManageGifts",
		warning: "ChatAutomation.GiftsAndStarsWarning",
		rights: [
			{
				key: "view_gifts",
				title: "ChatAutomation.ViewGifts"
			},
			{
				key: "sell_gifts",
				title: "ChatAutomation.SellGifts"
			},
			{
				key: "change_gift_settings",
				title: "ChatAutomation.ChangeGiftSettings"
			},
			{
				key: "transfer_and_upgrade_gifts",
				title: "ChatAutomation.TransferGifts"
			},
			{
				key: "transfer_stars",
				title: "ChatAutomation.TransferStars"
			}
		]
	},
	{
		id: "stories",
		title: "ChatAutomation.ManageStories",
		standalone: true,
		rights: [{
			key: "manage_stories",
			title: "ChatAutomation.ManageStories"
		}]
	}
];
var RECIPIENT_CATEGORIES = [
	{
		key: "existingChats",
		icon: "recent",
		text: "ChatAutomation.ExistingChats"
	},
	{
		key: "newChats",
		icon: "adduser",
		text: "ChatAutomation.NewChats"
	},
	{
		key: "contacts",
		icon: "user",
		text: "ChatAutomation.Contacts"
	},
	{
		key: "nonContacts",
		icon: "noncontacts",
		text: "ChatAutomation.NonContacts"
	}
];
function getWarningKey(key) {
	if (key === "edit_username") return "ChatAutomation.UsernameWarning";
	if (key === "transfer_stars") return "ChatAutomation.StarsWarning";
	if (key === "transfer_and_upgrade_gifts") return "ChatAutomation.GiftsWarning";
}
function makeRights(connectedBot) {
	return Object.fromEntries(RIGHT_KEYS.map((key) => [key, connectedBot ? !!connectedBot.rights?.pFlags?.[key] : DEFAULT_RIGHTS.has(key)]));
}
function makeInitialState(connectedBot) {
	return {
		...makeChatAutomationRecipientsDraft(connectedBot?.recipients),
		botId: connectedBot?.bot_id,
		rights: makeRights(connectedBot)
	};
}
function BotDialog(props) {
	const [tab] = useSuperTab();
	const onAdd = props.onAdd;
	const peerId = props.userId.toPeerId(false);
	const dialogElement = hotReloadGuard.appDialogsManager.addDialogNew({
		peerId,
		rippleEnabled: true,
		avatarSize: "abitbigger",
		meAsSaved: false,
		autonomous: true,
		dontSetActive: true,
		wrapOptions: { middleware: tab.middlewareHelper.get() }
	});
	const removeDialogClickListener = attachClickEvent(dialogElement.container, () => {
		hotReloadGuard.appImManager.setInnerPeer({ peerId });
	});
	let active = true;
	const removeAddClickListener = onAdd && (() => {
		const button = Button$1("btn-primary btn-color-primary btn-control-small", { text: "Add" });
		button.style.insetInlineEnd = "1rem";
		button.style.pointerEvents = "all";
		button.style.position = "absolute";
		button.style.top = "50%";
		button.style.transform = "translateY(-50%)";
		dialogElement.container.append(button);
		const buttonTextWidth = getTextWidth(button.textContent, `500 15px Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif`);
		dialogElement.container.style.paddingInlineEnd = `${Math.ceil(buttonTextWidth + 24 + 16 + 8)}px`;
		const onClick = (event) => {
			cancelEvent(event);
			onAdd();
		};
		return attachClickEvent(button, onClick);
	})();
	tab.managers.appUsersManager.getUser(props.userId).then((user) => {
		if (!active || user?._ !== "user") return;
		const username = getPeerActiveUsernames(user)[0];
		dialogElement.dom.lastMessageSpan.replaceChildren(username ? `@${username}` : "");
	});
	onCleanup(() => {
		active = false;
		removeDialogClickListener();
		removeAddClickListener?.();
		dialogElement.remove();
	});
	return dialogElement.container;
}
function BotDialogList(props) {
	const list = hotReloadGuard.appDialogsManager.createChatList({ ignoreClick: true });
	return (() => {
		var _el$ = _tmpl$();
		insert(_el$, list, null);
		insert(_el$, createComponent(Portal, {
			mount: list,
			get children() {
				return createComponent(For, {
					get each() {
						return props.userIds;
					},
					children: (userId) => createComponent(BotDialog, {
						userId,
						get onAdd() {
							return props.onAdd && (() => props.onAdd(userId));
						}
					})
				});
			}
		}), null);
		return _el$;
	})();
}
function BotPermissions(props) {
	const [tab] = useSuperTab();
	const fields = [];
	const rootFields = [];
	const rightFields = /* @__PURE__ */ new Map();
	RIGHT_GROUPS.forEach((group) => {
		if (group.standalone) {
			const { key, title } = group.rights[0];
			const field = {
				text: title,
				checked: props.rights[key],
				group,
				rightKey: key
			};
			rootFields.push(field);
			fields.push(field);
			rightFields.set(key, field);
			return;
		}
		const nested = [...(group.fixedRights || []).map((text) => ({
			text,
			checked: true,
			fixed: true,
			group
		})), ...group.rights.map(({ key, title }) => {
			const field = {
				text: title,
				checked: props.rights[key],
				group,
				rightKey: key
			};
			rightFields.set(key, field);
			return field;
		})];
		const mutableNested = nested.filter(({ rightKey }) => !!rightKey);
		const field = {
			text: group.title,
			group,
			nested,
			toggleWith: {
				checked: mutableNested,
				unchecked: mutableNested
			}
		};
		rootFields.push(field);
		fields.push(field, ...nested);
	});
	let nodes = [];
	let confirmationPending = false;
	let changeScheduled = false;
	let disposed = false;
	onCleanup(() => disposed = true);
	const readRights = () => {
		const rights = {};
		RIGHT_KEYS.forEach((key) => rights[key] = rightFields.get(key).checkboxField.checked);
		return rights;
	};
	const syncRights = (rights) => {
		RIGHT_KEYS.forEach((key) => {
			rightFields.get(key).checkboxField.setValueSilently(rights[key]);
		});
		fields.forEach((field) => {
			if (field.fixed) field.checkboxField.setValueSilently(true);
		});
		rootFields.forEach((field) => {
			if (!field.nested) return;
			const count = field.nested.filter(({ checkboxField }) => checkboxField.checked).length;
			field.checkboxField.setValueSilently(count === field.nested.length);
			checkboxFields.setNestedCounter(field, count);
		});
	};
	const setInert = (inert) => {
		nodes.forEach((node) => node.toggleAttribute("inert", inert));
	};
	const flushRightsChange = () => {
		changeScheduled = false;
		if (disposed) return;
		if (confirmationPending) {
			syncRights(props.rights);
			return;
		}
		const previousRights = { ...props.rights };
		fields.forEach((field) => {
			if (field.fixed) field.checkboxField.setValueSilently(true);
		});
		const nextRights = readRights();
		syncRights(nextRights);
		const enabledFields = [...rightFields.values()].filter(({ rightKey }) => !previousRights[rightKey] && nextRights[rightKey]);
		const enabledGroups = new Set(enabledFields.map(({ group }) => group));
		const warningKey = enabledFields.length > 1 && enabledGroups.size === 1 ? enabledFields[0].group.warning : enabledFields.map(({ rightKey }) => getWarningKey(rightKey)).find(Boolean);
		if (!warningKey) {
			props.onRightsChange(nextRights);
			return;
		}
		confirmationPending = true;
		setInert(true);
		props.confirmPermissionWarning(warningKey).then((confirmed) => {
			if (disposed) return;
			if (confirmed) props.onRightsChange(nextRights);
			else syncRights(previousRights);
		}).finally(() => {
			if (disposed) return;
			confirmationPending = false;
			setInert(false);
		});
	};
	const checkboxFields = new CheckboxFields({
		fields,
		listenerSetter: tab.listenerSetter,
		onRowCreation: (row, info) => {
			row.title?.classList.add("pre-wrap");
			if (!info.fixed) return;
			info.checkboxField.input.disabled = true;
			row.toggleDisability(true);
		},
		onAnyChange: () => {
			if (changeScheduled) return;
			changeScheduled = true;
			queueMicrotask(flushRightsChange);
		}
	});
	nodes = rootFields.flatMap((field) => checkboxFields.createField(field)?.nodes || []);
	return nodes;
}
function ChatAutomationTab() {
	const [tab] = useSuperTab();
	const originalConnectedBot = tab.payload.connectedBot;
	const initialState = makeInitialState(originalConnectedBot);
	const [persistedState, setPersistedState] = createSignal(initialState);
	const [store, setStore] = createStore(makeInitialState(originalConnectedBot));
	const [query, setQuery] = createSignal("");
	const [searching, setSearching] = createSignal(false);
	const [searchFinished, setSearchFinished] = createSignal(false);
	const [searchResults, setSearchResults] = createSignal([]);
	const [unsupportedUserId, setUnsupportedUserId] = createSignal();
	const [searchFailed, setSearchFailed] = createSignal(false);
	const [editingBotQuery, setEditingBotQuery] = createSignal(false);
	const [saving, setSaving] = createSignal(false);
	let searchTimer;
	let searchRequestId = 0;
	let cleanedUp = false;
	const primaryRecipientsCount = createMemo(() => {
		return store.userIds.length + Object.values(store.categories).filter(Boolean).length;
	});
	createEffect(on([query, editingBotQuery], ([value, editing]) => {
		++searchRequestId;
		window.clearTimeout(searchTimer);
		setSearchResults([]);
		setUnsupportedUserId(void 0);
		setSearchFailed(false);
		setSearchFinished(false);
		if (!editing || !value.trim()) {
			setSearching(false);
			return;
		}
		const requestId = searchRequestId;
		setSearching(true);
		searchTimer = window.setTimeout(async () => {
			try {
				const result = await tab.managers.appBusinessManager.searchBusinessBots(value);
				if (requestId !== searchRequestId) return;
				setSearchResults(result.userIds);
				setUnsupportedUserId(result.unsupportedUserId);
			} catch (err) {
				if (requestId !== searchRequestId) return;
				setSearchFailed(true);
			} finally {
				if (requestId === searchRequestId) {
					setSearching(false);
					setSearchFinished(true);
				}
			}
		}, 400);
	}, { defer: true }));
	onCleanup(() => {
		cleanedUp = true;
		++searchRequestId;
		window.clearTimeout(searchTimer);
	});
	if (initialState.botId) tab.managers.appUsersManager.getUser(initialState.botId).then((user) => {
		if (!cleanedUp && isSameUserId(store.botId, initialState.botId) && !query() && user?._ === "user") setQuery(user.username || "");
	});
	const selectBot = (userId) => {
		const normalizedQuery = normalizeBusinessBotUsername(query());
		if (normalizedQuery) setQuery(normalizedQuery);
		if (!isSameUserId(store.botId, userId)) {
			const persisted = persistedState();
			setStore("rights", isSameUserId(persisted.botId, userId) ? { ...persisted.rights } : makeRights());
		}
		setStore("botId", userId);
		setEditingBotQuery(false);
		setSearchResults([]);
		setSearchFinished(false);
		tab.managers.appUsersManager.getUser(userId).then((user) => {
			if (isSameUserId(store.botId, userId) && !editingBotQuery() && user?._ === "user" && user.username) setQuery(user.username);
		});
	};
	const updateBotQuery = (value) => {
		if (value === query()) return;
		setEditingBotQuery(true);
		setQuery(value);
	};
	const removeBot = () => {
		setStore("botId", void 0);
		setEditingBotQuery(false);
		setQuery("");
		setSearchResults([]);
		setSearchFinished(false);
	};
	const openRecipientsPicker = (excludeUsersOnly = false) => {
		const editIncluded = !store.excludeSelected;
		const selectedUserIds = excludeUsersOnly ? store.excludedUserIds : store.userIds;
		const selectedExtras = /* @__PURE__ */ new Set();
		const categoryKeys = getChatAutomationRecipientCategoryKeys(editIncluded, excludeUsersOnly);
		if (!excludeUsersOnly) categoryKeys.forEach((key) => store.categories[key] && selectedExtras.add(key));
		tab.slider.createTab(hotReloadGuard.tabs.AppAddMembersTab).open({
			title: excludeUsersOnly ? "ChatAutomation.ExcludedChats" : store.excludeSelected ? "ChatAutomation.ExcludeChats" : "ChatAutomation.SelectChats",
			placeholder: "SearchPlaceholder",
			type: "privacy",
			takeOut: (peerIds, extras) => {
				const userIds = peerIds.map((peerId) => peerId.toUserId());
				if (excludeUsersOnly) {
					setStore("userIds", (primaryUserIds) => excludeChatAutomationUserIds(primaryUserIds, userIds));
					setStore("excludedUserIds", userIds);
					return;
				}
				const categoryValue = {
					existingChats: extras.has("existingChats"),
					newChats: extras.has("newChats"),
					contacts: extras.has("contacts"),
					nonContacts: extras.has("nonContacts")
				};
				setStore("userIds", userIds);
				setStore("categories", categoryValue);
				setStore("excludedUserIds", (excludedUserIds) => excludeChatAutomationUserIds(excludedUserIds, userIds));
			},
			skippable: true,
			selectedPeerIds: selectedUserIds.map((userId) => userId.toPeerId(false)),
			selectedExtras,
			extraCategories: excludeUsersOnly ? void 0 : RECIPIENT_CATEGORIES.filter(({ key }) => categoryKeys.includes(key)),
			extraCategoriesSectionLangKey: excludeUsersOnly ? void 0 : "ChatAutomation.RecipientCategories",
			peerType: ["dialogs", "contacts"],
			exceptSelf: true,
			filterPeerTypeBy: ["isRegularUser"],
			limit: 100,
			limitCallback: () => toastNew({ langPackKey: "ChatAutomation.RecipientLimit" })
		});
	};
	const setRecipientMode = (excludeSelected) => {
		if (store.excludeSelected === excludeSelected) return;
		setStore(changeChatAutomationRecipientMode(store, excludeSelected));
	};
	const confirmPermissionWarning = async (warningKey) => {
		if (warningKey) {
			const botUsername = new PeerTitle({
				peerId: store.botId.toPeerId(false),
				username: true
			});
			try {
				await confirmationPopup({
					titleLangKey: "ChatAutomation.PermissionWarningTitle",
					descriptionLangKey: warningKey,
					descriptionLangArgs: [botUsername.element],
					button: { langKey: "ChatAutomation.PermissionWarningProceed" }
				});
			} catch (err) {
				return false;
			}
		}
		return true;
	};
	const getRecipients = (state = store) => {
		return toBusinessBotRecipients(state);
	};
	const getRights = (state = store) => {
		const pFlags = {};
		RIGHT_KEYS.forEach((key) => {
			if (state.rights[key]) pFlags[key] = true;
		});
		return {
			_: "businessBotRights",
			pFlags
		};
	};
	const getStateSnapshot = () => ({
		botId: store.botId,
		excludeSelected: store.excludeSelected,
		categories: { ...store.categories },
		userIds: [...store.userIds],
		excludedUserIds: [...store.excludedUserIds],
		rights: { ...store.rights }
	});
	const hasChanges = createMemo(() => {
		const persisted = persistedState();
		const botChanged = !isSameUserId(store.botId, persisted.botId);
		if (!store.botId) return botChanged;
		return botChanged || !deepEqual(getRecipients(), getRecipients(persisted)) || !deepEqual(getRights(), getRights(persisted));
	});
	const getRecipientSummary = (kind) => {
		const usesPrimarySelection = kind === "included" || store.excludeSelected;
		const userIds = usesPrimarySelection ? store.userIds : store.excludedUserIds;
		const categories = (usesPrimarySelection ? getChatAutomationRecipientCategoryKeys(!store.excludeSelected) : []).filter((key) => store.categories[key]).map((key) => i18n(RECIPIENT_CATEGORIES.find((category) => category.key === key).text));
		const parts = [userIds.length ? i18n("Users", [userIds.length]) : null, ...categories].filter(Boolean);
		return parts.length ? join(parts, false) : i18n("ChatAutomation.RecipientSummaryEmpty");
	};
	const openRecipientSection = (kind) => {
		openRecipientsPicker(kind === "excluded" && !store.excludeSelected);
	};
	let savePromise;
	let navigationCloseRequested = false;
	let closeAttemptPending = false;
	const save = () => {
		if (savePromise) return savePromise;
		if (!hasChanges()) return Promise.resolve(true);
		if (store.botId && !store.excludeSelected && !primaryRecipientsCount()) {
			toastNew({ langPackKey: "ChatAutomation.RecipientsEmpty" });
			openRecipientsPicker();
			return Promise.reject(/* @__PURE__ */ new Error("BUSINESS_RECIPIENTS_EMPTY"));
		}
		setSaving(true);
		const snapshot = getStateSnapshot();
		const previousBotId = persistedState().botId;
		const promise = tab.managers.appBusinessManager.updateConnectedBot({
			botId: snapshot.botId,
			previousBotId,
			recipients: getRecipients(snapshot),
			rights: getRights(snapshot)
		}).then(() => {
			setPersistedState(snapshot);
			const isCurrent = !hasChanges();
			if (isCurrent) tab.isConfirmationNeededOnClose = void 0;
			toastNew({ langPackKey: "ChatAutomation.SaveSuccess" });
			return isCurrent;
		}).catch((err) => {
			const errorType = err.type;
			if (errorType === "BUSINESS_RECIPIENTS_EMPTY") toastNew({ langPackKey: "ChatAutomation.RecipientsEmpty" });
			else if (errorType === "BOT_BUSINESS_MISSING") toastNew({ langPackKey: "ChatAutomation.BotUnsupported" });
			else toastNew({ langPackKey: "Error.AnError" });
			throw err;
		}).finally(() => {
			setSaving(false);
			if (savePromise === promise) savePromise = void 0;
		});
		return savePromise = promise;
	};
	const confirmClose = useIsConfirmationNeededOnClose({
		hasChanges,
		saveAllSettings: async () => {
			if (!await save()) throw new Error("CHAT_AUTOMATION_CHANGED_DURING_SAVE");
		},
		descriptionLangKey: "UnsavedChangesDescription.ChatAutomation",
		waitForSave: true
	});
	const hasPendingBotCandidate = () => {
		return editingBotQuery() && (!!unsupportedUserId() || searchResults().some((userId) => !isSameUserId(userId, store.botId)));
	};
	tab.isConfirmationNeededOnClose = () => {
		if (closeAttemptPending) return Promise.reject(/* @__PURE__ */ new Error("CLOSE_ATTEMPT_PENDING"));
		closeAttemptPending = true;
		navigationCloseRequested = true;
		return (hasPendingBotCandidate() ? confirmationPopup({
			titleLangKey: "ChatAutomation.SetupNotCompletedTitle",
			descriptionLangKey: "ChatAutomation.SetupNotCompletedText",
			button: { langKey: "ChatAutomation.SetupNotCompletedLeave" }
		}) : Promise.resolve()).then(async () => {
			const pendingSave = savePromise;
			if (pendingSave) {
				if (!await pendingSave) throw new Error("CHAT_AUTOMATION_CHANGED_DURING_SAVE");
			} else await confirmClose();
		}).then(() => {
			closeAttemptPending = false;
		}, (err) => {
			closeAttemptPending = false;
			navigationCloseRequested = false;
			throw err;
		});
	};
	const saveAndClose = () => {
		if (saving()) return;
		navigationCloseRequested = false;
		save().then((isCurrent) => {
			if (isCurrent && !navigationCloseRequested) tab.close();
		}, () => {});
	};
	const learnMoreAnchor = document.createElement("a");
	learnMoreAnchor.href = "https://telegram.org";
	learnMoreAnchor.target = "_blank";
	learnMoreAnchor.rel = "noopener noreferrer";
	return [
		createComponent(Portal, {
			get mount() {
				return tab.header;
			},
			get children() {
				return createComponent(SaveButton, {
					get hasChanges() {
						return memo(() => !!hasChanges())() && !saving();
					},
					onClick: saveAndClose
				});
			}
		}),
		createComponent(MediaHeader, {
			get ["class"]() {
				return chatAutomation_module_default.heroHeader;
			},
			get children() {
				return [
					createComponent(MediaHeader.Sticker, {
						name: "ChatAutomation",
						size: 140,
						restartOnClick: false
					}),
					createComponent(MediaHeader.Title, { get children() {
						return i18n("ChatAutomation.HeroTitle");
					} }),
					createComponent(MediaHeader.Subtitle, { get children() {
						return i18n("ChatAutomation.HeroDescription", [learnMoreAnchor]);
					} })
				];
			}
		}),
		createComponent(Section, {
			caption: "ChatAutomation.BotDescription",
			"data-chat-automation-section": "bot",
			get children() {
				return [createComponent(Show, {
					get when() {
						return store.botId;
					},
					children: (botId) => createComponent(BotDialogList, { get userIds() {
						return [botId()];
					} })
				}), createComponent(Show, {
					get when() {
						return !store.botId;
					},
					get children() {
						return [
							(() => {
								var _el$2 = _tmpl$2();
								insert(_el$2, createComponent(InputFieldTsx, {
									label: "ChatAutomation.BotPlaceholder",
									get value() {
										return query();
									},
									onRawInput: updateBotQuery,
									plainText: true,
									instanceRef: (field) => {
										field.input.setAttribute("autocapitalize", "none");
										field.input.setAttribute("autocorrect", "off");
										field.input.setAttribute("aria-label", langPack_default.format("ChatAutomation.BotPlaceholder", true));
										field.input.spellcheck = false;
									}
								}));
								return _el$2;
							})(),
							createComponent(Show, {
								get when() {
									return searching();
								},
								get children() {
									return createComponent(SearchLoading, { get ["aria-label"]() {
										return langPack_default.format("ChatAutomation.Searching", true);
									} });
								}
							}),
							createComponent(BotDialogList, {
								get userIds() {
									return searchResults();
								},
								onAdd: selectBot
							}),
							createComponent(Show, {
								get when() {
									return memo(() => !!(!searching() && searchFinished()))() && !searchResults().length;
								},
								get children() {
									return createComponent(SearchEmpty, { get children() {
										return i18n(searchFailed() ? "ChatAutomation.SearchFailed" : unsupportedUserId() ? "ChatAutomation.BotUnsupported" : "ChatAutomation.BotNotFound");
									} });
								}
							})
						];
					}
				})];
			}
		}),
		createComponent(Section, {
			name: "ChatAutomation.AccessibleChats",
			"data-chat-automation-section": "access",
			get contentProps() {
				return {
					"role": "radiogroup",
					"aria-label": langPack_default.format("ChatAutomation.AccessibleChats", true)
				};
			},
			get children() {
				return [createComponent(Row, { get children() {
					return [createComponent(Row.RadioField, { get children() {
						return createComponent(RadioFieldTsx, {
							"class": "disable-hover",
							get checked() {
								return store.excludeSelected;
							},
							name: "chat-automation-access",
							value: "all-except",
							onChange: (checked) => checked && setRecipientMode(true)
						});
					} }), createComponent(Row.Title, { get children() {
						return i18n("ChatAutomation.AllExcept");
					} })];
				} }), createComponent(Row, { get children() {
					return [createComponent(Row.RadioField, { get children() {
						return createComponent(RadioFieldTsx, {
							"class": "disable-hover",
							get checked() {
								return !store.excludeSelected;
							},
							name: "chat-automation-access",
							value: "only-selected",
							onChange: (checked) => checked && setRecipientMode(false)
						});
					} }), createComponent(Row.Title, { get children() {
						return i18n("ChatAutomation.OnlySelected");
					} })];
				} })];
			}
		}),
		createComponent(For, {
			get each() {
				return getChatAutomationRecipientSectionKinds(store.excludeSelected);
			},
			children: (kind) => createComponent(Section, {
				caption: kind === "included" ? "ChatAutomation.IncludedDescription" : "ChatAutomation.ExcludedDescription",
				"data-chat-automation-section": `${kind}-chats`,
				get children() {
					return createComponent(Row, {
						get ["class"]() {
							return chatAutomation_module_default.recipientRow;
						},
						clickable: () => openRecipientSection(kind),
						role: "button",
						tabIndex: 0,
						get children() {
							return [createComponent(Row.Title, {
								get ["class"]() {
									return chatAutomation_module_default.recipientTitle;
								},
								get children() {
									return i18n(kind === "included" ? "ChatAutomation.IncludedChats" : "ChatAutomation.ExcludedChats");
								}
							}), createComponent(Row.RightContent, {
								get ["class"]() {
									return chatAutomation_module_default.recipientSummary;
								},
								get children() {
									return [(() => {
										var _el$3 = _tmpl$3();
										insert(_el$3, () => getRecipientSummary(kind));
										createRenderEffect(() => className(_el$3, chatAutomation_module_default.recipientSummaryText));
										return _el$3;
									})(), createComponent(IconTsx, {
										get ["class"]() {
											return chatAutomation_module_default.recipientSummaryIcon;
										},
										icon: "next",
										"aria-hidden": "true"
									})];
								}
							})];
						}
					});
				}
			})
		}),
		createComponent(Show, {
			get when() {
				return store.botId;
			},
			get children() {
				return createComponent(Section, {
					name: "ChatAutomation.Permissions",
					caption: "ChatAutomation.PermissionsDescription",
					"data-chat-automation-section": "permissions",
					get children() {
						return createComponent(BotPermissions, {
							get rights() {
								return store.rights;
							},
							confirmPermissionWarning,
							onRightsChange: (rights) => setStore("rights", rights)
						});
					}
				});
			}
		}),
		createComponent(Show, {
			get when() {
				return store.botId;
			},
			get children() {
				return createComponent(Section, { get children() {
					return createComponent(Button, {
						"class": "btn-primary btn-transparent danger",
						icon: "delete",
						text: "ChatAutomation.RemoveBot",
						onClick: removeBot
					});
				} });
			}
		})
	];
}
//#endregion
export { ChatAutomationTab as default };
