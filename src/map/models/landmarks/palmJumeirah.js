import * as THREE from 'three';
import { PALMC } from '../../terrain.js';
import { mat, mesh, box, inst } from '../helpers.js';

export function build(scene, ctx) {
  const g = new THREE.Group();
  g.position.set(PALMC[0], 0.9, PALMC[1]);
  scene.add(g);
  const sand = '#f0dfa0';

  box(ctx, g, 72, 1.4, 7.5, sand, -34, 0, 0);
  box(ctx, g, 72, 0.3, 3, '#c9bd8c', -34, 1.4, 0);
  const v = [];

  for (let i = -6; i <= 6; i++) {
    const a = i * 0.11;
    const len = 62 + Math.cos(a * 2) * 12;
    const ca = Math.cos(a), sa = Math.sin(a);
    const f = box(ctx, g, len, 1.2, 3.6, sand, 0, 0, 0);
    f.geometry.translate(len / 2, 0, 0);
    f.position.set(0, 0.6, 0);
    f.rotation.y = -a;

    const gr = box(ctx, g, len * 0.96, 0.3, 2.2, '#58b04c', 0, 0, 0);
    gr.geometry.translate(len * 0.48, 0, 0);
    gr.position.set(0, 1.35, 0);
    gr.rotation.y = -a;

    for (let s = 5; s < len - 2; s += 3.4) {
      for (const sd of [-1, 1]) {
        const lx = s, lz = sd * 2.7;
        v.push([lx * ca + lz * sa, 1.5, -lx * sa + lz * ca, 0, 1]);
      }
    }
  }

  inst(new THREE.BoxGeometry(1.5, 1.1, 1.5), mat(ctx, '#fff6e6'), v, g);

  const pts = [];
  for (let k = 0; k <= 40; k++) {
    const a = -1.25 + 2.5 * k / 40;
    pts.push(new THREE.Vector3(Math.cos(a) * 84, 0, Math.sin(a) * 50));
  }
  mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 60, 2.4, 6), mat(ctx, sand), 0, 0.6, 0, g);
  return g;
}
