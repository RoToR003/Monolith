//# allFunctionsCalledOnLoad
import { t as apiManagerProxy } from "./apiManagerProxy-DmQXvxSF.js";
import { a as i18n } from "./langPack-BmdJGr44.js";
import { C as createSignal, p as createComponent, w as createUniqueId, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { c as insert, f as setAttribute, g as template } from "./web-BPyQozky.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { t as Button } from "./buttonTsx-Bwphkm9r.js";
import { t as confirmationPopup } from "./confirmationPopup-Bz6mK0o-.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { r as toastNew } from "./toast-B6VD5M7R.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { t as useCommunityTabGuard } from "./useCommunityTabGuard-CjtFqUbl.js";
import { t as communityShared_module_default } from "./communityShared.module-UBZ3o4PU.js";
import { r as CommunityRadioOption } from "./communityShared-DpGGDZXb.js";
import { n as CommunityPeerDialogList } from "./communityPeerDialogList-eL2VIhdd.js";
//#region src/components/communities/communityChatSettings.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div role=radiogroup>`);
var _tmpl$2 = /*#__PURE__*/ template(`<div>`);
function CommunityChatSettings() {
	const [tab] = useSuperTab();
	const { communityId, peerId, mode = "settings", onSave, returnToEditChat, returnToEditCommunity } = tab.payload;
	useCommunityTabGuard(tab, communityId);
	const [visibility, setVisibility] = createSignal(tab.payload.initialVisibility || "visible");
	const [saving, setSaving] = createSignal(false);
	const visibilityRadioName = createUniqueId();
	const peer = apiManagerProxy.getPeer(peerId);
	const peerKind = peer?._ === "user" && peer.pFlags.bot ? "bot" : peer?._ === "channel" && peer.pFlags.broadcast ? "channel" : "group";
	const suggestionKey = peerKind === "bot" ? "Community.AddBotConfirm" : peerKind === "channel" ? "Community.AddChannelConfirm" : "Community.AddGroupConfirm";
	const addedKey = peerKind === "bot" ? "Community.BotAdded" : peerKind === "channel" ? "Community.ChannelAdded" : "Community.GroupAdded";
	const confirmSuggestion = async () => {
		if (!communityId || await tab.managers.appCommunitiesManager.canManageLinkedPeers(communityId)) return true;
		try {
			await confirmationPopup({
				titleLangKey: "Community.AddTo",
				descriptionLangKey: suggestionKey,
				button: { langKey: "Add" }
			});
			return true;
		} catch {
			return false;
		}
	};
	const showPeersLimit = async () => {
		const isBot = peerId.isUser();
		const limit = await tab.managers.appCommunitiesManager.getPeersLimit(isBot);
		toastNew({
			langPackKey: isBot ? "Community.BotPeersLimit" : "Community.PeersLimit",
			langPackArguments: [limit]
		});
	};
	const save = async () => {
		if (saving()) return;
		setSaving(true);
		try {
			if (onSave) await onSave(visibility());
			else if (communityId) {
				if (!await confirmSuggestion()) return;
				const result = await tab.managers.appCommunitiesManager.togglePeerLink({
					communityId,
					peerId,
					action: visibility()
				});
				toastNew({ langPackKey: result.status === "requested" ? "Community.RequestSent" : addedKey });
			}
			const returnTab = returnToEditChat ? tab.slider.getTab(hotReloadGuard.tabs.AppEditChatTab) : returnToEditCommunity ? tab.slider.getTab(hotReloadGuard.tabs.AppEditCommunityTab) : void 0;
			if (returnTab && await tab.slider.closeTabsUntilTab(returnTab)) return;
			tab.close();
		} catch (error) {
			if (error.type === "COMMUNITY_PEERS_TOO_MUCH") {
				try {
					await showPeersLimit();
				} catch (limitError) {
					console.error("load community peers limit error", limitError);
					toastNew({ langPackKey: "Error.AnError" });
				}
				return;
			}
			console.error("save community chat visibility error", error);
			toastNew({ langPackKey: "Error.AnError" });
		} finally {
			setSaving(false);
		}
	};
	return (() => {
		var _el$ = _tmpl$2();
		insert(_el$, createComponent(Section, { get children() {
			return createComponent(CommunityPeerDialogList, {
				items: [peerId],
				get middleware() {
					return tab.middlewareHelper.get();
				},
				getPeerId: (itemPeerId) => itemPeerId
			});
		} }), null);
		insert(_el$, createComponent(Section, {
			name: "Community.ChatVisibility",
			caption: "Community.VisibilityImmutable",
			get children() {
				var _el$2 = _tmpl$();
				insert(_el$2, createComponent(CommunityRadioOption, {
					name: visibilityRadioName,
					value: "visible",
					get selected() {
						return visibility();
					},
					title: "Community.Visible",
					subtitle: "Community.VisibleInfo",
					onSelect: setVisibility
				}), null);
				insert(_el$2, createComponent(CommunityRadioOption, {
					name: visibilityRadioName,
					value: "hidden",
					get selected() {
						return visibility();
					},
					title: "Community.Hidden",
					subtitle: "Community.HiddenInfo",
					onSelect: setVisibility
				}), null);
				createRenderEffect(() => setAttribute(_el$2, "aria-label", i18n("Community.ChatVisibility").textContent));
				return _el$2;
			}
		}), null);
		insert(_el$, createComponent(Button, {
			get ["class"]() {
				return communityShared_module_default.primaryButton;
			},
			primaryFilled: true,
			text: mode === "add" ? "Community.AddTo" : "Community.SaveChanges",
			get disabled() {
				return saving();
			},
			onClick: save
		}), null);
		return _el$;
	})();
}
//#endregion
export { CommunityChatSettings as default };
