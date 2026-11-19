//# allFunctionsCalledOnLoad
import { t as apiManagerProxy } from "./apiManagerProxy-DmQXvxSF.js";
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { u as langPack_default } from "./langPack-BmdJGr44.js";
import { p as createComponent } from "./solid-9Vxm0VIz.js";
import { u as memo } from "./web-BPyQozky.js";
import { t as IconTsx } from "./iconTsx-B4lOk4A6.js";
import { i as Row, mn as Currencies } from "./confirmationPopup-Bz6mK0o-.js";
import { b as SearchIndex } from "./getChatMigratedTo-ChhMNXuu.js";
import { c as generateDelimiter } from "./emailVerification-C8QYZSyu.js";
import { r as wrapSolidComponent } from "./wrapSolidComponent-BASCjNJG.js";
import { p as useWallet } from "./stream-DZrVqY75.js";
import { t as wallet_module_default } from "./wallet.module-3nQsE2jy.js";
import { t as WalletHeader } from "./parts-D2eDZtIN.js";
import { t as WalletPicker } from "./picker-dZ3R_SfV.js";
//#region src/components/wallet/currencyOrder.ts
/**
* The currency of a country, for the currencies a wallet rate may come in: the browser can tell a language's
* country but not its money
*/
var REGION_CURRENCIES = Object.fromEntries([..."AD AT BE CY DE EE ES FI FR GR HR IE IT LT LU LV MC ME MT NL PT SI SK SM VA XK".split(" ").map((region) => [region, "EUR"]), ..."AE:AED AF:AFN AL:ALL AM:AMD AO:AOA AR:ARS AU:AUD AZ:AZN BA:BAM BD:BDT BG:BGN BH:BHD BN:BND BO:BOB BR:BRL BY:BYN CA:CAD CH:CHF CL:CLP CN:CNY CO:COP CR:CRC CZ:CZK DK:DKK DO:DOP DZ:DZD EG:EGP ET:ETB GB:GBP GE:GEL GT:GTQ HK:HKD HN:HNL HU:HUF ID:IDR IL:ILS IN:INR IQ:IQD IS:ISK JM:JMD JO:JOD JP:JPY KE:KES KG:KGS KH:KHR KR:KRW KW:KWD KZ:KZT LB:LBP LI:CHF LK:LKR MA:MAD MD:MDL MK:MKD MM:MMK MN:MNT MO:MOP MX:MXN MY:MYR MZ:MZN NG:NGN NI:NIO NO:NOK NP:NPR NZ:NZD OM:OMR PA:PAB PE:PEN PH:PHP PK:PKR PL:PLN PY:PYG QA:QAR RO:RON RS:RSD RU:RUB SA:SAR SE:SEK SG:SGD TH:THB TJ:TJS TN:TND TR:TRY TT:TTD TW:TWD TZ:TZS UA:UAH UG:UGX US:USD UY:UYU UZ:UZS VE:VES VN:VND YE:YER ZA:ZAR ZM:ZMW".split(" ").map((pair) => pair.split(":"))]);
/** a country's money, by its ISO code */
function currencyOfRegion(region) {
	return region && REGION_CURRENCIES[region.trim().toUpperCase()];
}
/** a language's country — `en-GB` says it, `uk` means Ukraine — and that country's currency */
function currencyOfLocale(tag) {
	try {
		const locale = new Intl.Locale(tag);
		return currencyOfRegion(locale.region || locale.maximize().region);
	} catch (err) {}
}
/**
* The currencies offered before the others: the chosen one, USD, EUR (iOS walletCurrencyListItems), then the money
* of the phone number's country (Android CurrenciesController: phone_country_iso2) and of the app's and the
* browser's languages
*/
function getWalletCurrencyHints(codes, selected, languages = [langPack_default.getLastAppliedLangCode(), ...navigator.languages || [navigator.language]], phoneCountry) {
	const available = new Set(codes);
	const first = [];
	const add = (code) => {
		if (code && available.has(code) && !first.includes(code)) first.push(code);
	};
	add(selected);
	add("USD");
	add("EUR");
	add(currencyOfRegion(phoneCountry));
	languages.filter(Boolean).forEach((tag) => add(currencyOfLocale(tag)));
	return first;
}
/** iOS's order: the hints, then the rest by code */
function sortWalletCurrencies(...args) {
	const first = getWalletCurrencyHints(...args);
	return [...first, ...args[0].filter((code) => !first.includes(code)).sort()];
}
//#endregion
//#region src/components/wallet/screens/currency.tsx
/** a currency's name in the app's language, where the browser knows it; the list's own English one otherwise */
function currencyName(code, names) {
	try {
		const name = names?.of(code);
		if (name && name.toUpperCase() !== code) return name;
	} catch (err) {}
	return Currencies[code].title;
}
/**
* The currency the wallet counts its Grams in — the app's picker over the currencies the rates know, in iOS's
* order, named in the app's language
*/
function WalletCurrencyScreen() {
	const wallet = useWallet();
	const store = wallet.store;
	let names;
	try {
		names = new Intl.DisplayNames([langPack_default.getLastAppliedLangCode() || "en", "en"], { type: "currency" });
	} catch (err) {}
	let selector;
	const options = Promise.all([rootScope.managers.appWalletManager.getRates().catch(() => void 0), Promise.resolve(apiManagerProxy.getAppConfig()).catch(() => void 0)]).then(([rates, appConfig]) => {
		const available = Object.keys(rates?.rates || { USD: 1 }).filter((code) => Currencies[code]);
		const hints = getWalletCurrencyHints(available, store.currency(), void 0, appConfig?.phone_country_iso2);
		const codes = sortWalletCurrencies(available, store.currency(), void 0, appConfig?.phone_country_iso2);
		const index = new SearchIndex({ ignoreCase: true });
		codes.forEach((code) => index.indexObjectArray(code, [
			code,
			Currencies[code].title,
			currencyName(code, names)
		]));
		let query = "";
		return {
			peerType: ["custom"],
			getMoreCustom: async (q) => {
				query = q;
				return {
					result: q ? [...index.search(q)] : codes,
					isEnd: true
				};
			},
			renderResultsFunc: (keys) => {
				const middleware = selector.middlewareHelperLoader.get();
				keys.forEach((code, i) => {
					if (!query && i && i === hints.length) {
						const delimiter = generateDelimiter();
						delimiter.classList.add(wallet_module_default.pickerDelimiter);
						delimiter.setAttribute("aria-hidden", "true");
						selector.list.append(delimiter);
					}
					selector.list.append(wrapSolidComponent(() => createComponent(Row, {
						ref: (element) => element.dataset.peerId = code,
						clickable: true,
						get children() {
							return [
								createComponent(Row.Title, { get children() {
									return currencyName(code, names);
								} }),
								createComponent(Row.Subtitle, { get children() {
									return [
										code,
										" · ",
										memo(() => Currencies[code].symbol)
									];
								} }),
								createComponent(Row.RightContent, { get children() {
									return memo(() => store.currency() === code)() && createComponent(IconTsx, {
										icon: "check",
										"class": "primary"
									});
								} })
							];
						}
					}), middleware));
				});
			},
			onSelect: (code) => {
				store.setCurrency(code);
				wallet.router.pop();
				return false;
			}
		};
	});
	return [createComponent(WalletHeader, {
		title: "WalletCurrency",
		back: true
	}), createComponent(WalletPicker, {
		ref: (value) => selector = value,
		options
	})];
}
//#endregion
export { WalletCurrencyScreen as default };
