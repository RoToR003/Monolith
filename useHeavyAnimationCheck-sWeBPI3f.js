//# allFunctionsCalledOnLoad
import { f as DEBUG } from "./userAgent-ByGXcznk.js";
import { t as pause } from "./pause-BSJh-z46.js";
import { t as EventListenerBase } from "./eventListenerBase-da40Q-0t.js";
import { n as deferredPromise } from "./cancellablePromise-bof--dnO.js";
//#region src/hooks/useHeavyAnimationCheck.ts
var eventListener = new EventListenerBase();
var ANIMATION_START_EVENT = "start";
var ANIMATION_END_EVENT = "end";
var isAnimating = false;
var heavyAnimationPromise = deferredPromise();
var promisesInQueue = 0;
heavyAnimationPromise.resolve();
var log = console.log.bind(console.log, "[HEAVY-ANIMATION]:");
function dispatchHeavyAnimationEvent(promise, timeout) {
	if (!isAnimating) {
		heavyAnimationPromise = deferredPromise();
		eventListener.dispatchEvent(ANIMATION_START_EVENT);
		isAnimating = true;
		DEBUG && log("start");
	}
	++promisesInQueue;
	DEBUG && log("attach promise, length:", promisesInQueue, timeout);
	const promises = [timeout !== void 0 ? pause(timeout) : void 0, promise.finally(() => {})].filter(Boolean);
	const perf = performance.now();
	const _heavyAnimationPromise = heavyAnimationPromise;
	Promise.race(promises).then(() => {
		if (heavyAnimationPromise !== _heavyAnimationPromise || heavyAnimationPromise.isFulfilled) return;
		--promisesInQueue;
		DEBUG && log("promise end, length:", promisesInQueue, performance.now() - perf);
		if (promisesInQueue <= 0) onHeavyAnimationEnd();
	});
	return heavyAnimationPromise;
}
window.dispatchHeavyAnimationEvent = dispatchHeavyAnimationEvent;
function onHeavyAnimationEnd() {
	if (heavyAnimationPromise.isFulfilled) return;
	isAnimating = false;
	promisesInQueue = 0;
	eventListener.dispatchEvent(ANIMATION_END_EVENT);
	heavyAnimationPromise.resolve();
	DEBUG && log("end");
}
function interruptHeavyAnimation() {
	onHeavyAnimationEnd();
}
function getHeavyAnimationPromise() {
	return heavyAnimationPromise;
}
function useHeavyAnimationCheck_default(handleAnimationStart, handleAnimationEnd, listenerSetter) {
	if (isAnimating) handleAnimationStart();
	const add = listenerSetter ? listenerSetter.add(eventListener) : eventListener.addEventListener.bind(eventListener);
	const remove = listenerSetter ? listenerSetter.removeManual.bind(listenerSetter, eventListener) : eventListener.removeEventListener.bind(eventListener);
	add(ANIMATION_START_EVENT, handleAnimationStart);
	add(ANIMATION_END_EVENT, handleAnimationEnd);
	return () => {
		remove(ANIMATION_END_EVENT, handleAnimationEnd);
		remove(ANIMATION_START_EVENT, handleAnimationStart);
	};
}
//#endregion
export { useHeavyAnimationCheck_default as i, getHeavyAnimationPromise as n, interruptHeavyAnimation as r, dispatchHeavyAnimationEvent as t };
