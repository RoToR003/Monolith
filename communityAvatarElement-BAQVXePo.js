//# allFunctionsCalledOnLoad
import { r as useCommunity } from "./apiManagerProxy-DmQXvxSF.js";
import { p as createComponent } from "./solid-9Vxm0VIz.js";
import { d as render } from "./web-BPyQozky.js";
import { t as CommunityAvatar } from "./communityAvatar-DgeXPobI.js";
//#region src/components/communities/communityAvatarElement.tsx
/**
* A Community avatar for the imperative parts of the app (chat-list rows, popups): the
* same decorated avatar the Solid components render, in a plain element. It keeps itself
* up to date with the Community, so call `dispose` when the host goes away.
*/
function createCommunityAvatarElement(communityId, size) {
	const mount = document.createElement("div");
	return {
		dispose: render(() => {
			const community = useCommunity(() => communityId);
			return createComponent(CommunityAvatar, {
				get community() {
					return community();
				},
				get title() {
					return community()?.title;
				},
				size
			});
		}, mount),
		element: mount.firstElementChild
	};
}
//#endregion
export { createCommunityAvatarElement as t };
