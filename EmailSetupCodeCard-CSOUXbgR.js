//# allFunctionsCalledOnLoad
import { N as onMount, p as createComponent } from "./solid-9Vxm0VIz.js";
import { t as EnterCodeStep } from "./emailVerification-C8QYZSyu.js";
import { r as toastNew } from "./toast-B6VD5M7R.js";
import { n as preloadTrackingMonkey } from "./tracking-FB0DWOAE.js";
import { n as useAuthFlow } from "./mountAuthFlow-D-_L6zCe.js";
import { t as AuthCard } from "./AuthCard-CS3Ku-Aa.js";
import { l as isPhoneLoginExpired } from "./sentCode-CjBd3iOg.js";
import { t as continueLogin } from "./continueLogin-bBDNivsU.js";
//#region src/pages/cards/EmailSetupCodeCard.tsx
/**
* Confirms the address entered on the previous card, then hands the login back to
* the phone code.
*
* `account.verifyEmail` with `emailVerifyPurposeLoginSetup` answers with
* `account.emailVerifiedLogin`, and its `sent_code` is the *next* step of the
* same sign-in (usually the code for the email that was just attached) — so it
* routes through `sentCodeToCardSpec` exactly like `auth.sendCode` would, and
* carries a fresh `phone_code_hash` with it.
*/
function EmailSetupCodeCard(props) {
	const { managers, navigate, toIm } = useAuthFlow();
	const { phone_number, phone_code_hash, sentCode } = props.spec.payload;
	const backToEmail = () => navigate({
		name: "emailSetup",
		payload: {
			phone_number,
			phone_code_hash
		}
	});
	onMount(() => {
		managers.appStateManager.pushToState("authState", {
			_: "authStateEmailSetupCode",
			phone_number,
			phone_code_hash,
			sentCode
		});
	});
	return createComponent(AuthCard, {
		inputWrapper: false,
		get children() {
			return createComponent(EnterCodeStep, {
				variant: "card",
				managers,
				purpose: {
					_: "emailVerifyPurposeLoginSetup",
					phone_number,
					phone_code_hash
				},
				sentCode,
				onExpired: backToEmail,
				onError: (err) => {
					if (!isPhoneLoginExpired(err)) return false;
					toastNew({ langPackKey: "PHONE_CODE_EXPIRED" });
					navigate({ name: "signIn" });
					return true;
				},
				onSuccess: async (result) => {
					if (result._ !== "account.emailVerifiedLogin") {
						console.error("unexpected account.verifyEmail result", result);
						toastNew({ langPackKey: "Error.AnError" });
						return;
					}
					await preloadTrackingMonkey();
					await continueLogin(result.sent_code, {
						managers,
						navigate,
						toIm,
						phone_number,
						phone_code_hash
					});
				},
				secondaryAction: {
					text: "Login.EditEmail",
					onClick: backToEmail
				}
			});
		}
	});
}
//#endregion
export { EmailSetupCodeCard as default };
