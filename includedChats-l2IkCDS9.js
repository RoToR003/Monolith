//# allFunctionsCalledOnLoad
import { W as copy } from "./objectUrlUtils-5x08MNuO.js";
import { m as REAL_FOLDERS, n as rootScope } from "./rootScope-CZS0lmz8.js";
import { a as i18n, s as join } from "./langPack-BmdJGr44.js";
import { M as onCleanup, N as onMount, p as createComponent } from "./solid-9Vxm0VIz.js";
import { t as forEachReverse } from "./forEachReverse-pJ5a3thw.js";
import { i as simulateClickEvent, n as attachClickEvent } from "./clickEvent-COk4YpLP.js";
import { t as Button } from "./button-DpTvniRN.js";
import { t as wrapFolderTitle } from "./folderTitle-Bk4Q-S9l.js";
import { i as usePromiseCollector } from "./mediaHeader-CnpQNwOl.js";
import { t as AppSelectPeers } from "./appSelectPeers-BYpCZNpe.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { n as unwrapSolidElement } from "./wrapSolidComponent-BASCjNJG.js";
import { t as ButtonIcon } from "./buttonIcon-CthJWloV.js";
import { t as showLimitPopup } from "./limit-j5BxQxwd.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
//#region src/components/sidebarLeft/tabs/includedChats.tsx
var IncludedChats = () => {
	const [tab] = useSuperTab();
	const promiseCollector = usePromiseCollector();
	const { type, onSetFilter } = tab.payload;
	const originalFilter = tab.payload.filter;
	const filter = copy(originalFilter);
	let confirmBtn;
	let selector;
	let limit;
	const dialogsByFilters = /* @__PURE__ */ new Map();
	const getSubtitleForElement = async (peerId, middleware) => {
		const titles = await Promise.all([...dialogsByFilters.entries()].map(async ([filter, dialogs]) => {
			if (!dialogs.has(peerId)) return;
			const span = document.createElement("span");
			span.append(await wrapFolderTitle(filter.title, middleware));
			return span;
		}));
		const subtitle = document.createDocumentFragment();
		subtitle.append(...join(titles.filter(Boolean), false));
		return subtitle;
	};
	const onSelectChange = (length) => {
		if (type === "included") confirmBtn.style.display = length ? "" : "none";
	};
	const buildSelector = () => {
		confirmBtn.style.display = type === "excluded" ? "" : "none";
		let details;
		if (type === "excluded") details = {
			exclude_muted: {
				ico: "mute",
				text: "ChatList.Filter.MutedChats"
			},
			exclude_archived: {
				ico: "archive",
				icoFilled: "archive_filled",
				text: "ChatList.Filter.Archive"
			},
			exclude_read: {
				ico: "readchats",
				text: "ChatList.Filter.ReadChats"
			}
		};
		else details = {
			contacts: {
				ico: "newprivate",
				icoFilled: "newprivate_filled",
				text: "ChatList.Filter.Contacts"
			},
			non_contacts: {
				ico: "noncontacts",
				text: "ChatList.Filter.NonContacts"
			},
			groups: {
				ico: "group",
				icoFilled: "group_filled",
				text: "ChatList.Filter.Groups"
			},
			broadcasts: {
				ico: "newchannel",
				icoFilled: "channel_filled",
				text: "ChatList.Filter.Channels"
			},
			bots: {
				ico: "bots",
				icoFilled: "bot_filled",
				text: "ChatList.Filter.Bots"
			}
		};
		selector = new AppSelectPeers({
			middleware: tab.middlewareHelper.get(),
			appendTo: tab.container,
			onChange: onSelectChange,
			peerType: ["dialogs"],
			getSubtitleForElement,
			placeholder: "Search",
			sectionNameLangPackKey: "FilterChats",
			managers: tab.managers
		});
		const categoryButtons = Object.keys(details).map((key) => {
			const button = Button("btn-primary btn-transparent folder-category-button", {
				icon: details[key].ico,
				text: details[key].text
			});
			button.dataset.peerId = key;
			button.append(selector.checkbox());
			return button;
		});
		let categoriesContent;
		const categoriesSection = unwrapSolidElement(createComponent(Section, {
			"class": "folder-categories",
			noDelimiter: true,
			name: "FilterChatTypes",
			contentProps: { ref: (element) => categoriesContent = element },
			children: categoryButtons
		}));
		const selectedPeers = (type === "included" ? filter.includePeerIds : filter.excludePeerIds).slice();
		selector.selected = new Set(selectedPeers);
		let addedInitial = false;
		const _add = selector.add.bind(selector);
		selector.add = ({ key, title, scroll }) => {
			const d = details[key];
			if (selector.selected.size >= limit && addedInitial && !d) {
				showLimitPopup("folderPeers");
				return false;
			}
			return _add({
				key,
				title: d ? i18n(d.text) : void 0,
				scroll,
				fallbackIcon: d ? d.icoFilled || d.ico : void 0
			});
		};
		selector.scrollable.append(categoriesSection, selector.scrollable.container.lastElementChild);
		selector.addInitial(selectedPeers);
		addedInitial = true;
		const pFlags = filter.pFlags;
		if (pFlags) {
			for (const flag in pFlags) if (details.hasOwnProperty(flag) && !!pFlags[flag]) simulateClickEvent(categoriesContent.querySelector(`[data-peer-id="${flag}"]`));
		}
	};
	onMount(() => {
		tab.content.remove();
		tab.container.classList.add("included-chatlist-container");
		confirmBtn = ButtonIcon("check btn-confirm blue", {
			noRipple: true,
			ariaLabel: "Save"
		});
		confirmBtn.style.display = "none";
		tab.header.append(confirmBtn);
		attachClickEvent(confirmBtn, async () => {
			const selected = selector.getSelected();
			const pFlags = filter.pFlags;
			if (type === "included" && pFlags) for (const key in pFlags) {
				if (key.indexOf("exclude_") === 0) continue;
				delete pFlags[key];
			}
			else if (pFlags) for (const key in pFlags) {
				if (key.indexOf("exclude_") !== 0) continue;
				delete pFlags[key];
			}
			const peerIds = [];
			for (const key of selected) if (key.isPeerId()) peerIds.push(key.toPeerId());
			else filter.pFlags[key] = true;
			let cmp;
			if (type === "included") cmp = (peerId) => peerIds.includes(peerId);
			else cmp = (peerId) => !peerIds.includes(peerId);
			forEachReverse(filter.pinnedPeerIds, (peerId, idx) => {
				if (!cmp(peerId)) {
					filter.pinnedPeerIds.splice(idx, 1);
					filter.pinned_peers.splice(idx, 1);
				}
			});
			const other = type === "included" ? "excludePeerIds" : "includePeerIds";
			const otherLegacy = type === "included" ? "exclude_peers" : "include_peers";
			const otherArr = filter[other];
			const otherLegacyArr = filter[otherLegacy];
			if (otherArr) forEachReverse(otherArr, (peerId, idx) => {
				if (peerIds.includes(peerId)) {
					otherArr.splice(idx, 1);
					otherLegacyArr.splice(idx, 1);
				}
			});
			filter[type === "included" ? "includePeerIds" : "excludePeerIds"] = peerIds;
			filter[type === "included" ? "include_peers" : "exclude_peers"] = await Promise.all(peerIds.map((peerId) => tab.managers.appPeersManager.getInputPeerById(peerId)));
			onSetFilter(filter);
			tab.close();
		}, { listenerSetter: tab.listenerSetter });
		const onAppConfig = (appConfig) => {
			limit = rootScope.premium ? appConfig.dialog_filters_chats_limit_premium : appConfig.dialog_filters_chats_limit_default;
		};
		tab.listenerSetter.add(rootScope)("app_config", onAppConfig);
		promiseCollector.collect((async () => {
			await Promise.all([
				tab.managers.appUsersManager.getContacts(),
				tab.managers.filtersStorage.getDialogFilters().then(async (filters) => {
					await Promise.all(filters.filter((filter) => !REAL_FOLDERS.has(filter.id)).map(async (filter) => {
						const peerIds = (await tab.managers.dialogsStorage.getFolderDialogs(filter.id)).map((d) => d.peerId);
						dialogsByFilters.set(filter, new Set(peerIds));
					}));
				}),
				tab.managers.apiManager.getAppConfig().then((appConfig) => {
					onAppConfig(appConfig);
				})
			]);
			buildSelector();
		})());
	});
	onCleanup(() => {
		if (selector) {
			selector.container.remove();
			selector = null;
		}
	});
	return null;
};
//#endregion
export { IncludedChats as default };
