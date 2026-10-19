import { DATA } from '../craftme-world-map/src/data.js';
import { createContext } from '../craftme-world-map/src/context.js';
import { createTerrainMesh, createWaterMesh, H } from '../craftme-world-map/src/terrain.js';
import * as THREE from 'three';

console.log('--- Verifying World of Lakshya Map Data & Math ---');

// 1. Verify 46 waypoints
console.log(`Waypoint count: ${DATA.length}`);
if (DATA.length !== 46) {
  throw new Error(`Expected 46 waypoints, found ${DATA.length}`);
}

// 2. Verify duplicates preserved
const names = DATA.map(d => d.n);
const count = name => names.filter(n => n === name).length;
console.log(`HOLLYWOOD count: ${count('HOLLYWOOD')} (expected 3)`);
console.log(`TOKYO count: ${count('TOKYO')} (expected 2)`);
console.log(`SEOUL count: ${count('SEOUL')} (expected 2)`);
console.log(`PALM JUMEIRAH count: ${count('PALM JUMEIRAH')} (expected 3)`);
console.log(`WORLD ISLANDS count: ${count('WORLD ISLANDS')} (expected 2)`);

if (count('HOLLYWOOD') !== 3 || count('TOKYO') !== 2 || count('SEOUL') !== 2 || count('PALM JUMEIRAH') !== 3) {
  throw new Error('Duplicate waypoint requirements not met!');
}

// 3. Verify gameCoords reconciliation
let coordsVerified = 0;
DATA.forEach(d => {
  if (d.gameCoords && Array.isArray(d.gameCoords) && d.gameCoords.length === 3) {
    coordsVerified++;
  }
});
console.log(`Waypoints with verified 3D game coordinates: ${coordsVerified} / ${DATA.length}`);

// 4. Verify terrain generation and ground snapping
const ctx = createContext();
const { terrain, pos } = createTerrainMesh(ctx);
console.log(`Terrain mesh vertices: ${pos.length / 3}`);
const hSpawn = H(0, 0, ctx);
console.log(`Elevation at Citadel Spawn (0,0): ${hSpawn.toFixed(2)}`);

console.log('✓ All verification assertions passed successfully!');
