//# allFunctionsCalledOnLoad
import { t as Icon } from "./icon-DbP6Es97.js";
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { a as i18n } from "./langPack-BmdJGr44.js";
import { t as showFeatureDetailsPopup } from "./featureDetails-CneJjJj-.js";
import { r as WALLET_FIRST_GRAMS_SUGGESTION } from "./transferMessages-BVUO3_q3.js";
import { r as loadWalletGemSticker, t as createGramRate } from "./howItWorks-97fqSyW8.js";
//#region src/components/wallet/firstGrams.tsx
/**
* An icon in a sentence that pictures a control ("click 📎"): a screen reader hears the control's name instead
*/
function controlIcon(icon, name) {
	const span = document.createElement("span");
	const label = i18n(name);
	label.classList.add("sr-only");
	span.append(Icon(icon, "inline-icon"), label);
	return span;
}
/**
* "Your first Grams!" — what Grams are good for, shown once after the first incoming transfer (tdesktop:
* WalletFirstGramsBox). Closing it in any way dismisses the suggestion that asked for it. Resolves once it closed.
*/
async function showWalletFirstGramsPopup(sticker) {
	sticker ?? (sticker = await loadWalletGemSticker());
	const rate = createGramRate();
	return new Promise((resolve) => {
		showFeatureDetailsPopup({
			sticker,
			title: i18n("WalletFirstGrams"),
			get subtitle() {
				const value = rate();
				return value ? i18n("Wallet.First.Rate", [value]) : i18n("WalletFirstGramsActions");
			},
			rows: [
				{
					icon: "send2",
					title: i18n("WalletSend"),
					subtitle: i18n("Wallet.First.SendText", [controlIcon("attach", "Chat.Input.Attach"), i18n("WalletAttachMoney")])
				},
				{
					icon: "dollar_circle",
					title: i18n("WalletTrade"),
					subtitle: i18n("WalletFirstGramsTradeInfo")
				},
				{
					icon: "wallet",
					title: i18n("WalletStore"),
					subtitle: i18n("Wallet.First.StoreText", [controlIcon("menu", "MultiAccount.More"), i18n("WalletAttachMoney")])
				}
			],
			buttons: [{ text: i18n("WalletGotIt") }],
			onClose: () => {
				rootScope.managers.appPromoManager.dismissSuggestion(WALLET_FIRST_GRAMS_SUGGESTION);
				resolve();
			}
		});
	});
}
/**
* Shows "Your first Grams!" while the server still suggests it. Resolves with whether it was shown, after it
* closed — whatever the caller opens next (the transfer a chat card was clicked for) comes after it, as in tdesktop.
* `stillWanted` is asked once the server answered: what it was to go over may have closed meanwhile (iOS).
*/
async function showWalletFirstGramsIfPending(stillWanted) {
	if (!await rootScope.managers.appPromoManager.hasPendingSuggestion("WALLET_FIRST_INCOMING_TRANSFER").catch(() => false)) return false;
	const sticker = await loadWalletGemSticker();
	if (stillWanted && !stillWanted()) return false;
	await showWalletFirstGramsPopup(sticker);
	return true;
}
//#endregion
export { showWalletFirstGramsIfPending, showWalletFirstGramsPopup };
