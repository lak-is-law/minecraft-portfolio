import { mkr } from '../terrain.js';
import { box, cyl, sph } from './helpers.js';

export function build(g, ctx) {
  const r = mkr(21);
  for (let i = 0; i < 46; i++) {
    const x = (r() - 0.5) * 28, z = (r() - 0.5) * 22, h = 6 + r() * 5;
    cyl(ctx, g, 0.22, 0.28, h, '#7bbf4a', x, 0, z, 6);
  }
  for (const [x, z] of [[0, 5], [4, 6.5], [-4, 7]]) {
    sph(ctx, g, 1.4, '#f6f6f2', x, 1.4, z);
    sph(ctx, g, 0.95, '#f6f6f2', x, 3, z + 0.8);
    sph(ctx, g, 0.4, '#222', x - 0.7, 3.9, z + 0.7);
    sph(ctx, g, 0.4, '#222', x + 0.7, 3.9, z + 0.7);
    sph(ctx, g, 0.3, '#222', x - 0.4, 3.1, z + 1.6);
    sph(ctx, g, 0.3, '#222', x + 0.4, 3.1, z + 1.6);
    box(ctx, g, 0.7, 1.4, 0.7, '#222', x - 1, 0, z + 0.4);
    box(ctx, g, 0.7, 1.4, 0.7, '#222', x + 1, 0, z + 0.4);
  }
}
