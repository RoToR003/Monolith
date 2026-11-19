//# allFunctionsCalledOnLoad
import { h as Modes } from "./userAgent-ByGXcznk.js";
import { t as App } from "./app-BuFf8z8C.js";
import { t as pause } from "./pause-BSJh-z46.js";
import { n as logger } from "./logger-7zf0rNYS.js";
import { t as makeError } from "./makeError-CiXxcKtE.js";
//#region src/helpers/object/safeAssign.ts
function safeAssign(object, fromObject) {
	if (fromObject) {
		for (const i in fromObject) if (fromObject[i] !== void 0) object[i] = fromObject[i];
	}
	return object;
}
//#endregion
//#region src/config/broadcastChannel.ts
var unversionedMainBroadcastChannelName = "webk-main-broadcast-channel";
//#endregion
//#region src/lib/broadcastChannelWrapper.ts
function isEventValid(eventData) {
	return typeof eventData === "object" && eventData !== null && "eventName" in eventData && typeof eventData.eventName === "string";
}
function createBroadcastChannelWrapper(name) {
	const broadcastChannel = new BroadcastChannel(name);
	const listeners = /* @__PURE__ */ new Map();
	broadcastChannel.onmessage = (event) => {
		const data = event.data;
		if (!isEventValid(data)) return;
		const { eventName, payload } = data;
		const listenersForEvent = listeners.get(eventName);
		if (listenersForEvent) listenersForEvent.forEach((listener) => listener(payload));
	};
	return {
		on: (inEventName, listener) => {
			const eventName = inEventName;
			const listenersForEvent = listeners.get(eventName);
			if (listenersForEvent) listenersForEvent.push(listener);
			else listeners.set(eventName, [listener]);
			const remove = () => {
				const listenersForEvent = listeners.get(eventName);
				if (listenersForEvent) {
					const index = listenersForEvent.indexOf(listener);
					if (index !== -1) listenersForEvent.splice(index, 1);
				}
			};
			return remove;
		},
		emit: (eventName, payload) => {
			broadcastChannel.postMessage({
				eventName,
				payload
			});
		},
		emitVoid: (eventName) => {
			broadcastChannel.postMessage({ eventName });
		},
		close: () => {
			broadcastChannel.close();
		}
	};
}
//#endregion
//#region src/lib/files/idb.ts
var _IDB;
var BLOCKED_OPEN_TIMEOUT = 2e4;
var askedOlderVersionsToReload = false;
/**
* The tabs of older builds are asked to reload, once, on the channel every version reloads on
* (apiManagerProxy; a tab of this build or a newer one does not, by `olderThan`). Sent from wherever the upgrade is
* found held back — the worker opens the account's databases before the page does
*/
function askOlderVersionsToReload() {
	if (askedOlderVersionsToReload) return;
	askedOlderVersionsToReload = true;
	try {
		const channel = createBroadcastChannelWrapper(unversionedMainBroadcastChannelName);
		channel.emit("reload", {
			dropFlags: [],
			olderThan: App.build
		});
		channel.close();
	} catch (err) {}
}
var IDB = class IDB {
	constructor(db) {
		safeAssign(this, db);
		if (Modes.test) this.name += "_test";
		this.storageIsAvailable = true;
		this.log = logger(["IDB", db.name].join("-"));
		this.log("constructor");
		this.openDatabase(true);
		IDB.INSTANCES.push(this);
	}
	isAvailable() {
		return this.storageIsAvailable;
	}
	openDatabase(createNew = false) {
		if (this.openDbPromise && !createNew) return this.openDbPromise;
		const createIndexes = (os, store) => {
			const indexNames = Array.from(os.indexNames);
			for (const indexName of indexNames) os.deleteIndex(indexName);
			if (!store.indexes?.length) return;
			for (const index of store.indexes) {
				if (os.indexNames.contains(index.indexName)) continue;
				os.createIndex(index.indexName, index.keyPath, index.objectParameters);
			}
		};
		const createObjectStore = (db, store) => {
			const os = db.createObjectStore(store.name);
			createIndexes(os, store);
		};
		try {
			var request = indexedDB.open(this.name, this.version);
			if (!request) return Promise.reject();
		} catch (error) {
			this.log.error("error opening db", error.message);
			this.storageIsAvailable = false;
			return Promise.reject(error);
		}
		let finished = false, waiting = false;
		const startedAt = Date.now();
		const waitForUpgrade = () => {
			if (waiting) return;
			waiting = true;
			this.log.warn("the upgrade waits for the connections of an older version to close");
			IDB.onUpgradeBlocked?.(this.name);
		};
		const isUpgradePending = async () => {
			try {
				const databases = await Promise.race([indexedDB.databases?.(), pause(1e3)]);
				const found = databases ? databases.find((database) => database.name === this.name) : void 0;
				return !!found && found.version < this.version;
			} catch (err) {
				return false;
			}
		};
		const checkTimeout = async () => {
			if (finished) return;
			if (!waiting && await isUpgradePending()) waitForUpgrade();
			if (finished) return;
			if (waiting && Date.now() - startedAt < BLOCKED_OPEN_TIMEOUT) {
				setTimeout(checkTimeout, 1e3);
				return;
			}
			request.onerror(makeError("IDB_CREATE_TIMEOUT"));
		};
		setTimeout(checkTimeout, 3e3);
		request.onblocked = waitForUpgrade;
		return this.openDbPromise = new Promise((resolve, reject) => {
			request.onsuccess = (event) => {
				finished = true;
				const db = request.result;
				let calledNew = false;
				this.log("Opened");
				db.onerror = (error) => {
					this.storageIsAvailable = false;
					this.log.error("Error creating/accessing IndexedDB database", error);
					reject(error);
				};
				db.onclose = (e) => {
					this.log.error("closed:", e);
					!calledNew && this.openDatabase();
				};
				db.onabort = (e) => {
					this.log.error("abort:", e);
					const transaction = e.target;
					this.openDatabase(calledNew = true);
					if (transaction.onerror) transaction.onerror(e);
					db.close();
				};
				db.onversionchange = (e) => {
					this.log.error("onversionchange, lol?");
				};
				resolve(this.db = db);
			};
			request.onerror = (event) => {
				finished = true;
				this.storageIsAvailable = false;
				this.log.error("Error creating/accessing IndexedDB database", event);
				reject(event);
			};
			request.onupgradeneeded = (event) => {
				finished = true;
				this.log.warn("performing idb upgrade from", event.oldVersion, "to", event.newVersion);
				const target = event.target;
				const db = target.result;
				this.stores.forEach((store) => {
					if (!db.objectStoreNames.contains(store.name)) createObjectStore(db, store);
					else {
						const os = target.transaction.objectStore(store.name);
						createIndexes(os, store);
					}
					if (store.encryptedName && !db.objectStoreNames.contains(store.encryptedName)) db.createObjectStore(store.encryptedName);
				});
			};
		}).then((db) => this.openDbPromise = db);
	}
	async closeDatabase() {
		if (!this.db) return;
		this.db.onclose = () => {};
		this.db.close();
	}
	static create(db) {
		return this.INSTANCES.find((instance) => instance.name === db.name) ?? new IDB(db);
	}
	static closeDatabases(preserve) {
		this.INSTANCES.forEach((storage) => {
			if (preserve && preserve === storage) return;
			storage.closeDatabase();
		});
	}
	/**
	* ! WARNING ! function requires at least one opened connection
	*/
	/**
	* Promise will be resolved only when all connections are closed \
	* You can skip waiting since it'll be deleted after all connections are closed
	*/
	static deleteDatabaseByName(dbName) {
		return new Promise((resolve, reject) => {
			this.INSTANCES.forEach((storage) => {
				if (storage.name === dbName) return storage.closeDatabase();
			});
			const request = indexedDB.deleteDatabase(dbName);
			request.onerror = () => reject();
			request.onsuccess = () => resolve();
		});
	}
};
_IDB = IDB;
_IDB.INSTANCES = [];
_IDB.onUpgradeBlocked = askOlderVersionsToReload;
var IDBStorage = class {
	constructor(db, storeName) {
		this.storeName = storeName;
		this.log = logger([
			"IDB",
			db.name,
			storeName
		].join("-"));
		this.idb = IDB.create(db);
	}
	close() {
		return this.idb.closeDatabase();
	}
	delete(entryName, storeName) {
		const isArray = Array.isArray(entryName);
		if (!isArray) entryName = [].concat(entryName);
		return this.getObjectStore("readwrite", (objectStore) => {
			const promises = entryName.map((entryName) => objectStore.delete(entryName));
			return isArray ? promises : promises[0];
		}, "", storeName);
	}
	clear(storeName) {
		return this.getObjectStore("readwrite", (objectStore) => objectStore.clear(), "", storeName);
	}
	save(entryName, value, storeName) {
		const isArray = Array.isArray(entryName);
		if (!isArray) {
			entryName = [entryName];
			value = [value];
		}
		return this.getObjectStore("readwrite", (objectStore) => {
			const promises = entryName.map((entryName, idx) => objectStore.put(value[idx], entryName));
			return isArray ? promises : promises[0];
		}, "", storeName);
	}
	get(entryName, storeName) {
		const isArray = Array.isArray(entryName);
		if (!isArray) {
			if (!entryName) return;
			entryName = [].concat(entryName);
		} else if (!entryName.length) return Promise.resolve([]);
		return this.getObjectStore("readonly", (objectStore) => {
			const promises = entryName.map((entryName) => objectStore.get(entryName));
			return isArray ? promises : promises[0];
		}, "", storeName);
	}
	async getObjectStore(mode, callback, log, storeName = this.storeName) {
		let perf;
		if (log) {
			perf = performance.now();
			this.log(log + ": start");
		}
		const _db = this.idb.openDatabase();
		const db = _db instanceof Promise ? await _db : _db;
		let resolve, reject;
		const promise = new Promise((a, b) => [resolve, reject] = [a, b]);
		const transaction = db.transaction([storeName], mode, { durability: "relaxed" });
		const timeout = setTimeout(() => {
			this.log.error("transaction not finished", transaction, log);
		}, 1e4);
		const onError = () => {
			clearTimeout(timeout);
			reject(transaction.error);
		};
		const onComplete = () => {
			clearTimeout(timeout);
			if (log) this.log(log + ": end", performance.now() - perf);
			const results = requests.map((r) => r.result);
			resolve(isArray ? results : results[0]);
			if (log) this.log(log + ": resolved", isArray ? results : results[0]);
		};
		transaction.onerror = onError;
		const waitForTransactionComplete = mode === "readwrite";
		if (waitForTransactionComplete) transaction.oncomplete = () => onComplete();
		const callbackResult = callback(transaction.objectStore(storeName), onComplete, onError);
		const isArray = Array.isArray(callbackResult);
		const requests = isArray ? callbackResult : [].concat(callbackResult);
		if (waitForTransactionComplete) return promise;
		const length = requests.length;
		let left = length;
		const onRequestFinished = () => {
			if (transaction.error) return;
			if (!--left) onComplete();
		};
		for (let i = 0; i < length; ++i) {
			const request = requests[i];
			request.onerror = onError;
			request.onsuccess = onRequestFinished;
		}
		return promise;
	}
	getAll(storeName) {
		return this.getObjectStore("readonly", (objectStore) => objectStore.getAll(), "", storeName);
	}
	getAllKeys(storeName) {
		return this.getObjectStore("readonly", (objectStore) => objectStore.getAllKeys(), "", storeName);
	}
	getAllEntries(storeName) {
		const entries = [];
		return new Promise((resolve, reject) => {
			this.getObjectStore("readonly", (objectStore, onComplete, onError) => {
				const request = objectStore.openCursor();
				request.onsuccess = (event) => {
					const cursor = event.target.result;
					if (cursor) {
						entries.push([cursor.key, cursor.value]);
						cursor.continue();
					} else {
						onComplete();
						resolve(entries);
					}
				};
				request.onerror = onError;
				return [];
			}, "", storeName).catch(reject);
		});
	}
};
//#endregion
export { safeAssign as a, unversionedMainBroadcastChannelName as i, IDBStorage as n, createBroadcastChannelWrapper as r, IDB as t };
