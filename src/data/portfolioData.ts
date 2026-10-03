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
    name: "Lakshya",
    title: "Software Engineer & Designer",
    level: 22,
    affiliation: "SRM Institute of Science and Technology, Chennai",
    degree: "B.Tech in Computer Science and Engineering (2022 - 2026)",
    gpa: "CGPA 4.37 / 5.0",
    bio: "Computer Science student at SRMIST, Chennai building at the intersection of software engineering, applied AI, and design. Comfortable moving between technical work and creative pursuits like design, music, and public speaking, with a steady focus on continuous growth and long-term impact.",
    email: "contact@lakshya.uk",
    portfolioUrl: "https://lakshya.uk",
    resumeUrl: "https://resume.lakshya.uk",
    githubUrl: "https://github.com/lak-is-law",
    linkedinUrl: "https://linkedin.com/in/lakshya-success",
    resumeFileName: "Lakshya.Resume.pdf"
  },

  projects: [
    {
      id: "todar",
      title: "TODAR 2.0",
      subtitle: "Smart Expense Tracker",
      tagline: "Finance-management platform converting spending into structured data and anomaly-based alerts",
      category: "Fintech",
      description: [
        "Shipped a finance-management platform converting fragmented spending into structured data, REST-based reporting, and anomaly-based alerts.",
        "Crafted for global teens who reported spending savings of up to 45%.",
        "Integrated lightweight TensorFlow.js models for client-side spending forecasts and threshold alerts."
      ],
      metrics: ["Up to 45% Spending Savings Reported", "TensorFlow.js Anomaly Detection", "Client-Side Privacy"],
      tags: ["Node.js", "Express", "SQLite", "TensorFlow.js", "REST APIs"],
      liveUrl: "https://todar.finance.lakshya.uk",
      githubUrl: "https://github.com/lak-is-law",
      accentColor: "#22c55e",
      iconBlock: "emerald_block",
      bannerCoords: { x: 85, y: 4, z: -20, rotY: -Math.PI / 2 }
    },
    {
      id: "trackyourflight",
      title: "TrackYourFlight",
      subtitle: "Global Flight Observatory",
      tagline: "High-performance global flight tracker pulling real-time ADS-B transponder telemetry for 12,000+ flights",
      category: "Full Stack",
      description: [
        "High-performance global flight tracker pulling real-time ADS-B transponder telemetry for 12,000+ flights simultaneously.",
        "Built a custom zero-dependency 3D Canvas engine rendering great-circle geodesic paths and Fibonacci point-distribution spheres at 60 FPS.",
        "Engineered serverless proxy pipelines for ultra-low latency real-time aviation telemetry."
      ],
      metrics: ["12,000+ Real-Time Flights", "Zero-Dependency 3D Canvas Engine", "60 FPS Geodesic Paths"],
      tags: ["Vanilla JS", "Canvas API", "Node.js", "Serverless", "Aviation Tech"],
      liveUrl: "https://trackyourflight.lakshya.uk",
      githubUrl: "https://github.com/lak-is-law",
      accentColor: "#0284c7",
      iconBlock: "diamond_block",
      bannerCoords: { x: 85, y: 4, z: -10, rotY: -Math.PI / 2 }
    },
    {
      id: "locateart",
      title: "Locate Art",
      subtitle: "Cultural-Heritage Mapping Platform",
      tagline: "Solo full-stack interactive map cataloging 120+ traditional art forms across the Indian subcontinent",
      category: "Full Stack",
      description: [
        "Architected and shipped a solo full-stack interactive map cataloging 120+ traditional art forms across the Indian subcontinent.",
        "Features a high-performance navigation map with 3 switchable tile layers, smooth fly-to animations, and security hardening.",
        "Engineered spatial PostgreSQL database schema with Supabase backend integration."
      ],
      metrics: ["120+ Traditional Art Forms", "3 Switchable Tile Layers", "Next.js 16 & Supabase"],
      tags: ["Next.js 16", "React 19", "Supabase", "PostgreSQL", "MapLibre GL"],
      liveUrl: "https://locate.art.lakshya.uk",
      githubUrl: "https://github.com/lak-is-law",
      accentColor: "#f59e0b",
      iconBlock: "gold_block",
      bannerCoords: { x: 85, y: 4, z: 0, rotY: -Math.PI / 2 }
    },
    {
      id: "redgambit",
      title: "Red Gambit",
      subtitle: "Adaptive Chess Platform",
      tagline: "Multi-tier strategy gaming engine running on Stockfish API",
      category: "AI & Gaming",
      description: [
        "Designed and deployed an adaptive chess platform running on the Stockfish API.",
        "Engineered four difficulty tiers: Adaptive, Medium, Hard, and God Mode.",
        "Real-time move evaluation, match recovery, and responsive accessibility UI themes."
      ],
      metrics: ["Stockfish Engine Integrated", "4 AI Difficulty Tiers", "Adaptive Heuristic Search"],
      tags: ["TypeScript", "Stockfish API", "Game Logic", "Canvas", "Node.js"],
      liveUrl: "https://redgambit.lakshya.uk",
      githubUrl: "https://github.com/lak-is-law",
      accentColor: "#ef4444",
      iconBlock: "redstone_block",
      bannerCoords: { x: 85, y: 4, z: 10, rotY: -Math.PI / 2 }
    },
    {
      id: "spiderverse",
      title: "Spider-Verse Portal",
      subtitle: "Browser-Based AR Experience",
      tagline: "Interactive AR portal with privacy-first client-side hand tracking",
      category: "AR & Graphics",
      description: [
        "Crafted an interactive browser AR experience with privacy-first client-side hand-tracking.",
        "Implemented an adaptive-quality rendering engine sustaining 60 FPS across desktop and mobile devices.",
        "Engineered custom WebGL shaders and real-time hand gesture recognition."
      ],
      metrics: ["Client-Side Hand-Tracking", "Sustained 60 FPS", "Custom WebGL GLSL Shaders"],
      tags: ["Three.js", "WebGL", "GLSL", "MediaPipe", "OpenCV"],
      liveUrl: "https://spiderverse.lakshya.uk",
      githubUrl: "https://github.com/lak-is-law",
      accentColor: "#a855f7",
      iconBlock: "amethyst_block",
      bannerCoords: { x: 85, y: 4, z: 20, rotY: -Math.PI / 2 }
    }
  ] as Project[],

  experience: [
    {
      id: "exp-daa",
      role: "Head of Alumni Relations",
      company: "Directorate of Alumni Affairs, SRMIST",
      period: "Aug 2022 - Present",
      type: "Leadership",
      description: [
        "Mentored incoming student teams and spearheaded alumni-engagement strategy across 100+ alumni-engagement events.",
        "Served as the primary point of contact for high-profile alumni relationships, faculty leadership, and student stakeholders."
      ],
      highlights: ["Head of Alumni Relations", "100+ Events Spearheaded", "High-Profile Alumni Strategy"],
      accentColor: "#f59e0b"
    },
    {
      id: "exp-genospark",
      role: "Full Stack Developer",
      company: "GenoSpark",
      period: "2024",
      type: "Work",
      description: [
        "Developed and maintained full-stack web applications in a production environment.",
        "Awarded verified Certificate of Excellence for platform performance and reliable architecture delivery."
      ],
      highlights: ["Certificate of Excellence", "Production Web Engineering", "Full-Stack Deployment"],
      accentColor: "#3b82f6"
    },
    {
      id: "exp-emcee",
      role: "Official EMCEE",
      company: "Directorate of Student Affairs, SRMIST",
      period: "Sep 2024 - Feb 2026",
      type: "Leadership",
      description: [
        "Anchored large-scale institutional events for audiences of 5,000+ attendees.",
        "Represented the university on stage through live hosting, ceremony coordination, and intercultural communication."
      ],
      highlights: ["5,000+ Attendee Audiences", "Official Stage Anchor", "Intercultural Communication"],
      accentColor: "#06b6d4"
    },
    {
      id: "exp-6pistons",
      role: "Product Designer",
      company: "6Pistons",
      period: "Dec 2024 - Aug 2025",
      type: "Work",
      description: [
        "Co-led design, media production, and automotive infographic work across creative campaigns.",
        "Delivered technical infographic guides and visual designs for clients including Mercedes-Benz, VinFast, and Audi."
      ],
      highlights: ["Mercedes-Benz, VinFast & Audi", "Automotive Infographics", "Design & Media Production"],
      accentColor: "#ec4899"
    },
    {
      id: "exp-ucsi",
      role: "Most Innovative Product Award",
      company: "UCSI Consulting Group",
      period: "Jan 2024",
      type: "Work",
      description: [
        "Selected as the winning team among 500+ teams and 3,000+ students.",
        "Recognized for translating an intricate business bottleneck into a practical, presentable technical solution under high-pressure consulting constraints."
      ],
      highlights: ["1st Place out of 500+ Teams", "3,000+ Students Competed", "Kuala Lumpur Consulting Pitch"],
      accentColor: "#10b981"
    },
    {
      id: "exp-srmist",
      role: "B.Tech in Computer Science and Engineering",
      company: "SRM Institute of Science and Technology, Chennai",
      period: "2022 - 2026",
      type: "Education",
      description: [
        "CGPA: 4.37 / 5.0.",
        "Specialization in applied AI, software engineering, and systems architecture.",
        "Core coursework: Distributed Systems, Deep Learning, Cloud Computing, Algorithms, Database Management."
      ],
      highlights: ["CGPA 4.37 / 5.0", "Computer Science Major", "Chennai Campus"],
      accentColor: "#10b981"
    }
  ] as Experience[],

  leadership: [
    {
      id: "lead-daa",
      role: "Head of Alumni Relations",
      organization: "Directorate of Alumni Affairs, SRMIST",
      period: "Aug 2022 - Present",
      description: [
        "Mentored incoming student teams and spearheaded alumni-engagement strategy across 100+ events.",
        "Maintained active relationships across university leadership, corporate alumni, and undergraduate fellows."
      ],
      highlights: ["Head of Alumni Relations", "100+ Events Coordinated", "Cross-Functional Mentorship"],
      accentColor: "#f59e0b"
    },
    {
      id: "lead-emcee",
      role: "Official EMCEE",
      organization: "Directorate of Student Affairs, SRMIST",
      period: "Sep 2024 - Feb 2026",
      description: [
        "Anchored flagship university conventions, cultural festivals, and ceremonies for 5,000+ attendees.",
        "Master of ceremonies for university inaugurations and international delegates."
      ],
      highlights: ["Audiences of 5,000+ Attendees", "Live Ceremony Hosting", "Public Speaking"],
      accentColor: "#06b6d4"
    },
    {
      id: "lead-redbull",
      role: "Brand & PR Event Lead",
      organization: "Campus Collaborations",
      period: "2024 - 2026",
      description: [
        "Led public relations, brand engagement, and large-scale youth event execution, including the Red Bull campus collaboration.",
        "Coordinated multi-channel communications, student turnout, and media coverage."
      ],
      highlights: ["Red Bull Collaboration", "Large-Scale Execution", "Brand Engagement"],
      accentColor: "#8b5cf6"
    }
  ],

  research: [
    {
      id: "res-rockfall",
      title: "Rockfall Prediction: AI-Based Hazard Mitigation System",
      domain: "AI & Geological Hazard Mitigation",
      description: "Research Assistant guided by Dr. Abirami G., Associate Professor at SRM School of Computing. Currently engineering an advanced Machine Learning model to predict rockfall risks for critical hazard mitigation and geological infrastructure safety.",
      tags: ["Machine Learning", "Data Science", "Hazard Mitigation", "SRM School of Computing"]
    },
    {
      id: "res-dist-systems",
      title: "Cloud & Distributed Flight Telemetry Systems",
      domain: "Distributed Telemetry & 3D WebGL",
      description: "Architected real-time ingestion pipelines processing global ADS-B transponder telemetry across 12,000+ simultaneous aircraft, paired with a custom zero-dependency 3D canvas rendering engine.",
      tags: ["Distributed Telemetry", "Canvas API", "ADS-B", "Aviation Systems"]
    },
    {
      id: "res-edge-ai",
      title: "Client-Side Edge AI for Financial Anomaly Detection",
      domain: "Edge Inference & Data Privacy",
      description: "Implemented lightweight neural predictive models executing client-side in browser memory via TensorFlow.js to detect personal spending anomalies with zero external data transmission.",
      tags: ["TensorFlow.js", "Edge Inference", "Anomaly Detection", "Client Privacy"]
    }
  ],

  interests: [
    {
      title: "Automotive Engineering & Infographics",
      tag: "[AUTO]",
      desc: "Deep fascination with automotive architectures, vehicle specifications, and aerodynamics. Co-led infographic campaigns for Mercedes-Benz, VinFast, and Audi at 6Pistons."
    },
    {
      title: "Strategy Gaming & Engine Analysis",
      tag: "[CHESS]",
      desc: "Passionate chess and strategy player exploring Stockfish API integration, game-tree evaluation, and heuristic minimax algorithms."
    },
    {
      title: "3D Graphics & Browser Game Development",
      tag: "[3D]",
      desc: "Crafting WebGL shaders, zero-dependency canvas engines, and gamified web experiences reaching over 15,000 global visitors."
    },
    {
      title: "Live Hosting & Stage Anchoring",
      tag: "[HOST]",
      desc: "Official university EMCEE addressing central auditoriums of 5,000+ attendees."
    }
  ],

  languages: [
    {
      language: "Korean (한국어)",
      level: "Intermediate 1 (Certified)",
      highlight: "Awarded 1st Runner-Up at SRMIST Department of Foreign Languages 2022 representing Republic of Korea",
      tag: "[KOREAN]"
    },
    {
      language: "Mandarin Chinese",
      level: "Working Competency",
      highlight: "East Asian linguistics and diplomatic cultural research",
      tag: "[CHINESE]"
    },
    {
      language: "English",
      level: "Native / Full Professional",
      highlight: "Primary medium of software development, documentation, and university emceeing",
      tag: "[ENGLISH]"
    },
    {
      language: "Hindi",
      level: "Native",
      highlight: "Fluent spoken and written communication",
      tag: "[HINDI]"
    },
    {
      language: "Regional Languages of India",
      level: "Multilingual Communicator",
      highlight: "Speaks Gujarati, Assamese, Nagamese, Mizo, and Meiteilon / Manipuri",
      tag: "[REGIONAL]"
    }
  ],

  skillCategories: [
    {
      name: "Frontend Alchemy",
      potionName: "Potion of Swift Interfaces",
      color: "#38bdf8",
      skills: [
        { name: "React.js", level: 96, tag: "REACT" },
        { name: "Next.js 16", level: 94, tag: "NEXT" },
        { name: "TypeScript", level: 93, tag: "TS" },
        { name: "Tailwind CSS", level: 96, tag: "CSS" },
        { name: "Three.js & WebGL", level: 90, tag: "WEBGL" },
        { name: "HTML5 Canvas API", level: 95, tag: "CANVAS" }
      ]
    },
    {
      name: "Backend & Systems",
      potionName: "Potion of Deep Architectures",
      color: "#22c55e",
      skills: [
        { name: "Node.js & Express", level: 94, tag: "NODE" },
        { name: "PostgreSQL & Supabase", level: 90, tag: "PG" },
        { name: "RESTful APIs", level: 96, tag: "API" },
        { name: "SQLite & Firebase", level: 91, tag: "SQLITE" },
        { name: "FastAPI & Python", level: 86, tag: "PYTHON" },
        { name: "MapLibre GL & Spatial Data", level: 88, tag: "MAPS" }
      ]
    },
    {
      name: "Artificial Intelligence",
      potionName: "Elixir of Cognitive Models",
      color: "#ec4899",
      skills: [
        { name: "TensorFlow.js", level: 90, tag: "TFJS" },
        { name: "Stockfish API & Game AI", level: 92, tag: "CHESS" },
        { name: "Predictive Analytics", level: 88, tag: "PREDICT" },
        { name: "Anomaly Detection", level: 89, tag: "ANOMALY" },
        { name: "MediaPipe & Computer Vision", level: 85, tag: "VISION" }
      ]
    },
    {
      name: "Cloud & DevOps",
      potionName: "Brew of Cloud Titans",
      color: "#eab308",
      skills: [
        { name: "Git & GitHub", level: 96, tag: "GIT" },
        { name: "Vercel & Serverless CI/CD", level: 94, tag: "VERCEL" },
        { name: "Linux & Bash Systems", level: 90, tag: "LINUX" },
        { name: "Azure & Cloud Infra", level: 82, tag: "AZURE" },
        { name: "Docker & Containers", level: 80, tag: "DOCKER" }
      ]
    }
  ] as SkillCategory[],

  landmarks: [
    { name: "Crossroads Citadel (Spawn)", coords: [0, 2, 0], tag: "[CITADEL]", desc: "Central drop-in nexus with marble compass rose, sky beacon, and Lakshya guide" },
    { name: "Neo York Tech Metropolis", coords: [80, 2, 0], tag: "[NEO YORK]", desc: "Cyberpunk metropolis with glass skyscrapers, Times Square screens, and AI research labs" },
    { name: "Lak Tower (\"LK\" Monument)", coords: [98, 2, 0], tag: "[LAK TOWER]", desc: "55-block tall Eiffel-inspired tower with illuminated LK monogram and observation skydeck" },
    { name: "Imperial Raj Complex & Taj Mahal", coords: [55, 4, -95], tag: "[TAJ MAHAL]", desc: "Grand white marble Taj Mahal with 4 minarets, reflecting pool, and SRMIST honors (4.37 CGPA)" },
    { name: "Sakura Sanctuary & Pagoda", coords: [-68, 2, -88], tag: "[SAKURA]", desc: "Cherry blossom groves, 4-tier red pagoda, vermilion Torii gates, and Foreign Languages embassy" },
    { name: "Pueblo Royale & Cantina", coords: [-75, 2, 38], tag: "[PUEBLO]", desc: "Sunbaked Mexican adobe village with terracotta arches, central well, and Builder's Arena" },
    { name: "The Sunset Saloon & Beach Bar", coords: [6, 2, 58], tag: "[SALOON]", desc: "Beachfront timber tavern with glowing stone hearth, outdoor deck, and Lakshya's passions hub" },
    { name: "Palm Paradise Beach & Merlion", coords: [15, 2, 110], tag: "[BEACH]", desc: "Tropical coconut palm beach, ocean surf, boardwalk pier, and the iconic Singapore Merlion" },
    { name: "Frostpeak Mountain Overlook", coords: [0, 18, -95], tag: "[FROSTPEAK]", desc: "Snowy alpine ridges and dizzying suspension bridge under the soaring Frost Wyrm dragon" }
  ]
};
