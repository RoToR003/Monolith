//# allFunctionsCalledOnLoad
//#region src/helpers/dom/cancelEvent.ts
function cancelEvent(event) {
	event || (event = window.event);
	if (event) {
		event = event.originalEvent || event;
		try {
			if (event.stopPropagation) event.stopPropagation();
			if (event.preventDefault) event.preventDefault();
			event.returnValue = false;
			event.cancelBubble = true;
		} catch (err) {}
	}
	return false;
}
//#endregion
export { cancelEvent as t };
