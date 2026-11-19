//# allFunctionsCalledOnLoad
import { c as deepEqual } from "./encryptedStorageLayer-gN9TBXzg.js";
import { n as getAppWindow, r as getOverlayRoot } from "./appWindow-bo-KtJhy.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
import { s as getRichValueWithCaret, t as InputField } from "./inputField-CaCo30N0.js";
import { j as createEmojiDropdownButton } from "./emoticonsDropdown-Cb_qGCUN.js";
import { t as cloneDOMRect } from "./cloneDOMRect-DCQvg4jX.js";
import { t as attachPlainMessageEditor } from "./plainField-DIjPnqVa.js";
var inputFieldEmoji_module_default = {
	EmojiButton: "_EmojiButton_tr68l_1",
	multiline: "_multiline_tr68l_9"
};
//#endregion
//#region src/components/inputFieldEmoji.ts
var InputFieldEmoji = class extends InputField {
	constructor(options) {
		super({
			canWrapCustomEmojis: true,
			...options
		});
		this.editor = attachPlainMessageEditor(this.input);
		const { button, dispose } = createEmojiDropdownButton({
			inputField: this,
			class: classNames(inputFieldEmoji_module_default.EmojiButton, this.options.withLinebreaks && inputFieldEmoji_module_default.multiline),
			customParentElement: getOverlayRoot,
			getOpenPosition: () => {
				if (this.options.withLinebreaks) {
					const rect = this.input.getBoundingClientRect();
					const cloned = cloneDOMRect(rect);
					cloned.top += rect.height;
					if (cloned.top + 420 > getAppWindow().innerHeight) cloned.top = rect.top - 420 - 8;
					cloned.left += rect.width / 2;
					return cloned;
				}
				const rect = button.getBoundingClientRect();
				const cloned = cloneDOMRect(rect);
				cloned.left = rect.left + rect.width / 2;
				cloned.top = rect.top + rect.height / 2;
				return cloned;
			}
		});
		this.dispose = dispose;
		this.input.after(button);
	}
	cleanup() {
		this.editor.destroy();
		this.dispose();
	}
	get richValue() {
		const { value, entities } = getRichValueWithCaret(this.input);
		return {
			_: "textWithEntities",
			text: value,
			entities
		};
	}
	set richValue(value) {
		this.value = value;
	}
	setRichOriginalValue(value) {
		this.richOriginalValue = value;
		this.value = value;
	}
	isChanged() {
		return !deepEqual(this.richValue, this.richOriginalValue);
	}
};
//#endregion
export { InputFieldEmoji as t };
