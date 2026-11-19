//# allFunctionsCalledOnLoad
//#region src/helpers/textToSvgURL.ts
function textToSvgURL(text) {
	const blob = new Blob([text], { type: "image/svg+xml;charset=utf-8" });
	return new Promise((resolve) => {
		const reader = new FileReader();
		reader.onload = (e) => {
			resolve(e.target.result);
		};
		reader.readAsDataURL(blob);
	});
}
//#endregion
export { textToSvgURL as t };
