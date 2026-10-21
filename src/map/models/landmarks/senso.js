import { box, cyl, cone, sph } from '../helpers.js';

export function build(g, ctx) {
  for (const s of [1, -1]) cyl(ctx, g, 0.9, 1, 8, '#c8301f', s * 4.5, 0, 6, 10);
  box(ctx, g, 13, 1.3, 1.6, '#c8301f', 0, 8, 6);
  box(ctx, g, 16, 0.9, 3.6, '#2d2623', 0, 9.3, 6);
  sph(ctx, g, 1.7, '#e2412c', 0, 4.5, 6, { e: '#ff5b3a', ei: 0.4 });

  for (let i = 0; i < 5; i++) {
    const s = 1 - i * 0.15;
    box(ctx, g, 7 * s, 3, 7 * s, i % 2 ? '#f1e6cf' : '#c8301f', 0, i * 3.9 - 0.0, -12);
    const r = cone(ctx, g, 6.4 * s, 1.5, '#2d2623', 0, i * 3.9 + 3, -12, 4);
    r.rotation.y = Math.PI / 4;
  }
  cone(ctx, g, 0.4, 5, '#e8c25a', 0, 19.8, -12, 6);
}
