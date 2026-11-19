//# allFunctionsCalledOnLoad
//#region src/helpers/number/formatNumber.ts
function formatNumber(bytes, decimals = 2) {
	if (bytes === 0) return "0";
	if (bytes < 0) return "-" + formatNumber(-bytes, decimals);
	const k = 1e3;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = [
		"",
		"K",
		"M",
		"B",
		"T"
	];
	const i = Math.min(Math.floor(Math.log(bytes) / Math.log(k)), sizes.length - 1);
	return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + sizes[i];
}
//#endregion
export { formatNumber as t };
