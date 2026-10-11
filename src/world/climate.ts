import * as THREE from 'three';
import { sound } from '../engine/audio';

export type WeatherKind = 'clear' | 'rain' | 'thunderstorm' | 'aurora' | 'snowfall' | 'rainbow';
export type SeasonKind = 'spring' | 'summer' | 'autumn' | 'winter';

const WEATHER_SEQUENCE: WeatherKind[] = ['clear', 'rain', 'thunderstorm', 'aurora', 'snowfall', 'rainbow'];
const SEASON_SEQUENCE: SeasonKind[] = ['spring', 'summer', 'autumn', 'winter'];

const RAIN_COUNT = 850;
const RAIN_SPLASH_COUNT = 160;
const SNOW_COUNT = 260;
const SEASON_PARTICLE_COUNT = 140;
const LIGHTNING_SEGMENTS = 48;
const LIGHTNING_SPARKS = 36;

export class ClimateEffects {
  public weather: WeatherKind = 'clear';
  public season: SeasonKind = 'spring';
  public onChange?: (weather: WeatherKind, season: SeasonKind) => void;

  private readonly rain: THREE.LineSegments;
  private readonly rainSplashes: THREE.Points;
  private readonly snow: THREE.Points;
  private readonly seasonParticles: THREE.Points;
  private readonly rainbow: THREE.Group;
  private readonly lightningLight: THREE.AmbientLight;
  private readonly lightningBolt: THREE.LineSegments;
  private readonly lightningSparks: THREE.Points;
  private readonly auroraGroup: THREE.Group;
  private readonly auroraMeshes: THREE.Mesh[] = [];
  private readonly auroraBasePositions: Float32Array[] = [];

  private readonly lastPlayerPosition = new THREE.Vector3();
  private readonly rainSpeeds = new Float32Array(RAIN_COUNT);
  private readonly rainSplashLifetimes = new Float32Array(RAIN_SPLASH_COUNT);
  private readonly snowSpeeds = new Float32Array(SNOW_COUNT);
  private readonly seasonSpeeds = new Float32Array(SEASON_PARTICLE_COUNT);

  private lightningTimer = 4.5;
  private flashIntensity = 0;
  private lightningFlickerTimer = 0;
  private strikePosition = new THREE.Vector3();
  private wasRaining = false;
  private auroraCurrentOpacity = 0;

  constructor(
    private readonly scene: THREE.Scene,
    private readonly sunLight: THREE.DirectionalLight,
    private readonly ambientLight: THREE.AmbientLight
  ) {
    this.rain = this.createRain();
    this.rainSplashes = this.createRainSplashes();
    this.snow = this.createFallingParticles(SNOW_COUNT, 0xffffff, 0.24, this.snowSpeeds, 1.8, 4.5);
    this.seasonParticles = this.createFallingParticles(SEASON_PARTICLE_COUNT, 0xffc5d3, 0.18, this.seasonSpeeds, 1.0, 2.8);
    this.rainbow = this.createRainbow();
    this.lightningLight = new THREE.AmbientLight(0xd9ebff, 0);

    // 3D Branching Lightning & Sparks
    const { bolt, sparks } = this.createLightningSystem();
    this.lightningBolt = bolt;
    this.lightningSparks = sparks;

    // Aurora Borealis
    this.auroraGroup = this.createAuroraBorealis();

    this.scene.add(
      this.rain,
      this.rainSplashes,
      this.snow,
      this.seasonParticles,
      this.rainbow,
      this.lightningLight,
      this.lightningBolt,
      this.lightningSparks,
      this.auroraGroup
    );
  }

  public cycleWeather() {
    const index = WEATHER_SEQUENCE.indexOf(this.weather);
    this.weather = WEATHER_SEQUENCE[(index + 1) % WEATHER_SEQUENCE.length];
    if (this.weather === 'thunderstorm') {
      this.lightningTimer = 1.5 + Math.random() * 2;
    } else if (this.weather === 'aurora') {
      sound.playAuroraChime();
    }
    this.onChange?.(this.weather, this.season);
  }

  public setWeather(weather: WeatherKind) {
    this.weather = weather;
    if (this.weather === 'thunderstorm') {
      this.lightningTimer = 1.5 + Math.random() * 2;
    } else if (this.weather === 'aurora') {
      sound.playAuroraChime();
    }
    this.onChange?.(this.weather, this.season);
  }

  public cycleSeason() {
    const index = SEASON_SEQUENCE.indexOf(this.season);
    this.season = SEASON_SEQUENCE[(index + 1) % SEASON_SEQUENCE.length];
    const material = this.seasonParticles.material as THREE.PointsMaterial;
    material.color.set(this.season === 'autumn' ? 0xeaa64b : this.season === 'summer' ? 0xffef9c : 0xffc5d3);
    this.onChange?.(this.weather, this.season);
  }

  public update(dt: number, playerPosition: THREE.Vector3, yaw: number, isNightTime: boolean = false) {
    const raining = this.weather === 'rain' || this.weather === 'thunderstorm';
    const isAlpine = (playerPosition.z <= -70 && Math.abs(playerPosition.x) <= 55 && playerPosition.y >= 3);
    const snowing = this.weather === 'snowfall' || (this.season === 'winter' && this.weather === 'clear') || isAlpine;
    const seasonActive = (this.season === 'spring' || this.season === 'summer' || this.season === 'autumn') && !isAlpine;

    // Handle ambient rain loop sound
    if (raining && !this.wasRaining) {
      sound.startRainAmbient(this.weather === 'thunderstorm' ? 0.22 : 0.14);
      this.wasRaining = true;
    } else if (!raining && this.wasRaining) {
      sound.stopRainAmbient();
      this.wasRaining = false;
    }

    const move = playerPosition.clone().sub(this.lastPlayerPosition);
    this.lastPlayerPosition.copy(playerPosition);

    if (raining) {
      this.translateParticles(this.rain.geometry, move);
      this.translateParticles(this.rainSplashes.geometry, move);
      this.updateFallers(this.rain, this.rainSpeeds, dt, playerPosition, 2, 22, 1.4);
      this.updateRainSplashes(dt, playerPosition);
    }
    if (snowing) {
      this.translateParticles(this.snow.geometry, move);
      this.updateFallers(this.snow, this.snowSpeeds, dt, playerPosition, 1, 15, 0.8);
    }
    if (seasonActive) {
      this.translateParticles(this.seasonParticles.geometry, move);
      this.updateFallers(this.seasonParticles, this.seasonSpeeds, dt, playerPosition, 1, 11, 0.5);
    }

    this.rain.visible = raining;
    this.rainSplashes.visible = raining;
    this.snow.visible = snowing;
    this.seasonParticles.visible = seasonActive;
    this.rainbow.visible = this.weather === 'rainbow';

    // Sky & Lighting gloom adjustments
    const gloom = this.weather === 'thunderstorm' ? 0.32 : raining ? 0.58 : snowing ? 0.80 : 1.0;
    this.sunLight.intensity *= gloom;
    this.ambientLight.intensity *= this.weather === 'thunderstorm' ? 0.55 : raining ? 0.78 : 1.0;
    if (this.scene.fog instanceof THREE.FogExp2) {
      this.scene.fog.density = THREE.MathUtils.lerp(0.008, 0.024, 1 - gloom);
    }

    // Rainbow positioning
    this.rainbow.position.set(
      playerPosition.x - Math.sin(yaw) * 65,
      playerPosition.y + 1,
      playerPosition.z - Math.cos(yaw) * 65
    );
    this.rainbow.rotation.y = yaw;

    // Thunderstorm lightning strikes & visual 3D bolts
    this.updateLightning(dt, playerPosition);

    // Aurora Borealis (Northern Lights)
    this.updateAurora(dt, playerPosition, isNightTime, isAlpine);
  }

  // Thunderstorm: 3D jagged branching electric bolt + flashes + sparks
  private updateLightning(dt: number, playerPosition: THREE.Vector3) {
    this.lightningTimer -= dt;
    if (this.weather === 'thunderstorm' && this.lightningTimer <= 0) {
      this.triggerLightningStrike(playerPosition);
      this.lightningTimer = 4.5 + Math.random() * 9;
    }

    if (this.lightningFlickerTimer > 0) {
      this.lightningFlickerTimer -= dt;

      // Realistic multi-stage lightning flash flicker
      const t = this.lightningFlickerTimer;
      const isVisible = (t > 0.20) || (t > 0.08 && t < 0.16);
      this.lightningBolt.visible = isVisible;
      this.lightningSparks.visible = isVisible;

      if (isVisible) {
        this.flashIntensity = 3.6;
      } else {
        this.flashIntensity = 0.8;
      }

      // Animate ground electrical sparks bouncing
      this.updateSparks(dt);

      if (this.lightningFlickerTimer <= 0) {
        this.lightningBolt.visible = false;
        this.lightningSparks.visible = false;
      }
    } else {
      this.flashIntensity *= Math.exp(-dt * 14);
      this.lightningBolt.visible = false;
      this.lightningSparks.visible = false;
    }

    this.lightningLight.intensity = this.weather === 'thunderstorm' ? this.flashIntensity : 0;
  }

  private triggerLightningStrike(playerPosition: THREE.Vector3) {
    // Pick strike location 18 to 45 blocks away from player
    const angle = Math.random() * Math.PI * 2;
    const distance = 18 + Math.random() * 26;
    const groundY = Math.max(1, playerPosition.y - 1);
    this.strikePosition.set(
      playerPosition.x + Math.cos(angle) * distance,
      groundY,
      playerPosition.z + Math.sin(angle) * distance
    );

    this.generateLightningGeometry(this.strikePosition);
    this.generateSparkParticles(this.strikePosition);

    this.lightningFlickerTimer = 0.32;
    this.flashIntensity = 4.0;
    this.lightningBolt.visible = true;
    this.lightningSparks.visible = true;

    sound.playThunder();
  }

  private generateLightningGeometry(target: THREE.Vector3) {
    const positions = this.lightningBolt.geometry.attributes.position.array as Float32Array;
    let segIdx = 0;

    const cloudY = target.y + 36 + Math.random() * 8;
    const startX = target.x + (Math.random() - 0.5) * 12;
    const startZ = target.z + (Math.random() - 0.5) * 12;

    let curX = startX;
    let curY = cloudY;
    let curZ = startZ;

    const steps = 14;
    const stepY = (cloudY - target.y) / steps;

    // Main bolt down to target
    for (let i = 0; i < steps && segIdx < LIGHTNING_SEGMENTS; i++) {
      const nextX = (i === steps - 1) ? target.x : curX + (Math.random() - 0.5) * 4.5;
      const nextY = Math.max(target.y, curY - stepY);
      const nextZ = (i === steps - 1) ? target.z : curZ + (Math.random() - 0.5) * 4.5;

      const offset = segIdx * 6;
      positions[offset] = curX;
      positions[offset + 1] = curY;
      positions[offset + 2] = curZ;
      positions[offset + 3] = nextX;
      positions[offset + 4] = nextY;
      positions[offset + 5] = nextZ;
      segIdx++;

      // Branching side forks at mid-height
      if ((i === 4 || i === 8) && segIdx < LIGHTNING_SEGMENTS - 3) {
        let branchX = curX;
        let branchY = curY;
        let branchZ = curZ;
        const branchSteps = 3;
        for (let b = 0; b < branchSteps && segIdx < LIGHTNING_SEGMENTS; b++) {
          const bNextX = branchX + (Math.random() - 0.5) * 6;
          const bNextY = branchY - stepY * 0.8;
          const bNextZ = branchZ + (Math.random() - 0.5) * 6;
          const bOff = segIdx * 6;
          positions[bOff] = branchX;
          positions[bOff + 1] = branchY;
          positions[bOff + 2] = branchZ;
          positions[bOff + 3] = bNextX;
          positions[bOff + 4] = bNextY;
          positions[bOff + 5] = bNextZ;
          segIdx++;
          branchX = bNextX;
          branchY = bNextY;
          branchZ = bNextZ;
        }
      }

      curX = nextX;
      curY = nextY;
      curZ = nextZ;
    }

    // Zero out unused segments
    for (let i = segIdx; i < LIGHTNING_SEGMENTS; i++) {
      const offset = i * 6;
      for (let j = 0; j < 6; j++) positions[offset + j] = 0;
    }

    this.lightningBolt.geometry.attributes.position.needsUpdate = true;
  }

  private generateSparkParticles(target: THREE.Vector3) {
    const positions = this.lightningSparks.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < LIGHTNING_SPARKS; i++) {
      positions[i * 3] = target.x + (Math.random() - 0.5) * 1.5;
      positions[i * 3 + 1] = target.y + Math.random() * 0.8;
      positions[i * 3 + 2] = target.z + (Math.random() - 0.5) * 1.5;
    }
    this.lightningSparks.geometry.attributes.position.needsUpdate = true;
  }

  private updateSparks(dt: number) {
    const positions = this.lightningSparks.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < LIGHTNING_SPARKS; i++) {
      positions[i * 3] += (Math.random() - 0.5) * dt * 14;
      positions[i * 3 + 1] += Math.random() * dt * 6;
      positions[i * 3 + 2] += (Math.random() - 0.5) * dt * 14;
    }
    this.lightningSparks.geometry.attributes.position.needsUpdate = true;
  }

  // Aurora Borealis: flowing glowing ribbons with dynamic sine undulations
  private updateAurora(dt: number, playerPosition: THREE.Vector3, isNightTime: boolean, isAlpine: boolean) {
    const isExplicitAurora = this.weather === 'aurora';
    const isNightAurora = isNightTime && (this.season === 'winter' || isAlpine || this.weather === 'clear');
    const targetOpacity = isExplicitAurora ? 0.92 : isNightAurora ? 0.65 : 0;

    // Smoothly fade in/out
    this.auroraCurrentOpacity = THREE.MathUtils.lerp(this.auroraCurrentOpacity, targetOpacity, dt * 1.6);
    this.auroraGroup.visible = this.auroraCurrentOpacity > 0.02;

    if (!this.auroraGroup.visible) return;

    // Follow player smoothly across horizon
    this.auroraGroup.position.x = playerPosition.x;
    this.auroraGroup.position.z = playerPosition.z - 55;
    this.auroraGroup.position.y = 0;

    const time = performance.now() * 0.0009;

    // Undulate each aurora ribbon
    for (let r = 0; r < this.auroraMeshes.length; r++) {
      const mesh = this.auroraMeshes[r];
      const mat = mesh.material as THREE.MeshBasicMaterial;
      mat.opacity = this.auroraCurrentOpacity * (r === 0 ? 0.85 : 0.65);

      const posAttr = mesh.geometry.attributes.position;
      const positions = posAttr.array as Float32Array;
      const basePos = this.auroraBasePositions[r];
      const vertCount = posAttr.count;

      for (let i = 0; i < vertCount; i++) {
        const bx = basePos[i * 3];
        const by = basePos[i * 3 + 1];
        const bz = basePos[i * 3 + 2];

        // Complex undulating wave deformation simulating solar wind ribbons
        const wave1 = Math.sin(bx * 0.035 + time * 1.2 + r * 1.4) * 8.5;
        const wave2 = Math.cos(bx * 0.065 - time * 0.85) * 4.2;
        const waveY = Math.sin(bx * 0.028 + time * 0.9) * 3.2;

        positions[i * 3] = bx;
        positions[i * 3 + 1] = by + waveY;
        positions[i * 3 + 2] = bz + wave1 + wave2;
      }
      posAttr.needsUpdate = true;
    }
  }

  private createAuroraBorealis(): THREE.Group {
    const group = new THREE.Group();
    const ribbonConfigs = [
      { y: 34, z: -80, width: 260, height: 32, segX: 64, segY: 8, baseCurvature: 18 },
      { y: 40, z: -110, width: 280, height: 36, segX: 64, segY: 8, baseCurvature: 26 },
      { y: 46, z: -145, width: 310, height: 38, segX: 64, segY: 8, baseCurvature: 34 }
    ];

    ribbonConfigs.forEach((cfg) => {
      const geo = new THREE.PlaneGeometry(cfg.width, cfg.height, cfg.segX, cfg.segY);
      const posAttr = geo.attributes.position;
      const vertCount = posAttr.count;
      const colors = new Float32Array(vertCount * 3);

      // Curve ribbon into an arch across northern horizon
      for (let i = 0; i < vertCount; i++) {
        const x = posAttr.getX(i);
        const y = posAttr.getY(i);
        // Arch curvature: parabolic arching backward
        const archZ = -(Math.pow(x / (cfg.width * 0.5), 2)) * cfg.baseCurvature;
        posAttr.setZ(i, archZ);

        // Vertical gradient calculation (normalized 0 to 1 from bottom to top)
        const v = THREE.MathUtils.clamp((y + cfg.height * 0.5) / cfg.height, 0, 1);

        // Colors:
        // Base: Vibrant emerald green (#00ff88)
        // Mid: Radiant turquoise & cyan (#00e5ff) to electric cobalt (#3a86ff)
        // Top: Ethereal violet & magenta (#c77dff & #f72585)
        let rVal = 0, gVal = 0, bVal = 0;
        if (v < 0.35) {
          const t = v / 0.35;
          rVal = THREE.MathUtils.lerp(0.0, 0.05, t);
          gVal = THREE.MathUtils.lerp(1.0, 0.95, t);
          bVal = THREE.MathUtils.lerp(0.55, 0.95, t);
        } else if (v < 0.70) {
          const t = (v - 0.35) / 0.35;
          rVal = THREE.MathUtils.lerp(0.05, 0.45, t);
          gVal = THREE.MathUtils.lerp(0.95, 0.35, t);
          bVal = THREE.MathUtils.lerp(0.95, 1.0, t);
        } else {
          const t = (v - 0.70) / 0.30;
          rVal = THREE.MathUtils.lerp(0.45, 0.92, t);
          gVal = THREE.MathUtils.lerp(0.35, 0.12, t);
          bVal = THREE.MathUtils.lerp(1.0, 0.88, t);
        }

        colors[i * 3] = rVal;
        colors[i * 3 + 1] = gVal;
        colors[i * 3 + 2] = bVal;
      }

      geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      geo.computeVertexNormals();

      // Save base positions for sinusoidal waving
      const basePos = new Float32Array(posAttr.array);
      this.auroraBasePositions.push(basePos);

      const mat = new THREE.MeshBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
        fog: false,
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(0, cfg.y, cfg.z);
      this.auroraMeshes.push(mesh);
      group.add(mesh);
    });

    group.visible = false;
    return group;
  }

  private createLightningSystem(): { bolt: THREE.LineSegments; sparks: THREE.Points } {
    // 3D Branching Lightning Bolt Geometry
    const boltPositions = new Float32Array(LIGHTNING_SEGMENTS * 2 * 3);
    const boltGeo = new THREE.BufferGeometry();
    boltGeo.setAttribute('position', new THREE.BufferAttribute(boltPositions, 3));
    const boltMat = new THREE.LineBasicMaterial({
      color: 0xe0f2fe,
      linewidth: 3,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      fog: false,
    });
    const bolt = new THREE.LineSegments(boltGeo, boltMat);
    bolt.frustumCulled = false;
    bolt.visible = false;

    // Ground Impact Sparks
    const sparkPositions = new Float32Array(LIGHTNING_SPARKS * 3);
    const sparkGeo = new THREE.BufferGeometry();
    sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPositions, 3));
    const sparkMat = new THREE.PointsMaterial({
      color: 0x7dd3fc,
      size: 0.55,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      fog: false,
    });
    const sparks = new THREE.Points(sparkGeo, sparkMat);
    sparks.frustumCulled = false;
    sparks.visible = false;

    return { bolt, sparks };
  }

  private createRain() {
    const positions = new Float32Array(RAIN_COUNT * 2 * 3);
    const speeds = this.rainSpeeds;
    for (let i = 0; i < RAIN_COUNT; i++) {
      speeds[i] = 22 + Math.random() * 10;
      this.writeStreak(positions, i, (Math.random() - 0.5) * 44, 3 + Math.random() * 24, (Math.random() - 0.5) * 44, 1.4);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.LineBasicMaterial({
      color: 0x93c5fd,
      transparent: true,
      opacity: 0.62,
      depthWrite: false,
    });
    const rain = new THREE.LineSegments(geometry, material);
    rain.frustumCulled = false;
    rain.visible = false;
    return rain;
  }

  // Ground splash droplet particles bouncing up when rain hits terrain
  private createRainSplashes() {
    const positions = new Float32Array(RAIN_SPLASH_COUNT * 3);
    for (let i = 0; i < RAIN_SPLASH_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 32;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 32;
      this.rainSplashLifetimes[i] = Math.random() * 0.18;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({
      color: 0xc7d2fe,
      size: 0.28,
      transparent: true,
      opacity: 0.65,
      depthWrite: false,
    });
    const splashes = new THREE.Points(geo, mat);
    splashes.frustumCulled = false;
    splashes.visible = false;
    return splashes;
  }

  private updateRainSplashes(dt: number, origin: THREE.Vector3) {
    const positions = this.rainSplashes.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < RAIN_SPLASH_COUNT; i++) {
      this.rainSplashLifetimes[i] -= dt;
      if (this.rainSplashLifetimes[i] <= 0) {
        // Respawn splash near ground around player
        positions[i * 3] = origin.x + (Math.random() - 0.5) * 30;
        positions[i * 3 + 1] = Math.max(0.5, origin.y - 1.2 + Math.random() * 0.4);
        positions[i * 3 + 2] = origin.z + (Math.random() - 0.5) * 30;
        this.rainSplashLifetimes[i] = 0.12 + Math.random() * 0.12;
      } else {
        // Gentle upward bounce and sideways spray
        positions[i * 3 + 1] += dt * 0.8;
      }
    }
    this.rainSplashes.geometry.attributes.position.needsUpdate = true;
  }

  private createFallingParticles(count: number, color: number, size: number, speeds: Float32Array, minSpeed: number, maxSpeed: number) {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = Math.random() * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
      speeds[i] = minSpeed + Math.random() * (maxSpeed - minSpeed);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({ color, size, transparent: true, opacity: 0.85, depthWrite: false });
    const particles = new THREE.Points(geometry, material);
    particles.frustumCulled = false;
    particles.visible = false;
    return particles;
  }

  private createRainbow() {
    const group = new THREE.Group();
    const colors = [0xff4d5a, 0xffa33a, 0xffe45e, 0x56d879, 0x45a5ff, 0xa66bff];
    colors.forEach((color, index) => {
      const geometry = new THREE.TorusGeometry(28 - index * 1.2, 0.38, 6, 96, Math.PI);
      const material = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.72, depthWrite: false, fog: false });
      const band = new THREE.Mesh(geometry, material);
      band.renderOrder = 2;
      group.add(band);
    });
    group.visible = false;
    return group;
  }

  private translateParticles(geometry: THREE.BufferGeometry, offset: THREE.Vector3) {
    if (offset.lengthSq() === 0) return;
    const positions = geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < positions.length; i += 3) {
      positions[i] += offset.x;
      positions[i + 1] += offset.y;
      positions[i + 2] += offset.z;
    }
    geometry.attributes.position.needsUpdate = true;
  }

  private updateFallers(
    particles: THREE.Points | THREE.LineSegments,
    speeds: Float32Array,
    dt: number,
    origin: THREE.Vector3,
    verticesPerParticle: number,
    height: number,
    streakLength: number
  ) {
    const positions = particles.geometry.attributes.position.array as Float32Array;
    const count = speeds.length;
    for (let i = 0; i < count; i++) {
      const baseIndex = i * verticesPerParticle * 3;
      positions[baseIndex + 1] -= speeds[i] * dt;
      if (verticesPerParticle === 2) positions[baseIndex + 4] -= speeds[i] * dt;
      const bottomY = verticesPerParticle === 2 ? positions[baseIndex + 4] : positions[baseIndex + 1];
      if (bottomY < origin.y - 2) {
        const x = origin.x + (Math.random() - 0.5) * 40;
        const y = origin.y + 3 + Math.random() * height;
        const z = origin.z + (Math.random() - 0.5) * 40;
        if (verticesPerParticle === 2) {
          this.writeStreak(positions, i, x, y, z, streakLength);
          speeds[i] = 22 + Math.random() * 10;
        } else {
          positions[baseIndex] = x;
          positions[baseIndex + 1] = y;
          positions[baseIndex + 2] = z;
          speeds[i] = (particles === this.snow ? 1.8 : 1.0) + Math.random() * (particles === this.snow ? 2.7 : 1.8);
        }
      } else if (verticesPerParticle === 1) {
        positions[baseIndex] += Math.sin(performance.now() * 0.001 + i) * dt * 0.55;
      }
    }
    particles.geometry.attributes.position.needsUpdate = true;
  }

  private writeStreak(positions: Float32Array, index: number, x: number, y: number, z: number, length: number) {
    const offset = index * 6;
    positions[offset] = x;
    positions[offset + 1] = y;
    positions[offset + 2] = z;
    positions[offset + 3] = x - 0.22;
    positions[offset + 4] = y - length;
    positions[offset + 5] = z;
  }
}
