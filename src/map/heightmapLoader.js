import { nx, nz } from './terrain.js';

let cachedHeights = null;

export async function fetchHeightmap(url = '/heightmap.bin') {
  if (cachedHeights) return cachedHeights;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = await res.arrayBuffer();
    if (buf.byteLength === nx * nz * 4) {
      cachedHeights = new Float32Array(buf);
      return cachedHeights;
    }
  } catch (err) {
    // Graceful fallback to procedural math
    console.warn('Prebaked heightmap not available, falling back to procedural T(x,z):', err.message);
  }
  return null;
}

export function getCachedHeights() {
  return cachedHeights;
}
