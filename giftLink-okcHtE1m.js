//# allFunctionsCalledOnLoad
import { t as themeController } from "./themeController-2cytOOn0.js";
import { n as rootScope } from "./rootScope-CZS0lmz8.js";
import { a as i18n } from "./langPack-BmdJGr44.js";
import { C as createSignal, L as untrack, M as onCleanup, _ as createMemo, g as createEffect, j as on, p as createComponent, s as Show, y as createRenderEffect } from "./solid-9Vxm0VIz.js";
import { i as onAppWindowChange, o as requestAppWindowFrame } from "./appWindow-bo-KtJhy.js";
import { n as bindManagersToSession } from "./bindManagersToAccount-BL82O9H9.js";
import { _ as use, c as insert, f as setAttribute, g as template, o as className, p as setStyleProperty, u as memo } from "./web-BPyQozky.js";
import { n as hotReloadGuard } from "./hotReloadGuardProvider-CHEsZRuG.js";
import { t as liteMode } from "./liteMode-DeLStZfQ.js";
import { t as classNames } from "./classNames-DxGDjmvw.js";
import { t as getMiddleware } from "./middleware-D6HuIqPm.js";
import { n as animationIntersector, t as AnimationItemNested } from "./animationIntersector-vAjH_7t1.js";
import { t as ListenerSetter } from "./listenerSetter-BER6qAXn.js";
import { i as simulateClickEvent } from "./clickEvent-COk4YpLP.js";
import { i as createPopup, n as PopupElement } from "./indexTsx-v9mB9bAq.js";
import { D as computeFinalBackgroundColor, w as DotRenderer } from "./sticker-5twBOy1Y.js";
import { I as formatDaysDuration, L as formatFullSentTime } from "./index-B7axFZql.js";
import { J as shouldDisplayGiftCodeAsGift, ft as PeerTitle, t as confirmationPopup } from "./confirmationPopup-Bz6mK0o-.js";
import { U as getPeerId } from "./canPollPeerStories-D3HoBvLX.js";
import { t as subscribeOn } from "./subscribeOn-DnCla7ws.js";
import { M as useIsCleaned, O as loadDecodedImage } from "./openEditors-7FmA7q_V.js";
import { t as MediaHeader } from "./mediaHeader-CnpQNwOl.js";
import { t as anchorCallback } from "./anchorCallback-BbwAJdBk.js";
import { r as toastNew } from "./toast-B6VD5M7R.js";
import { t as useObserveResize } from "./useObserveResize-C3AyElRi.js";
import { t as fetchArrayBuffer } from "./fetchArrayBuffer-C0b3n9Sl.js";
import { n as shareUrlToPeers } from "./shareUrl-BIbwyho4.js";
import { t as InviteLink } from "./inviteLink-DcZkMktu.js";
import { t as toggleDisability } from "./toggleDisability-2oUcKWqw.js";
import { i as TablePeer, t as Table } from "./table-Bjjwur0y.js";
//#region src/helpers/getGiftAssetName.ts
function getGiftAssetName(days) {
	const months = Math.round((days || 0) / 30);
	return months >= 12 ? "Gift12" : months >= 6 ? "Gift6" : "Gift3";
}
//#endregion
//#region src/hooks/useAnimationPlaying.ts
/**
* Whether the animation intersector lets something play: in sight, the window in use, not under a popup or a peek
* over its own. `observe` registers the element with it (the renderer's own play and pause stay with the caller) and
* unregisters with the current owner.
*/
function useAnimationPlaying() {
	const [playing, setPlaying] = createSignal(false);
	const observe = (options) => {
		const animation = new AnimationItemNested({
			onPlay: () => setPlaying(true),
			onPause: () => setPlaying(false)
		});
		animationIntersector.addAnimation({
			...options,
			animation
		});
		onCleanup(() => animationIntersector.removeAnimationByPlayer(animation));
	};
	return [playing, observe];
}
function parseMesh(data) {
	const view = new DataView(data);
	if (data.byteLength < 16 || view.getUint32(0, true) !== 1213416781) throw new Error("not a mesh");
	const vertices = view.getUint32(4, true);
	const count = view.getUint32(8, true);
	const flags = view.getUint32(12, true);
	if (flags & -4) throw new Error("unknown mesh flags");
	const wide = (flags & 2) !== 0;
	if (16 + vertices * 32 + count * (wide ? 4 : 2) !== data.byteLength) throw new Error("corrupt mesh");
	let at = 16;
	const take = (n, size) => {
		const bytes = new Uint8Array(data, at, n * size);
		at += n * size;
		if (!(flags & 1)) return bytes.slice().buffer;
		const out = new Uint8Array(n * size);
		for (let b = 0; b < size; b++) for (let i = 0; i < n; i++) out[i * size + b] = bytes[b * n + i];
		return out.buffer;
	};
	const positions = new Float32Array(take(vertices * 3, 4));
	const uvs = new Float32Array(take(vertices * 2, 4));
	const normals = new Float32Array(take(vertices * 3, 4));
	const indices = wide ? new Uint32Array(take(count, 4)) : new Uint16Array(take(count, 2));
	let next = 0;
	for (let i = 0; i < count; i++) {
		const back = indices[i];
		if (back > next) throw new Error("corrupt mesh");
		indices[i] = next - back;
		if (back === 0) next++;
	}
	if (next !== vertices) throw new Error("corrupt mesh");
	return {
		positions,
		uvs,
		normals,
		indices
	};
}
//#endregion
//#region src/vendor/telegram-3d-star/src/shaders.ts
var VERTEX = `uniform mat4 uMVPMatrix;

attribute vec2 a_TexCoordinate;
attribute vec3 a_Normal;
attribute vec3 vPosition;

varying vec3 vNormal;
varying vec2 vUV;
varying vec3 modelViewVertex;
varying float depth;

void main() {
   vUV = a_TexCoordinate;
   vNormal = a_Normal;
   gl_Position = uMVPMatrix * vec4(vPosition, 1.0);
   modelViewVertex = vPosition;
   depth = gl_Position.z;
}`;
var FRAGMENT = `precision highp float;

uniform sampler2D u_Texture;
uniform sampler2D u_NormalMap;
uniform sampler2D u_BackgroundTexture;
uniform float f_xOffset;
uniform float f_alpha;
uniform mat4 world;
uniform float golden;
uniform float white;

varying vec3 vNormal;
varying vec2 vUV;
varying vec3 modelViewVertex;

uniform float spec1;
uniform float spec2;
uniform float u_diffuse;
uniform float normalSpec;
uniform vec3 gradientColor1;
uniform vec3 gradientColor2;
uniform vec3 normalSpecColor;
uniform vec3 specColor;
uniform vec2 resolution;
uniform vec4 gradientPosition;
uniform int modelIndex;

vec4 premium_star() {
    vec3 cameraPosition = vec3(0, 0, 100);
    vec3 vLightPosition2 = vec3(-400,400,400);
    vec3 vLightPosition3 = vec3(0,200,400);
    vec3 vLightPosition4 = vec3(0,0,100);
    vec3 vLightPositionNormal = vec3(100,-200,400);

    vec3 vNormalW = normalize(vec3(world * vec4(vNormal, 0.0)));
    vec3 vTextureNormal = normalize(texture2D(u_NormalMap, (vUV + vec2(-f_xOffset, f_xOffset)) * 2.0).xyz * 2.0 - 1.0);

    vec3 finalNormal = normalize(vNormalW + vTextureNormal);

    vec3 color = texture2D(u_Texture, vUV).xyz;
    vec3 viewDirectionW = normalize(cameraPosition);

    vec3 angleW = normalize(viewDirectionW + vLightPosition2);
    float specComp2 = max(0., dot(vNormalW, angleW));
    specComp2 = pow(specComp2, max(1., 128.)) * spec1;

    angleW = normalize(viewDirectionW + vLightPosition4);
    float specComp3 = max(0., dot(vNormalW, angleW));
    specComp3 = pow(specComp3, max(1., 20.)) * spec2;

    float diffuse = max(dot(vNormalW, viewDirectionW), (1.0 - u_diffuse));

    float mixValue = distance(vUV,vec2(1,0));
    vec4 gradientColorFinal = vec4(mix(gradientColor1, gradientColor2, mixValue), 1.0);

    angleW = normalize(viewDirectionW + vLightPositionNormal);
    float normalSpecComp = max(0., dot(finalNormal, angleW));
    normalSpecComp = pow(normalSpecComp, max(1., 128.)) * normalSpec;

    angleW = normalize(viewDirectionW + vLightPosition2);
    float normalSpecComp2 = max(0., dot(finalNormal, angleW));
    normalSpecComp2 = pow(normalSpecComp2, max(1., 128.)) * normalSpec;

    vec4 normalSpecFinal = vec4(normalSpecColor, 0.0) * (normalSpecComp + normalSpecComp2);
    vec4 specFinal = vec4(color, 0.0) * (specComp2 + specComp3);

    vec4 fragColor = gradientColorFinal + specFinal + normalSpecFinal;
    vec4 backgroundColor = texture2D(u_BackgroundTexture, vec2(gradientPosition.x + (gl_FragCoord.x / resolution.x) * gradientPosition.y, gradientPosition.z + (1.0 - (gl_FragCoord.y / resolution.y)) * gradientPosition.w));
    return mix(backgroundColor, fragColor, diffuse) * f_alpha;
}

vec4 golden_star() {

    vec3 pos = modelViewVertex / 100.0 + .5;
    float specTexture = texture2D(u_Texture, vUV).y * clamp(vNormal.z, 0.0, 1.0);

    float gradientMix = distance(pos.xy, vec2(1, 1));
    gradientMix -= .05 * specTexture;
    gradientMix = clamp(gradientMix, 0.0, 1.0);
    vec4 color = vec4(mix(gradientColor1, gradientColor2, gradientMix), 1.0);

    vec3 norm = normalize(vec3(world * vec4(vNormal, 0.0)));

    vec3 flecksNormal = normalize(1.0 - texture2D(u_NormalMap, (vUV + .7 * vec2(-f_xOffset, f_xOffset)) * 2.0).xyz);
    float flecks = clamp(flecksNormal.x, 0.0, 1.0);

    vec3 lightPos = vec3(-3., -3., 20.);
    vec3 lightDir = normalize(lightPos - pos);
    float diffuse = max(dot(norm, lightDir), 0.0);

    float spec = 0.0;

    lightPos = vec3(-1., .7, .2);
    spec += specTexture * clamp(2.0 * pow(max(dot(normalize(vec3(0.0) - pos), reflect(-normalize(lightPos - pos), norm)), 0.0), 2.0), 0.0, 1.0) / 6.0;
    lightPos = vec3(8., .7, .5);
    spec += specTexture * clamp(2.0 * pow(max(dot(normalize(vec3(0.0) - pos), reflect(-normalize(lightPos - pos), norm)), 0.0), 2.0), 0.0, 1.0) / 6.0;

    float notSpecTexture = mix(1.0, 0.3, specTexture);
    lightPos = vec3(-3., -3., .5);
    spec += clamp(2.0 * pow(max(dot(normalize(vec3(0.0) - pos), reflect(-normalize(lightPos - pos), norm)), 0.0), 2.0), 0.0, 1.0) / 4.0;

    lightPos = vec3(4., 3., 2.5);
    spec += clamp(1.5 * pow(max(dot(normalize(vec3(0.0) - pos), reflect(-normalize(lightPos - pos), norm)), 0.0), 2.0), 0.0, 1.0) / 6.0;

    lightPos = vec3(-33., .5, 30.);
    spec += clamp(2.0 * pow(max(dot(normalize(vec3(0.0) - pos), reflect(-normalize(lightPos - pos), norm)), 0.0), 2.0), 0.0, 1.0) / 12.0;

    spec = clamp(spec, 0.0, 0.7);

    lightPos = vec3(10., .5, 3.3);
    spec += mix(0.8, 1.0, specTexture) * clamp(2.0 * pow(max(dot(normalize(vec3(0.0) - pos), reflect(-normalize(lightPos - pos), norm)), 0.0), 2.0), 0.0, 1.0) / 8.0;

    lightPos = vec3(-10., .5, 3.7);
    spec += mix(0.8, 1.0, specTexture) * clamp(2.0 * pow(max(dot(normalize(vec3(0.0) - pos), reflect(-normalize(lightPos - pos), norm)), 0.0), 2.0), 0.0, 1.0) / 8.0;

    lightPos = vec3(.5, 12., 1.5);
    spec += mix(0.8, 1.0, specTexture) * clamp(2.0 * pow(max(dot(normalize(vec3(0.0) - pos), reflect(-normalize(lightPos - pos), norm)), 0.0), 2.0), 0.0, 1.0) / 8.0;

    spec = clamp(spec, 0.0, 0.9);

    color = mix(vec4(vec3(0.0), 1.0), color, .8 + .3 * diffuse);
    vec4 specColor = vec4(mix(1.8, 2.0, specTexture) * gradientColor1, 1.0);
    color = mix(color, specColor, spec);

    float flecksSpec = 0.0;
    lightPos = vec3(1.2, -.2, .5);
    flecksSpec += clamp(2.0 * pow(max(dot(normalize(vec3(0.0) - pos), reflect(-normalize(lightPos - pos), norm)), 0.0), 2.0), 0.0, 1.0);

    color = mix(color, specColor,
        clamp(flecksSpec * abs(vNormal.z) * (flecksNormal.z), 0.2, 0.3) - .2
    );

    return mix(color * f_alpha, vec4(1.0), white);
}

uniform float u_shine;
uniform float u_rest;
uniform float u_turn;
uniform float u_move;
uniform vec3 u_glint;

void main() {
    gl_FragColor = mix(premium_star(), golden_star(), golden);
    float shine = (vUV.x + vUV.y - u_shine) / 0.144;
    gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(gl_FragColor.a), 0.5 * exp(-shine * shine));
    vec3 worldNormal = normalize(vec3(world * vec4(vNormal, 0.0)));
    float rest = pow(max(dot(worldNormal, normalize(vec3(-0.265, 0.265, 0.927))), 0.0), 16.0);
    gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(gl_FragColor.a), u_rest * rest * (1.0 - golden));
    float side = pow(max(dot(worldNormal, normalize(vec3(-0.77, 0.17, 0.62))), 0.0), 14.0) + pow(max(dot(worldNormal, normalize(vec3(0.77, 0.17, 0.62))), 0.0), 14.0);
    float turn = u_turn * (1.0 - smoothstep(0.94, 0.985, abs(world[2].z))) * side;
    gl_FragColor.rgb = mix(gl_FragColor.rgb, mix(u_glint, vec3(1.0), 0.7 * clamp(turn - 1.0, 0.0, 1.0)) * gl_FragColor.a, clamp(turn + 0.5 * u_turn * u_move * rest, 0.0, 1.0) * (1.0 - golden));
}`;
/** The path of start_texture.svg: a white shape on 1024 x 1024 that masks the star's speculars. */
var STAR_TEXTURE_PATH = "M242.441216,1023.96673 C484.760949,868.195472 619.565351,780.153383 646.854423,759.840461 C738.267847,691.795866 863.983039,585.091695 1024,439.727947 L1024,363.976818 C810.351061,332.876819 639.684394,317.32682 512,317.32682 C384.315606,317.32682 213.648939,332.876819 0,363.976818 L0,1023.96673 L242.441216,1023.96673 Z";
//#endregion
//#region src/vendor/telegram-3d-star/src/assets.ts
var DEFAULT_BASE = new URL(
	/* @vite-ignore */
	"../assets/",
	import.meta.url
);
var byUrl = /* @__PURE__ */ new Map();
var byBytes = /* @__PURE__ */ new WeakMap();
var starTexture;
/** SvgHelper.getBitmap(R.raw.start_texture, 240, 240, Color.WHITE) of the 1024 x 1024 file. */
function star$1() {
	if (!starTexture) {
		starTexture = document.createElement("canvas");
		starTexture.width = starTexture.height = 240;
		const ctx = starTexture.getContext("2d");
		ctx.scale(240 / 1024, 240 / 1024);
		ctx.fillStyle = "#fff";
		ctx.fill(new Path2D(STAR_TEXTURE_PATH));
	}
	return starTexture;
}
async function fetchMesh(url) {
	const res = await fetch(url);
	if (!res.ok) throw new Error(`${url}: ${res.status}`);
	return parseMesh(await res.arrayBuffer());
}
async function image(url) {
	const img = new Image();
	img.crossOrigin = "anonymous";
	img.src = url;
	await img.decode();
	return img;
}
/** The base URL as a folder, so that a base without its trailing slash still keeps its last segment. */
function baseUrl(base = DEFAULT_BASE) {
	const href = new URL(base, typeof document === "undefined" ? void 0 : document.baseURI).href;
	return href.endsWith("/") ? href : `${href}/`;
}
function loadAssets(source) {
	if (source && typeof source === "object" && !(source instanceof URL)) {
		let mesh = byBytes.get(source.mesh);
		if (!mesh) byBytes.set(source.mesh, mesh = parseMesh(source.mesh));
		return Promise.resolve({
			mesh,
			textures: {
				star: star$1(),
				flecks: source.flecks
			}
		});
	}
	const base = baseUrl(source);
	let loaded = byUrl.get(base);
	if (!loaded) {
		loaded = Promise.all([fetchMesh(new URL("star.mesh", base).href), image(new URL("flecks.png", base).href)]).then(([mesh, flecks]) => ({
			mesh,
			textures: {
				star: star$1(),
				flecks
			}
		}));
		byUrl.set(base, loaded);
		loaded.catch(() => byUrl.delete(base));
	}
	return loaded;
}
//#endregion
//#region src/vendor/telegram-3d-star/src/motion.ts
var clamp = (v, lo, hi) => v < lo ? lo : v > hi ? hi : v;
var smoothstep = (t) => t * t * (3 - 2 * t);
/** Telegram's CubicBezierInterpolator. */
function cubicBezier(x1, y1, x2, y2) {
	const [cx, cy] = [3 * x1, 3 * y1];
	const [bx, by] = [3 * (x2 - x1) - cx, 3 * (y2 - y1) - cy];
	const [ax, ay] = [1 - cx - bx, 1 - cy - by];
	return (time) => {
		let x = time;
		for (let i = 1; i < 14; i++) {
			const z = x * (cx + x * (bx + x * ax)) - time;
			if (Math.abs(z) < .001) break;
			x -= z / (cx + x * (2 * bx + 3 * ax * x));
		}
		return x * (cy + x * (by + x * ay));
	};
}
var EASE_OUT_QUINT = cubicBezier(.23, 1, .32, 1);
var EASE_DEFAULT = cubicBezier(.25, .1, .25, 1);
var EASE_OUT = cubicBezier(0, 0, .58, 1);
/** Android's OvershootInterpolator, tension 2. */
var overshoot = (t) => (t - 1) * (t - 1) * (3 * t - 1) + 1;
var linear = (t) => t;
/** The band's u + v, `seconds` after the star appeared. At 0 it rests off the star. */
function shineAt(seconds) {
	const cycle = seconds < 1 ? 0 : (seconds - 1) % 4;
	return 2 * (-.13 + 1.6 * EASE_OUT(Math.min(Math.max((cycle - 1.1) / .9, 0), 1)));
}
/** `idle` false keeps the idle turns off: the star moves only when dragged or tapped. */
function starMotion(now, idle = true, random = Math.random) {
	let set = null;
	let back = null;
	let idleAt = idle ? now + 2e3 : null;
	let pointer = 0;
	const order = [
		0,
		1,
		2,
		3,
		4
	];
	const int = (bound) => Math.floor(random() * bound);
	const shuffle = () => {
		for (let i = order.length - 1; i > 0; i--) {
			const j = int(i + 1);
			[order[i], order[j]] = [order[j], order[i]];
		}
	};
	shuffle();
	const rest = (at) => idle ? at + 2e3 : null;
	const play = (start, tracks) => {
		set = {
			start,
			tracks,
			done: (end) => {
				m.angleX = 0;
				idleAt = rest(end);
			}
		};
	};
	const startBack = (start) => {
		set = null;
		back = {
			start,
			tracks: [
				"angleX",
				"angleX2",
				"angleY"
			].map((p) => [
				p,
				[m[p], 0],
				600,
				overshoot
			])
		};
		idleAt = rest(start);
	};
	const advance = (run, now) => {
		let ended = true;
		for (const [prop, v, duration, ease, delay = 0] of run.tracks) {
			const elapsed = now - run.start - delay;
			if (elapsed < duration) ended = false;
			if (elapsed < 0) continue;
			const f = ease(Math.min(elapsed / duration, 1));
			const n = v.length - 1;
			const i = Math.min(Math.floor(Math.min(Math.max(f, 0), 1) * n), n - 1);
			m[prop] = v[i] + (v[i + 1] - v[i]) * (f * n - i);
		}
		return ended;
	};
	const startIdle = (start) => {
		const i = order[pointer++];
		if (pointer === order.length) {
			shuffle();
			pointer = 0;
		}
		const pull = int(4);
		const turn = 485 * (pull === 2 ? -1 : 1);
		const { angleX: x, angleY: y } = m;
		play(start, i === 0 && pull === 0 ? [[
			"angleY",
			[y, 48],
			2300,
			EASE_OUT_QUINT
		], [
			"angleY",
			[48, 0],
			500,
			overshoot,
			2300
		]] : i === 0 ? [[
			"angleX",
			[y, turn],
			3e3,
			EASE_OUT_QUINT
		], [
			"angleX",
			[turn, 0],
			1e3,
			overshoot,
			3e3
		]] : i === 1 ? [[
			"angleX",
			[x, 360],
			8e3,
			EASE_DEFAULT
		]] : i === 2 ? [
			[
				"angleX",
				[x, 184],
				600,
				EASE_OUT
			],
			[
				"angleY",
				[y, 50],
				600,
				EASE_OUT
			],
			[
				"angleX",
				[180, 0],
				800,
				overshoot,
				1e4
			],
			[
				"angleY",
				[60, 0],
				800,
				overshoot,
				1e4
			],
			[
				"angleX2",
				[
					0,
					2,
					-3,
					2,
					-1,
					2,
					-3,
					2,
					-1,
					0
				],
				1e4,
				linear
			]
		] : [[
			"angleX",
			[x, 180],
			600,
			EASE_DEFAULT
		], [
			"angleX",
			[180, 360],
			600,
			EASE_DEFAULT,
			2e3
		]]);
	};
	const m = {
		angleX: 0,
		angleY: 0,
		angleX2: 0,
		get moving() {
			return !!(set || back);
		},
		tick(now) {
			const due = idleAt;
			if (due !== null && now >= due) {
				idleAt = null;
				if (m.moving) idleAt = due + 2e3;
				else startIdle(due);
			}
			if (back && advance(back, now)) back = null;
			const run = set;
			if (run && advance(run, now)) {
				set = null;
				run.done?.(now);
			}
		},
		down() {
			set = back = idleAt = null;
		},
		drag(distanceX, distanceY) {
			m.angleX += distanceX * .5;
			m.angleY += distanceY * .05;
		},
		up: startBack,
		tap(now, fx, fy) {
			set = back = null;
			if (Math.abs(m.angleX) > 10) return startBack(now);
			idleAt = null;
			const [x, y] = [(40 + int(30)) * fx, (40 + int(30)) * fy];
			play(now + 16, [
				[
					"angleX",
					[m.angleX, x],
					220,
					EASE_OUT_QUINT
				],
				[
					"angleX",
					[x, 0],
					600,
					overshoot,
					220
				],
				[
					"angleY",
					[m.angleY, y],
					220,
					EASE_OUT_QUINT
				],
				[
					"angleY",
					[y, 0],
					600,
					overshoot,
					220
				]
			]);
		}
	};
	return m;
}
//#endregion
//#region src/vendor/telegram-3d-star/src/color.ts
/** `#rgb`, `#rrggbb`, `rgb(…)` or `rgba(…)`, as getComputedStyle reports a colour. Alpha is ignored. */
function parseColor(color) {
	const s = color.trim();
	const hex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(s);
	if (hex) {
		const digits = hex[1].length === 3 ? hex[1].replace(/./g, (c) => c + c) : hex[1];
		const n = parseInt(digits, 16);
		return [
			n >> 16 & 255,
			n >> 8 & 255,
			n & 255
		];
	}
	const rgb = /^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/i.exec(s);
	return rgb ? [
		Number(rgb[1]),
		Number(rgb[2]),
		Number(rgb[3])
	].map((v) => Math.min(255, Math.round(v))) : null;
}
function toHex(c) {
	return `#${c.map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0")).join("")}`;
}
/** sRGB blend of two `#rrggbb` colours. */
function mixHex(a, b, t) {
	const x = parseColor(a);
	const y = parseColor(b);
	return toHex([
		x[0] + (y[0] - x[0]) * t,
		x[1] + (y[1] - x[1]) * t,
		x[2] + (y[2] - x[2]) * t
	]);
}
/** Relative luminance, as Android's ColorUtils.calculateLuminance. */
function luminance(hex) {
	const [r, g, b] = parseColor(hex).map((v) => {
		const c = v / 255;
		return c <= .04045 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4;
	});
	return .2126 * r + .7152 * g + .0722 * b;
}
//#endregion
//#region src/vendor/telegram-3d-star/src/options.ts
/** Telegram Web's page colours. */
var PAGE_COLORS = {
	light: "#ffffff",
	dark: "#212121"
};
function resolveKind(kind = "premium") {
	if (kind !== "premium" && kind !== "stars") throw new TypeError(`kind must be 'premium' or 'stars', not ${String(kind)}`);
	return kind;
}
function resolveLook(theme, background) {
	if (theme !== void 0 && theme !== "dark" && theme !== "light") throw new TypeError(`theme must be 'dark' or 'light', not ${String(theme)}`);
	const look = theme;
	if (background === void 0) return {
		theme: look ?? "light",
		background: PAGE_COLORS[look ?? "light"]
	};
	const rgb = typeof background === "string" ? parseColor(background) : null;
	if (!rgb) throw new TypeError(`background must be a #rgb, #rrggbb or rgb() colour, not ${String(background)}`);
	const hex = toHex(rgb);
	return {
		theme: look ?? (luminance(hex) < .5 ? "dark" : "light"),
		background: hex
	};
}
function resolveOptions(options = {}) {
	const flag = (name) => {
		const value = options[name] ?? true;
		if (typeof value !== "boolean") throw new TypeError(`${name} must be a boolean`);
		return value;
	};
	return {
		kind: resolveKind(options.kind),
		...resolveLook(options.theme, options.background),
		assets: options.assets,
		interactive: flag("interactive"),
		autoplay: flag("autoplay"),
		maxPixelRatio: ratioCap(options.maxPixelRatio),
		particles: fieldCanvas(options.particles),
		reducedMotion: reducedMotion(options.reducedMotion)
	};
}
function ratioCap(value = 2) {
	if (typeof value !== "number" || !(value >= 1)) throw new TypeError(`maxPixelRatio must be a number of at least 1, not ${String(value)}`);
	return value;
}
function fieldCanvas(value) {
	if (value === void 0 || value === null) return null;
	if (typeof value.getContext !== "function") throw new TypeError(`particles must be a canvas, not ${String(value)}`);
	return value;
}
function reducedMotion(value) {
	if (value !== void 0 && typeof value !== "boolean") throw new TypeError("reducedMotion must be a boolean");
	return value;
}
//#endregion
//#region src/vendor/telegram-3d-star/src/particles.ts
/** Each star's own gradient. */
var PARTICLE_COLORS = {
	premium: [
		"#6a94ff",
		"#9472fd",
		"#e26bd3"
	],
	stars: [
		"#fdd219",
		"#f9b004",
		"#f09903"
	]
};
/** In CSS px: size1 as configure() sets it, then size2 and size3. */
var SPRITE_SIZES = [
	4,
	12,
	10
];
/** 100 particles around a 120 px star, scaled by the star's area: the field keeps its look at any size. */
var particleCount = (star) => clamp(Math.round(100 * (star / 120) ** 2), 1, 300);
/** A seeded generator (Numerical Recipes' LCG): the still frame is the same every time. */
function seeded(seed) {
	let a = seed >>> 0;
	return () => (a = Math.imul(a, 1664525) + 1013904223 >>> 0) / 4294967296;
}
var easeOutCubic = (t) => 1 - (1 - t) ** 3;
var sprites = /* @__PURE__ */ new WeakMap();
/** One pre-rendered four-point star, `size` CSS px at `ratio`, in `color` at alpha 200. Shared by every field of `doc`. */
function sprite(color, size, ratio, doc = document) {
	let cache = sprites.get(doc);
	if (!cache) sprites.set(doc, cache = /* @__PURE__ */ new Map());
	const key = `${color} ${size} ${ratio}`;
	const cached = cache.get(key);
	if (cached) return cached;
	const n = Math.max(2, Math.round(size * ratio));
	const c = doc.createElement("canvas");
	c.width = c.height = n;
	const g = c.getContext("2d");
	const rgb = parseColor(color);
	if (g && rgb) {
		const half = n >> 1;
		const mid = Math.floor(half * .98);
		const p = [
			0,
			half,
			mid,
			mid,
			half,
			0,
			n - mid,
			mid,
			n,
			half,
			n - mid,
			n - mid,
			half,
			n,
			mid,
			n - mid
		];
		const cut = (i, j, r) => {
			const [x, y, dx, dy] = [
				p[2 * i],
				p[2 * i + 1],
				p[2 * j] - p[2 * i],
				p[2 * j + 1] - p[2 * i + 1]
			];
			const f = Math.min(.5, r / (Math.hypot(dx, dy) || 1));
			return [x + dx * f, y + dy * f];
		};
		g.beginPath();
		for (let i = 0; i < 8; i++) {
			const [ax, ay] = cut(i, (i + 7) % 8, .8 * ratio);
			const [bx, by] = cut(i, (i + 1) % 8, .8 * ratio);
			if (i) g.lineTo(ax, ay);
			else g.moveTo(ax, ay);
			g.quadraticCurveTo(p[2 * i], p[2 * i + 1], bx, by);
		}
		g.closePath();
		g.fillStyle = color;
		g.fill();
		blur(g, n, Math.round(ratio), rgb);
	}
	cache.set(key, c);
	return c;
}
/** Stack blur on alpha; the colour is one, so this is what blurring premultiplied pixels gives. Alpha ends at 200. */
function blur(g, n, radius, [r, gr, b]) {
	const img = g.getImageData(0, 0, n, n);
	const d = img.data;
	let a = new Float32Array(n * n);
	let t = new Float32Array(n * n);
	for (let i = 0; i < n * n; i++) a[i] = d[i * 4 + 3];
	const norm = (radius + 1) ** 2;
	for (const [dx, dy] of [[1, 0], [0, 1]]) {
		for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
			let s = 0;
			for (let k = -radius; k <= radius; k++) s += a[clamp(y + k * dy, 0, n - 1) * n + clamp(x + k * dx, 0, n - 1)] * (radius + 1 - Math.abs(k));
			t[y * n + x] = s / norm;
		}
		[a, t] = [t, a];
	}
	for (let i = 0; i < n * n; i++) d.set([
		r,
		gr,
		b,
		a[i] * 200 / 255
	], i * 4);
	g.putImageData(img, 0, 0);
}
var STEP = 1e3 / 60;
var STRIDE = 8;
/** The field in `canvas`, or null without a 2D context. Nothing draws before the first layout. */
function createField(canvas, kind, makeSprite = (color, size, ratio) => sprite(color, size, ratio, canvas.ownerDocument)) {
	const ctx = canvas.getContext("2d");
	if (!ctx) return null;
	let colors = PARTICLE_COLORS[kind];
	let images = [];
	let p = /* @__PURE__ */ new Float32Array(0);
	let w = 0;
	let h = 0;
	let cx = 0;
	let cy = 0;
	let mark = 0;
	let ratio = 0;
	let count = 0;
	let n = 0;
	let rand = Math.random;
	let introAge = Infinity;
	let boost = 1;
	const paintSprites = () => {
		images = [];
		SPRITE_SIZES.forEach((s, i) => colors.forEach((color, j) => images[i * colors.length + j] = makeSprite(color, s, ratio)));
	};
	const inside = (x, y) => cx + x > -15 && cx + x < w + 15 && cy + y > -15 && cy + y < h + 15;
	const spawn = (o) => {
		let x = 0;
		let y = 0;
		for (let tries = 0; tries < 4; tries++) {
			const a = rand() * Math.PI * 2;
			const c = Math.cos(a);
			const s = Math.sin(a);
			const near = .55 * mark / Math.hypot(c, .6 * s);
			const r = near + rand() * Math.max(0, w / 2 - near);
			x = r * c;
			y = .6 * r * s;
			if (inside(x, y)) break;
		}
		const len = Math.hypot(x, y) || 1;
		p[o] = x;
		p[o + 1] = y;
		p[o + 2] = x / len;
		p[o + 3] = y / len;
		p[o + 4] = 0;
		p[o + 5] = 2e3 + Math.floor(rand() * 3e3);
		p[o + 6] = (50 + Math.floor(rand() * 50)) / 100;
		p[o + 7] = Math.floor(rand() * SPRITE_SIZES.length) * colors.length + Math.floor(rand() * colors.length);
	};
	const respawn = () => {
		for (let i = 0; i < n; i++) spawn(i * STRIDE);
	};
	const step = (dt, spin) => {
		introAge += dt;
		boost = Math.max(Math.min(3.5, 1 + Math.abs(spin) * .02), 1 + (boost - 1) * Math.exp(-dt / 200));
		const intro = introAge < 1200 ? 4 - 3 * easeOutCubic(introAge / 1200) : 1;
		const move = 4 / 660 * dt * Math.max(intro, boost);
		for (let o = 0; o < n * STRIDE; o += STRIDE) if ((p[o + 4] += dt) > p[o + 5]) spawn(o);
		else if (!inside(p[o] += p[o + 2] * move, p[o + 1] += p[o + 3] * move)) spawn(o);
	};
	const paint = () => {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		for (let o = 0; o < n * STRIDE; o += STRIDE) {
			const x = cx + p[o];
			const y = cy + p[o + 1];
			const age = p[o + 4];
			const rest = p[o + 5] - age;
			const out = rest < 200 ? clamp(1 - rest / 150, 0, 1) : 0;
			const alpha = p[o + 6] * (1 - out) * Math.min(1, y / 12, (h - y) / 12, x / 24, (w - x) / 24);
			const image = images[p[o + 7]];
			const size = image.width * overshoot(Math.min(1, age / 200));
			if (alpha <= 0 || size <= 0) continue;
			ctx.globalAlpha = Math.min(1, alpha);
			ctx.drawImage(image, x * ratio - size / 2, y * ratio - size / 2, size, size);
		}
		ctx.globalAlpha = 1;
	};
	return {
		layout(width, height, x, y, star, r) {
			const fresh = width !== w || star !== mark || r !== ratio;
			[w, h, cx, cy, mark] = [
				width,
				height,
				x,
				y,
				star
			];
			if (r !== ratio) {
				ratio = r;
				paintSprites();
			}
			const [bw, bh] = [Math.round(w * ratio), Math.round(h * ratio)];
			if (canvas.width !== bw) canvas.width = bw;
			if (canvas.height !== bh) canvas.height = bh;
			if (count !== particleCount(mark)) {
				count = particleCount(mark);
				p = new Float32Array(count * STRIDE);
			}
			n = count;
			if (fresh && w) respawn();
		},
		setKind(next) {
			colors = PARTICLE_COLORS[next];
			if (ratio) paintSprites();
			if (w) paint();
		},
		frame(dt, spin) {
			if (!w) return;
			if (n !== count) n = count;
			step(clamp(dt, 0, 50), spin);
			paint();
		},
		still() {
			if (!w) return;
			rand = seeded(24301);
			n = Math.min(40, count);
			introAge = Infinity;
			boost = 1;
			respawn();
			for (let t = 0; t < 2e3; t += STEP) step(STEP, 0);
			paint();
			rand = Math.random;
		},
		intro() {
			introAge = 0;
		},
		clear() {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
		}
	};
}
//#endregion
//#region src/vendor/telegram-3d-star/src/renderer.ts
/** color1 and color2 of PremiumPreviewBottomSheet and StarsIntroActivity. */
var GRADIENT = {
	premium: "#a767ff #55a5ff",
	stars: "#fec846 #ec920a"
};
/** The Premium star on a light page: Premium's violet over most of the star with blue for an accent near its corner
*  of the gradient, a rest light that barely whitens it, and mostly violet refracted, `behind` mixed with the page by
*  `page`. The turn light lights the star only while it turns: `turn` is its strength toward `glint`, a pale blue whose
*  core burns toward white. Dark pages keep GRADIENT, a 0.9 rest light and no turn light. */
var LIGHT_PREMIUM = {
	gradient: "#3d8bff #6b4dff",
	rest: .1,
	turn: 2.2,
	glint: "#bfdeff",
	behind: "#5c48ff",
	page: .1
};
/** The turn rate in degrees a second, smoothed over MOVE_S seconds, opens the turn light's moving part from MOVE_FROM
*  to MOVE_TO: a turn, a flip or a drag lights it, a hand's tremor does not. */
var MOVE_S = .15;
var MOVE_FROM = 10;
/** Degrees the short way round: a run that ends at 360 starts again from 0, which is no turn. */
var around = (d) => (d % 360 + 540) % 360 - 180;
var rgb = (hex) => parseColor(hex).map((v) => v / 255);
function multiply(out, a, b) {
	for (let i = 0; i < 16; i++) {
		out[i] = 0;
		for (let k = 0; k < 4; k++) out[i] = out[i] + a[k * 4 + i % 4] * b[(i & -4) + k];
	}
	return out;
}
/** Null when the context is lost, the program does not link, or a 32-bit index buffer has no extension. */
function createRenderer(gl, mesh, textures) {
	if (gl.isContextLost()) return null;
	const wide = mesh.indices instanceof Uint32Array;
	if (wide && !gl.getExtension("OES_element_index_uint")) return null;
	const program = gl.createProgram();
	const shaders = [[gl.VERTEX_SHADER, VERTEX], [gl.FRAGMENT_SHADER, FRAGMENT]].map(([type, source]) => {
		const shader = gl.createShader(type);
		gl.shaderSource(shader, source);
		gl.compileShader(shader);
		gl.attachShader(program, shader);
		return shader;
	});
	gl.linkProgram(program);
	const buffers = [];
	const made = [];
	const release = () => {
		for (const buffer of buffers) gl.deleteBuffer(buffer);
		for (const texture of made) gl.deleteTexture(texture);
		for (const shader of shaders) gl.deleteShader(shader);
		gl.deleteProgram(program);
		buffers.length = made.length = 0;
	};
	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
		if (!gl.isContextLost()) console.warn("telegram-3d-star:", gl.getProgramInfoLog(program));
		release();
		return null;
	}
	gl.useProgram(program);
	gl.enable(gl.DEPTH_TEST);
	const at = {};
	const u = (name) => name in at ? at[name] : at[name] = gl.getUniformLocation(program, name);
	const attributes = [
		"a_TexCoordinate",
		"a_Normal",
		"vPosition"
	].map((name) => gl.getAttribLocation(program, name));
	const indices = gl.createBuffer();
	buffers.push(indices);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indices);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, mesh.indices, gl.STATIC_DRAW);
	[
		mesh.uvs,
		mesh.normals,
		mesh.positions
	].forEach((data, k) => {
		const buffer = gl.createBuffer();
		buffers.push(buffer);
		gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
		gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
		gl.enableVertexAttribArray(attributes[k]);
		gl.vertexAttribPointer(attributes[k], k ? 3 : 2, gl.FLOAT, false, 0, 0);
	});
	gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
	gl.pixelStorei(gl.UNPACK_COLORSPACE_CONVERSION_WEBGL, gl.NONE);
	const texture = (unit, clampToEdge) => {
		const t = gl.createTexture();
		made.push(t);
		gl.activeTexture(gl.TEXTURE0 + unit);
		gl.bindTexture(gl.TEXTURE_2D, t);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		if (clampToEdge) for (const wrap of [gl.TEXTURE_WRAP_S, gl.TEXTURE_WRAP_T]) gl.texParameteri(gl.TEXTURE_2D, wrap, gl.CLAMP_TO_EDGE);
	};
	texture(0, true);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textures.star);
	texture(1, false);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textures.flecks);
	texture(2, true);
	[
		"u_Texture",
		"u_NormalMap",
		"u_BackgroundTexture"
	].forEach((name, i) => gl.uniform1i(u(name), i));
	gl.uniform1f(u("u_diffuse"), 1);
	gl.uniform1f(u("normalSpec"), .2);
	gl.uniform3f(u("normalSpecColor"), 1, 1, 1);
	gl.uniform1f(u("spec2"), .3);
	gl.uniform3fv(u("u_glint"), rgb(LIGHT_PREMIUM.glint));
	const p = 1 / Math.tan(53.13 * Math.PI / 360);
	const pv = new Float32Array([
		0,
		0,
		0,
		0,
		0,
		p,
		0,
		0,
		0,
		0,
		-201 / 199,
		-1,
		0,
		0,
		19700 / 199,
		100
	]);
	const [world, mvp] = [/* @__PURE__ */ new Float32Array(16), /* @__PURE__ */ new Float32Array(16)];
	world[15] = 1;
	const pixel = new Uint8Array([
		0,
		0,
		0,
		255
	]);
	let enterAlpha = 0;
	let xOffset = 0;
	let time = 0;
	let turnRate = 0;
	let [lastX, lastY] = [0, 0];
	let [shownAlpha, shownMove] = [0, 0];
	return {
		get settling() {
			return shownAlpha < 1 || shownMove > 0;
		},
		setLook(kind, theme, background) {
			const dark = theme === "dark";
			const light = !dark && kind === "premium";
			pixel.set(parseColor(light ? mixHex(LIGHT_PREMIUM.behind, background, LIGHT_PREMIUM.page) : mixHex("#a767ff", background, .5)));
			gl.activeTexture(gl.TEXTURE2);
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, pixel);
			gl.uniform1f(u("golden"), kind === "stars" ? 1 : 0);
			(light ? LIGHT_PREMIUM.gradient : GRADIENT[kind]).split(" ").forEach((c, i) => gl.uniform3fv(u(`gradientColor${i + 1}`), rgb(c)));
			gl.uniform1f(u("u_rest"), light ? LIGHT_PREMIUM.rest : .9);
			gl.uniform1f(u("u_turn"), light ? LIGHT_PREMIUM.turn : 0);
			gl.uniform1f(u("spec1"), dark ? 1 : 2);
		},
		draw(f, still, glints) {
			const w = gl.drawingBufferWidth;
			const h = gl.drawingBufferHeight;
			gl.viewport(0, 0, w, h);
			gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
			pv[0] = p / (w / h);
			const a = -(f.angleY + f.pitch) * Math.PI / 180;
			const b = -(f.angleX + f.yaw) * Math.PI / 180;
			const ca = Math.cos(a);
			const sa = Math.sin(a);
			const cb = Math.cos(b);
			const sb = Math.sin(b);
			world[0] = cb;
			world[1] = sa * sb;
			world[2] = -ca * sb;
			world[5] = ca;
			world[6] = sa;
			world[8] = sb;
			world[9] = -sa * cb;
			world[10] = ca * cb;
			world[13] = f.angleX2;
			if (still) enterAlpha = 1;
			time += f.dt;
			const [x, y] = [f.angleX + f.yaw, f.angleY + f.pitch];
			if (f.dt > 0) turnRate += (Math.hypot(around(x - lastX), around(y - lastY)) / f.dt - turnRate) * (1 - Math.exp(-f.dt / MOVE_S));
			[lastX, lastY] = [x, y];
			gl.uniformMatrix4fv(u("uMVPMatrix"), false, multiply(mvp, pv, world));
			gl.uniformMatrix4fv(u("world"), false, world);
			gl.uniform1f(u("f_xOffset"), xOffset);
			gl.uniform1f(u("f_alpha"), shownAlpha = enterAlpha);
			gl.uniform2f(u("resolution"), w, h);
			gl.uniform1f(u("u_shine"), still || !glints ? shineAt(0) : shineAt(time));
			shownMove = still ? 0 : smoothstep(clamp((turnRate - MOVE_FROM) / 50, 0, 1));
			gl.uniform1f(u("u_move"), shownMove);
			gl.drawElements(gl.TRIANGLES, mesh.indices.length, wide ? gl.UNSIGNED_INT : gl.UNSIGNED_SHORT, 0);
			enterAlpha = Math.min(1, enterAlpha + 16 / 220);
			xOffset = (xOffset + 5e-4) % 1;
		},
		release
	};
}
//#endregion
//#region src/vendor/telegram-3d-star/src/index.ts
var ATTRIBUTES = {
	powerPreference: "low-power",
	failIfMajorPerformanceCaveat: true
};
var context = (canvas) => canvas.getContext("webgl", ATTRIBUTES);
var lose = (gl) => gl.getExtension("WEBGL_lose_context")?.loseContext();
var supported;
/** Whether this browser can draw the star. Without it, show a poster. */
function isSupported() {
	if (supported === void 0) {
		const gl = typeof document === "undefined" ? null : context(document.createElement("canvas"));
		supported = !!gl && !gl.isContextLost();
		if (gl) lose(gl);
	}
	return supported;
}
/** At most 60 frames a second at any display rate, on the display's own ticks. */
function frameGate() {
	const step = 1e3 / 60;
	let next = 0;
	return (now) => {
		if (now < next - 2) return false;
		next = (now - next > step ? now : next) + step;
		return true;
	};
}
/** Draws the star into `canvas` at its CSS size times devicePixelRatio, capped by maxPixelRatio. Rejects when WebGL cannot draw it. */
async function createStar(canvas, options) {
	if (typeof canvas?.getContext !== "function") throw new TypeError("createStar needs a canvas");
	const o = resolveOptions(options);
	const doc = canvas.ownerDocument;
	const win = doc.defaultView ?? window;
	if (o.particles === canvas) throw new TypeError("particles needs a canvas of its own");
	const assets = await loadAssets(o.assets);
	const gl = context(canvas);
	if (!gl) throw new Error("WebGL is not available");
	let renderer = createRenderer(gl, assets.mesh, assets.textures);
	if (!renderer) {
		lose(gl);
		throw new Error("WebGL cannot draw the star");
	}
	let { kind, theme, background } = o;
	renderer.setLook(kind, theme, background);
	const particles = o.particles;
	const field = particles && createField(particles, kind);
	let dead = false;
	let paused = false;
	let seen = typeof win.IntersectionObserver !== "function";
	let raf = 0;
	let last = 0;
	let clock = 0;
	let [width, height, ratio] = [
		0,
		0,
		0
	];
	let [fw, fh] = [0, 0];
	let spunUntil = -Infinity;
	let angle = 0;
	const gate = frameGate();
	const motion = starMotion(0, o.autoplay);
	const frame = {
		angleX: 0,
		angleY: 0,
		angleX2: 0,
		yaw: 0,
		pitch: 0,
		dt: 0
	};
	const reduce = o.reducedMotion === void 0 && typeof win.matchMedia === "function" ? win.matchMedia("(prefers-reduced-motion: reduce)") : null;
	const still = () => o.reducedMotion ?? !!reduce?.matches;
	const fieldStill = () => still() || !o.autoplay;
	let press = null;
	let dragging = false;
	let [lx, ly] = [0, 0];
	const live = () => !dead && !paused && seen && doc.visibilityState !== "hidden" && !still() && !!renderer && width > 0 && height > 0;
	const wanted = () => live() && (o.autoplay || renderer.settling || motion.moving || !!press);
	const size = () => {
		ratio = Math.min(win.devicePixelRatio || 1, o.maxPixelRatio);
		const [w, h] = [Math.round(width * ratio), Math.round(height * ratio)];
		if (w && h && (canvas.width !== w || canvas.height !== h)) [canvas.width, canvas.height] = [w, h];
	};
	const placeField = () => {
		if (!field || !fw || !fh || !width || !height) return;
		const a = particles.getBoundingClientRect();
		const b = canvas.getBoundingClientRect();
		const k = a.width / fw || 1;
		field.layout(fw, fh, (b.left + b.width / 2 - a.left) / k, (b.top + b.height / 2 - a.top) / k, Math.min(width, height) / 1.5, ratio);
		if (fieldStill()) field.still();
		else field.frame(0, 0);
	};
	const draw = (now) => {
		if (!renderer || !width || !height) return;
		if (Math.min(win.devicePixelRatio || 1, o.maxPixelRatio) !== ratio) {
			size();
			placeField();
		}
		const s = still();
		const dt = raf ? Math.min(Math.max(now - last, 0), 100) : 0;
		last = now;
		if (!s) motion.tick(clock += dt);
		if (field && !fieldStill()) field.frame(dt, clock < spunUntil && dt > 0 ? (motion.angleX - angle) * 1e3 / dt : 0);
		angle = motion.angleX;
		frame.angleX = s ? 0 : motion.angleX;
		frame.angleY = s ? 0 : motion.angleY;
		frame.angleX2 = s ? 0 : motion.angleX2;
		frame.dt = s ? 0 : dt / 1e3;
		renderer.draw(frame, s, o.autoplay);
	};
	const stop = () => {
		win.cancelAnimationFrame(raf);
		raf = 0;
	};
	const loop = (now) => {
		raf = win.requestAnimationFrame(loop);
		if (gate(now)) draw(now);
		if (!wanted()) stop();
	};
	const update = () => {
		if (!wanted()) stop();
		else if (!raf) {
			last = win.performance.now();
			raf = win.requestAnimationFrame(loop);
		}
	};
	const redraw = () => {
		if (!raf) draw(win.performance.now());
	};
	const relook = () => {
		renderer?.setLook(kind, theme, background);
		redraw();
	};
	const onDown = (e) => {
		if (!o.interactive || press || !e.isPrimary || e.button !== 0 || !live()) return;
		press = {
			id: e.pointerId,
			x: e.clientX,
			y: e.clientY,
			t: e.timeStamp
		};
		[dragging, lx, ly] = [
			false,
			e.clientX,
			e.clientY
		];
		motion.down();
		spunUntil = Infinity;
		update();
		canvas.setPointerCapture?.(e.pointerId);
	};
	const onMove = (e) => {
		if (e.pointerId !== press?.id || !(dragging || (dragging = Math.hypot(e.clientX - press.x, e.clientY - press.y) > 8))) return;
		const px = win.devicePixelRatio || 1;
		motion.drag((lx - e.clientX) * px, (ly - e.clientY) * px);
		[lx, ly] = [e.clientX, e.clientY];
	};
	const onUp = (e) => {
		if (e.pointerId !== press?.id) return;
		motion.up(clock);
		spunUntil = clock + 1500;
		const r = canvas.getBoundingClientRect();
		const [hx, hy] = [r.width / 2, r.height / 2];
		if (e.type === "pointerup" && !dragging && hx > 0 && hy > 0 && e.timeStamp - press.t < 400) motion.tap(clock, (hx - e.clientX + r.left) / hx, (hy - e.clientY + r.top) / hy);
		press = null;
		update();
	};
	const onLost = (e) => {
		e.preventDefault();
		renderer = null;
		stop();
	};
	const onRestored = () => {
		renderer = createRenderer(gl, assets.mesh, assets.textures);
		relook();
		update();
	};
	const onMotion = () => {
		update();
		redraw();
		placeField();
	};
	const listeners = [
		["pointerdown", onDown],
		["pointermove", onMove],
		["pointerup", onUp],
		["pointercancel", onUp],
		["webglcontextlost", onLost],
		["webglcontextrestored", onRestored]
	];
	for (const [type, fn] of listeners) canvas.addEventListener(type, fn);
	doc.addEventListener("visibilitychange", update);
	reduce?.addEventListener?.("change", onMotion);
	const style = [canvas.style.touchAction, canvas.style.getPropertyValue("-webkit-tap-highlight-color")];
	if (o.interactive) {
		canvas.style.touchAction = "pan-y";
		canvas.style.setProperty("-webkit-tap-highlight-color", "transparent");
	}
	const fieldEvents = particles?.style.pointerEvents ?? "";
	if (particles) particles.style.pointerEvents = "none";
	if (field && !fieldStill()) field.intro();
	const resize = new win.ResizeObserver((entries) => {
		for (const { target, contentRect: box } of entries) if (target === canvas) [width, height] = [box.width, box.height];
		else [fw, fh] = [box.width, box.height];
		size();
		placeField();
		draw(win.performance.now());
		update();
	});
	resize.observe(canvas);
	if (particles) resize.observe(particles);
	const io = typeof win.IntersectionObserver === "function" ? new win.IntersectionObserver((entries) => {
		seen = entries[entries.length - 1].isIntersecting;
		update();
	}) : null;
	io?.observe(canvas);
	return {
		canvas,
		setTheme(next, color) {
			if (dead) return;
			({theme, background} = resolveLook(next, color));
			relook();
		},
		setKind(next) {
			if (dead) return;
			kind = resolveKind(next);
			field?.setKind(kind);
			relook();
		},
		pause() {
			paused = true;
			update();
		},
		resume() {
			paused = false;
			update();
		},
		destroy() {
			if (dead) return;
			dead = true;
			stop();
			resize.disconnect();
			io?.disconnect();
			for (const [type, fn] of listeners) canvas.removeEventListener(type, fn);
			doc.removeEventListener("visibilitychange", update);
			reduce?.removeEventListener?.("change", onMotion);
			canvas.style.touchAction = style[0];
			canvas.style.setProperty("-webkit-tap-highlight-color", style[1]);
			field?.clear();
			if (particles) particles.style.pointerEvents = fieldEvents;
			renderer?.release();
			renderer = null;
			lose(gl);
		}
	};
}
//#endregion
//#region src/components/star3D/policy.ts
/**
* What the star does at an animation level: nothing at 0 (the poster stands instead), a star at rest at 1 that only
* fades in, idle turns, glints and drags at 2. The OS reduce-motion preference reaches it through the level alone
* (`liteMode` takes it under the a11y layer), never through the package's own media query.
*/
function getStar3DMotion(level) {
	if (!level) return;
	const full = level === 2;
	return {
		autoplay: full,
		interactive: full,
		reducedMotion: false
	};
}
/**
* The look for the colour painted behind the star — light or dark by its luminance, the way the package decides it —
* or, with no opaque colour found, the theme's page colour
*/
function getStar3DLook(background, isNight) {
	return resolveLook(void 0, background || PAGE_COLORS[isNight ? "dark" : "light"]);
}
/**
* The particle field's width: the visible width of the box that clips it, less twice the star's distance from that
* box's middle, so that the field, centred on the star, never reaches past either of its edges
*/
function getStar3DFieldWidth(clipWidth, starOffset) {
	return Math.max(0, Math.floor(clipWidth - 2 * Math.abs(starOffset)));
}
//#endregion
//#region src/vendor/telegram-3d-star/assets/star.mesh?url
var star_default = "/Monolith/star-BoAP7JKu.mesh";
//#endregion
//#region src/vendor/telegram-3d-star/assets/flecks.png?url
var flecks_default = "/Monolith/flecks-Dw9A6qq_.png";
//#endregion
//#region src/components/star3D/assets.ts
var POSTERS = {
	premium: {
		dark: [
			"/Monolith/premium-dark-BfBCC8_6.png",
			"/Monolith/premium-dark@2x-BVs3CioN.png",
			"/Monolith/premium-dark@3x-D07DHEBU.png"
		],
		light: [
			"/Monolith/premium-light-U2xdoEdv.png",
			"/Monolith/premium-light@2x-CV94HEMb.png",
			"/Monolith/premium-light@3x-G8u7UCFq.png"
		]
	},
	stars: {
		dark: [
			"/Monolith/stars-dark-DrjxXZhd.png",
			"/Monolith/stars-dark@2x-cRKxoScm.png",
			"/Monolith/stars-dark@3x-COEyMVHt.png"
		],
		light: [
			"/Monolith/stars-dark-DrjxXZhd.png",
			"/Monolith/stars-dark@2x-cRKxoScm.png",
			"/Monolith/stars-dark@3x-COEyMVHt.png"
		]
	}
};
function getStar3DPoster(kind, theme) {
	const urls = POSTERS[kind][theme];
	return {
		src: urls[0],
		srcset: urls.map((url, index) => `${url} ${index + 1}x`).join(", ")
	};
}
var loading;
/**
* The mesh's bytes and the decoded flecks, fetched once per page for every star (the package parses the mesh once
* per buffer). A failed load is not kept, so the next star tries again.
*/
function loadStar3DAssets() {
	return loading ?? (loading = Promise.all([fetchArrayBuffer(star_default), loadDecodedImage(flecks_default)]).then(([mesh, flecks]) => ({
		mesh,
		flecks
	}), (error) => {
		loading = void 0;
		throw error;
	}));
}
var star3D_module_default = {
	star: "_star_2iqak_1",
	canvas: "_canvas_2iqak_8",
	field: "_field_2iqak_9",
	interactive: "_interactive_2iqak_31"
};
//#endregion
//#region src/components/star3D/index.tsx
var _tmpl$$1 = /*#__PURE__*/ template(`<img alt>`);
var _tmpl$2$1 = /*#__PURE__*/ template(`<div aria-hidden=true>`);
/**
* The ancestor that clips the star's surroundings sideways (a scrollable, the popup), whose visible width the particle
* field takes; the page's root when nothing does
*/
function findClip(element) {
	const doc = element.ownerDocument;
	const view = doc.defaultView;
	for (let el = element.parentElement; el && el !== doc.body; el = el.parentElement) if (view.getComputedStyle(el).overflowX !== "visible") return el;
	return doc.documentElement;
}
/**
* The 3D star of Telegram Premium or Telegram Stars, decorative. Takes a `size` px box in the flow and draws the star
* that big, turning in a box half as large again around it; a poster stands instead with animations off or no WebGL.
* The live star has its particle field behind it: as wide as the box that clips it, twice the star's size tall,
* centred on it and fading out below; it adds nothing to the flow and takes no input.
*/
function Star3D(props) {
	const [root, setRoot] = createSignal();
	const [look, setLook] = createSignal(void 0, { equals: (a, b) => a?.theme === b?.theme && a?.background === b?.background });
	const [failed, setFailed] = createSignal(false);
	const [star, setStar] = createSignal();
	const [canvas, setCanvas] = createSignal();
	const [field, setField] = createSignal();
	const [playing, observePlaying] = useAnimationPlaying();
	const [ownerDocument, setOwnerDocument] = createSignal();
	const motion = createMemo(() => getStar3DMotion(liteMode.getAnimationLevel()), void 0, { equals: (a, b) => a?.autoplay === b?.autoplay && a?.interactive === b?.interactive });
	const live = createMemo(() => !!motion() && !failed() && isSupported());
	const hasLook = createMemo(() => !!look());
	const readLook = () => {
		setLook(getStar3DLook(computeFinalBackgroundColor(root(), Infinity), themeController.isNight()));
	};
	let cancelRead;
	const scheduleRead = () => {
		if (cancelRead || untrack(look)) return;
		cancelRead = requestAppWindowFrame(() => {
			cancelRead = void 0;
			const element = untrack(root);
			if (element?.isConnected && element.offsetWidth) readLook();
		});
	};
	onCleanup(() => cancelRead?.());
	createEffect(() => {
		if (root()) scheduleRead();
	});
	createEffect(on(() => props.active, () => scheduleRead(), { defer: true }));
	useObserveResize(root, scheduleRead);
	createEffect(() => {
		const element = root();
		if (!element) return;
		setOwnerDocument(element.ownerDocument);
		onCleanup(onAppWindowChange(() => {
			cancelRead?.();
			cancelRead = void 0;
			scheduleRead();
			queueMicrotask(() => setOwnerDocument(untrack(root)?.ownerDocument));
		}));
	});
	subscribeOn(rootScope)("theme_changed", () => {
		if (untrack(look)) readLook();
	});
	createEffect(() => {
		if (live()) loadStar3DAssets().catch(() => {});
	});
	createEffect(on([
		live,
		motion,
		hasLook,
		ownerDocument
	], ([live, motion, hasLook, ownerDocument]) => {
		if (!live || !hasLook || !ownerDocument) return;
		const isCleaned = useIsCleaned();
		const element = ownerDocument.createElement("canvas");
		element.classList.add(star3D_module_default.canvas);
		if (motion.interactive) element.classList.add(star3D_module_default.interactive);
		element.setAttribute("aria-hidden", "true");
		const particles = ownerDocument.createElement("canvas");
		particles.classList.add(star3D_module_default.field);
		particles.setAttribute("aria-hidden", "true");
		setField(particles);
		setCanvas(element);
		let created;
		const { theme, background } = untrack(look);
		loadStar3DAssets().then((assets) => isCleaned() ? void 0 : createStar(element, {
			kind: untrack(() => props.kind),
			theme,
			background,
			assets,
			particles,
			...motion
		})).then((star) => {
			if (!star) return;
			if (isCleaned()) {
				star.destroy();
				return;
			}
			created = star;
			setStar(star);
		}, () => {
			if (!isCleaned()) setFailed(true);
		});
		onCleanup(() => {
			setStar(void 0);
			setCanvas(void 0);
			setField(void 0);
			created?.destroy();
		});
	}));
	createEffect(() => {
		const l = look(), s = star();
		if (s && l) s.setTheme(l.theme, l.background);
	});
	createEffect(() => {
		star()?.setKind(props.kind);
	});
	createEffect(() => {
		const s = star();
		if (!s) return;
		if (playing() && props.active !== false) s.resume();
		else s.pause();
	});
	createEffect(() => {
		const element = root();
		if (!element) return;
		observePlaying({
			observeElement: element,
			controlled: true,
			type: "star"
		});
	});
	const clip = createMemo(() => field() && root() ? findClip(root()) : void 0);
	const fitField = () => {
		const element = untrack(field), box = untrack(root), clipElement = untrack(clip);
		if (!element || !box || !clipElement) return;
		const clipRect = clipElement.getBoundingClientRect(), starRect = box.getBoundingClientRect();
		const middle = clipRect.left + clipElement.clientLeft + clipElement.clientWidth / 2;
		let offset = starRect.left + starRect.width / 2 - middle;
		if (Math.abs(offset) > clipElement.clientWidth / 2) offset = 0;
		element.style.width = getStar3DFieldWidth(clipElement.clientWidth, offset) + "px";
	};
	createEffect(() => {
		if (field() && clip()) fitField();
	});
	useObserveResize(clip, fitField);
	const poster = createMemo(() => {
		const l = look();
		return l && !live() && getStar3DPoster(props.kind, l.theme);
	});
	return (() => {
		var _el$ = _tmpl$2$1();
		use(setRoot, _el$);
		insert(_el$, createComponent(Show, {
			get when() {
				return poster();
			},
			get fallback() {
				return [memo(field), memo(canvas)];
			},
			get children() {
				var _el$2 = _tmpl$$1();
				setAttribute(_el$2, "draggable", false);
				createRenderEffect((_p$) => {
					var _v$ = star3D_module_default.canvas, _v$2 = poster().src, _v$3 = poster().srcset;
					_v$ !== _p$.e && className(_el$2, _p$.e = _v$);
					_v$2 !== _p$.t && setAttribute(_el$2, "src", _p$.t = _v$2);
					_v$3 !== _p$.a && setAttribute(_el$2, "srcset", _p$.a = _v$3);
					return _p$;
				}, {
					e: void 0,
					t: void 0,
					a: void 0
				});
				return _el$2;
			}
		}));
		createRenderEffect((_p$) => {
			var _v$4 = classNames(star3D_module_default.star, props.class), _v$5 = props.size + "px";
			_v$4 !== _p$.e && className(_el$, _p$.e = _v$4);
			_v$5 !== _p$.t && setStyleProperty(_el$, "--star-size", _p$.t = _v$5);
			return _p$;
		}, {
			e: void 0,
			t: void 0
		});
		return _el$;
	})();
}
//#endregion
//#region src/components/popups/giftLink.tsx
var _tmpl$ = /*#__PURE__*/ template(`<div class=popup-gift-link-wrapper>`);
var _tmpl$2 = /*#__PURE__*/ template(`<div class=popup-gift-link-share>`);
var ANIMATION_GROUP = "STICKERS-POPUP";
function shareGiftLink(url, openAfter) {
	shareUrlToPeers({
		url,
		openAfter,
		toastKey: "BoostingGiftLinkForwardedTo",
		toastKeyForSelf: "BoostingGiftLinkForwardedToSavedMsg"
	});
}
async function applyGiftCode(slug, button, hide) {
	const toggle = toggleDisability(button, true);
	try {
		await rootScope.managers.appPaymentsManager.applyGiftCode(slug);
		hide();
		toastNew({ langPackKey: "GiftLink.UseSuccess" });
	} catch (err) {
		if (err.type.includes("PREMIUM_SUB_ACTIVE_UNTIL_")) {
			hide();
			const timestamp = +err.type.split("_").pop();
			const button = {
				langKey: "OK",
				isCancel: true
			};
			confirmationPopup({
				titleLangKey: "GiftPremiumActivateErrorTitle",
				descriptionLangKey: "GiftCode.Activation.After",
				descriptionLangArgs: [formatFullSentTime(timestamp), anchorCallback(() => {
					simulateClickEvent(button.element);
					hide();
					shareGiftLink("https://t.me/giftcode/" + slug);
				})],
				button
			});
		}
		console.error("giftcode error", err);
		toggle();
	}
}
async function showGiftLinkPopup(slug, stack, checkedGiftCode) {
	const managers = bindManagersToSession(rootScope.managers);
	const isInChat = !!checkedGiftCode;
	const giftCode = checkedGiftCode ?? await rootScope.managers.appPaymentsManager.checkGiftCode(slug);
	if (shouldDisplayGiftCodeAsGift(giftCode)) {
		hotReloadGuard.showPremiumPopup({
			gift: giftCode,
			stack
		});
		return;
	}
	const middlewareHelper = getMiddleware();
	let dotsCanvas;
	if (isInChat && !giftCode.used_date) {
		const { canvas, readyResult } = DotRenderer.create({
			width: 320,
			height: 32,
			middleware: middlewareHelper.get(),
			animationGroup: ANIMATION_GROUP,
			config: {
				particlesCount: 1e3,
				color: themeController.isNight() ? 16777215 : 0
			}
		});
		await readyResult;
		dotsCanvas = canvas;
	}
	const [show, setShow] = createSignal(true);
	const deferredCloseCallbacks = [];
	const hideWithCallback = (callback) => {
		deferredCloseCallbacks.push(callback);
		setShow(false);
	};
	const isUsed = !!giftCode.used_date;
	const titleLangKey = isUsed ? "BoostingUsedGiftLink" : "BoostingGiftLink";
	const url = isInChat && !isUsed ? "" : "https://t.me/giftcode/" + slug;
	const canUseLink = !isInChat && !isUsed;
	createPopup(() => {
		const listenerSetter = new ListenerSetter();
		onCleanup(() => {
			listenerSetter.removeAll();
			middlewareHelper.destroy();
		});
		const inviteLink = new InviteLink({
			button: false,
			listenerSetter,
			url,
			noRightButton: !url,
			onClick: !url && (() => {
				toastNew({ langPackKey: "BoostingOnlyRecipientCode" });
			})
		});
		if (dotsCanvas) {
			dotsCanvas.classList.add("invite-link-dots");
			inviteLink.container.appendChild(dotsCanvas);
		}
		const makePeer = (peerId) => createComponent(TablePeer, {
			peerId,
			onClick: () => {
				hideWithCallback(() => {
					hotReloadGuard.appImManager.setInnerPeer({ peerId });
				});
			}
		});
		const isGiveaway = giftCode.pFlags.via_giveaway;
		const fromPeerId = getPeerId(giftCode.from_id);
		const toPeerId = giftCode.to_id && getPeerId(giftCode.to_id);
		const giveawayAnchor = (giftCode.giveaway_msg_id || isGiveaway) && anchorCallback(() => {
			hideWithCallback(() => {
				hotReloadGuard.appImManager.setInnerPeer({
					peerId: fromPeerId,
					lastMsgId: giftCode.giveaway_msg_id
				});
			});
		});
		giveawayAnchor?.append(i18n("BoostingIncompleteGiveaway"));
		const reasonValue = toPeerId ? toPeerId === rootScope.myId ? i18n("BoostingYouWereSelected") : i18n("BoostingUserWasSelected", [new PeerTitle({ peerId: toPeerId }).element]) : giveawayAnchor;
		const content = [
			["BoostingFrom", makePeer(fromPeerId)],
			["BoostingTo", toPeerId ? makePeer(toPeerId) : i18n("BoostingNoRecipient")],
			["BoostingGift", i18n("BoostingTelegramPremiumFor", [formatDaysDuration(giftCode.days)])],
			!isInChat && ["BoostingReason", reasonValue],
			["BoostingDate", formatFullSentTime(giftCode.date, void 0, true)]
		].filter(Boolean);
		const shareLink = anchorCallback(() => {
			hideWithCallback(() => {
				shareGiftLink(url, true);
			});
		});
		let confirmButton;
		const wrapper = (() => {
			var _el$ = _tmpl$();
			insert(_el$, createComponent(MediaHeader, {
				marginTop: true,
				marginBottom: true,
				get children() {
					return [
						createComponent(MediaHeader.Sticker, {
							size: 126,
							get element() {
								return createComponent(Star3D, {
									kind: "premium",
									size: 120
								});
							}
						}),
						createComponent(MediaHeader.Title, {
							size: 20,
							get children() {
								return i18n(titleLangKey);
							}
						}),
						createComponent(MediaHeader.Subtitle, { get children() {
							return isUsed ? i18n("BoostingLinkUsed") : i18n(toPeerId === rootScope.myId ? "BoostingLinkAllows" : toPeerId ? "BoostingLinkAllowsToUser" : "BoostingLinkAllowsAnyone", toPeerId ? [new PeerTitle({ peerId: toPeerId }).element] : void 0);
						} })
					];
				}
			}), null);
			insert(_el$, () => inviteLink.container, null);
			insert(_el$, createComponent(Table, {
				"class": "popup-gift-link-table",
				boldKey: true,
				content
			}), null);
			insert(_el$, (!isInChat || !isUsed) && (() => {
				var _el$2 = _tmpl$2();
				insert(_el$2, () => isUsed ? i18n("BoostingUsedLinkDate", [formatFullSentTime(giftCode.used_date, void 0, true)]) : isInChat && !giftCode.slug ? i18n("BoostingLinkNotActivated") : i18n(toPeerId ? "Giveaway.SendLinkToFriend" : "Giveaway.SendLinkToAnyone", [shareLink]));
				return _el$2;
			})(), null);
			return _el$;
		})();
		return createComponent(PopupElement, {
			managers,
			"class": "popup-boosts popup-gift-link",
			closable: true,
			old: true,
			animationGroup: ANIMATION_GROUP,
			get show() {
				return show();
			},
			onCloseAfterTimeout: () => deferredCloseCallbacks.splice(0).forEach((callback) => callback()),
			get children() {
				return [
					createComponent(PopupElement.Header, {
						floating: true,
						get children() {
							return [createComponent(PopupElement.CloseButton, {}), createComponent(PopupElement.Title, { get children() {
								return i18n(titleLangKey);
							} })];
						}
					}),
					createComponent(PopupElement.Scrollable, { get children() {
						return createComponent(PopupElement.Body, { children: wrapper });
					} }),
					createComponent(PopupElement.Footer, { get children() {
						return createComponent(PopupElement.FooterButton, {
							ref: (element) => confirmButton = element,
							callback: () => {
								if (!canUseLink) return;
								applyGiftCode(slug, confirmButton, () => setShow(false));
								return false;
							},
							get children() {
								return i18n(canUseLink ? "BoostingUseLink" : "OK");
							}
						});
					} })
				];
			}
		});
	});
}
//#endregion
export { useAnimationPlaying as a, Star3D as i, shareGiftLink as n, getGiftAssetName as o, showGiftLinkPopup as r, applyGiftCode as t };
