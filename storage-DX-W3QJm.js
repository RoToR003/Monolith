//# allFunctionsCalledOnLoad
import { n as __exportAll } from "./rolldown-runtime-CwcJO0Gh.js";
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { i as getManagersSession } from "./getCurrentAccount-D0KQFbZ6.js";
import { t as bindManagersToAccount } from "./bindManagersToAccount-BL82O9H9.js";
import { t as getServerMessageId } from "./getServerMessageId-1hhP4U5Q.js";
import { n as hotListen } from "./hotModule-aCRkP77w.js";
import { d as mapDeleteWhere, n as forgetWidgetHeights, s as getWidgetKey } from "./sizing-CYIKGrfN.js";
//#region src/lib/widgetSandbox/storage.ts
var storage_exports = /* @__PURE__ */ __exportAll({
	createMemoryWidgetStorage: () => createMemoryWidgetStorage,
	createMessageWidgetStorage: () => createMessageWidgetStorage
});
/** How long a `local` commit waits for the next one before it goes to disk. */
var LOCAL_WRITE_DELAY = 1e3;
/** `sessionStorage` of every widget this page ran, by account and message. */
var sessions = /* @__PURE__ */ new Map();
/**
* `localStorage` not on disk yet, by account and message: a bubble built again before the write (a re-render) starts
* its widget from it.
*/
var unsaved = /* @__PURE__ */ new Map();
/** What waits for its disk write. */
var pendingFlushes = /* @__PURE__ */ new Set();
/** The widgets of messages being sent, by account and temporary id. */
var sending = /* @__PURE__ */ new Map();
/**
* When "Clear cache" ran, or a chat's history went, by the prefix of the keys it took, or a part of the history, by the
* keys of its messages (widget_storage_delete): a binding made before keeps nothing more. The worker refuses its writes
* too, but a bubble built again before its delayed write (its message still cached here) would start from what it put
* here, and write that back. (A channel's history up to a message, or a message, takes what does not come back:
* nothing is built again to start from it.)
*/
var clearedAt = /* @__PURE__ */ new Map();
var flushAll = () => [...pendingFlushes].forEach((flush) => flush());
hotListen(void 0, document, "visibilitychange", () => document.hidden && flushAll());
hotListen(void 0, window, "pagehide", flushAll);
/**
* Writes `values` as the `local` area of the message, and forgets them as unsaved once there (unless newer came) — but
* a message being sent's, which the bubble built again under the server's id starts from (widget_storage_remap below).
*/
function writeLocal(managers, peerId, mid, key, values, boundAt) {
	managers.appWidgetsManager.setWidgetStorage(peerId, mid, values, boundAt).finally(() => {
		if (Number.isInteger(mid) && unsaved.get(key) === values) unsaved.delete(key);
	});
}
hotListen(void 0, rootScope, "widget_storage_remap", ({ accountNumber, peerId, tempId, mid }) => {
	const from = getWidgetKey(accountNumber, peerId, tempId);
	const to = getWidgetKey(accountNumber, peerId, mid);
	const widget = sending.get(from);
	if (!widget) return;
	sending.delete(from);
	widget.mid = mid;
	const session = sessions.get(from), local = unsaved.get(from);
	sessions.delete(from);
	unsaved.delete(from);
	if (session && !sessions.has(to)) sessions.set(to, session);
	if (local && !unsaved.has(to)) {
		unsaved.set(to, local);
		writeLocal(widget.managers, peerId, mid, to, local, widget.boundAt);
	}
});
hotListen(void 0, rootScope, "widget_storage_delete", ({ accountNumber, peerId, maxId, mids }) => {
	const prefix = peerId === void 0 ? `${accountNumber}_` : `${accountNumber}_${peerId}_`;
	const taken = mids && new Set(mids);
	const upTo = (mid) => Number.isInteger(mid) && getServerMessageId(mid) <= maxId;
	const gone = (key) => {
		if (!key.startsWith(prefix)) return false;
		const mid = +key.slice(key.lastIndexOf("_") + 1);
		return taken ? taken.has(mid) : maxId === void 0 || upTo(mid);
	};
	const now = Date.now();
	if (taken) {
		if (peerId !== void 0) taken.forEach((mid) => clearedAt.set(getWidgetKey(accountNumber, peerId, mid), now));
	} else if (maxId === void 0) clearedAt.set(prefix, now);
	mapDeleteWhere(unsaved, gone);
	mapDeleteWhere(sessions, gone);
	forgetWidgetHeights(gone);
});
/**
* The storage of the widget in a message, of the account `chatManagers` are of. A write waits a moment and the last one
* goes as the widget stops, so it goes to that account even after the tab has switched to another one. A message being
* sent writes under its temporary id, which the account's worker keeps in memory and moves under the server's id with
* the message.
*/
function createMessageWidgetStorage(chatManagers, peerId, mid) {
	const { accountNumber } = getManagersSession(chatManagers);
	const managers = bindManagersToAccount(chatManagers, accountNumber);
	const boundAt = Date.now();
	const widget = Number.isInteger(mid) ? void 0 : {
		managers,
		boundAt
	};
	if (widget) sending.set(getWidgetKey(accountNumber, peerId, mid), widget);
	/** The message's id now: the server's, once a message being sent has it. */
	const getMid = () => widget?.mid ?? mid;
	const getKey = () => getWidgetKey(accountNumber, peerId, getMid());
	/** Made before "Clear cache", before its chat's history went or a part of it with its message: what its widget holds is gone. */
	const isCleared = () => boundAt <= Math.max(clearedAt.get(`${accountNumber}_`) ?? 0, clearedAt.get(`${accountNumber}_${peerId}_`) ?? 0, clearedAt.get(getKey()) ?? 0);
	let pending, timer;
	const flush = () => {
		clearTimeout(timer);
		timer = void 0;
		pendingFlushes.delete(flush);
		if (!pending) return;
		const values = pending;
		pending = void 0;
		if (unsaved.get(getKey()) !== values || isCleared()) return;
		writeLocal(managers, peerId, getMid(), getKey(), values, boundAt);
	};
	return {
		load: async () => {
			const stored = unsaved.has(getKey()) ? void 0 : await managers.appWidgetsManager.getWidgetStorage(peerId, getMid());
			const key = getKey();
			return {
				local: unsaved.get(key) ?? stored ?? {},
				session: sessions.get(key) ?? {}
			};
		},
		commit: (area, values) => {
			if (isCleared()) return;
			if (area === "session") {
				sessions.set(getKey(), values);
				return;
			}
			pending = values;
			unsaved.set(getKey(), values);
			pendingFlushes.add(flush);
			timer ?? (timer = window.setTimeout(flush, LOCAL_WRITE_DELAY));
		},
		flush
	};
}
var memoryLocal = /* @__PURE__ */ new Map();
/** Storage that lives until the page reloads, for widgets outside a message (the widget sandbox). */
function createMemoryWidgetStorage(key) {
	return {
		load: async () => ({
			local: memoryLocal.get(key) ?? {},
			session: sessions.get(key) ?? {}
		}),
		commit: (area, values) => (area === "session" ? sessions : memoryLocal).set(key, values),
		flush: () => {}
	};
}
//#endregion
export { storage_exports as t };
