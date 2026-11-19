//# allFunctionsCalledOnLoad
import { t as IS_TOUCH_SUPPORTED } from "./touchSupport-B2RWO3zD.js";
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { D as getOwner, M as onCleanup, P as runWithOwner, g as createEffect } from "./solid-9Vxm0VIz.js";
import { c as insert } from "./web-BPyQozky.js";
import { t as getMiddleware } from "./middleware-D6HuIqPm.js";
import { t as AppSelectPeers } from "./appSelectPeers-BYpCZNpe.js";
import { p as useWallet } from "./stream-DZrVqY75.js";
import { t as wallet_module_default } from "./wallet.module-3nQsE2jy.js";
//#region src/components/wallet/picker.tsx
/**
* Puts `query` into the picker's search as if it was typed: the list and `onSearch` follow it
*/
function setWalletPickerQuery(selector, query) {
	const inputSearch = selector.inputSearch;
	if (!inputSearch) return;
	inputSearch.value = query;
	inputSearch.onChange?.(query);
	if (!IS_TOUCH_SUPPORTED) inputSearch.input.focus({ preventScroll: true });
}
/**
* The app's picker — the search field and the list `showPickUserPopup` shows (AppSelectPeers) — as a screen of the
* wallet under the screen's own header, so it slides in with the other screens instead of opening a popup of its
* own. One pick at a time: `onSelect` takes it. The screen comes in with its list drawn.
*/
function WalletPicker(props) {
	const wallet = useWallet();
	const middlewareHelper = getMiddleware();
	let selector;
	let firstRender;
	wallet.router.holdEntrance(new Promise((resolve) => firstRender = resolve));
	const container = document.createElement("div");
	container.classList.add(wallet_module_default.picker, "selector-picker");
	const owner = getOwner();
	Promise.resolve(props.options).then((options) => runWithOwner(owner, () => {
		const middleware = middlewareHelper.get();
		if (!middleware()) return;
		selector = new AppSelectPeers({
			avatarSize: "abitbigger",
			noPlaceholder: true,
			rippleEnabled: false,
			...options,
			appendTo: container,
			managers: rootScope.managers,
			middleware,
			multiSelect: "disabled",
			noInstantLoad: true,
			onFirstRender: () => {
				firstRender();
				selector.checkForTriggers();
				if (!IS_TOUCH_SUPPORTED) selector.inputSearch?.input.focus({ preventScroll: true });
			}
		});
		props.ref?.(selector);
		selector.onSearchChange = (query) => props.onSearch?.(query);
		if (props.aboveList) {
			const mount = document.createElement("div");
			insert(mount, () => props.aboveList);
			selector.heightContainer.before(mount);
		}
		createEffect(() => selector.heightContainer.classList.toggle("hide", !!props.listHidden?.()));
		selector.loadFirst();
	}), firstRender);
	onCleanup(() => {
		selector?.destroy();
		middlewareHelper.destroy();
	});
	return container;
}
//#endregion
export { setWalletPickerQuery as n, WalletPicker as t };
