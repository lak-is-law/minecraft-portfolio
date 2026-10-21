# Prompt to paste into Google Antigravity

You are continuing a project. Open this folder as the workspace.

## Project
"World of Lakshya" is the in-game world-map screen for craftme.lakshya.uk, a Minecraft-like browser game with real-world landmark realms (Eiffel, Taj Mahal, Giza, Tokyo, Seoul, Dubai/Palm Jumeirah, Hollywood, Neo York, Radiator Springs, Citadel hub).

## What exists
- `index.html` is a single-file three.js (r160) 3D map. It is procedural: terrain heightfield from `T(x,z)`, vertex-coloured by region, depth-aware animated water shader, instanced trees, roads and rail ribbons, 22 handmade landmark models in the `B.*` functions, 40 flag waypoints with DOM plaques, custom pan/rotate/zoom controls.
- `reference/world-map-2d-svg-v1.html` is a rejected flat SVG version. Keep it only for data.
- Waypoint labels must stay EXACTLY as in the `DATA` array (including duplicates: HOLLYWOOD x3, TOKYO x2, SEOUL x2, PALM JUMEIRAH x3, WORLD ISLANDS x2). Do not rename or drop any.
- Public API to keep: `window.CraftMap.{onTravel,onClose,setPlayer(x,z,yaw),waypoints}`, `craftme:travel` / `craftme:close` DOM events, postMessage `{source:'craftme-map',type:'travel'|'close'}`, URL params `?x=&z=&yaw=`.

## Look I want
A professional, realistic 3D illustrated fantasy-world map (reference: a painterly island map with volcano, snow peaks, turquoise shallows, ships, sea monster, soft clouds), with a wooden/gold game UI: top-left title and coordinates, top-centre filter tabs (All, Monuments, Cities, Transit, Nature), top-right Waypoints and Esc, bottom-left status line, bottom-right zoom bar and scale, compass.

## Tasks, in order
1. Run it locally (`npx serve .` or `python -m http.server`) and fix any console errors. If three.js fails to load from a CDN, install `three` with npm and bundle with Vite so it is self-hosted.
2. Convert to a Vite project: `src/main.js`, `src/data.js` (DATA), `src/terrain.js`, `src/models/*.js` (one file per landmark), `src/ui.js`. Behaviour must not change.
3. Improve realism: baked normal/roughness detail on terrain, cloud shadows, soft sun shafts, bloom on neon and lava, LOD for distant models, tighter label declutter, a day/night toggle.
4. Replace procedural terrain with a heightmap exported from the real game world (`GET /api/world/heightmap` or a PNG) when available; keep `T(x,z)` as the fallback.
5. Wire into the game as an overlay: open on M, close on Esc, call `CraftMap.setPlayer` each frame, teleport on `craftme:travel`.
6. Add Playwright screenshot tests at 3 camera presets and check there are no console errors.

## Rules
Do not redesign the UI chrome. Do not rename waypoints. Keep everything runnable without a build step until step 2 is done. Commit after each task.

## Latest changes (already in index.html)
- Water: new ocean shader (layered wave normals, sky Fresnel, sun glint, soft shoreline lace, depth colours from a baked heightmap texture).
- Fonts: UI uses Inter with system fallbacks. Cinzel is used for titles only. No other web fonts, so nothing breaks offline.
- Labels: sentence-case issues removed, uppercase Inter 12px plaques, measured widths, larger collision boxes, selected label always on top.

## UI revamp (latest, supersedes the earlier wooden/gold chrome notes)
The 3D map is approved as is. The UI was redesigned as a modern glass HUD: dark translucent panels, Inter font, one amber accent (#ffb547), segmented filter tabs with counts, icon buttons, a bottom toolbar (You, Pin, Top view, Rail), a vertical zoom stack, and pill labels with a category-coloured dot and a leader line. Waypoint dot colours: monument amber, city sky blue, transit violet, nature green; red/yellow/blue tints override. Keep this look. Do not go back to the wooden/gold style.

## UI v3 (latest)
Added: category icons on labels (monument, city, transit, nature); labels collapse to icon-only badges when crowded instead of disappearing; a live minimap (bottom-left, click to fly, shows the camera view); a richer selected-place card (description, X, Z, distance); a waypoint list grouped by category; `/` focuses search, Esc closes list, then card, then map. Keep all of this.

## UI v4 (latest)
Layout is now two flex columns (`#hud-left`, `#hud-right`) so panels can never overlap; compact breakpoints at 980px, 700px and 680px height. Labels are collision-checked against each other, the YOU label and every UI panel (they collapse to icon badges, then hide). Click UX: bigger hit areas, hover on a list row or label highlights it on the map, minimap and with a pulsing ground ring; double-click a label to travel; double-click the ground to zoom in; Enter travels to the open card; focus rings for keyboard use. Keep all of this.

## World content (latest)
Added waypoints and 3D models (45 waypoints total now): BIG BEN (clock tower, London Eye, bridge; the LONDON waypoint is now the brick city blocks beside it), HARBOR (pier, galleons, yacht, crane, lighthouse, on the south-west coast), AIRPORT (on the yellow zone: terminal, control tower, runway with a jet taking off, parked jets, small plane, helipad and helicopter), AMUSEMENT PARK and BAR (on the pink zone at the south end: Ferris wheel, roller coaster with moving cart, carousel, drop tower, tents, neon BAR). Positions are guesses from the old 2D map; replace the px values in `DATA` with real world coordinates when available. Animated parts use the `tickers` array.

## Latest (zoo, Burj Al Arab, compact UI)
- ZOO added at world X -92, Z -12 (enclosures with elephants, giraffes, lions, penguins and a bird dome). 46 waypoints.
- BURJ AL ARAB rebuilt to match the real landmark: curved translucent sail facade over a V-shaped hotel, tapered spine with mast, helipad boom, Skyview cantilever, round island and a curved causeway to the coast.
- Water shader fades high-frequency waves with camera distance (fixes diagonal stripe aliasing).
- Compact layout below 980px wide: smaller title, full-width scrolling tabs, selected card docked at the bottom-left, quick toolbar as a vertical icon strip, no panel overlap. Test at 770px wide.
