//# allFunctionsCalledOnLoad
import { i as writeClipboardItem, r as copyTextToClipboard } from "./clipboard-DzscV-ca.js";
//#region src/helpers/qrCode/copyQrCode.ts
/**
* Puts a rendered QR code on the clipboard as a PNG, and hands over the link it
* encodes when that cannot happen: Safari cannot write `image/png` at all, the
* permission can be denied at the OS or policy level, and the code may not have
* finished painting yet. `copyTextToClipboard` still has its own
* `document.execCommand` fallback, so the link path works where the modern API
* is blocked outright.
*
* The wording is the caller's — the profile card and an invite link name the
* same outcomes differently — so this reports which one happened instead of
* toasting itself.
*/
async function copyQrCode({ blob, url }) {
	if (blob) try {
		await writeClipboardItem({ "image/png": blob });
		return "image";
	} catch (err) {
		console.error("QR code image copy failed", err);
	}
	try {
		await copyTextToClipboard(url);
		return "link";
	} catch (err) {
		console.error("QR code link copy failed", err);
		return "failed";
	}
}
//#endregion
export { copyQrCode as t };
