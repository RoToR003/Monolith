//# allFunctionsCalledOnLoad
//#region src/helpers/schedulers/throttle.ts
function throttle(fn, ms, shouldRunFirst = true) {
	let interval = null;
	let isPending;
	let args;
	const clear = () => {
		clearInterval(interval);
		interval = null;
	};
	const ret = (..._args) => {
		isPending = true;
		args = _args;
		if (!interval) {
			if (shouldRunFirst) {
				isPending = false;
				fn(...args);
			}
			interval = setInterval(() => {
				if (!isPending) {
					clear();
					return;
				}
				isPending = false;
				fn(...args);
			}, ms);
		}
	};
	ret.clear = clear;
	return ret;
}
//#endregion
export { throttle as t };
