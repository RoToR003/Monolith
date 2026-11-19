//# allFunctionsCalledOnLoad
import { n as __exportAll } from "./rolldown-runtime-CwcJO0Gh.js";
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { n as deferredPromise } from "./cancellablePromise-bof--dnO.js";
import { n as bindManagersToSession } from "./bindManagersToAccount-BL82O9H9.js";
import { r as addCancelButton } from "./indexTsx-v9mB9bAq.js";
import { n as InputState } from "./inputField-CaCo30N0.js";
import { t as PasswordInputField } from "./passwordInputField-QceorkLx.js";
import { r as showPeerPopup } from "./confirmationPopup-Bz6mK0o-.js";
import { t as shake } from "./shake-1vPuqgfm.js";
//#region src/components/popups/password.tsx
var password_exports = /* @__PURE__ */ __exportAll({ passwordPopup: () => passwordPopup });
async function passwordPopup(options) {
	let state = await rootScope.managers.passwordManager.getState();
	const passwordInputField = new PasswordInputField({
		labelText: state.hint ?? "",
		onRawInput: () => {
			passwordInputField.setState(InputState.Neutral);
		}
	});
	let resolved = false, retriedWithout = false, rejectedWith;
	const deferred = deferredPromise();
	const buttonOptions = {
		langKey: options.button?.langKey ?? "Confirm",
		langArgs: options.button?.langArgs ?? [],
		callback: async () => {
			const managers = bindManagersToSession(rootScope.managers);
			buttonOptions.element.disabled = true;
			try {
				const attempt = async () => options.callback(await managers.passwordManager.getInputCheckPassword(passwordInputField.value, state));
				let result;
				try {
					result = await attempt();
				} catch (err) {
					if (err?.type !== "SRP_ID_INVALID") throw err;
					state = await managers.passwordManager.getState();
					result = await attempt();
				}
				deferred.resolve(result);
				resolved = true;
				return true;
			} catch (err) {
				console.error(err);
				const type = err?.type || "";
				if (options.retryWithoutPassword && !retriedWithout) {
					state = await managers.passwordManager.getState();
					if (!state.pFlags.has_password) {
						retriedWithout = true;
						try {
							deferred.resolve(await options.callback(void 0));
							resolved = true;
						} catch (err) {
							rejectedWith = err;
						}
						return true;
					}
				}
				if (type === "PASSWORD_HASH_INVALID") {
					passwordInputField.setState(InputState.Error, "PASSWORD_HASH_INVALID");
					if (options.shakeOnWrongPassword) shake(passwordInputField.container);
				} else if (type.startsWith("FLOOD_WAIT_")) passwordInputField.setState(InputState.Error, "PasscodeLock.TooManyAttempts");
				else if (options.rejectOtherErrors) {
					rejectedWith = err;
					return true;
				} else passwordInputField.setState(InputState.Error, "Error.AnError");
				state = await managers.passwordManager.getState();
				return false;
			} finally {
				buttonOptions.element.disabled = false;
			}
		}
	};
	showPeerPopup("popup-confirmation", {
		...options,
		inputField: passwordInputField,
		buttons: addCancelButton([buttonOptions]),
		onCloseAfterTimeout: () => {
			if (!resolved) deferred.reject(rejectedWith);
		}
	});
	return deferred;
}
//#endregion
export { password_exports as n, passwordPopup as t };
