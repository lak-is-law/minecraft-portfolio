import * as THREE from 'three';
import { W2, wx, wz, DATA } from './data.js';

export const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
export const sm = (e0, e1, x) => {
  const t = clamp((x - e0) / (e1 - e0), 0, 1);
  return t * t * (3 - 2 * t);
};
export const mkr = s => () => (s = (s * 16807) % 2147483647) / 2147483647;
export const hash = (x, y) => {
  const h = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return h - Math.floor(h);
};
export const vnoise = (x, y) => {
  const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
  return (hash(xi, yi) * (1 - u) + hash(xi + 1, yi) * u) * (1 - v) +
         (hash(xi, yi + 1) * (1 - u) + hash(xi + 1, yi + 1) * u) * v;
};
export const fbm = (x, y, o = 4) => {
  let a = 0.5, s = 0, f = 1;
  for (let i = 0; i < o; i++) {
    s += a * vnoise(x * f, y * f);
    f *= 2;
    a *= 0.5;
  }
  return s;
};

/* ---- Polygons ---- */
export function dense(pts, per = 6) {
  const n = pts.length, out = [];
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
    for (let k = 0; k < per; k++) {
      const t = k / per, t2 = t * t, t3 = t2 * t;
      out.push([0, 1].map(a => 0.5 * (
        2 * p1[a] +
        (-p0[a] + p2[a]) * t +
        (2 * p0[a] - 5 * p1[a] + 4 * p2[a] - p3[a]) * t2 +
        (-p0[a] + 3 * p1[a] - 3 * p2[a] + p3[a]) * t3
      )));
    }
  }
  return out;
}

export function mkPoly(px, per = 6, smooth = true) {
  const w = px.map(W2);
  const P = smooth ? dense(w, per) : w;
  let a = 1e9, b = 1e9, c = -1e9, d = -1e9;
  P.forEach(p => {
    a = Math.min(a, p[0]);
    b = Math.min(b, p[1]);
    c = Math.max(c, p[0]);
    d = Math.max(d, p[1]);
  });
  P.bb = [a - 40, b - 40, c + 40, d + 40];
  return P;
}

export function circPoly(cx, cz, r, n = 20) {
  const P = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * 6.2832;
    P.push([cx + Math.cos(a) * r, cz + Math.sin(a) * r]);
  }
  P.bb = [cx - r - 40, cz - r - 40, cx + r + 40, cz + r + 40];
  return P;
}

export function sdPoly(x, z, P) {
  const bb = P.bb;
  if (x < bb[0] || x > bb[2] || z < bb[1] || z > bb[3]) return -999;
  let d = 1e9, c = false;
  for (let i = 0, j = P.length - 1; i < P.length; j = i++) {
    const a = P[i], b = P[j];
    if ((a[1] > z) !== (b[1] > z) && x < (b[0] - a[0]) * (z - a[1]) / (b[1] - a[1]) + a[0]) c = !c;
    const ex = b[0] - a[0], ey = b[1] - a[1], px_ = x - a[0], py = z - a[1];
    const t = clamp((px_ * ex + py * ey) / (ex * ex + ey * ey || 1), 0, 1);
    const dx = px_ - ex * t, dy = py - ey * t;
    const dd = dx * dx + dy * dy;
    if (dd < d) d = dd;
  }
  return (c ? 1 : -1) * Math.sqrt(d);
}

export const ISL = mkPoly([
  [640, 430], [700, 330], [900, 300], [1100, 270], [1300, 250], [1500, 290],
  [1620, 360], [1665, 520], [1645, 700], [1625, 860], [1600, 1000], [1380, 1070],
  [1262, 1110], [1245, 1260], [1170, 1325], [1050, 1285], [1030, 1135],
  [900, 1120], [760, 1080], [640, 1000], [615, 800], [600, 600]
], 8);

export const FOREST = mkPoly([[790, 340], [925, 335], [955, 565], [830, 600], [775, 520]]);
export const DESERT = mkPoly([[1240, 385], [1430, 312], [1565, 335], [1625, 430], [1645, 640], [1500, 685], [1340, 640], [1250, 520]]);
export const CITYR = mkPoly([[1340, 632], [1600, 660], [1612, 905], [1400, 912], [1340, 800]]);
export const GIZAR = mkPoly([[655, 842], [800, 832], [935, 905], [905, 1035], [700, 975]]);
export const TOKYOR = mkPoly([[680, 545], [780, 560], [765, 640], [690, 655]]);
export const SANDS = mkPoly([[1045, 990], [1250, 990], [1250, 1120], [1170, 1170], [1050, 1130]]);
export const YELLOW = mkPoly([[962, 856], [1082, 856], [1082, 974], [962, 974]], 3);
export const PINK = mkPoly([[1076, 1105], [1232, 1105], [1232, 1275], [1076, 1275]], 3);
export const MESAR = mkPoly([[1500, 640], [1690, 640], [1700, 780], [1560, 800]]);
export const LAKES = [
  mkPoly([[930, 500], [1020, 500], [1022, 570], [935, 572]]),
  mkPoly([[1338, 470], [1362, 470], [1362, 592], [1338, 592]], 3),
  circPoly(wx(710), wz(942), 9),
  circPoly(wx(1108), wz(500), 12)
];

/* ---- Terrain landmarks & peaks ---- */
export const PEAKS = [
  [1070, 455, 110], [1110, 425, 150], [1152, 478, 100], [1203, 476, 120],
  [1098, 510, 90], [1172, 525, 80], [1218, 500, 90]
].map(([a, b, s]) => [wx(a), wz(b), s * 0.3]);

export const VOL = [wx(1181), wz(375)];
export const FUJI = [wx(693), wz(440)];
export const MESA = [wx(1690), wz(690)];
export const HILL = [wx(1580), wz(500)];

export const KARST = (() => {
  const r = mkr(11), o = [];
  const cx = wx(865), cz = wz(395);
  for (let i = 0; i < 14; i++) {
    o.push([cx + (r() - 0.5) * 70, cz + (r() - 0.5) * 40, 2.8 + r() * 2.2, 11 + r() * 10]);
  }
  return o;
})();

export const PALMC = [wx(1770), wz(912)];
export const SHELVES = [
  [PALMC[0] + 30, PALMC[1], 130, 70],
  [wx(2095), wz(900), 60, 55],
  [wx(1829), wz(1175), 32, 32],
  [wx(1719), wz(1078), 24, 24]
];

export const ISLETS = [
  [wx(1719), wz(1078), 10],
  [wx(1829), wz(1175), 13],
  [wx(2040), wz(862), 6],
  [wx(2065), wz(832), 6],
  [wx(2090), wz(885), 6],
  [wx(2110), wz(845), 6],
  [wx(2060), wz(905), 6],
  [wx(2140), wz(968), 7],
  [wx(2118), wz(915), 6]
];

export function T(x, z) {
  const d = sdPoly(x, z, ISL) + (fbm(x * 0.02 + 7, z * 0.02) - 0.5) * 18;
  let h;
  if (d >= 0) h = 0.55 + Math.min(1, d / 18) * 3.4 + (fbm(x * 0.05, z * 0.05) - 0.38) * 7 * sm(0, 26, d);
  else h = 0.55 - 16 * (1 - Math.exp(d / 15));
  const lf = sm(4, 18, d);
  let f = 0;
  for (const [a, b, s] of PEAKS) f += s * Math.exp(-Math.pow(Math.hypot(x - a, z - b) / 11, 1.7));
  {
    const r = Math.hypot(x - VOL[0], z - VOL[1]), t = r / 44;
    if (t < 1) f += 60 * Math.pow(1 - t, 1.3);
    f -= 9 * Math.exp(-Math.pow(r / 5.5, 2));
  }
  {
    const r = Math.hypot(x - FUJI[0], z - FUJI[1]);
    f += 34 * Math.exp(-Math.pow(r / 17, 1.5)) - 3 * Math.exp(-Math.pow(r / 3, 2));
  }
  for (const [a, b, s, ht] of KARST) f += ht * Math.exp(-Math.pow(Math.hypot(x - a, z - b) / s, 2));
  f += 15 * (1 - sm(15, 26, Math.hypot(x - MESA[0], z - MESA[1])));
  f += 14 * Math.exp(-Math.pow(Math.hypot(x - HILL[0], z - HILL[1]) / 22, 2));
  if (sdPoly(x, z, GIZAR) > 0) f += Math.sin(x * 0.5 + z * 0.3) * 0.35 + Math.sin(z * 0.7) * 0.25;
  h += f * lf;
  for (const L of LAKES) {
    const s = sdPoly(x, z, L);
    if (s > -4 && d > 0) {
      const w = sm(-1, 4, s);
      h = h * (1 - w) + (-1.5) * w;
    }
  }
  {
    const r = Math.hypot(x, z), g = sm(4, 1.5, Math.abs(r - 27));
    if (g > 0) h = h * (1 - g) + (-1.3) * g;
  }
  for (const [sx, sz, rx, rz] of SHELVES) {
    const e = Math.hypot((x - sx) / rx, (z - sz) / rz);
    if (e < 1.6) {
      const sh = -2.2 - 10 * sm(0.8, 1.6, e);
      if (h < sh) h = sh;
    }
  }
  for (const [ix, iz, r] of ISLETS) {
    const e = Math.hypot(x - ix, z - iz) / r;
    if (e < 1.3) {
      const l = 1.6 * sm(1.25, 0.8, e);
      if (l > h) h = l;
    }
  }
  return { h, d };
}

export function initFlat(ctx, data = DATA) {
  ctx.FLAT = [];
  data.forEach(p => {
    if (p.cat === 'nature' && !p.big) return;
    const b = T(p.x, p.z).h;
    if (b > 0.9) ctx.FLAT.push({ x: p.x, z: p.z, R: p.big ? 26 : p.cat === 'city' ? 20 : 12, h: Math.max(b, 2.2) });
  });
  const c = ctx.FLAT.find(f => Math.hypot(f.x, f.z) < 2);
  if (c) {
    c.R = 22;
    c.h = 2.6;
  }
}

export function H(x, z, ctx) {
  let h = T(x, z).h;
  if (ctx && ctx.FLAT) {
    for (const f of ctx.FLAT) {
      const r = Math.hypot(x - f.x, z - f.z);
      if (r < f.R) h += (f.h - h) * sm(f.R, f.R * 0.5, r);
    }
  }
  return h;
}

const C = s => new THREE.Color(s);
export const K = {
  g1: C('#76b347'), g2: C('#4a8832'), forest: C('#2a6636'),
  desert1: C('#e0983f'), desert2: C('#c4742e'), slate: C('#59658a'),
  giza: C('#bd6c36'), tokyo: C('#e277b0'), sand: C('#e8d08c'),
  yellow: C('#f2cb4c'), pink: C('#d24a86'), mesa: C('#be5a2a'),
  rock: C('#8d8676'), snow: C('#f4f8ff'), dark: C('#463f56'),
  lava: C('#ff7a1f'), turq: C('#9ae8d4'), turq2: C('#2db6c4'),
  deep: C('#0f5f89'), deep2: C('#0a3a66'), white: C('#ffffff')
};

const tmpC = new THREE.Color();
export function colorAt(x, z, h, d, out) {
  const n1 = fbm(x * 0.04, z * 0.04), n2 = vnoise(x * 0.9, z * 0.9);
  out.copy(K.g1).lerp(K.g2, n1);
  const wForest = sm(-3, 4, sdPoly(x, z, FOREST)),
        wDes = sm(-3, 4, sdPoly(x, z, DESERT)),
        wCity = sm(-2, 3, sdPoly(x, z, CITYR)),
        wGiza = sm(-3, 4, sdPoly(x, z, GIZAR)),
        wTok = sm(-2, 3, sdPoly(x, z, TOKYOR));
  const wSand = sm(-3, 4, sdPoly(x, z, SANDS)),
        wY = sm(-1, 2, sdPoly(x, z, YELLOW)),
        wP = sm(-1, 2, sdPoly(x, z, PINK)),
        wMesa = sm(-3, 4, sdPoly(x, z, MESAR));

  out.lerp(K.forest, wForest * 0.95);
  out.lerp(tmpC.copy(K.desert1).lerp(K.desert2, n1), wDes);
  out.lerp(K.mesa, wMesa * 0.8);
  out.lerp(K.slate, wCity);
  out.lerp(K.giza, wGiza);
  out.lerp(K.tokyo, wTok * 0.9);
  out.lerp(K.sand, wSand);
  out.lerp(K.yellow, wY);
  out.lerp(K.pink, wP);

  const vr = Math.hypot(x - VOL[0], z - VOL[1]);
  out.lerp(K.rock, sm(12, 22, h) * 0.9);
  const vw = 1 - sm(8, 42, vr);
  out.lerp(K.snow, sm(26, 34, h + (n2 - 0.5) * 4) * (1 - vw));
  out.lerp(K.dark, vw * 0.88);
  out.lerp(K.lava, 1 - sm(1.5, 9, vr));

  if (d > 0) out.lerp(K.sand, sm(7, 1.2, d) * 0.85);
  if (h < 0.55) {
    const dp = Math.max(0, 0.55 - h);
    out.copy(K.sand).lerp(K.turq, sm(0, 2.5, dp))
                    .lerp(K.turq2, sm(2, 7, dp))
                    .lerp(K.deep, sm(6, 16, dp))
                    .lerp(K.deep2, sm(14, 24, dp));
  }
  if (d > -2.5 && d < 0.8) out.lerp(K.white, 0.4 * (1 - Math.abs(d + 0.8) / 1.8));
  const j = (n2 - 0.5) * 0.07;
  out.r += j;
  out.g += j;
  out.b += j;
}

export const TX0 = -310, TX1 = 470, TZ0 = -270, TZ1 = 280, STEP = 2.2;
export const nx = Math.round((TX1 - TX0) / STEP) + 1;
export const nz = Math.round((TZ1 - TZ0) / STEP) + 1;

export function createTerrainMesh(ctx, prebakedHeights = null) {
  initFlat(ctx, DATA);
  const pos = new Float32Array(nx * nz * 3), col = new Float32Array(nx * nz * 3);
  const c = new THREE.Color();
  let i = 0;

  for (let j = 0; j < nz; j++) {
    for (let k = 0; k < nx; k++) {
      const x = TX0 + k * STEP, z = TZ0 + j * STEP;
      let h;
      if (prebakedHeights && prebakedHeights.length === nx * nz) {
        h = prebakedHeights[i];
      } else {
        const t = T(x, z);
        h = t.h;
        for (const f of ctx.FLAT) {
          const r = Math.hypot(x - f.x, z - f.z);
          if (r < f.R) h += (f.h - h) * sm(f.R, f.R * 0.5, r);
        }
      }
      pos[i * 3] = x;
      pos[i * 3 + 1] = h;
      pos[i * 3 + 2] = z;
      const t = T(x, z);
      colorAt(x, z, h, t.d, c);
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
      i++;
    }
  }

  const idx = new Uint32Array((nx - 1) * (nz - 1) * 6);
  let p = 0;
  for (let j = 0; j < nz - 1; j++) {
    for (let k = 0; k < nx - 1; k++) {
      const a = j * nx + k, b = a + 1, c2 = a + nx, d = c2 + 1;
      idx[p++] = a;
      idx[p++] = c2;
      idx[p++] = b;
      idx[p++] = b;
      idx[p++] = c2;
      idx[p++] = d;
    }
  }

  const tg = new THREE.BufferGeometry();
  tg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  tg.setAttribute('color', new THREE.BufferAttribute(col, 3));
  tg.setIndex(new THREE.BufferAttribute(idx, 1));
  tg.computeVertexNormals();

  const nrm = tg.attributes.normal.array;
  for (let j = 1; j < nz - 1; j++) {
    for (let k = 1; k < nx - 1; k++) {
      const idx_ = j * nx + k, h = pos[idx_ * 3 + 1];
      if (h < 0.55) continue;
      const rock = sm(0.86, 0.62, nrm[idx_ * 3 + 1]);
      const avg = (pos[(idx_ - 1) * 3 + 1] + pos[(idx_ + 1) * 3 + 1] + pos[(idx_ - nx) * 3 + 1] + pos[(idx_ + nx) * 3 + 1]) / 4;
      const ao = clamp(1 - (avg - h) * 0.09, 0.7, 1) * clamp(1 + (h - avg) * 0.03, 0.9, 1.1);
      const r = col[idx_ * 3], g = col[idx_ * 3 + 1], b = col[idx_ * 3 + 2], k2 = 0.55 * rock;
      col[idx_ * 3] = (r + (0.52 - r) * k2) * ao;
      col[idx_ * 3 + 1] = (g + (0.47 - g) * k2) * ao;
      col[idx_ * 3 + 2] = (b + (0.4 - b) * k2) * ao;
    }
  }

  const terrainMat = new THREE.MeshStandardMaterial({
    vertexColors: true,
    roughness: 0.95,
    metalness: 0
  });

  const terrain = new THREE.Mesh(tg, terrainMat);
  terrain.receiveShadow = true;
  terrain.castShadow = true;
  ctx.terrain = terrain;
  ctx.pos = pos;
  ctx.col = col;
  ctx.tg = tg;

  return { terrain, pos, col, tg };
}

export function createWaterMesh(ctx) {
  const { pos } = ctx;
  const hmTex = (() => {
    const d = new Uint8Array(nx * nz * 4);
    for (let i = 0; i < nx * nz; i++) {
      d[i * 4] = clamp((pos[i * 3 + 1] + 8) / 16, 0, 1) * 255;
      d[i * 4 + 3] = 255;
    }
    const t = new THREE.DataTexture(d, nx, nz, THREE.RGBAFormat);
    t.magFilter = THREE.LinearFilter;
    t.minFilter = THREE.LinearFilter;
    t.needsUpdate = true;
    return t;
  })();

  const waterMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: {
      t: { value: 0 },
      cD: { value: C('#9cc4dc') },
      hm: { value: hmTex },
      box: { value: new THREE.Vector4(TX0, TZ0, (nx - 1) * STEP, (nz - 1) * STEP) }
    },
    vertexShader: 'varying vec3 vW;void main(){vec4 w=modelMatrix*vec4(position,1.);vW=w.xyz;gl_Position=projectionMatrix*viewMatrix*w;}',
    fragmentShader: `uniform float t;uniform vec3 cD;uniform sampler2D hm;uniform vec4 box;varying vec3 vW;
vec2 G(vec2 p,vec2 d,float k,float a,float s){return d*k*a*cos(dot(d,p)*k+t*s);}
float N(vec2 p){return sin(p.x*1.7+sin(p.y*1.3+t*.4))*sin(p.y*1.9-sin(p.x*1.1-t*.3));}
void main(){
 vec2 p=vW.xz;vec2 uv=(p-box.xy)/box.zw;float ins=step(0.,uv.x)*step(uv.x,1.)*step(0.,uv.y)*step(uv.y,1.);
 float h=texture2D(hm,clamp(uv,0.,1.)).r*16.-8.;float depth=mix(12.,-h,ins);
 float dc=length(cameraPosition-vW);float lod=1.-smoothstep(70.,380.,dc);
 vec2 g=G(p,normalize(vec2(1.,.35)),.22,.9,.9)+G(p,normalize(vec2(-.4,1.)),.37,.55,1.2)+lod*(G(p,normalize(vec2(.7,-.8)),.71,.32,1.6)+G(p,normalize(vec2(-1.,-.2)),1.3,.16,2.1)+G(p,normalize(vec2(.2,1.)),2.4,.07,2.8));
 vec3 n=normalize(vec3(-g.x*.55*(.45+.55*lod),1.,-g.y*.55*(.45+.55*lod)));
 vec3 V=normalize(cameraPosition-vW);vec3 L=normalize(vec3(-.5,.73,.42));
 vec3 sh=vec3(.28,.78,.74),md=vec3(.04,.42,.62),dp=vec3(.015,.11,.28);
 vec3 c=mix(sh,md,smoothstep(.2,3.5,depth));c=mix(c,dp,smoothstep(3.,11.,depth));
 float ndv=clamp(dot(n,V),0.,1.);float fr=.02+.98*pow(1.-ndv,5.);
 vec3 sky=mix(vec3(.36,.6,.88),vec3(.68,.85,.96),pow(1.-ndv,2.));
 c=mix(c,sky,clamp(fr*1.05,0.,.55));
 c+=vec3(.05,.12,.1)*smoothstep(.3,-.6,N(p*.5))*(1.-smoothstep(0.,4.,depth));
 vec3 H=normalize(L+V);c+=vec3(1.,.93,.78)*pow(max(dot(n,H),0.),260.)*1.6*(.12+.88*lod);
 float sw=smoothstep(.55,1.,N(p*.35+t*.05))*.07;c+=sw;
 float shore=1.-smoothstep(0.,1.4,depth+.25*N(p*.9+t*.7));
 float lace=smoothstep(.2,.8,N(p*1.1-t*.5)*.5+.5);c=mix(c,vec3(.95,.99,1.),shore*lace*.9*ins);
 float far=smoothstep(420.,1000.,length(p-vec2(80.,0.)));c=mix(c,cD,far);
 float a=mix(.4,.96,smoothstep(0.,4.5,depth));a=mix(a,1.,far);a=max(a,shore*lace*.85*ins);
 gl_FragColor=vec4(c,a);
#include <tonemapping_fragment>
#include <colorspace_fragment>
}`
  });

  const water = new THREE.Mesh(new THREE.PlaneGeometry(5000, 5000).rotateX(-Math.PI / 2), waterMat);
  water.position.y = 0;
  water.renderOrder = 2;
  ctx.water = water;
  ctx.waterMat = waterMat;
  return water;
}
