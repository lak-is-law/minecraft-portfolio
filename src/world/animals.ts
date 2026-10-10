import * as THREE from 'three';
import { sound } from '../engine/audio';

export interface AnimalEntity {
  group: THREE.Group;
  type: 'panda' | 'lion' | 'elephant' | 'giraffe' | 'polar_bear' | 'penguin' | 'sheep' | 'pig' | 'zebra' | 'flamingo' | 'tiger' | 'peacock' | 'temple_elephant';
  name: string;
  species: string;
  basePos: THREE.Vector3;
  heading: number;
  update: (time: number, playerPos: THREE.Vector3) => void;
  interact?: () => void;
}

export interface GroundQueryWorld {
  getGroundHeight?: (x: number, z: number, preferredY?: number) => number;
}

export class AnimalManager {
  private scene: THREE.Scene;
  private world?: GroundQueryWorld;
  public animals: AnimalEntity[] = [];
  private lastSoundTime: number = 0;

  constructor(scene: THREE.Scene, world?: GroundQueryWorld) {
    this.scene = scene;
    this.world = world;
    this.spawnAllZooAnimals();
  }

  public getGroundHeight(x: number, z: number, preferredY?: number): number {
    if (this.world && typeof this.world.getGroundHeight === 'function') {
      return this.world.getGroundHeight(x, z, preferredY);
    }
    return preferredY !== undefined ? preferredY + 1.0 : 2.0;
  }

  public update(time: number, playerPos: THREE.Vector3) {
    for (let i = 0; i < this.animals.length; i++) {
      const animal = this.animals[i];
      animal.update(time, playerPos);

      // Proximity interaction sound check
      const dist = animal.group.position.distanceTo(playerPos);
      if (dist < 4.0 && time - this.lastSoundTime > 6.0) {
        this.lastSoundTime = time;
        sound.playAnimalSound(animal.type);
      }
    }
  }

  // Create an overhead Minecraft-style name tag
  private createNameTag(name: string, species: string, tagColor: string = '#4ade80'): THREE.Sprite {
    const canvas = document.createElement('canvas');
    canvas.width = 320;
    canvas.height = 72;
    const ctx = canvas.getContext('2d')!;

    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.roundRect ? ctx.roundRect(4, 4, 312, 64, 10) : ctx.fillRect(4, 4, 312, 64);
    ctx.fill();

    ctx.strokeStyle = tagColor;
    ctx.lineWidth = 3;
    ctx.roundRect ? ctx.roundRect(4, 4, 312, 64, 10) : ctx.strokeRect(4, 4, 312, 64);
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(name, 160, 32);

    ctx.fillStyle = tagColor;
    ctx.font = 'italic 16px monospace';
    ctx.fillText(species, 160, 56);

    const texture = new THREE.CanvasTexture(canvas);
    texture.magFilter = THREE.NearestFilter;
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, depthTest: true }));
    sprite.scale.set(1.6, 0.36, 1);
    return sprite;
  }

  private spawnAllZooAnimals() {
    // 1. Giant Panda Bamboo Valley (NW: X around -54, Z around -12)
    this.createPanda(-54, 1.0, -12, '🐼 Bao Bao', 'Giant Panda', true);
    this.createPanda(-52, 1.0, -16, '🐼 Mei Xiang', 'Panda Mother', false);
    this.createPanda(-60, 1.0, -11, '🐼 Xiao Qi', 'Panda Cub', false, 0.65);

    // 2. Serengeti African Lion Kopje (NW far: X around -93, Z around -14)
    this.createLion(-93, 4.0, -14, '🦁 Simba', 'African Lion King', true); // Perched atop kopje rock
    this.createLion(-90, 2.0, -11, '🦁 Nala', 'Lioness', false);
    this.createLion(-96, 2.0, -16, '🦁 Kiara', 'Lioness Cub', false, 0.7);

    // 3. Gentle African Elephant Oasis (SW: X around -86, Z around 12)
    this.createElephant(-86, 1.0, 12, '🐘 Tembo', 'African Bull Elephant', 1.2);
    this.createElephant(-84, 1.0, 15, '🐘 Zola', 'Elephant Matriarch', 1.0);
    this.createElephant(-86, 1.0, 18, '🐘 Toto', 'Baby Elephant Calf', 0.65);

    // 4. Rothschild Giraffe Canopy Reserve (South-Center: X around -66, Z around 14)
    this.createGiraffe(-66, 1.0, 14, '🦒 Twiga', "Rothschild's Giraffe", 1.15);
    this.createGiraffe(-72, 1.0, 16, '🦒 Kibo', 'Savanna Giraffe', 1.0);
    this.createGiraffe(-60, 1.0, 13, '🦒 Zawadi', 'Giraffe Calf', 0.75);

    // 5. Arctic Glacier & Polar Cove (North-West: X around -75, Z around -14)
    this.createPolarBear(-80, 1.0, -14, '🐻‍❄️ Nanook', 'Apex Polar Bear');
    this.createPolarBear(-71, 1.0, -17, '🐻‍❄️ Siku', 'Arctic Polar Bear', 0.8);
    this.createPenguin(-74, 1.0, -9, '🐧 Pingu', 'Emperor Penguin');
    this.createPenguin(-77, 1.0, -10, '🐧 Piper', 'Emperor Penguin');
    this.createPenguin(-76, 1.0, -10, '🐧 Pebble', 'Baby Penguin');

    // 6. Children's Petting Zoo & Barnyard (SE: X around -47, Z around 14)
    this.createSheep(-46, 1.0, 14, '🐑 Woolly', 'Merino Sheep');
    this.createSheep(-49, 1.0, 17, '🐑 Cloud', 'Merino Sheep');
    this.createPig(-44, 1.0, 15, '🐖 Wilbur', 'Pink Piglet');
    this.createPig(-47, 1.0, 11, '🐖 Babe', 'Farm Pig');

    // 7. Savanna Zebra & Wetland Reserve (Central: X around -75, Z around 3)
    this.createZebra(-75, 1.0, 3, '🦓 Marty', 'Plains Zebra');
    this.createZebra(-82, 1.0, 3, '🦓 Stripes', 'Plains Zebra', 0.85);

    // 8. Flamingo Lagoon (Central Wetland: X around -63, Z around -3)
    this.createFlamingo(-63, 1.0, -3, '🦩 Flora', 'Greater Flamingo');
    this.createFlamingo(-65, 1.0, -2, '🦩 Coral', 'Greater Flamingo');

    // 9. Imperial India Realm: Living Iconic Fauna
    // Royal Bengal Tigers (Sanctuary grove by the Banyan trees)
    this.createTiger(50, 1.0, -140, '🐅 Sher Khan', 'Royal Bengal Tiger (National Animal)', 1.05);
    this.createTiger(48, 1.0, -136, '🐅 Sundari', 'Bengal Tigress', 0.95);

    // Dancing Indian Blue Peacocks (Taj Mahal Yamuna Lotus Pool)
    this.createPeacock(73, 2.0, -118, '🦚 Mayura', 'Indian Blue Peacock (National Bird)', 1.0);
    this.createPeacock(87, 2.0, -118, '🦚 Nilakantha', 'Indian Blue Peacock', 1.0);

    // Sacred Caparisoned Temple Bull Elephant (Dravidian Temple Gopuram Mandapam)
    this.createTempleElephant(115, 2.0, -122, '🐘 Gajendra', 'Caparisoned Temple Elephant', 1.22);
  }

  // ==========================================
  // 1. GIANT PANDA (Ailuropoda melanoleuca)
  // ==========================================
  private createPanda(x: number, y: number, z: number, name: string, species: string, isSeated: boolean, scale: number = 1.0) {
    const groundY = this.getGroundHeight(x, z, y);
    const root = new THREE.Group();
    root.position.set(x, groundY, z);
    root.scale.setScalar(scale);

    const whiteMat = new THREE.MeshLambertMaterial({ color: 0xf8fafc });
    const blackMat = new THREE.MeshLambertMaterial({ color: 0x18181b });
    const greenMat = new THREE.MeshLambertMaterial({ color: 0x22c55e });

    // Torso
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.7, 0.9), whiteMat);
    body.position.set(0, 0.55, 0);
    body.castShadow = true;
    root.add(body);

    // Black saddle band across shoulders
    const saddle = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.72, 0.35), blackMat);
    saddle.position.set(0, 0.55, 0.2);
    root.add(saddle);

    // Head Group
    const head = new THREE.Group();
    head.position.set(0, 0.95, 0.5);

    const headBox = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.55, 0.52), whiteMat);
    head.add(headBox);

    // Black Ears
    const earL = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.2, 0.1), blackMat);
    earL.position.set(-0.3, 0.32, -0.05);
    head.add(earL);
    const earR = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.2, 0.1), blackMat);
    earR.position.set(0.3, 0.32, -0.05);
    head.add(earR);

    // Black Eye Patches
    const eyeL = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.14, 0.04), blackMat);
    eyeL.position.set(-0.18, 0.06, 0.27);
    head.add(eyeL);
    const eyeR = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.14, 0.04), blackMat);
    eyeR.position.set(0.18, 0.06, 0.27);
    head.add(eyeR);

    // White Muzzle & Black Nose
    const muzzle = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.18, 0.16), whiteMat);
    muzzle.position.set(0, -0.1, 0.32);
    head.add(muzzle);
    const nose = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.07, 0.05), blackMat);
    nose.position.set(0, -0.06, 0.41);
    head.add(nose);

    root.add(head);

    // Arms
    const armL = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.5, 0.24), blackMat);
    const armR = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.5, 0.24), blackMat);

    if (isSeated) {
      armL.position.set(-0.38, 0.5, 0.35);
      armL.rotation.x = -Math.PI / 3;
      armR.position.set(0.38, 0.5, 0.35);
      armR.rotation.x = -Math.PI / 3;

      // Bamboo stalk held in paws!
      const bamboo = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.9, 6), greenMat);
      bamboo.position.set(0, 0.65, 0.5);
      bamboo.rotation.z = Math.PI / 4;
      bamboo.rotation.x = Math.PI / 8;
      root.add(bamboo);
    } else {
      armL.position.set(-0.38, 0.3, 0.3);
      armR.position.set(0.38, 0.3, 0.3);
    }
    root.add(armL);
    root.add(armR);

    // Hind Legs
    const legL = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.45, 0.26), blackMat);
    const legR = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.45, 0.26), blackMat);
    if (isSeated) {
      legL.position.set(-0.36, 0.22, 0.3);
      legL.rotation.x = -Math.PI / 2;
      legR.position.set(0.36, 0.22, 0.3);
      legR.rotation.x = -Math.PI / 2;
    } else {
      legL.position.set(-0.32, 0.22, -0.3);
      legR.position.set(0.32, 0.22, -0.3);
    }
    root.add(legL);
    root.add(legR);

    // Name tag
    const tag = this.createNameTag(name, species, '#10b981');
    tag.position.set(0, 1.6, 0.2);
    root.add(tag);

    this.scene.add(root);

    const basePosY = groundY;
    const entity: AnimalEntity = {
      group: root,
      type: 'panda',
      name,
      species,
      basePos: new THREE.Vector3(x, groundY, z),
      heading: 0,
      update: (time, playerPos) => {
        // Idle breathing and head bobbing
        root.position.y = basePosY + Math.sin(time * 2.5 + x) * 0.03;
        head.rotation.z = Math.sin(time * 1.5 + z) * 0.08;

        if (isSeated) {
          // Chewing bamboo animation
          head.rotation.x = Math.sin(time * 6) * 0.06;
          armL.rotation.x = -Math.PI / 3 + Math.sin(time * 4) * 0.05;
          armR.rotation.x = -Math.PI / 3 - Math.sin(time * 4) * 0.05;
        }

        // Track player if nearby
        const dist = root.position.distanceTo(playerPos);
        if (dist < 10) {
          const dx = playerPos.x - root.position.x;
          const dz = playerPos.z - root.position.z;
          head.rotation.y = Math.atan2(dx, dz) * 0.5;
        } else {
          head.rotation.y = Math.sin(time * 0.8) * 0.15;
        }
      }
    };

    this.animals.push(entity);
  }

  // ==========================================
  // 2. AFRICAN LION (Panthera leo)
  // ==========================================
  private createLion(x: number, y: number, z: number, name: string, species: string, isMale: boolean, scale: number = 1.0) {
    const groundY = this.getGroundHeight(x, z, y);
    const root = new THREE.Group();
    root.position.set(x, groundY, z);
    root.scale.setScalar(scale);

    const goldMat = new THREE.MeshLambertMaterial({ color: 0xd97706 });
    const maneMat = new THREE.MeshLambertMaterial({ color: 0x78350f });
    const lightMat = new THREE.MeshLambertMaterial({ color: 0xfef3c7 });
    const darkMat = new THREE.MeshLambertMaterial({ color: 0x451a03 });

    // Torso
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.65, 1.2), goldMat);
    body.position.set(0, 0.75, 0);
    body.castShadow = true;
    root.add(body);

    // Head Group
    const head = new THREE.Group();
    head.position.set(0, 1.15, 0.65);

    const headMesh = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.5), goldMat);
    head.add(headMesh);

    // Muzzle & Nose
    const muzzle = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.22, 0.22), lightMat);
    muzzle.position.set(0, -0.1, 0.3);
    head.add(muzzle);
    const nose = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.08, 0.06), darkMat);
    nose.position.set(0, -0.04, 0.42);
    head.add(nose);

    // Ears
    const earL = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.14, 0.08), goldMat);
    earL.position.set(-0.24, 0.26, -0.05);
    head.add(earL);
    const earR = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.14, 0.08), goldMat);
    earR.position.set(0.24, 0.26, -0.05);
    head.add(earR);

    // Magnificent Male Lion Mane
    if (isMale) {
      const mane = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.85, 0.45), maneMat);
      mane.position.set(0, 0.05, -0.15);
      head.add(mane);
      const maneTop = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.25, 0.4), darkMat);
      maneTop.position.set(0, 0.4, -0.12);
      head.add(maneTop);
    }
    root.add(head);

    // 4 Legs
    const legFL = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.7, 0.22), goldMat);
    legFL.position.set(-0.25, 0.35, 0.45);
    root.add(legFL);
    const legFR = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.7, 0.22), goldMat);
    legFR.position.set(0.25, 0.35, 0.45);
    root.add(legFR);
    const legBL = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.7, 0.22), goldMat);
    legBL.position.set(-0.25, 0.35, -0.45);
    root.add(legBL);
    const legBR = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.7, 0.22), goldMat);
    legBR.position.set(0.25, 0.35, -0.45);
    root.add(legBR);

    // Swishing Tail with Dark Tuft
    const tailGroup = new THREE.Group();
    tailGroup.position.set(0, 0.9, -0.6);
    const tailShaft = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.65), goldMat);
    tailShaft.position.set(0, -0.25, -0.3);
    tailShaft.rotation.x = -0.6;
    tailGroup.add(tailShaft);
    const tailTuft = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.15, 0.18), maneMat);
    tailTuft.position.set(0, -0.5, -0.55);
    tailGroup.add(tailTuft);
    root.add(tailGroup);

    // Name tag
    const tag = this.createNameTag(name, species, '#f59e0b');
    tag.position.set(0, 1.8, 0.4);
    root.add(tag);

    this.scene.add(root);

    const basePosY = groundY;
    const entity: AnimalEntity = {
      group: root,
      type: 'lion',
      name,
      species,
      basePos: new THREE.Vector3(x, groundY, z),
      heading: 0,
      update: (time, playerPos) => {
        // Subtle breathing
        root.position.y = basePosY + Math.sin(time * 2 + x) * 0.02;

        // Tail swishing
        tailGroup.rotation.y = Math.sin(time * 4) * 0.4;

        // Proud head movement / roaring pose
        if (isMale) {
          head.rotation.x = -0.1 + Math.sin(time * 1.2) * 0.12;
        }

        const dist = root.position.distanceTo(playerPos);
        if (dist < 12) {
          const dx = playerPos.x - root.position.x;
          const dz = playerPos.z - root.position.z;
          head.rotation.y = Math.atan2(dx, dz) * 0.6;
        } else {
          head.rotation.y = Math.sin(time * 0.7) * 0.2;
        }
      }
    };

    this.animals.push(entity);
  }

  // ==========================================
  // 3. AFRICAN ELEPHANT (Loxodonta africana)
  // ==========================================
  private createElephant(x: number, y: number, z: number, name: string, species: string, scale: number = 1.0) {
    const groundY = this.getGroundHeight(x, z, y);
    const root = new THREE.Group();
    root.position.set(x, groundY, z);
    root.scale.setScalar(scale);

    const greyMat = new THREE.MeshLambertMaterial({ color: 0x64748b });
    const darkGreyMat = new THREE.MeshLambertMaterial({ color: 0x475569 });
    const ivoryMat = new THREE.MeshLambertMaterial({ color: 0xfef08a });

    // Massive Body
    const body = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.3, 1.9), greyMat);
    body.position.set(0, 1.4, 0);
    body.castShadow = true;
    root.add(body);

    // Head Group
    const head = new THREE.Group();
    head.position.set(0, 1.7, 1.1);

    const headMesh = new THREE.Mesh(new THREE.BoxGeometry(1.0, 1.0, 0.9), greyMat);
    head.add(headMesh);

    // Large Flapping Ears
    const earL = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.1, 0.8), darkGreyMat);
    earL.position.set(-0.62, 0.1, -0.15);
    earL.rotation.y = 0.3;
    head.add(earL);

    const earR = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.1, 0.8), darkGreyMat);
    earR.position.set(0.62, 0.1, -0.15);
    earR.rotation.y = -0.3;
    head.add(earR);

    // Ivory Tusks
    const tuskL = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.6), ivoryMat);
    tuskL.position.set(-0.35, -0.4, 0.55);
    tuskL.rotation.x = 0.3;
    head.add(tuskL);

    const tuskR = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.6), ivoryMat);
    tuskR.position.set(0.35, -0.4, 0.55);
    tuskR.rotation.x = 0.3;
    head.add(tuskR);

    // Multi-segment Articulated Trunk
    const trunkRoot = new THREE.Group();
    trunkRoot.position.set(0, -0.2, 0.5);

    const trunk1 = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.55, 0.28), greyMat);
    trunk1.position.set(0, -0.25, 0);
    trunkRoot.add(trunk1);

    const trunk2 = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.5, 0.24), greyMat);
    trunk2.position.set(0, -0.7, 0.1);
    trunk2.rotation.x = 0.4;
    trunkRoot.add(trunk2);

    const trunkTip = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.35, 0.2), darkGreyMat);
    trunkTip.position.set(0, -1.0, 0.3);
    trunkTip.rotation.x = 0.8;
    trunkRoot.add(trunkTip);

    head.add(trunkRoot);
    root.add(head);

    // 4 Columnar Legs
    const legFL = new THREE.Mesh(new THREE.BoxGeometry(0.38, 1.1, 0.38), greyMat);
    legFL.position.set(-0.48, 0.55, 0.65);
    root.add(legFL);
    const legFR = new THREE.Mesh(new THREE.BoxGeometry(0.38, 1.1, 0.38), greyMat);
    legFR.position.set(0.48, 0.55, 0.65);
    root.add(legFR);
    const legBL = new THREE.Mesh(new THREE.BoxGeometry(0.38, 1.1, 0.38), greyMat);
    legBL.position.set(-0.48, 0.55, -0.65);
    root.add(legBL);
    const legBR = new THREE.Mesh(new THREE.BoxGeometry(0.38, 1.1, 0.38), greyMat);
    legBR.position.set(0.48, 0.55, -0.65);
    root.add(legBR);

    // Name tag
    const tag = this.createNameTag(name, species, '#60a5fa');
    tag.position.set(0, 2.7, 0.8);
    root.add(tag);

    this.scene.add(root);

    const basePosY = groundY;
    const entity: AnimalEntity = {
      group: root,
      type: 'elephant',
      name,
      species,
      basePos: new THREE.Vector3(x, groundY, z),
      heading: 0,
      update: (time, playerPos) => {
        // Deep breathing
        root.position.y = basePosY + Math.sin(time * 1.5 + x) * 0.025;

        // Trunk swinging and curling
        trunkRoot.rotation.x = Math.sin(time * 2.2) * 0.25;
        trunkRoot.rotation.y = Math.sin(time * 1.4) * 0.15;

        // Ear flapping
        earL.rotation.y = 0.3 + Math.sin(time * 2.5) * 0.15;
        earR.rotation.y = -0.3 - Math.sin(time * 2.5) * 0.15;

        // Head tracking
        const dist = root.position.distanceTo(playerPos);
        if (dist < 14) {
          const dx = playerPos.x - root.position.x;
          const dz = playerPos.z - root.position.z;
          head.rotation.y = Math.atan2(dx, dz) * 0.4;
        }
      }
    };

    this.animals.push(entity);
  }

  // ==========================================
  // 4. ROTHSCHILD'S GIRAFFE (Giraffa camelopardalis)
  // ==========================================
  private createGiraffe(x: number, y: number, z: number, name: string, species: string, scale: number = 1.0) {
    const groundY = this.getGroundHeight(x, z, y);
    const root = new THREE.Group();
    root.position.set(x, groundY, z);
    root.scale.setScalar(scale);

    const yellowMat = new THREE.MeshLambertMaterial({ color: 0xf59e0b });
    const spotMat = new THREE.MeshLambertMaterial({ color: 0xb45309 });
    const darkMat = new THREE.MeshLambertMaterial({ color: 0x451a03 });

    // Slender Torso
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.7, 1.1), yellowMat);
    body.position.set(0, 1.6, 0);
    body.castShadow = true;
    root.add(body);

    // Decorative brown spots on body
    const spot1 = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.4, 0.35), spotMat);
    spot1.position.set(0, 1.6, 0.15);
    root.add(spot1);
    const spot2 = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.35, 0.3), spotMat);
    spot2.position.set(0, 1.6, -0.3);
    root.add(spot2);

    // Long Neck Group
    const neckGroup = new THREE.Group();
    neckGroup.position.set(0, 1.85, 0.45);

    const neck = new THREE.Mesh(new THREE.BoxGeometry(0.36, 1.8, 0.36), yellowMat);
    neck.position.set(0, 0.9, 0.15);
    neck.rotation.x = 0.18;
    neckGroup.add(neck);

    // Mane along back of neck
    const mane = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.7, 0.12), darkMat);
    mane.position.set(0, 0.9, -0.05);
    mane.rotation.x = 0.18;
    neckGroup.add(mane);

    // Head Group atop neck
    const head = new THREE.Group();
    head.position.set(0, 1.8, 0.35);

    const headMesh = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.38, 0.5), yellowMat);
    head.add(headMesh);

    // Snout
    const snout = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.22, 0.22), spotMat);
    snout.position.set(0, -0.08, 0.32);
    head.add(snout);

    // Horns (Ossicones)
    const hornL = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.18, 0.06), darkMat);
    hornL.position.set(-0.12, 0.24, -0.05);
    head.add(hornL);
    const hornR = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.18, 0.06), darkMat);
    hornR.position.set(0.12, 0.24, -0.05);
    head.add(hornR);

    // Ears
    const earL = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.08, 0.08), yellowMat);
    earL.position.set(-0.24, 0.14, -0.08);
    earL.rotation.z = -0.3;
    head.add(earL);
    const earR = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.08, 0.08), yellowMat);
    earR.position.set(0.24, 0.14, -0.08);
    earR.rotation.z = 0.3;
    head.add(earR);

    neckGroup.add(head);
    root.add(neckGroup);

    // 4 Tall Slender Stilt Legs
    const legFL = new THREE.Mesh(new THREE.BoxGeometry(0.18, 1.5, 0.18), yellowMat);
    legFL.position.set(-0.25, 0.75, 0.4);
    root.add(legFL);
    const legFR = new THREE.Mesh(new THREE.BoxGeometry(0.18, 1.5, 0.18), yellowMat);
    legFR.position.set(0.25, 0.75, 0.4);
    root.add(legFR);
    const legBL = new THREE.Mesh(new THREE.BoxGeometry(0.18, 1.5, 0.18), yellowMat);
    legBL.position.set(-0.25, 0.75, -0.4);
    root.add(legBL);
    const legBR = new THREE.Mesh(new THREE.BoxGeometry(0.18, 1.5, 0.18), yellowMat);
    legBR.position.set(0.25, 0.75, -0.4);
    root.add(legBR);

    // Name tag high up by the head
    const tag = this.createNameTag(name, species, '#fbbf24');
    tag.position.set(0, 4.2, 0.8);
    root.add(tag);

    this.scene.add(root);

    const entity: AnimalEntity = {
      group: root,
      type: 'giraffe',
      name,
      species,
      basePos: new THREE.Vector3(x, groundY, z),
      heading: 0,
      update: (time, playerPos) => {
        // Graceful tall neck sway
        neckGroup.rotation.z = Math.sin(time * 1.1 + x) * 0.06;
        head.rotation.x = Math.sin(time * 2.0) * 0.08;

        const dist = root.position.distanceTo(playerPos);
        if (dist < 14) {
          const dx = playerPos.x - root.position.x;
          const dz = playerPos.z - root.position.z;
          head.rotation.y = Math.atan2(dx, dz) * 0.5;
        }
      }
    };

    this.animals.push(entity);
  }

  // ==========================================
  // 5. POLAR BEAR (Ursus maritimus)
  // ==========================================
  private createPolarBear(x: number, y: number, z: number, name: string, species: string, scale: number = 1.0) {
    const groundY = this.getGroundHeight(x, z, y);
    const root = new THREE.Group();
    root.position.set(x, groundY, z);
    root.scale.setScalar(scale);

    const furMat = new THREE.MeshLambertMaterial({ color: 0xf1f5f9 });
    const blackMat = new THREE.MeshLambertMaterial({ color: 0x0f172a });

    // Bulky Body
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.8, 1.4), furMat);
    body.position.set(0, 0.75, 0);
    body.castShadow = true;
    root.add(body);

    // Head
    const head = new THREE.Group();
    head.position.set(0, 1.05, 0.8);

    const headMesh = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.5, 0.55), furMat);
    head.add(headMesh);

    // Snout & Black Nose
    const muzzle = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.22, 0.25), furMat);
    muzzle.position.set(0, -0.1, 0.35);
    head.add(muzzle);
    const nose = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.08, 0.06), blackMat);
    nose.position.set(0, -0.04, 0.48);
    head.add(nose);

    // Rounded Ears
    const earL = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.12, 0.06), furMat);
    earL.position.set(-0.25, 0.26, -0.05);
    head.add(earL);
    const earR = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.12, 0.06), furMat);
    earR.position.set(0.25, 0.26, -0.05);
    head.add(earR);

    root.add(head);

    // 4 Powerful Paws/Legs
    const legFL = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.65, 0.28), furMat);
    legFL.position.set(-0.32, 0.32, 0.45);
    root.add(legFL);
    const legFR = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.65, 0.28), furMat);
    legFR.position.set(0.32, 0.32, 0.45);
    root.add(legFR);
    const legBL = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.65, 0.28), furMat);
    legBL.position.set(-0.32, 0.32, -0.45);
    root.add(legBL);
    const legBR = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.65, 0.28), furMat);
    legBR.position.set(0.32, 0.32, -0.45);
    root.add(legBR);

    const tag = this.createNameTag(name, species, '#38bdf8');
    tag.position.set(0, 1.8, 0.5);
    root.add(tag);

    this.scene.add(root);

    const basePosY = groundY;
    const entity: AnimalEntity = {
      group: root,
      type: 'polar_bear',
      name,
      species,
      basePos: new THREE.Vector3(x, groundY, z),
      heading: 0,
      update: (time, playerPos) => {
        root.position.y = basePosY + Math.sin(time * 1.8 + z) * 0.03;
        head.rotation.y = Math.sin(time * 1.2) * 0.18;

        const dist = root.position.distanceTo(playerPos);
        if (dist < 10) {
          const dx = playerPos.x - root.position.x;
          const dz = playerPos.z - root.position.z;
          head.rotation.y = Math.atan2(dx, dz) * 0.5;
        }
      }
    };

    this.animals.push(entity);
  }

  // ==========================================
  // 6. EMPEROR PENGUIN (Aptenodytes forsteri)
  // ==========================================
  private createPenguin(x: number, y: number, z: number, name: string, species: string, scale: number = 0.85) {
    const groundY = this.getGroundHeight(x, z, y);
    const root = new THREE.Group();
    root.position.set(x, groundY, z);
    root.scale.setScalar(scale);

    const blackMat = new THREE.MeshLambertMaterial({ color: 0x0f172a });
    const whiteMat = new THREE.MeshLambertMaterial({ color: 0xffffff });
    const orangeMat = new THREE.MeshLambertMaterial({ color: 0xf97316 });
    const yellowMat = new THREE.MeshLambertMaterial({ color: 0xfacc15 });

    // Tuxedo Body (Back is black, belly is white)
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.68, 0.38), blackMat);
    body.position.set(0, 0.44, 0);
    body.castShadow = true;
    root.add(body);

    const belly = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.58, 0.12), whiteMat);
    belly.position.set(0, 0.42, 0.16);
    root.add(belly);

    // Yellow/Orange Neck Patch
    const neckPatch = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.15, 0.1), yellowMat);
    neckPatch.position.set(0, 0.64, 0.17);
    root.add(neckPatch);

    // Head
    const head = new THREE.Group();
    head.position.set(0, 0.85, 0.05);

    const headMesh = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.32, 0.35), blackMat);
    head.add(headMesh);

    // Orange Beak
    const beak = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.08, 0.22), orangeMat);
    beak.position.set(0, -0.04, 0.24);
    head.add(beak);
    root.add(head);

    // Flippers (Wings)
    const wingL = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.45, 0.2), blackMat);
    wingL.position.set(-0.25, 0.46, 0.02);
    wingL.rotation.z = -0.15;
    root.add(wingL);

    const wingR = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.45, 0.2), blackMat);
    wingR.position.set(0.25, 0.46, 0.02);
    wingR.rotation.z = 0.15;
    root.add(wingR);

    // Webbed Feet
    const footL = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.06, 0.22), orangeMat);
    footL.position.set(-0.12, 0.04, 0.06);
    root.add(footL);
    const footR = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.06, 0.22), orangeMat);
    footR.position.set(0.12, 0.04, 0.06);
    root.add(footR);

    const tag = this.createNameTag(name, species, '#38bdf8');
    tag.position.set(0, 1.35, 0.2);
    root.add(tag);

    this.scene.add(root);

    const entity: AnimalEntity = {
      group: root,
      type: 'penguin',
      name,
      species,
      basePos: new THREE.Vector3(x, groundY, z),
      heading: 0,
      update: (time, _playerPos) => {
        // Adorable rapid waddle (side-to-side roll and flipper flap)
        const waddle = Math.sin(time * 5.5 + x) * 0.14;
        root.rotation.z = waddle;
        wingL.rotation.z = -0.15 - Math.sin(time * 5.5) * 0.2;
        wingR.rotation.z = 0.15 + Math.sin(time * 5.5) * 0.2;
        head.rotation.x = Math.sin(time * 3) * 0.08;
      }
    };

    this.animals.push(entity);
  }

  // ==========================================
  // 7. MERINO SHEEP (Ovis aries)
  // ==========================================
  private createSheep(x: number, y: number, z: number, name: string, species: string, scale: number = 0.95) {
    const groundY = this.getGroundHeight(x, z, y);
    const root = new THREE.Group();
    root.position.set(x, groundY, z);
    root.scale.setScalar(scale);

    const woolMat = new THREE.MeshLambertMaterial({ color: 0xf8fafc });
    const skinMat = new THREE.MeshLambertMaterial({ color: 0x27272a });

    // Fluffy Woolly Body
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.7, 1.0), woolMat);
    body.position.set(0, 0.65, 0);
    body.castShadow = true;
    root.add(body);

    // Head Group
    const head = new THREE.Group();
    head.position.set(0, 0.85, 0.55);

    const headMesh = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.38, 0.42), skinMat);
    head.add(headMesh);

    const woolCap = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.16, 0.35), woolMat);
    woolCap.position.set(0, 0.18, -0.04);
    head.add(woolCap);

    // Droopy Ears
    const earL = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.08, 0.08), skinMat);
    earL.position.set(-0.25, 0.05, 0);
    head.add(earL);
    const earR = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.08, 0.08), skinMat);
    earR.position.set(0.25, 0.05, 0);
    head.add(earR);

    root.add(head);

    // 4 Black Legs
    const legFL = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.5, 0.18), skinMat);
    legFL.position.set(-0.24, 0.25, 0.35);
    root.add(legFL);
    const legFR = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.5, 0.18), skinMat);
    legFR.position.set(0.24, 0.25, 0.35);
    root.add(legFR);
    const legBL = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.5, 0.18), skinMat);
    legBL.position.set(-0.24, 0.25, -0.35);
    root.add(legBL);
    const legBR = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.5, 0.18), skinMat);
    legBR.position.set(0.24, 0.25, -0.35);
    root.add(legBR);

    const tag = this.createNameTag(name, species, '#4ade80');
    tag.position.set(0, 1.5, 0.3);
    root.add(tag);

    this.scene.add(root);

    const entity: AnimalEntity = {
      group: root,
      type: 'sheep',
      name,
      species,
      basePos: new THREE.Vector3(x, groundY, z),
      heading: 0,
      update: (time, _playerPos) => {
        // Grazing cycle: head dips to ground to chew grass, then raises up
        const graze = Math.sin(time * 1.5 + x);
        head.rotation.x = 0.35 + (graze > 0 ? graze * 0.35 : 0);
        head.position.y = 0.85 - (graze > 0 ? graze * 0.15 : 0);
      }
    };

    this.animals.push(entity);
  }

  // ==========================================
  // 8. BARNYARD PIG (Sus domesticus)
  // ==========================================
  private createPig(x: number, y: number, z: number, name: string, species: string, scale: number = 0.85) {
    const groundY = this.getGroundHeight(x, z, y);
    const root = new THREE.Group();
    root.position.set(x, groundY, z);
    root.scale.setScalar(scale);

    const pinkMat = new THREE.MeshLambertMaterial({ color: 0xf472b6 });
    const darkPinkMat = new THREE.MeshLambertMaterial({ color: 0xdb2777 });

    // Chubby Pink Body
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.55, 0.9), pinkMat);
    body.position.set(0, 0.5, 0);
    body.castShadow = true;
    root.add(body);

    // Head
    const head = new THREE.Group();
    head.position.set(0, 0.65, 0.48);

    const headMesh = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.42, 0.42), pinkMat);
    head.add(headMesh);

    // Signature Pig Snout
    const snout = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.18, 0.14), darkPinkMat);
    snout.position.set(0, -0.06, 0.26);
    head.add(snout);

    // Floppy Ears
    const earL = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.12, 0.06), darkPinkMat);
    earL.position.set(-0.2, 0.18, -0.02);
    head.add(earL);
    const earR = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.12, 0.06), darkPinkMat);
    earR.position.set(0.2, 0.18, -0.02);
    head.add(earR);

    root.add(head);

    // 4 Short Legs
    const legFL = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.4, 0.16), pinkMat);
    legFL.position.set(-0.2, 0.2, 0.3);
    root.add(legFL);
    const legFR = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.4, 0.16), pinkMat);
    legFR.position.set(0.2, 0.2, 0.3);
    root.add(legFR);
    const legBL = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.4, 0.16), pinkMat);
    legBL.position.set(-0.2, 0.2, -0.3);
    root.add(legBL);
    const legBR = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.4, 0.16), pinkMat);
    legBR.position.set(0.2, 0.2, -0.3);
    root.add(legBR);

    // Curly Tail
    const tail = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.2), darkPinkMat);
    tail.position.set(0, 0.6, -0.5);
    tail.rotation.x = -0.5;
    root.add(tail);

    const tag = this.createNameTag(name, species, '#f472b6');
    tag.position.set(0, 1.3, 0.2);
    root.add(tag);

    this.scene.add(root);

    const entity: AnimalEntity = {
      group: root,
      type: 'pig',
      name,
      species,
      basePos: new THREE.Vector3(x, groundY, z),
      heading: 0,
      update: (time, _playerPos) => {
        // Snout wiggle and tail wagging
        head.rotation.y = Math.sin(time * 3 + z) * 0.12;
        tail.rotation.y = Math.sin(time * 6) * 0.35;
      }
    };

    this.animals.push(entity);
  }

  // ==========================================
  // 9. SAVANNA ZEBRA (Equus quagga)
  // ==========================================
  private createZebra(x: number, y: number, z: number, name: string, species: string, scale: number = 1.0) {
    const groundY = this.getGroundHeight(x, z, y);
    const root = new THREE.Group();
    root.position.set(x, groundY, z);
    root.scale.setScalar(scale);

    const whiteMat = new THREE.MeshLambertMaterial({ color: 0xffffff });
    const blackMat = new THREE.MeshLambertMaterial({ color: 0x0f172a });

    // Torso with Zebra Stripes
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.65, 1.1), whiteMat);
    body.position.set(0, 0.8, 0);
    body.castShadow = true;
    root.add(body);

    // Dark stripes across body
    for (const offset of [-0.3, -0.1, 0.1, 0.3]) {
      const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.67, 0.67, 0.09), blackMat);
      stripe.position.set(0, 0.8, offset);
      root.add(stripe);
    }

    // Neck & Head
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 1.15, 0.55);

    const neck = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.65, 0.35), whiteMat);
    neck.position.set(0, 0.25, 0.1);
    neck.rotation.x = 0.3;
    headGroup.add(neck);

    // Black & White striped mane
    const mane = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.65, 0.12), blackMat);
    mane.position.set(0, 0.32, -0.06);
    mane.rotation.x = 0.3;
    headGroup.add(mane);

    const head = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.36, 0.48), whiteMat);
    head.position.set(0, 0.55, 0.28);
    headGroup.add(head);

    const muzzle = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.22, 0.2), blackMat);
    muzzle.position.set(0, 0.48, 0.55);
    headGroup.add(muzzle);

    root.add(headGroup);

    // 4 Striped Legs
    for (const [lx, lz] of [[-0.22, 0.4], [0.22, 0.4], [-0.22, -0.4], [0.22, -0.4]]) {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.75, 0.18), whiteMat);
      leg.position.set(lx, 0.38, lz);
      root.add(leg);
      const hoof = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.12, 0.2), blackMat);
      hoof.position.set(lx, 0.06, lz);
      root.add(hoof);
    }

    const tag = this.createNameTag(name, species, '#a855f7');
    tag.position.set(0, 2.0, 0.6);
    root.add(tag);

    this.scene.add(root);

    const entity: AnimalEntity = {
      group: root,
      type: 'zebra',
      name,
      species,
      basePos: new THREE.Vector3(x, groundY, z),
      heading: 0,
      update: (time, _playerPos) => {
        headGroup.rotation.x = Math.sin(time * 1.5 + x) * 0.08;
      }
    };

    this.animals.push(entity);
  }

  // ==========================================
  // 10. GREATER FLAMINGO (Phoenicopterus roseus)
  // ==========================================
  private createFlamingo(x: number, y: number, z: number, name: string, species: string, scale: number = 0.9) {
    const groundY = this.getGroundHeight(x, z, y);
    const root = new THREE.Group();
    root.position.set(x, groundY, z);
    root.scale.setScalar(scale);

    const pinkMat = new THREE.MeshLambertMaterial({ color: 0xf43f5e });
    const lightPinkMat = new THREE.MeshLambertMaterial({ color: 0xfbcfe8 });
    const blackMat = new THREE.MeshLambertMaterial({ color: 0x0f172a });

    // Coral Pink Oval Body
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.35, 0.55), pinkMat);
    body.position.set(0, 0.85, 0);
    body.castShadow = true;
    root.add(body);

    // Wings
    const wingL = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.28, 0.45), lightPinkMat);
    wingL.position.set(-0.21, 0.88, 0.02);
    root.add(wingL);
    const wingR = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.28, 0.45), lightPinkMat);
    wingR.position.set(0.21, 0.88, 0.02);
    root.add(wingR);

    // Graceful S-Curved Neck Group
    const neckGroup = new THREE.Group();
    neckGroup.position.set(0, 0.95, 0.25);

    const neckLower = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.45, 0.12), pinkMat);
    neckLower.position.set(0, 0.2, 0.08);
    neckLower.rotation.x = -0.35;
    neckGroup.add(neckLower);

    const neckUpper = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.4, 0.11), pinkMat);
    neckUpper.position.set(0, 0.5, 0.16);
    neckUpper.rotation.x = 0.35;
    neckGroup.add(neckUpper);

    // Head & Curved Beak
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.18, 0.24), pinkMat);
    head.position.set(0, 0.72, 0.15);
    neckGroup.add(head);

    const beak = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.12, 0.22), lightPinkMat);
    beak.position.set(0, 0.65, 0.26);
    beak.rotation.x = 0.5;
    neckGroup.add(beak);

    const beakTip = new THREE.Mesh(new THREE.BoxGeometry(0.095, 0.1, 0.1), blackMat);
    beakTip.position.set(0, 0.58, 0.32);
    beakTip.rotation.x = 0.5;
    neckGroup.add(beakTip);

    root.add(neckGroup);

    // Slender Stilt Legs (standing gracefully in water)
    const legL = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.85, 0.06), lightPinkMat);
    legL.position.set(-0.09, 0.42, 0);
    root.add(legL);

    const legR = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.85, 0.06), lightPinkMat);
    legR.position.set(0.09, 0.42, 0);
    root.add(legR);

    const tag = this.createNameTag(name, species, '#f43f5e');
    tag.position.set(0, 1.9, 0.2);
    root.add(tag);

    this.scene.add(root);

    const entity: AnimalEntity = {
      group: root,
      type: 'flamingo',
      name,
      species,
      basePos: new THREE.Vector3(x, groundY, z),
      heading: 0,
      update: (time, _playerPos) => {
        // Subtle neck filter-feeding dip
        neckGroup.rotation.x = Math.sin(time * 1.6 + x) * 0.12;
      }
    };

    this.animals.push(entity);
  }

  // ==========================================
  // 9. ROYAL BENGAL TIGER (Panthera tigris tigris)
  // National Animal of India
  // ==========================================
  private createTiger(x: number, y: number, z: number, name: string, species: string, scale: number = 1.0) {
    const groundY = this.getGroundHeight(x, z, y);
    const root = new THREE.Group();
    root.position.set(x, groundY, z);
    root.scale.setScalar(scale);

    const orangeMat = new THREE.MeshLambertMaterial({ color: 0xea580c });
    const blackMat = new THREE.MeshLambertMaterial({ color: 0x18181b });
    const whiteMat = new THREE.MeshLambertMaterial({ color: 0xf8fafc });
    const eyeMat = new THREE.MeshLambertMaterial({ color: 0xf59e0b });

    // Torso (sleek, muscular predator build)
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.62, 1.3), orangeMat);
    body.position.set(0, 0.72, 0);
    body.castShadow = true;
    root.add(body);

    // White underbelly
    const underbelly = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.1, 1.1), whiteMat);
    underbelly.position.set(0, 0.44, 0);
    root.add(underbelly);

    // Transverse Black Tiger Stripes on back & flanks
    for (let s = -0.4; s <= 0.4; s += 0.2) {
      const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.5, 0.08), blackMat);
      stripe.position.set(0, 0.76, s);
      root.add(stripe);
    }

    // Head Group
    const head = new THREE.Group();
    head.position.set(0, 1.08, 0.7);

    const headMesh = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.48, 0.48), orangeMat);
    head.add(headMesh);

    // White Cheeks & Chin
    const cheekL = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.22, 0.3), whiteMat);
    cheekL.position.set(-0.25, -0.1, 0.08);
    head.add(cheekL);
    const cheekR = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.22, 0.3), whiteMat);
    cheekR.position.set(0.25, -0.1, 0.08);
    head.add(cheekR);

    // Muzzle & Black Nose
    const muzzle = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.18, 0.22), whiteMat);
    muzzle.position.set(0, -0.12, 0.3);
    head.add(muzzle);
    const nose = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.08, 0.06), blackMat);
    nose.position.set(0, -0.06, 0.42);
    head.add(nose);

    // Amber Piercing Eyes
    const eyeL = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.04), eyeMat);
    eyeL.position.set(-0.16, 0.08, 0.25);
    head.add(eyeL);
    const eyeR = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.04), eyeMat);
    eyeR.position.set(0.16, 0.08, 0.25);
    head.add(eyeR);

    // Rounded Ears (black outside with white flash center)
    const earL = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.14, 0.08), blackMat);
    earL.position.set(-0.22, 0.28, -0.05);
    head.add(earL);
    const earR = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.14, 0.08), blackMat);
    earR.position.set(0.22, 0.28, -0.05);
    head.add(earR);

    root.add(head);

    // 4 Muscular Paws & Legs
    const legOffsets: [number, number][] = [[-0.28, 0.45], [0.28, 0.45], [-0.28, -0.45], [0.28, -0.45]];
    for (const [lx, lz] of legOffsets) {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.58, 0.24), orangeMat);
      leg.position.set(lx, 0.32, lz);
      // White paw
      const paw = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.12, 0.26), whiteMat);
      paw.position.set(0, -0.24, 0.02);
      leg.add(paw);
      root.add(leg);
    }

    // Articulated Swishing Tail
    const tailGroup = new THREE.Group();
    tailGroup.position.set(0, 0.85, -0.65);
    const tailSeg1 = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.12, 0.45), orangeMat);
    tailSeg1.position.set(0, -0.15, -0.2);
    tailSeg1.rotation.x = -0.4;
    tailGroup.add(tailSeg1);
    const tailTip = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.35), blackMat);
    tailTip.position.set(0, -0.1, -0.4);
    tailTip.rotation.x = 0.5;
    tailSeg1.add(tailTip);
    root.add(tailGroup);

    // Overhead Name Tag
    const tag = this.createNameTag(name, species, '#f97316');
    tag.position.set(0, 1.85, 0.3);
    root.add(tag);

    this.scene.add(root);

    const basePosY = groundY;
    const entity: AnimalEntity = {
      group: root,
      type: 'tiger',
      name,
      species,
      basePos: new THREE.Vector3(x, groundY, z),
      heading: 0,
      update: (time, playerPos) => {
        // Subtle predatory breathing
        root.position.y = basePosY + Math.sin(time * 2.4 + x) * 0.02;
        // Tail swishing
        tailGroup.rotation.y = Math.sin(time * 3.0 + z) * 0.35;

        const dist = root.position.distanceTo(playerPos);
        if (dist < 10) {
          const dx = playerPos.x - root.position.x;
          const dz = playerPos.z - root.position.z;
          head.rotation.y = Math.atan2(dx, dz) * 0.4;
          head.rotation.x = -0.05;
        } else {
          head.rotation.y = Math.sin(time * 0.8) * 0.12;
          head.rotation.x = 0;
        }
      }
    };

    this.animals.push(entity);
  }

  // ==========================================
  // 10. INDIAN PEACOCK (Pavo cristatus)
  // National Bird of India
  // ==========================================
  private createPeacock(x: number, y: number, z: number, name: string, species: string, scale: number = 1.0) {
    const groundY = this.getGroundHeight(x, z, y);
    const root = new THREE.Group();
    root.position.set(x, groundY, z);
    root.scale.setScalar(scale);

    const blueMat = new THREE.MeshLambertMaterial({ color: 0x1d4ed8 }); // Radiant royal cobalt blue
    const emeraldMat = new THREE.MeshLambertMaterial({ color: 0x059669 }); // Rich emerald plumage
    const goldMat = new THREE.MeshLambertMaterial({ color: 0xfacc15 }); // Gold crown crest & beak
    const ocelliMat = new THREE.MeshLambertMaterial({ color: 0x1e1b4b }); // Eye spots
    const legMat = new THREE.MeshLambertMaterial({ color: 0xd97706 });

    // Body
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.42, 0.55), blueMat);
    body.position.set(0, 0.6, 0);
    body.castShadow = true;
    root.add(body);

    // Graceful Upright Neck & Head Group
    const neckGroup = new THREE.Group();
    neckGroup.position.set(0, 0.72, 0.22);

    const neck = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.45, 0.18), blueMat);
    neck.position.set(0, 0.2, 0.06);
    neck.rotation.x = 0.25;
    neckGroup.add(neck);

    const head = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.18, 0.22), blueMat);
    head.position.set(0, 0.42, 0.16);
    neckGroup.add(head);

    // Golden Beak
    const beak = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.06, 0.14), goldMat);
    beak.position.set(0, 0.38, 0.28);
    neckGroup.add(beak);

    // Crown Crest of Fan Feathers
    const crest = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.14, 0.04), goldMat);
    crest.position.set(0, 0.54, 0.16);
    neckGroup.add(crest);

    root.add(neckGroup);

    // Spectacular Fan Train Plumage behind
    const trainGroup = new THREE.Group();
    trainGroup.position.set(0, 0.65, -0.25);

    // Fan of upright emerald feathers
    const fan = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.9, 0.08), emeraldMat);
    fan.position.set(0, 0.45, -0.15);
    fan.rotation.x = 0.35;
    trainGroup.add(fan);

    // Dotted eye-spots (ocelli) across fan
    for (const [ox, oy] of [[-0.4, 0.6], [-0.15, 0.75], [0.15, 0.75], [0.4, 0.6], [0, 0.45], [-0.3, 0.3], [0.3, 0.3]]) {
      const eyeSpot = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.14, 0.09), ocelliMat);
      eyeSpot.position.set(ox, oy, -0.15);
      eyeSpot.rotation.x = 0.35;
      trainGroup.add(eyeSpot);

      const goldDot = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.1), goldMat);
      goldDot.position.set(ox, oy, -0.14);
      goldDot.rotation.x = 0.35;
      trainGroup.add(goldDot);
    }

    root.add(trainGroup);

    // Legs
    const legL = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.45, 0.06), legMat);
    legL.position.set(-0.12, 0.22, 0);
    root.add(legL);
    const legR = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.45, 0.06), legMat);
    legR.position.set(0.12, 0.22, 0);
    root.add(legR);

    // Overhead Name Tag
    const tag = this.createNameTag(name, species, '#10b981');
    tag.position.set(0, 1.75, 0.2);
    root.add(tag);

    this.scene.add(root);

    const basePosY = groundY;
    const entity: AnimalEntity = {
      group: root,
      type: 'peacock',
      name,
      species,
      basePos: new THREE.Vector3(x, groundY, z),
      heading: 0,
      update: (time, _playerPos) => {
        // Proud bird breathing & train plumage shimmering sway
        root.position.y = basePosY + Math.sin(time * 2.8 + x) * 0.015;
        trainGroup.rotation.y = Math.sin(time * 1.8 + z) * 0.14;
        neckGroup.rotation.z = Math.sin(time * 2.0 + x) * 0.08;
      }
    };

    this.animals.push(entity);
  }

  // ==========================================
  // 11. CAPARISONED TEMPLE ELEPHANT (Elephas maximus indicus)
  // Sacred South Indian Temple Elephant
  // ==========================================
  private createTempleElephant(x: number, y: number, z: number, name: string, species: string, scale: number = 1.0) {
    const groundY = this.getGroundHeight(x, z, y);
    const root = new THREE.Group();
    root.position.set(x, groundY, z);
    root.scale.setScalar(scale);

    const greyMat = new THREE.MeshLambertMaterial({ color: 0x64748b });
    const darkGreyMat = new THREE.MeshLambertMaterial({ color: 0x475569 });
    const ivoryMat = new THREE.MeshLambertMaterial({ color: 0xffffff });
    const goldMat = new THREE.MeshLambertMaterial({ color: 0xfacc15 }); // Gold Nettipattam & bells
    const silkMat = new THREE.MeshLambertMaterial({ color: 0xdc2626 }); // Crimson silk Jhool
    const greenMat = new THREE.MeshLambertMaterial({ color: 0x16a34a }); // Saffron/Emerald trim

    // Massive Elephant Body
    const body = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.35, 1.9), greyMat);
    body.position.set(0, 1.45, 0);
    body.castShadow = true;
    root.add(body);

    // Ornate Ceremonial Jhool (Embroidered Silk Saddle Cloth)
    const jhool = new THREE.Mesh(new THREE.BoxGeometry(1.46, 0.95, 1.4), silkMat);
    jhool.position.set(0, 1.6, 0);
    root.add(jhool);

    // Golden decorative borders & medallions on Jhool
    const jhoolTrim = new THREE.Mesh(new THREE.BoxGeometry(1.48, 0.16, 1.42), goldMat);
    jhoolTrim.position.set(0, 1.15, 0);
    root.add(jhoolTrim);
    const jhoolCenter = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.4, 0.4), greenMat);
    jhoolCenter.position.set(0, 1.5, 0);
    root.add(jhoolCenter);

    // Head Group
    const head = new THREE.Group();
    head.position.set(0, 1.78, 1.15);

    const headMesh = new THREE.Mesh(new THREE.BoxGeometry(1.0, 1.0, 0.9), greyMat);
    head.add(headMesh);

    // Radiant Golden Nettipattam (Temple Elephant Forehead Plate)
    const nettipattam = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.78, 0.08), goldMat);
    nettipattam.position.set(0, 0.1, 0.47);
    nettipattam.rotation.x = -0.1;
    head.add(nettipattam);

    // Central jewel on forehead
    const foreheadJewel = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.18, 0.12), silkMat);
    foreheadJewel.position.set(0, 0.15, 0.5);
    head.add(foreheadJewel);

    // Ears
    const earL = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.85, 0.65), darkGreyMat);
    earL.position.set(-0.58, 0.08, -0.15);
    earL.rotation.y = 0.25;
    head.add(earL);

    const earR = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.85, 0.65), darkGreyMat);
    earR.position.set(0.58, 0.08, -0.15);
    earR.rotation.y = -0.25;
    head.add(earR);

    // Pure White Sacred Ivory Tusks
    const tuskL = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.65), ivoryMat);
    tuskL.position.set(-0.35, -0.38, 0.6);
    tuskL.rotation.x = 0.35;
    head.add(tuskL);

    const tuskR = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.65), ivoryMat);
    tuskR.position.set(0.35, -0.38, 0.6);
    tuskR.rotation.x = 0.35;
    head.add(tuskR);

    // Articulated Blessing Trunk with golden tip
    const trunkRoot = new THREE.Group();
    trunkRoot.position.set(0, -0.2, 0.5);

    const trunk1 = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.55, 0.28), greyMat);
    trunk1.position.set(0, -0.25, 0);
    trunkRoot.add(trunk1);

    const trunk2 = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.5, 0.24), greyMat);
    trunk2.position.set(0, -0.7, 0.1);
    trunk2.rotation.x = 0.45;
    trunkRoot.add(trunk2);

    const trunkTip = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.35, 0.2), goldMat); // Sacred golden blessing bell/ring
    trunkTip.position.set(0, -1.0, 0.32);
    trunkTip.rotation.x = 0.85;
    trunkRoot.add(trunkTip);

    head.add(trunkRoot);
    root.add(head);

    // 4 Columnar Pillar Legs
    const legFL = new THREE.Mesh(new THREE.BoxGeometry(0.38, 1.15, 0.38), greyMat);
    legFL.position.set(-0.48, 0.58, 0.65);
    root.add(legFL);
    const legFR = new THREE.Mesh(new THREE.BoxGeometry(0.38, 1.15, 0.38), greyMat);
    legFR.position.set(0.48, 0.58, 0.65);
    root.add(legFR);
    const legBL = new THREE.Mesh(new THREE.BoxGeometry(0.38, 1.15, 0.38), greyMat);
    legBL.position.set(-0.48, 0.58, -0.65);
    root.add(legBL);
    const legBR = new THREE.Mesh(new THREE.BoxGeometry(0.38, 1.15, 0.38), greyMat);
    legBR.position.set(0.48, 0.58, -0.65);
    root.add(legBR);

    // Golden Ankle Bangles on front legs
    const ankletL = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.12, 0.42), goldMat);
    ankletL.position.set(-0.48, 0.12, 0.65);
    root.add(ankletL);
    const ankletR = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.12, 0.42), goldMat);
    ankletR.position.set(0.48, 0.12, 0.65);
    root.add(ankletR);

    // Overhead Name Tag
    const tag = this.createNameTag(name, species, '#eab308');
    tag.position.set(0, 2.7, 0.3);
    root.add(tag);

    this.scene.add(root);

    const basePosY = groundY;
    const entity: AnimalEntity = {
      group: root,
      type: 'temple_elephant',
      name,
      species,
      basePos: new THREE.Vector3(x, groundY, z),
      heading: 0,
      update: (time, _playerPos) => {
        // Slow majestic breathing
        root.position.y = basePosY + Math.sin(time * 1.5 + x) * 0.025;
        // Ear flapping
        earL.rotation.y = 0.25 + Math.sin(time * 2.2) * 0.12;
        earR.rotation.y = -0.25 - Math.sin(time * 2.2) * 0.12;
        // Trunk waving in blessing
        trunkRoot.rotation.x = Math.sin(time * 2.0) * 0.18;
      }
    };

    this.animals.push(entity);
  }
}
