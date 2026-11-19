//# allFunctionsCalledOnLoad
import { mn as getParticipantPeerId } from "./getChatMigratedTo-ChhMNXuu.js";
//#region src/components/communities/createCommunityParticipantCandidatesLoader.ts
function createCommunityParticipantCandidatesLoader(options) {
	let query;
	let offset = {
		contacts: 0,
		recent: 0
	};
	return async (nextQuery, middleware) => {
		if (query !== nextQuery) {
			query = nextQuery;
			offset = {
				contacts: 0,
				recent: 0
			};
		}
		const result = await options.manager.getParticipantCandidates({
			communityId: options.communityId,
			query,
			offset,
			limit: options.limit,
			...options.kind ? { kind: options.kind } : {}
		});
		if (!middleware()) return;
		offset = result.nextOffset;
		return {
			result: result.participantIds,
			isEnd: result.isEnd
		};
	};
}
function createCommunityParticipantsLoader(options) {
	let query;
	let offset = 0;
	const limit = options.limit ?? 50;
	return async (nextQuery, middleware) => {
		if (query !== nextQuery) {
			query = nextQuery;
			offset = 0;
		}
		const result = await options.manager.getChannelParticipants({
			id: options.communityId,
			filter: options.filter(query),
			offset,
			limit
		});
		if (!middleware()) return;
		const participantIds = result.participants.map((participant) => {
			const participantId = getParticipantPeerId(participant);
			options.onParticipant(participantId, participant);
			return participantId;
		});
		offset += result.participants.length;
		return {
			result: participantIds,
			isEnd: offset >= result.count || result.participants.length < limit
		};
	};
}
//#endregion
export { createCommunityParticipantCandidatesLoader as n, createCommunityParticipantsLoader as t };
