//# allFunctionsCalledOnLoad
import { i as __toESM } from "./rolldown-runtime-CwcJO0Gh.js";
import { t as bytesToHex } from "./bytesToHex-BQHuRHPP.js";
import { rt as parseTonAddress } from "./getChatMigratedTo-ChhMNXuu.js";
import { t as require_BigInteger } from "./BigInteger-0a0WsWCs.js";
//#region src/lib/wallet/transferMessages.ts
var import_BigInteger = /* @__PURE__ */ __toESM(require_BigInteger());
/**
* A Gram transfer to a Telegram user shows up in that user's chat the moment it goes to the server: a local
* "sending" service message, which the message the server makes for the transfer then replaces. The pairing is
* the usual one — the random id `wallet.sendTransfer` was given comes back in `updateMessageID` — but when that
* answer is lost (a timeout, a 5xx) the served message still arrives, through the difference, and is matched to
* its draft by what it says instead (tdesktop: wallet/wallet_transfer_messages.cpp).
*
* Everything here is pure: the registry keeps no messages, the messages manager asks it what to do.
*/
/** the server adds this suggestion with the first incoming transfer and pushes nothing about it */
var WALLET_FIRST_GRAMS_SUGGESTION = "WALLET_FIRST_INCOMING_TRANSFER";
/**
* How long a transfer whose submission is unknown may still turn up: the engine's validity window plus the margin
* the wallet gives the chain to resolve it. A draft still sending after that leaves the chat — it is never failed on
* a guess: its served message may still come through the difference.
*/
var GRAM_TRANSFER_RESOLUTION_TIMEOUT = 36e4;
/** `workchain:hex` of an address in any form, or '' when the text is no address */
function canonicalTonAddress(address) {
	const parts = parseTonAddress(address);
	return parts ? parts.workchain + ":" + bytesToHex(parts.hash) : "";
}
function isSameAmount(a, b) {
	try {
		return (0, import_BigInteger.default)(String(a)).abs().equals((0, import_BigInteger.default)(String(b)).abs());
	} catch (err) {
		return false;
	}
}
/**
* Whether a served transfer is the draft's one. A private comment is not compared: the served message carries the
* encrypted payload, not the text.
*/
function isSameGramTransfer(draft, action, servedAddress = canonicalTonAddress(action.peer_address)) {
	if (!servedAddress || !isSameAmount(draft.amount, action.amount) || !!draft.commentEncrypted !== !!action.pFlags?.comment_encrypted || canonicalTonAddress(draft.address) !== servedAddress) return false;
	return !!draft.commentEncrypted || (draft.comment || "") === (action.comment || "");
}
/**
* Whether `wallet.sendTransfer` was refused for sure: an answer the server sent. A transport's own 4xx
* (NETWORK_BAD_RESPONSE) says nothing of what the server did, and a 5xx or a timeout may hide a broadcast that went
* out. Nor does a duplicate (RANDOM_ID_DUPLICATE and the like): it refuses a copy of a request whose first copy
* reached the server, and that one may have gone out.
*/
function isDefiniteTransferRefusal(error) {
	const type = String(error?.type);
	return error?.code >= 400 && error.code < 500 && !type.startsWith("NETWORK_") && !type.includes("DUPLICATE");
}
/**
* The reason the engine's final phase gives for a transfer that did not go out, or nothing when it did not fail.
* A gasless transfer is a pair signed for one seqno: one of them replacing the other is how it succeeds.
*/
function getGramTransferFailure(phase, paired) {
	switch (phase) {
		case "failed": return "WALLET_TRANSFER_FAILED";
		case "cancelled": return "WALLET_TRANSFER_CANCELLED";
		case "expired": return "WALLET_TRANSFER_EXPIRED";
		case "replaced": return paired ? void 0 : "WALLET_TRANSFER_REPLACED";
	}
}
/**
* What the engine's journal says of a transfer whose outcome was unknown (`operationId`): `failed` — it never went
* out; `done` — it ended otherwise (confirmed, or its seqno went to the fee-free twin or to another message), and the
* history tells the rest; nothing — still open, or the journal names another transfer and says nothing of this one.
*/
function getUnknownTransferVerdict(operationId, snapshot, paired) {
	if (!snapshot || snapshot.operationId !== operationId) return;
	if (getGramTransferFailure(snapshot.phase, paired)) return "failed";
	switch (snapshot.phase) {
		case "confirmed":
		case "replaced":
		case "sequenceNumberConsumed":
		case "superseded": return "done";
	}
}
var GramTransferDrafts = class {
	constructor() {
		this.drafts = [];
		this.settled = /* @__PURE__ */ new Set();
	}
	get size() {
		return this.drafts.length;
	}
	add(draft) {
		if (!this.drafts.length) this.settled.clear();
		this.drafts.push(draft);
	}
	get(randomId) {
		return this.drafts.find((draft) => draft.randomId === String(randomId));
	}
	forget(randomId) {
		const index = this.drafts.findIndex((draft) => draft.randomId === String(randomId));
		if (index !== -1) return this.drafts.splice(index, 1)[0];
	}
	/** the served message `mid` replaced the draft */
	settle(randomId, mid) {
		const draft = this.forget(randomId);
		if (draft) this.settled.add(draft.peerId + "_" + mid);
		return draft;
	}
	clear() {
		this.drafts = [];
		this.settled.clear();
	}
	/**
	* `updateMessageID` promises the draft the served id `mid`. Nothing at that id yet is the usual case. A message
	* these drafts settled there means an identical draft took this one's message by content. Anything else there is
	* this draft's own message, which came by a path that never adopts.
	*/
	getPairing(randomId, mid, occupied) {
		const draft = this.get(randomId);
		if (!draft || !occupied) return "pair";
		return this.settled.has(draft.peerId + "_" + mid) ? "keep" : "drop";
	}
	/**
	* The draft a served transfer belongs to when no `updateMessageID` claimed it: the oldest one still sending in
	* the same chat with the same transfer, made when the chat held only older messages. Drafts no longer sending
	* (deleted meanwhile) are pruned on the way. The draft stays registered until the caller settles it.
	*/
	adopt(options) {
		const { action } = options;
		if (!this.drafts.length || action._ !== "messageActionGramTransfer" || !options.out) return;
		this.drafts = this.drafts.filter(options.isSending);
		const servedAddress = canonicalTonAddress(action.peer_address);
		if (options.held || !servedAddress) return;
		return this.drafts.find((draft) => {
			return draft.peerId === options.peerId && options.mid > draft.floor && isSameGramTransfer(draft, action, servedAddress);
		});
	}
};
//#endregion
export { getGramTransferFailure as a, canonicalTonAddress as i, GramTransferDrafts as n, getUnknownTransferVerdict as o, WALLET_FIRST_GRAMS_SUGGESTION as r, isDefiniteTransferRefusal as s, GRAM_TRANSFER_RESOLUTION_TIMEOUT as t };
