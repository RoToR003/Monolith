//# allFunctionsCalledOnLoad
import { a as i18n } from "./langPack-BmdJGr44.js";
import { C as createSignal, g as createEffect, m as createComputed, p as createComponent, s as Show } from "./solid-9Vxm0VIz.js";
import { d as render } from "./web-BPyQozky.js";
import { t as Transition } from "./transition-Cmlc134D.js";
import { i as Row, s as CheckboxFieldTsx } from "./confirmationPopup-Bz6mK0o-.js";
import { r as PromiseCollector } from "./mediaHeader-CnpQNwOl.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { t as useStarsCommissionAndWithdrawalPrice } from "./useStarsCommissionAndWithdrawalPrice-CBMOduwU.js";
import { t as StarRangeInput } from "./starsRangeInput-DkDwusE1.js";
//#region src/components/sidebarRight/tabs/groupPermissions/chargeForMessasgesSection.tsx
var TRANSITION_PARAMS = {
	duration: 200,
	easing: "ease-out"
};
var ChargeForMessasgesSection = (props) => {
	const [checked, setChecked] = createSignal(!!props.initialStars);
	const [stars, setStars] = createSignal(props.initialStars || 0);
	const { commissionPercents, willReceiveDollars } = useStarsCommissionAndWithdrawalPrice(stars);
	createComputed(() => {
		if (checked()) setStars((prev) => prev || props.initialStars || 1);
		else setStars(0);
	});
	let first = true;
	createEffect(() => {
		if (first) {
			first = false;
			stars();
			return;
		}
		props.onStarsChange(stars());
	});
	return [createComponent(Section, {
		caption: "PaidMessages.ChargeForGroupMessagesDescription",
		get children() {
			return createComponent(Row, { get children() {
				return [createComponent(Row.CheckboxFieldToggle, { get children() {
					return createComponent(CheckboxFieldTsx, {
						toggle: true,
						get checked() {
							return checked();
						},
						onChange: setChecked
					});
				} }), createComponent(Row.Title, { get children() {
					return i18n("PaidMessages.ChargeForMessages");
				} })];
			} });
		}
	}), createComponent(Transition, {
		onEnter: async (el, done) => {
			const height = el.scrollHeight;
			await el.animate({ height: ["0px", height + "px"] }, TRANSITION_PARAMS).finished;
			done();
		},
		onExit: async (el, done) => {
			const height = el.clientHeight;
			await el.animate({
				height: [height + "px", "0px"],
				opacity: [1, 0]
			}, TRANSITION_PARAMS).finished;
			done();
		},
		get children() {
			return createComponent(Show, {
				get when() {
					return checked();
				},
				get children() {
					return createComponent(Section, {
						name: "PaidMessages.SetPrice",
						"class": "overflow-hidden",
						caption: "PaidMessages.SetPriceGroupDescription",
						get captionArgs() {
							return [commissionPercents(), willReceiveDollars()];
						},
						get children() {
							return createComponent(StarRangeInput, {
								get value() {
									return stars();
								},
								onChange: setStars
							});
						}
					});
				}
			});
		}
	})];
};
var createChargeForMessasgesSection = (props, HotReloadProvider) => {
	const element = document.createElement("div");
	const promiseCollectorHelper = PromiseCollector.createHelper();
	return {
		element,
		dispose: render(() => createComponent(HotReloadProvider, { get children() {
			return createComponent(PromiseCollector, {
				get onCollect() {
					return promiseCollectorHelper.onCollect;
				},
				get children() {
					return createComponent(ChargeForMessasgesSection, props);
				}
			});
		} }), element),
		promise: promiseCollectorHelper.await()
	};
};
//#endregion
export { createChargeForMessasgesSection as default };
