//# allFunctionsCalledOnLoad
import { U as AccountController, j as CacheStorageController } from "./objectUrlUtils-5x08MNuO.js";
import { i as DeferredIsUsingPasscode } from "./encryptedStorageLayer-gN9TBXzg.js";
import { t as commonStateStorage } from "./commonStateStorage-CW-poHCa.js";
import { a as exportEncryptionKey, i as EncryptionKeyStore, s as bytesCmpConstTime } from "./cryptoMessagePort-D8QFBtT1.js";
import { i as useLockScreenHotReloadGuard } from "./hotReloadGuard-BUNVkeQ4.js";
import { o as useAppSettings } from "./liteMode-DeLStZfQ.js";
//#region src/lib/passcode/utils.ts
var ITERATIONS = 1e5;
async function hashPasscode(passcode, salt) {
	const passcodeBytes = new TextEncoder().encode(passcode);
	passcode = "";
	const importedKey = await crypto.subtle.importKey("raw", passcodeBytes, { name: "PBKDF2" }, false, ["deriveBits"]);
	const derivedBits = await crypto.subtle.deriveBits({
		name: "PBKDF2",
		salt,
		iterations: ITERATIONS,
		hash: "SHA-256"
	}, importedKey, 256);
	return new Uint8Array(derivedBits);
}
async function deriveEncryptionKey(passcode, salt) {
	const passcodeBytes = new TextEncoder().encode(passcode);
	passcode = "";
	const importedKey = await crypto.subtle.importKey("raw", passcodeBytes, { name: "PBKDF2" }, false, ["deriveKey"]);
	return crypto.subtle.deriveKey({
		name: "PBKDF2",
		salt,
		iterations: ITERATIONS,
		hash: "SHA-256"
	}, importedKey, {
		name: "AES-GCM",
		length: 256
	}, true, ["encrypt", "decrypt"]);
}
async function createEncryptionArtifactsForPasscode(passcode) {
	const encryptionSalt = crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(16));
	const verificationSalt = crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(16));
	const encryptionKey = await deriveEncryptionKey(passcode, encryptionSalt);
	const verificationHash = await hashPasscode(passcode, verificationSalt);
	passcode = "";
	return {
		verificationHash,
		verificationSalt,
		encryptionSalt,
		encryptionKey
	};
}
//#endregion
//#region src/lib/passcode/actions.ts
function usePasscodeActions() {
	const { rootScope, apiManagerProxy } = useLockScreenHotReloadGuard();
	async function disableCacheStorages() {
		CacheStorageController.temporarilyToggle(false);
		await apiManagerProxy.invoke("toggleCacheStorage", false);
		await apiManagerProxy.serviceMessagePort?.invoke("toggleCacheStorage", false);
	}
	async function enableCacheStorages() {
		CacheStorageController.temporarilyToggle(true);
		await apiManagerProxy.invoke("toggleCacheStorage", true);
		await apiManagerProxy.serviceMessagePort?.invoke("toggleCacheStorage", true);
	}
	async function clearCacheStorages() {
		await CacheStorageController.clearEncryptableStorages();
		CacheStorageController.resetOpenEncryptableCacheStorages();
		await Promise.all([apiManagerProxy.invoke("resetEncryptableCacheStorages", void 0), apiManagerProxy.serviceMessagePort?.invoke("resetEncryptableCacheStorages", void 0)]);
	}
	async function enablePasscode(passcode) {
		const { verificationHash, verificationSalt, encryptionSalt, encryptionKey } = await createEncryptionArtifactsForPasscode(passcode);
		passcode = "";
		await commonStateStorage.set({ passcode: {
			verificationHash,
			verificationSalt,
			encryptionSalt
		} });
		const [, setAppSettings] = useAppSettings();
		await setAppSettings("passcode", "enabled", true);
		await disableCacheStorages();
		await clearCacheStorages();
		await apiManagerProxy.invoke("toggleUsingPasscode", {
			isUsingPasscode: true,
			encryptionKey: await exportEncryptionKey(encryptionKey)
		});
		DeferredIsUsingPasscode.resolveDeferred(true);
		EncryptionKeyStore.save(encryptionKey);
		await AccountController.updateStorageForLegacy(null);
		await apiManagerProxy.serviceMessagePort?.invoke("toggleUsingPasscode", {
			type: "full",
			isUsingPasscode: true,
			encryptionKey
		});
		rootScope.dispatchEvent("toggle_using_passcode", true);
		await enableCacheStorages();
	}
	async function isMyPasscode(passcode) {
		const passcodeData = await commonStateStorage.get("passcode", false);
		if (!passcodeData?.verificationHash || !passcodeData?.verificationSalt) return false;
		const hashed = await hashPasscode(passcode, passcodeData.verificationSalt);
		passcode = "";
		return bytesCmpConstTime(hashed, passcodeData.verificationHash);
	}
	async function disablePasscode() {
		const [, setAppSettings] = useAppSettings();
		await setAppSettings("passcode", "enabled", false);
		rootScope.dispatchEvent("toggle_using_passcode", false);
		await disableCacheStorages();
		await clearCacheStorages();
		await apiManagerProxy.invoke("toggleUsingPasscode", { isUsingPasscode: false });
		await apiManagerProxy.serviceMessagePort?.invoke("toggleUsingPasscode", {
			type: "full",
			isUsingPasscode: false
		});
		EncryptionKeyStore.save(null);
		DeferredIsUsingPasscode.resolveDeferred(false);
		await enableCacheStorages();
		commonStateStorage.delete("passcode");
		await AccountController.updateStorageForLegacy(await AccountController.get(1));
	}
	/**
	* Note: Re-encrypts everything with a different hash even if the passcode is the same
	*/
	async function changePasscode(passcode) {
		const { verificationHash, verificationSalt, encryptionSalt, encryptionKey } = await createEncryptionArtifactsForPasscode(passcode);
		passcode = "";
		const toStore = {
			verificationHash,
			verificationSalt,
			encryptionSalt
		};
		await disableCacheStorages();
		await clearCacheStorages();
		await apiManagerProxy.invoke("changePasscode", {
			toStore,
			encryptionKey: await exportEncryptionKey(encryptionKey)
		});
		await apiManagerProxy.serviceMessagePort?.invoke("saveEncryptionKey", encryptionKey);
		EncryptionKeyStore.save(encryptionKey);
		await enableCacheStorages();
		await commonStateStorage.set({ passcode: toStore }, true);
	}
	/**
	* Warning! don't call on an unverified password
	*/
	async function unlockWithPasscode(passcode) {
		const passcodeData = await commonStateStorage.get("passcode", false);
		if (!passcodeData?.encryptionSalt) throw new Error("No encryption salt found in storage");
		const encryptionKey = await deriveEncryptionKey(passcode, passcodeData.encryptionSalt);
		passcode = "";
		EncryptionKeyStore.save(encryptionKey);
		await apiManagerProxy.invoke("saveEncryptionKey", await exportEncryptionKey(encryptionKey));
		await apiManagerProxy.serviceMessagePort?.invoke("toggleUsingPasscode", {
			type: "full",
			isUsingPasscode: true,
			encryptionKey
		});
		apiManagerProxy.invokeVoid("toggleLockOthers", false);
	}
	return {
		enablePasscode,
		isMyPasscode,
		disablePasscode,
		changePasscode,
		unlockWithPasscode
	};
}
//#endregion
export { usePasscodeActions as t };
