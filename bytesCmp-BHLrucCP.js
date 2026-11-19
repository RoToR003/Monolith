//# allFunctionsCalledOnLoad
import { p as MOUNT_CLASS_TO } from "./userAgent-ByGXcznk.js";
//#region src/helpers/bytes/bytesToBase64.ts
function bytesToBase64(bytes) {
	let mod3;
	let result = "";
	for (let nLen = bytes.length, nUint24 = 0, nIdx = 0; nIdx < nLen; ++nIdx) {
		mod3 = nIdx % 3;
		nUint24 |= bytes[nIdx] << (16 >>> mod3 & 24);
		if (mod3 === 2 || nLen - nIdx === 1) {
			result += String.fromCharCode(uint6ToBase64(nUint24 >>> 18 & 63), uint6ToBase64(nUint24 >>> 12 & 63), uint6ToBase64(nUint24 >>> 6 & 63), uint6ToBase64(nUint24 & 63));
			nUint24 = 0;
		}
	}
	const rest = bytes.length % 3;
	return rest ? result.slice(0, rest - 3) + (rest === 1 ? "==" : "=") : result;
}
function uint6ToBase64(nUint6) {
	return nUint6 < 26 ? nUint6 + 65 : nUint6 < 52 ? nUint6 + 71 : nUint6 < 62 ? nUint6 - 4 : nUint6 === 62 ? 43 : nUint6 === 63 ? 47 : 65;
}
MOUNT_CLASS_TO.bytesToBase64 = bytesToBase64;
//#endregion
//#region src/helpers/bytes/bytesCmp.ts
function bytesCmp(bytes1, bytes2) {
	const len = bytes1.length;
	if (len !== bytes2.length) return false;
	for (let i = 0; i < len; ++i) if (bytes1[i] !== bytes2[i]) return false;
	return true;
}
//#endregion
export { bytesToBase64 as n, bytesCmp as t };
