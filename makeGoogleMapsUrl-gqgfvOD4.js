//# allFunctionsCalledOnLoad
//#region src/helpers/getWebFileLocation.ts
function getWebFileLocation(geo, width, height, zoom) {
	return {
		_: "inputWebFileGeoPointLocation",
		access_hash: geo.access_hash,
		geo_point: {
			_: "inputGeoPoint",
			lat: geo.lat,
			long: geo.long,
			accuracy_radius: geo.accuracy_radius
		},
		w: width,
		h: height,
		scale: window.devicePixelRatio,
		zoom
	};
}
//#endregion
//#region src/helpers/makeGoogleMapsUrl.ts
function makeGoogleMapsUrl(geo) {
	return "https://maps.google.com/maps?q=" + geo.lat + "," + geo.long;
}
//#endregion
export { getWebFileLocation as n, makeGoogleMapsUrl as t };
