import { box, cone, palm } from '../helpers.js';

export function build(g, ctx) {
  for (const [x, z, r, h] of [[0, 0, 17, 20], [22, 12, 12, 14], [-18, 14, 8, 9]]) {
    const c = cone(ctx, g, r, h, '#d8a85c', x, 0, z, 4);
    c.rotation.y = Math.PI / 4;
  }
  box(ctx, g, 6, 3.2, 11, '#cf9d56', -30, 0, -4);
  box(ctx, g, 4, 3, 4, '#d8a85c', -30, 3.2, -8);
  palm(ctx, g, 28, -8);
  palm(ctx, g, -12, -12, 6);
  palm(ctx, g, 30, 26, 6);
}
