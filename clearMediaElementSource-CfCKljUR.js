//# allFunctionsCalledOnLoad
//#region src/helpers/dom/clearMediaElementSource.ts
function clearMediaElementSource(element) {
	const isMedia = element.tagName === "AUDIO" || element.tagName === "VIDEO";
	const media = element;
	if (isMedia) {
		try {
			media.pause();
		} catch {}
		media.srcObject = null;
		media.src = "";
	}
	if (!isMedia && !element.isConnected) {
		element.src = "";
		return;
	}
	element.removeAttribute("src");
	if (isMedia) try {
		media.load();
	} catch {}
}
//#endregion
export { clearMediaElementSource as t };
