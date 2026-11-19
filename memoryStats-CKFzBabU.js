//# allFunctionsCalledOnLoad
//#region src/lib/debug/memoryStats.ts
function readThreadMemory(thread, details, events) {
	const memory = performance.memory;
	return {
		thread,
		jsHeap: memory?.usedJSHeapSize,
		jsHeapTotal: memory?.totalJSHeapSize,
		details,
		events
	};
}
function canvasBytes(canvas) {
	return (canvas?.width || 0) * (canvas?.height || 0) * 4;
}
function formatBytes(bytes) {
	return (bytes / 1048576).toFixed(1) + " MB";
}
function withMemoryStatsTimeout(promise, thread, timeout = 3e3) {
	let timer;
	return Promise.race([promise.then((stats) => ({
		...stats,
		thread
	}), () => ({
		thread,
		details: { error: 1 }
	})), new Promise((resolve) => {
		timer = setTimeout(() => resolve({ thread: thread + " (no answer)" }), timeout);
	})]).finally(() => clearTimeout(timer));
}
//#endregion
export { withMemoryStatsTimeout as i, formatBytes as n, readThreadMemory as r, canvasBytes as t };
