//# allFunctionsCalledOnLoad
import { R as useContext, h as createContext, p as createComponent } from "./solid-9Vxm0VIz.js";
//#region src/components/solidJsTabs/superTabProvider.tsx
var SuperTabContext = createContext();
var SuperTabProvider = (props) => {
	return createComponent(SuperTabContext.Provider, {
		get value() {
			return [props.self, SuperTabProvider.allTabs];
		},
		get children() {
			return props.children;
		}
	});
};
SuperTabProvider.allTabs = {};
var useSuperTab = () => useContext(SuperTabContext);
//#endregion
export { useSuperTab as n, SuperTabProvider as t };
