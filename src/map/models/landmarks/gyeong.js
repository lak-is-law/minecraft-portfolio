import * as THREE from 'three';
import { box, cyl, hallRoof } from '../helpers.js';

export function build(g, ctx) {
  box(ctx, g, 24, 1.6, 16, '#a9a7a0', 0, 0, 0);
  const h = new THREE.Group();
  h.position.y = 1.6;
  g.add(h);
  hallRoof(ctx, h, 18, 12, 0, '#33505a', 1, '#b13a2a');
  for (let i = -2; i <= 2; i++) {
    cyl(ctx, h, 0.4, 0.4, 4.2, '#8a2a1f', i * 3.2, 0, 5, 8);
  }
}
