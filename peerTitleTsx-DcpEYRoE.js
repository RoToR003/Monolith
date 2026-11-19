//# allFunctionsCalledOnLoad
import { b as createResource } from "./solid-9Vxm0VIz.js";
import { u as memo } from "./web-BPyQozky.js";
import { t as attachClassName } from "./classname-DB9i2ReQ.js";
import { n as attachClickEvent } from "./clickEvent-COk4YpLP.js";
import { o as createMiddleware } from "./sticker-5twBOy1Y.js";
import { ft as PeerTitle } from "./confirmationPopup-Bz6mK0o-.js";
import { t as createListenerSetter } from "./createListenerSetter-B9GrRG19.js";
//#region src/components/peerTitleTsx.tsx
var PeerTitleTsx = (props) => {
	const peerTitle = new PeerTitle();
	const listenerSetter = createListenerSetter();
	const middleware = createMiddleware().get();
	props.ref instanceof Function && props.ref?.(peerTitle.element);
	const [loaded] = createResource(() => [props.peerId, props.threadId], async ([peerId, threadId]) => {
		await peerTitle.update({
			peerId,
			threadId,
			dialog: false,
			onlyFirstName: props.onlyFirstName,
			username: props.username,
			limitSymbols: props.limitSymbols,
			withIcons: props.withIcons,
			wrapOptions: { middleware },
			noPremiumIcon: true
		});
		if (props.onClick) attachClickEvent(peerTitle.element, props.onClick, { listenerSetter });
		return true;
	});
	attachClassName(peerTitle.element, () => props.class);
	return memo(() => memo(() => !!loaded())() && peerTitle.element);
};
//#endregion
export { PeerTitleTsx as t };
