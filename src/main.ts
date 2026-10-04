import * as THREE from 'three';
import { TextureManager } from './engine/textures';
import { VoxelWorld } from './world/world';
import { Player, TargetInfo } from './engine/player';
import { HUDManager } from './ui/hud';
import { ModalManager } from './ui/modals';
import { PORTFOLIO_DATA, Project } from './data/portfolioData';
import { sound } from './engine/audio';

class Game {
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private textureManager: TextureManager;
  private world: VoxelWorld;
  private player: Player;
  private hud: HUDManager;
  private modals: ModalManager;

  // Lighting & Day/Night
  private ambientLight: THREE.AmbientLight;
  private sunLight: THREE.DirectionalLight;
  private sunMesh: THREE.Mesh;
  private moonMesh: THREE.Mesh;
  private skyGroup: THREE.Group;
  private dayNightAngle: number = 0.8; // daytime start
  private isNightMode: boolean = false;

  // Blocky Clouds
  private cloudsMesh: THREE.InstancedMesh | null = null;
  private cloudDummy = new THREE.Object3D();

  // Performance tracking
  private lastTime: number = performance.now();
  private frameCount: number = 0;
  private fps: number = 60;
  private lastFpsUpdate: number = performance.now();

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
    this.hud.onDayNightToggle = () => {
      this.isNightMode = !this.isNightMode;
      this.dayNightAngle = this.isNightMode ? Math.PI + 0.5 : 0.8;
      this.updateDayNight(0);
      this.hud.pushChatMessage('System', `Time set to ${this.isNightMode ? 'Night (Torches Lit)' : 'Day'}`);
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
      this.player.isFlying = !this.player.isFlying;
      this.hud.updateFlyStatus(this.player.isFlying);
      sound.playClick();
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
    if (!this.isNightMode) {
      this.dayNightAngle += dt * 0.03; // slow natural cycle
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

    const isDay = sy > 0;
    const dayRatio = Math.max(0, Math.min(1, sy / dist));

    if (isDay) {
      const skyDay = new THREE.Color(0x78a7ff);
      const skySunset = new THREE.Color(0xfb923c);
      const curSky = skySunset.clone().lerp(skyDay, dayRatio);

      this.scene.background = curSky;
      if (this.scene.fog) this.scene.fog.color = curSky;
      this.ambientLight.intensity = 0.5 + dayRatio * 0.4;
      this.sunLight.intensity = 1.0 + dayRatio * 0.6;
    } else {
      // Night
      const skyNight = new THREE.Color(0x090d16);
      this.scene.background = skyNight;
      if (this.scene.fog) this.scene.fog.color = skyNight;
      this.ambientLight.intensity = 0.25;
      this.sunLight.intensity = 0.15;
    }
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
