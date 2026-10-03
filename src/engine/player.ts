import * as THREE from 'three';
import { VoxelWorld, ProjectBanner } from '../world/world';
import { sound } from './audio';
import { Project } from '../data/portfolioData';

export interface TargetInfo {
  blockPos: THREE.Vector3;
  faceNormal: THREE.Vector3;
  distance: number;
  blockType?: string;
  targetBanner?: ProjectBanner;
  interactable?: {
    type: 'project' | 'experience' | 'skills' | 'chest' | 'sign' | 'teleport' | 'npc' | 'minigame' | 'research' | 'leadership' | 'interests' | 'languages';
    id?: string;
    title?: string;
    text?: string;
  };
}

export class Player {
  public camera: THREE.PerspectiveCamera;
  public world: VoxelWorld;
  public domElement: HTMLElement;

  // Position & Movement
  public position: THREE.Vector3 = new THREE.Vector3(0, 1.8, 4); // start near spawn
  public velocity: THREE.Vector3 = new THREE.Vector3();
  public pitch: number = 0;
  public yaw: number = 0;

  // State flags
  public isGrounded: boolean = false;
  public isFlying: boolean = false;
  public isSneaking: boolean = false;
  public isSprinting: boolean = false;
  public isLocked: boolean = false;

  // Dimensions
  public height: number = 1.8;
  public radius: number = 0.3;
  public eyeHeight: number = 1.62;

  // Input states
  private keys: { [key: string]: boolean } = {};
  private lastSpaceTime: number = 0;
  private lastWTime: number = 0;

  // Targeting & Raycasting
  public currentTarget: TargetInfo | null = null;
  private blockHighlight: THREE.LineSegments | null = null;

  // First-person hand / item in viewport
  public handGroup: THREE.Group = new THREE.Group();
  public heldItemMesh: THREE.Mesh | null = null;
  private swingProgress: number = 0;
  private isSwinging: boolean = false;
  private walkBobTime: number = 0;
  private lastFootstepDist: number = 0;

  // Selected hotbar block
  public selectedBlockType: string = 'cobblestone';

  // Callback hooks for UI
  public onInteract?: (target: TargetInfo) => void;
  public onHammerBanner?: (project: Project) => void;
  public onHotbarSelect?: (slotIndex: number) => void;

  constructor(camera: THREE.PerspectiveCamera, world: VoxelWorld, domElement: HTMLElement) {
    this.camera = camera;
    this.world = world;
    this.domElement = domElement;

    this.setupPointerLock();
    this.setupKeyboard();
    this.setupFirstPersonHand();
    this.setupBlockHighlight();
  }

  private setupPointerLock() {
    const playBtn = document.getElementById('play-button');
    const pauseOverlay = document.getElementById('pause-overlay');

    const requestLock = () => {
      if (!this.isLocked) {
        this.domElement.requestPointerLock();
      }
    };

    playBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      requestLock();
    });

    document.addEventListener('pointerlockchange', () => {
      this.isLocked = document.pointerLockElement === this.domElement;
      if (pauseOverlay) {
        const modalContainer = document.getElementById('modal-container');
        const isModalOpen = modalContainer && modalContainer.style.display === 'flex';
        pauseOverlay.style.display = (this.isLocked || isModalOpen) ? 'none' : 'flex';
      }
    });

    document.addEventListener('mousemove', (e) => {
      if (!this.isLocked) return;

      const sensitivity = 0.0022;
      this.yaw -= e.movementX * sensitivity;
      this.pitch -= e.movementY * sensitivity;

      // Clamp pitch to [-89deg, +89deg]
      const maxPitch = Math.PI / 2 - 0.02;
      this.pitch = Math.max(-maxPitch, Math.min(maxPitch, this.pitch));
    });

    // Window mousedown listener: works across all browsers & macOS trackpads
    window.addEventListener('mousedown', (e) => {
      if (!this.isLocked) return;

      const isRight = e.button === 2 || (e.button === 0 && e.ctrlKey);
      const isLeft = e.button === 0 && !e.ctrlKey;

      if (isLeft) {
        this.triggerSwing();
        if (this.currentTarget?.targetBanner) {
          // Hammer project banner to launch live site!
          const banner = this.currentTarget.targetBanner;
          this.world.spawnHammerSparkles(banner.mesh.position.x, banner.mesh.position.y, banner.mesh.position.z);
          sound.playBlockBreak();
          sound.playLevelUp();
          if (this.onHammerBanner) {
            this.onHammerBanner(banner.project);
          }
          if (banner.project.liveUrl) {
            try {
              window.open(banner.project.liveUrl, '_blank');
              // Free cursor immediately so user can navigate to the newly opened tab!
              if (document.pointerLockElement) {
                document.exitPointerLock();
              }
            } catch (err) {
              console.warn('Popup blocked:', err);
            }
          }
        } else if (this.currentTarget) {
          const { x, y, z } = this.currentTarget.blockPos;
          this.world.breakBlock(x, y, z);
          sound.playBlockBreak();
        }
      } else if (isRight) {
        e.preventDefault();
        this.triggerSwing();
        this.handleRightClick();
      }
    });

    // Prevent context menu while pointer locked
    window.addEventListener('contextmenu', (e) => {
      if (this.isLocked) {
        e.preventDefault();
      }
    });

    // Scroll wheel to cycle hotbar
    this.domElement.addEventListener('wheel', (e) => {
      if (!this.isLocked) return;
      const dir = Math.sign(e.deltaY);
      if (dir !== 0 && this.onHotbarSelect) {
        this.onHotbarSelect(dir > 0 ? 1 : -1);
      }
    });
  }

  private setupKeyboard() {
    window.addEventListener('keydown', (e) => {
      this.keys[e.code] = true;

      // Number keys 1-9
      if (e.key >= '1' && e.key <= '9') {
        const slot = parseInt(e.key, 10) - 1;
        if (this.onHotbarSelect) {
          this.onHotbarSelect(slot);
        }
      }

      // Fly toggle on 'KeyF'
      if (e.code === 'KeyF') {
        this.isFlying = !this.isFlying;
        this.velocity.set(0, 0, 0);
      }

      // Space double-tap for fly toggle
      if (e.code === 'Space') {
        const now = performance.now();
        if (now - this.lastSpaceTime < 280) {
          this.isFlying = !this.isFlying;
          this.velocity.set(0, 0, 0);
        }
        this.lastSpaceTime = now;
      }

      // W double-tap for sprint
      if (e.code === 'KeyW') {
        const now = performance.now();
        if (now - this.lastWTime < 280) {
          this.isSprinting = true;
        }
        this.lastWTime = now;
      }

      // 'KeyE' for interact
      if (e.code === 'KeyE') {
        if (this.currentTarget && this.onInteract) {
          this.onInteract(this.currentTarget);
          if (document.pointerLockElement) {
            document.exitPointerLock();
          }
        }
      }

      // 'KeyR' or 'KeyQ' for place block (keyboard alternative to right-click)
      if (e.code === 'KeyR' || e.code === 'KeyQ') {
        if (this.isLocked) {
          e.preventDefault();
          this.triggerSwing();
          this.handleRightClick();
        }
      }

      // 'F2' for instant screenshot capture & download
      if (e.code === 'F2') {
        e.preventDefault();
        this.takeScreenshot();
      }

      // Escape to release pointer lock and free cursor
      if (e.code === 'Escape') {
        if (document.pointerLockElement) {
          document.exitPointerLock();
        }
      }
    });

    window.addEventListener('keyup', (e) => {
      this.keys[e.code] = false;
      if (e.code === 'KeyW' && !this.keys['ControlLeft']) {
        this.isSprinting = false;
      }
    });
  }

  // Create First-Person Player Hand / Pickaxe in screen corner
  private setupFirstPersonHand() {
    this.handGroup = new THREE.Group();
    this.handGroup.position.set(0.38, -0.32, -0.6);

    // Default: Holding Diamond Pickaxe
    const pickaxeGroup = new THREE.Group();

    // Wooden handle
    const handleGeo = new THREE.BoxGeometry(0.04, 0.45, 0.04);
    const handleMat = new THREE.MeshLambertMaterial({ color: 0x8b5a2b });
    const handle = new THREE.Mesh(handleGeo, handleMat);
    handle.position.set(0, 0.15, 0);
    pickaxeGroup.add(handle);

    // Diamond pick head
    const headGeo = new THREE.BoxGeometry(0.32, 0.08, 0.06);
    const headMat = new THREE.MeshLambertMaterial({ color: 0x38bdf8 });
    const head = new THREE.Mesh(headGeo, headMat);
    head.position.set(0, 0.38, 0);
    pickaxeGroup.add(head);

    // Tilt into natural held angle
    pickaxeGroup.rotation.set(-0.35, 0.3, -0.4);
    this.handGroup.add(pickaxeGroup);

    // Attach hand group as child of camera
    this.camera.add(this.handGroup);
  }

  // Set the 3D block wireframe highlight
  private setupBlockHighlight() {
    const geo = new THREE.BoxGeometry(1.005, 1.005, 1.005);
    const edges = new THREE.EdgesGeometry(geo);
    const mat = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 2 });
    this.blockHighlight = new THREE.LineSegments(edges, mat);
    this.blockHighlight.visible = false;
    this.world.scene.add(this.blockHighlight);
  }

  // Trigger arm swing
  public triggerSwing() {
    if (!this.isSwinging) {
      this.isSwinging = true;
      this.swingProgress = 0;
    }
  }

  private handleRightClick() {
    if (!this.currentTarget) return;

    // 1. If pointing at a hammerable project banner
    if (this.currentTarget.targetBanner) {
      const banner = this.currentTarget.targetBanner;
      if (this.onHammerBanner) {
        this.onHammerBanner(banner.project);
      }
      if (this.onInteract) {
        this.onInteract({
          blockPos: this.currentTarget.blockPos,
          faceNormal: this.currentTarget.faceNormal,
          distance: this.currentTarget.distance,
          interactable: { type: 'project', id: banner.project.id }
        });
      }
      return;
    }

    // 2. If pointing at an interactive object (chest, project pedestal, sign, etc.)
    if (this.currentTarget.interactable && this.onInteract) {
      this.onInteract(this.currentTarget);
      return;
    }

    // 3. Otherwise: place block against targeted face!
    const targetPos = this.currentTarget.blockPos.clone().add(this.currentTarget.faceNormal);

    // Collision check against player core body: only prevent placement if target block overlaps player core
    const playerFeet = this.position.y;
    const playerHead = this.position.y + (this.isSneaking ? this.height * 0.8 : this.height);
    const playerCoreBox = new THREE.Box3(
      new THREE.Vector3(this.position.x - 0.15, playerFeet, this.position.z - 0.15),
      new THREE.Vector3(this.position.x + 0.15, playerHead, this.position.z + 0.15)
    );
    const newBlockBox = new THREE.Box3(
      targetPos,
      targetPos.clone().add(new THREE.Vector3(1, 1, 1))
    );

    if (!playerCoreBox.intersectsBox(newBlockBox)) {
      const blockToPlace = this.selectedBlockType || 'cobblestone';
      this.world.placeBlock(targetPos.x, targetPos.y, targetPos.z, blockToPlace);
      sound.playBlockPlace();
      this.triggerSwing();
    }
  }

  // Capture high-definition 3D screenshot and save as PNG file
  public takeScreenshot() {
    const canvas = this.domElement as HTMLCanvasElement;
    if (!canvas) return;

    try {
      const dataUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.download = `minecraft-portfolio-${Date.now()}.png`;
      a.href = dataUrl;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      sound.playLevelUp();
      if (document.pointerLockElement) {
        document.exitPointerLock();
      }
    } catch (err) {
      console.error('Failed to take screenshot:', err);
    }
  }

  // Update physics, movement, collision, and raycasting each frame
  public update(dt: number) {
    if (dt > 0.1) dt = 0.1; // prevent physics blowout on lag

    this.updateMovement(dt);
    this.updateRaycast();
    this.updateHandAnimation(dt);
  }

  private updateMovement(dt: number) {
    // Determine movement direction relative to camera yaw
    const forward = new THREE.Vector3(-Math.sin(this.yaw), 0, -Math.cos(this.yaw)).normalize();
    const right = new THREE.Vector3(Math.cos(this.yaw), 0, -Math.sin(this.yaw)).normalize();

    let moveDir = new THREE.Vector3();
    if (this.keys['KeyW']) moveDir.add(forward);
    if (this.keys['KeyS']) moveDir.sub(forward);
    if (this.keys['KeyD']) moveDir.add(right);
    if (this.keys['KeyA']) moveDir.sub(right);

    const isMoving = moveDir.lengthSq() > 0;
    if (isMoving) moveDir.normalize();

    // Speed calculation
    let baseSpeed = 4.3; // standard Minecraft walking speed (m/s)
    this.isSneaking = !!this.keys['ShiftLeft'];
    this.isSprinting = (!!this.keys['ControlLeft'] || this.isSprinting) && this.keys['KeyW'] && !this.isSneaking;

    if (this.isFlying) {
      baseSpeed = 10.0;
    } else if (this.isSprinting) {
      baseSpeed = 6.8;
    } else if (this.isSneaking) {
      baseSpeed = 1.6;
    }

    // Flying physics
    if (this.isFlying) {
      this.velocity.x = moveDir.x * baseSpeed;
      this.velocity.z = moveDir.z * baseSpeed;

      let flyY = 0;
      if (this.keys['Space']) flyY += baseSpeed;
      if (this.keys['ShiftLeft']) flyY -= baseSpeed;
      this.velocity.y = flyY;

      this.position.addScaledVector(this.velocity, dt);
      this.updateCameraTransform();
      return;
    }

    // Normal walking / jumping physics
    const acceleration = 40.0;
    const friction = 14.0;

    if (isMoving) {
      this.velocity.x += moveDir.x * acceleration * dt;
      this.velocity.z += moveDir.z * acceleration * dt;

      // Clamp horizontal speed
      const horizontalSpeed = Math.sqrt(this.velocity.x * this.velocity.x + this.velocity.z * this.velocity.z);
      if (horizontalSpeed > baseSpeed) {
        const factor = baseSpeed / horizontalSpeed;
        this.velocity.x *= factor;
        this.velocity.z *= factor;
      }
    } else {
      // Apply friction
      this.velocity.x -= this.velocity.x * friction * dt;
      this.velocity.z -= this.velocity.z * friction * dt;
      if (Math.abs(this.velocity.x) < 0.05) this.velocity.x = 0;
      if (Math.abs(this.velocity.z) < 0.05) this.velocity.z = 0;
    }

    // Gravity: constantly pull player down towards ground
    const gravity = 28.0;
    this.velocity.y -= gravity * dt;
    if (this.velocity.y < -35.0) this.velocity.y = -35.0; // terminal velocity

    // Jump
    if (this.isGrounded && this.keys['Space']) {
      this.velocity.y = 8.5; // authentic Minecraft jump impulse
      this.isGrounded = false;
      sound.playClick();
    }

    // Move with collision resolution
    this.moveWithCollision(dt);

    // Footstep sounds
    if (this.isGrounded && isMoving) {
      const distTraveled = Math.sqrt(this.velocity.x * this.velocity.x + this.velocity.z * this.velocity.z) * dt;
      this.lastFootstepDist += distTraveled;
      if (this.lastFootstepDist > (this.isSprinting ? 1.5 : 2.0)) {
        sound.playStep('grass');
        this.lastFootstepDist = 0;
      }
    }

    this.updateCameraTransform();
  }

  // Robust Minecraft Voxel Collision & Ground Snapping
  private moveWithCollision(dt: number) {
    // 1. Vertical resolution (Y axis)
    const proposedY = this.position.y + this.velocity.y * dt;
    const r = this.radius * 0.85;

    if (this.velocity.y <= 0) {
      // Falling down: check floor beneath feet
      let groundY: number | null = null;
      const minCheckX = Math.floor(this.position.x - r);
      const maxCheckX = Math.floor(this.position.x + r);
      const minCheckZ = Math.floor(this.position.z - r);
      const maxCheckZ = Math.floor(this.position.z + r);
      const checkY = Math.floor(proposedY);

      for (let x = minCheckX; x <= maxCheckX; x++) {
        for (let z = minCheckZ; z <= maxCheckZ; z++) {
          if (this.world.hasSolidBlock(x, checkY, z)) {
            const topOfBlock = checkY + 1.0;
            if (groundY === null || topOfBlock > groundY) {
              groundY = topOfBlock;
            }
          }
        }
      }

      if (groundY !== null && proposedY <= groundY) {
        // Firmly snap to ground!
        this.position.y = groundY;
        this.velocity.y = 0;
        this.isGrounded = true;
      } else {
        this.position.y = proposedY;
        this.isGrounded = false;
      }
    } else {
      // Rising up: check ceiling above head
      const headY = proposedY + this.height;
      const checkHeadY = Math.floor(headY);
      let hitCeiling = false;

      const minCheckX = Math.floor(this.position.x - r);
      const maxCheckX = Math.floor(this.position.x + r);
      const minCheckZ = Math.floor(this.position.z - r);
      const maxCheckZ = Math.floor(this.position.z + r);

      for (let x = minCheckX; x <= maxCheckX; x++) {
        for (let z = minCheckZ; z <= maxCheckZ; z++) {
          if (this.world.hasSolidBlock(x, checkHeadY, z)) {
            hitCeiling = true;
            break;
          }
        }
      }

      if (hitCeiling) {
        this.position.y = checkHeadY - this.height;
        this.velocity.y = 0;
      } else {
        this.position.y = proposedY;
      }
      this.isGrounded = false;
    }

    // 2. Horizontal resolution: X axis
    const moveX = this.velocity.x * dt;
    if (Math.abs(moveX) > 0.0001) {
      const nextX = this.position.x + moveX;
      if (!this.checkHorizontalObstacle(nextX, this.position.y, this.position.z)) {
        this.position.x = nextX;
      } else {
        // Check step-up (only if grounded and obstacle is 1 block high with free headspace)
        if (this.isGrounded && !this.checkHorizontalObstacle(nextX, this.position.y + 1.02, this.position.z)) {
          this.position.x = nextX;
          this.position.y += 1.0;
        } else {
          this.velocity.x = 0;
        }
      }
    }

    // 3. Horizontal resolution: Z axis
    const moveZ = this.velocity.z * dt;
    if (Math.abs(moveZ) > 0.0001) {
      const nextZ = this.position.z + moveZ;
      if (!this.checkHorizontalObstacle(this.position.x, this.position.y, nextZ)) {
        this.position.z = nextZ;
      } else {
        if (this.isGrounded && !this.checkHorizontalObstacle(this.position.x, this.position.y + 1.02, nextZ)) {
          this.position.z = nextZ;
          this.position.y += 1.0;
        } else {
          this.velocity.z = 0;
        }
      }
    }

    // Void safety: respawn at spawn if falling out of world
    if (this.position.y < -20) {
      this.position.set(0, 2.0, 4);
      this.velocity.set(0, 0, 0);
    }
  }

  // Check if there is an obstacle block at the player's body level (feet + 0.1 to head - 0.1)
  private checkHorizontalObstacle(x: number, y: number, z: number): boolean {
    const r = this.radius * 0.9;
    const minX = Math.floor(x - r);
    const maxX = Math.floor(x + r);
    const minZ = Math.floor(z - r);
    const maxZ = Math.floor(z + r);

    // Only test body height, strictly ABOVE the ground floor
    const minY = Math.floor(y + 0.15);
    const maxY = Math.floor(y + this.height - 0.1);

    for (let bx = minX; bx <= maxX; bx++) {
      for (let bz = minZ; bz <= maxZ; bz++) {
        for (let by = minY; by <= maxY; by++) {
          if (this.world.hasSolidBlock(bx, by, bz)) {
            return true;
          }
        }
      }
    }
    return false;
  }

  public getPlayerBoundingBox(): THREE.Box3 {
    const curHeight = this.isSneaking ? this.height * 0.8 : this.height;
    return new THREE.Box3(
      new THREE.Vector3(this.position.x - this.radius, this.position.y, this.position.z - this.radius),
      new THREE.Vector3(this.position.x + this.radius, this.position.y + curHeight, this.position.z + this.radius)
    );
  }

  private updateCameraTransform() {
    const curEye = this.isSneaking ? 1.35 : this.eyeHeight;
    this.camera.position.set(this.position.x, this.position.y + curEye, this.position.z);

    // Apply rotation: yaw around world Y, pitch around local X
    const euler = new THREE.Euler(this.pitch, this.yaw, 0, 'YXZ');
    this.camera.quaternion.setFromEuler(euler);

    // Sprint FOV effect
    const targetFOV = this.isSprinting ? 80 : 70;
    this.camera.fov += (targetFOV - this.camera.fov) * 0.15;
    this.camera.updateProjectionMatrix();
  }

  // Fast Raycasting forwards to find targeted block & face
  private updateRaycast() {
    const maxReach = 7.5; // reach distance in blocks
    const rayDir = new THREE.Vector3();
    this.camera.getWorldDirection(rayDir);
    const origin = this.camera.position.clone();

    // 1. Check if looking at a hammerable project banner
    const banner = this.world.checkBannerHit(origin, rayDir, maxReach);
    if (banner) {
      this.currentTarget = {
        blockPos: new THREE.Vector3(Math.floor(banner.mesh.position.x), Math.floor(banner.mesh.position.y), Math.floor(banner.mesh.position.z)),
        faceNormal: new THREE.Vector3(0, 0, 1),
        distance: origin.distanceTo(banner.mesh.position),
        targetBanner: banner
      };
      if (this.blockHighlight) this.blockHighlight.visible = false;
      return;
    }

    // 2. Voxel DDA (Fast digital differential analysis) raycast
    let foundTarget: TargetInfo | null = null;
    let stepSize = 0.08;

    for (let d = 0.2; d <= 5.5; d += stepSize) {
      const p = origin.clone().addScaledVector(rayDir, d);
      const bx = Math.floor(p.x);
      const by = Math.floor(p.y);
      const bz = Math.floor(p.z);

      const block = this.world.getBlock(bx, by, bz);
      if (block) {
        // Calculate exact hit normal by finding which face of unit cube [bx, by, bz] was entered
        const dx0 = Math.abs(p.x - bx);
        const dx1 = Math.abs((bx + 1) - p.x);
        const dy0 = Math.abs(p.y - by);
        const dy1 = Math.abs((by + 1) - p.y);
        const dz0 = Math.abs(p.z - bz);
        const dz1 = Math.abs((bz + 1) - p.z);

        const minD = Math.min(dx0, dx1, dy0, dy1, dz0, dz1);
        const normal = new THREE.Vector3();
        if (minD === dy1) {
          normal.set(0, 1, 0); // Top face
        } else if (minD === dy0) {
          normal.set(0, -1, 0); // Bottom face
        } else if (minD === dx0) {
          normal.set(-1, 0, 0); // West face
        } else if (minD === dx1) {
          normal.set(1, 0, 0); // East face
        } else if (minD === dz0) {
          normal.set(0, 0, -1); // North face
        } else {
          normal.set(0, 0, 1); // South face
        }

        foundTarget = {
          blockPos: new THREE.Vector3(bx, by, bz),
          faceNormal: normal,
          distance: d,
          blockType: block.type,
          interactable: block.interactable
        };
        break;
      }
    }

    this.currentTarget = foundTarget;

    // Update block wireframe outline
    if (this.blockHighlight) {
      if (this.currentTarget) {
        this.blockHighlight.visible = true;
        this.blockHighlight.position.set(
          this.currentTarget.blockPos.x + 0.5,
          this.currentTarget.blockPos.y + 0.5,
          this.currentTarget.blockPos.z + 0.5
        );
      } else {
        this.blockHighlight.visible = false;
      }
    }
  }

  // First-person hand bobbing and mining swing
  private updateHandAnimation(dt: number) {
    const horizontalSpeed = Math.sqrt(this.velocity.x * this.velocity.x + this.velocity.z * this.velocity.z);

    // Walking bobbing
    if (this.isGrounded && horizontalSpeed > 0.5) {
      this.walkBobTime += dt * (this.isSprinting ? 14 : 9);
    }

    const bobX = Math.cos(this.walkBobTime * 0.5) * 0.025;
    const bobY = Math.abs(Math.sin(this.walkBobTime)) * 0.035;

    // Arm swing animation
    let swingAngle = 0;
    if (this.isSwinging) {
      this.swingProgress += dt * 10;
      if (this.swingProgress >= Math.PI) {
        this.isSwinging = false;
        this.swingProgress = 0;
      } else {
        swingAngle = Math.sin(this.swingProgress) * 0.7;
      }
    }

    this.handGroup.position.set(
      0.38 + bobX - swingAngle * 0.1,
      -0.32 + bobY - swingAngle * 0.12,
      -0.6 + swingAngle * 0.15
    );
    this.handGroup.rotation.set(-swingAngle * 0.9, swingAngle * 0.5, -swingAngle * 0.4);
  }

  // Teleport player instantly to coordinates (e.g. from Fast-Travel Map)
  public teleport(x: number, y: number, z: number) {
    this.position.set(x, y, z);
    this.velocity.set(0, 0, 0);
    this.updateCameraTransform();
  }
}
