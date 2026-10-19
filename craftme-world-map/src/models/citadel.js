import * as THREE from 'three';
import { mat, mesh, box, cyl, cone } from './helpers.js';

export function build(g, ctx) {
  cyl(ctx, g, 10, 11, 18, '#b9b5a8', 0, 0, 0, 28);
  cyl(ctx, g, 11.4, 11, 1.6, '#a9a598', 0, 18, 0, 28);
  cone(ctx, g, 9, 9, '#2f6fc0', 0, 19.6, 0, 28);
  for (let i = 0; i < 4; i++) {
    const a = i * Math.PI / 2 + Math.PI / 4;
    cyl(ctx, g, 3.6, 4, 22, '#b9b5a8', Math.cos(a) * 15, 0, Math.sin(a) * 15, 16);
    cone(ctx, g, 4.4, 7, '#2f6fc0', Math.cos(a) * 15, 22, Math.sin(a) * 15, 16);
  }
  mesh(new THREE.CylinderGeometry(16, 16, 7, 40, 1, true), mat(ctx, '#a9a598', { side: 1 }), 0, 3.5, 0, g);
  box(ctx, g, 8, 9, 4, '#9a9688', 0, 0, 16);
  box(ctx, g, 7, 8, 10, '#7a4d22', 0, -0.2, 27, undefined);
  cone(ctx, g, 0.3, 5, '#e8c25a', 0, 28, 0, 6);

  const fl = new THREE.Mesh(new THREE.PlaneGeometry(5, 3, 6, 1), mat(ctx, '#d6262c', { side: 1 }));
  fl.position.set(2.6, 33, 0);
  g.add(fl);
  cyl(ctx, g, 0.15, 0.15, 8, '#333', 0, 26, 0, 6);
}
