import * as THREE from 'three';
import { mat, mesh, box, cyl, cone, inst, jet, heli } from './helpers.js';

export function build(g, ctx) {
  box(ctx, g, 46, 0.3, 46, '#8c9099', 0, 0, 0);
  box(ctx, g, 44, 0.2, 7.5, '#2a2d33', 0, 0.3, 10);
  const dsh = [];
  for (let i = -9; i <= 9; i++) dsh.push([i * 2.2, 0.52, 10, 0, 1]);
  inst(new THREE.BoxGeometry(1.2, 0.05, 0.3), mat(ctx, '#fff'), dsh, g);

  box(ctx, g, 3, 0.2, 11, '#33363d', -8, 0.3, 3.5);
  box(ctx, g, 22, 0.2, 3, '#33363d', 3, 0.3, -0.5);

  box(ctx, g, 20, 5, 7, '#dfe6ee', -8, 0.3, -14, { win: 1, r: 0.5 });
  box(ctx, g, 22, 0.8, 9, '#3f6aa6', -8, 5.3, -14);
  for (const bx of [-14, -8, -2]) box(ctx, g, 1.3, 1.3, 5, '#b8c2cf', bx, 2.6, -8.5);

  cyl(ctx, g, 1.2, 1.7, 11, '#e9eef5', 6, 0.3, -16, 12);
  cyl(ctx, g, 2.8, 2.2, 2.2, '#9fd6f0', 6, 11.3, -16, 10, { e: '#6fb8e0', ei: 0.5 });
  cone(ctx, g, 3, 1.4, '#c0392b', 6, 13.5, -16, 10);
  cyl(ctx, g, 0.08, 0.08, 3, '#333', 6, 14.9, -16, 6);

  box(ctx, g, 9, 4, 8, '#c9ccd2', 17, 0.3, -4);
  cyl(ctx, g, 4, 4, 8, '#b9bdc6', 17, 4.3, -4, 16).rotation.x = Math.PI / 2;

  jet(ctx, g, -14, 0.3, -4.2, Math.PI, 0.8, '#d6262c');
  jet(ctx, g, -1, 0.3, -4.2, Math.PI, 0.8, '#1f6fd0');

  const rj = jet(ctx, g, 0, 0.3, 10, Math.PI / 2, 0.8, '#2f9a4a');
  ctx.tickers.push(t => {
    const u = (t * 0.12) % 1, x = -20 + u * 40;
    rj.position.x = x;
    rj.position.y = 0.3 + Math.max(0, x - 6) * 0.22;
    rj.rotation.z = Math.max(0, x - 6) * 0.012;
  });

  const sp = jet(ctx, g, 17, 0.3, 8, -0.6, 0.4, '#f2b01e');
  cyl(ctx, sp, 0.1, 0.1, 2.2, '#333', 0, 1.5, 5.8, 6);

  cyl(ctx, g, 3.4, 3.4, 0.15, '#44484f', 17, 0.3, -16, 24);
  mesh(new THREE.TorusGeometry(2.6, 0.18, 6, 28).rotateX(Math.PI / 2), mat(ctx, '#fff'), 17, 0.5, -16, g);
  heli(ctx, g, 17, -16, 0.5);
}
