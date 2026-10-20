import * as THREE from 'three';

const mkr = s => () => (s = (s * 16807) % 2147483647) / 2147483647;

export function createContext() {
  let _win = null;

  const ctx = {
    tickers: [],
    spinners: [],
    matCache: {},
    FLAT: [],
    flags: [],
    hovered: -1,
    selected: null,
    pin: null,
    filter: 'all',
    topView: false,
    carOrbit: null,
    railCurve: null,
    train: null,
    ships: [],
    smokes: [],
    clouds: [],
    lava: null,
    sun: null,
    hemiLight: null,
    placedModels: null,
    roads: null,
    railG: null,
    scene: null,
    camera: null,
    renderer: null,
    controls: null,
    terrain: null,
    water: null,
    waterMat: null,
    youG: null,
    arrowG: null,
    pinG: null,
    cursor: null,
    selRing: null,

    // Night registry for day/night interpolation
    night: {
      t: 0,
      registry: [],
      add(mat, opts = {}) {
        ctx.night.registry.push({
          mat,
          dayIntensity: opts.dayIntensity ?? (mat.emissiveIntensity ?? 1),
          nightIntensity: opts.nightIntensity ?? (opts.dayIntensity != null ? opts.dayIntensity * 2.2 : 1.8),
          dayColor: opts.dayColor ?? mat.color.clone(),
          nightColor: opts.nightColor ?? null
        });
      }
    },

    winTex() {
      if (_win) return _win;
      const c = document.createElement('canvas');
      c.width = 64;
      c.height = 128;
      const g = c.getContext('2d');
      g.fillStyle = '#000';
      g.fillRect(0, 0, 64, 128);
      const r = mkr(5);
      for (let y = 4; y < 124; y += 8) {
        for (let x = 4; x < 60; x += 8) {
          if (r() > 0.35) {
            g.fillStyle = r() > 0.5 ? '#ffe7a0' : '#bfe4ff';
            g.fillRect(x, y, 4, 5);
          }
        }
      }
      _win = new THREE.CanvasTexture(c);
      _win.colorSpace = THREE.SRGBColorSpace;
      return _win;
    },

    reset() {
      ctx.tickers = [];
      ctx.spinners = [];
      ctx.matCache = {};
      ctx.FLAT = [];
      ctx.flags = [];
      ctx.hovered = -1;
      ctx.selected = null;
      ctx.pin = null;
      ctx.filter = 'all';
      ctx.topView = false;
      ctx.carOrbit = null;
      ctx.railCurve = null;
      ctx.train = null;
      ctx.ships = [];
      ctx.smokes = [];
      ctx.clouds = [];
      ctx.lava = null;
      ctx.sun = null;
      ctx.hemiLight = null;
      ctx.night.registry = [];
      ctx.night.t = 0;
      if (_win) {
        _win.dispose();
        _win = null;
      }
    }
  };

  return ctx;
}

export const ctx = createContext();
