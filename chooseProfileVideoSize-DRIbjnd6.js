//# allFunctionsCalledOnLoad
import { n as __exportAll } from "./rolldown-runtime-CwcJO0Gh.js";
//#region src/lib/appManagers/utils/photos/chooseProfileVideoSize.ts
var chooseProfileVideoSize_exports = /* @__PURE__ */ __exportAll({ default: () => chooseProfileVideoSize });
function chooseProfileVideoSize(photo, want = "preview") {
	const sizes = photo.video_sizes?.filter((s) => s._ === "videoSize");
	if (!sizes?.length) return void 0;
	if (want === "preview") return sizes.find((s) => s.type === "p") || sizes.reduce((min, s) => s.size < min.size ? s : min, sizes[0]);
	return sizes.find((s) => s.type === "u") || sizes.reduce((max, s) => s.size > max.size ? s : max, sizes[0]);
}
//#endregion
export { chooseProfileVideoSize_exports as n, chooseProfileVideoSize as t };
