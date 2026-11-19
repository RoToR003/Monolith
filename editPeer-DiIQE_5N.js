//# allFunctionsCalledOnLoad
import "./rootScope-CZS0lmz8.js";
import { a as safeAssign } from "./idb-BZfkipS3.js";
import { t as AvatarEdit } from "./avatarEdit-Cnvqr5-1.js";
import { M as avatarNew } from "./confirmationPopup-Bz6mK0o-.js";
import { t as ButtonCorner } from "./buttonCorner-HdHn23eT.js";
//#region src/components/editPeer.ts
var EditPeer = class {
	constructor(options) {
		this._disabled = false;
		this.avatarSize = 120;
		this.isChanged = () => {
			if (this.uploadAvatar) return true;
			let changedLength = 0, requiredLength = 0, requiredValidLength = 0;
			this.inputFields.forEach((inputField) => {
				if (inputField.isValid()) {
					if (inputField.isChanged()) ++changedLength;
					if (inputField.required) ++requiredValidLength;
				}
				if (inputField.required) ++requiredLength;
			});
			return requiredLength === requiredValidLength && changedLength > 0;
		};
		this.handleChange = () => {
			this.nextBtn.classList.toggle("is-visible", this.isChanged());
		};
		safeAssign(this, options);
		this.peerId || (this.peerId = 0);
		if (!this.nextBtn) this.nextBtn = ButtonCorner({
			icon: "check",
			ariaLabel: "Save"
		});
		else if (!this.nextBtn.classList.contains("btn-corner")) this.handleChange = () => {
			this.nextBtn.toggleAttribute("disabled", !this.isChanged() || this.disabled);
		};
		if (!options.withoutAvatar) {
			this.avatarElem = avatarNew({
				middleware: options.middleware,
				size: this.avatarSize,
				peerId: this.peerId
			});
			this.avatarElem.node.classList.add("avatar-placeholder");
			if (!options.doNotEditAvatar) {
				this.avatarEdit = new AvatarEdit((payload) => {
					this.uploadAvatar = payload;
					this.handleChange();
					this.avatarElem.node.remove();
				}, options.popupOptions);
				this.avatarEdit.container.append(this.avatarElem.node);
			}
		}
		this.inputFields.forEach((inputField) => {
			this.listenerSetter.add(inputField.input)("input", this.handleChange);
		});
		this.handleChange();
	}
	get disabled() {
		return this._disabled;
	}
	set disabled(value) {
		this._disabled = value;
		this.inputFields.forEach((inputField) => inputField.input.toggleAttribute("disabled", value));
		this.handleChange();
	}
	lockWithPromise(promise, unlockOnSuccess = false) {
		this.disabled = true;
		promise.then(() => {
			if (unlockOnSuccess) this.disabled = false;
		}, () => {
			this.disabled = false;
		});
	}
};
//#endregion
export { EditPeer as t };
