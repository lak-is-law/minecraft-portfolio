import { box, cyl, cone } from './helpers.js';

export function build(g, ctx) {
  const cols = ['#d9a066', '#c8683a', '#e0c08a', '#b05a35'];
  for (let i = 0; i < 7; i++) {
    const x = -18 + i * 6;
    box(ctx, g, 5, 4 + (i % 3), 4, cols[i % 4], x, 0, 0);
    box(ctx, g, 5.6, 0.6, 4.6, '#6b3b22', x, 4 + (i % 3), 0);
    if (i % 2) {
      box(ctx, g, 3.4, 1.1, 0.3, '#ff4f9a', x, 5.2 + (i % 3), 2.2, { e: '#ff2f80', ei: 1 });
    }
  }
  for (let i = 0; i < 6; i++) {
    cone(ctx, g, 1, 2.6, '#ff7a1a', -8 + i * 3.2, 0, 8, 10);
    cyl(ctx, g, 0.8, 0.9, 0.4, '#fff', -8 + i * 3.2, 1, 8, 10);
  }
  cyl(ctx, g, 0.15, 0.15, 10, '#555', 0, 0, 13, 6);
  box(ctx, g, 6, 1.6, 0.3, '#d6262c', 0, 9, 13, { e: '#ff2200', ei: 0.6 });
}
