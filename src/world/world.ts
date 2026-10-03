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

  // Special animated objects
  private spinningIcons: THREE.Group[] = [];
  private portalParticles: THREE.Points | null = null;
  private beaconBeam: THREE.Mesh | null = null;
  public npcMesh: THREE.Group | null = null;

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
    this.createProjectPedestalVisuals();
    this.createBigProjectWallBanners();
    this.createBeaconBeam();
    this.createNetherPortalParticles();
    this.createLakshyaNPC();
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
      instMesh.castShadow = true;
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

  // Create BIG High-Definition Wall Banners for Projects in the Mega-Hall
  private createBigProjectWallBanners() {
    const projects = PORTFOLIO_DATA.projects;
    const bannerZ = -74.85; // Cleanly in front of North Wall of Corona Palace (Z = -75)

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

      bannerMesh.position.set(proj.bannerCoords.x, proj.bannerCoords.y + 1.2, bannerZ);
      bannerMesh.rotation.y = 0; // facing South into the hall
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

    // Track minigame building arena (North-West: X in [-72, -36], Z in [-64, -30])
    if (x >= -72 && x <= -36 && z >= -64 && z <= -30) {
      this.minigameBlocksPlaced++;
      if (this.minigameBlocksPlaced === 10 || this.minigameBlocksPlaced === 25 || this.minigameBlocksPlaced === 50) {
        sound.playLevelUp();
      }
    }
  }

  // Break a block dynamically with debris particles
  public breakBlock(x: number, y: number, z: number): VoxelBlock | null {
    const key = `${x},${y},${z}`;
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
    const stations = [
      { x: -18, z: -66, p: projects[0] },
      { x: -9, z: -66, p: projects[1] },
      { x: 0, z: -66, p: projects[2] },
      { x: 9, z: -66, p: projects[3] },
      { x: 18, z: -66, p: projects[4] },
    ];

    stations.forEach((st) => {
      const group = new THREE.Group();
      group.position.set(st.x + 0.5, 3.4, st.z + 0.5);

      const geo = new THREE.OctahedronGeometry(0.45);
      const mat = new THREE.MeshLambertMaterial({
        color: st.p.accentColor,
        emissive: st.p.accentColor,
        emissiveIntensity: 0.35,
      });
      const gem = new THREE.Mesh(geo, mat);
      group.add(gem);

      const light = new THREE.PointLight(st.p.accentColor, 1.2, 5);
      group.add(light);

      this.scene.add(group);
      this.spinningIcons.push(group);
    });
  }

  // Active Beacon light beam
  private createBeaconBeam() {
    const beamGeo = new THREE.CylinderGeometry(0.4, 0.4, 100, 8);
    const beamMat = new THREE.MeshBasicMaterial({
      color: 0x67e8f9,
      transparent: true,
      opacity: 0.7,
      side: THREE.DoubleSide
    });
    this.beaconBeam = new THREE.Mesh(beamGeo, beamMat);
    this.beaconBeam.position.set(0.5, 52, 27.5);
    this.scene.add(this.beaconBeam);

    const beaconLight = new THREE.PointLight(0x38bdf8, 3.0, 35);
    beaconLight.position.set(0.5, 4, 27.5);
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

  // 3D NPC of Lakshya near spawn
  private createLakshyaNPC() {
    const npc = new THREE.Group();
    npc.position.set(3.5, 1, 3.5);

    const skinMat = new THREE.MeshLambertMaterial({ color: 0xd4a373 });
    const shirtMat = new THREE.MeshLambertMaterial({ color: 0x0284c7 });
    const pantsMat = new THREE.MeshLambertMaterial({ color: 0x1e293b });
    const hairMat = new THREE.MeshLambertMaterial({ color: 0x271a14 });

    const head = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.5), skinMat);
    head.position.set(0, 1.6, 0);

    const hair = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.25, 0.52), hairMat);
    hair.position.set(0, 0.16, 0);
    head.add(hair);

    const eyeMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const pupilMat = new THREE.MeshBasicMaterial({ color: 0x3b82f6 });
    const eyeL = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.02), eyeMat);
    eyeL.position.set(-0.12, 0, 0.26);
    const pupilL = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.04, 0.03), pupilMat);
    pupilL.position.set(-0.12, 0, 0.265);
    head.add(eyeL);
    head.add(pupilL);

    const eyeR = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.02), eyeMat);
    eyeR.position.set(0.12, 0, 0.26);
    const pupilR = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.04, 0.03), pupilMat);
    pupilR.position.set(0.12, 0, 0.265);
    head.add(eyeR);
    head.add(pupilR);
    npc.add(head);

    const torso = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.75, 0.25), shirtMat);
    torso.position.set(0, 1.0, 0);
    npc.add(torso);

    const armL = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.75, 0.22), shirtMat);
    armL.position.set(-0.36, 1.0, 0);
    npc.add(armL);

    const armR = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.75, 0.22), shirtMat);
    armR.position.set(0.36, 1.05, 0.1);
    armR.rotation.x = -0.4;
    npc.add(armR);

    const legL = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.65, 0.22), pantsMat);
    legL.position.set(-0.13, 0.32, 0);
    npc.add(legL);

    const legR = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.65, 0.22), pantsMat);
    legR.position.set(0.13, 0.32, 0);
    npc.add(legR);

    // Floating Nameplate
    const nameCanvas = document.createElement('canvas');
    nameCanvas.width = 384;
    nameCanvas.height = 96;
    const nameCtx = nameCanvas.getContext('2d')!;
    nameCtx.fillStyle = 'rgba(0, 0, 0, 0.75)';
    nameCtx.fillRect(0, 0, 384, 96);
    nameCtx.strokeStyle = '#55ff55';
    nameCtx.lineWidth = 4;
    nameCtx.strokeRect(2, 2, 380, 92);

    nameCtx.fillStyle = '#55ff55';
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
    nameSprite.position.set(0, 2.2, 0);
    npc.add(nameSprite);

    this.scene.add(npc);
    this.npcMesh = npc;
  }

  public update(time: number, playerPos: THREE.Vector3) {
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
