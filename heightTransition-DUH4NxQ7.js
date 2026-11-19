//# allFunctionsCalledOnLoad
import { C as createSignal, m as createComputed, p as createComponent } from "./solid-9Vxm0VIz.js";
import { t as animate } from "./animation-Dd3Xpw_9.js";
import { t as Transition } from "./transition-Cmlc134D.js";
import { t as keyframesAtLevel } from "./reducedKeyframes-Dx3U8F3X.js";
//#region src/helpers/solid/heightTransition.tsx
var transitionTime = 240;
var animateAtLevel = (el, keyframes, options) => {
	const played = keyframesAtLevel(keyframes);
	return el.animate(played || [], {
		...options,
		duration: played ? transitionTime : 0
	});
};
var HeightTransition = (props) => {
	const [runningAnimations, setRunningAnimations] = createSignal(0);
	const increase = () => setRunningAnimations((prev) => prev + 1);
	const decrease = () => setRunningAnimations((prev) => prev - 1);
	createComputed(() => {
		if (!props.onRunningAnimations) return;
		props.onRunningAnimations(runningAnimations());
	});
	return createComponent(Transition, {
		onBeforeEnter: increase,
		onAfterEnter: () => {
			decrease();
			props.onAfterEnter?.();
		},
		onBeforeExit: increase,
		onAfterExit: decrease,
		onEnter: async (_el, done) => {
			const el = _el;
			el.style.height = "0px";
			el.style.opacity = "0";
			animate(() => {
				const targetHeight = el.scrollHeight;
				animateAtLevel(el, [{
					height: "0px",
					opacity: 0,
					...props.scale && {
						transform: "scale(0.95)",
						transformOrigin: "75% center"
					}
				}, {
					height: `${targetHeight}px`,
					opacity: 1,
					...props.scale && { transform: "scale(1)" }
				}], { easing: "ease-in-out" }).finished.then(() => {
					el.style.removeProperty("height");
					el.style.removeProperty("opacity");
					done();
				});
			});
		},
		onExit: async (el, done) => {
			animate(() => {
				animateAtLevel(el, [{
					height: `${el.scrollHeight}px`,
					opacity: 1
				}, {
					height: "0px",
					opacity: 0
				}], {
					fill: "forwards",
					easing: "ease-in-out"
				}).finished.then(done);
			});
		},
		get children() {
			return props.children;
		}
	});
};
//#endregion
export { HeightTransition as t };
