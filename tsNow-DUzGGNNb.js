//# allFunctionsCalledOnLoad
import { h as Modes, p as MOUNT_CLASS_TO } from "./userAgent-ByGXcznk.js";
import { c as IS_WORKER, n as logger } from "./logger-7zf0rNYS.js";
import { t as makeError } from "./makeError-CiXxcKtE.js";
import { t as MTProtoMessagePort } from "./mainMessagePort-B60c5YFT.js";
import { a as getCommonDatabaseState, c as deepEqual, i as DeferredIsUsingPasscode, t as EncryptedStorageLayer } from "./encryptedStorageLayer-gN9TBXzg.js";
import { n as deferredPromise } from "./cancellablePromise-bof--dnO.js";
//#region src/lib/localStorage.ts
var _LocalStorageController;
var LocalStorage = class {
	constructor() {
		this.prefix = "";
		this.cache = {};
		this.useStorage = true;
		if (Modes.test) this.prefix = "t_";
	}
	get(key, useCache = true) {
		if (this.cache.hasOwnProperty(key) && useCache) return this.cache[key];
		else if (this.useStorage) {
			let value;
			try {
				value = localStorage.getItem(this.prefix + key);
			} catch (err) {
				this.useStorage = false;
				throw makeError("STORAGE_OFFLINE");
			}
			if (value !== null) try {
				value = JSON.parse(value);
			} catch (err) {}
			else value = void 0;
			return value;
		} else throw makeError("STORAGE_OFFLINE");
	}
	set(obj, onlyLocal = false) {
		let lastError;
		for (const key in obj) if (obj.hasOwnProperty(key)) {
			const value = obj[key];
			this.cache[key] = value;
			if (!onlyLocal) try {
				if (!this.useStorage) throw makeError("STORAGE_OFFLINE");
				const stringified = JSON.stringify(value);
				localStorage.setItem(this.prefix + key, stringified);
			} catch (err) {
				this.useStorage = false;
				lastError = err;
			}
		}
		if (lastError) throw lastError;
	}
	delete(key, saveLocal = false) {
		key = "" + key;
		if (!saveLocal) delete this.cache[key];
		try {
			localStorage.removeItem(this.prefix + key);
		} catch (err) {}
	}
	/**
	* Removes the value only while it is still `value`, read and removed at once: another client (Web A) may have
	* written the key since it was last read
	*/
	deleteIfEqual(key, value) {
		if (deepEqual(this.get(key, false), value)) this.delete(key);
	}
	clear(preserveKeys = []) {
		try {
			const obj = {};
			if (preserveKeys?.length) preserveKeys.forEach((key) => {
				const value = this.get(key);
				if (value !== void 0) obj[key] = value;
			});
			localStorage.clear();
			if (preserveKeys?.length) this.set(obj);
		} catch (err) {}
	}
	toggleStorage(enabled, clearWrite) {
		this.useStorage = enabled;
		if (!clearWrite) return;
		if (enabled) return this.set(this.cache);
	}
};
var LocalStorageController = class LocalStorageController {
	constructor(encryptableKeys = []) {
		this.log = logger("[local-storage-controller]");
		LocalStorageController.STORAGES.push(this);
		this.encryptableKeys = new Set(encryptableKeys);
		if (!IS_WORKER) this.storage = new LocalStorage();
	}
	getEncryptedStorage() {
		return this.encryptedStoragePromise ?? (this.encryptedStoragePromise = this.openEncryptedStorage());
	}
	async openEncryptedStorage() {
		if (this.encryptedStorage) return this.encryptedStorage;
		const encryptedStorage = this.encryptedStorage = EncryptedStorageLayer.getInstance(LocalStorageController.ENCRYPTION_DB, LocalStorageController.ENCRYPTION_DB_STORE_NAME);
		await encryptedStorage.ensureLoaded();
		await this.encryptLeftovers(encryptedStorage);
		return encryptedStorage;
	}
	/**
	* Turning the passcode on moves the encryptable values out of localStorage into the encrypted store
	* (`encryptEncryptable`). Stopped half way - the tab closed, the worker failed - it left them in the clear, where
	* nothing reads them with the passcode on: all of them, when it stopped before the encrypted store was written, or
	* those it had yet to delete. The first open with the passcode on finishes it: values nothing was encrypted from yet
	* are folded in and written first, then whatever the encrypted store keeps as it is goes from localStorage. A value
	* that differs from the encrypted one - by then, not only when it was read - is not this client's (Web A keeps its
	* accounts in the same keys) and stays
	*/
	async encryptLeftovers(encryptedStorage) {
		try {
			const keys = Array.from(this.encryptableKeys);
			const values = await Promise.all(keys.map((key) => this.localStorageProxy("get", key, false)));
			const leftovers = keys.map((key, idx) => [key, values[idx]]).filter(([, value]) => value !== void 0);
			if (!leftovers.length) return;
			this.log.warn("found unencrypted values, encrypting them", leftovers.map(([key]) => key));
			if (!await encryptedStorage.hasStored()) await encryptedStorage.mergeDecrypted(Object.fromEntries(leftovers));
			const encrypted = await encryptedStorage.get(leftovers.map(([key]) => key));
			await Promise.all(leftovers.map(([key], idx) => {
				return encrypted[idx] !== void 0 && this.deleteIfEqual(key, encrypted[idx]);
			}));
		} catch (err) {
			this.log.error("encrypt leftovers error", err);
		}
	}
	async shouldUseEncryptableStorage(key) {
		if (this.encryptableKeys.has(key) === false) return false;
		return DeferredIsUsingPasscode.isUsingPasscode();
	}
	async localStorageProxy(type, ...args) {
		if (IS_WORKER) return MTProtoMessagePort.getInstance().invoke("localStorageProxy", {
			type,
			args
		});
		args = Array.prototype.slice.call(args);
		return this.storage[type].apply(this.storage, args);
	}
	async encryptedStorageProxy(type, ...args) {
		if (!IS_WORKER) return MTProtoMessagePort.getMasterInstance().invoke("localStorageEncryptedProxy", {
			type,
			args
		});
		return (await this.getEncryptedStorage())[type](...args);
	}
	async waitEncryptionToFinish() {
		if (this.encryptionDeferred) await this.encryptionDeferred;
	}
	async get(key, useCache) {
		await this.waitEncryptionToFinish();
		if (await this.shouldUseEncryptableStorage(key)) return (await this.encryptedStorageProxy("get", [key]))[0];
		return this.localStorageProxy("get", key, useCache);
	}
	async set(obj) {
		await this.waitEncryptionToFinish();
		obj = { ...obj };
		const encryptableKeys = Object.keys(obj).filter((key) => this.encryptableKeys.has(key));
		if (encryptableKeys.length && await this.shouldUseEncryptableStorage(encryptableKeys[0])) {
			const values = encryptableKeys.map((key) => obj[key]);
			await this.encryptedStorageProxy("save", encryptableKeys, values);
			encryptableKeys.forEach((key) => {
				delete obj[key];
			});
		}
		if (Object.keys(obj).length) return this.localStorageProxy("set", obj);
	}
	async delete(key) {
		await this.waitEncryptionToFinish();
		if (await this.shouldUseEncryptableStorage(key)) return this.encryptedStorageProxy("delete", key);
		return this.localStorageProxy("delete", key);
	}
	/**
	* Removes the value from localStorage only while it is still `value` (`LocalStorage.deleteIfEqual`): for the keys
	* another client (Web A) writes as well
	*/
	deleteIfEqual(key, value) {
		return this.localStorageProxy("deleteIfEqual", key, value);
	}
	toggleStorage(enabled, clearWrite) {
		return this.localStorageProxy("toggleStorage", enabled, clearWrite);
	}
	warnAboutEncrypting(methodName) {
		if (IS_WORKER) return false;
		this.log.warn(`${methodName} should not be called in a window client, call it only in the MTProto worker`);
		return true;
	}
	async encryptEncryptable() {
		if (this.warnAboutEncrypting("encryptEncryptable")) return;
		this.encryptionDeferred = deferredPromise();
		const encryptableKeys = Array.from(this.encryptableKeys.values());
		const values = await Promise.all(encryptableKeys.map((key) => this.localStorageProxy("get", key)));
		const filteredEntries = encryptableKeys.map((key, idx) => [key, values[idx]]).filter((entry) => entry[1]);
		const data = Object.fromEntries(filteredEntries);
		this.encryptedStorage = EncryptedStorageLayer.getInstance(LocalStorageController.ENCRYPTION_DB, LocalStorageController.ENCRYPTION_DB_STORE_NAME);
		await this.encryptedStorage.loadDecrypted(data);
		await Promise.all(filteredEntries.map(([key]) => this.localStorageProxy("set", key, true)));
		await Promise.all(filteredEntries.map(([key]) => this.localStorageProxy("delete", key)));
		this.encryptionDeferred?.resolve();
		this.encryptionDeferred = void 0;
	}
	/**
	* Reads the encrypted store into memory with the current key, to be awaited before that key is replaced
	*/
	async loadEncryptable() {
		if (this.warnAboutEncrypting("loadEncryptable")) return;
		await (await this.getEncryptedStorage()).ensureLoaded();
	}
	async reEncryptEncryptable() {
		if (this.warnAboutEncrypting("reEncryptEncryptable")) return;
		this.encryptionDeferred = deferredPromise();
		await (await this.getEncryptedStorage()).reEncrypt();
		this.encryptionDeferred?.resolve();
		this.encryptionDeferred = void 0;
	}
	async decryptEncryptable() {
		if (this.warnAboutEncrypting("decryptEncryptable")) return;
		this.encryptionDeferred = deferredPromise();
		const encryptedStorage = await this.getEncryptedStorage();
		const filteredEntries = (await encryptedStorage.getAllEntries()).filter((entry) => this.encryptableKeys.has(entry[0]));
		const data = Object.fromEntries(filteredEntries);
		await this.localStorageProxy("set", data);
		await encryptedStorage.clear();
		this.encryptionDeferred?.resolve();
		this.encryptionDeferred = void 0;
	}
};
_LocalStorageController = LocalStorageController;
_LocalStorageController.STORAGES = [];
_LocalStorageController.ENCRYPTION_DB = getCommonDatabaseState();
_LocalStorageController.ENCRYPTION_DB_STORE_NAME = "localStorage__encrypted";
//#endregion
//#region src/lib/sessionStorage.ts
var sessionStorage = new LocalStorageController([
	"account1",
	"account2",
	"account3",
	"account4",
	"auth_key_fingerprint",
	"user_auth",
	"dc"
]);
MOUNT_CLASS_TO.appStorage = sessionStorage;
//#endregion
//#region src/helpers/tsNow.ts
function tsNow(seconds) {
	const t = Date.now();
	return seconds ? t / 1e3 | 0 : t;
}
//#endregion
export { sessionStorage as n, tsNow as t };
