//# allFunctionsCalledOnLoad
import { D as getFileNameByLocation, E as isWebFileLocation } from "./objectUrlUtils-5x08MNuO.js";
import { r as tabId } from "./superMessagePort-DhrhiTig.js";
//#region src/helpers/getFileNameForUpload.ts
var uploadId = 0;
function getFileNameForUpload(file) {
	let fileName;
	const mimeType = file?.type;
	if (mimeType) {
		const ext = `${tabId}_${uploadId++}.${mimeType.split("/")[1]}`;
		if ([
			"image/jpeg",
			"image/png",
			"image/bmp"
		].indexOf(mimeType) >= 0) fileName = "photo" + ext;
		else if (mimeType.indexOf("audio/") === 0 || ["video/ogg"].indexOf(mimeType) >= 0) fileName = "audio" + ext;
		else if (mimeType.indexOf("video/") === 0) fileName = "video" + ext;
		else fileName = "document" + ext;
	} else fileName = `upload-${tabId}_${uploadId++}`;
	return fileName;
}
//#endregion
//#region src/lib/appManagers/utils/docs/getDocumentInputFileLocation.ts
function getDocumentInputFileLocation(doc, thumbSize) {
	return {
		_: "inputDocumentFileLocation",
		id: doc.id,
		access_hash: doc.access_hash,
		file_reference: doc.file_reference,
		thumb_size: thumbSize
	};
}
//#endregion
//#region src/lib/appManagers/utils/docs/getDocumentDownloadOptions.ts
function getDocumentDownloadOptions(doc, { thumb, queueId, onlyCache } = {}) {
	const inputFileLocation = getDocumentInputFileLocation(doc, thumb?.type);
	let mimeType;
	if (thumb?._ === "photoSize") mimeType = doc.sticker ? "image/webp" : doc.mime_type.startsWith("image/") ? doc.mime_type : "image/jpeg";
	else mimeType = doc.mime_type || "application/octet-stream";
	return {
		dcId: doc.dc_id,
		location: inputFileLocation,
		size: thumb ? thumb.size : doc.size,
		mimeType,
		fileName: doc.file_name,
		queueId,
		onlyCache
	};
}
//#endregion
//#region src/lib/appManagers/utils/photos/getPhotoDownloadOptions.ts
function getPhotoDownloadOptions(photo, photoSize, queueId, onlyCache) {
	const isDocument = photo._ === "document";
	if (!photoSize || photoSize._ === "photoSizeEmpty") throw new Error("photoSizeEmpty!");
	const isVideoSize = photoSize._ === "videoSize";
	const isPhoto = !!((photoSize._ === "photoSize" || photoSize._ === "photoSizeProgressive") && photo.access_hash && photo.file_reference);
	const location = {
		_: isDocument ? "inputDocumentFileLocation" : "inputPhotoFileLocation",
		id: photo.id,
		access_hash: photo.access_hash,
		file_reference: photo.file_reference,
		thumb_size: photoSize.type
	};
	return {
		dcId: photo.dc_id,
		location,
		size: isPhoto || isVideoSize ? photoSize.size : void 0,
		mimeType: isVideoSize ? "video/mp4" : "image/jpeg",
		queueId,
		onlyCache
	};
}
//#endregion
//#region src/lib/appManagers/utils/webFiles/getWebFileDownloadOptions.ts
function getWebFileDownloadOptions(location) {
	return {
		dcId: 0,
		location,
		size: 0,
		mimeType: "image/jpeg"
	};
}
//#endregion
//#region src/lib/appManagers/utils/webDocs/getWebDocumentDownloadOptions.ts
function getWebDocumentDownloadOptions(webDocument) {
	const downloadOptions = getWebFileDownloadOptions({
		_: "inputWebFileLocation",
		access_hash: webDocument.access_hash,
		url: webDocument.url
	});
	downloadOptions.size = webDocument.size;
	downloadOptions.mimeType = webDocument.mime_type;
	return downloadOptions;
}
//#endregion
//#region src/lib/appManagers/utils/webDocs/isWebDocument.ts
function isWebDocument(webDocument) {
	return !!(webDocument && (webDocument._ === "webDocument" || webDocument._ === "webDocumentNoProxy"));
}
//#endregion
//#region src/lib/appManagers/utils/download/getDownloadFileNameFromOptions.ts
function getDownloadFileNameFromOptions(options) {
	return getFileNameByLocation(options.location, options);
}
//#endregion
//#region src/lib/appManagers/utils/download/getDownloadMediaDetails.ts
function getDownloadMediaDetails(options) {
	const { media, thumb, queueId, onlyCache } = options;
	let downloadOptions;
	if (media._ === "document") downloadOptions = getDocumentDownloadOptions(media, {
		thumb,
		queueId,
		onlyCache
	});
	else if (media._ === "photo") downloadOptions = getPhotoDownloadOptions(media, thumb, queueId, onlyCache);
	else if (isWebDocument(media)) downloadOptions = getWebDocumentDownloadOptions(media);
	else if (isWebFileLocation(media)) {
		downloadOptions = getWebFileDownloadOptions(media);
		if (options.fileName) downloadOptions.fileName = options.fileName;
	}
	downloadOptions.downloadId = options.downloadId;
	return {
		fileName: getDownloadFileNameFromOptions(downloadOptions),
		downloadOptions
	};
}
//#endregion
//#region src/environment/mimeTypeMap.ts
var EXTENSION_MIME_TYPE_MAP = {
	pdf: "application/pdf",
	tgv: "application/x-tgwallpattern",
	tgs: "application/x-tgsticker",
	json: "application/json",
	wav: "audio/wav",
	mp3: "audio/mpeg",
	m4a: "audio/mp4",
	aac: "audio/aac",
	flac: "audio/flac",
	opus: "audio/ogg",
	oga: "audio/ogg",
	ogg: "audio/ogg",
	ogv: "video/ogg",
	jpeg: "image/jpeg",
	jpg: "image/jpeg",
	png: "image/png",
	gif: "image/gif",
	webp: "image/webp",
	mp4: "video/mp4",
	webm: "video/webm",
	mov: "video/quicktime",
	svg: "image/svg+xml",
	avif: "image/avif",
	jxl: "image/jxl",
	bmp: "image/bmp",
	heif: "image/heic",
	heic: "image/heic"
};
var MIME_TYPE_ALIASES = {
	"audio/m4a": "audio/mp4",
	"audio/mp3": "audio/mpeg",
	"audio/opus": "audio/ogg",
	"audio/x-aac": "audio/aac",
	"audio/x-flac": "audio/flac",
	"audio/x-m4a": "audio/mp4",
	"audio/x-mp3": "audio/mpeg",
	"audio/x-mpeg": "audio/mpeg",
	"audio/x-ogg": "audio/ogg",
	"audio/x-opus+ogg": "audio/ogg",
	"audio/x-wav": "audio/wav",
	"image/heif": "image/heic",
	"video/x-quicktime": "video/quicktime"
};
var MIME_TYPE_EXTENSION_MAP = {};
for (const ext in EXTENSION_MIME_TYPE_MAP) MIME_TYPE_EXTENSION_MAP[EXTENSION_MIME_TYPE_MAP[ext]] = ext;
//#endregion
export { getDownloadFileNameFromOptions as a, getDocumentDownloadOptions as c, getDownloadMediaDetails as i, getDocumentInputFileLocation as l, MIME_TYPE_ALIASES as n, isWebDocument as o, MIME_TYPE_EXTENSION_MAP as r, getPhotoDownloadOptions as s, EXTENSION_MIME_TYPE_MAP as t, getFileNameForUpload as u };
