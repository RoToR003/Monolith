//# allFunctionsCalledOnLoad
import { C as createSignal, p as createComponent, s as Show, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { _ as use, c as insert, g as template, o as className, s as delegateEvents, u as memo } from "./web-BPyQozky.js";
import { r as useHotReloadGuard } from "./hotReloadGuard-BUNVkeQ4.js";
import { t as ripple } from "./ripple-D7hcIc_t.js";
import { n as attachHotClassName } from "./classname-DB9i2ReQ.js";
import { t as I18nTsx } from "./i18n-CGMFiAW0.js";
import { i as createPopup, n as PopupElement } from "./indexTsx-v9mB9bAq.js";
import { t as numberThousandSplitter } from "./numberThousandSplitter-CGiPNwwW.js";
import { t as defineSolidElement } from "./defineSolidElement-DU5LO9SF.js";
import { V as currencyStarIcon } from "./confirmationPopup-Bz6mK0o-.js";
import { t as Space } from "./space-XGOOgiuc.js";
import { i as styles_module_default } from "./datePicker-D1G1w7Ns.js";
import { t as SimpleFormField } from "./simpleFormField-CGA0MMzH.js";
import { n as commonStyles_module_default, t as PublishTimeField } from "./publishTimeField-Cbosu3ZN.js";
import { t as useStarsCommissionAndWithdrawalPrice } from "./useStarsCommissionAndWithdrawalPrice-CBMOduwU.js";
//#region src/components/chat/suggestPostPopup/content.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div>`);
var _tmpl$2 = /*#__PURE__*/ template(`<button class="btn-primary btn-color-primary btn-large">`);
var MIN_STARS = 5;
var MAX_STARS = 1e5;
var SuggestPostPopupContent = defineSolidElement({
	name: "suggested-post-popup-content",
	component: (props) => {
		attachHotClassName(props.element, styles_module_default.Container);
		const { useAppConfig } = useHotReloadGuard();
		const [stars, setStars] = createSignal(props.initialStars ? props.initialStars + "" : "");
		const [publishingTimestamp, setPublishingTimestamp] = createSignal(props.initialTimestamp && props.initialTimestamp * 1e3 > Date.now() + 6e4 ? props.initialTimestamp : void 0);
		const appConfig = useAppConfig();
		const { willReceiveDollars } = useStarsCommissionAndWithdrawalPrice(() => +stars() || 0, { commissionKey: "stars_suggested_post_commission_permille" });
		const minStars = () => appConfig.stars_suggested_post_amount_min || MIN_STARS;
		const maxStars = () => appConfig.stars_suggested_post_amount_max || MAX_STARS;
		const isBadPrice = () => +stars() && +stars() < minStars();
		const hasErrors = () => isBadPrice();
		const onChange = (value) => {
			setStars(!value ? value : "" + Math.min(maxStars(), +value.replace(/\D/g, "") || 0));
		};
		const onFinish = () => {
			if (hasErrors()) return;
			props.onFinish({
				stars: +stars() || void 0,
				timestamp: publishingTimestamp() || void 0
			});
		};
		return [
			createComponent(SimpleFormField, {
				get value() {
					return stars();
				},
				onChange,
				get isError() {
					return isBadPrice();
				},
				get children() {
					return [
						createComponent(SimpleFormField.SideContent, {
							first: true,
							get children() {
								return currencyStarIcon({ class: commonStyles_module_default.Icon });
							}
						}),
						createComponent(SimpleFormField.Input, {
							type: "number",
							forceFieldValue: true
						}),
						createComponent(SimpleFormField.Label, {
							forceOffset: 44,
							get children() {
								return createComponent(I18nTsx, {
									get key() {
										return !isBadPrice() ? "SuggestedPosts.EnterPrice.Label" : "SuggestedPosts.EnterPrice.MinOffer";
									},
									get args() {
										return memo(() => !!isBadPrice())() ? [minStars() + ""] : void 0;
									}
								});
							}
						}),
						createComponent(SimpleFormField.SideContent, {
							last: true,
							get children() {
								return createComponent(Show, {
									get when() {
										return willReceiveDollars();
									},
									get children() {
										return [
											"~",
											memo(() => numberThousandSplitter(willReceiveDollars(), ",")),
											"$"
										];
									}
								});
							}
						})
					];
				}
			}),
			(() => {
				var _el$ = _tmpl$();
				insert(_el$, createComponent(I18nTsx, { key: "SuggestedPosts.EnterPrice.Description" }));
				createRenderEffect(() => className(_el$, styles_module_default.Caption));
				return _el$;
			})(),
			createComponent(Space, { amount: "2rem" }),
			createComponent(PublishTimeField, {
				noTimeLangKey: "SuggestedPosts.PublishingTime.Anytime",
				get value() {
					return publishingTimestamp();
				},
				onChange: setPublishingTimestamp
			}),
			(() => {
				var _el$2 = _tmpl$();
				insert(_el$2, createComponent(I18nTsx, { key: "SuggestedPosts.PublishingTime.Description" }));
				createRenderEffect(() => className(_el$2, styles_module_default.Caption));
				return _el$2;
			})(),
			createComponent(Space, { amount: "2rem" }),
			(() => {
				var _el$3 = _tmpl$2();
				_el$3.$$click = onFinish;
				use(ripple, _el$3, () => true);
				insert(_el$3, createComponent(I18nTsx, { key: "SuggestedPosts.MakeAnOffer" }));
				createRenderEffect(() => _el$3.disabled = hasErrors());
				return _el$3;
			})()
		];
	}
});
delegateEvents(["click"]);
//#endregion
//#region src/components/chat/suggestPostPopup/index.tsx
function showSuggestPostPopup({ HotReloadGuard, suggestChange, onFinish, ...rest }) {
	const [show, setShow] = createSignal(true);
	const content = new SuggestPostPopupContent();
	content.HotReloadGuard = HotReloadGuard;
	content.feedProps({
		...rest,
		onFinish: (payload) => {
			onFinish(payload);
			setShow(false);
		}
	});
	createPopup(() => createComponent(PopupElement, {
		"class": "suggested-post-popup",
		closable: true,
		get show() {
			return show();
		},
		get children() {
			return [createComponent(PopupElement.Header, { get children() {
				return [createComponent(PopupElement.CloseButton, {}), createComponent(PopupElement.Title, { title: suggestChange ? "SuggestedPosts.SuggestAChange" : "SuggestedPosts.SuggestAPost" })];
			} }), createComponent(PopupElement.Body, { children: content })];
		}
	}));
}
//#endregion
export { showSuggestPostPopup as default };
