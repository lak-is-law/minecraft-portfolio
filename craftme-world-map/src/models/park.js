import * as THREE from 'three';
import { mat, mesh, box, cyl, cone, sph, signMesh } from './helpers.js';

export function build(g0, ctx) {
  const g = new THREE.Group();
  g.scale.setScalar(0.85);
  g0.add(g);

  box(ctx, g, 40, 0.25, 3, '#f7e8c9', 0, 0.3, 0);
  box(ctx, g, 3, 0.25, 36, '#f7e8c9', 0, 0.3, 0);

  /* Ferris Wheel */
  const W = new THREE.Group();
  W.position.set(-8, 0.3, -8);
  g.add(W);
  const wh = new THREE.Group();
  wh.position.y = 11;
  W.add(wh);
  mesh(new THREE.TorusGeometry(9.5, 0.4, 8, 40), mat(ctx, '#f2f2f4', { m: 0.3 }), 0, 0, 0, wh);
  mesh(new THREE.TorusGeometry(4.8, 0.25, 6, 32), mat(ctx, '#f2f2f4'), 0, 0, 0, wh);
  cyl(ctx, wh, 0.9, 0.9, 2.6, '#ddd', 0, -1.3, 0, 10).rotation.x = Math.PI / 2;

  const gond = [];
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * 6.283;
    const sp = box(ctx, wh, 0.2, 9.5, 0.2, '#e8e8ee', 0, 0, 0);
    sp.geometry.translate(0, 4.75, 0);
    sp.position.y = 0;
    sp.rotation.z = a;
    const gg = new THREE.Group();
    gg.position.set(Math.cos(a) * 9.5, Math.sin(a) * 9.5, 0);
    wh.add(gg);
    box(ctx, gg, 1.5, 1.3, 1.6, ['#e53935', '#1e88e5', '#fdd835', '#43a047'][i % 4], 0, -1.3, 0);
    box(ctx, gg, 0.1, 1, 0.1, '#999', 0, -0.2, 0);
    gond.push(gg);
  }

  for (const sz of [-1.8, 1.8]) {
    for (const sx of [-1, 1]) {
      const l = box(ctx, W, 0.8, 11.4, 0.8, '#e8e8ee', sx * 3.4, 0, sz);
      l.position.y = 5.7;
      l.rotation.z = -sx * 0.3;
    }
  }

  ctx.tickers.push(t => {
    wh.rotation.z = -t * 0.16;
    gond.forEach(gg => gg.rotation.z = t * 0.16);
  });

  /* Roller coaster */
  const pts = [];
  const N = 28;
  for (let i = 0; i < N; i++) {
    const a = (i / N) * Math.PI * 2;
    const r = 10.5 + 2.8 * Math.sin(3 * a);
    pts.push(new THREE.Vector3(
      6 + Math.cos(a) * r,
      2.2 + 4.2 * Math.abs(Math.sin(a * 2)) + 2.2 * Math.max(0, Math.sin(a * 3 + 1)),
      4 + Math.sin(a) * r * 0.72
    ));
  }
  const cv = new THREE.CatmullRomCurve3(pts, true);
  mesh(new THREE.TubeGeometry(cv, 160, 0.32, 6, true), mat(ctx, '#d6262c', { r: 0.4 }), 0, 0.3, 0, g);
  for (let k = 0; k < 44; k++) {
    const q = cv.getPointAt(k / 44);
    box(ctx, g, 0.26, q.y, 0.26, '#e9e9e9', q.x, 0.3, q.z);
  }

  const carts = [0, 1, 2].map(i => {
    const c = box(ctx, g, 1.2, 0.7, 1.8, ['#ffd23f', '#ff7a1a', '#ffd23f'][i], 0, 0, 0);
    c.geometry.translate(0, 0.35, 0);
    return c;
  });

  ctx.tickers.push(t => {
    carts.forEach((c, i) => {
      const u = Math.min(0.9999, Math.max(0, (((t * 0.045) - i * 0.012) % 1 + 1) % 1)),
            q = cv.getPointAt(u),
            n = cv.getPointAt((u + 0.004) % 1);
      if (q && n) {
        c.position.set(q.x, q.y + 0.55, q.z);
        c.rotation.y = Math.atan2(n.x - q.x, n.z - q.z);
      }
    });
  });

  /* Carousel */
  const cg = new THREE.Group();
  cg.position.set(-10, 0.3, 10);
  g.add(cg);
  const car = new THREE.Group();
  cg.add(car);
  cyl(ctx, car, 3.8, 3.8, 0.6, '#f5d9a0', 0, 0, 0, 24);
  cyl(ctx, car, 0.4, 0.4, 4.6, '#e8c25a', 0, 0, 0, 8);
  cone(ctx, car, 5, 2.8, '#e53935', 0, 4.6, 0, 16);
  const hs = [];
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * 6.283;
    const hg = new THREE.Group();
    hg.position.set(Math.cos(a) * 2.8, 0, Math.sin(a) * 2.8);
    hg.rotation.y = -a;
    car.add(hg);
    cyl(ctx, hg, 0.08, 0.08, 3.4, '#e8c25a', 0, 0.6, 0, 6);
    box(ctx, hg, 0.5, 0.8, 1.3, ['#fff', '#f0a8c8', '#8fd0f0', '#ffd23f'][i % 4], 0, 1.5, 0);
    hs.push([hg, a]);
  }
  ctx.tickers.push(t => {
    car.rotation.y = t * 0.7;
    hs.forEach(([h, a]) => h.children[1].position.y = 1.5 + Math.sin(t * 2 + a * 2) * 0.35);
  });

  /* Tents & Drop Tower */
  [[-17, 2, '#e53935'], [-17, -4, '#1e88e5'], [17, 4, '#fdd835']].forEach(([x, z, c]) => {
    cone(ctx, g, 2.8, 3.6, c, x, 0.3, z, 12);
    cyl(ctx, g, 0.06, 0.06, 1.4, '#444', x, 3.9, z, 5);
    box(ctx, g, 0.9, 0.5, 0.05, '#fff', x + 0.45, 5, z);
  });

  const dt = new THREE.Group();
  dt.position.set(16, 0.3, -10);
  g.add(dt);
  cyl(ctx, dt, 0.5, 0.6, 16, '#6b7ba8', 0, 0, 0, 8);
  box(ctx, dt, 1.4, 1.4, 1.4, '#e53935', 0, 16, 0);
  const ring = new THREE.Group();
  dt.add(ring);
  for (const [bx, bz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
    box(ctx, ring, 0.7, 0.5, 0.7, '#ffd23f', bx * 1.1, 0, bz * 1.1);
  }
  ctx.tickers.push(t => {
    ring.position.y = 2 + (Math.sin(t * 0.9) * 0.5 + 0.5) * 12;
  });

  for (const sx of [-5, 5]) box(ctx, g, 1.2, 7, 1.2, '#8e5ad7', sx, 0.3, 16);
  box(ctx, g, 12, 1.4, 1.2, '#8e5ad7', 0, 7.3, 16);
  const sg = signMesh('AMUSEMENT PARK', 11, 2.2, '#ff6ad5', '#1a0f2a', 1);
  sg.position.set(0, 9.6, 16.7);
  g.add(sg);

  const bc = ['#e53935', '#1e88e5', '#fdd835', '#43a047', '#ff6ad5', '#fff'];
  for (let i = 0; i < 8; i++) {
    const bx = -3.5 + i * 1, bz = 13 + (i % 2) * 0.8;
    cyl(ctx, g, 0.02, 0.02, 3.6, '#ddd', bx, 0.3, bz, 4);
    sph(ctx, g, 0.55, bc[i % 6], bx, 4.3, bz, { r: 0.3 });
  }
}
