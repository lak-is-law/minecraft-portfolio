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
    this.buildFortniteIslandTerrain();
    this.buildRoadsAndBridges();
    this.buildCrossroadsCitadel();
    this.buildNeoYorkCity();
    this.buildImperialRajComplex();
    this.buildSakuraSanctuary();
    this.buildPuebloRoyale();
    this.buildSunsetSaloonAndBar();
    this.buildPalmBeachAndOcean();
    this.buildFrostpeakMountains();
    this.buildNatureAndFlora();
  }

  // 1. Organic Circular Island Coastline with Surrounding Ocean
  private buildFortniteIslandTerrain() {
    const min = -136;
    const max = 136;

    for (let x = min; x <= max; x++) {
      for (let z = min; z <= max; z++) {
        // Indestructible bedrock foundation at Y = -2
        this.setBlock(x, -2, z, 'bedrock');

        const dist = Math.hypot(x, z);
        const angle = Math.atan2(z, x);
        // Organic shoreline radius: base 112 with sin/cos organic natural variations
        const coastR = 112 + Math.sin(angle * 5) * 5 + Math.cos(angle * 3) * 4;

        if (dist > coastR) {
          // Open Ocean waters
          this.setBlock(x, -1, z, 'sand');
          this.setBlock(x, 0, z, 'water');
          // World perimeter boundary fence at edge
          if (Math.abs(x) === 135 || Math.abs(z) === 135) {
            this.setBlock(x, 1, z, 'glass');
            this.setBlock(x, 2, z, 'glass');
          }
        } else if (dist > coastR - 8) {
          // Sloping Sand Beach shoreline
          this.setBlock(x, -1, z, 'sand');
          this.setBlock(x, 0, z, 'sand');
        } else {
          // Main Island Landmass
          // Sub-surface layer at Y = -1
          if (x <= -35 && z >= 8 && z <= 75) {
            this.setBlock(x, -1, z, 'red_sandstone');
          } else if (x >= 45 && Math.abs(z) <= 45) {
            this.setBlock(x, -1, z, 'stone_bricks');
          } else if (x >= 25 && z <= -55) {
            this.setBlock(x, -1, z, 'stone_bricks');
          } else if (z >= 55) {
            this.setBlock(x, -1, z, 'sand');
          } else if (Math.abs(x) <= 35 && z <= -65) {
            this.setBlock(x, -1, z, 'stone');
          } else {
            this.setBlock(x, -1, z, 'dirt');
          }

          // Surface layer at Y = 0
          const cDist = Math.hypot(x, z);
          if (cDist >= 18 && cDist <= 23) {
            // Citadel Moat water ring
            this.setBlock(x, 0, z, 'water');
          } else if (cDist < 18) {
            // Citadel Plaza floor
            if (cDist < 4) {
              this.setBlock(x, 0, z, 'quartz_block');
            } else if (Math.abs(x) <= 1 || Math.abs(z) <= 1) {
              this.setBlock(x, 0, z, 'smooth_stone');
            } else {
              this.setBlock(x, 0, z, 'stone_bricks');
            }
          } else if (Math.abs(x) <= 35 && z <= -65) {
            // North: Frostpeak Mountains
            this.setBlock(x, 0, z, 'snow_grass');
          } else if (x <= -25 && z <= -45) {
            // Northwest: Sakura Sanctuary
            this.setBlock(x, 0, z, 'grass');
          } else if (x >= 25 && z <= -55) {
            // Northeast: Imperial Raj Complex
            this.setBlock(x, 0, z, (Math.abs(x - 55) <= 5 && z >= -86 && z <= -66) ? 'water' : 'red_sandstone');
          } else if (x <= -35 && z >= 8 && z <= 75) {
            // West: Pueblo Royale
            this.setBlock(x, 0, z, ((x + z) % 7 === 0) ? 'sand' : 'terracotta_adobe');
          } else if (x >= 45 && z >= -35 && z <= 45) {
            // East: Neo York Tech Metropolis
            this.setBlock(x, 0, z, (x >= 78 && x <= 85) ? 'asphalt_road' : 'stone_bricks');
          } else if (z >= 55) {
            // South: Sunset Coast & Beach
            this.setBlock(x, 0, z, 'sand');
          } else {
            // Central Heartland Plains
            this.setBlock(x, 0, z, 'grass');
          }
        }
      }
    }
  }

  // 2. Arterial Roads and Moat Bridges Linking Citadel to All POIs
  private buildRoadsAndBridges() {
    // Four 4-block wide stone bridges spanning the Citadel moat
    // North Bridge (Z = -23 to -18)
    for (let x = -2; x <= 2; x++) {
      for (let z = -23; z <= -18; z++) {
        this.setBlock(x, 0, z, 'stone_bricks');
        this.setBlock(x, 1, z, 'stone_bricks');
        if (Math.abs(x) === 2) {
          this.setBlock(x, 2, z, 'stone_bricks');
          if (z === -23 || z === -18) {
            this.setBlock(x, 3, z, 'glowstone');
          }
        }
      }
    }

    // South Bridge (Z = 18 to 23)
    for (let x = -2; x <= 2; x++) {
      for (let z = 18; z <= 23; z++) {
        this.setBlock(x, 0, z, 'stone_bricks');
        this.setBlock(x, 1, z, 'stone_bricks');
        if (Math.abs(x) === 2) {
          this.setBlock(x, 2, z, 'stone_bricks');
          if (z === 18 || z === 23) {
            this.setBlock(x, 3, z, 'glowstone');
          }
        }
      }
    }

    // East Bridge (X = 18 to 23)
    for (let z = -2; z <= 2; z++) {
      for (let x = 18; x <= 23; x++) {
        this.setBlock(x, 0, z, 'stone_bricks');
        this.setBlock(x, 1, z, 'stone_bricks');
        if (Math.abs(z) === 2) {
          this.setBlock(x, 2, z, 'stone_bricks');
          if (x === 18 || x === 23) {
            this.setBlock(x, 3, z, 'glowstone');
          }
        }
      }
    }

    // West Bridge (X = -23 to -18)
    for (let z = -2; z <= 2; z++) {
      for (let x = -23; x <= -18; x++) {
        this.setBlock(x, 0, z, 'stone_bricks');
        this.setBlock(x, 1, z, 'stone_bricks');
        if (Math.abs(z) === 2) {
          this.setBlock(x, 2, z, 'stone_bricks');
          if (x === -23 || x === -18) {
            this.setBlock(x, 3, z, 'glowstone');
          }
        }
      }
    }

    // East Highway to Neo York (X = 24 to 55, Z in [-2, 2])
    for (let x = 24; x <= 55; x++) {
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

    // West Desert Road to Pueblo Royale (X = -24 to -50)
    for (let x = -24; x >= -50; x--) {
      const zCenter = Math.round(35 * ((Math.abs(x) - 24) / 26));
      for (let dz = -2; dz <= 2; dz++) {
        this.setBlock(x, 1, zCenter + dz, 'red_sandstone');
      }
    }

    // North Road to Frostpeaks and Raj (Z = -24 to -65, X in [-2, 2])
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

    // Northeast Causeway branch to Taj Mahal (From X=2 to 45, Z=-60 to -85)
    for (let step = 0; step <= 25; step++) {
      const px = 2 + Math.round(step * 1.6);
      const pz = -60 - Math.round(step * 1.0);
      for (let dx = -1; dx <= 1; dx++) {
        this.setBlock(px + dx, 1, pz, 'quartz_block');
      }
    }

    // Northwest Mountain Path branch to Sakura Sanctuary (From X=-2 to -50, Z=-55 to -75)
    for (let step = 0; step <= 25; step++) {
      const px = -2 - Math.round(step * 1.8);
      const pz = -55 - Math.round(step * 0.8);
      for (let dx = -1; dx <= 1; dx++) {
        this.setBlock(px + dx, 1, pz, 'oak_planks');
      }
    }

    // South Wooden Boardwalk to Sunset Saloon & Beach (Z = 24 to 125, X in [-2, 2])
    for (let z = 24; z <= 125; z++) {
      for (let x = -2; x <= 2; x++) {
        this.setBlock(x, 1, z, 'oak_planks');
      }
      if (z % 10 === 0) {
        this.setBlock(-3, 2, z, 'oak_log');
        this.setBlock(-3, 3, z, 'glowstone');
        this.setBlock(3, 2, z, 'oak_log');
        this.setBlock(3, 3, z, 'glowstone');
      }
    }
  }

  // 3. Crossroads Citadel (Central Drop-in Nexus)
  private buildCrossroadsCitadel() {
    // Circular Plaza Elevation (R <= 17, Y = 1 to 2)
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

    // Central Compass Rose & 3-Tier Fountain (X in [-4, 4], Z in [-4, 4])
    for (let x = -4; x <= 4; x++) {
      for (let z = -4; z <= 4; z++) {
        const dist = Math.max(Math.abs(x), Math.abs(z));
        if (dist === 4) {
          this.setBlock(x, 2, z, 'quartz_block');
        } else if (dist === 0) {
          // Central fountain spire & Beacon
          this.setBlock(0, 1, 0, 'diamond_block', { type: 'teleport' });
          this.setBlock(0, 2, 0, 'beacon', { type: 'teleport' });
          this.setBlock(0, 3, 0, 'water');
          this.setBlock(0, 4, 0, 'glowstone');
        } else {
          this.setBlock(x, 2, z, 'water');
        }
      }
    }

    // Compass Rose inlays
    for (let d = 5; d <= 12; d++) {
      this.setBlock(0, 1, -d, 'quartz_block'); // North
      this.setBlock(0, 1, d, 'quartz_block');  // South
      this.setBlock(d, 1, 0, 'quartz_block');  // East
      this.setBlock(-d, 1, 0, 'quartz_block'); // West
    }

    // Central Citadel Signposts
    this.setBlock(2, 2, 2, 'oak_log');
    this.setBlock(2, 3, 2, 'oak_planks', {
      type: 'sign',
      title: 'Crossroads Citadel Hub',
      text: 'North: Frostpeaks & Imperial Raj Mahal\nEast: Neo York & Lak Tower\nWest: Pueblo Royale & Arena\nSouth: Sunset Saloon, Palm Beach & Merlion'
    });
    this.setBlock(2, 4, 2, 'lantern');

    // Skills & Alchemy Matrix Pavilion (Citadel South: X in [-8, 8], Z in [9, 15])
    for (let x = -8; x <= 8; x++) {
      for (let z = 9; z <= 15; z++) {
        this.setBlock(x, 1, z, 'quartz_block');
        // Pillars at corners and perimeter
        if ((Math.abs(x) === 8 || Math.abs(x) === 0) && (z === 9 || z === 15)) {
          for (let y = 2; y <= 5; y++) {
            this.setBlock(x, y, z, 'quartz_pillar');
          }
        }
        // Roof
        this.setBlock(x, 6, z, 'quartz_block');
      }
    }
    // Bookshelves, Enchanting Table, and Alchemy lecterns
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

  // 4. Neo York High-Tech Metropolis (East POI)
  private buildNeoYorkCity() {
    // Broadway Avenue: X in [78, 85], Z in [-32, 32]
    for (let x = 78; x <= 85; x++) {
      for (let z = -32; z <= 32; z++) {
        this.setBlock(x, 1, z, 'asphalt_road');
        // White dashed center line along X = 81
        if (x === 81 && Math.abs(z) % 4 <= 1) {
          this.setBlock(x, 1, z, 'smooth_stone');
        }
      }
    }

    // Sidewalks along Broadway
    for (let z = -32; z <= 32; z++) {
      for (let x = 75; x <= 77; x++) {
        this.setBlock(x, 1, z, 'stone_bricks');
      }
      for (let x = 86; x <= 88; x++) {
        this.setBlock(x, 1, z, 'stone_bricks');
      }
      // Streetlamps along curb
      if (Math.abs(z) % 8 === 0) {
        this.setBlock(77, 2, z, 'iron_block');
        this.setBlock(77, 3, z, 'iron_block');
        this.setBlock(77, 4, z, 'glowstone');

        this.setBlock(86, 2, z, 'iron_block');
        this.setBlock(86, 3, z, 'iron_block');
        this.setBlock(86, 4, z, 'glowstone');
      }
    }

    // Cross Street at Z in [-2, 2], X in [55, 108]
    for (let x = 55; x <= 108; x++) {
      for (let z = -2; z <= 2; z++) {
        this.setBlock(x, 1, z, 'asphalt_road');
      }
    }

    // Skyscraper 1: AI & Applied Research Tower (X in [58, 72], Z in [-26, -8])
    const h1 = 32;
    for (let x = 58; x <= 72; x++) {
      for (let z = -26; z <= -8; z++) {
        const isPerimeter = (x === 58 || x === 72 || z === -26 || z === -8);
        const isCorner = (x === 58 || x === 72) && (z === -26 || z === -8);

        for (let y = 1; y <= h1; y++) {
          if (isCorner) {
            this.setBlock(x, y, z, 'stone_bricks');
          } else if (isPerimeter) {
            if (y === 1 && x === 72 && (z === -17 || z === -16)) {
              // Entrance glass doors
              this.setBlock(x, y, z, 'cyber_glass');
            } else if (y % 4 === 0) {
              this.setBlock(x, y, z, 'stone_bricks');
            } else {
              this.setBlock(x, y, z, 'cyber_glass');
            }
          }
        }
        // Hollow interior floors every 8 levels
        this.setBlock(x, 1, z, 'smooth_stone');
        this.setBlock(x, 8, z, 'smooth_stone');
        this.setBlock(x, 16, z, 'smooth_stone');
        this.setBlock(x, 24, z, 'smooth_stone');
        this.setBlock(x, h1, z, 'smooth_stone');
      }
    }
    // AI Research Terminal inside Lobby
    this.setBlock(65, 2, -17, 'crafting_table', { type: 'research', id: 'res-ai' });
    this.setBlock(65, 3, -17, 'bookshelf', { type: 'research', id: 'res-ai' });
    this.setBlock(63, 2, -17, 'iron_block');
    this.setBlock(63, 3, -17, 'lamp_on');
    this.setBlock(67, 2, -17, 'iron_block');
    this.setBlock(67, 3, -17, 'lamp_on');

    // Communications Antenna atop Skyscraper 1
    for (let y = h1 + 1; y <= h1 + 8; y++) {
      this.setBlock(65, y, -17, 'iron_block');
    }
    this.setBlock(65, h1 + 9, -17, 'glowstone');

    // Skyscraper 2: High-Tech Corporate Tower (X in [58, 72], Z in [8, 26])
    const h2 = 26;
    for (let x = 58; x <= 72; x++) {
      for (let z = 8; z <= 26; z++) {
        const isPerimeter = (x === 58 || x === 72 || z === 8 || z === 26);
        const isCorner = (x === 58 || x === 72) && (z === 8 || z === 26);

        for (let y = 1; y <= h2; y++) {
          if (isCorner) {
            this.setBlock(x, y, z, 'iron_block');
          } else if (isPerimeter) {
            if (y % 3 === 0) {
              this.setBlock(x, y, z, 'iron_block');
            } else {
              this.setBlock(x, y, z, 'cyber_glass');
            }
          }
        }
        this.setBlock(x, 1, z, 'smooth_stone');
        this.setBlock(x, 13, z, 'smooth_stone');
        this.setBlock(x, h2, z, 'smooth_stone');
      }
    }
    // Executive Suite in Lobby with DAA and GenoSpark credentials
    this.setBlock(65, 2, 17, 'bookshelf', { type: 'experience', id: 'exp-genospark' });
    this.setBlock(65, 3, 17, 'glowstone', { type: 'experience', id: 'exp-genospark' });
    this.setBlock(67, 2, 17, 'bookshelf', { type: 'experience', id: 'exp-daa' });
    this.setBlock(67, 3, 17, 'gold_block', { type: 'experience', id: 'exp-daa' });

    // Rooftop Helipad on Skyscraper 2
    for (let x = 62; x <= 68; x++) {
      for (let z = 14; z <= 20; z++) {
        this.setBlock(x, h2, z, 'stone_bricks');
      }
    }
    // Yellow "H" on helipad
    for (let z = 15; z <= 19; z++) {
      this.setBlock(63, h2, z, 'gold_block');
      this.setBlock(67, h2, z, 'gold_block');
    }
    this.setBlock(64, h2, 17, 'gold_block');
    this.setBlock(65, h2, 17, 'gold_block');
    this.setBlock(66, h2, 17, 'gold_block');

    // Skyscraper 3: Times Square Media Wall (X in [88, 93], Z in [-26, 26])
    const h3 = 18;
    for (let x = 88; x <= 93; x++) {
      for (let z = -26; z <= 26; z++) {
        const isPerimeter = (x === 88 || x === 93 || z === -26 || z === 26);
        for (let y = 1; y <= h3; y++) {
          if (isPerimeter) {
            this.setBlock(x, y, z, (y % 4 === 0) ? 'stone_bricks' : 'cyber_glass');
          }
        }
        this.setBlock(x, 1, z, 'smooth_stone');
        this.setBlock(x, h3, z, 'smooth_stone');
      }
    }

    // Times Square Interactive Project Pedestals along Broadway Sidewalk
    const projectPedestals = [
      { id: 'todar', z: -20, block: 'emerald_block' },
      { id: 'trackyourflight', z: -10, block: 'diamond_block' },
      { id: 'locateart', z: 0, block: 'gold_block' },
      { id: 'redgambit', z: 10, block: 'redstone_block' },
      { id: 'spiderverse', z: 20, block: 'amethyst_block' }
    ];

    projectPedestals.forEach(p => {
      // Pedestal base
      this.setBlock(84, 1, p.z, 'smooth_stone');
      this.setBlock(84, 2, p.z, p.block, { type: 'project', id: p.id });
      this.setBlock(84, 3, p.z, 'glowstone', { type: 'project', id: p.id });
    });

    // Lak Tower ("LK" Monument Wonder: 55 blocks tall Eiffel-style marvel)
    // Centered at X = 98, Z = 0
    this.buildLakTower(98, 0);
  }

  // Eiffel Tower Inspired Wonder with LK Monogram
  private buildLakTower(cx: number, cz: number) {
    // 4 Corner Legs arching inward (Y = 1 to 16)
    const legOffsets = [
      { dx: -4, dz: -4 },
      { dx: 4, dz: -4 },
      { dx: -4, dz: 4 },
      { dx: 4, dz: 4 }
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

    // Lower Observation Deck at Y = 16 (X in [cx-4, cx+4], Z in [cz-4, cz+4])
    for (let x = cx - 4; x <= cx + 4; x++) {
      for (let z = cz - 4; z <= cz + 4; z++) {
        this.setBlock(x, 16, z, 'iron_block');
        if (Math.abs(x - cx) === 4 || Math.abs(z - cz) === 4) {
          this.setBlock(x, 17, z, 'stone_bricks'); // Railing
        }
      }
    }

    // Glowing "L" and "K" Monograms on West Face of Observation Deck
    // "L" Monogram at cz - 2
    for (let y = 18; y <= 23; y++) {
      this.setBlock(cx - 4, y, cz - 2, 'glowstone');
    }
    this.setBlock(cx - 4, 18, cz - 1, 'glowstone');

    // "K" Monogram at cz + 2
    for (let y = 18; y <= 23; y++) {
      this.setBlock(cx - 4, y, cz + 1, 'glowstone');
    }
    this.setBlock(cx - 4, 21, cz + 2, 'glowstone');
    this.setBlock(cx - 4, 23, cz + 3, 'glowstone');
    this.setBlock(cx - 4, 19, cz + 3, 'glowstone');

    // Middle Tapering Lattice Shaft (Y = 17 to 36)
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

    // Upper Skydeck Platform at Y = 36
    for (let x = cx - 2; x <= cx + 2; x++) {
      for (let z = cz - 2; z <= cz + 2; z++) {
        this.setBlock(x, 36, z, 'gold_block');
      }
    }

    // Soaring Needle Spire (Y = 37 to 55)
    for (let y = 37; y <= 55; y++) {
      this.setBlock(cx, y, cz, (y % 4 === 0) ? 'glowstone' : 'iron_block');
    }
    // Beacon Top
    this.setBlock(cx, 56, cz, 'beacon');
  }

  // 5. Imperial Raj Complex & The Grand Taj Mahal (Northeast POI)
  private buildImperialRajComplex() {
    const cx = 55;
    const cz = -100;

    // Raised Grand Quartz Plinth (X in [42, 68], Z in [-112, -88], Y = 1 to 3)
    for (let x = 42; x <= 68; x++) {
      for (let z = -112; z <= -88; z++) {
        for (let y = 1; y <= 3; y++) {
          this.setBlock(x, y, z, 'quartz_block');
        }
      }
    }

    // Grand Entrance Stairs on South face of plinth
    for (let x = 51; x <= 59; x++) {
      this.setBlock(x, 1, -87, 'quartz_block');
      this.setBlock(x, 2, -87, 'quartz_block');
      this.setBlock(x, 1, -86, 'quartz_block');
    }

    // Taj Mahal Main Mausoleum (X in [47, 63], Z in [-108, -92], Y = 4 to 16)
    for (let x = 47; x <= 63; x++) {
      for (let z = -108; z <= -92; z++) {
        const isPerimeter = (x === 47 || x === 63 || z === -108 || z === -92);
        const isCorner = (x <= 49 || x >= 61) && (z <= -106 || z >= -94);

        for (let y = 4; y <= 16; y++) {
          if (isPerimeter) {
            // Cut corners for authentic octagonal profile
            if (isCorner) {
              this.setBlock(x, y, z, 'quartz_pillar');
            } else if (y >= 6 && y <= 12 && (Math.abs(x - cx) <= 2 || Math.abs(z - cz) <= 2)) {
              // Recessed Grand Iwan Arches with Gold Accents
              if (y === 12) {
                this.setBlock(x, y, z, 'gold_block');
              } else {
                this.setBlock(x, y, z, 'quartz_block');
              }
            } else {
              this.setBlock(x, y, z, 'quartz_block');
            }
          }
        }
        // Solid roof slab at Y = 16
        this.setBlock(x, 16, z, 'quartz_block');
      }
    }

    // Grand Central Bulbous Mughal Dome (Y = 17 to 28)
    const domeLevels = [
      { y: 17, r: 6 },
      { y: 18, r: 6.5 },
      { y: 19, r: 7 },
      { y: 20, r: 7 },
      { y: 21, r: 6.5 },
      { y: 22, r: 6 },
      { y: 23, r: 5 },
      { y: 24, r: 4 },
      { y: 25, r: 3 },
      { y: 26, r: 2 },
      { y: 27, r: 1 }
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
    // Gold Finial spire atop the Dome
    this.setBlock(cx, 28, cz, 'gold_block');
    this.setBlock(cx, 29, cz, 'gold_block');
    this.setBlock(cx, 30, cz, 'glowstone');

    // Four Soaring Corner Minarets
    const minaretCoords = [
      { x: 44, z: -110 },
      { x: 66, z: -110 },
      { x: 44, z: -90 },
      { x: 66, z: -90 }
    ];

    minaretCoords.forEach(m => {
      // Minaret Shaft (Y = 4 to 24)
      for (let y = 4; y <= 24; y++) {
        for (let dx = -1; dx <= 1; dx++) {
          for (let dz = -1; dz <= 1; dz++) {
            if (Math.abs(dx) + Math.abs(dz) <= 1) {
              this.setBlock(m.x + dx, y, m.z + dz, 'quartz_pillar');
            }
          }
        }
        // Balconies at Y = 11, 17, 23
        if (y === 11 || y === 17 || y === 23) {
          for (let dx = -1; dx <= 1; dx++) {
            for (let dz = -1; dz <= 1; dz++) {
              this.setBlock(m.x + dx, y, m.z + dz, 'quartz_block');
            }
          }
        }
      }
      // Golden Cupola at Y = 25
      this.setBlock(m.x, 25, m.z, 'gold_block');
      this.setBlock(m.x, 26, m.z, 'glowstone');
    });

    // Interior Cenotaph Hall with SRMIST Academic Honors
    this.setBlock(cx, 4, cz, 'quartz_block', {
      type: 'sign',
      title: 'SRMIST Academic Honors',
      text: 'B.Tech in Computer Science and Engineering (2022-2026), SRMIST Chennai. CGPA: 4.37 / 5.0. Directorate of Alumni Affairs.'
    });
    this.setBlock(cx, 5, cz, 'gold_block');

    // Grand Ceremonial Reflecting Pool (X in [51, 59], Z in [-86, -66])
    for (let x = 50; x <= 60; x++) {
      for (let z = -86; z <= -66; z++) {
        if (x === 50 || x === 60 || z === -86 || z === -66) {
          this.setBlock(x, 1, z, 'red_sandstone');
        } else {
          this.setBlock(x, 1, z, 'water');
          if (z % 5 === 0) {
            this.setBlock(x, 0, z, 'glowstone');
          }
        }
      }
    }

    // Symmetrical Cypress-style Pine Trees along reflecting pool
    for (let z = -84; z <= -68; z += 6) {
      // Left side
      this.buildCypressTree(48, 1, z);
      // Right side
      this.buildCypressTree(62, 1, z);
    }

    // Two Rajasthani Haveli Chhatris flanking the courtyard
    this.buildRajasthaniChhatri(38, 1, -76);
    this.buildRajasthaniChhatri(72, 1, -76);
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
    // 4 Corner Sandstone Pillars
    const corners = [
      { dx: -2, dz: -2 },
      { dx: 2, dz: -2 },
      { dx: -2, dz: 2 },
      { dx: 2, dz: 2 }
    ];
    for (const c of corners) {
      for (let y = baseY + 1; y <= baseY + 4; y++) {
        this.setBlock(cx + c.dx, y, cz + c.dz, 'red_sandstone');
      }
    }
    // Arched Cupola Roof
    for (let dx = -2; dx <= 2; dx++) {
      for (let dz = -2; dz <= 2; dz++) {
        this.setBlock(cx + dx, baseY + 5, cz + dz, 'red_sandstone');
      }
    }
    this.setBlock(cx, baseY + 6, cz, 'gold_block');
    this.setBlock(cx, baseY + 4, cz, 'glowstone');
  }

  // 6. Sakura Sanctuary & 4-Tier Pagoda (Northwest POI)
  private buildSakuraSanctuary() {
    // Red Torii Gate at entrance (X = -48, Z = -70)
    for (let y = 1; y <= 7; y++) {
      this.setBlock(-48, y, -73, 'red_terracotta');
      this.setBlock(-48, y, -67, 'red_terracotta');
    }
    // Crossbeams with upturned lintel
    for (let z = -75; z <= -65; z++) {
      this.setBlock(-48, 6, z, 'red_terracotta');
      this.setBlock(-48, 8, z, 'red_terracotta');
    }
    this.setBlock(-48, 5, -70, 'glowstone');

    // Zen Moon Bridge spanning tranquil Koi Pond (X in [-58, -52], Z in [-76, -72])
    for (let x = -58; x <= -52; x++) {
      const archY = (x >= -56 && x <= -54) ? 3 : 2;
      for (let z = -76; z <= -72; z++) {
        this.setBlock(x, archY, z, 'oak_planks');
        if (z === -76 || z === -72) {
          this.setBlock(x, archY + 1, z, 'red_terracotta');
        }
      }
    }
    // Pond water underneath
    for (let x = -60; x <= -50; x++) {
      for (let z = -78; z <= -70; z++) {
        if (Math.hypot(x - (-55), z - (-74)) <= 5) {
          this.setBlock(x, 0, z, 'water');
        }
      }
    }

    // 4-Tier Japanese Pagoda (Centered at X = -68, Z = -88)
    const px = -68;
    const pz = -88;
    const tiers = [
      { yStart: 1, yEnd: 6, halfW: 6 },
      { yStart: 7, yEnd: 12, halfW: 5 },
      { yStart: 13, yEnd: 17, halfW: 4 },
      { yStart: 18, yEnd: 22, halfW: 3 }
    ];

    for (const t of tiers) {
      // Pillars and walls
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

      // Flared Upturned Eave Roof at top of each tier
      const roofY = t.yEnd + 1;
      const rW = t.halfW + 1;
      for (let x = px - rW; x <= px + rW; x++) {
        for (let z = pz - rW; z <= pz + rW; z++) {
          this.setBlock(x, roofY, z, 'stone_bricks');
        }
      }
      // Upturned corners and hanging lanterns
      const roofCorners = [
        { dx: -rW, dz: -rW },
        { dx: rW, dz: -rW },
        { dx: -rW, dz: rW },
        { dx: rW, dz: rW }
      ];
      for (const rc of roofCorners) {
        this.setBlock(px + rc.dx, roofY + 1, pz + rc.dz, 'stone_bricks');
        this.setBlock(px + rc.dx, roofY - 1, pz + rc.dz, 'glowstone');
      }
    }

    // Sorin Spire atop Pagoda
    for (let y = 23; y <= 29; y++) {
      this.setBlock(px, y, pz, (y % 2 === 0) ? 'gold_block' : 'iron_block');
    }
    this.setBlock(px, 30, pz, 'glowstone');

    // Traditional Tea House & Languages Embassy (X in [-84, -74], Z in [-70, -62])
    for (let x = -84; x <= -74; x++) {
      for (let z = -70; z <= -62; z++) {
        this.setBlock(x, 1, z, 'oak_planks');
        const isPerimeter = (x === -84 || x === -74 || z === -70 || z === -62);
        for (let y = 2; y <= 5; y++) {
          if (isPerimeter) {
            this.setBlock(x, y, z, (x === -74 && z === -66) ? 'oak_planks' : 'glass');
          }
        }
        // Roof
        this.setBlock(x, 6, z, 'stone_bricks');
      }
    }
    // Languages Terminal celebrating 9 spoken languages and Korean honors
    this.setBlock(-79, 2, -66, 'crafting_table', { type: 'languages' });
    this.setBlock(-79, 3, -66, 'bookshelf', { type: 'languages' });
    this.setBlock(-77, 2, -66, 'gold_block');
    this.setBlock(-81, 2, -66, 'gold_block');

    // Custom Sakura Trees in Sanctuary Grove
    const sakuraTrees = [
      { x: -52, z: -80 },
      { x: -56, z: -92 },
      { x: -62, z: -70 },
      { x: -74, z: -76 },
      { x: -80, z: -92 },
      { x: -84, z: -80 },
      { x: -60, z: -102 },
      { x: -72, z: -104 }
    ];
    sakuraTrees.forEach(st => this.buildSakuraTree(st.x, 1, st.z));
  }

  private buildSakuraTree(cx: number, baseY: number, cz: number) {
    // Dark oak trunk
    for (let y = baseY + 1; y <= baseY + 5; y++) {
      this.setBlock(cx, y, cz, 'oak_log');
    }
    // Billowing pink crown
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
    // Scattered petal on ground
    this.setBlock(cx + 1, baseY + 1, cz + 1, 'sakura_leaves');
    this.setBlock(cx - 1, baseY + 1, cz - 1, 'sakura_leaves');
  }

  // 7. Pueblo Royale & Mexican Adobe Village (West POI)
  private buildPuebloRoyale() {
    // Village Plaza (X in [-78, -66], Z in [24, 36])
    for (let x = -78; x <= -66; x++) {
      for (let z = 24; z <= 36; z++) {
        this.setBlock(x, 1, z, 'red_sandstone');
      }
    }

    // Central Cobblestone Fountain & Well
    for (let x = -73; x <= -71; x++) {
      for (let z = 29; z <= 31; z++) {
        this.setBlock(x, 2, z, 'cobblestone');
        this.setBlock(x, 3, z, (x === -72 && z === 30) ? 'water' : 'cobblestone');
      }
    }
    this.setBlock(-72, 4, 30, 'glowstone');

    // Historic Adobe Bell Tower (X = -72, Z = 20)
    for (let y = 1; y <= 14; y++) {
      for (let dx = -1; dx <= 1; dx++) {
        for (let dz = -1; dz <= 1; dz++) {
          this.setBlock(-72 + dx, y, 20 + dz, 'terracotta_adobe');
        }
      }
      // Belfry opening
      if (y === 11 || y === 12) {
        this.setBlock(-72, y, 20, 'gold_block'); // Brass Bell
      }
    }
    this.setBlock(-72, 15, 20, 'red_sandstone');

    // 4 Stepped Adobe Pueblo Dwellings
    this.buildAdobeHouse(-84, 1, 22, 6, 6, 8);
    this.buildAdobeHouse(-86, 1, 32, 7, 6, 7);
    this.buildAdobeHouse(-64, 1, 22, 6, 5, 7);
    this.buildAdobeHouse(-62, 1, 32, 6, 6, 6);

    // Builder's Arena Minigame Courtyard (X in [-75, -48], Z in [42, 65])
    for (let x = -75; x <= -48; x++) {
      for (let z = 42; z <= 65; z++) {
        const isWall = (x === -75 || x === -48 || z === 42 || z === 65);
        if (isWall) {
          for (let y = 1; y <= 3; y++) {
            this.setBlock(x, y, z, 'terracotta_adobe');
          }
          if ((x % 6 === 0 || z % 6 === 0)) {
            this.setBlock(x, 4, z, 'glowstone');
          }
        } else {
          this.setBlock(x, 1, z, 'sand');
        }
      }
    }
    // Interactive Minigame Welcome Terminal
    this.setBlock(-62, 2, 42, 'crafting_table', { type: 'minigame' });
    this.setBlock(-62, 3, 42, 'glowstone', { type: 'minigame' });

    // Saguaro Cacti across the surrounding mesa
    const cacti = [
      { x: -92, z: 18 },
      { x: -95, z: 34 },
      { x: -90, z: 46 },
      { x: -84, z: 56 },
      { x: -78, z: 66 },
      { x: -44, z: 28 },
      { x: -42, z: 38 }
    ];
    cacti.forEach(c => this.buildSaguaroCactus(c.x, 1, c.z));
  }

  private buildAdobeHouse(bx: number, baseY: number, bz: number, w: number, d: number, h: number) {
    for (let x = bx; x < bx + w; x++) {
      for (let z = bz; z < bz + d; z++) {
        const isPerimeter = (x === bx || x === bx + w - 1 || z === bz || z === bz + d - 1);
        for (let y = baseY; y < baseY + h; y++) {
          if (isPerimeter) {
            // Doorway
            if (y <= baseY + 2 && x === bx + Math.floor(w / 2) && z === bz + d - 1) {
              continue;
            }
            // Exposed wooden vigas protruding near roofline
            if (y === baseY + h - 2 && (x % 2 === 0)) {
              this.setBlock(x, y, z, 'oak_log');
            } else {
              this.setBlock(x, y, z, 'terracotta_adobe');
            }
          }
        }
        // Flat roof terrace
        this.setBlock(x, baseY + h - 1, z, 'red_sandstone');
      }
    }
  }

  private buildSaguaroCactus(x: number, baseY: number, z: number) {
    // Tall green stem
    this.setBlock(x, baseY + 1, z, 'emerald_block');
    this.setBlock(x, baseY + 2, z, 'emerald_block');
    this.setBlock(x, baseY + 3, z, 'emerald_block');
    this.setBlock(x, baseY + 4, z, 'emerald_block');
    // Side arms
    this.setBlock(x - 1, baseY + 2, z, 'emerald_block');
    this.setBlock(x - 1, baseY + 3, z, 'emerald_block');
    this.setBlock(x + 1, baseY + 3, z, 'emerald_block');
    this.setBlock(x + 1, baseY + 4, z, 'emerald_block');
    // Red flowering cap
    this.setBlock(x, baseY + 5, z, 'redstone_block');
  }

  // 8. The Sunset Saloon & Beach Bar (South POI)
  private buildSunsetSaloonAndBar() {
    // Rustic Beachfront Timber Tavern (X in [-4, 10], Z in [52, 66])
    for (let x = -4; x <= 10; x++) {
      for (let z = 52; z <= 66; z++) {
        this.setBlock(x, 1, z, 'oak_planks');
        const isPerimeter = (x === -4 || x === 10 || z === 52 || z === 66);
        const isCorner = (x === -4 || x === 10) && (z === 52 || z === 66);

        for (let y = 2; y <= 6; y++) {
          if (isCorner) {
            this.setBlock(x, y, z, 'spruce_log');
          } else if (isPerimeter) {
            // Doorway facing South to the beach
            if (y <= 3 && (x === 2 || x === 3) && z === 66) {
              continue;
            }
            if (y === 3 && (x === -1 || x === 6)) {
              this.setBlock(x, y, z, 'glass'); // Windows
            } else {
              this.setBlock(x, y, z, 'oak_planks');
            }
          }
        }
        // Sloped gabled roof
        this.setBlock(x, 7, z, 'cobblestone');
      }
    }

    // Polished Wooden Bar Counter and Bar Stools
    for (let x = 4; x <= 8; x++) {
      this.setBlock(x, 2, 56, 'oak_planks');
      this.setBlock(x, 2, 58, 'oak_stairs');
    }
    // Potion shelves & drinks kegs
    for (let x = 4; x <= 8; x++) {
      this.setBlock(x, 3, 53, 'bookshelf');
      this.setBlock(x, 4, 53, 'glass');
    }

    // Glowing Stone Hearth & Chimney
    this.setBlock(-3, 2, 58, 'magma_block');
    this.setBlock(-3, 2, 59, 'glowstone');
    for (let y = 2; y <= 9; y++) {
      this.setBlock(-4, y, 58, 'stone_bricks');
      this.setBlock(-4, y, 59, 'stone_bricks');
    }

    // Interests & Passions Hub Terminal
    this.setBlock(0, 2, 56, 'crafting_table', { type: 'interests' });
    this.setBlock(0, 3, 56, 'bookshelf', { type: 'interests' });

    // Outdoor Seaside Deck (X in [11, 20], Z in [52, 66])
    for (let x = 11; x <= 20; x++) {
      for (let z = 52; z <= 66; z++) {
        this.setBlock(x, 1, z, 'oak_planks');
        // Perimeter railing
        if (x === 20 || z === 52 || z === 66) {
          this.setBlock(x, 2, z, 'stone_bricks');
        }
      }
    }
    // Parasol tables on deck
    this.setBlock(15, 2, 56, 'oak_fence');
    this.setBlock(15, 3, 56, 'oak_fence');
    this.setBlock(15, 4, 56, 'gold_block'); // Yellow Parasol

    this.setBlock(15, 2, 62, 'oak_fence');
    this.setBlock(15, 3, 62, 'oak_fence');
    this.setBlock(15, 4, 62, 'gold_block');
  }

  // 9. Palm Paradise Beach, Wooden Pier & The Merlion (South Coastal POI)
  private buildPalmBeachAndOcean() {
    // Ancient Resume Chest at X = 0, Z = 88
    this.setBlock(0, 2, 88, 'gold_block', { type: 'chest' });
    this.setBlock(0, 3, 88, 'glowstone', { type: 'chest' });

    // Leadership EMCEE Pavilion (X in [-18, -6], Z in [80, 92])
    for (let x = -18; x <= -6; x++) {
      for (let z = 80; z <= 92; z++) {
        this.setBlock(x, 2, z, 'quartz_block');
        if ((x === -18 || x === -6) && (z === 80 || z === 92)) {
          for (let y = 3; y <= 6; y++) {
            this.setBlock(x, y, z, 'quartz_pillar');
          }
        }
        this.setBlock(x, 7, z, 'quartz_block');
      }
    }
    // Stage Podium
    this.setBlock(-12, 3, 86, 'gold_block', { type: 'leadership', id: 'exp-emcee' });
    this.setBlock(-12, 4, 86, 'glowstone', { type: 'leadership', id: 'exp-emcee' });

    // Boardwalk Fishing Pier extending 28 blocks out to sea (X in [1, 5], Z in [98, 126])
    for (let z = 98; z <= 126; z++) {
      for (let x = 1; x <= 5; x++) {
        this.setBlock(x, 1, z, 'oak_planks');
        if (x === 1 || x === 5) {
          this.setBlock(x, 2, z, 'stone_bricks');
        }
      }
      if (z % 8 === 0) {
        this.setBlock(1, 3, z, 'glowstone');
        this.setBlock(5, 3, z, 'glowstone');
      }
    }

    // The Singapore Merlion Statue (X = 20, Z = 110)
    // Mythical lion-headed fish statue spouting water into the ocean
    this.buildMerlionStatue(20, 110);

    // Anchored Tall-Masted Sailing Ships at Sea
    this.buildSailingShip(-36, 1, 118);
    this.buildSailingShip(42, 1, 122);

    // Tropical Coconut Palm Trees along the beach
    const palmTrees = [
      { x: -30, z: 76 },
      { x: -20, z: 74 },
      { x: -10, z: 78 },
      { x: 10, z: 75 },
      { x: 26, z: 76 },
      { x: 38, z: 80 },
      { x: -44, z: 88 },
      { x: 34, z: 96 }
    ];
    palmTrees.forEach(pt => this.buildPalmTree(pt.x, 1, pt.z));
  }

  private buildMerlionStatue(cx: number, cz: number) {
    // Fish Body rising from the sea (Y = 1 to 7)
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
    // Lion Head (Y = 8 to 12)
    for (let y = 8; y <= 12; y++) {
      for (let dx = -2; dx <= 2; dx++) {
        for (let dz = -2; dz <= 2; dz++) {
          this.setBlock(cx + dx, y, cz + dz, 'quartz_block');
        }
      }
    }
    // Lion Eyes & Crown
    this.setBlock(cx - 1, 10, cz + 2, 'gold_block');
    this.setBlock(cx + 1, 10, cz + 2, 'gold_block');
    this.setBlock(cx, 13, cz, 'gold_block');

    // Spouting Water Stream into the Ocean
    this.setBlock(cx, 10, cz + 3, 'water');
    this.setBlock(cx, 9, cz + 4, 'water');
    this.setBlock(cx, 8, cz + 5, 'water');
    this.setBlock(cx, 7, cz + 6, 'water');
    this.setBlock(cx, 6, cz + 7, 'water');
    this.setBlock(cx, 5, cz + 7, 'water');
    this.setBlock(cx, 4, cz + 7, 'water');
    this.setBlock(cx, 3, cz + 7, 'water');
    this.setBlock(cx, 2, cz + 7, 'water');
    this.setBlock(cx, 1, cz + 7, 'water');
  }

  private buildSailingShip(cx: number, baseY: number, cz: number) {
    // Ship Hull (Y = 1 to 3)
    for (let dz = -6; dz <= 6; dz++) {
      const width = Math.max(1, 3 - Math.floor(Math.abs(dz) / 2.5));
      for (let dx = -width; dx <= width; dx++) {
        this.setBlock(cx + dx, baseY + 1, cz + dz, 'oak_planks');
        if (Math.abs(dx) === width || Math.abs(dz) === 6) {
          this.setBlock(cx + dx, baseY + 2, cz + dz, 'spruce_log');
        }
      }
    }
    // Main Mast (Y = 3 to 15)
    for (let y = baseY + 3; y <= baseY + 15; y++) {
      this.setBlock(cx, y, cz, 'spruce_log');
    }
    // Billowing White Sails (Y = 7 to 13)
    for (let y = baseY + 7; y <= baseY + 13; y++) {
      const sW = (y === baseY + 10) ? 4 : 3;
      for (let dx = -sW; dx <= sW; dx++) {
        this.setBlock(cx + dx, y, cz - 1, 'quartz_block');
      }
    }
    // Crow's Nest
    this.setBlock(cx, baseY + 14, cz, 'oak_planks');
    this.setBlock(cx, baseY + 16, cz, 'glowstone');
  }

  private buildPalmTree(cx: number, baseY: number, cz: number) {
    // Curved ringed trunk
    for (let y = 1; y <= 7; y++) {
      const xOffset = Math.floor(y / 3);
      this.setBlock(cx + xOffset, baseY + y, cz, 'palm_wood');
    }
    // Tropical Palm Fronds canopy
    const topX = cx + 2;
    const topY = baseY + 8;
    this.setBlock(topX, topY, cz, 'palm_leaves');
    // Frond arms drooping
    const fronds = [
      { dx: 2, dz: 0 },
      { dx: -2, dz: 0 },
      { dx: 0, dz: 2 },
      { dx: 0, dz: -2 },
      { dx: 2, dz: 2 },
      { dx: -2, dz: -2 },
      { dx: 2, dz: -2 },
      { dx: -2, dz: 2 }
    ];
    for (const f of fronds) {
      this.setBlock(topX + f.dx, topY, cz + f.dz, 'palm_leaves');
      this.setBlock(topX + f.dx * 1.5, topY - 1, cz + f.dz * 1.5, 'palm_leaves');
    }
  }

  // 10. Frostpeak Glaciers & Mountain Overlook (North POI)
  private buildFrostpeakMountains() {
    // Stepped terraced mountain ridges (X in [-35, 35], Z in [-130, -75])
    for (let z = -130; z <= -75; z++) {
      for (let x = -35; x <= 35; x++) {
        // Natural peak contours
        const zFactor = (-75 - z) / 55; // 0 at z=-75 to 1 at z=-130
        const xFactor = 1 - Math.min(1, Math.abs(x) / 35);
        const height = Math.round(zFactor * xFactor * 26);

        if (height >= 1) {
          // Hollow shell: only set the surface block
          const blockType = (height >= 16) ? 'snow' : (height >= 8 ? 'ice' : 'snow_grass');
          this.setBlock(x, height, z, blockType);
        }
      }
    }

    // Wooden Suspension Bridge spanning chasm at Y = 18 between peaks
    for (let x = -10; x <= 10; x++) {
      this.setBlock(x, 18, -102, 'oak_planks');
      this.setBlock(x, 19, -102 + 1, 'oak_fence');
      this.setBlock(x, 19, -102 - 1, 'oak_fence');
    }

    // Mountain Overlook Summit Ledge at X = 0, Z = -92
    this.setBlock(0, 18, -92, 'stone_bricks', {
      type: 'sign',
      title: 'Frostpeak Overlook',
      text: 'Panoramic summit of the Frostpeaks realm. Gaze upon the clouds and the soaring Frost Wyrm.'
    });
    this.setBlock(0, 19, -92, 'glowstone');

    // Alpine Spruce trees along the lower slopes
    const spruces = [
      { x: -25, z: -80 },
      { x: 25, z: -80 },
      { x: -15, z: -76 },
      { x: 15, z: -76 },
      { x: -30, z: -90 },
      { x: 30, z: -90 }
    ];
    spruces.forEach(sp => this.buildCypressTree(sp.x, 3, sp.z));
  }

  // 11. Custom Nature, Wildflower Meadows, and Biome Transition Flora
  private buildNatureAndFlora() {
    // Scatter natural flowers and grass around central heartlands
    const heartlandFlowers = [
      { x: -12, z: -12, type: 'flower_rose' },
      { x: 12, z: -12, type: 'flower_dandelion' },
      { x: -12, z: 12, type: 'flower_tulip' },
      { x: 12, z: 12, type: 'flower_rose' }
    ];
    heartlandFlowers.forEach(f => {
      this.setBlock(f.x, 1, f.z, 'redstone_block'); // Vibrant floral marker
    });
  }
}
