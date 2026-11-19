//# allFunctionsCalledOnLoad
import { i as canonicalTonAddress, t as GRAM_TRANSFER_RESOLUTION_TIMEOUT } from "./transferMessages-BVUO3_q3.js";
//#region src/lib/wallet/historyCache.ts
var STORED_VERSION = 1;
/**
* How long a "Sending" row may wait: the engine's validity window plus the margin for the chain (tdesktop's
* StaleSubmittedRecord, 300 + 60 s), not iOS's 90 s for the UI — a transfer can still go out until the contract
* refuses it, and a row gone before that would hide money that may yet leave
*/
var WALLET_PENDING_LIFETIME = GRAM_TRANSFER_RESOLUTION_TIMEOUT;
/** a page of a list kept at most: the window's own pages are 50 transfers and 20 collectibles */
var LIST_LIMIT = 100;
function createWalletHistory(address) {
	return {
		address,
		pending: []
	};
}
function isSameWalletAddress(a, b) {
	if (!a || !b) return false;
	if (a === b) return true;
	const canonical = canonicalTonAddress(a);
	return !!canonical && canonical === canonicalTonAddress(b);
}
/** the same page as the server gave it before */
function isSameWalletList(a, b) {
	return !!a && !!b && a.nextOffset === b.nextOffset && a.ended === b.ended && JSON.stringify(a.items) === JSON.stringify(b.items);
}
/**
* A row past the send's window can no longer turn up and goes; so does one dated that far ahead, which only a clock
* set back since the send can make
*/
function isWalletPendingExpired(transfer, now) {
	return !(Math.abs(now - transfer.date) <= WALLET_PENDING_LIFETIME);
}
/** drops the rows that expired; true when any did */
function pruneWalletHistory(cache, now) {
	const pending = cache.pending.filter((transfer) => !isWalletPendingExpired(transfer, now));
	if (pending.length === cache.pending.length) return false;
	cache.pending = pending;
	return true;
}
/**
* This window's rows and the manager's (other windows feed it) as one list: every row either knows — less the ones
* this window let go itself — each with what either learnt. A receipt or a failure only ever comes, never goes, so a
* copy that is behind cannot undo one. The same array when nothing changed.
*/
function mergeWalletPending(local, remote, removed) {
	const byId = new Map(remote.map((transfer) => [transfer.id, transfer]));
	let changed = false;
	const out = local.map((transfer) => {
		const other = byId.get(transfer.id);
		if (!other) return transfer;
		byId.delete(transfer.id);
		const msgHash = transfer.msgHash || other.msgHash;
		const failed = transfer.failed || other.failed;
		if (msgHash === transfer.msgHash && failed === transfer.failed) return transfer;
		changed = true;
		return {
			...transfer,
			msgHash,
			failed
		};
	});
	for (const transfer of byId.values()) {
		if (removed.has(transfer.id)) continue;
		out.push(transfer);
		changed = true;
	}
	return changed ? out.sort((a, b) => b.date - a.date) : local;
}
/**
* Transfers the server has not listed yet put at the head of its first page (another session's, from its receipt):
* nothing is cut off the end, the next page still starts where the server said
*/
function mergeWalletHistoryHead(head, transactions) {
	const known = new Set(head.items.map((transaction) => transaction.id));
	const fresh = transactions.filter((transaction) => !known.has(transaction.id));
	if (!fresh.length) return head;
	return {
		...head,
		items: [...fresh, ...head.items].sort((a, b) => b.date - a.date)
	};
}
/** the ids of the users the cache's rows name */
function getWalletHistoryUserIds(cache) {
	const ids = /* @__PURE__ */ new Set();
	cache.history?.items.forEach((transaction) => {
		if (transaction.peer._ === "walletTransactionPeerUser") ids.add(transaction.peer.user_id.toUserId());
	});
	cache.pending.forEach((transfer) => transfer.userId && ids.add(transfer.userId));
	return [...ids];
}
var fitList = (head) => head && head.items.length <= LIST_LIMIT ? head : void 0;
/**
* What is written to disk. No comment of a "Sending" row: one sent private went out encrypted, and its text stays in
* memory (tdesktop's stored projection keeps no encrypted comment either); the row gets it back from the transfer once
* the server lists it.
*/
function toStoredWalletHistory(cache, users) {
	return {
		version: STORED_VERSION,
		address: cache.address,
		history: fitList(cache.history),
		nfts: fitList(cache.nfts),
		pending: cache.pending.slice(0, 64).map(({ comment, ...transfer }) => transfer),
		users
	};
}
var isString = (value) => typeof value === "string";
var isNanos = (value) => isString(value) && /^\d{1,30}$/.test(value) || Number.isSafeInteger(value) && value >= 0;
function isTransaction(value) {
	return value?._ === "walletTransaction" && isString(value.id) && Number.isFinite(value.date) && isString(value.peer?._) && !!value.pFlags && typeof value.pFlags === "object" && (isString(value.amount) || Number.isFinite(value.amount));
}
function isNft(value) {
	return value?._ === "wallet.nftItem" && isString(value.address);
}
function isPending(value) {
	return isString(value?.id) && isNanos(value.nanograms) && isString(value.address) && Number.isFinite(value.date) && (value.msgHash === void 0 || isString(value.msgHash)) && (value.nft === void 0 || isNft(value.nft));
}
function readList(value, isItem) {
	if (!value || !Array.isArray(value.items) || !isString(value.nextOffset)) return;
	return {
		items: value.items.filter(isItem),
		nextOffset: value.nextOffset,
		ended: !!value.ended
	};
}
/**
* The cache as written by `toStoredWalletHistory`, or nothing for anything else (another version, a broken entry);
* the rows that expired meanwhile are left out
*/
function readStoredWalletHistory(value, now) {
	if (!value || value.version !== STORED_VERSION || !isString(value.address) || !value.address || !Array.isArray(value.pending)) return;
	const cache = {
		address: value.address,
		history: readList(value.history, isTransaction),
		nfts: readList(value.nfts, isNft),
		pending: value.pending.filter(isPending).slice(0, 64)
	};
	pruneWalletHistory(cache, now);
	return {
		cache,
		users: Array.isArray(value.users) ? value.users.filter((user) => user?._ === "user" && user.id) : []
	};
}
//#endregion
export { isWalletPendingExpired as a, pruneWalletHistory as c, isSameWalletList as i, readStoredWalletHistory as l, getWalletHistoryUserIds as n, mergeWalletHistoryHead as o, isSameWalletAddress as r, mergeWalletPending as s, createWalletHistory as t, toStoredWalletHistory as u };
