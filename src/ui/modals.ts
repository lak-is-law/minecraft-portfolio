import { PORTFOLIO_DATA, Project, Experience } from '../data/portfolioData';
import { sound } from '../engine/audio';
import { ASSETS } from './assets';

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

  // 5. Maximised World Map & Realm Atlas GUI (Interactive Real-time Canvas)
  public openFastTravelModal(
    playerPos?: { x: number; y: number; z: number },
    playerYaw?: number,
    dragons?: { position: { x: number; y: number; z: number }; config: { name: string; eyeColor: number; bodyColor: number } }[],
    trains?: { position: { x: number; y: number; z: number }; rotation: { y: number } }[]
  ) {
    this.onModalOpen();

    const info = this.getPlayerInfo?.();
    const effectivePos = playerPos || info?.position || { x: 0, y: 2, z: 0 };
    const effectiveYaw = playerYaw ?? info?.yaw ?? 0;
    const effectiveDragons = dragons || info?.dragons;
    const effectiveTrains = trains || (info as any)?.trains;

    const curX = Math.round(effectivePos.x);
    const curZ = Math.round(effectivePos.z);

    const atlasRegions = [
      { number: '01', name: 'Crossroads Citadel', subtitle: 'The central hub · 🌐', detail: 'Start at the island’s heart, meet your guide, and follow the beacon roads out to every realm.', tag: '[CITADEL]', tone: 'citadel', direction: 'CENTER · X 0 / Z 0' },
      { number: '02', name: 'Crossroads Wildlife Park', subtitle: 'Grand Safari Zoo & Habitats · 🦁', detail: 'Expansive wildlife reserve featuring living animated pandas, lions, elephants, giraffes, polar bears, and shaded trails.', tag: '[ZOO]', tone: 'citadel', direction: 'WEST · X −65 / Z 0' },
      { number: '03', name: 'Tokyo Shibuya Realm', subtitle: 'Japan', detail: 'Vibrant neon scramble crossing, Hachiko plaza, Japanese language embassy, and Shinkansen.', tag: '[TOKYO]', tone: 'sakura', direction: 'NORTHWEST · X −155 / Z −80' },
      { number: '04', name: 'Imperial India · Taj Mahal & ISRO', subtitle: 'India', detail: 'Grand Taj Mahal, ISRO Chandrayaan-3 Moon lander, Jaipur Hawa Mahal, India Gate, living Royal Bengal Tigers, dancing Peacocks, and Diwali lights.', tag: '[TAJ MAHAL]', tone: 'raj', direction: 'NORTHEAST · X 80 / Z −135' },
      { number: '05', name: 'Las Vegas Strip & Neo York', subtitle: 'United States', detail: 'Bellagio fountain lake, Caesars Palace, Venetian Campanile, Luxor pyramid beam, and Times Square avenue.', tag: '[NEO YORK]', tone: 'neoyork', direction: 'EAST · X 100 / Z 0' },
      { number: '06', name: 'Mexico City · Zócalo', subtitle: 'Mexico', detail: 'Baroque Metropolitan Cathedral, Palacio Nacional, Monumental Flag, Mercado stalls & Mayan Cenote.', tag: '[MEXICO CITY]', tone: 'pueblo', direction: 'WEST · X −105 / Z 60' },
      { number: '07', name: 'Giza Pyramids & Sphinx', subtitle: 'Egypt', detail: 'Pyramids of Khufu & Khafre, Nile River Felucca, Avenue of Sphinxes, and Luxor Temple Pylons.', tag: '[GIZA]', tone: 'raj', direction: 'SOUTHWEST · X −155 / Z 36' },
      { number: '08', name: 'Dubai · Burj Khalifa & Arabian Gulf Archipelago', subtitle: 'United Arab Emirates 🇦🇪', detail: 'Towering 828m spider-lily skyscraper overlooking the colossal Palm Jumeirah archipelago, 16 massive curved fronds, Atlantis palace, Burj Al Arab 7-star sail island, Bluewaters & Ain Dubai, and The World Islands.', tag: '[DUBAI]', tone: 'neoyork', direction: 'EAST · X 170 / Z 42' },
      { number: '09', name: 'London · Big Ben', subtitle: 'United Kingdom', detail: 'Historic Elizabeth Tower clock with Westminster chime, Great Bell, and Tower Bridge walkways.', tag: '[LONDON]', tone: 'citadel', direction: 'NORTH · X −32 / Z −58' },
      { number: '10', name: 'Paris · Eiffel Tower', subtitle: 'France', detail: 'Gustave Eiffel’s lattice monument, Champ de Mars gardens, and Café de Paris terrace.', tag: '[EIFFEL]', tone: 'frost', direction: 'NORTHEAST · X 26 / Z −38' },
      { number: '11', name: 'Great Wall & Dragon Pagoda', subtitle: 'China', detail: 'Mighty stone ramparts, 5-tier pagoda, bamboo groves, and foreign language pavilion.', tag: '[GREAT WALL]', tone: 'sakura', direction: 'NORTHWEST · X −110 / Z −110' },
      { number: '12', name: 'Hollywood Hills & Walk of Fame', subtitle: 'United States', detail: 'Block-built HOLLYWOOD sign atop Mount Lee, Walk of Fame brass stars, Hollywood Bowl amphitheatre, movie soundstages, and retro diner.', tag: '[HOLLYWOOD]', tone: 'raj', direction: 'NORTHEAST · X 165 / Z −100' },
      { number: '13', name: 'Lightning McQueen Street', subtitle: 'Radiator Springs · ⚡', detail: 'High-speed 3D racing with Lightning McQueen (#95), Flo\'s V8 Café, Luigi\'s tire tower, Mater\'s towing, and playable racecar mode.', tag: '[McQUEEN]', tone: 'raj', direction: 'EAST · X 190 / Z −15' },
      { number: '14', name: 'Frostpeak Alps · Ski Lodge', subtitle: 'Switzerland 🇨🇭', detail: 'Snow-capped Swiss Alpine peaks, Chalet ski lodge, Lake Serenity ice rink, Swiss flag mast, and high summit observatory.', tag: '[ALPS]', tone: 'frost', direction: 'NORTH · X −2 / Z −100' },
      { number: '15', name: 'Sunflower Valley Farmstead', subtitle: 'Countryside', detail: 'Rustic 4-sail Dutch windmill, golden sunflower fields, and peaceful agricultural valley.', tag: '[VALLEY]', tone: 'citadel', direction: 'WEST · X −45 / Z 48' }
    ];

    const regionsHtml = atlasRegions.map((region) => {
      const targetIdx = PORTFOLIO_DATA.landmarks.findIndex(lm => lm.tag === region.tag);
      const safeIdx = targetIdx >= 0 ? targetIdx : 0;
      return `
      <article class="atlas-region-card atlas-${region.tone}">
        <div class="atlas-card-topline"><span>${region.number} / REALM</span><span class="atlas-region-dot"></span></div>
        <h3>${region.name}</h3>
        <p class="atlas-region-subtitle">${region.subtitle}</p>
        <p class="atlas-region-detail">${region.detail}</p>
        <div class="atlas-card-bottom"><span>${region.direction}</span><button class="atlas-region-warp mc-map-chip-btn" data-index="${safeIdx}" aria-label="Travel to ${region.name}">GO <span aria-hidden="true">↗</span></button></div>
      </article>
    `;
    }).join('');

    const destinationsHtml = PORTFOLIO_DATA.landmarks.map((lm, idx) => `
      <button class="atlas-destination mc-map-chip-btn" data-index="${idx}">
        <span class="atlas-destination-tag">${lm.tag.replace(/[\[\]]/g, '')}</span>
        <span class="atlas-destination-copy"><strong>${lm.name}</strong><small>${lm.desc}</small></span>
        <span class="atlas-destination-arrow" aria-hidden="true">↗</span>
      </button>
    `).join('');

    this.modalContainer.innerHTML = `
      <div class="mc-dialog mc-max-map-dialog">
        <div class="mc-dialog-header">
          <div>
            <p class="atlas-eyebrow">LAKSHYA’S PORTFOLIO WORLD <span>·</span> FIELD GUIDE 01</p>
            <h2 class="mc-dialog-title">A world worth exploring.</h2>
            <span class="mc-dialog-subtitle">All 39 destinations and 15 districts across 10 realms. Zoom, pan, and click to travel anywhere.</span>
          </div>
          <button class="mc-close-btn" id="mc-modal-close">X</button>
        </div>

        <nav class="atlas-section-nav" aria-label="Map sections">
          <a href="#atlas-map-section">01 <span>MAP</span></a>
          <a href="#atlas-regions-section">02 <span>REALMS</span></a>
          <a href="#atlas-destinations-section">03 <span>DESTINATIONS</span></a>
        </nav>

        <div class="atlas-scroll-area">
          <section class="atlas-map-section" id="atlas-map-section" aria-label="Interactive world map">
            <div class="mc-map-top-status-bar">
              <div class="mc-map-gps-pill">
                <span class="gps-label">YOUR POSITION:</span>
                <span class="gps-val" id="map-live-coords">X: ${curX}, Z: ${curZ}</span>
              </div>
              <div class="mc-map-cursor-pill">
                <span class="cursor-label">TARGET:</span>
                <span class="cursor-val" id="map-cursor-coords">Select a landmark or click anywhere to travel</span>
              </div>
            </div>

            <div class="mc-map-controls-bar">
              <div class="mc-map-tools-group">
                <button class="mc-map-tool-btn" id="btn-map-zoom-in" type="button" title="Zoom in (+)">🔍+ IN</button>
                <button class="mc-map-tool-btn" id="btn-map-zoom-out" type="button" title="Zoom out (-)">🔍- OUT</button>
                <button class="mc-map-tool-btn" id="btn-map-reset" type="button" title="Reset view">⟲ RESET</button>
                <button class="mc-map-tool-btn" id="btn-map-locate-player" type="button" title="Center on your position">🎯 YOU</button>
              </div>
              <div class="mc-map-filter-group" id="mc-map-filter-group">
                <button class="mc-map-filter-btn active" data-filter="all">ALL (39)</button>
                <button class="mc-map-filter-btn" data-filter="monuments">MONUMENTS</button>
                <button class="mc-map-filter-btn" data-filter="cities">CITIES</button>
                <button class="mc-map-filter-btn" data-filter="transit">TRANSIT</button>
                <button class="mc-map-filter-btn" data-filter="nature">NATURE</button>
              </div>
            </div>

            <div class="mc-max-map-canvas-container" id="mc-max-map-canvas-container">
              <canvas id="max-realm-canvas" width="1200" height="900"></canvas>
              <div class="mc-map-tooltip-card" id="mc-map-tooltip-card"></div>
            </div>

            <div class="atlas-map-caption">
              <span><i class="atlas-key-dot atlas-key-player"></i> YOU ARE HERE</span>
              <span><i class="atlas-key-dot atlas-key-place"></i> WAYPOINT PIN</span>
              <span><i class="atlas-key-line"></i> EXPRESS RAIL TRANSIT</span>
              <span class="atlas-caption-hint">Drag to Pan · Wheel or Buttons to Zoom · Click to Travel</span>
            </div>
          </section>

          <section class="atlas-content-section" id="atlas-regions-section">
            <div class="atlas-section-heading"><div><p class="atlas-eyebrow">PICK A DIRECTION</p><h3>Explore the world</h3></div><span>${atlasRegions.length.toString().padStart(2, '0')} AREAS</span></div>
            <div class="atlas-region-grid">${regionsHtml}</div>
          </section>

          <section class="atlas-content-section atlas-destinations-section" id="atlas-destinations-section">
            <div class="atlas-section-heading"><div><p class="atlas-eyebrow">MAKE IT A JOURNEY</p><h3>All destinations</h3></div><span>${PORTFOLIO_DATA.landmarks.length.toString().padStart(2, '0')} WAYPOINTS</span></div>
            <div class="atlas-destination-list">${destinationsHtml}</div>
          </section>
        </div>

        <div class="mc-dialog-footer">
          <span class="atlas-footer-note">FAST TRAVEL IS READY</span>
          <button class="mc-btn mc-btn-stone" id="mc-modal-done">Close field guide</button>
        </div>
      </div>
    `;

    this.modalContainer.style.display = 'flex';
    document.getElementById('mc-modal-close')?.addEventListener('click', () => this.close());
    document.getElementById('mc-modal-done')?.addEventListener('click', () => this.close());

    // Connect landmark chips buttons
    document.querySelectorAll('.mc-map-chip-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const idx = parseInt(target.getAttribute('data-index') || '0', 10);
        const lm = PORTFOLIO_DATA.landmarks[idx];
        if (lm && this.onTeleportRequest) {
          sound.playLevelUp();
          this.onTeleportRequest(lm.coords as [number, number, number]);
          this.close();
        }
      });
    });

    // Render Canvas and attach hover/click interactions
    this.initMaximizedMapCanvas(effectivePos, effectiveYaw, effectiveDragons, effectiveTrains);
  }

  private initMaximizedMapCanvas(
    playerPos?: { x: number; y: number; z: number },
    playerYaw?: number,
    dragons?: { position: { x: number; y: number; z: number }; config: { name: string; eyeColor: number; bodyColor: number } }[],
    trains?: { position: { x: number; y: number; z: number }; rotation: { y: number } }[]
  ) {
    const canvas = document.getElementById('max-realm-canvas') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const tooltipEl = document.getElementById('mc-map-tooltip-card');
    const containerEl = document.getElementById('mc-max-map-canvas-container');

    const width = 1200;
    const height = 900;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * pixelRatio;
    canvas.height = height * pixelRatio;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

    const cx = width / 2;
    const cy = height / 2;
    const baseScale = 1.65;
    const worldLimit = 390;

    let userZoom = 1.0;
    let panX = -40; // slight offset toward eastern archipelago
    let panY = 0;
    let activeFilter: 'all' | 'monuments' | 'cities' | 'transit' | 'nature' = 'all';

    let hoverWorldX: number | null = null;
    let hoverWorldZ: number | null = null;
    let hoveredLm: typeof PORTFOLIO_DATA.landmarks[0] | null = null;

    let isPointerDown = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let initialPanX = 0;
    let initialPanY = 0;
    let hasDragged = false;

    // Helper: Category classifier for all landmarks
    const getLandmarkCategory = (tag: string): 'monuments' | 'cities' | 'transit' | 'nature' => {
      if (tag.includes('TAJ') || tag.includes('GREAT WALL') || tag.includes('EIFFEL') ||
          tag.includes('LONDON') || tag.includes('PYRAMID') || tag.includes('GIZA') ||
          tag.includes('TEMPLE') || tag.includes('ISRO') || tag.includes('HAWA MAHAL') ||
          tag.includes('INDIA GATE') || tag.includes('PAVILION') || tag.includes('CASTLE') ||
          tag.includes('BURJ AL ARAB') || tag.includes('BLUEWATERS')) {
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
    };

    const getPinColor = (tag: string): string => {
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
      if (tag.includes('DUBAI') || tag.includes('PALM') || tag.includes('BURJ AL ARAB') || tag.includes('BLUEWATERS') || tag.includes('WORLD ISLANDS')) return '#14b8a6';
      if (tag.includes('TEMPLE')) return '#a855f7';
      if (tag.includes('ISRO')) return '#38bdf8';
      if (tag.includes('HAWA MAHAL')) return '#fb923c';
      if (tag.includes('INDIA GATE')) return '#f59e0b';
      if (tag.includes('VALLEY')) return '#eab308';
      return '#94a3b8';
    };

    // Toolbar buttons hookup
    document.getElementById('btn-map-zoom-in')?.addEventListener('click', () => {
      userZoom = Math.min(3.6, userZoom * 1.25);
      sound.playClick();
    });

    document.getElementById('btn-map-zoom-out')?.addEventListener('click', () => {
      userZoom = Math.max(0.7, userZoom * 0.8);
      sound.playClick();
    });

    document.getElementById('btn-map-reset')?.addEventListener('click', () => {
      userZoom = 1.0;
      panX = 0;
      panY = 0;
      sound.playClick();
    });

    document.getElementById('btn-map-locate-player')?.addEventListener('click', () => {
      userZoom = Math.max(1.4, userZoom);
      const px = playerPos?.x || 0;
      const pz = playerPos?.z || 0;
      panX = -px * baseScale * userZoom;
      panY = -pz * baseScale * userZoom;
      sound.playClick();
    });

    // Category filter buttons hookup
    document.querySelectorAll('.mc-map-filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        document.querySelectorAll('.mc-map-filter-btn').forEach(b => b.classList.remove('active'));
        target.classList.add('active');
        activeFilter = (target.getAttribute('data-filter') || 'all') as any;
        sound.playClick();
      });
    });

    // Main Draw Function - Hand-Crafted Adventure Game World Map
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const effectiveScale = baseScale * userZoom;
      const originX = cx + panX;
      const originZ = cy + panY;
      const now = performance.now();

      // 1. Deep Ocean with Gradient Depth & Subtle Currents
      const oceanGrad = ctx.createRadialGradient(cx, cy, 140, cx, cy, Math.max(width, height) * 0.72);
      oceanGrad.addColorStop(0, '#104b77');
      oceanGrad.addColorStop(0.45, '#0b3456');
      oceanGrad.addColorStop(1, '#061c31');
      ctx.fillStyle = oceanGrad;
      ctx.fillRect(0, 0, width, height);

      // World boundary clipping
      const mapHalfW = (worldLimit + 35) * effectiveScale;
      const mapHalfH = (worldLimit + 35) * effectiveScale;
      const mapX = originX - mapHalfW;
      const mapY = originZ - mapHalfH;
      const mapW = mapHalfW * 2;
      const mapH = mapHalfH * 2;

      // Coordinate Grid Lines (every 50 blocks - gentle cartography grid)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      for (let wx = -250; wx <= 350; wx += 50) {
        const gx = originX + wx * effectiveScale;
        ctx.beginPath();
        ctx.moveTo(gx, 0); ctx.lineTo(gx, height);
        ctx.stroke();

        if (userZoom >= 1.0) {
          ctx.fillStyle = 'rgba(224, 242, 254, 0.22)';
          ctx.font = '8px monospace';
          ctx.fillText(`${wx}`, gx + 4, originZ + 12);
        }
      }
      for (let wz = -250; wz <= 250; wz += 50) {
        const gz = originZ + wz * effectiveScale;
        ctx.beginPath();
        ctx.moveTo(0, gz); ctx.lineTo(width, gz);
        ctx.stroke();
      }

      // Sea Waves & Ocean Currents
      ctx.save();
      const wavePhase = (now * 0.0008) % (Math.PI * 2);
      ctx.strokeStyle = 'rgba(125, 211, 252, 0.12)';
      ctx.lineWidth = 1.2;
      for (let r = 215; r <= 245; r += 15) {
        ctx.beginPath();
        ctx.ellipse(originX, originZ, (r + Math.sin(wavePhase) * 3) * effectiveScale, (r + Math.cos(wavePhase) * 3) * effectiveScale, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();

      // =========================================================================
      // NAUTICAL FLOURISHES: SEA SERPENT & SAILING SHIPS (Matching Reference Map)
      // =========================================================================
      // 1. Sea Serpent / Leviathan in South Ocean (World X: 45, Z: 225)
      const drawSeaSerpent = (sx: number, sz: number) => {
        const mx = originX + sx * effectiveScale;
        const my = originZ + sz * effectiveScale;
        const s = effectiveScale * 0.82;
        ctx.save();

        // White foam wake
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.beginPath();
        ctx.ellipse(mx, my + 8 * s, 32 * s, 8 * s, 0, 0, Math.PI * 2);
        ctx.fill();

        // Splash ripples
        ctx.strokeStyle = '#bae6fd';
        ctx.lineWidth = 1.6;
        for (let i = -3; i <= 3; i++) {
          ctx.beginPath();
          ctx.arc(mx + i * 8 * s, my + 8 * s, 6 * s, Math.PI * 0.9, Math.PI * 0.1, true);
          ctx.stroke();
        }

        // Emerald-green scaly coils
        ctx.fillStyle = '#059669';
        ctx.strokeStyle = '#064e3b';
        ctx.lineWidth = 1.5;
        // Coil 1
        ctx.beginPath();
        ctx.ellipse(mx - 20 * s, my + 2 * s, 7 * s, 11 * s, -0.25, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        // Coil 2
        ctx.beginPath();
        ctx.ellipse(mx - 5 * s, my, 8 * s, 13 * s, 0.15, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        // Serpent Head Rising
        ctx.beginPath();
        ctx.moveTo(mx + 12 * s, my + 6 * s);
        ctx.quadraticCurveTo(mx + 25 * s, my - 9 * s, mx + 18 * s, my - 16 * s);
        ctx.quadraticCurveTo(mx + 9 * s, my - 7 * s, mx + 12 * s, my + 6 * s);
        ctx.fill();
        ctx.stroke();

        // Golden Dorsal Spines
        ctx.fillStyle = '#fde047';
        for (let i = 0; i < 4; i++) {
          ctx.beginPath();
          ctx.moveTo(mx + (17 - i * 4) * s, my - (14 - i * 4) * s);
          ctx.lineTo(mx + (21 - i * 4) * s, my - (19 - i * 4) * s);
          ctx.lineTo(mx + (18 - i * 4) * s, my - (9 - i * 4) * s);
          ctx.fill();
        }
        // Glowing Eye
        ctx.fillStyle = '#fef08a';
        ctx.beginPath();
        ctx.arc(mx + 19 * s, my - 13 * s, 2 * s, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      };
      drawSeaSerpent(45, 225);

      // 2. Sailing Caravels in North Waters
      const drawCaravel = (sx: number, sz: number, rot: number) => {
        const mx = originX + sx * effectiveScale;
        const my = originZ + sz * effectiveScale;
        const s = effectiveScale * 0.75;
        ctx.save();
        ctx.translate(mx, my);
        ctx.rotate(rot);

        // Water wake
        ctx.strokeStyle = 'rgba(224, 242, 254, 0.4)';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(-16 * s, 0); ctx.lineTo(-24 * s, -7 * s);
        ctx.moveTo(-16 * s, 0); ctx.lineTo(-24 * s, 7 * s);
        ctx.stroke();

        // Wooden Hull
        ctx.fillStyle = '#78350f';
        ctx.strokeStyle = '#451a03';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(-15 * s, 4 * s);
        ctx.lineTo(15 * s, 3 * s);
        ctx.quadraticCurveTo(19 * s, 0, 15 * s, -3 * s);
        ctx.lineTo(-15 * s, -4 * s);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Billowing White Canvas Sails
        ctx.fillStyle = '#f8fafc';
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(0, 0, 6 * s, 9 * s, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.ellipse(8 * s, 0, 4 * s, 6 * s, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Red Pennant
        ctx.fillStyle = '#dc2626';
        ctx.beginPath();
        ctx.moveTo(1 * s, -1 * s);
        ctx.lineTo(-5 * s, -4 * s);
        ctx.lineTo(1 * s, -3 * s);
        ctx.fill();
        ctx.restore();
      };
      drawCaravel(-225, -150, 0.35);
      drawCaravel(220, -165, -0.45);

      ctx.save();
      ctx.beginPath();
      ctx.rect(mapX, mapY, mapW, mapH);
      ctx.clip();

      // =========================================================================
      // ORGANIC SCULPTED ISLAND CONTINENTAL OUTLINE & TURQUOISE SHALLOWS
      // =========================================================================
      const islandPoints: [number, number][] = [
        [-20, -195], [20, -192], [65, -188], [115, -185], [155, -170], [175, -145],
        [178, -120], [168, -85], [178, -55], [182, -20], [180, 10],
        // Dubai waterfront promenade & Palm gateway
        [178, 25], [176, 42], [178, 60],
        [175, 80], [150, 95], [115, 105], [75, 108], [42, 112],
        // Carnival pier & boardwalk peninsula
        [38, 140], [35, 185], [15, 195], [-15, 195], [-35, 185], [-38, 140],
        [-45, 110], [-85, 105], [-130, 95], [-165, 85], [-185, 60],
        [-188, 30], [-178, 0], [-182, -40], [-188, -75], [-180, -115],
        [-155, -155], [-115, -178], [-70, -188], [-20, -195]
      ];

      const makeIslandPath = (scaleOffset = 0) => {
        ctx.beginPath();
        islandPoints.forEach(([x, z], i) => {
          const dist = Math.hypot(x, z);
          const nx = dist > 0 ? (x / dist) * scaleOffset : 0;
          const nz = dist > 0 ? (z / dist) * scaleOffset : 0;
          const px = originX + (x + nx) * effectiveScale;
          const pz = originZ + (z + nz) * effectiveScale;
          if (i === 0) ctx.moveTo(px, pz); else ctx.lineTo(px, pz);
        });
        ctx.closePath();
      };

      // 1. Turquoise Coral Reef Shallow Shelf
      makeIslandPath(14);
      ctx.fillStyle = 'rgba(6, 182, 212, 0.28)';
      ctx.fill();

      // 2. White Coastal Surf Foam Line
      makeIslandPath(4);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 3.5 * effectiveScale;
      ctx.stroke();

      // 3. Golden Beach Shoreline Fringe
      makeIslandPath(0);
      ctx.fillStyle = '#dfc47b';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.35)';
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;

      // 4. Clip strictly inside mainland for layered painterly biomes
      ctx.save();
      makeIslandPath(-3.5);
      ctx.clip();

      // Base Interior Plains (Lush vibrant grass)
      ctx.fillStyle = '#427e28';
      ctx.fillRect(originX - 220 * effectiveScale, originZ - 220 * effectiveScale, 440 * effectiveScale, 440 * effectiveScale);

      // =========================================================================
      // PAINTERLY BIOME REGIONS (Elevation, Relief Shading & Atmosphere)
      // =========================================================================
      const drawBiomeArea = (points: [number, number][], fillColor: string) => {
        ctx.beginPath();
        points.forEach(([x, z], i) => {
          const px = originX + x * effectiveScale;
          const pz = originZ + z * effectiveScale;
          if (i === 0) ctx.moveTo(px, pz); else ctx.lineTo(px, pz);
        });
        ctx.closePath();
        ctx.fillStyle = fillColor;
        ctx.fill();
      };

      // 1. Sahara & Egypt Giza Desert Dunes (Warm Golden Sands)
      drawBiomeArea([[-185, 18], [-130, 16], [-125, 68], [-175, 68], [-185, 45], [-185, 18]], '#eab308');
      // Subtle sand dune wind ripples
      ctx.strokeStyle = '#ca8a04';
      ctx.lineWidth = 1.4;
      for (let dz = 24; dz <= 60; dz += 8) {
        ctx.beginPath();
        ctx.moveTo(originX - 175 * effectiveScale, originZ + dz * effectiveScale);
        ctx.quadraticCurveTo(originX - 150 * effectiveScale, originZ + (dz + 4) * effectiveScale, originX - 132 * effectiveScale, originZ + dz * effectiveScale);
        ctx.stroke();
      }

      // 2. Mesoamerican Horn / Mexico (Terracotta Adobe)
      drawBiomeArea([[-185, 30], [-135, 25], [-85, 40], [-70, 75], [-105, 95], [-145, 80], [-185, 55], [-185, 30]], '#9a3412');

      // 3. Sunflower Valley & Farmstead (Golden Fields)
      drawBiomeArea([[-68, 25], [-22, 25], [-22, 70], [-68, 70], [-68, 25]], '#facc15');

      // 4. China Great Wall & Pine Forests (Northern Arc)
      drawBiomeArea([[-185, -95], [-160, -145], [-120, -175], [-70, -170], [-45, -140], [-45, -95], [-85, -80], [-130, -75], [-185, -95]], '#1c4524');

      // 5. Japan Cherry Blossom / Sakura Forest (Pastel Pink)
      drawBiomeArea([[-178, -58], [-158, -75], [-142, -95], [-132, -85], [-148, -65], [-168, -52], [-178, -58]], '#f472b6');

      // 6. Imperial India Subcontinent (Terracotta Sandstone & Yamuna)
      drawBiomeArea([[35, -70], [80, -70], [130, -75], [160, -95], [175, -135], [150, -170], [115, -185], [75, -185], [35, -165], [25, -130], [28, -95], [35, -70]], '#b45309');

      // 7. United States & Radiator Springs (Red Rock Canyons)
      drawBiomeArea([[75, -60], [145, -60], [175, -45], [175, 25], [145, 45], [115, 45], [85, 25], [75, -10], [75, -60]], '#334155');
      drawBiomeArea([[160, -38], [210, -38], [210, 8], [160, 8], [160, -38]], '#9a3412');

      // 8. South Beach & Carnival Boardwalk
      drawBiomeArea([[-40, 75], [40, 75], [40, 195], [-40, 195], [-40, 75]], '#dfc47b');
      drawBiomeArea([[-25, 120], [35, 120], [35, 185], [-25, 185], [-25, 120]], '#db2777');

      // =========================================================================
      // FROSTPEAK ALPS · 3D RELIEF SNOW MOUNTAINS (Matching Image 2 Reference)
      // =========================================================================
      // Evergreen spruce foothill base
      drawBiomeArea([[-36, -135], [28, -135], [22, -80], [-32, -80], [-36, -135]], '#143d22');

      // Draw 3D Shaded Mountain Peaks with Sunlit/Shadowed Facets
      const draw3DMountainPeak = (px: number, pz: number, baseW: number, peakH: number) => {
        const mx = originX + px * effectiveScale;
        const my = originZ + pz * effectiveScale;
        const w = baseW * effectiveScale;
        const h = peakH * effectiveScale;

        // Shadow slope (Southeast)
        ctx.fillStyle = '#64748b';
        ctx.beginPath();
        ctx.moveTo(mx, my - h);
        ctx.lineTo(mx + w * 0.5, my);
        ctx.lineTo(mx, my + h * 0.15);
        ctx.closePath();
        ctx.fill();

        // Sunlit slope (Northwest)
        ctx.fillStyle = '#f8fafc';
        ctx.beginPath();
        ctx.moveTo(mx, my - h);
        ctx.lineTo(mx - w * 0.5, my);
        ctx.lineTo(mx, my + h * 0.15);
        ctx.closePath();
        ctx.fill();

        // Summit pristine snowcap
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.moveTo(mx, my - h);
        ctx.lineTo(mx - w * 0.18, my - h * 0.55);
        ctx.lineTo(mx + w * 0.18, my - h * 0.55);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.lineWidth = 0.8;
        ctx.stroke();
      };

      // Cluster of 8 Alpine Peaks
      draw3DMountainPeak(-26, -125, 22, 28);
      draw3DMountainPeak(-14, -132, 20, 32);
      draw3DMountainPeak(0, -126, 24, 30);
      draw3DMountainPeak(16, -120, 20, 26);
      draw3DMountainPeak(24, -105, 18, 24);
      draw3DMountainPeak(-4, -100, 22, 28);
      draw3DMountainPeak(-20, -96, 20, 25);
      draw3DMountainPeak(10, -92, 16, 20);

      // Lake Serenity (Glacial ice bowl)
      ctx.fillStyle = '#bae6fd';
      ctx.beginPath();
      ctx.ellipse(originX - 10 * effectiveScale, originZ - 112 * effectiveScale, 11 * effectiveScale, 7 * effectiveScale, -0.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Chalet ski lodge
      ctx.fillStyle = '#78350f';
      ctx.fillRect(originX - 22 * effectiveScale, originZ - 90 * effectiveScale, 10 * effectiveScale, 9 * effectiveScale);

      // Swiss Flag Badge
      const swissFlagX = originX - 18 * effectiveScale;
      const swissFlagZ = originZ - 86 * effectiveScale;
      const sFlagW = Math.max(14, 20 * effectiveScale * 0.4);
      ctx.fillStyle = '#d52b1e';
      ctx.fillRect(swissFlagX - sFlagW / 2, swissFlagZ - sFlagW / 2, sFlagW, sFlagW);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 0.8;
      ctx.strokeRect(swissFlagX - sFlagW / 2, swissFlagZ - sFlagW / 2, sFlagW, sFlagW);
      ctx.fillStyle = '#ffffff';
      const sArm = sFlagW * 0.22;
      const sLen = sFlagW * 0.65;
      ctx.fillRect(swissFlagX - sArm / 2, swissFlagZ - sLen / 2, sArm, sLen);
      ctx.fillRect(swissFlagX - sLen / 2, swissFlagZ - sArm / 2, sLen, sArm);

      // =========================================================================
      // VOLCANIC PEAK & DRAGON CRATER (North-East, matching Image 2 top mountain)
      // =========================================================================
      const drawVolcanicDragonPeak = () => {
        const vx = originX + 16 * effectiveScale;
        const vy = originZ - 146 * effectiveScale;
        const s = effectiveScale;

        // Dark volcanic basalt base
        ctx.fillStyle = '#1e293b';
        ctx.beginPath();
        ctx.moveTo(vx - 22 * s, vy + 14 * s);
        ctx.lineTo(vx, vy - 20 * s);
        ctx.lineTo(vx + 22 * s, vy + 14 * s);
        ctx.closePath();
        ctx.fill();

        // Glowing redstone magma caldera
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.ellipse(vx, vy - 14 * s, 8 * s, 4 * s, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#facc15';
        ctx.beginPath();
        ctx.arc(vx, vy - 14 * s, 3 * s, 0, Math.PI * 2);
        ctx.fill();

        // Rising smoke plume
        ctx.fillStyle = 'rgba(203, 213, 225, 0.45)';
        const smokeWobble = Math.sin(now * 0.003) * 4 * s;
        ctx.beginPath();
        ctx.arc(vx + smokeWobble, vy - 24 * s, 6 * s, 0, Math.PI * 2);
        ctx.arc(vx - smokeWobble * 0.5, vy - 32 * s, 8 * s, 0, Math.PI * 2);
        ctx.fill();

        // Golden Dragon Silhouette on the Volcano
        ctx.fillStyle = '#eab308';
        ctx.beginPath();
        // Dragon Body
        ctx.arc(vx + 6 * s, vy - 20 * s, 4 * s, 0, Math.PI * 2);
        // Wings
        ctx.moveTo(vx + 6 * s, vy - 22 * s);
        ctx.lineTo(vx + 18 * s, vy - 32 * s);
        ctx.lineTo(vx + 14 * s, vy - 18 * s);
        ctx.moveTo(vx + 4 * s, vy - 22 * s);
        ctx.lineTo(vx - 8 * s, vy - 30 * s);
        ctx.lineTo(vx - 2 * s, vy - 18 * s);
        ctx.fill();
      };
      drawVolcanicDragonPeak();

      // =========================================================================
      // 3D GIZA PYRAMIDS & EGYPTIAN OASIS (Southwest Desert)
      // =========================================================================
      const draw3DPyramid = (px: number, pz: number, sz: number) => {
        const rx = originX + px * effectiveScale;
        const rz = originZ + pz * effectiveScale;
        const s = sz * effectiveScale;
        // Sunlit NW facet
        ctx.fillStyle = '#fef08a';
        ctx.beginPath();
        ctx.moveTo(rx, rz - s);
        ctx.lineTo(rx - s, rz + s);
        ctx.lineTo(rx, rz + s);
        ctx.closePath();
        ctx.fill();
        // Shaded SE facet
        ctx.fillStyle = '#b45309';
        ctx.beginPath();
        ctx.moveTo(rx, rz - s);
        ctx.lineTo(rx - s, rz + s);
        ctx.lineTo(rx + s, rz + s);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = '#78350f';
        ctx.lineWidth = 1;
        ctx.stroke();
      };
      draw3DPyramid(-155, 36, 13); // Khufu
      draw3DPyramid(-142, 48, 10); // Khafre
      draw3DPyramid(-132, 58, 8);  // Menkaure

      // Desert Palm Oasis
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.ellipse(originX - 164 * effectiveScale, originZ + 58 * effectiveScale, 8 * effectiveScale, 5 * effectiveScale, 0.3, 0, Math.PI * 2);
      ctx.fill();

      // =========================================================================
      // MONUMENTS: TAJ MAHAL, GREAT WALL, BURJ KHALIFA, McQUEEN RACEWAY
      // =========================================================================
      // Yamuna canal in India
      ctx.fillStyle = '#0284c7';
      ctx.fillRect(originX + 76 * effectiveScale, originZ - 122 * effectiveScale, 8 * effectiveScale, 47 * effectiveScale);

      // Taj Mahal White Marble Monument
      const tajX = originX + 75 * effectiveScale;
      const tajZ = originZ - 150 * effectiveScale;
      const tajSize = 16 * effectiveScale;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(tajX - tajSize / 2, tajZ - tajSize / 2, tajSize, tajSize);
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.2;
      ctx.strokeRect(tajX - tajSize / 2, tajZ - tajSize / 2, tajSize, tajSize);
      // Minarets
      ctx.fillStyle = '#f8fafc';
      const minOff = tajSize * 0.6;
      [[-minOff, -minOff], [minOff, -minOff], [minOff, minOff], [-minOff, minOff]].forEach(([mx, mz]) => {
        ctx.beginPath();
        ctx.arc(tajX + mx, tajZ + mz, 2.8 * userZoom, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      });

      // Great Wall in China (Stone ramparts curving along the mountains)
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = Math.max(3, 5 * effectiveScale * 0.5);
      ctx.beginPath();
      ctx.moveTo(originX - 150 * effectiveScale, originZ - 140 * effectiveScale);
      ctx.quadraticCurveTo(originX - 115 * effectiveScale, originZ - 132 * effectiveScale, originX - 80 * effectiveScale, originZ - 140 * effectiveScale);
      ctx.stroke();

      // Lightning McQueen Raceway Track
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = Math.max(4, 6.5 * effectiveScale * 0.5);
      ctx.beginPath();
      ctx.ellipse(originX + 168 * effectiveScale, originZ - 24 * effectiveScale, 18 * effectiveScale, 10 * effectiveScale, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = Math.max(1.8, 3 * effectiveScale * 0.5);
      ctx.stroke();

      // Dubai Palm Jumeirah & Arabian Gulf Archipelago (Large-Scale Realistic Cartography)
      const pRootX = originX + 176 * effectiveScale;
      const pRootZ = originZ + 42 * effectiveScale;
      const pTrunkEndX = originX + 236 * effectiveScale;

      ctx.save();
      // 1. Palm Jumeirah Trunk & Crown
      ctx.strokeStyle = '#dfc47b';
      ctx.lineWidth = 5 * effectiveScale;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(pRootX, pRootZ);
      ctx.lineTo(pTrunkEndX, pRootZ);
      ctx.stroke();

      // Monorail Line along Trunk
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.2 * effectiveScale;
      ctx.beginPath();
      ctx.moveTo(pRootX, pRootZ);
      ctx.lineTo(pTrunkEndX, pRootZ);
      ctx.stroke();

      // 16 Parametric Curved Fronds (8 Pairs)
      ctx.strokeStyle = '#dfc47b';
      ctx.lineWidth = 2.8 * effectiveScale;
      for (let f = 0; f < 8; f++) {
        const rootFrondX = originX + (236 + f * 6.5) * effectiveScale;
        const tipX = originX + (255 + f * 4.5) * effectiveScale;
        const spreadZ = (14 + f * 5.8) * effectiveScale;
        const ctrlX = originX + (242 + f * 6.0) * effectiveScale;

        // North frond
        ctx.beginPath();
        ctx.moveTo(rootFrondX, pRootZ);
        ctx.quadraticCurveTo(ctrlX, pRootZ - spreadZ * 0.7, tipX, pRootZ - spreadZ);
        ctx.stroke();

        // South frond
        ctx.beginPath();
        ctx.moveTo(rootFrondX, pRootZ);
        ctx.quadraticCurveTo(ctrlX, pRootZ + spreadZ * 0.7, tipX, pRootZ + spreadZ);
        ctx.stroke();
      }

      // Detached Crescent Breakwater Barrier (Radius ~72)
      ctx.strokeStyle = '#c2a661';
      ctx.lineWidth = 4 * effectiveScale;
      ctx.beginPath();
      const crescentCenterX = originX + 255 * effectiveScale;
      ctx.arc(crescentCenterX, pRootZ, 72 * effectiveScale, -Math.PI * 0.38, Math.PI * 0.38);
      ctx.stroke();

      // Atlantis The Palm Plinth Marker
      const atlantisX = originX + 320 * effectiveScale;
      ctx.fillStyle = '#f43f5e';
      ctx.beginPath();
      ctx.arc(atlantisX, pRootZ, 3.5 * effectiveScale, 0, Math.PI * 2);
      ctx.fill();

      // 2. Burj Al Arab Private Island & Bridge
      const burjIslandX = originX + 220 * effectiveScale;
      const burjIslandZ = originZ + 110 * effectiveScale;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 1.2 * effectiveScale;
      ctx.beginPath();
      ctx.moveTo(originX + 174 * effectiveScale, originZ + 90 * effectiveScale);
      ctx.quadraticCurveTo(originX + 195 * effectiveScale, originZ + 105 * effectiveScale, burjIslandX, burjIslandZ);
      ctx.stroke();
      ctx.fillStyle = '#dfc47b';
      ctx.beginPath();
      ctx.arc(burjIslandX, burjIslandZ, 6 * effectiveScale, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(burjIslandX, burjIslandZ, 2.5 * effectiveScale, 0, Math.PI * 2);
      ctx.fill();

      // 3. Bluewaters Island & Ain Dubai Wheel
      const blueX = originX + 262 * effectiveScale;
      const blueZ = originZ + 146 * effectiveScale;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 1.0 * effectiveScale;
      ctx.beginPath();
      ctx.moveTo(originX + 176 * effectiveScale, originZ + 120 * effectiveScale);
      ctx.lineTo(blueX, blueZ);
      ctx.stroke();
      ctx.fillStyle = '#dfc47b';
      ctx.beginPath();
      ctx.ellipse(blueX, blueZ, 9 * effectiveScale, 7 * effectiveScale, 0.3, 0, Math.PI * 2);
      ctx.fill();
      // Ain Dubai Ring
      ctx.strokeStyle = '#e0e7ff';
      ctx.lineWidth = 1.5 * effectiveScale;
      ctx.beginPath();
      ctx.arc(blueX, blueZ, 5 * effectiveScale, 0, Math.PI * 2);
      ctx.stroke();

      // 4. The World Islands Archipelago
      ctx.fillStyle = '#e2cb87';
      const worldIslands = [
        [280, -55, 4.5], [290, -48, 3.5], [270, -28, 4.0], [285, -30, 3.8], [300, -35, 3.0]
      ];
      for (const [wx, wz, wr] of worldIslands) {
        ctx.beginPath();
        ctx.arc(originX + wx * effectiveScale, originZ + wz * effectiveScale, wr * effectiveScale, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // =========================================================================
      // ORGANIC WINDING TRAILS & RAILWAY (Meandering Sandstone Paths)
      // =========================================================================
      const drawOrganicTrail = (points: [number, number][]) => {
        ctx.beginPath();
        points.forEach(([x, z], i) => {
          const px = originX + x * effectiveScale;
          const pz = originZ + z * effectiveScale;
          if (i === 0) ctx.moveTo(px, pz); else ctx.lineTo(px, pz);
        });
        ctx.stroke();
      };
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // Earthy trail border
      ctx.strokeStyle = '#78350f';
      ctx.lineWidth = Math.max(3.5, 5.5 * userZoom);
      drawOrganicTrail([[0, -22], [0, -65]]);
      drawOrganicTrail([[20, 0], [77, 0], [100, 0], [150, 0]]);
      drawOrganicTrail([[2, -60], [40, -84], [74, -106]]);
      drawOrganicTrail([[-2, -55], [-38, -70], [-70, -85]]);
      drawOrganicTrail([[-20, 0], [-50, 25], [-79, 50]]);
      drawOrganicTrail([[0, 22], [0, 58], [0, 119], [0, 160]]);
      drawOrganicTrail([[60, 42], [72, 42], [118, 42], [118, 72], [130, 80]]);

      // Warm sandstone trail surface
      ctx.strokeStyle = '#e8c872';
      ctx.lineWidth = Math.max(2, 3.2 * userZoom);
      drawOrganicTrail([[0, -22], [0, -65]]);
      drawOrganicTrail([[20, 0], [77, 0], [100, 0], [150, 0]]);
      drawOrganicTrail([[2, -60], [40, -84], [74, -106]]);
      drawOrganicTrail([[-2, -55], [-38, -70], [-70, -85]]);
      drawOrganicTrail([[-20, 0], [-50, 25], [-79, 50]]);
      drawOrganicTrail([[0, 22], [0, 58], [0, 119], [0, 160]]);
      drawOrganicTrail([[60, 42], [72, 42], [118, 42], [118, 72], [130, 80]]);

      // Island Express Railway Loop (Golden rails with wooden ties)
      const railWaypoints = [
        [58, 33], [74, 33], [92, 33], [104, 32], [116, 28], [124, 38],
        [128, 48], [144, 50], [158, 64], [174, 78], [180, 88], [174, 98],
        [144, 98], [112, 98], [80, 96], [50, 92], [24, 88],
        [12, 74], [8, 54], [6, 36], [8, 22], [22, 22], [38, 27], [48, 32]
      ];
      ctx.save();
      ctx.strokeStyle = '#78350f';
      ctx.lineWidth = Math.max(3.5, 5.0 * userZoom);
      ctx.setLineDash([3, 5]);
      ctx.beginPath();
      railWaypoints.forEach(([wx, wz], idx) => {
        const rx = originX + wx * effectiveScale;
        const rz = originZ + wz * effectiveScale;
        if (idx === 0) ctx.moveTo(rx, rz); else ctx.lineTo(rx, rz);
      });
      ctx.closePath();
      ctx.stroke();
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = Math.max(1.5, 2.2 * userZoom);
      ctx.setLineDash([]);
      ctx.stroke();
      ctx.restore();

      // Central Crossroads Citadel Moat & 4 Drawbridges
      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = Math.max(3.5, 6 * effectiveScale * 0.5);
      ctx.beginPath();
      ctx.arc(originX, originZ, 20 * effectiveScale, 0, Math.PI * 2);
      ctx.stroke();

      // 4 Stone Bridges
      ctx.fillStyle = '#cbd5e1';
      ctx.fillRect(originX - 3 * effectiveScale, originZ - 23 * effectiveScale, 6 * effectiveScale, 6 * effectiveScale);
      ctx.fillRect(originX - 3 * effectiveScale, originZ + 17 * effectiveScale, 6 * effectiveScale, 6 * effectiveScale);
      ctx.fillRect(originX + 17 * effectiveScale, originZ - 3 * effectiveScale, 6 * effectiveScale, 6 * effectiveScale);
      ctx.fillRect(originX - 23 * effectiveScale, originZ - 3 * effectiveScale, 6 * effectiveScale, 6 * effectiveScale);

      // Central Citadel Keep & Shimmering Sky Beacon
      ctx.fillStyle = '#475569';
      ctx.beginPath();
      ctx.arc(originX, originZ, 16 * effectiveScale, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#facc15';
      ctx.beginPath();
      ctx.arc(originX, originZ, 4.5 * effectiveScale, 0, Math.PI * 2);
      ctx.fill();

      // Skyward Beacon Beam
      const beamGrad = ctx.createRadialGradient(originX, originZ, 2, originX, originZ, 18 * effectiveScale);
      beamGrad.addColorStop(0, 'rgba(56, 189, 248, 0.7)');
      beamGrad.addColorStop(1, 'rgba(56, 189, 248, 0.0)');
      ctx.fillStyle = beamGrad;
      ctx.beginPath();
      ctx.arc(originX, originZ, 18 * effectiveScale, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore(); // restore mainland clipping

      // Live Dragons
      if (dragons) {
        for (const d of dragons) {
          const dx = originX + d.position.x * effectiveScale;
          const dz = originZ + d.position.z * effectiveScale;
          ctx.fillStyle = '#' + d.config.eyeColor.toString(16).padStart(6, '0');
          ctx.beginPath();
          ctx.moveTo(dx, dz - 7);
          ctx.lineTo(dx + 7, dz);
          ctx.lineTo(dx, dz + 7);
          ctx.lineTo(dx - 7, dz);
          ctx.closePath();
          ctx.fill();
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Live Moving Express Trains
      if (trains) {
        for (const t of trains) {
          const tx = originX + t.position.x * effectiveScale;
          const tz = originZ + t.position.z * effectiveScale;
          ctx.save();
          ctx.translate(tx, tz);
          ctx.rotate(-t.rotation.y);
          ctx.fillStyle = '#0284c7';
          ctx.strokeStyle = '#facc15';
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          if (typeof ctx.roundRect === 'function') {
            ctx.roundRect(-4, -8, 8, 16, 3);
          } else {
            ctx.rect(-4, -8, 8, 16);
          }
          ctx.fill();
          ctx.stroke();
          ctx.restore();
        }
      }

      // =========================================================================
      // RED DESTINATION BANNER FLAGS ON POLES (EXACT MATCH TO REFERENCE IMAGE 2)
      // =========================================================================
      const majorHubTags = [
        'CITADEL', 'TAJ MAHAL', 'GREAT WALL', 'TOKYO', 'NEO YORK',
        'LONDON', 'EIFFEL', 'MEXICO CITY', 'GIZA', 'DUBAI', 'HOLLYWOOD', 'McQUEEN', 'ALPS'
      ];

      const drawRedBannerFlag = (
        lx: number,
        lz: number,
        tag: string,
        name: string,
        isHovered: boolean
      ) => {
        const flagHeight = Math.max(20, 26 * Math.min(1.3, userZoom));
        const bannerW = Math.max(16, 22 * Math.min(1.3, userZoom));
        const bannerH = flagHeight * 0.46;

        // Animated gentle flutter
        const flutter = Math.sin(now * 0.005 + lx * 0.1) * 1.8;

        ctx.save();

        // 1. Ground shadow plinth
        ctx.fillStyle = 'rgba(15, 23, 42, 0.45)';
        ctx.beginPath();
        ctx.ellipse(lx, lz + 2, 6, 2.5, 0, 0, Math.PI * 2);
        ctx.fill();

        // 2. Mast Pole
        ctx.strokeStyle = isHovered ? '#facc15' : '#1e293b';
        ctx.lineWidth = isHovered ? 2.5 : 2.0;
        ctx.beginPath();
        ctx.moveTo(lx, lz);
        ctx.lineTo(lx, lz - flagHeight);
        ctx.stroke();

        // 3. Golden Sphere Finial
        ctx.fillStyle = '#facc15';
        ctx.beginPath();
        ctx.arc(lx, lz - flagHeight, 2.4, 0, Math.PI * 2);
        ctx.fill();

        // 4. Glowing Aura on Hover
        if (isHovered) {
          ctx.fillStyle = 'rgba(250, 204, 21, 0.35)';
          ctx.beginPath();
          ctx.arc(lx + bannerW * 0.4, lz - flagHeight + bannerH * 0.5, bannerW * 0.8, 0, Math.PI * 2);
          ctx.fill();
        }

        // 5. Red Banner Triangular Flag (waves to the right)
        ctx.fillStyle = isHovered ? '#ff3838' : '#dc2626';
        ctx.beginPath();
        ctx.moveTo(lx, lz - flagHeight);
        ctx.lineTo(lx + bannerW, lz - flagHeight + bannerH * 0.5 + flutter);
        ctx.lineTo(lx, lz - flagHeight + bannerH);
        ctx.closePath();
        ctx.fill();

        // Banner lower shadow crease
        ctx.fillStyle = 'rgba(127, 29, 29, 0.55)';
        ctx.beginPath();
        ctx.moveTo(lx, lz - flagHeight + bannerH * 0.5);
        ctx.lineTo(lx + bannerW, lz - flagHeight + bannerH * 0.5 + flutter);
        ctx.lineTo(lx, lz - flagHeight + bannerH);
        ctx.closePath();
        ctx.fill();

        // Crisp White Border
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // 6. Nameplate Banner
        const isMajor = majorHubTags.some(t => tag.includes(t));
        if (isHovered || (isMajor && userZoom >= 0.82)) {
          const cleanName = isHovered ? name : tag.replace(/[\[\]]/g, '');
          ctx.font = isHovered ? 'bold 10px monospace' : 'bold 8px monospace';
          const tw = ctx.measureText(cleanName).width;
          const badgeX = lx - tw / 2;
          const badgeY = lz - flagHeight - 14;

          ctx.fillStyle = isHovered ? '#0f172a' : 'rgba(15, 23, 42, 0.9)';
          ctx.fillRect(badgeX - 6, badgeY - 2, tw + 12, 16);
          ctx.strokeStyle = isHovered ? '#facc15' : '#38bdf8';
          ctx.lineWidth = isHovered ? 1.5 : 1;
          ctx.strokeRect(badgeX - 6, badgeY - 2, tw + 12, 16);

          ctx.fillStyle = isHovered ? '#facc15' : '#f8fafc';
          ctx.textAlign = 'center';
          ctx.fillText(cleanName, lx, badgeY + 10);
          ctx.textAlign = 'left';
        }

        ctx.restore();
      };

      for (const lm of PORTFOLIO_DATA.landmarks) {
        const cat = getLandmarkCategory(lm.tag);
        if (activeFilter !== 'all' && activeFilter !== cat) continue;

        const lx = originX + lm.coords[0] * effectiveScale;
        const lz = originZ + lm.coords[2] * effectiveScale;
        const isHovered = hoveredLm !== null && hoveredLm.name === lm.name;

        drawRedBannerFlag(lx, lz, lm.tag, lm.name, isHovered);
      }

      // =========================================================================
      // LIVE PLAYER INDICATOR (Player Avatar & Rotating Vision FOV)
      // =========================================================================
      const px = playerPos?.x || 0;
      const pz = playerPos?.z || 0;
      const pScreenX = originX + px * effectiveScale;
      const pScreenZ = originZ + pz * effectiveScale;
      const yaw = playerYaw || 0;

      // Pulsing Beacon
      const pulseR = 12 + Math.sin(now * 0.005) * 4;
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(pScreenX, pScreenZ, pulseR, 0, Math.PI * 2);
      ctx.stroke();

      // Vision FOV Cone
      ctx.save();
      ctx.translate(pScreenX, pScreenZ);
      ctx.rotate(-yaw);

      const fovGrad = ctx.createRadialGradient(0, 0, 4, 0, 0, 42 * Math.min(1.5, userZoom));
      fovGrad.addColorStop(0, 'rgba(56, 189, 248, 0.45)');
      fovGrad.addColorStop(1, 'rgba(56, 189, 248, 0.0)');
      ctx.fillStyle = fovGrad;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, 42 * Math.min(1.5, userZoom), -Math.PI / 2 - 0.48, -Math.PI / 2 + 0.48);
      ctx.closePath();
      ctx.fill();

      // Direction Needle
      ctx.fillStyle = '#ef4444';
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, -13);
      ctx.lineTo(8, 9);
      ctx.lineTo(0, 5);
      ctx.lineTo(-8, 9);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      // Player Label
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(pScreenX - 42, pScreenZ - 28, 84, 15);
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 1;
      ctx.strokeRect(pScreenX - 42, pScreenZ - 28, 84, 15);
      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 8.5px monospace';
      ctx.fillText('YOU [LAKSHYA]', pScreenX - 38, pScreenZ - 17);

      // Hover Crosshairs
      if (hoverWorldX !== null && hoverWorldZ !== null) {
        const hx = originX + hoverWorldX * effectiveScale;
        const hz = originZ + hoverWorldZ * effectiveScale;

        ctx.strokeStyle = '#facc15';
        ctx.lineWidth = 1.2;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(hx, 0); ctx.lineTo(hx, height);
        ctx.moveTo(0, hz); ctx.lineTo(width, hz);
        ctx.stroke();
        ctx.setLineDash([]);

        // Target reticle
        ctx.strokeStyle = '#facc15';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(hx, hz, 6, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.restore(); // restore clipping

      // =========================================================================
      // ETHEREAL ATMOSPHERIC CORNER CLOUDS (Framing the Map Edges)
      // =========================================================================
      const drawCornerClouds = () => {
        ctx.save();
        const drawCloudCluster = (cx0: number, cy0: number, puffs: [number, number, number][]) => {
          puffs.forEach(([ox, oy, r]) => {
            const grad = ctx.createRadialGradient(cx0 + ox, cy0 + oy, r * 0.15, cx0 + ox, cy0 + oy, r);
            grad.addColorStop(0, 'rgba(255, 255, 255, 0.88)');
            grad.addColorStop(0.55, 'rgba(241, 245, 249, 0.65)');
            grad.addColorStop(1, 'rgba(241, 245, 249, 0.0)');
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(cx0 + ox, cy0 + oy, r, 0, Math.PI * 2);
            ctx.fill();
          });
        };
        // Top-Left NW clouds
        drawCloudCluster(0, 0, [[40, 30, 80], [95, 20, 65], [150, 45, 75], [30, 95, 70]]);
        // Top-Right NE clouds
        drawCloudCluster(width, 0, [[-40, 30, 80], [-95, 20, 65], [-150, 45, 75], [-30, 95, 70]]);
        // Bottom-Left SW clouds
        drawCloudCluster(0, height, [[40, -30, 80], [95, -20, 65], [150, -45, 75], [30, -95, 70]]);
        // Bottom-Right SE clouds
        drawCloudCluster(width, height, [[-40, -30, 80], [-95, -20, 65], [-150, -45, 75], [-30, -95, 70]]);
        ctx.restore();
      };
      drawCornerClouds();

      // Cartographic Frame Border
      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = 2.5;
      ctx.strokeRect(0, 0, width, height);

      // Antique Cartography Compass Rose (Bottom-Left)
      const compX = 54;
      const compY = height - 54;
      ctx.save();
      ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
      ctx.beginPath();
      ctx.arc(compX, compY, 32, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.8;
      ctx.stroke();

      // Compass Star
      const drawCompassStar = (cx0: number, cy0: number, r: number) => {
        // Gold North needle
        ctx.fillStyle = '#facc15';
        ctx.beginPath();
        ctx.moveTo(cx0, cy0 - r);
        ctx.lineTo(cx0 + r * 0.28, cy0);
        ctx.lineTo(cx0, cy0 - r * 0.2);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = '#ca8a04';
        ctx.beginPath();
        ctx.moveTo(cx0, cy0 - r);
        ctx.lineTo(cx0 - r * 0.28, cy0);
        ctx.lineTo(cx0, cy0 - r * 0.2);
        ctx.closePath();
        ctx.fill();

        // Slate South needle
        ctx.fillStyle = '#94a3b8';
        ctx.beginPath();
        ctx.moveTo(cx0, cy0 + r);
        ctx.lineTo(cx0 + r * 0.28, cy0);
        ctx.lineTo(cx0, cy0 + r * 0.2);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = '#475569';
        ctx.beginPath();
        ctx.moveTo(cx0, cy0 + r);
        ctx.lineTo(cx0 - r * 0.28, cy0);
        ctx.lineTo(cx0, cy0 + r * 0.2);
        ctx.closePath();
        ctx.fill();
      };
      drawCompassStar(compX, compY, 24);

      ctx.fillStyle = '#facc15';
      ctx.font = 'bold 10px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('N', compX, compY - 18);
      ctx.fillStyle = '#94a3b8';
      ctx.fillText('S', compX, compY + 25);
      ctx.fillText('W', compX - 22, compY + 3);
      ctx.fillText('E', compX + 22, compY + 3);
      ctx.textAlign = 'left';
      ctx.restore();

      // Scale Indicator (Bottom-Right)
      ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
      ctx.fillRect(width - 160, height - 36, 150, 26);
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1;
      ctx.strokeRect(width - 160, height - 36, 150, 26);
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 8.5px monospace';
      const scaleBarLen = Math.round(50 * effectiveScale);
      ctx.fillRect(width - 150, height - 16, Math.min(130, scaleBarLen), 3);
      ctx.fillText(`SCALE: 50 BLOCKS`, width - 150, height - 23);
    };

    // Continuous Animation Loop using requestAnimationFrame
    const animLoop = () => {
      draw();
      this.mapAnimId = requestAnimationFrame(animLoop);
    };
    this.mapAnimId = requestAnimationFrame(animLoop);

    // Exact Canvas-to-World Coordinate Mapping Function
    const getCoords = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      const mx = (clientX - rect.left) * (width / rect.width);
      const my = (clientY - rect.top) * (height / rect.height);
      const effectiveScale = baseScale * userZoom;
      const originX = cx + panX;
      const originZ = cy + panY;
      const wx = Math.round((mx - originX) / effectiveScale);
      const wz = Math.round((my - originZ) / effectiveScale);
      return { mx, my, wx, wz, rect };
    };

    // Find closest landmark within radius
    const findHoveredLandmark = (mx: number, my: number) => {
      const effectiveScale = baseScale * userZoom;
      const originX = cx + panX;
      const originZ = cy + panY;
      let closest: typeof PORTFOLIO_DATA.landmarks[0] | null = null;
      let closestDist = Infinity;

      for (const lm of PORTFOLIO_DATA.landmarks) {
        const cat = getLandmarkCategory(lm.tag);
        if (activeFilter !== 'all' && activeFilter !== cat) continue;

        const lx = originX + lm.coords[0] * effectiveScale;
        const lz = originZ + lm.coords[2] * effectiveScale;
        const d = Math.hypot(mx - lx, my - lz);
        if (d < 18 && d < closestDist) {
          closestDist = d;
          closest = lm;
        }
      }
      return closest;
    };

    // Mouse Move & Hover
    canvas.addEventListener('mousemove', (e) => {
      const { mx, my, wx, wz, rect } = getCoords(e.clientX, e.clientY);

      if (isPointerDown) {
        const dx = e.clientX - dragStartX;
        const dy = e.clientY - dragStartY;
        if (Math.hypot(dx, dy) > 4) {
          hasDragged = true;
          const scaleRatio = width / rect.width;
          panX = initialPanX + dx * scaleRatio;
          panY = initialPanY + dy * scaleRatio;
        }
      }

      if (Math.abs(wx) <= worldLimit && Math.abs(wz) <= worldLimit) {
        hoverWorldX = wx;
        hoverWorldZ = wz;
        canvas.style.cursor = isPointerDown ? 'grabbing' : 'crosshair';

        const lm = findHoveredLandmark(mx, my);
        hoveredLm = lm;

        const statusEl = document.getElementById('map-cursor-coords');
        if (lm) {
          const px = playerPos?.x || 0;
          const pz = playerPos?.z || 0;
          const dist = Math.round(Math.hypot(lm.coords[0] - px, lm.coords[2] - pz));
          if (statusEl) {
            statusEl.textContent = `📍 ${lm.name} [X: ${lm.coords[0]}, Z: ${lm.coords[2]}] · ${dist}m away · Click to Travel!`;
          }

          if (tooltipEl && containerEl) {
            const containerRect = containerEl.getBoundingClientRect();
            const posX = e.clientX - containerRect.left;
            const posY = e.clientY - containerRect.top;
            tooltipEl.style.left = `${posX}px`;
            tooltipEl.style.top = `${posY}px`;
            tooltipEl.style.display = 'block';
            tooltipEl.innerHTML = `
              <span class="mc-map-tooltip-tag">${lm.tag}</span>
              <div class="mc-map-tooltip-name">${lm.name}</div>
              <div class="mc-map-tooltip-dist">📍 Distance: ${dist}m · [X: ${lm.coords[0]}, Z: ${lm.coords[2]}]</div>
              <div class="mc-map-tooltip-desc">${lm.desc}</div>
              <span class="mc-map-tooltip-hint">⚡ Click anywhere to Fast Travel here ↗</span>
            `;
          }
        } else {
          if (tooltipEl) tooltipEl.style.display = 'none';
          const px = playerPos?.x || 0;
          const pz = playerPos?.z || 0;
          const dist = Math.round(Math.hypot(wx - px, wz - pz));
          if (statusEl) {
            statusEl.textContent = `[X: ${wx}, Z: ${wz}] · ${dist}m from you · Click to Travel Here`;
          }
        }
      } else {
        hoverWorldX = null;
        hoverWorldZ = null;
        hoveredLm = null;
        canvas.style.cursor = isPointerDown ? 'grabbing' : 'default';
        if (tooltipEl) tooltipEl.style.display = 'none';
      }
    });

    canvas.addEventListener('mouseleave', () => {
      hoverWorldX = null;
      hoverWorldZ = null;
      hoveredLm = null;
      isPointerDown = false;
      if (tooltipEl) tooltipEl.style.display = 'none';
    });

    // Pointer Down (Pan Start)
    canvas.addEventListener('mousedown', (e) => {
      isPointerDown = true;
      hasDragged = false;
      dragStartX = e.clientX;
      dragStartY = e.clientY;
      initialPanX = panX;
      initialPanY = panY;
    });

    const handleMouseUp = () => {
      isPointerDown = false;
    };
    window.addEventListener('mouseup', handleMouseUp);
    this.mapMouseUpCleanup = () => {
      window.removeEventListener('mouseup', handleMouseUp);
    };

    // Mouse Wheel Zoom
    canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 1.15 : 0.87;
      const newZoom = Math.max(0.7, Math.min(3.6, userZoom * zoomFactor));

      const { mx, my } = getCoords(e.clientX, e.clientY);
      // Zoom centered at cursor
      const ratio = newZoom / userZoom;
      panX = mx - cx - (mx - cx - panX) * ratio;
      panY = my - cy - (my - cy - panY) * ratio;
      userZoom = newZoom;
    }, { passive: false });

    // Touch Support for Pan and Zoom
    let touchStartDist = 0;
    canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        isPointerDown = true;
        hasDragged = false;
        dragStartX = e.touches[0].clientX;
        dragStartY = e.touches[0].clientY;
        initialPanX = panX;
        initialPanY = panY;
      } else if (e.touches.length === 2) {
        touchStartDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
      }
    }, { passive: true });

    canvas.addEventListener('touchmove', (e) => {
      if (e.touches.length === 1 && isPointerDown) {
        const dx = e.touches[0].clientX - dragStartX;
        const dy = e.touches[0].clientY - dragStartY;
        if (Math.hypot(dx, dy) > 4) {
          hasDragged = true;
          const rect = canvas.getBoundingClientRect();
          const scaleRatio = width / rect.width;
          panX = initialPanX + dx * scaleRatio;
          panY = initialPanY + dy * scaleRatio;
        }
      } else if (e.touches.length === 2 && touchStartDist > 0) {
        const newDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const factor = newDist / touchStartDist;
        userZoom = Math.max(0.7, Math.min(3.6, userZoom * factor));
        touchStartDist = newDist;
      }
    }, { passive: true });

    canvas.addEventListener('touchend', (e) => {
      isPointerDown = false;
      touchStartDist = 0;
      if (!hasDragged && e.changedTouches.length === 1) {
        const t = e.changedTouches[0];
        const { wx, wz } = getCoords(t.clientX, t.clientY);
        if (Math.abs(wx) <= worldLimit && Math.abs(wz) <= worldLimit) {
          teleportTo(wx, wz);
        }
      }
    });

    const teleportTo = (wx: number, wz: number) => {
      if (hoveredLm) {
        sound.playLevelUp();
        this.onTeleportRequest?.(hoveredLm.coords as [number, number, number]);
        this.close();
        return;
      }

      if (this.onTeleportRequest) {
        sound.playLevelUp();
        let targetY = 2;
        if (wz <= -75 && Math.abs(wx) <= 35) targetY = 18;
        else if (wz <= -80 && wx >= 35 && wx <= 75) targetY = 4;
        else {
          const hillDistance = Math.hypot((wx - 82) / 34, (wz + 58) / 24);
          if (hillDistance < 1) targetY = Math.max(2, Math.round(28 * (1 - hillDistance)) + 2);
        }
        this.onTeleportRequest([wx, targetY, wz]);
        this.close();
      }
    };

    // Click to Teleport!
    canvas.addEventListener('click', (e) => {
      if (hasDragged) return;
      const { wx, wz } = getCoords(e.clientX, e.clientY);
      if (Math.abs(wx) <= worldLimit && Math.abs(wz) <= worldLimit) {
        teleportTo(wx, wz);
      }
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

