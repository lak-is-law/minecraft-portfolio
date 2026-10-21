import { box, sph } from '../helpers.js';

export function build(g, ctx) {
  box(ctx, g, 9, 0.5, 9, '#c9c6bd', 0, 0, 0);
  box(ctx, g, 5, 2.8, 5, '#8d8a82', 0, 0.5, 0);
  box(ctx, g, 2.6, 3, 2, '#d9ac2e', 0, 3.3, 0, { m: 0.6, r: 0.35 });
  sph(ctx, g, 0.9, '#d9ac2e', 0, 7, 0, { m: 0.6, r: 0.35 });
  box(ctx, g, 3.2, 0.8, 2, '#d9ac2e', 0, 3.3, 1.2, { m: 0.6, r: 0.35 });
}
