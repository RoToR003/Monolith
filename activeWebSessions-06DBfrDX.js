//# allFunctionsCalledOnLoad
import { C as createSignal, i as For, p as createComponent, s as Show } from "./solid-9Vxm0VIz.js";
import { r as useHotReloadGuard } from "./hotReloadGuard-BUNVkeQ4.js";
import { t as Button } from "./buttonTsx-Bwphkm9r.js";
import { F as formatDateAccordingToTodayNew } from "./index-B7axFZql.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { t as joinSessionParts } from "./joinSessionParts-BAWE5-8v.js";
//#region src/components/sidebarLeft/tabs/activeWebSessions.tsx
var ActiveWebSessions = () => {
	const [tab] = useSuperTab();
	const { Row, confirmationPopup, toastNew, wrapPeerTitle, AvatarNewTsx, PeerTitleTsx } = useHotReloadGuard();
	const [sessions, setSessions] = createSignal(tab.payload || []);
	const disconnectAll = async () => {
		try {
			await confirmationPopup({
				descriptionLangKey: "AreYouSureWebSessions",
				button: {
					langKey: "Disconnect",
					isDanger: true
				}
			});
		} catch (err) {
			return;
		}
		try {
			await tab.managers.appSeamlessLoginManager.resetWebAuthorizations();
			tab.close();
		} catch (err) {
			toastNew({ langPackKey: "Error.AnError" });
		}
	};
	const disconnect = async (session) => {
		const peerId = session.bot_id.toPeerId();
		try {
			await confirmationPopup({
				descriptionLangKey: "TerminateWebSessionText",
				descriptionLangArgs: [await wrapPeerTitle({ peerId })],
				button: {
					langKey: "Disconnect",
					isDanger: true
				}
			});
		} catch (err) {
			return;
		}
		try {
			await tab.managers.appSeamlessLoginManager.resetWebAuthorization(session.hash);
			const left = sessions().filter((item) => item !== session);
			if (!left.length) {
				tab.close();
				return;
			}
			setSessions(left);
		} catch (err) {
			toastNew({ langPackKey: "Error.AnError" });
		}
	};
	const WebSessionRow = (props) => {
		const session = () => props.session;
		const peerId = () => session().bot_id.toPeerId();
		return createComponent(Row, {
			"class": "session-row",
			clickable: () => disconnect(session()),
			role: "button",
			tabIndex: 0,
			get children() {
				return [
					createComponent(Row.Media, {
						size: "big",
						get children() {
							return createComponent(AvatarNewTsx, {
								get peerId() {
									return peerId();
								},
								size: 48
							});
						}
					}),
					createComponent(Row.Title, {
						get titleRight() {
							return formatDateAccordingToTodayNew(/* @__PURE__ */ new Date(Math.max(session().date_active, session().date_created) * 1e3));
						},
						get children() {
							return createComponent(PeerTitleTsx, { get peerId() {
								return peerId();
							} });
						}
					}),
					createComponent(Row.Midtitle, { get children() {
						return joinSessionParts([
							{ ltr: session().domain },
							session().browser,
							session().platform
						], ", ");
					} }),
					createComponent(Row.Subtitle, { get children() {
						return joinSessionParts([{ ltr: session().ip }, session().region], " - ");
					} })
				];
			}
		});
	};
	return [createComponent(Section, {
		caption: "ClearOtherWebSessionsHelp",
		get children() {
			return createComponent(Button, {
				"class": "btn-primary btn-transparent danger",
				icon: "stop",
				text: "TerminateAllWebSessions",
				onClick: disconnectAll
			});
		}
	}), createComponent(Show, {
		get when() {
			return sessions().length;
		},
		get children() {
			return createComponent(Section, {
				name: "OtherWebSessions",
				caption: "TerminateWebSessionInfo",
				get children() {
					return createComponent(For, {
						get each() {
							return sessions();
						},
						children: (session) => createComponent(WebSessionRow, { session })
					});
				}
			});
		}
	})];
};
//#endregion
export { ActiveWebSessions as default };
