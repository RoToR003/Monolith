//# allFunctionsCalledOnLoad
import { d as ctx } from "./userAgent-ByGXcznk.js";
import { t as noop } from "./noop-H9NNBLfX.js";
import { n as logger } from "./logger-7zf0rNYS.js";
import { W as createSerializedQueue, en as getDocumentInput, x as isSameUserId } from "./getChatMigratedTo-ChhMNXuu.js";
import { U as getPeerId } from "./canPollPeerStories-D3HoBvLX.js";
//#region src/lib/appManagers/manager.ts
var AppManager = class {
	getAccountNumber() {
		return this.accountNumber;
	}
	createLogger(prefix, logTypes, ignoreDebugReset) {
		return logger(`ACC-${this.accountNumber}-${prefix}`, logTypes, ignoreDebugReset);
	}
	setManagersAndAccountNumber(managers, accountNumber) {
		Object.assign(this, {
			...managers,
			accountNumber
		});
		this.name = this.name ?? "";
		this.log = this.createLogger(this.name, this.logTypes, this.logIgnoreDebugReset);
	}
};
//#endregion
//#region src/lib/appManagers/utils/authorizationAutoconfirmPeriod.ts
var DEFAULT_AUTHORIZATION_AUTOCONFIRM_PERIOD = 604800;
function normalizeAuthorizationAutoconfirmPeriod(period) {
	return period > 0 ? period : DEFAULT_AUTHORIZATION_AUTOCONFIRM_PERIOD;
}
//#endregion
//#region src/lib/appManagers/appBusinessManager.ts
var MAX_TIMEOUT = 2147483647;
function applyBotConnectionReviewUpdate(reviews, update) {
	const withoutBot = reviews.filter((review) => !isSameUserId(review.botId, update.bot_id));
	if (update.pFlags.confirmed) return withoutBot;
	return [{
		botId: update.bot_id,
		date: update.date,
		device: update.device,
		location: update.location
	}, ...withoutBot];
}
function filterExpiredBotConnectionReviews(reviews, now, autoconfirmPeriod = DEFAULT_AUTHORIZATION_AUTOCONFIRM_PERIOD) {
	return reviews.filter((review) => !review.date || review.date + autoconfirmPeriod > now);
}
/**
* What `account.createBusinessChatLink` and `editBusinessChatLink` take: an empty name and no entities
* are left out, as tdesktop's `Api::ChatLinks` sends them.
*/
function toInputBusinessChatLink(draft, getInputEntities) {
	const title = draft.title?.trim();
	const entities = draft.entities?.length ? getInputEntities(draft.entities) : void 0;
	return {
		_: "inputBusinessChatLink",
		message: draft.message,
		entities: entities?.length ? entities : void 0,
		title: title || void 0
	};
}
function normalizeBusinessBotUsername(query) {
	return query.trim().replace(/^(?:https?:\/\/)?(?:www\.)?(?:t|telegram)\.me\//i, "").replace(/^@/, "").split(/[/?#]/)[0].match(/^[a-z\d_]+$/i)?.[0];
}
function toInputBusinessBotRecipients(recipients, getUserInput) {
	return {
		_: "inputBusinessBotRecipients",
		pFlags: { ...recipients?.pFlags },
		users: recipients?.users?.map((userId) => getUserInput(userId)),
		exclude_users: recipients?.exclude_users?.map((userId) => getUserInput(userId))
	};
}
function revokeBusinessBotRecipientAccess(recipients, userId) {
	const withoutUser = (userIds = []) => userIds.filter((id) => !isSameUserId(id, userId));
	const withUser = (userIds = []) => [...withoutUser(userIds), userId];
	const users = recipients.pFlags.exclude_selected ? withUser(recipients.users) : withoutUser(recipients.users);
	const excludeUsers = recipients.pFlags.exclude_selected ? withoutUser(recipients.exclude_users) : withUser(recipients.exclude_users);
	return {
		...recipients,
		pFlags: { ...recipients.pFlags },
		users: users.length ? users : void 0,
		exclude_users: excludeUsers.length ? excludeUsers : void 0
	};
}
var AppBusinessManager = class extends AppManager {
	constructor(..._args) {
		super(..._args);
		this.connectedBotRequestId = 0;
		this.connectedBotMutationQueue = Promise.resolve();
		this.pendingConnectedBotPeerRevokes = /* @__PURE__ */ new Map();
		this.pendingConnectedBotPeerRevokeId = 0;
		this.botConnectionReviews = [];
		this.botConnectionReviewExpirationSchedule = 0;
		this.botConnectionReviewsLoaded = false;
		this.authorizationAutoconfirmPeriod = DEFAULT_AUTHORIZATION_AUTOCONFIRM_PERIOD;
		this.authorizationAutoconfirmPeriodVersion = 0;
		this.chatLinks = /* @__PURE__ */ new Map();
		this.chatLinkWrites = /* @__PURE__ */ new Map();
		this.chatLinkWriteVersion = 0;
		this.chatLinkWritten = /* @__PURE__ */ new Map();
	}
	after() {
		this.rootScope.addEventListener("app_config", (appConfig) => {
			++this.authorizationAutoconfirmPeriodVersion;
			this.setAuthorizationAutoconfirmPeriod(appConfig.authorization_autoconfirm_period, this.botConnectionReviewsLoaded);
		});
		this.apiUpdatesManager.addMultipleEventsListeners({ updateNewBotConnection: (update) => {
			this.loadBotConnectionReviews().then(() => {
				this.setBotConnectionReviews(applyBotConnectionReviewUpdate(this.botConnectionReviews, update));
				this.connectedBotPromise = void 0;
				this.refreshConnectedBot();
			});
		} });
		return this.loadBotConnectionReviews();
	}
	saveBusinessIntro(userId, intro) {
		if (!intro) return;
		intro.sticker = this.appDocsManager.saveDoc(intro.sticker, {
			type: "userFull",
			userId
		});
		return intro;
	}
	/**
	* `account.updateBusinessWorkHours` — pass nothing to stop showing business hours.
	* Mirrors Android's OpeningHoursActivity.processDone.
	*/
	async updateBusinessWorkHours(workHours) {
		const hours = workHours?.weekly_open?.length ? workHours : void 0;
		if (!await this.apiManager.invokeApi("account.updateBusinessWorkHours", { business_work_hours: hours })) throw new Error("ACCOUNT_UPDATE_BUSINESS_WORK_HOURS_FAILED");
		this.appProfileManager.modifyCachedFullUser(this.rootScope.myId.toUserId(), (userFull) => {
			if (hours) userFull.business_work_hours = hours;
			else delete userFull.business_work_hours;
		});
		return hours;
	}
	/**
	* `account.updateBusinessLocation` — pass nothing to remove the location.
	* The geo point is optional: an address alone is a valid business location.
	*/
	async updateBusinessLocation(location) {
		const address = location?.address?.trim();
		const geoPoint = address ? location.geoPoint : void 0;
		if (!await this.apiManager.invokeApi("account.updateBusinessLocation", {
			address: address || void 0,
			geo_point: geoPoint && {
				_: "inputGeoPoint",
				lat: geoPoint.lat,
				long: geoPoint.long
			}
		})) throw new Error("ACCOUNT_UPDATE_BUSINESS_LOCATION_FAILED");
		const businessLocation = address ? {
			_: "businessLocation",
			address,
			geo_point: geoPoint
		} : void 0;
		this.appProfileManager.modifyCachedFullUser(this.rootScope.myId.toUserId(), (userFull) => {
			if (businessLocation) userFull.business_location = businessLocation;
			else delete userFull.business_location;
		});
		return businessLocation;
	}
	/**
	* `account.updateBusinessIntro` — the start page others see in an empty chat with this account.
	* Nothing to show (no title, no message, no sticker) resets it to the default one, as tdesktop's
	* `BusinessInfo::saveChatIntro` does.
	*/
	async updateBusinessIntro(draft) {
		const title = draft?.title?.trim() || "";
		const description = draft?.description?.trim() || "";
		const sticker = draft?.stickerId ? this.appDocsManager.getDoc(draft.stickerId) : void 0;
		const hasIntro = !!(title || description || sticker);
		if (!await this.apiManager.invokeApi("account.updateBusinessIntro", { intro: hasIntro ? {
			_: "inputBusinessIntro",
			title,
			description,
			sticker: sticker ? getDocumentInput(sticker) : void 0
		} : void 0 })) throw new Error("ACCOUNT_UPDATE_BUSINESS_INTRO_FAILED");
		const intro = hasIntro ? {
			_: "businessIntro",
			title,
			description,
			sticker
		} : void 0;
		this.appProfileManager.modifyCachedFullUser(this.rootScope.myId.toUserId(), (userFull) => {
			if (intro) userFull.business_intro = intro;
			else delete userFull.business_intro;
		});
		return intro;
	}
	/**
	* `account.getBusinessChatLinks` — the account's links to chat, in the server's order. Asked once the
	* writes on their way have gone out, so that it has them as the server does; a link written to while
	* it was on its way (from another tab, say) is taken as that write left it, not as the answer has it.
	*/
	async getBusinessChatLinks() {
		await Promise.all([...this.chatLinkWrites.values()].map((queue) => queue.enqueue(noop)));
		const askedAt = this.chatLinkWriteVersion;
		const isWrittenSince = (link) => (this.chatLinkWritten.get(link) ?? 0) > askedAt;
		return this.apiManager.invokeApiSingleProcess({
			method: "account.getBusinessChatLinks",
			params: {},
			processResult: (result) => {
				this.appPeersManager.saveApiPeers(result);
				const chatLinks = /* @__PURE__ */ new Map();
				result.links.forEach((link) => {
					const kept = isWrittenSince(link.link) ? this.chatLinks.get(link.link) : link;
					if (kept) chatLinks.set(link.link, kept);
				});
				this.chatLinks.forEach((link, key) => {
					if (isWrittenSince(key) && !chatLinks.has(key)) chatLinks.set(key, link);
				});
				this.chatLinks = chatLinks;
				return [...chatLinks.values()];
			}
		});
	}
	async createBusinessChatLink(draft) {
		const link = await this.apiManager.invokeApi("account.createBusinessChatLink", { link: this.toInputBusinessChatLink(draft) });
		this.chatLinks.set(link.link, link);
		this.markChatLinkWritten(link.link);
		return link;
	}
	markChatLinkWritten(link) {
		this.chatLinkWritten.set(link, ++this.chatLinkWriteVersion);
	}
	writeBusinessChatLink(link, send) {
		let queue = this.chatLinkWrites.get(link);
		if (!queue) this.chatLinkWrites.set(link, queue = createSerializedQueue());
		return queue.enqueue(async () => {
			this.markChatLinkWritten(link);
			try {
				return await send();
			} finally {
				this.markChatLinkWritten(link);
			}
		});
	}
	/**
	* `account.editBusinessChatLink`. The link itself is the slug the server takes, the way tdesktop
	* and Android pass it; the name and the message are replaced together, so what `changes` leaves out
	* is taken from the link as the edits before this one left it, when this one goes out.
	*/
	editBusinessChatLink(link, changes) {
		return this.writeBusinessChatLink(link, async () => {
			const current = this.chatLinks.get(link);
			if (!current) throw new Error("BUSINESS_CHAT_LINK_NOT_FOUND");
			const draft = {
				message: current.message,
				entities: current.entities,
				title: current.title,
				...changes
			};
			const edited = await this.apiManager.invokeApi("account.editBusinessChatLink", {
				slug: link,
				link: this.toInputBusinessChatLink(draft)
			});
			this.chatLinks.set(link, edited);
			return edited;
		});
	}
	deleteBusinessChatLink(link) {
		return this.writeBusinessChatLink(link, async () => {
			const result = await this.apiManager.invokeApi("account.deleteBusinessChatLink", { slug: link });
			if (!result) throw new Error("ACCOUNT_DELETE_BUSINESS_CHAT_LINK_FAILED");
			this.chatLinks.delete(link);
			return result;
		});
	}
	toInputBusinessChatLink(draft) {
		return toInputBusinessChatLink(draft, (entities) => this.appMessagesManager.getInputEntities(entities));
	}
	resolveBusinessChatLink(slug) {
		return this.apiManager.invokeApiSingleProcess({
			method: "account.resolveBusinessChatLink",
			params: { slug },
			processResult: (resolved) => {
				this.appPeersManager.saveApiPeers(resolved);
				const peerId = getPeerId(resolved.peer);
				const { message, entities } = resolved;
				return {
					peerId,
					message,
					entities
				};
			}
		});
	}
	getConnectedBot(overwrite) {
		if (this.connectedBotPromise && !overwrite) return this.connectedBotPromise;
		const previousRequestId = this.connectedBotRequestId;
		const previousPendingRequestId = this.connectedBotRequestPendingId;
		const requestId = this.connectedBotRequestId = previousRequestId + 1;
		this.connectedBotRequestPendingId = requestId;
		const confirmedPeerRevokeIds = this.getConfirmedConnectedBotPeerRevokeIds();
		let promise;
		try {
			promise = this.requestConnectedBot(overwrite);
		} catch (err) {
			if (this.connectedBotRequestId === requestId) {
				this.connectedBotRequestId = previousRequestId;
				this.connectedBotRequestPendingId = previousPendingRequestId;
			}
			throw err;
		}
		const handledPromise = promise.then((result) => {
			if (requestId !== this.connectedBotRequestId) return this.connectedBotRequestOutcome;
			this.connectedBotRequestPendingId = void 0;
			this.clearConnectedBotPeerRevokes(confirmedPeerRevokeIds);
			return this.commitConnectedBotResult(result);
		}, (err) => {
			if (requestId !== this.connectedBotRequestId) return this.connectedBotRequestOutcome;
			if (this.connectedBotRequestPendingId === requestId) this.connectedBotRequestPendingId = void 0;
			if (this.connectedBotPromise === handledPromise) this.connectedBotPromise = this.connectedBotBase || this.connectedBot ? Promise.resolve(this.connectedBot) : void 0;
			throw err;
		});
		this.connectedBotRequestOutcome = handledPromise;
		this.connectedBotPromise = handledPromise;
		return this.connectedBotPromise;
	}
	getBotConnectionReviews() {
		return this.loadBotConnectionReviews().then(() => this.botConnectionReviews);
	}
	async confirmBotConnection(botId) {
		const connectedBot = await this.getConnectedBot(true);
		if (!connectedBot || !isSameUserId(connectedBot.bot_id, botId)) {
			this.recomputeConnectedBot(true);
			return false;
		}
		const result = await this.apiManager.invokeApiSingle("account.confirmBotConnection", { bot_id: this.appUsersManager.getUserInput(botId) });
		if (result) this.removeBotConnectionReview(botId);
		return result;
	}
	async rejectBotConnection(botId) {
		const connectedBot = await this.getConnectedBot(true);
		if (!connectedBot || !isSameUserId(connectedBot.bot_id, botId)) {
			this.recomputeConnectedBot(true);
			return false;
		}
		await this.updateConnectedBot({ previousBotId: botId });
		return true;
	}
	async searchBusinessBots(query) {
		const username = normalizeBusinessBotUsername(query);
		if (!username) return { userIds: [] };
		const user = await this.appUsersManager.resolveUsername(username);
		if (user?._ !== "user") return { userIds: [] };
		return this.isBusinessBot(user) ? { userIds: [user.id] } : {
			userIds: [],
			unsupportedUserId: user.pFlags?.bot ? user.id : void 0
		};
	}
	updateConnectedBot(options) {
		return this.enqueueConnectedBotMutation(() => this.updateConnectedBotInternal(options));
	}
	async updateConnectedBotInternal(options) {
		const { botId, previousBotId } = options;
		const deleteBot = !botId;
		const targetBotId = botId || previousBotId;
		if (!targetBotId) return;
		if (!await this.hasConnectedBotPrincipal(previousBotId)) {
			this.recomputeConnectedBot(true);
			throw new Error("CONNECTED_BOT_CHANGED");
		}
		const recipients = toInputBusinessBotRecipients(deleteBot ? void 0 : options.recipients, (userId) => this.appUsersManager.getUserInput(userId));
		await this.apiManager.invokeApiSingleProcess({
			method: "account.updateConnectedBot",
			params: {
				deleted: deleteBot || void 0,
				rights: deleteBot ? void 0 : options.rights,
				bot: this.appUsersManager.getUserInput(targetBotId),
				recipients
			},
			processResult: (updates) => {
				this.apiUpdatesManager.processUpdateMessage(updates);
			}
		});
		this.clearConfirmedConnectedBotPeerRevokes();
		let connectedBot;
		let hasCanonicalConnectedBot = true;
		try {
			connectedBot = await this.getConnectedBot(true);
		} catch {
			hasCanonicalConnectedBot = false;
			const cachedConnectedBot = this.connectedBotBase || this.connectedBot;
			const keepCachedMetadata = !deleteBot && cachedConnectedBot && isSameUserId(cachedConnectedBot.bot_id, targetBotId);
			connectedBot = deleteBot ? void 0 : {
				...keepCachedMetadata ? cachedConnectedBot : {},
				_: "connectedBot",
				bot_id: targetBotId,
				recipients: options.recipients || (keepCachedMetadata ? cachedConnectedBot.recipients : {
					_: "businessBotRecipients",
					pFlags: {}
				}),
				rights: options.rights || (keepCachedMetadata ? cachedConnectedBot.rights : {
					_: "businessBotRights",
					pFlags: {}
				})
			};
			connectedBot = this.commitConnectedBotBase(connectedBot);
		}
		connectedBot = this.connectedBot;
		this.rootScope.dispatchEvent("chat_automation_update", connectedBot);
		const targetStillConnected = connectedBot && isSameUserId(connectedBot.bot_id, targetBotId);
		if (deleteBot && (!hasCanonicalConnectedBot || !targetStillConnected)) this.removeBotConnectionReview(targetBotId);
		else if (!deleteBot && previousBotId && !isSameUserId(previousBotId, botId) && (!hasCanonicalConnectedBot || !isSameUserId(connectedBot?.bot_id, previousBotId))) this.removeBotConnectionReview(previousBotId);
		if (!hasCanonicalConnectedBot) this.refreshConnectedBot();
	}
	toggleConnectedBotPaused(peerId, paused, expectedBotId) {
		return this.enqueueConnectedBotMutation(() => this.toggleConnectedBotPausedInternal(peerId, paused, expectedBotId));
	}
	async toggleConnectedBotPausedInternal(peerId, paused, expectedBotId) {
		if (!await this.hasConnectedBotPrincipal(expectedBotId)) {
			this.recomputeConnectedBot(true);
			throw new Error("CONNECTED_BOT_CHANGED");
		}
		const result = await this.apiManager.invokeApiSingle("account.toggleConnectedBotPaused", {
			peer: this.appPeersManager.getInputPeerById(peerId),
			paused
		});
		if (!result) throw new Error("ACCOUNT_TOGGLE_CONNECTED_BOT_PAUSED_FAILED");
		if (!this.appProfileManager.modifyCachedPeerSettings(peerId, (settings) => {
			if (paused) {
				settings.pFlags.business_bot_paused = true;
				delete settings.pFlags.business_bot_can_reply;
			} else {
				delete settings.pFlags.business_bot_paused;
				settings.pFlags.business_bot_can_reply = true;
			}
		})) Promise.resolve(this.appProfileManager.refreshPeerSettings(peerId)).catch(() => {});
		return result;
	}
	disablePeerConnectedBot(peerId, expectedBotId) {
		let peerRevokeId;
		if (peerId.isUser()) {
			if (!this.connectedBotBase && this.connectedBot) this.connectedBotBase = this.connectedBot;
			peerRevokeId = ++this.pendingConnectedBotPeerRevokeId;
			this.pendingConnectedBotPeerRevokes.set(peerRevokeId, {
				botId: expectedBotId,
				userId: peerId.toUserId(),
				confirmed: false
			});
			this.recomputeConnectedBot(true);
		}
		return this.enqueueConnectedBotMutation(() => this.disablePeerConnectedBotInternal(peerId, expectedBotId, peerRevokeId));
	}
	async disablePeerConnectedBotInternal(peerId, expectedBotId, peerRevokeId) {
		let hasExpectedPrincipal;
		try {
			hasExpectedPrincipal = await this.hasConnectedBotPrincipal(expectedBotId);
		} catch (err) {
			if (peerRevokeId) this.pendingConnectedBotPeerRevokes.delete(peerRevokeId);
			this.recomputeConnectedBot(true);
			throw err;
		}
		if (!hasExpectedPrincipal) {
			if (peerRevokeId) this.pendingConnectedBotPeerRevokes.delete(peerRevokeId);
			this.recomputeConnectedBot(true);
			return true;
		}
		if (peerRevokeId) this.recomputeConnectedBot(true);
		let result = false;
		let requestError;
		try {
			result = await this.apiManager.invokeApiSingle("account.disablePeerConnectedBot", { peer: this.appPeersManager.getInputPeerById(peerId) });
			if (!result) throw new Error("ACCOUNT_DISABLE_PEER_CONNECTED_BOT_FAILED");
		} catch (err) {
			requestError = err;
		}
		if (requestError) {
			if (peerRevokeId) this.pendingConnectedBotPeerRevokes.delete(peerRevokeId);
			this.recomputeConnectedBot(true);
		} else {
			const peerRevoke = peerRevokeId && this.pendingConnectedBotPeerRevokes.get(peerRevokeId);
			if (peerRevoke) peerRevoke.confirmed = true;
			this.appProfileManager.modifyCachedPeerSettings(peerId, (settings) => {
				delete settings.pFlags.business_bot_paused;
				delete settings.pFlags.business_bot_can_reply;
				delete settings.business_bot_id;
				delete settings.business_bot_manage_url;
			});
		}
		await this.reconcileConnectedBot();
		if (requestError) throw requestError;
		return result;
	}
	requestConnectedBot(overwrite) {
		return this.apiManager.invokeApiSingleProcess({
			method: "account.getConnectedBots",
			params: {},
			processResult: (result) => result,
			options: { overwrite }
		});
	}
	commitConnectedBotResult(result) {
		this.appPeersManager.saveApiPeers(result);
		return this.commitConnectedBotBase(result.connected_bots[0]);
	}
	commitConnectedBotBase(connectedBot, dispatch = false) {
		this.connectedBotBase = connectedBot;
		return this.recomputeConnectedBot(dispatch);
	}
	recomputeConnectedBot(dispatch = false) {
		this.connectedBot = this.applyPendingConnectedBotPeerRevokes(this.connectedBotBase);
		if (this.connectedBotRequestPendingId === void 0) this.connectedBotPromise = Promise.resolve(this.connectedBot);
		if (dispatch) this.rootScope.dispatchEvent("chat_automation_update", this.connectedBot);
		return this.connectedBot;
	}
	applyPendingConnectedBotPeerRevokes(connectedBot) {
		if (!connectedBot) return connectedBot;
		let recipients = connectedBot.recipients;
		this.pendingConnectedBotPeerRevokes.forEach((peerRevoke) => {
			if (isSameUserId(connectedBot.bot_id, peerRevoke.botId)) recipients = revokeBusinessBotRecipientAccess(recipients, peerRevoke.userId);
		});
		return recipients === connectedBot.recipients ? connectedBot : {
			...connectedBot,
			recipients
		};
	}
	clearConfirmedConnectedBotPeerRevokes() {
		this.pendingConnectedBotPeerRevokes.forEach((peerRevoke, id) => {
			if (peerRevoke.confirmed) this.pendingConnectedBotPeerRevokes.delete(id);
		});
	}
	getConfirmedConnectedBotPeerRevokeIds() {
		const ids = [];
		this.pendingConnectedBotPeerRevokes.forEach((peerRevoke, id) => {
			if (peerRevoke.confirmed) ids.push(id);
		});
		return ids;
	}
	clearConnectedBotPeerRevokes(ids) {
		ids.forEach((id) => this.pendingConnectedBotPeerRevokes.delete(id));
	}
	async hasConnectedBotPrincipal(expectedBotId) {
		await this.getConnectedBot(true);
		return expectedBotId ? !!this.connectedBot && isSameUserId(this.connectedBot.bot_id, expectedBotId) : !this.connectedBot;
	}
	async reconcileConnectedBot() {
		try {
			await this.getConnectedBot(true);
			this.recomputeConnectedBot(true);
		} catch {
			this.retryConnectedBotReconciliation();
		}
	}
	retryConnectedBotReconciliation() {
		this.getConnectedBot(true).then(() => {
			this.recomputeConnectedBot(true);
		}).catch(() => {});
	}
	enqueueConnectedBotMutation(mutation) {
		const result = this.connectedBotMutationQueue.then(mutation, mutation);
		this.connectedBotMutationQueue = result.then(() => {}, () => {});
		return result;
	}
	isBusinessBot(user) {
		return user?._ === "user" && !!user.pFlags?.bot_business;
	}
	loadBotConnectionReviews() {
		const periodVersion = this.authorizationAutoconfirmPeriodVersion;
		return this.botConnectionReviewsPromise ?? (this.botConnectionReviewsPromise = this.appStateManager.getState().then((state) => {
			if (periodVersion === this.authorizationAutoconfirmPeriodVersion) this.setAuthorizationAutoconfirmPeriod(state.appConfig?.authorization_autoconfirm_period, false);
			const reviews = state.botConnectionReviews || [];
			const filteredReviews = this.filterExpiredBotConnectionReviews(reviews);
			this.botConnectionReviewsLoaded = true;
			this.setBotConnectionReviews(filteredReviews, filteredReviews.length !== reviews.length);
			if (filteredReviews.length) this.refreshConnectedBot();
		}));
	}
	setAuthorizationAutoconfirmPeriod(period, updateReviews = true) {
		const normalizedPeriod = normalizeAuthorizationAutoconfirmPeriod(period);
		if (this.authorizationAutoconfirmPeriod === normalizedPeriod) return;
		this.authorizationAutoconfirmPeriod = normalizedPeriod;
		if (updateReviews) {
			const reviews = this.filterExpiredBotConnectionReviews(this.botConnectionReviews);
			if (reviews.length !== this.botConnectionReviews.length) this.setBotConnectionReviews(reviews);
			else this.scheduleBotConnectionReviewsExpiration();
		}
	}
	filterExpiredBotConnectionReviews(reviews) {
		return filterExpiredBotConnectionReviews(reviews, this.timeManager.getServerTime(), this.authorizationAutoconfirmPeriod);
	}
	setBotConnectionReviews(reviews, persist = true) {
		this.botConnectionReviews = reviews;
		if (persist) this.appStateManager.pushToState("botConnectionReviews", reviews);
		this.rootScope.dispatchEvent("bot_connection_reviews_update", reviews);
		this.scheduleBotConnectionReviewsExpiration();
	}
	removeBotConnectionReview(botId) {
		const reviews = this.botConnectionReviews.filter((review) => !isSameUserId(review.botId, botId));
		if (reviews.length !== this.botConnectionReviews.length) this.setBotConnectionReviews(reviews);
	}
	scheduleBotConnectionReviewsExpiration() {
		const schedule = ++this.botConnectionReviewExpirationSchedule;
		if (this.botConnectionReviewExpirationTimeout !== void 0) {
			ctx.clearTimeout(this.botConnectionReviewExpirationTimeout);
			this.botConnectionReviewExpirationTimeout = void 0;
		}
		const datedReviews = this.botConnectionReviews.filter((review) => review.date);
		if (!datedReviews.length) return;
		const now = this.timeManager.getServerTime();
		const expiresAt = Math.min(...datedReviews.map((review) => {
			return review.date + this.authorizationAutoconfirmPeriod;
		}));
		const timeout = Math.min(Math.max(0, (expiresAt - now) * 1e3), MAX_TIMEOUT);
		this.botConnectionReviewExpirationTimeout = ctx.setTimeout(() => {
			if (schedule !== this.botConnectionReviewExpirationSchedule) return;
			this.botConnectionReviewExpirationTimeout = void 0;
			const reviews = this.filterExpiredBotConnectionReviews(this.botConnectionReviews);
			if (reviews.length !== this.botConnectionReviews.length) this.setBotConnectionReviews(reviews);
			else this.scheduleBotConnectionReviewsExpiration();
		}, timeout);
	}
	refreshConnectedBot() {
		this.getConnectedBot(true).then((connectedBot) => {
			this.rootScope.dispatchEvent("chat_automation_update", connectedBot);
		}).catch(() => {});
	}
};
//#endregion
export { AppManager as a, normalizeAuthorizationAutoconfirmPeriod as i, normalizeBusinessBotUsername as n, DEFAULT_AUTHORIZATION_AUTOCONFIRM_PERIOD as r, AppBusinessManager as t };
