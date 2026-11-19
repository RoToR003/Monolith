//# allFunctionsCalledOnLoad
//#region src/helpers/schedulers.ts
/**
* Callbacks batched into one frame are unrelated to each other, so one of them throwing must not
* cancel the rest: `fastRafPromise` resolves from a callback queued in here, and dropping that
* resolve leaves its cached promise pending forever — every later `fastRafPromise()` then returns
* the same dead promise and silently parks whatever awaits it for the lifetime of the tab.
*/
function runFastRafCallback(callback) {
	try {
		callback();
	} catch (err) {
		console.error("fastRaf callback error:", err);
	}
}
var fastRafCallbacks;
function fastRaf(callback) {
	if (!fastRafCallbacks) {
		fastRafCallbacks = [callback];
		requestAnimationFrame(() => {
			const currentCallbacks = fastRafCallbacks;
			fastRafCallbacks = void 0;
			currentCallbacks.forEach(runFastRafCallback);
		});
	} else fastRafCallbacks.push(callback);
}
var rafPromise;
function fastRafPromise() {
	if (rafPromise) return rafPromise;
	rafPromise = new Promise((resolve) => fastRaf(() => resolve()));
	rafPromise.then(() => {
		rafPromise = void 0;
	});
	return rafPromise;
}
function doubleRaf() {
	return new Promise((resolve) => {
		fastRaf(() => {
			fastRaf(resolve);
		});
	});
}
/**
* A frame of the window `node` stands in, and the way to call it off. The app's DOM moves into a Document PiP window and
* back: a frame asked of the tab while that is in the background may never come
*/
function nodeFrame(node, callback) {
	const view = node.ownerDocument?.defaultView || window;
	const id = view.requestAnimationFrame(callback);
	return () => view.cancelAnimationFrame(id);
}
//#endregion
export { nodeFrame as i, fastRaf as n, fastRafPromise as r, doubleRaf as t };
