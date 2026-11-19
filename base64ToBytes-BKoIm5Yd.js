//# allFunctionsCalledOnLoad
import { p as MOUNT_CLASS_TO } from "./userAgent-ByGXcznk.js";
//#region src/helpers/fixBase64String.ts
function fixBase64String(str, toUrl) {
	if (toUrl) return str.replace(/\+/g, "-").replace(/\//g, "_").replace(/\=+$/, "");
	else return str.replace(/-/g, "+").replace(/_/g, "/");
}
//#endregion
//#region src/helpers/string/base64ToBytes.ts
function base64ToBytes(base64) {
	const bytesStr = atob(fixBase64String(base64, false));
	const bytes = new Uint8Array(bytesStr.length);
	for (let i = 0, length = bytes.length; i < length; ++i) bytes[i] = bytesStr[i].charCodeAt(0);
	return bytes;
}
MOUNT_CLASS_TO.base64ToBytes = base64ToBytes;
//#endregion
export { fixBase64String as n, base64ToBytes as t };
