import * as THREE from 'three';
import { DATA, wx, wz } from '../data.js';
import { H } from '../terrain.js';

import * as eiffel from './eiffel.js';
import * as taj from './taj.js';
import * as giza from './giza.js';
import * as tokyoTower from './tokyoTower.js';
import * as senso from './senso.js';
import * as fushimi from './fushimi.js';
import * as gyeong from './gyeong.js';
import * as geun from './geun.js';
import * as sejong from './sejong.js';
import * as forbidden from './forbidden.js';
import * as terracotta from './terracotta.js';
import * as panda from './panda.js';
import * as london from './london.js';
import * as citadel from './citadel.js';
import * as hollywood from './hollywood.js';
import * as radiator from './radiator.js';
import * as mcqueen from './mcqueen.js';
import * as neoYork from './neoYork.js';
import * as dubai from './dubai.js';
import * as atlantis from './atlantis.js';
import * as burj from './burj.js';
import * as wheel from './wheel.js';
import * as mexico from './mexico.js';
import * as airport from './airport.js';
import * as park from './park.js';
import * as bar from './bar.js';
import * as harbor from './harbor.js';
import * as zoo from './zoo.js';
import * as cities from './cities.js';
import * as palmJumeirah from './palmJumeirah.js';
import * as worldIslands from './worldIslands.js';
import * as trees from './trees.js';
import * as roads from './roads.js';
import * as ships from './ships.js';
import * as environment from './environment.js';

export const PLACE = {
  'EIFFEL': eiffel.build,
  'TAJ MAHAL': taj.build,
  'GIZA': giza.build,
  'TOKYO TOWER': tokyoTower.build,
  'SENSO-JI': senso.build,
  'FUSHIMI INARI': fushimi.build,
  'GYEONGBOKGUNG': gyeong.build,
  'GEUNJEONGJEON': geun.build,
  'KING SEJONG': sejong.build,
  'FORBIDDEN CITY': forbidden.build,
  'TERRACOTTA': terracotta.build,
  'PANDA RESERVE': panda.build,
  'BIG BEN': london.build,
  'LONDON': cities.londonCity,
  'AIRPORT': airport.build,
  'AMUSEMENT PARK': park.build,
  'BAR': bar.build,
  'HARBOR': harbor.build,
  'ZOO': zoo.build,
  'CITADEL': citadel.build,
  'RADIATOR SPRINGS': radiator.build,
  'McQUEEN': mcqueen.build,
  'NEO YORK': neoYork.build,
  'DUBAI': dubai.build,
  'ATLANTIS RESORT': atlantis.build,
  'BURJ AL ARAB': burj.build,
  'AIN DUBAI WHEEL': wheel.build,
  'MEXICO CITY': mexico.build
};

export function buildLandmarks(scene, ctx) {
  const placedModels = new THREE.Group();
  scene.add(placedModels);
  ctx.placedModels = placedModels;

  const OCC = {};
  DATA.forEach(d => {
    OCC[d.n] = (OCC[d.n] || 0);
    const k = OCC[d.n]++;
    let fn = PLACE[d.n];

    if (d.n === 'HOLLYWOOD') fn = [hollywood.buildSign, hollywood.buildTheatre, hollywood.buildWalkOfFame][k];
    if (d.n === 'TOKYO') fn = cities.tokyoCity;
    if (d.n === 'SEOUL') fn = k === 0 ? cities.seoulCity : cities.seoulTower;
    if (!fn) return;

    const g = new THREE.Group();
    let y = Math.max(H(d.x, d.z, ctx), 0.6);
    let px = d.x, pz = d.z;

    if (d.n === 'ATLANTIS RESORT' || d.n === 'BURJ AL ARAB' || d.n === 'AIN DUBAI WHEEL') y = 1.55;
    if (d.n === 'HARBOR') y = 0.4;
    if (d.n === 'HOLLYWOOD' && k === 0) {
      px = wx(1574);
      pz = wz(474) - 2;
    }

    g.position.set(px, y, pz);
    if (d.n === 'HOLLYWOOD' && k === 0) {
      g.position.y = H(px, pz, ctx) + 0.5;
    }
    g.rotation.y = d.n === 'ATLANTIS RESORT' ? Math.PI / 2 : 0;
    fn(g, ctx);
    placedModels.add(g);
  });

  palmJumeirah.build(scene, ctx);
  worldIslands.build(scene, ctx);
  trees.build(scene, ctx);
  roads.build(scene, ctx);
  ships.build(scene, ctx);
  environment.build(scene, ctx);

  return placedModels;
}
