//# allFunctionsCalledOnLoad
import "./userAgent-ByGXcznk.js";
//#region src/lib/wallet/release.ts
function isWalletReleased() {
	return false;
}
/** Whether the wallet shows: released, and not switched off for the account by the server (iOS, Android) */
function isWalletAvailable(appConfig) {
	return isWalletReleased() && appConfig.wallet_available !== false;
}
//#endregion
export { isWalletReleased as n, isWalletAvailable as t };
