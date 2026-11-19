//# allFunctionsCalledOnLoad
import { n as __exportAll } from "./rolldown-runtime-CwcJO0Gh.js";
import { c as IS_MOBILE_SAFARI, p as MOUNT_CLASS_TO } from "./userAgent-ByGXcznk.js";
import { t as noop } from "./noop-H9NNBLfX.js";
import { D as getFileNameByLocation, E as isWebFileLocation, t as isObjectURL } from "./objectUrlUtils-5x08MNuO.js";
import { t as apiManagerProxy } from "./apiManagerProxy-DmQXvxSF.js";
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { n as indexOfAndSplice } from "./superMessagePort-DhrhiTig.js";
import { t as makeError } from "./makeError-CiXxcKtE.js";
import { n as deferredPromise, t as bindPromiseToDeferred } from "./cancellablePromise-bof--dnO.js";
import { t as createDownloadAnchor } from "./createDownloadAnchor-n8OhgS0K.js";
import { n as bindManagersToSession } from "./bindManagersToAccount-BL82O9H9.js";
import { a as getDownloadFileNameFromOptions, c as getDocumentDownloadOptions, i as getDownloadMediaDetails, r as MIME_TYPE_EXTENSION_MAP, s as getPhotoDownloadOptions, u as getFileNameForUpload } from "./mimeTypeMap-CnhjI2wm.js";
//#region src/lib/appDownloadManager.ts
var appDownloadManager_exports = /* @__PURE__ */ __exportAll({
	AppDownloadManager: () => AppDownloadManager,
	default: () => appDownloadManager
});
var RESOLVED_DOWNLOAD_LIMIT = 64;
var RESOLVED_DOWNLOAD_BYTES_LIMIT = 33554432;
var AppDownloadManager = class {
	constructor() {
		this.downloads = {};
		this.resolved = /* @__PURE__ */ new Map();
		this.resolvedBytes = 0;
		this.progress = {};
		this.progressAliases = {};
	}
	construct(managers) {
		this.managers = managers;
		rootScope.addEventListener("account_switched", () => {
			for (const fileName in this.downloads) {
				const download = this.downloads[fileName];
				if (Object.values(download).some((deferred) => !deferred.isFulfilled && !deferred.isRejected)) {
					delete this.downloads[fileName];
					delete this.progress[fileName];
				}
			}
		});
		rootScope.addEventListener("download_progress", (details) => {
			for (const fileName of [details.fileName, this.progressAliases[details.fileName]]) {
				const download = fileName && this.downloads[fileName];
				if (download?.main?.notifyAll) {
					this.progress[fileName] = details;
					download.main.notifyAll(details);
				}
			}
		});
	}
	getNewDeferred(fileName, type) {
		const deferred = deferredPromise();
		let download = this.downloads[fileName];
		if (!download) {
			download = this.downloads[fileName] = { main: deferred };
			const runCancel = async () => {
				const managers = bindManagersToSession(this.managers);
				if (await this.confirmBeforeCancelingPollUpload(fileName)) return;
				const error = makeError("DOWNLOAD_CANCELED");
				managers.apiFileManager.cancelDownload(fileName);
				deferred.reject(error);
				deferred.cancel = noop;
			};
			deferred.cancel = () => {
				runCancel();
			};
			const isOwnEntry = () => this.downloads[fileName] === download;
			deferred.catch(() => {
				if (isOwnEntry()) this.clearDownload(fileName, type);
			}).finally(() => {
				if (isOwnEntry()) delete this.progress[fileName];
			});
		} else {
			const main = download.main;
			[
				"cancel",
				"addNotifyListener",
				"notify",
				"notifyAll"
			].forEach((key) => {
				if (!main[key]) return;
				deferred[key] = main[key].bind(main);
			});
		}
		if (type === "disc") deferred.catch(noop).finally(() => {
			if (this.downloads[fileName] === download) this.clearDownload(fileName, type);
		});
		return download[type] = deferred;
	}
	async confirmBeforeCancelingPollUpload(fileName) {
		const randomId = await this.managers.appPollsManager.getRandomIdByUploadingFileName(fileName);
		if (!randomId || !this.showPollCancelConfirmation) return false;
		this.showPollCancelConfirmation(randomId);
		return true;
	}
	getNewDeferredForUpload(fileName, promise) {
		const deferred = this.getNewDeferred(fileName);
		const download = this.downloads[fileName];
		promise.then(deferred.resolve.bind(deferred), deferred.reject.bind(deferred));
		deferred.catch(noop).finally(() => {
			if (this.downloads[fileName] === download) this.clearDownload(fileName);
		});
		return deferred;
	}
	resolvedKey(fileName, type) {
		return type + ":" + fileName;
	}
	trackResolved(fileName, type, deferred, value) {
		if (this.downloads[fileName]?.[type] !== deferred) return;
		const key = this.resolvedKey(fileName, type);
		const size = value instanceof Blob ? value.size : 0;
		this.forgetResolved(key);
		this.resolved.set(key, {
			fileName,
			type,
			size
		});
		this.resolvedBytes += size;
		while (this.resolved.size > RESOLVED_DOWNLOAD_LIMIT || this.resolvedBytes > RESOLVED_DOWNLOAD_BYTES_LIMIT) {
			const oldest = this.resolved.keys().next();
			if (oldest.done || oldest.value === key) break;
			const entry = this.resolved.get(oldest.value);
			this.forgetResolved(oldest.value);
			this.clearDownload(entry.fileName, entry.type);
		}
	}
	forgetResolved(key) {
		const entry = this.resolved.get(key);
		if (!entry) return;
		this.resolvedBytes -= entry.size;
		this.resolved.delete(key);
	}
	clearDownload(fileName, type) {
		const downloads = this.downloads[fileName];
		if (!downloads) return;
		if (type) this.forgetResolved(this.resolvedKey(fileName, type));
		delete downloads[type];
		const length = Object.keys(downloads).length;
		if (!length || downloads.main && length === 1) {
			delete this.downloads[fileName];
			for (const key in downloads) this.forgetResolved(this.resolvedKey(fileName, key));
		}
	}
	getUpload(fileName) {
		let deferred = this.getDownload(fileName);
		if (deferred) return deferred;
		deferred = this.getNewDeferred(fileName);
		this.managers.appMessagesManager.getUploadPromise(fileName).then(deferred.resolve.bind(deferred), deferred.reject.bind(deferred));
		return deferred;
	}
	d(fileName, getPromise, type) {
		let deferred = this.getDownload(fileName, type);
		if (deferred) return deferred;
		deferred = this.getNewDeferred(fileName, type);
		getPromise().then(deferred.resolve.bind(deferred), deferred.reject.bind(deferred));
		deferred.then((value) => this.trackResolved(fileName, type, deferred, value), noop);
		if (type === "url") {
			const urlDeferred = deferred;
			urlDeferred.then((url) => {
				urlDeferred.resolvedObjectURL = url;
			}, noop);
		}
		return deferred;
	}
	download(options) {
		if (options.location.file_reference) throw new Error("download document with file_reference is not supported, use downloadMedia instead");
		const fileName = getDownloadFileNameFromOptions(options);
		return this.d(fileName, () => this.managers.apiFileManager.download(options), "blob");
	}
	downloadMedia(options, type = "blob", promiseBefore) {
		const { fileName } = getDownloadMediaDetails(options);
		if (type === "url") {
			const resolvedObjectURL = this.getDownload(fileName, type)?.resolvedObjectURL;
			if (isObjectURL(resolvedObjectURL) && apiManagerProxy.getCacheContext(options.media, options.thumb?.type).url !== resolvedObjectURL) this.clearDownload(fileName, type);
		}
		return this.d(fileName, () => {
			const { apiFileManager } = bindManagersToSession(this.managers);
			let cb;
			if (type === "url") cb = apiFileManager.downloadMediaURL;
			else if (type === "void") cb = apiFileManager.downloadMediaVoid;
			else cb = apiFileManager.downloadMedia;
			if (promiseBefore) return promiseBefore.then(() => {
				return cb(options);
			}, () => {
				delete options.downloadId;
				const { fileName: plainFileName } = getDownloadMediaDetails(options);
				this.progressAliases[plainFileName] = fileName;
				const promise = cb(options);
				promise.catch(noop).finally(() => {
					if (this.progressAliases[plainFileName] === fileName) delete this.progressAliases[plainFileName];
				});
				return promise;
			});
			return cb(options);
		}, type);
	}
	downloadMediaURL(options) {
		return this.downloadMedia(options, "url");
	}
	downloadMediaVoid(options) {
		return this.downloadMedia(options, "void");
	}
	upload(file, fileName, promise) {
		if (!fileName) fileName = getFileNameForUpload(file);
		if (!promise) promise = this.managers.apiFileManager.upload({
			file,
			fileName
		});
		return this.getNewDeferredForUpload(fileName, promise);
	}
	getDownload(fileName, type) {
		const d = this.downloads[fileName];
		const download = d && d[type];
		if (download) {
			const key = this.resolvedKey(fileName, type);
			const entry = this.resolved.get(key);
			if (entry) {
				this.resolved.delete(key);
				this.resolved.set(key, entry);
			}
		}
		return download;
	}
	canSaveViaServiceWorker() {
		return !IS_MOBILE_SAFARI && !!apiManagerProxy.serviceMessagePort;
	}
	/**
	* The download of this document on its way - from this tab or another one - for a place that only shows it, such
	* as another row of the same file: its save streamed to the disk, else a plain download of it (a save without the
	* service worker, or one that fell back to that, a file opened rather than saved). It never starts one and rejects
	* with `NO_ENTRY_FOUND` when there is none: a save over already would be downloaded anew, unasked, and that
	* download's own `document_downloading` would set off the next one. Kept out of `downloads`, so that no request
	* that would start the file ever waits on one that may find nothing
	*/
	attachToDownloadToDisc(doc) {
		const downloadIds = this.canSaveViaServiceWorker() ? ["1", void 0] : [void 0];
		const fileNames = downloadIds.map((downloadId) => getDownloadMediaDetails({
			media: doc,
			downloadId
		}).fileName);
		const started = this.getDownload(fileNames[0], "disc");
		if (started) return started;
		const { apiFileManager } = bindManagersToSession(this.managers);
		const deferred = deferredPromise();
		let fileName;
		deferred.cancel = () => {
			apiFileManager.cancelDownload(fileName);
			deferred.reject(makeError("DOWNLOAD_CANCELED"));
		};
		const onProgress = (details) => {
			if (details.fileName === fileName) deferred.notifyAll?.(details);
		};
		rootScope.addEventListener("download_progress", onProgress);
		deferred.catch(noop).finally(() => rootScope.removeEventListener("download_progress", onProgress));
		const join = (index) => {
			fileName = fileNames[index];
			return apiFileManager.downloadMedia({
				media: doc,
				downloadId: downloadIds[index],
				onlyAttach: true
			}).catch((err) => {
				if (err?.type !== "NO_ENTRY_FOUND" || index === fileNames.length - 1 || deferred.isRejected) throw err;
				return join(index + 1);
			});
		};
		bindPromiseToDeferred(join(0), deferred);
		return deferred;
	}
	downloadToDisc(options, justAttach) {
		const media = options.media;
		const isDocument = media._ === "document";
		const isWebFile = isWebFileLocation(media);
		if (!isDocument && !isWebFile && !options.thumb) options.thumb = media.sizes.slice().pop();
		const USE_SW = this.canSaveViaServiceWorker();
		const getOutFileName = () => {
			if (options.fileName) return options.fileName;
			const downloadOptions = isDocument ? getDocumentDownloadOptions(media) : getPhotoDownloadOptions(media, options.thumb);
			const docFileName = options.media.file_name;
			if (docFileName) return docFileName;
			let name = getFileNameByLocation(downloadOptions.location);
			const ext = MIME_TYPE_EXTENSION_MAP[downloadOptions.mimeType];
			if (ext) name += "." + ext;
			return name;
		};
		let url, pingPromise, iframe;
		if (USE_SW) {
			const id = "" + (Math.random() * 2147483647 | 0);
			url = `d/${id}`;
			options.downloadId = id;
			pingPromise = apiManagerProxy.pingServiceWorkerWithIframe();
			if (!justAttach) {
				const { iframe: _iframe, onSuccess, onError } = this.createDownloadIframe(url);
				iframe = _iframe;
				pingPromise = pingPromise.then(() => {
					const deferred = deferredPromise();
					const onFinish = (good) => {
						clearTimeout(timeout);
						apiManagerProxy.serviceMessagePort.removeEventListener("downloadRequestReceived", onDownloadRequestReceived);
						if (good) deferred.resolve();
						else deferred.reject();
					};
					const onDownloadRequestReceived = (downloadId) => {
						if (downloadId === id) onFinish(true);
					};
					apiManagerProxy.serviceMessagePort.addEventListener("downloadRequestReceived", onDownloadRequestReceived);
					const timeout = window.setTimeout(() => {
						onFinish(false);
					}, 1500);
					onSuccess();
					return deferred;
				}, (err) => {
					onError();
					throw err;
				});
			}
		}
		const promise = this.downloadMedia(options, "disc", pingPromise);
		if (justAttach) return promise;
		let element, hadProgress = false;
		const onProgress = () => {
			if (hadProgress) return;
			hadProgress = true;
			element = iframe;
			indexOfAndSplice(promise.listeners, onProgress);
		};
		promise.addNotifyListener(onProgress);
		promise.then((blob) => {
			if (!blob) return;
			const url = URL.createObjectURL(blob);
			createDownloadAnchor(url, getOutFileName(), () => {
				URL.revokeObjectURL(url);
			});
		}).catch(noop).finally(() => {
			if (!hadProgress) onProgress();
			setTimeout(() => {
				element?.remove();
			}, 1e3);
		});
		return promise;
	}
	createDownloadIframe(url) {
		const iframe = document.createElement("iframe");
		iframe.hidden = true;
		return {
			iframe,
			onSuccess: () => {
				iframe.src = url;
				document.body.append(iframe);
			},
			onError: () => {
				console.error("falling back to normal download");
			}
		};
	}
};
var appDownloadManager = new AppDownloadManager();
MOUNT_CLASS_TO && (MOUNT_CLASS_TO.appDownloadManager = appDownloadManager);
//#endregion
export { appDownloadManager_exports as n, appDownloadManager as t };
