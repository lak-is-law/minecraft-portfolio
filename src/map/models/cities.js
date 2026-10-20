import { cyl, sph, box, cityBlock } from './helpers.js';

export function tokyoCity(g, ctx) {
  cityBlock(ctx, g, 32, 15, ['#ff6fb5', '#6fc8ff', '#b58fff', '#fff0f8'], 6, 28, 12);
}

export function seoulCity(g, ctx) {
  cityBlock(ctx, g, 30, 15, ['#9fb3d6', '#c9d4ea', '#7f94bb', '#e6ecf6'], 5, 24, 41);
}

export function seoulTower(g, ctx) {
  cityBlock(ctx, g, 16, 16, ['#9fb3d6', '#c9d4ea', '#7f94bb'], 6, 22, 31);
  cyl(ctx, g, 0.6, 1, 20, '#e8ecf3', 0, 0, 0, 10);
  sph(ctx, g, 2.4, '#dfe6f2', 0, 21, 0, { m: 0.5, r: 0.3 });
  cyl(ctx, g, 0.15, 0.3, 8, '#dfe6f2', 0, 22.5, 0, 6);
}

export function londonCity(g, ctx) {
  cityBlock(ctx, g, 30, 20, ['#c9b79a', '#a9895f', '#9c6b4a', '#d8cdb8', '#8a5a44'], 4, 16, 19);
  for (let i = 0; i < 3; i++) {
    box(ctx, g, 2.6, 1.9, 1.1, '#d6262c', -6 + i * 5, 0.1, 14);
    box(ctx, g, 0.9, 2.2, 0.9, '#d6262c', -12 + i * 4, 0.1, 17);
  }
}

export function simple(g, ctx) {
  cityBlock(ctx, g, 14, 10, ['#d8c9a8', '#b9a98a', '#e0d6c0'], 3, 10, 3, false);
}
