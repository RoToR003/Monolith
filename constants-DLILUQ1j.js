//# allFunctionsCalledOnLoad
//#region src/lib/constants.ts
var cachedVideoChunksStorageNames = [
	"cachedStreamChunks",
	"cachedHlsStreamChunks",
	"cachedHlsQualityFiles"
];
var cachedFilesStorageName = "cachedFiles";
var watchedCachedStorageNames = [cachedFilesStorageName, ...cachedVideoChunksStorageNames];
var HTTPHeaderNames = {
	cachedTime: "Time-Cached",
	contentLength: "Content-Length",
	contentType: "Content-Type"
};
var oneHourInSeconds = 3600;
var oneDayInSeconds = 86400;
var oneWeekInSeconds = oneDayInSeconds * 7;
var oneMonthInSeconds = oneDayInSeconds * 31;
var oneYearInSeconds = oneDayInSeconds * 365;
//#endregion
export { oneHourInSeconds as a, oneYearInSeconds as c, oneDayInSeconds as i, watchedCachedStorageNames as l, cachedFilesStorageName as n, oneMonthInSeconds as o, cachedVideoChunksStorageNames as r, oneWeekInSeconds as s, HTTPHeaderNames as t };
