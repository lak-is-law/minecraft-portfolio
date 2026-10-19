import * as THREE from 'three';
import { DATA, CATC, IC, dotColor, blurb, dist, PLAYER } from './data.js';
import { H, TX0, TX1, TZ0, TZ1, nx, nz, clamp } from './terrain.js';

export function createUI(container, ctx, callbacks = {}) {
  const onTravel = callbacks.onTravel || (() => {});
  const onClose = callbacks.onClose || (() => {});

  container.innerHTML = `
    <div id="app">
      <div id="labels"></div>
      <div class="cloud tl"></div><div class="cloud tr"></div><div class="cloud bl"></div><div class="cloud br"></div>
      <div id="title" class="panel"><div class="logo"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z"/></svg></div><div><h1>World of Lakshya</h1><small id="you-coords">X -79 · Z 70</small></div></div>
      <div id="tabs" class="panel"></div>
      <div id="top-r"><button class="btn" id="wpbtn"><svg viewBox="0 0 24 24"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg><span>Waypoints</span><b id="wpn"></b></button><button class="btn ib" id="esc" title="Close (Esc)"><svg viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg></button></div>
      <div id="hud-left">
        <div id="sel" class="panel"><div class="chiprow"><span id="sel-chip"></span></div><h2 id="sel-n"></h2><p id="sel-b"></p><div class="stats"><div><small>X</small><b id="sel-x1"></b></div><div><small>Z</small><b id="sel-z1"></b></div><div><small>Distance</small><b id="sel-d1"></b></div></div><div class="row"><button class="btn pri" id="sel-go">Travel here</button><button class="btn" id="sel-x">Close</button></div></div>
        <div class="spacer"></div>
        <div id="mini" class="panel"><canvas id="mm" width="456" height="322"></canvas><div id="compass" class="panel"><svg id="dial" viewBox="-50 -50 100 100"><circle r="44" fill="none" stroke="rgba(255,255,255,.25)" stroke-width="1.5"/><path d="M0,-34 L8,6 L0,0 L-8,6Z" fill="#ff5a4d"/><path d="M0,34 L8,-6 L0,0 L-8,-6Z" fill="rgba(255,255,255,.75)"/><circle r="3" fill="#0b1220" stroke="#fff" stroke-width="1.5"/><text y="-36" text-anchor="middle" font-family="Inter,system-ui,sans-serif" font-weight="800" font-size="11" fill="#fff" transform="translate(0,-1)">N</text></svg></div></div>
        <div id="status" class="panel"><i></i><span id="st-t" title="Click the ground to drop a pin; double-click to zoom in">Hover the map</span></div>
      </div>
      <div id="hud-right">
        <div id="drawer" class="panel"><div class="search"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg><input id="q" placeholder="Search waypoints"><span class="kbd" style="position:absolute;right:10px;top:10px;margin:0">/</span></div><div id="list"></div></div>
        <div class="spacer"></div>
        <div class="brow"><div id="scale" class="panel"><span>50 blocks</span><b id="sc-b"></b></div><div id="zoom" class="panel"><button class="btn" id="z-in" title="Zoom in"><svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg></button><button class="btn" id="z-out" title="Zoom out"><svg viewBox="0 0 24 24"><path d="M5 12h14"/></svg></button><hr><button class="btn" id="z-you" title="Centre on you"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="8"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/></svg></button><button class="btn" id="z-reset" title="Reset view"><svg viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg></button></div></div>
      </div>
      <div id="quick" class="panel"><button class="btn" id="q-you"><svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg><span>You</span></button><button class="btn" id="q-pin"><svg viewBox="0 0 24 24"><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11Z"/><circle cx="12" cy="10" r="2.5"/></svg><span>Pin</span></button><button class="btn" id="q-view"><svg viewBox="0 0 24 24"><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 13 9 5 9-5"/></svg><span>Top view</span></button><button class="btn on" id="q-rail"><svg viewBox="0 0 24 24"><path d="M7 3 5 21M17 3l2 18M6 8h12M5.5 14h13"/></svg><span>Rail</span></button><button class="btn" id="q-night"><svg viewBox="0 0 24 24"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg><span>Night</span></button></div>
      <div id="toast" class="panel"></div>
    </div>
  `;

  const $ = id => container.querySelector('#' + id);
  const app = $('app');
  const labelsEl = $('labels');

  let tw = null;
  const HOME = { t: new THREE.Vector3(70, 0, 0), d: 640, phi: 0.9 };

  function fly(tx, tz, distVal, phi) {
    if (!ctx.camera || !ctx.controls) return;
    const ty = Math.max(H(tx, tz, ctx), 0);
    const off = ctx.camera.position.clone().sub(ctx.controls.target);
    const sp = new THREE.Spherical().setFromVector3(off);
    if (distVal) sp.radius = distVal;
    if (phi != null) sp.phi = phi;
    sp.makeSafe();
    tw = {
      t0: performance.now(),
      dur: 900,
      fT: ctx.controls.target.clone(),
      tT: new THREE.Vector3(tx, ty, tz),
      fO: off,
      tO: new THREE.Vector3().setFromSpherical(sp)
    };
  }

  function stepTween(now) {
    if (!tw || !ctx.camera || !ctx.controls) return;
    const u = clamp((now - tw.t0) / tw.dur, 0, 1);
    const e = u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2;
    ctx.controls.target.lerpVectors(tw.fT, tw.tT, e);
    const o = new THREE.Vector3().lerpVectors(tw.fO, tw.tO, e);
    ctx.camera.position.copy(ctx.controls.target).add(o);
    if (u >= 1) tw = null;
  }

  const rc = new THREE.Raycaster();
  function groundAt(cx, cy) {
    if (!ctx.camera) return null;
    const r = app.getBoundingClientRect();
    const nd = new THREE.Vector2(((cx - r.left) / r.width) * 2 - 1, -((cy - r.top) / r.height) * 2 + 1);
    rc.setFromCamera(nd, ctx.camera);
    const o = rc.ray.origin, dr = rc.ray.direction;
    let prev = 0, t = 0, hit = null;
    for (t = 0; t < 5000; t += Math.max(2, t * 0.01)) {
      const x = o.x + dr.x * t, y = o.y + dr.y * t, z = o.z + dr.z * t;
      if (y <= Math.max(H(x, z, ctx), 0)) {
        let a = prev, b = t;
        for (let k = 0; k < 10; k++) {
          const m = (a + b) / 2;
          const px = o.x + dr.x * m, py = o.y + dr.y * m, pz = o.z + dr.z * m;
          if (py <= Math.max(H(px, pz, ctx), 0)) b = m;
          else a = m;
        }
        const tt = (a + b) / 2;
        hit = new THREE.Vector3(o.x + dr.x * tt, o.y + dr.y * tt, o.z + dr.z * tt);
        break;
      }
      prev = t;
    }
    return hit;
  }

  let toastTimer = null;
  function toast(t) {
    const e = $('toast');
    if (!e) return;
    e.textContent = t;
    e.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => e.classList.remove('show'), 2600);
  }

  function travel(X, Z, n) {
    const wp = DATA.find(d => d.n === n && d.X === X && d.Z === Z) || DATA.find(d => d.n === n);
    const target = (wp && wp.gameCoords) ? wp.gameCoords : [X, 2, Z];
    toast(`✦ Travelling to ${n} · X ${target[0]}, Z ${target[2]}`);
    const payload = { x: target[0], y: target[1], z: target[2], coords: target, name: n };
    if (window.CraftMap && window.CraftMap.onTravel) window.CraftMap.onTravel(payload);
    try {
      if (typeof parent !== 'undefined' && parent !== window) {
        parent.postMessage({ source: 'craftme-map', type: 'travel', ...payload }, '*');
      }
    } catch (_) {}
    window.dispatchEvent(new CustomEvent('craftme:travel', { detail: payload }));
    onTravel(payload);
  }

  function closeMap() {
    if (window.CraftMap && window.CraftMap.onClose) window.CraftMap.onClose();
    try {
      if (typeof parent !== 'undefined' && parent !== window) {
        parent.postMessage({ source: 'craftme-map', type: 'close' }, '*');
      }
    } catch (_) {}
    window.dispatchEvent(new CustomEvent('craftme:close'));
    onClose();
  }

  const tabsDef = [
    ['all', 'All'],
    ['monument', 'Monuments'],
    ['city', 'Cities'],
    ['transit', 'Transit'],
    ['nature', 'Nature']
  ];

  function buildTabs() {
    const T_ = $('tabs');
    if (!T_) return;
    T_.innerHTML = '';
    tabsDef.forEach(([k, l]) => {
      const n = k === 'all' ? DATA.length : DATA.filter(d => d.cat === k).length;
      const b = document.createElement('button');
      b.className = 'seg-b' + (ctx.filter === k ? ' on' : '');
      b.innerHTML = `${l}<em>${n}</em>`;
      b.onclick = () => {
        ctx.filter = k;
        buildTabs();
        buildList();
      };
      T_.appendChild(b);
    });
  }

  function buildList() {
    const qEl = $('q');
    const term = qEl ? qEl.value.trim().toLowerCase() : '';
    const L = $('list');
    if (!L) return;
    L.innerHTML = '';

    const rows = DATA.map((d, i) => [d, i]).filter(([d]) =>
      (ctx.filter === 'all' || d.cat === ctx.filter) && d.n.toLowerCase().includes(term)
    );
    const names = { monument: 'Monuments', city: 'Cities', transit: 'Transit', nature: 'Nature' };

    ['monument', 'city', 'transit', 'nature'].forEach(c => {
      const g = rows.filter(([d]) => d.cat === c).sort((a, b) => a[0].n.localeCompare(b[0].n));
      if (!g.length) return;
      const h = document.createElement('h4');
      h.innerHTML = `<span>${names[c]}</span><span>${g.length}</span>`;
      L.appendChild(h);
      g.forEach(([d, i]) => {
        const r = document.createElement('div');
        r.innerHTML = `<i style="--c:${dotColor(d)}">${IC[d.cat]}</i><b>${d.n}</b><span>${dist(d.X, d.Z)}m</span>`;
        r.tabIndex = 0;
        r.onclick = () => select(i);
        r.onkeydown = e => { if (e.key === 'Enter') select(i); };
        r.onmouseenter = () => { ctx.hovered = i; };
        r.onmouseleave = () => { ctx.hovered = -1; };
        L.appendChild(r);
      });
    });

    if (!rows.length) L.innerHTML = '<div style="color:var(--mut);cursor:default">No matches</div>';
  }

  function showCard(name, X, Z, cat, text) {
    const ch = $('sel-chip');
    if (ch) {
      ch.textContent = cat === 'pin' ? 'Pin' : (cat || 'Waypoint');
      ch.style.setProperty('--cc', CATC[cat] || '#ffd84a');
    }
    const selN = $('sel-n'), selB = $('sel-b');
    if (selN) selN.textContent = name;
    if (selB) {
      selB.textContent = text || 'Custom location. Drop it as a travel point.';
      selB.style.display = '';
    }
    const x1 = $('sel-x1'), z1 = $('sel-z1'), d1 = $('sel-d1');
    if (x1) x1.textContent = X;
    if (z1) z1.textContent = Z;
    if (d1) d1.textContent = dist(X, Z) + ' m';
    const sel = $('sel');
    if (sel) {
      sel.classList.add('show');
      const s = sel.dataset;
      s.x = X;
      s.z = Z;
      s.n = name;
    }
  }

  function select(i) {
    const d = DATA[i];
    ctx.selected = i;
    ctx.pin = null;
    if (ctx.pinG) ctx.pinG.visible = false;
    showCard(d.n, d.X, d.Z, d.cat, blurb(i));
    fly(d.x, d.z, 150, 0.95);
  }

  const zoomBy = f => {
    if (!ctx.camera || !ctx.controls) return;
    const o = ctx.camera.position.clone().sub(ctx.controls.target);
    o.multiplyScalar(f);
    const l = clamp(o.length(), ctx.controls.minDistance, ctx.controls.maxDistance);
    o.setLength(l);
    ctx.camera.position.copy(ctx.controls.target).add(o);
  };

  const goYou = () => fly(PLAYER.X, PLAYER.Z, 160, 0.95);

  /* Hook static HUD element events */
  $('sel-go').onclick = () => {
    const s = $('sel').dataset;
    travel(+s.x, +s.z, s.n);
  };
  $('sel-x').onclick = () => {
    $('sel').classList.remove('show');
    ctx.selected = null;
    ctx.pin = null;
    if (ctx.pinG) ctx.pinG.visible = false;
  };
  $('wpbtn').onclick = () => $('drawer').classList.toggle('open');
  $('esc').onclick = closeMap;
  $('q').oninput = buildList;
  $('q').addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      $('q').blur();
      $('drawer').classList.remove('open');
    }
  });

  $('z-in').onclick = () => zoomBy(1 / 1.4);
  $('z-out').onclick = () => zoomBy(1.4);
  $('z-you').onclick = goYou;
  $('q-you').onclick = goYou;
  $('q-pin').onclick = () => {
    if (ctx.pin) fly(ctx.pin.x, ctx.pin.z, 150, 0.95);
    else toast('Click the map to drop a pin');
  };
  $('q-view').onclick = e => {
    ctx.topView = !ctx.topView;
    e.currentTarget.lastElementChild.textContent = ctx.topView ? '3D view' : 'Top view';
    e.currentTarget.classList.toggle('on', ctx.topView);
    if (ctx.camera && ctx.controls) {
      const sp = new THREE.Spherical().setFromVector3(ctx.camera.position.clone().sub(ctx.controls.target));
      fly(ctx.controls.target.x, ctx.controls.target.z, sp.radius, ctx.topView ? 0.02 : 0.9);
    }
  };
  $('q-rail').onclick = e => {
    if (ctx.railG) {
      ctx.railG.visible = !ctx.railG.visible;
      if (ctx.train) ctx.train.visible = ctx.railG.visible;
      e.currentTarget.classList.toggle('on', ctx.railG.visible);
      toast(ctx.railG.visible ? 'Rail line shown' : 'Rail line hidden');
    }
  };
  $('q-night').onclick = e => {
    ctx.night.target = ctx.night.target === 0 ? 1 : 0;
    const isNight = ctx.night.target === 1;
    e.currentTarget.classList.toggle('on', isNight);
    e.currentTarget.querySelector('span').textContent = isNight ? 'Day' : 'Night';
    toast(isNight ? '🌙 Nightfall falling across realms' : '☀️ Dawn breaking over the island');
  };
  $('z-reset').onclick = () => {
    const sp = new THREE.Spherical(HOME.d, HOME.phi, 0);
    fly(HOME.t.x, HOME.t.z, HOME.d, HOME.phi);
    if (tw) tw.tO = new THREE.Vector3().setFromSpherical(sp);
  };
  $('wpn').textContent = DATA.length;

  /* Flags creation */
  const flagMat = new THREE.MeshStandardMaterial({
    color: '#d6262c',
    side: THREE.DoubleSide,
    roughness: 0.6,
    emissive: '#5a0a0a',
    emissiveIntensity: 0.35
  });

  const FLAGOFF = {
    HARBOR: [8, 3.5],
    ZOO: [10, 24],
    AIRPORT: [-25, 16],
    'AMUSEMENT PARK': [9, 17]
  };

  ctx.flags = [];
  labelsEl.innerHTML = '';

  DATA.forEach((d, i) => {
    const g = new THREE.Group();
    const hb = d.n === 'HARBOR', fo = FLAGOFF[d.n];
    const gx = fo ? d.x + fo[0] : d.x + (d.cat === 'monument' || d.cat === 'city' ? 9 : 0);
    const gz = fo ? d.z + fo[1] : d.z + (d.n === 'CITADEL' ? -26 : 9);
    const by = (hb ? 1.5 : Math.max(H(gx, gz, ctx), 0.9)) +
      (Math.abs(d.x - 239.5) < 95 && Math.abs(d.z - 45.6) < 80 ? 1.4 : 0);
    g.position.set(gx, by, gz);
    ctx.scene.add(g);

    // Flag pole
    const pgeo = new THREE.CylinderGeometry(0.35, 0.45, 30, 8);
    const pmesh = new THREE.Mesh(pgeo, new THREE.MeshStandardMaterial({ color: '#2a1a0c', roughness: 0.8 }));
    pmesh.position.y = 15;
    g.add(pmesh);

    const sgeo = new THREE.SphereGeometry(0.8, 14, 10);
    const smesh = new THREE.Mesh(sgeo, new THREE.MeshStandardMaterial({ color: '#e8c25a', metalness: 0.8, roughness: 0.3 }));
    smesh.position.y = 30.4;
    g.add(smesh);

    const geo = new THREE.PlaneGeometry(11, 6.5, 10, 1);
    geo.translate(5.5, 0, 0);
    const cl = new THREE.Mesh(geo, flagMat);
    cl.position.set(0.4, 27, 0);
    cl.castShadow = true;
    g.add(cl);

    const el = document.createElement('div');
    el.className = 'plq';
    el.style.setProperty('--c', dotColor(d));
    el.innerHTML = '<i>' + IC[d.cat] + '</i><span></span>';
    el.lastChild.textContent = d.n;
    labelsEl.appendChild(el);

    const f = {
      i,
      d,
      g,
      cl,
      el,
      w: d.n.length * 8.6 + 44,
      wm: 36,
      top: new THREE.Vector3(gx, by + 34, gz),
      pri: d.cat === 'monument' ? 0 : d.cat === 'city' ? 1 : 2,
      sx: 0,
      sy: 0,
      on: true,
      base0: cl.geometry.attributes.position.array.slice()
    };

    el.onclick = () => select(i);
    el.ondblclick = () => travel(d.X, d.Z, d.n);
    el.tabIndex = 0;
    el.onkeydown = e => { if (e.key === 'Enter') select(i); };
    el.onmouseenter = () => { ctx.hovered = i; };
    el.onmouseleave = () => { ctx.hovered = -1; };
    ctx.flags.push(f);
  });

  /* Selected Ring */
  const selRing = new THREE.Mesh(
    new THREE.RingGeometry(6, 7.6, 48).rotateX(-Math.PI / 2),
    new THREE.MeshBasicMaterial({ color: '#ffb547', transparent: true, opacity: 0.9, depthWrite: false, depthTest: false })
  );
  selRing.renderOrder = 9;
  selRing.visible = false;
  ctx.scene.add(selRing);
  ctx.selRing = selRing;

  /* Player Marker */
  const youG = new THREE.Group();
  ctx.scene.add(youG);
  ctx.youG = youG;

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(4, 0.35, 8, 40).rotateX(Math.PI / 2),
    new THREE.MeshStandardMaterial({ color: '#ff5a4d', emissive: '#ff3b2d', emissiveIntensity: 1.2 })
  );
  youG.add(ring);

  const arrow = new THREE.Mesh(
    new THREE.ConeGeometry(2.4, 6, 4),
    new THREE.MeshStandardMaterial({ color: '#fff', emissive: '#ffffff', emissiveIntensity: 0.5 })
  );
  arrow.rotation.x = Math.PI / 2;
  const arrowG = new THREE.Group();
  arrowG.position.y = 9;
  arrowG.add(arrow);
  youG.add(arrowG);
  ctx.arrowG = arrowG;

  const youEl = document.createElement('div');
  youEl.className = 'plq you';
  youEl.innerHTML = '<i>' + IC.you + '</i><span>YOU · LAKSHYA</span>';
  labelsEl.appendChild(youEl);

  function placeYou() {
    const y = Math.max(H(PLAYER.X, PLAYER.Z, ctx), 0.8);
    youG.position.set(PLAYER.X, y, PLAYER.Z);
    arrowG.rotation.y = -PLAYER.yaw * Math.PI / 180;
    const yc = $('you-coords');
    if (yc) yc.textContent = `X ${Math.round(PLAYER.X)} · Z ${Math.round(PLAYER.Z)}`;
  }
  placeYou();

  /* Pin & Cursor */
  const pinG = new THREE.Group();
  pinG.visible = false;
  ctx.scene.add(pinG);
  ctx.pinG = pinG;
  const pinCone = new THREE.Mesh(
    new THREE.ConeGeometry(1.6, 5, 10).rotateX(Math.PI),
    new THREE.MeshStandardMaterial({ color: '#ffd24a', emissive: '#ffb400', emissiveIntensity: 0.7 })
  );
  pinCone.position.y = 3.2;
  pinG.add(pinCone);

  const cursor = new THREE.Mesh(
    new THREE.RingGeometry(1.7, 2.2, 32).rotateX(-Math.PI / 2),
    new THREE.MeshBasicMaterial({ color: '#ffd24a', transparent: true, opacity: 0.9, depthWrite: false })
  );
  cursor.visible = false;
  ctx.scene.add(cursor);
  ctx.cursor = cursor;

  /* Minimap Canvas */
  const mmC = $('mm');
  const mx = mmC ? mmC.getContext('2d') : null;
  const MW = mmC ? mmC.width : 456;
  const MH = mmC ? mmC.height : 322;

  const mmBase = (() => {
    if (!ctx.pos || !ctx.col || !ctx.tg) return null;
    const o = document.createElement('canvas');
    o.width = nx;
    o.height = nz;
    const g = o.getContext('2d');
    const im = g.createImageData(nx, nz);
    const nrm = ctx.tg.attributes.normal.array;
    const Lv = new THREE.Vector3(-0.5, 0.75, 0.42).normalize();
    const enc = v => {
      v = Math.max(0, Math.min(1, v));
      return 255 * (v <= 0.0031308 ? 12.92 * v : 1.055 * Math.pow(v, 1 / 2.4) - 0.055);
    };
    for (let i = 0; i < nx * nz; i++) {
      const h = ctx.pos[i * 3 + 1];
      const sh = h < 0.55 ? 1 : 0.45 + 0.7 * Math.max(0, nrm[i * 3] * Lv.x + nrm[i * 3 + 1] * Lv.y + nrm[i * 3 + 2] * Lv.z);
      im.data[i * 4] = enc(ctx.col[i * 3] * sh);
      im.data[i * 4 + 1] = enc(ctx.col[i * 3 + 1] * sh);
      im.data[i * 4 + 2] = enc(ctx.col[i * 3 + 2] * sh);
      im.data[i * 4 + 3] = 255;
    }
    g.putImageData(im, 0, 0);
    return o;
  })();

  const mmX = x => (x - TX0) / (TX1 - TX0) * MW;
  const mmY = z => (z - TZ0) / (TZ1 - TZ0) * MH;
  const _ro = new THREE.Vector3(), _rd = new THREE.Vector3();

  function drawMini() {
    if (!mx || !mmBase || !ctx.camera) return;
    mx.imageSmoothingEnabled = true;
    mx.imageSmoothingQuality = 'high';
    mx.drawImage(mmBase, 0, 0, MW, MH);

    mx.beginPath();
    [[-1, -1], [1, -1], [1, 1], [-1, 1]].forEach(([cx, cy], i) => {
      _ro.set(cx, cy, -1).unproject(ctx.camera);
      _rd.set(cx, cy, 1).unproject(ctx.camera).sub(_ro).normalize();
      let t = _rd.y < -0.02 ? -_ro.y / _rd.y : 900;
      t = Math.min(t, 900);
      const X = mmX(_ro.x + _rd.x * t), Y = mmY(_ro.z + _rd.z * t);
      if (i) mx.lineTo(X, Y); else mx.moveTo(X, Y);
    });
    mx.closePath();
    mx.fillStyle = 'rgba(255,255,255,.16)';
    mx.fill();
    mx.strokeStyle = 'rgba(255,255,255,.95)';
    mx.lineWidth = 2;
    mx.stroke();

    for (const f of ctx.flags) {
      const on = ctx.filter === 'all' || ctx.filter === f.d.cat;
      mx.globalAlpha = on ? 1 : 0.2;
      mx.beginPath();
      mx.arc(mmX(f.d.x), mmY(f.d.z), (f.i === ctx.selected || f.i === ctx.hovered) ? 7 : 4.2, 0, 6.283);
      mx.fillStyle = dotColor(f.d);
      mx.fill();
      mx.lineWidth = (f.i === ctx.selected || f.i === ctx.hovered) ? 3 : 1.6;
      mx.strokeStyle = (f.i === ctx.selected || f.i === ctx.hovered) ? '#fff' : '#0b1220';
      mx.stroke();
    }
    mx.globalAlpha = 1;

    mx.beginPath();
    mx.arc(mmX(PLAYER.X), mmY(PLAYER.Z), 6.5, 0, 6.283);
    mx.fillStyle = '#2f7bff';
    mx.fill();
    mx.lineWidth = 3;
    mx.strokeStyle = '#fff';
    mx.stroke();

    if (ctx.pin) {
      mx.beginPath();
      mx.arc(mmX(ctx.pin.x), mmY(ctx.pin.z), 5, 0, 6.283);
      mx.fillStyle = '#ffd24a';
      mx.fill();
      mx.lineWidth = 2;
      mx.strokeStyle = '#0b1220';
      mx.stroke();
    }
  }

  const onMinimapPointerDown = e => {
    e.stopPropagation();
    if (!ctx.camera || !ctx.controls) return;
    const r = mmC.getBoundingClientRect();
    const x = TX0 + (e.clientX - r.left) / r.width * (TX1 - TX0);
    const z = TZ0 + (e.clientY - r.top) / r.height * (TZ1 - TZ0);
    const sp = new THREE.Spherical().setFromVector3(ctx.camera.position.clone().sub(ctx.controls.target));
    fly(x, z, sp.radius, sp.phi);
  };
  if (mmC) mmC.addEventListener('pointerdown', onMinimapPointerDown);

  /* Label collision & decluttering */
  let __m = 0, __bf = 0, blk = [];
  const BLK_IDS = ['title', 'tabs', 'top-r', 'sel', 'drawer', 'status', 'mini', 'quick', 'zoom', 'scale'];
  function refreshBlockers() {
    blk = [];
    for (const id of BLK_IDS) {
      const e = $(id);
      if (!e) continue;
      const r = e.getBoundingClientRect();
      if (r.width > 0 && r.height > 0 && getComputedStyle(e).display !== 'none') {
        blk.push([r.left - 6, r.top - 6, r.width + 12, r.height + 12]);
      }
    }
  }

  const v3 = new THREE.Vector3();
  function updateLabels(VW, VH) {
    if (!ctx.camera) return;
    if (!__m) {
      ctx.flags.forEach(f => {
        f.el.classList.remove('mini');
        f.el.style.display = '';
      });
      if (ctx.flags[0] && ctx.flags[0].el.offsetWidth) {
        ctx.flags.forEach(f => { f.w = f.el.offsetWidth + 10; });
        __m = 1;
        if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { __m = 0; });
      }
    }
    if (!(__bf++ % 12)) refreshBlockers();
    const inter = (a, b) => a[0] < b[0] + b[2] && a[0] + a[2] > b[0] && a[1] < b[1] + b[3] && a[1] + a[3] > b[1];
    const placed = [];
    const hit = r => { for (const p of placed) if (inter(r, p)) return true; return false; };
    const hitB = r => { for (const p of blk) if (inter(r, p)) return true; return false; };

    v3.set(PLAYER.X, youG.position.y + 18, PLAYER.Z).project(ctx.camera);
    const yv = v3.z < 1, yx = (v3.x * 0.5 + 0.5) * VW, yy = (-v3.y * 0.5 + 0.5) * VH;
    const yr = [yx - 70, yy - 40, 140, 40];
    const yHit = yv && !hitB(yr);
    if (yHit) placed.push(yr);

    const order = [...ctx.flags].sort((a, b) =>
      (b.i === ctx.selected) - (a.i === ctx.selected) ||
      (b.i === ctx.hovered) - (a.i === ctx.hovered) ||
      a.pri - b.pri || a.i - b.i
    );

    for (const f of order) {
      v3.copy(f.top).project(ctx.camera);
      f.sx = (v3.x * 0.5 + 0.5) * VW;
      f.sy = (-v3.y * 0.5 + 0.5) * VH;
      const match = ctx.filter === 'all' || ctx.filter === f.d.cat;
      f.on = match;
      const vis = match && v3.z < 1 && f.sx > -60 && f.sx < VW + 60 && f.sy > -30 && f.sy < VH + 60;
      let show = vis, mini = false;
      const force = f.i === ctx.selected || f.i === ctx.hovered;

      if (show) {
        const full = [f.sx - f.w / 2, f.sy - 40, f.w, 40];
        if (force && !hitB(full)) {
          placed.push(full);
        } else if (!force && !hitB(full) && !hit(full)) {
          placed.push(full);
        } else {
          const m = [f.sx - 21, f.sy - 40, 42, 40];
          if (!hitB(m) && (force || !hit(m))) {
            placed.push(m);
            mini = !force;
          } else if (force && hitB(full)) {
            show = false;
          } else {
            show = false;
          }
        }
      }

      f.el.style.display = show ? '' : 'none';
      if (show) {
        f.el.classList.toggle('mini', mini);
        f.el.classList.toggle('hov', f.i === ctx.hovered && f.i !== ctx.selected);
        f.el.style.left = Math.round(f.sx) + 'px';
        f.el.style.top = Math.round(f.sy) + 'px';
        f.el.classList.toggle('sel', f.i === ctx.selected);
        f.el.style.zIndex = f.i === ctx.selected ? 6 : f.i === ctx.hovered ? 7 : 3 - f.pri;
      }
      f.g.visible = match;
    }

    youEl.style.display = yHit ? '' : 'none';
    youEl.style.left = Math.round(yx) + 'px';
    youEl.style.top = Math.round(yy) + 'px';

    const ri = ctx.selected != null ? ctx.selected : ctx.hovered;
    if (ri != null && ri >= 0 && ctx.flags[ri]) {
      const g = ctx.flags[ri].g;
      selRing.visible = ctx.flags[ri].on;
      selRing.position.set(g.position.x, g.position.y + 0.6, g.position.z);
      const k = 1 + 0.12 * Math.sin(performance.now() / 260);
      selRing.scale.setScalar(k);
      selRing.material.opacity = ctx.selected != null && ri === ctx.selected ? 0.95 : 0.55;
    } else {
      selRing.visible = false;
    }
  }

  /* Keyboard controls */
  const onKeyDown = e => {
    if (e.target && e.target.tagName === 'INPUT') return;
    if (e.key === 'Escape') {
      if ($('drawer') && $('drawer').classList.contains('open')) {
        $('drawer').classList.remove('open');
      } else if ($('sel') && $('sel').classList.contains('show')) {
        $('sel-x').click();
      } else {
        closeMap();
      }
      e.stopPropagation();
      return;
    }
    if (e.key === 'KeyM' || e.code === 'KeyM') {
      closeMap();
      e.stopPropagation();
      return;
    }
    if (e.key === 'Enter' && $('sel') && $('sel').classList.contains('show') && document.activeElement === document.body) {
      $('sel-go').click();
      return;
    }
    if (e.key === '/') {
      e.preventDefault();
      $('drawer').classList.add('open');
      $('q').focus();
      return;
    }
    if (!ctx.camera || !ctx.controls) return;
    const p = 22 * (ctx.camera.position.distanceTo(ctx.controls.target) / 300);
    const fw = new THREE.Vector3();
    ctx.camera.getWorldDirection(fw);
    fw.y = 0;
    fw.normalize();
    const rt = new THREE.Vector3().crossVectors(fw, new THREE.Vector3(0, 1, 0));
    const mv = v => {
      ctx.controls.target.addScaledVector(v, p);
      ctx.camera.position.addScaledVector(v, p);
    };

    if (e.key === 'w' || e.key === 'ArrowUp') mv(fw);
    if (e.key === 's' || e.key === 'ArrowDown') mv(fw.clone().negate());
    if (e.key === 'd' || e.key === 'ArrowRight') mv(rt);
    if (e.key === 'a' || e.key === 'ArrowLeft') mv(rt.clone().negate());
    if (e.key === '+' || e.key === '=') zoomBy(1 / 1.3);
    if (e.key === '-') zoomBy(1.3);
    if (e.key === 'q' || e.key === 'e') {
      const a = (e.key === 'q' ? 1 : -1) * 0.2;
      const o = ctx.camera.position.clone().sub(ctx.controls.target);
      o.applyAxisAngle(new THREE.Vector3(0, 1, 0), a);
      ctx.camera.position.copy(ctx.controls.target).add(o);
    }
  };
  window.addEventListener('keydown', onKeyDown);

  /* Mouse / Pointer Events on WebGL Canvas */
  let down = null;
  const onPointerDown = e => {
    down = { x: e.clientX, y: e.clientY };
    if (ctx.renderer) ctx.renderer.domElement.classList.add('drag');
    tw = null;
  };
  const onPointerUp = e => {
    if (ctx.renderer) ctx.renderer.domElement.classList.remove('drag');
    if (!down) return;
    const moved = Math.hypot(e.clientX - down.x, e.clientY - down.y);
    down = null;
    if (moved > 5 || (ctx.renderer && e.target !== ctx.renderer.domElement)) return;

    const r = app.getBoundingClientRect();
    let best = null, bd = 34;
    ctx.flags.forEach(f => {
      const dd = Math.hypot(f.sx - (e.clientX - r.left), f.sy - (e.clientY - r.top));
      if (dd < bd && f.on) {
        bd = dd;
        best = f;
      }
    });
    if (best) {
      select(best.i);
      return;
    }
    const p = groundAt(e.clientX, e.clientY);
    if (!p) return;
    const X = Math.round(p.x), Z = Math.round(p.z);
    ctx.pin = { x: p.x, z: p.z };
    ctx.selected = null;
    ctx.pinG.position.set(p.x, Math.max(p.y, 0.8), p.z);
    ctx.pinG.visible = true;
    showCard('Dropped pin', X, Z, 'pin');
  };

  const onPointerMove = e => {
    const p = groundAt(e.clientX, e.clientY);
    if (!p) {
      cursor.visible = false;
      return;
    }
    cursor.visible = true;
    cursor.position.set(p.x, Math.max(p.y, 0.6) + 0.4, p.z);
    const s = ctx.camera.position.distanceTo(p) / 110;
    cursor.scale.setScalar(Math.max(0.7, s));
    const X = Math.round(p.x), Z = Math.round(p.z);
    const stT = $('st-t');
    if (stT) stT.textContent = `X ${X} · Z ${Z} · ${dist(X, Z)} m`;
  };

  const onPointerLeave = () => { cursor.visible = false; };
  const onDblClick = e => {
    const p = groundAt(e.clientX, e.clientY);
    if (!p || !ctx.camera || !ctx.controls) return;
    const sp = new THREE.Spherical().setFromVector3(ctx.camera.position.clone().sub(ctx.controls.target));
    fly(p.x, p.z, Math.max(60, sp.radius * 0.45), Math.min(sp.phi, 1.0));
  };

  function bindCanvasListeners(canvas) {
    canvas.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerleave', onPointerLeave);
    canvas.addEventListener('dblclick', onDblClick);
  }

  function unbindCanvasListeners(canvas) {
    if (canvas) {
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerleave', onPointerLeave);
      canvas.removeEventListener('dblclick', onDblClick);
    }
    window.removeEventListener('pointerup', onPointerUp);
    window.removeEventListener('keydown', onKeyDown);
    if (mmC) mmC.removeEventListener('pointerdown', onMinimapPointerDown);
  }

  buildTabs();
  buildList();

  return {
    fly,
    stepTween,
    updateLabels,
    drawMini,
    placeYou,
    bindCanvasListeners,
    unbindCanvasListeners,
    toast,
    app
  };
}
