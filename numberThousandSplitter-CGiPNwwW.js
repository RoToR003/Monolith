//# allFunctionsCalledOnLoad
//#region src/helpers/number/numberThousandSplitter.ts
var THOUSANDS_SPACE = "\xA0";
function numberThousandSplitter(x, joiner = THOUSANDS_SPACE) {
	if (x === void 0) return "";
	const parts = x.toString().split(".");
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, joiner);
	return parts.join(".");
}
function numberThousandSplitterForWatching(x) {
	if (x === void 0) return "";
	return numberThousandSplitter(x, ",");
}
function numberThousandSplitterForStars(x) {
	if (x === void 0) return "";
	return numberThousandSplitter(x, THOUSANDS_SPACE);
}
//#endregion
export { numberThousandSplitterForStars as n, numberThousandSplitterForWatching as r, numberThousandSplitter as t };
