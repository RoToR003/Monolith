//# allFunctionsCalledOnLoad
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { a as i18n } from "./langPack-BmdJGr44.js";
import { C as createSignal, N as onMount, p as createComponent, s as Show } from "./solid-9Vxm0VIz.js";
import { c as insert, g as template } from "./web-BPyQozky.js";
import { i as Row, s as CheckboxFieldTsx } from "./confirmationPopup-Bz6mK0o-.js";
import { $ as MicrophoneLevelMeter, X as CallDeviceRow, Y as CallCameraSection, Z as useCallDeviceSettings } from "./appDialogsManager-CXguiKc3.js";
import { i as usePromiseCollector } from "./mediaHeader-CnpQNwOl.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
//#region src/components/sidebarLeft/tabs/speakersAndCamera.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div class=speakers-and-camera-meter-wrap>`);
function SpeakersAndCamera() {
	const [tab] = useSuperTab();
	const promiseCollector = usePromiseCollector();
	const callDevices = useCallDeviceSettings();
	const [currentAuth, setCurrentAuth] = createSignal(void 0);
	const acceptCalls = () => !currentAuth()?.pFlags?.call_requests_disabled;
	promiseCollector.collect(rootScope.managers.appAccountManager.getAuthorizations().then((res) => {
		const cur = res.authorizations.find((a) => a.pFlags?.current);
		setCurrentAuth(cur);
	}).catch(() => {}));
	onMount(() => {
		tab.header.classList.add("with-border");
	});
	const onToggleAcceptCalls = (checked) => {
		const auth = currentAuth();
		if (!auth) return;
		const previous = auth.pFlags?.call_requests_disabled;
		setCurrentAuth({
			...auth,
			pFlags: {
				...auth.pFlags,
				call_requests_disabled: checked ? void 0 : true
			}
		});
		rootScope.managers.appAccountManager.changeAuthorizationSettings(auth.hash, { callRequestsDisabled: !checked }).catch((err) => {
			setCurrentAuth({
				...auth,
				pFlags: {
					...auth.pFlags,
					call_requests_disabled: previous
				}
			});
			console.error("changeAuthorizationSettings failed", err);
		});
	};
	return [
		createComponent(Section, {
			name: "CallSettings.OutputSection",
			get children() {
				return createComponent(CallDeviceRow, {
					settings: callDevices,
					kind: "speaker",
					titleLangKey: "CallSettings.OutputDevice"
				});
			}
		}),
		createComponent(Section, {
			name: "CallSettings.InputSection",
			get children() {
				return [createComponent(CallDeviceRow, {
					settings: callDevices,
					kind: "microphone",
					titleLangKey: "CallSettings.InputDevice"
				}), (() => {
					var _el$ = _tmpl$();
					insert(_el$, createComponent(MicrophoneLevelMeter, { get deviceId() {
						return callDevices.deviceId("microphone");
					} }));
					return _el$;
				})()];
			}
		}),
		createComponent(CallCameraSection, { settings: callDevices }),
		createComponent(Show, {
			get when() {
				return currentAuth();
			},
			get children() {
				return createComponent(Section, {
					caption: "CallSettings.AcceptCalls.Caption",
					get children() {
						return createComponent(Row, { get children() {
							return [createComponent(Row.CheckboxFieldToggle, { get children() {
								return createComponent(CheckboxFieldTsx, {
									toggle: true,
									get checked() {
										return acceptCalls();
									},
									onChange: onToggleAcceptCalls
								});
							} }), createComponent(Row.Title, { get children() {
								return i18n("CallSettings.AcceptCalls");
							} })];
						} });
					}
				});
			}
		})
	];
}
//#endregion
export { SpeakersAndCamera as default };
