//# allFunctionsCalledOnLoad
import { N as onMount, p as createComponent } from "./solid-9Vxm0VIz.js";
import { i as STATE_INIT } from "./state-JPIG5PpJ.js";
import { _ as use, g as template } from "./web-BPyQozky.js";
import { n as putPreloader } from "./putPreloader-Bxq7N1RV.js";
import { n as useAuthFlow } from "./mountAuthFlow-D-_L6zCe.js";
import { t as AuthCard } from "./AuthCard-CS3Ku-Aa.js";
//#region src/pages/cards/SignImportCard.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div>`);
/**
* Card variant of the legacy `pageSignImport`. Shows a preloader while we try
* `auth.importWebTokenAuthorization`; on success goes to IM, on
* `SESSION_PASSWORD_NEEDED` jumps to the password card, on any other failure
* falls back to the configured default auth state (signIn or signQR) and drops
* the token server-side.
*/
function SignImportCard(props) {
	const { managers, navigate, toIm } = useAuthFlow();
	let preloaderHostEl;
	onMount(() => {
		managers.appStateManager.pushToState("authState", {
			_: "authStateSignImport",
			data: props.spec.payload
		});
		putPreloader(preloaderHostEl, true);
		importWebToken();
	});
	async function importWebToken() {
		const { dcId, token, tgAddr } = props.spec.payload;
		let nextNav;
		try {
			if ((await managers.appAccountManager.importWebTokenAuthorization(token, dcId))._ === "auth.authorization") nextNav = () => toIm();
		} catch (err) {
			switch (err.type) {
				case "SESSION_PASSWORD_NEEDED":
					nextNav = () => navigate({ name: "password" });
					break;
				default: {
					console.error("authorization import error:", err);
					managers.appAccountManager.cancelWebTokenAuthorization(token, dcId);
					const defaultState = STATE_INIT.authState._;
					if (defaultState === "authStateSignIn") nextNav = () => navigate({ name: "signIn" });
					else if (defaultState === "authStateSignQr") nextNav = () => navigate({ name: "signQR" });
					break;
				}
			}
		}
		location.hash = tgAddr?.trim() ? "#?tgaddr=" + encodeURIComponent(tgAddr) : "";
		if (nextNav) await nextNav();
	}
	return createComponent(AuthCard, {
		inputWrapper: false,
		get children() {
			var _el$ = _tmpl$();
			var _ref$ = preloaderHostEl;
			typeof _ref$ === "function" ? use(_ref$, _el$) : preloaderHostEl = _el$;
			return _el$;
		}
	});
}
//#endregion
export { SignImportCard as default };
