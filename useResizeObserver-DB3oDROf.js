//# allFunctionsCalledOnLoad
import { M as onCleanup } from "./solid-9Vxm0VIz.js";
import { t as requestRAF } from "./requestRAF-CwdYaVwH.js";
//#region src/hooks/useResizeObserver.ts
function useResizeObserver() {
	const callbacks = /* @__PURE__ */ new Map();
	const queuedCallbacks = /* @__PURE__ */ new Map();
	const observer = new ResizeObserver((entries) => {
		for (const entry of entries) {
			if (!queuedCallbacks.has(entry.target)) requestRAF(() => {
				const cb = queuedCallbacks.get(entry.target);
				queuedCallbacks.delete(entry.target);
				cb?.();
			});
			queuedCallbacks.set(entry.target, () => {
				const cb = callbacks.get(entry.target);
				const boxSize = entry.borderBoxSize[0];
				if (cb && boxSize) cb({
					entry,
					size: {
						width: boxSize.inlineSize,
						height: boxSize.blockSize
					}
				});
			});
		}
	});
	onCleanup(() => {
		observer.disconnect();
		callbacks.clear();
		queuedCallbacks.clear();
	});
	return (el, cb) => {
		callbacks.set(el, cb);
		observer.observe(el);
		onCleanup(() => {
			callbacks.delete(el);
			observer.unobserve(el);
		});
	};
}
//#endregion
export { useResizeObserver as t };
