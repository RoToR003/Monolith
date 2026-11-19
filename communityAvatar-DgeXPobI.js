//# allFunctionsCalledOnLoad
import { M as onCleanup, _ as createMemo, p as createComponent, s as Show, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { o as unwrap } from "./store-PwRn5fa3.js";
import { c as insert, f as setAttribute, g as template, h as style, n as Portal, o as className, u as memo } from "./web-BPyQozky.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
import { A as AvatarNewTsx } from "./confirmationPopup-Bz6mK0o-.js";
var communityAvatar_module_default = {
	Container: "_Container_chu4w_1",
	EditorFrame: "_EditorFrame_chu4w_2",
	Decoration: "_Decoration_chu4w_11",
	EditorControl: "_EditorControl_chu4w_30",
	EditorPlaceholder: "_EditorPlaceholder_chu4w_39",
	Avatar: "_Avatar_chu4w_46",
	Preview: "_Preview_chu4w_53"
};
//#endregion
//#region src/components/communities/communityAvatar.tsx
var _tmpl$ = /*#__PURE__*/ template(`<svg width=125 height=100 viewBox="0 0 125 100"fill=none xmlns=http://www.w3.org/2000/svg aria-hidden=true><path opacity=0.15 d="M26.4382 12.0185C26.0639 12.6406 25.7099 13.2766 25.3787 13.9267C23.6015 17.4147 22.788 21.3107 22.3913 26.165C21.9976 30.9845 21.9997 37.0086 21.9997 44.7997V55.2001C21.9997 62.9912 21.9976 69.0154 22.3913 73.8349C22.788 78.6891 23.6016 82.5852 25.3787 86.0732C26.6559 88.5799 28.2611 90.8845 30.1384 92.9345C28.104 91.6505 26.3049 90.0031 24.8396 88.0585C21.9499 84.2238 20.977 78.7084 19.032 67.6777L15.2117 46.0117C13.2667 34.9811 12.2943 29.4656 13.698 24.874C14.9328 20.8349 17.4147 17.2898 20.7878 14.748C22.3208 13.5928 24.123 12.7455 26.4382 12.0185Z"></path><path opacity=0.1 d="M10.3996 25.7243C9.94967 28.0394 9.95115 30.4979 10.2131 33.3063C10.5379 36.7882 11.2941 41.0664 12.258 46.5329L16.0783 68.1989C17.0421 73.665 17.7943 77.9439 18.6799 81.3268C19.5744 84.7434 20.6657 87.5055 22.4436 89.8649C23.0895 90.722 23.7919 91.5293 24.5441 92.2819C23.6762 91.7404 22.8569 91.1149 22.1008 90.4098C19.2915 87.7901 17.7593 83.5791 14.6945 75.1588L6.89668 53.734C3.83196 45.3138 2.29974 41.1032 2.76778 37.2907C3.17959 33.9371 4.6422 30.7998 6.94649 28.3288C7.86463 27.3442 8.97798 26.5161 10.3996 25.7243ZM24.5754 87.696C24.6615 87.8184 24.7493 87.9392 24.8391 88.0583C24.8509 88.0739 24.8633 88.0895 24.8752 88.1051C24.8634 88.0896 24.8508 88.0748 24.8391 88.0592C24.7492 87.94 24.6616 87.8186 24.5754 87.696ZM22.6174 83.8893C22.8545 84.5181 23.1058 85.1059 23.3772 85.6588C23.1058 85.1059 22.8545 84.5181 22.6174 83.8893ZM22.2424 82.8258C22.3064 83.0203 22.3715 83.2109 22.4377 83.3981C22.3715 83.2109 22.3065 83.0203 22.2424 82.8258ZM21.5891 80.5983C21.4849 80.2014 21.3837 79.7907 21.2824 79.3659C21.3837 79.7907 21.4849 80.2014 21.5891 80.5983ZM20.3566 74.9938C20.1507 73.925 19.9404 72.7843 19.7209 71.5641L19.4357 69.9499C19.7627 71.7926 20.0624 73.4668 20.3566 74.9938ZM24.5705 87.6881C24.5723 87.6907 24.5736 87.6934 24.5754 87.696C24.5736 87.6934 24.5723 87.6907 24.5705 87.6881ZM22.5715 83.7663C22.5265 83.645 22.4817 83.5224 22.4377 83.3981C22.4816 83.5224 22.5265 83.645 22.5715 83.7663ZM21.6672 80.8883C21.6413 80.7924 21.6147 80.6959 21.5891 80.5983C21.6147 80.6959 21.6413 80.7924 21.6672 80.8883ZM20.6057 76.2536C20.5234 75.845 20.4398 75.4254 20.3566 74.9938C20.4398 75.4254 20.5234 75.845 20.6057 76.2536Z">`);
var _tmpl$2 = /*#__PURE__*/ template(`<div>`);
function getCommunityAvatarStyle(size) {
	return { "--community-avatar-size": `${size}px` };
}
function CommunityAvatarDecoration(props) {
	return (() => {
		var _el$ = _tmpl$(), _el$2 = _el$.firstChild, _el$3 = _el$2.nextSibling;
		createRenderEffect((_p$) => {
			var _v$ = communityAvatar_module_default.Decoration, _v$2 = props.fill || "black", _v$3 = props.fill || "black";
			_v$ !== _p$.e && setAttribute(_el$, "class", _p$.e = _v$);
			_v$2 !== _p$.t && setAttribute(_el$2, "fill", _p$.t = _v$2);
			_v$3 !== _p$.a && setAttribute(_el$3, "fill", _p$.a = _v$3);
			return _p$;
		}, {
			e: void 0,
			t: void 0,
			a: void 0
		});
		return _el$;
	})();
}
function getCloneableCommunityAvatarPeer(community, title) {
	if (!community) return;
	const peer = unwrap(community);
	return title === void 0 ? peer : {
		...peer,
		title
	};
}
function CommunityAvatar(props) {
	const avatarSource = createMemo(() => {
		const community = props.community;
		const title = props.title;
		const photo = community?._ === "community" ? community.photo : void 0;
		const peer = getCloneableCommunityAvatarPeer(community, title);
		return {
			key: [
				peer?._ || "",
				peer?.id || props.peerId || "",
				photo?._ || "",
				photo?._ === "chatPhoto" ? photo.photo_id : "",
				photo?._ === "chatPhoto" ? photo.dc_id : "",
				title ?? peer?.title ?? "",
				props.size
			].join(":"),
			peer,
			peerId: peer ? peer.id.toPeerId(true) : props.peerId,
			size: props.size,
			title: title ?? peer?.title ?? ""
		};
	});
	return (() => {
		var _el$4 = _tmpl$2();
		insert(_el$4, createComponent(Show, {
			get when() {
				return props.decorated !== false;
			},
			get children() {
				return createComponent(CommunityAvatarDecoration, { get fill() {
					return props.decorationFill || "currentColor";
				} });
			}
		}), null);
		insert(_el$4, createComponent(Show, {
			keyed: true,
			get when() {
				return avatarSource().key;
			},
			get children() {
				return createComponent(AvatarNewTsx, {
					get ["class"]() {
						return communityAvatar_module_default.Avatar;
					},
					get peerId() {
						return avatarSource().peerId;
					},
					get peer() {
						return avatarSource().peer;
					},
					get peerTitle() {
						return memo(() => !!(avatarSource().peer || avatarSource().peerId))() ? void 0 : avatarSource().title;
					},
					get size() {
						return avatarSource().size;
					}
				});
			}
		}), null);
		insert(_el$4, createComponent(Show, {
			get when() {
				return props.preview;
			},
			get children() {
				var _el$5 = _tmpl$2();
				insert(_el$5, () => props.preview);
				createRenderEffect(() => className(_el$5, communityAvatar_module_default.Preview));
				return _el$5;
			}
		}), null);
		createRenderEffect((_p$) => {
			var _v$4 = classNames(communityAvatar_module_default.Container, props.class), _v$5 = getCommunityAvatarStyle(props.size);
			_v$4 !== _p$.e && className(_el$4, _p$.e = _v$4);
			_p$.t = style(_el$4, _v$5, _p$.t);
			return _p$;
		}, {
			e: void 0,
			t: void 0
		});
		return _el$4;
	})();
}
function CommunityAvatarEditor(props) {
	const size = props.size || 120;
	const container = props.avatarEdit.container;
	container.classList.add(communityAvatar_module_default.EditorControl);
	onCleanup(() => container.classList.remove(communityAvatar_module_default.EditorControl));
	return (() => {
		var _el$6 = _tmpl$2();
		insert(_el$6, createComponent(CommunityAvatarDecoration, { fill: "currentColor" }), null);
		insert(_el$6, container, null);
		insert(_el$6, createComponent(Portal, {
			mount: container,
			get children() {
				return createComponent(Show, {
					get when() {
						return !props.hasPreview;
					},
					get children() {
						return createComponent(CommunityAvatar, {
							get ["class"]() {
								return `${communityAvatar_module_default.EditorPlaceholder} avatar-placeholder`;
							},
							get community() {
								return props.community;
							},
							get peerId() {
								return props.peerId;
							},
							get title() {
								return props.title;
							},
							size,
							decorated: false
						});
					}
				});
			}
		}), null);
		createRenderEffect((_p$) => {
			var _v$6 = communityAvatar_module_default.EditorFrame, _v$7 = getCommunityAvatarStyle(size);
			_v$6 !== _p$.e && className(_el$6, _p$.e = _v$6);
			_p$.t = style(_el$6, _v$7, _p$.t);
			return _p$;
		}, {
			e: void 0,
			t: void 0
		});
		return _el$6;
	})();
}
//#endregion
export { CommunityAvatarEditor as n, CommunityAvatar as t };
