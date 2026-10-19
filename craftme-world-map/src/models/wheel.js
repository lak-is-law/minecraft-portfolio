import * as THREE from 'three';
import { mat, mesh, box, sph } from './helpers.js';

export function build(g, ctx) {
  const w = new THREE.Group();
  w.position.y = 24;
  g.add(w);

  mesh(new THREE.TorusGeometry(19, 0.7, 8, 48), mat(ctx, '#f2f2f4', { m: 0.4 }), 0, 0, 0, w);
  mesh(new THREE.TorusGeometry(11, 0.35, 6, 40), mat(ctx, '#f2f2f4'), 0, 0, 0, w);
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * 6.283;
    const sp = box(ctx, w, 0.25, 19, 0.25, '#e8e8ee', 0, 0, 0);
    sp.geometry.translate(0, 9.5, 0);
    sp.position.y = 0;
    sp.rotation.z = a;
    sph(ctx, w, 1.1, '#5ab0f0', Math.cos(a) * 19.4, Math.sin(a) * 19.4, 0, { e: '#2f8fe0', ei: 0.6 });
  }
  w.userData.spin = true;
  ctx.spinners.push(w);

  for (const s of [-1, 1]) {
    const l = box(ctx, g, 1.2, 26, 1.2, '#e8e8ee', s * 5, 0, 0);
    l.position.y = 13;
    l.rotation.z = s * 0.22;
  }
}
