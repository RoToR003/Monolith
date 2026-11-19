//# allFunctionsCalledOnLoad
import { p as createComponent } from "./solid-9Vxm0VIz.js";
import { d as render } from "./web-BPyQozky.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { n as EnterEmailStep, t as EnterCodeStep } from "./emailVerification-C8QYZSyu.js";
import { r as toastNew } from "./toast-B6VD5M7R.js";
import { t as SliderSuperTab } from "./sliderTab-Wd675qRf.js";
import "./slider-Be-R1TRC.js";
//#region src/components/sidebarLeft/tabs/changeLoginEmail.tsx
var _ChangeLoginEmailTab;
var ChangeLoginEmailCodeTab = class extends SliderSuperTab {
	init(args) {
		this.setTitle("EmailSetup.ChangeEmail");
		this.dispose = render(() => {
			const _self$ = this;
			return createComponent(EnterCodeStep, {
				purpose: { _: "emailVerifyPurposeLoginChange" },
				variant: "tab",
				get sentCode() {
					return args.sentCode;
				},
				onExpired: () => {
					_self$.close();
				},
				onSuccess: () => {
					toastNew({ langPackKey: args.isInitialSetup ? "EmailSetup.SetupToast" : "EmailSetup.ChangeToast" });
					_self$.slider.sliceTabsUntilTab(hotReloadGuard.tabs.AppSettingsTab, _self$);
					_self$.close();
				}
			});
		}, this.scrollable.container);
	}
	onCloseAfterTimeout() {
		super.onCloseAfterTimeout();
		this.dispose();
	}
};
var ChangeLoginEmailTab = class extends SliderSuperTab {
	init(options) {
		this.setTitle("EmailSetup.ChangeEmail");
		this.dispose = render(() => {
			const _self$2 = this;
			return createComponent(EnterEmailStep, {
				purpose: { _: "emailVerifyPurposeLoginChange" },
				variant: "tab",
				get isInitialSetup() {
					return options.isInitialSetup;
				},
				onCodeSent: (code) => {
					_self$2.slider.createTab(ChangeLoginEmailCodeTab).open({
						sentCode: code,
						isInitialSetup: options.isInitialSetup
					});
				}
			});
		}, this.scrollable.container);
	}
	onCloseAfterTimeout() {
		super.onCloseAfterTimeout();
		this.dispose();
	}
};
_ChangeLoginEmailTab = ChangeLoginEmailTab;
_ChangeLoginEmailTab.noSame = true;
/** What the Login Email row and `tg://settings/login_email` open. */
function openChangeLoginEmailTab(slider, passwordState) {
	const pattern = passwordState.login_email_pattern;
	return slider.createTab(ChangeLoginEmailTab).open({ isInitialSetup: !pattern || pattern.includes(" ") });
}
//#endregion
export { ChangeLoginEmailTab as default, openChangeLoginEmailTab };
