# Strikeline – browser arena shooter

An original 5v5 team deathmatch FPS against bots, built with three.js (vendored, no build step).
Open `arena/index.html` through any static server (e.g. `python3 -m http.server`, or GitHub Pages).

- **Loadouts:** Assault (Raptor AR), Rusher (Wasp SMG, faster movement), Marksman (Longbow DMR with scope); everyone carries a Viper pistol and 2 frag grenades.
- **Streak rewards** (kills without dying): 3 Recon Drone (enemies on minimap), 5 Mortar Strike, 8 Sentinel Turret. Press 4 to use.
- **Mode:** first team to 50 kills or most kills after 8 minutes wins. Bots use A* pathfinding, react and strafe, and have three difficulty levels.
- **Controls:** WASD, Shift sprint, Space jump, C crouch, mouse fire / right-click aim, R reload, 1/2 swap weapon, G grenade, Tab scoreboard, Esc pause.
