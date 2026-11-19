//# allFunctionsCalledOnLoad
import { M as onCleanup } from "./solid-9Vxm0VIz.js";
import { t as ListenerSetter } from "./listenerSetter-BER6qAXn.js";
//#region src/helpers/solid/createListenerSetter.ts
function createListenerSetter() {
	const listenerSetter = new ListenerSetter();
	onCleanup(() => listenerSetter.removeAll());
	return listenerSetter;
}
//#endregion
export { createListenerSetter as t };
