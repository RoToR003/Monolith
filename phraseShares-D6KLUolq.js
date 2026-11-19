//# allFunctionsCalledOnLoad
import { a as constantTimeEqual, d as hmacSign, f as importHmacKey, i as concatBytes, l as ensureCryptoReady, m as randomBytes, n as aesCbcEncrypt, o as ed25519GenerateKeyPair, p as int32LeToBytes, r as computeSharedSecret, t as aesCbcDecrypt, u as hmacSha512 } from "./crypto-DKvWrOZi.js";
//#region src/lib/calls/e2e/messageEncryption.ts
var MIN_PADDING = 16;
var textEncoder = new TextEncoder();
var KDF_LABEL_ENCRYPT_DATA = textEncoder.encode("tde2e_encrypt_data");
textEncoder.encode("tde2e_encrypt_header");
function kdfExpand(secret, label) {
	return hmacSha512(secret, label);
}
function calcAesCbcStateFromHash(hash) {
	if (hash.length < 48) throw new Error(`hash too short for AES-CBC state: ${hash.length}`);
	return {
		key: hash.subarray(0, 32),
		iv: hash.subarray(32, 48)
	};
}
async function expandDataSecret(secret) {
	const largeSecret = await kdfExpand(secret, KDF_LABEL_ENCRYPT_DATA);
	const [encryptKey, hmacKey] = await Promise.all([importHmacKey(largeSecret.subarray(0, 32), "SHA-512"), importHmacKey(largeSecret.subarray(32, 64), "SHA-256")]);
	return {
		encryptKey,
		hmacKey
	};
}
function genRandomPrefix(dataSize, minPadding = MIN_PADDING) {
	const paddedSize = (minPadding + 15 + dataSize & -16) - dataSize;
	const prefix = randomBytes(paddedSize);
	prefix[0] = paddedSize;
	return prefix;
}
async function encryptDataCore(prefix, data, secret, extraData) {
	const tail = concatBytes(prefix, data, extraData, int32LeToBytes(extraData.length));
	const padded = tail.subarray(0, prefix.length + data.length);
	const { encryptKey, hmacKey } = await expandDataSecret(secret);
	const largeMsgId = await hmacSign(hmacKey, tail);
	const msgId = largeMsgId.subarray(0, 16);
	const { key, iv } = calcAesCbcStateFromHash(await hmacSign(encryptKey, msgId));
	const encrypted = await aesCbcEncrypt(key, iv, padded);
	const output = new Uint8Array(16 + encrypted.length);
	output.set(msgId);
	output.set(encrypted, 16);
	return {
		output,
		largeMsgId
	};
}
function encryptData(data, secret, extraData = /* @__PURE__ */ new Uint8Array(0)) {
	return encryptDataCore(genRandomPrefix(data.length), data, secret, extraData);
}
async function decryptData(encryptedData, secret, extraData = /* @__PURE__ */ new Uint8Array(0)) {
	if (encryptedData.length < 16 || encryptedData.length % 16 !== 0) throw new Error(`invalid encrypted data length: ${encryptedData.length}`);
	const msgId = encryptedData.subarray(0, 16);
	const ciphertext = encryptedData.subarray(16);
	const { encryptKey, hmacKey } = await expandDataSecret(secret);
	const { key, iv } = calcAesCbcStateFromHash(await hmacSign(encryptKey, msgId));
	const decrypted = await aesCbcDecrypt(key, iv, ciphertext);
	const tail = concatBytes(decrypted, extraData, int32LeToBytes(extraData.length));
	const expectedLargeMsgId = await hmacSign(hmacKey, tail);
	const expectedMsgId = expectedLargeMsgId.subarray(0, 16);
	if (!constantTimeEqual(msgId, expectedMsgId)) throw new Error("MAC verification failed");
	const prefixSize = decrypted[0];
	if (prefixSize < MIN_PADDING || prefixSize > decrypted.length) throw new Error(`invalid padding size: ${prefixSize}`);
	return {
		output: decrypted.subarray(prefixSize),
		largeMsgId: expectedLargeMsgId
	};
}
var PUBLIC_KEY_SIZE = 32;
var DECRYPTED_KEY_PART_ID = 2341526792;
async function generateShareKeyPair() {
	await ensureCryptoReady();
	return ed25519GenerateKeyPair();
}
function serializeDecryptedKeyPart(share) {
	const length = share.length;
	const header = length < 254 ? 1 : 4;
	const total = 4 + header + length;
	const padded = total + (4 - total % 4) % 4;
	const out = new Uint8Array(padded);
	new DataView(out.buffer).setUint32(0, DECRYPTED_KEY_PART_ID, true);
	if (header === 1) out[4] = length;
	else {
		out[4] = 254;
		out[5] = length & 255;
		out[6] = length >> 8 & 255;
		out[7] = length >> 16 & 255;
	}
	out.set(share, 4 + header);
	return out;
}
function parseDecryptedKeyPart(plain) {
	if (!plain.length || plain.length % 4) throw new Error("WALLET_SHARE_INVALID");
	if (new DataView(plain.buffer, plain.byteOffset, plain.byteLength).getUint32(0, true) !== DECRYPTED_KEY_PART_ID) throw new Error("WALLET_SHARE_INVALID");
	let offset = 4, length = plain[offset];
	if (length === 254) {
		length = plain[5] | plain[6] << 8 | plain[7] << 16;
		offset += 4;
	} else offset += 1;
	const end = offset + length;
	if (end + (4 - end % 4) % 4 !== plain.length) throw new Error("WALLET_SHARE_INVALID");
	return plain.slice(offset, end);
}
async function decryptShare(keyPair, data) {
	if (data.length <= PUBLIC_KEY_SIZE) throw new Error("WALLET_SHARE_INVALID");
	await ensureCryptoReady();
	const secret = await computeSharedSecret(keyPair.secretKey, data.subarray(0, PUBLIC_KEY_SIZE));
	const { output } = await decryptData(data.subarray(PUBLIC_KEY_SIZE), secret);
	return parseDecryptedKeyPart(output);
}
async function encryptShare(holderPublicKey, share) {
	if (holderPublicKey.length !== PUBLIC_KEY_SIZE) throw new Error("WALLET_HOLDER_KEY_INVALID");
	await ensureCryptoReady();
	const keyPair = ed25519GenerateKeyPair();
	const secret = await computeSharedSecret(keyPair.secretKey, holderPublicKey);
	const { output } = await encryptData(serializeDecryptedKeyPart(share), secret);
	keyPair.secretKey.fill(0);
	const result = new Uint8Array(PUBLIC_KEY_SIZE + output.length);
	result.set(keyPair.publicKey, 0);
	result.set(output, PUBLIC_KEY_SIZE);
	return result;
}
function combineShares(shares) {
	const length = shares[0]?.length;
	if (!length || shares.some((share) => share.length !== length)) throw new Error("WALLET_SHARE_INVALID");
	const result = new Uint8Array(length);
	for (const share of shares) for (let i = 0; i < length; ++i) result[i] ^= share[i];
	return result;
}
function splitSeed(seed, count) {
	const last = seed.slice();
	const shares = [];
	for (let i = 0; i < count - 1; ++i) {
		const share = randomBytes(seed.length);
		for (let j = 0; j < seed.length; ++j) last[j] ^= share[j];
		shares.push(share);
	}
	shares.push(last);
	return shares;
}
function seedFromWords(words) {
	const joined = new TextEncoder().encode(words.join(" "));
	if (joined.length > 215) throw new Error("WALLET_PHRASE_TOO_LONG");
	const seed = (/* @__PURE__ */ new Uint8Array(215)).fill(32);
	seed.set(joined, 0);
	return seed;
}
function wordsFromSeed(seed) {
	return new TextDecoder().decode(seed).trim().split(/\s+/).filter(Boolean);
}
//#endregion
export { combineShares, decryptShare, encryptShare, generateShareKeyPair, seedFromWords, splitSeed, wordsFromSeed };
