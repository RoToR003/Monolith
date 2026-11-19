//# allFunctionsCalledOnLoad
import { a as i18n } from "./langPack-BmdJGr44.js";
import { C as createSignal, p as createComponent, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { c as insert, g as template, o as className } from "./web-BPyQozky.js";
import { i as Row } from "./confirmationPopup-Bz6mK0o-.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { p as useWallet } from "./stream-DZrVqY75.js";
import { t as wallet_module_default } from "./wallet.module-3nQsE2jy.js";
import { t as WalletHeader } from "./parts-D2eDZtIN.js";
import { a as showWalletError, s as toastWalletAfterBack } from "./alerts-DVBlV8XN.js";
import { isUserCancel, withWalletPassword } from "./send-CchmriGl.js";
//#region src/components/wallet/screens/replace.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div><div>`);
/**
* "How do you want to replace the old wallet?" — the desktop client's choice after Delete Wallet: a new wallet
* the server makes, or one brought in by its phrase.
*/
function WalletReplaceScreen() {
	const wallet = useWallet();
	const store = wallet.store;
	const [busy, setBusy] = createSignal(false);
	const createNew = async () => {
		if (busy()) return;
		setBusy(true);
		try {
			await withWalletPassword("Wallet.Replace.PasswordText", (password) => store.session.replaceWithNew(password));
			await store.refreshStatus(true);
			await store.refreshDeviceMode();
			wallet.router.pop("main");
			toastWalletAfterBack("WalletCreated", "WalletCreatedInfo");
		} catch (err) {
			if (!isUserCancel(err)) showWalletError(err, "Wallet.Replace.ErrorTitle");
		} finally {
			setBusy(false);
		}
	};
	return [createComponent(WalletHeader, {
		title: "Wallet.Replace.Title",
		back: true
	}), (() => {
		var _el$ = _tmpl$(), _el$2 = _el$.firstChild;
		insert(_el$2, () => i18n("WalletReplaceWalletTitle"));
		insert(_el$, createComponent(Section, { get children() {
			return [createComponent(Row, {
				clickable: createNew,
				get disabled() {
					return busy();
				},
				get children() {
					return [
						createComponent(Row.Icon, { icon: "add" }),
						createComponent(Row.Title, { get children() {
							return i18n("WalletCreateNew");
						} }),
						createComponent(Row.Subtitle, { get children() {
							return i18n("Wallet.Replace.CreateText");
						} })
					];
				}
			}), createComponent(Row, {
				clickable: () => wallet.router.push("restore", { mode: "import" }),
				get disabled() {
					return busy();
				},
				get children() {
					return [
						createComponent(Row.Icon, { icon: "key" }),
						createComponent(Row.Title, { get children() {
							return i18n("WalletImportExisting");
						} }),
						createComponent(Row.Subtitle, { get children() {
							return i18n("Wallet.Replace.ImportText");
						} })
					];
				}
			})];
		} }), null);
		createRenderEffect((_p$) => {
			var _v$ = wallet_module_default.body, _v$2 = wallet_module_default.caption;
			_v$ !== _p$.e && className(_el$, _p$.e = _v$);
			_v$2 !== _p$.t && className(_el$2, _p$.t = _v$2);
			return _p$;
		}, {
			e: void 0,
			t: void 0
		});
		return _el$;
	})()];
}
//#endregion
export { WalletReplaceScreen as default };
