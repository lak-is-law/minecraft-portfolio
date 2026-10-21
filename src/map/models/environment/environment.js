import * as THREE from 'three';
import { VOL, T, mkr } from '../../terrain.js';

export function build(scene, ctx) {
  const puffTex = (() => {
    const c = document.createElement('canvas');
    c.width = c.height = 128;
    const g = c.getContext('2d');
    const gr = g.createRadialGradient(64, 64, 4, 64, 64, 62);
    gr.addColorStop(0, 'rgba(255,255,255,.95)');
    gr.addColorStop(0.5, 'rgba(255,255,255,.55)');
    gr.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = gr;
    g.fillRect(0, 0, 128, 128);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  })();

  const volTop = T(VOL[0], VOL[1]).h;
  const lava = new THREE.PointLight(0xff7a1f, 900, 70, 1.6);
  lava.position.set(VOL[0], volTop + 6, VOL[1]);
  scene.add(lava);
  ctx.lava = lava;
  ctx.volTop = volTop;

  const smokes = [];
  for (let i = 0; i < 10; i++) {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: puffTex, transparent: true, depthWrite: false, color: '#e8e2da' }));
    s.userData.p = i / 10;
    scene.add(s);
    smokes.push(s);
  }
  ctx.smokes = smokes;

  const clouds = [];
  const r = mkr(5);
  for (let i = 0; i < 12; i++) {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: puffTex, transparent: true, depthWrite: false, opacity: 0.3 }));
    const a = r() * 6.283, rad = 300 + r() * 280;
    s.position.set(80 + Math.cos(a) * rad * 1.2, 130 + r() * 90, Math.sin(a) * rad * 0.8);
    s.scale.set(150 + r() * 130, 60 + r() * 40, 1);
    s.userData.v = 0.6 + r() * 0.8;
    scene.add(s);
    clouds.push(s);
  }
  ctx.clouds = clouds;
}
