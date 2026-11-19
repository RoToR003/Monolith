//# allFunctionsCalledOnLoad
import { p as createComponent, s as Show } from "./solid-9Vxm0VIz.js";
import { n as StickerTsx } from "./sticker-5twBOy1Y.js";
import { i as Row } from "./confirmationPopup-Bz6mK0o-.js";
//#region src/components/reactionStickerPreview.tsx
function ReactionStickerPreview(props) {
	return createComponent(Row.Media, {
		size: "small",
		get children() {
			return createComponent(Show, {
				get when() {
					return props.sticker;
				},
				children: (sticker) => createComponent(StickerTsx, {
					get sticker() {
						return sticker();
					},
					width: 32,
					height: 32
				})
			});
		}
	});
}
//#endregion
export { ReactionStickerPreview as t };
