import { PORTFOLIO_DATA } from '../data/portfolioData';
import { TargetInfo } from '../engine/player';
import { sound } from '../engine/audio';
import { ASSETS } from './assets';

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
    { id: 'projects_book', name: 'Projects Journal', icon: ASSETS.book, action: 'project' },
    { id: 'skills_potion', name: 'Skills Alchemy Elixir', icon: ASSETS.potion, action: 'skills' },
    { id: 'compass', name: 'Fast-Travel Compass', icon: ASSETS.compass, action: 'fasttravel' },
    { id: 'day_night', name: 'Day / Night Torch', icon: ASSETS.torch, action: 'daynight' },
    { id: 'resume_chest', name: 'Resume Loot Chest', icon: ASSETS.chest, action: 'resume' },
  ];

  public activeSlotIndex: number = 1; // default to Pickaxe
  private f3Visible: boolean = false;
  private chatMessages: { sender: string; text: string; time: number }[] = [];

  // Callbacks
  public onDayNightToggle?: () => void;
  public onOpenProjects?: () => void;
  public onOpenSkills?: () => void;
  public onOpenFastTravel?: () => void;
  public onOpenResume?: () => void;
  public onBlockSelected?: (blockType: string) => void;
  public onTakeScreenshot?: () => void;
  public onTogglePerspective?: () => void;
  public onToggleSit?: () => void;

  constructor() {
    this.renderHUD();
    this.setupListeners();
    this.pushChatMessage('System', 'Welcome to Lakshya\'s Minecraft Portfolio World!');
    this.pushChatMessage('Lakshya', 'Explore 9 structures to see my live projects, experience, skills, and resume.');
    this.pushChatMessage('Tip', document.body.classList.contains('touch-device')
      ? 'Use [USE] to inspect objects and [MINE] to launch banner links.'
      : 'Press [E] to interact with objects. Hammer banners to launch live sites.');
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
        <button class="mc-chip-btn" id="btn-quick-projects" title="View Project Portfolios">[PROJECTS]</button>
        <button class="mc-chip-btn" id="btn-quick-map" title="Interactive World Map (Key: M)">[MAP: M]</button>
        <button class="mc-chip-btn" id="btn-quick-skills" title="Skills Matrix">[SKILLS]</button>
        <button class="mc-chip-btn" id="btn-quick-resume" title="Official Resume">[RESUME]</button>
        <button class="mc-chip-btn" id="btn-quick-fly" title="Toggle Creative Flight">[FLY: OFF]</button>
        <button class="mc-chip-btn" id="btn-quick-weather" title="Cycle clear, rain, thunder, rainbow, and snowfall">[WEATHER: CLEAR]</button>
        <button class="mc-chip-btn" id="btn-quick-season" title="Cycle spring, summer, autumn, and winter">[SEASON: SPRING]</button>
        <button class="mc-chip-btn" id="btn-quick-perspective" title="Toggle 1P / 3P View (F5)">[VIEW: 1P]</button>
        <button class="mc-chip-btn" id="btn-quick-sound" title="Toggle Audio">[AUDIO: ON]</button>
        <button class="mc-chip-btn" id="btn-quick-unlock" title="Open Pause Menu (Key: ESC)">[PAUSE: ESC]</button>
      </div>
    `;

    // 5. Minimap container in top-left (Click/Tap to Maximise)
    const minimapEl = document.getElementById('mc-minimap')!;
    minimapEl.innerHTML = `
      <div class="mc-minimap-box" id="mc-minimap-box" title="Click or Tap to Maximise World Map (Key: M)">
        <div class="mc-minimap-top-bar">
          <span class="mc-minimap-title">[MAP: M]</span>
          <span class="mc-minimap-heading" id="minimap-heading">N</span>
        </div>
        <canvas id="minimap-canvas" width="130" height="130"></canvas>
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
    document.getElementById('btn-quick-map')?.addEventListener('click', () => this.onOpenFastTravel?.());
    document.getElementById('btn-quick-weather')?.addEventListener('click', () => this.onCycleWeather?.());
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
    document.getElementById('mc-minimap-box')?.addEventListener('click', () => {
      if (document.pointerLockElement) {
        document.exitPointerLock();
      }
      this.onOpenFastTravel?.();
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
        promptEl.innerHTML = `<span class="mc-key-badge">${useBadge}</span> Open: <strong>Skills Matrix</strong>`;
      } else if (inter.type === 'sign') {
        promptEl.innerHTML = `<span class="mc-key-badge">${useBadge}</span> Read Sign: <strong>${inter.title}</strong>`;
      } else if (inter.type === 'teleport') {
        promptEl.innerHTML = `<span class="mc-key-badge">${useBadge}</span> Enter: <strong>Nether Portal</strong>`;
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

  // Update Minimap radar (with Biomes, Landmarks, and Live Dragons)
  public updateMinimap(
    playerPos: { x: number; y: number; z: number },
    yaw: number,
    dragons?: { position: { x: number; y: number; z: number }; config: { name: string; eyeColor: number; bodyColor: number } }[]
  ) {
    const canvas = document.getElementById('minimap-canvas') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = 130;
    const h = 130;
    ctx.clearRect(0, 0, w, h);

    // 1. Radar background
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, w, h);

    const cx = 65;
    const cz = 65;
    const scale = 0.52;

    const originX = cx - playerPos.x * scale;
    const originZ = cz - playerPos.z * scale;
    const islandR = 112 * scale;

    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, w, h);
    ctx.clip();

    // 1. Island landmass disk
    ctx.fillStyle = '#15803d'; // Green base island
    ctx.beginPath();
    ctx.arc(originX, originZ, islandR, 0, Math.PI * 2);
    ctx.fill();

    // Color the actual north-up regions as map areas instead of overlapping blobs.
    const worldRect = (x1: number, z1: number, x2: number, z2: number, color: string) => {
      ctx.fillStyle = color;
      ctx.fillRect(originX + x1 * scale, originZ + z1 * scale, (x2 - x1) * scale, (z2 - z1) * scale);
    };
    worldRect(-35, -130, 35, -65, '#dbeafe');
    worldRect(-108, -112, -25, -45, '#be789e');
    worldRect(25, -112, 108, -55, '#c7a94e');
    worldRect(45, -45, 108, 45, '#47798b');
    worldRect(-108, 8, -35, 75, '#a95e36');
    worldRect(-108, 55, 108, 108, '#d0ad58');

    // Roads and the citadel read clearly at radar scale.
    ctx.strokeStyle = 'rgba(226,232,240,.8)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(originX, originZ - 20 * scale); ctx.lineTo(originX, originZ - 65 * scale);
    ctx.moveTo(originX, originZ + 20 * scale); ctx.lineTo(originX, originZ + 108 * scale);
    ctx.moveTo(originX + 20 * scale, originZ); ctx.lineTo(originX + 78 * scale, originZ);
    ctx.moveTo(originX - 20 * scale, originZ); ctx.lineTo(originX - 66 * scale, originZ + 30 * scale);
    ctx.stroke();

    // Central Citadel Moat & Hub
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(originX, originZ, 20 * scale, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = '#64748b';
    ctx.beginPath();
    ctx.arc(originX, originZ, 16 * scale, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    // Crosshair grid lines
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx, 0); ctx.lineTo(cx, h);
    ctx.moveTo(0, cz); ctx.lineTo(w, cz);
    ctx.stroke();

    // 2. Landmarks
    for (const lm of PORTFOLIO_DATA.landmarks) {
      const lx = cx + (lm.coords[0] - playerPos.x) * scale;
      const lz = cz + (lm.coords[2] - playerPos.z) * scale;

      if (lx >= 5 && lx <= w - 5 && lz >= 5 && lz <= h - 5) {
        if (lm.tag === '[TAJ MAHAL]') ctx.fillStyle = '#ffffff';
        else if (lm.tag === '[SAKURA]') ctx.fillStyle = '#f472b6';
        else if (lm.tag === '[PUEBLO]') ctx.fillStyle = '#fb923c';
        else if (lm.tag === '[NEO YORK]') ctx.fillStyle = '#38bdf8';
        else if (lm.tag === '[LAK TOWER]') ctx.fillStyle = '#facc15';
        else if (lm.tag === '[FROSTPEAK]') ctx.fillStyle = '#e0f2fe';
        else if (lm.tag === '[SALOON]') ctx.fillStyle = '#a16207';
        else if (lm.tag === '[BEACH]') ctx.fillStyle = '#06b6d4';
        else if (lm.tag === '[CITADEL]') ctx.fillStyle = '#4ade80';
        else if (lm.tag.includes('AIRPORT')) ctx.fillStyle = '#38bdf8';
        else if (lm.tag.includes('POLICE')) ctx.fillStyle = '#60a5fa';
        else if (lm.tag.includes('HOSPITAL')) ctx.fillStyle = '#fb7185';
        else if (lm.tag.includes('SCHOOL')) ctx.fillStyle = '#fbbf24';
        else if (lm.tag.includes('ZOO')) ctx.fillStyle = '#4ade80';
        else if (lm.tag.includes('CASTLE')) ctx.fillStyle = '#c084fc';
        else if (lm.tag.includes('MEXICO')) ctx.fillStyle = '#34d399';
        else if (lm.tag.includes('EIFFEL')) ctx.fillStyle = '#f9a8d4';
        else if (lm.tag.includes('RAILWAY')) ctx.fillStyle = '#f97316';
        else ctx.fillStyle = '#94a3b8';

        ctx.fillRect(lx - 2, lz - 2, 4, 4);
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
        }
      }
    }

    // 4. Center Player Arrow
    ctx.save();
    ctx.translate(cx, cz);
    ctx.rotate(-yaw);

    ctx.fillStyle = '#ef4444';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, -7);
    ctx.lineTo(5, 5);
    ctx.lineTo(0, 3);
    ctx.lineTo(-5, 5);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.restore();

    // Radar frame border
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1;
    ctx.strokeRect(0.5, 0.5, w - 1, h - 1);

    const headingEl = document.getElementById('minimap-heading');
    if (headingEl) {
      const deg = ((yaw * 180 / Math.PI) % 360 + 360) % 360;
      let dir = 'N';
      if (deg >= 45 && deg < 135) dir = 'W';
      else if (deg >= 135 && deg < 225) dir = 'S';
      else if (deg >= 225 && deg < 315) dir = 'E';
      headingEl.textContent = dir;
    }
  }

  public pushChatMessage(sender: string, text: string) {
    const chatContainer = document.getElementById('mc-chat-log');
    if (!chatContainer) return;

    const msgEl = document.createElement('div');
    msgEl.className = 'mc-chat-msg';
    msgEl.innerHTML = `<span class="mc-chat-sender">&lt;${sender}&gt;</span> ${text}`;
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
}
