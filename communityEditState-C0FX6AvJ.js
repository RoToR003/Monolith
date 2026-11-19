//# allFunctionsCalledOnLoad
//#region src/components/communities/communityEditState.ts
function hasCommunityEditChanges(options) {
	return options.canEditInfo && (options.title.trim() !== options.savedTitle || options.hasAvatarPreview) || options.canManageChats && options.mode !== options.savedMode;
}
function canSaveCommunityEdit(options) {
	return hasCommunityEditChanges(options) && (!options.canEditInfo || !!options.title.trim()) && !options.saving;
}
async function saveCurrentCommunityAvatar(options) {
	const payload = options.getPayload();
	if (!payload) return;
	const [file, video] = await Promise.all([payload.file(), payload.video?.()]);
	await options.save({
		file,
		video,
		videoStartTs: payload.videoStartTs
	});
	if (options.getPayload() === payload) options.clear();
}
function hasCommunityCreateChanges(current, saved) {
	return !saved || current.title.trim() !== saved.title || current.visibility !== saved.visibility || current.mode !== saved.mode;
}
async function saveCreatedCommunityFields(options) {
	const title = options.current.title.trim();
	if (title !== options.saved.title) {
		await options.saveTitle(title);
		options.saved.title = title;
	}
	if (options.current.visibility !== options.saved.visibility) {
		await options.saveVisibility(options.current.visibility);
		options.saved.visibility = options.current.visibility;
	}
	if (options.current.mode !== options.saved.mode) {
		await options.saveMode(options.current.mode);
		options.saved.mode = options.current.mode;
	}
}
//#endregion
export { saveCurrentCommunityAvatar as a, saveCreatedCommunityFields as i, hasCommunityCreateChanges as n, hasCommunityEditChanges as r, canSaveCommunityEdit as t };
