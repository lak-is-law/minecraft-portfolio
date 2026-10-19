export const PPB = 2.63;
export const OX = 1140;
export const OY = 790;

export const wx = px => (px - OX) / PPB;
export const wz = py => (py - OY) / PPB;
export const W2 = p => [wx(p[0]), wz(p[1])];

export const wp = (n, px, py, cat, tint, big) => ({
  n,
  cat,
  tint,
  big,
  x: wx(px),
  z: wz(py),
  X: Math.round(wx(px)),
  Z: Math.round(wz(py))
});

export const DATA = [
  wp('GUILIN', 865, 395, 'nature'),
  wp('PANDA RESERVE', 800, 437, 'nature'),
  wp('MT FUJI', 693, 448, 'nature'),
  wp('TOKYO', 715, 495, 'city'),
  wp('TOKYO', 735, 527, 'city'),
  wp('TOKYO TOWER', 677, 543, 'monument'),
  wp('SENSO-JI', 733, 569, 'monument'),
  wp('FUSHIMI INARI', 641, 684, 'monument'),
  wp('GYEONGBOKGUNG', 938, 435, 'monument'),
  wp('SEOUL', 1003, 435, 'city'),
  wp('GEUNJEONGJEON', 968, 461, 'monument'),
  wp('SEOUL', 970, 488, 'city'),
  wp('KING SEJONG', 969, 516, 'monument'),
  wp('CHEONGGYECHEON', 970, 545, 'nature'),
  wp('FORBIDDEN CITY', 878, 456, 'monument'),
  wp('TERRACOTTA', 868, 527, 'monument'),
  wp('ALPS', 1135, 474, 'nature'),
  wp('BIG BEN', 1056, 585, 'monument'),
  wp('LONDON', 985, 615, 'city'),
  wp('EIFFEL', 1209, 637, 'monument'),
  wp('CITADEL', 1140, 790, 'transit'),
  wp('TAJ MAHAL', 1350, 382, 'monument'),
  wp('HOLLYWOOD', 1574, 474, 'monument'),
  wp('HOLLYWOOD', 1608, 538, 'monument'),
  wp('HOLLYWOOD', 1537, 577, 'monument'),
  wp('RADIATOR SPRINGS', 1690, 690, 'city', 'red'),
  wp('McQUEEN', 1650, 730, 'monument'),
  wp('NEO YORK', 1403, 785, 'city'),
  wp('DUBAI', 1590, 890, 'city'),
  wp('PALM JUMEIRAH', 1700, 910, 'transit'),
  wp('PALM JUMEIRAH', 1820, 885, 'monument', 'yellow'),
  wp('PALM JUMEIRAH', 1985, 905, 'monument'),
  wp('ATLANTIS RESORT', 1992, 935, 'monument', 'red'),
  wp('WORLD ISLANDS', 2060, 850, 'nature'),
  wp('WORLD ISLANDS', 2087, 905, 'nature'),
  wp('THE WORLD ISLANDS', 2140, 968, 'nature', 'yellow'),
  wp('BURJ AL ARAB', 1719, 1076, 'monument', 'blue'),
  wp('BLUEWATERS', 1835, 1140, 'city'),
  wp('AIN DUBAI WHEEL', 1829, 1192, 'monument', 'blue'),
  wp('GIZA', 733, 860, 'monument'),
  wp('MEXICO CITY', 864, 955, 'city'),
  wp('AIRPORT', 1022, 915, 'transit', null, 1),
  wp('AMUSEMENT PARK', 1190, 1160, 'monument', null, 1),
  wp('BAR', 1103, 1215, 'city'),
  wp('HARBOR', 1005, 1190, 'transit'),
  wp('ZOO', 898, 758, 'nature', null, 1)
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
