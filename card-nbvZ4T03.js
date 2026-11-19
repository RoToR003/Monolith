//# allFunctionsCalledOnLoad
import { i as __toESM } from "./rolldown-runtime-CwcJO0Gh.js";
import { a as i18n, u as langPack_default } from "./langPack-BmdJGr44.js";
import { C as createSignal, M as onCleanup, N as onMount, g as createEffect, i as For, j as on, p as createComponent, s as Show, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { n as getAppWindow, t as bindActiveWindowListener } from "./appWindow-bo-KtJhy.js";
import { _ as use, c as insert, f as setAttribute, g as template, o as className, s as delegateEvents, u as memo } from "./web-BPyQozky.js";
import { t as liteMode } from "./liteMode-DeLStZfQ.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
import { t as IconTsx } from "./iconTsx-B4lOk4A6.js";
import { t as ListenerSetter } from "./listenerSetter-BER6qAXn.js";
import { an as groupAddress, cn as splitGrams, tn as formatFiat } from "./confirmationPopup-Bz6mK0o-.js";
import { t as require_BigInteger } from "./BigInteger-0a0WsWCs.js";
import { A as getWebGL2Context, M as uniformLocations, j as loseContext, k as createProgram, nt as smoothstep01 } from "./appDialogsManager-CXguiKc3.js";
import { t as clock } from "./clock-D01pG7GG.js";
import { r as requestWalletFrame, t as addWalletFrameClient } from "./frameLoop-BVgbdMV-.js";
import { c as WalletCardScroll, d as cardGemCenter, l as DESIGN, u as cardChipX } from "./stream-DZrVqY75.js";
import { i as pixelRatio, r as offsetIn } from "./dom-CIEs7q6J.js";
import { c as ca, i as gemHull, l as clamp, r as gemAssets, u as clamp01 } from "./geometry-BSiIZt3R.js";
import { n as GemView, t as Appearance } from "./stage-K7oS8PBR.js";
import { t as wallet_module_default } from "./wallet.module-3nQsE2jy.js";
import { t as GemPull } from "./pull-vIbalpR8.js";
//#region src/components/wallet/visual/card/textures.ts
/**
* Stars from the design (Figma «Stars»): four-pointed, 8×8. The green channel
* holds the twinkle phase, the alpha — the star itself.
*/
var STARS = [
	[70, 42],
	[272, 148],
	[25, 22],
	[210, 178],
	[104, 56],
	[203, 133],
	[220, 155],
	[52, 21],
	[120, 36],
	[51, 67]
];
var PHASES = [
	.05,
	.63,
	.22,
	.87,
	.42,
	.12,
	.74,
	.33,
	.55,
	.94
];
function starsCanvas(scale = 3) {
	const c = document.createElement("canvas");
	c.width = Math.round(DESIGN.width * scale);
	c.height = Math.round(DESIGN.height * scale);
	const g = c.getContext("2d");
	g.scale(scale, scale);
	STARS.forEach(([x, y], i) => {
		const k = .8485;
		g.beginPath();
		g.moveTo(x, y - 4);
		g.lineTo(x + k, y - k);
		g.lineTo(x + 4, y);
		g.lineTo(x + k, y + k);
		g.lineTo(x, y + 4);
		g.lineTo(x - k, y + k);
		g.lineTo(x - 4, y);
		g.lineTo(x - k, y - k);
		g.closePath();
		g.fillStyle = `rgb(255, ${Math.round(PHASES[i] * 255)}, 0)`;
		g.fill();
	});
	return c;
}
/** 256×256 noise: blurred along the row (brushing) plus fine grain. */
function noiseData() {
	const n = 256;
	let seed = 625341585;
	const random = () => {
		seed ^= seed << 13;
		seed >>>= 0;
		seed ^= seed >>> 17;
		seed ^= seed << 5;
		seed >>>= 0;
		return (seed & 65535) / 65535;
	};
	const base = new Float32Array(n * n);
	for (let i = 0; i < base.length; i++) base[i] = random();
	const out = new Uint8Array(n * n);
	const r = 9;
	for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
		let acc = 0;
		for (let o = -9; o <= r; o++) acc += base[y * n + (x + o + n) % n];
		let v = acc / 19;
		v = .5 + (v - .5) * 3.4;
		const combined = .68 * v + .32 * random();
		out[y * n + x] = Math.max(0, Math.min(255, combined * 255));
	}
	return {
		data: out,
		size: n
	};
}
var QR_PATH = "M20.5427 19.9812C21.0105 19.9812 21.4057 19.9802 21.7283 20.0066C22.0593 20.0336 22.3785 20.0931 22.6824 20.2478C23.1428 20.4824 23.5171 20.8577 23.7517 21.3181C23.9064 21.6219 23.9659 21.9412 23.9929 22.2722C24.0192 22.5947 24.0193 22.9903 24.0193 23.4578V24.8288C24.0193 25.2965 24.0192 25.6919 23.9929 26.0144C23.9658 26.3454 23.9065 26.6647 23.7517 26.9685C23.517 27.4288 23.1427 27.8032 22.6824 28.0378C22.3785 28.1926 22.0594 28.252 21.7283 28.279C21.4057 28.3054 21.0105 28.3054 20.5427 28.3054H19.1716C18.7039 28.3054 18.3086 28.3054 17.9861 28.279C17.655 28.252 17.3358 28.1926 17.032 28.0378C16.5716 27.8032 16.1963 27.4289 15.9617 26.9685C15.807 26.6648 15.7475 26.3453 15.7205 26.0144C15.6941 25.6919 15.6951 25.2965 15.6951 24.8288V23.4578C15.6951 22.9903 15.6942 22.5947 15.7205 22.2722C15.7475 21.9413 15.8071 21.6218 15.9617 21.3181C16.1963 20.8576 16.5715 20.4825 17.032 20.2478C17.3358 20.0931 17.6551 20.0336 17.9861 20.0066C18.3086 19.9803 18.7039 19.9812 19.1716 19.9812H20.5427ZM27.9568 25.6423C28.1965 25.6423 28.3173 25.6426 28.4089 25.6892C28.4893 25.7302 28.5544 25.7963 28.5955 25.8767C28.6421 25.9683 28.6423 26.0883 28.6423 26.3279V27.0994C28.6423 27.3393 28.6421 27.4598 28.5955 27.5515C28.5544 27.632 28.4894 27.6979 28.4089 27.739C28.3173 27.7857 28.1967 27.7859 27.9568 27.7859H27.1853C26.9459 27.7859 26.8257 27.7855 26.7341 27.739C26.6537 27.6979 26.5877 27.632 26.5466 27.5515C26.5001 27.4599 26.4997 27.3391 26.4997 27.0994V26.3279C26.4997 26.0883 26.5 25.9683 26.5466 25.8767C26.5877 25.7961 26.6536 25.7303 26.7341 25.6892C26.8257 25.6427 26.9458 25.6423 27.1853 25.6423H27.9568ZM33.0994 25.6423C33.3391 25.6423 33.4599 25.6426 33.5515 25.6892C33.632 25.7302 33.6979 25.7962 33.739 25.8767C33.7856 25.9683 33.7859 26.0885 33.7859 26.3279V27.0994C33.7859 27.3392 33.7856 27.4599 33.739 27.5515C33.6979 27.6321 33.6321 27.6979 33.5515 27.739C33.4599 27.7856 33.3392 27.7859 33.0994 27.7859H32.3279C32.0885 27.7859 31.9683 27.7856 31.8767 27.739C31.7962 27.6979 31.7302 27.632 31.6892 27.5515C31.6426 27.4599 31.6423 27.3391 31.6423 27.0994V26.3279C31.6423 26.0884 31.6426 25.9683 31.6892 25.8767C31.7303 25.7961 31.7961 25.7303 31.8767 25.6892C31.9683 25.6426 32.0884 25.6423 32.3279 25.6423H33.0994ZM19.1716 21.448C18.6796 21.448 18.3543 21.4482 18.1052 21.4685C17.8648 21.4882 17.7597 21.5225 17.697 21.5544C17.5127 21.6485 17.3623 21.7988 17.2683 21.9831C17.2364 22.0459 17.202 22.1513 17.1824 22.3913C17.1621 22.6403 17.1619 22.966 17.1619 23.4578V24.8288C17.1619 25.3207 17.162 25.6463 17.1824 25.8953C17.202 26.1347 17.2364 26.2397 17.2683 26.3025C17.3623 26.4867 17.5128 26.6372 17.697 26.7312C17.7598 26.7631 17.865 26.7975 18.1052 26.8171C18.3543 26.8375 18.6796 26.8386 19.1716 26.8386H20.5427C21.0348 26.8386 21.3601 26.8375 21.6091 26.8171C21.8491 26.7975 21.9536 26.7631 22.0164 26.7312C22.2008 26.6372 22.351 26.4869 22.4451 26.3025C22.477 26.2398 22.5114 26.1351 22.531 25.8953C22.5513 25.6463 22.5525 25.3207 22.5525 24.8288V23.4578C22.5525 22.966 22.5513 22.6403 22.531 22.3913C22.5114 22.1514 22.477 22.0459 22.4451 21.9831C22.351 21.7989 22.2007 21.6484 22.0164 21.5544C21.9536 21.5226 21.8488 21.4881 21.6091 21.4685C21.3601 21.4482 21.0348 21.448 20.5427 21.448H19.1716ZM30.5281 23.071C30.7678 23.071 30.8886 23.0714 30.9802 23.1179C31.0607 23.159 31.1266 23.225 31.1677 23.3054C31.2142 23.397 31.2136 23.5172 31.2136 23.7566V24.5281C31.2136 24.768 31.2144 24.8886 31.1677 24.9802C31.1266 25.0609 31.0609 25.1266 30.9802 25.1677C30.8886 25.2144 30.768 25.2136 30.5281 25.2136H29.7566C29.5172 25.2136 29.397 25.2142 29.3054 25.1677C29.225 25.1266 29.159 25.0607 29.1179 24.9802C29.0714 24.8886 29.071 24.7678 29.071 24.5281V23.7566C29.071 23.5171 29.0713 23.397 29.1179 23.3054C29.159 23.2248 29.2248 23.159 29.3054 23.1179C29.397 23.0713 29.5171 23.071 29.7566 23.071H30.5281ZM27.9568 20.4997C28.1965 20.4997 28.3173 20.5001 28.4089 20.5466C28.4893 20.5877 28.5544 20.6537 28.5955 20.7341C28.6421 20.8257 28.6423 20.9457 28.6423 21.1853V21.9568C28.6423 22.1967 28.6421 22.3173 28.5955 22.4089C28.5544 22.4892 28.4892 22.5544 28.4089 22.5955C28.3173 22.6421 28.1967 22.6423 27.9568 22.6423H27.1853C26.9457 22.6423 26.8257 22.6421 26.7341 22.5955C26.6537 22.5544 26.5877 22.4893 26.5466 22.4089C26.5001 22.3173 26.4997 22.1965 26.4997 21.9568V21.1853C26.4997 20.9458 26.5001 20.8257 26.5466 20.7341C26.5877 20.6536 26.6536 20.5877 26.7341 20.5466C26.8257 20.5001 26.9458 20.4997 27.1853 20.4997H27.9568ZM33.0994 20.4997C33.3391 20.4997 33.4599 20.5001 33.5515 20.5466C33.632 20.5877 33.6979 20.6537 33.739 20.7341C33.7855 20.8257 33.7859 20.9459 33.7859 21.1853V21.9568C33.7859 22.1967 33.7857 22.3173 33.739 22.4089C33.6979 22.4894 33.632 22.5544 33.5515 22.5955C33.4598 22.6421 33.3393 22.6423 33.0994 22.6423H32.3279C32.0883 22.6423 31.9683 22.6421 31.8767 22.5955C31.7963 22.5544 31.7302 22.4893 31.6892 22.4089C31.6426 22.3173 31.6423 22.1965 31.6423 21.9568V21.1853C31.6423 20.9458 31.6427 20.8257 31.6892 20.7341C31.7303 20.6536 31.7961 20.5877 31.8767 20.5466C31.9683 20.5 32.0883 20.4997 32.3279 20.4997H33.0994ZM20.5427 9.69506C21.0105 9.69506 21.4057 9.69411 21.7283 9.72045C22.0593 9.7475 22.3785 9.80692 22.6824 9.96166C23.1429 10.1963 23.517 10.5715 23.7517 11.032C23.9065 11.3359 23.9659 11.655 23.9929 11.9861C24.0192 12.3086 24.0193 12.7039 24.0193 13.1716V14.5427C24.0193 15.0106 24.0193 15.4057 23.9929 15.7283C23.9659 16.0595 23.9066 16.3784 23.7517 16.6824C23.517 17.1429 23.1429 17.517 22.6824 17.7517C22.3784 17.9066 22.0595 17.9659 21.7283 17.9929C21.4057 18.0193 21.0106 18.0193 20.5427 18.0193H19.1716C18.7039 18.0193 18.3086 18.0192 17.9861 17.9929C17.655 17.9659 17.3359 17.9065 17.032 17.7517C16.5715 17.517 16.1963 17.1429 15.9617 16.6824C15.8069 16.3785 15.7475 16.0593 15.7205 15.7283C15.6941 15.4057 15.6951 15.0105 15.6951 14.5427V13.1716C15.6951 12.7039 15.6941 12.3086 15.7205 11.9861C15.7475 11.6551 15.807 11.3358 15.9617 11.032C16.1963 10.5715 16.5715 10.1963 17.032 9.96166C17.3358 9.80697 17.6551 9.7475 17.9861 9.72045C18.3086 9.69413 18.7039 9.69506 19.1716 9.69506H20.5427ZM30.8288 9.69506C31.2965 9.69506 31.6919 9.69412 32.0144 9.72045C32.3453 9.74752 32.6648 9.80698 32.9685 9.96166C33.4289 10.1963 33.8032 10.5716 34.0378 11.032C34.1926 11.3358 34.252 11.655 34.279 11.9861C34.3054 12.3086 34.3054 12.7039 34.3054 13.1716V14.5427C34.3054 15.0105 34.3054 15.4057 34.279 15.7283C34.252 16.0594 34.1926 16.3785 34.0378 16.6824C33.8032 17.1427 33.4288 17.517 32.9685 17.7517C32.6647 17.9065 32.3454 17.9658 32.0144 17.9929C31.6919 18.0192 31.2965 18.0193 30.8288 18.0193H29.4578C28.9903 18.0193 28.5947 18.0192 28.2722 17.9929C27.9412 17.9659 27.6219 17.9064 27.3181 17.7517C26.8577 17.5171 26.4824 17.1428 26.2478 16.6824C26.0931 16.3785 26.0336 16.0593 26.0066 15.7283C25.9802 15.4057 25.9812 15.0105 25.9812 14.5427V13.1716C25.9812 12.7039 25.9803 12.3086 26.0066 11.9861C26.0336 11.6551 26.0931 11.3358 26.2478 11.032C26.4825 10.5715 26.8576 10.1963 27.3181 9.96166C27.6218 9.80709 27.9413 9.74749 28.2722 9.72045C28.5947 9.69416 28.9903 9.69506 29.4578 9.69506H30.8288ZM19.1716 11.1619C18.6796 11.1619 18.3543 11.162 18.1052 11.1824C17.8648 11.202 17.7597 11.2363 17.697 11.2683C17.5126 11.3623 17.3623 11.5126 17.2683 11.697C17.2363 11.7597 17.202 11.8648 17.1824 12.1052C17.162 12.3543 17.1619 12.6796 17.1619 13.1716V14.5427C17.1619 15.0348 17.162 15.3601 17.1824 15.6091C17.202 15.8488 17.2364 15.9536 17.2683 16.0164C17.3623 16.2007 17.5127 16.351 17.697 16.4451C17.7597 16.477 17.8648 16.5113 18.1052 16.531C18.3543 16.5513 18.6796 16.5525 19.1716 16.5525H20.5427C21.0348 16.5525 21.3601 16.5513 21.6091 16.531C21.8493 16.5114 21.9536 16.477 22.0164 16.4451C22.2009 16.351 22.351 16.2009 22.4451 16.0164C22.477 15.9536 22.5114 15.8493 22.531 15.6091C22.5513 15.3601 22.5525 15.0348 22.5525 14.5427V13.1716C22.5525 12.6796 22.5513 12.3543 22.531 12.1052C22.5113 11.8648 22.477 11.7597 22.4451 11.697C22.351 11.5127 22.2007 11.3623 22.0164 11.2683C21.9536 11.2364 21.8488 11.202 21.6091 11.1824C21.3601 11.162 21.0348 11.1619 20.5427 11.1619H19.1716ZM29.4578 11.1619C28.966 11.1619 28.6403 11.1621 28.3913 11.1824C28.1513 11.202 28.0459 11.2364 27.9831 11.2683C27.7988 11.3623 27.6485 11.5127 27.5544 11.697C27.5225 11.7597 27.4882 11.8648 27.4685 12.1052C27.4482 12.3543 27.448 12.6796 27.448 13.1716V14.5427C27.448 15.0348 27.4482 15.3601 27.4685 15.6091C27.4881 15.8488 27.5226 15.9536 27.5544 16.0164C27.6484 16.2007 27.7989 16.351 27.9831 16.4451C28.0459 16.477 28.1514 16.5114 28.3913 16.531C28.6403 16.5513 28.966 16.5525 29.4578 16.5525H30.8288C31.3207 16.5525 31.6463 16.5513 31.8953 16.531C32.1351 16.5114 32.2398 16.477 32.3025 16.4451C32.4869 16.351 32.6372 16.2008 32.7312 16.0164C32.7631 15.9536 32.7975 15.8491 32.8171 15.6091C32.8375 15.3601 32.8386 15.0348 32.8386 14.5427V13.1716C32.8386 12.6796 32.8375 12.3543 32.8171 12.1052C32.7975 11.865 32.7631 11.7598 32.7312 11.697C32.6372 11.5128 32.4867 11.3623 32.3025 11.2683C32.2397 11.2364 32.1347 11.202 31.8953 11.1824C31.6463 11.162 31.3207 11.1619 30.8288 11.1619H29.4578Z";
/** The QR mask in alpha, the design's 50×38 chip canvas, 8 pixels per point. */
function qrCanvas(scale = 8) {
	const c = document.createElement("canvas");
	c.width = 50 * scale;
	c.height = 38 * scale;
	const g = c.getContext("2d");
	g.scale(scale, scale);
	g.fillStyle = "#fff";
	g.fill(new Path2D(QR_PATH));
	return c;
}
//#endregion
//#region src/components/wallet/visual/card/background.ts
var _CardBackground;
var VERTEX = `#version 300 es
precision highp float;
uniform vec4 u_front[4];   // face corners: bottom-left, bottom-right, top-left, top-right
uniform vec4 u_back[4];
uniform int u_slices;
uniform vec4 u_aa;         // layer pixels, card pixels
out vec2 v_uv;
out float v_layer;
void main() {
  int slices = max(u_slices, 0);
  bool face = gl_InstanceID >= slices;
  float depth = face ? 1.0 : float(gl_InstanceID) / float(max(slices - 1, 1));
  int id = gl_VertexID;
  vec4 p = mix(u_back[id], u_front[id], depth);
  vec2 uvs[4] = vec2[4](vec2(0, 1), vec2(1, 1), vec2(0, 0), vec2(1, 0));
  vec2 dirs[4] = vec2[4](vec2(-1, -1), vec2(1, -1), vec2(-1, 1), vec2(1, 1));
  // A quad slightly wider than the card — the shader antialiases the edge itself.
  const float inset = 2.0;
  vec2 ndc = p.xy / p.w + dirs[id] * inset * 2.0 / max(u_aa.xy, vec2(1));
  gl_Position = vec4(ndc * p.w, 0, p.w);
  v_uv = uvs[id] + vec2(dirs[id].x, -dirs[id].y) * inset / max(u_aa.zw, vec2(1));
  v_layer = face ? 2.0 : depth;
}`;
var FRAGMENT = `#version 300 es
precision highp float;
uniform float u_time;
uniform vec2 u_highlightTilt;  // nod, turn — with the gyroscope and the idle sway
uniform vec2 u_surfaceTilt;    // nod, turn — without the idle sway
uniform vec2 u_size;           // the card in design points
uniform sampler2D u_stars;
uniform sampler2D u_noise;
uniform sampler2D u_qr;
uniform vec2 u_lensCenter;
uniform float u_lensStrength;
uniform float u_lensSpin;
uniform int u_lensCount;
uniform vec2 u_chip;       // the QR chip's alpha and blur: it fades with the card's details as the card folds
uniform float u_chipX;     // the chip's left edge: at the inline end, mirrored right to left with the card's text
uniform vec2 u_hull[48];
in vec2 v_uv;
in float v_layer;
out vec4 fragColor;

#define PI 3.14159265358979
const float RADIUS = 20.0;

float roundRect(vec2 p, vec2 halfSize, float r) {
  vec2 q = abs(p) - (halfSize - r);
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}
vec2 roundRectNormal(vec2 p, vec2 halfSize, float r) {
  vec2 q = abs(p) - (halfSize - r);
  vec2 n = (q.x > 0.0 && q.y > 0.0) ? normalize(q) : (q.x > q.y ? vec2(1, 0) : vec2(0, 1));
  return n * vec2(p.x < 0.0 ? -1.0 : 1.0, p.y < 0.0 ? -1.0 : 1.0);
}
float hash(float v) { return fract(sin(v * 127.1) * 43758.5453); }
vec3 linearToSrgb(vec3 v) {
  v = max(v, vec3(0));
  return mix(1.055 * pow(v, vec3(1.0 / 2.4)) - 0.055, v * 12.92, lessThanEqual(v, vec3(0.0031308)));
}

// The lens of the grown gem: inside its silhouette the metal is magnified and broken
// into facets that run with the gem's rotation. Maps a card point.
vec2 lensPoint(vec2 position) {
  int n = u_lensCount;
  if (n < 3 || u_lensStrength <= 0.001) return position;
  bool inside = false;
  float best = 1e9;
  float radius = 0.0;
  for (int i = 0, j = n - 1; i < 48; j = i++) {
    if (i >= n) break;
    vec2 a = u_hull[i], b = u_hull[j];
    if (((a.y > position.y) != (b.y > position.y)) &&
        (position.x < (b.x - a.x) * (position.y - a.y) / (b.y - a.y) + a.x)) inside = !inside;
    vec2 e = b - a;
    float h = clamp(dot(position - a, e) / max(dot(e, e), 1e-4), 0.0, 1.0);
    best = min(best, distance(position, a + e * h));
    radius = max(radius, distance(a, u_lensCenter));
  }
  if (!inside) return position;
  float edge = smoothstep(0.0, 4.0, best) * u_lensStrength;
  vec2 d = position - u_lensCenter;
  vec2 q = d / max(radius, 1.0);
  float u = (asin(clamp(q.x, -0.999, 0.999)) - u_lensSpin) / (PI / 4.0);
  float wave = sin(PI * u);
  float prism = sign(wave) * pow(abs(wave), 0.6);
  float crown = 1.0 - smoothstep(-0.25, 0.05, q.y);
  vec2 bend = vec2(prism * 0.12, mix(-0.08 * q.y, 0.09, crown)) * radius;
  float zoom = mix(0.84, 0.72, crown * (1.0 - smoothstep(0.2, 0.6, abs(q.x))));
  return u_lensCenter + d * mix(1.0, zoom, edge) + bend * edge;
}

// The conic gradient from the design: «from 90deg», transitions every quarter,
// with its own skew (matrix 6.95 -11.05 18.111 11.391). 0 — shade, 1 — highlight.
float lobe(vec2 p, float turn) {
  vec2 d = p - u_size * 0.5;
  float c = cos(turn), s = sin(turn);
  d = vec2(c * d.x + s * d.y, -s * d.x + c * d.y);
  mat2 m = inverse(mat2(6.95, -11.05, 18.111, 11.391));
  vec2 local = m * d;
  float t = atan(local.y, local.x) / (2.0 * PI);
  float f = 1.0 - abs(fract(2.0 * t) * 2.0 - 1.0);
  // In the middle the conic gradient converges to a point; in the design the
  // background blur smears it.
  return mix(0.5, f, smoothstep(0.0, 22.0, length(d)));
}

vec3 softLightWhite(vec3 b) {
  return mix(sqrt(b), ((16.0 * b - 12.0) * b + 4.0) * b, lessThanEqual(b, vec3(0.25)));
}

void main() {
  vec2 size = u_size;
  vec2 halfSize = size * 0.5;
  vec2 surface = clamp(vec2(u_surfaceTilt.y / 0.30, u_surfaceTilt.x / 0.20), vec2(-1), vec2(1));

  // The edge. A slice is filled whole, but only the ring outside the face shows —
  // the middle is not shaded at all.
  if (v_layer < 1.5) {
    float t = v_layer;
    vec2 p = v_uv * size - halfSize;
    float d = roundRect(p, halfSize, RADIUS);
    if (d < -9.0) discard;
    float aa = max(0.5 * fwidth(d), 0.001);
    float cover = 1.0 - smoothstep(-aa, aa, d);
    vec2 n = roundRectNormal(p, halfSize, RADIUS);
    // Light from above and slightly left: the top edge is lighter than the bottom.
    float diffuse = 0.5 + 0.5 * dot(n, normalize(vec2(-0.35, -1.0)));
    // The rim is a flat cut of blue metal, darker than the face.
    float lines = 1.0 + (hash(floor(t * 9.0) + 3.1) - 0.5) * 0.05;
    vec3 edge = vec3(0.016, 0.11, 0.46) * (0.62 + 0.62 * diffuse) * lines;
    vec2 along = vec2(-n.y, n.x);
    float run = dot(p, along) / max(halfSize.x, 1.0);
    float streak = exp(-pow((run - (surface.x * 0.9 - surface.y * 0.7)) / 0.38, 2.0));
    edge += vec3(0.30, 0.62, 1.0) * streak * 0.18 * (0.35 + 0.65 * diffuse);
    edge += vec3(0.30, 0.62, 1.0) * step(0.88, t) * (0.18 + 0.40 * diffuse);
    vec3 color = linearToSrgb(edge);
    fragColor = vec4(color * cover, cover);
    return;
  }

  // The card's edge follows the real point, the material — the point through the lens.
  vec2 edgePoint = v_uv * size;
  vec2 P = lensPoint(edgePoint);
  vec2 uv = P / size;

  // The highlight turns with the tilt — like the key light of the iOS card.
  vec2 nt = clamp(vec2(u_highlightTilt.y / 0.24, u_highlightTilt.x / 0.17), vec2(-1), vec2(1));
  float turn = -(nt.x * size.y / size.x + nt.y) * PI * 0.5;
  float f = lobe(P, turn);
  vec3 color = mix(vec3(51, 144, 236) / 255.0, vec3(73, 164, 255) / 255.0, f);

  // Brushed metal: thin rings from the centre and fibres — barely visible.
  vec2 cardPosition = vec2((uv.x - 0.5) * 2.0, (0.5 - uv.y) * 2.0 * size.y / size.x);
  float radius = length(cardPosition);
  float ringIndex = floor(radius * 117.0);
  float footprint = length(vec2(dFdx(radius), dFdy(radius))) * 0.65;
  float ringFilter = 1.0 - smoothstep(0.35, 1.10, footprint * 180.0);
  float waveFilter = 1.0 - smoothstep(1.15, 3.10, footprint * 560.0);
  float fine = mix(0.5, hash(ringIndex), ringFilter) + 0.35 * sin(radius * 364.0 + hash(ringIndex * 0.37) * 6.2831853) * waveFilter;
  float radialFinish = (fine - 0.5) * 0.05 * smoothstep(0.018, 0.090, radius);
  float brushed = texture(u_noise, uv * vec2(1.4, 8.0)).r;
  float medium = texture(u_noise, uv * vec2(4.0, 3.0)).r;
  float grain = texture(u_noise, uv * vec2(19.0, 13.0)).r;
  float variation = radialFinish * 0.22 * (0.6 + 0.8 * f) + (brushed - 0.5) * 0.020 + (medium - 0.5) * 0.020 + (grain - 0.5) * 0.010;
  color *= 1.0 + variation;

  // Stars — white in soft light, only inside the highlight, and slightly deeper than the face.
  vec2 parallax = vec2(clamp(u_surfaceTilt.y / 0.24, -1.0, 1.0), -clamp(u_surfaceTilt.x / 0.17, -1.0, 1.0)) * 4.0 / size;
  vec4 star = texture(u_stars, uv + parallax);
  float twinkle = 0.75 + 0.25 * sin(u_time * 1.7 + star.g * 6.2831853);
  float starAlpha = 0.5 * star.a * lobe(P + parallax * size, turn) * twinkle;
  color = mix(color, softLightWhite(color), starAlpha);

  vec2 pc = edgePoint - halfSize;
  float d = roundRect(pc, halfSize, RADIUS);
  // Inner shadow at the bottom: inset 0 -1px 1px rgba(0,0,0,.14).
  float lower = smoothstep(-1.0, 1.0, roundRect(pc + vec2(0, 1), halfSize, RADIUS));
  color *= 1.0 - 0.14 * lower;
  // The face's rim catches light — only while the card is being tilted.
  {
    float band = smoothstep(-1.1, -0.35, d);
    vec2 n = roundRectNormal(pc, halfSize, RADIUS);
    vec2 light = normalize(vec2(-0.45 - 0.9 * surface.x, -0.9 + 0.7 * surface.y));
    float lit = max(dot(n, light), 0.0);
    color += vec3(0.22, 0.42, 0.70) * band * lit * 0.35 * clamp(length(surface) * 1.6, 0.0, 1.0);
  }

  // The QR chip — as in the design: light 48×36 metal in a thin dark border.
  // Its gradient and glint follow the tilt.
  {
    vec2 origin = vec2(u_chipX - 1.0, 73);     // chip canvas 50×38
    vec2 center = vec2(u_chipX + 24.0, 92);
    const vec2 chipHalf = vec2(24, 18);
    vec2 local = P - center;
    float cd = roundRect(local, chipHalf, 8.0);
    float aa = max(0.6 * fwidth(cd), 0.001) + u_chip.y;
    float ring = (1.0 - smoothstep(1.0 - aa, 1.0 + aa, cd)) * smoothstep(-aa, aa, cd);
    color = mix(color, vec3(0), 0.16 * ring * u_chip.x);
    if (cd < 1.0 + u_chip.y && u_chip.x > 0.0) {
      vec2 s = P - origin;
      vec2 a = vec2(5.2, 3.4), b = vec2(45.4, 34.0);
      float g = dot(s - a, b - a) / dot(b - a, b - a);
      g += -0.45 * surface.x + 0.35 * surface.y;
      vec3 metal = mix(vec3(253, 254, 255) / 255.0, vec3(187, 189, 192) / 255.0, clamp(g, 0.0, 1.0));
      vec3 chip = mix(color, metal, 0.88);
      // Conic glint: light on the left, shade on the right.
      vec2 l = s - vec2(25, 19);
      float t = fract(atan(-l.x / 0.024, l.y / 0.018) / (2.0 * PI) + 0.10 * surface.x - 0.06 * surface.y);
      float white = t < 0.06 ? 0.0 : (t < 0.25 ? (t - 0.06) / 0.19 : (t < 0.44 ? (0.44 - t) / 0.19 : 0.0));
      float black = t < 0.56 ? 0.0 : (t < 0.75 ? (t - 0.56) / 0.19 : (t < 0.94 ? (0.94 - t) / 0.19 : 0.0));
      chip = mix(chip, vec3(1), white * 0.36);
      chip = mix(chip, vec3(0), black * 0.12);
      // A sharp glint — while the card is being tilted.
      vec2 q = local / chipHalf;
      float across = dot(q, normalize(vec2(1.0, -0.45)));
      float slide = 0.10 + 0.95 * surface.x - 0.55 * surface.y;
      float sharp = exp(-pow((across - slide) / 0.12, 2.0));
      float soft = exp(-pow((across - slide) / 0.5, 2.0));
      float amount = clamp(length(surface) * 1.4, 0.0, 1.0);
      chip = mix(chip, vec3(1), (sharp * 0.30 + soft * 0.10) * amount);
      // The icon is pressed in: a light imprint one point lower, the icon itself on top.
      vec2 qrUV = s / vec2(50, 38);
      float ink = texture(u_qr, qrUV).a;
      float lip = texture(u_qr, qrUV - vec2(0, 1.0 / 38.0)).a;
      chip = mix(chip, vec3(1), 0.5 * lip * (1.0 - ink));
      chip = mix(chip, vec3(26) / 255.0, 0.5 * ink);
      float cover = (1.0 - smoothstep(-aa, aa, cd)) * u_chip.x;
      color = mix(color, chip, cover);
    }
  }

  float aa = max(0.5 * fwidth(d), 0.001);
  float coverage = 1.0 - smoothstep(-aa, aa, d);
  fragColor = vec4(clamp(color, 0.0, 1.0) * coverage, coverage);
}`;
var CardBackground = class CardBackground {
	/** Throws when WebGL2 is unavailable. */
	constructor(canvas) {
		this.canvas = canvas;
		const gl = getWebGL2Context(canvas, {
			alpha: true,
			premultipliedAlpha: true,
			antialias: false,
			depth: false,
			powerPreference: "high-performance"
		});
		this.gl = gl;
		try {
			this.setup();
		} catch (error) {
			loseContext(gl);
			throw error;
		}
	}
	setup() {
		const gl = this.gl;
		this.program = createProgram(gl, VERTEX, FRAGMENT);
		this.u = uniformLocations(gl, this.program);
		this.vao = gl.createVertexArray();
		const texture = (unit, upload, wrap) => {
			const t = gl.createTexture();
			gl.activeTexture(gl.TEXTURE0 + unit);
			gl.bindTexture(gl.TEXTURE_2D, t);
			upload();
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrap);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrap);
			return t;
		};
		gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
		this.stars = texture(0, () => gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, starsCanvas()), gl.CLAMP_TO_EDGE);
		const noise = noiseData();
		gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
		this.noise = texture(1, () => gl.texImage2D(gl.TEXTURE_2D, 0, gl.R8, noise.size, noise.size, 0, gl.RED, gl.UNSIGNED_BYTE, noise.data), gl.REPEAT);
		this.qr = texture(2, () => gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, qrCanvas()), gl.CLAMP_TO_EDGE);
		this.hull = /* @__PURE__ */ new Float32Array(96);
	}
	/** A card of `width`×`height` screen points; the layer is wider by the padding. */
	setSize(width, height, pixelRatio) {
		const pad = CardBackground.padding;
		this.cardWidth = width;
		this.cardHeight = height;
		this.pixelRatio = pixelRatio;
		const w = Math.round((width + pad * 2) * pixelRatio), h = Math.round((height + pad * 2) * pixelRatio);
		if (this.canvas.width !== w || this.canvas.height !== h) {
			this.canvas.width = w;
			this.canvas.height = h;
		}
	}
	/**
	* How many slices make the edge solid: one per pixel of the largest shift of
	* the back from the face.
	*/
	slices(slab) {
		let shift = 0;
		for (let i = 0; i < 4; i++) {
			const a = slab.front[i], b = slab.back[i];
			const dx = (a[0] / a[3] - b[0] / b[3]) * .5 * this.canvas.width;
			const dy = (a[1] / a[3] - b[1] / b[3]) * .5 * this.canvas.height;
			shift = Math.max(shift, Math.hypot(dx, dy));
		}
		if (shift <= .35) return 0;
		return Math.min(CardBackground.maxSlices, Math.ceil(shift) + 1);
	}
	render({ time, highlightTilt, surfaceTilt, slab, lens, chip, chipX }) {
		const gl = this.gl, u = this.u;
		if (!gl) return;
		gl.viewport(0, 0, this.canvas.width, this.canvas.height);
		gl.clearColor(0, 0, 0, 0);
		gl.clear(gl.COLOR_BUFFER_BIT);
		gl.useProgram(this.program);
		gl.enable(gl.BLEND);
		gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
		const slices = this.slices(slab);
		gl.uniform4fv(u["u_front[0]"], slab.front.flat());
		gl.uniform4fv(u["u_back[0]"], slab.back.flat());
		gl.uniform1i(u.u_slices, slices);
		gl.uniform4f(u.u_aa, this.canvas.width, this.canvas.height, this.cardWidth * this.pixelRatio, this.cardHeight * this.pixelRatio);
		gl.uniform1f(u.u_time, time);
		gl.uniform2f(u.u_highlightTilt, highlightTilt[0], highlightTilt[1]);
		gl.uniform2f(u.u_surfaceTilt, surfaceTilt[0], surfaceTilt[1]);
		gl.uniform2f(u.u_size, DESIGN.width, DESIGN.height);
		gl.uniform2f(u.u_chip, chip ? chip[0] : 1, chip ? chip[1] : 0);
		gl.uniform1f(u.u_chipX, chipX);
		gl.uniform1i(u.u_stars, 0);
		gl.uniform1i(u.u_noise, 1);
		gl.uniform1i(u.u_qr, 2);
		if (lens && lens.hull.length > 2 && lens.strength > .001) {
			const src = lens.hull, count = Math.min(48, src.length);
			for (let i = 0; i < count; i++) {
				const p = src[Math.floor(i * src.length / count)];
				this.hull[i * 2] = p[0];
				this.hull[i * 2 + 1] = p[1];
			}
			gl.uniform2fv(u["u_hull[0]"], this.hull);
			gl.uniform1i(u.u_lensCount, count);
			gl.uniform2f(u.u_lensCenter, lens.center[0], lens.center[1]);
			gl.uniform1f(u.u_lensStrength, Math.min(1, lens.strength));
			gl.uniform1f(u.u_lensSpin, lens.spin);
		} else {
			gl.uniform1i(u.u_lensCount, 0);
			gl.uniform1f(u.u_lensStrength, 0);
		}
		gl.bindVertexArray(this.vao);
		gl.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, 4, slices + 1);
		gl.bindVertexArray(null);
	}
	/** Loses the context: the canvas cannot be drawn into with WebGL again. */
	destroy() {
		if (!this.gl) return;
		loseContext(this.gl);
		this.gl = null;
	}
};
_CardBackground = CardBackground;
_CardBackground.padding = 56;
_CardBackground.maxSlices = 24;
//#endregion
//#region src/components/wallet/visual/card/card.ts
var import_BigInteger = /* @__PURE__ */ __toESM(require_BigInteger());
var MAX_PITCH = .2;
var MAX_YAW = .3;
var GYRO_GAIN = .9;
/** how far a mouse turns the card: at the card's edge 0.7 of this share of the finger's turn, at most all of it */
var HOVER_GAIN = .6;
var MAX_LIFT_SHADOW = .16;
/** The gem on the card turns by itself, slowly (iOS WalletCardComponent) */
var GEM_BASE_SPIN = 2 * Math.PI / 26;
/** The scroll shadow under the folding card: iOS 0.12 sin²(πf) */
var SCROLL_SHADOW = .12;
var idleTilt = (time) => [.013 * Math.sin(time * .5), .022 * Math.sin(time * .37 + 1.6)];
var WalletCard = class {
	/** Throws when WebGL2 is unavailable. */
	constructor(elements) {
		this.destroyed = false;
		this.mirrored = false;
		this.root = elements.root;
		this.bgCanvas = elements.background;
		this.face = elements.face;
		this.fold = elements.fold;
		this.design = elements.design;
		this.shadow = elements.shadow;
		this.gemCanvas = elements.gem;
		this.balanceRow = elements.balance;
		this.amountRun = elements.amount;
		this.fractionRun = elements.fraction;
		this.runs = [
			elements.amount,
			elements.fraction,
			elements.currency
		];
		this.fiat = elements.fiat;
		this.background = new CardBackground(this.bgCanvas);
		try {
			this.gem = new GemView(this.gemCanvas, {
				appearance: Appearance.white,
				widthPoints: DESIGN.gemWidth,
				rotationSpeed: GEM_BASE_SPIN,
				dragGrow: 2.6,
				growDamping: .62,
				releaseDecay: 1.1
			});
		} catch (error) {
			this.background.destroy();
			throw error;
		}
		this.outline = gemAssets().outline;
		this.gyro = [0, 0];
		this.pan = [0, 0];
		this.hover = [0, 0];
		this.gemRoll = 0;
		this.lastGemYaw = null;
		this.gemRate = 0;
		this.panTilt = 0;
		this.isPanning = false;
		this.card = [0, 0];
		this.depth = [0, 0];
		const idle = idleTilt(0);
		this.idle = idle;
		this.highlight = [idle[0], idle[1]];
		this.scale = 1;
		this.targetScale = 1;
		this.elapsed = 0;
		this.lastTime = null;
		this.fitScale = 1;
		this.gemScale = 1;
		this.width = 0;
		this.height = 0;
		this.collapse = 0;
		this.scrollPitch = 0;
		this.chip = [1, 0];
		this.cardMatrix = ca.identity();
		this.pressedGem = false;
		this.listenerSetter = new ListenerSetter();
		this.placeGem();
		this.bindGestures();
		this.bindMotion();
		this.observeSize();
	}
	observeSize() {
		const apply = () => {
			if (this.destroyed) return;
			const width = this.root.clientWidth;
			if (!width) return;
			this.width = width;
			this.height = width * DESIGN.height / DESIGN.width;
			this.s = width / DESIGN.width;
			this.root.style.height = `${this.height}px`;
			this.root.style.setProperty("--fold-camera", `${650 * width / 361}px`);
			this.design.style.transform = `scale(${this.s})`;
			this.shadow.style.borderRadius = `${DESIGN.radius * this.s}px`;
			const pr = pixelRatio();
			this.pixelRatio = pr;
			this.background.setSize(this.width, this.height, pr);
			const pad = CardBackground.padding;
			Object.assign(this.bgCanvas.style, {
				left: `${-pad}px`,
				top: `${-pad}px`,
				width: `${this.width + pad * 2}px`,
				height: `${this.height + pad * 2}px`
			});
			this.gem.setSize(DESIGN.gemCanvas, pr * this.s);
			this.gem.dragScale = DESIGN.gemCanvas * this.s;
			this.drawBalanceText();
		};
		const resizeObserver = new ResizeObserver(apply);
		resizeObserver.observe(this.root);
		this.listenerSetter.addCleanup(() => resizeObserver.disconnect());
		apply();
		getAppWindow().document.fonts?.ready.then(() => {
			if (!this.destroyed) this.drawBalanceText();
		});
	}
	placeGem() {
		const size = DESIGN.gemCanvas, [x, y] = this.gemCenter();
		Object.assign(this.gemCanvas.style, {
			width: `${size}px`,
			height: `${size}px`,
			left: `${x - size / 2}px`,
			top: `${y - size / 2}px`
		});
	}
	/** the gem's middle at rest, design units */
	gemCenter() {
		return cardGemCenter(this.mirrored);
	}
	/** Right to left: the gem and the QR chip move to the places the mirrored text leaves them */
	setMirrored(mirrored) {
		if (this.mirrored === mirrored) return;
		this.mirrored = mirrored;
		this.placeGem();
		this.stillFrame = void 0;
		if (!this.destroyed) this.drawBalanceText();
	}
	/** The amount's glyphs on the gem canvas — for their copy through the grown gem. */
	drawBalanceText() {
		const size = DESIGN.gemCanvas;
		const scale = (this.pixelRatio || 2) * (this.s || 1);
		const c = this.textCanvas || (this.textCanvas = document.createElement("canvas"));
		c.width = Math.round(size * scale);
		c.height = Math.round(size * scale);
		const g = c.getContext("2d");
		g.setTransform(scale, 0, 0, scale, 0, 0);
		g.clearRect(0, 0, size, size);
		const [gx, gy] = this.gemCenter(), ox = gx - size / 2, oy = gy - size / 2;
		let baseline = null;
		for (const span of this.runs) {
			const style = getComputedStyle(span);
			g.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
			g.fillStyle = style.color;
			g.textBaseline = "alphabetic";
			const m = g.measureText(span.textContent);
			const { x, y } = offsetIn(span, this.design);
			if (baseline === null) baseline = y + m.fontBoundingBoxAscent;
			g.fillText(span.textContent, x - ox, baseline - oy);
		}
		this.gem.setText(c);
	}
	/**
	* A new balance, in nanos: the digits count towards it with a slowdown, and
	* the balance row squats briefly — so it reads that the amount has left.
	* The same balance again changes nothing.
	*/
	setBalance(nanos) {
		const value = (0, import_BigInteger.default)(nanos);
		if (this.balance?.equals(value)) return;
		this.balance = value;
		if (this.shownBalance === void 0) {
			this.shownBalance = value;
			this.showBalance(value);
			return;
		}
		if (!liteMode.isAvailable("motion")) {
			this.count = {
				from: value,
				to: value,
				start: 0
			};
			this.endCount();
			return;
		}
		this.count = {
			from: this.shownBalance,
			to: value,
			start: clock.now()
		};
	}
	/** The running count jumps to its end */
	endCount() {
		const c = this.count;
		if (!c) return;
		this.count = null;
		this.shownBalance = c.to;
		this.showBalance(c.to);
		this.balanceRow.style.transform = "";
		this.drawBalanceText();
	}
	/**
	* The fiat line in the chosen currency, from the shown balance in nanos (it counts with the balance). Setting
	* it redraws the line at once.
	*/
	setFiatFormatter(formatter) {
		this.fiatFormatter = formatter;
		if (this.shownBalance !== void 0) this.showBalance(this.shownBalance);
	}
	/**
	* How the balance is written: its integer part and its two-digit fraction with the separator, the way the rest
	* of the app writes amounts. Setting it redraws the balance at once.
	*/
	setBalanceFormatter(formatter) {
		this.balanceFormatter = formatter;
		if (this.shownBalance === void 0) return;
		this.showBalance(this.shownBalance);
		if (!this.count) this.drawBalanceText();
	}
	showBalance(v) {
		const nanos = v.toString();
		if (this.balanceFormatter) {
			const { whole, fraction } = this.balanceFormatter(nanos);
			this.amountRun.textContent = whole;
			this.fractionRun.textContent = fraction;
		}
		this.fiat.textContent = this.fiatFormatter?.(nanos) ?? "";
	}
	stepBalance(now) {
		const c = this.count;
		if (!c) return;
		const t = Math.min(1, (now - c.start) / 1);
		const eased = Math.round((1 - Math.pow(1 - t, 3)) * 1e6);
		const v = t >= 1 ? c.to : c.from.add(c.to.subtract(c.from).multiply(eased).divide(1e6));
		this.shownBalance = v;
		this.showBalance(v);
		const dip = t >= 1 ? 0 : Math.sin(Math.PI * Math.min(1, t / .55)) * (1 - t) * .06;
		this.balanceRow.style.transform = dip ? `scale(${1 - dip})` : "";
		if (t >= 1) {
			this.count = null;
			this.drawBalanceText();
		}
	}
	/**
	* The touch point in design units — by the untilted layout: at rest the
	* card stands straight, and the tilt is small.
	*/
	designPoint(e) {
		const r = this.root.getBoundingClientRect();
		return [(e.clientX - r.left) / this.s, (e.clientY - r.top) / this.s];
	}
	/** The gem answers the finger only on the card at rest: folding, the balance leaves it (iOS). */
	gemHit(p) {
		if (this.collapse > 0) return false;
		const [gx, gy] = this.gemCenter(), cx = gx + this.nudge(), cy = gy + .71;
		return Math.hypot(p[0] - cx, p[1] - cy) <= DESIGN.gemHitRadius;
	}
	bindGestures() {
		const el = this.root;
		const listen = this.listenerSetter.add(el);
		let mode = null, start = null, pull = null;
		listen("pointermove", (e) => {
			if (mode) return;
			el.style.cursor = liteMode.isAvailable("motion") && this.gemHit(this.designPoint(e)) ? "grab" : "";
		});
		listen("pointerdown", (e) => {
			if (mode || e.pointerType === "mouse" && e.button !== 0) return;
			if (!liteMode.isAvailable("motion")) {
				this.pressedGem = false;
				return;
			}
			this.requestGyro();
			try {
				el.setPointerCapture(e.pointerId);
			} catch {}
			const now = clock.now();
			start = [e.clientX, e.clientY];
			pull = new GemPull(e, now);
			this.pressedGem = this.gemHit(this.designPoint(e));
			if (this.pressedGem) {
				mode = "gem";
				el.style.cursor = "grabbing";
				this.gem.beginDrag(now);
			} else {
				mode = "card";
				this.isPanning = true;
				this.targetScale = 1.01;
			}
			e.preventDefault();
		});
		listen("pointermove", (e) => {
			if (!mode) return;
			const now = clock.now();
			if (mode === "gem") {
				const [dx, dy] = pull.move(e, now);
				this.gem.drag(dx, dy, now);
			} else {
				const travel = 240 * Math.max(this.width / 361, .01);
				this.pan[1] = clamp((e.clientX - start[0]) / travel * MAX_YAW, MAX_YAW);
				this.pan[0] = clamp(-(e.clientY - start[1]) / travel * MAX_PITCH, MAX_PITCH);
			}
		});
		const end = (e) => {
			if (!mode) return;
			const now = clock.now();
			if (mode === "gem") {
				const gemX = this.gemCenter()[0] + this.nudge();
				const tapDirection = pull.isTap(e, now) && liteMode.isAvailable("motion") ? this.designPoint(e)[0] < gemX ? -1 : 1 : void 0;
				this.gem.endDrag(pull.velocity(e, now), now, e.type === "pointercancel", tapDirection);
				el.style.cursor = "grab";
			} else {
				this.isPanning = false;
				this.targetScale = 1;
			}
			mode = null;
		};
		listen("pointerup", end);
		listen("pointercancel", end);
		const listenWindow = (type, listener, options) => {
			this.listenerSetter.addCleanup(bindActiveWindowListener((win) => win, type, listener, options));
		};
		listenWindow("pointermove", (e) => {
			if (mode || e.pointerType === "touch") return;
			if (!liteMode.isAvailable("motion")) {
				this.hover = [0, 0];
				return;
			}
			const r = this.root.getBoundingClientRect();
			if (!r.width) return;
			const x = (e.clientX - r.left) / r.width * 2 - 1, y = (e.clientY - r.top) / r.height * 2 - 1;
			this.hover = [-.6 * MAX_PITCH * y / Math.hypot(1, y), HOVER_GAIN * MAX_YAW * x / Math.hypot(1, x)];
		}, { passive: true });
		this.listenerSetter.addCleanup(bindActiveWindowListener((win) => win.document.documentElement, "pointerleave", () => this.hover = [0, 0]));
		listenWindow("blur", () => this.hover = [0, 0]);
	}
	bindMotion() {
		this.baseAttitude = null;
		this.onOrientation = (e) => {
			if (e.beta == null || e.gamma == null) return;
			const beta = e.beta * Math.PI / 180, gamma = e.gamma * Math.PI / 180;
			if (!this.baseAttitude) {
				this.baseAttitude = [beta, gamma];
				return;
			}
			this.gyro[0] = clamp(-(beta - this.baseAttitude[0]) * GYRO_GAIN, MAX_PITCH * .85);
			this.gyro[1] = clamp((gamma - this.baseAttitude[1]) * GYRO_GAIN, MAX_YAW * .8);
		};
		if (typeof DeviceOrientationEvent !== "undefined" && !DeviceOrientationEvent.requestPermission) this.listenDeviceOrientation();
		this.listenerSetter.addCleanup(bindActiveWindowListener((win) => win.document, "visibilitychange", () => {
			this.baseAttitude = null;
			this.gyro = [0, 0];
			this.resetClock();
		}));
	}
	/** the gyroscope of the window the app is in */
	listenDeviceOrientation() {
		this.listenerSetter.addCleanup(bindActiveWindowListener((win) => win, "deviceorientation", this.onOrientation));
	}
	/** iOS Safari asks for the gyroscope permission — only on a touch. */
	requestGyro() {
		if (this.gyroAsked || typeof DeviceOrientationEvent === "undefined") return;
		const orientation = DeviceOrientationEvent;
		if (!orientation.requestPermission) return;
		this.gyroAsked = true;
		orientation.requestPermission().then((state) => {
			if (state === "granted" && !this.destroyed) this.listenDeviceOrientation();
		}).catch(() => {});
	}
	/** No dt jump on the next frame — for a page that was hidden. */
	resetClock() {
		this.lastTime = null;
		this.gem.resetClock();
	}
	/**
	* Shift of the gem away from the card's edge while it has grown: at the edge
	* it would otherwise run into the card's rounding. Rightwards, leftwards
	* right to left, where the gem stands by the right edge.
	*/
	nudge() {
		const half = DESIGN.gemWidth * this.gem.pose.grow / 2 * 1.1 * this.gemScale;
		const shift = Math.max(0, half + 14 * DESIGN.width / 361 - DESIGN.gemCenter[0]);
		return this.mirrored ? -shift : shift;
	}
	frame(now) {
		if (this.destroyed || !this.width) return;
		if (!liteMode.isAvailable("motion")) {
			this.frameStill(now);
			return;
		}
		this.stillFrame = void 0;
		const dt = Math.min(Math.max(this.lastTime === null ? 0 : now - this.lastTime, 0), 1 / 30);
		this.lastTime = now;
		this.elapsed += dt;
		this.stepBalance(now);
		if (!this.isPanning) {
			const decay = Math.exp(-dt * 4);
			this.pan[0] *= decay;
			this.pan[1] *= decay;
		}
		this.idle = idleTilt(this.elapsed);
		const yaw = this.gem.pose.yaw;
		if (this.lastGemYaw !== null && dt > 0) {
			let d = yaw - this.lastGemYaw;
			d = Math.atan2(Math.sin(d), Math.cos(d));
			this.gemRate += (d / dt - this.gemRate) * Math.min(1, dt * 3);
		}
		this.lastGemYaw = yaw;
		const extra = this.gemRate - GEM_BASE_SPIN * (this.gemRate >= 0 ? 1 : -1);
		const rollTarget = clamp(.006 * (Math.abs(this.gemRate) > GEM_BASE_SPIN * 1.5 ? extra : 0), MAX_YAW * .18);
		this.gemRoll += (rollTarget - this.gemRoll) * (1 - Math.exp(-dt * 2.5));
		const panTarget = Math.min(1, Math.hypot(this.pan[0] / MAX_PITCH, this.pan[1] / MAX_YAW));
		this.panTilt += (panTarget - this.panTilt) * (1 - Math.exp(-dt * 8));
		const [hp, hr] = this.hover, pp = this.pan[0] + hp, pr = this.pan[1] + hr;
		const [gp, gr] = this.gyro, [ix, iy] = this.idle;
		const cardTarget = [clamp(pp, MAX_PITCH), clamp(pr + this.gemRoll, MAX_YAW)];
		const depthTarget = [clamp(gp + pp, .23), clamp(gr + pr + this.gemRoll, .32999999999999996)];
		const highlightTarget = [clamp(gp + pp + ix, .23), clamp(gr + pr + this.gemRoll + iy, .32999999999999996)];
		const k = 1 - Math.exp(-dt * 8);
		for (let i = 0; i < 2; i++) {
			this.card[i] += (cardTarget[i] - this.card[i]) * k;
			this.depth[i] += (depthTarget[i] - this.depth[i]) * k;
			this.highlight[i] += (highlightTarget[i] - this.highlight[i]) * k;
		}
		this.scale += (this.targetScale - this.scale) * (1 - Math.exp(-dt * 12));
		this.render(now);
	}
	/**
	* Reduced animations: the card at rest — no sway, no light running over it, no tilt after the pointer or the
	* gyroscope, no star twinkling, the gem not turning — drawn again only when what it shows changes: its size, the
	* fold, the chip, the side its text stands on.
	*/
	frameStill(now) {
		const key = [
			this.width,
			this.pixelRatio,
			this.collapse,
			this.scrollPitch,
			this.chip[0],
			this.chip[1],
			this.mirrored
		].join();
		if (key === this.stillFrame) return;
		this.stillFrame = key;
		this.endCount();
		this.lastTime = null;
		this.pan = [0, 0];
		this.hover = [0, 0];
		this.card = [0, 0];
		this.depth = [0, 0];
		this.idle = idleTilt(this.elapsed);
		this.highlight = [this.idle[0], this.idle[1]];
		this.scale = this.targetScale = 1;
		this.panTilt = this.gemRoll = this.gemRate = 0;
		this.gem.resetClock();
		this.render(now);
	}
	perspective(pitch, scale) {
		const k = this.width / 361;
		let t = ca.identity();
		t[11] = -1 / (650 * k);
		t = ca.translate(t, -this.card[1] * 3 * k, this.card[0] * 2.5 * k);
		t = ca.scale(t, scale, scale);
		t = ca.rotate(t, pitch, 1, 0, 0);
		t = ca.rotate(t, this.card[1], 0, 1, 0);
		t = ca.rotate(t, this.card[1] * .05, 0, 0, 1);
		return t;
	}
	project(x, y, t, z = 0) {
		const ax = this.width / 2, ay = this.height / 2;
		const px = x - ax, py = y - ay;
		const tx = px * t[0] + py * t[4] + z * t[8] + t[12];
		const ty = px * t[1] + py * t[5] + z * t[9] + t[13];
		let tw = px * t[3] + py * t[7] + z * t[11] + t[15];
		if (Math.abs(tw) < 1e-4) tw = 1e-4;
		return [
			ax + tx / tw,
			ay + ty / tw,
			tw
		];
	}
	/**
	* Shift of the back against the face on screen — the thickness along the
	* tilt. The back is not an honest perspective but the same face shifted as
	* in an axonometry: with the camera at 650 points the perspective almost
	* hides the edge.
	*/
	edgeShift(pitch, yaw) {
		const depth = -DESIGN.thickness * this.s * this.scale;
		let r = ca.rotate(ca.identity(), pitch, 1, 0, 0);
		r = ca.rotate(r, yaw, 0, 1, 0);
		return [depth * r[8], depth * r[9]];
	}
	quad(t, shift) {
		const pad = CardBackground.padding;
		const W = this.width + pad * 2, H = this.height + pad * 2;
		const clip = (x, y) => {
			const p = this.project(x, y, t);
			const nx = (p[0] + shift[0] + pad) / W * 2 - 1;
			const ny = 1 - (p[1] + shift[1] + pad) / H * 2;
			return [
				nx * p[2],
				ny * p[2],
				0,
				p[2]
			];
		};
		const w = this.width, h = this.height;
		return [
			clip(0, h),
			clip(w, h),
			clip(0, 0),
			clip(w, 0)
		];
	}
	/**
	* The history is scrolled (iOS WalletScreen): `fraction` 0 — the card is in place, 1 — folded away under the
	* header; `pitch` — how far the fold leaned it back, of its full π/3 (none without movement). The fold itself
	* is the screen's transform of `fold`; from here come the light on the metal, the gem and the shadow.
	*/
	setScroll(fraction, pitch) {
		this.collapse = clamp01(fraction);
		this.scrollPitch = clamp01(pitch);
	}
	/** The QR chip fades and blurs with the name and the address: its alpha, its blur in design points. */
	setChip(alpha, blur) {
		this.chip = [alpha, blur];
	}
	/** A canvas the gem's frames are copied to — the gem of the balance flying to the header — or none. */
	setGemMirror(canvas) {
		this.gemMirror = canvas?.getContext("2d");
		if (canvas) {
			canvas.width = this.gemCanvas.width;
			canvas.height = this.gemCanvas.height;
		}
	}
	render(now) {
		const fold = this.collapse;
		const finger = clamp(this.card[0], MAX_PITCH);
		const pitch = finger;
		const scale = this.scale;
		const yaw = this.card[1];
		let t = this.perspective(pitch, scale);
		this.fitScale = 1;
		const slab = this.edgeShift(pitch, yaw);
		const ax = this.width / 2;
		let reach = 0;
		for (const [x, y] of [
			[0, 0],
			[this.width, 0],
			[0, this.height],
			[this.width, this.height]
		]) {
			const p = this.project(x, y, t)[0];
			reach = Math.max(reach, Math.abs(p - ax), Math.abs(p + slab[0] - ax));
		}
		if (reach > ax) {
			this.fitScale = ax / reach;
			t = ca.concat(t, ca.scaling(this.fitScale, this.fitScale, 1));
		}
		this.cardMatrix = t;
		this.projectedBottom = Math.max(...[[0, this.height], [this.width, this.height]].map(([x, y]) => this.project(x, y, t)[1])) + Math.max(0, slab[1] * this.fitScale);
		const tilt = this.panTilt;
		this.gemScale = 1 + .16 * tilt * tilt * (3 - 2 * tilt);
		const nudge = this.nudge();
		this.gemCanvas.style.transform = `translate(${nudge}px, 0) scale(${this.gemScale})`;
		const css = ca.css(t);
		this.face.style.transform = css;
		this.shadow.style.transform = css;
		const lift = Math.max(0, Math.min(1, (this.scale - 1) / .02));
		const wave = Math.sin(Math.PI * fold);
		this.shadow.style.opacity = String(Math.max(MAX_LIFT_SHADOW * smoothstep01(lift), SCROLL_SHADOW * wave * wave));
		const follow = 1 - Math.min(1, fold * 8);
		this.gem.style.tilt = -finger * 1.1 * follow;
		this.gem.style.lean = yaw * 1.1 * follow;
		const lens = this.lens(nudge);
		const shift = [slab[0] * this.fitScale, slab[1] * this.fitScale];
		const extraIdle = .75;
		const scrollHighlight = smoothstep01(Math.min(1, this.scrollPitch / .64)) * MAX_PITCH;
		this.background.render({
			time: this.elapsed,
			highlightTilt: [clamp(this.highlight[0] + scrollHighlight, .23) + this.idle[0] * extraIdle, this.highlight[1] + this.idle[1] * extraIdle],
			surfaceTilt: [clamp(this.depth[0], .23), this.depth[1]],
			slab: {
				front: this.quad(t, [0, 0]),
				back: this.quad(t, shift)
			},
			lens: lens && lens.card,
			chip: this.chip,
			chipX: cardChipX(this.mirrored)
		});
		this.gem.setLens(lens && lens.gem);
		this.gem.render(now);
		if (this.gemMirror) {
			const mirror = this.gemMirror.canvas;
			if (mirror.width !== this.gemCanvas.width || mirror.height !== this.gemCanvas.height) {
				mirror.width = this.gemCanvas.width;
				mirror.height = this.gemCanvas.height;
			}
			this.gemMirror.clearRect(0, 0, mirror.width, mirror.height);
			this.gemMirror.drawImage(this.gemCanvas, 0, 0);
		}
	}
	/**
	* The lens under the grown gem: the silhouette for the metal (in card
	* units) and for the copy of the amount on the gem canvas.
	*/
	lens(nudge) {
		const pose = this.gem.pose;
		const strength = (pose.grow - 1) / (this.gem.style.dragGrow - 1);
		if (strength <= .002) return null;
		let hull = gemHull(this.outline, pose.yaw, pose.pitch, DESIGN.gemWidth * pose.grow / 2 * .96);
		if (hull.length > 48) hull = hull.filter((_, i) => i % Math.ceil(hull.length / 48) === 0);
		const z = this.gemScale;
		const [gx, gy] = this.gemCenter();
		const center = [gx + nudge, gy];
		const half = DESIGN.gemCanvas / 2;
		return {
			card: {
				center,
				hull: hull.map((p) => [center[0] + p[0] * z, center[1] + p[1] * z]),
				strength,
				spin: pose.yaw
			},
			gem: {
				center: [half, half],
				hull: hull.map((p) => [half + p[0], half + p[1]]),
				strength,
				spin: pose.yaw,
				textScale: z,
				textShift: nudge
			}
		};
	}
	/** Removes the listeners and the observer, and releases both WebGL contexts. */
	destroy() {
		if (this.destroyed) return;
		this.destroyed = true;
		this.listenerSetter.removeAll();
		this.count = null;
		this.gem.destroy();
		this.background.destroy();
	}
};
//#endregion
//#region src/components/wallet/card.tsx
var _tmpl$ = /*#__PURE__*/ template(`<canvas>`);
var _tmpl$2 = /*#__PURE__*/ template(`<div hidden aria-hidden=true><div><div><div></div><span><span></span><span></span><span>GRAM</span></span></div><div dir=ltr>`);
var _tmpl$3 = /*#__PURE__*/ template(`<div role=group><div><div></div><canvas aria-hidden=true></canvas><div><div><div></div><div><span></span><span><span></span><span></span><span>GRAM</span></span></div><div><span dir=ltr></span></div><div><span dir=auto></span></div><span class=sr-only></span><div><span dir=ltr></span></div><div><canvas aria-hidden=true>`);
var _tmpl$4 = /*#__PURE__*/ template(`<br>`);
/** a balance's value in fiat: an empty wallet's without decimals (iOS: `$0`) */
function formatWalletBalanceFiat(nanos, fiatPerGram, currency) {
	return formatFiat(nanos, fiatPerGram, currency, nanos === "0" ? 0 : void 0);
}
/**
* The balance card. With WebGL2 it is the design's 3D card (tilt, light, live gem), held still with reduced
* animations; without it, or with the animations off, the flat card of the design with the same text on it. Given
* the screen's header, it folds away under it as the history scrolls, and its balance flies into the header
* (cardScroll.ts). Right to left its text stands mirrored, the gem and the QR chip with it.
*/
function WalletCardView(props) {
	let root, fold, shadow, background, face, design, shading, gem, balance, gemSlot, gemClip, amount, fraction, currency, fiat, fiatValue, name, address;
	const [flat, setFlat] = createSignal(!liteMode.isAvailable("animations"));
	let card;
	const fiatText = (value) => value || "—";
	const showStaticBalance = () => {
		const { whole, fraction: fractionText } = splitGrams(props.balance());
		amount.textContent = whole;
		fraction.textContent = fractionText;
		fiatValue.textContent = fiatText(props.fiat());
	};
	let flightRoot, flightGroup, flightPrimary, flightIcon, flightGem, flightText, flightAmount, flightFraction, flightCurrency, flightSecondary;
	const flight = (() => {
		var _el$ = _tmpl$2(), _el$2 = _el$.firstChild, _el$3 = _el$2.firstChild, _el$4 = _el$3.firstChild, _el$6 = _el$4.nextSibling, _el$7 = _el$6.firstChild, _el$8 = _el$7.nextSibling, _el$9 = _el$8.nextSibling, _el$0 = _el$3.nextSibling;
		var _ref$ = flightRoot;
		typeof _ref$ === "function" ? use(_ref$, _el$) : flightRoot = _el$;
		var _ref$2 = flightGroup;
		typeof _ref$2 === "function" ? use(_ref$2, _el$2) : flightGroup = _el$2;
		var _ref$3 = flightPrimary;
		typeof _ref$3 === "function" ? use(_ref$3, _el$3) : flightPrimary = _el$3;
		var _ref$4 = flightIcon;
		typeof _ref$4 === "function" ? use(_ref$4, _el$4) : flightIcon = _el$4;
		insert(_el$4, createComponent(Show, {
			get when() {
				return !flat();
			},
			get fallback() {
				return createComponent(IconTsx, {
					icon: "gram_filled",
					get ["class"]() {
						return wallet_module_default.cardGemFallback;
					}
				});
			},
			get children() {
				var _el$5 = _tmpl$();
				var _ref$5 = flightGem;
				typeof _ref$5 === "function" ? use(_ref$5, _el$5) : flightGem = _el$5;
				createRenderEffect(() => className(_el$5, wallet_module_default.flightGem));
				return _el$5;
			}
		}));
		var _ref$6 = flightText;
		typeof _ref$6 === "function" ? use(_ref$6, _el$6) : flightText = _el$6;
		var _ref$7 = flightAmount;
		typeof _ref$7 === "function" ? use(_ref$7, _el$7) : flightAmount = _el$7;
		var _ref$8 = flightFraction;
		typeof _ref$8 === "function" ? use(_ref$8, _el$8) : flightFraction = _el$8;
		var _ref$9 = flightCurrency;
		typeof _ref$9 === "function" ? use(_ref$9, _el$9) : flightCurrency = _el$9;
		var _ref$0 = flightSecondary;
		typeof _ref$0 === "function" ? use(_ref$0, _el$0) : flightSecondary = _el$0;
		createRenderEffect((_p$) => {
			var _v$ = wallet_module_default.flight, _v$2 = wallet_module_default.flightGroup, _v$3 = wallet_module_default.flightPrimary, _v$4 = wallet_module_default.flightIcon, _v$5 = classNames(wallet_module_default.cardAmount, wallet_module_default.flightText), _v$6 = wallet_module_default.cardFraction, _v$7 = wallet_module_default.cardCurrency, _v$8 = classNames(wallet_module_default.cardFiatText, wallet_module_default.flightSecondary);
			_v$ !== _p$.e && className(_el$, _p$.e = _v$);
			_v$2 !== _p$.t && className(_el$2, _p$.t = _v$2);
			_v$3 !== _p$.a && className(_el$3, _p$.a = _v$3);
			_v$4 !== _p$.o && className(_el$4, _p$.o = _v$4);
			_v$5 !== _p$.i && className(_el$6, _p$.i = _v$5);
			_v$6 !== _p$.n && className(_el$8, _p$.n = _v$6);
			_v$7 !== _p$.s && className(_el$9, _p$.s = _v$7);
			_v$8 !== _p$.h && className(_el$0, _p$.h = _v$8);
			return _p$;
		}, {
			e: void 0,
			t: void 0,
			a: void 0,
			o: void 0,
			i: void 0,
			n: void 0,
			s: void 0,
			h: void 0
		});
		return _el$;
	})();
	let scroll;
	onMount(() => {
		if (!flat()) try {
			card = new WalletCard({
				root,
				fold,
				shadow,
				background,
				face,
				design,
				gem,
				balance,
				amount,
				fraction,
				currency,
				fiat: fiatValue
			});
			card.setMirrored(langPack_default.getIsRTL());
		} catch (err) {
			console.warn("wallet: flat card, no WebGL2", err);
			setFlat(true);
		}
		createEffect(on(langPack_default.isRTL, (rtl) => {
			const cancel = requestWalletFrame(() => {
				card?.setMirrored(rtl);
				scroll?.measure();
				scroll?.update();
			});
			onCleanup(cancel);
		}, { defer: true }));
		const scroller = props.scroller?.(), header = props.header?.(), overlay = props.overlay?.();
		if (scroller && header && overlay) {
			overlay.append(flight);
			scroll = new WalletCardScroll({
				scroller,
				room: props.room(),
				card: {
					root,
					fold,
					shadow,
					shading,
					design,
					balance,
					gemSlot,
					gemClip,
					amount,
					fraction,
					currency,
					fiat,
					details: [name, address],
					card
				},
				flight: {
					root: flightRoot,
					group: flightGroup,
					primary: flightPrimary,
					icon: flightIcon,
					gem: card ? flightGem : void 0,
					text: flightText,
					amount: flightAmount,
					fraction: flightFraction,
					currency: flightCurrency,
					secondary: flightSecondary
				},
				header
			});
			onCleanup(() => {
				scroll.destroy();
				flight.remove();
			});
		}
		props.onReady?.({
			root,
			scroll,
			gem: () => {
				const s = root.offsetWidth / DESIGN.width;
				const [x, y] = card ? card.gemCenter() : cardGemCenter(langPack_default.getIsRTL());
				return {
					x: x * s,
					y: y * s,
					width: DESIGN.gemWidth * s
				};
			}
		});
		if (!card) {
			const resizeObserver = new ResizeObserver(() => {
				if (root.clientWidth) design.style.transform = `scale(${root.clientWidth / DESIGN.width})`;
			});
			resizeObserver.observe(root);
			onCleanup(() => resizeObserver.disconnect());
			createEffect(() => {
				showStaticBalance();
				scroll?.syncText();
			});
			return;
		}
		card.setBalanceFormatter(splitGrams);
		createEffect(on(props.balance, (nanos) => card.setBalance(nanos)));
		createEffect(() => {
			const perGram = props.fiatPerGram(), code = props.currency();
			card.setFiatFormatter((nanos) => fiatText(perGram ? formatWalletBalanceFiat(nanos, perGram, code) : ""));
		});
		const detach = addWalletFrameClient({
			frame: (now) => {
				card.frame(now);
				if (scroll?.isFlying) {
					scroll.syncText();
					scroll.onCardFrame();
				}
			},
			isVisible: props.visible,
			element: background,
			onHidden: () => card.resetClock()
		});
		onCleanup(() => {
			detach();
			card.destroy();
		});
	});
	let down;
	const onPointerDown = (e) => {
		down = [e.clientX, e.clientY];
	};
	const onClick = (e) => {
		if (card?.pressedGem || down && Math.hypot(e.clientX - down[0], e.clientY - down[1]) > 6) return;
		props.onClick?.();
	};
	const addressLines = () => groupAddress(props.address() || "", 6);
	return (() => {
		var _el$1 = _tmpl$3(), _el$10 = _el$1.firstChild, _el$11 = _el$10.firstChild, _el$12 = _el$11.nextSibling, _el$13 = _el$12.nextSibling, _el$14 = _el$13.firstChild, _el$15 = _el$14.firstChild, _el$16 = _el$15.nextSibling, _el$17 = _el$16.firstChild, _el$18 = _el$17.nextSibling, _el$19 = _el$18.firstChild, _el$20 = _el$19.nextSibling, _el$21 = _el$20.nextSibling, _el$22 = _el$16.nextSibling, _el$23 = _el$22.firstChild, _el$24 = _el$22.nextSibling, _el$25 = _el$24.firstChild, _el$26 = _el$24.nextSibling, _el$27 = _el$26.nextSibling, _el$28 = _el$27.firstChild, _el$29 = _el$27.nextSibling, _el$30 = _el$29.firstChild;
		_el$1.$$click = onClick;
		_el$1.$$pointerdown = onPointerDown;
		var _ref$1 = root;
		typeof _ref$1 === "function" ? use(_ref$1, _el$1) : root = _el$1;
		var _ref$10 = fold;
		typeof _ref$10 === "function" ? use(_ref$10, _el$10) : fold = _el$10;
		var _ref$11 = shadow;
		typeof _ref$11 === "function" ? use(_ref$11, _el$11) : shadow = _el$11;
		var _ref$12 = background;
		typeof _ref$12 === "function" ? use(_ref$12, _el$12) : background = _el$12;
		var _ref$13 = face;
		typeof _ref$13 === "function" ? use(_ref$13, _el$13) : face = _el$13;
		var _ref$14 = design;
		typeof _ref$14 === "function" ? use(_ref$14, _el$14) : design = _el$14;
		var _ref$15 = shading;
		typeof _ref$15 === "function" ? use(_ref$15, _el$15) : shading = _el$15;
		var _ref$16 = balance;
		typeof _ref$16 === "function" ? use(_ref$16, _el$16) : balance = _el$16;
		var _ref$17 = gemSlot;
		typeof _ref$17 === "function" ? use(_ref$17, _el$17) : gemSlot = _el$17;
		insert(_el$17, createComponent(IconTsx, {
			icon: "gram_filled",
			get ["class"]() {
				return wallet_module_default.cardGemFallback;
			}
		}));
		var _ref$18 = amount;
		typeof _ref$18 === "function" ? use(_ref$18, _el$19) : amount = _el$19;
		var _ref$19 = fraction;
		typeof _ref$19 === "function" ? use(_ref$19, _el$20) : fraction = _el$20;
		var _ref$20 = currency;
		typeof _ref$20 === "function" ? use(_ref$20, _el$21) : currency = _el$21;
		var _ref$21 = fiat;
		typeof _ref$21 === "function" ? use(_ref$21, _el$22) : fiat = _el$22;
		var _ref$22 = fiatValue;
		typeof _ref$22 === "function" ? use(_ref$22, _el$23) : fiatValue = _el$23;
		var _ref$23 = name;
		typeof _ref$23 === "function" ? use(_ref$23, _el$24) : name = _el$24;
		insert(_el$25, () => props.name());
		insert(_el$26, () => i18n("Wallet.Card.Address"));
		var _ref$24 = address;
		typeof _ref$24 === "function" ? use(_ref$24, _el$27) : address = _el$27;
		insert(_el$28, createComponent(For, {
			get each() {
				return addressLines();
			},
			children: (line, index) => [memo(() => memo(() => index() > 0)() && _tmpl$4()), line]
		}));
		var _ref$25 = gemClip;
		typeof _ref$25 === "function" ? use(_ref$25, _el$29) : gemClip = _el$29;
		var _ref$26 = gem;
		typeof _ref$26 === "function" ? use(_ref$26, _el$30) : gem = _el$30;
		createRenderEffect((_p$) => {
			var _v$9 = classNames(wallet_module_default.card, flat() && wallet_module_default.cardFlat), _v$0 = langPack_default.format("Wallet.Card.Name", true), _v$1 = wallet_module_default.cardFold, _v$10 = wallet_module_default.cardShadow, _v$11 = wallet_module_default.cardBackground, _v$12 = wallet_module_default.cardFace, _v$13 = wallet_module_default.cardDesign, _v$14 = wallet_module_default.cardShading, _v$15 = wallet_module_default.cardBalance, _v$16 = wallet_module_default.cardGemSlot, _v$17 = wallet_module_default.cardAmount, _v$18 = wallet_module_default.cardFraction, _v$19 = wallet_module_default.cardCurrency, _v$20 = classNames(wallet_module_default.cardFiat, wallet_module_default.cardFiatText), _v$21 = wallet_module_default.cardName, _v$22 = wallet_module_default.cardAddress, _v$23 = wallet_module_default.cardGemClip, _v$24 = wallet_module_default.cardGem;
			_v$9 !== _p$.e && className(_el$1, _p$.e = _v$9);
			_v$0 !== _p$.t && setAttribute(_el$1, "aria-label", _p$.t = _v$0);
			_v$1 !== _p$.a && className(_el$10, _p$.a = _v$1);
			_v$10 !== _p$.o && className(_el$11, _p$.o = _v$10);
			_v$11 !== _p$.i && className(_el$12, _p$.i = _v$11);
			_v$12 !== _p$.n && className(_el$13, _p$.n = _v$12);
			_v$13 !== _p$.s && className(_el$14, _p$.s = _v$13);
			_v$14 !== _p$.h && className(_el$15, _p$.h = _v$14);
			_v$15 !== _p$.r && className(_el$16, _p$.r = _v$15);
			_v$16 !== _p$.d && className(_el$17, _p$.d = _v$16);
			_v$17 !== _p$.l && className(_el$18, _p$.l = _v$17);
			_v$18 !== _p$.u && className(_el$20, _p$.u = _v$18);
			_v$19 !== _p$.c && className(_el$21, _p$.c = _v$19);
			_v$20 !== _p$.w && className(_el$22, _p$.w = _v$20);
			_v$21 !== _p$.m && className(_el$24, _p$.m = _v$21);
			_v$22 !== _p$.f && className(_el$27, _p$.f = _v$22);
			_v$23 !== _p$.y && className(_el$29, _p$.y = _v$23);
			_v$24 !== _p$.g && className(_el$30, _p$.g = _v$24);
			return _p$;
		}, {
			e: void 0,
			t: void 0,
			a: void 0,
			o: void 0,
			i: void 0,
			n: void 0,
			s: void 0,
			h: void 0,
			r: void 0,
			d: void 0,
			l: void 0,
			u: void 0,
			c: void 0,
			w: void 0,
			m: void 0,
			f: void 0,
			y: void 0,
			g: void 0
		});
		return _el$1;
	})();
}
delegateEvents(["pointerdown", "click"]);
//#endregion
export { formatWalletBalanceFiat as n, WalletCardView as t };
