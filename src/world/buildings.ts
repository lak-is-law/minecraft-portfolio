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
    this.buildLondonRealm();
    this.buildParisDistrict();
    this.buildTokyoShibuyaRealm();
    this.buildSeoulRealm();
    this.buildChinaRealm();
    this.buildEgyptGizaRealm();
    this.buildDubaiRealm();
    this.buildMexicoRealm();
    this.buildUSARealm();
    this.buildGrandCarnivalPier();
    this.buildCivicAndAdventureDistricts();
    this.buildSunsetSaloonAndBar();
    this.buildPalmBeachAndOcean();
    this.buildNatureAndFlora();
  }

  // Deterministic Biome Topography Elevation Engine
  public getTerrainHeight(x: number, z: number): number {
    const ax = Math.abs(x);
    const az = Math.abs(z);
    const dCorner = Math.hypot(Math.max(0, ax - 145), Math.max(0, az - 145));

    // Ocean beyond coastline
    if (ax > 200 || az > 200 || dCorner > 55) {
      return 0; // Ocean water at Y = 0
    }
    // Sandy beach shoreline
    if (ax > 192 || az > 192 || dCorner > 48) {
      return 1; // Sandy beach
    }

    const dist = Math.hypot(x, z);

    // 1. Central Citadel Plaza (R < 18)
    if (dist < 18) {
      return 1;
    }
    // 2. Citadel Moat (18 <= dist <= 23)
    if (dist <= 23) {
      if (Math.abs(x) <= 2 || Math.abs(z) <= 2) {
        return 1; // Bridges crossing the moat
      }
      return 0; // Water moat
    }

    // 3. South Coast, Harbor Water Bays & Carnival Pier (Z >= 85)
    if (z >= 85) {
      // Deep ocean harbor bays where ships float at water level Y = 0
      if ((x >= -65 && x <= -22 && z >= 115) || (x >= 40 && x <= 75 && z >= 115)) {
        return 0;
      }
      return 1;
    }

    // 4. North-West: China, Tokyo, Seoul Mountain Ridge
    if (x <= -20 && z <= -35) {
      // Seoul Namsan knoll for N Seoul Tower
      if (x >= -65 && x <= -40 && z >= -125 && z <= -105) {
        const towerKnoll = Math.hypot((x - (-52)) / 10, (z - (-115)) / 8);
        if (towerKnoll <= 1) {
          return Math.round(12 * Math.pow(1 - towerKnoll, 1.2)) + 2;
        }
      }

      // Tokyo leveled city ground
      if (x <= -140 && z >= -95 && z <= -65) {
        return 1;
      }

      const ridgeZ = -140 + Math.sin((x + 150) * 0.075) * 12 + Math.cos(x * 0.12) * 3;
      const distToRidge = Math.abs(z - ridgeZ);
      if (x >= -165 && x <= -70 && distToRidge <= 26) {
        const profile = Math.max(0, 1 - distToRidge / 26);
        const crest = 4 + (9 + Math.sin(x * 0.14) * 3) * Math.pow(profile, 1.25);
        return Math.round(crest);
      }
      // Bamboo misty valley between mountain spurs (Pagoda site at -110, -110)
      const valDist = Math.hypot(x - (-110), z - (-105));
      if (valDist < 25) {
        return 2;
      }
      const hill = 2 + Math.sin(x * 0.06) * 1.5 + Math.cos(z * 0.06) * 1.5;
      return Math.max(1, Math.round(hill));
    }

    // 5. South-West: Mexico Canyon Mesas & Egypt Giza Dunes
    if (x <= -20 && z >= 20) {
      // Egypt Giza Plateau (X <= -145, Z in [15, 60])
      if (x <= -145 && z >= 15 && z <= 60) {
        return 1;
      }
      // Mesa 1 terrace around Zócalo:
      if (x >= -135 && x <= -75 && z >= 35 && z <= 75) {
        if (Math.hypot(x - (-95), z - 55) <= 22) {
          return 2; // Leveled Zócalo plaza floor
        }
        return 5; // Surrounding canyon mesa bluff
      }
      // Mesa 2 (Grand Pyramid Mesa terrace):
      if (x >= -160 && x <= -120 && z >= 85 && z <= 135) {
        return 5; // Step pyramid terrace
      }
      // Rolling desert dunes
      const dune = 1.6 + Math.sin(x * 0.08) * 1.2 + Math.cos(z * 0.08) * 1.0;
      return Math.max(1, Math.min(4, Math.round(dune)));
    }

    // 6. East: USA Realm & Dubai Palm (X in [105, 195], Z in [-80, 65])
    if (x >= 105) {
      // Dubai Palm frond lagoons
      if (x >= 165 && x <= 195 && z >= 25 && z <= 60) {
        if ((Math.abs(z - 42) % 6 <= 1) && x >= 172) {
          return 0; // Lagoon water
        }
        return 1;
      }
      // Hollywood Hills
      if (x <= 160 && z >= -80 && z <= -25) {
        const hillDist = Math.hypot((x - 132) / 22, (z - (-52)) / 16);
        if (hillDist <= 1) {
          const peak = Math.round(20 * Math.pow(1 - hillDist, 1.1));
          return Math.max(2, peak);
        }
      }
    }

    // 7. North-East: India River Plains & Meandering Yamuna Riverbed
    if (x >= 20 && z <= -35) {
      const riverX = 75 + Math.sin((z + 100) * 0.055) * 16 + Math.cos(z * 0.12) * 5;
      const distToRiver = Math.abs(x - riverX);

      // River channel (water at Y = 0)
      if (distToRiver <= 4.5 && z <= -60) {
        return 0;
      }
      // Riverbanks sloping up
      if (distToRiver <= 7.5 && z <= -60) {
        return 1;
      }
      // Taj Mahal terrace at (80, -135)
      if (Math.hypot(x - 80, z - (-135)) <= 24) {
        return 2;
      }
      // Alluvial fertile plains
      const plain = 2 + Math.sin(x * 0.05) * 0.8 + Math.cos(z * 0.05) * 0.8;
      return Math.max(1, Math.round(plain));
    }

    // 8. Downtown Neo York City Blocks, Station & Airport District
    if (x >= 25 && z >= -30 && z <= 95) {
      return 1;
    }

    return 1;
  }

  // 1. Expanded Island Terrain with Organic Topography
  private buildExpandedIslandTerrain() {
    const min = -225;
    const max = 225;

    for (let x = min; x <= max; x++) {
      for (let z = min; z <= max; z++) {
        const ax = Math.abs(x);
        const az = Math.abs(z);
        const dCorner = Math.hypot(Math.max(0, ax - 145), Math.max(0, az - 145));
        const isOcean = (ax > 200 || az > 200 || dCorner > 55);

        // Bedrock foundation everywhere inside world boundary
        this.setBlock(x, -2, z, 'bedrock');

        if (isOcean) {
          this.setBlock(x, -1, z, 'sand');
          this.setBlock(x, 0, z, 'water');
          continue;
        }

        const h = this.getTerrainHeight(x, z);

        // Water cells inside the island (moat or river)
        if (h === 0) {
          const dist = Math.hypot(x, z);
          const isMoat = (dist >= 18 && dist <= 23);
          this.setBlock(x, -1, z, isMoat ? 'stone_bricks' : 'sand');
          this.setBlock(x, 0, z, 'water');
          continue;
        }

        // Solid land cells (H >= 1)
        const lowestNeighbor = Math.min(
          this.getTerrainHeight(x + 1, z),
          this.getTerrainHeight(x - 1, z),
          this.getTerrainHeight(x, z + 1),
          this.getTerrainHeight(x, z - 1)
        );
        const bottomY = Math.max(-1, Math.min(h - 2, lowestNeighbor));

        for (let y = bottomY; y < h; y++) {
          let subType = 'dirt';
          if (x >= 20 && z <= -35) {
            subType = 'red_sandstone'; // India sub-base
          } else if (x <= -20 && z <= -35) {
            subType = (h >= 6) ? 'stone_bricks' : 'dirt'; // China mountain rock
          } else if (x <= -20 && z >= 20) {
            // Mexico stratified badlands
            subType = (y <= 0) ? 'red_sandstone' : (y <= 2) ? 'terracotta_adobe' : (y <= 4) ? 'red_sandstone' : 'red_terracotta';
          } else if (x >= 25 && z >= -30) {
            subType = 'smooth_stone'; // USA / Station / Airport base
          } else if (z >= 85) {
            subType = 'sand'; // South Beach
          }
          this.setBlock(x, y, z, subType);
        }

        // Top surface block at Y = h
        let topType = 'grass';
        const dist = Math.hypot(x, z);
        if (dist < 18) {
          topType = (dist < 4) ? 'quartz_block' : (Math.abs(x) <= 1 || Math.abs(z) <= 1) ? 'smooth_stone' : 'stone_bricks';
        } else if (ax > 192 || az > 192 || dCorner > 48) {
          // Perimeter coastal beach
          topType = 'sand';
        } else if (x <= -20 && z <= -35) {
          // China
          topType = (h >= 7) ? ((x + z) % 3 === 0 ? 'mossy_stone_bricks' : 'stone_bricks') : 'grass';
        } else if (x <= -20 && z >= 20) {
          // Mexico
          topType = (h >= 5) ? 'terracotta_adobe' : 'sand';
        } else if (x >= 20 && z <= -35) {
          // India
          const riverX = 75 + Math.sin((z + 100) * 0.055) * 16 + Math.cos(z * 0.12) * 5;
          const distToRiver = Math.abs(x - riverX);
          if (distToRiver <= 7.5 && z <= -60) {
            topType = 'sand';
          } else if (Math.hypot(x - 80, z - (-135)) <= 24) {
            topType = 'quartz_block';
          } else {
            topType = ((x + z) % 5 === 0) ? 'red_sandstone' : 'grass';
          }
        } else if (x >= 35 && z >= -25 && z <= 55) {
          // USA Neo York Downtown
          topType = (x >= 97 && x <= 104) ? 'asphalt_road' : 'stone_bricks';
        } else if (z >= 85) {
          // South Beach
          topType = 'sand';
        }
        this.setBlock(x, h, z, topType);
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
        this.setBlock(x, 1, -3, 'stone_bricks');
        this.setBlock(x, 2, -3, 'iron_block');
        this.setBlock(x, 3, -3, 'glowstone');
        this.setBlock(x, 1, 3, 'stone_bricks');
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
        this.setBlock(-3, 1, z, 'stone_bricks');
        this.setBlock(-3, 2, z, 'stone_bricks');
        this.setBlock(-3, 3, z, 'glowstone');
        this.setBlock(3, 1, z, 'stone_bricks');
        this.setBlock(3, 2, z, 'stone_bricks');
        this.setBlock(3, 3, z, 'glowstone');
      }
    }

    // Grand Northeast Causeway to India & Taj Mahal (From (2, -60) to (74, -106))
    for (let step = 0; step <= 32; step++) {
      const px = Math.round(2 + step * 2.22);
      const pz = Math.round(-60 - step * 1.42);
      const gy = this.getTerrainHeight(px, pz);
      for (let dx = -1; dx <= 1; dx++) {
        this.setBlock(px + dx, gy, pz, 'quartz_block');
      }
      if (step % 5 === 0) {
        this.setBlock(px + 2, gy, pz, 'red_sandstone');
        this.setBlock(px + 2, gy + 1, pz, 'red_sandstone');
        this.setBlock(px + 2, gy + 2, pz, 'glowstone');
        this.setBlock(px - 2, gy, pz, 'red_sandstone');
        this.setBlock(px - 2, gy + 1, pz, 'red_sandstone');
        this.setBlock(px - 2, gy + 2, pz, 'glowstone');
      }
    }

    // Grand Northwest Imperial Road to China Great Wall & Pagoda (From (-2, -55) to (-70, -85))
    for (let step = 0; step <= 27; step++) {
      const px = Math.round(-2 - step * 2.51);
      const pz = Math.round(-55 - step * 1.14);
      const gy = this.getTerrainHeight(px, pz);
      for (let dx = -1; dx <= 1; dx++) {
        this.setBlock(px + dx, gy, pz, 'stone_bricks');
      }
      if (step % 5 === 0) {
        this.setBlock(px, gy, pz + 2, 'stone_bricks');
        this.setBlock(px, gy + 1, pz + 2, 'red_terracotta');
        this.setBlock(px, gy + 2, pz + 2, 'glowstone');
        this.setBlock(px, gy, pz - 2, 'stone_bricks');
        this.setBlock(px, gy + 1, pz - 2, 'red_terracotta');
        this.setBlock(px, gy + 2, pz - 2, 'glowstone');
      }
    }

    // Southwest Camino Real to Mexico City & Aztec Pyramid (From (-24, 0) to (-79, 50))
    for (let step = 0; step <= 29; step++) {
      const px = Math.round(-24 - step * 1.88);
      const pz = Math.round(step * 1.71);
      const gy = this.getTerrainHeight(px, pz);
      for (let dz = -1; dz <= 1; dz++) {
        this.setBlock(px, gy, pz + dz, 'red_sandstone');
      }
      if (step % 5 === 0) {
        this.setBlock(px, gy, pz + 2, 'terracotta_adobe');
        this.setBlock(px, gy + 1, pz + 2, 'terracotta_adobe');
        this.setBlock(px, gy + 2, pz + 2, 'glowstone');
        this.setBlock(px, gy, pz - 2, 'terracotta_adobe');
        this.setBlock(px, gy + 1, pz - 2, 'terracotta_adobe');
        this.setBlock(px, gy + 2, pz - 2, 'glowstone');
      }
    }

    // South Wooden Boardwalk to Saloon, Beach & Carnival Pier (Z = 24 to 119, X in [-2, 2])
    for (let z = 24; z <= 119; z++) {
      for (let x = -2; x <= 2; x++) {
        this.setBlock(x, 1, z, 'oak_planks');
      }
      if (z % 10 === 0 && z !== 58) {
        this.setBlock(-3, 1, z, 'oak_planks');
        this.setBlock(-3, 2, z, 'oak_log');
        this.setBlock(-3, 3, z, 'glowstone');
        this.setBlock(3, 1, z, 'oak_planks');
        this.setBlock(3, 2, z, 'oak_log');
        this.setBlock(3, 3, z, 'glowstone');
      }
    }
    // Connector from South Boardwalk to Sunset Saloon at Z = 58
    for (let x = 2; x <= 5; x++) {
      this.setBlock(x, 1, 58, 'oak_planks');
    }

    // --- Standard Uniform 5-Block Arterials to New Realms ---
    // 1. London Westminster Avenue (From North Road (-2, -62) to Big Ben (-32, -65))
    for (let x = -2; x >= -32; x--) {
      const z = Math.round(-62 + (x - (-2)) * 0.1);
      const gy = this.getTerrainHeight(x, z);
      this.setBlock(x, gy, z, 'asphalt_road');
      this.setBlock(x, gy, z - 1, 'asphalt_road');
      this.setBlock(x, gy, z + 1, 'asphalt_road');
      this.setBlock(x, gy, z - 2, 'stone_bricks'); // Curb
      this.setBlock(x, gy, z + 2, 'stone_bricks'); // Curb
      if (Math.abs(x) % 8 === 0) {
        this.setBlock(x, gy + 1, z - 2, 'iron_block');
        this.setBlock(x, gy + 2, z - 2, 'lantern');
      }
    }

    // 2. Avenue des Champs-Élysées (From North Road (2, -50) to Eiffel Tower (26, -38))
    for (let x = 2; x <= 26; x++) {
      const z = Math.round(-50 + (x - 2) * 0.5);
      const gy = this.getTerrainHeight(x, z);
      this.setBlock(x, gy, z, 'asphalt_road');
      this.setBlock(x, gy, z - 1, 'asphalt_road');
      this.setBlock(x, gy, z + 1, 'asphalt_road');
      this.setBlock(x, gy, z - 2, 'stone_bricks');
      this.setBlock(x, gy, z + 2, 'stone_bricks');
      if (x % 8 === 0) {
        this.setBlock(x, gy + 1, z + 2, 'iron_block');
        this.setBlock(x, gy + 2, z + 2, 'lantern');
      }
    }

    // 3. Seoul Royal Avenue (From China Road (-65, -85) to Gwanghwamun (-65, -95) and N Seoul Tower (-52, -115))
    for (let z = -85; z >= -115; z--) {
      const x = (z >= -95) ? -65 : Math.round(-65 + (z - (-95)) * (-0.65));
      const gy = this.getTerrainHeight(x, z);
      this.setBlock(x, gy, z, 'asphalt_road');
      this.setBlock(x - 1, gy, z, 'asphalt_road');
      this.setBlock(x + 1, gy, z, 'asphalt_road');
      this.setBlock(x - 2, gy, z, 'stone_bricks');
      this.setBlock(x + 2, gy, z, 'stone_bricks');
      if (Math.abs(z) % 8 === 0) {
        this.setBlock(x - 2, gy + 1, z, 'stone_bricks');
        this.setBlock(x - 2, gy + 2, z, 'glowstone');
      }
    }

    // 4. Tokyo Metropolitan Expressway (From China Road (-110, -85) to Shibuya Scramble (-155, -80))
    for (let x = -110; x >= -155; x--) {
      const z = Math.round(-85 + (x - (-110)) * (-0.11));
      const gy = this.getTerrainHeight(x, z);
      this.setBlock(x, gy, z, 'asphalt_road');
      this.setBlock(x, gy, z - 1, 'asphalt_road');
      this.setBlock(x, gy, z + 1, 'asphalt_road');
      this.setBlock(x, gy, z - 2, 'stone_bricks');
      this.setBlock(x, gy, z + 2, 'stone_bricks');
      if (Math.abs(x) % 8 === 0) {
        this.setBlock(x, gy + 1, z - 2, 'iron_block');
        this.setBlock(x, gy + 2, z - 2, 'glowstone');
      }
    }

    // 5. Giza Desert Highway (From Mexico Camino Real (-79, 50) to Great Pyramids (-150, 36))
    for (let x = -79; x >= -150; x--) {
      const z = Math.round(50 + (x - (-79)) * 0.2);
      const gy = this.getTerrainHeight(x, z);
      this.setBlock(x, gy, z, 'sandstone');
      this.setBlock(x, gy, z - 1, 'asphalt_road');
      this.setBlock(x, gy, z + 1, 'asphalt_road');
      this.setBlock(x, gy, z - 2, 'smooth_stone');
      this.setBlock(x, gy, z + 2, 'smooth_stone');
      if (Math.abs(x) % 8 === 0) {
        this.setBlock(x, gy + 1, z + 2, 'sandstone');
        this.setBlock(x, gy + 2, z + 2, 'lantern');
      }
    }

    // 6. Dubai Sheikh Zayed Highway (From Broadway (110, 0) to Burj Khalifa (160, 42))
    for (let x = 110; x <= 160; x++) {
      const z = Math.round(0 + (x - 110) * 0.84);
      const gy = this.getTerrainHeight(x, z);
      this.setBlock(x, gy, z, 'asphalt_road');
      this.setBlock(x, gy, z - 1, 'asphalt_road');
      this.setBlock(x, gy, z + 1, 'asphalt_road');
      this.setBlock(x, gy, z - 2, 'stone_bricks');
      this.setBlock(x, gy, z + 2, 'stone_bricks');
      if (x % 8 === 0) {
        this.setBlock(x, gy + 1, z - 2, 'iron_block');
        this.setBlock(x, gy + 2, z - 2, 'glowstone');
      }
    }

    // --- 7. The Great Outer Ring Parkway (Unbroken Beltway Linking All Realms) ---
    // A. Northern Parkway Arc: Tokyo (-155, -80) -> China (-110, -110) -> Seoul (-65, -110) -> London (-32, -75) -> Paris (26, -50) -> India (80, -115) -> Marina (140, -115)
    const northWaypoints: [number, number][] = [
      [-155, -80], [-110, -110], [-65, -110], [-32, -75], [26, -50], [80, -115], [140, -115]
    ];
    for (let i = 0; i < northWaypoints.length - 1; i++) {
      const [x1, z1] = northWaypoints[i];
      const [x2, z2] = northWaypoints[i + 1];
      const steps = Math.max(Math.abs(x2 - x1), Math.abs(z2 - z1));
      for (let s = 0; s <= steps; s++) {
        const px = Math.round(x1 + (x2 - x1) * (s / steps));
        const pz = Math.round(z1 + (z2 - z1) * (s / steps));
        const gy = this.getTerrainHeight(px, pz);
        if (gy > 0) {
          this.setBlock(px, gy, pz, 'asphalt_road');
          this.setBlock(px + 1, gy, pz, 'asphalt_road');
          this.setBlock(px - 1, gy, pz, 'asphalt_road');
          this.setBlock(px + 2, gy, pz, 'stone_bricks');
          this.setBlock(px - 2, gy, pz, 'stone_bricks');
          if (s % 10 === 0) {
            this.setBlock(px + 2, gy + 1, pz, 'iron_block');
            this.setBlock(px + 2, gy + 2, pz, 'lantern');
          }
        }
      }
    }

    // B. Eastern Parkway Arc: Marina (140, -115) -> Hollywood (130, -50) -> Lak Tower (150, 0) -> Dubai (160, 42) -> Airport (130, 80) -> Pier (35, 125)
    const eastWaypoints: [number, number][] = [
      [140, -115], [130, -50], [150, 0], [160, 42], [130, 80], [35, 125]
    ];
    for (let i = 0; i < eastWaypoints.length - 1; i++) {
      const [x1, z1] = eastWaypoints[i];
      const [x2, z2] = eastWaypoints[i + 1];
      const steps = Math.max(Math.abs(x2 - x1), Math.abs(z2 - z1));
      for (let s = 0; s <= steps; s++) {
        const px = Math.round(x1 + (x2 - x1) * (s / steps));
        const pz = Math.round(z1 + (z2 - z1) * (s / steps));
        const gy = this.getTerrainHeight(px, pz);
        if (gy > 0) {
          this.setBlock(px, gy, pz, 'asphalt_road');
          this.setBlock(px, gy, pz + 1, 'asphalt_road');
          this.setBlock(px, gy, pz - 1, 'asphalt_road');
          this.setBlock(px, gy, pz + 2, 'stone_bricks');
          this.setBlock(px, gy, pz - 2, 'stone_bricks');
          if (s % 10 === 0) {
            this.setBlock(px, gy + 1, pz + 2, 'iron_block');
            this.setBlock(px, gy + 2, pz + 2, 'lantern');
          }
        }
      }
    }

    // C. Southern & Western Parkway Arc: Pier (-20, 125) -> Chichén Itzá (-130, 110) -> Giza (-155, 50) -> Tokyo (-155, -80)
    const westWaypoints: [number, number][] = [
      [-20, 125], [-130, 110], [-155, 50], [-155, -80]
    ];
    for (let i = 0; i < westWaypoints.length - 1; i++) {
      const [x1, z1] = westWaypoints[i];
      const [x2, z2] = westWaypoints[i + 1];
      const steps = Math.max(Math.abs(x2 - x1), Math.abs(z2 - z1));
      for (let s = 0; s <= steps; s++) {
        const px = Math.round(x1 + (x2 - x1) * (s / steps));
        const pz = Math.round(z1 + (z2 - z1) * (s / steps));
        const gy = this.getTerrainHeight(px, pz);
        if (gy > 0) {
          this.setBlock(px, gy, pz, 'asphalt_road');
          this.setBlock(px, gy, pz + 1, 'asphalt_road');
          this.setBlock(px, gy, pz - 1, 'asphalt_road');
          this.setBlock(px, gy, pz + 2, 'stone_bricks');
          this.setBlock(px, gy, pz - 2, 'stone_bricks');
          if (s % 10 === 0) {
            this.setBlock(px, gy + 1, pz - 2, 'iron_block');
            this.setBlock(px, gy + 2, pz - 2, 'lantern');
          }
        }
      }
    }
  }

  // 3. Crossroads Citadel (Revamped Central Hub, Country Flags Parade & Majestic Botanical Gardens)
  private buildCrossroadsCitadel() {
    // 1. Polished Citadel Island Base & Curbs (Radius <= 17)
    for (let x = -17; x <= 17; x++) {
      for (let z = -17; z <= 17; z++) {
        const r = Math.hypot(x, z);
        if (r <= 17) {
          // Polished concentric rings
          const ring = Math.floor(r);
          const mat = (ring <= 4) ? 'quartz_block' :
                      (ring === 5 || ring === 9 || ring === 13) ? 'gold_block' :
                      (ring % 2 === 0) ? 'smooth_stone' : 'quartz_block';
          this.setBlock(x, 1, z, mat);
          if (r > 15.5) {
            this.setBlock(x, 2, z, 'stone_bricks'); // Moat perimeter parapet
            if ((Math.abs(x) + Math.abs(z)) % 5 === 0) {
              this.setBlock(x, 3, z, 'lantern');
            }
          }
        }
      }
    }

    // 2. Cardinal Processional Boulevards (North, South, East, West)
    for (let d = 5; d <= 17; d++) {
      for (const offset of [-1, 0, 1]) {
        this.setBlock(offset, 1, -d, (offset === 0 && d % 3 === 0) ? 'gold_block' : 'quartz_block');
        this.setBlock(offset, 1, d, (offset === 0 && d % 3 === 0) ? 'gold_block' : 'quartz_block');
        this.setBlock(-d, 1, offset, (offset === 0 && d % 3 === 0) ? 'gold_block' : 'quartz_block');
        this.setBlock(d, 1, offset, (offset === 0 && d % 3 === 0) ? 'gold_block' : 'quartz_block');
      }
      if (d % 4 === 0) {
        this.setBlock(-2, 1, -d, 'sea_lantern');
        this.setBlock(2, 1, -d, 'sea_lantern');
        this.setBlock(-2, 1, d, 'sea_lantern');
        this.setBlock(2, 1, d, 'sea_lantern');
        this.setBlock(-d, 1, -2, 'sea_lantern');
        this.setBlock(-d, 1, 2, 'sea_lantern');
        this.setBlock(d, 1, -2, 'sea_lantern');
        this.setBlock(d, 1, 2, 'sea_lantern');
      }
    }

    // 3. Central Grand Fountain & World Beacon Memorial at (0, 0)
    // Octagonal Outer Marble Basin (Radius <= 4)
    for (let x = -4; x <= 4; x++) {
      for (let z = -4; z <= 4; z++) {
        const d = Math.hypot(x, z);
        if (d <= 4.2 && d >= 3.2) {
          this.setBlock(x, 2, z, 'quartz_block');
        } else if (d < 3.2 && (x !== 0 || z !== 0)) {
          this.setBlock(x, 1, z, 'sea_lantern'); // Submerged illumination
          this.setBlock(x, 2, z, 'water');
        }
      }
    }
    // Raised Center Spire & World Beacon
    this.setBlock(0, 1, 0, 'diamond_block', { type: 'teleport' });
    this.setBlock(0, 2, 0, 'beacon', { type: 'teleport' });
    this.setBlock(0, 3, 0, 'quartz_pillar');
    this.setBlock(0, 4, 0, 'gold_block');
    this.setBlock(0, 5, 0, 'sea_lantern');
    this.setBlock(0, 6, 0, 'beacon'); // High skyward beam
    // Weeping fountain jets
    for (const [dx, dz] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
      this.setBlock(dx, 3, dz, 'water');
    }

    // 4. Directional World Portal Directory Monument at (0, 2, 5)
    for (let y = 1; y <= 4; y++) {
      this.setBlock(0, y, 5, 'quartz_pillar');
      this.setBlock(-1, y, 5, 'quartz_block');
      this.setBlock(1, y, 5, 'quartz_block');
    }
    this.setBlock(0, 5, 5, 'gold_block');
    this.setBlock(-1, 5, 5, 'gold_block');
    this.setBlock(1, 5, 5, 'gold_block');
    this.setBlock(0, 6, 5, 'sea_lantern');
    this.setBlock(0, 2, 6, 'gold_block', {
      type: 'sign',
      title: 'Crossroads Global Nexus · World Directory',
      text: 'Welcome to Lakshya\'s Portfolio World!\nNorth: London, Paris, Tokyo, Seoul & China\nEast: USA Metropolis, Hollywood & Dubai\nSouth: Carnival Pier, Airport & Marina\nWest: Mexico City, Giza Pyramids & Sphinx'
    });
    this.setBlock(-1, 2, 6, 'quartz_block', {
      type: 'sign',
      title: 'West & North-West Realms',
      text: '• London & Big Ben (-32, -65)\n• Paris & Eiffel Tower (26, -38)\n• Tokyo Shibuya Scramble (-155, -80)\n• Seoul & Gwanghwamun (-65, -95)\n• China Great Wall & Pagoda (-110, -110)'
    });
    this.setBlock(1, 2, 6, 'quartz_block', {
      type: 'sign',
      title: 'East & South-East Realms',
      text: '• Imperial India & Taj Mahal (80, -135)\n• USA & Times Square (100, 0)\n• Hollywood Sign & Hills (130, -50)\n• Dubai Burj Khalifa (170, 42)\n• International Airport (130, 80)'
    });

    // 5. Four Monumental Archway Gatehouses over Moat Bridges
    this.buildCitadelGatehouse(0, -18, true);
    this.buildCitadelGatehouse(0, 18, true);
    this.buildCitadelGatehouse(18, 0, false);
    this.buildCitadelGatehouse(-18, 0, false);

    // 6. --- Grand Parade of Nations (Country Flags) ---
    this.buildAllCountryFlags();

    // 7. --- Majestic Botanical Gardens in Four Quadrant Courtyards ---
    this.buildMajesticBotanicalGardens();

    // 8. Skills & Knowledge Pavilion (Citadel South at (0, 1, 12))
    for (let x = -4; x <= 4; x++) {
      for (let z = 11; z <= 15; z++) {
        this.setBlock(x, 1, z, 'quartz_block');
        if ((Math.abs(x) === 4) && (z === 11 || z === 15)) {
          for (let y = 2; y <= 5; y++) this.setBlock(x, y, z, 'quartz_pillar');
        }
        this.setBlock(x, 6, z, 'quartz_block');
      }
    }
    this.setBlock(0, 2, 13, 'crafting_table', { type: 'skills' });
    this.setBlock(0, 3, 13, 'glowstone', { type: 'skills' });
    this.setBlock(-3, 2, 13, 'bookshelf');
    this.setBlock(-3, 3, 13, 'bookshelf');
    this.setBlock(3, 2, 13, 'bookshelf');
    this.setBlock(3, 3, 13, 'bookshelf');
    this.setBlock(-1, 2, 13, 'cauldron');
    this.setBlock(1, 2, 13, 'cauldron');
  }

  // Parade of Nations: Authentic 3D Country Flags on Majestic Flagpoles
  private buildAllCountryFlags() {
    // 1. India 🇮🇳 (Saffron, White with Ashoka Chakra, Green)
    this.buildFlagpole(6, -14, 'Republic of India 🇮🇳', 'Tiranga · Saffron, White with Navy Ashoka Chakra, and India Green.', [
      ['red_terracotta', 'red_terracotta', 'red_terracotta', 'red_terracotta'],
      ['quartz_block', 'lapis_block', 'lapis_block', 'quartz_block'],
      ['emerald_block', 'emerald_block', 'emerald_block', 'emerald_block']
    ], 'east');

    // 2. South Korea 🇰🇷 (White field, Red/Blue Taegeuk, Black Trigrams)
    this.buildFlagpole(-6, -14, 'Republic of Korea 🇰🇷', 'Taegeukgi · White purity, Red & Blue cosmic harmony, and four Kwae trigrams.', [
      ['coal_block', 'quartz_block', 'quartz_block', 'coal_block'],
      ['quartz_block', 'redstone_block', 'lapis_block', 'quartz_block'],
      ['coal_block', 'quartz_block', 'quartz_block', 'coal_block']
    ], 'west');

    // 3. Japan 🇯🇵 (White field with Crimson Sun)
    this.buildFlagpole(-12, -10, 'Japan 🇯🇵', 'Nisshōki / Hinomaru · Land of the Rising Sun with crimson central disk.', [
      ['quartz_block', 'quartz_block', 'quartz_block', 'quartz_block'],
      ['quartz_block', 'redstone_block', 'redstone_block', 'quartz_block'],
      ['quartz_block', 'quartz_block', 'quartz_block', 'quartz_block']
    ], 'west');

    // 4. China 🇨🇳 (Red field with Golden Stars)
    this.buildFlagpole(-14, -6, 'People\'s Republic of China 🇨🇳', 'Five-Star Red Flag · Vermilion red field with five golden stars.', [
      ['red_terracotta', 'gold_block', 'red_terracotta', 'red_terracotta'],
      ['red_terracotta', 'gold_block', 'gold_block', 'red_terracotta'],
      ['red_terracotta', 'red_terracotta', 'red_terracotta', 'red_terracotta']
    ], 'west');

    // 5. United Kingdom 🇬🇧 (Union Jack)
    this.buildFlagpole(-14, 6, 'United Kingdom 🇬🇧', 'Union Flag · Crosses of St. George, St. Andrew, and St. Patrick combined.', [
      ['lapis_block', 'quartz_block', 'redstone_block', 'lapis_block'],
      ['redstone_block', 'redstone_block', 'redstone_block', 'redstone_block'],
      ['lapis_block', 'quartz_block', 'redstone_block', 'lapis_block']
    ], 'west');

    // 6. France 🇫🇷 (Bleu, Blanc, Rouge Tricolore)
    this.buildFlagpole(-12, 10, 'French Republic 🇫🇷', 'Le Drapeau Tricolore · Liberty, Equality, Fraternity (Blue, White, Red).', [
      ['lapis_block', 'quartz_block', 'quartz_block', 'redstone_block'],
      ['lapis_block', 'quartz_block', 'quartz_block', 'redstone_block'],
      ['lapis_block', 'quartz_block', 'quartz_block', 'redstone_block']
    ], 'west');

    // 7. Mexico 🇲🇽 (Green, White with Eagle, Red)
    this.buildFlagpole(-6, 14, 'United Mexican States 🇲🇽', 'Bandera de México · Hope, Unity, and Blood of Heroes with Golden Emblem.', [
      ['emerald_block', 'quartz_block', 'quartz_block', 'redstone_block'],
      ['emerald_block', 'gold_block', 'quartz_block', 'redstone_block'],
      ['emerald_block', 'quartz_block', 'quartz_block', 'redstone_block']
    ], 'west');

    // 8. United States 🇺🇸 (Stars and Stripes)
    this.buildFlagpole(6, 14, 'United States of America 🇺🇸', 'Stars and Stripes · 50 stars in blue canton and thirteen red and white stripes.', [
      ['lapis_block', 'gold_block', 'redstone_block', 'quartz_block'],
      ['lapis_block', 'lapis_block', 'quartz_block', 'redstone_block'],
      ['redstone_block', 'quartz_block', 'redstone_block', 'quartz_block']
    ], 'east');

    // 9. Egypt 🇪🇬 (Red, White with Golden Eagle, Black)
    this.buildFlagpole(12, 10, 'Arab Republic of Egypt 🇪🇬', 'Egyptian Tricolour · Red sacrifice, White purity with Golden Eagle, and Black end of oppression.', [
      ['redstone_block', 'redstone_block', 'redstone_block', 'redstone_block'],
      ['quartz_block', 'gold_block', 'gold_block', 'quartz_block'],
      ['coal_block', 'coal_block', 'coal_block', 'coal_block']
    ], 'east');

    // 10. United Arab Emirates 🇦🇪 (Pan-Arab Red, Green, White, Black)
    this.buildFlagpole(12, -10, 'United Arab Emirates 🇦🇪', 'Flag of the UAE · Unity, prosperity, peace, and strength of the seven emirates.', [
      ['redstone_block', 'emerald_block', 'emerald_block', 'emerald_block'],
      ['redstone_block', 'quartz_block', 'quartz_block', 'quartz_block'],
      ['redstone_block', 'coal_block', 'coal_block', 'coal_block']
    ], 'east');
  }

  private buildFlagpole(px: number, pz: number, title: string, desc: string, pattern: string[][], dir: 'east' | 'west') {
    // Flagpole plinth and shaft (Y = 1 to 8)
    this.setBlock(px, 1, pz, 'smooth_stone');
    for (let y = 2; y <= 8; y++) {
      this.setBlock(px, y, pz, 'iron_block');
    }
    this.setBlock(px, 9, pz, 'gold_block'); // Eagle/finial

    // Flag banner (4x3 blocks at Y = 6 to 8)
    for (let row = 0; row < 3; row++) {
      const y = 8 - row;
      for (let col = 0; col < 4; col++) {
        const mat = pattern[row][col];
        const bx = (dir === 'east') ? px + 1 + col : px - 1 - col;
        this.setBlock(bx, y, pz, mat);
      }
    }

    // Interactive Flag Plaque Sign
    const signX = px;
    const signZ = (pz <= 0) ? pz + 1 : pz - 1;
    this.setBlock(signX, 2, signZ, 'quartz_block', {
      type: 'sign',
      title: title,
      text: desc
    });
  }

  // Majestic Botanical Gardens: 4 Thematic World Pleasure Gardens
  private buildMajesticBotanicalGardens() {
    // 1. North-West: Imperial Sakura & Zen Water Garden (X in [-15, -6], Z in [-15, -6])
    // Flagstone garden floor & mossy paths
    for (let x = -15; x <= -6; x++) {
      for (let z = -15; z <= -6; z++) {
        if ((x + z) % 2 === 0) {
          this.setBlock(x, 1, z, 'mossy_stone_bricks');
        }
      }
    }
    // Twin Full-Canopy Japanese Sakura Cherry Blossom Trees
    this.buildSakuraTree(-12, 1, -12);
    this.buildSakuraTree(-8, 1, -14);
    // Zen Reflection Lotus Pool with submerged lanterns
    for (let x = -11; x <= -8; x++) {
      for (let z = -11; z <= -8; z++) {
        const isBorder = (x === -11 || x === -8 || z === -11 || z === -8);
        if (isBorder) {
          this.setBlock(x, 1, z, 'stone_bricks');
        } else {
          this.setBlock(x, 0, z, 'sea_lantern');
          this.setBlock(x, 1, z, 'water');
        }
      }
    }
    // Floating Lotus Blossom Pads
    this.setBlock(-10, 1, -10, 'emerald_block');
    this.setBlock(-9, 1, -10, 'purpur_block');
    this.setBlock(-9, 2, -10, 'lantern');
    // Traditional Carved Stone Toro Pagoda Lanterns
    this.setBlock(-14, 2, -8, 'stone_bricks');
    this.setBlock(-14, 3, -8, 'quartz_pillar');
    this.setBlock(-14, 4, -8, 'lantern');
    this.setBlock(-14, 5, -8, 'stone_bricks');
    // Bamboo Clump & Stone Meditation Bench
    this.buildBambooStalk(-6, 1, -8, 5);
    this.buildBambooStalk(-6, 1, -7, 6);
    this.setBlock(-8, 2, -7, 'smooth_stone'); // Bench

    // 2. North-East: Mughal Charbagh Paradise Botanical Garden (X in [6, 15], Z in [-15, -6])
    // 4 Symmetrical Quadrants divided by White Marble Water Rills
    const ncx = 11;
    const ncz = -11;
    // Central Octagonal Raised Marble Fountain
    for (let dx = -2; dx <= 2; dx++) {
      for (let dz = -2; dz <= 2; dz++) {
        const d = Math.hypot(dx, dz);
        if (d <= 2.2 && d >= 1.5) {
          this.setBlock(ncx + dx, 2, ncz + dz, 'quartz_block');
        } else if (d < 1.5) {
          this.setBlock(ncx + dx, 1, ncz + dz, 'sea_lantern');
          this.setBlock(ncx + dx, 2, ncz + dz, 'water');
        }
      }
    }
    this.setBlock(ncx, 3, ncz, 'quartz_pillar');
    this.setBlock(ncx, 4, ncz, 'gold_block');
    this.setBlock(ncx, 4, ncz, 'water');
    // Four Marble Water Channels radiating outward
    for (let step = 3; step <= 5; step++) {
      this.setBlock(ncx + step, 1, ncz, 'water');
      this.setBlock(ncx - step, 1, ncz, 'water');
      this.setBlock(ncx, 1, ncz + step, 'water');
      this.setBlock(ncx, 1, ncz - step, 'water');
    }
    // Symmetrical Aromatic Flowerbeds & Topiary Cypress Pines
    this.buildCypressTree(7, 1, -7);
    this.buildCypressTree(15, 1, -7);
    this.buildCypressTree(7, 1, -15);
    this.buildCypressTree(15, 1, -15);
    // Rose bushes and amethyst borders
    for (const [fx, fz] of [[8, -9], [9, -8], [13, -9], [14, -8], [8, -13], [9, -14], [13, -13], [14, -14]]) {
      this.setBlock(fx, 2, fz, 'rose_vines');
    }
    this.setBlock(ncx, 2, -6, 'quartz_block'); // Marble bench

    // 3. South-West: Mediterranean Rose Pergola & Fountains (X in [-15, -6], Z in [6, 15])
    // Grand Colonnade Pergola with Climbing Roses
    for (let z = 7; z <= 13; z += 3) {
      this.setBlock(-12, 2, z, 'quartz_pillar');
      this.setBlock(-12, 3, z, 'quartz_pillar');
      this.setBlock(-12, 4, z, 'quartz_pillar');
      this.setBlock(-8, 2, z, 'quartz_pillar');
      this.setBlock(-8, 3, z, 'quartz_pillar');
      this.setBlock(-8, 4, z, 'quartz_pillar');
      // Crossbeams with flowering vines
      for (let x = -12; x <= -8; x++) {
        this.setBlock(x, 5, z, 'oak_planks');
        this.setBlock(x, 6, z, 'rose_vines');
      }
    }
    // Pergola longitudinal beams
    for (let z = 7; z <= 13; z++) {
      this.setBlock(-12, 5, z, 'oak_planks');
      this.setBlock(-8, 5, z, 'oak_planks');
      if (z % 2 === 0) {
        this.setBlock(-10, 5, z, 'lantern');
      }
    }
    // Bubbling Lion-Head Wall Fountain in SW Garden at (-14, 10)
    for (let y = 1; y <= 4; y++) {
      this.setBlock(-14, y, 9, 'prismarine_bricks');
      this.setBlock(-14, y, 11, 'prismarine_bricks');
      this.setBlock(-15, y, 10, 'prismarine_bricks');
    }
    this.setBlock(-14, 3, 10, 'gold_block'); // Spout
    this.setBlock(-14, 2, 10, 'water');
    this.setBlock(-14, 1, 10, 'sea_lantern');

    // 4. South-East: Royal French Versailles Topiary Court (X in [6, 15], Z in [6, 15])
    const secX = 11;
    const secZ = 11;
    // Clipped Spiral Topiary Hedges
    for (const [tx, tz] of [[8, 8], [14, 8], [8, 14], [14, 14]]) {
      this.setBlock(tx, 2, tz, 'mossy_stone_bricks');
      this.setBlock(tx, 3, tz, 'leaves');
      this.setBlock(tx, 4, tz, 'leaves');
      this.setBlock(tx, 5, tz, 'leaves');
    }
    // Center Marble Sundial & Sculpture Pedestal
    this.setBlock(secX, 2, secZ, 'quartz_block');
    this.setBlock(secX, 3, secZ, 'quartz_pillar');
    this.setBlock(secX, 4, secZ, 'gold_block');
    this.setBlock(secX, 5, secZ, 'sea_lantern');
    // Concentric Lavender Flower Borders
    for (let dx = -3; dx <= 3; dx++) {
      for (let dz = -3; dz <= 3; dz++) {
        if (Math.abs(dx) === 3 || Math.abs(dz) === 3) {
          if ((dx + dz) % 2 === 0) {
            this.setBlock(secX + dx, 2, secZ + dz, 'amethyst_block');
          } else {
            this.setBlock(secX + dx, 2, secZ + dz, 'purpur_block');
          }
        }
      }
    }
  }

  private buildCitadelGatehouse(cx: number, cz: number, isNorthSouth: boolean) {
    if (isNorthSouth) {
      for (let x = -4; x <= 4; x++) {
        for (let y = 2; y <= 7; y++) {
          const isArchOpening = (Math.abs(x) <= 1 && y <= 4);
          if (!isArchOpening) {
            const isCorner = Math.abs(x) === 4;
            this.setBlock(x, y, cz, isCorner ? 'quartz_pillar' : (y === 7) ? 'gold_block' : 'stone_bricks');
          }
        }
      }
      this.setBlock(-4, 8, cz, 'beacon');
      this.setBlock(4, 8, cz, 'beacon');
      this.setBlock(0, 8, cz, 'gold_block');
      this.setBlock(0, 9, cz, 'sea_lantern');
    } else {
      for (let z = -4; z <= 4; z++) {
        for (let y = 2; y <= 7; y++) {
          const isArchOpening = (Math.abs(z) <= 1 && y <= 4);
          if (!isArchOpening) {
            const isCorner = Math.abs(z) === 4;
            this.setBlock(cx, y, z, isCorner ? 'quartz_pillar' : (y === 7) ? 'gold_block' : 'stone_bricks');
          }
        }
      }
      this.setBlock(cx, 8, -4, 'beacon');
      this.setBlock(cx, 8, 4, 'beacon');
      this.setBlock(cx, 8, 0, 'gold_block');
      this.setBlock(cx, 9, 0, 'sea_lantern');
    }
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

    // Floating Lotus Blossoms along Yamuna Canal
    for (const lz of [cz + 28, cz + 40, cz + 52]) {
      this.setBlock(cx - 1, 1, lz, 'emerald_block');
      this.setBlock(cx + 1, 1, lz, 'emerald_block');
      this.setBlock(cx, 1, lz, 'purpur_block');
      this.setBlock(cx, 2, lz, 'lantern');
    }

    // Grand Darwaza-i-Rauza (Great Entrance Gateway of Taj Mahal at South: Z in [-74, -70], X in [74, 86])
    for (let x = cx - 6; x <= cx + 6; x++) {
      for (let z = cz + 66; z <= cz + 70; z++) {
        for (let y = 1; y <= 7; y++) {
          const isArch = (Math.abs(x - cx) <= 2 && y <= 5);
          if (!isArch) {
            const isCorner = (Math.abs(x - cx) === 6 && (z === cz + 66 || z === cz + 70));
            this.setBlock(x, y, z, isCorner ? 'quartz_pillar' : 'red_sandstone');
          } else {
            this.setBlock(x, 1, z, 'smooth_stone');
          }
        }
        // Parapet cresting
        this.setBlock(x, 8, z, (x % 2 === 0) ? 'quartz_block' : 'red_sandstone');
      }
    }
    // Darwaza 4 Corner Chhatris
    for (const [dx, dz] of [[-6, cz + 66], [6, cz + 66], [-6, cz + 70], [6, cz + 70]]) {
      this.setBlock(cx + dx, 9, dz, 'gold_block');
      this.setBlock(cx + dx, 10, dz, 'sea_lantern');
    }
    this.setBlock(cx, 6, cz + 70, 'gold_block');
    this.setBlock(cx, 3, cz + 71, 'quartz_block', {
      type: 'sign',
      title: 'Darwaza-i-Rauza · Great Gate',
      text: 'Monumental red sandstone portal leading to the Taj Mahal reflecting pool.'
    });

    // Symmetrical Cypress Pines along canal
    for (let z = cz + 20; z <= cz + 62; z += 7) {
      this.buildCypressTree(cx - 6, 1, z);
      this.buildCypressTree(cx + 6, 1, z);
    }

    // Varanasi Ghats & Riverfront Steps (X in [35, 55], Z in [-135, -115])
    for (let x = 35; x <= 55; x++) {
      for (let z = -135; z <= -115; z++) {
        const stepLevel = Math.max(1, 4 - Math.floor((x - 35) / 5));
        for (let y = 1; y <= stepLevel; y++) {
          this.setBlock(x, y, z, 'red_sandstone');
        }
      }
    }
    // Sacred Braziers along Varanasi Riverfront
    for (let z = -134; z <= -116; z += 6) {
      this.setBlock(36, 4, z, 'cobblestone');
      this.setBlock(36, 5, z, 'magma_block');
      this.setBlock(36, 6, z, 'lantern');
    }
    // Floating Diyas (lanterns) along river
    for (let z = -132; z <= -118; z += 4) {
      this.setBlock(34, 1, z, 'water');
      this.setBlock(34, 2, z, 'glowstone');
    }

    // Rajasthani Haveli Chhatris
    this.buildRajasthaniChhatri(cx - 16, 1, cz + 30);
    this.buildRajasthaniChhatri(cx + 16, 1, cz + 30);
    this.buildRajasthaniChhatri(45, 2, -125);

    // Sprawling Indian Banyan Trees
    this.buildBanyanTree(cx - 24, 1, cz + 15);
    this.buildBanyanTree(cx + 24, 1, cz + 15);
    this.buildBanyanTree(52, 1, -145);

    // --- Vibrant Everyday Indian Cultural Life ---
    // A. Mumbai Gateway of India & Mumbai Local Suburban Train at (40, -95)
    const gwX = 40;
    const gwZ = -95;
    // Basalt plinth foundation (Y = 1)
    for (let x = gwX - 6; x <= gwX + 6; x++) {
      for (let z = gwZ - 4; z <= gwZ + 4; z++) {
        this.setBlock(x, 1, z, 'stone_bricks');
      }
    }
    // Four Corner Turrets rising to Y = 16
    const turrets = [
      [gwX - 5, gwZ - 3], [gwX + 5, gwZ - 3],
      [gwX - 5, gwZ + 3], [gwX + 5, gwZ + 3]
    ];
    for (const [tx, tz] of turrets) {
      for (let y = 2; y <= 16; y++) {
        for (let dx = -1; dx <= 1; dx++) {
          for (let dz = -1; dz <= 1; dz++) {
            this.setBlock(tx + dx, y, tz + dz, 'stone_bricks');
          }
        }
      }
      // Fluted turret mini-domes at top
      this.setBlock(tx, 17, tz, 'quartz_pillar');
      this.setBlock(tx, 18, tz, 'gold_block');
    }
    // Grand Indo-Saracenic Central Archway (X in [gwX - 4, gwX + 4], Z in [gwZ - 2, gwZ + 2])
    for (let y = 2; y <= 14; y++) {
      for (let x = gwX - 4; x <= gwX + 4; x++) {
        for (let z = gwZ - 2; z <= gwZ + 2; z++) {
          const isArchPassage = (Math.abs(x - gwX) <= 2 && y <= 9);
          if (!isArchPassage) {
            const isWall = (x === gwX - 4 || x === gwX + 4 || z === gwZ - 2 || z === gwZ + 2);
            if (isWall) {
              this.setBlock(x, y, z, (y >= 10 && y <= 12 && Math.abs(x - gwX) <= 1) ? 'quartz_pillar' : 'stone_bricks');
            }
          } else {
            this.setBlock(x, 1, z, 'smooth_stone'); // Archway floor
          }
        }
      }
    }
    // Central Arch Parapet and Grand Dome (Y = 15 to 19)
    for (let x = gwX - 3; x <= gwX + 3; x++) {
      for (let z = gwZ - 2; z <= gwZ + 2; z++) {
        this.setBlock(x, 15, z, 'stone_bricks');
      }
    }
    for (let dx = -2; dx <= 2; dx++) {
      for (let dz = -2; dz <= 2; dz++) {
        if (Math.hypot(dx, dz) <= 2) {
          this.setBlock(gwX + dx, 16, gwZ + dz, 'smooth_stone');
          this.setBlock(gwX + dx, 17, gwZ + dz, 'smooth_stone');
        }
      }
    }
    this.setBlock(gwX, 18, gwZ, 'gold_block');
    this.setBlock(gwX, 19, gwZ, 'beacon');

    this.setBlock(gwX, 2, gwZ + 5, 'stone_bricks', {
      type: 'sign',
      title: 'Gateway of India · Mumbai',
      text: 'Historic Indo-Saracenic basalt monument built to commemorate the royal landing at Apollo Bunder.'
    });

    // Mumbai Local Suburban Train Coach parked along coastal siding at Z = -86
    const trainZ = -86;
    for (let x = gwX - 7; x <= gwX + 7; x++) {
      // Rails and sleepers
      this.setBlock(x, 1, trainZ, (x % 2 === 0) ? 'oak_planks' : 'iron_block');
      // Coach Floor (Y = 2)
      for (let z = trainZ - 1; z <= trainZ + 1; z++) {
        this.setBlock(x, 2, z, 'smooth_stone');
      }
      // Western Railway Yellow & Maroon Livery
      const isDoorway = (Math.abs(x - (gwX - 3)) <= 1 || Math.abs(x - (gwX + 3)) <= 1);
      for (let z of [trainZ - 1, trainZ + 1]) {
        this.setBlock(x, 2, z, 'red_terracotta'); // Maroon lower stripe
        if (!isDoorway) {
          this.setBlock(x, 3, z, 'gold_block'); // Yellow band
          this.setBlock(x, 4, z, (x % 2 === 0) ? 'cyber_glass' : 'gold_block'); // Windows
        } else {
          // Open doorway with grab handles
          this.setBlock(x, 3, z, 'iron_block');
        }
      }
      // Coach Roof (Y = 5)
      for (let z = trainZ - 1; z <= trainZ + 1; z++) {
        this.setBlock(x, 5, z, 'smooth_stone');
      }
      // Ceiling hanging strap handles & passenger lighting
      if (x % 4 === 0) {
        this.setBlock(x, 4, trainZ, 'lantern');
      }
    }
    // Destination display board
    this.setBlock(gwX - 7, 4, trainZ, 'glowstone', {
      type: 'sign',
      title: 'Mumbai Local · Western Railway',
      text: 'Fast Local to Churchgate · Open doors, peak-hour breeze, and the spirit of Maximum City!'
    });

    // B. Dravidian Temple Gopuram & Mandapam at (115, -135)
    const gpX = 115;
    const gpZ = -135;
    // Granite Plinth Base (Y = 1 to 6)
    for (let x = gpX - 6; x <= gpX + 6; x++) {
      for (let z = gpZ - 4; z <= gpZ + 4; z++) {
        for (let y = 1; y <= 6; y++) {
          const isGateOpening = (Math.abs(x - gpX) <= 1 && y <= 5);
          if (!isGateOpening) {
            this.setBlock(x, y, z, 'stone_bricks');
          } else {
            this.setBlock(x, 1, z, 'smooth_stone');
          }
        }
      }
    }
    // Stepped Sculptural Tiers rising from Y = 7 to Y = 22
    const tierColors = ['red_terracotta', 'purpur_block', 'gold_block', 'lapis_block', 'emerald_block', 'red_sandstone', 'gold_block', 'purpur_block'];
    for (let tier = 0; tier < 8; tier++) {
      const y = 7 + tier * 2;
      const spanX = Math.max(2, 5 - Math.floor(tier * 0.45));
      const spanZ = Math.max(1, 3 - Math.floor(tier * 0.3));
      const col = tierColors[tier];
      for (let x = gpX - spanX; x <= gpX + spanX; x++) {
        for (let z = gpZ - spanZ; z <= gpZ + spanZ; z++) {
          const isEdge = (Math.abs(x - gpX) === spanX || Math.abs(z - gpZ) === spanZ);
          if (isEdge) {
            this.setBlock(x, y, z, col);
            this.setBlock(x, y + 1, z, (x % 2 === 0) ? 'gold_block' : col);
          }
        }
      }
    }
    // Barrel Vault Roof & 7 Golden Kalasam Finials at Y = 23 to 24
    for (let x = gpX - 3; x <= gpX + 3; x++) {
      this.setBlock(x, 23, gpZ, 'gold_block');
      this.setBlock(x, 24, gpZ, 'gold_block');
      this.setBlock(x, 25, gpZ, 'glowstone');
    }

    // 16-Pillared Stone Mandapam Hall in front of Gopuram (Z in [gpZ + 6, gpZ + 14], X in [gpX - 5, gpX + 5])
    for (let dx of [-4, -1, 1, 4]) {
      for (let dz of [7, 10, 13]) {
        for (let y = 1; y <= 4; y++) {
          this.setBlock(gpX + dx, y, gpZ + dz, 'quartz_pillar');
        }
        // Brass hanging temple bell
        this.setBlock(gpX + dx, 3, gpZ + dz + 1, 'gold_block');
      }
    }
    // Mandapam Stone Roof
    for (let x = gpX - 5; x <= gpX + 5; x++) {
      for (let z = gpZ + 6; z <= gpZ + 14; z++) {
        this.setBlock(x, 5, z, 'stone_bricks');
      }
    }

    // Sacred Stepwell Tank (Temple Kulam) at (gpX, gpZ + 22)
    const kulamZ = gpZ + 22;
    for (let dx = -5; dx <= 5; dx++) {
      for (let dz = -5; dz <= 5; dz++) {
        const dist = Math.max(Math.abs(dx), Math.abs(dz));
        if (dist === 5) {
          this.setBlock(gpX + dx, 1, kulamZ + dz, 'stone_bricks'); // Top terrace
        } else if (dist === 4) {
          this.setBlock(gpX + dx, 0, kulamZ + dz, 'smooth_stone'); // Middle step
        } else {
          this.setBlock(gpX + dx, -1, kulamZ + dz, 'stone_bricks'); // Pool bed
          this.setBlock(gpX + dx, 0, kulamZ + dz, 'water'); // Sacred water
        }
      }
    }
    this.setBlock(gpX, 0, kulamZ, 'sea_lantern');

    this.setBlock(gpX, 2, gpZ + 5, 'gold_block', {
      type: 'sign',
      title: 'Dravidian Temple Gopuram & Mandapam',
      text: 'Majestic southern multi-tiered temple tower adorned with sculptures, pillared mandapam, and holy kulam tank.'
    });

    // C. Chennai Marina Beach Lighthouse & Coastal Cultural Life at (145, -125)
    const lhX = 145;
    const lhZ = -125;
    // Octagonal Lighthouse Tower rising to Y = 22 with alternating Red and White Bands
    for (let y = 1; y <= 20; y++) {
      const isRedBand = Math.floor(y / 4) % 2 === 0;
      const mat = isRedBand ? 'red_terracotta' : 'quartz_block';
      for (let dx = -2; dx <= 2; dx++) {
        for (let dz = -2; dz <= 2; dz++) {
          if (Math.abs(dx) + Math.abs(dz) <= 3) {
            this.setBlock(lhX + dx, y, lhZ + dz, (Math.abs(dx) === 2 || Math.abs(dz) === 2) ? mat : 'stone_bricks');
          }
        }
      }
    }
    // Lighthouse Observation Deck & Lantern Room (Y = 21 to 24)
    for (let dx = -3; dx <= 3; dx++) {
      for (let dz = -3; dz <= 3; dz++) {
        this.setBlock(lhX + dx, 21, lhZ + dz, 'smooth_stone');
        if (Math.abs(dx) === 3 || Math.abs(dz) === 3) {
          this.setBlock(lhX + dx, 22, lhZ + dz, 'iron_block'); // Railing
        }
      }
    }
    // Rotating Powerful Maritime Beacon
    for (let dx = -1; dx <= 1; dx++) {
      for (let dz = -1; dz <= 1; dz++) {
        this.setBlock(lhX + dx, 22, lhZ + dz, 'cyber_glass');
        this.setBlock(lhX + dx, 23, lhZ + dz, 'cyber_glass');
      }
    }
    this.setBlock(lhX, 22, lhZ, 'beacon');
    this.setBlock(lhX, 23, lhZ, 'glowstone');
    this.setBlock(lhX, 24, lhZ, 'red_terracotta'); // Conical cap

    this.setBlock(lhX, 2, lhZ + 4, 'quartz_block', {
      type: 'sign',
      title: 'Marina Beach Lighthouse · Chennai',
      text: 'Iconic triangular/octagonal maritime beacon guiding sailors along the Coromandel Coast of the Bay of Bengal.'
    });

    // Fishing Catamarans on Marina Sand Shore at (140, -118)
    for (const catZ of [-118, -114]) {
      for (let x = 138; x <= 144; x++) {
        this.setBlock(x, 1, catZ, 'spruce_log');
        this.setBlock(x, 1, catZ + 1, 'oak_planks');
      }
      this.setBlock(141, 2, catZ, 'oak_fence');
      this.setBlock(141, 3, catZ, 'oak_fence');
      this.setBlock(142, 3, catZ, 'quartz_block'); // Folded sail
    }

    // Marina Beach Sundal Snack Cart at (148, 1, -120)
    this.setBlock(148, 1, -120, 'coal_block');
    this.setBlock(150, 1, -120, 'coal_block');
    this.setBlock(149, 2, -120, 'oak_planks');
    this.setBlock(149, 3, -120, 'gold_block'); // Sundal boiling pot
    this.setBlock(149, 3, -121, 'lantern');
    this.setBlock(149, 2, -119, 'smooth_stone', {
      type: 'sign',
      title: 'Marina Sundal Cart',
      text: 'Hot spiced boiled chickpea sundal with fresh grated coconut and raw mango slices!'
    });

    // Colorful Kites Flying over Marina Shore
    const kites: [number, number, string][] = [[142, -128, 'gold_block'], [148, -132, 'amethyst_block'], [136, -124, 'emerald_block']];
    for (const [kx, kz, col] of kites) {
      for (let y = 1; y <= 6; y++) this.setBlock(kx, y, kz, 'iron_block');
      this.setBlock(kx, 7, kz, col);
      this.setBlock(kx + 1, 7, kz, col);
      this.setBlock(kx, 8, kz, col);
      this.setBlock(kx, 6, kz, 'glowstone');
    }

    // D. Sher-e-Punjab Highway Dhaba & Decorated Tata Truck at (55, -75)
    const dhabaX = 55;
    const dhabaZ = -75;
    // Dhaba Pavilion Thatched Shelter
    for (let x = dhabaX - 5; x <= dhabaX + 5; x++) {
      for (let z = dhabaZ - 4; z <= dhabaZ + 4; z++) {
        this.setBlock(x, 1, z, 'terracotta_adobe');
        if (Math.abs(x - dhabaX) === 5 && Math.abs(z - dhabaZ) === 4) {
          for (let y = 2; y <= 4; y++) this.setBlock(x, y, z, 'spruce_log'); // Wooden support posts
        }
        this.setBlock(x, 5, z, 'oak_planks'); // Thatched roof
      }
    }
    // Woven String Charpai Cots
    const charpais = [[dhabaX - 3, dhabaZ - 2], [dhabaX - 3, dhabaZ + 2], [dhabaX + 2, dhabaZ - 2]];
    for (const [cpx, cpz] of charpais) {
      this.setBlock(cpx, 2, cpz, 'red_terracotta');
      this.setBlock(cpx + 1, 2, cpz, 'red_terracotta');
      this.setBlock(cpx, 1, cpz, 'oak_fence');
      this.setBlock(cpx + 1, 1, cpz, 'oak_fence');
    }
    // Roadside Clay Tandoor Oven with Smoking Chimney
    this.setBlock(dhabaX + 4, 2, dhabaZ + 2, 'terracotta_adobe');
    this.setBlock(dhabaX + 4, 3, dhabaZ + 2, 'terracotta_adobe');
    this.setBlock(dhabaX + 4, 2, dhabaZ + 1, 'magma_block');
    this.setBlock(dhabaX + 4, 3, dhabaZ + 1, 'glowstone');
    this.setBlock(dhabaX + 4, 4, dhabaZ + 1, 'cauldron'); // Chimney pot

    // Decorated Indian Tata Truck ("HORN OK PLEASE") parked at (48, 1, -74)
    const truckX = 48;
    const truckZ = -74;
    // 6 Heavy Wheels
    for (const [wx, wz] of [[truckX - 3, truckZ - 1], [truckX, truckZ - 1], [truckX + 2, truckZ - 1],
                            [truckX - 3, truckZ + 1], [truckX, truckZ + 1], [truckX + 2, truckZ + 1]]) {
      this.setBlock(wx, 1, wz, 'coal_block');
    }
    // Cargo Bed with vibrant folk filigree paintings
    for (let x = truckX - 4; x <= truckX + 1; x++) {
      for (let z = truckZ - 1; z <= truckZ + 1; z++) {
        this.setBlock(x, 2, z, 'oak_planks');
        const isSide = Math.abs(z - truckZ) === 1;
        if (isSide) {
          this.setBlock(x, 3, z, (x % 2 === 0) ? 'gold_block' : 'emerald_block');
          this.setBlock(x, 4, z, (x % 2 === 0) ? 'red_terracotta' : 'lapis_block');
        }
      }
    }
    // High-Roof Driver Cab (X in [truckX + 2, truckX + 4])
    for (let x = truckX + 2; x <= truckX + 4; x++) {
      for (let z = truckZ - 1; z <= truckZ + 1; z++) {
        this.setBlock(x, 2, z, 'red_terracotta');
        this.setBlock(x, 3, z, (x === truckX + 4) ? 'cyber_glass' : 'red_terracotta');
        this.setBlock(x, 4, z, (x === truckX + 4) ? 'cyber_glass' : 'red_terracotta');
        this.setBlock(x, 5, z, 'gold_block'); // Crown
      }
    }
    // Front chrome grill & headlights
    this.setBlock(truckX + 5, 2, truckZ, 'iron_block');
    this.setBlock(truckX + 5, 2, truckZ - 1, 'glowstone');
    this.setBlock(truckX + 5, 2, truckZ + 1, 'glowstone');
    // Twin vertical chrome exhaust pipes
    this.setBlock(truckX + 2, 5, truckZ - 1, 'iron_block');
    this.setBlock(truckX + 2, 6, truckZ - 1, 'iron_block');
    this.setBlock(truckX + 2, 5, truckZ + 1, 'iron_block');
    this.setBlock(truckX + 2, 6, truckZ + 1, 'iron_block');

    // Tailgate "HORN OK PLEASE" Sign
    this.setBlock(truckX - 4, 3, truckZ, 'gold_block', {
      type: 'sign',
      title: 'Tata 1613 Truck · National Permit',
      text: '★ HORN OK PLEASE ★ Buri Nazar Wale Tera Munh Kaala ★ All India Permit'
    });

    // Roadside Vintage Indian Petrol Pump
    this.setBlock(truckX + 7, 2, truckZ - 3, 'red_terracotta');
    this.setBlock(truckX + 7, 3, truckZ - 3, 'iron_block');
    this.setBlock(truckX + 7, 4, truckZ - 3, 'glowstone'); // Fuel globe

    this.setBlock(dhabaX, 2, dhabaZ - 5, 'terracotta_adobe', {
      type: 'sign',
      title: 'Sher-e-Punjab Grand Trunk Dhaba',
      text: 'Crispy butter tandoori rotis, dal makhani, charpai seating, and piping hot cutting chai!'
    });

    // E. Street Food Lane & "Raju ki Tapri" Chai Stall at (68, -75)
    const foodX = 68;
    const foodZ = -75;
    // Paved street food strip
    for (let x = foodX - 4; x <= foodX + 8; x++) {
      for (let z = foodZ - 2; z <= foodZ + 2; z++) {
        this.setBlock(x, 1, z, 'smooth_stone');
      }
    }
    // 1. "Raju ki Tapri" Cutting Chai Stall
    this.setBlock(foodX, 2, foodZ, 'oak_planks');
    this.setBlock(foodX, 3, foodZ, 'cauldron'); // Brass boiling kettle
    this.setBlock(foodX + 1, 2, foodZ, 'oak_planks');
    this.setBlock(foodX + 1, 3, foodZ, 'cyber_glass'); // Cutting glasses rack
    this.setBlock(foodX, 4, foodZ, 'lantern');
    this.setBlock(foodX, 2, foodZ - 1, 'gold_block', {
      type: 'sign',
      title: 'Raju ki Tapri · Special Cutting Chai',
      text: 'Kadak Masala Chai brewed with crushed fresh ginger, cardamom & lemongrass! Have a sip to restore energy.'
    });

    // 2. Pani Puri & Golgappe Stall at (foodX + 4, foodZ)
    this.setBlock(foodX + 4, 2, foodZ, 'terracotta_adobe');
    this.setBlock(foodX + 4, 3, foodZ, 'emerald_block'); // Teekha mint pani
    this.setBlock(foodX + 5, 2, foodZ, 'terracotta_adobe');
    this.setBlock(foodX + 5, 3, foodZ, 'red_sandstone'); // Meetha imli chutney
    this.setBlock(foodX + 4, 2, foodZ - 1, 'emerald_block', {
      type: 'sign',
      title: 'Golgappe & Pani Puri Stand',
      text: 'Crispy puris filled with spicy potato mash, mint water & sweet tamarind chutney. Pure street bliss!'
    });

    // 3. Mumbai Dosa Tawa Counter at (foodX + 7, foodZ)
    this.setBlock(foodX + 7, 2, foodZ, 'stone_bricks');
    this.setBlock(foodX + 7, 3, foodZ, 'obsidian'); // Cast iron flat tawa
    this.setBlock(foodX + 7, 3, foodZ + 1, 'gold_block'); // Golden crispy Mysore Masala Dosa
    this.setBlock(foodX + 7, 2, foodZ - 1, 'quartz_block', {
      type: 'sign',
      title: 'Dosa & Uttapam Counter',
      text: 'Fresh crispy butter dosa served with hot sambar and freshly ground coconut chutney.'
    });

    // F. Gully Cricket Pitch on the River Plains at (88, -100)
    const cricX = 88;
    const cricZ = -100;
    // 22-Yard Stamped Clay Pitch (X in [cricX - 6, cricX + 6], Z = cricZ)
    for (let x = cricX - 7; x <= cricX + 7; x++) {
      for (let z = cricZ - 1; z <= cricZ + 1; z++) {
        this.setBlock(x, 1, z, 'sandstone');
      }
    }
    // Batsman Crease (East: cricX + 5)
    this.setBlock(cricX + 5, 1, cricZ - 1, 'quartz_block');
    this.setBlock(cricX + 5, 1, cricZ, 'quartz_block');
    this.setBlock(cricX + 5, 1, cricZ + 1, 'quartz_block');
    // Three Wooden Wickets and Bails
    this.setBlock(cricX + 6, 2, cricZ - 1, 'oak_fence');
    this.setBlock(cricX + 6, 2, cricZ, 'oak_fence');
    this.setBlock(cricX + 6, 2, cricZ + 1, 'oak_fence');
    // Kashmir Willow Cricket Bat & Red Leather Ball
    this.setBlock(cricX + 4, 2, cricZ, 'oak_planks');
    this.setBlock(cricX + 3, 2, cricZ, 'redstone_block'); // Cricket ball

    // Bowler's Crease (West: cricX - 5)
    this.setBlock(cricX - 5, 1, cricZ - 1, 'quartz_block');
    this.setBlock(cricX - 5, 1, cricZ, 'quartz_block');
    this.setBlock(cricX - 5, 1, cricZ + 1, 'quartz_block');
    this.setBlock(cricX - 6, 2, cricZ, 'oak_fence'); // Non-striker wicket

    this.setBlock(cricX + 6, 3, cricZ, 'gold_block', {
      type: 'sign',
      title: 'Gully Cricket Championship Pitch',
      text: 'Rule 1: One-tip one-hand is OUT. Rule 2: Breaking neighbor\'s window is out + ball recovery duty!'
    });

    // G. Sacred Doorstep Kolam Carpet Art & Street Cow
    // Kolam patterns at (78, 1, -125) and (40, 1, -90)
    for (const [kx, kz] of [[78, -125], [40, -90]]) {
      this.setBlock(kx - 1, 1, kz, 'quartz_block');
      this.setBlock(kx + 1, 1, kz, 'quartz_block');
      this.setBlock(kx, 1, kz - 1, 'quartz_block');
      this.setBlock(kx, 1, kz + 1, 'quartz_block');
      this.setBlock(kx, 1, kz, 'red_terracotta');
    }
    // Street Cow resting peacefully by roadside at (62, 1, -78)
    const cowX = 62;
    const cowZ = -78;
    this.setBlock(cowX, 1, cowZ, 'quartz_block');
    this.setBlock(cowX + 1, 1, cowZ, 'coal_block'); // Patches
    this.setBlock(cowX + 2, 1, cowZ, 'quartz_block');
    this.setBlock(cowX + 3, 2, cowZ, 'quartz_block'); // Head
    this.setBlock(cowX + 3, 3, cowZ - 1, 'oak_fence'); // Horn
    this.setBlock(cowX + 3, 3, cowZ + 1, 'oak_fence'); // Horn
    this.setBlock(cowX, 1, cowZ - 1, 'stone_bricks', {
      type: 'sign',
      title: 'Gentle Street Cow · गौमाता',
      text: 'Peacefully resting by the roadside. Remember: The cow always has right of way in traffic!'
    });
  }

  // London & Westminster Realm (Westminster Palace, Big Ben, Tower Bridge, Routemaster Bus, Red Phone Booths)
  private buildLondonRealm() {
    const clockX = -32;
    const clockZ = -65;

    // 1. Big Ben (Elizabeth Tower)
    // Solid foundation plinth (Y = 1 to 2)
    for (let x = clockX - 3; x <= clockX + 3; x++) {
      for (let z = clockZ - 3; z <= clockZ + 3; z++) {
        this.setBlock(x, 1, z, 'stone_bricks');
        this.setBlock(x, 2, z, 'stone_bricks');
      }
    }
    // Main Gothic Tower Shaft (Y = 3 to 28)
    for (let y = 3; y <= 28; y++) {
      for (let x = clockX - 2; x <= clockX + 2; x++) {
        for (let z = clockZ - 2; z <= clockZ + 2; z++) {
          const isCorner = Math.abs(x - clockX) === 2 && Math.abs(z - clockZ) === 2;
          const isWall = Math.abs(x - clockX) === 2 || Math.abs(z - clockZ) === 2;
          if (isCorner) {
            this.setBlock(x, y, z, (y % 4 === 0) ? 'mossy_stone_bricks' : 'stone_bricks');
          } else if (isWall) {
            // Gothic arched window slits
            if ((y >= 8 && y <= 12) || (y >= 18 && y <= 22)) {
              if (Math.abs(x - clockX) === 0 || Math.abs(z - clockZ) === 0) {
                this.setBlock(x, y, z, 'iron_block');
              } else {
                this.setBlock(x, y, z, 'stone_bricks');
              }
            } else {
              this.setBlock(x, y, z, 'stone_bricks');
            }
          }
        }
      }
    }
    // Clock Stage (Y = 29 to 33) - 4-sided clock face
    for (let y = 29; y <= 33; y++) {
      for (let x = clockX - 3; x <= clockX + 3; x++) {
        for (let z = clockZ - 3; z <= clockZ + 3; z++) {
          const isOuterWall = Math.abs(x - clockX) === 3 || Math.abs(z - clockZ) === 3;
          if (isOuterWall) {
            const isRim = Math.abs(x - clockX) === 3 && Math.abs(z - clockZ) === 3;
            if (isRim) {
              this.setBlock(x, y, z, 'gold_block');
            } else if (y >= 30 && y <= 32) {
              // Clock Dial
              const isCenter = y === 31 && (x === clockX || z === clockZ);
              if (isCenter) {
                this.setBlock(x, y, z, 'coal_block'); // Clock hands hub
              } else {
                this.setBlock(x, y, z, 'quartz_block');
              }
            } else {
              this.setBlock(x, y, z, 'gold_block');
            }
          }
        }
      }
    }
    // Clock Interior Illumination
    for (let y = 30; y <= 32; y++) {
      this.setBlock(clockX, y, clockZ, 'glowstone');
    }

    // Belfry Chamber with the Great Bell (Y = 34 to 38)
    for (let y = 34; y <= 38; y++) {
      for (let x = clockX - 2; x <= clockX + 2; x++) {
        for (let z = clockZ - 2; z <= clockZ + 2; z++) {
          const isCorner = Math.abs(x - clockX) === 2 && Math.abs(z - clockZ) === 2;
          if (isCorner) {
            this.setBlock(x, y, z, 'stone_bricks');
          }
        }
      }
    }
    // Great Bell ("Big Ben") in center
    this.setBlock(clockX, 35, clockZ, 'iron_block');
    this.setBlock(clockX, 36, clockZ, 'gold_block');
    this.setBlock(clockX, 37, clockZ, 'gold_block');
    this.setBlock(clockX - 1, 36, clockZ, 'gold_block');
    this.setBlock(clockX + 1, 36, clockZ, 'gold_block');
    this.setBlock(clockX, 36, clockZ - 1, 'gold_block');
    this.setBlock(clockX, 36, clockZ + 1, 'gold_block');

    // Gothic Steeple & Copper Lantern Spire (Y = 39 to 46)
    for (let y = 39; y <= 45; y++) {
      const span = Math.max(0, 43 - y);
      for (let dx = -span; dx <= span; dx++) {
        for (let dz = -span; dz <= span; dz++) {
          this.setBlock(clockX + dx, y, clockZ + dz, 'lapis_block');
        }
      }
    }
    this.setBlock(clockX, 46, clockZ, 'beacon');
    this.setBlock(clockX, 47, clockZ, 'gold_block');

    this.setBlock(clockX, 3, clockZ + 4, 'stone_bricks', {
      type: 'sign',
      title: 'Big Ben · Palace of Westminster',
      text: 'The iconic Elizabeth Tower, chiming clock dials, and Great Bell overlooking the River Thames.'
    });

    // 2. Tower Bridge spanning the northern waterway (X in [-40, -24], Z in [-55, -47])
    // West Tower at (-38, -51), East Tower at (-26, -51)
    for (const tx of [-38, -26]) {
      // Pier Base
      for (let x = tx - 2; x <= tx + 2; x++) {
        for (let z = -53; z <= -49; z++) {
          for (let y = 1; y <= 3; y++) {
            this.setBlock(x, y, z, 'stone_bricks');
          }
        }
      }
      // Twin Gothic Turrets rising to Y = 18
      for (let y = 4; y <= 17; y++) {
        for (let x = tx - 2; x <= tx + 2; x++) {
          for (let z = -53; z <= -49; z++) {
            const isCorner = Math.abs(x - tx) === 2 && Math.abs(z - (-51)) === 2;
            const isWall = Math.abs(x - tx) === 2 || Math.abs(z - (-51)) === 2;
            const isArchway = Math.abs(z - (-51)) === 2 && Math.abs(x - tx) <= 1 && y <= 8;
            if (!isArchway) {
              if (isCorner) {
                this.setBlock(x, y, z, 'quartz_pillar');
              } else if (isWall) {
                this.setBlock(x, y, z, (y % 4 === 0) ? 'stone_bricks' : 'smooth_stone');
              }
            }
          }
        }
      }
      // Roof and Conical Pinnacles (Y = 18 to 21)
      for (let x = tx - 2; x <= tx + 2; x++) {
        for (let z = -53; z <= -49; z++) {
          this.setBlock(x, 18, z, 'stone_bricks');
        }
      }
      for (const [dx, dz] of [[-2, -2], [2, -2], [-2, 2], [2, 2]]) {
        this.setBlock(tx + dx, 19, -51 + dz, 'lapis_block');
        this.setBlock(tx + dx, 20, -51 + dz, 'gold_block');
      }
    }

    // High-Level Walkways between towers at Y = 15 and Y = 16
    for (let x = -35; x <= -29; x++) {
      this.setBlock(x, 15, -53, 'iron_block');
      this.setBlock(x, 15, -49, 'iron_block');
      this.setBlock(x, 16, -53, 'cyber_glass');
      this.setBlock(x, 16, -49, 'cyber_glass');
      this.setBlock(x, 17, -53, 'lapis_block');
      this.setBlock(x, 17, -49, 'lapis_block');
      this.setBlock(x, 15, -51, 'oak_planks'); // Walkway floor
      if (x % 3 === 0) this.setBlock(x, 16, -51, 'glowstone');
    }

    // Roadway bascules at Y = 3 spanning between towers
    for (let x = -42; x <= -22; x++) {
      for (let z = -52; z <= -50; z++) {
        this.setBlock(x, 3, z, (z === -51 && x % 4 === 0) ? 'smooth_stone' : 'asphalt_road');
      }
      this.setBlock(x, 4, -53, 'iron_block');
      this.setBlock(x, 4, -49, 'iron_block');
    }

    // 3. Classic Red Double-Decker Routemaster Bus at (-26, 1, -70)
    const busX = -26;
    const busZ = -70;
    // Wheels (4 wheels)
    for (const [wx, wz] of [[busX - 2, busZ - 1], [busX + 2, busZ - 1], [busX - 2, busZ + 1], [busX + 2, busZ + 1]]) {
      this.setBlock(wx, 1, wz, 'coal_block');
    }
    // Lower Deck (Y = 1 to 2)
    for (let x = busX - 3; x <= busX + 3; x++) {
      for (let z = busZ - 1; z <= busZ + 1; z++) {
        if (Math.abs(z) <= 1) {
          this.setBlock(x, 1, z, 'red_terracotta');
          // Windows on lower deck
          const isWindow = (x >= busX - 2 && x <= busX + 2 && Math.abs(z - busZ) === 1);
          this.setBlock(x, 2, z, isWindow ? 'cyber_glass' : 'red_terracotta');
        }
      }
    }
    // Upper Deck (Y = 3 to 4)
    for (let x = busX - 3; x <= busX + 3; x++) {
      for (let z = busZ - 1; z <= busZ + 1; z++) {
        this.setBlock(x, 3, z, (Math.abs(z - busZ) === 1) ? 'cyber_glass' : 'red_terracotta');
        this.setBlock(x, 4, z, 'red_terracotta'); // Roof
      }
    }
    // Headlights & Tail Lights & Destination Display
    this.setBlock(busX - 3, 1, busZ - 1, 'glowstone');
    this.setBlock(busX - 3, 1, busZ + 1, 'glowstone');
    this.setBlock(busX + 3, 1, busZ - 1, 'redstone_block');
    this.setBlock(busX + 3, 1, busZ + 1, 'redstone_block');
    this.setBlock(busX - 3, 3, busZ, 'gold_block', {
      type: 'sign',
      title: 'London Routemaster Bus · Route 159',
      text: 'Piccadilly Circus · Westminster · Tower Bridge · London Heritage Bus'
    });

    // 4. Red K2 Telephone Booths at (-28, 1, -64) and (-36, 1, -64)
    for (const phX of [-28, -36]) {
      this.setBlock(phX, 1, -64, 'stone_bricks');
      this.setBlock(phX, 2, -64, 'red_terracotta');
      this.setBlock(phX, 3, -64, 'cyber_glass');
      this.setBlock(phX, 4, -64, 'red_terracotta');
      this.setBlock(phX, 3, -64, 'lantern');
      this.setBlock(phX, 2, -63, 'smooth_stone', {
        type: 'sign',
        title: 'K2 Telephone Box',
        text: 'Classic British Post Office red telephone kiosk designed by Sir Giles Gilbert Scott.'
      });
    }

    // Cast Iron Streetlamps along Westminster Promenade
    for (let z = -74; z <= -56; z += 6) {
      this.setBlock(-36, 1, z, 'stone_bricks');
      this.setBlock(-36, 2, z, 'iron_block');
      this.setBlock(-36, 3, z, 'iron_block');
      this.setBlock(-36, 4, z, 'lantern');
    }
  }

  // Paris & Quartier Parisien (Walkable Eiffel Tower, Champ de Mars, Café de Paris bistro)
  private buildParisDistrict() {
    const cx = 26;
    const cz = -38;

    // 1. Walkable Eiffel Tower Overhaul
    // Solid stone footings under the 4 corner legs (Y = 1)
    const legCoords = [
      { lx: cx - 7, lz: cz - 7 },
      { lx: cx + 7, lz: cz - 7 },
      { lx: cx - 7, lz: cz + 7 },
      { lx: cx + 7, lz: cz + 7 },
    ];
    for (const leg of legCoords) {
      for (let dx = -1; dx <= 1; dx++) {
        for (let dz = -1; dz <= 1; dz++) {
          this.setBlock(leg.lx + dx, 1, leg.lz + dz, 'stone_bricks');
        }
      }
    }

    // The central ground under the tower (X in [cx - 5, cx + 5], Z in [cz - 5, cz + 5]) is OPEN & WALKABLE!
    for (let x = cx - 5; x <= cx + 5; x++) {
      for (let z = cz - 5; z <= cz + 5; z++) {
        this.setBlock(x, 1, z, (Math.abs(x - cx) <= 1 || Math.abs(z - cz) <= 1) ? 'smooth_stone' : 'quartz_block');
      }
    }

    // 4 Splayed Lattice Legs rising and slanting inwards towards First Deck (Y = 2 to 9)
    for (let y = 2; y <= 9; y++) {
      const span = Math.max(3, Math.round(7 - (y - 2) * 0.5));
      for (const sx of [-1, 1]) {
        for (const sz of [-1, 1]) {
          const px = cx + sx * span;
          const pz = cz + sz * span;
          this.setBlock(px, y, pz, 'iron_block');
          this.setBlock(px - sx, y, pz, 'iron_block');
          this.setBlock(px, y, pz - sz, 'iron_block');
        }
      }
      // Decorative horizontal iron tie-beams between legs at Y = 8 (leaving center arch high & clear)
      if (y === 8) {
        for (const sx of [-1, 1]) {
          for (let z = cz - 4; z <= cz + 4; z++) {
            this.setBlock(cx + sx * 4, y, z, 'iron_block');
          }
        }
        for (const sz of [-1, 1]) {
          for (let x = cx - 4; x <= cx + 4; x++) {
            this.setBlock(x, y, cz + sz * 4, 'iron_block');
          }
        }
      }
    }

    // First Observation Platform at Y = 10 (X in [cx - 5, cx + 5], Z in [cz - 5, cz + 5])
    for (let x = cx - 5; x <= cx + 5; x++) {
      for (let z = cz - 5; z <= cz + 5; z++) {
        this.setBlock(x, 10, z, 'smooth_stone');
        const isBorder = Math.abs(x - cx) === 5 || Math.abs(z - cz) === 5;
        if (isBorder) {
          this.setBlock(x, 11, z, 'iron_block'); // Safety railing
          if ((x + z) % 4 === 0) this.setBlock(x, 12, z, 'lantern');
        }
      }
    }

    // Tower midsection rising from First Platform to Second Platform (Y = 11 to 18)
    for (let y = 11; y <= 18; y++) {
      const span = Math.max(2, Math.round(4 - (y - 11) * 0.28));
      for (let x = cx - span; x <= cx + span; x++) {
        for (let z = cz - span; z <= cz + span; z++) {
          const isEdge = Math.abs(x - cx) === span || Math.abs(z - cz) === span;
          if (isEdge) {
            this.setBlock(x, y, z, 'iron_block');
          }
        }
      }
    }

    // Second Observation Platform at Y = 19 (X in [cx - 3, cx + 3], Z in [cz - 3, cz + 3])
    for (let x = cx - 3; x <= cx + 3; x++) {
      for (let z = cz - 3; z <= cz + 3; z++) {
        this.setBlock(x, 19, z, 'smooth_stone');
        const isBorder = Math.abs(x - cx) === 3 || Math.abs(z - cz) === 3;
        if (isBorder) {
          this.setBlock(x, 20, z, 'iron_block');
        }
      }
    }

    // Upper slender spire shaft (Y = 20 to 38)
    for (let y = 20; y <= 38; y++) {
      const span = y <= 28 ? 1 : 0;
      if (span === 1) {
        for (let dx = -1; dx <= 1; dx++) {
          for (let dz = -1; dz <= 1; dz++) {
            if (Math.abs(dx) + Math.abs(dz) <= 1) {
              this.setBlock(cx + dx, y, cz + dz, 'iron_block');
            }
          }
        }
      } else {
        this.setBlock(cx, y, cz, 'iron_block');
      }
    }

    // Glowing Summit Beacon & Spire (Y = 39 to 48)
    for (let y = 39; y <= 45; y++) {
      this.setBlock(cx, y, cz, (y % 2 === 0) ? 'glowstone' : 'iron_block');
    }
    this.setBlock(cx, 46, cz, 'gold_block');
    this.setBlock(cx, 47, cz, 'beacon');
    this.setBlock(cx, 48, cz, 'glowstone');

    this.setBlock(cx, 2, cz + 8, 'stone_bricks', {
      type: 'sign',
      title: 'Eiffel Tower · Tour Eiffel',
      text: 'Iconic wrought-iron lattice monument built by Gustave Eiffel for the 1889 Exposition Universelle.'
    });

    // 2. Champ de Mars Gardens (Z in [cz + 9, cz + 30], X in [cx - 8, cx + 8])
    for (let z = cz + 9; z <= cz + 30; z++) {
      // Central promenade walkway
      for (let x = cx - 2; x <= cx + 2; x++) {
        this.setBlock(x, 1, z, 'smooth_stone');
      }
      // Parterre grass lawns & trimmed hedges
      for (const gx of [cx - 6, cx - 5, cx + 5, cx + 6]) {
        this.setBlock(gx, 1, z, 'grass');
        if (z % 5 === 0) {
          this.setBlock(gx, 2, z, 'leaves');
        }
      }
      // Topiary cypress cones
      if (z === cz + 14 || z === cz + 24) {
        this.buildCypressTree(cx - 7, 1, z);
        this.buildCypressTree(cx + 7, 1, z);
      }
    }

    // Classical Stone Basin Fountain in Champ de Mars at (cx, 1, cz + 19)
    for (let dx = -2; dx <= 2; dx++) {
      for (let dz = -2; dz <= 2; dz++) {
        if (Math.abs(dx) === 2 || Math.abs(dz) === 2) {
          this.setBlock(cx + dx, 1, cz + 19 + dz, 'quartz_block');
        } else {
          this.setBlock(cx + dx, 1, cz + 19 + dz, 'water');
        }
      }
    }
    this.setBlock(cx, 2, cz + 19, 'sea_lantern');

    // 3. Café de Paris & Haussmannian Boulevard at (cx + 14, cz + 5)
    const cafeX = cx + 14;
    const cafeZ = cz + 5;
    // 3-Story Haussmannian building facade
    for (let x = cafeX; x <= cafeX + 8; x++) {
      for (let z = cafeZ; z <= cafeZ + 6; z++) {
        for (let y = 1; y <= 9; y++) {
          const isPerimeter = (x === cafeX || x === cafeX + 8 || z === cafeZ || z === cafeZ + 6);
          if (isPerimeter) {
            if (y === 1) {
              this.setBlock(x, y, z, 'stone_bricks');
            } else if (y === 2 || y === 3) {
              // Ground floor café windows
              this.setBlock(x, y, z, (x % 3 === 0) ? 'stone_bricks' : 'cyber_glass');
            } else if (y === 5 || y === 7) {
              // Upper floor French windows with iron balustrades
              this.setBlock(x, y, z, (x % 3 === 0) ? 'stone_bricks' : 'cyber_glass');
            } else if (y === 9) {
              this.setBlock(x, y, z, 'stone_bricks'); // Mansard cornice
            } else {
              this.setBlock(x, y, z, 'quartz_block');
            }
          }
        }
        // Mansard Zinc Roof at Y = 10
        this.setBlock(x, 10, z, 'stone_bricks');
      }
    }

    // Bistro outdoor sidewalk tables & red-white striped awning
    for (let x = cafeX - 3; x <= cafeX - 1; x++) {
      this.setBlock(x, 1, cafeZ + 2, 'smooth_stone');
      this.setBlock(x, 1, cafeZ + 4, 'smooth_stone');
    }
    // Awning at Y = 4
    for (let x = cafeX - 3; x < cafeX; x++) {
      for (let z = cafeZ + 1; z <= cafeZ + 5; z++) {
        this.setBlock(x, 4, z, (z % 2 === 0) ? 'red_terracotta' : 'quartz_block');
      }
    }
    // Bistro Tables & Chairs
    this.setBlock(cafeX - 2, 2, cafeZ + 2, 'oak_fence');
    this.setBlock(cafeX - 2, 3, cafeZ + 2, 'smooth_stone'); // Tabletop
    this.setBlock(cafeX - 2, 2, cafeZ + 4, 'oak_fence');
    this.setBlock(cafeX - 2, 3, cafeZ + 4, 'smooth_stone');
    this.setBlock(cafeX - 3, 2, cafeZ + 2, 'oak_planks'); // Chair
    this.setBlock(cafeX - 3, 2, cafeZ + 4, 'oak_planks');

    this.setBlock(cafeX - 1, 2, cafeZ + 1, 'gold_block', {
      type: 'sign',
      title: 'Café de Paris · Boulevard Saint-Germain',
      text: 'Fresh croissants, café au lait, and outdoor terrace seating overlooking the Eiffel Tower.'
    });
  }

  // Tokyo & Shibuya Realm (Shibuya Scramble Crossing, Giant LED Billboards, Torii Gate, Hachiko Plaza, Shinkansen)
  private buildTokyoShibuyaRealm() {
    const cx = -155;
    const cz = -80;

    // 1. Shibuya Scramble Crossing
    // Main 8-lane Intersection (X in [cx - 8, cx + 8], Z in [cz - 8, cz + 8])
    for (let x = cx - 8; x <= cx + 8; x++) {
      for (let z = cz - 8; z <= cz + 8; z++) {
        this.setBlock(x, 1, z, 'asphalt_road');
        // Perimeter Crosswalks
        const isPerimeterCrosswalk = (Math.abs(x - (cx - 7)) <= 1 || Math.abs(x - (cx + 7)) <= 1 ||
                                      Math.abs(z - (cz - 7)) <= 1 || Math.abs(z - (cz + 7)) <= 1);
        if (isPerimeterCrosswalk && (x + z) % 2 === 0) {
          this.setBlock(x, 1, z, 'smooth_stone');
        }
        // Diagonal Scramble Zebra Crossings (iconic Shibuya X)
        const d1 = Math.abs((x - cx) - (z - cz));
        const d2 = Math.abs((x - cx) + (z - cz));
        if ((d1 <= 1 || d2 <= 1) && (x + z) % 2 === 0) {
          this.setBlock(x, 1, z, 'quartz_block');
        }
      }
    }

    // 2. Surrounding Cyberpunk Skyscrapers with Giant LED Billboards
    // Building 1 (North-East: Shibuya 109 style cylinder corner tower at cx + 10, cz - 10)
    const b1x = cx + 11;
    const b1z = cz - 11;
    for (let y = 1; y <= 24; y++) {
      for (let dx = 0; dx <= 6; dx++) {
        for (let dz = 0; dz >= -6; dz--) {
          const isEdge = (dx === 0 || dz === 0);
          if (isEdge) {
            // Giant LED Billboard on lower and mid floors
            if (y >= 4 && y <= 16 && (dx === 0 || dz === 0)) {
              const ledColor = ((y + dx - dz) % 4 === 0) ? 'amethyst_block' :
                               ((y + dx - dz) % 4 === 1) ? 'emerald_block' :
                               ((y + dx - dz) % 4 === 2) ? 'sea_lantern' : 'lapis_block';
              this.setBlock(b1x + dx, y, b1z + dz, ledColor);
            } else {
              this.setBlock(b1x + dx, y, b1z + dz, (y % 4 === 0) ? 'stone_bricks' : 'cyber_glass');
            }
          }
        }
      }
    }
    // Illuminated Crown Logo atop Building 1
    this.setBlock(b1x + 1, 25, b1z - 1, 'glowstone');
    this.setBlock(b1x + 2, 25, b1z - 1, 'beacon');

    // Building 2 (North-West: QFRONT Billboard Tower at cx - 11, cz - 11)
    const b2x = cx - 11;
    const b2z = cz - 11;
    for (let y = 1; y <= 22; y++) {
      for (let dx = 0; dx >= -6; dx--) {
        for (let dz = 0; dz >= -6; dz--) {
          const isFacingCrossing = (dx === 0 || dz === 0);
          if (isFacingCrossing) {
            if (y >= 5 && y <= 18) {
              // Giant Animated Display Wall
              this.setBlock(b2x + dx, y, b2z + dz, (y % 3 === 0) ? 'redstone_block' : (y % 3 === 1) ? 'gold_block' : 'glowstone');
            } else {
              this.setBlock(b2x + dx, y, b2z + dz, 'cyber_glass');
            }
          }
        }
      }
    }

    // 3. Hachiko Plaza & Shinto Torii Gate (South-West: cx - 11, cz + 10)
    const hachikoX = cx - 10;
    const hachikoZ = cz + 10;
    // Stone Plaza floor
    for (let x = hachikoX - 4; x <= hachikoX + 4; x++) {
      for (let z = hachikoZ - 4; z <= hachikoZ + 4; z++) {
        this.setBlock(x, 1, z, 'stone_bricks');
      }
    }
    // Hachiko Bronze Dog Statue on Granite Plinth
    this.setBlock(hachikoX, 2, hachikoZ, 'stone_bricks');
    this.setBlock(hachikoX, 3, hachikoZ, 'gold_block');
    this.setBlock(hachikoX, 4, hachikoZ, 'iron_block');
    this.setBlock(hachikoX, 2, hachikoZ - 1, 'stone_bricks', {
      type: 'sign',
      title: 'Hachikō Memorial Plaza · 忠犬ハチ公',
      text: 'Faithful Akita dog commemorated for loyalty at Shibuya Station. Tokyo rendezvous point.'
    });

    // Red Vermilion Shinto Torii Gate at (hachikoX - 2, hachikoZ + 3)
    const toriiX = hachikoX - 2;
    const toriiZ = hachikoZ + 3;
    for (let y = 2; y <= 6; y++) {
      this.setBlock(toriiX - 2, y, toriiZ, 'red_terracotta');
      this.setBlock(toriiX + 2, y, toriiZ, 'red_terracotta');
    }
    // Top lintels (Kasagi and Shimaki)
    for (let x = toriiX - 3; x <= toriiX + 3; x++) {
      this.setBlock(x, 6, toriiZ, 'red_terracotta');
      this.setBlock(x, 7, toriiZ, (Math.abs(x - toriiX) === 3) ? 'gold_block' : 'red_terracotta');
    }
    // Lower tie beam (Nuki)
    for (let x = toriiX - 2; x <= toriiX + 2; x++) {
      this.setBlock(x, 5, toriiZ, 'red_terracotta');
    }

    // Cherry Blossom (Sakura) Trees flanking the shrine
    this.buildSakuraTree(toriiX - 4, 1, toriiZ - 2);
    this.buildSakuraTree(toriiX + 4, 1, toriiZ + 2);

    // 4. Shinkansen (Bullet Train) Elevated Viaduct & Platform (South: Z in [cz + 8, cz + 14], X in [cx - 15, cx + 15])
    for (let x = cx - 15; x <= cx + 15; x++) {
      // Concrete viaduct support pillars every 6 blocks
      if (x % 6 === 0) {
        for (let y = 1; y <= 5; y++) {
          this.setBlock(x, y, cz + 11, 'quartz_pillar');
        }
      }
      // Viaduct Track Bed at Y = 6
      for (let z = cz + 9; z <= cz + 13; z++) {
        this.setBlock(x, 6, z, 'smooth_stone');
        if (z === cz + 11) {
          this.setBlock(x, 7, z, (x % 2 === 0) ? 'oak_planks' : 'iron_block'); // Train rails
        }
      }
      this.setBlock(x, 7, cz + 9, 'stone_bricks'); // Rail guard wall
      this.setBlock(x, 7, cz + 13, 'stone_bricks');
    }

    // Aerodynamic Shinkansen Series N700 Bullet Train parked at platform
    const trainStartX = cx - 4;
    // Aerodynamic nose cone (pointed duckbill)
    this.setBlock(trainStartX - 5, 8, cz + 11, 'quartz_block');
    this.setBlock(trainStartX - 4, 8, cz + 11, 'quartz_block');
    this.setBlock(trainStartX - 4, 9, cz + 11, 'cyber_glass'); // Cockpit
    for (let x = trainStartX - 3; x <= trainStartX + 6; x++) {
      this.setBlock(x, 8, cz + 10, 'quartz_block');
      this.setBlock(x, 8, cz + 12, 'quartz_block');
      this.setBlock(x, 8, cz + 11, 'lapis_block'); // Shinkansen blue stripe
      this.setBlock(x, 9, cz + 10, (x % 2 === 0) ? 'cyber_glass' : 'quartz_block');
      this.setBlock(x, 9, cz + 12, (x % 2 === 0) ? 'cyber_glass' : 'quartz_block');
      this.setBlock(x, 10, cz + 11, 'quartz_block'); // Roof
    }
    // Pantograph power collector
    this.setBlock(trainStartX + 2, 11, cz + 11, 'iron_block');
    this.setBlock(trainStartX + 2, 12, cz + 11, 'glowstone');

    this.setBlock(cx, 2, cz - 8, 'stone_bricks', {
      type: 'sign',
      title: 'Shibuya Scramble Crossing · 渋谷スクランブル交差点',
      text: 'The busiest pedestrian intersection in the world, surrounded by neon billboard towers and Shinkansen rail.'
    });
  }

  // Seoul & Korea Realm (Gwanghwamun Joseon Palace Gate, N Seoul Tower, Hongdae K-Pop Street & Food Cart)
  private buildSeoulRealm() {
    // 1. Gwanghwamun Joseon Palace Gate at (-65, -95)
    const gateX = -65;
    const gateZ = -95;

    // High White Stone Embankment Base (Y = 1 to 5)
    for (let x = gateX - 10; x <= gateX + 10; x++) {
      for (let z = gateZ - 3; z <= gateZ + 3; z++) {
        for (let y = 1; y <= 5; y++) {
          this.setBlock(x, y, z, 'stone_bricks');
        }
      }
    }
    // Three Arched Portals through the stone base (Center arched gate, West & East gates)
    const portals = [gateX - 5, gateX, gateX + 5];
    for (const px of portals) {
      for (let z = gateZ - 3; z <= gateZ + 3; z++) {
        for (let y = 1; y <= 4; y++) {
          if (y === 4 && (px === gateX - 5 || px === gateX + 5)) {
            // Side gates are slightly lower
            continue;
          }
          this.setBlock(px, y, z, 'smooth_stone'); // Walkway opening
          this.setBlock(px - 1, y, z, (y === 1) ? 'smooth_stone' : 'air');
          this.setBlock(px + 1, y, z, (y === 1) ? 'smooth_stone' : 'air');
        }
      }
    }

    // Two-Story Royal Wooden Pavilion above (Y = 6 to 13)
    // Vermilion wooden pillars and Dancheong decorative eaves
    for (let y = 6; y <= 11; y++) {
      for (let x = gateX - 8; x <= gateX + 8; x++) {
        for (let z = gateZ - 2; z <= gateZ + 2; z++) {
          const isPillar = (Math.abs(x - gateX) % 4 === 0) && (Math.abs(z - gateZ) === 2);
          if (isPillar) {
            this.setBlock(x, y, z, 'red_terracotta');
          }
          if (y === 6) {
            this.setBlock(x, y, z, 'oak_planks'); // Balcony floor
          }
        }
      }
    }
    // Dancheong Painted Eaves (emerald & lapis & gold)
    for (let x = gateX - 11; x <= gateX + 11; x++) {
      for (let z = gateZ - 4; z <= gateZ + 4; z++) {
        const isEave = Math.abs(x - gateX) >= 9 || Math.abs(z - gateZ) >= 3;
        if (isEave) {
          this.setBlock(x, 9, z, (x % 2 === 0) ? 'emerald_block' : 'lapis_block');
          this.setBlock(x, 12, z, (x % 2 === 0) ? 'emerald_block' : 'lapis_block');
        }
      }
    }
    // Traditional Sweeping Curved Hanok Roof (Y = 12 to 15)
    for (let x = gateX - 10; x <= gateX + 10; x++) {
      for (let z = gateZ - 3; z <= gateZ + 3; z++) {
        const distEdge = Math.max(Math.abs(x - gateX) - 6, Math.abs(z - gateZ) - 1);
        const roofY = Math.max(13, 15 - Math.max(0, distEdge));
        this.setBlock(x, roofY, z, 'purpur_block');
      }
    }
    // Ridge finials
    this.setBlock(gateX, 16, gateZ, 'gold_block');
    this.setBlock(gateX - 9, 14, gateZ, 'gold_block');
    this.setBlock(gateX + 9, 14, gateZ, 'gold_block');

    this.setBlock(gateX, 6, gateZ + 3, 'gold_block', {
      type: 'sign',
      title: 'Gwanghwamun Palace Gate · 광화문',
      text: 'Main royal gate of Gyeongbokgung Palace, featuring traditional Joseon architecture and Dancheong eaves.'
    });

    // 2. N Seoul Tower (Namsan Tower) atop the Namsan knoll at (-52, -115)
    const towerX = -52;
    const towerZ = -115;
    const baseTerrainY = this.getTerrainHeight(towerX, towerZ); // ~14

    // Observation Base Plaza (Y = baseTerrainY)
    for (let dx = -4; dx <= 4; dx++) {
      for (let dz = -4; dz <= 4; dz++) {
        this.setBlock(towerX + dx, baseTerrainY, towerZ + dz, 'quartz_block');
      }
    }

    // Slender Concrete & Steel Tower Shaft (Y = baseTerrainY + 1 to baseTerrainY + 20)
    for (let y = baseTerrainY + 1; y <= baseTerrainY + 20; y++) {
      for (let dx = -1; dx <= 1; dx++) {
        for (let dz = -1; dz <= 1; dz++) {
          if (Math.abs(dx) + Math.abs(dz) <= 1) {
            this.setBlock(towerX + dx, y, towerZ + dz, 'quartz_pillar');
          }
        }
      }
      if (y % 4 === 0) {
        this.setBlock(towerX, y, towerZ, 'sea_lantern');
      }
    }

    // Multi-Deck Cylindrical Observation Capsule at Y = baseTerrainY + 21 to baseTerrainY + 26
    const deckBaseY = baseTerrainY + 21;
    for (let y = deckBaseY; y <= deckBaseY + 5; y++) {
      for (let dx = -3; dx <= 3; dx++) {
        for (let dz = -3; dz <= 3; dz++) {
          const dist = Math.hypot(dx, dz);
          if (dist <= 3.2 && dist >= 2.0) {
            // 360-degree glass observation deck
            this.setBlock(towerX + dx, y, towerZ + dz, (y === deckBaseY || y === deckBaseY + 5) ? 'quartz_block' : 'cyber_glass');
          } else if (dist < 2.0 && (y === deckBaseY || y === deckBaseY + 5)) {
            this.setBlock(towerX + dx, y, towerZ + dz, 'smooth_stone');
          }
        }
      }
    }
    this.setBlock(towerX, deckBaseY + 2, towerZ, 'glowstone');

    // Iconic Colorful Transmission Antenna Spire (Y = deckBaseY + 6 to deckBaseY + 15)
    for (let y = deckBaseY + 6; y <= deckBaseY + 13; y++) {
      const antennaColor = (y % 3 === 0) ? 'emerald_block' : (y % 3 === 1) ? 'amethyst_block' : 'lapis_block';
      this.setBlock(towerX, y, towerZ, antennaColor);
    }
    this.setBlock(towerX, deckBaseY + 14, towerZ, 'beacon');
    this.setBlock(towerX, deckBaseY + 15, towerZ, 'glowstone');

    this.setBlock(towerX, baseTerrainY + 1, towerZ + 4, 'quartz_block', {
      type: 'sign',
      title: 'N Seoul Tower · N서울타워',
      text: 'Iconic panoramic communications spire on Mount Namsan, illuminating Seoul\'s evening skyline.'
    });

    // 3. Hongdae K-Pop Street & Night Market Food Cart at (-55, -92)
    const kpopX = -55;
    const kpopZ = -92;
    // Neon street pavement
    for (let x = kpopX - 4; x <= kpopX + 4; x++) {
      for (let z = kpopZ - 2; z <= kpopZ + 2; z++) {
        this.setBlock(x, 1, z, 'asphalt_road');
      }
    }
    // K-Pop Record Store Facade with Neon Hangul sign
    for (let y = 1; y <= 6; y++) {
      for (let x = kpopX - 3; x <= kpopX + 3; x++) {
        if (y === 1) {
          this.setBlock(x, y, kpopZ - 3, 'stone_bricks');
        } else if (y >= 2 && y <= 4) {
          this.setBlock(x, y, kpopZ - 3, (Math.abs(x - kpopX) <= 1) ? 'cyber_glass' : 'amethyst_block');
        } else {
          // Neon billboard sign
          this.setBlock(x, y, kpopZ - 3, (x % 2 === 0) ? 'redstone_block' : 'sea_lantern');
        }
      }
    }

    // Pojangmacha Street Food Cart (Tteokbokki spicy rice cakes & Bungeo-ppang)
    const cartX = kpopX + 2;
    const cartZ = kpopZ + 1;
    this.setBlock(cartX - 1, 1, cartZ, 'coal_block');
    this.setBlock(cartX + 1, 1, cartZ, 'coal_block');
    this.setBlock(cartX, 2, cartZ, 'terracotta_adobe');
    this.setBlock(cartX - 1, 2, cartZ, 'redstone_block'); // Tteokbokki tray
    this.setBlock(cartX + 1, 2, cartZ, 'gold_block'); // Bungeo-ppang pastries
    this.setBlock(cartX, 3, cartZ, 'cauldron'); // Steaming broth
    // Orange tarp tent roof
    for (let dx = -1; dx <= 1; dx++) {
      for (let dz = -1; dz <= 1; dz++) {
        this.setBlock(cartX + dx, 4, cartZ + dz, 'red_terracotta');
      }
    }
    this.setBlock(cartX, 3, cartZ + 1, 'lantern');

    this.setBlock(cartX - 1, 2, cartZ + 1, 'glowstone', {
      type: 'sign',
      title: 'Hongdae Street Food · 홍대 포장마차',
      text: 'Hot simmering Tteokbokki (떡볶이), Odeng fish cakes, and warm bungeo-ppang pastries!'
    });
  }

  // Egypt & Giza Plateau (Three Sandstone Pyramids, Khufu Hollow Interior, Sphinx, Desert Oasis)
  private buildEgyptGizaRealm() {
    // 1. Great Pyramid of Khufu at (-165, 36)
    const kx = -165;
    const kz = 36;
    const kBaseHalf = 10; // 21x21 footprint
    const kHeight = 15; // steps from Y = 1 to Y = 16

    // Stepped Pyramid Shell
    for (let step = 0; step <= kHeight; step++) {
      const half = kBaseHalf - step;
      const y = 1 + step;
      if (half < 0) break;
      for (let dx = -half; dx <= half; dx++) {
        for (let dz = -half; dz <= half; dz++) {
          const isPerimeter = Math.abs(dx) === half || Math.abs(dz) === half;
          // Hollow interior: Grand Gallery & Burial Chamber!
          const isCorridor = (dx === 0 && dz <= 0 && dz >= -kBaseHalf && y >= 2 && y <= 4);
          const isChamber = (Math.abs(dx) <= 3 && Math.abs(dz) <= 3 && y >= 2 && y <= 6);

          if (isCorridor || isChamber) {
            // Floor of chamber/corridor
            if (y === 1) {
              this.setBlock(kx + dx, y, kz + dz, 'smooth_stone');
            }
            // Air inside hollow space
            continue;
          }

          if (isPerimeter || step === 0 || y <= 2) {
            const blockType = (step === kHeight) ? 'gold_block' :
                              (step % 3 === 0) ? 'red_sandstone' : 'sandstone';
            this.setBlock(kx + dx, y, kz + dz, blockType);
          }
        }
      }
    }
    // Solid Golden Pyramidion Capstone at top
    this.setBlock(kx, 2 + kHeight, kz, 'gold_block');
    this.setBlock(kx, 3 + kHeight, kz, 'sea_lantern');

    // Hollow Interior Pharaoh's Burial Chamber Details at (kx, kz)
    // Sarcophagus in center
    this.setBlock(kx, 2, kz, 'gold_block');
    this.setBlock(kx, 3, kz, 'lapis_block');
    this.setBlock(kx - 1, 2, kz, 'chest', {
      type: 'chest',
      title: 'Pharaoh\'s Golden Sarcophagus',
      text: 'Ancient burial treasures, lapis lazuli amulets, and royal hieroglyphs of Khufu.'
    });
    // Chamber Torches and Sacred Urns
    this.setBlock(kx - 2, 2, kz - 2, 'cauldron');
    this.setBlock(kx + 2, 2, kz - 2, 'cauldron');
    this.setBlock(kx - 2, 3, kz - 2, 'lantern');
    this.setBlock(kx + 2, 3, kz - 2, 'lantern');
    this.setBlock(kx - 2, 3, kz + 2, 'lantern');
    this.setBlock(kx + 2, 3, kz + 2, 'lantern');

    // Corridor entrance torches
    this.setBlock(kx - 1, 3, kz - kBaseHalf + 1, 'lantern');
    this.setBlock(kx + 1, 3, kz - kBaseHalf + 1, 'lantern');

    this.setBlock(kx, 2, kz - kBaseHalf - 1, 'sandstone', {
      type: 'sign',
      title: 'Great Pyramid of Giza · Pyramid of Khufu',
      text: 'Step inside the torch-lit Grand Gallery to explore the ancient pharaoh\'s burial chamber.'
    });

    // 2. Pyramid of Khafre at (-148, 48) - 15x15 base
    const kfX = -148;
    const kfZ = 48;
    for (let step = 0; step <= 10; step++) {
      const half = 7 - step;
      const y = 1 + step;
      if (half < 0) break;
      for (let dx = -half; dx <= half; dx++) {
        for (let dz = -half; dz <= half; dz++) {
          if (Math.abs(dx) === half || Math.abs(dz) === half || step === 10) {
            // Casing stone remnant at top
            this.setBlock(kfX + dx, y, kfZ + dz, (step >= 8) ? 'smooth_stone' : 'sandstone');
          }
        }
      }
    }
    this.setBlock(kfX, 12, kfZ, 'gold_block');

    // 3. Pyramid of Menkaure at (-175, 20) - 11x11 base
    const mkX = -175;
    const mkZ = 20;
    for (let step = 0; step <= 7; step++) {
      const half = 5 - step;
      const y = 1 + step;
      if (half < 0) break;
      for (let dx = -half; dx <= half; dx++) {
        for (let dz = -half; dz <= half; dz++) {
          if (Math.abs(dx) === half || Math.abs(dz) === half) {
            this.setBlock(mkX + dx, y, mkZ + dz, 'sandstone');
          }
        }
      }
    }

    // 4. Monumental Great Sphinx of Giza at (-152, 26) facing East
    const spX = -152;
    const spZ = 26;
    // Lion Body (length 12 along X, width 6 along Z, height 4)
    for (let x = spX - 6; x <= spX + 2; x++) {
      for (let z = spZ - 2; z <= spZ + 2; z++) {
        for (let y = 1; y <= 4; y++) {
          this.setBlock(x, y, z, 'sandstone');
        }
      }
    }
    // Outstretched Front Paws facing East (X in [spX + 3, spX + 7])
    for (let x = spX + 3; x <= spX + 7; x++) {
      for (let y = 1; y <= 2; y++) {
        this.setBlock(x, y, spZ - 2, 'sandstone');
        this.setBlock(x, y, spZ + 2, 'sandstone');
      }
    }
    // Royal Human Head with Nemes Pharaonic Headdress (at spX + 2, Y = 5 to 9)
    for (let y = 5; y <= 8; y++) {
      for (let dx = -1; dx <= 2; dx++) {
        for (let dz = -2; dz <= 2; dz++) {
          const isNemesFlap = (Math.abs(dz) === 2);
          if (isNemesFlap) {
            this.setBlock(spX + 2 + dx, y, spZ + dz, (y % 2 === 0) ? 'lapis_block' : 'gold_block');
          } else {
            this.setBlock(spX + 2 + dx, y, spZ + dz, 'sandstone');
          }
        }
      }
    }
    // Pharaonic Beard and Uraeus Crown
    this.setBlock(spX + 4, 4, spZ, 'gold_block');
    this.setBlock(spX + 4, 5, spZ, 'sandstone');
    this.setBlock(spX + 3, 9, spZ, 'gold_block'); // Crown

    this.setBlock(spX + 8, 2, spZ, 'sandstone', {
      type: 'sign',
      title: 'Great Sphinx of Giza · أبو الهول',
      text: 'Monumental limestone sculpture with the body of a lion and the head of Pharaoh Khafre.'
    });

    // 5. Desert Oasis & Camels at (-142, 38)
    const oasX = -142;
    const oasZ = 38;
    // Freshwater Pool
    for (let dx = -3; dx <= 3; dx++) {
      for (let dz = -3; dz <= 3; dz++) {
        if (Math.hypot(dx, dz) <= 3) {
          this.setBlock(oasX + dx, 1, oasZ + dz, 'water');
        }
      }
    }
    // Date Palm Trees around oasis
    this.buildPalmTree(oasX - 4, 1, oasZ - 2);
    this.buildPalmTree(oasX + 4, 1, oasZ + 3);

    // Saddled Camels resting on dunes
    for (const [camX, camZ] of [[-138, 34], [-140, 44]]) {
      this.setBlock(camX, 1, camZ, 'sandstone');
      this.setBlock(camX + 1, 1, camZ, 'sandstone');
      this.setBlock(camX, 2, camZ, 'red_terracotta'); // Saddle
      this.setBlock(camX + 1, 2, camZ, 'sandstone'); // Hump
      this.setBlock(camX - 1, 2, camZ, 'sandstone'); // Neck
      this.setBlock(camX - 1, 3, camZ, 'sandstone'); // Head
    }
  }

  // Dubai & Palm Jumeirah (Burj Khalifa Needle Spire Y=56, Glass Observation Deck, Palm Fronds & Villas)
  private buildDubaiRealm() {
    const bkX = 170;
    const bkZ = 42;

    // 1. Burj Khalifa Skyscraper
    // Tiered Spider-Lily Buttressed Base
    // Tier 1 (Y = 1 to 14): 9x9 base
    for (let y = 1; y <= 14; y++) {
      for (let dx = -4; dx <= 4; dx++) {
        for (let dz = -4; dz <= 4; dz++) {
          const dist = Math.abs(dx) + Math.abs(dz);
          if (dist <= 6) {
            const isGlass = (y % 3 !== 0) && (Math.abs(dx) === 4 || Math.abs(dz) === 4 || dist === 6);
            this.setBlock(bkX + dx, y, bkZ + dz, isGlass ? 'cyber_glass' : 'quartz_block');
          }
        }
      }
    }
    // Tier 2 (Y = 15 to 26): 7x7
    for (let y = 15; y <= 26; y++) {
      for (let dx = -3; dx <= 3; dx++) {
        for (let dz = -3; dz <= 3; dz++) {
          const dist = Math.abs(dx) + Math.abs(dz);
          if (dist <= 5) {
            const isGlass = (y % 3 !== 0) && (Math.abs(dx) === 3 || Math.abs(dz) === 3 || dist === 5);
            this.setBlock(bkX + dx, y, bkZ + dz, isGlass ? 'cyber_glass' : 'iron_block');
          }
        }
      }
    }
    // Tier 3 (Y = 27 to 36): 5x5
    for (let y = 27; y <= 36; y++) {
      for (let dx = -2; dx <= 2; dx++) {
        for (let dz = -2; dz <= 2; dz++) {
          const isEdge = Math.abs(dx) === 2 || Math.abs(dz) === 2;
          this.setBlock(bkX + dx, y, bkZ + dz, isEdge ? 'cyber_glass' : 'quartz_block');
        }
      }
    }
    // Tier 4 (Y = 37 to 44): 3x3
    for (let y = 37; y <= 44; y++) {
      for (let dx = -1; dx <= 1; dx++) {
        for (let dz = -1; dz <= 1; dz++) {
          this.setBlock(bkX + dx, y, bkZ + dz, (Math.abs(dx) === 1 || Math.abs(dz) === 1) ? 'cyber_glass' : 'quartz_block');
        }
      }
    }

    // Glass Sky Observation Deck at "At The Top" (Y = 45 to 47, 5x5 cantilevered glass deck)
    for (let y = 45; y <= 47; y++) {
      for (let dx = -2; dx <= 2; dx++) {
        for (let dz = -2; dz <= 2; dz++) {
          if (y === 45) {
            this.setBlock(bkX + dx, y, bkZ + dz, 'quartz_block');
          } else {
            const isEdge = Math.abs(dx) === 2 || Math.abs(dz) === 2;
            this.setBlock(bkX + dx, y, bkZ + dz, isEdge ? 'cyber_glass' : 'air');
          }
        }
      }
    }
    this.setBlock(bkX, 46, bkZ, 'glowstone');

    // Central Needle Spire (Y = 48 to 56) reaching the sky!
    for (let y = 48; y <= 54; y++) {
      this.setBlock(bkX, y, bkZ, 'iron_block');
    }
    this.setBlock(bkX, 55, bkZ, 'beacon');
    this.setBlock(bkX, 56, bkZ, 'sea_lantern');

    this.setBlock(bkX, 2, bkZ - 5, 'quartz_block', {
      type: 'sign',
      title: 'Burj Khalifa · برج خليفة',
      text: 'The tallest building in the world at 828 meters. Ride up to the glass observation deck at Y = 46!'
    });

    // 2. Palm Jumeirah Causeway & Frond Luxury Villas (X in [165, 195], Z in [25, 60])
    // Central Spine Causeway linking to mainland
    for (let x = 160; x <= 192; x++) {
      this.setBlock(x, 1, 42, 'asphalt_road');
      this.setBlock(x, 1, 41, 'stone_bricks');
      this.setBlock(x, 1, 43, 'stone_bricks');
      if (x % 6 === 0) {
        this.setBlock(x, 2, 41, 'lantern');
        this.setBlock(x, 2, 43, 'lantern');
      }
    }

    // Palm Fronds (North & South branches extending into lagoon waters)
    const frondsZ = [30, 36, 48, 54];
    for (const fz of frondsZ) {
      for (let x = 174; x <= 190; x++) {
        this.setBlock(x, 1, fz, 'sand');
        // Luxury White Villas on Fronds
        if (x === 182) {
          for (let vx = x - 2; vx <= x + 2; vx++) {
            for (let vz = fz - 1; vz <= fz + 1; vz++) {
              this.setBlock(vx, 2, vz, 'quartz_block');
              this.setBlock(vx, 3, vz, (vx === x) ? 'cyber_glass' : 'quartz_block');
              this.setBlock(vx, 4, vz, 'smooth_stone');
            }
          }
          // Infinity Pool overlooking the ocean
          this.setBlock(x + 3, 1, fz, 'water');
          this.setBlock(x + 3, 1, fz - 1, 'water');
        }
      }
      this.buildPalmTree(178, 1, fz);
      this.buildPalmTree(188, 1, fz);
    }

    this.setBlock(172, 2, 41, 'sandstone', {
      type: 'sign',
      title: 'Palm Jumeirah · نخلة جميرا',
      text: 'Iconic artificial archipelago shaped like a palm tree, featuring beachfront luxury villas and turquoise lagoons.'
    });
  }

  // 5. China & East Asian Realm (North-West: Great Wall, Temple Pavilion, 5-Tier Pagoda, Bamboo)
  private buildChinaRealm() {
    const px = -110;
    const pz = -110;

    // Great Wall of China dynamically cresting the mountain ridge
    for (let x = -150; x <= -80; x++) {
      const ridgeZ = -140 + Math.sin((x + 150) * 0.075) * 12 + Math.cos(x * 0.12) * 3;
      const wallZ = Math.round(ridgeZ);
      const groundY = this.getTerrainHeight(x, wallZ);

      // Deep foundation wall down to ensure no gaps on slopes
      for (let y = Math.max(-1, groundY - 2); y <= groundY + 4; y++) {
        for (let dz = -1; dz <= 1; dz++) {
          this.setBlock(x, y, wallZ + dz, (y % 4 === 0) ? 'mossy_stone_bricks' : 'stone_bricks');
        }
      }
      // Parapet battlements & walkway on top
      const walkY = groundY + 5;
      this.setBlock(x, walkY, wallZ, 'smooth_stone'); // Walkway
      this.setBlock(x, walkY + 1, wallZ - 1, (x % 2 === 0) ? 'stone_bricks' : 'red_terracotta');
      this.setBlock(x, walkY + 1, wallZ + 1, (x % 2 === 0) ? 'stone_bricks' : 'red_terracotta');
      if (x % 7 === 0) {
        this.setBlock(x, walkY + 2, wallZ, 'glowstone');
      }
    }

    // Great Wall Watchtowers at scenic mountain peaks
    for (const wx of [-140, -115, -90]) {
      const ridgeZ = -140 + Math.sin((wx + 150) * 0.075) * 12 + Math.cos(wx * 0.12) * 3;
      const wz = Math.round(ridgeZ);
      const groundY = this.getTerrainHeight(wx, wz);
      const towerBase = groundY;
      const towerTop = towerBase + 8;

      for (let x = wx - 3; x <= wx + 3; x++) {
        for (let z = wz - 3; z <= wz + 3; z++) {
          for (let y = towerBase - 2; y <= towerTop; y++) {
            const isPerimeter = (x === wx - 3 || x === wx + 3 || z === wz - 3 || z === wz + 3);
            if (isPerimeter || y === towerBase || y === towerTop) {
              this.setBlock(x, y, z, 'stone_bricks');
            }
          }
        }
      }
      // Curved Chinese tiled roof on tower
      for (let x = wx - 4; x <= wx + 4; x++) {
        for (let z = wz - 4; z <= wz + 4; z++) {
          this.setBlock(x, towerTop + 1, z, 'red_terracotta');
        }
      }
      this.setBlock(wx, towerTop + 2, wz, 'gold_block');
      this.setBlock(wx, towerTop + 3, wz, 'glowstone');
    }

    // 5-Tier Imperial Dragon Pagoda at (px, pz) = (-110, -110)
    // 1. Raised Carved Dark Stone Plinth Base at Y = 1 to 2 (Footprint 19x19)
    for (let x = px - 9; x <= px + 9; x++) {
      for (let z = pz - 9; z <= pz + 9; z++) {
        this.setBlock(x, 1, z, 'stone_bricks');
        if (Math.abs(x - px) <= 8 && Math.abs(z - pz) <= 8) {
          this.setBlock(x, 2, z, 'stone_bricks');
        }
      }
    }
    // Plinth corner lanterns and four monumental entrance stairways
    for (const [dx, dz] of [[-9, -9], [9, -9], [-9, 9], [9, 9]]) {
      this.setBlock(px + dx, 2, pz + dz, 'red_terracotta');
      this.setBlock(px + dx, 3, pz + dz, 'glowstone');
    }
    for (const dir of [{ x: 0, z: 9 }, { x: 0, z: -9 }, { x: 9, z: 0 }, { x: -9, z: 0 }]) {
      for (let offset = -2; offset <= 2; offset++) {
        const sx = dir.x !== 0 ? px + dir.x : px + offset;
        const sz = dir.z !== 0 ? pz + dir.z : pz + offset;
        this.setBlock(sx, 1, sz, 'smooth_stone');
      }
    }

    const tiers = [
      { yStart: 3, yEnd: 8, halfW: 7 },
      { yStart: 9, yEnd: 14, halfW: 6 },
      { yStart: 15, yEnd: 19, halfW: 5 },
      { yStart: 20, yEnd: 24, halfW: 4 },
      { yStart: 25, yEnd: 28, halfW: 3 }
    ];

    for (const t of tiers) {
      for (let x = px - t.halfW; x <= px + t.halfW; x++) {
        for (let z = pz - t.halfW; z <= pz + t.halfW; z++) {
          const isPerimeter = (x === px - t.halfW || x === px + t.halfW || z === pz - t.halfW || z === pz + t.halfW);
          const isCorner = (x === px - t.halfW || x === px + t.halfW) && (z === pz - t.halfW || z === pz + t.halfW);

          // Solid floor deck for each tier level
          this.setBlock(x, t.yStart, z, 'oak_planks');

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
    for (let y = 29; y <= 35; y++) {
      this.setBlock(px, y, pz, (y % 2 === 0) ? 'gold_block' : 'iron_block');
    }
    this.setBlock(px, 36, pz, 'glowstone');
    this.setBlock(px, 3, pz, 'crafting_table', {
      type: 'sign',
      title: 'Imperial Dragon Pagoda',
      text: 'Five-tier sacred pagoda preserving Lakshya’s international ventures and cultural studies.'
    });

    // Temple of Heaven Imperial Pavilion & Languages Embassy at (-80, -90)
    // 3-Tiered Circular Imperial Shrine with Vermilion Pillars & Golden Finial
    const thX = -80;
    const thZ = -90;
    // Base Circular Plinth at Y = 1 to 2
    for (let dx = -8; dx <= 8; dx++) {
      for (let dz = -8; dz <= 8; dz++) {
        const d = Math.hypot(dx, dz);
        if (d <= 8.5) {
          this.setBlock(thX + dx, 1, thZ + dz, 'quartz_block');
          if (d <= 7.2) this.setBlock(thX + dx, 2, thZ + dz, 'stone_bricks');
        }
      }
    }
    // Vermilion Pillars around Tier 1
    for (let deg = 0; deg < 360; deg += 30) {
      const rad = (deg * Math.PI) / 180;
      const cx = Math.round(thX + Math.cos(rad) * 6);
      const cz = Math.round(thZ + Math.sin(rad) * 6);
      for (let y = 3; y <= 7; y++) {
        this.setBlock(cx, y, cz, 'red_terracotta');
      }
    }
    // Lower Circular Blue Eave (Y = 8)
    for (let dx = -7; dx <= 7; dx++) {
      for (let dz = -7; dz <= 7; dz++) {
        if (Math.hypot(dx, dz) <= 7.2) this.setBlock(thX + dx, 8, thZ + dz, 'lapis_block');
      }
    }
    // Middle Tier Pillars (Y = 9 to 12)
    for (let deg = 0; deg < 360; deg += 45) {
      const rad = (deg * Math.PI) / 180;
      const cx = Math.round(thX + Math.cos(rad) * 4);
      const cz = Math.round(thZ + Math.sin(rad) * 4);
      for (let y = 9; y <= 12; y++) {
        this.setBlock(cx, y, cz, 'red_terracotta');
      }
    }
    // Middle Blue Eave (Y = 13)
    for (let dx = -5; dx <= 5; dx++) {
      for (let dz = -5; dz <= 5; dz++) {
        if (Math.hypot(dx, dz) <= 5.2) this.setBlock(thX + dx, 13, thZ + dz, 'lapis_block');
      }
    }
    // Top Conical Golden Cupola (Y = 14 to 17)
    for (let dx = -3; dx <= 3; dx++) {
      for (let dz = -3; dz <= 3; dz++) {
        if (Math.hypot(dx, dz) <= 3.2) this.setBlock(thX + dx, 14, thZ + dz, 'lapis_block');
        if (Math.hypot(dx, dz) <= 2.2) this.setBlock(thX + dx, 15, thZ + dz, 'gold_block');
        if (Math.hypot(dx, dz) <= 1.2) this.setBlock(thX + dx, 16, thZ + dz, 'gold_block');
      }
    }
    this.setBlock(thX, 17, thZ, 'gold_block');
    this.setBlock(thX, 18, thZ, 'glowstone');
    this.setBlock(thX, 3, thZ, 'crafting_table', { type: 'languages' });
    this.setBlock(thX, 4, thZ, 'bookshelf', { type: 'languages' });
    this.setBlock(thX - 2, 3, thZ, 'gold_block');
    this.setBlock(thX + 2, 3, thZ, 'gold_block');
    this.setBlock(thX, 3, thZ + 7, 'glowstone', {
      type: 'sign',
      title: 'Temple of Heaven · Languages Embassy',
      text: 'Circular imperial shrine of heaven celebrating global multilingual communication and studies.'
    });

    // Zen Koi Pond and Red Moon Bridge
    for (let x = -98; x <= -90; x++) {
      const archY = (x >= -95 && x <= -93) ? 3 : 2;
      for (let z = -102; z <= -98; z++) {
        this.setBlock(x, 1, z, 'stone_bricks'); // Solid bridge abutment/pier
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

    // Grand Paifang Imperial Gate (Celestial Entrance Arch to China Realm)
    for (let y = 1; y <= 6; y++) {
      this.setBlock(-72, y, -87, 'red_terracotta');
      this.setBlock(-72, y, -83, 'red_terracotta');
    }
    for (let z = -89; z <= -81; z++) {
      this.setBlock(-72, 7, z, 'red_terracotta');
      this.setBlock(-72, 8, z, 'stone_bricks');
    }
    this.setBlock(-72, 9, -89, 'gold_block');
    this.setBlock(-72, 9, -81, 'gold_block');
    this.setBlock(-72, 8, -85, 'gold_block');
    this.setBlock(-72, 6, -85, 'sea_lantern');
    this.setBlock(-72, 3, -82, 'glowstone', {
      type: 'sign',
      title: 'Celestial Paifang Gate',
      text: 'Ceremonial archway welcoming travelers into the sacred mountains and temples of the China Realm.'
    });

    // Great Wall Grand Stone Access Stairway (Ascending from valley at -86, -118 up to Great Wall at -90, -135)
    for (let step = 0; step <= 14; step++) {
      const sx = Math.round(-86 - (step / 14) * 4);
      const sz = Math.round(-118 - step * 1.2);
      const sy = 2 + step;
      for (let dx = -1; dx <= 1; dx++) {
        for (let y = 1; y <= sy; y++) {
          this.setBlock(sx + dx, y, sz, 'stone_bricks');
        }
      }
      this.setBlock(sx - 2, sy + 1, sz, 'stone_bricks');
      this.setBlock(sx + 2, sy + 1, sz, 'stone_bricks');
      if (step % 4 === 0) {
        this.setBlock(sx - 2, sy + 2, sz, 'lantern');
        this.setBlock(sx + 2, sy + 2, sz, 'lantern');
      }
    }

    // Zen Koi Pond Floating Water Lilies & Stone Toro Lanterns
    for (const [lx, lz] of [[-96, -100], [-92, -98], [-95, -103]]) {
      this.setBlock(lx, 1, lz, 'emerald_block');
      this.setBlock(lx, 2, lz, 'lantern');
    }
    // Stone Toro Lanterns around pond perimeter
    for (const [tx, tz] of [[-101, -96], [-89, -96], [-101, -104], [-89, -104]]) {
      this.setBlock(tx, 1, tz, 'stone_bricks');
      this.setBlock(tx, 2, tz, 'stone_bricks');
      this.setBlock(tx, 3, tz, 'sea_lantern');
      this.setBlock(tx, 4, tz, 'stone_bricks');
    }

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
    // Monumental Carved Stone Plinth Base at Y = 1 (Footprint 36x36)
    for (let x = pyrX - 18; x <= pyrX + 18; x++) {
      for (let z = pyrZ - 18; z <= pyrZ + 18; z++) {
        this.setBlock(x, 1, z, 'stone_bricks');
      }
    }

    const pyramidSteps = 8;
    for (let step = 0; step < pyramidSteps; step++) {
      const halfW = 16 - step * 2;
      const y = 2 + step * 2;
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
    // Temple Sanctuary atop Step Pyramid (Y = 18 to 22)
    const topY = 2 + pyramidSteps * 2;
    for (let x = pyrX - 3; x <= pyrX + 3; x++) {
      for (let z = pyrZ - 3; z <= pyrZ + 3; z++) {
        // Solid stone floor for sanctuary
        this.setBlock(x, topY, z, 'smooth_stone');
        const wall = (Math.abs(x - pyrX) === 3 || Math.abs(z - pyrZ) === 3);
        for (let y = topY + 1; y <= topY + 4; y++) {
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

    // Grand Sandstone Canyon Arch spanning the Camino Real into Mexico
    for (let y = 1; y <= 9; y++) {
      for (let w = -1; w <= 1; w++) {
        this.setBlock(-75, y, 42 + w, 'red_sandstone');
        this.setBlock(-75, y, 48 + w, 'red_sandstone');
      }
    }
    for (let z = 41; z <= 49; z++) {
      for (let y = 9; y <= 11; y++) {
        this.setBlock(-75, y, z, (y === 11) ? 'terracotta_adobe' : 'red_sandstone');
      }
    }
    this.setBlock(-75, 8, 45, 'sea_lantern');
    this.setBlock(-75, 2, 49, 'glowstone', {
      type: 'sign',
      title: 'El Cañón Imperial Arch',
      text: 'Towering natural red sandstone canyon arch framing the gateway to the Mexican plateau.'
    });

    // Desert Palm Oasis at (-120, 80)
    for (let dx = -7; dx <= 7; dx++) {
      for (let dz = -7; dz <= 7; dz++) {
        const d = Math.hypot(dx, dz);
        if (d <= 3.5) {
          this.setBlock(-120 + dx, 1, 80 + dz, 'water');
        } else if (d <= 6.5) {
          this.setBlock(-120 + dx, 1, 80 + dz, 'grass');
        }
      }
    }
    this.setBlock(-120, 0, 80, 'sea_lantern');
    this.buildPalmTree(-125, 1, 82);
    this.buildPalmTree(-115, 1, 78);
    this.buildPalmTree(-122, 1, 74);
    this.setBlock(-118, 2, 83, 'sandstone');
    this.setBlock(-118, 2, 84, 'glowstone', {
      type: 'sign',
      title: 'Oasis de las Palmas',
      text: 'Hidden fresh water spring amid the rolling badlands and desert dunes.'
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

    // Crosswalk Zebra Striping across Broadway
    for (const cz of [-30, -3, 3, 30]) {
      for (let x = 97; x <= 104; x++) {
        if (x % 2 === 0) {
          this.setBlock(x, 1, cz, 'smooth_stone');
        }
      }
    }

    // Traffic Light Signals at Intersection
    for (const [tx, tz] of [[96, -3], [105, 3]]) {
      for (let y = 2; y <= 5; y++) this.setBlock(tx, y, tz, 'iron_block');
      this.setBlock(tx + (tx === 96 ? 1 : -1), 5, tz, 'iron_block');
      this.setBlock(tx + (tx === 96 ? 1 : -1), 6, tz, 'redstone_block');
      this.setBlock(tx + (tx === 96 ? 1 : -1), 4, tz, 'emerald_block');
    }

    // Manhattan Subway Station Entrance at (95, 6)
    for (let x = 94; x <= 96; x++) {
      for (let z = 5; z <= 9; z++) {
        if (x === 94 || z === 5 || z === 9) {
          this.setBlock(x, 2, z, 'iron_block');
        }
      }
    }
    this.setBlock(94, 3, 5, 'sea_lantern');
    this.setBlock(94, 3, 9, 'sea_lantern');
    this.setBlock(95, 1, 6, 'smooth_stone');
    this.setBlock(95, 0, 7, 'smooth_stone');
    this.setBlock(95, -1, 8, 'stone_bricks');
    this.setBlock(95, 2, 5, 'glowstone', {
      type: 'sign',
      title: 'Broadway Subway Station',
      text: 'Metropolitan Transit Authority · Lines 1, 2, 3 Neo York Central Subway.'
    });

    // Modern Glass Bus Shelter at (106, -6)
    for (let z = -8; z <= -4; z++) {
      this.setBlock(106, 2, z, 'cyber_glass');
      this.setBlock(106, 3, z, 'cyber_glass');
      this.setBlock(105, 4, z, 'cyber_glass');
      this.setBlock(106, 4, z, 'cyber_glass');
      if (z >= -7 && z <= -5) {
        this.setBlock(106, 2, z, 'oak_planks'); // Bench
      }
    }
    this.setBlock(105, 3, -6, 'glowstone');

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

    // Times Square Red Glass Steps (TKTS Bleachers) at X in [99, 103], Z in [-14, -8]
    for (let z = -14; z <= -8; z++) {
      const stepY = 2 + (z - (-14));
      for (let x = 99; x <= 103; x++) {
        for (let y = 1; y <= stepY; y++) {
          this.setBlock(x, y, z, (y === stepY) ? 'redstone_block' : 'red_terracotta');
        }
        this.setBlock(x, stepY + 1, z, 'cyber_glass'); // Glowing illuminated glass treads
      }
    }
    this.setBlock(101, 8, -8, 'glowstone', {
      type: 'sign',
      title: 'Times Square Red Glass Steps · TKTS Bleachers',
      text: 'Climb up to take in the breathtaking panoramic view of the Broadway neon billboard canyon!'
    });

    // Classic Yellow NYC Cabs parked along Broadway / Cross Street
    const taxis: [number, number, boolean][] = [[102, 14, false], [98, -18, true]];
    for (const [txX, txZ, isNorthSouth] of taxis) {
      if (isNorthSouth) {
        // Taxi wheels
        this.setBlock(txX - 1, 1, txZ - 2, 'coal_block');
        this.setBlock(txX + 1, 1, txZ - 2, 'coal_block');
        this.setBlock(txX - 1, 1, txZ + 2, 'coal_block');
        this.setBlock(txX + 1, 1, txZ + 2, 'coal_block');
        // Yellow Body
        for (let x = txX - 1; x <= txX + 1; x++) {
          for (let z = txZ - 2; z <= txZ + 2; z++) {
            this.setBlock(x, 2, z, 'gold_block');
            const isWindow = (Math.abs(z - txZ) <= 1);
            this.setBlock(x, 3, z, isWindow ? 'cyber_glass' : 'gold_block');
          }
        }
        // Black and white taxi checkered stripe
        this.setBlock(txX - 1, 2, txZ, 'coal_block');
        this.setBlock(txX + 1, 2, txZ, 'coal_block');
        // Roof Medallion light
        this.setBlock(txX, 4, txZ, 'lantern');
      } else {
        // East-West taxi
        this.setBlock(txX - 2, 1, txZ - 1, 'coal_block');
        this.setBlock(txX + 2, 1, txZ - 1, 'coal_block');
        this.setBlock(txX - 2, 1, txZ + 1, 'coal_block');
        this.setBlock(txX + 2, 1, txZ + 1, 'coal_block');
        for (let x = txX - 2; x <= txX + 2; x++) {
          for (let z = txZ - 1; z <= txZ + 1; z++) {
            this.setBlock(x, 2, z, 'gold_block');
            const isWindow = (Math.abs(x - txX) <= 1);
            this.setBlock(x, 3, z, isWindow ? 'cyber_glass' : 'gold_block');
          }
        }
        this.setBlock(txX, 2, txZ - 1, 'coal_block');
        this.setBlock(txX, 2, txZ + 1, 'coal_block');
        this.setBlock(txX, 4, txZ, 'lantern');
      }
    }

    // Times Square Street Hot Dog & Pretzel Cart at (95, 1, -12)
    this.setBlock(95, 1, -12, 'coal_block');
    this.setBlock(95, 2, -12, 'iron_block');
    this.setBlock(95, 3, -12, 'iron_block'); // Warming steamer
    this.setBlock(95, 3, -13, 'redstone_block'); // Ketchup
    this.setBlock(95, 3, -11, 'gold_block'); // Mustard
    // Umbrella Awning
    for (let dx = -1; dx <= 1; dx++) {
      for (let dz = -1; dz <= 1; dz++) {
        this.setBlock(95 + dx, 5, -12 + dz, ((dx + dz) % 2 === 0) ? 'gold_block' : 'lapis_block');
      }
    }
    this.setBlock(95, 4, -12, 'iron_block');
    this.setBlock(95, 2, -13, 'smooth_stone', {
      type: 'sign',
      title: 'Sabrett NYC Hot Dog & Pretzel Stand',
      text: 'Original New York City dirty water dogs, hot salted jumbo pretzels, and knishes!'
    });

    // Hollywood Walk of Fame brass stars along Broadway sidewalks
    for (let z = -30; z <= 30; z += 3) {
      this.setBlock(95, 1, z, 'gold_block'); // West sidewalk star
      this.setBlock(106, 1, z, 'gold_block'); // East sidewalk star
    }

    // TCL Chinese Theatre Cinema Facade at (118, 1, -18)
    const chinX = 118;
    const chinZ = -18;
    // Red Carpet Walkway
    for (let z = chinZ - 6; z <= chinZ + 6; z++) {
      this.setBlock(chinX - 3, 1, z, 'red_terracotta');
      this.setBlock(chinX - 2, 1, z, 'red_terracotta');
    }
    // Pagoda entrance portal with golden pillars
    for (let z = chinZ - 5; z <= chinZ + 5; z++) {
      for (let y = 1; y <= 8; y++) {
        this.setBlock(chinX, y, z, (Math.abs(z - chinZ) === 5) ? 'gold_block' : 'red_terracotta');
      }
    }
    // Curved Copper Chinese Roof at Y = 9 to 11
    for (let z = chinZ - 6; z <= chinZ + 6; z++) {
      const roofY = Math.max(9, 11 - Math.abs(Math.abs(z - chinZ) - 3));
      this.setBlock(chinX, roofY, z, 'prismarine_bricks');
      this.setBlock(chinX - 1, roofY, z, 'prismarine_bricks');
    }
    // Premiere Searchlights sweeping the sky
    this.setBlock(chinX - 2, 2, chinZ - 5, 'sea_lantern');
    this.setBlock(chinX - 2, 2, chinZ + 5, 'sea_lantern');

    this.setBlock(chinX - 1, 2, chinZ, 'gold_block', {
      type: 'sign',
      title: 'TCL Chinese Theatre · Hollywood',
      text: 'Historic movie palace on Hollywood Boulevard hosting legendary film premieres and celebrity handprints!'
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

    // --- Real Ocean Watercraft floating at Water Level Y = 0 ---
    // 1. Three-Masted Wooden Sailing Galleon in West Harbor Basin (-45, 0, 135)
    const galX = -45;
    const galZ = 135;
    // Curved Hull (length 18 along Z, width 7 along X)
    for (let z = galZ - 9; z <= galZ + 9; z++) {
      const w = Math.max(1, Math.round(3.5 - Math.abs(z - galZ) * 0.22));
      for (let x = galX - w; x <= galX + w; x++) {
        // Hull bottom in water (Y = -1 and Y = 0)
        this.setBlock(x, -1, z, 'spruce_log');
        this.setBlock(x, 0, z, 'spruce_log');
        // Main Deck at Y = 1
        this.setBlock(x, 1, z, 'oak_planks');
        // Gunwales / Railing at Y = 2
        if (Math.abs(x - galX) === w || z === galZ - 9 || z === galZ + 9) {
          this.setBlock(x, 2, z, 'spruce_log');
        }
      }
    }
    // Raised Stern Quarterdeck (Z in [galZ + 5, galZ + 9], Y = 2 to 3)
    for (let z = galZ + 5; z <= galZ + 9; z++) {
      for (let x = galX - 2; x <= galX + 2; x++) {
        this.setBlock(x, 2, z, 'oak_planks');
        this.setBlock(x, 3, z, (Math.abs(x - galX) === 2 || z === galZ + 9) ? 'spruce_log' : 'air');
      }
    }
    // Captain's Cabin Windows at stern
    for (let x = galX - 2; x <= galX + 2; x++) {
      this.setBlock(x, 2, galZ + 9, 'cyber_glass');
    }
    // 3 Masts (Fore at galZ - 5, Main at galZ, Mizzen at galZ + 5)
    for (const [mZ, mHeight] of [[galZ - 5, 14], [galZ, 17], [galZ + 5, 12]]) {
      for (let y = 1; y <= mHeight; y++) {
        this.setBlock(galX, y, mZ, 'spruce_log');
      }
      // Cross spars and billowing sails
      for (let y = 5; y <= mHeight - 2; y += 4) {
        const sailW = (y === 5) ? 4 : 3;
        for (let dx = -sailW; dx <= sailW; dx++) {
          this.setBlock(galX + dx, y + 1, mZ, 'oak_planks'); // Spar
          this.setBlock(galX + dx, y, mZ - 1, 'quartz_block'); // Canvas Sail
          this.setBlock(galX + dx, y - 1, mZ - 1, 'quartz_block');
        }
      }
      // Crow's Nest
      this.setBlock(galX, mHeight - 1, mZ, 'oak_fence');
      this.setBlock(galX, mHeight, mZ, 'lantern');
    }
    // Brass Cannons along gunports
    for (const cz of [galZ - 4, galZ, galZ + 4]) {
      this.setBlock(galX - 3, 2, cz, 'iron_block');
      this.setBlock(galX + 3, 2, cz, 'iron_block');
    }
    this.setBlock(galX, 2, galZ - 9, 'gold_block'); // Bowsprit figurehead
    this.setBlock(galX, 3, galZ - 10, 'spruce_log'); // Bowsprit spar
    this.setBlock(galX, 2, galZ - 5, 'gold_block', {
      type: 'sign',
      title: 'The Sovereign · Three-Masted Galleon',
      text: 'Flagship square-rigged sailing vessel with teak decks, canvas sails, and brass cannons.'
    });

    // 2. Kerala Houseboat (Kettuvallam) in East Harbor Basin (52, 0, 135)
    const hbX = 52;
    const hbZ = 135;
    // Anjili wood curved canoe hull in water
    for (let z = hbZ - 7; z <= hbZ + 7; z++) {
      const hw = Math.max(1, Math.round(2.5 - Math.abs(z - hbZ) * 0.18));
      for (let x = hbX - hw; x <= hbX + hw; x++) {
        this.setBlock(x, 0, z, 'spruce_log'); // Hull in water
        this.setBlock(x, 1, z, 'oak_planks'); // Teak floor
      }
    }
    // Arched Woven Bamboo Coir Canopy Roof (Z in [hbZ - 4, hbZ + 4])
    for (let z = hbZ - 4; z <= hbZ + 4; z++) {
      for (let x = hbX - 2; x <= hbX + 2; x++) {
        const isWall = Math.abs(x - hbX) === 2;
        if (isWall) {
          this.setBlock(x, 2, z, (z % 2 === 0) ? 'oak_fence' : 'spruce_log');
        }
        this.setBlock(x, 3, z, (Math.abs(x - hbX) <= 1) ? 'oak_planks' : 'spruce_log'); // Arched roof
      }
    }
    // Front open viewing deck with charpai chairs & captain's rudder
    this.setBlock(hbX, 2, hbZ - 5, 'oak_planks'); // Table
    this.setBlock(hbX, 2, hbZ - 6, 'red_terracotta'); // Lounger
    this.setBlock(hbX, 2, hbZ + 5, 'iron_block'); // Outboard motor
    this.setBlock(hbX, 2, hbZ - 4, 'lantern');
    this.setBlock(hbX, 2, hbZ + 4, 'lantern');
    this.setBlock(hbX, 2, hbZ - 3, 'gold_block', {
      type: 'sign',
      title: 'Kerala Kettuvallam · Alappuzha Backwaters',
      text: 'Traditional handcrafted wooden houseboat tied with coir ropes, cruising through tranquil tropical waters.'
    });

    // 3. Luxury Ocean Yacht off Southern Pier (28, 0, 155)
    const ytX = 28;
    const ytZ = 155;
    // Sleek fiberglass white hull
    for (let z = ytZ - 8; z <= ytZ + 8; z++) {
      const yw = Math.max(1, Math.round(3.0 - Math.abs(z - ytZ) * 0.22));
      for (let x = ytX - yw; x <= ytX + yw; x++) {
        this.setBlock(x, 0, z, 'quartz_block');
        this.setBlock(x, 1, z, 'quartz_block');
        if (Math.abs(x - ytX) === yw || z === ytZ - 8 || z === ytZ + 8) {
          this.setBlock(x, 2, z, 'stone_bricks'); // Stainless railing
        }
      }
    }
    // Streamlined Cabin Bridge & Flybridge (Z in [ytZ - 3, ytZ + 3])
    for (let z = ytZ - 3; z <= ytZ + 3; z++) {
      for (let x = ytX - 2; x <= ytX + 2; x++) {
        this.setBlock(x, 2, z, (Math.abs(x - ytX) === 2 || z === ytZ - 3) ? 'cyber_glass' : 'quartz_block');
        this.setBlock(x, 3, z, 'quartz_block'); // Flybridge roof
      }
    }
    // Flybridge Radar Arch & Nav Lights
    this.setBlock(ytX, 4, ytZ, 'iron_block');
    this.setBlock(ytX, 5, ytZ, 'beacon');
    this.setBlock(ytX - 2, 2, ytZ - 7, 'emerald_block'); // Starboard nav light
    this.setBlock(ytX + 2, 2, ytZ - 7, 'redstone_block'); // Port nav light
    // Stern Swimming Platform with ladder descending into water
    for (let x = ytX - 2; x <= ytX + 2; x++) {
      this.setBlock(x, 0, ytZ + 9, 'oak_planks');
    }
    this.setBlock(ytX, 2, ytZ - 4, 'quartz_block', {
      type: 'sign',
      title: 'Ocean Luxury Yacht · St. Tropez',
      text: 'Tri-deck motor yacht with tinted glass navigation bridge, flybridge radar, and stern swimming platform.'
    });

    this.setBlock(fwx, 2, fwz - 12, 'glowstone', {
      type: 'sign',
      title: 'Grand Carnival Pier',
      text: 'Oceanfront festival with a giant illuminated Ferris Wheel, Carousel, and Rollercoaster.'
    });
  }

  // 9. Civic Quarter (School, Hospital, Police, Railway, Airport)
  private buildCivicAndAdventureDistricts() {
    this.buildDistrictLinks();
    this.buildSchool(46, 52);
    this.buildHospital(46, 70);
    this.buildPoliceStation(76, 52);
    this.buildRailwayStation(58, 33);
    this.buildRailwayViaduct();
    this.buildAirport(125, 75);
    this.buildCityZoo(-38, -32);
    this.buildRapunzelCastle(-70, -34);
  }

  private buildDistrictLinks() {
    // Civic Boulevard running between School/Hospital (west) and Station/Police (east)
    for (let z = 24; z <= 68; z++) {
      for (let x = 60; x <= 62; x++) {
        this.setBlock(x, 1, z, 'smooth_stone');
      }
      if (z % 8 === 0) {
        this.setBlock(59, 1, z, 'stone_bricks');
        this.setBlock(59, 2, z, 'stone_bricks');
        this.setBlock(59, 3, z, 'glowstone');
        this.setBlock(63, 1, z, 'stone_bricks');
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
    this.setBlock(-5, 1, 89, 'smooth_stone');
    this.setBlock(-5, 2, 89, 'glowstone', {
      type: 'sign',
      title: 'Ancient Resume Chest',
      text: "Open to inspect Lakshya's official resume and career portfolio."
    });

    // Leadership Pavilion
    for (let x = -18; x <= -6; x++) {
      for (let z = 80; z <= 92; z++) {
        this.setBlock(x, 1, z, 'quartz_block');
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
    this.buildSailingShip(-36, 0, 118);
    this.buildSailingShip(42, 0, 122);

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
    const actualBaseY = Math.max(baseY, this.getTerrainHeight(cx, cz) + 1);
    // Massive thick trunk rooted directly into ground and 2 levels below
    for (let dx = -1; dx <= 1; dx++) {
      for (let dz = -1; dz <= 1; dz++) {
        for (let y = actualBaseY - 2; y <= actualBaseY + 6; y++) {
          this.setBlock(cx + dx, y, cz + dz, 'oak_log');
        }
      }
    }
    // Hanging aerial roots / vines connecting to ground
    for (const [rx, rz] of [[cx - 3, cz], [cx + 3, cz], [cx, cz - 3], [cx, cz + 3]]) {
      const rootBase = Math.max(1, this.getTerrainHeight(rx, rz));
      for (let y = rootBase; y <= actualBaseY + 5; y++) {
        this.setBlock(rx, y, rz, 'oak_fence');
      }
    }
    // Wide expansive canopy
    for (let y = actualBaseY + 5; y <= actualBaseY + 9; y++) {
      const radius = (y === actualBaseY + 7) ? 5 : 4;
      for (let dx = -radius; dx <= radius; dx++) {
        for (let dz = -radius; dz <= radius; dz++) {
          if (Math.hypot(dx, dz) <= radius + 0.4) {
            this.setBlock(cx + dx, y, cz + dz, 'spruce_leaves');
          }
        }
      }
    }
    this.setBlock(cx, actualBaseY + 10, cz, 'spruce_leaves');
  }

  private buildBambooStalk(cx: number, baseY: number, cz: number, height: number) {
    const actualBaseY = Math.max(baseY, this.getTerrainHeight(cx, cz) + 1);
    for (let y = actualBaseY - 2; y <= actualBaseY + height; y++) {
      this.setBlock(cx, y, cz, (y % 3 === 0) ? 'emerald_block' : 'oak_log');
    }
    this.setBlock(cx, actualBaseY + height + 1, cz, 'sakura_leaves');
    this.setBlock(cx + 1, actualBaseY + height, cz, 'sakura_leaves');
    this.setBlock(cx - 1, actualBaseY + height, cz, 'sakura_leaves');
  }

  private buildSakuraTree(cx: number, baseY: number, cz: number) {
    const actualBaseY = Math.max(baseY, this.getTerrainHeight(cx, cz) + 1);
    for (let y = actualBaseY - 2; y <= actualBaseY + 5; y++) {
      this.setBlock(cx, y, cz, 'oak_log');
    }
    for (let y = actualBaseY + 4; y <= actualBaseY + 6; y++) {
      const radius = (y === actualBaseY + 5) ? 3 : 2;
      for (let dx = -radius; dx <= radius; dx++) {
        for (let dz = -radius; dz <= radius; dz++) {
          if ((dx !== 0 || dz !== 0) && Math.hypot(dx, dz) <= radius + 0.3) {
            this.setBlock(cx + dx, y, cz + dz, 'sakura_leaves');
          }
        }
      }
    }
    this.setBlock(cx, actualBaseY + 7, cz, 'sakura_leaves');
    this.setBlock(cx + 1, actualBaseY, cz + 1, 'sakura_leaves');
    this.setBlock(cx - 1, actualBaseY, cz - 1, 'sakura_leaves');
  }

  private buildCypressTree(x: number, baseY: number, z: number) {
    const actualBaseY = Math.max(baseY, this.getTerrainHeight(x, z) + 1);
    for (let y = actualBaseY - 2; y <= actualBaseY + 6; y++) {
      this.setBlock(x, y, z, 'spruce_log');
    }
    for (let y = actualBaseY + 2; y <= actualBaseY + 7; y++) {
      for (let dx = -1; dx <= 1; dx++) {
        for (let dz = -1; dz <= 1; dz++) {
          if ((dx !== 0 || dz !== 0) && Math.abs(dx) + Math.abs(dz) <= 1) {
            this.setBlock(x + dx, y, z + dz, 'spruce_leaves');
          }
        }
      }
    }
    this.setBlock(x, actualBaseY + 8, z, 'spruce_leaves');
  }

  private buildRajasthaniChhatri(cx: number, baseY: number, cz: number) {
    const actualBaseY = Math.max(baseY, this.getTerrainHeight(cx, cz) + 1);
    const corners = [
      { dx: -2, dz: -2 }, { dx: 2, dz: -2 },
      { dx: -2, dz: 2 }, { dx: 2, dz: 2 }
    ];
    for (const c of corners) {
      for (let y = actualBaseY; y <= actualBaseY + 4; y++) {
        this.setBlock(cx + c.dx, y, cz + c.dz, 'red_sandstone');
      }
    }
    for (let dx = -2; dx <= 2; dx++) {
      for (let dz = -2; dz <= 2; dz++) {
        this.setBlock(cx + dx, actualBaseY + 5, cz + dz, 'red_sandstone');
      }
    }
    this.setBlock(cx, actualBaseY + 6, cz, 'gold_block');
    this.setBlock(cx, actualBaseY + 4, cz, 'glowstone');
  }

  private buildSaguaroCactus(x: number, baseY: number, z: number) {
    const actualBaseY = Math.max(baseY, this.getTerrainHeight(x, z) + 1);
    this.setBlock(x, actualBaseY - 2, z, 'emerald_block');
    this.setBlock(x, actualBaseY - 1, z, 'emerald_block');
    this.setBlock(x, actualBaseY, z, 'emerald_block');
    this.setBlock(x, actualBaseY + 1, z, 'emerald_block');
    this.setBlock(x, actualBaseY + 2, z, 'emerald_block');
    this.setBlock(x, actualBaseY + 3, z, 'emerald_block');
    this.setBlock(x, actualBaseY + 4, z, 'emerald_block');
    this.setBlock(x - 1, actualBaseY + 2, z, 'emerald_block');
    this.setBlock(x - 1, actualBaseY + 3, z, 'emerald_block');
    this.setBlock(x + 1, actualBaseY + 3, z, 'emerald_block');
    this.setBlock(x + 1, actualBaseY + 4, z, 'emerald_block');
    this.setBlock(x, actualBaseY + 5, z, 'redstone_block');
  }

  private buildAdobeHouse(bx: number, baseY: number, bz: number, w: number, d: number, h: number) {
    const actualBaseY = Math.max(baseY, this.getTerrainHeight(bx, bz) + 1);
    for (let x = bx; x < bx + w; x++) {
      for (let z = bz; z < bz + d; z++) {
        const isPerimeter = (x === bx || x === bx + w - 1 || z === bz || z === bz + d - 1);
        for (let y = actualBaseY; y < actualBaseY + h; y++) {
          if (isPerimeter) {
            if (y <= actualBaseY + 2 && x === bx + Math.floor(w / 2) && z === bz + d - 1) continue;
            if (y === actualBaseY + h - 2 && (x % 2 === 0)) {
              this.setBlock(x, y, z, 'oak_log');
            } else {
              this.setBlock(x, y, z, 'terracotta_adobe');
            }
          }
        }
        this.setBlock(x, actualBaseY + h - 1, z, 'red_sandstone');
      }
    }
  }

  private buildPalmTree(cx: number, baseY: number, cz: number) {
    const actualBaseY = Math.max(baseY, this.getTerrainHeight(cx, cz) + 1);
    this.setBlock(cx, actualBaseY - 2, cz, 'palm_wood');
    this.setBlock(cx, actualBaseY - 1, cz, 'palm_wood');
    for (let y = 0; y <= 7; y++) {
      const xOffset = Math.floor(y / 3);
      this.setBlock(cx + xOffset, actualBaseY + y, cz, 'palm_wood');
      if (y > 0) {
        const prevOffset = Math.floor((y - 1) / 3);
        if (prevOffset !== xOffset) {
          this.setBlock(cx + xOffset, actualBaseY + y - 1, cz, 'palm_wood');
        }
      }
    }
    const topX = cx + 2;
    const topY = actualBaseY + 8;
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
    // 1. Grand Polished Plinth & Crystal Plaza Base (Y = 1..2, X in [cx-8, cx+8], Z in [cz-8, cz+8])
    for (let x = cx - 8; x <= cx + 8; x++) {
      for (let z = cz - 8; z <= cz + 8; z++) {
        const d = Math.max(Math.abs(x - cx), Math.abs(z - cz));
        this.setBlock(x, 1, z, d === 8 ? 'smooth_stone' : 'quartz_block');
        if (d === 8 && (x + z) % 4 === 0) {
          this.setBlock(x, 2, z, 'sea_lantern');
        }
      }
    }

    // Grand Entrance Portal Steps & Welcome Plaque
    for (let x = cx - 3; x <= cx + 3; x++) {
      this.setBlock(x, 1, cz + 9, 'smooth_stone');
      this.setBlock(x, 1, cz + 10, 'stone_bricks');
    }
    this.setBlock(cx, 2, cz + 8, 'sea_lantern', {
      type: 'sign',
      title: 'LK Mega Spire · World Wonder',
      text: 'Architectural masterpiece soaring 62 blocks high. Featuring quad parabolic arches, Sky Observation Deck, and the L K Monogram Beacon.'
    });

    // 2. Quad Monumental Corner Pylons & Grand Lattice Arches (Y = 2..22)
    // Corner footings at (cx ± 6, cz ± 6) tapering inwards towards (cx ± 3, cz ± 3) at Y = 22
    const cornerOffsets = [
      { sx: -6, sz: -6 }, { sx: 6, sz: -6 },
      { sx: -6, sz: 6 },  { sx: 6, sz: 6 }
    ];

    for (let y = 2; y <= 22; y++) {
      const t = (y - 2) / 20; // 0 to 1
      const offset = 6 - t * 3; // 6 down to 3
      const thickness = Math.max(1, Math.round(2 - t * 0.8));

      for (const c of cornerOffsets) {
        const signX = Math.sign(c.sx);
        const signZ = Math.sign(c.sz);
        const targetX = cx + Math.round(signX * offset);
        const targetZ = cz + Math.round(signZ * offset);

        for (let dx = 0; dx < thickness; dx++) {
          for (let dz = 0; dz < thickness; dz++) {
            const px = targetX - signX * dx;
            const pz = targetZ - signZ * dz;
            const isRibbon = (y % 4 === 0);
            this.setBlock(px, y, pz, isRibbon ? 'sea_lantern' : (y % 2 === 0 ? 'quartz_pillar' : 'quartz_block'));
          }
        }
      }

      // Parabolic cross-bracing arches at Y = 8, 14, 20
      if (y === 8 || y === 14 || y === 20) {
        const curSpan = Math.round(offset);
        for (let s = -curSpan; s <= curSpan; s++) {
          this.setBlock(cx + s, y, cz - curSpan, 'iron_block');
          this.setBlock(cx + s, y, cz + curSpan, 'iron_block');
          this.setBlock(cx - curSpan, y, cz + s, 'iron_block');
          this.setBlock(cx + curSpan, y, cz + s, 'iron_block');
          if (Math.abs(s) % 2 === 0) {
            this.setBlock(cx + s, y + 1, cz - curSpan, 'sea_lantern');
            this.setBlock(cx + s, y + 1, cz + curSpan, 'sea_lantern');
          }
        }
      }
    }

    // 3. Central Glass Atrium & High-Speed Glass Elevator Core (Y = 2..42)
    for (let y = 2; y <= 42; y++) {
      for (let x = cx - 1; x <= cx + 1; x++) {
        for (let z = cz - 1; z <= cz + 1; z++) {
          const isCorner = Math.abs(x - cx) === 1 && Math.abs(z - cz) === 1;
          if (isCorner) {
            this.setBlock(x, y, z, 'iron_block');
          } else if (x === cx && z === cz) {
            // High-speed illuminated shaft
            this.setBlock(x, y, z, y % 3 === 0 ? 'sea_lantern' : 'quartz_pillar');
          } else {
            // Glass enclosure
            this.setBlock(x, y, z, 'cyber_glass');
          }
        }
      }
    }

    // 4. Grand Observation Skydeck & Rotunda (Y = 22..25, Footprint 9x9)
    for (let y = 22; y <= 25; y++) {
      for (let x = cx - 4; x <= cx + 4; x++) {
        for (let z = cz - 4; z <= cz + 4; z++) {
          const maxD = Math.max(Math.abs(x - cx), Math.abs(z - cz));
          if (maxD > 4) continue;
          if (y === 22) {
            // Floor with gold perimeter
            this.setBlock(x, y, z, maxD === 4 ? 'gold_block' : 'quartz_block');
          } else if (y === 23 || y === 24) {
            // Panorama 360-degree glass windows
            if (maxD === 4) {
              const isCol = (Math.abs(x - cx) === 4 && Math.abs(z - cz) === 4);
              this.setBlock(x, y, z, isCol ? 'quartz_pillar' : 'cyber_glass');
            }
          } else if (y === 25) {
            // Skydeck ceiling
            this.setBlock(x, y, z, maxD === 4 ? 'sea_lantern' : 'quartz_block');
          }
        }
      }
    }

    // Skydeck interior amenities
    this.setBlock(cx + 2, 23, cz, 'gold_block');
    this.setBlock(cx - 2, 23, cz, 'gold_block');
    this.setBlock(cx, 23, cz - 3, 'sea_lantern', {
      type: 'sign',
      title: 'LK Skydeck · 100m Level',
      text: 'Panoramic 360-degree observation deck overlooking the world capitals, mountains, and runway.'
    });

    // 5. Mid-Tower Shaft & Illuminated Monogram "L K" (Y = 26..38)
    for (let y = 26; y <= 38; y++) {
      for (let x = cx - 3; x <= cx + 3; x++) {
        for (let z = cz - 3; z <= cz + 3; z++) {
          const isPerim = Math.abs(x - cx) === 3 || Math.abs(z - cz) === 3;
          if (isPerim) {
            this.setBlock(x, y, z, (y % 2 === 0) ? 'quartz_block' : 'quartz_pillar');
          }
        }
      }
    }

    // Iconic 3D Glowing Monogram "L" and "K" on the South and North facades (Y = 29..35)
    // Letter "L": 5 high, 3 wide (X from cx-3 to cx-1)
    // Letter "K": 5 high, 3 wide (X from cx+1 to cx+3)
    for (const facadeZ of [cz + 4, cz - 4]) {
      // Glow background halo
      for (let x = cx - 3; x <= cx + 3; x++) {
        for (let y = 29; y <= 35; y++) {
          this.setBlock(x, y, facadeZ, 'obsidian');
        }
      }

      // "L" in Gold & Diamond
      for (let y = 30; y <= 34; y++) {
        this.setBlock(cx - 3, y, facadeZ, 'gold_block');
      }
      this.setBlock(cx - 2, 30, facadeZ, 'gold_block');
      this.setBlock(cx - 1, 30, facadeZ, 'gold_block');

      // "K" in Diamond & Sea Lanterns
      for (let y = 30; y <= 34; y++) {
        this.setBlock(cx + 1, y, facadeZ, 'diamond_block');
      }
      this.setBlock(cx + 3, 34, facadeZ, 'diamond_block');
      this.setBlock(cx + 2, 33, facadeZ, 'diamond_block');
      this.setBlock(cx + 2, 32, facadeZ, 'sea_lantern');
      this.setBlock(cx + 2, 31, facadeZ, 'diamond_block');
      this.setBlock(cx + 3, 30, facadeZ, 'diamond_block');
    }

    // 6. Upper Cloud Lounge & Executive Terrace (Y = 39..42)
    for (let y = 39; y <= 42; y++) {
      for (let x = cx - 2; x <= cx + 2; x++) {
        for (let z = cz - 2; z <= cz + 2; z++) {
          const isPerim = Math.abs(x - cx) === 2 || Math.abs(z - cz) === 2;
          if (y === 39) {
            this.setBlock(x, y, z, 'gold_block');
          } else if (y === 42) {
            this.setBlock(x, y, z, 'sea_lantern');
          } else {
            this.setBlock(x, y, z, isPerim ? 'cyber_glass' : 'air');
          }
        }
      }
    }

    // 7. Celestial Needle Spire & Beacon Laser (Y = 43..62)
    for (let y = 43; y <= 48; y++) {
      for (let x = cx - 1; x <= cx + 1; x++) {
        for (let z = cz - 1; z <= cz + 1; z++) {
          const isEdge = Math.abs(x - cx) === 1 || Math.abs(z - cz) === 1;
          this.setBlock(x, y, z, isEdge ? 'iron_block' : 'gold_block');
        }
      }
    }

    // Needle tapering to single apex
    for (let y = 49; y <= 60; y++) {
      this.setBlock(cx, y, cz, y % 3 === 0 ? 'sea_lantern' : 'iron_block');
      if (y % 4 === 0) {
        // Cross vanes
        this.setBlock(cx + 1, y, cz, 'iron_block');
        this.setBlock(cx - 1, y, cz, 'iron_block');
        this.setBlock(cx, y, cz + 1, 'iron_block');
        this.setBlock(cx, y, cz - 1, 'iron_block');
      }
    }

    // Apex Crown & Golden Finial
    this.setBlock(cx, 61, cz, 'gold_block');
    this.setBlock(cx, 62, cz, 'beacon');
  }

  private buildHollywoodMountain(cx: number, cz: number) {
    // 1. Natural Geological Mount Lee Ridge (bounds X in [cx-22, cx+22], Z in [cz-16, cz+16])
    // Realistic multi-tier terrain with stepped contours, chaparral, and exposed bedrock
    const radiusX = 22;
    const radiusZ = 16;
    const peakHeight = 26;

    const ridgeElevation = (dx: number, dz: number) => {
      const nx = dx / radiusX;
      const nz = dz / radiusZ;
      const dist = Math.sqrt(nx * nx + nz * nz);
      if (dist >= 1.0) return 0;
      // Ridge spine runs roughly along East-West with summit at dx = 8, dz = -4
      const spineDist = Math.abs(dz + 3);
      const spineFalloff = Math.max(0, 1 - spineDist / 12);
      const baseH = (1 - dist) * peakHeight;
      const sculptedH = Math.round(baseH * 0.75 + spineFalloff * 8);
      return Math.max(0, Math.min(peakHeight, sculptedH));
    };

    for (let dx = -radiusX; dx <= radiusX; dx++) {
      for (let dz = -radiusZ; dz <= radiusZ; dz++) {
        const height = ridgeElevation(dx, dz);
        if (height <= 0) continue;
        const x = cx + dx;
        const z = cz + dz;

        for (let y = 1; y <= height; y++) {
          let block: string = 'red_sandstone';
          if (y === height) {
            // Surface terrain: granite/stone near crest, grass and arid shrubs lower down
            if (height >= 20) {
              block = 'smooth_stone';
            } else if (height >= 12) {
              block = (dx + dz) % 3 === 0 ? 'terracotta_adobe' : 'stone_bricks';
            } else {
              block = (dx + dz) % 2 === 0 ? 'grass' : 'terracotta_adobe';
            }
          } else if (y >= height - 2) {
            block = y >= 16 ? 'stone_bricks' : 'red_sandstone';
          }
          this.setBlock(x, y, z, block);
        }

        // Chaparral scrub & desert shrubs on lower slopes
        if (height >= 2 && height <= 14 && (dx * 13 + dz * 7) % 11 === 0) {
          this.setBlock(x, height + 1, z, 'oak_leaves');
        }
      }
    }

    // 2. Mulholland Scenic Drive Highway winding up the southern face
    for (let x = cx - 20; x <= cx + 18; x++) {
      const zCurve = Math.round(cz + 10 - Math.sin((x - cx) * 0.12) * 4);
      const groundH = ridgeElevation(x - cx, zCurve - cz);
      const roadY = Math.max(2, groundH);
      for (let dz = -1; dz <= 1; dz++) {
        this.setBlock(x, roadY, zCurve + dz, 'asphalt_road');
      }
      // Highway center yellow divider
      if (x % 2 === 0) {
        this.setBlock(x, roadY, zCurve, 'gold_block');
      }
      // Safety guardrails & highway lights
      this.setBlock(x, roadY + 1, zCurve + 2, 'oak_fence');
      if (x % 6 === 0) {
        this.setBlock(x, roadY + 2, zCurve + 2, 'sea_lantern');
      }
    }

    // 3. Iconic 3D HOLLYWOOD Sign (South-facing slope at Z = cz + 6)
    // 7 blocks high, 4 blocks wide, with rear support timber scaffolding & front ground spotlights
    const letters7x4: Record<string, string[]> = {
      H: ['1001', '1001', '1001', '1111', '1001', '1001', '1001'],
      O: ['0110', '1001', '1001', '1001', '1001', '1001', '0110'],
      L: ['1000', '1000', '1000', '1000', '1000', '1000', '1111'],
      Y: ['1001', '1001', '1001', '0110', '0010', '0010', '0010'],
      W: ['1001', '1001', '1001', '1001', '1011', '1101', '1001'],
      D: ['1110', '1001', '1001', '1001', '1001', '1001', '1110']
    };

    const word = ['H', 'O', 'L', 'L', 'Y', 'W', 'O', 'O', 'D'];
    const signZ = cz + 6;
    const signBaseY = 14; // Elevated prominently on the mountain ridge slope
    let signCursorX = cx - 18;

    for (const char of word) {
      const glyph = letters7x4[char] || letters7x4['H'];
      for (let row = 0; row < 7; row++) {
        const y = signBaseY + (6 - row);
        for (let col = 0; col < 4; col++) {
          const x = signCursorX + col;
          if (glyph[row][col] === '1') {
            // White Quartz letter face
            this.setBlock(x, y, signZ, 'quartz_block');
            // Heavy timber & iron structural scaffolding behind each block
            this.setBlock(x, y, signZ - 1, 'oak_fence');
            if (row === 6 || row === 3 || row === 0) {
              this.setBlock(x, y, signZ - 2, 'iron_block');
            }
          }
        }
      }

      // Ground spotlights in front of each letter
      this.setBlock(signCursorX + 1, signBaseY - 1, signZ + 2, 'sea_lantern');
      this.setBlock(signCursorX + 2, signBaseY - 1, signZ + 2, 'sea_lantern');
      signCursorX += 4; // next letter
    }

    // Hollywood Sign scenic viewing turn-out & historical marker
    this.setBlock(cx, 2, cz + 14, 'smooth_stone');
    this.setBlock(cx, 3, cz + 14, 'sea_lantern', {
      type: 'sign',
      title: 'The HOLLYWOOD Sign & Mount Lee',
      text: 'Original 1923 landmark rebuilt with monumental 7-block quartz lettering, scaffolding, and spotlights overlooking Los Angeles.'
    });

    // 4. Griffith Observatory on the Summit Ridge (cx + 8, cz - 5, Y = 22..28)
    const obsX = cx + 8;
    const obsZ = cz - 5;
    const obsY = 22;

    // Observatory Main Hall & Promenade (Footprint 11 x 7)
    for (let x = obsX - 5; x <= obsX + 5; x++) {
      for (let z = obsZ - 3; z <= obsZ + 3; z++) {
        this.setBlock(x, obsY, z, 'quartz_block');
        const isWall = (x === obsX - 5 || x === obsX + 5 || z === obsZ - 3 || z === obsZ + 3);
        if (isWall) {
          for (let y = obsY + 1; y <= obsY + 4; y++) {
            this.setBlock(x, y, z, (y === obsY + 2 || y === obsY + 3) ? 'cyber_glass' : 'quartz_pillar');
          }
        }
        this.setBlock(x, obsY + 5, z, 'quartz_block'); // Roof deck
      }
    }

    // Central Grand Planetarium Dome (copper-green prismarine)
    for (let dx = -2; dx <= 2; dx++) {
      for (let dz = -2; dz <= 2; dz++) {
        this.setBlock(obsX + dx, obsY + 6, obsZ + dz, 'prismarine_bricks');
        if (Math.abs(dx) <= 1 && Math.abs(dz) <= 1) {
          this.setBlock(obsX + dx, obsY + 7, obsZ + dz, 'prismarine_bricks');
        }
      }
    }
    this.setBlock(obsX, obsY + 8, obsZ, 'gold_block');

    // East & West Astronomical Telescope Domes
    for (const domeX of [obsX - 4, obsX + 4]) {
      for (let dx = -1; dx <= 1; dx++) {
        for (let dz = -1; dz <= 1; dz++) {
          this.setBlock(domeX + dx, obsY + 6, obsZ + dz, 'prismarine_bricks');
        }
      }
      this.setBlock(domeX, obsY + 7, obsZ, 'gold_block');
      // Giant Refractor Telescope pointing skyward
      this.setBlock(domeX, obsY + 8, obsZ - 1, 'iron_block');
    }

    this.setBlock(obsX, obsY + 1, obsZ + 4, 'sea_lantern', {
      type: 'sign',
      title: 'Griffith Observatory',
      text: 'Art Deco celestial observatory featuring triple planetarium domes and giant refractor telescopes peering into deep space.'
    });

    // 5. Cantilevered Modernist Celebrity Villa with Infinity Pool (cx - 12, cz - 6, Y = 16..20)
    const villaX = cx - 12;
    const villaZ = cz - 6;
    const villaY = 16;

    // Structural steel cantilever pillars hanging over the mountain edge
    for (let y = 6; y <= villaY; y++) {
      this.setBlock(villaX - 4, y, villaZ - 3, 'iron_block');
      this.setBlock(villaX + 4, y, villaZ - 3, 'iron_block');
    }

    // Concrete & Wood Villa Floor
    for (let x = villaX - 5; x <= villaX + 5; x++) {
      for (let z = villaZ - 4; z <= villaZ + 4; z++) {
        this.setBlock(x, villaY, z, (Math.abs(x - villaX) > 2) ? 'quartz_block' : 'oak_planks');
      }
    }

    // Floor-to-ceiling glass panoramic living room
    for (let x = villaX - 5; x <= villaX + 1; x++) {
      for (let z = villaZ - 4; z <= villaZ + 4; z++) {
        const isVillaEdge = (x === villaX - 5 || x === villaX + 1 || z === villaZ - 4 || z === villaZ + 4);
        if (isVillaEdge) {
          this.setBlock(x, villaY + 1, z, 'cyber_glass');
          this.setBlock(x, villaY + 2, z, 'cyber_glass');
          this.setBlock(x, villaY + 3, z, 'quartz_block');
        }
        this.setBlock(x, villaY + 4, z, 'smooth_stone'); // Flat modern roof
      }
    }

    // Cantilevered Infinity Pool hanging over the canyon (X in [villaX + 2, villaX + 5], Z in [villaZ - 3, villaZ + 3])
    for (let x = villaX + 2; x <= villaX + 5; x++) {
      for (let z = villaZ - 3; z <= villaZ + 3; z++) {
        const isPoolEdge = (x === villaX + 5 || z === villaZ - 3 || z === villaZ + 3);
        if (isPoolEdge) {
          this.setBlock(x, villaY, z, 'cyber_glass');
          this.setBlock(x, villaY + 1, z, 'cyber_glass'); // Glass infinity edge
        } else {
          this.setBlock(x, villaY - 1, z, 'sea_lantern'); // Underwater pool lights
          this.setBlock(x, villaY, z, 'water');
        }
      }
    }

    // Summit Beacon on top of Mount Lee peak
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
    // High-Fantasy Neuschwanstein Royal Fortress & Rapunzel Tower
    // Bounds: X in [cx - 14, cx + 14], Z in [cz - 14, cz + 14]

    // 1. Water Moat surrounding the entire fortress perimeter
    for (let x = cx - 14; x <= cx + 14; x++) {
      for (let z = cz - 14; z <= cz + 14; z++) {
        const d = Math.max(Math.abs(x - cx), Math.abs(z - cz));
        if (d >= 12 && d <= 14) {
          // Leave opening for southern drawbridge entrance
          const isBridgeSpan = (Math.abs(x - cx) <= 2 && z >= cz + 11);
          if (!isBridgeSpan) {
            this.setBlock(x, 1, z, 'water');
          }
        }
      }
    }

    // 2. Heavy Timber Drawbridge & Moat Piers (Z in [cz + 11, cz + 14])
    for (let z = cz + 11; z <= cz + 14; z++) {
      for (let x = cx - 2; x <= cx + 2; x++) {
        this.setBlock(x, 1, z, 'oak_planks');
        if (Math.abs(x - cx) === 2) {
          this.setBlock(x, 2, z, 'oak_fence');
        }
      }
    }
    // Drawbridge iron winches and chains
    this.setBlock(cx - 2, 3, cz + 11, 'iron_block');
    this.setBlock(cx + 2, 3, cz + 11, 'iron_block');

    // 3. Fortress Foundation Plinth & Outer Courtyard (Y = 1, X in [cx - 11, cx + 11], Z in [cz - 11, cz + 11])
    for (let x = cx - 11; x <= cx + 11; x++) {
      for (let z = cz - 11; z <= cz + 11; z++) {
        const isYard = Math.abs(x - cx) < 11 && Math.abs(z - cz) < 11;
        this.setBlock(x, 1, z, isYard ? 'stone_bricks' : 'mossy_cobblestone');
      }
    }

    // 4. Outer Curtain Wall & Battlements with Crenelations (Y = 2..8)
    for (let x = cx - 11; x <= cx + 11; x++) {
      for (let z = cz - 11; z <= cz + 11; z++) {
        const isWall = Math.abs(x - cx) === 11 || Math.abs(z - cz) === 11;
        const isGateOpening = (z === cz + 11 && Math.abs(x - cx) <= 2);
        if (isWall && !isGateOpening) {
          for (let y = 2; y <= 7; y++) {
            this.setBlock(x, y, z, (y === 4 && (x + z) % 4 === 0) ? 'cyber_glass' : 'stone_bricks');
          }
          // Crenelated parapet battlements
          if ((x + z) % 2 === 0) {
            this.setBlock(x, 8, z, 'stone_bricks');
          }
        }
      }
    }

    // 5. Fortified Gatehouse with Iron Portcullis & Guard Towers (Z = cz + 11)
    for (let y = 2; y <= 10; y++) {
      this.setBlock(cx - 3, y, cz + 11, 'stone_bricks');
      this.setBlock(cx - 2, y, cz + 11, 'stone_bricks');
      this.setBlock(cx + 2, y, cz + 11, 'stone_bricks');
      this.setBlock(cx + 3, y, cz + 11, 'stone_bricks');
      // Iron Portcullis bars
      if (y >= 2 && y <= 5) {
        this.setBlock(cx - 1, y, cz + 11, 'iron_block');
        this.setBlock(cx, y, cz + 11, 'iron_block');
        this.setBlock(cx + 1, y, cz + 11, 'iron_block');
      }
    }
    // Gatehouse arch canopy
    for (let x = cx - 3; x <= cx + 3; x++) {
      this.setBlock(x, 9, cz + 11, 'quartz_block');
      this.setBlock(x, 10, cz + 11, 'gold_block');
    }
    this.setBlock(cx, 11, cz + 11, 'sea_lantern');

    // 6. Four Corner Drum Bastion Towers (3x3 at each corner, Y = 2..15)
    const corners = [
      { bx: cx - 10, bz: cz - 10 },
      { bx: cx + 10, bz: cz - 10 },
      { bx: cx - 10, bz: cz + 10 },
      { bx: cx + 10, bz: cz + 10 }
    ];
    for (const c of corners) {
      for (let y = 2; y <= 13; y++) {
        for (let dx = -1; dx <= 1; dx++) {
          for (let dz = -1; dz <= 1; dz++) {
            if (Math.abs(dx) === 1 && Math.abs(dz) === 1) continue; // Round cylinder shape
            this.setBlock(c.bx + dx, y, c.bz + dz, (y % 4 === 0) ? 'smooth_stone' : 'stone_bricks');
          }
        }
      }
      // Conical fairy-tale spire roofs in Prussian Blue / Lapis & Gold
      for (let dx = -1; dx <= 1; dx++) {
        for (let dz = -1; dz <= 1; dz++) {
          this.setBlock(c.bx + dx, 14, c.bz + dz, 'lapis_block');
        }
      }
      this.setBlock(c.bx, 15, c.bz, 'gold_block');
      this.setBlock(c.bx, 16, c.bz, 'sea_lantern');
    }

    // 7. Central Royal Keep & Grand Great Hall (Footprint 11x9, Y = 2..20)
    for (let x = cx - 5; x <= cx + 5; x++) {
      for (let z = cz - 7; z <= cz + 1; z++) {
        const isWall = (x === cx - 5 || x === cx + 5 || z === cz - 7 || z === cz + 1);
        if (isWall) {
          for (let y = 2; y <= 16; y++) {
            const isWindow = (y === 6 || y === 12) && (x % 2 === 0 || z % 2 === 0);
            this.setBlock(x, y, z, isWindow ? 'cyber_glass' : 'stone_bricks');
          }
        }
        // Great Hall wooden banquet floor (Y = 2)
        this.setBlock(x, 2, z, 'oak_planks');
        // Keep roof terrace (Y = 17)
        this.setBlock(x, 17, z, 'smooth_stone');
      }
    }

    // Great Hall Interior: Long oak banquet table, chandelier, and thrones
    for (let z = cz - 5; z <= cz - 1; z++) {
      this.setBlock(cx, 3, z, 'oak_planks'); // Long feast table
      this.setBlock(cx - 1, 3, z, 'bookshelf');
      this.setBlock(cx + 1, 3, z, 'bookshelf');
    }
    // Twin Gilded Royal Thrones at northern dais (cx - 1, cx + 1, cz - 6)
    this.setBlock(cx - 1, 3, cz - 6, 'gold_block');
    this.setBlock(cx - 1, 4, cz - 6, 'gold_block');
    this.setBlock(cx + 1, 3, cz - 6, 'diamond_block');
    this.setBlock(cx + 1, 4, cz - 6, 'diamond_block');
    this.setBlock(cx, 8, cz - 3, 'sea_lantern'); // Hanging grand chandelier

    // High keep peaked gabled roof (Y = 18..22)
    for (let step = 0; step <= 4; step++) {
      const y = 18 + step;
      for (let z = cz - 7; z <= cz + 1; z++) {
        this.setBlock(cx - (5 - step), y, z, 'prismarine_bricks');
        this.setBlock(cx + (5 - step), y, z, 'prismarine_bricks');
      }
    }

    // 8. Rapunzel's Fairytale Sky Tower & Cascading Golden Braid (Y = 2..38)
    // Tower centered at (cx + 5, cz + 5)
    const rapX = cx + 5;
    const rapZ = cz + 5;

    for (let y = 2; y <= 34; y++) {
      for (let dx = -2; dx <= 2; dx++) {
        for (let dz = -2; dz <= 2; dz++) {
          const dist = Math.abs(dx) + Math.abs(dz);
          if (dist === 2 || (Math.abs(dx) === 2 && Math.abs(dz) === 1) || (Math.abs(dx) === 1 && Math.abs(dz) === 2)) {
            // Cylindrical tower shell
            this.setBlock(rapX + dx, y, rapZ + dz, (y % 6 === 0) ? 'sea_lantern' : 'quartz_pillar');
          }
        }
      }
    }

    // Rapunzel's High Chamber Balcony & Room (Y = 32..35)
    this.setBlock(rapX, 32, rapZ, 'gold_block');
    this.setBlock(rapX, 33, rapZ, 'bookshelf'); // Rapunzel's library
    // Fairytale Conical Spire Crown (Y = 35..38)
    for (let dx = -2; dx <= 2; dx++) {
      for (let dz = -2; dz <= 2; dz++) {
        if (Math.abs(dx) <= 1 && Math.abs(dz) <= 1) {
          this.setBlock(rapX + dx, 35, rapZ + dz, 'gold_block');
        }
      }
    }
    this.setBlock(rapX, 36, rapZ, 'lapis_block');
    this.setBlock(rapX, 37, rapZ, 'gold_block');
    this.setBlock(rapX, 38, rapZ, 'beacon'); // Glowing tower apex

    // 28-Block Cascading Golden Braid falling from balcony (Y = 32 down to Y = 4)
    // Braid weaves realistically down the south-east tower wall with sinusoidal waves
    for (let y = 4; y <= 32; y++) {
      const braidOffset = Math.sin(y * 0.45) * 0.8;
      const bx = rapX + 2 + Math.round(braidOffset);
      const bz = rapZ + 1;
      this.setBlock(bx, y, bz, (y % 3 === 0) ? 'glowstone' : 'gold_block');
      if (y % 4 === 0) {
        this.setBlock(bx + 1, y, bz, 'gold_block'); // Thick hair strand
      }
    }

    // Historical Plaque & Royal Sign at the drawbridge entrance
    this.setBlock(cx, 2, cz + 15, 'sea_lantern', {
      type: 'sign',
      title: 'Neuschwanstein & Rapunzel’s Keep',
      text: 'High-fantasy fortress featuring moat, drawbridge, Great Hall thrones, and Rapunzel’s soaring tower with cascading golden hair.'
    });
  }

  private buildEiffelTower(cx: number, cz: number) {
    // Solid concrete/stone plinth under tower footings (Y = 1)
    for (let x = cx - 9; x <= cx + 9; x++) {
      for (let z = cz - 9; z <= cz + 9; z++) {
        const isLegArea = (Math.abs(x - cx) >= 5 && Math.abs(z - cz) >= 5);
        if (isLegArea) {
          this.setBlock(x, 1, z, 'stone_bricks');
        }
      }
    }

    // 4 Heavy lattice legs with continuous column blocks
    for (let y = 1; y <= 16; y++) {
      const span = Math.max(2, Math.round(7 - (y - 1) * 0.35));
      for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
        const lx = cx + sx * span;
        const lz = cz + sz * span;
        this.setBlock(lx, y, lz, 'iron_block');
        // Ensure support from previous level so taper doesn't create floating diagonal gap
        if (y > 1) {
          this.setBlock(lx, y - 1, lz, 'iron_block');
        }
        if (y % 4 === 0) this.setBlock(lx, y, cz + sz * (span - 1), 'red_sandstone');
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

  private buildRailwayViaduct() {
    const trestles = [
      { x: 72, z: 34 },
      { x: 82, z: 36 },
      { x: 92, z: 42 },
      { x: 102, z: 48 },
      { x: 112, z: 56 },
      { x: 122, z: 66 }
    ];
    for (const t of trestles) {
      for (let dx = -1; dx <= 1; dx++) {
        for (let dz = -1; dz <= 1; dz++) {
          this.setBlock(t.x + dx, 1, t.z + dz, 'stone_bricks');
        }
      }
      this.setBlock(t.x, 2, t.z, 'stone_bricks');
      this.setBlock(t.x - 1, 2, t.z, 'quartz_pillar');
      this.setBlock(t.x + 1, 2, t.z, 'quartz_pillar');
      this.setBlock(t.x, 3, t.z + 1, 'glowstone');
    }
  }

  private buildRailwayStation(cx: number, cz: number) {
    // Crossroads Central Station Train Hall (Footprint: X in [cx - 10, cx + 10], Z in [cz - 7, cz + 7])
    // 1. Dual Track Bed in center (Z in [cz - 1, cz + 1], Y = 1)
    for (let x = cx - 10; x <= cx + 10; x++) {
      for (let z = cz - 1; z <= cz + 1; z++) {
        this.setBlock(x, 1, z, 'smooth_stone');
      }
      // Oak sleepers and iron rails on track beds
      this.setBlock(x, 1, cz, (x % 2 === 0) ? 'oak_planks' : 'iron_block');
    }
    // Buffer stops at West end of Central Station (cx - 10)
    for (let z = cz - 1; z <= cz + 1; z++) {
      this.setBlock(cx - 10, 2, z, 'stone_bricks');
      this.setBlock(cx - 10, 3, z, 'redstone_block');
    }

    // 2. North & South Raised Passenger Platforms (Y = 2)
    // North Platform (Z in [cz - 7, cz - 2])
    for (let x = cx - 10; x <= cx + 10; x++) {
      for (let z = cz - 7; z <= cz - 2; z++) {
        this.setBlock(x, 1, z, 'stone_bricks');
        this.setBlock(x, 2, z, 'smooth_stone');
      }
    }
    // South Platform (Z in [cz + 2, cz + 7])
    for (let x = cx - 10; x <= cx + 10; x++) {
      for (let z = cz + 2; z <= cz + 7; z++) {
        this.setBlock(x, 1, z, 'stone_bricks');
        this.setBlock(x, 2, z, 'smooth_stone');
      }
    }

    // Platform edge warning tactile lines (quartz)
    for (let x = cx - 10; x <= cx + 10; x++) {
      this.setBlock(x, 2, cz - 2, 'quartz_block');
      this.setBlock(x, 2, cz + 2, 'quartz_block');
    }

    // 3. Arched Vaulted Glass Train Shed Canopy
    for (const px of [cx - 8, cx - 2, cx + 4, cx + 10]) {
      for (let y = 2; y <= 7; y++) {
        this.setBlock(px, y, cz - 7, 'quartz_pillar');
        this.setBlock(px, y, cz + 7, 'quartz_pillar');
      }
    }
    // Curved roof ribs spanning across
    for (let x = cx - 10; x <= cx + 10; x++) {
      for (let z = cz - 7; z <= cz + 7; z++) {
        const dist = Math.abs(z - cz);
        const roofY = Math.round(8 + (1 - dist / 7) * 2);
        if (x % 3 === 0 || dist === 7) {
          this.setBlock(x, roofY, z, 'quartz_block');
        } else {
          this.setBlock(x, roofY, z, 'cyber_glass');
        }
      }
      if (x % 5 === 0) {
        this.setBlock(x, 7, cz, 'glowstone');
      }
    }

    // 4. Station Passenger Amenities: ticket machines, benches, departure board
    this.setBlock(cx - 4, 3, cz - 5, 'bookshelf');
    this.setBlock(cx - 3, 3, cz - 5, 'bookshelf');
    this.setBlock(cx + 4, 3, cz + 5, 'gold_block');
    this.setBlock(cx, 3, cz - 4, 'glowstone', {
      type: 'sign',
      title: 'Crossroads Central Station',
      text: 'Platform 1 · Express Rail Line to Crossroads International Airport.'
    });
  }

  private buildAirport(cx: number, cz: number) {
    // 1. Extended Lighted Commercial Runway (X in [85, 165], Z in [80, 90])
    for (let x = 85; x <= 165; x++) {
      for (let z = 80; z <= 90; z++) {
        this.setBlock(x, 1, z, 'asphalt_road');
      }
    }

    // Runway Piano Key Threshold Markings
    for (let x = 86; x <= 90; x++) {
      for (let z = 81; z <= 89; z += 2) {
        this.setBlock(x, 1, z, 'quartz_block');
      }
    }
    for (let x = 160; x <= 164; x++) {
      for (let z = 81; z <= 89; z += 2) {
        this.setBlock(x, 1, z, 'quartz_block');
      }
    }

    // Runway Designation Markings "09" (West) & "27" (East)
    for (const [dx, dz] of [[0, -1], [0, 0], [0, 1], [-1, -1], [-1, 1], [1, -1], [1, 1]]) {
      this.setBlock(93 + dx, 1, 85 + dz, 'quartz_block');
      this.setBlock(157 + dx, 1, 85 + dz, 'quartz_block');
    }

    // Dashed Runway Centerline along Z = 85
    for (let x = 95; x <= 155; x++) {
      if (x % 4 === 0 || x % 4 === 1) {
        this.setBlock(x, 1, 85, 'quartz_block');
      }
    }

    // Touchdown Zone Stripes
    for (const tx of [101, 102, 148, 149]) {
      this.setBlock(tx, 1, 83, 'quartz_block');
      this.setBlock(tx, 1, 87, 'quartz_block');
    }

    // Runway Lighting
    // Green threshold entry lights (X = 85)
    for (let z = 80; z <= 90; z++) {
      this.setBlock(85, 1, z, 'sea_lantern');
    }
    // Red runway end lights (X = 165)
    for (let z = 80; z <= 90; z++) {
      this.setBlock(165, 1, z, 'redstone_block');
    }
    // Elevated border runway lights (Z = 80 and Z = 90)
    for (let x = 86; x <= 164; x += 4) {
      this.setBlock(x, 1, 80, 'iron_block');
      this.setBlock(x, 2, 80, 'glowstone');
      this.setBlock(x, 1, 90, 'iron_block');
      this.setBlock(x, 2, 90, 'glowstone');
    }

    // 2. Taxiway with Gold Centerline linking Runway to Parking Apron
    for (let x = 110; x <= 126; x++) {
      for (let z = 76; z <= 79; z++) {
        this.setBlock(x, 1, z, 'asphalt_road');
      }
      this.setBlock(x, 1, 78, 'gold_block'); // Yellow taxiway centerline
    }

    // 3. Aircraft Parking Apron / Tarmac (X in [106, 144], Z in [66, 76])
    for (let x = 106; x <= 144; x++) {
      for (let z = 66; z <= 76; z++) {
        this.setBlock(x, 1, z, 'smooth_stone');
      }
    }
    // Aircraft stop bar / bay guide
    for (let z = 70; z <= 76; z++) {
      this.setBlock(110, 1, z, 'gold_block');
    }

    // 4. Voxel Twin-Engine Passenger Jet Airliner parked on Apron facing West
    const planeX = 118;
    const planeZ = 73;

    // Aerodynamic Fuselage (X from 108 to 128, Y from 2 to 5, Z from 72 to 74)
    // Streamlined Nose cone
    this.setBlock(108, 3, planeZ, 'quartz_block');
    this.setBlock(109, 3, planeZ, 'quartz_block');
    this.setBlock(109, 4, planeZ, 'quartz_block');
    // Cockpit windshield
    this.setBlock(110, 4, planeZ, 'cyber_glass');
    this.setBlock(110, 4, planeZ - 1, 'cyber_glass');
    this.setBlock(110, 4, planeZ + 1, 'cyber_glass');
    this.setBlock(110, 3, planeZ, 'quartz_block');

    // Main Cabin Body
    for (let x = 111; x <= 125; x++) {
      // Cabin floor
      this.setBlock(x, 2, planeZ, 'iron_block');
      this.setBlock(x, 2, planeZ - 1, 'iron_block');
      this.setBlock(x, 2, planeZ + 1, 'iron_block');
      // Cabin walls and passenger windows
      this.setBlock(x, 3, planeZ - 1, 'quartz_block');
      this.setBlock(x, 3, planeZ + 1, 'quartz_block');
      this.setBlock(x, 4, planeZ - 1, (x % 2 === 0) ? 'cyber_glass' : 'quartz_block');
      this.setBlock(x, 4, planeZ + 1, (x % 2 === 0) ? 'cyber_glass' : 'quartz_block');
      // Cabin ceiling / roof
      this.setBlock(x, 5, planeZ, 'quartz_block');
      this.setBlock(x, 5, planeZ - 1, 'quartz_block');
      this.setBlock(x, 5, planeZ + 1, 'quartz_block');
      // Interior passenger lighting
      if (x === 115 || x === 121) {
        this.setBlock(x, 4, planeZ, 'glowstone');
      }
    }

    // Swept-Back Wings with Red/Green Wingtip Nav Lights
    for (let offset = 0; offset <= 7; offset++) {
      const wx = planeX + Math.round(offset * 0.6);
      // Starboard (North) wing towards terminal
      this.setBlock(wx, 3, planeZ - 2 - offset, 'quartz_block');
      this.setBlock(wx + 1, 3, planeZ - 2 - offset, 'quartz_block');
      // Port (South) wing towards runway
      this.setBlock(wx, 3, planeZ + 2 + offset, 'quartz_block');
      this.setBlock(wx + 1, 3, planeZ + 2 + offset, 'quartz_block');
    }
    // Wingtip navigation beacons
    this.setBlock(planeX + 5, 3, planeZ - 9, 'emerald_block'); // Green starboard
    this.setBlock(planeX + 5, 3, planeZ + 9, 'redstone_block'); // Red port

    // Twin High-Bypass Jet Turbines under Wings
    for (const engZ of [planeZ - 4, planeZ + 4]) {
      // Pylon
      this.setBlock(planeX, 3, engZ, 'iron_block');
      // Engine nacelle (X in [planeX - 1, planeX + 1])
      this.setBlock(planeX - 1, 2, engZ, 'obsidian'); // Jet intake
      this.setBlock(planeX, 2, engZ, 'iron_block'); // Core compressor
      this.setBlock(planeX + 1, 2, engZ, 'glowstone'); // Turbine exhaust flare
    }

    // T-Tail Vertical Stabilizer & Horizontal Tailwings
    for (let y = 5; y <= 9; y++) {
      const tx = 126 + Math.round((y - 5) * 0.4);
      this.setBlock(tx, y, planeZ, 'lapis_block');
      this.setBlock(tx + 1, y, planeZ, 'gold_block');
    }
    for (let dz = -3; dz <= 3; dz++) {
      this.setBlock(127, 7, planeZ + dz, 'quartz_block');
    }

    // Tricycle Heavy Landing Gear resting on tarmac
    // Nose gear
    this.setBlock(110, 2, planeZ, 'iron_block');
    this.setBlock(110, 1, planeZ, 'coal_block');
    // Main landing gear
    this.setBlock(planeX, 2, planeZ - 2, 'iron_block');
    this.setBlock(planeX, 1, planeZ - 2, 'coal_block');
    this.setBlock(planeX, 2, planeZ + 2, 'iron_block');
    this.setBlock(planeX, 1, planeZ + 2, 'coal_block');

    // 5. Enclosed Glass Jet Bridge connecting Terminal Gate to Aircraft
    for (let z = 65; z <= 71; z++) {
      this.setBlock(112, 2, z, 'iron_block');
      this.setBlock(112, 3, z, 'smooth_stone'); // Walkway floor
      this.setBlock(111, 4, z, 'cyber_glass');
      this.setBlock(113, 4, z, 'cyber_glass');
      this.setBlock(112, 5, z, 'quartz_block'); // Canopy
    }

    // 6. Modern Glass & Quartz Terminal Concourse (X in [110, 140], Z in [54, 65])
    for (let x = 110; x <= 140; x++) {
      for (let z = 54; z <= 65; z++) {
        this.setBlock(x, 1, z, 'quartz_block');
        const isWall = (x === 110 || x === 140 || z === 54 || z === 65);
        if (isWall) {
          for (let y = 2; y <= 6; y++) {
            const isColumn = (x % 5 === 0 || z % 5 === 0);
            this.setBlock(x, y, z, isColumn ? 'quartz_pillar' : 'cyber_glass');
          }
        }
        // Roof
        this.setBlock(x, 7, z, 'quartz_block');
      }
    }
    // Terminal interior features: check-in counters & departure gate
    for (let x = 118; x <= 134; x += 4) {
      this.setBlock(x, 2, 58, 'oak_planks');
      this.setBlock(x, 3, 58, 'gold_block');
    }
    this.setBlock(112, 3, 64, 'glowstone', {
      type: 'sign',
      title: 'Gate 1 · Boarding',
      text: 'Flight AG-2026 · Lakshya Portfolio World Express · On Time'
    });

    // 7. Airport Air Traffic Control (ATC) Tower at (142, 58)
    const atcX = 142;
    const atcZ = 58;
    for (let y = 2; y <= 16; y++) {
      for (let dx = -1; dx <= 1; dx++) {
        for (let dz = -1; dz <= 1; dz++) {
          if (Math.abs(dx) === 1 && Math.abs(dz) === 1) continue;
          this.setBlock(atcX + dx, y, atcZ + dz, 'quartz_pillar');
        }
      }
    }
    // 360-degree glass observation cab at Y = 17 to 20
    for (let dx = -2; dx <= 2; dx++) {
      for (let dz = -2; dz <= 2; dz++) {
        this.setBlock(atcX + dx, 17, atcZ + dz, 'quartz_block');
        const isEdge = (Math.abs(dx) === 2 || Math.abs(dz) === 2);
        for (let y = 18; y <= 20; y++) {
          this.setBlock(atcX + dx, y, atcZ + dz, isEdge ? 'cyber_glass' : 'stone_bricks');
        }
        this.setBlock(atcX + dx, 21, atcZ + dz, 'quartz_block');
      }
    }
    // Radar dome and glowing aeronautical beacon
    this.setBlock(atcX, 22, atcZ, 'iron_block');
    this.setBlock(atcX, 23, atcZ, 'beacon');
    this.setBlock(atcX, 24, atcZ, 'glowstone');

    // 8. Airport Railway Station Platform (X in [124, 136], Z in [70, 74])
    for (let x = 124; x <= 136; x++) {
      for (let z = 70; z <= 74; z++) {
        this.setBlock(x, 2, z, 'smooth_stone');
        if (x % 4 === 0) {
          this.setBlock(x, 3, 74, 'quartz_pillar');
          this.setBlock(x, 4, 74, 'glowstone');
        }
      }
    }

    // 9. Second Commercial Airliner on Runway Threshold 09 Lined Up for Takeoff (Facing East)
    const runPlaneX = 98;
    const runPlaneZ = 85;
    // Aerodynamic Fuselage (X from 90 to 106)
    // Pointed Nose cone
    this.setBlock(106, 3, runPlaneZ, 'quartz_block');
    this.setBlock(105, 3, runPlaneZ, 'quartz_block');
    this.setBlock(105, 4, runPlaneZ, 'quartz_block');
    this.setBlock(104, 4, runPlaneZ, 'cyber_glass'); // Cockpit
    this.setBlock(104, 4, runPlaneZ - 1, 'cyber_glass');
    this.setBlock(104, 4, runPlaneZ + 1, 'cyber_glass');
    // Cabin Body
    for (let x = 93; x <= 103; x++) {
      this.setBlock(x, 2, runPlaneZ, 'iron_block');
      this.setBlock(x, 3, runPlaneZ - 1, 'quartz_block');
      this.setBlock(x, 3, runPlaneZ + 1, 'quartz_block');
      this.setBlock(x, 4, runPlaneZ - 1, (x % 2 === 0) ? 'cyber_glass' : 'quartz_block');
      this.setBlock(x, 4, runPlaneZ + 1, (x % 2 === 0) ? 'cyber_glass' : 'quartz_block');
      this.setBlock(x, 5, runPlaneZ, 'quartz_block');
    }
    // Swept-Back Wings with Flaps Extended
    for (let offset = 0; offset <= 6; offset++) {
      const wx = runPlaneX - Math.round(offset * 0.5);
      this.setBlock(wx, 3, runPlaneZ - 2 - offset, 'quartz_block');
      this.setBlock(wx, 3, runPlaneZ + 2 + offset, 'quartz_block');
    }
    this.setBlock(runPlaneX - 3, 3, runPlaneZ - 8, 'emerald_block'); // Nav light
    this.setBlock(runPlaneX - 3, 3, runPlaneZ + 8, 'redstone_block');
    // Jet Turbines spooling up with hot glowing thrust
    for (const ez of [runPlaneZ - 3, runPlaneZ + 3]) {
      this.setBlock(runPlaneX, 2, ez, 'iron_block');
      this.setBlock(runPlaneX - 1, 2, ez, 'magma_block'); // Jet exhaust
      this.setBlock(runPlaneX - 2, 2, ez, 'glowstone');
    }
    // Tailfin & Stabilizers
    for (let y = 5; y <= 8; y++) {
      this.setBlock(91 + (y - 5), y, runPlaneZ, 'red_terracotta');
    }
    for (let dz = -2; dz <= 2; dz++) {
      this.setBlock(92, 6, runPlaneZ + dz, 'quartz_block');
    }
    this.setBlock(106, 2, runPlaneZ, 'gold_block', {
      type: 'sign',
      title: 'Flight AG-101 · Cleared for Takeoff',
      text: 'Heavy passenger jet spooling full thrust for departure on Runway 09 Eastbound!'
    });

    // 10. Executive Twin-Turboprop Plane on Apron (135, 1, 72)
    const tpX = 135;
    const tpZ = 72;
    for (let x = tpX - 4; x <= tpX + 4; x++) {
      this.setBlock(x, 2, tpZ, 'quartz_block');
      this.setBlock(x, 3, tpZ, (x === tpX + 3) ? 'cyber_glass' : 'quartz_block');
    }
    // Straight wings
    for (let dz = -5; dz <= 5; dz++) {
      this.setBlock(tpX, 3, tpZ + dz, 'quartz_block');
    }
    // Twin Turboprops with spinning propellers
    for (const tz of [tpZ - 2, tpZ + 2]) {
      this.setBlock(tpX + 1, 2, tz, 'iron_block');
      this.setBlock(tpX + 2, 2, tz, 'iron_block'); // Spinner
      this.setBlock(tpX + 2, 3, tz, 'iron_block'); // Prop blade
      this.setBlock(tpX + 2, 1, tz, 'iron_block'); // Prop blade
    }
    // T-Tail
    this.setBlock(tpX - 4, 4, tpZ, 'lapis_block');
    this.setBlock(tpX - 4, 5, tpZ, 'lapis_block');
    for (let dz = -1; dz <= 1; dz++) this.setBlock(tpX - 4, 5, tpZ + dz, 'quartz_block');
    this.setBlock(tpX + 4, 2, tpZ, 'smooth_stone', {
      type: 'sign',
      title: 'Beechcraft King Air · Corporate Turboprop',
      text: 'Twin-engine executive turboprop utility aircraft for private regional transport.'
    });

    // 11. Emergency Air Rescue Helicopter on Marked Helipad at (102, 1, 70)
    const heliX = 102;
    const heliZ = 70;
    // 7x7 Helipad with Bold Red/Yellow Markings
    for (let dx = -3; dx <= 3; dx++) {
      for (let dz = -3; dz <= 3; dz++) {
        const isBorder = (Math.abs(dx) === 3 || Math.abs(dz) === 3);
        if (isBorder) {
          this.setBlock(heliX + dx, 1, heliZ + dz, 'redstone_block');
        } else {
          // Yellow "H" inside
          const isH = (Math.abs(dx) === 1 && Math.abs(dz) <= 1) || (dx === 0 && dz === 0);
          this.setBlock(heliX + dx, 1, heliZ + dz, isH ? 'gold_block' : 'smooth_stone');
        }
      }
    }
    // Yellow Search & Rescue Helicopter
    // Landing Skids
    this.setBlock(heliX - 1, 2, heliZ - 1, 'iron_block');
    this.setBlock(heliX + 1, 2, heliZ - 1, 'iron_block');
    this.setBlock(heliX - 1, 2, heliZ + 1, 'iron_block');
    this.setBlock(heliX + 1, 2, heliZ + 1, 'iron_block');
    // Cabin Body
    for (let x = heliX - 2; x <= heliX + 1; x++) {
      for (let z = heliZ - 1; z <= heliZ + 1; z++) {
        this.setBlock(x, 3, z, (x === heliX + 1) ? 'cyber_glass' : 'gold_block');
        this.setBlock(x, 4, z, (x === heliX + 1) ? 'cyber_glass' : 'gold_block');
      }
    }
    // Tail Boom
    for (let x = heliX - 5; x <= heliX - 3; x++) {
      this.setBlock(x, 3, heliZ, 'gold_block');
    }
    // Tail Rotor
    this.setBlock(heliX - 5, 4, heliZ, 'iron_block');
    this.setBlock(heliX - 5, 5, heliZ, 'iron_block');
    // Overhead Main Rotor Mast and 4 Rotor Blades
    this.setBlock(heliX - 1, 5, heliZ, 'iron_block');
    for (let d = -3; d <= 3; d++) {
      this.setBlock(heliX - 1 + d, 6, heliZ, 'iron_block');
      this.setBlock(heliX - 1, 6, heliZ + d, 'iron_block');
    }
    this.setBlock(heliX - 1, 7, heliZ, 'beacon'); // Strobe
    this.setBlock(heliX + 2, 2, heliZ, 'gold_block', {
      type: 'sign',
      title: 'LifeFlight Air Rescue Helicopter',
      text: 'Emergency search-and-rescue helicopter standing by on designated coastal helipad.'
    });

    // 12. Sky Jet Banking High Overhead at (110, 32, 110)
    const sjX = 110;
    const sjY = 32;
    const sjZ = 110;
    for (let i = 0; i < 8; i++) {
      this.setBlock(sjX - i, sjY, sjZ + i, 'quartz_block');
    }
    // Wings banking at 45 degrees
    for (let w = 1; w <= 4; w++) {
      this.setBlock(sjX - 3 - w, sjY + w, sjZ + 3 - w, 'quartz_block');
      this.setBlock(sjX - 3 + w, sjY - w, sjZ + 3 + w, 'quartz_block');
    }
    // Contrail vapor trails trailing behind
    for (let tr = 1; tr <= 12; tr++) {
      this.setBlock(sjX - 8 - tr, sjY, sjZ + 8 + tr, 'snow');
    }

    this.setBlock(120, 2, 53, 'glowstone', {
      type: 'sign',
      title: 'Crossroads International Airport',
      text: 'Runway 09/27, twin-engine passenger jet, ATC control tower, and direct rail link.'
    });
  }
}
