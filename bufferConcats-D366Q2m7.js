//# allFunctionsCalledOnLoad
//#region src/helpers/bytes/bufferConcats.ts
function bufferConcats(...args) {
	const length = args.reduce((acc, v) => acc + (v.byteLength || v.length), 0);
	const tmp = new Uint8Array(length);
	let lastLength = 0;
	args.forEach((b) => {
		tmp.set(b instanceof ArrayBuffer ? new Uint8Array(b) : b, lastLength);
		lastLength += b.byteLength || b.length;
	});
	return tmp;
}
//#endregion
export { bufferConcats as t };
