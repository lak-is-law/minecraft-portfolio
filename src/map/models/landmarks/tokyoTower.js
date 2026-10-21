import { box, cyl } from '../helpers.js';

export function build(g, ctx) {
  const cs = ['#e5412d', '#ffffff'];
  let y = 0;
  [[5, 3, 7], [3, 1.8, 7], [1.8, 0.9, 6]].forEach(([rb, rt, h], i) => {
    const c = cyl(ctx, g, rt, rb, h, cs[i % 2], 0, y, 0, 4);
    c.rotation.y = Math.PI / 4;
    y += h;
    box(ctx, g, rt * 2.3, 0.7, rt * 2.3, '#e5412d', 0, y - 0.2, 0);
  });
  cyl(ctx, g, 0.2, 0.45, 11, '#e5412d', 0, y, 0, 6);
  for (const [sx, sz] of [[1, 1], [-1, 1], [1, -1], [-1, -1]]) {
    box(ctx, g, 0.6, 2.5, 0.6, '#e5412d', sx * 4, 0, sz * 4);
  }
}
