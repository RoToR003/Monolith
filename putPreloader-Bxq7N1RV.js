//# allFunctionsCalledOnLoad
import { p as MOUNT_CLASS_TO } from "./userAgent-ByGXcznk.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
//#region src/components/putPreloader.ts
function putPreloader(elem, returnDiv = false) {
	const html = `
  <svg xmlns="http://www.w3.org/2000/svg" class="preloader-circular" viewBox="25 25 50 50">
  <circle class="preloader-path" cx="50" cy="50" r="20" fill="none" stroke-miterlimit="10"/>
  </svg>`;
	if (returnDiv) {
		const div = document.createElement("div");
		div.classList.add("preloader");
		div.innerHTML = html;
		if (elem) elem.appendChild(div);
		return div;
	}
	elem.insertAdjacentHTML("beforeend", html);
	return elem.lastElementChild;
}
MOUNT_CLASS_TO.putPreloader = putPreloader;
function setButtonLoader(elem, icon = "check") {
	const iconElement = elem.querySelector(".tgico");
	iconElement?.remove();
	elem.disabled = true;
	putPreloader(elem);
	return () => {
		elem.replaceChildren();
		if (iconElement) elem.append(iconElement);
		elem.removeAttribute("disabled");
	};
}
function PreloaderTsx(props) {
	const div = document.createElement("div");
	div.className = classNames("preloader", props?.class);
	putPreloader(div);
	return div;
}
//#endregion
export { putPreloader as n, setButtonLoader as r, PreloaderTsx as t };
