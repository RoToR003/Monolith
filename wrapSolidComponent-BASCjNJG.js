//# allFunctionsCalledOnLoad
import { x as createRoot } from "./solid-9Vxm0VIz.js";
//#region src/helpers/solid/wrapSolidComponent.ts
function unwrapSolidElement(element) {
	while (typeof element === "function") element = element();
	return element;
}
function wrapSolidComponent(component, middleware) {
	let dispose;
	const el = createRoot((dispose_) => {
		dispose = dispose_;
		return unwrapSolidElement(component());
	});
	middleware.onClean(dispose);
	return el;
}
function mountSolidComponent(component, parentMiddleware) {
	const middlewareHelper = parentMiddleware.create();
	const middleware = middlewareHelper.get();
	let disposed = false;
	const dispose = () => {
		if (disposed) return;
		disposed = true;
		middlewareHelper.destroy();
	};
	try {
		return {
			element: wrapSolidComponent(() => component(middleware), middleware),
			dispose,
			middleware
		};
	} catch (err) {
		dispose();
		throw err;
	}
}
//#endregion
export { unwrapSolidElement as n, wrapSolidComponent as r, mountSolidComponent as t };
