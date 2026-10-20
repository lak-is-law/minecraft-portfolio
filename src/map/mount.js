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

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.domElement.style.imageRendering = '-webkit-optimize-contrast';
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
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
  sun.shadow.autoUpdate = false;
  sun.shadow.needsUpdate = true;
  const sc = sun.shadow.camera;
  sc.left = -340;
  sc.right = 340;
  sc.top = 220;
  sc.bottom = -220;
  sc.near = 50;
  sc.far = 1200;
  sun.shadow.bias = -0.00015;
  sun.shadow.normalBias = 0.035;
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
    if (renderer) {
      renderer.setSize(VW, VH);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    }
    camera.aspect = VW / VH;
    camera.updateProjectionMatrix();
    if (ui.onWindowResize) ui.onWindowResize();
  }
  window.addEventListener('resize', resize);
  resize();

  const dialEl = container.querySelector('#dial');
  const scBEl = container.querySelector('#sc-b');

  let lastShadowUpdate = 0;
  // Day / Night Atmosphere and Lighting Controller
  function updateSky(t) {
    const c0 = new THREE.Color('#4f9bd9').lerp(new THREE.Color('#070c18'), t);
    const c1 = new THREE.Color('#a9d4ee').lerp(new THREE.Color('#10192e'), t);
    const c2 = new THREE.Color('#d9ecf5').lerp(new THREE.Color('#192642'), t);
    const gr = bgCtx.createLinearGradient(0, 0, 0, 256);
    gr.addColorStop(0, '#' + c0.getHexString());
    gr.addColorStop(0.55, '#' + c1.getHexString());
    gr.addColorStop(1, '#' + c2.getHexString());
    bgCtx.fillStyle = gr;
    bgCtx.fillRect(0, 0, 2, 256);
    bgTex.needsUpdate = true;

    if (scene.fog) {
      scene.fog.color.copy(new THREE.Color('#a9d0e6').lerp(new THREE.Color('#0f182c'), t));
    }
    if (ctx.sun) {
      ctx.sun.color.copy(new THREE.Color('#fff0d2').lerp(new THREE.Color('#6f88c9'), t));
      ctx.sun.intensity = THREE.MathUtils.lerp(2.6, 0.35, t);
      if (ctx.sun.shadow) {
        const now = performance.now();
        if (now - lastShadowUpdate > 60) {
          ctx.sun.shadow.needsUpdate = true;
          lastShadowUpdate = now;
        }
      }
    }
    if (ctx.hemiLight) {
      ctx.hemiLight.color.copy(new THREE.Color('#dcecff').lerp(new THREE.Color('#182542'), t));
      ctx.hemiLight.groundColor.copy(new THREE.Color('#4d7a3a').lerp(new THREE.Color('#080d16'), t));
      ctx.hemiLight.intensity = THREE.MathUtils.lerp(1.05, 0.28, t);
    }
    if (ctx.waterMat && ctx.waterMat.uniforms.cD) {
      ctx.waterMat.uniforms.cD.value.copy(new THREE.Color('#9cc4dc').lerp(new THREE.Color('#0d1726'), t));
    }
    if (ctx.night && ctx.night.registry) {
      for (const reg of ctx.night.registry) {
        if (reg.mat) {
          reg.mat.emissiveIntensity = THREE.MathUtils.lerp(reg.dayIntensity, reg.nightIntensity, t);
        }
      }
    }
  }

  // Animation Loop State
  let animId = null;
  let isPaused = false;
  let __fc = 0;
  const clock0 = performance.now();
  const lastCamPos = new THREE.Vector3();
  const lastTarPos = new THREE.Vector3();

  function frame(now) {
    if (isPaused) return;
    animId = requestAnimationFrame(frame);
    const t = Math.max(0, (now - clock0) / 1000);

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
      const u = Math.min(0.9999, Math.max(0, ((t * 0.02) % 1 + 1) % 1));
      const p = ctx.railCurve.getPoint(u), tg = ctx.railCurve.getTangent(u);
      if (p && tg) {
        ctx.train.position.set(p.x, (p.y != null && p.y > 0 ? p.y : H(p.x, p.z, ctx)) + 1.9, p.z);
        ctx.train.rotation.y = Math.atan2(tg.x, tg.z) + Math.PI;
      }
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

    if (dialEl) dialEl.style.transform = `rotate(${controls.getAzimuthalAngle() * 180 / Math.PI}deg)`;

    const dd = camera.position.distanceTo(controls.target);
    const upp = 2 * dd * Math.tan(camera.fov * Math.PI / 360) / VH;
    if (scBEl) scBEl.style.width = (50 / upp) + 'px';

    // Smooth day/night cycle transition
    if (ctx.night) {
      if (ctx.night.target === undefined) ctx.night.target = 0;
      if (Math.abs(ctx.night.t - ctx.night.target) > 0.001) {
        ctx.night.t += (ctx.night.target - ctx.night.t) * 0.06;
        updateSky(ctx.night.t);
      }
    }

    // Distance LOD culling for models
    if ((__fc % 30) === 0 && ctx.placedModels && ctx.placedModels.children) {
      const camPos = camera.position;
      ctx.placedModels.children.forEach(m => {
        if (m.userData && m.userData.hasLOD) {
          m.visible = m.position.distanceTo(camPos) < 1400;
        }
      });
    }

    const camChanged = Math.abs(camera.position.x - lastCamPos.x) > 0.05 ||
                       Math.abs(camera.position.y - lastCamPos.y) > 0.05 ||
                       Math.abs(camera.position.z - lastCamPos.z) > 0.05 ||
                       Math.abs(controls.target.x - lastTarPos.x) > 0.05 ||
                       Math.abs(controls.target.z - lastTarPos.z) > 0.05;
    if (camChanged) {
      lastCamPos.copy(camera.position);
      lastTarPos.copy(controls.target);
      ui.updateLabels(VW, VH);
    } else if ((__fc % 15) === 0) {
      ui.updateLabels(VW, VH);
    }

    if ((__fc = (__fc + 1) | 0) % 2 === 0) ui.drawMini();

    renderer.render(scene, camera);
  }

  animId = requestAnimationFrame(frame);

  // Inbound postMessage listener
  const onWindowMessage = e => {
    // Validate source origin to protect against untrusted origin manipulation
    if (e.origin && e.origin !== window.location.origin && !e.origin.endsWith('.lakshya.uk') && !e.origin.includes('localhost') && !e.origin.includes('127.0.0.1')) return;
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
      const targetOrigin = (window.location.origin && window.location.origin !== 'null') ? window.location.origin : '*';
      parent.postMessage({ source: 'craftme-map', type: 'ready', waypoints: DATA.length }, targetOrigin);
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
