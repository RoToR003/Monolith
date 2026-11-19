//# allFunctionsCalledOnLoad
import { I as splitProps } from "./solid-9Vxm0VIz.js";
import { t as attachClassName } from "./classname-DB9i2ReQ.js";
import { t as ButtonMenuToggle } from "./buttonMenuToggle-1aKRQh1m.js";
//#region src/components/buttonMenuToggleTsx.tsx
var ButtonMenuToggleTsx = (props) => {
	const [, rest] = splitProps(props, ["class"]);
	const res = ButtonMenuToggle(rest);
	attachClassName(res, () => props.class);
	return res;
};
//#endregion
export { ButtonMenuToggleTsx as t };
