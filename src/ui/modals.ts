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

export function getMashuAvatarHtml(): string {
  return `<svg viewBox="0 0 32 32" width="56" height="56" style="image-rendering: pixelated; border-radius: 4px;">
    <rect width="32" height="32" fill="#2e1065"/>
    <!-- Hair background and crown -->
    <rect x="5" y="2" width="22" height="9" fill="#3d2012"/>
    <rect x="3" y="6" width="5" height="18" fill="#3d2012"/>
    <rect x="24" y="6" width="5" height="18" fill="#3d2012"/>
    <rect x="5" y="14" width="3" height="10" fill="#542c19"/>
    <rect x="24" y="14" width="3" height="10" fill="#542c19"/>
    <!-- Face -->
    <rect x="7" y="7" width="18" height="16" fill="#fce8d8"/>
    <!-- Front bangs framing forehead -->
    <rect x="8" y="7" width="4" height="6" fill="#3d2012"/>
    <rect x="20" y="7" width="4" height="6" fill="#3d2012"/>
    <rect x="12" y="7" width="8" height="3" fill="#3d2012"/>
    <!-- Cherry blossom hair clip -->
    <rect x="22" y="4" width="4" height="4" fill="#f472b6"/>
    <rect x="23" y="5" width="2" height="2" fill="#fef08a"/>
    <rect x="26" y="5" width="2" height="2" fill="#4ade80"/>
    <!-- Eyelashes & Sparkling Eyes -->
    <rect x="9" y="12" width="4" height="1" fill="#1e1b4b"/>
    <rect x="19" y="12" width="4" height="1" fill="#1e1b4b"/>
    <rect x="9" y="13" width="4" height="3" fill="#ffffff"/>
    <rect x="11" y="13" width="2" height="3" fill="#4338ca"/>
    <rect x="11" y="13" width="1" height="1" fill="#ffffff"/>
    <rect x="19" y="13" width="4" height="3" fill="#ffffff"/>
    <rect x="19" y="13" width="2" height="3" fill="#4338ca"/>
    <rect x="19" y="13" width="1" height="1" fill="#ffffff"/>
    <!-- Rosy Cheek Blush -->
    <rect x="8" y="16" width="3" height="2" fill="#fb7185"/>
    <rect x="21" y="16" width="3" height="2" fill="#fb7185"/>
    <!-- Sweet Smile -->
    <rect x="13" y="18" width="6" height="2" fill="#e11d48"/>
    <!-- Dress collar & Pearl necklace -->
    <rect x="6" y="23" width="20" height="9" fill="#f472b6"/>
    <rect x="11" y="23" width="10" height="3" fill="#fff1f2"/>
    <rect x="13" y="24" width="6" height="1" fill="#fef08a"/>
    <rect x="14" y="27" width="4" height="5" fill="#fbcfe8"/>
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

export class ModalManager {
  private modalContainer: HTMLElement;
  public isOpen: boolean = false;
  private openTime: number = 0;
  public onTeleportRequest?: (coords: [number, number, number]) => void;
  public getPlayerInfo?: () => { position: { x: number; y: number; z: number }; yaw: number; dragons?: any[]; trains?: any[] };
  private mapAnimId: number | null = null;

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
    });

    const handleBackdropClose = (e: MouseEvent | PointerEvent) => {
      if (e.target === this.modalContainer && performance.now() - this.openTime > 250) {
        this.close();
      }
    };

    this.modalContainer.addEventListener('click', handleBackdropClose);
    this.modalContainer.addEventListener('pointerup', handleBackdropClose);
  }

  public close() {
    if (this.mapAnimId !== null) {
      cancelAnimationFrame(this.mapAnimId);
      this.mapAnimId = null;
    }
    this.isOpen = false;
    this.modalContainer.innerHTML = '';
    this.modalContainer.style.display = 'none';
    document.body.classList.remove('modal-open');
    sound.playClick();

    const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (window.matchMedia && window.matchMedia('(pointer: coarse)').matches);
    const pauseOverlay = document.getElementById('pause-overlay');
    if (pauseOverlay && document.pointerLockElement === null && !isTouch) {
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
            <h4 class="mc-section-heading">Expedition Briefing & Lore</h4>
            ${descHtml}
          </div>

          <div class="mc-tags-section">
            <h4 class="mc-section-heading">Key Equipment & Drops</h4>
            <div class="mc-tags-wrapper">
              ${tagsHtml}
            </div>
          </div>
        </div>

        <div class="mc-dialog-footer">
          <button class="mc-btn mc-btn-green" id="mc-expedition-ready">[READY] Log Expedition</button>
          <button class="mc-btn mc-btn-stone" id="mc-modal-done">Done (ESC)</button>
        </div>
      </div>
    `;

    this.modalContainer.style.display = 'flex';
    document.getElementById('mc-modal-close')?.addEventListener('click', () => this.close());
    document.getElementById('mc-modal-done')?.addEventListener('click', () => this.close());
    document.getElementById('mc-expedition-ready')?.addEventListener('click', () => {
      sound.playLevelUp();
      this.close();
    });
  }

  // 2. Experience / Guild Modal
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
            <h4 class="mc-section-heading">Guild Achievements & Chronicles</h4>
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

  // 3. Ancient Dungeon Treasure Chest GUI (Legendary Loot Vault)
  public openResumeChestModal() {
    this.onModalOpen();
    sound.playChestOpen();

    this.modalContainer.innerHTML = `
      <div class="mc-chest-gui">
        <div class="mc-chest-header">
          <span>Ancient Dungeon Treasure Chest</span>
          <button class="mc-close-btn" id="mc-modal-close">X</button>
        </div>

        <div class="mc-chest-grid">
          <!-- Row 1 with Minecraft Loot Assets -->
          <div class="mc-slot" title="Enchanted Book: Mending & Unbreaking III">
            <div class="mc-slot-item">${ASSETS.book}</div>
            <span class="mc-slot-badge">MEND</span>
          </div>
          <div class="mc-slot" title="Enchanted Book: Fortune III & Efficiency V">
            <div class="mc-slot-item">${ASSETS.book}</div>
            <span class="mc-slot-badge">FORT</span>
          </div>
          <div class="mc-slot" title="Netherite Sword: Sharpness V & Fire Aspect II">
            <div class="mc-slot-item">${ASSETS.sword}</div>
          </div>
          <div class="mc-slot" title="Netherite Pickaxe: Efficiency V & Silk Touch">
            <div class="mc-slot-item">${ASSETS.pickaxe}</div>
          </div>
          <div class="mc-slot" title="Enchanted Golden Apple: Regeneration II & Absorption IV">
            <div class="mc-slot-item">${ASSETS.apple}</div>
          </div>
          <div class="mc-slot" title="Heart of the Sea & Conduit Heart">
            <div class="mc-slot-item">${ASSETS.pearl}</div>
          </div>
          <div class="mc-slot" title="Eye of Ender: Stronghold Navigator">
            <div class="mc-slot-item">${ASSETS.compass}</div>
          </div>
          <div class="mc-slot" title="Elytra Wings & Fireworks Flight System">
            <div class="mc-slot-item">${ASSETS.cobblestone}</div>
          </div>
          <div class="mc-slot" title="Nether Star: Beacon Power Core">
            <div class="mc-slot-item">${ASSETS.star}</div>
          </div>
        </div>

        <div class="mc-chest-loot-action">
          <div class="mc-resume-preview-info">
            <h3>Ancient Dungeon Treasure Vault</h3>
            <p>Legendary relics, enchanted equipment, and treasures gathered across Minecraft realms.</p>
          </div>
          <div class="mc-chest-btn-row">
            <button class="mc-btn mc-btn-green" id="mc-claim-apple">
              [CLAIM] Enchanted Golden Apple
            </button>
            <button class="mc-btn mc-btn-gold" id="mc-claim-totem">
              [TAKE] Totem of Undying
            </button>
            <button class="mc-btn mc-btn-blue" id="mc-claim-sword">
              [EQUIP] Netherite Sword
            </button>
            <button class="mc-btn mc-btn-stone" id="mc-modal-done-btn">
              [CLOSE] Seal Vault
            </button>
          </div>
        </div>
      </div>
    `;

    this.modalContainer.style.display = 'flex';
    document.getElementById('mc-modal-close')?.addEventListener('click', () => this.close());
    document.getElementById('mc-modal-done-btn')?.addEventListener('click', () => this.close());

    document.getElementById('mc-claim-apple')?.addEventListener('click', (e) => {
      sound.playLevelUp();
      const target = e.currentTarget as HTMLElement;
      target.textContent = '[CLAIMED!] +Absorption Boost';
      target.classList.replace('mc-btn-green', 'mc-btn-stone');
    });

    document.getElementById('mc-claim-totem')?.addEventListener('click', (e) => {
      sound.playLevelUp();
      const target = e.currentTarget as HTMLElement;
      target.textContent = '[EQUIPPED!] Second Life Active';
      target.classList.replace('mc-btn-gold', 'mc-btn-stone');
    });

    document.getElementById('mc-claim-sword')?.addEventListener('click', () => {
      sound.playBlockBreak();
      const target = document.getElementById('mc-claim-sword') as HTMLElement;
      target.textContent = '[DRAWN!] Sharpness V Ready';
      target.classList.replace('mc-btn-blue', 'mc-btn-stone');
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
            <h2 class="mc-dialog-title">Alchemy Brewing Stand & Potions Guide</h2>
            <span class="mc-dialog-subtitle">Essential Minecraft Elixirs, Combat Brews, and Enchantment Recipes</span>
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
      { number: '08', name: 'Dubai · Burj Khalifa', subtitle: 'United Arab Emirates', detail: 'Towering 828m spider-lily skyscraper with skydeck at Y=46 and Palm Jumeirah lagoon.', tag: '[DUBAI]', tone: 'neoyork', direction: 'EAST · X 170 / Z 42' },
      { number: '09', name: 'London · Big Ben', subtitle: 'United Kingdom', detail: 'Historic Elizabeth Tower clock with Westminster chime, Great Bell, and Tower Bridge walkways.', tag: '[LONDON]', tone: 'citadel', direction: 'NORTH · X −32 / Z −58' },
      { number: '10', name: 'Paris · Eiffel Tower', subtitle: 'France', detail: 'Gustave Eiffel’s lattice monument, Champ de Mars gardens, and Café de Paris terrace.', tag: '[EIFFEL]', tone: 'frost', direction: 'NORTHEAST · X 26 / Z −38' },
      { number: '11', name: 'Great Wall & Dragon Pagoda', subtitle: 'China', detail: 'Mighty stone ramparts, 5-tier pagoda, bamboo groves, and foreign language pavilion.', tag: '[GREAT WALL]', tone: 'sakura', direction: 'NORTHWEST · X −110 / Z −110' },
      { number: '12', name: 'Hollywood Hills & Walk of Fame', subtitle: 'United States', detail: 'Block-built HOLLYWOOD sign atop Mount Lee, Walk of Fame brass stars, Hollywood Bowl amphitheatre, movie soundstages, and retro diner.', tag: '[HOLLYWOOD]', tone: 'raj', direction: 'NORTHEAST · X 165 / Z −100' },
      { number: '13', name: 'Lightning McQueen Street', subtitle: 'Radiator Springs · ⚡', detail: 'High-speed 3D racing with Lightning McQueen (#95), Flo\'s V8 Café, Luigi\'s tire tower, Mater\'s towing, and playable racecar mode.', tag: '[McQUEEN]', tone: 'raj', direction: 'EAST · X 168 / Z −24' },
      { number: '14', name: 'Frostpeak Alps · Ski Lodge', subtitle: 'Switzerland', detail: 'Snow-capped alpine peaks, Chalet ski lodge, Lake Serenity ice rink, and high summit observatory.', tag: '[ALPS]', tone: 'frost', direction: 'NORTH · X −2 / Z −100' },
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
    const baseScale = 2.05;
    const worldLimit = 205;

    let userZoom = 1.0;
    let panX = 0;
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
          tag.includes('INDIA GATE') || tag.includes('PAVILION') || tag.includes('CASTLE')) {
        return 'monuments';
      }
      if (tag.includes('TOKYO') || tag.includes('NEO') || tag.includes('TOWER') ||
          tag.includes('HOLLYWOOD') || tag.includes('McQUEEN') || tag.includes('MEXICO') ||
          tag.includes('DUBAI') || tag.includes('SEOUL') || tag.includes('MUMBAI') ||
          tag.includes('VARANASI') || tag.includes('CITADEL')) {
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
      if (tag.includes('DUBAI')) return '#14b8a6';
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

    // Main Draw Function
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const effectiveScale = baseScale * userZoom;
      const originX = cx + panX;
      const originZ = cy + panY;

      // 1. Deep Ocean Background
      ctx.fillStyle = '#0284c7';
      ctx.fillRect(0, 0, width, height);

      // World boundary clipping
      const mapHalfW = worldLimit * effectiveScale;
      const mapHalfH = worldLimit * effectiveScale;
      const mapX = originX - mapHalfW;
      const mapY = originZ - mapHalfH;
      const mapW = mapHalfW * 2;
      const mapH = mapHalfH * 2;

      // Coordinate Grid Lines (every 50 blocks)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      for (let wCoord = -200; wCoord <= 200; wCoord += 50) {
        const gx = originX + wCoord * effectiveScale;
        const gz = originZ + wCoord * effectiveScale;
        ctx.beginPath();
        ctx.moveTo(gx, 0); ctx.lineTo(gx, height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, gz); ctx.lineTo(width, gz);
        ctx.stroke();

        // Subtle coordinate markings
        if (userZoom >= 1.0) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
          ctx.font = '8px monospace';
          ctx.fillText(`${wCoord}`, gx + 3, originZ + 10);
        }
      }

      ctx.save();
      ctx.beginPath();
      ctx.rect(mapX, mapY, mapW, mapH);
      ctx.clip();

      // Rounded Square Island Outline matching 3D world (R = 200, cornerR = 55)
      const drawIslandShape = (margin = 0) => {
        ctx.beginPath();
        const r = (200 - margin) * effectiveScale;
        const cornerR = Math.max(6, (55 - margin) * effectiveScale);
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

      // Golden beach coastline
      drawIslandShape(0);
      ctx.fillStyle = '#fde047';
      ctx.fill();

      // Clip interior landmass
      ctx.save();
      drawIslandShape(5);
      ctx.clip();

      // Base interior emerald plains
      ctx.fillStyle = '#15803d';
      ctx.fillRect(originX - 210 * effectiveScale, originZ - 210 * effectiveScale, 420 * effectiveScale, 420 * effectiveScale);

      // Render Realm Territorials
      const drawCountryTerritory = (poly: [number, number][], fillColor: string, strokeColor: string, label: string, labelPos: [number, number]) => {
        ctx.beginPath();
        poly.forEach(([x, z], i) => {
          const px = originX + x * effectiveScale;
          const pz = originZ + z * effectiveScale;
          if (i === 0) ctx.moveTo(px, pz); else ctx.lineTo(px, pz);
        });
        ctx.closePath();
        ctx.fillStyle = fillColor;
        ctx.fill();
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = Math.max(1, 1.8 * userZoom);
        ctx.stroke();

        if (label && userZoom >= 0.8) {
          ctx.save();
          ctx.fillStyle = '#ffffff';
          ctx.font = `bold ${Math.max(9, Math.round(10 * Math.min(1.4, userZoom)))}px monospace`;
          ctx.textAlign = 'center';
          ctx.shadowColor = '#000000';
          ctx.shadowBlur = 4;
          ctx.fillText(label, originX + labelPos[0] * effectiveScale, originZ + labelPos[1] * effectiveScale);
          ctx.restore();
        }
      };

      // 1. INDIA
      drawCountryTerritory([[35, -70], [80, -70], [130, -75], [160, -95], [175, -135], [150, -170], [115, -185], [75, -185], [35, -165], [25, -130], [28, -95], [35, -70]], 'rgba(249, 115, 22, 0.40)', '#f97316', 'INDIA', [95, -130]);
      // 2. CHINA
      drawCountryTerritory([[-185, -95], [-160, -145], [-120, -175], [-70, -170], [-45, -140], [-45, -95], [-85, -80], [-130, -75], [-185, -95]], 'rgba(220, 38, 38, 0.36)', '#dc2626', 'CHINA', [-115, -130]);
      // 3. JAPAN
      drawCountryTerritory([[-175, -60], [-160, -75], [-145, -95], [-135, -85], [-150, -65], [-165, -55], [-175, -60]], 'rgba(244, 63, 94, 0.45)', '#f43f5e', 'JAPAN', [-155, -75]);
      // 4. SOUTH KOREA
      drawCountryTerritory([[-75, -85], [-50, -85], [-45, -115], [-65, -125], [-75, -105], [-75, -85]], 'rgba(14, 165, 233, 0.45)', '#0ea5e9', 'SOUTH KOREA', [-60, -102]);
      // 5. UK
      drawCountryTerritory([[-45, -55], [-20, -55], [-18, -80], [-35, -85], [-45, -70], [-45, -55]], 'rgba(239, 68, 68, 0.40)', '#ef4444', 'UNITED KINGDOM', [-32, -68]);
      // 6. FRANCE
      drawCountryTerritory([[12, -25], [42, -25], [50, -55], [32, -65], [15, -55], [10, -35], [12, -25]], 'rgba(56, 189, 248, 0.42)', '#38bdf8', 'FRANCE', [28, -42]);
      // 7. USA
      drawCountryTerritory([[75, -60], [145, -60], [175, -45], [175, 25], [145, 45], [115, 45], [85, 25], [75, -10], [75, -60]], 'rgba(59, 130, 246, 0.38)', '#3b82f6', 'USA · VEGAS & NEO YORK', [120, -10]);
      // 8. MEXICO
      drawCountryTerritory([[-185, 30], [-135, 25], [-85, 40], [-70, 75], [-105, 95], [-145, 80], [-185, 55], [-185, 30]], 'rgba(5, 150, 105, 0.38)', '#059669', 'MEXICO', [-125, 60]);
      // 9. EGYPT
      drawCountryTerritory([[-175, 20], [-135, 20], [-135, 60], [-175, 60], [-175, 20]], 'rgba(234, 179, 8, 0.38)', '#eab308', 'EGYPT', [-155, 40]);
      // 10. UAE
      drawCountryTerritory([[150, 20], [185, 20], [185, 60], [150, 60], [150, 20]], 'rgba(16, 185, 129, 0.42)', '#10b981', 'UAE', [168, 38]);
      // 11. ALPS SNOW MOUNTAINS
      drawCountryTerritory([[-30, -125], [20, -125], [15, -85], [-25, -85], [-30, -125]], 'rgba(224, 242, 254, 0.55)', '#bae6fd', 'FROSTPEAK ALPS', [-5, -105]);
      // 12. SUNFLOWER VALLEY
      drawCountryTerritory([[-65, 30], [-25, 30], [-25, 65], [-65, 65], [-65, 30]], 'rgba(250, 204, 21, 0.35)', '#eab308', 'SUNFLOWER VALLEY', [-45, 48]);
      // 13. SAFARI ZOO
      drawCountryTerritory([[-85, -20], [-45, -20], [-45, 20], [-85, 20], [-85, -20]], 'rgba(34, 197, 94, 0.35)', '#22c55e', 'SAFARI WILDLIFE PARK', [-65, 0]);
      // Beach & Carnival Pier
      drawCountryTerritory([[-40, 75], [40, 75], [40, 195], [-40, 195], [-40, 75]], 'rgba(212, 173, 100, 0.25)', '#d4ad64', 'BEACH & BOARDWALK', [0, 95]);
      drawCountryTerritory([[-25, 120], [35, 120], [35, 185], [-25, 185], [-25, 120]], 'rgba(236, 72, 153, 0.40)', '#ec4899', 'CARNIVAL PIER', [5, 150]);

      // Yamuna canal in India
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(originX + 76 * effectiveScale, originZ - 122 * effectiveScale, 8 * effectiveScale, 47 * effectiveScale);

      // Great Wall on China Ridge
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = Math.max(2, 4 * effectiveScale * 0.5);
      ctx.beginPath();
      ctx.moveTo(originX - 150 * effectiveScale, originZ - 140 * effectiveScale);
      ctx.quadraticCurveTo(originX - 115 * effectiveScale, originZ - 132 * effectiveScale, originX - 80 * effectiveScale, originZ - 140 * effectiveScale);
      ctx.stroke();

      // Hollywood Hills Ridge
      const hollywoodX = originX + 165 * effectiveScale;
      const hollywoodZ = originZ - 100 * effectiveScale;
      ctx.fillStyle = 'rgba(91,61,43,.48)';
      ctx.beginPath();
      ctx.ellipse(hollywoodX, hollywoodZ + 6 * effectiveScale, 24 * effectiveScale, 12 * effectiveScale, -.2, 0, Math.PI * 2);
      ctx.fill();

      // Hollywood Boulevard Walk of Fame
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = Math.max(2, 3.2 * effectiveScale * 0.5);
      ctx.beginPath();
      ctx.moveTo(originX + 161 * effectiveScale, originZ - 84 * effectiveScale);
      ctx.lineTo(originX + 161 * effectiveScale, originZ - 54 * effectiveScale);
      ctx.stroke();

      // Hollywood Bowl acoustic concentric shell arc
      ctx.strokeStyle = '#f8fafc';
      ctx.lineWidth = Math.max(1.5, 2.4 * effectiveScale * 0.5);
      ctx.beginPath();
      ctx.arc(originX + 180 * effectiveScale, originZ - 76 * effectiveScale, 6 * effectiveScale, -Math.PI * 0.4, Math.PI * 0.4);
      ctx.stroke();

      // Lightning McQueen Speedway track
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = Math.max(2, 3.5 * effectiveScale * 0.5);
      ctx.beginPath();
      ctx.ellipse(originX + 168 * effectiveScale, originZ - 24 * effectiveScale, 18 * effectiveScale, 10 * effectiveScale, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Main Arterial Routes
      const route = (points: [number, number][]) => {
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
      ctx.strokeStyle = 'rgba(27,37,31,.75)';
      ctx.lineWidth = Math.max(2.5, 4.5 * userZoom);
      route([[0, -22], [0, -65]]);
      route([[20, 0], [77, 0], [100, 0], [150, 0]]);
      route([[2, -60], [40, -84], [74, -106]]);
      route([[-2, -55], [-38, -70], [-70, -85]]);
      route([[-20, 0], [-50, 25], [-79, 50]]);
      route([[0, 22], [0, 58], [0, 119], [0, 160]]);
      route([[60, 42], [72, 42], [118, 42], [118, 72], [130, 80]]);
      ctx.strokeStyle = '#e6d5a5';
      ctx.lineWidth = Math.max(1.5, 2.2 * userZoom);
      route([[0, -22], [0, -65]]);
      route([[20, 0], [77, 0], [100, 0], [150, 0]]);
      route([[2, -60], [40, -84], [74, -106]]);
      route([[-2, -55], [-38, -70], [-70, -85]]);
      route([[-20, 0], [-50, 25], [-79, 50]]);
      route([[0, 22], [0, 58], [0, 119], [0, 160]]);
      route([[60, 42], [72, 42], [118, 42], [118, 72], [130, 80]]);

      // Island Express Railway Loop
      const railWaypoints = [
        [58, 33], [74, 33], [92, 33], [104, 32], [116, 28], [124, 38],
        [128, 48], [144, 50], [158, 64], [174, 78], [180, 88], [174, 98],
        [144, 98], [112, 98], [80, 96], [50, 92], [24, 88],
        [12, 74], [8, 54], [6, 36], [8, 22], [22, 22], [38, 27], [48, 32]
      ];
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = Math.max(1.8, 2.6 * userZoom);
      ctx.setLineDash([5, 3]);
      ctx.beginPath();
      railWaypoints.forEach(([wx, wz], idx) => {
        const rx = originX + wx * effectiveScale;
        const rz = originZ + wz * effectiveScale;
        if (idx === 0) ctx.moveTo(rx, rz); else ctx.lineTo(rx, rz);
      });
      ctx.closePath();
      ctx.stroke();
      ctx.setLineDash([]);

      // Central Crossroads Citadel Moat & Plaza
      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = Math.max(2, 4 * effectiveScale * 0.5);
      ctx.beginPath();
      ctx.arc(originX, originZ, 20 * effectiveScale, 0, Math.PI * 2);
      ctx.stroke();

      // 4 Moat Bridges
      ctx.fillStyle = '#cbd5e1';
      ctx.fillRect(originX - 3 * effectiveScale, originZ - 23 * effectiveScale, 6 * effectiveScale, 6 * effectiveScale);
      ctx.fillRect(originX - 3 * effectiveScale, originZ + 17 * effectiveScale, 6 * effectiveScale, 6 * effectiveScale);
      ctx.fillRect(originX + 17 * effectiveScale, originZ - 3 * effectiveScale, 6 * effectiveScale, 6 * effectiveScale);
      ctx.fillRect(originX - 23 * effectiveScale, originZ - 3 * effectiveScale, 6 * effectiveScale, 6 * effectiveScale);

      // Central Citadel Hub
      ctx.fillStyle = '#475569';
      ctx.beginPath();
      ctx.arc(originX, originZ, 16 * effectiveScale, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#facc15';
      ctx.beginPath();
      ctx.arc(originX, originZ, 4 * effectiveScale, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore(); // restore island clipping

      // Live Soaring Dragons
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

      // Landmark Pins with Category Filter & Collision-Free Display
      const majorHubTags = [
        'CITADEL', 'TAJ MAHAL', 'GREAT WALL', 'TOKYO', 'NEO YORK',
        'LONDON', 'EIFFEL', 'MEXICO CITY', 'GIZA', 'DUBAI', 'HOLLYWOOD', 'McQUEEN'
      ];

      for (const lm of PORTFOLIO_DATA.landmarks) {
        const cat = getLandmarkCategory(lm.tag);
        if (activeFilter !== 'all' && activeFilter !== cat) {
          continue;
        }

        const lx = originX + lm.coords[0] * effectiveScale;
        const lz = originZ + lm.coords[2] * effectiveScale;
        const col = getPinColor(lm.tag);
        const isHovered = hoveredLm && hoveredLm.name === lm.name;

        // Glowing outer halo
        ctx.fillStyle = col + (isHovered ? '88' : '33');
        ctx.beginPath();
        ctx.arc(lx, lz, isHovered ? 12 : 7, 0, Math.PI * 2);
        ctx.fill();

        // Pin diamond
        ctx.fillStyle = col;
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = isHovered ? 2 : 1.2;
        ctx.beginPath();
        const pinSize = isHovered ? 7 : 5;
        ctx.moveTo(lx, lz - pinSize);
        ctx.lineTo(lx + pinSize, lz);
        ctx.lineTo(lx, lz + pinSize);
        ctx.lineTo(lx - pinSize, lz);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Major realm hubs display an elegant badge if not hovering another landmark
        const isMajorHub = majorHubTags.some(t => lm.tag.includes(t));
        if (isMajorHub && userZoom >= 0.85 && !isHovered) {
          ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
          ctx.font = 'bold 9px monospace';
          const txt = lm.tag.replace(/[\[\]]/g, '');
          const tw = ctx.measureText(txt).width;
          ctx.fillRect(lx - tw / 2 - 3, lz + 8, tw + 6, 13);
          ctx.strokeStyle = col;
          ctx.lineWidth = 1;
          ctx.strokeRect(lx - tw / 2 - 2, lz + 8, tw + 4, 11);
          ctx.fillStyle = col;
          ctx.fillText(txt, lx - tw / 2, lz + 17);
        }
      }

      // Live Player Indicator
      const px = playerPos?.x || 0;
      const pz = playerPos?.z || 0;
      const pScreenX = originX + px * effectiveScale;
      const pScreenZ = originZ + pz * effectiveScale;
      const yaw = playerYaw || 0;

      // Pulsing beacon ring
      const time = performance.now() * 0.003;
      const pulseR = 12 + Math.sin(time) * 4;
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(pScreenX, pScreenZ, pulseR, 0, Math.PI * 2);
      ctx.stroke();

      // Directional Vision FOV cone
      ctx.save();
      ctx.translate(pScreenX, pScreenZ);
      ctx.rotate(-yaw);

      ctx.fillStyle = 'rgba(56, 189, 248, 0.24)';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, 36 * Math.min(1.5, userZoom), -Math.PI / 2 - 0.45, -Math.PI / 2 + 0.45);
      ctx.closePath();
      ctx.fill();

      // Rotating Player Arrow
      ctx.fillStyle = '#ef4444';
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, -12);
      ctx.lineTo(7.5, 9);
      ctx.lineTo(0, 4.5);
      ctx.lineTo(-7.5, 9);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.restore();

      // Player Label
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(pScreenX - 38, pScreenZ - 26, 76, 14);
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 1;
      ctx.strokeRect(pScreenX - 38, pScreenZ - 26, 76, 14);
      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 8px monospace';
      ctx.fillText('YOU [LAKSHYA]', pScreenX - 34, pScreenZ - 16);

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

      // World Border Perimeter Frame
      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = 2.5;
      ctx.strokeRect(mapX, mapY, mapW, mapH);

      // Compass Rose
      const compX = 46;
      const compY = height - 46;
      ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
      ctx.beginPath();
      ctx.arc(compX, compY, 26, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = '#facc15';
      ctx.font = 'bold 9px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('N', compX, compY - 14);
      ctx.fillStyle = '#94a3b8';
      ctx.fillText('S', compX, compY + 20);
      ctx.fillText('W', compX - 16, compY + 3);
      ctx.fillText('E', compX + 16, compY + 3);
      ctx.textAlign = 'left';

      // Scale indicator
      ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
      ctx.fillRect(width - 150, height - 32, 140, 22);
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1;
      ctx.strokeRect(width - 150, height - 32, 140, 22);
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 8px monospace';
      const scaleBarLen = Math.round(50 * effectiveScale);
      ctx.fillRect(width - 142, height - 16, Math.min(124, scaleBarLen), 3);
      ctx.fillText(`SCALE: 50 BLOCKS`, width - 142, height - 21);
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

    window.addEventListener('mouseup', () => {
      isPointerDown = false;
    });

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
}
