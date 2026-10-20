export const PPB = 2.63;
export const OX = 1140;
export const OY = 790;

export const wx = px => (px - OX) / PPB;
export const wz = py => (py - OY) / PPB;
export const W2 = p => [wx(p[0]), wz(p[1])];

export const wp = (n, px, py, cat, tint, big, gameCoords = null) => ({
  n,
  cat,
  tint,
  big,
  x: wx(px),
  z: wz(py),
  X: Math.round(wx(px)),
  Z: Math.round(wz(py)),
  gameCoords: gameCoords || [Math.round(wx(px)), 2, Math.round(wz(py))]
});

export const DATA = [
  wp('GUILIN', 865, 395, 'nature', null, null, [-105, 2, -130]),
  wp('PANDA RESERVE', 800, 437, 'nature', null, null, [-130, 2, -114]),
  wp('MT FUJI', 693, 448, 'nature', null, null, [-170, 2, -110]),
  wp('TOKYO', 715, 495, 'city', null, null, [-155, 2, -80]),
  wp('TOKYO', 735, 527, 'city', null, null, [-162, 2, -92]),
  wp('TOKYO TOWER', 677, 543, 'monument', null, null, [-176, 2, -74]),
  wp('SENSO-JI', 733, 569, 'monument', null, null, [-155, 2, -64]),
  wp('FUSHIMI INARI', 641, 684, 'monument', null, null, [-190, 4, -20]),
  wp('GYEONGBOKGUNG', 938, 435, 'monument', null, null, [-74, 2, -115]),
  wp('SEOUL', 1003, 435, 'city', null, null, [-65, 2, -95]),
  wp('GEUNJEONGJEON', 968, 461, 'monument', null, null, [-65, 4, -105]),
  wp('SEOUL', 970, 488, 'city', null, null, [-52, 16, -115]),
  wp('KING SEJONG', 969, 516, 'monument', null, null, [-65, 2, -84]),
  wp('CHEONGGYECHEON', 970, 545, 'nature', null, null, [-65, 2, -76]),
  wp('FORBIDDEN CITY', 878, 456, 'monument', null, null, [-92, 4, -107]),
  wp('TERRACOTTA', 868, 527, 'monument', null, null, [-108, 4, -80]),
  wp('ALPS', 1135, 474, 'nature', null, null, [-2, 9, -100]),
  wp('BIG BEN', 1056, 585, 'monument', null, null, [-32, 2, -58]),
  wp('LONDON', 985, 615, 'city', null, null, [-32, 2, -58]),
  wp('EIFFEL', 1209, 637, 'monument', null, null, [26, 2, -38]),
  wp('CITADEL', 1140, 790, 'transit', null, null, [0, 2, -4]),
  wp('TAJ MAHAL', 1350, 382, 'monument', null, null, [80, 4, -135]),
  wp('HOLLYWOOD', 1574, 474, 'monument', null, null, [165, 26, -100]),
  wp('HOLLYWOOD', 1608, 538, 'monument', null, null, [178, 3, -76]),
  wp('HOLLYWOOD', 1537, 577, 'monument', null, null, [151, 2, -61]),
  wp('RADIATOR SPRINGS', 1690, 690, 'city', 'red', null, [190, 2, -15]),
  wp('McQUEEN', 1650, 730, 'monument', null, null, [190, 2, -15]),
  wp('NEO YORK', 1403, 785, 'city', null, null, [100, 2, 0]),
  wp('DUBAI', 1590, 890, 'city', null, null, [170, 2, 42]),
  wp('PALM JUMEIRAH', 1700, 910, 'transit', null, null, [176, 5, 46]),
  wp('PALM JUMEIRAH', 1820, 885, 'monument', 'yellow', null, [213, 2, 46]),
  wp('PALM JUMEIRAH', 1985, 905, 'monument', null, null, [324, 2, 46]),
  wp('ATLANTIS RESORT', 1992, 935, 'monument', 'red', null, [324, 2, 46]),
  wp('WORLD ISLANDS', 2060, 850, 'nature', null, null, [360, 2, 46]),
  wp('WORLD ISLANDS', 2087, 905, 'nature', null, null, [350, 2, 24]),
  wp('THE WORLD ISLANDS', 2140, 968, 'nature', 'yellow', null, [360, 2, 46]),
  wp('BURJ AL ARAB', 1719, 1076, 'monument', 'blue', null, [220, 2, 110]),
  wp('BLUEWATERS', 1835, 1140, 'city', null, null, [262, 2, 146]),
  wp('AIN DUBAI WHEEL', 1829, 1192, 'monument', 'blue', null, [262, 2, 146]),
  wp('GIZA', 733, 860, 'monument', null, null, [-155, 2, 36]),
  wp('MEXICO CITY', 864, 955, 'city', null, null, [-105, 2, 72]),
  wp('AIRPORT', 1022, 915, 'transit', null, 1, [130, 2, 80]),
  wp('AMUSEMENT PARK', 1190, 1160, 'monument', null, 1, [15, 2, 135]),
  wp('BAR', 1103, 1215, 'city', null, null, [12, 2, 58]),
  wp('HARBOR', 1005, 1190, 'transit', null, null, [-32, 2, 152]),
  wp('ZOO', 898, 758, 'nature', null, 1, [-65, 2, 0])
];

export const CATC = {
  monument: '#ffb547',
  city: '#5cc8ff',
  transit: '#b48cff',
  nature: '#6fdc8c'
};

export const TINTC = {
  red: '#ff5a4d',
  yellow: '#ffd84a',
  blue: '#4aa3ff'
};

export const dotColor = d => TINTC[d.tint] || CATC[d.cat];

export const IC = {
  monument: '<svg viewBox="0 0 24 24"><path d="M3 21h18M5 21V10M9.5 21V10M14.5 21V10M19 21V10M2.5 10 12 4l9.5 6"/></svg>',
  city: '<svg viewBox="0 0 24 24"><path d="M4 21V7l7-3v17M11 21V10l9 3v8M2 21h20M7 10v.01M7 14v.01M15 15v.01M18 17v.01"/></svg>',
  transit: '<svg viewBox="0 0 24 24"><rect x="5" y="3" width="14" height="14" rx="3"/><path d="M5 11h14M9 21l2-4M15 21l-2-4M9 14h.01M15 14h.01"/></svg>',
  nature: '<svg viewBox="0 0 24 24"><path d="m3 20 6-11 4 6 3-4 5 9H3Z"/></svg>',
  you: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>'
};

export const BL = {
  'GUILIN': 'Karst peaks rising from a misty river.',
  'PANDA RESERVE': 'Bamboo groves and giant pandas.',
  'MT FUJI': 'Snow-capped sacred volcano.',
  'TOKYO': 'Neon blocks of a dense, colourful city.',
  'TOKYO TOWER': 'Red-and-white lattice broadcast tower.',
  'SENSO-JI': 'Temple gate and pagoda in Asakusa.',
  'FUSHIMI INARI': 'A path of vermilion torii gates.',
  'GYEONGBOKGUNG': 'Royal palace of the Joseon dynasty.',
  'SEOUL': 'Glass towers and neon streets.',
  'GEUNJEONGJEON': 'The palace throne hall.',
  'KING SEJONG': 'Golden statue of the scholar-king.',
  'CHEONGGYECHEON': 'Restored stream through downtown.',
  'FORBIDDEN CITY': 'Imperial palace walls and golden roofs.',
  'TERRACOTTA': 'The buried clay army.',
  'ALPS': 'Snow ridges around an alpine lake.',
  'BIG BEN': 'Clock tower beside the London Eye and a bridge.',
  'LONDON': 'Brick streets and red buses.',
  'AIRPORT': 'Terminal, control tower, runway and parked jets.',
  'AMUSEMENT PARK': 'Ferris wheel, roller coaster and carousel.',
  'BAR': 'Neon-lit corner bar with outdoor tables.',
  'ZOO': 'Elephants, giraffes, lions, penguins and a bird dome.',
  'HARBOR': 'Pier with ships, a crane and a lighthouse.',
  'EIFFEL': 'Iron lattice tower and its gardens.',
  'CITADEL': 'Central fortress and travel hub.',
  'TAJ MAHAL': 'White marble mausoleum with a reflecting pool.',
  'RADIATOR SPRINGS': 'Desert main street of neon and fins.',
  'McQUEEN': 'Racing stadium with a lap track.',
  'NEO YORK': 'Skyscraper canyon lit by neon billboards.',
  'DUBAI': 'Glass towers around a record-breaking spire.',
  'PALM JUMEIRAH': 'Palm-shaped island of fronds and villas.',
  'ATLANTIS RESORT': 'Twin-tower resort at the palm crown.',
  'WORLD ISLANDS': 'Archipelago of small private islands.',
  'THE WORLD ISLANDS': 'Island chain shaped like a world map.',
  'BURJ AL ARAB': 'Sail-shaped hotel on its own island.',
  'BLUEWATERS': 'Island district beside the big wheel.',
  'AIN DUBAI WHEEL': 'One of the tallest observation wheels.',
  'GIZA': 'Great pyramids and the Sphinx.',
  'MEXICO CITY': 'Stepped pyramid above colourful streets.'
};

export const BLH = [
  'The hillside HOLLYWOOD sign.',
  'Chinese theatre and red carpet.',
  'Walk of Fame brass stars.'
];

export const blurb = i => {
  const d = DATA[i];
  if (!d) return '';
  if (d.n === 'HOLLYWOOD') return BLH[DATA.slice(0, i).filter(x => x.n === 'HOLLYWOOD').length] || '';
  return BL[d.n] || '';
};

export const TINT = {
  def: ['#f1e2b5', '#3a230f', '#5b3a18'],
  red: ['#f6c9c0', '#8c1a14', '#a3322a'],
  yellow: ['#fff0a6', '#5b4300', '#b58a1a'],
  blue: ['#cfe6f5', '#17466e', '#3b78a8']
};

export function getPlayerFromUrl() {
  if (typeof location === 'undefined') return { X: -79, Z: 70, yaw: 200 };
  const q = new URLSearchParams(location.search);
  return {
    X: q.has('x') ? +q.get('x') : -79,
    Z: q.has('z') ? +q.get('z') : 70,
    yaw: q.has('yaw') ? +q.get('yaw') : 200
  };
}

export const PLAYER = getPlayerFromUrl();

export const dist = (X, Z, pX = PLAYER.X, pZ = PLAYER.Z) => Math.round(Math.hypot(X - pX, Z - pZ));
