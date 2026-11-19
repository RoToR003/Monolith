//# allFunctionsCalledOnLoad
import { L as untrack, g as createEffect, p as createComponent, x as createRoot } from "./solid-9Vxm0VIz.js";
import { o as unwrap, t as createMutable } from "./store-PwRn5fa3.js";
import { d as render, u as memo } from "./web-BPyQozky.js";
//#region src/lib/solidjs/defineSolidElement.tsx
/**
* Defines an HMR capable custom element with solid-js rendering
*
* Don't forget to add `if(import.meta.hot) import.meta.hot.accept();` in the file you're
* declaring the component to take advantage of Hot Module Replacement
*
* Note that it might still need a refresh if you change other parameters except the component logic
*
* @example
* // my-element.tsx
* const MyElement = defineSolidElement({
*   name: 'my-element',
*   observedAttributes: ['size', 'something-else'],
*   // props and attributes are reactive mutable stores, meaning you can also mutate them directly
*   component: (props: {fancyProp: Date}, attributes, controls: {someAction: () => void}) => {
*     // component logic in here
*
*     // expose some methods to the element
*     controls.someAction = () => setInternalSignal('to something');
*
*     return <>...</>;
*   }
* });
*
* // used-in-file.ts
*
* // Some imports might break the HMR, so you can provide this hot reload guard to prevent page reload
* import SolidJSHotReloadGuardProvider from '@lib/solidjs/hotReloadGuardProvider';
*
* const el = new MyElement;
* el.feedProps({fancyProp: new Date});
* el.HotReloadGuard = SolidJSHotReloadGuardProvider;
*
* // Append to DOM after feeding the props, unless it relies solely on attributes, or handles undefined props
* otherElement.append(el);
*
* // Can use attributes if you want
* el.setAttribute('size', '400');
*
* // Use internal methods through the `controls` property
* el.controls.someAction();
*/
function defineSolidElement({ name, component, observedAttributes = [], shadow = false }) {
	var _Class;
	let _Symbol$toStringTag;
	if (customElements.get(name)) {
		const previousElementClass = customElements.get(name);
		previousElementClass.swapComponentFromHMR(component);
		return previousElementClass;
	}
	const className = burgerToPascal(name);
	const SolidElement = (_Symbol$toStringTag = Symbol.toStringTag, _Class = class extends HTMLElement {
		static swapComponentFromHMR(newComponent) {}
		static get observedAttributes() {
			return observedAttributes;
		}
		constructor() {
			super();
			this.savedProps = ((self) => ({ get element() {
				return self;
			} }))(this);
			this.controls = {};
			this.mountPoint = shadow ? this.attachShadow({ mode: "open" }) : this;
		}
		connectedCallback() {
			this.mount();
		}
		disconnectedCallback() {
			this.unmount();
		}
		attributeChangedCallback(name, _oldValue, newValue) {
			this.attributesStore[name] = newValue;
		}
		get props() {
			if (this.disposeStores) return this.propsStore;
			else return this.savedProps;
		}
		feedProps(props) {
			if (this.disposeStores) Object.assign(this.propsStore, props);
			else Object.assign(this.savedProps, props);
		}
		initStores() {
			createRoot((dispose) => {
				this.disposeStores = dispose;
				this.propsStore = createMutable(this.savedProps);
				this.attributesStore = createMutable({});
				createEffect(() => Object.keys(this.attributesStore).forEach((key) => {
					const attributeName = key;
					const value = this.attributesStore[attributeName];
					if (this.getAttribute(attributeName) === this.attributesStore[attributeName]) return;
					if (value === null || value === void 0) this.removeAttribute(attributeName);
					else this.setAttribute(attributeName, value);
				}));
			});
		}
		mount() {
			let savedAttributes;
			if (this.disposeStores) savedAttributes = unwrap(this.attributesStore);
			this.unmount();
			const ComponentToMount = SolidElement.Component;
			this.initStores();
			if (savedAttributes) Object.assign(this.attributesStore, savedAttributes);
			const Wrapper = this.HotReloadGuard || ((props) => memo(() => props.children));
			this.disposeContent = render(() => {
				const _self$ = this;
				return createComponent(Wrapper, { get children() {
					return untrack(() => ComponentToMount(_self$.propsStore, _self$.attributesStore, _self$.controls));
				} });
			}, this.mountPoint);
		}
		unmount() {
			this.disposeContent?.();
			this.disposeStores?.();
			this.disposeStores = this.disposeContent = void 0;
			this.mountPoint.replaceChildren();
		}
		get [_Symbol$toStringTag]() {
			return className;
		}
	}, _Class.Component = component, _Class);
	customElements.define(name, SolidElement);
	return SolidElement;
}
function burgerToPascal(str) {
	return str.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join("");
}
//#endregion
export { defineSolidElement as t };
