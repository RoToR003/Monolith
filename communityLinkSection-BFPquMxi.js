//# allFunctionsCalledOnLoad
import { a as i18n } from "./langPack-BmdJGr44.js";
import { _ as createMemo, p as createComponent, s as Show } from "./solid-9Vxm0VIz.js";
import { u as memo } from "./web-BPyQozky.js";
import { t as Button } from "./buttonTsx-Bwphkm9r.js";
import { i as Row } from "./confirmationPopup-Bz6mK0o-.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { t as CommunityDialogList } from "./communityPeerDialogList-eL2VIhdd.js";
//#region src/components/communities/communityLinkSection.tsx
function CommunityLinkSection(props) {
	const community = createMemo(() => {
		return props.communities.find((community) => {
			return community.id.toChatId() === props.linkedCommunityId;
		});
	});
	const hide = () => !!(props.hideWhenLinkedCommunityMissing && props.linkedCommunityId && !community());
	return createComponent(Section, {
		ref(r$) {
			var _ref$ = props.ref;
			typeof _ref$ === "function" ? _ref$(r$) : props.ref = r$;
		},
		get classList() {
			return { hide: hide() };
		},
		get caption() {
			return memo(() => !!(props.hideCaptionWhenLinked && props.linkedCommunityId))() ? void 0 : props.caption;
		},
		get children() {
			return createComponent(Show, {
				get when() {
					return props.linkedCommunityId;
				},
				get fallback() {
					return createComponent(Row, {
						get clickable() {
							return props.onAdd;
						},
						role: "button",
						tabIndex: 0,
						get children() {
							return [createComponent(Row.Icon, { get icon() {
								return props.addIcon;
							} }), createComponent(Row.Title, { get children() {
								return i18n(props.addText);
							} })];
						}
					});
				},
				children: (linkedCommunityId) => [createComponent(Show, {
					get when() {
						return community();
					},
					children: (linkedCommunity) => createComponent(CommunityDialogList, {
						get communities() {
							return [linkedCommunity()];
						},
						get middleware() {
							return props.middleware;
						},
						onClick: () => {
							props.onOpenCommunity(linkedCommunityId());
						}
					})
				}), createComponent(Button, {
					"class": "btn-primary btn-transparent danger",
					icon: "delete",
					get text() {
						return props.removeText;
					},
					onClick: () => props.onRemove(linkedCommunityId())
				})]
			});
		}
	});
}
//#endregion
export { CommunityLinkSection as t };
