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

// Authentic Non-Uniform Continental Country Coastline Geometry
export const COUNTRY_COAST_POINTS: [number, number][] = [
  // North Alpine Peninsula & Glacial Fjords
  [-20, -195], [20, -195], [65, -190], [115, -185],
  // North-East Subcontinent & Bay of Bengal Headland
  [155, -172], [178, -148], [184, -120], [188, -85],
  // Radiator Springs Raceway Coastline
  [192, -55], [188, -20],
  // Dubai Waterfront & Arabian Gulf Estuary
  [182, 10], [182, 25], [185, 42], [182, 60], [178, 80],
  // Southeast Coastal Shallows & Airport Lagoon
  [150, 95], [115, 105], [75, 112], [42, 116],
  // Southern Carnival Pier & Oceanfront Peninsula
  [38, 145], [35, 188], [15, 198], [-15, 198], [-35, 188], [-38, 145],
  // Southwest Mexican Cape & Desert Headland
  [-45, 115], [-85, 120], [-125, 128], [-158, 122], [-178, 102], [-188, 75],
  // Western Giza Dunes & Pyramids Promontory
  [-190, 45], [-190, 15], [-184, -15],
  // Northwest Pacific Rim, Tokyo Scramble & Great Wall Mountain Headlands
  [-184, -50], [-188, -85], [-182, -120], [-160, -158], [-120, -180], [-70, -190]
];

interface PolarCoastPoint {
  angle: number;
  radius: number;
}

const POLAR_COAST: PolarCoastPoint[] = COUNTRY_COAST_POINTS.map(([px, pz]) => ({
  angle: Math.atan2(pz, px),
  radius: Math.hypot(px, pz)
})).sort((a, b) => a.angle - b.angle);

export class WorldBuilder {
  private blocks: Map<string, VoxelBlock> = new Map();

  // Pure Deterministic Non-Uniform Country Continental Coastline Function
  public static getCountryCoastRadius(x: number, z: number): number {
    const a = Math.atan2(z, x);
    let baseR = 190;
    if (a <= POLAR_COAST[0].angle || a >= POLAR_COAST[POLAR_COAST.length - 1].angle) {
      const pPrev = POLAR_COAST[POLAR_COAST.length - 1];
      const pNext = POLAR_COAST[0];
      const nextAngle = pNext.angle + Math.PI * 2;
      const curAngle = a <= POLAR_COAST[0].angle ? a + Math.PI * 2 : a;
      const span = nextAngle - pPrev.angle;
      const t = Math.max(0, Math.min(1, (curAngle - pPrev.angle) / span));
      baseR = pPrev.radius + (pNext.radius - pPrev.radius) * t;
    } else {
      for (let i = 0; i < POLAR_COAST.length - 1; i++) {
        if (a >= POLAR_COAST[i].angle && a <= POLAR_COAST[i + 1].angle) {
          const span = POLAR_COAST[i + 1].angle - POLAR_COAST[i].angle;
          const t = span > 0 ? (a - POLAR_COAST[i].angle) / span : 0;
          baseR = POLAR_COAST[i].radius + (POLAR_COAST[i + 1].radius - POLAR_COAST[i].radius) * t;
          break;
        }
      }
    }
    const noise = Math.sin(x * 0.085 + z * 0.065) * 4.2 + Math.cos(x * 0.13 - z * 0.095) * 2.8;
    return baseR + noise;
  }

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
    this.buildLightningMcQueenStreet();
    this.buildGrandCarnivalPier();
    this.buildCivicAndAdventureDistricts();
    this.buildSunsetSaloonAndBar();
    this.buildPalmBeachAndOcean();
    this.buildNatureAndFlora();
    this.buildCountryMapKiosks();
    this.buildRealmCountryFlags();
    this.buildAlpineSnowMountainRealm();
    this.buildSunflowerValleyAndFarmstead();
    this.buildPromenadeParklands();
    this.buildMegaSuspensionBridge();
    this.buildColossalRomanAqueduct();
    this.buildNordicAtlanticSkyway();
    this.buildGrandMaritimeCanal();
    this.buildHyperColliderResearchFacility();
  }

  // Deterministic Biome Topography Elevation Engine
  public getTerrainHeight(x: number, z: number): number {
    // -1. Radiator Springs Raceway (X in [168, 238], Z in [-65, -4]): mainland level at Y=1, ocean under pier at Y=0
    if (x >= 168 && x <= 238 && z >= -65 && z <= -4) {
      if (x > 196) {
        return 0; // Ocean water beneath over-water pier track
      }
      return 1; // Solid mainland ground strictly at Y = 1
    }

    // 0. Dubai Coastline, Palm Jumeirah & Arabian Gulf Archipelago Islands (X in [174, 400], Z in [10, 180])
    if (x >= 174 && x <= 400 && z >= 10 && z <= 180) {
      const palmH = this.getPalmJumeirahTerrainHeight(x, z);
      if (palmH > 0) return palmH;
      if (x > 176) return 0; // Turquoise ocean water in Arabian Gulf bay
    }

    const dist = Math.hypot(x, z);
    const coastR = WorldBuilder.getCountryCoastRadius(x, z);

    // Ocean beyond non-uniform continental country coastline
    if (dist > coastR) {
      return 0; // Ocean water at Y = 0
    }
    // Sandy beach shoreline fringe
    if (dist > coastR - 8) {
      return 1; // Sandy beach
    }

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

    // 3.5 North Alpine Snow Mountain Realm (Frostpeak Alps)
    // Organic curved boundary starting north of Z = -76 (valley stays at Y=1)
    const foothillLine = -76 + Math.sin(x * 0.14) * 4 + Math.cos(x * 0.28) * 2;
    if (x >= -48 && x <= 40 && z <= foothillLine) {
      // Respect London Realm at south-west corner of this zone
      if (x <= -20 && z >= -80) {
        if (z >= -54 && z <= -48 && x <= -22 && x >= -44) {
          return 0; // River Thames waterway channel
        }
        return 1;
      }

      // Smooth buffer zone: ground stays at level Y = 1 near the valley intersection
      if (z > foothillLine - 6) {
        return 1;
      }

      // Walkable gently ascending mountain pass along the central road corridor (X in [-4, 4])
      if (Math.abs(x) <= 4 && z >= -108) {
        // Very smooth slope ascending from Y = 1 at Z = -80 up to Y = 8 at Z = -108
        const u = Math.min(1, Math.max(0, (-z - 80) / 28));
        return Math.max(1, Math.round(1 + u * 7));
      }

      // Lake Serenity Glacial Ice Basin at (-2, -115)
      const lakeDist = Math.hypot((x - (-2)) / 12, (z - (-115)) / 10);
      if (lakeDist <= 0.85) {
        return 8; // Level frozen lake surface
      }
      if (lakeDist <= 1.15) {
        const t = (lakeDist - 0.85) / 0.3;
        return Math.round(8 + t * 4);
      }

      // Chalet de Lakshya plinth terrace at (-18, -95)
      if (Math.hypot((x - (-18)) / 8, (z - (-95)) / 7) <= 1) {
        return 8;
      }

      // Twin Majestic Summits & Ridges
      // Summit 1: Frostpeak Mount Lakshya at (-2, -160, summit H=28)
      const dPeak1 = Math.hypot((x - (-2)) / 20, (z - (-160)) / 24);
      let peak1H = 0;
      if (dPeak1 <= 1) {
        peak1H = Math.round(28 * Math.pow(1 - dPeak1, 1.25));
      }

      // Summit 2: Glacier Horn at (24, -145, summit H=24)
      const dPeak2 = Math.hypot((x - 24) / 16, (z - (-145)) / 18);
      let peak2H = 0;
      if (dPeak2 <= 1) {
        peak2H = Math.round(24 * Math.pow(1 - dPeak2, 1.2));
      }

      // Natural mountain massif rising gently from Z = -82 northwards
      const zMassif = Math.min(1, Math.max(0, (-z - 82) / 60));
      const xProfile = Math.max(0, 1 - Math.abs(x) / 44);
      const crags = Math.sin((x + 10) * 0.18) * 1.5 + Math.cos(z * 0.15) * 1.5;
      let massifH = 1 + Math.round(zMassif * (11 + xProfile * 6) + crags);

      let h = Math.max(massifH, Math.max(peak1H, peak2H));

      // Organic side-slopes blending seamlessly into eastern & western borders
      if (x >= 24) {
        const blendE = Math.max(0, (40 - x) / 16);
        h = Math.round(1 + (h - 1) * Math.pow(blendE, 1.2));
      }
      if (x <= -32) {
        const blendW = Math.max(0, (x - (-48)) / 16);
        h = Math.round(1 + (h - 1) * Math.pow(blendW, 1.2));
      }

      return Math.max(1, Math.min(28, h));
    }

    // 4. North-West: China, Tokyo, Seoul Mountain Ridge, London & Zoo
    if (x <= -20 && z <= -18) {
      // London Realm: leveled ground with River Thames waterway channel (Y = 0)
      if (x >= -48 && x <= -20 && z >= -78 && z <= -46) {
        if (z >= -54 && z <= -48 && x <= -22 && x >= -44) {
          return 0; // River Thames waterway channel under Tower Bridge
        }
        return 1;
      }

      // Crossroads Wildlife Park (Grand Safari Valley) & Enchanted Castle Woods at Y = 1
      if (x >= -110 && x <= -22 && z >= -46 && z <= 24) {
        return 1;
      }

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
      // Sunflower Valley & Countryside Farmland (X in [-68, -25], Z in [24, 76])
      if (x >= -68 && x <= -25 && z >= 24 && z <= 76) {
        return 1; // Level fertile agricultural terrace
      }
      // Egypt Nile River Channel (X in [-131, -127], Z in [10, 65])
      if (x >= -131 && x <= -127 && z >= 10 && z <= 65) {
        return 0; // Nile waterway at Y = 0
      }
      // Egypt Giza Plateau & Desert Oasis (X <= -126 && X >= -185 && Z in [10, 65])
      if (x <= -126 && x >= -185 && z >= 10 && z <= 65) {
        return 1; // Level plateau for Pyramids, Sphinx, temples, and Bedouin oasis
      }
      // Mexico City Zócalo Historic Center (X in [-132, -78], Z in [34, 88])
      if (x >= -132 && x <= -78 && z >= 34 && z <= 88) {
        return 1; // Uniform level ground for Zócalo plaza, Cathedral, and Palacio Nacional
      }
      // Surrounding Mexico Canyon Mesa Rim (X in [-140, -70], Z in [26, 94])
      if (x >= -140 && x <= -70 && z >= 26 && z <= 94) {
        return 3; // Natural badlands mesa bluff encircling the valley
      }
      // Chichén Itzá Mesoamerican Sacred Valley (X in [-165, -115], Z in [95, 140])
      if (x >= -165 && x <= -115 && z >= 95 && z <= 140) {
        // Sacred Cenote sinkhole pool at (-120, 125)
        if (Math.hypot(x - (-120), z - 125) <= 5.5) {
          return 0; // Crystal turquoise cenote water
        }
        return 1; // Level terrace for El Castillo pyramid and Mayan courts
      }
      // Rolling desert dunes
      const dune = 1.6 + Math.sin(x * 0.08) * 1.2 + Math.cos(z * 0.08) * 1.0;
      return Math.max(1, Math.min(4, Math.round(dune)));
    }

    // 6. East: USA Realm & Dubai Palm (X in [105, 225], Z in [-80, 68])
    if (x >= 105) {
      // Dubai Coastline & Palm Jumeirah Arabian Gulf Lagoon Bay (X in [174, 225], Z in [14, 70])
      if (x >= 174 && x <= 225 && z >= 14 && z <= 70) {
        return this.getPalmJumeirahTerrainHeight(x, z);
      }
      // Hollywood Hills (Mount Lee & Griffith Observatory north-east ridge)
      if (x >= 140 && x <= 190 && z >= -120 && z <= -80) {
        const hillDist = Math.hypot((x - 165) / 22, (z - (-100)) / 16);
        if (hillDist <= 1) {
          const peak = Math.round(22 * Math.pow(1 - hillDist, 1.1));
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

  // Grand Large-Scale Dubai Archipelago Topography in Arabian Gulf (X in [174, 380], Z in [-80, 165])
  private getPalmJumeirahTerrainHeight(x: number, z: number): number {
    // Strictly isolate Dubai archipelago to Z >= 10: zero overlap with Radiator Springs (Z <= -4)
    if (z < 10) return 0;

    // Dubai mainland and coastal waterfront promenade
    if (x <= 176 && z >= 20 && z <= 64) return 1;

    // 1. The Palm Trunk & Flared Gateway Base (Z = 46)
    if (x >= 176 && x <= 184 && Math.abs(z - 46) <= Math.round(5 - (x - 176) * 0.25)) {
      return 1;
    }
    if (x >= 184 && x <= 235 && Math.abs(z - 46) <= 5) {
      return 1;
    }
    // Crown Fan Hub
    if (x >= 235 && x <= 252 && Math.abs(z - 46) <= 7) {
      return 1;
    }

    // 2. 16 Symmetrical Parametric Curved Fronds (8 Pairs, gracefully fanning within Z in [14, 78])
    const frondDefs = [
      { xRoot: 236, xTip: 288, dz: 30 },
      { xRoot: 238, xTip: 292, dz: 26 },
      { xRoot: 240, xTip: 296, dz: 22 },
      { xRoot: 242, xTip: 300, dz: 18 },
      { xRoot: 244, xTip: 302, dz: 14 },
      { xRoot: 246, xTip: 302, dz: 11 },
      { xRoot: 248, xTip: 298, dz: 8 },
      { xRoot: 250, xTip: 292, dz: 5 }
    ];

    for (const f of frondDefs) {
      if (x >= f.xRoot && x <= f.xTip) {
        const u = (x - f.xRoot) / (f.xTip - f.xRoot);
        const curveOffset = 3 + (f.dz - 3) * Math.pow(u, 1.35);
        const northZ = Math.round(46 - curveOffset);
        const southZ = Math.round(46 + curveOffset);
        if (Math.abs(z - northZ) <= 2 || Math.abs(z - southZ) <= 2) {
          return 1;
        }
        if (x >= f.xTip - 2) {
          if (Math.hypot(x - f.xTip, z - northZ) <= 3 || Math.hypot(x - f.xTip, z - southZ) <= 3) {
            return 1;
          }
        }
      }
    }

    // 3. Atlantis, The Palm Resort Plinth at Crescent Crown
    if (x >= 312 && x <= 334 && z >= 36 && z <= 56) {
      return 1;
    }

    // 4. Detached Outer Crescent Breakwater Barrier Reef Island (Rx = 72, Rz = 34, Center at 252, 46)
    const cd = Math.hypot((x - 252) / 72, (z - 46) / 34);
    if (cd >= 0.94 && cd <= 1.05 && x >= 210) {
      // Natural tidal breach gaps at North (Z in [24, 27]) and South (Z in [65, 68]) for maritime navigation
      const isNorthGap = (z >= 24 && z <= 27 && x >= 222 && x <= 236);
      const isSouthGap = (z >= 65 && z <= 68 && x >= 222 && x <= 236);
      if (!isNorthGap && !isSouthGap) {
        return 1;
      }
    }

    // 5. Burj Al Arab Private Island (Center at 220, 110)
    if (Math.hypot((x - 220) / 10, (z - 110) / 10) <= 1.1) {
      return 1;
    }
    // Curved bridge connecting mainland to Burj Al Arab
    if (x >= 176 && x <= 212) {
      const bridgeU = (x - 176) / (212 - 176);
      const bZ = Math.round(96 + 10 * Math.sin(bridgeU * Math.PI * 0.5));
      if (Math.abs(z - bZ) <= 1) {
        return 1;
      }
    }

    // 6. Bluewaters Island & Ain Dubai (Center at 262, 146)
    if (Math.hypot((x - 262) / 14, (z - 146) / 14) <= 1.0) {
      return 1;
    }
    // Footbridge to Bluewaters
    if (x >= 176 && x <= 248) {
      const bU = (x - 176) / (248 - 176);
      const bZ = Math.round(136 + 10 * bU);
      if (Math.abs(z - bZ) <= 1) {
        return 1;
      }
    }

    // 7. The World Islands Archipelago Cluster (Vast deep Arabian Gulf east of Palm Jumeirah, strictly Z in [18, 80], X in [342, 388])
    // Atoll 1 - The Heart of Europe / Monaco Atoll (360, 46, R = 12)
    if (Math.hypot(x - 360, z - 46) <= 12) return 1;
    // Atoll 2 - Sweden Island (380, 68, R = 10)
    if (Math.hypot(x - 380, z - 68) <= 10) return 1;
    // Atoll 3 - Floating Seahorse Overwater Island (350, 24, R = 9)
    if (Math.hypot(x - 350, z - 24) <= 9) return 1;
    // Atoll 4 - Coral Sandbar Atoll (380, 28, R = 8)
    if (Math.hypot(x - 380, z - 28) <= 8) return 1;

    // Everything else in the bay is crystal turquoise lagoon water at Y = 0
    return 0;
  }

  // 1. Expanded Island Terrain with Organic Topography
  private buildExpandedIslandTerrain() {
    const minX = -260;
    const maxX = 400;
    const minZ = -260;
    const maxZ = 260;

    for (let x = minX; x <= maxX; x++) {
      for (let z = minZ; z <= maxZ; z++) {
        // Bedrock foundation everywhere inside world boundary
        this.setBlock(x, -2, z, 'bedrock');

        const h = this.getTerrainHeight(x, z);

        // Water cells inside the island or open ocean (moat, river, or ocean)
        if (h === 0) {
          const dist = Math.hypot(x, z);
          const isMoat = (dist >= 18 && dist <= 23);
          this.setBlock(x, -1, z, isMoat ? 'stone_bricks' : 'sand');
          this.setBlock(x, 0, z, 'water');
          continue;
        }

        // Solid land cells (H >= 1) - Solid foundation anchored down to Y = -1 above bedrock
        for (let y = -1; y < h; y++) {
          let subType = 'dirt';
          const foothillLine = -76 + Math.sin(x * 0.14) * 4 + Math.cos(x * 0.28) * 2;
          const isAlpineMountain = (x >= -48 && x <= 40 && z <= foothillLine);
          const isSunflowerValley = (x >= -68 && x <= -25 && z >= 24 && z <= 76);

          if (isAlpineMountain) {
            const isLake = (Math.hypot((x - (-2)) / 12, (z - (-115)) / 10) <= 0.85);
            if (isLake && y === h - 1) {
              subType = 'prismarine_bricks';
            } else if (h >= 11 && y >= h - 2) {
              subType = 'snow';
            } else if (h >= 6) {
              subType = (y >= 5) ? 'cobblestone' : 'stone_bricks';
            } else {
              subType = 'dirt';
            }
          } else if (isSunflowerValley) {
            subType = 'dirt';
          } else if (x >= 20 && z <= -35) {
            subType = (y >= h - 2) ? 'dirt' : 'stone_bricks'; // Natural soil beneath grass
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
        const coastR = WorldBuilder.getCountryCoastRadius(x, z);
        const foothillLine = -76 + Math.sin(x * 0.14) * 4 + Math.cos(x * 0.28) * 2;
        const isAlpineMountain = (x >= -48 && x <= 40 && z <= foothillLine);
        const isSunflowerValley = (x >= -68 && x <= -25 && z >= 24 && z <= 76);
        const tNoise = Math.abs(Math.sin(x * 12.9898 + z * 78.233) * 43758.5453) % 1;

        if (isAlpineMountain) {
          const isLake = (Math.hypot((x - (-2)) / 12, (z - (-115)) / 10) <= 0.85);
          if (isLake) {
            topType = 'ice';
          } else if (h >= 11) {
            // High summits and ridges: pure glistening snow cap
            topType = 'snow';
          } else if (h >= 8 && z <= -90) {
            // Cold mountain highlands & Lake Serenity rim: frosted snow grass & mossy rocks
            topType = (tNoise < 0.25) ? 'mossy_stone_bricks' : (tNoise < 0.45) ? 'cobblestone' : 'snow_grass';
          } else if (h >= 5 && z <= -84) {
            // Subalpine rocky foothills: natural mountain grass with weathered rocks & gravel
            topType = (tNoise < 0.2) ? 'cobblestone' : (tNoise < 0.35) ? 'mossy_stone_bricks' : 'grass';
          } else {
            // Lower foothills and intersection valley (Z > -84 or H < 5): 100% natural lush green grass!
            topType = 'grass';
          }
        } else if (isSunflowerValley) {
          topType = 'grass';
        } else if (dist < 18) {
          topType = (dist < 4) ? 'quartz_block' : (Math.abs(x) <= 1 || Math.abs(z) <= 1) ? 'smooth_stone' : 'stone_bricks';
        } else if (dist > coastR - 8) {
          // Perimeter coastal beach
          topType = 'sand';
        } else if (x >= 168 && x <= 235 && z >= -62 && z <= -4) {
          // Radiator Springs Raceway & Willy's Butte desert infield
          topType = 'terracotta_adobe';
        } else if (x <= -20 && z <= -35) {
          // China
          topType = (h >= 7) ? (tNoise < 0.35 ? 'mossy_stone_bricks' : 'stone_bricks') : 'grass';
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
            topType = 'grass';
          }
        } else if (x >= 174 && x <= 400 && z >= -80 && z <= 165) {
          // Dubai Palm Jumeirah & Arabian Gulf Archipelago Islands coastal sands
          topType = 'sand';
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

    // North Road approaching Grand Nexus Plaza (Z = -24 to -48, X in [-2, 2])
    for (let z = -24; z >= -48; z--) {
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

    // Grand North Nexus Plaza (Carrefour du Nord): X in [-9, 9], Z in [-48, -66]
    for (let x = -9; x <= 9; x++) {
      for (let z = -48; z >= -66; z--) {
        const d = Math.hypot(x, z - (-57));
        if (d <= 9) {
          const blk = (d <= 2) ? 'quartz_block' : (d <= 5) ? 'smooth_stone' : (d <= 8) ? 'stone_bricks' : 'cobblestone';
          this.setBlock(x, 1, z, blk);
        }
      }
    }

    // Central Monumental Compass Obelisk at (0, 1, -57)
    for (let dx = -1; dx <= 1; dx++) {
      for (let dz = -1; dz <= 1; dz++) {
        this.setBlock(dx, 1, -57 + dz, 'quartz_block');
      }
    }
    this.setBlock(0, 2, -57, 'quartz_pillar');
    this.setBlock(0, 3, -57, 'sea_lantern');
    this.setBlock(0, 4, -57, 'glowstone');

    // 4 Directional Milestone Waymarker signs on the obelisk
    this.setBlock(0, 2, -58, 'smooth_stone', {
      type: 'sign',
      title: 'North: Frostpeak Alps ➔ 🏔️',
      text: 'Scenic Pine Foothills ➔ Mountain Trail ➔ Chalet de Lakshya ➔ Lake Serenity ➔ Summit Observatory.'
    });
    this.setBlock(1, 2, -57, 'smooth_stone', {
      type: 'sign',
      title: 'East: Paris & Imperial India ➔ 🇫🇷🇮🇳',
      text: 'Avenue des Champs-Élysées ➔ Eiffel Tower ➔ Grand Causeway ➔ Taj Mahal & Yamuna River Plains.'
    });
    this.setBlock(-1, 2, -57, 'smooth_stone', {
      type: 'sign',
      title: 'West: London & Imperial China ➔ 🇬🇧🇨🇳',
      text: 'Westminster Avenue ➔ Big Ben ➔ Tower Bridge ➔ Imperial Road ➔ Great Wall & Dragon Pagoda.'
    });
    this.setBlock(0, 2, -56, 'smooth_stone', {
      type: 'sign',
      title: 'South: Crossroads Citadel ➔ 🏰',
      text: 'Central Nexus Plaza ➔ Spawn Beacon ➔ South Coast Beach Pier ➔ Neo York & International Airport.'
    });

    // Plaza Perimeter Victorian streetlamps & boxwood planters
    for (const [lx, lz] of [[-7, -51], [7, -51], [-7, -63], [7, -63]]) {
      this.setBlock(lx, 1, lz, 'stone_bricks');
      this.setBlock(lx, 2, lz, 'iron_block');
      this.setBlock(lx, 3, lz, 'lantern');
      this.setBlock(lx + 1, 1, lz, 'oak_leaves');
      this.setBlock(lx - 1, 1, lz, 'oak_leaves');
    }

    // Mountain Meltwater Brook flowing along eastern flank (X = 6 to 8)
    for (let z = -48; z >= -78; z--) {
      this.setBlock(7, 0, z, 'cobblestone');
      this.setBlock(7, 1, z, 'water');
      this.setBlock(6, 1, z, 'stone_bricks');
      this.setBlock(8, 1, z, 'mossy_stone_bricks');
    }
    // Arched stone footbridge crossing the brook at Z in [-55, -59]
    for (let z = -55; z >= -59; z--) {
      for (let x = 6; x <= 8; x++) {
        this.setBlock(x, 2, z, 'stone_bricks');
      }
      this.setBlock(6, 3, z, 'oak_fence');
      this.setBlock(8, 3, z, 'oak_fence');
    }

    // Grand Pine Avenue continuing north from the Plaza into the foothills (Z = -66 to -82, X in [-3, 3])
    for (let z = -66; z >= -82; z--) {
      for (let x = -3; x <= 3; x++) {
        const blk = (Math.abs(x) === 3) ? 'stone_bricks' : (z % 2 === 0) ? 'cobblestone' : 'smooth_stone';
        this.setBlock(x, 1, z, blk);
      }
      if (Math.abs(z) % 6 === 0) {
        this.setBlock(-4, 1, z, 'stone_bricks');
        this.setBlock(-4, 2, z, 'spruce_log');
        this.setBlock(-4, 3, z, 'lantern');
        this.setBlock(4, 1, z, 'stone_bricks');
        this.setBlock(4, 2, z, 'spruce_log');
        this.setBlock(4, 3, z, 'lantern');
      }
    }

    // Alpine Trailhead Waystation & Ranger Outpost at (9, 1, -72)
    const wsX = 9;
    const wsZ = -72;
    for (let dx = -2; dx <= 2; dx++) {
      for (let dz = -2; dz <= 2; dz++) {
        this.setBlock(wsX + dx, 1, wsZ + dz, 'spruce_log');
        const isWall = (Math.abs(dx) === 2 || Math.abs(dz) === 2);
        if (isWall) {
          this.setBlock(wsX + dx, 2, wsZ + dz, (dx === -2 && dz === 0) ? 'oak_planks' : 'spruce_log');
          this.setBlock(wsX + dx, 3, wsZ + dz, 'spruce_log');
        }
        this.setBlock(wsX + dx, 4, wsZ + dz, 'oak_planks'); // Roof
      }
    }
    this.setBlock(wsX, 2, wsZ, 'bookshelf');
    this.setBlock(wsX, 3, wsZ, 'lantern');
    this.setBlock(wsX - 2, 2, wsZ + 1, 'oak_planks'); // Bench
    this.setBlock(wsX - 2, 2, wsZ - 1, 'oak_planks');
    this.setBlock(wsX - 3, 2, wsZ, 'glowstone', {
      type: 'sign',
      title: 'Frostpeak Alps · Trailhead Waystation 🌲',
      text: 'Official trailhead of the Northern Alpine Reserve. Altitude 1m. Follow the stone path north into the subalpine pine woods and mountain peaks.'
    });

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

    // Grand West Safari Avenue to Crossroads Wildlife Park & Zoo (From West Bridge (-24, 0) straight West to Zoo Entrance (-38, 0))
    for (let x = -24; x >= -38; x--) {
      const gy = this.getTerrainHeight(x, 0);
      for (let dz = -2; dz <= 2; dz++) {
        this.setBlock(x, gy, dz, (Math.abs(dz) === 2) ? 'stone_bricks' : 'smooth_stone');
      }
      if (Math.abs(x) % 4 === 0) {
        this.setBlock(x, gy + 1, -3, 'oak_log');
        this.setBlock(x, gy + 2, -3, 'oak_fence');
        this.setBlock(x, gy + 3, -3, 'lantern');
        this.setBlock(x, gy + 1, 3, 'oak_log');
        this.setBlock(x, gy + 2, 3, 'oak_fence');
        this.setBlock(x, gy + 3, 3, 'lantern');
      }
    }

    // Fairytale Woodland Path from West Road to Rapunzel's Castle (From (-26, -2) to (-68, -32))
    for (let step = 0; step <= 28; step++) {
      const u = step / 28;
      const px = Math.round(-26 + (-68 - (-26)) * u);
      const pz = Math.round(-2 + (-32 - (-2)) * u);
      const gy = this.getTerrainHeight(px, pz);
      for (let dx = -1; dx <= 1; dx++) {
        this.setBlock(px + dx, gy, pz, (step % 2 === 0) ? 'mossy_stone_bricks' : 'stone_bricks');
      }
      if (step % 5 === 0) {
        this.setBlock(px - 2, gy + 1, pz, 'oak_fence');
        this.setBlock(px - 2, gy + 2, pz, 'lantern');
      }
    }

    // Scenic Mountain Steps connecting Zoo North (-65, -20) to Rapunzel's Castle Garden (-68, -30)
    for (let z = -20; z >= -30; z--) {
      const x = Math.round(-65 + (-68 - (-65)) * (( -20 - z) / 10));
      const gy = this.getTerrainHeight(x, z);
      this.setBlock(x, gy, z, 'stone_bricks');
      this.setBlock(x + 1, gy, z, 'stone_bricks');
      this.setBlock(x - 1, gy, z, 'mossy_stone_bricks');
      if (Math.abs(z) % 3 === 0) {
        this.setBlock(x + 2, gy + 1, z, 'lantern');
      }
    }

    // Southwest Camino Real to Mexico City & Aztec Pyramid (From (-26, 2) curving past Safari south border to (-79, 50))
    for (let step = 0; step <= 29; step++) {
      const px = Math.round(-26 - step * 1.83);
      const pz = Math.round(2 + step * 1.66);
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

    // B. Eastern Parkway Arc: Marina (140, -115) -> Hollywood (165, -100) -> Vegas Strip (140, -54) -> Lak Tower (150, 0) -> Dubai (160, 42) -> Airport (130, 80) -> Pier (35, 125)
    const eastWaypoints: [number, number][] = [
      [140, -115], [165, -100], [140, -54], [150, 0], [160, 42], [130, 80], [35, 125]
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
      text: '• Imperial India & Taj Mahal (80, -135)\n• USA & Times Square (100, 0)\n• Hollywood Sign & Hills (165, -100)\n• Dubai Burj Khalifa (170, 42)\n• International Airport (130, 80)'
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
    // 1. India 🇮🇳 (Official Tiranga: Deep Kesari Saffron, Silk White with single centered 24-spoke Navy Ashoka Chakra, India Green)
    this.buildFlagpole(6, -14, 'Republic of India 🇮🇳', 'Tiranga · Top band Saffron (Courage & Sacrifice), Middle band White (Peace & Truth) with single centered Navy Blue 24-Spoke Ashoka Chakra, and Bottom band India Green (Prosperity & Faith).', [
      ['indian_saffron', 'indian_saffron', 'indian_saffron', 'indian_saffron', 'indian_saffron'],
      ['quartz_block', 'quartz_block', 'ashoka_chakra', 'quartz_block', 'quartz_block'],
      ['indian_green', 'indian_green', 'indian_green', 'indian_green', 'indian_green']
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

  // Authentic 3D Country Flags Erected in Each Specific Realm
  private buildRealmCountryFlags() {
    // 1. India 🇮🇳 (Imperial India & Taj Mahal Realm)
    this.buildFlagpole(80, -118, 'Republic of India 🇮🇳 · National Flag', 'Official Tiranga: Deep Kesari Saffron (top), Silk White with single centered 24-spoke Navy Ashoka Chakra, and India Green (bottom). Erected in the Imperial India & Taj Mahal Realm.', [
      ['indian_saffron', 'indian_saffron', 'indian_saffron', 'indian_saffron', 'indian_saffron'],
      ['quartz_block', 'quartz_block', 'ashoka_chakra', 'quartz_block', 'quartz_block'],
      ['indian_green', 'indian_green', 'indian_green', 'indian_green', 'indian_green']
    ], 'east');

    // 2. USA 🇺🇸 (Las Vegas Boulevard in front of Hollywood & LK Tower)
    this.buildFlagpole(138, -46, 'United States of America 🇺🇸 · Stars and Stripes', 'Old Glory: 50 stars on navy canton, 13 alternating red and white stripes. Erected on the Las Vegas Boulevard in front of Hollywood & LK Tower.', [
      ['lapis_block', 'gold_block', 'redstone_block', 'quartz_block', 'redstone_block'],
      ['lapis_block', 'lapis_block', 'quartz_block', 'redstone_block', 'quartz_block'],
      ['redstone_block', 'quartz_block', 'redstone_block', 'quartz_block', 'redstone_block']
    ], 'east');

    // 3. United Kingdom 🇬🇧 (London Realm near Big Ben & Tower Bridge)
    this.buildFlagpole(-34, -58, 'United Kingdom 🇬🇧 · Union Flag', 'Union Jack: Heraldic combination of the Crosses of St. George (England), St. Andrew (Scotland), and St. Patrick (Ireland). Erected in the London Realm by Big Ben.', [
      ['lapis_block', 'quartz_block', 'redstone_block', 'lapis_block'],
      ['redstone_block', 'redstone_block', 'redstone_block', 'redstone_block'],
      ['lapis_block', 'quartz_block', 'redstone_block', 'lapis_block']
    ], 'west');

    // 4. France 🇫🇷 (Paris District facing Eiffel Tower)
    this.buildFlagpole(26, -28, 'French Republic 🇫🇷 · Le Drapeau Tricolore', 'Tricolour: Vertical bands of Bleu, Blanc, Rouge representing Liberty, Equality, and Fraternity. Erected in the Paris District facing the Eiffel Tower.', [
      ['lapis_block', 'quartz_block', 'quartz_block', 'redstone_block'],
      ['lapis_block', 'quartz_block', 'quartz_block', 'redstone_block'],
      ['lapis_block', 'quartz_block', 'quartz_block', 'redstone_block']
    ], 'east');

    // 5. Japan 🇯🇵 (Tokyo Shibuya Realm near Scramble Crossing)
    this.buildFlagpole(-153, -73, 'Japan 🇯🇵 · Nisshōki / Hinomaru', 'Land of the Rising Sun: Pure white silk field with central crimson sun disc. Erected in the Tokyo Shibuya Realm near Scramble Crossing.', [
      ['quartz_block', 'quartz_block', 'quartz_block', 'quartz_block'],
      ['quartz_block', 'redstone_block', 'redstone_block', 'quartz_block'],
      ['quartz_block', 'quartz_block', 'quartz_block', 'quartz_block']
    ], 'west');

    // 6. South Korea 🇰🇷 (Seoul Realm near Gwanghwamun Palace)
    this.buildFlagpole(-65, -86, 'Republic of Korea 🇰🇷 · Taegeukgi', 'Taegeukgi: White background of peace, central red and blue Taegeuk yin-yang circle, and four black Kwae trigrams. Erected in the Seoul Realm near Gwanghwamun Palace.', [
      ['coal_block', 'quartz_block', 'quartz_block', 'coal_block'],
      ['quartz_block', 'redstone_block', 'lapis_block', 'quartz_block'],
      ['coal_block', 'quartz_block', 'quartz_block', 'coal_block']
    ], 'west');

    // 7. China 🇨🇳 (China Realm by Great Wall & Dragon Pagoda)
    this.buildFlagpole(-108, -98, 'People\'s Republic of China 🇨🇳 · Five-Star Red Flag', 'Five-Star Red Flag: Vermilion red field with five golden stars. Erected in the China Realm by the Great Wall and Dragon Pagoda.', [
      ['red_terracotta', 'gold_block', 'red_terracotta', 'red_terracotta'],
      ['red_terracotta', 'gold_block', 'gold_block', 'red_terracotta'],
      ['red_terracotta', 'red_terracotta', 'red_terracotta', 'red_terracotta']
    ], 'west');

    // 8. Egypt 🇪🇬 (Giza Pyramids Realm near Great Sphinx)
    this.buildFlagpole(-150, 44, 'Arab Republic of Egypt 🇪🇬 · Egyptian Tricolour', 'Egyptian Tricolour: Horizontal bands of Red, White charged with the Golden Eagle of Saladin, and Black. Erected in the Giza Pyramids Realm near the Great Sphinx.', [
      ['redstone_block', 'redstone_block', 'redstone_block', 'redstone_block'],
      ['quartz_block', 'gold_block', 'gold_block', 'quartz_block'],
      ['coal_block', 'coal_block', 'coal_block', 'coal_block']
    ], 'west');

    // 9. United Arab Emirates 🇦🇪 (Dubai Realm at foot of Burj Khalifa)
    this.buildFlagpole(165, 37, 'United Arab Emirates 🇦🇪 · UAE National Flag', 'Pan-Arab Colors: Vertical red hoist band with horizontal bands of green, white, and black. Erected in the Dubai Realm at the foot of Burj Khalifa.', [
      ['redstone_block', 'emerald_block', 'emerald_block', 'emerald_block'],
      ['redstone_block', 'quartz_block', 'quartz_block', 'quartz_block'],
      ['redstone_block', 'coal_block', 'coal_block', 'coal_block']
    ], 'east');

    // 10. Mexico 🇲🇽 (Mexico Realm near Zócalo & Chichén Itzá)
    this.buildFlagpole(-100, 57, 'United Mexican States 🇲🇽 · Bandera de México', 'Bandera de México: Vertical tricolor of Green (hope), White (unity) with golden Mexican Eagle & Serpent emblem, and Red (heroes). Erected in the Mexico Realm.', [
      ['emerald_block', 'quartz_block', 'quartz_block', 'redstone_block'],
      ['emerald_block', 'gold_block', 'quartz_block', 'redstone_block'],
      ['emerald_block', 'quartz_block', 'quartz_block', 'redstone_block']
    ], 'west');

    // 11. Swiss Confederation 🇨🇭 (Frostpeak Alps by Chalet de Lakshya)
    this.buildFlagpole(-18, -86, 'Swiss Confederation 🇨🇭 · Cross of the Alps', 'White Greek cross on red field, representing alpine freedom, peace, and neutrality. Erected in the Frostpeak Alps at Chalet de Lakshya.', [
      ['redstone_block', 'redstone_block', 'redstone_block', 'redstone_block'],
      ['redstone_block', 'quartz_block', 'quartz_block', 'redstone_block'],
      ['redstone_block', 'redstone_block', 'redstone_block', 'redstone_block']
    ], 'east');
  }

  private buildFlagpole(px: number, pz: number, title: string, desc: string, _pattern?: string[][], _dir?: 'east' | 'west') {
    // Flagpole plinth at ground level (authentic thin steel mast and finial rendered in 3D by FlagManager)
    this.setBlock(px, 1, pz, 'smooth_stone');

    // Interactive Flag Plaque Sign at base
    const signX = px;
    const signZ = (pz <= 0) ? pz + 1 : pz - 1;
    this.setBlock(signX, 2, signZ, 'quartz_block', {
      type: 'sign',
      title: title,
      text: desc
    });
  }

  // Authentic Country Information Kiosks Across All 10 World Realms
  private buildCountryMapKiosks() {
    const kiosks = [
      {
        x: 95, y: 1, z: -4,
        title: 'United States of America 🇺🇸 · Country Info',
        text: 'Capital: Washington, D.C. · 50 States · Area: 9.83M km² · Pop: 335 Million\nMajor Centers: New York, Las Vegas Strip, Los Angeles, Chicago, San Francisco.\nDistrict: USA Metropolis, Las Vegas Mega-Casinos & Hollywood Boulevard.'
      },
      {
        x: 80, y: 1, z: -120,
        title: 'Republic of India 🇮🇳 · Country Info',
        text: 'Capital: New Delhi · 28 States & 8 UTs · Area: 3.28M km² · Pop: 1.43 Billion\nMajor Centers: Chennai (SRMIST), Mumbai, Varanasi, Bengaluru, Hyderabad, Agra.\nDistrict: Imperial India Realm, Taj Mahal & Academic Honors Courtyard.'
      },
      {
        x: -34, y: 1, z: -60,
        title: 'United Kingdom 🇬🇧 · Country Info',
        text: 'Capital: London · England, Scotland, Wales & Northern Ireland · Area: 243K km² · Pop: 68 Million\nMajor Centers: London, Edinburgh, Manchester, Oxford, Cambridge, Cardiff, Belfast.\nDistrict: London Realm, Big Ben Clocktower & Tower Bridge.'
      },
      {
        x: 26, y: 1, z: -30,
        title: 'French Republic 🇫🇷 · Country Info',
        text: 'Capital: Paris · 18 Régions · Area: 643K km² · Pop: 68 Million\nMajor Centers: Paris, Lyon, Marseille, Nice, Toulouse, Bordeaux, Strasbourg.\nDistrict: Paris District, Eiffel Tower & Champ de Mars Gardens.'
      },
      {
        x: -153, y: 1, z: -75,
        title: 'Japan · 日本国 🇯🇵 · Country Info',
        text: 'Capital: Tokyo · 47 Prefectures · Area: 377K km² · Pop: 125 Million\nMajor Islands: Honshu, Hokkaido, Kyushu, Shikoku · Major Centers: Tokyo, Kyoto, Osaka.\nDistrict: Tokyo Shibuya Realm, Scramble Crossing & Bullet Train.'
      },
      {
        x: -65, y: 1, z: -88,
        title: 'Republic of Korea 🇰🇷 · Country Info',
        text: 'Capital: Seoul · 9 Provinces · Area: 100K km² · Pop: 52 Million\nMajor Centers: Seoul, Busan, Incheon, Daegu, Gwangju, Jeju Island.\nDistrict: Seoul Realm, Gwanghwamun Palace & N Seoul Tower.'
      },
      {
        x: -108, y: 1, z: -100,
        title: 'People\'s Republic of China 🇨🇳 · Country Info',
        text: 'Capital: Beijing · 23 Provinces, 5 Regions · Area: 9.60M km² · Pop: 1.41 Billion\nMajor Centers: Beijing, Shanghai, Guangzhou, Shenzhen, Xi\'an, Chengdu.\nDistrict: China Realm, Great Wall Ramparts & Imperial Dragon Pagoda.'
      },
      {
        x: -150, y: 1, z: 42,
        title: 'Arab Republic of Egypt 🇪🇬 · Country Info',
        text: 'Capital: Cairo · 27 Governorates · Area: 1.01M km² · Pop: 110 Million\nKey Geography: River Nile, Delta, Sinai Peninsula, Red Sea · Major Centers: Cairo, Alexandria, Giza, Luxor.\nDistrict: Giza Plateau, Great Pyramids & Sphinx.'
      },
      {
        x: 165, y: 1, z: 35,
        title: 'United Arab Emirates 🇦🇪 · Country Info',
        text: 'Capital: Abu Dhabi · 7 Emirates · Area: 83.6K km² · Pop: 10 Million\nMajor Centers: Dubai, Abu Dhabi, Sharjah, Palm Jumeirah.\nDistrict: Dubai Realm, Burj Khalifa & Palm Lagoon Waterfront.'
      },
      {
        x: -100, y: 1, z: 55,
        title: 'Estados Unidos Mexicanos 🇲🇽 · Country Info',
        text: 'Capital: Mexico City · 31 States & CDMX · Area: 1.97M km² · Pop: 130 Million\nMajor Centers: Mexico City, Guadalajara, Monterrey, Puebla, Cancún, Mérida.\nDistrict: Mexico City Zócalo, Metropolitan Cathedral & Chichén Itzá.'
      }
    ];

    kiosks.forEach(k => {
      const gy = Math.max(1, this.getTerrainHeight(k.x, k.z));

      // Small authentic country info pedestal (compact, neat, leaves paths wide open)
      this.setBlock(k.x, gy, k.z, 'smooth_stone');
      this.setBlock(k.x, gy + 1, k.z, 'quartz_block', {
        type: 'sign',
        title: k.title,
        text: k.text
      });
      this.setBlock(k.x, gy + 2, k.z, 'lantern');
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
    this.buildSakuraTree(-8, 1, -7);
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
    // Symmetrical Aromatic Flowerbeds & Topiary Cypress Pines (placed away from the Indian flag at 6, -14)
    this.buildCypressTree(7, 1, -7);
    this.buildCypressTree(15, 1, -7);
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
      // 3D Fortified Gatehouse spanning Z in [cz - 1, cz + 1], X in [-5, 5]
      for (let dz = -1; dz <= 1; dz++) {
        const gz = cz + dz;
        for (let x = -5; x <= 5; x++) {
          const isArchPassage = Math.abs(x) <= 2;
          const isTower = Math.abs(x) >= 3;

          for (let y = 2; y <= 7; y++) {
            if (isArchPassage) {
              if (y >= 5) {
                // Vaulted ceiling
                this.setBlock(x, y, gz, (y === 5 && Math.abs(x) === 2) ? 'stone_bricks' : 'smooth_stone');
              } else if (dz === 0 && y === 4) {
                // Raised iron portcullis teeth
                this.setBlock(x, y, gz, 'iron_block');
              }
            } else if (isTower) {
              const isCorner = Math.abs(x) === 5 && Math.abs(dz) === 1;
              const isWindow = (y === 4 || y === 6) && Math.abs(x) === 4 && dz === 0;
              this.setBlock(x, y, gz, isWindow ? 'cyber_glass' : isCorner ? 'quartz_pillar' : 'stone_bricks');
            }
          }
        }
      }

      // Flanking Bastion Towers rising to Y = 9 with crenelated battlements at Y = 10
      for (const tx of [-4, 4]) {
        for (let dz = -1; dz <= 1; dz++) {
          for (let dx = -1; dx <= 1; dx++) {
            const bx = tx + dx;
            const bz = cz + dz;
            this.setBlock(bx, 8, bz, 'stone_bricks');
            this.setBlock(bx, 9, bz, (dx === 0 && dz === 0) ? 'gold_block' : 'stone_bricks');
            // Crenelated parapet
            if (Math.abs(dx) === 1 || Math.abs(dz) === 1) {
              if ((dx + dz) % 2 === 0) {
                this.setBlock(bx, 10, bz, 'stone_bricks');
              }
            }
          }
        }
        this.setBlock(tx, 10, cz, 'beacon');
      }

      // Upper connecting rampart walkway at Y = 7 with crenelations at Y = 8
      for (let x = -2; x <= 2; x++) {
        this.setBlock(x, 7, cz, 'smooth_stone');
        this.setBlock(x, 8, cz - 1, (x % 2 === 0) ? 'stone_bricks' : 'iron_block');
        this.setBlock(x, 8, cz + 1, (x % 2 === 0) ? 'stone_bricks' : 'iron_block');
      }
      // Central golden crest & lantern at apex
      this.setBlock(0, 8, cz, 'gold_block');
      this.setBlock(0, 9, cz, 'sea_lantern');
    } else {
      // 3D Fortified Gatehouse spanning X in [cx - 1, cx + 1], Z in [-5, 5]
      for (let dx = -1; dx <= 1; dx++) {
        const gx = cx + dx;
        for (let z = -5; z <= 5; z++) {
          const isArchPassage = Math.abs(z) <= 2;
          const isTower = Math.abs(z) >= 3;

          for (let y = 2; y <= 7; y++) {
            if (isArchPassage) {
              if (y >= 5) {
                this.setBlock(gx, y, z, (y === 5 && Math.abs(z) === 2) ? 'stone_bricks' : 'smooth_stone');
              } else if (dx === 0 && y === 4) {
                this.setBlock(gx, y, z, 'iron_block');
              }
            } else if (isTower) {
              const isCorner = Math.abs(z) === 5 && Math.abs(dx) === 1;
              const isWindow = (y === 4 || y === 6) && Math.abs(z) === 4 && dx === 0;
              this.setBlock(gx, y, z, isWindow ? 'cyber_glass' : isCorner ? 'quartz_pillar' : 'stone_bricks');
            }
          }
        }
      }

      // Flanking Bastion Towers rising to Y = 9 with crenelated battlements at Y = 10
      for (const tz of [-4, 4]) {
        for (let dx = -1; dx <= 1; dx++) {
          for (let dz = -1; dz <= 1; dz++) {
            const bx = cx + dx;
            const bz = tz + dz;
            this.setBlock(bx, 8, bz, 'stone_bricks');
            this.setBlock(bx, 9, bz, (dx === 0 && dz === 0) ? 'gold_block' : 'stone_bricks');
            if (Math.abs(dx) === 1 || Math.abs(dz) === 1) {
              if ((dx + dz) % 2 === 0) {
                this.setBlock(bx, 10, bz, 'stone_bricks');
              }
            }
          }
        }
        this.setBlock(cx, 10, tz, 'beacon');
      }

      // Upper connecting rampart walkway at Y = 7 with crenelations at Y = 8
      for (let z = -2; z <= 2; z++) {
        this.setBlock(cx, 7, z, 'smooth_stone');
        this.setBlock(cx - 1, 8, z, (z % 2 === 0) ? 'stone_bricks' : 'iron_block');
        this.setBlock(cx + 1, 8, z, (z % 2 === 0) ? 'stone_bricks' : 'iron_block');
      }
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

    // Symmetrical Cypress Pines along canal (leaving clear open perimeter around Indian flag at Z = -118)
    for (let z = cz + 20; z <= cz + 62; z += 7) {
      if (Math.abs(z - (-118)) <= 3) continue; // Skip Z = -120 to keep flag sightline completely unobstructed
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

    // H. Classic Green & Yellow Bajaj Auto-Rickshaw (Tuk-Tuk) at (43, 1, -80)
    const rickX = 43;
    const rickZ = -80;
    // 3 Wheels (1 front, 2 rear)
    this.setBlock(rickX + 2, 1, rickZ, 'coal_block'); // Front wheel
    this.setBlock(rickX - 1, 1, rickZ - 1, 'coal_block'); // Rear left wheel
    this.setBlock(rickX - 1, 1, rickZ + 1, 'coal_block'); // Rear right wheel

    // Green Lower Chassis (Y = 2)
    for (let x = rickX - 1; x <= rickX + 1; x++) {
      for (let z = rickZ - 1; z <= rickZ + 1; z++) {
        this.setBlock(x, 2, z, 'emerald_block');
      }
    }
    // Front Nose / Fork
    this.setBlock(rickX + 2, 2, rickZ, 'emerald_block');
    this.setBlock(rickX + 3, 2, rickZ, 'glowstone'); // Headlight

    // Driver Cab & Passenger Seat (Y = 3)
    this.setBlock(rickX - 1, 3, rickZ - 1, 'red_terracotta'); // Passenger seat cushion
    this.setBlock(rickX - 1, 3, rickZ, 'red_terracotta');
    this.setBlock(rickX - 1, 3, rickZ + 1, 'red_terracotta');
    this.setBlock(rickX + 1, 3, rickZ, 'iron_block'); // Handlebars
    this.setBlock(rickX + 1, 3, rickZ - 1, 'redstone_block'); // Mechanical Fare Meter
    this.setBlock(rickX + 2, 3, rickZ, 'cyber_glass'); // Windshield

    // Yellow Canopy Roof (Y = 4)
    for (let x = rickX - 1; x <= rickX + 1; x++) {
      for (let z = rickZ - 1; z <= rickZ + 1; z++) {
        this.setBlock(x, 4, z, 'gold_block');
      }
    }
    this.setBlock(rickX + 2, 4, rickZ, 'gold_block'); // Canopy visor
    this.setBlock(rickX, 4, rickZ, 'lantern'); // Interior roof cabin lamp

    this.setBlock(rickX - 2, 2, rickZ, 'emerald_block', {
      type: 'sign',
      title: 'Bajaj Auto-Rickshaw · Tuk-Tuk 🛺',
      text: '★ MUMBAI 02 ★ Meter Jamgega: The iconic 3-wheeled champion of Indian streets! Agile, unstoppable, and pure nostalgia. Press [E] to honk.'
    });

    // I. ISRO Spaceport & Chandrayaan-3 Lunar South Pole Mission at (115, -85)
    const isroX = 115;
    const isroZ = -85;
    // Reinforced Staged Launch/Test Surface (Y = 1)
    for (let x = isroX - 6; x <= isroX + 6; x++) {
      for (let z = isroZ - 6; z <= isroZ + 6; z++) {
        const isBorder = Math.abs(x - isroX) === 6 || Math.abs(z - isroZ) === 6;
        this.setBlock(x, 1, z, isBorder ? ((x + z) % 2 === 0 ? 'gold_block' : 'coal_block') : 'smooth_stone');
      }
    }

    // Vikram Lunar Lander Module (Centered at isroX, isroZ, Y = 2 to 7)
    // 4 Landing Struts / Shock Absorbing Footpads at corners
    const landerLegs = [
      [isroX - 2, isroZ - 2], [isroX + 2, isroZ - 2],
      [isroX - 2, isroZ + 2], [isroX + 2, isroZ + 2]
    ];
    for (const [lx, lz] of landerLegs) {
      this.setBlock(lx, 2, lz, 'end_stone_bricks');
      this.setBlock(lx, 3, lz, 'iron_block');
    }
    // Main Lander Core with Gold Thermal Insulation Blanket (Y = 3 to 5)
    for (let x = isroX - 1; x <= isroX + 1; x++) {
      for (let z = isroZ - 1; z <= isroZ + 1; z++) {
        for (let y = 3; y <= 5; y++) {
          this.setBlock(x, y, z, 'gold_block');
        }
      }
    }
    // Retrorocket Thruster Nozzle underneath
    this.setBlock(isroX, 2, isroZ, 'magma_block');
    this.setBlock(isroX, 2, isroZ - 1, 'iron_block');
    this.setBlock(isroX, 2, isroZ + 1, 'iron_block');

    // Deployed Solar Panels (East & West Wings at Y = 4)
    this.setBlock(isroX - 2, 4, isroZ, 'lapis_block');
    this.setBlock(isroX - 3, 4, isroZ, 'cyber_glass');
    this.setBlock(isroX + 2, 4, isroZ, 'lapis_block');
    this.setBlock(isroX + 3, 4, isroZ, 'cyber_glass');

    // High-Gain Communication Dish & Nav Cameras at Y = 6 to 7
    this.setBlock(isroX, 6, isroZ, 'quartz_block');
    this.setBlock(isroX, 7, isroZ, 'iron_block');
    this.setBlock(isroX + 1, 6, isroZ, 'glowstone'); // Laser altimeter

    // Tricolor Emblem Insignia on South face of Lander
    this.setBlock(isroX - 1, 4, isroZ + 2, 'indian_saffron');
    this.setBlock(isroX, 4, isroZ + 2, 'quartz_block');
    this.setBlock(isroX + 1, 4, isroZ + 2, 'indian_green');

    // Pragyan Lunar Rover on Ramp (South of Lander)
    // Deployment Ramp
    this.setBlock(isroX, 2, isroZ + 2, 'smooth_stone');
    this.setBlock(isroX, 2, isroZ + 3, 'iron_block');
    // 6-wheeled Pragyan Rover at (isroX, isroZ + 4)
    this.setBlock(isroX - 1, 2, isroZ + 4, 'coal_block'); // Left wheels
    this.setBlock(isroX + 1, 2, isroZ + 4, 'coal_block'); // Right wheels
    this.setBlock(isroX, 2, isroZ + 4, 'gold_block'); // Rover chassis
    this.setBlock(isroX, 3, isroZ + 4, 'lapis_block'); // Solar panel
    this.setBlock(isroX, 3, isroZ + 5, 'sea_lantern'); // NavCam / APXS Spectrometer

    // Mission Control Terminal Plaque
    this.setBlock(isroX, 2, isroZ - 7, 'iron_block', {
      type: 'sign',
      title: 'ISRO Chandrayaan-3 · Shiv Shakti Point 🚀',
      text: 'Historical Lunar South Pole soft landing! Vikram Lander & Pragyan Rover embody India\'s cutting-edge aerospace engineering, deep-space telemetry, and scientific triumph.'
    });

    // J. Jaipur Hawa Mahal (Palace of Winds) at (58, -108) to (58, -98)
    const hawaX = 58;
    // 5-Tiered Rajasthani Rose Sandstone Honeycomb Facade
    for (let z = -108; z <= -98; z++) {
      // Tier 1 Base (Y = 1 to 3)
      for (let y = 1; y <= 3; y++) {
        this.setBlock(hawaX, y, z, 'red_sandstone');
      }
      // Honeycomb Jharokhas (Tier 2: Y = 4 to 6)
      for (let y = 4; y <= 6; y++) {
        const isJharokhaWindow = (z % 2 === 0);
        this.setBlock(hawaX, y, z, isJharokhaWindow ? 'cyber_glass' : 'red_sandstone');
        if (isJharokhaWindow && y === 5) {
          this.setBlock(hawaX - 1, y, z, 'sandstone'); // Projecting oriel balcony
          this.setBlock(hawaX, y, z, 'lantern');
        }
      }
      // Honeycomb Jharokhas (Tier 3: Y = 7 to 9, stepped inward)
      if (z >= -106 && z <= -100) {
        for (let y = 7; y <= 9; y++) {
          const isJharokhaWindow = (z % 2 !== 0);
          this.setBlock(hawaX, y, z, isJharokhaWindow ? 'cyber_glass' : 'red_sandstone');
          if (isJharokhaWindow && y === 8) {
            this.setBlock(hawaX - 1, y, z, 'sandstone');
          }
        }
      }
      // Honeycomb Jharokhas (Tier 4: Y = 10 to 11)
      if (z >= -105 && z <= -101) {
        for (let y = 10; y <= 11; y++) {
          this.setBlock(hawaX, y, z, 'red_sandstone');
        }
      }
      // Tier 5 Top Crown & Kalasam Finials (Y = 12 to 13)
      if (z >= -104 && z <= -102) {
        this.setBlock(hawaX, 12, z, 'red_sandstone');
        this.setBlock(hawaX, 13, z, 'gold_block'); // Golden urn finials
      }
    }
    // Hawa Mahal Plaque
    this.setBlock(hawaX - 2, 2, -103, 'red_sandstone', {
      type: 'sign',
      title: 'Hawa Mahal · Palace of Winds (Jaipur 🌸)',
      text: 'Built in 1799 from pink and red sandstone with 953 honeycombed jharokha lattice windows designed to funnel refreshing royal breezes.'
    });

    // K. India Gate & Amar Jawan Jyoti Memorial Arch at (80, -60)
    const igX = 80;
    const igZ = -60;
    // Monumental Sandstone Pylons & Archway (Y = 1 to 14)
    for (let x = igX - 6; x <= igX + 6; x++) {
      for (let z = igZ - 2; z <= igZ + 2; z++) {
        const isCenterVault = Math.abs(x - igX) <= 2;
        for (let y = 1; y <= 14; y++) {
          if (y <= 9 && isCenterVault) {
            // Open archway passage
            if (y === 1) this.setBlock(x, 1, z, 'red_sandstone'); // Paved arch floor
          } else if (y <= 12) {
            // Arch walls & barrel vault crown
            const isPylonFace = (Math.abs(x - igX) >= 3 || y >= 10);
            if (isPylonFace) {
              const isAccent = (y === 6 || y === 10);
              this.setBlock(x, y, z, isAccent ? 'sandstone' : 'red_sandstone');
            }
          } else {
            // Stepped Attic Cornice (Y = 13 to 14)
            if (Math.abs(x - igX) <= 5) {
              this.setBlock(x, y, z, (y === 14) ? 'sandstone' : 'red_sandstone');
            }
          }
        }
      }
    }
    // Amar Jawan Jyoti (Eternal Flame Cenotaph under archway)
    this.setBlock(igX, 2, igZ, 'obsidian'); // Black marble cenotaph
    this.setBlock(igX, 3, igZ, 'iron_block'); // Inverted bayonet rifle
    this.setBlock(igX, 4, igZ, 'iron_block'); // Soldier's helmet
    // 4 Eternal Flame Braziers
    const flames = [[igX - 1, igZ - 1], [igX + 1, igZ - 1], [igX - 1, igZ + 1], [igX + 1, igZ + 1]];
    for (const [fx, fz] of flames) {
      this.setBlock(fx, 2, fz, 'gold_block');
      this.setBlock(fx, 3, fz, 'magma_block');
      this.setBlock(fx, 4, fz, 'lantern');
    }
    // India Gate Memorial Plaque
    this.setBlock(igX, 2, igZ + 4, 'red_sandstone', {
      type: 'sign',
      title: 'India Gate & Amar Jawan Jyoti 🇮🇳',
      text: 'Monumental 42-meter triumphal arch in New Delhi with the eternal flame commemorating the supreme sacrifice and eternal valor of Indian soldiers.'
    });

    // L. Diwali Festival of Lights, Marigold Garlands & Rangoli Mandala
    // 1. Marigold Floral Swags across Darwaza-i-Rauza Great Gate at Z = -70
    for (let x = cx - 5; x <= cx + 5; x++) {
      this.setBlock(x, 6, -70, (x % 2 === 0) ? 'indian_saffron' : 'gold_block'); // Marigold garland
      if (Math.abs(x - cx) === 3 || Math.abs(x - cx) === 5) {
        this.setBlock(x, 5, -70, 'lantern'); // Hanging Diwali lantern
      }
    }
    // 2. Floating Illuminated Diyas along Yamuna Reflecting Pool & Stepwell Kulam
    for (const dyZ of [-112, -98, -84]) {
      this.setBlock(cx - 2, 2, dyZ, 'glowstone');
      this.setBlock(cx + 2, 2, dyZ, 'glowstone');
    }
    for (const dyZ of [gpZ + 20, gpZ + 24]) {
      this.setBlock(gpX - 2, 1, dyZ, 'glowstone');
      this.setBlock(gpX + 2, 1, dyZ, 'glowstone');
    }
    // 3. Ornate Royal Peacock Rangoli Mandala in Front Courtyard at (80, 1, -73)
    const rangX = 80;
    const rangZ = -73;
    for (let dx = -3; dx <= 3; dx++) {
      for (let dz = -3; dz <= 3; dz++) {
        const d = Math.hypot(dx, dz);
        if (d <= 1.0) {
          this.setBlock(rangX + dx, 1, rangZ + dz, 'gold_block');
        } else if (d <= 2.2) {
          this.setBlock(rangX + dx, 1, rangZ + dz, ((dx + dz) % 2 === 0) ? 'lapis_block' : 'emerald_block');
        } else if (d <= 3.2) {
          this.setBlock(rangX + dx, 1, rangZ + dz, 'red_terracotta');
        }
      }
    }
    this.setBlock(rangX, 2, rangZ, 'sea_lantern');
    this.setBlock(rangX, 2, rangZ + 4, 'gold_block', {
      type: 'sign',
      title: 'Grand Diwali Rangoli Mandala 🪔',
      text: 'Intricate folk art crafted with vibrant colored rice powders, turmeric, and vermillion, celebrating prosperity, light, and new beginnings!'
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
        // Interior ground floor paving at Y = 2
        const isDoorway = x === clockX && (z === clockZ + 2 || z === clockZ + 3);
        const isInterior = Math.abs(x - clockX) <= 1 && Math.abs(z - clockZ) <= 1;
        if (isDoorway || isInterior) {
          this.setBlock(x, 2, z, 'smooth_stone'); // Walkable threshold
        } else {
          this.setBlock(x, 2, z, 'stone_bricks');
        }
      }
    }

    // Main Gothic Tower Shaft (Y = 3 to 28)
    for (let y = 3; y <= 28; y++) {
      for (let x = clockX - 2; x <= clockX + 2; x++) {
        for (let z = clockZ - 2; z <= clockZ + 2; z++) {
          const isCorner = Math.abs(x - clockX) === 2 && Math.abs(z - clockZ) === 2;
          const isWall = Math.abs(x - clockX) === 2 || Math.abs(z - clockZ) === 2;
          const isSouthPortal = (z === clockZ + 2 && x === clockX && y <= 5);

          if (isSouthPortal) {
            // Keep south portal opening clear for entry!
            continue;
          }

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

    // Grand Gothic South Entrance Portal
    this.setBlock(clockX - 1, 3, clockZ + 2, 'quartz_pillar');
    this.setBlock(clockX - 1, 4, clockZ + 2, 'quartz_pillar');
    this.setBlock(clockX + 1, 3, clockZ + 2, 'quartz_pillar');
    this.setBlock(clockX + 1, 4, clockZ + 2, 'quartz_pillar');
    this.setBlock(clockX, 5, clockZ + 2, 'gold_block');
    this.setBlock(clockX - 1, 5, clockZ + 2, 'stone_bricks');
    this.setBlock(clockX + 1, 5, clockZ + 2, 'stone_bricks');
    this.setBlock(clockX - 1, 4, clockZ + 3, 'lantern');
    this.setBlock(clockX + 1, 4, clockZ + 3, 'lantern');

    // Walkable Spiral Staircase inside Tower Core (Y = 2 to 28)
    // 8 perimeter positions around newel post starting at south portal
    const spiralOffsets = [
      [0, 1],   // Y=2
      [1, 1],   // Y=3
      [1, 0],   // Y=4
      [1, -1],  // Y=5
      [0, -1],  // Y=6
      [-1, -1], // Y=7
      [-1, 0],  // Y=8
      [-1, 1]   // Y=9
    ];
    for (let y = 2; y <= 28; y++) {
      // Central newel column with embedded lighting
      this.setBlock(clockX, y, clockZ, (y % 4 === 0) ? 'sea_lantern' : 'iron_block');

      // Spiral stepping platform along perimeter
      const stepIdx = (y - 2) % spiralOffsets.length;
      const [sx, sz] = spiralOffsets[stepIdx];
      this.setBlock(clockX + sx, y, clockZ + sz, 'oak_planks');
    }

    // Clock Stage (Y = 29 to 33) - 4-sided illuminated clock face
    for (let y = 29; y <= 33; y++) {
      for (let x = clockX - 3; x <= clockX + 3; x++) {
        for (let z = clockZ - 3; z <= clockZ + 3; z++) {
          const isOuterWall = Math.abs(x - clockX) === 3 || Math.abs(z - clockZ) === 3;
          if (isOuterWall) {
            const isCorner = Math.abs(x - clockX) === 3 && Math.abs(z - clockZ) === 3;
            if (isCorner) {
              // Ornate Gothic corner turrets
              this.setBlock(x, y, z, (y === 33) ? 'gold_block' : 'stone_bricks');
            } else if (y >= 30 && y <= 32) {
              // Clock Dial on 4 faces with visible clock hands!
              const isCenterHub = (y === 31) && ((Math.abs(z - clockZ) === 3 && x === clockX) || (Math.abs(x - clockX) === 3 && z === clockZ));
              const isMinuteHand = (y === 32) && ((Math.abs(z - clockZ) === 3 && x === clockX) || (Math.abs(x - clockX) === 3 && z === clockZ));
              const isHourHand = (y === 31) && (
                (z === clockZ + 3 && x === clockX + 1) || // South: pointing right
                (z === clockZ - 3 && x === clockX - 1) || // North: pointing right
                (x === clockX + 3 && z === clockZ - 1) || // East: pointing right
                (x === clockX - 3 && z === clockZ + 1)    // West: pointing right
              );

              if (isCenterHub || isMinuteHand || isHourHand) {
                this.setBlock(x, y, z, 'coal_block'); // Wrought iron clock hands
              } else {
                // Opal glowing dial backdrop
                const isInnerGlow = Math.abs(x - clockX) <= 1 && Math.abs(z - clockZ) <= 1;
                this.setBlock(x, y, z, isInnerGlow ? 'sea_lantern' : 'quartz_block');
              }
            } else {
              // Upper & lower gold & stone dial moldings
              this.setBlock(x, y, z, (y === 29 || y === 33) ? 'gold_block' : 'stone_bricks');
            }
          } else if (y === 29) {
            // Floor of Clock Chamber: Keep stair exit OPEN at top of spiral stair!
            // Top of stairs (Y=28) is at [1, 0] so leave [1, 0] and [1, 1] clear!
            const isStairHatch = (x === clockX + 1 && (z === clockZ || z === clockZ + 1));
            if (!isStairHatch) {
              this.setBlock(x, 29, z, 'smooth_stone');
            }
          }
        }
      }
    }

    // Great Clockwork Escapement Mechanism in center of Clock Stage
    this.setBlock(clockX, 30, clockZ, 'iron_block');
    this.setBlock(clockX, 31, clockZ, 'gold_block'); // Main gear cog
    this.setBlock(clockX - 1, 31, clockZ, 'redstone_block');
    this.setBlock(clockX, 31, clockZ - 1, 'redstone_block');
    this.setBlock(clockX, 32, clockZ, 'iron_block'); // Escapement anchor

    // Clock Interior Illumination
    for (let y = 30; y <= 32; y++) {
      this.setBlock(clockX, y, clockZ - 2, 'glowstone');
      this.setBlock(clockX - 2, y, clockZ, 'glowstone');
    }

    // Walkable Stairway connection from Clock Stage (Y=29) to Belfry Chamber (Y=34)
    for (let sy = 30; sy <= 33; sy++) {
      const sox = -1 + (sy - 30);
      this.setBlock(clockX - 1, sy, clockZ + sox - 1, 'oak_planks');
    }

    // Belfry Chamber with open Gothic colonnade & the Great Bell (Y = 34 to 38)
    for (let x = clockX - 2; x <= clockX + 2; x++) {
      for (let z = clockZ - 2; z <= clockZ + 2; z++) {
        // Belfry viewing floor: Leave stair exit hatch open at (clockX - 1, clockZ + 2)
        const isBelfryStairHatch = (x === clockX - 1 && z >= clockZ + 1);
        if (!isBelfryStairHatch) {
          this.setBlock(x, 34, z, 'stone_bricks');
        }
        // Belfry ceiling / spire base
        this.setBlock(x, 38, z, 'stone_bricks');
      }
    }

    for (let y = 35; y <= 37; y++) {
      for (let x = clockX - 2; x <= clockX + 2; x++) {
        for (let z = clockZ - 2; z <= clockZ + 2; z++) {
          const isCorner = Math.abs(x - clockX) === 2 && Math.abs(z - clockZ) === 2;
          if (isCorner) {
            this.setBlock(x, y, z, 'quartz_pillar');
          } else if (Math.abs(x - clockX) === 2 || Math.abs(z - clockZ) === 2) {
            // Low balustrade at Y=35, open panoramic viewing gallery at Y=36..37
            if (y === 35) {
              this.setBlock(x, y, z, 'stone_bricks');
            }
          }
        }
      }
    }

    // 4 Iconic Gothic Corner Pinnacles of Elizabeth Tower (Y = 34 to 43)
    const towerCorners = [
      [clockX - 3, clockZ - 3], [clockX + 3, clockZ - 3],
      [clockX - 3, clockZ + 3], [clockX + 3, clockZ + 3]
    ];
    for (const [tcx, tcz] of towerCorners) {
      for (let y = 34; y <= 38; y++) {
        this.setBlock(tcx, y, tcz, 'stone_bricks');
      }
      for (let y = 39; y <= 41; y++) {
        this.setBlock(tcx, y, tcz, 'quartz_pillar');
      }
      this.setBlock(tcx, 42, tcz, 'lantern');
      this.setBlock(tcx, 43, tcz, 'gold_block'); // Gold pinnacle finial
    }

    // Great Bell ("Big Ben") in center of Belfry
    this.setBlock(clockX, 38, clockZ, 'iron_block'); // Overhead mounting beam
    this.setBlock(clockX, 37, clockZ, 'gold_block'); // Crown of bell
    this.setBlock(clockX, 36, clockZ, 'gold_block'); // Waist of bell
    this.setBlock(clockX - 1, 36, clockZ, 'gold_block'); // Skirt
    this.setBlock(clockX + 1, 36, clockZ, 'gold_block'); // Skirt
    this.setBlock(clockX, 36, clockZ - 1, 'gold_block'); // Skirt
    this.setBlock(clockX, 36, clockZ + 1, 'gold_block'); // Skirt
    this.setBlock(clockX, 35, clockZ, 'iron_block'); // Clapper

    // Interactive Great Bell Sign (triggers authentic Westminster chime!)
    this.setBlock(clockX, 35, clockZ - 1, 'stone_bricks', {
      type: 'sign',
      title: 'The Great Bell · Big Ben 🔔',
      text: 'Westminster Great Bell cast in 1858 at Whitechapel Bell Foundry. Weighs 13.7 tonnes and chimes the iconic E-natural note across London! [Click to chime Big Ben]'
    });

    // Authentic Gothic Slate & Copper Steeple (Y = 39 to 50)
    // Tier 1: 5x5 Base with Gold Gables (Y = 39 to 40)
    for (let y = 39; y <= 40; y++) {
      for (let dx = -2; dx <= 2; dx++) {
        for (let dz = -2; dz <= 2; dz++) {
          const isEdge = Math.abs(dx) === 2 || Math.abs(dz) === 2;
          this.setBlock(clockX + dx, y, clockZ + dz, isEdge ? 'prismarine_bricks' : 'smooth_stone');
        }
      }
    }
    // Tier 2: 3x3 Steeple Shaft with Gilded Dormers (Y = 41 to 43)
    for (let y = 41; y <= 43; y++) {
      for (let dx = -1; dx <= 1; dx++) {
        for (let dz = -1; dz <= 1; dz++) {
          const isGable = Math.abs(dx) + Math.abs(dz) === 1 && y === 42;
          this.setBlock(clockX + dx, y, clockZ + dz, isGable ? 'gold_block' : 'prismarine_bricks');
        }
      }
    }
    // Tier 3: Slender Spire Needle (Y = 44 to 47)
    for (let y = 44; y <= 47; y++) {
      this.setBlock(clockX, y, clockZ, (y % 2 === 0) ? 'gold_block' : 'quartz_pillar');
    }
    // Tier 4: Ayrton Lantern & Beacon (Y = 48)
    this.setBlock(clockX, 48, clockZ, 'beacon');
    // Tier 5: Gilded Crown Finial Cross (Y = 49 to 50)
    this.setBlock(clockX, 49, clockZ, 'gold_block');
    this.setBlock(clockX, 50, clockZ, 'gold_block');

    // Elizabeth Tower Ground Entrance Sign
    this.setBlock(clockX, 2, clockZ + 4, 'stone_bricks', {
      type: 'sign',
      title: 'Big Ben · Elizabeth Tower 🇬🇧',
      text: 'Historic 96m Gothic landmark of the Palace of Westminster overlooking the River Thames.\n\nClimb the interior spiral staircase up to the Clockwork Chamber and the Belfry to hear the Westminster Chimes!'
    });

    // 2. River Thames Waterway & Tower Bridge (X in [-44, -20], Z in [-55, -47])
    // River Thames channel bed and flowing water (Y = 0)
    for (let x = -44; x <= -20; x++) {
      for (let z = -54; z <= -48; z++) {
        this.setBlock(x, -1, z, 'sand');
        this.setBlock(x, 0, z, 'water');
      }
      // Victoria & Southwark Embankment retaining walls (Y = 1 to 2)
      this.setBlock(x, 1, -55, 'stone_bricks');
      this.setBlock(x, 2, -55, 'smooth_stone');
      this.setBlock(x, 1, -47, 'stone_bricks');
      this.setBlock(x, 2, -47, 'smooth_stone');
    }

    // Tower Bridge twin gothic stone towers
    // West Tower at (-38, -51), East Tower at (-26, -51)
    for (const tx of [-38, -26]) {
      // River Pier Base (rising from riverbed Y=-1 to Y=3)
      for (let x = tx - 2; x <= tx + 2; x++) {
        for (let z = -53; z <= -49; z++) {
          for (let y = 1; y <= 3; y++) {
            this.setBlock(x, y, z, 'stone_bricks');
          }
        }
      }
      // Twin Gothic Turrets rising to Y = 17
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

    // High-Level Glass Walkways between towers at Y = 15 and Y = 16
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

    // Roadway bascules at Y = 3 spanning between towers across the Thames
    for (let x = -42; x <= -22; x++) {
      for (let z = -52; z <= -50; z++) {
        this.setBlock(x, 3, z, (z === -51 && x % 4 === 0) ? 'smooth_stone' : 'asphalt_road');
      }
      this.setBlock(x, 4, -53, 'iron_block');
      this.setBlock(x, 4, -49, 'iron_block');
    }

    this.setBlock(-32, 4, -49, 'stone_bricks', {
      type: 'sign',
      title: 'Tower Bridge · River Thames',
      text: 'Iconic Victorian Gothic suspension and bascule bridge completed in 1894. Spans across the River Thames with 65-meter towers and high-level walkways.'
    });

    // 3. Classic Red Double-Decker Routemaster Bus at (-26, 1, -70)
    const busX = -26;
    const busZ = -70;

    // Heavy duty rubber tires (4 wheels at Y = 1)
    for (const [wx, wz] of [[busX - 2, busZ - 1], [busX + 2, busZ - 1], [busX - 2, busZ + 1], [busX + 2, busZ + 1]]) {
      this.setBlock(wx, 1, wz, 'coal_block');
    }

    // Lower Deck (Y = 1 to 2)
    for (let x = busX - 3; x <= busX + 3; x++) {
      for (let z = busZ - 1; z <= busZ + 1; z++) {
        // Floor at Y = 1
        this.setBlock(x, 1, z, 'red_terracotta');

        // Lower deck body & windows at Y = 2
        const isSide = Math.abs(z - busZ) === 1;
        const isRearEntry = (x === busX + 3 && z === busZ + 1);
        const isFrontWindshield = (x === busX - 3);

        if (isRearEntry) {
          this.setBlock(x, 2, z, 'smooth_stone'); // Open hop-on platform
        } else if (isFrontWindshield) {
          this.setBlock(x, 2, z, 'cyber_glass');
        } else if (isSide) {
          // Glass passenger windows
          this.setBlock(x, 2, z, (Math.abs(x - busX) <= 2) ? 'cyber_glass' : 'red_terracotta');
        } else {
          // Center aisle and seats
          this.setBlock(x, 2, z, (Math.abs(x - busX) <= 1) ? 'oak_planks' : 'smooth_stone');
        }
      }
    }

    // Upper Deck (Y = 3 to 4)
    for (let x = busX - 3; x <= busX + 3; x++) {
      for (let z = busZ - 1; z <= busZ + 1; z++) {
        const isSide = Math.abs(z - busZ) === 1;
        const isEnd = (x === busX - 3 || x === busX + 3);

        // Upper deck panoramic glazing
        if (isSide || isEnd) {
          this.setBlock(x, 3, z, 'cyber_glass');
        } else {
          this.setBlock(x, 3, z, 'oak_planks');
        }

        // Roof at Y = 4
        this.setBlock(x, 4, z, 'red_terracotta');
      }
    }

    // Headlights, Grille & Tail Lights
    this.setBlock(busX - 3, 1, busZ, 'iron_block'); // Chrome grille
    this.setBlock(busX - 3, 1, busZ - 1, 'glowstone'); // Left headlight
    this.setBlock(busX - 3, 1, busZ + 1, 'glowstone'); // Right headlight
    this.setBlock(busX + 3, 1, busZ - 1, 'redstone_block'); // Left taillight
    this.setBlock(busX + 3, 1, busZ + 1, 'redstone_block'); // Right taillight

    // Route 159 Heritage Destination Display Sign
    this.setBlock(busX - 3, 3, busZ, 'gold_block', {
      type: 'sign',
      title: 'London Routemaster Bus · Route 159',
      text: 'AEC Routemaster (RM 159) · Red London Icon\nRoute: Oxford Circus · Piccadilly · Trafalgar Square · Westminster · Tower Bridge.'
    });

    // 4. Red K2 Telephone Booths at (-28, 1, -64) and (-36, 1, -64)
    for (const phX of [-28, -36]) {
      this.setBlock(phX, 1, -64, 'stone_bricks'); // Base plinth
      this.setBlock(phX, 2, -64, 'red_terracotta'); // Red kiosk frame
      this.setBlock(phX, 3, -64, 'cyber_glass'); // Glazed window panes
      this.setBlock(phX, 4, -64, 'red_terracotta'); // Domed red roof
      this.setBlock(phX, 3, -63, 'lantern'); // Warm interior illumination
      this.setBlock(phX, 2, -63, 'smooth_stone', {
        type: 'sign',
        title: 'K2 Telephone Box ☎️',
        text: 'Classic British General Post Office red telephone kiosk designed by Sir Giles Gilbert Scott in 1924.'
      });
    }

    // Cast Iron Victorian Streetlamps along Westminster Embankment Promenade
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

  // Egypt & Giza Plateau (Three Sandstone Pyramids, Khufu Grand Gallery Tomb, Sphinx & Dream Stele, Nile & Felucca, Luxor Pylon & Obelisks, Bedouin Oasis)
  private buildEgyptGizaRealm() {
    // 1. The Fertile Nile River & Egyptian Felucca Sailboat (X in [-131, -127], Z in [10, 65])
    for (let z = 10; z <= 65; z++) {
      for (let x = -131; x <= -127; x++) {
        this.setBlock(x, 0, z, 'water');
      }
      // Fertile green riverbanks with papyrus & reed vegetation
      this.setBlock(-132, 1, z, 'grass');
      this.setBlock(-126, 1, z, 'grass');
      if (z % 7 === 0) {
        this.setBlock(-132, 2, z, 'leaves');
        this.setBlock(-126, 2, z, 'leaves');
      }
    }
    // Palm groves along Nile banks
    this.buildPalmTree(-133, 1, 16);
    this.buildPalmTree(-133, 1, 35);
    this.buildPalmTree(-133, 1, 55);
    this.buildPalmTree(-125, 1, 25);
    this.buildPalmTree(-125, 1, 48);

    // Traditional Egyptian Felucca Sailboat floating on the Nile at (-129, 22)
    const felX = -129;
    const felZ = 22;
    // Wooden Hull (Z = 19 to 25, X in [-130, -128])
    for (let z = felZ - 3; z <= felZ + 3; z++) {
      for (let x = felX - 1; x <= felX + 1; x++) {
        const isEnd = (z === felZ - 3 || z === felZ + 3);
        if (isEnd && (x === felX - 1 || x === felX + 1)) continue;
        this.setBlock(x, 0, z, 'oak_planks');
        this.setBlock(x, 1, z, isEnd ? 'smooth_stone' : 'oak_planks');
      }
    }
    // Wooden Mast (Y = 2 to 9)
    for (let y = 2; y <= 9; y++) {
      this.setBlock(felX, y, felZ, 'oak_log');
    }
    // Angled Triangular Lateen White Sail (Y = 3 to 9)
    for (let y = 3; y <= 9; y++) {
      const sailZ = Math.round(felZ - 2 + (y - 3) * 0.7);
      this.setBlock(felX, y, sailZ, 'quartz_block');
      this.setBlock(felX, y, sailZ + 1, 'quartz_block');
    }
    this.setBlock(felX, 2, felZ + 2, 'lantern'); // Stern navigation lantern
    // Felucca Mooring Wooden Pier
    this.setBlock(felX - 2, 1, felZ, 'oak_planks');
    this.setBlock(felX - 3, 1, felZ, 'oak_planks');
    this.setBlock(felX - 4, 1, felZ, 'sandstone');
    this.setBlock(felX - 3, 2, felZ, 'glowstone', {
      type: 'sign',
      title: 'Egyptian Felucca on the Nile ⛵',
      text: 'Traditional wooden sailboat gliding peacefully along the sacred River Nile, lifeline of Egyptian civilization.'
    });

    // 2. Monumental Luxor & Karnak Temple Pylon Gateway & Twin Obelisks at (-136, 36)
    const pylX = -136;
    const pylZ = 36;
    // Twin Sandstone Pylons flanking ceremonial avenue
    for (const [pZStart, pZEnd] of [[pylZ - 8, pylZ - 2], [pylZ + 2, pylZ + 8]]) {
      for (let z = pZStart; z <= pZEnd; z++) {
        for (let x = pylX - 1; x <= pylX + 1; x++) {
          for (let y = 1; y <= 8; y++) {
            const isCornice = (y === 8);
            this.setBlock(x, y, z, isCornice ? 'gold_block' : ((y % 2 === 0) ? 'red_sandstone' : 'sandstone'));
          }
        }
      }
    }
    // High Egyptian Torus Lintel across portal (Y = 6 to 7, Z in [pylZ - 1, pylZ + 1])
    for (let z = pylZ - 1; z <= pylZ + 1; z++) {
      this.setBlock(pylX, 6, z, 'red_sandstone');
      this.setBlock(pylX, 7, z, 'gold_block'); // Winged solar disk
    }
    // Twin Needle Obelisks of Luxor flanking the temple gateway
    for (const obZ of [pylZ - 10, pylZ + 10]) {
      this.setBlock(pylX, 1, obZ, 'smooth_stone'); // Base plinth
      for (let y = 2; y <= 9; y++) {
        this.setBlock(pylX, y, obZ, 'quartz_pillar'); // Sun-carved granite shaft
      }
      this.setBlock(pylX, 10, obZ, 'gold_block'); // Golden Pyramidion cap
      this.setBlock(pylX, 11, obZ, 'sea_lantern'); // Radiance of Ra
    }
    // Portal Braziers
    this.setBlock(pylX + 2, 1, pylZ - 2, 'cauldron');
    this.setBlock(pylX + 2, 2, pylZ - 2, 'lantern');
    this.setBlock(pylX + 2, 1, pylZ + 2, 'cauldron');
    this.setBlock(pylX + 2, 2, pylZ + 2, 'lantern');

    this.setBlock(pylX + 2, 2, pylZ, 'sandstone', {
      type: 'sign',
      title: 'Karnak & Luxor Temple Pylon Gateway 🏛️',
      text: 'Monumental Egyptian gateway flanked by sacred obelisks dedicated to Amun-Ra, marking the entrance from the Nile to the Giza Plateau.'
    });

    // 3. Avenue of Sphinxes (Processional Causeway from Pylon to Plateau)
    for (let x = -148; x <= pylX; x++) {
      this.setBlock(x, 1, pylZ, 'smooth_stone');
      this.setBlock(x, 1, pylZ - 1, 'sandstone');
      this.setBlock(x, 1, pylZ + 1, 'sandstone');
    }
    // 4 Miniature Ram-headed Sphinx Statues lining causeway
    for (const [asx, asz] of [[-140, pylZ - 3], [-144, pylZ - 3], [-140, pylZ + 3], [-144, pylZ + 3]]) {
      this.setBlock(asx, 1, asz, 'sandstone');
      this.setBlock(asx, 2, asz, 'sandstone');
      this.setBlock(asx - 1, 2, asz, 'gold_block'); // Head
      this.setBlock(asx, 3, asz, 'lantern');
    }

    // 4. Monumental Great Sphinx of Giza at (-152, 26) Facing East
    const spX = -152;
    const spZ = 26;
    // Lion Body (length 14 along X from spX - 7 to spX + 3, width 6 along Z, height 4)
    for (let x = spX - 7; x <= spX + 3; x++) {
      for (let z = spZ - 2; z <= spZ + 2; z++) {
        for (let y = 1; y <= 4; y++) {
          this.setBlock(x, y, z, (y === 1) ? 'sandstone' : ((x + y) % 3 === 0 ? 'red_sandstone' : 'sandstone'));
        }
      }
    }
    // Outstretched Front Paws facing East (X in [spX + 4, spX + 8])
    for (let x = spX + 4; x <= spX + 8; x++) {
      for (let y = 1; y <= 2; y++) {
        this.setBlock(x, y, spZ - 2, 'sandstone');
        this.setBlock(x, y, spZ + 2, 'sandstone');
      }
    }
    // Dream Stele of Thutmose IV between front paws at (spX + 6, Y = 1 to 4, spZ)
    this.setBlock(spX + 6, 1, spZ, 'red_sandstone');
    this.setBlock(spX + 6, 2, spZ, 'smooth_stone');
    this.setBlock(spX + 6, 3, spZ, 'red_sandstone');
    this.setBlock(spX + 6, 4, spZ, 'gold_block');
    this.setBlock(spX + 7, 2, spZ, 'glowstone', {
      type: 'sign',
      title: 'Dream Stele of Thutmose IV 📜',
      text: 'Ancient granite tablet erected between the Sphinx\'s paws recounting how Prince Thutmose rested in the desert sand and was promised the pharaonic crown by Harmakhis.'
    });

    // Royal Human Head with Nemes Pharaonic Headdress (at spX + 3, Y = 5 to 9)
    for (let y = 5; y <= 8; y++) {
      for (let dx = -1; dx <= 2; dx++) {
        for (let dz = -2; dz <= 2; dz++) {
          const isNemesFlap = (Math.abs(dz) === 2);
          if (isNemesFlap) {
            this.setBlock(spX + 3 + dx, y, spZ + dz, (y % 2 === 0) ? 'lapis_block' : 'gold_block');
          } else {
            this.setBlock(spX + 3 + dx, y, spZ + dz, 'sandstone');
          }
        }
      }
    }
    // Pharaonic Braided Beard, Ceremonial Eyes & Uraeus Cobra Crown
    this.setBlock(spX + 5, 4, spZ, 'gold_block'); // Beard
    this.setBlock(spX + 5, 5, spZ, 'sandstone');
    this.setBlock(spX + 4, 9, spZ, 'gold_block'); // Royal Uraeus Crown
    this.setBlock(spX + 4, 10, spZ, 'redstone_block'); // Cobra Crest

    this.setBlock(spX + 9, 2, spZ, 'sandstone', {
      type: 'sign',
      title: 'The Great Sphinx of Giza · أبو الهول 🦁',
      text: 'Iconic limestone monolith with the recumbent body of a lion and royal head of Pharaoh Khafre, guarding the sacred plateau for 4,500 years.'
    });

    // 5. Great Pyramid of Khufu at (-165, 36) - Grand Gallery & Burial Chamber
    const kx = -165;
    const kz = 36;
    const kBaseHalf = 10; // 21x21 footprint
    const kHeight = 15; // steps from Y = 1 to Y = 16

    // Stepped Pyramid Shell with Grand Interior Corridors
    for (let step = 0; step <= kHeight; step++) {
      const half = kBaseHalf - step;
      const y = 1 + step;
      if (half < 0) break;
      for (let dx = -half; dx <= half; dx++) {
        for (let dz = -half; dz <= half; dz++) {
          const isPerimeter = Math.abs(dx) === half || Math.abs(dz) === half;
          // Hollow interior: Grand Ascending Gallery & King's Chamber!
          const isCorridor = (dx === 0 && dz <= 0 && dz >= -kBaseHalf && y >= 2 && y <= 5);
          const isChamber = (Math.abs(dx) <= 3 && Math.abs(dz) <= 3 && y >= 2 && y <= 6);

          if (isCorridor || isChamber) {
            // Paved Chamber & Corridor Floor
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
    // Solid Golden Pyramidion Capstone at top crowned with beacon beam!
    this.setBlock(kx, 2 + kHeight, kz, 'gold_block');
    this.setBlock(kx, 3 + kHeight, kz, 'beacon');

    // Hollow Interior Pharaoh's Burial Chamber Details at (kx, kz)
    // King's Red Granite Chamber Walls & Lapis Inlays
    this.setBlock(kx, 2, kz, 'gold_block');
    this.setBlock(kx, 3, kz, 'lapis_block');
    this.setBlock(kx - 1, 2, kz, 'chest', {
      type: 'chest',
      title: 'Pharaoh Khufu’s Royal Treasure Chest',
      text: 'Ancient golden sarcophagus treasures, ceremonial lapis lazuli amulets, and royal papyri.'
    });
    // Canopic Sacred Jars (Four Sons of Horus)
    this.setBlock(kx - 2, 2, kz - 2, 'cauldron');
    this.setBlock(kx - 2, 3, kz - 2, 'gold_block');
    this.setBlock(kx + 2, 2, kz - 2, 'cauldron');
    this.setBlock(kx + 2, 3, kz - 2, 'gold_block');
    this.setBlock(kx - 2, 2, kz + 2, 'cauldron');
    this.setBlock(kx - 2, 3, kz + 2, 'gold_block');
    this.setBlock(kx + 2, 2, kz + 2, 'cauldron');
    this.setBlock(kx + 2, 3, kz + 2, 'gold_block');

    // Chamber Torches & Golden Chariot display
    this.setBlock(kx + 2, 2, kz, 'coal_block'); // Chariot wheels
    this.setBlock(kx + 3, 2, kz, 'gold_block');
    this.setBlock(kx + 3, 3, kz, 'lantern');

    // Grand Gallery Ascending Corridor Lighting
    this.setBlock(kx, 4, kz - 4, 'sea_lantern');
    this.setBlock(kx, 4, kz - 8, 'sea_lantern');
    this.setBlock(kx - 1, 3, kz - kBaseHalf + 1, 'lantern');
    this.setBlock(kx + 1, 3, kz - kBaseHalf + 1, 'lantern');

    this.setBlock(kx, 2, kz - kBaseHalf - 1, 'sandstone', {
      type: 'sign',
      title: 'Great Pyramid of Giza · Pyramid of Khufu',
      text: 'Walk inside the torch-lit Grand Gallery to explore the ancient pharaoh\'s burial chamber, golden sarcophagus, and sacred canopic jars.'
    });

    // 6. Pyramid of Khafre at (-148, 48) - 15x15 base with preserved casing peak
    const kfX = -148;
    const kfZ = 48;
    for (let step = 0; step <= 10; step++) {
      const half = 7 - step;
      const y = 1 + step;
      if (half < 0) break;
      for (let dx = -half; dx <= half; dx++) {
        for (let dz = -half; dz <= half; dz++) {
          if (Math.abs(dx) === half || Math.abs(dz) === half || step === 10) {
            // Polished limestone casing remnant at top
            this.setBlock(kfX + dx, y, kfZ + dz, (step >= 8) ? 'smooth_stone' : 'sandstone');
          }
        }
      }
    }
    this.setBlock(kfX, 12, kfZ, 'gold_block');
    this.setBlock(kfX, 13, kfZ, 'sea_lantern');

    // 7. Pyramid of Menkaure at (-175, 20) - 11x11 base with Red Granite lower courses
    const mkX = -175;
    const mkZ = 20;
    for (let step = 0; step <= 7; step++) {
      const half = 5 - step;
      const y = 1 + step;
      if (half < 0) break;
      for (let dx = -half; dx <= half; dx++) {
        for (let dz = -half; dz <= half; dz++) {
          if (Math.abs(dx) === half || Math.abs(dz) === half) {
            this.setBlock(mkX + dx, y, mkZ + dz, (step <= 2) ? 'red_sandstone' : 'sandstone');
          }
        }
      }
    }
    this.setBlock(mkX, 9, mkZ, 'gold_block');

    // 8. Desert Oasis & Bedouin Encampment at (-142, 46)
    const oasX = -142;
    const oasZ = 46;
    // Freshwater Oasis Pool
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
    this.buildPalmTree(oasX - 2, 1, oasZ + 4);

    // Bedouin Desert Tent (Striped woven wool canopy) at (-138, 52)
    const tentX = -138;
    const tentZ = 52;
    for (let dx = -2; dx <= 2; dx++) {
      for (let dz = -2; dz <= 2; dz++) {
        // Tent carpet floor
        this.setBlock(tentX + dx, 1, tentZ + dz, (dx + dz) % 2 === 0 ? 'red_terracotta' : 'terracotta_adobe');
        // Canopy roof at Y = 4
        const isCorner = Math.abs(dx) === 2 && Math.abs(dz) === 2;
        if (isCorner) {
          this.setBlock(tentX + dx, 2, tentZ + dz, 'oak_fence');
          this.setBlock(tentX + dx, 3, tentZ + dz, 'oak_fence');
        }
        this.setBlock(tentX + dx, 4, tentZ + dz, (Math.abs(dx) % 2 === 0) ? 'red_terracotta' : 'lapis_block');
      }
    }
    // Bedouin Campfire with seating cushions
    this.setBlock(tentX, 1, tentZ - 4, 'magma_block');
    this.setBlock(tentX, 2, tentZ - 4, 'lantern');
    this.setBlock(tentX - 1, 1, tentZ - 4, 'oak_planks');
    this.setBlock(tentX + 1, 1, tentZ - 4, 'oak_planks');

    // Saddled Desert Camels resting on the sand
    for (const [camX, camZ] of [[-137, 42], [-145, 52], [-140, 38]]) {
      this.setBlock(camX, 1, camZ, 'sandstone');
      this.setBlock(camX + 1, 1, camZ, 'sandstone');
      this.setBlock(camX, 2, camZ, 'red_terracotta'); // Striped Bedouin Saddle
      this.setBlock(camX + 1, 2, camZ, 'sandstone'); // Camel Hump
      this.setBlock(camX - 1, 2, camZ, 'sandstone'); // Long Neck
      this.setBlock(camX - 1, 3, camZ, 'sandstone'); // Head
      this.setBlock(camX - 1, 3, camZ + 1, 'gold_block'); // Bridle / halter accent
    }

    this.setBlock(oasX, 2, oasZ - 4, 'sandstone', {
      type: 'sign',
      title: 'Giza Desert Oasis & Bedouin Camp 🌴',
      text: 'Fresh water spring shaded by date palms, where camel caravans rest beneath starry desert skies.'
    });
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

    // 2. Palm Jumeirah Grand Artificial Archipelago
    this.buildPalmJumeirahArchipelago();
  }

  // Grand Large-Scale Dubai Archipelago in Arabian Gulf (X in [174, 380], Z in [-80, 165])
  private buildPalmJumeirahArchipelago() {
    this.buildDubaiWaterfrontPromenade();
    this.buildPalmTrunkAndFlaredBase();
    this.buildCentralCrownHub();
    this.build16ParametricCurvedFronds();
    this.buildDetachedCrescentBreakwater();
    this.buildAtlantisPalaceResort();
    this.buildSubseaGlassTunnel();
    this.buildBurjAlArabIsland();
    this.buildBluewatersIslandAndAinDubai();
    this.buildTheWorldIslands();
    this.buildLagoonYachtsAndCoralReefs();
  }

  // A. Dubai Coastal Waterfront Promenade linking Burj Khalifa to Palm Jumeirah
  private buildDubaiWaterfrontPromenade() {
    // Seawall & Promenade along X = 174..176, Z in [20, 64]
    for (let z = 20; z <= 64; z++) {
      for (let x = 174; x <= 176; x++) {
        this.setBlock(x, 1, z, (x === 176) ? 'stone_bricks' : 'smooth_stone');
      }
      if (z % 6 === 0) {
        this.setBlock(176, 2, z, 'iron_block');
        this.setBlock(176, 3, z, 'lantern');
      }
    }

    // Monumental Palm Gateway Archway at (176, 46)
    for (let y = 2; y <= 6; y++) {
      this.setBlock(176, y, 40, 'quartz_pillar');
      this.setBlock(176, y, 52, 'quartz_pillar');
    }
    this.setBlock(176, 7, 40, 'gold_block');
    this.setBlock(176, 7, 52, 'gold_block');
    this.setBlock(176, 8, 40, 'sea_lantern');
    this.setBlock(176, 8, 52, 'sea_lantern');

    for (let z = 40; z <= 52; z++) {
      this.setBlock(176, 7, z, (z === 46) ? 'sea_lantern' : 'gold_block');
      this.setBlock(176, 8, z, (z === 46) ? 'gold_block' : 'quartz_block');
    }

    this.setBlock(176, 2, 44, 'gold_block', {
      type: 'sign',
      title: 'Palm Jumeirah Gateway · مدخل نخلة جميرا 🌴',
      text: 'Welcome to the Eighth Wonder of the World! A monumental, large-scale archipelago spanning the Arabian Gulf with 16 massive curved fronds, The Palm Tower, Atlantis, Burj Al Arab, and Bluewaters.'
    });
  }

  // B. The Flared Trunk, Monorail Spine & The Palm Tower (X in [176, 235], Z in [41, 51])
  private buildPalmTrunkAndFlaredBase() {
    // 1. Flared Base & Linear Spine Paving (Width 11, halfW = 5, Axis Z = 46)
    for (let x = 176; x <= 235; x++) {
      const halfW = (x <= 184) ? Math.round(5 - (x - 176) * 0.25) : 5;

      for (let dz = -halfW; dz <= halfW; dz++) {
        const z = 46 + dz;
        this.setBlock(x, 1, z, 'sand');

        const isOuterEdge = (Math.abs(dz) === halfW);
        if (isOuterEdge) {
          this.setBlock(x, 1, z, 'stone_bricks'); // Seawall
          if (x % 6 === 0) {
            this.setBlock(x, 2, z, 'iron_block');
            this.setBlock(x, 3, z, 'lantern');
          }
        } else if (Math.abs(dz) === halfW - 1) {
          // Sidewalk promenade
          this.setBlock(x, 1, z, 'quartz_block');
          // Space palm trees gracefully (every 12 blocks)
          if (x % 12 === 0 && x >= 184 && x <= 228) {
            this.buildPalmTree(x, 1, z);
          }
        } else if (Math.abs(dz) === 2 || Math.abs(dz) === 3) {
          // Dual carriageway asphalt roadway
          this.setBlock(x, 1, z, 'asphalt_road');
          if (x % 3 === 0 && Math.abs(dz) === 3) {
            this.setBlock(x, 1, z, 'gold_block'); // Gold road dash
          }
        } else if (Math.abs(dz) === 1) {
          // Inner median buffer
          this.setBlock(x, 1, z, 'smooth_stone');
        } else if (dz === 0) {
          // Central Palm Monorail Line along Z = 46
          this.setBlock(x, 1, z, 'stone_bricks');
          if (x % 4 === 0) {
            this.setBlock(x, 2, z, 'quartz_pillar'); // Monorail pier
            this.setBlock(x, 3, z, 'iron_block');
            this.setBlock(x, 4, z, 'smooth_stone');
          } else {
            this.setBlock(x, 3, z, 'iron_block');
            this.setBlock(x, 4, z, (x % 2 === 0) ? 'gold_block' : 'smooth_stone'); // Monorail track beam
          }
        }
      }
    }

    // Monorail Passenger Train on track at X = 192..196
    for (let mx = 192; mx <= 196; mx++) {
      this.setBlock(mx, 5, 46, 'cyber_glass');
      this.setBlock(mx, 6, 46, 'quartz_block');
    }
    this.setBlock(196, 5, 46, 'sea_lantern'); // Train headlight

    // Shoreline Luxury Apartments along the trunk sides (X in [188, 202] and [222, 232])
    for (const bRange of [{ start: 188, end: 202 }, { start: 222, end: 232 }]) {
      for (let x = bRange.start; x <= bRange.end; x += 4) {
        // North Shoreline Apt (Z = 42)
        this.setBlock(x, 2, 42, 'quartz_block');
        this.setBlock(x, 3, 42, 'cyber_glass');
        this.setBlock(x, 4, 42, 'quartz_block');
        this.setBlock(x, 5, 42, 'gold_block');
        // South Shoreline Apt (Z = 50)
        this.setBlock(x, 2, 50, 'quartz_block');
        this.setBlock(x, 3, 50, 'cyber_glass');
        this.setBlock(x, 4, 50, 'quartz_block');
        this.setBlock(x, 5, 50, 'gold_block');
      }
    }

    // 2. The Palm Tower & Nakheel Mall Complex (X in [208, 218], Z in [42, 50])
    const ptX = 213;
    const ptZ = 46;
    // Ground floor concourse lobby (Y = 1 to 3)
    for (let dx = -4; dx <= 4; dx++) {
      for (let dz = -3; dz <= 3; dz++) {
        const isPerimeter = Math.abs(dx) === 4 || Math.abs(dz) === 3;
        for (let y = 1; y <= 3; y++) {
          if (y === 1) {
            this.setBlock(ptX + dx, y, ptZ + dz, 'quartz_block');
          } else if (isPerimeter) {
            this.setBlock(ptX + dx, y, ptZ + dz, (dx === 0 || dz === 0) ? 'gold_block' : 'cyber_glass');
          } else {
            this.setBlock(ptX + dx, y, ptZ + dz, 'air');
          }
        }
      }
    }
    // Concierge & Chandelier
    this.setBlock(ptX, 2, ptZ, 'gold_block');
    this.setBlock(ptX, 3, ptZ, 'sea_lantern');

    // Tower Body (Y = 4 to 23): Modernist curved glass skyscraper
    for (let y = 4; y <= 23; y++) {
      for (let dx = -3; dx <= 3; dx++) {
        for (let dz = -2; dz <= 2; dz++) {
          const isCorner = Math.abs(dx) === 3 && Math.abs(dz) === 2;
          const isEdge = Math.abs(dx) === 3 || Math.abs(dz) === 2;
          if (isCorner) {
            this.setBlock(ptX + dx, y, ptZ + dz, 'quartz_pillar');
          } else if (isEdge) {
            this.setBlock(ptX + dx, y, ptZ + dz, 'cyber_glass');
          } else {
            this.setBlock(ptX + dx, y, ptZ + dz, (y % 4 === 0) ? 'quartz_block' : 'air');
          }
        }
      }
    }

    // Aura Skypool & Observation Deck (Y = 24 to 28)
    for (let dx = -4; dx <= 4; dx++) {
      for (let dz = -3; dz <= 3; dz++) {
        const isRim = Math.abs(dx) === 4 || Math.abs(dz) === 3;
        const isPoolEdge = Math.abs(dx) === 3 || Math.abs(dz) === 2;
        this.setBlock(ptX + dx, 24, ptZ + dz, 'quartz_block'); // Pool floor
        if (isRim) {
          this.setBlock(ptX + dx, 25, ptZ + dz, 'cyber_glass'); // Glass infinity overflow edge
        } else if (isPoolEdge) {
          this.setBlock(ptX + dx, 25, ptZ + dz, 'water'); // 360-degree infinity pool
          this.setBlock(ptX + dx, 24, ptZ + dz, 'prismarine_bricks');
        } else {
          this.setBlock(ptX + dx, 25, ptZ + dz, 'oak_planks'); // Teak sun deck
        }
      }
    }
    // Crown Penthouse & Skypire (Y = 26 to 32)
    for (let y = 26; y <= 29; y++) {
      this.setBlock(ptX - 1, y, ptZ, 'cyber_glass');
      this.setBlock(ptX + 1, y, ptZ, 'cyber_glass');
      this.setBlock(ptX, y, ptZ - 1, 'cyber_glass');
      this.setBlock(ptX, y, ptZ + 1, 'cyber_glass');
    }
    this.setBlock(ptX, 30, ptZ, 'gold_block');
    this.setBlock(ptX, 31, ptZ, 'sea_lantern');
    this.setBlock(ptX, 32, ptZ, 'beacon');

    this.setBlock(ptX - 4, 2, ptZ - 4, 'gold_block', {
      type: 'sign',
      title: 'The Palm Tower & Aura Skypool · برج النخلة 🏙️',
      text: '52-story architectural landmark soaring 240m above the Palm. Features the world-famous Aura 360-degree infinity skypool at Y = 25 and St. Regis luxury suites.'
    });
  }

  // C. The Palm Crown Hub (X in [235, 252], Z in [39, 53])
  private buildCentralCrownHub() {
    const hubX = 243;
    const hubZ = 46;

    for (let x = 235; x <= 252; x++) {
      for (let z = 38; z <= 54; z++) {
        const d = Math.hypot((x - hubX) / 8, (z - hubZ) / 8);
        if (d <= 1.0) {
          this.setBlock(x, 1, z, (d <= 0.4) ? 'gold_block' : 'quartz_block');
          if (Math.abs(d - 1.0) < 0.15) {
            this.setBlock(x, 1, z, 'stone_bricks');
            if ((x + z) % 4 === 0) {
              this.setBlock(x, 2, z, 'lantern');
            }
          }
        }
      }
    }

    // Grand Central Royal Fountain
    for (let dx = -3; dx <= 3; dx++) {
      for (let dz = -3; dz <= 3; dz++) {
        const dist = Math.hypot(dx, dz);
        if (dist <= 3.2) {
          this.setBlock(hubX + dx, 1, hubZ + dz, 'prismarine_bricks');
          if (dist >= 2.2) {
            this.setBlock(hubX + dx, 2, hubZ + dz, 'stone_bricks'); // Fountain rim
          } else {
            this.setBlock(hubX + dx, 2, hubZ + dz, 'water');
          }
        }
      }
    }
    // Fountain Spire
    this.setBlock(hubX, 2, hubZ, 'sea_lantern');
    this.setBlock(hubX, 3, hubZ, 'quartz_pillar');
    this.setBlock(hubX, 4, hubZ, 'gold_block');
    this.setBlock(hubX, 5, hubZ, 'water'); // Cascading water

    // Date Palm Circle surrounding the plaza (4 elegant cardinal trees)
    for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 2) {
      const px = Math.round(hubX + 7 * Math.cos(angle));
      const pz = Math.round(hubZ + 7 * Math.sin(angle));
      this.buildPalmTree(px, 1, pz);
    }

    this.setBlock(hubX - 5, 2, hubZ - 4, 'quartz_block', {
      type: 'sign',
      title: 'The Palm Crown Hub · ساحة النخلة 👑',
      text: 'The grand central fan hub where all 16 massive curved fronds radiate out into the Arabian Gulf. Access point to the Subsea Glass Tunnel to Atlantis.'
    });
  }

  // D. 16 Grand Symmetrical Curved Fronds (8 Pairs, fanning safely within Z in [14, 78])
  private build16ParametricCurvedFronds() {
    const frondDefs = [
      { id: 'H', xRoot: 236, xTip: 288, dz: 30 }, // Outer Fronds (stays strictly >= 16)
      { id: 'G', xRoot: 238, xTip: 292, dz: 26 },
      { id: 'F', xRoot: 240, xTip: 296, dz: 22 },
      { id: 'E', xRoot: 242, xTip: 300, dz: 18 },
      { id: 'D', xRoot: 244, xTip: 302, dz: 14 },
      { id: 'C', xRoot: 246, xTip: 302, dz: 11 },
      { id: 'B', xRoot: 248, xTip: 298, dz: 8 },
      { id: 'A', xRoot: 250, xTip: 292, dz: 5 }   // Inner Fronds
    ];

    for (let i = 0; i < frondDefs.length; i++) {
      const f = frondDefs[i];
      const length = f.xTip - f.xRoot;

      for (let x = f.xRoot; x <= f.xTip; x++) {
        const u = (x - f.xRoot) / length;
        const curveOffset = 3 + (f.dz - 3) * Math.pow(u, 1.35);

        for (const side of [-1, 1]) {
          const centerZ = Math.round(46 + side * curveOffset);

          // Pave frond width: central quartz drive + sand beach flanks
          for (let dz = -2; dz <= 2; dz++) {
            const z = centerZ + dz;
            if (dz === 0) {
              this.setBlock(x, 1, z, 'quartz_block'); // Central Avenue Driveway
            } else {
              this.setBlock(x, 1, z, 'sand'); // Golden sandy beach
            }
          }

          // Plant Date Palms along fronds (well-spaced: every 14 blocks)
          if (x % 14 === 0 && x >= f.xRoot + 12 && x <= f.xTip - 10) {
            this.buildPalmTree(x, 1, centerZ + side * 2);
          }

          // Streetlights along the avenue
          if (x % 10 === 0) {
            this.setBlock(x, 2, centerZ + side * 1, 'iron_block');
            this.setBlock(x, 3, centerZ + side * 1, 'lantern');
          }
        }
      }

      // Build Grand Luxury Beachfront Mansions along the frond tips & midpoints
      // Midpoint Mansion (u = 0.55)
      const midX = Math.round(f.xRoot + length * 0.55);
      const midOffset = 3 + (f.dz - 3) * Math.pow(0.55, 1.35);
      this.buildLuxuryBeachfrontMansion(midX, Math.round(46 - midOffset), -1, `Frond ${f.id} North`);
      this.buildLuxuryBeachfrontMansion(midX, Math.round(46 + midOffset), 1, `Frond ${f.id} South`);

      // Tip Mansion (u = 0.90)
      const tipX = Math.round(f.xRoot + length * 0.88);
      const tipOffset = 3 + (f.dz - 3) * Math.pow(0.88, 1.35);
      this.buildLuxuryBeachfrontMansion(tipX, Math.round(46 - tipOffset), -1, `Frond ${f.id} Royal Apex`);
      this.buildLuxuryBeachfrontMansion(tipX, Math.round(46 + tipOffset), 1, `Frond ${f.id} Royal Apex`);
    }

    // Interactive Landmark Signs on Iconic Fronds
    this.setBlock(266, 2, 35, 'quartz_block', {
      type: 'sign',
      title: "Frond C · Billionaire's Row Beachfront Villa 🏖️",
      text: 'Ultra-exclusive private residence on Palm Jumeirah with private turquoise beach, infinity plunge pool, yacht slip, and panoramic skyline vistas.'
    });

    this.setBlock(266, 2, 72, 'quartz_block', {
      type: 'sign',
      title: 'Frond G · Signature Royal Beachfront Villa 🏖️',
      text: 'Iconic southern frond billionaire estate featuring 5-bedroom modern cubic design, private white sand beach, and sunset views over the Arabian Gulf.'
    });
  }

  // Helper: Luxury 2-Story Beachfront Mansion
  private buildLuxuryBeachfrontMansion(x: number, z: number, side: number, title: string) {
    // Ground Floor (Y = 2) & Upper Floor (Y = 3..4)
    for (let dx = -2; dx <= 2; dx++) {
      for (let dz = -2; dz <= 2; dz++) {
        const isWall = Math.abs(dx) === 2 || Math.abs(dz) === 2;
        this.setBlock(x + dx, 2, z + dz, isWall ? 'quartz_block' : 'smooth_stone');
        this.setBlock(x + dx, 3, z + dz, isWall ? ((dx === 0 || dz === 0) ? 'cyber_glass' : 'quartz_block') : 'air');
        this.setBlock(x + dx, 4, z + dz, 'quartz_block'); // Flat roof deck
      }
    }
    // Rooftop Terrace Pergola
    this.setBlock(x - 1, 5, z - 1, 'quartz_pillar');
    this.setBlock(x + 1, 5, z + 1, 'quartz_pillar');
    this.setBlock(x, 5, z, 'sea_lantern');

    // Private Infinity Plunge Pool facing the lagoon
    const poolZ = z + side * 4;
    for (let dx = -1; dx <= 1; dx++) {
      for (let dz = -1; dz <= 1; dz++) {
        this.setBlock(x + dx, 1, poolZ + dz, 'prismarine_bricks');
        this.setBlock(x + dx, 2, poolZ + dz, 'water');
      }
    }
    this.setBlock(x - 2, 2, poolZ, 'cyber_glass');
    this.setBlock(x + 2, 2, poolZ, 'cyber_glass');
    this.setBlock(x, 2, poolZ + side * 2, 'cyber_glass'); // Glass infinity spill lip

    // Wooden sun lounger deck
    this.setBlock(x - 1, 2, z + side * 2, 'oak_planks');
    this.setBlock(x + 1, 2, z + side * 2, 'oak_planks');
  }

  // E. Detached Outer Crescent Breakwater (Rx = 72, Rz = 34, Center at 252, 46 - strictly Z in [12, 80])
  private buildDetachedCrescentBreakwater() {
    const cX = 252;
    const cZ = 46;

    for (let x = 210; x <= 325; x++) {
      for (let z = 12; z <= 80; z++) {
        const cd = Math.hypot((x - cX) / 72, (z - cZ) / 34);
        if (cd >= 0.94 && cd <= 1.05) {
          // Check tidal gap cuts
          const isNorthGap = (z >= 24 && z <= 27 && x >= 222 && x <= 236);
          const isSouthGap = (z >= 65 && z <= 68 && x >= 222 && x <= 236);
          if (isNorthGap || isSouthGap) continue;

          // Outer edge = protective stone seawall
          if (cd >= 1.02) {
            this.setBlock(x, 1, z, 'stone_bricks');
            this.setBlock(x, 2, z, 'stone_bricks');
            if ((x + z) % 6 === 0) {
              this.setBlock(x, 3, z, 'lantern');
            }
          } else if (cd >= 0.98) {
            // Running / cycling promenade
            this.setBlock(x, 1, z, 'smooth_stone');
            if ((x + z) % 15 === 0) {
              this.buildPalmTree(x, 1, z);
            }
          } else {
            // Inner lagoon beach
            this.setBlock(x, 1, z, 'sand');
          }
        }
      }
    }

    // North Crescent Lighthouse at (222, 14)
    this.buildLighthouseTower(222, 14, 'North Crescent Lighthouse & Strait ⚓');
    // South Crescent Lighthouse at (222, 78)
    this.buildLighthouseTower(222, 78, 'South Crescent Lighthouse & Strait ⚓');
  }

  private buildLighthouseTower(x: number, z: number, title: string) {
    for (let y = 1; y <= 12; y++) {
      const isRed = (Math.floor(y / 2) % 2 === 0);
      for (let dx = -1; dx <= 1; dx++) {
        for (let dz = -1; dz <= 1; dz++) {
          this.setBlock(x + dx, y, z + dz, isRed ? 'redstone_block' : 'quartz_block');
        }
      }
    }
    // Lantern Room at Y = 13..15
    for (let dx = -1; dx <= 1; dx++) {
      for (let dz = -1; dz <= 1; dz++) {
        this.setBlock(x + dx, 13, z + dz, 'cyber_glass');
        this.setBlock(x + dx, 15, z + dz, 'gold_block');
      }
    }
    this.setBlock(x, 14, z, 'beacon');
    this.setBlock(x, 16, z, 'sea_lantern');

    this.setBlock(x, 2, z - 2, 'stone_bricks', {
      type: 'sign',
      title: title,
      text: 'Navigational lighthouse beacon marking the open sea strait between Palm Jumeirah and the open Arabian Gulf.'
    });
  }

  // F. Atlantis, The Palm & The Royal Atlantis Mega-Resort (X in [312, 335], Z in [36, 56])
  private buildAtlantisPalaceResort() {
    const atX = 320;
    const atZ = 46;

    // 1. Plinth Platform (Y = 1)
    for (let x = 312; x <= 335; x++) {
      for (let z = 36; z <= 56; z++) {
        this.setBlock(x, 1, z, 'sandstone');
      }
    }

    // 2. North Palatial Wing (X in [314, 328], Z in [36, 42]) - Stepped tiers up to Y = 30
    for (let x = 314; x <= 328; x++) {
      for (let z = 36; z <= 42; z++) {
        for (let y = 2; y <= 8; y++) {
          this.setBlock(x, y, z, (x === 314 || z === 36) ? 'cyber_glass' : 'terracotta_adobe');
        }
        if (x >= 316 && x <= 326 && z >= 37 && z <= 41) {
          for (let y = 9; y <= 16; y++) {
            this.setBlock(x, y, z, (x === 316 || z === 37) ? 'cyber_glass' : 'terracotta_adobe');
          }
        }
        if (x >= 318 && x <= 324 && z >= 38 && z <= 40) {
          for (let y = 17; y <= 24; y++) {
            this.setBlock(x, y, z, 'quartz_block');
          }
        }
      }
    }
    // North Tower Pinnacles
    for (let y = 25; y <= 30; y++) {
      this.setBlock(321, y, 39, 'quartz_pillar');
    }
    this.setBlock(321, 31, 39, 'gold_block');
    this.setBlock(321, 32, 39, 'sea_lantern');
    this.setBlock(321, 33, 39, 'beacon');

    // 3. South Palatial Wing (X in [314, 328], Z in [50, 56]) - Stepped tiers up to Y = 30
    for (let x = 314; x <= 328; x++) {
      for (let z = 50; z <= 56; z++) {
        for (let y = 2; y <= 8; y++) {
          this.setBlock(x, y, z, (x === 314 || z === 56) ? 'cyber_glass' : 'terracotta_adobe');
        }
        if (x >= 316 && x <= 326 && z >= 51 && z <= 55) {
          for (let y = 9; y <= 16; y++) {
            this.setBlock(x, y, z, (x === 314 || z === 56) ? 'cyber_glass' : 'terracotta_adobe');
          }
        }
        if (x >= 318 && x <= 324 && z >= 52 && z <= 54) {
          for (let y = 17; y <= 24; y++) {
            this.setBlock(x, y, z, 'quartz_block');
          }
        }
      }
    }
    // South Tower Pinnacles
    for (let y = 25; y <= 30; y++) {
      this.setBlock(321, y, 53, 'quartz_pillar');
    }
    this.setBlock(321, 31, 53, 'gold_block');
    this.setBlock(321, 32, 53, 'sea_lantern');
    this.setBlock(321, 33, 53, 'beacon');

    // 4. The Monumental Grand Arabian Archway (Z in [43, 49], X in [316, 326])
    for (let x = 316; x <= 326; x++) {
      for (let z = 43; z <= 49; z++) {
        this.setBlock(x, 1, z, 'prismarine_bricks');
        this.setBlock(x, 2, z, (Math.abs(z - 46) <= 1) ? 'water' : 'quartz_block');
        // Clear open interior framing unobstructed view into Arabian Gulf
        for (let y = 3; y <= 16; y++) {
          this.setBlock(x, y, z, 'air');
        }
      }
      // Archway Supporting Colonnades
      for (let y = 2; y <= 15; y++) {
        this.setBlock(x, y, 43, 'quartz_pillar');
        this.setBlock(x, y, 49, 'quartz_pillar');
      }
      this.setBlock(x, 16, 43, 'gold_block');
      this.setBlock(x, 16, 49, 'gold_block');
    }

    // 5. The Royal Bridge Suite (Spanning Y = 17 to 23 across Z in [43, 49], X in [317, 325])
    for (let x = 317; x <= 325; x++) {
      for (let z = 43; z <= 49; z++) {
        this.setBlock(x, 17, z, 'gold_block'); // Bridge Suite floor
        this.setBlock(x, 18, z, (x === 317 || x === 325) ? 'cyber_glass' : 'air');
        this.setBlock(x, 19, z, (x === 317 || x === 325) ? 'cyber_glass' : 'air');
        this.setBlock(x, 20, z, (x === 317 || x === 325) ? 'cyber_glass' : 'quartz_block');
        this.setBlock(x, 21, z, 'quartz_block');
        this.setBlock(x, 22, z, 'gold_block'); // Ornate crown cresting
        this.setBlock(x, 23, z, (x === 321 && z === 46) ? 'beacon' : 'gold_block');
      }
    }
    this.setBlock(321, 19, 46, 'sea_lantern'); // Grand Chandelier

    // 6. Aquaventure Waterpark Ziggurat Cascades
    for (const cz of [34, 58]) {
      for (let step = 0; step <= 6; step++) {
        this.setBlock(324 - step, 8 - step, cz, 'prismarine_bricks');
        this.setBlock(324 - step, 9 - step, cz, 'water');
      }
    }

    // 7. Atlantis Arrival Courtyard & Royal Palm Court (X in [306, 312], Z in [42, 50])
    for (let x = 306; x <= 312; x++) {
      for (let z = 42; z <= 50; z++) {
        this.setBlock(x, 1, z, 'quartz_block');
      }
    }
    // Royal Fountains
    this.setBlock(308, 2, 46, 'prismarine_bricks');
    this.setBlock(308, 3, 46, 'sea_lantern');
    this.setBlock(308, 4, 46, 'water');

    this.buildPalmTree(308, 1, 41);
    this.buildPalmTree(308, 1, 51);

    this.setBlock(307, 2, 45, 'sandstone', {
      type: 'sign',
      title: 'Atlantis, The Palm & The Royal Atlantis 👑',
      text: 'Monumental 5-star ocean-themed resort crowned by the legendary Royal Bridge Suite at Y = 17..23, Aquaventure waterpark ziggurat, and panoramic Arabian Gulf vistas.'
    });
  }

  // G. 60-Block Subsea Transparent Cyber-Glass Transit Tunnel (X in [250, 310], Z in [45, 47])
  private buildSubseaGlassTunnel() {
    for (let x = 250; x <= 308; x++) {
      // Submerged tunnel floor at Y = 1 along Z = 46
      this.setBlock(x, 1, 46, (x % 2 === 0) ? 'gold_block' : 'smooth_stone');
      this.setBlock(x, 1, 45, 'stone_bricks');
      this.setBlock(x, 1, 47, 'stone_bricks');

      // Transparent Cyber-Glass Walls and Ceiling at Y = 2 and 3
      this.setBlock(x, 2, 45, 'cyber_glass');
      this.setBlock(x, 2, 47, 'cyber_glass');
      this.setBlock(x, 3, 45, 'cyber_glass');
      this.setBlock(x, 3, 47, 'cyber_glass');
      this.setBlock(x, 3, 46, 'cyber_glass'); // Glass arched vault

      // Clear walkable interior at Y = 2
      this.setBlock(x, 2, 46, 'air');

      // Embedded seabed illumination at Y = 0
      if (x % 3 === 0) {
        this.setBlock(x, 0, 46, 'sea_lantern');
      }

      // Active water blocks covering and surrounding the glass tube outside
      this.setBlock(x, 2, 44, 'water');
      this.setBlock(x, 2, 48, 'water');
      this.setBlock(x, 3, 44, 'water');
      this.setBlock(x, 3, 48, 'water');
      this.setBlock(x, 4, 45, 'water');
      this.setBlock(x, 4, 46, 'water');
      this.setBlock(x, 4, 47, 'water');
    }

    // Portal archways at ends
    this.setBlock(250, 2, 45, 'quartz_pillar');
    this.setBlock(250, 2, 47, 'quartz_pillar');
    this.setBlock(250, 3, 46, 'sea_lantern');
    this.setBlock(308, 2, 45, 'quartz_pillar');
    this.setBlock(308, 2, 47, 'quartz_pillar');
    this.setBlock(308, 3, 46, 'sea_lantern');

    this.setBlock(251, 2, 45, 'gold_block', {
      type: 'sign',
      title: 'Palm Subsea Glass Transit Tunnel 🌊',
      text: 'Walk 60 blocks underwater through the deep lagoon channel connecting the Palm Crown Hub directly to Atlantis! Look up through reinforced cyber-glass into the turquoise Arabian Gulf.'
    });
  }

  // H. Burj Al Arab 7-Star Luxury Sail Hotel on Private Island (Center at 220, 110)
  private buildBurjAlArabIsland() {
    const baX = 220;
    const baZ = 110;

    // Curved access causeway bridge from mainland (X = 176, Z = 96) to island (X = 212, Z = 104)
    for (let x = 176; x <= 212; x++) {
      const u = (x - 176) / (212 - 176);
      const bZ = Math.round(96 + 10 * Math.sin(u * Math.PI * 0.5));
      this.setBlock(x, 1, bZ, 'asphalt_road');
      this.setBlock(x, 1, bZ - 1, 'quartz_block');
      this.setBlock(x, 1, bZ + 1, 'quartz_block');
      if (x % 5 === 0) {
        this.setBlock(x, 2, bZ - 1, 'iron_block');
        this.setBlock(x, 3, bZ - 1, 'lantern');
      }
    }

    // Island Ground & Beach Deck
    for (let dx = -10; dx <= 10; dx++) {
      for (let dz = -10; dz <= 10; dz++) {
        const d = Math.hypot(dx / 10, dz / 10);
        if (d <= 1.0) {
          this.setBlock(baX + dx, 1, baZ + dz, (d <= 0.6) ? 'quartz_block' : 'sand');
        }
      }
    }

    // Iconic Sail Tower Architecture (Y = 2 to 36)
    // Triangular core and soaring white curved sail truss
    for (let y = 2; y <= 35; y++) {
      const u = (y - 2) / 33;
      // Sail curve: bow extends eastward
      const bowX = Math.round(baX + 6 * Math.sin(u * Math.PI));
      const spineX = baX - 4;

      // Spine & Service Mast
      for (let dz = -1; dz <= 1; dz++) {
        this.setBlock(spineX, y, baZ + dz, 'quartz_pillar');
      }

      // Curved Cyan Glass Sail Facade
      for (let x = spineX + 1; x <= bowX; x++) {
        const curHalfW = Math.max(1, Math.round(4 * (1 - u * 0.7)));
        for (let dz = -curHalfW; dz <= curHalfW; dz++) {
          const isOuterTruss = (x === bowX || Math.abs(dz) === curHalfW);
          if (isOuterTruss) {
            this.setBlock(x, y, baZ + dz, 'quartz_block');
          } else {
            this.setBlock(x, y, baZ + dz, (y % 4 === 0) ? 'quartz_block' : 'cyber_glass');
          }
        }
      }
    }

    // Cantilevered Helipad at Y = 28 (Projecting oceanward at baX + 6, baZ - 6)
    const heliX = baX + 6;
    const heliZ = baZ - 6;
    for (let dx = -3; dx <= 3; dx++) {
      for (let dz = -3; dz <= 3; dz++) {
        if (Math.hypot(dx, dz) <= 3.2) {
          this.setBlock(heliX + dx, 28, heliZ + dz, (Math.abs(dx) <= 1 && Math.abs(dz) <= 1) ? 'gold_block' : 'smooth_stone');
        }
      }
    }
    // Helipad 'H' Marking
    this.setBlock(heliX, 29, heliZ, 'sea_lantern');

    // Panoramic Skyview Lounge at Y = 32 (Projecting oceanward at baX + 5, baZ + 5)
    for (let dx = -2; dx <= 2; dx++) {
      for (let dz = -2; dz <= 2; dz++) {
        this.setBlock(baX + 5 + dx, 32, baZ + 5 + dz, 'cyber_glass');
        this.setBlock(baX + 5 + dx, 33, baZ + 5 + dz, 'quartz_block');
      }
    }

    // Spire Mast (Y = 36 to 42)
    for (let y = 36; y <= 40; y++) {
      this.setBlock(baX - 4, y, baZ, 'iron_block');
    }
    this.setBlock(baX - 4, 41, baZ, 'sea_lantern');
    this.setBlock(baX - 4, 42, baZ, 'beacon');

    this.setBlock(baX - 7, 2, baZ - 5, 'quartz_block', {
      type: 'sign',
      title: 'Burj Al Arab · 7-Star Luxury Sail Hotel ⛵',
      text: 'The iconic sail-shaped masterpiece rising 321m on its own private artificial island. Features the cantilevered sky helipad at Y = 28, Skyview lounge, and private beach cabana deck.'
    });
  }

  // I. Bluewaters Island & Ain Dubai (Center at 262, 146)
  private buildBluewatersIslandAndAinDubai() {
    const bwX = 262;
    const bwZ = 146;

    // Pedestrian bridge from coast (176, 136) to Bluewaters (248, 146)
    for (let x = 176; x <= 248; x++) {
      const u = (x - 176) / (248 - 176);
      const bZ = Math.round(136 + 10 * u);
      this.setBlock(x, 1, bZ, 'oak_planks');
      this.setBlock(x, 1, bZ - 1, 'smooth_stone');
      this.setBlock(x, 1, bZ + 1, 'smooth_stone');
      if (x % 6 === 0) {
        this.setBlock(x, 2, bZ - 1, 'iron_block');
        this.setBlock(x, 3, bZ - 1, 'lantern');
      }
    }

    // Bluewaters Island Paving & Boardwalk
    for (let dx = -14; dx <= 14; dx++) {
      for (let dz = -14; dz <= 14; dz++) {
        const d = Math.hypot(dx / 14, dz / 14);
        if (d <= 1.0) {
          this.setBlock(bwX + dx, 1, bwZ + dz, (d <= 0.75) ? 'quartz_block' : 'sand');
        }
      }
    }

    // Ain Dubai (The Dubai Eye) - 28-block tall giant circular observation wheel
    // Center at (bwX, 20, bwZ)
    const wheelCenterY = 20;
    const wheelRadius = 13;

    // A-Frame Support Legs
    for (let step = 0; step <= 18; step++) {
      const u = step / 18;
      const curY = 2 + Math.round(18 * u);
      const legDist = Math.round(10 * (1 - u));
      this.setBlock(bwX - 2, curY, bwZ - legDist, 'quartz_pillar');
      this.setBlock(bwX - 2, curY, bwZ + legDist, 'quartz_pillar');
      this.setBlock(bwX + 2, curY, bwZ - legDist, 'quartz_pillar');
      this.setBlock(bwX + 2, curY, bwZ + legDist, 'quartz_pillar');
    }
    // Hub Spindle
    for (let dx = -3; dx <= 3; dx++) {
      this.setBlock(bwX + dx, wheelCenterY, bwZ, 'iron_block');
    }
    this.setBlock(bwX, wheelCenterY, bwZ, 'sea_lantern');

    // Circular Wheel Rim & Spokes (In Y-Z plane)
    const numCapsules = 16;
    for (let i = 0; i < numCapsules; i++) {
      const theta = (i / numCapsules) * Math.PI * 2;
      const capY = Math.round(wheelCenterY + wheelRadius * Math.sin(theta));
      const capZ = Math.round(bwZ + wheelRadius * Math.cos(theta));

      // Spoke
      for (let r = 2; r < wheelRadius; r += 2) {
        const spY = Math.round(wheelCenterY + r * Math.sin(theta));
        const spZ = Math.round(bwZ + r * Math.cos(theta));
        this.setBlock(bwX, spY, spZ, 'iron_block');
      }

      // Wheel Rim
      this.setBlock(bwX, capY, capZ, 'quartz_block');

      // Passenger Observation Capsule
      this.setBlock(bwX - 1, capY, capZ, 'cyber_glass');
      this.setBlock(bwX + 1, capY, capZ, 'cyber_glass');
      this.setBlock(bwX, capY, capZ, 'sea_lantern');
    }

    this.setBlock(bwX - 6, 2, bwZ - 8, 'quartz_block', {
      type: 'sign',
      title: 'Ain Dubai & Bluewaters Island · عين دبي 🎡',
      text: 'The world\'s tallest and largest observation wheel standing 250m above Bluewaters Island. Enjoy 360-degree panoramic views of Dubai Marina, Palm Jumeirah, and the Arabian Gulf.'
    });
  }

  // J. The World Islands Archipelago Cluster (Vast deep Arabian Gulf east of Palm Jumeirah, X in [342, 390], Z in [16, 78])
  private buildTheWorldIslands() {
    // 1. Atoll 1 - The Heart of Europe / Monaco Atoll (Center at 360, 46, R = 12)
    const mX = 360;
    const mZ = 46;
    for (let dx = -12; dx <= 12; dx++) {
      for (let dz = -12; dz <= 12; dz++) {
        const d = Math.hypot(dx, dz);
        if (d <= 12) {
          this.setBlock(mX + dx, 1, mZ + dz, (d <= 7) ? 'quartz_block' : 'sand');
        }
      }
    }
    // French Riviera Palace Villa
    for (let dx = -3; dx <= 3; dx++) {
      for (let dz = -3; dz <= 3; dz++) {
        const isWall = Math.abs(dx) === 3 || Math.abs(dz) === 3;
        this.setBlock(mX + dx, 2, mZ + dz, isWall ? 'quartz_block' : 'smooth_stone');
        this.setBlock(mX + dx, 3, mZ + dz, isWall ? ((dx === 0 || dz === 0) ? 'cyber_glass' : 'quartz_block') : 'air');
        this.setBlock(mX + dx, 4, mZ + dz, 'quartz_block');
      }
    }
    this.setBlock(mX, 5, mZ, 'gold_block');
    this.setBlock(mX, 6, mZ, 'sea_lantern');

    this.setBlock(mX - 4, 2, mZ - 5, 'quartz_block', {
      type: 'sign',
      title: 'The World Islands · The Heart of Europe 🌍',
      text: 'Iconic satellite island on Dubai\'s World archipelago featuring European-inspired luxury chateau villas, private marinas, and crystal lagoon beaches.'
    });

    // 2. Atoll 2 - Sweden Island (Center at 380, 68, R = 10)
    const sX = 380;
    const sZ = 68;
    for (let dx = -10; dx <= 10; dx++) {
      for (let dz = -10; dz <= 10; dz++) {
        if (Math.hypot(dx, dz) <= 10) {
          this.setBlock(sX + dx, 1, sZ + dz, 'sand');
        }
      }
    }
    // Scandinavian Glass Villa
    for (let dx = -2; dx <= 2; dx++) {
      for (let dz = -2; dz <= 2; dz++) {
        this.setBlock(sX + dx, 2, sZ + dz, 'spruce_log');
        this.setBlock(sX + dx, 3, sZ + dz, (Math.abs(dx) === 2 || Math.abs(dz) === 2) ? 'cyber_glass' : 'air');
        this.setBlock(sX + dx, 4, sZ + dz, 'oak_planks');
      }
    }

    // 3. Atoll 3 - Floating Seahorse Overwater Island (Center at 350, 24, R = 9)
    const shX = 350;
    const shZ = 24;
    for (let dx = -9; dx <= 9; dx++) {
      for (let dz = -9; dz <= 9; dz++) {
        if (Math.hypot(dx, dz) <= 9) {
          this.setBlock(shX + dx, 1, shZ + dz, 'sand');
        }
      }
    }
    // Overwater Boardwalk and Floating Villa with Underwater Bedroom!
    for (let step = 0; step <= 8; step++) {
      this.setBlock(shX + step, 1, shZ, 'oak_planks');
    }
    const fvX = shX + 10;
    const fvZ = shZ;
    // Submerged Underwater Bedroom (Y = 0)
    for (let dx = -2; dx <= 2; dx++) {
      for (let dz = -2; dz <= 2; dz++) {
        this.setBlock(fvX + dx, -1, fvZ + dz, 'prismarine_bricks');
        this.setBlock(fvX + dx, 0, fvZ + dz, (Math.abs(dx) === 2 || Math.abs(dz) === 2) ? 'cyber_glass' : 'air');
      }
    }
    this.setBlock(fvX, 0, fvZ, 'sea_lantern');
    // Upper Sun Deck (Y = 1..2)
    for (let dx = -2; dx <= 2; dx++) {
      for (let dz = -2; dz <= 2; dz++) {
        this.setBlock(fvX + dx, 1, fvZ + dz, 'oak_planks');
        this.setBlock(fvX + dx, 2, fvZ + dz, (Math.abs(dx) === 2 || Math.abs(dz) === 2) ? 'cyber_glass' : 'air');
      }
    }

    this.setBlock(shX - 3, 2, shZ - 3, 'oak_planks', {
      type: 'sign',
      title: 'Floating Seahorse Overwater Villa 🌊🤿',
      text: 'World-famous overwater villa with submerged glass master bedroom looking directly into the Arabian Gulf seabed coral garden!'
    });

    // 4. Atoll 4 - Coral Sandbar Atoll (Center at 380, 28, R = 8)
    const cX = 380;
    const cZ = 28;
    for (let dx = -8; dx <= 8; dx++) {
      for (let dz = -8; dz <= 8; dz++) {
        if (Math.hypot(dx, dz) <= 8) {
          this.setBlock(cX + dx, 1, cZ + dz, 'sand');
        }
      }
    }
    this.buildPalmTree(cX - 2, 1, cZ);
    this.buildPalmTree(cX + 2, 1, cZ);
    this.setBlock(cX, 2, cZ, 'chest', {
      type: 'chest',
      title: 'Hidden World Atoll Treasure 💎',
      text: 'You discovered the secluded sandbar atoll on Dubai\'s World Islands! An untouched tropical oasis.'
    });
  }

  // K. Moored Luxury Superyachts, Traditional Dhow & Glowing Coral Reefs
  private buildLagoonYachtsAndCoralReefs() {
    // 1. Superyacht "Majesty 175" at (260, 36)
    const yx1 = 260;
    const yz1 = 36;
    for (let dx = -6; dx <= 6; dx++) {
      for (let dz = -2; dz <= 2; dz++) {
        const isBow = (dx >= 5 && Math.abs(dz) === 2);
        if (isBow) continue;
        this.setBlock(yx1 + dx, 0, yz1 + dz, 'quartz_block'); // Hull
        this.setBlock(yx1 + dx, 1, yz1 + dz, 'oak_planks'); // Teak deck
      }
    }
    for (let dx = -3; dx <= 3; dx++) {
      for (let dz = -1; dz <= 1; dz++) {
        this.setBlock(yx1 + dx, 2, yz1 + dz, 'cyber_glass');
        this.setBlock(yx1 + dx, 3, yz1 + dz, 'quartz_block');
      }
    }
    this.setBlock(yx1 - 2, 4, yz1, 'iron_block');
    this.setBlock(yx1 - 2, 5, yz1, 'sea_lantern'); // Radar mast

    // 2. Superyacht "Dubai Royal Star" at (264, 48)
    const yx2 = 264;
    const yz2 = 48;
    for (let dx = -5; dx <= 5; dx++) {
      for (let dz = -2; dz <= 2; dz++) {
        const isBow = (dx >= 4 && Math.abs(dz) === 2);
        if (isBow) continue;
        this.setBlock(yx2 + dx, 0, yz2 + dz, 'smooth_stone');
        this.setBlock(yx2 + dx, 1, yz2 + dz, 'oak_planks');
      }
    }
    for (let dx = -3; dx <= 2; dx++) {
      this.setBlock(yx2 + dx, 2, yz2, 'cyber_glass');
      this.setBlock(yx2 + dx, 3, yz2, 'smooth_stone');
    }
    this.setBlock(yx2 - 1, 4, yz2, 'sea_lantern');

    // 3. Traditional Arabian Dhow "Al-Boom" at (200, 56)
    const dx0 = 200;
    const dz0 = 56;
    for (let dx = -4; dx <= 4; dx++) {
      this.setBlock(dx0 + dx, 0, dz0, 'spruce_log');
      this.setBlock(dx0 + dx, 1, dz0, 'oak_planks');
    }
    for (let y = 1; y <= 7; y++) {
      this.setBlock(dx0, y, dz0, 'spruce_log');
    }
    // Triangular lateen sail
    for (let s = 1; s <= 4; s++) {
      this.setBlock(dx0 + s, 2 + s, dz0, 'quartz_block');
      this.setBlock(dx0 + s, 3 + s, dz0, 'quartz_block');
    }

    // 4. Glowing Coral Reefs across Lagoon Seabed
    const reefLocations = [
      { x: 220, z: 30 }, { x: 240, z: 24 }, { x: 270, z: 20 },
      { x: 220, z: 54 }, { x: 240, z: 60 }, { x: 270, z: 64 },
      { x: 290, z: 34 }, { x: 290, z: 50 }, { x: 300, z: 42 }
    ];
    for (const r of reefLocations) {
      this.setBlock(r.x, -1, r.z, 'prismarine_bricks');
      this.setBlock(r.x, 0, r.z, 'sea_lantern');
      this.setBlock(r.x + 1, 0, r.z, 'amethyst_block');
      this.setBlock(r.x, 0, r.z + 1, 'prismarine_bricks');
    }
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
      for (let dz = -1; dz <= 1; dz++) {
        const localGround = this.getTerrainHeight(x, wallZ + dz);
        const bottomY = Math.max(-1, Math.min(groundY - 2, localGround));
        for (let y = bottomY; y <= groundY + 4; y++) {
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
          const localGround = this.getTerrainHeight(x, z);
          const colBottom = Math.max(-1, Math.min(towerBase - 2, localGround));
          for (let y = colBottom; y <= towerTop; y++) {
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

    // Temple of Heaven Imperial Pavilion & Languages Embassy at (-122, -88)
    // 3-Tiered Circular Imperial Shrine with Vermilion Pillars & Golden Finial
    const thX = -122;
    const thZ = -88;
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

    // Imperial Chinese Red Lantern Posts flanking the Paifang Avenue
    for (const lz of [-78, -92]) {
      for (let y = 1; y <= 4; y++) {
        this.setBlock(-84, y, lz, 'dark_oak_fence');
      }
      this.setBlock(-84, 5, lz, 'red_terracotta');
      this.setBlock(-84, 4, lz + (lz > -85 ? -1 : 1), 'lantern');
    }

    // Grand Paifang Imperial Gate (Celestial Entrance Arch to China Realm)
    for (let y = 1; y <= 6; y++) {
      this.setBlock(-84, y, -87, 'red_terracotta');
      this.setBlock(-84, y, -83, 'red_terracotta');
    }
    for (let z = -89; z <= -81; z++) {
      this.setBlock(-84, 7, z, 'red_terracotta');
      this.setBlock(-84, 8, z, 'stone_bricks');
    }
    this.setBlock(-84, 9, -89, 'gold_block');
    this.setBlock(-84, 9, -81, 'gold_block');
    this.setBlock(-84, 8, -85, 'gold_block');
    this.setBlock(-84, 6, -85, 'sea_lantern');
    this.setBlock(-84, 3, -82, 'glowstone', {
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

  // 6. Mexico Realm (Zócalo, Baroque Metropolitan Cathedral, Palacio Nacional, Monumental Flag, Taquería, Chichén Itzá & Mayan Cenote)
  private buildMexicoRealm() {
    const cx = -105;
    const cz = 60;

    // 1. Grand Zócalo Plaza (X in [cx - 24, cx + 24], Z in [cz - 24, cz + 24])
    // Uniform Level Plaza Pavement at Y = 1
    for (let x = cx - 24; x <= cx + 24; x++) {
      for (let z = cz - 24; z <= cz + 24; z++) {
        const isMainAvenue = (x === cx || z === cz || Math.abs(x - cx) === 16 || Math.abs(z - cz) === 16);
        const isDecorativeTile = (x + z) % 4 === 0;
        this.setBlock(x, 1, z, isMainAvenue ? 'smooth_stone' : (isDecorativeTile ? 'red_sandstone' : 'terracotta_adobe'));
      }
    }

    // 2. Monumental Mexican Flagpole (Asta Bandera Monumental) in Center of Zócalo
    // Concentric Stone Plinth (Y = 1 to 2)
    for (let dx = -3; dx <= 3; dx++) {
      for (let dz = -3; dz <= 3; dz++) {
        if (Math.hypot(dx, dz) <= 3) {
          this.setBlock(cx + dx, 2, cz + dz, 'stone_bricks');
        }
      }
    }
    // High Steel Flagpole Mast (Y = 3 to 19)
    for (let y = 3; y <= 19; y++) {
      this.setBlock(cx, y, cz, 'iron_block');
    }
    this.setBlock(cx, 20, cz, 'gold_block'); // Mast finial
    this.setBlock(cx, 21, cz, 'beacon'); // Night spotlight

    // Giant Monumental Mexican Flag (Bandera Monumental) waving Eastward (Y = 14 to 18)
    for (let y = 14; y <= 18; y++) {
      // Green field (Hope & Independence)
      this.setBlock(cx + 1, y, cz, 'emerald_block');
      this.setBlock(cx + 2, y, cz, 'emerald_block');
      // White field with Golden Eagle & Serpent Emblem
      this.setBlock(cx + 3, y, cz, (y === 16) ? 'gold_block' : 'quartz_block');
      this.setBlock(cx + 4, y, cz, (y === 16) ? 'gold_block' : 'quartz_block');
      // Red field (Heroes of the Fatherland)
      this.setBlock(cx + 5, y, cz, 'redstone_block');
      this.setBlock(cx + 6, y, cz, 'redstone_block');
    }

    this.setBlock(cx, 3, cz + 2, 'stone_bricks', {
      type: 'sign',
      title: 'Asta Bandera Monumental · Zócalo 🇲🇽',
      text: 'Plaza de la Constitución: The historic epicenter of Mexico. Site of ancient Tenochtitlan where the eagle was found devouring the serpent in 1325!'
    });

    // Festive Strings of "Papel Picado" & Plaza Lanterns crisscrossing the Zócalo
    const papelColors = ['emerald_block', 'gold_block', 'redstone_block', 'amethyst_block'];
    for (let d = -16; d <= 16; d++) {
      if (d === 0) continue;
      const colIdx = Math.abs(d) % papelColors.length;
      // North-South string
      this.setBlock(cx + 8, 5, cz + d, papelColors[colIdx]);
      this.setBlock(cx - 8, 5, cz + d, papelColors[(colIdx + 1) % papelColors.length]);
      if (Math.abs(d) % 8 === 0) {
        this.setBlock(cx + 8, 4, cz + d, 'lantern');
        this.setBlock(cx - 8, 4, cz + d, 'lantern');
      }
    }

    // 3. Catedral Metropolitana (Mexico City Metropolitan Cathedral) on North Side
    // Cathedral footprint: X in [cx - 10, cx + 10], Z in [cz - 24, cz - 11]
    // Nave main hall (Y = 2 to 12)
    for (let x = cx - 9; x <= cx + 9; x++) {
      for (let z = cz - 24; z <= cz - 11; z++) {
        const isPerimeter = (x === cx - 9 || x === cx + 9 || z === cz - 24 || z === cz - 11);
        for (let y = 2; y <= 12; y++) {
          if (isPerimeter || y === 12) {
            // Front baroque facade ornamentation
            const isFacade = (z === cz - 11);
            if (isFacade && y <= 5 && Math.abs(x - cx) <= 2) {
              // Open Grand Baroque Portal entrance
              continue;
            }
            this.setBlock(x, y, z, (y === 12) ? 'gold_block' : 'quartz_block');
          }
        }
      }
    }
    // Cathedral Twin Baroque Bell Towers (West at cx - 8, East at cx + 8)
    for (const tx of [cx - 8, cx + 8]) {
      // Lower tower shaft (Y = 13 to 16)
      for (let y = 13; y <= 16; y++) {
        for (let dx = -1; dx <= 1; dx++) {
          for (let dz = -1; dz <= 1; dz++) {
            this.setBlock(tx + dx, y, cz - 12 + dz, 'stone_bricks');
          }
        }
      }
      // Open Belfry Chamber with bells (Y = 17 to 20)
      for (let y = 17; y <= 20; y++) {
        for (let dx = -1; dx <= 1; dx++) {
          for (let dz = -1; dz <= 1; dz++) {
            const isCorner = Math.abs(dx) === 1 && Math.abs(dz) === 1;
            if (isCorner) {
              this.setBlock(tx + dx, y, cz - 12 + dz, 'quartz_pillar');
            } else if (y === 18 && dx === 0 && dz === 0) {
              this.setBlock(tx, y, cz - 12, 'gold_block'); // Cathedral bell
            }
          }
        }
      }
      // Stepped Tower Domes & Golden Crosses (Y = 21 to 24)
      for (let dx = -1; dx <= 1; dx++) {
        for (let dz = -1; dz <= 1; dz++) {
          this.setBlock(tx + dx, 21, cz - 12 + dz, 'quartz_block');
        }
      }
      this.setBlock(tx, 22, cz - 12, 'gold_block');
      this.setBlock(tx, 23, cz - 12, 'gold_block'); // Cross
      this.setBlock(tx - 1, 23, cz - 12, 'gold_block');
      this.setBlock(tx + 1, 23, cz - 12, 'gold_block');
      this.setBlock(tx, 24, cz - 12, 'beacon');
    }

    // Stained-Glass Rose Window on Cathedral facade (Y = 7 to 9 at z = cz - 11)
    for (let y = 7; y <= 9; y++) {
      for (let dx = -1; dx <= 1; dx++) {
        this.setBlock(cx + dx, y, cz - 11, (dx === 0 && y === 8) ? 'gold_block' : 'cyber_glass');
      }
    }

    // Altar de los Reyes (Altar of the Kings) in northern interior apse at (cx, cz - 23)
    this.setBlock(cx, 2, cz - 23, 'gold_block');
    this.setBlock(cx, 3, cz - 23, 'gold_block');
    this.setBlock(cx - 1, 3, cz - 23, 'gold_block');
    this.setBlock(cx + 1, 3, cz - 23, 'gold_block');
    this.setBlock(cx, 4, cz - 23, 'sea_lantern');
    this.setBlock(cx - 1, 2, cz - 23, 'lantern');
    this.setBlock(cx + 1, 2, cz - 23, 'lantern');

    this.setBlock(cx, 2, cz - 9, 'quartz_block', {
      type: 'sign',
      title: 'Catedral Metropolitana de México ⛪',
      text: 'Oldest and largest cathedral in the Americas, blending Renaissance, Baroque, and Neoclassical architecture over ancient Tenochtitlan.'
    });

    // 4. Palacio Nacional along West Side of Zócalo
    // Footprint: X in [cx - 24, cx - 13], Z in [cz - 10, cz + 14]
    for (let x = cx - 24; x <= cx - 13; x++) {
      for (let z = cz - 10; z <= cz + 14; z++) {
        const isWall = (x === cx - 24 || x === cx - 13 || z === cz - 10 || z === cz + 14);
        for (let y = 2; y <= 7; y++) {
          if (isWall || y === 7) {
            // Tezontle red stone upper floors and cantera stone base
            this.setBlock(x, y, z, (y <= 3) ? 'terracotta_adobe' : 'red_sandstone');
          }
        }
      }
    }
    // Ground Floor Arched Portico along square (X = cx - 13)
    for (let z = cz - 8; z <= cz + 12; z += 4) {
      this.setBlock(cx - 13, 2, z, 'smooth_stone'); // Open doorway arches
      this.setBlock(cx - 13, 3, z, 'smooth_stone');
    }
    // Balcón Presidencial & Campana de Dolores (Independence Bell) at center (cx - 13, cz)
    this.setBlock(cx - 12, 4, cz, 'gold_block'); // Balcony floor
    this.setBlock(cx - 12, 4, cz - 1, 'iron_block'); // Balcony railing
    this.setBlock(cx - 12, 4, cz + 1, 'iron_block');
    this.setBlock(cx - 13, 6, cz, 'gold_block'); // Campana de Dolores (Bell)
    this.setBlock(cx - 13, 7, cz, 'lantern');

    // Patio Central Inner Courtyard Fountain
    this.setBlock(cx - 18, 2, cz + 2, 'quartz_block');
    this.setBlock(cx - 18, 2, cz + 1, 'water');
    this.setBlock(cx - 18, 2, cz + 3, 'water');

    this.setBlock(cx - 12, 2, cz - 2, 'red_sandstone', {
      type: 'sign',
      title: 'Palacio Nacional · Balcón Presidencial 🔔',
      text: 'Home to the federal government and Diego Rivera’s immortal murals! Every Sept 15, the President rings the historic Campana de Dolores: ¡Viva México!'
    });

    // 5. Colourful Mercado de Artesanías & Street Food Taquería on East Side
    // Taquería "El Zócalo" with Trompo de Pastor at (cx + 14, cz - 6)
    const taqX = cx + 14;
    const taqZ = cz - 6;
    // Taco counter & griddle
    for (let dx = 0; dx <= 4; dx++) {
      this.setBlock(taqX + dx, 2, taqZ, 'smooth_stone');
      this.setBlock(taqX + dx, 4, taqZ, 'redstone_block'); // Striped awning
      this.setBlock(taqX + dx, 4, taqZ + 1, 'quartz_block');
    }
    // Trompo de Pastor (Stacked spiced pork with pineapple top!)
    this.setBlock(taqX + 1, 3, taqZ, 'red_terracotta');
    this.setBlock(taqX + 1, 4, taqZ, 'gold_block'); // Pineapple crown!
    this.setBlock(taqX + 3, 3, taqZ, 'cauldron'); // Salsa bowl
    this.setBlock(taqX + 2, 2, taqZ + 2, 'oak_planks'); // Seating stool
    this.setBlock(taqX + 4, 2, taqZ + 2, 'oak_planks');

    this.setBlock(taqX, 2, taqZ + 2, 'glowstone', {
      type: 'sign',
      title: 'Taquería El Zócalo · Tacos al Pastor 🌮',
      text: 'Authentic CDMX street tacos! Pork marinated in achiote and chiles, carved fresh from the vertical trompo with roasted pineapple and cilantro.'
    });

    // Mercado de Artesanías & Mariachi Stalls at (cx + 14, cz + 4)
    const mktX = cx + 14;
    const mktZ = cz + 4;
    for (let i = 0; i < 3; i++) {
      const sz = mktZ + i * 4;
      for (let dx = 0; dx <= 3; dx++) {
        this.setBlock(mktX + dx, 2, sz, 'oak_fence');
        this.setBlock(mktX + dx, 4, sz, (i === 0) ? 'emerald_block' : (i === 1) ? 'gold_block' : 'amethyst_block');
      }
      this.setBlock(mktX + 1, 3, sz, 'lantern');
    }
    // Talavera ceramic vase display
    this.setBlock(mktX + 1, 2, mktZ + 1, 'lapis_block');
    this.setBlock(mktX + 2, 2, mktZ + 1, 'quartz_block');

    this.setBlock(mktX, 2, mktZ + 2, 'terracotta_adobe', {
      type: 'sign',
      title: 'Mercado de Artesanías & Mariachi 🎺',
      text: 'Vibrant marketplace filled with hand-painted Talavera pottery, embroidered zarapes, silver jewelry, and live Mariachi son jalisciense folk music!'
    });

    // Builder's Arena Terminal in Zócalo
    this.setBlock(cx, 2, cz + 16, 'crafting_table', { type: 'minigame' });
    this.setBlock(cx, 3, cz + 16, 'glowstone', { type: 'minigame' });

    // 6. Chichén Itzá Mesoamerican Step Pyramid (El Castillo) at (-140, 110)
    const pyrX = -140;
    const pyrZ = 110;
    // Carved Stone Plinth Base at Y = 1 (Footprint 36x36)
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
      // Central 4 Symmetrical Staircases ascending each facade
      for (let yOffset = 0; yOffset <= 1; yOffset++) {
        this.setBlock(pyrX, y + yOffset, pyrZ - halfW, 'quartz_block');
        this.setBlock(pyrX, y + yOffset, pyrZ + halfW, 'quartz_block');
        this.setBlock(pyrX - halfW, y + yOffset, pyrZ, 'quartz_block');
        this.setBlock(pyrX + halfW, y + yOffset, pyrZ, 'quartz_block');
      }
    }

    // Carved Feathered Serpent (Kukulcán) Head Balustrades at Base of North Staircase
    this.setBlock(pyrX - 1, 2, pyrZ - 16, 'mossy_stone_bricks');
    this.setBlock(pyrX - 1, 3, pyrZ - 16, 'gold_block'); // Serpent eyes
    this.setBlock(pyrX + 1, 2, pyrZ - 16, 'mossy_stone_bricks');
    this.setBlock(pyrX + 1, 3, pyrZ - 16, 'gold_block');

    // Temple Sanctuary of Kukulcán atop Step Pyramid (Y = 18 to 22)
    const topY = 2 + pyramidSteps * 2;
    for (let x = pyrX - 3; x <= pyrX + 3; x++) {
      for (let z = pyrZ - 3; z <= pyrZ + 3; z++) {
        this.setBlock(x, topY, z, 'smooth_stone');
        const isWall = (Math.abs(x - pyrX) === 3 || Math.abs(z - pyrZ) === 3);
        for (let y = topY + 1; y <= topY + 4; y++) {
          if (isWall || y === topY + 4) {
            // Front door opening on North
            if (z === pyrZ - 3 && Math.abs(x - pyrX) <= 1 && y <= topY + 2) continue;
            this.setBlock(x, y, z, 'stone_bricks');
          }
        }
      }
    }
    // Jaguar Altar in sanctuary
    this.setBlock(pyrX, topY + 1, pyrZ, 'gold_block');
    this.setBlock(pyrX, topY + 2, pyrZ, 'lantern');
    this.setBlock(pyrX, topY + 5, pyrZ, 'gold_block');
    this.setBlock(pyrX, topY + 6, pyrZ, 'beacon'); // Skyward beam of Kukulcán

    this.setBlock(pyrX, 2, pyrZ - 18, 'stone_bricks', {
      type: 'sign',
      title: 'Chichén Itzá · Temple of Kukulcán 🐍',
      text: 'Mesoamerican solar masterpiece engineered so the shadow of the feathered serpent slithers down the northern steps during each equinox!'
    });

    // 7. Natural Mayan Sacred Cenote (Cenote Sagrado) at (-120, 125)
    const cenX = -120;
    const cenZ = 125;
    // Turquoise Sinkhole Pool (Radius 5)
    for (let dx = -5; dx <= 5; dx++) {
      for (let dz = -5; dz <= 5; dz++) {
        const d = Math.hypot(dx, dz);
        if (d <= 4.5) {
          this.setBlock(cenX + dx, 0, cenZ + dz, 'water');
        } else if (d <= 6) {
          // Lush limestone rocky rim
          this.setBlock(cenX + dx, 1, cenZ + dz, (dx + dz) % 2 === 0 ? 'mossy_stone_bricks' : 'stone_bricks');
        }
      }
    }
    // Mayan Secret Offering Chest on cenote rock shelf
    this.setBlock(cenX + 3, 1, cenZ + 3, 'chest', {
      type: 'chest',
      title: 'Sacred Cenote Offering Chest',
      text: 'Sacred Mayan jade carved pendants, obsidian blades, and golden tribute cast into the deep waters of Chaac.'
    });
    // Hanging jungle vegetation around the cenote rim
    this.setBlock(cenX - 3, 2, cenZ - 4, 'leaves');
    this.setBlock(cenX - 3, 3, cenZ - 4, 'leaves');
    this.setBlock(cenX + 4, 2, cenZ - 3, 'leaves');
    this.buildPalmTree(cenX + 5, 1, cenZ + 4);
    this.buildPalmTree(cenX - 5, 1, cenZ - 3);

    this.setBlock(cenX, 2, cenZ - 7, 'stone_bricks', {
      type: 'sign',
      title: 'Cenote Sagrado · Sacred Mayan Sinkhole 💎',
      text: 'Deep natural limestone sinkhole filled with crystal turquoise water, revered as a sacred portal to the underworld by the ancient Maya.'
    });

    // 8. Grand Sandstone Canyon Arch spanning Camino Real into Mexico
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
    // Las Vegas Strip & Broadway Boulevard: X in [97, 104], Z in [-56, 32]
    for (let x = 97; x <= 104; x++) {
      for (let z = -56; z <= 32; z++) {
        this.setBlock(x, 1, z, 'asphalt_road');
        if (x === 100 && Math.abs(z) % 4 <= 1) {
          this.setBlock(x, 1, z, 'smooth_stone');
        }
      }
    }

    // Sidewalks along Vegas Strip & Broadway: West [94, 96], East [105, 108]
    for (let z = -56; z <= 32; z++) {
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

    // Connecting Boulevard directly into Las Vegas Strip & Hollywood Parkway (Z in [-52, -48], X in [104, 138])
    for (let x = 104; x <= 138; x++) {
      for (let z = -52; z <= -48; z++) {
        this.setBlock(x, 1, z, 'asphalt_road');
        if (z === -50 && x % 4 <= 1) this.setBlock(x, 1, z, 'gold_block');
      }
      this.setBlock(x, 1, -53, 'stone_bricks');
      this.setBlock(x, 1, -47, 'stone_bricks');
      if (x % 6 === 0) {
        this.setBlock(x, 2, -53, 'iron_block');
        this.setBlock(x, 3, -53, 'glowstone');
        this.setBlock(x, 2, -47, 'iron_block');
        this.setBlock(x, 3, -47, 'glowstone');
      }
    }

    // Cross Street at Z in [-2, 2], X in [90, 155]
    for (let x = 90; x <= 155; x++) {
      for (let z = -2; z <= 2; z++) {
        this.setBlock(x, 1, z, 'asphalt_road');
      }
    }

    // Crosswalk Zebra Striping across Broadway
    for (const cz of [-52, -30, -3, 3, 30]) {
      for (let x = 97; x <= 104; x++) {
        if (x % 2 === 0) {
          this.setBlock(x, 1, cz, 'smooth_stone');
        }
      }
    }

    // Traffic Light Signals at Intersection
    for (const [tx, tz] of [[96, -3], [105, 3], [96, -30], [105, -30]]) {
      for (let y = 2; y <= 5; y++) this.setBlock(tx, y, tz, 'iron_block');
      this.setBlock(tx + (tx === 96 ? 1 : -1), 5, tz, 'iron_block');
      this.setBlock(tx + (tx === 96 ? 1 : -1), 6, tz, 'redstone_block');
      this.setBlock(tx + (tx === 96 ? 1 : -1), 4, tz, 'emerald_block');
    }

    // Manhattan Subway Station Entrance at (95, -36) outside project promenade
    for (let x = 94; x <= 96; x++) {
      for (let z = -38; z <= -34; z++) {
        if (x === 94 || z === -38 || z === -34) {
          this.setBlock(x, 2, z, 'iron_block');
        }
      }
    }
    this.setBlock(94, 3, -38, 'sea_lantern');
    this.setBlock(94, 3, -34, 'sea_lantern');
    this.setBlock(95, 1, -37, 'smooth_stone');
    this.setBlock(95, 0, -36, 'smooth_stone');
    this.setBlock(95, -1, -35, 'stone_bricks');
    this.setBlock(95, 2, -38, 'glowstone', {
      type: 'sign',
      title: 'Broadway Subway Station',
      text: 'Metropolitan Transit Authority · Lines 1, 2, 3 Neo York Central Subway.'
    });

    // =========================================================================
    // 🎰 LAS VEGAS STRIP CASINO MEGA-SKYSCRAPERS FACING HOLLYWOOD 🎰
    // =========================================================================

    // 1. THE BELLAGIO RESORT & CASINO (West side of the Strip: X in [74, 93], Z in [-25, -7])
    // Soaring 48-block Italianate luxury resort tower with dancing fountain lake & high-roller casino
    const bellagioH = 48;
    for (let x = 74; x <= 93; x++) {
      for (let z = -25; z <= -7; z++) {
        const isPerimeter = (x === 74 || x === 93 || z === -25 || z === -7);
        const isCorner = (x === 74 || x === 93) && (z === -25 || z === -7);

        for (let y = 1; y <= bellagioH; y++) {
          if (isCorner) {
            this.setBlock(x, y, z, (y % 6 === 0) ? 'gold_block' : 'quartz_pillar');
          } else if (isPerimeter) {
            if (x === 93 && y >= 2 && y <= 5 && z >= -18 && z <= -14) {
              // Grand arched hotel lobby portal facing the Strip
              this.setBlock(x, y, z, (y === 5) ? 'gold_block' : 'cyber_glass');
            } else if (y % 4 === 0) {
              this.setBlock(x, y, z, 'quartz_block');
            } else if (y % 8 === 0) {
              this.setBlock(x, y, z, 'lapis_block'); // Signature Bellagio royal blue belt
            } else {
              this.setBlock(x, y, z, 'cyber_glass');
            }
          }
        }
        this.setBlock(x, 1, z, 'smooth_stone');
        this.setBlock(x, bellagioH, z, 'smooth_stone');
      }
    }

    // Bellagio Dancing Fountain Lake in front (X in [88, 93], Z in [-24, -8])
    for (let x = 88; x <= 93; x++) {
      for (let z = -24; z <= -8; z++) {
        if (x === 93 && z >= -18 && z <= -14) continue; // Entrance walk
        this.setBlock(x, 1, z, 'prismarine_bricks');
        this.setBlock(x, 2, z, 'water');
        // Illuminated Fountain Jets shooting skyward
        if ((x + z) % 4 === 0) {
          this.setBlock(x, 2, z, 'sea_lantern');
          this.setBlock(x, 3, z, 'water');
          this.setBlock(x, 4, z, 'sea_lantern');
        }
      }
    }

    // Bellagio Grand Marquee Arch & Golden Chandeliers
    for (let z = -19; z <= -13; z++) {
      this.setBlock(94, 6, z, 'gold_block');
      this.setBlock(94, 7, z, (Math.abs(z - (-16)) <= 1) ? 'sea_lantern' : 'gold_block');
    }
    this.setBlock(94, 4, -16, 'sea_lantern', {
      type: 'sign',
      title: 'The Bellagio Resort & Casino ⭐',
      text: 'Premier Las Vegas Strip luxury casino resort featuring the legendary dancing fountain lake, marble conservatory, and high-roller roulette & blackjack salons.'
    });

    // Bellagio High-Roller Casino Salon inside (X = 84, Z = -16)
    // Emerald felt blackjack tables & gold chip stacks
    for (const [bx, bz] of [[82, -18], [82, -14], [86, -18], [86, -14]]) {
      this.setBlock(bx, 2, bz, 'emerald_block');
      this.setBlock(bx, 3, bz, 'gold_block');
    }
    // Center Roulette Wheel
    this.setBlock(84, 2, -16, 'coal_block');
    this.setBlock(84, 3, -16, 'redstone_block');
    this.setBlock(84, 4, -16, 'gold_block');
    // Research desk preserved inside Bellagio executive suite
    this.setBlock(84, 2, -22, 'crafting_table', { type: 'research', id: 'res-ai' });
    this.setBlock(84, 3, -22, 'bookshelf', { type: 'research', id: 'res-ai' });
    // Soaring Italianate Roof Crown with Golden Pinnacles
    for (let x = 76; x <= 91; x++) {
      for (let z = -23; z <= -9; z++) {
        if ((x + z) % 4 === 0) {
          this.setBlock(x, bellagioH + 1, z, 'quartz_pillar');
          this.setBlock(x, bellagioH + 2, z, 'gold_block');
        }
      }
    }
    this.setBlock(83, bellagioH + 3, -16, 'sea_lantern');
    this.setBlock(84, bellagioH + 3, -16, 'beacon');
    this.setBlock(85, bellagioH + 3, -16, 'sea_lantern');

    // 2. CAESARS PALACE GRAND CASINO & COLOSSEUM (West side facing Hollywood: X in [74, 93], Z in [-52, -28])
    // Classical Roman monumental palace soaring 46 blocks tall with marble colonnades & triumphal arch
    const caesarsH = 46;
    for (let x = 74; x <= 93; x++) {
      for (let z = -52; z <= -28; z++) {
        const isPerimeter = (x === 74 || x === 93 || z === -52 || z === -28);
        const isCorner = (x === 74 || x === 93) && (z === -52 || z === -28);

        for (let y = 1; y <= caesarsH; y++) {
          if (isCorner) {
            this.setBlock(x, y, z, 'quartz_pillar');
          } else if (isPerimeter) {
            if (x === 93 && y <= 6 && z >= -42 && z <= -38) {
              // Grand Roman Triumphal Archway Entrance
              this.setBlock(x, y, z, (y === 6) ? 'gold_block' : 'smooth_stone');
            } else if (x === 93 && (z % 3 === 0)) {
              // Fluted classical facade pillars facing the Strip
              this.setBlock(x, y, z, 'quartz_pillar');
            } else if (y % 4 === 0) {
              this.setBlock(x, y, z, 'quartz_block');
            } else {
              this.setBlock(x, y, z, 'cyber_glass');
            }
          }
        }
        this.setBlock(x, 1, z, 'smooth_stone');
        this.setBlock(x, caesarsH, z, 'smooth_stone');
      }
    }

    // Caesars Palace Colosseum Grand Entrance Marquee & Golden Statues
    for (let z = -43; z <= -37; z++) {
      this.setBlock(94, 7, z, 'gold_block');
      this.setBlock(94, 8, z, ((z + 40) % 2 === 0) ? 'sea_lantern' : 'gold_block');
    }
    this.setBlock(94, 4, -40, 'sea_lantern', {
      type: 'sign',
      title: 'Caesars Palace · Grand Casino & Colosseum 🏛️',
      text: 'Iconic Roman-themed Las Vegas mega-resort! Marble colonnades, Colosseum entertainment arena, royal craps tables, and empire casino gaming.'
    });

    // Roman Royal Gaming Arena inside Caesars Palace (X = 84, Z = -40)
    for (const [cx, cz] of [[81, -43], [81, -37], [87, -43], [87, -37]]) {
      this.setBlock(cx, 2, cz, 'quartz_pillar');
      this.setBlock(cx, 3, cz, 'gold_block');
      this.setBlock(cx, 4, cz, 'sea_lantern');
    }
    // Craps dice table & golden jackpot chest
    this.setBlock(84, 2, -40, 'redstone_block');
    this.setBlock(84, 3, -40, 'gold_block');
    this.setBlock(84, 2, -39, 'chest', {
      type: 'chest',
      title: 'Caesars Imperial Fortune Vault',
      text: 'High-roller jackpot tokens, gold coins, and VIP casino chips.'
    });
    // Caesars Palace Tiered Imperial Pediment Crown
    for (let y = caesarsH + 1; y <= caesarsH + 5; y++) {
      const inset = (y - caesarsH);
      for (let x = 74 + inset; x <= 93 - inset; x++) {
        this.setBlock(x, y, -52 + inset, 'gold_block');
        this.setBlock(x, y, -28 - inset, 'gold_block');
      }
    }
    this.setBlock(83, caesarsH + 6, -40, 'beacon');

    // 3. THE VENETIAN RESORT, CASINO & ST. MARK'S CAMPANILE (East side: X in [112, 128], Z in [-25, -7])
    // Soaring 54-block Venetian Gothic marvel with outdoor canal, arched bridges, and replica St. Mark's Campanile
    const venetianH = 38;
    for (let x = 112; x <= 128; x++) {
      for (let z = -25; z <= -7; z++) {
        const isPerimeter = (x === 112 || x === 128 || z === -25 || z === -7);
        const isCorner = (x === 112 || x === 128) && (z === -25 || z === -7);

        for (let y = 1; y <= venetianH; y++) {
          if (isCorner) {
            this.setBlock(x, y, z, 'sandstone');
          } else if (isPerimeter) {
            if (x === 112 && (z % 3 === 0)) {
              this.setBlock(x, y, z, (y % 4 === 0) ? 'emerald_block' : 'sandstone');
            } else if (y % 3 === 0) {
              this.setBlock(x, y, z, 'quartz_block');
            } else {
              this.setBlock(x, y, z, 'cyber_glass');
            }
          }
        }
        this.setBlock(x, 1, z, 'smooth_stone');
        this.setBlock(x, venetianH, z, 'smooth_stone');
      }
    }

    // St. Mark's Campanile Tower (X in [113, 117], Z in [-10, -6], Soaring to Y = 54!)
    for (let x = 113; x <= 117; x++) {
      for (let z = -10; z <= -6; z++) {
        for (let y = 1; y <= 50; y++) {
          const isCampCorner = (x === 113 || x === 117) && (z === -10 || z === -6);
          this.setBlock(x, y, z, isCampCorner ? 'sandstone' : 'terracotta_adobe');
        }
      }
    }
    // Campanile Open Bell Loggia at Y = 46 to 50
    for (let y = 46; y <= 50; y++) {
      this.setBlock(115, y, -8, (y === 48) ? 'gold_block' : 'sea_lantern');
    }
    // Campanile Pyramidal Roof with Golden Angel Beacon
    for (let py = 51; py <= 54; py++) {
      const pinset = (py - 51);
      for (let x = 113 + pinset; x <= 117 - pinset; x++) {
        for (let z = -10 + pinset; z <= -6 - pinset; z++) {
          this.setBlock(x, py, z, 'prismarine_bricks');
        }
      }
    }
    this.setBlock(115, 55, -8, 'beacon');

    // Venetian Grand Canal Basin facing the sidewalk
    for (let z = -24; z <= -12; z++) {
      this.setBlock(110, 1, z, 'prismarine_bricks');
      this.setBlock(110, 2, z, 'water');
      if (z === -18) {
        // Arched Rialto Stone Bridge
        this.setBlock(110, 3, z, 'smooth_stone');
      }
    }

    this.setBlock(111, 4, -16, 'sea_lantern', {
      type: 'sign',
      title: 'The Venetian Resort & Casino · Las Vegas 🎭',
      text: 'Opulent Renaissance Italian resort featuring the Grand Canal gondolas, replica St. Mark\'s Campanile belltower, and lavish casino salons.'
    });

    // 4. THE LUXOR PYRAMID & SKY BEAM CASINO (East side facing Hollywood: X in [110, 128], Z in [-52, -28])
    // 42-block stepped obsidian & black glass pyramid with sky-piercing apex beacon shooting into outer space
    const luxorBaseX1 = 110;
    const luxorBaseX2 = 128;
    const luxorBaseZ1 = -52;
    const luxorBaseZ2 = -28;
    const luxorApexY = 42;

    for (let ly = 1; ly <= luxorApexY; ly++) {
      const inset = Math.floor((ly - 1) * 0.22);
      const xMin = luxorBaseX1 + inset;
      const xMax = luxorBaseX2 - inset;
      const zMin = luxorBaseZ1 + inset;
      const zMax = luxorBaseZ2 - inset;

      if (xMin > xMax || zMin > zMax) break;

      for (let x = xMin; x <= xMax; x++) {
        for (let z = zMin; z <= zMax; z++) {
          const isEdge = (x === xMin || x === xMax || z === zMin || z === zMax);
          if (isEdge) {
            if ((x + z + ly) % 7 === 0) {
              this.setBlock(x, ly, z, 'gold_block');
            } else if ((x + z) % 5 === 0) {
              this.setBlock(x, ly, z, 'sea_lantern');
            } else {
              this.setBlock(x, ly, z, 'obsidian');
            }
          }
        }
      }
    }

    // Luxor Apex Sky Beam: Pillar of Light Piercing the Stratosphere at (119, -40)
    for (let y = luxorApexY; y <= luxorApexY + 8; y++) {
      this.setBlock(119, y, -40, (y % 2 === 0) ? 'beacon' : 'sea_lantern');
    }

    // Luxor Sphinx Portal Entrance facing the avenue
    this.setBlock(109, 2, -41, 'sandstone');
    this.setBlock(109, 3, -41, 'gold_block');
    this.setBlock(109, 2, -39, 'sandstone');
    this.setBlock(109, 3, -39, 'gold_block');
    this.setBlock(109, 4, -40, 'sea_lantern', {
      type: 'sign',
      title: 'The Luxor Pyramid Resort & Casino 🌌',
      text: 'Massive 30-story obsidian pyramid crowned with the most powerful beam of light on Earth! Egyptian pharaoh tomb casino, sarcophagus vaults, and ancient gaming oasis.'
    });

    // 5. THE GOLDEN NUGGET & FREMONT STREET NEON CANOPY (North Intersection: X in [96, 105], Z in [-58, -53])
    // Shimmering 44-block solid gold tower with flashing neon border strips overlooking the Hollywood turn-out
    const nuggetH = 44;
    for (let x = 96; x <= 105; x++) {
      for (let z = -58; z <= -53; z++) {
        const isPerimeter = (x === 96 || x === 105 || z === -58 || z === -53);
        for (let y = 1; y <= nuggetH; y++) {
          if (isPerimeter) {
            if (y % 4 === 0) {
              this.setBlock(x, y, z, 'sea_lantern');
            } else if (y % 6 === 0) {
              this.setBlock(x, y, z, 'redstone_block');
            } else {
              this.setBlock(x, y, z, 'gold_block');
            }
          }
        }
        this.setBlock(x, 1, z, 'gold_block');
        this.setBlock(x, nuggetH, z, 'gold_block');
      }
    }

    // Golden Nugget Fremont Street Arch Canopy across Broadway
    for (let x = 96; x <= 105; x++) {
      this.setBlock(x, 6, -53, ((x % 2 === 0) ? 'sea_lantern' : 'redstone_block'));
      this.setBlock(x, 7, -53, 'gold_block');
    }
    this.setBlock(100, 3, -52, 'sea_lantern', {
      type: 'sign',
      title: 'Golden Nugget Hotel & Casino · Vegas Glory 💰',
      text: 'Historic Las Vegas casino legend famous for the world-record Hand of Faith gold nugget (61 lbs) and electric Fremont Street neon canopy action!'
    });

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

    // Skyscraper 3: Times Square Media Wall South (X in [109, 114], Z in [2, 26])
    const h3 = 18;
    for (let x = 109; x <= 114; x++) {
      for (let z = 2; z <= 26; z++) {
        const isPerimeter = (x === 109 || x === 114 || z === 2 || z === 26);
        for (let y = 1; y <= h3; y++) {
          if (isPerimeter) {
            this.setBlock(x, y, z, (y % 4 === 0) ? 'stone_bricks' : 'cyber_glass');
          }
        }
        this.setBlock(x, 1, z, 'smooth_stone');
        this.setBlock(x, h3, z, 'smooth_stone');
      }
    }

    // =========================================================================
    // 🌟 PROJECT INNOVATION PROMENADE: CLEAR, WIDE & UNOBSTRUCTED ACCESS 🌟
    // =========================================================================
    // Completely empty concourse across X in [94, 110], Z in [-28, 28] with zero vehicles, clutter, or roadblocks
    for (let x = 94; x <= 110; x++) {
      for (let z = -28; z <= 28; z++) {
        // Pristine smooth stone walking concourse
        this.setBlock(x, 1, z, 'smooth_stone');
        // Architectural stone brick borders and glowing ground navigation lines
        if (x === 94 || x === 110 || z === -28 || z === 28) {
          this.setBlock(x, 1, z, 'stone_bricks');
        } else if (x === 96 && Math.abs(z) % 4 === 0) {
          this.setBlock(x, 1, z, 'sea_lantern');
        }
      }
    }

    // Grand Illuminated Entrance Archways at North (Z = -28) and South (Z = 28)
    for (const az of [-28, 28]) {
      for (const px of [97, 104]) {
        for (let y = 2; y <= 5; y++) {
          this.setBlock(px, y, az, 'quartz_pillar');
        }
        this.setBlock(px, 6, az, 'sea_lantern');
      }
      for (let x = 97; x <= 104; x++) {
        this.setBlock(x, 6, az, (x % 2 === 0) ? 'gold_block' : 'quartz_block');
      }
      this.setBlock(100, 6, az, 'glowstone', {
        type: 'sign',
        title: 'Project Innovation Promenade ⭐',
        text: 'Lakshya\'s Featured Software Engineering Showcase · Direct Unobstructed Access · Walk up to any Pedestal and press [E] to launch interactive showcase.'
      });
    }

    // 5 Interactive Project Showcases with Dedicated Red Carpet Approaches at X = 107
    const projectPedestals = [
      { id: 'todar', z: -20, block: 'emerald_block', title: 'Todar AI Autonomous Agent Platform', desc: 'Multi-agent autonomous coding system and intelligence framework.' },
      { id: 'trackyourflight', z: -10, block: 'diamond_block', title: 'Track Your Flight 3D Global Radar', desc: 'Live aircraft tracking with real-time 3D flight telemetry.' },
      { id: 'locateart', z: 0, block: 'gold_block', title: 'LocateArt High-Resolution Visual Discovery', desc: 'Art exploration and cultural artifact curation engine.' },
      { id: 'redgambit', z: 10, block: 'redstone_block', title: 'Red Gambit Autonomous Strategy Network', desc: 'High-frequency strategic simulation and autonomous decision agents.' },
      { id: 'spiderverse', z: 20, block: 'amethyst_block', title: 'Spider-Verse Multiverse Interactive Web Experience', desc: 'Interactive three-dimensional comic experience with physics & audio.' }
    ];

    projectPedestals.forEach(p => {
      // 2-wide Red Carpet Runner connecting from main promenade walk (X = 98) across to pedestal (X = 106)
      for (let x = 98; x <= 106; x++) {
        this.setBlock(x, 1, p.z - 1, 'gold_block');
        this.setBlock(x, 1, p.z, 'red_terracotta');
        this.setBlock(x, 1, p.z + 1, 'gold_block');
      }

      // 3x3 Polished Quartz Display Plinth with glowing trim
      for (let dx = -1; dx <= 1; dx++) {
        for (let dz = -1; dz <= 1; dz++) {
          const isEdge = (Math.abs(dx) === 1 || Math.abs(dz) === 1);
          this.setBlock(107 + dx, 1, p.z + dz, isEdge ? 'quartz_pillar' : 'gold_block');
        }
      }

      // Interactive Project Pedestal Pillar (360-degree clear walking clearance on all sides)
      this.setBlock(107, 2, p.z, p.block, { type: 'project', id: p.id });
      this.setBlock(107, 3, p.z, 'glowstone', { type: 'project', id: p.id });

      // Holographic Terminal Information Sign Plaque in front of Pedestal
      this.setBlock(105, 2, p.z, 'quartz_pillar');
      this.setBlock(105, 3, p.z, 'sea_lantern', {
        type: 'sign',
        title: `${p.title} 🚀`,
        text: `${p.desc} Press [E] on the pedestal to open full project details and live demo.`
      });
    });

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

    // Hollywood Mountain & Illuminated Block-Built Sign at (165, -100)
    this.buildHollywoodMountain(165, -100);


    // Dazzling Las Vegas Boulevard connecting Hollywood and Lak Tower
    this.buildVegasStripInFrontOfHollywoodAndLKTower();
  }

  // 7B. Dazzling Las Vegas Boulevard in front of Hollywood and LK Tower
  private buildVegasStripInFrontOfHollywoodAndLKTower() {
    // 1. The Grand Boulevard Avenue connecting Hollywood (165, -100) to Lak Tower (150, 0)
    // Roadway: X in [136, 144], Z in [-54, 4]
    for (let x = 136; x <= 144; x++) {
      for (let z = -54; z <= 4; z++) {
        this.setBlock(x, 1, z, 'asphalt_road');
        // Double-yellow highway divider lines in center
        if (x === 140 && Math.abs(z) % 4 <= 1) {
          this.setBlock(x, 1, z, 'gold_block');
        }
      }
    }

    // Zebra Crosswalks at Hollywood Entrance (Z = -52) and Lak Tower Plaza (Z = 2)
    for (const cz of [-52, -26, 2]) {
      for (let x = 136; x <= 144; x++) {
        if (x % 2 === 0) {
          this.setBlock(x, 1, cz, 'smooth_stone');
        }
      }
    }

    // 2. Wide Promenade Sidewalks with Walk of Fame Stars
    for (let z = -54; z <= 4; z++) {
      for (let x = 133; x <= 135; x++) this.setBlock(x, 1, z, 'stone_bricks');
      for (let x = 145; x <= 147; x++) this.setBlock(x, 1, z, 'stone_bricks');
      // Walk of Fame brass stars embedded along both sidewalks
      if (Math.abs(z) % 3 === 0) {
        this.setBlock(134, 1, z, 'gold_block');
        this.setBlock(146, 1, z, 'gold_block');
      }
      // Pulsing neon light pylons every 8 blocks
      if (Math.abs(z) % 8 === 0) {
        this.setBlock(133, 2, z, 'iron_block');
        this.setBlock(133, 3, z, (z % 16 === 0) ? 'redstone_block' : 'lapis_block');
        this.setBlock(133, 4, z, 'sea_lantern');

        this.setBlock(147, 2, z, 'iron_block');
        this.setBlock(147, 3, z, (z % 16 === 0) ? 'lapis_block' : 'redstone_block');
        this.setBlock(147, 4, z, 'sea_lantern');
      }
    }

    // 3. Tall Royal Palm Trees Lining the Vegas Strip on Both Sides
    const palmZCoords = [-50, -42, -34, -26, -18, -10, -2];
    for (const pz of palmZCoords) {
      // West Sidewalk Palms (X = 133)
      for (let y = 1; y <= 5; y++) this.setBlock(133, y, pz, 'jungle_log');
      this.setBlock(133, 5, pz, 'sea_lantern'); // Ambient glow under crown
      for (let dx = -1; dx <= 1; dx++) {
        for (let dz = -1; dz <= 1; dz++) {
          this.setBlock(133 + dx, 6, pz + dz, 'oak_leaves');
        }
      }

      // East Sidewalk Palms (X = 147)
      for (let y = 1; y <= 5; y++) this.setBlock(147, y, pz, 'jungle_log');
      this.setBlock(147, 5, pz, 'sea_lantern');
      for (let dx = -1; dx <= 1; dx++) {
        for (let dz = -1; dz <= 1; dz++) {
          this.setBlock(147 + dx, 6, pz + dz, 'oak_leaves');
        }
      }
    }

    // 4. Iconic "Welcome to Fabulous Las Vegas" Landmark Neon Sign at (140, -52)
    for (const px of [138, 142]) {
      for (let y = 1; y <= 5; y++) {
        this.setBlock(px, y, -52, 'gold_block');
      }
    }
    // Diamond Lozenge Neon Arch
    for (let x = 137; x <= 143; x++) {
      for (let y = 6; y <= 8; y++) {
        const isFrame = (x === 137 || x === 143 || y === 6 || y === 8);
        this.setBlock(x, y, -52, isFrame ? 'sea_lantern' : 'gold_block');
      }
    }
    this.setBlock(140, 9, -52, 'beacon');
    this.setBlock(140, 7, -52, 'glowstone', {
      type: 'sign',
      title: 'WELCOME TO Fabulous LAS VEGAS NEVADA ⭐',
      text: 'The Entertainment Capital of the World · Connecting Hollywood Boulevard to LK Tower. High-roller casinos, world-class shows & dancing fountains.'
    });

    // 5. The Bellagio Dancing Fountain Lake (West Side: X in [122, 132], Z in [-38, -18])
    for (let x = 122; x <= 132; x++) {
      for (let z = -38; z <= -18; z++) {
        const isPerimeter = (x === 122 || x === 132 || z === -38 || z === -18);
        this.setBlock(x, 1, z, isPerimeter ? 'prismarine_bricks' : 'water');
      }
    }
    // High-Pressure Illuminated Fountain Water Jets shooting up to Y = 5
    const fountainJets = [
      [127, -28], [125, -23], [129, -33], [127, -20], [125, -34], [129, -23]
    ];
    for (const [fx, fz] of fountainJets) {
      this.setBlock(fx, 1, fz, 'sea_lantern');
      this.setBlock(fx, 2, fz, 'water');
      this.setBlock(fx, 3, fz, 'water');
      this.setBlock(fx, 4, fz, 'sea_lantern');
    }
    // Bellagio Luxury Resort Frontage & Arched Colonnade behind the lake
    for (let z = -36; z <= -20; z++) {
      for (let y = 1; y <= 12; y++) {
        if (z % 3 === 0) {
          this.setBlock(121, y, z, 'quartz_pillar');
        } else {
          this.setBlock(121, y, z, (y % 4 === 0) ? 'gold_block' : 'cyber_glass');
        }
      }
    }
    this.setBlock(132, 2, -28, 'gold_block', {
      type: 'sign',
      title: 'The Bellagio Resort & Casino ⭐',
      text: 'Premier Las Vegas Strip luxury resort featuring the legendary dancing fountain lake, marble conservatory, and high-roller roulette & blackjack salons.'
    });

    // 6. Caesars Palace Roman Colosseum & Colonnade (West Side: X in [122, 132], Z in [-16, -2])
    for (let z = -16; z <= -2; z += 4) {
      for (let y = 1; y <= 8; y++) {
        this.setBlock(132, y, z, 'quartz_pillar');
      }
      this.setBlock(132, 9, z, 'gold_block');
    }
    for (let z = -16; z <= -2; z++) {
      this.setBlock(132, 9, z, 'smooth_stone');
      this.setBlock(131, 9, z, 'smooth_stone');
    }
    this.setBlock(132, 2, -9, 'sea_lantern', {
      type: 'sign',
      title: 'Caesars Palace Grand Casino & Colosseum 🏛️',
      text: 'Imperial Roman palace resort with lavish marble colonnades, high-stakes casino tables, and the world-renowned Colosseum theatre.'
    });

    // 7. The Luxor Obsidian Pyramid & Sky Beam (East Side: X in [148, 162], Z in [-45, -25])
    const luxorApexY = 22;
    for (let ly = 1; ly <= luxorApexY; ly++) {
      const inset = Math.floor((ly - 1) * 0.45);
      const xMin = 148 + inset;
      const xMax = 162 - inset;
      const zMin = -45 + inset;
      const zMax = -25 - inset;
      if (xMin > xMax || zMin > zMax) break;
      for (let x = xMin; x <= xMax; x++) {
        for (let z = zMin; z <= zMax; z++) {
          if (x === xMin || x === xMax || z === zMin || z === zMax) {
            this.setBlock(x, ly, z, ((x + z + ly) % 5 === 0) ? 'gold_block' : 'obsidian');
          }
        }
      }
    }
    // Luxor Sky Beam shooting into the stratosphere at (155, -35)
    for (let y = luxorApexY; y <= luxorApexY + 12; y++) {
      this.setBlock(155, y, -35, (y % 2 === 0) ? 'beacon' : 'sea_lantern');
    }
    this.setBlock(148, 2, -35, 'gold_block', {
      type: 'sign',
      title: 'The Luxor Pyramid Resort & Casino 🌌',
      text: 'Massive obsidian pyramid crowned with the most powerful beam of light on Earth! Egyptian pharaoh tomb casino and ancient gaming oasis.'
    });

    // 8. The Venetian St. Mark's Campanile & Grand Canal (East Side: X in [148, 158], Z in [-22, -6])
    // Turquoise Gondola Canal Basin
    for (let z = -22; z <= -8; z++) {
      this.setBlock(148, 1, z, 'prismarine_bricks');
      this.setBlock(148, 2, z, 'water');
      if (z === -15) this.setBlock(148, 3, z, 'smooth_stone'); // Arched Rialto bridge
    }
    // St. Mark's Campanile Bell Tower
    for (let x = 152; x <= 155; x++) {
      for (let z = -16; z <= -13; z++) {
        for (let y = 1; y <= 24; y++) {
          this.setBlock(x, y, z, (y > 20) ? 'quartz_pillar' : 'red_terracotta');
        }
      }
    }
    this.setBlock(153, 25, -15, 'gold_block');
    this.setBlock(153, 26, -15, 'beacon');
    this.setBlock(148, 2, -15, 'sea_lantern', {
      type: 'sign',
      title: 'The Venetian Resort & Casino · Las Vegas 🎭',
      text: 'Opulent Renaissance Italian resort featuring the Grand Canal gondolas, replica St. Mark\'s Campanile belltower, and lavish casino salons.'
    });

    // 9. Golden Nugget & Flamingo Vintage Neon Marquees (138, -48)
    this.setBlock(137, 2, -48, 'emerald_block'); // Blackjack table
    this.setBlock(137, 3, -48, 'gold_block'); // Chip stack
    this.setBlock(143, 2, -48, 'emerald_block');
    this.setBlock(143, 3, -48, 'gold_block');
    this.setBlock(140, 2, -48, 'redstone_block'); // Center roulette wheel
    this.setBlock(140, 3, -48, 'gold_block');
    this.setBlock(140, 4, -48, 'sea_lantern', {
      type: 'sign',
      title: 'Golden Nugget & Flamingo Vintage Casino 🎰',
      text: 'Classic downtown Las Vegas vintage neon casino! High payout slot machines, lucky roulette, and 24/7 blackjack salons.'
    });

    // 10. Hollywood & Premiere Sky Searchlights
    for (const [sx, sz] of [[133, -52], [147, -52], [133, 2], [147, 2]]) {
      this.setBlock(sx, 2, sz, 'beacon');
      this.setBlock(sx, 3, sz, 'sea_lantern');
    }
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
    this.buildNeoYorkStation(116, 28);
    this.buildSouthCoastStation(24, 88);
    this.buildCitadelStation(8, 22);
    this.buildAirport(125, 75);
    this.buildCityZoo(-65, 0);
    this.buildEnchantedCastleWoodland(-45, -30);
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
    // 1. Covered Front Boardwalk Porch & Hitching Post (X in [6, 16], Z in [50, 52])
    for (let x = 6; x <= 16; x++) {
      for (let z = 50; z <= 52; z++) {
        this.setBlock(x, 1, z, 'oak_planks'); // Boardwalk decking
      }
    }
    // Hitching post & horse water trough
    for (let x = 7; x <= 15; x++) {
      this.setBlock(x, 2, 50, (x === 7 || x === 11 || x === 15) ? 'spruce_log' : 'oak_fence');
    }
    this.setBlock(8, 2, 51, 'cauldron'); // Water trough
    this.setBlock(8, 2, 51, 'water');
    // Front porch roof posts & awning
    for (const px of [6, 11, 16]) {
      for (let y = 2; y <= 5; y++) {
        this.setBlock(px, y, 52, 'spruce_log');
      }
      this.setBlock(px, 5, 51, 'lantern');
    }
    for (let x = 6; x <= 16; x++) {
      this.setBlock(x, 5, 51, 'spruce_log');
      this.setBlock(x, 5, 50, 'oak_planks');
    }

    // 2. Western False-Front Facade & Main Saloon Structure (X in [6, 16], Z in [52, 66])
    for (let x = 6; x <= 16; x++) {
      for (let z = 52; z <= 66; z++) {
        this.setBlock(x, 1, z, 'oak_planks'); // Saloon wood plank floor

        const isPerimeter = (x === 6 || x === 16 || z === 52 || z === 66);
        const isCorner = (x === 6 || x === 16) && (z === 52 || z === 66);

        if (isPerimeter) {
          for (let y = 2; y <= 7; y++) {
            // Front double entrance doorway (X in [10, 11], Z = 52, Y in [2, 3])
            const isFrontDoor = z === 52 && (x === 10 || x === 11) && y <= 3;
            // Back ocean patio doorway (X in [10, 11], Z = 66, Y in [2, 3])
            const isBackDoor = z === 66 && (x === 10 || x === 11) && y <= 3;
            // Windows
            const isWindow = (y === 3 || y === 6) && (
              (z === 52 && (x === 8 || x === 14)) ||
              (x === 6 && (z === 56 || z === 62)) ||
              (x === 16 && (z === 56 || z === 62))
            );

            if (isFrontDoor || isBackDoor) {
              continue; // Open doorway
            } else if (isWindow) {
              this.setBlock(x, y, z, 'glass');
            } else if (isCorner) {
              this.setBlock(x, y, z, 'spruce_log');
            } else {
              this.setBlock(x, y, z, (y === 5) ? 'spruce_log' : 'oak_planks');
            }
          }
        }
        // Main roof at Y = 8
        this.setBlock(x, 8, z, 'cobblestone');
      }
    }

    // Classic Western Stepped False-Front Parapet on Front Facade (Z = 52, Y = 8 to 11)
    for (let x = 6; x <= 16; x++) {
      const stepH = (x >= 9 && x <= 13) ? 11 : (x >= 8 && x <= 14) ? 10 : 9;
      for (let y = 8; y <= stepH; y++) {
        this.setBlock(x, y, 52, (y === stepH) ? 'spruce_log' : 'oak_planks');
      }
    }
    // Saloon Name Sign
    this.setBlock(11, 10, 51, 'gold_block');
    this.setBlock(10, 10, 51, 'sea_lantern');
    this.setBlock(12, 10, 51, 'sea_lantern');
    this.setBlock(11, 2, 51, 'glowstone', {
      type: 'sign',
      title: 'The Sunset Saloon & Beach Bar 🤠🍻',
      text: 'Authentic 1880s frontier saloon! Cold sarsaparilla, honky-tonk piano, high-stakes poker tables, and an oceanfront boardwalk deck.'
    });

    // 3. Horseshoe Polished Mahogany Bar & Taps (X in [7, 10], Z in [55, 60])
    for (let z = 55; z <= 60; z++) {
      this.setBlock(7, 2, z, 'spruce_log'); // Bar front counter
      this.setBlock(7, 3, z, (z === 57 || z === 58) ? 'iron_block' : 'oak_planks'); // Draft beer taps
      this.setBlock(8, 2, z, 'oak_fence'); // Bar stools
    }
    for (let x = 7; x <= 9; x++) {
      this.setBlock(x, 2, 55, 'spruce_log');
      this.setBlock(x, 2, 60, 'spruce_log');
    }
    // Mirrored Back-Bar & Glowing Bottle Shelves (along wall X = 6)
    for (let z = 55; z <= 60; z++) {
      this.setBlock(6, 2, z, 'bookshelf');
      this.setBlock(6, 3, z, (z % 2 === 0) ? 'sea_lantern' : 'glass'); // Glowing liquor bottles
      this.setBlock(6, 4, z, 'bookshelf');
    }

    // 4. Honky-Tonk Saloon Upright Piano at (14, 55)
    this.setBlock(14, 2, 55, 'spruce_log'); // Piano body
    this.setBlock(15, 2, 55, 'spruce_log');
    this.setBlock(14, 3, 55, 'spruce_log');
    this.setBlock(15, 3, 55, 'bookshelf'); // Sheet music rack
    this.setBlock(14, 2, 56, 'quartz_block'); // Ivory piano keys
    this.setBlock(15, 2, 56, 'coal_block');   // Ebony keys
    this.setBlock(14, 2, 57, 'oak_fence');    // Piano stool

    // 5. Green Felt Poker Tables & Chairs
    // Table 1 at (13, 60)
    this.setBlock(13, 2, 60, 'oak_fence');
    this.setBlock(13, 3, 60, 'emerald_block'); // Green baize felt
    this.setBlock(12, 2, 60, 'oak_stairs');
    this.setBlock(14, 2, 60, 'oak_stairs');
    this.setBlock(13, 2, 59, 'oak_stairs');
    this.setBlock(13, 2, 61, 'oak_stairs');

    // 6. Grand Stone Fireplace & Roaring Hearth (North-West corner at X = 7, Z = 64)
    for (let y = 2; y <= 11; y++) {
      this.setBlock(7, y, 64, 'stone_bricks');
      this.setBlock(7, y, 65, 'stone_bricks');
      this.setBlock(8, y, 65, 'stone_bricks');
    }
    this.setBlock(8, 2, 64, 'magma_block'); // Roaring fire
    this.setBlock(8, 3, 64, 'glowstone');
    this.setBlock(8, 4, 64, 'stone_bricks'); // Fireplace mantel

    // 7. Interactive Portfolio & Interest Hubs (Preserved triggers)
    this.setBlock(10, 2, 58, 'crafting_table', { type: 'interests' });
    this.setBlock(10, 3, 58, 'bookshelf', { type: 'interests' });

    // 8. Overhead Wagon-Wheel Chandelier at (11, 6, 59)
    this.setBlock(11, 7, 59, 'iron_block'); // Hanging chain
    this.setBlock(11, 6, 59, 'spruce_log');  // Wheel hub
    this.setBlock(10, 6, 59, 'oak_fence');
    this.setBlock(12, 6, 59, 'oak_fence');
    this.setBlock(11, 6, 58, 'oak_fence');
    this.setBlock(11, 6, 60, 'oak_fence');
    this.setBlock(10, 6, 58, 'lantern');
    this.setBlock(12, 6, 58, 'lantern');
    this.setBlock(10, 6, 60, 'lantern');
    this.setBlock(12, 6, 60, 'lantern');

    // 9. Upper Mezzanine Balcony Gallery (Y = 5, X in [12, 15], Z in [62, 65])
    for (let x = 12; x <= 15; x++) {
      for (let z = 62; z <= 65; z++) {
        this.setBlock(x, 5, z, 'oak_planks'); // Balcony floor
      }
      this.setBlock(x, 6, 62, 'oak_fence'); // Safety railing
    }
    for (let z = 62; z <= 65; z++) {
      this.setBlock(12, 6, z, 'oak_fence');
    }
    // Wooden staircase leading up to mezzanine
    for (let step = 0; step <= 3; step++) {
      this.setBlock(15, 2 + step, 58 + step, 'oak_planks');
    }

    // 10. Oceanfront Outdoor Patio Deck (X in [17, 24], Z in [54, 66])
    for (let x = 17; x <= 24; x++) {
      for (let z = 54; z <= 66; z++) {
        this.setBlock(x, 1, z, 'oak_planks');
        const isBorder = (x === 24 || z === 54 || z === 66);
        if (isBorder) {
          this.setBlock(x, 2, z, 'stone_bricks');
          if ((x + z) % 3 === 0) {
            this.setBlock(x, 3, z, 'lantern');
          }
        }
      }
    }
    // Patio Sun Umbrella Tables
    for (const [ux, uz] of [[20, 57], [20, 63]]) {
      this.setBlock(ux, 2, uz, 'oak_fence');
      this.setBlock(ux, 3, uz, 'oak_fence');
      this.setBlock(ux, 4, uz, 'gold_block'); // Umbrella canopy center
      this.setBlock(ux - 1, 4, uz, 'red_terracotta');
      this.setBlock(ux + 1, 4, uz, 'red_terracotta');
      this.setBlock(ux, 4, uz - 1, 'red_terracotta');
      this.setBlock(ux, 4, uz + 1, 'red_terracotta');
      // Chairs
      this.setBlock(ux - 1, 2, uz, 'oak_stairs');
      this.setBlock(ux + 1, 2, uz, 'oak_stairs');
    }
  }

  // 11. Palm Paradise Beach, Wooden Pier & The Merlion
  private buildPalmBeachAndOcean() {
    this.setBlock(-5, 1, 88, 'smooth_stone');
    this.setBlock(-5, 2, 88, 'gold_block', { type: 'chest' });
    this.setBlock(-5, 3, 88, 'glowstone', { type: 'chest' });
    this.setBlock(-5, 1, 89, 'smooth_stone');
    this.setBlock(-5, 2, 89, 'glowstone', {
      type: 'sign',
      title: 'Ancient Dungeon Treasure Vault',
      text: "Open to inspect ancient relics, enchanted tools, and legendary loot."
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
    // Coastal Rocks for Tuxedo Cat at (10, 82)
    this.setBlock(10, 2, 82, 'smooth_stone');
    this.setBlock(11, 2, 82, 'smooth_stone');
    this.setBlock(10, 2, 83, 'stone_bricks');
  }

  // 12. Flora & Tree Helpers
  private buildNatureAndFlora() {
    // Floral Garden Parterres, Rose Pergolas & Topiaries in Heartland Parklands
    const gardenSites = [
      { x: -18, z: -26 },
      { x: 18, z: -26 },
      { x: -18, z: 26 },
      { x: 18, z: 26 },
      { x: -28, z: -14 },
      { x: 28, z: -14 },
      { x: -28, z: 14 },
      { x: 28, z: 14 }
    ];

    for (const site of gardenSites) {
      // 5x5 Stone Rimmed Flower Parterre Basin
      for (let dx = -2; dx <= 2; dx++) {
        for (let dz = -2; dz <= 2; dz++) {
          const isRim = Math.abs(dx) === 2 || Math.abs(dz) === 2;
          const gx = site.x + dx;
          const gz = site.z + dz;
          if (isRim) {
            this.setBlock(gx, 1, gz, 'stone_bricks');
          } else {
            this.setBlock(gx, 1, gz, 'grass');
            // Colorful floral blooms
            const pat = (Math.abs(dx) + Math.abs(dz)) % 4;
            const flower = (pat === 0) ? 'redstone_block' : (pat === 1) ? 'gold_block' : (pat === 2) ? 'amethyst_block' : 'lapis_block';
            this.setBlock(gx, 2, gz, flower);
          }
        }
      }
      // Center Topiary Urn with glowing garden lamp
      this.setBlock(site.x, 2, site.z, 'quartz_pillar');
      this.setBlock(site.x, 3, site.z, 'leaves');
      this.setBlock(site.x, 4, site.z, 'lantern');
    }

    // Romantic Rose Trellis Pergola Walkway at (-24, 0)
    for (let z = -4; z <= 4; z++) {
      this.setBlock(-24, 1, z, 'smooth_stone');
      if (Math.abs(z) % 2 === 0) {
        this.setBlock(-26, 2, z, 'oak_fence');
        this.setBlock(-26, 3, z, 'oak_fence');
        this.setBlock(-26, 4, z, 'leaves');
        this.setBlock(-22, 2, z, 'oak_fence');
        this.setBlock(-22, 3, z, 'oak_fence');
        this.setBlock(-22, 4, z, 'leaves');
        this.setBlock(-25, 4, z, 'leaves');
        this.setBlock(-24, 4, z, 'leaves');
        this.setBlock(-23, 4, z, 'leaves');
        this.setBlock(-24, 4, z, 'redstone_block'); // Blooming red roses
        this.setBlock(-24, 3, z, 'lantern');
      }
    }
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
    // 1. Octagonal Carved Stone Plinth (Y = actualBaseY)
    for (let dx = -3; dx <= 3; dx++) {
      for (let dz = -3; dz <= 3; dz++) {
        if (Math.abs(dx) + Math.abs(dz) <= 4) {
          this.setBlock(cx + dx, actualBaseY, cz + dz, 'red_sandstone');
        }
      }
    }
    // Jali fretwork stone railing
    for (let dx = -3; dx <= 3; dx++) {
      for (let dz = -3; dz <= 3; dz++) {
        if (Math.abs(dx) + Math.abs(dz) === 4 && (dx !== 0 || dz !== 3)) {
          this.setBlock(cx + dx, actualBaseY + 1, cz + dz, 'sandstone');
        }
      }
    }

    // 2. 8 Carved Sandstone Columns with Bracket Capitals (Y = actualBaseY + 1 to baseY + 5)
    const pillars = [
      [-2, -2], [0, -3], [2, -2],
      [-3, 0],           [3, 0],
      [-2, 2],  [0, 3],  [2, 2]
    ];
    for (const [px, pz] of pillars) {
      for (let y = actualBaseY + 1; y <= actualBaseY + 4; y++) {
        this.setBlock(cx + px, y, cz + pz, 'red_sandstone');
      }
      this.setBlock(cx + px, actualBaseY + 5, cz + pz, 'sandstone'); // Carved capital bracket
    }

    // 3. Ornate Overhanging Eaves (Chhajja) at Y = actualBaseY + 5
    for (let dx = -3; dx <= 3; dx++) {
      for (let dz = -3; dz <= 3; dz++) {
        if (Math.abs(dx) + Math.abs(dz) <= 5) {
          this.setBlock(cx + dx, actualBaseY + 5, cz + dz, 'red_sandstone');
        }
      }
    }

    // 4. Inverted Lotus Fluted Cupola Dome (Y = actualBaseY + 6 to baseY + 8)
    for (let dx = -2; dx <= 2; dx++) {
      for (let dz = -2; dz <= 2; dz++) {
        if (Math.abs(dx) + Math.abs(dz) <= 3) {
          this.setBlock(cx + dx, actualBaseY + 6, cz + dz, 'sandstone');
        }
      }
    }
    for (let dx = -1; dx <= 1; dx++) {
      for (let dz = -1; dz <= 1; dz++) {
        this.setBlock(cx + dx, actualBaseY + 7, cz + dz, 'sandstone');
      }
    }
    this.setBlock(cx, actualBaseY + 8, cz, 'gold_block'); // Kalasa finial
    this.setBlock(cx, actualBaseY + 9, cz, 'gold_block');
    this.setBlock(cx, actualBaseY + 4, cz, 'sea_lantern'); // Hanging brass lantern
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
    // 1. Tiled Terracotta Floor
    for (let x = bx; x < bx + w; x++) {
      for (let z = bz; z < bz + d; z++) {
        this.setBlock(x, actualBaseY, z, ((x + z) % 2 === 0) ? 'red_terracotta' : 'terracotta_adobe');
      }
    }

    // 2. Sturdy Adobe Walls with Deep-set Windows and Doorway
    for (let x = bx; x < bx + w; x++) {
      for (let z = bz; z < bz + d; z++) {
        const isPerimeter = (x === bx || x === bx + w - 1 || z === bz || z === bz + d - 1);
        const isDoorway = (z === bz + d - 1 && x === bx + Math.floor(w / 2));

        if (isPerimeter) {
          for (let y = actualBaseY + 1; y < actualBaseY + h; y++) {
            if (isDoorway && y <= actualBaseY + 2) {
              continue; // Open doorway
            }
            // Rustic timber-framed window
            const isWindow = (y === actualBaseY + 2) && (
              (x === bx && z === bz + Math.floor(d / 2)) ||
              (x === bx + w - 1 && z === bz + Math.floor(d / 2))
            );
            if (isWindow) {
              this.setBlock(x, y, z, 'glass');
            } else {
              this.setBlock(x, y, z, 'terracotta_adobe');
            }
          }
        }
      }
    }

    // 3. Projecting Round Timber Ceiling Vigas (Iconic Pueblo Architecture)
    const vigaY = actualBaseY + h - 2;
    for (let x = bx + 1; x < bx + w - 1; x += 2) {
      // Vigas project 1 block past north and south walls
      for (let z = bz - 1; z <= bz + d; z++) {
        this.setBlock(x, vigaY, z, 'spruce_log');
      }
    }

    // 4. Flat Clay Terracotta Parapet Roof
    for (let x = bx; x < bx + w; x++) {
      for (let z = bz; z < bz + d; z++) {
        this.setBlock(x, actualBaseY + h - 1, z, 'red_sandstone');
      }
    }
    // Drainage spouts (canales)
    this.setBlock(bx + 1, actualBaseY + h - 1, bz - 1, 'spruce_log');
    this.setBlock(bx + w - 2, actualBaseY + h - 1, bz - 1, 'spruce_log');

    // 5. Interior Amenities: Woven Rug, Bed, Pottery, Hearth
    this.setBlock(bx + 1, actualBaseY + 1, bz + 1, 'oak_planks'); // Bed
    this.setBlock(bx + 2, actualBaseY + 1, bz + 1, 'red_terracotta'); // Blanket
    this.setBlock(bx + 1, actualBaseY + 1, bz + d - 2, 'cauldron'); // Clay water pot
    this.setBlock(bx + Math.floor(w / 2), actualBaseY + h - 2, bz + Math.floor(d / 2), 'lantern');

    // Outdoor Horno (Dome Clay Baking Oven) near door
    this.setBlock(bx + w, actualBaseY + 1, bz + d - 1, 'terracotta_adobe');
    this.setBlock(bx + w, actualBaseY + 2, bz + d - 1, 'terracotta_adobe');
    this.setBlock(bx + w, actualBaseY + 1, bz + d - 2, 'magma_block');
  }

  private buildPalmTree(cx: number, baseY: number, cz: number) {
    const actualBaseY = Math.max(baseY, this.getTerrainHeight(cx, cz) + 1);

    // Natural variation based on deterministic hash
    const seed = Math.abs(Math.sin(cx * 12.9898 + cz * 78.233)) * 43758.5453;
    const trunkHeight = 7 + (Math.floor(seed) % 3); // 7, 8, or 9 blocks tall

    // Deep rooted base foundation
    this.setBlock(cx, actualBaseY - 2, cz, 'palm_wood');
    this.setBlock(cx, actualBaseY - 1, cz, 'palm_wood');
    this.setBlock(cx, actualBaseY, cz, 'palm_wood');

    // Root buttresses at base
    if (Math.floor(seed) % 2 === 0) {
      this.setBlock(cx + 1, actualBaseY, cz, 'palm_wood');
      this.setBlock(cx - 1, actualBaseY, cz, 'palm_wood');
    } else {
      this.setBlock(cx, actualBaseY, cz + 1, 'palm_wood');
      this.setBlock(cx, actualBaseY, cz - 1, 'palm_wood');
    }

    // Natural curved trunk: gentle organic lean of 1-2 blocks max
    const leanAngle = (seed % (Math.PI * 2));
    const maxLean = 1.6;
    let prevX = cx;
    let prevZ = cz;

    for (let y = 1; y <= trunkHeight; y++) {
      const u = y / trunkHeight;
      const curLean = maxLean * Math.pow(u, 1.4);
      const curX = cx + Math.round(curLean * Math.cos(leanAngle));
      const curZ = cz + Math.round(curLean * Math.sin(leanAngle));

      // Fill continuity bridge so trunk never has diagonal open gaps
      if (curX !== prevX && curZ !== prevZ) {
        this.setBlock(curX, actualBaseY + y - 1, prevZ, 'palm_wood');
      } else if (curX !== prevX) {
        this.setBlock(curX, actualBaseY + y - 1, curZ, 'palm_wood');
      } else if (curZ !== prevZ) {
        this.setBlock(curX, actualBaseY + y - 1, curZ, 'palm_wood');
      }

      this.setBlock(curX, actualBaseY + y, curZ, 'palm_wood');
      prevX = curX;
      prevZ = curZ;
    }

    const topX = prevX;
    const topY = actualBaseY + trunkHeight;
    const topZ = prevZ;

    // Golden Coconuts tucked directly under the crown
    this.setBlock(topX + 1, topY - 1, topZ, 'sponge');
    this.setBlock(topX - 1, topY - 1, topZ, 'sponge');
    this.setBlock(topX, topY - 1, topZ + 1, 'sponge');
    this.setBlock(topX, topY - 1, topZ - 1, 'sponge');

    // Solid Crown Hub & Upper Dome
    this.setBlock(topX, topY, topZ, 'palm_wood');
    this.setBlock(topX, topY + 1, topZ, 'palm_leaves');
    this.setBlock(topX, topY + 2, topZ, 'palm_leaves'); // Dome top

    // Crown core collar
    this.setBlock(topX + 1, topY + 1, topZ, 'palm_leaves');
    this.setBlock(topX - 1, topY + 1, topZ, 'palm_leaves');
    this.setBlock(topX, topY + 1, topZ + 1, 'palm_leaves');
    this.setBlock(topX, topY + 1, topZ - 1, 'palm_leaves');

    // 8 Grand Cascading Palm Fronds (Cardinal + Diagonal)
    // 1. Cardinal Fronds (Arch upward, spread wide, droop gracefully down)
    const cardinals = [
      { dx: 1, dz: 0 }, { dx: -1, dz: 0 }, { dx: 0, dz: 1 }, { dx: 0, dz: -1 }
    ];
    for (const c of cardinals) {
      // Step 1: Up and out
      this.setBlock(topX + c.dx, topY + 1, topZ + c.dz, 'palm_leaves');
      // Step 2: Arch apex & side leaflet expansion
      this.setBlock(topX + c.dx * 2, topY + 1, topZ + c.dz * 2, 'palm_leaves');
      const perpX = c.dz;
      const perpZ = c.dx;
      this.setBlock(topX + c.dx * 2 + perpX, topY + 1, topZ + c.dz * 2 + perpZ, 'palm_leaves');
      this.setBlock(topX + c.dx * 2 - perpX, topY + 1, topZ + c.dz * 2 - perpZ, 'palm_leaves');
      // Step 3: Droop downward
      this.setBlock(topX + c.dx * 3, topY, topZ + c.dz * 3, 'palm_leaves');
      // Step 4: Hanging frond tip
      this.setBlock(topX + c.dx * 4, topY - 1, topZ + c.dz * 4, 'palm_leaves');
      // Step 5: Delicate end tip
      this.setBlock(topX + c.dx * 5, topY - 2, topZ + c.dz * 5, 'palm_leaves');
    }

    // 2. Diagonal Fronds (Graceful outward arc)
    const diagonals = [
      { dx: 1, dz: 1 }, { dx: -1, dz: 1 }, { dx: 1, dz: -1 }, { dx: -1, dz: -1 }
    ];
    for (const d of diagonals) {
      this.setBlock(topX + d.dx, topY + 1, topZ + d.dz, 'palm_leaves');
      this.setBlock(topX + d.dx * 2, topY, topZ + d.dz * 2, 'palm_leaves');
      this.setBlock(topX + d.dx * 3, topY - 1, topZ + d.dz * 3, 'palm_leaves');
      this.setBlock(topX + d.dx * 3, topY - 2, topZ + d.dz * 3, 'palm_leaves'); // Hanging diagonal tip
    }
  }

  private buildMerlionStatue(cx: number, cz: number) {
    // Majestic Singapore Merlion · Mythical Lion Head & Sinuous Fish Body (Centered at 15, 100)
    // 1. Octagonal Tiered Marina Bay Pool Reservoir (Radius 5, Y = 1 to 2)
    for (let dx = -5; dx <= 5; dx++) {
      for (let dz = -5; dz <= 5; dz++) {
        const d = Math.hypot(dx, dz);
        if (d <= 5.4) {
          const isRim = d >= 4.2;
          this.setBlock(cx + dx, 1, cz + dz, isRim ? 'quartz_block' : 'sea_lantern');
          this.setBlock(cx + dx, 2, cz + dz, isRim ? 'stone_bricks' : 'water');
        }
      }
    }

    // 2. Sculpted Merlion Pedestal & Fish Body (Y = 2 to 9)
    // Plinth
    for (let dx = -2; dx <= 2; dx++) {
      for (let dz = -2; dz <= 2; dz++) {
        if (Math.abs(dx) + Math.abs(dz) <= 3) {
          this.setBlock(cx + dx, 3, cz + dz, 'prismarine_bricks');
        }
      }
    }

    // Sinuous fish body curving out of the water
    // Lower fish torso (Y = 4..6, expanding forward and up)
    for (let y = 4; y <= 6; y++) {
      const zOff = (y - 4);
      for (let dx = -2; dx <= 2; dx++) {
        for (let dz = -1; dz <= 2; dz++) {
          if (Math.abs(dx) <= 1 || dz === 0) {
            this.setBlock(cx + dx, y, cz + zOff + dz, (y % 2 === 0) ? 'prismarine_bricks' : 'quartz_block');
          }
        }
      }
    }

    // Curving Fish Tail rising high at the back (Y = 6 to 10, Z = cz + 3 to cz + 5)
    this.setBlock(cx, 7, cz + 3, 'prismarine_bricks');
    this.setBlock(cx, 8, cz + 4, 'prismarine_bricks');
    this.setBlock(cx, 9, cz + 5, 'prismarine_bricks');
    // Bifurcated Fan Tail Fin splashing up at apex
    this.setBlock(cx - 1, 10, cz + 5, 'quartz_block');
    this.setBlock(cx + 1, 10, cz + 5, 'quartz_block');
    this.setBlock(cx - 2, 11, cz + 5, 'quartz_block');
    this.setBlock(cx + 2, 11, cz + 5, 'quartz_block');
    this.setBlock(cx, 10, cz + 5, 'water'); // Spray from tail

    // 3. Regal Lion Torso & Mane (Y = 7 to 10, centered at cx, cz)
    for (let y = 7; y <= 10; y++) {
      for (let dx = -2; dx <= 2; dx++) {
        for (let dz = -2; dz <= 1; dz++) {
          const isMane = Math.abs(dx) === 2 || dz === 1;
          this.setBlock(cx + dx, y, cz + dz, isMane ? 'quartz_pillar' : 'quartz_block');
        }
      }
    }

    // 4. Lion Head, Snout, Fangs, and Golden Crown (Y = 11 to 14, facing North towards -Z)
    // Head core
    for (let y = 11; y <= 13; y++) {
      for (let dx = -2; dx <= 2; dx++) {
        for (let dz = -2; dz <= 1; dz++) {
          const isEar = y === 13 && Math.abs(dx) === 2 && dz === 0;
          const isOuterMane = Math.abs(dx) === 2 || dz === 1;
          this.setBlock(cx + dx, y, cz + dz, isEar ? 'gold_block' : isOuterMane ? 'quartz_pillar' : 'quartz_block');
        }
      }
    }
    // Glowing Lion Eyes (facing -Z)
    this.setBlock(cx - 1, 12, cz - 2, 'gold_block');
    this.setBlock(cx + 1, 12, cz - 2, 'gold_block');
    // Lion Snout & Open Roaring Mouth at (cx, 11, cz - 2)
    this.setBlock(cx, 12, cz - 2, 'quartz_block'); // Upper snout
    this.setBlock(cx, 10, cz - 2, 'quartz_block'); // Lower jaw
    this.setBlock(cx - 1, 11, cz - 2, 'quartz_block'); // Cheeks
    this.setBlock(cx + 1, 11, cz - 2, 'quartz_block');
    // Golden Crest / Crown atop head at Y = 14
    this.setBlock(cx, 14, cz, 'gold_block');
    this.setBlock(cx, 15, cz, 'beacon');

    // 5. Parabolic High-Arc Water Fountain Spout (Erupting from mouth arching into pool)
    this.setBlock(cx, 11, cz - 2, 'water'); // Mouth spout source
    this.setBlock(cx, 11, cz - 3, 'water'); // Forward arc
    this.setBlock(cx, 10, cz - 4, 'water'); // Arching downward
    this.setBlock(cx, 9, cz - 5, 'water');
    this.setBlock(cx, 7, cz - 6, 'water');
    this.setBlock(cx, 5, cz - 7, 'water');
    this.setBlock(cx, 3, cz - 8, 'water');
    this.setBlock(cx, 2, cz - 8, 'sea_lantern'); // Splash pool underwater light

    // 6. Teak Promenade Viewing Deck & Spotlights (Z in [cz + 6, cz + 8], X in [cx - 4, cx + 4])
    for (let x = cx - 4; x <= cx + 4; x++) {
      for (let z = cz + 6; z <= cz + 8; z++) {
        this.setBlock(x, 2, z, 'oak_planks'); // Wooden viewing boardwalk
      }
      this.setBlock(x, 3, cz + 8, 'oak_fence'); // Safety railing
    }
    // Upward Night Spotlights aimed at Merlion
    this.setBlock(cx - 4, 3, cz + 6, 'sea_lantern');
    this.setBlock(cx + 4, 3, cz + 6, 'sea_lantern');

    this.setBlock(cx, 3, cz + 7, 'gold_block', {
      type: 'sign',
      title: 'The Merlion · Singapore National Icon 🇸🇬',
      text: 'Iconic mythical national personification of Singapore: Lion head symbolizing "Singapura" (Lion City) and fish body representing ancient fishing village origins of Temasek.'
    });
  }

  private buildSailingShip(cx: number, baseY: number, cz: number) {
    // Historic 3D Triple-Masted Ocean Galleon (Spanning X in [cx - 4, cx + 4], Z in [cz - 10, cz + 10])
    // 1. Deep Sculpted Wooden Hull (Spruce Frame & Oak Planks)
    // Keel at baseY (water level Y = 0)
    for (let dz = -8; dz <= 8; dz++) {
      this.setBlock(cx, baseY, cz + dz, 'spruce_log');
    }

    // Lower Underwater Hull (baseY + 1)
    for (let dz = -8; dz <= 8; dz++) {
      const halfW = (Math.abs(dz) >= 7) ? 1 : (Math.abs(dz) >= 5) ? 2 : 3;
      for (let dx = -halfW; dx <= halfW; dx++) {
        this.setBlock(cx + dx, baseY + 1, cz + dz, 'oak_planks');
        if (Math.abs(dx) === halfW) {
          this.setBlock(cx + dx, baseY + 1, cz + dz, 'spruce_log'); // Hull ribs
        }
      }
    }

    // Main Gun Deck & Sheer Line (baseY + 2)
    for (let dz = -8; dz <= 8; dz++) {
      const halfW = (Math.abs(dz) >= 8) ? 1 : (Math.abs(dz) >= 6) ? 2 : 3;
      for (let dx = -halfW; dx <= halfW; dx++) {
        this.setBlock(cx + dx, baseY + 2, cz + dz, 'oak_planks');
        // Gunwales
        if (Math.abs(dx) === halfW) {
          this.setBlock(cx + dx, baseY + 3, cz + dz, 'spruce_log');
        }
      }
    }

    // Broadside Naval Cannons (Port & Starboard at dz = -3, 0, 3)
    for (const dz of [-3, 0, 3]) {
      this.setBlock(cx - 3, baseY + 3, cz + dz, 'coal_block'); // Port cannon
      this.setBlock(cx - 4, baseY + 3, cz + dz, 'iron_block'); // Barrel
      this.setBlock(cx + 3, baseY + 3, cz + dz, 'coal_block'); // Starboard cannon
      this.setBlock(cx + 4, baseY + 3, cz + dz, 'iron_block'); // Barrel
    }

    // 2. Forecastle Deck at Bow (Z in [cz - 8, cz - 5], baseY + 3)
    for (let dz = -8; dz <= -5; dz++) {
      for (let dx = -2; dx <= 2; dx++) {
        if (Math.abs(dx) <= 1 || dz >= -6) {
          this.setBlock(cx + dx, baseY + 3, cz + dz, 'oak_planks');
        }
      }
    }
    // Long Angled Bowsprit Spar jutting forward to cz - 12
    for (let step = 1; step <= 4; step++) {
      this.setBlock(cx, baseY + 3 + Math.floor(step / 2), cz - 8 - step, 'spruce_log');
    }
    // Heavy Iron Anchor & Chain on port bow
    this.setBlock(cx - 2, baseY + 2, cz - 7, 'iron_block');
    this.setBlock(cx - 2, baseY + 1, cz - 7, 'iron_block');
    this.setBlock(cx - 2, baseY, cz - 7, 'iron_block');

    // 3. Multi-tier Sterncastle & Captain's Quarters (Z in [cz + 4, cz + 8])
    // Quarterdeck at baseY + 3
    for (let dz = 4; dz <= 8; dz++) {
      for (let dx = -2; dx <= 2; dx++) {
        this.setBlock(cx + dx, baseY + 3, cz + dz, 'oak_planks');
      }
    }
    // Poop Deck & Captain's Cabin at baseY + 4
    for (let dz = 6; dz <= 8; dz++) {
      for (let dx = -2; dx <= 2; dx++) {
        this.setBlock(cx + dx, baseY + 4, cz + dz, 'spruce_log');
        // Stern gallery windows
        if (dz === 8) {
          this.setBlock(cx + dx, baseY + 3, cz + dz, 'cyber_glass');
        }
      }
    }
    // Ship's Helm (Steering Wheel) & Navigation Lanterns
    this.setBlock(cx, baseY + 4, cz + 5, 'oak_fence'); // Helm post
    this.setBlock(cx, baseY + 5, cz + 5, 'gold_block'); // Steering wheel
    this.setBlock(cx - 2, baseY + 5, cz + 8, 'lantern'); // Stern navigation light
    this.setBlock(cx + 2, baseY + 5, cz + 8, 'lantern');
    this.setBlock(cx, baseY + 6, cz + 8, 'sea_lantern');

    // 4. Masts, Yardarms, Crow's Nests & Billowing Canvas Sails
    // Mast 1: Foremast at (cx, cz - 3, height 12)
    const foreZ = cz - 3;
    for (let y = baseY + 2; y <= baseY + 14; y++) {
      this.setBlock(cx, y, foreZ, 'spruce_log');
    }
    // Foremast Lower & Upper Yardarms
    for (let dx = -3; dx <= 3; dx++) {
      this.setBlock(cx + dx, baseY + 7, foreZ, 'spruce_log');
      this.setBlock(cx + dx, baseY + 12, foreZ, 'spruce_log');
    }
    // Billowing Foremast Canvas Sails (Curved 3D surface filled with wind)
    for (let dx = -3; dx <= 3; dx++) {
      for (let y = baseY + 8; y <= baseY + 11; y++) {
        const bowOut = (Math.abs(dx) <= 1 && (y === baseY + 9 || y === baseY + 10)) ? -1 : 0;
        this.setBlock(cx + dx, y, foreZ + bowOut, 'quartz_block');
      }
    }
    // Foremast Crow's Nest at baseY + 13
    this.setBlock(cx - 1, baseY + 13, foreZ, 'oak_fence');
    this.setBlock(cx + 1, baseY + 13, foreZ, 'oak_fence');
    this.setBlock(cx, baseY + 15, foreZ, 'gold_block'); // Masthead pennant

    // Mast 2: Soaring Mainmast at (cx, cz + 2, height 17)
    const mainZ = cz + 2;
    for (let y = baseY + 2; y <= baseY + 19; y++) {
      this.setBlock(cx, y, mainZ, 'spruce_log');
    }
    // Mainmast Yardarms
    for (let dx = -4; dx <= 4; dx++) {
      this.setBlock(cx + dx, baseY + 8, mainZ, 'spruce_log');
      this.setBlock(cx + dx, baseY + 14, mainZ, 'spruce_log');
    }
    // Billowing Mainmast Grand Sail (3D curved canvas)
    for (let dx = -4; dx <= 4; dx++) {
      for (let y = baseY + 9; y <= baseY + 13; y++) {
        const bowOut = (Math.abs(dx) <= 2 && y >= baseY + 10 && y <= baseY + 12) ? -1 : 0;
        this.setBlock(cx + dx, y, mainZ + bowOut, 'quartz_block');
      }
    }
    // Mainmast Crow's Nest & Strobe at baseY + 17
    for (let dx = -1; dx <= 1; dx++) {
      for (let dz = -1; dz <= 1; dz++) {
        if (dx !== 0 || dz !== 0) {
          this.setBlock(cx + dx, baseY + 17, mainZ + dz, 'oak_fence');
        }
      }
    }
    this.setBlock(cx, baseY + 18, mainZ, 'gold_block');
    this.setBlock(cx, baseY + 19, mainZ, 'beacon');
    this.setBlock(cx, baseY + 20, mainZ, 'redstone_block'); // Royal admiral pennant
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

        const mountNoise = Math.abs(Math.sin((x * 37.1 + z * 19.7)) * 43758.5453) % 1;
        for (let y = 1; y <= height; y++) {
          let block: string = 'dirt';
          if (y === height) {
            // Surface terrain: granite/stone near crest, grass and arid shrubs lower down
            if (height >= 20) {
              block = 'smooth_stone';
            } else if (height >= 12) {
              block = mountNoise < 0.35 ? 'cobblestone' : (mountNoise < 0.65 ? 'stone_bricks' : 'grass');
            } else {
              block = mountNoise < 0.15 ? 'dirt' : 'grass';
            }
          } else if (y >= height - 2) {
            block = y >= 16 ? 'stone_bricks' : 'dirt';
          } else {
            block = y >= 12 ? 'stone_bricks' : 'dirt';
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

    // 3B. Mount Lee Scenic Vista & Griffith Park Hiking Trail (Overlooking the Valley)
    // Natural stone overlook terrace with bronze telescope pedestals and trail lanterns
    for (let x = cx - 14; x <= cx + 14; x++) {
      for (let z = cz + 10; z <= cz + 16; z++) {
        this.setBlock(x, 2, z, 'smooth_stone');
        if (z === cz + 16 || Math.abs(x - cx) === 14) {
          this.setBlock(x, 3, z, 'stone_bricks');
        }
      }
    }
    // High-powered ground floodlights illuminating the monumental HOLLYWOOD letters
    for (let x = cx - 18; x <= cx + 18; x += 4) {
      this.setBlock(x, 2, cz + 9, 'sea_lantern');
    }
    // Scenic Trail Benches & Historical Viewpoint Markers
    this.setBlock(cx - 6, 3, cz + 14, 'oak_planks');
    this.setBlock(cx + 6, 3, cz + 14, 'oak_planks');
    this.setBlock(cx, 3, cz + 15, 'gold_block', {
      type: 'sign',
      title: 'Mount Lee Summit Vista ⭐',
      text: 'Panoramic scenic overlook of the American Metropolis, Las Vegas Strip, and Pacific Ocean from the Hollywood Hills.'
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

  // ==========================================
  // 7C. EXPANDED HOLLYWOOD ENTERTAINMENT DISTRICT
  // ==========================================

  // 1. Hollywood Boulevard Walk of Fame & Palm Promenade
  private buildHollywoodWalkOfFame() {
    // Avenue runs North-South between Mount Lee overlook (Z = -84) and Vegas/Metropolis junction (Z = -54)
    // Roadway X in [159, 163], Sidewalks X in [155, 158] (West) and [164, 167] (East)
    for (let z = -84; z <= -54; z++) {
      // Main 5-block asphalt road
      for (let x = 159; x <= 163; x++) {
        this.setBlock(x, 1, z, 'asphalt_road');
        // Yellow center divider dashed line at X = 161
        if (x === 161 && Math.abs(z) % 4 <= 1) {
          this.setBlock(x, 1, z, 'gold_block');
        }
      }

      // Stone brick sidewalks on both sides
      for (let x = 155; x <= 158; x++) this.setBlock(x, 1, z, 'stone_bricks');
      for (let x = 164; x <= 167; x++) this.setBlock(x, 1, z, 'stone_bricks');

      // Curb trim along road edge
      this.setBlock(158, 1, z, 'smooth_stone');
      this.setBlock(164, 1, z, 'smooth_stone');
    }

    // Pedestrian Zebra Crossings at key junctions
    for (const cz of [-84, -70, -56]) {
      for (let x = 159; x <= 163; x++) {
        if (x % 2 === 1) this.setBlock(x, 1, cz, 'smooth_stone');
      }
    }

    // Legendary Brass Walk of Fame Stars embedded in sidewalks
    const stars: { x: number; z: number; name: string; category: string; bio: string }[] = [
      { x: 157, z: -82, name: 'Charlie Chaplin ⭐', category: 'Motion Pictures Pioneer', bio: 'The Little Tramp · Silent film icon and visionary co-founder of United Artists.' },
      { x: 165, z: -82, name: 'Marilyn Monroe ⭐', category: 'Motion Pictures Legend', bio: 'Golden Age silver-screen icon celebrated in Some Like It Hot & Gentlemen Prefer Blondes.' },
      { x: 157, z: -76, name: 'Steven Spielberg ⭐', category: 'Director of the Century', bio: 'Visionary master of Jurassic Park, Jaws, Raiders of the Lost Ark, and E.T.' },
      { x: 165, z: -76, name: 'Walt Disney ⭐', category: 'Animation & Storytelling', bio: 'Pioneer of classic animated feature films and creator of worlds of imagination.' },
      { x: 157, z: -70, name: 'Lakshya K ⭐', category: 'Chief Metaverse Architect', bio: 'Lead creator of this 3D Minecraft interactive portfolio realm & software architect.' },
      { x: 165, z: -70, name: 'Keanu Reeves ⭐', category: 'Sci-Fi & Action Icon', bio: "Beloved star of The Matrix, John Wick, and Cyberpunk. You're breathtaking!" },
      { x: 157, z: -64, name: 'Audrey Hepburn ⭐', category: 'Golden Age Cinema & Philanthropy', bio: "Iconic star of Breakfast at Tiffany's, Roman Holiday, and UNICEF Goodwill Ambassador." },
      { x: 165, z: -64, name: 'Morgan Freeman ⭐', category: 'Master of Dramatic Arts', bio: 'The definitive resonant narrator of cinema, beloved in Shawshank Redemption & Driving Miss Daisy.' },
      { x: 157, z: -58, name: 'Hans Zimmer ⭐', category: 'Cinematic Score Composer', bio: 'Composer of breathtaking film scores: Interstellar, Inception, Gladiator, and The Dark Knight.' },
      { x: 165, z: -58, name: 'Robin Williams ⭐', category: 'Comedic & Dramatic Genius', bio: 'Beloved improvisational master of Good Will Hunting, Dead Poets Society, and Aladdin.' }
    ];

    for (const star of stars) {
      this.setBlock(star.x, 1, star.z, 'gold_block', {
        type: 'sign',
        title: `Walk of Fame: ${star.name}`,
        text: `${star.category}\n"${star.bio}"`
      });
      // Decorative border around the star
      this.setBlock(star.x - 1, 1, star.z, 'red_terracotta');
      this.setBlock(star.x + 1, 1, star.z, 'red_terracotta');
    }

    // Vintage Hollywood Boulevard Lampposts & Royal California Palms
    for (let z = -84; z <= -54; z += 6) {
      // West Lamppost
      this.setBlock(155, 2, z, 'iron_block');
      this.setBlock(155, 3, z, 'iron_block');
      this.setBlock(155, 4, z, 'sea_lantern');
      this.setBlock(155, 2, z - 1, 'oak_leaves'); // Planter box

      // East Lamppost
      this.setBlock(167, 2, z, 'iron_block');
      this.setBlock(167, 3, z, 'iron_block');
      this.setBlock(167, 4, z, 'sea_lantern');
      this.setBlock(167, 2, z - 1, 'oak_leaves');
    }

    // Tall California Royal Palm Trees
    const palmZCoords = [-80, -72, -64, -56];
    for (const pz of palmZCoords) {
      // West side palm at (154, pz)
      for (let y = 1; y <= 7; y++) this.setBlock(154, y, pz, 'jungle_log');
      this.setBlock(154, 7, pz, 'sea_lantern');
      for (let dx = -1; dx <= 1; dx++) {
        for (let dz = -1; dz <= 1; dz++) {
          this.setBlock(154 + dx, 8, pz + dz, 'oak_leaves');
        }
      }
      this.setBlock(154, 9, pz, 'oak_leaves');

      // East side palm at (168, pz)
      for (let y = 1; y <= 7; y++) this.setBlock(168, y, pz, 'jungle_log');
      this.setBlock(168, 7, pz, 'sea_lantern');
      for (let dx = -1; dx <= 1; dx++) {
        for (let dz = -1; dz <= 1; dz++) {
          this.setBlock(168 + dx, 8, pz + dz, 'oak_leaves');
        }
      }
      this.setBlock(168, 9, pz, 'oak_leaves');
    }

    // Hollywood Boulevard Grand Gateway Neon Arch at Z = -54
    for (let y = 1; y <= 6; y++) {
      this.setBlock(158, y, -54, 'gold_block');
      this.setBlock(164, y, -54, 'gold_block');
    }
    for (let x = 158; x <= 164; x++) {
      this.setBlock(x, 7, -54, 'sea_lantern');
      this.setBlock(x, 8, -54, 'gold_block');
    }
    this.setBlock(161, 9, -54, 'beacon');
    this.setBlock(161, 7, -54, 'glowstone', {
      type: 'sign',
      title: 'HOLLYWOOD BOULEVARD ⭐',
      text: 'Historic corridor of world cinema! Famous Walk of Fame stars, Hollywood Bowl amphitheatre, film soundstages, and legendary movie palaces.'
    });

    // Connecting plaza from Hollywood Blvd (158..164, -54) toward Vegas Blvd (140, -52)
    for (let x = 144; x <= 158; x++) {
      for (let z = -55; z <= -52; z++) {
        this.setBlock(x, 1, z, 'asphalt_road');
        if (z === -53 && x % 4 <= 1) this.setBlock(x, 1, z, 'gold_block');
      }
    }
  }

  // 2. The Hollywood Bowl Amphitheater nestled in the Eastern Foothills
  private buildHollywoodBowl(cx: number, cz: number) {
    // Stage center at (cx, cz) = (180, -76)
    // Acoustic shells facing West (towards Hollywood Boulevard)
    // Ground platform at Y = 2
    for (let x = cx - 3; x <= cx + 6; x++) {
      for (let z = cz - 7; z <= cz + 7; z++) {
        this.setBlock(x, 2, z, 'oak_planks');
      }
    }

    // Nested semicircular acoustic shells (outer, middle, inner concentric arches)
    // Shell 1 (Outer arch, radius 7, Y up to 13 at X = cx + 5)
    for (let dz = -7; dz <= 7; dz++) {
      const archH = Math.round(Math.sqrt(Math.max(0, 49 - dz * dz)) * 1.5);
      for (let y = 2; y <= 2 + archH; y++) {
        this.setBlock(cx + 5, y, cz + dz, 'quartz_block');
        this.setBlock(cx + 6, y, cz + dz, 'stone_bricks');
      }
    }

    // Shell 2 (Middle arch, radius 5.5, Y up to 11 at X = cx + 3)
    for (let dz = -5; dz <= 5; dz++) {
      const archH = Math.round(Math.sqrt(Math.max(0, 30 - dz * dz)) * 1.5);
      for (let y = 2; y <= 2 + archH; y++) {
        this.setBlock(cx + 3, y, cz + dz, 'quartz_block');
      }
    }

    // Shell 3 (Inner arch, radius 4, Y up to 9 at X = cx + 1)
    for (let dz = -3; dz <= 3; dz++) {
      const archH = Math.round(Math.sqrt(Math.max(0, 16 - dz * dz)) * 1.5);
      for (let y = 2; y <= 2 + archH; y++) {
        this.setBlock(cx + 1, y, cz + dz, 'quartz_block');
      }
    }

    // Acoustic shell crown illumination
    this.setBlock(cx + 5, 14, cz, 'sea_lantern');
    this.setBlock(cx + 3, 12, cz, 'sea_lantern');
    this.setBlock(cx + 1, 10, cz, 'sea_lantern');

    // Concert Grand Piano at (cx + 2, 3, cz)
    this.setBlock(cx + 2, 3, cz, 'coal_block');
    this.setBlock(cx + 2, 3, cz - 1, 'coal_block');
    this.setBlock(cx + 3, 3, cz, 'coal_block');
    this.setBlock(cx + 2, 3, cz + 1, 'quartz_block'); // Piano keyboard
    this.setBlock(cx + 1, 3, cz + 1, 'oak_planks'); // Piano stool

    // Concert Stage Microphones & Audio Wings
    this.setBlock(cx - 1, 3, cz, 'iron_block'); // Center mic stand
    this.setBlock(cx - 1, 4, cz, 'lantern');

    // Left and Right Audio Monitor Stack Towers
    for (const dz of [-6, 6]) {
      this.setBlock(cx + 1, 3, cz + dz, 'obsidian');
      this.setBlock(cx + 1, 4, cz + dz, 'sea_lantern');
      this.setBlock(cx + 1, 5, cz + dz, 'obsidian');
    }

    // Stage Front Footlights
    for (let dz = -6; dz <= 6; dz += 2) {
      this.setBlock(cx - 2, 2, cz + dz, 'sea_lantern');
    }

    // Outdoor Amphitheater Terraced Bench Seating facing the shell (X in [cx - 12, cx - 4])
    for (let tier = 1; tier <= 4; tier++) {
      const tierX = cx - 4 - tier * 2;
      const tierY = 1 + tier;
      for (let z = cz - 7; z <= cz + 7; z++) {
        // Skip central aisle
        if (z === cz) {
          this.setBlock(tierX, tierY, z, 'smooth_stone');
          if (tier % 2 === 0) this.setBlock(tierX, tierY + 1, z, 'lantern');
          continue;
        }
        // Substructure plinth
        this.setBlock(tierX, tierY - 1, z, 'stone_bricks');
        // Bench seating
        this.setBlock(tierX, tierY, z, 'oak_planks');
      }
    }

    // Historical Amphitheatre Plaque
    this.setBlock(cx - 5, 3, cz + 4, 'gold_block', {
      type: 'sign',
      title: 'The Hollywood Bowl · World Famous Amphitheatre 🎶',
      text: 'Legendary natural acoustic amphitheater opened in 1922 in the Hollywood Hills. Hosted the Los Angeles Philharmonic, The Beatles, Frank Sinatra, and world-renowned film symphony nights!'
    });
  }

  // 3. Hollywood Pictures Studio Lot, Soundstage 1 & Water Tower
  private buildHollywoodStudioLot(cx: number, cz: number) {
    // Center at (cx, cz) = (144, -76)
    // Lot pavement at Y = 1: X in [134, 153], Z in [-84, -69]
    for (let x = 134; x <= 153; x++) {
      for (let z = -84; z <= -69; z++) {
        this.setBlock(x, 1, z, 'asphalt_road');
      }
    }

    // A. Studio Entrance Gateway Arch at X = 153, Z = cz
    for (let y = 1; y <= 5; y++) {
      this.setBlock(153, y, cz - 3, 'stone_bricks');
      this.setBlock(153, y, cz + 3, 'stone_bricks');
    }
    for (let z = cz - 3; z <= cz + 3; z++) {
      this.setBlock(153, 6, z, 'gold_block');
    }
    this.setBlock(153, 7, cz, 'beacon');
    this.setBlock(153, 6, cz, 'sea_lantern', {
      type: 'sign',
      title: 'HOLLYWOOD PICTURES STUDIOS 🎬',
      text: 'Historic backlot soundstages, prop departments, and motion picture production studios. Authorized film personnel only!'
    });

    // B. Iconic Warner Bros / Paramount Style Studio Water Tower at (136, -81)
    const wtX = 136;
    const wtZ = -81;
    // 4 Heavy steel stilt legs rising to Y = 13
    const stilts = [[wtX - 2, wtZ - 2], [wtX + 2, wtZ - 2], [wtX - 2, wtZ + 2], [wtX + 2, wtZ + 2]];
    for (const [sx, sz] of stilts) {
      for (let y = 1; y <= 13; y++) {
        this.setBlock(sx, y, sz, 'iron_block');
      }
    }
    // Cross braces between legs
    for (const y of [5, 9, 13]) {
      for (let x = wtX - 2; x <= wtX + 2; x++) {
        this.setBlock(x, y, wtZ - 2, 'iron_block');
        this.setBlock(x, y, wtZ + 2, 'iron_block');
      }
      for (let z = wtZ - 2; z <= wtZ + 2; z++) {
        this.setBlock(wtX - 2, y, z, 'iron_block');
        this.setBlock(wtX + 2, y, z, 'iron_block');
      }
    }

    // Cylindrical Water Tank from Y = 14 to Y = 18
    for (let y = 14; y <= 18; y++) {
      for (let dx = -2; dx <= 2; dx++) {
        for (let dz = -2; dz <= 2; dz++) {
          if (Math.abs(dx) === 2 && Math.abs(dz) === 2) continue; // Round corners
          const isFace = (dx === 2 && Math.abs(dz) <= 1); // East face towards lot
          if (isFace && (y === 16 || y === 17)) {
            this.setBlock(wtX + dx, y, wtZ + dz, 'gold_block'); // "HP" studio logo
          } else {
            this.setBlock(wtX + dx, y, wtZ + dz, 'lapis_block');
          }
        }
      }
    }

    // Water Tower Conical Roof & Aircraft Beacon
    for (let dx = -1; dx <= 1; dx++) {
      for (let dz = -1; dz <= 1; dz++) {
        this.setBlock(wtX + dx, 19, wtZ + dz, 'smooth_stone');
      }
    }
    this.setBlock(wtX, 20, wtZ, 'iron_block');
    this.setBlock(wtX, 21, wtZ, 'redstone_block');
    this.setBlock(wtX, 22, wtZ, 'beacon');

    this.setBlock(wtX, 2, wtZ + 3, 'iron_block', {
      type: 'sign',
      title: 'Hollywood Pictures Water Tower · Est. 1928 💧',
      text: 'Iconic landmark rising 22 blocks above the backlot soundstages. Symbol of classic Hollywood cinema, legendary cartoons, and movie-making magic!'
    });

    // C. Soundstage 1 (Massive Hangar Building) at X in [139, 151], Z in [-81, -71]
    const stageX1 = 139;
    const stageX2 = 151;
    const stageZ1 = -81;
    const stageZ2 = -71;

    // Stage walls and roof
    for (let x = stageX1; x <= stageX2; x++) {
      for (let z = stageZ1; z <= stageZ2; z++) {
        this.setBlock(x, 1, z, 'smooth_stone');
        const isWall = (x === stageX1 || x === stageX2 || z === stageZ1 || z === stageZ2);
        if (isWall) {
          for (let y = 2; y <= 9; y++) {
            // Soundstage Doorway opening at East Wall (X = stageX2, Z in [-77, -75], Y in [2, 5])
            if (x === stageX2 && z >= -77 && z <= -75 && y <= 5) continue;
            this.setBlock(x, y, z, (y === 9) ? 'stone_bricks' : 'smooth_stone');
          }
        }
        // Industrial roof deck
        this.setBlock(x, 10, z, 'stone_bricks');
      }
    }

    // Stage 1 Entrance Sign & Recording Warning Beacon
    this.setBlock(stageX2, 6, -76, 'redstone_block');
    this.setBlock(stageX2 + 1, 6, -76, 'glowstone', {
      type: 'sign',
      title: 'SOUNDSTAGE 1 · FILMING IN PROGRESS 🔴',
      text: 'Silence on set! Soundstage 1 is actively recording. Enter to observe film production, camera dolly, green screen, and director\'s chair.'
    });

    // Interior Movie Set inside Soundstage 1:
    // 1. Chroma Key Green Screen Wall on West interior wall
    for (let z = stageZ1 + 2; z <= stageZ2 - 2; z++) {
      for (let y = 2; y <= 6; y++) {
        this.setBlock(stageX1 + 1, y, z, 'emerald_block');
      }
      this.setBlock(stageX1 + 2, 2, z, 'emerald_block'); // Green floor extension
    }

    // 2. Camera Dolly on Rolling Steel Rails
    for (let z = -78; z <= -74; z++) {
      this.setBlock(145, 2, z, 'iron_block'); // Camera dolly rails
    }
    // Camera rig on dolly
    this.setBlock(145, 3, -76, 'coal_block');
    this.setBlock(145, 4, -76, 'obsidian'); // 35mm Studio Cinema Camera
    this.setBlock(144, 4, -76, 'sea_lantern'); // Camera optics lens pointing at green screen
    this.setBlock(146, 3, -76, 'oak_planks'); // Camera operator seat

    // 3. Director's Canvas Chair & Megaphone
    this.setBlock(148, 2, -78, 'oak_planks');
    this.setBlock(148, 3, -78, 'gold_block', {
      type: 'sign',
      title: 'Director\'s Chair · Scene 42 Take 1 🎬',
      text: 'DIRECTOR: LAKSHYA K\nFilm: "Journey Through the 3D Portfolio"\nStatus: Rolling! Quiet on set... and ACTION!'
    });

    // 4. Overhead Lighting Truss Rig at Y = 8
    for (let x = stageX1 + 2; x <= stageX2 - 2; x += 3) {
      for (let z = stageZ1 + 2; z <= stageZ2 - 2; z += 3) {
        this.setBlock(x, 8, z, 'iron_block');
        this.setBlock(x, 7, z, 'sea_lantern'); // Studio spotlight
      }
    }
  }

  // 4. Capitol Records Building / Vinyl Spire Tower
  private buildCapitolRecordsTower(cx: number, cz: number) {
    // Centered at (cx, cz) = (174, -59)
    // A. Ground Plaza & Landscape Terrace at Y = 1..2
    for (let dx = -6; dx <= 6; dx++) {
      for (let dz = -6; dz <= 6; dz++) {
        const dist = Math.hypot(dx, dz);
        if (dist <= 6) {
          this.setBlock(cx + dx, 1, cz + dz, 'smooth_stone');
          if (dist > 4.8) {
            this.setBlock(cx + dx, 2, cz + dz, 'oak_leaves'); // Manicured hedge ring
          } else {
            this.setBlock(cx + dx, 2, cz + dz, 'quartz_block');
          }
        }
      }
    }

    // B. 6 Cylindrical Vinyl Record Stack Floors (Y = 3 to Y = 14)
    // Welton Becket's iconic 1956 architecture: glass ribbon with cantilevered porcelain sunshade disc louvers
    for (let f = 0; f < 6; f++) {
      const baseY = 3 + f * 2;
      // Lower level of floor: recessed cylindrical glass window wall (radius 3.8)
      for (let dx = -4; dx <= 4; dx++) {
        for (let dz = -4; dz <= 4; dz++) {
          const dist = Math.hypot(dx, dz);
          if (dist <= 3.8) {
            const isGlassWall = dist >= 2.6;
            this.setBlock(cx + dx, baseY, cz + dz, isGlassWall ? 'cyber_glass' : 'quartz_pillar');
          }
        }
      }

      // Upper level of floor: protruding cantilevered sunshade disc (radius 5) resembling a vinyl LP edge!
      for (let dx = -5; dx <= 5; dx++) {
        for (let dz = -5; dz <= 5; dz++) {
          const dist = Math.hypot(dx, dz);
          if (dist <= 5) {
            this.setBlock(cx + dx, baseY + 1, cz + dz, 'quartz_block');
          }
        }
      }
    }

    // C. Roof Deck at Y = 15
    for (let dx = -4; dx <= 4; dx++) {
      for (let dz = -4; dz <= 4; dz++) {
        if (Math.hypot(dx, dz) <= 4) {
          this.setBlock(cx + dx, 15, cz + dz, 'smooth_stone');
        }
      }
    }

    // D. Iconic 90-Foot Spire Antenna rising to Y = 25
    for (let y = 16; y <= 24; y++) {
      this.setBlock(cx, y, cz, (y % 2 === 0) ? 'iron_block' : 'quartz_pillar');
    }

    // Red Spire Morse Code Beacon at Y = 25..26
    this.setBlock(cx, 25, cz, 'redstone_block');
    this.setBlock(cx, 26, cz, 'beacon');

    // E. Commemorative Building Plaque at entrance (cx - 5, 2, cz)
    this.setBlock(cx - 5, 2, cz, 'gold_block', {
      type: 'sign',
      title: 'Capitol Records Tower · Hollywood & Vine 🎙️',
      text: 'The world\'s first circular office tower (1956), designed to evoke a stack of vinyl records. Its 90-foot spire beacon continuously blinks "H-O-L-L-Y-W-O-O-D" in Morse code! Studio home of Frank Sinatra, The Beatles, Nat King Cole, and Beach Boys.'
    });
  }

  // 5. VIP Red Carpet Film Premiere, Oscar Statuette & Stretch Limousine
  private buildHollywoodPremiereAndOscar(cx: number, cz: number) {
    // Center at (cx, cz) = (151, -61)
    // A. Crimson Red Carpet Walkway
    for (let z = -65; z <= -57; z++) {
      for (let x = 149; x <= 153; x++) {
        this.setBlock(x, 1, z, 'red_terracotta'); // Velvet red carpet
      }
      // Golden velvet rope stanchions flanking both sides of red carpet
      this.setBlock(148, 2, z, 'gold_block');
      this.setBlock(154, 2, z, 'gold_block');
      if (Math.abs(z) % 2 === 0) {
        this.setBlock(148, 3, z, 'redstone_block');
        this.setBlock(154, 3, z, 'redstone_block');
      }
    }

    // Paparazzi Flashbulb Spotlights
    for (const [px, pz] of [[147, -65], [155, -65], [147, -57], [155, -57]]) {
      this.setBlock(px, 2, pz, 'iron_block');
      this.setBlock(px, 3, pz, 'sea_lantern');
    }

    // B. Monumental 7-Block Golden Oscar Statuette at (cx, 2, -66)
    const oscX = cx;
    const oscZ = -66;
    // Black obsidian & quartz stepped plinth
    for (let dx = -1; dx <= 1; dx++) {
      for (let dz = -1; dz <= 1; dz++) {
        this.setBlock(oscX + dx, 1, oscZ + dz, 'obsidian');
        this.setBlock(oscX + dx, 2, oscZ + dz, 'smooth_stone');
      }
    }
    this.setBlock(oscX, 3, oscZ, 'obsidian');

    // Golden Oscar body holding crusader sword
    this.setBlock(oscX, 4, oscZ, 'gold_block'); // Feet & gown base
    this.setBlock(oscX, 5, oscZ, 'gold_block'); // Legs
    this.setBlock(oscX, 6, oscZ, 'gold_block'); // Torso
    this.setBlock(oscX - 1, 6, oscZ, 'gold_block'); // Left arm holding sword
    this.setBlock(oscX + 1, 6, oscZ, 'gold_block'); // Right arm holding sword
    this.setBlock(oscX, 7, oscZ, 'gold_block'); // Head
    this.setBlock(oscX, 8, oscZ, 'gold_block'); // Golden laurel crown
    this.setBlock(oscX, 9, oscZ, 'beacon');     // Heavenly beacon

    // Oscar Historical Inscription
    this.setBlock(oscX, 2, oscZ + 2, 'gold_block', {
      type: 'sign',
      title: 'The Academy Award · Oscar Statuette ⭐',
      text: 'The definitive symbol of cinematic excellence! Awarded for outstanding achievement in directing, performance, artistry, and vision. Dedicated to all creators who turn imagination into reality.'
    });

    // C. VIP Stretch Limousine parked alongside the red carpet (X in [145, 147], Z in [-66, -58])
    const limoZ1 = -66;
    const limoZ2 = -58;
    for (let z = limoZ1; z <= limoZ2; z++) {
      for (let x = 145; x <= 147; x++) {
        // Wheels at front and rear corners
        const isWheel = (z === limoZ1 + 1 || z === limoZ2 - 1) && (x === 145 || x === 147);
        if (isWheel) {
          this.setBlock(x, 1, z, 'coal_block');
          this.setBlock(x, 2, z, 'iron_block');
        } else {
          this.setBlock(x, 1, z, 'coal_block'); // Underbody
          this.setBlock(x, 2, z, 'obsidian');   // Glossy black chassis
        }

        // Tinted panoramic cabin windows & roof
        if (z > limoZ1 && z < limoZ2) {
          const isEdge = (x === 145 || x === 147 || z === limoZ1 + 1 || z === limoZ2 - 1);
          this.setBlock(x, 3, z, isEdge ? 'cyber_glass' : 'smooth_stone');
          this.setBlock(x, 4, z, 'obsidian'); // Roof
        }
      }
    }
    // Headlights (facing North towards red carpet) & Tail lights
    this.setBlock(145, 2, limoZ1, 'sea_lantern');
    this.setBlock(147, 2, limoZ1, 'sea_lantern');
    this.setBlock(145, 2, limoZ2, 'redstone_block');
    this.setBlock(147, 2, limoZ2, 'redstone_block');

    // Limousine Interior VIP Lounge & Champagne Bar
    this.setBlock(146, 2, -62, 'gold_block'); // Bar
    this.setBlock(146, 3, -62, 'sea_lantern');
    this.setBlock(146, 2, -61, 'quartz_block'); // Leather passenger seat
    this.setBlock(146, 2, -63, 'quartz_block');

    this.setBlock(144, 2, -62, 'iron_block', {
      type: 'sign',
      title: 'VIP Hollywood Stretch Limousine 🥂',
      text: 'Chauffeured obsidian stretch limousine awaiting A-list stars and Academy Award nominees for tonight\'s glamorous world premiere.'
    });
  }

  // 6. Mel's Retro 1950s Drive-In Diner & Classic Coupe
  private buildMelsRetroDiner(cx: number, cz: number) {
    // Centered at (cx, cz) = (139, -60)
    // Diner footprint: X in [134, 143], Z in [-65, -55]
    const dX1 = 134;
    const dX2 = 143;
    const dZ1 = -65;
    const dZ2 = -55;

    // A. Checkerboard black and white tile floor at Y = 1
    for (let x = dX1; x <= dX2; x++) {
      for (let z = dZ1; z <= dZ2; z++) {
        const isWhite = (x + z) % 2 === 0;
        this.setBlock(x, 1, z, isWhite ? 'quartz_block' : 'coal_block');

        // Exterior Walls (Y = 2 to Y = 4)
        const isWall = (x === dX1 || x === dX2 || z === dZ1 || z === dZ2);
        if (isWall) {
          // Diner Entrance Doorway at East Wall (X = dX2, Z = -60)
          if (x === dX2 && (z === -60 || z === -59)) {
            this.setBlock(x, 2, z, 'cyber_glass');
            this.setBlock(x, 3, z, 'cyber_glass');
            this.setBlock(x, 4, z, 'red_terracotta');
            continue;
          }

          this.setBlock(x, 2, z, 'red_terracotta'); // Red stainless steel wainscot
          this.setBlock(x, 3, z, 'cyber_glass');    // Panoramic ribbon windows
          this.setBlock(x, 4, z, 'red_terracotta');
        }

        // Flat streamline roof deck at Y = 5
        this.setBlock(x, 5, z, 'smooth_stone');
      }
    }

    // Neon Teal & Red Roof Fascia Parapet at Y = 6
    for (let x = dX1; x <= dX2; x++) {
      this.setBlock(x, 6, dZ1, 'prismarine_bricks');
      this.setBlock(x, 6, dZ2, 'prismarine_bricks');
    }
    for (let z = dZ1; z <= dZ2; z++) {
      this.setBlock(dX1, 6, z, 'prismarine_bricks');
      this.setBlock(dX2, 6, z, 'prismarine_bricks');
    }

    // Illuminated Neon Diner Marquee Sign atop roof
    this.setBlock(cx, 7, cz, 'redstone_block');
    this.setBlock(cx, 8, cz, 'sea_lantern');
    this.setBlock(cx, 7, cz + 1, 'sea_lantern', {
      type: 'sign',
      title: 'MEL\'S DRIVE-IN · 24 HR HOLLYWOOD DINER 🍔',
      text: 'Authentic 1950s American roadside neon diner! Famous smashburgers, malted chocolate milkshakes, crispy fries, and jukebox rock \'n roll since 1947.'
    });

    // B. Interior Diner Layout:
    // Chrome lunch counter at X = 137, Z in [-63, -57]
    for (let z = -63; z <= -57; z++) {
      this.setBlock(137, 2, z, 'smooth_stone'); // Countertop
      // Chrome swivel barstools facing counter
      this.setBlock(138, 2, z, (z % 2 === 0) ? 'red_terracotta' : 'iron_block');
    }
    // Soda Fountain & Shake Mixer
    this.setBlock(136, 2, -61, 'cauldron');
    this.setBlock(136, 3, -61, 'sea_lantern');

    // Retro 1950s Wurlitzer Jukebox at (135, 2, -64)
    this.setBlock(135, 2, -64, 'bookshelf');
    this.setBlock(135, 3, -64, 'gold_block');
    this.setBlock(135, 4, -64, 'sea_lantern', {
      type: 'sign',
      title: 'Wurlitzer 1015 Golden Jukebox 🎵',
      text: 'Playing classic rock \'n roll, doo-wop, and swing hits on original 45 RPM vinyl records! Press [E] to drop in a nickel.'
    });

    // C. Vintage 1957 Turquoise Convertible Hot-Rod parked in Drive-In bay at (142, -54)
    const carX = 142;
    const carZ1 = -54;
    const carZ2 = -51;
    for (let z = carZ1; z <= carZ2; z++) {
      // Wheels
      if (z === carZ1 || z === carZ2) {
        this.setBlock(carX - 1, 1, z, 'coal_block');
        this.setBlock(carX + 1, 1, z, 'coal_block');
      }
      for (let x = carX - 1; x <= carX + 1; x++) {
        this.setBlock(x, 2, z, 'prismarine_bricks'); // Retro turquoise chassis
      }
    }
    // Windshield & White leather interior
    this.setBlock(carX - 1, 3, carZ1 + 1, 'cyber_glass');
    this.setBlock(carX, 3, carZ1 + 1, 'cyber_glass');
    this.setBlock(carX + 1, 3, carZ1 + 1, 'cyber_glass');
    this.setBlock(carX, 2, carZ1 + 2, 'quartz_block'); // Seat
    // Headlights & Tail lights
    this.setBlock(carX - 1, 2, carZ2, 'sea_lantern');
    this.setBlock(carX + 1, 2, carZ2, 'sea_lantern');
    this.setBlock(carX - 1, 2, carZ1, 'redstone_block');
    this.setBlock(carX + 1, 2, carZ1, 'redstone_block');

    this.setBlock(carX + 2, 2, -53, 'sea_lantern', {
      type: 'sign',
      title: '1957 Classic Hollywood Convertible Coupe 🚘',
      text: 'Turquoise cruiser parked under the neon lights of Mel\'s Diner. Ready for a scenic cruise down Sunset Boulevard!'
    });
  }

  private buildHospital(cx: number, cz: number) {
    // Crossroads General Hospital & Trauma Center (Footprint: X in [37, 55], Z in [61, 79])
    // 1. Foundation & Ground Pavement at Y = 1
    for (let x = cx - 9; x <= cx + 9; x++) {
      for (let z = cz - 9; z <= cz + 9; z++) {
        // Main building footprint: X in [cx - 7, cx + 5], Z in [cz - 7, cz + 7]
        const isInsideBuilding = (x >= cx - 7 && x <= cx + 5 && z >= cz - 7 && z <= cz + 7);
        // Ambulance driveway on East side: X in [cx + 6, cx + 9]
        const isDriveway = (x >= cx + 6 && z >= cz - 8 && z <= cz + 8);

        if (isInsideBuilding) {
          this.setBlock(x, 1, z, 'quartz_block'); // Sterile hospital floor
        } else if (isDriveway) {
          this.setBlock(x, 1, z, 'asphalt_road'); // Emergency bay apron
        } else {
          this.setBlock(x, 1, z, 'smooth_stone'); // Perimeter walkways
        }
      }
    }

    // 2. Emergency Department (ER) Ambulance Bay & Parked Ambulance (East side at cx + 7, cz)
    // Cantilevered ER Drop-off Canopy at Y = 5 (X in [cx + 5, cx + 9], Z in [cz - 4, cz + 4])
    for (let x = cx + 5; x <= cx + 9; x++) {
      for (let z = cz - 4; z <= cz + 4; z++) {
        this.setBlock(x, 5, z, 'quartz_block');
        if (x === cx + 9 || Math.abs(z - cz) === 4) {
          this.setBlock(x, 5, z, 'redstone_block'); // Red emergency trim
        }
      }
      this.setBlock(cx + 9, 2, cz - 4, 'iron_block'); // Canopy support pillar
      this.setBlock(cx + 9, 3, cz - 4, 'iron_block');
      this.setBlock(cx + 9, 4, cz - 4, 'iron_block');
      this.setBlock(cx + 9, 2, cz + 4, 'iron_block');
      this.setBlock(cx + 9, 3, cz + 4, 'iron_block');
      this.setBlock(cx + 9, 4, cz + 4, 'iron_block');
    }
    this.setBlock(cx + 9, 5, cz, 'beacon'); // Flashing emergency beacon

    // Parked Emergency Ambulance Vehicle at (cx + 7, 1, cz)
    const ambX = cx + 7;
    const ambZ1 = cz - 3;
    const ambZ2 = cz + 2;
    for (let z = ambZ1; z <= ambZ2; z++) {
      for (let x = ambX - 1; x <= ambX + 1; x++) {
        const isWheel = (z === ambZ1 + 1 || z === ambZ2 - 1) && (x === ambX - 1 || x === ambX + 1);
        if (isWheel) {
          this.setBlock(x, 1, z, 'coal_block');
          this.setBlock(x, 2, z, 'iron_block');
        } else {
          this.setBlock(x, 1, z, 'iron_block'); // Chassis
          this.setBlock(x, 2, z, 'quartz_block'); // White ambulance body
          if (x === ambX - 1 || x === ambX + 1) {
            this.setBlock(x, 2, z, (z === cz) ? 'redstone_block' : 'quartz_block'); // Red cross stripe
          }
        }
        // Cabin & Windows (Y = 3)
        if (z === ambZ1) {
          this.setBlock(x, 3, z, 'cyber_glass'); // Windshield facing North
        } else {
          this.setBlock(x, 3, z, (x === ambX) ? 'smooth_stone' : 'cyber_glass');
        }
        // Roof (Y = 4)
        this.setBlock(x, 4, z, 'quartz_block');
      }
    }
    // Ambulance Lightbar & Headlights
    this.setBlock(ambX - 1, 4, ambZ1 + 1, 'redstone_block'); // Red strobe
    this.setBlock(ambX, 4, ambZ1 + 1, 'sea_lantern');
    this.setBlock(ambX + 1, 4, ambZ1 + 1, 'lapis_block'); // Blue strobe
    this.setBlock(ambX - 1, 2, ambZ1, 'sea_lantern');     // Headlight
    this.setBlock(ambX + 1, 2, ambZ1, 'sea_lantern');
    this.setBlock(ambX - 1, 2, ambZ2, 'redstone_block');  // Tail light
    this.setBlock(ambX + 1, 2, ambZ2, 'redstone_block');

    // 3. Main Hospital Building Structure (X in [cx - 7, cx + 5], Z in [cz - 7, cz + 7], Y = 2 to 9)
    for (let x = cx - 7; x <= cx + 5; x++) {
      for (let z = cz - 7; z <= cz + 7; z++) {
        const isPerimeter = (x === cx - 7 || x === cx + 5 || z === cz - 7 || z === cz + 7);
        const isCorner = (x === cx - 7 || x === cx + 5) && (z === cz - 7 || z === cz + 7);

        // Ground Floor Ceiling / Second Floor (Y = 5)
        this.setBlock(x, 5, z, 'smooth_stone');

        if (isPerimeter) {
          for (let y = 2; y <= 9; y++) {
            // Main entrance sliding doors on North facade (X in [cx - 2, cx - 1], Z = cz - 7, Y in [2, 3])
            const isMainEntrance = (z === cz - 7 && (x === cx - 2 || x === cx - 1) && y <= 3);
            // ER entrance on East facade under canopy (x = cx + 5, Z in [cz - 1, cz + 1], Y in [2, 3])
            const isErEntrance = (x === cx + 5 && Math.abs(z - cz) <= 1 && y <= 3);

            if (isMainEntrance || isErEntrance) {
              continue; // Open doorway
            }

            // Ribbon cyber-glass windows on both floors
            const isWindow = (y === 3 || y === 4 || y === 7 || y === 8) && !isCorner && (x % 3 !== 0 && z % 3 !== 0);

            if (isWindow) {
              this.setBlock(x, y, z, 'cyber_glass');
            } else if (isCorner) {
              this.setBlock(x, y, z, 'quartz_pillar');
            } else {
              this.setBlock(x, y, z, 'quartz_block');
            }
          }
        }
      }
    }

    // 4. Large 3D Embossed Red Cross Signs on Exterior Facades
    // North facade Red Cross (Z = cz - 7, Y in [6, 8])
    for (let y = 6; y <= 8; y++) this.setBlock(cx - 2, y, cz - 7, 'redstone_block');
    for (let x = cx - 3; x <= cx - 1; x++) this.setBlock(x, 7, cz - 7, 'redstone_block');
    // West facade Red Cross (X = cx - 7, Y in [6, 8])
    for (let y = 6; y <= 8; y++) this.setBlock(cx - 7, y, cz, 'redstone_block');
    for (let z = cz - 1; z <= cz + 1; z++) this.setBlock(cx - 7, 7, z, 'redstone_block');

    // 5. Ground Floor Interior: Triage, Reception, Waiting Area & Pharmacy (Y = 2 to 4)
    // Reception & Triage Desk at (cx - 2, cz - 4)
    this.setBlock(cx - 2, 2, cz - 4, 'quartz_block');
    this.setBlock(cx - 1, 2, cz - 4, 'quartz_block');
    this.setBlock(cx, 2, cz - 4, 'quartz_block');
    this.setBlock(cx - 1, 3, cz - 4, 'glowstone'); // Computer terminal
    // Waiting Lounge with chairs
    for (let z = cz - 3; z <= cz + 2; z += 2) {
      this.setBlock(cx - 5, 2, z, 'quartz_block'); // Padded seat
      this.setBlock(cx - 5, 2, z + 1, 'quartz_block');
    }
    // Water cooler in waiting lounge
    this.setBlock(cx - 6, 2, cz + 4, 'cauldron');
    this.setBlock(cx - 6, 3, cz + 4, 'water');
    // Pharmacy / Dispensary on South wall
    for (let x = cx - 1; x <= cx + 3; x++) {
      this.setBlock(x, 2, cz + 6, 'bookshelf');
      this.setBlock(x, 3, cz + 6, (x % 2 === 0) ? 'glass' : 'bookshelf');
    }

    // Interior Stairs leading to Second Floor (X = cx - 6, Z in [cz + 4, cz + 7])
    for (let step = 0; step <= 3; step++) {
      this.setBlock(cx - 6, 2 + step, cz + 4 + step, 'smooth_stone');
      this.setBlock(cx - 5, 2 + step, cz + 4 + step, 'smooth_stone');
    }

    // 6. Second Floor Interior: ICU & Recovery Ward (Y = 6 to 9)
    // 3 Fully Equipped Hospital Patient Beds
    const beds = [
      { bx: cx - 4, bz: cz - 4 },
      { bx: cx - 4, bz: cz },
      { bx: cx - 4, bz: cz + 4 }
    ];
    for (const b of beds) {
      // Bed
      this.setBlock(b.bx, 6, b.bz, 'quartz_block'); // Mattress
      this.setBlock(b.bx + 1, 6, b.bz, 'quartz_block');
      this.setBlock(b.bx, 7, b.bz, 'smooth_stone'); // Pillow
      // Heart Rate Monitor Terminal
      this.setBlock(b.bx - 1, 6, b.bz, 'iron_block');
      this.setBlock(b.bx - 1, 7, b.bz, 'cyber_glass');
      this.setBlock(b.bx - 1, 8, b.bz, 'sea_lantern');
      // IV Drip Medicine Stand
      this.setBlock(b.bx + 2, 6, b.bz, 'iron_block');
      this.setBlock(b.bx + 2, 7, b.bz, 'glass');
    }
    // Doctor's consultation desk
    this.setBlock(cx + 2, 6, cz - 2, 'oak_planks');
    this.setBlock(cx + 3, 6, cz - 2, 'oak_planks');
    this.setBlock(cx + 2, 7, cz - 2, 'glowstone');

    // 7. Rooftop Helipad & HVAC Mechanical Penthouse (Y = 10 to 14)
    // Reinforced Roof Slab at Y = 10 (X in [cx - 7, cx + 5], Z in [cz - 7, cz + 7])
    for (let x = cx - 7; x <= cx + 5; x++) {
      for (let z = cz - 7; z <= cz + 7; z++) {
        this.setBlock(x, 10, z, 'quartz_block');
        // Safety perimeter railing
        if (x === cx - 7 || x === cx + 5 || z === cz - 7 || z === cz + 7) {
          this.setBlock(x, 11, z, 'iron_block');
        }
      }
    }

    // 7x7 Rooftop Helipad with Bold Red/Yellow "H" Marking (Centered at cx - 1, cz)
    const hpX = cx - 1;
    const hpZ = cz;
    for (let dx = -3; dx <= 3; dx++) {
      for (let dz = -3; dz <= 3; dz++) {
        const isBorder = (Math.abs(dx) === 3 || Math.abs(dz) === 3);
        if (isBorder) {
          this.setBlock(hpX + dx, 10, hpZ + dz, 'redstone_block');
          if ((Math.abs(dx) === 3 && Math.abs(dz) === 3)) {
            this.setBlock(hpX + dx, 11, hpZ + dz, 'sea_lantern'); // Aeronautical perimeter lights
          }
        } else {
          // Yellow "H" inside
          const isH = (Math.abs(dx) === 1 && Math.abs(dz) <= 1) || (dx === 0 && dz === 0);
          this.setBlock(hpX + dx, 10, hpZ + dz, isH ? 'gold_block' : 'smooth_stone');
        }
      }
    }

    // Elevator & Stair Penthouse with Rooftop HVAC Chillers
    for (let x = cx - 6; x <= cx - 4; x++) {
      for (let z = cz + 4; z <= cz + 6; z++) {
        for (let y = 11; y <= 13; y++) {
          this.setBlock(x, y, z, 'quartz_block');
        }
      }
    }
    // Industrial AC Units
    this.setBlock(cx + 3, 11, cz + 3, 'iron_block');
    this.setBlock(cx + 3, 12, cz + 3, 'iron_block');
    this.setBlock(cx + 3, 11, cz - 3, 'iron_block');
    this.setBlock(cx + 3, 12, cz - 3, 'iron_block');

    this.setBlock(cx - 2, 2, cz - 8, 'sea_lantern', {
      type: 'sign',
      title: 'Crossroads General Hospital & Trauma Center 🏥💉',
      text: 'Level 1 Trauma Center featuring active Emergency Ambulance Bay, 2-story inpatient wards, ICU life support, and a rooftop LifeFlight Helipad.'
    });
  }

  private buildPoliceStation(cx: number, cz: number) {
    // Crossroads 1st Precinct Police Headquarters (Footprint: X in [68, 84], Z in [44, 60], centered at 76, 52)
    // 1. Foundation & Floor at Y = 1
    for (let x = cx - 8; x <= cx + 8; x++) {
      for (let z = cz - 8; z <= cz + 8; z++) {
        const isBuilding = (x >= cx - 5 && x <= cx + 7 && z >= cz - 7 && z <= cz + 7);
        const isSquadLot = (x >= cx - 8 && x <= cx - 6 && z >= cz - 7 && z <= cz + 7);

        if (isBuilding) {
          this.setBlock(x, 1, z, 'smooth_stone'); // Precinct polished floor
        } else if (isSquadLot) {
          this.setBlock(x, 1, z, 'asphalt_road'); // Squad car parking bay
        } else {
          this.setBlock(x, 1, z, 'stone_bricks');
        }
      }
    }

    // 2. Marked Police Patrol Interceptor Cruiser (West lot at cx - 7, cz)
    const copX = cx - 7;
    const copZ1 = cz - 3;
    const copZ2 = cz + 2;
    for (let z = copZ1; z <= copZ2; z++) {
      for (let x = copX - 1; x <= copX + 1; x++) {
        const isWheel = (z === copZ1 + 1 || z === copZ2 - 1) && (x === copX - 1 || x === copX + 1);
        if (isWheel) {
          this.setBlock(x, 1, z, 'coal_block');
          this.setBlock(x, 2, z, 'iron_block');
        } else {
          this.setBlock(x, 1, z, 'iron_block');
          // Black and white police livery: black hood/trunk, white doors
          const isWhiteDoor = (z >= cz - 1 && z <= cz);
          this.setBlock(x, 2, z, isWhiteDoor ? 'quartz_block' : 'coal_block');
        }
        // Cabin & Windows (Y = 3)
        if (z === copZ1) {
          this.setBlock(x, 3, z, 'cyber_glass'); // Windshield facing North
        } else if (z > copZ1 && z < copZ2) {
          this.setBlock(x, 3, z, (x === copX) ? 'coal_block' : 'cyber_glass');
        }
        // Roof (Y = 4)
        if (z > copZ1 && z < copZ2) {
          this.setBlock(x, 4, z, 'quartz_block'); // White roof
        }
      }
    }
    // Front Heavy Iron Push Bumper / Bullbar
    this.setBlock(copX - 1, 2, copZ1 - 1, 'iron_block');
    this.setBlock(copX, 2, copZ1 - 1, 'iron_block');
    this.setBlock(copX + 1, 2, copZ1 - 1, 'iron_block');
    // Headlights & Tail lights
    this.setBlock(copX - 1, 2, copZ1, 'sea_lantern');
    this.setBlock(copX + 1, 2, copZ1, 'sea_lantern');
    this.setBlock(copX - 1, 2, copZ2, 'redstone_block');
    this.setBlock(copX + 1, 2, copZ2, 'redstone_block');
    // Police Lightbar (Red, Siren, Blue) atop roof at Y = 5
    this.setBlock(copX - 1, 5, cz, 'redstone_block'); // Red strobe
    this.setBlock(copX, 5, cz, 'sea_lantern');        // Center siren
    this.setBlock(copX + 1, 5, cz, 'lapis_block');    // Blue strobe

    // 3. Fortified 2-Story Precinct Structure (X in [cx - 5, cx + 7], Z in [cz - 7, cz + 7], Y = 2 to 9)
    for (let x = cx - 5; x <= cx + 7; x++) {
      for (let z = cz - 7; z <= cz + 7; z++) {
        const isPerimeter = (x === cx - 5 || x === cx + 7 || z === cz - 7 || z === cz + 7);
        const isCorner = (x === cx - 5 || x === cx + 7) && (z === cz - 7 || z === cz + 7);

        // Ground floor ceiling / second floor (Y = 5)
        this.setBlock(x, 5, z, 'stone_bricks');

        if (isPerimeter) {
          for (let y = 2; y <= 9; y++) {
            // Front double security door on North facade (Z = cz - 7, X in [cx, cx + 1], Y in [2, 3])
            const isFrontDoor = (z === cz - 7 && (x === cx || x === cx + 1) && y <= 3);
            if (isFrontDoor) continue;

            const isWindow = (y === 3 || y === 4 || y === 7 || y === 8) && !isCorner && (x % 3 !== 0 && z % 3 !== 0);

            if (isWindow) {
              this.setBlock(x, y, z, 'cyber_glass');
            } else if (isCorner) {
              this.setBlock(x, y, z, 'quartz_pillar');
            } else {
              this.setBlock(x, y, z, (y === 5 || y === 9) ? 'smooth_stone' : 'stone_bricks');
            }
          }
        }
      }
    }

    // Architectural Front Entrance Portico & Blue Police Shield
    for (let x = cx - 1; x <= cx + 2; x++) {
      this.setBlock(x, 4, cz - 8, 'quartz_block');
      this.setBlock(x, 5, cz - 8, (x === cx || x === cx + 1) ? 'lapis_block' : 'gold_block');
    }
    this.setBlock(cx, 6, cz - 8, 'sea_lantern');
    this.setBlock(cx + 1, 6, cz - 8, 'sea_lantern');

    // 4. Ground Floor Interior: Dispatch Desk, Records & 2-Cell Jail Holding Facility
    // Dispatch / Intake Desk with Bulletproof Window (Z in [cz - 4, cz - 1])
    this.setBlock(cx, 2, cz - 4, 'iron_block');
    this.setBlock(cx + 1, 2, cz - 4, 'iron_block');
    this.setBlock(cx + 2, 2, cz - 4, 'iron_block');
    this.setBlock(cx + 1, 3, cz - 4, 'cyber_glass');
    this.setBlock(cx + 1, 3, cz - 5, 'glowstone'); // Dispatch computer
    // Mugshot measurement wall chart at (cx + 6, cz - 4)
    this.setBlock(cx + 6, 2, cz - 4, 'quartz_block');
    this.setBlock(cx + 6, 3, cz - 4, 'smooth_stone');

    // 2-Cell Reinforced Lockup Holding Facility (South-East corner: X in [cx + 2, cx + 6], Z in [cz + 2, cz + 6])
    // Iron Cell Partition Wall
    for (let z = cz + 2; z <= cz + 6; z++) {
      for (let y = 2; y <= 4; y++) {
        this.setBlock(cx + 1, y, z, (z === cz + 3 || z === cz + 5) ? 'iron_block' : 'iron_block'); // Cell bars
      }
    }
    // Dividing wall between Cell 1 and Cell 2
    for (let x = cx + 2; x <= cx + 6; x++) {
      for (let y = 2; y <= 4; y++) {
        this.setBlock(x, y, cz + 4, 'iron_block');
      }
    }
    // Prisoner Bunks & Toilets inside cells
    this.setBlock(cx + 5, 2, cz + 3, 'oak_planks'); // Cell 1 bunk
    this.setBlock(cx + 6, 2, cz + 3, 'oak_planks');
    this.setBlock(cx + 5, 2, cz + 5, 'oak_planks'); // Cell 2 bunk
    this.setBlock(cx + 6, 2, cz + 5, 'oak_planks');
    this.setBlock(cx + 2, 2, cz + 3, 'cauldron');   // Cell 1 basin
    this.setBlock(cx + 2, 2, cz + 5, 'cauldron');   // Cell 2 basin

    // Interior stairs to upper floor (along West wall: X = cx - 4, Z in [cz + 3, cz + 6])
    for (let step = 0; step <= 3; step++) {
      this.setBlock(cx - 4, 2 + step, cz + 3 + step, 'stone_bricks');
    }

    // 5. Second Floor Interior: Detective Bullpen & Police Chief's Office (Y = 6 to 9)
    // Detective Desks & Case File Archives
    this.setBlock(cx - 2, 6, cz - 2, 'oak_planks');
    this.setBlock(cx - 1, 6, cz - 2, 'oak_planks');
    this.setBlock(cx - 2, 7, cz - 2, 'glowstone'); // Detective terminal
    this.setBlock(cx + 3, 6, cz - 2, 'bookshelf'); // Case archives
    this.setBlock(cx + 4, 6, cz - 2, 'bookshelf');
    this.setBlock(cx + 5, 6, cz - 2, 'bookshelf');
    // Police Chief's Corner Office
    this.setBlock(cx + 4, 6, cz + 4, 'oak_planks'); // Executive desk
    this.setBlock(cx + 5, 6, cz + 4, 'gold_block');
    this.setBlock(cx + 4, 7, cz + 4, 'sea_lantern');

    // 6. Rooftop Parapet, Security Searchlights & Communications Mast (Y = 10 to 18)
    for (let x = cx - 5; x <= cx + 7; x++) {
      for (let z = cz - 7; z <= cz + 7; z++) {
        this.setBlock(x, 10, z, 'stone_bricks'); // Roof slab
        const isRim = (x === cx - 5 || x === cx + 7 || z === cz - 7 || z === cz + 7);
        if (isRim && (x + z) % 2 === 0) {
          this.setBlock(x, 11, z, 'stone_bricks'); // Crenelated battlements
        }
      }
    }

    // High Steel Communications Antenna Mast at (cx + 5, cz + 5)
    for (let y = 11; y <= 17; y++) {
      this.setBlock(cx + 5, y, cz + 5, 'iron_block');
    }
    this.setBlock(cx + 5, 18, cz + 5, 'redstone_block'); // Blinking red air hazard beacon
    this.setBlock(cx + 5, 19, cz + 5, 'beacon');

    // Security Spotlights on roof corners
    this.setBlock(cx - 4, 11, cz - 6, 'sea_lantern');
    this.setBlock(cx + 6, 11, cz - 6, 'sea_lantern');

    this.setBlock(cx + 1, 2, cz - 9, 'glowstone', {
      type: 'sign',
      title: 'Crossroads 1st Precinct Police Headquarters 🚓🚨',
      text: 'Municipal public safety precinct featuring patrol cruiser interceptor, dispatch desk, 2-cell holding lockup, detective bullpen, and communications mast.'
    });
  }

  private buildSchool(cx: number, cz: number) {
    // Crossroads Academy · Public Magnet School (Footprint: X in [37, 55], Z in [43, 61], centered at 46, 52)
    // 1. Foundation, Schoolyard & Athletic Court at Y = 1
    for (let x = cx - 9; x <= cx + 9; x++) {
      for (let z = cz - 9; z <= cz + 9; z++) {
        const isBuilding = (x >= cx - 7 && x <= cx + 5 && z >= cz - 7 && z <= cz + 7);
        const isBusLane = (x >= cx + 6 && x <= cx + 9 && z >= cz - 8 && z <= cz + 8);
        const isCourtyard = (x >= cx - 9 && x <= cx - 8 && z >= cz - 7 && z <= cz + 7);

        if (isBuilding) {
          this.setBlock(x, 1, z, 'oak_planks'); // Warm hardwood school floor
        } else if (isBusLane) {
          this.setBlock(x, 1, z, 'asphalt_road'); // Bus loading drop-off zone
        } else if (isCourtyard) {
          this.setBlock(x, 1, z, 'terracotta_adobe'); // Outdoor brick plaza
        } else {
          this.setBlock(x, 1, z, 'grass');
        }
      }
    }

    // 2. Iconic Yellow American School Bus (Parked in bus lane at cx + 7, cz)
    const busX = cx + 7;
    const busZ1 = cz - 4;
    const busZ2 = cz + 3;
    for (let z = busZ1; z <= busZ2; z++) {
      for (let x = busX - 1; x <= busX + 1; x++) {
        const isWheel = (z === busZ1 + 1 || z === busZ2 - 1) && (x === busX - 1 || x === busX + 1);
        if (isWheel) {
          this.setBlock(x, 1, z, 'coal_block');
          this.setBlock(x, 2, z, 'iron_block');
        } else {
          this.setBlock(x, 1, z, 'iron_block'); // Chassis
          this.setBlock(x, 2, z, 'gold_block'); // School Bus Yellow body
          // Black side rub rails
          if (x === busX - 1 || x === busX + 1) {
            this.setBlock(x, 2, z, 'gold_block');
          }
        }
        // Windows (Y = 3)
        if (z === busZ1) {
          this.setBlock(x, 3, z, 'cyber_glass'); // Front windshield
        } else if (z === busZ2) {
          this.setBlock(x, 3, z, 'cyber_glass'); // Rear emergency door window
        } else {
          this.setBlock(x, 3, z, (x === busX) ? 'oak_planks' : 'cyber_glass'); // Student passenger windows
        }
        // Roof (Y = 4)
        this.setBlock(x, 4, z, 'gold_block');
      }
    }
    // Front Radiator Grille, Headlights & Red Flashers
    this.setBlock(busX - 1, 2, busZ1, 'sea_lantern'); // Headlights
    this.setBlock(busX + 1, 2, busZ1, 'sea_lantern');
    this.setBlock(busX, 2, busZ1 - 1, 'iron_block');  // Front bumper
    this.setBlock(busX - 1, 4, busZ1, 'redstone_block'); // Flashing yellow/red loading lights
    this.setBlock(busX + 1, 4, busZ1, 'redstone_block');
    this.setBlock(busX - 1, 4, busZ2, 'redstone_block');
    this.setBlock(busX + 1, 4, busZ2, 'redstone_block');
    // Driver Swing-out Stop Sign on driver side
    this.setBlock(busX - 2, 3, busZ1 + 2, 'redstone_block');

    // 3. Main Schoolhouse Structure (X in [cx - 7, cx + 5], Z in [cz - 7, cz + 7], Y = 2 to 7)
    for (let x = cx - 7; x <= cx + 5; x++) {
      for (let z = cz - 7; z <= cz + 7; z++) {
        const isPerimeter = (x === cx - 7 || x === cx + 5 || z === cz - 7 || z === cz + 7);
        const isCorner = (x === cx - 7 || x === cx + 5) && (z === cz - 7 || z === cz + 7);

        if (isPerimeter) {
          for (let y = 2; y <= 7; y++) {
            // Front arched entrance doorway on North facade (Z = cz - 7, X in [cx - 2, cx - 1], Y in [2, 3])
            const isDoor = (z === cz - 7 && (x === cx - 2 || x === cx - 1) && y <= 3);
            if (isDoor) continue;

            // Classrooms windows with bright white frames
            const isWindow = (y === 3 || y === 4 || y === 6) && !isCorner && (x % 2 === 0 || z % 2 === 0);

            if (isWindow) {
              this.setBlock(x, y, z, 'glass');
            } else if (isCorner) {
              this.setBlock(x, y, z, 'quartz_pillar');
            } else {
              this.setBlock(x, y, z, (y === 7) ? 'stone_bricks' : 'red_sandstone');
            }
          }
        }
        // Gabled Academy Roof (Y = 8)
        this.setBlock(x, 8, z, 'terracotta_adobe');
      }
    }

    // 4. Central 3-Story Clock & Bell Tower (Centered at cx - 1, cz, rising Y = 9 to 16)
    const twrX = cx - 1;
    const twrZ = cz;
    for (let y = 9; y <= 13; y++) {
      for (let dx = -2; dx <= 2; dx++) {
        for (let dz = -2; dz <= 2; dz++) {
          const isEdge = (Math.abs(dx) === 2 || Math.abs(dz) === 2);
          if (isEdge) {
            this.setBlock(twrX + dx, y, twrZ + dz, 'stone_bricks');
          }
        }
      }
    }
    // 4-Sided Illuminated Tower Clock Faces at Y = 12
    this.setBlock(twrX, 12, twrZ - 2, 'sea_lantern'); // North clock face
    this.setBlock(twrX, 12, twrZ + 2, 'sea_lantern'); // South clock face
    this.setBlock(twrX - 2, 12, twrZ, 'sea_lantern'); // West clock face
    this.setBlock(twrX + 2, 12, twrZ, 'sea_lantern'); // East clock face

    // Open Belfry Chamber with Golden School Bell (Y = 14)
    for (const [dx, dz] of [[-2, -2], [2, -2], [-2, 2], [2, 2]]) {
      this.setBlock(twrX + dx, 14, twrZ + dz, 'stone_bricks');
      this.setBlock(twrX + dx, 15, twrZ + dz, 'stone_bricks');
    }
    this.setBlock(twrX, 14, twrZ, 'gold_block'); // School bell
    this.setBlock(twrX, 15, twrZ, 'gold_block');

    // Copper/Brass Spire Peak (Y = 16 to 18)
    for (let dx = -1; dx <= 1; dx++) {
      for (let dz = -1; dz <= 1; dz++) {
        this.setBlock(twrX + dx, 16, twrZ + dz, 'red_sandstone');
      }
    }
    this.setBlock(twrX, 17, twrZ, 'gold_block');
    this.setBlock(twrX, 18, twrZ, 'beacon');

    // 5. Interior: Entrance Hall, Lockers, Classrooms & Science Library
    // Student Lockers along central corridor (Z = cz - 2)
    for (let x = cx - 5; x <= cx + 3; x += 2) {
      this.setBlock(x, 2, cz - 2, 'iron_block'); // Metal lockers
      this.setBlock(x, 3, cz - 2, 'iron_block');
    }
    // Trophy Display Showcase
    this.setBlock(cx - 1, 2, cz - 5, 'glass');
    this.setBlock(cx - 1, 3, cz - 5, 'gold_block'); // Academic trophy

    // Classroom 1 (Elementary / STEM at West side: X in [cx - 6, cx - 2], Z in [cz + 1, cz + 6])
    // Large Classroom Chalkboard on West wall
    for (let z = cz + 2; z <= cz + 5; z++) {
      this.setBlock(cx - 6, 2, z, 'coal_block'); // Black chalkboard
      this.setBlock(cx - 6, 3, z, (z === cz + 3 || z === cz + 4) ? 'quartz_block' : 'coal_block'); // Chalk writing
    }
    // Teacher's Desk & Podium
    this.setBlock(cx - 4, 2, cz + 2, 'oak_planks');
    this.setBlock(cx - 4, 3, cz + 2, 'redstone_block'); // Teacher's red apple
    // Rows of Wooden Student Desks & Chairs
    for (const dz of [cz + 4, cz + 6]) {
      for (const dx of [cx - 5, cx - 3]) {
        this.setBlock(dx, 2, dz, 'oak_planks'); // Desk
        this.setBlock(dx, 2, dz - 1, 'oak_stairs'); // Chair
      }
    }

    // Classroom 2 (Academy Library & Science Lab at East side: X in [cx, cx + 4], Z in [cz + 1, cz + 6])
    for (let z = cz + 1; z <= cz + 6; z += 2) {
      this.setBlock(cx + 4, 2, z, 'bookshelf');
      this.setBlock(cx + 4, 3, z, 'bookshelf');
    }
    // Science Lab Workbench with Cauldrons
    this.setBlock(cx + 1, 2, cz + 3, 'smooth_stone');
    this.setBlock(cx + 2, 2, cz + 3, 'cauldron'); // Chemistry beaker
    this.setBlock(cx + 2, 3, cz + 3, 'glass');
    this.setBlock(cx + 1, 2, cz + 5, 'smooth_stone');
    this.setBlock(cx + 2, 2, cz + 5, 'cauldron');

    // 6. School Playground & Basketball Court (South-West Yard at cx - 8, cz - 4)
    // Basketball Backboard & Hoop
    this.setBlock(cx - 9, 2, cz - 4, 'oak_fence');
    this.setBlock(cx - 9, 3, cz - 4, 'oak_fence');
    this.setBlock(cx - 9, 4, cz - 4, 'iron_block'); // Backboard
    this.setBlock(cx - 8, 4, cz - 4, 'gold_block'); // Hoop ring
    // Court Markings
    this.setBlock(cx - 8, 1, cz - 4, 'quartz_block');
    this.setBlock(cx - 8, 1, cz - 3, 'quartz_block');
    this.setBlock(cx - 8, 1, cz - 5, 'quartz_block');

    this.setBlock(cx - 2, 2, cz - 8, 'sea_lantern', {
      type: 'sign',
      title: 'Crossroads Academy · Public Magnet School 🏫📚',
      text: 'Neighborhood public school featuring a 3-story clock & bell tower, yellow school bus, student classrooms with chalkboards, STEM science lab, and basketball court.'
    });
  }

  private buildCityZoo(cx: number, cz: number) {
    // Grand Crossroads Wildlife Park & Safari Sanctuary (Footprint: X in [cx - 40, cx + 27], Z in [cz - 22, cz + 22])
    // cx = -65, cz = 0 => X in [-105, -38], Z in [-22, 22] (Over 2,800 blocks, 8 thematic natural habitats)

    const minX = cx - 40; // -105
    const maxX = cx + 27; // -38
    const minZ = cz - 22; // -22
    const maxZ = cz + 22; // 22

    // 1. Overall Park Perimeter Fence & Landscaping
    for (let x = minX; x <= maxX; x++) {
      for (let z = minZ; z <= maxZ; z++) {
        // Main promenade paths
        const isMainAvenue = (Math.abs(z - cz) <= 1 && x >= cx - 15) || (Math.abs(x - (cx - 15)) <= 1);
        const isPlaza = (x >= maxX - 8 && Math.abs(z - cz) <= 4);
        const isNorthWalk = (Math.abs(z - (cz - 7)) <= 1 && x >= minX + 5 && x <= maxX - 5);
        const isSouthWalk = (Math.abs(z - (cz + 7)) <= 1 && x >= minX + 5 && x <= maxX - 5);
        const isWalkway = isMainAvenue || isPlaza || isNorthWalk || isSouthWalk;

        if (isWalkway) {
          this.setBlock(x, 1, z, ((x + z) % 3 === 0) ? "mossy_stone_bricks" : "smooth_stone");
        } else {
          // Natural terrain based on habitat zone
          if (x <= cx - 18 && z <= cz - 7) {
            // Lion Kopje
            this.setBlock(x, 1, z, ((x + z) % 2 === 0) ? "red_sandstone" : "terracotta_adobe");
          } else if (x >= cx - 17 && x <= cx - 1 && z <= cz - 7) {
            // Arctic Polar Basin
            this.setBlock(x, 1, z, ((x + z) % 3 === 0) ? "ice" : "snow");
          } else if (x <= cx - 15 && z >= cz + 7) {
            // Elephant Oasis
            this.setBlock(x, 1, z, ((x + z) % 4 === 0) ? "sand" : "grass");
          } else if (x > cx - 15 && z >= cz + 7) {
            // Giraffe & Petting Barnyard
            this.setBlock(x, 1, z, "grass");
          } else {
            // Central Savanna & Wetland
            this.setBlock(x, 1, z, ((x + z) % 5 === 0) ? "cobblestone" : "grass");
          }
        }

        // Boundary perimeter fence
        const isPerimeter = (x === minX || x === maxX || z === minZ || z === maxZ);
        const isEastEntranceGate = (x === maxX && Math.abs(z - cz) <= 3);

        if (isPerimeter && !isEastEntranceGate) {
          this.setBlock(x, 2, z, "oak_fence");
          this.setBlock(x, 3, z, "oak_fence");
        }
      }
    }

    // 2. Grand Welcoming Timber Entrance Archway & Gate Plaza (X = maxX = -38)
    for (const pz of [cz - 3, cz + 3]) {
      for (let y = 1; y <= 5; y++) {
        this.setBlock(maxX, y, pz, "oak_log");
      }
      this.setBlock(maxX, 5, pz, "lantern");
      this.setBlock(maxX - 1, 5, pz, "lantern");
    }
    // Overhead Arch Beam across X = maxX
    for (let z = cz - 2; z <= cz + 2; z++) {
      this.setBlock(maxX, 5, z, "oak_log");
      this.setBlock(maxX, 6, z, (z === cz) ? "gold_block" : "oak_planks");
    }
    this.setBlock(maxX, 7, cz, "sea_lantern");

    // Welcoming Park Portal Sign
    this.setBlock(maxX - 1, 2, cz + 2, "oak_log", {
      type: "sign",
      title: "🦁 Crossroads Grand Safari & Wildlife Park 🐼",
      text: "Welcome to the island animal sanctuary!\nStroll along shaded nature trails to explore living giant pandas, African lions, gentle elephants, polar bears, giraffes, zebras, flamingos, and visit the petting farm!"
    });

    // Safari Visitor Center & Information Kiosk at (maxX - 5, cz + 4)
    for (let x = maxX - 6; x <= maxX - 4; x++) {
      for (let z = cz + 3; z <= cz + 5; z++) {
        this.setBlock(x, 1, z, "oak_planks");
        const isWall = (x === maxX - 6 || z === cz + 5);
        this.setBlock(x, 2, z, isWall ? "oak_planks" : "cyber_glass");
        this.setBlock(x, 3, z, "oak_planks");
        this.setBlock(x, 4, z, "stone_bricks");
      }
    }
    this.setBlock(maxX - 4, 2, cz + 2, "oak_planks", {
      type: "sign",
      title: "Safari Visitor Guide & Reserve Map 🗺️",
      text: "Sanctuary Habitats:\n• 🐼 Bamboo Valley (NW)\n• 🦁 African Lion Kopje (NW far)\n• 🐘 Elephant Oasis (SW)\n• 🦒 Giraffe Canopy Skywalk (SE)\n• ❄️ Arctic Glacier & Penguins (N)\n• 🐑 Farm Barnyard & Petting Zoo (E)\n• 🦓 Savanna Zebra Plains (Center)\n• 🦩 Flamingo Wetlands & Lagoon (Center-East)\nEnjoy your visit!"
    });

    // 3. Central Meandering Safari River & Suspension Footbridges
    for (let x = cx - 18; x <= cx + 10; x++) {
      for (let z = cz - 3; z <= cz + 3; z++) {
        const riverZ = cz + Math.round(Math.sin((x - cx) * 0.2) * 2.5);
        if (Math.abs(z - riverZ) <= 1) {
          this.setBlock(x, -1, z, "sand");
          this.setBlock(x, 0, z, "water");
          this.setBlock(x, 1, z, "water");
        }
      }
    }
    // Water lilies and reeds in the river
    this.setBlock(cx + 4, 2, cz, "leaves");
    this.setBlock(cx - 5, 2, cz - 1, "leaves");
    this.setBlock(cx - 14, 2, cz + 1, "leaves");

    // Footbridge 1 (East Footbridge at cx + 5, cz)
    for (let z = cz - 2; z <= cz + 2; z++) {
      this.setBlock(cx + 5, 2, z, "oak_planks");
      this.setBlock(cx + 4, 2, z, "oak_fence");
      this.setBlock(cx + 6, 2, z, "oak_fence");
    }
    this.setBlock(cx + 4, 3, cz - 2, "lantern");
    this.setBlock(cx + 6, 3, cz + 2, "lantern");

    // Footbridge 2 (West Footbridge at cx - 10, cz)
    for (let z = cz - 2; z <= cz + 2; z++) {
      this.setBlock(cx - 10, 2, z, "oak_planks");
      this.setBlock(cx - 11, 2, z, "oak_fence");
      this.setBlock(cx - 9, 2, z, "oak_fence");
    }
    this.setBlock(cx - 11, 3, cz - 2, "lantern");
    this.setBlock(cx - 9, 3, cz + 2, "lantern");

    // 4. Habitat 1: Giant Panda Bamboo Valley (X in [cx + 2, maxX - 8], Z in [minZ + 1, cz - 8])
    for (let x = cx + 2; x <= maxX - 8; x++) {
      this.setBlock(x, 2, cz - 8, "oak_fence");
    }
    for (let z = minZ + 1; z <= cz - 8; z++) {
      this.setBlock(cx + 2, 2, z, "oak_fence");
    }
    // Dense emerald bamboo stalks
    for (const [bx, bz] of [[cx + 6, minZ + 4], [cx + 10, minZ + 6], [cx + 5, minZ + 8], [cx + 12, minZ + 10], [cx + 8, minZ + 12], [cx + 14, minZ + 5]]) {
      this.setBlock(bx, 1, bz, "grass");
      this.setBlock(bx, 2, bz, "emerald_block");
      this.setBlock(bx, 3, bz, "leaves");
      this.setBlock(bx, 4, bz, "leaves");
      this.setBlock(bx, 5, bz, "leaves");
    }
    // Sakura Cherry Blossom Tree in Bamboo Valley
    this.buildSakuraTree(cx + 9, 1, minZ + 8);
    // Zen lotus pool
    for (let px = cx + 13; px <= cx + 16; px++) {
      for (let pz = cz - 12; pz <= cz - 10; pz++) {
        this.setBlock(px, 0, pz, "sea_lantern");
        this.setBlock(px, 1, pz, "water");
      }
    }
    // Panda Habitat Plaque Sign
    this.setBlock(cx + 8, 2, cz - 8, "stone_bricks", {
      type: "sign",
      title: "Giant Panda Bamboo Valley · Ailuropoda melanoleuca 🐼",
      text: "Native to the misty mountain bamboo forests of southwest China.\nLiving pandas Bao Bao, Mei Xiang, and little cub Xiao Qi spend their days enjoying fresh bamboo shoots and playing in the sakura grove!"
    });

    // 5. Habitat 2: Serengeti African Lion Kopje (X in [minX + 1, cx - 18], Z in [minZ + 1, cz - 8])
    for (let x = minX + 1; x <= cx - 18; x++) {
      this.setBlock(x, 2, cz - 8, "oak_fence");
    }
    for (let z = minZ + 1; z <= cz - 8; z++) {
      this.setBlock(cx - 18, 2, z, "oak_fence");
    }
    // Massive Tiered Red Sandstone Kopje Rock Outcrop
    for (let x = minX + 8; x <= cx - 22; x++) {
      for (let z = minZ + 5; z <= cz - 10; z++) {
        this.setBlock(x, 2, z, "red_sandstone");
        if (x >= minX + 10 && x <= cx - 24 && z >= minZ + 7 && z <= cz - 12) {
          this.setBlock(x, 3, z, "red_sandstone");
        }
      }
    }
    // Kopje High Pinnacle Lookout Rock where King Simba perches (Y = 4)
    this.setBlock(cx - 28, 4, cz - 14, "red_sandstone");
    this.setBlock(cx - 27, 4, cz - 14, "red_sandstone");
    this.setBlock(cx - 28, 4, cz - 13, "red_sandstone");
    this.setBlock(cx - 27, 4, cz - 13, "red_sandstone");
    // Savanna Acacia Shade Tree atop Kopje
    for (let y = 1; y <= 6; y++) {
      this.setBlock(cx - 23, y, cz - 15, "oak_log");
    }
    for (let dx = -2; dx <= 2; dx++) {
      for (let dz = -2; dz <= 2; dz++) {
        this.setBlock(cx - 23 + dx, 7, cz - 15 + dz, "leaves");
      }
    }
    // Lion Habitat Plaque Sign
    this.setBlock(cx - 26, 2, cz - 8, "stone_bricks", {
      type: "sign",
      title: "Serengeti African Lion Kopje · Panthera leo 🦁",
      text: "Apex predator of the Serengeti!\nPerched atop the sun-baked sandstone bluffs is King Simba, with lioness Nala and cub Kiara basking in the afternoon glow. A lion's majestic roar travels over 8 kilometers!"
    });

    // 6. Habitat 3: Arctic Glacier & Polar Cove (X in [cx - 17, cx + 1], Z in [minZ + 1, cz - 8])
    for (let x = cx - 17; x <= cx + 1; x++) {
      this.setBlock(x, 2, cz - 8, "oak_fence");
    }
    // Floating ice floes & deep swimming lagoon
    for (let x = cx - 14; x <= cx - 4; x++) {
      for (let z = minZ + 4; z <= cz - 10; z++) {
        const isPool = (Math.abs(x - (cx - 9)) <= 3 && Math.abs(z - (cz - 13)) <= 2);
        if (isPool) {
          this.setBlock(x, 0, z, "sea_lantern");
          this.setBlock(x, 1, z, "water");
        } else {
          this.setBlock(x, 1, z, ((x + z) % 2 === 0) ? "ice" : "snow");
        }
      }
    }
    // Polar Ice Cave Igloo Shelter
    for (let x = cx - 16; x <= cx - 13; x++) {
      for (let z = minZ + 3; z <= minZ + 6; z++) {
        this.setBlock(x, 2, z, "snow");
        this.setBlock(x, 3, z, "snow");
        if (x === cx - 14 && z === minZ + 4) {
          this.setBlock(x, 4, z, "sea_lantern");
        }
      }
    }
    // Polar Habitat Plaque Sign
    this.setBlock(cx - 8, 2, cz - 8, "stone_bricks", {
      type: "sign",
      title: "Arctic Glacier Cove & Penguin Colony ❄️🐧",
      text: "Champions of the frozen polar seas!\nWith thick insulating blubber and hollow fur, polar bears Nanook and Siku swim alongside playful waddling Emperor penguins Pingu, Piper, and Pebble!"
    });

    // 7. Habitat 4: Gentle African Elephant Oasis (X in [minX + 1, cx - 16], Z in [cz + 8, maxZ - 1])
    for (let x = minX + 1; x <= cx - 16; x++) {
      this.setBlock(x, 2, cz + 8, "oak_fence");
    }
    for (let z = cz + 8; z <= maxZ - 1; z++) {
      this.setBlock(cx - 16, 2, z, "oak_fence");
    }
    // Mud bath watering hole
    for (let x = cx - 30; x <= cx - 22; x++) {
      for (let z = cz + 12; z <= cz + 17; z++) {
        this.setBlock(x, 0, z, "sand");
        this.setBlock(x, 1, z, "water");
      }
    }
    this.setBlock(cx - 24, 1, cz + 14, "leaves");
    // Giant Banyan Shade Tree for Elephants
    this.buildBanyanTree(cx - 26, 1, cz + 18);
    // Elephant Habitat Plaque Sign
    this.setBlock(cx - 25, 2, cz + 8, "stone_bricks", {
      type: "sign",
      title: "African Elephant Oasis · Loxodonta africana 🐘",
      text: "The largest living land animal on Earth!\nElephants possess deep memory, complex communication, and trunks with 40,000 muscles. Greet Tembo, matriarch Zola, and playful calf Toto at the watering hole!"
    });

    // 8. Habitat 5: Rothschild's Giraffe Reserve & Elevated Canopy Skywalk (X in [cx - 15, cx + 6], Z in [cz + 8, maxZ - 1])
    for (let x = cx - 15; x <= cx + 6; x++) {
      this.setBlock(x, 2, cz + 8, "oak_fence");
    }
    for (let z = cz + 8; z <= maxZ - 1; z++) {
      this.setBlock(cx + 6, 2, z, "oak_fence");
    }
    // Tall Acacia Feeding Trees
    for (const [tx, tz] of [[cx - 6, cz + 14], [cx - 2, cz + 18]]) {
      for (let y = 1; y <= 7; y++) {
        this.setBlock(tx, y, tz, "oak_log");
      }
      for (let dx = -2; dx <= 2; dx++) {
        for (let dz = -2; dz <= 2; dz++) {
          this.setBlock(tx + dx, 8, tz + dz, "leaves");
        }
      }
    }
    // Elevated Visitor Canopy Skywalk Boardwalk (Y = 4)!
    // Stairway climbing up to Y = 4 at (cx + 5, cz + 8)
    for (let step = 0; step <= 3; step++) {
      this.setBlock(cx + 5 - step, 1 + step, cz + 8, "oak_planks");
    }
    // Skywalk Bridge running from cx + 1 to cx - 12 at Y = 4
    for (let x = cx + 1; x >= cx - 12; x--) {
      this.setBlock(x, 4, cz + 8, "oak_planks");
      this.setBlock(x, 4, cz + 9, "oak_planks");
      this.setBlock(x, 5, cz + 7, "oak_fence"); // Safety railing
      this.setBlock(x, 5, cz + 10, "oak_fence");
      if (Math.abs(x) % 4 === 0) {
        this.setBlock(x, 1, cz + 8, "oak_log"); // Pillar supports
        this.setBlock(x, 2, cz + 8, "oak_log");
        this.setBlock(x, 3, cz + 8, "oak_log");
        this.setBlock(x, 6, cz + 10, "lantern");
      }
    }
    // Giraffe Habitat Plaque Sign
    this.setBlock(cx - 3, 2, cz + 8, "stone_bricks", {
      type: "sign",
      title: "Rothschild's Giraffe Reserve & Canopy Skywalk 🦒",
      text: "The tallest mammal in the world!\nWalk up the timber canopy skywalk at Y=4 to gaze eye-to-eye with Twiga, Kibo, and Zawadi as they browse nutritious leaves from the high acacia trees."
    });

    // 9. Habitat 6: Children's Petting Zoo & Farm Barnyard (X in [cx + 7, maxX - 2], Z in [cz + 8, maxZ - 1])
    for (let x = cx + 7; x <= maxX - 2; x++) {
      this.setBlock(x, 2, cz + 8, "oak_fence");
    }
    // Traditional Red Timber Barn (X in [maxX - 9, maxX - 4], Z in [cz + 13, cz + 19])
    for (let x = maxX - 9; x <= maxX - 4; x++) {
      for (let z = cz + 13; z <= cz + 19; z++) {
        this.setBlock(x, 1, z, "oak_planks");
        const isWall = (x === maxX - 9 || x === maxX - 4 || z === cz + 19);
        const isDoor = (z === cz + 13 && (x === maxX - 7 || x === maxX - 6));
        for (let y = 2; y <= 5; y++) {
          if (isWall || (!isDoor && z === cz + 13)) {
            this.setBlock(x, y, z, "red_terracotta");
          }
        }
        // Pitched roof
        this.setBlock(x, 6, z, "stone_bricks");
      }
    }
    this.setBlock(maxX - 7, 5, cz + 13, "lantern");

    // Feed troughs & hay bales
    this.setBlock(cx + 12, 1, cz + 12, "cauldron");
    this.setBlock(cx + 13, 1, cz + 12, "gold_block"); // Hay bale
    this.setBlock(cx + 14, 1, cz + 12, "gold_block");
    this.setBlock(cx + 13, 2, cz + 12, "gold_block");

    // Petting Zoo Sign
    this.setBlock(cx + 14, 2, cz + 8, "stone_bricks", {
      type: "sign",
      title: "Children's Petting Barnyard & Farm Friends 🐑🐖",
      text: "Gentle and affectionate farm friends!\nVisitors are warmly invited to pet our woolly Merino sheep Woolly and Cloud, and greet our friendly piglets Wilbur and Babe. Treats available!"
    });

    // 10. Habitat 7 & 8: Savanna Zebra Meadow & Flamingo Lagoon (Central: X in [cx - 16, cx + 5], Z in [cz - 6, cz + 6])
    // Flamingo Wetland Plaque
    this.setBlock(cx + 1, 2, cz + 4, "stone_bricks", {
      type: "sign",
      title: "Flamingo Lagoon & Savanna Wetlands 🦩🦓",
      text: "Home to graceful pink flamingos Flora and Coral wading in the lily pad lagoon, alongside plains zebras Marty and Stripes grazing across the open savanna plains."
    });

    // 11. Safari Scoops Café & 3-Story Observation Watchtower (at cx - 4, cz - 7)
    for (let x = cx - 5; x <= cx - 3; x++) {
      for (let z = cz - 7; z <= cz - 5; z++) {
        // Ground floor café
        this.setBlock(x, 1, z, "oak_planks");
        this.setBlock(x, 2, z, "oak_planks");
        // Tower posts rising to Y = 7
        for (let y = 3; y <= 7; y++) {
          if (x === cx - 5 || x === cx - 3 || z === cz - 7 || z === cz - 5) {
            this.setBlock(x, y, z, "oak_log");
          }
        }
        // Observation skydeck floor at Y = 8
        this.setBlock(x, 8, z, "oak_planks");
        this.setBlock(x, 9, z, "oak_fence"); // Railing
      }
    }
    this.setBlock(cx - 4, 10, cz - 6, "sea_lantern"); // Beacon roof
    this.setBlock(cx - 4, 2, cz - 8, "oak_planks", {
      type: "sign",
      title: "Safari Scoops Café & Skydeck Lookout 🍧🔭",
      text: "Climb the observation tower for 360-degree panoramic views of all animal habitats! Enjoy artisanal tropical fruit gelato, shaved ice, and organic safari crackers."
    });
  }

  // Enchanted Castle Woods & Rose Walk (Landscaped site of former old zoo connecting West Bridge to Rapunzel Castle)
  private buildEnchantedCastleWoodland(cx: number, cz: number) {
    // cx = -45, cz = -30 (Footprint: X in [-56, -30], Z in [-44, -18])
    for (let x = cx - 11; x <= cx + 15; x++) {
      for (let z = cz - 14; z <= cz + 12; z++) {
        const isPath = (Math.abs(x - (cx - 2)) <= 1) || (Math.abs(z - cz) <= 1 && x <= cx + 6);
        if (isPath) {
          this.setBlock(x, 1, z, ((x + z) % 2 === 0) ? "mossy_stone_bricks" : "cobblestone");
        } else {
          this.setBlock(x, 1, z, ((x + z) % 6 === 0) ? "mossy_cobblestone" : "grass");
        }
      }
    }

    // Central Fairytale Stone Lotus Fountain at (cx, cz)
    for (let x = cx - 2; x <= cx + 2; x++) {
      for (let z = cz - 2; z <= cz + 2; z++) {
        const isRim = (Math.abs(x - cx) === 2 || Math.abs(z - cz) === 2);
        this.setBlock(x, 1, z, isRim ? "stone_bricks" : "water");
      }
    }
    this.setBlock(cx, 1, cz, "sea_lantern");
    this.setBlock(cx, 2, cz, "quartz_block");
    this.setBlock(cx, 3, cz, "water");

    // Weeping Cypress Trees & Flowering Rose Bushes
    this.buildCypressTree(cx - 6, 1, cz - 6);
    this.buildCypressTree(cx + 8, 1, cz - 8);
    this.buildCypressTree(cx - 8, 1, cz + 6);
    this.buildCypressTree(cx + 6, 1, cz + 8);

    // Rose bushes
    for (const [rx, rz] of [[cx - 3, cz - 4], [cx + 3, cz - 4], [cx - 4, cz + 3], [cx + 4, cz + 3]]) {
      this.setBlock(rx, 1, rz, "grass");
      this.setBlock(rx, 2, rz, "leaves");
      this.setBlock(rx, 3, rz, "redstone_block"); // Red rose blossom!
    }

    // Woodland Rest Benches
    this.setBlock(cx - 4, 1, cz, "oak_planks");
    this.setBlock(cx + 4, 1, cz, "oak_planks");

    // Garden Plaque Sign
    this.setBlock(cx, 2, cz + 3, "stone_bricks", {
      type: "sign",
      title: "Enchanted Castle Woods & Rose Walk 🌹🏰",
      text: "A tranquil fairytale woodland linking the Crossroads Citadel, Grand Safari Park, and Rapunzel's Royal Keep.\nStroll among blooming wild roses, weeping cypresses, and stone reflection fountains."
    });
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
    // 1. Grand Continuous Elevated Viaduct along the Island Express Route (Y = 4 deck for Y = 5.0 tracks)
    const waypoints = [
      { x: 58, z: 33 },
      { x: 74, z: 33 },
      { x: 92, z: 33 },
      { x: 104, z: 32 },
      { x: 116, z: 28 },
      { x: 124, z: 38 },
      { x: 128, z: 48 },
      { x: 144, z: 50 },
      { x: 158, z: 64 },
      { x: 174, z: 78 },
      { x: 180, z: 88 },
      { x: 174, z: 98 },
      { x: 144, z: 98 },
      { x: 112, z: 98 },
      { x: 80, z: 96 },
      { x: 50, z: 92 },
      { x: 24, z: 88 },
      { x: 12, z: 74 },
      { x: 8, z: 54 },
      { x: 6, z: 36 },
      { x: 8, z: 22 },
      { x: 22, z: 22 },
      { x: 38, z: 27 },
      { x: 48, z: 32 },
      { x: 58, z: 33 }
    ];

    const viaductDeck = new Set<string>();
    const pierPositions: { x: number; z: number }[] = [];
    let accumulatedDist = 0;

    for (let i = 0; i < waypoints.length - 1; i++) {
      const p1 = waypoints[i];
      const p2 = waypoints[i + 1];
      const dist = Math.hypot(p2.x - p1.x, p2.z - p1.z);
      const steps = Math.ceil(dist * 1.5);
      for (let s = 0; s <= steps; s++) {
        const t = s / steps;
        const cx = Math.round(p1.x + (p2.x - p1.x) * t);
        const cz = Math.round(p1.z + (p2.z - p1.z) * t);
        const k = `${cx},${cz}`;
        if (!viaductDeck.has(k)) {
          viaductDeck.add(k);
          accumulatedDist += (dist / steps);
          if (accumulatedDist >= 7) {
            accumulatedDist = 0;
            pierPositions.push({ x: cx, z: cz });
          }
        }
      }
    }

    // Build Continuous Elevated Track Bed (Y = 4)
    for (const posKey of viaductDeck) {
      const [xStr, zStr] = posKey.split(',');
      const x = parseInt(xStr, 10);
      const z = parseInt(zStr, 10);

      // 3-wide viaduct deck: center smooth_stone, edges stone_bricks
      for (let dx = -1; dx <= 1; dx++) {
        for (let dz = -1; dz <= 1; dz++) {
          if (Math.abs(dx) + Math.abs(dz) <= 1) {
            const isCenter = (dx === 0 && dz === 0);
            this.setBlock(x + dx, 4, z + dz, isCenter ? 'smooth_stone' : 'stone_bricks');
          }
        }
      }
    }

    // High-clearance East Highway section (X: 84 to 98, Z: 31 to 35)
    for (let x = 84; x <= 98; x++) {
      for (let z = 31; z <= 35; z++) {
        this.setBlock(x, 4, z, 'stone_bricks');
        this.setBlock(x, 5, z, (z === 33) ? 'smooth_stone' : 'stone_bricks');
        if (z === 31 || z === 35) {
          this.setBlock(x, 6, z, 'iron_block');
        }
      }
    }

    // Viaduct Support Piers rooted firmly down to ground / seabed
    for (const p of pierPositions) {
      // Don't block the East Highway roadway at Y=1
      if (p.x >= 84 && p.x <= 98 && p.z >= 31 && p.z <= 35) continue;

      const ground = this.getTerrainHeight(p.x, p.z);
      const bottomY = Math.max(-1, Math.min(ground, 1));
      for (let dx = 0; dx <= 1; dx++) {
        for (let dz = 0; dz <= 1; dz++) {
          for (let y = bottomY; y <= 3; y++) {
            this.setBlock(p.x + dx, y, p.z + dz, (y === 3) ? 'smooth_stone' : 'stone_bricks');
          }
        }
      }
      this.setBlock(p.x, 4, p.z, 'quartz_pillar');
      this.setBlock(p.x + 1, 4, p.z + 1, 'quartz_pillar');
    }
  }

  private buildRailwayStation(cx: number, cz: number) {
    // Crossroads Central Station Train Hall (Footprint: X in [cx - 12, cx + 12], Z in [cz - 7, cz + 7])
    // 1. Through-Track Bed at Y = 5 for continuous elevated loop trains (with solid foundation below)
    for (let x = cx - 12; x <= cx + 12; x++) {
      for (let z = cz - 1; z <= cz + 1; z++) {
        for (let y = 1; y <= 4; y++) {
          this.setBlock(x, y, z, 'stone_bricks');
        }
        this.setBlock(x, 5, z, 'smooth_stone');
      }
      this.setBlock(x, 5, cz, (x % 2 === 0) ? 'oak_planks' : 'iron_block');
    }

    // 2. North & South Raised Passenger Platforms (Y = 5)
    // North Platform (Z in [cz - 7, cz - 2])
    for (let x = cx - 11; x <= cx + 11; x++) {
      for (let z = cz - 7; z <= cz - 2; z++) {
        for (let y = 1; y <= 4; y++) {
          this.setBlock(x, y, z, 'stone_bricks');
        }
        this.setBlock(x, 5, z, 'smooth_stone');
      }
      this.setBlock(x, 5, cz - 2, 'gold_block');
    }

    // South Platform (Z in [cz + 2, cz + 7])
    for (let x = cx - 11; x <= cx + 11; x++) {
      for (let z = cz + 2; z <= cz + 7; z++) {
        for (let y = 1; y <= 4; y++) {
          this.setBlock(x, y, z, 'stone_bricks');
        }
        this.setBlock(x, 5, z, 'smooth_stone');
      }
      this.setBlock(x, 5, cz + 2, 'gold_block');
    }

    // 3. Accessible Stairs at Both Ends from ground Y = 1 to Y = 5
    for (const endX of [cx - 12, cx + 12]) {
      for (let step = 0; step <= 4; step++) {
        const sz = cz - 5 - (endX < cx ? step : -step);
        if (sz >= cz - 7 && sz <= cz + 7) {
          for (let y = 1; y <= 5 - step; y++) {
            this.setBlock(endX, y, sz, 'smooth_stone');
          }
        }
      }
    }

    // 4. Arched Vaulted Glass Train Shed Canopy
    for (const px of [cx - 9, cx - 3, cx + 3, cx + 9]) {
      for (let y = 5; y <= 10; y++) {
        this.setBlock(px, y, cz - 7, 'quartz_pillar');
        this.setBlock(px, y, cz + 7, 'quartz_pillar');
      }
    }
    for (let x = cx - 11; x <= cx + 11; x++) {
      for (let z = cz - 7; z <= cz + 7; z++) {
        const dist = Math.abs(z - cz);
        const roofY = Math.round(11 + (1 - dist / 7) * 2);
        if (x % 3 === 0 || dist === 7) {
          this.setBlock(x, roofY, z, 'quartz_block');
        } else {
          this.setBlock(x, roofY, z, 'cyber_glass');
        }
      }
      if (x % 4 === 0) {
        this.setBlock(x, 10, cz, 'glowstone');
      }
    }

    // 5. Station Passenger Amenities
    this.setBlock(cx - 4, 6, cz - 5, 'bookshelf');
    this.setBlock(cx - 3, 6, cz - 5, 'bookshelf');
    this.setBlock(cx + 4, 6, cz + 5, 'gold_block');
    this.setBlock(cx, 6, cz - 4, 'glowstone', {
      type: 'sign',
      title: 'Crossroads Central Station · Island Express',
      text: 'Platform 1 · Route: Neo York Skyway ➔ Airport ➔ South Coast ➔ Citadel. Press [E] to Board · [SPACE] to Alight.'
    });
    this.setBlock(cx, 6, cz + 4, 'glowstone', {
      type: 'sign',
      title: 'Island Express Timetable',
      text: 'Live Continuous Loop · Dual Express Trains In Service · Synchronized Safe Headway'
    });
  }

  // 10. Neo York Skyway Elevated Railway Station (116, 28)
  private buildNeoYorkStation(cx: number, cz: number) {
    // Raised Commuter Platform at Y = 5 (Matching elevated viaduct track level Y = 5.0)
    // Footprint: X in [cx - 6, cx + 6], Z in [cz + 2, cz + 6]
    for (let x = cx - 6; x <= cx + 6; x++) {
      for (let z = cz + 2; z <= cz + 6; z++) {
        for (let y = 1; y <= 4; y++) {
          this.setBlock(x, y, z, 'stone_bricks');
        }
        this.setBlock(x, 5, z, 'smooth_stone'); // Platform floor at Y = 5
      }
      this.setBlock(x, 5, cz + 2, 'gold_block'); // Caution edge line
      this.setBlock(x, 6, cz + 6, 'iron_block'); // Back safety railing
    }

    // Passenger Access Stairs connecting street level (Y = 1) up to platform (Y = 5)
    for (let step = 0; step <= 4; step++) {
      const sx = cx - 7 - step;
      for (let z = cz + 3; z <= cz + 5; z++) {
        for (let y = 1; y <= 5 - step; y++) {
          this.setBlock(sx, y, z, 'stone_bricks');
        }
      }
    }

    // Modernist Glass & Quartz Canopy Roof at Y = 8
    for (const px of [cx - 5, cx + 5]) {
      for (let y = 6; y <= 8; y++) {
        this.setBlock(px, y, cz + 6, 'quartz_pillar');
      }
    }
    for (let x = cx - 6; x <= cx + 6; x++) {
      for (let z = cz + 2; z <= cz + 6; z++) {
        this.setBlock(x, 9, z, (x % 2 === 0) ? 'quartz_block' : 'cyber_glass');
      }
    }

    // Station Sign & Passenger Amenities
    this.setBlock(cx, 6, cz + 5, 'glowstone', {
      type: 'sign',
      title: 'Neo York Skyway Station · Elevated Rapid Transit',
      text: 'Island Express Transit · Elevated Viaduct Concourse. Transfers to Broadway & Lak Tower. Press [E] to Board.'
    });
    this.setBlock(cx - 2, 6, cz + 4, 'oak_planks'); // Bench
    this.setBlock(cx + 2, 6, cz + 4, 'oak_planks');
  }

  // 11. South Coast Beach & Pier Boardwalk Station (24, 88)
  private buildSouthCoastStation(cx: number, cz: number) {
    // Seaside Timber Boardwalk Platform at Y = 5 (Matching viaduct track level Y = 5.0)
    // Footprint: X in [cx - 6, cx + 6], Z in [cz + 2, cz + 6]
    for (let x = cx - 6; x <= cx + 6; x++) {
      for (let z = cz + 2; z <= cz + 6; z++) {
        for (let y = 1; y <= 4; y++) {
          this.setBlock(x, y, z, 'spruce_log');
        }
        this.setBlock(x, 5, z, 'oak_planks');
      }
      this.setBlock(x, 5, cz + 2, 'gold_block'); // Warning edge
      this.setBlock(x, 6, cz + 6, 'oak_fence'); // Maritime railing
    }

    // Access Stairs connecting beach boardwalk (Y = 1) up to platform (Y = 5)
    for (let step = 0; step <= 4; step++) {
      const sx = cx - 7 - step;
      for (let z = cz + 3; z <= cz + 5; z++) {
        for (let y = 1; y <= 5 - step; y++) {
          this.setBlock(sx, y, z, 'oak_planks');
        }
      }
    }

    // Seaside Striped Sun Canopy
    for (const px of [cx - 5, cx + 5]) {
      this.setBlock(px, 6, cz + 5, 'spruce_log');
      this.setBlock(px, 7, cz + 5, 'spruce_log');
      this.setBlock(px, 8, cz + 5, 'sea_lantern');
    }
    for (let x = cx - 6; x <= cx + 6; x++) {
      this.setBlock(x, 8, cz + 4, (x % 2 === 0) ? 'red_terracotta' : 'quartz_block');
      this.setBlock(x, 8, cz + 5, (x % 2 === 0) ? 'quartz_block' : 'red_terracotta');
    }

    // Station Sign & Benches
    this.setBlock(cx, 6, cz + 4, 'glowstone', {
      type: 'sign',
      title: 'South Coast Beach & Pier Station',
      text: 'Gateway to Grand Carnival, Sunset Saloon & Ocean Beach. Press [E] to Board.'
    });
  }

  // 12. Crossroads Citadel Gateway Station (8, 22)
  private buildCitadelStation(cx: number, cz: number) {
    // Citadel Stone Platform at Y = 5 (Directly overlooking South Moat Bridge)
    // Footprint: X in [cx - 5, cx + 5], Z in [cz + 2, cz + 6]
    for (let x = cx - 5; x <= cx + 5; x++) {
      for (let z = cz + 2; z <= cz + 6; z++) {
        for (let y = 1; y <= 4; y++) {
          this.setBlock(x, y, z, 'stone_bricks');
        }
        this.setBlock(x, 5, z, 'smooth_stone');
      }
      this.setBlock(x, 5, cz + 2, 'gold_block');
      this.setBlock(x, 6, cz + 6, 'stone_bricks');
    }

    // Direct Stone Steps from Citadel Moat Walkway (Y = 2) up to Platform (Y = 5)
    for (let step = 0; step <= 3; step++) {
      const sx = cx - 6 - step;
      for (let z = cz + 3; z <= cz + 5; z++) {
        for (let y = 2; y <= 5 - step; y++) {
          this.setBlock(sx, y, z, 'stone_bricks');
        }
      }
    }

    // Marble Pillars & Lanterns
    for (const px of [cx - 4, cx + 4]) {
      this.setBlock(px, 6, cz + 5, 'quartz_pillar');
      this.setBlock(px, 7, cz + 5, 'sea_lantern');
    }

    // Station Sign
    this.setBlock(cx, 6, cz + 4, 'glowstone', {
      type: 'sign',
      title: 'Citadel Gateway Station',
      text: 'Spawn Nexus Station · Island Express Rapid Transit Loop. Press [E] to Board.'
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

    // 4. Open Gate Stand & Ground Support Equipment (Apron clear for active animated flights)
    for (let x = 114; x <= 124; x += 5) {
      this.setBlock(x, 1, 71, 'iron_block');
      this.setBlock(x, 1, 74, 'iron_block');
    }
    // Luggage tug & baggage cart parked at stand
    this.setBlock(126, 1, 70, 'coal_block');
    this.setBlock(127, 1, 70, 'coal_block');
    this.setBlock(126, 2, 70, 'gold_block');
    this.setBlock(127, 2, 70, 'iron_block');

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
      text: 'Flight AG-2026 · Minecraft Realm Express · On Time'
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

    // 8. Airport Railway Station Platform (North Landside Entrance at X in [122, 136], Z in [43, 47], Y = 5.0)
    for (let x = 122; x <= 136; x++) {
      for (let z = 43; z <= 47; z++) {
        for (let y = 1; y <= 4; y++) {
          this.setBlock(x, y, z, 'stone_bricks');
        }
        this.setBlock(x, 5, z, 'smooth_stone'); // Elevated boarding deck
      }
      this.setBlock(x, 5, 47, 'gold_block'); // Caution tactile edge facing track at Z = 48
      if (x % 4 === 0) {
        this.setBlock(x, 6, 43, 'quartz_pillar');
        this.setBlock(x, 7, 43, 'quartz_pillar');
        this.setBlock(x, 8, 43, 'glowstone');
      }
    }
    // Elevated Covered Skybridge connecting Platform to Airport Terminal Concourse North Wall (Z = 48 to 54)
    for (let z = 48; z <= 54; z++) {
      for (let x = 127; x <= 129; x++) {
        this.setBlock(x, 5, z, 'quartz_block'); // Skybridge floor
        if (x === 127 || x === 129) {
          this.setBlock(x, 6, z, 'cyber_glass'); // Glass enclosure
        }
        this.setBlock(x, 7, z, 'quartz_block'); // Canopy
      }
    }
    // Concourse North Skybridge Portal entry (clearing glass at Z = 54 for seamless walk-in)
    for (let x = 127; x <= 129; x++) {
      this.setBlock(x, 5, 54, 'quartz_block');
      this.setBlock(x, 6, 54, 'cyber_glass');
    }
    // Access Stairs connecting Ground Station Avenue (Y = 1) up to Elevated Platform (Y = 5)
    for (let step = 0; step <= 4; step++) {
      const sx = 121 - step;
      for (let z = 44; z <= 46; z++) {
        for (let y = 1; y <= 5 - step; y++) {
          this.setBlock(sx, y, z, 'smooth_stone');
        }
      }
    }
    this.setBlock(129, 6, 44, 'glowstone', {
      type: 'sign',
      title: 'Airport Terminal Skyport Station',
      text: 'Island Express Rapid Transit · Direct Concourse Transfer. Press [E] to Board.'
    });
    this.setBlock(124, 6, 44, 'oak_planks'); // Waiting benches
    this.setBlock(125, 6, 44, 'oak_planks');

    // 9. Active Commercial Runway Corridor (Kept clear for real-time animated airliner takeoff and landing)

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

  // =========================================================================
  // 13. Frostpeak Alps · Alpine Snow & Mountain Biome Realm
  // =========================================================================
  private buildAlpineSnowMountainRealm() {
    // 1. Timberline Mountain Portal Gate (0, 1, -82)
    const gateZ = -82;
    for (let x = -3; x <= 3; x++) {
      this.setBlock(x, 1, gateZ, 'stone_bricks');
    }
    // Twin dark spruce timber pillars
    for (let y = 1; y <= 4; y++) {
      this.setBlock(-3, y, gateZ, 'spruce_log');
      this.setBlock(3, y, gateZ, 'spruce_log');
    }
    // Overhead timber beam with lantern
    for (let x = -3; x <= 3; x++) {
      this.setBlock(x, 5, gateZ, 'spruce_log');
    }
    this.setBlock(0, 4, gateZ, 'lantern');
    this.setBlock(-3, 6, gateZ, 'stone_bricks');
    this.setBlock(3, 6, gateZ, 'stone_bricks');

    this.setBlock(0, 2, gateZ - 1, 'glowstone', {
      type: 'sign',
      title: 'Frostpeak Alps · Alpine Mountain Trail 🌲🏔️',
      text: 'Scenic subalpine pass into the high peaks. Chalet de Lakshya (60m) · Lake Serenity (100m) · Summit Observatory (160m).'
    });

    // 2. Winding Alpine Switchback Mountain Trail (Z = -82 to -108)
    for (let z = -82; z >= -108; z--) {
      const gy = this.getTerrainHeight(0, z);
      for (let dx = -2; dx <= 2; dx++) {
        const blk = (Math.abs(dx) === 2) ? 'mossy_stone_bricks' : (z % 2 === 0) ? 'cobblestone' : 'smooth_stone';
        this.setBlock(dx, gy, z, blk);
      }
      // Wooden fence railings and lantern posts along trail
      if (Math.abs(z) % 6 === 0) {
        this.setBlock(-3, gy + 1, z, 'spruce_log');
        this.setBlock(-3, gy + 2, z, 'lantern');
        this.setBlock(3, gy + 1, z, 'spruce_log');
        this.setBlock(3, gy + 2, z, 'lantern');
      } else {
        this.setBlock(-3, gy + 1, z, 'oak_fence');
        this.setBlock(3, gy + 1, z, 'oak_fence');
      }
    }

    // Branch trail to Chalet de Lakshya at (-18, -95)
    for (let step = 0; step <= 18; step++) {
      const tx = Math.round(0 - step);
      const tz = Math.round(-90 - (step / 18) * 5);
      const gy = this.getTerrainHeight(tx, tz);
      this.setBlock(tx, gy, tz, 'cobblestone');
      this.setBlock(tx, gy, tz - 1, 'cobblestone');
      if (step % 5 === 0) {
        this.setBlock(tx, gy + 1, tz + 1, 'oak_fence');
        this.setBlock(tx, gy + 2, tz + 1, 'lantern');
      }
    }

    // 3. Chalet de Lakshya (Alpine Ski Lodge & Heated Jacuzzi)
    // Centered at (-18, -95), Base Floor at Y = 8
    const cx = -18;
    const cz = -95;
    const baseY = 8;

    // Foundation plinth & first floor (Y = 8 to 11)
    for (let x = cx - 6; x <= cx + 6; x++) {
      for (let z = cz - 5; z <= cz + 5; z++) {
        // Floor
        this.setBlock(x, baseY, z, 'oak_planks');

        const isWall = (x === cx - 6 || x === cx + 6 || z === cz - 5 || z === cz + 5);
        const isCorner = (Math.abs(x - cx) === 6 && Math.abs(z - cz) === 5);
        const isDoor = (z === cz + 5 && (x === cx || x === cx - 1));

        if (isWall) {
          for (let y = baseY + 1; y <= baseY + 3; y++) {
            if (isDoor && y <= baseY + 2) continue; // Walk-in entrance
            if (isCorner) {
              this.setBlock(x, y, z, 'spruce_log');
            } else if (y === baseY + 2 && (Math.abs(x - cx) === 2 || Math.abs(z - cz) === 2)) {
              this.setBlock(x, y, z, 'cyber_glass'); // Large picture windows
            } else {
              this.setBlock(x, y, z, 'spruce_log');
            }
          }
        }
      }
    }

    // Grand stone fireplace & chimney at northern wall
    for (let y = baseY + 1; y <= baseY + 12; y++) {
      this.setBlock(cx, y, cz - 5, 'cobblestone');
      this.setBlock(cx - 1, y, cz - 5, 'cobblestone');
      this.setBlock(cx + 1, y, cz - 5, 'cobblestone');
    }
    this.setBlock(cx, baseY + 1, cz - 4, 'magma_block'); // Open glowing hearth fire
    this.setBlock(cx, baseY + 2, cz - 4, 'glowstone');
    this.setBlock(cx, baseY + 13, cz - 5, 'cobblestone'); // Chimney top
    this.setBlock(cx, baseY + 14, cz - 5, 'cobblestone');

    // Interior amenities (First Floor)
    // Long oak dining table & chairs
    for (let z = cz - 2; z <= cz + 2; z++) {
      this.setBlock(cx - 2, baseY + 1, z, 'oak_planks');
      this.setBlock(cx - 3, baseY + 1, z, 'oak_fence');
      this.setBlock(cx - 1, baseY + 1, z, 'oak_fence');
    }
    // Hot chocolate / tea beverage bar and shelves
    this.setBlock(cx + 4, baseY + 1, cz - 3, 'bookshelf');
    this.setBlock(cx + 5, baseY + 1, cz - 3, 'bookshelf');
    this.setBlock(cx + 4, baseY + 1, cz - 2, 'crafting_table');
    this.setBlock(cx + 5, baseY + 1, cz - 2, 'chest', {
      type: 'chest',
      title: 'Chalet Winter Supply Chest ☕🧣',
      text: 'Stocked with warm woolen cloaks, artisan hot cocoa, snowshoes, and alpine trail maps.'
    });
    this.setBlock(cx, baseY + 3, cz, 'sea_lantern'); // Hanging iron chandelier

    // Second Floor Loft & Balcony (Y = 12 to 14)
    for (let x = cx - 6; x <= cx + 6; x++) {
      for (let z = cz - 5; z <= cz + 5; z++) {
        this.setBlock(x, baseY + 4, z, 'oak_planks');
        const isWall = (x === cx - 6 || x === cx + 6 || z === cz - 5 || z === cz + 5);
        if (isWall) {
          for (let y = baseY + 5; y <= baseY + 6; y++) {
            this.setBlock(x, y, z, (y === baseY + 5 && (x + z) % 3 === 0) ? 'cyber_glass' : 'spruce_log');
          }
        }
      }
    }
    // East-facing observation balcony overlooking Lake Serenity (Z in [cz - 2, cz + 2])
    for (let z = cz - 2; z <= cz + 2; z++) {
      this.setBlock(cx + 7, baseY + 4, z, 'oak_planks');
      this.setBlock(cx + 7, baseY + 5, z, 'oak_fence');
    }

    // High Peaked Gabled A-Frame Snow Roof (Y = 15 to 19)
    for (let step = 0; step <= 5; step++) {
      const roofY = baseY + 7 + step;
      const curHalfW = 6 - step;
      for (let z = cz - 6; z <= cz + 6; z++) {
        this.setBlock(cx - curHalfW, roofY, z, 'spruce_log');
        this.setBlock(cx - curHalfW, roofY + 1, z, 'snow'); // Thick snow blanket on roof
        this.setBlock(cx + curHalfW, roofY, z, 'spruce_log');
        this.setBlock(cx + curHalfW, roofY + 1, z, 'snow');
      }
    }

    // Outdoor Steaming Alpine Hot Spring / Jacuzzi (Southeast Deck)
    const spaX = cx + 8;
    const spaZ = cz + 2;
    for (let dx = -2; dx <= 2; dx++) {
      for (let dz = -2; dz <= 2; dz++) {
        const isBorder = (Math.abs(dx) === 2 || Math.abs(dz) === 2);
        if (isBorder) {
          this.setBlock(spaX + dx, baseY, spaZ + dz, 'quartz_block');
          this.setBlock(spaX + dx, baseY + 1, spaZ + dz, 'quartz_pillar');
        } else {
          this.setBlock(spaX + dx, baseY - 1, spaZ + dz, 'magma_block'); // Underfloor heat
          this.setBlock(spaX + dx, baseY, spaZ + dz, 'water');
        }
      }
    }
    this.setBlock(spaX - 2, baseY + 2, spaZ - 2, 'lantern');
    this.setBlock(spaX + 2, baseY + 2, spaZ + 2, 'lantern');

    this.setBlock(cx, baseY + 1, cz + 6, 'glowstone', {
      type: 'sign',
      title: 'Chalet de Lakshya · Alpine Ski Lodge 🏔️🔥',
      text: 'Warm timber refuge nestled in the Frostpeak Alps. Open hearth fireplace, heated thermal bath, and panoramic vistas of Lake Serenity.'
    });

    // 4. Lake Serenity Glacial Ice Rink & Frozen Waterfall
    // Lake Basin: X in [-14, 8], Z in [-125, -110], Y = 8
    const lakeMinX = -14;
    const lakeMaxX = 8;
    const lakeMinZ = -125;
    const lakeMaxZ = -110;
    const lakeY = 8;

    for (let x = lakeMinX; x <= lakeMaxX; x++) {
      for (let z = lakeMinZ; z <= lakeMaxZ; z++) {
        if (Math.hypot((x - (-2)) / 12, (z - (-115)) / 10) <= 0.85) {
          this.setBlock(x, lakeY - 1, z, 'prismarine_bricks');
          this.setBlock(x, lakeY, z, 'ice');
        }
      }
    }

    // Perimeter benches, lanterns & fence on south shore
    for (let x = -8; x <= 6; x += 4) {
      this.setBlock(x, lakeY + 1, -107, 'spruce_log'); // Bench
      this.setBlock(x, lakeY + 2, -107, 'snow');
      this.setBlock(x + 2, lakeY + 1, -107, 'oak_fence');
      this.setBlock(x + 2, lakeY + 2, -107, 'lantern');
    }

    // Ice Skater Warming Shack at (10, 8, -114)
    const shackX = 10;
    const shackZ = -114;
    for (let dx = -2; dx <= 2; dx++) {
      for (let dz = -2; dz <= 2; dz++) {
        this.setBlock(shackX + dx, lakeY, shackZ + dz, 'oak_planks');
        const isWall = (Math.abs(dx) === 2 || Math.abs(dz) === 2);
        if (isWall) {
          this.setBlock(shackX + dx, lakeY + 1, shackZ + dz, 'spruce_log');
          this.setBlock(shackX + dx, lakeY + 2, shackZ + dz, (dx === 0 && dz === -2) ? 'air' : 'spruce_log');
        }
        this.setBlock(shackX + dx, lakeY + 3, shackZ + dz, 'snow');
      }
    }
    this.setBlock(shackX, lakeY + 1, shackZ, 'bookshelf');
    this.setBlock(shackX, lakeY + 2, shackZ, 'sea_lantern');

    // Cascading Frozen Waterfall (cliff face at Z = -126, X from -5 to 3, Y = 8 to 19)
    for (let x = -5; x <= 3; x++) {
      for (let y = 8; y <= 19; y++) {
        const isSpout = (y >= 16);
        const wType = (isSpout && (x === -1 || x === 0)) ? 'water' : ((x + y) % 3 === 0) ? 'cyber_glass' : 'ice';
        this.setBlock(x, y, -125, wType);
        if (y % 3 === 0) {
          this.setBlock(x, y, -124, 'ice');
        }
      }
      this.setBlock(x, 20, -126, 'snow');
    }

    this.setBlock(-2, lakeY + 1, -106, 'glowstone', {
      type: 'sign',
      title: 'Lake Serenity · Glacial Ice Rink ⛸️❄️',
      text: 'Turquoise glacial lake frozen solid under the mountain shadow. Enjoy ice skating beneath the frozen waterfall and surrounding spruce pines.'
    });

    // 5. Frostpeak Summit Observatory & Skyward Aurora Beacon
    // Summit Peak at (-2, -160), Terrace at Y = 28
    const sumX = -2;
    const sumZ = -160;
    const sumY = 28;

    // Stone Steps winding up the summit crag from Z = -140 up to -155
    for (let step = 0; step <= 15; step++) {
      const stepZ = -142 - step;
      const stepY = 20 + Math.round((step / 15) * 8);
      for (let dx = -1; dx <= 1; dx++) {
        this.setBlock(sumX + dx, stepY, stepZ, 'smooth_stone');
      }
      if (step % 4 === 0) {
        this.setBlock(sumX - 2, stepY + 1, stepZ, 'iron_block');
        this.setBlock(sumX - 2, stepY + 2, stepZ, 'sea_lantern');
        this.setBlock(sumX + 2, stepY + 1, stepZ, 'iron_block');
        this.setBlock(sumX + 2, stepY + 2, stepZ, 'sea_lantern');
      }
    }

    // Circular Summit Observation Terrace at Y = 28 (Radius 6)
    for (let dx = -6; dx <= 6; dx++) {
      for (let dz = -6; dz <= 6; dz++) {
        const d = Math.hypot(dx, dz);
        if (d <= 6) {
          this.setBlock(sumX + dx, sumY, sumZ + dz, (d <= 2) ? 'diamond_block' : (d <= 5) ? 'quartz_block' : 'stone_bricks');
          if (d >= 5.2 && d <= 6) {
            this.setBlock(sumX + dx, sumY + 1, sumZ + dz, 'iron_block'); // Safety guardrail
          }
        }
      }
    }

    // Astronomical Observatory Dome at (sumX - 3, sumZ)
    const obsX = sumX - 3;
    const obsZ = sumZ;
    for (let dx = -2; dx <= 2; dx++) {
      for (let dz = -2; dz <= 2; dz++) {
        if (Math.hypot(dx, dz) <= 2.2) {
          // Walls
          for (let y = sumY + 1; y <= sumY + 3; y++) {
            this.setBlock(obsX + dx, y, obsZ + dz, 'quartz_pillar');
          }
          // Curved Glass Dome
          this.setBlock(obsX + dx, sumY + 4, obsZ + dz, 'cyber_glass');
        }
      }
    }
    this.setBlock(obsX, sumY + 5, obsZ, 'quartz_block');
    // Astronomical deep-sky telescope angled up
    this.setBlock(obsX, sumY + 2, obsZ, 'iron_block');
    this.setBlock(obsX, sumY + 3, obsZ, 'iron_block');
    this.setBlock(obsX, sumY + 4, obsZ - 1, 'sea_lantern'); // Objective lens

    // Skyward Aurora Beacon at (sumX + 3, sumZ)
    const becX = sumX + 3;
    const becZ = sumZ;
    for (let dx = -1; dx <= 1; dx++) {
      for (let dz = -1; dz <= 1; dz++) {
        this.setBlock(becX + dx, sumY, becZ + dz, 'diamond_block');
      }
    }
    this.setBlock(becX, sumY + 1, becZ, 'beacon');
    this.setBlock(becX, sumY + 2, becZ, 'sea_lantern');

    this.setBlock(sumX, sumY + 1, sumZ - 5, 'glowstone', {
      type: 'sign',
      title: 'Frostpeak Summit Observatory · Alt 28m 🔭🌌',
      text: 'Highest vantage point of the island realm! Deep-sky telescope, celestial aurora beacon, and panoramic 360-degree views across the entire world.'
    });

    // 6. Mountain Cable Car / Aerial Gondola Lift
    // 3 Structural Steel Lattice Pylons
    const pylons = [
      { x: 8, z: -76, baseY: 3, topY: 15 },
      { x: 8, z: -115, baseY: 11, topY: 22 },
      { x: 8, z: -152, baseY: 26, topY: 34 }
    ];

    for (const p of pylons) {
      // 2x2 Steel pylon column
      for (let y = p.baseY; y <= p.topY; y++) {
        this.setBlock(p.x, y, p.z, (y % 3 === 0) ? 'sea_lantern' : 'iron_block');
        this.setBlock(p.x + 1, y, p.z, 'iron_block');
      }
      // Crossarm beam
      for (let dx = -2; dx <= 3; dx++) {
        this.setBlock(p.x + dx, p.topY, p.z, 'iron_block');
      }
    }

    // Aerial Steel Cable Span connecting Pylon 1 to 2 to 3
    for (let z = -76; z >= -152; z--) {
      const u = (z - (-76)) / (-152 - (-76));
      const cableY = Math.round(15 + u * (34 - 15));
      this.setBlock(8, cableY, z, 'iron_block');
    }

    // Valley Cable Station Building at (8, 3, -76)
    for (let dx = -2; dx <= 3; dx++) {
      for (let dz = -2; dz <= 2; dz++) {
        this.setBlock(8 + dx, 3, -76 + dz, 'stone_bricks');
        if (Math.abs(dx) === 2 || Math.abs(dz) === 2) {
          this.setBlock(8 + dx, 4, -76 + dz, 'iron_block');
        }
      }
    }
    this.setBlock(8, 4, -73, 'glowstone', {
      type: 'sign',
      title: 'Frostpeak Mountain Aerial Tramway 🚡',
      text: 'Scenic aerial cable car linking the valley base station to the high alpine summit. Operating continuous service across Lake Serenity.'
    });

    // Gondola 1 (Alpine Red Express) at (8, 18, -100)
    const g1X = 8;
    const g1Y = 18;
    const g1Z = -100;
    this.setBlock(g1X, g1Y + 2, g1Z, 'iron_block'); // Cable hanger
    this.setBlock(g1X, g1Y + 1, g1Z, 'iron_block');
    for (let dx = -1; dx <= 1; dx++) {
      for (let dz = -1; dz <= 1; dz++) {
        this.setBlock(g1X + dx, g1Y - 1, g1Z + dz, 'iron_block'); // Floor
        this.setBlock(g1X + dx, g1Y, g1Z + dz, (dx === 0 && dz === 0) ? 'sea_lantern' : 'cyber_glass'); // Windows & Light
        this.setBlock(g1X + dx, g1Y + 1, g1Z + dz, 'redstone_block'); // Red cabin roof
      }
    }

    // Gondola 2 (Glacier Gold Express) at (8, 28, -136)
    const g2X = 8;
    const g2Y = 28;
    const g2Z = -136;
    this.setBlock(g2X, g2Y + 2, g2Z, 'iron_block');
    this.setBlock(g2X, g2Y + 1, g2Z, 'iron_block');
    for (let dx = -1; dx <= 1; dx++) {
      for (let dz = -1; dz <= 1; dz++) {
        this.setBlock(g2X + dx, g2Y - 1, g2Z + dz, 'iron_block');
        this.setBlock(g2X + dx, g2Y, g2Z + dz, (dx === 0 && dz === 0) ? 'sea_lantern' : 'cyber_glass');
        this.setBlock(g2X + dx, g2Y + 1, g2Z + dz, 'gold_block'); // Gold cabin roof
      }
    }

    // 7. Crystal Ice Cavern & Amethyst Grotto at (18, 11, -125)
    const caveX = 18;
    const caveY = 11;
    const caveZ = -125;

    // Carved Cavern Room
    for (let dx = -3; dx <= 3; dx++) {
      for (let dz = -3; dz <= 3; dz++) {
        // Floor & ceiling
        this.setBlock(caveX + dx, caveY, caveZ + dz, 'ice');
        this.setBlock(caveX + dx, caveY + 4, caveZ + dz, ((dx + dz) % 2 === 0) ? 'amethyst_block' : 'ice');
        // Stalactites
        if (Math.abs(dx) === 2 && Math.abs(dz) === 2) {
          this.setBlock(caveX + dx, caveY + 3, caveZ + dz, 'cyber_glass');
          this.setBlock(caveX + dx, caveY + 2, caveZ + dz, 'sea_lantern');
        }
      }
    }
    // Glowing crystal clusters
    this.setBlock(caveX + 2, caveY + 1, caveZ - 2, 'amethyst_block');
    this.setBlock(caveX + 2, caveY + 2, caveZ - 2, 'amethyst_block');
    this.setBlock(caveX - 2, caveY + 1, caveZ + 2, 'amethyst_block');
    this.setBlock(caveX - 2, caveY + 2, caveZ + 2, 'amethyst_block');

    // Ancient Permafrost Treasure Chest
    this.setBlock(caveX, caveY + 1, caveZ, 'chest', {
      type: 'chest',
      title: 'Permafrost Crystal Grotto 💎❄️',
      text: 'You discovered the hidden crystal cavern deep beneath Glacier Horn! Resonating amethyst crystals and ancient glacial relics.'
    });

    // 8. Alpine Spruce Pine Forests (Green Foothills -> Snow-capped Upper Slopes)
    const greenSpruceSites = [
      { x: -9, z: -68, h: 6 },
      { x: 10, z: -66, h: 6 },
      { x: -11, z: -74, h: 7 },
      { x: 12, z: -76, h: 7 },
      { x: -8, z: -80, h: 6 },
      { x: 8, z: -84, h: 6 },
      { x: -14, z: -86, h: 7 },
      { x: 14, z: -86, h: 7 },
      { x: -12, z: -80, h: 6 },
      { x: 12, z: -82, h: 6 }
    ];

    for (const site of greenSpruceSites) {
      this.buildGreenSpruceTree(site.x, this.getTerrainHeight(site.x, site.z), site.z, site.h);
    }

    const snowSpruceSites = [
      { x: 14, z: -92, h: 7 },
      { x: -14, z: -94, h: 7 },
      { x: -28, z: -98, h: 8 },
      { x: -25, z: -108, h: 7 },
      { x: -18, z: -116, h: 8 },
      { x: -20, z: -125, h: 6 },
      { x: 14, z: -102, h: 7 },
      { x: 16, z: -112, h: 8 },
      { x: 18, z: -135, h: 7 },
      { x: -10, z: -138, h: 8 },
      { x: -4, z: -148, h: 7 },
      { x: 6, z: -145, h: 7 },
      { x: 14, z: -160, h: 6 },
      { x: -14, z: -165, h: 6 }
    ];

    for (const site of snowSpruceSites) {
      this.buildSnowSpruceTree(site.x, this.getTerrainHeight(site.x, site.z), site.z, site.h);
    }

    // 9. Snowmen (Deep snowy upper mountains)
    this.buildSnowman(-14, this.getTerrainHeight(-14, -95), -95);
    this.buildSnowman(-22, this.getTerrainHeight(-22, -95), -95);
    this.buildSnowman(-4, this.getTerrainHeight(-4, -107), -107);
    this.buildSnowman(4, this.getTerrainHeight(4, -107), -107);
  }

  // =========================================================================
  // 14. Sunflower Valley & Countryside Farmland Realm (South-West Plain)
  // =========================================================================
  private buildSunflowerValleyAndFarmstead() {
    const millX = -45;
    const millZ = 48;
    const baseY = 1;

    // 1. Traditional 4-Sail Dutch Windmill
    // Octagonal Stone Foundation (radius 3, Y = 1 to 3)
    for (let dx = -3; dx <= 3; dx++) {
      for (let dz = -3; dz <= 3; dz++) {
        if (Math.abs(dx) + Math.abs(dz) <= 4) {
          for (let y = baseY; y <= baseY + 2; y++) {
            this.setBlock(millX + dx, y, millZ + dz, 'stone_bricks');
          }
        }
      }
    }

    // Tapering Cylindrical Tower Body (Y = 4 to 12)
    for (let y = baseY + 3; y <= baseY + 11; y++) {
      const r = (y >= baseY + 8) ? 2 : 2;
      for (let dx = -r; dx <= r; dx++) {
        for (let dz = -r; dz <= r; dz++) {
          const isPerimeter = (Math.abs(dx) === r || Math.abs(dz) === r);
          if (isPerimeter) {
            const isWindow = (y === baseY + 6 && (dx === 0 || dz === 0));
            this.setBlock(millX + dx, y, millZ + dz, isWindow ? 'cyber_glass' : 'quartz_block');
          }
        }
      }
    }

    // Conical Wooden Roof Cap (Y = 13 to 15)
    for (let dx = -2; dx <= 2; dx++) {
      for (let dz = -2; dz <= 2; dz++) {
        this.setBlock(millX + dx, baseY + 12, millZ + dz, 'spruce_log');
      }
    }
    for (let dx = -1; dx <= 1; dx++) {
      for (let dz = -1; dz <= 1; dz++) {
        this.setBlock(millX + dx, baseY + 13, millZ + dz, 'spruce_log');
      }
    }
    this.setBlock(millX, baseY + 14, millZ, 'gold_block');
    this.setBlock(millX, baseY + 15, millZ, 'sea_lantern');

    // Rotating Hub & 4 Giant Windmill Sails (at Z = millZ + 3, Y = baseY + 11)
    const hubY = baseY + 11;
    const hubZ = millZ + 3;
    this.setBlock(millX, hubY, hubZ, 'iron_block');

    // 4 Cross Sail Arms extending 6 blocks in cardinal directions
    const armLen = 6;
    for (let i = 1; i <= armLen; i++) {
      // Top arm (+Y)
      this.setBlock(millX, hubY + i, hubZ, 'oak_fence');
      this.setBlock(millX + 1, hubY + i, hubZ, 'quartz_block'); // Canvas sail
      // Bottom arm (-Y)
      this.setBlock(millX, hubY - i, hubZ, 'oak_fence');
      this.setBlock(millX - 1, hubY - i, hubZ, 'quartz_block');
      // Right arm (+X)
      this.setBlock(millX + i, hubY, hubZ, 'oak_fence');
      this.setBlock(millX + i, hubY - 1, hubZ, 'quartz_block');
      // Left arm (-X)
      this.setBlock(millX - i, hubY, hubZ, 'oak_fence');
      this.setBlock(millX - i, hubY + 1, hubZ, 'quartz_block');
    }

    this.setBlock(millX, baseY + 1, millZ + 4, 'glowstone', {
      type: 'sign',
      title: 'Sunflower Valley Historic Windmill 🌾⚙️',
      text: 'Traditional 4-sail grain windmill overlooking the golden sunflower fields, wheat terraces, and countryside farmlands.'
    });

    // 2. Red Farmhouse Barn & Hayloft at (-32, 38)
    const barnX = -32;
    const barnZ = 38;
    for (let dx = -4; dx <= 4; dx++) {
      for (let dz = -5; dz <= 5; dz++) {
        this.setBlock(barnX + dx, baseY, barnZ + dz, 'oak_planks');
        const isWall = (Math.abs(dx) === 4 || Math.abs(dz) === 5);
        if (isWall) {
          for (let y = baseY + 1; y <= baseY + 4; y++) {
            const isCorner = (Math.abs(dx) === 4 && Math.abs(dz) === 5);
            this.setBlock(barnX + dx, y, barnZ + dz, isCorner ? 'quartz_block' : 'red_terracotta');
          }
        }
      }
    }
    // Barn Gambrel Roof
    for (let yStep = 0; yStep <= 3; yStep++) {
      const curW = 4 - yStep;
      for (let dz = -5; dz <= 5; dz++) {
        this.setBlock(barnX - curW, baseY + 5 + yStep, barnZ + dz, 'spruce_log');
        this.setBlock(barnX + curW, baseY + 5 + yStep, barnZ + dz, 'spruce_log');
      }
    }
    // Hay bales inside & outside
    this.setBlock(barnX - 2, baseY + 1, barnZ, 'gold_block');
    this.setBlock(barnX - 1, baseY + 1, barnZ, 'gold_block');
    this.setBlock(barnX - 2, baseY + 2, barnZ, 'gold_block');
    this.setBlock(barnX + 6, baseY + 1, barnZ - 2, 'gold_block');
    this.setBlock(barnX + 6, baseY + 1, barnZ - 1, 'gold_block');

    // 3. Golden Wheat, Sunflower, and Pumpkin Fields
    // Field 1: Golden Wheat (X in [-60, -50], Z in [35, 55])
    for (let x = -60; x <= -50; x++) {
      for (let z = 35; z <= 55; z++) {
        if (x % 3 === 0) {
          this.setBlock(x, baseY, z, 'water'); // Irrigation canal
        } else {
          this.setBlock(x, baseY, z, 'dirt');
          this.setBlock(x, baseY + 1, z, 'gold_block'); // Ripe golden wheat stalks
        }
      }
    }

    // Field 2: Sunflowers & Pumpkins (X in [-58, -36], Z in [60, 72])
    for (let x = -58; x <= -36; x++) {
      for (let z = 60; z <= 72; z++) {
        if ((x + z) % 4 === 0) {
          this.setBlock(x, baseY, z, 'dirt');
          this.setBlock(x, baseY + 1, z, 'glowstone'); // Glowing sunflower blooms
        } else if ((x + z) % 7 === 0) {
          this.setBlock(x, baseY, z, 'dirt');
          this.setBlock(x, baseY + 1, z, 'sea_lantern'); // Harvest lanterns
        }
      }
    }

    // 4. Rustic Stone Well with Bucket Winch
    const wellX = -42;
    const wellZ = 40;
    for (let dx = -1; dx <= 1; dx++) {
      for (let dz = -1; dz <= 1; dz++) {
        if (dx === 0 && dz === 0) {
          this.setBlock(wellX, baseY, wellZ, 'water');
        } else {
          this.setBlock(wellX + dx, baseY, wellZ + dz, 'stone_bricks');
          this.setBlock(wellX + dx, baseY + 1, wellZ + dz, 'stone_bricks');
        }
      }
    }
    this.setBlock(wellX - 1, baseY + 2, wellZ, 'oak_fence');
    this.setBlock(wellX + 1, baseY + 2, wellZ, 'oak_fence');
    this.setBlock(wellX, baseY + 3, wellZ, 'spruce_log');
    this.setBlock(wellX, baseY + 2, wellZ, 'iron_block'); // Bucket

    // 5. Connecting Country Road linking Citadel to Sunflower Valley & Mexico
    for (let step = 0; step <= 36; step++) {
      const u = step / 36;
      const px = Math.round(-2 + (-78 - (-2)) * u);
      const pz = Math.round(24 + (60 - 24) * u);
      const gy = this.getTerrainHeight(px, pz);
      for (let dx = -1; dx <= 1; dx++) {
        this.setBlock(px + dx, gy, pz, (step % 2 === 0) ? 'cobblestone' : 'smooth_stone');
      }
      if (step % 6 === 0) {
        this.setBlock(px + 2, gy + 1, pz, 'oak_fence');
        this.setBlock(px + 2, gy + 2, pz, 'lantern');
      }
    }
  }

  // =========================================================================
  // 15. European Promenade & Garden Parklands (North Transition Zone)
  // =========================================================================
  private buildPromenadeParklands() {
    // Fills the parkland corridor between Citadel North Gate, London, and Paris
    // X in [-18, 18], Z in [-35, -58]
    for (let z = -35; z >= -58; z -= 6) {
      // Rose flowerbeds
      this.setBlock(-10, 1, z, 'redstone_block');
      this.setBlock(-9, 1, z, 'redstone_block');
      this.setBlock(10, 1, z, 'redstone_block');
      this.setBlock(9, 1, z, 'redstone_block');

      // Boxwood trimmed hedges
      this.setBlock(-12, 1, z, 'oak_leaves');
      this.setBlock(-12, 2, z, 'oak_leaves');
      this.setBlock(12, 1, z, 'oak_leaves');
      this.setBlock(12, 2, z, 'oak_leaves');

      // Victorian promenade lampposts
      this.setBlock(-6, 1, z, 'stone_bricks');
      this.setBlock(-6, 2, z, 'iron_block');
      this.setBlock(-6, 3, z, 'iron_block');
      this.setBlock(-6, 4, z, 'lantern');

      this.setBlock(6, 1, z, 'stone_bricks');
      this.setBlock(6, 2, z, 'iron_block');
      this.setBlock(6, 3, z, 'iron_block');
      this.setBlock(6, 4, z, 'lantern');

      // Park benches
      this.setBlock(-5, 1, z + 2, 'oak_planks');
      this.setBlock(5, 1, z + 2, 'oak_planks');
    }

    // Central reflection fountain at (0, -45)
    for (let dx = -2; dx <= 2; dx++) {
      for (let dz = -2; dz <= 2; dz++) {
        if (Math.abs(dx) === 2 || Math.abs(dz) === 2) {
          this.setBlock(dx, 1, -45 + dz, 'quartz_block');
        } else {
          this.setBlock(dx, 1, -45 + dz, 'water');
        }
      }
    }
    this.setBlock(0, 2, -45, 'quartz_pillar');
    this.setBlock(0, 3, -45, 'sea_lantern');
  }

  // Helpers
  private buildSnowSpruceTree(cx: number, baseY: number, cz: number, height: number = 6) {
    const gy = this.getTerrainHeight(cx, cz);
    const startY = Math.max(baseY, gy + 1);

    // Trunk
    for (let y = startY; y < startY + height; y++) {
      this.setBlock(cx, y, cz, 'spruce_log');
    }

    // Tiered snow-covered foliage
    const topY = startY + height;

    // Apex
    this.setBlock(cx, topY, cz, 'spruce_leaves');
    this.setBlock(cx, topY + 1, cz, 'snow');

    // Tier 1 (top - 1): plus shape
    for (const [dx, dz] of [[0, 1], [0, -1], [1, 0], [-1, 0]]) {
      this.setBlock(cx + dx, topY - 1, cz + dz, 'spruce_leaves');
      this.setBlock(cx + dx, topY, cz + dz, 'snow');
    }

    // Tier 2 (top - 2): 3x3 with corners
    for (let dx = -1; dx <= 1; dx++) {
      for (let dz = -1; dz <= 1; dz++) {
        if (dx === 0 && dz === 0) continue;
        this.setBlock(cx + dx, topY - 2, cz + dz, 'spruce_leaves');
        this.setBlock(cx + dx, topY - 1, cz + dz, 'snow');
      }
    }

    // Tier 3 (top - 3): plus shape r=2
    for (const [dx, dz] of [[0, 2], [0, -2], [2, 0], [-2, 0]]) {
      this.setBlock(cx + dx, topY - 3, cz + dz, 'spruce_leaves');
      this.setBlock(cx + dx, topY - 2, cz + dz, 'snow');
    }

    // Tier 4 (top - 4): 5x5 rounded
    if (height >= 6) {
      for (let dx = -2; dx <= 2; dx++) {
        for (let dz = -2; dz <= 2; dz++) {
          if (Math.abs(dx) === 2 && Math.abs(dz) === 2) continue;
          if (dx === 0 && dz === 0) continue;
          this.setBlock(cx + dx, topY - 4, cz + dz, 'spruce_leaves');
          this.setBlock(cx + dx, topY - 3, cz + dz, 'snow');
        }
      }
    }
  }

  private buildGreenSpruceTree(cx: number, baseY: number, cz: number, height: number = 6) {
    const gy = this.getTerrainHeight(cx, cz);
    const startY = Math.max(baseY, gy + 1);

    // Trunk
    for (let y = startY; y < startY + height; y++) {
      this.setBlock(cx, y, cz, 'spruce_log');
    }

    // Tiered green spruce foliage (clean, no snow)
    const topY = startY + height;

    // Apex
    this.setBlock(cx, topY, cz, 'spruce_leaves');

    // Tier 1 (top - 1): plus shape
    for (const [dx, dz] of [[0, 1], [0, -1], [1, 0], [-1, 0]]) {
      this.setBlock(cx + dx, topY - 1, cz + dz, 'spruce_leaves');
    }

    // Tier 2 (top - 2): 3x3 with corners
    for (let dx = -1; dx <= 1; dx++) {
      for (let dz = -1; dz <= 1; dz++) {
        if (dx === 0 && dz === 0) continue;
        this.setBlock(cx + dx, topY - 2, cz + dz, 'spruce_leaves');
      }
    }

    // Tier 3 (top - 3): plus shape r=2
    for (const [dx, dz] of [[0, 2], [0, -2], [2, 0], [-2, 0]]) {
      this.setBlock(cx + dx, topY - 3, cz + dz, 'spruce_leaves');
    }

    // Tier 4 (top - 4): 5x5 rounded
    if (height >= 6) {
      for (let dx = -2; dx <= 2; dx++) {
        for (let dz = -2; dz <= 2; dz++) {
          if (Math.abs(dx) === 2 && Math.abs(dz) === 2) continue;
          if (dx === 0 && dz === 0) continue;
          this.setBlock(cx + dx, topY - 4, cz + dz, 'spruce_leaves');
        }
      }
    }
  }

  private buildSnowman(cx: number, baseY: number, cz: number) {
    const gy = this.getTerrainHeight(cx, cz);
    const startY = Math.max(baseY, gy + 1);
    this.setBlock(cx, startY, cz, 'snow');
    this.setBlock(cx, startY + 1, cz, 'snow');
    this.setBlock(cx, startY + 2, cz, 'glowstone');
    this.setBlock(cx - 1, startY + 1, cz, 'oak_fence');
    this.setBlock(cx + 1, startY + 1, cz, 'oak_fence');
  }

  // -------------------------------------------------------------
  // ⚡ LIGHTNING McQUEEN STREET & RADIATOR SPRINGS PISTON CUP RACEWAY ⚡
  // -------------------------------------------------------------
  private buildLightningMcQueenStreet() {
    // 0. Airspace Clearing: Ensure entire raceway footprint has ZERO underground or floating blocks
    for (let x = 164; x <= 235; x++) {
      for (let z = -60; z <= -2; z++) {
        for (let y = 2; y <= 12; y++) {
          this.removeBlock(x, y, z);
        }
      }
    }

    // 1. Natural Landscaping outside West Outer Wall (X: 164..170, Z: -56..-48)
    // Clean up any severed road stubs so the racetrack is a clean, self-contained rectangular circuit
    for (let x = 164; x <= 170; x++) {
      for (let z = -56; z <= -48; z++) {
        this.setBlock(x, 1, z, 'grass');
        for (let y = 2; y <= 6; y++) {
          this.removeBlock(x, y, z);
        }
      }
    }

    // Helper to ensure over-water track sections (X > 192) have solid bridge pier foundation down to bedrock
    const buildPierSupport = (x: number, z: number) => {
      if (x > 192) {
        this.setBlock(x, 0, z, 'stone_bricks');
        if (x % 3 === 0 && Math.abs(z) % 3 === 0) {
          this.setBlock(x, -1, z, 'stone_bricks');
          this.setBlock(x, -2, z, 'bedrock');
        }
      }
    };

    // 2. High-Speed Raceway Circuit (Continuous 8-block wide paved track loop in X: 172..228, Z: -54..-12)
    // A. Main Start/Finish Straight: X in [172, 228], Z in [-18, -12] (centerline Z = -15)
    for (let x = 172; x <= 228; x++) {
      for (let z = -18; z <= -12; z++) {
        buildPierSupport(x, z);
        this.setBlock(x, 1, z, 'asphalt_road');
        if (z === -15 && x % 4 <= 1) {
          this.setBlock(x, 1, z, 'gold_block');
        }
      }
    }

    // Checkered Start/Finish Line at X = 190 (spanning Z in [-18, -12])
    for (let z = -18; z <= -12; z++) {
      for (let x = 190; x <= 191; x++) {
        buildPierSupport(x, z);
        const isWhite = (x + z) % 2 === 0;
        this.setBlock(x, 1, z, isWhite ? 'quartz_block' : 'coal_block');
      }
    }

    // Starting Grid Slots (Distinct white and colored box markers for racers behind start line)
    // McQueen inside slot (186, -16.5), Doc Hudson outside slot (186, -13.5)
    for (let x = 185; x <= 187; x++) {
      this.setBlock(x, 1, -17, 'quartz_block');
      this.setBlock(x, 1, -16, 'gold_block');
      this.setBlock(x, 1, -14, 'lapis_block');
      this.setBlock(x, 1, -13, 'quartz_block');
    }

    // B. East Ocean Turn (Turns 1 & 2 Hairpin over water): X in [220, 228], Z in [-54, -12] (centerline X = 224)
    for (let z = -54; z <= -12; z++) {
      for (let x = 220; x <= 228; x++) {
        buildPierSupport(x, z);
        this.setBlock(x, 1, z, 'asphalt_road');
        if (x === 224 && Math.abs(z) % 4 <= 1) {
          this.setBlock(x, 1, z, 'gold_block');
        }
      }
    }

    // C. Canyon Back Straight: X in [172, 228], Z in [-54, -48] (centerline Z = -51)
    for (let x = 172; x <= 228; x++) {
      for (let z = -54; z <= -48; z++) {
        buildPierSupport(x, z);
        this.setBlock(x, 1, z, 'asphalt_road');
        if (z === -51 && x % 4 <= 1) {
          this.setBlock(x, 1, z, 'gold_block');
        }
      }
    }

    // D. West S-Curve / Willy's Butte Hairpin: X in [172, 180], Z in [-54, -12] (centerline X = 176)
    for (let z = -54; z <= -12; z++) {
      for (let x = 172; x <= 180; x++) {
        this.setBlock(x, 1, z, 'asphalt_road');
        if (x === 176 && Math.abs(z) % 4 <= 1) {
          this.setBlock(x, 1, z, 'gold_block');
        }
      }
    }

    // E. Smooth Wide Corner Junction Plazas (ensuring zero unpaved gaps on curves)
    for (let x = 214; x <= 228; x++) {
      for (let z = -20; z <= -12; z++) { buildPierSupport(x, z); this.setBlock(x, 1, z, 'asphalt_road'); }
      for (let z = -54; z <= -46; z++) { buildPierSupport(x, z); this.setBlock(x, 1, z, 'asphalt_road'); }
    }
    for (let x = 172; x <= 184; x++) {
      for (let z = -20; z <= -12; z++) { this.setBlock(x, 1, z, 'asphalt_road'); }
      for (let z = -54; z <= -46; z++) { this.setBlock(x, 1, z, 'asphalt_road'); }
    }

    // =========================================================================
    // =========================================================================
    // 3. FENCE THE TRACK: HIGH-VISIBILITY CRASH BARRIERS & CATCH FENCES (FULLY BOUNDED)
    // =========================================================================
    // Cars are 100% contained in an unobstructed, fully bounded racing channel!

    // A. Outer South Barrier Wall & Catch Fence: Z = -11, X in [171, 229]
    for (let x = 171; x <= 229; x++) {
      buildPierSupport(x, -11);
      this.setBlock(x, 1, -11, (x % 2 === 0) ? 'redstone_block' : 'quartz_block'); // Rumble kerb
      this.setBlock(x, 2, -11, 'stone_bricks'); // Solid concrete crash barrier
      this.setBlock(x, 3, -11, 'iron_bars');    // Protective catch fence
      if (x % 8 === 0) {
        this.setBlock(x, 4, -11, 'iron_block');
        this.setBlock(x, 5, -11, 'sea_lantern'); // Stadium floodlight
      }
    }

    // B. Outer East Ocean Barrier Wall & Catch Fence: X = 229, Z in [-55, -11]
    for (let z = -55; z <= -11; z++) {
      buildPierSupport(229, z);
      this.setBlock(229, 1, z, (Math.abs(z) % 2 === 0) ? 'redstone_block' : 'quartz_block');
      this.setBlock(229, 2, z, 'stone_bricks');
      this.setBlock(229, 3, z, 'iron_bars');
      if (Math.abs(z) % 8 === 0) {
        this.setBlock(229, 4, z, 'iron_block');
        this.setBlock(229, 5, z, 'sea_lantern');
      }
    }

    // C. Outer North Barrier Wall & Catch Fence: Z = -55, X in [171, 229]
    for (let x = 171; x <= 229; x++) {
      buildPierSupport(x, -55);
      this.setBlock(x, 1, -55, (x % 2 === 0) ? 'redstone_block' : 'quartz_block');
      this.setBlock(x, 2, -55, 'stone_bricks');
      this.setBlock(x, 3, -55, 'iron_bars');
      if (x % 8 === 0) {
        this.setBlock(x, 4, -55, 'iron_block');
        this.setBlock(x, 5, -55, 'sea_lantern');
      }
    }

    // D. Outer West Barrier Wall & Catch Fence: X = 171, Z in [-55, -11]
    for (let z = -55; z <= -11; z++) {
      this.setBlock(171, 1, z, (Math.abs(z) % 2 === 0) ? 'redstone_block' : 'quartz_block');
      this.setBlock(171, 2, z, 'stone_bricks');
      this.setBlock(171, 3, z, 'iron_bars');
      if (Math.abs(z) % 8 === 0) {
        this.setBlock(171, 4, z, 'iron_block');
        this.setBlock(171, 5, z, 'sea_lantern');
      }
    }

    // E. Inner Infield Rumble Kerbs & Heavy Tire Safety Barriers (Closed Loop around Willy's Butte)
    // South Infield edge: Z = -19, X in [181, 219]
    for (let x = 181; x <= 219; x++) {
      buildPierSupport(x, -19);
      this.setBlock(x, 1, -19, (x % 2 === 0) ? 'redstone_block' : 'quartz_block');
      this.setBlock(x, 2, -19, 'coal_block'); // Stacked racing tires
      this.setBlock(x, 3, -19, 'iron_bars');  // Catch fence
    }
    // East Infield edge: X = 219, Z in [-47, -19]
    for (let z = -47; z <= -19; z++) {
      buildPierSupport(219, z);
      this.setBlock(219, 1, z, (Math.abs(z) % 2 === 0) ? 'redstone_block' : 'quartz_block');
      this.setBlock(219, 2, z, 'coal_block');
      this.setBlock(219, 3, z, 'iron_bars');
    }
    // North Infield edge: Z = -47, X in [181, 219]
    for (let x = 181; x <= 219; x++) {
      buildPierSupport(x, -47);
      this.setBlock(x, 1, -47, (x % 2 === 0) ? 'redstone_block' : 'quartz_block');
      this.setBlock(x, 2, -47, 'coal_block');
      this.setBlock(x, 3, -47, 'iron_bars');
    }
    // West Infield edge: X = 181, Z in [-47, -19]
    for (let z = -47; z <= -19; z++) {
      this.setBlock(181, 1, z, (Math.abs(z) % 2 === 0) ? 'redstone_block' : 'quartz_block');
      this.setBlock(181, 2, z, 'coal_block');
      this.setBlock(181, 3, z, 'iron_bars');
    }

    // F. Clear all racetrack lanes from Y = 2 to Y = 10 so there are ZERO obstacles
    for (let y = 2; y <= 10; y++) {
      for (let x = 172; x <= 228; x++) {
        for (let z = -18; z <= -12; z++) this.removeBlock(x, y, z);
        for (let z = -54; z <= -48; z++) this.removeBlock(x, y, z);
      }
      for (let z = -54; z <= -12; z++) {
        for (let x = 172; x <= 180; x++) this.removeBlock(x, y, z);
        for (let x = 220; x <= 228; x++) this.removeBlock(x, y, z);
      }
      for (let x = 172; x <= 184; x++) {
        for (let z = -20; z <= -12; z++) this.removeBlock(x, y, z);
        for (let z = -54; z <= -46; z++) this.removeBlock(x, y, z);
      }
      for (let x = 216; x <= 228; x++) {
        for (let z = -20; z <= -12; z++) this.removeBlock(x, y, z);
        for (let z = -54; z <= -46; z++) this.removeBlock(x, y, z);
      }
    }

    // 4. Uniform Infield Paving & Iconic Willy's Butte Desert Mesa (X: 182..218, Z: -46..-20)
    // A. 100% UNIFORM Desert Infield Ground (Level Y = 1, Deck at Y = 0)
    // Eliminates all biome splits, grass stripes, and water puddles!
    for (let x = 182; x <= 218; x++) {
      for (let z = -46; z <= -20; z++) {
        buildPierSupport(x, z);
        // Clear any rogue floating blocks
        for (let y = 2; y <= 8; y++) {
          this.removeBlock(x, y, z);
        }
        // Solid foundation deck
        this.setBlock(x, 0, z, 'stone_bricks');
        // Uniform desert red-clay floor
        this.setBlock(x, 1, z, 'terracotta_adobe');
      }
    }

    // B. Authentic Radiator Springs Dirt Drift Ring around Willy's Butte
    const butteX = 200;
    const butteZ = -33;
    for (let x = 184; x <= 216; x++) {
      for (let z = -44; z <= -22; z++) {
        const d = Math.hypot(x - butteX, z - butteZ);
        // Circular red-sandstone dirt drift oval (radius 7.0 to 11.5)
        if (d >= 7.0 && d <= 11.5) {
          this.setBlock(x, 1, z, 'red_sandstone');
        }
      }
    }

    // C. Majestic Natural Willy's Butte Desert Mesa (Natural stratified red rock)
    for (let dx = -7; dx <= 7; dx++) {
      for (let dz = -7; dz <= 7; dz++) {
        const d = Math.hypot(dx, dz);
        const x = butteX + dx;
        const z = butteZ + dz;

        // Base Footing (d <= 6.2, Y = 1..2): Stratified Red Terracotta
        if (d <= 6.2) {
          this.setBlock(x, 1, z, 'red_terracotta');
          this.setBlock(x, 2, z, 'red_terracotta');
        }

        // Lower Mesa Tier (d <= 4.8, Y = 3..4): Weathered Red Sandstone
        if (d <= 4.8) {
          this.setBlock(x, 3, z, 'red_sandstone');
          this.setBlock(x, 4, z, 'red_sandstone');
        }

        // Upper Mesa Cliff (d <= 3.4, Y = 5): Terracotta Adobe Band
        if (d <= 3.4) {
          this.setBlock(x, 5, z, 'terracotta_adobe');
        }

        // Summit Plateau (d <= 2.2, Y = 6): Smooth Sandstone Top
        if (d <= 2.2) {
          this.setBlock(x, 6, z, 'sandstone');
        }
      }
    }

    // Natural desert cacti and summit flora on Willy's Butte
    this.setBlock(butteX, 7, butteZ, 'cactus');
    this.setBlock(butteX, 8, butteZ, 'cactus');
    this.setBlock(butteX - 1, 7, butteZ + 1, 'cactus');
    this.setBlock(butteX + 1, 7, butteZ - 1, 'cactus');
    this.setBlock(butteX, 7, butteZ + 2, 'lantern');

    // Official Landmark Sign on a carved sandstone plinth at front of the butte (X = 200, Z = -25)
    this.setBlock(200, 1, -25, 'red_sandstone');
    this.setBlock(200, 2, -25, 'red_sandstone', {
      type: 'sign',
      title: "🌵 Willy's Butte · Doc's Dirt Drift Loop 🏁",
      text: 'Doc Hudson\'s Championship Secret:\n"When you\'re entering the turn in the dirt, turn right to go left! Give it too much throttle, you lose the rear; balance the slide, and you slingshot out ahead!"\n\nSite of the legendary Lightning vs. Doc Hudson race.'
    });

    // 3. Grand Start/Finish Gantry & Electronic Racing Lights (X = 190, Z in [-20, -10])
    for (const pz of [-20, -10]) {
      for (let y = 1; y <= 7; y++) {
        this.setBlock(190, y, pz, (y % 2 === 0) ? 'redstone_block' : 'gold_block');
        this.setBlock(191, y, pz, 'iron_block');
      }
    }
    for (let z = -20; z <= -10; z++) {
      this.setBlock(190, 7, z, 'gold_block');
      this.setBlock(191, 7, z, 'iron_block');
      this.setBlock(190, 8, z, (Math.abs(z - (-15)) <= 1) ? 'sea_lantern' : 'redstone_block');
    }
    this.setBlock(190, 9, -15, 'gold_block');
    this.setBlock(190, 10, -15, 'beacon');

    // Electronic Starting Signal Lights (Red -> Red -> Yellow -> Green!)
    this.setBlock(190, 6, -17, 'redstone_block');
    this.setBlock(190, 6, -16, 'redstone_block');
    this.setBlock(190, 6, -14, 'gold_block');
    this.setBlock(190, 6, -13, 'emerald_block');

    // Official Landmark Sign at Start/Finish Gantry
    this.setBlock(190, 2, -9, 'gold_block', {
      type: 'sign',
      title: '⚡ LIGHTNING McQUEEN STREET · PISTON CUP SPEEDWAY #95 ⚡',
      text: '"Ka-Chow!" Welcome to Lightning McQueen Way! World-famous Radiator Springs Piston Cup Championship Raceway.\n\n"I am speed! Faster than fast, quicker than quick! Float like a Cadillac, sting like a Beemer!"\n\n• Press [E] to jump into Lightning McQueen and race in 3D!\n• Press [H] for Ka-Chow! horn · Hold [Shift] for Nitro Boost!\n• Challenge Doc Hudson to the 3-lap Willy\'s Butte showdown!'
    });

    // 4. Flo's V8 Café at X in [196, 204], Z in [-10, -3]
    for (let x = 196; x <= 204; x++) {
      for (let z = -10; z <= -3; z++) {
        const isChecker = (x + z) % 2 === 0;
        this.setBlock(x, 1, z, isChecker ? 'quartz_block' : 'coal_block');
        if (x === 196 || x === 204 || z === -3) {
          for (let y = 2; y <= 4; y++) {
            this.setBlock(x, y, z, (y === 3 && z === -3) ? 'cyber_glass' : 'red_terracotta');
          }
        }
        this.setBlock(x, 5, z, 'smooth_stone');
      }
    }
    // Neon "V8" Sign
    this.setBlock(198, 6, -6, 'sea_lantern');
    this.setBlock(198, 7, -6, 'sea_lantern');
    this.setBlock(199, 5, -6, 'sea_lantern');
    this.setBlock(200, 4, -6, 'sea_lantern');
    this.setBlock(201, 5, -6, 'sea_lantern');
    this.setBlock(202, 6, -6, 'sea_lantern');
    this.setBlock(202, 7, -6, 'sea_lantern');
    for (let y = 5; y <= 8; y++) {
      this.setBlock(204, y, -6, (y === 5 || y === 8 || y === 6.5) ? 'gold_block' : 'sea_lantern');
    }
    // Vintage Gas Pumps
    for (const px of [198, 202]) {
      this.setBlock(px, 1, -11, 'iron_block');
      this.setBlock(px, 2, -11, 'redstone_block');
      this.setBlock(px, 3, -11, 'glowstone');
    }
    this.setBlock(200, 2, -10, 'gold_block', {
      type: 'sign',
      title: "Flo's V8 Café · Radiator Springs ⛽",
      text: "Finest fuel in the whole Mother Road! Grab a can of high-octane blend and watch Lightning McQueen tear down the main straight!\n\n\"Float like a Cadillac, sting like a Beemer!\""
    });

    // 5. Luigi's Casa Della Tires at X in [207, 213], Z in [-10, -4]
    for (let x = 207; x <= 213; x++) {
      for (let z = -10; z <= -4; z++) {
        this.setBlock(x, 1, z, 'stone_bricks');
      }
    }
    // Leaning Tower of Tires
    const tireX = 210;
    const tireZ = -7;
    this.setBlock(tireX, 2, tireZ, 'coal_block');
    this.setBlock(tireX, 3, tireZ, 'coal_block');
    this.setBlock(tireX + 1, 4, tireZ, 'coal_block');
    this.setBlock(tireX + 1, 5, tireZ, 'coal_block');
    this.setBlock(tireX + 2, 6, tireZ, 'coal_block');
    this.setBlock(tireX + 2, 7, tireZ, 'coal_block');
    this.setBlock(tireX + 2, 8, tireZ, 'beacon');

    this.setBlock(210, 2, -10, 'gold_block', {
      type: 'sign',
      title: "Luigi's Casa Della Tires · Guido's Pit Stop 🛞",
      text: "Home of the famous Leaning Tower of Tires! Guido holds the all-time world record pit stop: four Lightyear racing tires changed in under 2.5 seconds!\n\n\"Peet stop!\""
    });

    // 6. Tow Mater's Salvage Yard at X in [178, 184], Z in [-10, -4]
    for (let x = 178; x <= 184; x++) {
      for (let z = -10; z <= -4; z++) {
        this.setBlock(x, 1, z, 'terracotta_adobe');
      }
    }
    this.setBlock(179, 2, -7, 'log');
    this.setBlock(179, 3, -7, 'log');
    this.setBlock(179, 4, -7, 'log');
    this.setBlock(180, 5, -6, 'oak_planks');
    this.setBlock(181, 6, -5, 'iron_block');
    this.setBlock(181, 5, -5, 'iron_block');
    this.setBlock(183, 2, -7, 'coal_block');
    this.setBlock(184, 2, -7, 'coal_block');

    this.setBlock(181, 2, -10, 'terracotta_adobe', {
      type: 'sign',
      title: 'Tow Mater Towing & Salvage 🛻',
      text: '"Dad gum! I\'m the world\'s best backward driver! Just ask Lightning McQueen—we\'re best friends! Ain\'t no need to see where I\'m goin\', I just need to know where I\'ve been!"\n\nRadiator Springs Official Towing & Recovery.'
    });

    // 7. Doc Hudson #51 Pit Crew Chief Box at X in [187, 193], Z in [-10, -4]
    for (let x = 187; x <= 193; x++) {
      for (let z = -10; z <= -4; z++) {
        this.setBlock(x, 1, z, 'smooth_stone');
      }
    }
    for (let x = 187; x <= 193; x++) {
      this.setBlock(x, 2, -6, 'lapis_block');
      this.setBlock(x, 3, -6, 'gold_block');
      this.setBlock(x, 4, -6, 'lapis_block');
    }
    this.setBlock(190, 5, -6, 'beacon');
    this.setBlock(191, 5, -6, 'iron_block');
    this.setBlock(191, 6, -6, 'sea_lantern');

    this.setBlock(190, 2, -10, 'gold_block', {
      type: 'sign',
      title: 'Doc Hudson #51 Pit Crew Box 🏁',
      text: 'Crew Chief Doc Hudson (The Fabulous Hudson Hornet):\n"When you\'re turning hard into the dirt, turn right to go left! Give it too much throttle, you lose the rear."\n\n3-Time Piston Cup Champion (1951, 1952, 1953).'
    });

    // 8. Spectator Grandstand Bleachers along South Main Straight (X in [180, 220], Z in [-3, 1])
    for (let x = 180; x <= 220; x++) {
      this.setBlock(x, 2, -3, 'stone_bricks');
      this.setBlock(x, 2, -2, 'smooth_stone');
      this.setBlock(x, 3, -1, 'stone_bricks');
      this.setBlock(x, 3, 0, 'smooth_stone');
      this.setBlock(x, 4, 1, 'stone_bricks');
      if (x % 3 === 0) {
        this.setBlock(x, 5, 1, 'redstone_block');
        this.setBlock(x, 6, 1, 'gold_block'); // #95 banners
      }
    }

    // 9. High-Intensity Stadium Floodlight Towers (4 Safe Outside Corners)
    const floodlights = [
      [170, -10],
      [230, -10],
      [230, -56],
      [170, -56]
    ];
    for (const [fx, fz] of floodlights) {
      for (let y = 1; y <= 11; y++) {
        this.setBlock(fx, y, fz, 'iron_block');
      }
      for (let dx = -1; dx <= 1; dx++) {
        for (let dz = -1; dz <= 1; dz++) {
          this.setBlock(fx + dx, 12, fz + dz, 'sea_lantern');
        }
      }
      this.setBlock(fx, 13, fz, 'beacon');
    }
  }

  // =========================================================================
  // MONUMENTAL LONG STRUCTURES FILLING EMPTY LAND MASSES
  // =========================================================================

  // 1. South-East Mega Transcontinental Suspension Bridge & Skyway Viaduct (X in [74, 190], Z around 130)
  private buildMegaSuspensionBridge() {
    const startX = 74;
    const endX = 190;
    const centerZ = 130;
    const deckY = 16;
    const lowerDeckY = 10;
    const tower1X = 105;
    const tower2X = 155;

    // A. West Anchorage Pier & Abutment (X in [74, 80], Z in [125, 135])
    for (let x = startX; x <= startX + 6; x++) {
      for (let z = centerZ - 5; z <= centerZ + 5; z++) {
        for (let y = 1; y <= deckY; y++) {
          const isEdge = (x === startX || x === startX + 6 || z === centerZ - 5 || z === centerZ + 5);
          this.setBlock(x, y, z, isEdge ? 'stone_bricks' : 'smooth_stone');
        }
      }
    }
    // Grand West Entry Portal Arch
    for (let z = centerZ - 4; z <= centerZ + 4; z++) {
      this.setBlock(startX + 6, deckY + 1, z, 'quartz_pillar');
      this.setBlock(startX + 6, deckY + 5, z, 'quartz_block');
    }
    for (let y = deckY + 1; y <= deckY + 4; y++) {
      this.setBlock(startX + 6, y, centerZ - 4, 'quartz_pillar');
      this.setBlock(startX + 6, y, centerZ + 4, 'quartz_pillar');
    }
    this.setBlock(startX + 6, deckY + 6, centerZ, 'gold_block');
    this.setBlock(startX + 6, deckY + 7, centerZ, 'sea_lantern');

    // Pedestrian Access Stairway to Upper Deck on West Bank
    for (let step = 0; step < deckY - 1; step++) {
      const sx = startX - 1 - Math.floor(step * 0.8);
      const sy = 1 + step;
      this.setBlock(sx, sy, centerZ - 4, 'smooth_stone');
      this.setBlock(sx, sy, centerZ - 3, 'smooth_stone');
      this.setBlock(sx, sy + 1, centerZ - 5, 'iron_block');
    }

    // B. East Anchorage Pier & Coastal Abutment (X in [184, 190], Z in [125, 135])
    for (let x = endX - 6; x <= endX; x++) {
      for (let z = centerZ - 5; z <= centerZ + 5; z++) {
        for (let y = 1; y <= deckY; y++) {
          const isEdge = (x === endX - 6 || x === endX || z === centerZ - 5 || z === centerZ + 5);
          this.setBlock(x, y, z, isEdge ? 'stone_bricks' : 'smooth_stone');
        }
      }
    }
    // East Portal Arch
    for (let z = centerZ - 4; z <= centerZ + 4; z++) {
      this.setBlock(endX - 6, deckY + 1, z, 'quartz_pillar');
      this.setBlock(endX - 6, deckY + 5, z, 'quartz_block');
    }
    for (let y = deckY + 1; y <= deckY + 4; y++) {
      this.setBlock(endX - 6, y, centerZ - 4, 'quartz_pillar');
      this.setBlock(endX - 6, y, centerZ + 4, 'quartz_pillar');
    }
    this.setBlock(endX - 6, deckY + 6, centerZ, 'gold_block');
    this.setBlock(endX - 6, deckY + 7, centerZ, 'sea_lantern');

    // C. Twin Colossal Suspension Towers (Tower 1 at 105, Tower 2 at 155, Top Y = 38)
    const towers = [tower1X, tower2X];
    for (const tx of towers) {
      // Underwater / Ground Concrete Foundation Caisson (Y = 1 to 5)
      for (let x = tx - 3; x <= tx + 3; x++) {
        for (let z = centerZ - 6; z <= centerZ + 6; z++) {
          for (let y = 1; y <= 5; y++) {
            this.setBlock(x, y, z, (y === 5) ? 'smooth_stone' : 'stone_bricks');
          }
        }
      }
      // Tower Pylon Legs (South at Z=127, North at Z=133)
      for (const pz of [centerZ - 3, centerZ + 3]) {
        for (let y = 6; y <= 38; y++) {
          for (let dx = -1; dx <= 1; dx++) {
            this.setBlock(tx + dx, y, pz, (y % 4 === 0) ? 'redstone_block' : 'red_terracotta');
          }
        }
      }
      // Horizontal Cross-Struts / Portal Bracing
      for (const hy of [lowerDeckY, deckY, 24, 32, 38]) {
        for (let z = centerZ - 3; z <= centerZ + 3; z++) {
          this.setBlock(tx - 1, hy, z, 'gold_block');
          this.setBlock(tx, hy, z, (hy === 38) ? 'gold_block' : 'red_terracotta');
          this.setBlock(tx + 1, hy, z, 'gold_block');
        }
      }
      // Tower Top Aircraft Warning Beacons & Saddles
      for (const pz of [centerZ - 3, centerZ + 3]) {
        this.setBlock(tx, 39, pz, 'beacon');
        this.setBlock(tx, 40, pz, 'sea_lantern');
      }
    }

    // D. Main Suspension Cables & Vertical Suspenders
    for (let x = startX + 6; x <= endX - 6; x++) {
      let cableY = deckY;
      if (x < tower1X) {
        // West Backstay
        const u = (x - (startX + 6)) / (tower1X - (startX + 6));
        cableY = Math.round(deckY + 1 + 21 * Math.pow(u, 1.4));
      } else if (x <= tower2X) {
        // Main Midspan Sag
        const u = Math.abs(x - (tower1X + tower2X) / 2) / ((tower2X - tower1X) / 2);
        cableY = Math.round(deckY + 2 + 18 * Math.pow(u, 2));
      } else {
        // East Backstay
        const u = ((endX - 6) - x) / ((endX - 6) - tower2X);
        cableY = Math.round(deckY + 1 + 21 * Math.pow(u, 1.4));
      }

      // Cable strings on both sides
      for (const cz of [centerZ - 3, centerZ + 3]) {
        this.setBlock(x, cableY, cz, 'iron_block');
        // Vertical Hangers every 2 blocks
        if (x % 2 === 0 && cableY > deckY + 1) {
          for (let hy = deckY + 1; hy < cableY; hy++) {
            this.setBlock(x, hy, cz, 'iron_block');
          }
        }
      }
    }

    // E. Double-Deck Deck System
    for (let x = startX; x <= endX; x++) {
      // 1. Lower Deck (Maglev Express at Y = 10)
      for (let z = centerZ - 2; z <= centerZ + 2; z++) {
        this.setBlock(x, lowerDeckY, z, 'smooth_stone');
        this.setBlock(x, lowerDeckY + 4, z, 'iron_block'); // Lower deck ceiling
      }
      // Maglev Center Magnetic Induction Track
      this.setBlock(x, lowerDeckY, centerZ, 'redstone_block');
      this.setBlock(x, lowerDeckY + 1, centerZ, 'gold_block');
      // Lower Deck Aerodynamic Truss Enclosure
      this.setBlock(x, lowerDeckY + 1, centerZ - 3, (x % 3 === 0) ? 'iron_block' : 'cyber_glass');
      this.setBlock(x, lowerDeckY + 2, centerZ - 3, (x % 3 === 0) ? 'iron_block' : 'cyber_glass');
      this.setBlock(x, lowerDeckY + 3, centerZ - 3, 'iron_block');
      this.setBlock(x, lowerDeckY + 1, centerZ + 3, (x % 3 === 0) ? 'iron_block' : 'cyber_glass');
      this.setBlock(x, lowerDeckY + 2, centerZ + 3, (x % 3 === 0) ? 'iron_block' : 'cyber_glass');
      this.setBlock(x, lowerDeckY + 3, centerZ + 3, 'iron_block');

      // 2. Upper Deck (Express Highway at Y = 16)
      for (let z = centerZ - 4; z <= centerZ + 4; z++) {
        const isCenterline = (z === centerZ);
        const isWalkway = (Math.abs(z - centerZ) === 4);
        if (isWalkway) {
          this.setBlock(x, deckY, z, 'smooth_stone');
        } else if (isCenterline) {
          this.setBlock(x, deckY, z, (x % 3 === 0) ? 'quartz_block' : 'asphalt_road');
        } else {
          this.setBlock(x, deckY, z, 'asphalt_road');
        }
      }
      // Crash Barriers and Lampposts
      this.setBlock(x, deckY + 1, centerZ - 4, 'iron_block');
      this.setBlock(x, deckY + 1, centerZ + 4, 'iron_block');

      if (x % 6 === 0) {
        // Highway Luminaire Lampposts
        this.setBlock(x, deckY + 2, centerZ - 4, 'iron_block');
        this.setBlock(x, deckY + 3, centerZ - 4, 'lantern');
        this.setBlock(x, deckY + 2, centerZ + 4, 'iron_block');
        this.setBlock(x, deckY + 3, centerZ + 4, 'lantern');
      }
    }

    // F. Futuristic Maglev Bullet Train on Lower Deck (Midspan, X in [120, 140])
    for (let x = 122; x <= 138; x++) {
      for (let z = centerZ - 1; z <= centerZ + 1; z++) {
        this.setBlock(x, lowerDeckY + 1, z, 'quartz_block');
        const isWall = (z === centerZ - 1 || z === centerZ + 1);
        this.setBlock(x, lowerDeckY + 2, z, isWall ? 'cyber_glass' : 'air');
        this.setBlock(x, lowerDeckY + 3, z, isWall ? 'lapis_block' : 'quartz_block');
      }
    }
    // Aerodynamic Nose Cone (facing East)
    this.setBlock(139, lowerDeckY + 1, centerZ, 'quartz_block');
    this.setBlock(139, lowerDeckY + 2, centerZ, 'cyber_glass');
    this.setBlock(140, lowerDeckY + 1, centerZ, 'gold_block');
    this.setBlock(140, lowerDeckY + 2, centerZ, 'sea_lantern'); // Train headlamp

    // G. Interactive Information Plaque
    this.setBlock(startX + 8, deckY + 2, centerZ - 3, 'gold_block', {
      type: 'sign',
      title: 'Lakshya Transcontinental Mega-Bridge 🌉',
      text: 'A 116-meter double-deck engineering marvel connecting the South Coast to Eastern archipelago. Features twin 38-meter suspension towers, four-lane express highway, and lower-level supersonic maglev transit.'
    });
    this.setBlock(startX + 8, lowerDeckY + 2, centerZ - 2, 'lapis_block', {
      type: 'sign',
      title: 'Trans-Island Maglev Line · Train #01 🚅',
      text: 'Next Generation Magnetic Levitation Express. Cruising speed: 500 km/h across the ocean bay.'
    });
  }

  // 2. Colossal Double-Tiered Roman Aqueduct & Waterfall Reservoir (X in [-180, -65], Z in [162, 168])
  private buildColossalRomanAqueduct() {
    const startX = -180;
    const endX = -65;
    const centerZ = 165;
    const lowerArcTopY = 8;
    const upperArcTopY = 15;
    const waterLevelY = 16;

    // A. Monumental Foundation & Lower Tier Heavy Pillars (Every 8 blocks)
    for (let px = startX; px <= endX; px += 8) {
      for (let dx = -1; dx <= 1; dx++) {
        for (let dz = -2; dz <= 2; dz++) {
          for (let y = 1; y <= lowerArcTopY; y++) {
            const isCorner = Math.abs(dx) === 1 && Math.abs(dz) === 2;
            this.setBlock(px + dx, y, centerZ + dz, isCorner ? 'sandstone' : 'stone_bricks');
          }
        }
      }
    }

    // Lower Tier Semicircular Barrel Arches between Pillars
    for (let px = startX; px < endX; px += 8) {
      for (let offset = 2; offset <= 6; offset++) {
        const x = px + offset;
        const archY = (offset === 2 || offset === 6) ? 6 : (offset === 3 || offset === 5) ? 7 : 8;
        for (let dz = -2; dz <= 2; dz++) {
          for (let y = archY; y <= lowerArcTopY; y++) {
            this.setBlock(x, y, centerZ + dz, (y === archY) ? 'smooth_stone' : 'stone_bricks');
          }
        }
      }
    }

    // B. Intermediate Cornice Promenade Deck (Y = 9)
    for (let x = startX; x <= endX; x++) {
      for (let dz = -2; dz <= 2; dz++) {
        this.setBlock(x, 9, centerZ + dz, (Math.abs(dz) === 2) ? 'smooth_stone' : 'stone_bricks');
      }
    }

    // C. Upper Tier Rhythmic Arcade (Pillars every 4 blocks, Y = 10 to 15)
    for (let px = startX; px <= endX; px += 4) {
      for (let dz = -1; dz <= 1; dz++) {
        for (let y = 10; y <= upperArcTopY; y++) {
          this.setBlock(px, y, centerZ + dz, 'stone_bricks');
        }
      }
    }
    // Upper Arches
    for (let px = startX; px < endX; px += 4) {
      for (let offset = 1; offset <= 3; offset++) {
        const x = px + offset;
        const archY = (offset === 2) ? 14 : 13;
        for (let dz = -1; dz <= 1; dz++) {
          for (let y = archY; y <= upperArcTopY; y++) {
            this.setBlock(x, y, centerZ + dz, (y === archY) ? 'sandstone' : 'stone_bricks');
          }
        }
      }
    }

    // D. Water Channel Specus & Walkway (Y = 16)
    for (let x = startX; x <= endX; x++) {
      // Channel Bed & Walls
      this.setBlock(x, waterLevelY - 1, centerZ, 'quartz_block');
      this.setBlock(x, waterLevelY, centerZ, 'water'); // Running springwater!

      // Walkway & Parapets
      this.setBlock(x, waterLevelY, centerZ - 1, 'smooth_stone');
      this.setBlock(x, waterLevelY, centerZ + 1, 'smooth_stone');
      this.setBlock(x, waterLevelY + 1, centerZ - 2, 'stone_bricks');
      this.setBlock(x, waterLevelY + 1, centerZ + 2, 'stone_bricks');

      if (x % 5 === 0) {
        this.setBlock(x, waterLevelY + 2, centerZ - 2, 'iron_block');
        this.setBlock(x, waterLevelY + 3, centerZ - 2, 'lantern');
        this.setBlock(x, waterLevelY + 2, centerZ + 2, 'iron_block');
        this.setBlock(x, waterLevelY + 3, centerZ + 2, 'lantern');
      }
    }

    // E. Western Spring Cavern / Mountain Intake (X in [-180, -175])
    for (let x = startX - 4; x <= startX; x++) {
      for (let z = centerZ - 4; z <= centerZ + 4; z++) {
        for (let y = 1; y <= waterLevelY + 2; y++) {
          const isOuter = (x === startX - 4 || Math.abs(z - centerZ) === 4);
          this.setBlock(x, y, z, isOuter ? 'mossy_stone_bricks' : 'air');
        }
      }
    }
    // Mountain Spring Cavern Water Source
    this.setBlock(startX - 2, waterLevelY + 1, centerZ, 'sea_lantern');
    this.setBlock(startX - 2, waterLevelY, centerZ, 'water');

    // Access Stairway at West Mountain
    for (let step = 0; step <= waterLevelY; step++) {
      const sx = startX - 2;
      const sz = centerZ - 4 - Math.floor(step * 0.5);
      this.setBlock(sx, 1 + step, sz, 'sandstone');
    }

    // F. Eastern Terminal Nymphaeum & Giant Cascading Waterfall (X = -65)
    // Monumental Greco-Roman Temple Facade
    for (let z = centerZ - 4; z <= centerZ + 4; z++) {
      for (let y = 1; y <= waterLevelY + 4; y++) {
        const isColumn = (z === centerZ - 4 || z === centerZ - 2 || z === centerZ + 2 || z === centerZ + 4);
        if (isColumn) {
          this.setBlock(endX, y, z, 'quartz_pillar');
        } else if (y >= waterLevelY) {
          this.setBlock(endX, y, z, 'quartz_block');
        }
      }
    }
    // Temple Pediment
    this.setBlock(endX, waterLevelY + 5, centerZ, 'gold_block');
    this.setBlock(endX, waterLevelY + 6, centerZ, 'sea_lantern');

    // 16-Block Tall Waterfall Plunge into Southern Bay
    for (let y = 1; y <= waterLevelY; y++) {
      this.setBlock(endX + 1, y, centerZ, 'water');
      this.setBlock(endX + 1, y, centerZ - 1, 'water');
      this.setBlock(endX + 1, y, centerZ + 1, 'water');
    }

    // Grand Splash Basin Pool at Sea Level (X in [-64, -58], Z in [162, 168])
    for (let x = endX + 1; x <= endX + 7; x++) {
      for (let z = centerZ - 3; z <= centerZ + 3; z++) {
        const isRim = (x === endX + 7 || Math.abs(z - centerZ) === 3);
        if (isRim) {
          this.setBlock(x, 1, z, 'quartz_block');
        } else {
          this.setBlock(x, 0, z, 'water');
          this.setBlock(x, -1, z, 'prismarine_bricks');
        }
      }
    }
    this.setBlock(endX + 4, 1, centerZ, 'sea_lantern');

    // G. Interactive Plaque
    this.setBlock(endX - 2, 2, centerZ - 5, 'quartz_block', {
      type: 'sign',
      title: 'Aqua Magna · Imperial Colossal Aqueduct 🏛️💧',
      text: 'A 115-meter monumental dual-tier Roman aqueduct engineered to transport pure mountain springwater across the southern badlands to the royal nymphaeum reservoir and ocean bay.'
    });
  }

  // 3. Nordic Atlantic Ocean Highway & Skyway Viaduct (X in [105, 190], Z around -145)
  private buildNordicAtlanticSkyway() {
    const startX = 105;
    const endX = 190;
    const centerZ = -145;
    const peakX = 148;
    const peakMastTopY = 36;

    // A. Curving Undulating Deck & Soaring Piers
    for (let x = startX; x <= endX; x++) {
      // Smooth sinusoidal elevation profile rising to Y = 20 at peakX
      const u = (x - startX) / (endX - startX);
      const dy = Math.round(4 + 16 * Math.sin(u * Math.PI));

      // Roadway Surface (5 blocks wide, Z in [-147, -143])
      for (let z = centerZ - 2; z <= centerZ + 2; z++) {
        const isCenter = (z === centerZ);
        this.setBlock(x, dy, z, isCenter && (x % 3 === 0) ? 'glowstone' : 'asphalt_road');
        // Structural Box Girder Deck beneath roadway
        this.setBlock(x, dy - 1, z, 'smooth_stone');
      }

      // Aerodynamic Cyber-Glass Wind Barrier & Railings
      this.setBlock(x, dy + 1, centerZ - 3, 'cyber_glass');
      this.setBlock(x, dy + 1, centerZ + 3, 'cyber_glass');
      this.setBlock(x, dy, centerZ - 3, 'smooth_stone');
      this.setBlock(x, dy, centerZ + 3, 'smooth_stone');
      this.setBlock(x, dy - 1, centerZ - 3, 'iron_block');
      this.setBlock(x, dy - 1, centerZ + 3, 'iron_block');

      // Pier Supports every 6 blocks rooted down to ground / seabed
      if (x % 6 === 0 && x > startX + 2 && x < endX - 2) {
        const pierGround = Math.max(-1, this.getTerrainHeight(x, centerZ));
        for (let y = pierGround; y < dy; y++) {
          for (let z = centerZ - 2; z <= centerZ + 2; z++) {
            this.setBlock(x, y, z, (Math.abs(z - centerZ) === 2) ? 'quartz_pillar' : 'smooth_stone');
          }
        }
      }
    }

    // B. Cable-Stayed Sail Pylon Mast at Midspan (Peak X = 148, Deck Y = 20)
    const peakY = Math.round(4 + 16 * Math.sin(((peakX - startX) / (endX - startX)) * Math.PI));
    // A-Frame Mast rising from Y = peakY to Y = peakMastTopY
    for (let y = peakY; y <= peakMastTopY; y++) {
      this.setBlock(peakX, y, centerZ - 3, 'quartz_pillar');
      this.setBlock(peakX, y, centerZ + 3, 'quartz_pillar');
      if (y >= 30) {
        this.setBlock(peakX, y, centerZ, 'quartz_block');
      }
    }
    // High-Tensile Stay Cables radiating from mast apex
    for (const offset of [5, 10, 15, 20]) {
      const stayY1 = Math.round(4 + 16 * Math.sin(((peakX - offset - startX) / (endX - startX)) * Math.PI));
      const stayY2 = Math.round(4 + 16 * Math.sin(((peakX + offset - startX) / (endX - startX)) * Math.PI));
      for (const pz of [centerZ - 3, centerZ + 3]) {
        this.setBlock(peakX - offset, stayY1 + 1, pz, 'iron_block');
        this.setBlock(peakX + offset, stayY2 + 1, pz, 'iron_block');
      }
    }
    this.setBlock(peakX, peakMastTopY + 1, centerZ, 'beacon');
    this.setBlock(peakX, peakMastTopY + 2, centerZ, 'sea_lantern');

    // C. Cantilevered Glass Observation Skywalk (Peak X in [146, 150], extending north)
    for (let x = peakX - 2; x <= peakX + 2; x++) {
      for (let z = centerZ - 4; z >= centerZ - 8; z--) {
        this.setBlock(x, peakY, z, 'cyber_glass');
        if (x === peakX - 2 || x === peakX + 2 || z === centerZ - 8) {
          this.setBlock(x, peakY + 1, z, 'cyber_glass');
        }
        // Diagonal structural under-struts supporting cantilevered glass floor
        const outDist = (centerZ - 4) - z;
        this.setBlock(x, peakY - 1, z, 'iron_block');
        if (outDist <= 2) {
          this.setBlock(x, peakY - 2, z, 'quartz_pillar');
        }
      }
    }
    this.setBlock(peakX, peakY, centerZ - 8, 'sea_lantern');

    // D. Interactive Information Plaque
    this.setBlock(peakX - 3, peakY + 1, centerZ - 2, 'gold_block', {
      type: 'sign',
      title: 'Nordic Atlantic Ocean Skyway 🌊🌉',
      text: 'Inspired by Norway\'s Atlantic Ocean Road and the Millau Viaduct. Soars 20 meters above the fjords with cable-stayed pylon masts and a cantilevered glass skywalk looking into the Arctic abyss.'
    });
  }

  // 4. Grand Trans-Continental Maritime Canal, Locks & Panamax Container Ship (X in [-175, -105], Z in [-52, -38])
  private buildGrandMaritimeCanal() {
    const startX = -175;
    const endX = -105;
    const centerZ = -45;

    // A. Deep-Water Canal Basin & Stone Revetment Quays
    for (let x = startX; x <= endX; x++) {
      // 9-Block Wide Water Channel (Z in [-49, -41])
      for (let z = centerZ - 4; z <= centerZ + 4; z++) {
        this.setBlock(x, 0, z, 'water');
        this.setBlock(x, -1, z, 'prismarine_bricks');
        this.setBlock(x, -2, z, 'stone_bricks');
      }
      // North Quay Wharf (Z in [-52, -50], Y = 1)
      for (let z = centerZ - 7; z <= centerZ - 5; z++) {
        this.setBlock(x, 1, z, (z === centerZ - 5) ? 'smooth_stone' : 'stone_bricks');
      }
      // South Quay Wharf (Z in [-39, -37], Y = 1)
      for (let z = centerZ + 5; z <= centerZ + 7; z++) {
        this.setBlock(x, 1, z, (z === centerZ + 5) ? 'smooth_stone' : 'stone_bricks');
      }

      // Mooring Bollards & Safety Buoys every 6 blocks
      if (x % 6 === 0) {
        this.setBlock(x, 2, centerZ - 5, 'iron_block');
        this.setBlock(x, 2, centerZ + 5, 'iron_block');
        this.setBlock(x, 1, centerZ - 6, 'redstone_block');
        this.setBlock(x, 1, centerZ + 6, 'redstone_block');
      }
    }

    // B. Hydraulic Lock Gates & Master Control Station (X in [-110, -105])
    for (const lx of [endX - 5, endX]) {
      // Heavy Steel Mitre Lock Gates across Channel
      for (let z = centerZ - 4; z <= centerZ + 4; z++) {
        for (let y = -1; y <= 3; y++) {
          this.setBlock(lx, y, z, (y === 3) ? 'gold_block' : 'obsidian');
        }
      }
      // Hydraulic Operating Rams on Quays
      this.setBlock(lx, 2, centerZ - 5, 'iron_block');
      this.setBlock(lx, 3, centerZ - 5, 'redstone_block');
      this.setBlock(lx, 2, centerZ + 5, 'iron_block');
      this.setBlock(lx, 3, centerZ + 5, 'redstone_block');
    }
    // Lockmaster Control Tower on South Bank
    const cX = endX - 2;
    const cZ = centerZ + 6;
    for (let y = 1; y <= 6; y++) {
      this.setBlock(cX, y, cZ, 'quartz_pillar');
    }
    for (let dx = -1; dx <= 1; dx++) {
      for (let dz = -1; dz <= 1; dz++) {
        this.setBlock(cX + dx, 7, cZ + dz, 'quartz_block');
        this.setBlock(cX + dx, 8, cZ + dz, (dx === 0 && dz === 0) ? 'sea_lantern' : 'cyber_glass');
        this.setBlock(cX + dx, 9, cZ + dz, 'quartz_block');
      }
    }
    // Shipping Signal Lights (Green / Red)
    this.setBlock(cX, 10, cZ, 'beacon');

    // C. Heavy Quayside Container Gantry Crane at X = -140
    const craneX = -140;
    // 4 Portal Legs
    for (const [px, pz] of [
      [craneX - 2, centerZ - 7],
      [craneX + 2, centerZ - 7],
      [craneX - 2, centerZ - 5],
      [craneX + 2, centerZ - 5],
    ]) {
      for (let y = 1; y <= 12; y++) {
        this.setBlock(px, y, pz, 'gold_block');
      }
    }
    // Top Horizontal Trolley Boom extending over ship (Z in [-7, -2], Y = 13)
    for (let z = centerZ - 7; z <= centerZ - 1; z++) {
      this.setBlock(craneX - 1, 13, z, 'iron_block');
      this.setBlock(craneX, 13, z, 'gold_block');
      this.setBlock(craneX + 1, 13, z, 'iron_block');
    }
    // Operator Cab & Hoist Spreader Cable
    this.setBlock(craneX, 12, centerZ - 4, 'cyber_glass');
    this.setBlock(craneX, 10, centerZ - 2, 'iron_block');
    this.setBlock(craneX, 9, centerZ - 2, 'iron_block');
    // Suspended Green ISO Container
    for (let dx = -1; dx <= 1; dx++) {
      this.setBlock(craneX + dx, 8, centerZ - 2, 'emerald_block');
    }

    // D. Panamax Container Ship ("EVER GLORY") Moored in Channel (X in [-162, -124], 39 blocks long)
    const shipStartX = -162;
    const shipEndX = -124;

    for (let x = shipStartX; x <= shipEndX; x++) {
      const isBow = (x >= shipEndX - 3);
      const isStern = (x <= shipStartX + 3);
      const widthSpan = (isBow || isStern) ? 1 : 2;

      // Bottom Red Keel & Boot-topping (Y = 0)
      for (let z = centerZ - widthSpan; z <= centerZ + widthSpan; z++) {
        this.setBlock(x, 0, z, 'red_terracotta');
        this.setBlock(x, 1, z, 'red_terracotta');
        // Black Hull Topsides (Y = 2)
        this.setBlock(x, 2, z, (Math.abs(z - centerZ) === widthSpan) ? 'coal_block' : 'smooth_stone');
      }
    }
    // Bulbous Underwater Bow at X = -123
    this.setBlock(shipEndX + 1, 0, centerZ, 'red_terracotta');

    // Cargo Container Stacks (X in [-152, -128], Y = 3 to 6)
    const containerTypes = ['emerald_block', 'lapis_block', 'redstone_block', 'gold_block', 'purpur_block', 'diamond_block'];
    for (let x = -152; x <= -128; x += 4) {
      for (let dz = -1; dz <= 1; dz++) {
        const cType1 = containerTypes[Math.abs(x + dz) % containerTypes.length];
        const cType2 = containerTypes[(Math.abs(x * 2 + dz) + 1) % containerTypes.length];
        // 20ft / 40ft Stacks
        for (let dx = 0; dx <= 2; dx++) {
          this.setBlock(x + dx, 3, centerZ + dz, cType1);
          this.setBlock(x + dx, 4, centerZ + dz, cType1);
          this.setBlock(x + dx, 5, centerZ + dz, cType2);
          this.setBlock(x + dx, 6, centerZ + dz, cType2);
        }
      }
    }

    // Aft Bridge & Living Quarters Superstructure (X in [-160, -154])
    for (let x = -160; x <= -154; x++) {
      for (let z = centerZ - 2; z <= centerZ + 2; z++) {
        for (let y = 3; y <= 6; y++) {
          const isEdge = (x === -160 || x === -154 || Math.abs(z - centerZ) === 2);
          this.setBlock(x, y, z, isEdge ? 'quartz_block' : 'smooth_stone');
        }
      }
    }
    // Navigation Bridge Cab (Y = 7)
    for (let x = -158; x <= -155; x++) {
      for (let z = centerZ - 2; z <= centerZ + 2; z++) {
        const isWindow = (x === -155 || Math.abs(z - centerZ) === 2);
        this.setBlock(x, 7, z, isWindow ? 'cyber_glass' : 'quartz_block');
        this.setBlock(x, 8, z, 'quartz_block'); // Bridge roof
      }
    }
    // Radar Mast & Exhaust Funnel
    this.setBlock(-156, 9, centerZ, 'iron_block');
    this.setBlock(-156, 10, centerZ, 'iron_block');
    this.setBlock(-156, 11, centerZ, 'sea_lantern');
    this.setBlock(-159, 7, centerZ, 'redstone_block');
    this.setBlock(-159, 8, centerZ, 'coal_block'); // Funnel

    // E. Interactive Plaque
    this.setBlock(-135, 2, centerZ - 6, 'iron_block', {
      type: 'sign',
      title: 'Grand Maritime Canal · Lock #1 & M/V EVER GLORY 🚢⚓',
      text: 'A deep-water inter-oceanic canal connecting the Western Seas. Features heavy quayside gantry cranes, motorized lock gates, and the 39-meter Panamax container freighter EVER GLORY carrying 120 TEU of global cargo.'
    });
  }

  // 5. CERN High-Energy Linear Supercollider & Particle Physics Complex (X in [105, 185], Z in [-174, -166])
  private buildHyperColliderResearchFacility() {
    const startX = 105;
    const endX = 185;
    const centerZ = -170;
    const beamY = 2;

    // A. 80-Block Long Linear Accelerator (LINAC) Beamline Tube
    for (let x = startX; x <= endX; x++) {
      // Beam Enclosure Trench & Heavy Foundation
      this.setBlock(x, 0, centerZ, 'obsidian');
      this.setBlock(x, 0, centerZ - 1, 'stone_bricks');
      this.setBlock(x, 0, centerZ + 1, 'stone_bricks');

      // Superconducting Beam Core (Continuous Relativistic Particle Beam!)
      this.setBlock(x, beamY, centerZ, (x % 5 === 0) ? 'beacon' : 'sea_lantern');

      // Cryogenic Vacuum Jacket & Inspection Windows
      this.setBlock(x, beamY + 1, centerZ, 'obsidian');
      this.setBlock(x, beamY - 1, centerZ, 'obsidian');
      this.setBlock(x, beamY, centerZ - 1, (x % 3 === 0) ? 'cyber_glass' : 'iron_block');
      this.setBlock(x, beamY, centerZ + 1, (x % 3 === 0) ? 'cyber_glass' : 'iron_block');

      // Superconducting Quadrupole Magnet Rings every 4 blocks
      if (x % 4 === 0) {
        for (let dx = 0; dx <= 1; dx++) {
          const ringBlock = (x % 8 === 0) ? 'amethyst_block' : 'lapis_block';
          this.setBlock(x + dx, beamY + 1, centerZ - 1, ringBlock);
          this.setBlock(x + dx, beamY + 1, centerZ + 1, ringBlock);
          this.setBlock(x + dx, beamY - 1, centerZ - 1, ringBlock);
          this.setBlock(x + dx, beamY - 1, centerZ + 1, ringBlock);
          this.setBlock(x + dx, beamY + 2, centerZ, 'prismarine_bricks');
        }
      }

      // Elevated Inspection Walkway flanking the LINAC
      this.setBlock(x, 1, centerZ - 2, 'smooth_stone');
      this.setBlock(x, 1, centerZ + 2, 'smooth_stone');
      if (x % 6 === 0) {
        this.setBlock(x, 2, centerZ - 2, 'iron_block');
        this.setBlock(x, 3, centerZ - 2, 'lantern');
        this.setBlock(x, 2, centerZ + 2, 'iron_block');
        this.setBlock(x, 3, centerZ + 2, 'lantern');
      }
    }

    // B. Massive Cylindrical High-Energy Particle Detector Chamber (ATLAS/CMS Scale, X in [175, 184])
    const detX = 179;
    const detRadius = 4;
    for (let x = detX - 4; x <= detX + 4; x++) {
      for (let dy = -detRadius; dy <= detRadius; dy++) {
        for (let dz = -detRadius; dz <= detRadius; dz++) {
          const d = Math.hypot(dy, dz);
          const y = beamY + dy;
          if (y < 1) continue;

          if (d <= 1.2) {
            // Inner Silicon Micro-Vertex Tracker
            this.setBlock(x, y, centerZ + dz, 'diamond_block');
          } else if (d <= 2.2) {
            // Electromagnetic Calorimeter (ECAL)
            this.setBlock(x, y, centerZ + dz, 'gold_block');
          } else if (d <= 3.2) {
            // Hadronic Calorimeter (HCAL)
            this.setBlock(x, y, centerZ + dz, 'amethyst_block');
          } else if (d <= 4.2) {
            // Outer Toroidal Muon Spectrometer Magnet Yoke
            this.setBlock(x, y, centerZ + dz, (x === detX - 4 || x === detX + 4 || d >= 3.8) ? 'lapis_block' : 'obsidian');
          }
        }
      }
    }
    // Detector High-Voltage Strobe Indicators
    this.setBlock(detX, beamY + detRadius + 1, centerZ, 'sea_lantern');
    this.setBlock(detX, beamY + detRadius + 2, centerZ, 'beacon');

    // C. Science Pavilion & Underground Collider Control Center (X in [106, 115])
    const ctrlX = 110;
    for (let x = ctrlX - 4; x <= ctrlX + 4; x++) {
      for (let z = centerZ - 4; z <= centerZ + 4; z++) {
        this.setBlock(x, 1, z, 'quartz_block'); // Cleanroom floor
        const isWall = (x === ctrlX - 4 || x === ctrlX + 4 || z === centerZ - 4 || z === centerZ + 4);
        if (isWall) {
          for (let y = 2; y <= 5; y++) {
            this.setBlock(x, y, z, (y === 3 || y === 4) ? 'cyber_glass' : 'quartz_pillar');
          }
        }
        this.setBlock(x, 6, z, 'quartz_block'); // Roof
      }
    }
    // Mainframe Supercomputing Cluster & Holographic Workstations
    for (let z = centerZ - 2; z <= centerZ + 2; z++) {
      this.setBlock(ctrlX - 3, 2, z, 'bookshelf');
      this.setBlock(ctrlX - 3, 3, z, 'iron_block');
      this.setBlock(ctrlX - 3, 4, z, 'redstone_block'); // Active CPU blinkers
    }
    this.setBlock(ctrlX, 2, centerZ - 2, 'smooth_stone');
    this.setBlock(ctrlX, 3, centerZ - 2, 'cyber_glass'); // Control monitor
    this.setBlock(ctrlX, 2, centerZ + 2, 'smooth_stone');
    this.setBlock(ctrlX, 3, centerZ + 2, 'cyber_glass');

    // Cryogenic Liquid Helium Storage Tanks
    for (const [tx, tz] of [[ctrlX - 2, centerZ + 5], [ctrlX + 2, centerZ + 5]]) {
      for (let y = 1; y <= 4; y++) {
        this.setBlock(tx, y, tz, 'iron_block');
      }
      this.setBlock(tx, 5, tz, 'ice');
    }

    // D. Interactive Information Plaque
    this.setBlock(ctrlX + 2, 2, centerZ - 4, 'diamond_block', {
      type: 'sign',
      title: 'CERN Hyper-Collider & Linear Accelerator ⚛️🔬',
      text: 'An 80-meter cryogenic particle accelerator facility. Features superconducting quadrupole magnets, relativistic positron-electron beamline, and an 8-meter hermetic particle detector probing the fundamental laws of the universe.'
    });
  }
}



