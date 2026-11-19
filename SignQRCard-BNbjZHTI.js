//# allFunctionsCalledOnLoad
const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["qr-code-styling-Da7gbEhC.js","rolldown-runtime-CwcJO0Gh.js"])))=>i.map(i=>d[i]);
import { i as __toESM } from "./rolldown-runtime-CwcJO0Gh.js";
import { t as pause } from "./pause-BSJh-z46.js";
import { U as AccountController } from "./objectUrlUtils-5x08MNuO.js";
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { a as i18n } from "./langPack-BmdJGr44.js";
import { M as onCleanup, N as onMount, p as createComponent, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { t as __vitePreload } from "./preload-helper-B0NHKCoo.js";
import { c as insert, g as template, o as className, u as memo } from "./web-BPyQozky.js";
import { t as Button } from "./buttonTsx-Bwphkm9r.js";
import { n as putPreloader } from "./putPreloader-Bxq7N1RV.js";
import { n as mediaHeader_module_default, t as MediaHeader } from "./mediaHeader-CnpQNwOl.js";
import { n as paintQrCode } from "./paintQrCode-Bw30UIn4.js";
import { n as bytesToBase64, t as bytesCmp } from "./bytesCmp-BHLrucCP.js";
import { n as fixBase64String } from "./base64ToBytes-BKoIm5Yd.js";
import { n as useAuthFlow, t as authFlow_module_default } from "./mountAuthFlow-D-_L6zCe.js";
import { t as AuthCard } from "./AuthCard-CS3Ku-Aa.js";
import { n as LanguageChangeButton, t as PasskeyLoginButton } from "./passkeyLoginButton-Dsavc3pG.js";
//#region src/pages/cards/SignQRCard.tsx
var _tmpl$ = /*#__PURE__*/ template(`<ol>`);
var _tmpl$2 = /*#__PURE__*/ template(`<li><span>`);
var _tmpl$3 = /*#__PURE__*/ template(`<h1 style=margin-top:0>`);
var FETCH_INTERVAL = 3;
var QR_SIZE = 240;
/**
* Card variant of `pageSignQR`. Polls `auth.exportLoginToken` in a loop, painting
* the QR code into the `auth-image` slot. On `loginTokenSuccess` we go to IM; on
* `SESSION_PASSWORD_NEEDED` to the password card; on cancel/back to the signIn
* card. The loop terminates when the card unmounts (cleanup flips `stopped`).
*/
function SignQRCard(_props) {
	const { accountNumber, managers, navigate, toIm } = useAuthFlow();
	let stickerHost;
	let preloader;
	let stopped = false;
	let lastDrawnToken;
	let QRCodeStylingCtor;
	const helpKeys = [
		"Login.QR.Help1",
		"Login.QR.Help2",
		"Login.QR.Help3"
	];
	const helpList = (() => {
		var _el$ = _tmpl$();
		insert(_el$, () => helpKeys.map((key, idx) => (() => {
			var _el$2 = _tmpl$2(), _el$3 = _el$2.firstChild;
			insert(_el$3, idx + 1);
			insert(_el$2, () => i18n(key), null);
			createRenderEffect((_p$) => {
				var _v$ = authFlow_module_default.qrDescriptionItem, _v$2 = authFlow_module_default.qrDescriptionMarker;
				_v$ !== _p$.e && className(_el$2, _p$.e = _v$);
				_v$2 !== _p$.t && className(_el$3, _p$.t = _v$2);
				return _p$;
			}, {
				e: void 0,
				t: void 0
			});
			return _el$2;
		})()));
		createRenderEffect(() => className(_el$, authFlow_module_default.qrDescription));
		return _el$;
	})();
	const onUserAuth = () => {
		stopped = true;
	};
	rootScope.addEventListener("user_auth", onUserAuth, { once: true });
	async function paintQR(token) {
		if (!QRCodeStylingCtor) return;
		const encoded = bytesToBase64(token);
		const url = "tg://login?token=" + fixBase64String(encoded, true);
		const style = window.getComputedStyle(document.documentElement);
		const surfaceColor = style.getPropertyValue("--light-filled-primary-color").trim();
		const textColor = style.getPropertyValue("--primary-text-color").trim();
		const primaryColor = style.getPropertyValue("--primary-color").trim();
		const { canvas } = await paintQrCode({
			data: url,
			size: QR_SIZE,
			host: stickerHost,
			background: surfaceColor,
			foreground: textColor,
			logoColor: primaryColor,
			canvasClass: authFlow_module_default.qrCanvas,
			QRCodeStylingCtor
		});
		if (preloader) {
			preloader.style.animation = "hide-icon .4s forwards";
			canvas.style.display = "none";
			canvas.style.animation = "grow-icon .4s forwards";
			setTimeout(() => {
				canvas.style.display = "";
			}, 150);
			setTimeout(() => {
				canvas.style.animation = "";
			}, 500);
			preloader = void 0;
		} else Array.from(stickerHost.children).slice(0, -1).forEach((el) => el.remove());
		lastDrawnToken = token;
	}
	const onThemeChanged = () => {
		if (stopped || !lastDrawnToken) return;
		paintQR(lastDrawnToken);
	};
	rootScope.addEventListener("theme_changed", onThemeChanged);
	let migratedDcId;
	let prevToken;
	async function iterate(QRCodeStyling, isLoop) {
		try {
			const userIds = await AccountController.getUserIds();
			let loginToken = await managers.appAccountManager.exportLoginToken(userIds.map((userId) => userId.toUserId()));
			if (loginToken._ === "auth.loginTokenMigrateTo") {
				if (!migratedDcId) {
					migratedDcId = loginToken.dc_id;
					managers.apiManager.setBaseDcId(loginToken.dc_id);
				}
				loginToken = await managers.appAccountManager.importLoginToken(loginToken.token, migratedDcId);
			}
			if (loginToken._ === "auth.loginTokenSuccess") {
				const authorization = loginToken.authorization;
				await managers.apiManager.setUser(authorization.user);
				toIm();
				return true;
			}
			if (!prevToken || !bytesCmp(prevToken, loginToken.token)) {
				prevToken = loginToken.token;
				QRCodeStylingCtor = QRCodeStyling;
				await paintQR(loginToken.token);
			}
			if (isLoop) {
				const timestamp = Date.now() / 1e3;
				const diff = loginToken.expires - timestamp - await managers.timeManager.getServerTimeOffset();
				await pause(diff > FETCH_INTERVAL ? 1e3 * FETCH_INTERVAL : 1e3 * diff | 0);
			}
		} catch (err) {
			if (stopped) return true;
			switch (err.type) {
				case "SESSION_PASSWORD_NEEDED":
					navigate({ name: "password" });
					stopped = true;
					break;
				case "AUTH_TOKEN_EXPIRED":
					console.warn("SignQRCard: AUTH_TOKEN_EXPIRED");
					return false;
				default:
					console.error("SignQRCard: default error:", err);
					stopped = true;
			}
			return true;
		}
		return false;
	}
	onMount(async () => {
		managers.appStateManager.pushToState("authState", { _: "authStateSignQr" });
		preloader = putPreloader(stickerHost, true);
		const [{ default: QRCodeStyling }] = await Promise.all([__vitePreload(() => import("./qr-code-styling-Da7gbEhC.js").then((m) => /* @__PURE__ */ __toESM(m.default)), __vite__mapDeps([0,1]))]);
		if (stopped) return;
		while (!stopped) if (await iterate(QRCodeStyling, true) || stopped) break;
	});
	onCleanup(() => {
		stopped = true;
		rootScope.removeEventListener("user_auth", onUserAuth);
		rootScope.removeEventListener("theme_changed", onThemeChanged);
	});
	return createComponent(AuthCard, {
		get ["class"]() {
			return authFlow_module_default.pageSignQR;
		},
		inputWrapper: false,
		get header() {
			return createComponent(MediaHeader, { get children() {
				return [
					createComponent(MediaHeader.Sticker, {
						ref(r$) {
							var _ref$ = stickerHost;
							typeof _ref$ === "function" ? _ref$(r$) : stickerHost = r$;
						},
						get ["class"]() {
							return authFlow_module_default.qrContainer;
						},
						size: QR_SIZE
					}),
					(() => {
						var _el$4 = _tmpl$3();
						insert(_el$4, () => i18n("Login.QR.Title"));
						createRenderEffect(() => className(_el$4, `${mediaHeader_module_default.title} text-center text-overflow-wrap`));
						return _el$4;
					})(),
					createComponent(MediaHeader.Subtitle, {
						"class": "secondary",
						get children() {
							return i18n("Login.QR.Subtitle");
						}
					})
				];
			} });
		},
		get children() {
			return [
				helpList,
				createComponent(Button, {
					"class": "btn-primary btn-secondary btn-primary-transparent primary",
					onClick: () => {
						stopped = true;
						navigate({ name: "signIn" });
					},
					text: "Login.QR.Cancel"
				}),
				memo(() => accountNumber === 1 && createComponent(LanguageChangeButton, {})),
				createComponent(PasskeyLoginButton, {})
			];
		}
	});
}
//#endregion
export { SignQRCard as default };
