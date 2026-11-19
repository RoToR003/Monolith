//# allFunctionsCalledOnLoad
import { n as __exportAll } from "./rolldown-runtime-CwcJO0Gh.js";
import { t as subtle } from "./subtle-BC4BRnF_.js";
import { _ as t, c as ed25519Sign, g as x25519DerivePublic, h as sha256, i as concatBytes, l as ensureCryptoReady, m as randomBytes, s as ed25519KeyPairFromSeed, u as hmacSha512 } from "./crypto-DKvWrOZi.js";
//#region src/lib/wallet/tonConnectCrypto.ts
var tonConnectCrypto_exports = /* @__PURE__ */ __exportAll({
	TON_CONNECT_CHALLENGE_LENGTH: () => 104,
	TonConnectCryptoError: () => TonConnectCryptoError,
	deriveSessionKeyPair: () => deriveSessionKeyPair,
	deriveSessionSecret: () => deriveSessionSecret,
	deriveSigningSeed: () => deriveSigningSeed,
	getSigningHalf: () => getSigningHalf,
	openChallenge: () => openChallenge,
	openFromPeer: () => openFromPeer,
	sealToPeer: () => sealToPeer,
	signDataDigest: () => signDataDigest,
	signDigest: () => signDigest,
	signingPublicKey: () => signingPublicKey
});
/**
* The keys of a TON Connect session relayed by Telegram's server. The engine derives them too, but its WebAssembly
* build exposes no binding for it, so this is the engine's scheme in TypeScript (wallet-engine `crypto.rs`,
* `ton_connect/derived.rs`):
*
* - the signing seed: SLIP-0010 ed25519 on m/44'/607'/0' of the BIP-39 seed of the phrase's signing half (words
*   13-24, or the 12 words of a phrase before its first rotation);
* - the session's X25519 secret: clamp(HMAC-SHA512(HMAC-SHA512(seed, "tonconnect/session/v1"), A || nonce)[0..32]),
*   `A` the dApp's client id and `nonce` the server's per-session salt; its public half `W` is the wallet's client id;
* - every packet is a NaCl box (X25519, XSalsa20-Poly1305): `nonce(24) || box`.
*
* Nothing here is persisted: each operation derives what it needs and wipes it.
*/
var textEncoder = new TextEncoder();
var SESSION_LABEL = textEncoder.encode("tonconnect/session/v1");
var SLIP10_MASTER_KEY = textEncoder.encode("ed25519 seed");
/** m/44'/607'/0', every step hardened */
var TON_ACCOUNT_PATH = [
	44,
	607,
	0
];
var HARDENED_OFFSET = 2147483648;
var BIP39_ROUNDS = 2048;
var HALF_WORDS = 12;
var NONCE_LENGTH = 24;
var KEY_LENGTH = 32;
var CHALLENGE_ANSWER_LENGTH = 32;
var TonConnectCryptoError = class extends Error {
	constructor(..._args) {
		super(..._args);
		this.type = "TONCONNECT_CRYPTO";
	}
};
function fail(message) {
	throw new TonConnectCryptoError(message);
}
/** words 13-24 of a rotated phrase, or the 12 words of one that never rotated */
function getSigningHalf(words) {
	if (words.length === HALF_WORDS) return words;
	if (words.length === 24) return words.slice(HALF_WORDS);
	fail("TON Connect: a phrase has 12 or 24 words");
}
/** the passphraseless BIP-39 seed of 12 words */
async function bip39Seed(words) {
	const password = textEncoder.encode(words.join(" ").normalize("NFKD"));
	try {
		const key = await subtle.importKey("raw", password, "PBKDF2", false, ["deriveBits"]);
		const bits = await subtle.deriveBits({
			name: "PBKDF2",
			salt: textEncoder.encode("mnemonic"),
			iterations: BIP39_ROUNDS,
			hash: "SHA-512"
		}, key, 512);
		return new Uint8Array(bits);
	} finally {
		password.fill(0);
	}
}
/** SLIP-0010 ed25519: the private key of `path` (all hardened) from a BIP-39 seed */
async function slip10Key(seed, path) {
	let node = await hmacSha512(SLIP10_MASTER_KEY, seed);
	for (const index of path) {
		const data = /* @__PURE__ */ new Uint8Array(37);
		data.set(node.subarray(0, KEY_LENGTH), 1);
		new DataView(data.buffer).setUint32(33, (index | HARDENED_OFFSET) >>> 0, false);
		const next = await hmacSha512(node.subarray(KEY_LENGTH), data);
		data.fill(0);
		node.fill(0);
		node = next;
	}
	const key = node.slice(0, KEY_LENGTH);
	node.fill(0);
	return key;
}
/**
* The 32-byte ed25519 seed of the key that signs for the wallet now, from the phrase as the vault keeps it (the
* words joined with spaces). The caller wipes it.
*/
async function deriveSigningSeed(phrase) {
	const seed = await bip39Seed(getSigningHalf(Array.isArray(phrase) ? phrase : new TextDecoder().decode(phrase).trim().split(/\s+/).filter(Boolean)));
	try {
		return await slip10Key(seed, TON_ACCOUNT_PATH);
	} finally {
		seed.fill(0);
	}
}
async function signingPublicKey(seed) {
	await ensureCryptoReady();
	const pair = ed25519KeyPairFromSeed(seed);
	pair.secretKey.fill(0);
	return pair.publicKey;
}
/** `sk = clamp(HMAC-SHA512(HMAC-SHA512(seed, label), A || nonce)[0..32])` */
async function deriveSessionSecret(seed, dappClientId, nonce) {
	if (seed.length !== KEY_LENGTH || dappClientId.length !== KEY_LENGTH || !nonce.length) fail("TON Connect: bad session inputs");
	const prk = await hmacSha512(seed, SESSION_LABEL);
	const input = concatBytes(dappClientId, nonce);
	const okm = await hmacSha512(prk, input);
	prk.fill(0);
	const secret = okm.slice(0, KEY_LENGTH);
	okm.fill(0);
	secret[0] &= 248;
	secret[31] &= 127;
	secret[31] |= 64;
	return secret;
}
/** the session key pair: the X25519 secret and `W`, its public half (the wallet's client id) */
async function deriveSessionKeyPair(seed, dappClientId, nonce) {
	const secretKey = await deriveSessionSecret(seed, dappClientId, nonce);
	await ensureCryptoReady();
	return {
		secretKey,
		publicKey: x25519DerivePublic(secretKey)
	};
}
/** `nonce(24) || box`, sealed by `secretKey` to `peer` */
async function sealToPeer(secretKey, peer, plaintext) {
	await ensureCryptoReady();
	const nonce = randomBytes(NONCE_LENGTH);
	return concatBytes(nonce, t.crypto_box_easy(new Uint8Array(plaintext), nonce, peer, secretKey));
}
/** opens `nonce(24) || box` that `peer` sealed to `secretKey`; throws when it was not */
async function openFromPeer(secretKey, peer, body) {
	if (body.length <= NONCE_LENGTH + t.crypto_box_MACBYTES) fail("TON Connect: the packet is truncated");
	await ensureCryptoReady();
	try {
		return t.crypto_box_open_easy(body.subarray(NONCE_LENGTH), body.subarray(0, NONCE_LENGTH), peer, secretKey);
	} catch (err) {
		fail("TON Connect: the packet does not open");
	}
}
/** the server's challenge to the session key: the 32 bytes it sealed to `W` under an ephemeral key */
async function openChallenge(secretKey, challenge) {
	if (challenge.length !== 104) fail("TON Connect: a challenge is 104 bytes");
	const answer = await openFromPeer(secretKey, challenge.subarray(0, KEY_LENGTH), challenge.subarray(KEY_LENGTH));
	if (answer.length !== CHALLENGE_ANSWER_LENGTH) {
		answer.fill(0);
		fail("TON Connect: a challenge answer is 32 bytes");
	}
	return answer;
}
function uint32(value) {
	const out = /* @__PURE__ */ new Uint8Array(4);
	new DataView(out.buffer).setUint32(0, value, false);
	return out;
}
function int32(value) {
	const out = /* @__PURE__ */ new Uint8Array(4);
	new DataView(out.buffer).setInt32(0, value, false);
	return out;
}
function uint64(value) {
	const out = /* @__PURE__ */ new Uint8Array(8);
	const view = new DataView(out.buffer);
	view.setUint32(0, Math.floor(value / 4294967296), false);
	view.setUint32(4, value >>> 0, false);
	return out;
}
/**
* What a wallet signs for a text or binary `signData`: sha256(ff ff || "ton-connect/sign-data/" || i32be workchain ||
* hash || u32be len(domain) || domain || u64be timestamp || "txt"|"bin" || u32be len(payload) || payload)
*/
function signDataDigest(address, domain, timestamp, payload) {
	const domainBytes = textEncoder.encode(domain);
	const data = payload.type === "text" ? textEncoder.encode(payload.text) : payload.bytes;
	return sha256(concatBytes(new Uint8Array([255, 255]), textEncoder.encode("ton-connect/sign-data/"), int32(address.workchain), address.hash, uint32(domainBytes.length), domainBytes, uint64(timestamp), textEncoder.encode(payload.type === "text" ? "txt" : "bin"), uint32(data.length), data));
}
/** an ed25519 signature of `digest` by the signing seed */
async function signDigest(seed, digest) {
	await ensureCryptoReady();
	const pair = ed25519KeyPairFromSeed(seed);
	try {
		return ed25519Sign(pair.secretKey, digest);
	} finally {
		pair.secretKey.fill(0);
	}
}
//#endregion
export { signDataDigest as a, sealToPeer as i, openChallenge as n, signDigest as o, openFromPeer as r, tonConnectCrypto_exports as s, deriveSessionKeyPair as t };
