//# allFunctionsCalledOnLoad
import { t as apiManagerProxy, u as useJoinedCommunities } from "./apiManagerProxy-DmQXvxSF.js";
import { a as i18n } from "./langPack-BmdJGr44.js";
import { p as createComponent, s as Show, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { c as insert, g as template, o as className, u as memo } from "./web-BPyQozky.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { i as Row } from "./confirmationPopup-Bz6mK0o-.js";
import { i as usePromiseCollector, t as MediaHeader } from "./mediaHeader-CnpQNwOl.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { t as CommunityAvatar } from "./communityAvatar-DgeXPobI.js";
import { t as communityShared_module_default } from "./communityShared.module-UBZ3o4PU.js";
import "./communityShared-DpGGDZXb.js";
import { t as CommunityDialogList } from "./communityPeerDialogList-eL2VIhdd.js";
//#region src/components/communities/addGroupToCommunity.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div>`);
function AddGroupToCommunity() {
	const [tab] = useSuperTab();
	const promiseCollector = usePromiseCollector();
	const communities = useJoinedCommunities();
	const { peerId } = tab.payload;
	const peer = apiManagerProxy.getPeer(peerId);
	const titleKey = peer?._ === "user" && peer.pFlags.bot ? "Community.AddBot" : peer?._ === "channel" && peer.pFlags.broadcast ? "Community.AddChannel" : "Community.AddGroup";
	const descriptionKey = peer?._ === "user" && peer.pFlags.bot ? "Community.BotDescription" : peer?._ === "channel" && peer.pFlags.broadcast ? "Community.ChannelDescription" : "Community.Description";
	const communityTitle = i18n("Community.Title").textContent;
	tab.title.replaceChildren(i18n(titleKey));
	const loadPromise = tab.managers.appCommunitiesManager.getJoinedCommunities();
	promiseCollector.collect(loadPromise);
	loadPromise.then(() => {
		communities()?.forEach((community) => {
			Promise.resolve(tab.managers.appProfileManager.getChatFull(community.id.toChatId())).catch(() => void 0);
		});
	}, () => void 0);
	const openCreate = () => {
		tab.slider.createTab(hotReloadGuard.tabs.AppCreateCommunityTab).open({ peerId });
	};
	const openCommunity = (communityId) => {
		tab.slider.createTab(hotReloadGuard.tabs.AppCommunityChatSettingsTab).open({
			communityId,
			peerId,
			mode: "add",
			initialVisibility: "visible",
			returnToEditChat: true
		});
	};
	return (() => {
		var _el$ = _tmpl$();
		insert(_el$, createComponent(MediaHeader, {
			marginBottom: true,
			get children() {
				return [
					createComponent(MediaHeader.Sticker, {
						size: 90,
						get element() {
							return createComponent(CommunityAvatar, {
								peerId,
								title: communityTitle,
								size: 90
							});
						}
					}),
					createComponent(MediaHeader.Title, { children: communityTitle }),
					createComponent(MediaHeader.Subtitle, {
						color: "secondary",
						get children() {
							return i18n(descriptionKey);
						}
					})
				];
			}
		}), null);
		insert(_el$, createComponent(Section, { get children() {
			return createComponent(Row, {
				clickable: openCreate,
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
						return i18n("Community.Create");
					} })];
				}
			});
		} }), null);
		insert(_el$, createComponent(Section, {
			name: "Community.AddExisting",
			get children() {
				return [createComponent(CommunityDialogList, {
					get communities() {
						return communities() || [];
					},
					get middleware() {
						return tab.middlewareHelper.get();
					},
					onClick: (community) => {
						openCommunity(community.id.toChatId());
					}
				}), createComponent(Show, {
					get when() {
						return memo(() => !!communities())() && !communities().length;
					},
					get children() {
						var _el$2 = _tmpl$();
						insert(_el$2, () => i18n("Community.NoCommunities"));
						createRenderEffect(() => className(_el$2, communityShared_module_default.empty));
						return _el$2;
					}
				})];
			}
		}), null);
		return _el$;
	})();
}
//#endregion
export { AddGroupToCommunity as default };
