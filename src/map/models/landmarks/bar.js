import * as THREE from 'three';
import { mat, mesh, box, cyl, sph, signMesh } from '../helpers.js';

export function build(g, ctx) {
  box(ctx, g, 16, 6.5, 10, '#8b3a2f', 0, 0, 0);
  box(ctx, g, 16.8, 0.6, 10.8, '#3a2a24', 0, 6.5, 0);
  for (const wx_ of [-5.5, 5.5]) {
    box(ctx, g, 2.8, 2.4, 0.15, '#ffd38a', wx_, 1.8, 5.05, { e: '#ffb347', ei: 1.3 });
  }
  box(ctx, g, 2.2, 3.6, 0.2, '#3a2418', 0, 0, 5.05);

  const aw = box(ctx, g, 15, 0.5, 2.6, '#d6262c', 0, 4.1, 6.2);
  aw.rotation.x = 0.25;
  for (let i = -3; i <= 3; i += 2) {
    box(ctx, g, 1.9, 0.52, 2.62, '#fff', i * 2, 4.1, 6.2).rotation.x = 0.25;
  }

  const sg = signMesh('BAR', 6, 2.1, '#ff3df0', '#14081c', 1.2);
  sg.position.set(0, 5.5, 5.15);
  g.add(sg);

  const cone_ = mesh(new THREE.ConeGeometry(1.6, 2.2, 16), mat(ctx, '#ff6ad5', { e: '#ff3df0', ei: 1.1, op: 0.9 }), 6, 8.2, 0, g);
  cone_.rotation.x = Math.PI;
  cyl(ctx, g, 0.08, 0.08, 1.6, '#ffd0f0', 6, 6.9, 0, 6);
  sph(ctx, g, 0.28, '#4caf50', 6.5, 8.9, 0, { e: '#3a9a40', ei: 0.5 });

  for (const tx of [-5, 0, 5]) {
    cyl(ctx, g, 0.1, 0.1, 1.2, '#ccc', tx, 0, 9, 6);
    cyl(ctx, g, 0.95, 0.95, 0.1, '#f1e2b5', tx, 1.2, 9, 16);
    for (const sx of [-1.2, 1.2]) cyl(ctx, g, 0.35, 0.35, 0.1, '#d6262c', tx + sx, 0.8, 9, 10);
  }

  for (const bx of [-8.6, 8.6]) cyl(ctx, g, 0.7, 0.7, 1.2, '#7a4a24', bx, 0, 3, 12);

  for (let i = 0; i < 14; i++) {
    const x = -8 + i * (16 / 13);
    sph(ctx, g, 0.17, ['#ffd23f', '#ff7ab6', '#7ad7ff'][i % 3], x, 6.3 + Math.sin(i / 13 * Math.PI) * -0.9 + 0.9, 6.6, { e: '#ffc24a', ei: 1.5 });
  }
}
