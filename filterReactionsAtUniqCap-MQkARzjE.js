//# allFunctionsCalledOnLoad
import { Rt as reactionsEqual } from "./getChatMigratedTo-ChhMNXuu.js";
/**
* The cap of distinct reactions on one message: the chat's own `reactions_limit` (its full info)
* when it set one, else the app config's `reactions_uniq_max`, else the default.
*/
function resolveReactionsUniqMax(chatLimit, configMax) {
	if (chatLimit > 0) return chatLimit;
	return configMax > 0 ? configMax : 11;
}
/**
* Number of DISTINCT reactions that count toward reactions_uniq_max. `reactionPaid`
* is the star ⭐ counter, not a normal distinct reaction, so it is excluded — this
* matches Android's `chosenCount` (it skips TL_reactionPaid), MessageObject.selectReaction.
*/
function countDistinctReactions(messageResults) {
	if (!messageResults) return 0;
	let count = 0;
	for (const reactionCount of messageResults) if (reactionCount.reaction._ !== "reactionPaid") ++count;
	return count;
}
/**
* reactions_uniq_max — whether a message already carries the max number of DISTINCT
* reactions, so no new distinct kind may be introduced (the picker must be narrowed to
* the reactions already present, and the custom-emoji search/packs must be hidden).
* All three official clients gate this silently (tdesktop customAllowed=false →
* RecentReactions mode with no footer; iOS areCustomEmojiEnabled=false; Android
* showCustomEmojiReaction()=false), with no toast/error.
*/
function isMessageAtUniqReactionCap(messageResults, uniqMax = 11) {
	return countDistinctReactions(messageResults) >= uniqMax;
}
/**
* Once a message already carries `uniqMax` distinct reactions, no new distinct kind may
* be introduced: the offered list is narrowed to the reactions already present on the
* message (you can only pile onto existing kinds).
*
* `reactionPaid` is never a normal distinct reaction (it's the star ⭐ counter), so it
* is always kept. Any offered reaction that already exists on the message is kept too.
*
* Below the cap the offered list is returned unchanged (same reference).
*/
function filterReactionsAtUniqCap(offered, messageResults, uniqMax = 11) {
	if (!offered?.length || !isMessageAtUniqReactionCap(messageResults, uniqMax)) return offered;
	return offered.filter((reaction) => {
		if (reaction._ === "reactionPaid") return true;
		return messageResults.some((reactionCount) => reactionsEqual(reactionCount.reaction, reaction));
	});
}
//#endregion
export { isMessageAtUniqReactionCap as n, resolveReactionsUniqMax as r, filterReactionsAtUniqCap as t };
