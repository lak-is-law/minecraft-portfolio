import { box, cone } from './helpers.js';

export function build(g, ctx) {
  for (const s of [-1, 1]) {
    box(ctx, g, 9, 34, 9, '#ec9a98', s * 9, 0, 0);
    const c = cone(ctx, g, 5.6, 6, '#f2c14a', s * 9, 34, 0, 4);
    c.rotation.y = Math.PI / 4;
    box(ctx, g, 2, 2, 2, '#fff', s * 9, 22, 4.6);
  }
  box(ctx, g, 18, 7, 8, '#ec9a98', 0, 24, 0);
  box(ctx, g, 18.4, 1, 8.4, '#f2c14a', 0, 31, 0);
}
