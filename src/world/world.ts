import { DragonManager } from './dragons';
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

  // Dragons & Animals
  public dragonManager!: DragonManager;
  private catMesh: THREE.Group | null = null;
  public dogMesh: THREE.Group | null = null;
  private dogTailMesh: THREE.Mesh | null = null;
  private dogHeadMesh: THREE.Group | null = null;
  private volcanoSmoke: THREE.Points | null = null;

  // Special animated objects
  private spinningIcons: THREE.Group[] = [];
  private portalParticles: THREE.Points | null = null;
  private beaconBeam: THREE.Mesh | null = null;
  public npcMesh: THREE.Group | null = null;
  private railCurve: THREE.CatmullRomCurve3 | null = null;
  private liveTrains: THREE.Group[] = [];

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
    this.createProjectPedestalVisuals();
    this.createBigProjectWallBanners();
    this.createBeaconBeam();
    this.createNetherPortalParticles();
    this.createLakshyaNPC();
    this.createBeachCat();
    this.createVolcanoSmoke();
    this.dragonManager = new DragonManager(this.scene);
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
    const route = [
      new THREE.Vector3(50, 2.15, 33),  // Inside Central Station West
      new THREE.Vector3(62, 2.15, 33),  // Central Station Platform East
      new THREE.Vector3(76, 2.15, 34),  // Viaduct Trestle 1
      new THREE.Vector3(92, 2.15, 42),  // Viaduct Trestle 2
      new THREE.Vector3(108, 2.15, 52), // Viaduct Trestle 3
      new THREE.Vector3(122, 2.15, 64), // Airport Station Approach
      new THREE.Vector3(130, 2.15, 72)  // Airport Station Platform
    ];
    this.railCurve = new THREE.CatmullRomCurve3(route, false, 'centripetal');
    const railMaterial = new THREE.MeshStandardMaterial({ color: 0x64736f, metalness: 0.72, roughness: 0.34 });
    const tieMaterial = new THREE.MeshLambertMaterial({ color: 0x745d43 });
    const supportMaterial = new THREE.MeshLambertMaterial({ color: 0x56635c });
    const railRadius = 0.075;
    const railLength = this.railCurve.getLength();

    for (const side of [-0.48, 0.48]) {
      const offsetPoints = route.map((point, index) => {
        const tangent = this.railCurve!.getTangentAt(index / (route.length - 1));
        const normal = new THREE.Vector3(tangent.z, 0, -tangent.x).normalize();
        return point.clone().addScaledVector(normal, side);
      });
      const curve = new THREE.CatmullRomCurve3(offsetPoints, false, 'centripetal');
      const rail = new THREE.Mesh(new THREE.TubeGeometry(curve, 220, railRadius, 8, false), railMaterial);
      rail.castShadow = true;
      rail.receiveShadow = true;
      this.scene.add(rail);
    }

    // Timber sleepers and supports make the elevated line read as a real track.
    for (let distance = 0; distance <= railLength; distance += 1.45) {
      const t = this.railCurve.getUtoTmapping(0, distance);
      const point = this.railCurve.getPointAt(t);
      const tangent = this.railCurve.getTangentAt(t);
      const sleeper = new THREE.Mesh(new THREE.BoxGeometry(1.45, 0.14, 0.26), tieMaterial);
      sleeper.position.copy(point);
      sleeper.position.y -= 0.12;
      sleeper.rotation.y = Math.atan2(-tangent.z, tangent.x) + Math.PI / 2;
      sleeper.castShadow = true;
      this.scene.add(sleeper);

      if (Math.round(distance) % 7 < 2) {
        const support = new THREE.Mesh(new THREE.BoxGeometry(0.42, 1.65, 0.42), supportMaterial);
        support.position.set(point.x, 1.28, point.z);
        support.castShadow = true;
        support.receiveShadow = true;
        this.scene.add(support);
      }
    }

    this.liveTrains = [
      this.createTrain(0x426b62, 0xd7bd78),
      this.createTrain(0x8b4b3d, 0xe2d9c3)
    ];
    this.liveTrains.forEach((train) => this.scene.add(train));
  }

  private createTrain(bodyColor: number, accentColor: number) {
    const train = new THREE.Group();
    const bodyMaterial = new THREE.MeshStandardMaterial({ color: bodyColor, metalness: 0.26, roughness: 0.55 });
    const accentMaterial = new THREE.MeshStandardMaterial({ color: accentColor, metalness: 0.48, roughness: 0.38 });
    const windowMaterial = new THREE.MeshStandardMaterial({ color: 0x9ed5d2, emissive: 0x173c3c, metalness: 0.32, roughness: 0.22 });
    const darkMaterial = new THREE.MeshStandardMaterial({ color: 0x262b29, metalness: 0.68, roughness: 0.4 });
    const headlightMaterial = new THREE.MeshBasicMaterial({ color: 0xffedb0 });

    for (let carIndex = 0; carIndex < 3; carIndex++) {
      const car = new THREE.Group();
      const chassis = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.28, 1.55), darkMaterial);
      chassis.position.y = 0.38;
      car.add(chassis);

      const shell = new THREE.Mesh(new THREE.BoxGeometry(carIndex === 0 ? 2.65 : 2.8, 1.12, 1.5), bodyMaterial);
      shell.position.y = 1.0;
      car.add(shell);

      const roof = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.16, 1.42), accentMaterial);
      roof.position.set(-0.08, 1.65, 0);
      car.add(roof);

      for (const z of [-0.765, 0.765]) {
        for (const x of [-0.8, 0, 0.8]) {
          const window = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.4, 0.045), windowMaterial);
          window.position.set(x, 1.12, z);
          car.add(window);
        }
        for (const x of [-0.9, 0.9]) {
          const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.14, 10), darkMaterial);
          wheel.rotation.x = Math.PI / 2;
          wheel.position.set(x, 0.18, z * 0.72);
          car.add(wheel);
        }
      }

      if (carIndex === 0) {
        const cab = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.58, 1.3), accentMaterial);
        cab.position.set(-0.48, 1.82, 0);
        car.add(cab);
        const nose = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.48, 1.38), accentMaterial);
        nose.position.set(1.42, 0.88, 0);
        car.add(nose);
        const chimney = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.16, 0.42, 8), darkMaterial);
        chimney.position.set(0.68, 1.72, 0);
        car.add(chimney);
        for (const z of [-0.43, 0.43]) {
          const light = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.14, 0.12), headlightMaterial);
          light.position.set(1.66, 0.96, z);
          car.add(light);
        }
      }

      car.position.x = -carIndex * 3.2;
      car.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.castShadow = true;
          object.receiveShadow = true;
        }
      });
      train.add(car);
    }

    return train;
  }

  private updateLiveTrains(time: number) {
    if (!this.railCurve || this.liveTrains.length === 0) return;
    const routeLength = this.railCurve.getLength();

    this.liveTrains.forEach((train, index) => {
      const phase = (time * 3.5 + index * routeLength) % (routeLength * 2);
      const movingForward = phase <= routeLength;
      const distance = movingForward ? phase : routeLength * 2 - phase;
      const t = this.railCurve!.getUtoTmapping(0, distance);
      const position = this.railCurve!.getPointAt(t);
      const tangent = this.railCurve!.getTangentAt(t);
      if (!movingForward) tangent.negate();
      train.position.set(position.x, 2.14, position.z);
      train.rotation.y = Math.atan2(-tangent.z, tangent.x);
    });
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
