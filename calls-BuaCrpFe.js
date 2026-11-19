//# allFunctionsCalledOnLoad
import { t as noop } from "./noop-H9NNBLfX.js";
import { ft as IS_CALL_SUPPORTED, lt as IS_GROUP_CALL_SUPPORTED } from "./apiManagerProxy-DmQXvxSF.js";
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { n as logger } from "./logger-7zf0rNYS.js";
import { a as i18n } from "./langPack-BmdJGr44.js";
import { C as createSignal, M as onCleanup, N as onMount, _ as createMemo, g as createEffect, i as For, p as createComponent, s as Show, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { t as getServerMessageId } from "./getServerMessageId-1hhP4U5Q.js";
import { a as reconcile, n as createStore } from "./store-PwRn5fa3.js";
import { s as useAppConfig } from "./contentSettings-DMhHR-0w.js";
import { c as insert, g as template, o as className, u as memo } from "./web-BPyQozky.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
import { t as IconTsx } from "./iconTsx-B4lOk4A6.js";
import { t as Button } from "./buttonTsx-Bwphkm9r.js";
import { B as formatTime, L as formatFullSentTime } from "./index-B7axFZql.js";
import { r as GrowHeightReveal } from "./animations-DCmLIda3.js";
import { A as AvatarNewTsx, i as Row, t as confirmationPopup } from "./confirmationPopup-Bz6mK0o-.js";
import { i as usePromiseCollector } from "./mediaHeader-CnpQNwOl.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { r as toastNew } from "./toast-B6VD5M7R.js";
import { t as ButtonMenuToggle } from "./buttonMenuToggle-1aKRQh1m.js";
import { t as PeerTitleTsx } from "./peerTitleTsx-DcpEYRoE.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { t as ChatType } from "./chatType-C89v744i.js";
import { t as showDeleteMessagesPopup } from "./deleteMessages-HZOHTHZe.js";
import { t as IS_CONFERENCE_CALL_SUPPORTED } from "./conferenceCallSupport-C1xXX2wS.js";
//#region src/lib/calls/helpers/callLog.ts
function isCallLogMessage(message) {
	const action = message?.action;
	return action?._ === "messageActionPhoneCall" || action?._ === "messageActionConferenceCall";
}
function getCallLogDirection(message) {
	if (message.pFlags.out) return "out";
	const action = message.action;
	if (action._ === "messageActionConferenceCall") return action.pFlags.missed ? "missed" : "in";
	return action.duration === void 0 && (action.reason._ === "phoneCallDiscardReasonMissed" || action.reason._ === "phoneCallDiscardReasonBusy") ? "missed" : "in";
}
/** Local calendar day, the granularity calls are grouped by. */
function getDayKey(dateSec) {
	const date = /* @__PURE__ */ new Date(dateSec * 1e3);
	return `${date.getFullYear()}_${date.getMonth()}_${date.getDate()}`;
}
/**
* Collapses a newest-first run of call messages into rows. Non-adjacent calls
* never merge, so an A → B → A sequence stays three rows, exactly as it does in
* tdesktop (where the row is found by an id range) and Android.
*/
function groupCallLogMessages(messages) {
	const groups = [];
	let group;
	let groupDayKey;
	for (const message of messages) {
		const direction = getCallLogDirection(message);
		const dayKey = getDayKey(message.date);
		if (!group || group.peerId !== message.peerId || group.direction !== direction || groupDayKey !== dayKey) {
			const { action } = message;
			group = {
				id: `${message.peerId}_${message.mid}`,
				peerId: message.peerId,
				direction,
				video: !!action.pFlags.video,
				conferenceMsgId: action._ === "messageActionConferenceCall" ? getServerMessageId(message.mid) : void 0,
				mids: [],
				date: message.date
			};
			groupDayKey = dayKey;
			groups.push(group);
		}
		group.mids.push(message.mid);
	}
	return groups;
}
var calls_module_default = {
	list: "_list_djkh4_1",
	status: "_status_djkh4_5",
	arrow: "_arrow_djkh4_11",
	out: "_out_djkh4_18",
	missed: "_missed_djkh4_21",
	text: "_text_djkh4_25",
	empty: "_empty_djkh4_31",
	emptyTitle: "_emptyTitle_djkh4_40",
	emptyDescription: "_emptyDescription_djkh4_45"
};
//#endregion
//#region src/components/sidebarLeft/tabs/calls.tsx
var _tmpl$ = /*#__PURE__*/ template(`<span>`);
var _tmpl$2 = /*#__PURE__*/ template(`<div><div></div><div>`);
var PER_PAGE_COUNT = 100;
var CALL_LOG_FILTER = { _: "inputMessagesFilterPhoneCalls" };
var log = logger("CALLS-TAB");
function isToday(dateSec) {
	const a = /* @__PURE__ */ new Date(dateSec * 1e3);
	const b = /* @__PURE__ */ new Date();
	return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
/**
* "12:30" today, "Yesterday at 12:30" the day before, "Feb 3 at 12:30" earlier —
* tdesktop's `lng_call_box_status_*`, built out of tweb's own date helpers.
* More than one call in the row prefixes the count, as every client does.
*/
function CallStatusText(props) {
	const time = () => {
		const { date } = props.group;
		return isToday(date) ? formatTime(/* @__PURE__ */ new Date(date * 1e3)) : formatFullSentTime(date);
	};
	return (() => {
		var _el$ = _tmpl$();
		insert(_el$, (() => {
			var _c$ = memo(() => props.group.mids.length > 1);
			return () => _c$() ? i18n("Calls.Status.Group", [props.group.mids.length, time()]) : time();
		})());
		createRenderEffect(() => className(_el$, calls_module_default.text));
		return _el$;
	})();
}
function CallRow(props) {
	const isConference = () => props.group.conferenceMsgId !== void 0;
	const callBack = () => {
		const { group } = props;
		if (group.conferenceMsgId !== void 0) {
			hotReloadGuard.appImManager.joinConference({
				_: "inputGroupCallInviteMessage",
				msg_id: group.conferenceMsgId
			}, { inviterPeerId: group.peerId }).catch(noop);
			return;
		}
		hotReloadGuard.appImManager.callUser(group.peerId.toUserId(), group.video ? "video" : "voice").catch(noop);
	};
	const showInChat = () => {
		hotReloadGuard.appImManager.setInnerPeer({
			peerId: props.group.peerId,
			lastMsgId: props.group.mids[0]
		});
	};
	const canCallBack = () => props.group.peerId.isUser() && (isConference() ? IS_CONFERENCE_CALL_SUPPORTED : IS_CALL_SUPPORTED);
	return createComponent(Row, {
		clickable: showInChat,
		role: "button",
		tabIndex: 0,
		contextMenu: { buttons: [{
			icon: "message",
			text: "Message.Context.Goto",
			onClick: showInChat
		}, {
			icon: "delete",
			className: "danger",
			text: "Delete",
			onClick: () => props.onDelete(props.group)
		}] },
		get children() {
			return [
				createComponent(Row.Media, {
					size: "abitbigger",
					get children() {
						return createComponent(AvatarNewTsx, {
							get peerId() {
								return props.group.peerId;
							},
							size: 42,
							isDialog: true
						});
					}
				}),
				createComponent(Row.Title, {
					"class": "text-bold",
					get children() {
						return createComponent(PeerTitleTsx, {
							get peerId() {
								return props.group.peerId;
							},
							withIcons: true
						});
					}
				}),
				createComponent(Row.Subtitle, { get children() {
					var _el$2 = _tmpl$();
					insert(_el$2, createComponent(IconTsx, {
						icon: "arrow_next",
						get ["class"]() {
							return classNames(calls_module_default.arrow, props.group.direction === "out" && calls_module_default.out, props.group.direction === "missed" && calls_module_default.missed);
						}
					}), null);
					insert(_el$2, createComponent(CallStatusText, { get group() {
						return props.group;
					} }), null);
					createRenderEffect(() => className(_el$2, calls_module_default.status));
					return _el$2;
				} }),
				createComponent(Show, {
					get when() {
						return canCallBack();
					},
					get children() {
						return createComponent(Row.RightContent, { get children() {
							return createComponent(Button.Icon, {
								get icon() {
									return memo(() => !!isConference())() ? "group" : props.group.video ? "videocamera" : "phone";
								},
								get ["aria-label"]() {
									return i18n("CallBack").textContent;
								},
								tabIndex: 0,
								"on:click": (e) => {
									e.stopPropagation();
									callBack();
								}
							});
						} });
					}
				})
			];
		}
	});
}
/**
* Chats whose group call is running right now. tdesktop shows the same block
* above the log (calls_box_controller.cpp:848) and, like it, this reads the
* cached chat list instead of asking the server.
*/
function ActiveGroupCalls() {
	const [tab] = useSuperTab();
	const [calls, setCalls] = createSignal([]);
	const update = () => {
		tab.managers.appGroupCallsManager.getActiveGroupCalls().then(setCalls, noop);
	};
	onMount(() => {
		update();
		tab.listenerSetter.add(rootScope)("chat_update", update);
		tab.listenerSetter.add(rootScope)("group_call_update", update);
	});
	return createComponent(GrowHeightReveal, {
		get when() {
			return calls().length;
		},
		appear: false,
		get children() {
			return createComponent(Section, {
				name: "Calls.ActiveVideoChats",
				get contentProps() {
					return { class: calls_module_default.list };
				},
				get children() {
					return createComponent(For, {
						get each() {
							return calls();
						},
						children: (call) => createComponent(Row, {
							clickable: () => hotReloadGuard.appImManager.setInnerPeer({ peerId: call.peerId }),
							role: "button",
							tabIndex: 0,
							get children() {
								return [
									createComponent(Row.Media, {
										size: "abitbigger",
										get children() {
											return createComponent(AvatarNewTsx, {
												get peerId() {
													return call.peerId;
												},
												size: 42,
												isDialog: true
											});
										}
									}),
									createComponent(Row.Title, {
										"class": "text-bold",
										get children() {
											return createComponent(PeerTitleTsx, {
												get peerId() {
													return call.peerId;
												},
												withIcons: true
											});
										}
									}),
									createComponent(Row.Subtitle, { get children() {
										return i18n(call.rtmp ? "PeerInfo.Action.LiveStream" : "PeerInfo.Action.VoiceChat");
									} }),
									createComponent(Row.RightContent, { get children() {
										return createComponent(Button.Icon, {
											get icon() {
												return call.rtmp ? "livestream" : "videochat";
											},
											get ["aria-label"]() {
												return i18n("VoiceChat.Topbar.Join").textContent;
											},
											tabIndex: 0,
											"on:click": (e) => {
												e.stopPropagation();
												(call.rtmp ? hotReloadGuard.appImManager.joinLiveStream(call.peerId) : hotReloadGuard.appImManager.joinGroupCall(call.peerId)).catch(noop);
											}
										});
									} })
								];
							}
						})
					});
				}
			});
		}
	});
}
var Calls = () => {
	const [tab] = useSuperTab();
	const promiseCollector = usePromiseCollector();
	const appConfig = useAppConfig();
	const [messages, setMessages] = createSignal([]);
	const [groups, setGroups] = createStore({ list: [] });
	const [loaded, setLoaded] = createSignal(false);
	let loading = false;
	let offsetId = 0;
	const isEmpty = createMemo(() => loaded() && !groups.list.length);
	createEffect(() => {
		setGroups("list", reconcile(groupCallLogMessages(messages()), {
			key: "id",
			merge: false
		}));
	});
	const addMessages = (added) => {
		if (!added.length) return;
		setMessages((current) => {
			const byMid = new Map(current.map((message) => [message.mid, message]));
			added.forEach((message) => byMid.set(message.mid, message));
			return Array.from(byMid.values()).sort((a, b) => b.mid - a.mid);
		});
	};
	const removeMessages = (peerId, mids) => {
		setMessages((current) => {
			const next = current.filter((message) => !(message.peerId === peerId && mids.has(message.mid)));
			return next.length === current.length ? current : next;
		});
	};
	const loadMore = () => {
		if (loading || loaded()) return;
		loading = true;
		const promise = tab.managers.appMessagesManager.getHistory({
			inputFilter: CALL_LOG_FILTER,
			offsetId,
			limit: PER_PAGE_COUNT
		}).then((result) => {
			const found = result.messages || [];
			const last = found[found.length - 1];
			if (last) offsetId = last.mid;
			if (found.length < PER_PAGE_COUNT) {
				setLoaded(true);
				tab.scrollable.onScrolledBottom = null;
			}
			addMessages(found.filter(isCallLogMessage));
		}, (error) => {
			log.error("loading the call log failed", error);
		}).finally(() => {
			loading = false;
			if (!loaded()) tab.scrollable.checkForTriggers();
		});
		promiseCollector.collect(promise);
	};
	const deleteGroup = (group) => {
		showDeleteMessagesPopup(group.peerId, group.mids.slice(), ChatType.Chat);
	};
	const clearAll = async () => {
		let revoke;
		try {
			revoke = await confirmationPopup({
				titleLangKey: "DeleteAllCalls",
				descriptionLangKey: "DeleteAllCallsText",
				checkbox: { text: "DeleteCallsForEveryone" },
				button: {
					langKey: "Delete",
					isDanger: true
				}
			});
		} catch {
			return;
		}
		try {
			await tab.managers.appMessagesManager.deletePhoneCallHistory(revoke);
		} catch (error) {
			log.error("clearing the call log failed", error);
			toastNew({ langPackKey: "Error.AnError" });
		}
	};
	onMount(() => {
		tab.container.classList.add("calls-container");
		const buttonMenu = ButtonMenuToggle({
			icon: "more",
			direction: "bottom-left",
			buttons: [{
				icon: "settings",
				text: "AccountSettings.SpeakersAndCamera",
				onClick: () => {
					tab.slider.createTab(hotReloadGuard.tabs.AppSpeakersAndCameraTab).open();
				}
			}, {
				icon: "delete",
				className: "danger",
				text: "DeleteAllCalls",
				onClick: clearAll,
				verify: () => !!groups.list.length
			}]
		});
		tab.header.append(buttonMenu);
		tab.listenerSetter.add(rootScope)("history_multiappend", (message) => {
			if (isCallLogMessage(message)) addMessages([message]);
		});
		tab.listenerSetter.add(rootScope)("history_delete", ({ peerId, msgs }) => {
			removeMessages(peerId, msgs);
		});
		tab.scrollable.onScrolledBottom = loadMore;
		loadMore();
		tab.shown.then(() => {
			if (!loaded()) tab.scrollable.checkForTriggers();
		});
	});
	onCleanup(() => {
		tab.scrollable.onScrolledBottom = null;
	});
	return [
		createComponent(ActiveGroupCalls, {}),
		createComponent(Show, {
			when: IS_CONFERENCE_CALL_SUPPORTED && IS_GROUP_CALL_SUPPORTED,
			get children() {
				return createComponent(Section, {
					get caption() {
						return appConfig.conference_call_size_limit ? "ConferenceCall.Create.Description" : void 0;
					},
					get captionArgs() {
						return [appConfig.conference_call_size_limit];
					},
					get children() {
						return createComponent(Row, {
							clickable: () => tab.slider.createTab(hotReloadGuard.tabs.AppNewCallTab).open(),
							role: "button",
							tabIndex: 0,
							get children() {
								return [createComponent(Row.Icon, { icon: "phone_filled" }), createComponent(Row.Title, { get children() {
									return i18n("ConferenceCall.Create.Action");
								} })];
							}
						});
					}
				});
			}
		}),
		createComponent(Show, {
			get when() {
				return groups.list.length;
			},
			get children() {
				return createComponent(Section, {
					get contentProps() {
						return { class: calls_module_default.list };
					},
					get children() {
						return createComponent(For, {
							get each() {
								return groups.list;
							},
							children: (group) => createComponent(CallRow, {
								group,
								onDelete: deleteGroup
							})
						});
					}
				});
			}
		}),
		createComponent(Show, {
			get when() {
				return isEmpty();
			},
			get children() {
				var _el$3 = _tmpl$2(), _el$4 = _el$3.firstChild, _el$5 = _el$4.nextSibling;
				insert(_el$4, () => i18n("NoRecentCalls"));
				insert(_el$5, () => i18n("NoRecentCallsInfo"));
				createRenderEffect((_p$) => {
					var _v$ = calls_module_default.empty, _v$2 = calls_module_default.emptyTitle, _v$3 = calls_module_default.emptyDescription;
					_v$ !== _p$.e && className(_el$3, _p$.e = _v$);
					_v$2 !== _p$.t && className(_el$4, _p$.t = _v$2);
					_v$3 !== _p$.a && className(_el$5, _p$.a = _v$3);
					return _p$;
				}, {
					e: void 0,
					t: void 0,
					a: void 0
				});
				return _el$3;
			}
		})
	];
};
//#endregion
export { Calls as default };
