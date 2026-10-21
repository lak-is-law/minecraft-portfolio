import * as THREE from 'three';
import { ISLETS } from '../../terrain.js';
import { palm } from '../helpers.js';

export function build(scene, ctx) {
  const gAll = new THREE.Group();
  scene.add(gAll);
  for (const [ix, iz] of ISLETS.slice(2)) {
    const g = new THREE.Group();
    g.position.set(ix, 1.5, iz);
    gAll.add(g);
    palm(ctx, g, 0, 0, 5);
  }
  return gAll;
}
