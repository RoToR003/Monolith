//# allFunctionsCalledOnLoad
import { A as mergeProps, p as createComponent } from "./solid-9Vxm0VIz.js";
import { r as useHotReloadGuard } from "./hotReloadGuard-BUNVkeQ4.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
import { a as LottieAnimation, i as usePromiseCollector } from "./mediaHeader-CnpQNwOl.js";
var settingsTabLottieAnimation_module_default = { Container: "_Container_xlod8_1" };
//#endregion
//#region src/components/settingsTabLottieAnimation.tsx
var SettingsTabLottieAnimation = (props) => {
	const { lottieLoader } = useHotReloadGuard();
	const promiseCollector = usePromiseCollector();
	return createComponent(LottieAnimation, mergeProps({
		lottieLoader,
		onPromise: (promise) => promiseCollector.collect(promise),
		restartOnClick: true,
		get ["class"]() {
			return classNames(props.class, settingsTabLottieAnimation_module_default.Container);
		}
	}, props));
};
//#endregion
export { SettingsTabLottieAnimation as t };
