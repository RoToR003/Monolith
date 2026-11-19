//# allFunctionsCalledOnLoad
import { t as IS_TOUCH_SUPPORTED } from "./touchSupport-B2RWO3zD.js";
import { t as findUpClassName } from "./findUpClassName-3V5me58N.js";
import { n as fastRaf } from "./schedulers-Cx0-7a1P.js";
import { M as onCleanup, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { t as liteMode } from "./liteMode-DeLStZfQ.js";
import { t as sequentialDom } from "./sequentialDom-CRhA0kB2.js";
import { t as findUpAsChild } from "./findUpAsChild-CPjgnY00.js";
//#region src/components/ripple.ts
/**
* One wave of a ripple in `container` (a `.c-ripple`), grown from where the press began. Returns
* what ends it: the wave fades out once the press is over, but not before it has half grown.
* `isStale` drops a wave a newer press has overtaken before it was drawn.
*/
function startRippleWave(container, clientX, clientY, { isStale, onEnd } = {}) {
	const startTime = Date.now();
	const circle = document.createElement("div");
	const duration = +(container.ownerDocument.defaultView || window).getComputedStyle(container).getPropertyValue("--ripple-duration").replace("s", "") * 1e3;
	fastRaf(() => {
		if (isStale?.()) return;
		const rect = container.getBoundingClientRect();
		circle.classList.add("c-ripple__circle");
		const clickX = clientX - rect.left;
		const clickY = clientY - rect.top;
		const size = Math.sqrt((Math.abs(clickY - rect.height / 2) + rect.height / 2) ** 2 + (Math.abs(clickX - rect.width / 2) + rect.width / 2) ** 2);
		const x = clickX - size / 2;
		const y = clickY - size / 2;
		circle.style.width = circle.style.height = size + "px";
		circle.style.left = x + "px";
		circle.style.top = y + "px";
		circle.style.opacity = "0";
		container.append(circle);
		circle.offsetWidth;
		circle.style.opacity = "";
	});
	return () => {
		const elapsedTime = Date.now() - startTime;
		const cb = () => {
			sequentialDom.mutate(() => {
				circle.remove();
			});
			onEnd?.();
		};
		if (elapsedTime < duration) {
			const delay = Math.max(duration - elapsedTime, duration / 2);
			setTimeout(() => circle.classList.add("hiding"), Math.max(delay - duration / 2, 0));
			setTimeout(cb, delay);
		} else {
			circle.classList.add("hiding");
			setTimeout(cb, duration / 2);
		}
	};
}
var rippleClickId = 0;
function _ripple(elem, prepend = true, callback = () => Promise.resolve(), onEnd = null, attachListenerTo = elem) {
	if (elem.querySelector(":scope > .c-ripple")) return;
	elem.classList.add("rp");
	const r = document.createElement("div");
	r.classList.add("c-ripple");
	if (elem.classList.contains("rp-square")) r.classList.add("is-square");
	if (prepend !== "no") elem[prepend ? "prepend" : "append"](r);
	let handler, lastHandler;
	const drawRipple = (clientX, clientY) => {
		const clickId = rippleClickId++;
		const _handler = handler = lastHandler = () => {
			release();
			if (!IS_TOUCH_SUPPORTED) {
				const win = r.ownerDocument.defaultView || window;
				win.removeEventListener("contextmenu", handler);
				win.removeEventListener("mousemove", handler);
			}
			handler = null;
			touchStartFired = false;
		};
		callback?.(clickId);
		const release = startRippleWave(r, clientX, clientY, {
			isStale: () => lastHandler !== _handler,
			onEnd: () => onEnd?.(clickId)
		});
	};
	const isRippleUnneeded = (e) => {
		return e.target !== elem && (["BUTTON", "A"].includes(e.target.tagName) || findUpClassName(e.target, "c-ripple") !== r) && (attachListenerTo === elem || !findUpAsChild(e.target, attachListenerTo)) && !findUpClassName(e.target, "checkbox-field");
	};
	let touchStartFired = false;
	if (IS_TOUCH_SUPPORTED) {
		const touchEnd = () => {
			handler?.();
		};
		const onTouchStart = (e) => {
			if (!liteMode.isAvailable("animations")) return;
			if (e.touches.length > 1 || touchStartFired || isRippleUnneeded(e)) return;
			touchStartFired = true;
			const { clientX, clientY } = e.touches[0];
			drawRipple(clientX, clientY);
			attachListenerTo.addEventListener("touchend", touchEnd, { once: true });
			window.addEventListener("touchmove", (e) => {
				e.cancelBubble = true;
				e.stopPropagation();
				touchEnd();
				attachListenerTo.removeEventListener("touchend", touchEnd);
			}, { once: true });
		};
		attachListenerTo.addEventListener("touchstart", onTouchStart, { passive: true });
		return {
			dispose: () => {
				attachListenerTo.removeEventListener("touchstart", onTouchStart);
				r.remove();
			},
			element: r
		};
	} else {
		const onMouseDown = (e) => {
			if (![0, 2].includes(e.button)) return;
			if (!liteMode.isAvailable("animations")) return;
			if (attachListenerTo.dataset.ripple === "0" || isRippleUnneeded(e)) return;
			else if (touchStartFired) {
				touchStartFired = false;
				return;
			}
			const { clientX, clientY } = e;
			drawRipple(clientX, clientY);
			const win = attachListenerTo.ownerDocument.defaultView || window;
			win.addEventListener("mouseup", handler, {
				once: true,
				passive: true
			});
			win.addEventListener("contextmenu", handler, {
				once: true,
				passive: true
			});
		};
		attachListenerTo.addEventListener("mousedown", onMouseDown, { passive: true });
		return {
			dispose: () => {
				attachListenerTo.removeEventListener("mousedown", onMouseDown);
				r.remove();
			},
			element: r
		};
	}
}
function ripple(elem, accessor, prepend) {
	if (accessor) {
		createRenderEffect(() => {
			const value = accessor();
			if (value === void 0 || value) {
				const ret = _ripple(elem, prepend);
				onCleanup(() => {
					ret?.dispose();
				});
			}
		});
		return;
	}
	return _ripple(elem, prepend);
}
//#endregion
export { startRippleWave as n, ripple as t };
