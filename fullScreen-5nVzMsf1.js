//# allFunctionsCalledOnLoad
//#region src/helpers/dom/fullScreen.ts
function requestFullScreen(element) {
	if (element.requestFullscreen) element.requestFullscreen();
	else if (element.mozRequestFullScreen) element.mozRequestFullScreen();
	else if (element.webkitRequestFullscreen) element.webkitRequestFullscreen();
	else if (element.msRequestFullscreen) element.msRequestFullscreen();
}
function cancelFullScreen() {
	if (document.cancelFullScreen) document.cancelFullScreen();
	else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
	else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
	else if (document.msExitFullscreen) document.msExitFullscreen();
}
function addFullScreenListener(element, callback, listenerSetter) {
	const addListener = listenerSetter ? listenerSetter.add(element) : element.addEventListener.bind(element);
	"webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange".split(" ").forEach((eventName) => {
		addListener(eventName, callback, false);
	});
}
function getFullScreenElement() {
	return document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
}
function isFullScreen() {
	return !!getFullScreenElement();
}
//#endregion
export { requestFullScreen as a, isFullScreen as i, cancelFullScreen as n, getFullScreenElement as r, addFullScreenListener as t };
