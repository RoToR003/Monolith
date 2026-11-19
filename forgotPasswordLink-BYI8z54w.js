//# allFunctionsCalledOnLoad
import { d as ctx } from "./userAgent-ByGXcznk.js";
import { t as noop } from "./noop-H9NNBLfX.js";
import { a as safeAssign } from "./idb-BZfkipS3.js";
import { a as i18n } from "./langPack-BmdJGr44.js";
import { t as tsNow } from "./tsNow-DUzGGNNb.js";
import { n as bindManagersToSession } from "./bindManagersToAccount-BL82O9H9.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { t as confirmationPopup } from "./confirmationPopup-Bz6mK0o-.js";
import { l as formatDuration, r as wrapFormattedDuration } from "./wrapDuration-BQgz9hDF.js";
import { t as anchorCallback } from "./anchorCallback-BbwAJdBk.js";
import { i as wrapEmailPattern } from "./emailVerification-C8QYZSyu.js";
import { r as toastNew } from "./toast-B6VD5M7R.js";
//#region src/components/sidebarLeft/tabs/2fa/forgotPasswordLink.ts
var ForgotPasswordLink = class {
	constructor(options) {
		this.pending = false;
		this.handleCancel = () => {
			if (this.pending) return;
			this.pending = true;
			this.managers.passwordManager.declinePasswordReset().then(() => {
				this.state.pending_reset_date = void 0;
				this.update();
			}).catch((err) => {
				toastNew({ langPackKey: "Error.AnError" });
			}).finally(() => {
				this.pending = false;
			});
		};
		this.handleReset = () => {
			const managers = bindManagersToSession(this.managers);
			const canReset = this.state.pending_reset_date && this.state.pending_reset_date < tsNow(true);
			if (this.state.pFlags.has_recovery && !this.forEmail && !canReset) managers.passwordManager.requestRecovery().then((res) => {
				this.tab.slider.createTab(hotReloadGuard.tabs.AppTwoStepVerificationEmailConfirmationTab).open({
					email: wrapEmailPattern(res.email_pattern),
					length: 6,
					state: this.state,
					forPasswordReset: true
				});
			}).catch((err) => {
				toastNew({ langPackKey: "Error.AnError" });
			});
			else {
				if (!this.allowReset) return;
				confirmationPopup({
					titleLangKey: "ResetPassword.Title",
					descriptionLangKey: canReset ? "ResetPassword.Confirm" : this.forEmail ? "ResetPassword.TroubleText" : "ResetPassword.NoRecovery",
					className: "two-step-verification-forgot-popup",
					button: { langKey: "Reset" }
				}).then(() => {
					if (this.pending) return;
					this.pending = true;
					managers.passwordManager.resetPassword().then((result) => {
						switch (result._) {
							case "account.resetPasswordFailedWait":
								toastNew({
									langPackKey: "ResetPassword.Wait",
									langPackArguments: [wrapFormattedDuration(formatDuration(result.retry_date - tsNow(true), 2))]
								});
								break;
							case "account.resetPasswordRequestedWait":
								this.state.pending_reset_date = result.until_date;
								this.update();
								if (this.forEmail) this.tab.slider.sliceTabsUntilTab(hotReloadGuard.tabs.AppPrivacyAndSecurityTab, this.tab);
								break;
							case "account.resetPasswordOk":
								toastNew({ langPackKey: "ResetPassword.Success" });
								this.tab.slider.sliceTabsUntilTab(hotReloadGuard.tabs.AppSettingsTab, this.tab);
								this.tab.close();
						}
					}).catch((err) => {
						toastNew({ langPackKey: "Error.AnError" });
					}).finally(() => {
						this.pending = false;
					});
				}, noop);
			}
		};
		safeAssign(this, options);
		this.container = document.createElement("div");
		this.container.classList.add("two-step-verification-forgot");
		this.update();
	}
	update() {
		if (this.updateTimeout) {
			clearTimeout(this.updateTimeout);
			this.updateTimeout = void 0;
		}
		const now = tsNow(true);
		if (this.state.pending_reset_date && this.state.pending_reset_date > now) {
			const diff = this.state.pending_reset_date - now;
			if (diff > 0) this.container.replaceChildren(i18n("ResetPassword.RequestPending", [wrapFormattedDuration(formatDuration(diff, 2)), anchorCallback(this.handleCancel)]));
			this.updateTimeout = ctx.setTimeout(() => {
				this.updateTimeout = void 0;
				this.update();
			}, diff * 1e3);
		} else {
			const canReset = this.state.pending_reset_date && this.state.pending_reset_date <= now;
			this.container.replaceChildren(i18n(canReset ? "ResetPassword.Action" : this.forEmail ? "TroubleEmail" : "ForgotPassword", [anchorCallback(this.handleReset)]));
		}
	}
	cleanup() {
		if (this.updateTimeout) {
			clearTimeout(this.updateTimeout);
			this.updateTimeout = void 0;
		}
	}
};
//#endregion
export { ForgotPasswordLink as t };
