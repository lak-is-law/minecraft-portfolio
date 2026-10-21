import * as THREE from 'three';
import { mat, mesh, box, cone, cityBlock } from '../helpers.js';

export function build(g, ctx) {
  cityBlock(ctx, g, 70, 46, ['#8fa1c4', '#6f82aa', '#a9b6d3', '#5c6a8d'], 10, 46, 77);
  box(ctx, g, 5, 64, 5, '#aab6cf', 0, 0, 0, { win: 1, m: 0.2 });
  cone(ctx, g, 1.2, 16, '#c9d4ea', 0, 64, 0, 6);

  [['#ff2fa0', -16, 10], ['#2fd7ff', 0, 15], ['#ffd22f', 16, 10], ['#7a2fff', 8, 22]].forEach(([c, x, y], i) => {
    const b = mesh(new THREE.PlaneGeometry(9, 6), mat(ctx, c, { e: c, ei: 1.4, side: 1 }), x, y, 24 + (i % 2) * 3, g);
    b.rotation.y = (i - 1.5) * 0.2;
    box(ctx, g, 0.4, y - 3, 0.4, '#333', x, 0, 24 + (i % 2) * 3);
  });

  for (let i = 0; i < 7; i++) {
    const c = box(ctx, g, 2.4, 0.9, 1.2, '#ffcf1f', -14 + i * 4.6, 0.1, 32);
    c.rotation.y = 0.2 * i;
  }
}
