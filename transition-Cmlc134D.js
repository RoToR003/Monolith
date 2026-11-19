//# allFunctionsCalledOnLoad
import { C as createSignal, L as untrack, _ as createMemo, d as batch, m as createComputed, z as useTransition } from "./solid-9Vxm0VIz.js";
import "./web-BPyQozky.js";
import { r as resolveFirst } from "./dist-Fd6wPWkH.js";
//#region src/vendor/solid-transition-group/common.ts
function createClassnames(props) {
	return createMemo(() => {
		const name = props.name || "s";
		return {
			enterActive: (props.enterActiveClass || name + "-enter-active").split(" "),
			enter: (props.enterClass || name + "-enter").split(" "),
			enterTo: (props.enterToClass || name + "-enter-to").split(" "),
			exitActive: (props.exitActiveClass || name + "-exit-active").split(" "),
			exit: (props.exitClass || name + "-exit").split(" "),
			exitTo: (props.exitToClass || name + "-exit-to").split(" "),
			move: (props.moveClass || name + "-move").split(" ")
		};
	});
}
function nextFrame(fn) {
	requestAnimationFrame(() => requestAnimationFrame(fn));
}
/**
* Run an enter transition on an element - common for both Transition and TransitionGroup
*/
function enterTransition(classes, events, el, done, duration) {
	const { onBeforeEnter, onEnter, onAfterEnter } = events;
	let timeout;
	onBeforeEnter?.(el);
	el.classList.add(...classes.enter);
	el.classList.add(...classes.enterActive);
	queueMicrotask(() => {
		if (!el.parentNode) return done?.();
		onEnter?.(el, () => endTransition());
	});
	nextFrame(() => {
		el.classList.remove(...classes.enter);
		el.classList.add(...classes.enterTo);
		if (!onEnter || onEnter.length < 2) {
			el.addEventListener("transitionend", endTransition);
			el.addEventListener("animationend", endTransition);
			if (duration !== void 0) timeout = window.setTimeout(() => endTransition(), duration);
		}
	});
	function endTransition(e) {
		if (!e || e.target === el) {
			clearTimeout(timeout);
			done?.();
			el.removeEventListener("transitionend", endTransition);
			el.removeEventListener("animationend", endTransition);
			el.classList.remove(...classes.enterActive);
			el.classList.remove(...classes.enterTo);
			onAfterEnter?.(el);
		}
	}
}
/**
* Run an exit transition on an element - common for both Transition and TransitionGroup
*/
function exitTransition(classes, events, el, done, duration) {
	const { onBeforeExit, onExit, onAfterExit } = events;
	if (!el.parentNode) return done?.();
	let timeout;
	onBeforeExit?.(el);
	el.classList.add(...classes.exit);
	el.classList.add(...classes.exitActive);
	onExit?.(el, () => endTransition());
	nextFrame(() => {
		el.classList.remove(...classes.exit);
		el.classList.add(...classes.exitTo);
		if (!onExit || onExit.length < 2) {
			el.addEventListener("transitionend", endTransition);
			el.addEventListener("animationend", endTransition);
			if (duration !== void 0) timeout = window.setTimeout(() => endTransition(), duration);
		}
	});
	function endTransition(e) {
		if (!e || e.target === el) {
			clearTimeout(timeout);
			done?.();
			el.removeEventListener("transitionend", endTransition);
			el.removeEventListener("animationend", endTransition);
			el.classList.remove(...classes.exitActive);
			el.classList.remove(...classes.exitTo);
			onAfterExit?.(el);
		}
	}
}
//#endregion
//#region node_modules/.pnpm/@solid-primitives+transition-group@1.1.2_solid-js@1.9.17/node_modules/@solid-primitives/transition-group/dist/index.js
var noop = () => {};
var noopTransition = (el, done) => done();
/**
* Create an element transition interface for switching between single elements.
* It can be used to implement own transition effect, or a custom `<Transition>`-like component.
*
* It will observe {@link source} and return a signal with array of elements to be rendered (current one and exiting ones).
*
* @param source a signal with the current element. Any nullish value will mean there is no element.
* Any object can used as the source, but most likely you will want to use a `HTMLElement` or `SVGElement`.
* @param options transition options {@link SwitchTransitionOptions}
* @returns a signal with an array of the current element and exiting previous elements.
*
* @see https://github.com/solidjs-community/solid-primitives/tree/main/packages/transition-group#createSwitchTransition
*
* @example
* const [el, setEl] = createSignal<HTMLDivElement>();
*
* const rendered = createSwitchTransition(el, {
*   onEnter(el, done) {
*     // the enter callback is called before the element is inserted into the DOM
*     // so run the animation in the next animation frame / microtask
*     queueMicrotask(() => { ... })
*   },
*   onExit(el, done) {
*     // the exitting element is kept in the DOM until the done() callback is called
*   },
* })
*
* // change the source to trigger the transition
* setEl(refToHtmlElement);
*/
function createSwitchTransition(source, options) {
	const initSource = untrack(source);
	const initReturned = initSource ? [initSource] : [];
	const { onEnter = noopTransition, onExit = noopTransition } = options;
	const [returned, setReturned] = createSignal(options.appear ? [] : initReturned);
	const [isTransitionPending] = useTransition();
	let next;
	let isExiting = false;
	function exitTransition(el, after) {
		if (!el) return after && after();
		isExiting = true;
		onExit(el, () => {
			batch(() => {
				isExiting = false;
				setReturned((p) => p.filter((e) => e !== el));
				after && after();
			});
		});
	}
	function enterTransition(after) {
		const el = next;
		if (!el) return after && after();
		next = void 0;
		setReturned((p) => [el, ...p]);
		onEnter(el, after ?? noop);
	}
	const triggerTransitions = options.mode === "out-in" ? (prev) => isExiting || exitTransition(prev, enterTransition) : options.mode === "in-out" ? (prev) => enterTransition(() => exitTransition(prev)) : (prev) => {
		exitTransition(prev);
		enterTransition();
	};
	createComputed((prev) => {
		const el = source();
		if (untrack(isTransitionPending)) {
			isTransitionPending();
			return prev;
		}
		if (el !== prev) {
			next = el;
			batch(() => untrack(() => triggerTransitions(prev)));
		}
		return el;
	}, options.appear ? void 0 : initSource);
	return returned;
}
//#endregion
//#region src/vendor/solid-transition-group/transition.ts
var TRANSITION_MODE_MAP = {
	inout: "in-out",
	outin: "out-in"
};
/**
* The `<Transition>` component lets you apply enter and leave animations on element passed to `props.children`.
*
* It only supports transitioning a single element at a time.
*
* @param props {@link TransitionProps}
*/
var Transition = (props) => {
	const classnames = createClassnames(props);
	return createSwitchTransition(resolveFirst(() => props.children), {
		mode: TRANSITION_MODE_MAP[props.mode],
		appear: props.appear,
		onEnter(el, done) {
			enterTransition(classnames(), props, el, done, props.duration);
		},
		onExit(el, done) {
			exitTransition(classnames(), props, el, done, props.duration);
		}
	});
};
//#endregion
export { exitTransition as i, createClassnames as n, enterTransition as r, Transition as t };
