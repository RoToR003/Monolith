//# allFunctionsCalledOnLoad
import { a as i18n, f as getDirection, u as langPack_default } from "./langPack-BmdJGr44.js";
import { i as For, p as createComponent, s as Show, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { c as insert, f as setAttribute, g as template, u as memo } from "./web-BPyQozky.js";
import { r as useHotReloadGuard } from "./hotReloadGuard-BUNVkeQ4.js";
import { E as wrapTelegramUrlToAnchor, u as wrapRichText } from "./renderer-L80wjxct.js";
import { t as I18nTsx } from "./i18n-CGMFiAW0.js";
import { o as createMiddleware } from "./sticker-5twBOy1Y.js";
import { P as formatDate } from "./index-B7axFZql.js";
import { mn as getParticipantPeerId } from "./getChatMigratedTo-ChhMNXuu.js";
import { U as getPeerId } from "./canPollPeerStories-D3HoBvLX.js";
import { l as formatDuration, r as wrapFormattedDuration } from "./wrapDuration-BQgz9hDF.js";
import { t as makeDateFromTimestamp } from "./makeDateFromTimestamp-DyurlyPl.js";
import { a as participantRightsMap, i as TopicName, o as removeChatBannedRightsFromParticipant, s as isBannedParticipant, t as diffFlags } from "./utils-B5WAc8p7.js";
import { t as resolveAdminRightFlagI18n } from "./adminRightsI18nResolver-oCYjSlYl.js";
import { t as Space } from "./space-XGOOgiuc.js";
import { c as isMessage, d as linkColor, f as makeTime, r as generateTail } from "./utils-BnbsfEKH.js";
import { r as prepareTextWithEntitiesForCopying } from "./prepareTextWithEntitiesForCopying-CwW8yyp7.js";
//#region src/components/chat/bubbleParts/minimalBubbleMessageContent.tsx
var _tmpl$$1 = /*#__PURE__*/ template(`<div class="name colored-name next-is-message">`);
var _tmpl$2$1 = /*#__PURE__*/ template(`<div class=bubble-content-wrapper><div class=bubble-content><div class="message spoilers-container"><div class=time><div class=time-inner></div></div><div class=clearfix>`);
var MinimalBubbleMessageContent = (props) => {
	return (() => {
		var _el$ = _tmpl$2$1(), _el$2 = _el$.firstChild, _el$4 = _el$2.firstChild, _el$5 = _el$4.firstChild, _el$6 = _el$5.firstChild;
		insert(_el$2, createComponent(Show, {
			get when() {
				return props.name;
			},
			get children() {
				var _el$3 = _tmpl$$1();
				insert(_el$3, () => props.name);
				return _el$3;
			}
		}), _el$4);
		insert(_el$4, () => props.children, _el$5);
		insert(_el$5, () => makeTime(props.date), _el$6);
		insert(_el$6, () => makeTime(props.date));
		insert(_el$2, generateTail, null);
		createRenderEffect(() => setAttribute(_el$4, "dir", getDirection()));
		return _el$;
	})();
};
//#endregion
//#region src/components/chat/bubbleParts/adminLogsResolver/reply.tsx
var Reply = (props) => {
	const { wrapReply } = useHotReloadGuard();
	const content = () => {
		const middleware = createMiddleware().get();
		const container = wrapReply({
			setColorPeerId: props.colorPeerId,
			title: props.title,
			quote: {
				text: props.text,
				entities: props.entities
			},
			middleware
		}).container;
		container.classList.add("margin-0");
		return container;
	};
	return memo(content);
};
//#endregion
//#region src/components/chat/bubbleParts/adminLogsResolver/copyTextHelpers.ts
function getDateTextForCopy(timestamp) {
	const date = makeDateFromTimestamp(timestamp);
	return formatDate(date, { withTime: true }).textContent || "";
}
function formatDurationAsText(seconds) {
	return wrapFormattedDuration(formatDuration(seconds), true);
}
function extractBanChanges(action, channelId, apiManagerProxy) {
	const isBanned = isBannedParticipant(action.new_participant);
	const prevBannedParticipant = action.prev_participant?._ === "channelParticipantBanned" ? action.prev_participant : void 0;
	const newBannedParticipant = action.new_participant?._ === "channelParticipantBanned" ? action.new_participant : void 0;
	const channel = apiManagerProxy.getChat(channelId);
	const removeDefaultRights = (rights) => channel?._ === "channel" && rights ? removeChatBannedRightsFromParticipant(channel, rights) : rights;
	const participantPeerId = getParticipantPeerId(action.prev_participant || action.new_participant);
	const participantUser = apiManagerProxy.getUser(participantPeerId.toUserId());
	const username = participantUser?.username || "";
	const diff = diffFlags(removeDefaultRights(prevBannedParticipant?.banned_rights)?.pFlags, removeDefaultRights(newBannedParticipant?.banned_rights)?.pFlags);
	const removed = diff.new.map((key) => participantRightsMap[key]).filter(Boolean).map((key) => langPack_default.format(key, true));
	return {
		isBanned,
		participantPeerId,
		participantUser,
		username,
		added: diff.old.map((key) => participantRightsMap[key]).filter(Boolean).map((key) => langPack_default.format(key, true)),
		removed
	};
}
function extractAdminChanges(action, apiManagerProxy, isBroadcast) {
	const prevParticipantRights = "admin_rights" in action.prev_participant ? action.prev_participant.admin_rights : null;
	const newParticipantRights = "admin_rights" in action.new_participant ? action.new_participant.admin_rights : null;
	const diff = diffFlags(prevParticipantRights?.pFlags, newParticipantRights?.pFlags);
	const participantPeerId = getParticipantPeerId(action.prev_participant || action.new_participant);
	const participantUser = apiManagerProxy.getUser(participantPeerId.toUserId());
	return {
		participantPeerId,
		participantUser,
		username: participantUser?.username || "",
		added: diff.new.map((key) => langPack_default.format(resolveAdminRightFlagI18n(key, { isBroadcast }), true)),
		removed: diff.old.map((key) => langPack_default.format(resolveAdminRightFlagI18n(key, { isBroadcast }), true))
	};
}
function extractDefaultRightsChanges(action) {
	const diff = diffFlags(action.prev_banned_rights?.pFlags, action.new_banned_rights?.pFlags);
	return {
		added: diff.old.map((key) => participantRightsMap[key]).filter(Boolean).map((key) => langPack_default.format(key, true)),
		removed: diff.new.map((key) => participantRightsMap[key]).filter(Boolean).map((key) => langPack_default.format(key, true))
	};
}
function getMessageTextWithEntities(message) {
	return message._ === "message" ? {
		text: message.message,
		entities: message.entities
	} : {
		text: "",
		entities: []
	};
}
async function createSimpleServiceCopyText(timestamp, peerId, formatText) {
	const { getPeerTitle } = useHotReloadGuard();
	const dateText = getDateTextForCopy(timestamp);
	return { text: `${formatText(await getPeerTitle({
		peerId,
		plainText: true
	}))} [${dateText}]` };
}
async function createMessageCopyText(timestamp, peerId, message, formatText) {
	const { getPeerTitle } = useHotReloadGuard();
	const dateText = getDateTextForCopy(timestamp);
	const text = formatText(await getPeerTitle({
		peerId,
		plainText: true
	}));
	return prepareTextWithEntitiesForCopying(getMessageTextWithEntities(message), [`${text} [${dateText}]`]);
}
async function createPreviousValueCopyText(timestamp, peerId, formatMainText, newValue, prevValue, formatPreviousLabel) {
	const { getPeerTitle } = useHotReloadGuard();
	const dateText = getDateTextForCopy(timestamp);
	return { text: `${formatMainText(await getPeerTitle({
		peerId,
		plainText: true
	}))} [${dateText}]\n${newValue}\n\n${formatPreviousLabel()}:\n${prevValue}` };
}
async function createMultiLineCopyText(timestamp, peerId, buildLines) {
	const { getPeerTitle } = useHotReloadGuard();
	const dateText = getDateTextForCopy(timestamp);
	return { text: buildLines(await getPeerTitle({
		peerId,
		plainText: true
	}), dateText).join("\n") };
}
async function createMessageWithPreviousCopyText(timestamp, peerId, newMessage, prevMessage, formatMainText, formatPreviousLabel) {
	const { getPeerTitle } = useHotReloadGuard();
	const dateText = getDateTextForCopy(timestamp);
	const mainText = formatMainText(await getPeerTitle({
		peerId,
		plainText: true
	}));
	const previousLabel = formatPreviousLabel();
	return prepareTextWithEntitiesForCopying([getMessageTextWithEntities(newMessage), getMessageTextWithEntities(prevMessage)], [`${mainText} [${dateText}]`, `${previousLabel}:`]);
}
async function createTwoPeerCopyText(timestamp, peerId, secondPeerId, formatText) {
	const { getPeerTitle } = useHotReloadGuard();
	const dateText = getDateTextForCopy(timestamp);
	return { text: `${formatText(await getPeerTitle({
		peerId,
		plainText: true
	}), await getPeerTitle({
		peerId: secondPeerId,
		plainText: true
	}))} [${dateText}]` };
}
//#endregion
//#region src/components/chat/bubbleParts/adminLogsResolver/index.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div class=service-msg>`);
var _tmpl$2 = /*#__PURE__*/ template(`<div>+ `);
var _tmpl$3 = /*#__PURE__*/ template(`<div>- `);
var defaultBubbleClass = "can-have-tail has-fake-service is-forced-rounded";
function makeSimpleServiceEntry(key, peerId, event, makePeerTitle) {
	return {
		type: "service",
		Content: () => i18n(key, [makePeerTitle(peerId)]),
		getCopyText: () => createSimpleServiceCopyText(event.date, peerId, (peerTitle) => langPack_default.format(key, true, [peerTitle]))
	};
}
function makeSimpleServiceEntryWithArgs(key, peerId, event, makePeerTitle, extraArgs) {
	return {
		type: "service",
		Content: () => i18n(key, [makePeerTitle(peerId), ...extraArgs]),
		getCopyText: () => createSimpleServiceCopyText(event.date, peerId, (peerTitle) => langPack_default.format(key, true, [peerTitle, ...extraArgs]))
	};
}
function makeToggleServiceEntry(condition, trueKey, falseKey, peerId, event, makePeerTitle) {
	return makeSimpleServiceEntry(condition ? trueKey : falseKey, peerId, event, makePeerTitle);
}
function makeTwoPeerServiceEntry(key, peerId, secondPeerId, event, makePeerTitle) {
	return {
		type: "service",
		Content: () => i18n(key, [makePeerTitle(peerId), makePeerTitle(secondPeerId)]),
		getCopyText: () => createTwoPeerCopyText(event.date, peerId, secondPeerId, (peerTitle, secondTitle) => langPack_default.format(key, true, [peerTitle, secondTitle]))
	};
}
function makeDefaultMessageEntry(key, message, peerId, event, makePeerTitle) {
	return {
		type: "default",
		message,
		ServiceContent: () => i18n(key, [makePeerTitle(peerId)]),
		getCopyText: () => createMessageCopyText(event.date, peerId, message, (peerTitle) => langPack_default.format(key, true, [peerTitle]))
	};
}
function makeTopicServiceEntry(key, topic, peerId, event, makePeerTitle) {
	return {
		type: "service",
		Content: () => createComponent(I18nTsx, {
			key,
			get args() {
				return [makePeerTitle(peerId), createComponent(TopicName, { topic })];
			}
		}),
		getCopyText: () => createSimpleServiceCopyText(event.date, peerId, (peerTitle) => {
			const topicTitle = topic._ === "forumTopicDeleted" ? "" : topic.title;
			return langPack_default.format(key, true, [peerTitle, topicTitle]);
		})
	};
}
function makeDurationToggleServiceEntry(enabledKey, disabledKey, durationValue, peerId, event, makePeerTitle) {
	const key = durationValue ? enabledKey : disabledKey;
	return {
		type: "service",
		Content: () => {
			if (durationValue) {
				const duration = wrapFormattedDuration(formatDuration(durationValue));
				return i18n(key, [makePeerTitle(peerId), duration]);
			} else return i18n(key, [makePeerTitle(peerId)]);
		},
		getCopyText: async () => {
			const { getPeerTitle } = useHotReloadGuard();
			const dateText = getDateTextForCopy(event.date);
			const peerTitle = await getPeerTitle({
				peerId,
				plainText: true
			});
			if (durationValue) {
				const duration = formatDurationAsText(durationValue);
				return { text: `${langPack_default.format(key, true, [peerTitle, duration])} [${dateText}]` };
			} else return { text: `${langPack_default.format(key, true, [peerTitle])} [${dateText}]` };
		}
	};
}
function makeRankServiceEntry(action, event, makePeerTitle) {
	let key;
	if (action.user_id === event.user_id) {
		if (action.new_rank) key = action.prev_rank ? "EventLogRankSelfEdit" : "EventLogRankSelfAdd";
		else key = "EventLogRankSelfRemove";
	} else if (action.new_rank) key = action.prev_rank ? "EventLogRankEdit" : "EventLogRankAdd";
	else key = "EventLogRankRemove";
	const adminPeerId = event.user_id.toPeerId(false);
	const targetPeerId = action.user_id.toPeerId(false);
	const prevRank = action.prev_rank || "";
	const newRank = action.new_rank || "";
	return {
		type: "service",
		Content: () => i18n(key, [
			makePeerTitle(adminPeerId),
			makePeerTitle(targetPeerId),
			prevRank,
			newRank
		]),
		getCopyText: () => createTwoPeerCopyText(event.date, adminPeerId, targetPeerId, (peerTitle, secondTitle) => langPack_default.format(key, true, [
			peerTitle,
			secondTitle,
			prevRank,
			newRank
		]))
	};
}
var adminLogsMap = {
	"channelAdminLogEventActionChangeTitle": ({ isBroadcast, action, peerId, makePeerTitle, event }) => makeSimpleServiceEntryWithArgs(isBroadcast ? "AdminLog.ChangeTitleChannel" : "AdminLog.ChangeTitleGroup", peerId, event, makePeerTitle, [action.new_value]),
	"channelAdminLogEventActionChangeAbout": ({ isBroadcast, action, event, peerId, makePeerTitle, makeMessagePeerTitle, isOut }) => {
		const key = isBroadcast ? "AdminLog.ChangeAboutChannel" : "AdminLog.ChangeAboutGroup";
		return {
			type: "regular",
			bubbleClass: defaultBubbleClass,
			Content: () => {
				return [(() => {
					var _el$ = _tmpl$();
					insert(_el$, createComponent(I18nTsx, {
						key,
						get args() {
							return [makePeerTitle(peerId)];
						}
					}));
					return _el$;
				})(), createComponent(MinimalBubbleMessageContent, {
					get date() {
						return makeDateFromTimestamp(event.date);
					},
					get name() {
						return isOut ? null : makeMessagePeerTitle(peerId);
					},
					get children() {
						return [
							memo(() => wrapRichText(action.new_value)),
							createComponent(Space, { amount: "0.5rem" }),
							createComponent(Reply, {
								colorPeerId: peerId,
								get title() {
									return i18n("AdminRecentActions.PreviousDescription");
								},
								get text() {
									return action.prev_value;
								}
							})
						];
					}
				})];
			},
			getCopyText: () => createPreviousValueCopyText(event.date, peerId, (peerTitle) => langPack_default.format(key, true, [peerTitle]), action.new_value, action.prev_value, () => langPack_default.format("AdminRecentActions.PreviousDescription", true))
		};
	},
	"channelAdminLogEventActionChangeUsername": ({ isBroadcast, event, action, peerId, makePeerTitle, makeMessagePeerTitle, isOut }) => {
		const key = action.new_value ? isBroadcast ? "AdminLog.ChangeLinkChannel" : "AdminLog.ChangeLinkGroup" : isBroadcast ? "AdminLog.RemovedLinkChannel" : "AdminLog.RemovedLinkGroup";
		return {
			type: "regular",
			bubbleClass: defaultBubbleClass,
			Content: () => {
				const anchor = (() => {
					if (!action.new_value) return;
					const link = `t.me/${action.new_value}`;
					const anchor = wrapTelegramUrlToAnchor(link);
					anchor.textContent = link;
					return anchor;
				})();
				return [(() => {
					var _el$2 = _tmpl$();
					insert(_el$2, createComponent(I18nTsx, {
						key,
						get args() {
							return [makePeerTitle(peerId)];
						}
					}));
					return _el$2;
				})(), createComponent(MinimalBubbleMessageContent, {
					get date() {
						return makeDateFromTimestamp(event.date);
					},
					get name() {
						return isOut ? null : makeMessagePeerTitle(peerId);
					},
					get children() {
						return [createComponent(Show, {
							when: anchor,
							get children() {
								return [anchor, createComponent(Space, { amount: "0.5rem" })];
							}
						}), createComponent(Show, {
							get when() {
								return action.prev_value;
							},
							get children() {
								return createComponent(Reply, {
									colorPeerId: peerId,
									get title() {
										return i18n("AdminRecentActions.PreviousLink");
									},
									get text() {
										return `https://t.me/${action.prev_value}`;
									}
								});
							}
						})];
					}
				})];
			},
			getCopyText: () => createMultiLineCopyText(event.date, peerId, (peerTitle, dateText) => {
				const previousLabel = langPack_default.format("AdminRecentActions.PreviousLink", true);
				const lines = [`${langPack_default.format(key, true, [peerTitle])} [${dateText}]`];
				if (action.new_value) lines.push(`https://t.me/${action.new_value}`);
				if (action.prev_value) lines.push(`${previousLabel}: https://t.me/${action.prev_value}`);
				return lines;
			})
		};
	},
	"channelAdminLogEventActionChangePhoto": ({ isBroadcast, peerId, makePeerTitle, event }) => makeSimpleServiceEntry(isBroadcast ? "AdminLog.ChangePhotoChannel" : "AdminLog.ChangePhotoGroup", peerId, event, makePeerTitle),
	"channelAdminLogEventActionToggleInvites": ({ action, peerId, makePeerTitle, event }) => makeToggleServiceEntry(action.new_value, "AdminLog.ToggleInvitesEnabled", "AdminLog.ToggleInvitesDisabled", peerId, event, makePeerTitle),
	"channelAdminLogEventActionToggleSignatures": ({ action, peerId, makePeerTitle, event }) => makeToggleServiceEntry(action.new_value, "AdminLog.ToggleSignaturesEnabled", "AdminLog.ToggleSignaturesDisabled", peerId, event, makePeerTitle),
	"channelAdminLogEventActionUpdatePinned": ({ action, peerId, makePeerTitle, event }) => {
		if (!isMessage(action.message)) return null;
		return makeDefaultMessageEntry(action.message._ === "message" && action.message.pFlags?.pinned ? "AdminLog.PinnedMessage" : "AdminLog.UnpinnedMessage", action.message, peerId, event, makePeerTitle);
	},
	"channelAdminLogEventActionEditMessage": ({ action, peerId, makePeerTitle, event }) => {
		if (!isMessage(action.new_message)) return null;
		const key = "AdminLog.EditedMessage";
		return {
			type: "default",
			message: action.new_message,
			colorPeerId: peerId,
			originalMessage: isMessage(action.prev_message) ? action.prev_message : null,
			ServiceContent: () => i18n(key, [makePeerTitle(peerId)]),
			getCopyText: () => createMessageWithPreviousCopyText(event.date, peerId, action.new_message, action.prev_message, (peerTitle) => langPack_default.format(key, true, [peerTitle]), () => langPack_default.format("AdminRecentActions.PreviousMessage", true))
		};
	},
	"channelAdminLogEventActionDeleteMessage": ({ action, peerId, makePeerTitle, event }) => isMessage(action.message) ? makeDefaultMessageEntry("AdminLog.DeletedMessage", action.message, peerId, event, makePeerTitle) : null,
	"channelAdminLogEventActionParticipantJoin": ({ isBroadcast, peerId, makePeerTitle, event }) => makeSimpleServiceEntry(isBroadcast ? "AdminLog.ParticipantJoinedChannel" : "AdminLog.ParticipantJoinedGroup", peerId, event, makePeerTitle),
	"channelAdminLogEventActionParticipantLeave": ({ isBroadcast, peerId, makePeerTitle, event }) => makeSimpleServiceEntry(isBroadcast ? "AdminLog.ParticipantLeftChannel" : "AdminLog.ParticipantLeftGroup", peerId, event, makePeerTitle),
	"channelAdminLogEventActionParticipantInvite": ({ peerId, action, makePeerTitle, event }) => makeTwoPeerServiceEntry("AdminLog.ParticipantInvited", peerId, getParticipantPeerId(action.participant), event, makePeerTitle),
	"channelAdminLogEventActionParticipantToggleBan": ({ event, action, channelId, peerId, makeMessagePeerTitle, makePeerTitle, isOut }) => ({
		type: "regular",
		bubbleClass: defaultBubbleClass,
		Content: () => {
			const isBanned = isBannedParticipant(action.new_participant);
			const { apiManagerProxy } = useHotReloadGuard();
			const prevBannedParticipant = action.prev_participant?._ === "channelParticipantBanned" ? action.prev_participant : void 0;
			const newBannedParticipant = action.new_participant?._ === "channelParticipantBanned" ? action.new_participant : void 0;
			const channel = apiManagerProxy.getChat(channelId);
			const removeDefaultRights = (rights) => channel?._ === "channel" && rights ? removeChatBannedRightsFromParticipant(channel, rights) : rights;
			const participantPeerId = getParticipantPeerId(action.prev_participant || action.new_participant);
			const username = apiManagerProxy.getUser(participantPeerId.toUserId())?.username || "";
			const diff = diffFlags(removeDefaultRights(prevBannedParticipant?.banned_rights)?.pFlags, removeDefaultRights(newBannedParticipant?.banned_rights)?.pFlags);
			const removed = diff.new.map((key) => participantRightsMap[key]).filter(Boolean).map((key) => i18n(key));
			const added = diff.old.map((key) => participantRightsMap[key]).filter(Boolean).map((key) => i18n(key));
			return createComponent(MinimalBubbleMessageContent, {
				get date() {
					return makeDateFromTimestamp(event.date);
				},
				get name() {
					return isOut ? null : makeMessagePeerTitle(peerId);
				},
				get children() {
					return [
						createComponent(Show, {
							when: isBanned,
							get children() {
								return createComponent(I18nTsx, {
									key: username ? "AdminLog.ParticipantBannedUsername" : "AdminLog.ParticipantBanned",
									get args() {
										return [linkColor(makePeerTitle(participantPeerId)), username ? linkColor(`@${username}`) : ""];
									}
								});
							}
						}),
						createComponent(Show, {
							when: !isBanned,
							get children() {
								return createComponent(I18nTsx, {
									key: username ? "AdminLog.ParticipantPermissionsToggledUsername" : "AdminLog.ParticipantPermissionsToggled",
									get args() {
										return [linkColor(makePeerTitle(participantPeerId)), username ? linkColor(`@${username}`) : ""];
									}
								});
							}
						}),
						createComponent(Show, {
							when: !isBanned,
							get children() {
								return [
									createComponent(Space, { amount: "0.5rem" }),
									createComponent(For, {
										each: added,
										children: (key) => (() => {
											var _el$3 = _tmpl$2();
											_el$3.firstChild;
											insert(_el$3, key, null);
											return _el$3;
										})()
									}),
									createComponent(For, {
										each: removed,
										children: (key) => (() => {
											var _el$5 = _tmpl$3();
											_el$5.firstChild;
											insert(_el$5, key, null);
											return _el$5;
										})()
									})
								];
							}
						})
					];
				}
			});
		},
		getCopyText: async () => {
			const dateText = getDateTextForCopy(event.date);
			const { apiManagerProxy, getPeerTitle } = useHotReloadGuard();
			const { isBanned, participantPeerId, added, removed } = extractBanChanges(action, channelId, apiManagerProxy);
			const participantName = await getPeerTitle({
				peerId: participantPeerId,
				plainText: true
			});
			const lines = [`${await getPeerTitle({
				peerId,
				plainText: true
			})} [${dateText}]`];
			lines.push(langPack_default.format(isBanned ? "AdminLog.ParticipantBanned" : "AdminLog.ParticipantPermissionsToggled", true, [participantName]));
			added.forEach((perm) => lines.push(`+ ${perm}`));
			removed.forEach((perm) => lines.push(`- ${perm}`));
			return { text: lines.join("\n") };
		}
	}),
	"channelAdminLogEventActionParticipantToggleAdmin": ({ event, action, peerId, makePeerTitle, makeMessagePeerTitle, isBroadcast, isOut }) => ({
		type: "regular",
		bubbleClass: defaultBubbleClass,
		Content: () => {
			const { apiManagerProxy } = useHotReloadGuard();
			const prevParticipantRights = "admin_rights" in action.prev_participant ? action.prev_participant.admin_rights : null;
			const newParticipantRights = "admin_rights" in action.new_participant ? action.new_participant.admin_rights : null;
			const diff = diffFlags(prevParticipantRights?.pFlags, newParticipantRights?.pFlags);
			const participantPeerId = getParticipantPeerId(action.prev_participant || action.new_participant);
			const username = apiManagerProxy.getUser(participantPeerId.toUserId())?.username || "";
			const added = diff.new.map((key) => i18n(resolveAdminRightFlagI18n(key, { isBroadcast })));
			const removed = diff.old.map((key) => i18n(resolveAdminRightFlagI18n(key, { isBroadcast })));
			return createComponent(MinimalBubbleMessageContent, {
				get date() {
					return makeDateFromTimestamp(event.date);
				},
				get name() {
					return isOut ? null : makeMessagePeerTitle(peerId);
				},
				get children() {
					return [
						createComponent(I18nTsx, {
							key: username ? "AdminLog.AdminPermissionsChangedUsername" : "AdminLog.AdminPermissionsChanged",
							get args() {
								return [linkColor(makePeerTitle(participantPeerId)), username ? linkColor(`@${username}`) : ""];
							}
						}),
						createComponent(Space, { amount: "0.5rem" }),
						createComponent(For, {
							each: added,
							children: (key) => (() => {
								var _el$7 = _tmpl$2();
								_el$7.firstChild;
								insert(_el$7, key, null);
								return _el$7;
							})()
						}),
						createComponent(For, {
							each: removed,
							children: (key) => (() => {
								var _el$9 = _tmpl$3();
								_el$9.firstChild;
								insert(_el$9, key, null);
								return _el$9;
							})()
						})
					];
				}
			});
		},
		getCopyText: async () => {
			const dateText = getDateTextForCopy(event.date);
			const { apiManagerProxy, getPeerTitle } = useHotReloadGuard();
			const { participantPeerId, added, removed } = extractAdminChanges(action, apiManagerProxy, isBroadcast);
			const participantName = await getPeerTitle({
				peerId: participantPeerId,
				plainText: true
			});
			const lines = [`${await getPeerTitle({
				peerId,
				plainText: true
			})} [${dateText}]`];
			lines.push(langPack_default.format("AdminLog.AdminPermissionsChanged", true, [participantName]));
			added.forEach((perm) => lines.push(`+ ${perm}`));
			removed.forEach((perm) => lines.push(`- ${perm}`));
			return { text: lines.join("\n") };
		}
	}),
	"channelAdminLogEventActionChangeStickerSet": ({ peerId, makePeerTitle, event }) => makeSimpleServiceEntry("AdminLog.ChangeStickerSet", peerId, event, makePeerTitle),
	"channelAdminLogEventActionTogglePreHistoryHidden": ({ action, peerId, makePeerTitle, event }) => makeToggleServiceEntry(action.new_value, "AdminLog.TogglePreHistoryHiddenEnabled", "AdminLog.TogglePreHistoryHiddenDisabled", peerId, event, makePeerTitle),
	"channelAdminLogEventActionDefaultBannedRights": ({ event, action, peerId, makeMessagePeerTitle, isOut }) => ({
		type: "regular",
		bubbleClass: defaultBubbleClass,
		Content: () => {
			const diff = diffFlags(action.prev_banned_rights?.pFlags, action.new_banned_rights?.pFlags);
			const added = diff.old.map((key) => participantRightsMap[key]).filter(Boolean).map((key) => i18n(key));
			const removed = diff.new.map((key) => participantRightsMap[key]).filter(Boolean).map((key) => i18n(key));
			return createComponent(MinimalBubbleMessageContent, {
				get date() {
					return makeDateFromTimestamp(event.date);
				},
				get name() {
					return isOut ? null : makeMessagePeerTitle(peerId);
				},
				get children() {
					return [
						createComponent(I18nTsx, { key: "AdminLog.DefaultBannedRightsChanged" }),
						createComponent(Space, { amount: "0.5rem" }),
						createComponent(For, {
							each: added,
							children: (key) => (() => {
								var _el$1 = _tmpl$2();
								_el$1.firstChild;
								insert(_el$1, key, null);
								return _el$1;
							})()
						}),
						createComponent(For, {
							each: removed,
							children: (key) => (() => {
								var _el$11 = _tmpl$3();
								_el$11.firstChild;
								insert(_el$11, key, null);
								return _el$11;
							})()
						})
					];
				}
			});
		},
		getCopyText: async () => {
			const { getPeerTitle } = useHotReloadGuard();
			const dateText = getDateTextForCopy(event.date);
			const peerTitle = await getPeerTitle({
				peerId,
				plainText: true
			});
			const { added, removed } = extractDefaultRightsChanges(action);
			const lines = [`${peerTitle} [${dateText}]`];
			lines.push(langPack_default.format("AdminLog.DefaultBannedRightsChanged", true, [peerTitle]));
			added.forEach((perm) => lines.push(`+ ${perm}`));
			removed.forEach((perm) => lines.push(`- ${perm}`));
			return { text: lines.join("\n") };
		}
	}),
	"channelAdminLogEventActionStopPoll": ({ action, peerId, makePeerTitle, event }) => isMessage(action.message) ? makeDefaultMessageEntry("AdminLog.PollStopped", action.message, peerId, event, makePeerTitle) : null,
	"channelAdminLogEventActionChangeLinkedChat": ({ peerId, makePeerTitle, event }) => makeSimpleServiceEntry("AdminLog.ChangeLinkedChat", peerId, event, makePeerTitle),
	"channelAdminLogEventActionChangeLocation": ({ isBroadcast, peerId, makePeerTitle, event }) => makeSimpleServiceEntry(isBroadcast ? "AdminLog.ChangeLocationChannel" : "AdminLog.ChangeLocationGroup", peerId, event, makePeerTitle),
	"channelAdminLogEventActionToggleSlowMode": ({ action, peerId, makePeerTitle, event }) => makeDurationToggleServiceEntry("AdminLog.ToggleSlowModeSet", "AdminLog.ToggleSlowModeDisabled", action.new_value, peerId, event, makePeerTitle),
	"channelAdminLogEventActionStartGroupCall": ({ peerId, makePeerTitle, event }) => makeSimpleServiceEntry("AdminLog.StartGroupCall", peerId, event, makePeerTitle),
	"channelAdminLogEventActionDiscardGroupCall": ({ peerId, makePeerTitle, event }) => makeSimpleServiceEntry("AdminLog.DiscardGroupCall", peerId, event, makePeerTitle),
	"channelAdminLogEventActionParticipantMute": ({ peerId, action, makePeerTitle, event }) => makeTwoPeerServiceEntry("AdminLog.ParticipantMuted", getPeerId(action.participant?.peer), peerId, event, makePeerTitle),
	"channelAdminLogEventActionParticipantUnmute": ({ peerId, action, makePeerTitle, event }) => makeTwoPeerServiceEntry("AdminLog.ParticipantUnmuted", getPeerId(action.participant?.peer), peerId, event, makePeerTitle),
	"channelAdminLogEventActionToggleGroupCallSetting": ({ action, peerId, makePeerTitle, event }) => makeToggleServiceEntry(action.join_muted, "AdminLog.ToggleGroupCallSettingEnabled", "AdminLog.ToggleGroupCallSettingDisabled", peerId, event, makePeerTitle),
	"channelAdminLogEventActionParticipantJoinByInvite": ({ peerId, makePeerTitle, event }) => makeSimpleServiceEntry("AdminLog.ParticipantJoinedByInvite", peerId, event, makePeerTitle),
	"channelAdminLogEventActionExportedInviteDelete": ({ peerId, makePeerTitle, event }) => makeSimpleServiceEntry("AdminLog.ExportedInviteDeleted", peerId, event, makePeerTitle),
	"channelAdminLogEventActionExportedInviteRevoke": ({ peerId, makePeerTitle, event }) => makeSimpleServiceEntry("AdminLog.ExportedInviteRevoked", peerId, event, makePeerTitle),
	"channelAdminLogEventActionExportedInviteEdit": ({ peerId, makePeerTitle, event }) => makeSimpleServiceEntry("AdminLog.ExportedInviteEdit", peerId, event, makePeerTitle),
	"channelAdminLogEventActionParticipantVolume": ({ peerId, action, makePeerTitle, event }) => makeTwoPeerServiceEntry("AdminLog.ParticipantVolumeChanged", getPeerId(action.participant?.peer), peerId, event, makePeerTitle),
	"channelAdminLogEventActionChangeHistoryTTL": ({ action, peerId, makePeerTitle, event }) => makeDurationToggleServiceEntry("AdminLog.ChangeHistoryTTLEnabled", "AdminLog.ChangeHistoryTTLDisabled", action.new_value, peerId, event, makePeerTitle),
	"channelAdminLogEventActionParticipantJoinByRequest": ({ peerId, action, makePeerTitle, event }) => makeTwoPeerServiceEntry("AdminLog.ParticipantJoinedByRequest", peerId, action.approved_by.toPeerId(), event, makePeerTitle),
	"channelAdminLogEventActionToggleNoForwards": ({ action, peerId, makePeerTitle, event }) => makeToggleServiceEntry(action.new_value, "AdminLog.ToggleNoForwardsEnabled", "AdminLog.ToggleNoForwardsDisabled", peerId, event, makePeerTitle),
	"channelAdminLogEventActionSendMessage": ({ action, peerId, makePeerTitle, event }) => isMessage(action.message) ? makeDefaultMessageEntry("AdminLog.MessageSent", action.message, peerId, event, makePeerTitle) : null,
	"channelAdminLogEventActionChangeAvailableReactions": ({ peerId, makePeerTitle, event }) => makeSimpleServiceEntry("AdminLog.ChangeAvailableReactions", peerId, event, makePeerTitle),
	"channelAdminLogEventActionChangeUsernames": ({ peerId, makePeerTitle, event }) => makeSimpleServiceEntry("AdminLog.ChangeUsernames", peerId, event, makePeerTitle),
	"channelAdminLogEventActionToggleForum": ({ action, peerId, makePeerTitle, event }) => makeToggleServiceEntry(action.new_value, "AdminLog.ToggleForumEnabled", "AdminLog.ToggleForumDisabled", peerId, event, makePeerTitle),
	"channelAdminLogEventActionCreateTopic": ({ peerId, action, makePeerTitle, event }) => makeTopicServiceEntry("AdminLog.TopicCreated", action.topic, peerId, event, makePeerTitle),
	"channelAdminLogEventActionEditTopic": ({ peerId, action, makePeerTitle, event }) => makeTopicServiceEntry("AdminLog.TopicEdited", action.new_topic, peerId, event, makePeerTitle),
	"channelAdminLogEventActionDeleteTopic": ({ peerId, action, makePeerTitle, event }) => makeTopicServiceEntry("AdminLog.TopicDeleted", action.topic, peerId, event, makePeerTitle),
	"channelAdminLogEventActionPinTopic": ({ action, peerId, makePeerTitle, event }) => {
		return makeTopicServiceEntry(!!action.new_topic ? "AdminLog.TopicPinned" : "AdminLog.TopicUnpinned", action.new_topic ? action.new_topic : action.prev_topic, peerId, event, makePeerTitle);
	},
	"channelAdminLogEventActionToggleAntiSpam": ({ action, peerId, makePeerTitle, event }) => makeToggleServiceEntry(action.new_value, "AdminLog.ToggleAntiSpamEnabled", "AdminLog.ToggleAntiSpamDisabled", peerId, event, makePeerTitle),
	"channelAdminLogEventActionChangePeerColor": ({ peerId, makePeerTitle, event }) => makeSimpleServiceEntry("AdminLog.ChangePeerColor", peerId, event, makePeerTitle),
	"channelAdminLogEventActionChangeProfilePeerColor": ({ peerId, makePeerTitle, event }) => makeSimpleServiceEntry("AdminLog.ChangeProfilePeerColor", peerId, event, makePeerTitle),
	"channelAdminLogEventActionChangeWallpaper": ({ peerId, makePeerTitle, event }) => makeSimpleServiceEntry("AdminLog.ChangeWallpaper", peerId, event, makePeerTitle),
	"channelAdminLogEventActionChangeEmojiStatus": ({ peerId, makePeerTitle, event }) => makeSimpleServiceEntry("AdminLog.ChangeEmojiStatus", peerId, event, makePeerTitle),
	"channelAdminLogEventActionChangeEmojiStickerSet": ({ peerId, makePeerTitle, event }) => makeSimpleServiceEntry("AdminLog.ChangeEmojiStickerSet", peerId, event, makePeerTitle),
	"channelAdminLogEventActionToggleSignatureProfiles": ({ action, peerId, makePeerTitle, event }) => makeToggleServiceEntry(action.new_value, "AdminLog.ToggleSignatureProfilesEnabled", "AdminLog.ToggleSignatureProfilesDisabled", peerId, event, makePeerTitle),
	"channelAdminLogEventActionParticipantSubExtend": ({ peerId, makePeerTitle, event }) => makeSimpleServiceEntry("AdminLog.ParticipantSubscriptionExtended", peerId, event, makePeerTitle),
	"channelAdminLogEventActionToggleAutotranslation": ({ action, peerId, makePeerTitle, event }) => makeToggleServiceEntry(action.new_value, "AdminLog.ToggleAutoTranslationEnabled", "AdminLog.ToggleAutoTranslationDisabled", peerId, event, makePeerTitle),
	"channelAdminLogEventActionParticipantEditRank": ({ action, makePeerTitle, event }) => makeRankServiceEntry(action, event, makePeerTitle)
};
var resolveAdminLog = (args) => {
	const { event } = args;
	const resolver = adminLogsMap[event.action._];
	if (!resolver) return null;
	return resolver({
		...args,
		action: event.action
	});
};
//#endregion
export { resolveAdminLog };
