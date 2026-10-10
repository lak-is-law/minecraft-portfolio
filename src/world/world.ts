import { DragonManager } from './dragons';
import { FlagManager } from './flags';
import * as THREE from 'three';
import { TextureManager } from '../engine/textures';
import { WorldBuilder, VoxelBlock } from './buildings';
import { PORTFOLIO_DATA, Project } from '../data/portfolioData';
import { sound } from '../engine/audio';

export interface ProjectBanner {
  mesh: THREE.Mesh;
  project: Project;
  box: THREE.Box3;
}

export class VoxelWorld {
  public scene: THREE.Scene;
  public textureManager: TextureManager;
  public builder: WorldBuilder;

  private instancedMeshes: Map<string, THREE.InstancedMesh> = new Map();
  private blockIndices: Map<string, { type: string; index: number }> = new Map();
  private blockTypes: string[] = [];

  // Dragons, Flags & Animals
  public dragonManager!: DragonManager;
  public flagManager!: FlagManager;
  private catMesh: THREE.Group | null = null;
  public dogMesh: THREE.Group | null = null;
  private dogTailMesh: THREE.Mesh | null = null;
  private dogHeadMesh: THREE.Group | null = null;
  private volcanoSmoke: THREE.Points | null = null;

  // Special animated objects
  private spinningIcons: THREE.Group[] = [];
  private portalParticles: THREE.Points | null = null;
  private beaconBeam: THREE.Mesh | null = null;
  public static readonly STATIONS = [
    { name: 'Crossroads Central Station', pos: new THREE.Vector3(58, 5.0, 33), tag: '[CENTRAL]' },
    { name: 'Neo York Skyway Station', pos: new THREE.Vector3(116, 5.0, 28), tag: '[NEO YORK]' },
    { name: 'Airport Terminal Skyport Station', pos: new THREE.Vector3(128, 5.0, 48), tag: '[AIRPORT]' },
    { name: 'South Coast Beach & Pier Station', pos: new THREE.Vector3(24, 5.0, 88), tag: '[BEACH]' },
    { name: 'Citadel Gateway Station', pos: new THREE.Vector3(8, 5.0, 22), tag: '[CITADEL]' },
  ];

  public npcMesh: THREE.Group | null = null;
  private railCurve: THREE.CatmullRomCurve3 | null = null;
  public liveTrains: THREE.Group[] = [];
  public autoRickshawMesh: THREE.Group | null = null;
  public animatedAirplanes: THREE.Group[] = [];
  private airplaneStrobes: THREE.Mesh[] = [];
  private airplaneWheels: THREE.Group[] = [];
  public worldCitizens: { mesh: THREE.Group; basePos: THREE.Vector3; initialHeading: number; armL: THREE.Group; armR: THREE.Group; head: THREE.Group }[] = [];

  // Hammerable Project Banners
  public projectBanners: ProjectBanner[] = [];

  // Builder's Minigame state
  public minigameBlocksPlaced: number = 0;

  constructor(scene: THREE.Scene, textureManager: TextureManager) {
    this.scene = scene;
    this.textureManager = textureManager;
    this.builder = new WorldBuilder();
  }

  public init() {
    this.builder.buildWorld();
    this.buildInstancedMeshes();
    this.createRailway();
    this.createAutoRickshaw();
    this.createProjectPedestalVisuals();
    this.createBigProjectWallBanners();
    this.createBeaconBeam();
    this.createNetherPortalParticles();
    this.createLakshyaNPC();
    this.createBeachCat();
    this.createVolcanoSmoke();
    this.createAnimatedAirplanes();
    this.createWorldCitizens();
    this.dragonManager = new DragonManager(this.scene);
    this.flagManager = new FlagManager(this.scene);
    this.createAllWorldFlags();
  }

  // Efficient batching using InstancedMesh
  private buildInstancedMeshes() {
    const blocks = this.builder.getBlocks();
    const countsByType: Map<string, number> = new Map();

    for (const b of blocks) {
      countsByType.set(b.type, (countsByType.get(b.type) || 0) + 1);
    }

    const boxGeo = new THREE.BoxGeometry(1, 1, 1);
    const dummy = new THREE.Object3D();

    for (const [type, count] of countsByType) {
      // Allocate capacity for pre-existing + dynamically placed blocks
      const capacity = Math.max(count + 500, 200);
      const material = this.textureManager.getMaterial(type);
      const instMesh = new THREE.InstancedMesh(boxGeo, material, capacity);
      instMesh.castShadow = (type !== 'bedrock' && type !== 'dirt');
      instMesh.receiveShadow = true;
      instMesh.frustumCulled = false;
      instMesh.name = `voxel_${type}`;

      this.scene.add(instMesh);
      this.instancedMeshes.set(type, instMesh);
      if (!this.blockTypes.includes(type)) {
        this.blockTypes.push(type);
      }
    }

    const currentIndices: Map<string, number> = new Map();
    for (const b of blocks) {
      const idx = currentIndices.get(b.type) || 0;
      dummy.position.set(b.x + 0.5, b.y + 0.5, b.z + 0.5);
      dummy.updateMatrix();

      const instMesh = this.instancedMeshes.get(b.type);
      if (instMesh) {
        instMesh.setMatrixAt(idx, dummy.matrix);
      }

      this.blockIndices.set(`${b.x},${b.y},${b.z}`, { type: b.type, index: idx });
      currentIndices.set(b.type, idx + 1);
    }

    for (const [type, instMesh] of this.instancedMeshes.entries()) {
      const realCount = currentIndices.get(type) || 0;
      instMesh.count = realCount;
      instMesh.instanceMatrix.needsUpdate = true;
    }
  }

  // Create BIG High-Definition Wall Banners for Projects in Neo York Times Square Avenue
  private createBigProjectWallBanners() {
    const projects = PORTFOLIO_DATA.projects;

    projects.forEach((proj) => {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 680;
      const ctx = canvas.getContext('2d')!;

      // Background with border
      ctx.fillStyle = '#111827';
      ctx.fillRect(0, 0, 1024, 680);

      // Gradient accent banner top
      const grad = ctx.createLinearGradient(0, 0, 1024, 0);
      grad.addColorStop(0, proj.accentColor);
      grad.addColorStop(1, '#0f172a');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1024, 110);

      // Gold / neon border
      ctx.strokeStyle = proj.accentColor;
      ctx.lineWidth = 14;
      ctx.strokeRect(7, 7, 1010, 666);

      // Inner border
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 4;
      ctx.strokeRect(20, 20, 984, 640);

      // Title & Category
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 52px monospace';
      ctx.fillText(proj.title, 40, 75);

      ctx.fillStyle = '#facc15';
      ctx.font = 'bold 26px monospace';
      ctx.fillText(`[${proj.category.toUpperCase()}]`, 40, 155);

      // Subtitle & Tagline
      ctx.fillStyle = '#e2e8f0';
      ctx.font = 'bold 28px monospace';
      ctx.fillText(proj.subtitle, 40, 205);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '22px monospace';
      ctx.fillText(proj.tagline, 40, 245);

      // Metrics Badges
      let mx = 40;
      for (const m of proj.metrics) {
        ctx.fillStyle = '#1e3a8a';
        ctx.fillRect(mx, 280, 280, 50);
        ctx.strokeStyle = '#60a5fa';
        ctx.lineWidth = 2;
        ctx.strokeRect(mx, 280, 280, 50);

        ctx.fillStyle = '#93c5fd';
        ctx.font = 'bold 18px monospace';
        ctx.fillText(`[KEY] ${m}`, mx + 15, 312);
        mx += 300;
      }

      // Tech Stack tags
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 22px monospace';
      ctx.fillText('TECH STACK: ' + proj.tags.join('  |  '), 40, 390);

      // Big Graphic / Live URL box
      ctx.fillStyle = '#1f2937';
      ctx.fillRect(40, 430, 944, 80);
      ctx.strokeStyle = '#4b5563';
      ctx.strokeRect(40, 430, 944, 80);

      ctx.fillStyle = '#10b981';
      ctx.font = 'bold 26px monospace';
      ctx.fillText(`LIVE: ${proj.liveUrl}`, 60, 480);

      // Giant Hammer Action Prompt
      ctx.fillStyle = '#dc2626';
      ctx.fillRect(40, 540, 944, 100);
      ctx.strokeStyle = '#f87171';
      ctx.lineWidth = 6;
      ctx.strokeRect(40, 540, 944, 100);

      ctx.fillStyle = '#fef08a';
      ctx.font = 'bold 36px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('[HAMMER WITH PICKAXE TO LAUNCH LIVE SITE]', 512, 605);
      ctx.textAlign = 'start';

      const texture = new THREE.CanvasTexture(canvas);
      texture.magFilter = THREE.LinearFilter;
      texture.colorSpace = THREE.SRGBColorSpace;

      // 3D Banner Mesh: 6.8 blocks wide x 4.5 blocks high
      const bannerGeo = new THREE.PlaneGeometry(6.8, 4.5);
      const bannerMat = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
      const bannerMesh = new THREE.Mesh(bannerGeo, bannerMat);

      bannerMesh.position.set(proj.bannerCoords.x, proj.bannerCoords.y + 1.2, proj.bannerCoords.z);
      bannerMesh.rotation.y = proj.bannerCoords.rotY ?? 0;
      this.scene.add(bannerMesh);

      // Compute bounding box for raycasting with updated world matrix
      bannerMesh.updateMatrixWorld(true);
      const box = new THREE.Box3().setFromObject(bannerMesh);
      box.expandByScalar(0.8);

      this.projectBanners.push({
        mesh: bannerMesh,
        project: proj,
        box
      });
    });
  }

  // Create Authentic 3D Waving Cloth Flags on Majestic Flagpoles Across the World
  private createAllWorldFlags() {
    if (!this.flagManager) return;

    // 1. Crossroads Citadel Spawn Plaza (Parade of Nations)
    // 10 National Masts surrounding the central hub
    this.flagManager.addFlag('india', 6, 8.5, -14, 'east');
    this.flagManager.addFlag('korea', -6, 8.5, -14, 'west');
    this.flagManager.addFlag('japan', -12, 8.5, -10, 'west');
    this.flagManager.addFlag('china', -14, 8.5, -6, 'west');
    this.flagManager.addFlag('uk', -14, 8.5, 6, 'west');
    this.flagManager.addFlag('france', -12, 8.5, 10, 'west');
    this.flagManager.addFlag('mexico', -6, 8.5, 14, 'west');
    this.flagManager.addFlag('usa', 6, 8.5, 14, 'east');
    this.flagManager.addFlag('egypt', 12, 8.5, 10, 'east');
    this.flagManager.addFlag('uae', 12, 8.5, -10, 'east');

    // 2. The 10 World Realms (Majestic Masts erected in each specific district)
    // India: Imperial India & Taj Mahal Realm
    this.flagManager.addFlag('india', 80, 8.5, -118, 'east');
    // USA: Las Vegas Boulevard in front of Hollywood & LK Tower
    this.flagManager.addFlag('usa', 138, 8.5, -46, 'east');
    // UK: London Realm near Big Ben & Tower Bridge
    this.flagManager.addFlag('uk', -34, 8.5, -58, 'west');
    // France: Paris District facing Eiffel Tower
    this.flagManager.addFlag('france', 26, 8.5, -28, 'east');
    // Japan: Tokyo Shibuya Realm near Scramble Crossing
    this.flagManager.addFlag('japan', -153, 8.5, -73, 'west');
    // South Korea: Seoul Realm near Gwanghwamun Palace
    this.flagManager.addFlag('korea', -65, 8.5, -86, 'west');
    // China: China Realm by Great Wall & Dragon Pagoda
    this.flagManager.addFlag('china', -108, 8.5, -98, 'west');
    // Egypt: Giza Pyramids Realm near Great Sphinx
    this.flagManager.addFlag('egypt', -150, 8.5, 44, 'west');
    // UAE: Dubai Realm at foot of Burj Khalifa
    this.flagManager.addFlag('uae', 165, 8.5, 37, 'east');
    // Mexico: Mexico Realm near Zócalo & Chichén Itzá
    this.flagManager.addFlag('mexico', -100, 8.5, 57, 'west');

    // 3. Gateway of India (Monumental Flying Tiranga atop the Apollo Bunder Arch at Y = 26.5)
    this.flagManager.addFlag('india', 75, 26.5, -150, 'east', 1.35);
  }

  // Check if player raycast hits any hammerable project banner
  public checkBannerHit(rayOrigin: THREE.Vector3, rayDir: THREE.Vector3, reach: number): ProjectBanner | null {
    const ray = new THREE.Ray(rayOrigin, rayDir);
    let closestBanner: ProjectBanner | null = null;
    let closestDist = reach;

    for (const b of this.projectBanners) {
      const hitPoint = new THREE.Vector3();
      if (ray.intersectBox(b.box, hitPoint)) {
        const dist = rayOrigin.distanceTo(hitPoint);
        if (dist < closestDist) {
          closestDist = dist;
          closestBanner = b;
        }
      }
    }
    return closestBanner;
  }

  // Check if player raycast hits Lakshya NPC or companion dog Roger
  public checkNPCHit(rayOrigin: THREE.Vector3, rayDir: THREE.Vector3, reach: number): { type: 'npc' | 'dog'; position: THREE.Vector3; title: string } | null {
    const ray = new THREE.Ray(rayOrigin, rayDir);
    let closestDist = reach;
    let hit: { type: 'npc' | 'dog'; position: THREE.Vector3; title: string } | null = null;

    if (this.npcMesh) {
      const npcBox = new THREE.Box3().setFromCenterAndSize(
        new THREE.Vector3(this.npcMesh.position.x, this.npcMesh.position.y + 1.0, this.npcMesh.position.z),
        new THREE.Vector3(1.0, 2.2, 1.0)
      );
      const hitPoint = new THREE.Vector3();
      if (ray.intersectBox(npcBox, hitPoint)) {
        const dist = rayOrigin.distanceTo(hitPoint);
        if (dist < closestDist) {
          closestDist = dist;
          hit = { type: 'npc', position: this.npcMesh.position.clone(), title: 'Lakshya' };
        }
      }
    }

    if (this.dogMesh) {
      const dogBox = new THREE.Box3().setFromCenterAndSize(
        new THREE.Vector3(this.dogMesh.position.x, this.dogMesh.position.y + 0.45, this.dogMesh.position.z),
        new THREE.Vector3(0.8, 0.9, 0.8)
      );
      const hitPoint = new THREE.Vector3();
      if (ray.intersectBox(dogBox, hitPoint)) {
        const dist = rayOrigin.distanceTo(hitPoint);
        if (dist < closestDist) {
          closestDist = dist;
          hit = { type: 'dog', position: this.dogMesh.position.clone(), title: 'Roger' };
        }
      }
    }

    return hit;
  }

  // Place a new block dynamically
  public placeBlock(x: number, y: number, z: number, type: string) {
    const key = `${x},${y},${z}`;
    if (this.builder.getBlockMap().has(key)) return;

    this.builder.setBlock(x, y, z, type);
    let instMesh = this.instancedMeshes.get(type);

    if (!instMesh) {
      const boxGeo = new THREE.BoxGeometry(1, 1, 1);
      const mat = this.textureManager.getMaterial(type);
      instMesh = new THREE.InstancedMesh(boxGeo, mat, 500);
      instMesh.count = 0;
      instMesh.castShadow = true;
      instMesh.receiveShadow = true;
      instMesh.frustumCulled = false;
      this.scene.add(instMesh);
      this.instancedMeshes.set(type, instMesh);
      if (!this.blockTypes.includes(type)) {
        this.blockTypes.push(type);
      }
    }

    const dummy = new THREE.Object3D();
    dummy.position.set(x + 0.5, y + 0.5, z + 0.5);
    dummy.updateMatrix();

    const maxCap = instMesh.instanceMatrix.array.length / 16;
    if (instMesh.count >= maxCap) {
      const newCapacity = maxCap + 300;
      const boxGeo = new THREE.BoxGeometry(1, 1, 1);
      const mat = this.textureManager.getMaterial(type);
      const newInstMesh = new THREE.InstancedMesh(boxGeo, mat, newCapacity);
      newInstMesh.castShadow = true;
      newInstMesh.receiveShadow = true;
      newInstMesh.frustumCulled = false;

      for (let i = 0; i < instMesh.count; i++) {
        const mat4 = new THREE.Matrix4();
        instMesh.getMatrixAt(i, mat4);
        newInstMesh.setMatrixAt(i, mat4);
      }
      newInstMesh.count = instMesh.count;
      this.scene.remove(instMesh);
      this.scene.add(newInstMesh);
      this.instancedMeshes.set(type, newInstMesh);
      instMesh = newInstMesh;
    }

    const idx = instMesh.count;
    instMesh.setMatrixAt(idx, dummy.matrix);
    instMesh.count++;
    instMesh.instanceMatrix.needsUpdate = true;

    this.blockIndices.set(key, { type, index: idx });

    // Track minigame building arena (Pueblo Royale: X in [-80, -45], Z in [35, 68])
    if (x >= -80 && x <= -45 && z >= 35 && z <= 68) {
      this.minigameBlocksPlaced++;
      if (this.minigameBlocksPlaced === 10 || this.minigameBlocksPlaced === 25 || this.minigameBlocksPlaced === 50) {
        sound.playLevelUp();
      }
    }
  }

  // Break a block dynamically with debris particles
  public breakBlock(x: number, y: number, z: number): VoxelBlock | null {
    const key = `${x},${y},${z}`;
    const target = this.getBlock(x, y, z);
    if (!target) return null;

    // Bedrock & bottom-most foundation layer protection: cannot be mined or broken!
    if (target.type === 'bedrock' || y <= -2) {
      return null;
    }

    const block = this.builder.removeBlock(x, y, z);
    if (!block) return null;

    const entry = this.blockIndices.get(key);
    if (entry) {
      const instMesh = this.instancedMeshes.get(entry.type);
      if (instMesh) {
        const zeroMatrix = new THREE.Matrix4().makeScale(0, 0, 0);
        instMesh.setMatrixAt(entry.index, zeroMatrix);
        instMesh.instanceMatrix.needsUpdate = true;
      }
      this.blockIndices.delete(key);
    }

    this.spawnBlockDebris(x + 0.5, y + 0.5, z + 0.5, block.type);
    return block;
  }

  // Hammer smash effect on project banner with sparkle particles
  public spawnHammerSparkles(x: number, y: number, z: number, colorHex: number = 0xfacc15) {
    const count = 35;
    const geo = new THREE.BoxGeometry(0.18, 0.18, 0.18);
    const mat = new THREE.MeshBasicMaterial({ color: colorHex });
    const group = new THREE.Group();
    const velocities: THREE.Vector3[] = [];

    for (let i = 0; i < count; i++) {
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set((Math.random() - 0.5) * 1.5, (Math.random() - 0.5) * 1.5, (Math.random() - 0.5) * 0.5);
      group.add(mesh);
      velocities.push(new THREE.Vector3(
        (Math.random() - 0.5) * 8,
        Math.random() * 6 + 2,
        Math.random() * 6 + 2
      ));
    }

    group.position.set(x, y, z);
    this.scene.add(group);

    const startTime = performance.now();
    const animateDebris = () => {
      const elapsed = (performance.now() - startTime) / 1000;
      if (elapsed > 0.8) {
        this.scene.remove(group);
        return;
      }

      for (let i = 0; i < count; i++) {
        const p = group.children[i];
        const v = velocities[i];
        p.position.x += v.x * 0.016;
        p.position.y += v.y * 0.016;
        p.position.z += v.z * 0.016;
        v.y -= 12 * 0.016;
      }
      requestAnimationFrame(animateDebris);
    };
    requestAnimationFrame(animateDebris);
  }

  // Debris particles when breaking normal blocks
  private spawnBlockDebris(x: number, y: number, z: number, type: string) {
    const count = 12;
    const geo = new THREE.BoxGeometry(0.15, 0.15, 0.15);
    const mat = this.textureManager.getMaterial(type);
    const particleMat = Array.isArray(mat) ? mat[0] : mat;

    const group = new THREE.Group();
    const velocities: THREE.Vector3[] = [];

    for (let i = 0; i < count; i++) {
      const mesh = new THREE.Mesh(geo, particleMat);
      mesh.position.set((Math.random() - 0.5) * 0.6, (Math.random() - 0.5) * 0.6, (Math.random() - 0.5) * 0.6);
      group.add(mesh);
      velocities.push(new THREE.Vector3(
        (Math.random() - 0.5) * 4,
        Math.random() * 4 + 2,
        (Math.random() - 0.5) * 4
      ));
    }

    group.position.set(x, y, z);
    this.scene.add(group);

    const startTime = performance.now();
    const animateDebris = () => {
      const elapsed = (performance.now() - startTime) / 1000;
      if (elapsed > 0.6) {
        this.scene.remove(group);
        return;
      }

      for (let i = 0; i < count; i++) {
        const p = group.children[i];
        const v = velocities[i];
        p.position.x += v.x * 0.016;
        p.position.y += v.y * 0.016;
        p.position.z += v.z * 0.016;
        v.y -= 9.8 * 0.016;
      }
      requestAnimationFrame(animateDebris);
    };
    requestAnimationFrame(animateDebris);
  }

  // Animated 3D spinning badges/icons above project pedestals
  private createProjectPedestalVisuals() {
    const projects = PORTFOLIO_DATA.projects;

    projects.forEach((proj) => {
      const group = new THREE.Group();
      // Positioned directly above pedestal on Neo York Broadway East sidewalk (X = 87)
      group.position.set(proj.bannerCoords.x - 1.9, 4.2, proj.bannerCoords.z);

      const geo = new THREE.OctahedronGeometry(0.45);
      const mat = new THREE.MeshLambertMaterial({
        color: proj.accentColor,
        emissive: proj.accentColor,
        emissiveIntensity: 0.35,
      });
      const gem = new THREE.Mesh(geo, mat);
      group.add(gem);

      const light = new THREE.PointLight(proj.accentColor, 1.2, 5);
      group.add(light);

      this.scene.add(group);
      this.spinningIcons.push(group);
    });
  }

  // Active Beacon light beam at Crossroads Citadel
  private createBeaconBeam() {
    const beamGeo = new THREE.CylinderGeometry(0.4, 0.4, 100, 8);
    const beamMat = new THREE.MeshBasicMaterial({
      color: 0x67e8f9,
      transparent: true,
      opacity: 0.7,
      side: THREE.DoubleSide
    });
    this.beaconBeam = new THREE.Mesh(beamGeo, beamMat);
    this.beaconBeam.position.set(0.5, 52, 0.5);
    this.scene.add(this.beaconBeam);

    const beaconLight = new THREE.PointLight(0x38bdf8, 3.0, 35);
    beaconLight.position.set(0.5, 3.5, 0.5);
    this.scene.add(beaconLight);
  }

  // Swirling Nether Portal particles
  private createNetherPortalParticles() {
    const count = 120;
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 3;
      positions[i * 3 + 1] = 2 + Math.random() * 4;
      positions[i * 3 + 2] = 32 + (Math.random() - 0.5) * 0.8;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const mat = new THREE.PointsMaterial({
      color: 0xc084fc,
      size: 0.18,
      transparent: true,
      opacity: 0.8
    });
    this.portalParticles = new THREE.Points(geo, mat);
    this.scene.add(this.portalParticles);
  }

  // 3D NPC of Lakshya near spawn (Authentic Generated Avatar from og-image.jpg) & Companion Dog Roger
  private createLakshyaNPC() {
    if (this.npcMesh) return;

    const npc = new THREE.Group();
    // Keep the NPC on dry ground beside the spawn point, outside the fountain.
    npc.position.set(3.5, 2, 7.5);
    npc.rotation.y = Math.PI;

    // Palette authentic to og-image.jpg
    const skinMat = new THREE.MeshLambertMaterial({ color: 0xf0c8a5 }); // Warm healthy skin tone
    const shirtMat = new THREE.MeshLambertMaterial({ color: 0x18181b }); // Crisp black button-down dress shirt
    const placketMat = new THREE.MeshLambertMaterial({ color: 0x222227 }); // Front button placket
    const buttonMat = new THREE.MeshBasicMaterial({ color: 0x64748b }); // Subtle silver/charcoal buttons
    const hairMat = new THREE.MeshLambertMaterial({ color: 0x111113 }); // Jet black styled hair
    const glassesFrameMat = new THREE.MeshLambertMaterial({ color: 0x0f0f11 }); // Black glasses frames
    const lensMat = new THREE.MeshStandardMaterial({
      color: 0xe0f2fe,
      roughness: 0.1,
      metalness: 0.1,
      transparent: true,
      opacity: 0.38
    }); // Translucent glasses lenses
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const pupilMat = new THREE.MeshBasicMaterial({ color: 0x1e293b });
    const mouthMat = new THREE.MeshBasicMaterial({ color: 0xb45309 });
    const beltMat = new THREE.MeshLambertMaterial({ color: 0x0f172a }); // Dark sleek belt
    const buckleMat = new THREE.MeshLambertMaterial({ color: 0x94a3b8 }); // Metallic silver buckle
    const watchBandMat = new THREE.MeshLambertMaterial({ color: 0xcbd5e1 }); // Metallic silver watch strap
    const watchDialMat = new THREE.MeshLambertMaterial({ color: 0x0f172a }); // Dark dial face
    const pantsMat = new THREE.MeshLambertMaterial({ color: 0x18181b }); // Tailored black trousers
    const shoeWhiteMat = new THREE.MeshLambertMaterial({ color: 0xffffff }); // Crisp white sneakers
    const shoeSoleMat = new THREE.MeshLambertMaterial({ color: 0xe2e8f0 }); // Subtle sneaker sole rim

    // --- HEAD GROUP ---
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 1.55, 0);

    const headMesh = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.5), skinMat);
    headGroup.add(headMesh);

    // Jet black styled hair (Curtain / side part with modern volume)
    const hairTop = new THREE.Mesh(new THREE.BoxGeometry(0.53, 0.2, 0.53), hairMat);
    hairTop.position.set(0, 0.17, 0);
    headGroup.add(hairTop);

    // Left & Right parted bangs framing forehead
    const bangL = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.16, 0.14), hairMat);
    bangL.position.set(-0.13, 0.12, 0.21);
    headGroup.add(bangL);

    const bangR = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.16, 0.14), hairMat);
    bangR.position.set(0.13, 0.12, 0.21);
    headGroup.add(bangR);

    // Back & side hair taper
    const hairBack = new THREE.Mesh(new THREE.BoxGeometry(0.53, 0.3, 0.14), hairMat);
    hairBack.position.set(0, 0.02, -0.2);
    headGroup.add(hairBack);

    const hairSideL = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.26, 0.36), hairMat);
    hairSideL.position.set(-0.24, 0.03, -0.02);
    headGroup.add(hairSideL);

    const hairSideR = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.26, 0.36), hairMat);
    hairSideR.position.set(0.24, 0.03, -0.02);
    headGroup.add(hairSideR);

    // Eyes: White sclera + dark pupils
    for (const side of [-0.12, 0.12]) {
      const eye = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.02), eyeMat);
      eye.position.set(side, 0.02, 0.255);
      headGroup.add(eye);

      const pupil = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.04, 0.03), pupilMat);
      pupil.position.set(side, 0.02, 0.26);
      headGroup.add(pupil);
    }

    // Glasses: Signature black frames with clear lenses from og-image.jpg
    const leftFrame = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.12, 0.03), glassesFrameMat);
    leftFrame.position.set(-0.12, 0.02, 0.268);
    headGroup.add(leftFrame);

    const leftLens = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.08, 0.032), lensMat);
    leftLens.position.set(-0.12, 0.02, 0.268);
    headGroup.add(leftLens);

    const rightFrame = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.12, 0.03), glassesFrameMat);
    rightFrame.position.set(0.12, 0.02, 0.268);
    headGroup.add(rightFrame);

    const rightLens = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.08, 0.032), lensMat);
    rightLens.position.set(0.12, 0.02, 0.268);
    headGroup.add(rightLens);

    // Nose Bridge
    const bridge = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.03, 0.03), glassesFrameMat);
    bridge.position.set(0, 0.03, 0.268);
    headGroup.add(bridge);

    // Glasses temple arms extending back
    const templeL = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.02, 0.26), glassesFrameMat);
    templeL.position.set(-0.255, 0.03, 0.13);
    headGroup.add(templeL);

    const templeR = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.02, 0.26), glassesFrameMat);
    templeR.position.set(0.255, 0.03, 0.13);
    headGroup.add(templeR);

    // Friendly smile
    const mouth = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.02, 0.015), mouthMat);
    mouth.position.set(0, -0.13, 0.256);
    headGroup.add(mouth);

    npc.add(headGroup);

    // --- TORSO (Black Collared Dress Shirt with Open V-Neck & Placket) ---
    const torsoMesh = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.72, 0.28), shirtMat);
    torsoMesh.position.set(0, 0.96, 0);
    npc.add(torsoMesh);

    // Open V-neck collar showing skin tone
    const vNeck = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.12, 0.02), skinMat);
    vNeck.position.set(0, 1.25, 0.142);
    npc.add(vNeck);

    // Folded collar wings
    const collarL = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.12, 0.03), shirtMat);
    collarL.position.set(-0.08, 1.25, 0.146);
    collarL.rotation.z = -0.18;
    npc.add(collarL);

    const collarR = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.12, 0.03), shirtMat);
    collarR.position.set(0.08, 1.25, 0.146);
    collarR.rotation.z = 0.18;
    npc.add(collarR);

    // Central button placket
    const placket = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.54, 0.015), placketMat);
    placket.position.set(0, 0.94, 0.144);
    npc.add(placket);

    // Buttons
    for (const yBtn of [1.14, 1.02, 0.90, 0.78]) {
      const btn = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.02, 0.02), buttonMat);
      btn.position.set(0, yBtn, 0.152);
      npc.add(btn);
    }

    // Belt & Buckle
    const belt = new THREE.Mesh(new THREE.BoxGeometry(0.53, 0.08, 0.29), beltMat);
    belt.position.set(0, 0.65, 0);
    npc.add(belt);

    const buckle = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.06, 0.025), buckleMat);
    buckle.position.set(0, 0.65, 0.148);
    npc.add(buckle);

    // --- ARMS (Black Shirt Sleeves & Left Wrist Watch) ---
    // Left Arm with silver wrist watch
    const armL = new THREE.Group();
    armL.position.set(-0.38, 1.12, 0);

    const sleeveL = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.38, 0.22), shirtMat);
    sleeveL.position.set(0, -0.06, 0);
    armL.add(sleeveL);

    const forearmL = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.34, 0.2), skinMat);
    forearmL.position.set(0, -0.34, 0);
    armL.add(forearmL);

    // Silver Wrist Watch (Watch band + dial from og-image.jpg)
    const watchBand = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.05, 0.22), watchBandMat);
    watchBand.position.set(0, -0.38, 0);
    armL.add(watchBand);

    const watchFace = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.07, 0.07), watchDialMat);
    watchFace.position.set(-0.105, -0.38, 0);
    armL.add(watchFace);

    npc.add(armL);

    // Right Arm (Relaxed)
    const armR = new THREE.Group();
    armR.position.set(0.38, 1.12, 0);

    const sleeveR = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.38, 0.22), shirtMat);
    sleeveR.position.set(0, -0.06, 0);
    armR.add(sleeveR);

    const forearmR = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.34, 0.2), skinMat);
    forearmR.position.set(0, -0.34, 0);
    armR.add(forearmR);

    npc.add(armR);

    // --- LEGS (Tailored Black Trousers & Crisp White Sneakers) ---
    for (const side of [-0.14, 0.14]) {
      const legGroup = new THREE.Group();
      legGroup.position.set(side, 0.6, 0);

      const pants = new THREE.Mesh(new THREE.BoxGeometry(0.23, 0.46, 0.23), pantsMat);
      pants.position.set(0, -0.22, 0);
      legGroup.add(pants);

      const shoe = new THREE.Mesh(new THREE.BoxGeometry(0.23, 0.13, 0.31), shoeWhiteMat);
      shoe.position.set(0, -0.42, 0.04);
      legGroup.add(shoe);

      const sole = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.05, 0.33), shoeSoleMat);
      sole.position.set(0, -0.50, 0.04);
      legGroup.add(sole);

      npc.add(legGroup);
    }

    // Floating Nameplate [LVL 22] Lakshya matching og-image.jpg
    const nameCanvas = document.createElement('canvas');
    nameCanvas.width = 384;
    nameCanvas.height = 96;
    const nameCtx = nameCanvas.getContext('2d')!;
    nameCtx.fillStyle = 'rgba(0, 0, 0, 0.82)';
    nameCtx.fillRect(0, 0, 384, 96);
    nameCtx.strokeStyle = '#22c55e';
    nameCtx.lineWidth = 4;
    nameCtx.strokeRect(2, 2, 380, 92);

    nameCtx.fillStyle = '#4ade80';
    nameCtx.font = 'bold 24px monospace';
    nameCtx.textAlign = 'center';
    nameCtx.fillText('[LVL 22] Lakshya', 192, 36);

    nameCtx.fillStyle = '#ffffff';
    nameCtx.font = '18px monospace';
    nameCtx.fillText('Software Engineer & Designer', 192, 68);

    const nameTexture = new THREE.CanvasTexture(nameCanvas);
    nameTexture.magFilter = THREE.NearestFilter;
    const nameSprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: nameTexture }));
    nameSprite.scale.set(2.4, 0.6, 1);
    nameSprite.position.set(0, 2.25, 0);
    npc.add(nameSprite);

    this.scene.add(npc);
    this.npcMesh = npc;

    // --- COMPANION DOG: ROGER (Wolf with Red Collar from og-image.jpg) ---
    this.createRogerDog();
  }

  // Faithful companion Minecraft Wolf "ROGER" sitting right beside Lakshya
  private createRogerDog() {
    if (this.dogMesh) return;

    const dog = new THREE.Group();
    // Sitting beside Lakshya at spawn
    dog.position.set(4.5, 2, 7.3);
    dog.rotation.y = Math.PI - 0.2;

    const furMat = new THREE.MeshLambertMaterial({ color: 0xe4e4e7 }); // Light grey/white wolf fur
    const saddleMat = new THREE.MeshLambertMaterial({ color: 0x9ca3af }); // Grey saddle/back markings
    const collarMat = new THREE.MeshLambertMaterial({ color: 0xef4444 }); // Iconic red collar
    const noseMat = new THREE.MeshBasicMaterial({ color: 0x18181b });
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x1e293b });

    // Body (Sitting angled back)
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.32, 0.46), furMat);
    body.position.set(0, 0.28, 0);
    body.rotation.x = 0.24;
    dog.add(body);

    const saddle = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.14, 0.32), saddleMat);
    saddle.position.set(0, 0.36, -0.04);
    saddle.rotation.x = 0.24;
    dog.add(saddle);

    // Red Collar around neck
    const collar = new THREE.Mesh(new THREE.BoxGeometry(0.30, 0.08, 0.30), collarMat);
    collar.position.set(0, 0.48, 0.16);
    dog.add(collar);

    // Head
    const head = new THREE.Group();
    head.position.set(0, 0.58, 0.22);

    const headMesh = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.28, 0.3), furMat);
    head.add(headMesh);

    // Snout / Muzzle
    const snout = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.13, 0.16), furMat);
    snout.position.set(0, -0.06, 0.18);
    head.add(snout);

    // Black Nose
    const nose = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.05, 0.03), noseMat);
    nose.position.set(0, -0.03, 0.265);
    head.add(nose);

    // Eyes
    for (const side of [-0.08, 0.08]) {
      const eye = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.04, 0.02), eyeMat);
      eye.position.set(side, 0.04, 0.155);
      head.add(eye);
    }

    // Pointed Ears
    const earL = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.11, 0.06), furMat);
    earL.position.set(-0.09, 0.18, -0.04);
    head.add(earL);

    const earR = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.11, 0.06), furMat);
    earR.position.set(0.09, 0.18, -0.04);
    head.add(earR);

    dog.add(head);
    this.dogHeadMesh = head;

    // Front Legs (Standing upright)
    const legFL = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.32, 0.1), furMat);
    legFL.position.set(-0.09, 0.16, 0.16);
    dog.add(legFL);

    const legFR = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.32, 0.1), furMat);
    legFR.position.set(0.09, 0.16, 0.16);
    dog.add(legFR);

    // Hind Legs (Sitting posture)
    const legBL = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.2, 0.28), furMat);
    legBL.position.set(-0.13, 0.1, -0.12);
    dog.add(legBL);

    const legBR = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.2, 0.28), furMat);
    legBR.position.set(0.13, 0.1, -0.12);
    dog.add(legBR);

    // Wagging Tail
    const tail = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.07, 0.32), furMat);
    tail.position.set(0, 0.12, -0.28);
    tail.rotation.x = -0.35;
    dog.add(tail);
    this.dogTailMesh = tail;

    // Floating Nametag: ROGER
    const dogCanvas = document.createElement('canvas');
    dogCanvas.width = 256;
    dogCanvas.height = 64;
    const dogCtx = dogCanvas.getContext('2d')!;
    dogCtx.fillStyle = 'rgba(0, 0, 0, 0.75)';
    dogCtx.fillRect(0, 0, 256, 64);
    dogCtx.strokeStyle = '#ef4444';
    dogCtx.lineWidth = 3;
    dogCtx.strokeRect(2, 2, 252, 60);

    dogCtx.fillStyle = '#ffffff';
    dogCtx.font = 'bold 26px monospace';
    dogCtx.textAlign = 'center';
    dogCtx.fillText('ROGER', 128, 42);

    const dogTexture = new THREE.CanvasTexture(dogCanvas);
    dogTexture.magFilter = THREE.NearestFilter;
    const dogSprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: dogTexture }));
    dogSprite.scale.set(1.2, 0.35, 1);
    dogSprite.position.set(0, 1.05, 0.15);
    dog.add(dogSprite);

    this.scene.add(dog);
    this.dogMesh = dog;
  }

  /** Maintain the authentic generated avatar guide and companion dog */
  public replaceLakshyaNPCWithAvatar(_playerAvatar?: THREE.Group) {
    if (!this.npcMesh) {
      this.createLakshyaNPC();
    }
  }


  // Companion Black & White Tuxedo Cat resting on coastal rocks (Photo 2)
  private createBeachCat() {
    const cat = new THREE.Group();
    cat.position.set(10.5, 3.8, 82.5);

    const blackMat = new THREE.MeshLambertMaterial({ color: 0x18181b });
    const whiteMat = new THREE.MeshLambertMaterial({ color: 0xffffff });
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x84cc16 }); // green cat eyes

    // Body
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.3, 0.6), blackMat);
    body.position.set(0, 0.15, 0);
    cat.add(body);

    const belly = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.1, 0.5), whiteMat);
    belly.position.set(0, 0.04, 0);
    cat.add(belly);

    // Head
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.28, 0.3), blackMat);
    head.position.set(0, 0.25, 0.38);
    cat.add(head);

    // Muzzle
    const muzzle = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.12, 0.1), whiteMat);
    muzzle.position.set(0, 0.2, 0.52);
    cat.add(muzzle);

    // Ears
    const earL = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.1, 0.06), blackMat);
    earL.position.set(-0.1, 0.42, 0.36);
    cat.add(earL);
    const earR = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.1, 0.06), blackMat);
    earR.position.set(0.1, 0.42, 0.36);
    cat.add(earR);

    // Eyes
    const eyeL = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.02), eyeMat);
    eyeL.position.set(-0.08, 0.28, 0.53);
    cat.add(eyeL);
    const eyeR = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.02), eyeMat);
    eyeR.position.set(0.08, 0.28, 0.53);
    cat.add(eyeR);

    // Tail
    const tail = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.4), blackMat);
    tail.position.set(0, 0.25, -0.4);
    tail.rotation.x = -0.4;
    cat.add(tail);

    this.scene.add(cat);
    this.catMesh = cat;
  }

  // Volcano Smoke Plume Particles
  private createVolcanoSmoke() {
    const pCount = 50;
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(pCount * 3);

    for (let i = 0; i < pCount; i++) {
      positions[i * 3] = -105 + (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = 22 + Math.random() * 20;
      positions[i * 3 + 2] = -25 + (Math.random() - 0.5) * 8;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const mat = new THREE.PointsMaterial({
      color: 0x78716c,
      size: 0.9,
      transparent: true,
      opacity: 0.6
    });
    this.volcanoSmoke = new THREE.Points(geo, mat);
    this.scene.add(this.volcanoSmoke);
  }

  public update(time: number, playerPos: THREE.Vector3) {
    this.updateLiveTrains(time);
    this.updateAnimatedAirplanes(time);
    this.updateWorldCitizens(time, playerPos);

    for (let i = 0; i < this.spinningIcons.length; i++) {
      const g = this.spinningIcons[i];
      g.rotation.y = time * 1.5 + i;
      g.position.y = 3.4 + Math.sin(time * 2.5 + i) * 0.12;
    }

    if (this.beaconBeam) {
      this.beaconBeam.rotation.y = time * 0.5;
      const mat = this.beaconBeam.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.5 + Math.sin(time * 3) * 0.18;
    }

    if (this.dragonManager) {
      this.dragonManager.update(0.016);
    }

    if (this.flagManager) {
      this.flagManager.update(time);
    }

    if (this.volcanoSmoke) {
      const pos = this.volcanoSmoke.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < pos.length / 3; i++) {
        pos[i * 3 + 1] += 0.06;
        if (pos[i * 3 + 1] > 46) {
          pos[i * 3 + 1] = 22;
        }
      }
      this.volcanoSmoke.geometry.attributes.position.needsUpdate = true;
    }

    if (this.portalParticles) {
      const pos = this.portalParticles.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < pos.length / 3; i++) {
        pos[i * 3 + 1] += 0.02;
        if (pos[i * 3 + 1] > 6) {
          pos[i * 3 + 1] = 2;
        }
        pos[i * 3] += Math.sin(time * 3 + i) * 0.005;
      }
      this.portalParticles.geometry.attributes.position.needsUpdate = true;
    }

    if (this.npcMesh) {
      const dist = this.npcMesh.position.distanceTo(playerPos);
      if (dist < 14) {
        const dx = playerPos.x - this.npcMesh.position.x;
        const dz = playerPos.z - this.npcMesh.position.z;
        this.npcMesh.rotation.y = Math.atan2(dx, dz);
      }
    }

    if (this.dogMesh) {
      const dist = this.dogMesh.position.distanceTo(playerPos);
      if (dist < 14) {
        const dx = playerPos.x - this.dogMesh.position.x;
        const dz = playerPos.z - this.dogMesh.position.z;
        this.dogMesh.rotation.y = Math.atan2(dx, dz);
      }
      if (this.dogTailMesh) {
        this.dogTailMesh.rotation.y = Math.sin(time * 6) * 0.32;
      }
    }
  }

  private createRailway() {
    // Grand Continental Island Express Rapid Transit Loop (Collision-Free Continuous Circuit)
    const route = [
      new THREE.Vector3(58, 5.0, 33),   // Crossroads Central Station Elevated Through-Track
      new THREE.Vector3(74, 5.0, 33),   // Station East Portal Viaduct
      new THREE.Vector3(92, 5.0, 33),   // High Viaduct over East Highway (4+ block road clearance)
      new THREE.Vector3(104, 5.0, 32),  // Elevated crossing south of project avenue (Z=32 > Z=20)
      new THREE.Vector3(116, 5.0, 28),  // Neo York Skyway Station Platform (Elevated Skyway)
      new THREE.Vector3(124, 5.0, 38),  // Eastern Bay Scenic Viaduct
      new THREE.Vector3(128, 5.0, 48),  // Airport Terminal Skyport Station Platform (North Concourse)
      new THREE.Vector3(144, 5.0, 50),  // Airport East Approach Viaduct
      new THREE.Vector3(158, 5.0, 64),  // East Bay Viaduct (clear of ATC Tower at 142, 58)
      new THREE.Vector3(174, 5.0, 78),  // East Coastal Viaduct
      new THREE.Vector3(180, 5.0, 88),  // East Coastal Viaduct (clear of runway threshold at 165)
      new THREE.Vector3(174, 5.0, 98),  // South Coast Turn (clear of runway at Z=90)
      new THREE.Vector3(144, 5.0, 98),  // South Coastal Viaduct (clear of runway at Z=90)
      new THREE.Vector3(112, 5.0, 98),  // South Coastal Viaduct (clear of runway at Z=90)
      new THREE.Vector3(80, 5.0, 96),   // Harbor Bay Scenic Viaduct
      new THREE.Vector3(50, 5.0, 92),   // Grand Carnival Approach Viaduct
      new THREE.Vector3(24, 5.0, 88),   // South Coast Beach & Pier Station Platform
      new THREE.Vector3(12, 5.0, 74),   // South meadow scenic viaduct
      new THREE.Vector3(8, 5.0, 54),    // Riverbank straightaway viaduct
      new THREE.Vector3(6, 5.0, 36),    // Citadel south approach viaduct
      new THREE.Vector3(8, 5.0, 22),    // Citadel Gateway Station Platform
      new THREE.Vector3(22, 5.0, 22),   // Eastbound viaduct through park
      new THREE.Vector3(38, 5.0, 27),   // Civic Quarter boulevard approach viaduct
      new THREE.Vector3(48, 5.0, 32),   // Central Station West Portal
    ];

    // Closed loop CatmullRomCurve3 so trains run endlessly without turning around or colliding
    this.railCurve = new THREE.CatmullRomCurve3(route, true, 'centripetal');

    const railMaterial = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9, roughness: 0.22 });
    const tieMaterial = new THREE.MeshLambertMaterial({ color: 0x5c4033 });
    const supportMaterial = new THREE.MeshLambertMaterial({ color: 0x475569 });
    const gantryMaterial = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8, roughness: 0.3 });
    const insulatorMaterial = new THREE.MeshLambertMaterial({ color: 0xe2e8f0 });
    const railRadius = 0.08;
    const railLength = this.railCurve.getLength();

    // 1. Dual Polished Steel Tube Rails (Closed continuous loop)
    const numRailSamples = 360;
    for (const side of [-0.52, 0.52]) {
      const railPoints: THREE.Vector3[] = [];
      for (let i = 0; i < numRailSamples; i++) {
        const u = i / numRailSamples;
        const pt = this.railCurve.getPointAt(u);
        const tangent = this.railCurve.getTangentAt(u);
        const normal = new THREE.Vector3(tangent.z, 0, -tangent.x).normalize();
        railPoints.push(pt.clone().addScaledVector(normal, side));
      }
      const railSubCurve = new THREE.CatmullRomCurve3(railPoints, true, 'centripetal');
      const rail = new THREE.Mesh(new THREE.TubeGeometry(railSubCurve, 360, railRadius, 8, true), railMaterial);
      rail.castShadow = true;
      rail.receiveShadow = true;
      this.scene.add(rail);
    }

    // 2. Timber Sleepers, Elevated Viaduct Piers, and Overhead Electrification Gantries
    for (let distance = 0; distance < railLength; distance += 1.4) {
      const t = this.railCurve.getUtoTmapping(0, distance);
      const point = this.railCurve.getPointAt(t);
      const tangent = this.railCurve.getTangentAt(t);

      // Authentic timber cross-ties
      const sleeper = new THREE.Mesh(new THREE.BoxGeometry(1.48, 0.14, 0.28), tieMaterial);
      sleeper.position.copy(point);
      sleeper.position.y -= 0.11;
      sleeper.rotation.y = Math.atan2(-tangent.z, tangent.x) + Math.PI / 2;
      sleeper.castShadow = true;
      this.scene.add(sleeper);

      // Elevated viaduct support piers
      if (point.y > 2.2 && Math.round(distance) % 7 < 2) {
        const support = new THREE.Mesh(new THREE.BoxGeometry(0.55, point.y + 0.1, 0.55), supportMaterial);
        support.position.set(point.x, point.y / 2, point.z);
        support.castShadow = true;
        support.receiveShadow = true;
        this.scene.add(support);
      }

      // Overhead Electrification Catenary Gantry Masts every ~22m
      if (Math.floor(distance) % 22 === 0 && distance > 2) {
        const gantry = new THREE.Group();
        // Steel Mast
        const mast = new THREE.Mesh(new THREE.BoxGeometry(0.2, 4.2, 0.2), gantryMaterial);
        mast.position.set(0, 2.1, 1.4);
        gantry.add(mast);

        // Cantilever Arm spanning across track
        const arm = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.14, 2.4), gantryMaterial);
        arm.position.set(0, 4.0, 0.3);
        gantry.add(arm);

        // Insulator
        const ins = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.35, 8), insulatorMaterial);
        ins.position.set(0, 3.75, 0);
        gantry.add(ins);

        gantry.position.copy(point);
        gantry.rotation.y = Math.atan2(-tangent.z, tangent.x);
        this.scene.add(gantry);
      }
    }

    // 3. Two Synchronized Live Express Trains (Safe 180° Headway on Continuous Loop)
    this.liveTrains = [
      this.createTrain(0x1e3a8a, 0xf59e0b), // Crossroads Express (Royal Navy & Gold)
      this.createTrain(0x047857, 0xfbbf24)  // Airport Shuttle (Emerald & Amber)
    ];
    this.liveTrains.forEach((train) => this.scene.add(train));
  }

  private createTrain(bodyColor: number, accentColor: number) {
    const train = new THREE.Group();
    const bodyMaterial = new THREE.MeshStandardMaterial({ color: bodyColor, metalness: 0.55, roughness: 0.35 });
    const accentMaterial = new THREE.MeshStandardMaterial({ color: accentColor, metalness: 0.65, roughness: 0.25 });
    const chromeMaterial = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.88, roughness: 0.15 });
    const glassMaterial = new THREE.MeshStandardMaterial({ color: 0x93c5fd, emissive: 0x1d4ed8, emissiveIntensity: 0.35, transparent: true, opacity: 0.72 });
    const darkMaterial = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.8, roughness: 0.3 });
    const woodFloorMaterial = new THREE.MeshLambertMaterial({ color: 0x78350f });
    const seatMaterial = new THREE.MeshLambertMaterial({ color: 0xd97706 });
    const diningTableMaterial = new THREE.MeshLambertMaterial({ color: 0xfef3c7 });
    const headlightMaterial = new THREE.MeshBasicMaterial({ color: 0xfef08a });

    // Car 0: High-Speed Bullet Streamliner Locomotive Engine
    const loco = new THREE.Group();
    const chassis = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.35, 1.6), darkMaterial);
    chassis.position.y = 0.38;
    loco.add(chassis);

    // Bullet-nosed Aerodynamic Cowcatcher & Wedge Front
    const cowcatcher = new THREE.Mesh(new THREE.ConeGeometry(0.85, 1.2, 4), darkMaterial);
    cowcatcher.rotation.z = -Math.PI / 2;
    cowcatcher.rotation.y = Math.PI / 4;
    cowcatcher.position.set(2.2, 0.45, 0);
    loco.add(cowcatcher);

    // Streamlined Bullet Hood
    const bulletNose = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.78, 1.3, 16), accentMaterial);
    bulletNose.rotation.z = Math.PI / 2;
    bulletNose.position.set(1.6, 1.05, 0);
    loco.add(bulletNose);

    // Main Engine Body with chrome speed stripes
    const body = new THREE.Mesh(new THREE.BoxGeometry(3.0, 1.35, 1.55), bodyMaterial);
    body.position.set(0.1, 1.2, 0);
    loco.add(body);

    const stripe = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.12, 1.58), chromeMaterial);
    stripe.position.set(0.1, 1.25, 0);
    loco.add(stripe);

    // Elevated Engineer Cab with wraparound panoramic glass
    const cab = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.78, 1.48), accentMaterial);
    cab.position.set(-0.35, 2.0, 0);
    loco.add(cab);

    const windshield = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.55, 1.3), glassMaterial);
    windshield.position.set(0.32, 2.0, 0);
    loco.add(windshield);

    // Triple High-Intensity Halogen Headlights (1 central apex + 2 bumper markers)
    const topHL = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.22, 0.22), headlightMaterial);
    topHL.position.set(2.15, 1.2, 0);
    loco.add(topHL);

    for (const z of [-0.48, 0.48]) {
      const hl = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.2, 0.2), headlightMaterial);
      hl.position.set(2.25, 0.75, z);
      loco.add(hl);
    }

    // Chrome Exhaust Stacks
    const exhaust = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.16, 0.6, 12), chromeMaterial);
    exhaust.position.set(0.8, 2.05, 0);
    loco.add(exhaust);

    // Heavy Locomotive Wheel Bogies
    for (const z of [-0.82, 0.82]) {
      for (const x of [-1.3, -0.5, 0.5, 1.3]) {
        const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.14, 16), chromeMaterial);
        wheel.rotation.x = Math.PI / 2;
        wheel.position.set(x, 0.28, z);
        loco.add(wheel);
      }
    }
    train.add(loco);

    // Car 1: Vista-Dome Panoramic Glass Observation Lounge (Rideable Car!)
    const vistaCar = new THREE.Group();
    vistaCar.position.x = -4.0;

    const vChassis = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.28, 1.6), darkMaterial);
    vChassis.position.y = 0.38;
    vistaCar.add(vChassis);

    const vFloor = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.08, 1.5), woodFloorMaterial);
    vFloor.position.y = 0.54;
    vistaCar.add(vFloor);

    // Streamlined lower hull
    const vLowerWall = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.65, 1.55), bodyMaterial);
    vLowerWall.position.set(0, 0.85, 0);
    vistaCar.add(vLowerWall);

    // Full Upper Vista-Dome Glass Roof
    const domeRoof = new THREE.Mesh(new THREE.CylinderGeometry(0.76, 0.76, 3.4, 16, 1, false, 0, Math.PI), glassMaterial);
    domeRoof.rotation.z = Math.PI / 2;
    domeRoof.position.set(0, 1.55, 0);
    vistaCar.add(domeRoof);

    // Chrome Vista Ribs
    for (const rx of [-1.2, 0, 1.2]) {
      const rib = new THREE.Mesh(new THREE.TorusGeometry(0.77, 0.04, 8, 16, Math.PI), chromeMaterial);
      rib.rotation.y = Math.PI / 2;
      rib.position.set(rx, 1.55, 0);
      vistaCar.add(rib);
    }

    // Luxury plush leather swivel seats
    for (const sx of [-1.1, 0, 1.1]) {
      for (const sz of [-0.45, 0.45]) {
        const seat = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.38, 0.45), seatMaterial);
        seat.position.set(sx, 0.74, sz);
        vistaCar.add(seat);
      }
    }

    // Dome overhead chandelier lights
    const vLamp = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.08, 0.4), headlightMaterial);
    vLamp.position.set(0, 2.1, 0);
    vistaCar.add(vLamp);

    // Bogie wheels
    for (const z of [-0.82, 0.82]) {
      for (const x of [-1.2, 1.2]) {
        const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.12, 12), darkMaterial);
        wheel.rotation.x = Math.PI / 2;
        wheel.position.set(x, 0.24, z);
        vistaCar.add(wheel);
      }
    }
    train.add(vistaCar);

    // Car 2: Luxury Dining & Club Lounge Car
    const dinerCar = new THREE.Group();
    dinerCar.position.x = -7.8;

    const dChassis = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.28, 1.6), darkMaterial);
    dChassis.position.y = 0.38;
    dinerCar.add(dChassis);

    const dRoof = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.24, 1.55), accentMaterial);
    dRoof.position.set(0, 2.05, 0);
    dinerCar.add(dRoof);

    // Side walls with large panoramic windows
    for (const z of [-0.78, 0.78]) {
      const wall = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.55, 0.08), bodyMaterial);
      wall.position.set(0, 0.82, z);
      dinerCar.add(wall);

      for (const wx of [-1.0, 1.0]) {
        const win = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.68, 0.06), glassMaterial);
        win.position.set(wx, 1.45, z);
        dinerCar.add(win);
      }
    }

    // Dining tables and linen tablecloths
    for (const tx of [-1.0, 1.0]) {
      const table = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.42, 0.9), diningTableMaterial);
      table.position.set(tx, 0.75, 0);
      dinerCar.add(table);
    }

    // Wheels
    for (const z of [-0.82, 0.82]) {
      for (const x of [-1.2, 1.2]) {
        const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.12, 12), darkMaterial);
        wheel.rotation.x = Math.PI / 2;
        wheel.position.set(x, 0.24, z);
        dinerCar.add(wheel);
      }
    }
    train.add(dinerCar);

    train.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });

    return train;
  }

  private updateLiveTrains(time: number) {
    if (!this.railCurve || this.liveTrains.length === 0) return;
    const routeLength = this.railCurve.getLength();
    const cruiseSpeed = 7.5; // Blocks per second

    this.liveTrains.forEach((train, index) => {
      // Both trains cruise forward in the same safe direction on the closed loop with 180° headway
      const phase = ((time * cruiseSpeed + index * 0.5 * routeLength) % routeLength + routeLength) % routeLength;
      const t = this.railCurve!.getUtoTmapping(0, phase);
      const position = this.railCurve!.getPointAt(t);
      const tangent = this.railCurve!.getTangentAt(t);
      train.position.set(position.x, position.y + 0.14, position.z);
      train.rotation.y = Math.atan2(-tangent.z, tangent.x);
    });
  }

  public getLiveTrains(): THREE.Group[] {
    return this.liveTrains;
  }

  public getRailCurve(): THREE.CatmullRomCurve3 | null {
    return this.railCurve;
  }

  public getTrainPosition(index = 0): THREE.Vector3 | null {
    if (!this.liveTrains[index]) return null;
    return this.liveTrains[index].position;
  }

  public getNearestTrain(playerPos: THREE.Vector3): { index: number; distance: number; position: THREE.Vector3 } | null {
    if (this.liveTrains.length === 0) return null;
    let closestIndex = 0;
    let minDistance = Infinity;
    this.liveTrains.forEach((train, idx) => {
      // Check distance to locomotive and both passenger coaches
      const locoDist = playerPos.distanceTo(train.position);
      const coachOffset = new THREE.Vector3(-4.0, 1.35, 0).applyAxisAngle(new THREE.Vector3(0, 1, 0), train.rotation.y);
      const coachDist = playerPos.distanceTo(train.position.clone().add(coachOffset));
      const dinerOffset = new THREE.Vector3(-7.8, 1.35, 0).applyAxisAngle(new THREE.Vector3(0, 1, 0), train.rotation.y);
      const dinerDist = playerPos.distanceTo(train.position.clone().add(dinerOffset));
      const effectiveDist = Math.min(locoDist, coachDist, dinerDist);
      if (effectiveDist < minDistance) {
        minDistance = effectiveDist;
        closestIndex = idx;
      }
    });
    return {
      index: closestIndex,
      distance: minDistance,
      position: this.liveTrains[closestIndex].position
    };
  }

  public getTrainRideTransform(index = 0): { position: THREE.Vector3, rotationY: number } | null {
    const train = this.liveTrains[index];
    if (!train) return null;
    // Seated comfortably in the Vista-Dome Observation Car 1
    const coachOffset = new THREE.Vector3(-4.0, 1.35, 0);
    coachOffset.applyAxisAngle(new THREE.Vector3(0, 1, 0), train.rotation.y);
    const seatPos = train.position.clone().add(coachOffset);
    return { position: seatPos, rotationY: train.rotation.y };
  }

  public getNearestStation(pos: THREE.Vector3, threshold = 18): string | null {
    for (const st of VoxelWorld.STATIONS) {
      if (pos.distanceTo(st.pos) <= threshold) {
        return st.name;
      }
    }
    return null;
  }

  // -------------------------------------------------------------
  // ANIMATED COMMERCIAL AIRPLANES: REALISTIC TAKEOFF & LANDING SYSTEM
  // -------------------------------------------------------------
  private createAnimatedAirplanes() {
    // Build high-detail commercial twinjet airliner (Airbus / Boeing style)
    const plane = new THREE.Group();

    const whiteMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.3, metalness: 0.2 });
    const blueMat = new THREE.MeshStandardMaterial({ color: 0x1d4ed8, roughness: 0.35, metalness: 0.5 });
    const silverMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.25, metalness: 0.85 });
    const cockpitGlass = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.1, metalness: 0.9, transparent: true, opacity: 0.85 });
    const tireMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.8 });
    const redStrobe = new THREE.MeshBasicMaterial({ color: 0xef4444 });
    const greenStrobe = new THREE.MeshBasicMaterial({ color: 0x22c55e });
    const whiteBeacon = new THREE.MeshBasicMaterial({ color: 0xffffff });

    // 1. Aerodynamic Main Fuselage Tube (Length ~10, Radius ~0.9)
    const fuselage = new THREE.Mesh(new THREE.CylinderGeometry(0.88, 0.88, 8.5, 18), whiteMat);
    fuselage.rotation.z = Math.PI / 2;
    plane.add(fuselage);

    // Streamlined Nose Cone
    const nose = new THREE.Mesh(new THREE.ConeGeometry(0.88, 2.2, 18), whiteMat);
    nose.rotation.z = -Math.PI / 2;
    nose.position.x = 5.35;
    plane.add(nose);

    // Tail Taper Cone
    const tailCone = new THREE.Mesh(new THREE.ConeGeometry(0.88, 2.8, 18), blueMat);
    tailCone.rotation.z = Math.PI / 2;
    tailCone.position.x = -5.65;
    plane.add(tailCone);

    // Cockpit Windshield (angled wrap-around windows)
    const cockpit = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.45, 1.1), cockpitGlass);
    cockpit.position.set(4.6, 0.45, 0);
    cockpit.rotation.z = -0.32;
    plane.add(cockpit);

    // Cabin Windows rows along port & starboard sides
    for (let x = -2.8; x <= 3.2; x += 0.8) {
      for (const z of [-0.89, 0.89]) {
        const win = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.22, 0.05), cockpitGlass);
        win.position.set(x, 0.15, z);
        plane.add(win);
      }
    }

    // 2. Swept-Back Main Wings with Upright Winglets (Wingspan ~12)
    const wingGeo = new THREE.BoxGeometry(2.4, 0.14, 6.2);
    const starWing = new THREE.Mesh(wingGeo, silverMat);
    starWing.position.set(-0.3, -0.15, -3.4);
    starWing.rotation.y = 0.28; // Sweep back
    starWing.rotation.x = -0.05; // Dihedral angle
    plane.add(starWing);

    const portWing = new THREE.Mesh(wingGeo, silverMat);
    portWing.position.set(-0.3, -0.15, 3.4);
    portWing.rotation.y = -0.28;
    portWing.rotation.x = 0.05;
    plane.add(portWing);

    // Upright Winglets
    const starWinglet = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.65, 0.08), blueMat);
    starWinglet.position.set(-0.9, 0.22, -6.4);
    plane.add(starWinglet);

    const portWinglet = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.65, 0.08), blueMat);
    portWinglet.position.set(-0.9, 0.22, 6.4);
    plane.add(portWinglet);

    // 3. High-Bypass Turbofan Jet Engines under Wings
    for (const z of [-2.6, 2.6]) {
      const engine = new THREE.Group();
      engine.position.set(0.6, -0.65, z);

      // Pylon
      const pylon = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.4, 0.12), silverMat);
      pylon.position.y = 0.25;
      engine.add(pylon);

      // Nacelle
      const nacelle = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.44, 2.1, 16), silverMat);
      nacelle.rotation.z = Math.PI / 2;
      engine.add(nacelle);

      // Intake cone spinner
      const spinner = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.5, 12), tireMat);
      spinner.rotation.z = -Math.PI / 2;
      spinner.position.x = 1.05;
      engine.add(spinner);

      // Jet exhaust flare
      const exhaust = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.38, 0.4, 12), tireMat);
      exhaust.rotation.z = Math.PI / 2;
      exhaust.position.x = -1.1;
      engine.add(exhaust);

      plane.add(engine);
    }

    // 4. Vertical Stabilizer (Fin) & Horizontal Stabilizers
    const fin = new THREE.Mesh(new THREE.BoxGeometry(1.8, 2.5, 0.16), blueMat);
    fin.position.set(-5.1, 1.85, 0);
    fin.rotation.z = -0.45; // Swept back
    plane.add(fin);

    const hStabGeo = new THREE.BoxGeometry(1.2, 0.1, 2.2);
    for (const z of [-1.3, 1.3]) {
      const hStab = new THREE.Mesh(hStabGeo, silverMat);
      hStab.position.set(-5.6, 0.55, z);
      hStab.rotation.y = (z < 0 ? 0.25 : -0.25);
      plane.add(hStab);
    }

    // 5. Navigation Strobes & Beacons
    const pStrobe = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 8), redStrobe);
    pStrobe.position.set(-0.9, 0.55, 6.4);
    plane.add(pStrobe);
    this.airplaneStrobes.push(pStrobe);

    const sStrobe = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 8), greenStrobe);
    sStrobe.position.set(-0.9, 0.55, -6.4);
    plane.add(sStrobe);
    this.airplaneStrobes.push(sStrobe);

    const topBeacon = new THREE.Mesh(new THREE.SphereGeometry(0.14, 8, 8), whiteBeacon);
    topBeacon.position.set(0.2, 0.95, 0);
    plane.add(topBeacon);
    this.airplaneStrobes.push(topBeacon);

    // 6. Retractable Tricycle Landing Gear (Hinged Group for Takeoff & Landing)
    const gearGroup = new THREE.Group();

    // Nose Gear (forward)
    const nStrut = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.9, 8), silverMat);
    nStrut.position.set(4.4, -0.65, 0);
    gearGroup.add(nStrut);

    const nWheel = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.16, 12), tireMat);
    nWheel.rotation.x = Math.PI / 2;
    nWheel.position.set(4.4, -1.05, 0);
    gearGroup.add(nWheel);

    // Main Gear (Twin bogies under wings)
    for (const z of [-1.8, 1.8]) {
      const mStrut = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.95, 8), silverMat);
      mStrut.position.set(-0.2, -0.68, z);
      gearGroup.add(mStrut);

      for (const wx of [-0.2, 0.2]) {
        const mWheel = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.16, 12), tireMat);
        mWheel.rotation.x = Math.PI / 2;
        mWheel.position.set(-0.2 + wx, -1.1, z);
        gearGroup.add(mWheel);
      }
    }

    plane.add(gearGroup);
    this.airplaneWheels.push(gearGroup);

    plane.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
    });

    plane.position.set(88, 2.6, 85);
    this.scene.add(plane);
    this.animatedAirplanes.push(plane);
  }

  private updateAnimatedAirplanes(time: number) {
    if (this.animatedAirplanes.length === 0) return;

    // Strobe light flashing (flash every 1 second)
    const flash = (time % 1.0) < 0.25;
    for (const strobe of this.airplaneStrobes) {
      strobe.visible = flash;
    }

    // 44-second complete realistic flight loop:
    // 0..8s: Takeoff Roll on Runway 09 (accelerating from X = 88 to 142 at Y = 2.6, pitch 0)
    // 8..14s: Rotation & Climbout (+14 deg pitch, gear retracts, climbs Y: 2.6 -> 26, X: 142 -> 200)
    // 14..22s: Deep Blue Sky Coastal Turn (banking 28 deg left, climbing Y: 26 -> 48, sweeping towards North)
    // 22..30s: Scenic High Altitude Cruise over Mountains & World Capitals (Y = 48, heading West)
    // 30..36s: Descent & Base-to-Final Turn (gear extends, descending Y: 48 -> 18, lining up Runway 09)
    // 36..40s: 3-degree Glideslope Final Approach & Flare (Y: 18 -> 2.6, X: 45 -> 88)
    // 40..44s: Touchdown & Reverse Thrust Deceleration Rollout (X: 88 -> 138 -> resets to 88)

    const cycle = 44.0;
    const t = time % cycle;
    const plane = this.animatedAirplanes[0];
    const gear = this.airplaneWheels[0];

    const runwayZ = 85.0;
    const groundY = 2.6; // Wheels touching the asphalt surface

    if (t < 8.0) {
      // 1. Takeoff Roll on Runway 09
      const progress = t / 8.0;
      // Acceleration: x(t) = x0 + a * t^2
      const x = 88.0 + progress * progress * 56.0;
      plane.position.set(x, groundY, runwayZ);
      plane.rotation.set(0, 0, 0); // Facing East (+X)
      if (gear) gear.scale.set(1, 1, 1); // Gear locked down
    } else if (t < 14.0) {
      // 2. Rotation, Lift-off & Initial Climbout
      const p = (t - 8.0) / 6.0;
      const x = 144.0 + p * 58.0;
      const y = groundY + Math.pow(p, 1.4) * 24.0;
      plane.position.set(x, y, runwayZ);
      // Pitch nose up +14 degrees
      plane.rotation.set(0, 0, THREE.MathUtils.degToRad(14 * Math.min(1, p * 2.5)));
      // Retract landing gear seamlessly
      if (gear) {
        const gearScale = Math.max(0.001, 1 - p * 2.0);
        gear.scale.set(gearScale, gearScale, gearScale);
      }
    } else if (t < 22.0) {
      // 3. Coastal Ocean Climb & Banking Left Turn towards North
      const p = (t - 14.0) / 8.0;
      const angle = p * Math.PI; // 0 to PI (turning from +X to -X)
      // Turn radius ~65
      const cx = 202.0;
      const cz = runwayZ - 65.0;
      const x = cx + Math.sin(angle) * 35.0;
      const z = cz + Math.cos(angle) * 65.0;
      const y = 26.6 + p * 20.0; // Climb to 46.6m
      plane.position.set(x, y, z);
      // Tangent heading + Left bank roll
      const heading = Math.PI / 2 + angle;
      const bank = THREE.MathUtils.degToRad(-26);
      plane.rotation.set(bank, heading, THREE.MathUtils.degToRad(4));
      if (gear) gear.scale.set(0.001, 0.001, 0.001); // Fully retracted
    } else if (t < 30.0) {
      // 4. High-Altitude Scenic Mountain & Metropolis Cruise
      const p = (t - 22.0) / 8.0;
      const x = 202.0 - p * 210.0; // Flying West from X=202 down to X=-8
      const z = runwayZ - 130.0 + Math.sin(p * Math.PI) * 15.0;
      const y = 46.6 + Math.sin(p * Math.PI) * 4.0;
      plane.position.set(x, y, z);
      plane.rotation.set(0, Math.PI, 0); // Heading West
      if (gear) gear.scale.set(0.001, 0.001, 0.001);
    } else if (t < 36.0) {
      // 5. Base Leg, Gear Extension & Intercepting Runway 09 Final Approach
      const p = (t - 30.0) / 6.0;
      const angle = Math.PI + p * Math.PI; // PI to 2PI (turning back to face East)
      const cx = 35.0;
      const cz = runwayZ - 65.0;
      const x = cx + Math.sin(angle) * 42.0;
      const z = cz + Math.cos(angle) * 65.0;
      const y = 46.6 - p * 30.0; // Descend to 16.6m
      plane.position.set(x, y, z);
      const heading = Math.PI / 2 + angle;
      const bank = THREE.MathUtils.degToRad(22 * (1 - p));
      plane.rotation.set(-bank, heading, THREE.MathUtils.degToRad(-3));
      // Extend landing gear smoothly
      if (gear) {
        const gearScale = Math.min(1.0, Math.max(0.001, (p - 0.4) * 2.5));
        gear.scale.set(gearScale, gearScale, gearScale);
      }
    } else if (t < 40.0) {
      // 6. Final Approach on 3-degree Glideslope & Runway Threshold Flare
      const p = (t - 36.0) / 4.0;
      const x = 35.0 + p * 54.0; // from X=35 to X=89 (Runway 09 threshold)
      const y = 16.6 - p * 14.0; // Touchdown at Y = 2.6
      plane.position.set(x, Math.max(groundY, y), runwayZ);
      // Aerodynamic flare: nose pitched up +5 degrees just before touchdown
      const flare = THREE.MathUtils.degToRad(5 * (1 - p * 0.4));
      plane.rotation.set(0, 0, flare);
      if (gear) gear.scale.set(1, 1, 1);
    } else {
      // 7. Touchdown Rollout & Thrust Reverser Deceleration on Runway 09
      const p = (t - 40.0) / 4.0;
      // Decelerating rollout: v(t) decreasing
      const x = 89.0 + (p - 0.5 * p * p) * 75.0;
      plane.position.set(x, groundY, runwayZ);
      plane.rotation.set(0, 0, 0); // Flat on landing gear
      if (gear) gear.scale.set(1, 1, 1);
    }
  }

  // Driveable Bajaj Auto-Rickshaw
  private createAutoRickshaw() {
    const rickshaw = new THREE.Group();
    const greenMat = new THREE.MeshStandardMaterial({ color: 0x15803d, metalness: 0.4, roughness: 0.4 });
    const yellowMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.3, roughness: 0.5 });
    const blackMat = new THREE.MeshStandardMaterial({ color: 0x18181b, metalness: 0.6, roughness: 0.4 });
    const lightMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });

    const floor = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.18, 2.2), greenMat);
    floor.position.y = 0.32;
    rickshaw.add(floor);

    const frontFender = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.35, 0.65), greenMat);
    frontFender.position.set(0, 0.55, 1.05);
    rickshaw.add(frontFender);

    const frontWheel = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.26, 0.16, 12), blackMat);
    frontWheel.rotation.z = Math.PI / 2;
    frontWheel.position.set(0, 0.26, 1.05);
    rickshaw.add(frontWheel);

    for (const side of [-0.68, 0.68]) {
      const rearWheel = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.26, 0.16, 12), blackMat);
      rearWheel.rotation.z = Math.PI / 2;
      rearWheel.position.set(side, 0.26, -0.65);
      rickshaw.add(rearWheel);
    }

    const roof = new THREE.Mesh(new THREE.BoxGeometry(1.42, 0.16, 1.85), yellowMat);
    roof.position.set(0, 1.82, -0.15);
    rickshaw.add(roof);

    for (const x of [-0.64, 0.64]) {
      for (const z of [-0.98, 0.68]) {
        const pillar = new THREE.Mesh(new THREE.BoxGeometry(0.06, 1.35, 0.06), blackMat);
        pillar.position.set(x, 1.08, z);
        rickshaw.add(pillar);
      }
    }

    const driverSeat = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.32, 0.45), blackMat);
    driverSeat.position.set(0, 0.58, 0.35);
    rickshaw.add(driverSeat);

    const passengerSeat = new THREE.Mesh(new THREE.BoxGeometry(1.22, 0.38, 0.55), blackMat);
    passengerSeat.position.set(0, 0.62, -0.65);
    rickshaw.add(passengerSeat);

    const headlight = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.08, 12), lightMat);
    headlight.rotation.x = Math.PI / 2;
    headlight.position.set(0, 0.65, 1.38);
    rickshaw.add(headlight);

    const handlebar = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.06, 0.06), blackMat);
    handlebar.position.set(0, 0.88, 0.75);
    rickshaw.add(handlebar);

    rickshaw.position.set(14, 1.0, 8); // Parked near Crossroads Citadel East Gate
    rickshaw.rotation.y = -Math.PI / 2;
    rickshaw.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
    });

    this.scene.add(rickshaw);
    this.autoRickshawMesh = rickshaw;
  }

  public getAutoRickshawPosition(): THREE.Vector3 | null {
    if (!this.autoRickshawMesh) return null;
    return this.autoRickshawMesh.position;
  }

  public updateAutoRickshaw(pos: THREE.Vector3, rotY: number) {
    if (!this.autoRickshawMesh) return;
    this.autoRickshawMesh.position.set(pos.x, pos.y - 0.2, pos.z);
    this.autoRickshawMesh.rotation.y = rotY;
  }

  public getAutoRickshawRideTransform(): { position: THREE.Vector3, rotationY: number } | null {
    if (!this.autoRickshawMesh) return null;
    const seatOffset = new THREE.Vector3(0, 0.9, 0.35);
    seatOffset.applyAxisAngle(new THREE.Vector3(0, 1, 0), this.autoRickshawMesh.rotation.y);
    const seatPos = this.autoRickshawMesh.position.clone().add(seatOffset);
    return { position: seatPos, rotationY: this.autoRickshawMesh.rotation.y };
  }

  // -------------------------------------------------------------
  // LIVING WORLD CITIZENS: CULTURALLY AUTHENTIC RESIDENTS
  // -------------------------------------------------------------
  private createWorldCitizens() {
    interface CitizenConfig {
      name: string;
      role: string;
      x: number;
      y: number;
      z: number;
      heading: number;
      skinColor: number;
      shirtColor: number;
      pantsColor: number;
      hairColor: number;
      tagColor: string;
      hatType?: 'turban' | 'beret' | 'cap' | 'none';
      hatColor?: number;
    }

    const citizens: CitizenConfig[] = [
      // 1. Imperial India Realm: Saffron turbans, sherwanis, kurtas near Taj Mahal & Ghats
      { name: 'Aarav Sharma', role: 'Varanasi Ghat Pundit', x: 74, y: 2, z: -112, heading: Math.PI / 2, skinColor: 0x8d5524, shirtColor: 0xe0e7ff, pantsColor: 0xf59e0b, hairColor: 0x111111, tagColor: '#f97316', hatType: 'turban', hatColor: 0xf97316 },
      { name: 'Priya Patel', role: 'Classical Sitar Maestro', x: 86, y: 2, z: -116, heading: -Math.PI / 2, skinColor: 0xc68642, shirtColor: 0xd97706, pantsColor: 0xb45309, hairColor: 0x09090b, tagColor: '#f59e0b', hatType: 'none' },
      { name: 'Rajesh Kumar', role: 'Dhaba Chai Master', x: 44, y: 2, z: -76, heading: 0, skinColor: 0xa0522d, shirtColor: 0xef4444, pantsColor: 0x1e293b, hairColor: 0x18181b, tagColor: '#ef4444', hatType: 'turban', hatColor: 0xd97706 },
      { name: 'Kavita Iyer', role: 'Silk Sari Weaver', x: 80, y: 2, z: -140, heading: Math.PI, skinColor: 0xb57339, shirtColor: 0xec4899, pantsColor: 0xbe185d, hairColor: 0x09090b, tagColor: '#ec4899', hatType: 'none' },

      // 2. Tokyo Shibuya Realm: Shibuya fashion, Harajuku, salaryman, student
      { name: 'Kenji Sato', role: 'Shibuya Tech Architect', x: -152, y: 2, z: -78, heading: Math.PI / 4, skinColor: 0xffdbac, shirtColor: 0x1e293b, pantsColor: 0x0f172a, hairColor: 0x18181b, tagColor: '#38bdf8', hatType: 'none' },
      { name: 'Hana Tanaka', role: 'Harajuku Anime Artist', x: -148, y: 2, z: -84, heading: -Math.PI * 0.75, skinColor: 0xffe0bd, shirtColor: 0xf43f5e, pantsColor: 0x4f46e5, hairColor: 0xec4899, tagColor: '#f43f5e', hatType: 'beret', hatColor: 0x18181b },
      { name: 'Daiki Takahashi', role: 'Shinkansen Conductor', x: -155, y: 2, z: -94, heading: 0, skinColor: 0xf1c27d, shirtColor: 0x1e3a8a, pantsColor: 0x1e3a8a, hairColor: 0x18181b, tagColor: '#2563eb', hatType: 'cap', hatColor: 0x1e3a8a },

      // 3. Seoul Gwanghwamun Realm: Modern K-pop & palace heritage
      { name: 'Min-Jun Park', role: 'Seoul Game Producer', x: -62, y: 2, z: -92, heading: Math.PI / 3, skinColor: 0xffe0bd, shirtColor: 0x3b82f6, pantsColor: 0x18181b, hairColor: 0x27272a, tagColor: '#60a5fa', hatType: 'cap', hatColor: 0x18181b },
      { name: 'Ji-Eun Kim', role: 'Hanbok Artisan', x: -68, y: 2, z: -96, heading: -Math.PI / 4, skinColor: 0xffdbac, shirtColor: 0x10b981, pantsColor: 0x047857, hairColor: 0x111111, tagColor: '#34d399', hatType: 'none' },

      // 4. Hollywood & Times Square USA Realm: Directors, film stars, reporters
      { name: 'Scarlett Miller', role: 'Hollywood Film Director', x: 130, y: 2, z: -30, heading: Math.PI, skinColor: 0xf5d0b5, shirtColor: 0x18181b, pantsColor: 0x27272a, hairColor: 0xb45309, tagColor: '#f59e0b', hatType: 'beret', hatColor: 0x18181b },
      { name: 'Jack Sullivan', role: 'Broadway Choreographer', x: 124, y: 2, z: -32, heading: 0, skinColor: 0xffdbac, shirtColor: 0xe11d48, pantsColor: 0x0f172a, hairColor: 0x475569, tagColor: '#f43f5e', hatType: 'none' },
      { name: 'Chloe Davis', role: 'Sunset Boulevard Vlogger', x: 136, y: 2, z: -34, heading: -Math.PI / 2, skinColor: 0xf2c49b, shirtColor: 0x06b6d4, pantsColor: 0xffffff, hairColor: 0xfacc15, tagColor: '#22d3ee', hatType: 'cap', hatColor: 0xfacc15 },

      // 5. London Westminster & Big Ben Realm
      { name: 'Oliver Wright', role: 'Royal Guard Guide', x: -30, y: 2, z: -68, heading: Math.PI / 2, skinColor: 0xffe0bd, shirtColor: 0xdc2626, pantsColor: 0x111827, hairColor: 0x78350f, tagColor: '#ef4444', hatType: 'cap', hatColor: 0x111827 },
      { name: 'Emma Watson', role: 'London Historian', x: -36, y: 2, z: -72, heading: -Math.PI / 3, skinColor: 0xf5d0b5, shirtColor: 0x047857, pantsColor: 0x374151, hairColor: 0xb45309, tagColor: '#10b981', hatType: 'beret', hatColor: 0x047857 },

      // 6. Paris Eiffel Tower Realm
      { name: 'Jean-Luc Moreau', role: 'Montmartre Painter', x: 28, y: 2, z: -42, heading: -Math.PI / 2, skinColor: 0xffdbac, shirtColor: 0x475569, pantsColor: 0x0f172a, hairColor: 0x94a3b8, tagColor: '#94a3b8', hatType: 'beret', hatColor: 0x18181b },
      { name: 'Camille Dubois', role: 'Parisian Patissier', x: 22, y: 2, z: -46, heading: Math.PI / 4, skinColor: 0xffe0bd, shirtColor: 0xffffff, pantsColor: 0x1e293b, hairColor: 0x451a03, tagColor: '#f8fafc', hatType: 'cap', hatColor: 0xffffff },

      // 7. Egypt Giza & Sphinx Realm
      { name: 'Tarek Mansour', role: 'Giza Desert Guide', x: -145, y: 2, z: 46, heading: 0, skinColor: 0xa0522d, shirtColor: 0xfef08a, pantsColor: 0x78350f, hairColor: 0x111111, tagColor: '#eab308', hatType: 'turban', hatColor: 0xfef08a },

      // 8. Dubai Burj Khalifa Realm
      { name: 'Rashid Al-Maktoum', role: 'Dubai Skydeck Pilot', x: 164, y: 2, z: 38, heading: -Math.PI / 2, skinColor: 0x8d5524, shirtColor: 0xffffff, pantsColor: 0xffffff, hairColor: 0x111111, tagColor: '#38bdf8', hatType: 'turban', hatColor: 0xffffff }
    ];

    for (const c of citizens) {
      const citizenGroup = new THREE.Group();
      citizenGroup.position.set(c.x, c.y, c.z);
      citizenGroup.rotation.y = c.heading;

      const skinMat = new THREE.MeshLambertMaterial({ color: c.skinColor });
      const shirtMat = new THREE.MeshLambertMaterial({ color: c.shirtColor });
      const pantsMat = new THREE.MeshLambertMaterial({ color: c.pantsColor });
      const hairMat = new THREE.MeshLambertMaterial({ color: c.hairColor });
      const shoeMat = new THREE.MeshLambertMaterial({ color: 0x1e293b });
      const eyeMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const pupilMat = new THREE.MeshBasicMaterial({ color: 0x0f172a });

      // Head Group
      const head = new THREE.Group();
      head.position.set(0, 1.48, 0);

      const headMesh = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.44, 0.44), skinMat);
      head.add(headMesh);

      // Hair
      const hairMesh = new THREE.Mesh(new THREE.BoxGeometry(0.47, 0.16, 0.47), hairMat);
      hairMesh.position.set(0, 0.16, 0);
      head.add(hairMesh);

      // Optional Hats (Turban, Beret, Cap)
      if (c.hatType === 'turban' && c.hatColor) {
        const turbanMat = new THREE.MeshLambertMaterial({ color: c.hatColor });
        const turban = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.22, 0.52), turbanMat);
        turban.position.set(0, 0.22, 0);
        head.add(turban);
        const crest = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.14, 0.12), turbanMat);
        crest.position.set(0, 0.32, 0.14);
        head.add(crest);
      } else if (c.hatType === 'beret' && c.hatColor) {
        const beretMat = new THREE.MeshLambertMaterial({ color: c.hatColor });
        const beret = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.24, 0.08, 12), beretMat);
        beret.position.set(0.04, 0.24, 0.02);
        beret.rotation.z = -0.15;
        head.add(beret);
      } else if (c.hatType === 'cap' && c.hatColor) {
        const capMat = new THREE.MeshLambertMaterial({ color: c.hatColor });
        const cap = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.12, 0.48), capMat);
        cap.position.set(0, 0.22, 0);
        head.add(cap);
        const visor = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.03, 0.22), capMat);
        visor.position.set(0, 0.18, 0.3);
        head.add(visor);
      }

      // Eyes
      for (const side of [-0.1, 0.1]) {
        const eye = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.07, 0.02), eyeMat);
        eye.position.set(side, 0.02, 0.225);
        head.add(eye);
        const pupil = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.035, 0.025), pupilMat);
        pupil.position.set(side, 0.02, 0.23);
        head.add(pupil);
      }
      citizenGroup.add(head);

      // Torso
      const torso = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.65, 0.26), shirtMat);
      torso.position.set(0, 0.95, 0);
      citizenGroup.add(torso);

      // Arms
      const armL = new THREE.Group();
      armL.position.set(-0.34, 1.15, 0);
      const sleeveL = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.35, 0.18), shirtMat);
      sleeveL.position.set(0, -0.05, 0);
      armL.add(sleeveL);
      const handL = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.3, 0.16), skinMat);
      handL.position.set(0, -0.32, 0);
      armL.add(handL);
      citizenGroup.add(armL);

      const armR = new THREE.Group();
      armR.position.set(0.34, 1.15, 0);
      const sleeveR = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.35, 0.18), shirtMat);
      sleeveR.position.set(0, -0.05, 0);
      armR.add(sleeveR);
      const handR = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.3, 0.16), skinMat);
      handR.position.set(0, -0.32, 0);
      armR.add(handR);
      citizenGroup.add(armR);

      // Legs
      for (const side of [-0.12, 0.12]) {
        const legGroup = new THREE.Group();
        legGroup.position.set(side, 0.6, 0);
        const leg = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.44, 0.2), pantsMat);
        leg.position.set(0, -0.22, 0);
        legGroup.add(leg);
        const shoe = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.12, 0.26), shoeMat);
        shoe.position.set(0, -0.42, 0.03);
        legGroup.add(shoe);
        citizenGroup.add(legGroup);
      }

      // Nameplate Banner Overhead
      const tagCanvas = document.createElement('canvas');
      tagCanvas.width = 320;
      tagCanvas.height = 76;
      const tagCtx = tagCanvas.getContext('2d')!;
      tagCtx.fillStyle = 'rgba(0, 0, 0, 0.8)';
      tagCtx.fillRect(0, 0, 320, 76);
      tagCtx.strokeStyle = c.tagColor;
      tagCtx.lineWidth = 3;
      tagCtx.strokeRect(2, 2, 316, 72);

      tagCtx.fillStyle = c.tagColor;
      tagCtx.font = 'bold 22px monospace';
      tagCtx.textAlign = 'center';
      tagCtx.fillText(c.name, 160, 30);

      tagCtx.fillStyle = '#ffffff';
      tagCtx.font = '16px monospace';
      tagCtx.fillText(c.role, 160, 58);

      const tagTex = new THREE.CanvasTexture(tagCanvas);
      tagTex.magFilter = THREE.NearestFilter;
      const tagSprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: tagTex }));
      tagSprite.scale.set(1.9, 0.45, 1);
      tagSprite.position.set(0, 2.1, 0);
      citizenGroup.add(tagSprite);

      citizenGroup.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.castShadow = true;
          obj.receiveShadow = true;
        }
      });

      this.scene.add(citizenGroup);
      this.worldCitizens.push({
        mesh: citizenGroup,
        basePos: new THREE.Vector3(c.x, c.y, c.z),
        initialHeading: c.heading,
        armL,
        armR,
        head
      });
    }
  }

  private updateWorldCitizens(time: number, playerPos: THREE.Vector3) {
    if (this.worldCitizens.length === 0) return;

    for (let i = 0; i < this.worldCitizens.length; i++) {
      const c = this.worldCitizens[i];
      const dist = c.mesh.position.distanceTo(playerPos);

      // Subtle breathing & idle idle limb movement
      const breath = Math.sin(time * 2.2 + i * 1.5) * 0.02;
      c.mesh.position.y = c.basePos.y + breath;

      // Gentle arm sway
      c.armL.rotation.x = Math.sin(time * 1.8 + i) * 0.08;
      c.armR.rotation.x = -Math.sin(time * 1.8 + i) * 0.08;

      if (dist < 12) {
        // Look towards player when nearby
        const dx = playerPos.x - c.mesh.position.x;
        const dz = playerPos.z - c.mesh.position.z;
        const targetAngle = Math.atan2(dx, dz);
        // Smooth head rotation towards player
        c.mesh.rotation.y = THREE.MathUtils.lerp(c.mesh.rotation.y, targetAngle, 0.05);
      } else {
        // Return to natural world heading
        c.mesh.rotation.y = THREE.MathUtils.lerp(c.mesh.rotation.y, c.initialHeading, 0.02);
      }
    }
  }

  public hasBlock(x: number, y: number, z: number): boolean {
    return this.builder.getBlockMap().has(`${x},${y},${z}`);
  }

  public hasSolidBlock(x: number, y: number, z: number): boolean {
    const block = this.getBlock(x, y, z);
    if (!block) return false;
    return block.type !== 'water' && block.type !== 'portal';
  }

  public getBlock(x: number, y: number, z: number): VoxelBlock | undefined {
    return this.builder.getBlockMap().get(`${x},${y},${z}`);
  }
}
