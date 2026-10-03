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

    const landmarksChipsHtml = PORTFOLIO_DATA.landmarks.map((lm, idx) => `
      <button class="mc-btn mc-map-chip-btn" data-index="${idx}" title="${lm.desc}">
        <span class="chip-tag">${lm.tag}</span>
        <span class="chip-name">${lm.name}</span>
      </button>
    `).join('');

    this.modalContainer.innerHTML = `
      <div class="mc-dialog mc-max-map-dialog">
        <div class="mc-dialog-header">
          <div>
            <h2 class="mc-dialog-title">MINECRAFT REALM ATLAS [MAXIMISED MAP]</h2>
            <span class="mc-dialog-subtitle">Live GPS & Real-time Radar • Click anywhere on the map to Fast-Travel Teleport</span>
          </div>
          <button class="mc-close-btn" id="mc-modal-close">X</button>
        </div>

        <div class="mc-map-top-status-bar">
          <div class="mc-map-gps-pill">
            <span class="gps-label">PLAYER GPS:</span>
            <span class="gps-val" id="map-live-coords">X: ${curX}, Z: ${curZ}</span>
          </div>
          <div class="mc-map-cursor-pill">
            <span class="cursor-label">TARGET:</span>
            <span class="cursor-val" id="map-cursor-coords">Hover over map to Inspect • Click to Teleport</span>
          </div>
        </div>

        <div class="mc-max-map-canvas-container">
          <canvas id="max-realm-canvas" width="860" height="460"></canvas>
        </div>

        <div class="mc-map-chips-container">
          <span class="chips-heading">QUICK WARP:</span>
          <div class="mc-map-chips-scroll">
            ${landmarksChipsHtml}
          </div>
        </div>

        <div class="mc-dialog-footer">
          <button class="mc-btn mc-btn-stone" id="mc-modal-done">Close Map (ESC / M)</button>
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

    const width = canvas.width;
    const height = canvas.height;
    const cx = width / 2;
    const cy = height / 2;
    const scale = 1.55;
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

      // 2. Side Information Panels
      // Left Panel: Biome Legend
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(10, 10, 180, height - 20);
      ctx.strokeStyle = '#334155';
      ctx.strokeRect(10, 10, 180, height - 20);

      ctx.font = 'bold 11px monospace';
      ctx.fillStyle = '#facc15';
      ctx.fillText('[REALM BIOMES]', 22, 34);

      const biomes = [
        { name: 'North: Frostpeaks', color: '#e0f2fe', desc: 'Taj Mahal & Glaciers' },
        { name: 'Central: Corona Castle', color: '#4ade80', desc: 'Moat & Palace' },
        { name: 'South: Sunset Coast', color: '#38bdf8', desc: 'Ocean & Merlion' },
        { name: 'East: Emerald Valley', color: '#22c55e', desc: 'River & Lak Tower' },
        { name: 'West: The End Caldera', color: '#c084fc', desc: 'Volcano & Spires' }
      ];

      biomes.forEach((b, i) => {
        const by = 55 + i * 42;
        ctx.fillStyle = b.color;
        ctx.fillRect(22, by, 10, 10);
        ctx.fillStyle = '#f8fafc';
        ctx.font = 'bold 9px monospace';
        ctx.fillText(b.name, 38, by + 9);
        ctx.fillStyle = '#94a3b8';
        ctx.font = '8px monospace';
        ctx.fillText(b.desc, 38, by + 22);
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

      PORTFOLIO_DATA.landmarks.slice(0, 9).forEach((lm, i) => {
        const ly = 55 + i * 40;
        const dist = Math.round(Math.hypot(lm.coords[0] - px, lm.coords[2] - pz));
        ctx.fillStyle = '#38bdf8';
        ctx.font = 'bold 9px monospace';
        ctx.fillText(lm.tag, width - 178, ly);
        ctx.fillStyle = '#94a3b8';
        ctx.font = '8px monospace';
        ctx.fillText(`${lm.name} • ${dist}m`, width - 178, ly + 14);
      });

      // 3. Central Map Viewport (Clipped to World Bounds)
      const mapX = cx - mapHalfW;
      const mapY = cy - mapHalfH;
      const mapW = mapHalfW * 2;
      const mapH = mapHalfH * 2;

      ctx.save();
      ctx.beginPath();
      ctx.rect(mapX, mapY, mapW, mapH);
      ctx.clip();

      // Base Grass Floor (Central Realm)
      ctx.fillStyle = '#3f7324';
      ctx.fillRect(mapX, mapY, mapW, mapH);

      // Biome 1: North Frostpeak Glaciers (Z < -75)
      const northSplitY = cy - 75 * scale;
      ctx.fillStyle = '#dbeafe';
      ctx.fillRect(mapX, mapY, mapW, northSplitY - mapY);
      // North Mountain Peak Shading
      ctx.fillStyle = '#f1f5f9';
      ctx.beginPath();
      ctx.moveTo(cx - 60 * scale, northSplitY);
      ctx.lineTo(cx, cy - 130 * scale);
      ctx.lineTo(cx + 60 * scale, northSplitY);
      ctx.closePath();
      ctx.fill();

      // Biome 2: South Sunset Coast & Ocean (Z > 75)
      const southSandY = cy + 75 * scale;
      const southOceanY = cy + 88 * scale;
      // Sandy Beach
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(mapX, southSandY, mapW, southOceanY - southSandY);
      // Ocean Waters
      ctx.fillStyle = '#0284c7';
      ctx.fillRect(mapX, southOceanY, mapW, mapY + mapH - southOceanY);

      // Biome 3: East Emerald Valley (X > 75)
      const eastSplitX = cx + 75 * scale;
      ctx.fillStyle = '#166534';
      ctx.fillRect(eastSplitX, cy - 55 * scale, mapX + mapW - eastSplitX, 110 * scale);
      // Winding River
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.moveTo(cx + 70 * scale, cy);
      ctx.bezierCurveTo(cx + 90 * scale, cy - 20 * scale, cx + 110 * scale, cy + 20 * scale, cx + 135 * scale, cy);
      ctx.stroke();

      // Biome 4: West The End & Volcano Caldera (X < -75)
      const westSplitX = cx - 75 * scale;
      ctx.fillStyle = '#475569';
      ctx.fillRect(mapX, cy - 65 * scale, westSplitX - mapX, 130 * scale);
      // Volcano Cone & Lava
      const volX = cx - 105 * scale;
      const volY = cy - 25 * scale;
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.arc(volX, volY, 22 * scale, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ea580c';
      ctx.beginPath();
      ctx.arc(volX, volY, 7 * scale, 0, Math.PI * 2);
      ctx.fill();
      // Lava spillways
      ctx.strokeStyle = '#ea580c';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(volX, volY);
      ctx.lineTo(volX + 18 * scale, volY);
      ctx.stroke();

      // Central Moat & Bridges
      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = 6 * scale;
      ctx.beginPath();
      ctx.arc(cx, cy, 19 * scale, 0, Math.PI * 2);
      ctx.stroke();

      // Moat Bridges
      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(cx - 3 * scale, cy - 22 * scale, 6 * scale, 7 * scale);
      ctx.fillRect(cx - 3 * scale, cy + 15 * scale, 6 * scale, 7 * scale);
      ctx.fillRect(cx + 15 * scale, cy - 3 * scale, 7 * scale, 6 * scale);
      ctx.fillRect(cx - 22 * scale, cy - 3 * scale, 7 * scale, 6 * scale);

      // Central Castle Foundation
      ctx.fillStyle = '#64748b';
      ctx.fillRect(cx - 10 * scale, cy - 10 * scale, 20 * scale, 20 * scale);
      ctx.fillStyle = '#facc15';
      ctx.fillRect(cx - 3 * scale, cy - 3 * scale, 6 * scale, 6 * scale);

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
        else if (lm.tag.includes('VOLCANO')) col = '#f97316';
        else if (lm.tag.includes('MERLION')) col = '#06b6d4';
        else if (lm.tag.includes('TOWER')) col = '#facc15';
        else if (lm.tag.includes('PROJECTS')) col = '#a855f7';
        else if (lm.tag.includes('EXPERIENCE')) col = '#3b82f6';
        else if (lm.tag.includes('SKILLS')) col = '#22c55e';
        else if (lm.tag.includes('RESUME')) col = '#eab308';

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
      ctx.fillText('REALM BORDER (±136)', mapX + 6, mapY + 12);
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
          this.onTeleportRequest([wx, 2, wz]);
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
