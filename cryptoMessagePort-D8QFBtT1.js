//# allFunctionsCalledOnLoad
import { p as MOUNT_CLASS_TO } from "./userAgent-ByGXcznk.js";
import { c as IS_WORKER } from "./logger-7zf0rNYS.js";
import { t as superMessagePort_default } from "./superMessagePort-DhrhiTig.js";
import { n as deferredPromise } from "./cancellablePromise-bof--dnO.js";
//#region src/lib/staticUtilityClass.ts
var StaticUtilityClass = class {
	constructor() {
		throw new Error("Cannot instantiate a static utility class");
	}
};
//#endregion
//#region src/helpers/bytes/convertToUint8Array.ts
function convertToUint8Array(bytes) {
	if (bytes instanceof Uint8Array) return bytes;
	else if (typeof bytes === "string") return new TextEncoder().encode(bytes);
	return new Uint8Array(bytes);
}
//#endregion
//#region src/helpers/bytes/bytesCmpConstTime.ts
function bytesCmpConstTime(bytes1, bytes2) {
	const len = bytes1.length;
	if (len !== bytes2.length) return false;
	let diff = 0;
	for (let i = 0; i < len; ++i) diff |= bytes1[i] ^ bytes2[i];
	return diff === 0;
}
//#endregion
//#region src/lib/passcode/keyStore.ts
var _EncryptionKeyStore;
async function exportEncryptionKey(key) {
	return key ? new Uint8Array(await crypto.subtle.exportKey("raw", key)) : null;
}
async function importEncryptionKey(bytes) {
	return bytes ? crypto.subtle.importKey("raw", bytes, { name: "AES-GCM" }, true, ["encrypt", "decrypt"]) : null;
}
var EncryptionKeyStore = class extends StaticUtilityClass {
	static async get() {
		if (this.deferred) await this.deferred;
		return this.key;
	}
	/**
	* Whatever is in memory right now, `null` while nothing has been saved yet
	*/
	static getUndeferred() {
		return this.key;
	}
	static async getAsBase64() {
		const key = await this.get();
		if (!key) return null;
		return btoa(String.fromCharCode(...await exportEncryptionKey(key)));
	}
	static save(key) {
		this.key = key || null;
		this.deferred?.resolve();
		this.deferred = void 0;
	}
	/**
	* Mainly for Service Worker
	*/
	static resetDeferred() {
		this.key = null;
		this.deferred = deferredPromise();
	}
};
_EncryptionKeyStore = EncryptionKeyStore;
_EncryptionKeyStore.key = null;
_EncryptionKeyStore.deferred = deferredPromise();
//#endregion
//#region src/lib/crypto/utils/aesLocal.ts
var IV_LENGTH = 12;
var exportedKeys = /* @__PURE__ */ new WeakMap();
function toLocalDataKeyBytes(key) {
	let bytes = exportedKeys.get(key);
	if (!bytes) exportedKeys.set(key, bytes = exportEncryptionKey(key));
	return bytes;
}
var importedKey;
function toCryptoKey(key) {
	if (!ArrayBuffer.isView(key)) return key;
	if (!importedKey || !bytesCmpConstTime(importedKey.bytes, key)) importedKey = {
		bytes: key,
		key: importEncryptionKey(key)
	};
	return importedKey.key;
}
async function encryptLocalData({ key, data }) {
	const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));
	const encrypted = await crypto.subtle.encrypt({
		name: "AES-GCM",
		iv
	}, await toCryptoKey(key), data);
	const combined = new Uint8Array(iv.length + encrypted.byteLength);
	combined.set(iv, 0);
	combined.set(new Uint8Array(encrypted), iv.length);
	return new superMessagePort_default.TransferableResult(combined, [combined.buffer]);
}
async function decryptLocalData({ key, encryptedData }) {
	const iv = encryptedData.slice(0, IV_LENGTH);
	const ciphertext = encryptedData.slice(IV_LENGTH);
	const decrypted = await crypto.subtle.decrypt({
		name: "AES-GCM",
		iv
	}, await toCryptoKey(key), ciphertext);
	return new superMessagePort_default.TransferableResult(decrypted, [decrypted]);
}
//#endregion
//#region src/lib/crypto/cryptoMessagePort.ts
var CryptoMessagePort = class extends superMessagePort_default {
	constructor() {
		super("CRYPTO");
		this.lastIndex = -1;
	}
	invokeCryptoNew({ method, args, transfer }) {
		const payload = {
			method,
			args
		};
		const listeners = this.listeners["invoke"];
		if (listeners?.size) {
			let result = listeners.values().next().value.callback(payload);
			if (!IS_WORKER && !(result instanceof Promise)) result = Promise.resolve(result);
			return result;
		}
		const sendPortIndex = method === "aes-encrypt" || method === "aes-decrypt" ? this.lastIndex = (this.lastIndex + 1) % this.sendPorts.length : 0;
		const port = this.sendPorts[sendPortIndex];
		const keyArgs = (method === "aes-local-encrypt" || method === "aes-local-decrypt") && args[0];
		if (keyArgs && !ArrayBuffer.isView(keyArgs.key)) return toLocalDataKeyBytes(keyArgs.key).then((key) => {
			return this.invoke("invoke", {
				method,
				args: [{
					...keyArgs,
					key
				}]
			}, void 0, port, transfer);
		});
		return this.invoke("invoke", payload, void 0, port, transfer);
	}
	invokeCrypto(method, ...args) {
		return this.invokeCryptoNew({
			method,
			args
		});
	}
	sendToOnePort(port) {
		this.invokeVoid("port", void 0, this.sendPorts[0], [port]);
	}
};
var cryptoMessagePort = new CryptoMessagePort();
MOUNT_CLASS_TO && (MOUNT_CLASS_TO.cryptoMessagePort = cryptoMessagePort);
//#endregion
export { exportEncryptionKey as a, convertToUint8Array as c, EncryptionKeyStore as i, StaticUtilityClass as l, decryptLocalData as n, importEncryptionKey as o, encryptLocalData as r, bytesCmpConstTime as s, cryptoMessagePort as t };
