import * as THREE from 'three';
import { mat, mesh, box, cyl, cone, sph } from './helpers.js';

export function build(g, ctx) {
  box(ctx, g, 3.6, 20, 3.6, '#c9b07a', 0, 0, 0);
  box(ctx, g, 4.6, 4, 4.6, '#d8c08a', 0, 20, 0);
  cone(ctx, g, 3.4, 6, '#3f6b5a', 0, 24, 0, 4).rotation.y = Math.PI / 4;
  for (const [a, b, r] of [[0, 2.4, 0], [0, -2.4, Math.PI], [2.4, 0, Math.PI / 2], [-2.4, 0, -Math.PI / 2]]) {
    const f = cyl(ctx, g, 1.5, 1.5, 0.25, '#fff8e0', a, 20.8, b, 24, { e: '#ffe9a8', ei: 0.5 });
    f.rotation.x = Math.PI / 2;
    f.rotation.z = r;
    f.position.set(a, 22.5, b);
  }

  const w = new THREE.Group();
  w.position.set(16, 11, -2);
  g.add(w);
  mesh(new THREE.TorusGeometry(9, 0.4, 8, 32), mat(ctx, '#f2f2f2'), 0, 0, 0, w);
  for (let i = 0; i < 24; i++) {
    const a = (i / 24) * 6.283;
    sph(ctx, w, 0.8, '#8ec9f2', Math.cos(a) * 9, Math.sin(a) * 9, 0, { op: 0.8 });
  }
  box(ctx, w, 0.3, 18, 0.3, '#f2f2f2', 0, -9, 0);
  w.userData.spin = true;
  ctx.spinners.push(w);
  cyl(ctx, g, 0.5, 0.9, 11, '#dddddd', 16, 0, -2, 6);

  for (const sx of [-27, -9]) box(ctx, g, 3, 13, 3, '#9aa3ad', sx, 0, 12);
  box(ctx, g, 22, 1, 3, '#3a6aa8', -18, 5, 12);
}
