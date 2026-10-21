import * as THREE from 'three';
import { box, cyl } from '../helpers.js';

export function build(g, ctx) {
  for (let i = 0; i < 14; i++) {
    const z = -i * 2.3, x = Math.sin(i * 0.35) * 4;
    const t = new THREE.Group();
    t.position.set(x, 0, z);
    t.rotation.y = Math.cos(i * 0.35) * 0.3;
    g.add(t);
    for (const s of [1, -1]) cyl(ctx, t, 0.45, 0.5, 5, '#e0501b', s * 1.9, 0, 0, 8);
    box(ctx, t, 6, 0.6, 0.9, '#e0501b', 0, 5, 0);
    box(ctx, t, 6.6, 0.4, 1.1, '#222', 0, 5.6, 0);
  }
}
