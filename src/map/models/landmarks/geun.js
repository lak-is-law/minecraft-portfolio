import * as THREE from 'three';
import { box, hallRoof } from '../helpers.js';

export function build(g, ctx) {
  box(ctx, g, 30, 2, 20, '#a9a7a0', 0, 0, 0);
  box(ctx, g, 32, 0.8, 22, '#c9c6bd', 0, 0, 0);
  const h = new THREE.Group();
  h.position.y = 2;
  g.add(h);
  hallRoof(ctx, h, 22, 14, 0, '#33505a', 2, '#b13a2a');
}
