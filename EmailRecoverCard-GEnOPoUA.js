//# allFunctionsCalledOnLoad
import { a as i18n } from "./langPack-BmdJGr44.js";
import { C as createSignal, M as onCleanup, N as onMount, p as createComponent } from "./solid-9Vxm0VIz.js";
import { u as memo } from "./web-BPyQozky.js";
import { n as mediaSizes } from "./mediaSizes-C1MTaleW.js";
import { t as Button } from "./buttonTsx-Bwphkm9r.js";
import { t as MediaHeader } from "./mediaHeader-CnpQNwOl.js";
import { i as wrapEmailPattern } from "./emailVerification-C8QYZSyu.js";
import { n as CodeInputFieldCompat } from "./codeInputField-CuXF8PSB.js";
import { t as focusWhenSettled } from "./focusWhenSettled-C7GmSekj.js";
import { n as useAuthFlow } from "./mountAuthFlow-D-_L6zCe.js";
import { t as AuthCard } from "./AuthCard-CS3Ku-Aa.js";
import { t as AuthCardError } from "./AuthCardError-C9ELtFaQ.js";
//#region src/pages/cards/EmailRecoverCard.tsx
/**
* Card variant of `pageEmailRecover`. Shows a 6-digit input under a Mailbox
* lottie; confirming the code via `passwordManager.confirmPasswordResetEmail`
* switches to IM. The cancel button returns to the password card.
*/
function EmailRecoverCard(props) {
	const { managers, navigate, toIm } = useAuthFlow();
	const stickerSize = mediaSizes.isMobile ? 100 : 130;
	const [errorContent, setErrorContent] = createSignal();
	const codeInputField = new CodeInputFieldCompat({
		length: 6,
		label: "AccDescr.EmailCode",
		onChange: () => {
			codeInputField.error = false;
			setErrorContent(void 0);
		},
		onFill: (code) => {
			managers.passwordManager.confirmPasswordResetEmail(code).then(() => {
				toIm();
			}).catch((err) => {
				codeInputField.error = true;
				codeInputField.value = "";
				if (err.type === "CODE_INVALID") setErrorContent(i18n("PHONE_CODE_INVALID"));
				else {
					console.log("error", err);
					setErrorContent(i18n("Error.AnError"));
				}
			});
		}
	});
	let cancelFocus;
	onMount(() => {
		cancelFocus = focusWhenSettled(codeInputField.input);
	});
	onCleanup(() => {
		cancelFocus?.();
		codeInputField.cleanup();
	});
	return createComponent(AuthCard, {
		get header() {
			return createComponent(MediaHeader, { get children() {
				return [
					createComponent(MediaHeader.Sticker, {
						name: "Mailbox",
						size: stickerSize
					}),
					createComponent(MediaHeader.Title, {
						tag: "h1",
						get children() {
							return i18n("Login.ResetPassword.Title");
						}
					}),
					createComponent(MediaHeader.Subtitle, { get children() {
						return i18n("Login.ResetPassword.Subtitle", [wrapEmailPattern(props.spec.payload.email_pattern)]);
					} })
				];
			} });
		},
		get children() {
			return [
				memo(() => codeInputField.container),
				createComponent(AuthCardError, {
					get content() {
						return errorContent();
					},
					get describes() {
						return codeInputField.input;
					}
				}),
				createComponent(Button, {
					"class": "btn-primary btn-secondary btn-primary-transparent primary",
					onClick: () => navigate({ name: "password" }),
					text: "Login.ResetPassword.Cancel"
				})
			];
		}
	});
}
//#endregion
export { EmailRecoverCard as default };
