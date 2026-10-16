import * as THREE from 'three';
import { WeatherKind } from './climate';

interface CloudBlock {
  relX: number;
  relY: number;
  relZ: number;
  scaleX: number;
  scaleY: number;
  scaleZ: number;
  tier: 0 | 1 | 2; // 0 = base/underside, 1 = mid body, 2 = top crest
}

interface CloudCluster {
  anchorX: number;
  anchorZ: number;
  blocks: CloudBlock[];
}

export class CloudManager {
  public readonly group: THREE.Group;
  private instancedMesh: THREE.InstancedMesh | null = null;
  private readonly clusters: CloudCluster[] = [];
  private readonly totalBlocks: number;

  // Spatial domain
  private readonly span = 680;
  private readonly halfSpan = 340;
  private readonly baseAltitude = 98;

  // Drift offsets
  private driftX = 0;
  private driftZ = 0;
  private readonly windSpeedX = 1.35;
  private readonly windSpeedZ = 0.22;

  // Colors & Materials
  private readonly cloudMaterial: THREE.MeshBasicMaterial;
  private readonly currentColor = new THREE.Color(0xffffff);
  private readonly targetColor = new THREE.Color(0xffffff);

  // Reusable dummy for matrix updates
  private readonly dummy = new THREE.Object3D();

  // Color tiers for 3D volumetric shading
  private readonly tierColors = [
    new THREE.Color(0xcad6eb), // Tier 0: Base / Underside (Ambient sky occlusion)
    new THREE.Color(0xecf2fc), // Tier 1: Mid Billows (Soft neutral body)
    new THREE.Color(0xffffff), // Tier 2: Top Crests (Bright direct sunlight)
  ];

  constructor(scene: THREE.Scene) {
    this.group = new THREE.Group();

    // 1. Generate Organic Procedural Cumulus Clusters
    this.clusters = this.generateProceduralClusters();

    // Count total block instances across all clusters
    let count = 0;
    for (const cluster of this.clusters) {
      count += cluster.blocks.length;
    }
    this.totalBlocks = count;

    // 2. Create InstancedMesh with unit box geometry
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    this.cloudMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.86,
      depthWrite: false,
    });

    this.instancedMesh = new THREE.InstancedMesh(geometry, this.cloudMaterial, this.totalBlocks);

    // Apply per-instance volumetric shading
    let instanceIndex = 0;
    for (const cluster of this.clusters) {
      for (const block of cluster.blocks) {
        this.instancedMesh.setColorAt(instanceIndex, this.tierColors[block.tier]);
        instanceIndex++;
      }
    }
    if (this.instancedMesh.instanceColor) {
      this.instancedMesh.instanceColor.needsUpdate = true;
    }

    this.group.add(this.instancedMesh);
    scene.add(this.group);

    // Initial positioning
    this.updatePositions(new THREE.Vector3(0, 0, 0));
  }

  /**
   * Generates natural, varied cumulus cloud clusters scattered across the sky
   */
  private generateProceduralClusters(): CloudCluster[] {
    const clusters: CloudCluster[] = [];
    const numClusters = 38;

    // Pseudo-random helper with seed for stable initial layouts
    let seed = 42891;
    const random = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    for (let i = 0; i < numClusters; i++) {
      // Jittered grid placement to prevent unnatural clumping or rigid lines
      const gridRow = Math.floor(i / 6);
      const gridCol = i % 6;
      const cellW = this.span / 6;
      const cellH = this.span / 7;

      const anchorX = -this.halfSpan + (gridCol + 0.5) * cellW + (random() - 0.5) * (cellW * 0.72);
      const anchorZ = -this.halfSpan + (gridRow + 0.5) * cellH + (random() - 0.5) * (cellH * 0.72);

      const clusterType = random();
      const blocks: CloudBlock[] = [];

      if (clusterType > 0.65) {
        // Grand Cumulus Cloudbank (Large, puffy, multi-tiered)
        this.buildGrandCumulus(blocks, random);
      } else if (clusterType > 0.25) {
        // Medium Billowing Cumulus
        this.buildMediumCumulus(blocks, random);
      } else {
        // Light Atmospheric Cumulus Wisp
        this.buildWispCumulus(blocks, random);
      }

      clusters.push({ anchorX, anchorZ, blocks });
    }

    return clusters;
  }

  /**
   * Builds an expansive multi-tier cumulus cloudbank
   */
  private buildGrandCumulus(blocks: CloudBlock[], rand: () => number) {
    const mainWidth = 32 + rand() * 20;
    const mainDepth = 24 + rand() * 16;

    // Tier 0: Base bed
    blocks.push({
      relX: 0,
      relY: 0,
      relZ: 0,
      scaleX: mainWidth,
      scaleY: 3.2,
      scaleZ: mainDepth,
      tier: 0,
    });

    // Tier 0 side lobes
    const numLobes = 3 + Math.floor(rand() * 3);
    for (let l = 0; l < numLobes; l++) {
      const offsetX = (rand() - 0.5) * (mainWidth * 0.9);
      const offsetZ = (rand() - 0.5) * (mainDepth * 0.9);
      blocks.push({
        relX: offsetX,
        relY: (rand() - 0.3) * 0.8,
        relZ: offsetZ,
        scaleX: 18 + rand() * 14,
        scaleY: 2.8 + rand() * 1.0,
        scaleZ: 16 + rand() * 14,
        tier: 0,
      });
    }

    // Tier 1: Mid puffy body
    const numMid = 3 + Math.floor(rand() * 2);
    for (let m = 0; m < numMid; m++) {
      blocks.push({
        relX: (rand() - 0.5) * (mainWidth * 0.6),
        relY: 2.5 + rand() * 0.5,
        relZ: (rand() - 0.5) * (mainDepth * 0.6),
        scaleX: 16 + rand() * 12,
        scaleY: 3.6,
        scaleZ: 14 + rand() * 10,
        tier: 1,
      });
    }

    // Tier 2: Top crowning crests
    const numCrests = 1 + Math.floor(rand() * 2);
    for (let c = 0; c < numCrests; c++) {
      blocks.push({
        relX: (rand() - 0.5) * (mainWidth * 0.35),
        relY: 5.4 + rand() * 0.6,
        relZ: (rand() - 0.5) * (mainDepth * 0.35),
        scaleX: 10 + rand() * 8,
        scaleY: 2.8,
        scaleZ: 10 + rand() * 6,
        tier: 2,
      });
    }
  }

  /**
   * Builds a medium puffy cumulus cloud
   */
  private buildMediumCumulus(blocks: CloudBlock[], rand: () => number) {
    const mainWidth = 22 + rand() * 14;
    const mainDepth = 18 + rand() * 12;

    // Base slab
    blocks.push({
      relX: 0,
      relY: 0,
      relZ: 0,
      scaleX: mainWidth,
      scaleY: 2.8,
      scaleZ: mainDepth,
      tier: 0,
    });

    // Puffy side billow
    const sideX = (rand() - 0.5) * (mainWidth * 0.6);
    const sideZ = (rand() - 0.5) * (mainDepth * 0.6);
    blocks.push({
      relX: sideX,
      relY: 0.3,
      relZ: sideZ,
      scaleX: 14 + rand() * 8,
      scaleY: 2.6,
      scaleZ: 12 + rand() * 8,
      tier: 0,
    });

    // Mid body
    blocks.push({
      relX: (rand() - 0.5) * 6,
      relY: 2.2,
      relZ: (rand() - 0.5) * 6,
      scaleX: 14 + rand() * 6,
      scaleY: 3.0,
      scaleZ: 12 + rand() * 6,
      tier: 1,
    });

    // Small crest
    if (rand() > 0.4) {
      blocks.push({
        relX: (rand() - 0.5) * 4,
        relY: 4.6,
        relZ: (rand() - 0.5) * 4,
        scaleX: 8 + rand() * 4,
        scaleY: 2.2,
        scaleZ: 8 + rand() * 4,
        tier: 2,
      });
    }
  }

  /**
   * Builds an airy atmospheric cumulus wisp
   */
  private buildWispCumulus(blocks: CloudBlock[], rand: () => number) {
    const wispWidth = 14 + rand() * 10;
    const wispDepth = 10 + rand() * 8;

    blocks.push({
      relX: 0,
      relY: 0,
      relZ: 0,
      scaleX: wispWidth,
      scaleY: 2.2,
      scaleZ: wispDepth,
      tier: 0,
    });

    blocks.push({
      relX: (rand() - 0.5) * 8,
      relY: 1.8,
      relZ: (rand() - 0.5) * 6,
      scaleX: 8 + rand() * 6,
      scaleY: 2.2,
      scaleZ: 7 + rand() * 5,
      tier: 1,
    });
  }

  /**
   * Seamless toroidal positioning around the camera/player
   */
  private updatePositions(playerPos: THREE.Vector3) {
    if (!this.instancedMesh) return;

    let instanceIdx = 0;
    const span = this.span;
    const halfSpan = this.halfSpan;

    for (let c = 0; c < this.clusters.length; c++) {
      const cluster = this.clusters[c];

      // Compute relative coordinate to player with drift
      let dx = cluster.anchorX + this.driftX - playerPos.x;
      let dz = cluster.anchorZ + this.driftZ - playerPos.z;

      // Continuous toroidal wrap around player
      dx = ((dx % span) + span) % span;
      if (dx > halfSpan) dx -= span;

      dz = ((dz % span) + span) % span;
      if (dz > halfSpan) dz -= span;

      const clusterWorldX = playerPos.x + dx;
      const clusterWorldZ = playerPos.z + dz;

      for (let b = 0; b < cluster.blocks.length; b++) {
        const block = cluster.blocks[b];

        this.dummy.position.set(
          clusterWorldX + block.relX,
          this.baseAltitude + block.relY,
          clusterWorldZ + block.relZ
        );
        this.dummy.scale.set(block.scaleX, block.scaleY, block.scaleZ);
        this.dummy.updateMatrix();

        this.instancedMesh.setMatrixAt(instanceIdx, this.dummy.matrix);
        instanceIdx++;
      }
    }

    this.instancedMesh.instanceMatrix.needsUpdate = true;
  }

  /**
   * Computes atmospheric time-of-day cloud color tint
   */
  private computeAtmosphericColor(dayNightAngle: number): THREE.Color {
    // Normalise angle to [0, 2PI)
    const angle = ((dayNightAngle % (Math.PI * 2)) + (Math.PI * 2)) % (Math.PI * 2);

    // Sunrise / Dawn: angle ~ 0.0 to 0.7
    if (angle < 0.7) {
      const t = angle / 0.7;
      return new THREE.Color(0xffa578).lerp(new THREE.Color(0xffffff), t);
    }
    // Morning / Midday / Afternoon: angle ~ 0.7 to 2.3
    if (angle < 2.3) {
      return new THREE.Color(0xffffff);
    }
    // Sunset / Dusk: angle ~ 2.3 to 3.2
    if (angle < 3.2) {
      const t = (angle - 2.3) / 0.9;
      return new THREE.Color(0xffffff).lerp(new THREE.Color(0xf47c48), t);
    }
    // Twilight / Dusk to Night: angle ~ 3.2 to 3.8
    if (angle < 3.8) {
      const t = (angle - 3.2) / 0.6;
      return new THREE.Color(0xf47c48).lerp(new THREE.Color(0x354060), t);
    }
    // Night / Midnight: angle ~ 3.8 to 5.7
    if (angle < 5.7) {
      return new THREE.Color(0x28324a); // Silvery moonlit deep blue
    }
    // Pre-dawn transition: angle ~ 5.7 to 2PI
    const t = (angle - 5.7) / (Math.PI * 2 - 5.7);
    return new THREE.Color(0x28324a).lerp(new THREE.Color(0xffa578), t);
  }

  /**
   * Per-frame update hook
   */
  public update(
    dt: number,
    playerPosition: THREE.Vector3,
    dayNightAngle: number,
    weather: WeatherKind,
    lightningFlash: number = 0
  ) {
    if (!this.group.visible || !this.instancedMesh) return;

    // 1. Accumulate continuous wind drift
    this.driftX += dt * this.windSpeedX;
    this.driftZ += dt * this.windSpeedZ;

    // 2. Toroidal position update around player
    this.updatePositions(playerPosition);

    // 3. Dynamic atmospheric & weather color tinting
    const baseSkyTint = this.computeAtmosphericColor(dayNightAngle);

    if (weather === 'thunderstorm') {
      this.targetColor.set(0x242834);
    } else if (weather === 'rain') {
      this.targetColor.set(0x566072);
    } else if (weather === 'snowfall') {
      this.targetColor.set(0xd8e4f0);
    } else {
      this.targetColor.copy(baseSkyTint);
    }

    // Lightning illumination flash
    if (lightningFlash > 0.1) {
      const flashColor = new THREE.Color(0xdde8ff);
      const flashStrength = Math.min(1.0, lightningFlash * 0.35);
      this.targetColor.lerp(flashColor, flashStrength);
    }

    // Smooth color interpolation
    this.currentColor.lerp(this.targetColor, Math.min(1.0, dt * 2.5));
    this.cloudMaterial.color.copy(this.currentColor);

    // Dynamic weather opacity
    const targetOpacity = weather === 'thunderstorm'
      ? 0.94
      : weather === 'rain'
      ? 0.90
      : 0.85;
    this.cloudMaterial.opacity = THREE.MathUtils.lerp(
      this.cloudMaterial.opacity,
      targetOpacity,
      Math.min(1.0, dt * 2.0)
    );
  }

  /**
   * Cloud visibility toggle
   */
  public setVisible(visible: boolean) {
    this.group.visible = visible;
  }

  public toggle(): boolean {
    this.group.visible = !this.group.visible;
    return this.group.visible;
  }

  public get isVisible(): boolean {
    return this.group.visible;
  }

  public dispose() {
    if (this.instancedMesh) {
      this.instancedMesh.geometry.dispose();
      this.cloudMaterial.dispose();
      this.group.remove(this.instancedMesh);
    }
  }
}
