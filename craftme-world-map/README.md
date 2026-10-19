# World of Lakshya: 3D Map
- `index.html`: current 3D map (open in Chrome/Safari; needs internet for three.js from a CDN).
- `MIGRATION_PROMPT.md`: paste into Google Antigravity as the first message.
- `reference/`: the earlier flat SVG map.

Controls: left-drag pan, right/Shift-drag rotate, wheel zoom, WASD or arrows move, Q/E rotate, Esc close.
Game hooks: `CraftMap.setPlayer(x,z,yaw)`, `CraftMap.onTravel`, `CraftMap.onClose`, `craftme:travel` and `craftme:close` events.
