//# allFunctionsCalledOnLoad
import { _ as PASS_SINGLE_CONFLICTING_ENTITIES_WITH_QUOTE, g as PASS_SINGLE_CONFLICTING_ENTITIES, h as PASS_CONFLICTING_ENTITIES, y as SINGLE_ENTITIES } from "./commonStateStorage-CW-poHCa.js";
import { t as lowerBound } from "./lowerBound-DXL9JCGb.js";
//#region src/lib/richTextProcessor/isEntityIntersecting.ts
function isEntityIntersecting(entity1, entity2) {
	return entity1.offset < entity2.offset + entity2.length && entity1.offset + entity1.length > entity2.offset;
}
//#endregion
//#region src/lib/richTextProcessor/findConflictingEntity.ts
function isQuoteException(newEntity, singleType) {
	return newEntity._ === "messageEntityBlockquote" && PASS_SINGLE_CONFLICTING_ENTITIES_WITH_QUOTE.has(singleType);
}
/** Whether an entity of `currentType` holding the whole of `newEntity` keeps it out. */
function isConflictingType(currentType, newEntity, quoteException) {
	return newEntity._ === currentType || !PASS_CONFLICTING_ENTITIES.has(newEntity._) && !PASS_CONFLICTING_ENTITIES.has(currentType) && !quoteException;
}
function findConflictingEntity(currentEntities, newEntity, isInsertingSingleEntity = SINGLE_ENTITIES.has(newEntity._)) {
	if (isInsertingSingleEntity) return currentEntities.find((currentEntity) => {
		return isEntityIntersecting(currentEntity, newEntity);
	});
	let singleStart = -1, singleEnd = -1, singleType;
	return currentEntities.find((currentEntity) => {
		const { offset, length } = currentEntity;
		if (SINGLE_ENTITIES.has(currentEntity._)) {
			singleStart = offset;
			singleEnd = singleStart + length;
			singleType = currentEntity._;
		}
		const quoteException = isQuoteException(newEntity, singleType);
		if (singleStart !== -1) {
			if (newEntity.offset >= singleStart && newEntity.offset < singleEnd && !PASS_SINGLE_CONFLICTING_ENTITIES.has(newEntity._) && !quoteException) return true;
		}
		if (!isConflictingType(currentEntity._, newEntity, quoteException)) return false;
		return newEntity.offset >= offset && newEntity.length + newEntity.offset <= length + offset;
	});
}
function createEntityReach(entities) {
	const sorted = entities.filter((entity) => Number.isFinite(entity.offset + entity.length)).sort((a, b) => a.offset - b.offset);
	const offsets = new Array(sorted.length);
	const furthestEnds = new Array(sorted.length);
	let furthestEnd = -Infinity;
	sorted.forEach((entity, index) => {
		offsets[index] = entity.offset;
		furthestEnds[index] = furthestEnd = Math.max(furthestEnd, entity.offset + entity.length);
	});
	return {
		offsets,
		furthestEnds
	};
}
/** Whether one of the entities starts before `start` (or at it) and ends after `end` (or at it). */
function hasEntitySpanning(reach, start, orAtStart, end, orAtEnd) {
	const { offsets, furthestEnds } = reach;
	const count = lowerBound(0, offsets.length - 1, orAtStart ? start + 1 : start, (index) => offsets[index]);
	if (!count) return false;
	const furthestEnd = furthestEnds[count - 1];
	return furthestEnd > end || orAtEnd && furthestEnd === end;
}
/**
* `findConflictingEntity` for many new entities against the same current ones, each answered in
* logarithmic time instead of a pass over all of them: the current entities are a message's, its
* sender's to make thousands of, and so are the entities found in its text.
*/
function createEntityConflictCheck(currentEntities) {
	let all, singles;
	const byNewType = /* @__PURE__ */ new Map();
	return (newEntity) => {
		if (newEntity._ === "messageEntityBlockquote") return !!findConflictingEntity(currentEntities, newEntity);
		const start = newEntity.offset, end = newEntity.offset + newEntity.length;
		if (SINGLE_ENTITIES.has(newEntity._)) {
			all ?? (all = createEntityReach(currentEntities));
			return hasEntitySpanning(all, end, false, start, false);
		}
		if (!PASS_SINGLE_CONFLICTING_ENTITIES.has(newEntity._)) {
			singles ?? (singles = createEntityReach(currentEntities.filter((entity) => SINGLE_ENTITIES.has(entity._))));
			if (hasEntitySpanning(singles, start, true, start, false)) return true;
		}
		let conflicting = byNewType.get(newEntity._);
		if (!conflicting) byNewType.set(newEntity._, conflicting = createEntityReach(currentEntities.filter((entity) => {
			return isConflictingType(entity._, newEntity, false);
		})));
		return hasEntitySpanning(conflicting, start, true, end, true);
	};
}
//#endregion
//#region src/lib/richTextProcessor/sortEntities.ts
function sortEntities(entities) {
	entities.sort((a, b) => {
		return a.offset - b.offset || b.length - a.length;
	});
}
//#endregion
export { createEntityConflictCheck as n, findConflictingEntity as r, sortEntities as t };
