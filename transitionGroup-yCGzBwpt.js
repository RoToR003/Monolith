//# allFunctionsCalledOnLoad
import { _ as createMemo, f as children } from "./solid-9Vxm0VIz.js";
import { t as getFirstChild } from "./dist-Fd6wPWkH.js";
import { i as exitTransition, n as createClassnames, r as enterTransition } from "./transition-Cmlc134D.js";
import { f as createListTransition } from "./animations-DCmLIda3.js";
//#region src/vendor/solid-transition-group/transitionGroup.ts
/**
* The `<TransitionGroup>` component lets you apply enter and leave animations on elements passed to `props.children`.
*
* It supports transitioning multiple elements at a time and moving elements around.
*
* Note: Only the first level of children is resolved, not recursively every nested element
*
* Make sure to add the 'transition' property through the `moveClass` prop. Otherwise it will be instant.
*
* @param props {@link TransitionGroupProps}
*/
var TransitionGroup = (props) => {
	const classnames = createClassnames(props);
	const resolved = children(() => props.children).toArray;
	const els = createMemo(() => resolved().map((el) => getFirstChild(el, (item) => item instanceof HTMLElement || item instanceof SVGElement)).filter((el) => el !== null));
	return createListTransition(els, {
		appear: props.appear,
		exitMethod: "keep-index",
		onChange({ added, removed, finishRemoved, list }) {
			const classes = classnames();
			for (const el of added) enterTransition(classes, props, el);
			const toMove = [];
			for (const el of list) if (el.isConnected && (el instanceof HTMLElement || el instanceof SVGElement)) toMove.push({
				el,
				rect: el.getBoundingClientRect()
			});
			queueMicrotask(() => {
				const moved = [];
				for (const { el, rect } of toMove) if (el.isConnected) {
					const newRect = el.getBoundingClientRect(), dX = rect.left - newRect.left, dY = rect.top - newRect.top;
					if (dX || dY) {
						el.style.transform = `translate(${dX}px, ${dY}px)`;
						el.style.transitionDuration = "0s";
						moved.push(el);
					}
				}
				document.body.offsetHeight;
				for (const el of moved) {
					el.classList.add(...classes.move);
					el.style.transform = el.style.transitionDuration = "";
					function endTransition(e) {
						if (e.target === el || /transform$/.test(e.propertyName)) {
							el.removeEventListener("transitionend", endTransition);
							el.classList.remove(...classes.move);
						}
					}
					el.addEventListener("transitionend", endTransition);
				}
			});
			for (const el of removed) exitTransition(classes, props, el, () => finishRemoved([el]));
		}
	});
};
//#endregion
export { TransitionGroup as t };
