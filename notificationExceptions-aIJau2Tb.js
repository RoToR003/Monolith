//# allFunctionsCalledOnLoad
import { a as i18n } from "./langPack-BmdJGr44.js";
import { _ as createMemo, i as For, p as createComponent, s as Show } from "./solid-9Vxm0VIz.js";
import { t as Button } from "./buttonTsx-Bwphkm9r.js";
import { A as AvatarNewTsx, i as Row, t as confirmationPopup } from "./confirmationPopup-Bz6mK0o-.js";
import { Bt as showMutePopup } from "./appDialogsManager-CXguiKc3.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { a as showPickUserPopup } from "./pickUser-D8S6yVuK.js";
import { t as PeerTitleTsx } from "./peerTitleTsx-DcpEYRoE.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
//#region src/components/sidebarLeft/tabs/notificationExceptions.tsx
var PEER_TYPES = {
	inputNotifyUsers: ["isUser"],
	inputNotifyChats: ["isAnyGroup"],
	inputNotifyBroadcasts: ["isBroadcast"]
};
var NotificationExceptions = () => {
	const [tab] = useSuperTab();
	const { inputKey, exceptions } = tab.payload;
	const { managers } = tab;
	const peerIds = createMemo(() => (exceptions() || []).map(({ peerId }) => peerId));
	const mutedPeerIds = createMemo(() => new Set((exceptions() || []).filter(({ muted }) => muted).map(({ peerId }) => peerId)));
	const resetPeers = (peerIds) => {
		managers.appNotificationsManager.resetPeersNotifySettings(peerIds);
	};
	const addException = () => {
		showPickUserPopup({
			titleLangKey: "NotificationsAddAnException",
			placeholder: "Search",
			filterPeerTypeBy: PEER_TYPES[inputKey],
			exceptSelf: true,
			excludeMonoforums: true,
			excludePeerIds: new Set(peerIds()),
			onSelect: ([{ peerId }]) => showMutePopup(peerId)
		});
	};
	const deleteAll = async () => {
		try {
			await confirmationPopup({
				titleLangKey: "NotificationsDeleteAllExceptionTitle",
				descriptionLangKey: "NotificationsDeleteAllExceptionAlert",
				button: {
					langKey: "Delete",
					isDanger: true
				}
			});
		} catch (err) {
			return;
		}
		resetPeers(peerIds());
	};
	const ExceptionRow = (props) => {
		const muted = () => mutedPeerIds().has(props.peerId);
		return createComponent(Row, {
			contextMenu: { buttons: [
				{
					icon: "mute",
					text: "ChatList.Context.Mute",
					onClick: () => showMutePopup(props.peerId),
					verify: () => !muted()
				},
				{
					icon: "unmute",
					text: "ChatList.Context.Unmute",
					onClick: () => managers.appMessagesManager.togglePeerMute({
						peerId: props.peerId,
						mute: false
					}),
					verify: muted
				},
				{
					icon: "delete",
					className: "danger",
					text: "Remove",
					onClick: () => resetPeers([props.peerId])
				}
			] },
			get children() {
				return [
					createComponent(Row.Media, {
						size: "abitbigger",
						get children() {
							return createComponent(AvatarNewTsx, {
								get peerId() {
									return props.peerId;
								},
								size: 42,
								isDialog: true
							});
						}
					}),
					createComponent(Row.Title, { get children() {
						return createComponent(PeerTitleTsx, {
							get peerId() {
								return props.peerId;
							},
							withIcons: true
						});
					} }),
					createComponent(Row.Subtitle, { get children() {
						return i18n(muted() ? "NotificationsMuted" : "NotificationsUnmuted");
					} })
				];
			}
		});
	};
	return [createComponent(Section, { get children() {
		return createComponent(Button, {
			"class": "btn-primary btn-transparent primary",
			icon: "add",
			text: "NotificationsAddAnException",
			onClick: addException
		});
	} }), createComponent(Show, {
		get when() {
			return peerIds().length;
		},
		get children() {
			return [createComponent(Section, {
				name: "NotificationsExceptions",
				get children() {
					return createComponent(For, {
						get each() {
							return peerIds();
						},
						children: (peerId) => createComponent(ExceptionRow, { peerId })
					});
				}
			}), createComponent(Section, { get children() {
				return createComponent(Button, {
					"class": "btn-primary btn-transparent danger",
					icon: "delete",
					text: "NotificationsDeleteAllException",
					onClick: deleteAll
				});
			} })];
		}
	})];
};
//#endregion
export { NotificationExceptions as default };
