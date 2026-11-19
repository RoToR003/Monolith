//# allFunctionsCalledOnLoad
import { n as indexOfAndSplice } from "./superMessagePort-DhrhiTig.js";
import { t as makeError } from "./makeError-CiXxcKtE.js";
//#region src/helpers/middleware.ts
var createDetails = () => ({
	cleaned: false,
	inner: [],
	onCleanCallbacks: []
});
var MIDDLEWARE_ERROR = makeError("MIDDLEWARE");
var MiddlewareHelper = class {
	constructor() {
		this.details = createDetails();
		this.onDestroyCallbacks = [];
		this.onDestroy = (callback) => {
			if (this.destroyed) return callback();
			this.onDestroyCallbacks.push(callback);
		};
	}
	clean() {
		const details = this.details;
		details.cleaned = true;
		details.inner.splice(0, details.inner.length).forEach((helper) => helper.destroy());
		details.onCleanCallbacks.splice(0, details.onCleanCallbacks.length).forEach((callback) => callback());
		details.middleware = void 0;
		this.details = createDetails();
	}
	destroy() {
		this.destroyed = true;
		this.clean();
		this.onDestroyCallbacks.splice(0, this.onDestroyCallbacks.length).forEach((callback) => callback());
		if (this.parent) {
			indexOfAndSplice(this.parent.details.inner, this);
			this.parent = void 0;
		}
	}
	createMiddlewareForDetails(details, additionalCallback) {
		const middleware = () => {
			return !details.cleaned && (!additionalCallback || additionalCallback());
		};
		middleware.create = () => {
			if (!middleware()) throw MIDDLEWARE_ERROR;
			const helper = getMiddleware();
			helper.parent = this;
			details.inner.push(helper);
			return helper;
		};
		middleware.onClean = (callback) => {
			if (!middleware()) return callback();
			details.onCleanCallbacks.push(callback);
		};
		middleware.onDestroy = this.onDestroy;
		return middleware;
	}
	get(additionalCallback) {
		const details = this.details;
		if (details.cleaned) return this.createMiddlewareForDetails(details);
		if (additionalCallback) return this.createMiddlewareForDetails(details, additionalCallback);
		return details.middleware ?? (details.middleware = this.createMiddlewareForDetails(details));
	}
};
function getMiddleware() {
	return new MiddlewareHelper();
}
//#endregion
export { getMiddleware as t };
