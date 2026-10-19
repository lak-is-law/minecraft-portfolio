import * as THREE from 'three';
import { W2 } from '../data.js';
import { H } from '../terrain.js';
import { box } from './helpers.js';

export function ribbon(ptsPx, width, color, yoff, ctx, opts = {}) {
  const pts = ptsPx.map(p => {
    const w = W2(p);
    return new THREE.Vector3(w[0], 0, w[1]);
  });
  const cv = new THREE.CatmullRomCurve3(pts, false, 'centripetal');
  const n = Math.max(8, Math.round(cv.getLength() / 1.4));
  const vs = [], ix = [];

  for (let i = 0; i <= n; i++) {
    const t = i / n, p = cv.getPoint(t), tg = cv.getTangent(t);
    const nxv = -tg.z, nzv = tg.x;
    const l = Math.hypot(nxv, nzv) || 1;
    for (const s of [-1, 1]) {
      const x = p.x + nxv / l * width / 2 * s,
            z = p.z + nzv / l * width / 2 * s;
      vs.push(x, H(x, z, ctx) + yoff, z);
    }
    if (i < n) {
      const a = i * 2;
      ix.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
    }
  }

  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(vs, 3));
  g.setIndex(ix);
  g.computeVertexNormals();

  const m = new THREE.Mesh(g, new THREE.MeshStandardMaterial({
    color,
    roughness: 0.9,
    polygonOffset: true,
    polygonOffsetFactor: -2,
    polygonOffsetUnits: -2,
    emissive: opts.e || '#000',
    emissiveIntensity: opts.ei || 1,
    side: THREE.DoubleSide
  }));
  m.receiveShadow = true;
  m.renderOrder = 1;
  m.userData.curve = cv;
  return m;
}

export function build(scene, ctx) {
  const roads = new THREE.Group();
  scene.add(roads);
  ctx.roads = roads;

  const roadPaths = [
    [[1140, 790], [1140, 1000], [1140, 1215]],
    [[1140, 790], [1140, 700], [1140, 625], [1050, 590], [960, 565]],
    [[1140, 640], [1240, 575], [1338, 510]],
    [[1140, 790], [1340, 790], [1540, 790]],
    [[1075, 790], [1000, 778], [925, 762]],
    [[1100, 820], [1094, 880], [1090, 990], [1010, 1005], [940, 990], [930, 925]]
  ];

  roadPaths.forEach(p => {
    roads.add(
      ribbon(p, 7.5, '#5c4a36', 0.42, ctx),
      ribbon(p, 5.2, '#e8cf93', 0.5, ctx)
    );
  });

  const railG = new THREE.Group();
  scene.add(railG);
  ctx.railG = railG;

  const railPaths = [
    [[1150, 850], [1165, 905], [1190, 1000], [1210, 1022], [1330, 1034], [1470, 1048]],
    [[1150, 850], [1262, 872], [1425, 870], [1450, 885], [1450, 1000], [1486, 1004]],
    [[1450, 870], [1530, 935], [1600, 998]]
  ];

  railPaths.forEach((p, i) => {
    const a = ribbon(p, 3.6, '#5a2a10', 0.55, ctx);
    const b = ribbon(p, 2.2, '#ffb13b', 0.62, ctx, { e: '#ff8a1a', ei: 0.25 });
    railG.add(a, b);
    if (i === 1) ctx.railCurve = b.userData.curve;
  });

  const train = new THREE.Group();
  for (let i = 0; i < 4; i++) {
    box(ctx, train, 3, 2, 5.4, i ? '#2f7fe0' : '#e84a2f', 0, 0, -i * 6.2, { r: 0.4 });
  }
  scene.add(train);
  ctx.train = train;

  return { roads, railG, train };
}
