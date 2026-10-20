import * as THREE from 'three';
import { box, cone, hallRoof } from './helpers.js';

export function build(g, ctx) {
  const wall = '#a6302a';
  for (const s of [1, -1]) {
    box(ctx, g, 42, 5, 1.6, wall, 0, 0, s * 16);
    box(ctx, g, 1.6, 5, 32, wall, s * 21, 0, 0);
    box(ctx, g, 42.5, 0.7, 2, '#e2b83a', 0, 5, s * 16);
  }
  for (const [sx, sz] of [[1, 1], [1, -1], [-1, 1], [-1, -1]]) {
    box(ctx, g, 4, 6, 4, wall, sx * 21, 0, sz * 16);
    const r = cone(ctx, g, 4, 3, '#e2b83a', sx * 21, 6, sz * 16, 4);
    r.rotation.y = Math.PI / 4;
  }

  box(ctx, g, 20, 2.4, 14, '#cfc9ba', 0, 0, 0);
  const h = new THREE.Group();
  h.position.y = 2.4;
  g.add(h);
  hallRoof(ctx, h, 16, 10, 0, '#e2b83a', 2, '#b02a22');

  const s = new THREE.Group();
  s.position.set(0, 0, -9);
  g.add(s);
  box(ctx, s, 10, 3, 5, '#b02a22', 0, 0, 0);
  cone(ctx, s, 6, 3, '#e2b83a', 0, 3, 0, 4).rotation.y = Math.PI / 4;

  const s2 = new THREE.Group();
  s2.position.set(0, 0, 9);
  g.add(s2);
  box(ctx, s2, 10, 3, 5, '#b02a22', 0, 0, 0);
  cone(ctx, s2, 6, 3, '#e2b83a', 0, 3, 0, 4).rotation.y = Math.PI / 4;
}
