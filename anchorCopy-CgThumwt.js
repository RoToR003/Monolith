//# allFunctionsCalledOnLoad
import { t as cancelEvent } from "./cancelEvent-Cw8vYZHp.js";
import { n as attachClickEvent } from "./clickEvent-COk4YpLP.js";
import { a as copyUsername, i as copyTmeLink, t as T_ME } from "./copyContact-BjmXCvDw.js";
//#region src/helpers/dom/anchorCopy.ts
function anchorCopy(options = {}) {
	const anchor = document.createElement("a");
	anchor.classList.add("anchor-copy");
	anchor.dir = "ltr";
	let copy;
	if (options.mePath) {
		anchor.href = anchor.innerText = T_ME + options.mePath;
		copy = () => copyTmeLink(options.mePath);
	}
	if (options.username) {
		anchor.href = T_ME + options.username;
		anchor.innerText = "@" + options.username;
		copy = () => copyUsername(options.username);
	}
	attachClickEvent(anchor, (e) => {
		cancelEvent(e);
		if (options.onClick) options.onClick(copy);
		else copy();
	});
	return anchor;
}
//#endregion
export { anchorCopy as t };
