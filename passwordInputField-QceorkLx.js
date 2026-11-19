//# allFunctionsCalledOnLoad
import { h as Modes } from "./userAgent-ByGXcznk.js";
import { t as Icon } from "./icon-DbP6Es97.js";
import { t as cancelEvent } from "./cancelEvent-Cw8vYZHp.js";
import { t as Button } from "./button-DpTvniRN.js";
import { t as InputField } from "./inputField-CaCo30N0.js";
//#region src/components/passwordInputField.ts
var PasswordInputHelpers = class {
	constructor(container, input) {
		this.container = container;
		this.input = input;
		this.passwordVisible = false;
		this.onVisibilityClick = (e) => {
			cancelEvent(e);
			this.passwordVisible = !this.passwordVisible;
			this.toggleVisible.replaceChildren(Icon(this.passwordVisible ? "eye2_filled" : "eye1_filled"));
			this.toggleVisible.setAttribute("aria-pressed", String(this.passwordVisible));
			this.input.type = this.passwordVisible ? "text" : "password";
			this.onVisibilityClickAdditional?.();
		};
		input.type = "password";
		input.setAttribute("required", "");
		input.name = "notsearch_password";
		input.autocomplete = "off";
		const stealthy = document.createElement("input");
		stealthy.classList.add("stealthy");
		stealthy.tabIndex = -1;
		stealthy.setAttribute("aria-hidden", "true");
		stealthy.type = "password";
		input.parentElement.prepend(stealthy);
		input.parentElement.insertBefore(stealthy.cloneNode(), input.nextSibling);
		const toggleVisible = this.toggleVisible = Button("toggle-visible", {
			noRipple: true,
			ariaLabel: "AccDescr.ShowPassword",
			asDiv: !Modes.a11y
		});
		toggleVisible.setAttribute("aria-pressed", "false");
		toggleVisible.append(Icon("eye1_filled"));
		container.classList.add("input-field-password");
		container.append(toggleVisible);
		toggleVisible.addEventListener("click", this.onVisibilityClick);
		toggleVisible.addEventListener("touchend", this.onVisibilityClick);
	}
};
var PasswordInputField = class extends InputField {
	constructor(options = {}) {
		super({
			plainText: true,
			allowStartingSpace: true,
			...options
		});
		this.helpers = new PasswordInputHelpers(this.container, this.input);
	}
};
//#endregion
export { PasswordInputHelpers as n, PasswordInputField as t };
