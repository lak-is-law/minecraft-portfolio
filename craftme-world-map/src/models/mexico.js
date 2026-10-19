import { box, palm, cityBlock } from './helpers.js';

export function build(g, ctx) {
  for (let i = 0; i < 5; i++) {
    box(ctx, g, 26 - i * 4.6, 2.6, 26 - i * 4.6, i % 2 ? '#c7b290' : '#b7a280', 0, i * 2.6, 0);
  }
  box(ctx, g, 4, 13, 2, '#d6c8a8', 0, 0, 13.2).rotation.x = 0;
  box(ctx, g, 4, 3, 3, '#8a2a1f', 0, 13, 0);
  cityBlock(ctx, g, 28, 24, ['#f0a02f', '#e0507a', '#4aa8d8', '#6ac46a', '#f0e04f'], 3, 8, 52, false);
  for (let i = -1; i <= 1; i++) palm(ctx, g, i * 9, -22, 6);
}
