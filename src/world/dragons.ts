import * as THREE from 'three';

export interface DragonConfig {
  id: string;
  name: string;
  region: 'North' | 'South' | 'East' | 'West';
  bodyColor: number;
  wingColor: number;
  eyeColor: number;
  centerPos: THREE.Vector3;
  patrolRadius: number;
  baseAltitude: number;
  altitudeWave: number;
  speed: number;
  particleColor: number;
}

export class MinecraftDragon {
  public config: DragonConfig;
  public group: THREE.Group;
  public position: THREE.Vector3 = new THREE.Vector3();
  public heading: number = 0;

  // Skeletal parts for animation
  private leftWingRoot: THREE.Group;
  private leftWingTip: THREE.Group;
  private rightWingRoot: THREE.Group;
  private rightWingTip: THREE.Group;
  private headGroup: THREE.Group;
  private neckSegments: THREE.Mesh[] = [];
  private tailSegments: THREE.Mesh[] = [];

  // Flight timing & physics
  private flightAngle: number;
  private bankAngle: number = 0;
  private flapTime: number = 0;

  // Particle trail
  private particles: THREE.Points;
  private particlePositions: Float32Array;
  private particleLife: Float32Array;
  private particleCount: number = 32;

  constructor(config: DragonConfig, scene: THREE.Scene) {
    this.config = config;
    this.flightAngle = Math.random() * Math.PI * 2;
    this.group = new THREE.Group();

    // 1. Build articulated voxel dragon mesh
    const bodyMat = new THREE.MeshLambertMaterial({ color: config.bodyColor });
    const wingMat = new THREE.MeshLambertMaterial({ color: config.wingColor, side: THREE.DoubleSide });
    const eyeMat = new THREE.MeshBasicMaterial({ color: config.eyeColor });
    const hornMat = new THREE.MeshLambertMaterial({ color: 0x475569 });

    // --- MAIN BODY (TORSO) ---
    const torsoGeo = new THREE.BoxGeometry(1.6, 1.3, 3.2);
    const torso = new THREE.Mesh(torsoGeo, bodyMat);
    torso.position.set(0, 0, 0);
    this.group.add(torso);

    // Dorsal Spines along back
    for (let i = -1.2; i <= 1.2; i += 0.6) {
      const spine = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.45, 0.3), hornMat);
      spine.position.set(0, 0.85, i);
      this.group.add(spine);
    }

    // --- NECK & HEAD ---
    const neckBase = new THREE.Group();
    neckBase.position.set(0, 0.3, 1.6);
    this.group.add(neckBase);

    let curParent: THREE.Object3D = neckBase;
    for (let i = 0; i < 4; i++) {
      const neckGeo = new THREE.BoxGeometry(0.7, 0.7, 0.7);
      const neckSeg = new THREE.Mesh(neckGeo, bodyMat);
      neckSeg.position.set(0, 0.25, 0.5);
      curParent.add(neckSeg);
      this.neckSegments.push(neckSeg);
      curParent = neckSeg;
    }

    // Dragon Head
    this.headGroup = new THREE.Group();
    this.headGroup.position.set(0, 0.35, 0.7);
    curParent.add(this.headGroup);

    // Cranium
    const headMesh = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.8, 1.0), bodyMat);
    headMesh.position.set(0, 0, 0);
    this.headGroup.add(headMesh);

    // Snout / Muzzle
    const snoutMesh = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.45, 0.9), bodyMat);
    snoutMesh.position.set(0, -0.15, 0.85);
    this.headGroup.add(snoutMesh);

    // Glowing Eyes
    const eyeGeo = new THREE.BoxGeometry(0.18, 0.14, 0.08);
    const eyeL = new THREE.Mesh(eyeGeo, eyeMat);
    eyeL.position.set(-0.48, 0.1, 0.3);
    eyeL.rotation.y = -0.2;
    this.headGroup.add(eyeL);

    const eyeR = new THREE.Mesh(eyeGeo, eyeMat);
    eyeR.position.set(0.48, 0.1, 0.3);
    eyeR.rotation.y = 0.2;
    this.headGroup.add(eyeR);

    // Horns
    const hornL = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.5, 0.18), hornMat);
    hornL.position.set(-0.35, 0.55, -0.25);
    hornL.rotation.x = -0.4;
    this.headGroup.add(hornL);

    const hornR = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.5, 0.18), hornMat);
    hornR.position.set(0.35, 0.55, -0.25);
    hornR.rotation.x = -0.4;
    this.headGroup.add(hornR);

    // --- WINGS ---
    // Left Wing (Inner)
    this.leftWingRoot = new THREE.Group();
    this.leftWingRoot.position.set(-0.8, 0.4, 0.3);
    this.group.add(this.leftWingRoot);

    const innerWingL = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.12, 1.8), wingMat);
    innerWingL.position.set(-1.2, 0, 0);
    this.leftWingRoot.add(innerWingL);

    // Left Wing (Outer Tip)
    this.leftWingTip = new THREE.Group();
    this.leftWingTip.position.set(-2.4, 0, 0);
    this.leftWingRoot.add(this.leftWingTip);

    const outerWingL = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.08, 1.4), wingMat);
    outerWingL.position.set(-1.3, 0, 0.2);
    this.leftWingTip.add(outerWingL);

    // Right Wing (Inner)
    this.rightWingRoot = new THREE.Group();
    this.rightWingRoot.position.set(0.8, 0.4, 0.3);
    this.group.add(this.rightWingRoot);

    const innerWingR = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.12, 1.8), wingMat);
    innerWingR.position.set(1.2, 0, 0);
    this.rightWingRoot.add(innerWingR);

    // Right Wing (Outer Tip)
    this.rightWingTip = new THREE.Group();
    this.rightWingTip.position.set(2.4, 0, 0);
    this.rightWingRoot.add(this.rightWingTip);

    const outerWingR = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.08, 1.4), wingMat);
    outerWingR.position.set(1.3, 0, 0.2);
    this.rightWingTip.add(outerWingR);

    // --- TAIL ---
    let tailZ = -1.6;
    for (let i = 0; i < 5; i++) {
      const segSize = 0.8 - i * 0.1;
      const tailSeg = new THREE.Mesh(new THREE.BoxGeometry(segSize, segSize, 0.9), bodyMat);
      tailSeg.position.set(0, -0.1, tailZ - i * 0.75);
      this.group.add(tailSeg);
      this.tailSegments.push(tailSeg);
    }

    // Tail Fin / Spade at tip
    const tailFin = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.8, 0.9), hornMat);
    tailFin.position.set(0, 0.2, tailZ - 5 * 0.75);
    this.group.add(tailFin);

    // --- LEGS ---
    const legGeo = new THREE.BoxGeometry(0.4, 1.1, 0.4);
    const legFL = new THREE.Mesh(legGeo, bodyMat);
    legFL.position.set(-0.7, -0.8, 0.9);
    legFL.rotation.x = 0.3;
    this.group.add(legFL);

    const legFR = new THREE.Mesh(legGeo, bodyMat);
    legFR.position.set(0.7, -0.8, 0.9);
    legFR.rotation.x = 0.3;
    this.group.add(legFR);

    const legBL = new THREE.Mesh(legGeo, bodyMat);
    legBL.position.set(-0.7, -0.8, -1.0);
    legBL.rotation.x = -0.3;
    this.group.add(legBL);

    const legBR = new THREE.Mesh(legGeo, bodyMat);
    legBR.position.set(0.7, -0.8, -1.0);
    legBR.rotation.x = -0.3;
    this.group.add(legBR);

    scene.add(this.group);

    // 2. Trailing atmospheric particles
    const pGeo = new THREE.BufferGeometry();
    this.particlePositions = new Float32Array(this.particleCount * 3);
    this.particleLife = new Float32Array(this.particleCount);

    for (let i = 0; i < this.particleCount; i++) {
      this.particlePositions[i * 3] = 0;
      this.particlePositions[i * 3 + 1] = -1000;
      this.particlePositions[i * 3 + 2] = 0;
      this.particleLife[i] = i / this.particleCount;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(this.particlePositions, 3));

    const pMat = new THREE.PointsMaterial({
      color: config.particleColor,
      size: 0.65,
      transparent: true,
      opacity: 0.75
    });
    this.particles = new THREE.Points(pGeo, pMat);
    scene.add(this.particles);
  }

  public update(dt: number) {
    // 1. Advance flight angle along elliptical orbit
    this.flightAngle += dt * this.config.speed;
    this.flapTime += dt * 4.5;

    // Calculate current position
    const radiusX = this.config.patrolRadius;
    const radiusZ = this.config.patrolRadius * 1.15;
    const curX = this.config.centerPos.x + Math.cos(this.flightAngle) * radiusX;
    const curZ = this.config.centerPos.z + Math.sin(this.flightAngle) * radiusZ;
    const curY = this.config.baseAltitude + Math.sin(this.flightAngle * 2) * this.config.altitudeWave;

    // Velocity vector for heading and pitch
    const nextAngle = this.flightAngle + 0.05;
    const nextX = this.config.centerPos.x + Math.cos(nextAngle) * radiusX;
    const nextZ = this.config.centerPos.z + Math.sin(nextAngle) * radiusZ;
    const nextY = this.config.baseAltitude + Math.sin(nextAngle * 2) * this.config.altitudeWave;

    const dx = nextX - curX;
    const dz = nextZ - curZ;
    const dy = nextY - curY;

    this.heading = Math.atan2(dx, dz);
    const horizDist = Math.sqrt(dx * dx + dz * dz);
    const pitch = -Math.atan2(dy, horizDist);

    // Banking roll into turns
    const targetBank = -0.35; // banks into circular turn
    this.bankAngle += (targetBank - this.bankAngle) * dt * 3.0;

    // Update group transform
    this.position.set(curX, curY, curZ);
    this.group.position.copy(this.position);
    this.group.rotation.set(pitch, this.heading, this.bankAngle, 'YXZ');

    // 2. Articulated Wing Flapping
    const flap = Math.sin(this.flapTime);
    this.leftWingRoot.rotation.z = flap * 0.42;
    this.leftWingTip.rotation.z = Math.sin(this.flapTime - 0.4) * 0.35;

    this.rightWingRoot.rotation.z = -flap * 0.42;
    this.rightWingTip.rotation.z = -Math.sin(this.flapTime - 0.4) * 0.35;

    // Head undulation
    this.headGroup.rotation.x = Math.sin(this.flapTime * 0.5) * 0.12;

    // Tail undulating swish
    for (let i = 0; i < this.tailSegments.length; i++) {
      this.tailSegments[i].rotation.y = Math.sin(this.flapTime * 0.7 - i * 0.4) * 0.12;
    }

    // 3. Update Trail Particles
    const posAttr = this.particles.geometry.attributes.position as THREE.BufferAttribute;
    const positions = posAttr.array as Float32Array;

    for (let i = 0; i < this.particleCount; i++) {
      this.particleLife[i] -= dt * 1.2;
      if (this.particleLife[i] <= 0) {
        this.particleLife[i] = 1.0;
        // Spawn behind dragon
        positions[i * 3] = curX + (Math.random() - 0.5) * 1.5;
        positions[i * 3 + 1] = curY + (Math.random() - 0.5) * 1.0;
        positions[i * 3 + 2] = curZ + (Math.random() - 0.5) * 1.5;
      } else {
        // Drift slowly downwards
        positions[i * 3 + 1] -= dt * 0.8;
      }
    }
    posAttr.needsUpdate = true;
  }
}

export class DragonManager {
  private dragons: MinecraftDragon[] = [];

  constructor(scene: THREE.Scene) {
    const dragonConfigs: DragonConfig[] = [
      // 1. WEST / SOUTH-WEST: The Obsidian & Amethyst Dragon (Over Mexico & Aztec Step Pyramid)
      {
        id: 'ender_dragon',
        name: 'Quetzalcoatl Dragon',
        region: 'West',
        bodyColor: 0x18181b,
        wingColor: 0x059669,
        eyeColor: 0xf59e0b,
        centerPos: new THREE.Vector3(-120, 0, 80),
        patrolRadius: 42,
        baseAltitude: 38,
        altitudeWave: 6,
        speed: 0.22,
        particleColor: 0x34d399
      },
      // 2. NORTH-EAST: Indian Golden Garuda Wyrm (Over Taj Mahal & Imperial India)
      {
        id: 'frost_wyrm',
        name: 'Golden Garuda Wyrm',
        region: 'North',
        bodyColor: 0xfef08a,
        wingColor: 0xf59e0b,
        eyeColor: 0x06b6d4,
        centerPos: new THREE.Vector3(80, 0, -140),
        patrolRadius: 44,
        baseAltitude: 40,
        altitudeWave: 6,
        speed: 0.21,
        particleColor: 0xfde047
      },
      // 3. NORTH-WEST: Imperial Jade Dragon (Over China Great Wall & Pagoda)
      {
        id: 'emerald_dragon',
        name: 'Imperial Jade Dragon',
        region: 'East',
        bodyColor: 0x047857,
        wingColor: 0xd97706,
        eyeColor: 0xef4444,
        centerPos: new THREE.Vector3(-110, 0, -110),
        patrolRadius: 45,
        baseAltitude: 42,
        altitudeWave: 7,
        speed: 0.23,
        particleColor: 0x10b981
      },
      // 4. SOUTH / CARNIVAL: Sea Leviathan Dragon (Over Carnival Pier, Merlion & Ocean)
      {
        id: 'sea_leviathan',
        name: 'Carnival Sea Leviathan',
        region: 'South',
        bodyColor: 0x0284c7,
        wingColor: 0xec4899,
        eyeColor: 0x38bdf8,
        centerPos: new THREE.Vector3(20, 0, 140),
        patrolRadius: 42,
        baseAltitude: 34,
        altitudeWave: 5,
        speed: 0.22,
        particleColor: 0xf472b6
      }
    ];

    for (const cfg of dragonConfigs) {
      this.dragons.push(new MinecraftDragon(cfg, scene));
    }
  }

  public update(dt: number) {
    for (const d of this.dragons) {
      d.update(dt);
    }
  }

  public getDragons(): MinecraftDragon[] {
    return this.dragons;
  }
}
