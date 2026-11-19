//# allFunctionsCalledOnLoad
import { N as onMount, p as createComponent } from "./solid-9Vxm0VIz.js";
import { n as EnterEmailStep } from "./emailVerification-C8QYZSyu.js";
import { r as toastNew } from "./toast-B6VD5M7R.js";
import { n as useAuthFlow } from "./mountAuthFlow-D-_L6zCe.js";
import { t as AuthCard } from "./AuthCard-CS3Ku-Aa.js";
import { l as isPhoneLoginExpired } from "./sentCode-CjBd3iOg.js";
//#region src/pages/cards/EmailSetupCard.tsx
/**
* `auth.sentCodeTypeSetUpEmailRequired` — the account cannot be signed into until
* a login email is attached, so the login pauses here and asks for one.
*
* The step itself is the very same component the "Add Email" popup and the
* Settings → Login Email tab render; only the `purpose` differs —
* `emailVerifyPurposeLoginSetup` carries the pending phone login, so the server
* ties the address to this sign-in attempt.
*/
function EmailSetupCard(props) {
	const { managers, navigate } = useAuthFlow();
	const { phone_number, phone_code_hash } = props.spec.payload;
	onMount(() => {
		managers.appStateManager.pushToState("authState", {
			_: "authStateEmailSetup",
			phone_number,
			phone_code_hash
		});
	});
	return createComponent(AuthCard, {
		inputWrapper: false,
		get children() {
			return createComponent(EnterEmailStep, {
				isInitialSetup: true,
				variant: "card",
				managers,
				purpose: {
					_: "emailVerifyPurposeLoginSetup",
					phone_number,
					phone_code_hash
				},
				onCodeSent: (sentCode) => navigate({
					name: "emailSetupCode",
					payload: {
						phone_number,
						phone_code_hash,
						sentCode
					}
				}),
				onError: (err) => {
					if (!isPhoneLoginExpired(err)) return false;
					toastNew({ langPackKey: "PHONE_CODE_EXPIRED" });
					navigate({ name: "signIn" });
					return true;
				},
				secondaryAction: {
					text: "Login.EditPhone",
					onClick: () => navigate({ name: "signIn" })
				}
			});
		}
	});
}
//#endregion
export { EmailSetupCard as default };
