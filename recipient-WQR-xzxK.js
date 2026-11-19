//# allFunctionsCalledOnLoad
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import "./confirmationPopup-Bz6mK0o-.js";
import { q as parseNanotonFromDecimal } from "./canPollPeerStories-D3HoBvLX.js";
import { i as walletError } from "./walletSession-BmKSk61G.js";
import { truncateToBytes } from "./send-CchmriGl.js";
//#region src/components/wallet/recipient.ts
var DOMAIN_RE = /^(?:[a-z0-9_-]+\.)+(?:ton|t\.me)$/i;
var MAX_DOMAIN_LENGTH = 126;
var ADDRESS_RE = /^(?:-?\d+:[0-9a-f]{64}|[A-Za-z0-9_\-+/]{48})$/i;
function classifyRecipientInput(text) {
	const value = text.trim();
	if (/^ton:\/\//i.test(value)) return {
		kind: "link",
		value
	};
	if (ADDRESS_RE.test(value)) return {
		kind: "address",
		value
	};
	if (value.length <= MAX_DOMAIN_LENGTH && DOMAIN_RE.test(value)) return {
		kind: "domain",
		value: value.toLowerCase()
	};
	return {
		kind: "search",
		value
	};
}
/**
* A Telegram user receives on the wallet the server knows for them, always non-bounceable
*/
async function resolveUserRecipient(store, userId) {
	const managers = store.managers;
	if (!await managers.appUsersManager.isRegularUser(userId) || userId === rootScope.myId.toUserId()) throw walletError("WALLET_USER_UNAVAILABLE");
	const result = await managers.appWalletManager.getUserAddress(userId, true);
	return {
		address: await store.session.friendlyAddress(result.address, false),
		bounce: false,
		userId,
		publicKey: result.public_key
	};
}
/**
* A pasted address: testnet ones are refused, and if it is a Telegram user's wallet it is sent like one
*/
async function resolveAddressRecipient(store, address, domain) {
	const engine = await store.session.getEngine();
	let info;
	try {
		info = await engine.parseTonAddress(address);
	} catch (err) {
		throw walletError("WALLET_ADDRESS_INVALID");
	}
	if (info.format.kind === "userFriendly" && info.format.testnet) throw walletError("WALLET_ADDRESS_INVALID");
	let bounce = info.format.kind === "userFriendly" ? info.format.bounceable : true;
	let userId, publicKey;
	try {
		const owner = await store.managers.appWalletManager.getAddressOwner(info.raw);
		if (owner?.user_id && owner.user_id.toUserId() !== rootScope.myId.toUserId()) {
			userId = owner.user_id.toUserId();
			publicKey = owner.public_key;
			bounce = false;
		}
	} catch (err) {}
	return {
		address: await engine.convertTonAddress(info.raw, {
			kind: "userFriendly",
			bounceable: bounce,
			testnet: false
		}),
		bounce,
		userId,
		publicKey,
		domain
	};
}
async function resolveDomainRecipient(store, name) {
	const address = await (await store.session.getClient(store.status())).resolveDns(name);
	if (!address) throw walletError("WALLET_NAME_NOT_FOUND");
	return resolveAddressRecipient(store, address, name);
}
/**
* What a typed or pasted link, address or name stands for — a search for people is not resolved here
*/
async function resolveRecipientInput(store, input) {
	switch (input.kind) {
		case "link": return resolveTransferLink(store, input.value);
		case "domain": return { recipient: await resolveDomainRecipient(store, input.value) };
		case "address": return { recipient: await resolveAddressRecipient(store, input.value) };
		default: throw walletError("WALLET_ADDRESS_INVALID");
	}
}
/**
* `ton://transfer/<address>?amount=&text=|bin=&exp=`: Gram transfers only, with a comment or a body of their own
*/
async function resolveTransferLink(store, link) {
	const engine = await store.session.getEngine();
	let parsed;
	try {
		parsed = await engine.parseTonTransferLink(link);
	} catch (err) {
		throw walletError("WALLET_ADDRESS_INVALID");
	}
	if (parsed.asset.kind !== "gram") throw walletError("WALLET_LINK_UNSUPPORTED");
	const expiresAt = parsed.expiration.kind === "exact" && parsed.expiration.unixTimestamp <= BigInt(Number.MAX_SAFE_INTEGER) ? Number(parsed.expiration.unixTimestamp) : void 0;
	if (expiresAt !== void 0 && expiresAt * 1e3 < Date.now()) throw walletError("WALLET_LINK_EXPIRED");
	return {
		recipient: await resolveAddressRecipient(store, parsed.recipient),
		nanograms: parsed.amount,
		...linkComment(parsed.payload.kind === "text" ? parsed.payload.text : void 0),
		payload: parsed.payload.kind === "boc" ? parsed.payload.boc : void 0,
		expiresAt
	};
}
/**
* Who the user sent to or got from lately, then the people they talk to most
*/
async function getRecentRecipients(store) {
	const managers = store.managers;
	const out = [];
	const add = (peerId) => {
		if (peerId && !out.includes(peerId) && peerId !== rootScope.myId) out.push(peerId);
	};
	const transactions = store.history.transactions();
	transactions.filter((transaction) => !transaction.pFlags.incoming).forEach((transaction) => {
		if (transaction.peer._ === "walletTransactionPeerUser") add(transaction.peer.user_id.toPeerId(false));
	});
	transactions.forEach((transaction) => {
		if (transaction.peer._ === "walletTransactionPeerUser") add(transaction.peer.user_id.toPeerId(false));
	});
	try {
		(await managers.appUsersManager.getTopPeers("correspondents")).forEach((topPeer) => topPeer.id.isUser() && add(topPeer.id));
	} catch (err) {}
	const regular = await Promise.all(out.map((peerId) => managers.appUsersManager.isRegularUser(peerId.toUserId())));
	return out.filter((_, index) => regular[index]).slice(0, 30);
}
/** Grams as a send link writes them: whole ones with at most 9 decimals, more than none (iOS, Android) */
var LINK_AMOUNT_REGEXP = /^\d+(\.\d{1,9})?$/;
/** A link's comment, cut to what a transfer carries (Android) */
function linkComment(comment, encrypted) {
	return comment ? {
		comment: truncateToBytes(comment, 960),
		publicComment: !encrypted
	} : {};
}
/**
* Turns a send link into what the amount screen starts from
*/
async function resolveSendRequest(store, request) {
	if (request.tonLink) return resolveTransferLink(store, request.tonLink);
	if (request.userId) return { recipient: await resolveUserRecipient(store, request.userId) };
	const to = request.to?.trim();
	if (!to) throw walletError("WALLET_ADDRESS_INVALID");
	let nanograms;
	if (request.amount !== void 0) {
		nanograms = LINK_AMOUNT_REGEXP.test(request.amount) ? parseNanotonFromDecimal(request.amount).toString() : "0";
		if (!(+nanograms > 0)) throw walletError("WALLET_LINK_INVALID");
	}
	const input = classifyRecipientInput(to);
	let recipient;
	if (input.kind === "link") return resolveTransferLink(store, input.value);
	else if (input.kind !== "search") recipient = (await resolveRecipientInput(store, input)).recipient;
	else {
		const user = await store.managers.appUsersManager.resolveUserByUsername(to.replace(/^@/, ""));
		if (!user) throw walletError("WALLET_USER_UNAVAILABLE");
		recipient = await resolveUserRecipient(store, user.id.toUserId());
	}
	return {
		recipient,
		nanograms,
		...linkComment(request.comment, request.encrypted)
	};
}
//#endregion
export { classifyRecipientInput, getRecentRecipients, resolveAddressRecipient, resolveDomainRecipient, resolveRecipientInput, resolveSendRequest, resolveTransferLink, resolveUserRecipient };
