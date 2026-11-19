//# allFunctionsCalledOnLoad
//#region src/helpers/schedulers/withTimeout.ts
/**
* Bounds a promise that may never settle, resolving with `fallback` once `ms` has elapsed.
*
* Rejections still propagate — this guards only against an answer that never arrives at all
* (a worker that stops replying, a request that never completes). Such a promise is invisible
* to `.catch()`, so without a deadline it parks every `await` behind it for the tab's lifetime.
*/
function withTimeout(promise, ms, fallback) {
	let timeout;
	const deadline = new Promise((resolve) => {
		timeout = setTimeout(() => resolve(fallback), ms);
	});
	return Promise.race([Promise.resolve(promise).finally(() => clearTimeout(timeout)), deadline]);
}
//#endregion
export { withTimeout as t };
