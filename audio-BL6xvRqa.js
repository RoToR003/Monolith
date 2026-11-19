//# allFunctionsCalledOnLoad
import { h as Modes, l as IS_SAFARI, p as MOUNT_CLASS_TO, r as IS_APPLE } from "./userAgent-ByGXcznk.js";
import { t as IS_TOUCH_SUPPORTED } from "./touchSupport-B2RWO3zD.js";
import { t as findUpClassName } from "./findUpClassName-3V5me58N.js";
import { t as noop } from "./noop-H9NNBLfX.js";
import { W as copy, _ as limitSymbols, d as getSearchType, t as isObjectURL } from "./objectUrlUtils-5x08MNuO.js";
import { t as apiManagerProxy } from "./apiManagerProxy-DmQXvxSF.js";
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { t as EventListenerBase } from "./eventListenerBase-da40Q-0t.js";
import { t as makeError } from "./makeError-CiXxcKtE.js";
import { c as deepEqual, r as toArray } from "./encryptedStorageLayer-gN9TBXzg.js";
import { a as safeAssign } from "./idb-BZfkipS3.js";
import { a as i18n, c as joinElementsWith, m as setInnerHTML, u as langPack_default } from "./langPack-BmdJGr44.js";
import { M as onCleanup, _ as createMemo, f as children, g as createEffect, p as createComponent, s as Show, w as createUniqueId, x as createRoot, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { n as deferredPromise } from "./cancellablePromise-bof--dnO.js";
import { i as onAppWindowChange, n as getAppWindow, r as getOverlayRoot, t as bindActiveWindowListener } from "./appWindow-bo-KtJhy.js";
import { n as bindManagersToSession } from "./bindManagersToAccount-BL82O9H9.js";
import { t as cancelEvent } from "./cancelEvent-Cw8vYZHp.js";
import { t as clamp } from "./clamp-9UaNhw6N.js";
import { n as createStore } from "./store-PwRn5fa3.js";
import { n as hotListen } from "./hotModule-aCRkP77w.js";
import { _ as use, c as insert, f as setAttribute, g as template, o as className, u as memo } from "./web-BPyQozky.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { n as mediaSizes } from "./mediaSizes-C1MTaleW.js";
import { t as observeResize } from "./resizeObserver-DddVtfLC.js";
import { t as IconTsx } from "./iconTsx-B4lOk4A6.js";
import { t as forEachReverse } from "./forEachReverse-pJ5a3thw.js";
import { t as safePlay } from "./safePlay-CCrzDSPY.js";
import { n as animationIntersector } from "./animationIntersector-vAjH_7t1.js";
import { t as ListenerSetter } from "./listenerSetter-BER6qAXn.js";
import { n as simulateEvent } from "./dispatchEvent-CZVxCUd_.js";
import { n as attachClickEvent } from "./clickEvent-COk4YpLP.js";
import { c as setCurrentTime } from "./sticker-5twBOy1Y.js";
import { i as onMediaLoad } from "./blur-BvAbRYUw.js";
import { t as clearMediaElementSource } from "./clearMediaElementSource-CfCKljUR.js";
import { t as appDownloadManager } from "./appDownloadManager-ClHW2-Dl.js";
import { t as throttleWithRaf } from "./throttleWithRaf-CCqKl0-N.js";
import { F as formatDateAccordingToTodayNew, L as formatFullSentTime, h as pinObjectURL } from "./index-B7axFZql.js";
import { Bt as getAudioAttribute, Gt as getPeerTitle, Sn as renderMediaWithFadeIn, dt as wrapPeerTitle, i as Row, vn as wrapPhoto, xn as ProgressivePreloader, zt as isMessageSensitive } from "./confirmationPopup-Bz6mK0o-.js";
import { $t as getFwdFromName, en as getDocumentInput } from "./getChatMigratedTo-ChhMNXuu.js";
import { l as getRichMessageMedia } from "./canPollPeerStories-D3HoBvLX.js";
import { n as wrapEmojiText } from "./wrapEmojiText-DT39R5Tj.js";
import { s as toHHMMSS } from "./wrapDuration-BQgz9hDF.js";
import { D as A11yButton, S as createElementFromMarkup } from "./openEditors-7FmA7q_V.js";
import { t as anchorCallback } from "./anchorCallback-BbwAJdBk.js";
import { r as toastNew, t as hideToast } from "./toast-B6VD5M7R.js";
import { t as MiddleEllipsisElement } from "./middleEllipsis-BLGR6PDz.js";
import { t as RangeSelector } from "./rangeSelector-Bspn3Z0a.js";
import { t as formatBytes } from "./formatBytes-HLLlT7Mr.js";
//#region src/lib/appManagers/utils/docs/getAudioTitles.ts
/**
* How a track is named: its audio attribute, with the file name standing in for a missing title
* (what the profile's playlist row does too). Returns nothing when there is neither — a document
* that cannot be named is one no caller should render a row or a panel for.
*/
function getAudioTitles(doc) {
	const attribute = getAudioAttribute(doc);
	const title = attribute?.title || doc?.file_name;
	const performer = attribute?.performer;
	if (!title && !performer) return;
	return {
		title,
		performer
	};
}
//#endregion
//#region src/helpers/filterChatPhotosMessages.ts
function filterChatPhotosMessages(value) {
	forEachReverse(value.messages, (message, idx, arr) => {
		if (!(message?.action)?.photo) {
			arr.splice(idx, 1);
			if (value.count !== void 0) --value.count;
		}
	});
}
//#endregion
//#region src/helpers/listLoader.ts
var ListLoader = class {
	constructor(options) {
		this.previous = [];
		this.next = [];
		this.reverse = false;
		this.loadCount = 50;
		this.loadWhenLeft = 20;
		this.loadedAllUp = false;
		this.loadedAllDown = false;
		safeAssign(this, options);
	}
	setTargets(previous, next, reverse) {
		this.previous = previous;
		this.next = next;
		this.reverse = reverse;
	}
	get index() {
		return this.count !== void 0 ? this.previous.length : -1;
	}
	reset(loadedAll = false) {
		this.current = void 0;
		this.previous = [];
		this.next = [];
		this.setLoaded(true, loadedAll);
		this.setLoaded(false, loadedAll);
	}
	go(length, dispatchJump = true) {
		let items, item;
		if (length > 0) {
			items = this.next.splice(0, length);
			item = items.pop();
			if (!item) return;
			if (this.current !== void 0) items.unshift(this.current);
			this.previous.push(...items);
		} else {
			items = this.previous.splice(Math.max(0, this.previous.length + length), -length);
			item = items.shift();
			if (!item) return;
			if (this.current !== void 0) items.push(this.current);
			this.next.unshift(...items);
		}
		this.current = item;
		if (this.next.length < this.loadWhenLeft) this.load(!this.reverse);
		if (this.previous.length < this.loadWhenLeft) this.load(this.reverse);
		dispatchJump && this.onJump?.(item, length > 0);
		return this.current;
	}
	unsetCurrent(toPrevious) {
		if (toPrevious) this.previous.push(this.current);
		else this.next.unshift(this.current);
		this.current = void 0;
	}
	goUnsafe(length, dispatchJump) {
		const leftLength = length > 0 ? Math.max(0, length - this.next.length) : Math.min(0, length + this.previous.length);
		const item = this.go(length, leftLength ? false : dispatchJump);
		return {
			item: !leftLength ? item : void 0,
			leftLength
		};
	}
	setLoaded(down, value) {
		if (!((down ? this.loadedAllDown : this.loadedAllUp) !== value)) return false;
		if (down) this.loadedAllDown = value;
		else this.loadedAllUp = value;
		if (!value) {
			if (down) this.loadPromiseDown = null;
			else this.loadPromiseUp = null;
		}
		return true;
	}
	load(older) {
		if (older ? this.loadedAllDown : this.loadedAllUp) return Promise.resolve();
		let promise = older ? this.loadPromiseDown : this.loadPromiseUp;
		if (promise) return promise;
		let anchor;
		if (older) anchor = this.reverse ? this.previous[0] : this.next[this.next.length - 1];
		else anchor = this.reverse ? this.next[this.next.length - 1] : this.previous[0];
		anchor ?? (anchor = this.current);
		promise = this.loadMore(anchor, older, this.loadCount).then(async (result) => {
			if ((older ? this.loadPromiseDown : this.loadPromiseUp) !== promise) return;
			if (result.items.length < this.loadCount) this.setLoaded(older, true);
			if (this.count === void 0) this.count = result.count || result.items.length;
			const processedArr = [];
			(older && !this.reverse ? result.items.forEach.bind(result.items) : forEachReverse.bind(null, result.items))((item) => {
				if (!item) return;
				const processed = this.processItem ? this.processItem(item) : item;
				if (!processed) return;
				processedArr.push(processed);
			});
			const results = (await Promise.all(processedArr)).filter(Boolean);
			if ((older ? this.loadPromiseDown : this.loadPromiseUp) !== promise) return;
			if (older) {
				if (this.reverse) this.previous.unshift(...results);
				else this.next.push(...results);
			} else if (this.reverse) this.next.push(...results);
			else this.previous.unshift(...results);
			this.onLoadedMore?.();
		}, () => {}).then(() => {
			if (older) this.loadPromiseDown = null;
			else this.loadPromiseUp = null;
		});
		if (older) this.loadPromiseDown = promise;
		else this.loadPromiseUp = promise;
		return promise;
	}
};
//#endregion
//#region src/helpers/searchListLoader.ts
var POSITIONED_FILTERS = /* @__PURE__ */ new Set([
	"inputMessagesFilterPhotoVideo",
	"inputMessagesFilterPhotos",
	"inputMessagesFilterVideo"
]);
var GIVEN_RANGE_PAGE = 100;
var GIVEN_RANGE_PAGES = 20;
var SearchListLoader = class SearchListLoader extends ListLoader {
	constructor(options = {}) {
		super({
			...options,
			loadMore: async (anchor, older, loadCount) => {
				const managers = bindManagersToSession(this.managers);
				const peerId = this.searchContext.peerId || anchor?.peerId;
				const fromAnchor = !older && anchor?.mid !== void 0 && !this.searchContext.isCacheableSearch && getSearchType({
					...this.searchContext,
					peerId
				}) === "cached";
				const backLimit = older ? 0 : loadCount + (fromAnchor ? 1 : 0);
				let offsetId = anchor?.mid ?? this.searchContext.maxId;
				if (!older && !fromAnchor) offsetId = await managers.appMessagesIdsManager.incrementMessageId(offsetId, 1);
				return managers.appMessagesManager.getHistory({
					...this.searchContext,
					peerId,
					offsetId,
					offsetPeerId: !peerId ? anchor?.peerId : void 0,
					limit: backLimit ? fromAnchor ? 1 : 0 : loadCount,
					backLimit
				}).then((value) => {
					if (!value.messages) value.messages = value.history.map((mid) => apiManagerProxy.getMessageByPeer(peerId, mid));
					if (this.searchContext.peerId) value.messages.forEach((message) => message && this.searchMids.add(message.mid));
					if (this.searchContext.inputFilter._ === "inputMessagesFilterChatPhotos") filterChatPhotosMessages(value);
					if (value.nextRate) this.searchContext.nextRate = value.nextRate;
					const items = fromAnchor ? value.messages.filter((message) => !message || message.mid > anchor.mid) : value.messages;
					return {
						count: value.count,
						items
					};
				});
			},
			processItem: async (message) => {
				if (!(await this.filterMids([message.mid])).length) return;
				return options.processItem(message);
			}
		});
		this.searchMids = /* @__PURE__ */ new Set();
		this.givenMids = [];
		this.positionGeneration = 0;
		this.onHistoryDelete = ({ peerId, msgs }) => {
			if (peerId === this.searchContext?.peerId) {
				msgs.forEach((mid) => this.searchMids.delete(mid));
				this.resetPositions();
			}
			const shouldBeDeleted = (item) => item.peerId === peerId && msgs.has(item.mid);
			const filter = (item, idx, arr) => {
				if (shouldBeDeleted(item)) arr.splice(idx, 1);
			};
			const length = this.previous.length + this.next.length;
			forEachReverse(this.previous, filter);
			forEachReverse(this.next, filter);
			if (this.current && shouldBeDeleted(this.current)) {
				this.current = void 0;
				if (this.onEmptied) this.onEmptied();
			} else if (this.previous.length + this.next.length !== length) this.onLoadedMore?.();
		};
		this.onHistoryMultiappend = async (message) => {
			const { searchContext } = this;
			if (searchContext.folderId !== void 0) return;
			if (!this.loadedAllUp || this.loadPromiseUp) return;
			if (message.peerId !== searchContext.peerId) return;
			const filtered = await this.filterMids([message.mid]);
			if (this.searchContext !== searchContext) return;
			const targets = (await Promise.all(filtered.map((message) => this.processItem(message)))).filter(Boolean);
			if (this.searchContext !== searchContext) return;
			if (!targets.length) return;
			if (this.previous.concat(this.next, this.current ? [this.current] : []).some((item) => item?.mid === message.mid)) return;
			if (!this.current) this.previous.push(...targets);
			else this.next.push(...targets);
			filtered.forEach(({ mid }) => this.searchMids.add(mid));
			this.resetPositions();
			this.onLoadedMore?.();
		};
		this.onMessageSent = ({ message }) => {
			this.onHistoryMultiappend(message);
		};
		this.managers ?? (this.managers = rootScope.managers);
		rootScope.addEventListener("history_delete", this.onHistoryDelete);
		rootScope.addEventListener("history_multiappend", this.onHistoryMultiappend);
		rootScope.addEventListener("message_sent", this.onMessageSent);
		if (!options.isInner) this.otherSideLoader = new SearchListLoader({
			...options,
			isInner: true
		});
	}
	async filterMids(mids) {
		const storageKey = `${this.searchContext.peerId}_${this.searchContext.isScheduled ? "scheduled" : "history"}`;
		let filtered = await this.managers.appMessagesManager.filterMessagesByInputFilterFromStorage(this.searchContext.inputFilter._, mids, storageKey, mids.length);
		if (this.searchContext.skipSensitive) filtered = filtered.filter((message) => !isMessageSensitive(message));
		return filtered;
	}
	setSearchContext(context) {
		this.searchContext = context;
		if (this.searchContext.folderId !== void 0) {
			this.loadedAllUp = true;
			if (this.searchContext.nextRate === void 0) this.loadedAllDown = true;
		}
		if (this.searchContext.inputFilter._ === "inputMessagesFilterChatPhotos") this.loadedAllUp = true;
		if (this.searchContext.useSearch === false) this.loadedAllDown = this.loadedAllUp = true;
		if (this.otherSideLoader) this.otherSideLoader.setSearchContext(context);
	}
	/**
	* Where `item` stands in the whole search, 1-based in the order the list goes (`previous` first), and
	* how many the search holds: "3 of 15". Counted from the one place asked of the server
	* (`loadPosition`) over the results the search returned - the items of the list and those it left
	* out alike, as the server counts them - so paging asks nothing. Undefined until that place is known,
	* and for an item that is not a result of the search.
	*/
	getPosition(item) {
		const anchor = this.positionAnchor;
		if (!anchor || !this.searchMids.has(item.mid)) return;
		if (item.mid === anchor.mid) return {
			position: anchor.position,
			count: anchor.count
		};
		const low = Math.min(item.mid, anchor.mid), high = Math.max(item.mid, anchor.mid);
		let distance = 1;
		this.searchMids.forEach((mid) => {
			if (mid > low && mid < high) ++distance;
		});
		return {
			position: anchor.position + (item.mid > anchor.mid === this.reverse ? distance : -distance),
			count: anchor.count
		};
	}
	/**
	* The place of `item` (`getPosition`), asking the server for it once: for the first item it is asked
	* about. Only for a chat's photos and videos, where the viewer shows nearly every result.
	*/
	loadPosition(item) {
		const { searchContext } = this;
		if (!searchContext?.peerId || searchContext.useSearch === false || searchContext.isScheduled || !POSITIONED_FILTERS.has(searchContext.inputFilter._)) return Promise.resolve(void 0);
		this.positionAnchorPromise ?? (this.positionAnchorPromise = this.loadPositionAnchor(item));
		return this.positionAnchorPromise.then(() => this.getPosition(item));
	}
	async loadPositionAnchor(item) {
		const { searchContext, reverse } = this;
		const generation = this.positionGeneration;
		const [result, rangeRead] = await Promise.all([this.managers.appMessagesManager.getHistory({
			...searchContext,
			offsetId: item.mid,
			limit: 1,
			backLimit: 1,
			needRealOffsetIdOffset: true
		}).catch(() => void 0), this.readGivenRange(item).catch(() => void 0)]);
		if (generation !== this.positionGeneration || this.searchContext !== searchContext) return;
		const { count, offsetIdOffset } = result || {};
		if (!rangeRead || result?.history[0] !== item.mid || !count || !offsetIdOffset) {
			if (result && result.history[0] !== item.mid) this.positionAnchorPromise = void 0;
			return;
		}
		this.searchMids.add(item.mid);
		this.positionAnchor = {
			mid: item.mid,
			position: reverse ? count - offsetIdOffset + 1 : offsetIdOffset,
			count
		};
	}
	async readGivenRange(item) {
		const managers = bindManagersToSession(this.managers);
		const mids = this.givenMids.concat(item.mid);
		if (mids.length < 2) return true;
		const oldest = Math.min(...mids);
		let offsetId = await managers.appMessagesIdsManager.incrementMessageId(Math.max(...mids), 1);
		for (let pages = 0; pages < GIVEN_RANGE_PAGES; ++pages) {
			const history = (await managers.appMessagesManager.getHistory({
				...this.searchContext,
				offsetId,
				limit: GIVEN_RANGE_PAGE
			})).history;
			history.forEach((mid) => this.searchMids.add(mid));
			const last = history[history.length - 1];
			if (history.length < GIVEN_RANGE_PAGE || last <= oldest) return true;
			offsetId = last;
		}
		return false;
	}
	resetPositions() {
		++this.positionGeneration;
		this.positionAnchor = this.positionAnchorPromise = void 0;
	}
	setTargets(previous, next, reverse) {
		super.setTargets(previous, next, reverse);
		this.givenMids = previous.concat(next).map(({ mid }) => mid);
	}
	reset() {
		super.reset();
		this.searchContext = void 0;
		this.searchMids.clear();
		this.givenMids = [];
		this.resetPositions();
		if (this.otherSideLoader) this.otherSideLoader.reset();
	}
	getPrevious(withOtherSide) {
		let previous = this.previous;
		if (this.otherSideLoader && withOtherSide) previous = previous.concat(this.otherSideLoader.previous);
		return previous;
	}
	getNext(withOtherSide) {
		let next = this.next;
		if (this.otherSideLoader && withOtherSide) next = next.concat(this.otherSideLoader.next);
		return next;
	}
	getCurrent() {
		return this.current || this.otherSideLoader?.current;
	}
	goToOtherEnd(length) {
		if (length > 0) return this.go(-this.previous.length);
		else return this.go(this.next.length);
	}
	goRound(length, dispatchJump) {
		let ret;
		if (this.otherSideLoader?.current) {
			ret = this.otherSideLoader.goUnsafe(length, dispatchJump);
			if (ret.item) return ret.item;
			length = ret.leftLength;
			if (!(length > 0 ? this.otherSideLoader.next : this.otherSideLoader.previous).length) {
				if (!(length > 0 ? this.otherSideLoader.loadedAllUp : this.otherSideLoader.loadedAllDown)) return;
				if (length > 0 && (this.otherSideLoader.searchContext.maxId === 1 || this.otherSideLoader.loadedAllDown) || length < 0 && (this.otherSideLoader.searchContext.maxId === 0 || this.otherSideLoader.loadedAllUp)) return this.otherSideLoader.goToOtherEnd(length);
				this.otherSideLoader.unsetCurrent(length > 0);
			}
		}
		ret = this.goUnsafe(length, dispatchJump);
		if (!ret.item) {
			if (this.loadedAllUp && this.loadedAllDown) return this.goToOtherEnd(length);
			else if (this.otherSideLoader) {
				length = ret.leftLength;
				ret = this.otherSideLoader.goUnsafe(length, dispatchJump);
				if (ret.item) this.unsetCurrent(length > 0);
			}
		}
		return ret?.item;
	}
	setCurrent(item) {
		this.current = item;
	}
	setLoaded(down, value) {
		const changed = super.setLoaded(down, value);
		if (changed && this.otherSideLoader && value && this.searchContext?.useSearch !== false) {
			const reverse = this.loadedAllUp;
			this.otherSideLoader.setSearchContext({
				...this.searchContext,
				maxId: reverse ? 1 : 0
			});
			this.otherSideLoader.reverse = this.reverse;
			this.otherSideLoader.setLoaded(reverse, true);
			this.otherSideLoader.load(!reverse);
		}
		return changed;
	}
	cleanup() {
		this.reset();
		rootScope.removeEventListener("history_delete", this.onHistoryDelete);
		rootScope.removeEventListener("history_multiappend", this.onHistoryMultiappend);
		rootScope.removeEventListener("message_sent", this.onMessageSent);
		this.onEmptied = void 0;
		if (this.otherSideLoader) {
			this.otherSideLoader.cleanup();
			this.otherSideLoader = void 0;
		}
	}
};
//#endregion
//#region src/helpers/musicListenTracker.ts
/**
* Tracks how much of a music track the user actually listened to and reports it via
* `messages.reportMusicListen`. The listened duration is the total of the UNIQUE track positions
* the user covered (re-listening the same segment isn't counted twice, and seek jumps are excluded)
* — matching the Android client.
*
* Driven by {@link AppMediaPlaybackController}: call {@link onPlay} on each `play` event (passing the
* controller's playing details) and {@link finish} on `stop`. A session begins when a music track
* starts and is finalized — and reported, when long enough — on track switch, stop, or a pause
* longer than {@link MUSIC_LISTEN_PAUSE_LIMIT}.
*/
var MUSIC_LISTEN_PAUSE_LIMIT = 6e4;
var MUSIC_LISTEN_MIN_DURATION = 3;
var MusicListenTracker = class {
	constructor(onReport) {
		this.onReport = onReport;
	}
	onPlay(details) {
		if (details?.doc?.type !== "audio") {
			this.finish();
			return;
		}
		const inputDoc = getDocumentInput(details.doc);
		const session = this.session;
		if (session && session.inputDoc.id === inputDoc.id && session.media === details.media) return;
		this.finish();
		this.startSession(inputDoc, details.media);
	}
	finish() {
		this.clearPauseTimeout();
		const session = this.session;
		if (!session) return;
		this.session = void 0;
		session.listeners.removeAll();
		this.closeRange(session, session.lastPosition);
		let total = 0;
		for (const range of session.ranges) total += range.to - range.from;
		const listenedDuration = Math.floor(total);
		if (listenedDuration < MUSIC_LISTEN_MIN_DURATION) return;
		this.onReport(session.inputDoc, listenedDuration);
	}
	startSession(inputDoc, media) {
		const listeners = new ListenerSetter();
		const session = this.session = {
			inputDoc,
			media,
			listeners,
			ranges: [],
			rangeStart: -1,
			lastPosition: media.currentTime
		};
		if (!media.paused) this.openRange(media.currentTime);
		listeners.add(media)("timeupdate", () => {
			session.lastPosition = media.currentTime;
		});
		listeners.add(media)("play", () => {
			this.clearPauseTimeout();
			this.openRange(media.currentTime);
		});
		listeners.add(media)("pause", () => {
			this.closeRange(session, Math.max(session.lastPosition, media.currentTime));
			this.clearPauseTimeout();
			this.pauseTimeout = window.setTimeout(() => {
				this.pauseTimeout = void 0;
				this.finish();
			}, MUSIC_LISTEN_PAUSE_LIMIT);
		});
		listeners.add(media)("seeking", () => {
			this.closeRange(session, session.lastPosition);
			this.clearPauseTimeout();
			if (!media.paused) this.openRange(media.currentTime);
			session.lastPosition = media.currentTime;
		});
	}
	openRange(position) {
		const session = this.session;
		if (session && session.rangeStart < 0) session.rangeStart = position;
	}
	closeRange(session, position) {
		if (session.rangeStart < 0) return;
		const from = session.rangeStart;
		session.rangeStart = -1;
		if (position <= from) return;
		const ranges = session.ranges;
		let idx = 0;
		while (idx < ranges.length && ranges[idx].from <= from) idx++;
		ranges.splice(idx, 0, {
			from,
			to: position
		});
		for (let i = Math.max(0, idx - 1); i < ranges.length - 1;) {
			const cur = ranges[i], next = ranges[i + 1];
			if (cur.to >= next.from) {
				cur.to = Math.max(cur.to, next.to);
				ranges.splice(i + 1, 1);
			} else i++;
		}
	}
	clearPauseTimeout() {
		if (this.pauseTimeout !== void 0) {
			clearTimeout(this.pauseTimeout);
			this.pauseTimeout = void 0;
		}
	}
};
//#endregion
//#region src/lib/appManagers/utils/photos/generatePhotoForExtendedMediaPreview.ts
function generatePhotoForExtendedMediaPreview(media) {
	let thumb = media.thumb;
	if (thumb) {
		thumb.w = media.w;
		thumb.h = media.h;
	} else thumb = {
		_: "photoStrippedSize",
		bytes: new Uint8Array([
			1,
			24,
			30,
			197,
			162,
			138,
			40,
			0,
			162,
			138,
			40,
			0,
			162,
			138,
			40,
			0,
			162,
			138,
			40,
			3
		]),
		type: "i",
		w: 1,
		h: 1
	};
	return {
		_: "photo",
		access_hash: "",
		pFlags: {},
		date: 0,
		dc_id: 0,
		file_reference: [],
		id: 0,
		sizes: [thumb]
	};
}
//#endregion
//#region src/lib/appManagers/utils/messages/getMediaFromMessage.ts
function getMediaFromMessage(message, onlyInner = false, index) {
	if (!message) return;
	let media;
	if (message.action) media = message.action.photo;
	else if (message.media) {
		let messageMedia = message.media;
		const extendedMedia = messageMedia.extended_media;
		if (messageMedia.webpage) messageMedia = messageMedia.webpage;
		else if (extendedMedia) {
			const media = toArray(extendedMedia)[index ?? 0];
			messageMedia = media.media;
			if (!messageMedia) return generatePhotoForExtendedMediaPreview(media);
		}
		media = getPhotoOrDocument(messageMedia) || (onlyInner ? void 0 : messageMedia.game || messageMedia);
	}
	return media;
}
/**
* The photo or video the shared media shows for a message, and the viewer opened from there: its own,
* or the one a rich message stands for (`getRichMessageMedia`), which the server finds it by
*/
function getMediaFromMessageOrRich(message, index) {
	const media = getMediaFromMessage(message, true, index);
	const richMessage = !media && message?.rich_message;
	if (!richMessage) return media;
	const richMedia = getRichMessageMedia(richMessage);
	return richMedia && getPhotoOrDocument(richMedia);
}
function getPhotoOrDocument(messageMedia) {
	return messageMedia.document || messageMedia.photo;
}
//#endregion
//#region src/helpers/mediaMetadataObjectURLPins.ts
function createMediaMetadataObjectURLPins(setMetadata = (metadata) => {
	navigator.mediaSession.metadata = metadata;
}) {
	let pins = /* @__PURE__ */ new Map();
	return (metadata) => {
		const nextPins = /* @__PURE__ */ new Map();
		const createdPins = [];
		for (const { src } of metadata?.artwork ?? []) if (isObjectURL(src) && !nextPins.has(src)) {
			let unpin = pins.get(src);
			if (!unpin) createdPins.push(unpin = pinObjectURL(src));
			nextPins.set(src, unpin);
		}
		try {
			setMetadata(metadata);
		} catch (error) {
			createdPins.forEach((unpin) => unpin());
			throw error;
		}
		for (const [url, unpin] of pins) if (!nextPins.has(url)) unpin();
		pins = nextPins;
	};
}
//#endregion
//#region src/components/appMediaPlaybackController.ts
var _AppMediaPlaybackController;
var SHOULD_USE_SAFARI_FIX = (() => {
	try {
		return IS_SAFARI && +navigator.userAgent.match(/ Version\/(\d+)/)[1] < 14;
	} catch (err) {
		return false;
	}
})();
var SEEK_OFFSET = 10;
var AppMediaPlaybackController = class AppMediaPlaybackController extends EventListenerBase {
	constructor(..._args) {
		super(..._args);
		this.media = /* @__PURE__ */ new Map();
		this.scheduled = /* @__PURE__ */ new Map();
		this.mediaDetails = /* @__PURE__ */ new Map();
		this.waitingMediaForLoad = /* @__PURE__ */ new Map();
		this.waitingScheduledMediaForLoad = /* @__PURE__ */ new Map();
		this.waitingDocumentsForLoad = {};
		this.playbackRates = {
			voice: 1,
			video: 1,
			audio: 1
		};
		this.mediaGainMap = /* @__PURE__ */ new WeakMap();
		this.setMediaMetadata = createMediaMetadataObjectURLPins();
		this.seekBackward = (details, media = this.playingMedia) => {
			if (media) setCurrentTime(media, Math.max(0, media.currentTime - (details.seekOffset || SEEK_OFFSET)));
		};
		this.seekForward = (details, media = this.playingMedia) => {
			if (media) setCurrentTime(media, Math.min(media.duration, media.currentTime + (details.seekOffset || SEEK_OFFSET)));
		};
		this.seekTo = (details, media = this.playingMedia) => {
			if (media) setCurrentTime(media, details.seekTime);
		};
		this.onMediaDocumentLoad = async (media) => {
			const details = this.mediaDetails.get(media);
			if (!details) return;
			const doc = await this.managers.appDocsManager.getDoc(details.docId);
			if (this.mediaDetails.get(media) !== details) return;
			if (doc.type === "audio" && doc.supportsStreaming && SHOULD_USE_SAFARI_FIX) this.handleSafariStreamable(media);
			const cacheContext = apiManagerProxy.getCacheContext(doc);
			details.unpin?.();
			details.unpin = pinObjectURL(cacheContext.url);
			media.src = cacheContext.url;
			if (this.playingMedia === media) {
				media.playbackRate = this.playbackRate;
				if (doc.type === "audio") media.loop = this.loop;
			}
			const set = this.waitingDocumentsForLoad[doc.id];
			if (set) {
				set.delete(media);
				if (!set.size) delete this.waitingDocumentsForLoad[doc.id];
			}
		};
		this.onPlay = (e) => {
			const media = e.target;
			const { peerId, mid } = this.mediaDetails.get(media);
			const pip = this.pip;
			if (pip) pip.pause();
			const message = this.getMessageByMedia(media);
			if (this.playingMedia !== media) {
				this.stop();
				this.setMedia(media, message);
				const verify = (element) => element.mid === mid && element.peerId === peerId;
				const listLoader = this.listLoader;
				const current = listLoader.current;
				if (!current || !verify(current)) {
					let jumpLength;
					for (const withOtherSide of [false, true]) {
						const previous = listLoader.getPrevious(withOtherSide);
						let idx = previous.findIndex(verify);
						if (idx !== -1) jumpLength = -(previous.length - idx);
						else {
							idx = listLoader.getNext(withOtherSide).findIndex(verify);
							if (idx !== -1) jumpLength = idx + 1;
						}
						if (jumpLength !== void 0) break;
					}
					if (jumpLength) this.go(jumpLength, false);
					else if (!listLoader.repositionTo?.(mid, peerId)) this.setTargets({
						peerId,
						mid
					});
				}
			}
			setTimeout(() => {
				if (this.playingMedia !== media) return;
				this.dispatchEvent("play", this.getPlayingDetails());
				this.pauseMediaInOtherTabs();
			}, 0);
		};
		this.onPause = (e) => {
			this.dispatchEvent("pause");
		};
		this.onEnded = (e) => {
			if (e && !e.isTrusted) return;
			this.onPause(e);
			const listLoader = this.listLoader;
			if (this.lockedSwitchers || !this.round && listLoader.current && !listLoader.getNext(false).length || !listLoader.getNext(true).length || !this.next()) {
				this.stop();
				this.dispatchEvent("stop");
			}
		};
		this.play = () => {
			return this.toggle(true);
		};
		this.pause = () => {
			return this.toggle(false);
		};
		this.stop = (media = this.playingMedia, force) => {
			if (!media) return false;
			if (!media.paused) media.pause();
			setCurrentTime(media, 0);
			simulateEvent(media, "ended");
			if (media === this.playingMedia) {
				if (this.mediaDetails.get(media)?.clean) this.removeMedia(media);
				this.playingMedia = void 0;
				this.playingMediaType = void 0;
			}
			if (force) this.dispatchEvent("stop");
			return true;
		};
		this.playItem = (item) => {
			const { peerId, mid } = item;
			const isScheduled = this.searchContext.isScheduled;
			this.getMedia(peerId, mid, isScheduled).play();
			setTimeout(() => {
				this.resolveWaitingForLoadMedia(peerId, mid, isScheduled);
			}, 0);
		};
		this.go = (length, dispatchJump) => {
			const listLoader = this.listLoader;
			if (this.lockedSwitchers || !listLoader) return;
			if (this.playingMediaType === "audio") return listLoader.goRound(length, dispatchJump);
			else return listLoader.go(length, dispatchJump);
		};
		this.browserPlay = this.bindBrowserCallback((video) => this.toggle(true, video));
		this.browserPause = this.bindBrowserCallback((video) => this.toggle(false, video));
		this.browserStop = this.bindBrowserCallback((video) => this.stop(video));
		this.browserSeekBackward = this.bindBrowserCallback((video, details) => this.seekBackward(details, video));
		this.browserSeekForward = this.bindBrowserCallback((video, details) => this.seekForward(details, video));
		this.browserSeekTo = this.bindBrowserCallback((video, details) => this.seekTo(details, video));
		this.browserNext = this.bindBrowserCallback((video) => video || this.next());
		this.browserPrevious = this.bindBrowserCallback((video) => video ? this.seekToStart(video) : this.previous());
		this.next = () => {
			return this.go(1);
		};
		this.previous = () => {
			if (this.seekToStart(this.playingMedia)) return;
			return this.go(-1);
		};
	}
	construct(managers) {
		this.managers = managers;
		this.musicListenTracker = new MusicListenTracker((inputDoc, listenedDuration) => {
			this.managers.appMessagesManager.reportMusicListen(inputDoc, listenedDuration).catch(() => {});
		});
		this.container = document.createElement("div");
		this.container.style.cssText = "display: none;";
		document.body.append(this.container);
		if (navigator.mediaSession) {
			const actions = {
				play: this.browserPlay,
				pause: this.browserPause,
				stop: this.browserStop,
				seekbackward: this.browserSeekBackward,
				seekforward: this.browserSeekForward,
				seekto: this.browserSeekTo,
				previoustrack: this.browserPrevious,
				nexttrack: this.browserNext
			};
			for (const action in actions) try {
				navigator.mediaSession.setActionHandler(action, actions[action]);
			} catch (err) {
				console.warn("MediaSession action is not supported:", action);
			}
		}
		rootScope.addEventListener("document_downloaded", (docId) => {
			const set = this.waitingDocumentsForLoad[docId];
			if (set) for (const media of set) this.onMediaDocumentLoad(media);
		});
		rootScope.addEventListener("media_play", () => {
			if (this.skipMediaPlayEvent) {
				this.skipMediaPlayEvent = false;
				return;
			}
			if (!this.pause() && this.pip) this.pip.pause();
		});
		const properties = {};
		[
			"volume",
			"boost",
			"muted",
			"playbackRate",
			"loop",
			"round"
		].forEach((key) => {
			const _key = "_" + key;
			properties[key] = {
				get: () => this[_key],
				set: (value) => {
					if (key === "volume" || key === "boost") value = clamp(value, 0, 1);
					if (this[_key] === value) return;
					this[_key] = value;
					if (this.playingMedia && (key !== "loop" || this.playingMediaType === "audio") && key !== "round") {
						if (key === "volume" || key === "muted" || key === "boost") this.applyVolumeToMedia(this.playingMedia, this.getVolumeForType(this.playingMediaType), this.muted, this.playingMediaType);
						else this.playingMedia[key] = value;
					}
					if (key === "playbackRate" && this.playingMediaType !== void 0) this.playbackRates[this.playingMediaType] = value;
					this.dispatchPlaybackParams();
				}
			};
		});
		Object.defineProperties(this, properties);
		this.addEventListener("play", (details) => {
			if (details.doc.type === "round") animationIntersector.toggleMediaPause(false);
			this.musicListenTracker.onPlay(details);
		});
		this.addEventListener("pause", () => {
			animationIntersector.toggleMediaPause(true);
		});
		this.addEventListener("stop", () => {
			this.musicListenTracker.finish();
		});
	}
	dispatchPlaybackParams() {
		this.dispatchEvent("playbackParams", this.getPlaybackParams());
	}
	getOrCreateMediaGain(media) {
		let entry = this.mediaGainMap.get(media);
		if (entry) return entry;
		try {
			const AC = window.AudioContext || window.webkitAudioContext;
			if (!AC) return void 0;
			if (!this.gainAudioContext) this.gainAudioContext = new AC();
			const ctx = this.gainAudioContext;
			const source = ctx.createMediaElementSource(media);
			const gain = ctx.createGain();
			const limiter = ctx.createDynamicsCompressor();
			limiter.threshold.value = -1;
			limiter.knee.value = 0;
			limiter.ratio.value = 20;
			limiter.attack.value = 0;
			limiter.release.value = .05;
			source.connect(gain);
			gain.connect(limiter);
			limiter.connect(ctx.destination);
			entry = {
				source,
				gain,
				limiter
			};
			this.mediaGainMap.set(media, entry);
			if (ctx.state === "suspended") ctx.resume().catch(() => {});
			return entry;
		} catch (e) {
			return;
		}
	}
	/**
	* Volume to feed playback for a given media type: voice/round add their boost on top of
	* the shared master, everything else uses the shared master alone.
	*/
	getVolumeForType(mediaType) {
		return mediaType === "voice" ? clamp(this._volume + this._boost, 0, 2) : this._volume;
	}
	/**
	* A video the controller does not play itself (one autoplaying in a chat, a peek at one) sounds as
	* loud as everything else - or is silent, when everything is.
	*/
	applySharedVolume(video) {
		this.applyVolumeToMedia(video, this.getVolumeForType("video"), this.muted, "video");
	}
	applyVolumeToMedia(media, volume, muted, mediaType) {
		if (mediaType === "voice") {
			const entry = this.getOrCreateMediaGain(media);
			if (entry) {
				if (this.gainAudioContext?.state === "suspended") this.gainAudioContext.resume().catch(() => {});
				const amp = volume <= 1 ? volume : volume * volume;
				const target = muted ? 0 : amp;
				try {
					entry.gain.gain.setTargetAtTime(target, this.gainAudioContext.currentTime, .01);
				} catch (e) {
					entry.gain.gain.value = target;
				}
				media.volume = 1;
				media.muted = muted;
				return;
			}
		}
		media.volume = Math.min(volume, 1);
		media.muted = muted;
	}
	getPlaybackParams() {
		const { volume, boost, muted, playbackRate, playbackRates, loop, round } = this;
		return {
			volume,
			boost,
			muted,
			playbackRate,
			playbackRates,
			loop,
			round
		};
	}
	setPlaybackParams(params) {
		this.playbackRates = params.playbackRates;
		this._volume = clamp(params.volume ?? 1, 0, 1);
		this._boost = clamp(params.boost ?? Math.max((params.volume ?? 1) - 1, 0), 0, 1);
		this._muted = params.muted;
		this._playbackRate = params.playbackRate;
		this._loop = params.loop;
		this._round = params.round;
	}
	addMedia(args) {
		const { message, autoload, clean, doc: docOverride, slot, middleware } = args;
		const { peerId, mid } = message;
		const storageKey = mid + (slot ?? 0);
		const s = !!message.pFlags.is_scheduled ? this.scheduled : this.media;
		let storage = s.get(message.peerId);
		if (!storage) s.set(message.peerId, storage = /* @__PURE__ */ new Map());
		let media = storage.get(storageKey);
		if (media) {
			this.bindMediaMiddleware(media, middleware);
			return media;
		}
		const doc = docOverride ?? getMediaFromMessage(message, true);
		storage.set(storageKey, media = document.createElement(doc.type === "round" || doc.type === "video" ? "video" : "audio"));
		if (doc.type === "round") media.setAttribute("playsinline", "true");
		const details = {
			peerId,
			mid,
			storageKey,
			docId: doc.id,
			doc,
			message,
			clean,
			isScheduled: message.pFlags.is_scheduled
		};
		this.mediaDetails.set(media, details);
		this.bindMediaMiddleware(media, middleware);
		media.volume = 1;
		this.container.append(media);
		media.addEventListener("play", this.onPlay);
		media.addEventListener("pause", this.onPause);
		media.addEventListener("ended", this.onEnded);
		if (doc.type !== "audio" && message?.pFlags.media_unread && message.fromId !== rootScope.myId) media.addEventListener("timeupdate", () => {
			this.managers.appMessagesManager.readMessages(peerId, [mid]);
		}, { once: true });
		const deferred = deferredPromise();
		if (autoload) deferred.resolve();
		else {
			const w = message.pFlags.is_scheduled ? this.waitingScheduledMediaForLoad : this.waitingMediaForLoad;
			let waitingStorage = w.get(peerId);
			if (!waitingStorage) w.set(peerId, waitingStorage = /* @__PURE__ */ new Map());
			waitingStorage.set(storageKey, deferred);
		}
		deferred.then(() => {
			if (doc.supportsStreaming || apiManagerProxy.getCacheContext(doc).url) this.onMediaDocumentLoad(media);
			else {
				let set = this.waitingDocumentsForLoad[doc.id];
				if (!set) set = this.waitingDocumentsForLoad[doc.id] = /* @__PURE__ */ new Set();
				set.add(media);
				appDownloadManager.downloadMediaURL({ media: doc });
			}
		});
		return media;
	}
	getMedia(peerId, mid, isScheduled) {
		return (isScheduled ? this.scheduled : this.media).get(peerId)?.get(mid);
	}
	bindMediaMiddleware(media, middleware) {
		if (!middleware) return;
		const details = this.mediaDetails.get(media);
		const consumers = details.consumers ?? (details.consumers = /* @__PURE__ */ new Set());
		if (consumers.has(middleware)) return;
		consumers.add(middleware);
		details.clean = false;
		middleware.onClean(() => {
			if (this.mediaDetails.get(media) !== details) return;
			consumers.delete(middleware);
			if (consumers.size) return;
			if (media === this.playingMedia) details.clean = true;
			else this.removeMedia(media);
		});
	}
	removeMedia(media) {
		const details = this.mediaDetails.get(media);
		if (!details) return;
		clearMediaElementSource(media);
		details.unpin?.();
		details.unpin = void 0;
		const storage = (details.isScheduled ? this.scheduled : this.media).get(details.peerId);
		storage?.delete(details.storageKey);
		if (!storage?.size) (details.isScheduled ? this.scheduled : this.media).delete(details.peerId);
		this.waitingDocumentsForLoad[details.docId]?.delete(media);
		const waiting = (details.isScheduled ? this.waitingScheduledMediaForLoad : this.waitingMediaForLoad).get(details.peerId);
		waiting?.delete(details.storageKey);
		if (!waiting?.size) (details.isScheduled ? this.waitingScheduledMediaForLoad : this.waitingMediaForLoad).delete(details.peerId);
		media.remove();
		this.mediaDetails.delete(media);
	}
	handleSafariStreamable(media) {
		media.addEventListener("play", () => {
			const currentTime = media.currentTime;
			media.addEventListener("progress", () => {
				setCurrentTime(media, media.duration - 1);
				media.addEventListener("progress", () => {
					setCurrentTime(media, currentTime);
					if (!media.paused) media.play();
				}, { once: true });
			}, { once: true });
		});
	}
	resolveWaitingForLoadMedia(peerId, mid, isScheduled, slot) {
		const w = isScheduled ? this.waitingScheduledMediaForLoad : this.waitingMediaForLoad;
		const storage = w.get(peerId);
		if (!storage) return;
		const storageKey = mid + (slot ?? 0);
		const promise = storage.get(storageKey);
		if (promise) {
			promise.resolve();
			storage.delete(storageKey);
			if (!storage.size) w.delete(peerId);
		}
	}
	/**
	* Only for audio
	*/
	isSafariBuffering(media) {
		return !!media.safariBuffering;
	}
	setSafariBuffering(media, value) {
		media.safariBuffering = value;
	}
	async setNewMediadata(message, playingMedia = this.playingMedia) {
		const managers = bindManagersToSession(this.managers);
		if (getAppWindow().document.pictureInPictureElement) return;
		await onMediaLoad(playingMedia, void 0, false);
		const doc = getMediaFromMessage(message, true);
		if (!doc) return;
		const artwork = [];
		const isVoice = doc.type === "voice" || doc.type === "round";
		let title = "", artist = "";
		if (doc.thumbs?.length) {
			const size = doc.thumbs[doc.thumbs.length - 1];
			if (!size.bytes) {
				const cacheContext = apiManagerProxy.getCacheContext(doc, size.type);
				if (cacheContext.url) artwork.push({
					src: cacheContext.url,
					sizes: `${size.w}x${size.h}`,
					type: "image/jpeg"
				});
				else appDownloadManager.downloadMediaURL({
					media: doc,
					thumb: size
				}).then(() => {
					if (this.playingMedia !== playingMedia || !cacheContext.url) return;
					this.setNewMediadata(message);
				});
			}
		} else if (isVoice) {
			const peerId = message.fromId || message.peerId;
			if (await managers.appPeersManager.getPeerPhoto(peerId)) {}
			title = await getPeerTitle({
				peerId,
				plainText: true,
				onlyFirstName: false
			});
			artist = langPack_default.format(doc.type === "voice" ? "AttachAudio" : "AttachRound", true);
		}
		if (!isVoice) {
			const titles = getAudioTitles(doc);
			title = titles?.title;
			artist = titles?.performer;
		}
		if (!artwork.length) {
			if (IS_APPLE) {
				if (IS_TOUCH_SUPPORTED) artwork.push({
					src: `assets/img/apple-touch-icon-precomposed.png`,
					sizes: "180x180",
					type: "image/png"
				});
				else artwork.push({
					src: `assets/img/apple-touch-icon.png`,
					sizes: "180x180",
					type: "image/png"
				});
			} else [
				72,
				96,
				144,
				192,
				256,
				384,
				512
			].forEach((size) => {
				const sizes = `${size}x${size}`;
				artwork.push({
					src: `assets/img/android-chrome-${sizes}.png`,
					sizes,
					type: "image/png"
				});
			});
		}
		if (this.playingMedia !== playingMedia) return;
		const metadata = new MediaMetadata({
			title,
			artist,
			artwork
		});
		this.setMediaMetadata(metadata);
	}
	setCurrentMediadata() {
		const { playingMedia } = this;
		if (!playingMedia) return;
		const message = this.getMessageByMedia(playingMedia);
		this.setNewMediadata(message, playingMedia);
	}
	getMessageByMedia(media) {
		return this.mediaDetails.get(media)?.message;
	}
	getPlayingDetails() {
		const { playingMedia } = this;
		if (!playingMedia) return;
		const message = this.getMessageByMedia(playingMedia);
		if (!message) return;
		const details = this.mediaDetails.get(playingMedia);
		return {
			doc: details?.doc || getMediaFromMessage(message, true),
			message,
			media: playingMedia,
			isSavedMusic: Boolean(message.pFlags.fakeForSavedMusic),
			/**
			* The message was built only to render a row (the music picker's preview list) and lives
			* nowhere else — there is no chat message behind it to open.
			*/
			isLocal: Boolean(message.pFlags.local),
			/**
			* True when the media was added with a non-zero `slot` (e.g. poll
			* description / explanation audio). Such media is played in isolation:
			* its list loader is empty, so next/previous navigation and looping
			* are not meaningful.
			*/
			isSlotted: !!details && details.storageKey !== details.mid,
			playbackParams: this.getPlaybackParams()
		};
	}
	pauseMediaInOtherTabs() {
		this.skipMediaPlayEvent = true;
		rootScope.dispatchEvent("media_play");
	}
	toggle(play, media = this.playingMedia) {
		if (!media) return false;
		if (play === void 0) play = media.paused;
		if (media.paused !== play) return false;
		if (play) media.play();
		else media.pause();
		return true;
	}
	getPlayingMedia() {
		return this.playingMedia;
	}
	/**
	* Slider value for the global-only selector (pinned audio plate) bound to whatever is
	* playing: voice shows `volume + boost` (its 0–200% range), everything else the shared
	* master `volume`.
	*/
	getGlobalSliderVolume() {
		return this.getVolumeForType(this.playingMediaType);
	}
	/**
	* Apply a global-only selector value. For voice the 0–100% part sets the shared master
	* (common with video/music) and the 100–200% part sets the voice-only boost, so the
	* boost stays out of `volume`. For everything else it just sets the shared master.
	*/
	setGlobalSliderVolume(value) {
		if (this.playingMediaType === "voice") {
			this.boost = Math.max(value - 1, 0);
			this.volume = Math.min(value, 1);
		} else this.volume = value;
	}
	/**
	* The tab moves to another account: the playback stops, and none of the previous account's media
	* may answer for a message of the new one - the ids of a private chat's messages repeat across accounts.
	*/
	resetForAccountSwitch() {
		this.stop(void 0, true);
		for (const media of [...this.mediaDetails.keys()]) this.removeMedia(media);
		this.listLoader?.cleanup();
		this.listLoader = this.searchContext = this.willBePlayedMedia = void 0;
		if (navigator.mediaSession) this.setMediaMetadata(null);
	}
	bindBrowserCallback(cb) {
		const handler = (details) => {
			cb(this.pip, details);
		};
		return handler;
	}
	seekToStart(media) {
		if (media?.currentTime > 5) {
			setCurrentTime(media, 0);
			this.toggle(true, media);
			return true;
		}
		return false;
	}
	willBePlayed(media) {
		this.willBePlayedMedia = media;
	}
	getListLoaderFactory() {
		return this.listLoaderFactory;
	}
	setSearchContext(context) {
		if (deepEqual(this.searchContext, context)) return false;
		this.searchContext = copy(context);
		return true;
	}
	getSearchContext() {
		return this.searchContext;
	}
	setTargets(current, prev, next, loaderFactory = AppMediaPlaybackController.defaultLoaderFactory) {
		let listLoader = this.listLoader;
		if (!listLoader || this.listLoaderFactory !== loaderFactory) {
			listLoader?.cleanup();
			listLoader = this.listLoader = loaderFactory({
				loadCount: 10,
				loadWhenLeft: 5,
				processItem: (message) => {
					this.addMedia({
						message,
						autoload: false
					});
					return {
						peerId: message.peerId,
						mid: message.mid
					};
				},
				onJump: (item, older) => {
					this.playItem(item);
				},
				onEmptied: () => {
					this.dispatchEvent("stop");
					this.stop();
				}
			});
			this.listLoaderFactory = loaderFactory;
		} else listLoader.reset();
		if (listLoader instanceof SearchListLoader) {
			const reverse = this.searchContext.folderId !== void 0 ? false : true;
			listLoader.setSearchContext(this.searchContext);
			if (prev) listLoader.setTargets(prev, next, reverse);
			else listLoader.reverse = reverse;
		}
		listLoader.setCurrent(current);
		listLoader.load(true);
		listLoader.load(false);
	}
	getPlaybackMediaTypeFromMessage(message) {
		const doc = getMediaFromMessage(message, true);
		let mediaType = "audio";
		if (doc?.type) {
			if (doc.type === "voice" || doc.type === "round") mediaType = "voice";
			else if (doc.type === "video") mediaType = "video";
		}
		return mediaType;
	}
	setMedia(media, message, standalone) {
		const mediaType = this.getPlaybackMediaTypeFromMessage(message);
		this._playbackRate = this.playbackRates[mediaType];
		this.playingMedia = media;
		this.playingMediaType = mediaType;
		if (!standalone) {
			this.applyVolumeToMedia(this.playingMedia, this.getVolumeForType(mediaType), this.muted, mediaType);
			this.playingMedia.playbackRate = this.playbackRate;
			if (mediaType === "audio") this.playingMedia.loop = this.loop;
		}
		if ("mediaSession" in navigator) this.setNewMediadata(message);
	}
	setSingleMedia({ media, message, standalone } = {}) {
		const playingMedia = this.playingMedia;
		const wasPlaying = this.pause();
		let onPlay;
		if (media) {
			onPlay = () => {
				const pip = this.pip;
				if (pip) pip.pause();
				this.pauseMediaInOtherTabs();
			};
			if (!media.paused) onPlay();
			media.addEventListener("play", onPlay);
		} else this.pauseMediaInOtherTabs();
		this.willBePlayed(void 0);
		if (media) this.setMedia(media, message, standalone);
		else this.playingMedia = void 0;
		this.toggleSwitchers(false);
		this.dispatchEvent("singleMedia", media);
		return (playPaused = wasPlaying) => {
			this.toggleSwitchers(true);
			if (playingMedia) {
				if (this.mediaDetails.get(playingMedia)) this.setMedia(playingMedia, this.getMessageByMedia(playingMedia));
				else this.next() || this.previous();
			}
			if (this.playingMedia === media) {
				this.playingMedia = void 0;
				this.playingMediaType = void 0;
			}
			if (media) media.removeEventListener("play", onPlay);
			if (playPaused) this.play();
		};
	}
	toggleSwitchers(enabled) {
		this.lockedSwitchers = !enabled;
	}
	setPictureInPicture(video) {
		this.pip = video;
		const listenerSetter = new ListenerSetter();
		listenerSetter.add(video)("leavepictureinpicture", () => {
			if (this.pip !== video) return;
			this.pip = void 0;
			listenerSetter.removeAll();
		}, { once: true });
		listenerSetter.add(video)("play", (e) => {
			if (this.playingMedia !== video) this.pause();
			this.pauseMediaInOtherTabs();
		});
	}
};
_AppMediaPlaybackController = AppMediaPlaybackController;
_AppMediaPlaybackController.defaultLoaderFactory = (options) => new SearchListLoader(options);
var appMediaPlaybackController = new AppMediaPlaybackController();
MOUNT_CLASS_TO.appMediaPlaybackController = appMediaPlaybackController;
//#endregion
//#region src/helpers/mediaProgressTicker.ts
var MAX_DELAY = 250;
var FRAME_DELAY = 34;
/**
* Calls `update` while `media` plays, as often as what it draws has something to show: when `bar`,
* as wide as the whole length, has a pixel to move, or the clock a second to turn. A frame loop
* updated a track of a few minutes sixty times a second for a fraction of a pixel each time - a
* main-thread frame every 16 ms for as long as the music played. A short voice message or a video in
* the viewer still moves its bar every frame. The width comes from a ResizeObserver, after the
* layout: a bar not put into the document yet, or one that grows while it plays, is followed.
*/
function createMediaProgressTicker(media, bar, update) {
	let timeout, frame, scheduledIn, width = 0, resizeObserver;
	let unfollow = [];
	const cancel = () => {
		scheduledIn?.clearTimeout(timeout);
		scheduledIn?.cancelAnimationFrame(frame);
		timeout = frame = scheduledIn = void 0;
	};
	const stop = () => {
		cancel();
		resizeObserver?.disconnect();
		resizeObserver = void 0;
		unfollow.forEach((callback) => callback());
		unfollow = [];
		media.removeEventListener("seeked", tick);
		media.removeEventListener("ratechange", tick);
	};
	const tick = () => {
		cancel();
		update();
		const win = getAppWindow();
		if (media.paused || win.document.hidden) return;
		const rate = media.playbackRate || 1;
		const msPerPixel = media.duration * 1e3 / Math.max(1, width) / rate;
		const msToSecond = (1e3 - media.currentTime * 1e3 % 1e3) / rate + 1;
		const delay = Math.min(Number.isFinite(msPerPixel) ? msPerPixel : MAX_DELAY, msToSecond, MAX_DELAY);
		scheduledIn = win;
		if (delay < FRAME_DELAY) frame = win.requestAnimationFrame(tick);
		else timeout = win.setTimeout(tick, delay);
	};
	return {
		start: () => {
			stop();
			media.addEventListener("seeked", tick);
			media.addEventListener("ratechange", tick);
			unfollow = [bindActiveWindowListener((win) => win.document, "visibilitychange", tick), onAppWindowChange(tick)];
			const RO = getAppWindow().ResizeObserver;
			if (bar && RO) {
				resizeObserver = new RO((entries) => {
					const { width: newWidth } = entries[entries.length - 1].contentRect;
					if (newWidth !== width) {
						width = newWidth;
						tick();
					}
				});
				resizeObserver.observe(bar);
			}
			tick();
		},
		stop
	};
}
//#endregion
//#region src/components/mediaProgressLine.ts
var _MediaProgressLine;
var MIN_VIDEO_TIMESTAMP_SEGMENT_WIDTH = 7;
var MediaProgressLine = class MediaProgressLine extends RangeSelector {
	constructor(options = {}) {
		super({
			ariaLabel: "AccDescr.PlaybackPosition",
			step: .01,
			min: 0,
			max: 1,
			withTransition: options.withTransition,
			useTransform: options.useTransform,
			keepLTR: true
		}, 0);
		this.options = options;
		this.segments = [];
		this.onHover = (e) => {
			if (this.hoverRAF) return;
			if (this.options.onHover) {
				this.rect = this.container.getBoundingClientRect();
				this.options.onHover(this.getValueByEvent({
					x: e.pageX,
					y: e.pageY,
					event: e
				}));
			}
			if (!this.filledContainer) return;
			if (this.activeSegmentIdx !== void 0) this.toggleSegment(this.activeSegmentIdx, false);
			const bcr = this.filledContainer.getBoundingClientRect();
			const x = e.clientX - bcr.left;
			const segmentIdx = this.segments.findIndex((segment) => segment.left <= x && x <= segment.right);
			if (segmentIdx >= 0) {
				this.activeSegmentIdx = segmentIdx;
				this.toggleSegment(segmentIdx, true);
			}
			this.updateTimeAndSegment(x, bcr.width);
		};
		this.onPointerOut = () => {
			this.options.onPointerOut?.();
			if (this.filledContainer) {
				this.toggleSegment(this.activeSegmentIdx, false);
				this.activeSegmentIdx = void 0;
			}
		};
		this.onLoadedData = () => {
			this.setSeekMax();
			this.setTimestampsClipPath();
		};
		this.onEnded = () => {
			this.setProgress();
		};
		this.onPlay = () => {
			this.progressTicker?.stop();
			this.progressTicker = createMediaProgressTicker(this.media, this.container, () => this.setProgress());
			if (this.streamable) this.setLoadProgress();
			this.progressTicker.start();
		};
		this.onTimeUpdate = () => {
			if (this.media.paused) {
				this.setProgress();
				if (this.streamable) this.setLoadProgress();
			}
		};
		this.onProgress = (e) => {
			this.setLoadProgress();
		};
		this.snapScrubValue = (value) => {
			if (!this.segments?.length) return value;
			const totalWidth = this.segments[this.segments.length - 1].right;
			const x = value / this.media.duration * totalWidth;
			for (const segment of this.segments) if (segment.left - 2 <= x && x <= segment.left + 3) return segment.time;
			return value;
		};
	}
	setMedia({ media, streamable, duration }) {
		if (this.media) this.removeListeners();
		if (streamable && !this.filledLoad) {
			this.filledLoad = document.createElement("div");
			this.filledLoad.classList.add("progress-line__filled", "progress-line__loaded");
			this.container.prepend(this.filledLoad);
		} else if (this.filledLoad) this.filledLoad.classList.toggle("hide", !streamable);
		this.media = media;
		this.streamable = streamable;
		this.setSeekMax(duration);
		if (!media.paused || media.currentTime > 0) this.onPlay();
		this.setTimestampsClipPath();
		let wasPlaying = false;
		this.setListeners();
		this.setHandlers({
			onMouseDown: () => {
				wasPlaying = !this.media.paused;
				wasPlaying && this.media.pause();
				this.options?.onSeekStart?.();
				this.container.classList.add("media-progress-line--seeking");
			},
			onMouseUp: (e) => {
				wasPlaying && safePlay(this.media);
				this.options?.onSeekEnd?.();
				this.container.classList.remove("media-progress-line--seeking");
			}
		});
	}
	initResizeObserver() {
		this.unobserveResize?.();
		this.unobserveResize = observeResize(this.filledContainer, () => {
			this.setTimestampsClipPath();
		});
	}
	toggleSegment(idx, active) {
		const element = this.clipPathSvg?.querySelector(`rect:nth-child(${idx + 1})`);
		if (!element) return;
		if (active) element.setAttribute("data-active", "true");
		else element.removeAttribute("data-active");
	}
	wrapProgressLinesInContainer() {
		if (this.filledContainer) return;
		this.container.classList.add("media-progress-line");
		this.filledContainer = document.createElement("div");
		this.filledContainer.classList.add("media-progress-line__filled-container");
		const thumb = document.createElement("div");
		thumb.classList.add("media-progress-line__thumb");
		this.currentTimeInfoElement = document.createElement("div");
		this.currentTimeInfoElement.classList.add("media-progress-line__current-time-info");
		this.currentTimeElement = document.createElement("div");
		this.currentTimeInfoElement.classList.add("media-progress-line__current-time");
		this.currentSegmentElement = document.createElement("div");
		this.currentTimeInfoElement.classList.add("media-progress-line__current-segment");
		this.currentTimeInfoElement.append(...[
			this.options.appendToTimeElement,
			this.currentSegmentElement,
			this.currentTimeElement
		].filter(Boolean));
		this.filledContainer.append(this.filled, this.filledLoad);
		this.container.prepend(this.filledContainer);
		this.container.append(thumb, this.currentTimeInfoElement);
		this.initResizeObserver();
	}
	clearTimeAndSegment() {
		this.currentTimeElement.textContent = "";
		this.currentSegmentElement.textContent = "";
	}
	updateTimeAndSegment(x, width) {
		if (!this.media || !this.currentTimeInfoElement) return;
		if (x < 0 || x > width) {
			this.clearTimeAndSegment();
			return;
		}
		const formattedTime = toHHMMSS(x / width * this.media.duration | 0);
		this.currentTimeElement.textContent = formattedTime;
		if (this.segments?.length > 0) {
			const segment = this.segments.find((segment) => segment.left <= x && x <= segment.right);
			const timestamp = this.options.videoTimestamps?.find((timestamp) => timestamp.time === segment.time);
			this.currentSegmentElement.textContent = limitSymbols(timestamp?.text || "", 24, 27);
		}
		const infoBcr = this.currentTimeInfoElement.getBoundingClientRect();
		const pushFromRight = Math.min(0, width - (x + infoBcr.width / 2));
		const pushFromLeft = Math.max(0, infoBcr.width / 2 - x);
		this.currentTimeInfoElement.style.setProperty("--current-time-info-x", x + pushFromLeft + pushFromRight + "px");
	}
	setTimestampsClipPath() {
		this.removeClipPathFromDOM();
		this.segments = [];
		if (!this.options.videoTimestamps?.length && !this.options.withTime) return;
		this.wrapProgressLinesInContainer();
		const totalWidth = this.filledContainer.getBoundingClientRect().width;
		const segments = this.segments = this.getTimestampSegments(totalWidth);
		if (!segments?.length) return;
		const margin = 1;
		const rects = segments.map((segment) => `<rect x="${(segment.left + margin).toFixed(2)}" width="${(segment.right - segment.left - 2).toFixed(2)}" rx="1" />`);
		this.usedClipPathId = ++MediaProgressLine.svgClipPathIdSeed;
		const svgId = `media-progress-line-clip-path-svg-${MediaProgressLine.svgClipPathIdSeed}`;
		const clipPathId = `media-progress-line-clip-path-${MediaProgressLine.svgClipPathIdSeed}`;
		this.removeClipPathFromDOM();
		this.clipPathSvg = createElementFromMarkup(`
      <svg width="0" height="0" class="media-progress-line-clip-path-svg" id="${svgId}">
        <clipPath id="${clipPathId}">
          ${rects.join("\n")}
        </clipPath>
      </svg>
    `);
		getOverlayRoot().append(this.clipPathSvg);
		this.filledContainer.style.clipPath = `url(#${clipPathId})`;
	}
	getTimestampSegments(totalWidth) {
		const { videoTimestamps } = this.options;
		if (!videoTimestamps?.length || !this.filledContainer) return [];
		const duration = this.media.duration;
		if (!duration) return [];
		const timePoints = videoTimestamps.map(({ time }) => time).filter((time) => time >= 0 && time <= duration).sort((a, b) => a - b);
		if (timePoints[0] !== 0) timePoints.unshift(0);
		timePoints.push(duration);
		const result = [];
		let prevRight = 0;
		for (let i = 0; i < timePoints.length - 1; i++) {
			const left = Math.max(prevRight, timePoints[i] / duration * totalWidth);
			let right = timePoints[i + 1] / duration * totalWidth;
			if (right <= left) continue;
			right = Math.max(right, left + MIN_VIDEO_TIMESTAMP_SEGMENT_WIDTH);
			prevRight = right;
			if (right + MIN_VIDEO_TIMESTAMP_SEGMENT_WIDTH >= totalWidth) right = totalWidth;
			result.push({
				left,
				right,
				time: timePoints[i]
			});
			if (right === totalWidth) break;
		}
		return result;
	}
	removeClipPathFromDOM() {
		this.clipPathSvg?.remove();
	}
	scrub(e) {
		let scrubTime = super.scrub(e, this.snapScrubValue);
		if (this.media.duration && scrubTime >= this.media.duration) scrubTime = this.media.duration - .1;
		setCurrentTime(this.media, scrubTime);
		return scrubTime;
	}
	setLoadProgress() {
		if (appMediaPlaybackController.isSafariBuffering(this.media)) return;
		const buf = this.media.buffered;
		const numRanges = buf.length;
		const currentTime = this.media.currentTime;
		let nearestStart = 0, end = 0;
		for (let i = 0; i < numRanges; ++i) {
			const start = buf.start(i);
			if (currentTime >= start && start >= nearestStart) {
				nearestStart = start;
				end = buf.end(i);
			}
		}
		const percents = this.max ? end / this.max : 0;
		this.filledLoad.style.width = percents * 100 + "%";
	}
	setSeekMax(duration) {
		const realDuration = this.media.duration || 0;
		if (duration === void 0 || realDuration) duration = realDuration;
		if (this.max = duration) this.seek.setAttribute("max", "" + this.max);
		else this.media.addEventListener("loadeddata", this.onLoadedData);
	}
	setProgress() {
		if (appMediaPlaybackController.isSafariBuffering(this.media)) return;
		const currentTime = this.media.currentTime;
		this.options.onTimeUpdate?.(currentTime);
		super.setProgress(currentTime);
		this.container.style.setProperty("--progress", currentTime / this.media.duration + "");
	}
	setListeners() {
		super.setListeners();
		this.media.addEventListener("ended", this.onEnded);
		this.media.addEventListener("play", this.onPlay);
		this.media.addEventListener("pause", this.onTimeUpdate);
		this.media.addEventListener("timeupdate", this.onTimeUpdate);
		this.streamable && this.media.addEventListener("progress", this.onProgress);
		if (this.options.onHover || this.options.videoTimestamps || this.options.withTime) {
			this.container.addEventListener("pointermove", this.onHover);
			this.container.addEventListener("pointerout", this.onPointerOut);
		}
	}
	removeListeners() {
		super.removeListeners();
		if (this.media) {
			this.media.removeEventListener("loadeddata", this.onLoadedData);
			this.media.removeEventListener("ended", this.onEnded);
			this.media.removeEventListener("play", this.onPlay);
			this.media.removeEventListener("pause", this.onTimeUpdate);
			this.media.removeEventListener("timeupdate", this.onTimeUpdate);
			this.streamable && this.media.removeEventListener("progress", this.onProgress);
		}
		this.container.removeEventListener("pointermove", this.onHover);
		this.container.removeEventListener("pointerout", this.onPointerOut);
		this.progressTicker?.stop();
		this.progressTicker = void 0;
	}
	cleanup() {
		this.removeClipPathFromDOM();
		this.removeListeners();
		this.unobserveResize?.();
		this.segments = [];
	}
};
_MediaProgressLine = MediaProgressLine;
_MediaProgressLine.svgClipPathIdSeed = 0;
//#endregion
//#region src/lib/appManagers/utils/messages/getMessageSenderPeerIdOrName.ts
function getMessageSenderPeerIdOrName(message) {
	if (message.fromId) return { peerId: message.fromId };
	else return { fromName: getFwdFromName(message.fwd_from) };
}
//#endregion
//#region src/components/wrappers/senderToPeer.ts
async function wrapSenderToPeer(message) {
	const managers = bindManagersToSession(rootScope.managers);
	const senderTitle = document.createElement("span");
	senderTitle.classList.add("sender-title");
	const fromMe = message.fromId === rootScope.myId && message.peerId !== rootScope.myId;
	senderTitle.append(fromMe ? i18n("FromYou") : await wrapPeerTitle({
		...getMessageSenderPeerIdOrName(message),
		dialog: message.peerId === rootScope.myId
	}));
	if (await managers.appPeersManager.isAnyGroup(message.peerId) || fromMe) {
		const peerTitle = await wrapPeerTitle({ peerId: message.peerId });
		senderTitle.append(" ➝ ", peerTitle);
	}
	return senderTitle;
}
//#endregion
//#region src/components/wrappers/sentTime.ts
function wrapSentTime(message) {
	const el = document.createElement("span");
	el.classList.add("sent-time");
	el.append(formatDateAccordingToTodayNew(/* @__PURE__ */ new Date(message.date * 1e3)));
	return el;
}
//#endregion
//#region src/components/chat/changeBubble.ts
/**
* A change of what an element shows that makes its message's bubble bigger or smaller (a voice message's text coming
* or going): made as the chat makes the changes of its bubbles, shown changing (`ChatBubbles.changeBubble`). Out of a
* chat's bubbles (a reply's quote, the media viewer) it is made at once.
*/
function changeBubble(element, callback) {
	const bubbles = hotReloadGuard.appImManager?.chats.find((chat) => chat.bubbles?.chatInner.contains(element))?.bubbles;
	if (bubbles) bubbles.changeBubble(element, callback);
	else callback();
}
//#endregion
//#region src/components/audioTranscription.tsx
var _tmpl$$1 = /*#__PURE__*/ template(`<span class=audio-transcribing-dots aria-hidden=true>`);
var _tmpl$2$1 = /*#__PURE__*/ template(`<div class=audio-transcribed-text>`);
var _tmpl$3$1 = /*#__PURE__*/ template(`<span>.`);
var _tmpl$4$1 = /*#__PURE__*/ template(`<div class=loader aria-hidden=true><svg class=audio-transcribe-outline xmlns=http://www.w3.org/2000/svg viewBox="0 0 32 24"><rect class=audio-transcribe-outline-rect fill=transparent stroke-width=3 stroke-linejoin=round rx=6 ry=6 stroke=var(--message-primary-color) stroke-dashoffset=1 stroke-dasharray=32,68 width=32 height=24>`);
/**
* Folds a `message_transcribed` update into the row's state. A transcription can arrive in pieces,
* so this runs once per update rather than once per request.
*/
function reduceTranscribed(prev, update) {
	return {
		status: "transcribed",
		text: update.text,
		pending: !!update.pending,
		error: !update.text && !update.pending,
		expanded: prev.status === "transcribed" ? prev.expanded : true
	};
}
function TranscribedText(props) {
	return (() => {
		var _el$ = _tmpl$2$1();
		insert(_el$, createComponent(Show, {
			get when() {
				return props.state.error;
			},
			get fallback() {
				return props.state.text;
			},
			get children() {
				return i18n("Chat.Voice.Transribe.Error");
			}
		}), null);
		insert(_el$, createComponent(Show, {
			get when() {
				return props.state.pending;
			},
			get children() {
				var _el$2 = _tmpl$$1();
				insert(_el$2, () => [
					1,
					2,
					3
				].map((i) => (() => {
					var _el$3 = _tmpl$3$1();
					className(_el$3, `audio-transcribing-dots-dot audio-transcribing-dots-dot-${i}`);
					return _el$3;
				})()));
				return _el$2;
			}
		}), null);
		createRenderEffect((_p$) => {
			var _v$ = props.id, _v$2 = props.state.pending, _v$3 = !!props.state.error, _v$4 = !props.state.expanded;
			_v$ !== _p$.e && setAttribute(_el$, "id", _p$.e = _v$);
			_v$2 !== _p$.t && setAttribute(_el$, "aria-busy", _p$.t = _v$2);
			_v$3 !== _p$.a && _el$.classList.toggle("is-error", _p$.a = _v$3);
			_v$4 !== _p$.o && _el$.classList.toggle("hide", _p$.o = _v$4);
			return _p$;
		}, {
			e: void 0,
			t: void 0,
			a: void 0,
			o: void 0
		});
		return _el$;
	})();
}
function TranscribeLoader(props) {
	return (() => {
		var _el$4 = _tmpl$4$1();
		createRenderEffect(() => _el$4.classList.toggle("active", !!props.active));
		return _el$4;
	})();
}
function TranscribeButton(props) {
	const hasText = createMemo(() => props.state.status === "transcribed");
	const textId = createUniqueId();
	const text = children(() => hasText() ? createComponent(TranscribedText, {
		id: textId,
		get state() {
			return props.state;
		}
	}) : void 0);
	let mounted;
	createEffect(() => {
		const element = text();
		if (!element || element === mounted) return;
		mounted = element;
		const row = props.row();
		if (findUpClassName(row, "document-wrapper")) row.after(element);
		else findUpClassName(row, "quote-text")?.append(element);
	});
	onCleanup(() => mounted?.remove());
	return createComponent(A11yButton, {
		"class": "audio-to-text-button",
		get ["aria-label"]() {
			return langPack_default.format(hasText() ? "AccDescr.ToggleTranscription" : "AccDescr.TranscribeAudio", true);
		},
		get ["aria-expanded"]() {
			return memo(() => !!hasText())() ? props.state.expanded : void 0;
		},
		get ["aria-controls"]() {
			return hasText() ? textId : void 0;
		},
		get ["aria-busy"]() {
			return props.state.status === "loading" || props.state.pending;
		},
		get disabled() {
			return props.state.status === "loading";
		},
		get onClick() {
			return props.onClick;
		},
		get children() {
			return [createComponent(IconTsx, { get icon() {
				return hasText() && props.state.expanded ? "up" : "transcribe";
			} }), createComponent(TranscribeLoader, { get active() {
				return props.state.status === "loading" || props.state.pending;
			} })];
		}
	});
}
/**
* Wires a voice row's transcribe button to `messages.transcribeAudio`. The row owns the state and
* listens for its own `message_transcribed` updates, so a transcription started anywhere — this
* button, another client, a cached result — lands on every rendering of that message.
*/
function createAudioTranscription(options) {
	const [state, setState] = createStore({
		status: "idle",
		text: "",
		pending: false,
		error: false,
		expanded: false
	});
	options.listenerSetter.add(rootScope)("message_transcribed", ({ peerId, mid, text, pending }) => {
		const { message } = options.getRow();
		if (peerId !== message.peerId || mid !== message.mid) return;
		changeBubble(options.getRow(), () => setState((prev) => reduceTranscribed(prev, {
			text,
			pending
		})));
	});
	const onClick = () => {
		if (state.status === "transcribed") {
			changeBubble(options.getRow(), () => setState("expanded", (expanded) => !expanded));
			return;
		}
		if (state.status === "loading") return;
		const { message } = options.getRow();
		if (message.pFlags.is_outgoing) return;
		if (!rootScope.getPremium()) {
			toastNew({
				langPackKey: "AudioAndVideoTranscription.PremiumAlert",
				langPackArguments: [anchorCallback(() => {
					hideToast();
					hotReloadGuard.showPremiumPopup({ feature: "voice_to_text" });
				})]
			});
			return;
		}
		setState("status", "loading");
		rootScope.managers.appMessagesManager.transcribeAudio(message).catch(noop);
	};
	return {
		state,
		/** Evaluated inside the row's `Row`, and owns the transcribed text mounted next to it. */
		button: () => createComponent(TranscribeButton, {
			state,
			get row() {
				return options.getRow;
			},
			onClick
		})
	};
}
//#endregion
//#region src/components/audioAnimatedIcon.ts
var MARKUP = {
	playpause: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 240 240\" width=\"240\" height=\"240\" fill=\"currentColor\" role=\"img\" aria-label=\"Play to pause\">\n  <g transform=\"translate(120 120) rotate(270)\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"120 120;120 120;120 120\" dur=\"0.233333s\" calcMode=\"spline\" keyTimes=\"0;0.857143;1\" keySplines=\"0.6 0 0.4 1;0 0 1 1\" fill=\"freeze\" begin=\"indefinite\"/><animateTransform attributeName=\"transform\" type=\"rotate\" values=\"270;360;360\" dur=\"0.233333s\" calcMode=\"spline\" keyTimes=\"0;0.857143;1\" keySplines=\"0.6 0 0.4 1;0 0 1 1\" fill=\"freeze\" begin=\"indefinite\" additive=\"sum\"/><path d=\"M0 -40 C0 -40 -51.786 -40 -51.786 -40 C-59.686 -40 -64.486 -31.3 -60.186 -24.6 C-60.186 -24.6 -8.386 56.8 -8.386 56.8 C-4.486 63 4.514 63 8.514 56.8 C9.508 51.574 10.004 47.641 10 45 C9.978 29.552 9.978 6.218 10 -25 C10 -35.4 7.9 -40 0 -40 Z\"><animate attributeName=\"d\" values=\"M0 -40 C0 -40 -51.786 -40 -51.786 -40 C-59.686 -40 -64.486 -31.3 -60.186 -24.6 C-60.186 -24.6 -8.386 56.8 -8.386 56.8 C-4.486 63 4.514 63 8.514 56.8 C9.508 51.574 10.004 47.641 10 45 C9.978 29.552 9.978 6.218 10 -25 C10 -35.4 7.9 -40 0 -40 Z;M-20 -50 C-20 -61 -29 -70 -40 -70 C-51 -70 -60 -61 -60 -50 C-60 -50 -60 50 -60 50 C-60 61 -51 70 -40 70 C-29 70 -20 61 -20 50 C-20 41.879 -20 -2.764 -20 -30 C-20 -39.654 -20 -47.121 -20 -50 Z;M-20 -50 C-20 -61 -29 -70 -40 -70 C-51 -70 -60 -61 -60 -50 C-60 -50 -60 50 -60 50 C-60 61 -51 70 -40 70 C-29 70 -20 61 -20 50 C-20 41.879 -20 -2.764 -20 -30 C-20 -39.654 -20 -47.121 -20 -50 Z\" dur=\"0.233333s\" calcMode=\"spline\" keyTimes=\"0;0.857143;1\" keySplines=\"0.6 0 0.4 1;0 0 1 1\" fill=\"freeze\" begin=\"indefinite\"/></path><path d=\"M51.814 -40 C51.814 -40 0 -40 0 -40 C-7.9 -40 -10 -35.4 -10 -25 C-10.303 6.308 -10.303 29.641 -10 45 C-9.944 47.819 -9.406 51.752 -8.386 56.8 C-4.486 63 4.514 63 8.514 56.8 C8.514 56.8 60.214 -24.6 60.214 -24.6 C64.514 -31.3 59.714 -40 51.814 -40 Z\"><animate attributeName=\"d\" values=\"M51.814 -40 C51.814 -40 0 -40 0 -40 C-7.9 -40 -10 -35.4 -10 -25 C-10.303 6.308 -10.303 29.641 -10 45 C-9.944 47.819 -9.406 51.752 -8.386 56.8 C-4.486 63 4.514 63 8.514 56.8 C8.514 56.8 60.214 -24.6 60.214 -24.6 C64.514 -31.3 59.714 -40 51.814 -40 Z;M40 -70 C29 -70 20 -61 20 -50 C20 -47.121 20 -39.654 20 -30 C20 -2.764 20 41.879 20 50 C20 61 29 70 40 70 C51 70 60 61 60 50 C60 50 60 -50 60 -50 C60 -61 51 -70 40 -70 Z;M40 -70 C29 -70 20 -61 20 -50 C20 -47.121 20 -39.654 20 -30 C20 -2.764 20 41.879 20 50 C20 61 29 70 40 70 C51 70 60 61 60 50 C60 50 60 -50 60 -50 C60 -61 51 -70 40 -70 Z\" dur=\"0.233333s\" calcMode=\"spline\" keyTimes=\"0;0.857143;1\" keySplines=\"0.6 0 0.4 1;0 0 1 1\" fill=\"freeze\" begin=\"indefinite\"/></path></g>\n</svg>\n",
	pauseplay: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 240 240\" width=\"240\" height=\"240\" fill=\"currentColor\" role=\"img\" aria-label=\"Pause to play\">\n  <g transform=\"translate(120 120) rotate(180)\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"120 120;120 120;120 120\" dur=\"0.233333s\" calcMode=\"spline\" keyTimes=\"0;0.857143;1\" keySplines=\"0.6 0 0.4 1;0 0 1 1\" fill=\"freeze\" begin=\"indefinite\"/><animateTransform attributeName=\"transform\" type=\"rotate\" values=\"180;270;270\" dur=\"0.233333s\" calcMode=\"spline\" keyTimes=\"0;0.857143;1\" keySplines=\"0.6 0 0.4 1;0 0 1 1\" fill=\"freeze\" begin=\"indefinite\" additive=\"sum\"/><path d=\"M-20 -50 C-20 -61 -29 -70 -40 -70 C-51 -70 -60 -61 -60 -50 C-60 -50 -60 50 -60 50 C-60 61 -51 70 -40 70 C-29 70 -20 61 -20 50 C-20 41.879 -20 -2.764 -20 -30 C-20 -39.654 -20 -47.121 -20 -50 Z\"><animate attributeName=\"d\" values=\"M-20 -50 C-20 -61 -29 -70 -40 -70 C-51 -70 -60 -61 -60 -50 C-60 -50 -60 50 -60 50 C-60 61 -51 70 -40 70 C-29 70 -20 61 -20 50 C-20 41.879 -20 -2.764 -20 -30 C-20 -39.654 -20 -47.121 -20 -50 Z;M0 -40 C0 -40 -51.786 -40 -51.786 -40 C-59.686 -40 -64.486 -31.3 -60.186 -24.6 C-60.186 -24.6 -8.386 56.8 -8.386 56.8 C-4.486 63 4.514 63 8.514 56.8 C9.508 51.574 10.004 47.641 10 45 C9.978 29.552 9.978 6.218 10 -25 C10 -35.4 7.9 -40 0 -40 Z;M0 -40 C0 -40 -51.786 -40 -51.786 -40 C-59.686 -40 -64.486 -31.3 -60.186 -24.6 C-60.186 -24.6 -8.386 56.8 -8.386 56.8 C-4.486 63 4.514 63 8.514 56.8 C9.508 51.574 10.004 47.641 10 45 C9.978 29.552 9.978 6.218 10 -25 C10 -35.4 7.9 -40 0 -40 Z\" dur=\"0.233333s\" calcMode=\"spline\" keyTimes=\"0;0.857143;1\" keySplines=\"0.6 0 0.4 1;0 0 1 1\" fill=\"freeze\" begin=\"indefinite\"/></path><path d=\"M40 -70 C29 -70 20 -61 20 -50 C20 -47.121 20 -39.654 20 -30 C20 -2.764 20 41.879 20 50 C20 61 29 70 40 70 C51 70 60 61 60 50 C60 50 60 -50 60 -50 C60 -61 51 -70 40 -70 Z\"><animate attributeName=\"d\" values=\"M40 -70 C29 -70 20 -61 20 -50 C20 -47.121 20 -39.654 20 -30 C20 -2.764 20 41.879 20 50 C20 61 29 70 40 70 C51 70 60 61 60 50 C60 50 60 -50 60 -50 C60 -61 51 -70 40 -70 Z;M51.814 -40 C51.814 -40 0 -40 0 -40 C-7.9 -40 -10 -35.4 -10 -25 C-10.303 6.308 -10.303 29.641 -10 45 C-9.944 47.819 -9.406 51.752 -8.386 56.8 C-4.486 63 4.514 63 8.514 56.8 C8.514 56.8 60.214 -24.6 60.214 -24.6 C64.514 -31.3 59.714 -40 51.814 -40 Z;M51.814 -40 C51.814 -40 0 -40 0 -40 C-7.9 -40 -10 -35.4 -10 -25 C-10.303 6.308 -10.303 29.641 -10 45 C-9.944 47.819 -9.406 51.752 -8.386 56.8 C-4.486 63 4.514 63 8.514 56.8 C8.514 56.8 60.214 -24.6 60.214 -24.6 C64.514 -31.3 59.714 -40 51.814 -40 Z\" dur=\"0.233333s\" calcMode=\"spline\" keyTimes=\"0;0.857143;1\" keySplines=\"0.6 0 0.4 1;0 0 1 1\" fill=\"freeze\" begin=\"indefinite\"/></path></g>\n</svg>\n",
	forward: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 240 240\" width=\"240\" height=\"240\" fill=\"currentColor\" role=\"img\" aria-label=\"Fast forward\">\n  <g transform=\"translate(0 120.49) scale(1 1) translate(120 -0.49)\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"0 120.49;0 120.49;0 120.49\" dur=\"0.233333s\" calcMode=\"spline\" keyTimes=\"0;0.857143;1\" keySplines=\"0.6 0 0.4 1;0 0 1 1\" fill=\"freeze\" begin=\"indefinite\"/><animateTransform attributeName=\"transform\" type=\"scale\" values=\"0 0;1 1;1 1\" dur=\"0.233333s\" calcMode=\"spline\" keyTimes=\"0;0.857143;1\" keySplines=\"0.6 0 0.4 1;0 0 1 1\" fill=\"freeze\" begin=\"indefinite\" additive=\"sum\"/><animateTransform attributeName=\"transform\" type=\"translate\" values=\"120 -0.49;120 -0.49;120 -0.49\" dur=\"0.233333s\" calcMode=\"spline\" keyTimes=\"0;0.857143;1\" keySplines=\"0.6 0 0.4 1;0 0 1 1\" fill=\"freeze\" begin=\"indefinite\" additive=\"sum\"/><path d=\"M-64.2 49.608 C-64.2 49.608 -6.5 8.908 -6.5 8.908 C-0.9 4.908 -0.9 -3.492 -6.5 -7.392 C-6.5 -7.392 -64.2 -48.192 -64.2 -48.192 C-70.9 -52.792 -80 -48.092 -80 -39.992 C-80 -39.992 -80 41.408 -80 41.408 C-80 49.508 -70.9 54.208 -64.2 49.608 Z\"/></g>\n  <g transform=\"translate(130 121.146) translate(79.671 -1.146)\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"40 121.146;130 121.146;130 121.146\" dur=\"0.233333s\" calcMode=\"spline\" keyTimes=\"0;0.857143;1\" keySplines=\"0.6 0 0.4 1;0 0 1 1\" fill=\"freeze\" begin=\"indefinite\"/><animateTransform attributeName=\"transform\" type=\"translate\" values=\"79.671 -1.146;79.671 -1.146;79.671 -1.146\" dur=\"0.233333s\" calcMode=\"spline\" keyTimes=\"0;0.857143;1\" keySplines=\"0.6 0 0.4 1;0 0 1 1\" fill=\"freeze\" begin=\"indefinite\" additive=\"sum\"/><path d=\"M-64.2 49.608 C-64.2 49.608 -6.5 8.908 -6.5 8.908 C-0.9 4.908 -0.9 -3.492 -6.5 -7.392 C-6.5 -7.392 -64.2 -48.192 -64.2 -48.192 C-70.9 -52.792 -80 -48.092 -80 -39.992 C-80 -39.992 -80 41.408 -80 41.408 C-80 49.508 -70.9 54.208 -64.2 49.608 Z\"/></g>\n  <g transform=\"translate(239.261 120.739) scale(0 0) translate(-119.261 -0.739)\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"239.261 120.739;239.261 120.739;239.261 120.739\" dur=\"0.233333s\" calcMode=\"spline\" keyTimes=\"0;0.857143;1\" keySplines=\"0.6 0 0.4 1;0 0 1 1\" fill=\"freeze\" begin=\"indefinite\"/><animateTransform attributeName=\"transform\" type=\"scale\" values=\"1 1;0 0;0 0\" dur=\"0.233333s\" calcMode=\"spline\" keyTimes=\"0;0.857143;1\" keySplines=\"0.6 0 0.4 1;0 0 1 1\" fill=\"freeze\" begin=\"indefinite\" additive=\"sum\"/><animateTransform attributeName=\"transform\" type=\"translate\" values=\"-119.261 -0.739;-119.261 -0.739;-119.261 -0.739\" dur=\"0.233333s\" calcMode=\"spline\" keyTimes=\"0;0.857143;1\" keySplines=\"0.6 0 0.4 1;0 0 1 1\" fill=\"freeze\" begin=\"indefinite\" additive=\"sum\"/><path d=\"M10 -39.992 C10 -39.992 10 41.408 10 41.408 C10 49.508 19.1 54.208 25.8 49.608 C25.8 49.608 83.5 8.908 83.5 8.908 C89.1 4.908 89.1 -3.492 83.5 -7.392 C83.5 -7.392 25.8 -48.092 25.8 -48.092 C19.1 -52.792 10 -48.092 10 -39.992 Z\"/></g>\n</svg>\n",
	rewind: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 240 240\" width=\"240\" height=\"240\" fill=\"currentColor\" role=\"img\" aria-label=\"Rewind\">\n  <g transform=\"translate(120 120) scale(-1 -1) translate(-120 -120)\">\n    <g transform=\"translate(0 120.49) scale(1 1) translate(120 -0.49)\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"0 120.49;0 120.49;0 120.49\" dur=\"0.233333s\" calcMode=\"spline\" keyTimes=\"0;0.857143;1\" keySplines=\"0.6 0 0.4 1;0 0 1 1\" fill=\"freeze\" begin=\"indefinite\"/><animateTransform attributeName=\"transform\" type=\"scale\" values=\"0 0;1 1;1 1\" dur=\"0.233333s\" calcMode=\"spline\" keyTimes=\"0;0.857143;1\" keySplines=\"0.6 0 0.4 1;0 0 1 1\" fill=\"freeze\" begin=\"indefinite\" additive=\"sum\"/><animateTransform attributeName=\"transform\" type=\"translate\" values=\"120 -0.49;120 -0.49;120 -0.49\" dur=\"0.233333s\" calcMode=\"spline\" keyTimes=\"0;0.857143;1\" keySplines=\"0.6 0 0.4 1;0 0 1 1\" fill=\"freeze\" begin=\"indefinite\" additive=\"sum\"/><path d=\"M-64.2 49.608 C-64.2 49.608 -6.5 8.908 -6.5 8.908 C-0.9 4.908 -0.9 -3.492 -6.5 -7.392 C-6.5 -7.392 -64.2 -48.192 -64.2 -48.192 C-70.9 -52.792 -80 -48.092 -80 -39.992 C-80 -39.992 -80 41.408 -80 41.408 C-80 49.508 -70.9 54.208 -64.2 49.608 Z\"/></g>\n    <g transform=\"translate(130 121.146) translate(79.671 -1.146)\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"40 121.146;130 121.146;130 121.146\" dur=\"0.233333s\" calcMode=\"spline\" keyTimes=\"0;0.857143;1\" keySplines=\"0.6 0 0.4 1;0 0 1 1\" fill=\"freeze\" begin=\"indefinite\"/><animateTransform attributeName=\"transform\" type=\"translate\" values=\"79.671 -1.146;79.671 -1.146;79.671 -1.146\" dur=\"0.233333s\" calcMode=\"spline\" keyTimes=\"0;0.857143;1\" keySplines=\"0.6 0 0.4 1;0 0 1 1\" fill=\"freeze\" begin=\"indefinite\" additive=\"sum\"/><path d=\"M-64.2 49.608 C-64.2 49.608 -6.5 8.908 -6.5 8.908 C-0.9 4.908 -0.9 -3.492 -6.5 -7.392 C-6.5 -7.392 -64.2 -48.192 -64.2 -48.192 C-70.9 -52.792 -80 -48.092 -80 -39.992 C-80 -39.992 -80 41.408 -80 41.408 C-80 49.508 -70.9 54.208 -64.2 49.608 Z\"/></g>\n    <g transform=\"translate(239.261 120.739) scale(0 0) translate(-119.261 -0.739)\"><animateTransform attributeName=\"transform\" type=\"translate\" values=\"239.261 120.739;239.261 120.739;239.261 120.739\" dur=\"0.233333s\" calcMode=\"spline\" keyTimes=\"0;0.857143;1\" keySplines=\"0.6 0 0.4 1;0 0 1 1\" fill=\"freeze\" begin=\"indefinite\"/><animateTransform attributeName=\"transform\" type=\"scale\" values=\"1 1;0 0;0 0\" dur=\"0.233333s\" calcMode=\"spline\" keyTimes=\"0;0.857143;1\" keySplines=\"0.6 0 0.4 1;0 0 1 1\" fill=\"freeze\" begin=\"indefinite\" additive=\"sum\"/><animateTransform attributeName=\"transform\" type=\"translate\" values=\"-119.261 -0.739;-119.261 -0.739;-119.261 -0.739\" dur=\"0.233333s\" calcMode=\"spline\" keyTimes=\"0;0.857143;1\" keySplines=\"0.6 0 0.4 1;0 0 1 1\" fill=\"freeze\" begin=\"indefinite\" additive=\"sum\"/><path d=\"M10 -39.992 C10 -39.992 10 41.408 10 41.408 C10 49.508 19.1 54.208 25.8 49.608 C25.8 49.608 83.5 8.908 83.5 8.908 C89.1 4.908 89.1 -3.492 83.5 -7.392 C83.5 -7.392 25.8 -48.092 25.8 -48.092 C19.1 -52.792 10 -48.092 10 -39.992 Z\"/></g>\n  </g>\n</svg>\n"
};
/**
* Chrome no longer renders SMIL (since 150): the timeline advances and `beginEvent` fires, but the
* animated value never reaches the element, so a glyph only ever snaps between its first and last
* frame — which is what "the animation sometimes doesn't play" turned out to be. So the glyph's own
* keyframes are replayed through the Web Animations API instead, which every engine has.
*
* Only the path morph needs more than that: `d` is animatable as a CSS property in Chrome and
* Firefox but not yet in Safari, and that is the one case left on SMIL — which Safari does still
* render. The choice is made per glyph rather than per browser, so the seek pulses, which only move
* their shapes about, take the Web Animations path everywhere.
*/
var CAN_ANIMATE = typeof Element !== "undefined" && typeof Element.prototype.animate === "function";
var CAN_ANIMATE_PATH = CAN_ANIMATE && typeof CSS !== "undefined" && !!CSS.supports?.("d", "path(\"M 0 0\")");
var parseDuration = (value) => parseFloat(value) * (value.endsWith("ms") ? 1 : 1e3);
/** The SMIL transform types the glyphs use, written as the CSS functions that mean the same. */
function transformFunction(type, value) {
	const [first, second, third] = value.trim().split(/[\s,]+/);
	switch (type) {
		case "translate": return `translate(${first}px, ${second || 0}px)`;
		case "scale": return `scale(${first}, ${second || first})`;
		case "rotate": return third === void 0 ? `rotate(${first}deg)` : `translate(${second}px, ${third}px) rotate(${first}deg) translate(${-parseFloat(second)}px, ${-parseFloat(third)}px)`;
		default: return "";
	}
}
/**
* Reads a glyph's SMIL declarations as Web Animations keyframes. Exported for the tests — the
* conversion is the part that has to keep matching the assets.
*/
function readGlyphAnimations(svg) {
	const byTarget = /* @__PURE__ */ new Map();
	Array.from(svg.querySelectorAll("animate, animateTransform")).forEach((animation) => {
		const target = animation.parentElement;
		const list = byTarget.get(target);
		if (list) list.push(animation);
		else byTarget.set(target, [animation]);
	});
	const result = [];
	byTarget.forEach((animations, target) => {
		const first = animations[0];
		const duration = parseDuration(first.getAttribute("dur"));
		const offsets = first.getAttribute("keyTimes").split(";").map(Number);
		const splines = (first.getAttribute("keySplines") || "").split(";").filter(Boolean);
		const keyframes = offsets.map((offset, index) => {
			const keyframe = { offset };
			let transform = "";
			animations.forEach((animation) => {
				const value = animation.getAttribute("values").split(";")[index].trim();
				if (animation.getAttribute("attributeName") === "d") {
					keyframe.d = `path("${value}")`;
					return;
				}
				const piece = transformFunction(animation.getAttribute("type"), value);
				transform = animation.getAttribute("additive") === "sum" && transform ? `${transform} ${piece}` : piece;
			});
			if (transform) keyframe.transform = transform;
			const spline = splines[index];
			if (spline) keyframe.easing = `cubic-bezier(${spline.trim().split(/[\s,]+/).join(", ")})`;
			return keyframe;
		});
		result.push({
			target,
			keyframes,
			duration
		});
	});
	return result;
}
/**
* Builds one of the glyphs. It holds its first frame until `play()` runs — nothing moves just
* because the icon was mounted.
*/
function createAudioAnimatedIcon(name, autoplay) {
	const element = createElementFromMarkup(MARKUP[name]);
	element.classList.add("audio-animated-icon");
	const parsed = readGlyphAnimations(element);
	const morphsPath = parsed.some(({ keyframes }) => keyframes.some((keyframe) => keyframe.d));
	if (!CAN_ANIMATE || morphsPath && !CAN_ANIMATE_PATH) {
		const animations = Array.from(element.querySelectorAll("animate, animateTransform"));
		if (autoplay) animations.forEach((animation) => animation.setAttribute("begin", "0s"));
		return {
			element,
			duration: parsed[0]?.duration || 0,
			play: () => animations.forEach((animation) => animation.beginElement()),
			elapsed: () => 0,
			seek: () => {}
		};
	}
	element.querySelectorAll("animate, animateTransform").forEach((animation) => animation.remove());
	parsed.forEach(({ target, keyframes }) => {
		if (keyframes.some((keyframe) => keyframe.transform)) target.style.transformOrigin = "0px 0px";
	});
	let animations;
	const start = (offset) => {
		animations = parsed.map(({ target, keyframes, duration }) => {
			const animation = target.animate(keyframes, {
				duration,
				fill: "forwards"
			});
			if (offset) animation.currentTime = offset;
			return animation;
		});
	};
	if (autoplay) start();
	return {
		element,
		duration: parsed[0]?.duration || 0,
		play: () => {
			animations?.forEach((animation) => animation.cancel());
			start();
		},
		elapsed: () => animations?.[0]?.currentTime || 0,
		seek: (ms) => {
			if (animations) animations.forEach((animation) => animation.currentTime = ms);
			else start(ms);
		}
	};
}
/**
* The play button's glyph. Animating means starting on the glyph already on screen and moving to the
* new one; the very first call is silent, so a row that mounts mid-playback simply shows the pause
* glyph rather than performing for nobody.
*/
function createPlayPauseIcon(getContainer) {
	let playing;
	let current;
	return (next, animate = true) => {
		if (playing === next) return;
		const isFirst = playing === void 0;
		playing = next;
		const shouldAnimate = animate && !isFirst;
		const icon = createAudioAnimatedIcon(shouldAnimate ? next ? "playpause" : "pauseplay" : next ? "pauseplay" : "playpause", shouldAnimate);
		if (shouldAnimate && current) {
			const elapsed = Math.min(current.elapsed(), icon.duration);
			if (elapsed) icon.seek(icon.duration - elapsed);
		}
		current = icon;
		getContainer().replaceChildren(icon.element);
	};
}
//#endregion
//#region src/components/audio.tsx
var _tmpl$ = /*#__PURE__*/ template(`<button type=button class=audio-toggle><div class=audio-play-icon aria-hidden=true>`);
var _tmpl$2 = /*#__PURE__*/ template(`<div class=audio-toggle><div class=audio-play-icon>`);
var _tmpl$3 = /*#__PURE__*/ template(`<div class=audio-waveform-container dir=ltr>`);
var _tmpl$4 = /*#__PURE__*/ template(`<span class=audio-title-text>`);
var _tmpl$5 = /*#__PURE__*/ template(`<span class="audio-performer text-bold">`);
var _tmpl$6 = /*#__PURE__*/ template(`<div class=audio-download>`);
var _tmpl$7 = /*#__PURE__*/ template(`<span class=audio-unread-dot>`);
var _tmpl$8 = /*#__PURE__*/ template(`<div class=audio-time>`);
var SUBTITLE_SEPARATOR = " • ";
hotListen(void 0, rootScope, "messages_media_read", ({ mids, peerId }) => {
	mids.forEach((mid) => {
		const attr = `[data-mid="${mid}"][data-peer-id="${peerId}"]`;
		Array.from(document.querySelectorAll(`.audio.is-unread${attr}, .media-round.is-unread${attr}`)).forEach((elem) => {
			if (isAudioElement(elem)) elem.setUnread(false);
			else elem.classList.remove("is-unread");
		});
	});
});
function decodeWaveform(waveform) {
	if (!(waveform instanceof Uint8Array)) waveform = new Uint8Array(waveform);
	const valueCount = waveform.length * 8 / 5 | 0;
	if (!valueCount) return new Uint8Array([]);
	const result = new Uint8Array(valueCount);
	for (let i = 0; i < valueCount; i++) {
		const byteIndex = i * 5 / 8 | 0;
		const bitShift = i * 5 % 8;
		const low = waveform[byteIndex];
		const high = byteIndex + 1 < waveform.length ? waveform[byteIndex + 1] : 0;
		result[i] = (low | high << 8) >> bitShift & 31;
	}
	return result;
}
function createWaveformBars(waveform, duration) {
	const barWidth = 2;
	const barHeightMin = 4;
	const barHeightMax = (mediaSizes.isMobile, 23);
	const minW = mediaSizes.isMobile ? 152 : 190;
	const maxW = mediaSizes.isMobile ? 190 : 256;
	const availW = clamp(duration / 60 * maxW, minW, maxW);
	const normValue = Math.max(...waveform);
	const wfSize = waveform.length;
	const barCount = Math.min(availW / 4 | 0, wfSize);
	let maxValue = 0;
	const maxDelta = 19;
	let html = "";
	for (let i = 0, barX = 0, sumI = 0; i < wfSize; ++i) {
		const value = waveform[i] || 0;
		if (sumI + barCount >= wfSize) {
			sumI = sumI + barCount - wfSize;
			if (sumI < (barCount + 1) / 2) {
				if (maxValue < value) maxValue = value;
			}
			const bar_value = Math.max((maxValue * maxDelta + (normValue + 1) / 2) / (normValue + 1), barHeightMin);
			const h = `<rect class="audio-waveform-bar" x="${barX}" y="${barHeightMax - bar_value}" width="${barWidth}" height="${bar_value}" rx="1" ry="1"></rect>`;
			html += h;
			barX += 4;
			if (sumI < (barCount + 1) / 2) maxValue = 0;
			else maxValue = value;
		} else {
			if (maxValue < value) maxValue = value;
			sumI += barCount;
		}
	}
	let container, svg;
	if (!html) {} else {
		container = document.createElement("div");
		container.classList.add("audio-waveform");
		svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		svg.classList.add("audio-waveform-bars");
		svg.setAttributeNS(null, "width", "" + availW);
		svg.setAttributeNS(null, "height", "23");
		svg.setAttributeNS(null, "viewBox", `0 0 ${availW} ${barHeightMax}`);
		svg.insertAdjacentHTML("beforeend", html);
		container.append(svg);
	}
	return {
		svg,
		container,
		availW
	};
}
function AudioRow(props) {
	const toggle = Modes.a11y ? (() => {
		var _el$ = _tmpl$(), _el$2 = _el$.firstChild;
		var _ref$ = props.ref;
		typeof _ref$ === "function" ? use(_ref$, _el$) : props.ref = _el$;
		var _ref$2 = props.playIconRef;
		typeof _ref$2 === "function" ? use(_ref$2, _el$2) : props.playIconRef = _el$2;
		createRenderEffect(() => setAttribute(_el$, "aria-label", langPack_default.format("Play", true)));
		return _el$;
	})() : (() => {
		var _el$3 = _tmpl$2(), _el$4 = _el$3.firstChild;
		var _ref$3 = props.ref;
		typeof _ref$3 === "function" ? use(_ref$3, _el$3) : props.ref = _el$3;
		var _ref$4 = props.playIconRef;
		typeof _ref$4 === "function" ? use(_ref$4, _el$4) : props.playIconRef = _el$4;
		return _el$3;
	})();
	return createComponent(Row, {
		noRipple: true,
		get clickable() {
			return props.clickable;
		},
		get classList() {
			return {
				"audio": true,
				"audio-details": true,
				"is-voice": props.state.isVoice,
				"is-out": props.state.isOut,
				"can-transcribe": props.state.canTranscribe,
				"is-unread": props.state.isUnread,
				"is-playing": props.state.isPlaying,
				"is-outgoing": props.state.isOutgoing,
				"audio-with-thumb": props.state.withThumb,
				"corner-download": props.state.cornerDownload,
				"downloading": props.state.downloading,
				"audio-show-progress": props.state.showProgress
			};
		},
		get children() {
			return [createComponent(Row.Media, {
				size: "big",
				element: toggle
			}), memo(() => props.content())];
		}
	});
}
async function wrapVoiceMessage(ctx) {
	const { options, doc, setState } = ctx;
	const message = options.message;
	setState("isVoice", true);
	if (message.pFlags.out) setState("isOut", true);
	let waveform = getAudioAttribute(doc)?.waveform || new Uint8Array([]);
	waveform = decodeWaveform(waveform.slice(0, 63));
	const { svg, container: svgContainer, availW } = createWaveformBars(waveform, doc.duration);
	let fakeSvgContainer;
	if (svgContainer) {
		fakeSvgContainer = svgContainer.cloneNode(true);
		fakeSvgContainer.classList.add("audio-waveform-fake");
		svgContainer.classList.add("audio-waveform-background");
	}
	const waveformContainer = (() => {
		var _el$5 = _tmpl$3();
		insert(_el$5, svgContainer && [svgContainer, fakeSvgContainer]);
		return _el$5;
	})();
	let transcribeButton;
	if (options.customAudioToTextButton) {
		setState("canTranscribe", true);
		const customButton = options.customAudioToTextButton;
		transcribeButton = () => customButton;
	} else if (options.canTranscribe) {
		setState("canTranscribe", true);
		transcribeButton = createAudioTranscription({
			listenerSetter: ctx.listenerSetter,
			getRow: () => ctx.element
		}).button;
	}
	const content = () => [
		createComponent(Row.Title, {
			"class": "audio-title",
			children: waveformContainer
		}),
		createComponent(Row.Subtitle, {
			"class": "audio-subtitle",
			get children() {
				return ctx.timeEl;
			}
		}),
		memo(() => transcribeButton?.())
	];
	let progress = svg, progressLine;
	if (!progress) {
		progressLine = new MediaProgressLine();
		waveformContainer.append(progressLine.container);
	}
	const onLoad = () => {
		let audio = ctx.element.audio;
		let ticker;
		const setAnimation = () => {
			ticker?.stop();
			if (!audio) return;
			ticker = createMediaProgressTicker(audio, svgContainer, onTimeUpdate);
			ticker.start();
		};
		const onTimeUpdate = () => {
			if (fakeSvgContainer) fakeSvgContainer.style.width = audio.currentTime / audio.duration * 100 + "%";
		};
		if (!audio.paused || audio.currentTime > 0 && audio.currentTime !== audio.duration) onTimeUpdate();
		const throttledTimeUpdate = throttleWithRaf(onTimeUpdate);
		ctx.addAudioListener("timeupdate", throttledTimeUpdate);
		ctx.addAudioListener("ended", throttledTimeUpdate);
		ctx.addAudioListener("play", setAnimation);
		ctx.addAudioListener("pause", () => ticker?.stop());
		progress && ctx.whenReady(() => {
			let mousedown = false, mousemove = false;
			progress.addEventListener("mouseleave", (e) => {
				if (mousedown) {
					ctx.togglePlay(void 0, true);
					mousedown = false;
				}
				mousemove = false;
			});
			progress.addEventListener("mousemove", (e) => {
				mousemove = true;
				if (mousedown) scrub(e);
			});
			progress.addEventListener("mousedown", (e) => {
				e.preventDefault();
				if (e.button !== 0) return;
				if (!audio.paused) ctx.togglePlay(void 0, false);
				scrub(e);
				mousedown = true;
			});
			progress.addEventListener("mouseup", (e) => {
				if (mousemove && mousedown) {
					ctx.togglePlay(void 0, true);
					mousedown = false;
				}
			});
			attachClickEvent(progress, (e) => {
				cancelEvent(e);
				if (!audio.paused) scrub(e);
			});
			function scrub(e) {
				let offsetX;
				if (!("touches" in e)) offsetX = e.offsetX;
				else {
					const rect = e.target.getBoundingClientRect();
					offsetX = e.targetTouches[0].pageX - rect.left;
				}
				let scrubTime = offsetX / availW * audio.duration;
				if (audio.duration && scrubTime >= audio.duration) scrubTime = audio.duration - .01;
				setCurrentTime(audio, scrubTime);
			}
		});
		!progress && progressLine.setMedia({
			media: audio,
			streamable: doc.supportsStreaming,
			duration: doc.duration
		});
		return () => {
			ticker?.stop();
			progress?.remove();
			progress = null;
			audio = null;
		};
	};
	return {
		content,
		onLoad
	};
}
async function wrapAudio(ctx) {
	const { options, doc, setState } = ctx;
	const message = options.message;
	const isVoice = doc.type === "voice" || doc.type === "round";
	const descriptionEl = document.createElement("div");
	descriptionEl.classList.add("audio-description");
	const titles = getAudioTitles(doc);
	const performer = !isVoice && titles?.performer;
	if (!isVoice) {
		const parts = [options.withTime ? formatFullSentTime(message.date) : formatBytes(doc.size)];
		if (options.showSender) parts.push(await wrapSenderToPeer(message));
		descriptionEl.append(SUBTITLE_SEPARATOR, ...joinElementsWith(parts, SUBTITLE_SEPARATOR));
	}
	const middleEllipsisEl = MiddleEllipsisElement.create();
	middleEllipsisEl.dataset.fontWeight = "" + options.fontWeight;
	middleEllipsisEl.dataset.fontSize = "" + options.fontSize;
	middleEllipsisEl.dataset.sizeType = options.sizeType;
	middleEllipsisEl.getSize = options.getSize;
	if (isVoice) middleEllipsisEl.append(await wrapSenderToPeer(message));
	else setInnerHTML(middleEllipsisEl, wrapEmojiText(titles?.title));
	const sentTime = options.showSender && wrapSentTime(message);
	const content = () => [createComponent(Row.Title, {
		"class": "audio-title",
		titleRight: sentTime,
		titleRightSecondary: true,
		get children() {
			var _el$6 = _tmpl$4();
			insert(_el$6, performer && [(() => {
				var _el$7 = _tmpl$5();
				insert(_el$7, () => wrapEmojiText(performer));
				return _el$7;
			})(), " — "], null);
			insert(_el$6, middleEllipsisEl, null);
			return _el$6;
		}
	}), createComponent(Row.Subtitle, {
		"class": "audio-subtitle",
		get children() {
			return [memo(() => ctx.timeEl), memo(() => memo(() => !!ctx.state.showProgress)() ? ctx.state.progressLine : descriptionEl)];
		}
	})];
	const onLoad = () => {
		const progressLine = new MediaProgressLine();
		progressLine.setMedia({
			media: ctx.element.audio,
			streamable: doc.supportsStreaming,
			duration: doc.duration
		});
		setState("progressLine", progressLine.container);
		ctx.addAudioListener("ended", () => setState("showProgress", false));
		ctx.addAudioListener("play", () => setState("showProgress", true));
		const audio = ctx.element.audio;
		if (!audio.paused || audio.currentTime > 0) setState("showProgress", true);
		return () => {
			progressLine.removeListeners();
			setState({
				showProgress: false,
				progressLine: void 0
			});
		};
	};
	return {
		content,
		onLoad
	};
}
function constructDownloadPreloader(tryAgainOnFail = true) {
	const preloader = new ProgressivePreloader({
		cancelable: true,
		tryAgainOnFail
	});
	preloader.construct();
	if (!tryAgainOnFail && preloader.circle) {
		preloader.circle.setAttributeNS(null, "r", "23");
		preloader.totalLength = 143.58203125;
	}
	return preloader;
}
var findMediaTargets = (anchor, anchorMid) => {
	let prev, next;
	const isBubbles = !anchor.classList.contains("search-super-item");
	const container = findUpClassName(anchor, !isBubbles ? "tabs-tab" : "bubbles-inner");
	if (container) {
		const attr = `:not([data-is-outgoing="1"])`;
		const justAudioSelector = `.audio:not(.is-voice)${attr}`;
		let selectors;
		if (!anchor.matches(justAudioSelector)) selectors = [`.audio.is-voice${attr}`, `.media-round${attr}`];
		else selectors = [justAudioSelector];
		if (isBubbles) {
			const prefix = ".bubble:not(.webpage) ";
			selectors = selectors.map((s) => prefix + s);
		}
		const selector = selectors.join(", ");
		let elements = Array.from(container.querySelectorAll(selector));
		elements = elements.filter((element) => element === anchor || element.matches(":not([data-to-be-skipped=\"1\"])"));
		const idx = elements.indexOf(anchor);
		const mediaItems = elements.map((element) => ({
			peerId: element.dataset.peerId.toPeerId(),
			mid: +element.dataset.mid
		}));
		prev = mediaItems.slice(0, idx);
		next = mediaItems.slice(idx + 1);
	}
	if (next.length && next[0].mid < anchorMid || prev.length && prev[prev.length - 1].mid > anchorMid) [prev, next] = [next.reverse(), prev.reverse()];
	return [prev, next];
};
function isAudioElement(element) {
	return element instanceof HTMLElement && element.classList.contains("audio");
}
async function createAudioElement(options) {
	const { middleware } = options;
	const doc = options.doc ?? getMediaFromMessage(options.message);
	const isRealVoice = doc.type === "voice";
	const isVoice = !options.voiceAsMusic && isRealVoice;
	const isOutgoing = options.message.pFlags.is_outgoing;
	const uploadingFileName = options.uploadingFileName ?? options.message?.uploadingFileName?.[0];
	let listenerSetter = new ListenerSetter();
	let onTypeDisconnect;
	let dispose;
	let load;
	let onLoad;
	const [state, setState] = createStore({
		isVoice: false,
		isOut: !!options.isOut,
		canTranscribe: false,
		isUnread: !!(doc.type !== "audio" && options.message && options.message.pFlags.media_unread),
		isPlaying: false,
		isOutgoing: !!uploadingFileName,
		withThumb: false,
		cornerDownload: false,
		downloading: false,
		showProgress: false,
		progressLine: void 0
	});
	const getDurationStr = () => {
		const audio = ctx.element?.audio;
		const duration = audio && audio.readyState >= audio.HAVE_CURRENT_DATA ? audio.duration : doc.duration;
		return toHHMMSS(duration | 0);
	};
	let toggle;
	let playIconContainer;
	const downloadDiv = _tmpl$6();
	const timeText = document.createTextNode("");
	const ctx = {
		options,
		doc,
		timeEl: (() => {
			var _el$9 = _tmpl$8();
			insert(_el$9, timeText, null);
			insert(_el$9, createComponent(Show, {
				get when() {
					return memo(() => !!state.isVoice)() && state.isUnread;
				},
				get children() {
					return _tmpl$7();
				}
			}), null);
			return _el$9;
		})(),
		state,
		setState,
		element: void 0,
		listenerSetter,
		readyPromise: void 0,
		whenReady: (callback) => void ctx.readyPromise.then(callback, noop),
		addAudioListener: ((...args) => listenerSetter.add(ctx.element.audio)(...args)),
		togglePlay: (e, paused) => ctx.element.togglePlay(e, paused)
	};
	const { content, onLoad: onTypeLoad } = await (isVoice || options.shouldWrapAsVoice ? wrapVoiceMessage(ctx) : wrapAudio(ctx));
	const el = createRoot((d) => {
		dispose = d;
		return children(() => createComponent(AudioRow, {
			state,
			content,
			get clickable() {
				return !!options.clickable;
			},
			ref: (el) => toggle = el,
			playIconRef: (el) => playIconContainer = el
		}))();
	});
	ctx.element = el;
	const setPlayIcon = createPlayPauseIcon(() => playIconContainer);
	/**
	* The glyph is a function of the media, not of the click: it morphs on every transition of
	* `paused`, whoever caused it — this button, the topbar plate, another row playing the same
	* track, the playlist advancing, the OS media keys. Reading the media rather than trusting which
	* event fired also survives a `play`/`pause` pair that arrives late or out of order when the
	* button is hit twice quickly. `animate: false` is for the two moments that are a mount rather
	* than a transition — building the row, and resolving its media — where there is no one to
	* perform the morph for.
	*/
	const syncPlayState = (animate) => {
		const playing = !!el.audio && !el.audio.paused;
		setState("isPlaying", playing);
		toggle.setAttribute("aria-label", langPack_default.format(playing ? "Pause" : "Play", true));
		setPlayIcon(playing, animate);
	};
	el.message = options.message;
	el.audio = options.globalMedia;
	el.listLoaderFactory = options.listLoaderFactory;
	el.dataset.mid = "" + options.message.mid;
	el.dataset.peerId = "" + options.message.peerId;
	if (options.globalMedia) el.dataset.toBeSkipped = "1";
	timeText.textContent = getDurationStr();
	syncPlayState(false);
	const destroy = () => {
		if (onTypeDisconnect) {
			onTypeDisconnect();
			onTypeDisconnect = null;
		}
		if (ctx.readyPromise) {
			ctx.readyPromise.catch(noop);
			ctx.readyPromise.reject();
		}
		if (listenerSetter) {
			listenerSetter.removeAll();
			listenerSetter = null;
		}
		if (dispose) {
			dispose();
			dispose = null;
		}
	};
	middleware.onDestroy(destroy);
	const onDownloadInit = (shouldPlay) => {
		if (shouldPlay) {
			appMediaPlaybackController.willBePlayed(el.audio);
			if (IS_SAFARI && !el.audio.autoplay) el.audio.autoplay = true;
		}
	};
	onLoad = (autoload) => {
		onLoad = void 0;
		const audio = el.audio ?? (el.audio = appMediaPlaybackController.addMedia({
			message: el.message,
			autoload,
			doc: options.doc,
			slot: options.mediaSlot,
			middleware
		}));
		const readyPromise = ctx.readyPromise = deferredPromise();
		if (audio.readyState >= audio.HAVE_CURRENT_DATA) readyPromise.resolve();
		else ctx.addAudioListener("canplay", () => readyPromise.resolve(), { once: true });
		onTypeDisconnect = onTypeLoad();
		const getTimeStr = () => toHHMMSS(audio.currentTime | 0) + (isVoice ? " / " + getDurationStr() : "");
		syncPlayState(false);
		if (!audio.paused || audio.currentTime > 0 && audio.currentTime !== audio.duration) timeText.textContent = getTimeStr();
		toggle.addEventListener("click", (e) => {
			el.togglePlay(e);
		});
		ctx.addAudioListener("ended", () => {
			syncPlayState();
			timeText.textContent = getDurationStr();
		});
		ctx.addAudioListener("timeupdate", () => {
			if (!audio.currentTime && audio.paused || appMediaPlaybackController.isSafariBuffering(audio)) return;
			timeText.textContent = getTimeStr();
		});
		ctx.addAudioListener("pause", () => syncPlayState());
		ctx.addAudioListener("emptied", () => syncPlayState());
		ctx.addAudioListener("play", () => {
			timeText.textContent = getTimeStr();
			syncPlayState();
		});
	};
	el.setUnread = (unread) => setState("isUnread", unread);
	el.replaceMessage = (message) => {
		el.message = message;
		el.dataset.mid = "" + message.mid;
		delete el.dataset.isOutgoing;
		onLoad?.(true);
	};
	el.togglePlay = (e, paused = el.audio.paused) => {
		e && cancelEvent(e);
		if (paused) {
			setTargetsIfNeeded();
			safePlay(el.audio);
		} else el.audio.pause();
	};
	el.playWithTimestamp = (timestamp) => {
		load?.(true);
		setCurrentTime(el.audio, timestamp);
		el.togglePlay(void 0, true);
	};
	const setTargetsIfNeeded = () => {
		const hadSearchContext = !!options.searchContext;
		const searchContextChanged = appMediaPlaybackController.setSearchContext(options.searchContext || {
			peerId: 0,
			inputFilter: { _: "inputMessagesFilterEmpty" },
			useSearch: false
		});
		const loaderFactoryChanged = el.listLoaderFactory && appMediaPlaybackController.getListLoaderFactory() !== el.listLoaderFactory;
		if (searchContextChanged || loaderFactoryChanged) {
			const thisTarget = el.dataset.toBeSkipped ? el.audio.parentElement : el;
			const [prev, next] = !hadSearchContext ? [] : findMediaTargets(thisTarget, el.message.mid);
			appMediaPlaybackController.setTargets({
				peerId: el.message.peerId,
				mid: el.message.mid
			}, prev, next, el.listLoaderFactory);
		}
	};
	if (uploadingFileName) el.append(downloadDiv);
	if (options.cover) {
		const img = new Image();
		img.alt = "";
		img.classList.add("media-photo", "audio-thumb");
		toggle.classList.add("media-container");
		await renderMediaWithFadeIn({
			container: toggle,
			media: img,
			url: options.cover,
			needFadeIn: false
		});
		setState("withThumb", true);
	} else if (doc.thumbs?.length) {
		const imgs = [];
		const wrapped = await wrapPhoto({
			photo: doc,
			message: null,
			container: toggle,
			boxWidth: 48,
			boxHeight: 48,
			loadPromises: options.loadPromises,
			withoutPreloader: true,
			lazyLoadQueue: options.lazyLoadQueue,
			middleware
		});
		toggle.style.width = toggle.style.height = "";
		if (wrapped.images.thumb) imgs.push(wrapped.images.thumb);
		if (wrapped.images.full) imgs.push(wrapped.images.full);
		setState("withThumb", true);
		imgs.forEach((img) => img.classList.add("audio-thumb"));
	}
	if (!isOutgoing) {
		let preloader;
		const autoDownload = doc.type !== "audio";
		onLoad(autoDownload);
		const r = load = (shouldPlay, controlledAutoplay) => {
			load = void 0;
			if (el.audio.src) return;
			appMediaPlaybackController.resolveWaitingForLoadMedia(el.message.peerId, el.message.mid, el.message.pFlags.is_scheduled, options.mediaSlot);
			onDownloadInit(shouldPlay);
			if (!preloader) {
				if (doc.supportsStreaming) {
					setState("cornerDownload", true);
					let pauseListener;
					const onPlay = () => {
						const preloader = constructDownloadPreloader(false);
						const deferred = deferredPromise();
						deferred.notifyAll({
							done: 75,
							total: 100
						});
						deferred.catch(() => {
							el.audio.pause();
							appMediaPlaybackController.willBePlayed(void 0);
						});
						deferred.cancel = () => {
							deferred.cancel = noop;
							deferred.reject(makeError("CANCELED"));
						};
						preloader.attach(downloadDiv, false, deferred);
						pauseListener = ctx.addAudioListener("pause", () => {
							deferred.cancel();
						}, { once: true });
						onDownloadInit(shouldPlay);
					};
					const playListener = ctx.addAudioListener("play", onPlay);
					ctx.whenReady(() => {
						listenerSetter.remove(playListener);
						pauseListener && listenerSetter.remove(pauseListener);
					});
				} else {
					preloader = constructDownloadPreloader();
					if (!shouldPlay) ctx.readyPromise = deferredPromise();
					const startDownload = () => {
						onDownloadInit(shouldPlay);
						const download = appDownloadManager.downloadMediaURL({ media: doc });
						if (!shouldPlay) download.then(() => {
							ctx.readyPromise.resolve();
						});
						preloader.attach(downloadDiv, false, download);
						return { download };
					};
					preloader.setDownloadFunction(startDownload);
					startDownload();
				}
			}
			if (state.cornerDownload) toggle.append(downloadDiv);
			else el.append(downloadDiv);
			setState("downloading", true);
			ctx.whenReady(() => {
				Promise.resolve(preloader?.whenCaughtUp()).then(() => {
					setState("downloading", false);
					downloadDiv.classList.add("downloaded");
					setTimeout(() => {
						downloadDiv.remove();
					}, 200);
				});
				if (!controlledAutoplay && appMediaPlaybackController.willBePlayedMedia === el.audio) {
					safePlay(el.audio);
					appMediaPlaybackController.willBePlayed(void 0);
				}
			});
		};
		if (!el.audio?.src) {
			if (autoDownload) r(false);
			else attachClickEvent(toggle, () => {
				r(true);
			}, {
				once: true,
				listenerSetter
			});
		}
	} else if (uploadingFileName) {
		setState("downloading", true);
		const preloader = constructDownloadPreloader(false);
		const promise = appDownloadManager.getUpload(uploadingFileName);
		preloader.attachPromise(promise);
		el.dataset.isOutgoing = "1";
		preloader.attach(downloadDiv, false);
		promise.then(() => preloader.whenCaughtUp()).then(() => {
			setState("downloading", false);
			downloadDiv.classList.add("downloaded");
			setTimeout(() => {
				downloadDiv.remove();
			}, 200);
		}, () => {
			setState("downloading", false);
			downloadDiv.remove();
		});
	}
	return el;
}
//#endregion
export { getAudioTitles as _, createPlayPauseIcon as a, getMessageSenderPeerIdOrName as c, getMediaFromMessage as d, getMediaFromMessageOrRich as f, filterChatPhotosMessages as g, ListLoader as h, createAudioAnimatedIcon as i, MediaProgressLine as l, SearchListLoader as m, findMediaTargets as n, wrapSentTime as o, generatePhotoForExtendedMediaPreview as p, isAudioElement as r, wrapSenderToPeer as s, createAudioElement as t, appMediaPlaybackController as u };
