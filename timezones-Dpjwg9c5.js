//# allFunctionsCalledOnLoad
//#region src/helpers/timezones.ts
/**
* Helpers around `help.getTimezonesList`, mirroring Android's `TimezonesController`
* (TMessagesProj/src/main/java/org/telegram/ui/Business/TimezonesController.java).
*/
function findTimezone(timezones, id) {
	return id ? timezones?.find((timezone) => timezone.id === id) : void 0;
}
/** `GMT`, `GMT+03:00`, `GMT-05:30` — the offset label shown next to a zone's name. */
function getTimezoneOffsetName(timezone) {
	const utcOffset = timezone?.utc_offset || 0;
	if (!utcOffset) return "GMT";
	const value = Math.abs(utcOffset) / 60;
	const hours = Math.floor(value / 60);
	const minutes = Math.floor(value % 60);
	const pad = (n) => (n < 10 ? "0" : "") + n;
	return `GMT${utcOffset < 0 ? "-" : "+"}${pad(hours)}:${pad(minutes)}`;
}
function getTimezoneName(timezones, id, withOffset) {
	const timezone = findTimezone(timezones, id);
	if (timezone) return withOffset ? `${timezone.name}, ${getTimezoneOffsetName(timezone)}` : timezone.name;
	if (!id) return "";
	const name = id.replace(/\//g, ", ").replace(/_/g, " ");
	if (!withOffset) return name;
	const offset = getBrowserTimezoneUtcOffset(id);
	return offset === void 0 ? name : `${name}, ${getTimezoneOffsetName({
		_: "timezone",
		id,
		name,
		utc_offset: offset
	})}`;
}
/** Seconds east of UTC for an IANA zone id, right now. `undefined` when the id is unknown. */
function getBrowserTimezoneUtcOffset(id) {
	try {
		const formatted = new Intl.DateTimeFormat("en-US", {
			timeZone: id,
			timeZoneName: "longOffset"
		}).format(/* @__PURE__ */ new Date());
		const match = formatted.match(/GMT([+-])(\d{1,2})(?::(\d{2}))?/);
		if (!match) return formatted.includes("GMT") ? 0 : void 0;
		return (match[1] === "-" ? -1 : 1) * (+match[2] * 3600 + +(match[3] || 0) * 60);
	} catch {
		return;
	}
}
function getBrowserTimezoneId() {
	try {
		return Intl.DateTimeFormat().resolvedOptions().timeZone;
	} catch {
		return;
	}
}
/**
* The zone the business hours default to: the browser's own zone when the server
* knows it, otherwise the first server zone with the same UTC offset.
*/
function getSystemTimezoneId(timezones) {
	const browserId = getBrowserTimezoneId();
	if (!timezones?.length) return browserId;
	if (findTimezone(timezones, browserId)) return browserId;
	const utcOffset = browserId ? getBrowserTimezoneUtcOffset(browserId) : -(/* @__PURE__ */ new Date()).getTimezoneOffset() * 60;
	return timezones.find((timezone) => timezone.utc_offset === utcOffset)?.id || timezones[0].id;
}
//#endregion
export { getTimezoneName as n, getTimezoneOffsetName as r, getSystemTimezoneId as t };
