import * as THREE from 'three';
import { mat, mesh, box, cyl, sph, palm, signMesh } from '../helpers.js';

export function build(g, ctx) {
  const H = 50, spineX = -5, WZ = 10.5, F = 15;

  /* island, shore foam, palms */
  cyl(ctx, g, 13, 14, 3.6, '#e9d8a8', 0, -3, 0, 40);
  mesh(new THREE.TorusGeometry(13.6, 0.5, 6, 48).rotateX(Math.PI / 2), mat(ctx, '#ffffff', { op: 0.85 }), 0, -0.9, 0, g);
  for (let i = 0; i < 7; i++) {
    const a = i / 7 * 6.283 + 0.4;
    palm(ctx, g, Math.cos(a) * 10.8, Math.sin(a) * 10.8, 5.5, 0.6);
  }

  /* curved causeway to the coast */
  const cvp = new THREE.CatmullRomCurve3([
    [-13, -5], [-22, -6.5], [-32, -11], [-44, -17]
  ].map(a => new THREE.Vector3(a[0], 0, a[1])));
  const N = 18;
  for (let i = 0; i < N; i++) {
    const a = cvp.getPoint(i / N), b = cvp.getPoint((i + 1) / N);
    const len = a.distanceTo(b) + 0.08;
    const sg = new THREE.Group();
    sg.position.set((a.x + b.x) / 2, 0, (a.z + b.z) / 2);
    sg.rotation.y = Math.atan2(b.x - a.x, b.z - a.z);
    g.add(sg);
    box(ctx, sg, 3.4, 0.5, len, '#e6dfcf', 0, -0.25, 0);
    for (const sx of [-1.6, 1.6]) box(ctx, sg, 0.14, 0.7, len, '#ffffff', sx, 0.2, 0);
    if (i % 2 === 0) cyl(ctx, sg, 0.38, 0.45, 3.4, '#cfc8b6', 0, -3.4, 0, 8);
  }

  /* building rotated so sail faces sea */
  const B_ = new THREE.Group();
  B_.rotation.y = -0.38;
  g.add(B_);

  box(ctx, B_, 22, 2.2, 17, '#f2e8d0', spineX + 8, 0.5, 0);
  box(ctx, B_, 23, 0.3, 18, '#2a8cff', spineX + 8, 0.4, 0, { e: '#2a8cff', ei: 1.1 });

  /* tapered spine tower */
  for (let k = 0; k < 10; k++) {
    const w = 7.2 - k * 0.55;
    box(ctx, B_, w, H / 10 + 0.05, w + 1.5, '#eef1f5', spineX - 2.6, 2.7 + k * (H - 2.7) / 10, 0, { win: 1, r: 0.5 });
  }
  cyl(ctx, B_, 0.55, 0.18, 15, '#ffffff', spineX - 2.6, H, 0, 10);
  sph(ctx, B_, 0.45, '#ffffff', spineX - 2.6, H + 15.2, 0, { e: '#ffe9b0', ei: 0.8 });

  /* translucent sail fabric + V wings */
  const nu = 26, nv = 34;
  const fx = (v, u) => spineX + F * Math.pow(1 - v, 0.78) * (1 - 0.32 * u * u);
  const fw = v => WZ * Math.pow(1 - v, 0.92) + 0.15;

  const pos = [], idx = [];
  for (let j = 0; j <= nv; j++) {
    const v = j / nv;
    for (let i = 0; i <= nu; i++) {
      const u = i / nu * 2 - 1;
      pos.push(fx(v, u), 2.7 + v * (H - 2.7), u * fw(v));
    }
  }
  for (let j = 0; j < nv; j++) {
    for (let i = 0; i < nu; i++) {
      const a = j * (nu + 1) + i, b = a + 1, c = a + nu + 1, d = c + 1;
      idx.push(a, c, b, b, c, d);
    }
  }
  const gm = new THREE.BufferGeometry();
  gm.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  gm.setIndex(idx);
  gm.computeVertexNormals();
  mesh(gm, new THREE.MeshStandardMaterial({
    color: '#f6f8fb',
    roughness: 0.35,
    metalness: 0.05,
    transparent: true,
    opacity: 0.82,
    side: THREE.DoubleSide,
    emissive: '#7fb6ff',
    emissiveIntensity: 0.12
  }), 0, 0, 0, B_);

  const ln = [];
  for (let j = 3; j <= nv; j += 4) {
    for (let i = 0; i < nu; i++) {
      const u0 = i / nu * 2 - 1, u1 = (i + 1) / nu * 2 - 1, v = j / nv;
      ln.push(fx(v, u0), 2.7 + v * (H - 2.7), u0 * fw(v), fx(v, u1), 2.7 + v * (H - 2.7), u1 * fw(v));
    }
  }
  for (let i = 0; i <= nu; i += 2) {
    const u = i / nu * 2 - 1;
    for (let j = 0; j < nv; j++) {
      const v0 = j / nv, v1 = (j + 1) / nv;
      ln.push(fx(v0, u), 2.7 + v0 * (H - 2.7), u * fw(v0), fx(v1, u), 2.7 + v1 * (H - 2.7), u * fw(v1));
    }
  }
  const lg = new THREE.BufferGeometry();
  lg.setAttribute('position', new THREE.Float32BufferAttribute(ln, 3));
  B_.add(new THREE.LineSegments(lg, new THREE.LineBasicMaterial({ color: '#b9c8da', transparent: true, opacity: 0.75 })));

  const wt = ctx.winTex().clone();
  wt.wrapS = wt.wrapT = THREE.RepeatWrapping;
  wt.needsUpdate = true;
  for (const sd of [-1, 1]) {
    const wp_ = [], uv = [], wi = [], n2 = 12;
    for (let j = 0; j <= nv; j++) {
      const v = j / nv, y = 2.7 + v * (H - 2.7), ex = fx(v, sd), ez = sd * fw(v), sx = spineX - 0.2, sz = sd * 3;
      for (let i = 0; i <= n2; i++) {
        const t = i / n2;
        wp_.push(sx + (ex - sx) * t, y, sz + (ez - sz) * t);
        uv.push(t * 3, v * 14);
      }
    }
    for (let j = 0; j < nv; j++) {
      for (let i = 0; i < n2; i++) {
        const a = j * (n2 + 1) + i, b = a + 1, c = a + n2 + 1, d = c + 1;
        wi.push(a, c, b, b, c, d);
      }
    }
    const wg = new THREE.BufferGeometry();
    wg.setAttribute('position', new THREE.Float32BufferAttribute(wp_, 3));
    wg.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
    wg.setIndex(wi);
    wg.computeVertexNormals();
    mesh(wg, new THREE.MeshStandardMaterial({
      color: '#e8eef5',
      emissive: '#ffffff',
      emissiveMap: wt,
      emissiveIntensity: 0.4,
      roughness: 0.5,
      side: THREE.DoubleSide
    }), 0, 0, 0, B_);
  }

  /* helipad & cantilever */
  box(ctx, B_, 1.4, 0.7, 7, '#e2e6ec', spineX - 1.5, H * 0.64, 5.2);
  cyl(ctx, B_, 3.6, 3.6, 0.45, '#f7f7f7', spineX - 1.5, H * 0.64, 9.2, 28);
  mesh(new THREE.TorusGeometry(3.1, 0.14, 6, 36).rotateX(Math.PI / 2), mat(ctx, '#d6262c'), spineX - 1.5, H * 0.64 + 0.5, 9.2, B_);
  const h = signMesh('H', 3.4, 3.4, '#d6262c', '#fafafa', 0.3);
  h.rotation.x = -Math.PI / 2;
  h.position.set(spineX - 1.5, H * 0.64 + 0.5, 9.2);
  B_.add(h);

  box(ctx, B_, 9, 2.4, 5, '#bfe6f7', spineX + 4, H * 0.6, 0, { op: 0.78, r: 0.2 });
  box(ctx, B_, 9.4, 0.4, 5.4, '#e2e6ec', spineX + 4, H * 0.6 - 0.4, 0);

  /* fountains */
  for (let i = -2; i <= 2; i++) {
    cyl(ctx, B_, 0.14, 0.2, 2.6 + ((i + 2) % 3) * 0.5, '#e8f6ff', spineX + 17, 0.6, i * 2.2, 6, { op: 0.8 });
  }
}
