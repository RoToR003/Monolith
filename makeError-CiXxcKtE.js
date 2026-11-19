//# allFunctionsCalledOnLoad
import { f as DEBUG } from "./userAgent-ByGXcznk.js";
//#region src/helpers/makeError.ts
function makeError(type, message) {
	const error = { type };
	if (message) error.message = message;
	if (DEBUG) {
		const realError = /* @__PURE__ */ new Error();
		Object.defineProperty(error, "stack", {
			configurable: true,
			enumerable: true,
			get() {
				const stack = realError.stack;
				Object.defineProperty(error, "stack", {
					value: stack,
					writable: true,
					configurable: true,
					enumerable: true
				});
				return stack;
			}
		});
	}
	return error;
}
//#endregion
export { makeError as t };
