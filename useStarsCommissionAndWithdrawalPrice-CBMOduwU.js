//# allFunctionsCalledOnLoad
import { _ as createMemo } from "./solid-9Vxm0VIz.js";
import { r as useHotReloadGuard } from "./hotReloadGuard-BUNVkeQ4.js";
//#region src/components/sidebarLeft/tabs/privacy/messages/useStarsCommissionAndWithdrawalPrice.ts
var useStarsCommissionAndWithdrawalPrice = (stars, { commissionKey = "stars_paid_message_commission_permille", withdrawRateKey = "stars_usd_withdraw_rate_x1000" } = {}) => {
	const { useAppConfig } = useHotReloadGuard();
	const appConfig = useAppConfig();
	const commission = createMemo(() => (+appConfig[commissionKey] || 0) / 1e3);
	const centsPerStar = createMemo(() => (+appConfig[withdrawRateKey] || 0) / 1e3);
	return {
		commissionPercents: createMemo(() => Math.round(commission() * 100)),
		willReceiveDollars: createMemo(() => Math.max(.01 * Number(!!stars()), Math.round(commission() * centsPerStar() * stars()) / 100))
	};
};
//#endregion
export { useStarsCommissionAndWithdrawalPrice as t };
