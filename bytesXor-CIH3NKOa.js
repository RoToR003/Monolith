//# allFunctionsCalledOnLoad
import { i as __toESM } from "./rolldown-runtime-CwcJO0Gh.js";
import { d as ctx } from "./userAgent-ByGXcznk.js";
import { t as bufferConcats } from "./bufferConcats-D366Q2m7.js";
import { t as randomize } from "./randomize-jNNpMVgZ.js";
import { t as require_BigInteger } from "./BigInteger-0a0WsWCs.js";
//#region src/helpers/listenMessagePort.ts
function listenMessagePort(messagePort, onConnect, onDisconnect) {
	const attachPort = (listenPort, sendPort) => {
		messagePort.attachListenPort(listenPort);
		sendPort && messagePort.attachSendPort(sendPort);
		onConnect?.(listenPort);
	};
	messagePort.setOnPortDisconnect(onDisconnect);
	if (typeof SharedWorkerGlobalScope !== "undefined") ctx.addEventListener("connect", (e) => attachPort(e.source, e.source));
	else if (typeof ServiceWorkerGlobalScope !== "undefined") attachPort(ctx, null);
	else attachPort(ctx, ctx);
}
//#endregion
//#region src/helpers/bigInt/bigIntConstants.ts
var import_BigInteger = /* @__PURE__ */ __toESM(require_BigInteger());
var safeBigInt = (0, import_BigInteger.default)(Number.MAX_SAFE_INTEGER);
var ulongBigInt = (0, import_BigInteger.default)(import_BigInteger.default[2]).pow(64);
var longBigInt = ulongBigInt.divide(import_BigInteger.default[2]);
//#endregion
//#region src/helpers/bigInt/bigIntConversion.ts
function bigIntFromBytes(bytes, base = 256) {
	return import_BigInteger.default.fromArray(bytes instanceof Uint8Array ? [...bytes] : bytes, base);
}
function bigIntToBytes(bigInt) {
	return new Uint8Array(bigInt.toArray(256).value);
}
function bigIntToSigned(bigInt) {
	return bigInt.greater(longBigInt) ? bigInt.minus(ulongBigInt) : bigInt;
}
function bigIntToUnsigned(bigInt) {
	return bigInt.isNegative() ? ulongBigInt.add(bigInt) : bigInt;
}
//#endregion
//#region src/helpers/bytes/addPadding.ts
function addPadding(bytes, blockSize = 16, zeroes, blockSizeAsTotalLength = false, prepend = false) {
	const len = bytes.byteLength || bytes.length;
	const needPadding = blockSizeAsTotalLength ? blockSize - len : blockSize - len % blockSize;
	if (needPadding > 0 && needPadding < blockSize) {
		const padding = new Uint8Array(needPadding);
		if (zeroes) for (let i = 0; i < needPadding; ++i) padding[i] = 0;
		else randomize(padding);
		if (bytes instanceof ArrayBuffer) return (prepend ? bufferConcats(padding, bytes) : bufferConcats(bytes, padding)).buffer;
		else if (bytes instanceof Uint8Array) return prepend ? bufferConcats(padding, bytes) : bufferConcats(bytes, padding);
		else return prepend ? [...padding].concat(bytes) : bytes.concat([...padding]);
	}
	return bytes;
}
//#endregion
//#region src/helpers/bytes/bytesXor.ts
function bytesXor(bytes1, bytes2) {
	const len = bytes1.length;
	const bytes = new Uint8Array(len);
	for (let i = 0; i < len; ++i) bytes[i] = bytes1[i] ^ bytes2[i];
	return bytes;
}
//#endregion
export { bigIntToSigned as a, listenMessagePort as c, bigIntToBytes as i, addPadding as n, bigIntToUnsigned as o, bigIntFromBytes as r, safeBigInt as s, bytesXor as t };
