//# allFunctionsCalledOnLoad
import { n as __exportAll } from "./rolldown-runtime-CwcJO0Gh.js";
import { n as IDBStorage } from "./idb-BZfkipS3.js";
import { t as subtle } from "./subtle-BC4BRnF_.js";
//#region src/lib/wallet/vault.ts
var vault_exports = /* @__PURE__ */ __exportAll({
	WalletVaultExistsError: () => WalletVaultExistsError,
	WalletVaultLockedError: () => WalletVaultLockedError,
	default: () => WalletVault,
	requestPersistentStorage: () => requestPersistentStorage
});
var DATABASE = {
	name: "tweb-wallet",
	version: 1,
	stores: [
		{ name: "vault" },
		{ name: "secrets" },
		{ name: "custody" }
	]
};
var PBKDF2_ITERATIONS = 6e5;
var RETENTION = 9e5;
var AAD_PREFIX = "tweb-wallet/v1/";
var textEncoder = new TextEncoder();
function randomBytes(length) {
	return crypto.getRandomValues(new Uint8Array(length));
}
function concat(a, b) {
	const result = new Uint8Array(a.length + b.length);
	result.set(a, 0);
	result.set(b, a.length);
	return result;
}
async function seal(key, data, aad) {
	const iv = randomBytes(12);
	const encrypted = await subtle.encrypt({
		name: "AES-GCM",
		iv,
		additionalData: textEncoder.encode(AAD_PREFIX + aad)
	}, key, data);
	return concat(iv, new Uint8Array(encrypted));
}
async function open(key, sealed, aad) {
	const decrypted = await subtle.decrypt({
		name: "AES-GCM",
		iv: sealed.subarray(0, 12),
		additionalData: textEncoder.encode(AAD_PREFIX + aad)
	}, key, sealed.subarray(12));
	return new Uint8Array(decrypted);
}
/**
* A secret's own key, under D: from its sealing, or from the one under the next D when an earlier `addPasscode`
* switched to that D and stopped before it tidied this secret
*/
async function openSecretKey(deviceKey, sealed, aad) {
	try {
		return await open(deviceKey, sealed.key, "key/" + aad);
	} catch (err) {
		if (!sealed.keyNext) throw err;
		return await open(deviceKey, sealed.keyNext, "key/" + aad).catch(() => {
			throw err;
		});
	}
}
function importAesKey(raw, extractable = false) {
	return subtle.importKey("raw", raw, { name: "AES-GCM" }, extractable, ["encrypt", "decrypt"]);
}
async function derivePasscodeKey(passcode, salt, iterations) {
	const material = await subtle.importKey("raw", textEncoder.encode(passcode), "PBKDF2", false, ["deriveKey"]);
	return subtle.deriveKey({
		name: "PBKDF2",
		salt,
		iterations,
		hash: "SHA-256"
	}, material, {
		name: "AES-GCM",
		length: 256
	}, false, ["encrypt", "decrypt"]);
}
function makeKeyId() {
	return Array.from(randomBytes(8), (byte) => byte.toString(16).padStart(2, "0")).join("");
}
/**
* Asks the browser to keep the wallet's storage: without it a key that only this device holds may be cleared when
* the disk runs short. The browser decides; nothing to do when it says no.
*/
function requestPersistentStorage() {
	if (typeof navigator !== "undefined" && navigator.storage?.persist) navigator.storage.persist().catch(() => {});
}
var WalletVaultLockedError = class extends Error {
	constructor() {
		super("WALLET_VAULT_LOCKED");
	}
};
/** `create` found a vault another tab made meanwhile: it is unlocked, never made again */
var WalletVaultExistsError = class extends Error {
	constructor() {
		super("WALLET_VAULT_EXISTS");
	}
};
var WalletVault = class {
	constructor(userId) {
		this.userId = userId;
		this.epoch = 0;
		this.storage = new IDBStorage(DATABASE, "vault");
	}
	get vaultKey() {
		return "" + this.userId;
	}
	get ownerId() {
		return this.userId;
	}
	secretKey(secretRef) {
		return this.userId + ":" + secretRef;
	}
	/** every write of the header, in this tab and across the tabs, one at a time */
	withHeaderLock(task) {
		const locks = typeof navigator !== "undefined" ? navigator.locks : void 0;
		return locks ? locks.request("tweb-wallet-vault:" + this.userId, task) : task();
	}
	getHeader() {
		return this.storage.get(this.vaultKey, "vault");
	}
	async getKind() {
		return (await this.getHeader())?.kind;
	}
	isUnlocked() {
		return !!this.deviceKey;
	}
	/**
	* Makes the device key and protects it, once: a vault that is there already (another tab made it) is refused
	* with `WalletVaultExistsError` and unlocked instead — replaced, the secrets sealed under its key would be lost.
	*/
	create(protection) {
		return this.withHeaderLock(async () => {
			if (await this.getHeader()) throw new WalletVaultExistsError();
			await this.createLocked(protection);
		});
	}
	async createLocked(protection) {
		let header, deviceKey;
		if (protection.kind === "device") {
			deviceKey = await subtle.generateKey({
				name: "AES-GCM",
				length: 256
			}, false, ["encrypt", "decrypt"]);
			header = {
				version: 1,
				kind: "device",
				key: deviceKey,
				keyId: makeKeyId()
			};
		} else {
			const raw = randomBytes(32);
			const salt = randomBytes(16);
			const wrapped = await seal(await derivePasscodeKey(protection.passcode, salt, PBKDF2_ITERATIONS), raw, "wrap/" + this.vaultKey);
			deviceKey = await importAesKey(raw);
			raw.fill(0);
			header = {
				version: 1,
				kind: "passcode",
				salt,
				iterations: PBKDF2_ITERATIONS,
				wrapped,
				keyId: makeKeyId()
			};
		}
		await this.storage.save(this.vaultKey, header, "vault");
		this.setDeviceKey(deviceKey, header.keyId);
		requestPersistentStorage();
	}
	/**
	* `device` vaults open by themselves; a `passcode` vault needs the passcode and answers whether it was right.
	*/
	async unlock(passcode) {
		const header = await this.getHeader();
		if (!header) return false;
		const epoch = this.epoch;
		let deviceKey;
		if (header.kind === "device") deviceKey = header.key;
		else {
			if (passcode === void 0) return false;
			const wrapKey = await derivePasscodeKey(passcode, header.salt, header.iterations);
			try {
				const raw = await open(wrapKey, header.wrapped, "wrap/" + this.vaultKey);
				deviceKey = await importAesKey(raw);
				raw.fill(0);
			} catch (err) {
				return false;
			}
		}
		if (epoch !== this.epoch) return false;
		this.setDeviceKey(deviceKey, header.keyId);
		return true;
	}
	/**
	* Another passcode for a `passcode` vault, or none (`next` left out: the vault becomes a `device` one). Only the
	* device key's wrapping changes, in one write of the header: the secrets sealed under that key stay as they are.
	* Answers whether `current` was right.
	*/
	changePasscode(current, next) {
		return this.withHeaderLock(() => this.changePasscodeLocked(current, next));
	}
	async changePasscodeLocked(current, next) {
		const header = await this.getHeader();
		if (header?.kind !== "passcode") return false;
		const wrapKey = await derivePasscodeKey(current, header.salt, header.iterations);
		let raw;
		try {
			raw = await open(wrapKey, header.wrapped, "wrap/" + this.vaultKey);
		} catch (err) {
			return false;
		}
		try {
			let updated;
			if (next === void 0) updated = {
				version: 1,
				kind: "device",
				key: await importAesKey(raw),
				keyId: header.keyId
			};
			else {
				const salt = randomBytes(16);
				updated = {
					version: 1,
					kind: "passcode",
					salt,
					iterations: PBKDF2_ITERATIONS,
					wrapped: await seal(await derivePasscodeKey(next, salt, PBKDF2_ITERATIONS), raw, "wrap/" + this.vaultKey),
					keyId: header.keyId
				};
			}
			const deviceKey = updated.key || await importAesKey(raw);
			await this.storage.save(this.vaultKey, updated, "vault");
			this.setDeviceKey(deviceKey, updated.keyId);
			return true;
		} finally {
			raw.fill(0);
		}
	}
	/**
	* A passcode for a `device` vault, whose D cannot be wrapped (it is non-extractable): D is replaced by a new one.
	* Each step leaves every secret readable if the next fails: first each secret's key is sealed under the new D too,
	* then the header switches in one write, then the new sealing becomes the only one. Answers whether it was done.
	*/
	addPasscode(passcode) {
		return this.withHeaderLock(async () => {
			const header = await this.getHeader();
			if (header?.kind !== "device") return false;
			const prefix = this.userId + ":";
			const own = async () => (await this.storage.getAllEntries("secrets")).filter(([key]) => typeof key === "string" && key.startsWith(prefix));
			const raw = randomBytes(32);
			try {
				const nextKey = await importAesKey(raw);
				for (const [aad, sealed] of await own()) {
					const secretKey = await openSecretKey(header.key, sealed, aad);
					try {
						await this.storage.save(aad, {
							...sealed,
							key: await seal(header.key, secretKey, "key/" + aad),
							keyNext: await seal(nextKey, secretKey, "key/" + aad)
						}, "secrets");
					} finally {
						secretKey.fill(0);
					}
				}
				const salt = randomBytes(16);
				const updated = {
					version: 1,
					kind: "passcode",
					salt,
					iterations: PBKDF2_ITERATIONS,
					wrapped: await seal(await derivePasscodeKey(passcode, salt, PBKDF2_ITERATIONS), raw, "wrap/" + this.vaultKey),
					keyId: makeKeyId()
				};
				await this.storage.save(this.vaultKey, updated, "vault");
				this.setDeviceKey(nextKey, updated.keyId);
				for (const [aad, sealed] of await own()) {
					if (!sealed.keyNext) continue;
					const { keyNext, ...rest } = sealed;
					await this.storage.save(aad, {
						...rest,
						key: keyNext
					}, "secrets").catch(() => {});
				}
				return true;
			} finally {
				raw.fill(0);
			}
		});
	}
	async checkPasscode(passcode) {
		const header = await this.getHeader();
		if (header?.kind !== "passcode") return false;
		return open(await derivePasscodeKey(passcode, header.salt, header.iterations), header.wrapped, "wrap/" + this.vaultKey).then((raw) => {
			raw.fill(0);
			return true;
		}, () => false);
	}
	/**
	* Opens a `device` vault without asking. A `passcode` vault stays locked until `unlock`.
	*/
	async unlockSilently() {
		if (this.deviceKey) return true;
		return await this.getKind() === "device" ? this.unlock() : false;
	}
	setDeviceKey(key, keyId) {
		this.deviceKey = key;
		this.deviceKeyId = keyId;
		clearTimeout(this.retentionTimeout);
		this.retentionTimeout = self.setTimeout(() => this.lock(), RETENTION);
	}
	lock() {
		clearTimeout(this.retentionTimeout);
		this.deviceKey = void 0;
		this.deviceKeyId = void 0;
		++this.epoch;
	}
	/**
	* Seals a secret under D and checks it reads back as it was before anything relies on it. Under the header's lock:
	* D replaced by another tab meanwhile (`addPasscode`) locks this one, a secret sealed under the old D would be lost.
	*/
	async storeSecret(secretRef, bytes) {
		this.requireKey();
		return this.withHeaderLock(async () => {
			const deviceKey = await this.requireCurrentKey();
			const raw = randomBytes(32);
			const key = await importAesKey(raw);
			const aad = this.secretKey(secretRef);
			const sealed = {
				version: 1,
				key: await seal(deviceKey, raw, "key/" + aad),
				data: await seal(key, bytes, "secret/" + aad)
			};
			raw.fill(0);
			await this.storage.save(aad, sealed, "secrets");
			const stored = await this.readSecret(secretRef);
			const same = stored.length === bytes.length && stored.every((byte, index) => byte === bytes[index]);
			stored.fill(0);
			if (!same) throw new Error("WALLET_SECRET_WRITE_FAILED");
		});
	}
	async readSecret(secretRef) {
		const deviceKey = this.requireKey();
		const aad = this.secretKey(secretRef);
		const sealed = await this.storage.get(aad, "secrets");
		if (!sealed) throw new Error("WALLET_SECRET_MISSING");
		let raw;
		try {
			raw = await openSecretKey(deviceKey, sealed, aad);
		} catch (err) {
			if ((await this.getHeader())?.keyId !== this.deviceKeyId) {
				this.lock();
				throw new WalletVaultLockedError();
			}
			throw err;
		}
		const key = await importAesKey(raw);
		raw.fill(0);
		return open(key, sealed.data, "secret/" + aad);
	}
	deleteSecret(secretRef) {
		return this.storage.delete(this.secretKey(secretRef), "secrets");
	}
	async hasSecret(secretRef) {
		return !!await this.storage.get(this.secretKey(secretRef), "secrets");
	}
	requireKey() {
		if (!this.deviceKey) throw new WalletVaultLockedError();
		return this.deviceKey;
	}
	/** the D held, once the header says it is still the vault's; otherwise this tab locks */
	async requireCurrentKey() {
		const deviceKey = this.requireKey();
		if ((await this.getHeader())?.keyId !== this.deviceKeyId) {
			this.lock();
			throw new WalletVaultLockedError();
		}
		return deviceKey;
	}
	getCustody() {
		return this.storage.get(this.vaultKey, "custody");
	}
	saveCustody(record) {
		return this.storage.save(this.vaultKey, record, "custody");
	}
	deleteCustody() {
		return this.storage.delete(this.vaultKey, "custody");
	}
	/**
	* A key of a wallet this account no longer uses: kept, since its phrase still opens whatever that wallet holds
	*/
	parkCustody(record) {
		return this.storage.save(this.vaultKey + ":parked:" + record.recordId, record, "custody");
	}
	deleteParkedCustody(recordId) {
		return this.storage.delete(this.vaultKey + ":parked:" + recordId, "custody");
	}
	async getParkedCustody() {
		const prefix = this.vaultKey + ":parked:";
		return (await this.storage.getAllEntries("custody")).filter(([key]) => typeof key === "string" && key.startsWith(prefix)).map(([, value]) => value);
	}
	/**
	* Forgets everything this user's wallet kept on the device
	*/
	/** every account's keys on this device: the logout of all of them at once (the passcode lock's "forgot") */
	static async wipeAll() {
		const storage = new IDBStorage(DATABASE, "vault");
		await Promise.all([
			"vault",
			"secrets",
			"custody"
		].map((name) => storage.clear(name)));
	}
	async wipe() {
		this.lock();
		const prefix = this.userId + ":";
		const own = (await this.storage.getAllKeys("secrets").catch(() => [])).filter((key) => typeof key === "string" && key.startsWith(prefix));
		if (own.length) await this.storage.delete(own, "secrets");
		const ownCustody = (await this.storage.getAllKeys("custody").catch(() => [])).filter((key) => key === this.vaultKey || typeof key === "string" && key.startsWith(this.vaultKey + ":parked:"));
		await Promise.all([ownCustody.length ? this.storage.delete(ownCustody, "custody") : void 0, this.storage.delete(this.vaultKey, "vault")]);
	}
};
//#endregion
export { vault_exports as i, WalletVaultExistsError as n, WalletVaultLockedError as r, WalletVault as t };
