import * as THREE from 'three';
import { mkr } from '../terrain.js';
import { mat, mesh, box, cyl, cone, sph, palm } from './helpers.js';

export function buildSign(g, ctx) {
  const c = document.createElement('canvas');
  c.width = 1024;
  c.height = 128;
  const x = c.getContext('2d');
  x.font = '900 118px Arial Black,Arial,sans-serif';
  x.fillStyle = '#fff';
  x.textAlign = 'center';
  x.textBaseline = 'middle';
  x.fillText('HOLLYWOOD', 512, 68);

  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;

  const p = new THREE.Mesh(
    new THREE.PlaneGeometry(56, 7),
    new THREE.MeshStandardMaterial({
      map: t,
      transparent: true,
      alphaTest: 0.4,
      side: THREE.DoubleSide,
      roughness: 0.5
    })
  );
  p.position.set(0, 5.5, 0);
  p.castShadow = true;
  g.add(p);

  for (let i = -3; i <= 3; i++) box(ctx, g, 0.5, 5.6, 0.5, '#c9c9c9', i * 8.5, 0, -0.5);
  box(ctx, g, 60, 0.4, 1, '#cfcfcf', 0, 0.2, 0);
}

export function buildTheatre(g, ctx) {
  box(ctx, g, 20, 9, 13, '#8f2a22', 0, 0, 0);
  box(ctx, g, 22, 1, 15, '#2d2623', 0, 9, 0);
  const r = cone(ctx, g, 9, 5, '#2f6f64', 0, 10, 0, 4);
  r.rotation.y = Math.PI / 4;
  r.scale.z = 0.72;
  for (const s of [-1, 1]) {
    cyl(ctx, g, 0.6, 0.7, 8, '#c8301f', s * 6, 0, 7.5, 8);
    cyl(ctx, g, 0.6, 0.7, 8, '#c8301f', s * 2, 0, 7.5, 8);
    box(ctx, g, 2, 2.6, 2, '#b9ae96', s * 9, 0, 9.5);
    sph(ctx, g, 0.8, '#b9ae96', s * 9, 3.3, 9.5);
  }
  mesh(new THREE.PlaneGeometry(6, 16).rotateX(-Math.PI / 2), mat(ctx, '#c01530'), 0, 0.15, 15.5, g);
}

export function buildWalkOfFame(g, ctx) {
  box(ctx, g, 34, 0.35, 7, '#a9a9a9', 0, 0, 0);
  const r = mkr(4);
  for (let i = 0; i < 9; i++) {
    const s = mesh(
      new THREE.CircleGeometry(1.1, 5).rotateX(-Math.PI / 2),
      mat(ctx, '#e84f8b', { e: '#c0386f', ei: 0.3 }),
      -14 + i * 3.5, 0.4, (r() - 0.5) * 3, g
    );
    s.rotation.y = r() * 3;
    mesh(
      new THREE.CircleGeometry(0.55, 5).rotateX(-Math.PI / 2),
      mat(ctx, '#e8c25a', { m: 0.7, r: 0.3 }),
      s.position.x, 0.42, s.position.z, g
    );
  }
  for (let i = 0; i < 5; i++) palm(ctx, g, -14 + i * 7, -6, 8);
}
