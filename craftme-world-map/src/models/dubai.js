import { cyl, cone, cityBlock } from './helpers.js';

export function build(g, ctx) {
  cityBlock(ctx, g, 34, 26, ['#8fd0f0', '#a9e0f5', '#6fb6e0', '#dfeff9'], 8, 34, 64, true);
  const bk = ['#e8f4fc', '#d4eaf8', '#c0e0f4'];
  [[4, 2.4, 16], [3, 1.8, 16], [2.2, 1.2, 14], [1.4, 0.6, 12]].reduce((y, [rb, rt, h], i) => {
    cyl(ctx, g, rt, rb, h, bk[i % 3], 0, y, 0, 3, { m: 0.5, r: 0.2 });
    return y + h;
  }, 0);
  cone(ctx, g, 0.5, 14, '#cfe6f5', 0, 58, 0, 6);
}
