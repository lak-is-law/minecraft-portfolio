import * as THREE from 'three';
import { DATA, PLAYER } from './data.js';
import { createContext } from './context.js';
import { createTerrainMesh, createWaterMesh, H, clamp } from './terrain.js';
import { buildLandmarks } from './models/index.js';
import { createUI } from './ui.js';
import './style.css';

export function mountMap(container, options = {}) {
  const onTravel = options.onTravel || (() => {});
  const onClose = options.onClose || (() => {});

  const ctx = createContext();

  // WebGL Renderer Setup
  let renderer = null;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
  } catch (e) {
    console.error('WebGL is not available:', e);
    throw e;
  }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;
  ctx.renderer = renderer;

  // Scene & Background
  const scene = new THREE.Scene();
  ctx.scene = scene;

  const bgCanvas = document.createElement('canvas');
  bgCanvas.width = 2;
  bgCanvas.height = 256;
  const bgCtx = bgCanvas.getContext('2d');
  const gr = bgCtx.createLinearGradient(0, 0, 0, 256);
  gr.addColorStop(0, '#4f9bd9');
  gr.addColorStop(0.55, '#a9d4ee');
  gr.addColorStop(1, '#d9ecf5');
  bgCtx.fillStyle = gr;
  bgCtx.fillRect(0, 0, 2, 256);
  const bgTex = new THREE.CanvasTexture(bgCanvas);
  bgTex.colorSpace = THREE.SRGBColorSpace;
  scene.background = bgTex;
  scene.fog = new THREE.Fog('#a9d0e6', 650, 2600);

  // Camera & Controls
  const camera = new THREE.PerspectiveCamera(40, 1, 4, 6000);
  ctx.camera = camera;

  const controls = {
    target: new THREE.Vector3(),
    minDistance: 22,
    maxDistance: 1200,
    update() {
      camera.lookAt(this.target);
    },
    getAzimuthalAngle() {
      return Math.atan2(camera.position.x - this.target.x, camera.position.z - this.target.z);
    }
  };
  ctx.controls = controls;

  // Pan / Rotate / Zoom Drag Controls on Canvas
  const el = renderer.domElement;
  const P = new Map();
  let mode = 'pan', pinch = 0;
  const off = () => camera.position.clone().sub(controls.target);

  function dolly(f, cx, cy) {
    const o = off();
    const nd = clamp(o.length() * f, controls.minDistance, controls.maxDistance);
    f = nd / o.length();
    camera.position.copy(controls.target).add(o.multiplyScalar(f));
  }

  const onContextMenu = e => e.preventDefault();
  const onPointerDownControls = e => {
    try { el.setPointerCapture(e.pointerId); } catch (_) {}
    P.set(e.pointerId, { x: e.clientX, y: e.clientY });
    mode = (e.button === 2 || e.shiftKey || e.ctrlKey) ? 'rot' : 'pan';
    if (P.size === 2) {
      const [a, b] = [...P.values()];
      pinch = Math.hypot(a.x - b.x, a.y - b.y);
    }
  };

  const onPointerMoveControls = e => {
    const p = P.get(e.pointerId);
    if (!p) return;
    const dx = e.clientX - p.x, dy = e.clientY - p.y;
    p.x = e.clientX;
    p.y = e.clientY;

    if (P.size === 2) {
      const [a, b] = [...P.values()];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (pinch > 0) dolly(pinch / d);
      pinch = d;
      return;
    }
    if (P.size > 1) return;
    const o = off();
    if (mode === 'rot') {
      const sp = new THREE.Spherical().setFromVector3(o);
      sp.theta -= dx * 0.006;
      sp.phi = clamp(sp.phi - dy * 0.005, 0.03, 1.3);
      camera.position.copy(controls.target).add(o.setFromSpherical(sp));
    } else {
      const upp = 2 * o.length() * Math.tan(camera.fov * Math.PI / 360) / el.clientHeight;
      const fw = new THREE.Vector3(-o.x, 0, -o.z).normalize();
      const rt = new THREE.Vector3().crossVectors(fw, new THREE.Vector3(0, 1, 0));
      const cph = Math.max(0.3, Math.cos(Math.atan2(Math.hypot(o.x, o.z), o.y)));
      const mv = new THREE.Vector3().addScaledVector(rt, -dx * upp).addScaledVector(fw, dy * upp / cph);
      controls.target.add(mv);
      camera.position.add(mv);
    }
  };

  const onPointerUpControls = e => {
    P.delete(e.pointerId);
    pinch = 0;
  };

  const onWheelControls = e => {
    e.preventDefault();
    dolly(Math.exp(clamp(e.deltaY, -120, 120) * 0.0012), e.clientX, e.clientY);
  };

  el.addEventListener('contextmenu', onContextMenu);
  el.addEventListener('pointerdown', onPointerDownControls);
  el.addEventListener('pointermove', onPointerMoveControls);
  el.addEventListener('pointerup', onPointerUpControls);
  el.addEventListener('pointercancel', onPointerUpControls);
  el.addEventListener('wheel', onWheelControls, { passive: false });

  // Lighting
  const hemiLight = new THREE.HemisphereLight(0xdcecff, 0x4d7a3a, 1.05);
  scene.add(hemiLight);
  ctx.hemiLight = hemiLight;

  const sun = new THREE.DirectionalLight(0xfff0d2, 2.6);
  sun.position.set(-260, 380, 220);
  sun.target.position.set(80, 0, 0);
  sun.castShadow = true;
  sun.shadow.mapSize.set(4096, 4096);
  const sc = sun.shadow.camera;
  sc.left = -480;
  sc.right = 480;
  sc.top = 330;
  sc.bottom = -330;
  sc.near = 50;
  sc.far = 1200;
  sun.shadow.bias = -0.0004;
  sun.shadow.normalBias = 0.6;
  scene.add(sun, sun.target);
  ctx.sun = sun;

  // Build Terrain, Water & Landmark Models
  createTerrainMesh(ctx);
  scene.add(ctx.terrain);

  createWaterMesh(ctx);
  scene.add(ctx.water);

  buildLandmarks(scene, ctx);

  // Initial Home View
  const HOME = { t: new THREE.Vector3(70, 0, 0), d: 640, phi: 0.9 };
  controls.target.copy(HOME.t);
  camera.position.set(HOME.t.x, HOME.d * Math.cos(HOME.phi), HOME.t.z + HOME.d * Math.sin(HOME.phi));

  // Mount UI Chrome & DOM Elements AFTER scene and terrain are ready
  const ui = createUI(container, ctx, {
    onTravel: (dest) => {
      onTravel(dest);
    },
    onClose: () => {
      onClose();
    }
  });

  const app = ui.app;
  app.prepend(renderer.domElement);

  // Bind canvas interactive click/hover listeners
  ui.bindCanvasListeners(renderer.domElement);

  // Resize Handling
  let VW = app.clientWidth || window.innerWidth,
      VH = app.clientHeight || window.innerHeight;

  function resize() {
    VW = app.clientWidth || window.innerWidth;
    VH = app.clientHeight || window.innerHeight;
    if (renderer) renderer.setSize(VW, VH);
    camera.aspect = VW / VH;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize);
  resize();

  // Animation Loop State
  let animId = null;
  let isPaused = false;
  let __fc = 0;
  const clock0 = performance.now();

  function frame(now) {
    if (isPaused) return;
    animId = requestAnimationFrame(frame);
    const t = (now - clock0) / 1000;

    ui.stepTween(now);
    controls.update();
    if (ctx.waterMat) ctx.waterMat.uniforms.t.value = t;

    // Flag wave
    ctx.flags.forEach(f => {
      if (!f.g.visible) return;
      const a = f.cl.geometry.attributes.position, b = f.base0;
      for (let k = 0; k < a.count; k++) {
        const x = b[k * 3];
        a.setZ(k, Math.sin(x * 0.6 - t * 4 + f.i) * 0.18 * x);
        a.setY(k, b[k * 3 + 1] + Math.sin(x * 0.5 - t * 3 + f.i) * 0.12 * x);
      }
      a.needsUpdate = true;
    });

    // Spinners & Tickers
    ctx.spinners.forEach(s => s.rotation.z += 0.002);
    ctx.tickers.forEach(fn => fn(t));

    // Player marker
    if (ctx.youG) ctx.youG.children[0].rotation.y += 0.02;
    if (ctx.arrowG) ctx.arrowG.position.y = 9 + Math.sin(t * 2) * 1.2;

    // McQueen car orbit
    if (ctx.carOrbit) {
      const a = t * 0.9;
      ctx.carOrbit.position.set(Math.cos(a) * 15.5, 0.5, Math.sin(a) * 15.5);
      ctx.carOrbit.rotation.y = -a - Math.PI / 2;
    }

    // Train on rail curve
    if (ctx.railCurve && ctx.train) {
      const u = (t * 0.02) % 1;
      const p = ctx.railCurve.getPoint(u), tg = ctx.railCurve.getTangent(u);
      ctx.train.position.set(p.x, H(p.x, p.z, ctx) + 1.9, p.z);
      ctx.train.rotation.y = Math.atan2(tg.x, tg.z) + Math.PI;
    }

    // Ships & Sea Monster
    ctx.ships.forEach((s, i) => {
      if (s.userData.sea) {
        s.position.y = Math.sin(t * 1.2) * 1.4;
      } else {
        s.position.y = 0.2 + Math.sin(t * 1.1 + i) * 0.5;
        s.rotation.z = Math.sin(t * 0.9 + i) * 0.04;
      }
    });

    // Volcano smoke & lava
    if (ctx.volTop != null) {
      ctx.smokes.forEach(s => {
        const p = (s.userData.p + t * 0.045) % 1;
        s.position.set(15.59 + Math.sin(p * 6 + s.userData.p * 9) * 4 + p * 18, ctx.volTop + 4 + p * 70, -157.79 + p * 6);
        const sc2 = 14 + p * 46;
        s.scale.set(sc2, sc2, 1);
        s.material.opacity = 0.7 * (1 - p);
      });
    }

    ctx.clouds.forEach(c => {
      c.position.x += c.userData.v * 0.04;
      if (c.position.x > 900) c.position.x = -700;
    });

    if (ctx.lava) ctx.lava.intensity = 800 + Math.sin(t * 5) * 160;

    const dial = container.querySelector('#dial');
    if (dial) dial.style.transform = `rotate(${controls.getAzimuthalAngle() * 180 / Math.PI}deg)`;

    const dd = camera.position.distanceTo(controls.target);
    const upp = 2 * dd * Math.tan(camera.fov * Math.PI / 360) / VH;
    const scB = container.querySelector('#sc-b');
    if (scB) scB.style.width = (50 / upp) + 'px';

    ui.updateLabels(VW, VH);
    if ((__fc = (__fc + 1) | 0) % 2 === 0) ui.drawMini();

    renderer.render(scene, camera);
  }

  animId = requestAnimationFrame(frame);

  // Inbound postMessage listener
  const onWindowMessage = e => {
    if (!e.data || e.data.source !== 'craftme-game') return;
    const { type, x, z, yaw } = e.data;
    if (type === 'open') {
      if (x != null && z != null) setPlayer(x, z, yaw);
      resume();
      focusPlayer();
    } else if (type === 'setPlayer') {
      if (x != null && z != null) setPlayer(x, z, yaw);
    } else if (type === 'pause') {
      pause();
    } else if (type === 'resume') {
      resume();
    }
  };
  window.addEventListener('message', onWindowMessage);

  // Public window.CraftMap API
  function setPlayer(x, z, yaw) {
    PLAYER.X = x;
    PLAYER.Z = z;
    if (yaw != null) PLAYER.yaw = yaw;
    ui.placeYou();
  }

  function pause() {
    isPaused = true;
    if (animId) {
      cancelAnimationFrame(animId);
      animId = null;
    }
  }

  function resume() {
    if (!isPaused) return;
    isPaused = false;
    animId = requestAnimationFrame(frame);
  }

  function focusPlayer() {
    ui.fly(PLAYER.X, PLAYER.Z, 160, 0.95);
  }

  window.CraftMap = {
    setPlayer,
    pause,
    resume,
    isPaused: () => isPaused,
    focusPlayer,
    waypoints: DATA,
    onTravel,
    onClose
  };

  // Signal ready to parent
  try {
    if (typeof parent !== 'undefined' && parent !== window) {
      parent.postMessage({ source: 'craftme-map', type: 'ready', waypoints: DATA.length }, '*');
    }
  } catch (_) {}

  // Cleanup & Dispose
  function dispose() {
    pause();
    window.removeEventListener('resize', resize);
    window.removeEventListener('message', onWindowMessage);

    el.removeEventListener('contextmenu', onContextMenu);
    el.removeEventListener('pointerdown', onPointerDownControls);
    el.removeEventListener('pointermove', onPointerMoveControls);
    el.removeEventListener('pointerup', onPointerUpControls);
    el.removeEventListener('pointercancel', onPointerUpControls);
    el.removeEventListener('wheel', onWheelControls);

    ui.unbindCanvasListeners(el);

    // Dispose scene objects
    scene.traverse(obj => {
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
        else obj.material.dispose();
      }
    });

    if (bgTex) bgTex.dispose();
    if (renderer) {
      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    }

    ctx.reset();
    container.innerHTML = '';
  }

  return {
    setPlayer,
    pause,
    resume,
    focusPlayer,
    dispose
  };
}
