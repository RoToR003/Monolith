//# allFunctionsCalledOnLoad
import { a as i18n } from "./langPack-BmdJGr44.js";
//#region src/helpers/formatBytes.ts
function formatBytes(bytes, decimals = "auto") {
	if (bytes === 0) return i18n("FileSize.B", [0]);
	const strictDecimals = decimals === "auto";
	const k = 1024;
	const sizes = [
		"FileSize.B",
		"FileSize.KB",
		"FileSize.MB",
		"FileSize.GB",
		"FileSize.TB",
		"FileSize.PB"
	];
	const i = Math.min(Math.floor(Math.log(bytes) / Math.log(k)), sizes.length - 1);
	const _decimals = decimals === "auto" ? Math.max(0, i - 1) : decimals;
	const dm = Math.max(0, _decimals);
	const fixed = (bytes / Math.pow(k, i)).toFixed(dm);
	return i18n(sizes[i], [strictDecimals ? fixed : parseFloat(fixed)]);
}
//#endregion
export { formatBytes as t };
