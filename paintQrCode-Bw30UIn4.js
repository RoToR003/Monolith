//# allFunctionsCalledOnLoad
import { t as pause } from "./pause-BSJh-z46.js";
import { t as textToSvgURL } from "./textToSvgURL-BCXNzcR2.js";
//#region src/helpers/qrCode/paintQrCode.ts
var logoUrlCache = /* @__PURE__ */ new Map();
function getLogoUrl(logoColor) {
	let url = logoUrlCache.get(logoColor);
	if (!url) {
		url = fetch("assets/img/logo_padded.svg").then((res) => res.text()).then((text) => textToSvgURL(text.replace(/(fill:).+?(;)/, `$1${logoColor}$2`)));
		logoUrlCache.set(logoColor, url);
	}
	return url;
}
async function paintQrCode(options) {
	const { data, size, host, background, foreground, logoColor, pixelRatio = window.devicePixelRatio, QRCodeStylingCtor } = options;
	const logoUrl = await getLogoUrl(logoColor);
	const qrCode = new QRCodeStylingCtor({
		width: size * pixelRatio,
		height: size * pixelRatio,
		data,
		image: logoUrl,
		dotsOptions: {
			color: foreground,
			type: "rounded"
		},
		cornersSquareOptions: {
			type: "extra-rounded",
			color: foreground
		},
		imageOptions: {
			imageSize: 1,
			margin: 0
		},
		backgroundOptions: { color: background },
		qrOptions: { errorCorrectionLevel: "L" }
	});
	qrCode.append(host);
	const canvas = host.lastChild;
	if (options.canvasClass) canvas.classList.add(options.canvasClass);
	let drawingPromise;
	const internalDrawingPromise = qrCode._drawingPromise || qrCode._canvasDrawingPromise;
	if (internalDrawingPromise) drawingPromise = internalDrawingPromise;
	else {
		const image = qrCode._canvas?._image;
		drawingPromise = Promise.race([pause(1e3), new Promise((resolve) => {
			if (!image || image.complete) {
				window.requestAnimationFrame(() => resolve());
				return;
			}
			image.addEventListener("load", () => {
				window.requestAnimationFrame(() => resolve());
			}, { once: true });
		})]);
	}
	await drawingPromise;
	return {
		canvas,
		qrCode
	};
}
/**
* Builds the public `t.me/<username>` link encoded in a user's QR code (the
* "My QR code" popup). Kept beside `paintQrCode` so the QR callers share one
* place for the link shape.
*/
function buildTelegramUserQrUrl(username) {
	return `https://t.me/${username}`;
}
//#endregion
export { paintQrCode as n, buildTelegramUserQrUrl as t };
