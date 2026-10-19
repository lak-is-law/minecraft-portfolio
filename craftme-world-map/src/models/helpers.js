import * as THREE from 'three';
import { mkr } from '../terrain.js';

export const mat = (ctx, c, o = {}) => {
  const k = c + '|' + (o.win ? 1 : 0) + (o.e || '') + (o.m || 0) + (o.r || '') + (o.side || '') + (o.op || '');
  if (!ctx.matCache[k]) {
    const m = new THREE.MeshStandardMaterial({
      color: c,
      roughness: o.r ?? 0.82,
      metalness: o.m ?? 0,
      emissive: o.e || '#000',
      emissiveIntensity: o.ei ?? 1,
      side: o.side ? THREE.DoubleSide : THREE.FrontSide,
      transparent: !!o.op,
      opacity: o.op ?? 1,
      ...(o.win ? { emissive: '#fff', emissiveMap: ctx.winTex(), emissiveIntensity: 0.5 } : {})
    });
    ctx.matCache[k] = m;
    if (ctx.night && (o.e || o.win)) {
      ctx.night.add(m, {
        dayIntensity: m.emissiveIntensity,
        nightIntensity: o.win ? 1.6 : (m.emissiveIntensity * 2.2)
      });
    }
  }
  return ctx.matCache[k];
};

export function mesh(geo, m, x, y, z, p) {
  const me = new THREE.Mesh(geo, m);
  me.position.set(x, y, z);
  me.castShadow = true;
  me.receiveShadow = true;
  if (p) p.add(me);
  return me;
}

export const box = (ctx, p, w, h, d, c, x, y, z, o) => mesh(new THREE.BoxGeometry(w, h, d), mat(ctx, c, o), x, y + h / 2, z, p);
export const cyl = (ctx, p, rt, rb, h, c, x, y, z, seg = 16, o) => mesh(new THREE.CylinderGeometry(rt, rb, h, seg), mat(ctx, c, o), x, y + h / 2, z, p);
export const cone = (ctx, p, r, h, c, x, y, z, seg = 16, o) => mesh(new THREE.ConeGeometry(r, h, seg), mat(ctx, c, o), x, y + h / 2, z, p);
export const sph = (ctx, p, r, c, x, y, z, o, half) => mesh(new THREE.SphereGeometry(r, 20, 14, 0, Math.PI * 2, 0, half ? Math.PI / 2 : Math.PI), mat(ctx, c, o), x, y, z, p);

export function palm(ctx, p, x, z, h = 7, y0 = 0) {
  const t = cyl(ctx, p, 0.3, 0.5, h, '#8a6a3d', x, y0, z, 6);
  t.rotation.z = 0.12;
  for (let i = 0; i < 7; i++) {
    const a = (i / 7) * 6.283;
    const f = box(ctx, p, 0.7, 0.12, 4.2, '#2f9a3d', x + Math.cos(a) * 2, y0 + h - 0.4, z + Math.sin(a) * 2);
    f.rotation.y = -a + Math.PI / 2;
    f.rotation.x = 0.45;
  }
}

export function cityBlock(ctx, p, n, spread, cols, hmin, hmax, seed, win = true, y0 = 0) {
  const r = mkr(seed);
  for (let i = 0; i < n; i++) {
    const a = r() * 6.283,
          rad = Math.sqrt(r()) * spread,
          w = 3 + r() * 4,
          h = hmin + Math.pow(r(), 1.6) * (hmax - hmin);
    box(ctx, p, w, h, w * (0.8 + r() * 0.5), cols[i % cols.length], Math.cos(a) * rad, y0, Math.sin(a) * rad, win ? { win: 1, m: 0.15, r: 0.5 } : undefined);
  }
}

export function hallRoof(ctx, p, w, d, y, c, tiers = 1, wall = '#b13a2a') {
  for (let t = 0; t < tiers; t++) {
    const s = 1 - t * 0.28;
    box(ctx, p, w * s * 0.8, 4.2, d * s * 0.8, wall, 0, y + t * 8, 0);
    const r = cone(ctx, p, w * s * 0.72, 4.6, c, 0, y + t * 8 + 4.2, 0, 4);
    r.rotation.y = Math.PI / 4;
    r.scale.z = d / w;
  }
}

export function inst(geo, m, list, p) {
  const im = new THREE.InstancedMesh(geo, m, list.length);
  const o = new THREE.Object3D();
  list.forEach((a, i) => {
    o.position.set(a[0], a[1], a[2]);
    o.rotation.set(0, a[3] || 0, 0);
    o.scale.setScalar(a[4] || 1);
    o.updateMatrix();
    im.setMatrixAt(i, o.matrix);
  });
  im.castShadow = true;
  im.receiveShadow = true;
  if (p) p.add(im);
  return im;
}

export function signMesh(text, w, h, fg, bg, glow) {
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = Math.round(512 * h / w);
  const x = c.getContext('2d');
  x.fillStyle = bg;
  x.fillRect(0, 0, c.width, c.height);
  x.strokeStyle = fg;
  x.lineWidth = 8;
  x.strokeRect(10, 10, c.width - 20, c.height - 20);
  x.fillStyle = fg;
  x.font = '900 ' + Math.round(c.height * 0.52) + 'px Arial Black,Arial,sans-serif';
  x.textAlign = 'center';
  x.textBaseline = 'middle';
  x.fillText(text, c.width / 2, c.height / 2 + 4);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return new THREE.Mesh(
    new THREE.PlaneGeometry(w, h),
    new THREE.MeshStandardMaterial({
      map: t,
      emissiveMap: t,
      emissive: '#fff',
      emissiveIntensity: glow || 0.8,
      side: THREE.DoubleSide,
      roughness: 0.5
    })
  );
}

export function jet(ctx, p, x, y, z, ry, sc, col) {
  const q = new THREE.Group();
  q.position.set(x, y, z);
  q.rotation.y = ry;
  q.scale.setScalar(sc);
  p.add(q);

  const f = cyl(ctx, q, 0.9, 0.9, 10, '#f4f6f8', 0, 0, 0, 14, { r: 0.4 });
  f.rotation.x = Math.PI / 2;
  f.position.set(0, 1.5, 0);
  const n = sph(ctx, q, 0.9, '#f4f6f8', 0, 1.5, 5, { r: 0.4 });
  n.scale.set(1, 1, 1.4);

  box(ctx, q, 1.86, 0.16, 8, '#2b4c7e', 0, 1.9, 0);
  box(ctx, q, 11, 0.22, 2.4, '#dfe4ea', 0, 1.1, 0.4);
  box(ctx, q, 0.25, 2.8, 1.9, col, 0, 2.5, -4.3);
  box(ctx, q, 4.2, 0.2, 1.3, '#dfe4ea', 0, 1.6, -4.4);

  for (const ex of [-2.8, 2.8]) {
    const e = cyl(ctx, q, 0.55, 0.55, 1.8, '#9aa3ad', 0, 0, 0, 10);
    e.rotation.x = Math.PI / 2;
    e.position.set(ex, 0.75, 1.4);
  }
  return q;
}

export function heli(ctx, p, x, z, ry) {
  const h = new THREE.Group();
  h.position.set(x, 0.3, z);
  h.rotation.y = ry;
  p.add(h);

  const b = sph(ctx, h, 1.3, '#d6262c', 0, 1.6, 0);
  b.scale.set(1, 0.85, 1.6);
  box(ctx, h, 0.5, 0.5, 4, '#d6262c', 0, 1.7, -3.2);
  box(ctx, h, 0.15, 1.4, 0.6, '#d6262c', 0, 1.6, -5.2);
  box(ctx, h, 1.4, 0.6, 0.6, '#9fd6f0', 0, 2.0, 1.5);

  for (const sx of [-0.9, 0.9]) box(ctx, h, 0.15, 0.15, 3.4, '#333', sx, 0.3, 0);
  cyl(ctx, h, 0.1, 0.1, 1, '#333', 0, 2.6, 0, 6);

  const r = new THREE.Group();
  r.position.y = 3.6;
  h.add(r);
  box(ctx, r, 8, 0.08, 0.35, '#222', 0, 0, 0);
  box(ctx, r, 0.35, 0.08, 8, '#222', 0, 0, 0);
  ctx.tickers.push(t => {
    r.rotation.y = t * 18;
  });
  return h;
}

export function fence(ctx, p, x, z, w, d, ground) {
  const q = new THREE.Group();
  q.position.set(x, 0, z);
  p.add(q);
  box(ctx, q, w, 0.12, d, ground, 0, 0.2, 0);
  const pc = '#8b5a2b';
  for (const [sx, sz, lw, ld] of [[0, -d / 2, w, 0.18], [0, d / 2, w, 0.18], [-w / 2, 0, 0.18, d], [w / 2, 0, 0.18, d]]) {
    box(ctx, q, lw, 0.15, ld, pc, sx, 1.1, sz);
    box(ctx, q, lw, 0.15, ld, pc, sx, 0.65, sz);
  }
  const nx_ = Math.round(w / 2.4), nz_ = Math.round(d / 2.4);
  for (let i = 0; i <= nx_; i++) for (const sz of [-d / 2, d / 2]) box(ctx, q, 0.22, 1.5, 0.22, pc, -w / 2 + i * w / nx_, 0.2, sz);
  for (let i = 1; i < nz_; i++) for (const sx of [-w / 2, w / 2]) box(ctx, q, 0.22, 1.5, 0.22, pc, sx, 0.2, -d / 2 + i * d / nz_);
  return q;
}

export function elephant(ctx, p, x, z, ry, sc) {
  const q = new THREE.Group();
  q.position.set(x, 0.2, z);
  q.rotation.y = ry;
  q.scale.setScalar(sc);
  p.add(q);
  const gr = '#8e919b';
  const b = sph(ctx, q, 1.7, gr, 0, 2.9, 0);
  b.scale.set(1.5, 1.1, 1);
  for (const [lx, lz] of [[1.3, 0.7], [1.3, -0.7], [-1.3, 0.7], [-1.3, -0.7]]) cyl(ctx, q, 0.5, 0.55, 2.2, gr, lx, 0, lz, 10);
  sph(ctx, q, 1.05, gr, 2.5, 3.3, 0);
  for (const sz of [-1, 1]) {
    const e = sph(ctx, q, 0.75, '#80838d', 2.0, 3.4, sz * 1.15);
    e.scale.set(0.3, 1, 0.9);
    cone(ctx, q, 0.12, 1.1, '#f5efe0', 3.1, 2.55, sz * 0.5, 6).rotation.z = -Math.PI / 2 + 0.35;
    sph(ctx, q, 0.12, '#111', 3.2, 3.7, sz * 0.55);
  }
  const tk = new THREE.Group();
  tk.position.set(3.3, 3.0, 0);
  q.add(tk);
  cyl(ctx, tk, 0.4, 0.2, 2.6, gr, 0, -2.6, 0, 8);
  cyl(ctx, q, 0.08, 0.1, 1.2, gr, -2.3, 2.2, 0, 5).rotation.z = 0.5;
  return tk;
}

export function giraffe(ctx, p, x, z, ry, sc) {
  const q = new THREE.Group();
  q.position.set(x, 0.2, z);
  q.rotation.y = ry;
  q.scale.setScalar(sc);
  p.add(q);
  const gc = '#e9b64a', sp = '#8a5a1e';
  for (const [lx, lz] of [[1, 0.4], [1, -0.4], [-1, 0.4], [-1, -0.4]]) cyl(ctx, q, 0.17, 0.2, 3.4, gc, lx, 0, lz, 6);
  box(ctx, q, 3, 1.5, 1.2, gc, 0, 3.3, 0);
  for (const [sx, sy, sz] of [[-0.8, 3.5, 0.62], [0.4, 3.2, 0.62], [-0.2, 3.7, -0.62], [0.9, 3.4, -0.62], [-1, 3.1, -0.62]]) {
    box(ctx, q, 0.55, 0.5, 0.1, sp, sx, sy, sz);
  }
  const ng = new THREE.Group();
  ng.position.set(1.2, 4.2, 0);
  ng.rotation.z = -0.28;
  q.add(ng);
  cyl(ctx, ng, 0.3, 0.45, 3.8, gc, 0, 0, 0, 8);
  box(ctx, ng, 1.1, 0.6, 0.62, gc, 0.35, 3.85, 0);
  cyl(ctx, ng, 0.05, 0.05, 0.5, sp, 0, 4.5, 0.15, 4);
  cyl(ctx, ng, 0.05, 0.05, 0.5, sp, 0, 4.5, -0.15, 4);
  for (const ny of [0.8, 1.8, 2.8]) box(ctx, ng, 0.5, 0.4, 0.1, sp, 0, ny, 0.38);
  return ng;
}

export function lion(ctx, p, x, z, ry, sc, mane) {
  const q = new THREE.Group();
  q.position.set(x, 0.2, z);
  q.rotation.y = ry;
  q.scale.setScalar(sc);
  p.add(q);
  const c = '#d9a441';
  box(ctx, q, 2.2, 1, 0.9, c, 0, 1, 0);
  for (const [lx, lz] of [[0.8, 0.3], [0.8, -0.3], [-0.8, 0.3], [-0.8, -0.3]]) box(ctx, q, 0.3, 1, 0.3, c, lx, 0, lz);
  sph(ctx, q, 0.6, c, 1.3, 1.8, 0);
  if (mane) sph(ctx, q, 0.9, '#8a5a1e', 1.0, 1.8, 0);
  cyl(ctx, q, 0.07, 0.07, 1.4, c, -1.3, 1.1, 0, 5).rotation.z = 0.9;
  return q;
}

export function penguin(ctx, p, x, z, ry) {
  const q = new THREE.Group();
  q.position.set(x, 0.2, z);
  q.rotation.y = ry;
  p.add(q);
  const b = sph(ctx, q, 0.38, '#1b1b1f', 0, 0.75, 0);
  b.scale.set(1, 1.5, 0.9);
  const w = sph(ctx, q, 0.3, '#ffffff', 0.12, 0.7, 0);
  w.scale.set(0.8, 1.4, 0.8);
  sph(ctx, q, 0.22, '#1b1b1f', 0, 1.55, 0);
  cone(ctx, q, 0.08, 0.3, '#ff9a1f', 0.22, 1.5, 0, 6).rotation.z = -Math.PI / 2;
  return q;
}

export function shipM(ctx, p, x, z, ry, sc, hull) {
  const g = new THREE.Group();
  g.position.set(x, -1.4, z);
  g.rotation.y = ry;
  g.scale.setScalar(sc);
  p.add(g);
  box(ctx, g, 16, 3, 5, hull, 0, 0, 0);
  box(ctx, g, 16.4, 0.4, 5.4, '#e8c25a', 0, 3, 0);
  const bw = cone(ctx, g, 2.5, 4, hull, 10, 0, 0, 4);
  bw.rotation.z = -Math.PI / 2;
  bw.rotation.y = Math.PI / 4;
  bw.scale.set(1, 1, 0.8);
  box(ctx, g, 5, 2.4, 4.6, '#7a4b25', -6, 3.4, 0);
  for (const [mx_, mh] of [[-3, 14], [2, 16], [7, 11]]) {
    cyl(ctx, g, 0.25, 0.3, mh, '#3a230f', mx_, 3, 0, 6);
    const sl = mesh(new THREE.PlaneGeometry(5.2, mh * 0.6), mat(ctx, '#fff6dc', { side: 1 }), mx_ + 0.3, 3 + mh * 0.62, 0, g);
    sl.rotation.y = Math.PI / 2;
  }
  return g;
}

export function yachtM(ctx, p, x, z, ry) {
  const g = new THREE.Group();
  g.position.set(x, -1.0, z);
  g.rotation.y = ry;
  p.add(g);
  box(ctx, g, 11, 1.5, 3, '#ffffff', 0, 0, 0, { r: 0.3 });
  const b = cone(ctx, g, 1.5, 3, '#ffffff', 6.5, 0, 0, 4);
  b.rotation.z = -Math.PI / 2;
  b.rotation.y = Math.PI / 4;
  b.scale.set(1, 1, 1);
  box(ctx, g, 4.6, 1.3, 2.4, '#e8f1f8', -0.5, 1.5, 0);
  box(ctx, g, 4.7, 0.5, 2.5, '#2b4c7e', -0.5, 2.0, 0);
  cyl(ctx, g, 0.1, 0.12, 5, '#999', 1.8, 2.8, 0, 6);
  return g;
}

export function galleon(ctx, x, z, ry) {
  const g = new THREE.Group();
  g.position.set(x, 0.2, z);
  g.rotation.y = ry;
  ctx.scene.add(g);
  box(ctx, g, 18, 4, 6, '#6b3f1d', 0, 0, 0);
  box(ctx, g, 6, 3, 5.4, '#7a4b25', -6, 2, 0);
  for (const [px, hh] of [[-3, 22], [3, 26], [8, 18]]) {
    cyl(ctx, g, 0.35, 0.4, hh, '#3a230f', px, 3, 0, 6);
    const s = mesh(new THREE.PlaneGeometry(7, hh * 0.6), mat(ctx, '#fff6dc', { side: 1 }), px + 0.3, 3 + hh * 0.6, 0, g);
    s.rotation.y = Math.PI / 2;
  }
  ctx.ships.push(g);
  return g;
}
