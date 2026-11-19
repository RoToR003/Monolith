//# allFunctionsCalledOnLoad
import { S as setKeptFlag, f as DEBUG, h as Modes } from "./userAgent-ByGXcznk.js";
import { t as apiManagerProxy } from "./apiManagerProxy-DmQXvxSF.js";
import { i as getLogEntries, o as setLogBufferEnabled, r as clearLogBuffer } from "./logger-7zf0rNYS.js";
import { t as MTProtoMessagePort } from "./mainMessagePort-B60c5YFT.js";
import { t as createDownloadAnchor } from "./createDownloadAnchor-n8OhgS0K.js";
import { X as clearMemoryWatch, Z as getMemoryLogEntries } from "./index-B7axFZql.js";
//#region src/lib/debug/exportLogs.ts
var WORKER_TIMEOUT = 5e3;
/** Merge this window's buffer with the MTProto worker's, oldest-first. */
async function collectLogs() {
	const all = getLogEntries();
	if (!Modes.noWorker) try {
		const workerLogs = await MTProtoMessagePort.getMasterInstance()?.invoke("getLogs", void 0, void 0, void 0, void 0, WORKER_TIMEOUT);
		if (workerLogs?.length) all.push(...workerLogs);
	} catch (err) {
		console.error("[logs] failed to collect worker logs:", err);
	}
	if (!Modes.noServiceWorker) try {
		const swLogs = await apiManagerProxy.serviceMessagePort?.invoke("getLogs", void 0, void 0, void 0, void 0, WORKER_TIMEOUT);
		if (swLogs?.length) all.push(...swLogs);
	} catch (err) {
		console.error("[logs] failed to collect service worker logs:", err);
	}
	all.push(...getMemoryLogEntries());
	all.sort((a, b) => a.t - b.t);
	return all;
}
/** The envelope every debug export starts with - memoryWatch writes the same one. */
function buildExportMeta(count, extra) {
	return {
		__meta: true,
		version: "2.3",
		versionFull: "2.3 (687)",
		mode: "production",
		ua: navigator.userAgent,
		href: location.href,
		exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
		count,
		...extra
	};
}
/**
* The export as an NDJSON file (meta line first, then one entry per line), to download or to send; `count` is how
* many entries it holds.
*/
async function createLogsFile(filename) {
	const entries = await collectLogs();
	const lines = [JSON.stringify(buildExportMeta(entries.length))];
	for (const e of entries) lines.push(JSON.stringify(e));
	return {
		file: new File([lines.join("\n")], filename || `tweb-logs-${(/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-")}.ndjson`, { type: "application/x-ndjson" }),
		count: entries.length
	};
}
function downloadLogsFile(file) {
	const url = URL.createObjectURL(file);
	createDownloadAnchor(url, file.name, () => setTimeout(() => URL.revokeObjectURL(url), 1e4));
}
async function downloadLogs(filename) {
	const { file } = await createLogsFile(filename);
	downloadLogsFile(file);
}
/**
* Logs collected without the rest of debug mode, in every thread of this tab and from now on in every tab of the
* site (Modes.logs). Debug mode collects them whatever this says.
*/
function setLogsCollected(collected) {
	setKeptFlag("logs", collected);
	const enabled = DEBUG || collected;
	setLogBufferEnabled(enabled);
	if (!Modes.noWorker) MTProtoMessagePort.getMasterInstance()?.invokeVoid("setLogBufferEnabled", enabled);
	apiManagerProxy.serviceMessagePort?.invokeVoid("setLogBufferEnabled", enabled);
}
/**
* Drops what every thread of this tab has collected, and the memory watch's history the export carries with it, so
* the next export holds only what happens after.
*/
function clearLogs() {
	clearLogBuffer();
	if (!Modes.noWorker) MTProtoMessagePort.getMasterInstance()?.invokeVoid("clearLogs", void 0);
	apiManagerProxy.serviceMessagePort?.invokeVoid("clearLogs", void 0);
	clearMemoryWatch();
}
//#endregion
export { buildExportMeta, clearLogs, collectLogs, createLogsFile, downloadLogs, downloadLogsFile, setLogsCollected };
