//# allFunctionsCalledOnLoad
import { a as i18n } from "./langPack-BmdJGr44.js";
import { M as onCleanup, N as onMount, p as createComponent } from "./solid-9Vxm0VIz.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { i as Row } from "./confirmationPopup-Bz6mK0o-.js";
import { t as AppSelectPeers } from "./appSelectPeers-BYpCZNpe.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { t as useCommunityTabGuard } from "./useCommunityTabGuard-CjtFqUbl.js";
var addChatToCommunity_module_default = { listSection: "_listSection_9zocs_1" };
//#endregion
//#region src/components/communities/addChatToCommunity.tsx
function AddChatToCommunity() {
	const [tab] = useSuperTab();
	useCommunityTabGuard(tab, tab.payload.communityId);
	const chatsPromise = tab.managers.appCommunitiesManager.getChatsToAdd();
	const botsPromise = tab.managers.appCommunitiesManager.getBotsToAdd();
	const candidatesPromise = Promise.all([chatsPromise, botsPromise]);
	const openChatSettings = async (peerId) => {
		await tab.slider.createTab(hotReloadGuard.tabs.AppCommunityChatSettingsTab).open({
			communityId: tab.payload.communityId,
			peerId,
			mode: "add",
			initialVisibility: "visible",
			returnToEditCommunity: true
		});
		tab.slider.removeTabFromHistory(tab);
	};
	const createGroup = () => {
		tab.slider.createTab(hotReloadGuard.tabs.AppNewGroupTab).open({
			peerIds: [],
			asChannel: true,
			openAfter: false,
			onCreate: (chatId) => openChatSettings(chatId.toPeerId(true))
		});
	};
	const createChannel = () => {
		tab.slider.createTab(hotReloadGuard.tabs.AppNewChannelTab).open({
			openAfter: false,
			onCreate: (chatId) => openChatSettings(chatId.toPeerId(true))
		});
	};
	tab.scrollable.container.remove();
	const selector = new AppSelectPeers({
		appendTo: tab.content,
		managers: tab.managers,
		middleware: tab.middlewareHelper.get(),
		peerType: ["custom"],
		multiSelect: false,
		meAsSaved: false,
		placeholder: "SearchPlaceholder",
		sectionNameLangPackKey: "FilterChats",
		getMoreCustom: async (query, middleware) => {
			const [chats, bots] = await candidatesPromise;
			if (!middleware()) return;
			const normalizedQuery = query.trim().toLocaleLowerCase();
			const matchesQuery = (parts) => {
				return !normalizedQuery || parts.filter((part) => !!part).some((part) => part.toLocaleLowerCase().includes(normalizedQuery));
			};
			const chatPeerIds = chats.filter((chat) => matchesQuery([chat.title])).map((chat) => chat.id.toPeerId(true));
			const botPeerIds = bots.filter((bot) => bot._ === "user" && matchesQuery([
				bot.first_name,
				bot.last_name,
				bot.username
			])).map((bot) => bot.id.toPeerId(false));
			return {
				result: [...chatPeerIds, ...botPeerIds],
				isEnd: true
			};
		},
		onSelect: (peerId) => {
			openChatSettings(peerId);
			return false;
		}
	});
	selector.section.container.classList.add(addChatToCommunity_module_default.listSection);
	let actionsSection;
	onMount(() => {
		selector.scrollable.prepend(actionsSection);
		selector.checkForTriggers();
	});
	onCleanup(() => selector.container.remove());
	return createComponent(Section, {
		ref(r$) {
			var _ref$ = actionsSection;
			typeof _ref$ === "function" ? _ref$(r$) : actionsSection = r$;
		},
		get children() {
			return [createComponent(Row, {
				clickable: createGroup,
				role: "button",
				tabIndex: 0,
				"on:keydown": (event) => {
					if (event.key === "Enter" || event.key === " ") {
						event.preventDefault();
						event.currentTarget.click();
					}
				},
				get children() {
					return [createComponent(Row.Icon, { icon: "newgroup_filled" }), createComponent(Row.Title, { get children() {
						return i18n("NewGroup");
					} })];
				}
			}), createComponent(Row, {
				clickable: createChannel,
				role: "button",
				tabIndex: 0,
				"on:keydown": (event) => {
					if (event.key === "Enter" || event.key === " ") {
						event.preventDefault();
						event.currentTarget.click();
					}
				},
				get children() {
					return [createComponent(Row.Icon, { icon: "newchannel_filled" }), createComponent(Row.Title, { get children() {
						return i18n("NewChannel");
					} })];
				}
			})];
		}
	});
}
//#endregion
export { AddChatToCommunity as default };
