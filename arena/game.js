// Strikeline – an original browser arena shooter (5v5 team deathmatch vs bots).
import * as THREE from './three.module.min.js';

// ---------------------------------------------------------------- config
const MAP_HALF = 60;
const SCORE_LIMIT = 50;
const MATCH_TIME = 8 * 60;
const EYE = 1.65, EYE_CROUCH = 1.1, RADIUS = 0.4, STEP = 0.35;
const GRAVITY = 20, JUMP_V = 7;

const WEAPONS = {
  raptor:  { name: 'Raptor AR',   dmg: 30, minDmg: 20, falloff: [25, 45], rpm: 700, auto: true,  mag: 30, reserve: 120, reload: 2.1, hip: 0.022, ads: 0.004, recoil: 0.010, adsFov: 50, hs: 1.5, speed: 1.0 },
  wasp:    { name: 'Wasp SMG',    dmg: 24, minDmg: 14, falloff: [12, 28], rpm: 900, auto: true,  mag: 32, reserve: 128, reload: 1.8, hip: 0.018, ads: 0.008, recoil: 0.008, adsFov: 55, hs: 1.4, speed: 1.08 },
  longbow: { name: 'Longbow DMR', dmg: 75, minDmg: 60, falloff: [60, 90], rpm: 200, auto: false, mag: 10, reserve: 40,  reload: 2.6, hip: 0.06,  ads: 0.0006, recoil: 0.035, adsFov: 22, hs: 2.0, speed: 0.94, scope: true },
  viper:   { name: 'Viper Pistol', dmg: 30, minDmg: 18, falloff: [10, 25], rpm: 420, auto: false, mag: 12, reserve: 48,  reload: 1.5, hip: 0.025, ads: 0.008, recoil: 0.018, adsFov: 58, hs: 1.5, speed: 1.1 },
};
const CLASSES = [
  { id: 'assault',  name: 'Assault',  primary: 'raptor',  desc: 'Raptor AR + Viper Pistol. Reliable at every range.' },
  { id: 'rusher',   name: 'Rusher',   primary: 'wasp',    desc: 'Wasp SMG + Viper Pistol. Fastest movement, deadly up close.' },
  { id: 'marksman', name: 'Marksman', primary: 'longbow', desc: 'Longbow DMR + Viper Pistol. Two-shot body, one-shot headshot.' },
];
const STREAKS = [
  { kills: 3, id: 'recon',  name: 'Recon Drone' },
  { kills: 5, id: 'mortar', name: 'Mortar Strike' },
  { kills: 8, id: 'turret', name: 'Sentinel Turret' },
];
const DIFF = [
  { react: 0.75, err: 0.075, burst: 0.55, turn: 4 },
  { react: 0.45, err: 0.045, burst: 0.7,  turn: 7 },
  { react: 0.25, err: 0.025, burst: 0.85, turn: 11 },
];
const NAMES_BLUE = ['Hawk', 'Vega', 'Rook', 'Juno'];
const NAMES_RED = ['Talon', 'Cinder', 'Mako', 'Wraith', 'Onyx'];

// ---------------------------------------------------------------- menu
let selClass = 0, selDiff = 1;
const classesEl = document.getElementById('classes');
CLASSES.forEach((c, i) => {
  const d = document.createElement('div');
  d.className = 'cls' + (i === 0 ? ' sel' : '');
  d.innerHTML = `<b>${c.name}</b><small>${c.desc}</small>`;
  d.onclick = () => { selClass = i; [...classesEl.children].forEach((e, j) => e.classList.toggle('sel', j === i)); };
  classesEl.appendChild(d);
});
document.querySelectorAll('#diff .opt').forEach(o => o.onclick = () => {
  selDiff = +o.dataset.v;
  document.querySelectorAll('#diff .opt').forEach(e => e.classList.toggle('sel', e === o));
});

// ---------------------------------------------------------------- renderer / scene
const canvas = document.getElementById('view');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.autoClear = false;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x9fb7c9);
scene.fog = new THREE.Fog(0x9fb7c9, 40, 150);
const camera = new THREE.PerspectiveCamera(72, 1, 0.05, 400);
camera.rotation.order = 'YXZ';

scene.add(new THREE.HemisphereLight(0xdfeaff, 0x4a4136, 0.9));
const sun = new THREE.DirectionalLight(0xfff1d6, 1.6);
sun.position.set(40, 70, 25);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
Object.assign(sun.shadow.camera, { left: -70, right: 70, top: 70, bottom: -70, near: 1, far: 200 });
sun.shadow.bias = -0.0008;
scene.add(sun);

// viewmodel pass
const vmScene = new THREE.Scene();
const vmCam = new THREE.PerspectiveCamera(55, 1, 0.01, 10);
vmScene.add(new THREE.HemisphereLight(0xffffff, 0x555555, 1.2));
const vmSun = new THREE.DirectionalLight(0xffffff, 1); vmSun.position.set(1, 2, 1); vmScene.add(vmSun);

function resize() {
  const w = innerWidth, h = innerHeight;
  renderer.setSize(w, h);
  camera.aspect = vmCam.aspect = w / h;
  camera.updateProjectionMatrix(); vmCam.updateProjectionMatrix();
}
addEventListener('resize', resize); resize();

// ---------------------------------------------------------------- textures
function canvasTex(w, h, draw, rep = 1) {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(rep, rep);
  t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4;
  return t;
}
const groundTex = canvasTex(512, 512, (g, w, h) => {
  g.fillStyle = '#5b5c5a'; g.fillRect(0, 0, w, h);
  for (let i = 0; i < 9000; i++) { const v = 70 + Math.random() * 40 | 0; g.fillStyle = `rgba(${v},${v},${v - 4},.5)`; g.fillRect(Math.random() * w, Math.random() * h, 2, 2); }
  g.strokeStyle = 'rgba(30,30,30,.35)'; g.lineWidth = 3;
  for (let i = 0; i <= w; i += 128) { g.beginPath(); g.moveTo(i, 0); g.lineTo(i, h); g.stroke(); g.beginPath(); g.moveTo(0, i); g.lineTo(w, i); g.stroke(); }
}, 15);
function containerTex(color) {
  return canvasTex(256, 128, (g, w, h) => {
    g.fillStyle = color; g.fillRect(0, 0, w, h);
    for (let x = 0; x < w; x += 10) { g.fillStyle = 'rgba(0,0,0,.18)'; g.fillRect(x, 0, 3, h); g.fillStyle = 'rgba(255,255,255,.08)'; g.fillRect(x + 4, 0, 2, h); }
    g.fillStyle = 'rgba(0,0,0,.25)'; g.fillRect(0, 0, w, 5); g.fillRect(0, h - 5, w, 5);
  });
}
const crateTex = canvasTex(128, 128, (g, w, h) => {
  g.fillStyle = '#8a6a3f'; g.fillRect(0, 0, w, h);
  g.strokeStyle = '#5a4122'; g.lineWidth = 8; g.strokeRect(4, 4, w - 8, h - 8);
  g.beginPath(); g.moveTo(4, 4); g.lineTo(w - 4, h - 4); g.stroke();
  for (let y = 0; y < h; y += 16) { g.fillStyle = 'rgba(0,0,0,.08)'; g.fillRect(0, y, w, 2); }
});
const concreteTex = canvasTex(256, 256, (g, w, h) => {
  g.fillStyle = '#9a968c'; g.fillRect(0, 0, w, h);
  for (let i = 0; i < 4000; i++) { const v = 130 + Math.random() * 40 | 0; g.fillStyle = `rgba(${v},${v - 2},${v - 8},.4)`; g.fillRect(Math.random() * w, Math.random() * h, 2, 2); }
  g.fillStyle = 'rgba(0,0,0,.15)'; for (let y = 0; y < h; y += 64) g.fillRect(0, y, w, 2);
});

// ---------------------------------------------------------------- map
const boxes = []; // {minX,maxX,minZ,maxZ,h}
const ground = new THREE.Mesh(new THREE.PlaneGeometry(MAP_HALF * 2 + 40, MAP_HALF * 2 + 40), new THREE.MeshLambertMaterial({ map: groundTex }));
ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true; scene.add(ground);

const matCache = {};
function boxMat(kind) {
  if (matCache[kind]) return matCache[kind];
  let m;
  if (kind === 'crate') m = new THREE.MeshLambertMaterial({ map: crateTex });
  else if (kind === 'concrete') m = new THREE.MeshLambertMaterial({ map: concreteTex });
  else if (kind === 'wall') m = new THREE.MeshLambertMaterial({ color: 0x6d6a63 });
  else m = new THREE.MeshLambertMaterial({ map: containerTex(kind) });
  return (matCache[kind] = m);
}
function addBox(x, z, w, d, h, kind, rot90 = false) {
  if (rot90) [w, d] = [d, w];
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), boxMat(kind));
  mesh.position.set(x, h / 2, z); mesh.castShadow = mesh.receiveShadow = true; scene.add(mesh);
  boxes.push({ minX: x - w / 2, maxX: x + w / 2, minZ: z - d / 2, maxZ: z + d / 2, h });
}
const CONT = ['#a8432f', '#2f6aa8', '#3d8a4a', '#c08a2a', '#6b4b8a', '#8a8a8a'];
function container(x, z, rot, c, stack = 1) {
  for (let s = 0; s < stack; s++) {
    const w = rot ? 2.5 : 6.1, d = rot ? 6.1 : 2.5;
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, 2.6, d), boxMat(CONT[(c + s) % CONT.length]));
    mesh.position.set(x, 1.3 + s * 2.6, z); mesh.castShadow = mesh.receiveShadow = true; scene.add(mesh);
  }
  const w = rot ? 2.5 : 6.1, d = rot ? 6.1 : 2.5;
  boxes.push({ minX: x - w / 2, maxX: x + w / 2, minZ: z - d / 2, maxZ: z + d / 2, h: 2.6 * stack });
}
// perimeter walls
addBox(0, -MAP_HALF - 1, MAP_HALF * 2 + 4, 2, 5, 'wall');
addBox(0, MAP_HALF + 1, MAP_HALF * 2 + 4, 2, 5, 'wall');
addBox(-MAP_HALF - 1, 0, 2, MAP_HALF * 2 + 4, 5, 'wall');
addBox(MAP_HALF + 1, 0, 2, MAP_HALF * 2 + 4, 5, 'wall');
// central warehouse (hollow, with doorways)
function warehouse(cx, cz, w, d, h) {
  const t = 0.6, door = 3.2;
  const seg = (x, z, sw, sd) => addBox(x, z, sw, sd, h, 'concrete');
  const half = (w - door) / 2;
  seg(cx - w / 2 + half / 2, cz - d / 2, half, t); seg(cx + w / 2 - half / 2, cz - d / 2, half, t);
  seg(cx - w / 2 + half / 2, cz + d / 2, half, t); seg(cx + w / 2 - half / 2, cz + d / 2, half, t);
  const halfD = (d - door) / 2;
  seg(cx - w / 2, cz - d / 2 + halfD / 2, t, halfD); seg(cx - w / 2, cz + d / 2 - halfD / 2, t, halfD);
  seg(cx + w / 2, cz - d / 2 + halfD / 2, t, halfD); seg(cx + w / 2, cz + d / 2 - halfD / 2, t, halfD);
  const roof = new THREE.Mesh(new THREE.BoxGeometry(w + 1, 0.3, d + 1), boxMat('wall'));
  roof.position.set(cx, h + 0.15, cz); roof.castShadow = true; scene.add(roof);
}
warehouse(0, 0, 16, 12, 4.2);
addBox(-3, 0, 1.4, 1.4, 1.1, 'crate'); addBox(3.5, 2.5, 1.4, 1.4, 1.1, 'crate'); addBox(2, -3, 2.8, 1.4, 1.1, 'crate');
// container yard – symmetric layout so neither team is favoured
const yard = [
  [-20, -12, 0, 0, 1], [-20, 12, 0, 1, 1], [20, -12, 0, 2, 1], [20, 12, 0, 3, 1],
  [-12, -26, 1, 4, 2], [12, 26, 1, 4, 2], [-28, 0, 1, 0, 1], [28, 0, 1, 1, 1],
  [0, -22, 0, 5, 1], [0, 22, 0, 5, 1], [-36, -20, 0, 2, 1], [36, 20, 0, 2, 1],
  [-36, 20, 0, 3, 2], [36, -20, 0, 3, 2], [-14, 38, 1, 1, 1], [14, -38, 1, 1, 1],
  [24, 38, 0, 0, 1], [-24, -38, 0, 0, 1], [-46, 6, 1, 4, 1], [46, -6, 1, 4, 1],
  [8, 14, 1, 2, 1], [-8, -14, 1, 2, 1],
];
yard.forEach(([x, z, r, c, s]) => container(x, z, r, c, s));
// low cover crates
[[-10, 8], [10, -8], [-30, -32], [30, 32], [-44, -40], [44, 40], [-6, 30], [6, -30], [-50, 30], [50, -30], [26, -26], [-26, 26], [16, 0], [-16, 0], [-40, -6], [40, 6]]
  .forEach(([x, z]) => addBox(x, z, 1.5, 1.5, 1.1, 'crate'));
// jersey barriers
[[-30, 44, 1], [30, -44, 1], [-52, -14, 0], [52, 14, 0], [0, 44, 1], [0, -44, 1]]
  .forEach(([x, z, r]) => addBox(x, z, 5, 0.7, 1.0, 'concrete', !!r));
// light poles (decor)
for (const [x, z] of [[-40, -40], [40, 40], [-40, 40], [40, -40]]) {
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.15, 9), boxMat('wall'));
  pole.position.set(x, 4.5, z); pole.castShadow = true; scene.add(pole);
  boxes.push({ minX: x - 0.15, maxX: x + 0.15, minZ: z - 0.15, maxZ: z + 0.15, h: 9 });
}

// ---------------------------------------------------------------- collision & raycast helpers
function rayBox(ox, oy, oz, dx, dy, dz, minX, minY, minZ, maxX, maxY, maxZ) {
  let tmin = 0, tmax = Infinity;
  const ax = [[ox, dx, minX, maxX], [oy, dy, minY, maxY], [oz, dz, minZ, maxZ]];
  for (const [o, d, lo, hi] of ax) {
    if (Math.abs(d) < 1e-9) { if (o < lo || o > hi) return Infinity; continue; }
    let t1 = (lo - o) / d, t2 = (hi - o) / d;
    if (t1 > t2) [t1, t2] = [t2, t1];
    tmin = Math.max(tmin, t1); tmax = Math.min(tmax, t2);
    if (tmin > tmax) return Infinity;
  }
  return tmin;
}
function raySphere(o, d, c, r) {
  const lx = c.x - o.x, ly = c.y - o.y, lz = c.z - o.z;
  const tca = lx * d.x + ly * d.y + lz * d.z;
  if (tca < 0) return Infinity;
  const d2 = lx * lx + ly * ly + lz * lz - tca * tca;
  if (d2 > r * r) return Infinity;
  return tca - Math.sqrt(r * r - d2);
}
function rayWorld(o, d, maxDist = 300) {
  let best = maxDist;
  if (d.y < 0) { const t = -o.y / d.y; if (t < best) best = t; }
  for (const b of boxes) {
    const t = rayBox(o.x, o.y, o.z, d.x, d.y, d.z, b.minX, 0, b.minZ, b.maxX, b.h, b.maxZ);
    if (t < best) best = t;
  }
  return best;
}
const _v1 = new THREE.Vector3(), _v2 = new THREE.Vector3();
function lineOfSight(a, b) {
  _v1.subVectors(b, a); const dist = _v1.length(); _v1.divideScalar(dist);
  return rayWorld(a, _v1, dist) >= dist - 0.05;
}
// circle vs boxes; returns resolved x,z. boxes at or below feet + STEP don't block.
function collide(pos, feetY, r = RADIUS) {
  for (const b of boxes) {
    if (b.h <= feetY + STEP) continue;
    const cx = Math.max(b.minX, Math.min(pos.x, b.maxX));
    const cz = Math.max(b.minZ, Math.min(pos.z, b.maxZ));
    let dx = pos.x - cx, dz = pos.z - cz;
    const d2 = dx * dx + dz * dz;
    if (d2 < r * r) {
      if (d2 > 1e-8) { const d = Math.sqrt(d2); pos.x = cx + dx / d * r; pos.z = cz + dz / d * r; }
      else { // centre inside box: push out along smallest axis
        const pen = [pos.x - b.minX, b.maxX - pos.x, pos.z - b.minZ, b.maxZ - pos.z];
        const i = pen.indexOf(Math.min(...pen));
        if (i === 0) pos.x = b.minX - r; else if (i === 1) pos.x = b.maxX + r; else if (i === 2) pos.z = b.minZ - r; else pos.z = b.maxZ + r;
      }
    }
  }
}
function floorAt(x, z, feetY, r = RADIUS) {
  let f = 0;
  for (const b of boxes) {
    if (b.h > feetY + STEP) continue;
    if (x + r * 0.7 > b.minX && x - r * 0.7 < b.maxX && z + r * 0.7 > b.minZ && z - r * 0.7 < b.maxZ) f = Math.max(f, b.h);
  }
  return f;
}

// ---------------------------------------------------------------- nav grid (A*) for bots
const CELL = 2, GN = (MAP_HALF * 2) / CELL;
const blocked = new Uint8Array(GN * GN);
for (let gz = 0; gz < GN; gz++) for (let gx = 0; gx < GN; gx++) {
  const x = -MAP_HALF + (gx + 0.5) * CELL, z = -MAP_HALF + (gz + 0.5) * CELL;
  const m = 0.75;
  blocked[gz * GN + gx] = boxes.some(b => x > b.minX - m && x < b.maxX + m && z > b.minZ - m && z < b.maxZ + m) ? 1 : 0;
}
const toCell = (x, z) => [Math.max(0, Math.min(GN - 1, Math.floor((x + MAP_HALF) / CELL))), Math.max(0, Math.min(GN - 1, Math.floor((z + MAP_HALF) / CELL)))];
const cellPos = (gx, gz) => new THREE.Vector3(-MAP_HALF + (gx + 0.5) * CELL, 0, -MAP_HALF + (gz + 0.5) * CELL);
function nearestFree(gx, gz) {
  if (!blocked[gz * GN + gx]) return [gx, gz];
  for (let r = 1; r < 6; r++) for (let dz = -r; dz <= r; dz++) for (let dx = -r; dx <= r; dx++) {
    const x = gx + dx, z = gz + dz;
    if (x >= 0 && z >= 0 && x < GN && z < GN && !blocked[z * GN + x]) return [x, z];
  }
  return [gx, gz];
}
function findPath(from, to) {
  const [sx, sz] = nearestFree(...toCell(from.x, from.z));
  const [tx, tz] = nearestFree(...toCell(to.x, to.z));
  const start = sz * GN + sx, goal = tz * GN + tx;
  const g = new Float32Array(GN * GN).fill(Infinity), came = new Int32Array(GN * GN).fill(-1);
  const closed = new Uint8Array(GN * GN);
  const open = [start]; g[start] = 0;
  const h = i => Math.hypot(i % GN - tx, (i / GN | 0) - tz);
  const f = new Float32Array(GN * GN).fill(Infinity); f[start] = h(start);
  let iter = 0;
  while (open.length && iter++ < 4000) {
    let bi = 0; for (let i = 1; i < open.length; i++) if (f[open[i]] < f[open[bi]]) bi = i;
    const cur = open[bi]; open.splice(bi, 1);
    if (cur === goal) break;
    closed[cur] = 1;
    const cx = cur % GN, cz = cur / GN | 0;
    for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) {
      if (!dx && !dz) continue;
      const nx = cx + dx, nz = cz + dz;
      if (nx < 0 || nz < 0 || nx >= GN || nz >= GN) continue;
      const ni = nz * GN + nx;
      if (blocked[ni] || closed[ni]) continue;
      if (dx && dz && (blocked[cz * GN + nx] || blocked[nz * GN + cx])) continue;
      const ng = g[cur] + (dx && dz ? 1.414 : 1);
      if (ng < g[ni]) { g[ni] = ng; f[ni] = ng + h(ni); came[ni] = cur; if (!open.includes(ni)) open.push(ni); }
    }
  }
  if (came[goal] < 0 && goal !== start) return [to.clone()];
  const path = []; let c = goal;
  while (c !== start && c >= 0) { path.push(cellPos(c % GN, c / GN | 0)); c = came[c]; }
  path.reverse();
  // string-pull: drop nodes we can see past
  const out = []; let anchor = from.clone(); anchor.y = 1;
  for (let i = 0; i < path.length; i++) {
    const nxt = path[i + 1];
    if (nxt) { const a = anchor.clone(), b = nxt.clone(); b.y = 1; if (lineOfSight(a, b) && clearWide(a, b)) continue; }
    out.push(path[i]); anchor = path[i].clone(); anchor.y = 1;
  }
  return out;
}
function clearWide(a, b) { // check two offset rays so bots don't clip corners
  const d = _v2.subVectors(b, a); d.y = 0; d.normalize();
  const side = new THREE.Vector3(-d.z, 0, d.x).multiplyScalar(0.45);
  return lineOfSight(a.clone().add(side), b.clone().add(side)) && lineOfSight(a.clone().sub(side), b.clone().sub(side));
}

// ---------------------------------------------------------------- audio
let actx = null, master = null;
function initAudio() {
  if (actx) return;
  actx = new (window.AudioContext || window.webkitAudioContext)();
  master = actx.createGain(); master.gain.value = 0.35; master.connect(actx.destination);
}
let noiseBuf = null;
function noise() {
  if (noiseBuf) return noiseBuf;
  noiseBuf = actx.createBuffer(1, actx.sampleRate, actx.sampleRate);
  const d = noiseBuf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  return noiseBuf;
}
function sound(type, vol = 1) {
  if (!actx || vol < 0.02) return;
  const t = actx.currentTime;
  const src = actx.createBufferSource(); src.buffer = noise();
  const flt = actx.createBiquadFilter(), gain = actx.createGain();
  src.connect(flt); flt.connect(gain); gain.connect(master);
  const presets = {
    raptor: [1800, 0.12, 0.9], wasp: [2600, 0.08, 0.7], longbow: [900, 0.35, 1.2], viper: [2200, 0.1, 0.7],
    turret: [3000, 0.06, 0.5], boom: [220, 1.2, 2.2], hit: [5000, 0.03, 0.35], click: [6000, 0.02, 0.2], reload: [3500, 0.05, 0.25],
  };
  const [freq, dur, amp] = presets[type] || presets.raptor;
  flt.type = 'lowpass'; flt.frequency.setValueAtTime(freq, t); flt.frequency.exponentialRampToValueAtTime(Math.max(60, freq * 0.15), t + dur);
  gain.gain.setValueAtTime(amp * vol, t); gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
  src.start(t, Math.random() * 0.5); src.stop(t + dur + 0.05);
  if (type === 'boom' || type === 'longbow') {
    const o = actx.createOscillator(), og = actx.createGain();
    o.frequency.setValueAtTime(type === 'boom' ? 90 : 140, t); o.frequency.exponentialRampToValueAtTime(30, t + dur);
    og.gain.setValueAtTime(0.8 * vol, t); og.gain.exponentialRampToValueAtTime(0.001, t + dur);
    o.connect(og); og.connect(master); o.start(t); o.stop(t + dur);
  }
}
const distVol = p => Math.max(0, 1 - p.distanceTo(camera.position) / 90) ** 1.5;

// ---------------------------------------------------------------- soldiers
const TEAM_COL = { blue: 0x2f6fd6, red: 0xc8392f };
function makeSoldierMesh(team) {
  const g = new THREE.Group();
  const cloth = new THREE.MeshLambertMaterial({ color: 0x4b5240 });
  const teamM = new THREE.MeshLambertMaterial({ color: TEAM_COL[team] });
  const skin = new THREE.MeshLambertMaterial({ color: 0xc89a78 });
  const dark = new THREE.MeshLambertMaterial({ color: 0x222222 });
  const part = (geo, mat, x, y, z) => { const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); m.castShadow = true; return m; };
  const legL = new THREE.Group(), legR = new THREE.Group();
  legL.position.set(-0.15, 0.85, 0); legR.position.set(0.15, 0.85, 0);
  legL.add(part(new THREE.BoxGeometry(0.22, 0.85, 0.26), cloth, 0, -0.42, 0));
  legR.add(part(new THREE.BoxGeometry(0.22, 0.85, 0.26), cloth, 0, -0.42, 0));
  const upper = new THREE.Group(); upper.position.y = 0.85;
  upper.add(part(new THREE.BoxGeometry(0.56, 0.62, 0.32), teamM, 0, 0.32, 0));
  upper.add(part(new THREE.BoxGeometry(0.6, 0.3, 0.36), cloth, 0, 0.18, 0)); // vest
  const head = part(new THREE.SphereGeometry(0.19, 12, 10), skin, 0, 0.78, 0);
  const helmet = part(new THREE.SphereGeometry(0.215, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), teamM, 0, 0.8, 0);
  upper.add(head, helmet);
  const arms = new THREE.Group(); arms.position.set(0, 0.5, 0);
  arms.add(part(new THREE.BoxGeometry(0.14, 0.14, 0.5), cloth, -0.28, 0, -0.2));
  arms.add(part(new THREE.BoxGeometry(0.14, 0.14, 0.5), cloth, 0.22, 0, -0.25));
  arms.add(part(new THREE.BoxGeometry(0.08, 0.12, 0.75), dark, 0.05, 0.02, -0.5));
  upper.add(arms);
  g.add(legL, legR, upper);
  g.userData = { legL, legR, upper, arms };
  return g;
}

let soldiers = [], player = null, turrets = [], grenades = [], strikes = [], effects = [];
let teamScore = { blue: 0, red: 0 }, matchTime = MATCH_TIME, running = false, over = false, diff = DIFF[1];
let reconTimer = 0;

class Soldier {
  constructor(team, name, isPlayer, primary) {
    Object.assign(this, { team, name, isPlayer, kills: 0, deaths: 0, score: 0, streak: 0, alive: false, respawn: 0.5 });
    this.pos = new THREE.Vector3(); this.vel = new THREE.Vector3();
    this.yaw = 0; this.pitch = 0; this.hp = 100; this.lastHurt = 0; this.crouch = false;
    this.primary = primary; this.lastShot = -10; this.lastFireTime = -10;
    if (!isPlayer) {
      this.mesh = makeSoldierMesh(team); this.mesh.visible = false; scene.add(this.mesh);
      this.weapon = { def: WEAPONS[primary], ammo: WEAPONS[primary].mag, reloading: 0 };
      this.path = []; this.repath = 0; this.target = null; this.seenAt = 0; this.strafe = 1; this.strafeT = 0; this.goal = null;
      this.aimYaw = 0; this.aimPitch = 0; this.burstT = 0; this.nextShot = 0; this.walkPhase = 0;
    }
  }
  get eye() { return new THREE.Vector3(this.pos.x, this.pos.y + (this.crouch ? EYE_CROUCH : EYE), this.pos.z); }
  get chest() { return new THREE.Vector3(this.pos.x, this.pos.y + (this.crouch ? 0.85 : 1.15), this.pos.z); }
  get headPos() { return new THREE.Vector3(this.pos.x, this.pos.y + (this.crouch ? 1.15 : 1.63), this.pos.z); }
  // returns {t, head} or null
  hitTest(o, d) {
    if (!this.alive) return null;
    const th = raySphere(o, d, this.headPos, 0.22);
    const top = this.crouch ? 1.0 : 1.45;
    const tb = rayBox(o.x, o.y, o.z, d.x, d.y, d.z, this.pos.x - 0.32, this.pos.y, this.pos.z - 0.32, this.pos.x + 0.32, this.pos.y + top, this.pos.z + 0.32);
    if (th === Infinity && tb === Infinity) return null;
    return th <= tb ? { t: th, head: true } : { t: tb, head: false };
  }
}

// ---------------------------------------------------------------- player weapon state + viewmodel
const loadout = {}; let curSlot = 'primary', ads = 0, adsHeld = false, fireHeld = false, recoilP = 0, recoilY = 0;
let grenadesLeft = 2, streakQueue = [], cookT = 0;
function makeViewGun(kind) {
  const g = new THREE.Group();
  const metal = new THREE.MeshLambertMaterial({ color: 0x2b2d30 }), poly = new THREE.MeshLambertMaterial({ color: 0x55574f });
  const add = (w, h, d, m, x, y, z) => { const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); b.position.set(x, y, z); g.add(b); return b; };
  if (kind === 'viper') {
    add(0.05, 0.07, 0.22, metal, 0, 0, -0.1); add(0.045, 0.12, 0.06, poly, 0, -0.08, -0.02);
  } else {
    const len = kind === 'longbow' ? 0.85 : kind === 'wasp' ? 0.45 : 0.65;
    add(0.07, 0.1, len, metal, 0, 0, -len / 2);
    add(0.06, 0.13, 0.08, poly, 0, -0.1, -0.12);
    add(0.06, 0.16, 0.05, metal, 0, -0.1, -len * 0.55);
    add(0.05, 0.08, 0.12, poly, 0, -0.03, 0.02);
    add(0.025, 0.025, 0.2, metal, 0, 0.01, -len - 0.08);
    if (kind === 'longbow') { const s = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.3, 10), metal); s.rotation.x = Math.PI / 2; s.position.set(0, 0.09, -0.3); g.add(s); }
    else add(0.03, 0.04, 0.08, metal, 0, 0.07, -0.22);
  }
  const hand = new THREE.MeshLambertMaterial({ color: 0x3d4535 });
  add(0.08, 0.08, 0.22, hand, 0.03, -0.13, -0.02);
  const flash = new THREE.Mesh(new THREE.PlaneGeometry(0.22, 0.22), new THREE.MeshBasicMaterial({ color: 0xffd27a, transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide }));
  const len = kind === 'viper' ? 0.22 : kind === 'longbow' ? 0.85 : kind === 'wasp' ? 0.45 : 0.65;
  flash.position.set(0, 0.01, -len - 0.2); g.add(flash); g.userData.flash = flash;
  return g;
}
const vmRoot = new THREE.Group(); vmScene.add(vmRoot);
const muzzleLight = new THREE.PointLight(0xffc070, 0, 8); scene.add(muzzleLight);
let vmGun = null, swapT = 0, bob = 0;
function equip(slot) {
  curSlot = slot; swapT = 0.35;
  if (vmGun) vmRoot.remove(vmGun);
  vmGun = makeViewGun(loadout[slot].key); vmRoot.add(vmGun);
  updateHUD(true);
}
const curW = () => loadout[curSlot];

// ---------------------------------------------------------------- effects
const tracerMat = new THREE.LineBasicMaterial({ color: 0xffe2a0, transparent: true, opacity: 0.85 });
function tracer(a, b) {
  const geo = new THREE.BufferGeometry().setFromPoints([a, b]);
  const l = new THREE.Line(geo, tracerMat.clone()); scene.add(l);
  effects.push({ obj: l, t: 0.07, max: 0.07, fade: true });
}
const sparkGeo = new THREE.SphereGeometry(0.05, 4, 4);
function impact(p, blood) {
  const m = new THREE.Mesh(sparkGeo, new THREE.MeshBasicMaterial({ color: blood ? 0x9b1010 : 0xffe9a8, transparent: true }));
  m.position.copy(p); scene.add(m); effects.push({ obj: m, t: 0.25, max: 0.25, fade: true, grow: blood ? 3 : 1.5 });
}
function explosionFx(p) {
  const m = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 12), new THREE.MeshBasicMaterial({ color: 0xffa040, transparent: true }));
  m.position.copy(p); scene.add(m); effects.push({ obj: m, t: 0.5, max: 0.5, fade: true, grow: 9 });
  const smoke = new THREE.Mesh(new THREE.SphereGeometry(1, 12, 10), new THREE.MeshLambertMaterial({ color: 0x444444, transparent: true, opacity: 0.6 }));
  smoke.position.copy(p).y += 1; scene.add(smoke); effects.push({ obj: smoke, t: 2.2, max: 2.2, fade: true, grow: 4, rise: 1.5 });
  const light = new THREE.PointLight(0xff9a40, 30, 25); light.position.copy(p).y += 1; scene.add(light);
  effects.push({ obj: light, t: 0.3, max: 0.3, light: 30 });
  sound('boom', distVol(p));
  const d = p.distanceTo(camera.position); if (d < 25) shake = Math.max(shake, (1 - d / 25) * 0.4);
}
let shake = 0;
function updateEffects(dt) {
  for (let i = effects.length - 1; i >= 0; i--) {
    const e = effects[i]; e.t -= dt; const k = Math.max(0, e.t / e.max);
    if (e.fade) e.obj.material.opacity = k * (e.obj.material.userData.base ?? (e.obj.material.userData.base = e.obj.material.opacity));
    if (e.grow) e.obj.scale.setScalar(1 + (1 - k) * e.grow);
    if (e.rise) e.obj.position.y += e.rise * dt;
    if (e.light) e.obj.intensity = e.light * k;
    if (e.t <= 0) { scene.remove(e.obj); e.obj.geometry?.dispose(); e.obj.material?.dispose?.(); effects.splice(i, 1); }
  }
}

// ---------------------------------------------------------------- combat
function falloffDmg(def, dist) {
  const [a, b] = def.falloff;
  if (dist <= a) return def.dmg; if (dist >= b) return def.minDmg;
  return def.dmg + (def.minDmg - def.dmg) * (dist - a) / (b - a);
}
// fire a hitscan ray; returns hit soldier info
function fireRay(shooter, origin, dir, def, weaponName, showTracer = true) {
  const worldT = rayWorld(origin, dir, 250);
  let best = null;
  for (const s of soldiers) {
    if (s === shooter || !s.alive || s.team === shooter.team) continue;
    const h = s.hitTest(origin, dir);
    if (h && h.t < worldT && (!best || h.t < best.t)) best = { ...h, s };
  }
  const end = origin.clone().addScaledVector(dir, best ? best.t : worldT);
  if (showTracer && Math.random() < 0.6) { const st = origin.clone().addScaledVector(dir, 1.2); st.y -= 0.12; tracer(st, end); }
  if (best) {
    impact(end, true);
    const dmg = falloffDmg(def, best.t) * (best.head ? def.hs : 1);
    damage(best.s, dmg, shooter, weaponName, best.head, origin);
  } else if (worldT < 250) impact(end, false);
  return best;
}

function damage(victim, amount, attacker, weaponName, head, fromPos) {
  if (!victim.alive || over) return;
  victim.hp -= amount; victim.lastHurt = now;
  if (victim.isPlayer) {
    flashDamage(fromPos);
  } else if (attacker && attacker !== victim && attacker.alive && (!victim.target || Math.random() < 0.6)) {
    victim.target = attacker; victim.seenAt = now; victim.alertPos = attacker.pos.clone();
  }
  if (attacker?.isPlayer && victim !== attacker) { hitmarker(victim.hp <= 0); sound('hit', 1); }
  if (victim.hp <= 0) kill(victim, attacker, weaponName, head);
}

function kill(victim, attacker, weaponName, head) {
  victim.alive = false; victim.hp = 0; victim.deaths++; victim.streak = 0;
  victim.respawn = victim.isPlayer ? 4 : 3.5;
  const teamKill = attacker && attacker !== victim && attacker.team !== victim.team;
  if (teamKill) {
    attacker.kills++; attacker.score += 100 + (head ? 50 : 0); attacker.streak++;
    teamScore[attacker.team]++;
    if (attacker.isPlayer) {
      popup(`+${100 + (head ? 50 : 0)} ${head ? 'HEADSHOT' : 'KILL'}`);
      const st = STREAKS.find(s => s.kills === attacker.streak);
      if (st) { streakQueue.push(st.id); popup(`${st.name.toUpperCase()} READY — press 4`); }
    }
  }
  const col = t => t === 'blue' ? 'cb' : 'cr';
  const aName = attacker && attacker !== victim ? `<span class="${col(attacker.team)}">${attacker.name}</span> ` : '';
  feed(`${aName}[${weaponName}${head ? ' ✦' : ''}] <span class="${col(victim.team)}">${victim.name}</span>`);
  if (victim.isPlayer) {
    center(`KILLED BY ${attacker && attacker !== victim ? attacker.name.toUpperCase() : 'YOURSELF'}<br><small style="font-size:16px;opacity:.7">Respawning…</small>`);
    if (vmGun) vmGun.visible = false;
  } else {
    victim.deathT = 0; victim.target = null; victim.path = [];
  }
  if (teamScore.blue >= SCORE_LIMIT || teamScore.red >= SCORE_LIMIT) endMatch();
}

function explode(p, radius, maxDmg, owner, name) {
  explosionFx(p);
  const o = p.clone(); o.y += 0.4;
  for (const s of soldiers) {
    if (!s.alive) continue;
    if (owner && s.team === owner.team && s !== owner) continue;
    const d = s.chest.distanceTo(p);
    if (d > radius) continue;
    if (!lineOfSight(o, s.chest)) continue;
    damage(s, maxDmg * (1 - d / radius) * (s === owner ? 0.6 : 1), owner, name, false, p);
  }
}

// ---------------------------------------------------------------- spawning
const SPAWNS = { blue: [], red: [] };
for (let i = -4; i <= 4; i++) {
  SPAWNS.blue.push(new THREE.Vector3(i * 10, 0, -54)); SPAWNS.red.push(new THREE.Vector3(i * 10, 0, 54));
  SPAWNS.blue.push(new THREE.Vector3(-54, 0, i * 6 - 30)); SPAWNS.red.push(new THREE.Vector3(54, 0, 30 - i * 6));
}
const ALL_SPAWNS = [...SPAWNS.blue, ...SPAWNS.red];
function pickSpawn(team) {
  const enemies = soldiers.filter(s => s.alive && s.team !== team);
  const allies = soldiers.filter(s => s.alive && s.team === team);
  let best = null, bestScore = -Infinity;
  for (const p of ALL_SPAWNS) {
    const own = SPAWNS[team].includes(p) ? 12 : 0;
    let minE = 200; for (const e of enemies) minE = Math.min(minE, e.pos.distanceTo(p));
    if (minE < 18) continue;
    let seen = false; const pe = p.clone(); pe.y = 1.6;
    for (const e of enemies) if (e.pos.distanceTo(p) < 60 && lineOfSight(e.eye, pe)) { seen = true; break; }
    let nearA = 0; for (const a of allies) if (a.pos.distanceTo(p) < 25) nearA += 4;
    const sc = Math.min(minE, 60) + own + nearA - (seen ? 40 : 0) + Math.random() * 10;
    if (sc > bestScore) { bestScore = sc; best = p; }
  }
  return (best || SPAWNS[team][Math.random() * SPAWNS[team].length | 0]).clone();
}
function spawn(s) {
  s.pos.copy(pickSpawn(s.team)); s.pos.x += (Math.random() - 0.5) * 2; s.pos.z += (Math.random() - 0.5) * 2;
  s.vel.set(0, 0, 0); s.hp = 100; s.alive = true; s.crouch = false;
  s.yaw = Math.atan2(s.pos.x, s.pos.z); // face the map centre
  if (s.isPlayer) {
    s.pitch = 0;
    for (const k of ['primary', 'secondary']) { const w = loadout[k]; w.ammo = w.def.mag; w.reserve = w.def.reserve; w.reloading = 0; }
    grenadesLeft = 2; equip('primary'); vmGun.visible = true; center('');
  } else {
    s.mesh.visible = true; s.mesh.rotation.set(0, 0, 0); s.weapon.ammo = s.weapon.def.mag; s.weapon.reloading = 0;
    s.path = []; s.repath = 0; s.target = null;
  }
}

// ---------------------------------------------------------------- input
const keys = {};
addEventListener('keydown', e => {
  if (!running) return;
  keys[e.code] = true;
  if (e.code === 'Tab') { e.preventDefault(); showBoard(true); }
  if (!player?.alive || over) return;
  if (e.code === 'KeyR') startReload();
  if (e.code === 'Digit1' && curSlot !== 'primary') equip('primary');
  if (e.code === 'Digit2' && curSlot !== 'secondary') equip('secondary');
  if (e.code === 'KeyG') throwGrenade();
  if (e.code === 'Digit4') useStreak();
  if (e.code === 'KeyC') player.crouch = !player.crouch;
});
addEventListener('keyup', e => { keys[e.code] = false; if (e.code === 'Tab') showBoard(false); });
addEventListener('mousedown', e => {
  if (!running) return;
  if (document.pointerLockElement !== canvas) { if (!over) canvas.requestPointerLock(); return; }
  if (e.button === 0) { fireHeld = true; triggerPulled = true; }
  if (e.button === 2) adsHeld = true;
});
addEventListener('mouseup', e => { if (e.button === 0) fireHeld = false; if (e.button === 2) adsHeld = false; });
addEventListener('contextmenu', e => e.preventDefault());
addEventListener('mousemove', e => {
  if (document.pointerLockElement !== canvas || !player?.alive) return;
  const sens = 0.0022 * (1 - ads * (1 - curW().def.adsFov / 72) * 0.9);
  player.yaw -= e.movementX * sens; player.pitch -= e.movementY * sens;
  player.pitch = Math.max(-1.5, Math.min(1.5, player.pitch));
});
const pausedEl = document.getElementById('paused');
document.addEventListener('pointerlockchange', () => {
  const locked = document.pointerLockElement === canvas;
  pausedEl.style.display = running && !locked && !over ? 'flex' : 'none';
  if (!locked) { fireHeld = adsHeld = false; for (const k in keys) keys[k] = false; }
});
pausedEl.onclick = () => canvas.requestPointerLock();
let triggerPulled = false;

// ---------------------------------------------------------------- player actions
function startReload() {
  const w = curW();
  if (w.reloading > 0 || w.ammo >= w.def.mag || w.reserve <= 0) return;
  w.reloading = w.def.reload; sound('reload', 0.8);
}
function throwGrenade() {
  if (grenadesLeft <= 0) return;
  grenadesLeft--;
  const dir = new THREE.Vector3(0, 0, -1).applyEuler(camera.rotation);
  const m = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 6), new THREE.MeshLambertMaterial({ color: 0x3a4a2a }));
  m.castShadow = true; m.position.copy(camera.position).addScaledVector(dir, 0.6); scene.add(m);
  grenades.push({ mesh: m, vel: dir.multiplyScalar(17).add(new THREE.Vector3(0, 3.5, 0)).add(player.vel.clone().multiplyScalar(0.5)), fuse: 2.4, owner: player });
  updateHUD(true);
}
function updateGrenades(dt) {
  for (let i = grenades.length - 1; i >= 0; i--) {
    const g = grenades[i]; g.fuse -= dt;
    g.vel.y -= GRAVITY * dt;
    const p = g.mesh.position, step = g.vel.clone().multiplyScalar(dt);
    const len = step.length();
    if (len > 0) {
      const dir = step.clone().divideScalar(len);
      const t = rayWorld(p, dir, len + 0.1);
      if (t < len + 0.1) {
        // bounce: find which face we hit by probing axes
        const hit = p.clone().addScaledVector(dir, t);
        if (hit.y < 0.12) { g.vel.y = -g.vel.y * 0.35; g.vel.x *= 0.6; g.vel.z *= 0.6; }
        else {
          const nx = Math.abs(dir.x) > Math.abs(dir.z);
          if (nx) g.vel.x = -g.vel.x * 0.4; else g.vel.z = -g.vel.z * 0.4;
          if (rayWorld(new THREE.Vector3(hit.x, hit.y + 0.3, hit.z), new THREE.Vector3(0, -1, 0), 0.4) < 0.4) { g.vel.y = Math.abs(g.vel.y) * 0.3; }
        }
        p.addScaledVector(dir, Math.max(0, t - 0.1));
      } else p.add(step);
    }
    if (p.y < 0.09) { p.y = 0.09; }
    if (g.fuse <= 0) { scene.remove(g.mesh); grenades.splice(i, 1); explode(p.clone(), 7, 140, g.owner, 'Frag'); }
  }
}
function useStreak() {
  if (!streakQueue.length) return;
  const id = streakQueue.shift();
  if (id === 'recon') { reconTimer = 30; popup('RECON DRONE ONLINE'); feed('<span class="cy">Recon Drone</span> deployed'); }
  if (id === 'mortar') {
    const targets = soldiers.filter(s => s.alive && s.team !== player.team).sort(() => Math.random() - 0.5).slice(0, 4);
    while (targets.length < 4) targets.push({ pos: new THREE.Vector3((Math.random() - 0.5) * 100, 0, (Math.random() - 0.5) * 100) });
    targets.forEach((t, i) => {
      const p = t.pos.clone(); p.y = 0;
      const marker = new THREE.Mesh(new THREE.RingGeometry(5.5, 6, 32), new THREE.MeshBasicMaterial({ color: 0xff3030, transparent: true, opacity: 0.7, side: THREE.DoubleSide }));
      marker.rotation.x = -Math.PI / 2; marker.position.copy(p).y = 0.05; scene.add(marker);
      strikes.push({ pos: p, t: 1.8 + i * 0.5, marker });
    });
    popup('MORTAR STRIKE INBOUND'); feed('<span class="cy">Mortar Strike</span> called in');
  }
  if (id === 'turret') {
    const dir = new THREE.Vector3(-Math.sin(player.yaw), 0, -Math.cos(player.yaw));
    const p = player.pos.clone().addScaledVector(dir, 1.5); p.y = floorAt(p.x, p.z, player.pos.y + 0.5);
    const g = new THREE.Group();
    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.5, 0.9, 10), new THREE.MeshLambertMaterial({ color: 0x3a3f45 }));
    base.position.y = 0.45; base.castShadow = true;
    const head = new THREE.Group(); head.position.y = 1.05;
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.35, 0.6), new THREE.MeshLambertMaterial({ color: TEAM_COL.blue }));
    const barrel = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.7), new THREE.MeshLambertMaterial({ color: 0x222222 }));
    barrel.position.z = -0.6; head.add(body, barrel); body.castShadow = true;
    g.add(base, head); g.position.copy(p); scene.add(g);
    turrets.push({ mesh: g, head, pos: p, team: player.team, owner: player, life: 45, cd: 0, target: null });
    popup('SENTINEL TURRET DEPLOYED'); feed('<span class="cy">Sentinel Turret</span> deployed');
  }
  updateHUD(true);
}
function updateStrikes(dt) {
  for (let i = strikes.length - 1; i >= 0; i--) {
    const s = strikes[i]; s.t -= dt;
    s.marker.material.opacity = 0.4 + 0.4 * Math.sin(now * 20);
    if (s.t <= 0) { scene.remove(s.marker); strikes.splice(i, 1); explode(s.pos, 8, 200, player, 'Mortar'); }
  }
}
const TURRET_DEF = { dmg: 14, minDmg: 10, falloff: [20, 50], hs: 1 };
function updateTurrets(dt) {
  for (let i = turrets.length - 1; i >= 0; i--) {
    const t = turrets[i]; t.life -= dt; t.cd -= dt;
    if (t.life <= 0) { scene.remove(t.mesh); turrets.splice(i, 1); continue; }
    const eye = t.pos.clone(); eye.y += 1.05;
    if (!t.target || !t.target.alive || t.scan <= 0) {
      t.scan = 0.3; t.target = null; let bd = 50;
      for (const s of soldiers) if (s.alive && s.team !== t.team) { const d = s.pos.distanceTo(t.pos); if (d < bd && lineOfSight(eye, s.chest)) { bd = d; t.target = s; } }
    }
    t.scan -= dt;
    if (t.target) {
      const d = t.target.chest.sub(eye);
      const want = Math.atan2(-d.x, -d.z);
      let diffA = ((want - t.head.rotation.y + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
      t.head.rotation.y += Math.sign(diffA) * Math.min(Math.abs(diffA), dt * 5);
      if (Math.abs(diffA) < 0.1 && t.cd <= 0) {
        t.cd = 0.12; d.normalize();
        d.x += (Math.random() - 0.5) * 0.05; d.y += (Math.random() - 0.5) * 0.05; d.z += (Math.random() - 0.5) * 0.05; d.normalize();
        fireRay(t.owner, eye, d, TURRET_DEF, 'Sentinel');
        sound('turret', distVol(t.pos));
      }
    }
  }
}

// ---------------------------------------------------------------- player update
const flashEl = () => vmGun?.userData.flash;
function updatePlayer(dt) {
  const p = player;
  if (!p.alive) {
    p.respawn -= dt;
    // death cam: slowly drop
    camera.position.y = Math.max(0.4, camera.position.y - dt * 1.5);
    if (p.respawn <= 0 && !over) spawn(p);
    return;
  }
  const w = curW(), def = w.def;
  const fwd = new THREE.Vector3(-Math.sin(p.yaw), 0, -Math.cos(p.yaw));
  const right = new THREE.Vector3(-fwd.z, 0, fwd.x);
  const move = new THREE.Vector3();
  if (keys.KeyW) move.add(fwd); if (keys.KeyS) move.sub(fwd);
  if (keys.KeyD) move.add(right); if (keys.KeyA) move.sub(right);
  const moving = move.lengthSq() > 0; if (moving) move.normalize();
  const sprint = keys.ShiftLeft && keys.KeyW && !adsHeld && w.reloading <= 0;
  if (sprint) p.crouch = false;
  const clsSpeed = CLASSES[selClass].id === 'rusher' ? 1.08 : 1;
  let speed = (sprint ? 7.8 : 5.2) * def.speed * clsSpeed;
  if (p.crouch) speed = 2.6; if (ads > 0.5) speed *= 0.6;
  const onGround = p.pos.y <= floorAt(p.pos.x, p.pos.z, p.pos.y) + 0.01;
  const accel = onGround ? 12 : 3;
  p.vel.x += (move.x * speed - p.vel.x) * Math.min(1, accel * dt);
  p.vel.z += (move.z * speed - p.vel.z) * Math.min(1, accel * dt);
  if (keys.Space && onGround) { p.vel.y = JUMP_V; p.crouch = false; }
  p.vel.y -= GRAVITY * dt;
  p.pos.x += p.vel.x * dt; p.pos.z += p.vel.z * dt;
  collide(p.pos, p.pos.y);
  p.pos.y += p.vel.y * dt;
  const fl = floorAt(p.pos.x, p.pos.z, Math.max(p.pos.y, p.pos.y - p.vel.y * dt));
  if (p.pos.y <= fl) { p.pos.y = fl; p.vel.y = 0; }
  // ceiling under warehouse roof
  if (Math.abs(p.pos.x) < 8.5 && Math.abs(p.pos.z) < 6.5 && p.pos.y + EYE > 4.1 && p.pos.y < 4) { p.pos.y = Math.min(p.pos.y, 4.1 - EYE); p.vel.y = Math.min(0, p.vel.y); }

  // weapon state
  if (swapT > 0) swapT -= dt;
  const wantAds = adsHeld && !sprint && w.reloading <= 0 && swapT <= 0;
  ads += ((wantAds ? 1 : 0) - ads) * Math.min(1, dt * 12);
  if (w.reloading > 0) {
    w.reloading -= dt;
    if (w.reloading <= 0) { const n = Math.min(def.mag - w.ammo, w.reserve); w.ammo += n; w.reserve -= n; updateHUD(true); }
  }
  const interval = 60 / def.rpm;
  const canFire = !sprint && w.reloading <= 0 && swapT <= 0 && now - p.lastShot >= interval;
  if (fireHeld && canFire && (def.auto || triggerPulled)) {
    triggerPulled = false;
    if (w.ammo <= 0) { sound('click'); startReload(); fireHeld = def.auto ? fireHeld : false; }
    else {
      w.ammo--; p.lastShot = now; p.lastFireTime = now;
      const moveSpread = Math.hypot(p.vel.x, p.vel.z) / 7 * 0.02 + (onGround ? 0 : 0.04);
      const spread = (def.hip + (def.ads - def.hip) * ads) + moveSpread * (1 - ads * 0.7);
      const dir = new THREE.Vector3(0, 0, -1).applyEuler(camera.rotation);
      dir.x += (Math.random() - 0.5) * 2 * spread; dir.y += (Math.random() - 0.5) * 2 * spread; dir.z += (Math.random() - 0.5) * 2 * spread;
      dir.normalize();
      fireRay(p, camera.position.clone(), dir, def, def.name);
      sound(w.key, 1);
      recoilP += def.recoil * (1 - ads * 0.4); recoilY += (Math.random() - 0.5) * def.recoil * 0.6;
      p.pitch += def.recoil * 0.55 * (1 - ads * 0.4);
      const f = flashEl(); if (f) { f.material.opacity = 1; f.rotation.z = Math.random() * 3; }
      muzzleLight.intensity = 6; muzzleLight.position.copy(camera.position).addScaledVector(dir, 1);
      if (w.ammo === 0) startReload();
      updateHUD(true);
    }
  }
  if (!fireHeld) triggerPulled = false;
  recoilP *= Math.pow(0.001, dt); recoilY *= Math.pow(0.001, dt);
  const f = flashEl(); if (f) f.material.opacity = Math.max(0, f.material.opacity - dt * 25);
  muzzleLight.intensity = Math.max(0, muzzleLight.intensity - dt * 80);

  // regen
  if (now - p.lastHurt > 4.5 && p.hp < 100) p.hp = Math.min(100, p.hp + 40 * dt);

  // camera
  const eyeH = p.crouch ? EYE_CROUCH : EYE;
  camera.position.set(p.pos.x, p.pos.y + eyeH, p.pos.z);
  const spd = Math.hypot(p.vel.x, p.vel.z);
  if (onGround) bob += spd * dt * 1.6;
  camera.position.y += Math.sin(bob * 2) * 0.03 * (spd / 6) * (1 - ads);
  if (shake > 0) { camera.position.x += (Math.random() - 0.5) * shake; camera.position.y += (Math.random() - 0.5) * shake; shake = Math.max(0, shake - dt); }
  camera.rotation.set(p.pitch + recoilP * 0.3, p.yaw + recoilY, 0);
  const targetFov = 72 + (def.adsFov - 72) * ads + (sprint ? 6 : 0);
  camera.fov += (targetFov - camera.fov) * Math.min(1, dt * 14); camera.updateProjectionMatrix();

  // viewmodel placement
  const hipPos = new THREE.Vector3(0.2, -0.2, -0.38), adsPos = new THREE.Vector3(0, -0.078, -0.36);
  const vp = hipPos.lerp(adsPos, ads);
  vp.x += Math.cos(bob) * 0.012 * (spd / 6) * (1 - ads); vp.y += Math.abs(Math.sin(bob)) * 0.012 * (spd / 6) * (1 - ads);
  vp.z += recoilP * 1.6;
  if (sprint) { vp.x += 0.05; vp.y -= 0.06; }
  if (w.reloading > 0) vp.y -= 0.18 * Math.sin(Math.PI * Math.min(1, (def.reload - w.reloading) / def.reload));
  if (swapT > 0) vp.y -= swapT * 0.8;
  vmRoot.position.copy(vp);
  vmRoot.rotation.set(recoilP * 2 + (sprint ? -0.2 : 0), sprint ? 0.6 : 0, sprint ? 0.25 : 0);
  vmRoot.visible = !(def.scope && ads > 0.85);
  document.getElementById('crosshair').style.opacity = ads > 0.5 || sprint ? 0 : 1;
  scopeEl.style.display = def.scope && ads > 0.85 ? 'block' : 'none';
}

// ---------------------------------------------------------------- bot AI
function angleDiff(a, b) { return ((a - b + Math.PI * 3) % (Math.PI * 2)) - Math.PI; }
function updateBot(b, dt) {
  const m = b.mesh;
  if (!b.alive) {
    b.deathT += dt;
    m.rotation.x = Math.max(-Math.PI / 2, -b.deathT * 5);
    m.position.y = b.pos.y + Math.min(0.25, b.deathT);
    if (b.deathT > 2.5) m.visible = false;
    b.respawn -= dt;
    if (b.respawn <= 0 && !over) spawn(b);
    return;
  }
  const eye = b.eye;
  // perception every ~0.2s
  b.think = (b.think || 0) - dt;
  if (b.think <= 0) {
    b.think = 0.15 + Math.random() * 0.1;
    let best = null, bestD = 75;
    const fwd = new THREE.Vector3(-Math.sin(b.yaw), 0, -Math.cos(b.yaw));
    for (const s of soldiers) {
      if (!s.alive || s.team === b.team) continue;
      const d = s.pos.distanceTo(b.pos);
      if (d > bestD) continue;
      const to = s.pos.clone().sub(b.pos).setY(0).normalize();
      const inFov = fwd.dot(to) > Math.cos(1.2) || d < 6 || (now - s.lastFireTime < 0.5 && d < 40) || s === b.target;
      if (!inFov) continue;
      if (lineOfSight(eye, s.headPos) || lineOfSight(eye, s.chest)) { best = s; bestD = d; }
    }
    if (best) {
      if (b.target !== best || now - b.seenAt > 1.2) b.reactUntil = now + diff.react * (0.7 + Math.random() * 0.6);
      b.target = best; b.seenAt = now; b.visible = true; b.alertPos = best.pos.clone();
    } else b.visible = false;
    if (b.target && (!b.target.alive || now - b.seenAt > 4)) { b.target = null; }
  }

  const def = b.weapon.def;
  let moveDir = new THREE.Vector3(), wantYaw = b.yaw, wantPitch = 0, speed = 4.6;
  if (b.weapon.reloading > 0) {
    b.weapon.reloading -= dt;
    if (b.weapon.reloading <= 0) b.weapon.ammo = def.mag;
  }
  if (b.target && b.visible) {
    const aim = (b.aimHead ? b.target.headPos : b.target.chest);
    const d = aim.clone().sub(eye);
    wantYaw = Math.atan2(-d.x, -d.z);
    wantPitch = Math.atan2(d.y, Math.hypot(d.x, d.z));
    // strafe
    b.strafeT -= dt;
    if (b.strafeT <= 0) { b.strafeT = 0.6 + Math.random() * 1.2; b.strafe = Math.random() < 0.5 ? -1 : 1; b.aimHead = Math.random() < 0.25; b.crouchCombat = Math.random() < 0.2; }
    const right = new THREE.Vector3(Math.cos(wantYaw), 0, -Math.sin(wantYaw));
    moveDir.copy(right).multiplyScalar(b.strafe);
    const dist = d.length();
    const fwd = new THREE.Vector3(-Math.sin(wantYaw), 0, -Math.cos(wantYaw));
    if (dist > (def === WEAPONS.wasp ? 10 : 25)) moveDir.add(fwd.multiplyScalar(0.8));
    speed = 3; b.crouch = b.crouchCombat && dist > 12;
    if (b.crouch) speed = 1.5;
    // shooting
    const aligned = Math.abs(angleDiff(wantYaw, b.yaw)) < 0.12;
    if (aligned && now > b.reactUntil && b.weapon.reloading <= 0) {
      b.burstT -= dt;
      if (b.burstT < -0.5) b.burstT = Math.random() < diff.burst ? 0.4 + Math.random() * 0.5 : 0;
      if (b.burstT > 0 && now >= b.nextShot) {
        b.nextShot = now + 60 / def.rpm * (def.auto ? 1.15 : 1.6);
        const err = diff.err * (1 + dist / 40) * (Math.hypot(b.target.vel.x, b.target.vel.z) > 3 ? 1.4 : 1);
        const dir = new THREE.Vector3(-Math.sin(b.yaw) * Math.cos(b.pitch), Math.sin(b.pitch), -Math.cos(b.yaw) * Math.cos(b.pitch));
        dir.x += (Math.random() - 0.5) * 2 * err; dir.y += (Math.random() - 0.5) * 2 * err; dir.z += (Math.random() - 0.5) * 2 * err;
        dir.normalize();
        fireRay(b, eye, dir, def, def.name);
        b.lastFireTime = now;
        sound(b.primary, distVol(b.pos) * 0.7);
        if (--b.weapon.ammo <= 0) b.weapon.reloading = def.reload;
      }
    }
  } else {
    b.crouch = false;
    // navigate
    b.repath -= dt;
    if (b.repath <= 0 || !b.path.length) {
      b.repath = 4 + Math.random() * 3;
      let goal;
      if (b.target && b.alertPos) goal = b.alertPos.clone();
      else if (Math.random() < 0.55) {
        const enemies = soldiers.filter(s => s.alive && s.team !== b.team);
        const e = enemies[Math.random() * enemies.length | 0];
        goal = e ? e.pos.clone().add(new THREE.Vector3((Math.random() - 0.5) * 24, 0, (Math.random() - 0.5) * 24)) : null;
      }
      if (!goal) goal = new THREE.Vector3((Math.random() - 0.5) * 100, 0, (Math.random() - 0.5) * 100);
      goal.x = Math.max(-56, Math.min(56, goal.x)); goal.z = Math.max(-56, Math.min(56, goal.z));
      b.path = findPath(b.pos, goal);
    }
    const next = b.path[0];
    if (next) {
      const d = next.clone().sub(b.pos).setY(0);
      if (d.length() < 0.8) b.path.shift();
      else { moveDir.copy(d.normalize()); wantYaw = Math.atan2(-d.x, -d.z); }
    }
    if (b.target && b.alertPos && !b.visible) { // look toward last known position
      const d = b.alertPos.clone().sub(b.pos); if (d.lengthSq() > 4) wantYaw = Math.atan2(-d.x, -d.z);
    }
    if (b.weapon.ammo < def.mag * 0.4 && b.weapon.reloading <= 0) b.weapon.reloading = def.reload;
  }
  // turn
  const turn = diff.turn * dt;
  const dy = angleDiff(wantYaw, b.yaw); b.yaw += Math.sign(dy) * Math.min(Math.abs(dy), turn);
  b.pitch += (wantPitch - b.pitch) * Math.min(1, dt * 8);
  // move
  if (moveDir.lengthSq() > 0) moveDir.normalize();
  b.vel.x = moveDir.x * speed; b.vel.z = moveDir.z * speed;
  const ox = b.pos.x, oz = b.pos.z;
  b.pos.x += b.vel.x * dt; b.pos.z += b.vel.z * dt;
  collide(b.pos, 0, 0.38);
  b.pos.x = Math.max(-59, Math.min(59, b.pos.x)); b.pos.z = Math.max(-59, Math.min(59, b.pos.z));
  if (moveDir.lengthSq() > 0 && Math.hypot(b.pos.x - ox, b.pos.z - oz) < speed * dt * 0.2) { b.stuck = (b.stuck || 0) + dt; if (b.stuck > 0.6) { b.path = []; b.repath = 0; b.stuck = 0; b.strafe *= -1; } }
  else b.stuck = 0;
  b.pos.y = 0;
  // animate
  m.position.copy(b.pos); m.rotation.y = b.yaw;
  const spd = Math.hypot(b.vel.x, b.vel.z);
  b.walkPhase += spd * dt * 2.2;
  const sw = Math.sin(b.walkPhase) * Math.min(1, spd / 3) * 0.7;
  const u = m.userData;
  u.legL.rotation.x = sw; u.legR.rotation.x = -sw;
  u.upper.position.y = b.crouch ? 0.45 : 0.85;
  u.legL.scale.y = u.legR.scale.y = b.crouch ? 0.55 : 1;
  u.legL.position.y = u.legR.position.y = b.crouch ? 0.47 : 0.85;
  u.arms.rotation.x = b.pitch;
}

// ---------------------------------------------------------------- HUD
const $ = id => document.getElementById(id);
const scopeEl = document.createElement('div');
scopeEl.className = 'hud';
scopeEl.style.cssText = 'inset:0;display:none;background:radial-gradient(circle at center, transparent 0, transparent 34vh, #000 34.3vh);';
scopeEl.innerHTML = '<div style="position:absolute;left:50%;top:0;bottom:0;width:1px;background:#000"></div><div style="position:absolute;top:50%;left:0;right:0;height:1px;background:#000"></div>';
document.body.appendChild(scopeEl);
function updateHUD() {
  if (!player) return;
  const w = curW();
  $('wName').textContent = w.def.name + `  ·  G×${grenadesLeft}`;
  $('aMag').textContent = w.reloading > 0 ? '··' : w.ammo;
  $('aMag').style.color = w.ammo <= w.def.mag * 0.25 ? '#ff6d62' : '#fff';
  $('aRes').textContent = '/ ' + w.reserve;
  const next = STREAKS.find(s => s.kills > player.streak);
  $('streak').innerHTML = (streakQueue.length ? `<div class="ready">[4] ${STREAKS.find(s => s.id === streakQueue[0]).name}${streakQueue.length > 1 ? ` (+${streakQueue.length - 1})` : ''}</div>` : '') +
    STREAKS.map(s => `<div style="opacity:${player.streak >= s.kills ? 1 : .5}">${s.kills} — ${s.name}</div>`).join('') +
    (next ? `<div style="opacity:.7">Streak: ${player.streak}</div>` : '');
}
function hitmarker(isKill) {
  const h = $('hitmarker'); h.classList.toggle('kill', isKill); h.style.transition = 'none'; h.style.opacity = 1;
  requestAnimationFrame(() => { h.style.transition = 'opacity .25s'; h.style.opacity = 0; });
}
function flashDamage(from) {
  $('damage').style.opacity = Math.min(1, (100 - player.hp) / 80);
  if (!from) return;
  const d = from.clone().sub(player.pos);
  const ang = Math.atan2(-d.x, -d.z) - player.yaw;
  const el = document.createElement('div');
  el.style.transform = `rotate(${-ang}rad) translateY(-90px)`;
  $('dmgdir').appendChild(el);
  setTimeout(() => el.style.opacity = 0, 400); setTimeout(() => el.remove(), 1300);
}
function feed(html) {
  const el = document.createElement('div'); el.innerHTML = html; $('killfeed').prepend(el);
  while ($('killfeed').children.length > 6) $('killfeed').lastChild.remove();
  setTimeout(() => el.remove(), 6000);
}
function popup(text) { const el = document.createElement('div'); el.textContent = text; $('popup').appendChild(el); setTimeout(() => el.remove(), 1400); }
function center(html) { $('center').innerHTML = html; }
function showBoard(show) {
  const el = $('scoreboard');
  if (!show) { el.style.display = 'none'; return; }
  const row = s => `<tr class="${s.isPlayer ? 'me' : ''}"><td>${s.name}</td><td>${s.score}</td><td>${s.kills}</td><td>${s.deaths}</td><td>${(s.kills / Math.max(1, s.deaths)).toFixed(2)}</td></tr>`;
  const tbl = team => `<h3 class="${team === 'blue' ? 'cb' : 'cr'}">${team === 'blue' ? 'VANGUARD' : 'OUTLAWS'} — ${teamScore[team]}</h3><table><tr><th>Name</th><th>Score</th><th>K</th><th>D</th><th>K/D</th></tr>${soldiers.filter(s => s.team === team).sort((a, b) => b.score - a.score).map(row).join('')}</table>`;
  el.innerHTML = tbl('blue') + tbl('red'); el.style.display = 'block';
}
const mm = $('minimap').getContext('2d');
function drawMinimap() {
  const W = 180, R = 45, sc = W / 2 / R; // 45m radius
  mm.clearRect(0, 0, W, W);
  mm.save(); mm.translate(W / 2, W / 2); mm.rotate(player.yaw); mm.scale(sc, sc); mm.translate(-player.pos.x, -player.pos.z);
  mm.fillStyle = 'rgba(200,210,220,.35)';
  for (const b of boxes) mm.fillRect(b.minX, b.minZ, b.maxX - b.minX, b.maxZ - b.minZ);
  for (const s of soldiers) {
    if (!s.alive || s.isPlayer) continue;
    const ally = s.team === player.team;
    if (!ally && !(reconTimer > 0 || now - s.lastFireTime < 1.5)) continue;
    mm.fillStyle = ally ? '#5fa0ff' : '#ff4d40';
    mm.beginPath(); mm.arc(s.pos.x, s.pos.z, 1.3, 0, Math.PI * 2); mm.fill();
  }
  for (const t of turrets) { mm.fillStyle = '#ffd34d'; mm.fillRect(t.pos.x - 1, t.pos.z - 1, 2, 2); }
  for (const s of strikes) { mm.strokeStyle = '#ff3030'; mm.lineWidth = 0.6; mm.beginPath(); mm.arc(s.pos.x, s.pos.z, 6, 0, Math.PI * 2); mm.stroke(); }
  mm.restore();
  mm.fillStyle = '#ffd34d'; mm.beginPath(); mm.moveTo(W / 2, W / 2 - 7); mm.lineTo(W / 2 - 5, W / 2 + 5); mm.lineTo(W / 2 + 5, W / 2 + 5); mm.fill();
  if (reconTimer > 0) { mm.fillStyle = '#ffd34d'; mm.font = '11px sans-serif'; mm.fillText(`RECON ${Math.ceil(reconTimer)}s`, 6, W - 6); }
}

// ---------------------------------------------------------------- match flow
function startMatch() {
  initAudio();
  diff = DIFF[selDiff];
  $('menu').style.display = 'none';
  const cls = CLASSES[selClass];
  loadout.primary = { key: cls.primary, def: WEAPONS[cls.primary], ammo: 0, reserve: 0, reloading: 0 };
  loadout.secondary = { key: 'viper', def: WEAPONS.viper, ammo: 0, reserve: 0, reloading: 0 };
  player = new Soldier('blue', 'You', true, cls.primary);
  soldiers = [player];
  const prim = ['raptor', 'raptor', 'wasp', 'longbow', 'wasp'];
  NAMES_BLUE.forEach((n, i) => soldiers.push(new Soldier('blue', n, false, prim[i % prim.length])));
  NAMES_RED.forEach((n, i) => soldiers.push(new Soldier('red', n, false, prim[(i + 1) % prim.length])));
  soldiers.forEach(spawn);
  running = true;
  canvas.requestPointerLock();
  updateHUD();
}
$('play').onclick = startMatch;
function endMatch() {
  if (over) return;
  over = true;
  const win = teamScore.blue > teamScore.red ? 'VICTORY' : teamScore.blue < teamScore.red ? 'DEFEAT' : 'DRAW';
  center(`<div style="font-size:64px;color:${win === 'VICTORY' ? '#ffd34d' : '#ff6d62'}">${win}</div><div style="font-size:20px">${teamScore.blue} – ${teamScore.red}</div><small style="font-size:14px;opacity:.7;margin-top:14px">Click to return to menu</small>`);
  showBoard(true); $('scoreboard').style.top = '72%';
  document.exitPointerLock();
  setTimeout(() => addEventListener('click', () => location.reload(), { once: true }), 800);
}

// ---------------------------------------------------------------- main loop
let now = 0, last = performance.now();
function frame(t) {
  requestAnimationFrame(frame);
  let dt = Math.min(0.05, (t - last) / 1000); last = t;
  const paused = running && !over && document.pointerLockElement !== canvas && !window.__autotest;
  if (running && !paused) {
    now += dt;
    if (!over) {
      matchTime -= dt;
      if (matchTime <= 0) { matchTime = 0; endMatch(); }
    }
    for (let k = 0; k < (window.__timescale || 1); k++) {
      updatePlayer(dt);
      for (const s of soldiers) if (!s.isPlayer) updateBot(s, dt);
      updateGrenades(dt); updateStrikes(dt); updateTurrets(dt); updateEffects(dt);
      if (k) now += dt;
    }
    if (reconTimer > 0) reconTimer -= dt;
    $('damage').style.opacity = player.alive ? Math.max(0, Math.min(1, (100 - player.hp) / 80)) : 0.6;
    $('hpFill').style.width = Math.max(0, player.hp) + '%';
    $('sBlue').textContent = teamScore.blue; $('sRed').textContent = teamScore.red;
    $('sTime').textContent = `${Math.floor(matchTime / 60)}:${String(Math.floor(matchTime % 60)).padStart(2, '0')}`;
    updateHUD(); drawMinimap();
  } else if (!running) {
    // menu flyover
    const a = t / 9000; camera.position.set(Math.sin(a) * 45, 18, Math.cos(a) * 45); camera.lookAt(0, 0, 0);
  }
  renderer.clear();
  renderer.render(scene, camera);
  if (running && player?.alive) { renderer.clearDepth(); renderer.render(vmScene, vmCam); }
}
requestAnimationFrame(frame);

// hook for automated smoke tests
window.__game = { get state() { return { running, over, teamScore, player: player && { hp: player.hp, alive: player.alive, kills: player.kills, pos: player.pos.toArray() }, bots: soldiers.filter(s => !s.isPlayer).map(s => ({ alive: s.alive, pos: s.pos.toArray() })) }; }, start: startMatch };
