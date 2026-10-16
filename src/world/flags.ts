import * as THREE from 'three';

export interface FlagInstance {
  mesh: THREE.Mesh;
  geometry: THREE.PlaneGeometry;
  basePositions: Float32Array;
  width: number;
  phase: number;
}

export type CountryFlagId =
  | 'india'
  | 'usa'
  | 'uk'
  | 'france'
  | 'japan'
  | 'korea'
  | 'china'
  | 'mexico'
  | 'egypt'
  | 'uae'
  | 'switzerland';

export interface AddFlagOptions {
  skipMast?: boolean;
}

export class FlagManager {
  private scene: THREE.Scene;
  private flags: FlagInstance[] = [];
  private textures: Map<CountryFlagId, THREE.CanvasTexture> = new Map();

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.initTextures();
  }

  // --------------------------------------------------------------------------
  // PROCEDURAL HIGH-RESOLUTION AUTHENTIC NATIONAL FLAG TEXTURES (512 x 340)
  // --------------------------------------------------------------------------
  private initTextures() {
    this.textures.set('india', this.createIndiaTexture());
    this.textures.set('usa', this.createUsaTexture());
    this.textures.set('uk', this.createUkTexture());
    this.textures.set('france', this.createFranceTexture());
    this.textures.set('japan', this.createJapanTexture());
    this.textures.set('korea', this.createKoreaTexture());
    this.textures.set('china', this.createChinaTexture());
    this.textures.set('mexico', this.createMexicoTexture());
    this.textures.set('egypt', this.createEgyptTexture());
    this.textures.set('uae', this.createUaeTexture());
    this.textures.set('switzerland', this.createSwitzerlandTexture());
  }

  private createCanvas(w = 512, h = 340): { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D } {
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d')!;
    return { canvas, ctx };
  }

  private finalizeTexture(canvas: HTMLCanvasElement): THREE.CanvasTexture {
    // Subtle fabric weave texture overlay for authentic cloth appearance
    const ctx = canvas.getContext('2d')!;
    ctx.save();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.035)';
    for (let x = 0; x < canvas.width; x += 4) {
      ctx.fillRect(x, 0, 1.5, canvas.height);
    }
    for (let y = 0; y < canvas.height; y += 4) {
      ctx.fillRect(0, y, canvas.width, 1.5);
    }
    ctx.restore();

    const tex = new THREE.CanvasTexture(canvas);
    tex.magFilter = THREE.LinearFilter;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }

  // Helper to draw a crisp 5-pointed star
  private drawStar(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, color: string, rotation = 0) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.translate(cx, cy);
    ctx.rotate(rotation);
    ctx.beginPath();
    const innerR = r * 0.382;
    for (let i = 0; i < 10; i++) {
      const angle = (i * Math.PI) / 5 - Math.PI / 2;
      const rad = i % 2 === 0 ? r : innerR;
      const x = Math.cos(angle) * rad;
      const y = Math.sin(angle) * rad;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  // 1. India 🇮🇳 (Official Tiranga)
  private createIndiaTexture(): THREE.CanvasTexture {
    const { canvas, ctx } = this.createCanvas(512, 340);
    const bandH = 340 / 3;

    // Top: Saffron Kesari (#ff9933)
    ctx.fillStyle = '#ff9933';
    ctx.fillRect(0, 0, 512, bandH);

    // Middle: Silk White (#ffffff)
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, bandH, 512, bandH);

    // Bottom: India Green (#138808)
    ctx.fillStyle = '#138808';
    ctx.fillRect(0, bandH * 2, 512, bandH);

    // Centered Navy Blue Ashoka Chakra
    const cx = 256;
    const cy = 170;
    const radius = 48;

    // Outer rim (#000080)
    ctx.strokeStyle = '#000080';
    ctx.lineWidth = 4.2;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.stroke();

    // Central hub
    ctx.fillStyle = '#000080';
    ctx.beginPath();
    ctx.arc(cx, cy, 10, 0, Math.PI * 2);
    ctx.fill();

    // 24 Spokes of Dharma
    ctx.lineWidth = 2.2;
    for (let i = 0; i < 24; i++) {
      const angle = (i * Math.PI) / 12;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius);
      ctx.stroke();
    }

    return this.finalizeTexture(canvas);
  }

  // 2. United States 🇺🇸 (Stars and Stripes)
  private createUsaTexture(): THREE.CanvasTexture {
    const { canvas, ctx } = this.createCanvas(512, 340);
    const stripeH = 340 / 13;

    // 13 Red & White stripes
    for (let i = 0; i < 13; i++) {
      ctx.fillStyle = i % 2 === 0 ? '#b22234' : '#ffffff';
      ctx.fillRect(0, i * stripeH, 512, stripeH);
    }

    // Navy Blue Canton
    const cantonW = 512 * 0.40;
    const cantonH = stripeH * 7;
    ctx.fillStyle = '#3c3b6e';
    ctx.fillRect(0, 0, cantonW, cantonH);

    // 50 Stars in 9 alternating rows (6, 5, 6, 5, 6, 5, 6, 5, 6)
    const starR = 5.2;
    const rowH = cantonH / 10;
    for (let r = 0; r < 9; r++) {
      const isSix = r % 2 === 0;
      const count = isSix ? 6 : 5;
      const stepX = cantonW / (count + 1);
      const y = (r + 1) * rowH;
      for (let c = 0; c < count; c++) {
        const x = (c + 1) * stepX;
        this.drawStar(ctx, x, y, starR, '#ffffff');
      }
    }

    return this.finalizeTexture(canvas);
  }

  // 3. United Kingdom 🇬🇧 (Union Flag)
  private createUkTexture(): THREE.CanvasTexture {
    const { canvas, ctx } = this.createCanvas(512, 340);
    // Royal Blue field
    ctx.fillStyle = '#012169';
    ctx.fillRect(0, 0, 512, 340);

    // White Saltires (Cross of St. Andrew)
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 68;
    ctx.beginPath();
    ctx.moveTo(0, 0); ctx.lineTo(512, 340);
    ctx.moveTo(512, 0); ctx.lineTo(0, 340);
    ctx.stroke();

    // Red Saltires (Cross of St. Patrick, counterchanged)
    ctx.strokeStyle = '#c8102e';
    ctx.lineWidth = 22;
    ctx.beginPath();
    // Top-left to bottom-right
    ctx.moveTo(0, 0); ctx.lineTo(256, 170);
    ctx.moveTo(256, 170); ctx.lineTo(512, 340);
    // Bottom-left to top-right
    ctx.moveTo(0, 340); ctx.lineTo(256, 170);
    ctx.moveTo(256, 170); ctx.lineTo(512, 0);
    ctx.stroke();

    // Broad White Cross of St. George
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(256 - 54, 0, 108, 340);
    ctx.fillRect(0, 170 - 54, 512, 108);

    // Red Cross of St. George
    ctx.fillStyle = '#c8102e';
    ctx.fillRect(256 - 32, 0, 64, 340);
    ctx.fillRect(0, 170 - 32, 512, 64);

    return this.finalizeTexture(canvas);
  }

  // 4. France 🇫🇷 (Le Drapeau Tricolore)
  private createFranceTexture(): THREE.CanvasTexture {
    const { canvas, ctx } = this.createCanvas(512, 340);
    const colW = 512 / 3;

    ctx.fillStyle = '#002654'; // Bleu
    ctx.fillRect(0, 0, colW, 340);

    ctx.fillStyle = '#ffffff'; // Blanc
    ctx.fillRect(colW, 0, colW, 340);

    ctx.fillStyle = '#ed2939'; // Rouge
    ctx.fillRect(colW * 2, 0, colW, 340);

    return this.finalizeTexture(canvas);
  }

  // 5. Japan 🇯🇵 (Hinomaru)
  private createJapanTexture(): THREE.CanvasTexture {
    const { canvas, ctx } = this.createCanvas(512, 340);

    // Pure White Silk field
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 512, 340);

    // Centered Crimson Sun Disc (#bc002d)
    ctx.fillStyle = '#bc002d';
    ctx.beginPath();
    ctx.arc(256, 170, 102, 0, Math.PI * 2);
    ctx.fill();

    return this.finalizeTexture(canvas);
  }

  // 6. South Korea 🇰🇷 (Taegeukgi)
  private createKoreaTexture(): THREE.CanvasTexture {
    const { canvas, ctx } = this.createCanvas(512, 340);

    // Pure White field
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 512, 340);

    const cx = 256;
    const cy = 170;
    const r = 85;

    // Taegeuk Circle (Red top, Blue bottom, S-curve)
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(-Math.PI / 5.5);

    // Base Blue half
    ctx.fillStyle = '#0047a0';
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI);
    ctx.fill();

    // Base Red half
    ctx.fillStyle = '#cd2e3a';
    ctx.beginPath();
    ctx.arc(0, 0, r, Math.PI, Math.PI * 2);
    ctx.fill();

    // S-curve small half circles
    ctx.fillStyle = '#cd2e3a';
    ctx.beginPath();
    ctx.arc(-r / 2, 0, r / 2, 0, Math.PI);
    ctx.fill();

    ctx.fillStyle = '#0047a0';
    ctx.beginPath();
    ctx.arc(r / 2, 0, r / 2, Math.PI, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 4 Black Trigrams in corners
    const drawTrigram = (tx: number, ty: number, rot: number, pattern: boolean[]) => {
      ctx.save();
      ctx.translate(tx, ty);
      ctx.rotate(rot);
      ctx.fillStyle = '#000000';
      const barW = 38;
      const barH = 5.5;
      const gapY = 4.5;
      for (let i = 0; i < 3; i++) {
        const y = (i - 1) * (barH + gapY);
        if (pattern[i]) {
          // Solid bar
          ctx.fillRect(-barW / 2, y, barW, barH);
        } else {
          // Broken bar
          const half = (barW - 6) / 2;
          ctx.fillRect(-barW / 2, y, half, barH);
          ctx.fillRect(-barW / 2 + half + 6, y, half, barH);
        }
      }
      ctx.restore();
    };

    drawTrigram(85, 75, Math.PI / 5.5, [true, true, true]); // Geon (☰)
    drawTrigram(427, 265, Math.PI / 5.5, [false, false, false]); // Gon (☷)
    drawTrigram(427, 75, -Math.PI / 5.5, [false, true, false]); // Gam (☵)
    drawTrigram(85, 265, -Math.PI / 5.5, [true, false, true]); // Ri (☲)

    return this.finalizeTexture(canvas);
  }

  // 7. China 🇨🇳 (Five-Star Red Flag)
  private createChinaTexture(): THREE.CanvasTexture {
    const { canvas, ctx } = this.createCanvas(512, 340);

    // Deep Red field (#de2910)
    ctx.fillStyle = '#de2910';
    ctx.fillRect(0, 0, 512, 340);

    // Large Golden Star
    const bigX = 85;
    const bigY = 85;
    const bigR = 48;
    this.drawStar(ctx, bigX, bigY, bigR, '#ffde00', 0);

    // 4 Small Golden Stars pointing toward big star center
    const smallStars = [
      { x: 170, y: 35, r: 16 },
      { x: 204, y: 70, r: 16 },
      { x: 204, y: 120, r: 16 },
      { x: 170, y: 155, r: 16 }
    ];

    smallStars.forEach(s => {
      const angle = Math.atan2(bigY - s.y, bigX - s.x) - Math.PI / 2;
      this.drawStar(ctx, s.x, s.y, s.r, '#ffde00', angle);
    });

    return this.finalizeTexture(canvas);
  }

  // 8. Mexico 🇲🇽 (Bandera de México)
  private createMexicoTexture(): THREE.CanvasTexture {
    const { canvas, ctx } = this.createCanvas(512, 340);
    const colW = 512 / 3;

    // Green (Verde Esperanza), White (Blanco Unidad), Red (Rojo Sangre de los Héroes)
    ctx.fillStyle = '#006847';
    ctx.fillRect(0, 0, colW, 340);

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(colW, 0, colW, 340);

    ctx.fillStyle = '#ce1126';
    ctx.fillRect(colW * 2, 0, colW, 340);

    // Official Mexican Coat of Arms (Escudo Nacional de México)
    const cx = 256;
    const cy = 170;
    ctx.save();

    // 1. Lake Texcoco / Blue Water Glyphs at base
    ctx.fillStyle = '#0284c7';
    ctx.beginPath();
    ctx.ellipse(cx, cy + 50, 42, 7, 0, 0, Math.PI * 2);
    ctx.fill();

    // Wave ripples in lake
    ctx.strokeStyle = '#bae6fd';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(cx - 18, cy + 50, 10, 0, Math.PI);
    ctx.arc(cx + 18, cy + 50, 10, 0, Math.PI);
    ctx.stroke();

    // 2. Aztec Stone / Rock Island (glifo de la piedra)
    ctx.fillStyle = '#64748b';
    ctx.beginPath();
    ctx.moveTo(cx - 28, cy + 48);
    ctx.lineTo(cx - 22, cy + 34);
    ctx.lineTo(cx + 22, cy + 34);
    ctx.lineTo(cx + 28, cy + 48);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 2;
    ctx.stroke();

    // 3. Prickly Pear Cactus (Nopal) with branches & red tunas (fruits)
    const drawCactusPad = (px: number, py: number, rx: number, ry: number, rot: number) => {
      ctx.save();
      ctx.translate(px, py);
      ctx.rotate(rot);
      ctx.fillStyle = '#15803d';
      ctx.strokeStyle = '#14532d';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Cactus fruit (tuna roja)
      ctx.fillStyle = '#dc2626';
      ctx.beginPath();
      ctx.arc(0, -ry, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    // Central trunk pad
    drawCactusPad(cx, cy + 24, 13, 11, 0);
    // Left branch pad
    drawCactusPad(cx - 16, cy + 18, 11, 9, -0.4);
    // Right branch pad
    drawCactusPad(cx + 16, cy + 18, 11, 9, 0.4);
    // Upper left pad
    drawCactusPad(cx - 22, cy + 6, 9, 8, -0.2);
    // Upper right pad
    drawCactusPad(cx + 22, cy + 6, 9, 8, 0.2);

    // 4. Encircling Oak & Laurel Wreath (Rama de Encino y Laurel)
    ctx.strokeStyle = '#15803d';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(cx, cy + 16, 52, 0.45 * Math.PI, 0.95 * Math.PI);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(cx, cy + 16, 52, 0.05 * Math.PI, 0.55 * Math.PI);
    ctx.stroke();

    // Wreath leaves & golden laurel highlights
    ctx.fillStyle = '#ca8a04';
    for (let a = 0.5 * Math.PI; a <= 0.95 * Math.PI; a += 0.09) {
      const lx = cx + Math.cos(a) * 52;
      const ly = cy + 16 + Math.sin(a) * 52;
      ctx.beginPath();
      ctx.ellipse(lx, ly, 4.5, 2.5, a + 0.3, 0, Math.PI * 2);
      ctx.fill();
    }
    for (let a = 0.05 * Math.PI; a <= 0.5 * Math.PI; a += 0.09) {
      const lx = cx + Math.cos(a) * 52;
      const ly = cy + 16 + Math.sin(a) * 52;
      ctx.beginPath();
      ctx.ellipse(lx, ly, 4.5, 2.5, a - 0.3, 0, Math.PI * 2);
      ctx.fill();
    }

    // Ribbon tying the wreath at the bottom (tricolor bow)
    ctx.fillStyle = '#006847';
    ctx.fillRect(cx - 10, cy + 65, 6, 5);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(cx - 4, cy + 65, 8, 5);
    ctx.fillStyle = '#ce1126';
    ctx.fillRect(cx + 4, cy + 65, 6, 5);
    ctx.strokeStyle = '#ca8a04';
    ctx.lineWidth = 1;
    ctx.strokeRect(cx - 10, cy + 65, 20, 5);

    // 5. Rattlesnake (Serpiente de Cascabel) coiled and held in eagle's beak & talon
    ctx.strokeStyle = '#166534';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(cx + 4, cy - 14); // in eagle's beak
    ctx.quadraticCurveTo(cx + 22, cy - 8, cx + 18, cy + 4);
    ctx.quadraticCurveTo(cx + 14, cy + 16, cx + 4, cy + 12);
    ctx.quadraticCurveTo(cx - 8, cy + 8, cx - 2, cy + 22);
    ctx.stroke();

    // Snake rattle (cascabel)
    ctx.fillStyle = '#d97706';
    ctx.beginPath();
    ctx.arc(cx - 2, cy + 24, 3, 0, Math.PI * 2);
    ctx.fill();

    // 6. Mexican Golden Eagle (Águila Real Mexicana)
    // Tail plumage
    ctx.fillStyle = '#78350f';
    ctx.beginPath();
    ctx.moveTo(cx - 6, cy + 10);
    ctx.lineTo(cx - 16, cy + 26);
    ctx.lineTo(cx - 2, cy + 26);
    ctx.closePath();
    ctx.fill();

    // Eagle Left Leg (standing on cactus pad) & Sharp Talons
    ctx.strokeStyle = '#eab308';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(cx - 6, cy + 14);
    ctx.lineTo(cx - 6, cy + 24);
    ctx.stroke();
    // Talons
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(cx - 6, cy + 24, 2, 0, Math.PI * 2);
    ctx.fill();

    // Eagle Right Leg (gripping the coiled serpent)
    ctx.strokeStyle = '#eab308';
    ctx.beginPath();
    ctx.moveTo(cx + 4, cy + 8);
    ctx.lineTo(cx + 6, cy + 14);
    ctx.stroke();
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(cx + 6, cy + 14, 2, 0, Math.PI * 2);
    ctx.fill();

    // Muscular Body & Breast Plumage
    ctx.fillStyle = '#92400e';
    ctx.beginPath();
    ctx.ellipse(cx - 2, cy + 2, 14, 18, -0.2, 0, Math.PI * 2);
    ctx.fill();

    // Left Wing (Extended with majestic feathers)
    ctx.fillStyle = '#78350f';
    ctx.beginPath();
    ctx.moveTo(cx - 10, cy + 4);
    ctx.lineTo(cx - 36, cy - 18); // Wingtip
    ctx.lineTo(cx - 30, cy - 6);
    ctx.lineTo(cx - 24, cy + 2);
    ctx.lineTo(cx - 12, cy + 8);
    ctx.closePath();
    ctx.fill();

    // Primary wing feathers
    ctx.strokeStyle = '#b45309';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(cx - 10, cy);
    ctx.lineTo(cx - 34, cy - 14);
    ctx.moveTo(cx - 8, cy + 4);
    ctx.lineTo(cx - 28, cy - 2);
    ctx.stroke();

    // Right Wing (Raised upward towards the sky)
    ctx.fillStyle = '#92400e';
    ctx.beginPath();
    ctx.moveTo(cx + 4, cy + 2);
    ctx.lineTo(cx + 34, cy - 22); // High wingtip
    ctx.lineTo(cx + 26, cy - 8);
    ctx.lineTo(cx + 18, cy + 2);
    ctx.lineTo(cx + 8, cy + 8);
    ctx.closePath();
    ctx.fill();

    // Right wing feather detailing
    ctx.beginPath();
    ctx.moveTo(cx + 6, cy);
    ctx.lineTo(cx + 30, cy - 16);
    ctx.moveTo(cx + 8, cy + 4);
    ctx.lineTo(cx + 22, cy - 4);
    ctx.stroke();

    // Neck & Head turned fiercely to the hoist (Left)
    ctx.fillStyle = '#b45309';
    ctx.beginPath();
    ctx.moveTo(cx - 4, cy - 6);
    ctx.lineTo(cx - 14, cy - 20); // Crown / crest feathers
    ctx.lineTo(cx - 8, cy - 24);
    ctx.lineTo(cx + 2, cy - 14);
    ctx.closePath();
    ctx.fill();

    // Sharp Curved Hook Beak
    ctx.fillStyle = '#eab308';
    ctx.beginPath();
    ctx.moveTo(cx - 12, cy - 20);
    ctx.lineTo(cx - 22, cy - 16); // Beak tip hook
    ctx.lineTo(cx - 14, cy - 13);
    ctx.closePath();
    ctx.fill();

    // Eagle Eye
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(cx - 10, cy - 18, 1.8, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(cx - 10.5, cy - 18.5, 0.7, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    return this.finalizeTexture(canvas);
  }

  // 9. Egypt 🇪🇬 (Egyptian Tricolour)
  private createEgyptTexture(): THREE.CanvasTexture {
    const { canvas, ctx } = this.createCanvas(512, 340);
    const bandH = 340 / 3;

    // Red, White, Black horizontal bands
    ctx.fillStyle = '#c8102e';
    ctx.fillRect(0, 0, 512, bandH);

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, bandH, 512, bandH);

    ctx.fillStyle = '#000000';
    ctx.fillRect(0, bandH * 2, 512, bandH);

    // Golden Eagle of Saladin in center white band
    const cx = 256;
    const cy = 170;
    ctx.save();
    ctx.fillStyle = '#c09a35';
    // Eagle Wings & Body
    ctx.beginPath();
    ctx.moveTo(cx - 22, cy + 22);
    ctx.lineTo(cx - 30, cy - 16);
    ctx.lineTo(cx - 14, cy - 10);
    ctx.lineTo(cx, cy - 26); // Head
    ctx.lineTo(cx + 14, cy - 10);
    ctx.lineTo(cx + 30, cy - 16);
    ctx.lineTo(cx + 22, cy + 22);
    ctx.closePath();
    ctx.fill();

    // Shield on Eagle's chest
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.rect(cx - 9, cy - 6, 18, 20);
    ctx.fill();
    ctx.stroke();

    ctx.restore();

    return this.finalizeTexture(canvas);
  }

  // 10. United Arab Emirates 🇦🇪 (UAE Flag)
  private createUaeTexture(): THREE.CanvasTexture {
    const { canvas, ctx } = this.createCanvas(512, 340);

    const hoistW = 512 * 0.25;
    const flyW = 512 - hoistW;
    const bandH = 340 / 3;

    // Right fly bands (Green, White, Black)
    ctx.fillStyle = '#00732f';
    ctx.fillRect(hoistW, 0, flyW, bandH);

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(hoistW, bandH, flyW, bandH);

    ctx.fillStyle = '#000000';
    ctx.fillRect(hoistW, bandH * 2, flyW, bandH);

    // Left vertical hoist band (Red)
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(0, 0, hoistW, 340);

    return this.finalizeTexture(canvas);
  }

  // 11. Switzerland 🇨🇭 (Schweizerfahne / Swiss Cross)
  private createSwitzerlandTexture(): THREE.CanvasTexture {
    const { canvas, ctx } = this.createCanvas(512, 340);

    // Official Swiss Red field (#d52b1e)
    ctx.fillStyle = '#d52b1e';
    ctx.fillRect(0, 0, 512, 340);

    // White Greek Cross (equilateral arms: length is 1/6 longer than width)
    ctx.fillStyle = '#ffffff';
    const cx = 256;
    const cy = 170;
    const armW = 56;
    const armH = 200;

    // Vertical bar
    ctx.fillRect(cx - armW / 2, cy - armH / 2, armW, armH);
    // Horizontal bar
    ctx.fillRect(cx - armH / 2, cy - armW / 2, armH, armW);

    return this.finalizeTexture(canvas);
  }

  // --------------------------------------------------------------------------
  // 3D REAL WAVING CLOTH FLAG GENERATION
  // --------------------------------------------------------------------------


  /**
   * Spawns an authentic 3D waving cloth flag attached to a flagpole.
   * @param country Identifier of national flag
   * @param poleX X coordinate of flagpole mast
   * @param poleY Y coordinate where flag hoists (top of flag attachment)
   * @param poleZ Z coordinate of flagpole mast
   * @param dir Direction the flag extends ('east' extends +X, 'west' extends -X, 'north' extends -Z, 'south' extends +Z)
   * @param scaleMultiplier Size multiplier (default 1.0 -> 3.6m wide x 2.4m high)
   * @param options Optional configuration like skipMast for pre-existing monumental poles
   */
  public addFlag(
    country: CountryFlagId,
    poleX: number,
    poleY: number,
    poleZ: number,
    dir: 'east' | 'west' | 'north' | 'south' = 'east',
    scaleMultiplier = 1.0,
    options?: AddFlagOptions
  ): FlagInstance {
    const width = 3.6 * scaleMultiplier;
    const height = 2.4 * scaleMultiplier;
    const segX = Math.round(28 * Math.min(scaleMultiplier, 2));
    const segY = Math.round(16 * Math.min(scaleMultiplier, 2));

    // Plane geometry translated so that local X = 0 is the hoist edge attached to the pole
    const geometry = new THREE.PlaneGeometry(width, height, segX, segY);
    geometry.translate(width / 2, -height / 2, 0);

    // Store un-deformed base positions
    const posAttr = geometry.attributes.position;
    const basePositions = new Float32Array(posAttr.array.length);
    basePositions.set(posAttr.array);

    const texture = this.textures.get(country) || this.textures.get('india')!;
    const material = new THREE.MeshLambertMaterial({
      map: texture,
      side: THREE.DoubleSide
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(poleX, poleY, poleZ);

    if (dir === 'east') {
      mesh.rotation.y = 0;
    } else if (dir === 'west') {
      mesh.rotation.y = Math.PI;
    } else if (dir === 'north') {
      mesh.rotation.y = Math.PI / 2;
    } else if (dir === 'south') {
      mesh.rotation.y = -Math.PI / 2;
    }

    if (!options?.skipMast) {
      // ------------------------------------------------------------------------
      // Sleek, Authentic Thin Stainless Steel Flagpole Mast
      // ------------------------------------------------------------------------
      const baseY = (poleY > 20) ? 19.5 : (poleZ < -110 && poleX > 60 ? 4.0 : 1.0);
      const poleHeight = (poleY + 0.45) - baseY;
      const mastY = baseY + poleHeight / 2;

      const mastGeo = new THREE.CylinderGeometry(0.045, 0.07, poleHeight, 16);
      const mastMat = new THREE.MeshStandardMaterial({
        color: 0xe2e8f0,
        metalness: 0.92,
        roughness: 0.18
      });
      const mastMesh = new THREE.Mesh(mastGeo, mastMat);
      mastMesh.position.set(poleX, mastY, poleZ);
      this.scene.add(mastMesh);

      // Polished Golden Spherical Finial Ball at top of mast
      const finialGeo = new THREE.SphereGeometry(0.12 * scaleMultiplier, 16, 16);
      const finialMat = new THREE.MeshStandardMaterial({
        color: 0xfbbf24,
        metalness: 0.95,
        roughness: 0.15
      });
      const finialMesh = new THREE.Mesh(finialGeo, finialMat);
      finialMesh.position.set(poleX, poleY + 0.45, poleZ);
      this.scene.add(finialMesh);

      // Circular Metal Collar / Pedestal at base
      const baseGeo = new THREE.CylinderGeometry(0.2, 0.28, 0.35, 16);
      const baseMesh = new THREE.Mesh(baseGeo, mastMat);
      baseMesh.position.set(poleX, baseY + 0.175, poleZ);
      this.scene.add(baseMesh);

      // Thin White Halyard Rope
      const ropeGeo = new THREE.CylinderGeometry(0.006, 0.006, poleHeight - 0.2, 8);
      const ropeMat = new THREE.MeshLambertMaterial({ color: 0xf8fafc });
      const ropeMesh = new THREE.Mesh(ropeGeo, ropeMat);
      const ropeOffset = (dir === 'east' || dir === 'west') ? new THREE.Vector3(0, 0, 0.06) : new THREE.Vector3(0.06, 0, 0);
      ropeMesh.position.set(poleX + ropeOffset.x, mastY, poleZ + ropeOffset.z);
      this.scene.add(ropeMesh);
    } else {
      // Sleek halyard bracket mounts connecting flag grommets to existing structure
      const bracketMat = new THREE.MeshStandardMaterial({
        color: 0xcfd8dc,
        metalness: 0.85,
        roughness: 0.2
      });
      const bracketGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.3, 12);
      bracketGeo.rotateZ(Math.PI / 2);

      const topBracket = new THREE.Mesh(bracketGeo, bracketMat);
      topBracket.position.set(poleX, poleY - 0.1, poleZ);
      this.scene.add(topBracket);

      const bottomBracket = new THREE.Mesh(bracketGeo, bracketMat);
      bottomBracket.position.set(poleX, poleY - height + 0.1, poleZ);
      this.scene.add(bottomBracket);
    }

    this.scene.add(mesh);

    const flagInstance: FlagInstance = {
      mesh,
      geometry,
      basePositions,
      width,
      phase: Math.random() * Math.PI * 2
    };

    this.flags.push(flagInstance);
    return flagInstance;
  }

  // --------------------------------------------------------------------------
  // PHYSICAL CLOTH WAVE SIMULATION TICK
  // --------------------------------------------------------------------------
  public update(time: number, playerPos?: THREE.Vector3) {
    for (let f = 0; f < this.flags.length; f++) {
      const flag = this.flags[f];
      if (playerPos) {
        const dx = flag.mesh.position.x - playerPos.x;
        const dz = flag.mesh.position.z - playerPos.z;
        if (dx * dx + dz * dz > 3600) {
          continue;
        }
      }
      const posAttr = flag.geometry.attributes.position;
      const pos = posAttr.array as Float32Array;
      const base = flag.basePositions;
      const count = pos.length / 3;

      const scaleAmp = Math.min(1.8, Math.max(1.0, flag.width / 3.6));

      for (let i = 0; i < count; i++) {
        const bx = base[i * 3];
        const by = base[i * 3 + 1];

        // u in [0, 1]: distance along cloth from hoist (pole) to fly edge
        const u = Math.max(0, Math.min(1, bx / flag.width));

        // Primary aerodynamic traveling wind wave + high-frequency ripple
        const primaryWave = Math.sin(u * 5.2 - time * 4.6 + flag.phase) * (0.24 * u * scaleAmp);
        const flutterWave = Math.cos(u * 9.0 - time * 6.8 + flag.phase * 1.6) * (0.07 * u * u * scaleAmp);

        // Vertical breathing flutter
        const verticalFlutter = Math.sin(u * 3.6 - time * 3.8 + flag.phase) * (0.04 * u * scaleAmp);

        // Natural cloth foreshortening
        const zDisplace = primaryWave + flutterWave;
        const xDisplace = bx - (zDisplace * zDisplace) * 0.12;

        pos[i * 3] = xDisplace;
        pos[i * 3 + 1] = by + verticalFlutter;
        pos[i * 3 + 2] = zDisplace;
      }

      posAttr.needsUpdate = true;
    }
  }

  public getTexture(country: CountryFlagId): THREE.CanvasTexture | undefined {
    return this.textures.get(country);
  }
}
