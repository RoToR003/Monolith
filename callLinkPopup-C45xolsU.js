//# allFunctionsCalledOnLoad
const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["qr-code-styling-Da7gbEhC.js","rolldown-runtime-CwcJO0Gh.js"])))=>i.map(i=>d[i]);
import { i as __toESM } from "./rolldown-runtime-CwcJO0Gh.js";
import { t as noop } from "./noop-H9NNBLfX.js";
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { a as i18n } from "./langPack-BmdJGr44.js";
import { C as createSignal, N as onMount, p as createComponent, s as Show, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { t as __vitePreload } from "./preload-helper-B0NHKCoo.js";
import { n as bindManagersToSession } from "./bindManagersToAccount-BL82O9H9.js";
import { _ as use, c as insert, g as template, o as className, u as memo } from "./web-BPyQozky.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
import { n as attachClickEvent } from "./clickEvent-COk4YpLP.js";
import { i as createPopup, n as PopupElement } from "./indexTsx-v9mB9bAq.js";
import { t as Button } from "./button-DpTvniRN.js";
import { t as confirmationPopup } from "./confirmationPopup-Bz6mK0o-.js";
import { $t as CallLogo } from "./appDialogsManager-CXguiKc3.js";
import { t as MediaHeader } from "./mediaHeader-CnpQNwOl.js";
import { t as anchorCallback } from "./anchorCallback-BbwAJdBk.js";
import { r as toastNew } from "./toast-B6VD5M7R.js";
import { n as shareUrlToPeers } from "./shareUrl-BIbwyho4.js";
import { t as InviteLink } from "./inviteLink-DcZkMktu.js";
import { t as createListenerSetter } from "./createListenerSetter-B9GrRG19.js";
import { t as DelimiterWithText } from "./giveaway-nNKsrrB6.js";
import { t as copyQrCode } from "./copyQrCode-CAS2rxXu.js";
import { n as paintQrCode } from "./paintQrCode-Bw30UIn4.js";
var linkQrCode_module_default = {
	popup: "_popup_f34oc_1",
	body: "_body_f34oc_5",
	card: "_card_f34oc_12",
	qr: "_qr_f34oc_24",
	about: "_about_f34oc_29"
};
//#endregion
//#region src/components/popups/linkQrCode.tsx
var _tmpl$$1 = /*#__PURE__*/ template(`<div>`);
/** 240pt of code inside a 256pt card (QrCodeScreen.swift:653-654). */
var QR_SIZE = 240;
function showLinkQrCodePopup(options) {
	const { url, aboutLangKey } = options;
	const [show, setShow] = createSignal(false);
	let blob;
	const onCopyClick = async () => {
		const outcome = await copyQrCode({
			blob,
			url
		});
		toastNew({ langPackKey: outcome === "image" ? "QRCode.Copied" : outcome === "link" ? "LinkCopied" : "Error.AnError" });
	};
	function Code() {
		let host;
		const [painted, setPainted] = createSignal(false);
		onMount(async () => {
			try {
				const QRCodeStylingCtor = await __vitePreload(() => import("./qr-code-styling-Da7gbEhC.js").then((m) => /* @__PURE__ */ __toESM(m.default)).then((m) => m.default), __vite__mapDeps([0,1]));
				const style = getComputedStyle(document.documentElement);
				(await paintQrCode({
					data: url,
					size: QR_SIZE,
					host,
					background: "#ffffff",
					foreground: "#000000",
					logoColor: style.getPropertyValue("--primary-color").trim() || "#000000",
					canvasClass: linkQrCode_module_default.qr,
					QRCodeStylingCtor
				})).canvas.toBlob((baked) => {
					blob = baked;
				}, "image/png");
				setPainted(true);
			} catch (err) {
				console.error("QR code paint failed", err);
			}
		});
		return [createComponent(PopupElement.Body, {
			get ["class"]() {
				return linkQrCode_module_default.body;
			},
			get children() {
				return [(() => {
					var _el$ = _tmpl$$1();
					var _ref$ = host;
					typeof _ref$ === "function" ? use(_ref$, _el$) : host = _el$;
					createRenderEffect(() => className(_el$, linkQrCode_module_default.card));
					return _el$;
				})(), (() => {
					var _el$2 = _tmpl$$1();
					insert(_el$2, () => i18n(aboutLangKey));
					createRenderEffect(() => className(_el$2, classNames(linkQrCode_module_default.about, "text-overflow-wrap")));
					return _el$2;
				})()];
			}
		}), createComponent(PopupElement.Footer, { get children() {
			return createComponent(PopupElement.FooterButton, {
				iconLeft: "copy",
				get langKey() {
					return painted() ? "QRCode.Copy" : "CopyLink";
				},
				callback: onCopyClick
			});
		} })];
	}
	createPopup(() => createComponent(PopupElement, {
		get ["class"]() {
			return linkQrCode_module_default.popup;
		},
		get show() {
			return show();
		},
		closable: true,
		old: true,
		get children() {
			return [createComponent(PopupElement.Header, { get children() {
				return [createComponent(PopupElement.CloseButton, {}), createComponent(PopupElement.Title, { title: "InviteLink.QRCode.Title" })];
			} }), createComponent(Code, {})];
		}
	}));
	queueMicrotask(() => setShow(true));
}
var callLinkPopup_module_default = {
	popup: "_popup_11e2g_1",
	header: "_header_11e2g_5",
	inviteLink: "_inviteLink_11e2g_9",
	inviteLinkLast: "_inviteLinkLast_11e2g_14",
	joinLine: "_joinLine_11e2g_18"
};
//#endregion
//#region src/components/call/callLinkPopup.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div>`);
/**
* The slug a conference invite link carries. tdesktop pulls it out of the link
* the same way (`ExtractConferenceSlug`, calls_group_common.cpp:528) rather
* than keeping it beside the link.
*/
function extractConferenceSlug(link) {
	return /[?&#]slug=([^&#]+)/.exec(link)?.[1] || /\/call\/([^/?&#]+)/.exec(link)?.[1];
}
/**
* "Call Link" — the box tdesktop shows once a conference exists only as a link
* (`ShowConferenceCallLinkBox`, calls_group_common.cpp:283). Same shape as the
* join box it is a sibling of: logo, title, one line of explanation, then the
* link itself and what you can do with it.
*/
function showCallLinkPopup(options) {
	const { initial, callId, canManage } = options;
	const [link, setLink] = createSignal(options.link);
	const [show, setShow] = createSignal(false);
	const share = () => {
		setShow(false);
		shareUrlToPeers({
			url: link(),
			multiSelect: true,
			toastKey: "InviteLinkSentSingle",
			toastKeyForMany: "InviteLinkSentMany"
		});
	};
	/**
	* `reset_invite_hash` is how tdesktop revokes a call link
	* (calls_group_common.cpp:315-337): reset it, then show the box again on the
	* link the server just minted.
	*/
	const revoke = async () => {
		const { appGroupCallsManager } = bindManagersToSession(rootScope.managers);
		await confirmationPopup({
			titleLangKey: "RevokeLink",
			descriptionLangKey: "CallLink.RevokeAlert",
			button: {
				langKey: "RevokeButton",
				isDanger: true
			}
		});
		try {
			await appGroupCallsManager.toggleGroupCallSettings(callId, { resetInviteHash: true });
			const newLink = await appGroupCallsManager.exportGroupCallInvite(callId);
			setLink(newLink);
			inviteLink.setUrl(newLink);
			toastNew({ langPackKey: "CallLink.Revoked" });
		} catch (err) {
			console.error("revoke call link failed", err);
			toastNew({ langPackKey: "Error.AnError" });
		}
	};
	const listenerSetter = createListenerSetter();
	const shareButton = Button("", { text: "Share" });
	const copyButton = Button("", { text: "Copy" });
	attachClickEvent(shareButton, () => share(), { listenerSetter });
	attachClickEvent(copyButton, () => inviteLink.copyLink(), { listenerSetter });
	const inviteLink = new InviteLink({
		listenerSetter,
		url: options.link,
		class: classNames(callLinkPopup_module_default.inviteLink, !initial && callLinkPopup_module_default.inviteLinkLast),
		buttons: [
			{
				icon: "copy",
				text: "CopyLink",
				onClick: () => inviteLink.copyLink()
			},
			{
				icon: "qr",
				text: "InviteLink.ContextGetQRCode",
				onClick: () => showLinkQrCodePopup({
					url: link(),
					aboutLangKey: "InviteLink.QRCode.InfoGroupCall"
				})
			},
			{
				icon: "delete",
				className: "danger",
				text: "RevokeLink",
				onClick: () => void revoke().catch(noop),
				verify: () => !!callId && !initial && !!canManage
			}
		],
		button: [shareButton, copyButton]
	});
	const join = () => {
		const slug = extractConferenceSlug(link());
		if (!slug) {
			toastNew({ langPackKey: "Error.AnError" });
			return;
		}
		setShow(false);
		hotReloadGuard.appImManager.joinConference({
			_: "inputGroupCallSlug",
			slug
		}, { confirmed: true }).catch(noop);
	};
	createPopup(() => createComponent(PopupElement, {
		get ["class"]() {
			return callLinkPopup_module_default.popup;
		},
		get show() {
			return show();
		},
		closable: true,
		old: true,
		get children() {
			return [createComponent(PopupElement.Header, {
				get ["class"]() {
					return callLinkPopup_module_default.header;
				},
				get children() {
					return createComponent(PopupElement.CloseButton, {});
				}
			}), createComponent(PopupElement.Body, {
				"class": "text-overflow-wrap",
				get children() {
					return [
						createComponent(MediaHeader, {
							marginTop: true,
							get children() {
								return [
									createComponent(CallLogo, { icon: "link" }),
									createComponent(MediaHeader.Title, { get children() {
										return i18n("CallLink.Title");
									} }),
									createComponent(MediaHeader.Subtitle, {
										color: "secondary",
										get children() {
											return i18n("CallLink.About");
										}
									})
								];
							}
						}),
						memo(() => inviteLink.container),
						createComponent(Show, {
							when: initial,
							get children() {
								return [createComponent(DelimiterWithText, { langKey: "PremiumOr" }), (() => {
									var _el$ = _tmpl$();
									insert(_el$, () => i18n("CallLink.Join", [(() => {
										const a = anchorCallback(join);
										a.classList.add("primary");
										a.append(i18n("CallLink.JoinLink"));
										return a;
									})()]));
									createRenderEffect(() => className(_el$, classNames("text-center", "secondary", callLinkPopup_module_default.joinLine)));
									return _el$;
								})()];
							}
						})
					];
				}
			})];
		}
	}));
	queueMicrotask(() => setShow(true));
}
//#endregion
export { showCallLinkPopup as default };
