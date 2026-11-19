//# allFunctionsCalledOnLoad
import { C as createSignal, _ as createMemo, p as createComponent, s as Show } from "./solid-9Vxm0VIz.js";
import { r as useHotReloadGuard } from "./hotReloadGuard-BUNVkeQ4.js";
import { c as DurationType, r as wrapFormattedDuration } from "./wrapDuration-BQgz9hDF.js";
import { t as InlineSelect } from "./inlineSelect-CUZ60ySC.js";
import { t as createOptimisticSave } from "./createOptimisticSave-CgP3bGGy.js";
//#region src/components/sidebarLeft/tabs/inactivityPeriodRow.tsx
var makeOptions = (periods) => {
	return periods.map(({ days, duration, type }) => ({
		value: days,
		label: () => wrapFormattedDuration([{
			duration,
			type
		}])
	}));
};
/** The periods tdesktop offers for `account.setAuthorizationTTL`, in days. */
var SESSION_TTL_OPTIONS = makeOptions([
	{
		days: 7,
		duration: 1,
		type: DurationType.Weeks
	},
	{
		days: 30,
		duration: 1,
		type: DurationType.Months
	},
	{
		days: 90,
		duration: 3,
		type: DurationType.Months
	},
	{
		days: 180,
		duration: 6,
		type: DurationType.Months
	},
	{
		days: 365,
		duration: 1,
		type: DurationType.Years
	}
]);
/** The periods tdesktop's `SelfDestructionBox` offers for `account.setAccountTTL`, every one of them in months. */
var ACCOUNT_TTL_OPTIONS = makeOptions([
	{
		days: 30,
		duration: 1,
		type: DurationType.Months
	},
	{
		days: 90,
		duration: 3,
		type: DurationType.Months
	},
	{
		days: 180,
		duration: 6,
		type: DurationType.Months
	},
	{
		days: 365,
		duration: 12,
		type: DurationType.Months
	},
	{
		days: 548,
		duration: 18,
		type: DurationType.Months
	},
	{
		days: 720,
		duration: 24,
		type: DurationType.Months
	}
]);
/** A server is free to hold a period the list doesn't offer (183 days, or the 730 Android sets). */
var nearestInactivityPeriod = (options, days) => {
	return options.reduce((nearest, option) => {
		return Math.abs(days - option.value) < Math.abs(days - nearest.value) ? option : nearest;
	}, options[0]).value;
};
/**
* How long the user may stay away before the server acts — terminates a session (Active Sessions),
* deletes the account (Privacy and Security). A new period shows at once; refused, the row shows what the
* server holds then, with a toast. While `days` is 0 the period is not known, and the row offers nothing.
*/
function InactivityPeriodRow(props) {
	const { Row, i18n, toastNew } = useHotReloadGuard();
	const [rowEl, setRowEl] = createSignal();
	const [isOpen, setIsOpen] = createSignal(false);
	const selected = createMemo(() => {
		const days = props.days[0]();
		return days ? nearestInactivityPeriod(props.options, days) : void 0;
	});
	const enqueueSave = createOptimisticSave((days) => props.save(days), (days) => {
		props.days[1](days || 0);
		toastNew({ langPackKey: "Error.AnError" });
	}, () => props.reload());
	const save = (days) => {
		const [getDays, setDays] = props.days;
		const previous = getDays();
		setDays(days);
		enqueueSave(days, previous);
	};
	return createComponent(Row, {
		ref: setRowEl,
		clickable: () => setIsOpen(!!selected()),
		get ["aria-disabled"]() {
			return !selected();
		},
		get children() {
			return [createComponent(Row.Title, { get children() {
				return i18n(props.title);
			} }), createComponent(Row.RightContent, { get children() {
				return createComponent(Show, {
					get when() {
						return selected();
					},
					get children() {
						return createComponent(InlineSelect, {
							get value() {
								return selected();
							},
							get isOpen() {
								return isOpen();
							},
							onClose: () => setIsOpen(false),
							get options() {
								return props.options;
							},
							onChange: (days) => {
								setIsOpen(false);
								if (days !== selected()) save(days);
							},
							get parent() {
								return rowEl();
							}
						});
					}
				});
			} })];
		}
	});
}
//#endregion
export { InactivityPeriodRow as n, SESSION_TTL_OPTIONS as r, ACCOUNT_TTL_OPTIONS as t };
