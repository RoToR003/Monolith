//# allFunctionsCalledOnLoad
import { p as createComponent, x as createRoot } from "./solid-9Vxm0VIz.js";
import { d as render } from "./web-BPyQozky.js";
//#region src/helpers/solid/renderComponent.tsx
var renderComponent = ({ element, Component, props, middleware, HotReloadGuard }) => {
	const ToRender = HotReloadGuard ? () => createComponent(HotReloadGuard, { get children() {
		return createComponent(Component, props || {});
	} }) : () => createComponent(Component, props || {});
	const dispose = element ? render(() => createComponent(ToRender, {}), element) : createRoot((dispose) => {
		createComponent(ToRender, {});
		return dispose;
	});
	middleware.onDestroy(() => dispose());
};
//#endregion
export { renderComponent as t };
