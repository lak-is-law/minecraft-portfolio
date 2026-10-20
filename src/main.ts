import { ClimateEffects } from './world/climate';
import { CelestialSky } from './world/celestial';
import { CloudManager } from './world/clouds';
import * as THREE from 'three';
import { TextureManager } from './engine/textures';
import { PerformanceGovernor } from './engine/governor';
import { VoxelWorld } from './world/world';
import { Player, TargetInfo } from './engine/player';
import { HUDManager } from './ui/hud';
import { ModalManager } from './ui/modals';
import { PORTFOLIO_DATA, Project } from './data/portfolioData';
import { sound } from './engine/audio';
import { npcChatManager } from './engine/npcChat';
import { InteractionManager } from './engine/interactions';
import { InstallPromptManager } from './ui/installPrompt';

class Game {
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private textureManager: TextureManager;
  private world: VoxelWorld;
  private player: Player;
  private hud: HUDManager;
  private modals: ModalManager;
  private climate: ClimateEffects;
  private celestial: CelestialSky;

  // Lighting & Day/Night
  private ambientLight: THREE.AmbientLight;
  private sunLight: THREE.DirectionalLight;
  private dayNightAngle: number = 0.8; // begin in the morning
  private isNightMode: boolean = false;
  private timeTransitionTarget: number | null = null;
  private readonly dayCycleKeys = [
    { angle: 0, sky: new THREE.Color(0xf2a078), ambient: 0.48, sun: 0.72 }, // dawn
    { angle: 0.5, sky: new THREE.Color(0xb5d4ff), ambient: 0.7, sun: 1.1 }, // early morning
    { angle: 1.0, sky: new THREE.Color(0x83b3ff), ambient: 0.84, sun: 1.45 }, // morning
    { angle: Math.PI / 2, sky: new THREE.Color(0x78b7ff), ambient: 0.95, sun: 1.6 }, // noon
    { angle: 2.1, sky: new THREE.Color(0xa3a8d8), ambient: 0.82, sun: 1.25 }, // afternoon
    { angle: 2.65, sky: new THREE.Color(0xf18457), ambient: 0.62, sun: 0.9 }, // evening
    { angle: Math.PI, sky: new THREE.Color(0x634a70), ambient: 0.4, sun: 0.48 }, // dusk
    { angle: 3.85, sky: new THREE.Color(0x222b47), ambient: 0.28, sun: 0.12 }, // night
    { angle: Math.PI * 1.5, sky: new THREE.Color(0x090d16), ambient: 0.22, sun: 0.06 }, // midnight
    { angle: 5.45, sky: new THREE.Color(0x171e32), ambient: 0.26, sun: 0.1 }, // late night
  ];
  private readonly currentSkyColor = new THREE.Color();

  // Procedural 3D Minecraft Cumulus Clouds
  private clouds: CloudManager;

  // Performance tracking & Autonomous Governor
  private governor: PerformanceGovernor;
  private lastTime: number = performance.now();
  private frameCount: number = 0;
  private fps: number = 60;
  private lastFpsUpdate: number = performance.now();
  private interactions: InteractionManager;

  constructor() {
    const canvas = document.getElementById('canvas3d') as HTMLCanvasElement;

    // 1. Renderer setup
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: false
    });
    this.renderer.setSize(window.visualViewport?.width ?? window.innerWidth, window.visualViewport?.height ?? window.innerHeight);
    this.governor = new PerformanceGovernor(this.renderer, { canvas });
    this.renderer.shadowMap.enabled = false;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;

    // 2. Scene & Fog (tuned for expansive realm and vast Arabian Gulf horizon)
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x78a7ff); // Minecraft blue sky
    this.scene.fog = new THREE.FogExp2(0x78a7ff, 0.0035);

    // 3. Camera (near 0.15 maximizes depth precision & eliminates distant Z-fighting, far 600 renders distant island landmarks)
    this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.15, 600);

    // 4. Managers
    this.textureManager = new TextureManager();
    this.world = new VoxelWorld(this.scene, this.textureManager);
    this.world.init();

    this.player = new Player(this.camera, this.world, canvas);
    this.player.onBeforeScreenshot = () => {
      this.renderer.render(this.scene, this.camera);
    };
    this.scene.add(this.camera);

    this.hud = new HUDManager();
    this.modals = new ModalManager();
    this.interactions = new InteractionManager({
      player: this.player,
      world: this.world,
      hud: this.hud,
      modals: this.modals
    });

    // 4.5. Initialize NPC Chat system (Proximity greetings & periodic world lore)
    npcChatManager.init((sender, text) => {
      this.hud.pushChatMessage(sender, text);
    });

    // 5. Sky, Celestial Bodies (Sun, Moon, Stars) & Clouds
    this.celestial = new CelestialSky(this.scene);

    // Lighting
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    this.scene.add(this.ambientLight);

    this.sunLight = new THREE.DirectionalLight(0xfffbeb, 1.4);
    this.sunLight.castShadow = false;
    this.scene.add(this.sunLight);

    this.clouds = new CloudManager(this.scene);
    this.climate = new ClimateEffects(this.scene, this.sunLight, this.ambientLight);
    this.climate.onChange = (weather, season) => {
      this.hud.updateClimateStatus(weather, season);
      this.hud.pushChatMessage('World', `${season[0].toUpperCase()}${season.slice(1)} · ${weather.replace('-', ' ')}`);
    };
    this.hud.updateClimateStatus(this.climate.weather, this.climate.season);
    this.bindEvents();
    this.updateDayNight(0);

    // Start Loop
    this.animate();
  }

  private bindEvents() {
    new InstallPromptManager(this.player.isTouchDevice);
    const resize = () => {
      const width = window.visualViewport?.width ?? window.innerWidth;
      const height = window.visualViewport?.height ?? window.innerHeight;
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
      this.governor.onResize();
    };
    window.addEventListener('resize', resize);
    window.visualViewport?.addEventListener('resize', resize);
    window.addEventListener('orientationchange', () => window.setTimeout(resize, 150));

    // Player interact callback
    this.player.onInteract = (target: TargetInfo) => {
      this.interactions.handleInteraction(target);
    };

    this.player.onFlyStateChange = (isFlying: boolean) => {
      this.hud.updateFlyStatus(isFlying);
    };

    // Hammer project banner callback
    this.player.onHammerBanner = (project: Project) => {
      this.hud.pushChatMessage('[HAMMER]', `Smashed ${project.title} banner! Launching ${project.liveUrl}...`);
      if (project.liveUrl) {
        this.hud.showLiveRedirectToast(project.title, project.liveUrl);
      }
    };

    // Hotbar block selection
    this.hud.onBlockSelected = (blockType: string) => {
      this.player.selectedBlockType = blockType;
    };

    // Hotbar & HUD action callbacks
    this.hud.onCycleWeather = () => this.climate.cycleWeather();
    this.hud.onCycleSeason = () => this.climate.cycleSeason();

    this.hud.onDayNightToggle = () => {
      this.isNightMode = !this.isNightMode;
      this.timeTransitionTarget = this.isNightMode ? Math.PI * 1.5 : Math.PI / 2;
      this.hud.updateTimeStatus(this.isNightMode);
      this.hud.pushChatMessage('System', `Transitioning to ${this.isNightMode ? 'midnight' : 'noon'}...`);
    };

    // Keyboard shortcuts [T] for day/night, [O] to toggle clouds
    window.addEventListener('keydown', (e) => {
      if (e.code === 'KeyT' && !this.modals.isOpen) {
        this.hud.onDayNightToggle?.();
      }
      if (e.code === 'KeyO' && !this.modals.isOpen) {
        const visible = this.clouds.toggle();
        this.hud.pushChatMessage('Clouds', `Clouds ${visible ? 'Enabled (Volumetric 3D Cumulus)' : 'Disabled'}`);
      }
    });

    this.hud.onOpenProjects = () => {
      this.modals.openProjectModal(PORTFOLIO_DATA.projects[0]);
    };

    this.hud.onOpenSkills = () => {
      this.modals.openSkillsModal();
    };

    this.hud.onOpenFastTravel = () => {
      this.modals.openFastTravelModal(this.player.position, this.player.yaw, this.world.dragonManager?.getDragons(), this.world.liveTrains);
    };

    this.modals.getPlayerInfo = () => ({
      position: this.player.position,
      yaw: this.player.yaw,
      dragons: this.world.dragonManager?.getDragons(),
      trains: this.world.liveTrains
    });

    this.player.onWorldNotice = (msg: string) => {
      this.hud.pushChatMessage('World', msg);
    };

    this.hud.onOpenResume = () => {
      this.modals.openResumeChestModal();
    };

    const openBlockPalette = () => {
      this.modals.openBlockPaletteModal(this.player.selectedBlockType, (blockType) => {
        this.player.selectedBlockType = blockType;
        this.hud.pushChatMessage('Hotbar', `Equipped ${blockType.toUpperCase()} block!`);
      });
    };
    this.hud.onOpenBlockPalette = openBlockPalette;
    this.player.onOpenBlockPalette = openBlockPalette;
    this.modals.onOpenBlockPaletteRequest = openBlockPalette;

    this.hud.onTakeScreenshot = () => {
      this.player.takeScreenshot();
    };

    this.player.onHotbarSelect = (deltaOrSlot: number) => {
      if (deltaOrSlot >= 0 && deltaOrSlot <= 8) {
        this.hud.selectSlot(deltaOrSlot);
      } else {
        this.hud.cycleSlot(deltaOrSlot);
      }
    };

    // Fast travel warp handler
    this.modals.onTeleportRequest = (coords: [number, number, number]) => {
      this.player.teleport(coords[0], coords[1] + 1.8, coords[2]);
      this.hud.pushChatMessage('Warp', `Teleported to [X: ${coords[0]}, Z: ${coords[2]}]!`);
    };

    // Quick fly toggle button
    document.getElementById('btn-quick-fly')?.addEventListener('click', () => {
      this.player.toggleFlight();
    });

    // Perspective & Sit Callbacks
    this.hud.onTogglePerspective = () => {
      this.player.cycleCameraMode();
      const modes = ['First-Person (1P)', 'Third-Person Back (3P)', 'Third-Person Front (3P)'];
      this.hud.pushChatMessage('Camera', `Perspective: ${modes[this.player.cameraMode]}`);
    };

    this.hud.onToggleSit = () => {
      this.player.toggleSit();
      this.hud.pushChatMessage('Emote', this.player.isSitting ? 'Sitting down and resting.' : 'Standing up.');
    };

    // Revamped Pause Menu Direct Actions
    document.getElementById('menu-btn-projects')?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.modals.openProjectModal(PORTFOLIO_DATA.projects[0]);
    });

    document.getElementById('menu-btn-map')?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.modals.openFastTravelModal(this.player.position, this.player.yaw, this.world.dragonManager?.getDragons(), this.world.liveTrains);
    });

    document.getElementById('menu-btn-resume')?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.modals.openResumeChestModal();
    });

    document.getElementById('menu-btn-skills')?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.modals.openSkillsModal();
    });

    // Controls drawer toggle
    const toggleBtn = document.getElementById('btn-toggle-controls');
    const controlsGrid = document.getElementById('mc-controls-grid');
    toggleBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!controlsGrid) return;
      const isHidden = controlsGrid.style.display === 'none';
      controlsGrid.style.display = isHidden ? 'grid' : 'none';
      if (toggleBtn) {
        toggleBtn.textContent = isHidden ? 'HIDE' : 'SHOW';
      }
      sound.playClick();
    });

    // Dynamic rotating Minecraft splash text
    const splashes = [
      'Now in 3D WebGL!',
      'Built with Three.js & TypeScript!',
      'Full-Stack Craftsman!',
      'Don\'t dig straight down!',
      '100% Organic Pixels!',
      'Smash banners with left-click!',
      'Double-tap Space to fly!',
      'Explore the cardinal biomes!',
      'Hire me!',
      'Dragons included!',
      'Press M for World Map!',
      'Try night mode with [T]!',
      'Witness the Northern Lights!',
      'Thunder & lightning storms!'
    ];
    const splashEl = document.getElementById('mc-splash-text');
    if (splashEl) {
      splashEl.textContent = splashes[Math.floor(Math.random() * splashes.length)];
    }

    if ('serviceWorker' in navigator && import.meta.env.PROD) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch((error) => console.warn('Offline app support could not be enabled:', error));
      });
    }

    // Virtual Touch Controls for Mobile & Touchscreen Devices
    const setUpTouchBtn = (id: string, onDown: () => void, onUp: () => void) => {
      const el = document.getElementById(id);
      if (!el) return;
      const handleDown = (e: PointerEvent) => {
        e.preventDefault();
        e.stopPropagation();
        try { el.setPointerCapture(e.pointerId); } catch { /* pointer may already be released */ }
        onDown();
      };
      const handleUp = (e: PointerEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onUp();
        if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
      };
      el.addEventListener('pointerdown', handleDown);
      el.addEventListener('pointerup', handleUp);
      el.addEventListener('pointercancel', handleUp);
      el.addEventListener('lostpointercapture', handleUp);
    };

    setUpTouchBtn('btn-touch-up',
      () => { this.player.touchMove.forward = true; },
      () => { this.player.touchMove.forward = false; }
    );
    setUpTouchBtn('btn-touch-down',
      () => { this.player.touchMove.backward = true; },
      () => { this.player.touchMove.backward = false; }
    );
    setUpTouchBtn('btn-touch-left',
      () => { this.player.touchMove.left = true; },
      () => { this.player.touchMove.left = false; }
    );
    setUpTouchBtn('btn-touch-right',
      () => { this.player.touchMove.right = true; },
      () => { this.player.touchMove.right = false; }
    );

    // Sneak Toggle Button
    const sneakBtn = document.getElementById('btn-touch-sneak');
    sneakBtn?.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.player.touchMove.sneak = !this.player.touchMove.sneak;
      sneakBtn.classList.toggle('mc-active', this.player.touchMove.sneak);
      sound.playClick();
    });

    // Jump Button (tap or hold to ascend while flying)
    setUpTouchBtn('btn-touch-jump',
      () => {
        this.player.touchMove.jump = true;
        this.player.handleTouchJump();
      },
      () => {
        this.player.touchMove.jump = false;
      }
    );

    // Mine Button (tap or hold to continuously mine)
    const mineBtn = document.getElementById('btn-touch-mine');
    let mineTimer: any = null;
    const startMining = (e: PointerEvent) => {
      e.preventDefault();
      e.stopPropagation();
      try { mineBtn?.setPointerCapture(e.pointerId); } catch { /* pointer may already be released */ }
      this.player.handleTouchMine();
      if (!mineTimer) {
        mineTimer = setInterval(() => {
          this.player.handleTouchMine();
        }, 300);
      }
    };
    const stopMining = (e: PointerEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (mineTimer) {
        clearInterval(mineTimer);
        mineTimer = null;
      }
      if (mineBtn?.hasPointerCapture(e.pointerId)) mineBtn.releasePointerCapture(e.pointerId);
    };
    mineBtn?.addEventListener('pointerdown', startMining);
    mineBtn?.addEventListener('pointerup', stopMining);
    mineBtn?.addEventListener('pointercancel', stopMining);
    mineBtn?.addEventListener('lostpointercapture', stopMining);

    // Place Button
    const placeBtn = document.getElementById('btn-touch-place');
    placeBtn?.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.player.handleTouchPlace();
    });

    // Use / Interact Button
    const useBtn = document.getElementById('btn-touch-use');
    useBtn?.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.player.handleTouchUse();
    });

    // Fly Toggle Button
    const flyBtn = document.getElementById('btn-touch-fly');
    flyBtn?.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.player.handleTouchFly();
      this.hud.updateFlyStatus(this.player.isFlying);
    });

    // Reset lastTime on pointer lock changes to prevent dt lag jump
    document.addEventListener('pointerlockchange', () => {
      this.lastTime = performance.now();
    });
  }

  private updateDayNight(dt: number, gloom: number = 1.0) {
    if (this.timeTransitionTarget !== null) {
      const delta = Math.atan2(
        Math.sin(this.timeTransitionTarget - this.dayNightAngle),
        Math.cos(this.timeTransitionTarget - this.dayNightAngle)
      );
      const step = dt * 0.75;
      if (Math.abs(delta) <= step) {
        this.dayNightAngle = this.timeTransitionTarget;
        this.timeTransitionTarget = null;
      } else {
        this.dayNightAngle += Math.sign(delta) * step;
      }
    } else if (!this.isNightMode) {
      this.dayNightAngle = (this.dayNightAngle + dt * 0.03) % (Math.PI * 2);
    }

    const dist = 60;
    const sx = Math.cos(this.dayNightAngle) * dist;
    const sy = Math.sin(this.dayNightAngle) * dist;

    // Direct sun lighting direction
    this.sunLight.position.set(sx, sy, 0);

    // Update Celestial system (Sun, Moon, Halos, Twinkling Starfield)
    this.celestial.update(dt, this.camera.position, this.dayNightAngle, gloom);

    const cycle = Math.PI * 2;
    const angle = ((this.dayNightAngle % cycle) + cycle) % cycle;
    let nextIndex = this.dayCycleKeys.findIndex((key) => key.angle > angle);
    if (nextIndex < 0) nextIndex = 0;
    const prevIndex = (nextIndex - 1 + this.dayCycleKeys.length) % this.dayCycleKeys.length;
    const prev = this.dayCycleKeys[prevIndex];
    const next = this.dayCycleKeys[nextIndex];
    const prevAngle = prev.angle;
    const nextAngle = nextIndex < prevIndex ? next.angle + cycle : next.angle;
    const segment = Math.max(0.0001, nextAngle - prevAngle);
    const t = THREE.MathUtils.clamp((angle < prevAngle ? angle + cycle : angle - prevAngle) / segment, 0, 1);
    const eased = t * t * (3 - 2 * t);

    this.currentSkyColor.copy(prev.sky).lerp(next.sky, eased);
    if (this.scene.background instanceof THREE.Color) {
      this.scene.background.copy(this.currentSkyColor);
    } else {
      this.scene.background = this.currentSkyColor.clone();
    }
    if (this.scene.fog) {
      this.scene.fog.color.copy(this.currentSkyColor);
      if (this.scene.fog instanceof THREE.FogExp2) {
        // Base ground fog density tuned for atmospheric depth at horizon
        const baseDensity = gloom < 0.6 ? 0.0042 : 0.0035;
        // As player ascends into flight (Y from 8 to 75), smoothly relax fog density
        // so the landscape below remains crisp and vibrant instead of a murky soup
        const playerY = this.player?.position.y ?? 2;
        const flightRatio = THREE.MathUtils.clamp((playerY - 8) / 60, 0, 1);
        const targetDensity = THREE.MathUtils.lerp(baseDensity, baseDensity * 0.48, flightRatio);
        this.scene.fog.density = targetDensity;
      }
    }
    this.ambientLight.intensity = THREE.MathUtils.lerp(prev.ambient, next.ambient, eased);
    this.sunLight.intensity = THREE.MathUtils.lerp(prev.sun, next.sun, eased);
  }

  private animate = () => {
    requestAnimationFrame(this.animate);
    this.governor.tick();

    const now = performance.now();
    const dt = Math.min((now - this.lastTime) / 1000, 0.1);
    this.lastTime = now;

    // FPS calculation
    this.frameCount++;
    if (now - this.lastFpsUpdate >= 500) {
      this.fps = Math.round((this.frameCount * 1000) / (now - this.lastFpsUpdate));
      this.frameCount = 0;
      this.lastFpsUpdate = now;
    }

    // 1. Update Player (ONLY when unpaused and actively playing)
    const isDrivingOrRacing = !!(this.player.ridingVehicle || this.world.mcQueenManager?.raceState?.active);
    const pauseOverlay = document.getElementById('pause-overlay');
    if (isDrivingOrRacing && pauseOverlay && pauseOverlay.style.display === 'flex') {
      pauseOverlay.style.display = 'none';
    }
    const isPauseMenuOpen = pauseOverlay && pauseOverlay.style.display === 'flex' && !isDrivingOrRacing;
    const isPaused = !isDrivingOrRacing && (((!this.player.isLocked && !this.player.isMobileActive) || this.modals.isOpen || isPauseMenuOpen));
    if (!isPaused) {
      this.player.update(dt);
    }

    // If fullscreen map modal is open, update map coords and skip background 3D scene rendering
    const mapInstance = this.modals.getMapInstance();
    if (mapInstance) {
      mapInstance.setPlayer(this.player.position.x, this.player.position.z, this.player.yaw);
      return;
    }

    // 2. Update World effects (spinning gems, portal particles, NPC)
    this.world.update(now * 0.001, this.player.position);

    // 2.5. Update NPC Chat Manager (proximity greetings & periodic ambient world chat)
    if (!isPaused) {
      npcChatManager.update(now * 0.001, this.player.position);
    }

    // 3. Procedural 3D Cumulus Clouds: seamless toroidal drift & atmospheric lighting
    this.clouds.update(
      dt,
      this.player.position,
      this.dayNightAngle,
      this.climate.weather,
      this.climate.lightningFlash
    );

    // 4. Update Day/Night and Climate
    const gloom = this.climate.weather === 'thunderstorm' ? 0.32 : this.climate.weather === 'rain' ? 0.58 : 1.0;
    this.updateDayNight(dt, gloom);
    const isNight = this.isNightMode || Math.sin(this.dayNightAngle) < -0.05;
    this.climate.update(dt, this.player.position, this.player.yaw, isNight);

    // 5. Update HUD elements
    const suppressInteractions = !!(this.player.ridingVehicle || this.world.mcQueenManager?.raceState?.active);
    this.hud.updatePrompt(suppressInteractions ? null : this.player.currentTarget);
    this.hud.updateF3(this.player.position, this.player.yaw, this.player.pitch, this.fps);
    this.hud.updateMinimap(this.player.position, this.player.yaw, this.world.dragonManager?.getDragons(), this.world.liveTrains);
    this.hud.updateFlyStatus(this.player.isFlying);

    // Update Racing HUD for Lightning McQueen & Doc Hudson Challenge
    const isDrivingMcQueen = this.player.ridingVehicle === 'lightning_mcqueen';
    document.body.classList.toggle('driving-vehicle', !!this.player.ridingVehicle);
    document.body.classList.toggle('racing-active', !!this.world.mcQueenManager?.raceState?.active);
    const isShift = !!this.player.keys['ShiftLeft'] || !!this.player.keys['ShiftRight'];
    const isSpace = !!this.player.keys['Space'];
    this.hud.updateRacingHUD(
      isDrivingMcQueen,
      this.player.mcQueenSpeed,
      isShift,
      isSpace,
      this.world.mcQueenManager?.raceState
    );

    // 6. Render
    this.renderer.render(this.scene, this.camera);
  };
}

// Print recruiter & developer greeting in DevTools
console.log(
  `%c⛏️ LAKSHYA'S 3D MINECRAFT PORTFOLIO %c\n` +
  `%cWelcome Explorer & Recruiter! Inspecting the engine?\n` +
  `• Architecture: TypeScript, Three.js, WebGL, Voxel DDA Raycasting\n` +
  `• Projects & Repos: https://github.com/lak-is-law\n` +
  `• Direct Contact: contact@lakshya.uk | https://linkedin.com/in/lakshya-success\n`,
  'background: #ca8a04; color: #000; font-weight: bold; font-size: 14px; padding: 4px 8px; border-radius: 4px;',
  '',
  'color: #38bdf8; font-size: 12px; line-height: 1.6;'
);

// Start game when DOM is loaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  new Game();
} else {
  window.addEventListener('DOMContentLoaded', () => {
    new Game();
  });
}
