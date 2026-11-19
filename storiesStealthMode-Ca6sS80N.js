//# allFunctionsCalledOnLoad
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { a as i18n } from "./langPack-BmdJGr44.js";
import { M as onCleanup } from "./solid-9Vxm0VIz.js";
import { t as tsNow } from "./tsNow-DUzGGNNb.js";
import { s as useAppConfig } from "./contentSettings-DMhHR-0w.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { Et as usePremium } from "./confirmationPopup-Bz6mK0o-.js";
import { o as wrapStoriesStealthModeDuration } from "./wrapDuration-BQgz9hDF.js";
import { m as slowModeTimer } from "./utils-BnbsfEKH.js";
import { t as showFeatureDetailsPopup } from "./featureDetails-CneJjJj-.js";
import { n as createFeatureDetailsIconSticker } from "./untrackActions-C9U0KjUP.js";
//#region src/components/popups/storiesStealthMode.tsx
async function showStoriesStealthModePopup(props = {}) {
	const appConfig = useAppConfig();
	const isPremium = usePremium();
	const stealthMode = await rootScope.managers.appStoriesManager.getStealthMode();
	const getLeftCooldown = () => (stealthMode.cooldown_until_date || 0) - tsNow(true);
	const getButton = () => {
		if (!isPremium()) return {
			text: i18n("Stories.StealthMode.Unlock"),
			onClick: () => {
				hotReloadGuard.showPremiumPopup({ feature: "stories" });
			}
		};
		else if (getLeftCooldown() > 0) {
			const { element, dispose } = slowModeTimer(getLeftCooldown);
			onCleanup(dispose);
			return { text: i18n("Stories.StealthMode.Cooldown", [element]) };
		} else return {
			text: i18n("Stories.StealthMode.Button"),
			onClick: async () => {
				if ((stealthMode.active_until_date || 0) <= tsNow(true)) await rootScope.managers.appStoriesManager.activateStealthMode();
				props.onActivate?.();
			}
		};
	};
	showFeatureDetailsPopup({
		rows: [{
			icon: "backward_5",
			title: i18n("Stories.StealthMode.Row1.Title"),
			subtitle: i18n("Stories.StealthMode.Row1.Subtitle", [wrapStoriesStealthModeDuration(appConfig.stories_stealth_past_period)])
		}, {
			icon: "forward_25",
			title: i18n("Stories.StealthMode.Row2.Title"),
			subtitle: i18n("Stories.StealthMode.Row2.Subtitle", [wrapStoriesStealthModeDuration(appConfig.stories_stealth_future_period)])
		}],
		sticker: { element: createFeatureDetailsIconSticker("eye2_filled", "background-gradient-stories") },
		title: i18n("Stories.StealthMode.Title"),
		subtitle: i18n("Stories.StealthMode.Subtitle"),
		get buttons() {
			return [getButton()];
		},
		onClose: props.onClose
	});
}
//#endregion
export { showStoriesStealthModePopup as t };
