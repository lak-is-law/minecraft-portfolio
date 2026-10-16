import * as THREE from 'three';
import { sound } from '../engine/audio';

// -------------------------------------------------------------
// PROCEDURAL CANVAS TEXTURE GENERATORS
// -------------------------------------------------------------
function createProceduralTexture(
  width: number,
  height: number,
  drawFn: (ctx: CanvasRenderingContext2D) => void
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;
  drawFn(ctx);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// 1. McQueen Rust-eze Hood Badge
function createMcQueenHoodTexture(): THREE.CanvasTexture {
  return createProceduralTexture(512, 512, (ctx) => {
    // Shimmering racing red background
    ctx.fillStyle = '#cc111a';
    ctx.fillRect(0, 0, 512, 512);

    // Large outer Rust-eze oval
    ctx.save();
    ctx.translate(256, 260);

    // Outer drop shadow
    ctx.beginPath();
    ctx.ellipse(0, 4, 210, 140, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.fill();

    // Outer gold ring
    ctx.beginPath();
    ctx.ellipse(0, 0, 206, 136, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#facc15';
    ctx.fill();

    // Inner dark red base
    ctx.beginPath();
    ctx.ellipse(0, 0, 192, 122, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#8b0000';
    ctx.fill();

    // Oval gradient
    const grad = ctx.createLinearGradient(0, -120, 0, 120);
    grad.addColorStop(0, '#be123c');
    grad.addColorStop(0.5, '#991b1b');
    grad.addColorStop(1, '#450a0a');
    ctx.fillStyle = grad;
    ctx.fill();

    // Decorative inner gold pinstripe
    ctx.beginPath();
    ctx.ellipse(0, 0, 180, 110, 0, 0, Math.PI * 2);
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 4;
    ctx.stroke();

    // Subtitle top banner: "MEDICATED BUMPER OINTMENT"
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 15px sans-serif';
    ctx.textAlign = 'center';
    ctx.letterSpacing = '3px';
    ctx.fillText('MEDICATED BUMPER OINTMENT', 0, -68);

    // Main "Rust-eze" stylized text
    ctx.save();
    ctx.shadowColor = '#000000';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetY = 4;
    ctx.fillStyle = '#fef08a';
    ctx.font = 'italic 900 64px "Impact", "Arial Black", sans-serif';
    ctx.scale(1.0, 1.15);
    ctx.fillText('Rust-eze', 0, 10);
    ctx.restore();

    // Bottom slogan: "REAR END FORMULA"
    ctx.fillStyle = '#fef08a';
    ctx.font = 'bold 14px sans-serif';
    ctx.letterSpacing = '2px';
    ctx.fillText('★ REAR END FORMULA ★', 0, 52);

    // Small #95 logo at bottom
    ctx.fillStyle = '#ffffff';
    ctx.font = 'italic 900 24px "Impact", sans-serif';
    ctx.fillText('#95', 0, 84);

    ctx.restore();
  });
}

// 2. McQueen Side Lightning Bolt & #95 Livery
function createMcQueenSideTexture(isRight: boolean): THREE.CanvasTexture {
  return createProceduralTexture(512, 256, (ctx) => {
    // Red base
    ctx.fillStyle = '#cc111a';
    ctx.fillRect(0, 0, 512, 256);

    ctx.save();
    if (isRight) {
      ctx.translate(512, 0);
      ctx.scale(-1, 1);
    }

    // Fiery orange/yellow gradient for the signature sweeping lightning bolt
    const fireGrad = ctx.createLinearGradient(60, 180, 480, 60);
    fireGrad.addColorStop(0, '#f97316'); // fiery orange
    fireGrad.addColorStop(0.4, '#fbbf24'); // amber
    fireGrad.addColorStop(0.8, '#fde047'); // bright yellow
    fireGrad.addColorStop(1, '#ffffff'); // tip sparkle

    // Dark red/black drop shadow for bolt
    ctx.beginPath();
    ctx.moveTo(30, 205);
    ctx.lineTo(210, 145);
    ctx.lineTo(190, 165);
    ctx.lineTo(360, 95);
    ctx.lineTo(340, 115);
    ctx.lineTo(485, 45);
    ctx.lineTo(370, 75);
    ctx.lineTo(385, 60);
    ctx.lineTo(230, 125);
    ctx.lineTo(250, 105);
    ctx.closePath();
    ctx.fillStyle = 'rgba(70, 5, 10, 0.7)';
    ctx.fill();

    // Main jagged lightning bolt
    ctx.beginPath();
    ctx.moveTo(35, 195);
    ctx.lineTo(215, 135);
    ctx.lineTo(195, 155);
    ctx.lineTo(365, 85);
    ctx.lineTo(345, 105);
    ctx.lineTo(490, 35);
    ctx.lineTo(375, 65);
    ctx.lineTo(390, 50);
    ctx.lineTo(235, 115);
    ctx.lineTo(255, 95);
    ctx.closePath();
    ctx.fillStyle = fireGrad;
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Bold, dynamic angled "#95"
    ctx.save();
    ctx.translate(210, 175);
    ctx.transform(1, 0, -0.28, 1, 0, 0); // Speed skew angle

    // Drop shadow
    ctx.fillStyle = '#450a0a';
    ctx.font = 'italic 900 115px "Impact", "Arial Black", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('95', 4, 4);

    // Red inner stroke
    ctx.strokeStyle = '#991b1b';
    ctx.lineWidth = 14;
    ctx.strokeText('95', 0, 0);

    // Yellow fill
    ctx.fillStyle = '#fde047';
    ctx.fillText('95', 0, 0);

    // Inner highlight
    ctx.fillStyle = '#fef08a';
    ctx.font = 'italic 900 108px "Impact", sans-serif';
    ctx.fillText('95', -2, -2);
    ctx.restore();

    // Piston Cup & Contingency Sponsor Stickers along lower front fender
    const sponsors = [
      { color: '#0284c7', text: 'DINOCO' },
      { color: '#eab308', text: 'OCTANE' },
      { color: '#16a34a', text: 'VITOLINE' },
      { color: '#9333ea', text: 'NITROADE' }
    ];
    sponsors.forEach((sp, i) => {
      const bx = 30 + i * 40;
      ctx.fillStyle = sp.color;
      ctx.fillRect(bx, 222, 34, 16);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 7px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(sp.text, bx + 17, 233);
    });

    // Piston Cup Trophy icon decal
    ctx.fillStyle = '#facc15';
    ctx.beginPath();
    ctx.arc(430, 215, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#854d0e';
    ctx.font = 'bold 10px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('🏆', 430, 219);

    ctx.restore();
  });
}

// 3. McQueen Roof #95 Livery
function createMcQueenRoofTexture(): THREE.CanvasTexture {
  return createProceduralTexture(512, 512, (ctx) => {
    ctx.fillStyle = '#cc111a';
    ctx.fillRect(0, 0, 512, 512);

    ctx.save();
    ctx.translate(256, 256);
    ctx.rotate(Math.PI / 2); // Oriented towards crowd / overhead cam
    ctx.transform(1, 0, -0.2, 1, 0, 0);

    // Drop shadow
    ctx.fillStyle = '#450a0a';
    ctx.font = 'italic 900 240px "Impact", "Arial Black", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('95', 8, 8);

    // Red thick outline
    ctx.strokeStyle = '#881337';
    ctx.lineWidth = 26;
    ctx.strokeText('95', 0, 0);

    // Bright yellow fill
    ctx.fillStyle = '#fde047';
    ctx.fillText('95', 0, 0);
    ctx.restore();
  });
}

// 4. McQueen Expressive Pixar Cars Windshield Eyes
function createMcQueenEyesTexture(): THREE.CanvasTexture {
  return createProceduralTexture(512, 256, (ctx) => {
    // Red roof sunvisor strip on top
    ctx.fillStyle = '#cc111a';
    ctx.fillRect(0, 0, 512, 256);

    // White eye glass area
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.roundRect(24, 38, 464, 200, 32);
    ctx.fill();

    // Top sun visor banner
    ctx.fillStyle = '#991b1b';
    ctx.fillRect(24, 38, 464, 42);
    ctx.fillStyle = '#facc15';
    ctx.font = 'italic 900 26px "Impact", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('RUST-EZE RACING', 256, 68);

    // Draw the two expressive sky-blue eyes
    const eyeCenters = [170, 342];
    for (const cx of eyeCenters) {
      // Sclera subtle shade
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, 160, 68, 0, Math.PI * 2);
      ctx.clip();

      // Sky-blue Iris
      const irisGrad = ctx.createRadialGradient(cx + 4, 155, 10, cx, 160, 58);
      irisGrad.addColorStop(0, '#7dd3fc');
      irisGrad.addColorStop(0.5, '#0284c7');
      irisGrad.addColorStop(1, '#0369a1');
      ctx.fillStyle = irisGrad;
      ctx.beginPath();
      ctx.arc(cx, 160, 58, 0, Math.PI * 2);
      ctx.fill();

      // Iris outer dark ring
      ctx.strokeStyle = '#0c4a6e';
      ctx.lineWidth = 4;
      ctx.stroke();

      // Pupil
      ctx.fillStyle = '#090d16';
      ctx.beginPath();
      ctx.arc(cx + 2, 160, 32, 0, Math.PI * 2);
      ctx.fill();

      // Primary Specular Catchlight Sparkle (Pixar signature glint)
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(cx + 14, 146, 12, 0, Math.PI * 2);
      ctx.fill();

      // Secondary soft glint
      ctx.beginPath();
      ctx.arc(cx - 10, 172, 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // Arched, determined champion red eyelid
      ctx.beginPath();
      ctx.moveTo(cx - 75, 95);
      // Cheeky asymmetric tilt for cocky smirk
      const archY = cx < 250 ? 122 : 116;
      ctx.quadraticCurveTo(cx, archY, cx + 75, 102);
      ctx.lineTo(cx + 75, 80);
      ctx.lineTo(cx - 75, 80);
      ctx.closePath();
      ctx.fillStyle = '#cc111a';
      ctx.fill();
      ctx.strokeStyle = '#7f1d1d';
      ctx.lineWidth = 3;
      ctx.stroke();
    }
  });
}

// 5. McQueen Pearlescent Smirk Grille & Headlight Stickers
function createMcQueenFrontBumperTexture(): THREE.CanvasTexture {
  return createProceduralTexture(512, 256, (ctx) => {
    // Red bumper
    ctx.fillStyle = '#cc111a';
    ctx.fillRect(0, 0, 512, 256);

    // Headlight stickers ("Stickers! Race cars don't need headlights!")
    const hls = [
      { x: 40, w: 90, flip: false },
      { x: 382, w: 90, flip: true }
    ];
    for (const h of hls) {
      ctx.save();
      ctx.translate(h.x + 45, 65);
      if (h.flip) ctx.scale(-1, 1);

      // Yellow sticker backing
      ctx.fillStyle = '#fde047';
      ctx.beginPath();
      ctx.roundRect(-45, -28, 90, 56, 14);
      ctx.fill();
      ctx.strokeStyle = '#ca8a04';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Faux reflector lightning pattern
      ctx.fillStyle = '#ea580c';
      ctx.beginPath();
      ctx.moveTo(-35, 10);
      ctx.lineTo(0, -18);
      ctx.lineTo(5, -6);
      ctx.lineTo(38, -22);
      ctx.lineTo(12, 14);
      ctx.lineTo(5, 4);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    }

    // McQueen's trademark confident grin / pearlescent white teeth
    ctx.save();
    ctx.translate(256, 175);

    // Dark mouth opening (slight cheeky asymmetric tilt)
    ctx.beginPath();
    ctx.moveTo(-130, -5);
    ctx.quadraticCurveTo(0, 55, 130, 8);
    ctx.quadraticCurveTo(0, 32, -130, -5);
    ctx.fillStyle = '#1c1917';
    ctx.fill();

    // Pearlescent Upper Teeth
    ctx.beginPath();
    ctx.moveTo(-115, -4);
    ctx.quadraticCurveTo(0, 34, 115, 6);
    ctx.lineTo(110, 16);
    ctx.quadraticCurveTo(0, 42, -110, 8);
    ctx.closePath();
    ctx.fillStyle = '#f8fafc';
    ctx.fill();

    // Individual tooth separations
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 2;
    for (let t = -80; t <= 80; t += 24) {
      ctx.beginPath();
      ctx.moveTo(t, 6);
      ctx.lineTo(t, 22);
      ctx.stroke();
    }

    ctx.restore();
  });
}

// 6. McQueen Spoiler "Rust-eze" Banner
function createMcQueenSpoilerTexture(): THREE.CanvasTexture {
  return createProceduralTexture(512, 128, (ctx) => {
    ctx.fillStyle = '#cc111a';
    ctx.fillRect(0, 0, 512, 128);

    // Center gold banner
    ctx.fillStyle = '#facc15';
    ctx.fillRect(16, 16, 480, 96);

    ctx.fillStyle = '#8b0000';
    ctx.fillRect(22, 22, 468, 84);

    ctx.fillStyle = '#fde047';
    ctx.font = 'italic 900 56px "Impact", "Arial Black", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Rust-eze', 256, 82);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText('★ 95 ★', 60, 72);
    ctx.fillText('★ 95 ★', 452, 72);
  });
}

// 7. Lightyear Racing Tire Sidewall
function createTireSidewallTexture(): THREE.CanvasTexture {
  return createProceduralTexture(256, 256, (ctx) => {
    ctx.fillStyle = '#171717';
    ctx.fillRect(0, 0, 256, 256);

    // Rubber ring
    ctx.beginPath();
    ctx.arc(128, 128, 120, 0, Math.PI * 2);
    ctx.fillStyle = '#1c1917';
    ctx.fill();

    // Yellow outer pinstripe
    ctx.beginPath();
    ctx.arc(128, 128, 108, 0, Math.PI * 2);
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 3;
    ctx.stroke();

    // "LIGHTYEAR" lettering on top and bottom
    ctx.save();
    ctx.translate(128, 128);

    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 18px "Impact", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('L I G H T Y E A R', 0, -82);

    ctx.rotate(Math.PI);
    ctx.fillStyle = '#facc15';
    ctx.fillText('L I G H T Y E A R', 0, -82);
    ctx.restore();

    // Inner rim hole
    ctx.beginPath();
    ctx.arc(128, 128, 64, 0, Math.PI * 2);
    ctx.fillStyle = '#cc111a';
    ctx.fill();
    ctx.strokeStyle = '#991b1b';
    ctx.lineWidth = 4;
    ctx.stroke();

    // Yellow center lug nut
    ctx.beginPath();
    ctx.arc(128, 128, 18, 0, Math.PI * 2);
    ctx.fillStyle = '#facc15';
    ctx.fill();
  });
}

// -------------------------------------------------------------
// DOC HUDSON (#51 FABULOUS HUDSON HORNET) TEXTURES
// -------------------------------------------------------------
function createDocHudsonSideTexture(isRight: boolean): THREE.CanvasTexture {
  return createProceduralTexture(512, 256, (ctx) => {
    // Midnight Blue classic Hornet finish
    ctx.fillStyle = '#0f2438';
    ctx.fillRect(0, 0, 512, 256);

    ctx.save();
    if (isRight) {
      ctx.translate(512, 0);
      ctx.scale(-1, 1);
    }

    // Classic chrome body spear along mid-belt
    const chromeGrad = ctx.createLinearGradient(0, 130, 0, 138);
    chromeGrad.addColorStop(0, '#f1f5f9');
    chromeGrad.addColorStop(0.5, '#94a3b8');
    chromeGrad.addColorStop(1, '#e2e8f0');
    ctx.fillStyle = chromeGrad;
    ctx.fillRect(20, 132, 472, 8);

    // Elegant gold cursive lettering: "The Fabulous Hudson Hornet"
    ctx.save();
    ctx.translate(220, 95);
    ctx.font = 'italic bold 28px "Georgia", "Times New Roman", serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#facc15';
    ctx.shadowColor = '#000000';
    ctx.shadowBlur = 6;
    ctx.fillText('The Fabulous', 0, -18);
    ctx.font = 'italic 900 34px "Georgia", "Impact", serif';
    ctx.fillText('HUDSON HORNET', 0, 16);
    ctx.restore();

    // Bold Gold Racing #51 on door
    ctx.save();
    ctx.translate(220, 192);
    ctx.fillStyle = '#020617';
    ctx.font = 'italic 900 95px "Georgia", "Impact", serif';
    ctx.textAlign = 'center';
    ctx.fillText('51', 4, 4);

    ctx.strokeStyle = '#92400e';
    ctx.lineWidth = 10;
    ctx.strokeText('51', 0, 0);

    ctx.fillStyle = '#facc15';
    ctx.fillText('51', 0, 0);
    ctx.restore();

    // Twin H-Power emblem badge near front fender
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(400, 150, 48, 22);
    ctx.fillStyle = '#b91c1c';
    ctx.font = 'bold 9px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('TWIN H', 424, 164);

    ctx.restore();
  });
}

function createDocHudsonRoofTexture(): THREE.CanvasTexture {
  return createProceduralTexture(512, 512, (ctx) => {
    ctx.fillStyle = '#0f2438';
    ctx.fillRect(0, 0, 512, 512);

    ctx.save();
    ctx.translate(256, 256);
    ctx.rotate(Math.PI / 2);

    ctx.fillStyle = '#020617';
    ctx.font = 'italic 900 210px "Georgia", "Impact", serif';
    ctx.textAlign = 'center';
    ctx.fillText('51', 8, 8);

    ctx.strokeStyle = '#92400e';
    ctx.lineWidth = 22;
    ctx.strokeText('51', 0, 0);

    ctx.fillStyle = '#facc15';
    ctx.fillText('51', 0, 0);
    ctx.restore();
  });
}

function createDocHudsonEyesTexture(): THREE.CanvasTexture {
  return createProceduralTexture(512, 256, (ctx) => {
    // Midnight blue roof visor
    ctx.fillStyle = '#0f2438';
    ctx.fillRect(0, 0, 512, 256);

    // Windshield white glass
    ctx.fillStyle = '#f1f5f9';
    ctx.beginPath();
    ctx.roundRect(24, 44, 464, 190, 24);
    ctx.fill();

    // Vintage split windshield center chrome post
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(252, 44, 8, 190);

    // Doc Hudson's wise, calm, intense eyes (warm amber/brown irises)
    const eyeCenters = [156, 356];
    for (const cx of eyeCenters) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, 150, 60, 0, Math.PI * 2);
      ctx.clip();

      const irisGrad = ctx.createRadialGradient(cx, 150, 8, cx, 150, 52);
      irisGrad.addColorStop(0, '#d97706'); // warm amber
      irisGrad.addColorStop(0.6, '#92400e');
      irisGrad.addColorStop(1, '#451a03'); // deep brown
      ctx.fillStyle = irisGrad;
      ctx.beginPath();
      ctx.arc(cx, 150, 52, 0, Math.PI * 2);
      ctx.fill();

      // Pupil
      ctx.fillStyle = '#0a0a0a';
      ctx.beginPath();
      ctx.arc(cx, 150, 28, 0, Math.PI * 2);
      ctx.fill();

      // Glint
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(cx + 12, 138, 9, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // Doc's experienced, seasoned eyelids
      ctx.beginPath();
      ctx.moveTo(cx - 65, 96);
      ctx.quadraticCurveTo(cx, 126, cx + 65, 98);
      ctx.lineTo(cx + 65, 80);
      ctx.lineTo(cx - 65, 80);
      ctx.closePath();
      ctx.fillStyle = '#0f2438';
      ctx.fill();
      ctx.strokeStyle = '#020617';
      ctx.lineWidth = 3;
      ctx.stroke();
    }
  });
}

function createDocHudsonFrontGrilleTexture(): THREE.CanvasTexture {
  return createProceduralTexture(512, 256, (ctx) => {
    ctx.fillStyle = '#0f2438';
    ctx.fillRect(0, 0, 512, 256);

    // Classic 1951 Hudson horizontal waterfall chrome grille
    ctx.save();
    ctx.translate(256, 160);

    ctx.fillStyle = '#020617';
    ctx.beginPath();
    ctx.roundRect(-180, -45, 360, 90, 16);
    ctx.fill();

    // Chrome horizontal slats
    for (let y = -36; y <= 36; y += 12) {
      const g = ctx.createLinearGradient(0, y - 4, 0, y + 4);
      g.addColorStop(0, '#ffffff');
      g.addColorStop(0.5, '#94a3b8');
      g.addColorStop(1, '#e2e8f0');
      ctx.fillStyle = g;
      ctx.fillRect(-170, y - 4, 340, 8);
    }

    // Hudson Triangle Crest Emblem in center
    ctx.fillStyle = '#dc2626';
    ctx.beginPath();
    ctx.moveTo(0, -38);
    ctx.lineTo(24, 8);
    ctx.lineTo(-24, 8);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.restore();

    // Round vintage headlights with chrome bezels
    for (const hx of [70, 442]) {
      ctx.beginPath();
      ctx.arc(hx, 95, 36, 0, Math.PI * 2);
      ctx.fillStyle = '#f8fafc';
      ctx.fill();
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 8;
      ctx.stroke();
    }
  });
}

// -------------------------------------------------------------
// RACE CHALLENGE STATE INTERFACE
// -------------------------------------------------------------
export interface RaceChallengeState {
  active: boolean;
  state: 'countdown' | 'racing' | 'finished';
  countdownTimer: number; // 4.2 -> 0.0
  countdownStage: number; // 1 (Red 1), 2 (Red 2), 3 (Yellow), 4 (Green/GO)
  playerLap: number; // 1, 2
  docLap: number;
  totalLaps: number;
  playerProgress: number; // 0..1
  docProgress: number; // 0..1
  playerPosition: number; // 1 for P1, 2 for P2
  playerSectors: number[]; // [1, 2, 3] sectors cleared
  elapsedTime: number;
  winner: 'player' | 'doc' | null;
  finishBannerTimer: number;
}

// -------------------------------------------------------------
// LIGHTNING McQUEEN & DOC HUDSON MANAGER
// -------------------------------------------------------------
export class LightningMcQueenManager {
  public scene: THREE.Scene;

  // Lightning McQueen 3D Root
  public group: THREE.Group;
  public bodyMesh: THREE.Group;
  private wheels: THREE.Mesh[] = [];
  private frontWheelPivots: THREE.Group[] = [];
  private wheelRotation: number = 0;

  // Doc Hudson 3D Root
  public hudsonGroup: THREE.Group;
  public hudsonBodyMesh: THREE.Group;
  private hudsonWheels: THREE.Mesh[] = [];
  private hudsonFrontWheelPivots: THREE.Group[] = [];
  private hudsonWheelRotation: number = 0;
  private hudsonTrackProgress: number = 0;
  private hudsonSpeed: number = 21.0;
  private hudsonDriftAngle: number = 0;
  private hudsonBodyRoll: number = 0;
  public isHudsonRacing: boolean = false;

  // Particle systems
  private tireSmokeParticles: THREE.Points;
  private smokePositions: Float32Array;
  private smokeVelocities: THREE.Vector3[] = [];
  private smokeLifetimes: number[] = [];

  private exhaustFlames: THREE.Points;
  private flamePositions: Float32Array;
  private flameLifetimes: number[] = [];

  // Race circuit track spline
  public trackCurve: THREE.CatmullRomCurve3;
  private trackProgress: number = 0; // 0..1 along loop
  private trackLength: number = 1;
  private currentSpeed: number = 20.0; // blocks/sec

  // Visual dynamics
  private bodyRoll: number = 0;
  private bodyPitch: number = 0;
  private driftAngle: number = 0;
  private engineSoundTimer: number = 0;

  // Driving State
  public isPlayerDriving: boolean = false;
  public manualHeading: number = 0;
  public manualSpeed: number = 0;

  // Race Challenge vs Doc Hudson
  public raceState: RaceChallengeState = {
    active: false,
    state: 'countdown',
    countdownTimer: 4.2,
    countdownStage: 1,
    playerLap: 1,
    docLap: 1,
    totalLaps: 2,
    playerProgress: 0,
    docProgress: 0,
    playerPosition: 1,
    playerSectors: [],
    elapsedTime: 0,
    winner: null,
    finishBannerTimer: 0
  };

  private lastCountdownStage: number = 0;
  private playerCheckpoints: Set<number> = new Set();
  private docCheckpoints: Set<number> = new Set();

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.group = new THREE.Group();
    this.bodyMesh = new THREE.Group();

    this.hudsonGroup = new THREE.Group();
    this.hudsonBodyMesh = new THREE.Group();

    // 1. Build authentic, wide, unobstructed race circuit spline
    // Perfect alignment with the repaired raceway track centerline (X in [172, 228], Z in [-54, -12])
    const waypoints = [
      new THREE.Vector3(190, 2.05, -15), // Start / Finish line (Gantry)
      new THREE.Vector3(208, 2.05, -15), // Main Straight acceleration
      new THREE.Vector3(218, 2.05, -16), // Turn 1 entry
      new THREE.Vector3(224, 2.05, -22), // Ocean Turn apex 1
      new THREE.Vector3(224, 2.05, -33), // Ocean Turn mid
      new THREE.Vector3(224, 2.05, -44), // Ocean Turn apex 2
      new THREE.Vector3(218, 2.05, -50), // Turn 2 exit
      new THREE.Vector3(208, 2.05, -51), // Canyon Back Straight
      new THREE.Vector3(196, 2.05, -51), // Canyon Back Straight mid
      new THREE.Vector3(184, 2.05, -51), // Canyon Back Straight braking zone
      new THREE.Vector3(178, 2.05, -50), // Turn 3 entry
      new THREE.Vector3(176, 2.05, -44), // West Hairpin apex 1
      new THREE.Vector3(176, 2.05, -33), // West Hairpin mid (Willy's Butte)
      new THREE.Vector3(176, 2.05, -22), // West Hairpin apex 2
      new THREE.Vector3(178, 2.05, -16), // Turn 4 exit
      new THREE.Vector3(184, 2.05, -15)  // Main Straight entry
    ];
    this.trackCurve = new THREE.CatmullRomCurve3(waypoints, true, 'centripetal', 0.5);
    this.trackLength = this.trackCurve.getLength();

    // 2. Build 3D Lightning McQueen movie-authentic model
    this.buildLightningMcQueenModel();

    // 3. Build 3D Doc Hudson #51 Fabulous Hudson Hornet model
    this.buildDocHudsonModel();

    // 4. Setup particle systems (tire drift smoke & exhaust flames)
    const { smoke, smokePositions, smokeVel, smokeLife } = this.createTireSmokeSystem();
    this.tireSmokeParticles = smoke;
    this.smokePositions = smokePositions;
    this.smokeVelocities = smokeVel;
    this.smokeLifetimes = smokeLife;
    this.scene.add(this.tireSmokeParticles);

    const { flames, flamePositions, flameLife } = this.createExhaustFlameSystem();
    this.exhaustFlames = flames;
    this.flamePositions = flamePositions;
    this.flameLifetimes = flameLife;
    this.scene.add(this.exhaustFlames);

    this.group.add(this.bodyMesh);
    this.scene.add(this.group);

    this.hudsonGroup.add(this.hudsonBodyMesh);
    this.scene.add(this.hudsonGroup);

    // Initial position on starting grid (Inside Pole Position for McQueen)
    this.group.position.set(186, 2.05, -16.5);
    this.group.rotation.y = Math.PI / 2;
    this.trackProgress = 0.98;

    // Initial position on starting grid (Lane 2 for Doc Hudson)
    this.hudsonGroup.position.set(186, 2.05, -13.5);
    this.hudsonGroup.rotation.y = Math.PI / 2;
    this.hudsonTrackProgress = 0.94;
    this.isHudsonRacing = true; // Both cars active on track!
  }

  // -------------------------------------------------------------
  // BUILD MOVIE-ACCURATE 3D LIGHTNING McQUEEN (#95)
  // -------------------------------------------------------------
  private buildLightningMcQueenModel() {
    // Generate authentic procedural decals
    const hoodTex = createMcQueenHoodTexture();
    const sideLeftTex = createMcQueenSideTexture(false);
    const sideRightTex = createMcQueenSideTexture(true);
    const roofTex = createMcQueenRoofTexture();
    const eyesTex = createMcQueenEyesTexture();
    const mouthTex = createMcQueenFrontBumperTexture();
    const spoilerTex = createMcQueenSpoilerTexture();
    const tireTex = createTireSidewallTexture();

    // Shimmering automotive cherry racing red
    const carRedMat = new THREE.MeshStandardMaterial({
      color: 0xcc111a,
      roughness: 0.18,
      metalness: 0.35
    });
    // Dark red underbody skirt & diffusers
    const darkRedMat = new THREE.MeshStandardMaterial({
      color: 0x8b0811,
      roughness: 0.35,
      metalness: 0.25
    });
    // Chrome for side exhaust pipes
    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      roughness: 0.12,
      metalness: 0.92
    });

    // Decal materials
    const hoodMat = new THREE.MeshBasicMaterial({ map: hoodTex });
    const sideLeftMat = new THREE.MeshBasicMaterial({ map: sideLeftTex });
    const sideRightMat = new THREE.MeshBasicMaterial({ map: sideRightTex });
    const roofMat = new THREE.MeshBasicMaterial({ map: roofTex });
    const eyesMat = new THREE.MeshBasicMaterial({ map: eyesTex });
    const mouthMat = new THREE.MeshBasicMaterial({ map: mouthTex });
    const spoilerMat = new THREE.MeshBasicMaterial({ map: spoilerTex });
    const tireSidewallMat = new THREE.MeshBasicMaterial({ map: tireTex });
    const tireTreadMat = new THREE.MeshStandardMaterial({ color: 0x171717, roughness: 0.85, metalness: 0.1 });

    // 1. Aerodynamic Chassis Floor & Lower Skirts
    const chassis = new THREE.Mesh(new THREE.BoxGeometry(1.72, 0.22, 3.48), darkRedMat);
    chassis.position.y = 0.22;
    this.bodyMesh.add(chassis);

    // Front Air Dam Splitter with flared aerodynamic corners
    const frontSplitter = new THREE.Mesh(new THREE.BoxGeometry(1.76, 0.1, 0.45), darkRedMat);
    frontSplitter.position.set(0, 0.14, 1.84);
    this.bodyMesh.add(frontSplitter);

    // Rear Downforce Diffuser
    const rearDiffuser = new THREE.Mesh(new THREE.BoxGeometry(1.68, 0.14, 0.38), darkRedMat);
    rearDiffuser.position.set(0, 0.18, -1.74);
    rearDiffuser.rotation.x = -0.15;
    this.bodyMesh.add(rearDiffuser);

    // 2. Sculpted Stock Car Main Body Hull
    const mainBody = new THREE.Mesh(new THREE.BoxGeometry(1.66, 0.44, 3.24), carRedMat);
    mainBody.position.set(0, 0.52, -0.05);
    this.bodyMesh.add(mainBody);

    // Flared Aerodynamic Front Fenders
    for (const sx of [-0.85, 0.85]) {
      const fender = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.38, 1.2), carRedMat);
      fender.position.set(sx, 0.5, 1.15);
      this.bodyMesh.add(fender);
    }

    // Curvaceous Rear Haunches / Muscle Fenders
    for (const sx of [-0.86, 0.86]) {
      const haunch = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.42, 1.25), carRedMat);
      haunch.position.set(sx, 0.54, -1.1);
      this.bodyMesh.add(haunch);
    }

    // Sloped Front Hood with sculpted power bulge
    const hood = new THREE.Mesh(new THREE.BoxGeometry(1.62, 0.32, 1.22), carRedMat);
    hood.position.set(0, 0.46, 1.24);
    hood.rotation.x = 0.08;
    this.bodyMesh.add(hood);

    // Rust-eze Hood Decal Mesh
    const hoodDecal = new THREE.Mesh(new THREE.PlaneGeometry(1.25, 0.95), hoodMat);
    hoodDecal.position.set(0, 0.63, 1.22);
    hoodDecal.rotation.x = -Math.PI / 2 + 0.08;
    this.bodyMesh.add(hoodDecal);

    // 3. FRONT BUMPER MOUTH, SIGNATURE SMIRK & HEADLIGHT STICKERS
    const frontBumper = new THREE.Mesh(new THREE.PlaneGeometry(1.62, 0.42), mouthMat);
    frontBumper.position.set(0, 0.44, 1.86);
    this.bodyMesh.add(frontBumper);

    // 4. CABIN GREENHOUSE & WINDSHIELD WITH EXPRESSIVE EYES
    const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.38, 0.48, 1.52), carRedMat);
    cabin.position.set(0, 0.94, -0.22);
    this.bodyMesh.add(cabin);

    // Sloped Windshield with Pixar Cars Eyes
    const windshield = new THREE.Mesh(new THREE.PlaneGeometry(1.32, 0.46), eyesMat);
    windshield.position.set(0, 0.92, 0.55);
    windshield.rotation.x = -0.32;
    this.bodyMesh.add(windshield);

    // Fastback Rear Window Deck
    const rearWindow = new THREE.Mesh(new THREE.BoxGeometry(1.28, 0.38, 0.04), darkRedMat);
    rearWindow.position.set(0, 0.9, -0.98);
    rearWindow.rotation.x = 0.38;
    this.bodyMesh.add(rearWindow);

    // Roof Top with Bold #95 Decal
    const roofDecal = new THREE.Mesh(new THREE.PlaneGeometry(1.25, 1.1), roofMat);
    roofDecal.position.set(0, 1.185, -0.22);
    roofDecal.rotation.x = -Math.PI / 2;
    this.bodyMesh.add(roofDecal);

    // 5. SIDE DOORS WITH LIGHTNING BOLTS & #95
    // Left Side Decal
    const leftSideDecal = new THREE.Mesh(new THREE.PlaneGeometry(2.35, 0.42), sideLeftMat);
    leftSideDecal.position.set(-0.84, 0.53, -0.05);
    leftSideDecal.rotation.y = -Math.PI / 2;
    this.bodyMesh.add(leftSideDecal);

    // Right Side Decal
    const rightSideDecal = new THREE.Mesh(new THREE.PlaneGeometry(2.35, 0.42), sideRightMat);
    rightSideDecal.position.set(0.84, 0.53, -0.05);
    rightSideDecal.rotation.y = Math.PI / 2;
    this.bodyMesh.add(rightSideDecal);

    // 6. HIGH-DOWNFORCE REAR WING / SPOILER WITH RUST-EZE SPONSORSHIP
    // Stanchions
    for (const sx of [-0.52, 0.52]) {
      const stanchion = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.42, 0.12), darkRedMat);
      stanchion.position.set(sx, 0.92, -1.62);
      stanchion.rotation.x = 0.16;
      this.bodyMesh.add(stanchion);
    }
    // Wing Blade
    const wingBlade = new THREE.Mesh(new THREE.BoxGeometry(1.72, 0.08, 0.42), carRedMat);
    wingBlade.position.set(0, 1.14, -1.64);
    wingBlade.rotation.x = -0.06;
    this.bodyMesh.add(wingBlade);

    // Spoiler Decal Banner
    const spoilerDecal = new THREE.Mesh(new THREE.PlaneGeometry(1.68, 0.38), spoilerMat);
    spoilerDecal.position.set(0, 1.185, -1.64);
    spoilerDecal.rotation.x = -Math.PI / 2 - 0.06;
    this.bodyMesh.add(spoilerDecal);

    // Wing Endplates
    for (const sx of [-0.86, 0.86]) {
      const endplate = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.26, 0.46), carRedMat);
      endplate.position.set(sx, 1.14, -1.64);
      this.bodyMesh.add(endplate);
    }

    // 7. DUAL CHROME SIDE EXHAUST PIPES
    for (const sx of [-0.88, 0.88]) {
      for (const zo of [-0.36, -0.2]) {
        const pipe = new THREE.Mesh(new THREE.CylinderGeometry(0.048, 0.048, 0.22, 14), chromeMat);
        pipe.rotation.z = Math.PI / 2;
        pipe.position.set(sx, 0.24, zo);
        this.bodyMesh.add(pipe);
      }
    }

    // 8. 4 RACING WHEELS WITH LIGHTYEAR TIRES & CHERRY RED RIMS
    const wheelCoords: [number, number, number, boolean][] = [
      [-0.88, 0.33, 1.1, true],   // Front Left
      [0.88, 0.33, 1.1, true],    // Front Right
      [-0.88, 0.33, -1.15, false], // Rear Left
      [0.88, 0.33, -1.15, false]  // Rear Right
    ];

    for (const [wx, wy, wz, isFront] of wheelCoords) {
      const wheelAssembly = new THREE.Group();
      wheelAssembly.position.set(wx, wy, wz);

      const wheelMesh = new THREE.Group();

      // Tire Tread
      const tire = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.22, 20), tireTreadMat);
      tire.rotation.z = Math.PI / 2;
      wheelMesh.add(tire);

      // Lightyear Sidewall Decal Plane
      const sidewall = new THREE.Mesh(new THREE.CircleGeometry(0.335, 20), tireSidewallMat);
      sidewall.position.x = (wx > 0 ? 0.115 : -0.115);
      sidewall.rotation.y = (wx > 0 ? Math.PI / 2 : -Math.PI / 2);
      wheelMesh.add(sidewall);

      this.wheels.push(wheelMesh as any);

      if (isFront) {
        const pivot = new THREE.Group();
        pivot.add(wheelMesh);
        wheelAssembly.add(pivot);
        this.frontWheelPivots.push(pivot);
      } else {
        wheelAssembly.add(wheelMesh);
      }

      this.bodyMesh.add(wheelAssembly);
    }
  }

  // -------------------------------------------------------------
  // BUILD 3D DOC HUDSON (#51 THE FABULOUS HUDSON HORNET)
  // -------------------------------------------------------------
  private buildDocHudsonModel() {
    // Generate authentic Doc Hudson procedural decals
    const sideLeftTex = createDocHudsonSideTexture(false);
    const sideRightTex = createDocHudsonSideTexture(true);
    const roofTex = createDocHudsonRoofTexture();
    const eyesTex = createDocHudsonEyesTexture();
    const grilleTex = createDocHudsonFrontGrilleTexture();

    // Classic 1951 Midnight Blue paint
    const hudsonBlueMat = new THREE.MeshStandardMaterial({
      color: 0x10243d,
      roughness: 0.22,
      metalness: 0.4
    });
    const darkBlueMat = new THREE.MeshStandardMaterial({
      color: 0x091422,
      roughness: 0.35,
      metalness: 0.3
    });
    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      roughness: 0.1,
      metalness: 0.95
    });
    const whitewallMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.3,
      metalness: 0.1
    });
    const tireTreadMat = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      roughness: 0.85,
      metalness: 0.1
    });

    // Decal materials
    const sideLeftMat = new THREE.MeshBasicMaterial({ map: sideLeftTex });
    const sideRightMat = new THREE.MeshBasicMaterial({ map: sideRightTex });
    const roofMat = new THREE.MeshBasicMaterial({ map: roofTex });
    const eyesMat = new THREE.MeshBasicMaterial({ map: eyesTex });
    const grilleMat = new THREE.MeshBasicMaterial({ map: grilleTex });

    // 1. Low-slung "Step-Down" Chassis & Floor
    const chassis = new THREE.Mesh(new THREE.BoxGeometry(1.78, 0.22, 3.65), darkBlueMat);
    chassis.position.y = 0.22;
    this.hudsonBodyMesh.add(chassis);

    // Heavy Vintage Front & Rear Chrome Bumpers
    const frontBumper = new THREE.Mesh(new THREE.BoxGeometry(1.84, 0.16, 0.32), chromeMat);
    frontBumper.position.set(0, 0.2, 1.94);
    this.hudsonBodyMesh.add(frontBumper);

    const rearBumper = new THREE.Mesh(new THREE.BoxGeometry(1.84, 0.16, 0.32), chromeMat);
    rearBumper.position.set(0, 0.2, -1.94);
    this.hudsonBodyMesh.add(rearBumper);

    // 2. Main Midnight Blue Body
    const mainBody = new THREE.Mesh(new THREE.BoxGeometry(1.72, 0.46, 3.5), hudsonBlueMat);
    mainBody.position.set(0, 0.54, 0);
    this.hudsonBodyMesh.add(mainBody);

    // Rounded Front Hood & Fenders
    const hood = new THREE.Mesh(new THREE.BoxGeometry(1.68, 0.36, 1.35), hudsonBlueMat);
    hood.position.set(0, 0.48, 1.25);
    hood.rotation.x = 0.05;
    this.hudsonBodyMesh.add(hood);

    // Chrome Hood Ornament Spear
    const hoodOrnament = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.06, 1.1), chromeMat);
    hoodOrnament.position.set(0, 0.69, 1.25);
    this.hudsonBodyMesh.add(hoodOrnament);

    // Front Waterfall Chrome Grille & Headlights
    const frontGrille = new THREE.Mesh(new THREE.PlaneGeometry(1.68, 0.44), grilleMat);
    frontGrille.position.set(0, 0.48, 1.93);
    this.hudsonBodyMesh.add(frontGrille);

    // 3. Cabin Greenhouse & Split Windshield with Doc's Eyes
    const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.44, 0.52, 1.68), hudsonBlueMat);
    cabin.position.set(0, 0.98, -0.24);
    this.hudsonBodyMesh.add(cabin);

    // Sloped Split Windshield
    const windshield = new THREE.Mesh(new THREE.PlaneGeometry(1.38, 0.48), eyesMat);
    windshield.position.set(0, 0.96, 0.61);
    windshield.rotation.x = -0.32;
    this.hudsonBodyMesh.add(windshield);

    // Aerodynamic Sloping Fastback Rear Roofline
    const fastback = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.44, 0.8), hudsonBlueMat);
    fastback.position.set(0, 0.82, -1.25);
    fastback.rotation.x = 0.35;
    this.hudsonBodyMesh.add(fastback);

    // Roof with Gold #51 Decal
    const roofDecal = new THREE.Mesh(new THREE.PlaneGeometry(1.3, 1.25), roofMat);
    roofDecal.position.set(0, 1.245, -0.24);
    roofDecal.rotation.x = -Math.PI / 2;
    this.hudsonBodyMesh.add(roofDecal);

    // 4. Side Panels with "The Fabulous Hudson Hornet #51"
    const leftSideDecal = new THREE.Mesh(new THREE.PlaneGeometry(2.5, 0.44), sideLeftMat);
    leftSideDecal.position.set(-0.87, 0.55, 0.02);
    leftSideDecal.rotation.y = -Math.PI / 2;
    this.hudsonBodyMesh.add(leftSideDecal);

    const rightSideDecal = new THREE.Mesh(new THREE.PlaneGeometry(2.5, 0.44), sideRightMat);
    rightSideDecal.position.set(0.87, 0.55, 0.02);
    rightSideDecal.rotation.y = Math.PI / 2;
    this.hudsonBodyMesh.add(rightSideDecal);

    // 5. 4 Vintage Whitewall Wheels with Blue Rims & Chrome Caps
    const wheelCoords: [number, number, number, boolean][] = [
      [-0.91, 0.33, 1.15, true],
      [0.91, 0.33, 1.15, true],
      [-0.91, 0.33, -1.2, false],
      [0.91, 0.33, -1.2, false]
    ];

    for (const [wx, wy, wz, isFront] of wheelCoords) {
      const wheelAssembly = new THREE.Group();
      wheelAssembly.position.set(wx, wy, wz);

      const wheelMesh = new THREE.Group();

      // Outer tire tread
      const tire = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.22, 20), tireTreadMat);
      tire.rotation.z = Math.PI / 2;
      wheelMesh.add(tire);

      // Classic Whitewall Ring
      const whitewall = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.225, 20), whitewallMat);
      whitewall.rotation.z = Math.PI / 2;
      wheelMesh.add(whitewall);

      // Midnight Blue Inner Rim
      const blueRim = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.23, 16), hudsonBlueMat);
      blueRim.rotation.z = Math.PI / 2;
      wheelMesh.add(blueRim);

      // Chrome Center "H" Hubcap
      const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.24, 16), chromeMat);
      cap.rotation.z = Math.PI / 2;
      wheelMesh.add(cap);

      this.hudsonWheels.push(wheelMesh as any);

      if (isFront) {
        const pivot = new THREE.Group();
        pivot.add(wheelMesh);
        wheelAssembly.add(pivot);
        this.hudsonFrontWheelPivots.push(pivot);
      } else {
        wheelAssembly.add(wheelMesh);
      }

      this.hudsonBodyMesh.add(wheelAssembly);
    }
  }

  // -------------------------------------------------------------
  // RACE CHALLENGE CONTROLLER
  // -------------------------------------------------------------
  public startRaceChallenge() {
    this.raceState.active = true;
    this.raceState.state = 'countdown';
    this.raceState.countdownTimer = 4.2;
    this.raceState.countdownStage = 1;
    this.raceState.playerLap = 1;
    this.raceState.docLap = 1;
    this.raceState.totalLaps = 2;
    this.raceState.playerProgress = 0;
    this.raceState.docProgress = 0.98;
    this.raceState.playerPosition = 1;
    this.raceState.playerSectors = [];
    this.raceState.elapsedTime = 0;
    this.raceState.winner = null;
    this.raceState.finishBannerTimer = 0;
    this.lastCountdownStage = 0;
    this.playerCheckpoints.clear();
    this.docCheckpoints.clear();

    // Line up cars on the starting grid
    // McQueen on Pole (Inside lane X: 186, Z: -16.5)
    this.group.position.set(186, 2.05, -16.5);
    this.group.rotation.y = Math.PI / 2;

    // Doc Hudson in Outside lane (Grid slot 2 X: 186, Z: -13.5)
    this.hudsonGroup.position.set(186, 2.05, -13.5);
    this.hudsonGroup.rotation.y = Math.PI / 2;
    this.hudsonTrackProgress = 0.98; // Just behind start line
    this.isHudsonRacing = true;
  }

  public cancelRaceChallenge() {
    this.raceState.active = false;
    this.raceState.state = 'finished';
    this.isHudsonRacing = true;

    // Reset cars to starting grid slots
    this.hudsonGroup.position.set(186, 2.05, -13.5);
    this.hudsonGroup.rotation.y = Math.PI / 2;
    this.hudsonTrackProgress = 0.94;
  }

  // -------------------------------------------------------------
  // PARTICLE SYSTEMS: TIRE DRIFT SMOKE & EXHAUST NITRO FLAMES
  // -------------------------------------------------------------
  private createTireSmokeSystem() {
    const count = 100;
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const velocities: THREE.Vector3[] = [];
    const lifetimes: number[] = [];

    for (let i = 0; i < count; i++) {
      positions[i * 3] = 0;
      positions[i * 3 + 1] = -100;
      positions[i * 3 + 2] = 0;
      velocities.push(new THREE.Vector3());
      lifetimes.push(1.0);
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const mat = new THREE.PointsMaterial({
      color: 0xf1f5f9,
      size: 0.75,
      transparent: true,
      opacity: 0.65,
      depthWrite: false
    });

    const smoke = new THREE.Points(geo, mat);
    return { smoke, smokePositions: positions, smokeVel: velocities, smokeLife: lifetimes };
  }

  private createExhaustFlameSystem() {
    const count = 50;
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const lifetimes: number[] = [];

    for (let i = 0; i < count; i++) {
      positions[i * 3] = 0;
      positions[i * 3 + 1] = -100;
      positions[i * 3 + 2] = 0;
      lifetimes.push(1.0);
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const mat = new THREE.PointsMaterial({
      color: 0xf97316,
      size: 0.5,
      transparent: true,
      opacity: 0.9,
      depthWrite: false
    });

    const flames = new THREE.Points(geo, mat);
    return { flames, flamePositions: positions, flameLife: lifetimes };
  }

  public emitTireSmoke(origin: THREE.Vector3, intensity: number = 1.0) {
    let emitted = 0;
    const maxToEmit = Math.round(4 * intensity);

    for (let i = 0; i < this.smokeLifetimes.length && emitted < maxToEmit; i++) {
      if (this.smokeLifetimes[i] >= 0.8) {
        this.smokePositions[i * 3] = origin.x + (Math.random() - 0.5) * 0.5;
        this.smokePositions[i * 3 + 1] = origin.y + 0.15;
        this.smokePositions[i * 3 + 2] = origin.z + (Math.random() - 0.5) * 0.5;

        this.smokeVelocities[i].set(
          (Math.random() - 0.5) * 1.6,
          0.9 + Math.random() * 1.4,
          (Math.random() - 0.5) * 1.6
        );
        this.smokeLifetimes[i] = 0;
        emitted++;
      }
    }
    this.tireSmokeParticles.geometry.attributes.position.needsUpdate = true;
  }

  public emitExhaustFlame(origin: THREE.Vector3) {
    for (let i = 0; i < this.flameLifetimes.length; i++) {
      if (this.flameLifetimes[i] >= 0.35) {
        this.flamePositions[i * 3] = origin.x;
        this.flamePositions[i * 3 + 1] = origin.y;
        this.flamePositions[i * 3 + 2] = origin.z;
        this.flameLifetimes[i] = 0;
        break;
      }
    }
    this.exhaustFlames.geometry.attributes.position.needsUpdate = true;
  }

  // -------------------------------------------------------------
  // UPDATE LOOP: SIMULATION, RACING AI & CHALLENGE LOGIC
  // -------------------------------------------------------------
  public update(dt: number, playerPos?: THREE.Vector3) {
    this.updateParticles(dt);

    // Update Race Challenge logic if active
    if (this.raceState.active) {
      this.updateRaceChallengeLogic(dt);
    }

    // Update Doc Hudson autonomous driving / racing
    this.updateDocHudson(dt, playerPos);

    if (this.isPlayerDriving) {
      // Manual Player driving handles McQueen transform
      return;
    }

    // Autonomous Racing Loop along trackCurve for Lightning McQueen
    const totalDist = this.trackLength;
    this.trackProgress = (this.trackProgress + (this.currentSpeed * dt) / totalDist) % 1.0;

    const currentPoint = this.trackCurve.getPointAt(this.trackProgress);
    const aheadProgress = (this.trackProgress + 0.015) % 1.0;
    const aheadPoint = this.trackCurve.getPointAt(aheadProgress);

    const tangent = aheadPoint.clone().sub(currentPoint).normalize();
    const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
    const targetHeading = Math.atan2(tangent.x, tangent.z);

    // Dynamic racing speed: fast on straights, controlled braking in curves
    const lookAheadProgress = (this.trackProgress + 0.05) % 1.0;
    const lookAheadPoint = this.trackCurve.getPointAt(lookAheadProgress);
    const lookAheadTangent = lookAheadPoint.clone().sub(aheadPoint).normalize();
    const curvature = Math.abs(tangent.angleTo(lookAheadTangent));

    if (curvature > 0.16) {
      // Hairpin curve drift
      this.currentSpeed = THREE.MathUtils.lerp(this.currentSpeed, 16.0, dt * 3.5);
      this.driftAngle = THREE.MathUtils.lerp(this.driftAngle, (tangent.x > 0 ? 0.28 : -0.28), dt * 6.0);
      this.bodyRoll = THREE.MathUtils.lerp(this.bodyRoll, (tangent.x > 0 ? -0.09 : 0.09), dt * 5.0);
      this.emitTireSmoke(this.group.position, 1.4);
    } else {
      // High-speed straightaway ("I am speed!")
      this.currentSpeed = THREE.MathUtils.lerp(this.currentSpeed, 26.0, dt * 2.5);
      this.driftAngle = THREE.MathUtils.lerp(this.driftAngle, 0, dt * 4.0);
      this.bodyRoll = THREE.MathUtils.lerp(this.bodyRoll, 0, dt * 4.0);

      if (Math.random() < 0.12) {
        this.emitExhaustFlame(this.group.position.clone().add(new THREE.Vector3(0.85, 0.25, -0.3)));
      }
    }

    // McQueen takes Inside Lane (-1.25 offset along normal)
    const mcQueenPos = currentPoint.clone().addScaledVector(normal, -1.25);
    mcQueenPos.y = 2.05;
    this.group.position.lerp(mcQueenPos, 0.7);
    this.group.position.y = 2.05;
    this.group.rotation.y = targetHeading + this.driftAngle;
    this.bodyMesh.rotation.z = this.bodyRoll;

    const wheelRadius = 0.34;
    this.wheelRotation += (this.currentSpeed * dt) / wheelRadius;
    for (const w of this.wheels) {
      w.rotation.x = this.wheelRotation;
    }

    const steerAngle = THREE.MathUtils.clamp((targetHeading - this.group.rotation.y) * 1.8, -0.45, 0.45);
    for (const p of this.frontWheelPivots) {
      p.rotation.y = steerAngle;
    }

    if (playerPos) {
      const distToPlayer = this.group.position.distanceTo(playerPos);
      if (distToPlayer < 45) {
        this.engineSoundTimer += dt;
        if (this.engineSoundTimer > 0.35) {
          const revPitch = (this.currentSpeed / 20.0) * (1.0 - Math.min(1.0, distToPlayer / 50));
          if (revPitch > 0.25) {
            sound.playRaceCarEngine(revPitch);
          }
          this.engineSoundTimer = 0;
        }
      }
    }
  }

  // -------------------------------------------------------------
  // DOC HUDSON RACING AI & ANIMATION
  // -------------------------------------------------------------
  private updateDocHudson(dt: number, playerPos?: THREE.Vector3) {
    if (!this.isHudsonRacing) {
      // Idle at Pit Box
      return;
    }

    if (this.raceState.active && this.raceState.state === 'countdown') {
      // Freeze Doc Hudson in starting grid slot 2 during countdown
      this.hudsonGroup.position.set(186, 2.05, -13.5);
      this.hudsonGroup.rotation.y = Math.PI / 2;
      return;
    }

    // Doc Hudson races along the track curve
    const totalDist = this.trackLength;
    const oldProgress = this.hudsonTrackProgress;
    this.hudsonTrackProgress = (this.hudsonTrackProgress + (this.hudsonSpeed * dt) / totalDist) % 1.0;

    // Checkpoint registering for Doc Hudson (Sectors 1, 2, 3)
    if (this.hudsonTrackProgress >= 0.20 && this.hudsonTrackProgress <= 0.40) this.docCheckpoints.add(1);
    if (this.hudsonTrackProgress >= 0.45 && this.hudsonTrackProgress <= 0.65) this.docCheckpoints.add(2);
    if (this.hudsonTrackProgress >= 0.70 && this.hudsonTrackProgress <= 0.90) this.docCheckpoints.add(3);

    // Lap tracking for Doc Hudson across finish line
    if (this.raceState.active && oldProgress > 0.85 && this.hudsonTrackProgress < 0.15) {
      if (this.docCheckpoints.has(1) && this.docCheckpoints.has(2) && this.docCheckpoints.has(3)) {
        this.raceState.docLap++;
        this.docCheckpoints.clear();
        if (this.raceState.docLap > this.raceState.totalLaps && !this.raceState.winner) {
          this.raceState.winner = 'doc';
          this.raceState.state = 'finished';
        }
      }
    }

    const currentPoint = this.trackCurve.getPointAt(this.hudsonTrackProgress);
    const aheadProgress = (this.hudsonTrackProgress + 0.015) % 1.0;
    const aheadPoint = this.trackCurve.getPointAt(aheadProgress);

    const tangent = aheadPoint.clone().sub(currentPoint).normalize();
    const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
    const targetHeading = Math.atan2(tangent.x, tangent.z);

    const lookAheadProgress = (this.hudsonTrackProgress + 0.05) % 1.0;
    const lookAheadPoint = this.trackCurve.getPointAt(lookAheadProgress);
    const lookAheadTangent = lookAheadPoint.clone().sub(aheadPoint).normalize();
    const curvature = Math.abs(tangent.angleTo(lookAheadTangent));

    // Dynamic competitive target speed for Doc Hudson
    let targetDocSpeed = 22.5;
    if (this.raceState.active && this.raceState.state === 'racing') {
      const playerTotalScore = (this.raceState.playerLap - 1) + this.raceState.playerProgress;
      const docTotalScore = (this.raceState.docLap - 1) + this.hudsonTrackProgress;
      const scoreDiff = playerTotalScore - docTotalScore; // > 0 if player is leading

      if (scoreDiff > 0.04) {
        // Player is leading! Doc summons legendary Twin H-Power supercharger
        targetDocSpeed = 27.5;
      } else if (scoreDiff < -0.06) {
        // Doc is leading comfortably, ease off throttle to maintain exciting battle
        targetDocSpeed = 22.0;
      } else {
        // Wheel-to-wheel dogfight!
        targetDocSpeed = 25.0;
      }
    }

    // Doc's legendary technique: "Turn right to go left!"
    if (curvature > 0.15) {
      // Doc's masterful smooth power slide
      const cornerSpeed = Math.min(targetDocSpeed, 19.5);
      this.hudsonSpeed = THREE.MathUtils.lerp(this.hudsonSpeed, cornerSpeed, dt * 3.2);
      this.hudsonDriftAngle = THREE.MathUtils.lerp(this.hudsonDriftAngle, (tangent.x > 0 ? 0.32 : -0.32), dt * 6.5);
      this.hudsonBodyRoll = THREE.MathUtils.lerp(this.hudsonBodyRoll, (tangent.x > 0 ? -0.1 : 0.1), dt * 5.0);

      // Tire smoke during Doc's legendary slide
      this.emitTireSmoke(this.hudsonGroup.position, 1.2);
    } else {
      // Twin H-Power full throttle down the straightaways!
      this.hudsonSpeed = THREE.MathUtils.lerp(this.hudsonSpeed, targetDocSpeed, dt * 2.4);
      this.hudsonDriftAngle = THREE.MathUtils.lerp(this.hudsonDriftAngle, 0, dt * 4.0);
      this.hudsonBodyRoll = THREE.MathUtils.lerp(this.hudsonBodyRoll, 0, dt * 4.0);
    }

    // Doc Hudson sticks to the Outside Lane (+1.25 offset along normal)
    const docTargetPos = currentPoint.clone().addScaledVector(normal, 1.25);
    docTargetPos.y = 2.05;
    this.hudsonGroup.position.lerp(docTargetPos, 0.75);
    this.hudsonGroup.position.y = 2.05;
    this.hudsonGroup.rotation.y = targetHeading + this.hudsonDriftAngle;
    this.hudsonBodyMesh.rotation.z = this.hudsonBodyRoll;

    const wheelRadius = 0.34;
    this.hudsonWheelRotation += (this.hudsonSpeed * dt) / wheelRadius;
    for (const w of this.hudsonWheels) {
      w.rotation.x = this.hudsonWheelRotation;
    }

    // Counter-steer front wheels: "Turn right to go left!"
    const steerAngle = THREE.MathUtils.clamp((targetHeading - this.hudsonGroup.rotation.y) * 2.0, -0.5, 0.5);
    for (const p of this.hudsonFrontWheelPivots) {
      p.rotation.y = steerAngle;
    }
  }

  // -------------------------------------------------------------
  // RACE CHALLENGE STATE MACHINE UPDATE
  // -------------------------------------------------------------
  private updateRaceChallengeLogic(dt: number) {
    if (this.raceState.state === 'countdown') {
      this.raceState.countdownTimer -= dt;

      // Starting Light Stages:
      // > 3.0: Stage 1 (Red 1 - READY...)
      // > 2.0: Stage 2 (Red 2 - SET...)
      // > 1.0: Stage 3 (Yellow - PREPARE...)
      // <= 1.0: Stage 4 (Green - GO!)
      let stage = 1;
      if (this.raceState.countdownTimer <= 1.0) {
        stage = 4;
      } else if (this.raceState.countdownTimer <= 2.0) {
        stage = 3;
      } else if (this.raceState.countdownTimer <= 3.0) {
        stage = 2;
      } else {
        stage = 1;
      }

      this.raceState.countdownStage = stage;

      if (stage !== this.lastCountdownStage) {
        this.lastCountdownStage = stage;
        sound.playRaceCountdown(stage);
        if (stage === 4) {
          sound.playKaChow();
        }
      }

      if (this.raceState.countdownTimer <= 0) {
        this.raceState.state = 'racing';
        this.raceState.countdownTimer = 0;
      }
      return;
    }

    if (this.raceState.state === 'racing') {
      this.raceState.elapsedTime += dt;

      // Track player progress along the track curve
      const playerPos = this.group.position;
      const trackProg = this.calculateNearestTrackProgress(playerPos);
      const oldPlayerProg = this.raceState.playerProgress;
      this.raceState.playerProgress = trackProg;
      this.raceState.docProgress = this.hudsonTrackProgress;

      // Checkpoint registering for Player (Sectors 1, 2, 3)
      if (trackProg >= 0.20 && trackProg <= 0.40) this.playerCheckpoints.add(1);
      if (trackProg >= 0.45 && trackProg <= 0.65) this.playerCheckpoints.add(2);
      if (trackProg >= 0.70 && trackProg <= 0.90) this.playerCheckpoints.add(3);
      this.raceState.playerSectors = Array.from(this.playerCheckpoints).sort();

      // Check player lap completion across start/finish line (u = 0)
      if (oldPlayerProg > 0.85 && trackProg < 0.15) {
        if (this.playerCheckpoints.has(1) && this.playerCheckpoints.has(2) && this.playerCheckpoints.has(3)) {
          this.raceState.playerLap++;
          this.playerCheckpoints.clear();
          this.raceState.playerSectors = [];
          sound.playLevelUp();
          if (this.raceState.playerLap > this.raceState.totalLaps && !this.raceState.winner) {
            this.raceState.winner = 'player';
            this.raceState.state = 'finished';
            sound.playRaceVictory();
            sound.playKaChow();
          }
        }
      }

      // Compute P1 / P2 position
      const playerTotalScore = (this.raceState.playerLap - 1) + trackProg;
      const docTotalScore = (this.raceState.docLap - 1) + this.hudsonTrackProgress;
      this.raceState.playerPosition = playerTotalScore >= docTotalScore ? 1 : 2;
    }

    if (this.raceState.state === 'finished') {
      this.raceState.finishBannerTimer += dt;
      if (this.raceState.finishBannerTimer > 12.0) {
        this.cancelRaceChallenge();
      }
    }
  }

  private calculateNearestTrackProgress(pos: THREE.Vector3): number {
    let bestDistSq = Infinity;
    let bestProgress = 0;
    const samples = 32;

    for (let i = 0; i < samples; i++) {
      const u = i / samples;
      const pt = this.trackCurve.getPointAt(u);
      const distSq = pt.distanceToSquared(pos);
      if (distSq < bestDistSq) {
        bestDistSq = distSq;
        bestProgress = u;
      }
    }
    return bestProgress;
  }

  private updateParticles(dt: number) {
    // Tire smoke
    for (let i = 0; i < this.smokeLifetimes.length; i++) {
      if (this.smokeLifetimes[i] < 1.0) {
        this.smokeLifetimes[i] += dt * 1.6;
        this.smokePositions[i * 3] += this.smokeVelocities[i].x * dt;
        this.smokePositions[i * 3 + 1] += this.smokeVelocities[i].y * dt;
        this.smokePositions[i * 3 + 2] += this.smokeVelocities[i].z * dt;
      } else {
        this.smokePositions[i * 3 + 1] = -100;
      }
    }
    this.tireSmokeParticles.geometry.attributes.position.needsUpdate = true;

    // Exhaust flames
    for (let i = 0; i < this.flameLifetimes.length; i++) {
      if (this.flameLifetimes[i] < 0.35) {
        this.flameLifetimes[i] += dt * 3.8;
      } else {
        this.flamePositions[i * 3 + 1] = -100;
      }
    }
    this.exhaustFlames.geometry.attributes.position.needsUpdate = true;
  }

  // -------------------------------------------------------------
  // MANUAL DRIVING MODE INTERFACE FOR PLAYER
  // -------------------------------------------------------------
  public setManualTransform(
    pos: THREE.Vector3,
    heading: number,
    speed: number,
    isDrifting: boolean,
    isBoost: boolean,
    steerInput: number
  ) {
    if (this.raceState.active && this.raceState.state === 'countdown') {
      this.group.position.set(186, 2.05, -16.5);
      this.group.rotation.y = Math.PI / 2;
      return;
    }

    this.group.position.copy(pos);
    this.group.rotation.y = heading;

    // Dynamic wheel rotation
    const wheelRadius = 0.34;
    this.wheelRotation += (speed * 0.016) / wheelRadius;
    for (const w of this.wheels) {
      w.rotation.x = this.wheelRotation;
    }

    // Front steering pivots
    for (const p of this.frontWheelPivots) {
      p.rotation.y = steerInput * 0.44;
    }

    // Body roll & pitch
    this.bodyRoll = THREE.MathUtils.lerp(this.bodyRoll, -steerInput * (speed / 20.0) * 0.12, 0.2);
    this.bodyMesh.rotation.z = this.bodyRoll;

    // Particle FX
    if (isDrifting || Math.abs(steerInput) > 0.4) {
      this.emitTireSmoke(this.group.position, 1.8);
    }
    if (isBoost || speed > 24) {
      this.emitExhaustFlame(this.group.position.clone().add(new THREE.Vector3(0.85, 0.25, -0.3)));
      this.emitExhaustFlame(this.group.position.clone().add(new THREE.Vector3(-0.85, 0.25, -0.3)));
    }
  }

  public getPosition(): THREE.Vector3 {
    return this.group.position;
  }

  public getHudsonPosition(): THREE.Vector3 {
    return this.hudsonGroup.position;
  }

  public getRideTransform(): { position: THREE.Vector3; rotationY: number } {
    const seatOffset = new THREE.Vector3(0, 0.85, 0.15);
    seatOffset.applyAxisAngle(new THREE.Vector3(0, 1, 0), this.group.rotation.y);
    const seatPos = this.group.position.clone().add(seatOffset);
    return { position: seatPos, rotationY: this.group.rotation.y };
  }
}

