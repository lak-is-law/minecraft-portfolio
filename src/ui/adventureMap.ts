import * as THREE from 'three';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { sound } from '../engine/audio';

export interface AdventureMapOptions {
  canvas: HTMLCanvasElement;
  container: HTMLElement;
  tooltipEl: HTMLElement | null;
  cursorCoordsEl: HTMLElement | null;
  liveCoordsEl: HTMLElement | null;
  playerPos: { x: number; y: number; z: number };
  playerYaw: number;
  onTeleport: (coords: [number, number, number]) => void;
  onClose: () => void;
  getLandmarkCategory: (tag: string) => 'monuments' | 'cities' | 'transit' | 'nature';
}

export class AdventureMapRenderer {
  private canvas: HTMLCanvasElement;
  private container: HTMLElement;
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

  // Camera navigation
  private baseFrustumSize = 390;
  private currentZoom = 1.0;
  private cameraTarget = new THREE.Vector3(0, 4, 0);
  private cameraOffset = new THREE.Vector3(330, 380, 330); // Tilted isometric angle matching reference
  private isPointerDown = false;
  private hasDragged = false;
  private dragStartX = 0;
  private dragStartY = 0;
  private touchStartDist = 0;

  // Raycasting & Interaction
  private raycaster = new THREE.Raycaster();
  private pointer = new THREE.Vector2();
  private interactiveMeshes: THREE.Object3D[] = [];
  private landmarkMeshMap = new Map<THREE.Object3D, typeof PORTFOLIO_DATA.landmarks[0]>();
  private hoveredLandmark: typeof PORTFOLIO_DATA.landmarks[0] | null = null;
  private activeFilter: 'all' | 'monuments' | 'cities' | 'transit' | 'nature' = 'all';

  // Dynamic Scene Elements
  private terrainMesh!: THREE.Mesh;
  private waterShelfMesh!: THREE.Mesh;
  private waterSurfaceMesh!: THREE.Mesh;
  private waterGeoPlane!: THREE.PlaneGeometry;
  private waterOriginalPositions!: Float32Array;
  private volcanoSmokePuffs: { mesh: THREE.Mesh; seed: number }[] = [];
  private animatedWaveRings: THREE.Mesh[] = [];
  private markerGroups: { group: THREE.Group; landmark: typeof PORTFOLIO_DATA.landmarks[0]; category: string; isPrimary: boolean }[] = [];
  private playerMarkerGroup!: THREE.Group;
  private selectionRing!: THREE.Mesh;
  private ferrisWheelRim?: THREE.Group;
  private birds: {
    group: THREE.Group;
    wingL: THREE.Group;
    wingR: THREE.Group;
    shadow: THREE.Mesh;
    center: THREE.Vector3;
    radiusX: number;
    radiusZ: number;
    speed: number;
    altitude: number;
    phase: number;
    flapSpeed: number;
  }[] = [];

  constructor(options: AdventureMapOptions) {
    this.canvas = options.canvas;
    this.container = options.container;
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
    this.attachControls();
    this.startLoop();
  }

  // ---------------------------------------------------------------------------
  // 1. Three.js Setup & Isometric Lighting
  // ---------------------------------------------------------------------------
  private initThree() {
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;
    const aspect = width / height;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.18;

    this.scene = new THREE.Scene();
    // Rich tropical ocean backdrop (No ugly checkered plaid!)
    this.scene.background = new THREE.Color(0x195782);
    this.scene.fog = new THREE.FogExp2(0x195782, 0.0012);

    // Isometric Orthographic Camera
    const hHalf = this.baseFrustumSize / 2;
    const wHalf = hHalf * aspect;
    this.camera = new THREE.OrthographicCamera(-wHalf, wHalf, hHalf, -hHalf, 1, 2800);
    this.updateCameraPosition();

    // Warm Crisp Sunlight (Northwest direction casting soft relief shadows)
    const sunLight = new THREE.DirectionalLight(0xfffaeb, 1.45);
    sunLight.position.set(-260, 440, -240);
    this.scene.add(sunLight);

    // Sky & Ocean Ambient Lighting
    const ambientLight = new THREE.AmbientLight(0x8cd2f5, 0.8);
    this.scene.add(ambientLight);

    // Warm Southeast Bounce Fill
    const fillLight = new THREE.DirectionalLight(0xa5ddfc, 0.45);
    fillLight.position.set(240, 160, 260);
    this.scene.add(fillLight);

    const hemiLight = new THREE.HemisphereLight(0x7ec8f8, 0x1f4728, 0.35);
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
  // 2. Build the Complete 3D Island Realm (Matching User Reference)
  // ---------------------------------------------------------------------------
  private buildWorld() {
    this.createRevampedOcean();
    this.createSculptedIsland();
    this.createWaterwaysAndLakes();
    this.createCitadelCastle();
    this.createNeoYorkSkyscrapers();
    this.createTajMahalAndCanal();
    this.createEiffelTower();
    this.createTokyoTowerAndShibuya();
    this.createFushimiInariTorii();
    this.createGizaPyramids();
    this.createSeoulPalace();
    this.createVolcanoAndAlpinePeaks();
    this.createRadiatorSpringsRaceway();
    this.createHollywoodHills();
    this.createDubaiArchipelago();
    this.createSouthFlowerMeadowAndPier();
    this.createRailwayCircuit();
    this.createOceanFlourishes();
    this.createModernLandmarkBadges();
    this.createBirds();
    this.createPlayerMarker();
    this.createSelectionRing();
  }

  // ---------------------------------------------------------------------------
  // Revamped Tropical Ocean (NO checkered plaid! Gorgeous gradient & turquoise reef)
  // ---------------------------------------------------------------------------
  private createRevampedOcean() {
    // 1. Deep Ocean Floor
    const oceanGeo = new THREE.PlaneGeometry(1800, 1800);
    const oceanMat = new THREE.MeshLambertMaterial({ color: 0x14466c });
    const oceanFloor = new THREE.Mesh(oceanGeo, oceanMat);
    oceanFloor.rotation.x = -Math.PI / 2;
    oceanFloor.position.y = -2.0;
    this.scene.add(oceanFloor);

    // 2. Turquoise Shallow Coral Reef Shelf (Glowing crystal cyan water around island)
    const shelfGeo = new THREE.RingGeometry(175, 295, 72);
    const shelfMat = new THREE.MeshLambertMaterial({
      color: 0x22d3ee,
      transparent: true,
      opacity: 0.62,
      side: THREE.DoubleSide
    });
    this.waterShelfMesh = new THREE.Mesh(shelfGeo, shelfMat);
    this.waterShelfMesh.rotation.x = -Math.PI / 2;
    this.waterShelfMesh.position.y = 0.15;
    this.scene.add(this.waterShelfMesh);

    // 3. Animated Surf Foam Wave Rings
    for (let r = 185; r <= 270; r += 28) {
      const ringGeo = new THREE.RingGeometry(r, r + 2.2, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.35,
        side: THREE.DoubleSide
      });
      const waveRing = new THREE.Mesh(ringGeo, ringMat);
      waveRing.rotation.x = -Math.PI / 2;
      waveRing.position.y = 0.22;
      this.scene.add(waveRing);
      this.animatedWaveRings.push(waveRing);
    }

    // 4. Moving Ocean Water Surface with Wave Mesh Vertices
    const waterSize = 640;
    const waterSegments = 54;
    this.waterGeoPlane = new THREE.PlaneGeometry(waterSize, waterSize, waterSegments, waterSegments);
    this.waterGeoPlane.rotateX(-Math.PI / 2);

    // Cache original vertex positions for rapid sinusoidal displacement
    const posAttr = this.waterGeoPlane.attributes.position;
    this.waterOriginalPositions = new Float32Array(posAttr.array);

    const waterMat = new THREE.MeshLambertMaterial({
      color: 0x1a6699,
      transparent: true,
      opacity: 0.84
    });
    this.waterSurfaceMesh = new THREE.Mesh(this.waterGeoPlane, waterMat);
    this.waterSurfaceMesh.position.y = 0.35;
    this.scene.add(this.waterSurfaceMesh);
  }

  // ---------------------------------------------------------------------------
  // Sculpted Island Mesh with Exact Biome Palette Matching Reference
  // ---------------------------------------------------------------------------
  private createSculptedIsland() {
    const size = 480;
    const segments = 120;
    const geo = new THREE.PlaneGeometry(size, size, segments, segments);
    geo.rotateX(-Math.PI / 2);

    const posAttr = geo.attributes.position;
    const count = posAttr.count;
    const colors = new Float32Array(count * 3);
    const tempColor = new THREE.Color();

    // Palette Colors matching user's reference image
    const colorDeepOcean = new THREE.Color(0x195782);
    const colorTurquoise = new THREE.Color(0x22d3ee);
    const colorWhiteFoam = new THREE.Color(0xffffff);
    const colorGoldenBeach = new THREE.Color(0xe9cf87);
    const colorGrassLush = new THREE.Color(0x56b834);
    const colorGrassDark = new THREE.Color(0x3e8a22);
    const colorPinkFlowers = new THREE.Color(0xf472b6); // South pink flower meadow
    const colorDesertSand = new THREE.Color(0xd97706); // West Giza & East McQueen desert
    const colorDarkRock = new THREE.Color(0x475569);
    const colorSnowPeak = new THREE.Color(0xf8fafc);
    const colorWaterCanal = new THREE.Color(0x38bdf8);
    const colorCityPavement = new THREE.Color(0x64748b);

    for (let i = 0; i < count; i++) {
      const x = posAttr.getX(i);
      const z = posAttr.getZ(i);

      const angle = Math.atan2(z, x);
      const dist = Math.hypot(x, z);

      // Boundary calculation matching the reference island shape
      let boundary = 188;
      boundary += Math.sin(angle * 3) * 14;
      boundary += Math.cos(angle * 5) * 8;
      // Protrusion for Dubai Palm in east
      if (x > 110 && z > -30 && z < 110) {
        boundary += 40 * Math.sin(((z + 30) / 140) * Math.PI);
      }
      // Southern protrusion for the pink flower garden
      if (Math.abs(x - (-25)) < 45 && z > 110) {
        boundary += 25 * Math.sin(((x + 70) / 90) * Math.PI);
      }

      let y = 0;

      if (dist > boundary + 12) {
        // Ocean floor
        y = -8;
        tempColor.copy(colorDeepOcean);
      } else if (dist > boundary) {
        // Turquoise surf foam line
        const t = (dist - boundary) / 12;
        y = THREE.MathUtils.lerp(0.2, -3.0, t);
        if (t < 0.3) tempColor.copy(colorWhiteFoam);
        else tempColor.lerpColors(colorTurquoise, colorDeepOcean, t);
      } else if (dist > boundary - 14) {
        // Golden Sandy Beach Ring
        const t = (boundary - dist) / 14;
        y = THREE.MathUtils.lerp(0.3, 2.0, t);
        tempColor.copy(colorGoldenBeach);
      } else {
        // Interior island body
        const innerRatio = 1 - dist / boundary;

        // 1. North Volcano & Alpine Mountain Elevations
        const northMtnDist = Math.hypot(x - 30, z - (-125));
        const northPeak = Math.max(0, 1 - northMtnDist / 70);
        let northElev = Math.pow(northPeak, 1.6) * 36;

        // 2. West Desert Plateau (Giza)
        const westDesertDist = Math.hypot(x - (-135), z - 30);
        const westDesert = Math.max(0, 1 - westDesertDist / 65);
        let westElev = Math.pow(westDesert, 1.4) * 8;

        // 3. East McQueen Desert Ridge
        const eastDesertDist = Math.hypot(x - 135, z - (-25));
        const eastDesert = Math.max(0, 1 - eastDesertDist / 60);
        let eastElev = Math.pow(eastDesert, 1.4) * 8;

        // 4. Northwest Tokyo/Seoul gentle hill
        const nwHillDist = Math.hypot(x - (-90), z - (-80));
        const nwHill = Math.max(0, 1 - nwHillDist / 55);
        let nwElev = Math.pow(nwHill, 1.5) * 12;

        let baseHeight = 2.2 + innerRatio * 3.5;
        y = baseHeight + northElev + westElev + eastElev + nwElev;

        // Carve Yamuna canal & central lake
        const isCanal = Math.abs(x - 70) < 6 && z > -130 && z < -40;
        const isCenterLake = Math.hypot(x - 10, z - (-25)) < 16;
        if (isCanal || isCenterLake) {
          y = Math.max(0.4, y - 6.5);
        }

        // Biome vertex coloring
        if (isCanal || isCenterLake) {
          tempColor.copy(colorWaterCanal);
        } else if (x > -50 && x < 0 && z > 115) {
          // South Pink Sakura Flower Meadow (Matching user reference image!)
          tempColor.copy(colorPinkFlowers);
        } else if (x > 50 && z < -20 && z > -110 && northElev < 15) {
          // East desert around McQueen / Hollywood
          tempColor.copy(colorDesertSand);
        } else if (x < -80 && z > 0) {
          // West Giza desert
          tempColor.copy(colorDesertSand);
        } else if (northElev > 20) {
          // Alpine snow and dark rock
          if (y > 24) tempColor.copy(colorSnowPeak);
          else tempColor.copy(colorDarkRock);
        } else if (x > 50 && x < 130 && z > -20 && z < 50) {
          // Neo York City urban base
          tempColor.copy(colorCityPavement);
        } else {
          // Lush Green Mainland
          tempColor.lerpColors(colorGrassLush, colorGrassDark, innerRatio);
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
  private createWaterwaysAndLakes() {
    // Yamuna Canal Water Plane
    const canalGeo = new THREE.PlaneGeometry(10, 85);
    const waterMat = new THREE.MeshLambertMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.9
    });
    const canal = new THREE.Mesh(canalGeo, waterMat);
    canal.rotation.x = -Math.PI / 2;
    canal.position.set(70, 0.6, -85);
    this.scene.add(canal);

    // Center lake
    const lakeGeo = new THREE.CircleGeometry(16, 24);
    const lake = new THREE.Mesh(lakeGeo, waterMat);
    lake.rotation.x = -Math.PI / 2;
    lake.position.set(10, 0.6, -25);
    this.scene.add(lake);
  }

  // ---------------------------------------------------------------------------
  // 3. Modeled 3D Landmarks (Matching User Reference Image)
  // ---------------------------------------------------------------------------

  // Central Citadel Castle (Keep + 4 Corner Towers with Blue Conical Roofs & 4 Bridges)
  private createCitadelCastle() {
    const castleGroup = new THREE.Group();
    castleGroup.position.set(0, 3.8, 0);

    const stoneMat = new THREE.MeshLambertMaterial({ color: 0x94a3b8 });
    const blueRoofMat = new THREE.MeshLambertMaterial({ color: 0x0284c7 });
    const woodMat = new THREE.MeshLambertMaterial({ color: 0x78350f });

    // Central Citadel Keep
    const keepGeo = new THREE.BoxGeometry(18, 12, 18);
    const keep = new THREE.Mesh(keepGeo, stoneMat);
    keep.position.y = 6;
    castleGroup.add(keep);

    // Center Big Blue Roof
    const centerRoofGeo = new THREE.ConeGeometry(12, 10, 4);
    const centerRoof = new THREE.Mesh(centerRoofGeo, blueRoofMat);
    centerRoof.rotation.y = Math.PI / 4;
    centerRoof.position.y = 17;
    castleGroup.add(centerRoof);

    // 4 Corner Cylindrical Towers with Blue Conical Roofs
    const towerOffsets = [[-9, -9], [9, -9], [9, 9], [-9, 9]];
    towerOffsets.forEach(([tx, tz]) => {
      const towerGeo = new THREE.CylinderGeometry(3.2, 3.5, 16, 12);
      const tower = new THREE.Mesh(towerGeo, stoneMat);
      tower.position.set(tx, 8, tz);
      castleGroup.add(tower);

      const roofGeo = new THREE.ConeGeometry(4.2, 7, 12);
      const roof = new THREE.Mesh(roofGeo, blueRoofMat);
      roof.position.set(tx, 19.5, tz);
      castleGroup.add(roof);
    });

    // 4 Stone Drawbridges extending out over the moat
    const bridgeGeo = new THREE.BoxGeometry(7, 0.8, 14);
    const bridgeN = new THREE.Mesh(bridgeGeo, woodMat);
    bridgeN.position.set(0, 0.4, -16);
    castleGroup.add(bridgeN);

    const bridgeS = new THREE.Mesh(bridgeGeo, woodMat);
    bridgeS.position.set(0, 0.4, 16);
    castleGroup.add(bridgeS);

    const bridgeGeoE = new THREE.BoxGeometry(14, 0.8, 7);
    const bridgeE = new THREE.Mesh(bridgeGeoE, woodMat);
    bridgeE.position.set(16, 0.4, 0);
    castleGroup.add(bridgeE);

    const bridgeW = new THREE.Mesh(bridgeGeoE, woodMat);
    bridgeW.position.set(-16, 0.4, 0);
    castleGroup.add(bridgeW);

    this.scene.add(castleGroup);
  }

  // Neo York Metropolis: Dense cluster of modern glass & quartz skyscrapers (Center-East)
  private createNeoYorkSkyscrapers() {
    const nyGroup = new THREE.Group();
    nyGroup.position.set(90, 4.0, 10);

    const bldDefs = [
      { x: 0, z: 0, w: 9, d: 9, h: 38, col: 0x93c5fd },
      { x: 11, z: 2, w: 8, d: 8, h: 32, col: 0x60a5fa },
      { x: -10, z: 4, w: 7, d: 8, h: 26, col: 0x38bdf8 },
      { x: -3, z: 12, w: 9, d: 8, h: 24, col: 0x94a3b8 },
      { x: 9, z: 13, w: 8, d: 7, h: 28, col: 0x0284c7 },
      { x: 18, z: -3, w: 7, d: 7, h: 22, col: 0x64748b },
      { x: -8, z: -10, w: 8, d: 8, h: 30, col: 0x3b82f6 },
      { x: 4, z: -11, w: 7, d: 7, h: 34, col: 0x0ea5e9 },
      { x: 14, z: -12, w: 6, d: 6, h: 20, col: 0x93c5fd },
      { x: -17, z: -2, w: 6, d: 7, h: 18, col: 0x475569 },
      { x: 2, z: 21, w: 8, d: 8, h: 20, col: 0x0284c7 },
      { x: -10, z: 18, w: 6, d: 6, h: 16, col: 0x64748b },
      { x: 16, z: 19, w: 7, d: 6, h: 18, col: 0x38bdf8 }
    ];

    bldDefs.forEach(b => {
      const bGeo = new THREE.BoxGeometry(b.w, b.h, b.d);
      const bMat = new THREE.MeshLambertMaterial({
        color: b.col
      });
      const bMesh = new THREE.Mesh(bGeo, bMat);
      bMesh.position.set(b.x, b.h / 2, b.z);
      nyGroup.add(bMesh);

      // Lit Spire antenna on highest tower
      if (b.h >= 34) {
        const spireGeo = new THREE.CylinderGeometry(0.3, 0.6, 9, 6);
        const spireMat = new THREE.MeshBasicMaterial({ color: 0xfacc15 });
        const spire = new THREE.Mesh(spireGeo, spireMat);
        spire.position.set(b.x, b.h + 4.5, b.z);
        nyGroup.add(spire);
      }
    });

    this.scene.add(nyGroup);
  }

  // Taj Mahal: White marble dome, 4 minarets & Yamuna canal (North-Central)
  private createTajMahalAndCanal() {
    const tajGroup = new THREE.Group();
    tajGroup.position.set(70, 4.0, -135);

    const marbleMat = new THREE.MeshLambertMaterial({ color: 0xffffff });
    const goldMat = new THREE.MeshLambertMaterial({ color: 0xfacc15 });

    // Main Square Marble Base
    const baseGeo = new THREE.BoxGeometry(22, 10, 22);
    const base = new THREE.Mesh(baseGeo, marbleMat);
    base.position.y = 5;
    tajGroup.add(base);

    // Central Onion Dome
    const domeGeo = new THREE.SphereGeometry(7, 16, 12);
    const dome = new THREE.Mesh(domeGeo, marbleMat);
    dome.position.y = 15;
    dome.scale.set(1, 1.25, 1);
    tajGroup.add(dome);

    // Golden Finial
    const finialGeo = new THREE.ConeGeometry(0.8, 3.5, 6);
    const finial = new THREE.Mesh(finialGeo, goldMat);
    finial.position.y = 24.5;
    tajGroup.add(finial);

    // 4 Corner Minarets
    const minOffsets = [[-11, -11], [11, -11], [11, 11], [-11, 11]];
    minOffsets.forEach(([mx, mz]) => {
      const minGeo = new THREE.CylinderGeometry(1.2, 1.5, 20, 8);
      const min = new THREE.Mesh(minGeo, marbleMat);
      min.position.set(mx, 10, mz);
      tajGroup.add(min);

      const topGeo = new THREE.SphereGeometry(1.4, 8, 8);
      const top = new THREE.Mesh(topGeo, marbleMat);
      top.position.set(mx, 20.5, mz);
      tajGroup.add(top);
    });

    this.scene.add(tajGroup);
  }

  // Eiffel Tower (Golden/Metallic lattice spire standing in north garden)
  private createEiffelTower() {
    const eiffelGroup = new THREE.Group();
    eiffelGroup.position.set(24, 4.0, -42);

    const ironMat = new THREE.MeshLambertMaterial({ color: 0x785535 });

    // Tier 1 Base Arches
    const bGeo = new THREE.CylinderGeometry(5, 8, 8, 4);
    const bMesh = new THREE.Mesh(bGeo, ironMat);
    bMesh.rotation.y = Math.PI / 4;
    bMesh.position.y = 4;
    eiffelGroup.add(bMesh);

    // Tier 2 Middle Deck
    const mGeo = new THREE.CylinderGeometry(2.5, 4.5, 9, 4);
    const mMesh = new THREE.Mesh(mGeo, ironMat);
    mMesh.rotation.y = Math.PI / 4;
    mMesh.position.y = 12.5;
    eiffelGroup.add(mMesh);

    // Tier 3 Spire
    const sGeo = new THREE.ConeGeometry(2.2, 16, 4);
    const sMesh = new THREE.Mesh(sGeo, ironMat);
    sMesh.rotation.y = Math.PI / 4;
    sMesh.position.y = 25;
    eiffelGroup.add(sMesh);

    this.scene.add(eiffelGroup);
  }

  // Tokyo Tower & Shibuya Skyline (West-Northwest)
  private createTokyoTowerAndShibuya() {
    const tokyoGroup = new THREE.Group();
    tokyoGroup.position.set(-155, 3.8, -75);

    // Iconic Red and White Tokyo Tower Lattice Spire
    const redMat = new THREE.MeshLambertMaterial({ color: 0xef4444 });
    const whiteMat = new THREE.MeshLambertMaterial({ color: 0xffffff });

    const baseGeo = new THREE.CylinderGeometry(4, 7, 10, 4);
    const base = new THREE.Mesh(baseGeo, redMat);
    base.rotation.y = Math.PI / 4;
    base.position.y = 5;
    tokyoGroup.add(base);

    const midGeo = new THREE.CylinderGeometry(2.2, 3.6, 9, 4);
    const mid = new THREE.Mesh(midGeo, whiteMat);
    mid.rotation.y = Math.PI / 4;
    mid.position.y = 14.5;
    tokyoGroup.add(mid);

    const spireGeo = new THREE.ConeGeometry(1.8, 18, 4);
    const spire = new THREE.Mesh(spireGeo, redMat);
    spire.rotation.y = Math.PI / 4;
    spire.position.y = 28;
    tokyoGroup.add(spire);

    // Shibuya Commercial Towers
    const shibuyaBlds = [
      { x: 14, z: -5, w: 8, h: 20, col: 0x3b82f6 },
      { x: 12, z: 8, w: 7, h: 16, col: 0x10b981 },
      { x: -10, z: 12, w: 7, h: 15, col: 0xf43f5e }
    ];
    shibuyaBlds.forEach(b => {
      const bg = new THREE.BoxGeometry(b.w, b.h, b.w);
      const bm = new THREE.MeshLambertMaterial({ color: b.col });
      const m = new THREE.Mesh(bg, bm);
      m.position.set(b.x, b.h / 2, b.z);
      tokyoGroup.add(m);
    });

    this.scene.add(tokyoGroup);
  }

  // Fushimi Inari Vermilion Torii Gate Corridor (West)
  private createFushimiInariTorii() {
    const inariGroup = new THREE.Group();
    inariGroup.position.set(-185, 3.5, -20);

    const toriiMat = new THREE.MeshLambertMaterial({ color: 0xdc2626 });
    const blackMat = new THREE.MeshLambertMaterial({ color: 0x18181b });

    for (let t = 0; t < 7; t++) {
      const gate = new THREE.Group();
      gate.position.set(0, 0, t * 5.5);

      // 2 Vermilion Pillars
      const pGeo = new THREE.CylinderGeometry(0.35, 0.35, 6, 6);
      const pL = new THREE.Mesh(pGeo, toriiMat);
      pL.position.set(-2.5, 3, 0);
      const pR = new THREE.Mesh(pGeo, toriiMat);
      pR.position.set(2.5, 3, 0);
      gate.add(pL);
      gate.add(pR);

      // Top lintel
      const lintelGeo = new THREE.BoxGeometry(7.5, 0.7, 0.7);
      const lintel = new THREE.Mesh(lintelGeo, toriiMat);
      lintel.position.set(0, 5.8, 0);
      gate.add(lintel);

      const capGeo = new THREE.BoxGeometry(8, 0.35, 0.85);
      const cap = new THREE.Mesh(capGeo, blackMat);
      cap.position.set(0, 6.3, 0);
      gate.add(cap);

      inariGroup.add(gate);
    }

    this.scene.add(inariGroup);
  }

  // Giza Pyramids & Sphinx (West Desert)
  private createGizaPyramids() {
    const gizaGroup = new THREE.Group();
    gizaGroup.position.set(-150, 4.0, 36);

    const sandStoneMat = new THREE.MeshLambertMaterial({
      color: 0xfacc15,
      flatShading: true
    });

    // Khufu (Great Pyramid)
    const pyr1Geo = new THREE.ConeGeometry(18, 16, 4);
    const pyr1 = new THREE.Mesh(pyr1Geo, sandStoneMat);
    pyr1.rotation.y = Math.PI / 4;
    pyr1.position.set(0, 8, 0);
    gizaGroup.add(pyr1);

    // Khafre
    const pyr2Geo = new THREE.ConeGeometry(14, 13, 4);
    const pyr2 = new THREE.Mesh(pyr2Geo, sandStoneMat);
    pyr2.rotation.y = Math.PI / 4;
    pyr2.position.set(16, 6.5, 12);
    gizaGroup.add(pyr2);

    // Menkaure
    const pyr3Geo = new THREE.ConeGeometry(9, 8, 4);
    const pyr3 = new THREE.Mesh(pyr3Geo, sandStoneMat);
    pyr3.rotation.y = Math.PI / 4;
    pyr3.position.set(28, 4, 22);
    gizaGroup.add(pyr3);

    this.scene.add(gizaGroup);
  }

  // Seoul Royal Palace Gate (Gwanghwamun - Northwest)
  private createSeoulPalace() {
    const seoulGroup = new THREE.Group();
    seoulGroup.position.set(-65, 3.8, -95);

    const stoneMat = new THREE.MeshLambertMaterial({ color: 0x94a3b8 });
    const redMat = new THREE.MeshLambertMaterial({ color: 0x991b1b });
    const roofMat = new THREE.MeshLambertMaterial({ color: 0x1e293b });

    // Stone Triple-Portal Base
    const baseGeo = new THREE.BoxGeometry(22, 6, 8);
    const base = new THREE.Mesh(baseGeo, stoneMat);
    base.position.y = 3;
    seoulGroup.add(base);

    // Arched center portal
    const portalGeo = new THREE.CylinderGeometry(2, 2, 8.2, 12, 1, false, 0, Math.PI);
    const portalMat = new THREE.MeshBasicMaterial({ color: 0x090d16 });
    const portal = new THREE.Mesh(portalGeo, portalMat);
    portal.rotation.x = Math.PI / 2;
    portal.position.set(0, 2, 0);
    seoulGroup.add(portal);

    // Upper Timber Pavilion
    const pavGeo = new THREE.BoxGeometry(18, 4, 7);
    const pav = new THREE.Mesh(pavGeo, redMat);
    pav.position.y = 8;
    seoulGroup.add(pav);

    // Curved Traditional Palace Roof
    const rGeo = new THREE.ConeGeometry(15, 4.5, 4);
    const roof = new THREE.Mesh(rGeo, roofMat);
    roof.rotation.y = Math.PI / 4;
    roof.position.y = 12.5;
    seoulGroup.add(roof);

    this.scene.add(seoulGroup);
  }

  // Volcano & Alpine Snow Peaks (North)
  private createVolcanoAndAlpinePeaks() {
    // 1. Smoking Volcanic Cone
    const volcanoGroup = new THREE.Group();
    volcanoGroup.position.set(16, 12, -145);

    const basaltMat = new THREE.MeshLambertMaterial({
      color: 0x1e293b,
      flatShading: true
    });
    const coneGeo = new THREE.ConeGeometry(24, 26, 8);
    const cone = new THREE.Mesh(coneGeo, basaltMat);
    cone.position.y = 13;
    volcanoGroup.add(cone);

    // Glowing Magma Caldera
    const magmaGeo = new THREE.CircleGeometry(6, 12);
    const magmaMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
    const magma = new THREE.Mesh(magmaGeo, magmaMat);
    magma.rotation.x = -Math.PI / 2;
    magma.position.y = 25.8;
    volcanoGroup.add(magma);

    // Smoke Puffs rising from volcano
    for (let s = 0; s < 5; s++) {
      const puffGeo = new THREE.DodecahedronGeometry(2.0 + s * 0.7, 1);
      const puffMat = new THREE.MeshLambertMaterial({
        color: 0xcbd5e1,
        transparent: true,
        opacity: 0.65 - s * 0.1
      });
      const puff = new THREE.Mesh(puffGeo, puffMat);
      puff.position.set(0, 28 + s * 4.5, 0);
      volcanoGroup.add(puff);
      this.volcanoSmokePuffs.push({ mesh: puff, seed: s });
    }

    this.scene.add(volcanoGroup);

    // 2. Alpine Snow Mountain Peaks
    const alpinePeaks = [
      { x: -15, y: 14, z: -125, r: 18, h: 26 },
      { x: -35, y: 12, z: -115, r: 16, h: 22 },
      { x: 45, y: 14, z: -130, r: 19, h: 25 }
    ];
    alpinePeaks.forEach(p => {
      const mGeo = new THREE.ConeGeometry(p.r, p.h, 7);
      const mMat = new THREE.MeshLambertMaterial({ color: 0x475569, flatShading: true });
      const m = new THREE.Mesh(mGeo, mMat);
      m.position.set(p.x, p.y + p.h / 2, p.z);
      this.scene.add(m);

      const snowGeo = new THREE.ConeGeometry(p.r * 0.45, p.h * 0.45, 7);
      const snowMat = new THREE.MeshLambertMaterial({ color: 0xffffff, flatShading: true });
      const s = new THREE.Mesh(snowGeo, snowMat);
      s.position.set(p.x, p.y + p.h * 0.78, p.z);
      this.scene.add(s);
    });
  }

  // Radiator Springs Raceway & Lightning McQueen Loop (East)
  private createRadiatorSpringsRaceway() {
    const raceGroup = new THREE.Group();
    raceGroup.position.set(190, 3.8, -25);

    // Asphalt Track Ring
    const trackGeo = new THREE.TorusGeometry(20, 4, 8, 32);
    const trackMat = new THREE.MeshLambertMaterial({ color: 0x1e293b });
    const track = new THREE.Mesh(trackGeo, trackMat);
    track.rotation.x = Math.PI / 2;
    raceGroup.add(track);

    // Red & White Rumble Curbs
    const curbGeo = new THREE.TorusGeometry(24, 0.8, 6, 32);
    const curbMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
    const curb = new THREE.Mesh(curbGeo, curbMat);
    curb.rotation.x = Math.PI / 2;
    raceGroup.add(curb);

    // Willy's Butte Red Mesa in Track Center
    const mesaGeo = new THREE.CylinderGeometry(7, 11, 10, 8);
    const mesaMat = new THREE.MeshLambertMaterial({ color: 0xb45309, flatShading: true });
    const mesa = new THREE.Mesh(mesaGeo, mesaMat);
    mesa.position.y = 5;
    raceGroup.add(mesa);

    // 3D Miniature Red #95 Car
    const carGroup = new THREE.Group();
    carGroup.position.set(16, 2.2, -6);
    const carGeo = new THREE.BoxGeometry(4.5, 1.8, 2.5);
    const carMat = new THREE.MeshLambertMaterial({ color: 0xdc2626 });
    const car = new THREE.Mesh(carGeo, carMat);
    carGroup.add(car);
    raceGroup.add(carGroup);

    this.scene.add(raceGroup);
  }

  // Hollywood Hills & HOLLYWOOD Sign (East)
  private createHollywoodHills() {
    const hwGroup = new THREE.Group();
    hwGroup.position.set(165, 8.0, -100);

    // Desert Hill Ridge
    const ridgeGeo = new THREE.CylinderGeometry(14, 22, 12, 8);
    const ridgeMat = new THREE.MeshLambertMaterial({ color: 0xd97706, flatShading: true });
    const ridge = new THREE.Mesh(ridgeGeo, ridgeMat);
    ridge.position.y = 6;
    hwGroup.add(ridge);

    // White Block-Built HOLLYWOOD Letters
    const letters = 'HOLLYWOOD';
    const signMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    for (let idx = 0; idx < letters.length; idx++) {
      const letterGeo = new THREE.BoxGeometry(1.6, 3.2, 0.6);
      const letterMesh = new THREE.Mesh(letterGeo, signMat);
      letterMesh.position.set((idx - 4) * 2.4, 13.5, 9);
      hwGroup.add(letterMesh);
    }

    this.scene.add(hwGroup);
  }

  // Dubai Archipelago: Palm Jumeirah, Burj Al Arab & Ain Dubai Wheel (Southeast)
  private createDubaiArchipelago() {
    // 1. Palm Jumeirah in Lagoon (East Coast)
    const palmGroup = new THREE.Group();
    palmGroup.position.set(220, 0.6, 46);

    const sandMat = new THREE.MeshLambertMaterial({ color: 0xe9cf87 });
    const greenMat = new THREE.MeshLambertMaterial({ color: 0x16a34a });

    // Trunk
    const trunkGeo = new THREE.BoxGeometry(48, 1.2, 6);
    const trunk = new THREE.Mesh(trunkGeo, sandMat);
    palmGroup.add(trunk);

    const trunkGarden = new THREE.Mesh(new THREE.BoxGeometry(44, 1.3, 2.2), greenMat);
    palmGroup.add(trunkGarden);

    // Curved Fronds
    for (let f = -3; f <= 3; f++) {
      if (f === 0) continue;
      const frondGeo = new THREE.BoxGeometry(22, 1.0, 3.2);
      const frond = new THREE.Mesh(frondGeo, sandMat);
      frond.position.set(f * 5, 0, f * 6);
      frond.rotation.y = f * 0.12;
      palmGroup.add(frond);
    }

    // Outer Crescent Breakwater
    const crescentGeo = new THREE.RingGeometry(42, 48, 32, 1, -Math.PI * 0.6, Math.PI * 1.2);
    const crescent = new THREE.Mesh(crescentGeo, sandMat);
    crescent.rotation.x = -Math.PI / 2;
    crescent.position.set(16, 0.2, 0);
    palmGroup.add(crescent);

    this.scene.add(palmGroup);

    // 2. Burj Al Arab Private Island & Sail Hotel (220, 110)
    const baaGroup = new THREE.Group();
    baaGroup.position.set(220, 0.6, 110);

    const atollGeo = new THREE.CylinderGeometry(14, 18, 2.0, 12);
    const atoll = new THREE.Mesh(atollGeo, sandMat);
    baaGroup.add(atoll);

    // White Sail Silhouette
    const sailGeo = new THREE.ConeGeometry(5, 24, 3);
    const sailMat = new THREE.MeshLambertMaterial({ color: 0xffffff });
    const sail = new THREE.Mesh(sailGeo, sailMat);
    sail.rotation.y = Math.PI / 4;
    sail.position.y = 12;
    baaGroup.add(sail);

    this.scene.add(baaGroup);

    // 3. Ain Dubai Giant Observation Wheel (262, 146)
    const wheelGroup = new THREE.Group();
    wheelGroup.position.set(262, 0.6, 146);

    const bwIslandGeo = new THREE.CylinderGeometry(12, 16, 2.0, 12);
    const bwIsland = new THREE.Mesh(bwIslandGeo, sandMat);
    wheelGroup.add(bwIsland);

    // Giant Wheel Rim
    const wheelRimGroup = new THREE.Group();
    wheelRimGroup.position.y = 14;
    const rimGeo = new THREE.TorusGeometry(11, 0.7, 6, 24);
    const rimMat = new THREE.MeshLambertMaterial({ color: 0x38bdf8 });
    const rim = new THREE.Mesh(rimGeo, rimMat);
    wheelRimGroup.add(rim);

    // Spokes
    for (let s = 0; s < 4; s++) {
      const spokeGeo = new THREE.BoxGeometry(0.35, 22, 0.35);
      const spoke = new THREE.Mesh(spokeGeo, rimMat);
      spoke.rotation.z = (s / 4) * Math.PI;
      wheelRimGroup.add(spoke);
    }
    wheelGroup.add(wheelRimGroup);
    this.ferrisWheelRim = wheelRimGroup;

    this.scene.add(wheelGroup);
  }

  // South Flower Meadow & Wooden Pier Boardwalk (Matching Reference Image)
  private createSouthFlowerMeadowAndPier() {
    // Wooden Pier extending south from the pink flower garden into the ocean
    const pierGeo = new THREE.BoxGeometry(5.5, 0.8, 48);
    const pierMat = new THREE.MeshLambertMaterial({ color: 0x78350f });
    const pier = new THREE.Mesh(pierGeo, pierMat);
    pier.position.set(-25, 1.0, 135);
    this.scene.add(pier);

    // Pilings under pier
    for (let pz = 115; pz <= 155; pz += 10) {
      const pileGeo = new THREE.CylinderGeometry(0.4, 0.4, 3, 6);
      const pileL = new THREE.Mesh(pileGeo, pierMat);
      pileL.position.set(-27.5, 0, pz);
      const pileR = new THREE.Mesh(pileGeo, pierMat);
      pileR.position.set(-22.5, 0, pz);
      this.scene.add(pileL);
      this.scene.add(pileR);
    }
  }

  // Island Express Railway Loop
  private createRailwayCircuit() {
    const railPoints = [
      new THREE.Vector3(58, 2.8, 33),
      new THREE.Vector3(92, 2.8, 33),
      new THREE.Vector3(116, 2.8, 28),
      new THREE.Vector3(144, 2.6, 50),
      new THREE.Vector3(174, 2.5, 78),
      new THREE.Vector3(112, 2.5, 98),
      new THREE.Vector3(24, 2.5, 88),
      new THREE.Vector3(8, 2.6, 22),
      new THREE.Vector3(58, 2.8, 33)
    ];

    const railCurve = new THREE.CatmullRomCurve3(railPoints);
    const railGeo = new THREE.TubeGeometry(railCurve, 36, 0.7, 6, true);
    const railMat = new THREE.MeshLambertMaterial({ color: 0xfbbf24 });
    const railMesh = new THREE.Mesh(railGeo, railMat);
    this.scene.add(railMesh);
  }

  // Ocean Flourishes: Sailing Caravel Ship & Sea Serpent (Matching Reference Image)
  private createOceanFlourishes() {
    // 1. Sailing Caravel Ship in South Ocean (-80, 190)
    const shipGroup = new THREE.Group();
    shipGroup.position.set(-75, 0.4, 185);
    shipGroup.rotation.y = 0.5;

    // Wooden Hull
    const hullGeo = new THREE.BoxGeometry(14, 3.5, 6);
    const hullMat = new THREE.MeshLambertMaterial({ color: 0x78350f });
    const hull = new THREE.Mesh(hullGeo, hullMat);
    shipGroup.add(hull);

    // Billowing White Canvas Sails
    const sailMat = new THREE.MeshLambertMaterial({ color: 0xf8fafc, side: THREE.DoubleSide });
    const mast1 = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 14, 6), hullMat);
    mast1.position.set(-2, 7, 0);
    shipGroup.add(mast1);

    const sail1 = new THREE.Mesh(new THREE.PlaneGeometry(8, 9), sailMat);
    sail1.position.set(-2, 7, 0);
    shipGroup.add(sail1);

    this.scene.add(shipGroup);

    // 2. Emerald Sea Serpent Coils in South Ocean (20, 205)
    const serpentGroup = new THREE.Group();
    serpentGroup.position.set(20, 0.2, 205);

    const serpentMat = new THREE.MeshLambertMaterial({ color: 0x059669 });
    for (let c = -1; c <= 1; c++) {
      const coilGeo = new THREE.TorusGeometry(3.5, 1.2, 6, 12, Math.PI);
      const coil = new THREE.Mesh(coilGeo, serpentMat);
      coil.position.set(c * 6, 0, 0);
      coil.rotation.z = -Math.PI;
      serpentGroup.add(coil);
    }
    this.scene.add(serpentGroup);
  }

  // ---------------------------------------------------------------------------
  // 4. Revamped Modern Sleek Floating Game Badges (NO clunky speech bubbles!)
  // ---------------------------------------------------------------------------
  private createModernLandmarkBadges() {
    // High-priority landmarks that are always prominently shown (matching user's reference)
    const primaryLandmarkNames = new Set([
      'Crossroads Citadel (Spawn)',
      'Imperial India · Taj Mahal',
      'Eiffel Tower · Paris',
      'Neo York Tech Metropolis',
      'Lightning McQueen Street · Radiator Springs Raceway',
      'Tokyo · Tokyo Tower Lattice Spire',
      'Kyoto · Fushimi Inari Shrine & Torii Tunnel',
      'Egypt · Giza Pyramids & Great Sphinx',
      'Seoul · Gwanghwamun Palace Gate',
      'Hollywood Hills & Sign',
      'Palm Jumeirah · Atlantis & The Royal Atlantis',
      'Burj Al Arab · 7-Star Sail & SAL Beach Club',
      'Bluewaters Island & Ain Dubai Wheel'
    ]);

    PORTFOLIO_DATA.landmarks.forEach(lm => {
      const category = this.getLandmarkCategory(lm.tag);
      const isPrimary = primaryLandmarkNames.has(lm.name);

      const markerGroup = new THREE.Group();
      markerGroup.position.set(lm.coords[0], lm.coords[1] + 2.0, lm.coords[2]);
      markerGroup.name = `badge_${lm.name}`;

      // Slender glowing anchor pin stem
      const pinStemGeo = new THREE.CylinderGeometry(0.2, 0.2, 7, 6);
      const pinStemMat = new THREE.MeshBasicMaterial({ color: 0x94a3b8 });
      const pinStem = new THREE.Mesh(pinStemGeo, pinStemMat);
      pinStem.position.y = 3.5;
      markerGroup.add(pinStem);

      // Sleek High-Resolution Canvas Badge Pill Texture
      const cleanTag = lm.tag.replace(/[\[\]]/g, '');
      const badgePillMesh = this.createSleekBadgePill(cleanTag, category, isPrimary);
      badgePillMesh.position.y = 8.0;
      markerGroup.add(badgePillMesh);

      // Hit area for hover & click
      const hitGeo = new THREE.SphereGeometry(9, 8, 8);
      const hitMat = new THREE.MeshBasicMaterial({ visible: false });
      const hitMesh = new THREE.Mesh(hitGeo, hitMat);
      hitMesh.position.y = 8.0;
      markerGroup.add(hitMesh);

      this.interactiveMeshes.push(hitMesh);
      this.landmarkMeshMap.set(hitMesh, lm);

      this.scene.add(markerGroup);
      this.markerGroups.push({ group: markerGroup, landmark: lm, category, isPrimary });
    });
  }

  // Create Modern Sleek Pill Badge (Clean typography, glassmorphism, category color dot)
  private createSleekBadgePill(label: string, category: string, isPrimary: boolean): THREE.Mesh {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 128;
    const ctx = canvas.getContext('2d')!;

    // Category Dot Colors
    let dotColor = '#facc15'; // gold default
    if (category === 'cities') dotColor = '#38bdf8';
    if (category === 'transit') dotColor = '#4ade80';
    if (category === 'nature') dotColor = '#f472b6';

    // Pill geometry dimensions on canvas
    const r = 44;
    const paddingX = 40;
    ctx.font = 'bold 36px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    const textMetrics = ctx.measureText(label);
    const pillW = Math.max(180, textMetrics.width + paddingX * 2 + 36);
    const pillH = 88;
    const pillX = (512 - pillW) / 2;
    const pillY = (128 - pillH) / 2;

    // Dark sleek glassmorphic pill background
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(pillX, pillY, pillW, pillH, r);
    ctx.fillStyle = isPrimary ? 'rgba(15, 23, 42, 0.94)' : 'rgba(15, 23, 42, 0.85)';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.55)';
    ctx.shadowBlur = 16;
    ctx.shadowOffsetY = 6;
    ctx.fill();
    ctx.shadowBlur = 0;

    // Modern slim border
    ctx.strokeStyle = isPrimary ? dotColor : 'rgba(148, 163, 184, 0.35)';
    ctx.lineWidth = isPrimary ? 4 : 2.5;
    ctx.stroke();

    // Vibrant Category Indicator Dot
    ctx.fillStyle = dotColor;
    ctx.beginPath();
    ctx.arc(pillX + 34, pillY + pillH / 2, 10, 0, Math.PI * 2);
    ctx.fill();

    // Crisp Clean Typography (No clunky serif fonts!)
    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 34px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, pillX + 56, pillY + pillH / 2 + 1);
    ctx.restore();

    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    const aspect = canvas.width / canvas.height;
    const meshW = 18 * (pillW / 512) * aspect;
    const meshH = 10 * (pillH / 128);

    const geo = new THREE.PlaneGeometry(meshW, meshH);
    const mat = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      side: THREE.DoubleSide
    });

    const mesh = new THREE.Mesh(geo, mat);
    // Align badge to face the isometric camera angle
    mesh.rotation.x = Math.PI * 0.15;
    return mesh;
  }

  // ---------------------------------------------------------------------------
  // 5. Live Player Marker
  // ---------------------------------------------------------------------------
  private createPlayerMarker() {
    this.playerMarkerGroup = new THREE.Group();
    const px = this.playerPos.x;
    const pz = this.playerPos.z;
    this.playerMarkerGroup.position.set(px, 5.0, pz);

    // Glowing cyan disc on ground
    const discGeo = new THREE.CylinderGeometry(4.2, 4.5, 0.6, 16);
    const discMat = new THREE.MeshLambertMaterial({
      color: 0x0f172a,
      emissive: 0x0284c7,
      emissiveIntensity: 0.4
    });
    const disc = new THREE.Mesh(discGeo, discMat);
    this.playerMarkerGroup.add(disc);

    // Directional Pointer Arrow (Yaw)
    const arrowGeo = new THREE.ConeGeometry(1.6, 4.2, 4);
    const arrowMat = new THREE.MeshLambertMaterial({ color: 0xef4444 });
    const arrow = new THREE.Mesh(arrowGeo, arrowMat);
    arrow.rotation.x = Math.PI / 2;
    arrow.rotation.y = -this.playerYaw;
    arrow.position.set(0, 0.5, 1.8);
    this.playerMarkerGroup.add(arrow);

    // Sleek Modern Player Badge: "YOU [LAKSHYA]"
    const playerBadge = this.createSleekBadgePill('YOU [LAKSHYA]', 'monuments', true);
    playerBadge.position.y = 8.5;
    this.playerMarkerGroup.add(playerBadge);

    this.scene.add(this.playerMarkerGroup);
  }

  private createSelectionRing() {
    const geo = new THREE.RingGeometry(6.5, 8.2, 24);
    const mat = new THREE.MeshBasicMaterial({
      color: 0xfacc15,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.95
    });
    this.selectionRing = new THREE.Mesh(geo, mat);
    this.selectionRing.rotation.x = -Math.PI / 2;
    this.selectionRing.visible = false;
    this.scene.add(this.selectionRing);
  }

  // ---------------------------------------------------------------------------
  // 5.5. Soaring 3D Birds (Flocks of Seagulls with Flapping Wings & Shadows)
  // ---------------------------------------------------------------------------
  private createBirds() {
    const birdConfigs = [
      // Flock 1: Coastal & turquoise lagoon gliders (South-East bay & beach village)
      { center: new THREE.Vector3(70, 0, 75), rx: 110, rz: 85, speed: 0.00065, alt: 36, phase: 0.0, flap: 0.012 },
      { center: new THREE.Vector3(70, 0, 75), rx: 116, rz: 90, speed: 0.00065, alt: 38, phase: 0.35, flap: 0.013 },
      { center: new THREE.Vector3(70, 0, 75), rx: 104, rz: 80, speed: 0.00065, alt: 34, phase: 0.75, flap: 0.011 },
      { center: new THREE.Vector3(70, 0, 75), rx: 122, rz: 94, speed: 0.00065, alt: 40, phase: 1.15, flap: 0.012 },
      { center: new THREE.Vector3(70, 0, 75), rx: 98, rz: 74, speed: 0.00065, alt: 35, phase: 1.55, flap: 0.014 },

      // Flock 2: Island mountain & citadel cruisers (North-West ridge & castle)
      { center: new THREE.Vector3(-25, 0, -35), rx: 95, rz: 115, speed: -0.00055, alt: 48, phase: 0.2, flap: 0.011 },
      { center: new THREE.Vector3(-25, 0, -35), rx: 102, rz: 120, speed: -0.00055, alt: 50, phase: 0.65, flap: 0.013 },
      { center: new THREE.Vector3(-25, 0, -35), rx: 88, rz: 108, speed: -0.00055, alt: 46, phase: 1.1, flap: 0.010 },
      { center: new THREE.Vector3(-25, 0, -35), rx: 108, rz: 126, speed: -0.00055, alt: 52, phase: 1.5, flap: 0.012 }
    ];

    const birdBodyMat = new THREE.MeshLambertMaterial({ color: 0xffffff });
    const birdBeakMat = new THREE.MeshLambertMaterial({ color: 0xf59e0b });
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.25
    });

    birdConfigs.forEach((cfg) => {
      const birdGroup = new THREE.Group();

      // Sleek low-poly bird body
      const bodyGeo = new THREE.ConeGeometry(0.8, 3.2, 5);
      bodyGeo.rotateX(Math.PI / 2);
      const body = new THREE.Mesh(bodyGeo, birdBodyMat);
      birdGroup.add(body);

      // Yellow beak
      const beakGeo = new THREE.ConeGeometry(0.3, 0.9, 4);
      beakGeo.rotateX(Math.PI / 2);
      const beak = new THREE.Mesh(beakGeo, birdBeakMat);
      beak.position.set(0, 0, 1.8);
      birdGroup.add(beak);

      // Left Wing with Pivot Group
      const wingL = new THREE.Group();
      wingL.position.set(-0.6, 0.2, 0.2);
      const wingLMesh = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.15, 1.2), birdBodyMat);
      wingLMesh.position.set(-1.6, 0, 0);
      wingL.add(wingLMesh);
      birdGroup.add(wingL);

      // Right Wing with Pivot Group
      const wingR = new THREE.Group();
      wingR.position.set(0.6, 0.2, 0.2);
      const wingRMesh = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.15, 1.2), birdBodyMat);
      wingRMesh.position.set(1.6, 0, 0);
      wingR.add(wingRMesh);
      birdGroup.add(wingR);

      // Soft ground drop shadow underneath bird
      const shadowGeo = new THREE.CircleGeometry(2.0, 8);
      const shadow = new THREE.Mesh(shadowGeo, shadowMat);
      shadow.rotation.x = -Math.PI / 2;
      this.scene.add(shadow);

      this.scene.add(birdGroup);

      this.birds.push({
        group: birdGroup,
        wingL,
        wingR,
        shadow,
        center: cfg.center,
        radiusX: cfg.rx,
        radiusZ: cfg.rz,
        speed: cfg.speed,
        altitude: cfg.alt,
        phase: cfg.phase,
        flapSpeed: cfg.flap
      });
    });
  }

  // ---------------------------------------------------------------------------
  // 6. Navigation Controls & Hover / Teleport Interactions
  // ---------------------------------------------------------------------------
  private attachControls() {
    const onResize = () => {
      if (this.isDisposed) return;
      const width = this.container.clientWidth || window.innerWidth;
      const height = this.container.clientHeight || window.innerHeight;
      const aspect = width / height;

      const hHalf = this.baseFrustumSize / 2;
      const wHalf = hHalf * aspect;
      this.camera.left = -wHalf;
      this.camera.right = wHalf;
      this.camera.top = hHalf;
      this.camera.bottom = -hHalf;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(width, height);
    };
    window.addEventListener('resize', onResize);

    // Mouse / Touch Drag to Pan
    this.canvas.addEventListener('pointerdown', (e) => {
      this.isPointerDown = true;
      this.hasDragged = false;
      this.dragStartX = e.clientX;
      this.dragStartY = e.clientY;
    });

    this.canvas.addEventListener('pointermove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (this.isPointerDown) {
        const dx = e.clientX - this.dragStartX;
        const dy = e.clientY - this.dragStartY;
        if (Math.hypot(dx, dy) > 4) {
          this.hasDragged = true;

          const panSpeed = (this.baseFrustumSize / rect.height / this.currentZoom) * 0.9;
          const moveX = (-dx + dy) * 0.707 * panSpeed;
          const moveZ = (-dx - dy) * 0.707 * panSpeed;

          this.cameraTarget.x += moveX;
          this.cameraTarget.z += moveZ;

          this.cameraTarget.x = Math.max(-260, Math.min(260, this.cameraTarget.x));
          this.cameraTarget.z = Math.max(-260, Math.min(260, this.cameraTarget.z));

          this.updateCameraPosition();
          this.dragStartX = e.clientX;
          this.dragStartY = e.clientY;
        }
      } else {
        this.checkHover();
      }
    });

    window.addEventListener('pointerup', (e) => {
      if (this.isPointerDown && !this.hasDragged) {
        this.handleClick(e);
      }
      this.isPointerDown = false;
    });

    // Zoom via Wheel
    this.canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 1.15 : 0.87;
      this.setZoom(this.currentZoom * zoomFactor);
    }, { passive: false });

    // Touch Pinch
    this.canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length === 2) {
        this.touchStartDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
      }
    }, { passive: true });

    this.canvas.addEventListener('touchmove', (e) => {
      if (e.touches.length === 2 && this.touchStartDist > 0) {
        const dist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const factor = dist / this.touchStartDist;
        this.setZoom(this.currentZoom * factor);
        this.touchStartDist = dist;
      }
    }, { passive: true });

    // Toolbar Buttons
    document.getElementById('btn-map-zoom-in')?.addEventListener('click', () => {
      this.setZoom(this.currentZoom * 1.25);
      sound.playClick();
    });

    document.getElementById('btn-map-zoom-out')?.addEventListener('click', () => {
      this.setZoom(this.currentZoom * 0.8);
      sound.playClick();
    });

    document.getElementById('btn-map-reset')?.addEventListener('click', () => {
      this.cameraTarget.set(0, 4, 0);
      this.setZoom(1.0);
      sound.playClick();
    });

    document.getElementById('btn-map-locate-player')?.addEventListener('click', () => {
      this.cameraTarget.set(this.playerPos.x, 4, this.playerPos.z);
      this.setZoom(Math.max(1.4, this.currentZoom));
      sound.playClick();
    });
  }

  public setZoom(zoom: number) {
    this.currentZoom = Math.max(0.65, Math.min(3.2, zoom));
    this.updateCameraPosition();
    this.updateLabelVisibility();
  }

  // Smart Visibility: Show sub-landmarks on zoom-in to prevent clutter
  private updateLabelVisibility() {
    this.markerGroups.forEach(m => {
      const matchFilter = this.activeFilter === 'all' || m.category === this.activeFilter;
      // Show primary landmarks always; secondary landmarks when zoomed in >= 1.25
      const shouldShow = matchFilter && (m.isPrimary || this.currentZoom >= 1.25);
      m.group.visible = shouldShow;
    });
  }

  public panToLandmark(coords: [number, number, number], lm: typeof PORTFOLIO_DATA.landmarks[0]) {
    this.cameraTarget.set(coords[0], 4, coords[2]);
    this.setZoom(Math.max(1.6, this.currentZoom));
    this.hoveredLandmark = lm;
    this.showTooltipForLandmark(lm, coords[0], coords[2]);
    this.selectionRing.position.set(coords[0], coords[1] + 0.4, coords[2]);
    this.selectionRing.visible = true;
    sound.playClick();
  }

  public setFilter(filter: 'all' | 'monuments' | 'cities' | 'transit' | 'nature') {
    this.activeFilter = filter;
    this.updateLabelVisibility();
  }

  // Hover detection using Raycaster
  private checkHover() {
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const intersects = this.raycaster.intersectObjects(this.interactiveMeshes, true);

    if (intersects.length > 0) {
      const hit = intersects[0];
      const lm = this.landmarkMeshMap.get(hit.object) || this.landmarkMeshMap.get(hit.object.parent!);

      if (lm) {
        this.hoveredLandmark = lm;
        this.selectionRing.position.set(lm.coords[0], lm.coords[1] + 0.4, lm.coords[2]);
        this.selectionRing.visible = true;
        this.showTooltipForLandmark(lm, lm.coords[0], lm.coords[2]);
        return;
      }

      // Terrain hover
      const pt = hit.point;
      const wx = Math.round(pt.x);
      const wz = Math.round(pt.z);
      const dist = Math.round(Math.hypot(wx - this.playerPos.x, wz - this.playerPos.z));

      if (this.cursorCoordsEl) {
        this.cursorCoordsEl.innerHTML = `[X: ${wx}, Z: ${wz}] · <span style="color:#bae6fd">${dist}m from you</span> · Click to Travel Here`;
      }
    }

    if (!this.hoveredLandmark) {
      this.selectionRing.visible = false;
      if (this.tooltipEl) this.tooltipEl.style.display = 'none';
    }
  }

  private showTooltipForLandmark(lm: typeof PORTFOLIO_DATA.landmarks[0], wx: number, wz: number) {
    if (!this.tooltipEl) return;
    const dist = Math.round(Math.hypot(wx - this.playerPos.x, wz - this.playerPos.z));
    const cleanTag = lm.tag.replace(/[\[\]]/g, '');

    this.tooltipEl.innerHTML = `
      <div class="mc-map-card-header">
        <span class="mc-map-card-tag">${cleanTag}</span>
        <span class="mc-map-card-coords">X:${wx} Z:${wz} · ${dist}m</span>
      </div>
      <div class="mc-map-card-title">${lm.name}</div>
      <div class="mc-map-card-desc">${lm.desc}</div>
      <button class="mc-map-card-warp-btn" id="btn-tooltip-warp">WARP HERE ↗</button>
    `;

    this.tooltipEl.style.display = 'block';
    this.tooltipEl.style.left = '50%';
    this.tooltipEl.style.top = '78%';
    this.tooltipEl.style.transform = 'translate(-50%, -50%)';

    document.getElementById('btn-tooltip-warp')?.addEventListener('click', (e) => {
      e.stopPropagation();
      sound.playLevelUp();
      this.onTeleport(lm.coords as [number, number, number]);
      this.onClose();
    });
  }

  // Click Handler (Teleport)
  private handleClick(e: PointerEvent) {
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const intersects = this.raycaster.intersectObjects(this.interactiveMeshes, true);

    if (intersects.length > 0) {
      const hit = intersects[0];
      const lm = this.landmarkMeshMap.get(hit.object) || this.landmarkMeshMap.get(hit.object.parent!);

      if (lm) {
        sound.playLevelUp();
        this.onTeleport(lm.coords as [number, number, number]);
        this.onClose();
        return;
      }

      // Ground click teleport
      const pt = hit.point;
      const wx = Math.round(pt.x);
      const wz = Math.round(pt.z);
      if (Math.hypot(wx, wz) < 220) {
        sound.playLevelUp();
        this.onTeleport([wx, Math.max(2, Math.round(pt.y) + 1), wz]);
        this.onClose();
      }
    }
  }

  // ---------------------------------------------------------------------------
  // 7. Animation Loop
  // ---------------------------------------------------------------------------
  private startLoop() {
    const loop = (time: number) => {
      if (this.isDisposed) return;

      // 1. Dynamic Moving Ocean Waves (Harmonic swell displacement)
      if (this.waterGeoPlane && this.waterOriginalPositions) {
        const posAttr = this.waterGeoPlane.attributes.position;
        const count = posAttr.count;
        const t = time * 0.0018;
        for (let i = 0; i < count; i++) {
          const ox = this.waterOriginalPositions[i * 3];
          const oz = this.waterOriginalPositions[i * 3 + 2];
          const wave = Math.sin(ox * 0.032 + t) * 0.85 +
                       Math.cos(oz * 0.038 + t * 1.3) * 0.65 +
                       Math.sin((ox + oz) * 0.02 + t * 0.8) * 0.45;
          posAttr.setY(i, wave);
        }
        posAttr.needsUpdate = true;
        this.waterGeoPlane.computeVertexNormals();
      }

      // 2. Animated turquoise water shelf & coastal surf foam rings
      if (this.waterShelfMesh) {
        this.waterShelfMesh.rotation.z = time * 0.0002;
      }
      this.animatedWaveRings.forEach((r, idx) => {
        const cycle = ((time * 0.0005 + idx * 0.22) % 1.0);
        const scale = 0.95 + cycle * 0.12;
        r.scale.set(scale, scale, 1);
        (r.material as THREE.MeshBasicMaterial).opacity = Math.sin(cycle * Math.PI) * 0.45;
      });

      // 3. Soaring 3D Birds (Flocking, Banking & Wing Flapping)
      this.birds.forEach(b => {
        const theta = time * b.speed + b.phase;
        const x = b.center.x + Math.cos(theta) * b.radiusX;
        const z = b.center.z + Math.sin(theta) * b.radiusZ;
        const y = b.altitude + Math.sin(time * 0.0014 + b.phase) * 2.5;

        // Directional heading tangent
        const nextX = b.center.x + Math.cos(theta + 0.025) * b.radiusX;
        const nextZ = b.center.z + Math.sin(theta + 0.025) * b.radiusZ;
        const heading = Math.atan2(nextX - x, nextZ - z);

        b.group.position.set(x, y, z);
        b.group.rotation.y = heading;

        // Banking tilt when turning
        const bank = Math.sin(theta) * 0.25;
        b.group.rotation.z = bank;

        // Flapping wings
        const flap = Math.sin(time * b.flapSpeed) * 0.55;
        b.wingL.rotation.z = flap;
        b.wingR.rotation.z = -flap;

        // Ground shadow tracking
        b.shadow.position.set(x, 0.6, z);
        b.shadow.scale.set(1 - (y / 90) * 0.35, 1 - (y / 90) * 0.35, 1);
      });

      // 2. Animate volcano smoke plume
      this.volcanoSmokePuffs.forEach(p => {
        const t = (time * 0.0012 + p.seed) % 3.0;
        p.mesh.position.y = 28 + t * 3.8;
        p.mesh.position.x = Math.sin(time * 0.003 + p.seed) * 1.2;
        const scale = 1.0 + t * 0.5;
        p.mesh.scale.set(scale, scale, scale);
      });

      // 3. Slowly rotate Ain Dubai observation wheel
      if (this.ferrisWheelRim) {
        this.ferrisWheelRim.rotation.z = time * 0.0004;
      }

      // 4. Selection Ring pulse
      if (this.selectionRing && this.selectionRing.visible) {
        const ringScale = 1.0 + Math.sin(time * 0.006) * 0.08;
        this.selectionRing.scale.set(ringScale, ringScale, ringScale);
      }

      this.renderer.render(this.scene, this.camera);
      this.animId = requestAnimationFrame(loop);
    };

    this.animId = requestAnimationFrame(loop);
  }

  // ---------------------------------------------------------------------------
  // 8. Cleanup & Disposal
  // ---------------------------------------------------------------------------
  public dispose() {
    this.isDisposed = true;
    if (this.animId !== null) {
      cancelAnimationFrame(this.animId);
      this.animId = null;
    }
    this.renderer.dispose();
  }
}
