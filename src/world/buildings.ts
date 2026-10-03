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
}
