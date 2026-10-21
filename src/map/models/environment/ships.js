import * as THREE from 'three';
import { wx, wz } from '../../data.js';
import { mat, mesh, box, sph, galleon } from '../helpers.js';

export function build(scene, ctx) {
  galleon(ctx, wx(530), wz(392), 0.6);
  galleon(ctx, wx(1722), wz(352), -0.5);
  galleon(ctx, wx(1000), wz(1380), 2.4);

  // Sea monster
  {
    const g = new THREE.Group();
    g.position.set(wx(2040), 0, wz(235));
    scene.add(g);
    for (const [a, b] of [[-6, 0], [8, 4], [0, -8]]) {
      const cv = new THREE.CatmullRomCurve3([
        new THREE.Vector3(a, -2, b),
        new THREE.Vector3(a + 3, 12, b),
        new THREE.Vector3(a + 9, 24, b + 2),
        new THREE.Vector3(a + 14, 18, b)
      ]);
      mesh(new THREE.TubeGeometry(cv, 24, 1.5, 8), mat(ctx, '#4d8a3a', { r: 0.5 }), 0, 0, 0, g);
    }
    g.userData.sea = 1;
    ctx.ships.push(g);
  }

  // Whale
  {
    const g = new THREE.Group();
    g.position.set(wx(1262), 0, wz(1405));
    scene.add(g);
    const w = sph(ctx, g, 9, '#2d8f6e', 0, 0, 0, { r: 0.5 });
    w.scale.set(1.8, 0.8, 1);
    mesh(new THREE.TorusGeometry(14, 1, 6, 30).rotateX(Math.PI / 2), mat(ctx, '#fff', { op: 0.6 }), 0, 0.3, 0, g);
    const t = box(ctx, g, 12, 0.8, 3, '#2d8f6e', 16, 2, 0);
    t.rotation.z = 0.5;
    ctx.ships.push(g);
  }
}
