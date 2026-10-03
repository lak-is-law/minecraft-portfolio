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

  constructor() {
    this.renderHUD();
    this.setupListeners();
    this.pushChatMessage('System', 'Welcome to Lakshya\'s Minecraft Portfolio World!');
    this.pushChatMessage('Lakshya', 'Explore 9 structures to see my live projects, experience, skills, and resume.');
    this.pushChatMessage('Tip', 'Press [E] to interact with pedestals, chests, and signs. Hammer banners to launch live sites.');
  }

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
        <button class="mc-chip-btn" id="btn-quick-projects">[PROJECTS]</button>
        <button class="mc-chip-btn" id="btn-quick-experience">[CITADEL]</button>
        <button class="mc-chip-btn" id="btn-quick-skills">[SKILLS]</button>
        <button class="mc-chip-btn" id="btn-quick-resume">[RESUME]</button>
        <button class="mc-chip-btn" id="btn-quick-map">[MAP: M]</button>
        <button class="mc-chip-btn" id="btn-quick-sound">[AUDIO: ON]</button>
        <button class="mc-chip-btn" id="btn-quick-fly">[FLY: OFF]</button>
      </div>
    `;

    // 5. Minimap container in top-right
    const minimapEl = document.getElementById('mc-minimap')!;
    minimapEl.innerHTML = `
      <div class="mc-minimap-box">
        <canvas id="minimap-canvas" width="120" height="120"></canvas>
        <div class="mc-minimap-heading" id="minimap-heading">N</div>
      </div>
    `;
  }

  private setupListeners() {
    // Click on hotbar slots
    document.querySelectorAll('.mc-hotbar-slot').forEach(el => {
      el.addEventListener('click', (e) => {
        const slotIdx = parseInt((e.currentTarget as HTMLElement).getAttribute('data-slot') || '0', 10);
        this.selectSlot(slotIdx);
      });
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

    if (target.targetBanner) {
      const p = target.targetBanner.project;
      promptEl.innerHTML = `<span class="mc-key-badge" style="background:#ef4444;color:#fff;">[HAMMER: LEFT CLICK]</span> Launch Live Site: <strong>${p.title}</strong> [OPEN]`;
    } else if (target.interactable) {
      const inter = target.interactable;
      if (inter.type === 'project') {
        promptEl.innerHTML = `<span class="mc-key-badge">[E]</span> View Project: <strong>${inter.title}</strong>`;
      } else if (inter.type === 'chest') {
        promptEl.innerHTML = `<span class="mc-key-badge">[E]</span> Open: <strong>${inter.title}</strong>`;
      } else if (inter.type === 'experience') {
        promptEl.innerHTML = `<span class="mc-key-badge">[E]</span> Inspect: <strong>${inter.title}</strong>`;
      } else if (inter.type === 'leadership') {
        promptEl.innerHTML = `<span class="mc-key-badge">[E]</span> Inspect: <strong>${inter.title}</strong>`;
      } else if (inter.type === 'research') {
        promptEl.innerHTML = `<span class="mc-key-badge">[E]</span> Inspect Research: <strong>${inter.title}</strong>`;
      } else if (inter.type === 'interests') {
        promptEl.innerHTML = `<span class="mc-key-badge">[E]</span> Explore: <strong>${inter.title}</strong>`;
      } else if (inter.type === 'languages') {
        promptEl.innerHTML = `<span class="mc-key-badge">[E]</span> Inspect: <strong>${inter.title}</strong>`;
      } else if (inter.type === 'minigame') {
        promptEl.innerHTML = `<span class="mc-key-badge">[E]</span> Builder Arena: <strong>${inter.title}</strong>`;
      } else if (inter.type === 'skills') {
        promptEl.innerHTML = `<span class="mc-key-badge">[E]</span> Open: <strong>Skills Matrix</strong>`;
      } else if (inter.type === 'sign') {
        promptEl.innerHTML = `<span class="mc-key-badge">[E]</span> Read Sign: <strong>${inter.title}</strong>`;
      } else if (inter.type === 'teleport') {
        promptEl.innerHTML = `<span class="mc-key-badge">[E]</span> Enter: <strong>Nether Portal</strong>`;
      }
    } else {
      promptEl.innerHTML = `<span class="mc-key-hint">[Left Click] Mine</span> | <span class="mc-key-hint">[Right Click] Place Block</span>`;
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

  // Update Minimap radar
  public updateMinimap(playerPos: { x: number; y: number; z: number }, yaw: number) {
    const canvas = document.getElementById('minimap-canvas') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, 120, 120);

    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, 120, 120);

    const cx = 60;
    const cz = 60;
    const scale = 0.65;

    for (const lm of PORTFOLIO_DATA.landmarks) {
      const lx = cx + (lm.coords[0] - playerPos.x) * scale;
      const lz = cz + (lm.coords[2] - playerPos.z) * scale;

      if (lx >= 4 && lx <= 116 && lz >= 4 && lz <= 116) {
        ctx.fillStyle = '#facc15';
        ctx.fillRect(lx - 2.5, lz - 2.5, 5, 5);
      }
    }

    ctx.save();
    ctx.translate(cx, cz);
    ctx.rotate(-yaw);

    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.moveTo(0, -6);
    ctx.lineTo(4, 5);
    ctx.lineTo(0, 3);
    ctx.lineTo(-4, 5);
    ctx.closePath();
    ctx.fill();

    ctx.restore();

    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 2;
    ctx.strokeRect(1, 1, 118, 118);

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
    }
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
