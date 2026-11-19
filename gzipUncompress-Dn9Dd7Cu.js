//# allFunctionsCalledOnLoad
import { n as decompressSync, t as Decompress } from "./browser-CNMy5TzU.js";
//#region src/helpers/gzipUncompress.ts
function gzipUncompress(bytes, toString, maxSize) {
	let result;
	if (maxSize === void 0) result = decompressSync(new Uint8Array(bytes));
	else {
		const chunks = [];
		let total = 0;
		let exceeded = false;
		new Decompress((chunk) => {
			if (exceeded) return;
			total += chunk.length;
			if (total > maxSize) {
				exceeded = true;
				return;
			}
			chunks.push(chunk);
		}).push(new Uint8Array(bytes), true);
		if (exceeded) throw new Error("GZIP_MAX_SIZE_EXCEEDED");
		result = new Uint8Array(total);
		let offset = 0;
		for (const c of chunks) {
			result.set(c, offset);
			offset += c.length;
		}
	}
	return toString ? new TextDecoder().decode(result) : result;
}
//#endregion
export { gzipUncompress as t };
