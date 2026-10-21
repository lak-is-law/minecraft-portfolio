import * as THREE from 'three';
import { DATA } from '../../data.js';
import {
  mkr, fbm, sdPoly, T, H,
  DESERT, CITYR, GIZAR, SANDS, YELLOW, PINK, TOKYOR, MESAR, LAKES, FOREST
} from '../../terrain.js';
import { mat, inst } from '../helpers.js';

export function build(scene, ctx) {
  const r = mkr(99), pines = [], rounds = [];
  const avoid = DATA.filter(d => d.cat !== 'nature' || d.big);

  for (let i = 0; i < 9000 && pines.length + rounds.length < 2600; i++) {
    const x = -250 + r() * 470, z = -230 + r() * 430;
    const t = T(x, z);
    if (t.d < 5) continue;
    const h = H(x, z, ctx);
    if (h < 1.3 || h > 16) continue;
    if (avoid.some(a => Math.hypot(x - a.x, z - a.z) < (a.big ? 32 : a.cat === 'city' ? 24 : 15))) continue;
    if (sdPoly(x, z, DESERT) > -2 || sdPoly(x, z, CITYR) > -2 || sdPoly(x, z, GIZAR) > -2 ||
        sdPoly(x, z, SANDS) > -2 || sdPoly(x, z, YELLOW) > -2 || sdPoly(x, z, PINK) > -2 ||
        sdPoly(x, z, TOKYOR) > -2 || sdPoly(x, z, MESAR) > -2) continue;
    if (LAKES.some(L => sdPoly(x, z, L) > -3)) continue;
    if (Math.hypot(x, z) < 36) continue;

    const inF = sdPoly(x, z, FOREST) > 0;
    const dens = inF ? 1 : (fbm(x * 0.03, z * 0.03) > 0.56 ? 0.45 : 0.05);
    if (r() > dens) continue;

    const s = (inF ? 1.15 : 0.85) + r() * 0.6;
    (inF || h > 9 ? pines : rounds).push([x, h, z, r() * 6, s]);
  }

  const group = new THREE.Group();
  scene.add(group);

  const mk = (geo, col, list, dy) => {
    const im = inst(geo, new THREE.MeshStandardMaterial({ roughness: 0.9, color: '#fff' }), list.map(a => [a[0], a[1] + dy * a[4], a[2], a[3], a[4]]), group);
    const c = new THREE.Color();
    list.forEach((a, i) => {
      c.set(col[Math.floor(r() * col.length)]);
      im.setColorAt(i, c);
    });
    im.instanceColor.needsUpdate = true;
    return im;
  };

  mk(new THREE.ConeGeometry(2.1, 7, 7), ['#1f6b3a', '#2a7d44', '#195c34'], pines, 3.8);
  mk(new THREE.IcosahedronGeometry(2.3, 0), ['#4aa14a', '#5fb34f', '#3d9442'], rounds, 3.4);
  inst(new THREE.CylinderGeometry(0.35, 0.45, 2.4, 5), mat(ctx, '#6b4a2a'), [...pines, ...rounds].map(a => [a[0], a[1] + 1.1 * a[4], a[2], 0, a[4]]), group);

  return group;
}
