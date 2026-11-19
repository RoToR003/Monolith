//# allFunctionsCalledOnLoad
import "./rootScope-CZS0lmz8.js";
import { o as calcImageInBox } from "./mediaSizes-C1MTaleW.js";
//#region src/lib/appManagers/utils/photos/choosePhotoSize.ts
function choosePhotoSize(photo, boxWidth = 0, boxHeight = 0, useBytes = false, pushDocumentSize = false) {
	if (window.devicePixelRatio > 1) {
		boxWidth *= 2;
		boxHeight *= 2;
	}
	let sizes = photo.sizes || photo.thumbs;
	let bestPhotoSize = {
		_: "photoSizeEmpty",
		type: ""
	};
	if (pushDocumentSize && sizes && photo._ !== "photo") sizes = sizes.concat({
		_: "photoSize",
		w: photo.w,
		h: photo.h,
		size: photo.size,
		type: ""
	});
	if (sizes?.length) {
		for (let i = 0, length = sizes.length; i < length; ++i) {
			const photoSize = sizes[i];
			if (!("w" in photoSize) && !("h" in photoSize)) continue;
			bestPhotoSize = photoSize;
			const size = calcImageInBox(photoSize.w, photoSize.h, boxWidth, boxHeight);
			if (size.width >= boxWidth || size.height >= boxHeight) break;
		}
		if (useBytes && bestPhotoSize._ === "photoSizeEmpty" && sizes[0]._ === "photoStrippedSize") bestPhotoSize = sizes[0];
	}
	return bestPhotoSize;
}
//#endregion
export { choosePhotoSize as t };
