//# allFunctionsCalledOnLoad
import { i as __toESM } from "./rolldown-runtime-CwcJO0Gh.js";
import { d as ctx } from "./userAgent-ByGXcznk.js";
import { c as IS_WORKER } from "./logger-7zf0rNYS.js";
import { c as convertToUint8Array, n as decryptLocalData, r as encryptLocalData, t as cryptoMessagePort } from "./cryptoMessagePort-D8QFBtT1.js";
import { t as bufferConcats } from "./bufferConcats-D366Q2m7.js";
import { r as readThreadMemory } from "./memoryStats-CKFzBabU.js";
import { t as bytesToHex } from "./bytesToHex-BQHuRHPP.js";
import { t as bytesFromHex } from "./bytesFromHex-DEB8Alee.js";
import { D as randomBytes, E as nextRandomUint } from "./index-B7axFZql.js";
import { t as require_BigInteger } from "./BigInteger-0a0WsWCs.js";
import { t as gzipUncompress } from "./gzipUncompress-Dn9Dd7Cu.js";
import { t as subtle } from "./subtle-BC4BRnF_.js";
import { t as sha256 } from "./sha256-GjfiuxYO.js";
import { a as bigIntToSigned, c as listenMessagePort, i as bigIntToBytes, n as addPadding, r as bigIntFromBytes, t as bytesXor } from "./bytesXor-CIH3NKOa.js";
//#region src/helpers/bytes/bytesModPow.ts
function bytesModPow(bytes, exp, mod) {
	const bytesBigInt = bigIntFromBytes(bytes);
	const expBigInt = bigIntFromBytes(exp);
	const modBigInt = bigIntFromBytes(mod);
	const resBigInt = bytesBigInt.modPow(expBigInt, modBigInt);
	return bigIntToBytes(resBigInt);
}
//#endregion
//#region src/lib/calls/helpers/getEmojisFingerprint.ts
var import_BigInteger = /* @__PURE__ */ __toESM(require_BigInteger());
function readBigIntFromBytesBE(bytes) {
	const length = bytes.length;
	const bits = length * 8;
	let value = (0, import_BigInteger.default)(bytes[0]).and(127).shiftLeft(bits - 8);
	for (let i = 1; i < length; ++i) {
		const _bits = bits - (i + 1) * 8;
		const b = (0, import_BigInteger.default)(bytes[i]);
		value = value.or(_bits ? b.shiftLeft(_bits) : b);
	}
	return value;
}
var emojis = [
	"1f609",
	"1f60d",
	"1f61b",
	"1f62d",
	"1f631",
	"1f621",
	"1f60e",
	"1f634",
	"1f635",
	"1f608",
	"1f62c",
	"1f607",
	"1f60f",
	"1f46e",
	"1f477",
	"1f482",
	"1f476",
	"1f468",
	"1f469",
	"1f474",
	"1f475",
	"1f63b",
	"1f63d",
	"1f640",
	"1f47a",
	"1f648",
	"1f649",
	"1f64a",
	"1f480",
	"1f47d",
	"1f4a9",
	"1f525",
	"1f4a5",
	"1f4a4",
	"1f442",
	"1f440",
	"1f443",
	"1f445",
	"1f444",
	"1f44d",
	"1f44e",
	"1f44c",
	"1f44a",
	"270c",
	"270b",
	"1f450",
	"1f446",
	"1f447",
	"1f449",
	"1f448",
	"1f64f",
	"1f44f",
	"1f4aa",
	"1f6b6",
	"1f3c3",
	"1f483",
	"1f46b",
	"1f46a",
	"1f46c",
	"1f46d",
	"1f485",
	"1f3a9",
	"1f451",
	"1f452",
	"1f45f",
	"1f45e",
	"1f460",
	"1f455",
	"1f457",
	"1f456",
	"1f459",
	"1f45c",
	"1f453",
	"1f380",
	"1f484",
	"1f49b",
	"1f499",
	"1f49c",
	"1f49a",
	"1f48d",
	"1f48e",
	"1f436",
	"1f43a",
	"1f431",
	"1f42d",
	"1f439",
	"1f430",
	"1f438",
	"1f42f",
	"1f428",
	"1f43b",
	"1f437",
	"1f42e",
	"1f417",
	"1f434",
	"1f411",
	"1f418",
	"1f43c",
	"1f427",
	"1f425",
	"1f414",
	"1f40d",
	"1f422",
	"1f41b",
	"1f41d",
	"1f41c",
	"1f41e",
	"1f40c",
	"1f419",
	"1f41a",
	"1f41f",
	"1f42c",
	"1f40b",
	"1f410",
	"1f40a",
	"1f42b",
	"1f340",
	"1f339",
	"1f33b",
	"1f341",
	"1f33e",
	"1f344",
	"1f335",
	"1f334",
	"1f333",
	"1f31e",
	"1f31a",
	"1f319",
	"1f30e",
	"1f30b",
	"26a1",
	"2614",
	"2744",
	"26c4",
	"1f300",
	"1f308",
	"1f30a",
	"1f393",
	"1f386",
	"1f383",
	"1f47b",
	"1f385",
	"1f384",
	"1f381",
	"1f388",
	"1f52e",
	"1f3a5",
	"1f4f7",
	"1f4bf",
	"1f4bb",
	"260e",
	"1f4e1",
	"1f4fa",
	"1f4fb",
	"1f509",
	"1f514",
	"23f3",
	"23f0",
	"231a",
	"1f512",
	"1f511",
	"1f50e",
	"1f4a1",
	"1f526",
	"1f50c",
	"1f50b",
	"1f6bf",
	"1f6bd",
	"1f527",
	"1f528",
	"1f6aa",
	"1f6ac",
	"1f4a3",
	"1f52b",
	"1f52a",
	"1f48a",
	"1f489",
	"1f4b0",
	"1f4b5",
	"1f4b3",
	"2709",
	"1f4eb",
	"1f4e6",
	"1f4c5",
	"1f4c1",
	"2702",
	"1f4cc",
	"1f4ce",
	"2712",
	"270f",
	"1f4d0",
	"1f4da",
	"1f52c",
	"1f52d",
	"1f3a8",
	"1f3ac",
	"1f3a4",
	"1f3a7",
	"1f3b5",
	"1f3b9",
	"1f3bb",
	"1f3ba",
	"1f3b8",
	"1f47e",
	"1f3ae",
	"1f0cf",
	"1f3b2",
	"1f3af",
	"1f3c8",
	"1f3c0",
	"26bd",
	"26be",
	"1f3be",
	"1f3b1",
	"1f3c9",
	"1f3b3",
	"1f3c1",
	"1f3c7",
	"1f3c6",
	"1f3ca",
	"1f3c4",
	"2615",
	"1f37c",
	"1f37a",
	"1f377",
	"1f374",
	"1f355",
	"1f354",
	"1f35f",
	"1f357",
	"1f371",
	"1f35a",
	"1f35c",
	"1f361",
	"1f373",
	"1f35e",
	"1f369",
	"1f366",
	"1f382",
	"1f370",
	"1f36a",
	"1f36b",
	"1f36d",
	"1f36f",
	"1f34e",
	"1f34f",
	"1f34a",
	"1f34b",
	"1f352",
	"1f347",
	"1f349",
	"1f353",
	"1f351",
	"1f34c",
	"1f350",
	"1f34d",
	"1f346",
	"1f345",
	"1f33d",
	"1f3e1",
	"1f3e5",
	"1f3e6",
	"26ea",
	"1f3f0",
	"26fa",
	"1f3ed",
	"1f5fb",
	"1f5fd",
	"1f3a0",
	"1f3a1",
	"26f2",
	"1f3a2",
	"1f6a2",
	"1f6a4",
	"2693",
	"1f680",
	"2708",
	"1f681",
	"1f682",
	"1f68b",
	"1f68e",
	"1f68c",
	"1f699",
	"1f697",
	"1f695",
	"1f69b",
	"1f6a8",
	"1f694",
	"1f692",
	"1f691",
	"1f6b2",
	"1f6a0",
	"1f69c",
	"1f6a6",
	"26a0",
	"1f6a7",
	"26fd",
	"1f3b0",
	"1f5ff",
	"1f3aa",
	"1f3ad",
	"1f1ef-1f1f5",
	"1f1f0-1f1f7",
	"1f1e9-1f1ea",
	"1f1e8-1f1f3",
	"1f1fa-1f1f8",
	"1f1eb-1f1f7",
	"1f1ea-1f1f8",
	"1f1ee-1f1f9",
	"1f1f7-1f1fa",
	"1f1ec-1f1e7",
	"0031-20e3",
	"0032-20e3",
	"0033-20e3",
	"0034-20e3",
	"0035-20e3",
	"0036-20e3",
	"0037-20e3",
	"0038-20e3",
	"0039-20e3",
	"0030-20e3",
	"1f51f",
	"2757",
	"2753",
	"2665",
	"2666",
	"1f4af",
	"1f517",
	"1f531",
	"1f534",
	"1f535",
	"1f536",
	"1f537"
];
async function getEmojisFingerprint(key, g_a) {
	const arr = key.concat(g_a);
	const hash = await cryptoMessagePort.invokeCrypto("sha256", arr);
	const result = [];
	const emojisLength = emojis.length;
	const kPartSize = 8;
	for (let partOffset = 0; partOffset != hash.length; partOffset += kPartSize) {
		const codePoints = emojis[readBigIntFromBytesBE(hash.slice(partOffset, partOffset + kPartSize)).mod(emojisLength).toJSNumber()];
		result.push(codePoints);
	}
	return result;
}
//#endregion
//#region src/lib/crypto/dhValidation.ts
var KNOWN_DH_PRIME_HEX = "c71caeb9c6b1c9048e6c522f70f13f73980d40238e3e21c14934d037563d930f48198a0aa7c14058229493d22530f4dbfa336f6e0ac925139543aed44cce7c3720fd51f69458705ac68cd4fe6b6b13abdc9746512969328454f18faf8c595f642477fe96bb2a941d5bcd1d4ac8cc49880708fa9b378e3c4f3a9060bee67cf9a4a4a695811051907e162753b56b0f6b410dba74d8a84b2a14b3144e0ef1284754fd17ed950d5965b4b9dd46582db1178d169c6bc465b0d6ff9ca3928fef5b9ae4e418fc15e83ebea0f87fa9ff5eed70050ded2849f47bf959d956850ce929851f0d8115f635b105ee2e4e15d04b2454bf6f4fadf034b10403119cd8e3b92fcc5b";
var DH_PRIME_BITS = 2048;
var TWO_POW = (0, import_BigInteger.default)(2).pow(1984);
var PRIME_PRIMALITY_ITERATIONS = 30;
function isGoodGeneratorForPrime(g, p) {
	switch (g) {
		case 2: return p.mod(8).toJSNumber() === 7;
		case 3: return p.mod(3).toJSNumber() === 2;
		case 4: return true;
		case 5: {
			const m = p.mod(5).toJSNumber();
			return m === 1 || m === 4;
		}
		case 6: {
			const m = p.mod(24).toJSNumber();
			return m === 19 || m === 23;
		}
		case 7: {
			const m = p.mod(7).toJSNumber();
			return m === 3 || m === 5 || m === 6;
		}
		default: return false;
	}
}
function verifyDhPrimeAndGenerator(pBytes, g) {
	if (bytesToHex(pBytes) === KNOWN_DH_PRIME_HEX && (g === 3 || g === 4 || g === 5 || g === 7)) return;
	const p = bigIntFromBytes(pBytes);
	if (p.isNegative() || p.bitLength().notEquals(DH_PRIME_BITS)) throw new Error("[DH] bad prime: wrong bit length");
	if (!isGoodGeneratorForPrime(g, p)) throw new Error("[DH] bad generator g=" + g);
	if (!p.isProbablePrime(PRIME_PRIMALITY_ITERATIONS)) throw new Error("[DH] bad prime: not prime");
	if (!p.subtract(import_BigInteger.default.one).divide(2).isProbablePrime(PRIME_PRIMALITY_ITERATIONS)) throw new Error("[DH] bad prime: (p-1)/2 not prime");
}
function verifyDhPublicValue(xBytes, pBytes) {
	if (xBytes.length > 256) throw new Error("[DH] public value too large");
	const x = bigIntFromBytes(xBytes);
	const p = bigIntFromBytes(pBytes);
	if (x.compare(import_BigInteger.default.one) <= 0) throw new Error("[DH] public value <= 1");
	if (x.compare(p.subtract(import_BigInteger.default.one)) >= 0) throw new Error("[DH] public value >= p - 1");
	if (x.compare(TWO_POW) < 0) throw new Error("[DH] public value < 2^(2048-64)");
	if (x.compare(p.subtract(TWO_POW)) >= 0) throw new Error("[DH] public value > p - 2^(2048-64)");
}
//#endregion
//#region src/lib/crypto/computeDhKey.ts
async function computeDhKey(g_b, a, p) {
	verifyDhPublicValue(g_b, p);
	const key = addPadding(await cryptoMessagePort.invokeCrypto("mod-pow", g_b, a, p), 256, true, true, true);
	const key_fingerprint = (await cryptoMessagePort.invokeCrypto("sha1", key)).slice(-8).reverse();
	return {
		key,
		key_fingerprint: bigIntToSigned(bigIntFromBytes(key_fingerprint)).toString(10)
	};
}
//#endregion
//#region src/lib/crypto/generateDh.ts
var RANDOM_POWER_SIZE = 256;
var MAX_ATTEMPTS = 1e3;
async function generateDh(dhConfig) {
	const { p, g } = dhConfig;
	verifyDhPrimeAndGenerator(p, g);
	const generateA = (p) => {
		const pBigInt = bigIntFromBytes(p);
		for (let attempt = 0; attempt < MAX_ATTEMPTS; ++attempt) {
			const a = randomBytes(RANDOM_POWER_SIZE);
			const aBigInt = bigIntFromBytes(a);
			if (!aBigInt.greater(import_BigInteger.default.one)) continue;
			if (!aBigInt.lesser(pBigInt.subtract(import_BigInteger.default.one))) continue;
			return a;
		}
		throw new Error("[DH] could not generate a suitable secret exponent");
	};
	const gBytes = bytesFromHex(g.toString(16));
	for (let attempt = 0; attempt < MAX_ATTEMPTS; ++attempt) {
		const a = generateA(p);
		const g_a = addPadding(await cryptoMessagePort.invokeCrypto("mod-pow", gBytes, a, p), 256, true, true, true);
		try {
			verifyDhPublicValue(g_a, p);
		} catch (err) {
			continue;
		}
		return {
			a,
			g_a,
			g_a_hash: await cryptoMessagePort.invokeCrypto("sha256", g_a),
			p
		};
	}
	throw new Error("[DH] could not generate a suitable g_a");
}
//#endregion
//#region src/lib/crypto/srp.ts
async function makePasswordHash(password, client_salt, server_salt) {
	let buffer = await cryptoMessagePort.invokeCrypto("sha256", bufferConcats(client_salt, new TextEncoder().encode(password), client_salt));
	buffer = bufferConcats(server_salt, buffer, server_salt);
	buffer = await cryptoMessagePort.invokeCrypto("sha256", buffer);
	let hash = await cryptoMessagePort.invokeCrypto("pbkdf2", new Uint8Array(buffer), client_salt, 1e5);
	hash = bufferConcats(server_salt, hash, server_salt);
	buffer = await cryptoMessagePort.invokeCrypto("sha256", hash);
	return buffer;
}
async function computeSRP(password, state, isNew) {
	const algo = isNew ? state.new_algo : state.current_algo;
	const p = bigIntFromBytes(algo.p);
	const g = (0, import_BigInteger.default)(algo.g);
	verifyDhPrimeAndGenerator(algo.p, algo.g);
	const pw_hash = await makePasswordHash(password, algo.salt1, algo.salt2);
	const x = (0, import_BigInteger.default)(bytesToHex(pw_hash), 16);
	const padArray = function(arr, len) {
		if (!(arr instanceof Uint8Array)) arr = convertToUint8Array(arr);
		return addPadding(arr, len, true, true, true);
	};
	const v = g.modPow(x, p);
	if (isNew) return padArray(bigIntToBytes(v), 256);
	if (state.srp_B.length < 248 || state.srp_B.length > 256) throw new Error("[SRP] invalid srp_B length: " + state.srp_B.length);
	const B = bigIntFromBytes(state.srp_B);
	if (!B.greater(import_BigInteger.default.zero) || !B.lesser(p)) throw new Error("[SRP] srp_B out of range");
	const pForHash = padArray(bigIntToBytes(p), 256);
	const gForHash = padArray(bigIntToBytes(g), 256);
	const b_for_hash = padArray(bigIntToBytes(B), 256);
	const kHash = await cryptoMessagePort.invokeCrypto("sha256", bufferConcats(pForHash, gForHash));
	const k_v = bigIntFromBytes(kHash).multiply(v).mod(p);
	const a = bigIntFromBytes(randomBytes(256));
	const A = g.modPow(a, p);
	const a_for_hash = padArray(bigIntToBytes(A), 256);
	const s = await cryptoMessagePort.invokeCrypto("sha256", bufferConcats(a_for_hash, b_for_hash));
	const u = bigIntFromBytes(s);
	let g_b;
	if (!B.greater(k_v)) g_b = B.add(p);
	else g_b = B;
	g_b = g_b.subtract(k_v).mod(p);
	const ux = u.multiply(x);
	const a_ux = a.add(ux);
	const S = g_b.modPow(a_ux, p);
	const K = await cryptoMessagePort.invokeCrypto("sha256", padArray(bigIntToBytes(S), 256));
	let h1 = await cryptoMessagePort.invokeCrypto("sha256", pForHash);
	const h2 = await cryptoMessagePort.invokeCrypto("sha256", gForHash);
	h1 = bytesXor(h1, h2);
	const buff = bufferConcats(h1, await cryptoMessagePort.invokeCrypto("sha256", algo.salt1), await cryptoMessagePort.invokeCrypto("sha256", algo.salt2), a_for_hash, b_for_hash, K);
	const M1 = await cryptoMessagePort.invokeCrypto("sha256", buff);
	return {
		_: "inputCheckPasswordSRP",
		srp_id: state.srp_id,
		A: new Uint8Array(a_for_hash),
		M1
	};
}
//#endregion
//#region node_modules/.pnpm/@cryptography+aes@0.1.1/node_modules/@cryptography/aes/dist/es/aes.js
var S = /* @__PURE__ */ new Uint8Array(256);
var Si = /* @__PURE__ */ new Uint8Array(256);
var T1 = /* @__PURE__ */ new Uint32Array(256);
var T2 = /* @__PURE__ */ new Uint32Array(256);
var T3 = /* @__PURE__ */ new Uint32Array(256);
var T4 = /* @__PURE__ */ new Uint32Array(256);
var T5 = /* @__PURE__ */ new Uint32Array(256);
var T6 = /* @__PURE__ */ new Uint32Array(256);
var T7 = /* @__PURE__ */ new Uint32Array(256);
var T8 = /* @__PURE__ */ new Uint32Array(256);
function computeTables() {
	var d = /* @__PURE__ */ new Uint8Array(256);
	var t = /* @__PURE__ */ new Uint8Array(256);
	var x2;
	var x4;
	var x8;
	var s;
	var tEnc;
	var tDec;
	var x = 0;
	var xInv = 0;
	for (var i = 0; i < 256; i++) {
		d[i] = i << 1 ^ (i >> 7) * 283;
		t[d[i] ^ i] = i;
	}
	for (; !S[x]; x ^= x2 || 1) {
		s = xInv ^ xInv << 1 ^ xInv << 2 ^ xInv << 3 ^ xInv << 4;
		s = s >> 8 ^ s & 255 ^ 99;
		S[x] = s;
		Si[s] = x;
		x8 = d[x4 = d[x2 = d[x]]];
		tDec = x8 * 16843009 ^ x4 * 65537 ^ x2 * 257 ^ x * 16843008;
		tEnc = d[s] * 257 ^ s * 16843008;
		T1[x] = tEnc = tEnc << 24 ^ tEnc >>> 8;
		T2[x] = tEnc = tEnc << 24 ^ tEnc >>> 8;
		T3[x] = tEnc = tEnc << 24 ^ tEnc >>> 8;
		T4[x] = tEnc = tEnc << 24 ^ tEnc >>> 8;
		T5[s] = tDec = tDec << 24 ^ tDec >>> 8;
		T6[s] = tDec = tDec << 24 ^ tDec >>> 8;
		T7[s] = tDec = tDec << 24 ^ tDec >>> 8;
		T8[s] = tDec = tDec << 24 ^ tDec >>> 8;
		xInv = t[xInv] || 1;
	}
}
/**
* Gets a uint32 from string in big-endian order order
*/
function s2i(str, pos) {
	return str.charCodeAt(pos) << 24 ^ str.charCodeAt(pos + 1) << 16 ^ str.charCodeAt(pos + 2) << 8 ^ str.charCodeAt(pos + 3);
}
/**
* Helper function for transforming string key to Uint32Array
*/
function getWords(key) {
	if (key instanceof Uint32Array) return key;
	if (typeof key === "string") {
		if (key.length % 4 !== 0) for (var i = key.length % 4; i <= 4; i++) key += "\0x00";
		var buf = new Uint32Array(key.length / 4);
		for (var i = 0; i < key.length; i += 4) buf[i / 4] = s2i(key, i);
		return buf;
	}
	if (key instanceof Uint8Array) {
		var buf = new Uint32Array(key.length / 4);
		for (var i = 0; i < key.length; i += 4) buf[i / 4] = key[i] << 24 ^ key[i + 1] << 16 ^ key[i + 2] << 8 ^ key[i + 3];
		return buf;
	}
	throw new Error("Unable to create 32-bit words");
}
function xor(left, right, to) {
	if (to === void 0) to = left;
	for (var i = 0; i < left.length; i++) to[i] = left[i] ^ right[i];
}
computeTables();
/**
* Low-level AES Cipher
*/
var AES = function() {
	function AES(_key) {
		var key = getWords(_key);
		if (key.length !== 4 && key.length !== 6 && key.length !== 8) throw new Error("Invalid key size");
		this.encKey = new Uint32Array(4 * key.length + 28);
		this.decKey = new Uint32Array(4 * key.length + 28);
		this.encKey.set(key);
		var rcon = 1;
		var i = key.length;
		var tmp;
		for (; i < 4 * key.length + 28; i++) {
			tmp = this.encKey[i - 1];
			if (i % key.length === 0 || key.length === 8 && i % key.length === 4) {
				tmp = S[tmp >>> 24] << 24 ^ S[tmp >> 16 & 255] << 16 ^ S[tmp >> 8 & 255] << 8 ^ S[tmp & 255];
				if (i % key.length === 0) {
					tmp = tmp << 8 ^ tmp >>> 24 ^ rcon << 24;
					rcon = rcon << 1 ^ (rcon >> 7) * 283;
				}
			}
			this.encKey[i] = this.encKey[i - key.length] ^ tmp;
		}
		for (var j = 0; i; j++, i--) {
			tmp = this.encKey[j & 3 ? i : i - 4];
			if (i <= 4 || j < 4) this.decKey[j] = tmp;
			else this.decKey[j] = T5[S[tmp >>> 24]] ^ T6[S[tmp >> 16 & 255]] ^ T7[S[tmp >> 8 & 255]] ^ T8[S[tmp & 255]];
		}
	}
	AES.prototype.encrypt = function(_message) {
		var message = getWords(_message);
		var out = /* @__PURE__ */ new Uint32Array(4);
		var a = message[0] ^ this.encKey[0];
		var b = message[1] ^ this.encKey[1];
		var c = message[2] ^ this.encKey[2];
		var d = message[3] ^ this.encKey[3];
		var rounds = this.encKey.length / 4 - 2;
		var k = 4;
		var a2;
		var b2;
		var c2;
		for (var i = 0; i < rounds; i++) {
			a2 = T1[a >>> 24] ^ T2[b >> 16 & 255] ^ T3[c >> 8 & 255] ^ T4[d & 255] ^ this.encKey[k];
			b2 = T1[b >>> 24] ^ T2[c >> 16 & 255] ^ T3[d >> 8 & 255] ^ T4[a & 255] ^ this.encKey[k + 1];
			c2 = T1[c >>> 24] ^ T2[d >> 16 & 255] ^ T3[a >> 8 & 255] ^ T4[b & 255] ^ this.encKey[k + 2];
			d = T1[d >>> 24] ^ T2[a >> 16 & 255] ^ T3[b >> 8 & 255] ^ T4[c & 255] ^ this.encKey[k + 3];
			a = a2;
			b = b2;
			c = c2;
			k += 4;
		}
		for (var i = 0; i < 4; i++) {
			out[i] = S[a >>> 24] << 24 ^ S[b >> 16 & 255] << 16 ^ S[c >> 8 & 255] << 8 ^ S[d & 255] ^ this.encKey[k++];
			a2 = a;
			a = b;
			b = c;
			c = d;
			d = a2;
		}
		return out;
	};
	AES.prototype.decrypt = function(_message) {
		var message = getWords(_message);
		var out = /* @__PURE__ */ new Uint32Array(4);
		var a = message[0] ^ this.decKey[0];
		var b = message[3] ^ this.decKey[1];
		var c = message[2] ^ this.decKey[2];
		var d = message[1] ^ this.decKey[3];
		var rounds = this.decKey.length / 4 - 2;
		var a2;
		var b2;
		var c2;
		var k = 4;
		for (var i = 0; i < rounds; i++) {
			a2 = T5[a >>> 24] ^ T6[b >> 16 & 255] ^ T7[c >> 8 & 255] ^ T8[d & 255] ^ this.decKey[k];
			b2 = T5[b >>> 24] ^ T6[c >> 16 & 255] ^ T7[d >> 8 & 255] ^ T8[a & 255] ^ this.decKey[k + 1];
			c2 = T5[c >>> 24] ^ T6[d >> 16 & 255] ^ T7[a >> 8 & 255] ^ T8[b & 255] ^ this.decKey[k + 2];
			d = T5[d >>> 24] ^ T6[a >> 16 & 255] ^ T7[b >> 8 & 255] ^ T8[c & 255] ^ this.decKey[k + 3];
			a = a2;
			b = b2;
			c = c2;
			k += 4;
		}
		for (var i = 0; i < 4; i++) {
			out[3 & -i] = Si[a >>> 24] << 24 ^ Si[b >> 16 & 255] << 16 ^ Si[c >> 8 & 255] << 8 ^ Si[d & 255] ^ this.decKey[k++];
			a2 = a;
			a = b;
			b = c;
			c = d;
			d = a2;
		}
		return out;
	};
	return AES;
}();
/**
* AES-IGE mode.
*/
var AES_IGE = function() {
	function AES_IGE(key, iv, blockSize) {
		if (blockSize === void 0) blockSize = 16;
		this.key = getWords(key);
		this.iv = getWords(iv);
		this.cipher = new AES(key);
		this.blockSize = blockSize / 4;
	}
	/**
	* Encrypts plain text with AES-IGE mode.
	*/
	AES_IGE.prototype.encrypt = function(message, buf) {
		var text = getWords(message);
		var cipherText = buf || new Uint32Array(text.length);
		var prevX = this.iv.subarray(this.blockSize, this.iv.length);
		var prevY = this.iv.subarray(0, this.blockSize);
		var yXOR = new Uint32Array(this.blockSize);
		for (var i = 0; i < text.length; i += this.blockSize) {
			var x = text.subarray(i, i + this.blockSize);
			xor(x, prevY, yXOR);
			var y = this.cipher.encrypt(yXOR);
			xor(y, prevX);
			prevX = x;
			prevY = y;
			for (var j = i, k = 0; j < text.length && k < 4; j++, k++) cipherText[j] = y[k];
		}
		return cipherText;
	};
	/**
	* Decrypts cipher text with AES-IGE mode.
	*/
	AES_IGE.prototype.decrypt = function(message, buf) {
		var cipherText = getWords(message);
		var text = buf || new Uint32Array(cipherText.length);
		var prevY = this.iv.subarray(this.blockSize, this.iv.length);
		var prevX = this.iv.subarray(0, this.blockSize);
		var yXOR = new Uint32Array(this.blockSize);
		for (var i = 0; i < text.length; i += this.blockSize) {
			var x = cipherText.subarray(i, i + this.blockSize);
			xor(x, prevY, yXOR);
			var y = this.cipher.decrypt(yXOR);
			xor(y, prevX);
			prevX = x;
			prevY = y;
			for (var j = i, k = 0; j < text.length && k < 4; j++, k++) text[j] = y[k];
		}
		return text;
	};
	return AES_IGE;
}();
(function() {
	function AES_IGE(key, counter, blockSize) {
		if (blockSize === void 0) blockSize = 16;
		this.offset = 0;
		this.key = getWords(key);
		this.counter = getWords(counter);
		this.cipher = new AES(key);
		this.blockSize = blockSize / 4;
		if (this.counter.length !== 4) throw new Error("AES-CTR mode counter must be 16 bytes length");
	}
	/**
	* Encrypts plain text with AES-IGE mode.
	*/
	AES_IGE.prototype.encrypt = function(message, buf) {
		var text = getWords(message);
		var cipherText = buf || new Uint32Array(text.length);
		var offset = this.offset;
		for (var i = 0; i < text.length; i += this.blockSize) {
			var x = this.cipher.encrypt(this.counter);
			for (var j = i, k = offset; j < text.length && k < this.blockSize; j++, k++) cipherText[j] = x[k] ^ text[j];
			if (text.length - i >= this.blockSize) this.incrementCounter();
			if (offset) {
				i -= offset;
				offset = 0;
			}
		}
		this.offset = (this.offset + text.length % 4) % 4;
		return cipherText;
	};
	/**
	* Decrypts cipher text with AES-IGE mode.
	*/
	AES_IGE.prototype.decrypt = function(message, buf) {
		return this.encrypt(message, buf);
	};
	AES_IGE.prototype.incrementCounter = function() {
		for (var carry = this.counter.length - 1; carry >= 0; carry--) if (++this.counter[carry] < 4294967295) break;
	};
	return AES_IGE;
})();
//#endregion
//#region src/helpers/bytes/bytesFromWordss.ts
function bytesFromWordss(input) {
	const o = new Uint8Array(input.byteLength);
	for (let i = 0, length = input.length * 4; i < length; ++i) o[i] = input[i >>> 2] >>> 24 - i % 4 * 8 & 255;
	return o;
}
//#endregion
//#region src/helpers/bytes/bytesToWordss.ts
function bytesToWordss(input) {
	const bytes = convertToUint8Array(input);
	const words = [];
	for (let i = 0, len = bytes.length; i < len; ++i) words[i >>> 2] |= bytes[i] << 24 - i % 4 * 8;
	return new Uint32Array(words);
}
//#endregion
//#region src/lib/crypto/utils/aesIGE.ts
function aesSync(bytes, keyBytes, ivBytes, encrypt = true) {
	return bytesFromWordss(new AES_IGE(bytesToWordss(keyBytes), bytesToWordss(ivBytes))[encrypt ? "encrypt" : "decrypt"](bytesToWordss(bytes)));
}
function aesEncryptSync(bytes, keyBytes, ivBytes) {
	return aesSync(addPadding(bytes), keyBytes, ivBytes, true);
}
function aesDecryptSync(bytes, keyBytes, ivBytes) {
	return aesSync(bytes, keyBytes, ivBytes, false);
}
//#endregion
//#region src/helpers/bigInt/bigIntRandom.ts
function bigIntRandom(min, max) {
	return import_BigInteger.default.randBetween(min, max, () => {
		return nextRandomUint(32) / 4294967295;
	});
}
//#endregion
//#region src/lib/crypto/utils/factorize/BrentPollard.ts
var MAX_FACTORIZATION_ITERATIONS = 3e6;
function createIterationBudget() {
	let iterations = 0;
	return () => {
		if (++iterations > MAX_FACTORIZATION_ITERATIONS) throw new Error("FACTORIZATION_BUDGET_EXCEEDED");
	};
}
function BrentPollardFactor(n, spend) {
	const two = import_BigInteger.default[2];
	if (n.remainder(two).isZero()) return two;
	const m = (0, import_BigInteger.default)(1e3);
	let a, x, y, ys, r, q, g;
	do {
		a = bigIntRandom(import_BigInteger.default.one, n.minus(1));
		spend();
	} while (a.isZero() || a.eq(n.minus(two)));
	y = bigIntRandom(import_BigInteger.default.one, n.minus(1));
	r = import_BigInteger.default.one;
	q = import_BigInteger.default.one;
	const bigIntUint64MinusPqPlusOne = (0, import_BigInteger.default)("FFFFFFFFFFFFFFFF", 16).minus(n).plus(1);
	const performY = (y) => {
		y = y.pow(two).mod(n);
		y = y.add(a);
		if (y.lesser(a)) y = y.add(bigIntUint64MinusPqPlusOne);
		y = y.mod(n);
		return y;
	};
	do {
		x = y;
		for (let i = 0; (0, import_BigInteger.default)(i).lesser(r); ++i) {
			y = performY(y);
			spend();
		}
		let k = import_BigInteger.default.zero;
		do {
			ys = y;
			const condition = import_BigInteger.default.min(m, r.minus(k));
			for (let i = 0; (0, import_BigInteger.default)(i).lesser(condition); ++i) {
				y = performY(y);
				q = q.multiply(x.greater(y) ? x.minus(y) : y.minus(x)).mod(n);
				spend();
			}
			g = import_BigInteger.default.gcd(q, n);
			k = k.add(m);
		} while (k.lesser(r) && g.eq(import_BigInteger.default.one));
		r = r.shiftLeft(import_BigInteger.default.one);
	} while (g.eq(import_BigInteger.default.one));
	if (g.eq(n)) do {
		ys = performY(ys);
		g = import_BigInteger.default.gcd(x.minus(ys).abs(), n);
		spend();
	} while (g.eq(import_BigInteger.default.one));
	return g;
}
function primeFactors(pqBytes) {
	const n = bigIntFromBytes(pqBytes);
	const spend = createIterationBudget();
	const factors = [];
	const primes = [];
	let factor = BrentPollardFactor(n, spend);
	factors.push(n.divide(factor));
	factors.push(factor);
	do {
		const m = factors.pop();
		spend();
		if (m.eq(import_BigInteger.default.one)) continue;
		if (m.isPrime(true)) {
			primes.push(m);
			for (let i = 0; i < factors.length; ++i) {
				let k = factors[i];
				if (k.mod(m).isZero()) {
					do {
						k = k.divide(m);
						spend();
					} while (k.mod(m).isZero());
					factors[i] = k;
				}
			}
		} else {
			factor = BrentPollardFactor(m, spend);
			factors.push(m.divide(factor));
			factors.push(factor);
		}
	} while (factors.length);
	return primes;
}
function factorizeBrentPollardPQ(pqBytes) {
	let factors = primeFactors(pqBytes);
	factors.sort((a, b) => a.compare(b));
	if (factors.length > 2) factors = [factors.splice(factors.length - 2, 1)[0], factors.reduce((acc, v) => acc.multiply(v), import_BigInteger.default.one)];
	const p = factors[0], q = factors[factors.length - 1];
	return (p.lesser(q) ? [p, q] : [q, p]).map((b) => bigIntToBytes(b));
}
//#endregion
//#region src/lib/crypto/utils/pbkdf2.ts
async function pbkdf2(buffer, salt, iterations) {
	const importKey = await subtle.importKey("raw", buffer, { name: "PBKDF2" }, false, ["deriveBits"]);
	return subtle.deriveBits({
		name: "PBKDF2",
		salt,
		iterations,
		hash: { name: "SHA-512" }
	}, importKey, 512).then((buffer) => new Uint8Array(buffer));
}
//#endregion
//#region src/lib/crypto/utils/rsa.ts
function rsaEncrypt(bytes, publicKey) {
	return bytesModPow(bytes, bytesFromHex(publicKey.exponent), bytesFromHex(publicKey.modulus));
}
//#endregion
//#region src/lib/crypto/utils/sha1.ts
function sha1(bytes) {
	return subtle.digest("SHA-1", convertToUint8Array(bytes)).then((b) => {
		return new Uint8Array(b);
	});
}
//#endregion
//#region src/lib/crypto/utils/aesCTR.ts
var COUNTER_LENGTH = 16;
var CTR = class {
	constructor(mode, cryptoKey, counter) {
		this.mode = mode;
		this.cryptoKey = cryptoKey;
		this.queue = [];
		this.counter = bigIntFromBytes(counter);
	}
	async update(data) {
		return new Promise((resolve) => {
			this.queue.push({
				data,
				resolve
			});
			this.release();
		});
	}
	async release() {
		if (this.releasing) return;
		this.releasing = true;
		while (this.queue.length) {
			const { data, resolve } = this.queue.shift();
			resolve(await this._update(data));
		}
		this.releasing = false;
	}
	async perform(data) {
		return await subtle[this.mode]({
			name: "AES-CTR",
			counter: addPadding(bigIntToBytes(this.counter), COUNTER_LENGTH, true, true, true),
			length: 128
		}, this.cryptoKey, data);
	}
	async _update(data) {
		let toEncrypt = data;
		let head;
		if (this.leftLength) {
			const leftLength = this.leftLength;
			const leftLength2 = COUNTER_LENGTH - leftLength;
			const left = bufferConcats(new Uint8Array(leftLength), toEncrypt.slice(0, leftLength2));
			const performed = await this.perform(left);
			head = new Uint8Array(performed.slice(leftLength));
			toEncrypt = toEncrypt.slice(leftLength2);
			this.counter = this.counter.add(1);
		}
		const tail = new Uint8Array(await this.perform(toEncrypt));
		const result = head ? bufferConcats(head, tail) : tail;
		let length = toEncrypt.length;
		const leftAfter = length % COUNTER_LENGTH;
		length -= leftAfter;
		const a = length / COUNTER_LENGTH;
		this.counter = this.counter.add(a);
		this.leftLength = leftAfter || void 0;
		return result;
	}
};
//#endregion
//#region src/lib/crypto/aesCtrUtils.ts
var aesCTRs = /* @__PURE__ */ new Map();
var lastCTRId = -1;
async function aesCtrPrepare({ encKey, encIv, decKey, decIv }) {
	const id = ++lastCTRId;
	const promises = [["encrypt", encKey], ["decrypt", decKey]].map(([mode, key]) => {
		return subtle.importKey("raw", key, { name: "AES-CTR" }, false, [mode]);
	});
	const [encCryptoKey, decCryptoKey] = await Promise.all(promises);
	const k = {
		enc: new CTR("encrypt", encCryptoKey, encIv.slice()),
		dec: new CTR("decrypt", decCryptoKey, decIv.slice())
	};
	aesCTRs.set(id, k);
	return id;
}
async function aesCtrProcess({ id, data, operation }) {
	const ctrs = aesCTRs.get(id);
	return await (operation === "encrypt" ? ctrs.enc : ctrs.dec).update(data);
}
function aesCtrDestroy(id) {
	aesCTRs.delete(id);
}
//#endregion
//#region src/lib/crypto/cryptoMethodsRegistry.ts
var cryptoMethodsRegistry = {
	"sha1": sha1,
	"sha256": sha256,
	"pbkdf2": pbkdf2,
	"aes-encrypt": aesEncryptSync,
	"aes-decrypt": aesDecryptSync,
	"rsa-encrypt": rsaEncrypt,
	"factorize": factorizeBrentPollardPQ,
	"mod-pow": bytesModPow,
	"gzipUncompress": gzipUncompress,
	"computeSRP": computeSRP,
	"generate-dh": generateDh,
	"compute-dh-key": computeDhKey,
	"get-emojis-fingerprint": getEmojisFingerprint,
	"aes-ctr-prepare": aesCtrPrepare,
	"aes-ctr-process": aesCtrProcess,
	"aes-ctr-destroy": aesCtrDestroy,
	"aes-local-encrypt": encryptLocalData,
	"aes-local-decrypt": decryptLocalData
};
//#endregion
//#region src/lib/crypto/crypto.worker.ts
console.log("CryptoWorker start");
cryptoMessagePort.addMultipleEventsListeners({
	invoke: ({ method, args }) => {
		return cryptoMethodsRegistry[method](...args);
	},
	terminate: () => {
		ctx.close();
	},
	memoryStats: () => readThreadMemory("crypto"),
	port: (_, __, event) => {
		cryptoMessagePort.attachPort(event.ports[0]);
	}
});
if (IS_WORKER && typeof MessageChannel !== "undefined") listenMessagePort(cryptoMessagePort, (source) => {
	const channel = new MessageChannel();
	cryptoMessagePort.attachPort(channel.port1);
	cryptoMessagePort.invokeVoid("port", void 0, source, [channel.port2]);
});
//#endregion
