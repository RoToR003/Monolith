//# allFunctionsCalledOnLoad
import { c as deepEqual } from "./encryptedStorageLayer-gN9TBXzg.js";
//#region src/lib/richTextProcessor/combineSameEntities.ts
var CAN_COMBINE_ENTITIES = /* @__PURE__ */ new Set([
	"messageEntityBold",
	"messageEntityItalic",
	"messageEntityCode",
	"messageEntityPre",
	"messageEntityUnderline",
	"messageEntityStrike",
	"messageEntitySpoiler",
	"messageEntityFormattedDate",
	"messageEntityTextUrl"
]);
var combineMap = {
	messageEntityFormattedDate: (entity1, entity2) => {
		return entity1.date === entity2.date && deepEqual(entity1.pFlags, entity2.pFlags);
	},
	messageEntityPre: (entity1, entity2) => {
		return entity1.language === entity2.language;
	},
	messageEntityTextUrl: (entity1, entity2) => {
		return entity1.url === entity2.url;
	}
};
function combineSameEntities(entities) {
	for (let i = 0; i < entities.length; ++i) {
		const entity = entities[i];
		let nextEntityIdx = -1;
		do {
			nextEntityIdx = entities.findIndex((e, _i) => {
				const verifyFunc = combineMap[entity._];
				return CAN_COMBINE_ENTITIES.has(e._) && _i !== i && e._ === entity._ && e.offset - entity.length === entity.offset && (verifyFunc?.(entity, e) ?? true);
			});
			if (nextEntityIdx !== -1) {
				const nextEntity = entities[nextEntityIdx];
				entity.length += nextEntity.length;
				entities.splice(nextEntityIdx, 1);
			}
		} while (nextEntityIdx !== -1);
	}
}
//#endregion
export { combineSameEntities as t };
