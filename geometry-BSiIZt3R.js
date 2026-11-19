//# allFunctionsCalledOnLoad
//#region src/components/wallet/visual/math.ts
var v3 = {
	add: (a, b) => [
		a[0] + b[0],
		a[1] + b[1],
		a[2] + b[2]
	],
	sub: (a, b) => [
		a[0] - b[0],
		a[1] - b[1],
		a[2] - b[2]
	],
	scale: (a, k) => [
		a[0] * k,
		a[1] * k,
		a[2] * k
	],
	dot: (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2],
	cross: (a, b) => [
		a[1] * b[2] - a[2] * b[1],
		a[2] * b[0] - a[0] * b[2],
		a[0] * b[1] - a[1] * b[0]
	],
	length: (a) => Math.hypot(a[0], a[1], a[2]),
	normalize: (a) => {
		const l = Math.hypot(a[0], a[1], a[2]) || 1;
		return [
			a[0] / l,
			a[1] / l,
			a[2] / l
		];
	},
	dist2: (a, b) => (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2,
	mix: (a, b, t) => [
		a[0] + (b[0] - a[0]) * t,
		a[1] + (b[1] - a[1]) * t,
		a[2] + (b[2] - a[2]) * t
	]
};
var mat4 = {
	identity: () => new Float32Array([
		1,
		0,
		0,
		0,
		0,
		1,
		0,
		0,
		0,
		0,
		1,
		0,
		0,
		0,
		0,
		1
	]),
	mul(a, b) {
		const o = /* @__PURE__ */ new Float32Array(16);
		for (let c = 0; c < 4; c++) for (let r = 0; r < 4; r++) {
			let s = 0;
			for (let k = 0; k < 4; k++) s += a[k * 4 + r] * b[c * 4 + k];
			o[c * 4 + r] = s;
		}
		return o;
	},
	transpose(a) {
		const o = /* @__PURE__ */ new Float32Array(16);
		for (let c = 0; c < 4; c++) for (let r = 0; r < 4; r++) o[c * 4 + r] = a[r * 4 + c];
		return o;
	},
	rotationX(a) {
		const c = Math.cos(a), s = Math.sin(a);
		return new Float32Array([
			1,
			0,
			0,
			0,
			0,
			c,
			s,
			0,
			0,
			-s,
			c,
			0,
			0,
			0,
			0,
			1
		]);
	},
	rotationY(a) {
		const c = Math.cos(a), s = Math.sin(a);
		return new Float32Array([
			c,
			0,
			-s,
			0,
			0,
			1,
			0,
			0,
			s,
			0,
			c,
			0,
			0,
			0,
			0,
			1
		]);
	},
	transformPoint(m, p) {
		return [
			m[0] * p[0] + m[4] * p[1] + m[8] * p[2] + m[12],
			m[1] * p[0] + m[5] * p[1] + m[9] * p[2] + m[13],
			m[2] * p[0] + m[6] * p[1] + m[10] * p[2] + m[14]
		];
	},
	transformDirection(m, d) {
		return [
			m[0] * d[0] + m[4] * d[1] + m[8] * d[2],
			m[1] * d[0] + m[5] * d[1] + m[9] * d[2],
			m[2] * d[0] + m[6] * d[1] + m[10] * d[2]
		];
	}
};
var ca = {
	identity: () => [
		1,
		0,
		0,
		0,
		0,
		1,
		0,
		0,
		0,
		0,
		1,
		0,
		0,
		0,
		0,
		1
	],
	concat(a, b) {
		const o = new Array(16);
		for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) {
			let s = 0;
			for (let k = 0; k < 4; k++) s += a[r * 4 + k] * b[k * 4 + c];
			o[r * 4 + c] = s;
		}
		return o;
	},
	translation: (x, y, z = 0) => [
		1,
		0,
		0,
		0,
		0,
		1,
		0,
		0,
		0,
		0,
		1,
		0,
		x,
		y,
		z,
		1
	],
	scaling: (x, y, z = 1) => [
		x,
		0,
		0,
		0,
		0,
		y,
		0,
		0,
		0,
		0,
		z,
		0,
		0,
		0,
		0,
		1
	],
	rotation(angle, x, y, z) {
		const c = Math.cos(angle), s = Math.sin(angle), t = 1 - c;
		return [
			t * x * x + c,
			t * x * y + z * s,
			t * x * z - y * s,
			0,
			t * x * y - z * s,
			t * y * y + c,
			t * y * z + x * s,
			0,
			t * x * z + y * s,
			t * y * z - x * s,
			t * z * z + c,
			0,
			0,
			0,
			0,
			1
		];
	},
	translate(m, x, y, z = 0) {
		return ca.concat(ca.translation(x, y, z), m);
	},
	scale(m, x, y, z = 1) {
		return ca.concat(ca.scaling(x, y, z), m);
	},
	rotate(m, angle, x, y, z) {
		return ca.concat(ca.rotation(angle, x, y, z), m);
	},
	css: (m) => `matrix3d(${m.map((v) => +v.toFixed(7)).join(",")})`
};
var clamp = (v, limit) => Math.max(-limit, Math.min(limit, v));
var clamp01 = (v) => Math.max(0, Math.min(1, v));
//#endregion
//#region src/components/wallet/visual/gem/geometry.ts
var ROUNDING = .055;
var CROWN_ROUNDING = .32865;
var GIRDLE_ROUNDING = .073114;
var OUTLINE_BOW = .106987;
var REFERENCE_PITCH = -.104458;
var CAMERA_SCALE = .948985;
function cameraW(z) {
	return (1 - z / 6) / CAMERA_SCALE;
}
function cameraPoint(p) {
	const w = cameraW(p[2]);
	return [p[0] / w, p[1] / w];
}
function cameraRay(x, y) {
	return {
		origin: [
			0,
			0,
			6
		],
		direction: v3.normalize([
			x / CAMERA_SCALE,
			y / CAMERA_SCALE,
			-6
		])
	};
}
/** Rotation: around the gem's own vertical axis, then the whole gem is tilted. */
function rotation(pitch, yaw) {
	return mat4.mul(mat4.rotationX(pitch), mat4.rotationY(yaw));
}
/** The gem's projection, column-major as on iOS (depth in [0, 1] fits GL too). */
function projection(aspect, zoom) {
	const halfHeight = 1.52 / zoom * Math.max(1, 1 / Math.max(aspect, .01));
	const halfWidth = halfHeight * aspect;
	const w0 = 1 / CAMERA_SCALE, wz = -1.0537574355759047 / 6;
	const framing = .12 / halfHeight;
	return new Float32Array([
		1 / halfWidth,
		0,
		0,
		0,
		0,
		1 / halfHeight,
		0,
		0,
		0,
		framing * wz,
		-1.0537574355759047 / 6,
		wz,
		0,
		framing * w0,
		.5 * w0,
		w0
	]);
}
/** Projection of the stars around the gem — no perspective, the field keeps the screen layout. */
function starProjection(aspect, zoom) {
	const halfHeight = 1.52 / zoom * Math.max(1, 1 / Math.max(aspect, .01));
	const halfWidth = halfHeight * aspect;
	return new Float32Array([
		1 / halfWidth,
		0,
		0,
		0,
		0,
		1 / halfHeight,
		0,
		0,
		0,
		0,
		-1 / 12,
		0,
		0,
		.12 / halfHeight,
		.5,
		1
	]);
}
function opticalPlanes() {
	const girdle = [
		[.70024, 1],
		[1, .70024],
		[1, -.70024],
		[.70024, -1],
		[-.70024, -1],
		[-1, -.70024],
		[-1, .70024],
		[-.70024, 1]
	];
	const table = [
		[.498552, .631807],
		[.631807, .498552],
		[.631807, -.498552],
		[.498552, -.631807],
		[-.498552, -.631807],
		[-.631807, -.498552],
		[-.631807, .498552],
		[-.498552, .631807]
	];
	const rings = [
		[
			.965,
			.583526,
			true
		],
		[
			1,
			.571526,
			true
		],
		[
			.99,
			-.081806,
			false
		],
		[
			1,
			-.112806,
			false
		],
		[
			.978,
			-.151806,
			false
		],
		[
			.025,
			-1.07157,
			false
		],
		[
			.009,
			-1.08757,
			false
		]
	].map(([scale, y, isTable]) => (isTable ? table : girdle).map((o) => [
		o[0] * scale,
		y,
		o[1] * scale
	]));
	const planes = [];
	const f = Math.fround;
	function face(points, kind) {
		const p = points;
		let n = v3.normalize(v3.cross(v3.sub(p[1], p[0]), v3.sub(p[2], p[0])));
		const center = v3.scale(p.reduce((a, b) => v3.add(a, b), [
			0,
			0,
			0
		]), 1 / p.length);
		if (v3.dot(n, v3.sub(center, [
			0,
			-.12,
			0
		])) < 0) n = v3.scale(n, -1);
		if (kind !== 3) planes.push([
			f(n[0]),
			f(n[1]),
			f(n[2]),
			f(-v3.dot(n, p[0]))
		]);
	}
	face(rings[0], 0);
	for (let band = 0; band < rings.length - 1; band++) for (let i = 0; i < 8; i++) {
		const next = (i + 1) % 8;
		face([
			rings[band][i],
			rings[band + 1][i],
			rings[band + 1][next],
			rings[band][next]
		], band === 1 ? 1 : band === 4 ? 2 : 3);
	}
	return planes;
}
/**
* Roundings of varying width with spherical ends: broad crown shoulders, a
* narrow tip. Returns a flat array of triangle vertices.
*/
function roundedMesh(planes, radius, segments = 12) {
	const normals = planes.map((p) => [
		p[0],
		p[1],
		p[2]
	]);
	const materials = planes.map((_, i) => i === 0 ? [
		1,
		0,
		0
	] : i <= 8 ? [
		0,
		1,
		0
	] : [
		0,
		0,
		1
	]);
	const offsets = planes.map((p) => p[3] + radius);
	const incidenceTolerance = 2e-6;
	const corners = [];
	const P = planes.length;
	for (let a = 0; a < P - 2; a++) for (let b = a + 1; b < P - 1; b++) for (let c = b + 1; c < P; c++) {
		const na = normals[a], nb = normals[b], nc = normals[c];
		const det = v3.dot(na, v3.cross(nb, nc));
		if (Math.abs(det) < 1e-8) continue;
		const point = v3.scale(v3.add(v3.add(v3.scale(v3.cross(nb, nc), -offsets[a]), v3.scale(v3.cross(nc, na), -offsets[b])), v3.scale(v3.cross(na, nb), -offsets[c])), 1 / det);
		let ok = true;
		for (let i = 0; i < P; i++) if (v3.dot(normals[i], point) + offsets[i] >= 2e-7) {
			ok = false;
			break;
		}
		if (!ok) continue;
		if (!corners.some((q) => v3.dist2(q, point) < 1e-10)) corners.push(point);
	}
	const sharpPoints = [], insetDirections = [];
	for (const corner of corners) {
		const incident = [];
		for (let i = 0; i < P; i++) if (Math.abs(v3.dot(normals[i], corner) + offsets[i]) < incidenceTolerance) incident.push(i);
		let inset = [
			0,
			0,
			0
		];
		outer: for (let a = 0; a < incident.length - 2; a++) for (let b = a + 1; b < incident.length - 1; b++) for (let c = b + 1; c < incident.length; c++) {
			const na = normals[incident[a]], nb = normals[incident[b]], nc = normals[incident[c]];
			const det = v3.dot(na, v3.cross(nb, nc));
			if (Math.abs(det) < 1e-8) continue;
			inset = v3.scale(v3.add(v3.add(v3.cross(nb, nc), v3.cross(nc, na)), v3.cross(na, nb)), 1 / det);
			break outer;
		}
		sharpPoints.push(v3.add(corner, v3.scale(inset, radius)));
		insetDirections.push(inset);
	}
	const radiusScale = radius / ROUNDING;
	const radii = sharpPoints.map((p) => p[1] > .4 ? Math.min(CROWN_ROUNDING * radiusScale, .34) : p[1] > -.5 ? GIRDLE_ROUNDING * radiusScale : radius);
	const points = sharpPoints.map((p, i) => v3.sub(p, v3.scale(insetDirections[i], radii[i])));
	function cyclicOrder(indices, values, normal) {
		const center = v3.scale(indices.reduce((s, i) => v3.add(s, values[i]), [
			0,
			0,
			0
		]), 1 / indices.length);
		const axis = Math.abs(normal[1]) < .9 ? [
			0,
			1,
			0
		] : [
			1,
			0,
			0
		];
		const u = v3.normalize(v3.cross(axis, normal)), v = v3.cross(normal, u);
		const angle = (i) => {
			const d = v3.sub(values[i], center);
			return Math.atan2(v3.dot(d, v), v3.dot(d, u));
		};
		return indices.slice().sort((a, b) => angle(a) - angle(b));
	}
	const key = (a, b) => a < b ? `${a},${b}` : `${b},${a}`;
	const faces = planes.map(() => []);
	const incidentFaces = corners.map(() => []);
	const edgeFaces = /* @__PURE__ */ new Map();
	for (let face = 0; face < P; face++) {
		const idx = [];
		for (let i = 0; i < corners.length; i++) if (Math.abs(v3.dot(normals[face], corners[i]) + offsets[face]) < incidenceTolerance) idx.push(i);
		if (idx.length < 3) continue;
		faces[face] = cyclicOrder(idx, corners, normals[face]);
		for (let i = 0; i < faces[face].length; i++) {
			const a = faces[face][i], b = faces[face][(i + 1) % faces[face].length];
			incidentFaces[a].push(face);
			const k = key(a, b);
			if (!edgeFaces.has(k)) edgeFaces.set(k, {
				a: Math.min(a, b),
				b: Math.max(a, b),
				faces: []
			});
			edgeFaces.get(k).faces.push(face);
		}
	}
	function blendNormal(a, b, step, count) {
		if (step === 0) return a;
		if (step === count) return b;
		const t = step / count;
		return v3.normalize(v3.add(v3.scale(a, 1 - t), v3.scale(b, t)));
	}
	function blend(a, b, step, count) {
		const t = step / count;
		return {
			normal: blendNormal(a.normal, b.normal, step, count),
			material: v3.add(v3.scale(a.material, 1 - t), v3.scale(b.material, t))
		};
	}
	const arcs = /* @__PURE__ */ new Map();
	for (const e of edgeFaces.values()) {
		const fa = Math.min(e.faces[0], e.faces[1]), fb = Math.max(e.faces[0], e.faces[1]);
		const a = {
			normal: normals[fa],
			material: materials[fa]
		};
		const b = {
			normal: normals[fb],
			material: materials[fb]
		};
		const arc = [];
		for (let s = 0; s <= segments; s++) arc.push(blend(a, b, s, segments));
		arcs.set(key(fa, fb), arc);
	}
	const out = [];
	const vertex = (p, n, kind, sector = 0, mx = 0, my = 0) => [
		p[0],
		p[1],
		p[2],
		n[0],
		n[1],
		n[2],
		mx,
		my,
		kind,
		sector
	];
	const roundedVertex = (i, s) => vertex(v3.add(points[i], v3.scale(s.normal, radii[i])), s.normal, 3, 0, s.material[0], s.material[1]);
	const pos = (v) => [
		v[0],
		v[1],
		v[2]
	];
	function triangle(a, b, c) {
		const pa = pos(a), pb = pos(b), pc = pos(c);
		const cross = v3.cross(v3.sub(pb, pa), v3.sub(pc, pa));
		const outward = v3.sub(v3.scale(v3.add(v3.add(pa, pb), pc), 1 / 3), [
			0,
			-.12,
			0
		]);
		if (v3.dot(cross, outward) > 0) out.push(a, b, c);
		else out.push(a, c, b);
	}
	const quad = (a, b, c, d) => {
		triangle(a, b, c);
		triangle(a, c, d);
	};
	const edgeRows = /* @__PURE__ */ new Map();
	const sortedEdges = [...edgeFaces.values()].sort((x, y) => x.a === y.a ? x.b - y.b : x.a - y.a);
	for (const edge of sortedEdges) {
		const arc = arcs.get(key(edge.faces[0], edge.faces[1]));
		const A = edge.a, B = edge.b;
		const steps = Math.max(1, Math.ceil(Math.sqrt(v3.dist2(sharpPoints[A], sharpPoints[B])) / .1));
		const rows = [];
		for (let row = 0; row <= steps; row++) {
			if (row === 0) {
				rows.push(arc.map((s) => roundedVertex(A, s)));
				continue;
			}
			if (row === steps) {
				rows.push(arc.map((s) => roundedVertex(B, s)));
				continue;
			}
			const t = row / steps;
			const smooth = t * t * (3 - 2 * t);
			const r = radii[A] + (radii[B] - radii[A]) * smooth;
			const dr = (radii[B] - radii[A]) * 6 * t * (1 - t);
			const inset = v3.mix(insetDirections[A], insetDirections[B], t);
			const center = v3.sub(v3.mix(sharpPoints[A], sharpPoints[B], t), v3.scale(inset, r));
			const tangent = v3.sub(v3.sub(v3.sub(sharpPoints[B], sharpPoints[A]), v3.scale(v3.sub(insetDirections[B], insetDirections[A]), r)), v3.scale(inset, dr));
			const axis = v3.normalize(v3.cross(arc[0].normal, arc[arc.length - 1].normal));
			rows.push(arc.map((s, index) => {
				const along = v3.add(tangent, v3.scale(s.normal, dr));
				const across = v3.cross(axis, s.normal);
				let normal = v3.normalize(v3.cross(along, across));
				if (v3.dot(normal, s.normal) < 0) normal = v3.scale(normal, -1);
				if (index === 0 || index === segments) normal = s.normal;
				return vertex(v3.add(center, v3.scale(s.normal, r)), normal, 3, 0, s.material[0], s.material[1]);
			}));
		}
		edgeRows.set(key(A, B), rows);
		for (let row = 0; row < steps; row++) for (let i = 0; i < segments; i++) quad(rows[row][i], rows[row + 1][i], rows[row + 1][i + 1], rows[row][i + 1]);
	}
	for (let face = 0; face < P; face++) {
		const cyc = faces[face];
		if (cyc.length < 3) continue;
		const n = normals[face];
		const kind = face === 0 ? 0 : face <= 8 ? 1 : 2;
		const rim = [];
		for (let i = 0; i < cyc.length; i++) {
			const a = cyc[i], b = cyc[(i + 1) % cyc.length];
			const e = edgeFaces.get(key(a, b));
			const arcIndex = face === Math.min(e.faces[0], e.faces[1]) ? 0 : segments;
			const rows = edgeRows.get(key(a, b));
			const ordered = a < b ? rows : rows.slice().reverse();
			for (let r = 0; r < ordered.length - 1; r++) rim.push(vertex(pos(ordered[r][arcIndex]), n, kind, (face - 1) % 8));
		}
		const middle = vertex(v3.scale(rim.reduce((s, v) => v3.add(s, pos(v)), [
			0,
			0,
			0
		]), 1 / rim.length), n, kind);
		for (let i = 0; i < rim.length; i++) triangle(middle, rim[i], rim[(i + 1) % rim.length]);
	}
	const radialSteps = 5;
	for (let corner = 0; corner < points.length; corner++) {
		const incident = incidentFaces[corner];
		if (incident.length < 3) continue;
		const centerNormal = v3.normalize(incident.reduce((s, f) => v3.add(s, normals[f]), [
			0,
			0,
			0
		]));
		const centerSample = {
			normal: centerNormal,
			material: v3.scale(incident.reduce((s, f) => v3.add(s, materials[f]), [
				0,
				0,
				0
			]), 1 / incident.length)
		};
		const ordered = cyclicOrder(incident, normals, centerNormal);
		const middle = roundedVertex(corner, centerSample);
		for (let i = 0; i < ordered.length; i++) {
			const a = ordered[i], b = ordered[(i + 1) % ordered.length];
			const samples = arcs.get(key(a, b));
			const arc = a < b ? samples : samples.slice().reverse();
			for (let j = 0; j < segments; j++) {
				const sample = (side, row) => roundedVertex(corner, blend(centerSample, arc[j + side], row, radialSteps));
				triangle(middle, sample(0, 1), sample(1, 1));
				for (let row = 1; row < radialSteps; row++) quad(sample(0, row), sample(1, row), sample(1, row + 1), sample(0, row + 1));
			}
		}
	}
	const bow = OUTLINE_BOW;
	const data = new Float32Array(out.length * 10);
	for (let i = 0; i < out.length; i++) {
		const v = out[i];
		const x = v[0], z = v[2];
		const a = 1 - bow * z * z, b = 1 - bow * x * x, c = -2 * bow * x * z;
		const det = a * b - c * c;
		const n = v3.normalize([
			(b * v[3] - c * v[5]) / det,
			v[4],
			(a * v[5] - c * v[3]) / det
		]);
		data.set([
			x * a,
			v[1],
			z * b,
			n[0],
			n[1],
			n[2],
			v[6],
			v[7],
			v[8],
			v[9]
		], i * 10);
	}
	return data;
}
function intersect(vertices, origin, direction) {
	let nearest = Infinity, result = null;
	const F = 10;
	for (let i = 0; i < vertices.length; i += 30) {
		const a = [
			vertices[i],
			vertices[i + 1],
			vertices[i + 2]
		];
		const b = [
			vertices[i + F],
			vertices[i + F + 1],
			vertices[i + F + 2]
		];
		const c = [
			vertices[i + 20],
			vertices[i + 20 + 1],
			vertices[i + 20 + 2]
		];
		const e1 = v3.sub(b, a), e2 = v3.sub(c, a);
		const cr = v3.cross(direction, e2);
		const det = v3.dot(e1, cr);
		if (Math.abs(det) < 1e-10) continue;
		const off = v3.sub(origin, a);
		const u = v3.dot(off, cr) / det;
		const q = v3.cross(off, e1);
		const v = v3.dot(direction, q) / det;
		const dist = v3.dot(e2, q) / det;
		if (u < -1e-5 || v < -1e-5 || u + v > 1.00001 || dist <= 0 || dist >= nearest) continue;
		nearest = dist;
		const na = [
			vertices[i + 3],
			vertices[i + 4],
			vertices[i + 5]
		];
		const nb = [
			vertices[i + F + 3],
			vertices[i + F + 4],
			vertices[i + F + 5]
		];
		const nc = [
			vertices[i + 20 + 3],
			vertices[i + 20 + 4],
			vertices[i + 20 + 5]
		];
		const normal = v3.normalize(v3.add(v3.add(v3.scale(na, 1 - u - v), v3.scale(nb, u)), v3.scale(nc, v)));
		result = {
			position: v3.add(origin, v3.scale(direction, dist)),
			normal
		};
	}
	return result;
}
/**
* Eight sparkle anchors on the rounded mesh: the main one follows the drawn
* Lottie frame, the rest are rays out of the gem's axis.
*/
function sparkleAnchors(vertices) {
	const reference = rotation(REFERENCE_PITCH, 0);
	let halfWidth = 0, top = -Infinity;
	for (let i = 0; i < vertices.length; i += 10) {
		const p = cameraPoint(mat4.transformPoint(reference, [
			vertices[i],
			vertices[i + 1],
			vertices[i + 2]
		]));
		halfWidth = Math.max(halfWidth, Math.abs(p[0]));
		top = Math.max(top, p[1]);
	}
	const anchors = [];
	for (let instance = 0; instance < 8; instance++) {
		if (instance === 0) {
			const scale = halfWidth / (447.9 * .75 / 2);
			const ray = cameraRay(42.375 * scale, top - 105.075 * scale);
			const inv = mat4.transpose(reference);
			const p = mat4.transformPoint(inv, ray.origin);
			const d = mat4.transformDirection(inv, ray.direction);
			anchors.push(intersect(vertices, p, d));
			continue;
		}
		const angle = instance * Math.PI / 4 + Math.PI / 8;
		const height = instance % 3 === 0 ? .56 : instance % 3 === 1 ? -.02 : -.54;
		anchors.push(intersect(vertices, [
			0,
			height,
			0
		], [
			Math.sin(angle),
			0,
			Math.cos(angle)
		]));
	}
	return anchors;
}
var O = (vertices, incoming, outgoing) => ({
	vertices,
	incoming,
	outgoing
});
var coreWide = O([
	[1.3, -80.9],
	[17.6, -39.5],
	[38.9, -20.7],
	[80.3, -3.1],
	[38.9, 15.7],
	[17.6, 37],
	[0, 80.9],
	[-17.6, 37],
	[-38.9, 15.7],
	[-80.3, -3.1],
	[-38.9, -20.7],
	[-16.3, -40.8]
], [
	[-6.3, 0],
	[-6.3, -15.1],
	[-11.3, -3.8],
	[0, -6.3],
	[13.8, -5],
	[5, -11.3],
	[6.3, 0],
	[6.3, 16.3],
	[11.3, 3.8],
	[0, 7.5],
	[-15.1, 5],
	[-5, 11.3]
], [
	[5, 0],
	[3.8, 10],
	[13.8, 5],
	[0, 7.5],
	[-11.3, 3.8],
	[-6.3, 16.3],
	[-6.3, 0],
	[-3.8, -11.3],
	[-16.3, -6.3],
	[0, -6.3],
	[11.3, -3.8],
	[6.3, -16.3]
]);
var coreNarrow = O([
	[1.3, -80.9],
	[9, -23],
	[20.8, -12.6],
	[80.3, -3.1],
	[20.8, 7.6],
	[9, 19.4],
	[0, 80.9],
	[-10.5, 19.4],
	[-22.3, 7.6],
	[-80.3, -3.1],
	[-22.3, -12.6],
	[-9.8, -23.7]
], [
	[-6.3, 0],
	[-3.5, -8.4],
	[-6.3, -2.1],
	[0, -6.3],
	[7.7, -2.8],
	[2.8, -6.3],
	[6.3, 0],
	[3.5, 9.1],
	[6.3, 2.1],
	[0, 7.5],
	[-8.4, 2.8],
	[-2.8, 6.3]
], [
	[5, 0],
	[2.1, 5.6],
	[7.7, 2.8],
	[0, 7.5],
	[-6.3, 2.1],
	[-3.5, 9.1],
	[-6.3, 0],
	[-2.1, -6.3],
	[-9.1, -3.5],
	[0, -6.3],
	[6.3, -2.1],
	[3.5, -9.1]
]);
var haloWide = O([
	[1.8, -113.5],
	[24.6, -55.4],
	[54.6, -29],
	[112.7, -4.4],
	[54.6, 22],
	[24.6, 51.9],
	[0, 113.5],
	[-24.6, 51.9],
	[-54.6, 22],
	[-112.7, -4.4],
	[-54.6, -29],
	[-22.9, -57.2]
], [
	[-8.8, 0],
	[-8.8, -21.1],
	[-15.8, -5.3],
	[0, -8.8],
	[19.4, -7],
	[7, -15.8],
	[8.8, 0],
	[8.8, 22.9],
	[15.8, 5.3],
	[0, 10.6],
	[-21.1, 7],
	[-7, 15.8]
], [
	[7, 0],
	[5.3, 14.1],
	[19.4, 7],
	[0, 10.6],
	[-15.8, 5.3],
	[-8.8, 22.9],
	[-8.8, 0],
	[-5.3, -15.8],
	[-22.9, -8.8],
	[0, -8.8],
	[15.8, -5.3],
	[8.8, -22.9]
]);
var haloNarrow = O([
	[1.8, -113.5],
	[12.9, -32],
	[29.5, -17.3],
	[112.7, -4.4],
	[29.5, 11],
	[12.9, 27.7],
	[0, 113.5],
	[-14.5, 27.7],
	[-31.1, 11],
	[-112.7, -4.4],
	[-31.1, -17.3],
	[-13.5, -32.9]
], [
	[-8.8, 0],
	[-4.9, -11.7],
	[-8.8, -2.9],
	[0, -8.8],
	[10.7, -3.9],
	[3.9, -8.8],
	[8.8, 0],
	[4.9, 12.7],
	[8.8, 2.9],
	[0, 10.6],
	[-11.7, 3.9],
	[-3.9, 8.8]
], [
	[7, 0],
	[2.9, 7.8],
	[10.7, 3.9],
	[0, 10.6],
	[-8.8, 2.9],
	[-4.9, 12.7],
	[-8.8, 0],
	[-2.9, -8.8],
	[-12.7, -4.9],
	[0, -8.8],
	[8.8, -2.9],
	[4.9, -12.7]
]);
var circle = O([
	[108.5, 0],
	[0, 108.5],
	[-108.5, 0],
	[0, -108.5]
], [
	[0, -59.9],
	[59.9, 0],
	[0, 59.9],
	[-59.9, 0]
], [
	[0, 59.9],
	[-59.9, 0],
	[0, -59.9],
	[59.9, 0]
]);
var smallCore = O([
	[0, -53.2],
	[53.2, 0],
	[0, 53.2],
	[-53.2, 0]
], [
	[-3.1, 50.4],
	[-50.8, -2.9],
	[2.1, -49.7],
	[50.1, 3.5]
], [
	[2.5, 50.2],
	[-50.8, 3.5],
	[-3.1, -49.7],
	[50.1, -2.7]
]);
function sampleOutline(o, i, t) {
	const j = (i + 1) % o.vertices.length;
	const a = o.vertices[i], d = o.vertices[j];
	const b = [a[0] + o.outgoing[i][0], a[1] + o.outgoing[i][1]];
	const c = [d[0] + o.incoming[j][0], d[1] + o.incoming[j][1]];
	const s = 1 - t;
	const k0 = s * s * s, k1 = 3 * s * s * t, k2 = 3 * s * t * t, k3 = t * t * t;
	return [a[0] * k0 + b[0] * k1 + c[0] * k2 + d[0] * k3, a[1] * k0 + b[1] * k1 + c[1] * k2 + d[1] * k3];
}
function tessellate(wide, narrow, layer, out) {
	for (let seg = 0; seg < wide.vertices.length; seg++) for (let step = 0; step < 16; step++) for (const t of [
		-1,
		step / 16,
		(step + 1) / 16
	]) {
		const a = t < 0 ? [0, 0] : sampleOutline(wide, seg, t);
		const b = t < 0 ? [0, 0] : sampleOutline(narrow, seg, t);
		out.push(a[0], a[1], b[0], b[1], layer);
	}
}
function sparkleContours() {
	const main = [];
	tessellate(circle, circle, 0, main);
	tessellate(haloWide, haloNarrow, 1, main);
	tessellate(coreWide, coreNarrow, 2, main);
	const k = 256 / 108.5;
	const scaled = (points) => points.map((p) => [p[0] * k, p[1] * k]);
	const smallCircle = O(scaled(circle.vertices), scaled(circle.incoming), scaled(circle.outgoing));
	const small = [];
	tessellate(smallCircle, smallCircle, 3, small);
	tessellate(smallCore, smallCore, 4, small);
	return {
		main: new Float32Array(main),
		small: new Float32Array(small)
	};
}
/** Thinned-out vertices — for the gem's silhouette (the lens under it). */
function thinned(vertices) {
	const seen = /* @__PURE__ */ new Set();
	const out = [];
	for (let i = 0; i < vertices.length; i += 10) {
		const x = vertices[i], y = vertices[i + 1], z = vertices[i + 2];
		const k = `${Math.round(x * 14)},${Math.round(y * 14)},${Math.round(z * 14)}`;
		if (seen.has(k)) continue;
		seen.add(k);
		out.push([
			x,
			y,
			z
		]);
	}
	return out;
}
var cached = null;
/** Everything the gem computes on the CPU — once per page. */
function gemAssets() {
	if (cached) return cached;
	const planes = opticalPlanes();
	const vertices = roundedMesh(planes, ROUNDING);
	cached = {
		planes,
		vertices,
		anchors: sparkleAnchors(vertices),
		sparkles: sparkleContours(),
		outline: thinned(vertices)
	};
	return cached;
}
/** The gem's convex hull on screen, in points from the canvas centre. */
function gemHull(outline, yaw, pitch, scale) {
	const model = rotation(pitch, yaw);
	const pts = outline.map((v) => {
		const q = cameraPoint(mat4.transformPoint(model, v));
		return [q[0] * scale, -(q[1] + .12) * scale];
	});
	pts.sort((a, b) => a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1]);
	const cross = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
	const lower = [], upper = [];
	for (const p of pts) {
		while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) lower.pop();
		lower.push(p);
	}
	for (let i = pts.length - 1; i >= 0; i--) {
		const p = pts[i];
		while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) upper.pop();
		upper.push(p);
	}
	return lower.slice(0, -1).concat(upper.slice(0, -1));
}
//#endregion
export { projection as a, ca as c, mat4 as d, gemHull as i, clamp as l, cameraPoint as n, rotation as o, gemAssets as r, starProjection as s, REFERENCE_PITCH as t, clamp01 as u };
