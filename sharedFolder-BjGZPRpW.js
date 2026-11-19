//# allFunctionsCalledOnLoad
import { g as getPeerActiveUsernames } from "./objectUrlUtils-5x08MNuO.js";
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { a as i18n, u as langPack_default } from "./langPack-BmdJGr44.js";
import { N as onMount, p as createComponent } from "./solid-9Vxm0VIz.js";
import { r as useHotReloadGuard } from "./hotReloadGuard-BUNVkeQ4.js";
import { n as attachClickEvent } from "./clickEvent-COk4YpLP.js";
import { t as confirmationPopup } from "./confirmationPopup-Bz6mK0o-.js";
import { hn as filterUnique, un as hasRights } from "./getChatMigratedTo-ChhMNXuu.js";
import { U as getPeerId } from "./canPollPeerStories-D3HoBvLX.js";
import { t as wrapFolderTitle } from "./folderTitle-Bk4Q-S9l.js";
import { i as usePromiseCollector } from "./mediaHeader-CnpQNwOl.js";
import { o as getChatMembersString, t as AppSelectPeers } from "./appSelectPeers-BYpCZNpe.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { n as unwrapSolidElement } from "./wrapSolidComponent-BASCjNJG.js";
import { r as toastNew } from "./toast-B6VD5M7R.js";
import { t as ButtonIcon } from "./buttonIcon-CthJWloV.js";
import { t as InviteLink } from "./inviteLink-DcZkMktu.js";
import { t as toggleDisability } from "./toggleDisability-2oUcKWqw.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { t as shake } from "./shake-1vPuqgfm.js";
//#region src/components/sidebarLeft/tabs/sharedFolder.tsx
var SharedFolder = () => {
	const [tab] = useSuperTab();
	const promiseCollector = usePromiseCollector();
	const { lottieLoader } = useHotReloadGuard();
	let filter = tab.payload.filter;
	const chatlistInvite = tab.payload.chatlistInvite;
	let caption;
	let stickerContainer;
	let descriptionI18n;
	let descriptionTitle;
	let chatsTitleI18n;
	let confirmBtn;
	let loadAnimationPromise;
	let animation;
	let selector;
	const elementMap = /* @__PURE__ */ new Map();
	const peersMap = /* @__PURE__ */ new Map();
	const canSelectPeer = (peer) => {
		if (!peer || !chatlistInvite) return false;
		if (peer._ === "user") return false;
		return !!getPeerActiveUsernames(peer).length || hasRights(peer, "invite_links");
	};
	const updateDescription = (length = chatlistInvite ? chatlistInvite.peers.length : void 0) => {
		if (!chatlistInvite) {
			descriptionI18n.compareAndUpdate({ key: "SharedFolder.NoChats" });
			chatsTitleI18n.compareAndUpdate({ key: "SharedFolder.NoChats.Title" });
		} else {
			descriptionI18n.update({
				key: "SharedFolder.Edit.Description",
				args: [descriptionTitle, i18n("Chats", [length])]
			});
			chatsTitleI18n.update({
				key: "ChatsSelected",
				args: [length]
			});
		}
	};
	const onSelectChange = (length) => {
		updateDescription(length);
		if (!chatlistInvite) return;
		const peerIds = [...selector.selected];
		const prev = chatlistInvite.peers.map((peer) => getPeerId(peer));
		const isSame = prev.length === peerIds.length && prev.every((peerId) => peerIds.includes(peerId));
		confirmBtn.classList.toggle("hide", isSame);
	};
	const getSubtitleForElement = (peerId) => {
		const peer = peersMap.get(peerId);
		if (peer._ === "user") return i18n(peer.pFlags.bot ? "SharedFolder.Cant.ShareBots" : "SharedFolder.Cant.ShareUsers");
		else if (!canSelectPeer(peer)) return i18n("SharedFolder.Cant.Share");
		return getChatMembersString(peer.id, void 0, peer);
	};
	tab.isConfirmationNeededOnClose = () => {
		if (confirmBtn.classList.contains("hide")) return;
		return confirmationPopup({
			descriptionLangKey: "BotWebViewChangesMayNotBeSaved",
			button: {
				isDanger: true,
				langKey: "BotWebViewCloseAnyway"
			}
		});
	};
	tab._onOpenAfterTimeout = () => {
		loadAnimationPromise.then(() => {
			animation.autoplay = true;
			animation.play();
		});
	};
	onMount(() => {
		tab.container.classList.add("edit-folder-container", "shared-folder-container");
		caption = document.createElement("div");
		caption.classList.add("caption");
		descriptionI18n = new langPack_default.IntlElement();
		caption.append(descriptionI18n.element);
		stickerContainer = document.createElement("div");
		stickerContainer.classList.add("sticker-container");
		confirmBtn = ButtonIcon("check btn-confirm hide blue", { ariaLabel: "Save" });
		tab.header.append(confirmBtn);
		tab.content.remove();
		tab.listenerSetter.add(rootScope)("filter_update", (updatedFilter) => {
			if (filter.id === updatedFilter.id) filter = updatedFilter;
		});
		let linkSection;
		if (chatlistInvite) {
			const inviteLink = new InviteLink({
				buttons: [{
					icon: "copy",
					text: "CopyLink",
					onClick: () => inviteLink.copyLink()
				}, {
					icon: "delete",
					className: "danger",
					text: "DeleteLink",
					onClick: () => {
						tab.managers.filtersStorage.deleteExportedInvite(filter.id, chatlistInvite.url).then(() => {
							tab.eventListener.dispatchEvent("delete");
							tab.close();
						});
					}
				}],
				listenerSetter: tab.listenerSetter,
				url: chatlistInvite.url
			});
			linkSection = unwrapSolidElement(createComponent(Section, {
				name: "InviteLink",
				get children() {
					return inviteLink.container;
				}
			}));
		}
		{
			const titleI18n = chatsTitleI18n = new langPack_default.IntlElement();
			selector = new AppSelectPeers({
				middleware: tab.middlewareHelper.get(),
				appendTo: tab.container,
				onChange: onSelectChange,
				peerType: [],
				getSubtitleForElement,
				processElementAfter: (peerId, dialogElement) => {
					elementMap.set(peerId, dialogElement);
					dialogElement.container.classList.toggle("cant-select", !canSelectPeer(peersMap.get(peerId)));
				},
				sectionNameLangPackKey: titleI18n.element,
				sectionCaption: "SharedFolder.Edit.Subtitle",
				managers: tab.managers,
				noSearch: true,
				meAsSaved: false,
				multiSelect: true
			});
			selector.scrollable.attachBorderListeners(tab.container);
			const selectedPeers = (chatlistInvite?.peers ?? []).map((peer) => getPeerId(peer));
			selector.addInitial(selectedPeers);
			const combinedPeerIds = filterUnique(selectedPeers.concat(filter.includePeerIds));
			promiseCollector.collect((async () => {
				const peers = await Promise.all(combinedPeerIds.map((peerId) => tab.managers.appPeersManager.getPeer(peerId)));
				const ratings = /* @__PURE__ */ new Map();
				const peerIds = /* @__PURE__ */ new Map();
				peers.forEach((peer) => {
					const peerId = peer.id.toPeerId(peer._ !== "user");
					peerIds.set(peer, peerId);
					peersMap.set(peerId, peer);
					let rating = 0;
					if (!canSelectPeer(peer)) rating = -1;
					else if (selector.selected.has(peerId)) rating = 1;
					ratings.set(peer, rating);
				});
				peers.sort((a, b) => ratings.get(b) - ratings.get(a));
				await selector.renderResultsFunc(peers.map((peer) => peerIds.get(peer)));
				const _add = selector.add.bind(selector);
				selector.add = (options) => {
					const peerId = options.key.toPeerId();
					const { container } = elementMap.get(peerId);
					if (container.classList.contains("cant-select")) {
						let langPackKey;
						if (peerId.isUser()) langPackKey = "SharedFolder.Toast.NoPrivate";
						else langPackKey = peersMap.get(peerId).pFlags.broadcast ? "SharedFolder.Toast.NoAdminChannel" : "SharedFolder.Toast.NoAdminGroup";
						toastNew({ langPackKey });
						shake(container);
						return;
					}
					return _add(options);
				};
				const _remove = selector.remove.bind(selector);
				selector.remove = (...args) => {
					const peerId = args[0].toPeerId();
					if (selector.selected.size <= 1) {
						shake(elementMap.get(peerId).container);
						return false;
					}
					return _remove(...args);
				};
			})());
		}
		attachClickEvent(confirmBtn, () => {
			const toggle = toggleDisability([confirmBtn], true);
			tab.managers.filtersStorage.editExportedInvite(filter.id, chatlistInvite.url, [...selector.selected], filter.title.text).then((chatlistInvite) => {
				tab.eventListener.dispatchEvent("edit", chatlistInvite);
				tab.close();
			}, (error) => {
				toggle();
				throw error;
			});
		}, { listenerSetter: tab.listenerSetter });
		selector.scrollable.prepend(...[
			stickerContainer,
			caption,
			linkSection
		].filter(Boolean));
		promiseCollector.collect(Promise.all([loadAnimationPromise = lottieLoader.loadAnimationFromURLManually("Folders_Shared").then(async (cb) => {
			const player = await cb({
				container: stickerContainer,
				loop: false,
				autoplay: false,
				width: 86,
				height: 86
			});
			animation = player;
			return lottieLoader.waitForFirstFrame(player);
		}), wrapFolderTitle(filter.title, tab.middlewareHelper.get()).then((title) => {
			descriptionTitle = document.createElement("span");
			descriptionTitle.append(title);
			updateDescription();
		})]));
	});
	return null;
};
//#endregion
export { SharedFolder as default };
