import { ClimateEffects } from './world/climate';
import { CelestialSky } from './world/celestial';
import * as THREE from 'three';
import { TextureManager } from './engine/textures';
import { VoxelWorld } from './world/world';
import { Player, TargetInfo } from './engine/player';
import { HUDManager } from './ui/hud';
import { ModalManager, getLakshyaAvatarHtml, getRogerAvatarHtml, getAnimalAvatarHtml } from './ui/modals';
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
      antialias: false,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: false
    });
    this.renderer.setSize(window.visualViewport?.width ?? window.innerWidth, window.visualViewport?.height ?? window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25));
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
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25));
    this.scene.add(this.camera);

    this.hud = new HUDManager();
    this.modals = new ModalManager();

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
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25));
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
      this.hud.pushChatMessage('Alchemy', 'Opened Skills & Proficiencies matrix.');
    } else if (inter.type === 'chest') {
      this.modals.openResumeChestModal();
      this.hud.pushChatMessage('Loot', 'Opened Ancient Resume Chest!');
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
      if (inter.id === 'roger') {
        sound.playDogBark();
        if (this.world.dogMesh) {
          this.world.spawnHammerSparkles(this.world.dogMesh.position.x, this.world.dogMesh.position.y + 0.8, this.world.dogMesh.position.z);
        }
        this.hud.pushChatMessage('Roger', '*Woof woof!* (Wags tail happily and leans into your hand)');
        this.modals.openNPCDialogModal({
          id: 'roger',
          name: 'Roger',
          title: 'Loyal Companion · Best Boy 🐾',
          badge: '[GOOD BOY]',
          badgeColor: '#16a34a',
          avatarHtml: getRogerAvatarHtml(),
          text: '*Pant pant!* Roger gazes up with bright, warm eyes. His golden tail swishes rhythmically across the green grass!\n\n*Woof!* (He gently bumps his wet nose against your hand, waiting for pats)',
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
              label: '🧭 Ask Roger where Lakshya\'s work is',
              styleClass: 'mc-btn-stone',
              response: '*Arf!* Roger sits upright, points his furry snout towards the eastern pillars and the Redstone Nether Portal, then glances back at Lakshya with a wagging tail!\n\nRoger recommends checking the Golden Landmark Pillars or opening the Fast Travel Map [M]!'
            }
          ]
        });
      } else if (inter.id?.startsWith('animal_') || inter.meta?.type === 'animal') {
        const aMeta = inter.meta;
        const aType = aMeta?.animalType || 'animal';
        const aTitle = inter.title || 'Wild Animal';
        const aSpecies = aMeta?.animalSpecies || 'Island Inhabitant';

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

        this.hud.pushChatMessage(aTitle, `Observing ${aTitle} (${aSpecies}) in ${info.habit}.`);

        this.modals.openNPCDialogModal({
          id: inter.id || `animal_${aType}`,
          name: aTitle,
          title: `${aSpecies} · ${info.habit}`,
          badge: `[SAFARI]`,
          badgeColor: '#059669',
          avatarHtml: getAnimalAvatarHtml(info.emoji, info.bg),
          text: `You approach ${aTitle}! They tilt their head inquisitively, observing you in the gentle island breeze.\n\nHabitat: ${info.habit}\nSpecies: ${aSpecies}`,
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
              label: '📖 Learn Wildlife Fun Fact',
              styleClass: 'mc-btn-blue',
              response: `🌿 Wildlife Log [${aSpecies}]:\n\n"${info.fact}"\n\nLocated within the ${info.habit} of Lakshya's portfolio island!`
            }
          ]
        });
      } else {
        sound.playVillagerHuh();
        if (this.world.npcMesh) {
          this.world.spawnHammerSparkles(this.world.npcMesh.position.x, this.world.npcMesh.position.y + 1.2, this.world.npcMesh.position.z);
        }
        this.hud.pushChatMessage('Lakshya', 'Hey there! Welcome to my Minecraft Portfolio world! Press M anytime for Fast Travel.');

        this.modals.openNPCDialogModal({
          id: 'lakshya_guide',
          name: 'Lakshya',
          title: 'Software Engineer & Designer · Portfolio Guide',
          badge: '[LVL 22]',
          badgeColor: '#ca8a04',
          avatarHtml: getLakshyaAvatarHtml(),
          text: 'Hey explorer! Welcome to my interactive 3D voxel portfolio island. I built this realm with TypeScript, Three.js, and custom WebGL shaders to showcase my engineering projects, experience, and skills in a playable Minecraft format!\n\nBeside me is my loyal companion dog Roger. What would you like to explore today?',
          options: [
            {
              label: '💼 View My Engineering Projects',
              styleClass: 'mc-btn-green',
              action: () => {
                this.modals.openProjectModal(PORTFOLIO_DATA.projects[0]);
              }
            },
            {
              label: '📜 Open Career Resume Chest',
              styleClass: 'mc-btn-gold',
              action: () => {
                this.modals.openResumeChestModal();
              }
            },
            {
              label: '⚡ Inspect Technical Skills Matrix',
              styleClass: 'mc-btn-blue',
              action: () => {
                this.modals.openSkillsModal();
              }
            },
            {
              label: '🗺️ Open Fast Travel Realm Map [M]',
              styleClass: 'mc-btn-gold',
              action: () => {
                this.modals.openFastTravelModal(this.player.position, this.player.yaw, this.world.dragonManager?.getDragons());
              }
            },
            {
              label: '🐶 Tell me about your dog Roger!',
              styleClass: 'mc-btn-stone',
              response: 'That\'s Roger! He\'s my golden companion dog. He guards the spawn plaza, loves ear scratches, and gets super excited whenever visitors feed him steak.\n\nWalk over and tap Roger anytime to pet him, feed him, or play fetch!'
            },
            {
              label: '🧭 Where should I explore first on the island?',
              styleClass: 'mc-btn-stone',
              response: 'Start by inspecting the Emerald Central Fountain right behind me!\n\n• West: Giant Panda Bamboo Valley & African Lion Kopje\n• East: Taj Mahal, India Gate, & Cultural Pavilions\n• South: Redstone Nether Portal, Circular Railway Train, and Builder Arena\n\nOr press [M] anytime to teleport directly to any landmark!'
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
