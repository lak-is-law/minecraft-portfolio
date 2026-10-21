import * as THREE from 'three';
import { mkr } from '../../terrain.js';
import { mat, box, inst } from '../helpers.js';

export function build(g, ctx) {
  box(ctx, g, 26, 0.4, 16, '#6b4f3a', 0, -0.3, 0);
  const L = [];
  const r = mkr(9);
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 5; j++) {
      L.push([-10 + i * 2.5, 0.7, -5 + j * 2.5, 0, 1]);
    }
  }
  inst(new THREE.CylinderGeometry(0.6, 0.7, 2, 8), mat(ctx, '#a88467'), L.map(a => [a[0], a[1] + 0.8, a[2]]), g);
  inst(new THREE.SphereGeometry(0.55, 8, 6), mat(ctx, '#b8957a'), L.map(a => [a[0], a[1] + 2.3, a[2]]), g);
}
