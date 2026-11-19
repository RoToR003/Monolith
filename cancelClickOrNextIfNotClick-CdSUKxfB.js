//# allFunctionsCalledOnLoad
import "./rootScope-CZS0lmz8.js";
import { a as i18n } from "./langPack-BmdJGr44.js";
import { r as getOverlayRoot } from "./appWindow-bo-KtJhy.js";
import { t as cancelEvent } from "./cancelEvent-Cw8vYZHp.js";
import { P as formatDate } from "./index-B7axFZql.js";
//#region src/components/chat/dateBubble.ts
function createDateBubble(timestamp, date = /* @__PURE__ */ new Date(timestamp * 1e3), isScheduled = false, label) {
	const today = /* @__PURE__ */ new Date();
	today.setHours(0, 0, 0, 0);
	let dateElement;
	if (label) dateElement = label;
	else if (today.getTime() === date.getTime()) dateElement = i18n(isScheduled ? "Chat.Date.ScheduledForToday" : "Date.Today");
	else if (isScheduled && timestamp === 2147483646) dateElement = i18n("MessageScheduledUntilOnline");
	else {
		dateElement = formatDate(date, { today });
		if (isScheduled) dateElement = i18n("Chat.Date.ScheduledFor", [dateElement]);
	}
	const bubble = document.createElement("div");
	bubble.className = "bubble service is-date";
	const bubbleContent = document.createElement("div");
	bubbleContent.classList.add("bubble-content");
	const serviceMsg = document.createElement("div");
	serviceMsg.classList.add("service-msg");
	serviceMsg.append(dateElement);
	bubbleContent.append(serviceMsg);
	bubble.append(bubbleContent);
	return bubble;
}
//#endregion
//#region src/helpers/dom/cancelClickOrNextIfNotClick.ts
function cancelClickOrNextIfNotClick(e) {
	if (e.type === "click") {
		cancelEvent(e);
		return;
	}
	getOverlayRoot().addEventListener("click", cancelEvent, {
		once: true,
		capture: true
	});
}
//#endregion
export { createDateBubble as n, cancelClickOrNextIfNotClick as t };
