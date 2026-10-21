import * as THREE from 'three';
import { mesh, box, cyl, sph, signMesh, fence, elephant, giraffe, lion, penguin } from '../helpers.js';

export function build(g, ctx) {
  box(ctx, g, 46, 0.25, 46, '#7fbf5a', 0, 0, 0);
  box(ctx, g, 40, 0.3, 3, '#ead9ae', 0, 0.1, 0);
  box(ctx, g, 3, 0.3, 40, '#ead9ae', 0, 0.1, 0);

  cyl(ctx, g, 3.2, 3.2, 0.7, '#c9c4b5', 0, 0.2, 0, 24);
  cyl(ctx, g, 2.7, 2.7, 0.6, '#59b8e8', 0, 0.55, 0, 24, { r: 0.1 });
  cyl(ctx, g, 0.5, 0.6, 2.4, '#c9c4b5', 0, 0.4, 0, 10);
  cyl(ctx, g, 0.15, 0.25, 1.8, '#e8f6ff', 0, 2.6, 0, 6, { op: 0.8 });

  for (const sx of [-5, 5]) box(ctx, g, 1.4, 6, 1.4, '#2e7d32', sx, 0.2, 21);
  box(ctx, g, 12.4, 1.4, 1.4, '#2e7d32', 0, 6.2, 21);
  const sg = signMesh('ZOO', 9, 2.6, '#ffffff', '#2e7d32', 0.5);
  sg.position.set(0, 8.9, 21);
  g.add(sg);

  const elP = fence(ctx, g, -13, -11, 15, 12, '#c9b27a');
  cyl(ctx, elP, 2.6, 2.6, 0.15, '#59b8e8', -3, 0.3, 2.5, 24, { r: 0.1 });
  const e1 = elephant(ctx, elP, 1.5, -1, 0.3, 0.8),
        e2 = elephant(ctx, elP, -4, -3, -0.4, 0.5);

  const gP = fence(ctx, g, 13, -11, 13, 12, '#b8c77a');
  const g1 = giraffe(ctx, gP, -1.5, 0, 0.3, 0.8),
        g2 = giraffe(ctx, gP, 2.5, -1.5, -0.5, 0.55);

  const lP = fence(ctx, g, -13, 10, 14, 11, '#d8c48a');
  for (const [rx, rz, rs] of [[-4, -3, 1.4], [-2.6, -3.8, 1], [4, 3, 1.2]]) {
    const r = sph(ctx, lP, rs, '#8d8676', rx, 0.6, rz);
    r.scale.set(1.3, 0.8, 1);
  }
  lion(ctx, lP, 0.5, 0, 0.3, 0.9, true);
  lion(ctx, lP, -2.5, 2.5, -0.8, 0.7, false);

  const pP = fence(ctx, g, 13, 10, 14, 11, '#e9f6fb');
  cyl(ctx, pP, 4.2, 4.2, 0.15, '#59b8e8', 1, 0.3, 0.5, 28, { r: 0.1 });
  for (const [ix, iz] of [[-3, -3], [4, -3.5], [-4, 3.5]]) {
    box(ctx, pP, 1.6, 1, 1.6, '#dff3fb', ix, 0.3, iz, { r: 0.2 }).rotation.y = 0.5;
  }
  const pens = [
    [-3, -3.5], [-1.7, -4.2], [3.6, -2], [5, 2], [-4.5, 3], [-2.5, 4.3], [5.2, 4.2]
  ].map(([px_, pz_], i) => penguin(ctx, pP, px_, pz_, i * 0.9));

  const dm = new THREE.Group();
  dm.position.set(0, 0.2, -17);
  g.add(dm);
  mesh(new THREE.SphereGeometry(5.2, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshStandardMaterial({
    color: '#dff1ff',
    transparent: true,
    opacity: 0.22,
    side: THREE.DoubleSide,
    depthWrite: false,
    roughness: 0.1
  }), 0, 0, 0, dm);
  mesh(new THREE.SphereGeometry(5.22, 18, 9, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshBasicMaterial({
    color: '#ffffff',
    wireframe: true,
    transparent: true,
    opacity: 0.5
  }), 0, 0, 0, dm);

  cyl(ctx, dm, 0.35, 0.5, 3.4, '#7a5a34', 0, 0, 0, 8);
  sph(ctx, dm, 2.1, '#3f9a45', 0, 4.2, 0);
  const birds = [0, 1, 2, 3, 4, 5].map(i => sph(ctx, dm, 0.28, ['#e53935', '#fdd835', '#1e88e5', '#43a047', '#ff7a1a', '#ff6ad5'][i], 0, 3, 0));

  for (const [tx, tz] of [[-21, -20], [21, -20], [-21, 19], [21, 19], [-8, 17], [8, 17]]) {
    cyl(ctx, g, 0.4, 0.5, 2.6, '#6b4a2a', tx, 0.2, tz, 6);
    sph(ctx, g, 2, '#3f9a45', tx, 3.8, tz);
    sph(ctx, g, 1.4, '#56b04f', tx + 0.8, 4.8, tz + 0.3);
  }

  ctx.tickers.push(t => {
    e1.rotation.z = Math.sin(t * 1.2) * 0.25;
    g1.rotation.z = -0.28 + Math.sin(t * 0.8) * 0.07;
    g2.rotation.z = -0.28 + Math.sin(t * 0.8 + 2) * 0.08;
    pens.forEach((q, i) => {
      q.position.y = 0.2 + Math.abs(Math.sin(t * 3 + i)) * 0.15;
      q.rotation.z = Math.sin(t * 3 + i) * 0.08;
    });
    birds.forEach((b, i) => {
      const a = t * (0.9 + i * 0.12) + i, r = 2.2 + (i % 3) * 0.8;
      b.position.set(Math.cos(a) * r, 2.2 + (i % 3) * 0.9 + Math.sin(t * 2 + i) * 0.25, Math.sin(a) * r);
    });
  });
}
