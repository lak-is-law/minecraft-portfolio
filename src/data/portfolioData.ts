export interface Project {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  category: string;
  description: string[];
  metrics: string[];
  tags: string[];
  liveUrl: string;
  githubUrl?: string;
  accentColor: string;
  iconBlock: string;
  bannerCoords: { x: number; y: number; z: number; rotY?: number };
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  type: 'Work' | 'Education' | 'Leadership';
  description: string[];
  highlights: string[];
  accentColor: string;
}

export interface SkillCategory {
  name: string;
  potionName: string;
  color: string;
  skills: { name: string; level: number; tag: string }[];
}

export interface Achievement {
  title: string;
  organization: string;
  date: string;
  rank: string;
  description: string;
  type: 'Award' | 'Hackathon' | 'Leadership';
}

export const PORTFOLIO_DATA = {
  profile: {
    name: "Lakshya & Mashu",
    title: "Minecraft Realm Explorers & Builders",
    level: 99,
    affiliation: "Crossroads Citadel Realm",
    degree: "Minecraft Grandmaster Architects",
    gpa: "Infinite Creativity",
    bio: "Welcome to Lakshya & Mashu's Minecraft Realm! A massive 3D voxel sandbox archipelago crafted with love, featuring majestic world monuments, vibrant safari wildlife, and hidden dungeons.",
    email: "",
    portfolioUrl: "https://mahaaszuv.vercel.app",
    resumeUrl: "",
    githubUrl: "",
    linkedinUrl: "",
    resumeFileName: ""
  },

  projects: [
    {
      id: "nether_fortress",
      title: "Nether Fortress Expedition",
      subtitle: "Blaze Spawners & Nether Warts",
      tagline: "Venture through the underworld to secure blaze rods, wither skeleton skulls, and ancient fortress loot",
      category: "Nether Raid",
      description: [
        "Delve across vast lava oceans into towering nether brick fortresses guarded by blazes and wither skeletons.",
        "Harvest essential brewing ingredients including nether wart farms and magma creams.",
        "Prepare for the ultimate Wither boss battle by collecting rare wither skeleton skulls."
      ],
      metrics: ["Fortress Bastions Secured", "Blaze Rod Farm Built", "Wither Skulls Unlocked"],
      tags: ["Nether Brick", "Blaze Spawner", "Lava Oceans", "Potion Brewing", "Boss Raid"],
      liveUrl: "",
      githubUrl: "",
      accentColor: "#ef4444",
      iconBlock: "redstone_block",
      bannerCoords: { x: 108.9, y: 4, z: -20, rotY: -Math.PI / 2 }
    },
    {
      id: "end_dimension",
      title: "The End & Dragon's Roost",
      subtitle: "Ender Dragon & Elytra Wings",
      tagline: "Traverse obsidian pillars, defeat the Ender Dragon, and glide with Elytra wings across outer End Cities",
      category: "Dimensional Raid",
      description: [
        "Scale the obsidian pillars and bow down end crystals to defeat the mighty Ender Dragon.",
        "Toss ender pearls into miniature void gateways leading to floating End City chorus fruit islands.",
        "Raid flying End Ships to claim the fabled Elytra wings and Dragon Head trophy."
      ],
      metrics: ["Ender Dragon Defeated", "Elytra Wings Acquired", "Shulker Box Logistics"],
      tags: ["End Stone", "Obsidian Pillars", "Dragon Breath", "Chorus Fruit", "Elytra Flight"],
      liveUrl: "",
      githubUrl: "",
      accentColor: "#a855f7",
      iconBlock: "amethyst_block",
      bannerCoords: { x: 108.9, y: 4, z: -10, rotY: -Math.PI / 2 }
    },
    {
      id: "ocean_monument",
      title: "Ocean Monument & Conduit",
      subtitle: "Elder Guardians & Prismarine Core",
      tagline: "Submerge into the deep abyss to defeat the 3 Elder Guardians and activate the Conduit Heart",
      category: "Aquatic Quest",
      description: [
        "Navigate deep oceanic trenches with Water Breathing elixirs to discover monumental prismarine temples.",
        "Overcome the Mining Fatigue curse and vanquish 3 Elder Guardians safeguarding 8 gold blocks.",
        "Assemble nautilus shells and the Heart of the Sea to ignite a permanent underwater Conduit."
      ],
      metrics: ["Conduit Activated", "3 Elder Guardians Defeated", "8 Gold Treasure Blocks"],
      tags: ["Prismarine", "Sea Lantern", "Heart of the Sea", "Conduit Power", "Dolphin Grace"],
      liveUrl: "",
      githubUrl: "",
      accentColor: "#0284c7",
      iconBlock: "diamond_block",
      bannerCoords: { x: 108.9, y: 4, z: 0, rotY: -Math.PI / 2 }
    },
    {
      id: "ancient_city",
      title: "Ancient City & Deep Dark",
      subtitle: "Sculk Shriekers & The Warden",
      tagline: "Crawl silently beneath bedrock to loot deep dark chests while avoiding the terrifying Warden",
      category: "Stealth & Survival",
      description: [
        "Descend below Y=-50 into massive forgotten underground civilizations consumed by sculk catalysts.",
        "Sneak past sculk sensors on wool paths to prevent triggering shrieker summons.",
        "Retrieve Echo Shards to forge the Recovery Compass and uncover Swift Sneak III enchantment books."
      ],
      metrics: ["Ancient City Excavated", "Swift Sneak III Found", "Recovery Compass Forged"],
      tags: ["Sculk", "Deepslate", "Echo Shards", "Warden Lair", "Silent Footsteps"],
      liveUrl: "",
      githubUrl: "",
      accentColor: "#0f766e",
      iconBlock: "emerald_block",
      bannerCoords: { x: 108.9, y: 4, z: 10, rotY: -Math.PI / 2 }
    },
    {
      id: "woodland_mansion",
      title: "Woodland Mansion Stronghold",
      subtitle: "Evokers & Totem of Undying",
      tagline: "Follow woodland explorer maps through dark oak canopies to claim the Totem of Undying",
      category: "Dark Forest Raid",
      description: [
        "Trade with cartographer villagers for explorer maps tracking secluded 3-story timber palaces.",
        "Battle vindicators wielding iron axes and evade deadly evoker fangs in dark labyrinth corridors.",
        "Slay powerful evokers to claim the sacred Totem of Undying, granting immunity to fatal wounds."
      ],
      metrics: ["Totem of Undying Won", "Allay Companions Rescued", "Dark Forest Mapped"],
      tags: ["Dark Oak", "Evoker", "Totem of Undying", "Allay", "Explorer Map"],
      liveUrl: "",
      githubUrl: "",
      accentColor: "#15803d",
      iconBlock: "gold_block",
      bannerCoords: { x: 108.9, y: 4, z: 20, rotY: -Math.PI / 2 }
    }
  ] as Project[],

  experience: [
    {
      id: "exp-daa",
      role: "Master Architects Guild",
      company: "Grand Builders Society",
      period: "Era I - Present",
      type: "Leadership",
      description: [
        "Designed and constructed monumental world landmarks including the Taj Mahal, Eiffel Tower, and Big Ben.",
        "Pioneered authentic voxel aesthetics, atmospheric shaders, and panoramic archipelago scale."
      ],
      highlights: ["Master Builder", "World Landmarks", "Voxel Architecture"],
      accentColor: "#f59e0b"
    },
    {
      id: "exp-genospark",
      role: "Redstone Engineers Guild",
      company: "Automated Contraptions Clan",
      period: "Era II",
      type: "Work",
      description: [
        "Engineered piston elevators, automated item sorting arrays, and beacon telemetry circuits.",
        "Optimized tick-based redstone logic gates for seamless multiplayer server performance."
      ],
      highlights: ["Redstone Master", "Automated Sorters", "Island Express Railway"],
      accentColor: "#ef4444"
    },
    {
      id: "exp-emcee",
      role: "Safari Wildlife Keepers",
      company: "Biome Conservation Order",
      period: "Era II - Present",
      type: "Leadership",
      description: [
        "Established expansive ecological reserves for lions, pandas, elephants, giraffes, and polar bears.",
        "Created lush sanctuary habitats that preserve animal species across all climate zones."
      ],
      highlights: ["Safari Reserve", "Wildlife Sanctuary", "Biodiversity"],
      accentColor: "#10b981"
    },
    {
      id: "exp-6pistons",
      role: "Speed & Flight Guild",
      company: "Radiator Springs Racing & Elytra Flight",
      period: "Era III",
      type: "Work",
      description: [
        "Designed the high-speed Lightning McQueen race track and aerial Elytra gliding rings.",
        "Set server flight speed records gliding through sunset cloud formations."
      ],
      highlights: ["Lightning McQueen #95", "Elytra Flight Courses", "Radiator Springs"],
      accentColor: "#ec4899"
    },
    {
      id: "exp-ucsi",
      role: "Dragon Slayers Order",
      company: "The End Expeditionary Force",
      period: "Era III",
      type: "Work",
      description: [
        "Led the realm raid against the Ender Dragon and successfully conquered the outer End islands.",
        "Installed Ender Chest logistics networks linking all major island settlements."
      ],
      highlights: ["Dragon Slayer", "Ender Chest Network", "Outer End Explorer"],
      accentColor: "#a855f7"
    },
    {
      id: "exp-srmist",
      role: "Crossroads Citadel Founders",
      company: "Lakshya & Mashu Realm Nexus",
      period: "Founding Era",
      type: "Education",
      description: [
        "Established the central spawn island nexus, emerald fountain, and world travel portals.",
        "Created the welcoming gateway where all explorers begin their voxel journey."
      ],
      highlights: ["Spawn Citadel", "Emerald Fountain", "Co-Founders"],
      accentColor: "#06b6d4"
    }
  ] as Experience[],

  leadership: [
    {
      id: "lead-daa",
      role: "High Architect of Crossroads Citadel",
      organization: "Citadel Council",
      period: "Era I - Present",
      description: [
        "Supervised landmark planning, road networks, and bridge infrastructure linking the archipelagos.",
        "Maintained server building guidelines ensuring stunning vistas across all biomes."
      ],
      highlights: ["Citadel Council", "Bridge Networks", "Master Planning"],
      accentColor: "#f59e0b"
    },
    {
      id: "lead-emcee",
      role: "Festival Herald & Tournament Host",
      organization: "Crossroads Games",
      period: "Era II - Present",
      description: [
        "Hosted realm tournaments, dragon flight races, and parkour championships for dozens of concurrent players.",
        "Organized community build battles at the Hollywood Bowl amphitheatre."
      ],
      highlights: ["Tournament Host", "Dragon Races", "Hollywood Bowl"],
      accentColor: "#06b6d4"
    },
    {
      id: "lead-redbull",
      role: "Speedrun & Nitro Grand Prix Marshal",
      organization: "Radiator Springs Speedway",
      period: "Era II - Present",
      description: [
        "Organized multi-lap kart and horse races through the desert canyon track.",
        "Engineered automatic lap counters and firework celebration podiums."
      ],
      highlights: ["Grand Prix Marshal", "Radiator Springs", "Lap Counters"],
      accentColor: "#8b5cf6"
    }
  ],

  research: [
    {
      id: "res-rockfall",
      title: "Ancient Cavern Geotechnical Survey",
      domain: "Underground Exploration & Cave Systems",
      description: "Surveying seismic vibrations and gravel stability in lush and dripstone caves deep beneath the mountain ranges.",
      tags: ["Deep Caves", "Dripstone", "Geology", "Mining Safety"]
    },
    {
      id: "res-dist-systems",
      title: "Real-Time Elytra Flight Dynamics & Air Currents",
      domain: "Aerodynamics & Elytra Gliding",
      description: "Mapping thermal updrafts and firework rocket propulsion for optimal glide trajectories across the 400-block map.",
      tags: ["Elytra Flight", "Propulsion", "Aerodynamics", "Sky Navigation"]
    },
    {
      id: "res-edge-ai",
      title: "Villager Trading Economics & Iron Golem Automation",
      domain: "Economic Simulation & Village Defense",
      description: "Modeling emerald exchange equilibria and optimal golem spawning geometry to safeguard border settlements.",
      tags: ["Villager Trading", "Emerald Economy", "Iron Golem Defense"]
    }
  ],

  interests: [
    {
      title: "Voxel Architecture & Landmark Replicas",
      tag: "[BUILD]",
      desc: "Recreating world wonders block-by-block with authentic scale, interior details, and night illumination."
    },
    {
      title: "Redstone Logic & Automated Farms",
      tag: "[REDSTONE]",
      desc: "Constructing multi-item sorters, flying machines, auto-crafters, and wireless sculk trigger networks."
    },
    {
      title: "Wildlife Conservation & Safari Breeding",
      tag: "[WILDLIFE]",
      desc: "Breeding pandas, nurturing polar bear cubs, and maintaining natural animal sanctuaries across the western savannah."
    },
    {
      title: "Realm Exploration & Cartography",
      tag: "[EXPLORE]",
      desc: "Mapping ocean trenches, frozen peaks, desert dunes, and lush flower fields on high-resolution wall maps."
    }
  ],

  languages: [
    {
      language: "Galactic Alphabet (Enchanting Table)",
      level: "Master Enchanter",
      highlight: "Deciphering standard galactic runes for Fortune III, Looting III, and Mending",
      tag: "[ENCHANT]"
    },
    {
      language: "Villager Dialect (Huh / Hrmm)",
      level: "Fluent Trader",
      highlight: "Mastering trade negotations with armorer, librarian, and weaponsmith villagers",
      tag: "[VILLAGER]"
    },
    {
      language: "Piglin Pig-Latin & Barter Shouts",
      level: "Gold Standard",
      highlight: "Trading gold ingots safely in Nether bastions for fire resistance and ender pearls",
      tag: "[NETHER]"
    },
    {
      language: "Universal Minecraft Emotes",
      level: "Global Explorer",
      highlight: "Crouch-spamming friendship, sword blocking greetings, and sharing bread with travelers",
      tag: "[COMMUNITY]"
    }
  ],

  skillCategories: [
    {
      name: "Agility & Speed",
      potionName: "Potion of Swiftness",
      color: "#38bdf8",
      skills: [
        { name: "Swiftness II Sprinting", level: 99, tag: "SPEED" },
        { name: "Leaping & Parkour", level: 95, tag: "JUMP" },
        { name: "Dolphin's Grace Swimming", level: 92, tag: "SWIM" },
        { name: "Feather Falling IV", level: 98, tag: "FALL" },
        { name: "Elytra Rocket Gliding", level: 96, tag: "FLIGHT" },
        { name: "Boat on Ice Racing", level: 94, tag: "DRIFT" }
      ]
    },
    {
      name: "Combat & Fortitude",
      potionName: "Potion of Strength & Fire Res",
      color: "#ef4444",
      skills: [
        { name: "Netherite Sharpness V", level: 98, tag: "SWORD" },
        { name: "Fire Resistance Brew", level: 99, tag: "FIRE" },
        { name: "Regeneration & Golden Apples", level: 96, tag: "REGEN" },
        { name: "Totem of Undying Mastery", level: 100, tag: "TOTEM" },
        { name: "Shield Parrying & Defense", level: 93, tag: "SHIELD" },
        { name: "Crossbow Multishot & Piercing", level: 91, tag: "BOW" }
      ]
    },
    {
      name: "Sight & Sorcery",
      potionName: "Potion of Night Vision & Conduit",
      color: "#10b981",
      skills: [
        { name: "Night Vision in Deep Caves", level: 98, tag: "SIGHT" },
        { name: "Conduit Heart Underwater Sight", level: 94, tag: "CONDUIT" },
        { name: "Water Breathing Elixir", level: 96, tag: "AQUA" },
        { name: "Invisibility Cloaking", level: 88, tag: "STEALTH" },
        { name: "Hero of the Village Discount", level: 95, tag: "HERO" }
      ]
    },
    {
      name: "Enchanting & Redstone",
      potionName: "Beacon of Master Engineering",
      color: "#eab308",
      skills: [
        { name: "Mending & Unbreaking III", level: 99, tag: "MEND" },
        { name: "Fortune III & Silk Touch", level: 97, tag: "MINE" },
        { name: "Redstone Repeater & Comparator Logic", level: 95, tag: "REDSTONE" },
        { name: "Infinity & Flame Archery", level: 96, tag: "FLAME" },
        { name: "Quad-Beacon Haste II & Speed II", level: 98, tag: "BEACON" }
      ]
    }
  ] as SkillCategory[],

  landmarks: [
    { name: "Crossroads Citadel (Spawn)", coords: [0, 2, 0], tag: "[CITADEL]", desc: "Central drop-in nexus with marble compass rose, sky beacon, and Lakshya guide" },
    { name: "Neo York Tech Metropolis", coords: [100, 2, 0], tag: "[NEO YORK]", desc: "American cyberpunk metropolis with glass skyscrapers, Times Square screens, and AI research labs" },
    { name: "Lak Tower (\"LK\" Monument)", coords: [150, 2, 0], tag: "[LAK TOWER]", desc: "55-block tall Eiffel-inspired tower with illuminated LK monogram and observation skydeck" },
    { name: "Hollywood Hills & Sign", coords: [165, 26, -100], tag: "[HOLLYWOOD]", desc: "Scenic mountain ridge and illuminated block-built HOLLYWOOD sign overlooking the American tech hub" },
    { name: "The Hollywood Bowl & Amphitheatre", coords: [178, 3, -76], tag: "[HOLLYWOOD]", desc: "Iconic acoustic shell nested in the foothills, stage piano, tiered benches, and symphonic concert grounds" },
    { name: "Hollywood Pictures Studios & Walk of Fame", coords: [151, 2, -61], tag: "[HOLLYWOOD]", desc: "Historic studio soundstage lot, 22-block water tower, Walk of Fame brass stars, and red carpet Oscar premiere" },
    { name: "Lightning McQueen Street · Radiator Springs Raceway", coords: [168, 2, -24], tag: "[McQUEEN]", desc: "3D Lightning McQueen racing track with Flo's V8 Café, Luigi's tire tower, Mater's shop, and high-speed racecar driving" },
    { name: "Imperial India · Taj Mahal", coords: [80, 4, -135], tag: "[TAJ MAHAL]", desc: "Grand white marble Taj Mahal with 4 minarets, Yamuna reflecting canal, and SRMIST academic honors" },
    { name: "Varanasi Ghats & Haveli", coords: [45, 2, -120], tag: "[VARANASI]", desc: "Historic riverfront stone steps, sacred banyan trees, and ornate Rajasthani Haveli chhatris" },
    { name: "China · Great Wall & Pagoda", coords: [-110, 2, -110], tag: "[GREAT WALL]", desc: "Mighty stone ramparts, watchtowers, 5-tier dragon pagoda, bamboo groves, and Foreign Languages embassy" },
    { name: "Temple of Heaven Pavilion", coords: [-80, 2, -90], tag: "[PAVILION]", desc: "Circular tiered imperial shrine with vermilion columns and gold roof accents" },
    { name: "Mexico City · Zócalo", coords: [-105, 2, 60], tag: "[MEXICO CITY]", desc: "Metropolitan Cathedral square, Palacio Nacional, colourful Mercado stalls, and adobe village" },
    { name: "Chichén Itzá Aztec Pyramid", coords: [-140, 2, 110], tag: "[PYRAMID]", desc: "Ancient 9-step Mesoamerican stone temple rising above the desert cacti plateau" },
    { name: "Grand Carnival & Ferris Wheel", coords: [15, 2, 135], tag: "[CARNIVAL]", desc: "Oceanfront amusement park with a giant illuminated Ferris wheel, carousel, and coaster" },
    { name: "The Sunset Saloon & Beach Bar", coords: [12, 2, 58], tag: "[SALOON]", desc: "Beachfront timber tavern with glowing stone hearth, outdoor deck, and Lakshya's passions hub" },
    { name: "Palm Paradise Beach & Merlion", coords: [15, 2, 100], tag: "[BEACH]", desc: "Tropical coconut palm beach, ocean surf, boardwalk pier, and the iconic Singapore Merlion" },
    { name: "Crossroads International Airport", coords: [130, 2, 80], tag: "[AIRPORT]", desc: "Dedicated coastal airport with a lit runway, glass terminal concourse, and air-traffic tower" },
    { name: "Crossroads Central Station", coords: [58, 2, 33], tag: "[RAILWAY]", desc: "Central passenger terminal of the Island Express Railway, linking Spawn Citadel, Neo York, Airport, and South Coast Pier" },
    { name: "Crossroads General Hospital", coords: [43, 2, 58], tag: "[HOSPITAL]", desc: "Quartz-and-glass community hospital with a red cross and emergency ambulance bay" },
    { name: "Crossroads Police Station", coords: [51, 2, 60], tag: "[POLICE]", desc: "A blue-striped public safety station serving the southern districts" },
    { name: "Crossroads Public School", coords: [43, 2, 36], tag: "[SCHOOL]", desc: "A neighborhood school with a library, bright windows, and bell tower" },
    { name: "Crossroads Wildlife Park", coords: [-65, 2, 0], tag: "[ZOO]", desc: "Expansive safari wildlife reserve featuring real animated pandas, lions, elephants, giraffes, polar bears, penguins, zebras, and farm petting zoo" },
    { name: "Rapunzel’s Castle", coords: [-70, 2, -34], tag: "[CASTLE]", desc: "Fairytale keep with a high lantern tower and golden braid above secluded gardens" },
    { name: "Eiffel Tower · Paris", coords: [26, 2, -38], tag: "[EIFFEL]", desc: "Gustave Eiffel's lattice landmark with walkable archways, Champ de Mars gardens, and Café de Paris" },
    { name: "London · Big Ben & Tower Bridge", coords: [-32, 2, -58], tag: "[LONDON]", desc: "Gothic Elizabeth Tower clock, Westminster chime & Great Bell, Tower Bridge walkways, and red Routemaster double-decker bus" },
    { name: "Tokyo · Shibuya Scramble Crossing", coords: [-155, 2, -80], tag: "[TOKYO]", desc: "Vibrant neon-lit scramble crossing, giant LED billboard towers, Hachiko plaza, and Shinkansen bullet train" },
    { name: "Seoul · Gwanghwamun Palace Gate", coords: [-65, 2, -95], tag: "[SEOUL]", desc: "Historic Joseon royal pavilion with Dancheong eaves, stone portals, and Hongdae K-Pop street food" },
    { name: "Seoul · N Seoul Tower (Namsan)", coords: [-52, 16, -115], tag: "[SEOUL]", desc: "Mount Namsan observation spire with 360-degree glass skydeck and illuminated communication antenna" },
    { name: "Egypt · Giza Pyramids & Great Sphinx", coords: [-155, 2, 36], tag: "[GIZA]", desc: "Pyramid of Khufu with hollow torch-lit burial chamber, Great Sphinx of Giza, and desert camels" },
    { name: "Dubai · Burj Khalifa & Palm Jumeirah", coords: [170, 2, 42], tag: "[DUBAI]", desc: "828m spider-lily skyscraper with glass observation skydeck at Y=46 and Palm Jumeirah lagoon villas" },
    { name: "Mumbai · Gateway of India & Local Train", coords: [40, 2, -95], tag: "[MUMBAI]", desc: "Indo-Saracenic basalt triumphal arch, Apollo Bunder harbor, Western Railway Mumbai Local coach, and Bajaj Auto-Rickshaw" },
    { name: "Dravidian Temple Gopuram & Mandapam", coords: [115, 2, -135], tag: "[TEMPLE]", desc: "Vibrant 24-block sculptural tiers, 16-pillared stone mandapam hall, brass bells, sacred kulam tank, and caparisoned Temple Elephant Gajendra" },
    { name: "Chennai · Marina Beach Lighthouse", coords: [145, 2, -125], tag: "[MARINA]", desc: "Striped maritime lighthouse, fishing catamarans on the sand, sundal cart, and beach kites" },
    { name: "Sher-e-Punjab Highway Dhaba & Tata Truck", coords: [55, 2, -75], tag: "[DHABA]", desc: "Grand Trunk Road dhaba with woven charpai cots, smoking tandoor oven, and decorated 'Horn OK Please' Tata truck" },
    { name: "ISRO Spaceport · Chandrayaan-3", coords: [115, 2, -85], tag: "[ISRO]", desc: "Lunar South Pole Vikram lander, Pragyan rover, deployed solar wings, and deep-space telemetry center" },
    { name: "Jaipur · Hawa Mahal (Palace of Winds)", coords: [58, 2, -103], tag: "[HAWA MAHAL]", desc: "5-tiered Rajasthani rose sandstone facade with 953 honeycombed jharokha lattice balconies" },
    { name: "India Gate & Amar Jawan Jyoti", coords: [80, 2, -60], tag: "[INDIA GATE]", desc: "Monumental New Delhi triumphal arch with perpetual eternal flame braziers and Diwali illuminations" },
    { name: "Frostpeak Alps · Mountain Lodge & Observatory", coords: [-2, 9, -100], tag: "[ALPS]", desc: "Majestic snow-capped mountain peaks, Chalet de Lakshya timber ski lodge, Lake Serenity ice rink, cable car gondola, and high summit observatory" },
    { name: "Sunflower Valley · Windmill & Farmstead", coords: [-45, 2, 48], tag: "[VALLEY]", desc: "Rustic 4-sail Dutch windmill, golden wheat and sunflower fields, countryside barn, and peaceful agricultural valley" }
  ]
};
