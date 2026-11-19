//# allFunctionsCalledOnLoad
import { c as convertToUint8Array } from "./cryptoMessagePort-D8QFBtT1.js";
import { t as subtle } from "./subtle-BC4BRnF_.js";
//#region src/lib/crypto/utils/sha256.ts
function sha256(bytes) {
	return subtle.digest("SHA-256", convertToUint8Array(bytes)).then((b) => {
		return new Uint8Array(b);
	});
}
//#endregion
export { sha256 as t };
