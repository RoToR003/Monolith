//# allFunctionsCalledOnLoad
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { C as createSignal, M as onCleanup, g as createEffect, x as createRoot } from "./solid-9Vxm0VIz.js";
import { r as getOverlayRoot } from "./appWindow-bo-KtJhy.js";
import { t as findUpTag } from "./findUpTag-CkbKEw4y.js";
import { t as subscribeOn } from "./subscribeOn-DnCla7ws.js";
import { P as emojiDropdownButton_module_default, c as StickersTab, t as EmoticonsDropdown } from "./emoticonsDropdown-Cb_qGCUN.js";
import { t as cloneDOMRect } from "./cloneDOMRect-DCQvg4jX.js";
//#region src/components/popups/createPoll/stickersDropdown.ts
var createStickersDropdown = ({ pivot, onStickerClick, onEmoticonsDropdown, ...rest }) => createRoot((dispose) => {
	const stickersTab = new StickersTab(rootScope.managers);
	const emoticonsDropdown = new EmoticonsDropdown({
		tabsToRender: [stickersTab],
		customParentElement: getOverlayRoot,
		getOpenPosition: () => {
			const rect = pivot.getBoundingClientRect();
			const cloned = cloneDOMRect(rect);
			cloned.top = rect.bottom + 8;
			return cloned;
		},
		...rest
	});
	emoticonsDropdown.onMediaClick = async (e) => {
		const target = findUpTag(e.target, "DIV");
		if (!target) return false;
		const docId = target.dataset.docId;
		if (!docId) return false;
		onStickerClick({
			docId,
			target
		});
		emoticonsDropdown.toggle(false);
		return true;
	};
	emoticonsDropdown.getElement().classList.add(emojiDropdownButton_module_default.EmoticonsDropdown);
	emoticonsDropdown.setTextColor("primary-text-color");
	onEmoticonsDropdown?.(emoticonsDropdown);
	emoticonsDropdown.toggle(true);
	onCleanup(() => {
		emoticonsDropdown?.hideAndDestroy();
	});
	return {
		emoticonsDropdown,
		dispose
	};
});
/**
* Returns a setter that opens a stickers dropdown anchored to the supplied pivot element.
* Pass `null` (or any falsy value) to close the dropdown. The dropdown is automatically
* disposed when the owning reactive scope is cleaned up or when the pivot changes.
*/
var useStickersDropdown = ({ onStickerClick, ...rest }) => {
	const [pivot, setPivot] = createSignal(null);
	createEffect(() => {
		const pivotEl = pivot();
		if (!pivotEl) return;
		const { emoticonsDropdown, dispose } = createStickersDropdown({
			pivot: pivotEl,
			onStickerClick,
			...rest
		});
		subscribeOn(emoticonsDropdown)("close", () => {
			setPivot(null);
		});
		onCleanup(dispose);
	});
	return setPivot;
};
//#endregion
export { useStickersDropdown as t };
