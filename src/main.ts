import { ClimateEffects } from './world/climate';
import * as THREE from 'three';
import { TextureManager } from './engine/textures';
import { VoxelWorld } from './world/world';
import { Player, TargetInfo } from './engine/player';
import { HUDManager } from './ui/hud';
import { ModalManager } from './ui/modals';
import { PORTFOLIO_DATA, Project } from './data/portfolioData';
import { sound } from './engine/audio';
type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
};

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

  // Lighting & Day/Night
  private ambientLight: THREE.AmbientLight;
  private sunLight: THREE.DirectionalLight;
  private sunMesh: THREE.Mesh;
  private moonMesh: THREE.Mesh;
  private skyGroup: THREE.Group;
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

  // Blocky Clouds
  private cloudsMesh: THREE.InstancedMesh | null = null;
  private cloudDummy = new THREE.Object3D();

  // Performance tracking
  private lastTime: number = performance.now();
  private frameCount: number = 0;
  private fps: number = 60;
  private lastFpsUpdate: number = performance.now();
  private deferredInstallPrompt: InstallPromptEvent | null = null;

  constructor() {
    const canvas = document.getElementById('canvas3d') as HTMLCanvasElement;

    // 1. Renderer setup
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: true
    });
    this.renderer.setSize(window.visualViewport?.width ?? window.innerWidth, window.visualViewport?.height ?? window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.BasicShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;

    // 2. Scene & Fog
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x78a7ff); // Minecraft blue sky
    this.scene.fog = new THREE.FogExp2(0x78a7ff, 0.016);

    // 3. Camera (near 0.05 prevents face clipping, far 200 renders distant landmarks)
    this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.05, 200);

    // 4. Managers
    this.textureManager = new TextureManager();
    this.world = new VoxelWorld(this.scene, this.textureManager);
    this.world.init();

    this.player = new Player(this.camera, this.world, canvas);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, this.player.isTouchDevice ? 1.5 : 2));
    this.scene.add(this.camera);

    this.hud = new HUDManager();
    this.modals = new ModalManager();

    // 5. Sky, Sun, Moon & Clouds
    this.skyGroup = new THREE.Group();
    this.scene.add(this.skyGroup);

    // Sun & Moon
    const sunMat = new THREE.MeshBasicMaterial({ color: 0xfff4cc });
    this.sunMesh = new THREE.Mesh(new THREE.BoxGeometry(6, 6, 0.2), sunMat);
    this.skyGroup.add(this.sunMesh);

    const moonMat = new THREE.MeshBasicMaterial({ color: 0xe0e7ff });
    this.moonMesh = new THREE.Mesh(new THREE.BoxGeometry(5, 5, 0.2), moonMat);
    this.skyGroup.add(this.moonMesh);

    // Lighting
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    this.scene.add(this.ambientLight);

    this.sunLight = new THREE.DirectionalLight(0xfffbeb, 1.4);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.width = 1024;
    this.sunLight.shadow.mapSize.height = 1024;
    this.sunLight.shadow.camera.near = 0.5;
    this.sunLight.shadow.camera.far = 80;
    const d = 35;
    this.sunLight.shadow.camera.left = -d;
    this.sunLight.shadow.camera.right = d;
    this.sunLight.shadow.camera.top = d;
    this.sunLight.shadow.camera.bottom = -d;
    this.scene.add(this.sunLight);

    this.createMinecraftClouds();
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

  // Create iconic blocky floating Minecraft clouds at Y = 28
  private createMinecraftClouds() {
    const cloudCount = 140;
    const cloudGeo = new THREE.BoxGeometry(10, 2, 8);
    const cloudMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.75
    });

    this.cloudsMesh = new THREE.InstancedMesh(cloudGeo, cloudMat, cloudCount);

    let idx = 0;
    for (let x = -80; x <= 80; x += 14) {
      for (let z = -80; z <= 80; z += 14) {
        if (Math.sin(x * 0.3) * Math.cos(z * 0.3) > -0.2 && idx < cloudCount) {
          this.cloudDummy.position.set(x + (Math.random() - 0.5) * 4, 28, z + (Math.random() - 0.5) * 4);
          this.cloudDummy.updateMatrix();
          this.cloudsMesh.setMatrixAt(idx, this.cloudDummy.matrix);
          idx++;
        }
      }
    }
    this.cloudsMesh.count = idx;
    this.cloudsMesh.instanceMatrix.needsUpdate = true;
    this.scene.add(this.cloudsMesh);
  }

  private bindEvents() {
    this.setupInstallPrompt();
    const resize = () => {
      const width = window.visualViewport?.width ?? window.innerWidth;
      const height = window.visualViewport?.height ?? window.innerHeight;
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, this.player.isTouchDevice ? 1.5 : 2));
    };
    window.addEventListener('resize', resize);
    window.visualViewport?.addEventListener('resize', resize);
    window.addEventListener('orientationchange', () => window.setTimeout(resize, 150));

    // Player interact callback
    this.player.onInteract = (target: TargetInfo) => {
      this.handleInteraction(target);
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
      this.hud.pushChatMessage('System', `Transitioning to ${this.isNightMode ? 'midnight' : 'noon'}...`);
    };

    this.hud.onOpenProjects = () => {
      this.modals.openProjectModal(PORTFOLIO_DATA.projects[0]);
    };

    this.hud.onOpenSkills = () => {
      this.modals.openSkillsModal();
    };

    this.hud.onOpenFastTravel = () => {
      this.modals.openFastTravelModal(this.player.position, this.player.yaw, this.world.dragonManager?.getDragons());
    };

    this.modals.getPlayerInfo = () => ({
      position: this.player.position,
      yaw: this.player.yaw,
      dragons: this.world.dragonManager?.getDragons()
    });

    this.player.onWorldNotice = (msg: string) => {
      this.hud.pushChatMessage('World', msg);
    };

    this.hud.onOpenResume = () => {
      this.modals.openResumeChestModal();
    };

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
      this.modals.openFastTravelModal(this.player.position, this.player.yaw, this.world.dragonManager?.getDragons());
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
      'Try night mode with [T]!'
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

  private setupInstallPrompt() {
    const prompt = document.getElementById('install-prompt');
    const installButton = document.getElementById('install-app-button');
    const continueButton = document.getElementById('continue-web-button');
    const description = document.getElementById('install-description');
    const help = document.getElementById('install-help');
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
      (navigator as Navigator & { standalone?: boolean }).standalone === true;
    let dismissed = false;
    try { dismissed = localStorage.getItem('install-prompt-dismissed') === 'true'; } catch { /* storage may be disabled */ }
    if (!prompt || !this.player.isTouchDevice || isStandalone || dismissed) return;

    const isAppleMobile = /iPhone|iPad|iPod/.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    if (isAppleMobile && description) {
      description.textContent = 'Install it for a full-screen app experience. In Safari, tap Share, then “Add to Home Screen”.';
    }
    prompt.hidden = false;
    installButton?.focus({ preventScroll: true });

    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault();
      this.deferredInstallPrompt = event as InstallPromptEvent;
    });
    window.addEventListener('appinstalled', () => {
      this.deferredInstallPrompt = null;
      prompt.hidden = true;
      document.getElementById('play-button')?.focus({ preventScroll: true });
    });

    installButton?.addEventListener('click', async () => {
      if (this.deferredInstallPrompt) {
        const installEvent = this.deferredInstallPrompt;
        this.deferredInstallPrompt = null;
        await installEvent.prompt();
        const choice = await installEvent.userChoice;
        if (choice.outcome === 'accepted') {
          prompt.hidden = true;
          document.getElementById('play-button')?.focus({ preventScroll: true });
        }
      } else if (help) {
        help.textContent = isAppleMobile
          ? 'In Safari: tap the Share button, scroll the menu, then choose “Add to Home Screen”.'
          : 'Open your browser menu and choose “Install app” or “Add to Home screen”.';
      }
    });
    continueButton?.addEventListener('click', () => {
      prompt.hidden = true;
      try { localStorage.setItem('install-prompt-dismissed', 'true'); } catch { /* storage may be disabled */ }
      document.getElementById('play-button')?.focus({ preventScroll: true });
    });
  }

  // Handle interaction with objects in world
  private handleInteraction(target: TargetInfo) {
    if (!target.interactable) return;
    const inter = target.interactable;

    if (inter.type === 'project' && inter.id) {
      const proj = PORTFOLIO_DATA.projects.find(p => p.id === inter.id);
      if (proj) {
        this.modals.openProjectModal(proj);
        this.hud.pushChatMessage('Discovery', `Inspecting project: ${proj.title}`);
      }
    } else if (inter.type === 'experience' && inter.id) {
      const exp = PORTFOLIO_DATA.experience.find(e => e.id === inter.id);
      if (exp) {
        this.modals.openExperienceModal(exp);
      }
    } else if (inter.type === 'leadership') {
      this.modals.openLeadershipModal(inter.id);
      this.hud.pushChatMessage('Leadership', 'Entered Leadership Palace records.');
    } else if (inter.type === 'research') {
      this.modals.openResearchModal(inter.id);
      this.hud.pushChatMessage('Research', 'Accessed Research & AI Lab terminals.');
    } else if (inter.type === 'interests') {
      this.modals.openInterestsModal();
      this.hud.pushChatMessage('Interests', 'Entered Interests & Passions Pavilion.');
    } else if (inter.type === 'languages') {
      this.modals.openLanguagesModal();
      this.hud.pushChatMessage('Languages', 'Entered Foreign Languages & Global Communication Embassy.');
    } else if (inter.type === 'minigame') {
      this.modals.openMinigameModal(this.world.minigameBlocksPlaced);
      this.hud.pushChatMessage('Minigame', 'Entered Builder\'s Arena!');
    } else if (inter.type === 'skills') {
      this.modals.openSkillsModal();
      this.hud.pushChatMessage('Alchemy', 'Opened Skills & Proficiencies matrix.');
    } else if (inter.type === 'chest') {
      this.modals.openResumeChestModal();
      this.hud.pushChatMessage('Loot', 'Opened Ancient Resume Chest!');
    } else if (inter.type === 'sign') {
      this.modals.openSignModal(inter.title || 'Notice', inter.text || '');
    } else if (inter.type === 'teleport') {
      this.modals.openFastTravelModal();
    }
  }

  private updateDayNight(dt: number) {
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

    const dist = 55;
    const sx = Math.cos(this.dayNightAngle) * dist;
    const sy = Math.sin(this.dayNightAngle) * dist;

    // Sun position
    this.sunMesh.position.set(sx, sy, 0);
    this.sunMesh.lookAt(0, 0, 0);
    this.sunLight.position.set(sx, sy, 0);

    // Moon on opposite side
    this.moonMesh.position.set(-sx, -sy, 0);
    this.moonMesh.lookAt(0, 0, 0);

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
    if (this.scene.fog) this.scene.fog.color.copy(this.currentSkyColor);
    this.ambientLight.intensity = THREE.MathUtils.lerp(prev.ambient, next.ambient, eased);
    this.sunLight.intensity = THREE.MathUtils.lerp(prev.sun, next.sun, eased);
    this.sunMesh.visible = sy > -4;
    this.moonMesh.visible = sy < 4;
  }

  private animate = () => {
    requestAnimationFrame(this.animate);

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
    const pauseOverlay = document.getElementById('pause-overlay');
    const isPauseMenuOpen = pauseOverlay && pauseOverlay.style.display === 'flex';
    const isPaused = (!this.player.isLocked && !this.player.isMobileActive) || this.modals.isOpen || isPauseMenuOpen;
    if (!isPaused) {
      this.player.update(dt);
    }

    // 2. Update World effects (spinning gems, portal particles, NPC)
    this.world.update(now * 0.001, this.player.position);

    // 3. Drift blocky clouds slowly
    if (this.cloudsMesh) {
      this.cloudsMesh.position.x += dt * 0.8;
      if (this.cloudsMesh.position.x > 80) {
        this.cloudsMesh.position.x = -80;
      }
    }

    // 4. Update Day/Night
    this.updateDayNight(dt);
    this.climate.update(dt, this.player.position, this.player.yaw);

    // 5. Update HUD elements
    this.hud.updatePrompt(this.player.currentTarget);
    this.hud.updateF3(this.player.position, this.player.yaw, this.player.pitch, this.fps);
    this.hud.updateMinimap(this.player.position, this.player.yaw, this.world.dragonManager?.getDragons());
    this.hud.updateFlyStatus(this.player.isFlying);

    // 6. Render
    this.renderer.render(this.scene, this.camera);
  };
}

// Start game when DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
  new Game();
});
