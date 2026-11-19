//# allFunctionsCalledOnLoad
import { t as apiManagerProxy } from "./apiManagerProxy-DmQXvxSF.js";
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { u as langPack_default } from "./langPack-BmdJGr44.js";
import { C as createSignal, p as createComponent, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { n as bindManagersToSession } from "./bindManagersToAccount-BL82O9H9.js";
import { c as insert, g as template, o as className } from "./web-BPyQozky.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
import { t as IconTsx } from "./iconTsx-B4lOk4A6.js";
import { t as I18nTsx } from "./i18n-CGMFiAW0.js";
import { i as createPopup, n as PopupElement } from "./indexTsx-v9mB9bAq.js";
import { ft as getMemberTagRole } from "./getChatMigratedTo-ChhMNXuu.js";
import { t as MediaHeader } from "./mediaHeader-CnpQNwOl.js";
import { t as PeerTitleTsx } from "./peerTitleTsx-DcpEYRoE.js";
import { r as wrapMemberTag } from "./bubbleNameRank-DTa_Li_O.js";
import { i as MemberTagPreview } from "./memberTagField-DOg7B-ka.js";
import showEditMemberTagPopup from "./editMemberTag-J5nCTFD1.js";
var memberTagInfo_module_default = {
	popup: "_popup_1x2tm_1",
	body: "_body_1x2tm_5",
	logo: "_logo_1x2tm_9",
	tag: "_tag_1x2tm_24",
	previews: "_previews_1x2tm_30",
	preview: "_preview_1x2tm_30",
	footer: "_footer_1x2tm_41",
	adminsOnly: "_adminsOnly_1x2tm_45"
};
//#endregion
//#region src/components/popups/memberTagInfo.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div aria-hidden=true>`);
var _tmpl$2 = /*#__PURE__*/ template(`<div>`);
var TITLES = {
	member: "MemberTag.Info.TitleMember",
	admin: "MemberTag.Info.TitleAdmin",
	owner: "MemberTag.Info.TitleOwner"
};
var TEXTS = {
	member: "MemberTag.Info.TextMember",
	admin: "MemberTag.Info.TextAdmin",
	owner: "MemberTag.Info.TextOwner"
};
var PREVIEWS = {
	member: "MemberTag.Info.PreviewMember",
	admin: "MemberTag.Info.PreviewAdmin",
	owner: "MemberTag.Info.PreviewOwner"
};
/**
* What a tag is (desktop's TagInfoBox): whose it is and in which group, a member's tag beside an
* admin's (or the owner's), and — when I may set mine — a button that does
*/
async function showMemberTagInfoPopup(options) {
	const { chatId, peerId, rank, role } = options;
	const chatPeerId = chatId.toPeerId(true);
	const managers = bindManagersToSession(rootScope.managers);
	const chat = apiManagerProxy.getChat(chatId);
	const canEditMine = !!chat && !chat.pFlags.left && await managers.appChatsManager.hasRights(chatId, "edit_rank");
	const mine = canEditMine ? await managers.appProfileManager.getParticipant(chatId, rootScope.myId).catch(() => void 0) : void 0;
	const myRank = mine?.rank;
	createPopup(() => {
		const [show, setShow] = createSignal(true);
		const sideRole = role === "owner" ? "owner" : "admin";
		const tag = wrapMemberTag({
			rank,
			role
		});
		tag.classList.add(memberTagInfo_module_default.tag);
		const editMine = () => {
			setShow(false);
			showEditMemberTagPopup({
				chatId,
				peerId: rootScope.myId,
				rank: myRank,
				role: getMemberTagRole(mine)
			});
		};
		return createComponent(PopupElement, {
			get ["class"]() {
				return memberTagInfo_module_default.popup;
			},
			managers,
			get show() {
				return show();
			},
			closable: true,
			old: true,
			get children() {
				return [
					createComponent(PopupElement.Header, {
						floating: true,
						get children() {
							return createComponent(PopupElement.CloseButton, {});
						}
					}),
					createComponent(PopupElement.Body, {
						get ["class"]() {
							return memberTagInfo_module_default.body;
						},
						get children() {
							return [createComponent(MediaHeader, {
								marginTop: true,
								get children() {
									return [
										createComponent(MediaHeader.Sticker, {
											size: 80,
											get element() {
												return (() => {
													var _el$2 = _tmpl$2();
													insert(_el$2, createComponent(IconTsx, { icon: "tag" }));
													createRenderEffect(() => className(_el$2, classNames(memberTagInfo_module_default.logo, role !== "member" && "member-tag-" + role)));
													return _el$2;
												})();
											}
										}),
										createComponent(MediaHeader.Title, { get children() {
											return createComponent(I18nTsx, { get key() {
												return TITLES[role];
											} });
										} }),
										createComponent(MediaHeader.Subtitle, { get children() {
											return createComponent(I18nTsx, {
												get key() {
													return TEXTS[role];
												},
												get args() {
													return [
														tag,
														createComponent(PeerTitleTsx, {
															peerId,
															onlyFirstName: true
														}),
														createComponent(PeerTitleTsx, { peerId: chatPeerId })
													];
												}
											});
										} })
									];
								}
							}), (() => {
								var _el$ = _tmpl$();
								insert(_el$, createComponent(MemberTagPreview, {
									get ["class"]() {
										return memberTagInfo_module_default.preview;
									},
									chatPeerId,
									peerId,
									get rank() {
										return langPack_default.format(PREVIEWS.member, true);
									},
									role: "member",
									cropped: true
								}), null);
								insert(_el$, createComponent(MemberTagPreview, {
									get ["class"]() {
										return memberTagInfo_module_default.preview;
									},
									chatPeerId,
									peerId,
									get rank() {
										return langPack_default.format(PREVIEWS[sideRole], true);
									},
									role: sideRole,
									cropped: true
								}), null);
								createRenderEffect(() => className(_el$, memberTagInfo_module_default.previews));
								return _el$;
							})()];
						}
					}),
					createComponent(PopupElement.Footer, {
						get ["class"]() {
							return memberTagInfo_module_default.footer;
						},
						get children() {
							return canEditMine ? createComponent(PopupElement.FooterButton, {
								langKey: myRank ? "MemberTag.Info.EditMine" : "MemberTag.Info.AddMine",
								callback: editMine
							}) : [(() => {
								var _el$3 = _tmpl$2();
								insert(_el$3, createComponent(I18nTsx, { key: "MemberTag.Info.AdminsOnly" }));
								createRenderEffect(() => className(_el$3, memberTagInfo_module_default.adminsOnly));
								return _el$3;
							})(), createComponent(PopupElement.FooterButton, { langKey: "MemberTag.Info.Understood" })];
						}
					})
				];
			}
		});
	});
}
//#endregion
export { showMemberTagInfoPopup as default };
