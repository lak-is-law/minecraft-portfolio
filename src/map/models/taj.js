import * as THREE from 'three';
import { mat, mesh, box, cyl, cone, sph } from './helpers.js';

export function build(g, ctx) {
  const w = '#f7f0df';
  box(ctx, g, 34, 2, 34, '#e9e2d0', 0, 0, 0);
  box(ctx, g, 13, 10, 13, w, 0, 2, 0);
  sph(ctx, g, 6.2, w, 0, 12, 0, { r: 0.5 }, false);
  cone(ctx, g, 0.55, 3.5, '#e8c25a', 0, 17.8, 0, 8);

  for (const [sx, sz] of [[1, 1], [1, -1], [-1, 1], [-1, -1]]) {
    cyl(ctx, g, 0.9, 1.2, 15, w, sx * 12.5, 2, sz * 12.5, 12);
    sph(ctx, g, 1.4, w, sx * 12.5, 17.4, sz * 12.5, {}, true);
    sph(ctx, g, 2.1, w, sx * 5.2, 12, sz * 5.2, {}, true);
  }

  mesh(new THREE.PlaneGeometry(5, 34).rotateX(-Math.PI / 2), mat(ctx, '#6ecff0', { r: 0.1, m: 0.3 }), 0, 2.12, 26, g);
  box(ctx, g, 11, 0.3, 34, '#4f9a42', -11, 0, 26);
  box(ctx, g, 11, 0.3, 34, '#4f9a42', 11, 0, 26);
}
