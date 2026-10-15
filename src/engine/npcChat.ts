import * as THREE from 'three';

export interface NPCLocationInfo {
  id: string;
  name: string;
  role: string;
  areaName: string;
  coords: { x: number; y: number; z: number };
  directionFromSpawn: string;
  nearbyLandmarks: string[];
  ambientMessages: string[];
  proximityGreeting: string;
  detailedLocationText: string;
  tagColor?: string;
  emoji?: string;
}

export class NPCChatManager {
  private npcs: Map<string, NPCLocationInfo> = new Map();
  private lastAmbientTime: number = 0;
  private ambientInterval: number = 18.0; // Seconds between random ambient NPC chats
  private proximityCooldowns: Map<string, number> = new Map();
  private pushChatFn?: (sender: string, text: string) => void;
  private ambientPool: string[] = [];
  private currentAmbientIndex: number = 0;
  private isInitialized: boolean = false;

  constructor() {
    this.registerAllNPCs();
  }

  public init(pushChatFn: (sender: string, text: string) => void) {
    this.pushChatFn = pushChatFn;
    this.isInitialized = true;
    this.lastAmbientTime = performance.now() * 0.001 - 14.0; // Trigger first ambient chat after ~4 seconds of gameplay

    // Shuffle pool of ambient NPC ids
    this.ambientPool = Array.from(this.npcs.keys());
    for (let i = this.ambientPool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.ambientPool[i], this.ambientPool[j]] = [this.ambientPool[j], this.ambientPool[i]];
    }
  }

  private registerAllNPCs() {
    const list: NPCLocationInfo[] = [
      // -------------------------------------------------------------
      // CORE SPAWN & COMPANIONS
      // -------------------------------------------------------------
      {
        id: 'lakshya_guide',
        name: 'Lakshya',
        role: 'Portfolio Guide & Engineer',
        areaName: 'Crossroads Citadel Spawn Plaza',
        coords: { x: 3.5, y: 2.0, z: 7.5 },
        directionFromSpawn: 'Spawn Center (Island Nexus)',
        nearbyLandmarks: ['Emerald Central Fountain', 'Fast Travel Nether Portal', 'Ancient Resume Chest', 'Skills Matrix'],
        ambientMessages: [
          'Standing at Crossroads Citadel Spawn Plaza [X: 4, Y: 2, Z: 8] by the Emerald Fountain! Press [M] anytime for Fast Travel.',
          'Welcome to my 3D resume portfolio! Talk to me or Roger to inspect my projects, experience, and career dossier.',
          'Checking server telemetry at Spawn Plaza [X: 4, Y: 2, Z: 8]. Come say hi or inspect the project pedestals!',
          'Hanging out by the spawn fountain [X: 4, Y: 2, Z: 8] with Roger! Press [B] to build or [F] to fly.'
        ],
        proximityGreeting: 'Hey explorer! You found me at Crossroads Citadel Spawn Plaza [X: 4, Y: 2, Z: 8]! Talk to me to explore my resume & projects!',
        detailedLocationText: 'I am stationed right here at the Crossroads Citadel Spawn Plaza [X: 3.5, Y: 2.0, Z: 7.5], the beating heart of this portfolio island!\n\nSurroundings:\n• North: Emerald Central Fountain & Nether Portal\n• East: Neo York Tech Metropolis & Taj Mahal\n• West: Grand Safari Wildlife Park & Animal Habitats\n• South: Redstone Nether Portal, Circular Railway Station, and Builder Arena\n\nPress [M] to open your Fast Travel Realm Map and warp anywhere instantly!',
        tagColor: '#ca8a04',
        emoji: '🧑‍💻'
      },
      {
        id: 'roger',
        name: 'Roger',
        role: 'Loyal Companion Dog 🐾',
        areaName: 'Crossroads Citadel Spawn Plaza',
        coords: { x: 4.5, y: 2.0, z: 7.3 },
        directionFromSpawn: 'Spawn Center (Beside Lakshya)',
        nearbyLandmarks: ['Lakshya Guide', 'Emerald Fountain', 'Spawn Gateway'],
        ambientMessages: [
          '*Woof woof!* Guarding Spawn Plaza [X: 5, Y: 2, Z: 7] next to Lakshya! Wags tail happily.',
          '*Arf!* Roger guards Lakshya\'s Ancient Resume Chest! Come say hi and I\'ll fetch it for you!',
          '*Pant pant!* Sunbathing on the cobblestones at Spawn Plaza [X: 5, Y: 2, Z: 7]! Come toss a stick or give me steak!',
          '*Arf!* Greeting travelers at the Spawn Plaza [X: 5, Y: 2, Z: 7]! The island breeze smells wonderful today.'
        ],
        proximityGreeting: '*Woof!* Roger leaps up excitedly at Spawn Plaza [X: 5, Y: 2, Z: 7] and happily nudges your hand!',
        detailedLocationText: '*Woof woof!* Roger circles around and points his furry snout!\n\n📍 Roger\'s Spot: Crossroads Citadel Spawn Plaza [X: 4.5, Y: 2.0, Z: 7.3]\n\n"I live right here beside Lakshya at the center of the world! When you look around, you can see the emerald fountain water splashing, the golden landmark beacons, and the path leading to the safari zoo!"',
        tagColor: '#16a34a',
        emoji: '🐶'
      },
      {
        id: 'oreo_cat',
        name: 'Oreo',
        role: 'Tuxedo Beach Cat 🐱',
        areaName: 'Palm Paradise Coastal Boulders',
        coords: { x: 10.5, y: 1.0, z: 82.5 },
        directionFromSpawn: 'South towards Palm Paradise Beach',
        nearbyLandmarks: ['Palm Paradise Beach', 'Grand Carnival & Ferris Wheel', 'Sunset Saloon & Beach Bar'],
        ambientMessages: [
          '*Purrrrr...* Basking on warm coastal boulders [X: 11, Y: 1, Z: 83] by Palm Paradise Beach!',
          '*Meow!* Watching waves crash against the shore at Coastal Boulders [X: 11, Y: 1, Z: 83]!',
          '*Yawn & stretch...* Cozy naps on the rocks at Coastal Boulders [X: 11, Y: 1, Z: 83] near the Beach Boardwalk.'
        ],
        proximityGreeting: '*Purrrrr!* Oreo blinks slowly from the coastal boulders [X: 11, Y: 1, Z: 83] and rolls over on the warm stone.',
        detailedLocationText: '*Prrrr...* Oreo stretches gracefully and looks out toward the turquoise sea.\n\n📍 Location: Coastal Boulders Beachfront [X: 10.5, Y: 1.0, Z: 82.5]\n\n"This is Palm Paradise Coastal Boulders, south of Spawn Plaza! To the north is the Sunset Saloon, and just east are the golden sands of Palm Paradise Beach and the Grand Ferris Wheel."',
        tagColor: '#18181b',
        emoji: '🐱'
      },
      {
        id: 'lightning_mcqueen',
        name: 'Lightning McQueen #95',
        role: '7-Time Piston Cup Champion ⚡',
        areaName: 'Lightning McQueen Street & Piston Cup Raceway',
        coords: { x: 168, y: 2.0, z: -24 },
        directionFromSpawn: 'East towards Hollywood & Radiator Springs Raceway',
        nearbyLandmarks: ["Flo's V8 Café", "Luigi's Casa Della Tires", "Tow Mater Salvage", "Piston Cup Gantry Arch"],
        ambientMessages: [
          '⚡ Ka-Chow! Tearing down Lightning McQueen Street [X: 168, Y: 2, Z: -24]! Press [E] to race in 3D!',
          '⚡ "I am speed! Faster than fast, quicker than quick!" Lapping Radiator Springs Raceway [X: 168, Y: 2, Z: -24]!',
          '⚡ Twin exhaust flame pops on Lightning McQueen Street [X: 168, Y: 2, Z: -24]! Hold [Shift] for Nitro Boost!'
        ],
        proximityGreeting: '⚡ Ka-Chow! Lightning McQueen revs up at Lightning McQueen Street [X: 168, Y: 2, Z: -24]! "Jump in, racer!"',
        detailedLocationText: '⚡ "Ka-Chow!!"\n\n📍 Location: Lightning McQueen Street & Radiator Springs Raceway [X: 168, Y: 2, Z: -24]\n\n"Tearing up the track right next to Flo\'s V8 Café, Luigi\'s tire tower, and Doc Hudson\'s pit box! Press [E] anytime to board and tear up the asphalt with 3D racing physics and nitro boost!"',
        tagColor: '#dc2626',
        emoji: '🏎️'
      },
      {
        id: 'doc_hudson',
        name: 'Doc Hudson #51',
        role: '3-Time Piston Cup Champion · Crew Chief 🏁',
        areaName: 'Doc Hudson Pit Crew Box · Radiator Springs',
        coords: { x: 178, y: 2.0, z: -31 },
        directionFromSpawn: 'East towards Radiator Springs Raceway Infield',
        nearbyLandmarks: ["Willy's Butte", "Flo's V8 Café", "Tow Mater Salvage", "Piston Cup Gantry"],
        ambientMessages: [
          '🏁 "When you\'re entering the turn in the dirt, turn right to go left!" — Doc Hudson #51 [X: 178, Z: -31]',
          '🏁 Doc Hudson revs his classic Twin H-Power engine at his Pit Box [X: 178, Z: -31]! Press [E] to challenge him to a race!',
          '🏁 "They\'re just empty cups, kid. It\'s the race that matters." — The Fabulous Hudson Hornet [X: 178, Z: -31]'
        ],
        proximityGreeting: '🏁 "Hey rookie. Think you can beat the Fabulous Hudson Hornet around Willy\'s Butte? Press [E] to challenge me!"',
        detailedLocationText: '🏁 "The Fabulous Hudson Hornet"\n\n📍 Location: Doc Hudson Pit Box & Willy\'s Butte [X: 178, Y: 2, Z: -31]\n\n"3-Time Piston Cup Champion (1951, 1952, 1953). Master of the dirt slide: Turn right to go left! Press [E] to talk with Doc and start a head-to-head 2-lap race challenge!"',
        tagColor: '#1e40af',
        emoji: '🏁'
      },

      // -------------------------------------------------------------
      // SAFARI ZOO WILDLIFE
      // -------------------------------------------------------------
      {
        id: 'animal_panda_Bao_Bao',
        name: '🐼 Bao Bao',
        role: 'Giant Panda',
        areaName: 'Giant Panda Bamboo Valley',
        coords: { x: -54, y: 1.0, z: -12 },
        directionFromSpawn: 'North-West (Safari Valley)',
        nearbyLandmarks: ['Bamboo Groves', 'Savanna Lions', 'Safari Railway Overlook'],
        ambientMessages: [
          'Crunching fresh bamboo shoots at Giant Panda Bamboo Valley [X: -54, Y: 1, Z: -12]!',
          'Tumbling happily down the grassy slopes of Giant Panda Bamboo Valley [X: -54, Y: 1, Z: -12]!',
          'Chilling in the shaded green stalks at Bamboo Valley [X: -54, Y: 1, Z: -12]. Fresh bamboo is delicious!'
        ],
        proximityGreeting: '🐼 Bao Bao peers through the bamboo at Giant Panda Bamboo Valley [X: -54, Y: 1, Z: -12] and munches contentedly!',
        detailedLocationText: '📍 Location: Giant Panda Bamboo Valley [X: -54, Y: 1, Z: -12]\n\n"You are standing in the lush bamboo canopy of Crossroads Wildlife Park, northwest of Spawn Plaza! The pandas spend their days snacking on bamboo shoots and rolling across the soft hillside."',
        tagColor: '#14532d',
        emoji: '🐼'
      },
      {
        id: 'animal_panda_Mei_Xiang',
        name: '🐼 Mei Xiang',
        role: 'Panda Mother',
        areaName: 'Giant Panda Bamboo Valley',
        coords: { x: -52, y: 1.0, z: -16 },
        directionFromSpawn: 'North-West (Safari Valley)',
        nearbyLandmarks: ['Bamboo Groves', 'Panda Valley Stream'],
        ambientMessages: [
          'Resting peacefully by the bamboo thicket at Giant Panda Bamboo Valley [X: -52, Y: 1, Z: -16]!',
          'Watching over little Xiao Qi at Bamboo Valley [X: -52, Y: 1, Z: -16]. Nature is so peaceful here.'
        ],
        proximityGreeting: '🐼 Mei Xiang nudges a bamboo shoot at Bamboo Valley [X: -52, Y: 1, Z: -16] welcoming you softly.',
        detailedLocationText: '📍 Location: Giant Panda Bamboo Valley [X: -52, Y: 1, Z: -16]\n\n"A tranquil grove enclosed by tall emerald bamboo canes, west of Crossroads Citadel. The gentle stream keeps the valley cool throughout all seasons."',
        tagColor: '#14532d',
        emoji: '🐼'
      },
      {
        id: 'animal_panda_Xiao_Qi',
        name: '🐼 Xiao Qi',
        role: 'Panda Cub',
        areaName: 'Giant Panda Bamboo Valley',
        coords: { x: -60, y: 1.0, z: -11 },
        directionFromSpawn: 'North-West (Safari Valley)',
        nearbyLandmarks: ['Bamboo Water Canal', 'Elephant Oasis Entrance'],
        ambientMessages: [
          'Doing clumsy somersaults in Giant Panda Bamboo Valley [X: -60, Y: 1, Z: -11]! Wee!',
          'Rolling downhill through the bamboo at Bamboo Valley [X: -60, Y: 1, Z: -11]!'
        ],
        proximityGreeting: '🐼 Xiao Qi squeaks with joy at Bamboo Valley [X: -60, Y: 1, Z: -11] and rolls toward your boots!',
        detailedLocationText: '📍 Location: Giant Panda Bamboo Valley [X: -60, Y: 1, Z: -11]\n\n"The playful nursery section of the Bamboo Valley! Xiao Qi loves practicing tumbling tricks in the soft grass."',
        tagColor: '#14532d',
        emoji: '🐼'
      },
      {
        id: 'animal_lion_Simba',
        name: '🦁 Simba',
        role: 'African Lion King',
        areaName: 'Serengeti African Lion Kopje',
        coords: { x: -93, y: 4.0, z: -14 },
        directionFromSpawn: 'Far West (Safari High Kopje)',
        nearbyLandmarks: ['Granite Kopje Rock', 'Savanna Plains', 'Island Express Railway'],
        ambientMessages: [
          '*ROAAR!* Surveying the golden savanna from Serengeti Lion Kopje [X: -93, Y: 4, Z: -14]!',
          'Perched high on the granite kopje rock [X: -93, Y: 4, Z: -14] watching the railway trains glide past!',
          '*Deep regal rumble...* Guarding the western horizon from Lion Kopje [X: -93, Y: 4, Z: -14]!'
        ],
        proximityGreeting: '🦁 Simba lets out a low, respectful rumble from atop Serengeti Lion Kopje [X: -93, Y: 4, Z: -14]!',
        detailedLocationText: '📍 Location: Serengeti African Lion Kopje [X: -93, Y: 4, Z: -14]\n\n"Perched atop the highest granite boulder outcrop in the western savanna territory! From here, the king of beasts keeps watch over the railway loop, the open plains, and approaching visitors."',
        tagColor: '#854d0e',
        emoji: '🦁'
      },
      {
        id: 'animal_lion_Nala',
        name: '🦁 Nala',
        role: 'Lioness',
        areaName: 'Serengeti African Lion Kopje',
        coords: { x: -90, y: 2.0, z: -11 },
        directionFromSpawn: 'Far West (Safari Kopje)',
        nearbyLandmarks: ['Granite Kopje Base', 'Savanna Grasslands'],
        ambientMessages: [
          'Stretching under the savanna sun at Serengeti Lion Kopje [X: -90, Y: 2, Z: -11]!',
          'Resting in the shade of the kopje rocks at [X: -90, Y: 2, Z: -11] while watching over the plains.'
        ],
        proximityGreeting: '🦁 Nala gazes at you calmly from the foot of Serengeti Lion Kopje [X: -90, Y: 2, Z: -11]!',
        detailedLocationText: '📍 Location: Serengeti African Lion Kopje [X: -90, Y: 2, Z: -11]\n\n"Resting at the lower terrace of the Kopje outcrop, sheltered from midday winds with views stretching east to the central hub."',
        tagColor: '#854d0e',
        emoji: '🦁'
      },
      {
        id: 'animal_elephant_Tembo',
        name: '🐘 Tembo',
        role: 'African Bull Elephant',
        areaName: 'Gentle African Elephant Oasis',
        coords: { x: -86, y: 1.0, z: 12 },
        directionFromSpawn: 'South-West (Safari Water Oasis)',
        nearbyLandmarks: ['Oasis Waterfall Pool', 'Sugar Cane Banks', 'Giraffe Canopy'],
        ambientMessages: [
          '*Trumpet blast!* Cooling off at the Gentle Elephant Oasis [X: -86, Y: 1, Z: 12]!',
          'Spraying refreshing river water with my trunk at Elephant Oasis [X: -86, Y: 1, Z: 12]!',
          'Munching sweet sugar cane by the waterhole at [X: -86, Y: 1, Z: 12] in the Elephant Oasis.'
        ],
        proximityGreeting: '🐘 Tembo trumpets a mighty greeting at Gentle Elephant Oasis [X: -86, Y: 1, Z: 12]!',
        detailedLocationText: '📍 Location: Gentle African Elephant Oasis [X: -86, Y: 1, Z: 12]\n\n"A wide, glistening freshwater watering hole southwest of Spawn Citadel! Tembo and the herd bathe here under cascading waterfall streams flanked by wild sugar cane."',
        tagColor: '#334155',
        emoji: '🐘'
      },
      {
        id: 'animal_giraffe_Twiga',
        name: '🦒 Twiga',
        role: "Rothschild's Giraffe",
        areaName: 'Rothschild Giraffe Canopy Reserve',
        coords: { x: -66, y: 1.0, z: 14 },
        directionFromSpawn: 'South-West (Safari Forest)',
        nearbyLandmarks: ['Acacia Forest Canopy', 'Petting Zoo Gate', 'Elephant Oasis'],
        ambientMessages: [
          'Reaching for the sweetest acacia tree tops at Giraffe Canopy Reserve [X: -66, Y: 1, Z: 14]!',
          'Peeking over the tree line at Rothschild Giraffe Reserve [X: -66, Y: 1, Z: 14]! I can see Spawn from here!',
          'Chewing acacia leaves peacefully at Giraffe Reserve [X: -66, Y: 1, Z: 14]. The view up here is amazing.'
        ],
        proximityGreeting: '🦒 Twiga bends her long, elegant neck down at Giraffe Reserve [X: -66, Y: 1, Z: 14] to inspect you!',
        detailedLocationText: '📍 Location: Rothschild Giraffe Canopy Reserve [X: -66, Y: 1, Z: 14]\n\n"Nestled between the Elephant Oasis and Petting Zoo southwest of Spawn Citadel! The towering acacia trees provide a feast for the world\'s tallest gentle giants."',
        tagColor: '#a16207',
        emoji: '🦒'
      },
      {
        id: 'animal_polar_bear_Nanook',
        name: '🐻‍❄️ Nanook',
        role: 'Apex Polar Bear',
        areaName: 'Glacial Iceberg Cove (Arctic Sanctuary)',
        coords: { x: -80, y: 1.0, z: -14 },
        directionFromSpawn: 'North-West (Safari Arctic Coast)',
        nearbyLandmarks: ['Pack Ice Formations', 'Penguin Colony Shelf', 'Ocean Fjord'],
        ambientMessages: [
          'Diving into chilled ocean waters from Glacial Iceberg Cove [X: -80, Y: 1, Z: -14]!',
          'Sniffing the crisp arctic breeze across Glacial Iceberg Cove [X: -80, Y: 1, Z: -14]!',
          'Resting on the solid blue pack ice at [X: -80, Y: 1, Z: -14] in Arctic Cove.'
        ],
        proximityGreeting: '🐻‍❄️ Nanook huffs a cloud of chilly steam at Glacial Iceberg Cove [X: -80, Y: 1, Z: -14] in greeting!',
        detailedLocationText: '📍 Location: Glacial Iceberg Cove [X: -80, Y: 1, Z: -14]\n\n"The frozen arctic coastline northwest of the Spawn Citadel! Thick shelves of packed blue ice jut into the sea where polar bears hunt and swim."',
        tagColor: '#0369a1',
        emoji: '🐻‍❄️'
      },
      {
        id: 'animal_penguin_Pingu',
        name: '🐧 Pingu',
        role: 'Emperor Penguin',
        areaName: 'Antarctic Colony Shelf (Arctic Sanctuary)',
        coords: { x: -74, y: 1.0, z: -9 },
        directionFromSpawn: 'North-West (Safari Arctic Shelf)',
        nearbyLandmarks: ['Slide Snow Slope', 'Iceberg Cove', 'Bamboo Valley Edge'],
        ambientMessages: [
          '*Noot noot!* Belly-tobogganing across the ice shelf at Antarctic Colony [X: -74, Y: 1, Z: -9]!',
          'Waddling in formation along the snow ridge at Antarctic Shelf [X: -74, Y: 1, Z: -9]!',
          'Catching fresh silver cod fish at [X: -74, Y: 1, Z: -9] in Antarctic Colony!'
        ],
        proximityGreeting: '🐧 Pingu flaps his flippers and gives a cheerful *Noot noot!* at Antarctic Shelf [X: -74, Y: 1, Z: -9]!',
        detailedLocationText: '📍 Location: Antarctic Colony Shelf [X: -74, Y: 1, Z: -9]\n\n"The snowy ice-shelf playground northwest of Citadel! Emperor penguins slide across the slick snow banks on their bellies and dive into crystal-clear pools."',
        tagColor: '#0f766e',
        emoji: '🐧'
      },
      {
        id: 'animal_polar_bear_Aurora',
        name: '🐻‍❄️ Aurora',
        role: 'Glacial Polar Bear',
        areaName: 'Frostpeak Alps Mountain Summit',
        coords: { x: -6, y: 8.0, z: -118 },
        directionFromSpawn: 'North (Frostpeak Mountain)',
        nearbyLandmarks: ['Chalet de Lakshya Ski Lodge', 'Lake Serenity Ice Rink', 'Cable Car Gondola'],
        ambientMessages: [
          'Strolling the snowbound peaks of Frostpeak Alps Summit [X: -6, Y: 8, Z: -118]!',
          'Enjoying fresh alpine powder on Frostpeak Alps [X: -6, Y: 8, Z: -118] overlooking Lake Serenity!'
        ],
        proximityGreeting: '🐻‍❄️ Aurora nods respectfully amidst falling alpine snow at Frostpeak Alps [X: -6, Y: 8, Z: -118]!',
        detailedLocationText: '📍 Location: Frostpeak Alps Mountain Summit [X: -6, Y: 8, Z: -118]\n\n"High above the world in the snow-capped Frostpeak Alps mountain range, north of Spawn Citadel! Pristine ski slopes, Chalet de Lakshya, and panoramic alpine views."',
        tagColor: '#0369a1',
        emoji: '🐻‍❄️'
      },
      {
        id: 'animal_penguin_Blizzard',
        name: '🐧 Blizzard',
        role: 'Alpine Emperor Penguin',
        areaName: 'Frostpeak Alps · Lake Serenity Ice Rink',
        coords: { x: -10, y: 8.0, z: -112 },
        directionFromSpawn: 'North (Frostpeak Alpine Lake)',
        nearbyLandmarks: ['Lake Serenity Ice Rink', 'Ski Lodge', 'Observatory Summit'],
        ambientMessages: [
          'Figure-skating on the glassy ice of Lake Serenity at Frostpeak Alps [X: -10, Y: 8, Z: -112]!',
          '*Flap flap!* Waddling around the Lake Serenity ice rink [X: -10, Y: 8, Z: -112] in Frostpeak Alps!'
        ],
        proximityGreeting: '🐧 Blizzard slides to a smooth stop on the ice at Lake Serenity [X: -10, Y: 8, Z: -112]!',
        detailedLocationText: '📍 Location: Frostpeak Alps · Lake Serenity [X: -10, Y: 8, Z: -112]\n\n"The natural frozen mirror lake in the Frostpeak Alps mountain bowl! Perfect for ice skating and penguin sliding."',
        tagColor: '#0f766e',
        emoji: '🐧'
      },
      {
        id: 'animal_zebra_Marty',
        name: '🦓 Marty',
        role: 'Plains Zebra',
        areaName: 'Serengeti Open Plains',
        coords: { x: -75, y: 1.0, z: 3 },
        directionFromSpawn: 'West (Savanna Plains)',
        nearbyLandmarks: ['Island Express Railway Loop', 'Flamingo Lagoon', 'Lion Kopje'],
        ambientMessages: [
          'Galloping alongside the Island Express Railway train at Serengeti Plains [X: -75, Y: 1, Z: 3]!',
          'Grazing fresh savanna grass at Serengeti Open Plains [X: -75, Y: 1, Z: 3]!'
        ],
        proximityGreeting: '🦓 Marty whinnies playfully by the railway line at Serengeti Plains [X: -75, Y: 1, Z: 3]!',
        detailedLocationText: '📍 Location: Serengeti Open Plains [X: -75, Y: 1, Z: 3]\n\n"The sweeping central savanna grasslands west of Spawn, where zebra herds run parallel to the passenger railway circuit."',
        tagColor: '#374151',
        emoji: '🦓'
      },
      {
        id: 'animal_flamingo_Flora',
        name: '🦩 Flora',
        role: 'Greater Flamingo',
        areaName: 'Flamingo Lagoon Wetlands',
        coords: { x: -63, y: 1.0, z: -3 },
        directionFromSpawn: 'West-Central (Wetlands)',
        nearbyLandmarks: ['Lily Pad Waters', 'Zebra Savanna', 'Central Zoo Promenade'],
        ambientMessages: [
          'Balancing gracefully on one leg in Flamingo Lagoon [X: -63, Y: 1, Z: -3]!',
          'Dipping into the crystal shallows at Flamingo Lagoon [X: -63, Y: 1, Z: -3]. The water is so clear!'
        ],
        proximityGreeting: '🦩 Flora ripples the pink water gracefully at Flamingo Lagoon [X: -63, Y: 1, Z: -3]!',
        detailedLocationText: '📍 Location: Flamingo Lagoon Wetlands [X: -63, Y: 1, Z: -3]\n\n"A sunlit wetland lagoon filled with water lilies and shallows west of Crossroads Citadel."',
        tagColor: '#db2777',
        emoji: '🦩'
      },
      {
        id: 'animal_sheep_Woolly',
        name: '🐑 Woolly',
        role: 'Merino Sheep',
        areaName: "Children's Petting Zoo & Barnyard",
        coords: { x: -46, y: 1.0, z: 14 },
        directionFromSpawn: 'South-West (Petting Zoo)',
        nearbyLandmarks: ['Sunflower Fields', 'Giraffe Canopy Gate', 'Farmstead Fences'],
        ambientMessages: [
          '*Baaaa!* Munching sweet field wheat at Children\'s Petting Zoo [X: -46, Y: 1, Z: 14]!',
          'Enjoying gentle pets from visitors at Petting Zoo [X: -46, Y: 1, Z: 14]!'
        ],
        proximityGreeting: '🐑 Woolly baas softly at Petting Zoo [X: -46, Y: 1, Z: 14] and nudges your hand for wheat!',
        detailedLocationText: '📍 Location: Children\'s Petting Zoo [X: -46, Y: 1, Z: 14]\n\n"The welcoming countryside barnyard enclosure southwest of Spawn Citadel, filled with friendly sheep, piglets, and yellow sunflowers."',
        tagColor: '#475569',
        emoji: '🐑'
      },
      {
        id: 'animal_pig_Wilbur',
        name: '🐖 Wilbur',
        role: 'Pink Piglet',
        areaName: "Children's Petting Zoo & Barnyard",
        coords: { x: -44, y: 1.0, z: 15 },
        directionFromSpawn: 'South-West (Petting Zoo)',
        nearbyLandmarks: ['Feed Troughs', 'Wooden Stalls'],
        ambientMessages: [
          '*Oink oink!* Snuffling in the fresh garden soil at Petting Zoo [X: -44, Y: 1, Z: 15] looking for carrots!',
          'Rooting happily through the dirt at [X: -44, Y: 1, Z: 15] in the Barnyard Pen.'
        ],
        proximityGreeting: '🐖 Wilbur squeals happily at Petting Zoo [X: -44, Y: 1, Z: 15] wiggling his curly tail!',
        detailedLocationText: '📍 Location: Children\'s Petting Zoo [X: -44, Y: 1, Z: 15]\n\n"The cozy barnyard corner with fresh straw and carrot feed troughs."',
        tagColor: '#be185d',
        emoji: '🐷'
      },
      {
        id: 'animal_sheep_Clover',
        name: '🐑 Clover',
        role: 'Pasture Sheep',
        areaName: 'Sunflower Valley · Farmstead Pastures',
        coords: { x: -30, y: 1.0, z: 42 },
        directionFromSpawn: 'South-West (Sunflower Valley)',
        nearbyLandmarks: ['Dutch Windmill', 'Golden Sunflower Fields', 'Countryside Barn'],
        ambientMessages: [
          '*Baaa!* Grazing golden blossoms across Sunflower Valley [X: -30, Y: 1, Z: 42]!',
          'Resting in the breeze under the Dutch Windmill at Sunflower Valley [X: -30, Y: 1, Z: 42].'
        ],
        proximityGreeting: '🐑 Clover grazes peacefully amongst the sunflowers at [X: -30, Y: 1, Z: 42] in Sunflower Valley!',
        detailedLocationText: '📍 Location: Sunflower Valley Pastures [X: -30, Y: 1, Z: 42]\n\n"The rural agricultural valley southwest of Citadel, crowned with a rotating 4-sail Dutch Windmill and endless blooming sunflowers."',
        tagColor: '#475569',
        emoji: '🐑'
      },
      {
        id: 'animal_tiger_Sher_Khan',
        name: '🐅 Sher Khan',
        role: 'Royal Bengal Tiger',
        areaName: 'Imperial India · Royal Banyan Forest',
        coords: { x: 50, y: 1.0, z: -140 },
        directionFromSpawn: 'North-East (Imperial India Realm)',
        nearbyLandmarks: ['Sacred Banyan Trees', 'Taj Mahal Yamuna Canal', 'Varanasi Ghats'],
        ambientMessages: [
          '*Deep guttural roar!* Prowling through the sacred banyan trees at Imperial India [X: 50, Y: 1, Z: -140]!',
          'Watching over the Yamuna riverbanks from the Royal Tiger Grove [X: 50, Y: 1, Z: -140]!',
          'Cooling off beneath shaded banyan roots at [X: 50, Y: 1, Z: -140] in the Tiger Sanctuary.'
        ],
        proximityGreeting: '🐅 Sher Khan pads silently through the banyan shadows at [X: 50, Y: 1, Z: -140] in Imperial India!',
        detailedLocationText: '📍 Location: Imperial India · Royal Banyan Forest [X: 50, Y: 1, Z: -140]\n\n"The ancient sacred banyan grove northeast of Spawn Citadel, near the Varanasi Ghats and Taj Mahal riverway. Bengal tigers are honoured guardians of these lush groves."',
        tagColor: '#9a3412',
        emoji: '🐅'
      },
      {
        id: 'animal_peacock_Mayura',
        name: '🦚 Mayura',
        role: 'Indian Blue Peacock',
        areaName: 'Imperial India · Taj Mahal Lotus Pool',
        coords: { x: 73, y: 2.0, z: -118 },
        directionFromSpawn: 'North-East (Taj Mahal Grounds)',
        nearbyLandmarks: ['White Marble Taj Mahal', 'Yamuna Reflecting Canal', 'Jaipur Hawa Mahal'],
        ambientMessages: [
          'Unfurling majestic iridescent sapphire feathers by the Taj Mahal Lotus Pool [X: 73, Y: 2, Z: -118]!',
          'Dancing in the morning mist across the marble Taj Mahal courtyard [X: 73, Y: 2, Z: -118]!',
          '*Pleasured call!* Strolling the Yamuna water reflecting basin at [X: 73, Y: 2, Z: -118].'
        ],
        proximityGreeting: '🦚 Mayura fans out dazzling emerald and sapphire plumage at Taj Mahal Lotus Pool [X: 73, Y: 2, Z: -118]!',
        detailedLocationText: '📍 Location: Taj Mahal Yamuna Lotus Pool [X: 73, Y: 2, Z: -118]\n\n"Right in front of the magnificent white marble Taj Mahal with its 4 towering minarets northeast of Citadel! The peacocks roam freely along the water canals."',
        tagColor: '#1e3a8a',
        emoji: '🦚'
      },
      {
        id: 'animal_temple_elephant_Gajendra',
        name: '🐘 Gajendra',
        role: 'Caparisoned Temple Elephant',
        areaName: 'Dravidian Temple Gopuram Mandapam',
        coords: { x: 115, y: 2.0, z: -122 },
        directionFromSpawn: 'East-North-East (Temple Complex)',
        nearbyLandmarks: ['24-Block Sculptural Gopuram', '16-Pillared Stone Mandapam', 'Sacred Kulam Tank'],
        ambientMessages: [
          '*Sacred bronze bell chimes!* Gajendra stands in royal festival headwear at Temple Gopuram [X: 115, Y: 2, Z: -122]!',
          'Blessing visitors before the towering Dravidian Temple Gopuram at [X: 115, Y: 2, Z: -122]!',
          'Guarding the sacred stone mandapam pavilions at Temple Sanctuary [X: 115, Y: 2, Z: -122].'
        ],
        proximityGreeting: '🐘 Gajendra lifts his decorated trunk gracefully at Temple Gopuram [X: 115, Y: 2, Z: -122] showering fragrant blossoms!',
        detailedLocationText: '📍 Location: Sacred Dravidian Temple Gopuram Mandapam [X: 115, Y: 2, Z: -122]\n\n"Standing proudly at the foot of the 24-block tall vibrant Dravidian temple tower (Gopuram) with carved stone mandapam halls and brass temple bells northeast of Citadel!"',
        tagColor: '#78350f',
        emoji: '🐘'
      },

      // -------------------------------------------------------------
      // REALM CITIZENS & LOCAL GUIDES
      // -------------------------------------------------------------
      {
        id: 'citizen_Aarav_Sharma',
        name: 'Aarav Sharma',
        role: 'Varanasi Ghat Pundit',
        areaName: 'Varanasi Ghats & Riverfront Steps',
        coords: { x: 74, y: 2.0, z: -112 },
        directionFromSpawn: 'North-East (Imperial India)',
        nearbyLandmarks: ['Riverfront Ghats', 'Taj Mahal Canal', 'Sacred Banyan Grove'],
        ambientMessages: [
          'Chanting sacred Sanskrit verses by the Varanasi Ghat steps [X: 74, Y: 2, Z: -112]!',
          'Lighting brass evening diyas along the holy riverfront at [X: 74, Y: 2, Z: -112] in Varanasi.'
        ],
        proximityGreeting: 'Aarav Sharma folds his hands in Namaste at Varanasi Ghats [X: 74, Y: 2, Z: -112]!',
        detailedLocationText: '📍 Location: Varanasi Ghats & Holy Steps [X: 74, Y: 2, Z: -112]\n\n"Welcome to the sacred stone riverfront steps in the Imperial India realm, northeast of Citadel! Here river stone steps meet shaded banyans where travelers gather for peaceful reflection."',
        tagColor: '#f97316',
        emoji: '🕉️'
      },
      {
        id: 'citizen_Rajesh_Kumar',
        name: 'Rajesh Kumar',
        role: 'Dhaba Chai Master',
        areaName: 'Sher-e-Punjab Highway Dhaba',
        coords: { x: 44, y: 2.0, z: -76 },
        directionFromSpawn: 'North-East (Grand Trunk Highway)',
        nearbyLandmarks: ['Tata Decorated Truck', 'Smoking Tandoor Oven', 'Highway Charpais'],
        ambientMessages: [
          'Brewing piping-hot ginger-cardamom cutting chai at Highway Dhaba [X: 44, Y: 2, Z: -76]!',
          'Fresh butter rotis coming straight out of the clay tandoor at [X: 44, Y: 2, Z: -76]! Chai ready!'
        ],
        proximityGreeting: 'Rajesh Kumar pours a tall glass of cutting chai at Highway Dhaba [X: 44, Y: 2, Z: -76]! "Namaste ji, chai lijiye!"',
        detailedLocationText: '📍 Location: Sher-e-Punjab Highway Dhaba [X: 44, Y: 2, Z: -76]\n\n"You are at the Grand Trunk Highway roadside eatery northeast of Citadel! Pull up a woven charpai cot, listen to the decorated Tata truck\'s musical horn, and enjoy fresh tandoori food."',
        tagColor: '#ef4444',
        emoji: '☕'
      },
      {
        id: 'citizen_Dr__Vikram_Nair',
        name: 'Dr. Vikram Nair',
        role: 'ISRO Aerospace Director',
        areaName: 'ISRO Spaceport · Chandrayaan-3 Site',
        coords: { x: 112, y: 2.0, z: -88 },
        directionFromSpawn: 'North-East (ISRO Telemetry Pad)',
        nearbyLandmarks: ['Vikram Lunar Lander', 'Pragyan Rover', 'Telemetry Control Antenna'],
        ambientMessages: [
          'Monitoring real-time telemetry from Vikram Lander at ISRO Spaceport [X: 112, Y: 2, Z: -88]!',
          'Transmitting commands to Pragyan Rover from the Lunar Launch Site [X: 112, Y: 2, Z: -88]!'
        ],
        proximityGreeting: 'Dr. Vikram Nair checks satellite telemetry at ISRO Spaceport [X: 112, Y: 2, Z: -88]! "All systems nominal!"',
        detailedLocationText: '📍 Location: ISRO Spaceport & Lunar Landing Site [X: 112, Y: 2, Z: -88]\n\n"Commemorating India\'s historic Chandrayaan-3 soft touchdown at Shiv Shakti Point! Located northeast of Citadel, featuring the life-size block-built Vikram lander and deployed solar arrays."',
        tagColor: '#38bdf8',
        emoji: '🚀'
      },
      {
        id: 'citizen_Kenji_Sato',
        name: 'Kenji Sato',
        role: 'Shibuya Tech Architect',
        areaName: 'Tokyo · Shibuya Scramble Crossing',
        coords: { x: -152, y: 2.0, z: -78 },
        directionFromSpawn: 'North-West (Tokyo Shibuya Realm)',
        nearbyLandmarks: ['Neon Scramble Crossing', 'LED Billboard Towers', 'Hachiko Statue', 'Shinkansen Station'],
        ambientMessages: [
          'Watching the neon scramble crossing lights change at Tokyo Shibuya [X: -152, Y: 2, Z: -78]!',
          'Debugging WebGL shaders under giant LED billboards at Shibuya Scramble [X: -152, Y: 2, Z: -78]!'
        ],
        proximityGreeting: 'Kenji Sato bows politely at Shibuya Scramble Crossing [X: -152, Y: 2, Z: -78]! "Konnichiwa! Welcome to Tokyo!"',
        detailedLocationText: '📍 Location: Tokyo Shibuya Scramble Crossing [X: -152, Y: 2, Z: -78]\n\n"The world-famous neon pedestrian scramble crossing northwest of Citadel! Surrounded by glowing holographic billboards, Harajuku boutiques, and the Shinkansen bullet train terminal."',
        tagColor: '#38bdf8',
        emoji: '🗼'
      },
      {
        id: 'citizen_Hana_Tanaka',
        name: 'Hana Tanaka',
        role: 'Harajuku Anime Artist',
        areaName: 'Tokyo · Harajuku Fashion Alley',
        coords: { x: -148, y: 2.0, z: -84 },
        directionFromSpawn: 'North-West (Tokyo Realm)',
        nearbyLandmarks: ['Takeshita Street Arches', 'Anime Posters', 'Crepe Stands'],
        ambientMessages: [
          'Sketching cute pixel art manga in Harajuku Fashion Alley [X: -148, Y: 2, Z: -84]!',
          'Enjoying strawberry matcha crepes at Shibuya Harajuku [X: -148, Y: 2, Z: -84]!'
        ],
        proximityGreeting: 'Hana Tanaka waves cheerily in Harajuku [X: -148, Y: 2, Z: -84]! "Sugoi! Welcome to Harajuku!"',
        detailedLocationText: '📍 Location: Tokyo · Harajuku Fashion Alley [X: -148, Y: 2, Z: -84]\n\n"The bustling creative hub just steps from Shibuya Scramble Crossing! Bright pastel storefronts and anime concept art studios."',
        tagColor: '#f43f5e',
        emoji: '🎨'
      },
      {
        id: 'citizen_Scarlett_Miller',
        name: 'Scarlett Miller',
        role: 'Hollywood Film Director',
        areaName: 'Hollywood Pictures Studios Lot',
        coords: { x: 133, y: 2.0, z: -30 },
        directionFromSpawn: 'East (Hollywood Tech Hub)',
        nearbyLandmarks: ['Soundstage 1', 'Director Chairs', 'Walk of Fame Brass Stars'],
        ambientMessages: [
          'Calling "Quiet on set! And... ACTION!" at Hollywood Pictures Lot [X: 133, Y: 2, Z: -30]!',
          'Reviewing today\'s film dailies in the studio editing bay at [X: 133, Y: 2, Z: -30] in Hollywood.'
        ],
        proximityGreeting: 'Scarlett Miller holds up her clapperboard at Hollywood Studios [X: 133, Y: 2, Z: -30]! "Ready for your scene?"',
        detailedLocationText: '📍 Location: Hollywood Pictures Studios Lot [X: 133, Y: 2, Z: -30]\n\n"The bustling cinematic production lot east of Citadel! Soundstages, camera tracks, director monitors, and red carpet premiere runways."',
        tagColor: '#f59e0b',
        emoji: '🎬'
      },
      {
        id: 'citizen_Jack_Sullivan',
        name: 'Jack Sullivan',
        role: 'Broadway Choreographer',
        areaName: 'Neo York · Times Square Broadway',
        coords: { x: 106, y: 2.0, z: -15 },
        directionFromSpawn: 'East (Neo York Metropolis)',
        nearbyLandmarks: ['Times Square Giant Screens', 'Broadway Marquees', 'Yellow Cabs'],
        ambientMessages: [
          'Rehearsing tap routines under the neon glow of Times Square Broadway [X: 106, Y: 2, Z: -15]!',
          'Taking in the breathtaking skyline lights at Neo York Times Square [X: 106, Y: 2, Z: -15]!'
        ],
        proximityGreeting: 'Jack Sullivan gives a broadway jazz hands salute at Times Square [X: 106, Y: 2, Z: -15]! "Welcome to the Great White Way!"',
        detailedLocationText: '📍 Location: Neo York · Times Square Broadway [X: 106, Y: 2, Z: -15]\n\n"The glittering heart of Neo York east of Citadel! Enormous towering neon displays, Broadway theatre marquees, and bustling city energy."',
        tagColor: '#f43f5e',
        emoji: '🎭'
      },
      {
        id: 'citizen_Oliver_Wright',
        name: 'Oliver Wright',
        role: 'Royal Guard Guide',
        areaName: 'London · Elizabeth Tower (Big Ben)',
        coords: { x: -28, y: 2.0, z: -60 },
        directionFromSpawn: 'North (London Westminster)',
        nearbyLandmarks: ['Big Ben Clock Face', 'Westminster Bridge', 'Red Routemaster Bus'],
        ambientMessages: [
          'Standing vigil beside London Elizabeth Tower [X: -28, Y: 2, Z: -60] as Big Ben chimes!',
          'Patrolling the Thames riverwalk by Tower Bridge at [X: -28, Y: 2, Z: -60] in London.'
        ],
        proximityGreeting: 'Oliver Wright salutes crisply in front of Big Ben [X: -28, Y: 2, Z: -60]! "Splendid day in London, traveller!"',
        detailedLocationText: '📍 Location: London · Elizabeth Tower & Westminster [X: -28, Y: 2, Z: -60]\n\n"The historic London landmark directly north of Spawn Citadel! The Gothic Elizabeth Tower clock sounds the resonant Westminster chime, overlooking red double-decker buses and Tower Bridge."',
        tagColor: '#ef4444',
        emoji: '💂'
      },
      {
        id: 'citizen_Jean_Luc_Moreau',
        name: 'Jean-Luc Moreau',
        role: 'Montmartre Painter',
        areaName: 'Paris · Eiffel Tower & Champ de Mars',
        coords: { x: 24, y: 2.0, z: -36 },
        directionFromSpawn: 'North-East (Paris Realm)',
        nearbyLandmarks: ['Eiffel Tower Arches', 'Champ de Mars Gardens', 'Café de Paris'],
        ambientMessages: [
          'Painting oil impressions of the Eiffel Tower from Champ de Mars [X: 24, Y: 2, Z: -36]!',
          'Enjoying café au lait while sketching iron lattice arches at [X: 24, Y: 2, Z: -36] in Paris.'
        ],
        proximityGreeting: 'Jean-Luc Moreau raises his palette at the Eiffel Tower [X: 24, Y: 2, Z: -36]! "Bonjour! Magnifique view, non?"',
        detailedLocationText: '📍 Location: Paris · Eiffel Tower & Champ de Mars [X: 24, Y: 2, Z: -36]\n\n"Standing under the iconic wrought-iron lattice monument northeast of Citadel! Walk beneath the grand archways into the manicured Champ de Mars gardens and Parisian street cafes."',
        tagColor: '#94a3b8',
        emoji: '🥐'
      },
      {
        id: 'citizen_Tarek_Mansour',
        name: 'Tarek Mansour',
        role: 'Giza Desert Guide',
        areaName: 'Egypt · Giza Pyramids & Sphinx',
        coords: { x: -145, y: 5.0, z: 46 },
        directionFromSpawn: 'South-West (Egypt Giza Desert)',
        nearbyLandmarks: ['Pyramid of Khufu', 'Great Sphinx of Giza', 'Nile Felucca'],
        ambientMessages: [
          'Guiding travelers through the sunlit dunes of Giza Pyramids [X: -145, Y: 5, Z: 46]!',
          'Gazing upon the ancient Great Sphinx at [X: -145, Y: 5, Z: 46] in the Giza plateau.'
        ],
        proximityGreeting: 'Tarek Mansour welcomes you to the Giza Pyramids [X: -145, Y: 5, Z: 46]! "Salam Alaykum! Welcome to the ancient wonders!"',
        detailedLocationText: '📍 Location: Egypt · Giza Pyramids & Great Sphinx [X: -145, Y: 5, Z: 46]\n\n"The monumental golden sandstone plateau southwest of Citadel! Towering step pyramids of Khufu, the torchlit burial passage, and the majestic Great Sphinx."',
        tagColor: '#eab308',
        emoji: '🐪'
      },
      {
        id: 'citizen_Mateo_Morales',
        name: 'Mateo Morales',
        role: 'Mariachi Guitarrista',
        areaName: 'Mexico City · Zócalo Square',
        coords: { x: -103, y: 2.0, z: 62 },
        directionFromSpawn: 'West-South-West (Mexico City)',
        nearbyLandmarks: ['Metropolitan Cathedral', 'Palacio Nacional', 'Mercado Stalls'],
        ambientMessages: [
          'Strumming a joyful ranchera melody on my guitarrón at Zócalo Square [X: -103, Y: 2, Z: 62]!',
          'Tasting fresh churros and horchata in the Mercado at [X: -103, Y: 2, Z: 62] in Mexico City.'
        ],
        proximityGreeting: 'Mateo Morales strikes a lively guitar chord at Zócalo [X: -103, Y: 2, Z: 62]! "¡Bienvenido amigo a la Ciudad de México!"',
        detailedLocationText: '📍 Location: Mexico City · Zócalo Cathedral Square [X: -103, Y: 2, Z: 62]\n\n"The grand historic plaza southwest of Citadel, adorned with Baroque church towers, vibrant artisan mercado stalls, and colorful papel picado bunting."',
        tagColor: '#ef4444',
        emoji: '🎺'
      },
      {
        id: 'citizen_Rashid_Al_Maktoum',
        name: 'Rashid Al-Maktoum',
        role: 'Dubai Skydeck Pilot',
        areaName: 'Dubai · Burj Khalifa Observation Deck',
        coords: { x: 164, y: 2.0, z: 38 },
        directionFromSpawn: 'Far East (Dubai Skyline)',
        nearbyLandmarks: ['Burj Khalifa 828m Spire', 'Palm Jumeirah Archipelago', 'The Palm Tower', 'Atlantis Resort'],
        ambientMessages: [
          'Looking out from the foot of Burj Khalifa [X: 164, Y: 2, Z: 38] up to the needle spire and east to Palm Jumeirah!',
          'Checking the high-speed skydeck elevator at Dubai Burj Khalifa [X: 164, Y: 2, Z: 38]!'
        ],
        proximityGreeting: 'Rashid Al-Maktoum greets you at Burj Khalifa [X: 164, Y: 2, Z: 38]! "Marhaban! Ready to ascend to the clouds and behold the grand Palm Jumeirah archipelago?"',
        detailedLocationText: '📍 Location: Dubai · Burj Khalifa & Palm Jumeirah [X: 164, Y: 2, Z: 38]\n\n"The soaring spider-lily skyscraper far east of Citadel! Take the glass express lift all the way to the panoramic skydeck at Y=46 overlooking the grand Palm Jumeirah archipelago, luxury frond villas, and Atlantis The Palm in the turquoise Arabian Gulf."',
        tagColor: '#38bdf8',
        emoji: '🏙️'
      },
      {
        id: 'citizen_Dr__Maya_Lin',
        name: 'Dr. Maya Lin',
        role: 'Head Wildlife Zoologist',
        areaName: 'Crossroads Wildlife Park Main Entrance',
        coords: { x: -40, y: 2.0, z: 2 },
        directionFromSpawn: 'West (Zoo Welcome Arch)',
        nearbyLandmarks: ['Safari Gate', 'Panda Valley Walkway', 'Elephant Oasis Path'],
        ambientMessages: [
          'Conducting daily wildlife health rounds at Crossroads Wildlife Park [X: -40, Y: 2, Z: 2]!',
          'Welcoming safari explorers at the Wildlife Park Entrance [X: -40, Y: 2, Z: 2]! Have you seen the pandas?'
        ],
        proximityGreeting: 'Dr. Maya Lin smiles with her safari clipboard at Zoo Entrance [X: -40, Y: 2, Z: 2]! "Welcome to the Wildlife Park!"',
        detailedLocationText: '📍 Location: Crossroads Wildlife Park Main Entrance [X: -40, Y: 2, Z: 2]\n\n"The welcoming threshold to the entire safari reserve directly west of Citadel! Paths lead north to Giant Panda Valley, west to Lion Kopje, and south to Elephant Oasis and Giraffe Canopy."',
        tagColor: '#10b981',
        emoji: '🥼'
      },
      {
        id: 'citizen_Dr__Elena_Vance',
        name: 'Dr. Elena Vance',
        role: 'Chief Trauma Surgeon',
        areaName: 'Crossroads General Hospital & ER',
        coords: { x: 44, y: 2.0, z: 61 },
        directionFromSpawn: 'South-East towards Civic Quarter',
        nearbyLandmarks: ['Emergency Ambulance Bay', 'Rooftop LifeFlight Helipad', 'ICU Ward'],
        ambientMessages: [
          'Triaging incoming patient transfers at Crossroads General Hospital [X: 44, Y: 2, Z: 61]!',
          'LifeFlight helicopter standing by on the hospital roof! All trauma teams ready at [X: 44, Y: 2, Z: 61].'
        ],
        proximityGreeting: 'Dr. Elena Vance adjusts her stethoscope outside Crossroads General Hospital [X: 44, Y: 2, Z: 61]! "Welcome to the trauma center!"',
        detailedLocationText: '📍 Location: Crossroads General Hospital [X: 44, Y: 2, Z: 61]\n\n"Our medical center features an active emergency ambulance bay, first-floor triage and dispensary, a second-floor ICU recovery ward, and an emergency LifeFlight helipad on the roof."',
        tagColor: '#06b6d4',
        emoji: '🩺'
      },
      {
        id: 'citizen_Sgt__James_Reynolds',
        name: 'Sgt. James Reynolds',
        role: 'Precinct Watch Commander',
        areaName: 'Crossroads 1st Precinct Police Headquarters',
        coords: { x: 76, y: 2.0, z: 43 },
        directionFromSpawn: 'East-South-East (Civic Quarter)',
        nearbyLandmarks: ['Police Interceptor Squad Car', 'Holding Cells', 'Communications Mast'],
        ambientMessages: [
          'Patrol car engine warming up at the 1st Precinct Police Station [X: 76, Y: 2, Z: 43]!',
          'Dispatch reports all island sectors clear and secure from the 1st Precinct [X: 76, Y: 2, Z: 43]!'
        ],
        proximityGreeting: 'Sgt. James Reynolds salutes sharply outside the 1st Precinct [X: 76, Y: 2, Z: 43]! "Stay safe out there, citizen!"',
        detailedLocationText: '📍 Location: Crossroads 1st Precinct Police Station [X: 76, Y: 2, Z: 43]\n\n"Headquarters for municipal public safety! Features our black-and-white pursuit interceptor cruiser, secure holding cells, detective bullpen, and rooftop radio communications mast."',
        tagColor: '#3b82f6',
        emoji: '👮'
      },
      {
        id: 'citizen_Principal_Clara_Sterling',
        name: 'Principal Clara Sterling',
        role: 'Academy Headmistress',
        areaName: 'Crossroads Academy Public Magnet School',
        coords: { x: 44, y: 2.0, z: 43 },
        directionFromSpawn: 'South-East towards Civic Quarter',
        nearbyLandmarks: ['Ornate Clock & Bell Tower', 'Yellow School Bus', 'Playground Basketball Court'],
        ambientMessages: [
          'The Academy school bell rings across Crossroads [X: 44, Y: 2, Z: 43]! Time for class!',
          'Greeting students getting off the yellow school bus at Crossroads Academy [X: 44, Y: 2, Z: 43]!'
        ],
        proximityGreeting: 'Principal Clara Sterling welcomes you warmly to Crossroads Academy [X: 44, Y: 2, Z: 43]! "Welcome to our school!"',
        detailedLocationText: '📍 Location: Crossroads Academy [X: 44, Y: 2, Z: 43]\n\n"Our academy campus features a 3-story illuminated clock and belfry bell tower, the classic yellow school bus in the drop-off loop, STEM classrooms with chalkboards, a science lab, and an outdoor basketball court."',
        tagColor: '#a855f7',
        emoji: '👩‍🏫'
      },
      {
        id: 'citizen_Capt__Bartholomew_Drake',
        name: 'Capt. Bartholomew Drake',
        role: 'Royal Galleon Captain',
        areaName: 'South Coast Harbor & Royal Galleon',
        coords: { x: 38, y: 2.0, z: 114 },
        directionFromSpawn: 'South to Harbor Bay',
        nearbyLandmarks: ['Triple-Masted Sailing Galleon', 'Marina Bay & Merlion', 'Grand Carnival Pier'],
        ambientMessages: [
          'Anchors aweigh! Inspecting rigging aboard the Royal Galleon at South Coast Harbor [X: 38, Y: 2, Z: 114]!',
          'Full sails catching the ocean wind aboard the flagship galleon at [X: 38, Y: 2, Z: 114]!'
        ],
        proximityGreeting: 'Captain Drake touches his tricorn hat at South Coast Pier [X: 38, Y: 2, Z: 114]! "Ahoy traveler! Feast your eyes on the finest sailing ship in the seven seas!"',
        detailedLocationText: '📍 Location: South Coast Harbor & Royal Galleon [X: 38, Y: 2, Z: 114]\n\n"Moored in the deep harbor waters near Palm Paradise and Singapore Merlion! A historic triple-masted galleon with broadside cannons, towering masts, crow\'s nests, and billowing 3D canvas sails."',
        tagColor: '#ef4444',
        emoji: '⚓'
      }
    ];

    list.forEach(item => this.npcs.set(item.id, item));
  }

  public getNPC(id: string): NPCLocationInfo | undefined {
    return this.npcs.get(id);
  }

  public getAllNPCs(): NPCLocationInfo[] {
    return Array.from(this.npcs.values());
  }

  public update(time: number, playerPos: THREE.Vector3) {
    if (!this.isInitialized || !this.pushChatFn) return;

    // 1. Check Ambient Chat Timer
    if (time - this.lastAmbientTime >= this.ambientInterval) {
      this.lastAmbientTime = time;
      this.triggerAmbientChat();
    }

    // 2. Check Proximity Greetings
    this.checkProximityGreeting(time, playerPos);
  }

  private triggerAmbientChat() {
    if (!this.pushChatFn || this.ambientPool.length === 0) return;

    const npcId = this.ambientPool[this.currentAmbientIndex];
    this.currentAmbientIndex = (this.currentAmbientIndex + 1) % this.ambientPool.length;

    const npc = this.npcs.get(npcId);
    if (!npc || npc.ambientMessages.length === 0) return;

    const msg = npc.ambientMessages[Math.floor(Math.random() * npc.ambientMessages.length)];
    this.pushChatFn(npc.name, msg);
  }

  private checkProximityGreeting(time: number, playerPos: THREE.Vector3) {
    if (!this.pushChatFn) return;

    for (const [id, npc] of this.npcs.entries()) {
      const dx = playerPos.x - npc.coords.x;
      const dz = playerPos.z - npc.coords.z;
      const distSq = dx * dx + dz * dz;

      // 11 block greeting radius (121 sq)
      if (distSq <= 121) {
        const lastGreet = this.proximityCooldowns.get(id) || 0;
        // 60-second cooldown per NPC so proximity doesn't spam
        if (time - lastGreet >= 60.0) {
          this.proximityCooldowns.set(id, time);
          this.pushChatFn(npc.name, npc.proximityGreeting);
          break; // At most one proximity greeting per tick
        }
      }
    }
  }

  /**
   * Called on direct interaction (click / tap / E key) with an NPC
   */
  public handleNPCInteract(id: string, customTitle?: string): NPCLocationInfo | undefined {
    let npc = this.npcs.get(id);
    if (!npc && customTitle) {
      // Find by matching title / name
      const cleanCustom = customTitle.toLowerCase().replace(/[^a-z0-9]/g, '');
      for (const item of this.npcs.values()) {
        const cleanName = item.name.toLowerCase().replace(/[^a-z0-9]/g, '');
        if (cleanName.includes(cleanCustom) || cleanCustom.includes(cleanName)) {
          npc = item;
          break;
        }
      }
    }

    if (npc && this.pushChatFn) {
      this.pushChatFn(npc.name, `*Speaking from ${npc.areaName} [X: ${Math.round(npc.coords.x)}, Y: ${Math.round(npc.coords.y)}, Z: ${Math.round(npc.coords.z)}]!*`);
    }

    return npc;
  }
}

export const npcChatManager = new NPCChatManager();
