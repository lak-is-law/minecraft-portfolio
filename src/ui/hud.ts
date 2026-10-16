import { PORTFOLIO_DATA } from '../data/portfolioData';
import { TargetInfo } from '../engine/player';
import { sound } from '../engine/audio';
import { ASSETS } from './assets';
import { RaceChallengeState } from '../world/lightningMcQueen';

export interface HotbarSlot {
  id: string;
  name: string;
  icon: string;
  blockType?: string;
  action?: 'project' | 'skills' | 'fasttravel' | 'daynight' | 'resume';
}

export class HUDManager {
  private hotbarSlots: HotbarSlot[] = [
    { id: 'sword', name: 'Diamond Sword', icon: ASSETS.sword },
    { id: 'pickaxe', name: 'Diamond Pickaxe', icon: ASSETS.pickaxe },
    { id: 'cobblestone', name: 'Cobblestone Block', icon: ASSETS.cobblestone, blockType: 'cobblestone' },
    { id: 'oak_planks', name: 'Oak Planks Block', icon: ASSETS.wood, blockType: 'oak_planks' },
    { id: 'projects_book', name: 'Expeditions Journal', icon: ASSETS.book, action: 'project' },
    { id: 'skills_potion', name: 'Alchemy Potions Brew', icon: ASSETS.potion, action: 'skills' },
    { id: 'compass', name: 'Fast-Travel Compass', icon: ASSETS.compass, action: 'fasttravel' },
    { id: 'day_night', name: 'Day / Night Torch', icon: ASSETS.torch, action: 'daynight' },
    { id: 'resume_chest', name: 'Treasure Loot Chest', icon: ASSETS.chest, action: 'resume' },
  ];

  public activeSlotIndex: number = 1; // default to Pickaxe
  private f3Visible: boolean = false;
  private chatMessages: { sender: string; text: string; time: number }[] = [];
  private minimapCanvas: HTMLCanvasElement | null = null;
  private minimapCtx: CanvasRenderingContext2D | null = null;
  private lastMinimapUpdate: number = 0;
  private minimapZoom: number = 1.0;
  private readonly zoomLevels: number[] = [0.75, 1.0, 1.5, 2.2];

  // Callbacks
  public onDayNightToggle?: () => void;
  public onOpenProjects?: () => void;
  public onOpenSkills?: () => void;
  public onOpenFastTravel?: () => void;
  public onOpenResume?: () => void;
  public onBlockSelected?: (blockType: string) => void;
  public onOpenBlockPalette?: () => void;
  public onTakeScreenshot?: () => void;
  public onTogglePerspective?: () => void;
  public onToggleSit?: () => void;

  constructor() {
    this.renderHUD();
    this.setupListeners();
    this.pushChatMessage('System', 'Welcome to Lakshya\'s Minecraft Portfolio World!');
    this.pushChatMessage('Lakshya', 'Explore world structures to see my live projects, experience, skills, and resume.');
    this.pushChatMessage('Tip', document.body.classList.contains('touch-device')
      ? 'Use [USE] to inspect objects, talk with NPCs, and open chests.'
      : 'Press [E] to interact with objects and NPCs. Press [M] to open World Map.');
  }

  public onCycleWeather?: () => void;
  public onCycleSeason?: () => void;

  private renderHUD() {
    // 1. Crosshair & Prompt
    const crosshairEl = document.getElementById('mc-crosshair')!;
    crosshairEl.innerHTML = `
      <div class="mc-crosshair-reticle">+</div>
      <div class="mc-interact-prompt" id="mc-interact-prompt"></div>
    `;

    // 2. Hotbar rendering
    const hotbarEl = document.getElementById('mc-hotbar')!;
    const slotsHtml = this.hotbarSlots.map((s, idx) => `
      <div class="mc-hotbar-slot ${idx === this.activeSlotIndex ? 'active' : ''}" data-slot="${idx}" title="${s.name} (Key: ${idx + 1})">
        <span class="mc-hotbar-slot-num">${idx + 1}</span>
        <div class="mc-hotbar-icon">${s.icon}</div>
      </div>
    `).join('');

    hotbarEl.innerHTML = `
      <div class="mc-hotbar-container">
        <!-- Hearts and Hunger Bars using SVG assets -->
        <div class="mc-status-bars">
          <div class="mc-hearts-row">
            ${Array(10).fill(`<span class="mc-heart">${ASSETS.heart}</span>`).join('')}
          </div>
          <div class="mc-hunger-row">
            ${Array(10).fill(`<span class="mc-drumstick">${ASSETS.drumstick}</span>`).join('')}
          </div>
        </div>

        <!-- Experience Bar -->
        <div class="mc-xp-container">
          <div class="mc-xp-number">22</div>
          <div class="mc-xp-bar">
            <div class="mc-xp-fill"></div>
          </div>
        </div>

        <!-- 9-Slot Hotbar -->
        <div class="mc-hotbar-slots">
          ${slotsHtml}
        </div>
      </div>
    `;

    // 3. F3 Debug Screen element
    const f3El = document.getElementById('mc-f3-screen')!;
    f3El.style.display = 'none';

    // 4. Quick Actions / Controls Bar (top-left) - Zero emojis
    const quickBar = document.getElementById('mc-quick-nav')!;
    quickBar.innerHTML = `
      <div class="mc-quick-buttons">
        <button class="mc-chip-btn" id="btn-quick-projects" title="View Realm Expeditions">[EXPEDITIONS]</button>
        <button class="mc-chip-btn" id="btn-quick-map" title="Interactive World Map (Key: M)">[MAP: M]</button>
        <button class="mc-chip-btn" id="btn-quick-skills" title="Alchemy Potions Guide">[POTIONS]</button>
        <button class="mc-chip-btn" id="btn-quick-resume" title="Ancient Treasure Vault">[TREASURE]</button>
        <button class="mc-chip-btn" id="btn-quick-blocks" title="Creative Block Palette (Key: B)">[BLOCKS: B]</button>
        <button class="mc-chip-btn" id="btn-quick-fly" title="Toggle Creative Flight">[FLY: OFF]</button>
        <button class="mc-chip-btn" id="btn-quick-weather" title="Cycle clear, rain, thunder, aurora, snowfall, and rainbow">[WEATHER: CLEAR]</button>
        <button class="mc-chip-btn" id="btn-quick-time" title="Toggle Day / Night (Key: T)">[TIME: DAY]</button>
        <button class="mc-chip-btn" id="btn-quick-season" title="Cycle spring, summer, autumn, and winter">[SEASON: SPRING]</button>
        <button class="mc-chip-btn" id="btn-quick-perspective" title="Toggle 1P / 3P View (Key: F5 or C)">[VIEW: 1P]</button>
        <button class="mc-chip-btn" id="btn-quick-sit" title="Sit & Rest (Key: X)">[SIT: X]</button>
        <button class="mc-chip-btn" id="btn-quick-screenshot" title="Take Screenshot (Key: F2)">[PHOTO: F2]</button>
        <button class="mc-chip-btn" id="btn-quick-sound" title="Toggle Audio">[AUDIO: ON]</button>
        <button class="mc-chip-btn" id="btn-quick-unlock" title="Open Pause Menu (Key: ESC)">[PAUSE: ESC]</button>
      </div>
    `;

    // 5. Minimap container in top-right (Click/Tap to Maximise)
    const minimapEl = document.getElementById('mc-minimap')!;
    minimapEl.innerHTML = `
      <div class="mc-minimap-box" id="mc-minimap-box" title="Click or Tap to Maximise World Map (Key: M)">
        <div class="mc-minimap-top-bar">
          <div class="mc-minimap-header-left">
            <span class="mc-minimap-badge" id="minimap-title-btn" title="Click to enlarge (Key: M)">🗺️ MAP</span>
            <span class="mc-minimap-heading" id="minimap-heading">N</span>
          </div>
          <div class="mc-minimap-header-right">
            <div class="mc-minimap-zoom-group">
              <button class="mc-minimap-btn" id="btn-minimap-zoomout" title="Zoom Out" type="button">−</button>
              <span class="mc-minimap-zoom-lvl" id="minimap-zoom-lvl">1.0x</span>
              <button class="mc-minimap-btn" id="btn-minimap-zoomin" title="Zoom In" type="button">+</button>
            </div>
            <button class="mc-minimap-btn mc-minimap-expand-btn" id="btn-minimap-expand" title="Open World Map (Key: M)" type="button">⛶</button>
          </div>
        </div>
        <div class="mc-minimap-canvas-wrapper">
          <canvas id="minimap-canvas" width="360" height="360"></canvas>
          <div class="mc-minimap-coords-overlay" id="minimap-coords">X:0 Z:0</div>
        </div>
        <div class="mc-minimap-footer" id="minimap-footer">
          <span class="mc-minimap-pin-icon">📍</span>
          <span class="mc-minimap-landmark" id="minimap-nearest-landmark">Crossroads Citadel</span>
        </div>
      </div>
    `;
  }

  private setupListeners() {
    // Click / pointerdown on hotbar slots
    document.querySelectorAll('.mc-hotbar-slot').forEach(el => {
      const handleSelect = (e: Event) => {
        const slotIdx = parseInt((e.currentTarget as HTMLElement).getAttribute('data-slot') || '0', 10);
        this.selectSlot(slotIdx);
      };
      el.addEventListener('click', handleSelect);
      el.addEventListener('pointerdown', handleSelect);
    });

    // F3 toggle
    window.addEventListener('keydown', (e) => {
      if (e.code === 'F3') {
        e.preventDefault();
        this.f3Visible = !this.f3Visible;
        const f3El = document.getElementById('mc-f3-screen')!;
        f3El.style.display = this.f3Visible ? 'block' : 'none';
        sound.playClick();
      }
    });

    // Quick buttons
    document.getElementById('btn-quick-projects')?.addEventListener('click', () => this.onOpenProjects?.());
    document.getElementById('btn-quick-experience')?.addEventListener('click', () => {
      this.onOpenFastTravel?.();
    });
    document.getElementById('btn-quick-skills')?.addEventListener('click', () => this.onOpenSkills?.());
    document.getElementById('btn-quick-resume')?.addEventListener('click', () => this.onOpenResume?.());
    document.getElementById('btn-quick-blocks')?.addEventListener('click', () => this.onOpenBlockPalette?.());
    document.getElementById('btn-quick-map')?.addEventListener('click', () => this.onOpenFastTravel?.());
    document.getElementById('btn-quick-weather')?.addEventListener('click', () => this.onCycleWeather?.());
    document.getElementById('btn-quick-time')?.addEventListener('click', () => this.onDayNightToggle?.());
    document.getElementById('btn-quick-season')?.addEventListener('click', () => this.onCycleSeason?.());
    document.getElementById('btn-quick-unlock')?.addEventListener('click', () => {
      if (document.pointerLockElement) {
        document.exitPointerLock();
      } else {
        const pauseOverlay = document.getElementById('pause-overlay');
        if (pauseOverlay) {
          pauseOverlay.style.display = 'flex';
        }
      }
    });
    document.getElementById('btn-quick-screenshot')?.addEventListener('click', () => {
      this.onTakeScreenshot?.();
    });
    document.getElementById('btn-quick-perspective')?.addEventListener('click', () => {
      this.onTogglePerspective?.();
    });
    document.getElementById('btn-quick-sit')?.addEventListener('click', () => {
      this.onToggleSit?.();
    });

    // Minimap Zoom Controls & Expand Actions with touch isolation
    const zoomInBtn = document.getElementById('btn-minimap-zoomin');
    const zoomOutBtn = document.getElementById('btn-minimap-zoomout');
    const expandBtn = document.getElementById('btn-minimap-expand');

    const updateZoomUi = () => {
      const zoomLvlEl = document.getElementById('minimap-zoom-lvl');
      if (zoomLvlEl) {
        zoomLvlEl.textContent = `${this.minimapZoom.toFixed(1)}x`;
      }
      const currentIdx = this.zoomLevels.indexOf(this.minimapZoom);
      if (zoomInBtn instanceof HTMLButtonElement) {
        zoomInBtn.disabled = currentIdx === this.zoomLevels.length - 1;
        zoomInBtn.style.opacity = zoomInBtn.disabled ? '0.4' : '1';
      }
      if (zoomOutBtn instanceof HTMLButtonElement) {
        zoomOutBtn.disabled = currentIdx === 0;
        zoomOutBtn.style.opacity = zoomOutBtn.disabled ? '0.4' : '1';
      }
    };
    updateZoomUi();

    const handleZoomIn = (e: Event) => {
      e.stopPropagation();
      e.preventDefault();
      const currentIdx = this.zoomLevels.indexOf(this.minimapZoom);
      const nextIdx = currentIdx >= 0 ? Math.min(this.zoomLevels.length - 1, currentIdx + 1) : 1;
      this.minimapZoom = this.zoomLevels[nextIdx];
      updateZoomUi();
      sound.playClick();
    };

    const handleZoomOut = (e: Event) => {
      e.stopPropagation();
      e.preventDefault();
      const currentIdx = this.zoomLevels.indexOf(this.minimapZoom);
      const prevIdx = currentIdx >= 0 ? Math.max(0, currentIdx - 1) : 1;
      this.minimapZoom = this.zoomLevels[prevIdx];
      updateZoomUi();
      sound.playClick();
    };

    zoomInBtn?.addEventListener('click', handleZoomIn);
    zoomInBtn?.addEventListener('touchend', handleZoomIn);
    zoomInBtn?.addEventListener('touchstart', (e) => e.stopPropagation(), { passive: true });

    zoomOutBtn?.addEventListener('click', handleZoomOut);
    zoomOutBtn?.addEventListener('touchend', handleZoomOut);
    zoomOutBtn?.addEventListener('touchstart', (e) => e.stopPropagation(), { passive: true });

    const minimapBox = document.getElementById('mc-minimap-box');
    const triggerOpenMap = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('.mc-minimap-zoom-group, #btn-minimap-zoomin, #btn-minimap-zoomout')) return;
      e.preventDefault();
      e.stopPropagation();
      if (document.pointerLockElement) {
        document.exitPointerLock();
      }
      this.onOpenFastTravel?.();
    };

    expandBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      triggerOpenMap(e);
    });
    expandBtn?.addEventListener('touchend', (e) => {
      e.stopPropagation();
      triggerOpenMap(e);
    });
    expandBtn?.addEventListener('touchstart', (e) => e.stopPropagation(), { passive: true });

    minimapBox?.addEventListener('click', triggerOpenMap);

    let touchStartTime = 0;
    let touchStartX = 0;
    let touchStartY = 0;
    minimapBox?.addEventListener('touchstart', (e: TouchEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('.mc-minimap-zoom-group, #btn-minimap-zoomin, #btn-minimap-zoomout, #btn-minimap-expand')) return;
      if (e.touches.length === 1) {
        touchStartTime = performance.now();
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    }, { passive: true });

    minimapBox?.addEventListener('touchend', (e: TouchEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('.mc-minimap-zoom-group, #btn-minimap-zoomin, #btn-minimap-zoomout, #btn-minimap-expand')) return;
      const dt = performance.now() - touchStartTime;
      const t = e.changedTouches[0];
      if (t && dt < 450 && Math.hypot(t.clientX - touchStartX, t.clientY - touchStartY) < 18) {
        triggerOpenMap(e);
      }
    });

    const soundBtn = document.getElementById('btn-quick-sound');
    soundBtn?.addEventListener('click', () => {
      const enabled = sound.toggleSound();
      soundBtn.textContent = `[AUDIO: ${enabled ? 'ON' : 'MUTED'}]`;
    });
  }

  public selectSlot(index: number) {
    if (index < 0) index = 8;
    if (index > 8) index = 0;
    this.activeSlotIndex = index;
    sound.playClick();

    // Update active class
    document.querySelectorAll('.mc-hotbar-slot').forEach((el, i) => {
      if (i === index) el.classList.add('active');
      else el.classList.remove('active');
    });

    const slot = this.hotbarSlots[index];

    // Trigger action or set block type
    if (slot.blockType && this.onBlockSelected) {
      this.onBlockSelected(slot.blockType);
      this.pushChatMessage('Hotbar', `Selected: ${slot.name}`);
    } else if (slot.action === 'project' && this.onOpenProjects) {
      this.onOpenProjects();
    } else if (slot.action === 'skills' && this.onOpenSkills) {
      this.onOpenSkills();
    } else if (slot.action === 'fasttravel' && this.onOpenFastTravel) {
      this.onOpenFastTravel();
    } else if (slot.action === 'daynight' && this.onDayNightToggle) {
      this.onDayNightToggle();
    } else if (slot.action === 'resume' && this.onOpenResume) {
      this.onOpenResume();
    }
  }

  public cycleSlot(delta: number) {
    this.selectSlot(this.activeSlotIndex + delta);
  }

  // Update contextual prompt based on what player is looking at (Zero emojis & Zero emdashes)
  public updatePrompt(target: TargetInfo | null) {
    const promptEl = document.getElementById('mc-interact-prompt');
    if (!promptEl) return;

    if (!target) {
      promptEl.innerHTML = '';
      promptEl.style.display = 'none';
      return;
    }

    promptEl.style.display = 'block';
    const useBadge = document.body.classList.contains('touch-device') ? '[USE]' : '[E]';

    if (target.targetBanner) {
      const p = target.targetBanner.project;
      const action = document.body.classList.contains('touch-device') ? '[MINE] HIT BANNER' : '[HAMMER: LEFT CLICK]';
      promptEl.innerHTML = `<span class="mc-key-badge" style="background:#ef4444;color:#fff;">${action}</span> Launch Live Site: <strong>${p.title}</strong> [OPEN]`;
    } else if (target.interactable) {
      const inter = target.interactable;
      if (inter.type === 'project') {
        promptEl.innerHTML = `<span class="mc-key-badge">${useBadge}</span> View Project: <strong>${inter.title}</strong>`;
      } else if (inter.type === 'chest') {
        promptEl.innerHTML = `<span class="mc-key-badge">${useBadge}</span> Open: <strong>${inter.title}</strong>`;
      } else if (inter.type === 'experience') {
        promptEl.innerHTML = `<span class="mc-key-badge">${useBadge}</span> Inspect: <strong>${inter.title}</strong>`;
      } else if (inter.type === 'leadership') {
        promptEl.innerHTML = `<span class="mc-key-badge">${useBadge}</span> Inspect: <strong>${inter.title}</strong>`;
      } else if (inter.type === 'research') {
        promptEl.innerHTML = `<span class="mc-key-badge">${useBadge}</span> Inspect Research: <strong>${inter.title}</strong>`;
      } else if (inter.type === 'interests') {
        promptEl.innerHTML = `<span class="mc-key-badge">${useBadge}</span> Explore: <strong>${inter.title}</strong>`;
      } else if (inter.type === 'languages') {
        promptEl.innerHTML = `<span class="mc-key-badge">${useBadge}</span> Inspect: <strong>${inter.title}</strong>`;
      } else if (inter.type === 'minigame') {
        promptEl.innerHTML = `<span class="mc-key-badge">${useBadge}</span> Builder Arena: <strong>${inter.title}</strong>`;
      } else if (inter.type === 'skills') {
        promptEl.innerHTML = `<span class="mc-key-badge">${useBadge}</span> Open: <strong>Alchemy & Potions Guide</strong>`;
      } else if (inter.type === 'sign') {
        promptEl.innerHTML = `<span class="mc-key-badge">${useBadge}</span> Read Sign: <strong>${inter.title}</strong>`;
      } else if (inter.type === 'teleport') {
        promptEl.innerHTML = `<span class="mc-key-badge">${useBadge}</span> Enter: <strong>Nether Portal</strong>`;
      } else if (inter.type === 'npc') {
        const isDog = inter.id === 'roger';
        const isLakshya = inter.id === 'lakshya_guide' || inter.id === 'lakshya';
        const isAnimal = inter.id?.startsWith('animal_');
        const isCitizen = inter.id?.startsWith('citizen_');
        const actionVerb = isDog ? 'Pet Dog / Ask Roger' : (isLakshya ? 'Talk & Resume' : (isAnimal ? 'Talk / Observe' : (isCitizen ? 'Talk with Resident' : 'Talk with')));
        promptEl.innerHTML = `<span class="mc-key-badge">${useBadge}</span> ${actionVerb}: <strong>${inter.title}</strong>`;
      }
    } else {
      promptEl.innerHTML = document.body.classList.contains('touch-device')
        ? `<span class="mc-key-hint">[MINE] Mine</span> · <span class="mc-key-hint">[PLACE] Place block</span>`
        : `<span class="mc-key-hint">[Left Click] Mine</span> | <span class="mc-key-hint">[Right Click] Place Block</span>`;
    }
  }

  // Update F3 Debug overlay
  public updateF3(playerPos: { x: number; y: number; z: number }, yaw: number, pitch: number, fps: number) {
    if (!this.f3Visible) return;
    const f3El = document.getElementById('mc-f3-screen')!;

    const deg = ((yaw * 180 / Math.PI) % 360 + 360) % 360;
    let facing = 'South';
    if (deg >= 45 && deg < 135) facing = 'West';
    else if (deg >= 135 && deg < 225) facing = 'North';
    else if (deg >= 225 && deg < 315) facing = 'East';

    f3El.innerHTML = `
      <div class="mc-f3-left">
        <div>Minecraft 1.20.4 (WebGL Three.js Portfolio)</div>
        <div>${fps} fps, T: 60</div>
        <div>XYZ: ${playerPos.x.toFixed(3)} / ${playerPos.y.toFixed(3)} / ${playerPos.z.toFixed(3)}</div>
        <div>Block: ${Math.floor(playerPos.x)} ${Math.floor(playerPos.y)} ${Math.floor(playerPos.z)}</div>
        <div>Chunk: ${Math.floor(playerPos.x / 16)} ${Math.floor(playerPos.y / 16)} ${Math.floor(playerPos.z / 16)}</div>
        <div>Facing: ${facing} (Towards ${(deg).toFixed(1)} deg)</div>
        <div>Biome: minecraft:plains (Portfolio Overworld)</div>
        <div>Light: 15 (15 sky, 0 block)</div>
      </div>
      <div class="mc-f3-right">
        <div>Engine: Three.js WebGL Metal / Core</div>
        <div>Mem: 48% 512/1024MB</div>
        <div>Display: ${window.innerWidth}x${window.innerHeight}</div>
        <div>Profile: Lakshya (SRMIST Chennai)</div>
      </div>
    `;
  }

  // Update Minimap radar (with Biomes, Landmarks, Live Dragons, and Island Express Trains)
  public updateMinimap(
    playerPos: { x: number; y: number; z: number },
    yaw: number,
    dragons?: { position: { x: number; y: number; z: number }; config: { name: string; eyeColor: number; bodyColor: number } }[],
    trains?: { position: { x: number; y: number; z: number }; rotation: { y: number } }[]
  ) {
    const now = performance.now();
    if (now - this.lastMinimapUpdate < 40) return;
    this.lastMinimapUpdate = now;

    // Update Header Coordinates & 8-point Compass Heading
    const coordsEl = document.getElementById('minimap-coords');
    if (coordsEl) {
      coordsEl.textContent = `X:${Math.round(playerPos.x)} Z:${Math.round(playerPos.z)}`;
    }

    const headingEl = document.getElementById('minimap-heading');
    if (headingEl) {
      const deg = ((yaw * 180 / Math.PI) % 360 + 360) % 360;
      let dir = 'N';
      if (deg >= 22.5 && deg < 67.5) dir = 'NW';
      else if (deg >= 67.5 && deg < 112.5) dir = 'W';
      else if (deg >= 112.5 && deg < 157.5) dir = 'SW';
      else if (deg >= 157.5 && deg < 202.5) dir = 'S';
      else if (deg >= 202.5 && deg < 247.5) dir = 'SE';
      else if (deg >= 247.5 && deg < 292.5) dir = 'E';
      else if (deg >= 292.5 && deg < 337.5) dir = 'NE';
      headingEl.textContent = dir;
    }

    // Update Nearest Landmark
    const nearestEl = document.getElementById('minimap-nearest-landmark');
    if (nearestEl) {
      let closestName = 'Crossroads Citadel';
      let minDist = Infinity;
      for (const lm of PORTFOLIO_DATA.landmarks) {
        const dist = Math.hypot(lm.coords[0] - playerPos.x, lm.coords[2] - playerPos.z);
        if (dist < minDist) {
          minDist = dist;
          closestName = lm.name;
        }
      }
      nearestEl.textContent = `${closestName} (${Math.round(minDist)}m)`;
    }

    if (!this.minimapCanvas) {
      this.minimapCanvas = document.getElementById('minimap-canvas') as HTMLCanvasElement;
      if (this.minimapCanvas) {
        this.minimapCtx = this.minimapCanvas.getContext('2d');
      }
    }
    const canvas = this.minimapCanvas;
    const ctx = this.minimapCtx;
    if (!canvas || !ctx) return;

    const w = 180;
    const h = 180;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    const targetW = Math.round(w * pixelRatio);
    const targetH = Math.round(h * pixelRatio);
    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.clearRect(0, 0, w, h);

    const cx = 90;
    const cz = 90;
    const scale = 0.40 * this.minimapZoom;

    // 1. Radar background: Deep Ocean Depth Gradient
    const oceanGrad = ctx.createRadialGradient(cx, cz, 20, cx, cz, 110);
    oceanGrad.addColorStop(0, '#104b77');
    oceanGrad.addColorStop(0.5, '#0b3456');
    oceanGrad.addColorStop(1, '#061c31');
    ctx.fillStyle = oceanGrad;
    ctx.fillRect(0, 0, w, h);

    const originX = cx - playerPos.x * scale;
    const originZ = cz - playerPos.z * scale;

    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, w, h);
    ctx.clip();

    // Rounded square island outline matching 3D world (R = 200, cornerR = 55)
    const drawIslandShape = (margin = 0) => {
      ctx.beginPath();
      const r = (200 - margin) * scale;
      const cornerR = Math.max(6, (55 - margin) * scale);
      const minX = originX - r;
      const maxX = originX + r;
      const minZ = originZ - r;
      const maxZ = originZ + r;

      ctx.moveTo(minX + cornerR, minZ);
      ctx.lineTo(maxX - cornerR, minZ);
      ctx.quadraticCurveTo(maxX, minZ, maxX, minZ + cornerR);
      ctx.lineTo(maxX, maxZ - cornerR);
      ctx.quadraticCurveTo(maxX, maxZ, maxX - cornerR, maxZ);
      ctx.lineTo(minX + cornerR, maxZ);
      ctx.quadraticCurveTo(minX, maxZ, minX, maxZ - cornerR);
      ctx.lineTo(minX, minZ + cornerR);
      ctx.quadraticCurveTo(minX, minZ, minX + cornerR, minZ);
      ctx.closePath();
    };

    // Turquoise Coral Reef Shallow Shelf
    drawIslandShape(-6);
    ctx.fillStyle = 'rgba(6, 182, 212, 0.28)';
    ctx.fill();

    // Coastal Surf Foam
    drawIslandShape(-1.5);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // Golden beach shoreline fringe
    drawIslandShape(0);
    ctx.fillStyle = '#dfc47b';
    ctx.fill();

    // Clip all terrain and biomes strictly inside the island landmass
    ctx.save();
    drawIslandShape(4);
    ctx.clip();

    // Base interior plains (Rich vibrant grass)
    ctx.fillStyle = '#427e28';
    ctx.fillRect(originX - 210 * scale, originZ - 210 * scale, 420 * scale, 420 * scale);

    // Draw Country Territories on Minimap Radar
    const drawMiniCountry = (poly: [number, number][], color: string) => {
      ctx.beginPath();
      poly.forEach(([x, z], i) => {
        const px = originX + x * scale;
        const pz = originZ + z * scale;
        if (i === 0) ctx.moveTo(px, pz); else ctx.lineTo(px, pz);
      });
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
    };

    // 1. India (Subcontinent Peninsula - terracotta sandstone)
    drawMiniCountry([[35, -70], [80, -70], [130, -75], [160, -95], [175, -135], [150, -170], [115, -185], [75, -185], [35, -165], [25, -130], [28, -95], [35, -70]], '#b45309');
    // 2. China (Northern Pine Arc)
    drawMiniCountry([[-185, -95], [-160, -145], [-120, -175], [-70, -170], [-45, -140], [-45, -95], [-85, -80], [-130, -75], [-185, -95]], '#1e3f20');
    // 3. Japan (Archipelago - Sakura Blossom)
    drawMiniCountry([[-175, -60], [-160, -75], [-145, -95], [-135, -85], [-150, -65], [-165, -55], [-175, -60]], '#f472b6');
    // 4. South Korea (Peninsula)
    drawMiniCountry([[-75, -85], [-50, -85], [-45, -115], [-65, -125], [-75, -105], [-75, -85]], '#0284c7');
    // 5. UK (British Isles)
    drawMiniCountry([[-45, -55], [-20, -55], [-18, -80], [-35, -85], [-45, -70], [-45, -55]], '#dc2626');
    // 6. France (L’Hexagone)
    drawMiniCountry([[12, -25], [42, -25], [50, -55], [32, -65], [15, -55], [10, -35], [12, -25]], '#38bdf8');
    // 7. USA (Las Vegas Strip, Broadway & Hollywood)
    drawMiniCountry([[75, -60], [145, -60], [175, -45], [175, 25], [145, 45], [115, 45], [85, 25], [75, -10], [75, -60]], '#334155');
    // 8. Mexico (Mesoamerican Horn - terracotta)
    drawMiniCountry([[-185, 30], [-135, 25], [-85, 40], [-70, 75], [-105, 95], [-145, 80], [-185, 55], [-185, 30]], '#9a3412');
    // 9. Egypt (Sahara desert dunes)
    drawMiniCountry([[-175, 20], [-135, 20], [-135, 60], [-175, 60], [-175, 20]], '#eab308');
    // 10. UAE (Dubai Waterfront, Palm Jumeirah Archipelago, Burj Al Arab, Bluewaters & The World Islands)
    drawMiniCountry([[150, -60], [340, -60], [340, 160], [150, 160], [150, -60]], '#0d9488');
    // 12. Sunflower Valley
    drawMiniCountry([[-65, 30], [-25, 30], [-25, 65], [-65, 65], [-65, 30]], '#facc15');
    // Pier & Beach Boardwalk
    drawMiniCountry([[-40, 75], [40, 75], [40, 210], [-40, 210]], '#dfc47b');
    drawMiniCountry([[-25, 120], [35, 120], [35, 185], [-25, 185]], '#db2777');

    // =========================================================================
    // 11. SWISS CONFEDERATION · FROSTPEAK ALPS (Elevation Relief Shading)
    // =========================================================================
    // Alpine evergreen foothills
    drawMiniCountry([[-32, -128], [24, -128], [18, -84], [-28, -84], [-32, -128]], '#164e32');
    // Rocky crags base
    drawMiniCountry([[-28, -124], [20, -124], [15, -88], [-24, -88], [-28, -124]], '#475569');
    // Glacial ice slope (SE shadow)
    drawMiniCountry([[-24, -122], [18, -122], [12, -92], [-18, -92], [-24, -122]], '#7dd3fc');
    // Sunlit alpine snow slope (NW highlight)
    drawMiniCountry([[-24, -122], [-4, -122], [-6, -92], [-20, -92], [-24, -122]], '#f8fafc');
    // Summit ridge pristine snowcaps
    drawMiniCountry([[-14, -118], [8, -118], [2, -98], [-10, -98], [-14, -118]], '#ffffff');

    // Lake Serenity (natural frozen ice rink in the alpine bowl)
    ctx.fillStyle = '#bae6fd';
    ctx.beginPath();
    ctx.ellipse(originX - 10 * scale, originZ - 112 * scale, 9 * scale, 6 * scale, -0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#0284c7';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Chalet de Lakshya timber ski lodge footprint
    ctx.fillStyle = '#78350f';
    ctx.fillRect(originX - 22 * scale, originZ - 90 * scale, 8 * scale, 8 * scale);

    // SWISS FLAG BADGE 🇨🇭 (Frostpeak Alps Chalet Plinth)
    const swissFlagX = originX - 18 * scale;
    const swissFlagZ = originZ - 86 * scale;
    const sFlagSize = Math.max(9, 14 * scale);
    ctx.save();
    ctx.fillStyle = '#d52b1e'; // Official Swiss Red
    ctx.fillRect(swissFlagX - sFlagSize / 2, swissFlagZ - sFlagSize / 2, sFlagSize, sFlagSize);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 0.8;
    ctx.strokeRect(swissFlagX - sFlagSize / 2, swissFlagZ - sFlagSize / 2, sFlagSize, sFlagSize);
    // Swiss White Greek Cross
    ctx.fillStyle = '#ffffff';
    const sArm = sFlagSize * 0.22;
    const sLen = sFlagSize * 0.65;
    ctx.fillRect(swissFlagX - sArm / 2, swissFlagZ - sLen / 2, sArm, sLen);
    ctx.fillRect(swissFlagX - sLen / 2, swissFlagZ - sArm / 2, sLen, sArm);
    ctx.restore();

    // Yamuna river in India
    ctx.strokeStyle = '#0284c7';
    ctx.lineWidth = 5 * scale;
    ctx.beginPath();
    ctx.moveTo(originX + 75 * scale, originZ - 60 * scale);
    ctx.quadraticCurveTo(originX + 85 * scale, originZ - 100 * scale, originX + 75 * scale, originZ - 160 * scale);
    ctx.stroke();

    // Taj Mahal marble dome footprint
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(originX + 70 * scale, originZ - 152 * scale, 12 * scale, 12 * scale);
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 0.8;
    ctx.strokeRect(originX + 70 * scale, originZ - 152 * scale, 12 * scale, 12 * scale);

    // Giza Pyramids in Egypt (isometric shaded triangles)
    const drawMiniPyramid = (px: number, pz: number, sz: number) => {
      const rx = originX + px * scale;
      const rz = originZ + pz * scale;
      const s = sz * scale;
      // Sunlit NW side
      ctx.fillStyle = '#fef08a';
      ctx.beginPath();
      ctx.moveTo(rx, rz - s);
      ctx.lineTo(rx - s, rz + s);
      ctx.lineTo(rx, rz + s);
      ctx.closePath();
      ctx.fill();
      // Shaded SE side
      ctx.fillStyle = '#b45309';
      ctx.beginPath();
      ctx.moveTo(rx, rz - s);
      ctx.lineTo(rx, rz + s);
      ctx.lineTo(rx + s, rz + s);
      ctx.closePath();
      ctx.fill();
    };
    drawMiniPyramid(-155, 36, 9); // Khufu
    drawMiniPyramid(-142, 48, 7); // Khafre
    drawMiniPyramid(-132, 58, 5); // Menkaure

    // Great Wall in China (stone ramparts with watchtowers)
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 3.5 * scale;
    ctx.beginPath();
    ctx.moveTo(originX - 150 * scale, originZ - 140 * scale);
    ctx.quadraticCurveTo(originX - 115 * scale, originZ - 132 * scale, originX - 80 * scale, originZ - 140 * scale);
    ctx.stroke();

    // Hollywood ridge in USA
    ctx.fillStyle = 'rgba(215,168,121,.9)';
    ctx.beginPath();
    ctx.ellipse(originX + 165 * scale, originZ - 100 * scale, 22 * scale, 14 * scale, -.2, 0, Math.PI * 2);
    ctx.fill();

    // Hollywood Boulevard Walk of Fame
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2.4 * scale;
    ctx.beginPath();
    ctx.moveTo(originX + 161 * scale, originZ - 84 * scale);
    ctx.lineTo(originX + 161 * scale, originZ - 54 * scale);
    ctx.stroke();

    // Lightning McQueen Speedway track (Asphalt with red curb chevrons)
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 4 * scale;
    ctx.beginPath();
    ctx.ellipse(originX + 168 * scale, originZ - 24 * scale, 16 * scale, 9 * scale, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2 * scale;
    ctx.stroke();

    ctx.restore(); // restore island clip

    // Main Roads (Double-line Minecraft gravel and paved highway)
    const drawMiniRoad = (points: [number, number][]) => {
      ctx.beginPath();
      points.forEach(([x, z], i) => {
        const px = originX + x * scale;
        const pz = originZ + z * scale;
        if (i === 0) ctx.moveTo(px, pz); else ctx.lineTo(px, pz);
      });
      ctx.stroke();
    };
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    // Dark stone border
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = Math.max(2.4, 3.2 * this.minimapZoom);
    drawMiniRoad([[0, -20], [0, -65]]);
    drawMiniRoad([[20, 0], [150, 0]]);
    drawMiniRoad([[2, -60], [74, -106]]);
    drawMiniRoad([[-2, -55], [-70, -85]]);
    drawMiniRoad([[-20, 0], [-79, 50]]);
    drawMiniRoad([[0, 20], [0, 160]]);
    // Light cobblestone / sandstone fill
    ctx.strokeStyle = '#f8fafc';
    ctx.lineWidth = Math.max(1.2, 1.8 * this.minimapZoom);
    drawMiniRoad([[0, -20], [0, -65]]);
    drawMiniRoad([[20, 0], [150, 0]]);
    drawMiniRoad([[2, -60], [74, -106]]);
    drawMiniRoad([[-2, -55], [-70, -85]]);
    drawMiniRoad([[-20, 0], [-79, 50]]);
    drawMiniRoad([[0, 20], [0, 160]]);

    // Island Express Railway Transit Loop (Twin rails with sleeper ties)
    const railWaypoints = [
      [58, 33], [74, 33], [92, 33], [104, 32], [116, 28], [124, 38],
      [128, 48], [144, 50], [158, 64], [174, 78], [180, 88], [174, 98],
      [144, 98], [112, 98], [80, 96], [50, 92], [24, 88],
      [12, 74], [8, 54], [6, 36], [8, 22], [22, 22], [38, 27], [48, 32]
    ];
    ctx.save();
    // Sleeper ties
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = Math.max(2.8, 3.8 * this.minimapZoom);
    ctx.setLineDash([2, 4]);
    ctx.beginPath();
    railWaypoints.forEach(([wx, wz], idx) => {
      const rx = originX + wx * scale;
      const rz = originZ + wz * scale;
      if (idx === 0) ctx.moveTo(rx, rz); else ctx.lineTo(rx, rz);
    });
    ctx.closePath();
    ctx.stroke();
    // Steel rails
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = Math.max(1.2, 1.8 * this.minimapZoom);
    ctx.setLineDash([]);
    ctx.stroke();
    ctx.restore();

    // Railway Station Markers on Minimap
    const stations = [
      [58, 33], [116, 28], [128, 48], [24, 88], [8, 22]
    ];
    stations.forEach(([sx, sz]) => {
      const px = originX + sx * scale;
      const pz = originZ + sz * scale;
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(px, pz, Math.max(2, 2.8 * this.minimapZoom), 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#78350f';
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // Central Citadel Moat, 4 Bridges & Hub
    ctx.strokeStyle = '#0284c7';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(originX, originZ, 20 * scale, 0, Math.PI * 2);
    ctx.stroke();

    // 4 Moat Bridges
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(originX - 2 * scale, originZ - 23 * scale, 4 * scale, 6 * scale);
    ctx.fillRect(originX - 2 * scale, originZ + 17 * scale, 4 * scale, 6 * scale);
    ctx.fillRect(originX + 17 * scale, originZ - 2 * scale, 6 * scale, 4 * scale);
    ctx.fillRect(originX - 23 * scale, originZ - 2 * scale, 6 * scale, 4 * scale);

    ctx.fillStyle = '#64748b';
    ctx.beginPath();
    ctx.arc(originX, originZ, 16 * scale, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#facc15';
    ctx.beginPath();
    ctx.arc(originX, originZ, 3.5 * scale, 0, Math.PI * 2);
    ctx.fill();

    // Radar Range Rings and Crosshair Grid Lines
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.14)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cx, cz, 38, 0, Math.PI * 2);
    ctx.arc(cx, cz, 72, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.beginPath();
    ctx.moveTo(cx, 0); ctx.lineTo(cx, h);
    ctx.moveTo(0, cz); ctx.lineTo(w, cz);
    ctx.stroke();

    // 2. Comprehensive Landmark Pin Rendering
    const getPinColor = (tag: string) => {
      if (tag.includes('TAJ')) return '#ffffff';
      if (tag.includes('TOKYO')) return '#ec4899';
      if (tag.includes('MEXICO')) return '#fb923c';
      if (tag.includes('NEO') || tag.includes('TOWER')) return '#38bdf8';
      if (tag.includes('ALPS') || tag.includes('FROST')) return '#e0f2fe';
      if (tag.includes('SALOON')) return '#d97706';
      if (tag.includes('BEACH') || tag.includes('MARINA')) return '#06b6d4';
      if (tag.includes('CITADEL')) return '#4ade80';
      if (tag.includes('AIRPORT')) return '#0284c7';
      if (tag.includes('POLICE')) return '#3b82f6';
      if (tag.includes('HOSPITAL')) return '#fb7185';
      if (tag.includes('SCHOOL') || tag.includes('DHABA') || tag.includes('VARANASI')) return '#fbbf24';
      if (tag.includes('ZOO')) return '#22c55e';
      if (tag.includes('CASTLE')) return '#c084fc';
      if (tag.includes('EIFFEL')) return '#f472b6';
      if (tag.includes('RAILWAY') || tag.includes('MUMBAI')) return '#f97316';
      if (tag.includes('HOLLYWOOD')) return '#f59e0b';
      if (tag.includes('McQUEEN')) return '#ef4444';
      if (tag.includes('GREAT WALL')) return '#10b981';
      if (tag.includes('PAVILION')) return '#f43f5e';
      if (tag.includes('PYRAMID') || tag.includes('GIZA')) return '#eab308';
      if (tag.includes('CARNIVAL')) return '#f472b6';
      if (tag.includes('LONDON')) return '#dc2626';
      if (tag.includes('SEOUL')) return '#8b5cf6';
      if (tag.includes('DUBAI') || tag.includes('PALM')) return '#14b8a6';
      if (tag.includes('TEMPLE')) return '#a855f7';
      if (tag.includes('ISRO')) return '#38bdf8';
      if (tag.includes('HAWA MAHAL')) return '#fb923c';
      if (tag.includes('INDIA GATE')) return '#f59e0b';
      if (tag.includes('VALLEY')) return '#eab308';
      return '#94a3b8';
    };

    for (const lm of PORTFOLIO_DATA.landmarks) {
      const lx = cx + (lm.coords[0] - playerPos.x) * scale;
      const lz = cz + (lm.coords[2] - playerPos.z) * scale;

      if (lx >= 6 && lx <= w - 6 && lz >= 10 && lz <= h - 4) {
        // Red Banner Flag matching fantasy game map
        ctx.fillStyle = 'rgba(15, 23, 42, 0.45)';
        ctx.beginPath();
        ctx.ellipse(lx, lz + 1, 2.5, 1.2, 0, 0, Math.PI * 2);
        ctx.fill();

        // Flagpole
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(lx, lz);
        ctx.lineTo(lx, lz - 8);
        ctx.stroke();

        // Gold finial
        ctx.fillStyle = '#facc15';
        ctx.beginPath();
        ctx.arc(lx, lz - 8, 1, 0, Math.PI * 2);
        ctx.fill();

        // Red flag banner
        ctx.fillStyle = '#dc2626';
        ctx.beginPath();
        ctx.moveTo(lx, lz - 8);
        ctx.lineTo(lx + 6, lz - 5.5);
        ctx.lineTo(lx, lz - 3);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }

    // 3. Active Soaring Dragons
    if (dragons) {
      for (const d of dragons) {
        const dx = cx + (d.position.x - playerPos.x) * scale;
        const dz = cz + (d.position.z - playerPos.z) * scale;

        if (dx >= 4 && dx <= w - 4 && dz >= 4 && dz <= h - 4) {
          ctx.fillStyle = '#' + d.config.eyeColor.toString(16).padStart(6, '0');
          ctx.beginPath();
          ctx.moveTo(dx, dz - 4);
          ctx.lineTo(dx + 4, dz);
          ctx.lineTo(dx, dz + 4);
          ctx.lineTo(dx - 4, dz);
          ctx.closePath();
          ctx.fill();
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    // 3.5. Live Moving Express Trains on Minimap
    if (trains) {
      for (const t of trains) {
        const tx = cx + (t.position.x - playerPos.x) * scale;
        const tz = cz + (t.position.z - playerPos.z) * scale;
        if (tx >= 4 && tx <= w - 4 && tz >= 4 && tz <= h - 4) {
          ctx.save();
          ctx.translate(tx, tz);
          ctx.rotate(-t.rotation.y);
          ctx.fillStyle = '#0284c7';
          ctx.strokeStyle = '#facc15';
          ctx.lineWidth = 1;
          ctx.beginPath();
          if (typeof ctx.roundRect === 'function') {
            ctx.roundRect(-2.5, -5, 5, 10, 2);
          } else {
            ctx.rect(-2.5, -5, 5, 10);
          }
          ctx.fill();
          ctx.stroke();
          ctx.restore();
        }
      }
    }

    // 4. Center Player Indicator with FOV Vision Cone & Pulsing Beacon
    ctx.save();
    ctx.translate(cx, cz);
    ctx.rotate(-yaw);

    // Subtle radar vision cone pointing forward (towards -Z / top of arrow)
    const coneGrad = ctx.createRadialGradient(0, 0, 2, 0, 0, 32);
    coneGrad.addColorStop(0, 'rgba(56, 189, 248, 0.38)');
    coneGrad.addColorStop(1, 'rgba(56, 189, 248, 0.0)');
    ctx.fillStyle = coneGrad;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, 32, -Math.PI / 2 - 0.45, -Math.PI / 2 + 0.45);
    ctx.closePath();
    ctx.fill();

    // Player Direction Arrow
    ctx.fillStyle = '#ef4444';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(0, -9);
    ctx.lineTo(6, 6);
    ctx.lineTo(0, 3);
    ctx.lineTo(-6, 6);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Center pivot dot
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(0, 1.5, 1.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    // Cardinal Direction Compass Markers on Minimap Perimeter
    ctx.save();
    ctx.font = "bold 8px 'Press Start 2P', monospace";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // North (Gold with contrast shadow)
    ctx.fillStyle = '#facc15';
    ctx.shadowColor = '#000000';
    ctx.shadowBlur = 3;
    ctx.fillText('N', cx, 11);

    // South, East, West (Crisp slate-white)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
    ctx.fillText('S', cx, h - 10);
    ctx.fillText('W', 11, cz);
    ctx.fillText('E', w - 11, cz);
    ctx.restore();

    // Radar frame border
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(0.5, 0.5, w - 1, h - 1);

    ctx.restore(); // restore initial clip
  }

  public pushChatMessage(sender: string, text: string) {
    const chatContainer = document.getElementById('mc-chat-log');
    if (!chatContainer) return;

    // Highlight Minecraft coordinate tokens like [X: 4, Y: 2, Z: 8] or [X: -54, Z: -12]
    const formattedText = text.replace(/\[X:\s*([-\d.]+)(?:,\s*Y:\s*([-\d.]+))?,\s*Z:\s*([-\d.]+)\]/g, (match) => {
      return `<span class="mc-chat-coords">${match}</span>`;
    });

    const msgEl = document.createElement('div');
    msgEl.className = 'mc-chat-msg';
    msgEl.innerHTML = `<span class="mc-chat-sender">&lt;${sender}&gt;</span> ${formattedText}`;
    chatContainer.appendChild(msgEl);

    chatContainer.scrollTop = chatContainer.scrollHeight;
    setTimeout(() => {
      msgEl.classList.add('mc-chat-fade');
      setTimeout(() => msgEl.remove(), 2000);
    }, 9000);
  }

  public updateFlyStatus(isFlying: boolean) {
    const flyBtn = document.getElementById('btn-quick-fly');
    if (flyBtn) {
      flyBtn.textContent = `[FLY: ${isFlying ? 'ON' : 'OFF'}]`;
      flyBtn.classList.toggle('active', isFlying);
    }
    const touchFlyBtn = document.getElementById('btn-touch-fly');
    if (touchFlyBtn) {
      touchFlyBtn.textContent = isFlying ? '[FLYING]' : '[FLY]';
      touchFlyBtn.classList.toggle('active', isFlying);
    }
  }

  public updateClimateStatus(weather: string, season: string) {
    const weatherBtn = document.getElementById('btn-quick-weather');
    const seasonBtn = document.getElementById('btn-quick-season');
    if (weatherBtn) weatherBtn.textContent = `[WEATHER: ${weather.toUpperCase()}]`;
    if (seasonBtn) seasonBtn.textContent = `[SEASON: ${season.toUpperCase()}]`;
  }

  public updateTimeStatus(isNight: boolean) {
    const timeBtn = document.getElementById('btn-quick-time');
    if (timeBtn) timeBtn.textContent = `[TIME: ${isNight ? 'NIGHT' : 'DAY'}]`;
  }

  public showLiveRedirectToast(title: string, url: string) {
    let toast = document.getElementById('mc-redirect-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'mc-redirect-toast';
      toast.className = 'mc-redirect-toast';
      document.body.appendChild(toast);
    }

    toast.innerHTML = `
      <div class="mc-toast-content">
        <span class="mc-toast-tag">[LAUNCH]</span>
        <span class="mc-toast-title">${title}</span>
        <a href="${url}" target="_blank" rel="noopener noreferrer" class="mc-toast-link">[CLICK TO OPEN LIVE SITE]</a>
        <button class="mc-toast-close" id="mc-toast-close-btn">X</button>
      </div>
    `;
    toast.style.display = 'block';

    document.getElementById('mc-toast-close-btn')?.addEventListener('click', (e) => {
      e.stopPropagation();
      toast!.style.display = 'none';
    });

    setTimeout(() => {
      if (toast) toast.style.display = 'none';
    }, 10000);
  }

  // -------------------------------------------------------------
  // PISTON CUP RACING HUD & DOC HUDSON CHALLENGE OVERLAY
  // -------------------------------------------------------------
  public updateRacingHUD(
    isDrivingMcQueen: boolean,
    speed: number,
    isShift: boolean,
    isSpace: boolean,
    raceState?: RaceChallengeState
  ) {
    let hud = document.getElementById('mc-racing-hud');
    if (!hud) {
      hud = document.createElement('div');
      hud.id = 'mc-racing-hud';
      hud.className = 'mc-racing-hud';
      hud.innerHTML = `
        <div class="mc-racing-cluster">
          <div class="mc-racing-badge">⚡ LIGHTNING McQUEEN #95</div>
          <div class="mc-racing-speed-val"><span id="mc-race-speed">0</span> <small>MPH</small></div>
          <div class="mc-racing-nitro-label">NITRO BOOST</div>
          <div class="mc-racing-nitro-bar"><div id="mc-race-nitro-fill" class="mc-racing-nitro-fill"></div></div>
          <div class="mc-racing-controls-hint">W: Gas · S: Brake/Rev · SPACE: Drift · SHIFT: Nitro · E: Exit</div>
        </div>

        <div id="mc-race-challenge-panel" class="mc-race-challenge-panel" style="display: none;">
          <div class="mc-challenge-header">🏆 WILLY'S BUTTE RACE · vs DOC HUDSON #51</div>
          <div class="mc-challenge-stats">
            <div class="mc-challenge-stat"><span class="mc-label">POSITION</span> <span id="mc-race-pos" class="mc-pos-p1">P1</span></div>
            <div class="mc-challenge-stat"><span class="mc-label">LAP</span> <span id="mc-race-lap">1/2</span></div>
            <div class="mc-challenge-stat"><span class="mc-label">TIME</span> <span id="mc-race-time">00:00.0</span></div>
            <div class="mc-challenge-stat"><span class="mc-label">SECTORS</span>
              <span id="mc-race-sectors" class="mc-sectors-row">
                <span class="mc-sector-pip" id="mc-sec-1">S1</span>
                <span class="mc-sector-pip" id="mc-sec-2">S2</span>
                <span class="mc-sector-pip" id="mc-sec-3">S3</span>
              </span>
            </div>
          </div>
        </div>

        <div id="mc-race-big-banner" class="mc-race-big-banner" style="display: none;"></div>
      `;
      document.body.appendChild(hud);
    }

    if (!isDrivingMcQueen) {
      hud.style.display = 'none';
      return;
    }

    hud.style.display = 'block';

    // Speedometer MPH
    const mph = Math.round(Math.abs(speed) * 4.6);
    const speedEl = document.getElementById('mc-race-speed');
    if (speedEl) speedEl.textContent = `${mph}`;

    // Nitro Bar
    const nitroFill = document.getElementById('mc-race-nitro-fill');
    if (nitroFill) {
      const nitroPct = isShift ? 100 : Math.min(100, Math.max(25, (Math.abs(speed) / 26.0) * 100));
      nitroFill.style.width = `${nitroPct}%`;
      if (isShift) {
        nitroFill.classList.add('boosting');
      } else {
        nitroFill.classList.remove('boosting');
      }
    }

    // Doc Hudson Challenge Panel
    const challengePanel = document.getElementById('mc-race-challenge-panel');
    const bigBanner = document.getElementById('mc-race-big-banner');

    if (raceState && raceState.active) {
      if (challengePanel) challengePanel.style.display = 'block';

      if (raceState.state === 'countdown') {
        const stage = raceState.countdownStage || 1;
        if (bigBanner) {
          bigBanner.style.display = 'block';
          bigBanner.innerHTML = `
            <div class="mc-starting-gantry">
              <div class="mc-gantry-title">🏁 STARTING GRID · READY SET GO 🏁</div>
              <div class="mc-gantry-lights">
                <div class="mc-gantry-lamp-box ${stage >= 1 ? 'lit red' : ''}">
                  <div class="mc-gantry-bulb"></div>
                  <span class="mc-lamp-lbl">RED</span>
                </div>
                <div class="mc-gantry-lamp-box ${stage >= 2 ? 'lit red' : ''}">
                  <div class="mc-gantry-bulb"></div>
                  <span class="mc-lamp-lbl">RED</span>
                </div>
                <div class="mc-gantry-lamp-box ${stage >= 3 ? 'lit yellow' : ''}">
                  <div class="mc-gantry-bulb"></div>
                  <span class="mc-lamp-lbl">YELLOW</span>
                </div>
                <div class="mc-gantry-lamp-box ${stage >= 4 ? 'lit green' : ''}">
                  <div class="mc-gantry-bulb"></div>
                  <span class="mc-lamp-lbl">GREEN</span>
                </div>
              </div>
              <div class="mc-gantry-action ${stage >= 4 ? 'go' : ''}">
                ${stage === 1 ? '🔴 READY...' : stage === 2 ? '🔴 SET...' : stage === 3 ? '🟡 REV ENGINES!' : '🟢 GO! GO! GO! ⚡'}
              </div>
            </div>
          `;
        }
      } else if (raceState.state === 'racing') {
        if (bigBanner) {
          if (raceState.elapsedTime < 1.4) {
            bigBanner.style.display = 'block';
            bigBanner.innerHTML = `<span class="mc-countdown-number go">GO! GO! GO! ⚡</span>`;
          } else {
            bigBanner.style.display = 'none';
          }
        }

        const posEl = document.getElementById('mc-race-pos');
        if (posEl) {
          posEl.textContent = `P${raceState.playerPosition}`;
          posEl.className = raceState.playerPosition === 1 ? 'mc-pos-p1' : 'mc-pos-p2';
        }

        const lapEl = document.getElementById('mc-race-lap');
        if (lapEl) {
          const isFinal = raceState.playerLap === raceState.totalLaps;
          lapEl.textContent = `${Math.min(raceState.totalLaps, raceState.playerLap)}/${raceState.totalLaps}${isFinal ? ' (FINAL)' : ''}`;
        }

        const timeEl = document.getElementById('mc-race-time');
        if (timeEl) {
          const totalSec = Math.floor(raceState.elapsedTime);
          const mins = Math.floor(totalSec / 60).toString().padStart(2, '0');
          const secs = (totalSec % 60).toString().padStart(2, '0');
          const dec = Math.floor((raceState.elapsedTime % 1) * 10);
          timeEl.textContent = `${mins}:${secs}.${dec}`;
        }

        // Sectors indicator
        const s1 = document.getElementById('mc-sec-1');
        const s2 = document.getElementById('mc-sec-2');
        const s3 = document.getElementById('mc-sec-3');
        if (s1) s1.className = (raceState.playerSectors?.includes(1)) ? 'mc-sector-pip active' : 'mc-sector-pip';
        if (s2) s2.className = (raceState.playerSectors?.includes(2)) ? 'mc-sector-pip active' : 'mc-sector-pip';
        if (s3) s3.className = (raceState.playerSectors?.includes(3)) ? 'mc-sector-pip active' : 'mc-sector-pip';
      } else if (raceState.state === 'finished') {
        if (bigBanner) {
          bigBanner.style.display = 'block';
          if (raceState.winner === 'player') {
            bigBanner.innerHTML = `
              <div class="mc-finish-banner victory">
                <div class="mc-finish-title">🏆 VICTORY! KA-CHOW! ⚡</div>
                <div class="mc-finish-sub">You out-drifted The Fabulous Hudson Hornet around Willy's Butte!</div>
              </div>`;
          } else {
            bigBanner.innerHTML = `
              <div class="mc-finish-banner defeat">
                <div class="mc-finish-title">🏁 DOC HUDSON WINS! 🏁</div>
                <div class="mc-finish-sub">"When you're entering the dirt, turn right to go left! Try again, rookie!"</div>
              </div>`;
          }
        }
      }
    } else {
      if (challengePanel) challengePanel.style.display = 'none';
      if (bigBanner) bigBanner.style.display = 'none';
    }
  }
}
