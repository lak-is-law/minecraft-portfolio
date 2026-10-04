import * as THREE from 'three';
import { sound } from '../engine/audio';

export type WeatherKind = 'clear' | 'rain' | 'thunderstorm' | 'rainbow' | 'snowfall';
export type SeasonKind = 'spring' | 'summer' | 'autumn' | 'winter';

const WEATHER_SEQUENCE: WeatherKind[] = ['clear', 'rain', 'thunderstorm', 'rainbow', 'snowfall'];
const SEASON_SEQUENCE: SeasonKind[] = ['spring', 'summer', 'autumn', 'winter'];
const RAIN_COUNT = 360;
const SNOW_COUNT = 220;
const SEASON_PARTICLE_COUNT = 120;

export class ClimateEffects {
  public weather: WeatherKind = 'clear';
  public season: SeasonKind = 'spring';
  public onChange?: (weather: WeatherKind, season: SeasonKind) => void;

  private readonly rain: THREE.LineSegments;
  private readonly snow: THREE.Points;
  private readonly seasonParticles: THREE.Points;
  private readonly rainbow: THREE.Group;
  private readonly lightning: THREE.AmbientLight;
  private readonly lastPlayerPosition = new THREE.Vector3();
  private readonly rainSpeeds = new Float32Array(RAIN_COUNT);
  private readonly snowSpeeds = new Float32Array(SNOW_COUNT);
  private readonly seasonSpeeds = new Float32Array(SEASON_PARTICLE_COUNT);
  private lightningTimer = 5;
  private flashIntensity = 0;

  constructor(
    private readonly scene: THREE.Scene,
    private readonly sunLight: THREE.DirectionalLight,
    private readonly ambientLight: THREE.AmbientLight
  ) {
    this.rain = this.createRain();
    this.snow = this.createFallingParticles(SNOW_COUNT, 0xffffff, 0.22, this.snowSpeeds, 1.8, 4.5);
    this.seasonParticles = this.createFallingParticles(SEASON_PARTICLE_COUNT, 0xffc5d3, 0.18, this.seasonSpeeds, 1.0, 2.8);
    this.rainbow = this.createRainbow();
    this.lightning = new THREE.AmbientLight(0xc9d8ff, 0);
    this.scene.add(this.rain, this.snow, this.seasonParticles, this.rainbow, this.lightning);
  }

  public cycleWeather() {
    const index = WEATHER_SEQUENCE.indexOf(this.weather);
    this.weather = WEATHER_SEQUENCE[(index + 1) % WEATHER_SEQUENCE.length];
    if (this.weather === 'thunderstorm') this.lightningTimer = 2 + Math.random() * 3;
    this.onChange?.(this.weather, this.season);
  }

  public cycleSeason() {
    const index = SEASON_SEQUENCE.indexOf(this.season);
    this.season = SEASON_SEQUENCE[(index + 1) % SEASON_SEQUENCE.length];
    const material = this.seasonParticles.material as THREE.PointsMaterial;
    material.color.set(this.season === 'autumn' ? 0xeaa64b : this.season === 'summer' ? 0xffef9c : 0xffc5d3);
    this.onChange?.(this.weather, this.season);
  }

  public update(dt: number, playerPosition: THREE.Vector3, yaw: number) {
    const move = playerPosition.clone().sub(this.lastPlayerPosition);
    this.lastPlayerPosition.copy(playerPosition);
    this.translateParticles(this.rain.geometry, move);
    this.translateParticles(this.snow.geometry, move);
    this.translateParticles(this.seasonParticles.geometry, move);

    const raining = this.weather === 'rain' || this.weather === 'thunderstorm';
    const snowing = this.weather === 'snowfall' || (this.season === 'winter' && this.weather === 'clear');
    const seasonActive = this.season === 'spring' || this.season === 'summer' || this.season === 'autumn';
    this.rain.visible = raining;
    this.snow.visible = snowing;
    this.seasonParticles.visible = seasonActive;
    this.rainbow.visible = this.weather === 'rainbow';

    const gloom = this.weather === 'thunderstorm' ? 0.38 : raining ? 0.62 : snowing ? 0.82 : 1;
    this.sunLight.intensity *= gloom;
    this.ambientLight.intensity *= this.weather === 'thunderstorm' ? 0.62 : raining ? 0.82 : 1;
    if (this.scene.fog instanceof THREE.FogExp2) {
      this.scene.fog.density = THREE.MathUtils.lerp(0.016, 0.03, 1 - gloom);
    }

    this.updateFallers(this.rain, this.rainSpeeds, dt, playerPosition, 2, 18, 1.2);
    this.updateFallers(this.snow, this.snowSpeeds, dt, playerPosition, 1, 15, 0.8);
    this.updateFallers(this.seasonParticles, this.seasonSpeeds, dt, playerPosition, 1, 11, 0.5);

    this.rainbow.position.set(
      playerPosition.x - Math.sin(yaw) * 58,
      playerPosition.y + 1,
      playerPosition.z - Math.cos(yaw) * 58
    );
    this.rainbow.rotation.y = yaw;

    this.lightningTimer -= dt;
    if (this.weather === 'thunderstorm' && this.lightningTimer <= 0) {
      this.flashIntensity = 2.4;
      this.lightningTimer = 5 + Math.random() * 11;
      sound.playThunder();
    }
    this.flashIntensity *= Math.exp(-dt * 16);
    this.lightning.intensity = this.weather === 'thunderstorm' ? this.flashIntensity : 0;
  }

  private createRain() {
    const positions = new Float32Array(RAIN_COUNT * 2 * 3);
    const speeds = this.rainSpeeds;
    for (let i = 0; i < RAIN_COUNT; i++) {
      speeds[i] = 18 + Math.random() * 8;
      this.writeStreak(positions, i, (Math.random() - 0.5) * 34, 3 + Math.random() * 18, (Math.random() - 0.5) * 34, 1.2);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.LineBasicMaterial({ color: 0xb7dfff, transparent: true, opacity: 0.52 });
    const rain = new THREE.LineSegments(geometry, material);
    rain.frustumCulled = false;
    rain.visible = false;
    return rain;
  }

  private createFallingParticles(count: number, color: number, size: number, speeds: Float32Array, minSpeed: number, maxSpeed: number) {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 34;
      positions[i * 3 + 1] = Math.random() * 16;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 34;
      speeds[i] = minSpeed + Math.random() * (maxSpeed - minSpeed);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({ color, size, transparent: true, opacity: 0.82, depthWrite: false });
    const particles = new THREE.Points(geometry, material);
    particles.frustumCulled = false;
    particles.visible = false;
    return particles;
  }

  private createRainbow() {
    const group = new THREE.Group();
    const colors = [0xff4d5a, 0xffa33a, 0xffe45e, 0x56d879, 0x45a5ff, 0xa66bff];
    colors.forEach((color, index) => {
      const geometry = new THREE.TorusGeometry(25 - index * 1.15, 0.34, 6, 96, Math.PI);
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
        const x = origin.x + (Math.random() - 0.5) * 34;
        const y = origin.y + 3 + Math.random() * height;
        const z = origin.z + (Math.random() - 0.5) * 34;
        if (verticesPerParticle === 2) {
          this.writeStreak(positions, i, x, y, z, streakLength);
          speeds[i] = 18 + Math.random() * 8;
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
    positions[offset + 3] = x - 0.18;
    positions[offset + 4] = y - length;
    positions[offset + 5] = z;
  }
}
