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
  }
}
