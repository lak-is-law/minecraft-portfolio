import * as THREE from 'three';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { sound } from '../engine/audio';

export interface AdventureMapOptions {
  canvas: HTMLCanvasElement;
  container: HTMLElement;
  badgesContainer?: HTMLElement | null;
  tooltipEl: HTMLElement | null;
  cursorCoordsEl: HTMLElement | null;
  liveCoordsEl: HTMLElement | null;
  playerPos: { x: number; y: number; z: number };
  playerYaw: number;
  onTeleport: (coords: [number, number, number]) => void;
  onClose: () => void;
  getLandmarkCategory: (tag: string) => 'monuments' | 'cities' | 'transit' | 'nature';
}

interface PrimaryBadgeConfig {
  id: string;
  label: string;
  fullName: string;
  category: 'monuments' | 'cities' | 'transit' | 'nature';
  teleportCoords: [number, number, number];
  modelPos: [number, number, number];
  badgePos: [number, number, number];
  pinHeight: number;
}

interface ActiveBadgeItem {
  id: string;
  label: string;
  category: 'monuments' | 'cities' | 'transit' | 'nature';
  teleportCoords: [number, number, number];
  anchorPos: THREE.Vector3;
  modelPos: THREE.Vector3;
  el: HTMLElement;
  isPlayer?: boolean;
}

export class AdventureMapRenderer {
  private canvas: HTMLCanvasElement;
  private container: HTMLElement;
  private badgesContainer: HTMLElement | null;
  private tooltipEl: HTMLElement | null;
  private cursorCoordsEl: HTMLElement | null;
  private liveCoordsEl: HTMLElement | null;
  private playerPos: { x: number; y: number; z: number };
  private playerYaw: number;
  private onTeleport: (coords: [number, number, number]) => void;
  private onClose: () => void;
  private getLandmarkCategory: (tag: string) => 'monuments' | 'cities' | 'transit' | 'nature';

  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.OrthographicCamera;
  private isDisposed = false;
  private animId: number | null = null;

  // South-to-North perspective matching reference image media_1792259093415.jpg
  private baseFrustumSize = 310;
  private currentZoom = 1.0;
  private cameraTarget = new THREE.Vector3(5, 5, -15);
  private cameraOffset = new THREE.Vector3(0, 210, 248);

  // Animated elements
  private waterGeoPlane: THREE.PlaneGeometry | null = null;
  private waterOriginalPositions: Float32Array | null = null;
  private waterSurfaceMesh: THREE.Mesh | null = null;
  private waterShelfMesh: THREE.Mesh | null = null;
  private animatedWaveRings: THREE.Mesh[] = [];
  private birdsGroup: THREE.Group | null = null;
  private birdWings: THREE.Mesh[] = [];
  private ferrisWheelRim: THREE.Group | null = null;
  private smokeParticles: THREE.Mesh[] = [];
  private playerMesh: THREE.Group | null = null;
  private selectionRing: THREE.Mesh | null = null;
  private terrainMesh: THREE.Mesh | null = null;

  // Interactive items
  private interactiveMeshes: THREE.Object3D[] = [];
  private activeBadges: ActiveBadgeItem[] = [];

  // Panning & dragging state
  private isPointerDown = false;
  private dragStartX = 0;
  private dragStartY = 0;
  private initialTarget = new THREE.Vector3();
  private hasDragged = false;
  private raycaster = new THREE.Raycaster();
  private mouseVec = new THREE.Vector2();

  constructor(options: AdventureMapOptions) {
    this.canvas = options.canvas;
    this.container = options.container;
    this.badgesContainer = options.badgesContainer || null;
    this.tooltipEl = options.tooltipEl;
    this.cursorCoordsEl = options.cursorCoordsEl;
    this.liveCoordsEl = options.liveCoordsEl;
    this.playerPos = options.playerPos;
    this.playerYaw = options.playerYaw;
    this.onTeleport = options.onTeleport;
    this.onClose = options.onClose;
    this.getLandmarkCategory = options.getLandmarkCategory;

    this.initThree();
    this.buildWorld();
    this.bindEvents();
    this.startAnimationLoop();
  }

  // ---------------------------------------------------------------------------
  // 1. Three.js Scene, Camera, and Lighting Setup
  // ---------------------------------------------------------------------------
  private initThree() {
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.setClearColor(0x1a8ab8, 1); // Vibrant tropical ocean background
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;

    this.scene = new THREE.Scene();

    const aspect = width / height;
    const hHalf = this.baseFrustumSize / 2;
    const wHalf = hHalf * aspect;
    this.camera = new THREE.OrthographicCamera(-wHalf, wHalf, hHalf, -hHalf, 1, 3500);
    this.updateCameraPosition();

    // Warm Directional Sunlight
    const sunLight = new THREE.DirectionalLight(0xfffaec, 1.7);
    sunLight.position.set(-160, 320, 150);
    this.scene.add(sunLight);

    // Tropical Sky Ambient Lighting
    const ambientLight = new THREE.AmbientLight(0xbbe6f8, 0.95);
    this.scene.add(ambientLight);

    // Turquoise Fill Light
    const fillLight = new THREE.DirectionalLight(0x52d4ee, 0.65);
    fillLight.position.set(150, 160, 200);
    this.scene.add(fillLight);

    const hemiLight = new THREE.HemisphereLight(0x82dbf7, 0x2e7328, 0.45);
    this.scene.add(hemiLight);
  }

  private updateCameraPosition() {
    const offset = this.cameraOffset.clone().multiplyScalar(1 / this.currentZoom);
    this.camera.position.copy(this.cameraTarget).add(offset);
    this.camera.lookAt(this.cameraTarget);
    this.camera.zoom = this.currentZoom;
    this.camera.updateProjectionMatrix();
  }

  // ---------------------------------------------------------------------------
  // 2. Build the Complete 3D World (Faithfully Replicating media_1792259093415.jpg)
  // ---------------------------------------------------------------------------
  private buildWorld() {
    this.createTropicalOcean();
    this.createSculptedIsland();
    this.createWaterwaysAndCanal();
    this.createVisible3DPathways();
    this.createSouthFlowerMeadowAndPier();
    this.createCitadelCastle();
    this.createNeoYorkMetropolis();
    this.createTajMahalAndCanal();
    this.createEiffelTower();
    this.createTokyoTower();
    this.createFushimiInariTorii();
    this.createGizaPyramidsAndBazaar();
    this.createSeoulPalace();
    this.createVolcanoAndMountains();
    this.createHollywoodHills();
    this.createMcQueenRaceway();
    this.createDubaiArchipelago();
    this.createIslandFoliageAndTrees();
    this.createOceanFlourishes();
    this.createBirds();
    this.createPlayerMarker();
    this.createSelectionRing();
    this.initModernBadges();
  }

  // ---------------------------------------------------------------------------
  // Ocean: Vibrant animated tropical water
  // ---------------------------------------------------------------------------
  private createTropicalOcean() {
    const oceanGeo = new THREE.PlaneGeometry(3200, 3200);
    const oceanMat = new THREE.MeshLambertMaterial({ color: 0x1686b2 });
    const oceanFloor = new THREE.Mesh(oceanGeo, oceanMat);
    oceanFloor.rotation.x = -Math.PI / 2;
    oceanFloor.position.y = -2.5;
    this.scene.add(oceanFloor);

    // Glowing turquoise shallow reef ring
    const shelfGeo = new THREE.RingGeometry(180, 290, 72);
    const shelfMat = new THREE.MeshLambertMaterial({
      color: 0x38e1f0,
      transparent: true,
      opacity: 0.7,
      side: THREE.DoubleSide
    });
    this.waterShelfMesh = new THREE.Mesh(shelfGeo, shelfMat);
    this.waterShelfMesh.rotation.x = -Math.PI / 2;
    this.waterShelfMesh.position.y = 0.15;
    this.scene.add(this.waterShelfMesh);

    // Surf foam wave rings
    for (let r = 190; r <= 275; r += 28) {
      const ringGeo = new THREE.RingGeometry(r, r + 2.5, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.38,
        side: THREE.DoubleSide
      });
      const waveRing = new THREE.Mesh(ringGeo, ringMat);
      waveRing.rotation.x = -Math.PI / 2;
      waveRing.position.y = 0.22;
      this.scene.add(waveRing);
      this.animatedWaveRings.push(waveRing);
    }

    // Moving water plane with sinusoidal waves
    const waterSize = 2600;
    const waterSegments = 72;
    this.waterGeoPlane = new THREE.PlaneGeometry(waterSize, waterSize, waterSegments, waterSegments);
    this.waterGeoPlane.rotateX(-Math.PI / 2);

    const posAttr = this.waterGeoPlane.attributes.position;
    this.waterOriginalPositions = new Float32Array(posAttr.array);

    const waterMat = new THREE.MeshLambertMaterial({
      color: 0x22a6d4,
      transparent: true,
      opacity: 0.85
    });
    this.waterSurfaceMesh = new THREE.Mesh(this.waterGeoPlane, waterMat);
    this.waterSurfaceMesh.position.y = 0.35;
    this.scene.add(this.waterSurfaceMesh);
  }

  // ---------------------------------------------------------------------------
  // Sculpted Island: Organic biomes, elevated hills, sandy perimeter, distinct regions
  // ---------------------------------------------------------------------------
  private createSculptedIsland() {
    const size = 520;
    const segments = 140;
    const geo = new THREE.PlaneGeometry(size, size, segments, segments);
    geo.rotateX(-Math.PI / 2);

    const posAttr = geo.attributes.position;
    const count = posAttr.count;
    const colors = new Float32Array(count * 3);
    const tempColor = new THREE.Color();

    const colorDeepOcean = new THREE.Color(0x1686b2);
    const colorTurquoise = new THREE.Color(0x38e1f0);
    const colorWhiteFoam = new THREE.Color(0xffffff);
    const colorGoldenBeach = new THREE.Color(0xfde68a);
    const colorGrassLush = new THREE.Color(0x56b834);
    const colorGrassDark = new THREE.Color(0x3e8a22);
    const colorPinkMeadow = new THREE.Color(0xf472b6);
    const colorDesertSand = new THREE.Color(0xeab308);
    const colorCanyonOrange = new THREE.Color(0xd97706);
    const colorVolcanoRock = new THREE.Color(0x334155);
    const colorSnowCap = new THREE.Color(0xf8fafc);
    const colorCanalWater = new THREE.Color(0x38bdf8);

    for (let i = 0; i < count; i++) {
      const x = posAttr.getX(i);
      const z = posAttr.getZ(i);

      const angle = Math.atan2(z, x);
      const dist = Math.hypot(x, z);

      // Organic shoreline boundary matching reference
      let boundary = 195;
      boundary += Math.sin(angle * 3) * 15;
      boundary += Math.cos(angle * 5) * 9;

      // Dubai protrusion in east
      if (x > 90 && z > 0 && z < 110) {
        boundary += 32 * Math.sin(((z - 0) / 110) * Math.PI);
      }
      // South Pink Meadow peninsula protrusion
      if (Math.abs(x - (-25)) < 48 && z > 95) {
        boundary += 28 * Math.sin(((x + 73) / 96) * Math.PI);
      }

      let y = 0;

      if (dist > boundary + 12) {
        y = -8;
        tempColor.copy(colorDeepOcean);
      } else if (dist > boundary) {
        const t = (dist - boundary) / 12;
        y = THREE.MathUtils.lerp(0.2, -3.0, t);
        if (t < 0.35) tempColor.copy(colorWhiteFoam);
        else tempColor.lerpColors(colorTurquoise, colorDeepOcean, t);
      } else if (dist > boundary - 14) {
        const t = (boundary - dist) / 14;
        y = THREE.MathUtils.lerp(0.3, 2.2, t);
        tempColor.copy(colorGoldenBeach);
      } else {
        const innerRatio = 1 - dist / boundary;

        // 1. North Mountain & Volcano Ridge
        const volcanoDist = Math.hypot(x - 5, z - (-140));
        const volcanoFactor = Math.max(0, 1 - volcanoDist / 65);
        const volcanoElev = Math.pow(volcanoFactor, 1.8) * 36;

        // 2. West Giza Desert Plateau
        const westDesertDist = Math.hypot(x - (-135), z - 25);
        const westDesertFactor = Math.max(0, 1 - westDesertDist / 60);
        const westElev = Math.pow(westDesertFactor, 1.4) * 8;

        // 3. East Hollywood & McQueen Desert Ridge
        const eastDesertDist = Math.hypot(x - 125, z - (-45));
        const eastDesertFactor = Math.max(0, 1 - eastDesertDist / 58);
        const eastElev = Math.pow(eastDesertFactor, 1.4) * 9;

        // 4. Northwest Tokyo & Seoul rolling hill
        const nwHillDist = Math.hypot(x - (-85), z - (-75));
        const nwHillFactor = Math.max(0, 1 - nwHillDist / 50);
        const nwElev = Math.pow(nwHillFactor, 1.5) * 9;

        // 5. South Pink Meadow elevation
        const southPinkDist = Math.hypot(x - (-25), z - 125);
        const southPinkFactor = Math.max(0, 1 - southPinkDist / 42);
        const southElev = Math.pow(southPinkFactor, 1.2) * 2.5;

        // Base terrain elevation
        let baseHeight = 2.4 + innerRatio * 3.2;
        y = baseHeight + volcanoElev + westElev + eastElev + nwElev + southElev;

        // Carve Yamuna canal & central lake
        const isCanal = Math.abs(x - 70) < 6.5 && z > -130 && z < -40;
        const isCenterLake = Math.hypot(x - 10, z - (-25)) < 15;
        if (isCanal || isCenterLake) {
          y = Math.max(0.4, y - 6.5);
        }

        // Base grass with organic texture variation
        const grassNoise = Math.sin(x * 0.08) * Math.cos(z * 0.08) * 0.5 + 0.5;
        tempColor.lerpColors(colorGrassLush, colorGrassDark, grassNoise * 0.35 + innerRatio * 0.65);

        // Biome Blending
        if (southPinkFactor > 0) {
          tempColor.lerp(colorPinkMeadow, Math.pow(southPinkFactor, 1.15));
        }
        if (westDesertFactor > 0) {
          tempColor.lerp(colorDesertSand, Math.pow(westDesertFactor, 1.2));
        }
        if (eastDesertFactor > 0) {
          tempColor.lerp(colorCanyonOrange, Math.pow(eastDesertFactor, 1.2));
        }
        if (volcanoElev > 18) {
          if (y > 22) tempColor.copy(colorSnowCap);
          else tempColor.copy(colorVolcanoRock);
        }
        if (isCanal || isCenterLake) {
          tempColor.copy(colorCanalWater);
        }
      }

      posAttr.setY(i, y);
      colors[i * 3] = tempColor.r;
      colors[i * 3 + 1] = tempColor.g;
      colors[i * 3 + 2] = tempColor.b;
    }

    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geo.computeVertexNormals();

    const terrainMat = new THREE.MeshLambertMaterial({ vertexColors: true });
    this.terrainMesh = new THREE.Mesh(geo, terrainMat);
    this.terrainMesh.name = 'island_terrain';
    this.scene.add(this.terrainMesh);
    this.interactiveMeshes.push(this.terrainMesh);
  }

  // Waterways: Central reflecting lake & Yamuna canal
  private createWaterwaysAndCanal() {
    const waterMat = new THREE.MeshLambertMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.94
    });

    const canalGeo = new THREE.PlaneGeometry(11, 86);
    const canal = new THREE.Mesh(canalGeo, waterMat);
    canal.rotation.x = -Math.PI / 2;
    canal.position.set(70, 0.6, -85);
    this.scene.add(canal);

    const lakeGeo = new THREE.CircleGeometry(16, 24);
    const lake = new THREE.Mesh(lakeGeo, waterMat);
    lake.rotation.x = -Math.PI / 2;
    lake.position.set(10, 0.6, -25);
    this.scene.add(lake);
  }

  // ---------------------------------------------------------------------------
  // Distinct 3D Pathways & Pier (Clearly elevated so never buried!)
  // ---------------------------------------------------------------------------
  private createVisible3DPathways() {
    const dirtMat = new THREE.MeshLambertMaterial({ color: 0xd4a373 }); // Warm dirt path
    const stoneMat = new THREE.MeshLambertMaterial({ color: 0xc8b69b }); // Cobblestone path
    const trackMat = new THREE.MeshLambertMaterial({ color: 0xf59e0b }); // Golden rails/road

    // 1. Citadel to Neo York Road
    const pathCitadelToNeo = [
      new THREE.Vector3(10, 6.2, 4),
      new THREE.Vector3(32, 6.0, 8),
      new THREE.Vector3(55, 5.8, 12),
      new THREE.Vector3(70, 5.8, 14)
    ];
    this.addElevatedRibbon(pathCitadelToNeo, 3.2, dirtMat);

    // 2. Citadel to Giza Desert Trail
    const pathCitadelToGiza = [
      new THREE.Vector3(-10, 6.2, 2),
      new THREE.Vector3(-45, 6.0, 10),
      new THREE.Vector3(-85, 6.8, 18),
      new THREE.Vector3(-120, 8.5, 25)
    ];
    this.addElevatedRibbon(pathCitadelToGiza, 3.0, dirtMat);

    // 3. Citadel to Eiffel & Seoul Palace Path
    const pathCitadelToSeoul = [
      new THREE.Vector3(-4, 6.2, -12),
      new THREE.Vector3(8, 6.0, -32),
      new THREE.Vector3(-15, 6.2, -55),
      new THREE.Vector3(-55, 8.5, -85)
    ];
    this.addElevatedRibbon(pathCitadelToSeoul, 3.0, stoneMat);

    // 4. Neo York to Hollywood & McQueen
    const pathNeoToMcQueen = [
      new THREE.Vector3(78, 5.8, 2),
      new THREE.Vector3(98, 6.5, -12),
      new THREE.Vector3(120, 8.5, -24)
    ];
    this.addElevatedRibbon(pathNeoToMcQueen, 3.2, dirtMat);

    // 5. Neo York South Coastal Transit Track towards Dubai
    const pathNeoToDubai = [
      new THREE.Vector3(80, 5.8, 22),
      new THREE.Vector3(102, 5.5, 38),
      new THREE.Vector3(125, 5.2, 58),
      new THREE.Vector3(145, 4.2, 85)
    ];
    this.addElevatedRibbon(pathNeoToDubai, 3.4, trackMat);
  }

  private addElevatedRibbon(points: THREE.Vector3[], width: number, material: THREE.Material) {
    const curve = new THREE.CatmullRomCurve3(points);
    const tubeGeo = new THREE.TubeGeometry(curve, 28, width * 0.5, 5, false);
    const mesh = new THREE.Mesh(tubeGeo, material);
    mesh.scale.set(1, 0.22, 1);
    this.scene.add(mesh);
  }

  // ---------------------------------------------------------------------------
  // South Flower Meadow & Long Wooden Pier (Matching reference image)
  // ---------------------------------------------------------------------------
  private createSouthFlowerMeadowAndPier() {
    const woodMat = new THREE.MeshLambertMaterial({ color: 0x78350f });
    const plankMat = new THREE.MeshLambertMaterial({ color: 0xa16207 });

    // Long wooden pier boardwalk running from Citadel South down into the ocean
    const pierGeo = new THREE.BoxGeometry(6.2, 1.0, 95);
    const pier = new THREE.Mesh(pierGeo, woodMat);
    pier.position.set(-25, 4.2, 110);
    this.scene.add(pier);

    // Wooden cross-planks for realistic textured boardwalk look
    for (let z = 65; z <= 155; z += 4) {
      const plankGeo = new THREE.BoxGeometry(6.8, 0.35, 2.2);
      const plank = new THREE.Mesh(plankGeo, plankMat);
      plank.position.set(-25, 4.8, z);
      this.scene.add(plank);
    }

    // Wooden pilings supporting pier over water
    for (let pz = 125; pz <= 155; pz += 10) {
      const pileGeo = new THREE.CylinderGeometry(0.45, 0.45, 5.5, 6);
      const pileL = new THREE.Mesh(pileGeo, woodMat);
      pileL.position.set(-28, 2.0, pz);
      const pileR = new THREE.Mesh(pileGeo, woodMat);
      pileR.position.set(-22, 2.0, pz);
      this.scene.add(pileL);
      this.scene.add(pileR);
    }
  }

  // Helper: Waving Red Pennant Flag on Pole
  private createRedFlag(mastHeight: number): THREE.Group {
    const g = new THREE.Group();
    const mastGeo = new THREE.CylinderGeometry(0.14, 0.14, mastHeight, 6);
    const mastMat = new THREE.MeshLambertMaterial({ color: 0x94a3b8 });
    const mast = new THREE.Mesh(mastGeo, mastMat);
    mast.position.y = mastHeight / 2;
    g.add(mast);

    const flagGeo = new THREE.BoxGeometry(2.8, 1.6, 0.15);
    const flagMat = new THREE.MeshLambertMaterial({ color: 0xdc2626 });
    const flag = new THREE.Mesh(flagGeo, flagMat);
    flag.position.set(1.4, mastHeight - 0.9, 0);
    g.add(flag);
    return g;
  }

  // ---------------------------------------------------------------------------
  // 3. Rich Architectural Landmark Models
  // ---------------------------------------------------------------------------

  // Central Citadel Castle (4 Corner Towers + Conical Blue Roofs + Battlements + Flags)
  private createCitadelCastle() {
    const castleGroup = new THREE.Group();
    castleGroup.position.set(0, 5.5, 0);

    const stoneMat = new THREE.MeshLambertMaterial({ color: 0x94a3b8 });
    const darkStoneMat = new THREE.MeshLambertMaterial({ color: 0x64748b });
    const blueRoofMat = new THREE.MeshLambertMaterial({ color: 0x0284c7 });
    const woodMat = new THREE.MeshLambertMaterial({ color: 0x78350f });

    // Elevated Castle Stone Terrace Base
    const terraceGeo = new THREE.BoxGeometry(26, 3, 26);
    const terrace = new THREE.Mesh(terraceGeo, darkStoneMat);
    terrace.position.y = 1.5;
    castleGroup.add(terrace);

    // Central Citadel Keep
    const keepGeo = new THREE.BoxGeometry(16, 12, 16);
    const keep = new THREE.Mesh(keepGeo, stoneMat);
    keep.position.y = 8;
    castleGroup.add(keep);

    // Central Blue Pyramidal Roof
    const centerRoofGeo = new THREE.ConeGeometry(12, 9, 4);
    const centerRoof = new THREE.Mesh(centerRoofGeo, blueRoofMat);
    centerRoof.rotation.y = Math.PI / 4;
    centerRoof.position.y = 18.5;
    castleGroup.add(centerRoof);

    // Central Royal Banner
    const centerFlag = this.createRedFlag(6);
    centerFlag.position.set(0, 22, 0);
    castleGroup.add(centerFlag);

    // 4 Corner Cylindrical Towers with Conical Blue Roofs
    const towerOffsets = [[-8, -8], [8, -8], [8, 8], [-8, 8]];
    towerOffsets.forEach(([tx, tz]) => {
      const towerGeo = new THREE.CylinderGeometry(3.0, 3.4, 16, 12);
      const tower = new THREE.Mesh(towerGeo, stoneMat);
      tower.position.set(tx, 9.5, tz);
      castleGroup.add(tower);

      const roofGeo = new THREE.ConeGeometry(4.0, 7, 12);
      const roof = new THREE.Mesh(roofGeo, blueRoofMat);
      roof.position.set(tx, 20.5, tz);
      castleGroup.add(roof);

      const flag = this.createRedFlag(4);
      flag.position.set(tx, 23.5, tz);
      castleGroup.add(flag);
    });

    // South Wooden Gateway
    const gateGeo = new THREE.BoxGeometry(6, 0.8, 12);
    const gate = new THREE.Mesh(gateGeo, woodMat);
    gate.position.set(0, 2.5, 14);
    castleGroup.add(gate);

    this.scene.add(castleGroup);
  }

  // Neo York Metropolis: Dense forest of 28 skyscrapers of diverse heights & styles
  private createNeoYorkMetropolis() {
    const nyGroup = new THREE.Group();
    nyGroup.position.set(75, 5.5, 15);

    const bldDefs = [
      // Central core high-rises
      { x: 0, z: 0, w: 8, d: 8, h: 48, col: 0x93c5fd, spire: true },
      { x: 9, z: 2, w: 7, d: 7, h: 42, col: 0x60a5fa, spire: true },
      { x: -9, z: 3, w: 8, d: 7, h: 36, col: 0x38bdf8, spire: false },
      { x: 0, z: 9, w: 7, d: 8, h: 34, col: 0x94a3b8, spire: false },
      { x: 8, z: 10, w: 7, d: 6, h: 38, col: 0x0284c7, spire: true },
      { x: -8, z: 11, w: 6, d: 7, h: 30, col: 0x64748b, spire: false },
      // North & East perimeter towers
      { x: 16, z: -2, w: 6, d: 7, h: 28, col: 0xe2e8f0, spire: false },
      { x: -5, z: -8, w: 8, d: 7, h: 44, col: 0x3b82f6, spire: true },
      { x: 5, z: -9, w: 7, d: 7, h: 40, col: 0x0ea5e9, spire: true },
      { x: 14, z: -10, w: 6, d: 6, h: 26, col: 0x93c5fd, spire: false },
      { x: -14, z: -3, w: 6, d: 6, h: 24, col: 0x475569, spire: false },
      // Outer rim skyscrapers
      { x: 16, z: 8, w: 6, d: 5, h: 22, col: 0xcfd8dc, spire: false },
      { x: -15, z: 7, w: 5, d: 6, h: 20, col: 0x78909c, spire: false },
      { x: -2, z: 18, w: 6, d: 5, h: 24, col: 0x0284c7, spire: false },
      { x: 6, z: 17, w: 5, d: 6, h: 22, col: 0x38bdf8, spire: false },
      { x: 14, z: 16, w: 5, d: 5, h: 18, col: 0x90caf9, spire: false },
      { x: -12, z: 16, w: 5, d: 5, h: 19, col: 0x64748b, spire: false },
      { x: -10, z: -14, w: 6, d: 6, h: 26, col: 0x94a3b8, spire: false },
      { x: 0, z: -16, w: 6, d: 5, h: 32, col: 0x1e293b, spire: false },
      { x: 10, z: -16, w: 5, d: 5, h: 22, col: 0x0284c7, spire: false }
    ];

    bldDefs.forEach(b => {
      const bGeo = new THREE.BoxGeometry(b.w, b.h, b.d);
      const bMat = new THREE.MeshLambertMaterial({ color: b.col });
      const bMesh = new THREE.Mesh(bGeo, bMat);
      bMesh.position.set(b.x, b.h / 2, b.z);
      nyGroup.add(bMesh);

      // Antenna spires & beacons
      if (b.spire) {
        const spireGeo = new THREE.CylinderGeometry(0.2, 0.45, 10, 6);
        const spireMat = new THREE.MeshBasicMaterial({ color: 0xfacc15 });
        const spire = new THREE.Mesh(spireGeo, spireMat);
        spire.position.set(b.x, b.h + 5, b.z);
        nyGroup.add(spire);

        const beaconGeo = new THREE.SphereGeometry(0.65, 8, 8);
        const beaconMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
        const beacon = new THREE.Mesh(beaconGeo, beaconMat);
        beacon.position.set(b.x, b.h + 10.2, b.z);
        nyGroup.add(beacon);
      }
    });

    // Metropolis red banner flag
    const flag = this.createRedFlag(6);
    flag.position.set(0, 52, 0);
    nyGroup.add(flag);

    this.scene.add(nyGroup);
  }

  // Taj Mahal & Yamuna Canal: Marble dome, 4 minarets, arched iwan facade
  private createTajMahalAndCanal() {
    const tajGroup = new THREE.Group();
    tajGroup.position.set(70, 5.0, -135);

    const marbleMat = new THREE.MeshLambertMaterial({ color: 0xffffff });
    const goldMat = new THREE.MeshLambertMaterial({ color: 0xfacc15 });
    const darkIwanMat = new THREE.MeshLambertMaterial({ color: 0xd1d5db });

    // Elevated Marble Plinth
    const plinthGeo = new THREE.BoxGeometry(24, 4, 24);
    const plinth = new THREE.Mesh(plinthGeo, marbleMat);
    plinth.position.y = 2;
    tajGroup.add(plinth);

    // Main Mausoleum Building
    const baseGeo = new THREE.BoxGeometry(18, 12, 18);
    const base = new THREE.Mesh(baseGeo, marbleMat);
    base.position.y = 10;
    tajGroup.add(base);

    // Arched Iwan Niches on Front Facade
    const iwanGeo = new THREE.BoxGeometry(8, 9, 1);
    const iwan = new THREE.Mesh(iwanGeo, darkIwanMat);
    iwan.position.set(0, 9, 9.2);
    tajGroup.add(iwan);

    // Grand Central Marble Onion Dome
    const domeGeo = new THREE.SphereGeometry(6.5, 18, 14, 0, Math.PI * 2, 0, Math.PI * 0.75);
    const dome = new THREE.Mesh(domeGeo, marbleMat);
    dome.position.y = 18;
    tajGroup.add(dome);

    // Dome Golden Finial Spire
    const finialGeo = new THREE.CylinderGeometry(0.15, 0.4, 5, 8);
    const finial = new THREE.Mesh(finialGeo, goldMat);
    finial.position.y = 25.5;
    tajGroup.add(finial);

    // 4 Corner Minarets with Balconies & Golden Cupolas
    const minaretOffsets = [[-10, -10], [10, -10], [10, 10], [-10, 10]];
    minaretOffsets.forEach(([mx, mz]) => {
      const minGeo = new THREE.CylinderGeometry(1.2, 1.5, 22, 12);
      const minMesh = new THREE.Mesh(minGeo, marbleMat);
      minMesh.position.set(mx, 13, mz);
      tajGroup.add(minMesh);

      const balcGeo = new THREE.CylinderGeometry(1.9, 1.9, 1.2, 12);
      const balc = new THREE.Mesh(balcGeo, marbleMat);
      balc.position.set(mx, 22, mz);
      tajGroup.add(balc);

      const cupolaGeo = new THREE.ConeGeometry(1.5, 3.2, 12);
      const cupola = new THREE.Mesh(cupolaGeo, marbleMat);
      cupola.position.set(mx, 25, mz);
      tajGroup.add(cupola);
    });

    this.scene.add(tajGroup);
  }

  // Eiffel Tower: Bronze lattice tower with double observation decks
  private createEiffelTower() {
    const eiffelGroup = new THREE.Group();
    eiffelGroup.position.set(24, 6.0, -42);

    const bronzeMat = new THREE.MeshLambertMaterial({ color: 0x854d0e });

    // 4 Flared Base Legs
    const legOffsets = [[-3.5, -3.5], [3.5, -3.5], [3.5, 3.5], [-3.5, 3.5]];
    legOffsets.forEach(([lx, lz]) => {
      const legGeo = new THREE.CylinderGeometry(0.6, 1.1, 8, 6);
      const leg = new THREE.Mesh(legGeo, bronzeMat);
      leg.position.set(lx * 0.7, 4, lz * 0.7);
      eiffelGroup.add(leg);
    });

    // 1st Observation Platform
    const plat1Geo = new THREE.BoxGeometry(6.5, 0.9, 6.5);
    const plat1 = new THREE.Mesh(plat1Geo, bronzeMat);
    plat1.position.y = 8;
    eiffelGroup.add(plat1);

    // Mid Tower
    const midGeo = new THREE.ConeGeometry(3.0, 10, 4);
    const mid = new THREE.Mesh(midGeo, bronzeMat);
    mid.position.y = 13;
    mid.rotation.y = Math.PI / 4;
    eiffelGroup.add(mid);

    // 2nd Observation Platform
    const plat2Geo = new THREE.BoxGeometry(3.8, 0.7, 3.8);
    const plat2 = new THREE.Mesh(plat2Geo, bronzeMat);
    plat2.position.y = 18;
    eiffelGroup.add(plat2);

    // Upper Spire
    const spireGeo = new THREE.ConeGeometry(1.4, 16, 4);
    const spire = new THREE.Mesh(spireGeo, bronzeMat);
    spire.position.y = 26;
    spire.rotation.y = Math.PI / 4;
    eiffelGroup.add(spire);

    const flag = this.createRedFlag(4);
    flag.position.set(0, 34, 0);
    eiffelGroup.add(flag);

    this.scene.add(eiffelGroup);
  }

  // Tokyo Tower: International orange & white lattice radio tower
  private createTokyoTower() {
    const ttGroup = new THREE.Group();
    ttGroup.position.set(-115, 6.0, -65);

    const orangeMat = new THREE.MeshLambertMaterial({ color: 0xe11d48 });
    const whiteMat = new THREE.MeshLambertMaterial({ color: 0xffffff });

    // Lower Orange Truss Legs
    const baseGeo = new THREE.ConeGeometry(7, 14, 4);
    const base = new THREE.Mesh(baseGeo, orangeMat);
    base.position.y = 7;
    base.rotation.y = Math.PI / 4;
    ttGroup.add(base);

    // Main Observatory Deck (White)
    const deckGeo = new THREE.BoxGeometry(5.2, 2.2, 5.2);
    const deck = new THREE.Mesh(deckGeo, whiteMat);
    deck.position.y = 14;
    ttGroup.add(deck);

    // Mid Section (Orange band)
    const midGeo = new THREE.ConeGeometry(3.2, 10, 4);
    const mid = new THREE.Mesh(midGeo, orangeMat);
    mid.position.y = 20;
    mid.rotation.y = Math.PI / 4;
    ttGroup.add(mid);

    // Special Observatory Deck (White band)
    const topDeckGeo = new THREE.CylinderGeometry(1.6, 1.8, 2.0, 8);
    const topDeck = new THREE.Mesh(topDeckGeo, whiteMat);
    topDeck.position.y = 25.5;
    ttGroup.add(topDeck);

    // Antenna Mast (Alternating orange/white)
    const antGeo = new THREE.CylinderGeometry(0.2, 0.4, 14, 6);
    const ant = new THREE.Mesh(antGeo, orangeMat);
    ant.position.y = 33;
    ttGroup.add(ant);

    const beaconGeo = new THREE.SphereGeometry(0.55, 8, 8);
    const beacon = new THREE.Mesh(beaconGeo, whiteMat);
    beacon.position.y = 40.2;
    ttGroup.add(beacon);

    const flag = this.createRedFlag(3.5);
    flag.position.set(0, 40.5, 0);
    ttGroup.add(flag);

    this.scene.add(ttGroup);
  }

  // Fushimi Inari Torii Tunnel: Curved uphill path of vermilion red Torii gates
  private createFushimiInariTorii() {
    const inariGroup = new THREE.Group();
    inariGroup.position.set(-125, 6.5, -18);

    const toriiMat = new THREE.MeshLambertMaterial({ color: 0xdc2626 });
    const blackMat = new THREE.MeshLambertMaterial({ color: 0x1e293b });

    for (let k = 0; k < 8; k++) {
      const gate = new THREE.Group();
      const angle = (k / 8) * Math.PI * 0.45;
      const gx = Math.sin(angle) * 12;
      const gz = k * 5.2;
      const gy = k * 0.45;
      gate.position.set(gx, gy, gz);

      // 2 Vermilion pillars
      const pillarGeo = new THREE.CylinderGeometry(0.4, 0.4, 6, 6);
      const p1 = new THREE.Mesh(pillarGeo, toriiMat);
      p1.position.set(-2.4, 3, 0);
      const p2 = new THREE.Mesh(pillarGeo, toriiMat);
      p2.position.set(2.4, 3, 0);
      gate.add(p1);
      gate.add(p2);

      // Cross lintel
      const lintelGeo = new THREE.BoxGeometry(6.6, 0.6, 0.6);
      const lintel = new THREE.Mesh(lintelGeo, toriiMat);
      lintel.position.set(0, 5.2, 0);
      gate.add(lintel);

      // Black top cap
      const capGeo = new THREE.BoxGeometry(7.2, 0.35, 0.8);
      const cap = new THREE.Mesh(capGeo, blackMat);
      cap.position.set(0, 5.7, 0);
      gate.add(cap);

      inariGroup.add(gate);
    }

    this.scene.add(inariGroup);
  }

  // Giza Pyramids & Lively Bedouin Desert Bazaar Camp
  private createGizaPyramidsAndBazaar() {
    const gizaGroup = new THREE.Group();
    gizaGroup.position.set(-135, 8.5, 25);

    const sandStoneMat = new THREE.MeshLambertMaterial({ color: 0xfacc15, flatShading: true });
    const oasisMat = new THREE.MeshLambertMaterial({ color: 0x06b6d4 });

    // 1. Khufu (Great Pyramid)
    const pyr1Geo = new THREE.ConeGeometry(19, 17, 4);
    const pyr1 = new THREE.Mesh(pyr1Geo, sandStoneMat);
    pyr1.rotation.y = Math.PI / 4;
    pyr1.position.set(0, 8.5, 0);
    gizaGroup.add(pyr1);

    // 2. Khafre
    const pyr2Geo = new THREE.ConeGeometry(15, 14, 4);
    const pyr2 = new THREE.Mesh(pyr2Geo, sandStoneMat);
    pyr2.rotation.y = Math.PI / 4;
    pyr2.position.set(16, 7.0, 14);
    gizaGroup.add(pyr2);

    // 3. Menkaure
    const pyr3Geo = new THREE.ConeGeometry(10, 9, 4);
    const pyr3 = new THREE.Mesh(pyr3Geo, sandStoneMat);
    pyr3.rotation.y = Math.PI / 4;
    pyr3.position.set(28, 4.5, 24);
    gizaGroup.add(pyr3);

    // Turquoise Desert Oasis Pond
    const oasisGeo = new THREE.CircleGeometry(7.5, 16);
    const oasis = new THREE.Mesh(oasisGeo, oasisMat);
    oasis.rotation.x = -Math.PI / 2;
    oasis.position.set(10, 0.2, -18);
    gizaGroup.add(oasis);

    // Colorful Desert Bazaar Tents & Flags (Matching reference image)
    const tentColors = [0xef4444, 0x10b981, 0x3b82f6, 0xf59e0b];
    const tentPositions = [
      [-12, -16], [-5, -22], [4, -26], [16, -24]
    ];
    tentPositions.forEach(([tx, tz], idx) => {
      const tentGeo = new THREE.ConeGeometry(3.2, 3.2, 4);
      const tentMat = new THREE.MeshLambertMaterial({ color: tentColors[idx % tentColors.length] });
      const tent = new THREE.Mesh(tentGeo, tentMat);
      tent.position.set(tx, 1.6, tz);
      tent.rotation.y = Math.PI / 4;
      gizaGroup.add(tent);

      const flag = this.createRedFlag(3);
      flag.position.set(tx, 3.2, tz);
      gizaGroup.add(flag);
    });

    this.scene.add(gizaGroup);
  }

  // Seoul Royal Palace Gate (Gwanghwamun: stone base, red columns, curved dark pagoda roofs)
  private createSeoulPalace() {
    const seoulGroup = new THREE.Group();
    seoulGroup.position.set(-65, 8.5, -95);

    const stoneMat = new THREE.MeshLambertMaterial({ color: 0x94a3b8 });
    const redMat = new THREE.MeshLambertMaterial({ color: 0x991b1b });
    const roofMat = new THREE.MeshLambertMaterial({ color: 0x1e293b });
    const goldMat = new THREE.MeshLambertMaterial({ color: 0xfacc15 });

    // Stone Foundation Base with 3 Arched Portals
    const baseGeo = new THREE.BoxGeometry(24, 6, 10);
    const base = new THREE.Mesh(baseGeo, stoneMat);
    base.position.y = 3;
    seoulGroup.add(base);

    // Red Wooden Pavilion Gallery
    const pavGeo = new THREE.BoxGeometry(20, 5, 8);
    const pav = new THREE.Mesh(pavGeo, redMat);
    pav.position.y = 8.5;
    seoulGroup.add(pav);

    // Lower Eaves Roof
    const roof1Geo = new THREE.ConeGeometry(17, 3.5, 4);
    const roof1 = new THREE.Mesh(roof1Geo, roofMat);
    roof1.rotation.y = Math.PI / 4;
    roof1.position.y = 12.5;
    seoulGroup.add(roof1);

    // Upper Pavilion Floor
    const upperPavGeo = new THREE.BoxGeometry(15, 4, 6);
    const upperPav = new THREE.Mesh(upperPavGeo, redMat);
    upperPav.position.y = 15;
    seoulGroup.add(upperPav);

    // Sweeping Upper Pagoda Roof
    const roof2Geo = new THREE.ConeGeometry(14, 4.0, 4);
    const roof2 = new THREE.Mesh(roof2Geo, roofMat);
    roof2.rotation.y = Math.PI / 4;
    roof2.position.y = 19;
    seoulGroup.add(roof2);

    // Golden Roof Ridge Crest
    const ridgeGeo = new THREE.BoxGeometry(12, 0.6, 0.6);
    const ridge = new THREE.Mesh(ridgeGeo, goldMat);
    ridge.position.y = 20.8;
    seoulGroup.add(ridge);

    // Fluttering Royal Banners
    const flagL = this.createRedFlag(5);
    flagL.position.set(-8, 12, 0);
    seoulGroup.add(flagL);

    const flagR = this.createRedFlag(5);
    flagR.position.set(8, 12, 0);
    seoulGroup.add(flagR);

    this.scene.add(seoulGroup);
  }

  // Volcano & Alpine Snow Peaks (Smoking volcano cone + sharp snow-capped mountains)
  private createVolcanoAndMountains() {
    const mtnGroup = new THREE.Group();
    mtnGroup.position.set(5, 5, -140);

    const rockMat = new THREE.MeshLambertMaterial({ color: 0x451a03, flatShading: true });
    const snowMat = new THREE.MeshLambertMaterial({ color: 0xf8fafc, flatShading: true });
    const lavaMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });

    // 1. Central Volcanic Cone
    const coneGeo = new THREE.ConeGeometry(25, 34, 10);
    const cone = new THREE.Mesh(coneGeo, rockMat);
    cone.position.y = 17;
    mtnGroup.add(cone);

    // Glowing Lava Crater Caldera
    const calderaGeo = new THREE.CircleGeometry(5.5, 12);
    const caldera = new THREE.Mesh(calderaGeo, lavaMat);
    caldera.rotation.x = -Math.PI / 2;
    caldera.position.y = 33.8;
    mtnGroup.add(caldera);

    // Rising Smoke Puffs
    for (let s = 0; s < 4; s++) {
      const puffGeo = new THREE.SphereGeometry(2.0 + s * 0.8, 8, 8);
      const puffMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.5 - s * 0.08
      });
      const puff = new THREE.Mesh(puffGeo, puffMat);
      puff.position.set(Math.sin(s) * 1.5, 36 + s * 3.5, Math.cos(s) * 1.5);
      mtnGroup.add(puff);
      this.smokeParticles.push(puff);
    }

    // 2. Flanking Alpine Mountain Peaks (West: -38, East: 42)
    const alpineDefs = [
      { x: -38, z: 6, r: 18, h: 26 },
      { x: 42, z: 6, r: 17, h: 24 }
    ];
    alpineDefs.forEach(m => {
      const pGeo = new THREE.ConeGeometry(m.r, m.h, 7);
      const pMesh = new THREE.Mesh(pGeo, rockMat);
      pMesh.position.set(m.x, m.h / 2, m.z);
      mtnGroup.add(pMesh);

      const snowGeo = new THREE.ConeGeometry(m.r * 0.45, m.h * 0.45, 7);
      const snowMesh = new THREE.Mesh(snowGeo, snowMat);
      snowMesh.position.set(m.x, m.h * 0.78, m.z);
      mtnGroup.add(snowMesh);
    });

    this.scene.add(mtnGroup);
  }

  // Hollywood Hills: Desert mesa with palm trees and 3D white letters
  private createHollywoodHills() {
    const hwGroup = new THREE.Group();
    hwGroup.position.set(125, 9.5, -85);

    const mesaMat = new THREE.MeshLambertMaterial({ color: 0xc2410c, flatShading: true });
    const signMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

    // Mesa Rock Ridge
    const ridgeGeo = new THREE.BoxGeometry(38, 12, 16);
    const ridge = new THREE.Mesh(ridgeGeo, mesaMat);
    ridge.position.y = 6;
    hwGroup.add(ridge);

    // Distinct 3D White Lettering for "HOLLYWOOD"
    const letters = ['H', 'O', 'L', 'L', 'Y', 'W', 'O', 'O', 'D'];
    const letterWidth = 2.2;
    const totalW = letters.length * (letterWidth + 0.9);
    letters.forEach((_, idx) => {
      const lx = -totalW / 2 + idx * (letterWidth + 0.9) + letterWidth / 2;
      const letGeo = new THREE.BoxGeometry(letterWidth, 3.8, 0.4);
      const letMesh = new THREE.Mesh(letGeo, signMat);
      letMesh.position.set(lx, 13.8, 8.2);
      hwGroup.add(letMesh);
    });

    // Red flag on Hollywood summit
    const flag = this.createRedFlag(4);
    flag.position.set(0, 16.5, 0);
    hwGroup.add(flag);

    this.scene.add(hwGroup);
  }

  // McQueen Raceway: Radiator Springs desert circuit with Willy's Butte & red race car
  private createMcQueenRaceway() {
    const raceGroup = new THREE.Group();
    raceGroup.position.set(125, 7.5, -25);

    const butteMat = new THREE.MeshLambertMaterial({ color: 0xb45309, flatShading: true });
    const trackMat = new THREE.MeshLambertMaterial({ color: 0x1f2937 });
    const curbMat = new THREE.MeshLambertMaterial({ color: 0xef4444 });

    // Center Butte Mesa (Willy's Butte)
    const butteGeo = new THREE.CylinderGeometry(9, 13, 11, 8);
    const butte = new THREE.Mesh(butteGeo, butteMat);
    butte.position.y = 5.5;
    raceGroup.add(butte);

    // Dark Asphalt Racetrack Ring Loop
    const trackGeo = new THREE.RingGeometry(15, 23, 32);
    const track = new THREE.Mesh(trackGeo, trackMat);
    track.rotation.x = -Math.PI / 2;
    track.position.y = 0.3;
    raceGroup.add(track);

    // Outer Red Rumble Strip Curb
    const curbGeo = new THREE.RingGeometry(23, 24.2, 32);
    const curb = new THREE.Mesh(curbGeo, curbMat);
    curb.rotation.x = -Math.PI / 2;
    curb.position.y = 0.35;
    raceGroup.add(curb);

    // Miniature Red Lightning McQueen Race Car (#95)
    const carGroup = new THREE.Group();
    carGroup.position.set(19, 1.2, 0);
    const carBodyGeo = new THREE.BoxGeometry(3.6, 1.2, 1.8);
    const carMat = new THREE.MeshLambertMaterial({ color: 0xdc2626 });
    const carBody = new THREE.Mesh(carBodyGeo, carMat);
    carGroup.add(carBody);

    const spoilerGeo = new THREE.BoxGeometry(0.5, 0.9, 1.9);
    const spoiler = new THREE.Mesh(spoilerGeo, carMat);
    spoiler.position.set(-1.6, 0.8, 0);
    carGroup.add(spoiler);
    raceGroup.add(carGroup);

    // Track flag
    const flag = this.createRedFlag(4);
    flag.position.set(0, 14, 0);
    raceGroup.add(flag);

    this.scene.add(raceGroup);
  }

  // Dubai Archipelago: Palm Jumeirah (fronds & Atlantis), Burj Al Arab sail, Ain Dubai wheel
  private createDubaiArchipelago() {
    const dubaiGroup = new THREE.Group();
    dubaiGroup.position.set(145, 1.0, 70);

    const sandMat = new THREE.MeshLambertMaterial({ color: 0xfde68a });
    const atlantisMat = new THREE.MeshLambertMaterial({ color: 0xf472b6 });
    const whiteMat = new THREE.MeshLambertMaterial({ color: 0xffffff });
    const glassMat = new THREE.MeshLambertMaterial({ color: 0x38bdf8 });

    // 1. Palm Jumeirah Island Crescent & Palm Fronds
    const crescentGeo = new THREE.RingGeometry(24, 29, 24, 1, -Math.PI * 0.75, Math.PI * 1.5);
    const crescent = new THREE.Mesh(crescentGeo, sandMat);
    crescent.rotation.x = -Math.PI / 2;
    crescent.position.set(-15, 0.3, -35);
    dubaiGroup.add(crescent);

    // Palm Central Spine & Fronds
    const spineGeo = new THREE.BoxGeometry(3.5, 0.6, 22);
    const spine = new THREE.Mesh(spineGeo, sandMat);
    spine.position.set(-15, 0.3, -35);
    dubaiGroup.add(spine);

    for (let f = -2; f <= 2; f++) {
      const frondGeo = new THREE.BoxGeometry(16, 0.4, 1.8);
      const frondMat = new THREE.MeshLambertMaterial({ color: 0x86efac });
      const frond = new THREE.Mesh(frondGeo, frondMat);
      frond.position.set(-15, 0.35, -35 + f * 4);
      dubaiGroup.add(frond);
    }

    // Atlantis Resort Hotel (Pink palace with central open archway)
    const atlantisBodyGeo = new THREE.BoxGeometry(12, 8, 4);
    const atlantisBody = new THREE.Mesh(atlantisBodyGeo, atlantisMat);
    atlantisBody.position.set(-15, 4.3, -48);
    dubaiGroup.add(atlantisBody);

    const atlantisArchGeo = new THREE.BoxGeometry(4.5, 4.5, 4.2);
    const darkArchMat = new THREE.MeshLambertMaterial({ color: 0x1e293b });
    const atlantisArch = new THREE.Mesh(atlantisArchGeo, darkArchMat);
    atlantisArch.position.set(-15, 2.5, -48);
    dubaiGroup.add(atlantisArch);

    const flagPalm = this.createRedFlag(3.5);
    flagPalm.position.set(-15, 9, -48);
    dubaiGroup.add(flagPalm);

    // 2. Burj Al Arab Sail Hotel on Offshore Island
    const baaIslandGeo = new THREE.CylinderGeometry(8, 10, 1.8, 12);
    const baaIsland = new THREE.Mesh(baaIslandGeo, sandMat);
    baaIsland.position.set(0, 0.4, 0);
    dubaiGroup.add(baaIsland);

    const sailGeo = new THREE.ConeGeometry(5.5, 24, 3);
    const sail = new THREE.Mesh(sailGeo, whiteMat);
    sail.rotation.y = Math.PI / 4;
    sail.position.set(0, 12, 0);
    dubaiGroup.add(sail);

    const spineBaa = new THREE.BoxGeometry(1.2, 24, 1.2);
    const spineMesh = new THREE.Mesh(spineBaa, glassMat);
    spineMesh.position.set(-2.5, 12, 0);
    dubaiGroup.add(spineMesh);

    const flagBaa = this.createRedFlag(4);
    flagBaa.position.set(0, 25, 0);
    dubaiGroup.add(flagBaa);

    // 3. Ain Dubai Giant Standing Ferris Wheel on Bluewaters Island
    const wheelGroup = new THREE.Group();
    wheelGroup.position.set(10, 0, 35);

    const bwIslandGeo = new THREE.CylinderGeometry(11, 14, 2.0, 12);
    const bwIsland = new THREE.Mesh(bwIslandGeo, sandMat);
    wheelGroup.add(bwIsland);

    // Vertical Standing Wheel Rim Group
    const wheelRimGroup = new THREE.Group();
    wheelRimGroup.position.y = 14;

    const rimGeo = new THREE.TorusGeometry(10, 0.7, 6, 24);
    const rimMat = new THREE.MeshLambertMaterial({ color: 0x38bdf8 });
    const rim = new THREE.Mesh(rimGeo, rimMat);
    wheelRimGroup.add(rim);

    // 6 Spokes
    for (let s = 0; s < 6; s++) {
      const spokeGeo = new THREE.BoxGeometry(0.3, 20, 0.3);
      const spoke = new THREE.Mesh(spokeGeo, rimMat);
      spoke.rotation.z = (s / 6) * Math.PI;
      wheelRimGroup.add(spoke);
    }

    // Outer passenger capsules/pods
    for (let p = 0; p < 8; p++) {
      const podAngle = (p / 8) * Math.PI * 2;
      const podGeo = new THREE.SphereGeometry(0.8, 6, 6);
      const podMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const pod = new THREE.Mesh(podGeo, podMat);
      pod.position.set(Math.cos(podAngle) * 10, Math.sin(podAngle) * 10, 0);
      wheelRimGroup.add(pod);
    }

    wheelGroup.add(wheelRimGroup);
    this.ferrisWheelRim = wheelRimGroup;

    // A-frame support legs
    const legGeo = new THREE.CylinderGeometry(0.35, 0.45, 16, 6);
    const legMat = new THREE.MeshLambertMaterial({ color: 0x94a3b8 });
    const legL = new THREE.Mesh(legGeo, legMat);
    legL.position.set(-4, 7.5, 0);
    legL.rotation.z = -0.25;
    wheelGroup.add(legL);

    const legR = new THREE.Mesh(legGeo, legMat);
    legR.position.set(4, 7.5, 0);
    legR.rotation.z = 0.25;
    wheelGroup.add(legR);

    const flagWheel = this.createRedFlag(3.5);
    flagWheel.position.set(0, 25.5, 0);
    wheelGroup.add(flagWheel);

    dubaiGroup.add(wheelGroup);

    this.scene.add(dubaiGroup);
  }

  // Foliage: Palm trees on coasts/deserts, lush green trees, cherry blossoms, alpine pines
  private createIslandFoliageAndTrees() {
    const palmLocations: [number, number, number][] = [
      // Giza oasis palms
      [-128, 8.8, 8], [-122, 8.8, 12], [-140, 8.8, 10], [-130, 8.8, -12],
      // Hollywood canyon palms
      [110, 9.5, -75], [118, 9.5, -95], [140, 9.5, -75],
      // Dubai archipelago palms
      [130, 1.5, 30], [138, 1.5, 45], [152, 1.5, 55], [125, 1.5, 65]
    ];
    palmLocations.forEach(([px, py, pz]) => this.addPalmTree(px, py, pz));

    // Green deciduous trees scattered across central plains
    const greenTreeLocations: [number, number, number][] = [
      [-35, 6.2, -15], [-50, 6.2, 5], [-20, 6.0, -45], [35, 6.0, -18],
      [45, 6.0, -5], [55, 6.0, 30], [-15, 6.0, 35], [-35, 5.8, 65]
    ];
    greenTreeLocations.forEach(([tx, ty, tz]) => this.addDeciduousTree(tx, ty, tz, 0x22c55e));

    // Cherry blossoms along Fushimi Inari
    const cherryLocations: [number, number, number][] = [
      [-135, 6.8, -25], [-115, 6.8, -12], [-130, 6.8, -5], [-110, 6.8, -30]
    ];
    cherryLocations.forEach(([cx, cy, cz]) => this.addDeciduousTree(cx, cy, cz, 0xf472b6));

    // Dark green pines near north mountain base
    const pineLocations: [number, number, number][] = [
      [-25, 8.0, -120], [-15, 9.0, -125], [25, 8.0, -120], [35, 8.5, -125]
    ];
    pineLocations.forEach(([px, py, pz]) => this.addPineTree(px, py, pz));
  }

  private addPalmTree(x: number, y: number, z: number) {
    const tree = new THREE.Group();
    tree.position.set(x, y, z);

    const trunkGeo = new THREE.CylinderGeometry(0.25, 0.4, 5.5, 6);
    const trunkMat = new THREE.MeshLambertMaterial({ color: 0x78350f });
    const trunk = new THREE.Mesh(trunkGeo, trunkMat);
    trunk.position.y = 2.75;
    tree.add(trunk);

    const frondMat = new THREE.MeshLambertMaterial({ color: 0x16a34a });
    for (let f = 0; f < 5; f++) {
      const frondGeo = new THREE.ConeGeometry(1.6, 2.8, 4);
      const frond = new THREE.Mesh(frondGeo, frondMat);
      const angle = (f / 5) * Math.PI * 2;
      frond.position.set(Math.cos(angle) * 1.2, 5.2, Math.sin(angle) * 1.2);
      frond.rotation.z = Math.cos(angle) * 0.4;
      frond.rotation.x = Math.sin(angle) * 0.4;
      tree.add(frond);
    }
    this.scene.add(tree);
  }

  private addDeciduousTree(x: number, y: number, z: number, foliageColor: number) {
    const tree = new THREE.Group();
    tree.position.set(x, y, z);

    const trunkGeo = new THREE.CylinderGeometry(0.3, 0.45, 3.5, 6);
    const trunkMat = new THREE.MeshLambertMaterial({ color: 0x78350f });
    const trunk = new THREE.Mesh(trunkGeo, trunkMat);
    trunk.position.y = 1.75;
    tree.add(trunk);

    const folGeo = new THREE.SphereGeometry(2.4, 8, 8);
    const folMat = new THREE.MeshLambertMaterial({ color: foliageColor });
    const fol = new THREE.Mesh(folGeo, folMat);
    fol.position.y = 4.2;
    tree.add(fol);

    this.scene.add(tree);
  }

  private addPineTree(x: number, y: number, z: number) {
    const tree = new THREE.Group();
    tree.position.set(x, y, z);

    const trunkGeo = new THREE.CylinderGeometry(0.25, 0.35, 2.5, 6);
    const trunkMat = new THREE.MeshLambertMaterial({ color: 0x5c2d16 });
    const trunk = new THREE.Mesh(trunkGeo, trunkMat);
    trunk.position.y = 1.25;
    tree.add(trunk);

    const pineMat = new THREE.MeshLambertMaterial({ color: 0x14532d });
    for (let tier = 0; tier < 3; tier++) {
      const tierGeo = new THREE.ConeGeometry(2.5 - tier * 0.6, 2.4, 6);
      const tierMesh = new THREE.Mesh(tierGeo, pineMat);
      tierMesh.position.y = 2.8 + tier * 1.6;
      tree.add(tierMesh);
    }

    this.scene.add(tree);
  }

  // Ocean Flourishes: Sailing Caravel Ship & Sea Monster Arches (Matching reference image)
  private createOceanFlourishes() {
    // 1. Sailing Caravel Ship in South Ocean (-65, 0.4, 155)
    const shipGroup = new THREE.Group();
    shipGroup.position.set(-65, 0.4, 155);
    shipGroup.rotation.y = 0.6;

    const hullGeo = new THREE.BoxGeometry(15, 3.8, 6.5);
    const hullMat = new THREE.MeshLambertMaterial({ color: 0x78350f });
    const hull = new THREE.Mesh(hullGeo, hullMat);
    shipGroup.add(hull);

    const sailMat = new THREE.MeshLambertMaterial({ color: 0xf8fafc, side: THREE.DoubleSide });
    const mastGeo = new THREE.CylinderGeometry(0.3, 0.3, 14, 6);
    const mast = new THREE.Mesh(mastGeo, hullMat);
    mast.position.set(-2, 7, 0);
    shipGroup.add(mast);

    const sail = new THREE.Mesh(new THREE.PlaneGeometry(8, 9), sailMat);
    sail.position.set(-2, 7, 0);
    shipGroup.add(sail);

    const flagShip = this.createRedFlag(3);
    flagShip.position.set(-2, 14, 0);
    shipGroup.add(flagShip);

    this.scene.add(shipGroup);

    // 2. Emerald Sea Serpent Coils in South Ocean (15, 0.2, 165)
    const serpentGroup = new THREE.Group();
    serpentGroup.position.set(15, 0.2, 165);
    const serpentMat = new THREE.MeshLambertMaterial({ color: 0x059669 });
    for (let c = -1; c <= 1; c++) {
      const coilGeo = new THREE.TorusGeometry(3.6, 1.2, 6, 12, Math.PI);
      const coil = new THREE.Mesh(coilGeo, serpentMat);
      coil.position.set(c * 6.5, 0, 0);
      coil.rotation.z = -Math.PI;
      serpentGroup.add(coil);
    }
    this.scene.add(serpentGroup);

    // 3. Northeast Dragon Arches in Ocean (160, 0.2, -75 - Matching top-right arches in reference!)
    const neDragonGroup = new THREE.Group();
    neDragonGroup.position.set(160, 0.2, -75);
    for (let d = -1; d <= 1; d++) {
      const archGeo = new THREE.TorusGeometry(4.2, 1.3, 6, 12, Math.PI);
      const arch = new THREE.Mesh(archGeo, serpentMat);
      arch.position.set(d * 8.5, 0, 0);
      arch.rotation.z = -Math.PI;
      neDragonGroup.add(arch);
    }
    this.scene.add(neDragonGroup);
  }

  // ---------------------------------------------------------------------------
  // 4. Flying Birds
  // ---------------------------------------------------------------------------
  private createBirds() {
    this.birdsGroup = new THREE.Group();
    const birdMat = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });

    const birdSpawnCoords: [number, number, number][] = [
      [-85, 24, -45],
      [-95, 26, -55],
      [45, 25, 45],
      [55, 28, 35],
      [-35, 22, 85],
      [125, 26, 65]
    ];

    birdSpawnCoords.forEach(([bx, by, bz]) => {
      const bird = new THREE.Group();
      bird.position.set(bx, by, bz);

      // Left wing
      const wingGeo = new THREE.PlaneGeometry(2.4, 0.8);
      const leftWing = new THREE.Mesh(wingGeo, birdMat);
      leftWing.position.x = -1.2;
      bird.add(leftWing);

      // Right wing
      const rightWing = new THREE.Mesh(wingGeo, birdMat);
      rightWing.position.x = 1.2;
      bird.add(rightWing);

      this.birdWings.push(leftWing, rightWing);
      this.birdsGroup!.add(bird);
    });

    this.scene.add(this.birdsGroup);
  }

  // ---------------------------------------------------------------------------
  // 5. Player Marker & Selection Ring
  // ---------------------------------------------------------------------------
  private createPlayerMarker() {
    this.playerMesh = new THREE.Group();
    const px = this.playerPos?.x || 0;
    const pz = this.playerPos?.z || 0;
    this.playerMesh.position.set(px, 7.5, pz);

    // Glowing golden beacon ring
    const ringGeo = new THREE.RingGeometry(2.0, 3.2, 24);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.95
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.2;
    this.playerMesh.add(ring);

    // Directional player arrow
    const arrowGeo = new THREE.ConeGeometry(1.6, 4.0, 3);
    const arrowMat = new THREE.MeshBasicMaterial({ color: 0x0284c7 });
    const arrow = new THREE.Mesh(arrowGeo, arrowMat);
    arrow.rotation.x = -Math.PI / 2;
    arrow.rotation.y = this.playerYaw || 0;
    arrow.position.y = 0.4;
    this.playerMesh.add(arrow);

    this.scene.add(this.playerMesh);
  }

  private createSelectionRing() {
    const ringGeo = new THREE.RingGeometry(3.2, 4.6, 28);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xfacc15,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.9
    });
    this.selectionRing = new THREE.Mesh(ringGeo, ringMat);
    this.selectionRing.rotation.x = -Math.PI / 2;
    this.selectionRing.visible = false;
    this.scene.add(this.selectionRing);
  }

  // ---------------------------------------------------------------------------
  // 6. Modern Sleek Floating Game Badges (Clean glassmorphic pills)
  // ---------------------------------------------------------------------------
  private initModernBadges() {
    if (!this.badgesContainer) return;
    this.badgesContainer.innerHTML = '';
    this.activeBadges = [];

    const PRIMARY_LANDMARKS: PrimaryBadgeConfig[] = [
      {
        id: 'giza',
        label: 'GIZA',
        fullName: 'Egypt · Giza Pyramids & Great Sphinx',
        category: 'monuments',
        teleportCoords: [-155, 2, 36],
        modelPos: [-135, 8.5, 25],
        badgePos: [-135, 22, 25],
        pinHeight: 14
      },
      {
        id: 'fushimi_inari',
        label: 'FUSHIMI INARI',
        fullName: 'Kyoto · Fushimi Inari Shrine & Torii Tunnel',
        category: 'nature',
        teleportCoords: [-190, 4, -20],
        modelPos: [-125, 6.5, -18],
        badgePos: [-125, 20, -18],
        pinHeight: 14
      },
      {
        id: 'tokyo_tower',
        label: 'TOKYO TOWER',
        fullName: 'Tokyo · Tokyo Tower Lattice Spire',
        category: 'cities',
        teleportCoords: [-176, 2, -74],
        modelPos: [-115, 6.0, -65],
        badgePos: [-115, 34, -65],
        pinHeight: 28
      },
      {
        id: 'seoul',
        label: 'SEOUL',
        fullName: 'Seoul · Gwanghwamun Palace Gate',
        category: 'cities',
        teleportCoords: [-65, 2, -95],
        modelPos: [-65, 8.5, -95],
        badgePos: [-65, 24, -95],
        pinHeight: 16
      },
      {
        id: 'taj_mahal',
        label: 'TAJ MAHAL',
        fullName: 'Imperial India · Taj Mahal',
        category: 'monuments',
        teleportCoords: [80, 4, -135],
        modelPos: [70, 5.0, -135],
        badgePos: [70, 26, -135],
        pinHeight: 22
      },
      {
        id: 'eiffel',
        label: 'EIFFEL',
        fullName: 'Eiffel Tower · Paris',
        category: 'monuments',
        teleportCoords: [26, 2, -38],
        modelPos: [24, 6.0, -42],
        badgePos: [24, 28, -42],
        pinHeight: 22
      },
      {
        id: 'citadel',
        label: 'CITADEL',
        fullName: 'Crossroads Citadel (Spawn)',
        category: 'monuments',
        teleportCoords: [0, 2, -4],
        modelPos: [0, 5.5, 0],
        badgePos: [0, 24, -10],
        pinHeight: 18
      },
      {
        id: 'hollywood',
        label: 'HOLLYWOOD',
        fullName: 'Hollywood Hills & Sign',
        category: 'cities',
        teleportCoords: [165, 26, -100],
        modelPos: [125, 9.5, -85],
        badgePos: [125, 22, -85],
        pinHeight: 14
      },
      {
        id: 'mcqueen',
        label: 'MCQUEEN',
        fullName: 'Lightning McQueen Street · Radiator Springs Raceway',
        category: 'transit',
        teleportCoords: [190, 2, -15],
        modelPos: [125, 7.5, -25],
        badgePos: [125, 18, -25],
        pinHeight: 12
      },
      {
        id: 'palm_jumeirah',
        label: 'PALM JUMEIRAH',
        fullName: 'Palm Jumeirah · Atlantis Resort',
        category: 'cities',
        teleportCoords: [324, 2, 46],
        modelPos: [130, 2.5, 35],
        badgePos: [130, 14, 35],
        pinHeight: 10
      },
      {
        id: 'burj_al_arab',
        label: 'BURJ AL ARAB',
        fullName: 'Burj Al Arab · 7-Star Sail Hotel',
        category: 'cities',
        teleportCoords: [220, 2, 110],
        modelPos: [145, 2.5, 70],
        badgePos: [145, 20, 70],
        pinHeight: 18
      },
      {
        id: 'ain_dubai_wheel',
        label: 'AIN DUBAI WHEEL',
        fullName: 'Bluewaters Island & Ain Dubai Ferris Wheel',
        category: 'cities',
        teleportCoords: [262, 2, 146],
        modelPos: [155, 2.5, 105],
        badgePos: [155, 22, 105],
        pinHeight: 18
      }
    ];

    PRIMARY_LANDMARKS.forEach(cfg => {
      // Slender metallic pin stem in 3D
      const pinGroup = new THREE.Group();
      pinGroup.position.set(cfg.modelPos[0], cfg.modelPos[1], cfg.modelPos[2]);

      const stemGeo = new THREE.CylinderGeometry(0.18, 0.18, cfg.pinHeight, 6);
      const stemMat = new THREE.MeshBasicMaterial({ color: 0x94a3b8 });
      const stem = new THREE.Mesh(stemGeo, stemMat);
      stem.position.y = cfg.pinHeight / 2;
      pinGroup.add(stem);

      const baseRing = new THREE.Mesh(
        new THREE.RingGeometry(1.6, 2.4, 16),
        new THREE.MeshBasicMaterial({ color: 0xfacc15, side: THREE.DoubleSide })
      );
      baseRing.rotation.x = -Math.PI / 2;
      baseRing.position.y = 0.2;
      pinGroup.add(baseRing);
      this.scene.add(pinGroup);

      // High-DPI HTML Badge Element
      const badgeEl = document.createElement('div');
      badgeEl.className = `mc-map-badge mc-badge-${cfg.category}`;
      badgeEl.setAttribute('data-id', cfg.id);
      badgeEl.innerHTML = `
        <span class="mc-badge-dot"></span>
        <span class="mc-badge-text">${cfg.label}</span>
        <div class="mc-badge-arrow"></div>
      `;

      badgeEl.addEventListener('click', (e) => {
        e.stopPropagation();
        sound.playClick();
        this.selectLandmark(cfg.teleportCoords, cfg.fullName, new THREE.Vector3(cfg.modelPos[0], cfg.modelPos[1], cfg.modelPos[2]));
      });

      this.badgesContainer!.appendChild(badgeEl);

      this.activeBadges.push({
        id: cfg.id,
        label: cfg.label,
        category: cfg.category,
        teleportCoords: cfg.teleportCoords,
        anchorPos: new THREE.Vector3(cfg.badgePos[0], cfg.badgePos[1], cfg.badgePos[2]),
        modelPos: new THREE.Vector3(cfg.modelPos[0], cfg.modelPos[1], cfg.modelPos[2]),
        el: badgeEl
      });
    });

    // Player Badge "YOU [LAKSHYA]"
    const playerEl = document.createElement('div');
    playerEl.className = 'mc-map-badge mc-badge-player';
    playerEl.innerHTML = `
      <span class="mc-badge-dot"></span>
      <span class="mc-badge-text">YOU [LAKSHYA]</span>
      <div class="mc-badge-arrow"></div>
    `;
    this.badgesContainer.appendChild(playerEl);

    const px = this.playerPos?.x || 0;
    const pz = this.playerPos?.z || 0;
    this.activeBadges.push({
      id: 'player_badge',
      label: 'YOU [LAKSHYA]',
      category: 'nature',
      teleportCoords: [px, 2, pz],
      anchorPos: new THREE.Vector3(px, 12, pz + 10), // Offset forward so it never overlaps Citadel
      modelPos: new THREE.Vector3(px, 5.5, pz),
      el: playerEl,
      isPlayer: true
    });
  }

  // ---------------------------------------------------------------------------
  // 7. Badge Screen Projection
  // ---------------------------------------------------------------------------
  private updateBadgeScreenPositions() {
    if (!this.container || this.activeBadges.length === 0) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;

    const projVec = new THREE.Vector3();

    for (let i = 0; i < this.activeBadges.length; i++) {
      const item = this.activeBadges[i];
      projVec.copy(item.anchorPos);
      projVec.project(this.camera);

      // Convert normalized device coords (-1..1) to CSS pixels
      const x = (projVec.x * 0.5 + 0.5) * width;
      const y = (-(projVec.y * 0.5) + 0.5) * height;

      // Keep badges comfortably inside viewport
      const clampedX = Math.max(30, Math.min(width - 30, x));
      const clampedY = Math.max(20, Math.min(height - 20, y));

      item.el.style.transform = `translate(-50%, -100%) translate(${clampedX.toFixed(1)}px, ${clampedY.toFixed(1)}px)`;
    }
  }

  // ---------------------------------------------------------------------------
  // 8. Interaction: Panning, Dragging, Clicking, Hovering
  // ---------------------------------------------------------------------------
  private bindEvents() {
    const el = this.canvas;

    el.addEventListener('pointerdown', (e: PointerEvent) => {
      this.isPointerDown = true;
      this.hasDragged = false;
      this.dragStartX = e.clientX;
      this.dragStartY = e.clientY;
      this.initialTarget.copy(this.cameraTarget);
      el.setPointerCapture(e.pointerId);
    });

    el.addEventListener('pointermove', (e: PointerEvent) => {
      if (this.isPointerDown) {
        const dx = e.clientX - this.dragStartX;
        const dy = e.clientY - this.dragStartY;
        if (Math.hypot(dx, dy) > 4) {
          this.hasDragged = true;
          // Pan camera target smoothly
          const panSpeed = (this.baseFrustumSize / (this.container.clientHeight || 900)) / this.currentZoom;
          this.cameraTarget.x = this.initialTarget.x - dx * panSpeed;
          this.cameraTarget.z = this.initialTarget.z - dy * panSpeed * 1.35;
          this.updateCameraPosition();
        }
      }

      this.handleHover(e);
    });

    el.addEventListener('pointerup', (e: PointerEvent) => {
      if (this.isPointerDown) {
        this.isPointerDown = false;
        try { el.releasePointerCapture(e.pointerId); } catch {}
        if (!this.hasDragged) {
          this.handleClick(e);
        }
      }
    });

    el.addEventListener('wheel', (e: WheelEvent) => {
      e.preventDefault();
      const zoomDelta = e.deltaY > 0 ? 0.9 : 1.1;
      this.setZoom(this.currentZoom * zoomDelta);
    }, { passive: false });

    // Category filter tab buttons
    document.querySelectorAll('.mc-map-filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        document.querySelectorAll('.mc-map-filter-btn').forEach(b => b.classList.remove('active'));
        target.classList.add('active');
        const filter = (target.getAttribute('data-filter') || 'all') as string;
        this.filterBadges(filter);
        sound.playClick();
      });
    });

    // Bottom action buttons
    document.getElementById('btn-map-zoom-in')?.addEventListener('click', () => {
      this.setZoom(this.currentZoom * 1.25);
      sound.playClick();
    });

    document.getElementById('btn-map-zoom-out')?.addEventListener('click', () => {
      this.setZoom(this.currentZoom * 0.8);
      sound.playClick();
    });

    document.getElementById('btn-map-reset')?.addEventListener('click', () => {
      this.resetView();
      sound.playClick();
    });

    document.getElementById('btn-map-locate-player')?.addEventListener('click', () => {
      const px = this.playerPos?.x || 0;
      const pz = this.playerPos?.z || 0;
      this.panTo([px, 2, pz]);
      sound.playClick();
    });

    window.addEventListener('resize', this.onWindowResize);
  }

  private filterBadges(filter: string) {
    this.activeBadges.forEach(b => {
      if (b.isPlayer) return;
      if (filter === 'all' || b.category === filter) {
        b.el.style.display = 'flex';
      } else {
        b.el.style.display = 'none';
      }
    });
  }

  private handleHover(e: PointerEvent) {
    if (!this.terrainMesh) return;
    const rect = this.canvas.getBoundingClientRect();
    this.mouseVec.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouseVec.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouseVec, this.camera);
    const intersects = this.raycaster.intersectObjects(this.interactiveMeshes);

    if (intersects.length > 0) {
      const pt = intersects[0].point;
      if (this.cursorCoordsEl) {
        this.cursorCoordsEl.textContent = `X: ${Math.round(pt.x)}, Z: ${Math.round(pt.z)}`;
      }
    }
  }

  private handleClick(e: PointerEvent) {
    const rect = this.canvas.getBoundingClientRect();
    this.mouseVec.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouseVec.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouseVec, this.camera);
    const intersects = this.raycaster.intersectObjects(this.interactiveMeshes);

    if (intersects.length > 0) {
      const pt = intersects[0].point;
      sound.playClick();
      this.selectLandmark([pt.x, pt.y, pt.z], `Coordinates [${Math.round(pt.x)}, ${Math.round(pt.z)}]`, pt);
    }
  }

  public selectLandmark(coords: [number, number, number], name: string, modelPos?: THREE.Vector3) {
    if (this.selectionRing) {
      const pos = modelPos || new THREE.Vector3(coords[0], coords[1], coords[2]);
      this.selectionRing.position.set(pos.x, 0.45, pos.z);
      this.selectionRing.visible = true;
    }

    if (this.tooltipEl) {
      this.tooltipEl.style.display = 'block';
      const titleEl = document.getElementById('mc-map-card-title');
      const descEl = document.getElementById('mc-map-card-desc');
      const warpBtn = document.getElementById('mc-map-card-warp');

      if (titleEl) titleEl.textContent = name;
      if (descEl) descEl.textContent = `Fast travel waypoint at (${Math.round(coords[0])}, ${Math.round(coords[2])}). Click below to instantly warp.`;
      if (warpBtn) {
        warpBtn.onclick = () => {
          this.onTeleport(coords);
          this.onClose();
        };
      }
    }
  }

  public panTo(coords: [number, number, number]) {
    this.cameraTarget.set(coords[0], 5, coords[2]);
    this.updateCameraPosition();
  }

  public panToLandmark(coords: [number, number, number], lm: any) {
    this.panTo(coords);
    this.selectLandmark(coords, lm?.name || 'Waypoint');
  }

  public setFilter(filter: string) {
    this.filterBadges(filter);
  }

  public setZoom(zoom: number) {
    this.currentZoom = THREE.MathUtils.clamp(zoom, 0.65, 3.2);
    this.updateCameraPosition();
  }

  public resetView() {
    this.currentZoom = 1.0;
    this.cameraTarget.set(5, 5, -15);
    this.updateCameraPosition();
    if (this.selectionRing) this.selectionRing.visible = false;
    if (this.tooltipEl) this.tooltipEl.style.display = 'none';
  }

  private onWindowResize = () => {
    if (!this.container) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    this.renderer.setSize(width, height);

    const aspect = width / height;
    const hHalf = this.baseFrustumSize / 2;
    const wHalf = hHalf * aspect;
    this.camera.left = -wHalf;
    this.camera.right = wHalf;
    this.camera.top = hHalf;
    this.camera.bottom = -hHalf;
    this.camera.updateProjectionMatrix();
    this.updateCameraPosition();
  };

  // ---------------------------------------------------------------------------
  // 9. Animation Loop (Water Waves, Bird Flapping, Ferris Wheel, Smoke)
  // ---------------------------------------------------------------------------
  private startAnimationLoop() {
    const animate = (time: number) => {
      if (this.isDisposed) return;
      this.animId = requestAnimationFrame(animate);

      const sec = time * 0.001;

      // 1. Moving Ocean Waves (Sinusoidal displacement of water vertices)
      if (this.waterGeoPlane && this.waterOriginalPositions) {
        const posAttr = this.waterGeoPlane.attributes.position;
        const orig = this.waterOriginalPositions;
        const count = posAttr.count;

        for (let i = 0; i < count; i++) {
          const ox = orig[i * 3];
          const oz = orig[i * 3 + 2];
          const wave = Math.sin(ox * 0.035 + sec * 1.8) * Math.cos(oz * 0.035 + sec * 1.4) * 0.45;
          posAttr.setY(i, wave);
        }
        posAttr.needsUpdate = true;
      }

      // 2. Animated Surf Rings
      this.animatedWaveRings.forEach((ring, idx) => {
        const pulse = Math.sin(sec * 1.6 + idx * 0.9) * 0.08 + 1.0;
        ring.scale.set(pulse, pulse, 1);
      });

      // 3. Flapping Bird Wings
      if (this.birdWings.length > 0) {
        const flap = Math.sin(sec * 8.0) * 0.45;
        for (let w = 0; w < this.birdWings.length; w += 2) {
          this.birdWings[w].rotation.z = flap;
          this.birdWings[w + 1].rotation.z = -flap;
        }
      }

      // 4. Rotating Ferris Wheel
      if (this.ferrisWheelRim) {
        this.ferrisWheelRim.rotation.z += 0.006;
      }

      // 5. Rising Volcano Smoke
      this.smokeParticles.forEach((puff, idx) => {
        puff.position.y += 0.03;
        puff.scale.multiplyScalar(1.002);
        if (puff.position.y > 48) {
          puff.position.y = 36;
          puff.scale.set(1, 1, 1);
        }
      });

      // 6. Update Badges
      this.updateBadgeScreenPositions();

      this.renderer.render(this.scene, this.camera);
    };

    this.animId = requestAnimationFrame(animate);
  }

  // ---------------------------------------------------------------------------
  // 10. Clean Disposal
  // ---------------------------------------------------------------------------
  public dispose() {
    this.isDisposed = true;
    if (this.animId !== null) {
      cancelAnimationFrame(this.animId);
      this.animId = null;
    }
    window.removeEventListener('resize', this.onWindowResize);

    if (this.badgesContainer) {
      this.badgesContainer.innerHTML = '';
    }

    if (this.renderer) {
      this.renderer.dispose();
    }
  }
}
