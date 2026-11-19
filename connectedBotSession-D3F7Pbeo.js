//# allFunctionsCalledOnLoad
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { a as i18n } from "./langPack-BmdJGr44.js";
import { C as createSignal, p as createComponent, s as Show, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { c as insert, g as template, o as className, s as delegateEvents } from "./web-BPyQozky.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { t as Button } from "./buttonTsx-Bwphkm9r.js";
import { P as formatDate } from "./index-B7axFZql.js";
import { A as AvatarNewTsx, i as Row, t as confirmationPopup } from "./confirmationPopup-Bz6mK0o-.js";
import { x as isSameUserId } from "./getChatMigratedTo-ChhMNXuu.js";
import { t as MediaHeader } from "./mediaHeader-CnpQNwOl.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { r as toastNew } from "./toast-B6VD5M7R.js";
import { t as PeerTitleTsx } from "./peerTitleTsx-DcpEYRoE.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { n as sessionDetails_module_default, t as SessionInfoRow } from "./sessionInfoRow-4lMxlo9s.js";
//#region src/components/sidebarLeft/tabs/connectedBotSession.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div>`);
var _tmpl$2 = /*#__PURE__*/ template(`<button type=button>`);
function ConnectedBotSessionTab() {
	const [tab] = useSuperTab();
	const [connectedBot, setConnectedBot] = createSignal(tab.payload.connectedBot);
	const botId = () => connectedBot().bot_id;
	tab.listenerSetter.add(rootScope)("chat_automation_update", (bot) => {
		if (!bot || !isSameUserId(bot.bot_id, botId())) {
			tab.close();
			return;
		}
		setConnectedBot(bot);
	});
	const openAutomation = () => {
		tab.slider.createTab(hotReloadGuard.tabs.AppChatAutomationTab).open({ connectedBot: connectedBot() });
	};
	const terminate = async () => {
		try {
			await confirmationPopup({
				titleLangKey: "AreYouSureSessionTitle",
				descriptionLangKey: "TerminateSessionText",
				button: {
					langKey: "Terminate",
					isDanger: true
				}
			});
		} catch (err) {
			return;
		}
		try {
			await tab.managers.appBusinessManager.updateConnectedBot({ previousBotId: botId() });
		} catch (err) {
			toastNew({ langPackKey: "Error.AnError" });
		}
	};
	return [
		createComponent(MediaHeader, {
			get ["class"]() {
				return sessionDetails_module_default.heroHeader;
			},
			get children() {
				return [
					createComponent(MediaHeader.Sticker, {
						size: 100,
						get element() {
							return createComponent(AvatarNewTsx, {
								get peerId() {
									return botId().toPeerId(false);
								},
								size: 100
							});
						}
					}),
					createComponent(MediaHeader.Title, { get children() {
						return createComponent(PeerTitleTsx, { get peerId() {
							return botId().toPeerId(false);
						} });
					} }),
					createComponent(MediaHeader.Subtitle, { get children() {
						return [(() => {
							var _el$ = _tmpl$();
							insert(_el$, () => i18n("ChatAutomation.Session"));
							return _el$;
						})(), (() => {
							var _el$2 = _tmpl$2();
							_el$2.$$click = () => hotReloadGuard.appImManager.setInnerPeer({ peerId: botId().toPeerId(false) });
							insert(_el$2, createComponent(PeerTitleTsx, {
								get peerId() {
									return botId().toPeerId(false);
								},
								username: true
							}));
							createRenderEffect(() => className(_el$2, sessionDetails_module_default.profileLink));
							return _el$2;
						})()];
					} })
				];
			}
		}),
		createComponent(Section, {
			name: "ChatAutomation.ConnectedFrom",
			get children() {
				return [
					createComponent(SessionInfoRow, {
						get label() {
							return i18n("ChatAutomation.SessionDevice");
						},
						get value() {
							return connectedBot().device;
						},
						get valueClass() {
							return sessionDetails_module_default.deviceValue;
						}
					}),
					createComponent(Show, {
						get when() {
							return connectedBot().date;
						},
						children: (date) => createComponent(SessionInfoRow, {
							get label() {
								return i18n("ChatAutomation.SessionDate");
							},
							get value() {
								return formatDate(/* @__PURE__ */ new Date(date() * 1e3), {
									withTime: true,
									shortMonth: true
								});
							}
						})
					}),
					createComponent(SessionInfoRow, {
						get label() {
							return i18n("ChatAutomation.SessionLocation");
						},
						get value() {
							return connectedBot().location;
						}
					})
				];
			}
		}),
		createComponent(Section, { get children() {
			return createComponent(Row, {
				get ["class"]() {
					return sessionDetails_module_default.manageRow;
				},
				clickable: openAutomation,
				role: "button",
				tabIndex: 0,
				get children() {
					return createComponent(Row.Title, { get children() {
						return i18n("ChatAutomation.ManageAutomation");
					} });
				}
			});
		} }),
		createComponent(Section, { get children() {
			return createComponent(Button, {
				"class": "btn-primary btn-transparent danger",
				icon: "stop",
				text: "ChatAutomation.TerminateSession",
				onClick: terminate
			});
		} })
	];
}
delegateEvents(["click"]);
//#endregion
export { ConnectedBotSessionTab as default };
