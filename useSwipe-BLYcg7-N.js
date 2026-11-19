//# allFunctionsCalledOnLoad
import { M as onCleanup } from "./solid-9Vxm0VIz.js";
import { t as bindActiveWindowListener } from "./appWindow-bo-KtJhy.js";
import { t as requestRAF } from "./requestRAF-CwdYaVwH.js";
import { M as useIsCleaned } from "./openEditors-7FmA7q_V.js";
//#region src/helpers/useGlobalDocumentEvent.ts
var eventsMap = /* @__PURE__ */ new Map();
function registerGlobalDocumentEvent(eventName, callback) {
	const value = eventsMap.get(eventName) || {
		callbacks: [],
		listener: (e) => {
			value.callbacks.forEach((clb) => clb(e));
		}
	};
	if (!eventsMap.has(eventName)) {
		eventsMap.set(eventName, value);
		value.dispose = bindActiveWindowListener((w) => w.document, eventName, value.listener);
	}
	value.callbacks.push(callback);
	return { cleanup: () => {
		value.callbacks = value.callbacks.filter((clb) => clb !== callback);
		if (value.callbacks.length) return;
		eventsMap.delete(eventName);
		value.dispose?.();
	} };
}
function useGlobalDocumentEvent(eventName, callback) {
	const { cleanup } = registerGlobalDocumentEvent(eventName, callback);
	onCleanup(cleanup);
}
//#endregion
//#region src/helpers/useSwipe.ts
function swipe(element, args) {
	const isCleaned = useIsCleaned();
	let isDragging = false;
	let initialX, initialY;
	const getDiffPointer = (e) => [e.clientX - initialX, e.clientY - initialY];
	const getDiffTouch = (e) => [e.changedTouches[0].clientX - initialX, e.changedTouches[0].clientY - initialY];
	function handleStart(e, x, y) {
		if (isDragging) return;
		isDragging = true;
		initialX = x;
		initialY = y;
		const { onStart, globalCursor } = args();
		onStart?.(e);
		if (globalCursor) {
			element.ownerDocument.body.style.setProperty("cursor", globalCursor(), "important");
			element.style.setProperty("cursor", globalCursor(), "important");
		}
	}
	let isRAFing = false;
	let callback;
	function handleMove(e, diff) {
		if (!isDragging) return;
		callback = () => {
			const { onMove } = args();
			onMove?.(...diff, e);
		};
		if (isRAFing) return;
		isRAFing = true;
		requestRAF(() => {
			isRAFing = false;
			if (!isDragging || isCleaned()) return;
			callback();
		});
	}
	function handleEnd(e, diff) {
		if (!isDragging) return;
		const { onEnd, globalCursor } = args();
		onEnd?.(...diff, e);
		if (globalCursor) {
			element.ownerDocument.body.style.removeProperty("cursor");
			element.style.removeProperty("cursor");
		}
		isDragging = false;
		isRAFing = false;
		initialX = initialY = void 0;
	}
	element.addEventListener("pointerdown", (e) => {
		handleStart(e, e.clientX, e.clientY);
	});
	element.addEventListener("touchstart", (e) => {
		handleStart(e, e.changedTouches[0].clientX, e.changedTouches[0].clientY);
	});
	useGlobalDocumentEvent("pointermove", (e) => {
		handleMove(e, getDiffPointer(e));
	});
	useGlobalDocumentEvent("touchmove", (e) => {
		handleMove(e, getDiffTouch(e));
	});
	useGlobalDocumentEvent("pointermove", (e) => {
		handleMove(e, getDiffPointer(e));
	});
	useGlobalDocumentEvent("pointerup", (e) => {
		handleEnd(e, getDiffPointer(e));
	});
	useGlobalDocumentEvent("touchend", (e) => {
		handleEnd(e, getDiffTouch(e));
	});
}
//#endregion
export { swipe as t };
