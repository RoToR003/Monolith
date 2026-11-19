//# allFunctionsCalledOnLoad
import { d as ctx } from "./userAgent-ByGXcznk.js";
//#region src/helpers/bytes/bytesToHex.ts
function bytesToHex(bytes, joiner = "", uppercase) {
	const length = bytes.length;
	const arr = new Array(length);
	for (let i = 0; i < length; ++i) arr[i] = (bytes[i] < 16 ? "0" : "") + (bytes[i] || 0).toString(16);
	const joined = arr.join(joiner);
	return uppercase ? joined.toUpperCase() : joined;
}
ctx.bytesToHex = bytesToHex;
//#endregion
export { bytesToHex as t };
