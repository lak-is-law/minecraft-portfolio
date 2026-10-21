import * as THREE from 'three';
import { mat, mesh, box, cyl, cone, sph } from '../helpers.js';

export function build(g, ctx) {
  const iron = '#6b5846';
  for (const [sx, sz] of [[1, 1], [1, -1], [-1, 1], [-1, -1]]) {
    const l = box(ctx, g, 1.7, 19, 1.7, iron, sx * 5, 0, sz * 5);
    l.position.y = 9.5;
    l.rotation.z = sx * 0.22;
    l.rotation.x = -sz * 0.22;
  }
  for (const s of [1, -1]) {
    const a = mesh(new THREE.TorusGeometry(5.6, 0.55, 6, 16, Math.PI), mat(ctx, iron), 0, 0, s * 6.6, g);
    const b = mesh(new THREE.TorusGeometry(5.6, 0.55, 6, 16, Math.PI), mat(ctx, iron), s * 6.6, 0, 0, g);
    b.rotation.y = Math.PI / 2;
  }
  box(ctx, g, 11, 1, 11, iron, 0, 11, 0);
  const u = cyl(ctx, g, 1.1, 3.4, 11, iron, 0, 12, 0, 4);
  u.rotation.y = Math.PI / 4;
  box(ctx, g, 5.5, 0.9, 5.5, iron, 0, 22.5, 0);
  const u2 = cyl(ctx, g, 0.4, 1.1, 8, iron, 0, 23.4, 0, 4);
  u2.rotation.y = Math.PI / 4;
  cone(ctx, g, 0.5, 6, iron, 0, 31, 0, 6);
  sph(ctx, g, 0.5, '#ffe08a', 0, 37.2, 0, { e: '#ffd36b', ei: 2 });
  g.scale.setScalar(0.95);
}
