import * as THREE from 'three';

// Helper to create a 16x16 pixel canvas texture with pixelated filtering
function createPixelTexture(drawFn: (ctx: CanvasRenderingContext2D, size: number) => void, size = 16): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  ctx.imageSmoothingEnabled = false;
  drawFn(ctx, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;
  texture.generateMipmaps = false;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// Pseudo random generator with seed for repeatable texture noise
function createRng(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export class TextureManager {
  private textures: Map<string, THREE.CanvasTexture> = new Map();
  public materials: Map<string, THREE.Material | THREE.Material[]> = new Map();

  constructor() {
    this.generateAllTextures();
    this.createMaterials();
  }

  public getTexture(id: string): THREE.CanvasTexture {
    return this.textures.get(id) || this.textures.get('dirt')!;
  }

  public getMaterial(id: string): THREE.Material | THREE.Material[] {
    return this.materials.get(id) || this.materials.get('dirt')!;
  }

  private generateAllTextures() {
    // 1. Grass Top
    this.textures.set('grass_top', createPixelTexture((ctx, s) => {
      const rng = createRng(101);
      const palette = ['#4a8528', '#54962e', '#5ea832', '#3e7021', '#66b539', '#467e25'];
      for (let y = 0; y < s; y++) {
        for (let x = 0; x < s; x++) {
          ctx.fillStyle = palette[Math.floor(rng() * palette.length)];
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }));

    // 2. Dirt
    this.textures.set('dirt', createPixelTexture((ctx, s) => {
      const rng = createRng(202);
      const palette = ['#866043', '#725238', '#5c412b', '#91694a', '#694a31'];
      for (let y = 0; y < s; y++) {
        for (let x = 0; x < s; x++) {
          ctx.fillStyle = palette[Math.floor(rng() * palette.length)];
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }));

    // 3. Grass Side (with iconic irregular grass overhang)
    this.textures.set('grass_side', createPixelTexture((ctx, s) => {
      const rng = createRng(303);
      const dirtPalette = ['#866043', '#725238', '#5c412b', '#91694a', '#694a31'];
      const grassPalette = ['#4a8528', '#54962e', '#5ea832', '#3e7021', '#66b539'];

      // Fill dirt
      for (let y = 0; y < s; y++) {
        for (let x = 0; x < s; x++) {
          ctx.fillStyle = dirtPalette[Math.floor(rng() * dirtPalette.length)];
          ctx.fillRect(x, y, 1, 1);
        }
      }

      // Draw grass overhang fringe
      const drops = [3, 2, 4, 3, 2, 5, 3, 2, 4, 3, 2, 3, 4, 2, 3, 2];
      for (let x = 0; x < s; x++) {
        const depth = drops[x];
        for (let y = 0; y < depth; y++) {
          ctx.fillStyle = grassPalette[Math.floor(rng() * grassPalette.length)];
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }));

    // 4. Cobblestone
    this.textures.set('cobblestone', createPixelTexture((ctx, s) => {
      const rng = createRng(404);
      const stones = ['#8c8c8c', '#757575', '#5e5e5e', '#a3a3a3', '#474747'];
      const mortar = '#333333';
      for (let y = 0; y < s; y++) {
        for (let x = 0; x < s; x++) {
          // irregular mortar grid
          const isMortar = (x % 5 === 0 && y % 3 === 0) || (x === 0 && y > 8) || (y === 7 && x < 10) || (y === 11 && x > 6) || rng() < 0.15;
          ctx.fillStyle = isMortar ? mortar : stones[Math.floor(rng() * stones.length)];
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }));

    // 5. Stone Bricks
    this.textures.set('stone_bricks', createPixelTexture((ctx, s) => {
      const rng = createRng(505);
      const shades = ['#7c7c7c', '#6d6d6d', '#8a8a8a', '#606060'];
      const mortar = '#3b3b3b';

      for (let y = 0; y < s; y++) {
        for (let x = 0; x < s; x++) {
          ctx.fillStyle = shades[Math.floor(rng() * shades.length)];
          ctx.fillRect(x, y, 1, 1);
        }
      }
      // Horizontal mortar lines at y=0, y=8, y=15
      ctx.fillStyle = mortar;
      for (let x = 0; x < s; x++) {
        ctx.fillRect(x, 0, 1, 1);
        ctx.fillRect(x, 7, 1, 1);
        ctx.fillRect(x, 15, 1, 1);
      }
      // Vertical seams alternating
      for (let y = 0; y < 7; y++) {
        ctx.fillRect(8, y, 1, 1);
      }
      for (let y = 8; y < 15; y++) {
        ctx.fillRect(0, y, 1, 1);
        ctx.fillRect(15, y, 1, 1);
      }
    }));

    // 6. Oak Planks
    this.textures.set('oak_planks', createPixelTexture((ctx, s) => {
      const rng = createRng(606);
      const woodPalette = ['#b88748', '#a8783d', '#9c6e33', '#c69553', '#8f632b'];
      const seam = '#5c3e1b';

      for (let y = 0; y < s; y++) {
        for (let x = 0; x < s; x++) {
          ctx.fillStyle = woodPalette[Math.floor(rng() * woodPalette.length)];
          ctx.fillRect(x, y, 1, 1);
        }
      }
      // 4 horizontal boards
      ctx.fillStyle = seam;
      for (let x = 0; x < s; x++) {
        ctx.fillRect(x, 3, 1, 1);
        ctx.fillRect(x, 7, 1, 1);
        ctx.fillRect(x, 11, 1, 1);
        ctx.fillRect(x, 15, 1, 1);
      }
      // Staggered vertical seams
      ctx.fillRect(10, 0, 1, 3);
      ctx.fillRect(4, 4, 1, 3);
      ctx.fillRect(12, 8, 1, 3);
      ctx.fillRect(6, 12, 1, 3);
    }));

    // 7. Oak Log Side (bark)
    this.textures.set('log_side', createPixelTexture((ctx, s) => {
      const rng = createRng(707);
      const bark = ['#685032', '#533c24', '#795d3c', '#46321d', '#5b4329'];
      for (let y = 0; y < s; y++) {
        for (let x = 0; x < s; x++) {
          // vertical striations
          const colVar = ((x * 3) % 5 === 0) ? '#46321d' : bark[Math.floor(rng() * bark.length)];
          ctx.fillStyle = colVar;
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }));

    // 8. Oak Log Top (rings)
    this.textures.set('log_top', createPixelTexture((ctx, s) => {
      const rng = createRng(808);
      const ringLight = '#9e7949';
      const ringDark = '#7e5d33';
      const bark = '#533c24';

      ctx.fillStyle = ringLight;
      ctx.fillRect(0, 0, s, s);

      // Bark perimeter
      ctx.fillStyle = bark;
      ctx.strokeRect(0.5, 0.5, s - 1, s - 1);

      // Concentric rings
      ctx.fillStyle = ringDark;
      ctx.strokeRect(2.5, 2.5, 11, 11);
      ctx.strokeRect(5.5, 5.5, 5, 5);
      ctx.fillRect(7, 7, 2, 2);
    }));

    // 9. Oak Leaves (semi-transparent)
    this.textures.set('leaves', createPixelTexture((ctx, s) => {
      const rng = createRng(909);
      const greens = ['#3b7027', '#4a8528', '#2e5b1d', '#589a32', '#244916'];
      ctx.clearRect(0, 0, s, s);
      for (let y = 0; y < s; y++) {
        for (let x = 0; x < s; x++) {
          // Leaves cutouts (Minecraft fancy leaves)
          if (rng() > 0.22) {
            ctx.fillStyle = greens[Math.floor(rng() * greens.length)];
            ctx.fillRect(x, y, 1, 1);
          }
        }
      }
    }));

    // 10. Glass (translucent with white frame & glare)
    this.textures.set('glass', createPixelTexture((ctx, s) => {
      ctx.clearRect(0, 0, s, s);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.fillRect(0, 0, s, s);

      // Pixel border
      ctx.fillStyle = 'rgba(230, 245, 255, 0.85)';
      ctx.strokeRect(0.5, 0.5, s - 1, s - 1);

      // Diagonal specular glare lines
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.fillRect(2, 2, 2, 1);
      ctx.fillRect(3, 3, 2, 1);
      ctx.fillRect(4, 4, 1, 1);
      ctx.fillRect(11, 10, 2, 1);
      ctx.fillRect(12, 11, 2, 1);
    }));

    // 11. Bookshelf
    this.textures.set('bookshelf', createPixelTexture((ctx, s) => {
      const rng = createRng(1111);
      // Wood frame
      ctx.fillStyle = '#9c6e33';
      ctx.fillRect(0, 0, s, s);
      ctx.fillStyle = '#5c3e1b';
      ctx.strokeRect(0.5, 0.5, s - 1, s - 1);
      ctx.fillRect(0, 7, s, 2);

      // Books rows
      const bookColors = ['#991b1b', '#1e40af', '#166534', '#854d0e', '#581c87', '#0f766e', '#b45309'];
      // Top shelf
      let bx = 1;
      while (bx < 15) {
        const bw = Math.min(Math.floor(rng() * 2) + 1, 15 - bx);
        ctx.fillStyle = bookColors[Math.floor(rng() * bookColors.length)];
        ctx.fillRect(bx, 1, bw, 6);
        // gold ribbon or binding
        if (rng() > 0.5) {
          ctx.fillStyle = '#fef08a';
          ctx.fillRect(bx, 3, bw, 1);
        }
        bx += bw;
      }
      // Bottom shelf
      bx = 1;
      while (bx < 15) {
        const bw = Math.min(Math.floor(rng() * 2) + 1, 15 - bx);
        ctx.fillStyle = bookColors[Math.floor(rng() * bookColors.length)];
        ctx.fillRect(bx, 9, bw, 6);
        if (rng() > 0.5) {
          ctx.fillStyle = '#fef08a';
          ctx.fillRect(bx, 12, bw, 1);
        }
        bx += bw;
      }
    }));

    // 12. Glowstone
    this.textures.set('glowstone', createPixelTexture((ctx, s) => {
      const rng = createRng(1212);
      const amber = ['#f59e0b', '#fbbf24', '#d97706', '#fef08a', '#b45309', '#fffbeb'];
      for (let y = 0; y < s; y++) {
        for (let x = 0; x < s; x++) {
          ctx.fillStyle = amber[Math.floor(rng() * amber.length)];
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }));

    // 13. Diamond Block
    this.textures.set('diamond_block', createPixelTexture((ctx, s) => {
      const rng = createRng(1313);
      const cyans = ['#38bdf8', '#0ea5e9', '#0284c7', '#7dd3fc', '#bae6fd', '#0369a1'];
      for (let y = 0; y < s; y++) {
        for (let x = 0; x < s; x++) {
          ctx.fillStyle = cyans[Math.floor(rng() * cyans.length)];
          ctx.fillRect(x, y, 1, 1);
        }
      }
      // Beveled border
      ctx.fillStyle = '#bae6fd';
      ctx.strokeRect(0.5, 0.5, s - 1, s - 1);
      ctx.strokeRect(2.5, 2.5, s - 5, s - 5);
    }));

    // 14. Gold Block
    this.textures.set('gold_block', createPixelTexture((ctx, s) => {
      const rng = createRng(1414);
      const golds = ['#fbbf24', '#f59e0b', '#d97706', '#fde047', '#fef08a', '#b45309'];
      for (let y = 0; y < s; y++) {
        for (let x = 0; x < s; x++) {
          ctx.fillStyle = golds[Math.floor(rng() * golds.length)];
          ctx.fillRect(x, y, 1, 1);
        }
      }
      ctx.fillStyle = '#fef08a';
      ctx.strokeRect(0.5, 0.5, s - 1, s - 1);
      ctx.strokeRect(2.5, 2.5, s - 5, s - 5);
    }));

    // 15. Iron Block
    this.textures.set('iron_block', createPixelTexture((ctx, s) => {
      const rng = createRng(1515);
      const silvers = ['#e2e8f0', '#cbd5e1', '#94a3b8', '#f8fafc', '#64748b'];
      for (let y = 0; y < s; y++) {
        for (let x = 0; x < s; x++) {
          ctx.fillStyle = silvers[Math.floor(rng() * silvers.length)];
          ctx.fillRect(x, y, 1, 1);
        }
      }
      ctx.fillStyle = '#ffffff';
      ctx.strokeRect(0.5, 0.5, s - 1, s - 1);
      ctx.strokeRect(2.5, 2.5, s - 5, s - 5);
    }));

    // 16. Emerald Block
    this.textures.set('emerald_block', createPixelTexture((ctx, s) => {
      const rng = createRng(1616);
      const emeralds = ['#10b981', '#059669', '#047857', '#34d399', '#6ee7b7'];
      for (let y = 0; y < s; y++) {
        for (let x = 0; x < s; x++) {
          ctx.fillStyle = emeralds[Math.floor(rng() * emeralds.length)];
          ctx.fillRect(x, y, 1, 1);
        }
      }
      ctx.fillStyle = '#a7f3d0';
      ctx.strokeRect(0.5, 0.5, s - 1, s - 1);
      ctx.strokeRect(2.5, 2.5, s - 5, s - 5);
    }));

    // 17. Redstone Block
    this.textures.set('redstone_block', createPixelTexture((ctx, s) => {
      const rng = createRng(1717);
      const reds = ['#ef4444', '#dc2626', '#b91c1c', '#f87171', '#991b1b', '#fca5a5'];
      for (let y = 0; y < s; y++) {
        for (let x = 0; x < s; x++) {
          ctx.fillStyle = reds[Math.floor(rng() * reds.length)];
          ctx.fillRect(x, y, 1, 1);
        }
      }
      ctx.fillStyle = '#fca5a5';
      ctx.strokeRect(0.5, 0.5, s - 1, s - 1);
    }));

    // 18. Lapis Block
    this.textures.set('lapis_block', createPixelTexture((ctx, s) => {
      const rng = createRng(1818);
      const blues = ['#2563eb', '#1d4ed8', '#1e40af', '#3b82f6', '#172554', '#60a5fa'];
      for (let y = 0; y < s; y++) {
        for (let x = 0; x < s; x++) {
          ctx.fillStyle = blues[Math.floor(rng() * blues.length)];
          ctx.fillRect(x, y, 1, 1);
        }
      }
      ctx.fillStyle = '#93c5fd';
      ctx.strokeRect(0.5, 0.5, s - 1, s - 1);
    }));

    // 19. Amethyst Block
    this.textures.set('amethyst_block', createPixelTexture((ctx, s) => {
      const rng = createRng(1919);
      const purples = ['#9333ea', '#7e22ce', '#6b21a8', '#a855f7', '#c084fc', '#581c87'];
      for (let y = 0; y < s; y++) {
        for (let x = 0; x < s; x++) {
          ctx.fillStyle = purples[Math.floor(rng() * purples.length)];
          ctx.fillRect(x, y, 1, 1);
        }
      }
      ctx.fillStyle = '#e9d5ff';
      ctx.strokeRect(0.5, 0.5, s - 1, s - 1);
    }));

    // 20. Obsidian
    this.textures.set('obsidian', createPixelTexture((ctx, s) => {
      const rng = createRng(2020);
      const obs = ['#180e29', '#110a1d', '#23153c', '#2c194a', '#39225e', '#0c0714'];
      for (let y = 0; y < s; y++) {
        for (let x = 0; x < s; x++) {
          ctx.fillStyle = obs[Math.floor(rng() * obs.length)];
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }));

    // 21. Nether Portal
    this.textures.set('portal', createPixelTexture((ctx, s) => {
      const rng = createRng(2121);
      const portals = ['#7e22ce', '#9333ea', '#a855f7', '#581c87', '#3b0764', '#c084fc', '#e9d5ff'];
      for (let y = 0; y < s; y++) {
        for (let x = 0; x < s; x++) {
          ctx.fillStyle = portals[Math.floor(rng() * portals.length)];
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }));

    // 22. Crafting Table Top
    this.textures.set('crafting_top', createPixelTexture((ctx, s) => {
      const rng = createRng(2222);
      ctx.fillStyle = '#b88748';
      ctx.fillRect(0, 0, s, s);
      ctx.fillStyle = '#6d4821';
      ctx.strokeRect(0.5, 0.5, s - 1, s - 1);
      // 3x3 Grid
      ctx.strokeRect(2.5, 2.5, 11, 11);
      ctx.fillRect(6, 3, 1, 10);
      ctx.fillRect(10, 3, 1, 10);
      ctx.fillRect(3, 6, 10, 1);
      ctx.fillRect(3, 10, 10, 1);
    }));

    // 23. Crafting Table Side
    this.textures.set('crafting_side', createPixelTexture((ctx, s) => {
      ctx.fillStyle = '#9c6e33';
      ctx.fillRect(0, 0, s, s);
      ctx.fillStyle = '#5c3e1b';
      ctx.strokeRect(0.5, 0.5, s - 1, s - 1);
      // Tools silhouette
      ctx.fillStyle = '#333333';
      ctx.fillRect(3, 3, 4, 3);
      ctx.fillRect(4, 6, 2, 7);
      ctx.fillStyle = '#991b1b';
      ctx.fillRect(10, 4, 3, 8);
    }));

    // 24. Chest Front (with lock)
    this.textures.set('chest_front', createPixelTexture((ctx, s) => {
      ctx.fillStyle = '#a16207';
      ctx.fillRect(0, 0, s, s);
      ctx.fillStyle = '#3f2208';
      ctx.strokeRect(0.5, 0.5, s - 1, s - 1);
      ctx.fillRect(0, 5, s, 1); // lid seam
      // Silver/Gold Lock
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(7, 4, 2, 3);
      ctx.fillStyle = '#000000';
      ctx.fillRect(7, 5, 2, 1);
    }));

    // 25. Chest Side/Top
    this.textures.set('chest_side', createPixelTexture((ctx, s) => {
      ctx.fillStyle = '#a16207';
      ctx.fillRect(0, 0, s, s);
      ctx.fillStyle = '#3f2208';
      ctx.strokeRect(0.5, 0.5, s - 1, s - 1);
      ctx.fillRect(0, 5, s, 1);
    }));

    // 26. Water
    this.textures.set('water', createPixelTexture((ctx, s) => {
      const rng = createRng(2626);
      const blues = ['#0284c7', '#0369a1', '#075985', '#38bdf8', '#0c4a6e'];
      for (let y = 0; y < s; y++) {
        for (let x = 0; x < s; x++) {
          ctx.fillStyle = blues[Math.floor(rng() * blues.length)];
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }));

    // 27. Sand
    this.textures.set('sand', createPixelTexture((ctx, s) => {
      const rng = createRng(2727);
      const sands = ['#d4b26f', '#deb887', '#c9a562', '#e5c483', '#bf9a56'];
      for (let y = 0; y < s; y++) {
        for (let x = 0; x < s; x++) {
          ctx.fillStyle = sands[Math.floor(rng() * sands.length)];
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }));

    // 28. Redstone Lamp (active glowing)
    this.textures.set('lamp_on', createPixelTexture((ctx, s) => {
      const rng = createRng(2828);
      const amber = ['#ea580c', '#f97316', '#fb923c', '#fdba74', '#c2410c'];
      for (let y = 0; y < s; y++) {
        for (let x = 0; x < s; x++) {
          ctx.fillStyle = amber[Math.floor(rng() * amber.length)];
          ctx.fillRect(x, y, 1, 1);
        }
      }
      ctx.fillStyle = '#7c2d12';
      ctx.strokeRect(0.5, 0.5, s - 1, s - 1);
      ctx.strokeRect(2.5, 2.5, s - 5, s - 5);
    }));

    // 29. Wooden Door Top & Bottom
    this.textures.set('door_top', createPixelTexture((ctx, s) => {
      ctx.fillStyle = '#b88748';
      ctx.fillRect(0, 0, s, s);
      ctx.fillStyle = '#5c3e1b';
      ctx.strokeRect(0.5, 0.5, s - 1, s - 1);
      // Windows
      ctx.fillStyle = '#7dd3fc';
      ctx.fillRect(3, 2, 4, 5);
      ctx.fillRect(9, 2, 4, 5);
      ctx.fillStyle = '#1e3a8a';
      ctx.strokeRect(3, 2, 4, 5);
      ctx.strokeRect(9, 2, 4, 5);
    }));

    this.textures.set('door_bottom', createPixelTexture((ctx, s) => {
      ctx.fillStyle = '#b88748';
      ctx.fillRect(0, 0, s, s);
      ctx.fillStyle = '#5c3e1b';
      ctx.strokeRect(0.5, 0.5, s - 1, s - 1);
      // Handle
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(12, 5, 2, 3);
      ctx.fillStyle = '#000000';
      ctx.fillRect(12, 6, 1, 1);
      // Wood Panels
      ctx.strokeStyle = '#5c3e1b';
      ctx.strokeRect(2.5, 2.5, 5, 11);
      ctx.strokeRect(8.5, 2.5, 5, 11);
    }));

    // 30. Mossy Stone Bricks
    this.textures.set('mossy_stone_bricks', createPixelTexture((ctx, s) => {
      const rng = createRng(1301);
      const shades = ['#7c7c7c', '#6d6d6d', '#8a8a8a', '#606060'];
      const mossShades = ['#3b7027', '#4a8528', '#2e5b1d', '#589a32'];
      const mortar = '#3b3b3b';

      for (let y = 0; y < s; y++) {
        for (let x = 0; x < s; x++) {
          const isMoss = (rng() < 0.35 && (x < 6 || y > 7)) || (x % 3 === 0 && y % 4 === 0);
          ctx.fillStyle = isMoss ? mossShades[Math.floor(rng() * mossShades.length)] : shades[Math.floor(rng() * shades.length)];
          ctx.fillRect(x, y, 1, 1);
        }
      }
      ctx.fillStyle = mortar;
      for (let x = 0; x < s; x++) {
        ctx.fillRect(x, 0, 1, 1);
        ctx.fillRect(x, 7, 1, 1);
        ctx.fillRect(x, 15, 1, 1);
      }
    }));

    // 31. Purpur Block (Fairytale Purple Castle Roof)
    this.textures.set('purpur_block', createPixelTexture((ctx, s) => {
      const rng = createRng(1401);
      const purples = ['#a855f7', '#9333ea', '#7e22ce', '#6b21a8', '#b55fe6'];
      const line = '#581c87';
      for (let y = 0; y < s; y++) {
        for (let x = 0; x < s; x++) {
          ctx.fillStyle = purples[Math.floor(rng() * purples.length)];
          ctx.fillRect(x, y, 1, 1);
        }
      }
      // Geometric shingle border
      ctx.fillStyle = line;
      ctx.strokeRect(0.5, 0.5, s - 1, s - 1);
      ctx.strokeRect(3.5, 3.5, s - 7, s - 7);
    }));

    // 32. Prismarine Bricks (Fairytale Teal-Cyan Rapunzel Spire)
    this.textures.set('prismarine_bricks', createPixelTexture((ctx, s) => {
      const rng = createRng(1501);
      const teals = ['#0d9488', '#14b8a6', '#0f766e', '#2dd4bf', '#115e59'];
      const seam = '#042f2e';
      for (let y = 0; y < s; y++) {
        for (let x = 0; x < s; x++) {
          ctx.fillStyle = teals[Math.floor(rng() * teals.length)];
          ctx.fillRect(x, y, 1, 1);
        }
      }
      ctx.fillStyle = seam;
      for (let x = 0; x < s; x++) {
        ctx.fillRect(x, 0, 1, 1);
        ctx.fillRect(x, 7, 1, 1);
        ctx.fillRect(x, 15, 1, 1);
      }
    }));

    // 33. Rose Vines (Rapunzel Climbing Ivy & Roses)
    this.textures.set('rose_vines', createPixelTexture((ctx, s) => {
      const rng = createRng(1601);
      const greens = ['#2e5b1d', '#3b7027', '#4a8528', '#1e3e13'];
      const reds = ['#e11d48', '#f43f5e', '#be123c', '#fda4af'];
      ctx.clearRect(0, 0, s, s);
      for (let y = 0; y < s; y++) {
        for (let x = 0; x < s; x++) {
          if (rng() > 0.28) {
            ctx.fillStyle = greens[Math.floor(rng() * greens.length)];
            ctx.fillRect(x, y, 1, 1);
          }
        }
      }
      // Blooming roses
      const flowerSpots = [[3, 3], [11, 4], [6, 10], [12, 12], [2, 13]];
      for (const [fx, fy] of flowerSpots) {
        ctx.fillStyle = reds[Math.floor(rng() * reds.length)];
        ctx.fillRect(fx, fy, 2, 2);
        ctx.fillStyle = '#ffe4e6';
        ctx.fillRect(fx + 1, fy + 1, 1, 1);
      }
    }));

    // 34. Quartz Block (Taj Mahal White Marble)
    this.textures.set('quartz_block', createPixelTexture((ctx, s) => {
      const rng = createRng(1701);
      const whites = ['#f8fafc', '#ffffff', '#f1f5f9', '#e2e8f0'];
      for (let y = 0; y < s; y++) {
        for (let x = 0; x < s; x++) {
          ctx.fillStyle = whites[Math.floor(rng() * whites.length)];
          ctx.fillRect(x, y, 1, 1);
        }
      }
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 1;
      ctx.strokeRect(0.5, 0.5, s - 1, s - 1);
    }));

    // 35. Quartz Pillar (Taj Mahal Minarets)
    this.textures.set('quartz_pillar', createPixelTexture((ctx, s) => {
      const rng = createRng(1801);
      const whites = ['#ffffff', '#f8fafc', '#f1f5f9'];
      for (let y = 0; y < s; y++) {
        for (let x = 0; x < s; x++) {
          ctx.fillStyle = whites[Math.floor(rng() * whites.length)];
          ctx.fillRect(x, y, 1, 1);
        }
      }
      // Vertical fluting lines
      ctx.fillStyle = '#cbd5e1';
      for (let x = 0; x < s; x += 4) {
        ctx.fillRect(x, 0, 1, s);
      }
      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(0, 0, s, 1);
      ctx.fillRect(0, s - 1, s, 1);
    }));

    // 36. Magma Block (Active Volcano)
    this.textures.set('magma_block', createPixelTexture((ctx, s) => {
      const rng = createRng(1901);
      const darks = ['#1c1917', '#292524', '#44403c'];
      const fires = ['#ea580c', '#f97316', '#facc15', '#ef4444', '#b91c1c'];
      for (let y = 0; y < s; y++) {
        for (let x = 0; x < s; x++) {
          const isFire = (x % 3 === 0 && y % 2 === 0) || rng() < 0.28;
          ctx.fillStyle = isFire ? fires[Math.floor(rng() * fires.length)] : darks[Math.floor(rng() * darks.length)];
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }));

    // 37. Lava (Molten Volcanic Lava)
    this.textures.set('lava', createPixelTexture((ctx, s) => {
      const rng = createRng(2001);
      const lavaShades = ['#ea580c', '#f97316', '#facc15', '#ef4444', '#dc2626'];
      for (let y = 0; y < s; y++) {
        for (let x = 0; x < s; x++) {
          ctx.fillStyle = lavaShades[Math.floor(rng() * lavaShades.length)];
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }));

    // 38. Snow (Crisp White Mountain Snow)
    this.textures.set('snow', createPixelTexture((ctx, s) => {
      const rng = createRng(2101);
      const whites = ['#ffffff', '#f8fafc', '#f1f5f9', '#e0f2fe'];
      for (let y = 0; y < s; y++) {
        for (let x = 0; x < s; x++) {
          ctx.fillStyle = whites[Math.floor(rng() * whites.length)];
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }));

    // 39. Snow Side (Snow-capped dirt/stone cliff side)
    this.textures.set('snow_side', createPixelTexture((ctx, s) => {
      const rng = createRng(2201);
      const dirtPalette = ['#866043', '#725238', '#5c412b'];
      const snowPalette = ['#ffffff', '#f8fafc', '#f1f5f9'];
      for (let y = 0; y < s; y++) {
        for (let x = 0; x < s; x++) {
          ctx.fillStyle = dirtPalette[Math.floor(rng() * dirtPalette.length)];
          ctx.fillRect(x, y, 1, 1);
        }
      }
      const snowDrops = [5, 4, 6, 5, 4, 7, 5, 4, 6, 5, 4, 5, 6, 4, 5, 4];
      for (let x = 0; x < s; x++) {
        for (let y = 0; y < snowDrops[x]; y++) {
          ctx.fillStyle = snowPalette[Math.floor(rng() * snowPalette.length)];
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }));

    // 40. Ice (Glacial Translucent Ice)
    this.textures.set('ice', createPixelTexture((ctx, s) => {
      const rng = createRng(2301);
      const blues = ['#bae6fd', '#7dd3fc', '#a5f3fc', '#e0f2fe', '#38bdf8'];
      for (let y = 0; y < s; y++) {
        for (let x = 0; x < s; x++) {
          ctx.fillStyle = blues[Math.floor(rng() * blues.length)];
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }));

    // 41. End Stone (The End Realm Ground)
    this.textures.set('end_stone', createPixelTexture((ctx, s) => {
      const rng = createRng(2401);
      const endTones = ['#e6ebb2', '#dbe29d', '#ccd48b', '#bec778', '#f3f7c4'];
      for (let y = 0; y < s; y++) {
        for (let x = 0; x < s; x++) {
          ctx.fillStyle = endTones[Math.floor(rng() * endTones.length)];
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }));

    // 42. Sandstone (Smooth Stratified Desert/Beach Stone)
    this.textures.set('sandstone', createPixelTexture((ctx, s) => {
      const rng = createRng(2501);
      const sandTones = ['#e2c285', '#d4b16f', '#f0d49e', '#c7a35e'];
      for (let y = 0; y < s; y++) {
        for (let x = 0; x < s; x++) {
          ctx.fillStyle = sandTones[Math.floor(rng() * sandTones.length)];
          ctx.fillRect(x, y, 1, 1);
        }
      }
      ctx.fillStyle = '#b5934f';
      ctx.fillRect(0, 0, s, 1);
      ctx.fillRect(0, 7, s, 1);
      ctx.fillRect(0, 15, s, 1);
    }));

    // 43. Spruce Leaves (Alpine Pine Foliage)
    this.textures.set('spruce_leaves', createPixelTexture((ctx, s) => {
      const rng = createRng(2601);
      const pineGreens = ['#14532d', '#166534', '#0f3d21', '#1e3a1f'];
      ctx.clearRect(0, 0, s, s);
      for (let y = 0; y < s; y++) {
        for (let x = 0; x < s; x++) {
          if (rng() > 0.18) {
            ctx.fillStyle = pineGreens[Math.floor(rng() * pineGreens.length)];
            ctx.fillRect(x, y, 1, 1);
          }
        }
      }
    }));

    // 44. Spruce Log Side (Alpine Dark Wood)
    this.textures.set('spruce_log_side', createPixelTexture((ctx, s) => {
      const rng = createRng(2701);
      const darkWoods = ['#3b2716', '#2c1c0f', '#4a331f', '#24160a'];
      for (let y = 0; y < s; y++) {
        for (let x = 0; x < s; x++) {
          ctx.fillStyle = darkWoods[Math.floor(rng() * darkWoods.length)];
          ctx.fillRect(x, y, 1, 1);
        }
      }
      ctx.fillStyle = '#1c1107';
      for (let y = 0; y < s; y += 4) {
        ctx.fillRect(0, y, s, 1);
      }
    }));

    // 45. Bedrock (Mottled Dark Grey/Black Indestructible Bottom Layer)
    this.textures.set('bedrock', createPixelTexture((ctx, s) => {
      const rng = createRng(9999);
      const bedrockColors = ['#111111', '#181818', '#222222', '#2f2f2f', '#444444', '#555555'];
      for (let y = 0; y < s; y++) {
        for (let x = 0; x < s; x++) {
          ctx.fillStyle = bedrockColors[Math.floor(rng() * bedrockColors.length)];
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }));

    // 46. Sakura Leaves (Pastel Cherry Blossom Pink)
    this.textures.set('sakura_leaves', createPixelTexture((ctx, s) => {
      const rng = createRng(3101);
      const pinks = ['#fbcfe8', '#f472b6', '#ec4899', '#db2777', '#fdf2f8'];
      ctx.clearRect(0, 0, s, s);
      for (let y = 0; y < s; y++) {
        for (let x = 0; x < s; x++) {
          if (rng() > 0.15) {
            ctx.fillStyle = pinks[Math.floor(rng() * pinks.length)];
            ctx.fillRect(x, y, 1, 1);
          }
        }
      }
    }));

    // 47. Terracotta Adobe (Sunbaked Desert Clay Brick)
    this.textures.set('terracotta_adobe', createPixelTexture((ctx, s) => {
      const rng = createRng(3201);
      const clay = ['#c2410c', '#ea580c', '#9a3412', '#b45309', '#d97706'];
      for (let y = 0; y < s; y++) {
        for (let x = 0; x < s; x++) {
          ctx.fillStyle = clay[Math.floor(rng() * clay.length)];
          ctx.fillRect(x, y, 1, 1);
        }
      }
      ctx.fillStyle = '#7c2d12';
      for (let y = 0; y < s; y += 4) {
        ctx.fillRect(0, y, s, 1);
      }
    }));

    // 48. Red Sandstone (Carved Desert Sandstone)
    this.textures.set('red_sandstone', createPixelTexture((ctx, s) => {
      const rng = createRng(3301);
      const sands = ['#b45309', '#92400e', '#78350f', '#d97706'];
      for (let y = 0; y < s; y++) {
        for (let x = 0; x < s; x++) {
          ctx.fillStyle = sands[Math.floor(rng() * sands.length)];
          ctx.fillRect(x, y, 1, 1);
        }
      }
      ctx.fillStyle = '#451a03';
      ctx.fillRect(0, 0, s, 1);
      ctx.fillRect(0, s - 1, s, 1);
    }));

    // 49. Cyber Glass (High-Tech Skyscraper Glass with Cyan Neon Trim)
    this.textures.set('cyber_glass', createPixelTexture((ctx, s) => {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, s, s);
      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = 1;
      ctx.strokeRect(0, 0, s, s);
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(1, 1, 3, 1);
      ctx.fillRect(s - 4, s - 2, 3, 1);
    }));

    // 50. Asphalt Road (Dark Charcoal Pavement with White Dashed Centerline)
    this.textures.set('asphalt_road', createPixelTexture((ctx, s) => {
      const rng = createRng(3501);
      const asphalt = ['#1e293b', '#0f172a', '#334155'];
      for (let y = 0; y < s; y++) {
        for (let x = 0; x < s; x++) {
          ctx.fillStyle = asphalt[Math.floor(rng() * asphalt.length)];
          ctx.fillRect(x, y, 1, 1);
        }
      }
      // Center road dash
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(7, 3, 2, 10);
    }));

    // 51. Red Terracotta (Vermilion Lacquer for Pagodas and Torii Gates)
    this.textures.set('red_terracotta', createPixelTexture((ctx, s) => {
      const rng = createRng(3601);
      const vermilion = ['#dc2626', '#b91c1c', '#991b1b', '#ef4444'];
      for (let y = 0; y < s; y++) {
        for (let x = 0; x < s; x++) {
          ctx.fillStyle = vermilion[Math.floor(rng() * vermilion.length)];
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }));

    // 52. Palm Wood (Ringed Tropical Trunk)
    this.textures.set('palm_wood', createPixelTexture((ctx, s) => {
      const rng = createRng(3701);
      const palm = ['#78350f', '#92400e', '#451a03', '#a16207'];
      for (let y = 0; y < s; y++) {
        for (let x = 0; x < s; x++) {
          ctx.fillStyle = palm[Math.floor(rng() * palm.length)];
          ctx.fillRect(x, y, 1, 1);
        }
      }
      ctx.fillStyle = '#291003';
      for (let y = 0; y < s; y += 3) {
        ctx.fillRect(0, y, s, 1);
      }
    }));

    // 53. Palm Leaves (Tropical Palm Fronds)
    this.textures.set('palm_leaves', createPixelTexture((ctx, s) => {
      const rng = createRng(3801);
      const greens = ['#15803d', '#16a34a', '#22c55e', '#14532d'];
      ctx.clearRect(0, 0, s, s);
      for (let y = 0; y < s; y++) {
        for (let x = 0; x < s; x++) {
          if (rng() > 0.16) {
            ctx.fillStyle = greens[Math.floor(rng() * greens.length)];
            ctx.fillRect(x, y, 1, 1);
          }
        }
      }
    }));

    // 54. Smooth Stone (Clean Minecraft Voxel Slab with outer seam)
    this.textures.set('smooth_stone', createPixelTexture((ctx, s) => {
      const rng = createRng(3901);
      const stone = ['#9e9e9e', '#a4a4a4', '#969696', '#aaaaaa', '#8e8e8e'];
      for (let y = 0; y < s; y++) {
        for (let x = 0; x < s; x++) {
          ctx.fillStyle = stone[Math.floor(rng() * stone.length)];
          ctx.fillRect(x, y, 1, 1);
        }
      }
      ctx.strokeStyle = '#616161';
      ctx.lineWidth = 1;
      ctx.strokeRect(0.5, 0.5, s - 1, s - 1);
      ctx.fillStyle = '#b5b5b5';
      ctx.fillRect(1, 1, s - 2, 1);
      ctx.fillRect(1, 1, 1, s - 2);
    }));

    // 55. Beacon (Obsidian Base, Glass Encasing, Glowing Cyan Core)
    this.textures.set('beacon', createPixelTexture((ctx, s) => {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, s - 3, s, 3);
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(3, 3, 10, 10);
      ctx.fillStyle = '#bae6fd';
      ctx.fillRect(5, 5, 6, 6);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(7, 7, 2, 2);
      ctx.strokeStyle = '#67e8f9';
      ctx.lineWidth = 1;
      ctx.strokeRect(0.5, 0.5, s - 1, s - 4);
    }));

    // 56. Lantern (Wrought-Iron Lantern with Golden Amber Glow)
    this.textures.set('lantern', createPixelTexture((ctx, s) => {
      ctx.fillStyle = '#27272a';
      ctx.fillRect(0, 0, s, s);
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(3, 4, 10, 8);
      ctx.fillStyle = '#fbbf24';
      ctx.fillRect(5, 5, 6, 6);
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(7, 7, 2, 2);
      ctx.fillStyle = '#18181b';
      ctx.fillRect(0, 0, s, 3);
      ctx.fillRect(0, s - 3, s, 3);
      ctx.fillRect(2, 2, 2, 12);
      ctx.fillRect(s - 4, 2, 2, 12);
    }));

    // 57. Sea Lantern (Aquatic Cyan Grid Lantern)
    this.textures.set('sea_lantern', createPixelTexture((ctx, s) => {
      const rng = createRng(4001);
      const sea = ['#bae6fd', '#7dd3fc', '#38bdf8', '#e0f2fe', '#f0f9ff'];
      for (let y = 0; y < s; y++) {
        for (let x = 0; x < s; x++) {
          ctx.fillStyle = sea[Math.floor(rng() * sea.length)];
          ctx.fillRect(x, y, 1, 1);
        }
      }
      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = 1;
      ctx.strokeRect(2.5, 2.5, s - 5, s - 5);
    }));

    // 58. Coal Block (Charcoal Mineral Block)
    this.textures.set('coal_block', createPixelTexture((ctx, s) => {
      const rng = createRng(4101);
      const coal = ['#18181b', '#27272a', '#09090b', '#3f3f46', '#141416'];
      for (let y = 0; y < s; y++) {
        for (let x = 0; x < s; x++) {
          ctx.fillStyle = coal[Math.floor(rng() * coal.length)];
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }));

    // 59. Cauldron (Iron Pot with Blue Water)
    this.textures.set('cauldron', createPixelTexture((ctx, s) => {
      ctx.fillStyle = '#3f3f46';
      ctx.fillRect(0, 0, s, s);
      ctx.strokeStyle = '#18181b';
      ctx.lineWidth = 1;
      ctx.strokeRect(0.5, 0.5, s - 1, s - 1);
      ctx.fillStyle = '#0284c7';
      ctx.fillRect(3, 3, 10, 10);
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(5, 5, 6, 6);
    }));
  }

  private createMaterials() {
    // Multi-face material for Grass block: [px, nx, py, ny, pz, nz]
    // py = top (grass), ny = bottom (dirt), sides = grass_side
    const grassSides = new THREE.MeshLambertMaterial({ map: this.getTexture('grass_side') });
    const grassTop = new THREE.MeshLambertMaterial({ map: this.getTexture('grass_top') });
    const dirtMat = new THREE.MeshLambertMaterial({ map: this.getTexture('dirt') });
    this.materials.set('grass', [grassSides, grassSides, grassTop, dirtMat, grassSides, grassSides]);

    // Dirt
    this.materials.set('dirt', dirtMat);

    // Cobblestone
    this.materials.set('cobblestone', new THREE.MeshLambertMaterial({ map: this.getTexture('cobblestone') }));

    // Stone Bricks
    this.materials.set('stone_bricks', new THREE.MeshLambertMaterial({ map: this.getTexture('stone_bricks') }));

    // Oak Planks
    this.materials.set('oak_planks', new THREE.MeshLambertMaterial({ map: this.getTexture('oak_planks') }));

    // Oak Log
    const logSide = new THREE.MeshLambertMaterial({ map: this.getTexture('log_side') });
    const logTop = new THREE.MeshLambertMaterial({ map: this.getTexture('log_top') });
    this.materials.set('log', [logSide, logSide, logTop, logTop, logSide, logSide]);

    // Leaves
    this.materials.set('leaves', new THREE.MeshLambertMaterial({
      map: this.getTexture('leaves'),
      transparent: true,
      alphaTest: 0.5,
      side: THREE.DoubleSide
    }));

    // Glass
    this.materials.set('glass', new THREE.MeshLambertMaterial({
      map: this.getTexture('glass'),
      transparent: true,
      opacity: 0.6,
      depthWrite: false
    }));

    // Bookshelf
    const bookShelfSide = new THREE.MeshLambertMaterial({ map: this.getTexture('bookshelf') });
    const woodTop = new THREE.MeshLambertMaterial({ map: this.getTexture('oak_planks') });
    this.materials.set('bookshelf', [bookShelfSide, bookShelfSide, woodTop, woodTop, bookShelfSide, bookShelfSide]);

    // Crafting Table
    const craftTop = new THREE.MeshLambertMaterial({ map: this.getTexture('crafting_top') });
    const craftSide = new THREE.MeshLambertMaterial({ map: this.getTexture('crafting_side') });
    const craftBottom = new THREE.MeshLambertMaterial({ map: this.getTexture('oak_planks') });
    this.materials.set('crafting_table', [craftSide, craftSide, craftTop, craftBottom, craftSide, craftSide]);

    // Chest
    const chestFront = new THREE.MeshLambertMaterial({ map: this.getTexture('chest_front') });
    const chestSide = new THREE.MeshLambertMaterial({ map: this.getTexture('chest_side') });
    this.materials.set('chest', [chestSide, chestSide, chestSide, chestSide, chestFront, chestSide]);

    // Glowstone
    this.materials.set('glowstone', new THREE.MeshBasicMaterial({ map: this.getTexture('glowstone') }));

    // Diamond, Gold, Iron, Emerald, Redstone, Lapis, Amethyst
    this.materials.set('diamond_block', new THREE.MeshLambertMaterial({ map: this.getTexture('diamond_block') }));
    this.materials.set('gold_block', new THREE.MeshLambertMaterial({ map: this.getTexture('gold_block') }));
    this.materials.set('iron_block', new THREE.MeshLambertMaterial({ map: this.getTexture('iron_block') }));
    this.materials.set('emerald_block', new THREE.MeshLambertMaterial({ map: this.getTexture('emerald_block') }));
    this.materials.set('redstone_block', new THREE.MeshLambertMaterial({ map: this.getTexture('redstone_block') }));
    this.materials.set('lapis_block', new THREE.MeshLambertMaterial({ map: this.getTexture('lapis_block') }));
    this.materials.set('amethyst_block', new THREE.MeshLambertMaterial({ map: this.getTexture('amethyst_block') }));

    // Obsidian
    this.materials.set('obsidian', new THREE.MeshLambertMaterial({ map: this.getTexture('obsidian') }));

    // Portal
    this.materials.set('portal', new THREE.MeshBasicMaterial({
      map: this.getTexture('portal'),
      transparent: true,
      opacity: 0.82,
      side: THREE.DoubleSide
    }));

    // Water
    this.materials.set('water', new THREE.MeshLambertMaterial({
      map: this.getTexture('water'),
      transparent: true,
      opacity: 0.7,
      depthWrite: false
    }));

    // Sand
    this.materials.set('sand', new THREE.MeshLambertMaterial({ map: this.getTexture('sand') }));

    // Redstone Lamp
    this.materials.set('lamp_on', new THREE.MeshBasicMaterial({ map: this.getTexture('lamp_on') }));

    // Fairytale Castle Materials
    this.materials.set('mossy_stone_bricks', new THREE.MeshLambertMaterial({ map: this.getTexture('mossy_stone_bricks') }));
    this.materials.set('purpur_block', new THREE.MeshLambertMaterial({ map: this.getTexture('purpur_block') }));
    this.materials.set('prismarine_bricks', new THREE.MeshLambertMaterial({ map: this.getTexture('prismarine_bricks') }));
    this.materials.set('rose_vines', new THREE.MeshLambertMaterial({
      map: this.getTexture('rose_vines'),
      transparent: true,
      alphaTest: 0.5,
      side: THREE.DoubleSide
    }));

    // Taj Mahal Materials
    this.materials.set('quartz_block', new THREE.MeshLambertMaterial({ map: this.getTexture('quartz_block') }));
    const qSide = new THREE.MeshLambertMaterial({ map: this.getTexture('quartz_pillar') });
    const qTop = new THREE.MeshLambertMaterial({ map: this.getTexture('quartz_block') });
    this.materials.set('quartz_pillar', [qSide, qSide, qTop, qTop, qSide, qSide]);

    // Volcano & Lava Materials
    this.materials.set('magma_block', new THREE.MeshLambertMaterial({
      map: this.getTexture('magma_block'),
      emissive: new THREE.Color(0xf97316),
      emissiveIntensity: 0.4
    }));
    this.materials.set('lava', new THREE.MeshBasicMaterial({ map: this.getTexture('lava') }));

    // Snow & Ice Materials
    const snowMat = new THREE.MeshLambertMaterial({ map: this.getTexture('snow') });
    this.materials.set('snow', snowMat);

    const snowSideMat = new THREE.MeshLambertMaterial({ map: this.getTexture('snow_side') });
    this.materials.set('snow_grass', [snowSideMat, snowSideMat, snowMat, dirtMat, snowSideMat, snowSideMat]);

    this.materials.set('ice', new THREE.MeshLambertMaterial({
      map: this.getTexture('ice'),
      transparent: true,
      opacity: 0.82
    }));

    // The End & Desert/Beach Materials
    this.materials.set('end_stone', new THREE.MeshLambertMaterial({ map: this.getTexture('end_stone') }));
    this.materials.set('sandstone', new THREE.MeshLambertMaterial({ map: this.getTexture('sandstone') }));

    // Alpine Spruce Materials
    this.materials.set('spruce_leaves', new THREE.MeshLambertMaterial({
      map: this.getTexture('spruce_leaves'),
      transparent: true,
      alphaTest: 0.5,
      side: THREE.DoubleSide
    }));
    const spruceLogSide = new THREE.MeshLambertMaterial({ map: this.getTexture('spruce_log_side') });
    this.materials.set('spruce_log', [spruceLogSide, spruceLogSide, logTop, logTop, spruceLogSide, spruceLogSide]);

    // Bedrock
    this.materials.set('bedrock', new THREE.MeshLambertMaterial({ map: this.getTexture('bedrock') }));

    // Sakura / Japan Materials
    this.materials.set('sakura_leaves', new THREE.MeshLambertMaterial({
      map: this.getTexture('sakura_leaves'),
      transparent: true,
      alphaTest: 0.5,
      side: THREE.DoubleSide
    }));
    this.materials.set('red_terracotta', new THREE.MeshLambertMaterial({ map: this.getTexture('red_terracotta') }));

    // Mexican Pueblo Materials
    this.materials.set('terracotta_adobe', new THREE.MeshLambertMaterial({ map: this.getTexture('terracotta_adobe') }));
    this.materials.set('red_sandstone', new THREE.MeshLambertMaterial({ map: this.getTexture('red_sandstone') }));

    // Neo York High-Tech Materials
    this.materials.set('cyber_glass', new THREE.MeshLambertMaterial({
      map: this.getTexture('cyber_glass'),
      transparent: true,
      opacity: 0.72,
      side: THREE.DoubleSide
    }));
    this.materials.set('asphalt_road', new THREE.MeshLambertMaterial({ map: this.getTexture('asphalt_road') }));

    // Tropical Palm Materials
    this.materials.set('palm_wood', new THREE.MeshLambertMaterial({ map: this.getTexture('palm_wood') }));
    this.materials.set('palm_leaves', new THREE.MeshLambertMaterial({
      map: this.getTexture('palm_leaves'),
      transparent: true,
      alphaTest: 0.5,
      side: THREE.DoubleSide
    }));

    // Smooth Stone
    this.materials.set('smooth_stone', new THREE.MeshLambertMaterial({ map: this.getTexture('smooth_stone') }));

    // Beacon (glowing)
    this.materials.set('beacon', new THREE.MeshBasicMaterial({ map: this.getTexture('beacon') }));

    // Lantern (glowing)
    this.materials.set('lantern', new THREE.MeshBasicMaterial({ map: this.getTexture('lantern') }));

    // Sea Lantern (glowing)
    this.materials.set('sea_lantern', new THREE.MeshBasicMaterial({ map: this.getTexture('sea_lantern') }));

    // Coal Block
    this.materials.set('coal_block', new THREE.MeshLambertMaterial({ map: this.getTexture('coal_block') }));

    // Cauldron
    this.materials.set('cauldron', new THREE.MeshLambertMaterial({ map: this.getTexture('cauldron') }));

    // Oak Wood Aliases (ensure oak_log, oak_fence, oak_stairs render with proper wood textures instead of fallback)
    this.materials.set('oak_log', this.materials.get('log')!);
    this.materials.set('oak_fence', this.materials.get('oak_planks')!);
    this.materials.set('oak_stairs', this.materials.get('oak_planks')!);
  }
}
