//# allFunctionsCalledOnLoad
import { h as Modes, p as MOUNT_CLASS_TO } from "./userAgent-ByGXcznk.js";
import { i as getAuthKeyFingerprint, t as App } from "./app-BuFf8z8C.js";
import { t as noop } from "./noop-H9NNBLfX.js";
import { t as pause } from "./pause-BSJh-z46.js";
import { n as DC_IDS } from "./constants-DqJIiZwa.js";
import "./rootScope-CZS0lmz8.js";
import { c as IS_WORKER, s as dT } from "./logger-7zf0rNYS.js";
import { n as indexOfAndSplice, t as superMessagePort_default } from "./superMessagePort-DhrhiTig.js";
import { t as makeError } from "./makeError-CiXxcKtE.js";
import { t as MTProtoMessagePort } from "./mainMessagePort-B60c5YFT.js";
import { i as DeferredIsUsingPasscode, o as getDatabaseState, r as toArray, s as getOldDatabaseState } from "./encryptedStorageLayer-gN9TBXzg.js";
import { n as AppStorage } from "./commonStateStorage-CW-poHCa.js";
import { n as deferredPromise } from "./cancellablePromise-bof--dnO.js";
import { i as EncryptionKeyStore, l as StaticUtilityClass, t as cryptoMessagePort } from "./cryptoMessagePort-D8QFBtT1.js";
import { n as sessionStorage, t as tsNow } from "./tsNow-DUzGGNNb.js";
import { t as bytesToHex } from "./bytesToHex-BQHuRHPP.js";
import { t as randomize } from "./randomize-jNNpMVgZ.js";
import { t as HTTPHeaderNames } from "./constants-DLILUQ1j.js";
//#region src/lib/threadedWorkerTypes.ts
var THREADED_WORKER_TYPES = ["crypto", "lottie"];
var THREADED_WORKER_PROTOCOL_QUERY_PARAM = "__tweb_threaded_worker_protocol";
//#endregion
//#region src/lib/passcode/keyHandoff.ts
/**
* Carries the passcode-derived key across the reload an account switch (or a log out
* with several accounts) performs, so the user is not asked for the passcode again in
* the middle of the flow.
*
* It lives in `window.sessionStorage`, NOT in the localStorage-backed `sessionStorage`
* controller: this key decrypts `localStorage__encrypted`, which holds every account's
* MTProto auth keys, so writing it to disk would hand the whole passcode-protected
* store to anyone able to read the browser profile — precisely the adversary the
* passcode exists to stop. `window.sessionStorage` is tab-scoped and dies with the tab,
* so a switch interrupted by a crash or a closed tab cannot leave the key behind.
*/
var HANDOFF_KEY = "encryption_key_handoff";
function writeEncryptionKeyHandoff(base64Key) {
	try {
		window.sessionStorage.setItem(HANDOFF_KEY, base64Key);
	} catch (err) {}
}
async function saveEncryptionKeyForHandoff() {
	const base64Key = await EncryptionKeyStore.getAsBase64();
	if (!base64Key) return;
	if (IS_WORKER) {
		await MTProtoMessagePort.getInstance().invoke("passcodeKeyHandoff", base64Key);
		return;
	}
	writeEncryptionKeyHandoff(base64Key);
}
function takeEncryptionKeyHandoff() {
	let base64Key;
	try {
		base64Key = window.sessionStorage.getItem(HANDOFF_KEY);
		window.sessionStorage.removeItem(HANDOFF_KEY);
	} catch (err) {}
	sessionStorage.delete("encryption_key").catch(() => {});
	return base64Key;
}
//#endregion
//#region src/helpers/object/copy.ts
function copy(obj) {
	if (obj === null || typeof obj !== "object") return obj;
	if (obj instanceof Date) return new Date(obj.getTime());
	if (Array.isArray(obj)) return obj.map((el) => copy(el));
	if (ArrayBuffer.isView(obj)) return obj.slice();
	const clonedObj = new obj.constructor();
	for (var prop in obj) if (obj.hasOwnProperty(prop)) clonedObj[prop] = copy(obj[prop]);
	return clonedObj;
}
//#endregion
//#region src/lib/accounts/accountController.ts
var _AccountController;
var ACCOUNT_NUMBERS = [
	1,
	2,
	3,
	4
];
var LEGACY_KEYS = DC_IDS.map((dcId) => [`dc${dcId}_auth_key`, `dc${dcId}_server_salt`]);
var SESSION_USER_FIELDS = [
	"firstName",
	"lastName",
	"phone",
	"color",
	"isPremium",
	"emojiStatusId"
];
var AccountController = class extends StaticUtilityClass {
	static async getTotalAccounts() {
		return (await this.getAccounts()).length;
	}
	static async getUnencryptedTotalAccounts() {
		return sessionStorage.get("number_of_accounts");
	}
	/**
	* The signed-in accounts, by their slots. Web A keeps its accounts in the same slots and leaves one empty
	* when its account signs out, so they are not always the first ones; and its accounts of the test
	* servers are not K's (see isForeign)
	*/
	static async getAccounts() {
		return (await Promise.all(ACCOUNT_NUMBERS.map(async (accountNumber) => {
			return [accountNumber, await this.get(accountNumber)];
		}))).filter(([, accountData]) => this.isSignedIn(accountData));
	}
	static async getAccountNumbers() {
		return (await this.getAccounts()).map(([accountNumber]) => accountNumber);
	}
	static async getUserIds() {
		return (await this.getAccounts()).map(([, accountData]) => accountData.userId);
	}
	/**
	* The slot a new account goes to: the first one nobody is signed in to here or in Web A
	*/
	static async getFreeAccountNumber() {
		for (const accountNumber of ACCOUNT_NUMBERS) {
			const accountData = await this.get(accountNumber);
			if (!accountData.userId && !accountData.isTest) return accountNumber;
		}
	}
	static hasAuthKey(accountData) {
		return DC_IDS.some((dcId) => accountData[`dc${dcId}_auth_key`]);
	}
	static isSignedIn(accountData) {
		return !!accountData.userId && !this.isForeign(accountData);
	}
	/**
	* An account Web A has on the test servers, in a slot of production ones: this client can't use it, and
	* leaves it as it is
	*/
	static isForeign(accountData) {
		return !!accountData.isTest && !Modes.test;
	}
	/**
	* Who the account is, as Web A writes it to the account's slot from its own user (useMultiaccountInfo): its
	* menu of accounts shows the accounts it has not opened yet from these
	*/
	static getSessionUserFields(user) {
		const emojiStatus = user.emoji_status;
		return {
			firstName: user.first_name,
			lastName: user.last_name,
			phone: user.phone,
			color: user.color?._ === "peerColor" ? user.color.color : void 0,
			isPremium: !!user.pFlags.premium,
			emojiStatusId: emojiStatus?.document_id ? "" + emojiStatus.document_id : void 0
		};
	}
	static isSameSessionUserFields(a, b) {
		return SESSION_USER_FIELDS.every((key) => a[key] === b[key]);
	}
	/**
	* What the slot has otherwise, or only what it lacks: Web A may have written there what is newer
	*/
	static getSessionUserFieldsChanges(fields, slot, onlyMissing) {
		const changes = {};
		for (const key of SESSION_USER_FIELDS) if (fields[key] !== slot[key] && (!onlyMissing || slot[key] === void 0)) changes[key] = fields[key];
		return Object.keys(changes).length ? changes : void 0;
	}
	static async get(accountNumber, updating) {
		const stored = await sessionStorage.get(`account${accountNumber}`);
		const data = { ...stored };
		if (stored?.userId !== void 0) data.userId = +stored.userId;
		if (!updating && !this.isForeign(data) && this.fillMissingData(data)) await this.update(accountNumber, data);
		return data;
	}
	static fillMissingData(data) {
		return [this.fillFingerprint(data), this.fillPushKey(data)].some(Boolean);
	}
	static fillFingerprint(data) {
		if (!data.auth_key_fingerprint) {
			const authKey = data[`dc${App.baseDcId}_auth_key`];
			if (!authKey) return false;
			data.auth_key_fingerprint = authKey ? getAuthKeyFingerprint(authKey) : void 0;
			return true;
		}
		return false;
	}
	static fillPushKey(data) {
		if (!data.push_key && data.userId) {
			data.push_key = bytesToHex(randomize(/* @__PURE__ */ new Uint8Array(256)));
			return true;
		}
		return false;
	}
	/**
	* One at a time per account. `changes` can be a function of the data as it is at that moment, and
	* can return `undefined` to write nothing
	*/
	static update(accountNumber, changes, overrideAll = false) {
		const promise = (this.updates.get(accountNumber) || Promise.resolve()).catch(noop).then(() => this.write(accountNumber, changes, overrideAll));
		this.updates.set(accountNumber, promise);
		return promise;
	}
	/**
	* Settles once the updates of the account asked for so far are written
	*/
	static async whenUpdated(accountNumber) {
		await this.updates.get(accountNumber)?.catch(noop);
	}
	static async write(accountNumber, changes, overrideAll) {
		const prevData = await this.get(accountNumber, true);
		if (this.isForeign(prevData)) return prevData;
		const data = typeof changes === "function" ? changes(prevData) : changes;
		if (!data) return prevData;
		const updatedData = {
			...overrideAll ? {} : prevData,
			...data
		};
		this.fillMissingData(updatedData);
		const stored = { ...updatedData };
		if (updatedData.userId !== void 0) stored.userId = "" + updatedData.userId;
		await sessionStorage.set({ [`account${accountNumber}`]: stored });
		if (accountNumber === 1) await this.updateStorageForLegacy(updatedData);
		(async () => {
			sessionStorage.set({ number_of_accounts: await this.getTotalAccounts() });
		})();
		return updatedData;
	}
	/**
	* Shifts 4 -> 3, 3 -> 2 ... depending on which account you need to delete
	* @param upTo Account to delete basically
	*/
	static async shiftAccounts(upTo) {
		this.shifting = true;
		const slots = [];
		for (let i = upTo; i <= 4; i++) slots.push(i);
		await Promise.all(slots.map((accountNumber) => this.whenUpdated(accountNumber)));
		for (let i = upTo; i <= 4; i++) {
			await sessionStorage.delete(`account${i}`);
			if (i < 4) {
				const toMove = await this.get(i + 1);
				toMove.userId && await this.update(i, toMove, true);
			}
		}
	}
	/**
	* Use `null` when needing to remove the values (e.g. when enabling passcode)
	*/
	static async updateStorageForLegacy(accountData) {
		if (accountData !== null && await DeferredIsUsingPasscode.isUsingPasscode()) return;
		if (accountData === null) accountData = {};
		const obj = {};
		const toClear = [];
		const set = (key, value) => {
			if (value) obj[key] = value;
			else toClear.push(key);
		};
		for (const [authKeyKey, serverSaltKey] of LEGACY_KEYS) {
			set(authKeyKey, accountData[authKeyKey]);
			set(serverSaltKey, accountData[serverSaltKey]);
		}
		accountData["auth_key_fingerprint"] && set("auth_key_fingerprint", accountData["auth_key_fingerprint"]);
		set("user_auth", accountData["userId"] && {
			date: tsNow(true),
			id: accountData.userId,
			dcID: accountData.dcId || 0
		});
		set("dc", accountData.dcId);
		await Promise.all([sessionStorage.set(obj), Promise.all(toClear.map((key) => sessionStorage.delete(key)))]);
	}
	/**
	* Turning the passcode on removes the plain copy of the keys (`updateStorageForLegacy(null)`) once the worker has the
	* accounts encrypted. Turning it on that stopped before then leaves the copy in localStorage, where nothing removes it
	* with the passcode on: a start does. A key goes only while it is the first account's own as the encrypted store
	* keeps it, so the copy is never the only one; another one is Web A's, which signs in on the same origin, and stays
	* with its salt
	*/
	static async removeLegacyCopyBehindPasscode() {
		if (!await DeferredIsUsingPasscode.isUsingPasscode()) return;
		const copied = await Promise.all(LEGACY_KEYS.map((keys) => Promise.all(keys.map((key) => sessionStorage.get(key)))));
		if (!copied.flat().some(Boolean)) return;
		const accountData = await this.get(1);
		let hadCopy = false;
		await Promise.all(LEGACY_KEYS.map(([authKeyKey, serverSaltKey], idx) => {
			const [authKey, serverSalt] = copied[idx];
			if (authKey && authKey !== accountData[authKeyKey]) return;
			hadCopy || (hadCopy = !!authKey);
			return Promise.all([authKey && sessionStorage.deleteIfEqual(authKeyKey, authKey), serverSalt && sessionStorage.deleteIfEqual(serverSaltKey, serverSalt)]);
		}));
		if (hadCopy) await Promise.all([sessionStorage.delete("user_auth"), sessionStorage.delete("dc")]);
	}
};
_AccountController = AccountController;
_AccountController.updates = /* @__PURE__ */ new Map();
MOUNT_CLASS_TO.AccountController = AccountController;
//#endregion
//#region src/helpers/object/isObject.ts
function isObject(object) {
	return typeof object === "object" && object !== null;
}
//#endregion
//#region src/helpers/object/validateInitObject.ts
function validateInitObject(initObject, currentObject, onReplace, previousKey, ignorePaths, path) {
	for (const key in initObject) {
		const _path = path ? `${path}.${key}` : key;
		if (ignorePaths?.has(_path)) continue;
		if (typeof currentObject[key] !== typeof initObject[key]) {
			currentObject[key] = copy(initObject[key]);
			onReplace?.(previousKey || key);
		} else if (isObject(initObject[key])) validateInitObject(initObject[key], currentObject[key], onReplace, previousKey || key, ignorePaths, _path);
	}
}
//#endregion
//#region src/helpers/recordPromise.ts
function recordPromise(promise, description, log = console) {
	if (!(promise instanceof Promise)) return promise;
	const perf = performance.now();
	log.warn(dT(), "start", description);
	promise.then(() => {
		log.warn(dT(), "end", description, performance.now() - perf);
	});
	const timeout = setTimeout(() => {
		log.warn(dT(), "timeout", description, performance.now() - perf);
	}, 1e3);
	promise.finally(() => {
		clearTimeout(timeout);
	});
	return promise;
}
function recordPromiseBound(log) {
	return (...args) => {
		return recordPromise(...args, log);
	};
}
//#endregion
//#region src/lib/stateStorage.ts
var StateStorage = class extends AppStorage {
	constructor(accountNumber) {
		const db = accountNumber === "old" ? getOldDatabaseState() : getDatabaseState(accountNumber);
		super(db, "session");
	}
};
//#endregion
//#region src/lib/appManagers/utils/storages/createStorages.ts
function createStorages(accountNumber) {
	const names = [
		"users",
		"chats",
		"dialogs"
	];
	const storages = {};
	for (const name of names) storages[name] = new AppStorage(accountNumber === void 0 ? getOldDatabaseState() : getDatabaseState(accountNumber), name);
	return storages;
}
//#endregion
//#region src/helpers/blob/blobSafeMimeType.ts
function blobSafeMimeType(mimeType) {
	if ([
		"image/jpeg",
		"image/png",
		"image/gif",
		"image/svg+xml",
		"image/webp",
		"image/bmp",
		"image/avif",
		"image/jxl",
		"image/heic",
		"video/mp4",
		"video/webm",
		"video/quicktime",
		"audio/ogg",
		"audio/mpeg",
		"audio/mp4",
		"audio/wav",
		"application/json",
		"application/pdf"
	].indexOf(mimeType) === -1) return "application/octet-stream";
	return mimeType;
}
//#endregion
//#region src/helpers/blob/blobConstruct.ts
function blobConstruct(blobParts, mimeType = "") {
	blobParts = toArray(blobParts);
	const safeMimeType = blobSafeMimeType(mimeType);
	return new Blob(blobParts, { type: safeMimeType });
}
//#endregion
//#region src/helpers/blob/readBlobAs.ts
function readBlobAs(blob, method) {
	return new Promise((resolve) => {
		const reader = new FileReader();
		reader.addEventListener("loadend", (e) => {
			resolve(e.target.result);
		});
		reader[method](blob);
	});
}
//#endregion
//#region src/helpers/blob/readBlobAsArrayBuffer.ts
function readBlobAsArrayBuffer(blob) {
	return readBlobAs(blob, "readAsArrayBuffer");
}
//#endregion
//#region src/helpers/blob/readBlobAsUint8Array.ts
function readBlobAsUint8Array(blob) {
	return readBlobAsArrayBuffer(blob).then((buffer) => new Uint8Array(buffer));
}
//#endregion
//#region src/lib/files/memoryWriter.ts
var liveWriters = /* @__PURE__ */ new Set();
var collected = new FinalizationRegistry((ref) => liveWriters.delete(ref));
function getMemoryWriterStats() {
	let writers = 0, bytes = 0;
	for (const ref of liveWriters) {
		const writer = ref.deref();
		if (!writer) continue;
		++writers;
		bytes += writer.byteLength;
	}
	return {
		writers,
		bytes
	};
}
var MemoryWriter = class {
	constructor(mimeType, size, saveFileCallback) {
		this.mimeType = mimeType;
		this.size = size;
		this.saveFileCallback = saveFileCallback;
		this.bytes = new Uint8Array(size);
		const ref = new WeakRef(this);
		liveWriters.add(ref);
		collected.register(this, ref);
	}
	get byteLength() {
		return this.bytes.byteLength;
	}
	async write(part, offset) {
		const endOffset = offset + part.byteLength;
		if (endOffset > this.bytes.byteLength) {
			const newBytes = new Uint8Array(endOffset);
			newBytes.set(this.bytes, 0);
			this.bytes = newBytes;
		}
		this.bytes.set(part, offset);
	}
	truncate() {
		this.bytes = /* @__PURE__ */ new Uint8Array();
	}
	trim(size) {
		this.bytes = this.bytes.slice(0, size);
	}
	finalize(saveToStorage = true) {
		const blob = blobConstruct(this.bytes, this.mimeType);
		if (saveToStorage && this.saveFileCallback) this.saveFileCallback(blob);
		return blob;
	}
	getParts() {
		return this.bytes;
	}
	replaceParts(parts) {
		this.bytes = parts;
	}
};
//#endregion
//#region src/lib/files/cacheStorage.ts
var _CacheStorageController;
var cacheStorageDbConfig = {
	cachedAssets: { encryptable: false },
	cachedBackgrounds: { encryptable: false },
	cachedFiles: { encryptable: true },
	cachedStreamChunks: { encryptable: true },
	cachedHlsQualityFiles: { encryptable: true },
	cachedHlsStreamChunks: { encryptable: true }
};
var defaultOperationTimeout = 15e3;
var minimalBlockingIterationTotalTimeout = defaultOperationTimeout;
var minimalBlockingAllowedTimePerBulk = 4;
var ENTRY_NAME_ESCAPED = /^\/|(^|\/)\.|[^A-Za-z0-9\-_.~!$&'()*+,;=:@/?\u0080-\uD7FF\uE000-\u{10FFFF}]/gu;
function getEntryRequestPath(entryName) {
	return "/" + entryName.replace(ENTRY_NAME_ESCAPED, (char, segmentStart) => {
		if (segmentStart !== void 0) return segmentStart + "%u002E";
		const code = char.charCodeAt(0);
		return code < 128 ? "%" + code.toString(16).toUpperCase().padStart(2, "0") : "%u" + code.toString(16).toUpperCase();
	});
}
var CacheStorageController = class CacheStorageController {
	static getStats() {
		return {
			storages: this.STORAGES.length,
			inFlightOperations: this.inFlightOperations,
			inFlightSaveBytes: this.inFlightSaveBytes
		};
	}
	constructor(dbName) {
		this.dbName = dbName;
		this.useStorage = true;
		if (Modes.test) this.dbName += "_test";
		if (CacheStorageController.STORAGES.length) this.useStorage = CacheStorageController.STORAGES[0].useStorage;
		this.config = Object.entries(cacheStorageDbConfig).find(([name]) => name === dbName)?.[1];
		this.openDatabase();
		CacheStorageController.STORAGES.push(this);
	}
	forget() {
		CacheStorageController.STORAGES = CacheStorageController.STORAGES.filter((storage) => storage !== this);
	}
	get isEncryptable() {
		return this.config?.encryptable;
	}
	static async encrypt(blob) {
		const key = await EncryptionKeyStore.get();
		const dataAsBuffer = await readBlobAsUint8Array(blob);
		const type = blob.type;
		const result = await cryptoMessagePort.invokeCryptoNew({
			method: "aes-local-encrypt",
			args: [{
				key,
				data: dataAsBuffer
			}],
			transfer: [dataAsBuffer.buffer]
		});
		return new Blob([result], { type });
	}
	static async decrypt(blob) {
		const key = await EncryptionKeyStore.get();
		const dataAsBuffer = await readBlobAsUint8Array(blob);
		const type = blob.type;
		const result = await cryptoMessagePort.invokeCryptoNew({
			method: "aes-local-decrypt",
			args: [{
				key,
				encryptedData: dataAsBuffer
			}],
			transfer: [dataAsBuffer.buffer]
		});
		return new Blob([result], { type });
	}
	getDisabledPromises() {
		return [CacheStorageController.disabledPromise, CacheStorageController.disabledPromisesByKey.get(this.dbName)].filter(Boolean);
	}
	async waitToEnable() {
		let disabledPromises;
		while ((disabledPromises = this.getDisabledPromises()).length) await Promise.all(disabledPromises);
	}
	openDatabase() {
		return this.openDbPromise ?? (this.openDbPromise = caches.open(this.dbName));
	}
	delete(entryName) {
		return this.timeoutOperation((cache) => cache.delete(getEntryRequestPath(entryName)));
	}
	/**
	* Requires reconnection in order to save to disc again
	*/
	deleteAll() {
		this.openDbPromise = void 0;
		return caches.delete(this.dbName);
	}
	reset() {
		this.openDbPromise = void 0;
	}
	async minimalBlockingIterateResponses(callback) {
		await this.waitToEnable();
		const batchSize = 10;
		await this.timeoutOperation(async (cache) => {
			const allKeys = await cache.keys();
			let prevTime = performance.now();
			for (let i = 0; i < allKeys.length; i += batchSize) {
				const slice = allKeys.slice(i, i + batchSize);
				await Promise.all(slice.map(async (key) => {
					const callbackResult = callback({
						request: key,
						response: await cache.match(key),
						cache
					});
					if (callbackResult instanceof Promise) await callbackResult;
				}));
				const now = performance.now();
				if (now - prevTime > minimalBlockingAllowedTimePerBulk) {
					await pause(0);
					prevTime = now;
				}
			}
		}, minimalBlockingIterationTotalTimeout);
	}
	async has(entryName) {
		return !!await this.timeoutOperation((cache) => cache.match(getEntryRequestPath(entryName)));
	}
	async get(entryName) {
		await this.waitToEnable();
		const response = await this.timeoutOperation((cache) => cache.match(getEntryRequestPath(entryName)));
		if (!response) return void 0;
		if (this.config?.encryptable && await DeferredIsUsingPasscode.isUsingPasscode()) return new Response(await CacheStorageController.decrypt(await response.blob()), {
			headers: response.headers,
			status: response.status,
			statusText: response.statusText
		});
		return response;
	}
	async save({ entryName, response, size, contentType }) {
		await this.waitToEnable();
		let result = new Response(response.body, {
			headers: {
				...Object.fromEntries(response.headers),
				[HTTPHeaderNames.cachedTime]: Math.floor(Date.now() / 1e3 | 0).toString(),
				[HTTPHeaderNames.contentLength]: size.toString(),
				...contentType ? { [HTTPHeaderNames.contentType]: contentType } : {}
			},
			status: response.status,
			statusText: response.statusText
		});
		if (this.config?.encryptable && await DeferredIsUsingPasscode.isUsingPasscode()) result = new Response(await CacheStorageController.encrypt(await response.blob()), {
			headers: result.headers,
			status: result.status,
			statusText: result.statusText
		});
		return this.timeoutOperation((cache) => cache.put(getEntryRequestPath(entryName), result), void 0, size);
	}
	getFile(fileName, method = "blob") {
		return this.get(fileName).then((response) => {
			if (!response) throw makeError("NO_ENTRY_FOUND");
			return response[method]();
		});
	}
	saveFile(fileName, blob) {
		if (!(blob instanceof Blob)) blob = blobConstruct(blob);
		const response = new Response(blob);
		return this.save({
			entryName: fileName,
			response,
			size: blob.size
		}).then(() => blob);
	}
	timeoutOperation(callback, operationTimeout = defaultOperationTimeout, bytes = 0) {
		if (!this.useStorage) return Promise.reject(makeError("STORAGE_OFFLINE"));
		++CacheStorageController.inFlightOperations;
		CacheStorageController.inFlightSaveBytes += bytes;
		return new Promise(async (resolve, reject) => {
			let rejected = false;
			const timeout = setTimeout(() => {
				reject();
				rejected = true;
			}, operationTimeout);
			try {
				const cache = await this.openDatabase();
				if (!cache) {
					this.useStorage = false;
					this.openDbPromise = void 0;
					throw "no cache?";
				}
				const res = await callback(cache);
				if (rejected) return;
				resolve(res);
			} catch (err) {
				reject(err);
			} finally {
				--CacheStorageController.inFlightOperations;
				CacheStorageController.inFlightSaveBytes -= bytes;
				clearTimeout(timeout);
			}
		});
	}
	prepareWriting(fileName, fileSize, mimeType) {
		return {
			deferred: deferredPromise(),
			getWriter: () => {
				return new MemoryWriter(mimeType, fileSize, (blob) => {
					return this.saveFile(fileName, blob).catch(() => blob);
				});
			}
		};
	}
	static toggleStorage(enabled, _clearWrite) {
		this.STORAGES.forEach((storage) => {
			storage.useStorage = enabled;
		});
		return Promise.resolve();
	}
	static async deleteAllStorages() {
		const storageNames = Object.keys(cacheStorageDbConfig);
		await Promise.all(storageNames.map(async (storageName) => {
			await new CacheStorageController(storageName).deleteAll();
		}));
	}
	static temporarilyToggle(enabled) {
		if (enabled) {
			this.disabledPromise?.resolve();
			this.disabledPromise = void 0;
		} else if (!this.disabledPromise) this.disabledPromise = deferredPromise();
	}
	static temporarilyToggleByName(name, enabled) {
		const hadPromise = this.disabledPromisesByKey.has(name);
		if (enabled) {
			this.disabledPromisesByKey.get(name)?.resolve();
			this.disabledPromisesByKey.delete(name);
		} else if (!hadPromise) this.disabledPromisesByKey.set(name, deferredPromise());
	}
	static temporarilyToggleByNames(names, enabled) {
		names.forEach((name) => this.temporarilyToggleByName(name, enabled));
	}
	static async clearEncryptableStorages() {
		const encryptableStorageNames = Object.entries(cacheStorageDbConfig).filter(([, { encryptable }]) => encryptable).map(([name]) => name);
		await this.clearStoragesByNames(encryptableStorageNames);
	}
	static async clearStoragesByNames(names) {
		await Promise.all(names.map(async (storageName) => {
			const storage = new CacheStorageController(storageName);
			try {
				await storage.deleteAll();
			} catch (e) {
				console.error(e);
			} finally {
				storage.forget();
			}
		}));
	}
	static getOpenEncryptableStorages() {
		return this.STORAGES.filter((storage) => storage.isEncryptable);
	}
	static resetOpenEncryptableCacheStorages() {
		this.getOpenEncryptableStorages().forEach((storage) => storage.reset());
	}
	static getOpenStoragesByNames(names) {
		return this.STORAGES.filter((storage) => names.includes(storage.dbName));
	}
	static async resetOpenStoragesByNames(names) {
		this.getOpenStoragesByNames(names).forEach((storage) => storage.reset());
	}
};
_CacheStorageController = CacheStorageController;
_CacheStorageController.STORAGES = [];
_CacheStorageController.disabledPromisesByKey = /* @__PURE__ */ new Map();
_CacheStorageController.inFlightOperations = 0;
_CacheStorageController.inFlightSaveBytes = 0;
//#endregion
//#region src/helpers/toggleStorages.ts
function toggleStorages(enabled, clearWrite) {
	return Promise.all([
		AppStorage.toggleStorage(enabled, clearWrite),
		CacheStorageController.toggleStorage(enabled, clearWrite),
		sessionStorage.toggleStorage(enabled, clearWrite)
	]).then(noop, noop);
}
//#endregion
//#region src/lib/serviceWorker/serviceMessagePort.ts
var ServiceMessagePort = class extends superMessagePort_default {
	constructor() {
		super("SERVICE");
		MOUNT_CLASS_TO && (MOUNT_CLASS_TO.serviceMessagePort = this);
	}
};
//#endregion
//#region src/helpers/fileName.ts
var FILENAME_JOINER = "_";
function getFileNameByLocation(location, options) {
	const fileName = "";
	const ext = fileName[-1] || "";
	let str;
	switch (location._) {
		case "inputPhotoFileLocation":
			str = [
				"photo",
				fileName[0],
				location.id,
				location.thumb_size
			].filter(Boolean).join(FILENAME_JOINER);
			break;
		case "inputDocumentFileLocation":
			str = [
				"document",
				fileName[0],
				location.id,
				location.thumb_size
			].filter(Boolean).join(FILENAME_JOINER);
			break;
		case "inputPeerPhotoFileLocation":
			str = [
				"peerPhoto",
				location.photo_id,
				location.pFlags.big ? "big" : "small"
			].join(FILENAME_JOINER);
			break;
		case "inputStickerSetThumb":
			str = [
				"stickerSetThumb",
				location.stickerset.id || location.stickerset.short_name || location.stickerset.emoticon || location.stickerset._,
				location.thumb_version
			].join(FILENAME_JOINER);
			break;
		case "inputFileLocation":
			str = [location.volume_id, location.local_id].join(FILENAME_JOINER);
			break;
		case "inputWebFileLocation":
			str = ["webFile", location.url].join(FILENAME_JOINER);
			break;
		case "inputWebFileGeoPointLocation": {
			const geoPoint = location.geo_point;
			str = [
				"geoPoint",
				geoPoint.lat,
				geoPoint.long,
				location.w,
				location.h,
				location.zoom,
				location.scale
			].join(FILENAME_JOINER);
			break;
		}
		default:
			console.error("Unrecognized location:", location);
			str = "";
	}
	return str + (options?.downloadId ? "_download" : "") + (ext ? "." + ext : ext);
}
function getFileURL(type, options) {
	const encoded = encodeURIComponent(JSON.stringify(options));
	return type + "/" + encoded;
}
//#endregion
//#region src/lib/appManagers/utils/webFiles/isWebFileLocation.ts
function isWebFileLocation(location) {
	return location?._.includes("inputWebFile");
}
//#endregion
//#region src/lib/storages/utils/thumbs/getThumbKey.ts
function getThumbKey(media) {
	if (isWebFileLocation(media)) return getFileNameByLocation(media);
	return media._ + (media.id ?? media.url);
}
//#endregion
//#region src/lib/storages/utils/thumbs/generateEmptyThumb.ts
function generateEmptyThumb(type) {
	return {
		downloaded: 0,
		url: "",
		type
	};
}
//#endregion
//#region src/lib/storages/utils/thumbs/getStickerThumbKey.ts
function getStickerThumbKey(docId, toneIndex) {
	return docId + (toneIndex !== void 0 ? "-" + toneIndex : "");
}
//#endregion
//#region src/helpers/callbackify.ts
function callbackify(smth, callback) {
	if (smth instanceof Promise) return smth.then(callback);
	else return callback(smth);
}
//#endregion
//#region src/lib/appManagers/utils/messageId/isLegacyMessageId.ts
function isLegacyMessageId(messageId) {
	return typeof messageId === "number" && messageId < 4294967296;
}
//#endregion
//#region src/lib/appManagers/utils/messages/isTempId.ts
function isTempId(id) {
	return id > Math.floor(id);
}
//#endregion
//#region src/lib/appManagers/utils/messageId/isGlobalHistoryMessageId.ts
/**
* A server id of a private chat or a basic group names one message account-wide, so such a message is kept in the
* global history storage as well and found there by its id alone. A temporary id (a pending message's: the id it
* follows plus a fraction) is only its chat's own - two empty chats both start at 0.0001 - so its message stays in
* its chat's storage and is looked up there.
*/
function isGlobalHistoryMessageId(messageId) {
	return isLegacyMessageId(messageId) && !isTempId(messageId);
}
//#endregion
//#region src/helpers/object/getObjectKeysAndSort.ts
function getObjectKeysAndSort(object, sort = "asc") {
	if (!object) return [];
	const ids = object instanceof Map ? [...object.keys()] : Object.keys(object).map((i) => +i);
	if (sort === "asc") return ids.sort((a, b) => a - b);
	else return ids.sort((a, b) => b - a);
}
//#endregion
//#region src/helpers/string/limitSymbols.ts
function limitSymbols(str, length, limitFrom = length + 10) {
	str = str.trim();
	if (str.length > limitFrom) str = str.slice(0, length) + "...";
	return str;
}
//#endregion
//#region src/lib/appManagers/utils/peers/getPeerActiveUsernames.ts
function getPeerActiveUsernames(peer) {
	if (!peer) return [];
	const usernames = peer.usernames;
	if (usernames) return usernames.filter((username) => username.pFlags.active).map((username) => username.username);
	return peer.username ? [peer.username] : [];
}
//#endregion
//#region src/helpers/blob/readBlobAsDataURL.ts
function readBlobAsDataURL(blob) {
	return readBlobAs(blob, "readAsDataURL");
}
//#endregion
//#region src/helpers/long/compareLong.ts
function compareLong(str1, str2) {
	const str1Length = str1.length;
	if (str1Length !== str2.length) {
		const diff = str1Length - str2.length;
		return diff < 0 ? -1 : diff > 0 ? 1 : 0;
	}
	const maxPartLength = 15;
	for (let i = 0; i < str1Length; i += maxPartLength) {
		const diff = +str1.slice(i, i + maxPartLength) - +str2.slice(i, i + maxPartLength);
		if (diff) return diff;
	}
	return 0;
}
//#endregion
//#region src/helpers/compareValue.ts
function compareValue(val1, val2) {
	if (val1.toExponential) {
		const diff = val1 - val2;
		return diff < 0 ? -1 : diff > 0 ? 1 : 0;
	}
	return compareLong(val1, val2);
}
//#endregion
//#region src/helpers/slicedArray.ts
var SliceEnd = /* @__PURE__ */ function(SliceEnd) {
	SliceEnd[SliceEnd["None"] = 0] = "None";
	SliceEnd[SliceEnd["Top"] = 1] = "Top";
	SliceEnd[SliceEnd["Bottom"] = 2] = "Bottom";
	SliceEnd[SliceEnd["Both"] = 3] = "Both";
	return SliceEnd;
}({});
var SlicedArray = class SlicedArray {
	constructor() {
		this.sliceConstructor = SlicedArray.getSliceConstructor(this);
		this.compareValue ?? (this.compareValue = compareValue);
		const first = this.constructSlice();
		this.slices = [first];
	}
	static getSliceConstructor(slicedArray) {
		return class Slice extends Array {
			constructor(..._args) {
				super(..._args);
				this.end = 0;
			}
			isEnd(side) {
				if ((this.end & side) === side) return true;
				let isEnd = false;
				if (side === 1) {
					const slice = slicedArray.last;
					isEnd = slice.end & side ? this.includes(slice[slice.length - 1]) : false;
				} else if (side === 2) {
					const slice = slicedArray.first;
					isEnd = slice.end & side ? this.includes(slice[0]) : false;
				} else if (side === 3) return this.isEnd(1) && this.isEnd(2);
				if (isEnd) this.setEnd(side);
				return isEnd;
			}
			getEnds() {
				return {
					top: this.isEnd(1),
					bottom: this.isEnd(2),
					both: this.isEnd(3)
				};
			}
			setEnd(side) {
				this.end |= side;
			}
			unsetEnd(side) {
				this.end &= ~side;
			}
			splice(start, deleteCount, ...items) {
				const ret = super.splice(start, deleteCount, ...items);
				if (!this.length) {
					const slices = slicedArray.slices;
					const idx = slices.indexOf(this);
					if (idx !== -1) {
						if (slices.length === 1) this.unsetEnd(3);
						else slices.splice(idx, 1);
					}
				}
				return ret;
			}
		};
	}
	constructSlice(...items) {
		const slice = new this.sliceConstructor(items.length);
		for (let i = 0, length = items.length; i < length; ++i) slice[i] = items[i];
		return slice;
	}
	insertSlice(slice, flatten = true) {
		if (!slice.length) return;
		const first = this.slices[0];
		if (!first.length) {
			first.push(...slice);
			return first;
		}
		const lowerBound = slice[slice.length - 1];
		const upperBound = slice[0];
		let foundSlice, lowerIndex = -1, upperIndex = -1, foundSliceIndex = 0;
		for (; foundSliceIndex < this.slices.length; ++foundSliceIndex) {
			foundSlice = this.slices[foundSliceIndex];
			lowerIndex = foundSlice.indexOf(lowerBound);
			upperIndex = foundSlice.indexOf(upperBound);
			if (upperIndex !== -1 && -1 !== lowerIndex) break;
			else if (upperIndex !== -1 || -1 !== lowerIndex) break;
		}
		if (upperIndex !== -1 && -1 !== lowerIndex) {} else if (upperIndex !== -1) {
			const sliced = slice.slice(foundSlice.length - upperIndex);
			foundSlice.push(...sliced);
		} else if (lowerIndex !== -1) {
			const sliced = slice.slice(0, slice.length - lowerIndex - 1);
			foundSlice.unshift(...sliced);
		} else {
			let insertIndex = 0;
			for (const length = this.slices.length; insertIndex < length; ++insertIndex) {
				const s = this.slices[insertIndex];
				if (this.compareValue(slice[0], s[0]) === 1) break;
			}
			this.slices.splice(insertIndex, 0, this.constructSlice(...slice));
			foundSliceIndex = insertIndex;
		}
		if (flatten) return this.flatten(foundSliceIndex);
	}
	flatten(foundSliceIndex) {
		if (this.slices.length >= 2) for (let i = 0, length = this.slices.length; i < length - 1; ++i) {
			const prevSlice = this.slices[i];
			const nextSlice = this.slices[i + 1];
			if (prevSlice.indexOf(nextSlice[0]) !== -1) {
				prevSlice.setEnd(nextSlice.end);
				this.slices.splice(i + 1, 1);
				if (i < foundSliceIndex) --foundSliceIndex;
				--length;
				--i;
				this.insertSlice(nextSlice, false);
			}
		}
		return this.slices[foundSliceIndex];
	}
	get first() {
		return this.slices[0];
	}
	get last() {
		return this.slices[this.slices.length - 1];
	}
	get slice() {
		return this.first;
	}
	get length() {
		return this.slice.length;
	}
	findSlice(item) {
		for (let i = 0, length = this.slices.length; i < length; ++i) {
			const slice = this.slices[i];
			const index = slice.indexOf(item);
			if (index !== -1) return {
				slice,
				index
			};
		}
	}
	findOffsetInSlice(offsetId, slice) {
		for (let offset = 0; offset < slice.length; ++offset) if (this.compareValue(offsetId, slice[offset]) >= 0) return {
			slice,
			offset: offsetId === slice[offset] ? offset + 1 : offset
		};
	}
	findSliceOffset(maxId) {
		let slice;
		for (let i = 0; i < this.slices.length; ++i) {
			slice = this.slices[i];
			const found = this.findOffsetInSlice(maxId, slice);
			if (found) return {
				...found,
				sliceIndex: i
			};
		}
		if (slice?.isEnd(1)) return {
			slice,
			offset: slice.length,
			sliceIndex: this.slices.length - 1
		};
	}
	sliceMe(offsetId, addOffset, limit) {
		let slice = this.slice;
		let offset = 0;
		let sliceOffset = 0;
		if (offsetId) {
			const pos = this.findSliceOffset(offsetId);
			if (!pos) return;
			slice = pos.slice;
			offset = sliceOffset = pos.offset;
		} else if (!slice.isEnd(2)) return;
		const sliceStart = Math.max(sliceOffset + addOffset, 0);
		const sliceEnd = sliceOffset + addOffset + limit;
		const sliced = slice.slice(sliceStart, sliceEnd);
		const topWasMeantToLoad = addOffset < 0 ? limit + addOffset : limit;
		const bottomWasMeantToLoad = Math.abs(addOffset);
		const topFulfilled = slice.length - sliceOffset >= topWasMeantToLoad || (slice.isEnd(1) ? (sliced.setEnd(1), true) : false);
		const bottomFulfilled = sliceOffset - bottomWasMeantToLoad >= 0 || (slice.isEnd(2) ? (sliced.setEnd(2), true) : false);
		return {
			slice: sliced,
			offsetIdOffset: offset,
			fulfilled: 0 | (topFulfilled && bottomFulfilled ? 3 : (topFulfilled ? 1 : 0) | (bottomFulfilled ? 2 : 0))
		};
	}
	unshift(...items) {
		let slice = this.first;
		if (!slice.length) slice.setEnd(2);
		else if (!slice.isEnd(2)) {
			slice = this.constructSlice();
			slice.setEnd(2);
			this.slices.unshift(slice);
		}
		slice.unshift(...items);
	}
	push(...items) {
		let slice = this.last;
		if (!slice.length) slice.setEnd(1);
		else if (!slice.isEnd(1)) {
			slice = this.constructSlice();
			slice.setEnd(1);
			this.slices.push(slice);
		}
		slice.push(...items);
	}
	delete(item) {
		const found = this.findSlice(item);
		if (found) {
			found.slice.splice(found.index, 1);
			return true;
		}
		return false;
	}
	deleteSlice(slice) {
		indexOfAndSplice(this.slices, slice);
	}
	toJSON() {
		const serialized = { slices: this.slices.map((slice) => {
			return {
				values: slice.slice(),
				isEnd: slice.getEnds()
			};
		}) };
		return JSON.stringify(serialized);
	}
	static fromJSON(json) {
		const parsed = JSON.parse(json);
		const sliced = new SlicedArray();
		parsed.slices.forEach((slice) => {
			const inserted = sliced.insertSlice(slice.values) || sliced.first;
			if (slice.isEnd.top) inserted.setEnd(1);
			if (slice.isEnd.bottom) inserted.setEnd(2);
		});
		return sliced;
	}
};
MOUNT_CLASS_TO && (MOUNT_CLASS_TO.SlicedArray = SlicedArray);
//#endregion
//#region src/lib/appManagers/utils/messages/getSearchType.ts
function getSearchType(options) {
	if (!!!(options.inputFilter || options.savedReaction || options.query || options.isPublicHashtag)) return;
	if (options.isCacheableSearch) return "cached";
	return options.query || !options.peerId || options.fromPeerId || options.minDate || options.maxDate ? "uncached" : "cached";
}
//#endregion
//#region src/lib/appManagers/utils/messages/getHistoryStorageKey.ts
function getHistoryStorageKey(options) {
	const { type, peerId, threadId, monoforumThreadId } = options;
	return [
		type,
		peerId,
		getSearchStorageFilterKey(options),
		threadId,
		monoforumThreadId
	].filter(Boolean).join("_");
}
function getSearchStorageFilterKey({ inputFilter, savedReaction, query, hashtagType, communityId }) {
	let reactionsPart;
	if (savedReaction) {
		reactionsPart = `tag-${savedReaction.map((reaction) => {
			return reaction.document_id || reaction.emoticon;
		}).join(",")}`;
		inputFilter ?? (inputFilter = { _: "inputMessagesFilterEmpty" });
	}
	const filter = inputFilter?._;
	const communityPart = communityId ? `community-${communityId}` : void 0;
	return [
		filter,
		hashtagType !== "this" && hashtagType,
		query,
		reactionsPart,
		communityPart
	].filter(Boolean).join("_");
}
function getHistoryStorageType(options) {
	return getSearchType(options) ? "search" : options.threadId ? "replies" : "history";
}
//#endregion
//#region src/lib/appManagers/utils/messages/createHistoryStorage.ts
function createHistoryStorage(options) {
	const type = typeof options === "string" ? options.split("_")[0] : options.type;
	const key = typeof options === "string" ? options : getHistoryStorageKey(options);
	const historyStorage = {
		history: new SlicedArray(),
		type,
		key,
		count: null,
		_maxId: void 0,
		get maxId() {
			const maxId = historyStorage._maxId;
			if (maxId) return maxId;
			const first = historyStorage.history.first;
			if (first.isEnd(SliceEnd.Bottom)) return first[0];
		}
	};
	return historyStorage;
}
function createHistoryStorageSearchSlicedArray() {
	const slicedArray = new SlicedArray();
	slicedArray.insertSlice = (slice) => {
		slicedArray.first.push(...slice);
		return slicedArray.first;
	};
	slicedArray.findOffsetInSlice = (offsetId, slice) => {
		const index = slice.indexOf(offsetId);
		if (index !== -1) return {
			slice,
			offset: index + 1
		};
	};
	return slicedArray;
}
//#endregion
//#region src/lib/appManagers/utils/communities/isCollapsedCommunity.ts
/**
* A Community the user is still in and has folded into a single chat-list row, which is
* what hides its member chats from the list and projects them under the Community.
*
* Half the call sites ask this inverted ("skip unless folded"), so keeping the three
* conditions in one place is what stops an inverted copy from drifting.
*/
function isCollapsedCommunity(peer) {
	return peer?._ === "community" && !peer.pFlags.left && !!peer.pFlags.collapsed_in_dialogs;
}
//#endregion
//#region src/helpers/objectUrlUtils.ts
function reconcileObjectURLCacheValue(current, next) {
	if (next) Object.assign(current, next);
	else {
		current.url = "";
		if ("downloaded" in current) current.downloaded = 0;
	}
	return current;
}
function isObjectURL(url) {
	return url?.startsWith("blob:");
}
function makeObjectUrlOwner(namespace, ...parts) {
	return `${namespace}:${JSON.stringify(parts)}`;
}
function parseObjectUrlOwner(owner) {
	const separatorIndex = owner.indexOf(":");
	if (separatorIndex === -1) return;
	try {
		return {
			namespace: owner.slice(0, separatorIndex),
			parts: JSON.parse(owner.slice(separatorIndex + 1))
		};
	} catch {
		return;
	}
}
//#endregion
export { toggleStorages as A, recordPromiseBound as B, getStickerThumbKey as C, getFileNameByLocation as D, isWebFileLocation as E, readBlobAs as F, saveEncryptionKeyForHandoff as G, isObject as H, blobConstruct as I, THREADED_WORKER_PROTOCOL_QUERY_PARAM as J, takeEncryptionKeyHandoff as K, createStorages as L, getMemoryWriterStats as M, readBlobAsUint8Array as N, getFileURL as O, readBlobAsArrayBuffer as P, StateStorage as R, callbackify as S, getThumbKey as T, AccountController as U, validateInitObject as V, copy as W, THREADED_WORKER_TYPES as Y, limitSymbols as _, isCollapsedCommunity as a, isTempId as b, getHistoryStorageKey as c, getSearchType as d, SliceEnd as f, getPeerActiveUsernames as g, readBlobAsDataURL as h, reconcileObjectURLCacheValue as i, CacheStorageController as j, ServiceMessagePort as k, getHistoryStorageType as l, compareLong as m, makeObjectUrlOwner as n, createHistoryStorage as o, SlicedArray as p, writeEncryptionKeyHandoff as q, parseObjectUrlOwner as r, createHistoryStorageSearchSlicedArray as s, isObjectURL as t, getSearchStorageFilterKey as u, getObjectKeysAndSort as v, generateEmptyThumb as w, isLegacyMessageId as x, isGlobalHistoryMessageId as y, recordPromise as z };
