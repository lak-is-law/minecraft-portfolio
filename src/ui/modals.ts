import { PORTFOLIO_DATA, Project, Experience } from '../data/portfolioData';
import { sound } from '../engine/audio';
import { ASSETS } from './assets';

export class ModalManager {
  private modalContainer: HTMLElement;
  public isOpen: boolean = false;
  public onTeleportRequest?: (coords: [number, number, number]) => void;
  public getPlayerInfo?: () => { position: { x: number; y: number; z: number }; yaw: number; dragons?: any[] };

  constructor() {
    this.modalContainer = document.getElementById('modal-container')!;
    this.setupListeners();
  }

  private setupListeners() {
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Escape' || e.code === 'KeyE') {
        if (this.isOpen) {
          this.close();
          e.stopPropagation();
        }
      }
      if (e.code === 'KeyM' && !this.isOpen) {
        const info = this.getPlayerInfo?.();
        this.openFastTravelModal(info?.position, info?.yaw, info?.dragons);
      }
    });
  }

  public close() {
    this.isOpen = false;
    this.modalContainer.innerHTML = '';
    this.modalContainer.style.display = 'none';
    sound.playClick();

    const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (window.matchMedia && window.matchMedia('(pointer: coarse)').matches);
    const pauseOverlay = document.getElementById('pause-overlay');
    if (pauseOverlay && document.pointerLockElement === null && !isTouch) {
      pauseOverlay.style.display = 'flex';
    }
  }

  private onModalOpen() {
    this.isOpen = true;
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
          <div class="mc-slot" title="Golden Apple: CGPA 4.37 / 5.0 (SRMIST Chennai)">
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
            <p>Software Engineer & Designer (SRMIST Chennai, CGPA: 4.37 / 5.0)</p>
          </div>
          <div class="mc-chest-btn-row">
            <a href="/Lakshya.Resume.pdf" download="Lakshya_Resume.pdf" class="mc-btn mc-btn-green" id="mc-download-resume">
              [DOWNLOAD] Software Resume (PDF)
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
    dragons?: { position: { x: number; y: number; z: number }; config: { name: string; eyeColor: number; bodyColor: number } }[]
  ) {
    this.onModalOpen();

    const curX = Math.round(playerPos?.x || 0);
    const curZ = Math.round(playerPos?.z || 0);

    const atlasRegions = [
      { number: '01', name: 'Crossroads Citadel', subtitle: 'The central hub', detail: 'Start at the island’s heart, meet your guide, and follow the beacon roads out to every realm.', index: 0, tone: 'citadel', direction: 'CENTER · X 0 / Z 0' },
      { number: '02', name: 'Frostpeak Range', subtitle: 'Snow, ice & altitude', detail: 'Climb the alpine ridges to the overlook and suspension bridge above the clouds.', index: 8, tone: 'frost', direction: 'NORTH · Z −95' },
      { number: '03', name: 'Sakura Sanctuary', subtitle: 'Pagoda & quiet gardens', detail: 'Walk beneath the cherry canopy, pass the torii gates, and visit the language embassy.', index: 4, tone: 'sakura', direction: 'NORTHWEST · X −68' },
      { number: '04', name: 'Imperial Raj', subtitle: 'Marble & reflection', detail: 'Explore the Taj Mahal, its reflecting pool, and the SRMIST honors courtyard.', index: 3, tone: 'raj', direction: 'NORTHEAST · X 55' },
      { number: '05', name: 'Neo York', subtitle: 'Glass towers & AI labs', detail: 'Find the Times Square avenue, research labs, and the Lak Tower skyline marker.', index: 1, tone: 'neoyork', direction: 'EAST · X 80' },
      { number: '06', name: 'Pueblo Royale', subtitle: 'Adobe village & arena', detail: 'Visit the terracotta village square, central well, and builder’s arena.', index: 5, tone: 'pueblo', direction: 'WEST · X −75' },
      { number: '07', name: 'Sunset Coast', subtitle: 'Saloon, palms & pier', detail: 'Follow the boardwalk south to the beach bar, palm grove, and Merlion.', index: 6, tone: 'coast', direction: 'SOUTH · Z 58' },
      { number: '08', name: 'Civic Quarter', subtitle: 'Care & public service', detail: 'Find the hospital and police station serving the eastern neighborhoods.', index: 11, tone: 'citadel', direction: 'EAST · X 49' },
      { number: '09', name: 'Learning Commons', subtitle: 'School & community', detail: 'Visit the neighborhood school, built around a warm timber courtyard.', index: 12, tone: 'pueblo', direction: 'NORTHWEST · X 46' },
      { number: '10', name: 'Wildlife Park', subtitle: 'Habitats & nature trails', detail: 'Explore the zoo’s green paths, animal paddocks, and pond.', index: 13, tone: 'coast', direction: 'WEST · X −39' },
      { number: '11', name: 'Rapunzel’s Keep', subtitle: 'A fairy-tale skyline', detail: 'Look for the high tower, golden braid, and clustered castle turrets.', index: 14, tone: 'raj', direction: 'SOUTHWEST · X −46' },
      { number: '12', name: 'Mexico City', subtitle: 'Zócalo & cathedral', detail: 'Gather in the plaza, visit the twin-spired cathedral, and browse market stalls.', index: 15, tone: 'pueblo', direction: 'WEST · X −90' },
      { number: '13', name: 'Eiffel Tower', subtitle: 'Paris by night', detail: 'See the illuminated iron landmark rising above the northern gardens.', index: 16, tone: 'frost', direction: 'NORTH · X 49' },
      { number: '14', name: 'Central Station', subtitle: 'Platforms & live trains', detail: 'Watch the trains roll through the covered station and onward to the airport.', index: 17, tone: 'neoyork', direction: 'EAST · X 60' },
      { number: '15', name: 'Skyport', subtitle: 'Terminal & runway', detail: 'Follow the runway to the terminal and control tower at the edge of town.', index: 9, tone: 'frost', direction: 'SOUTHEAST · Z 62' },
    ];
    const regionsHtml = atlasRegions.map((region) => `
      <article class="atlas-region-card atlas-${region.tone}">
        <div class="atlas-card-topline"><span>${region.number} / REALM</span><span class="atlas-region-dot"></span></div>
        <h3>${region.name}</h3>
        <p class="atlas-region-subtitle">${region.subtitle}</p>
        <p class="atlas-region-detail">${region.detail}</p>
        <div class="atlas-card-bottom"><span>${region.direction}</span><button class="atlas-region-warp mc-map-chip-btn" data-index="${region.index}" aria-label="Travel to ${region.name}">GO <span aria-hidden="true">↗</span></button></div>
      </article>
    `).join('');
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
            <span class="mc-dialog-subtitle">Fifteen neighborhoods and landmarks, connected by one central crossroads.</span>
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
            <span class="gps-label">YOUR POSITION</span>
            <span class="gps-val" id="map-live-coords">X: ${curX}, Z: ${curZ}</span>
          </div>
          <div class="mc-map-cursor-pill">
            <span class="cursor-label">MAP TARGET</span>
            <span class="cursor-val" id="map-cursor-coords">Select a point · click to travel</span>
          </div>
        </div>

        <div class="mc-max-map-canvas-container">
          <canvas id="max-realm-canvas" width="960" height="600"></canvas>
        </div>

        <div class="atlas-map-caption"><span><i class="atlas-key-dot atlas-key-player"></i> YOU ARE HERE</span><span><i class="atlas-key-dot atlas-key-place"></i> WAYPOINT</span><span><i class="atlas-key-line"></i> MAIN ROUTE</span><span class="atlas-caption-hint">Click the map to travel anywhere</span></div>
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
    this.initMaximizedMapCanvas(playerPos, playerYaw, dragons);
  }

  private initMaximizedMapCanvas(
    playerPos?: { x: number; y: number; z: number },
    playerYaw?: number,
    dragons?: { position: { x: number; y: number; z: number }; config: { name: string; eyeColor: number; bodyColor: number } }[]
  ) {
    const canvas = document.getElementById('max-realm-canvas') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const compact = window.innerWidth < 740;
    const width = compact ? 600 : canvas.width;
    const height = 600;
    canvas.width = width;
    canvas.height = height;
    const cx = width / 2;
    const cy = height / 2;
    const scale = 1.84;
    const worldLimit = 136;
    const mapHalfW = worldLimit * scale;
    const mapHalfH = worldLimit * scale;

    let hoverWorldX: number | null = null;
    let hoverWorldZ: number | null = null;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Canvas outer background
      ctx.fillStyle = '#080c14';
      ctx.fillRect(0, 0, width, height);

      // 2. Side Information Panels (the small-screen map gets the full canvas)
      if (!compact) {
      // Left Panel: Biome Legend
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(10, 10, 180, height - 20);
      ctx.strokeStyle = '#334155';
      ctx.strokeRect(10, 10, 180, height - 20);

      ctx.font = 'bold 11px monospace';
      ctx.fillStyle = '#facc15';
      ctx.fillText('[REALM BIOMES]', 22, 34);

      const biomes = [
        { name: 'North: Frostpeaks', color: '#e0f2fe', desc: 'Snow Peaks & Overlook' },
        { name: 'NW: Sakura Pagoda', color: '#f472b6', desc: 'Cherry Blossom & Zen' },
        { name: 'NE: Imperial Raj', color: '#fef08a', desc: 'Taj Mahal & Honors' },
        { name: 'Center: Citadel Hub', color: '#94a3b8', desc: 'Compass Rose & Moat' },
        { name: 'East: Neo York', color: '#38bdf8', desc: 'Times Sq & Lak Tower' },
        { name: 'West: Pueblo Royale', color: '#fb923c', desc: 'Adobe Village & Arena' },
        { name: 'South: Sunset & Beach', color: '#fbbf24', desc: 'Saloon, Pier & Merlion' }
      ];

      biomes.forEach((b, i) => {
        const by = 48 + i * 38;
        ctx.fillStyle = b.color;
        ctx.fillRect(22, by, 10, 10);
        ctx.fillStyle = '#f8fafc';
        ctx.font = 'bold 9px monospace';
        ctx.fillText(b.name, 38, by + 9);
        ctx.fillStyle = '#94a3b8';
        ctx.font = '8px monospace';
        ctx.fillText(b.desc, 38, by + 20);
      });

      // Compass Rose
      const compY = height - 70;
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.arc(100, compY, 32, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#38bdf8';
      ctx.stroke();

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 10px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('N', 100, compY - 20);
      ctx.fillText('S', 100, compY + 28);
      ctx.fillText('W', 74, compY + 4);
      ctx.fillText('E', 126, compY + 4);
      ctx.textAlign = 'left';

      // Right Panel: Active Radar & Distance Tracker
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(width - 190, 10, 180, height - 20);
      ctx.strokeStyle = '#334155';
      ctx.strokeRect(width - 190, 10, 180, height - 20);

      ctx.font = 'bold 11px monospace';
      ctx.fillStyle = '#facc15';
      ctx.fillText('[LANDMARKS RADAR]', width - 178, 34);

      const px = playerPos?.x || 0;
      const pz = playerPos?.z || 0;

      [...PORTFOLIO_DATA.landmarks]
        .map(lm => ({ lm, dist: Math.round(Math.hypot(lm.coords[0] - px, lm.coords[2] - pz)) }))
        .sort((a, b) => a.dist - b.dist)
        .slice(0, 9)
        .forEach(({ lm, dist }, i) => {
        const ly = 55 + i * 40;
        ctx.fillStyle = '#38bdf8';
        ctx.font = 'bold 9px monospace';
        ctx.fillText(lm.tag, width - 178, ly);
        ctx.fillStyle = '#94a3b8';
        ctx.font = '8px monospace';
        ctx.fillText(`${lm.name} • ${dist}m`, width - 178, ly + 14);
      });
      }

      // 3. Central Map Viewport (Clipped to World Bounds)
      const mapX = cx - mapHalfW;
      const mapY = cy - mapHalfH;
      const mapW = mapHalfW * 2;
      const mapH = mapHalfH * 2;

      ctx.save();
      ctx.beginPath();
      ctx.rect(mapX, mapY, mapW, mapH);
      ctx.clip();

      // Base Open Ocean (Outer Waters)
      ctx.fillStyle = '#0284c7';
      ctx.fillRect(mapX, mapY, mapW, mapH);

      // Island Landmass Coastline (Organic Circle)
      ctx.save();
      ctx.beginPath();
      const numPts = 64;
      for (let i = 0; i <= numPts; i++) {
        const th = (i / numPts) * Math.PI * 2;
        const r = (112 + Math.sin(th * 5) * 5 + Math.cos(th * 3) * 4) * scale;
        const px = cx + Math.cos(th) * r;
        const py = cy + Math.sin(th) * r;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      // Outer golden beach ring
      ctx.fillStyle = '#fde047';
      ctx.fill();
      ctx.clip(); // clip subsequent biome drawing inside island

      // Inner Island Plains
      ctx.fillStyle = '#22c55e';
      ctx.beginPath();
      for (let i = 0; i <= numPts; i++) {
        const th = (i / numPts) * Math.PI * 2;
        const r = (104 + Math.sin(th * 5) * 4 + Math.cos(th * 3) * 3) * scale;
        const px = cx + Math.cos(th) * r;
        const py = cy + Math.sin(th) * r;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();

      // Biomes follow the same coordinate boundaries as the terrain builder.
      const mapRect = (x1: number, z1: number, x2: number, z2: number, color: string) => {
        ctx.fillStyle = color;
        ctx.fillRect(cx + x1 * scale, cy + z1 * scale, (x2 - x1) * scale, (z2 - z1) * scale);
      };
      mapRect(-136, 55, 136, 136, '#c7ad72'); // Sunset Coast
      mapRect(-136, 8, -35, 75, '#b56e48'); // Pueblo
      mapRect(45, -35, 136, 45, '#4d7172'); // Neo York
      mapRect(25, -136, 136, -55, '#c2ae78'); // Imperial Raj
      mapRect(-136, -136, -25, -45, '#9d718a'); // Sakura
      mapRect(-35, -136, 35, -65, '#b5c4c0'); // Frostpeaks, highest priority

      // Ridge lines and a reflecting pool give the regions a little topography.
      ctx.strokeStyle = 'rgba(255,255,255,.34)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(cx - 25 * scale, cy - 78 * scale);
      ctx.lineTo(cx - 12 * scale, cy - 101 * scale);
      ctx.lineTo(cx - 2 * scale, cy - 88 * scale);
      ctx.lineTo(cx + 13 * scale, cy - 119 * scale);
      ctx.lineTo(cx + 29 * scale, cy - 82 * scale);
      ctx.stroke();
      ctx.fillStyle = 'rgba(83,165,182,.75)';
      ctx.fillRect(cx + 50 * scale, cy - 86 * scale, 10 * scale, 19 * scale);

      // Main routes are narrow, warm paths that remain legible at every scale.
      const route = (points: [number, number][]) => {
        ctx.beginPath();
        points.forEach(([x, z], i) => {
          const px = cx + x * scale;
          const pz = cy + z * scale;
          if (i === 0) ctx.moveTo(px, pz); else ctx.lineTo(px, pz);
        });
        ctx.stroke();
      };
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = 'rgba(27,37,31,.62)';
      ctx.lineWidth = 5;
      route([[0, -22], [0, -65], [0, -91]]);
      route([[20, 0], [80, 0], [101, 0]]);
      route([[-20, 0], [-31, 18], [-50, 35], [-70, 35]]);
      route([[5, -51], [20, -64], [42, -85], [55, -95]]);
      route([[-5, -51], [-22, -58], [-47, -75], [-68, -88]]);
      route([[0, 22], [0, 58], [0, 92], [6, 110]]);
      ctx.strokeStyle = '#e6d5a5';
      ctx.lineWidth = 2.2;
      route([[0, -22], [0, -65], [0, -91]]);
      route([[20, 0], [80, 0], [101, 0]]);
      route([[-20, 0], [-31, 18], [-50, 35], [-70, 35]]);
      route([[5, -51], [20, -64], [42, -85], [55, -95]]);
      route([[-5, -51], [-22, -58], [-47, -75], [-68, -88]]);
      route([[0, 22], [0, 58], [0, 92], [6, 110]]);

      // Small settlement marks help distinguish the built-up districts.
      const block = (x: number, z: number, color: string, size = 5) => {
        ctx.fillStyle = 'rgba(19,28,23,.55)';
        ctx.fillRect(cx + x * scale - size / 2 + 1, cy + z * scale - size / 2 + 2, size, size);
        ctx.fillStyle = color;
        ctx.fillRect(cx + x * scale - size / 2, cy + z * scale - size / 2, size, size);
      };
      [[63,-2],[69,8],[73,-12],[87,12],[91,-12],[96,5]].forEach(([x,z]) => block(x,z,'#8ebfc0',6));
      [[-82,-80],[-60,-95],[-72,-105]].forEach(([x,z]) => block(x,z,'#dfa9c3',6));
      [[-85,29],[-68,16],[-79,49]].forEach(([x,z]) => block(x,z,'#e1ad7e',6));
      [[39,-76],[70,-76]].forEach(([x,z]) => block(x,z,'#e9dfc6',5));

      // Central Crossroads Citadel Moat & Plaza
      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = 5 * scale;
      ctx.beginPath();
      ctx.arc(cx, cy, 20 * scale, 0, Math.PI * 2);
      ctx.stroke();

      // 4 Moat Bridges
      ctx.fillStyle = '#cbd5e1';
      ctx.fillRect(cx - 3 * scale, cy - 23 * scale, 6 * scale, 6 * scale);
      ctx.fillRect(cx - 3 * scale, cy + 17 * scale, 6 * scale, 6 * scale);
      ctx.fillRect(cx + 17 * scale, cy - 3 * scale, 6 * scale, 6 * scale);
      ctx.fillRect(cx - 23 * scale, cy - 3 * scale, 6 * scale, 6 * scale);

      // Central Citadel Hub
      ctx.fillStyle = '#475569';
      ctx.beginPath();
      ctx.arc(cx, cy, 16 * scale, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#facc15';
      ctx.beginPath();
      ctx.arc(cx, cy, 4 * scale, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore(); // restore clipping

      // Coordinate Grid Lines (every 50 blocks)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      for (let wCoord = -100; wCoord <= 100; wCoord += 50) {
        const gx = cx + wCoord * scale;
        const gz = cy + wCoord * scale;
        ctx.beginPath();
        ctx.moveTo(gx, mapY); ctx.lineTo(gx, mapY + mapH);
        ctx.moveTo(mapX, gz); ctx.lineTo(mapX + mapW, gz);
        ctx.stroke();
      }

      // 4. Landmarks Icons and Badges
      for (const lm of PORTFOLIO_DATA.landmarks) {
        const lx = cx + lm.coords[0] * scale;
        const lz = cy + lm.coords[2] * scale;

        let col = '#facc15';
        if (lm.tag.includes('TAJ')) col = '#ffffff';
        else if (lm.tag.includes('SAKURA')) col = '#f472b6';
        else if (lm.tag.includes('PUEBLO')) col = '#fb923c';
        else if (lm.tag.includes('NEO')) col = '#38bdf8';
        else if (lm.tag.includes('TOWER')) col = '#facc15';
        else if (lm.tag.includes('FROSTPEAK')) col = '#e0f2fe';
        else if (lm.tag.includes('SALOON')) col = '#a16207';
        else if (lm.tag.includes('BEACH')) col = '#06b6d4';
        else if (lm.tag.includes('CITADEL')) col = '#4ade80';
        else if (lm.tag.includes('AIRPORT')) col = '#38bdf8';
        else if (lm.tag.includes('POLICE')) col = '#60a5fa';
        else if (lm.tag.includes('HOSPITAL')) col = '#fb7185';
        else if (lm.tag.includes('SCHOOL')) col = '#fbbf24';
        else if (lm.tag.includes('ZOO')) col = '#4ade80';
        else if (lm.tag.includes('CASTLE')) col = '#c084fc';
        else if (lm.tag.includes('MEXICO')) col = '#34d399';
        else if (lm.tag.includes('EIFFEL')) col = '#f9a8d4';
        else if (lm.tag.includes('RAILWAY')) col = '#f97316';

        // Glowing outer halo
        ctx.fillStyle = col + '44';
        ctx.beginPath();
        ctx.arc(lx, lz, 8, 0, Math.PI * 2);
        ctx.fill();

        // Pin diamond
        ctx.fillStyle = col;
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(lx, lz - 5);
        ctx.lineTo(lx + 5, lz);
        ctx.lineTo(lx, lz + 5);
        ctx.lineTo(lx - 5, lz);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Tag label
        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 8px monospace';
        const txt = lm.tag.replace(/[\[\]]/g, '');
        const tw = ctx.measureText(txt).width;
        ctx.fillRect(lx - tw / 2 - 2, lz + 7, tw + 4, 11);
        ctx.strokeStyle = col;
        ctx.lineWidth = 1;
        ctx.strokeRect(lx - tw / 2 - 2, lz + 7, tw + 4, 11);
        ctx.fillStyle = col;
        ctx.fillText(txt, lx - tw / 2, lz + 15);
      }

      // 5. Active Live Dragons
      if (dragons) {
        for (const d of dragons) {
          const dx = cx + d.position.x * scale;
          const dz = cy + d.position.z * scale;
          ctx.fillStyle = '#' + d.config.eyeColor.toString(16).padStart(6, '0');
          ctx.beginPath();
          ctx.moveTo(dx, dz - 6);
          ctx.lineTo(dx + 6, dz);
          ctx.lineTo(dx, dz + 6);
          ctx.lineTo(dx - 6, dz);
          ctx.closePath();
          ctx.fill();
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // 6. Live Player Indicator
      const pScreenX = cx + (playerPos?.x || 0) * scale;
      const pScreenZ = cy + (playerPos?.z || 0) * scale;
      const yaw = playerYaw || 0;

      // Pulsing beacon ring
      const time = performance.now() * 0.003;
      const pulseR = 10 + Math.sin(time) * 3;
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(pScreenX, pScreenZ, pulseR, 0, Math.PI * 2);
      ctx.stroke();

      // Rotating Player Arrow
      ctx.save();
      ctx.translate(pScreenX, pScreenZ);
      ctx.rotate(-yaw);

      ctx.fillStyle = '#ef4444';
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, -11);
      ctx.lineTo(7, 8);
      ctx.lineTo(0, 4);
      ctx.lineTo(-7, 8);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      // Player Label
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(pScreenX - 35, pScreenZ - 24, 70, 13);
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 1;
      ctx.strokeRect(pScreenX - 35, pScreenZ - 24, 70, 13);
      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 8px monospace';
      ctx.fillText('YOU [LAKSHYA]', pScreenX - 31, pScreenZ - 15);

      // 7. Hover Cursor Crosshair
      if (hoverWorldX !== null && hoverWorldZ !== null) {
        const hx = cx + hoverWorldX * scale;
        const hz = cy + hoverWorldZ * scale;

        ctx.strokeStyle = '#facc15';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(hx, mapY); ctx.lineTo(hx, mapY + mapH);
        ctx.moveTo(mapX, hz); ctx.lineTo(mapX + mapW, hz);
        ctx.stroke();
        ctx.setLineDash([]);

        // Target reticle ring
        ctx.strokeStyle = '#facc15';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(hx, hz, 6, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.restore(); // restore clipping

      // World Border Perimeter Frame
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.strokeRect(mapX, mapY, mapW, mapH);

      // World Limit Labels
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 8px monospace';
      ctx.fillText('PORTFOLIO ISLAND  ·  NORTH ↑', mapX + 8, mapY + 15);
    };

    draw();

    // Mousemove for live hover coordinates
    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      const mx = (e.clientX - rect.left) * (canvas.width / rect.width);
      const my = (e.clientY - rect.top) * (canvas.height / rect.height);

      const wx = Math.round((mx - cx) / scale);
      const wz = Math.round((my - cy) / scale);

      if (Math.abs(wx) <= worldLimit && Math.abs(wz) <= worldLimit) {
        hoverWorldX = wx;
        hoverWorldZ = wz;
        canvas.style.cursor = 'crosshair';

        const statusEl = document.getElementById('map-cursor-coords');
        if (statusEl) {
          statusEl.textContent = `[X: ${wx}, Z: ${wz}] - Click to Teleport Here!`;
        }
      } else {
        hoverWorldX = null;
        hoverWorldZ = null;
        canvas.style.cursor = 'default';
      }
      draw();
    });

    canvas.addEventListener('mouseleave', () => {
      hoverWorldX = null;
      hoverWorldZ = null;
      draw();
    });

    // Click to Teleport!
    canvas.addEventListener('click', (e) => {
      const rect = canvas.getBoundingClientRect();
      const mx = (e.clientX - rect.left) * (canvas.width / rect.width);
      const my = (e.clientY - rect.top) * (canvas.height / rect.height);

      const wx = Math.round((mx - cx) / scale);
      const wz = Math.round((my - cy) / scale);

      if (Math.abs(wx) <= worldLimit && Math.abs(wz) <= worldLimit) {
        if (this.onTeleportRequest) {
          sound.playLevelUp();
          let targetY = 2;
          if (wz <= -75 && Math.abs(wx) <= 35) targetY = 18;
          else if (wz <= -80 && wx >= 35 && wx <= 75) targetY = 4;
          this.onTeleportRequest([wx, targetY, wz]);
          this.close();
        }
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
