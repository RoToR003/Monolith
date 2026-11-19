//# allFunctionsCalledOnLoad
const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["dist-kY6ig_ru.js","rolldown-runtime-CwcJO0Gh.js","defineProperty-_J0dqq22.js","__vite-browser-external-bastLX3_.js","phraseShares-D6KLUolq.js","crypto-DKvWrOZi.js","subtle-BC4BRnF_.js","tonConnectCrypto-C-ijOt-x.js"])))=>i.map(i=>d[i]);
import { i as __toESM, n as __exportAll } from "./rolldown-runtime-CwcJO0Gh.js";
import { t as pause } from "./pause-BSJh-z46.js";
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { t as __vitePreload } from "./preload-helper-B0NHKCoo.js";
import { r as getCurrentAccount } from "./getCurrentAccount-D0KQFbZ6.js";
import { t as bindManagersToAccount } from "./bindManagersToAccount-BL82O9H9.js";
import { t as bytesToHex } from "./bytesToHex-BQHuRHPP.js";
import { t as bytesFromHex } from "./bytesFromHex-DEB8Alee.js";
import { O as randomLong } from "./index-B7axFZql.js";
import { W as createSerializedQueue, it as toFriendlyTonAddress } from "./getChatMigratedTo-ChhMNXuu.js";
import { t as require_BigInteger } from "./BigInteger-0a0WsWCs.js";
import { n as bytesToBase64 } from "./bytesCmp-BHLrucCP.js";
import { t as base64ToBytes } from "./base64ToBytes-BKoIm5Yd.js";
import { a as getGramTransferFailure, s as isDefiniteTransferRefusal } from "./transferMessages-BVUO3_q3.js";
import { r as WalletVaultLockedError, t as WalletVault } from "./vault-Cq0wL05g.js";
import { a as isRecordSigningFor, c as isRotationSubmissionUnknown, d as promoteRotationRecord, f as rotationErrorType, l as makeRotationQuote, m as settleAwaitingServerKey, n as breakRotationSignature, o as isRotationFeeCovered, p as rotationSnapshotVerdict, r as emulateTraceRequest, s as isRotationJournalAuthoritative, u as parseEmulatedTrace } from "./rotation-CL3-t-0h.js";
//#region src/lib/wallet/engineHost.ts
/**
* The engine talks to the chain provider as if it were plain HTTPS, but the web client reaches it only
* through MTProto: `toncenter.performApiRequest` carries a path, a query and a body and answers with the
* provider's body or a failure string. That is the engine's "status-less" host shape.
*
* One request is never forwarded: the engine's `sendBoc` while a transfer is being submitted. That one goes
* to the server as `wallet.sendTransfer`, which broadcasts it (or its fee-free alternative) and answers with
* the receipt the history is matched by.
*/
var TONCENTER_BASE_URL = "https://toncenter.com";
var SEND_BOC_ENDPOINT = "/api/v2/jsonRPC";
var PENDING_LIST_ENDPOINT = "/api/v3/pendingTransactions";
var NFT_ITEMS_ENDPOINT = "/api/v3/nft/items";
/** the server holds a transfer for up to 30 s before answering, plus a margin for the transport */
var SEND_TIMEOUT = 4e4;
var textEncoder = new TextEncoder();
var textDecoder = new TextDecoder();
var currentSubmission;
function setWalletSubmission(submission) {
	currentSubmission = submission;
}
function hostFailure(kind, diagnostic) {
	return {
		kind,
		diagnostic
	};
}
function bodyOf(object) {
	return textEncoder.encode(JSON.stringify(object));
}
/**
* Splits an engine URL into what the MTProto proxy takes. Anything outside the provider's `/api/` tree,
* or a path that could escape it, is refused before it leaves.
*/
function parseToncenterUrl(url) {
	if (!url.startsWith("https://toncenter.com/api/")) return;
	const rawPath = url.slice(21).split(/[?#]/, 1)[0];
	if (rawPath.includes("%") || rawPath.includes("..") || rawPath.includes("//")) return;
	const parsed = new URL(url);
	return {
		endpoint: parsed.pathname,
		query: parsed.search ? parsed.search.slice(1) : ""
	};
}
function isSendBoc(request, endpoint, payload) {
	if (request.method !== "post" || endpoint !== SEND_BOC_ENDPOINT) return false;
	try {
		return JSON.parse(payload)?.method === "sendBoc";
	} catch (err) {
		return false;
	}
}
function getSendBoc(payload) {
	try {
		const boc = JSON.parse(payload)?.params?.boc;
		return typeof boc === "string" ? boc : void 0;
	} catch (err) {}
}
/**
* Toncenter sends JSON arrays where the engine expects maps for empty NFT metadata.
*/
function normalizeNftEmptyMaps(body) {
	const KEYS = [
		"metadata",
		"content",
		"collection_content",
		"extra"
	];
	try {
		const json = JSON.parse(body);
		const visit = (value) => {
			if (!value || typeof value !== "object") return;
			for (const key in value) {
				const item = value[key];
				if (KEYS.includes(key) && Array.isArray(item) && !item.length) value[key] = {};
				else visit(item);
			}
		};
		visit(json);
		return JSON.stringify(json);
	} catch (err) {
		return body;
	}
}
var WalletStatuslessHostImpl = class {
	/** `managers`: the wallet's account's, for good — a transfer goes out on the account it was signed for */
	constructor(managers) {
		this.managers = managers;
		this.cancelled = /* @__PURE__ */ new Set();
		this.pending = /* @__PURE__ */ new Map();
		this.executeStatusless = async (request) => {
			const id = request.id.value;
			if (this.closed) throw hostFailure("cancelled", "wallet engine is closing");
			if (this.cancelled.delete(id)) throw hostFailure("cancelled", "cancelled before start");
			const parsed = parseToncenterUrl(request.url);
			if (!parsed) throw hostFailure("policyViolation", "request outside the configured provider base");
			const payload = request.body.length ? textDecoder.decode(new Uint8Array(request.body)) : "";
			const submission = currentSubmission;
			if (submission && isSendBoc(request, parsed.endpoint, payload)) return this.wrap(id, SEND_TIMEOUT, this.submit(id, submission, payload));
			return this.wrap(id, request.timeoutMs, this.managers.appWalletManager.performToncenterRequest({
				post: request.method === "post",
				endpoint: parsed.endpoint,
				query: parsed.query,
				payload
			}).then((body) => {
				if (parsed.endpoint === NFT_ITEMS_ENDPOINT) body = normalizeNftEmptyMaps(body);
				return textEncoder.encode(body);
			}, (err) => {
				if (parsed.endpoint === PENDING_LIST_ENDPOINT && err.message === "emulated traces not found") return bodyOf({ transactions: [] });
				throw hostFailure(err.type === "TIMEOUT" ? "timeout" : "other", `MTP: ${err.type}${err.message ? ": " + err.message : ""}`);
			}));
		};
		this.cancelStatusless = async (requestId) => {
			const reject = this.pending.get(requestId.value);
			if (reject) reject(hostFailure("cancelled", "cancelled"));
			else this.cancelled.add(requestId.value);
		};
	}
	close() {
		this.closed = true;
		this.pending.forEach((reject) => reject(hostFailure("cancelled", "wallet engine is closing")));
	}
	wrap(id, timeoutMs, promise) {
		return new Promise((resolve, reject) => {
			const timeout = setTimeout(() => {
				finish();
				reject(hostFailure("timeout", "the request timed out"));
			}, Math.max(1e3, timeoutMs || 15e3));
			const finish = () => {
				clearTimeout(timeout);
				if (this.pending.get(id) === cancel) this.pending.delete(id);
			};
			const cancel = (failure) => {
				finish();
				reject(failure);
			};
			this.pending.set(id, cancel);
			promise.then((value) => {
				finish();
				resolve(value);
			}, (err) => {
				finish();
				reject(err);
			});
		});
	}
	/**
	* A definite refusal is answered as a JSON-RPC error object: the engine's status-less transport would read a
	* scalar error or `ok: false` as an ambiguous provider failure, turning a refusal into "submission unknown".
	* A transport failure or a server error is exactly that ambiguity and is reported as a host failure.
	*/
	async submit(id, submission, payload) {
		const boc = getSendBoc(payload);
		const normal = boc && base64ToBytes(boc);
		if (!normal?.length) {
			submission.onAnswer?.({
				outcome: "rejected",
				error: "WALLET_TRANSFER_DATA_INVALID"
			});
			return bodyOf({
				jsonrpc: "2.0",
				id: "" + id,
				error: {
					code: -32e3,
					message: "WALLET_TRANSFER_DATA_INVALID"
				}
			});
		}
		try {
			submission.rpcStarted = true;
			submission.signedBoc = boc;
			const sent = await this.managers.appWalletManager.sendTransfer({
				dataNormal: normal,
				dataGasless: submission.gasless,
				userId: submission.userId,
				randomId: submission.randomId,
				draft: submission.draft
			});
			submission.onAnswer?.({
				outcome: "accepted",
				sent
			});
			return bodyOf({
				ok: true,
				result: { "@type": "ok" }
			});
		} catch (err) {
			const error = err;
			if (isDefiniteTransferRefusal(error)) {
				submission.onAnswer?.({
					outcome: "rejected",
					error: error.type
				});
				return bodyOf({
					jsonrpc: "2.0",
					id: "" + id,
					error: {
						code: -32e3,
						message: error.type
					}
				});
			}
			submission.onAnswer?.({
				outcome: "uncertain",
				error: error.type
			});
			throw hostFailure("other", `MTP: ${error.type}`);
		}
	}
};
//#endregion
//#region src/lib/wallet/commentBody.ts
/**
* The server hands an encrypted comment out as its bare payload (32 bytes of key mix, a 16-byte message key and
* the padded text). The engine opens comments in their on-chain form: a bag of cells whose first cell starts with
* the encrypted-comment opcode 0x2167da4b, chained by one reference per cell, 127 bytes each.
*/
var ENCRYPTED_COMMENT_OPCODE = [
	33,
	103,
	218,
	75
];
var BOC_MAGIC = [
	181,
	238,
	156,
	114,
	1
];
var FIRST_CELL_BYTES = 35;
var CELL_BYTES = 127;
function isValidCommentPayloadSize(size) {
	return size >= 64 && size <= 1024 && (size - 48) % 16 === 0;
}
/**
* Standard padded base64 of the BoC, or nothing when the payload cannot be an encrypted comment.
*/
function serverCommentBody(payload) {
	if (!isValidCommentPayloadSize(payload.length)) return;
	const cells = 1 + Math.floor((payload.length - FIRST_CELL_BYTES + CELL_BYTES - 1) / CELL_BYTES);
	const total = payload.length + 4 + 3 * cells - 1;
	const width = total > 255 ? 2 : 1;
	const out = [
		...BOC_MAGIC,
		width,
		cells,
		1,
		0
	];
	if (width === 2) out.push(total >> 8 & 255);
	out.push(total & 255, 0);
	for (let cell = 0, offset = 0; cell < cells; ++cell) {
		const first = cell === 0;
		const last = cell + 1 === cells;
		const count = first ? FIRST_CELL_BYTES : Math.min(CELL_BYTES, payload.length - offset);
		out.push(last ? 0 : 1, 2 * (count + (first ? 4 : 0)));
		if (first) out.push(...ENCRYPTED_COMMENT_OPCODE);
		for (let i = 0; i < count; ++i) out.push(payload[offset + i]);
		offset += count;
		if (!last) out.push(cell + 1);
	}
	return bytesToBase64(out);
}
/**
* A fee counts a body's bits and cells, never what they hold: an encrypted comment of this text is priced by a
* zero payload of the same size, so no key is needed to quote it.
*/
function encryptedCommentFeeBody(text) {
	const bytes = new TextEncoder().encode(text).length;
	return serverCommentBody(new Uint8Array(48 + (bytes + 31 & -16)));
}
//#endregion
//#region src/lib/wallet/walletSession.ts
var walletSession_exports = /* @__PURE__ */ __exportAll({
	NFT_TRANSFER_ATTACHED_NANOS: () => NFT_TRANSFER_ATTACHED_NANOS,
	default: () => WalletSession,
	isSendOutcomeUnknown: () => isSendOutcomeUnknown,
	loadWalletEngine: () => loadWalletEngine,
	walletError: () => walletError,
	withTabsLock: () => withTabsLock
});
var import_BigInteger = /* @__PURE__ */ __toESM(require_BigInteger());
var enginePromise;
/**
* The engine is ~3 MB of WebAssembly: it is fetched the first time the wallet needs it, never with the app.
*/
function loadWalletEngine() {
	return enginePromise ?? (enginePromise = __vitePreload(() => import("./dist-kY6ig_ru.js").then(async (engine) => {
		await engine.initializeWalletEngine();
		return engine;
	}), __vite__mapDeps([0,1,2,3])).catch((err) => {
		enginePromise = void 0;
		throw err;
	}));
}
/** what goes to the collectible's contract with the transfer; what the transfer leaves comes back */
var NFT_TRANSFER_ATTACHED_NANOS = "50000000";
/** what the new owner gets with the ownership notice */
var NFT_TRANSFER_FORWARD_NANOS = "1";
/**
* What the recipient's chat shows while a transfer to a Telegram user is out, in the form it went
*/
function getTransferDraft(params) {
	const address = params.userId && toFriendlyTonAddress(params.destination, params.bounce);
	if (!address) return;
	const comment = params.comment?.trim();
	return {
		amount: params.nanograms,
		address,
		comment,
		commentEncrypted: !!comment && !!params.encryptComment
	};
}
/**
* Whether a failed send may still have gone out: the engine says its submission outcome is unknown, or the server got
* the transfer and gave no clear answer to it. Only a refusal the server sent, or a failure before it was asked, is
* known to have sent nothing.
*/
function isSendOutcomeUnknown(error, submission, answer) {
	return isRotationSubmissionUnknown(error) || !!submission.rpcStarted && answer?.outcome !== "rejected";
}
function walletError(type) {
	const error = new Error(type);
	error.type = type;
	return error;
}
var PREVIEW_RECORD_ID = "public-key-only";
/** the domain of the challenge a wallet's ownership is proven with (iOS: WalletOperations) */
var OWNERSHIP_PROOF_DOMAIN = "telegram.org";
var SEND_VALIDITY_SECONDS = 300;
/** the emulation's refusal of an external message whose seqno is stale: exit code 133, however the engine words it */
var PREVIEW_SEQNO_LAG_REGEXP = /(?:not accepted|NotAccepted)[^]*\b133\b(?!\.\d)/i;
var PREVIEW_SEQNO_RETRY_DELAY = 1e3;
var RESOLUTION_MARGIN_SECONDS = 60;
var REQUEST_TIMEOUT = 15e3;
/** the fee quote's throwaway update is never sent: a short window is enough to emulate it */
var ROTATION_QUOTE_VALIDITY_SECONDS = 120;
var ROTATION_POLL_INTERVAL = 3e3;
/** past the window and the engine's own margin, before a sent update is left to settle later */
var ROTATION_WATCH_MARGIN = 6e4;
/** how often a pending update from before a reload is looked at again */
var ROTATION_RESUME_INTERVAL = 3e4;
/** how long a backup change waits for the server to serve the key an update installed */
var SERVED_KEY_WAIT = 3e4;
var sessions = /* @__PURE__ */ new Map();
/**
* Runs `task` holding the Web Lock `name`, which every tab of the origin shares; a tab that closes lets it go.
* `ifAvailable`: when another holder has it, `task` does not run and nothing comes back. Without the Locks API the task
* runs as it is.
*/
function withTabsLock(name, ifAvailable, task) {
	const locks = typeof navigator !== "undefined" ? navigator.locks : void 0;
	if (!locks) return task();
	return locks.request(name, { ifAvailable }, (lock) => lock ? task() : void 0);
}
/**
* The key the server gives for a Telegram recipient, when it still derives their address: it spares the engine the
* chain lookup. After a key update the server serves the new key while the address stays the anchor key's, and the
* engine refuses a key that derives another address — then the chain is asked (`get_public_key`). Checked with the
* lookup that touches no secret, so the step that needs the key is never asked for twice.
*/
async function recipientKeyHint(client, destination, publicKey) {
	if (!publicKey) return null;
	const key = Array.from(publicKey);
	try {
		await client.resolveEncryptedCommentRecipient({
			recipient: destination,
			recipientPublicKey: key
		});
		return key;
	} catch (err) {
		return null;
	}
}
/** a client goes, then what it still has out on the network: its own requests only */
function closeClient(client) {
	client?.promise.then((client) => client.close()).catch(() => {}).finally(() => client.host.close());
}
var WalletSession = class WalletSession {
	static get(userId = rootScope.myId.toUserId()) {
		let session = sessions.get(userId);
		if (!session) sessions.set(userId, session = new WalletSession(userId));
		return session;
	}
	constructor(userId) {
		this.userId = userId;
		this.clientQueue = Promise.resolve();
		this.rotationResumedAt = 0;
		this.parkedFunds = /* @__PURE__ */ new Map();
		this.custodyQueue = createSerializedQueue();
		this.vault = new WalletVault(userId);
		this.managers = bindManagersToAccount(rootScope.managers, getCurrentAccount());
	}
	/**
	* Every write of the custody records goes through here, in this tab and across the tabs: a write decided on a read
	* must not land on a record another write replaced meanwhile. Not re-entrant: a task never calls another locked
	* method, and holds nothing that waits for the user or the network.
	*/
	withCustody(task) {
		return this.custodyQueue.enqueue(() => withTabsLock("tweb-wallet-custody:" + this.userId, false, task));
	}
	/**
	* A key update's submission and its settling after a reload exclude each other across the tabs: a tab that settles
	* an update must never take one that another tab is still broadcasting for one that never left. Taken before the
	* custody lock, never inside it.
	*/
	withRotationLock(ifAvailable, task) {
		return withTabsLock("tweb-wallet-rotation:" + this.userId, ifAvailable, task);
	}
	getEngine() {
		return loadWalletEngine();
	}
	async getPlatformHost() {
		if (this.platformHost) return this.platformHost;
		const engine = await this.getEngine();
		return this.platformHost ?? (this.platformHost = new engine.BrowserPlatformHost({
			secrets: {
				read: async (request) => {
					await this.ensureUnlocked(request.reason);
					return this.vault.readSecret(request.secretRef.value);
				},
				store: async (request) => {
					await this.ensureVault();
					const bytes = new Uint8Array(request.bytes);
					try {
						await this.vault.storeSecret(request.secretRef.value, bytes);
					} finally {
						bytes.fill(0);
					}
				},
				delete: (secretRef) => this.vault.deleteSecret(secretRef.value)
			},
			journal: new engine.IndexedDbJournalStore("tweb-wallet-journal")
		}));
	}
	getLifecycle() {
		if (this.lifecycle) return this.lifecycle;
		const promise = this.lifecycle = Promise.all([this.getEngine(), this.getPlatformHost()]).then(([engine, platformHost]) => {
			return engine.WalletLifecycle.create(platformHost);
		});
		promise.catch(() => {
			if (this.lifecycle === promise) this.lifecycle = void 0;
		});
		return promise;
	}
	/**
	* A client bound to this device's key when it has one, otherwise one that knows only the public key: it reads
	* the chain and quotes fees with a placeholder signature, and cannot send.
	*/
	/**
	* One client at a time: calls are queued, so two concurrent ones never build two clients for the same key.
	*/
	getClient(status) {
		const promise = this.clientQueue.then(() => this.getClientUnqueued(status));
		this.clientQueue = promise.catch(() => {});
		return promise;
	}
	async getClientUnqueued(status) {
		const state = status.state;
		if (!state) throw walletError("WALLET_NOT_READY");
		const record = await this.getMatchingRecord(status);
		const key = record ? "record:" + record.recordId : "preview:" + state.address + ":" + bytesToHex(state.public_key);
		if (this.client?.key === key) return this.client.promise;
		const previous = this.client;
		const engine = await this.getEngine();
		const config = {
			recordId: record ? record.recordId : PREVIEW_RECORD_ID,
			address: record ? record.address : state.address,
			publicKey: Array.from(record ? bytesFromHex(record.anchorKey) : state.public_key),
			localSecretRef: record ? { value: record.secretRef } : void 0,
			network: "mainnet",
			sendValiditySeconds: SEND_VALIDITY_SECONDS,
			resolutionMarginSeconds: RESOLUTION_MARGIN_SECONDS,
			providers: {
				toncenterBaseUrl: TONCENTER_BASE_URL,
				dnsRootAddress: null,
				requestTimeoutMs: REQUEST_TIMEOUT
			}
		};
		const host = new WalletStatuslessHostImpl(this.managers);
		const promise = this.getPlatformHost().then((platformHost) => {
			return engine.WalletClient.createStatusless(config, {
				platformHost,
				statuslessHost: host
			});
		});
		this.client = {
			key,
			promise,
			host
		};
		promise.catch(() => {
			if (this.client?.promise === promise) this.client = void 0;
		});
		closeClient(previous);
		return promise;
	}
	close() {
		closeClient(this.client);
		this.client = void 0;
		this.lifecycle?.then((lifecycle) => lifecycle.close()).catch(() => {});
		this.lifecycle = void 0;
	}
	async ensureVault() {
		if (this.vault.isUnlocked()) return;
		if (!await this.vault.getKind()) {
			if (!this.ui) throw new WalletVaultLockedError();
			await this.ui.createVault(this.vault);
			if (this.vault.isUnlocked()) return;
		}
		await this.ensureUnlocked("install");
	}
	async ensureUnlocked(reason) {
		if (this.vault.isUnlocked() || await this.vault.unlockSilently()) return;
		if (!this.ui) throw new WalletVaultLockedError();
		const unlocking = this.unlocking ?? (this.unlocking = this.ui.unlockVault(this.vault, reason).finally(() => {
			if (this.unlocking === unlocking) this.unlocking = void 0;
		}));
		await unlocking;
		if (!this.vault.isUnlocked()) throw new WalletVaultLockedError();
	}
	/**
	* The local key, if it is the key of the wallet the server serves now: same address, and the signing key
	* the server knows as current — or the one this device's confirmed key update installed, until the server
	* catches up. A pending update is settled on the way (see `reconcileRotation`).
	*/
	async getMatchingRecord(status) {
		const state = status.state;
		let record = await this.vault.getCustody();
		if (!state || !record) return;
		if (!await this.isSameAddress(record.address, state.address)) return;
		record = await this.reconcileRotation(record, status);
		if (!isRecordSigningFor(record, bytesToHex(state.public_key))) return;
		if (!await this.vault.hasSecret(record.secretRef)) return;
		return record;
	}
	async getDeviceMode(status) {
		if (status.presence !== "ready" || !status.state) return "unknown";
		if (await this.getMatchingRecord(status)) return "full";
		return status.state.pFlags.can_export_phrase ? "restorable" : "notRestorable";
	}
	/**
	* Whether two addresses name one wallet; nothing when either of them could not be read — then neither answer is
	* known, and each caller fails closed its own way.
	*/
	async compareAddresses(a, b) {
		if (a === b) return true;
		const engine = await this.getEngine();
		try {
			const [rawA, rawB] = await Promise.all([engine.convertTonAddress(a, { kind: "raw" }), engine.convertTonAddress(b, { kind: "raw" })]);
			return rawA === rawB;
		} catch (err) {}
	}
	/** known to be one wallet; an address that could not be read is not */
	async isSameAddress(a, b) {
		return await this.compareAddresses(a, b) === true;
	}
	/** known to be another wallet; an address that could not be read is never taken for one */
	async isOtherAddress(a, b) {
		return await this.compareAddresses(a, b) === false;
	}
	async friendlyAddress(address, bounceable = false) {
		return (await this.getEngine()).convertTonAddress(address, {
			kind: "userFriendly",
			bounceable,
			testnet: false
		});
	}
	/**
	* Installs the phrase of the served wallet on this device. Nothing is sent to the server: the phrase must
	* derive the served address (else it is another wallet) and the served signing key (else it is a phrase
	* from before a key update).
	*/
	async restoreFromWords(words, status) {
		const state = status.state;
		if (!state) throw walletError("WALLET_NOT_READY");
		words = words.map((word) => word.trim().toLowerCase()).filter(Boolean);
		if (words.length !== 12 && words.length !== 24) throw walletError("WALLET_PHRASE_INVALID");
		const schemes = await (await this.getEngine()).detectMnemonicSchemes(words);
		if (!schemes.includes("rotation")) throw walletError(schemes.length ? "WALLET_PHRASE_FOREIGN" : "WALLET_PHRASE_INVALID");
		await this.refuseWhileRotating();
		await this.ensureVault();
		const lifecycle = await this.getLifecycle();
		const descriptor = await lifecycle.importWallet({
			recordId: crypto.randomUUID(),
			network: "mainnet",
			recoveryWords: words
		});
		try {
			if (!await this.isSameAddress(descriptor.address, state.address)) throw walletError("WALLET_PHRASE_OTHER_WALLET");
			const signingKey = await this.getSigningKey(lifecycle, descriptor);
			if (signingKey !== bytesToHex(state.public_key)) throw walletError("WALLET_PHRASE_OUTDATED");
			const record = {
				recordId: descriptor.recordId,
				address: descriptor.address,
				anchorKey: bytesToHex(descriptor.publicKey),
				signingKey,
				secretRef: descriptor.secretRef.value,
				network: "mainnet",
				date: Date.now()
			};
			await this.installRecord(record, true);
			return record;
		} catch (err) {
			await lifecycle.deleteWallet(descriptor).catch(() => {});
			throw err;
		}
	}
	/**
	* A key update on its way holds the custody: nothing replaces the record under it (tdesktop refuses the same)
	*/
	async refuseWhileRotating() {
		if ((await this.vault.getCustody())?.pendingRotation) throw walletError("ROTATION_PENDING");
	}
	/**
	* Makes `record` the device's key and retires the one it replaces, as read under the lock: an older phrase of the
	* same wallet is dropped, the key of another wallet is parked — its phrase is still the only way into that wallet's
	* funds. So is a record with a key update on its way, together with the update: whether the chain took the new
	* phrase is not known here. `refuseRotating`: such an update refuses the install instead.
	*
	* Each step leaves a key reachable if the next one fails: the old record is parked before the new one replaces it,
	* and an old phrase is deleted only once the new record is stored.
	*/
	installRecord(record, refuseRotating) {
		return this.withCustody(async () => {
			const previous = await this.vault.getCustody();
			if (refuseRotating && previous?.pendingRotation) throw walletError("ROTATION_PENDING");
			if (previous?.awaitingServerKey && record.signingKey === previous.awaitingServerKey && await this.isSameAddress(previous.address, record.address)) throw walletError("WALLET_PHRASE_OUTDATED");
			const retired = previous && previous.secretRef !== record.secretRef ? previous : void 0;
			const park = !!retired && (!!retired.pendingRotation || !await this.isSameAddress(retired.address, record.address));
			if (park) await this.vault.parkCustody(retired);
			await this.vault.saveCustody(record);
			if (retired && !park) await this.vault.deleteSecret(retired.secretRef).catch(() => {});
		});
	}
	/**
	* A new wallet made by the server in place of the account's current one
	*/
	async replaceWithNew(password) {
		await this.refuseWhileRotating();
		return this.managers.appWalletManager.replaceWallet({ _: "inputWalletNew" }, password);
	}
	/**
	* Brings a wallet in by its phrase: it is imported here, the server gets the proof that this device holds its
	* current signing key, and only once the server serves that very address is the key kept as the account's.
	*/
	async replaceWithImported(words, askPassword) {
		words = words.map((word) => word.trim().toLowerCase()).filter(Boolean);
		if (words.length !== 12 && words.length !== 24) throw walletError("WALLET_PHRASE_INVALID");
		const schemes = await (await this.getEngine()).detectMnemonicSchemes(words);
		if (!schemes.includes("rotation")) throw walletError(schemes.length ? "WALLET_PHRASE_FOREIGN" : "WALLET_PHRASE_INVALID");
		await this.refuseWhileRotating();
		await this.ensureVault();
		const lifecycle = await this.getLifecycle();
		const descriptor = await lifecycle.importWallet({
			recordId: crypto.randomUUID(),
			network: "mainnet",
			recoveryWords: words
		});
		try {
			const signingKey = await this.getSigningKey(lifecycle, descriptor);
			const anchorKey = bytesToHex(descriptor.publicKey);
			const record = {
				recordId: descriptor.recordId,
				address: descriptor.address,
				anchorKey,
				signingKey,
				secretRef: descriptor.secretRef.value,
				network: "mainnet",
				date: Date.now()
			};
			const status = await askPassword(async (password) => {
				const proof = await this.getOwnershipProof(record);
				try {
					return await this.managers.appWalletManager.replaceWallet({
						_: "inputWalletImported",
						public_key: bytesFromHex(signingKey),
						anchor_public_key: anchorKey !== signingKey ? bytesFromHex(anchorKey) : void 0,
						proof
					}, password);
				} catch (err) {
					const served = isDefiniteTransferRefusal(err) ? void 0 : await this.refetchStatus();
					if (served?.state && bytesToHex(served.state.public_key) === signingKey && await this.isSameAddress(served.state.address, descriptor.address)) return served;
					throw err;
				}
			});
			if (!status.state || !await this.isSameAddress(status.state.address, descriptor.address)) throw walletError("WALLET_KEY_MISMATCH");
			await this.installRecord(record, false);
			return status;
		} catch (err) {
			await lifecycle.deleteWallet(descriptor).catch(() => {});
			throw err;
		}
	}
	async getSigningKey(lifecycle, descriptor) {
		const signature = await lifecycle.signTonConnectProof({
			descriptor,
			domain: "web.telegram.org",
			timestamp: Math.floor(Date.now() / 1e3),
			payload: "wallet-key-check"
		});
		return bytesToHex(signature.publicKey);
	}
	/**
	* Reassembles the phrase from Telegram's backup: the export is started (with the 2FA check when the server
	* wants it, through `askPassword`, which retries a wrong password itself), each holder DC returns its share
	* sealed to a one-time key, and the shares XOR back into the seed.
	*/
	async fetchPhraseFromBackup(askPassword) {
		const managers = this.managers;
		let parts;
		try {
			parts = await managers.appWalletManager.exportSecretPhrase();
		} catch (err) {
			if (err.type !== "PASSWORD_MISSING") throw err;
			parts = await askPassword((password) => managers.appWalletManager.exportSecretPhrase(password));
		}
		const { generateShareKeyPair, decryptShare, combineShares, wordsFromSeed } = await __vitePreload(async () => {
			const { generateShareKeyPair, decryptShare, combineShares, wordsFromSeed } = await import("./phraseShares-D6KLUolq.js");
			return {
				generateShareKeyPair,
				decryptShare,
				combineShares,
				wordsFromSeed
			};
		}, __vite__mapDeps([4,5,1,3,6]));
		const keyPair = await generateShareKeyPair();
		try {
			const encrypted = await Promise.all(parts.dcs.map((dcId) => {
				return managers.appWalletManager.fetchEncryptedSecretPhrasePart(dcId, parts.token, keyPair.publicKey);
			}));
			const shares = await Promise.all(encrypted.map((data) => decryptShare(keyPair, data)));
			const seed = combineShares(shares);
			const words = wordsFromSeed(seed);
			seed.fill(0);
			shares.forEach((share) => share.fill(0));
			return words;
		} finally {
			keyPair.secretKey.fill(0);
		}
	}
	async revealPhrase(status) {
		const record = await this.getMatchingRecord(status);
		if (!record) throw walletError("WALLET_KEY_MISSING");
		if (record.pendingRotation) throw walletError("ROTATION_PENDING");
		return this.revealRecord(record);
	}
	async revealRecord(record) {
		return (await (await this.getLifecycle()).revealRecoveryPhrase(this.descriptorOf(record))).phrase.trim().split(/\s+/);
	}
	/**
	* Keys of other wallets this device still holds: one parked when the account's wallet was replaced or restored
	* to another address, or the device's key of a wallet the server no longer serves. The phrase is the only way
	* into what they hold, so until it is saved and the key dropped ("Switch now") tdesktop calls it a conflict,
	* and key-requiring actions stop at it.
	*/
	async getParkedRecords(status) {
		const state = status.state;
		if (!state) return [];
		const [current, parked] = await Promise.all([this.vault.getCustody(), this.vault.getParkedCustody()]);
		const out = [];
		for (const record of [current, ...parked]) {
			if (!record || out.some((item) => item.recordId === record.recordId)) continue;
			if (!await this.isOtherAddress(record.address, state.address)) continue;
			if (!await this.vault.hasSecret(record.secretRef)) continue;
			out.push(record);
		}
		return out;
	}
	getParkedFunds(record, refresh) {
		let promise = this.parkedFunds.get(record.address);
		if (!promise || refresh) {
			promise = this.friendlyAddress(record.address).then((address) => this.managers.appWalletManager.getAddressFunds(address)).catch(() => void 0);
			this.parkedFunds.set(record.address, promise);
		}
		return promise;
	}
	/**
	* The old wallets with what they hold. One that is empty and was never used holds nothing worth its phrase:
	* its key goes quietly, the way tdesktop drops it. `refresh` asks the chain again (a window opening).
	*/
	async getParkedState(status, refresh) {
		const records = await this.getParkedRecords(status);
		const funds = await Promise.all(records.map((record) => this.getParkedFunds(record, refresh)));
		const wallets = [];
		let total = import_BigInteger.default.zero, unknown = false;
		for (let index = 0; index < records.length; ++index) {
			const record = records[index];
			const held = funds[index];
			if (held?.neverUsed && held.nanos === "0" && await this.dropParked(record, true).then(() => true, () => false)) continue;
			if (held) total = total.add((0, import_BigInteger.default)(held.nanos));
			else unknown = true;
			wallets.push({
				record,
				nanos: held?.nanos
			});
		}
		return {
			wallets,
			nanos: unknown ? void 0 : total.toString()
		};
	}
	/**
	* An old wallet's phrase. One parked with a key update on its way is settled first: the phrase shown is the one
	* that signs, and while that is not known none is (`ROTATION_PENDING`).
	*/
	async revealParked(record) {
		const settled = await this.settleParkedRotation(record);
		if (!settled) throw walletError("ROTATION_PENDING");
		return this.revealRecord(settled);
	}
	/**
	* An old wallet parked with a key update on its way: which phrase signs is settled by the key its contract holds
	* now (`get_public_key`, as Android asks it). The record comes back with the phrase that signs — the update's,
	* promoted, or the old one, the update dropped once it can no longer land — or nothing while that is not known.
	*/
	async settleParkedRotation(record) {
		const pending = record.pendingRotation;
		if (!pending) return record;
		let chainKey, now;
		try {
			[chainKey, now] = await Promise.all([this.friendlyAddress(record.address).then((address) => this.managers.appWalletManager.getAddressSigningKey(address)), this.managers.timeManager.getServerTime()]);
		} catch (err) {
			return;
		}
		const landed = chainKey === pending.newSigningKey;
		const failed = !landed && chainKey === record.signingKey && now > pending.validUntil + RESOLUTION_MARGIN_SECONDS;
		if (!landed && !failed) return;
		return this.withCustody(async () => {
			const current = await this.vault.getCustody();
			const isCurrent = current?.recordId === record.recordId;
			const stored = isCurrent ? current : (await this.vault.getParkedCustody()).find((item) => item.recordId === record.recordId);
			if (stored?.pendingRotation?.operationId !== pending.operationId) return;
			const settled = landed ? promoteRotationRecord(stored, pending.newSigningKey) : {
				...stored,
				pendingRotation: void 0
			};
			if (isCurrent) await this.vault.saveCustody(settled);
			else {
				await this.vault.parkCustody(settled);
				if (settled.recordId !== stored.recordId) await this.vault.deleteParkedCustody(stored.recordId);
			}
			await this.vault.deleteSecret(landed ? stored.secretRef : pending.secretRef).catch(() => {});
			return settled;
		});
	}
	/**
	* Forgets an old wallet's key on this device. Whoever has its phrase still has what it holds. One parked with a key
	* update on its way is settled first, and while that is not known nothing is dropped (`ROTATION_PENDING`): the
	* update's phrase may be the only one that signs. `unused`: the wallet never had a transaction and holds nothing —
	* no update of it can land, both phrases go. Decided on a read of the records, it drops only the record that is
	* still there.
	*/
	async dropParked(record, unused) {
		const settled = unused ? record : await this.settleParkedRotation(record);
		if (!settled) throw walletError("ROTATION_PENDING");
		return this.withCustody(async () => {
			const current = await this.vault.getCustody();
			const isCurrent = current?.recordId === settled.recordId;
			const stored = isCurrent ? current : (await this.vault.getParkedCustody()).find((item) => item.recordId === settled.recordId);
			if (stored?.pendingRotation && !unused) throw walletError("ROTATION_PENDING");
			if (stored) {
				if (stored.pendingRotation) await this.vault.deleteSecret(stored.pendingRotation.secretRef);
				await this.vault.deleteSecret(stored.secretRef);
				if (isCurrent) await this.vault.deleteCustody();
				else await this.vault.deleteParkedCustody(stored.recordId);
			}
			this.parkedFunds.delete(record.address);
		});
	}
	descriptorOf(record) {
		return {
			recordId: record.recordId,
			address: record.address,
			publicKey: Array.from(bytesFromHex(record.anchorKey)),
			network: record.network,
			secretRef: { value: record.secretRef }
		};
	}
	/**
	* Proves to the server that this device holds the wallet's current signing key: the server's one-time challenge
	* (300 s, one attempt — so it is asked for last) signed like a TON Connect proof.
	*/
	async getOwnershipProof(record) {
		const lifecycle = await this.getLifecycle();
		const [challenge, timestamp] = await Promise.all([this.managers.appWalletManager.getProofChallenge(), this.managers.timeManager.getServerTime()]);
		if (challenge.domain?.toLowerCase() !== OWNERSHIP_PROOF_DOMAIN || !(timestamp < challenge.expires)) throw walletError("WALLET_PROOF_INVALID");
		const signed = await lifecycle.signTonConnectProof({
			descriptor: this.descriptorOf(record),
			domain: challenge.domain,
			timestamp,
			payload: challenge.payload
		});
		if (bytesToHex(signed.publicKey) !== record.signingKey) throw walletError("WALLET_KEY_MISMATCH");
		if (signed.signature.length !== 64) throw walletError("WALLET_PROOF_INVALID");
		return {
			_: "walletOwnershipProof",
			timestamp,
			signature: new Uint8Array(signed.signature)
		};
	}
	/**
	* Puts the phrase into Telegram's backup: split into XOR shares, one sealed to each holder DC's key, and
	* handed over with the proof that this device holds the key.
	*/
	async enableBackup(status) {
		const record = await this.getBackupRecord(status);
		const holders = await this.managers.appWalletManager.getBackupHolderDcs();
		const dcs = new Set(holders.map((holder) => holder.dc));
		if (holders.length < 2 || dcs.size !== holders.length || holders.some((holder) => holder.public_key.length !== 32)) throw walletError("WALLET_BACKUP_NOT_AVAILABLE");
		const words = await this.revealPhrase(status);
		const { seedFromWords, splitSeed, encryptShare } = await __vitePreload(async () => {
			const { seedFromWords, splitSeed, encryptShare } = await import("./phraseShares-D6KLUolq.js");
			return {
				seedFromWords,
				splitSeed,
				encryptShare
			};
		}, __vite__mapDeps([4,5,1,3,6]));
		const seed = seedFromWords(words);
		words.fill("");
		const shares = splitSeed(seed, holders.length);
		seed.fill(0);
		const parts = await Promise.all(shares.map((share, index) => encryptShare(holders[index].public_key, share)));
		shares.forEach((share) => share.fill(0));
		const proof = await this.getOwnershipProof(record);
		let result;
		try {
			result = await this.managers.appWalletManager.enableBackup(parts, bytesFromHex(record.signingKey), proof);
		} catch (err) {
			const served = await this.refetchStatus();
			const state = served?.state;
			if (!state?.pFlags.backup_enabled || bytesToHex(state.public_key) !== record.signingKey) throw err;
			result = served;
		}
		await this.patchCustody(record.recordId, { rotatedSinceBackup: void 0 });
		return result;
	}
	/**
	* Takes the phrase out of Telegram's backup. From then on only the written-down phrase recovers the wallet.
	* The proof is signed by the record's key — right after an update, by the new one, so the server first gets a
	* moment to serve it. A refusal is checked against what the server serves then: a disable it applied anyway
	* (its answer lost, say) is still the outcome asked for.
	*/
	async disableBackup(status) {
		let record = await this.getBackupRecord(status);
		if (record.awaitingServerKey) record = await this.getBackupRecord(await this.waitForServedKey(record.signingKey, status));
		const proof = await this.getOwnershipProof(record);
		try {
			const result = await this.managers.appWalletManager.disableBackup({
				newPublicKey: bytesFromHex(record.signingKey),
				proof
			});
			await this.patchCustody(record.recordId, { rotatedSinceBackup: void 0 });
			return result;
		} catch (err) {
			const served = await this.refetchStatus();
			const state = served?.state;
			if (!state || state.pFlags.backup_enabled || bytesToHex(state.public_key) !== record.signingKey) throw err;
			await this.patchCustody(record.recordId, { rotatedSinceBackup: void 0 });
			return served;
		}
	}
	/**
	* The record a backup change is signed with. Not while a key update is on its way: the key it proves may be
	* replaced the next moment.
	*/
	async getBackupRecord(status) {
		const record = await this.getMatchingRecord(status);
		if (!record) throw walletError("WALLET_KEY_MISSING");
		if (record.pendingRotation) throw walletError("ROTATION_PENDING");
		return record;
	}
	/**
	* The server's word on the wallet now, not the cached one; nothing when it does not answer. After a request whose
	* answer was lost, it tells what the request did.
	*/
	refetchStatus() {
		return this.managers.appWalletManager.getStatus(true).catch(() => void 0);
	}
	/**
	* Polls the server until it serves `key`, for a while; the last status either way
	*/
	async waitForServedKey(key, status) {
		const deadline = Date.now() + SERVED_KEY_WAIT;
		while (status.state && bytesToHex(status.state.public_key) !== key && Date.now() < deadline) {
			await pause(ROTATION_POLL_INTERVAL);
			status = await this.managers.appWalletManager.getStatus(true).catch(() => status);
		}
		return status;
	}
	/**
	* Drops the device's key: the record `recordId` names, the one whose loss the user was told of — another one,
	* installed meanwhile (another tab), stays, and the answer is false
	*/
	async forgetKey(recordId) {
		const forgotten = await this.withCustody(async () => {
			const record = await this.vault.getCustody();
			if (record?.recordId !== recordId) return false;
			if (record.pendingRotation) throw walletError("ROTATION_PENDING");
			await this.vault.deleteSecret(record.secretRef).catch(() => {});
			await this.vault.deleteCustody();
			return true;
		});
		if (forgotten) this.close();
		return forgotten;
	}
	/**
	* Whether Disable Backup can offer a new phrase: this device signs for the wallet, no update is on its way, and
	* the key has not been updated since the backup was last switched — a second update waits for that.
	*/
	async isRotationOffered(status) {
		if (this.sending || this.rotationBusy) return false;
		const record = await this.getMatchingRecord(status);
		return !!record && !record.pendingRotation && !record.rotatedSinceBackup;
	}
	/**
	* The network fee of a key update. The engine signs a real one; its signature is replaced with random bytes before
	* anything else sees it, and that disarmed copy is emulated with signature checks off. Its new phrase is never
	* shown: it dies with the copy.
	*/
	quoteRotationFee(status) {
		return this.runRotationStep(async () => {
			const record = await this.getRotatableRecord(status);
			const client = await this.getClient(status);
			const validUntil = await this.managers.timeManager.getServerTime() + ROTATION_QUOTE_VALIDITY_SECONDS;
			const prepared = await client.prepareKeyRotation({
				validUntil,
				messageKind: "external"
			});
			const disarmed = breakRotationSignature(prepared.signedBoc);
			if (!disarmed) throw walletError("ROTATION_QUOTE_FAILED");
			const body = await this.managers.appWalletManager.performToncenterRequest(emulateTraceRequest(disarmed));
			const trace = parseEmulatedTrace(body);
			if (!trace || !await this.isSameAddress(trace.account, record.address)) throw walletError("ROTATION_QUOTE_FAILED");
			return makeRotationQuote(trace.fee, status.state.balance);
		});
	}
	/**
	* Signs the real update and hands its new phrase out to be written down. Nothing leaves the device: the update
	* waits in memory for `submitRotation`, or `abandonRotation` drops it.
	*/
	prepareRotation(status, quote) {
		return this.runRotationStep(async () => {
			const record = await this.getRotatableRecord(status);
			const client = await this.getClient(status);
			const validUntil = await this.managers.timeManager.getServerTime() + SEND_VALIDITY_SECONDS;
			const prepared = await client.prepareKeyRotation({
				validUntil,
				messageKind: "external"
			});
			const words = prepared.replacementRecoveryPhrase.phrase.trim().split(/\s+/);
			if (words.length < 12 || prepared.newPublicKey.length !== 32) throw walletError("ROTATION_PREPARE_FAILED");
			this.abandonRotation();
			this.preparedRotation = {
				recordId: record.recordId,
				words,
				newSigningKey: bytesToHex(prepared.newPublicKey),
				signedBoc: prepared.signedBoc,
				seqno: prepared.seqno,
				validUntil: prepared.validUntil,
				fee: quote.fee
			};
			return words.slice();
		});
	}
	/**
	* Drops a prepared update that was never sent; its signature expires with its window anyway
	*/
	abandonRotation() {
		if (this.rotationSubmitting) return;
		this.preparedRotation?.words.fill("");
		this.preparedRotation = void 0;
	}
	/**
	* Sends the prepared update and waits for the chain. The new phrase is imported first, as the pending half of the
	* custody record: the record's own secret stays the old phrase until the chain confirms the new key, so a reload
	* in between finds the old key still signing and the update settled later by the engine's journal.
	* Resolves once the record signs with the new key, with that key (hex). Rejects with a `ROTATION_*` reason, and
	* then nothing changed — except for `ROTATION_PENDING`: the chain has not answered in time, the update settles by
	* itself later.
	*/
	async submitRotation(status) {
		const prepared = this.preparedRotation;
		if (!prepared) throw walletError("ROTATION_NOT_PREPARED");
		if (this.sending || this.rotationBusy) throw walletError("ROTATION_ALREADY_SENDING");
		this.sending = this.rotationSubmitting = true;
		try {
			if (!await this.withRotationLock(true, async () => {
				await this.submitRotationLocked(status, prepared);
				return true;
			})) throw walletError("ROTATION_ALREADY_SENDING");
			return prepared.newSigningKey;
		} catch (err) {
			throw this.toRotationError(err);
		} finally {
			this.sending = this.rotationSubmitting = false;
			prepared.words.fill("");
			if (this.preparedRotation === prepared) this.preparedRotation = void 0;
		}
	}
	async submitRotationLocked(status, prepared) {
		if (await this.managers.timeManager.getServerTime() >= prepared.validUntil) throw walletError("ROTATION_EXPIRED");
		if (!isRotationFeeCovered(prepared.fee, status.state?.balance)) throw walletError("ROTATION_FEES");
		const record = await this.getMatchingRecord(status);
		if (!record || record.recordId !== prepared.recordId || record.pendingRotation) throw walletError("ROTATION_STATE_UNKNOWN");
		const client = await this.getClient(status);
		const pending = await this.storePendingRotation(record, prepared);
		let verdict = "wait";
		try {
			setWalletSubmission(void 0);
			const result = await client.sendBoc({
				operationId: pending.operationId,
				signedBoc: prepared.signedBoc,
				seqno: prepared.seqno,
				validUntil: prepared.validUntil
			});
			verdict = rotationSnapshotVerdict(pending.operationId, result, false);
		} catch (err) {
			if (!isRotationSubmissionUnknown(err)) {
				await this.discardPendingRotation(pending.operationId);
				throw err;
			}
		}
		let servedKey = bytesToHex(status.state.public_key);
		if (verdict === "wait") {
			const watched = await this.watchRotation(client, pending, false);
			verdict = watched.verdict;
			servedKey = watched.servedKey || servedKey;
		}
		await this.settleRotation(pending, verdict, servedKey);
	}
	async getRotatableRecord(status) {
		const record = await this.getMatchingRecord(status);
		if (!record) throw walletError("ROTATION_NO_CUSTODY");
		if (record.pendingRotation || record.rotatedSinceBackup) throw walletError("ROTATION_BUSY");
		return record;
	}
	async runRotationStep(step) {
		if (this.sending || this.rotationBusy) throw walletError("ROTATION_ALREADY_SENDING");
		this.rotationBusy = true;
		try {
			return await step();
		} catch (err) {
			throw this.toRotationError(err);
		} finally {
			this.rotationBusy = false;
		}
	}
	/**
	* Engine and wallet failures as one `ROTATION_*` reason; a passcode prompt the user left stays what it is
	*/
	toRotationError(err) {
		if (err instanceof WalletVaultLockedError || !(err instanceof Error) && typeof err !== "string") return err;
		return walletError(rotationErrorType(err));
	}
	/**
	* Imports the new phrase beside the record's own and notes it as the record's pending update — before anything
	* is broadcast, so the phrase survives whatever comes next. It must derive the same wallet and the new key.
	*/
	async storePendingRotation(record, prepared) {
		await this.ensureVault();
		const lifecycle = await this.getLifecycle();
		const descriptor = await lifecycle.importWallet({
			recordId: crypto.randomUUID(),
			network: record.network,
			recoveryWords: prepared.words
		});
		try {
			if (bytesToHex(descriptor.publicKey) !== record.anchorKey || !await this.isSameAddress(descriptor.address, record.address)) throw walletError("ROTATION_KEY_MISMATCH");
			if (await this.getSigningKey(lifecycle, descriptor) !== prepared.newSigningKey) throw walletError("ROTATION_KEY_MISMATCH");
			const pending = {
				recordId: descriptor.recordId,
				secretRef: descriptor.secretRef.value,
				operationId: crypto.randomUUID(),
				newSigningKey: prepared.newSigningKey,
				validUntil: prepared.validUntil
			};
			if (!await this.withCustody(async () => {
				const current = await this.vault.getCustody();
				if (current?.recordId !== record.recordId || current.pendingRotation) return false;
				await this.vault.saveCustody({
					...current,
					pendingRotation: pending
				});
				return true;
			})) throw walletError("ROTATION_STATE_UNKNOWN");
			return pending;
		} catch (err) {
			await lifecycle.deleteWallet(descriptor).catch(() => {});
			throw err;
		}
	}
	/**
	* Waits for the chain's word on a sent update: the server serving its key, or the engine's journal naming its
	* end. `pending` when neither came a while after the message's window closed.
	*
	* `resumed`: nobody in this tab submits it (one from before a reload, or another tab's). A journal that names no
	* such update then settles it as never sent — but only once its window has closed: until then it may be another
	* tab that stored the update and has not journaled it yet, and the update is looked at again later instead.
	*/
	async watchRotation(client, pending, resumed) {
		const now = await this.managers.timeManager.getServerTime();
		const startedAt = Date.now();
		const serverNow = () => now + (Date.now() - startedAt) / 1e3;
		const deadline = startedAt + (Math.max(0, pending.validUntil - now) + RESOLUTION_MARGIN_SECONDS) * 1e3 + ROTATION_WATCH_MARGIN;
		let servedKey;
		for (let round = 0;; ++round) {
			const record = await this.vault.getCustody();
			if (record?.pendingRotation?.operationId !== pending.operationId) return {
				verdict: record?.signingKey === pending.newSigningKey ? "confirmed" : "ROTATION_FAILED",
				servedKey
			};
			if (!(round % 2)) {
				const status = await this.refetchStatus();
				if (status?.state) servedKey = bytesToHex(status.state.public_key);
				if (servedKey === pending.newSigningKey) return {
					verdict: "confirmed",
					servedKey
				};
			}
			const snapshot = await client.resolvePending().catch(() => void 0);
			if (snapshot) {
				const authoritative = resumed && isRotationJournalAuthoritative(pending.validUntil, serverNow(), RESOLUTION_MARGIN_SECONDS);
				const verdict = rotationSnapshotVerdict(pending.operationId, snapshot, authoritative);
				if (verdict !== "wait") return {
					verdict,
					servedKey
				};
				if (resumed && snapshot.operationId !== pending.operationId) return {
					verdict: "pending",
					servedKey
				};
			}
			if (Date.now() >= deadline) return {
				verdict: "pending",
				servedKey
			};
			await pause(ROTATION_POLL_INTERVAL);
		}
	}
	/**
	* Confirmed: the record takes the new phrase. Ended otherwise: the new phrase goes. Unknown: it stays pending.
	*/
	async settleRotation(pending, verdict, servedKey) {
		if (verdict === "confirmed") {
			await this.promotePendingRotation(servedKey);
			return;
		}
		if (verdict === "pending" || verdict === "wait") throw walletError("ROTATION_PENDING");
		await this.discardPendingRotation(pending.operationId);
		throw walletError(verdict);
	}
	/**
	* A pending update meets the served key: the server serving the new key means the chain confirmed it; otherwise
	* an update this tab is not waiting for itself (one from before a reload) is looked at in the background. With
	* no update pending, the wait for the server to catch up with a confirmed one ends once it does.
	*/
	async reconcileRotation(record, status) {
		const servedKey = bytesToHex(status.state.public_key);
		if (record.pendingRotation) {
			if (record.pendingRotation.newSigningKey === servedKey) return await this.promotePendingRotation(servedKey) || record;
			if (!this.rotationSubmitting) this.resumeRotation(status);
			return record;
		}
		const settled = settleAwaitingServerKey(record, servedKey);
		if (!settled) return record;
		return await this.patchCustody(record.recordId, { awaitingServerKey: void 0 }) || settled;
	}
	/**
	* Settles an update sent before a reload, or by another tab. The client is the record's, whose journal holds the
	* update; that journal becomes authoritative once the update's window closed (see `watchRotation`). Skipped while
	* another tab holds the update: that one is submitting it.
	*/
	resumeRotation(status) {
		if (this.rotationResume || Date.now() - this.rotationResumedAt < ROTATION_RESUME_INTERVAL) return this.rotationResume;
		return this.rotationResume = (async () => {
			try {
				await this.withRotationLock(true, async () => {
					const pending = (await this.vault.getCustody())?.pendingRotation;
					if (!pending || this.rotationSubmitting) return;
					const client = await this.getClient(status);
					const { verdict, servedKey } = await this.watchRotation(client, pending, true);
					if (verdict !== "pending" && !this.rotationSubmitting) await this.settleRotation(pending, verdict, servedKey || bytesToHex(status.state.public_key)).catch(() => {});
				});
			} catch (err) {} finally {
				this.rotationResumedAt = Date.now();
				this.rotationResume = void 0;
			}
		})();
	}
	/**
	* The chain confirmed the pending update: the new phrase becomes the record's secret and the new key its signing
	* key, in one write, and the replaced phrase is deleted. One promotion at a time.
	*/
	promotePendingRotation(servedKey) {
		const promotion = this.rotationPromotion ?? (this.rotationPromotion = this.withCustody(async () => {
			const record = await this.vault.getCustody();
			if (!record?.pendingRotation) return record;
			const promoted = promoteRotationRecord(record, servedKey);
			await this.vault.saveCustody(promoted);
			await (await this.getLifecycle()).deleteWallet(this.descriptorOf(record)).catch(() => this.vault.deleteSecret(record.secretRef)).catch(() => {});
			return promoted;
		}).finally(() => {
			if (this.rotationPromotion === promotion) this.rotationPromotion = void 0;
		}));
		return promotion;
	}
	/**
	* The pending update `operationId` ended without taking effect: the record keeps its phrase, the new one is
	* deleted. Another update pending by then is not this one's to drop.
	*/
	discardPendingRotation(operationId) {
		return this.withCustody(async () => {
			const record = await this.vault.getCustody();
			const pending = record?.pendingRotation;
			if (pending?.operationId !== operationId) return;
			await this.patchCustodyLocked(record.recordId, { pendingRotation: void 0 });
			await (await this.getLifecycle()).deleteWallet({
				...this.descriptorOf(record),
				recordId: pending.recordId,
				secretRef: { value: pending.secretRef }
			}).catch(() => this.vault.deleteSecret(pending.secretRef)).catch(() => {});
		});
	}
	/**
	* Rewrites the custody record, if it is still the one with `recordId`
	*/
	patchCustody(recordId, patch) {
		return this.withCustody(() => this.patchCustodyLocked(recordId, patch));
	}
	async patchCustodyLocked(recordId, patch) {
		const record = await this.vault.getCustody();
		if (record?.recordId !== recordId) return record;
		const next = {
			...record,
			...patch
		};
		await this.vault.saveCustody(next);
		return next;
	}
	async buildIntent(status, params, forFee) {
		const destination = await (await this.getEngine()).convertTonAddress(params.destination, {
			kind: "userFriendly",
			bounceable: params.bounce,
			testnet: false
		});
		let body = params.payload ? {
			kind: "rawPayload",
			boc: params.payload
		} : { kind: "empty" };
		const comment = params.comment?.trim();
		if (comment) {
			if (!params.encryptComment) body = {
				kind: "comment",
				text: comment
			};
			else if (forFee) body = {
				kind: "rawPayload",
				boc: encryptedCommentFeeBody(comment)
			};
			else {
				const client = await this.getClient(status);
				body = {
					kind: "rawPayload",
					boc: await client.createEncryptedComment({
						recipient: destination,
						comment,
						recipientPublicKey: await recipientKeyHint(client, destination, params.recipientPublicKey)
					})
				};
			}
		}
		let expiration = { kind: "engineDefault" };
		if (params.expiresAt) {
			const now = await this.managers.timeManager.getServerTime();
			if (now >= params.expiresAt) throw walletError("WALLET_LINK_EXPIRED");
			expiration = {
				kind: "exact",
				unixTimestamp: Math.min(params.expiresAt, now + SEND_VALIDITY_SECONDS)
			};
		}
		return {
			expiration,
			messages: [{
				destination,
				amount: params.sendAll ? { kind: "all" } : {
					kind: "exact",
					nanograms: params.nanograms
				},
				body,
				bounce: params.bounce
			}]
		};
	}
	/**
	* Whether a private comment can reach this recipient, without asking for the key
	*/
	async canEncryptCommentFor(status, destination, recipientPublicKey) {
		const client = await this.getClient(status);
		try {
			await client.resolveEncryptedCommentRecipient({
				recipient: destination,
				recipientPublicKey: await recipientKeyHint(client, destination, recipientPublicKey)
			});
			return true;
		} catch (err) {
			if (String(err?.message).startsWith("encrypted comment is unavailable")) return false;
			throw err;
		}
	}
	async previewSend(status, params) {
		const client = await this.getClient(status);
		const intent = await this.buildIntent(status, params, true);
		let preview;
		try {
			preview = await client.previewSend({ intent });
		} catch (err) {
			if (!PREVIEW_SEQNO_LAG_REGEXP.test(String(err?.message ?? err))) throw err;
			await pause(PREVIEW_SEQNO_RETRY_DELAY);
			preview = await client.previewSend({ intent });
		}
		if (preview.emulation.isIncomplete) throw walletError("WALLET_PREVIEW_INCOMPLETE");
		return preview;
	}
	cancelPreview(status) {
		return this.getClient(status).then((client) => client.cancelSendPreview()).catch(() => {});
	}
	/**
	* Signs and hands the transfer to the server. A gasless transfer is signed twice for the same seqno: the normal
	* external message, and the internal one a relayer can pay for; the server picks one.
	*/
	send(status, params) {
		const operationId = crypto.randomUUID();
		return this.submit(status, operationId, {
			...params,
			draft: getTransferDraft(params)
		}, async (client, submission) => {
			const intent = await this.buildIntent(status, params, false);
			if (!params.gasless) return client.send({
				operationId,
				intent
			});
			const prepared = await client.prepareTransfer({
				operationId,
				intent
			});
			submission.gasless = base64ToBytes(prepared.internalBoc);
			return client.sendBoc({
				operationId,
				signedBoc: prepared.externalBoc,
				seqno: prepared.seqno,
				validUntil: prepared.validUntil
			});
		});
	}
	/**
	* One transfer at a time, Grams or a collectible: `sign` has the engine sign it, and the engine's broadcast goes
	* to the server as `wallet.sendTransfer` (engineHost) with this transfer's recipient and answer.
	*/
	async submit(status, operationId, params, sign) {
		if (this.sending) throw walletError("WALLET_SEND_IN_PROGRESS");
		this.sending = true;
		let settle;
		this.sendSettled = new Promise((resolve) => settle = resolve);
		let answer;
		try {
			const record = await this.getMatchingRecord(status);
			if (!record) throw walletError("WALLET_KEY_MISSING");
			if (record.pendingRotation) throw walletError("WALLET_SEND_IN_PROGRESS");
			const client = await this.getClient(status);
			await client.cancelSendPreview().catch(() => {});
			await client.resolvePending().catch(() => {});
			const submission = {
				userId: params.userId,
				randomId: randomLong(),
				draft: params.draft,
				onAnswer: (value) => {
					answer = value;
					params.onAnswer?.(value);
				}
			};
			let result;
			const draftRandomId = () => submission.rpcStarted && submission.draft ? submission.randomId : void 0;
			try {
				setWalletSubmission(submission);
				result = await sign(client, submission);
			} catch (err) {
				if (answer?.outcome === "accepted") return {
					result: {
						operationId,
						messageHash: void 0,
						signedBoc: submission.signedBoc,
						phase: "submitted"
					},
					answer,
					draftRandomId: draftRandomId()
				};
				if (isSendOutcomeUnknown(err, submission, answer)) return {
					result: {
						operationId,
						messageHash: void 0,
						signedBoc: submission.signedBoc,
						phase: "submissionUnknown"
					},
					answer,
					draftRandomId: draftRandomId()
				};
				throw err;
			}
			const failure = submission.rpcStarted && answer?.outcome !== "accepted" && getGramTransferFailure(result.phase, !!submission.gasless);
			if (failure && submission.draft) this.managers.appMessagesManager.failGramTransferDraft(submission.randomId, failure);
			return {
				result,
				answer,
				draftRandomId: draftRandomId()
			};
		} finally {
			setWalletSubmission(void 0);
			this.sending = false;
			settle();
		}
	}
	/**
	* What the chain says now of the last transfer this device signed, by the engine's journal: nothing is signed, and
	* what it finds is written down, so a conclusion frees the engine for the next transfer. Nothing while this tab is
	* sending, or when this device cannot sign for the served wallet.
	*/
	async resolvePendingSend(status) {
		if (this.sending || !await this.getMatchingRecord(status)) return;
		const client = await this.getClient(status);
		return this.sending ? void 0 : client.resolvePending();
	}
	async buildNftIntent(params) {
		const engine = await this.getEngine();
		const [nftAddress, recipient] = await Promise.all([engine.convertTonAddress(params.nftAddress, {
			kind: "userFriendly",
			bounceable: true,
			testnet: false
		}), engine.convertTonAddress(params.destination, {
			kind: "userFriendly",
			bounceable: params.bounce,
			testnet: false
		})]);
		const comment = params.comment?.trim();
		return {
			nftAddress,
			recipient,
			funding: {
				kind: "exact",
				attachedNanograms: NFT_TRANSFER_ATTACHED_NANOS,
				forwardNanograms: NFT_TRANSFER_FORWARD_NANOS
			},
			payload: comment ? {
				kind: "comment",
				text: comment
			} : { kind: "empty" },
			expiration: { kind: "engineDefault" }
		};
	}
	/**
	* Checks afresh that the wallet still owns the collectible and emulates the whole transfer; what the trace
	* burns is its fee. No key is needed.
	*/
	async previewNftTransfer(status, params) {
		const client = await this.getClient(status);
		const intent = await this.buildNftIntent(params);
		return client.previewNftTransfer({
			operationId: params.operationId,
			intent
		});
	}
	/**
	* Signs a TEP-62 transfer of a collectible and hands it to the server like a Gram transfer, never fee-free.
	*/
	sendNft(status, params) {
		return this.submit(status, params.operationId, params, async (client) => {
			const intent = await this.buildNftIntent(params);
			return client.sendNftTransfer({
				operationId: params.operationId,
				intent
			});
		});
	}
	/**
	* Opens a comment the server returned encrypted. Needs the key, so it may ask for the passcode.
	*/
	async decryptComment(status, transaction, ownAddress) {
		if (!transaction.comment || !transaction.pFlags.comment_encrypted) return transaction.comment;
		const body = serverCommentBody(base64ToBytes(transaction.comment));
		if (!body) throw walletError("WALLET_COMMENT_INVALID");
		const peer = transaction.peer;
		const counterparty = "address" in peer ? peer.address : void 0;
		const sender = transaction.pFlags.incoming ? counterparty : ownAddress;
		if (!sender) throw walletError("WALLET_COMMENT_INVALID");
		return (await this.getClient(status)).decryptComment({
			sender,
			body
		});
	}
	/**
	* Runs `task` with the key that signs for the served wallet now, derived from this device's phrase for this one
	* operation and wiped when the task settles. It must be the key the server serves and the record names: a phrase
	* from before a key update, or one of another wallet, would derive session keys the dApp never saw. Not while a key
	* update is on its way: the key may change under the session the next moment.
	*/
	async withTonConnectSigner(status, task) {
		const state = status.state;
		if (!state) throw walletError("WALLET_NOT_READY");
		const record = await this.getMatchingRecord(status);
		if (!record) throw walletError("WALLET_KEY_MISSING");
		if (record.pendingRotation || record.awaitingServerKey) throw walletError("ROTATION_PENDING");
		await this.ensureUnlocked("deriveTonConnectSessionKey");
		const { deriveSigningSeed, signingPublicKey } = await __vitePreload(async () => {
			const { deriveSigningSeed, signingPublicKey } = await import("./tonConnectCrypto-C-ijOt-x.js").then((n) => n.s);
			return {
				deriveSigningSeed,
				signingPublicKey
			};
		}, __vite__mapDeps([7,1,6,5,3]));
		const phrase = await this.vault.readSecret(record.secretRef);
		let seed;
		try {
			seed = await deriveSigningSeed(phrase);
		} finally {
			phrase.fill(0);
		}
		try {
			const publicKey = bytesToHex(await signingPublicKey(seed));
			if (publicKey !== record.signingKey || publicKey !== bytesToHex(state.public_key)) throw walletError("WALLET_KEY_MISMATCH");
			return await task({
				seed,
				signingKey: publicKey,
				account: () => this.tonConnectAccount(record),
				signProof: (domain, timestamp, payload) => this.signTonConnectProof(record, domain, timestamp, payload)
			});
		} finally {
			seed.fill(0);
		}
	}
	/** `ton_addr`: the address and state of the anchor key, advertised with the key that signs now */
	async tonConnectAccount(record) {
		const account = (await this.getLifecycle()).tonConnectAccount(this.descriptorOf(record));
		return {
			address: account.address,
			network: account.network,
			walletStateInit: account.walletStateInit,
			publicKey: record.signingKey
		};
	}
	/** a dApp's `ton_proof`, signed by the engine with the key that signs now; a proof under any other key is refused */
	async signTonConnectProof(record, domain, timestamp, payload) {
		const signed = await (await this.getLifecycle()).signTonConnectProof({
			descriptor: this.descriptorOf(record),
			domain,
			timestamp,
			payload
		});
		if (bytesToHex(signed.publicKey) !== record.signingKey || signed.signature.length !== 64) throw walletError("WALLET_KEY_MISMATCH");
		return new Uint8Array(signed.signature);
	}
	/** a dApp's transfer, emulated as it would go: its exact messages, expiration and StateInit. No key is needed */
	async previewTonConnect(status, operationId, intent) {
		return (await this.getClient(status)).previewTonConnect({
			operationId,
			intent
		});
	}
	/**
	* Signs a dApp's transfer and hands it to the server like any other (`submit`), to nobody in particular. Its
	* operation id names the request, so the engine's journal never signs it twice.
	*/
	async sendTonConnect(status, operationId, intent) {
		const deadline = intent.expiration.kind === "exact" ? intent.expiration.unixTimestamp : await this.managers.timeManager.getServerTime() + SEND_VALIDITY_SECONDS;
		while (this.sending) {
			const left = deadline - await this.managers.timeManager.getServerTime();
			if (left <= 0) throw walletError("WALLET_LINK_EXPIRED");
			await Promise.race([this.sendSettled, pause(left * 1e3)]);
		}
		return this.submit(status, operationId, {}, (client) => client.send({
			operationId,
			intent
		}));
	}
};
//#endregion
export { walletSession_exports as a, walletError as i, WalletSession as n, withTabsLock as o, isSendOutcomeUnknown as r, NFT_TRANSFER_ATTACHED_NANOS as t };
