//# allFunctionsCalledOnLoad
import { t as makeError } from "./makeError-CiXxcKtE.js";
//#region src/helpers/middlewarePromise.ts
var error = makeError("MIDDLEWARE");
function middlewarePromise(middleware, throwWhat = error) {
	return (promise) => {
		if (!(promise instanceof Promise)) {
			if (promise instanceof Error) throw promise;
			else return promise;
		}
		return promise.then((result) => {
			if (!middleware()) throw throwWhat;
			return result;
		});
	};
}
//#endregion
export { middlewarePromise as t };
