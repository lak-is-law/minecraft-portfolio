import { ClimateEffects } from './world/climate';
import { CelestialSky } from './world/celestial';
import * as THREE from 'three';
import { TextureManager } from './engine/textures';
import { VoxelWorld } from './world/world';
import { Player, TargetInfo } from './engine/player';
import { HUDManager } from './ui/hud';
import { ModalManager, getLakshyaAvatarHtml, getMashuAvatarHtml, getRogerAvatarHtml, getAnimalAvatarHtml, getLightningMcQueenAvatarHtml, getCitizenAvatarHtml } from './ui/modals';
import { PORTFOLIO_DATA, Project } from './data/portfolioData';
import { sound } from './engine/audio';
import { npcChatManager } from './engine/npcChat';
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
      antialias: true,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: false
    });
    this.renderer.setSize(window.visualViewport?.width ?? window.innerWidth, window.visualViewport?.height ?? window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.shadowMap.enabled = false;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;

    // 2. Scene & Fog (tuned for expansive 5x realm)
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x78a7ff); // Minecraft blue sky
    this.scene.fog = new THREE.FogExp2(0x78a7ff, 0.006);

    // 3. Camera (near 0.05 prevents face clipping, far 450 renders distant landmarks across 5x realm)
    this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.05, 450);

    // 4. Managers
    this.textureManager = new TextureManager();
    this.world = new VoxelWorld(this.scene, this.textureManager);
    this.world.init();

    this.player = new Player(this.camera, this.world, canvas);
    this.player.onBeforeScreenshot = () => {
      this.renderer.render(this.scene, this.camera);
    };
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.scene.add(this.camera);

    this.hud = new HUDManager();
    this.modals = new ModalManager();

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

  // Create iconic blocky floating Minecraft clouds at Y = 28 across expanded realm
  private createMinecraftClouds() {
    const cloudCount = 350;
    const cloudGeo = new THREE.BoxGeometry(12, 2, 10);
    const cloudMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.72
    });

    this.cloudsMesh = new THREE.InstancedMesh(cloudGeo, cloudMat, cloudCount);

    let idx = 0;
    for (let x = -200; x <= 200; x += 22) {
      for (let z = -200; z <= 200; z += 22) {
        if (Math.sin(x * 0.15) * Math.cos(z * 0.15) > -0.25 && idx < cloudCount) {
          this.cloudDummy.position.set(x + (Math.random() - 0.5) * 6, 32, z + (Math.random() - 0.5) * 6);
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
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
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
      this.hud.updateTimeStatus(this.isNightMode);
      this.hud.pushChatMessage('System', `Transitioning to ${this.isNightMode ? 'midnight' : 'noon'}...`);
    };

    // Keyboard shortcut [T] to toggle day & night
    window.addEventListener('keydown', (e) => {
      if (e.code === 'KeyT' && !this.modals.isOpen) {
        this.hud.onDayNightToggle?.();
      }
    });

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
      this.hud.pushChatMessage('Alchemy', 'Opened Alchemy Brewing Stand & Potions Guide.');
    } else if (inter.type === 'chest') {
      this.modals.openResumeChestModal();
      this.hud.pushChatMessage('Loot', 'Opened Ancient Dungeon Treasure Chest!');
    } else if (inter.type === 'sign') {
      const title = inter.title || 'Notice';
      const text = inter.text || '';
      if (title.includes('Big Ben') || title.includes('Great Bell') || title.includes('Elizabeth Tower')) {
        sound.playBell();
        this.hud.pushChatMessage('Westminster', '🔔 Big Ben\'s Great Bell chimes resonantly across London!');
      } else if (title.includes('Auto-Rickshaw') || title.includes('Tuk-Tuk')) {
        sound.playAutoHorn();
        this.hud.pushChatMessage('Auto-Rickshaw', '🛺 Pee-peep! Meter down! The Bajaj 3-wheeler darts through the avenue with style!');
      } else if (title.includes('Gopuram') || title.includes('Mandapam') || title.includes('Temple')) {
        sound.playTempleBell();
        this.hud.pushChatMessage('Mandapam', '🔔 Sacred bronze temple bell rings out with peace and auspicious blessings.');
      } else if (title.includes('ISRO') || title.includes('Chandrayaan')) {
        sound.playRocketRumble();
        this.hud.pushChatMessage('ISRO Telemetry', '🚀 Chandrayaan-3 soft touchdown at Shiv Shakti Point! Lunar exploration active.');
      } else if (title.includes('Cricket')) {
        sound.playBlockBreak();
        this.hud.pushChatMessage('Gully Cricket', '🏏 SIXER! Out of the ground and over the rooftops! What a magnificent shot!');
      } else if (title.includes('Chai') || title.includes('Dhaba') || title.includes('Golgappe') || title.includes('Dosa') || title.includes('Sundal')) {
        sound.playSlurp();
        this.hud.pushChatMessage('Street Food', '☕ Kadak ginger-cardamom cutting chai enjoyed! Energy fully restored!');
      } else if (title.includes('Hawa Mahal')) {
        sound.playSitar();
        this.hud.pushChatMessage('Jaipur Royal Court', '🌸 Cool desert winds whisper through Hawa Mahal\'s 953 honeycombed jharokhas.');
      } else if (title.includes('India Gate') || title.includes('Amar Jawan')) {
        sound.playLevelUp();
        this.hud.pushChatMessage('Amar Jawan Jyoti', '🇮🇳 Saluting the eternal flame and the indomitable courage of India\'s guardians.');
      } else if (title.includes('Rangoli') || title.includes('Diwali')) {
        sound.playSitar();
        this.hud.pushChatMessage('Diwali Festival', '🪔 Sparkling diyas and royal Rangoli bring festive light and joy to the realm!');
      } else if (title.includes('Safari') || title.includes('Wildlife') || title.includes('Panda') || title.includes('Lion') || title.includes('Elephant') || title.includes('Giraffe') || title.includes('Penguin') || title.includes('Tiger') || title.includes('Peacock') || title.includes('Zoo')) {
        sound.playLevelUp();
        this.hud.pushChatMessage('Sanctuary', `Observing habitat: ${title}`);
      }
      this.modals.openSignModal(title, text);
    } else if (inter.type === 'teleport') {
      this.modals.openFastTravelModal();
    } else if (inter.type === 'npc') {
      npcChatManager.handleNPCInteract(inter.id || '', inter.title);
      if (inter.id === 'lightning_mcqueen') {
        sound.playKaChow();
        const qPos = this.world.getMcQueenPosition();
        if (qPos) {
          this.world.spawnHammerSparkles(qPos.x, qPos.y + 1.2, qPos.z);
        }
        this.hud.pushChatMessage('Lightning McQueen', '⚡ Ka-Chow! Roaring at Radiator Springs Speedway [X: 130, Y: 2, Z: -18]! "I am speed!"');
        this.modals.openNPCDialogModal({
          id: 'lightning_mcqueen',
          name: 'Lightning McQueen #95',
          title: '7-Time Piston Cup Champion · Rust-eze Racing',
          badge: '[CHAMPION #95]',
          badgeColor: '#dc2626',
          locationBadge: 'Radiator Springs Speedway [X: 130, Z: -18]',
          avatarHtml: getLightningMcQueenAvatarHtml(),
          text: '⚡ "Ka-Chow!" Lightning McQueen flashes his iconic pearlescent grin, revs his 750-horsepower V8 engine, and lets out twin exhaust flame pops!\n\n"Hey racer! Welcome to Lightning McQueen Street & Radiator Springs Raceway [X: 130, Y: 2, Z: -18]! Float like a Cadillac, sting like a Beemer. What are you waiting for? Jump in and let\'s tear up the asphalt!"',
          onOptionSelect: (opt, d) => {
            this.hud.pushChatMessage('You', opt.label);
            if (opt.response) {
              const snippet = opt.response.split('\n')[0].trim();
              this.hud.pushChatMessage(d.name, snippet);
            }
          },
          options: [
            {
              label: '🏎️ Jump in & Drive Lightning McQueen! [E]',
              styleClass: 'mc-btn-gold',
              action: () => {
                this.player.startDrivingMcQueen();
                this.hud.pushChatMessage('Race Control', '⚡ Boarded Lightning McQueen! WASD to race, SHIFT for Nitro Boost, H for Ka-Chow!, SPACE to exit.');
              }
            },
            {
              label: '📍 Where is this raceway located?',
              styleClass: 'mc-btn-stone',
              response: '⚡ "You\'re at Radiator Springs Speedway & Hollywood Boulevard [X: 130, Y: 2, Z: -18]! Just east is Neo York Times Square, to the west is the Spawn Citadel, and north is the Hollywood Sign!"'
            },
            {
              label: '🏁 Hear Racing Wisdom (Doc Hudson)',
              styleClass: 'mc-btn-blue',
              action: () => {
                sound.playRaceCarEngine(1.4);
              },
              response: '"Doc Hudson taught me everything I know out at Willy\'s Butte. When you\'re entering a slide on dirt or pavement, turn right to go left! Give it too much throttle, you lose the rear; balance the slide with counter-steer, and you blast past the pack!"\n\n— The Fabulous Hudson Hornet #51 Racing Academy'
            },
            {
              label: '⚡ Shout "Ka-Chow!" with McQueen',
              styleClass: 'mc-btn-green',
              action: () => {
                sound.playKaChow();
                sound.playLevelUp();
                const pos = this.world.getMcQueenPosition();
                if (pos) this.world.spawnHammerSparkles(pos.x, pos.y + 1.5, pos.z);
                this.hud.pushChatMessage('Lightning McQueen', '⚡ KA-CHOW! Lightning spark fanfare active!');
              },
              response: '⚡ "KA-CHOW!!" Twin sparks burst from McQueen\'s front fenders and high-octane flame pops from his dual side exhausts! Cheering erupts from the spectator grandstands!\n\nPiston Cup Championship Energy at 100%!'
            },
            {
              label: '🛞 Learn about Guido\'s World Record Pit Stop',
              styleClass: 'mc-btn-stone',
              response: '"At the Piston Cup tiebreaker, Chick Hicks\' crew laughed when Luigi and Guido rolled out. Then Guido performed the legendary sub-2.5-second 4-tire change! Luigi yelled \'Peet stop!\' and I rejoined in 1st place! Never underestimate the Radiator Springs crew!"'
            }
          ]
        });
      } else if (inter.id === 'roger') {
        sound.playDogBark();
        if (this.world.dogMesh) {
          this.world.spawnHammerSparkles(this.world.dogMesh.position.x, this.world.dogMesh.position.y + 0.8, this.world.dogMesh.position.z);
        }
        this.hud.pushChatMessage('Roger', '*Woof woof!* Welcome to Spawn Plaza [X: 4.5, Y: 2, Z: 7.3] beside Lakshya! (Wags tail happily)');
        this.modals.openNPCDialogModal({
          id: 'roger',
          name: 'Roger',
          title: 'Loyal Companion · Best Boy 🐾',
          badge: '[GOOD BOY]',
          badgeColor: '#16a34a',
          locationBadge: 'Spawn Plaza [X: 4.5, Z: 7.3]',
          avatarHtml: getRogerAvatarHtml(),
          text: '*Pant pant!* Roger gazes up with bright, warm eyes at Spawn Plaza [X: 4.5, Y: 2.0, Z: 7.3]!\n\nHis golden tail swishes rhythmically across the green grass beside Lakshya! *Woof!* (He gently bumps his wet nose against your hand, waiting for pats)',
          onOptionSelect: (opt, d) => {
            this.hud.pushChatMessage('You', opt.label);
            if (opt.response) {
              const snippet = opt.response.split('\n')[0].trim();
              this.hud.pushChatMessage(d.name, snippet);
            }
          },
          options: [
            {
              label: '🐾 Pet Roger gently',
              styleClass: 'mc-btn-gold',
              action: () => {
                sound.playLevelUp();
                if (this.world.dogMesh) {
                  this.world.spawnHammerSparkles(this.world.dogMesh.position.x, this.world.dogMesh.position.y + 0.8, this.world.dogMesh.position.z);
                }
                this.hud.pushChatMessage('Roger', '*Happy purrs & tail wags* (Roger leans deeply into your palm!)');
              },
              response: '*Woof!* Roger closes his eyes in bliss, leaning his head firmly into your palm while making soft contented puppy murmurs. Roger\'s tail is wagging at supersonic speed!\n\n(+50 Good Boy Affection)'
            },
            {
              label: '🥩 Feed tasty cooked steak',
              styleClass: 'mc-btn-green',
              action: () => {
                sound.playLevelUp();
                sound.playBlockBreak();
                if (this.world.dogMesh) {
                  this.world.spawnHammerSparkles(this.world.dogMesh.position.x, this.world.dogMesh.position.y + 0.8, this.world.dogMesh.position.z);
                }
                this.hud.pushChatMessage('Roger', '*Chomp chomp!* (Roger joyfully devours the steak!)');
              },
              response: '*CHOMP CHOMP!* Roger snatches the Minecraft steak out of your hand and gulps it down in two bites! He does a little happy tap-dance on the grass. Sparkles and hearts burst overhead!\n\nRoger\'s happiness is at 100%!'
            },
            {
              label: '🎾 Play fetch with stick',
              styleClass: 'mc-btn-blue',
              action: () => {
                sound.playDogBark();
                if (this.world.dogMesh) {
                  this.world.spawnHammerSparkles(this.world.dogMesh.position.x, this.world.dogMesh.position.y + 0.8, this.world.dogMesh.position.z);
                }
              },
              response: '*BARK!* You toss an oak twig across the spawn plaza! Roger bolts across the cobble path, snatches it mid-air with an Olympic jump, and trots proudly back to drop it directly on your shoes!\n\n*Woof woof!* (Throw it again!)'
            },
            {
              label: '📍 Roger, where are we located right now?',
              styleClass: 'mc-btn-stone',
              response: '*Woof!* Roger does a happy spin and taps his paw on the grass!\n\n📍 Roger\'s Spot: Crossroads Citadel Spawn Plaza [X: 4.5, Y: 2.0, Z: 7.3]\n\n"We are sitting right beside Lakshya in the center of the world! To the west is the Safari Zoo, to the east is Neo York and Hollywood, and straight ahead is the Emerald Fountain!"'
            },
            {
              label: '🧭 Ask Roger where Lakshya\'s work is',
              styleClass: 'mc-btn-stone',
              response: '*Arf!* Roger sits upright, points his furry snout towards the eastern pillars and the Redstone Nether Portal, then glances back at Lakshya with a wagging tail!\n\nRoger recommends checking the Golden Landmark Pillars or opening the Fast Travel Map [M]!'
            }
          ]
        });
      } else if (inter.id === 'oreo_cat') {
        sound.playLevelUp();
        if (this.world.catMesh) {
          this.world.spawnHammerSparkles(this.world.catMesh.position.x, this.world.catMesh.position.y + 0.6, this.world.catMesh.position.z);
        }
        this.hud.pushChatMessage('Oreo', '*Purrrrr!* Basking at Coastal Boulders [X: 10.5, Y: 1, Z: 82.5] by Palm Paradise Beach!');
        this.modals.openNPCDialogModal({
          id: 'oreo_cat',
          name: 'Oreo',
          title: 'Tuxedo Beach Cat · Coastal Sunbather 🐾',
          badge: '[MEOW]',
          badgeColor: '#18181b',
          locationBadge: 'Coastal Boulders [X: 10.5, Z: 82.5]',
          avatarHtml: getAnimalAvatarHtml('🐱', '#18181b'),
          text: '*Prrrr...* Oreo the black & white tuxedo cat lounges serenely on the warm coastal boulders [X: 10.5, Y: 1.0, Z: 82.5] by Palm Paradise Beach!\n\nShe watches the turquoise ocean waves and twitches her tail contently in the warm sunlight.',
          onOptionSelect: (opt, d) => {
            this.hud.pushChatMessage('You', opt.label);
            if (opt.response) {
              const snippet = opt.response.split('\n')[0].trim();
              this.hud.pushChatMessage(d.name, snippet);
            }
          },
          options: [
            {
              label: '🐟 Feed Fresh Raw Salmon',
              styleClass: 'mc-btn-green',
              action: () => {
                sound.playLevelUp();
                if (this.world.catMesh) {
                  this.world.spawnHammerSparkles(this.world.catMesh.position.x, this.world.catMesh.position.y + 0.6, this.world.catMesh.position.z);
                }
              },
              response: '*Crunch munch!* Oreo devours the fresh fish delicately, licks her whiskers with deep satisfaction, and gives you a soft, raspy head-butt!\n\n(+100 Feline Friendship)'
            },
            {
              label: '📍 Where is this beach spot located?',
              styleClass: 'mc-btn-stone',
              response: '*Mew...* Oreo stretches out her paws gracefully.\n\n📍 Location: Coastal Boulders Beachfront [X: 10.5, Y: 1.0, Z: 82.5]\n\n"You found the sunny ocean rocks southwest of Spawn Citadel! North is the Sunset Saloon, and just along the shore is Palm Paradise Beach and the Grand Ferris Wheel."'
            },
            {
              label: '🐾 Scratch behind ears',
              styleClass: 'mc-btn-gold',
              response: '*Loud motorboat purring!* Oreo stretches out her paws and rolls onto her back in complete sunlit ecstasy.'
            }
          ]
        });
      } else if (inter.id?.startsWith('animal_') || inter.meta?.type === 'animal') {
        const aMeta = inter.meta;
        const aType = aMeta?.animalType || 'animal';
        const aTitle = inter.title || 'Wild Animal';
        const aSpecies = aMeta?.animalSpecies || 'Island Inhabitant';
        const aPos = aMeta?.position || { x: 0, y: 1, z: 0 };
        const posX = Math.round(aPos.x);
        const posY = Math.round(aPos.y);
        const posZ = Math.round(aPos.z);

        sound.playAnimalSound(aType);
        if (aMeta?.position) {
          this.world.spawnHammerSparkles(aMeta.position.x, aMeta.position.y + 1.2, aMeta.position.z);
        }

        const animalInfoMap: Record<string, { emoji: string; treat: string; treatName: string; bg: string; fact: string; habit: string }> = {
          panda: { emoji: '🐼', treat: '🎋', treatName: 'Fresh Bamboo Shoot', bg: '#14532d', habit: 'Giant Panda Bamboo Valley', fact: 'Pandas spend up to 12 hours a day eating bamboo! In this world, they enjoy tumbling downhill into the water canals.' },
          lion: { emoji: '🦁', treat: '🥩', treatName: 'Savanna Steak Cutlet', bg: '#854d0e', habit: 'Serengeti African Lion Kopje', fact: 'Simba perches high on the granite kopje outcrop to survey the savanna territory and watch travelers board the railway.' },
          elephant: { emoji: '🐘', treat: '🌾', treatName: 'Sugar Cane Sheaf', bg: '#334155', habit: 'Gentle Elephant Oasis', fact: 'Elephants have incredible memory and deep social bonds. Tembo and the herd love swimming near the waterfall base.' },
          temple_elephant: { emoji: '🐘', treat: '🪔', treatName: 'Blessed Modak & Fruits', bg: '#78350f', habit: 'Royal Temple Sanctuary', fact: 'Airavata is adorned with royal festival headwear and guards the sacred temple pavilions with peaceful dignity.' },
          giraffe: { emoji: '🦒', treat: '🍃', treatName: 'Acacia Leaf Twig', bg: '#a16207', habit: 'Rothschild Giraffe Canopy Reserve', fact: 'Giraffes can reach acacia trees over 5 meters tall! Their long necks help them spot approaching visitors from miles away.' },
          polar_bear: { emoji: '🐻‍❄️', treat: '🐟', treatName: 'Chilled Raw Salmon', bg: '#0369a1', habit: 'Glacial Iceberg Cove', fact: 'Barnaby and cub Snowdrop enjoy cool northern breezes and diving off the pack ice into deep ocean waters.' },
          penguin: { emoji: '🐧', treat: '🐟', treatName: 'Silver Cod Fish', bg: '#0f766e', habit: 'Antarctic Colony Shelf', fact: 'Emperor penguins slide across the snow on their bellies (tobogganing) to travel faster than walking!' },
          tiger: { emoji: '🐯', treat: '🥩', treatName: 'Forest Prime Rib', bg: '#9a3412', habit: 'Royal Bengal Tiger Sanctuary', fact: 'Shera is the guardian of the eastern forests. Bengal tigers are strong swimmers and often cool off in shaded streams.' },
          peacock: { emoji: '🦚', treat: '🌻', treatName: 'Golden Sunflower Seeds', bg: '#1e3a8a', habit: 'Royal Palace Gardens', fact: 'Mayur displays majestic iridescent plumage during morning mist and sunrise across the palace courtyard.' },
          sheep: { emoji: '🐑', treat: '🌾', treatName: 'Sweet Field Wheat', bg: '#475569', habit: 'Sunflower Countryside Meadows', fact: 'Woolly provides warm wool for voxel tapestries and loves grazing among the sunflowers and poppies.' },
          pig: { emoji: '🐷', treat: '🥕', treatName: 'Crisp Orange Carrot', bg: '#be185d', habit: 'Countryside Barnyard', fact: 'Wilbur has an acute sense of smell and loves snuffling through soft dirt near the farm fences for hidden truffles.' },
          zebra: { emoji: '🦓', treat: '🌱', treatName: 'Fresh Savanna Grass', bg: '#374151', habit: 'Serengeti Open Plains', fact: 'Every zebra has a stripe pattern as unique as human fingerprints! Marty enjoys racing alongside the railway trains.' },
          flamingo: { emoji: '🦩', treat: '🦐', treatName: 'Lagoon Brine Shrimp', bg: '#db2777', habit: 'Tropical Waters Sanctuary', fact: 'Flamingos get their vibrant pink coloration from carotenoids in the aquatic food they filter from the shallow waters.' }
        };

        const info = animalInfoMap[aType] || { emoji: '🐾', treat: '🌾', treatName: 'Wild Grass Treat', bg: '#1e293b', habit: 'Island Sanctuary', fact: 'A friendly creature living in harmony across Lakshya\'s Minecraft portfolio archipelago!' };

        this.hud.pushChatMessage(aTitle, `*Observing ${aTitle} (${aSpecies}) at ${info.habit} [X: ${posX}, Y: ${posY}, Z: ${posZ}]!*`);

        this.modals.openNPCDialogModal({
          id: inter.id || `animal_${aType}`,
          name: aTitle,
          title: `${aSpecies} · ${info.habit}`,
          badge: `[SAFARI]`,
          badgeColor: '#059669',
          locationBadge: `${info.habit} [X: ${posX}, Z: ${posZ}]`,
          avatarHtml: getAnimalAvatarHtml(info.emoji, info.bg),
          text: `You approach ${aTitle}! They tilt their head inquisitively, observing you in the gentle island breeze.\n\n📍 Location: ${info.habit} [X: ${posX}, Y: ${posY}, Z: ${posZ}]\nSpecies: ${aSpecies}`,
          onOptionSelect: (opt, d) => {
            this.hud.pushChatMessage('You', opt.label);
            if (opt.response) {
              const snippet = opt.response.split('\n')[0].trim();
              this.hud.pushChatMessage(d.name, snippet);
            }
          },
          options: [
            {
              label: `${info.treat} Feed ${info.treatName}`,
              styleClass: 'mc-btn-green',
              action: () => {
                sound.playLevelUp();
                sound.playAnimalSound(aType);
                if (aMeta?.position) {
                  this.world.spawnHammerSparkles(aMeta.position.x, aMeta.position.y + 1.2, aMeta.position.z);
                }
                this.hud.pushChatMessage(aTitle, `Happily munches on the ${info.treatName}! ✨`);
              },
              response: `*Munch munch!* ${aTitle} enthusiastically enjoys the ${info.treatName}! Sparkles swirl all around them, and they let out a contented, happy sound.\n\nThey now trust you as a friend of the sanctuary!`
            },
            {
              label: '🐾 Pet gently',
              styleClass: 'mc-btn-gold',
              action: () => {
                sound.playAnimalSound(aType);
                if (aMeta?.position) {
                  this.world.spawnHammerSparkles(aMeta.position.x, aMeta.position.y + 0.8, aMeta.position.z);
                }
              },
              response: `You reach out and stroke ${aTitle} gently. They relax under your touch and lean in affectionately!\n\nNature harmony achieved (+25 Exploration XP)!`
            },
            {
              label: '📍 Tell me about your habitat & location',
              styleClass: 'mc-btn-stone',
              response: `📍 Sanctuary Dossier [${aTitle}]:\n\n• Habitat: ${info.habit}\n• Coordinates: [X: ${posX}, Y: ${posY}, Z: ${posZ}]\n• Species: ${aSpecies}\n\n"${info.fact}"\n\nPress [M] anytime to open Fast Travel if you want to warp back here!`
            },
            {
              label: '📖 Learn Wildlife Fun Fact',
              styleClass: 'mc-btn-blue',
              response: `🌿 Wildlife Log [${aSpecies}]:\n\n"${info.fact}"\n\nLocated within the ${info.habit} of Lakshya's portfolio island!`
            }
          ]
        });
      } else if (inter.id?.startsWith('citizen_') || inter.meta?.type === 'citizen') {
        const cMeta = inter.meta;
        const cRole = cMeta?.role || 'Island Resident';
        const cTitle = inter.title || 'Island Citizen';
        const cPos = cMeta?.position || { x: 0, y: 2, z: 0 };
        const posX = Math.round(cPos.x);
        const posY = Math.round(cPos.y);
        const posZ = Math.round(cPos.z);
        const cColor = cMeta?.tagColor || '#38bdf8';

        sound.playVillagerHuh();
        if (cPos) {
          this.world.spawnHammerSparkles(cPos.x, cPos.y + 1.2, cPos.z);
        }

        const npcId = inter.id || `citizen_${cTitle.replace(/[^a-zA-Z0-9]/g, '_')}`;
        const npcInfo = npcChatManager.handleNPCInteract(npcId, cTitle);
        const areaName = npcInfo?.areaName || 'World District';

        this.hud.pushChatMessage(cTitle, `Greetings traveler! Speaking from ${areaName} [X: ${posX}, Y: ${posY}, Z: ${posZ}].`);

        this.modals.openNPCDialogModal({
          id: npcId,
          name: cTitle,
          title: `${cRole} · ${areaName}`,
          badge: `[RESIDENT]`,
          badgeColor: cColor,
          locationBadge: `${areaName} [X: ${posX}, Z: ${posZ}]`,
          avatarHtml: getCitizenAvatarHtml(npcInfo?.emoji || '👤', cColor),
          text: `Hello there! I'm ${cTitle}, the ${cRole} here at ${areaName} [X: ${posX}, Y: ${posY}, Z: ${posZ}]. What brings you to our corner of the world today?`,
          onOptionSelect: (opt, d) => {
            this.hud.pushChatMessage('You', opt.label);
            if (opt.response) {
              const snippet = opt.response.split('\n')[0].trim();
              this.hud.pushChatMessage(d.name, snippet);
            }
          },
          options: [
            {
              label: '📍 Tell me about your location & surroundings',
              styleClass: 'mc-btn-blue',
              response: npcInfo?.detailedLocationText || `📍 Location: ${areaName} [X: ${posX}, Y: ${posY}, Z: ${posZ}]\n\nWelcome to ${areaName}! There is plenty to explore here. Press [M] anytime to open the Fast Travel map!`
            },
            {
              label: '🗺️ Where should I explore nearby?',
              styleClass: 'mc-btn-gold',
              response: `Nearby Highlights around ${areaName}:\n\n${npcInfo?.nearbyLandmarks ? npcInfo.nearbyLandmarks.map(l => `• ${l}`).join('\n') : '• Explore the nearby landmark monuments and pathways!'}\n\nCoordinates: [X: ${posX}, Y: ${posY}, Z: ${posZ}]`
            },
            {
              label: '👋 Wave and say hello',
              styleClass: 'mc-btn-green',
              action: () => {
                sound.playLevelUp();
                if (cPos) this.world.spawnHammerSparkles(cPos.x, cPos.y + 1.2, cPos.z);
              },
              response: `*Waves warmly!* "Wonderful to meet you! Enjoy your journey through Lakshya's Minecraft portfolio realm!"`
            }
          ]
        });
      } else if (inter.id === 'mashu_guide' || inter.title?.includes('Mashu')) {
        sound.playLevelUp();
        if (this.world.mashuMesh) {
          this.world.spawnHammerSparkles(this.world.mashuMesh.position.x, this.world.mashuMesh.position.y + 1.2, this.world.mashuMesh.position.z);
        }
        this.hud.pushChatMessage('Mashu', '🌸 "Welcome traveler! Lakshya and I are so happy to have you in our Minecraft realm!"');

        this.modals.openNPCDialogModal({
          id: 'mashu_guide',
          name: 'Mashu',
          title: 'Lakshya\'s Princess & Realm Co-Founder 🌸',
          badge: '[LVL 22]',
          badgeColor: '#ec4899',
          locationBadge: 'Spawn Plaza [X: 2.3, Z: 7.5]',
          avatarHtml: getMashuAvatarHtml(),
          text: '🌸 "Hi there explorer! Welcome to our magical Minecraft realm! Lakshya and I crafted this entire voxel archipelago together block by block with love.\n\nFrom majestic world wonders to wild safari reserves and scenic viewpoints, there is so much to see. What would you like to know?"',
          onOptionSelect: (opt, d) => {
            this.hud.pushChatMessage('You', opt.label);
            if (opt.response) {
              const snippet = opt.response.split('\n')[0].trim();
              this.hud.pushChatMessage(d.name, snippet);
            }
          },
          options: [
            {
              label: '💖 Tell me about you and Lakshya!',
              styleClass: 'mc-btn-gold',
              response: '🌸 "He is the sweetest! Lakshya built this whole voxel world for me so we could adventure and build together. Every single monument, flower garden, and hidden bridge has a sweet story behind it!"'
            },
            {
              label: '✨ You look absolutely stunning!',
              styleClass: 'mc-btn-green',
              action: () => {
                sound.playLevelUp();
                if (this.world.mashuMesh) {
                  this.world.spawnHammerSparkles(this.world.mashuMesh.position.x, this.world.mashuMesh.position.y + 1.2, this.world.mashuMesh.position.z);
                }
              },
              response: '*Blushes warmly with floating heart sparkles!* 🌸 "Aww, thank you so much! You\'re so sweet! Lakshya always compliments me like that too. May your travels through our realm be filled with joy and diamonds!"'
            },
            {
              label: '🗺️ What are your favorite spots on the island?',
              styleClass: 'mc-btn-blue',
              response: '🌸 "My favorite spots:\n\n1. The Eiffel Tower at sunset — the panoramic view of the ocean is breathtaking!\n2. The Bamboo Safari Sanctuary feeding bamboo to the baby pandas.\n3. Sitting right here by the Emerald Fountain watching Roger chase butterflies!"'
            },
            {
              label: '💎 Any realm secrets you can share?',
              styleClass: 'mc-btn-stone',
              response: '🌸 "Secret tips from Mashu:\n\n• Press [F] to toggle Flight Mode and soar into the clouds!\n• Press [C] or [F5] to admire your character from 3rd person perspective!\n• Press [M] anytime to open the Fast Travel Map and warp instantly across the world!"'
            },
            {
              label: '🐶 How is Roger doing today?',
              styleClass: 'mc-btn-stone',
              response: '🌸 "Roger is the most loyal, lovable wolf ever! He loves ear scratches and always guards both Lakshya and me at spawn. Give him some love before you go explore!"'
            }
          ]
        });
      } else {
        sound.playVillagerHuh();
        if (this.world.npcMesh) {
          this.world.spawnHammerSparkles(this.world.npcMesh.position.x, this.world.npcMesh.position.y + 1.2, this.world.npcMesh.position.z);
        }
        this.hud.pushChatMessage('Lakshya', 'Hey there! Welcome to our Minecraft realm! Stationed at Crossroads Citadel Spawn Plaza [X: 3.5, Y: 2, Z: 7.5]. Press M anytime for Fast Travel.');

        this.modals.openNPCDialogModal({
          id: 'lakshya_guide',
          name: 'Lakshya',
          title: 'Realm Explorer & Architect ⚔️',
          badge: '[LVL 22]',
          badgeColor: '#ca8a04',
          locationBadge: 'Spawn Plaza [X: 3.5, Z: 7.5]',
          avatarHtml: getLakshyaAvatarHtml(),
          text: 'Hey explorer! Welcome to our interactive 3D voxel realm. I am stationed right here at the Crossroads Citadel Spawn Plaza [X: 3.5, Y: 2.0, Z: 7.5] by the Emerald Fountain.\n\nBeside me are my beautiful girlfriend Mashu and loyal companion dog Roger. What would you like to explore today?',
          onOptionSelect: (opt, d) => {
            this.hud.pushChatMessage('You', opt.label);
            if (opt.response) {
              const snippet = opt.response.split('\n')[0].trim();
              this.hud.pushChatMessage(d.name, snippet);
            }
          },
          options: [
            {
              label: '👑 Tell me about Mashu!',
              styleClass: 'mc-btn-gold',
              response: 'Mashu is my girlfriend and the light of my life! She is the co-founder of this Minecraft realm and helped inspire all the beauty you see here. Make sure to talk to her right beside me!'
            },
            {
              label: '🗺️ Open Fast Travel Realm Map [M]',
              styleClass: 'mc-btn-gold',
              action: () => {
                this.modals.openFastTravelModal(this.player.position, this.player.yaw, this.world.dragonManager?.getDragons());
              }
            },
            {
              label: '🏆 View Realm Expeditions',
              styleClass: 'mc-btn-green',
              action: () => {
                this.modals.openProjectModal(PORTFOLIO_DATA.projects[0]);
              }
            },
            {
              label: '📜 Open Ancient Dungeon Treasure Vault',
              styleClass: 'mc-btn-gold',
              action: () => {
                this.modals.openResumeChestModal();
              }
            },
            {
              label: '⚡ Inspect Alchemy Potions Guide',
              styleClass: 'mc-btn-blue',
              action: () => {
                this.modals.openSkillsModal();
              }
            },
            {
              label: '📍 Where are you and what are the island coordinates?',
              styleClass: 'mc-btn-stone',
              response: 'I am stationed at Crossroads Citadel Spawn Plaza [X: 3.5, Y: 2.0, Z: 7.5] with Mashu & Roger!\n\nMajor Island Realms & Coordinates:\n• Crossroads Citadel (Spawn): [X: 0, Z: 0]\n• Safari Wildlife Park: [X: -65, Z: 0]\n• Neo York Tech Metropolis: [X: 100, Z: 0]\n• Imperial India & Taj Mahal: [X: 80, Z: -135]\n• London Elizabeth Tower (Big Ben): [X: -32, Z: -58]\n• Paris Eiffel Tower: [X: 26, Z: -38]\n• Tokyo Shibuya Scramble: [X: -155, Z: -80]\n• Egypt Giza Pyramids: [X: -155, Z: 36]\n• Mexico City Zócalo: [X: -105, Z: 60]\n• Dubai Burj Khalifa: [X: 170, Z: 42]\n• Hollywood Hills & Bowl: [X: 165, Z: -100]\n\nPress [M] anytime to open the Fast Travel Map and warp anywhere!'
            },
            {
              label: '🐶 Tell me about your dog Roger!',
              styleClass: 'mc-btn-stone',
              response: 'That\'s Roger! He\'s our golden companion dog. He guards the spawn plaza, loves ear scratches, and gets super excited whenever visitors feed him steak.\n\nWalk over and tap Roger anytime to pet him, feed him, or play fetch!'
            },
            {
              label: '🧭 Where should I explore first on the island?',
              styleClass: 'mc-btn-stone',
              response: 'Start by inspecting the Emerald Central Fountain right behind us!\n\n• West: Giant Panda Bamboo Valley & African Lion Kopje\n• East: Taj Mahal, India Gate, & Cultural Pavilions\n• South: Redstone Nether Portal, Circular Railway Train, and Builder Arena\n\nOr press [M] anytime to teleport directly to any landmark!'
            },
            {
              label: '🎮 Any secret tips or Easter eggs?',
              styleClass: 'mc-btn-stone',
              response: 'Here are a few builder secrets:\n\n1. Press [C] or [F5] to switch camera between 1st Person and 3rd Person!\n2. Press [F] to toggle Flight Mode and soar over the voxel clouds.\n3. Press [B] to open your creative building block palette.\n4. Walk up to the circular railway train or auto-rickshaw and press [E] to board and ride!'
            }
          ]
        });
      }
    }
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
    if (this.scene.fog) this.scene.fog.color.copy(this.currentSkyColor);
    this.ambientLight.intensity = THREE.MathUtils.lerp(prev.ambient, next.ambient, eased);
    this.sunLight.intensity = THREE.MathUtils.lerp(prev.sun, next.sun, eased);
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

    // 2.5. Update NPC Chat Manager (proximity greetings & periodic ambient world chat)
    if (!isPaused) {
      npcChatManager.update(now * 0.001, this.player.position);
    }

    // 3. Drift blocky clouds slowly & tint dynamically during stormy weather
    if (this.cloudsMesh) {
      this.cloudsMesh.position.x += dt * 0.8;
      if (this.cloudsMesh.position.x > 80) {
        this.cloudsMesh.position.x = -80;
      }
      const cloudMat = this.cloudsMesh.material as THREE.MeshBasicMaterial;
      const targetCloudColor = this.climate.weather === 'thunderstorm'
        ? new THREE.Color(0x384152)
        : this.climate.weather === 'rain'
        ? new THREE.Color(0x6b7280)
        : new THREE.Color(0xffffff);
      cloudMat.color.lerp(targetCloudColor, dt * 2.0);
    }

    // 4. Update Day/Night and Climate
    const gloom = this.climate.weather === 'thunderstorm' ? 0.32 : this.climate.weather === 'rain' ? 0.58 : 1.0;
    this.updateDayNight(dt, gloom);
    const isNight = this.isNightMode || Math.sin(this.dayNightAngle) < -0.05;
    this.climate.update(dt, this.player.position, this.player.yaw, isNight);

    // 5. Update HUD elements
    this.hud.updatePrompt(this.player.currentTarget);
    this.hud.updateF3(this.player.position, this.player.yaw, this.player.pitch, this.fps);
    this.hud.updateMinimap(this.player.position, this.player.yaw, this.world.dragonManager?.getDragons(), this.world.liveTrains);
    this.hud.updateFlyStatus(this.player.isFlying);

    // 6. Render
    this.renderer.render(this.scene, this.camera);
  };
}

// Start game when DOM is loaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  new Game();
} else {
  window.addEventListener('DOMContentLoaded', () => {
    new Game();
  });
}
