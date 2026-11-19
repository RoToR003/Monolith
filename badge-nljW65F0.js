//# allFunctionsCalledOnLoad
import { g as createEffect, p as createComponent } from "./solid-9Vxm0VIz.js";
import { t as Dynamic } from "./web-BPyQozky.js";
import { t as replaceContent } from "./replaceContent-Bi6ru3li.js";
import { n as setRollingText } from "./animatedCounter-DSopLGin.js";
//#region src/helpers/setBadgeContent.ts
function setBadgeContent(badge, content) {
	replaceContent(badge, content);
	badge.classList.toggle("is-badge-empty", !content);
}
/** the count each badge was last given - which way a new one rolls, and whether it was shown */
var badgeCounts = /* @__PURE__ */ new WeakMap();
/**
* Writes a count into a badge as `text` (the count itself unless given, `1.2K` say): one that
* changes on a badge in sight rolls to the new one (`setRollingText`), as unread counters do in
* the official apps, while a badge that comes or goes - from or to no count - does not roll, nor
* does one that is not a change of the same count (`animate: false` - another chat's, say).
* The badge's `is-badge-empty` is left to whoever renders it (`<Badge count>`)
*/
function rollBadgeCount(badge, count, text, animate = true) {
	count || (count = 0);
	text = count ? text ?? "" + count : "";
	const previous = badgeCounts.get(badge);
	badgeCounts.set(badge, count);
	setRollingText({
		element: badge,
		text,
		direction: count - (previous || 0),
		animate: animate && !!previous && !!count
	});
}
/** `rollBadgeCount`, hiding the badge without a count */
function setBadgeCount(badge, count, text, animate) {
	rollBadgeCount(badge, count, text, animate);
	badge.classList.toggle("is-badge-empty", !count);
}
//#endregion
//#region src/components/badge.tsx
function Badge(props) {
	let element;
	const hasCount = "count" in props;
	if (hasCount) createEffect(() => {
		const count = props.count || 0;
		rollBadgeCount(element, count, count ? props.format?.(count) : void 0);
	});
	return createComponent(Dynamic, {
		get component() {
			return props.tag;
		},
		ref: (el) => element = el,
		"class": "badge",
		get classList() {
			return {
				[`badge-${props.size}`]: !!props.size,
				[`badge-${props.color}`]: !!props.color,
				"badge-rectangle": !!props.rectangle,
				"is-badge-empty": hasCount ? !props.count : !props.children,
				[props.class]: !!props.class
			};
		},
		get children() {
			return hasCount ? void 0 : props.children;
		}
	});
}
//#endregion
export { setBadgeContent as n, setBadgeCount as r, Badge as t };
