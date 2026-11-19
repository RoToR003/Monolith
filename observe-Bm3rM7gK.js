//# allFunctionsCalledOnLoad
import { i as onAppWindowChange, n as getAppWindow } from "./appWindow-bo-KtJhy.js";
//#region src/components/wallet/chatCard/observe.ts
/**
* An IntersectionObserver of the window the app is in. Its implicit root is the viewport of the realm that made it,
* so when the app moves into a Document PiP window or back it is made again there and watches what it watched
* (animationIntersector does the same)
*/
function observeWalletCards(callback, options) {
	const elements = /* @__PURE__ */ new Set();
	let observer;
	const create = () => {
		const IO = getAppWindow().IntersectionObserver;
		observer = new IO(callback, options);
		elements.forEach((element) => observer.observe(element));
	};
	create();
	const off = onAppWindowChange(() => {
		observer.disconnect();
		create();
	});
	return {
		observe: (element) => {
			elements.add(element);
			observer.observe(element);
		},
		unobserve: (element) => {
			elements.delete(element);
			observer.unobserve(element);
		},
		disconnect: () => {
			elements.clear();
			observer.disconnect();
			off();
		}
	};
}
//#endregion
export { observeWalletCards as t };
