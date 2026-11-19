//# allFunctionsCalledOnLoad
import { p as MOUNT_CLASS_TO } from "./userAgent-ByGXcznk.js";
//#region src/helpers/bytes/bytesFromHex.ts
function bytesFromHex(hexString) {
	const len = hexString.length;
	const bytes = new Uint8Array(Math.ceil(len / 2));
	let start = 0;
	if (len % 2) bytes[start++] = parseInt(hexString.charAt(0), 16);
	for (let i = start; i < len; i += 2) bytes[start++] = parseInt(hexString.substr(i, 2), 16);
	return bytes;
}
MOUNT_CLASS_TO.bytesFromHex = bytesFromHex;
//#endregion
export { bytesFromHex as t };
