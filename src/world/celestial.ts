import * as THREE from 'three';

export class CelestialSky {
  public readonly group: THREE.Group;
  public readonly sunMesh: THREE.Mesh;
  public readonly moonMesh: THREE.Mesh;
  private readonly sunHalo: THREE.Mesh;
  private readonly moonHalo: THREE.Mesh;
  private readonly stars: THREE.Points;
  private readonly starMat: THREE.PointsMaterial;
  private readonly sunMat: THREE.MeshBasicMaterial;
  private readonly moonMat: THREE.MeshBasicMaterial;
  private readonly sunHaloMat: THREE.MeshBasicMaterial;
  private readonly moonHaloMat: THREE.MeshBasicMaterial;

  private readonly distance = 140;

  constructor(scene: THREE.Scene) {
    this.group = new THREE.Group();

    // 1. Procedural Pixel-Art Sun Texture
    const sunTex = this.createSunTexture();
    this.sunMat = new THREE.MeshBasicMaterial({
      map: sunTex,
      transparent: true,
      depthWrite: false,
      fog: false,
    });
    this.sunMesh = new THREE.Mesh(new THREE.PlaneGeometry(16, 16), this.sunMat);

    // Warm solar glow corona halo
    const sunHaloTex = this.createHaloTexture(0xffc244, 0xff7a18);
    this.sunHaloMat = new THREE.MeshBasicMaterial({
      map: sunHaloTex,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      fog: false,
    });
    this.sunHalo = new THREE.Mesh(new THREE.PlaneGeometry(36, 36), this.sunHaloMat);
    this.sunHalo.position.z = -0.1;
    this.sunMesh.add(this.sunHalo);
    this.group.add(this.sunMesh);

    // 2. Procedural Pixel-Art Moon Texture
    const moonTex = this.createMoonTexture();
    this.moonMat = new THREE.MeshBasicMaterial({
      map: moonTex,
      transparent: true,
      depthWrite: false,
      fog: false,
    });
    this.moonMesh = new THREE.Mesh(new THREE.PlaneGeometry(14, 14), this.moonMat);

    // Cool lunar halo
    const moonHaloTex = this.createHaloTexture(0xa0c4ff, 0x3f51b5);
    this.moonHaloMat = new THREE.MeshBasicMaterial({
      map: moonHaloTex,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      fog: false,
    });
    this.moonHalo = new THREE.Mesh(new THREE.PlaneGeometry(32, 32), this.moonHaloMat);
    this.moonHalo.position.z = -0.1;
    this.moonMesh.add(this.moonHalo);
    this.group.add(this.moonMesh);

    // 3. Twinkling Night Starfield
    const starCount = 750;
    const starGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      // Hemisphere distribution above horizon (y > -10)
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0) * 0.5;

      const r = this.distance * 1.05 + (Math.random() - 0.5) * 8;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = Math.max(-5, r * Math.cos(phi) + (Math.random() - 0.2) * 15);
      const z = r * Math.sin(phi) * Math.sin(theta);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Subtle star color variations: white, icy blue, pale yellow
      const colorType = Math.random();
      if (colorType > 0.8) {
        colors[i * 3] = 0.85; colors[i * 3 + 1] = 0.92; colors[i * 3 + 2] = 1.0;
      } else if (colorType > 0.65) {
        colors[i * 3] = 1.0; colors[i * 3 + 1] = 0.94; colors[i * 3 + 2] = 0.82;
      } else {
        colors[i * 3] = 1.0; colors[i * 3 + 1] = 1.0; colors[i * 3 + 2] = 1.0;
      }
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    this.starMat = new THREE.PointsMaterial({
      size: 2.2,
      vertexColors: true,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      fog: false,
    });
    this.stars = new THREE.Points(starGeo, this.starMat);
    this.group.add(this.stars);

    scene.add(this.group);
  }

  // Generate iconic crisp Minecraft 32x32 pixel Sun
  private createSunTexture(): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d')!;

    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, 32, 32);

    // Warm outer border (4 to 28)
    ctx.fillStyle = '#fdb813';
    ctx.fillRect(4, 4, 24, 24);

    // Golden corona ring (6 to 26)
    ctx.fillStyle = '#ffe066';
    ctx.fillRect(6, 6, 20, 20);

    // Bright yellow inner radiant face (8 to 24)
    ctx.fillStyle = '#fff4a8';
    ctx.fillRect(8, 8, 16, 16);

    // Brilliant white core (10 to 22)
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(10, 10, 12, 12);

    // Iconic Minecraft sun subtle corner notches
    ctx.clearRect(4, 4, 2, 2);
    ctx.clearRect(26, 4, 2, 2);
    ctx.clearRect(4, 26, 2, 2);
    ctx.clearRect(26, 26, 2, 2);

    const texture = new THREE.CanvasTexture(canvas);
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
    texture.generateMipmaps = false;
    return texture;
  }

  // Generate authentic Minecraft 32x32 pixel Moon with craters
  private createMoonTexture(): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d')!;

    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, 32, 32);

    // Base square moon rim (5 to 27)
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(5, 5, 22, 22);

    // Bright moon face (6 to 26)
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(6, 6, 20, 20);

    // Iconic Minecraft dark maria & crater pixel clusters
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(8, 8, 4, 3);
    ctx.fillRect(7, 9, 3, 4);
    ctx.fillRect(16, 10, 6, 4);
    ctx.fillRect(18, 8, 3, 3);
    ctx.fillRect(9, 18, 5, 4);
    ctx.fillRect(11, 16, 3, 2);
    ctx.fillRect(18, 19, 5, 4);
    ctx.fillRect(20, 17, 3, 3);

    // Deep shadowed core pixels
    ctx.fillStyle = '#64748b';
    ctx.fillRect(9, 9, 2, 2);
    ctx.fillRect(18, 11, 3, 2);
    ctx.fillRect(10, 19, 2, 2);
    ctx.fillRect(19, 20, 2, 2);

    // Subtle corner notches
    ctx.clearRect(5, 5, 2, 2);
    ctx.clearRect(25, 5, 2, 2);
    ctx.clearRect(5, 25, 2, 2);
    ctx.clearRect(25, 25, 2, 2);

    const texture = new THREE.CanvasTexture(canvas);
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
    texture.generateMipmaps = false;
    return texture;
  }

  // Soft glowing radial halo
  private createHaloTexture(innerColor: number, outerColor: number): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d')!;

    const grad = ctx.createRadialGradient(64, 64, 10, 64, 64, 64);
    const inner = new THREE.Color(innerColor);
    const outer = new THREE.Color(outerColor);
    grad.addColorStop(0, `rgba(${Math.round(inner.r * 255)}, ${Math.round(inner.g * 255)}, ${Math.round(inner.b * 255)}, 0.85)`);
    grad.addColorStop(0.35, `rgba(${Math.round(outer.r * 255)}, ${Math.round(outer.g * 255)}, ${Math.round(outer.b * 255)}, 0.45)`);
    grad.addColorStop(0.7, `rgba(${Math.round(outer.r * 255)}, ${Math.round(outer.g * 255)}, ${Math.round(outer.b * 255)}, 0.12)`);
    grad.addColorStop(1, 'rgba(0,0,0,0)');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);

    const texture = new THREE.CanvasTexture(canvas);
    texture.generateMipmaps = false;
    return texture;
  }

  public update(
    dt: number,
    cameraPos: THREE.Vector3,
    dayNightAngle: number,
    gloom: number = 1.0
  ) {
    // Keep celestial sphere locked to the camera origin (infinite horizon)
    this.group.position.copy(cameraPos);

    const dist = this.distance;
    const sx = Math.cos(dayNightAngle) * dist;
    const sy = Math.sin(dayNightAngle) * dist;

    // Sun position & orientation facing camera center
    this.sunMesh.position.set(sx, sy, 0);
    this.sunMesh.lookAt(0, 0, 0);
    this.sunMesh.visible = sy > -12;

    // Moon on direct opposite side
    this.moonMesh.position.set(-sx, -sy, 0);
    this.moonMesh.lookAt(0, 0, 0);
    this.moonMesh.visible = sy < 12;

    // Solar & Lunar halo visibility & opacity
    const sunAltitude = Math.max(0, sy / dist);
    this.sunHaloMat.opacity = sunAltitude * 0.65 * gloom;
    const moonAltitude = Math.max(0, -sy / dist);
    this.moonHaloMat.opacity = moonAltitude * 0.55 * gloom;

    // Starfield brightness: reaches 1.0 at midnight (sy <= -15), 0 during daytime (sy >= 5)
    const nightFactor = THREE.MathUtils.clamp((-sy + 5) / (dist * 0.45), 0, 1);
    this.starMat.opacity = Math.pow(nightFactor, 1.4) * 0.95 * gloom;

    // Slowly rotate starfield along with the night sky
    this.stars.rotation.y += dt * 0.004;

    // Dynamic star twinkle: subtly pulse star point size
    const now = performance.now() * 0.003;
    const twinkle = 2.0 + Math.sin(now) * 0.4;
    this.starMat.size = twinkle;
  }
}
