//# allFunctionsCalledOnLoad
import { A as mergeProps, C as createSignal, I as splitProps, L as untrack, M as onCleanup, f as children, p as createComponent, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { c as insert, i as assign, u as memo } from "./web-BPyQozky.js";
import { t as ripple } from "./ripple-D7hcIc_t.js";
//#region src/helpers/solid/passthrough.ts
function Passthrough(props) {
	const element = untrack(() => props.element);
	const resolved = children(() => props.children);
	insert(element, resolved);
	const prevProps = {};
	createRenderEffect(() => {
		const [_, others] = splitProps(props, ["element", "children"]);
		assign(element, others, element instanceof SVGElement, true, prevProps);
	});
	return element;
}
//#endregion
//#region src/components/rippleElement.tsx
function RippleElement(props) {
	const [local, rest] = splitProps(props, [
		"noRipple",
		"rippleSquare",
		"component",
		"children",
		"class",
		"classList",
		"ref"
	]);
	const [rippleElement, setRippleElement] = createSignal();
	const el = document.createElement(local.component || "div");
	createRenderEffect(() => {
		if (!local.noRipple) {
			const ret = ripple(el, void 0, "no");
			setRippleElement(ret.element);
			onCleanup(() => {
				ret.dispose();
				setRippleElement();
			});
		}
	});
	local.ref?.(el);
	return createComponent(Passthrough, mergeProps({ element: el }, rest, {
		get classList() {
			return {
				[local.class]: !!local.class,
				"rp": !local.noRipple,
				"rp-square": !local.noRipple && !!local.rippleSquare,
				...local.classList || {}
			};
		},
		get children() {
			return [memo(() => rippleElement()), memo(() => local.children)];
		}
	}));
}
//#endregion
export { RippleElement as t };
