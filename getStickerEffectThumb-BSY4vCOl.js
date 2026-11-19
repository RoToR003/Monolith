//# allFunctionsCalledOnLoad
//#region src/helpers/callbackifyAll.ts
function callbackifyAll(values, callback) {
	if (values.some((value) => value instanceof Promise)) return Promise.all(values).then(callback);
	else return callback(values);
}
//#endregion
//#region src/lib/appManagers/utils/stickers/getStickerEffectThumb.ts
function getStickerEffectThumb(doc) {
	return doc.video_thumbs?.[0];
}
//#endregion
export { callbackifyAll as n, getStickerEffectThumb as t };
