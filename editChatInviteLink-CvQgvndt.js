//# allFunctionsCalledOnLoad
import { a as i18n } from "./langPack-BmdJGr44.js";
import { C as createSignal, N as onMount, p as createComponent, s as Show } from "./solid-9Vxm0VIz.js";
import { t as tsNow } from "./tsNow-DUzGGNNb.js";
import { t as clamp } from "./clamp-9UaNhw6N.js";
import { _ as use, c as insert, g as template, u as memo } from "./web-BPyQozky.js";
import { t as findUpAsChild } from "./findUpAsChild-CPjgnY00.js";
import { r as setButtonLoader } from "./putPreloader-Bxq7N1RV.js";
import { n as attachClickEvent } from "./clickEvent-COk4YpLP.js";
import { t as placeCaretAtEnd } from "./placeCaretAtEnd-BtAUyd5U.js";
import { t as InputFieldTsx } from "./inputFieldTsx-0SbEFdGE.js";
import { L as formatFullSentTime } from "./index-B7axFZql.js";
import { i as Row, s as CheckboxFieldTsx } from "./confirmationPopup-Bz6mK0o-.js";
import { l as formatDuration, r as wrapFormattedDuration } from "./wrapDuration-BQgz9hDF.js";
import { i as usePromiseCollector } from "./mediaHeader-CnpQNwOl.js";
import { a as Section } from "./emailVerification-C8QYZSyu.js";
import { r as wrapSolidComponent } from "./wrapSolidComponent-BASCjNJG.js";
import { n as useSuperTab } from "./superTabProvider-LtveyH7W.js";
import { t as toastError } from "./toastError-BSN4cjN_.js";
import { t as showDatePickerPopup } from "./datePicker-D1G1w7Ns.js";
import { t as InputRightNumber } from "./payment-BzrfNdna.js";
import { t as RangeStepsSelector } from "./rangeStepsSelector-Bh8olSph.js";
import { t as ButtonCorner } from "./buttonCorner-HdHn23eT.js";
import { t as InputStarsField } from "./makePaid-CX3w4GlF.js";
//#region src/components/sidebarRight/tabs/editChatInviteLink.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div class=input-wrapper>`);
var _tmpl$2 = /*#__PURE__*/ template(`<div>`);
function findClosestDifference(array, difference) {
	return array.map((value, idx) => {
		return {
			idx,
			diff: Math.abs(value - difference)
		};
	}).sort((a, b) => a.diff - b.diff)[0];
}
var EditChatInviteLink = () => {
	const [tab] = useSuperTab();
	const promiseCollector = usePromiseCollector();
	const { chatId, invite } = tab.payload;
	let nameInputField;
	let timePeriodSelector;
	let usersLimitSelector;
	let paidLinkInputField;
	let timePeriodContent;
	let usersLimitContent;
	const [isBroadcast, setIsBroadcast] = createSignal(false);
	const [paidWrapper, setPaidWrapper] = createSignal();
	const [paidLink, setPaidLink] = createSignal(false);
	const [paidLinkDisabled, setPaidLinkDisabled] = createSignal(false);
	const [approveNewMembers, setApproveNewMembers] = createSignal(false);
	const [approveDisabled, setApproveDisabled] = createSignal(false);
	const [approveCaption, setApproveCaption] = createSignal();
	const [usersLimitHidden, setUsersLimitHidden] = createSignal(false);
	const onPaidLinkChange = (checked) => {
		setApproveDisabled(checked);
		setApproveCaption(i18n(checked ? "ApproveNewMembersDescription" : "InviteLink.AdminApproval.Disabled"));
		paidWrapper()?.classList.toggle("hide", !checked);
	};
	const onApproveNewMembersChange = (checked) => {
		setUsersLimitHidden(checked);
	};
	const build = async () => {
		const confirmBtn = ButtonCorner({
			className: "is-visible",
			icon: "check",
			ariaLabel: "Save"
		});
		tab.content.append(confirmBtn);
		attachClickEvent(confirmBtn, async () => {
			const removeLoader = setButtonLoader(confirmBtn);
			const expireDateValue = timePeriodSelector.value;
			const expireDate = expireDateValue instanceof Date ? expireDateValue.getTime() / 1e3 | 0 : expireDateValue ? tsNow(true) + expireDateValue : 0;
			const title = nameInputField.value;
			const requestNeeded = approveNewMembers();
			const usageLimit = requestNeeded ? 0 : usersLimitSelector.value ?? 0;
			let chatInvite;
			try {
				if (invite) chatInvite = (await tab.managers.appChatInvitesManager.editExportedChatInvite({
					chatId,
					link: invite.link,
					expireDate,
					requestNeeded,
					title,
					usageLimit
				})).invite;
				else chatInvite = await tab.managers.appChatInvitesManager.exportChatInvite({
					chatId,
					title,
					requestNeeded,
					usageLimit,
					expireDate,
					stars: paidLink() ? +paidLinkInputField.value : void 0
				});
			} catch (err) {
				removeLoader();
				toastError(err, "invite link save error");
				return;
			}
			tab.eventListener.dispatchEvent("finish", chatInvite);
			tab.close();
		}, { listenerSetter: tab.listenerSetter });
		if (invite?.title) nameInputField.setOriginalValue(invite.title);
		const isBroadcastChat = await tab.managers.appChatsManager.isBroadcast(chatId);
		const appConfig = await tab.managers.apiManager.getAppConfig();
		if (isBroadcastChat) {
			const wrapper = document.createElement("div");
			wrapper.classList.add("input-wrapper");
			const inputField = paidLinkInputField = InputStarsField({
				label: "InviteLink.Subscription.Placeholder",
				max: appConfig.stars_subscription_amount_max,
				middleware: tab.middlewareHelper.get(),
				onValue: (stars) => {
					rightLabel.replaceChildren(...stars ? [i18n("InviteLink.Subscription.Price", ["$" + (appConfig.stars_usd_sell_rate_x1000 / 1e3 * stars / 100).toFixed(2)])] : []);
				}
			});
			const rightLabel = document.createElement("span");
			rightLabel.classList.add("input-field-right-label");
			inputField.container.append(rightLabel);
			wrapper.append(inputField.container);
			inputField.value = "500";
			setPaidWrapper(wrapper);
			setIsBroadcast(true);
			const value = !!invite?.subscription_pricing;
			setPaidLink(value);
			onPaidLinkChange(value);
			if (value) paidLinkInputField.value = "" + invite.subscription_pricing?.amount;
			if (invite) {
				setPaidLinkDisabled(true);
				paidLinkInputField.container.classList.add("disable-hover");
			}
		}
		{
			const range = timePeriodSelector = new RangeStepsSelector({
				generateStep: (value) => {
					const formatted = formatDuration(value instanceof Date ? (value.getTime() / 1e3 | 0) - tsNow(true) : value, 1);
					return [wrapFormattedDuration(formatted, false), value];
				},
				generateSteps: (values) => {
					return [...values.map(range.generateStep), ["∞", void 0]];
				},
				onValue: (value) => {
					if (!value) setExpiry();
					else {
						let date;
						if (value instanceof Date) date = value;
						else {
							date = /* @__PURE__ */ new Date();
							date.setSeconds(date.getSeconds() + value);
						}
						setExpiry(date.getTime() / 1e3);
					}
				},
				middleware: tab.middlewareHelper.get()
			});
			const [expiryTitle, setExpiryTitle] = createSignal(i18n("EditInvitation.Never"));
			const setCustomTimestamp = (timestamp) => {
				const difference = timestamp - tsNow(true);
				const closest = findClosestDifference(stepValues, difference);
				const newSteps = steps.slice();
				newSteps[closest.idx] = range.generateStep(/* @__PURE__ */ new Date(timestamp * 1e3));
				range.setSteps(newSteps, closest.idx);
			};
			const setExpiry = (timestamp) => {
				setExpiryTitle(!timestamp ? i18n("EditInvitation.Never") : formatFullSentTime(timestamp));
			};
			const stepValues = [
				3600,
				86400,
				604800
			];
			const steps = range.generateSteps(stepValues);
			range.setSteps(steps, steps.length - 1);
			if (invite && invite.expire_date && invite.expire_date > tsNow(true)) setCustomTimestamp(invite.expire_date);
			const row = wrapSolidComponent(() => createComponent(Row, {
				clickable: () => {
					let initDate;
					const value = range.value;
					if (value) initDate = new Date(value instanceof Date ? value : tsNow() + value * 1e3);
					else {
						initDate = /* @__PURE__ */ new Date();
						initDate.setDate(initDate.getDate() + 7);
					}
					showDatePickerPopup({
						initDate,
						withTime: true,
						onPick: setCustomTimestamp,
						btnConfirmLangKey: "Save"
					});
				},
				get children() {
					return createComponent(Row.Title, {
						get titleRight() {
							return expiryTitle();
						},
						titleRightSecondary: true,
						get children() {
							return i18n("EditInvitation.ExpiryDate");
						}
					});
				}
			}), tab.middlewareHelper.get());
			timePeriodContent.append(range.container, row);
		}
		{
			const range = usersLimitSelector = new RangeStepsSelector({
				generateStep: (value) => ["" + value, value],
				generateSteps: (values) => {
					return [...values.map(range.generateStep), ["∞", void 0]];
				},
				onValue: (value) => {
					setNumber(value);
				},
				middleware: tab.middlewareHelper.get()
			});
			const inputRightNumber = new InputRightNumber();
			const { input } = inputRightNumber;
			const [numberTitle, setNumberTitle] = createSignal(i18n("EditInvitation.Unlimited"));
			const onInput = () => {
				let originalValue = inputRightNumber.value;
				const isEmpty = !originalValue.trim();
				originalValue = originalValue.replace(/\D/g, "");
				const value = clamp(isEmpty ? 0 : +originalValue, stepValues[0], 9999);
				if (!isEmpty) inputRightNumber.value = "" + value;
				ignoreNextSet = true;
				setCustomNumber(value);
			};
			tab.listenerSetter.add(input)("input", onInput);
			const setCustomNumber = (value) => {
				const closest = findClosestDifference(stepValues, value);
				const newSteps = steps.slice();
				newSteps[closest.idx] = range.generateStep(value);
				range.setSteps(newSteps, closest.idx);
			};
			let ignoreNextSet = false;
			const setNumber = (value) => {
				if (ignoreNextSet) {
					ignoreNextSet = false;
					return;
				}
				if (!value) setNumberTitle(i18n("EditInvitation.Unlimited"));
				else {
					inputRightNumber.value = "" + value;
					setNumberTitle(input);
				}
			};
			const stepValues = [
				1,
				10,
				50,
				100
			];
			const steps = range.generateSteps(stepValues);
			range.setSteps(steps, steps.length - 1);
			if (invite?.usage_limit) {
				const value = Math.max(stepValues[0], invite.usage_limit - (invite.usage || 0));
				setNumber(value);
				setCustomNumber(value);
			}
			const row = wrapSolidComponent(() => createComponent(Row, {
				clickable: true,
				noRipple: true,
				get children() {
					return createComponent(Row.Title, {
						get titleRight() {
							return numberTitle();
						},
						titleRightSecondary: true,
						get children() {
							return i18n("EditInvitation.NumberOfUsers");
						}
					});
				}
			}), tab.middlewareHelper.get());
			usersLimitContent.append(range.container, row);
			tab.listenerSetter.add(row)("mousedown", (e) => {
				if (!range.value) setCustomNumber(stepValues[0]);
				if (!findUpAsChild(e.target, input)) placeCaretAtEnd(input);
			});
		}
		if (isBroadcastChat && invite) {
			const value = !!invite.pFlags?.request_needed;
			setApproveNewMembers(value);
			setUsersLimitHidden(value);
		}
	};
	onMount(() => {
		promiseCollector.collect(build());
	});
	return [
		createComponent(Section, {
			caption: "LinkNameHelp",
			get children() {
				var _el$ = _tmpl$();
				insert(_el$, createComponent(InputFieldTsx, {
					label: "LinkNameHint",
					maxLength: 32,
					instanceRef: (ref) => nameInputField = ref
				}));
				return _el$;
			}
		}),
		createComponent(Show, {
			get when() {
				return isBroadcast();
			},
			get children() {
				return [createComponent(Section, {
					caption: invite ? "InviteLink.Subscription.Edit" : "InviteLink.Subscription.Caption",
					get children() {
						return [createComponent(Row, { get children() {
							return [createComponent(Row.CheckboxFieldToggle, { get children() {
								return createComponent(CheckboxFieldTsx, {
									signal: [paidLink, setPaidLink],
									toggle: true,
									get disabled() {
										return paidLinkDisabled();
									},
									onChange: onPaidLinkChange
								});
							} }), createComponent(Row.Title, { get children() {
								return i18n("InviteLink.Subscription.Title");
							} })];
						} }), memo(() => paidWrapper())];
					}
				}), createComponent(Section, {
					get caption() {
						return approveCaption();
					},
					get children() {
						return createComponent(Row, { get children() {
							return [createComponent(Row.CheckboxFieldToggle, { get children() {
								return createComponent(CheckboxFieldTsx, {
									signal: [approveNewMembers, setApproveNewMembers],
									toggle: true,
									get disabled() {
										return approveDisabled();
									},
									onChange: onApproveNewMembersChange
								});
							} }), createComponent(Row.Title, { get children() {
								return i18n("ApproveNewMembers");
							} })];
						} });
					}
				})];
			}
		}),
		createComponent(Section, {
			name: "LimitByPeriod",
			caption: "TimeLimitHelp",
			get children() {
				var _el$2 = _tmpl$2();
				var _ref$ = timePeriodContent;
				typeof _ref$ === "function" ? use(_ref$, _el$2) : timePeriodContent = _el$2;
				return _el$2;
			}
		}),
		createComponent(Section, {
			name: "LimitNumberOfUses",
			caption: "UsesLimitHelp",
			get classList() {
				return { hide: usersLimitHidden() };
			},
			get children() {
				var _el$3 = _tmpl$2();
				var _ref$2 = usersLimitContent;
				typeof _ref$2 === "function" ? use(_ref$2, _el$3) : usersLimitContent = _el$3;
				return _el$3;
			}
		})
	];
};
//#endregion
export { EditChatInviteLink as default, findClosestDifference };
