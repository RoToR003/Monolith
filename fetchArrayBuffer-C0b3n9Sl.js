//# allFunctionsCalledOnLoad
//#region src/helpers/fetchArrayBuffer.ts
/** The bytes of a file; a response that is not OK is an error, naming the url and the status. */
async function fetchArrayBuffer(url) {
	const response = await fetch(url);
	if (!response.ok) throw new Error(`${url}: HTTP ${response.status}`);
	return response.arrayBuffer();
}
//#endregion
export { fetchArrayBuffer as t };
