# 🏛️ System Architecture & Engineering Guide
*World of Lakshya — Interactive 3D Minecraft Voxel Portfolio*

## Overview
An interactive 3D WebGL voxel portfolio inspired by Minecraft, featuring real-world landmark realms, procedural terrain generation, ambient physics, interactive entities (wildlife, vehicles, NPCs), spatial audio, and an integrated 3D fantasy world-map screen.

---

## 1. Domain Architecture

```
mine/
├── docs/                             # Engineering documentation & reference
│   ├── architecture.md               # System design & module contracts (this document)
│   ├── changelog.md                  # Release log
│   ├── archive/                      # Historical specs & prompts
│   │   └── MIGRATION_PROMPT.md
│   └── reference/                    # Reference SVG diagrams and assets
├── public/                           # Static assets served directly by Vite
│   ├── heightmap.bin                 # Prebaked world elevation cache (357 KB)
│   ├── Lakshya.Resume.pdf            # Canonical resume download
│   ├── Lakshya.Resume.RB.pdf         # Canonical RB resume download
│   ├── sw.js                         # Service worker for offline PWA caching
│   └── icons & manifest...          # PWA webmanifest & device icons
├── scripts/                          # Build pipelines & developer scripts
│   └── bake-heightmap.js             # Offline procedural heightmap baker
├── tests/                            # Verification & testing suites
│   ├── verify-map-headless.js        # Mathematical & waypoint integrity test suite
│   └── map.spec.js                   # Playwright E2E test suite
├── src/
│   ├── data/                         # Domain models & content
│   │   └── portfolioData.ts          # Structured projects, experience, skills data
│   ├── engine/                       # Core simulation & rendering infrastructure
│   │   ├── audio.ts                  # WebAudio spatial sound synthesizer
│   │   ├── governor.ts               # Autonomous dynamic DPR & 60 FPS performance governor
│   │   ├── interactions.ts           # Decoupled interaction router & state machine
│   │   ├── npcChat.ts                # Proximity chat & world lore manager
│   │   ├── player.ts                 # Physics, AABB collisions, camera, input handling
│   │   └── textures.ts               # Procedural pixel-art texture generator
│   ├── map/                          # 3D World Map Subsystem
│   │   ├── context.js                # Centralized map context & state
│   │   ├── data.js                   # 46 waypoints with verified 3D game coordinates
│   │   ├── mount.js                  # Map lifecycle & mount engine
│   │   ├── terrain.js                # Procedural mesh, water shader & height sampling
│   │   ├── ui.js                     # Glass HUD, tabs, waypoints list, minimap
│   │   ├── style.css                 # World map isolated styles
│   │   └── models/                   # Modular 3D voxel models
│   │       ├── landmarks/            # 31 Regional world monuments & cities
│   │       ├── environment/          # Roads, trees, ships, atmosphere
│   │       ├── helpers.js            # Shared geometry & material builders
│   │       └── index.js              # Landmark registry and dispatcher
│   ├── ui/                           # Presentation & DOM HUD layer
│   │   ├── assets.ts                 # SVG icons & avatar markup
│   │   ├── hud.ts                    # Hotbar, crosshair, health/hunger/XP, F3 debug
│   │   ├── installPrompt.ts          # PWA installation manager & iOS banner
│   │   ├── modals.ts                 # Minecraft pixel-art modal dialogs & book viewer
│   │   └── worldMap.ts               # Bridge to src/map/mount.js
│   ├── world/                        # Voxel realm & scene entities
│   │   ├── animals.ts                # Wildlife AI & interactive mobs
│   │   ├── buildings.ts              # Voxel world builder & landmark realms
│   │   ├── celestial.ts              # Sun, moon, stars, skybox
│   │   ├── climate.ts                # Weather, rain, snow, particle systems
│   │   ├── clouds.ts                 # Minecraft procedural cumulus clouds
│   │   ├── dragons.ts                # Ender dragons & flight paths
│   │   ├── flags.ts                  # National flagpoles & voxel waving flags
│   │   ├── lightningMcQueen.ts       # Radiator Springs raceway & vehicle simulation
│   │   └── world.ts                  # Voxel chunk manager & scene coordinator
│   ├── styles/                       # Modular Design System
│   │   ├── base.css                  # Typography, resets, CSS variables, canvas
│   │   ├── hud.css                   # Crosshair, hotbar, status bars, chat log, F3
│   │   ├── map.css                   # Fullscreen world map HUD & overlays
│   │   ├── menu.css                  # Pause overlay, Minecraft logo, control drawers
│   │   ├── modals.css                # Book/quill, chest, alchemy, dialog windows
│   │   └── touch.css                 # Touch controls, D-pad, mobile layout
│   ├── utils/                        # Shared utility helpers
│   │   └── security.ts               # HTML escaping, secure URL opening, deep freezing
│   ├── style.css                     # Master stylesheet aggregating modular domain styles
│   ├── main.ts                       # Game orchestrator & lifecycle bootstrap
│   └── vite-env.d.ts                 # Vite environment definitions
├── index.html                        # Application entrypoint
├── package.json                      # NPM configuration & scripts
├── tsconfig.json                     # Strict TypeScript config with @/* path aliases
└── vite.config.ts                    # Vite configuration with chunk splitting
```

---

## 2. Key Subsystem Boundaries

### A. Core Engine (`src/engine/`)
- **Player (`player.ts`)**: First-person and third-person physics, AABB voxel collision detection, flight mode, jumping, swimming, raycasting interaction targets.
- **Performance Governor (`governor.ts`)**: Dynamically scales WebGL resolution (DPR 1.25 to 2.0) every 1.5 seconds based on rolling 60-frame delta times to protect the 16.6ms (60 FPS) frame budget.
- **Interactions (`interactions.ts`)**: Decoupled interaction router handling project modals, experience milestones, sign reading with ambient SFX, NPC dialogues, animal petting/feeding/riding, and vehicle mounting.
- **Audio (`audio.ts`)**: Zero-dependency WebAudio synthesizer producing block breaks, bells, horns, level up jingles, Ka-Chow sound effects, and footstep audio.

### B. Voxel World Simulation (`src/world/`)
- **VoxelWorld (`world.ts`)**: InstancedMesh voxel management, dynamic chunk meshing, interactive block placement and mining.
- **WorldBuilder (`buildings.ts`)**: Procedural builder for international landmark realms (Imperial India, London, Paris, Tokyo, Seoul, Egypt, Dubai, China, Mexico, USA).
- **Celestial & Climate (`celestial.ts`, `climate.ts`, `clouds.ts`)**: Day-night lighting progression, dynamic skybox, sun/moon orbits, weather transitions (clear, rain, snow), and cumulus clouds.

### C. 3D World Map (`src/map/`)
- Integrated procedural 3D map featuring 46 waypoints with validated coordinates.
- Realistic water shader with animated normals, shoreline lace, and heightfield terrain blending.
- 37 handmade landmark voxel models rendered in miniature.

### D. Presentation & UI (`src/ui/` & `src/styles/`)
- Pure DOM overlays designed to replicate authentic Minecraft interfaces (inventories, chests, brewing alchemy, book & quill).
- Modular CSS architecture under `src/styles/`.

---

## 3. Developer Tooling & Commands

| Command | Action |
|---|---|
| `npm run dev` | Starts Vite local development server on port 3000 |
| `npm run build` | Runs TypeScript compilation (`tsc`) and Vite production bundle |
| `npm run preview` | Previews the production build locally |
| `npm run typecheck` | Typechecks the entire codebase without emitting output |
| `npm test` | Runs the headless map validation test (46 waypoints, terrain math) |
| `npm run bake:heightmap` | Regenerates `public/heightmap.bin` from procedural elevation formulas |
| `npm run clean` | Cleans the `dist/` directory |
