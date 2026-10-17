import { PORTFOLIO_DATA, Project, Experience } from '../data/portfolioData';
import { sound } from '../engine/audio';
import { ASSETS } from './assets';
import { COUNTRY_COAST_POINTS } from '../world/buildings';
import { AdventureMapRenderer } from './adventureMap';

export interface NPCDialogOption {
  label: string;
  response?: string;
  action?: () => void;
  nextOptions?: NPCDialogOption[];
  styleClass?: 'mc-btn-green' | 'mc-btn-blue' | 'mc-btn-gold' | 'mc-btn-stone' | 'mc-btn-red';
  badge?: string;
}

export interface NPCDialogData {
  id: string;
  name: string;
  title: string;
  subtitle?: string;
  badge?: string;
  badgeColor?: string;
  locationBadge?: string;
  avatarHtml: string;
  text: string;
  options: NPCDialogOption[];
  onDone?: () => void;
  onOptionSelect?: (option: NPCDialogOption, data: NPCDialogData) => void;
}

export function getCitizenAvatarHtml(emoji: string = '👤', bgColor: string = '#1e293b'): string {
  return `<div class="mc-npc-animal-avatar" style="background: ${bgColor}; font-size: 26px;">
    <span>${emoji}</span>
  </div>`;
}

export function getLakshyaAvatarHtml(): string {
  return `<svg viewBox="0 0 32 32" width="56" height="56" style="image-rendering: pixelated; border-radius: 4px;">
    <rect width="32" height="32" fill="#1e293b"/>
    <rect x="6" y="2" width="20" height="7" fill="#171717"/>
    <rect x="4" y="5" width="4" height="10" fill="#171717"/>
    <rect x="24" y="5" width="4" height="10" fill="#171717"/>
    <rect x="7" y="7" width="18" height="16" fill="#f5d0a9"/>
    <rect x="9" y="12" width="4" height="3" fill="#ffffff"/>
    <rect x="11" y="12" width="2" height="3" fill="#1e293b"/>
    <rect x="19" y="12" width="4" height="3" fill="#ffffff"/>
    <rect x="19" y="12" width="2" height="3" fill="#1e293b"/>
    <rect x="12" y="18" width="8" height="2" fill="#b45309"/>
    <rect x="6" y="23" width="20" height="9" fill="#881337"/>
    <polygon points="16,23 12,28 20,28" fill="#facc15"/>
  </svg>`;
}

export function getRogerAvatarHtml(): string {
  return `<svg viewBox="0 0 32 32" width="56" height="56" style="image-rendering: pixelated; border-radius: 4px;">
    <rect width="32" height="32" fill="#36291a"/>
    <rect x="6" y="7" width="20" height="18" fill="#eab308"/>
    <rect x="4" y="6" width="5" height="11" fill="#ca8a04"/>
    <rect x="23" y="6" width="5" height="11" fill="#ca8a04"/>
    <rect x="9" y="13" width="14" height="10" fill="#fef08a"/>
    <rect x="13" y="14" width="6" height="4" fill="#1c1917"/>
    <rect x="8" y="10" width="3" height="3" fill="#1c1917"/>
    <rect x="21" y="10" width="3" height="3" fill="#1c1917"/>
    <rect x="7" y="25" width="18" height="4" fill="#dc2626"/>
    <circle cx="16" cy="27" r="2" fill="#facc15"/>
  </svg>`;
}

export function getAnimalAvatarHtml(emoji: string, bgColor: string = '#1e293b'): string {
  return `<div class="mc-npc-animal-avatar" style="background: ${bgColor};">
    <span>${emoji}</span>
  </div>`;
}

export function getLightningMcQueenAvatarHtml(): string {
  return `<svg viewBox="0 0 32 32" width="56" height="56" style="image-rendering: pixelated; border-radius: 4px;">
    <rect width="32" height="32" fill="#1e1b18"/>
    <rect x="3" y="10" width="26" height="16" rx="3" fill="#cf1017"/>
    <rect x="5" y="6" width="22" height="6" fill="#b91c1c"/>
    <rect x="7" y="7" width="18" height="6" fill="#ffffff"/>
    <rect x="10" y="8" width="4" height="4" fill="#0284c7"/>
    <rect x="11" y="9" width="2" height="2" fill="#0f172a"/>
    <rect x="18" y="8" width="4" height="4" fill="#0284c7"/>
    <rect x="19" y="9" width="2" height="2" fill="#0f172a"/>
    <rect x="9" y="6" width="6" height="2" fill="#cf1017"/>
    <rect x="17" y="6" width="6" height="2" fill="#cf1017"/>
    <rect x="10" y="21" width="12" height="3" fill="#18181b"/>
    <rect x="11" y="21" width="10" height="2" fill="#f8fafc"/>
    <rect x="4" y="14" width="4" height="4" fill="#facc15"/>
    <rect x="24" y="14" width="4" height="4" fill="#facc15"/>
    <polygon points="4,19 8,18 6,22" fill="#facc15"/>
    <polygon points="28,19 24,18 26,22" fill="#facc15"/>
    <rect x="1" y="19" width="3" height="6" fill="#171717"/>
    <rect x="28" y="19" width="3" height="6" fill="#171717"/>
  </svg>`;
}

export function getDocHudsonAvatarHtml(): string {
  return `<svg viewBox="0 0 32 32" width="56" height="56" style="image-rendering: pixelated; border-radius: 4px;">
    <rect width="32" height="32" fill="#070f1a"/>
    <rect x="2" y="11" width="28" height="15" rx="3" fill="#10243d"/>
    <rect x="4" y="7" width="24" height="6" fill="#0c1d32"/>
    <rect x="6" y="8" width="20" height="5" fill="#f1f5f9"/>
    <rect x="15" y="8" width="2" height="5" fill="#94a3b8"/>
    <rect x="9" y="9" width="4" height="4" fill="#b45309"/>
    <rect x="10" y="10" width="2" height="2" fill="#0a0a0a"/>
    <rect x="19" y="9" width="4" height="4" fill="#b45309"/>
    <rect x="20" y="10" width="2" height="2" fill="#0a0a0a"/>
    <rect x="8" y="7" width="6" height="2" fill="#10243d"/>
    <rect x="18" y="7" width="6" height="2" fill="#10243d"/>
    <rect x="6" y="21" width="20" height="4" fill="#020617"/>
    <rect x="8" y="22" width="16" height="2" fill="#e2e8f0"/>
    <rect x="14" y="21" width="4" height="4" fill="#dc2626"/>
    <rect x="4" y="15" width="4" height="3" fill="#facc15"/>
    <rect x="24" y="15" width="4" height="3" fill="#facc15"/>
    <rect x="1" y="20" width="3" height="6" fill="#f8fafc"/>
    <rect x="28" y="20" width="3" height="6" fill="#f8fafc"/>
    <rect x="2" y="22" width="1" height="2" fill="#10243d"/>
    <rect x="29" y="22" width="1" height="2" fill="#10243d"/>
  </svg>`;
}

export class ModalManager {
  private modalContainer: HTMLElement;
  public isOpen: boolean = false;
  private openTime: number = 0;
  public onTeleportRequest?: (coords: [number, number, number]) => void;
  public onOpenBlockPaletteRequest?: () => void;
  public getPlayerInfo?: () => { position: { x: number; y: number; z: number }; yaw: number; dragons?: any[]; trains?: any[] };
  private mapAnimId: number | null = null;
  private mapMouseUpCleanup: (() => void) | null = null;
  private mapResizeCleanup: (() => void) | null = null;
  private adventureMapRenderer: AdventureMapRenderer | null = null;

  constructor() {
    this.modalContainer = document.getElementById('modal-container')!;
    this.setupListeners();
  }

  private setupListeners() {
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Escape' || e.code === 'KeyE') {
        if (this.isOpen && performance.now() - this.openTime > 250) {
          this.close();
          e.stopPropagation();
        }
      }
      if (e.code === 'KeyM' && !this.isOpen) {
        const info = this.getPlayerInfo?.();
        this.openFastTravelModal(info?.position, info?.yaw, info?.dragons, (info as any)?.trains);
      }
      if (e.code === 'KeyB' && !this.isOpen) {
        this.onOpenBlockPaletteRequest?.();
      }
    });

    const handleBackdropClose = (e: MouseEvent | PointerEvent) => {
      if (e.target === this.modalContainer && performance.now() - this.openTime > 250) {
        this.close();
      }
    };

    this.modalContainer.addEventListener('click', handleBackdropClose);
    this.modalContainer.addEventListener('pointerup', handleBackdropClose);
  }

  public close(preventPauseOverlay: boolean = false) {
    if (this.mapAnimId !== null) {
      cancelAnimationFrame(this.mapAnimId);
      this.mapAnimId = null;
    }
    if (this.mapMouseUpCleanup) {
      this.mapMouseUpCleanup();
      this.mapMouseUpCleanup = null;
    }
    if (this.mapResizeCleanup) {
      this.mapResizeCleanup();
      this.mapResizeCleanup = null;
    }
    if (this.adventureMapRenderer) {
      this.adventureMapRenderer.dispose();
      this.adventureMapRenderer = null;
    }
    delete (window as any).__mcMapPanTo;
    this.isOpen = false;
    this.modalContainer.classList.remove('map-fullscreen');
    this.modalContainer.innerHTML = '';
    this.modalContainer.style.display = 'none';
    document.body.classList.remove('modal-open');
    sound.playClick();

    const pauseOverlay = document.getElementById('pause-overlay');
    if (pauseOverlay) {
      pauseOverlay.style.display = 'none';
    }

    const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (window.matchMedia && window.matchMedia('(pointer: coarse)').matches);
    if (!preventPauseOverlay && pauseOverlay && document.pointerLockElement === null && !isTouch) {
      pauseOverlay.style.display = 'flex';
    }
  }

  private onModalOpen() {
    this.isOpen = true;
    this.openTime = performance.now();
    this.modalContainer.style.display = 'flex';
    document.body.classList.add('modal-open');
    if (document.pointerLockElement) {
      document.exitPointerLock();
    }
    const pauseOverlay = document.getElementById('pause-overlay');
    if (pauseOverlay) {
      pauseOverlay.style.display = 'none';
    }
    sound.playClick();
  }

  // 1. Project Detail Modal
  public openProjectModal(project: Project) {
    this.onModalOpen();

    const tagsHtml = project.tags.map(t => `<span class="mc-tag">${t}</span>`).join('');
    const metricsHtml = project.metrics.map(m => `<div class="mc-metric-badge">[KEY] ${m}</div>`).join('');
    const descHtml = project.description.map(d => `<p class="mc-text-p">- ${d}</p>`).join('');

    this.modalContainer.innerHTML = `
      <div class="mc-dialog mc-project-dialog">
        <div class="mc-dialog-header">
          <div class="mc-dialog-title-row">
            <span class="mc-item-icon" style="background-color: ${project.accentColor};"></span>
            <div>
              <h2 class="mc-dialog-title">${project.title}</h2>
              <span class="mc-dialog-subtitle">${project.subtitle} | ${project.category}</span>
            </div>
          </div>
          <button class="mc-close-btn" id="mc-modal-close">X</button>
        </div>

        <div class="mc-dialog-body">
          <div class="mc-metrics-row">
            ${metricsHtml}
          </div>

          <div class="mc-desc-section">
            <h4 class="mc-section-heading">Overview and Architecture</h4>
            ${descHtml}
          </div>

          <div class="mc-tags-section">
            <h4 class="mc-section-heading">Tech Stack</h4>
            <div class="mc-tags-wrapper">
              ${tagsHtml}
            </div>
          </div>
        </div>

        <div class="mc-dialog-footer">
          ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="mc-btn mc-btn-green">[OPEN] Launch Live Demo</a>` : ''}
          ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="mc-btn mc-btn-blue">[CODE] View GitHub</a>` : ''}
          <button class="mc-btn mc-btn-stone" id="mc-modal-done">Done (ESC)</button>
        </div>
      </div>
    `;

    this.modalContainer.style.display = 'flex';
    document.getElementById('mc-modal-close')?.addEventListener('click', () => this.close());
    document.getElementById('mc-modal-done')?.addEventListener('click', () => this.close());
  }

  // 2. Experience / Education Modal
  public openExperienceModal(exp: Experience) {
    this.onModalOpen();

    const descHtml = exp.description.map(d => `<p class="mc-text-p">- ${d}</p>`).join('');
    const highlightsHtml = exp.highlights.map(h => `<div class="mc-metric-badge">[HIGHLIGHT] ${h}</div>`).join('');

    this.modalContainer.innerHTML = `
      <div class="mc-dialog mc-project-dialog">
        <div class="mc-dialog-header">
          <div>
            <h2 class="mc-dialog-title">${exp.role}</h2>
            <span class="mc-dialog-subtitle">${exp.company} | ${exp.period}</span>
          </div>
          <button class="mc-close-btn" id="mc-modal-close">X</button>
        </div>

        <div class="mc-dialog-body">
          <div class="mc-metrics-row">
            ${highlightsHtml}
          </div>
          <div class="mc-desc-section">
            <h4 class="mc-section-heading">Role Contributions and Impact</h4>
            ${descHtml}
          </div>
        </div>

        <div class="mc-dialog-footer">
          <button class="mc-btn mc-btn-stone" id="mc-modal-done">Done (ESC)</button>
        </div>
      </div>
    `;

    this.modalContainer.style.display = 'flex';
    document.getElementById('mc-modal-close')?.addEventListener('click', () => this.close());
    document.getElementById('mc-modal-done')?.addEventListener('click', () => this.close());
  }

  // 3. Ancient Treasure Chest GUI (Resume Vault & Loot) - Zero emojis, SVG assets
  public openResumeChestModal() {
    this.onModalOpen();
    sound.playChestOpen();

    this.modalContainer.innerHTML = `
      <div class="mc-chest-gui">
        <div class="mc-chest-header">
          <span>Lakshya: Ancient Resume Chest</span>
          <button class="mc-close-btn" id="mc-modal-close">X</button>
        </div>

        <div class="mc-chest-grid">
          <!-- Row 1 with SVG Assets -->
          <div class="mc-slot" title="Enchanted Scroll: Lakshya's Software Engineering Resume (PDF)">
            <div class="mc-slot-item">${ASSETS.book}</div>
            <span class="mc-slot-badge">SWE</span>
          </div>
          <div class="mc-slot" title="Brand & PR Resume (PDF)">
            <div class="mc-slot-item">${ASSETS.book}</div>
            <span class="mc-slot-badge">PR</span>
          </div>
          <div class="mc-slot" title="Diamond Sword: Full Stack Architecture">
            <div class="mc-slot-item">${ASSETS.sword}</div>
          </div>
          <div class="mc-slot" title="Netherite Pickaxe: AI Systems & Distributed Telemetry">
            <div class="mc-slot-item">${ASSETS.pickaxe}</div>
          </div>
          <div class="mc-slot" title="Golden Apple: CGPA 8.89 / 10.0 · 4.37 / 5.0 (SRMIST Chennai)">
            <div class="mc-slot-item">${ASSETS.apple}</div>
          </div>
          <div class="mc-slot" title="Ender Pearl: Email (contact@lakshya.uk)">
            <div class="mc-slot-item">${ASSETS.pearl}</div>
          </div>
          <div class="mc-slot" title="Compass: LinkedIn (/in/lakshya-success)">
            <div class="mc-slot-item">${ASSETS.compass}</div>
          </div>
          <div class="mc-slot" title="Map: GitHub (lak-is-law)">
            <div class="mc-slot-item">${ASSETS.cobblestone}</div>
          </div>
          <div class="mc-slot" title="Nether Star: UCSI 1st Place Most Innovative Product">
            <div class="mc-slot-item">${ASSETS.star}</div>
          </div>
        </div>

        <div class="mc-chest-loot-action">
          <div class="mc-resume-preview-info">
            <h3>Lakshya: Master Resume Documents</h3>
            <p>Software Engineer & Designer (SRMIST Chennai · 8.89 / 10.0 · CGPA: 4.37 / 5.0)</p>
          </div>
          <div class="mc-chest-btn-row">
            <a href="/Lakshya.Resume.pdf" download="Lakshya_Resume_SWE.pdf" class="mc-btn mc-btn-green" id="mc-download-resume">
              [DOWNLOAD] SWE Resume (PDF)
            </a>
            <a href="/Lakshya.Resume.RB.pdf" download="Lakshya_Resume_Brand_PR.pdf" class="mc-btn mc-btn-gold" id="mc-download-pr-resume">
              [DOWNLOAD] Brand & PR Resume (PDF)
            </a>
            <a href="https://resume.lakshya.uk" target="_blank" rel="noopener noreferrer" class="mc-btn mc-btn-blue">
              [WEB] Live resume.lakshya.uk
            </a>
            <a href="mailto:contact@lakshya.uk" class="mc-btn mc-btn-stone">
              [EMAIL] contact@lakshya.uk
            </a>
            <a href="https://linkedin.com/in/lakshya-success" target="_blank" rel="noopener noreferrer" class="mc-btn mc-btn-stone">
              [LINKEDIN] Profile
            </a>
          </div>
        </div>
      </div>
    `;

    this.modalContainer.style.display = 'flex';
    document.getElementById('mc-modal-close')?.addEventListener('click', () => this.close());
    document.getElementById('mc-download-resume')?.addEventListener('click', () => {
      sound.playLevelUp();
    });
    document.getElementById('mc-download-pr-resume')?.addEventListener('click', () => {
      sound.playLevelUp();
    });
  }

  // 4. Skills Alchemy / Brewing Stand GUI
  public openSkillsModal() {
    this.onModalOpen();

    const categoriesHtml = PORTFOLIO_DATA.skillCategories.map(cat => {
      const skillsHtml = cat.skills.map(s => `
        <div class="mc-skill-row">
          <div class="mc-skill-label">
            <span>[${s.tag}] ${s.name}</span>
            <span class="mc-skill-pct">${s.level}%</span>
          </div>
          <div class="mc-skill-bar">
            <div class="mc-skill-fill" style="width: ${s.level}%; background-color: ${cat.color};"></div>
          </div>
        </div>
      `).join('');

      return `
        <div class="mc-brew-category">
          <div class="mc-brew-title" style="color: ${cat.color};">
            [BREW] ${cat.potionName} (${cat.name})
          </div>
          <div class="mc-brew-skills">
            ${skillsHtml}
          </div>
        </div>
      `;
    }).join('');

    this.modalContainer.innerHTML = `
      <div class="mc-dialog mc-skills-dialog">
        <div class="mc-dialog-header">
          <div>
            <h2 class="mc-dialog-title">Skills Alchemy and Technical Matrix</h2>
            <span class="mc-dialog-subtitle">Frontend, Backend, Applied AI, and Cloud Infrastructure</span>
          </div>
          <button class="mc-close-btn" id="mc-modal-close">X</button>
        </div>

        <div class="mc-dialog-body mc-skills-grid">
          ${categoriesHtml}
        </div>

        <div class="mc-dialog-footer">
          <button class="mc-btn mc-btn-stone" id="mc-modal-done">Close (ESC)</button>
        </div>
      </div>
    `;

    this.modalContainer.style.display = 'flex';
    document.getElementById('mc-modal-close')?.addEventListener('click', () => this.close());
    document.getElementById('mc-modal-done')?.addEventListener('click', () => this.close());
  }

  // Category classifier helper for all landmarks
  public static getLandmarkCategory(tag: string): 'monuments' | 'cities' | 'transit' | 'nature' {
    if (tag.includes('TAJ') || tag.includes('GREAT WALL') || tag.includes('EIFFEL') ||
        tag.includes('LONDON') || tag.includes('PYRAMID') || tag.includes('GIZA') ||
        tag.includes('TEMPLE') || tag.includes('ISRO') || tag.includes('HAWA MAHAL') ||
        tag.includes('INDIA GATE') || tag.includes('PAVILION') || tag.includes('CASTLE') ||
        tag.includes('BURJ AL ARAB') || tag.includes('BLUEWATERS') || tag.includes('FORBIDDEN CITY') ||
        tag.includes('MERIDIAN GATE') || tag.includes('TERRACOTTA') || tag.includes('GEUNJEONGJEON') ||
        tag.includes('GYEONGHOERU') || tag.includes('KING SEJONG') || tag.includes('SENSO-JI') ||
        tag.includes('FUSHIMI INARI')) {
      return 'monuments';
    }
    if (tag.includes('TOKYO') || tag.includes('NEO') || tag.includes('TOWER') ||
        tag.includes('HOLLYWOOD') || tag.includes('McQUEEN') || tag.includes('MEXICO') ||
        tag.includes('DUBAI') || tag.includes('PALM') || tag.includes('SEOUL') || tag.includes('MUMBAI') ||
        tag.includes('VARANASI') || tag.includes('CITADEL') || tag.includes('WORLD ISLANDS')) {
      return 'cities';
    }
    if (tag.includes('AIRPORT') || tag.includes('RAILWAY') || tag.includes('MARINA') || tag.includes('DHABA')) {
      return 'transit';
    }
    return 'nature';
  }

  // 5. Maximised World Map & Realm Atlas GUI (Interactive Real-time Canvas)
  public openFastTravelModal(
    playerPos?: { x: number; y: number; z: number },
    playerYaw?: number,
    dragons?: { position: { x: number; y: number; z: number }; config: { name: string; eyeColor: number; bodyColor: number } }[],
    trains?: { position: { x: number; y: number; z: number }; rotation: { y: number } }[]
  ) {
    this.onModalOpen();
    this.modalContainer.classList.add('map-fullscreen');

    const info = this.getPlayerInfo?.();
    const effectivePos = playerPos || info?.position || { x: 0, y: 2, z: 0 };
    const effectiveYaw = playerYaw ?? info?.yaw ?? 0;
    const effectiveDragons = dragons || info?.dragons;
    const effectiveTrains = trains || (info as any)?.trains;

    const curX = Math.round(effectivePos.x);
    const curZ = Math.round(effectivePos.z);

    const destinationsHtml = PORTFOLIO_DATA.landmarks.map((lm, idx) => {
      const cat = ModalManager.getLandmarkCategory(lm.tag);
      const cleanTag = lm.tag.replace(/[\[\]]/g, '');
      const px = effectivePos.x;
      const pz = effectivePos.z;
      const dist = Math.round(Math.hypot(lm.coords[0] - px, lm.coords[2] - pz));
      return `
        <div class="mc-waypoint-card" data-index="${idx}" data-name="${lm.name.toLowerCase()}" data-tag="${cleanTag.toLowerCase()}" data-cat="${cat}">
          <div class="mc-waypoint-top">
            <span class="mc-waypoint-tag">${cleanTag}</span>
            <span class="mc-waypoint-coords">X: ${lm.coords[0]} · Z: ${lm.coords[2]}</span>
          </div>
          <div class="mc-waypoint-title">${lm.name}</div>
          <div class="mc-waypoint-desc">${lm.desc}</div>
          <div class="mc-waypoint-actions">
            <span class="mc-waypoint-dist">📍 ${dist}m</span>
            <button class="mc-waypoint-warp-btn mc-map-chip-btn" data-index="${idx}" title="Fast Travel to ${lm.name}">WARP ↗</button>
          </div>
        </div>
      `;
    }).join('');

    this.modalContainer.innerHTML = `
      <div class="mc-game-map-modal">
        <!-- Floating Top HUD Header -->
        <header class="mc-game-map-hud-header">
          <div class="mc-game-map-hud-left">
            <div class="mc-map-title-badge">
              <span class="mc-map-badge-icon">🗺️</span>
              <div class="mc-map-title-group">
                <h1 class="mc-map-hud-title">WORLD OF LAKSHYA</h1>
                <span class="mc-map-hud-coords" id="map-live-coords">📍 X: ${curX}, Z: ${curZ}</span>
              </div>
            </div>
          </div>

          <div class="mc-game-map-hud-center">
            <div class="mc-map-filter-group" id="mc-map-filter-group">
              <button class="mc-map-filter-btn active" data-filter="all">ALL (39)</button>
              <button class="mc-map-filter-btn" data-filter="monuments">🏛️ MONUMENTS</button>
              <button class="mc-map-filter-btn" data-filter="cities">🏙️ CITIES</button>
              <button class="mc-map-filter-btn" data-filter="transit">🚆 TRANSIT</button>
              <button class="mc-map-filter-btn" data-filter="nature">🌲 NATURE</button>
            </div>
          </div>

          <div class="mc-game-map-hud-right">
            <button class="mc-hud-action-btn mc-btn-sidebar-toggle" id="btn-toggle-sidebar" title="Toggle Waypoints Directory">
              📋 WAYPOINTS <span class="mc-badge-count" id="mc-badge-count">39</span>
            </button>
            <button class="mc-hud-action-btn mc-btn-close-map" id="mc-modal-close" title="Close Map (ESC)">
              ✕ ESC
            </button>
          </div>
        </header>

        <!-- Fullscreen Interactive Canvas Viewport -->
        <div class="mc-game-map-viewport" id="mc-max-map-canvas-container">
          <canvas id="max-realm-canvas"></canvas>
          <div class="mc-map-badges-layer" id="mc-map-badges-layer"></div>
          <!-- Vintage Nautical Compass Rose (Bottom Left - Matching Reference Image) -->
          <div class="mc-map-compass-rose" id="mc-map-compass-rose">
            <div class="mc-compass-dial">
              <span class="mc-compass-cardinal mc-cardinal-n">N</span>
              <span class="mc-compass-cardinal mc-cardinal-e">E</span>
              <span class="mc-compass-cardinal mc-cardinal-s">S</span>
              <span class="mc-compass-cardinal mc-cardinal-w">W</span>
              <div class="mc-compass-needle"></div>
              <div class="mc-compass-center-gem"></div>
            </div>
          </div>
          <div class="mc-map-tooltip-card" id="mc-map-tooltip-card"></div>
        </div>

        <!-- Floating Bottom HUD Footer -->
        <footer class="mc-game-map-hud-footer">
          <div class="mc-hud-footer-left">
            <div class="mc-map-status-pill">
              <span class="mc-status-radar-pulse"></span>
              <span class="cursor-val" id="map-cursor-coords">Select a waypoint or click anywhere to Fast Travel</span>
            </div>
            <div class="mc-map-legend-pills">
              <span class="mc-legend-pill"><i class="atlas-key-dot atlas-key-player"></i> YOU</span>
              <span class="mc-legend-pill"><i class="atlas-key-dot atlas-key-place"></i> PIN</span>
              <span class="mc-legend-pill"><i class="atlas-key-line"></i> RAIL</span>
            </div>
          </div>

          <div class="mc-hud-footer-right">
            <div class="mc-map-nav-tools">
              <button class="mc-map-tool-btn" id="btn-map-zoom-in" type="button" title="Zoom in (+)">➕ IN</button>
              <button class="mc-map-tool-btn" id="btn-map-zoom-out" type="button" title="Zoom out (-)">➖ OUT</button>
              <button class="mc-map-tool-btn" id="btn-map-locate-player" type="button" title="Center camera on your position">🎯 YOU</button>
              <button class="mc-map-tool-btn" id="btn-map-reset" type="button" title="Reset camera view">⟲ RESET</button>
            </div>
          </div>
        </footer>

        <!-- Sleek Collapsible Waypoints Sidebar Drawer -->
        <aside class="mc-game-map-sidebar" id="mc-map-sidebar">
          <div class="mc-sidebar-header">
            <div class="mc-sidebar-top-row">
              <div class="mc-sidebar-heading">
                <span class="mc-sidebar-icon">📍</span>
                <h3>FAST TRAVEL ATLAS</h3>
              </div>
              <button class="mc-sidebar-close-btn" id="btn-close-sidebar" title="Close Sidebar">✕</button>
            </div>
            <div class="mc-sidebar-search-wrap">
              <input type="text" id="map-waypoint-search" class="mc-sidebar-search-input" placeholder="🔍 Search 39 destinations..." autocomplete="off" />
            </div>
          </div>
          <div class="mc-sidebar-list" id="mc-sidebar-list">
            ${destinationsHtml}
          </div>
        </aside>
      </div>
    `;

    this.modalContainer.style.display = 'flex';
    document.getElementById('mc-modal-close')?.addEventListener('click', () => this.close());

    // Sidebar drawer toggle
    const sidebar = document.getElementById('mc-map-sidebar');
    const toggleBtn = document.getElementById('btn-toggle-sidebar');
    const closeSidebarBtn = document.getElementById('btn-close-sidebar');

    const toggleSidebar = (force?: boolean) => {
      if (!sidebar) return;
      const isOpen = force !== undefined ? force : !sidebar.classList.contains('open');
      if (isOpen) {
        sidebar.classList.add('open');
        toggleBtn?.classList.add('active');
      } else {
        sidebar.classList.remove('open');
        toggleBtn?.classList.remove('active');
      }
      sound.playClick();
    };

    toggleBtn?.addEventListener('click', () => toggleSidebar());
    closeSidebarBtn?.addEventListener('click', () => toggleSidebar(false));

    // Connect waypoint cards: clicking card pans to it, clicking warp button teleports
    const cards = document.querySelectorAll('.mc-waypoint-card') as NodeListOf<HTMLElement>;
    cards.forEach(card => {
      const idx = parseInt(card.getAttribute('data-index') || '0', 10);
      const lm = PORTFOLIO_DATA.landmarks[idx];
      if (!lm) return;

      card.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (target.closest('.mc-waypoint-warp-btn')) {
          e.stopPropagation();
          sound.playLevelUp();
          this.onTeleportRequest?.(lm.coords as [number, number, number]);
          this.close();
          return;
        }

        // Pan map camera to this landmark
        if ((window as any).__mcMapPanTo) {
          (window as any).__mcMapPanTo(lm.coords, lm);
        }
      });
    });

    // Search filter input & category filtering
    const searchInput = document.getElementById('map-waypoint-search') as HTMLInputElement;
    const filterCards = () => {
      const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
      const activeFilterBtn = document.querySelector('.mc-map-filter-btn.active');
      const activeFilter = activeFilterBtn?.getAttribute('data-filter') || 'all';
      let count = 0;

      cards.forEach(card => {
        const name = card.getAttribute('data-name') || '';
        const tag = card.getAttribute('data-tag') || '';
        const cat = card.getAttribute('data-cat') || 'all';
        const matchesSearch = query === '' || name.includes(query) || tag.includes(query);
        const matchesFilter = activeFilter === 'all' || cat === activeFilter;
        if (matchesSearch && matchesFilter) {
          card.style.display = 'flex';
          count++;
        } else {
          card.style.display = 'none';
        }
      });

      const badgeCount = document.getElementById('mc-badge-count');
      if (badgeCount) badgeCount.textContent = count.toString();
    };

    searchInput?.addEventListener('input', filterCards);

    // Render Canvas and attach hover/click interactions
    this.initMaximizedMapCanvas(effectivePos, effectiveYaw, effectiveDragons, effectiveTrains, filterCards);
  }

  private initMaximizedMapCanvas(
    playerPos?: { x: number; y: number; z: number },
    playerYaw?: number,
    _dragons?: { position: { x: number; y: number; z: number }; config: { name: string; eyeColor: number; bodyColor: number } }[],
    _trains?: { position: { x: number; y: number; z: number }; rotation: { y: number } }[],
    onFilterChange?: () => void
  ) {
    const canvas = document.getElementById('max-realm-canvas') as HTMLCanvasElement;
    if (!canvas) return;
    const tooltipEl = document.getElementById('mc-map-tooltip-card');
    const containerEl = document.getElementById('mc-max-map-canvas-container');
    if (!containerEl) return;

    const effectivePos = playerPos || { x: 0, y: 2, z: 0 };
    const effectiveYaw = playerYaw ?? 0;

    // Instantiate 3D Isometric Adventure Island Map (Matching Image 2 Reference)
    this.adventureMapRenderer = new AdventureMapRenderer({
      canvas,
      container: containerEl,
      badgesContainer: document.getElementById('mc-map-badges-layer'),
      tooltipEl,
      cursorCoordsEl: document.getElementById('map-cursor-coords'),
      liveCoordsEl: document.getElementById('map-live-coords'),
      playerPos: effectivePos,
      playerYaw: effectiveYaw,
      onTeleport: (coords) => {
        this.onTeleportRequest?.(coords);
      },
      onClose: () => {
        this.close();
      },
      getLandmarkCategory: ModalManager.getLandmarkCategory
    });

    // Expose camera pan for external interaction (e.g. sidebar card click)
    (window as any).__mcMapPanTo = (coords: [number, number, number], lm: any) => {
      this.adventureMapRenderer?.panToLandmark(coords, lm);
    };

    // Category filter buttons hookup
    document.querySelectorAll('.mc-map-filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        document.querySelectorAll('.mc-map-filter-btn').forEach(b => b.classList.remove('active'));
        target.classList.add('active');
        const filter = (target.getAttribute('data-filter') || 'all') as any;
        this.adventureMapRenderer?.setFilter(filter);
        onFilterChange?.();
        sound.playClick();
      });
    });
  }

  // 6. Sign / Notice Modal
  public openSignModal(title: string, text: string) {
    this.onModalOpen();

    this.modalContainer.innerHTML = `
      <div class="mc-dialog mc-sign-dialog">
        <div class="mc-dialog-header">
          <h2 class="mc-dialog-title">${title}</h2>
          <button class="mc-close-btn" id="mc-modal-close">X</button>
        </div>
        <div class="mc-dialog-body">
          <p class="mc-text-p" style="font-size: 14px; line-height: 1.8;">${text}</p>
        </div>
        <div class="mc-dialog-footer">
          <button class="mc-btn mc-btn-stone" id="mc-modal-done">Close (ESC)</button>
        </div>
      </div>
    `;

    this.modalContainer.style.display = 'flex';
    document.getElementById('mc-modal-close')?.addEventListener('click', () => this.close());
    document.getElementById('mc-modal-done')?.addEventListener('click', () => this.close());
  }

  // 6.5. Interactive NPC Dialogue Modal
  public openNPCDialogModal(data: NPCDialogData) {
    this.onModalOpen();

    const renderOptions = (options: NPCDialogOption[], isSubMenu: boolean = false) => {
      const optionsContainer = document.getElementById('mc-npc-options');
      if (!optionsContainer) return;
      optionsContainer.innerHTML = '';

      options.forEach((opt) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        const styleClass = opt.styleClass || 'mc-btn-stone';
        btn.className = `mc-btn ${styleClass} mc-npc-option-btn`;
        btn.innerHTML = `
          <span>${opt.label}</span>
          <span class="mc-npc-option-arrow">➔</span>
        `;

        let actionExecutedTime = 0;
        const executeOption = (e: Event) => {
          const now = performance.now();
          if (now - actionExecutedTime < 280) return;
          actionExecutedTime = now;
          e.preventDefault();
          e.stopPropagation();

          sound.playClick();
          data.onOptionSelect?.(opt, data);

          if (opt.action) {
            opt.action();
          }

          if (opt.response) {
            const speechEl = document.getElementById('mc-npc-speech-text');
            if (speechEl) {
              speechEl.textContent = opt.response;
              speechEl.style.animation = 'none';
              void speechEl.offsetWidth;
              speechEl.style.animation = 'mcNpcPopIn 0.15s ease';
            }
            if (opt.nextOptions && opt.nextOptions.length > 0) {
              renderOptions(opt.nextOptions, true);
            } else {
              renderOptions([
                {
                  label: '↩️ Ask something else...',
                  styleClass: 'mc-btn-blue',
                  action: () => {
                    const speechEl = document.getElementById('mc-npc-speech-text');
                    if (speechEl) speechEl.textContent = data.text;
                    renderOptions(data.options, false);
                  }
                }
              ], true);
            }
          }
        };

        btn.addEventListener('pointerup', executeOption);
        btn.addEventListener('click', executeOption);
        optionsContainer.appendChild(btn);
      });

      if (isSubMenu) {
        const backBtn = document.createElement('button');
        backBtn.type = 'button';
        backBtn.className = 'mc-btn mc-btn-stone mc-npc-option-btn';
        backBtn.style.marginTop = '4px';
        backBtn.innerHTML = `<span>↩️ Return to questions</span><span class="mc-npc-option-arrow">⤴</span>`;

        let backHandledTime = 0;
        const handleBack = (e: Event) => {
          const now = performance.now();
          if (now - backHandledTime < 280) return;
          backHandledTime = now;
          e.preventDefault();
          e.stopPropagation();
          sound.playClick();
          const speechEl = document.getElementById('mc-npc-speech-text');
          if (speechEl) speechEl.textContent = data.text;
          renderOptions(data.options, false);
        };

        backBtn.addEventListener('pointerup', handleBack);
        backBtn.addEventListener('click', handleBack);
        optionsContainer.appendChild(backBtn);
      }
    };

    this.modalContainer.innerHTML = `
      <div class="mc-dialog mc-npc-dialog">
        <div class="mc-dialog-header mc-npc-dialog-header">
          <div class="mc-dialog-title-row">
            <div class="mc-npc-avatar-box">
              ${data.avatarHtml}
            </div>
            <div class="mc-npc-header-text">
              <div class="mc-npc-name-badge-row">
                <h2 class="mc-dialog-title mc-npc-title">${data.name}</h2>
                ${data.badge ? `<span class="mc-npc-level-badge" style="background: ${data.badgeColor || '#ca8a04'};">${data.badge}</span>` : ''}
                ${data.locationBadge ? `<span class="mc-npc-location-badge">📍 ${data.locationBadge}</span>` : ''}
              </div>
              <span class="mc-dialog-subtitle mc-npc-subtitle">${data.subtitle || data.title}</span>
            </div>
          </div>
          <button class="mc-close-btn" id="mc-modal-close" title="Close (ESC)" type="button">✕</button>
        </div>

        <div class="mc-dialog-body mc-npc-dialog-body">
          <div class="mc-npc-speech-bubble" id="mc-npc-speech-text">${data.text}</div>
          <div class="mc-npc-options-grid" id="mc-npc-options"></div>
        </div>

        <div class="mc-dialog-footer mc-npc-dialog-footer">
          <span class="mc-npc-footer-hint">[ESC] or [E] to exit</span>
          <button class="mc-btn mc-btn-stone" id="mc-modal-done" type="button">Leave</button>
        </div>
      </div>
    `;

    this.modalContainer.style.display = 'flex';

    let closeExecutedTime = 0;
    const handleModalClose = (e: Event) => {
      const now = performance.now();
      if (now - closeExecutedTime < 280) return;
      closeExecutedTime = now;
      e.preventDefault();
      e.stopPropagation();
      data.onDone?.();
      this.close();
    };

    const closeBtn = document.getElementById('mc-modal-close');
    const doneBtn = document.getElementById('mc-modal-done');
    closeBtn?.addEventListener('pointerup', handleModalClose);
    closeBtn?.addEventListener('click', handleModalClose);
    doneBtn?.addEventListener('pointerup', handleModalClose);
    doneBtn?.addEventListener('click', handleModalClose);

    renderOptions(data.options, false);
  }

  // 7. Leadership Palace Modal
  public openLeadershipModal(id?: string) {
    this.onModalOpen();
    const leads = PORTFOLIO_DATA.leadership;
    const leadsHtml = leads.map(l => `
      <div class="mc-landmark-card" style="border-left: 4px solid ${l.accentColor};">
        <div class="mc-landmark-info">
          <h4>[LEAD] ${l.role} (${l.organization})</h4>
          <span class="mc-landmark-coords">${l.period}</span>
          ${l.highlights.map(h => `<div class="mc-metric-badge" style="margin: 4px 4px 4px 0; display: inline-block;">[KEY] ${h}</div>`).join('')}
          ${l.description.map(d => `<p class="mc-text-p">- ${d}</p>`).join('')}
        </div>
      </div>
    `).join('');

    this.modalContainer.innerHTML = `
      <div class="mc-dialog mc-map-dialog">
        <div class="mc-dialog-header">
          <div>
            <h2 class="mc-dialog-title">Leadership and Campus Involvements</h2>
            <span class="mc-dialog-subtitle">Alumni Relations, 100+ Events, and 5,000+ Emcee Reach</span>
          </div>
          <button class="mc-close-btn" id="mc-modal-close">X</button>
        </div>
        <div class="mc-dialog-body mc-map-grid">
          ${leadsHtml}
        </div>
        <div class="mc-dialog-footer">
          <button class="mc-btn mc-btn-stone" id="mc-modal-done">Close (ESC)</button>
        </div>
      </div>
    `;

    this.modalContainer.style.display = 'flex';
    document.getElementById('mc-modal-close')?.addEventListener('click', () => this.close());
    document.getElementById('mc-modal-done')?.addEventListener('click', () => this.close());
  }

  // 8. Research & AI Laboratory Modal
  public openResearchModal(id?: string) {
    this.onModalOpen();
    const res = PORTFOLIO_DATA.research;
    const resHtml = res.map(r => `
      <div class="mc-landmark-card" style="border-left: 4px solid #38bdf8;">
        <div class="mc-landmark-info">
          <h4>[RESEARCH] ${r.title}</h4>
          <span class="mc-landmark-coords">[Domain: ${r.domain}]</span>
          <p class="mc-text-p" style="margin: 6px 0;">${r.description}</p>
          <div class="mc-tags-wrapper">
            ${r.tags.map(t => `<span class="mc-tag">${t}</span>`).join('')}
          </div>
        </div>
      </div>
    `).join('');

    this.modalContainer.innerHTML = `
      <div class="mc-dialog mc-map-dialog">
        <div class="mc-dialog-header">
          <div>
            <h2 class="mc-dialog-title">Research and Applied AI Engineering</h2>
            <span class="mc-dialog-subtitle">Rockfall Prediction, Distributed Telemetry, and Edge AI</span>
          </div>
          <button class="mc-close-btn" id="mc-modal-close">X</button>
        </div>
        <div class="mc-dialog-body mc-map-grid">
          ${resHtml}
        </div>
        <div class="mc-dialog-footer">
          <button class="mc-btn mc-btn-stone" id="mc-modal-done">Close (ESC)</button>
        </div>
      </div>
    `;

    this.modalContainer.style.display = 'flex';
    document.getElementById('mc-modal-close')?.addEventListener('click', () => this.close());
    document.getElementById('mc-modal-done')?.addEventListener('click', () => this.close());
  }

  // 9. Interests & Passions Modal
  public openInterestsModal() {
    this.onModalOpen();
    const interests = PORTFOLIO_DATA.interests;
    const intHtml = interests.map(it => `
      <div class="mc-landmark-card">
        <div class="mc-landmark-icon" style="color: #38bdf8; font-family: monospace;">${it.tag}</div>
        <div class="mc-landmark-info">
          <h4>${it.title}</h4>
          <p class="mc-text-p">${it.desc}</p>
        </div>
      </div>
    `).join('');

    this.modalContainer.innerHTML = `
      <div class="mc-dialog mc-map-dialog">
        <div class="mc-dialog-header">
          <div>
            <h2 class="mc-dialog-title">Interests and Creative Passions</h2>
            <span class="mc-dialog-subtitle">Automotive Engineering, Strategic Chess, and 3D WebGL Games</span>
          </div>
          <button class="mc-close-btn" id="mc-modal-close">X</button>
        </div>
        <div class="mc-dialog-body mc-map-grid">
          ${intHtml}
        </div>
        <div class="mc-dialog-footer">
          <button class="mc-btn mc-btn-stone" id="mc-modal-done">Close (ESC)</button>
        </div>
      </div>
    `;

    this.modalContainer.style.display = 'flex';
    document.getElementById('mc-modal-close')?.addEventListener('click', () => this.close());
    document.getElementById('mc-modal-done')?.addEventListener('click', () => this.close());
  }

  // 10. Global Communication & Languages Modal
  public openLanguagesModal() {
    this.onModalOpen();
    const langs = PORTFOLIO_DATA.languages;
    const langHtml = langs.map(l => `
      <div class="mc-landmark-card">
        <div class="mc-landmark-icon" style="color: #facc15; font-family: monospace;">${l.tag}</div>
        <div class="mc-landmark-info">
          <h4>${l.language}</h4>
          <span class="mc-landmark-coords">${l.level}</span>
          <p class="mc-text-p">${l.highlight}</p>
        </div>
      </div>
    `).join('');

    this.modalContainer.innerHTML = `
      <div class="mc-dialog mc-map-dialog">
        <div class="mc-dialog-header">
          <div>
            <h2 class="mc-dialog-title">Global Communication and Languages</h2>
            <span class="mc-dialog-subtitle">Korean (Intermediate 1 Certified), Mandarin, English, Hindi, Regional</span>
          </div>
          <button class="mc-close-btn" id="mc-modal-close">X</button>
        </div>
        <div class="mc-dialog-body mc-map-grid">
          ${langHtml}
        </div>
        <div class="mc-dialog-footer">
          <button class="mc-btn mc-btn-stone" id="mc-modal-done">Close (ESC)</button>
        </div>
      </div>
    `;

    this.modalContainer.style.display = 'flex';
    document.getElementById('mc-modal-close')?.addEventListener('click', () => this.close());
    document.getElementById('mc-modal-done')?.addEventListener('click', () => this.close());
  }

  // 11. Builder's Minigame Modal
  public openMinigameModal(blocksPlaced: number = 0) {
    this.onModalOpen();
    this.modalContainer.innerHTML = `
      <div class="mc-dialog mc-sign-dialog">
        <div class="mc-dialog-header">
          <div>
            <h2 class="mc-dialog-title">Interactive Builder Arena</h2>
            <span class="mc-dialog-subtitle">Construct Your Own Minecraft Monument</span>
          </div>
          <button class="mc-close-btn" id="mc-modal-close">X</button>
        </div>
        <div class="mc-dialog-body">
          <div class="mc-metric-badge" style="font-size: 11px; padding: 10px;">
            [BLOCKS PLACED IN ARENA: ${blocksPlaced}]
          </div>
          <h4 class="mc-section-heading" style="margin-top: 10px;">Instructions:</h4>
          <p class="mc-text-p">1. Select a block from your hotbar: Slot 3 (Cobblestone) or Slot 4 (Oak Planks).</p>
          <p class="mc-text-p">2. Aim your crosshair at the ground or an existing block.</p>
          <p class="mc-text-p">3. Right-Click to place a block.</p>
          <p class="mc-text-p">4. Left-Click to mine and break blocks.</p>
          <p class="mc-text-p">5. Milestone fanfares trigger when you reach 10, 25, and 50 blocks placed.</p>
        </div>
        <div class="mc-dialog-footer">
          <button class="mc-btn mc-btn-green" id="mc-modal-done">[START] Enter Arena</button>
        </div>
      </div>
    `;

    this.modalContainer.style.display = 'flex';
    document.getElementById('mc-modal-close')?.addEventListener('click', () => this.close());
    document.getElementById('mc-modal-done')?.addEventListener('click', () => this.close());
  }

  // 12. Creative Block Palette Modal
  public openBlockPaletteModal(selectedBlock: string, onSelectBlock: (blockType: string) => void) {
    this.onModalOpen();

    const blockCategories = [
      {
        name: 'Building & Architecture',
        blocks: [
          { id: 'cobblestone', name: 'Cobblestone', color: '#64748b' },
          { id: 'oak_planks', name: 'Oak Planks', color: '#b45309' },
          { id: 'stone_bricks', name: 'Stone Bricks', color: '#78716c' },
          { id: 'bricks', name: 'Red Bricks', color: '#991b1b' },
          { id: 'sandstone', name: 'Sandstone', color: '#fde047' },
          { id: 'quartz_block', name: 'Smooth Quartz', color: '#f8fafc' },
        ]
      },
      {
        name: 'Precious Minerals & Metals',
        blocks: [
          { id: 'gold_block', name: 'Gold Block', color: '#eab308' },
          { id: 'diamond_block', name: 'Diamond Block', color: '#06b6d4' },
          { id: 'emerald_block', name: 'Emerald Block', color: '#10b981' },
          { id: 'redstone_block', name: 'Redstone Block', color: '#ef4444' },
          { id: 'amethyst_block', name: 'Amethyst Block', color: '#a855f7' },
          { id: 'obsidian', name: 'Obsidian', color: '#1e1b4b' },
        ]
      },
      {
        name: 'Functional & Illumination',
        blocks: [
          { id: 'bookshelf', name: 'Bookshelf', color: '#854d0e' },
          { id: 'glowstone', name: 'Glowstone', color: '#facc15' },
          { id: 'glass', name: 'Clear Glass', color: '#bae6fd' },
          { id: 'white_wool', name: 'White Wool', color: '#e2e8f0' },
        ]
      }
    ];

    const contentHtml = blockCategories.map(cat => {
      const items = cat.blocks.map(b => `
        <button class="mc-palette-item ${b.id === selectedBlock ? 'active' : ''}" data-block="${b.id}" type="button" title="Select ${b.name}">
          <div class="mc-palette-swatch" style="background-color: ${b.color};"></div>
          <span class="mc-palette-label">${b.name}</span>
        </button>
      `).join('');

      return `
        <div class="mc-palette-section">
          <h4 class="mc-palette-category-title">${cat.name}</h4>
          <div class="mc-palette-grid">
            ${items}
          </div>
        </div>
      `;
    }).join('');

    this.modalContainer.innerHTML = `
      <div class="mc-dialog mc-palette-dialog">
        <div class="mc-dialog-header">
          <div>
            <h2 class="mc-dialog-title">Creative Block Palette</h2>
            <span class="mc-dialog-subtitle">Select a block material to place with [Right Click] or [PLACE]</span>
          </div>
          <button class="mc-close-btn" id="mc-modal-close" title="Close (ESC)" type="button">X</button>
        </div>

        <div class="mc-dialog-body mc-palette-body">
          ${contentHtml}
        </div>

        <div class="mc-dialog-footer">
          <span class="mc-palette-footer-hint">Selected block is immediately equipped to your active slot</span>
          <button class="mc-btn mc-btn-stone" id="mc-modal-done" type="button">Done (ESC)</button>
        </div>
      </div>
    `;

    this.modalContainer.style.display = 'flex';
    document.getElementById('mc-modal-close')?.addEventListener('click', () => this.close());
    document.getElementById('mc-modal-done')?.addEventListener('click', () => this.close());

    document.querySelectorAll('.mc-palette-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const blockType = target.getAttribute('data-block');
        if (blockType) {
          onSelectBlock(blockType);
          sound.playBlockPlace();
          this.close();
        }
      });
    });
  }
}

