import * as THREE from 'three';
import { mat, mesh, box, cyl } from '../helpers.js';

export function build(g, ctx) {
  mesh(new THREE.CylinderGeometry(26, 24, 7, 40, 1, true), mat(ctx, '#c9c3b2', { side: 1 }), 0, 3.5, 0, g);
  mesh(new THREE.RingGeometry(12, 19, 40).rotateX(-Math.PI / 2), mat(ctx, '#35353a'), 0, 0.35, 0, g);
  for (let i = 0; i < 40; i++) {
    const a = (i / 40) * 6.283;
    box(ctx, g, 1.4, 0.3, 1.4, i % 2 ? '#fff' : '#d6262c', Math.cos(a) * 19.4, 0, Math.sin(a) * 19.4);
  }

  const car = new THREE.Group();
  car.position.set(15.5, 0.5, 0);
  g.add(car);
  box(ctx, car, 5, 1.1, 2.4, '#d6262c', 0, 0.5, 0, { r: 0.3, m: 0.3 });
  box(ctx, car, 2.2, 1, 2, '#d6262c', -0.3, 1.6, 0, { r: 0.3, m: 0.3 });
  box(ctx, car, 1, 0.7, 1.9, '#8fd0f0', 0.4, 1.7, 0);
  for (const [a, b] of [[1.6, 1.2], [1.6, -1.2], [-1.6, 1.2], [-1.6, -1.2]]) {
    const w = cyl(ctx, car, 0.55, 0.55, 0.5, '#111', a, 0, b, 10);
    w.rotation.x = Math.PI / 2;
  }
  car.userData.orbit = 15.5;
  ctx.carOrbit = car;

  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * 6.283;
    box(ctx, g, 2, 1.4 + (i % 3) * 0.6, 3, '#8d8a82', Math.cos(a) * 20.6, 0, Math.sin(a) * 20.6).rotation.y = -a;
  }
}
