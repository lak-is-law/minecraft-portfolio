import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { TX0, TX1, TZ0, TZ1, STEP, nx, nz, T, colorAt } from '../src/map/terrain.js';
import { createContext } from '../src/map/context.js';
import { DATA } from '../src/map/data.js';
import * as THREE from 'three';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log(`Baking heightmap: grid ${nx}x${nz} (${nx * nz} vertices)...`);

const ctx = createContext();

// Initialize flat regions
ctx.FLAT = [];
const W2 = p => [(p[0] - 1140) / 2.63, (p[1] - 790) / 2.63];
const sm = (e0, e1, x) => {
  const t = Math.max(0, Math.min(1, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
};

DATA.forEach(d => {
  const p = W2([d.X * 2.63 + 1140, d.Z * 2.63 + 790]);
  const t = T(p[0], p[1]);
  if (t.d < -6 && t.h > 1) {
    ctx.FLAT.push({ x: p[0], z: p[1], h: Math.max(1.8, t.h * 0.9), R: d.big ? 38 : 22 });
  }
});

const heights = new Float32Array(nx * nz);
const colors = new Float32Array(nx * nz * 3);
const c = new THREE.Color();
let i = 0;

for (let j = 0; j < nz; j++) {
  for (let k = 0; k < nx; k++) {
    const x = TX0 + k * STEP, z = TZ0 + j * STEP;
    const t = T(x, z);
    let h = t.h;
    for (const f of ctx.FLAT) {
      const r = Math.hypot(x - f.x, z - f.z);
      if (r < f.R) h += (f.h - h) * sm(f.R, f.R * 0.5, r);
    }
    heights[i] = h;
    colorAt(x, z, h, t.d, c);
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
    i++;
  }
}

// Write to public/heightmap.bin
const publicDir = path.resolve(__dirname, '../public');
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
const hFile = path.join(publicDir, 'heightmap.bin');
fs.writeFileSync(hFile, Buffer.from(heights.buffer));
console.log(`Saved ${heights.byteLength} bytes to ${hFile}`);
console.log('✓ Heightmap baking complete!');
