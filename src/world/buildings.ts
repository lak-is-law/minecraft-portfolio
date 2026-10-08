export interface VoxelBlock {
  x: number;
  y: number;
  z: number;
  type: string;
  interactable?: {
    type: 'project' | 'experience' | 'skills' | 'chest' | 'sign' | 'teleport' | 'npc' | 'minigame' | 'research' | 'leadership' | 'interests' | 'languages';
    id?: string;
    title?: string;
    text?: string;
  };
}

export class WorldBuilder {
  private blocks: Map<string, VoxelBlock> = new Map();

  public getBlocks(): VoxelBlock[] {
    return Array.from(this.blocks.values());
  }

  public getBlockMap(): Map<string, VoxelBlock> {
    return this.blocks;
  }

  public setBlock(x: number, y: number, z: number, type: string, interactable?: VoxelBlock['interactable']) {
    const key = `${x},${y},${z}`;
    this.blocks.set(key, { x, y, z, type, interactable });
  }

  public removeBlock(x: number, y: number, z: number): VoxelBlock | undefined {
    const key = `${x},${y},${z}`;
    const block = this.blocks.get(key);
    if (block) {
      this.blocks.delete(key);
    }
    return block;
  }

  public buildWorld() {
    this.buildExpandedIslandTerrain();
    this.buildRoadsAndBridges();
    this.buildCrossroadsCitadel();
    this.buildImperialIndiaRealm();
    this.buildChinaRealm();
    this.buildMexicoRealm();
    this.buildUSARealm();
    this.buildGrandCarnivalPier();
    this.buildCivicAndAdventureDistricts();
    this.buildSunsetSaloonAndBar();
    this.buildPalmBeachAndOcean();
    this.buildNatureAndFlora();
  }

  // 1. Expanded Island Terrain with 4 Distinct Cultural Quadrants
  private buildExpandedIslandTerrain() {
    const min = -200;
    const max = 200;

    for (let x = min; x <= max; x++) {
      for (let z = min; z <= max; z++) {
        const dist = Math.hypot(x, z);
        const angle = Math.atan2(z, x);
        const coastR = 180 + Math.sin(angle * 6) * 6 + Math.cos(angle * 4) * 5;

        if (dist > coastR) {
          if (dist <= coastR + 10) {
            this.setBlock(x, 0, z, 'water');
          }
        } else if (dist > coastR - 8) {
          this.setBlock(x, -1, z, 'sand');
          this.setBlock(x, 0, z, 'sand');
        } else {
          // Bedrock foundation
          this.setBlock(x, -2, z, 'bedrock');

          // Quadrant-based subsurface layer
          if (x >= 20 && z <= -20) {
            this.setBlock(x, -1, z, 'red_sandstone'); // India sub-base
          } else if (x <= -20 && z <= -20) {
            this.setBlock(x, -1, z, 'stone_bricks'); // China sub-base
          } else if (x <= -20 && z >= 20) {
            this.setBlock(x, -1, z, 'terracotta_adobe'); // Mexico sub-base
          } else if (x >= 20 && z >= -20) {
            this.setBlock(x, -1, z, 'smooth_stone'); // USA sub-base
          } else if (z >= 75) {
            this.setBlock(x, -1, z, 'sand'); // South Beach & Carnival
          } else {
            this.setBlock(x, -1, z, 'dirt');
          }

          // Surface layer at Y = 0
          const cDist = Math.hypot(x, z);
          if (cDist >= 18 && cDist <= 23) {
            this.setBlock(x, 0, z, 'water'); // Citadel Moat
          } else if (cDist < 18) {
            if (cDist < 4) {
              this.setBlock(x, 0, z, 'quartz_block');
            } else if (Math.abs(x) <= 1 || Math.abs(z) <= 1) {
              this.setBlock(x, 0, z, 'smooth_stone');
            } else {
              this.setBlock(x, 0, z, 'stone_bricks');
            }
          } else if (x >= 25 && z <= -40) {
            // NORTH-EAST: Imperial India
            if (Math.abs(x - 80) <= 5 && z >= -120 && z <= -75) {
              this.setBlock(x, 0, z, 'water'); // Yamuna river reflecting pool
            } else {
              this.setBlock(x, 0, z, 'red_sandstone');
            }
          } else if (x <= -25 && z <= -40) {
            // NORTH-WEST: China & East Asia
            this.setBlock(x, 0, z, ((x + z) % 6 === 0) ? 'stone_bricks' : 'grass');
          } else if (x <= -25 && z >= 25) {
            // SOUTH-WEST: Mexico
            this.setBlock(x, 0, z, ((x + z) % 7 === 0) ? 'sand' : 'terracotta_adobe');
          } else if (x >= 35 && z >= -25 && z <= 55) {
            // EAST: Neo York USA
            this.setBlock(x, 0, z, (x >= 97 && x <= 104) ? 'asphalt_road' : 'stone_bricks');
          } else if (z >= 75) {
            // SOUTH: Sunset Coast, Beach & Carnival
            this.setBlock(x, 0, z, 'sand');
          } else {
            // Heartland Plains
            this.setBlock(x, 0, z, 'grass');
          }
        }
      }
    }
  }

  // 2. Main Arterial Roads and Moat Bridges Linking Citadel to All POIs
  private buildRoadsAndBridges() {
    // Four Stone Bridges over Citadel Moat (18 <= dist <= 23)
    // North Bridge
    for (let x = -2; x <= 2; x++) {
      for (let z = -23; z <= -18; z++) {
        this.setBlock(x, 0, z, 'stone_bricks');
        this.setBlock(x, 1, z, 'stone_bricks');
        if (Math.abs(x) === 2) {
          this.setBlock(x, 2, z, 'stone_bricks');
          if (z === -23 || z === -18) this.setBlock(x, 3, z, 'glowstone');
        }
      }
    }
    // South Bridge
    for (let x = -2; x <= 2; x++) {
      for (let z = 18; z <= 23; z++) {
        this.setBlock(x, 0, z, 'stone_bricks');
        this.setBlock(x, 1, z, 'stone_bricks');
        if (Math.abs(x) === 2) {
          this.setBlock(x, 2, z, 'stone_bricks');
          if (z === 18 || z === 23) this.setBlock(x, 3, z, 'glowstone');
        }
      }
    }
    // East Bridge
    for (let z = -2; z <= 2; z++) {
      for (let x = 18; x <= 23; x++) {
        this.setBlock(x, 0, z, 'stone_bricks');
        this.setBlock(x, 1, z, 'stone_bricks');
        if (Math.abs(z) === 2) {
          this.setBlock(x, 2, z, 'stone_bricks');
          if (x === 18 || x === 23) this.setBlock(x, 3, z, 'glowstone');
        }
      }
    }
    // West Bridge
    for (let z = -2; z <= 2; z++) {
      for (let x = -23; x <= -18; x++) {
        this.setBlock(x, 0, z, 'stone_bricks');
        this.setBlock(x, 1, z, 'stone_bricks');
        if (Math.abs(z) === 2) {
          this.setBlock(x, 2, z, 'stone_bricks');
          if (x === -23 || x === -18) this.setBlock(x, 3, z, 'glowstone');
        }
      }
    }

    // East Highway to Neo York USA (X = 24 to 77, Z in [-2, 2])
    for (let x = 24; x <= 77; x++) {
      for (let z = -2; z <= 2; z++) {
        this.setBlock(x, 1, z, (z === 0 && x % 4 !== 0) ? 'smooth_stone' : 'asphalt_road');
      }
      if (x % 10 === 0) {
        this.setBlock(x, 2, -3, 'iron_block');
        this.setBlock(x, 3, -3, 'glowstone');
        this.setBlock(x, 2, 3, 'iron_block');
        this.setBlock(x, 3, 3, 'glowstone');
      }
    }

    // North Road (Z = -24 to -65, X in [-2, 2])
    for (let z = -24; z >= -65; z--) {
      for (let x = -2; x <= 2; x++) {
        this.setBlock(x, 1, z, 'cobblestone');
      }
      if (z % 8 === 0) {
        this.setBlock(-3, 2, z, 'stone_bricks');
        this.setBlock(-3, 3, z, 'glowstone');
        this.setBlock(3, 2, z, 'stone_bricks');
        this.setBlock(3, 3, z, 'glowstone');
      }
    }

    // Grand Northeast Causeway to India & Taj Mahal (From (2, -60) to (74, -106))
    for (let step = 0; step <= 32; step++) {
      const px = Math.round(2 + step * 2.22);
      const pz = Math.round(-60 - step * 1.42);
      for (let dx = -1; dx <= 1; dx++) {
        this.setBlock(px + dx, 1, pz, 'quartz_block');
      }
      if (step % 5 === 0) {
        this.setBlock(px + 2, 2, pz, 'red_sandstone');
        this.setBlock(px + 2, 3, pz, 'glowstone');
        this.setBlock(px - 2, 2, pz, 'red_sandstone');
        this.setBlock(px - 2, 3, pz, 'glowstone');
      }
    }

    // Grand Northwest Imperial Road to China Great Wall & Pagoda (From (-2, -55) to (-70, -85))
    for (let step = 0; step <= 27; step++) {
      const px = Math.round(-2 - step * 2.51);
      const pz = Math.round(-55 - step * 1.14);
      for (let dx = -1; dx <= 1; dx++) {
        this.setBlock(px + dx, 1, pz, 'stone_bricks');
      }
      if (step % 5 === 0) {
        this.setBlock(px, 2, pz + 2, 'red_terracotta');
        this.setBlock(px, 3, pz + 2, 'glowstone');
        this.setBlock(px, 2, pz - 2, 'red_terracotta');
        this.setBlock(px, 3, pz - 2, 'glowstone');
      }
    }

    // Southwest Camino Real to Mexico City & Aztec Pyramid (From (-24, 0) to (-79, 50))
    for (let step = 0; step <= 29; step++) {
      const px = Math.round(-24 - step * 1.88);
      const pz = Math.round(step * 1.71);
      for (let dz = -1; dz <= 1; dz++) {
        this.setBlock(px, 1, pz + dz, 'red_sandstone');
      }
      if (step % 5 === 0) {
        this.setBlock(px, 2, pz + 2, 'terracotta_adobe');
        this.setBlock(px, 3, pz + 2, 'glowstone');
        this.setBlock(px, 2, pz - 2, 'terracotta_adobe');
        this.setBlock(px, 3, pz - 2, 'glowstone');
      }
    }

    // South Wooden Boardwalk to Saloon, Beach & Carnival Pier (Z = 24 to 119, X in [-2, 2])
    for (let z = 24; z <= 119; z++) {
      for (let x = -2; x <= 2; x++) {
        this.setBlock(x, 1, z, 'oak_planks');
      }
      if (z % 10 === 0 && z !== 58) {
        this.setBlock(-3, 2, z, 'oak_log');
        this.setBlock(-3, 3, z, 'glowstone');
        this.setBlock(3, 2, z, 'oak_log');
        this.setBlock(3, 3, z, 'glowstone');
      }
    }
    // Connector from South Boardwalk to Sunset Saloon at Z = 58
    for (let x = 2; x <= 5; x++) {
      this.setBlock(x, 1, 58, 'oak_planks');
    }
  }

  // 3. Crossroads Citadel (Central Hub & Guide)
  private buildCrossroadsCitadel() {
    for (let x = -17; x <= 17; x++) {
      for (let z = -17; z <= 17; z++) {
        const r = Math.hypot(x, z);
        if (r <= 17) {
          this.setBlock(x, 1, z, 'stone_bricks');
          if (r > 15) {
            this.setBlock(x, 2, z, 'stone_bricks');
          }
        }
      }
    }

    // Central Compass Rose & 3-Tier Fountain
    for (let x = -4; x <= 4; x++) {
      for (let z = -4; z <= 4; z++) {
        const dist = Math.max(Math.abs(x), Math.abs(z));
        if (dist === 4) {
          this.setBlock(x, 2, z, 'quartz_block');
        } else if (dist === 0) {
          this.setBlock(0, 1, 0, 'diamond_block', { type: 'teleport' });
          this.setBlock(0, 2, 0, 'beacon', { type: 'teleport' });
          this.setBlock(0, 3, 0, 'water');
          this.setBlock(0, 4, 0, 'glowstone');
        } else {
          this.setBlock(x, 2, z, 'water');
        }
      }
    }

    for (let d = 5; d <= 12; d++) {
      this.setBlock(0, 1, -d, 'quartz_block');
      this.setBlock(0, 1, d, 'quartz_block');
      this.setBlock(d, 1, 0, 'quartz_block');
      this.setBlock(-d, 1, 0, 'quartz_block');
    }

    this.setBlock(2, 2, 2, 'oak_log');
    this.setBlock(2, 3, 2, 'oak_planks', {
      type: 'sign',
      title: 'Crossroads Citadel Nexus',
      text: 'NE: Imperial India Realm (Taj Mahal & Ghats)\nNW: China Realm (Great Wall & Pagoda)\nSW: Mexico Realm (Zócalo & Aztec Pyramid)\nSE: USA Realm (Neo York & Hollywood)\nSouth: Carnival Pier & Beach'
    });
    this.setBlock(2, 4, 2, 'lantern');

    // Skills Matrix Pavilion (Citadel South: X in [-8, 8], Z in [9, 15])
    for (let x = -8; x <= 8; x++) {
      for (let z = 9; z <= 15; z++) {
        this.setBlock(x, 1, z, 'quartz_block');
        if ((Math.abs(x) === 8 || Math.abs(x) === 0) && (z === 9 || z === 15)) {
          for (let y = 2; y <= 5; y++) {
            this.setBlock(x, y, z, 'quartz_pillar');
          }
        }
        this.setBlock(x, 6, z, 'quartz_block');
      }
    }
    for (let z = 10; z <= 14; z++) {
      this.setBlock(-7, 2, z, 'bookshelf');
      this.setBlock(-7, 3, z, 'bookshelf');
      this.setBlock(7, 2, z, 'bookshelf');
      this.setBlock(7, 3, z, 'bookshelf');
    }
    this.setBlock(0, 2, 12, 'crafting_table', { type: 'skills' });
    this.setBlock(0, 3, 12, 'glowstone', { type: 'skills' });
    this.setBlock(-2, 2, 12, 'cauldron');
    this.setBlock(2, 2, 12, 'cauldron');
  }

  // 4. Imperial India Realm (North-East: Taj Mahal, Yamuna Canal, Varanasi Ghats, Chhatris)
  private buildImperialIndiaRealm() {
    const cx = 80;
    const cz = -140;

    // Raised Grand Marble Plinth (X in [66, 94], Z in [-154, -126], Y = 1 to 3)
    for (let x = cx - 14; x <= cx + 14; x++) {
      for (let z = cz - 14; z <= cz + 14; z++) {
        for (let y = 1; y <= 3; y++) {
          this.setBlock(x, y, z, 'quartz_block');
        }
      }
    }

    // Grand Entrance Stairs on South face
    for (let x = cx - 4; x <= cx + 4; x++) {
      this.setBlock(x, 1, cz + 15, 'quartz_block');
      this.setBlock(x, 2, cz + 15, 'quartz_block');
      this.setBlock(x, 1, cz + 16, 'quartz_block');
    }

    // Taj Mahal Main Mausoleum (X in [cx - 8, cx + 8], Z in [cz - 8, cz + 8], Y = 4 to 16)
    for (let x = cx - 8; x <= cx + 8; x++) {
      for (let z = cz - 8; z <= cz + 8; z++) {
        const isPerimeter = (x === cx - 8 || x === cx + 8 || z === cz - 8 || z === cz + 8);
        const isCorner = (x <= cx - 6 || x >= cx + 6) && (z <= cz - 6 || z >= cz + 6);

        for (let y = 4; y <= 16; y++) {
          if (isPerimeter) {
            if (isCorner) {
              this.setBlock(x, y, z, 'quartz_pillar');
            } else if (y >= 6 && y <= 12 && (Math.abs(x - cx) <= 2 || Math.abs(z - cz) <= 2)) {
              this.setBlock(x, y, z, y === 12 ? 'gold_block' : 'quartz_block');
            } else {
              this.setBlock(x, y, z, 'quartz_block');
            }
          }
        }
        this.setBlock(x, 16, z, 'quartz_block');
      }
    }

    // Central Bulbous Dome (Y = 17 to 28)
    const domeLevels = [
      { y: 17, r: 6 }, { y: 18, r: 6.5 }, { y: 19, r: 7 }, { y: 20, r: 7 },
      { y: 21, r: 6.5 }, { y: 22, r: 6 }, { y: 23, r: 5 }, { y: 24, r: 4 },
      { y: 25, r: 3 }, { y: 26, r: 2 }, { y: 27, r: 1 }
    ];
    for (const lvl of domeLevels) {
      for (let dx = -7; dx <= 7; dx++) {
        for (let dz = -7; dz <= 7; dz++) {
          const d = Math.hypot(dx, dz);
          if (Math.abs(d - lvl.r) < 0.9) {
            this.setBlock(cx + dx, lvl.y, cz + dz, 'quartz_block');
          }
        }
      }
    }
    this.setBlock(cx, 28, cz, 'gold_block');
    this.setBlock(cx, 29, cz, 'gold_block');
    this.setBlock(cx, 30, cz, 'glowstone');

    // 4 Corner Minarets
    const minaretOffsets = [
      { dx: -12, dz: -12 }, { dx: 12, dz: -12 },
      { dx: -12, dz: 12 }, { dx: 12, dz: 12 }
    ];
    for (const mo of minaretOffsets) {
      const mx = cx + mo.dx;
      const mz = cz + mo.dz;
      for (let y = 4; y <= 24; y++) {
        for (let dx = -1; dx <= 1; dx++) {
          for (let dz = -1; dz <= 1; dz++) {
            if (Math.abs(dx) + Math.abs(dz) <= 1) {
              this.setBlock(mx + dx, y, mz + dz, 'quartz_pillar');
            }
          }
        }
        if (y === 11 || y === 17 || y === 23) {
          for (let dx = -1; dx <= 1; dx++) {
            for (let dz = -1; dz <= 1; dz++) {
              this.setBlock(mx + dx, y, mz + dz, 'quartz_block');
            }
          }
        }
      }
      this.setBlock(mx, 25, mz, 'gold_block');
      this.setBlock(mx, 26, mz, 'glowstone');
    }

    // SRMIST Honors Sign inside Taj Mahal
    this.setBlock(cx, 4, cz, 'quartz_block', {
      type: 'sign',
      title: 'SRMIST Academic Honors',
      text: 'B.Tech in Computer Science and Engineering (2022-2026), SRMIST Chennai. CGPA: 4.37 / 5.0. Directorate of Alumni Affairs.'
    });
    this.setBlock(cx, 5, cz, 'gold_block');

    // Yamuna Canal Reflecting Pool (Z in [cz + 18, cz + 65], X in [cx - 4, cx + 4])
    for (let x = cx - 4; x <= cx + 4; x++) {
      for (let z = cz + 18; z <= cz + 65; z++) {
        if (x === cx - 4 || x === cx + 4 || z === cz + 18 || z === cz + 65) {
          this.setBlock(x, 1, z, 'red_sandstone');
        } else {
          this.setBlock(x, 1, z, 'water');
          if (z % 6 === 0) this.setBlock(x, 0, z, 'glowstone');
        }
      }
    }

    // Symmetrical Cypress Pines along canal
    for (let z = cz + 20; z <= cz + 62; z += 7) {
      this.buildCypressTree(cx - 6, 1, z);
      this.buildCypressTree(cx + 6, 1, z);
    }

    // Varanasi Ghats & Riverfront Steps (X in [35, 55], Z in [-135, -115])
    for (let x = 35; x <= 55; x++) {
      for (let z = -135; z <= -115; z++) {
        const stepLevel = Math.max(1, 4 - Math.floor((x - 35) / 5));
        this.setBlock(x, stepLevel, z, 'red_sandstone');
      }
    }
    // Floating Diyas (lanterns) along river
    for (let z = -132; z <= -118; z += 4) {
      this.setBlock(34, 1, z, 'water');
      this.setBlock(34, 2, z, 'glowstone');
    }

    // Rajasthani Haveli Chhatris
    this.buildRajasthaniChhatri(cx - 16, 1, cz + 30);
    this.buildRajasthaniChhatri(cx + 16, 1, cz + 30);
    this.buildRajasthaniChhatri(45, 4, -125);

    // Sprawling Indian Banyan Trees
    this.buildBanyanTree(cx - 24, 1, cz + 15);
    this.buildBanyanTree(cx + 24, 1, cz + 15);
    this.buildBanyanTree(52, 4, -145);
  }

  // 5. China & East Asian Realm (North-West: Great Wall, Temple Pavilion, 5-Tier Pagoda, Bamboo)
  private buildChinaRealm() {
    const px = -110;
    const pz = -110;

    // Great Wall of China Section (Running X from -150 to -80 along Z = -140 with curved rampart)
    for (let x = -150; x <= -80; x++) {
      const zOffset = Math.round(Math.sin((x + 150) * 0.08) * 8);
      const wallZ = -140 + zOffset;
      for (let y = 1; y <= 6; y++) {
        for (let dz = -1; dz <= 1; dz++) {
          this.setBlock(x, y, wallZ + dz, 'stone_bricks');
        }
      }
      // Parapet battlements on top
      this.setBlock(x, 7, wallZ - 1, (x % 2 === 0) ? 'stone_bricks' : 'red_terracotta');
      this.setBlock(x, 7, wallZ + 1, (x % 2 === 0) ? 'stone_bricks' : 'red_terracotta');
      this.setBlock(x, 7, wallZ, 'smooth_stone'); // Walkway
      if (x % 8 === 0) {
        this.setBlock(x, 8, wallZ, 'glowstone');
      }
    }

    // Great Wall Watchtowers at X = -140, -115, -90
    for (const wx of [-140, -115, -90]) {
      const zOffset = Math.round(Math.sin((wx + 150) * 0.08) * 8);
      const wz = -140 + zOffset;
      for (let x = wx - 3; x <= wx + 3; x++) {
        for (let z = wz - 3; z <= wz + 3; z++) {
          for (let y = 1; y <= 10; y++) {
            if (x === wx - 3 || x === wx + 3 || z === wz - 3 || z === wz + 3) {
              this.setBlock(x, y, z, 'stone_bricks');
            }
          }
          this.setBlock(x, 10, z, 'stone_bricks');
        }
      }
      // Curved Chinese tiled roof on tower
      for (let x = wx - 4; x <= wx + 4; x++) {
        for (let z = wz - 4; z <= wz + 4; z++) {
          this.setBlock(x, 11, z, 'red_terracotta');
        }
      }
      this.setBlock(wx, 12, wz, 'gold_block');
      this.setBlock(wx, 13, wz, 'glowstone');
    }

    // 5-Tier Imperial Dragon Pagoda at (px, pz) = (-110, -110)
    const tiers = [
      { yStart: 1, yEnd: 6, halfW: 7 },
      { yStart: 7, yEnd: 12, halfW: 6 },
      { yStart: 13, yEnd: 17, halfW: 5 },
      { yStart: 18, yEnd: 22, halfW: 4 },
      { yStart: 23, yEnd: 26, halfW: 3 }
    ];

    for (const t of tiers) {
      for (let x = px - t.halfW; x <= px + t.halfW; x++) {
        for (let z = pz - t.halfW; z <= pz + t.halfW; z++) {
          const isPerimeter = (x === px - t.halfW || x === px + t.halfW || z === pz - t.halfW || z === pz + t.halfW);
          const isCorner = (x === px - t.halfW || x === px + t.halfW) && (z === pz - t.halfW || z === pz + t.halfW);

          for (let y = t.yStart; y <= t.yEnd; y++) {
            if (isCorner) {
              this.setBlock(x, y, z, 'red_terracotta');
            } else if (isPerimeter) {
              this.setBlock(x, y, z, (y === t.yStart || y === t.yEnd) ? 'red_terracotta' : 'glass');
            }
          }
        }
      }
      // Eave Roof
      const roofY = t.yEnd + 1;
      const rW = t.halfW + 1;
      for (let x = px - rW; x <= px + rW; x++) {
        for (let z = pz - rW; z <= pz + rW; z++) {
          this.setBlock(x, roofY, z, 'stone_bricks');
        }
      }
      for (const [dx, dz] of [[-rW, -rW], [rW, -rW], [-rW, rW], [rW, rW]]) {
        this.setBlock(px + dx, roofY + 1, pz + dz, 'stone_bricks');
        this.setBlock(px + dx, roofY - 1, pz + dz, 'glowstone');
      }
    }
    // Pagoda Gold Spire
    for (let y = 27; y <= 33; y++) {
      this.setBlock(px, y, pz, (y % 2 === 0) ? 'gold_block' : 'iron_block');
    }
    this.setBlock(px, 34, pz, 'glowstone');

    // Traditional Tea House & Languages Embassy at (-80, -90)
    for (let x = -86; x <= -74; x++) {
      for (let z = -96; z <= -84; z++) {
        this.setBlock(x, 1, z, 'oak_planks');
        const isPerimeter = (x === -86 || x === -74 || z === -96 || z === -84);
        for (let y = 2; y <= 5; y++) {
          if (isPerimeter) {
            this.setBlock(x, y, z, (x === -80 && z === -84) ? 'oak_planks' : 'glass');
          }
        }
        this.setBlock(x, 6, z, 'red_terracotta');
      }
    }
    this.setBlock(-80, 2, -90, 'crafting_table', { type: 'languages' });
    this.setBlock(-80, 3, -90, 'bookshelf', { type: 'languages' });
    this.setBlock(-82, 2, -90, 'gold_block');
    this.setBlock(-78, 2, -90, 'gold_block');

    // Zen Koi Pond and Red Moon Bridge
    for (let x = -98; x <= -90; x++) {
      const archY = (x >= -95 && x <= -93) ? 3 : 2;
      for (let z = -102; z <= -98; z++) {
        this.setBlock(x, archY, z, 'oak_planks');
        if (z === -102 || z === -98) {
          this.setBlock(x, archY + 1, z, 'red_terracotta');
        }
      }
    }
    for (let x = -102; x <= -88; x++) {
      for (let z = -106; z <= -94; z++) {
        if (Math.hypot(x - (-94), z - (-100)) <= 6) {
          this.setBlock(x, 0, z, 'water');
        }
      }
    }

    // Red Torii Gates
    for (let y = 1; y <= 7; y++) {
      this.setBlock(-85, y, -76, 'red_terracotta');
      this.setBlock(-85, y, -70, 'red_terracotta');
    }
    for (let z = -78; z <= -68; z++) {
      this.setBlock(-85, 6, z, 'red_terracotta');
      this.setBlock(-85, 8, z, 'red_terracotta');
    }
    this.setBlock(-85, 5, -73, 'glowstone');

    // Dense Bamboo Groves & Sakura Cherry Blossoms
    const bambooSpots = [
      [-125, -95], [-128, -98], [-122, -92], [-130, -104],
      [-95, -125], [-92, -128], [-98, -122], [-104, -130]
    ];
    for (const [bx, bz] of bambooSpots) {
      this.buildBambooStalk(bx, 1, bz, 6 + (bx % 3));
    }

    const sakuraSpots = [
      [-118, -125], [-125, -118], [-102, -125], [-125, -102],
      [-75, -80], [-85, -105], [-105, -85], [-72, -95]
    ];
    for (const [sx, sz] of sakuraSpots) {
      this.buildSakuraTree(sx, 1, sz);
    }
  }

  // 6. Mexico Realm (South-West: Zócalo, Cathedral, Mesoamerican Aztec Step Pyramid, Adobe Village, Cacti)
  private buildMexicoRealm() {
    const cx = -105;
    const cz = 60;

    // Grand Zócalo Plaza (X in [cx - 24, cx + 24], Z in [cz - 24, cz + 24])
    for (let x = cx - 24; x <= cx + 24; x++) {
      for (let z = cz - 24; z <= cz + 24; z++) {
        const avenue = (x === cx || z === cz || Math.abs(x - cx) === 16 || Math.abs(z - cz) === 16);
        this.setBlock(x, 1, z, avenue ? 'smooth_stone' : ((x + z) % 6 === 0 ? 'red_sandstone' : 'terracotta_adobe'));
      }
    }

    // Central Stone Fountain in Zócalo
    for (let x = cx - 2; x <= cx + 2; x++) {
      for (let z = cz - 2; z <= cz + 2; z++) {
        this.setBlock(x, 2, z, (x === cx && z === cz) ? 'water' : 'quartz_block');
      }
    }
    this.setBlock(cx, 3, cz, 'glowstone');

    // Metropolitan Cathedral on North side of Zócalo
    for (let x = cx - 8; x <= cx + 8; x++) {
      for (let z = cz - 22; z <= cz - 10; z++) {
        const wall = (x === cx - 8 || x === cx + 8 || z === cz - 22 || z === cz - 10);
        for (let y = 2; y <= 11; y++) {
          if (wall || y === 11) {
            this.setBlock(x, y, z, y === 11 ? 'gold_block' : 'quartz_block');
          }
        }
      }
    }
    // Cathedral Twin Bell Towers
    for (const tx of [cx - 7, cx + 7]) {
      for (let y = 12; y <= 20; y++) {
        for (let dx = -1; dx <= 1; dx++) {
          for (let dz = -1; dz <= 1; dz++) {
            this.setBlock(tx + dx, y, cz - 21 + dz, 'quartz_pillar');
          }
        }
      }
      this.setBlock(tx, 21, cz - 21, 'gold_block');
      this.setBlock(tx, 22, cz - 21, 'glowstone');
    }

    // Palacio Nacional along West side of square
    for (let x = cx - 22; x <= cx - 12; x++) {
      for (let z = cz - 8; z <= cz + 12; z++) {
        const wall = (x === cx - 22 || x === cx - 12 || z === cz - 8 || z === cz + 12);
        for (let y = 2; y <= 6; y++) {
          if (wall || y === 6) this.setBlock(x, y, z, y === 6 ? 'red_sandstone' : 'terracotta_adobe');
        }
      }
    }

    // Colourful Mercado Stalls with Striped Canopies on East side
    const stallColors = ['redstone_block', 'emerald_block', 'gold_block', 'amethyst_block'];
    for (let i = 0; i < 4; i++) {
      const sx = cx + 12 + (i % 2) * 6;
      const sz = cz - 8 + Math.floor(i / 2) * 10;
      for (let dx = 0; dx <= 3; dx++) {
        for (let dz = 0; dz <= 3; dz++) {
          this.setBlock(sx + dx, 2, sz + dz, 'oak_fence');
          this.setBlock(sx + dx, 4, sz + dz, stallColors[i]);
        }
      }
      this.setBlock(sx + 1, 3, sz + 1, 'glowstone');
    }

    // Builder's Arena Terminal in Zócalo
    this.setBlock(cx, 2, cz + 16, 'crafting_table', { type: 'minigame' });
    this.setBlock(cx, 3, cz + 16, 'glowstone', { type: 'minigame' });
    this.setBlock(cx, 2, cz + 11, 'glowstone', {
      type: 'sign',
      title: 'Mexico City · Zócalo',
      text: 'Historic Cathedral square, Palacio Nacional, Mercado stalls, and the Builder’s Arena.'
    });

    // Chichén Itzá Mesoamerican Step Pyramid at (-140, 110)
    const pyrX = -140;
    const pyrZ = 110;
    const pyramidSteps = 8;
    for (let step = 0; step < pyramidSteps; step++) {
      const halfW = 16 - step * 2;
      const y = 1 + step * 2;
      for (let x = pyrX - halfW; x <= pyrX + halfW; x++) {
        for (let z = pyrZ - halfW; z <= pyrZ + halfW; z++) {
          const isEdge = (Math.abs(x - pyrX) >= halfW - 1 || Math.abs(z - pyrZ) >= halfW - 1);
          this.setBlock(x, y, z, isEdge ? 'stone_bricks' : 'smooth_stone');
          this.setBlock(x, y + 1, z, isEdge ? 'stone_bricks' : 'smooth_stone');
        }
      }
      // Central 4 Staircases ascending each facade
      for (let yOffset = 0; yOffset <= 1; yOffset++) {
        this.setBlock(pyrX, y + yOffset, pyrZ - halfW, 'quartz_block');
        this.setBlock(pyrX, y + yOffset, pyrZ + halfW, 'quartz_block');
        this.setBlock(pyrX - halfW, y + yOffset, pyrZ, 'quartz_block');
        this.setBlock(pyrX + halfW, y + yOffset, pyrZ, 'quartz_block');
      }
    }
    // Temple Sanctuary atop Step Pyramid (Y = 17 to 21)
    const topY = 1 + pyramidSteps * 2;
    for (let x = pyrX - 3; x <= pyrX + 3; x++) {
      for (let z = pyrZ - 3; z <= pyrZ + 3; z++) {
        const wall = (Math.abs(x - pyrX) === 3 || Math.abs(z - pyrZ) === 3);
        for (let y = topY; y <= topY + 4; y++) {
          if (wall || y === topY + 4) this.setBlock(x, y, z, 'stone_bricks');
        }
      }
    }
    this.setBlock(pyrX, topY + 5, pyrZ, 'gold_block');
    this.setBlock(pyrX, topY + 6, pyrZ, 'beacon');
    this.setBlock(pyrX, topY + 1, pyrZ, 'glowstone', {
      type: 'sign',
      title: 'Chichén Itzá Pyramid',
      text: 'Ancient Mesoamerican step pyramid temple overlooking the desert plateau.'
    });

    // Adobe Pueblo Dwellings around perimeter
    this.buildAdobeHouse(cx - 36, 1, cz + 10, 7, 7, 6);
    this.buildAdobeHouse(cx - 36, 1, cz + 24, 6, 6, 5);
    this.buildAdobeHouse(cx - 20, 1, cz + 28, 7, 6, 6);

    // Saguaro Cacti Groves across Mexican Plateau
    const cactiCoords = [
      [-80, 45], [-76, 65], [-84, 85], [-95, 95],
      [-125, 45], [-135, 65], [-150, 85], [-160, 110]
    ];
    for (const [x, z] of cactiCoords) {
      this.buildSaguaroCactus(x, 1, z);
    }
  }

  // 7. USA Realm (South-East / East: Neo York, Times Square, Lak Tower, Hollywood Hills)
  private buildUSARealm() {
    // Broadway Avenue: X in [97, 104], Z in [-32, 32]
    for (let x = 97; x <= 104; x++) {
      for (let z = -32; z <= 32; z++) {
        this.setBlock(x, 1, z, 'asphalt_road');
        if (x === 100 && Math.abs(z) % 4 <= 1) {
          this.setBlock(x, 1, z, 'smooth_stone');
        }
      }
    }

    // Sidewalks along Broadway: West [94, 96], East [105, 108]
    for (let z = -32; z <= 32; z++) {
      for (let x = 94; x <= 96; x++) this.setBlock(x, 1, z, 'stone_bricks');
      for (let x = 105; x <= 108; x++) this.setBlock(x, 1, z, 'stone_bricks');
      if (Math.abs(z) % 8 === 0) {
        this.setBlock(94, 2, z, 'iron_block');
        this.setBlock(94, 3, z, 'iron_block');
        this.setBlock(94, 4, z, 'glowstone');

        this.setBlock(105, 2, z, 'iron_block');
        this.setBlock(105, 3, z, 'iron_block');
        this.setBlock(105, 4, z, 'glowstone');
      }
    }

    // Cross Street at Z in [-2, 2], X in [90, 155]
    for (let x = 90; x <= 155; x++) {
      for (let z = -2; z <= 2; z++) {
        this.setBlock(x, 1, z, 'asphalt_road');
      }
    }

    // Skyscraper 1: AI & Applied Research Tower (X in [78, 92], Z in [-26, -8])
    const h1 = 32;
    for (let x = 78; x <= 92; x++) {
      for (let z = -26; z <= -8; z++) {
        const isPerimeter = (x === 78 || x === 92 || z === -26 || z === -8);
        const isCorner = (x === 78 || x === 92) && (z === -26 || z === -8);
        for (let y = 1; y <= h1; y++) {
          if (isCorner) {
            this.setBlock(x, y, z, 'stone_bricks');
          } else if (isPerimeter) {
            if (y === 1 && x === 92 && (z === -17 || z === -16)) {
              this.setBlock(x, y, z, 'cyber_glass');
            } else if (y % 4 === 0) {
              this.setBlock(x, y, z, 'stone_bricks');
            } else {
              this.setBlock(x, y, z, 'cyber_glass');
            }
          }
        }
        this.setBlock(x, 1, z, 'smooth_stone');
        this.setBlock(x, h1, z, 'smooth_stone');
      }
    }
    this.setBlock(85, 2, -17, 'crafting_table', { type: 'research', id: 'res-ai' });
    this.setBlock(85, 3, -17, 'bookshelf', { type: 'research', id: 'res-ai' });
    for (let y = h1 + 1; y <= h1 + 8; y++) this.setBlock(85, y, -17, 'iron_block');
    this.setBlock(85, h1 + 9, -17, 'glowstone');

    // Skyscraper 2: High-Tech Corporate Tower (X in [78, 92], Z in [8, 26])
    const h2 = 28;
    for (let x = 78; x <= 92; x++) {
      for (let z = 8; z <= 26; z++) {
        const isPerimeter = (x === 78 || x === 92 || z === 8 || z === 26);
        const isCorner = (x === 78 || x === 92) && (z === 8 || z === 26);
        for (let y = 1; y <= h2; y++) {
          if (isCorner) {
            this.setBlock(x, y, z, 'iron_block');
          } else if (isPerimeter) {
            this.setBlock(x, y, z, (y % 3 === 0) ? 'iron_block' : 'cyber_glass');
          }
        }
        this.setBlock(x, 1, z, 'smooth_stone');
        this.setBlock(x, h2, z, 'smooth_stone');
      }
    }
    this.setBlock(85, 2, 17, 'bookshelf', { type: 'experience', id: 'exp-genospark' });
    this.setBlock(85, 3, 17, 'glowstone', { type: 'experience', id: 'exp-genospark' });
    this.setBlock(87, 2, 17, 'bookshelf', { type: 'experience', id: 'exp-daa' });
    this.setBlock(87, 3, 17, 'gold_block', { type: 'experience', id: 'exp-daa' });

    // Skyscraper 3: Times Square Media Wall (X in [109, 114], Z in [-26, 26])
    const h3 = 18;
    for (let x = 109; x <= 114; x++) {
      for (let z = -26; z <= 26; z++) {
        const isPerimeter = (x === 109 || x === 114 || z === -26 || z === 26);
        for (let y = 1; y <= h3; y++) {
          if (isPerimeter) {
            this.setBlock(x, y, z, (y % 4 === 0) ? 'stone_bricks' : 'cyber_glass');
          }
        }
        this.setBlock(x, 1, z, 'smooth_stone');
        this.setBlock(x, h3, z, 'smooth_stone');
      }
    }

    // Interactive Project Pedestals along Broadway East Sidewalk at X = 107
    const projectPedestals = [
      { id: 'todar', z: -20, block: 'emerald_block' },
      { id: 'trackyourflight', z: -10, block: 'diamond_block' },
      { id: 'locateart', z: 0, block: 'gold_block' },
      { id: 'redgambit', z: 10, block: 'redstone_block' },
      { id: 'spiderverse', z: 20, block: 'amethyst_block' }
    ];
    projectPedestals.forEach(p => {
      this.setBlock(107, 1, p.z, 'smooth_stone');
      this.setBlock(107, 2, p.z, p.block, { type: 'project', id: p.id });
      this.setBlock(107, 3, p.z, 'glowstone', { type: 'project', id: p.id });
    });

    // Lak Tower ("LK" Monument Wonder: 55-block Eiffel tower at X = 150, Z = 0)
    this.buildLakTower(150, 0);

    // Hollywood Mountain & Illuminated Block-Built Sign at (130, -50)
    this.buildHollywoodMountain(130, -50);
  }

  // 8. Grand Carnival & Amusement Pier (South Ocean Pier: Ferris Wheel, Carousel, Coaster)
  private buildGrandCarnivalPier() {
    const startZ = 120;
    const endZ = 175;

    // Wide Ocean Pier Planks (X in [-20, 35], Z in [120, 175])
    for (let x = -20; x <= 35; x++) {
      for (let z = startZ; z <= endZ; z++) {
        this.setBlock(x, 1, z, 'oak_planks');
        if (x === -20 || x === 35 || z === endZ) {
          this.setBlock(x, 2, z, 'stone_bricks'); // Pier Railing
          if ((x + z) % 6 === 0) {
            this.setBlock(x, 3, z, 'glowstone');
          }
        }
      }
    }

    // Giant Ferris Wheel at (15, 145)
    const fwx = 15;
    const fwz = 145;
    const fwRadius = 14;
    const fwCenterY = 18;

    // A-Frame Support Legs
    for (let y = 1; y <= fwCenterY; y++) {
      const legSpan = Math.round(8 * (1 - y / fwCenterY));
      this.setBlock(fwx - 3, y, fwz - legSpan, 'iron_block');
      this.setBlock(fwx - 3, y, fwz + legSpan, 'iron_block');
      this.setBlock(fwx + 3, y, fwz - legSpan, 'iron_block');
      this.setBlock(fwx + 3, y, fwz + legSpan, 'iron_block');
    }
    // Axle
    for (let x = fwx - 3; x <= fwx + 3; x++) {
      this.setBlock(x, fwCenterY, fwz, 'iron_block');
    }

    // Ferris Wheel Rim & Spokes
    for (let deg = 0; deg < 360; deg += 15) {
      const rad = (deg * Math.PI) / 180;
      const ry = Math.round(fwCenterY + Math.sin(rad) * fwRadius);
      const rz = Math.round(fwz + Math.cos(rad) * fwRadius);
      this.setBlock(fwx - 2, ry, rz, 'gold_block');
      this.setBlock(fwx + 2, ry, rz, 'gold_block');
      // Crossbeams every 30 deg
      if (deg % 30 === 0) {
        this.setBlock(fwx, ry, rz, 'glowstone');
        // Passenger Gondolas at bottom/sides
        this.setBlock(fwx, ry - 1, rz, 'red_terracotta');
        this.setBlock(fwx, ry - 2, rz, 'gold_block');
      }
    }

    // Carnival Carousel at (-10, 138)
    const carX = -10;
    const carZ = 138;
    const carR = 6;
    for (let dx = -carR; dx <= carR; dx++) {
      for (let dz = -carR; dz <= carR; dz++) {
        const d = Math.hypot(dx, dz);
        if (d <= carR) {
          this.setBlock(carX + dx, 2, carZ + dz, 'smooth_stone');
          // Striped Tent Roof
          this.setBlock(carX + dx, 6, carZ + dz, (Math.atan2(dz, dx) > 0) ? 'red_terracotta' : 'quartz_block');
        }
      }
    }
    // Center Mirror Spire
    for (let y = 2; y <= 8; y++) {
      this.setBlock(carX, y, carZ, 'gold_block');
    }
    this.setBlock(carX, 9, carZ, 'beacon');
    // Carousel Horses (brass poles with colored saddles)
    const horseOffsets = [[-3, -3], [3, -3], [-3, 3], [3, 3], [0, -4], [0, 4]];
    for (const [hx, hz] of horseOffsets) {
      this.setBlock(carX + hx, 3, carZ + hz, 'iron_block');
      this.setBlock(carX + hx, 4, carZ + hz, 'gold_block');
      this.setBlock(carX + hx, 5, carZ + hz, 'iron_block');
    }

    // Wooden Rollercoaster Trestle & Drops at (25, 130 to 170)
    for (let z = 125; z <= 170; z++) {
      const trackY = Math.round(6 + Math.sin((z - 125) * 0.25) * 5 + ((z - 125) / 45) * 4);
      // Trestle legs
      for (let y = 1; y < trackY; y++) {
        if (z % 3 === 0) {
          this.setBlock(28, y, z, 'oak_fence');
          this.setBlock(30, y, z, 'oak_fence');
        }
      }
      // Track bed and rails
      this.setBlock(28, trackY, z, 'iron_block');
      this.setBlock(29, trackY, z, 'oak_planks');
      this.setBlock(30, trackY, z, 'iron_block');
      if (z % 4 === 0) {
        this.setBlock(29, trackY + 1, z, 'glowstone');
      }
    }

    // Carnival Game Stalls (Ring Toss, Balloon Pop, Popcorn) along (-15, 155 to 170)
    const gameColors = ['redstone_block', 'emerald_block', 'amethyst_block'];
    for (let i = 0; i < 3; i++) {
      const gz = 152 + i * 7;
      for (let x = -18; x <= -14; x++) {
        for (let z = gz; z <= gz + 4; z++) {
          this.setBlock(x, 2, z, 'oak_fence');
          this.setBlock(x, 4, z, gameColors[i]);
        }
      }
      this.setBlock(-16, 2, gz + 2, 'gold_block');
      this.setBlock(-16, 3, gz + 2, 'glowstone');
    }

    this.setBlock(fwx, 2, fwz - 12, 'glowstone', {
      type: 'sign',
      title: 'Grand Carnival Pier',
      text: 'Oceanfront festival with a giant illuminated Ferris Wheel, Carousel, and Rollercoaster.'
    });
  }

  // 9. Civic Quarter (School, Hospital, Police, Railway, Airport)
  private buildCivicAndAdventureDistricts() {
    this.buildDistrictLinks();
    this.buildSchool(50, 36);
    this.buildHospital(50, 58);
    this.buildPoliceStation(72, 60);
    this.buildRailwayStation(72, 42);
    this.buildAirport(130, 80);
    this.buildCityZoo(-38, -32);
    this.buildRapunzelCastle(-70, -34);
    this.buildEiffelTower(26, -38);
  }

  private buildDistrictLinks() {
    // Civic Boulevard running between School/Hospital (west) and Station/Police (east)
    for (let z = 24; z <= 68; z++) {
      for (let x = 60; x <= 62; x++) {
        this.setBlock(x, 1, z, 'smooth_stone');
      }
      if (z % 8 === 0) {
        this.setBlock(59, 2, z, 'stone_bricks');
        this.setBlock(59, 3, z, 'glowstone');
        this.setBlock(63, 2, z, 'stone_bricks');
        this.setBlock(63, 3, z, 'glowstone');
      }
    }

    // Station Avenue connecting to Airport
    for (let x = 62; x <= 118; x++) {
      for (let z = 41; z <= 43; z++) {
        this.setBlock(x, 1, z, 'smooth_stone');
      }
    }
    for (let z = 44; z <= 72; z++) {
      for (let x = 117; x <= 119; x++) {
        this.setBlock(x, 1, z, 'smooth_stone');
      }
    }
  }

  // 10. Sunset Saloon & Beach Bar
  private buildSunsetSaloonAndBar() {
    for (let x = 6; x <= 16; x++) {
      for (let z = 52; z <= 66; z++) {
        this.setBlock(x, 1, z, 'oak_planks');
        const isPerimeter = (x === 6 || x === 16 || z === 52 || z === 66);
        const isCorner = (x === 6 || x === 16) && (z === 52 || z === 66);

        for (let y = 2; y <= 6; y++) {
          if (isCorner) {
            this.setBlock(x, y, z, 'spruce_log');
          } else if (isPerimeter) {
            if (y <= 3 && x === 6 && z === 58) continue;
            if (y <= 3 && (x === 10 || x === 11) && z === 66) continue;
            if (y === 3 && (x === 9 || x === 13 || z === 52)) {
              this.setBlock(x, y, z, 'glass');
            } else {
              this.setBlock(x, y, z, 'oak_planks');
            }
          }
        }
        this.setBlock(x, 7, z, 'cobblestone');
      }
    }
    for (let x = 10; x <= 14; x++) {
      this.setBlock(x, 2, 55, 'oak_planks');
      this.setBlock(x, 2, 57, 'oak_stairs');
      this.setBlock(x, 3, 53, 'bookshelf');
      this.setBlock(x, 4, 53, 'glass');
    }
    this.setBlock(8, 2, 63, 'magma_block');
    this.setBlock(8, 2, 64, 'glowstone');
    for (let y = 2; y <= 9; y++) {
      this.setBlock(7, y, 63, 'stone_bricks');
      this.setBlock(7, y, 64, 'stone_bricks');
    }
    this.setBlock(10, 2, 58, 'crafting_table', { type: 'interests' });
    this.setBlock(10, 3, 58, 'bookshelf', { type: 'interests' });

    // Outdoor Deck
    for (let x = 17; x <= 24; x++) {
      for (let z = 54; z <= 66; z++) {
        this.setBlock(x, 1, z, 'oak_planks');
        if (x === 24 || z === 54 || z === 66) {
          this.setBlock(x, 2, z, 'stone_bricks');
        }
      }
    }
    this.setBlock(20, 2, 57, 'oak_fence');
    this.setBlock(20, 4, 57, 'gold_block');
    this.setBlock(20, 2, 63, 'oak_fence');
    this.setBlock(20, 4, 63, 'gold_block');
  }

  // 11. Palm Paradise Beach, Wooden Pier & The Merlion
  private buildPalmBeachAndOcean() {
    this.setBlock(-5, 1, 88, 'smooth_stone');
    this.setBlock(-5, 2, 88, 'gold_block', { type: 'chest' });
    this.setBlock(-5, 3, 88, 'glowstone', { type: 'chest' });
    this.setBlock(-5, 2, 89, 'glowstone', {
      type: 'sign',
      title: 'Ancient Resume Chest',
      text: "Open to inspect Lakshya's official resume and career portfolio."
    });

    // Leadership Pavilion
    for (let x = -18; x <= -6; x++) {
      for (let z = 80; z <= 92; z++) {
        this.setBlock(x, 2, z, 'quartz_block');
        if ((x === -18 || x === -6) && (z === 80 || z === 92)) {
          for (let y = 3; y <= 6; y++) this.setBlock(x, y, z, 'quartz_pillar');
        }
        this.setBlock(x, 7, z, 'quartz_block');
      }
    }
    this.setBlock(-12, 3, 86, 'gold_block', { type: 'leadership', id: 'exp-emcee' });
    this.setBlock(-12, 4, 86, 'glowstone', { type: 'leadership', id: 'exp-emcee' });

    // Singapore Merlion Statue at (15, 100)
    this.buildMerlionStatue(15, 100);

    // Anchored Sailing Ships
    this.buildSailingShip(-36, 1, 118);
    this.buildSailingShip(42, 1, 122);

    // Tropical Palms
    const palmTrees = [
      { x: -30, z: 76 }, { x: -20, z: 74 }, { x: -10, z: 78 },
      { x: 10, z: 76 }, { x: 26, z: 76 }, { x: -44, z: 88 }, { x: 34, z: 96 }
    ];
    palmTrees.forEach(pt => this.buildPalmTree(pt.x, 1, pt.z));
  }

  // 12. Flora & Tree Helpers
  private buildNatureAndFlora() {
    const heartlandFlowers = [
      { x: -18, z: -26, type: 'flower_rose' },
      { x: 18, z: -26, type: 'flower_dandelion' },
      { x: -18, z: 26, type: 'flower_tulip' },
      { x: 18, z: 26, type: 'flower_rose' }
    ];
    heartlandFlowers.forEach(f => {
      this.setBlock(f.x, 1, f.z, 'redstone_block');
    });
  }

  // Organic Procedural Tree Builders
  private buildBanyanTree(cx: number, baseY: number, cz: number) {
    // Massive thick trunk
    for (let dx = -1; dx <= 1; dx++) {
      for (let dz = -1; dz <= 1; dz++) {
        for (let y = baseY + 1; y <= baseY + 6; y++) {
          this.setBlock(cx + dx, y, cz + dz, 'oak_log');
        }
      }
    }
    // Hanging aerial roots / vines
    for (const [rx, rz] of [[cx - 3, cz], [cx + 3, cz], [cx, cz - 3], [cx, cz + 3]]) {
      for (let y = baseY + 1; y <= baseY + 5; y++) {
        this.setBlock(rx, y, rz, 'oak_fence');
      }
    }
    // Wide expansive canopy
    for (let y = baseY + 5; y <= baseY + 9; y++) {
      const radius = (y === baseY + 7) ? 5 : 4;
      for (let dx = -radius; dx <= radius; dx++) {
        for (let dz = -radius; dz <= radius; dz++) {
          if (Math.hypot(dx, dz) <= radius + 0.4) {
            this.setBlock(cx + dx, y, cz + dz, 'spruce_leaves');
          }
        }
      }
    }
    this.setBlock(cx, baseY + 10, cz, 'spruce_leaves');
  }

  private buildBambooStalk(cx: number, baseY: number, cz: number, height: number) {
    for (let y = baseY + 1; y <= baseY + height; y++) {
      this.setBlock(cx, y, cz, (y % 3 === 0) ? 'emerald_block' : 'oak_log');
    }
    this.setBlock(cx, baseY + height + 1, cz, 'sakura_leaves');
    this.setBlock(cx + 1, baseY + height, cz, 'sakura_leaves');
    this.setBlock(cx - 1, baseY + height, cz, 'sakura_leaves');
  }

  private buildSakuraTree(cx: number, baseY: number, cz: number) {
    for (let y = baseY + 1; y <= baseY + 5; y++) {
      this.setBlock(cx, y, cz, 'oak_log');
    }
    for (let y = baseY + 4; y <= baseY + 6; y++) {
      const radius = (y === baseY + 5) ? 3 : 2;
      for (let dx = -radius; dx <= radius; dx++) {
        for (let dz = -radius; dz <= radius; dz++) {
          if ((dx !== 0 || dz !== 0) && Math.hypot(dx, dz) <= radius + 0.3) {
            this.setBlock(cx + dx, y, cz + dz, 'sakura_leaves');
          }
        }
      }
    }
    this.setBlock(cx, baseY + 7, cz, 'sakura_leaves');
    this.setBlock(cx + 1, baseY + 1, cz + 1, 'sakura_leaves');
    this.setBlock(cx - 1, baseY + 1, cz - 1, 'sakura_leaves');
  }

  private buildCypressTree(x: number, baseY: number, z: number) {
    for (let y = baseY + 1; y <= baseY + 6; y++) {
      this.setBlock(x, y, z, 'spruce_log');
    }
    for (let y = baseY + 2; y <= baseY + 7; y++) {
      for (let dx = -1; dx <= 1; dx++) {
        for (let dz = -1; dz <= 1; dz++) {
          if ((dx !== 0 || dz !== 0) && Math.abs(dx) + Math.abs(dz) <= 1) {
            this.setBlock(x + dx, y, z + dz, 'spruce_leaves');
          }
        }
      }
    }
    this.setBlock(x, baseY + 8, z, 'spruce_leaves');
  }

  private buildRajasthaniChhatri(cx: number, baseY: number, cz: number) {
    const corners = [
      { dx: -2, dz: -2 }, { dx: 2, dz: -2 },
      { dx: -2, dz: 2 }, { dx: 2, dz: 2 }
    ];
    for (const c of corners) {
      for (let y = baseY + 1; y <= baseY + 4; y++) {
        this.setBlock(cx + c.dx, y, cz + c.dz, 'red_sandstone');
      }
    }
    for (let dx = -2; dx <= 2; dx++) {
      for (let dz = -2; dz <= 2; dz++) {
        this.setBlock(cx + dx, baseY + 5, cz + dz, 'red_sandstone');
      }
    }
    this.setBlock(cx, baseY + 6, cz, 'gold_block');
    this.setBlock(cx, baseY + 4, cz, 'glowstone');
  }

  private buildSaguaroCactus(x: number, baseY: number, z: number) {
    this.setBlock(x, baseY + 1, z, 'emerald_block');
    this.setBlock(x, baseY + 2, z, 'emerald_block');
    this.setBlock(x, baseY + 3, z, 'emerald_block');
    this.setBlock(x, baseY + 4, z, 'emerald_block');
    this.setBlock(x - 1, baseY + 2, z, 'emerald_block');
    this.setBlock(x - 1, baseY + 3, z, 'emerald_block');
    this.setBlock(x + 1, baseY + 3, z, 'emerald_block');
    this.setBlock(x + 1, baseY + 4, z, 'emerald_block');
    this.setBlock(x, baseY + 5, z, 'redstone_block');
  }

  private buildAdobeHouse(bx: number, baseY: number, bz: number, w: number, d: number, h: number) {
    for (let x = bx; x < bx + w; x++) {
      for (let z = bz; z < bz + d; z++) {
        const isPerimeter = (x === bx || x === bx + w - 1 || z === bz || z === bz + d - 1);
        for (let y = baseY; y < baseY + h; y++) {
          if (isPerimeter) {
            if (y <= baseY + 2 && x === bx + Math.floor(w / 2) && z === bz + d - 1) continue;
            if (y === baseY + h - 2 && (x % 2 === 0)) {
              this.setBlock(x, y, z, 'oak_log');
            } else {
              this.setBlock(x, y, z, 'terracotta_adobe');
            }
          }
        }
        this.setBlock(x, baseY + h - 1, z, 'red_sandstone');
      }
    }
  }

  private buildPalmTree(cx: number, baseY: number, cz: number) {
    for (let y = 1; y <= 7; y++) {
      const xOffset = Math.floor(y / 3);
      this.setBlock(cx + xOffset, baseY + y, cz, 'palm_wood');
    }
    const topX = cx + 2;
    const topY = baseY + 8;
    this.setBlock(topX, topY, cz, 'palm_leaves');
    const fronds = [
      { dx: 2, dz: 0 }, { dx: -2, dz: 0 }, { dx: 0, dz: 2 }, { dx: 0, dz: -2 },
      { dx: 2, dz: 2 }, { dx: -2, dz: -2 }, { dx: 2, dz: -2 }, { dx: -2, dz: 2 }
    ];
    for (const f of fronds) {
      this.setBlock(topX + f.dx, topY, cz + f.dz, 'palm_leaves');
      this.setBlock(topX + Math.round(f.dx * 1.5), topY - 1, cz + Math.round(f.dz * 1.5), 'palm_leaves');
    }
  }

  private buildMerlionStatue(cx: number, cz: number) {
    for (let y = 1; y <= 7; y++) {
      const radius = (y <= 3) ? 2 : 1.5;
      for (let dx = -2; dx <= 2; dx++) {
        for (let dz = -2; dz <= 2; dz++) {
          if (Math.hypot(dx, dz) <= radius) {
            this.setBlock(cx + dx, y, cz + dz, 'prismarine_bricks');
          }
        }
      }
    }
    for (let y = 8; y <= 12; y++) {
      for (let dx = -2; dx <= 2; dx++) {
        for (let dz = -2; dz <= 2; dz++) {
          this.setBlock(cx + dx, y, cz + dz, 'quartz_block');
        }
      }
    }
    this.setBlock(cx - 1, 10, cz + 2, 'gold_block');
    this.setBlock(cx + 1, 10, cz + 2, 'gold_block');
    this.setBlock(cx, 13, cz, 'gold_block');
    for (let i = 0; i <= 6; i++) {
      this.setBlock(cx, Math.max(1, 10 - i), cz + 3 + i, 'water');
    }
  }

  private buildSailingShip(cx: number, baseY: number, cz: number) {
    for (let dz = -6; dz <= 6; dz++) {
      const width = Math.max(1, 3 - Math.floor(Math.abs(dz) / 2.5));
      for (let dx = -width; dx <= width; dx++) {
        this.setBlock(cx + dx, baseY + 1, cz + dz, 'oak_planks');
        if (Math.abs(dx) === width || Math.abs(dz) === 6) {
          this.setBlock(cx + dx, baseY + 2, cz + dz, 'spruce_log');
        }
      }
    }
    for (let y = baseY + 3; y <= baseY + 15; y++) {
      this.setBlock(cx, y, cz, 'spruce_log');
    }
    for (let y = baseY + 7; y <= baseY + 13; y++) {
      const sW = (y === baseY + 10) ? 4 : 3;
      for (let dx = -sW; dx <= sW; dx++) {
        this.setBlock(cx + dx, y, cz - 1, 'quartz_block');
      }
    }
    this.setBlock(cx, baseY + 14, cz, 'oak_planks');
    this.setBlock(cx, baseY + 16, cz, 'glowstone');
  }

  private buildLakTower(cx: number, cz: number) {
    const legOffsets = [
      { dx: -4, dz: -4 }, { dx: 4, dz: -4 },
      { dx: -4, dz: 4 }, { dx: 4, dz: 4 }
    ];
    for (let y = 1; y <= 16; y++) {
      const taper = (y / 16) * 2.2;
      for (const leg of legOffsets) {
        const lx = Math.round(cx + (leg.dx > 0 ? leg.dx - taper : leg.dx + taper));
        const lz = Math.round(cz + (leg.dz > 0 ? leg.dz - taper : leg.dz + taper));
        this.setBlock(lx, y, lz, 'iron_block');
        this.setBlock(lx, y, lz + (leg.dz > 0 ? -1 : 1), 'stone_bricks');
      }
    }
    for (let x = cx - 4; x <= cx + 4; x++) {
      for (let z = cz - 4; z <= cz + 4; z++) {
        this.setBlock(x, 16, z, 'iron_block');
        if (Math.abs(x - cx) === 4 || Math.abs(z - cz) === 4) {
          this.setBlock(x, 17, z, 'stone_bricks');
        }
      }
    }
    for (let y = 18; y <= 23; y++) this.setBlock(cx - 4, y, cz - 2, 'glowstone');
    this.setBlock(cx - 4, 18, cz - 1, 'glowstone');
    for (let y = 18; y <= 23; y++) this.setBlock(cx - 4, y, cz + 1, 'glowstone');
    this.setBlock(cx - 4, 21, cz + 2, 'glowstone');
    this.setBlock(cx - 4, 23, cz + 3, 'glowstone');
    this.setBlock(cx - 4, 19, cz + 3, 'glowstone');

    for (let y = 17; y <= 36; y++) {
      const taper = Math.round(((y - 17) / 20) * 1.5);
      const span = Math.max(1, 2 - taper);
      for (let x = cx - span; x <= cx + span; x++) {
        for (let z = cz - span; z <= cz + span; z++) {
          if (Math.abs(x - cx) === span || Math.abs(z - cz) === span) {
            this.setBlock(x, y, z, (y % 3 === 0) ? 'glowstone' : 'iron_block');
          }
        }
      }
    }
    for (let x = cx - 2; x <= cx + 2; x++) {
      for (let z = cz - 2; z <= cz + 2; z++) {
        this.setBlock(x, 36, z, 'gold_block');
      }
    }
    for (let y = 37; y <= 55; y++) {
      this.setBlock(cx, y, cz, (y % 4 === 0) ? 'glowstone' : 'iron_block');
    }
    this.setBlock(cx, 56, cz, 'beacon');
  }

  private buildHollywoodMountain(cx: number, cz: number) {
    const radiusX = 22;
    const radiusZ = 14;
    const peakHeight = 24;
    const ridgeHeight = (dx: number, dz: number) => {
      const distance = Math.hypot(dx / radiusX, dz / radiusZ);
      return distance >= 1 ? 0 : Math.max(0, Math.round(peakHeight * (1 - distance)));
    };

    for (let dx = -radiusX; dx <= radiusX; dx++) {
      for (let dz = -radiusZ; dz <= radiusZ; dz++) {
        const height = ridgeHeight(dx, dz);
        const x = cx + dx;
        const z = cz + dz;
        if (!height) continue;

        for (let y = 1; y <= height; y++) {
          const block = y === height
            ? (height > 20 ? 'stone_bricks' : height > 9 ? 'terracotta_adobe' : 'red_sandstone')
            : (y > 18 ? 'stone_bricks' : 'red_sandstone');
          this.setBlock(x, y, z, block);
        }
      }
    }

    let lastPathY = 2;
    for (let z = cz + radiusZ; z >= cz; z--) {
      const height = ridgeHeight(2, z - cz);
      const pathY = Math.max(lastPathY, height + 1);
      this.setBlock(cx + 2, pathY, z, 'smooth_stone');
      if ((cz - z) % 4 === 0) {
        this.setBlock(cx + 1, pathY + 1, z, 'oak_fence');
        this.setBlock(cx + 3, pathY + 1, z, 'oak_fence');
        if ((cz - z) % 8 === 0) this.setBlock(cx + 3, pathY + 2, z, 'glowstone');
      }
      lastPathY = pathY;
    }

    const letters: Record<string, string[]> = {
      H: ['101', '101', '111', '101', '101'],
      O: ['111', '101', '101', '101', '111'],
      L: ['100', '100', '100', '100', '111'],
      Y: ['101', '101', '010', '010', '010'],
      W: ['101', '101', '101', '111', '101'],
      D: ['110', '101', '101', '101', '110']
    };
    const signDepth = 6;
    const signZ = cz + signDepth;
    const word = 'HOLLYWOOD';
    const signStartX = cx - 18;
    word.split('').forEach((letter, index) => {
      const glyph = letters[letter];
      for (let col = 0; col < 3; col++) {
        const dx = signStartX + index * 4 + col - cx;
        const groundY = ridgeHeight(dx, signDepth);
        const baseY = Math.max(1, groundY);
        for (let row = 0; row < 5; row++) {
          if (glyph[row][col] === '1') {
            this.setBlock(signStartX + index * 4 + col, baseY + 6 - row, signZ, 'quartz_block');
          }
        }
      }
    });

    this.setBlock(cx + 2, 2, cz + radiusZ, 'glowstone', {
      type: 'sign',
      title: 'Hollywood Hills Trail',
      text: 'Follow the lit ridge path to the Hollywood sign and summit overlook.'
    });
    this.setBlock(cx, peakHeight + 1, cz, 'beacon');
  }

  private buildHospital(cx: number, cz: number) {
    for (let x = cx - 7; x <= cx + 7; x++) {
      for (let z = cz - 7; z <= cz + 7; z++) {
        this.setBlock(x, 1, z, 'quartz_block');
        const wall = x === cx - 7 || x === cx + 7 || z === cz - 7 || z === cz + 7;
        for (let y = 2; y <= 9; y++) {
          if (wall) this.setBlock(x, y, z, y === 9 ? 'stone_bricks' : ((x + z + y) % 4 === 0 ? 'cyber_glass' : 'quartz_block'));
        }
        if (x === cx - 7 || x === cx + 7 || z === cz - 7 || z === cz + 7) this.setBlock(x, 10, z, 'quartz_block');
      }
    }
    for (let y = 5; y <= 8; y++) this.setBlock(cx + 7, y, cz, 'redstone_block');
    for (let z = cz - 2; z <= cz + 2; z++) this.setBlock(cx + 7, 6, z, 'redstone_block');
    this.setBlock(cx + 7, 2, cz - 3, 'glass');
    this.setBlock(cx + 7, 2, cz - 2, 'glass');
    this.setBlock(cx, 1, cz + 8, 'smooth_stone');
    this.setBlock(cx, 2, cz + 8, 'redstone_block');
    this.setBlock(cx + 7, 2, cz + 4, 'glowstone', {
      type: 'sign',
      title: 'Crossroads General Hospital',
      text: 'Community hospital and emergency care center.'
    });
  }

  private buildPoliceStation(cx: number, cz: number) {
    for (let x = cx - 7; x <= cx + 7; x++) {
      for (let z = cz - 7; z <= cz + 7; z++) {
        this.setBlock(x, 1, z, 'smooth_stone');
        const wall = x === cx - 7 || x === cx + 7 || z === cz - 7 || z === cz + 7;
        for (let y = 2; y <= 7; y++) {
          if (wall) this.setBlock(x, y, z, y === 7 ? 'stone_bricks' : ((x + z) % 3 === 0 ? 'cyber_glass' : 'stone_bricks'));
        }
        if (x === cx - 7 || x === cx + 7 || z === cz - 7 || z === cz + 7) this.setBlock(x, 8, z, 'iron_block');
      }
    }
    for (let z = cz - 4; z <= cz + 4; z++) this.setBlock(cx - 7, 6, z, 'lapis_block');
    for (let z = cz - 2; z <= cz + 2; z++) this.setBlock(cx - 7, 2, z, 'glass');
    this.setBlock(cx - 7, 2, cz + 4, 'glowstone', {
      type: 'sign',
      title: 'Crossroads Police Station',
      text: 'Public safety station serving the southern districts.'
    });
    this.setBlock(cx, 9, cz, 'iron_block');
    this.setBlock(cx, 10, cz, 'redstone_block');
  }

  private buildSchool(cx: number, cz: number) {
    for (let x = cx - 7; x <= cx + 7; x++) {
      for (let z = cz - 7; z <= cz + 7; z++) {
        this.setBlock(x, 1, z, 'oak_planks');
        const wall = x === cx - 7 || x === cx + 7 || z === cz - 7 || z === cz + 7;
        for (let y = 2; y <= 7; y++) {
          if (wall) this.setBlock(x, y, z, y === 7 ? 'red_sandstone' : ((x + z) % 4 === 0 ? 'glass' : 'terracotta_adobe'));
        }
        if (x === cx - 7 || x === cx + 7 || z === cz - 7 || z === cz + 7) this.setBlock(x, 8, z, 'red_sandstone');
      }
    }
    for (let z = cz - 5; z <= cz - 3; z++) this.setBlock(cx + 7, 3, z, 'glass');
    for (let z = cz + 3; z <= cz + 5; z++) this.setBlock(cx + 7, 3, z, 'glass');
    for (let z = cz - 4; z <= cz + 4; z += 2) {
      this.setBlock(cx - 5, 2, z, 'bookshelf');
      this.setBlock(cx + 5, 2, z, 'bookshelf');
    }
    this.setBlock(cx, 9, cz, 'gold_block');
    this.setBlock(cx + 7, 2, cz, 'glowstone', {
      type: 'sign',
      title: 'Crossroads Public School',
      text: 'A neighborhood school with a bright library and open courtyard.'
    });
  }

  private buildCityZoo(cx: number, cz: number) {
    for (let x = cx - 12; x <= cx + 12; x++) {
      for (let z = cz - 10; z <= cz + 10; z++) {
        this.setBlock(x, 1, z, ((x + z) % 5 === 0) ? 'grass' : 'oak_planks');
        if (x === cx - 12 || x === cx + 12 || z === cz - 10 || z === cz + 10) {
          this.setBlock(x, 2, z, 'oak_fence');
          this.setBlock(x, 3, z, 'oak_fence');
        }
      }
    }
    for (const x of [cx - 4, cx + 4]) {
      for (let z = cz - 8; z <= cz + 8; z++) {
        if (z < cz - 2 || z > cz + 2) this.setBlock(x, 2, z, 'oak_fence');
      }
    }
    for (let x = cx - 10; x <= cx + 10; x++) {
      if (x < cx - 2 || x > cx + 2) this.setBlock(x, 2, cz, 'oak_fence');
    }
    for (let x = cx - 10; x <= cx - 6; x++) {
      for (let z = cz - 3; z <= cz + 2; z++) this.setBlock(x, 2, z, 'water');
    }
    for (const [x, z] of [[cx - 8, cz - 7], [cx + 8, cz - 7], [cx - 8, cz + 7], [cx + 8, cz + 7]]) {
      this.buildCypressTree(x, 1, z);
    }
    this.setBlock(cx, 2, cz + 9, 'glowstone', {
      type: 'sign',
      title: 'Crossroads Wildlife Park',
      text: 'A wooded city zoo with animal habitats, a pond, and shady family trails.'
    });
    this.setBlock(cx, 2, cz, 'gold_block');
  }

  private buildRapunzelCastle(cx: number, cz: number) {
    for (let x = cx - 10; x <= cx + 10; x++) {
      for (let z = cz - 10; z <= cz + 10; z++) {
        this.setBlock(x, 1, z, 'stone_bricks');
        if (Math.abs(x - cx) === 10 || Math.abs(z - cz) === 10) {
          for (let y = 2; y <= 8; y++) this.setBlock(x, y, z, 'stone_bricks');
        }
      }
    }
    for (let y = 2; y <= 5; y++) {
      this.setBlock(cx - 2, y, cz + 10, 'red_sandstone');
      this.setBlock(cx + 2, y, cz + 10, 'red_sandstone');
    }
    for (let x = cx - 2; x <= cx + 2; x++) this.setBlock(x, 6, cz + 10, 'red_sandstone');
    for (let x = cx - 4; x <= cx + 4; x++) {
      for (let z = cz - 4; z <= cz + 4; z++) {
        for (let y = 2; y <= 13; y++) {
          if (Math.abs(x - cx) >= 3 || Math.abs(z - cz) >= 3 || y === 2 || y === 13) this.setBlock(x, y, z, 'stone_bricks');
        }
      }
    }
    for (let y = 14; y <= 29; y++) {
      for (let dx = -2; dx <= 2; dx++) {
        for (let dz = -2; dz <= 2; dz++) {
          if (Math.abs(dx) === 2 || Math.abs(dz) === 2) this.setBlock(cx + dx, y, cz + dz, 'quartz_pillar');
        }
      }
    }
    for (let y = 8; y <= 27; y++) this.setBlock(cx + 3, y, cz + 2, 'gold_block');
    this.setBlock(cx + 3, 7, cz + 2, 'glowstone');
    for (const [x, z] of [[cx - 10, cz - 10], [cx + 10, cz - 10], [cx - 10, cz + 10], [cx + 10, cz + 10]]) {
      for (let y = 2; y <= 11; y++) this.setBlock(x, y, z, 'red_sandstone');
      this.setBlock(x, 12, z, 'gold_block');
    }
    this.setBlock(cx, 2, cz + 10, 'glowstone', {
      type: 'sign',
      title: 'Rapunzel’s Castle',
      text: 'A fairytale keep with a high lantern tower and a golden braid cascading into its gardens.'
    });
  }

  private buildEiffelTower(cx: number, cz: number) {
    for (let y = 1; y <= 16; y++) {
      const span = Math.max(2, Math.round(7 - (y - 1) * 0.35));
      for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
        this.setBlock(cx + sx * span, y, cz + sz * span, 'iron_block');
        if (y % 4 === 0) this.setBlock(cx + sx * span, y, cz + sz * (span - 1), 'red_sandstone');
      }
    }
    for (const [y, span] of [[6, 6], [12, 4], [18, 2]]) {
      for (let x = cx - span; x <= cx + span; x++) {
        for (let z = cz - span; z <= cz + span; z++) {
          if (Math.abs(x - cx) === span || Math.abs(z - cz) === span) this.setBlock(x, y, z, 'iron_block');
        }
      }
    }
    for (let y = 19; y <= 32; y++) {
      const span = Math.max(1, Math.round(2 - (y - 19) * 0.1));
      for (let x = cx - span; x <= cx + span; x++) {
        for (let z = cz - span; z <= cz + span; z++) {
          if (Math.abs(x - cx) === span || Math.abs(z - cz) === span) this.setBlock(x, y, z, 'iron_block');
        }
      }
    }
    for (let y = 33; y <= 45; y++) this.setBlock(cx, y, cz, y % 3 === 0 ? 'glowstone' : 'iron_block');
    this.setBlock(cx, 46, cz, 'beacon');
    for (let x = cx - 8; x <= cx + 8; x++) {
      this.setBlock(x, 1, cz + 8, 'smooth_stone');
      if (x % 4 === 0) this.setBlock(x, 2, cz + 8, 'glowstone');
    }
    this.setBlock(cx, 2, cz + 8, 'glowstone', {
      type: 'sign',
      title: 'Eiffel Tower',
      text: 'A Paris landmark rising above the northern garden avenue.'
    });
  }

  private buildAirport(cx: number, cz: number) {
    // Lighted Runway (X in [cx - 16, cx + 18], Z in [cz + 2, cz + 8])
    for (let x = cx - 16; x <= cx + 18; x++) {
      for (let z = cz + 2; z <= cz + 8; z++) {
        this.setBlock(x, 1, z, 'asphalt_road');
      }
      this.setBlock(x, 2, cz + 2, 'glowstone');
      this.setBlock(x, 2, cz + 8, 'glowstone');
      if (x % 4 === 0) this.setBlock(x, 2, cz + 5, 'smooth_stone');
    }
    for (let x = cx - 2; x <= cx + 2; x++) this.setBlock(x, 2, cz + 2, 'quartz_block');

    // Terminal Concourse
    for (let x = cx - 12; x <= cx + 6; x++) {
      for (let z = cz - 9; z <= cz - 1; z++) {
        this.setBlock(x, 1, z, 'smooth_stone');
        const wall = x === cx - 12 || x === cx + 6 || z === cz - 9 || z === cz - 1;
        for (let y = 2; y <= 6; y++) if (wall) this.setBlock(x, y, z, y === 6 ? 'quartz_block' : 'cyber_glass');
        if (wall) this.setBlock(x, 7, z, 'quartz_block');
      }
    }
    // Control tower
    for (let y = 2; y <= 12; y++) this.setBlock(cx + 6, y, cz - 4, 'quartz_pillar');
    for (let x = cx + 3; x <= cx + 9; x++) {
      for (let z = cz - 7; z <= cz - 1; z++) {
        if (x === cx + 3 || x === cx + 9 || z === cz - 7 || z === cz - 1) this.setBlock(x, 13, z, 'cyber_glass');
      }
    }
    for (let x = cx + 2; x <= cx + 10; x++) this.setBlock(x, 14, cz - 4, 'quartz_block');
    this.setBlock(cx + 6, 16, cz - 4, 'iron_block');
    this.setBlock(cx + 6, 17, cz - 4, 'glowstone');
    this.setBlock(cx - 6, 2, cz - 10, 'glowstone', {
      type: 'sign',
      title: 'Crossroads International Airport',
      text: 'Runway, glass terminal, and rooftop control tower connect every corner of the island.'
    });
  }

  private buildRailwayStation(cx: number, cz: number) {
    for (let x = cx - 10; x <= cx + 10; x++) {
      for (let z = cz - 4; z <= cz + 4; z++) {
        this.setBlock(x, 1, z, 'smooth_stone');
        if (z === cz - 4 || z === cz + 4) this.setBlock(x, 2, z, 'stone_bricks');
        if (z === cz - 3 || z === cz + 3) this.setBlock(x, 2, z, 'glowstone');
      }
    }
    for (let x = cx - 6; x <= cx + 6; x++) {
      for (let z = cz - 10; z <= cz - 5; z++) {
        this.setBlock(x, 1, z, 'stone_bricks');
        const wall = x === cx - 6 || x === cx + 6 || z === cz - 10 || z === cz - 5;
        for (let y = 2; y <= 6; y++) {
          if (wall) this.setBlock(x, y, z, y === 6 ? 'oak_planks' : ((x + z) % 3 === 0 ? 'glass' : 'oak_planks'));
        }
        if (wall) this.setBlock(x, 7, z, 'oak_planks');
      }
    }
    for (let x = cx - 10; x <= cx + 10; x++) {
      this.setBlock(x, 8, cz - 4, 'oak_planks');
      this.setBlock(x, 8, cz + 4, 'oak_planks');
    }
    for (const x of [cx - 8, cx - 2, cx + 4, cx + 8]) {
      for (let y = 2; y <= 7; y++) {
        this.setBlock(x, y, cz - 3, 'quartz_pillar');
        this.setBlock(x, y, cz + 3, 'quartz_pillar');
      }
    }
    this.setBlock(cx, 2, cz - 11, 'glowstone', {
      type: 'sign',
      title: 'Crossroads Central Station',
      text: 'Live rail service connects this station directly to the airport terminal.'
    });
    this.setBlock(cx - 2, 2, cz - 6, 'bookshelf');
    this.setBlock(cx + 2, 2, cz - 6, 'bookshelf');
    this.setBlock(cx, 2, cz - 6, 'gold_block');
  }
}
