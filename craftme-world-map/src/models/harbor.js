import { box, cyl, cone, shipM, yachtM } from './helpers.js';

export function build(g, ctx) {
  box(ctx, g, 26, 1, 5, '#8a6a3d', 11, 0, 0);
  for (let i = 0; i < 9; i++) {
    for (const sz of [-2.3, 2.3]) {
      cyl(ctx, g, 0.3, 0.3, 2.4, '#5a3d1e', i * 3.2 - 1, -1, sz, 6);
    }
  }

  const s1 = shipM(ctx, g, 6, -8, 0, 1, '#6b3f1d'),
        s2 = yachtM(ctx, g, 16, 7, 0),
        s3 = shipM(ctx, g, -9, 2, 0.35, 0.8, '#5a3720');

  ctx.tickers.push(t => {
    s1.position.y = -1.4 + Math.sin(t * 1.1) * 0.14;
    s2.position.y = -1 + Math.sin(t * 1.3 + 1) * 0.12;
    s3.position.y = -1.4 + Math.sin(t * 0.9 + 2) * 0.15;
    s3.rotation.z = Math.sin(t * 0.8) * 0.03;
  });

  box(ctx, g, 0.8, 10, 0.8, '#e8a02f', 20, 0.9, -3);
  box(ctx, g, 0.8, 10, 0.8, '#e8a02f', 20, 0.9, -5.4);
  box(ctx, g, 0.9, 0.9, 12, '#e8a02f', 20, 10.6, -3).position.z = -1.8;

  for (let i = 0; i < 4; i++) {
    box(ctx, g, 2.4, 1.2, 1.2, ['#d6262c', '#1e88e5', '#fdd835', '#43a047'][i], 14 + i * 2.6, 1, -1.6);
  }

  for (let i = 0; i < 7; i++) {
    cyl(ctx, g, 2.4 - i * 0.07, 2.7 - i * 0.07, 2.2, i % 2 ? '#fff' : '#d6262c', 26, i * 2.2 - 1, -8, 14);
  }
  cyl(ctx, g, 1.6, 1.6, 1.6, '#fff6c0', 26, 14.4, -8, 12, { e: '#ffe59a', ei: 1.6 });
  cone(ctx, g, 2.2, 1.8, '#2d2623', 26, 16, -8, 12);
}
