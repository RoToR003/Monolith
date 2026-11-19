//# allFunctionsCalledOnLoad
import { f as DEBUG, p as MOUNT_CLASS_TO } from "./userAgent-ByGXcznk.js";
import { c as IS_WORKER, n as logger } from "./logger-7zf0rNYS.js";
import { t as MTProtoMessagePort } from "./mainMessagePort-B60c5YFT.js";
import { n as IDBStorage } from "./idb-BZfkipS3.js";
import { n as deferredPromise } from "./cancellablePromise-bof--dnO.js";
import { c as convertToUint8Array, i as EncryptionKeyStore, l as StaticUtilityClass, t as cryptoMessagePort } from "./cryptoMessagePort-D8QFBtT1.js";
//#region src/helpers/object/deepEqual.ts
/**
* ignores `undefined` properties
* `ignoreKeys` applies only at the top level — it is NOT propagated into nested objects
*/
function deepEqual(x, y, ignoreKeys) {
	const ignoreSet = ignoreKeys && new Set(ignoreKeys);
	const okok = (obj) => Object.keys(obj).filter((key) => obj[key] !== void 0);
	const ok = ignoreKeys ? (obj) => okok(obj).filter((key) => !ignoreSet.has(key)) : okok, tx = typeof x;
	return x && y && tx === "object" && tx === typeof y ? ok(x).length === ok(y).length && ok(x).every((key) => deepEqual(x[key], y[key])) : x === y;
}
//#endregion
//#region src/config/databases/state.ts
var getOldDatabaseState = () => ({
	name: `tweb`,
	version: 7,
	stores: [
		{ name: "session" },
		{ name: "stickerSets" },
		{ name: "users" },
		{ name: "chats" },
		{ name: "dialogs" },
		{ name: "messages" }
	]
});
var getCommonDatabaseState = () => ({
	name: `tweb-common`,
	version: 8,
	stores: [{ name: "session" }, {
		name: "localStorage",
		encryptedName: "localStorage__encrypted"
	}]
});
var getDatabaseState = (accountNumber) => ({
	name: `tweb-account-${accountNumber}`,
	version: 10,
	stores: [
		{
			name: "session",
			encryptedName: "session__encrypted"
		},
		{
			name: "stickerSets",
			encryptedName: "stickerSets__encrypted"
		},
		{
			name: "users",
			encryptedName: "users__encrypted"
		},
		{
			name: "chats",
			encryptedName: "chats__encrypted"
		},
		{
			name: "dialogs",
			encryptedName: "dialogs__encrypted"
		},
		{
			name: "messages",
			encryptedName: "messages__encrypted"
		},
		{
			name: "webapp",
			encryptedName: "webapp__encrypted"
		},
		{
			name: "widgets",
			encryptedName: "widgets__encrypted"
		}
	]
});
MOUNT_CLASS_TO.getDatabaseState = getDatabaseState;
//#endregion
//#region src/lib/passcode/deferredIsUsingPasscode.ts
var _DeferredIsUsingPasscode;
var DeferredIsUsingPasscode = class extends StaticUtilityClass {
	static resolveDeferred(value) {
		this.value = value;
		this.deferred?.resolve();
		this.deferred = void 0;
	}
	static async isUsingPasscode() {
		if (this.deferred) await this.deferred;
		if (typeof this.value !== "boolean") throw new Error("Is using passcode is not boolean WTF?");
		return this.value;
	}
	static isUsingPasscodeUndeferred() {
		return this.value;
	}
	/**
	* Mainly for Service worker
	*/
	static resetDeferred() {
		this.value = void 0;
		this.deferred = deferredPromise();
	}
};
_DeferredIsUsingPasscode = DeferredIsUsingPasscode;
_DeferredIsUsingPasscode.deferred = deferredPromise();
//#endregion
//#region src/helpers/array/toArray.ts
function toArray(value) {
	return Array.isArray(value) ? value : [value];
}
//#endregion
//#region src/helpers/formatBytesPure.ts
function formatBytesPure(bytes, decimals = "auto") {
	if (bytes === 0) return `0 B`;
	const strictDecimals = decimals === "auto";
	const k = 1024;
	const sizes = [
		"B",
		"KB",
		"MB",
		"GB",
		"TB",
		"PB"
	];
	const i = Math.min(Math.floor(Math.log(bytes) / Math.log(k)), sizes.length - 1);
	const _decimals = decimals === "auto" ? Math.max(0, i - 1) : decimals;
	const dm = Math.max(0, _decimals);
	const fixed = (bytes / Math.pow(k, i)).toFixed(dm);
	return [sizes[i], strictDecimals ? fixed : parseFloat(fixed)].reverse().join(" ");
}
//#endregion
//#region src/helpers/schedulers/asyncThrottle.ts
function asyncThrottle(callback, timeoutMs) {
	let lastArgs;
	let timeoutId;
	let wasCalledWhileRunning = false;
	function runAfterTimeout() {
		timeoutId = self.setTimeout(() => {
			wasCalledWhileRunning = false;
			callback(...lastArgs)?.then(() => {
				timeoutId = void 0;
				if (wasCalledWhileRunning) runAfterTimeout();
			});
		}, timeoutMs);
	}
	const result = (...args) => {
		lastArgs = args;
		wasCalledWhileRunning = true;
		if (timeoutId) return;
		runAfterTimeout();
	};
	result.clear = () => {
		self.clearTimeout(timeoutId);
		lastArgs = void 0;
		timeoutId = void 0;
		wasCalledWhileRunning = false;
	};
	return result;
}
//#endregion
//#region src/lib/encryptedStorageLayer.ts
var _EncryptedStorageLayer;
var EncryptedStorageLayer = class EncryptedStorageLayer {
	constructor(db, encryptedStoreName) {
		this.db = db;
		this.encryptedStoreName = encryptedStoreName;
		this.saveToIDB = async () => {
			await this.waitToLoad();
			const startTime = performance.now();
			const encryptedData = await EncryptedStorageLayer.encrypt(this.data);
			if (!encryptedData) {
				await this.storage.delete(EncryptedStorageLayer.STORAGE_KEY);
				return;
			}
			const encryptedDataSize = encryptedData.length;
			const encryptionTime = performance.now();
			await this.storage.save(EncryptedStorageLayer.STORAGE_KEY, encryptedData);
			const endTime = performance.now();
			if (DEBUG && IS_WORKER) {
				/**
				* The time it takes is very random, it might be because of the busy-ness of the crypto worker and the indexed DB
				*
				* Can be a log for 5.5 KB in 8ms, and then another for 40 KB in just 3ms
				* Or a whole MegaByte in just 20ms which is not proportional at all
				*/
				const f = (n) => n.toFixed(2);
				MTProtoMessagePort.getInstance().invokeVoid("log", `[${this.db.name}-${this.encryptedStoreName}] Encrypted and saved ${encryptedDataSize} bytes (${formatBytesPure(encryptedDataSize, 2)}) of data in ${f(endTime - startTime)}ms -- (encrypted in ${f(encryptionTime - startTime)}ms, saved in ${f(endTime - encryptionTime)}ms)`);
			}
		};
		this.saveToIDBThrottled = asyncThrottle(() => this.saveToIDB(), EncryptedStorageLayer.STORAGE_THROTTLE_TIME_MS);
		this.storage = new IDBStorage(db, encryptedStoreName);
		this.log = logger(`encrypted-storage-${encryptedStoreName}`);
	}
	static getInstance(db, encryptedStoreName) {
		const key = this.getStorageKey(db.name, encryptedStoreName);
		if (this.instances.has(key)) return this.instances.get(key);
		const instance = new EncryptedStorageLayer(db, encryptedStoreName);
		this.instances.set(key, instance);
		return instance;
	}
	static getStorageKey(dbName, storeName) {
		return `${dbName}**${storeName}`;
	}
	static async encrypt(data) {
		if (!Object.keys(data).length) return null;
		const key = await EncryptionKeyStore.get();
		const dataAsBuffer = convertToUint8Array(JSON.stringify(data));
		return await cryptoMessagePort.invokeCryptoNew({
			method: "aes-local-encrypt",
			args: [{
				key,
				data: dataAsBuffer
			}],
			transfer: [dataAsBuffer.buffer]
		});
	}
	static async decrypt(data) {
		const key = await EncryptionKeyStore.get();
		const result = await cryptoMessagePort.invokeCryptoNew({
			method: "aes-local-decrypt",
			args: [{
				key,
				encryptedData: data
			}],
			transfer: [data.buffer]
		});
		const decoded = new TextDecoder().decode(result);
		return JSON.parse(decoded);
	}
	loadEncrypted() {
		(async () => {
			this.loadingDataPromise = this.loadFromIDB();
			await this.loadingDataPromise;
			this.loadingDataPromise = void 0;
		})();
	}
	/**
	* Unlike `loadEncrypted`, will not re-read the store when the data is already in memory
	*/
	async ensureLoaded() {
		if (!this.data && !this.loadingDataPromise) this.loadEncrypted();
		await this.waitToLoad();
	}
	/**
	* Whether anything is written in the store: what is in memory is empty as well when that could not be read
	*/
	async hasStored() {
		const stored = await this.storage.get(EncryptedStorageLayer.STORAGE_KEY);
		return stored !== void 0 && stored !== null;
	}
	async loadDecrypted(data) {
		this.log("loading decrypted", Object.keys(data));
		this.data = data;
		await this.saveToIDB();
	}
	/**
	* Folds data that was left in the unencrypted store into this one. \
	* The already encrypted values win, they are the newer ones
	*/
	async mergeDecrypted(data) {
		await this.ensureLoaded();
		this.log("merging decrypted", Object.keys(data));
		this.data = {
			...data,
			...this.data
		};
		await this.saveToIDB();
	}
	waitToLoad() {
		if (this.loadingDataPromise) return this.loadingDataPromise;
	}
	async loadFromIDB() {
		try {
			const storageData = await this.storage.get(EncryptedStorageLayer.STORAGE_KEY);
			if (storageData === null || storageData === void 0) throw null;
			if (!(storageData instanceof Uint8Array)) throw new Error("Stored data in encrypted store is not a Uint8Array");
			const decrypted = await EncryptedStorageLayer.decrypt(storageData);
			this.data = decrypted;
		} catch (error) {
			if (error) this.log(error);
			this.data = {};
		}
		return this.data;
	}
	async reEncrypt() {
		await this.saveToIDB();
	}
	async save(entryName, value) {
		await this.waitToLoad();
		const names = toArray(entryName);
		const values = toArray(value);
		names.forEach((name, idx) => {
			this.data[name] = values[idx];
		});
		this.saveToIDBThrottled();
	}
	async get(entryNames) {
		await this.waitToLoad();
		return entryNames.map((entryName) => this.data[entryName]);
	}
	async getAllEntries() {
		await this.waitToLoad();
		return Object.entries(this.data);
	}
	async getAll() {
		await this.waitToLoad();
		return Object.values(this.data);
	}
	async getAllKeys() {
		await this.waitToLoad();
		return Object.keys(this.data);
	}
	async delete(entryName) {
		await this.waitToLoad();
		toArray(entryName).forEach((name) => {
			delete this.data[name];
		});
		this.saveToIDBThrottled();
	}
	async clear() {
		this.data = {};
		await this.storage.clear();
	}
};
_EncryptedStorageLayer = EncryptedStorageLayer;
_EncryptedStorageLayer.STORAGE_KEY = "data";
_EncryptedStorageLayer.STORAGE_THROTTLE_TIME_MS = 0;
_EncryptedStorageLayer.instances = /* @__PURE__ */ new Map();
//#endregion
export { getCommonDatabaseState as a, deepEqual as c, DeferredIsUsingPasscode as i, asyncThrottle as n, getDatabaseState as o, toArray as r, getOldDatabaseState as s, EncryptedStorageLayer as t };
