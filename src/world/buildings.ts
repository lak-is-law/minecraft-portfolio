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
    this.buildTerrain();
    this.buildCastleMoatAndBridges();
    this.buildSpawnPlaza();
    this.buildCoronaPalace();
    this.buildExperienceBastion();
    this.buildRoyalCouncilHall();
    this.buildRoyalObservatory();
    this.buildTourneyColosseum();
    this.buildFairytaleTavern();
    this.buildDiplomaticPavilion();
    this.buildRapunzelTower();
    this.buildSundropHarborAndBeacon();
    this.buildGrandBoulevardsAndFoliage();

    // Cardinal Terrains & World Wonders
    this.buildNorthSnowyMountains();
    this.buildTajMahal(0, -118);
    this.buildActiveVolcano(-105, -25);
    this.buildMerlionStatue(18, 98);
    this.buildLakTower(98, 0);
    this.buildSouthBeachAndOcean();
    this.buildEastEmeraldValley();
    this.buildWestTheEndDimension();
  }

  // 1. Terrain: Vast 160x160 world foundation
  private buildTerrain() {
    const min = -82;
    const max = 82;

    for (let x = min; x <= max; x++) {
      for (let z = min; z <= max; z++) {
        this.setBlock(x, -1, z, 'dirt');
        this.setBlock(x, 0, z, 'grass');
      }
    }
  }

  // 2. Castle Moat & Arched Bridges (Encircling the central island)
  private buildCastleMoatAndBridges() {
    const innerR = 17;
    const outerR = 21;

    for (let x = -24; x <= 24; x++) {
      for (let z = -24; z <= 24; z++) {
        const d = Math.sqrt(x * x + z * z);
        if (d >= innerR && d <= outerR) {
          // Check if this falls on the four cardinal bridge causeways
          const isNorthBridge = Math.abs(x) <= 3 && z <= -innerR;
          const isSouthBridge = Math.abs(x) <= 3 && z >= innerR;
          const isEastBridge = Math.abs(z) <= 3 && x >= innerR;
          const isWestBridge = Math.abs(z) <= 3 && x <= -innerR;

          if (isNorthBridge || isSouthBridge || isEastBridge || isWestBridge) {
            // Arched stone bridge
            this.setBlock(x, 0, z, 'water');
            this.setBlock(x, 1, z, 'stone_bricks');
            if (Math.abs(x) === 3 || Math.abs(z) === 3) {
              this.setBlock(x, 2, z, 'mossy_stone_bricks');
              if ((x + z) % 2 === 0) {
                this.setBlock(x, 3, z, 'glowstone');
              }
            }
          } else {
            // Moat canal with water
            this.setBlock(x, 0, z, 'water');
            // Floating glowing lanterns occasionally in the water
            if ((x * 7 + z * 13) % 19 === 0) {
              this.setBlock(x, 1, z, 'glowstone');
            }
          }
        }
      }
    }
  }

  // 3. Spawn Plaza: Royal Corona Courtyard (Radius 14)
  private buildSpawnPlaza() {
    for (let x = -15; x <= 15; x++) {
      for (let z = -15; z <= 15; z++) {
        const dist = Math.sqrt(x * x + z * z);
        if (dist <= 15) {
          const isOuterBorder = Math.abs(dist - 15) < 1.0;
          let block = 'stone_bricks';
          if (isOuterBorder) {
            block = 'mossy_stone_bricks';
          } else if ((x + z) % 2 === 0) {
            block = 'cobblestone';
          }
          this.setBlock(x, 0, z, block);
        }
      }
    }

    // Golden Sundrop Sun Mosaic in the courtyard center
    for (let dx = -4; dx <= 4; dx++) {
      for (let dz = -4; dz <= 4; dz++) {
        const r = Math.sqrt(dx * dx + dz * dz);
        if (r <= 2.2) {
          this.setBlock(dx, 0, dz, 'gold_block');
        } else if (r <= 4.2 && (dx === 0 || dz === 0 || Math.abs(dx) === Math.abs(dz))) {
          this.setBlock(dx, 0, dz, 'glowstone'); // sun rays
        }
      }
    }

    // Grand Sundrop Fountain
    for (let x = -2; x <= 2; x++) {
      for (let z = -2; z <= 2; z++) {
        if (Math.abs(x) === 2 || Math.abs(z) === 2) {
          this.setBlock(x, 1, z, 'stone_bricks');
        } else {
          this.setBlock(x, 1, z, 'water');
        }
      }
    }
    this.setBlock(0, 2, 0, 'gold_block');
    this.setBlock(0, 3, 0, 'glowstone');

    // Welcome Obelisk & Sign
    this.setBlock(-4, 1, 4, 'mossy_stone_bricks');
    this.setBlock(-4, 2, 4, 'oak_planks', {
      type: 'sign',
      title: 'Welcome to the Kingdom of Lakshya',
      text: 'Explore 9 castle landmarks: Corona Palace & Tapestries (North), Experience Bastion (NE), Royal Council Hall (East), Alchemist Observatory (SE), Knights Colosseum (South), Snuggly Duckling Tavern (SW), Diplomatic Pavilion (West), Rapunzel Tower (NW), and Sundrop Harbor (Center-South). Hammer banners with your pickaxe to launch live sites.'
    });

    // Fairytale Castle Lamp Posts
    const lamps = [[-8, -8], [8, -8], [-8, 8], [8, 8], [-12, 0], [12, 0], [0, -12], [0, 12]];
    for (const [lx, lz] of lamps) {
      this.setBlock(lx, 1, lz, 'cobblestone');
      this.setBlock(lx, 2, lz, 'log');
      this.setBlock(lx, 3, lz, 'log');
      this.setBlock(lx, 4, lz, 'glowstone');
      this.setBlock(lx, 5, lz, 'purpur_block');
    }
  }

  // 4. Structure 1: Corona Palace & Grand Hall of Tapestries (North: X in [-26, 26], Z in [-76, -42])
  private buildCoronaPalace() {
    const minX = -26;
    const maxX = 26;
    const minZ = -76;
    const maxZ = -42;
    const wallHeight = 12;

    // Floor: Royal Purple & Crimson Carpet Aisle with Polished Stone Sides
    for (let x = minX; x <= maxX; x++) {
      for (let z = minZ; z <= maxZ; z++) {
        if (Math.abs(x) <= 3) {
          this.setBlock(x, 0, z, (z % 4 === 0) ? 'gold_block' : 'redstone_block');
        } else if (Math.abs(x) <= 6) {
          this.setBlock(x, 0, z, 'purpur_block');
        } else {
          this.setBlock(x, 0, z, ((x + z) % 2 === 0) ? 'stone_bricks' : 'mossy_stone_bricks');
        }
      }
    }

    // Castle Walls, Arched Flying Buttresses, and Stained Glass
    for (let x = minX; x <= maxX; x++) {
      for (let z = minZ; z <= maxZ; z++) {
        const isWall = x === minX || x === maxX || z === minZ || z === maxZ;
        if (isWall) {
          for (let y = 1; y <= wallHeight; y++) {
            // Grand Castle Portcullis Entrance on South wall
            if (z === maxZ && Math.abs(x) <= 3 && y <= 5) {
              continue;
            }

            const isPillar = (x === minX || x === maxX || x % 7 === 0) && (z === minZ || z === maxZ);
            if (isPillar) {
              this.setBlock(x, y, z, (y % 4 === 0) ? 'gold_block' : 'stone_bricks');
            } else if (y >= 5 && y <= 7 && (z === minZ || z === maxZ || x === minX || x === maxX)) {
              this.setBlock(x, y, z, 'glass');
            } else {
              this.setBlock(x, y, z, (y === 1) ? 'mossy_stone_bricks' : 'stone_bricks');
            }
          }
        }

        // Vaulted Gothic Ceiling & Skylights
        if (x > minX && x < maxX && z > minZ && z < maxZ) {
          if (Math.abs(x) <= 4) {
            this.setBlock(x, wallHeight, z, 'glass');
          } else if (x % 5 === 0) {
            this.setBlock(x, wallHeight, z, 'purpur_block');
          } else {
            this.setBlock(x, wallHeight, z, 'stone_bricks');
          }
        }
      }
    }

    // Four Soaring Fairytale Castle Corner Turrets with Conical Purple Roofs
    const cornerTurrets = [
      { cx: minX, cz: minZ },
      { cx: maxX, cz: minZ },
      { cx: minX, cz: maxZ },
      { cx: maxX, cz: maxZ }
    ];

    for (const { cx, cz } of cornerTurrets) {
      const turretHeight = 17;
      for (let dx = -2; dx <= 2; dx++) {
        for (let dz = -2; dz <= 2; dz++) {
          if (Math.abs(dx) === 2 && Math.abs(dz) === 2) continue;
          for (let y = 1; y <= turretHeight; y++) {
            this.setBlock(cx + dx, y, cz + dz, (y % 3 === 0) ? 'mossy_stone_bricks' : 'stone_bricks');
          }
        }
      }
      // Conical Fairytale Spire on Corner Turrets
      for (let sy = 0; sy <= 5; sy++) {
        const radius = Math.max(0, 2 - Math.floor(sy / 2));
        for (let dx = -radius; dx <= radius; dx++) {
          for (let dz = -radius; dz <= radius; dz++) {
            this.setBlock(cx + dx, turretHeight + 1 + sy, cz + dz, 'purpur_block');
          }
        }
      }
      this.setBlock(cx, turretHeight + 7, cz, 'gold_block');
    }

    // Grand Chandeliers
    for (const cz of [-48, -56, -64, -70]) {
      this.setBlock(0, wallHeight - 1, cz, 'log');
      this.setBlock(0, wallHeight - 2, cz, 'glowstone');
      this.setBlock(-1, wallHeight - 2, cz, 'gold_block');
      this.setBlock(1, wallHeight - 2, cz, 'gold_block');
      this.setBlock(0, wallHeight - 2, cz - 1, 'glowstone');
      this.setBlock(0, wallHeight - 2, cz + 1, 'glowstone');
    }

    // 5 Project Exhibition Shrines & Pedestals in front of North Wall
    const stations = [
      { id: 'todar', x: -20, z: -66, block: 'emerald_block', title: 'TODAR 2.0' },
      { id: 'trackyourflight', x: -10, z: -66, block: 'diamond_block', title: 'TrackYourFlight' },
      { id: 'locateart', x: 0, z: -66, block: 'gold_block', title: 'Locate Art' },
      { id: 'redgambit', x: 10, z: -66, block: 'redstone_block', title: 'Red Gambit AI' },
      { id: 'spiderverse', x: 20, z: -66, block: 'amethyst_block', title: 'Spider-Verse AR' },
    ];

    for (const s of stations) {
      // Pedestal base
      for (let dx = -1; dx <= 1; dx++) {
        for (let dz = -1; dz <= 1; dz++) {
          this.setBlock(s.x + dx, 1, s.z + dz, 'stone_bricks');
        }
      }
      // Glowing shrine pillar
      this.setBlock(s.x, 2, s.z, s.block, {
        type: 'project',
        id: s.id,
        title: s.title,
        text: `Inspecting ${s.title}. Hammer North Wall banner or press [E] to launch live deployment!`
      });
      this.setBlock(s.x, 3, s.z, 'glowstone');

      // Decorative Castle Banner Frame Pillars behind station
      this.setBlock(s.x - 3, 1, -74, 'stone_bricks');
      this.setBlock(s.x - 3, 2, -74, 'log');
      this.setBlock(s.x - 3, 3, -74, 'log');
      this.setBlock(s.x - 3, 4, -74, 'glowstone');
      this.setBlock(s.x + 3, 1, -74, 'stone_bricks');
      this.setBlock(s.x + 3, 2, -74, 'log');
      this.setBlock(s.x + 3, 3, -74, 'log');
      this.setBlock(s.x + 3, 4, -74, 'glowstone');
    }
  }

  // 5. Structure 2: Experience Castle Bastion (North-East: X in [36, 68], Z in [-64, -28])
  private buildExperienceBastion() {
    const minX = 36;
    const maxX = 68;
    const minZ = -64;
    const maxZ = -28;
    const height = 10;

    // Stone castle foundation
    for (let x = minX; x <= maxX; x++) {
      for (let z = minZ; z <= maxZ; z++) {
        this.setBlock(x, 0, z, (x % 3 === 0) ? 'mossy_stone_bricks' : 'stone_bricks');
      }
    }

    // Outer Fortress Battlements with Crenellations
    for (let x = minX; x <= maxX; x++) {
      for (let z = minZ; z <= maxZ; z++) {
        const isWall = x === minX || x === maxX || z === minZ || z === maxZ;
        if (isWall) {
          for (let y = 1; y <= height; y++) {
            // Main gatehouse facing West towards plaza
            if (x === minX && Math.abs(z - (-46)) <= 2 && y <= 4) {
              continue;
            }
            this.setBlock(x, y, z, (y % 4 === 0) ? 'mossy_stone_bricks' : 'stone_bricks');
          }
          // Crenellated Battlements on top
          if ((x + z) % 2 === 0) {
            this.setBlock(x, height + 1, z, 'stone_bricks');
          }
        }
      }
    }

    // 4 Corner Fortress Towers
    const towers = [
      [minX, minZ], [maxX, minZ], [minX, maxZ], [maxX, maxZ]
    ];
    for (const [tx, tz] of towers) {
      for (let dx = -1; dx <= 1; dx++) {
        for (let dz = -1; dz <= 1; dz++) {
          for (let y = 1; y <= height + 3; y++) {
            this.setBlock(tx + dx, y, tz + dz, 'stone_bricks');
          }
          this.setBlock(tx + dx, height + 4, tz + dz, 'purpur_block');
        }
      }
      this.setBlock(tx, height + 5, tz, 'glowstone');
    }

    // Inner Courtyard Timeline Chambers
    // 1. DAA Royal Chamber
    this.setBlock(44, 1, -54, 'gold_block');
    this.setBlock(44, 2, -54, 'chest', {
      type: 'experience',
      id: 'daa',
      title: 'Directorate of Alumni Affairs: Head of Alumni Relations',
      text: 'Led 100+ events connecting 10,000+ students with global alumni. Coordinated high-profile university summits.'
    });

    // 2. GenoSpark Armory
    this.setBlock(60, 1, -54, 'diamond_block');
    this.setBlock(60, 2, -54, 'crafting_table', {
      type: 'experience',
      id: 'genospark',
      title: 'GenoSpark: Full Stack Developer',
      text: 'Architected production full-stack modules, microservices, and earned Certificate of Excellence.'
    });

    // 3. 6Pistons Automotive Design Guild
    this.setBlock(44, 1, -38, 'iron_block');
    this.setBlock(44, 2, -38, 'crafting_table', {
      type: 'experience',
      id: '6pistons',
      title: '6Pistons: Product Designer',
      text: 'Crafted automotive UI design systems, telemetry portals, and digital cockpit experiences for Mercedes-Benz, VinFast, and Audi.'
    });

    // 4. SRMIST Academic Spire
    this.setBlock(60, 1, -38, 'emerald_block');
    this.setBlock(60, 2, -38, 'bookshelf', {
      type: 'experience',
      id: 'srmist',
      title: 'SRM Institute of Science and Technology: B.Tech CSE',
      text: 'CGPA: 4.37 / 5.0 (2022 - 2026). Specialization in Artificial Intelligence, Distributed Systems, and High-Performance Web Architecture.'
    });
  }

  // 6. Structure 3: Royal Council Great Hall (East: X in [42, 74], Z in [-8, 24])
  private buildRoyalCouncilHall() {
    const minX = 42;
    const maxX = 74;
    const minZ = -8;
    const maxZ = 24;
    const height = 11;

    for (let x = minX; x <= maxX; x++) {
      for (let z = minZ; z <= maxZ; z++) {
        this.setBlock(x, 0, z, (z % 3 === 0) ? 'mossy_stone_bricks' : 'stone_bricks');
      }
    }

    // High Gothic Walls & Arched Windows
    for (let x = minX; x <= maxX; x++) {
      for (let z = minZ; z <= maxZ; z++) {
        const isWall = x === minX || x === maxX || z === minZ || z === maxZ;
        if (isWall) {
          for (let y = 1; y <= height; y++) {
            if (x === minX && Math.abs(z - 8) <= 2 && y <= 4) {
              continue; // West entrance
            }
            if (y >= 4 && y <= 7 && (x === maxX || z === minZ || z === maxZ)) {
              this.setBlock(x, y, z, 'glass');
            } else {
              this.setBlock(x, y, z, (y === 1) ? 'mossy_stone_bricks' : 'stone_bricks');
            }
          }
        }

        // Timber Hammerbeam Ceiling
        if (x > minX && x < maxX && z > minZ && z < maxZ) {
          if (z % 4 === 0) {
            this.setBlock(x, height, z, 'log');
          } else {
            this.setBlock(x, height, z, 'oak_planks');
          }
        }
      }
    }

    // Elevated Throne Dais & EMCEE Stage at the East end
    for (let x = 66; x <= 72; x++) {
      for (let z = 3; z <= 13; z++) {
        this.setBlock(x, 1, z, 'stone_bricks');
        this.setBlock(x, 2, z, 'redstone_block'); // Royal red carpet stage
      }
    }

    // Grand EMCEE Podium
    this.setBlock(69, 3, 8, 'gold_block');
    this.setBlock(69, 4, 8, 'crafting_table', {
      type: 'leadership',
      title: 'Official University EMCEE Podium (5,000+ Attendees)',
      text: 'Official EMCEE for Directorate of Student Affairs (Sep 2024 - Feb 2026). Commanded audiences of 5,000+ attendees across national summits, inaugural galas, and cultural festivals.'
    });

    // Banquet Tables for Council Members
    for (let x = 48; x <= 62; x += 4) {
      this.setBlock(x, 1, 3, 'oak_planks');
      this.setBlock(x, 1, 13, 'oak_planks');
    }
  }

  // 7. Structure 4: Royal Alchemist Observatory (South-East: X in [38, 66], Z in [38, 66])
  private buildRoyalObservatory() {
    const cx = 52;
    const cz = 52;
    const baseRadius = 10;
    const towerRadius = 6;
    const towerHeight = 16;

    // Circular stone base terrace
    for (let dx = -baseRadius; dx <= baseRadius; dx++) {
      for (let dz = -baseRadius; dz <= baseRadius; dz++) {
        const d = Math.sqrt(dx * dx + dz * dz);
        if (d <= baseRadius) {
          this.setBlock(cx + dx, 0, cz + dz, (d > baseRadius - 1.2) ? 'mossy_stone_bricks' : 'stone_bricks');
        }
      }
    }

    // Circular Stone Observatory Tower
    for (let y = 1; y <= towerHeight; y++) {
      for (let dx = -towerRadius; dx <= towerRadius; dx++) {
        for (let dz = -towerRadius; dz <= towerRadius; dz++) {
          const d = Math.sqrt(dx * dx + dz * dz);
          if (Math.abs(d - towerRadius) < 1.0) {
            // Entrance on North-West facing spawn
            if (dx <= -towerRadius + 1 && Math.abs(dz) <= 1 && y <= 3) {
              continue;
            }
            this.setBlock(cx + dx, y, cz + dz, (y % 4 === 0) ? 'mossy_stone_bricks' : 'stone_bricks');
          }
        }
      }
    }

    // Celestial Stargazing Glass Dome on top
    for (let dy = 0; dy <= 5; dy++) {
      const r = Math.max(1, towerRadius - dy);
      for (let dx = -r; dx <= r; dx++) {
        for (let dz = -r; dz <= r; dz++) {
          const d = Math.sqrt(dx * dx + dz * dz);
          if (d <= r) {
            this.setBlock(cx + dx, towerHeight + 1 + dy, cz + dz, (dy === 5) ? 'glowstone' : 'glass');
          }
        }
      }
    }

    // Astrolabe Telescope Centerpiece
    this.setBlock(cx, 1, cz, 'gold_block');
    this.setBlock(cx, 2, cz, 'iron_block');
    this.setBlock(cx, 3, cz, 'glowstone');

    // Research Terminals
    this.setBlock(cx + 3, 1, cz, 'crafting_table', {
      type: 'research',
      title: 'Rockfall Prediction AI (Guided by Dr. Abirami G.)',
      text: 'Geological hazard early warning system utilizing spatial terrain intelligence and temporal neural nets.'
    });

    this.setBlock(cx, 1, cz + 3, 'bookshelf', {
      type: 'research',
      title: 'Distributed Telemetry & High-Throughput Streams',
      text: 'Engineered real-time flight tracking telemetry supporting 12,000+ simultaneous aircraft positions.'
    });

    this.setBlock(cx - 3, 1, cz, 'crafting_table', {
      type: 'research',
      title: 'Edge AI Financial Anomaly Detection (TODAR 2.0)',
      text: 'On-device spending anomaly prediction with client-side inference pipelines.'
    });
  }

  // 8. Structure 5: Knights Tourney Colosseum (South: X in [-26, 26], Z in [42, 76])
  private buildTourneyColosseum() {
    const minX = -26;
    const maxX = 26;
    const minZ = 42;
    const maxZ = 76;
    const cx = 0;
    const cz = 59;
    const outerR = 17;

    for (let dx = -outerR; dx <= outerR; dx++) {
      for (let dz = -outerR; dz <= outerR; dz++) {
        const d = Math.sqrt(dx * dx + dz * dz);
        if (d <= outerR) {
          const block = (d < 10) ? 'sand' : 'stone_bricks';
          this.setBlock(cx + dx, 0, cz + dz, block);
        }
      }
    }

    // Tiered Stone Arches & Spectator Pavilions
    for (let y = 1; y <= 6; y++) {
      const r = outerR - Math.floor(y / 2);
      for (let dx = -r; dx <= r; dx++) {
        for (let dz = -r; dz <= r; dz++) {
          const d = Math.sqrt(dx * dx + dz * dz);
          if (Math.abs(d - r) < 1.0) {
            // Entrance on North side
            if (dz <= -r + 1 && Math.abs(dx) <= 2 && y <= 3) {
              continue;
            }
            if (y === 6 && (dx + dz) % 3 === 0) {
              this.setBlock(cx + dx, y, cz + dz, 'purpur_block');
            } else {
              this.setBlock(cx + dx, y, cz + dz, 'stone_bricks');
            }
          }
        }
      }
    }

    // 4 Guild Elemental Bastions around the tourney ring
    const guilds = [
      { name: 'Frontend Alchemy', x: -8, z: 59, block: 'diamond_block' },
      { name: 'Backend & Systems', x: 8, z: 59, block: 'emerald_block' },
      { name: 'Applied AI', x: 0, z: 51, block: 'amethyst_block' },
      { name: 'Cloud & DevOps', x: 0, z: 67, block: 'gold_block' }
    ];

    for (const g of guilds) {
      this.setBlock(g.x, 1, g.z, g.block, {
        type: 'skills',
        title: `${g.name} Guild Bastion`,
        text: `Inspect full matrix of verified proficiencies across ${g.name}.`
      });
      this.setBlock(g.x, 2, g.z, 'glowstone');
    }
  }

  // 9. Structure 6: Snuggly Duckling Fairytale Tavern (South-West: X in [-66, -38], Z in [38, 66])
  private buildFairytaleTavern() {
    const minX = -66;
    const maxX = -38;
    const minZ = 38;
    const maxZ = 66;

    // Timber floor inside, cobblestone beer garden terrace outside
    for (let x = minX; x <= maxX; x++) {
      for (let z = minZ; z <= maxZ; z++) {
        this.setBlock(x, 0, z, (x >= -56) ? 'cobblestone' : 'oak_planks');
      }
    }

    // Half-timbered Tavern Walls
    for (let x = minX; x <= -56; x++) {
      for (let z = minZ; z <= maxZ; z++) {
        const isWall = x === minX || x === -56 || z === minZ || z === maxZ;
        if (isWall) {
          for (let y = 1; y <= 7; y++) {
            if (x === -56 && Math.abs(z - 52) <= 1 && y <= 3) {
              continue; // Doorway out to terrace
            }
            const isTimber = (x === minX || x === -56 || z === minZ || z === maxZ) && ((x + z) % 3 === 0 || y === 1 || y === 7);
            this.setBlock(x, y, z, isTimber ? 'log' : 'oak_planks');
          }
        }
        // Gabled Roof
        if (x > minX && x < -56 && z > minZ && z < maxZ) {
          this.setBlock(x, 8, z, 'purpur_block');
        }
      }
    }

    // Stone Chimney & Cozy Fireplace
    for (let y = 1; y <= 11; y++) {
      this.setBlock(-65, y, 40, 'cobblestone');
      this.setBlock(-64, y, 40, 'cobblestone');
    }
    this.setBlock(-64, 1, 41, 'glowstone');

    // Giant 8x8 Playable-Scale Stone Chessboard on the Outdoor Terrace
    const boardStartX = -54;
    const boardStartZ = 48;
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const isBlack = (r + c) % 2 === 1;
        this.setBlock(boardStartX + c, 1, boardStartZ + r, isBlack ? 'obsidian' : 'stone_bricks');
      }
    }

    this.setBlock(-50, 2, 52, 'crafting_table', {
      type: 'interests',
      title: 'Tavern Chess Arena & Strategic Systems',
      text: 'Avid Chess & Go/Baduk strategist. Engine analysis with Stockfish and KataGo.'
    });

    // Royal Automotive Design Showroom
    this.setBlock(-42, 1, 42, 'iron_block');
    this.setBlock(-42, 2, 42, 'crafting_table', {
      type: 'interests',
      title: 'Automotive Design & Telemetry Showroom',
      text: 'High-fidelity vehicle cockpit systems and telemetry displays designed for Mercedes-Benz, VinFast, and Audi.'
    });
  }

  // 10. Structure 7: Royal Diplomatic Pavilion (West: X in [-70, -42], Z in [-10, 24])
  private buildDiplomaticPavilion() {
    const minX = -70;
    const maxX = -42;
    const minZ = -10;
    const maxZ = 24;
    const cx = -56;
    const cz = 7;

    // Water garden surrounding the pagoda pavilion
    for (let x = minX; x <= maxX; x++) {
      for (let z = minZ; z <= maxZ; z++) {
        const d = Math.sqrt((x - cx) * (x - cx) + (z - cz) * (z - cz));
        if (d <= 12) {
          this.setBlock(x, 0, z, (d <= 8) ? 'stone_bricks' : 'water');
        }
      }
    }

    // Pagoda Pillars & Tiered Eaves in Purpur & Gold
    const pillars = [
      [cx - 6, cz - 6], [cx + 6, cz - 6], [cx - 6, cz + 6], [cx + 6, cz + 6],
      [cx - 6, cz], [cx + 6, cz], [cx, cz - 6], [cx, cz + 6]
    ];
    for (const [px, pz] of pillars) {
      for (let y = 1; y <= 7; y++) {
        this.setBlock(px, y, pz, (y % 3 === 0) ? 'gold_block' : 'log');
      }
    }

    // Tiered Pagoda Roof
    for (let dx = -8; dx <= 8; dx++) {
      for (let dz = -8; dz <= 8; dz++) {
        if (Math.abs(dx) <= 8 && Math.abs(dz) <= 8) {
          this.setBlock(cx + dx, 8, cz + dz, 'purpur_block');
        }
        if (Math.abs(dx) <= 5 && Math.abs(dz) <= 5) {
          this.setBlock(cx + dx, 9, cz + dz, 'purpur_block');
        }
        if (Math.abs(dx) <= 2 && Math.abs(dz) <= 2) {
          this.setBlock(cx + dx, 10, cz + dz, 'gold_block');
        }
      }
    }

    // Korean Cultural Station (1st Runner Up Republic of Korea)
    this.setBlock(cx, 1, cz, 'crafting_table', {
      type: 'languages',
      title: 'Korean (한국어) and Diplomatic Research (1st Runner-Up)',
      text: 'Awarded 1st Runner-Up at SRMIST Department of Foreign Languages 2022 representing the Republic of Korea. Certified Intermediate 1.'
    });
    this.setBlock(cx, 2, cz, 'lapis_block');
    this.setBlock(cx, 3, cz, 'redstone_block');
  }

  // 11. Structure 8: THE ICONIC RAPUNZEL TOWER (North-West: Center at X = -52, Z = -46)
  // 36+ blocks tall, mossy stone base, climbing rose vines, cantilevered timber cottage, flower balcony & spire!
  private buildRapunzelTower() {
    const cx = -52;
    const cz = -46;
    const baseRadius = 4;
    const shaftRadius = 2.5;
    const shaftTopY = 22;
    const cottageHeight = 7;
    const spireTopY = 37;

    // 1. Organic Mossy Boulders & Waterfall Stream at the base
    for (let dx = -7; dx <= 7; dx++) {
      for (let dz = -7; dz <= 7; dz++) {
        const d = Math.sqrt(dx * dx + dz * dz);
        if (d <= 7) {
          this.setBlock(cx + dx, 0, cz + dz, (d >= 4.5) ? 'water' : 'mossy_stone_bricks');
          if (d <= 5 && (dx + dz) % 3 === 0) {
            this.setBlock(cx + dx, 1, cz + dz, 'cobblestone');
          }
        }
      }
    }

    // 2. Tower Slender Shaft (Y = 1 to 22)
    for (let y = 1; y <= shaftTopY; y++) {
      for (let dx = -3; dx <= 3; dx++) {
        for (let dz = -3; dz <= 3; dz++) {
          const d = Math.sqrt(dx * dx + dz * dz);
          // Hollow cylindrical tower wall
          if (d >= shaftRadius - 0.5 && d <= shaftRadius + 0.6) {
            // Secret arch entrance at base facing South-East towards kingdom
            if (y <= 3 && dx >= 1 && dz >= 1) {
              continue;
            }
            // Window arrow slits
            if ((y === 8 || y === 15) && (dx === 0 || dz === 0)) {
              this.setBlock(cx + dx, y, cz + dz, 'glass');
            } else {
              const stone = ((y + dx + dz) % 4 === 0) ? 'mossy_stone_bricks' : 'stone_bricks';
              this.setBlock(cx + dx, y, cz + dz, stone);
            }
          }
        }
      }

      // Rapunzel Climbing Rose Vines wrapping around the tower exterior
      const angle = y * 0.45;
      const vx = Math.round(Math.cos(angle) * (shaftRadius + 1));
      const vz = Math.round(Math.sin(angle) * (shaftRadius + 1));
      this.setBlock(cx + vx, y, cz + vz, 'rose_vines');

      // Winding Interior Spiral Staircase
      const stepAngle = y * 0.75;
      const sx = Math.round(Math.cos(stepAngle) * 1.5);
      const sz = Math.round(Math.sin(stepAngle) * 1.5);
      this.setBlock(cx + sx, y, cz + sz, 'oak_planks');
      this.setBlock(cx, y, cz, 'log'); // Central wooden support pillar
    }

    // 3. Cantilevered Timber-Frame Cottage at the Top (Y = 23 to 29)
    const cottageRadius = 4;
    for (let y = shaftTopY + 1; y <= shaftTopY + cottageHeight; y++) {
      for (let dx = -cottageRadius; dx <= cottageRadius; dx++) {
        for (let dz = -cottageRadius; dz <= cottageRadius; dz++) {
          const isFloor = (y === shaftTopY + 1);
          const isCeiling = (y === shaftTopY + cottageHeight);
          const isOuterWall = Math.abs(dx) === cottageRadius || Math.abs(dz) === cottageRadius;

          if (isFloor) {
            this.setBlock(cx + dx, y, cz + dz, 'oak_planks');
          } else if (isCeiling) {
            this.setBlock(cx + dx, y, cz + dz, 'oak_planks');
          } else if (isOuterWall) {
            // Balcony opening facing South-East towards the castle
            if (dx >= 2 && dz >= 2) {
              // Balcony railing with flower boxes
              if (y === shaftTopY + 2) {
                this.setBlock(cx + dx, y, cz + dz, 'oak_planks');
                this.setBlock(cx + dx, y + 1, cz + dz, 'rose_vines');
              }
            } else {
              // Arched windows and wooden timbers
              const isCorner = Math.abs(dx) === cottageRadius && Math.abs(dz) === cottageRadius;
              if (isCorner) {
                this.setBlock(cx + dx, y, cz + dz, 'log');
              } else if (y >= shaftTopY + 3 && y <= shaftTopY + 5 && (dx === 0 || dz === 0)) {
                this.setBlock(cx + dx, y, cz + dz, 'glass');
              } else {
                this.setBlock(cx + dx, y, cz + dz, 'oak_planks');
              }
            }
          }
        }
      }
    }

    // 4. Steep Conical Fairytale Turret Spire (Y = 30 to 37)
    for (let y = shaftTopY + cottageHeight + 1; y <= spireTopY; y++) {
      const prog = (y - (shaftTopY + cottageHeight + 1)) / (spireTopY - (shaftTopY + cottageHeight + 1));
      const r = Math.max(0, Math.round((1 - prog) * (cottageRadius + 1)));
      for (let dx = -r; dx <= r; dx++) {
        for (let dz = -r; dz <= r; dz++) {
          const d = Math.sqrt(dx * dx + dz * dz);
          if (d <= r) {
            this.setBlock(cx + dx, y, cz + dz, 'prismarine_bricks');
          }
        }
      }
    }
    // Golden Spire Pinnacle & Sundrop Sun Flag
    this.setBlock(cx, spireTopY + 1, cz, 'gold_block');
    this.setBlock(cx, spireTopY + 2, cz, 'glowstone');

    // 5. Rapunzel's Studio & Creative Builder Minigame Arena inside the Top Room
    const studioY = shaftTopY + 2;
    this.setBlock(cx, studioY, cz - 2, 'crafting_table', {
      type: 'minigame',
      title: 'Rapunzel Creative Studio & Building Arena',
      text: 'Welcome to Rapunzel Soaring Tower. Like Rapunzel painting her dreams on the tower walls, equip blocks from your hotbar and construct your own fairytale sculptures, spires, and bridges.'
    });

    this.setBlock(cx - 2, studioY, cz, 'bookshelf');
    this.setBlock(cx - 2, studioY, cz - 1, 'chest');
    this.setBlock(cx, studioY, cz, 'glowstone'); // Warm glowing lantern chandelier
  }

  // 12. Structure 9: Sundrop Harbor & Beacon of Corona (Center-South: X in [-10, 10], Z in [18, 36])
  private buildSundropHarborAndBeacon() {
    const cx = 0;
    const cz = 27;

    // Harbor water pool with floating glowing lanterns
    for (let dx = -8; dx <= 8; dx++) {
      for (let dz = -6; dz <= 6; dz++) {
        const isBorder = Math.abs(dx) === 8 || Math.abs(dz) === 6;
        if (isBorder) {
          this.setBlock(cx + dx, 0, cz + dz, 'stone_bricks');
        } else {
          this.setBlock(cx + dx, 0, cz + dz, 'water');
          // Floating glowing lanterns on the water (Tangled lantern scene!)
          if ((dx + dz) % 4 === 0 && Math.abs(dx) > 1) {
            this.setBlock(cx + dx, 1, cz + dz, 'glowstone');
          }
        }
      }
    }

    // Golden Sundrop Beacon Pier
    this.setBlock(cx, 1, cz, 'gold_block');
    this.setBlock(cx, 2, cz, 'glowstone');
    for (let y = 3; y <= 60; y++) {
      this.setBlock(cx, y, cz, 'glass'); // Sky beacon beam
    }

    // Ancient Resume Chest on Royal Marble Pier
    this.setBlock(cx, 1, cz - 3, 'chest', {
      type: 'chest',
      title: 'Lakshya: Ancient Royal Resume Chest',
      text: 'Contains official verified resume PDFs and direct communication channels.'
    });

    this.setBlock(cx, 1, cz + 3, 'crafting_table', {
      type: 'sign',
      title: 'Kingdom Communications Terminal',
      text: 'Email: contact@lakshya.uk | LinkedIn: linkedin.com/in/lakshya-success | GitHub: github.com/lak-is-law | Live Resume: resume.lakshya.uk'
    });

    // Nether Portal
    for (let x = -2; x <= 2; x++) {
      this.setBlock(x, 1, cz + 5, 'obsidian');
      this.setBlock(x, 5, cz + 5, 'obsidian');
    }
    for (let y = 2; y <= 4; y++) {
      this.setBlock(-2, y, cz + 5, 'obsidian');
      this.setBlock(2, y, cz + 5, 'obsidian');
      this.setBlock(-1, y, cz + 5, 'portal');
      this.setBlock(0, y, cz + 5, 'portal');
      this.setBlock(1, y, cz + 5, 'portal');
    }
  }

  // 13. Grand Castle Avenues & Weeping Willow Trees
  private buildGrandBoulevardsAndFoliage() {
    // North Causeway towards Corona Palace
    for (let z = -14; z >= -42; z--) {
      for (let x = -2; x <= 2; x++) {
        this.setBlock(x, 0, z, ((x + z) % 2 === 0) ? 'stone_bricks' : 'cobblestone');
      }
      if (z % 8 === 0) {
        this.setBlock(-3, 1, z, 'stone_bricks');
        this.setBlock(-3, 2, z, 'log');
        this.setBlock(-3, 3, z, 'glowstone');
        this.setBlock(-3, 4, z, 'purpur_block');
        this.setBlock(3, 1, z, 'stone_bricks');
        this.setBlock(3, 2, z, 'log');
        this.setBlock(3, 3, z, 'glowstone');
        this.setBlock(3, 4, z, 'purpur_block');
      }
    }

    // South Causeway towards Colosseum
    for (let z = 14; z <= 42; z++) {
      for (let x = -2; x <= 2; x++) {
        this.setBlock(x, 0, z, ((x + z) % 2 === 0) ? 'stone_bricks' : 'cobblestone');
      }
      if (z % 8 === 0) {
        this.setBlock(-3, 1, z, 'stone_bricks');
        this.setBlock(-3, 2, z, 'log');
        this.setBlock(-3, 3, z, 'glowstone');
        this.setBlock(-3, 4, z, 'purpur_block');
        this.setBlock(3, 1, z, 'stone_bricks');
        this.setBlock(3, 2, z, 'log');
        this.setBlock(3, 3, z, 'glowstone');
        this.setBlock(3, 4, z, 'purpur_block');
      }
    }

    // East Causeway towards Council Hall
    for (let x = 14; x <= 42; x++) {
      for (let z = -2; z <= 2; z++) {
        this.setBlock(x, 0, z, ((x + z) % 2 === 0) ? 'stone_bricks' : 'cobblestone');
      }
      if (x % 8 === 0) {
        this.setBlock(x, 1, -3, 'stone_bricks');
        this.setBlock(x, 2, -3, 'log');
        this.setBlock(x, 3, -3, 'glowstone');
        this.setBlock(x, 4, -3, 'purpur_block');
        this.setBlock(x, 1, 3, 'stone_bricks');
        this.setBlock(x, 2, 3, 'log');
        this.setBlock(x, 3, 3, 'glowstone');
        this.setBlock(x, 4, 3, 'purpur_block');
      }
    }

    // West Causeway towards Diplomatic Pavilion
    for (let x = -14; x >= -42; x--) {
      for (let z = -2; z <= 2; z++) {
        this.setBlock(x, 0, z, ((x + z) % 2 === 0) ? 'stone_bricks' : 'cobblestone');
      }
      if (x % 8 === 0) {
        this.setBlock(x, 1, -3, 'stone_bricks');
        this.setBlock(x, 2, -3, 'log');
        this.setBlock(x, 3, -3, 'glowstone');
        this.setBlock(x, 4, -3, 'purpur_block');
        this.setBlock(x, 1, 3, 'stone_bricks');
        this.setBlock(x, 2, 3, 'log');
        this.setBlock(x, 3, 3, 'glowstone');
        this.setBlock(x, 4, 3, 'purpur_block');
      }
    }

    // Fairytale Weeping Willow Trees
    const trees = [
      [-22, -22], [22, -22], [-22, 22], [22, 22],
      [-32, 0], [32, 0], [0, -32], [0, 32],
      [-38, -38], [38, -38], [-38, 38], [38, 38]
    ];
    for (const [tx, tz] of trees) {
      this.buildOakTree(tx, 0, tz);
    }
  }

  private buildOakTree(x: number, groundY: number, z: number) {
    const trunkHeight = 6;
    for (let y = groundY + 1; y <= groundY + trunkHeight; y++) {
      this.setBlock(x, y, z, 'log');
    }
    for (let dy = 4; dy <= 5; dy++) {
      for (let dx = -2; dx <= 2; dx++) {
        for (let dz = -2; dz <= 2; dz++) {
          if (Math.abs(dx) === 2 && Math.abs(dz) === 2) continue;
          const y = groundY + dy;
          if (dx !== 0 || dz !== 0) {
            this.setBlock(x + dx, y, z + dz, 'leaves');
          }
        }
      }
    }
    // Weeping hanging leaves
    for (let dx = -2; dx <= 2; dx += 2) {
      for (let dz = -2; dz <= 2; dz += 2) {
        this.setBlock(x + dx, groundY + 3, z + dz, 'rose_vines');
      }
    }
    this.setBlock(x, groundY + 7, z, 'leaves');
  }

  // 14. North Snowy Mountains & Frostpeak Lookouts (Inspired by user photos 3 & 4)
  private buildNorthSnowyMountains() {
    for (let x = -55; x <= 55; x += 2) {
      for (let z = -82; z >= -135; z -= 2) {
        const distNorth = (-z - 80);
        const wave = Math.sin(x * 0.1) * 5 + Math.cos(z * 0.08) * 6;
        const height = Math.max(1, Math.min(26, Math.floor(distNorth * 0.45 + wave)));

        if (height > 0) {
          const blockType = height > 12 ? 'snow' : (height > 5 ? 'snow_grass' : 'stone_bricks');
          this.setBlock(x, height, z, blockType);
          this.setBlock(x + 1, height, z, blockType);
          this.setBlock(x, height, z - 1, blockType);
          this.setBlock(x + 1, height, z - 1, blockType);

          if (height > 4 && (x % 4 === 0 || z % 4 === 0)) {
            for (let y = 1; y < height; y += 2) {
              this.setBlock(x, y, z, 'cobblestone');
            }
          }
        }
      }
    }

    // Alpine Spruce Trees in the mountain valleys
    const spruceLocs = [
      [-30, -90], [30, -90], [-40, -105], [40, -105],
      [-20, -125], [20, -125], [-35, -128], [35, -128]
    ];
    for (const [sx, sz] of spruceLocs) {
      this.buildSpruceTree(sx, 8, sz);
    }

    // Dizzying Cliff Overlook Ledge (Recreating Photo 3)
    const ox = 0;
    const oz = -92;
    const oy = 16;
    for (let dx = -4; dx <= 4; dx++) {
      for (let dz = -3; dz <= 3; dz++) {
        this.setBlock(ox + dx, oy, oz + dz, 'oak_planks');
        if (Math.abs(dx) === 4 || dz === -3) {
          this.setBlock(ox + dx, oy + 1, oz + dz, 'cobblestone');
        }
      }
    }
    this.setBlock(ox, oy + 1, oz + 3, 'glowstone');
    this.setBlock(ox, oy + 1, oz - 2, 'stone_bricks', {
      type: 'sign',
      title: 'Frostpeak Overlook',
      text: 'Breathtaking mountain heights overlooking the clouds. Press [X] to sit and dangle your legs off the cliff into the gorge!'
    });
  }

  private buildSpruceTree(x: number, groundY: number, z: number) {
    const trunkH = 8;
    for (let y = groundY; y <= groundY + trunkH; y++) {
      this.setBlock(x, y, z, 'spruce_log');
    }
    const tiers = [
      { dy: 4, r: 3 },
      { dy: 5, r: 2 },
      { dy: 6, r: 2 },
      { dy: 7, r: 1 },
      { dy: 8, r: 1 },
      { dy: 9, r: 0 }
    ];
    for (const t of tiers) {
      for (let dx = -t.r; dx <= t.r; dx++) {
        for (let dz = -t.r; dz <= t.r; dz++) {
          if (Math.abs(dx) === t.r && Math.abs(dz) === t.r && t.r > 1) continue;
          if (dx !== 0 || dz !== 0 || t.dy > trunkH) {
            this.setBlock(x + dx, groundY + t.dy, z + dz, 'spruce_leaves');
          }
        }
      }
    }
  }

  // 15. The Taj Mahal (Wonder of the World in White Marble & Quartz)
  private buildTajMahal(cx: number, cz: number) {
    const baseY = 14;

    // Grand Raised Quartz Podium (26x26)
    for (let x = cx - 13; x <= cx + 13; x++) {
      for (let z = cz - 13; z <= cz + 13; z++) {
        this.setBlock(x, baseY, z, 'quartz_block');
        this.setBlock(x, baseY + 1, z, 'quartz_block');
      }
    }

    // 4 Soaring Corner Minarets
    const minarets = [
      [cx - 11, cz - 11], [cx + 11, cz - 11],
      [cx - 11, cz + 11], [cx + 11, cz + 11]
    ];
    for (const [mx, mz] of minarets) {
      for (let y = baseY + 2; y <= baseY + 24; y++) {
        this.setBlock(mx, y, mz, 'quartz_pillar');
      }
      for (const by of [baseY + 10, baseY + 18]) {
        for (let dx = -1; dx <= 1; dx++) {
          for (let dz = -1; dz <= 1; dz++) {
            if (dx !== 0 || dz !== 0) {
              this.setBlock(mx + dx, by, mz + dz, 'quartz_block');
            }
          }
        }
      }
      for (let dx = -1; dx <= 1; dx++) {
        for (let dz = -1; dz <= 1; dz++) {
          this.setBlock(mx + dx, baseY + 25, mz + dz, 'quartz_block');
        }
      }
      this.setBlock(mx, baseY + 26, mz, 'gold_block');
      this.setBlock(mx, baseY + 27, mz, 'glowstone');
    }

    // Main Mausoleum Sanctum (14x14)
    for (let x = cx - 7; x <= cx + 7; x++) {
      for (let z = cz - 7; z <= cz + 7; z++) {
        for (let y = baseY + 2; y <= baseY + 12; y++) {
          const isOuter = Math.abs(x - cx) === 7 || Math.abs(z - cz) === 7;
          if (isOuter) {
            const isPortal = (Math.abs(x - cx) <= 2 && (Math.abs(z - cz) === 7)) ||
                             (Math.abs(z - cz) <= 2 && (Math.abs(x - cx) === 7));
            if (isPortal && y <= baseY + 9) {
              if (y === baseY + 9 || Math.abs(x - cx) === 2 || Math.abs(z - cz) === 2) {
                this.setBlock(x, y, z, 'gold_block');
              } else {
                if (y === baseY + 2) this.setBlock(x, y, z, 'quartz_block');
              }
            } else {
              this.setBlock(x, y, z, 'quartz_block');
            }
          }
        }
      }
    }

    // Roof & Parapet
    for (let x = cx - 7; x <= cx + 7; x++) {
      for (let z = cz - 7; z <= cz + 7; z++) {
        this.setBlock(x, baseY + 12, z, 'quartz_block');
        if (Math.abs(x - cx) === 7 || Math.abs(z - cz) === 7) {
          this.setBlock(x, baseY + 13, z, (x + z) % 2 === 0 ? 'quartz_block' : 'gold_block');
        }
      }
    }

    // Central Bulbous Onion Dome (Radius 5)
    for (let dy = 0; dy <= 7; dy++) {
      const r = dy < 3 ? 4.5 : (dy < 6 ? 4.8 - (dy - 3) * 0.8 : 2.0 - (dy - 5) * 1.0);
      for (let dx = -5; dx <= 5; dx++) {
        for (let dz = -5; dz <= 5; dz++) {
          const d = Math.sqrt(dx * dx + dz * dz);
          if (d <= r && d >= r - 1.2) {
            this.setBlock(cx + dx, baseY + 13 + dy, cz + dz, 'quartz_block');
          }
        }
      }
    }

    // Golden Finial Spire
    this.setBlock(cx, baseY + 21, cz, 'gold_block');
    this.setBlock(cx, baseY + 22, cz, 'gold_block');
    this.setBlock(cx, baseY + 23, cz, 'glowstone');

    // 4 Corner Chattris (Roof Cupolas)
    const chattris = [
      [cx - 4, cz - 4], [cx + 4, cz - 4],
      [cx - 4, cz + 4], [cx + 4, cz + 4]
    ];
    for (const [chx, chz] of chattris) {
      for (let y = baseY + 13; y <= baseY + 15; y++) {
        this.setBlock(chx, y, chz, 'quartz_pillar');
      }
      this.setBlock(chx, baseY + 16, chz, 'gold_block');
      this.setBlock(chx, baseY + 17, chz, 'glowstone');
    }

    // Ceremonial Reflecting Pool stretching Southward
    for (let z = cz + 14; z <= cz + 30; z++) {
      for (let x = cx - 3; x <= cx + 3; x++) {
        const isBorder = Math.abs(x - cx) === 3;
        if (isBorder) {
          this.setBlock(x, baseY, z, 'sandstone');
          this.setBlock(x, baseY + 1, z, 'sandstone');
        } else {
          this.setBlock(x, baseY, z, 'water');
          if (z % 5 === 0 && x === cx) {
            this.setBlock(x, baseY, z, 'glowstone');
            this.setBlock(x, baseY + 1, z, 'quartz_pillar');
          }
        }
      }
    }

    // Monument Plaque
    this.setBlock(cx, baseY + 2, cz + 13, 'quartz_block', {
      type: 'sign',
      title: 'The Taj Mahal',
      text: 'Architectural wonder of the world. Handcrafted in pure white marble and quartz, flanked by 4 towering minarets and reflecting pool.'
    });
  }

  // 16. Active Volcanic Caldera & Molten Lava Falls
  private buildActiveVolcano(cx: number, cz: number) {
    const maxR = 20;
    const topY = 22;

    for (let y = 1; y <= topY; y++) {
      const r = Math.max(4, Math.floor(maxR - y * 0.7));
      for (let dx = -r; dx <= r; dx++) {
        for (let dz = -r; dz <= r; dz++) {
          const d = Math.sqrt(dx * dx + dz * dz);
          if (d <= r && d >= r - 2) {
            const isMagma = (dx + dz + y) % 3 === 0;
            this.setBlock(cx + dx, y, cz + dz, isMagma ? 'magma_block' : 'obsidian');
          }
        }
      }
    }

    // Summit Caldera Filled with Glowing Molten Lava
    for (let dx = -4; dx <= 4; dx++) {
      for (let dz = -4; dz <= 4; dz++) {
        const d = Math.sqrt(dx * dx + dz * dz);
        if (d <= 4) {
          this.setBlock(cx + dx, topY - 1, cz + dz, 'lava');
          if (dx === 0 && dz === 0) {
            this.setBlock(cx, topY, cz, 'magma_block');
          }
        }
      }
    }

    // 3 Cascading Lava Falls down the mountain slopes
    // 1. East spillway towards central realm
    for (let i = 0; i <= 14; i++) {
      const y = Math.max(1, topY - Math.floor(i * 1.4));
      this.setBlock(cx + 4 + i, y, cz, 'lava');
      this.setBlock(cx + 4 + i, y - 1, cz, 'magma_block');
      this.setBlock(cx + 4 + i, y, cz - 1, 'obsidian');
      this.setBlock(cx + 4 + i, y, cz + 1, 'obsidian');
    }
    for (let dx = 18; dx <= 23; dx++) {
      for (let dz = -3; dz <= 3; dz++) {
        this.setBlock(cx + dx, 0, cz + dz, 'obsidian');
        this.setBlock(cx + dx, 1, cz + dz, (dx + dz) % 2 === 0 ? 'lava' : 'magma_block');
      }
    }

    // 2. North spillway
    for (let i = 0; i <= 12; i++) {
      const y = Math.max(1, topY - Math.floor(i * 1.5));
      this.setBlock(cx, y, cz - 4 - i, 'lava');
      this.setBlock(cx, y - 1, cz - 4 - i, 'magma_block');
    }

    // 3. South spillway
    for (let i = 0; i <= 12; i++) {
      const y = Math.max(1, topY - Math.floor(i * 1.5));
      this.setBlock(cx, y, cz + 4 + i, 'lava');
      this.setBlock(cx, y - 1, cz + 4 + i, 'magma_block');
    }

    // Volcano Plaque
    this.setBlock(cx + 17, 2, cz + 4, 'obsidian', {
      type: 'sign',
      title: 'Mount Obsidian Caldera',
      text: 'Active volcanic mountain bordering The End dimension. Glowing magma rock fissures and cascading molten lava waterfalls.'
    });
  }

  // 17. The Singapore Merlion Statue & Water Spout
  private buildMerlionStatue(cx: number, cz: number) {
    for (let y = 1; y <= 3; y++) {
      for (let dx = -3; dx <= 3; dx++) {
        for (let dz = -3; dz <= 3; dz++) {
          if (dx * dx + dz * dz <= 9) {
            this.setBlock(cx + dx, y, cz + dz, 'stone_bricks');
          }
        }
      }
    }

    for (let y = 4; y <= 9; y++) {
      const r = 2.2 - (y - 4) * 0.15;
      for (let dx = -2; dx <= 2; dx++) {
        for (let dz = -2; dz <= 2; dz++) {
          if (dx * dx + dz * dz <= r * r) {
            this.setBlock(cx + dx, y, cz + dz, (y % 2 === 0) ? 'prismarine_bricks' : 'purpur_block');
          }
        }
      }
    }

    this.setBlock(cx, 4, cz + 3, 'prismarine_bricks');
    this.setBlock(cx, 5, cz + 4, 'prismarine_bricks');
    this.setBlock(cx - 1, 6, cz + 4, 'prismarine_bricks');
    this.setBlock(cx + 1, 6, cz + 4, 'prismarine_bricks');

    for (let y = 10; y <= 13; y++) {
      for (let dx = -2; dx <= 2; dx++) {
        for (let dz = -2; dz <= 1; dz++) {
          this.setBlock(cx + dx, y, cz + dz, 'sandstone');
        }
      }
    }

    for (let y = 10; y <= 14; y++) {
      for (let dx = -3; dx <= 3; dx++) {
        for (let dz = -1; dz <= 2; dz++) {
          if (Math.abs(dx) === 3 || dz === 2 || y === 14) {
            this.setBlock(cx + dx, y, cz + dz, 'gold_block');
          }
        }
      }
    }

    this.setBlock(cx, 11, cz - 3, 'sandstone');
    this.setBlock(cx - 1, 12, cz - 2, 'glowstone');
    this.setBlock(cx + 1, 12, cz - 2, 'glowstone');

    const spoutPoints = [
      [cx, 11, cz - 3],
      [cx, 10, cz - 4],
      [cx, 9, cz - 5],
      [cx, 7, cz - 6],
      [cx, 5, cz - 7],
      [cx, 3, cz - 8],
      [cx, 1, cz - 9],
      [cx, 0, cz - 9]
    ];
    for (const [sx, sy, sz] of spoutPoints) {
      this.setBlock(sx, sy, sz, 'water');
    }

    this.setBlock(cx - 4, 3, cz - 2, 'sandstone', {
      type: 'sign',
      title: 'The Singapore Merlion',
      text: 'Iconic national symbol of Singapore. Half lion and half fish, spouting a steady stream of water into the southern ocean.'
    });
  }

  // 18. Lak Tower (LK Monument: 55-Block Tall Eiffel Tower Inspired Wonder)
  private buildLakTower(cx: number, cz: number) {
    const baseY = 0;

    const legBases = [
      { x: cx - 8, z: cz - 8, dirX: 1, dirZ: 1 },
      { x: cx + 8, z: cz - 8, dirX: -1, dirZ: 1 },
      { x: cx - 8, z: cz + 8, dirX: 1, dirZ: -1 },
      { x: cx + 8, z: cz + 8, dirX: -1, dirZ: -1 },
    ];

    for (const leg of legBases) {
      for (let dy = 0; dy <= 16; dy++) {
        const t = dy / 16;
        const curX = Math.round(leg.x + leg.dirX * t * 4);
        const curZ = Math.round(leg.z + leg.dirZ * t * 4);

        for (let ox = -1; ox <= 1; ox++) {
          for (let oz = -1; oz <= 1; oz++) {
            this.setBlock(curX + ox, baseY + 1 + dy, curZ + oz, 'iron_block');
          }
        }
      }
    }

    for (let x = cx - 5; x <= cx + 5; x++) {
      const archH = Math.floor(10 - Math.abs(x - cx) * 1.2);
      if (archH > 0) {
        this.setBlock(x, baseY + archH, cz - 6, 'stone_bricks');
        this.setBlock(x, baseY + archH, cz + 6, 'stone_bricks');
      }
    }
    for (let z = cz - 5; z <= cz + 5; z++) {
      const archH = Math.floor(10 - Math.abs(z - cz) * 1.2);
      if (archH > 0) {
        this.setBlock(cx - 6, baseY + archH, z, 'stone_bricks');
        this.setBlock(cx + 6, baseY + archH, z, 'stone_bricks');
      }
    }

    // First Sky Observation Deck (Y = 17, 14x14)
    for (let x = cx - 7; x <= cx + 7; x++) {
      for (let z = cz - 7; z <= cz + 7; z++) {
        this.setBlock(x, baseY + 17, z, 'oak_planks');
        if (Math.abs(x - cx) === 7 || Math.abs(z - cz) === 7) {
          this.setBlock(x, baseY + 18, z, 'iron_block');
          if ((x + z) % 3 === 0) {
            this.setBlock(x, baseY + 19, z, 'glowstone');
          }
        }
      }
    }

    // Middle Lattice Tower Section (Y = 18 to 33)
    for (let y = baseY + 18; y <= baseY + 33; y++) {
      const halfW = 4;
      for (let x = cx - halfW; x <= cx + halfW; x++) {
        for (let z = cz - halfW; z <= cz + halfW; z++) {
          const isCorner = Math.abs(x - cx) === halfW && Math.abs(z - cz) === halfW;
          if (isCorner) {
            this.setBlock(x, y, z, 'iron_block');
          }
        }
      }
    }

    // Monumental Illuminated LK Monogram on West Face
    for (let y = baseY + 21; y <= baseY + 30; y++) {
      this.setBlock(cx - 4, y, cz - 3, 'gold_block');
    }
    this.setBlock(cx - 4, baseY + 21, cz - 2, 'gold_block');
    this.setBlock(cx - 4, baseY + 21, cz - 1, 'gold_block');

    for (let y = baseY + 21; y <= baseY + 30; y++) {
      this.setBlock(cx - 4, y, cz + 1, 'gold_block');
    }
    this.setBlock(cx - 4, baseY + 25, cz + 2, 'gold_block');
    this.setBlock(cx - 4, baseY + 28, cz + 3, 'gold_block');
    this.setBlock(cx - 4, baseY + 30, cz + 4, 'gold_block');
    this.setBlock(cx - 4, baseY + 23, cz + 2, 'gold_block');
    this.setBlock(cx - 4, baseY + 21, cz + 3, 'gold_block');

    // Second Sky Observation Deck (Y = 34, 10x10)
    for (let x = cx - 5; x <= cx + 5; x++) {
      for (let z = cz - 5; z <= cz + 5; z++) {
        this.setBlock(x, baseY + 34, z, 'glass');
        if (Math.abs(x - cx) === 5 || Math.abs(z - cz) === 5) {
          this.setBlock(x, baseY + 35, z, 'iron_block');
        }
      }
    }

    // Upper Tapering Spire (Y = 35 to 54)
    for (let y = baseY + 35; y <= baseY + 45; y++) {
      for (let dx = -1; dx <= 1; dx++) {
        for (let dz = -1; dz <= 1; dz++) {
          this.setBlock(cx + dx, y, cz + dz, 'quartz_pillar');
        }
      }
    }
    for (let y = baseY + 46; y <= baseY + 53; y++) {
      this.setBlock(cx, y, cz, 'iron_block');
    }

    // Pinnacle Beacon Crown (Y = 54 to 56)
    this.setBlock(cx, baseY + 54, cz, 'gold_block');
    this.setBlock(cx, baseY + 55, cz, 'glowstone');

    // Plaque at Tower Base
    this.setBlock(cx - 7, baseY + 2, cz, 'iron_block', {
      type: 'sign',
      title: 'Lak Tower (LK Monument)',
      text: 'Soaring 55-block architectural wonder inspired by the Eiffel Tower. Features the illuminated LK monogram and high-altitude glass observation sky deck.'
    });
  }

  // 19. South Beach & Azure Ocean Shoreline (Recreating Photo 2)
  private buildSouthBeachAndOcean() {
    for (let x = -65; x <= 65; x++) {
      for (let z = 75; z <= 88; z++) {
        const isDune = (x * 3 + z * 5) % 11 === 0;
        this.setBlock(x, isDune ? 2 : 1, z, 'sand');
        this.setBlock(x, 0, z, 'sandstone');
      }
    }

    for (let x = -75; x <= 75; x++) {
      for (let z = 89; z <= 135; z++) {
        this.setBlock(x, 0, z, 'water');
        if (z % 14 === 0 && x % 14 === 0) {
          this.setBlock(x, -1, z, 'glowstone');
        }
      }
    }

    const bx = 10;
    const bz = 82;
    for (let dx = -3; dx <= 4; dx++) {
      for (let dz = -2; dz <= 3; dz++) {
        const h = 2 + (dx > 0 ? 1 : 0);
        for (let y = 1; y <= h; y++) {
          this.setBlock(bx + dx, y, bz + dz, (dx + dz) % 2 === 0 ? 'mossy_stone_bricks' : 'cobblestone');
        }
      }
    }

    this.setBlock(bx - 2, 3, bz, 'glowstone');
    this.setBlock(bx + 3, 4, bz + 1, 'glowstone');
    this.setBlock(bx - 1, 3, bz + 2, 'rose_vines');
    this.setBlock(bx + 1, 4, bz - 1, 'rose_vines');

    this.setBlock(bx, 4, bz, 'mossy_stone_bricks', {
      type: 'sign',
      title: 'Sunset Beach Bluff',
      text: 'Warm seaside bluffs overlooking the ocean. Rest on the mossy rocks with your cat companion and watch the sea dragon soar!'
    });

    this.buildSailingShip(-25, 0, 112);
    this.buildSailingShip(40, 0, 120);
  }

  private buildSailingShip(x: number, y: number, z: number) {
    for (let dz = -4; dz <= 4; dz++) {
      const w = Math.abs(dz) === 4 ? 1 : 2;
      for (let dx = -w; dx <= w; dx++) {
        this.setBlock(x + dx, y, z + dz, 'oak_planks');
        if (Math.abs(dx) === w || Math.abs(dz) === 4) {
          this.setBlock(x + dx, y + 1, z + dz, 'log');
        }
      }
    }
    for (let my = 1; my <= 9; my++) {
      this.setBlock(x, y + my, z, 'log');
    }
    for (let sy = 4; sy <= 8; sy++) {
      for (let sx = -2; sx <= 2; sx++) {
        this.setBlock(x + sx, y + sy, z - 1, 'quartz_block');
      }
    }
    this.setBlock(x, y + 10, z, 'glowstone');
  }

  // 20. East Emerald Valley & River Canyon (Recreating Photo 4)
  private buildEastEmeraldValley() {
    for (let x = 75; x <= 135; x += 2) {
      for (let z = -45; z <= 45; z += 2) {
        if (Math.abs(z) <= 4) {
          this.setBlock(x, 0, z, 'water');
          this.setBlock(x + 1, 0, z, 'water');
          this.setBlock(x, 0, z + 1, 'water');
          this.setBlock(x + 1, 0, z + 1, 'water');
          continue;
        }

        const h = Math.max(1, Math.floor(Math.sin(x * 0.08) * 4 + Math.cos(z * 0.1) * 5 + (x - 75) * 0.15));
        for (let y = 1; y <= h; y++) {
          this.setBlock(x, y, z, y === h ? 'grass' : 'dirt');
          this.setBlock(x + 1, y, z, y === h ? 'grass' : 'dirt');
          this.setBlock(x, y, z + 1, y === h ? 'grass' : 'dirt');
          this.setBlock(x + 1, y, z + 1, y === h ? 'grass' : 'dirt');
        }
      }
    }

    for (let z = -5; z <= 5; z++) {
      this.setBlock(92, 4, z, 'stone_bricks');
      this.setBlock(93, 4, z, 'stone_bricks');
      if (Math.abs(z) === 5) {
        this.setBlock(92, 5, z, 'glowstone');
        this.setBlock(93, 5, z, 'glowstone');
      }
    }

    const vx = 84;
    const vy = 12;
    const vz = -14;
    for (let dx = -2; dx <= 2; dx++) {
      for (let dz = -2; dz <= 2; dz++) {
        this.setBlock(vx + dx, vy, vz + dz, 'stone_bricks');
      }
    }
    this.setBlock(vx - 1, vy + 1, vz, 'diamond_block');
    this.setBlock(vx + 1, vy + 1, vz, 'amethyst_block');
    this.setBlock(vx, vy + 1, vz, 'oak_planks', {
      type: 'sign',
      title: 'Emerald Valley Viewpoint',
      text: 'Sunlit mountain ledge overlooking the lush green valley and river canyon. Recreating Lakshya\'s iconic cliffside sit with diamond pickaxe.'
    });
  }

  // 21. West The End Dimension & Obsidian Spires (Recreating Photo 1)
  private buildWestTheEndDimension() {
    for (let x = -75; x >= -135; x -= 2) {
      for (let z = -55; z <= 55; z += 2) {
        const dVolcano = Math.sqrt((x + 105) * (x + 105) + (z + 25) * (z + 25));
        if (dVolcano < 22) continue;

        this.setBlock(x, 0, z, 'end_stone');
        this.setBlock(x - 1, 0, z, 'end_stone');
        this.setBlock(x, 0, z + 1, 'end_stone');
        this.setBlock(x - 1, 0, z + 1, 'end_stone');

        if ((x * 7 + z * 13) % 29 === 0) {
          this.setBlock(x, 1, z, 'purpur_block');
          this.setBlock(x, 2, z, 'purpur_block');
        }
      }
    }

    const spires = [
      { x: -92, z: 12, h: 26 },
      { x: -118, z: 18, h: 32 },
      { x: -128, z: -10, h: 28 },
      { x: -98, z: 32, h: 24 },
      { x: -84, z: -40, h: 30 }
    ];

    for (const sp of spires) {
      for (let y = 1; y <= sp.h; y++) {
        for (let dx = -1; dx <= 1; dx++) {
          for (let dz = -1; dz <= 1; dz++) {
            this.setBlock(sp.x + dx, y, sp.z + dz, 'obsidian');
          }
        }
      }
      this.setBlock(sp.x, sp.h + 1, sp.z, 'glowstone');
      this.setBlock(sp.x, sp.h + 2, sp.z, 'amethyst_block');
      this.setBlock(sp.x - 1, sp.h + 1, sp.z, 'amethyst_block');
      this.setBlock(sp.x + 1, sp.h + 1, sp.z, 'amethyst_block');
      this.setBlock(sp.x, sp.h + 1, sp.z - 1, 'amethyst_block');
      this.setBlock(sp.x, sp.h + 1, sp.z + 1, 'amethyst_block');
    }

    const rx = -100;
    const rz = 2;
    for (let dx = -2; dx <= 2; dx++) {
      for (let dz = -2; dz <= 2; dz++) {
        this.setBlock(rx + dx, 1, rz + dz, 'purpur_block');
      }
    }
    this.setBlock(rx, 2, rz, 'amethyst_block', {
      type: 'sign',
      title: 'The End Stargazing Slabs',
      text: 'Mystical obsidian spires and End Crystals under the starry sky. Press [X] to sit back, relax, and watch the Ender Dragon soar overhead!'
    });
  }
}
