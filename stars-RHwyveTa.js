//# allFunctionsCalledOnLoad
import { i as __toESM } from "./rolldown-runtime-CwcJO0Gh.js";
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { C as createSignal, M as onCleanup, _ as createMemo, d as batch, v as createReaction, x as createRoot } from "./solid-9Vxm0VIz.js";
import { n as hotListen } from "./hotModule-aCRkP77w.js";
import { It as useDynamicCachedValue } from "./confirmationPopup-Bz6mK0o-.js";
import { r as formatStarsAmount } from "./canPollPeerStories-D3HoBvLX.js";
import { t as require_BigInteger } from "./BigInteger-0a0WsWCs.js";
//#region src/stores/stars.ts
var import_BigInteger = /* @__PURE__ */ __toESM(require_BigInteger());
var [stars, setStars] = createSignal();
var [reservedStars, setReservedStars] = createSignal(0);
var [tonBalance, setTonBalance] = createSignal();
var [reservedTonBalance, setReservedTonBalance] = createSignal(0);
var [hasTonTransactions, setHasTonTransactions] = createSignal(false);
var fetchStars = () => rootScope.managers.appPaymentsManager.getStarsStatus(true).then((starsStatus) => setStars(formatStarsAmount(starsStatus.balance)));
var fetchTonBalance = () => rootScope.managers.appPaymentsManager.getStarsStatusTon(true).then((starsStatus) => {
	batch(() => {
		setTonBalance(starsStatus.balance.amount);
		setHasTonTransactions((hasTransactions) => hasTransactions || !!starsStatus.history?.length);
	});
});
function prefetchStars(middleware) {
	return createRoot((dispose) => {
		middleware.onClean(dispose);
		const stars = useStars();
		if (stars() !== void 0) return stars();
		return new Promise((resolve) => {
			createReaction(() => resolve(stars()))(stars);
		});
	});
}
var cached;
var cachedTon;
hotListen(void 0, rootScope, "account_switched", () => {
	batch(() => {
		setStars(void 0);
		setReservedStars(0);
		setTonBalance(void 0);
		setReservedTonBalance(0);
		setHasTonTransactions(false);
	});
	cached && fetchStars();
	cachedTon && fetchTonBalance();
});
function _useStars(ton) {
	if (ton && cachedTon) return cachedTon;
	else if (!ton && cached) return cached;
	return useDynamicCachedValue(() => "useStars" + (ton ? "ton" : ""), () => {
		(ton ? fetchTonBalance : fetchStars)();
		const handler = ({ balance, fulfilledReservedStars, ton }) => {
			batch(() => {
				(ton ? setTonBalance : setStars)(balance);
				if (ton) setHasTonTransactions(true);
				if (fulfilledReservedStars) (ton ? setReservedTonBalance : setReservedStars)((prev) => Math.max(0, prev - fulfilledReservedStars));
			});
		};
		rootScope.addEventListener("stars_balance", handler);
		onCleanup(() => {
			rootScope.removeEventListener("stars_balance", handler);
		});
		return createMemo(() => {
			if (ton) return (0, import_BigInteger.default)(tonBalance()).minus(reservedTonBalance()).toString();
			return +stars() - +reservedStars();
		});
	})();
}
function useStars(ton = false) {
	if (ton) return cachedTon ?? (cachedTon = createRoot(() => _useStars(ton)));
	return cached ?? (cached = createRoot(() => _useStars(ton)));
}
//#endregion
export { useStars as i, prefetchStars as n, setReservedStars as r, hasTonTransactions as t };
