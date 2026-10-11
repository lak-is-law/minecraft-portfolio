import * as THREE from 'three';
import { sound } from '../engine/audio';

export class LightningMcQueenManager {
  public scene: THREE.Scene;
  public group: THREE.Group;
  public bodyMesh: THREE.Group;

  // Wheel meshes for rotation & steering
  private wheels: THREE.Mesh[] = [];
  private frontWheelPivots: THREE.Group[] = [];
  private wheelRotation: number = 0;

  // Particle systems
  private tireSmokeParticles: THREE.Points;
  private smokePositions: Float32Array;
  private smokeVelocities: THREE.Vector3[] = [];
  private smokeLifetimes: number[] = [];

  private exhaustFlames: THREE.Points;
  private flamePositions: Float32Array;
  private flameLifetimes: number[] = [];

  // Race circuit track spline
  public trackCurve: THREE.CatmullRomCurve3;
  private trackProgress: number = 0; // 0..1 along loop
  private trackLength: number = 1;
  private currentSpeed: number = 18.0; // blocks/sec

  // Visual dynamics
  private bodyRoll: number = 0;
  private bodyPitch: number = 0;
  private driftAngle: number = 0;
  private engineSoundTimer: number = 0;

  // State
  public isPlayerDriving: boolean = false;
  public manualHeading: number = 0;
  public manualSpeed: number = 0;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.group = new THREE.Group();
    this.bodyMesh = new THREE.Group();

    // 1. Build authentic race circuit spline
    // Centered along Lightning McQueen Street & Radiator Springs Raceway
    const waypoints = [
      new THREE.Vector3(168, 1.4, -24), // Start / Finish line
      new THREE.Vector3(182, 1.4, -24), // Main Straight acceleration
      new THREE.Vector3(190, 1.4, -25), // East Bank turn entry
      new THREE.Vector3(194, 1.4, -32), // East curve apex 1
      new THREE.Vector3(194.5, 1.4, -46), // East curve apex 2 (Willy's Butte)
      new THREE.Vector3(194, 1.4, -60), // East curve apex 3
      new THREE.Vector3(190, 1.4, -67), // East turn exit
      new THREE.Vector3(182, 1.4, -68), // Canyon Back Straight entry
      new THREE.Vector3(174, 1.4, -68), // Canyon Back Straight mid
      new THREE.Vector3(164, 1.4, -68), // Canyon Back Straight end
      new THREE.Vector3(160, 1.4, -64), // West Chicane turn in
      new THREE.Vector3(160.5, 1.4, -50), // West Chicane mid
      new THREE.Vector3(161, 1.4, -36), // West Chicane exit
      new THREE.Vector3(163, 1.4, -26)  // S-curve into Front Straight
    ];
    this.trackCurve = new THREE.CatmullRomCurve3(waypoints, true, 'centripetal', 0.5);
    this.trackLength = this.trackCurve.getLength();

    // 2. Build 3D Lightning McQueen model
    this.buildLightningMcQueenModel();

    // 3. Setup particle systems (tire drift smoke & exhaust flames)
    const { smoke, smokePositions, smokeVel, smokeLife } = this.createTireSmokeSystem();
    this.tireSmokeParticles = smoke;
    this.smokePositions = smokePositions;
    this.smokeVelocities = smokeVel;
    this.smokeLifetimes = smokeLife;
    this.scene.add(this.tireSmokeParticles);

    const { flames, flamePositions, flameLife } = this.createExhaustFlameSystem();
    this.exhaustFlames = flames;
    this.flamePositions = flamePositions;
    this.flameLifetimes = flameLife;
    this.scene.add(this.exhaustFlames);

    this.group.add(this.bodyMesh);
    this.scene.add(this.group);

    // Initial position on start line
    const startPoint = this.trackCurve.getPointAt(0);
    this.group.position.copy(startPoint);
  }

  // -------------------------------------------------------------
  // BUILD MOVIE-ACCURATE 3D LIGHTNING McQUEEN (#95)
  // -------------------------------------------------------------
  private buildLightningMcQueenModel() {
    // Shimmering racing cherry red
    const carRedMat = new THREE.MeshStandardMaterial({
      color: 0xd0141e,
      roughness: 0.22,
      metalness: 0.38
    });
    // Dark red underbody trim
    const darkRedMat = new THREE.MeshStandardMaterial({
      color: 0x990d14,
      roughness: 0.35,
      metalness: 0.3
    });
    // Racing yellow for decals, rims, lightning bolts
    const yellowMat = new THREE.MeshStandardMaterial({
      color: 0xfacc15,
      roughness: 0.3,
      metalness: 0.2
    });
    // Vibrant orange for lightning bolt gradient
    const orangeMat = new THREE.MeshStandardMaterial({
      color: 0xf97316,
      roughness: 0.3,
      metalness: 0.2
    });
    // Chrome for exhaust & trim
    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      roughness: 0.15,
      metalness: 0.85
    });
    // Windshield eye whites
    const eyeWhiteMat = new THREE.MeshBasicMaterial({
      color: 0xffffff
    });
    // McQueen's expressive sky blue irises
    const irisBlueMat = new THREE.MeshBasicMaterial({
      color: 0x0284c7
    });
    // Pupils
    const pupilMat = new THREE.MeshBasicMaterial({
      color: 0x0f172a
    });
    // Teeth for front bumper grin
    const teethMat = new THREE.MeshBasicMaterial({
      color: 0xf8fafc
    });
    // Dark mouth interior
    const mouthMat = new THREE.MeshBasicMaterial({
      color: 0x1e1b18
    });

    // 1. Lower Chassis & Aerodynamic Floor
    const chassis = new THREE.Mesh(new THREE.BoxGeometry(1.68, 0.24, 3.4), darkRedMat);
    chassis.position.y = 0.24;
    this.bodyMesh.add(chassis);

    // 2. Main Red Body Hull (Stock Car Proportions)
    const mainBody = new THREE.Mesh(new THREE.BoxGeometry(1.64, 0.44, 3.2), carRedMat);
    mainBody.position.set(0, 0.52, -0.05);
    this.bodyMesh.add(mainBody);

    // Front Sloped Nose / Hood
    const nose = new THREE.Mesh(new THREE.BoxGeometry(1.58, 0.32, 1.15), carRedMat);
    nose.position.set(0, 0.44, 1.25);
    nose.rotation.x = 0.08;
    this.bodyMesh.add(nose);

    // Front Air Dam & Splitter Lip
    const frontSplitter = new THREE.Mesh(new THREE.BoxGeometry(1.66, 0.12, 0.38), darkRedMat);
    frontSplitter.position.set(0, 0.16, 1.82);
    this.bodyMesh.add(frontSplitter);

    // 3. FRONT BUMPER MOUTH & SIGNATURE CONFIDENT SMIRK
    const mouthBacking = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.2, 0.08), mouthMat);
    mouthBacking.position.set(0, 0.38, 1.84);
    this.bodyMesh.add(mouthBacking);

    // Pearlescent White Upper Teeth (confident smirk shape)
    const upperTeeth = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.08, 0.09), teethMat);
    upperTeeth.position.set(0.04, 0.42, 1.85); // Slight asymmetric cheeky tilt
    upperTeeth.rotation.z = -0.04;
    this.bodyMesh.add(upperTeeth);

    // Lower teeth
    const lowerTeeth = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.05, 0.09), teethMat);
    lowerTeeth.position.set(0.02, 0.34, 1.85);
    this.bodyMesh.add(lowerTeeth);

    // 4. CABIN & WINDSHIELD WITH PIXAR CARS EYES
    const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.36, 0.48, 1.45), carRedMat);
    cabin.position.set(0, 0.94, -0.22);
    this.bodyMesh.add(cabin);

    // Sloped Windshield Base
    const windshield = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.42, 0.1), eyeWhiteMat);
    windshield.position.set(0, 0.92, 0.52);
    windshield.rotation.x = -0.32;
    this.bodyMesh.add(windshield);

    // McQueen's Expressive Big Blue Eyes on Windshield
    for (const side of [-0.32, 0.32]) {
      // Blue Iris
      const iris = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.04, 16), irisBlueMat);
      iris.rotation.x = Math.PI / 2 - 0.32;
      iris.position.set(side, 0.92, 0.56);
      this.bodyMesh.add(iris);

      // Dark Pupil
      const pupil = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.065, 0.045, 16), pupilMat);
      pupil.rotation.x = Math.PI / 2 - 0.32;
      pupil.position.set(side, 0.92, 0.57);
      this.bodyMesh.add(pupil);

      // White Specular Catchlight Sparkle
      const glint = new THREE.Mesh(new THREE.SphereGeometry(0.025, 8, 8), eyeWhiteMat);
      glint.position.set(side + 0.035, 0.95, 0.585);
      this.bodyMesh.add(glint);

      // Red Eyelid / Brow Arch (Giving determined champion look)
      const brow = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.06, 0.06), carRedMat);
      brow.position.set(side, 1.04, 0.52);
      brow.rotation.z = side > 0 ? -0.12 : 0.12;
      this.bodyMesh.add(brow);
    }

    // Side windows (tinted dark/reflective)
    const sideGlassMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.1, metalness: 0.6 });
    for (const sx of [-0.69, 0.69]) {
      const sideGlass = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.34, 1.05), sideGlassMat);
      sideGlass.position.set(sx, 0.92, -0.22);
      this.bodyMesh.add(sideGlass);
    }

    // Rear window
    const rearGlass = new THREE.Mesh(new THREE.BoxGeometry(1.22, 0.34, 0.04), sideGlassMat);
    rearGlass.position.set(0, 0.92, -0.96);
    rearGlass.rotation.x = 0.35;
    this.bodyMesh.add(rearGlass);

    // 5. RUST-EZE LOGO BADGE ON HOOD
    const rustezeHoodBadge = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.04, 16), yellowMat);
    rustezeHoodBadge.position.set(0, 0.63, 1.15);
    rustezeHoodBadge.rotation.x = 0.08;
    this.bodyMesh.add(rustezeHoodBadge);

    const rustezeInnerRing = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.045, 16), darkRedMat);
    rustezeInnerRing.position.set(0, 0.635, 1.15);
    rustezeInnerRing.rotation.x = 0.08;
    this.bodyMesh.add(rustezeInnerRing);

    // 6. ICONIC YELLOW & ORANGE LIGHTNING BOLTS (KA-CHOW!) ON BOTH SIDES
    for (const sx of [-0.83, 0.83]) {
      // Main Jagged Lightning Bolt
      const boltMain = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.18, 1.7), yellowMat);
      boltMain.position.set(sx, 0.54, -0.05);
      boltMain.rotation.y = sx > 0 ? 0.04 : -0.04;
      this.bodyMesh.add(boltMain);

      // Orange Shadow / Fire Glow Accent Under Bolt
      const boltGlow = new THREE.Mesh(new THREE.BoxGeometry(0.038, 0.08, 1.8), orangeMat);
      boltGlow.position.set(sx, 0.44, -0.08);
      this.bodyMesh.add(boltGlow);

      // Angled Bolt Strike Tip
      const boltTip = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.22, 0.45), yellowMat);
      boltTip.position.set(sx, 0.62, 0.52);
      boltTip.rotation.x = 0.45;
      this.bodyMesh.add(boltTip);

      // NUMBER 95 ON SIDES
      const numPlate = new THREE.Mesh(new THREE.BoxGeometry(0.042, 0.24, 0.45), yellowMat);
      numPlate.position.set(sx, 0.58, -0.25);
      this.bodyMesh.add(numPlate);

      // Number drop shadow
      const numShadow = new THREE.Mesh(new THREE.BoxGeometry(0.044, 0.18, 0.38), darkRedMat);
      numShadow.position.set(sx, 0.57, -0.25);
      this.bodyMesh.add(numShadow);
    }

    // NUMBER 95 ON ROOF
    const roofNumber = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.04, 0.58), yellowMat);
    roofNumber.position.set(0, 1.2, -0.22);
    this.bodyMesh.add(roofNumber);

    const roofNumberAccent = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.045, 0.44), darkRedMat);
    roofNumberAccent.position.set(0, 1.205, -0.22);
    this.bodyMesh.add(roofNumberAccent);

    // 7. HIGH-DOWNFORCE REAR SPOILER WING & RUST-EZE SPONSORSHIP
    // Dual Stanchions
    for (const sx of [-0.52, 0.52]) {
      const stanchion = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.38, 0.12), darkRedMat);
      stanchion.position.set(sx, 0.88, -1.6);
      stanchion.rotation.x = 0.15;
      this.bodyMesh.add(stanchion);
    }

    // Wide Wing Blade
    const spoilerWing = new THREE.Mesh(new THREE.BoxGeometry(1.68, 0.08, 0.38), carRedMat);
    spoilerWing.position.set(0, 1.08, -1.62);
    spoilerWing.rotation.x = -0.06;
    this.bodyMesh.add(spoilerWing);

    // Wing Endplates
    for (const sx of [-0.84, 0.84]) {
      const endplate = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.22, 0.42), carRedMat);
      endplate.position.set(sx, 1.08, -1.62);
      this.bodyMesh.add(endplate);
    }

    // Rust-eze Sponsor Banner along Spoiler
    const spoilerBanner = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.02, 0.26), yellowMat);
    spoilerBanner.position.set(0, 1.13, -1.62);
    this.bodyMesh.add(spoilerBanner);

    // 8. DUAL CHROME SIDE EXHAUST PIPES
    for (const sx of [-0.86, 0.86]) {
      for (const zo of [-0.35, -0.22]) {
        const pipe = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.22, 12), chromeMat);
        pipe.rotation.z = Math.PI / 2;
        pipe.position.set(sx, 0.25, zo);
        this.bodyMesh.add(pipe);
      }
    }

    // 9. HEADLIGHT STICKERS & REAR TAILLIGHTS
    // Headlight stickers ("Stickers! Race cars don't need headlights!")
    for (const sx of [-0.62, 0.62]) {
      const hlSticker = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.12, 0.06), yellowMat);
      hlSticker.position.set(sx, 0.52, 1.78);
      hlSticker.rotation.y = sx > 0 ? -0.2 : 0.2;
      this.bodyMesh.add(hlSticker);
    }

    // Rear Taillights
    for (const sx of [-0.62, 0.62]) {
      const tailLight = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.08, 0.06), new THREE.MeshBasicMaterial({ color: 0xef4444 }));
      tailLight.position.set(sx, 0.58, -1.68);
      this.bodyMesh.add(tailLight);
    }

    // 10. 4 RACING WHEELS (RED RIMS & LIGHTYEAR TIRES)
    // Front Left, Front Right, Rear Left, Rear Right
    const wheelCoords: [number, number, number, boolean][] = [
      [-0.88, 0.32, 1.1, true],   // Front Left
      [0.88, 0.32, 1.1, true],    // Front Right
      [-0.88, 0.32, -1.15, false], // Rear Left
      [0.88, 0.32, -1.15, false]  // Rear Right
    ];

    const tireMat = new THREE.MeshStandardMaterial({ color: 0x171717, roughness: 0.8, metalness: 0.1 });
    const rimRedMat = new THREE.MeshStandardMaterial({ color: 0xd0141e, roughness: 0.3, metalness: 0.4 });
    const lugNutMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.2, metalness: 0.6 });

    for (const [wx, wy, wz, isFront] of wheelCoords) {
      const wheelAssembly = new THREE.Group();
      wheelAssembly.position.set(wx, wy, wz);

      // Rotating Wheel Mesh
      const wheelMesh = new THREE.Group();

      // Outer Tire (Lightyear racing slick)
      const tire = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.22, 18), tireMat);
      tire.rotation.z = Math.PI / 2;
      wheelMesh.add(tire);

      // Signature Cherry Red Rim
      const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.23, 16), rimRedMat);
      rim.rotation.z = Math.PI / 2;
      wheelMesh.add(rim);

      // Yellow Center Lug Nut
      const lug = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.25, 8), lugNutMat);
      lug.rotation.z = Math.PI / 2;
      wheelMesh.add(lug);

      // Yellow "LIGHTYEAR" Sidewall Lettering Emblems
      for (let a = 0; a < Math.PI * 2; a += Math.PI) {
        const letter = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.05, 0.12), yellowMat);
        letter.position.set((wx > 0 ? 0.12 : -0.12), Math.sin(a) * 0.28, Math.cos(a) * 0.28);
        wheelMesh.add(letter);
      }

      this.wheels.push(wheelMesh as any);

      if (isFront) {
        const pivot = new THREE.Group();
        pivot.add(wheelMesh);
        wheelAssembly.add(pivot);
        this.frontWheelPivots.push(pivot);
      } else {
        wheelAssembly.add(wheelMesh);
      }

      this.bodyMesh.add(wheelAssembly);
    }
  }

  // -------------------------------------------------------------
  // PARTICLE SYSTEMS: TIRE DRIFT SMOKE & EXHAUST NITRO FLAMES
  // -------------------------------------------------------------
  private createTireSmokeSystem() {
    const count = 75;
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const velocities: THREE.Vector3[] = [];
    const lifetimes: number[] = [];

    for (let i = 0; i < count; i++) {
      positions[i * 3] = 0;
      positions[i * 3 + 1] = -100; // initially hidden
      positions[i * 3 + 2] = 0;
      velocities.push(new THREE.Vector3());
      lifetimes.push(1.0);
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const mat = new THREE.PointsMaterial({
      color: 0xe2e8f0,
      size: 0.65,
      transparent: true,
      opacity: 0.6,
      depthWrite: false
    });

    const smoke = new THREE.Points(geo, mat);
    return { smoke, smokePositions: positions, smokeVel: velocities, smokeLife: lifetimes };
  }

  private createExhaustFlameSystem() {
    const count = 40;
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const lifetimes: number[] = [];

    for (let i = 0; i < count; i++) {
      positions[i * 3] = 0;
      positions[i * 3 + 1] = -100;
      positions[i * 3 + 2] = 0;
      lifetimes.push(1.0);
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const mat = new THREE.PointsMaterial({
      color: 0xf97316,
      size: 0.45,
      transparent: true,
      opacity: 0.85,
      depthWrite: false
    });

    const flames = new THREE.Points(geo, mat);
    return { flames, flamePositions: positions, flameLife: lifetimes };
  }

  public emitTireSmoke(origin: THREE.Vector3, intensity: number = 1.0) {
    let emitted = 0;
    const maxToEmit = Math.round(3 * intensity);

    for (let i = 0; i < this.smokeLifetimes.length && emitted < maxToEmit; i++) {
      if (this.smokeLifetimes[i] >= 0.8) {
        this.smokePositions[i * 3] = origin.x + (Math.random() - 0.5) * 0.4;
        this.smokePositions[i * 3 + 1] = origin.y + 0.15;
        this.smokePositions[i * 3 + 2] = origin.z + (Math.random() - 0.5) * 0.4;

        this.smokeVelocities[i].set(
          (Math.random() - 0.5) * 1.5,
          0.8 + Math.random() * 1.2,
          (Math.random() - 0.5) * 1.5
        );
        this.smokeLifetimes[i] = 0;
        emitted++;
      }
    }
    this.tireSmokeParticles.geometry.attributes.position.needsUpdate = true;
  }

  public emitExhaustFlame(origin: THREE.Vector3) {
    for (let i = 0; i < this.flameLifetimes.length; i++) {
      if (this.flameLifetimes[i] >= 0.4) {
        this.flamePositions[i * 3] = origin.x;
        this.flamePositions[i * 3 + 1] = origin.y;
        this.flamePositions[i * 3 + 2] = origin.z;
        this.flameLifetimes[i] = 0;
        break;
      }
    }
    this.exhaustFlames.geometry.attributes.position.needsUpdate = true;
  }

  // -------------------------------------------------------------
  // UPDATE LOOP: AUTONOMOUS 3D RACING & SIMULATION
  // -------------------------------------------------------------
  public update(dt: number, playerPos?: THREE.Vector3) {
    // 1. Update particle systems
    this.updateParticles(dt);

    if (this.isPlayerDriving) {
      // In manual drive mode, Player controls position and heading
      return;
    }

    // 2. Autonomous Racing Loop along trackCurve
    const totalDist = this.trackLength;
    this.trackProgress = (this.trackProgress + (this.currentSpeed * dt) / totalDist) % 1.0;

    // Get current position & tangent ahead
    const currentPoint = this.trackCurve.getPointAt(this.trackProgress);
    const aheadProgress = (this.trackProgress + 0.015) % 1.0;
    const aheadPoint = this.trackCurve.getPointAt(aheadProgress);

    const tangent = aheadPoint.clone().sub(currentPoint).normalize();
    const targetHeading = Math.atan2(tangent.x, tangent.z);

    // Dynamic racing speed: fast on straights, controlled braking in curves
    const lookAheadProgress = (this.trackProgress + 0.05) % 1.0;
    const lookAheadPoint = this.trackCurve.getPointAt(lookAheadProgress);
    const lookAheadTangent = lookAheadPoint.clone().sub(aheadPoint).normalize();
    const curvature = Math.abs(tangent.angleTo(lookAheadTangent));

    if (curvature > 0.18) {
      // Approaching hairpin curve: brake & drift!
      this.currentSpeed = THREE.MathUtils.lerp(this.currentSpeed, 14.5, dt * 3.5);
      this.driftAngle = THREE.MathUtils.lerp(this.driftAngle, (tangent.x > 0 ? 0.28 : -0.28), dt * 6.0);
      this.bodyRoll = THREE.MathUtils.lerp(this.bodyRoll, (tangent.x > 0 ? -0.09 : 0.09), dt * 5.0);

      // Emit drift smoke puffs!
      this.emitTireSmoke(this.group.position, 1.4);
    } else {
      // Fast straightaway acceleration! ("I am speed!")
      this.currentSpeed = THREE.MathUtils.lerp(this.currentSpeed, 24.0, dt * 2.5);
      this.driftAngle = THREE.MathUtils.lerp(this.driftAngle, 0, dt * 4.0);
      this.bodyRoll = THREE.MathUtils.lerp(this.bodyRoll, 0, dt * 4.0);

      // Periodic exhaust flame pops on high-speed straights
      if (Math.random() < 0.12) {
        this.emitExhaustFlame(this.group.position.clone().add(new THREE.Vector3(0.85, 0.25, -0.3)));
      }
    }

    // Smooth position & heading interpolation
    this.group.position.lerp(currentPoint, 0.7);
    this.group.rotation.y = targetHeading + this.driftAngle;
    this.bodyMesh.rotation.z = this.bodyRoll;

    // Wheel rotation based on ground speed
    const wheelRadius = 0.34;
    this.wheelRotation += (this.currentSpeed * dt) / wheelRadius;
    for (const w of this.wheels) {
      w.rotation.x = this.wheelRotation;
    }

    // Front wheel steering angle
    const steerAngle = THREE.MathUtils.clamp((targetHeading - this.group.rotation.y) * 1.8, -0.45, 0.45);
    for (const p of this.frontWheelPivots) {
      p.rotation.y = steerAngle;
    }

    // Engine sound synthesis based on proximity to player
    if (playerPos) {
      const distToPlayer = this.group.position.distanceTo(playerPos);
      if (distToPlayer < 45) {
        this.engineSoundTimer += dt;
        if (this.engineSoundTimer > 0.35) {
          const revPitch = (this.currentSpeed / 20.0) * (1.0 - Math.min(1.0, distToPlayer / 50));
          if (revPitch > 0.25) {
            sound.playRaceCarEngine(revPitch);
          }
          this.engineSoundTimer = 0;
        }
      }
    }
  }

  private updateParticles(dt: number) {
    // Tire smoke
    for (let i = 0; i < this.smokeLifetimes.length; i++) {
      if (this.smokeLifetimes[i] < 1.0) {
        this.smokeLifetimes[i] += dt * 1.6;
        this.smokePositions[i * 3] += this.smokeVelocities[i].x * dt;
        this.smokePositions[i * 3 + 1] += this.smokeVelocities[i].y * dt;
        this.smokePositions[i * 3 + 2] += this.smokeVelocities[i].z * dt;
      } else {
        this.smokePositions[i * 3 + 1] = -100;
      }
    }
    this.tireSmokeParticles.geometry.attributes.position.needsUpdate = true;

    // Exhaust flames
    for (let i = 0; i < this.flameLifetimes.length; i++) {
      if (this.flameLifetimes[i] < 0.4) {
        this.flameLifetimes[i] += dt * 4.0;
      } else {
        this.flamePositions[i * 3 + 1] = -100;
      }
    }
    this.exhaustFlames.geometry.attributes.position.needsUpdate = true;
  }

  // -------------------------------------------------------------
  // MANUAL DRIVING MODE INTERFACE FOR PLAYER
  // -------------------------------------------------------------
  public setManualTransform(pos: THREE.Vector3, heading: number, speed: number, isDrifting: boolean, isBoost: boolean, steerInput: number) {
    this.group.position.copy(pos);
    this.group.rotation.y = heading;

    // Dynamic wheel rotation
    const wheelRadius = 0.34;
    this.wheelRotation += (speed * 0.016) / wheelRadius;
    for (const w of this.wheels) {
      w.rotation.x = this.wheelRotation;
    }

    // Front steering pivots
    for (const p of this.frontWheelPivots) {
      p.rotation.y = steerInput * 0.42;
    }

    // Body roll & pitch
    this.bodyRoll = THREE.MathUtils.lerp(this.bodyRoll, -steerInput * (speed / 20.0) * 0.12, 0.2);
    this.bodyMesh.rotation.z = this.bodyRoll;

    // Particle FX
    if (isDrifting || Math.abs(steerInput) > 0.5) {
      this.emitTireSmoke(this.group.position, 1.8);
    }
    if (isBoost || speed > 22) {
      this.emitExhaustFlame(this.group.position.clone().add(new THREE.Vector3(0.85, 0.25, -0.3)));
      this.emitExhaustFlame(this.group.position.clone().add(new THREE.Vector3(-0.85, 0.25, -0.3)));
    }
  }

  public getPosition(): THREE.Vector3 {
    return this.group.position;
  }

  public getRideTransform(): { position: THREE.Vector3; rotationY: number } {
    const seatOffset = new THREE.Vector3(0, 0.85, 0.15);
    seatOffset.applyAxisAngle(new THREE.Vector3(0, 1, 0), this.group.rotation.y);
    const seatPos = this.group.position.clone().add(seatOffset);
    return { position: seatPos, rotationY: this.group.rotation.y };
  }
}
