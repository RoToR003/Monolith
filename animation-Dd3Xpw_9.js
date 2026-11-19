//# allFunctionsCalledOnLoad
import { n as fastRaf } from "./schedulers-Cx0-7a1P.js";
import { n as deferredPromise } from "./cancellablePromise-bof--dnO.js";
//#region src/helpers/animation.ts
var instances = /* @__PURE__ */ new Map();
function createAnimationInstance(key) {
	cancelAnimationByKey(key);
	const instance = {
		isCancelled: false,
		deferred: deferredPromise()
	};
	instances.set(key, instance);
	instance.deferred.then(() => {
		if (getAnimationInstance(key) === instance) instances.delete(key);
	});
	return instance;
}
function getAnimationInstance(key) {
	return instances.get(key);
}
function cancelAnimationByKey(key) {
	const instance = getAnimationInstance(key);
	if (instance) {
		instance.isCancelled = true;
		instance.deferred.resolve();
	}
}
function animateSingle(tick, key, instance) {
	if (!instance) instance = createAnimationInstance(key);
	fastRaf(() => {
		if (instance.isCancelled) return;
		if (tick()) animateSingle(tick, key, instance);
		else instance.deferred.resolve();
	});
	return instance.deferred;
}
function animate(tick) {
	fastRaf(() => {
		if (tick()) animate(tick);
	});
}
//#endregion
export { getAnimationInstance as a, createAnimationInstance as i, animateSingle as n, cancelAnimationByKey as r, animate as t };
