//# allFunctionsCalledOnLoad
import { t as noop } from "./noop-H9NNBLfX.js";
import { lt as IS_GROUP_CALL_SUPPORTED } from "./apiManagerProxy-DmQXvxSF.js";
import { a as i18n } from "./langPack-BmdJGr44.js";
import { N as onMount, i as For, p as createComponent, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { n as createStore } from "./store-PwRn5fa3.js";
import { c as insert, g as template, o as className, u as memo } from "./web-BPyQozky.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { t as Button } from "./buttonTsx-Bwphkm9r.js";
import { n as attachClickEvent } from "./clickEvent-COk4YpLP.js";
import { mt as createInviteViaLinkRow } from "./appDialogsManager-CXguiKc3.js";
import { t as AppSelectPeers } from "./appSelectPeers-BYpCZNpe.js";
import { r as wrapSolidComponent } from "./wrapSolidComponent-BASCjNJG.js";
import { r as toastNew } from "./toast-B6VD5M7R.js";
import showCallLinkPopup from "./callLinkPopup-C45xolsU.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { t as ButtonCorner } from "./buttonCorner-HdHn23eT.js";
import { t as IS_CONFERENCE_CALL_SUPPORTED } from "./conferenceCallSupport-C1xXX2wS.js";
var newCall_module_default = {
	row: "_row_h07f0_1",
	modes: "_modes_h07f0_5",
	picked: "_picked_h07f0_14"
};
//#endregion
//#region src/components/sidebarLeft/tabs/newCall.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div>`);
/** Handset + camera, the two ways to pick one person. */
function CallModeButtons(props) {
	return (() => {
		var _el$ = _tmpl$();
		insert(_el$, createComponent(For, {
			each: [false, true],
			children: (video) => createComponent(Button.Icon, {
				noRipple: true,
				icon: video ? "videocamera" : "phone",
				get ["class"]() {
					return memo(() => props.video === video)() ? newCall_module_default.picked : void 0;
				},
				get ["aria-label"]() {
					return i18n(video ? "ConferenceCall.NewCall.VideoCallBack" : "ConferenceCall.NewCall.CallBack").textContent;
				},
				get ["aria-pressed"]() {
					return props.video === video;
				},
				tabIndex: 0,
				"on:click": (e) => {
					e.stopPropagation();
					props.onPick(video);
				}
			})
		}));
		createRenderEffect(() => className(_el$, newCall_module_default.modes));
		return _el$;
	})();
}
var NewCall = () => {
	const [tab] = useSuperTab();
	const [modes, setModes] = createStore({});
	let lastPickedVideo = false;
	let selector;
	const collect = () => {
		return selector.getSelected().filter((key) => key.isPeerId()).map((key) => {
			const peerId = key.toPeerId();
			return {
				peerId,
				video: modes["" + peerId]
			};
		});
	};
	const confirm = () => {
		const invite = collect();
		tab.close();
		if (invite.length === 1) {
			const { peerId, video } = invite[0];
			hotReloadGuard.appImManager.callUser(peerId.toUserId(), video ? "video" : "voice").catch(noop);
			return;
		}
		hotReloadGuard.appImManager.createConference({
			invite,
			confirm: false
		}).catch(noop);
	};
	const createLink = async () => {
		if (!IS_GROUP_CALL_SUPPORTED || !IS_CONFERENCE_CALL_SUPPORTED) {
			toastNew({ langPackKey: "ConferenceCall.Unsupported" });
			return;
		}
		try {
			const { call, link } = await tab.managers.appGroupCallsManager.createConferenceCallLink();
			tab.close();
			showCallLinkPopup({
				link,
				initial: true,
				callId: call.id,
				canManage: true
			});
		} catch (err) {
			console.error("create conference call link failed", err);
			toastNew({ langPackKey: "Error.AnError" });
		}
	};
	onMount(() => {
		tab.container.classList.add("new-call-container");
		tab.scrollable.container.remove();
		const btnNext = ButtonCorner({
			icon: "arrow_next",
			className: "is-visible"
		});
		tab.content.append(btnNext);
		attachClickEvent(btnNext, confirm, { listenerSetter: tab.listenerSetter });
		selector = new AppSelectPeers({
			middleware: tab.middlewareHelper.get(),
			appendTo: tab.content,
			managers: tab.managers,
			peerType: ["contacts"],
			exceptSelf: true,
			multiSelect: true,
			design: "square",
			checkboxSide: "left",
			onChange: (_length, changes) => {
				for (const { key, add } of changes) {
					if (!key.isPeerId()) continue;
					const id = "" + key;
					if (!add) setModes(id, void 0);
					else if (modes[id] === void 0) setModes(id, lastPickedVideo);
				}
			},
			processElementAfter: (peerId, dialogElement) => {
				const pick = (withVideo) => {
					lastPickedVideo = withVideo;
					setModes("" + peerId, withVideo);
					if (!selector.selected.has(peerId)) {
						selector.add({
							key: peerId,
							scroll: false
						});
						selector.toggleElementCheckboxByKey(peerId, true);
					}
				};
				dialogElement.container.classList.add(newCall_module_default.row);
				dialogElement.container.append(wrapSolidComponent(() => createComponent(CallModeButtons, {
					get video() {
						return modes["" + peerId];
					},
					onPick: pick
				}), tab.middlewareHelper.get()));
			}
		});
		selector.section.content.prepend(createInviteViaLinkRow({
			middleware: tab.middlewareHelper.get(),
			onClick: () => void createLink()
		}));
	});
	return [];
};
//#endregion
export { NewCall as default };
