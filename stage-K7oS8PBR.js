//# allFunctionsCalledOnLoad
import { n as __exportAll } from "./rolldown-runtime-CwcJO0Gh.js";
import { A as getWebGL2Context, M as uniformLocations, j as loseContext, k as createProgram } from "./appDialogsManager-CXguiKc3.js";
import { a as projection, d as mat4, n as cameraPoint, o as rotation, r as gemAssets, s as starProjection, t as REFERENCE_PITCH } from "./geometry-BSiIZt3R.js";
//#region src/components/wallet/visual/gem/animation.ts
/** Cubic Bezier easing (ax, ay)–(bx, by), solved for x by bisection. */
function easing(progress, ax, ay, bx, by) {
	const x = Math.min(1, Math.max(0, progress));
	if (x === 0 || x === 1) return x;
	let low = 0, high = 1;
	for (let i = 0; i < 18; i++) {
		const t = (low + high) * .5, s = 1 - t;
		if (3 * s * s * t * ax + 3 * s * t * t * bx + t * t * t < x) low = t;
		else high = t;
	}
	const t = (low + high) * .5, s = 1 - t;
	return 3 * s * s * t * ay + 3 * s * t * t * by + t * t * t;
}
var SPIN_BOOST = 12.6;
var SPIN_DECAY = .95 / 1.4;
var PITCH_LIMIT = 1.1;
var SPRING_FREQUENCY = 6 * Math.PI;
var SPRING_DAMPING = .8;
var SWAY_AMPLITUDE = [.17, .1];
var SWAY_PERIOD = [5.3, 8.9];
/** The gem's yaw and pitch: springs, finger, inertia, spin-up. */
var GemMotion = class GemMotion {
	constructor() {
		this.yaw = 0;
		this.pitch = REFERENCE_PITCH;
		this.isDragging = false;
		this.zoom = 1;
		this.targetYaw = 0;
		this.targetPitch = REFERENCE_PITCH;
		this.rawPitchOffset = 0;
		this.yawSpringVelocity = 0;
		this.pitchSpringVelocity = 0;
		this.yawVelocity = 0;
		this.swayPhase = [Math.random() * 2 * Math.PI, Math.random() * 2 * Math.PI];
		this.swayScale = 1;
		this.tilt = 0;
		this.releaseDecay = 0;
		this.spinVelocity = 0;
		this.spinDecay = .7;
		this.lastDragTime = 0;
		this.timeSinceRelease = 10;
		this.tapRotation = null;
		this.spinAtPress = 0;
	}
	clone() {
		const m = Object.assign(new GemMotion(), this);
		m.swayPhase = this.swayPhase;
		m.tapRotation = this.tapRotation && { ...this.tapRotation };
		return m;
	}
	/**
	* A velocity push in rad/s; `decay` — in how many seconds it falls off by
	* a factor of e. Pushes add up.
	*/
	spin(velocity, decay) {
		this.spinVelocity += velocity;
		this.spinDecay = Math.max(decay, .05);
	}
	/** The spin set outright, not added: a tap's spin replaces what was going on. */
	setSpin(velocity, decay) {
		if (this.isDragging) return;
		this.tapRotation = null;
		this.spinVelocity = velocity;
		this.spinDecay = Math.max(decay, .05);
	}
	sway(time) {
		const a = SWAY_AMPLITUDE, w0 = 2 * Math.PI / SWAY_PERIOD[0], w1 = 2 * Math.PI / SWAY_PERIOD[1];
		return this.swayScale * (a[0] * Math.sin(w0 * time + this.swayPhase[0]) + a[1] * Math.sin(w1 * time + this.swayPhase[1]));
	}
	/** A throw: a fast spin-up, or with `impulse` (rad/s) a plain push that falls off in .7 s (iOS DiamondMotion). */
	fling(direction, impulse) {
		if (this.isDragging) return;
		const velocity = this.yawSpringVelocity;
		this.targetYaw = this.yaw;
		this.yawSpringVelocity = 0;
		if (impulse) {
			this.yawVelocity = 0;
			this.setSpin(direction * impulse, .7);
		} else this.startRotation(direction, velocity, true);
	}
	startRotation(direction, velocity, isFast) {
		this.tapRotation = {
			velocity,
			boost: direction * (isFast ? SPIN_BOOST : 3.36),
			decayTime: isFast ? SPIN_DECAY : .85,
			responseTime: isFast ? .08 : .16,
			isFast
		};
		this.yawVelocity = 0;
		this.timeSinceRelease = .75;
	}
	begin(time) {
		this.spinAtPress = this.spinVelocity;
		this.isDragging = true;
		this.tapRotation = null;
		this.targetYaw = this.yaw;
		this.targetPitch = this.pitch;
		const offset = Math.min(1.0990000000000002, Math.max(-1.1 + .001, this.pitch - REFERENCE_PITCH));
		this.rawPitchOffset = offset / (1 - Math.abs(offset) / PITCH_LIMIT);
		this.yawSpringVelocity = 0;
		this.pitchSpringVelocity = 0;
		this.yawVelocity = 0;
		this.spinVelocity = 0;
		this.lastDragTime = time;
	}
	drag(dx, dy, scale, time) {
		if (!this.isDragging) return;
		const sensitivity = Math.PI / Math.max(scale, 100);
		const deltaYaw = dx * sensitivity;
		this.targetYaw += deltaYaw;
		this.rawPitchOffset += dy * sensitivity;
		this.targetPitch = REFERENCE_PITCH + this.rawPitchOffset / (1 + Math.abs(this.rawPitchOffset) / PITCH_LIMIT);
		const dt = Math.max(1 / 240, Math.min(time - this.lastDragTime, .1));
		this.yawVelocity = Math.min(5, Math.max(-5, deltaYaw / dt));
		this.lastDragTime = time;
	}
	end(time, cancelled = false) {
		this.isDragging = false;
		this.timeSinceRelease = 0;
		this.targetPitch = REFERENCE_PITCH;
		if (!cancelled) this.pitchSpringVelocity -= 2.6;
		if (this.releaseDecay > 0 && !cancelled && time - this.lastDragTime <= .12) {
			this.spinVelocity += this.yawVelocity;
			this.spinDecay = this.releaseDecay;
			this.yawVelocity = 0;
		}
		if (cancelled || time - this.lastDragTime > .12) this.yawVelocity = 0;
		if (cancelled) {
			this.targetYaw = this.yaw;
			this.yawSpringVelocity = 0;
			this.pitchSpringVelocity = 0;
		}
	}
	step(dt, speed, time) {
		dt = Math.min(Math.max(dt, 0), .05);
		let remaining = dt;
		while (remaining > 0) {
			const step = Math.min(remaining, 1 / 120);
			const stepTime = Math.max(0, time - remaining + step);
			if (!this.isDragging) {
				this.timeSinceRelease += step;
				const decay = Math.exp(-4.2 * step);
				this.targetYaw += this.yawVelocity * (1 - decay) / 4.2;
				this.yawVelocity *= decay;
				const spinFade = Math.exp(-step / this.spinDecay);
				const spun = this.spinVelocity * this.spinDecay * (1 - spinFade);
				this.spinVelocity *= spinFade;
				if (Math.abs(this.spinVelocity) < .002) this.spinVelocity = 0;
				this.targetYaw += spun;
				this.yaw += spun;
				let automatic;
				const r = this.tapRotation;
				if (r) {
					const previous = r.velocity;
					r.boost *= Math.exp(-step / r.decayTime);
					r.velocity += (speed + r.boost - r.velocity) * (1 - Math.exp(-step / r.responseTime));
					if (Math.abs(r.boost) < .001 && Math.abs(r.velocity - speed) < .001) {
						r.boost = 0;
						r.velocity = speed;
					}
					automatic = (previous + r.velocity) * .5 * step;
				} else automatic = speed * step;
				const travel = automatic * Math.min(this.timeSinceRelease / .75, 1);
				this.targetYaw += travel;
				this.yaw += travel;
			}
			if (!this.isDragging) this.targetPitch = REFERENCE_PITCH + this.sway(stepTime) + this.tilt;
			const stiffness = SPRING_FREQUENCY * SPRING_FREQUENCY;
			const damping = 2 * SPRING_DAMPING * SPRING_FREQUENCY;
			this.yawSpringVelocity += ((this.targetYaw - this.yaw) * stiffness - damping * this.yawSpringVelocity) * step;
			this.pitchSpringVelocity += ((this.targetPitch - this.pitch) * stiffness - damping * this.pitchSpringVelocity) * step;
			this.yaw += this.yawSpringVelocity * step;
			this.pitch += this.pitchSpringVelocity * step;
			remaining = Math.max(0, remaining - step);
		}
		const fullTurns = Math.trunc(this.yaw / (2 * Math.PI));
		this.yaw -= fullTurns * 2 * Math.PI;
		this.targetYaw -= fullTurns * 2 * Math.PI;
	}
};
function lightEasing(x) {
	if (x === 0 || x === 1) return x;
	let low = 0, high = 1;
	for (let i = 0; i < 16; i++) {
		const t = (low + high) * .5, s = 1 - t;
		if (1.5 * s * s * t + 1.5 * s * t * t + t * t * t < x) low = t;
		else high = t;
	}
	const t = (low + high) * .5;
	return t * t * (3 - 2 * t);
}
var SWEEP_A = [
	-115.8,
	40.3,
	-279.3,
	240.6
];
var SWEEP_B = [
	317,
	-341.9,
	188,
	-131.9
];
var mix4 = (a, b, t) => [
	a[0] + (b[0] - a[0]) * t,
	a[1] + (b[1] - a[1]) * t,
	a[2] + (b[2] - a[2]) * t,
	a[3] + (b[3] - a[3]) * t
];
function facetSweep(frame, times) {
	for (let i = 1; i < times.length; i++) if (frame < times[i]) {
		const t = easing((frame - times[i - 1]) / (times[i] - times[i - 1]), .333, 0, .667, 1);
		return i % 2 === 1 ? mix4(SWEEP_A, SWEEP_B, t) : mix4(SWEEP_B, SWEEP_A, t);
	}
	return times.length % 2 === 0 ? SWEEP_B : SWEEP_A;
}
var CROWN_KEYS = [
	[
		-53.8,
		112.9,
		50.5,
		-54.2
	],
	[
		12,
		53.4,
		143.3,
		-112.9
	],
	[
		-126.9,
		168.8,
		190.3,
		-192.8
	],
	[
		-53.8,
		112.9,
		50.5,
		-54.2
	]
];
var PAVILION_KEYS = [
	[
		-53.8,
		80.7,
		10.8,
		-165.2
	],
	[
		-34.2,
		23.1,
		104.6,
		-191
	],
	[
		-147.9,
		125.5,
		-9.9,
		-106.1
	],
	[
		-53.8,
		80.7,
		10.8,
		-165.2
	]
];
var SWEEP_KEYS = [
	-.05,
	.84,
	-.88,
	-.05
];
function lightState(time) {
	const frame = Math.max(0, time * 60) % 180;
	const sweepFrame = Math.max(0, time * 60 * .5) % 180;
	const times = [
		0,
		39,
		99,
		179
	];
	const seg = frame < 39 ? 0 : frame < 99 ? 1 : 2;
	const t = lightEasing(Math.min(1, Math.max(0, (frame - times[seg]) / (times[seg + 1] - times[seg]))));
	let transmission;
	if (frame < 25) transmission = .45 * frame / 25;
	else if (frame < 142) transmission = .45;
	else transmission = .45 * Math.max(0, (166 - frame) / 24);
	return {
		crown: mix4(CROWN_KEYS[seg], CROWN_KEYS[seg + 1], t),
		pavilion: mix4(PAVILION_KEYS[seg], PAVILION_KEYS[seg + 1], t),
		sweep: [
			SWEEP_KEYS[seg] + (SWEEP_KEYS[seg + 1] - SWEEP_KEYS[seg]) * t,
			frame / 180 * 2 * Math.PI,
			transmission,
			0
		],
		crownSweep: facetSweep(sweepFrame, [
			11,
			49,
			127,
			179
		]),
		rightCrownSweep: facetSweep(sweepFrame, [
			6,
			44,
			88
		]),
		leftCrownSweep: facetSweep(sweepFrame, [
			0,
			38,
			118,
			167
		]),
		pavilionSweep: facetSweep(sweepFrame, [
			0,
			38,
			103,
			163
		]),
		rightPavilionSweep: facetSweep(sweepFrame, [
			5,
			43,
			92
		]),
		leftPavilionSweep: facetSweep(sweepFrame, [
			0,
			38,
			112,
			168
		])
	};
}
var K = (frame, value, ox = .333, oy = 0, ix = .667, iy = 1) => ({
	frame,
	value,
	ox,
	oy,
	ix,
	iy
});
var WHITE_MAIN_SCALE = [
	K(0, 1, .333, 0, .833, .833),
	K(22.123, 0, .167, 0, .833, 1),
	K(83, 0, .41, 0, .12, 1),
	K(120, 1)
];
var WHITE_MORPH = [
	K(0, 0, .167, .167, .833, .833),
	K(12, 1, .167, .167, .833, .833),
	K(102, 1, .167, .167, .4, 1),
	K(120, 0)
];
var WHITE_CORE_SCALE = [
	K(0, 1),
	K(12.066, 1),
	K(23.463, .8),
	K(33.52, 1),
	K(43.576, .8),
	K(60.336, 1),
	K(70.391, .8),
	K(80.447, 1),
	K(90.502, .8),
	K(114.637, 1)
];
var WHITE_HALO_SCALE = [
	K(5.363, 1),
	K(17.43, 1),
	K(28.826, .8),
	K(38.883, 1),
	K(48.939, .8),
	K(65.699, 1),
	K(75.754, .8),
	K(85.811, 1),
	K(95.865, .8),
	K(120, 1)
];
function sampleKeys(keys, frame) {
	if (!(frame > keys[0].frame)) return keys[0].value;
	for (let i = 1; i < keys.length; i++) if (frame < keys[i].frame) {
		const a = keys[i - 1], b = keys[i];
		const t = easing((frame - a.frame) / (b.frame - a.frame), a.ox, a.oy, a.ix, a.iy);
		return a.value + (b.value - a.value) * t;
	}
	return keys[keys.length - 1].value;
}
function sparkleState(time) {
	const frame = Math.max(0, time * 60) % 180 * 121 / 180;
	return {
		shape: [
			sampleKeys(WHITE_MAIN_SCALE, frame),
			sampleKeys(WHITE_MORPH, frame),
			sampleKeys(WHITE_CORE_SCALE, frame),
			1
		],
		haloScale: sampleKeys(WHITE_HALO_SCALE, frame)
	};
}
/**
* The main sparkle sits on the broad facet that faces the camera, and fades
* while the gem spins fast.
*/
function mainPlacement(model, angularSpeed) {
	const pitch = REFERENCE_PITCH;
	const front = [
		0,
		-Math.sin(pitch),
		Math.cos(pitch)
	];
	let best = -1, faceAngle = 0;
	for (let face = 0; face < 4; face++) {
		const angle = face * Math.PI / 2;
		const f = mat4.transformDirection(model, [
			Math.sin(angle),
			0,
			Math.cos(angle)
		]);
		const facing = f[0] * front[0] + f[1] * front[1] + f[2] * front[2];
		if (facing > best) {
			best = facing;
			faceAngle = angle;
		}
	}
	const s = (v) => {
		const t = Math.min(1, Math.max(0, v));
		return t * t * (3 - 2 * t);
	};
	const limit = Math.PI * 12 / 180;
	const angle = Math.acos(Math.min(1, Math.max(-1, best)));
	const crossing = 2 * limit / Math.max(Math.abs(angularSpeed), .001);
	return {
		faceRotation: faceAngle,
		visibility: s(1 - angle / limit) * s((crossing - .06) / .34)
	};
}
//#endregion
//#region src/components/wallet/visual/gem/shaders.ts
var UNIFORMS = `
uniform mat4 u_model;
uniform mat4 u_projection;
uniform mat4 u_inverseModel;
uniform vec4 u_parameters;     // time, refraction, brightness, sparkles
uniform vec4 u_viewport;       // width, height, plane count, sparkles only
uniform vec4 u_sparkleShape;   // main scale, morph, core, star
uniform vec4 u_sparkleHalo;    // halo, main rotation, x correction, visibility
uniform vec4 u_crownGradient;
uniform vec4 u_pavilionGradient;
uniform vec4 u_lightSweep;     // diagonal, studio phase, transmission
uniform vec4 u_facetProjection;
uniform vec4 u_crownSweep;
uniform vec4 u_rightCrownSweep;
uniform vec4 u_leftCrownSweep;
uniform vec4 u_pavilionSweep;
uniform vec4 u_rightPavilionSweep;
uniform vec4 u_leftPavilionSweep;
uniform vec4 u_appearance;     // palette, whiteness
uniform vec4 u_planes[17];
`;
var DIAMOND_VERTEX = `#version 300 es
precision highp float;
${UNIFORMS}
layout(location = 0) in vec3 a_position;
layout(location = 1) in vec3 a_normal;
layout(location = 2) in vec4 a_surface;
out vec3 v_local;
out vec3 v_normal;
out vec3 v_world;
out vec3 v_facet;
void main() {
  vec4 world = u_model * vec4(a_position, 1.0);
  gl_Position = u_projection * world;
  v_local = a_position;
  v_normal = normalize((u_model * vec4(a_normal, 0.0)).xyz);
  v_world = world.xyz;
  float kind = a_surface.z;
  v_facet = kind > 2.5 ? vec3(a_surface.xy, 1.0 - a_surface.x - a_surface.y)
                       : vec3(kind < 0.5 ? 1.0 : 0.0, abs(kind - 1.0) < 0.5 ? 1.0 : 0.0, abs(kind - 2.0) < 0.5 ? 1.0 : 0.0);
}`;
var DIAMOND_FRAGMENT = `#version 300 es
precision highp float;
${UNIFORMS}
in vec3 v_local;
in vec3 v_normal;
in vec3 v_world;
in vec3 v_facet;
out vec4 fragColor;

#define PI 3.14159265358979

vec3 referenceCrown(vec2 p, vec4 g) {
  const float stops[7] = float[7](0.0, 0.162, 0.324, 0.501, 0.667, 0.833, 1.0);
  vec3 colors[7] = vec3[7](vec3(0.145,0.792,1), vec3(0.373,0.875,1), vec3(0.6,0.957,1), vec3(0.3,0.798,1),
                           vec3(0,0.639,1), vec3(0,0.545,1), vec3(0,0.451,1));
  vec2 start = g.xy, direction = g.zw - start;
  float t = clamp(dot(p - start, direction) / dot(direction, direction), 0.0, 1.0);
  for (int i = 1; i < 7; ++i) {
    if (t <= stops[i]) return mix(colors[i-1], colors[i], (t - stops[i-1]) / (stops[i] - stops[i-1]));
  }
  return colors[6];
}

vec3 lateralDepth(vec3 color, vec3 normal, float y, vec3 fw, float opticalLuminance) {
  float horizontalNormal = length(normal.xz);
  float side = smoothstep(0.22, 0.80, abs(normal.x) / max(horizontalNormal, 0.001));
  float shoulder = smoothstep(0.06, 0.57, y);
  float lower = smoothstep(0.12, 0.90, -y);
  float reflectedLight = smoothstep(0.28, 0.78, color.g);
  vec3 deepBlue = mix(vec3(0.017, 0.035, 0.90), vec3(0.006, 0.11, 1), reflectedLight);
  vec3 sideColor = mix(deepBlue, vec3(0.22, 0.86, 1), shoulder * 0.69);
  sideColor = mix(sideColor, vec3(0.018, 0.39, 1), lower * 0.52);
  float detail = 0.105 + opticalLuminance * 0.14 + smoothstep(0.70, 0.95, color.g) * 0.26;
  sideColor = mix(sideColor, color, detail);
  return mix(color, sideColor, side * 0.96 * (1.0 - fw.x));
}

vec3 facetBarycentric(vec2 p, vec2 a, vec2 b, vec2 c) {
  vec2 v = b - a, w = c - a, q = p - a;
  float d = v.x * w.y - v.y * w.x;
  float y = (q.x * w.y - q.y * w.x) / d;
  float z = (v.x * q.y - v.y * q.x) / d;
  return vec3(1.0 - y - z, y, z);
}

float facetCoverage(vec3 b) {
  float edge = min(b.x, min(b.y, b.z));
  float aa = max(fwidth(edge), 0.004);
  return smoothstep(-aa, aa, edge);
}

vec2 sourceFacetPoint(vec3 lp, vec2 outward) {
  float across = dot(lp.xz, vec2(outward.y, -outward.x));
  float depth = dot(lp.xz, outward);
  float c = u_facetProjection.x, s = u_facetProjection.y;
  float y = c * lp.y - s * depth;
  float z = s * lp.y + c * depth;
  float w = u_projection[2].w * z + u_projection[3].w;
  return vec2(257.6 + across / w * u_facetProjection.z, 103.8 + (u_facetProjection.w - y / w) * u_facetProjection.z);
}

vec3 illustratedFacets(vec3 color, vec3 n, vec3 localNormal) {
  vec2 outward = abs(localNormal.x) > abs(localNormal.z) ? vec2(sign(localNormal.x), 0) : vec2(0, sign(localNormal.z));
  vec3 tangent = vec3(outward.y, 0, -outward.x);
  vec2 p = sourceFacetPoint(v_local, outward);
  vec2 nxz = abs(localNormal.xz);
  float broad = 1.0 - smoothstep(0.20, 0.65, min(nxz.x, nxz.y) / max(max(nxz.x, nxz.y), 0.0001));
  vec3 worldTangent = (u_model * vec4(tangent, 0)).xyz;
  vec3 light = normalize(vec3(0.6 * sin(u_lightSweep.y), 0.5, 1));
  float leftLight = pow(clamp(dot(normalize(n - worldTangent * 0.38), light), 0.0, 1.0), 5.0);
  float rightLight = pow(clamp(dot(normalize(n + worldTangent * 0.38), light), 0.0, 1.0), 5.0);
  if (v_facet.y > 0.0) {
    const vec2 junction = vec2(258.8, 128.9);
    const vec2 baseLeft = vec2(108.8, 240.8);
    const vec2 baseRight = vec2(406.8, 240.8);
    vec3 left = facetBarycentric(p, vec2(142.1, 106.3), junction, baseLeft);
    float leftStrength = facetCoverage(left) * (0.18 + 0.40 * leftLight) * clamp(1.0 - left.y, 0.0, 1.0);
    color = mix(color, vec3(0.79, 0.988, 1), leftStrength * v_facet.y * broad);
    vec3 right = facetBarycentric(p, baseRight, junction, vec2(378.5, 108.2));
    float g = smoothstep(junction.x, baseRight.x, p.x);
    vec3 tint = mix(vec3(0.28, 0.83, 1), vec3(0.025, 0.43, 1), g);
    tint = mix(tint, vec3(0.57, 0.95, 1), rightLight * 0.24);
    color = mix(color, tint, facetCoverage(right) * 0.90 * v_facet.y * broad);
  }
  if (v_facet.z > 0.0) {
    vec2 kite = vec2(dot(v_local, tangent), v_local.y);
    const float halfWidth = 0.245, top = -0.61, shoulder = -0.70, bottom = -1.075;
    const float upperHeight = top - shoulder, lowerHeight = shoulder - bottom;
    float upperEdge = ((top - kite.y) * halfWidth - abs(kite.x) * upperHeight) / length(vec2(halfWidth, upperHeight));
    float lowerEdge = ((kite.y - bottom) * halfWidth - abs(kite.x) * lowerHeight) / length(vec2(halfWidth, lowerHeight));
    float edge = min(upperEdge, lowerEdge);
    float aa = max(fwidth(edge), 0.0015);
    float coverage = smoothstep(-aa, aa, edge);
    float illumination = clamp(dot(n, normalize(vec3(-0.65, 0.5, 1))), 0.0, 1.0);
    vec3 tint = mix(vec3(0.48, 0.96, 1), vec3(0.70, 1, 1), illumination);
    float across = clamp(0.5 + kite.x / (2.0 * halfWidth), 0.0, 1.0);
    tint *= mix(vec3(1), vec3(0.88, 0.97, 1), across);
    color = mix(color, tint, coverage * 0.28 * v_facet.z * broad);
  }
  return color;
}

vec3 studio(vec3 d, float phase) {
  float angle = 0.85 * sin(phase);
  d.xz = vec2(cos(angle) * d.x - sin(angle) * d.z, sin(angle) * d.x + cos(angle) * d.z);
  float up = smoothstep(-0.65, 0.85, d.y);
  vec3 c = mix(vec3(0.002, 0.075, 0.88), vec3(0.19, 0.78, 1.0), up);
  float key = pow(clamp(dot(d, normalize(vec3(-0.6, 0.8, 0.7))), 0.0, 1.0), 10.0);
  float stripPosition = 0.12 + 0.48 * sin(phase);
  float strip = exp(-pow((d.x + d.y * 0.42 - stripPosition) * 9.0, 2.0));
  float side = pow(clamp(dot(d, normalize(vec3(0.8, 0.2, -0.5))), 0.0, 1.0), 18.0);
  c = mix(c, vec3(0.68, 0.98, 1.0), key * 0.94);
  c = mix(c, vec3(0.80, 0.99, 1.0), strip * 0.64);
  c += side * vec3(0.1, 0.3, 0.38);
  return c;
}

vec2 facetEdgeRoll(vec2 p, vec2 a, vec2 b) {
  vec2 segment = b - a;
  float edgeLength = length(segment);
  vec2 along = segment / edgeLength;
  vec2 across = vec2(-along.y, along.x);
  float distance = dot(p - a, across);
  float progress = dot(p - a, along);
  float width = max(1.6, fwidth(distance));
  float q = distance / width;
  float ends = smoothstep(0.0, 5.0, progress) * (1.0 - smoothstep(edgeLength - 5.0, edgeLength, progress));
  return across * (q * exp(-q * q) * 0.22 * ends);
}

vec3 polishedNormal(vec3 localNormal) {
  if (v_facet.y <= 0.0) return normalize(v_normal);
  vec2 outward = abs(localNormal.x) > abs(localNormal.z) ? vec2(sign(localNormal.x), 0) : vec2(0, sign(localNormal.z));
  vec2 nxz = abs(localNormal.xz);
  float broad = 1.0 - smoothstep(0.20, 0.65, min(nxz.x, nxz.y) / max(max(nxz.x, nxz.y), 0.0001));
  vec2 p = sourceFacetPoint(v_local, outward);
  vec2 roll = facetEdgeRoll(p, vec2(258.8, 128.9), vec2(108.8, 240.8))
            + facetEdgeRoll(p, vec2(258.8, 128.9), vec2(406.8, 240.8));
  vec3 across = vec3(outward.y, 0, -outward.x);
  vec3 up = normalize(cross(localNormal, across));
  vec3 normal = normalize(localNormal - (across * roll.x - up * roll.y) * broad * v_facet.y);
  return normalize((u_model * vec4(normal, 0)).xyz);
}

float studioPanel(vec3 reflected, vec3 direction, vec2 size) {
  float alignment = dot(reflected, direction);
  vec3 horizontal = normalize(cross(vec3(0, 1, 0), direction));
  vec3 vertical = cross(direction, horizontal);
  vec2 point = vec2(dot(reflected, horizontal), dot(reflected, vertical)) / max(alignment, 0.15);
  vec2 dx = dFdx(point), dy = dFdy(point);
  vec2 variance = size * size + dx * dx + dy * dy;
  float energy = size.x * size.y / sqrt(variance.x * variance.y);
  return exp(-dot(point * point, 1.0 / variance)) * energy * smoothstep(0.15, 0.40, alignment);
}

vec3 surfaceFinish(vec3 color, vec3 normal, vec3 view) {
  vec3 reflected = reflect(-view, normal);
  float phase = u_lightSweep.y;
  float key = studioPanel(reflected, normalize(vec3(-0.36 + 0.14 * sin(phase), 0.90, 0.72)), vec2(0.16, 0.48));
  float rim = studioPanel(reflected, normalize(vec3(0.72, -0.52 + 0.10 * cos(phase), 0.18)), vec2(0.10, 0.60));
  float fresnel = pow(1.0 - clamp(dot(normal, view), 0.0, 1.0), 4.0);
  float strength = key * (0.35 + 0.35 * fresnel) + rim * (0.16 + 0.30 * fresnel);
  return mix(color, vec3(0.87, 0.99, 1), strength);
}

float nearestExit(vec3 origin, vec3 ray, inout vec3 normal) {
  float nearest = 1e5;
  float second = 1e5;
  vec3 secondNormal = normal;
  for (int i = 0; i < 17; ++i) {
    vec4 plane = u_planes[i];
    float denominator = dot(plane.xyz, ray);
    if (denominator > 0.0001) {
      float t = -(dot(plane.xyz, origin) + plane.w) / denominator;
      if (t > 0.001 && t < nearest) {
        second = nearest; secondNormal = normal;
        nearest = t; normal = plane.xyz;
      } else if (t > 0.001 && t < second) {
        second = t; secondNormal = plane.xyz;
      }
    }
  }
  if (second < 1e5) {
    float width = max(0.008, min(0.035, fwidth(second - nearest)));
    float blend = 0.5 * (1.0 - smoothstep(0.0, width, second - nearest));
    normal = normalize(mix(normal, secondNormal, blend));
  }
  return nearest;
}

vec4 oppositeFacets(vec3 p, vec3 ray) {
  vec3 origin = p + ray * 0.004;
  vec3 normal = vec3(0, 1, 0);
  float distance = nearestExit(origin, ray, normal);
  if (distance > 100.0 || normal.y > 0.95) return vec4(0);
  vec3 hit = origin + ray * distance;
  vec3 worldNormal = (u_model * vec4(normal, 0)).xyz;
  vec3 tangent = normalize(vec3(normal.z + 0.00001, 0, -normal.x));
  float across = dot(hit, tangent);
  vec2 authored = vec2(across * 225.8, (normal.y > 0.0 ? 0.3065 - hit.y : -0.54 - hit.y) * 239.0);
  vec3 color;
  if (normal.y > 0.0) {
    color = referenceCrown(authored, u_crownGradient);
    float response = pow(clamp(dot(worldNormal, normalize(vec3(0.7 * sin(u_lightSweep.y), 0.55, -1))), 0.0, 1.0), 4.0);
    color = mix(color * vec3(0.45, 0.70, 0.98), vec3(0.60, 0.94, 1), response * 0.55);
  } else {
    vec3 reflected = normalize((u_model * vec4(reflect(ray, normal), 0)).xyz);
    vec3 environment = studio(reflected, u_lightSweep.y);
    float response = pow(clamp(dot(worldNormal, normalize(vec3(-0.4, -0.55, -1))), 0.0, 1.0), 2.0);
    color = mix(vec3(0.012, 0.38, 1), vec3(0.27, 0.94, 1), response * 0.65 + environment.g * 0.35);
    color = mix(color, environment, 0.28);
    float panel = studioPanel(reflected, normalize(vec3(-0.36, 0.90, 0.72)), vec2(0.20, 0.52));
    color = mix(color, vec3(0.72, 0.98, 1), panel * 0.48);
  }
  float coverage = smoothstep(0.03, 0.35, distance) * exp(-distance * 0.16);
  return vec4(color, coverage);
}

float sourceBand(vec2 p, vec4 g) {
  vec2 direction = g.zw - g.xy;
  float t = dot(p - g.xy, direction) / dot(direction, direction);
  return clamp(1.0 - abs(t - 0.49) / 0.49, 0.0, 1.0);
}

float facetSweep(vec3 localNormal) {
  vec3 tangent = normalize(vec3(localNormal.z + 0.00001, 0, -localNormal.x));
  float across = dot(v_local, tangent) * 225.8;
  float side = smoothstep(0.20, 0.50, abs(normalize(v_normal).x));
  bool right = v_normal.x > 0.0;
  vec4 crown = mix(u_crownSweep, right ? u_rightCrownSweep : u_leftCrownSweep, side);
  vec4 pavilion = mix(u_pavilionSweep, right ? u_rightPavilionSweep : u_leftPavilionSweep, side);
  return sourceBand(vec2(across, (0.3065 - v_local.y) * 239.0), crown) * v_facet.y
       + sourceBand(vec2(across, (-0.54 - v_local.y) * 235.0), pavilion) * v_facet.z;
}

vec3 internalEnvironment(vec3 position, vec3 direction, float pavilion) {
  vec3 wp = (u_model * vec4(position, 1)).xyz;
  vec3 wd = normalize((u_model * vec4(direction, 0)).xyz);
  float along = dot(wp, wd);
  float distance = -along + sqrt(max(0.0, along * along + 3.2 * 3.2 - dot(wp, wp)));
  vec3 s = normalize(wp + wd * distance);
  if (pavilion <= 0.0) return studio(s, u_lightSweep.y);
  float phase = u_lightSweep.y;
  float key = studioPanel(s, normalize(vec3(-0.12 + 0.035 * sin(phase), -0.60, 0.79)), vec2(0.055, 0.52));
  float rim = studioPanel(s, normalize(vec3(0.12, 0.75 + 0.035 * cos(phase), -0.65)), vec2(0.055, 0.50));
  vec3 lower = mix(vec3(0.015, 0.41, 1), vec3(0.58, 0.94, 1), key * 0.95);
  lower = mix(lower, vec3(0.24, 0.78, 1), rim * 0.82);
  return pavilion < 1.0 ? mix(studio(s, u_lightSweep.y), lower, pavilion) : lower;
}

float reflectionTriangle(vec3 origin, vec3 ray, vec3 a, vec3 b, vec3 c, out vec3 coordinates) {
  vec3 ab = b - a, ac = c - a, crossRay = cross(ray, ac);
  float determinant = dot(ab, crossRay);
  coordinates = vec3(0);
  if (abs(determinant) < 0.00001) return 1e5;
  vec3 offset = origin - a;
  float u = dot(offset, crossRay) / determinant;
  vec3 q = cross(offset, ab);
  float v = dot(ray, q) / determinant;
  float t = dot(ac, q) / determinant;
  coordinates = vec3(1.0 - u - v, u, v);
  return min(min(coordinates.x, coordinates.y), coordinates.z) >= 0.0 && t > 0.001 ? t : 1e5;
}

vec3 pavilionReflections(vec3 color, vec3 origin, vec3 ray) {
  if (u_parameters.y <= 0.0) return color;
  const vec3 top = vec3(0, -0.28, 0), tip = vec3(0, -1.06, 0);
  float entry = 0.0, exit = 1e5;
  vec3 entryNormal = vec3(0, 1, 0);
  vec3 worldRay = normalize((u_model * vec4(ray, 0)).xyz);
  vec3 illumination = normalize(vec3(-0.55, 0.65, 1));
  vec3 sideColor = vec3(0);
  float sideWeight = 0.0;
  vec3 veilColor = vec3(0);
  float veilWeight = 0.0;
  for (int i = 0; i < 8; ++i) {
    float a0 = float(i) * PI / 4.0, a1 = float(i + 1) * PI / 4.0;
    vec2 current = vec2(sin(a0), cos(a0)), next = vec2(sin(a1), cos(a1));
    vec3 a = vec3(current.x * 0.28, -0.68, current.y * 0.28);
    vec3 b = vec3(next.x * 0.28, -0.68, next.y * 0.28);
    for (int part = 0; part < 2; ++part) {
      vec3 peak = part == 0 ? top : tip;
      vec3 n = normalize(cross(a - peak, b - peak));
      if (dot(n, (a + b + peak) / 3.0 - vec3(0, -0.68, 0)) < 0.0) n = -n;
      float denominator = dot(n, ray);
      float side = dot(n, origin - peak);
      if (abs(denominator) < 0.00001) {
        if (side > 0.0) exit = -1.0;
      } else {
        float t = -side / denominator;
        if (denominator < 0.0 && t > entry) { entry = t; entryNormal = n; }
        if (denominator > 0.0) exit = min(exit, t);
      }
    }
    vec3 radial = vec3(current.x, 0, current.y);
    vec3 tangent = vec3(current.y, 0, -current.x);
    const float upperY = 0.20;
    const float extension = (upperY + 0.12) / 0.65;
    const float upperRadius = 0.64 + (0.64 - 0.19) * extension;
    const float upperWidth = 0.265097 + (0.265097 - 0.078701) * extension;
    vec3 upperLeft = radial * upperRadius - tangent * upperWidth + vec3(0, upperY, 0);
    vec3 upperRight = radial * upperRadius + tangent * upperWidth + vec3(0, upperY, 0);
    vec3 lowerLeft = radial * 0.19 - tangent * 0.078701 + vec3(0, -0.77, 0);
    vec3 lowerRight = radial * 0.19 + tangent * 0.078701 + vec3(0, -0.77, 0);
    vec3 rc;
    float ribbon = reflectionTriangle(origin, ray, upperLeft, upperRight, lowerLeft, rc);
    if (ribbon > 100.0) ribbon = reflectionTriangle(origin, ray, upperRight, lowerRight, lowerLeft, rc);
    if (ribbon < 100.0) {
      vec3 hit = origin + ray * ribbon;
      float depth = (-0.12 - hit.y) / 0.65;
      float across = dot(hit, tangent);
      float right = mix(0.265097, 0.078701, depth), left = -right;
      vec3 worldRadial = normalize((u_model * vec4(radial, 0)).xyz);
      float facing = clamp(-dot(worldRadial, worldRay), 0.0, 1.0);
      float fade = smoothstep(0.0, 0.065, upperY - hit.y) * (1.0 - smoothstep(0.70, 1.0, depth));
      float opacity = fade * (0.16 + 0.84 * facing);
      float light = clamp(0.5 + 0.5 * dot(worldRadial, illumination), 0.0, 1.0);
      float acrossPlane = clamp((across - left) / (right - left), 0.0, 1.0);
      float diagonal = smoothstep(-0.045, 0.045, acrossPlane - 0.35 - depth * 0.55);
      float middle = smoothstep(0.12, 0.24, depth) * (1.0 - smoothstep(0.50, 0.64, depth));
      vec3 tint = mix(vec3(0.015, 0.56, 1), vec3(0.33, 0.97, 1), light);
      tint = mix(tint, vec3(0.42, 0.97, 1), middle * (0.32 - 0.20 * diagonal));
      tint = mix(tint, vec3(0.015, 0.46, 1), diagonal * 0.24);
      veilColor += tint * opacity;
      veilWeight += opacity;
    }
    vec3 aSide = radial * 0.72 + tangent * 0.055 + vec3(0, -0.30, 0);
    vec3 bSide = radial * 0.49 - tangent * 0.105 + vec3(0, -0.60, 0);
    vec3 cSide = radial * 0.15 + tangent * 0.020 + vec3(0, -0.93, 0);
    vec3 coordinates;
    float t = reflectionTriangle(origin, ray, aSide, bSide, cSide, coordinates);
    if (t < 100.0) {
      vec3 worldRadial = normalize((u_model * vec4(radial, 0)).xyz);
      float sideFacing = 1.0 - abs(dot(worldRadial, worldRay));
      float edge = min(coordinates.y, coordinates.z);
      float opacity = smoothstep(0.20, 0.75, sideFacing) * smoothstep(0.0, 0.085, edge) * smoothstep(0.0, 0.035, coordinates.x);
      float light = 0.5 + 0.5 * dot(worldRadial, illumination);
      vec3 tint = mix(vec3(0.16, 0.80, 1), vec3(0.85, 1, 1), light);
      sideColor += tint * opacity;
      sideWeight += opacity;
    }
  }
  float strength = clamp(u_parameters.y / 0.72, 0.0, 1.0);
  if (veilWeight > 0.0) color = mix(color, veilColor / veilWeight, (1.0 - exp(-veilWeight * 0.46)) * strength);
  if (sideWeight > 0.0) color = mix(color, sideColor / sideWeight, (1.0 - exp(-sideWeight * 1.4)) * strength);
  if (entry < exit) {
    vec3 hit = origin + ray * entry;
    vec3 worldNormal = normalize((u_model * vec4(entryNormal, 0)).xyz);
    float light = clamp(dot(worldNormal, normalize(vec3(-0.65, 0.15, 1))), 0.0, 1.0);
    float gleam = studioPanel(reflect(worldRay, worldNormal),
      normalize(vec3(-0.35 + 0.15 * sin(u_lightSweep.y), 0.60, 0.75)), vec2(0.25, 0.65));
    vec3 tint = mix(vec3(0.025, 0.54, 1), vec3(0.40, 0.92, 1), light);
    tint = mix(tint, vec3(0.72, 0.99, 1), gleam * 0.16);
    float thickness = smoothstep(0.0, 0.18, exit - entry);
    float fade = smoothstep(-1.07, -0.93, hit.y);
    color = mix(color, tint, 0.28 * thickness * fade * strength);
  }
  return color;
}

vec3 interior(vec3 p, vec3 direction, float pavilion) {
  vec3 accumulated = vec3(0);
  float weight = 0.60;
  vec3 origin = p + direction * 0.004;
  for (int bounce = 0; bounce < 2; ++bounce) {
    vec3 n = vec3(0, 1, 0);
    float distance = nearestExit(origin, direction, n);
    if (distance > 100.0) break;
    vec3 hit = origin + direction * distance;
    vec3 outgoing = refract(direction, -n, 1.62);
    vec3 reflection = reflect(direction, n);
    vec3 color = internalEnvironment(hit, reflection, pavilion);
    if (dot(outgoing, outgoing) > 0.01) {
      float incident = clamp(dot(direction, n), 0.0, 1.0);
      float transmitted = clamp(dot(outgoing, n), 0.0, 1.0);
      float rs = (1.62 * incident - transmitted) / (1.62 * incident + transmitted);
      float rp = (incident - 1.62 * transmitted) / (incident + 1.62 * transmitted);
      float reflectance = 0.5 * (rs * rs + rp * rp);
      color = mix(internalEnvironment(hit, outgoing, pavilion), color, reflectance);
    }
    color *= exp(-vec3(0.30, 0.07, 0.006) * distance);
    accumulated += weight * color;
    weight *= 0.52;
    direction = reflection;
    origin = hit + direction * 0.004;
  }
  return accumulated;
}

vec3 materialPalette(vec3 color, vec3 fw, int appearance) {
  if (appearance == 1) {
    float tone = smoothstep(0.0, 0.92, clamp(dot(color.rg, vec2(0.22, 0.78)), 0.0, 1.0));
    vec3 shadow = mix(vec3(0.63, 0.77, 0.95), vec3(0.733, 0.859, 1), fw.y * 0.25);
    const vec3 ice = vec3(207, 241, 253) / 255.0;
    vec3 upper = mix(shadow, ice, smoothstep(0.0, 0.62, tone));
    upper = mix(upper, vec3(1), smoothstep(0.58, 1.0, tone) * 0.92);
    vec3 lower = mix(vec3(0.59, 0.71, 0.865), vec3(0.96, 0.985, 1), pow(tone, 1.10));
    return mix(upper, lower, fw.z);
  }
  if (appearance == 2) {
    float tone = smoothstep(0.035, 0.90, clamp(dot(color.rg, vec2(0.20, 0.80)), 0.0, 1.0));
    vec3 cool = mix(vec3(0.025, 0.29, 0.83), vec3(0.38, 0.78, 1), smoothstep(0.0, 0.65, tone));
    vec3 upper = mix(cool, vec3(0.94, 0.99, 1), smoothstep(0.45, 1.0, tone));
    vec3 lower = mix(vec3(0.025, 0.34, 0.92), vec3(0.90, 0.99, 1), pow(tone, 2.35));
    return mix(upper, lower, fw.z);
  }
  return color;
}

void main() {
  vec3 n = normalize(v_normal);
  float cameraDistance = -u_projection[3].w / u_projection[2].w;
  vec3 view = normalize(vec3(0, 0, cameraDistance) - v_world);
  vec3 localView = (u_inverseModel * vec4(-view, 0)).xyz;
  vec3 localNormal = normalize((u_inverseModel * vec4(n, 0)).xyz);
  vec3 transmitted = refract(localView, localNormal, 1.0 / 1.62);
  vec3 optical = interior(v_local, transmitted, v_facet.z);
  vec3 reflection = studio(reflect(-view, n), u_lightSweep.y);
  float fresnel = 0.08 + 0.46 * pow(1.0 - clamp(dot(n, view), 0.0, 1.0), 4.0);

  float height = clamp((v_local.y + 1.05) / 1.65, 0.0, 1.0);
  float key = clamp(dot(n, normalize(vec3(-0.65, 0.85, 1.0))), 0.0, 1.0);
  float left = clamp(0.52 - v_world.x * 0.43, 0.0, 1.0);
  vec3 body = mix(vec3(0.008, 0.22, 1.0), vec3(0.29, 0.87, 1.0), clamp(key * 0.60 + left * 0.38, 0.0, 1.0));
  float verticalBand = mix(0.5 + 0.5 * sin(height * 18.0 + n.x * 3.0), 1.0, v_facet.z);
  body *= mix(vec3(0.24, 0.48, 0.96), vec3(1), verticalBand * 0.5 + 0.5);
  float opticalLuminance = smoothstep(0.25, 0.85, optical.g);
  vec3 opticalShadow = mix(vec3(0.005, 0.13, 1), vec3(0.015, 0.36, 1), v_facet.z);
  vec3 opticalLight = mix(vec3(0.58, 0.97, 1), vec3(0.45, 0.99, 1), v_facet.z);
  optical = mix(opticalShadow, opticalLight, opticalLuminance);
  float opticalWeight = u_parameters.y * mix(0.90, 0.08, v_facet.y);
  vec3 color = mix(body, optical, opticalWeight);
  color = mix(color, reflection, fresnel);

  float crownGlow = smoothstep(0.10, 0.60, v_local.y) * left;
  color = mix(color, vec3(0.70, 0.99, 1.0), crownGlow * 0.58);
  float crownLight = pow(clamp(dot(n, normalize(vec3(-0.38, 0.55, 1.0))), 0.0, 1.0), 9.0);
  crownLight *= smoothstep(-0.03, 0.28, v_local.y);
  color = mix(color, vec3(0.65, 0.98, 1.0), crownLight * 0.35);
  vec3 facetBase = color;
  if (v_facet.y > 0.0) {
    float softbox = exp(-pow((v_world.x + 0.42) * 1.6, 2.0) - pow((v_world.y - 0.32) * 2.2, 2.0));
    color = mix(color, vec3(0.71, 0.99, 1.0), softbox * crownLight * 0.36);
    float shadow = pow(clamp(1.0 - key, 0.0, 1.0), 1.4);
    color = mix(color, vec3(0.015, 0.08, 1.0), shadow * 0.7);
    vec3 tangent = normalize(vec3(localNormal.z, 0, -localNormal.x));
    vec2 authored = vec2(dot(v_local, tangent) * 225.8 + n.x * 65.0, (0.3065 - v_local.y) * 244.0);
    color = mix(referenceCrown(authored, u_crownGradient), color, 0.28);
    color = mix(facetBase, color, v_facet.y);
  }
  if (v_facet.z > 0.0) color = mix(color, mix(vec3(0.008, 0.32, 1), optical, 0.86), v_facet.z * u_parameters.y);
  float facetFlash = smoothstep(0.20, 0.78, opticalLuminance);
  float flashWeight = mix(0.24, 0.08, v_facet.y);
  color *= mix(vec3(1), mix(vec3(0.76, 0.82, 0.99), vec3(1), facetFlash), flashWeight);
  color = mix(color, vec3(0.66, 0.98, 1), pow(facetFlash, 2.0) * 0.24 * flashWeight);
  color = lateralDepth(color, n, v_local.y, v_facet, opticalLuminance);
  color = mix(color, optical, v_facet.z * u_parameters.y * 0.48);
  color = mix(color, body, v_facet.z * pow(clamp(n.z, 0.0, 1.0), 2.0) * 0.32);
  vec3 rearRay = normalize(mix(localView, transmitted, mix(0.68, 0.18, v_facet.y)));
  vec4 rear = oppositeFacets(v_local, rearRay);
  float transmission = mix(0.34, 0.12 + u_lightSweep.z * 0.65, v_facet.y) * u_parameters.y;
  float facing = smoothstep(0.12, 0.65, n.z);
  color = mix(color, rear.rgb, rear.a * transmission * facing * mix(1.0, 0.12, v_facet.y));
  if (v_facet.z > 0.0) {
    vec3 detailRay = normalize(mix(localView, transmitted, 0.16));
    color = mix(color, pavilionReflections(color, v_local, detailRay), v_facet.z);
  }
  float tipGlow = pow(clamp((-v_local.y - 0.55) / 0.50, 0.0, 1.0), 2.0);
  color = mix(color, vec3(0.57, 0.96, 1.0), tipGlow * 0.20);
  // Translucent reflection of the table, like Layer 36 in the Lottie.
  vec3 tableRay = localView;
  tableRay.y *= 0.72;
  if (tableRay.y > 0.001) {
    float tableHeight = -u_planes[0].w / u_planes[0].y;
    float distance = (tableHeight - v_local.y) / tableRay.y;
    vec2 hit = (v_local + tableRay * distance).xz;
    const float extent = 0.632;
    const float corner = 0.285;
    vec2 q = abs(hit);
    float edge = max(max(q.x, q.y) - extent, (q.x + q.y - extent - corner) * 0.70710678);
    float aa = max(fwidth(edge), 0.001);
    float coverage = 1.0 - smoothstep(-aa, aa, edge);
    vec2 direction = tableRay.xz / max(length(tableRay.xz), 0.0001);
    float depth = clamp(0.5 + dot(hit, direction) / (2.0 * extent), 0.0, 1.0);
    float opacity = mix(0.39, 0.52, depth);
    color = mix(color, vec3(0.765, 0.988, 1), coverage * opacity * clamp(u_parameters.y / 0.72, 0.0, 1.0) * v_facet.y);
  }
  color = illustratedFacets(color, n, localNormal);
  color = mix(color, vec3(0.63, 0.96, 1), 0.58 * v_facet.x);
  float sweep = facetSweep(localNormal);
  float sweepCore = smoothstep(0.35, 1.0, sweep);
  color = mix(color, vec3(0.592, 0.953, 1), sweep * 0.20 + sweepCore * sweepCore * 0.62);
  color = surfaceFinish(color, polishedNormal(localNormal), view);
  color = materialPalette(color, v_facet, int(u_appearance.x + 0.5));
  fragColor = vec4(clamp(color * u_parameters.z, 0.0, 1.0), 1.0);
}`;
var SPARKLE_VERTEX = `#version 300 es
precision highp float;
${UNIFORMS}
layout(location = 0) in vec4 a_contours;
layout(location = 1) in float a_layer;
uniform vec4 u_anchorPosition[8];
uniform vec4 u_anchorNormal[8];
uniform int u_baseInstance;
out vec2 v_source;
flat out float v_strength;
flat out int v_layer;
void main() {
  int instance = gl_InstanceID + u_baseInstance;
  int layer = int(a_layer + 0.5);
  const float authoringToWorld = 2.0 / 447.9;
  vec3 local = u_anchorPosition[instance].xyz;
  vec3 normal = u_anchorNormal[instance].xyz;
  if (instance == 0) {
    float c = cos(u_sparkleHalo.y), s = sin(u_sparkleHalo.y);
    local.xz = vec2(c * local.x + s * local.z, -s * local.x + c * local.z);
    normal.xz = vec2(c * normal.x + s * normal.z, -s * normal.x + c * normal.z);
  } else {
    local += normal * 0.008;
  }
  vec3 worldNormal = (u_model * vec4(normal, 0)).xyz;
  float pulse = pow(max(0.0, sin(u_parameters.x * 2.1 + float(instance) * 2.37 + 1.5)), 16.0);
  float front = instance == 0 ? u_sparkleHalo.w : smoothstep(0.15, 0.55, worldNormal.z);
  float strength = front * u_parameters.w;
  vec4 center = u_projection * u_model * vec4(local, 1);
  float morph = instance == 0 ? u_sparkleShape.y : 0.0;
  vec2 source = mix(a_contours.xy, a_contours.zw, morph);
  float groupScale = 1.0;
  vec2 offset = vec2(0);
  if (layer == 0) { groupScale = u_sparkleHalo.x; offset.y = 5.9; }
  if (layer == 1) { groupScale = u_sparkleShape.w; offset.y = -0.8; }
  if (layer == 2) { groupScale = u_sparkleShape.z; offset.y = -0.9; }
  if (layer == 3) { groupScale = 0.309; offset = vec2(0.6, -0.4); }
  float scale = instance == 0 ? u_sparkleShape.x * u_sparkleHalo.w : (0.632 / 0.75) * pulse;
  vec2 point = (source * groupScale + offset) * authoringToWorld * scale;
  gl_Position = center + center.w * vec4(point.x * u_projection[0][0] / u_sparkleHalo.z, -point.y * u_projection[1][1], 0, 0);
  v_source = source;
  v_strength = strength;
  v_layer = layer;
}`;
var SPARKLE_FRAGMENT = `#version 300 es
precision highp float;
uniform vec4 u_appearance;
in vec2 v_source;
flat in float v_strength;
flat in int v_layer;
out vec4 fragColor;
float radialOpacity(float radius, float first, float middle) {
  if (radius <= first) return 1.0;
  if (radius <= middle) return mix(1.0, 0.5, (radius - first) / (middle - first));
  return 0.5 * clamp((1.0 - radius) / (1.0 - middle), 0.0, 1.0);
}
void main() {
  float alpha = 1.0;
  vec3 color = vec3(1);
  if (v_layer == 0) {
    alpha = radialOpacity(length(v_source - vec2(-0.5, 0.2)) / 108.5, 0.312, 0.624) * 0.60;
  } else if (v_layer == 1) {
    alpha = radialOpacity(length(v_source - vec2(-0.5, 0.9)) / 113.1, 0.297, 0.503) * 0.60;
    color = vec3(0.82, 1, 0.902);
  } else if (v_layer == 2) {
    alpha = 0.96;
  } else if (v_layer == 3) {
    float r = clamp(length(v_source) / length(vec2(176, -170)), 0.0, 1.0);
    alpha = 1.0 - r;
    color = mix(vec3(0.694, 0.969, 1), vec3(0.663, 0.957, 1), r);
  }
  int appearance = int(u_appearance.x + 0.5);
  if (appearance == 1) {
    color = v_layer == 0 ? vec3(0.635, 0.749, 1) : vec3(1);
    if (v_layer == 1) alpha = 0.0;
  } else if (appearance == 2) {
    color = v_layer == 1 ? vec3(0.82, 0.96, 1) : vec3(1);
  }
  alpha *= v_strength;
  fragColor = vec4(color * alpha, alpha);
}`;
var LENS_VERTEX = `#version 300 es
precision highp float;
const vec2 corners[4] = vec2[4](vec2(-1, -1), vec2(1, -1), vec2(-1, 1), vec2(1, 1));
void main() { gl_Position = vec4(corners[gl_VertexID], 0, 1); }`;
var LENS_FRAGMENT = `#version 300 es
precision highp float;
uniform sampler2D u_text;
uniform vec2 u_hull[48];
uniform int u_count;
uniform vec2 u_center;     // gem centre, canvas points
uniform vec2 u_canvas;     // canvas size in points
uniform float u_pixelRatio;
uniform float u_strength;
uniform float u_spin;
uniform float u_textScale; // the canvas has grown — glyphs go back to their size
uniform float u_textShift; // the canvas moved right — glyphs stay in place
uniform float u_opacity;
out vec4 fragColor;
void main() {
  vec2 position = vec2(gl_FragCoord.x, u_canvas.y * u_pixelRatio - gl_FragCoord.y) / u_pixelRatio;
  bool inside = false;
  float best = 1e9;
  float radius = 0.0;
  for (int i = 0, j = u_count - 1; i < 48; j = i++) {
    if (i >= u_count) break;
    vec2 a = u_hull[i], b = u_hull[j];
    if (((a.y > position.y) != (b.y > position.y)) &&
        (position.x < (b.x - a.x) * (position.y - a.y) / (b.y - a.y) + a.x)) inside = !inside;
    vec2 e = b - a;
    float h = clamp(dot(position - a, e) / max(dot(e, e), 1e-4), 0.0, 1.0);
    best = min(best, distance(position, a + e * h));
    radius = max(radius, distance(a, u_center));
  }
  if (!inside) discard;
  float edge = smoothstep(0.0, 5.0, best) * u_strength;
  vec2 d = position - u_center;
  vec2 q = d / max(radius, 1.0);
  const float facet = 3.14159265 / 4.0;
  float u = (asin(clamp(q.x, -0.999, 0.999)) - u_spin) / facet;
  float wave = sin(3.14159265 * u);
  float prism = sign(wave) * pow(abs(wave), 0.6);
  float crown = 1.0 - smoothstep(-0.25, 0.05, q.y);
  vec2 bend = vec2(prism * 0.12, mix(-0.08 * q.y, 0.09, crown)) * radius;
  float zoom = mix(0.84, 0.72, crown * (1.0 - smoothstep(0.2, 0.6, abs(q.x))));
  vec2 s = u_center + d * mix(1.0, zoom, edge) + bend * edge;
  // Into the glyph texture coordinates: it covers the whole canvas, without growth or shift.
  vec2 c = u_canvas * 0.5;
  vec2 t = (s - c) * u_textScale + c + vec2(u_textShift, 0);
  vec4 ink = texture(u_text, t / u_canvas);
  float mask = smoothstep(0.0, 1.0, best);
  fragColor = ink * u_opacity * mask;
}`;
//#endregion
//#region src/components/wallet/visual/gem/stars.ts
var BURST_LIFETIME = 6.4;
var STAR_VERTEX = `#version 300 es
precision highp float;
uniform mat4 u_projection;
uniform vec4 u_animation;   // burst age, time, burst, light background
uniform vec4 u_layout;      // pixels, steady star count, burst seed
uniform vec4 u_appearance;
uniform vec4 u_tint;        // y — visibility, z — the radius from which they show
uniform int u_baseInstance;
out vec2 v_uv;
flat out vec4 v_color;
flat out float v_halo;
#define PI 3.14159265358979

float starRandom(uint seed) {
  seed ^= seed >> 16u; seed *= 0x7feb352du;
  seed ^= seed >> 15u; seed *= 0x846ca68bu;
  seed ^= seed >> 16u;
  return float(seed & 0x00ffffffu) / 16777216.0;
}

void main() {
  vec2 corners[6] = vec2[6](vec2(-1, -1), vec2(1, -1), vec2(-1, 1), vec2(-1, 1), vec2(1, -1), vec2(1, 1));
  uint instance = uint(gl_InstanceID + u_baseInstance);
  uint seed = instance * 127u + 9137u;
  bool burst = instance >= uint(u_layout.z);
  if (burst) seed += uint(u_layout.w) * 104729u;
  float lifetime = mix(4.5, 7.5, starRandom(seed + 1u));
  float clock = u_animation.y + starRandom(seed + 2u) * lifetime;
  uint cycle = uint(floor(clock / lifetime));
  float age = mod(clock, lifetime);
  if (burst) {
    // A burst lives in real time: it flies apart at once and fades.
    lifetime = mix(1.2, 2.0, starRandom(seed + 1u));
    age = u_animation.x;
    cycle = 0u;
  }
  seed += cycle * 7919u;
  float progress = clamp(age / lifetime, 0.0, 1.0);
  float alive = float(age >= 0.0 && age < lifetime) * (burst ? u_animation.z : 1.0);
  float fadeIn = burst ? smoothstep(0.0, 0.03, age) : smoothstep(0.0, 0.10, progress);
  float fade = fadeIn * (1.0 - smoothstep(0.62, 1.0, progress)) * alive * u_tint.y;
  float depth = mix(0.60, 1.0, starRandom(seed + 3u));
  float sector = starRandom(seed + 4u);
  float spread = starRandom(seed + 14u);
  const float verticalSpread = 0.78;
  float lowerFan = atan(tan(-PI / 6.0) / verticalSpread);
  float elevation = sector < 0.85 ? mix(lowerFan, 0.34, spread) : mix(0.52, 1.40, spread);
  float side = starRandom(seed + 15u) < 0.5 ? -1.0 : 1.0;
  vec2 direction = vec2(side * cos(elevation), sin(elevation));
  float distance;
  if (burst) {
    float travel = max(age, 0.0);
    float index = float(instance - uint(u_layout.z));
    // Evenly in every direction and over the whole area (R2 sequences).
    float angle = 2.0 * PI * fract(0.5 + index * 0.75487767 + (starRandom(seed + 13u) - 0.5) * 0.04);
    direction = vec2(cos(angle), sin(angle));
    float fill = fract(0.5 + index * 0.56984029 + (starRandom(seed + 5u) - 0.5) * 0.06);
    float reach = 2.4 * sqrt(mix(0.08, 1.0, fill));
    distance = 0.04 + reach * (1.0 - exp(-travel / 0.22)) + 0.06 * travel;
  } else {
    distance = 0.32 + age * mix(0.38, 0.63, starRandom(seed + 5u));
  }
  float drift = sin(age * 0.85 + starRandom(seed + 6u) * 6.28) * (burst ? 0.02 : 0.16);
  vec2 center = direction * distance + vec2(-direction.y, direction.x) * drift;
  center *= vec2(1, verticalSpread) * (burst ? 1.0 : depth);
  center.y += -0.10 + (burst ? 0.0 : mix(-0.26, 0.24, starRandom(seed + 16u)) * depth);
  float breathPeriod = mix(2.0, 3.4, starRandom(seed + 24u));
  float breathWave = 0.5 - 0.5 * cos(age * (2.0 * PI / breathPeriod) + starRandom(seed + 25u) * 2.0 * PI);
  float shine = smoothstep(0.0, 1.0, fade) * mix(burst ? 0.7 : 0.12, 1.0, breathWave);
  float radius = 1.53 * mix(0.0228, 0.084, pow(starRandom(seed + 7u), 1.7)) * depth * mix(0.87, 1.0, shine);
  // Visible as soon as they come out from behind the gem.
  fade *= burst ? smoothstep(0.45 * u_tint.z, 0.7 * u_tint.z, length(center))
                : smoothstep(0.72 * u_tint.z, 1.02 * u_tint.z, length(center));
  float rotation = starRandom(seed + 8u) * 1.57 + age * mix(-0.20, 0.20, starRandom(seed + 9u));
  vec2 uv = corners[gl_VertexID] * 1.45;
  vec2 point = vec2(cos(rotation) * uv.x - sin(rotation) * uv.y, sin(rotation) * uv.x + cos(rotation) * uv.y) * radius;
  float choice = starRandom(seed + 10u);
  vec3 darkColor = choice < 0.22 ? vec3(0.045, 0.36, 1) : (choice < 0.50 ? vec3(0, 0.451, 1)
                 : (choice < 0.82 ? vec3(0, 0.639, 1) : vec3(0.145, 0.792, 1)));
  darkColor = mix(darkColor, vec3(0.247, 0.894, 1), smoothstep(0.12, 1.0, shine) * 0.30);
  vec3 lightColor = darkColor * 0.78;
  int appearance = int(u_appearance.x + 0.5);
  if (appearance == 1) { darkColor = vec3(1); lightColor = vec3(1); }
  gl_Position = u_projection * vec4(center + point, -1.6 - depth, 1);
  v_uv = uv;
  v_color = vec4(mix(darkColor, lightColor, u_animation.w),
                 fade * mix(0.52, 0.95, starRandom(seed + 11u)) * mix(0.80, 1.0, depth));
  v_halo = mix(0.075, 0.035, u_animation.w);
}`;
var STAR_FRAGMENT = `#version 300 es
precision highp float;
in vec2 v_uv;
flat in vec4 v_color;
flat in float v_halo;
out vec4 fragColor;
void main() {
  vec2 p = abs(v_uv);
  float d = sqrt(max(p.x, 0.00001)) + sqrt(max(p.y, 0.00001)) - 1.0;
  float aa = max(fwidth(d), 0.04);
  float core = 1.0 - smoothstep(-aa, aa, d);
  float glow = exp(-dot(v_uv, v_uv) * 4.5) * v_halo;
  float alpha = clamp(core + glow, 0.0, 1.0) * v_color.a;
  fragColor = vec4(v_color.rgb * alpha, alpha);
}`;
//#endregion
//#region src/components/wallet/visual/gem/stage.ts
var stage_exports = /* @__PURE__ */ __exportAll({
	Appearance: () => Appearance,
	GemPose: () => GemPose,
	GemView: () => GemView,
	defaultStyle: () => defaultStyle
});
var Appearance = {
	blue: 0,
	white: 1,
	cool: 2
};
function defaultStyle() {
	return {
		appearance: Appearance.blue,
		rotationSpeed: 0,
		sparkles: true,
		refraction: .72,
		brightness: 1,
		widthPoints: 20,
		dragGrow: 1,
		growDamping: .42,
		releaseDecay: 0,
		swayScale: 1,
		tilt: 0,
		lean: 0,
		leanFrequency: 10.5,
		leanDamping: .55,
		backgroundStars: false,
		starOpacity: 1,
		starZoom: 1,
		starEmission: 1,
		burstSize: 1,
		hideStone: false,
		lightBackground: false,
		verticalOffset: 0,
		floatAmplitude: 0,
		floatPeriod: 3.2
	};
}
var GemPose = class {
	constructor() {
		this.yaw = 0;
		this.pitch = REFERENCE_PITCH;
		this.grow = 1;
		this.time = 0;
	}
};
var stageInstance = null;
var stageUsers = 0;
/** The shared context. Created with the first gem, released with the last one. */
function acquireGemStage() {
	if (!stageInstance) stageInstance = new GemStage();
	++stageUsers;
	return stageInstance;
}
function releaseGemStage() {
	if (--stageUsers > 0 || !stageInstance) return;
	stageUsers = 0;
	stageInstance.destroy();
	stageInstance = null;
}
var GemStage = class {
	constructor() {
		const canvas = document.createElement("canvas");
		canvas.width = canvas.height = 256;
		const gl = getWebGL2Context(canvas, {
			alpha: true,
			premultipliedAlpha: true,
			antialias: true,
			depth: true,
			preserveDrawingBuffer: false,
			powerPreference: "high-performance"
		});
		this.canvas = canvas;
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
		const assets = gemAssets();
		this.assets = assets;
		const reference = rotation(REFERENCE_PITCH, 0);
		let width = 0, top = -Infinity;
		const v = assets.vertices;
		for (let i = 0; i < v.length; i += 10) {
			const p = cameraPoint(mat4.transformPoint(reference, [
				v[i],
				v[i + 1],
				v[i + 2]
			]));
			width = Math.max(width, Math.abs(p[0]));
			top = Math.max(top, p[1]);
		}
		this.facetProjection = [
			Math.cos(REFERENCE_PITCH),
			Math.sin(REFERENCE_PITCH),
			223.95 / width,
			top
		];
		this.diamond = createProgram(gl, DIAMOND_VERTEX, DIAMOND_FRAGMENT);
		this.sparkle = createProgram(gl, SPARKLE_VERTEX, SPARKLE_FRAGMENT);
		this.lens = createProgram(gl, LENS_VERTEX, LENS_FRAGMENT);
		this.star = createProgram(gl, STAR_VERTEX, STAR_FRAGMENT);
		this.du = uniformLocations(gl, this.diamond);
		this.su = uniformLocations(gl, this.sparkle);
		this.lu = uniformLocations(gl, this.lens);
		this.tu = uniformLocations(gl, this.star);
		this.vertexCount = v.length / 10;
		this.stoneVAO = gl.createVertexArray();
		gl.bindVertexArray(this.stoneVAO);
		const vb = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, vb);
		gl.bufferData(gl.ARRAY_BUFFER, v, gl.STATIC_DRAW);
		const stride = 40;
		gl.enableVertexAttribArray(0);
		gl.vertexAttribPointer(0, 3, gl.FLOAT, false, stride, 0);
		gl.enableVertexAttribArray(1);
		gl.vertexAttribPointer(1, 3, gl.FLOAT, false, stride, 12);
		gl.enableVertexAttribArray(2);
		gl.vertexAttribPointer(2, 4, gl.FLOAT, false, stride, 24);
		const sparkleVAO = (data) => {
			const vao = gl.createVertexArray();
			gl.bindVertexArray(vao);
			const b = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, b);
			gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
			gl.enableVertexAttribArray(0);
			gl.vertexAttribPointer(0, 4, gl.FLOAT, false, 20, 0);
			gl.enableVertexAttribArray(1);
			gl.vertexAttribPointer(1, 1, gl.FLOAT, false, 20, 16);
			return {
				vao,
				count: data.length / 5
			};
		};
		this.mainSparkle = sparkleVAO(assets.sparkles.main);
		this.smallSparkle = sparkleVAO(assets.sparkles.small);
		this.emptyVAO = gl.createVertexArray();
		gl.bindVertexArray(null);
		this.planes = new Float32Array(assets.planes.flat());
		this.anchorPositions = new Float32Array(assets.anchors.flatMap((a) => [...a.position, 1]));
		this.anchorNormals = new Float32Array(assets.anchors.flatMap((a) => [...a.normal, 0]));
		this.hull = /* @__PURE__ */ new Float32Array(96);
	}
	texture() {
		const gl = this.gl;
		const t = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, t);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, /* @__PURE__ */ new Uint8Array(4));
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		return t;
	}
	/** Draw the gem into the shared context and copy it into its canvas. */
	draw(view) {
		const gl = this.gl;
		const W = view.canvas.width, H = view.canvas.height;
		if (W < 1 || H < 1) return;
		if (this.canvas.width < W || this.canvas.height < H) {
			this.canvas.width = Math.max(this.canvas.width, W);
			this.canvas.height = Math.max(this.canvas.height, H);
		}
		const CH = this.canvas.height;
		gl.viewport(0, 0, W, H);
		gl.disable(gl.SCISSOR_TEST);
		gl.clearColor(0, 0, 0, 0);
		gl.clearDepth(1);
		gl.depthMask(true);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		gl.enable(gl.BLEND);
		gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
		const s = view.style, m = view.motion;
		const t = view.elapsed;
		const model = rotation(m.pitch, m.yaw + view.lean);
		const proj = projection(W / H, Math.min(2.4, Math.max(.05, m.zoom * view.zoom() * view.grow)));
		let shift = s.verticalOffset;
		if (s.floatAmplitude && s.floatPeriod > 0) shift += s.floatAmplitude * Math.sin(2 * Math.PI * t / s.floatPeriod);
		if (shift) {
			const dy = -2 * shift / view.cssSize;
			for (let column = 0; column < 4; ++column) proj[column * 4 + 1] += dy * proj[column * 4 + 3];
		}
		const sparkle = sparkleState(t);
		const ahead = 1 / 120;
		const next = m.clone();
		next.step(ahead, s.rotationSpeed, t + ahead);
		const dy = Math.atan2(Math.sin(next.yaw - m.yaw), Math.cos(next.yaw - m.yaw));
		const main = mainPlacement(model, Math.hypot(dy, next.pitch - m.pitch) / ahead);
		const light = lightState(t);
		if (s.backgroundStars && s.starOpacity > .001 && view.bursts.length) {
			gl.disable(gl.DEPTH_TEST);
			gl.disable(gl.CULL_FACE);
			gl.depthMask(false);
			gl.useProgram(this.star);
			const tu = this.tu;
			const stars = starProjection(W / H, Math.max(.2, s.starZoom));
			stars[13] -= 2 * s.verticalOffset / view.cssSize;
			gl.uniformMatrix4fv(tu.u_projection, false, stars);
			gl.uniform4f(tu.u_appearance, s.appearance, 0, 0, 0);
			gl.uniform4f(tu.u_tint, 0, Math.min(1, Math.max(0, s.starOpacity)), Math.max(.05, s.starEmission), 0);
			gl.uniform1i(tu.u_baseInstance, 240);
			gl.bindVertexArray(this.emptyVAO);
			const count = Math.max(1, Math.round(144 * Math.min(1, Math.max(0, s.burstSize))));
			for (const b of view.bursts) {
				const age = t - b.start;
				if (age < 0 || age >= 6.4) continue;
				gl.uniform4f(tu.u_animation, age, t, 1, s.lightBackground ? 1 : 0);
				gl.uniform4f(tu.u_layout, W, H, 240, b.seed);
				gl.drawArraysInstanced(gl.TRIANGLES, 0, 6, count);
			}
			gl.depthMask(true);
		}
		const setCommon = (u) => {
			gl.uniformMatrix4fv(u.u_model, false, model);
			gl.uniformMatrix4fv(u.u_projection, false, proj);
			if (u.u_inverseModel) gl.uniformMatrix4fv(u.u_inverseModel, false, mat4.transpose(model));
			gl.uniform4f(u.u_parameters, t, s.refraction, s.brightness, s.sparkles ? 1 : 0);
			if (u.u_viewport) gl.uniform4f(u.u_viewport, W, H, 17, 0);
			if (u.u_sparkleShape) gl.uniform4fv(u.u_sparkleShape, sparkle.shape);
			if (u.u_sparkleHalo) gl.uniform4f(u.u_sparkleHalo, sparkle.haloScale, main.faceRotation, 1, main.visibility);
			if (u.u_appearance) gl.uniform4f(u.u_appearance, s.appearance, 0, 0, 0);
		};
		if (!s.hideStone) {
			gl.useProgram(this.diamond);
			const du = this.du;
			setCommon(du);
			gl.uniform4fv(du.u_crownGradient, light.crown);
			gl.uniform4fv(du.u_pavilionGradient, light.pavilion);
			gl.uniform4fv(du.u_lightSweep, light.sweep);
			gl.uniform4fv(du.u_facetProjection, this.facetProjection);
			gl.uniform4fv(du.u_crownSweep, light.crownSweep);
			gl.uniform4fv(du.u_rightCrownSweep, light.rightCrownSweep);
			gl.uniform4fv(du.u_leftCrownSweep, light.leftCrownSweep);
			gl.uniform4fv(du.u_pavilionSweep, light.pavilionSweep);
			gl.uniform4fv(du.u_rightPavilionSweep, light.rightPavilionSweep);
			gl.uniform4fv(du.u_leftPavilionSweep, light.leftPavilionSweep);
			gl.uniform4fv(du["u_planes[0]"], this.planes);
			gl.enable(gl.DEPTH_TEST);
			gl.depthFunc(gl.LEQUAL);
			gl.enable(gl.CULL_FACE);
			gl.cullFace(gl.BACK);
			gl.frontFace(gl.CCW);
			gl.bindVertexArray(this.stoneVAO);
			gl.drawArrays(gl.TRIANGLES, 0, this.vertexCount);
			if (s.sparkles) {
				gl.disable(gl.DEPTH_TEST);
				gl.depthMask(false);
				gl.disable(gl.CULL_FACE);
				gl.useProgram(this.sparkle);
				const su = this.su;
				setCommon(su);
				gl.uniform4fv(su["u_anchorPosition[0]"], this.anchorPositions);
				gl.uniform4fv(su["u_anchorNormal[0]"], this.anchorNormals);
				gl.uniform1i(su.u_baseInstance, 0);
				gl.bindVertexArray(this.mainSparkle.vao);
				gl.drawArrays(gl.TRIANGLES, 0, this.mainSparkle.count);
				gl.uniform1i(su.u_baseInstance, 1);
				gl.bindVertexArray(this.smallSparkle.vao);
				gl.drawArraysInstanced(gl.TRIANGLES, 0, this.smallSparkle.count, 7);
			}
			const lens = view.lensState;
			if (lens && view.textTexture && lens.hull.length > 2 && lens.strength > .002) {
				gl.disable(gl.DEPTH_TEST);
				gl.disable(gl.CULL_FACE);
				gl.useProgram(this.lens);
				const lu = this.lu;
				const src = lens.hull, count = Math.min(48, src.length);
				this.hull.fill(0);
				for (let i = 0; i < count; i++) {
					const p = src[Math.floor(i * src.length / count)];
					this.hull[i * 2] = p[0];
					this.hull[i * 2 + 1] = p[1];
				}
				gl.uniform2fv(lu["u_hull[0]"], this.hull);
				gl.uniform1i(lu.u_count, count);
				gl.uniform2f(lu.u_center, lens.center[0], lens.center[1]);
				gl.uniform2f(lu.u_canvas, view.cssSize, view.cssSize);
				gl.uniform1f(lu.u_pixelRatio, W / view.cssSize);
				gl.uniform1f(lu.u_strength, Math.min(1, lens.strength));
				gl.uniform1f(lu.u_spin, lens.spin);
				gl.uniform1f(lu.u_textScale, lens.textScale);
				gl.uniform1f(lu.u_textShift, lens.textShift);
				gl.uniform1f(lu.u_opacity, (lens.opacity ?? .65) * Math.min(1, lens.strength));
				gl.activeTexture(gl.TEXTURE0);
				gl.bindTexture(gl.TEXTURE_2D, view.textTexture);
				gl.uniform1i(lu.u_text, 0);
				gl.bindVertexArray(this.emptyVAO);
				gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
			}
		}
		gl.bindVertexArray(null);
		const ctx = view.ctx;
		ctx.clearRect(0, 0, W, H);
		ctx.drawImage(this.canvas, 0, CH - H, W, H, 0, 0, W, H);
	}
	destroy() {
		loseContext(this.gl);
		this.gl = null;
		this.assets = null;
	}
};
/** One gem on the page. */
var GemView = class {
	/** Throws when WebGL2 is unavailable. */
	constructor(canvas, style = {}) {
		this.destroyed = false;
		this.tapStreak = 0;
		this.stage = acquireGemStage();
		this.canvas = canvas;
		this.ctx = canvas.getContext("2d");
		this.style = {
			...defaultStyle(),
			...style
		};
		this.motion = new GemMotion();
		this.pose = new GemPose();
		this.grow = 1;
		this.growVelocity = 0;
		this.lean = 0;
		this.leanVelocity = 0;
		this.elapsed = 0;
		this.lastTime = null;
		this.cssSize = 1;
		this.bursts = [];
		this.nextSeed = 1;
		this.lensState = null;
		this.textTexture = null;
	}
	/** The canvas is square: `size` — side in points, `pixelRatio` — pixels per point. */
	setSize(size, pixelRatio) {
		this.cssSize = size;
		const px = Math.max(1, Math.round(size * pixelRatio));
		if (this.canvas.width !== px || this.canvas.height !== px) {
			this.canvas.width = px;
			this.canvas.height = px;
		}
	}
	zoom() {
		return this.style.widthPoints * 1.52 / Math.max(this.cssSize, 1);
	}
	/** The amount's glyphs on the gem canvas — for their copy seen through it. */
	setText(source) {
		if (this.destroyed) return;
		const gl = this.stage.gl;
		if (!this.textTexture) this.textTexture = this.stage.texture();
		gl.bindTexture(gl.TEXTURE_2D, this.textTexture);
		gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
		gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
	}
	setLens(lens) {
		this.lensState = lens;
	}
	get isDragging() {
		return this.motion.isDragging;
	}
	beginDrag(time) {
		this.updateMotion(time);
		this.motion.begin(time);
	}
	drag(dx, dy, time) {
		this.updateMotion(time);
		this.motion.drag(dx, dy, this.dragScale || this.cssSize, time);
	}
	/**
	* Released. A fast throw spins the gem up, or pushes it by `releaseImpulse` rad/s when given; a tap
	* (`tapDirection`: −1 the left half, 1 the right one) spins it towards the tapped side.
	*/
	endDrag(velocityX, time, cancelled = false, tapDirection, releaseImpulse) {
		this.updateMotion(time);
		this.motion.step(0, this.style.rotationSpeed, this.elapsed);
		this.motion.end(time, cancelled);
		if (cancelled) return;
		if (tapDirection) this.tapSpin(tapDirection, time);
		else if (Math.abs(velocityX) > 600) {
			this.motion.fling(velocityX < 0 ? -1 : 1, releaseImpulse);
			this.burst();
		}
	}
	/**
	* A tap spins the gem (iOS InteractiveDiamondLayer.tapSpin): the way it already went, or towards the tapped
	* side; taps in a row speed it up, the fourth reaches the top speed with a burst of stars and a long fall-off.
	*/
	tapSpin(direction, time) {
		const current = this.motion.spinAtPress;
		const sign = Math.abs(current) > .5 ? Math.sign(current) : direction;
		const top = 16;
		this.tapStreak = this.lastTapTime !== void 0 && time - this.lastTapTime < 1 ? this.tapStreak + 1 : 1;
		this.lastTapTime = time;
		const speed = Math.min(top, Math.max(Math.abs(current) + 5, top * this.tapStreak / 4));
		const reachedTop = speed >= top * .95;
		if (reachedTop) this.tapStreak = 0;
		this.motion.setSpin(sign * speed, reachedTop ? 2.5 : Math.max(this.style.releaseDecay, .05));
		if (reachedTop) this.burst();
	}
	/** A spin push: rad/s and the time it takes to fall off by e. Pushes add up. */
	kick(velocity, decay = .7) {
		this.motion.spin(velocity, decay);
	}
	/** A new star burst. */
	burst() {
		if (this.bursts.length >= 3) this.bursts.shift();
		this.bursts.push({
			start: this.elapsed,
			seed: this.nextSeed
		});
		this.nextSeed = (this.nextSeed + 1) % 65536;
	}
	/**
	* Take another gem's pose — with no jump of the facets. Its motion, springs
	* and sparkle clock too: the gem continues instead of starting over.
	*/
	adopt(other) {
		this.motion = other.motion.clone();
		this.elapsed = other.elapsed;
		this.lean = other.lean;
		this.leanVelocity = other.leanVelocity;
		this.lastTime = other.lastTime;
	}
	resetClock() {
		this.lastTime = null;
	}
	updateMotion(time) {
		const s = this.style;
		if (this.lastTime === null && this.elapsed === 0) {
			this.lean = s.lean;
			this.leanVelocity = 0;
		}
		const dt = this.lastTime === null ? 0 : Math.min(Math.max(0, time - this.lastTime), .05);
		this.lastTime = time;
		this.elapsed += dt;
		const m = this.motion;
		m.swayScale = s.swayScale;
		m.tilt = s.tilt;
		m.releaseDecay = s.releaseDecay;
		const growTarget = m.isDragging ? s.dragGrow : 1;
		let rest = dt;
		while (rest > 0) {
			const h = Math.min(rest, 1 / 240);
			this.growVelocity += ((growTarget - this.grow) * 196 - 2 * s.growDamping * 14 * this.growVelocity) * h;
			this.grow += this.growVelocity * h;
			const w = s.leanFrequency;
			if (w > 0) {
				this.leanVelocity += ((s.lean - this.lean) * w * w - 2 * s.leanDamping * w * this.leanVelocity) * h;
				this.lean += this.leanVelocity * h;
			} else {
				this.lean = s.lean;
				this.leanVelocity = 0;
			}
			rest -= h;
		}
		this.bursts = this.bursts.filter((b) => this.elapsed - b.start < BURST_LIFETIME);
		m.step(dt, s.rotationSpeed, this.elapsed);
		this.pose.yaw = m.yaw + this.lean;
		this.pose.pitch = m.pitch;
		this.pose.grow = this.grow;
		this.pose.time = this.elapsed;
	}
	render(time) {
		if (this.destroyed) return;
		this.updateMotion(time);
		this.stage.draw(this);
	}
	/** Frees the gem's texture and its share of the common context. */
	destroy() {
		if (this.destroyed) return;
		this.destroyed = true;
		if (this.textTexture) this.stage.gl.deleteTexture(this.textTexture);
		this.textTexture = null;
		this.lensState = null;
		this.bursts = [];
		this.stage = null;
		releaseGemStage();
	}
};
//#endregion
export { easing as i, GemView as n, stage_exports as r, Appearance as t };
