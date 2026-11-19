//# allFunctionsCalledOnLoad
import { d as ctx } from "./userAgent-ByGXcznk.js";
import { t as noop } from "./noop-H9NNBLfX.js";
//#region src/helpers/schedulers/debounce.ts
function debounce(fn, ms, shouldRunFirst = true, shouldRunLast = true) {
	let waitingTimeout;
	let waitingPromise, resolve, reject;
	let hadNewCall = false;
	const invoke = (args) => {
		const _resolve = resolve, _reject = reject;
		try {
			_resolve(fn.apply(null, args));
		} catch (err) {
			console.error("debounce error", err);
			_reject(err);
		}
	};
	const debounce = (...args) => {
		if (!waitingPromise) waitingPromise = new Promise((_resolve, _reject) => (resolve = _resolve, reject = _reject));
		if (waitingTimeout) {
			clearTimeout(waitingTimeout);
			hadNewCall = true;
			reject();
			waitingPromise = new Promise((_resolve, _reject) => (resolve = _resolve, reject = _reject));
		} else if (shouldRunFirst) {
			invoke(args);
			hadNewCall = false;
		}
		const _waitingTimeout = ctx.setTimeout(() => {
			if (shouldRunLast && (!shouldRunFirst || hadNewCall)) invoke(args);
			if (waitingTimeout === _waitingTimeout) {
				waitingTimeout = waitingPromise = resolve = reject = void 0;
				hadNewCall = false;
			}
		}, ms);
		waitingTimeout = _waitingTimeout;
		waitingPromise.catch(noop);
		return waitingPromise;
	};
	debounce.clearTimeout = () => {
		if (waitingTimeout) {
			ctx.clearTimeout(waitingTimeout);
			reject();
			waitingTimeout = waitingPromise = resolve = reject = void 0;
			hadNewCall = false;
		}
	};
	debounce.isDebounced = () => !!waitingTimeout;
	return debounce;
}
//#endregion
//#region src/lib/appManagers/utils/stickers/constants.ts
var STICKERS_LOCAL_IDS = {
	EMOJI: "inputStickerSetAnimatedEmoji",
	EMOJI_ANIMATIONS: "inputStickerSetAnimatedEmojiAnimations",
	PREMIUM_GIFTS: "inputStickerSetPremiumGifts",
	GENERIC_ANIMATIONS: "inputStickerSetEmojiGenericAnimations",
	DEFAULT_STATUSES: "inputStickerSetEmojiDefaultStatuses",
	DEFAULT_TOPIC_ICONS: "inputStickerSetEmojiDefaultTopicIcons",
	TON_GIFTS: "inputStickerSetTonGifts"
};
var STICKERS_LOCAL_IDS_SET = new Set(Object.values(STICKERS_LOCAL_IDS));
//#endregion
//#region src/lib/appManagers/utils/stickers/getStickerSetInput.ts
function getStickerSetInputByLocalId(localId) {
	return { _: localId };
}
function getStickerSetInputByStickerSet(stickerSet) {
	if (STICKERS_LOCAL_IDS_SET.has(stickerSet.id)) return getStickerSetInputByLocalId(stickerSet.id);
	return getStickerSetInputById(stickerSet);
}
function getStickerSetInputById({ id, access_hash }) {
	return {
		_: "inputStickerSetID",
		id,
		access_hash
	};
}
function getStickerSetInputByShortName(shortName) {
	return {
		_: "inputStickerSetShortName",
		short_name: shortName
	};
}
function getStickerSetInputByDice(emoticon) {
	return {
		_: "inputStickerSetDice",
		emoticon
	};
}
//#endregion
//#region src/helpers/object/pickKeys.ts
function pickKeys(obj, keys) {
	const result = {};
	keys.forEach((key) => {
		result[key] = obj[key];
	});
	return result;
}
//#endregion
export { getStickerSetInputByShortName as a, STICKERS_LOCAL_IDS_SET as c, getStickerSetInputByLocalId as i, debounce as l, getStickerSetInputByDice as n, getStickerSetInputByStickerSet as o, getStickerSetInputById as r, STICKERS_LOCAL_IDS as s, pickKeys as t };
