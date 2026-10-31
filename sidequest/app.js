/* Sidequest – en tilfældig heldagsplan til weekenden
 * Vælger aktiviteter ud fra årstid, særlige dage, vejrudsigten time for time,
 * solnedgang, budget og alkohol-valg. Udfordringer låses op i løbet af dagen.
 */
(() => {
  'use strict';

  const STORE_KEY = 'sidequest.v1';
  const POINTS = { done: 100, bonus: 50, mission: 200, joker: 25 };
  const DEFAULT_LOC = { name: 'København', lat: 55.6761, lon: 12.5683 };

  // Typisk dansk klima pr. måned – bruges hvis vejret ikke kan hentes
  const CLIMATE = {
    tmax:    [3, 3, 6, 11, 16, 19, 22, 21, 17, 12, 7, 4],
    sunrise: [8.6, 7.9, 6.8, 6.4, 5.2, 4.5, 4.7, 5.6, 6.6, 7.6, 7.6, 8.5],
    sunset:  [16.2, 17.2, 18.2, 20.2, 21.2, 22.0, 21.8, 21.0, 19.7, 18.3, 16.4, 15.8],
    rain:    [45, 40, 35, 30, 30, 35, 40, 40, 40, 45, 50, 50],
  };

  const $ = (sel, el = document) => el.querySelector(sel);
  const app = $('#app');

  /* ───────────── Hjælpere ───────────── */
  const pad = (n) => String(n).padStart(2, '0');
  const isoDate = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const todayISO = () => isoDate(new Date());
  const parseDate = (iso) => new Date(iso + 'T12:00:00');
  const mmdd = (iso) => iso.slice(5);
  const inWin = (md, [a, b]) => (a <= b ? md >= a && md <= b : md >= a || md <= b);
  const nowHours = () => { const d = new Date(); return d.getHours() + d.getMinutes() / 60; };
  const hoursToClock = (h) => `${pad(Math.floor(h))}:${pad(Math.round((h % 1) * 60) % 60)}`;
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fmtDate = (iso) => parseDate(iso).toLocaleDateString('da-DK', { weekday: 'long', day: 'numeric', month: 'long' });
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const epicById = (id) => EPICS.find((e) => e.id === id);
  function actById(id) {
    if (!id) return undefined;
    if (!id.includes('#')) return ACTIVITIES.find((a) => a.id === id);
    // Kapitel i en heldagsmission: "x-mystery#3"
    const [eid, k] = id.split('#');
    const e = epicById(eid);
    const c = e?.ch[+k];
    if (!c) return undefined;
    const alc = store.plan?.alc;
    return {
      id, t: (alc && c.alcT) || c.t, d: (alc && c.alcD) || c.d, q: (alc && c.alcQ) || c.q,
      b: e.b, kr: 0, env: e.env, minT: e.minT, alc: e.alc, sober: e.sober, map: c.map, icon: c.icon, dark: true,
    };
  }
  const KIND = Object.fromEntries(SLOTS.map((x) => [x.id, x]));
  const round15 = (h) => Math.round(h * 4) / 4;
  const kindFor = (h) => (h < 10 ? 'morgen' : h < 12.5 ? 'formiddag' : h < 19.25 ? 'eftermiddag' : 'aften');

  // Bygger dagens tidspunkter ud fra den valgte starttid, med frokost ~12:30 og aftensmad ~18:00
  function buildSlots(start) {
    const out = [];
    const add = (id, h) => out.push({ id, h: round15(h), time: hoursToClock(round15(h)), label: KIND[id].label, icon: KIND[id].icon });
    let t = start;
    for (const meal of [{ id: 'frokost', h: 12.5 }, { id: 'middag', h: 18 }]) {
      if (t > meal.h + 0.75) continue; // måltidet er passeret
      const gap = meal.h - t;
      if (gap < 1) { add(meal.id, t); t += 1.5; continue; }
      const n = Math.ceil(gap / 2.75);
      for (let k = 0; k < n; k++) { add(kindFor(t), t); t += gap / n; }
      add(meal.id, meal.h);
      t = meal.h + 1.5;
    }
    add('aften', out.length ? Math.max(t, 19.5) : t);
    if (out.length < 4 && out[out.length - 1].h + 2 <= 22.5) add('aften', out[out.length - 1].h + 2);
    return out;
  }

  function seasonOf(iso) {
    const m = parseDate(iso).getMonth() + 1;
    if (m === 12 || m <= 2) return 'vinter';
    if (m <= 5) return 'forår';
    if (m <= 8) return 'sommer';
    return 'efterår';
  }
  const SEASON_META = {
    vinter: { icon: '❄️', label: 'Vinter' },
    forår: { icon: '🌱', label: 'Forår' },
    sommer: { icon: '☀️', label: 'Sommer' },
    efterår: { icon: '🍂', label: 'Efterår' },
  };
  const specialOf = (iso) => SPECIAL_DAYS.find((s) => inWin(mmdd(iso), s.win)) || null;

  function weekendOptions() {
    const now = new Date();
    const dow = now.getDay(); // 0 søn, 6 lør
    const add = (n) => { const d = new Date(now); d.setDate(d.getDate() + n); return isoDate(d); };
    const opts = [];
    if (dow === 6) { opts.push({ iso: add(0), label: 'I dag (lørdag)' }, { iso: add(1), label: 'I morgen (søndag)' }); }
    else if (dow === 0) { opts.push({ iso: add(0), label: 'I dag (søndag)' }, { iso: add(6), label: 'Næste lørdag' }); }
    else {
      const toSat = 6 - dow;
      opts.push({ iso: add(0), label: 'I dag' }, { iso: add(toSat), label: 'Lørdag' }, { iso: add(toSat + 1), label: 'Søndag' });
    }
    return opts;
  }

  /* ───────────── Lager ───────────── */
  const load = () => { try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch { return {}; } };
  let store = load();
  store.settings = store.settings || { budget: null, alc: null, date: null, loc: DEFAULT_LOC };
  // Ældre versioner gemte alkohol som true/false – nu 0 (uden), 1 (med) eller 2 (øl-dag)
  if (typeof store.settings.alc === 'boolean') store.settings.alc = store.settings.alc ? 1 : 0;
  if (store.plan && typeof store.plan.alc === 'boolean') store.plan.alc = store.plan.alc ? 1 : 0;
  if (store.plan && !store.plan.slots) { store.plan.slots = SLOTS.map((x) => ({ ...x })); store.plan.mode = 'stop'; }
  if (store.settings.start == null) store.settings.start = 9;
  if (!store.settings.mode) store.settings.mode = 'stop';
  if (!Array.isArray(store.settings.people)) store.settings.people = [];
  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(store)); }
    catch (e) {
      // Sandsynligvis fuld pga. billeder – fjern det ældste billede og prøv igen
      const withPhoto = store.plan?.steps.find((s) => s.photo);
      if (withPhoto) { withPhoto.photo = null; save(); toast('Lageret var fuldt – et ældre billede blev fjernet.'); }
    }
  }

  /* ───────────── Vejr ───────────── */
  const WMO = (code, dark) => {
    if (code === 0) return dark ? ['🌙', 'Klart'] : ['☀️', 'Klart'];
    if (code === 1) return dark ? ['🌙', 'Mest klart'] : ['🌤️', 'Mest klart'];
    if (code === 2) return ['⛅', 'Delvist skyet'];
    if (code === 3) return ['☁️', 'Overskyet'];
    if (code === 45 || code === 48) return ['🌫️', 'Tåge'];
    if (code >= 51 && code <= 57) return ['🌦️', 'Støvregn'];
    if (code >= 61 && code <= 67) return ['🌧️', 'Regn'];
    if (code >= 71 && code <= 77) return ['🌨️', 'Sne'];
    if (code >= 80 && code <= 82) return ['🌧️', 'Byger'];
    if (code === 85 || code === 86) return ['🌨️', 'Snebyger'];
    if (code >= 95) return ['⛈️', 'Torden'];
    return ['🌡️', 'Ukendt'];
  };
  const isSnowCode = (c) => (c >= 71 && c <= 77) || c === 85 || c === 86;
  const toHours = (s) => { const t = s.slice(11, 16).split(':'); return +t[0] + +t[1] / 60; };

  async function fetchWeather(loc, date) {
    const url = 'https://api.open-meteo.com/v1/forecast?' + new URLSearchParams({
      latitude: loc.lat, longitude: loc.lon, timezone: 'auto', wind_speed_unit: 'ms',
      start_date: date, end_date: date,
      hourly: 'temperature_2m,precipitation_probability,precipitation,weather_code,wind_speed_10m,cloud_cover',
      daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset,wind_speed_10m_max',
    });
    const res = await fetch(url);
    if (!res.ok) throw new Error('Vejr-API svarede ' + res.status);
    const j = await res.json();
    const H = j.hourly;
    const hourly = {};
    H.time.forEach((t, i) => {
      hourly[+t.slice(11, 13)] = {
        t: H.temperature_2m[i], pp: H.precipitation_probability[i] ?? 0, pr: H.precipitation[i] ?? 0,
        code: H.weather_code[i], wind: H.wind_speed_10m[i], cloud: H.cloud_cover[i],
      };
    });
    const D = j.daily;
    return {
      fetched: Date.now(), fallback: false,
      daily: {
        code: D.weather_code[0], tmax: D.temperature_2m_max[0], tmin: D.temperature_2m_min[0],
        pp: D.precipitation_probability_max[0] ?? 0, wind: D.wind_speed_10m_max[0],
        sunrise: toHours(D.sunrise[0]), sunset: toHours(D.sunset[0]),
      },
      hourly,
    };
  }

  function climateWeather(date) {
    const m = parseDate(date).getMonth();
    const tmax = CLIMATE.tmax[m];
    const hourly = {};
    for (let h = 0; h < 24; h++) {
      const t = tmax - 4 + 4 * Math.max(0, Math.sin(((h - 8) / 12) * Math.PI));
      hourly[h] = { t: Math.round(t), pp: CLIMATE.rain[m], pr: 0, code: 2, wind: 5, cloud: 60 };
    }
    return {
      fetched: Date.now(), fallback: true,
      daily: { code: 2, tmax, tmin: tmax - 5, pp: CLIMATE.rain[m], wind: 6, sunrise: CLIMATE.sunrise[m], sunset: CLIMATE.sunset[m] },
      hourly,
    };
  }

  async function getWeather(loc, date) {
    try { return await fetchWeather(loc, date); }
    catch (e) { console.warn(e); return climateWeather(date); }
  }

  function slotWeather(wx, slot) {
    const h = wx.hourly[Math.floor(slot.h)] || wx.hourly[12];
    const next = wx.hourly[Math.min(23, Math.floor(slot.h) + 1)] || h;
    const pp = Math.max(h.pp, next.pp);
    const pr = h.pr + next.pr;
    const dark = slot.h + 1 > wx.daily.sunset || slot.h < wx.daily.sunrise;
    const [icon, text] = WMO(h.code, dark);
    return {
      t: Math.round(h.t), pp, pr, wind: Math.round(h.wind), cloud: h.cloud, code: h.code, icon, text, dark,
      wet: pp >= 55 || pr >= 0.6 || (h.code >= 61 && h.code <= 82),
      storm: h.wind >= 14 || h.code >= 95,
      nice: h.t >= 16 && pp < 30 && h.code <= 2,
      snow: isSnowCode(h.code),
    };
  }

  /* ───────────── Planlægning ───────────── */
  function fits(a, sw, ctx) {
    if (a.need === 'sne' && !ctx.snowDay) return false;
    if (a.need === 'klart' && (sw.cloud > 45 || sw.wet)) return false;
    if (a.need === 'blæst' && (sw.wind < 5 || sw.wind >= 14 || sw.wet)) return false;
    if (a.env === 'ude') {
      if (sw.wet || sw.storm || sw.t < (a.minT ?? 5)) return false;
      if (sw.dark && !a.dark) return false;
    }
    if (a.env === 'mix') {
      if (sw.storm || sw.pr >= 2.5 || sw.t < (a.minT ?? 0)) return false;
      if (sw.dark && !a.dark) return false;
    }
    return true;
  }

  function eligible(a, slot, ctx) {
    if (!a.s.includes(slot.id)) return false;
    if (a.b !== '*' && a.b !== ctx.budget) return false;
    if (a.alc === 1 && !ctx.alc) return false;
    if (a.season && !a.season.includes(ctx.season)) return false;
    if (a.months && !a.months.includes(ctx.month)) return false;
    if (a.win && !inWin(ctx.md, a.win)) return false;
    return true;
  }

  function weight(a, slot, sw, ctx) {
    let w = 1;
    if (a.win) w *= 6;
    if (a.months || a.season) w *= 1.6;
    if (a.need) w *= 4;
    if (sw.nice) w *= a.env === 'inde' ? 0.5 : 2;
    if ((sw.wet || sw.t < 3) && a.env === 'inde') w *= 1.4;
    if (a.vild) w *= 1.8;
    if (ctx.alc === 2) {
      if (a.alc === 1) w *= slot.id === 'morgen' ? 3 : 6;
      if (a.alc === 0) w *= 0.2;
    } else if (ctx.alc && !['morgen', 'formiddag'].includes(slot.id)) {
      if (a.alc === 1) w *= 2.5;
      if (a.alc === 0) w *= 0.3;
    }
    if (ctx.budget === 'dyr' && a.b === 'dyr') w *= 1.6;
    if (ctx.budget === 'billig' && a.kr === 0) w *= 1.2;
    return w;
  }

  function weightedPick(list) {
    const total = list.reduce((s, x) => s + x.w, 0);
    let r = Math.random() * total;
    for (const x of list) { r -= x.w; if (r <= 0) return x.a; }
    return list[list.length - 1]?.a;
  }

  function makeCtx(plan) {
    const d = parseDate(plan.date);
    const snowDay = isSnowCode(plan.wx.daily.code) || Object.values(plan.wx.hourly).some((h) => isSnowCode(h.code));
    return { budget: plan.budget, alc: plan.alc, season: seasonOf(plan.date), month: d.getMonth() + 1, md: mmdd(plan.date), snowDay };
  }

  const isBeer = (id) => actById(id)?.alc === 1;
  const isSober = (id) => !!actById(id)?.sober;
  const beerCount = (plan) => plan.steps.filter((st) => isBeer(st.act)).length;

  // Sikkerhed: efter et øl-stop (også som Plan B) vælges aldrig vand, sauna, kørsel, højder eller økser,
  // og et øl-stop vælges aldrig før et af dem.
  function safeWithBeer(a, plan, idx) {
    const before = plan.steps.slice(0, idx);
    const after = plan.steps.slice(idx + 1);
    if (a.sober && before.some((st) => isBeer(st.act) || isBeer(st.planB))) return false;
    if (a.alc === 1 && after.some((st) => isSober(st.act) || isSober(st.planB))) return false;
    return true;
  }

  function chooseFor(slot, plan, used, { indoorOnly = false, idx = plan.steps.length } = {}) {
    const ctx = makeCtx(plan);
    const sw = slotWeather(plan.wx, slot);
    const specials = plan.steps.filter((st, i) => i !== idx && actById(st.act)?.win).length;
    const base = (a) => !used.has(a.id) && a.s.includes(slot.id) && (a.alc !== 1 || ctx.alc) && safeWithBeer(a, plan, idx);
    let pool = ACTIVITIES.filter((a) => base(a) && eligible(a, slot, ctx) && fits(a, sw, ctx) && (!indoorOnly || a.env === 'inde')
      && !(a.win && specials >= 2));
    // Øl-niveau: tving en vis andel øl-stop ind, og sørg for et minimum i løbet af dagen
    if (ctx.alc && !indoorOnly) {
      const beerPool = pool.filter((a) => a.alc === 1);
      const minBeer = ctx.alc === 2 ? 4 : 2;
      const slotsLeft = plan.slots.length - idx;
      const missing = minBeer - beerCount(plan);
      const chance = ctx.alc === 2
        ? (slot.id === 'morgen' ? 0.5 : 0.85)
        : (['morgen', 'formiddag'].includes(slot.id) ? 0.1 : 0.4);
      if (beerPool.length && (missing >= slotsLeft || Math.random() < chance)) pool = beerPool;
    }
    if (!pool.length) pool = ACTIVITIES.filter((a) => base(a) && a.env === 'inde');
    if (!pool.length) return null;
    return weightedPick(pool.map((a) => ({ a, w: weight(a, slot, sw, ctx) })));
  }

  function usedIds(plan, except = -1) {
    const s = new Set();
    plan.steps.forEach((st, i) => { if (i !== except) { s.add(st.act); if (st.planB) s.add(st.planB); } });
    return s;
  }

  function pickEpic(plan) {
    const ctx = makeCtx(plan);
    const d = plan.wx.daily;
    const list = EPICS.filter((e) => {
      if (e.b !== '*' && e.b !== ctx.budget) return false;
      if (e.alc === 1 && !ctx.alc) return false;
      if (e.sober && ctx.alc === 2) return false;
      if (e.season && !e.season.includes(ctx.season)) return false;
      if (e.env === 'ude' && (d.pp >= 60 || d.tmax < (e.minT ?? 5))) return false;
      if (e.env === 'mix' && (d.pp >= 85 || d.tmax < (e.minT ?? 0))) return false;
      return true;
    });
    return weightedPick(list.map((e) => {
      let w = 1;
      if (e.alc === 1) w *= ctx.alc === 2 ? 5 : 1.5;
      if (e.sober && ctx.alc) w *= 0.4;
      if (d.pp >= 60 && e.env === 'inde') w *= 2;
      if (d.pp < 40 && e.env === 'inde' && e.b !== 'dyr') w *= 0.15; // hygge-hulen er til regnvejr
      if (d.pp < 30 && d.tmax >= 12 && e.env !== 'inde') w *= 1.5;
      if (ctx.budget === 'dyr' && e.b === 'dyr') w *= 2;
      return { a: e, w };
    }));
  }

  function buildEpicPlan(plan) {
    const e = pickEpic(plan);
    let chs = e.ch.map((c, k) => ({ ...c, k }));
    const end = (list) => plan.start + list.reduce((s, c) => s + c.h, 0);
    // Starter dagen sent, droppes valgfrie kapitler – og til sidst kapitler fra midten
    while (end(chs) > 24 && chs.some((c) => c.opt)) chs.splice(chs.findIndex((c) => c.opt), 1);
    while (end(chs) > 24.5 && chs.length > 3) chs.splice(Math.floor(chs.length / 2), 1);
    let t = plan.start;
    plan.mode = 'epic';
    plan.epic = e.id;
    plan.jokers = 0;
    plan.slots = chs.map((c, n) => {
      const h = round15(t); t += c.h;
      return { id: 'kapitel', h, time: hoursToClock(h % 24), label: `Kapitel ${n + 1}`, icon: c.icon };
    });
    plan.steps = chs.map((c) => ({ slot: 'kapitel', act: `${e.id}#${c.k}`, planB: null, kaos: pickKaos(plan.alc), status: 'todo', bonus: false, note: '', photo: null, doneAt: null }));
    if (!specialOf(plan.date)) plan.theme = e.t;
    return plan;
  }

  function pickKaos(alc, people = []) {
    if (people.length && Math.random() < 0.4) {
      const tpl = alc && Math.random() < 0.4 ? pick(KAOS_NAMED_ALC) : pick(KAOS_NAMED);
      return tpl.replaceAll('{navn}', pick(people));
    }
    return alc && Math.random() < (alc === 2 ? 0.6 : 0.3) ? pick(KAOS_ALC) : pick(KAOS);
  }
  // Fordeler "stop-kaptajner" på skift i tilfældig rækkefølge
  function assignCaptains(plan) {
    const ppl = [...plan.people].sort(() => Math.random() - 0.5);
    plan.steps.forEach((st, i) => { st.captain = ppl.length ? ppl[i % ppl.length] : null; st.kaos = pickKaos(plan.alc, plan.people); });
    return plan;
  }

  function buildPlan({ date, budget, alc, loc, wx, start = 9, mode = 'stop', people = [] }) {
    const special = specialOf(date);
    const plan = {
      date, budget, alc, loc, wx, start, mode, people: [...people], prepDone: {}, slots: buildSlots(start), startedEarly: false,
      theme: special ? special.theme : alc === 2 ? pick(THEME_BEER) : `${pick(THEME_A)} ${pick(THEME_B)}`,
      mission: pick(alc ? [...MISSIONS, ...MISSIONS_ALC, ...MISSIONS_ALC] : MISSIONS), missionDone: false,
      jokers: 3, notified: [], createdAt: Date.now(), steps: [],
    };
    if (mode === 'epic') return assignCaptains(buildEpicPlan(plan));
    const used = new Set();
    for (const slot of plan.slots) {
      const a = chooseFor(slot, plan, used);
      used.add(a.id);
      const kaos = pickKaos(alc);
      const step = { slot: slot.id, act: a.id, planB: null, kaos, status: 'todo', bonus: false, note: '', photo: null, doneAt: null };
      if (a.env !== 'inde') {
        const b = chooseFor(slot, plan, used, { indoorOnly: true });
        if (b) { step.planB = b.id; used.add(b.id); }
      }
      plan.steps.push(step);
    }
    return assignCaptains(plan);
  }

  /* ───────────── Forberedelse: indkøb, pakning og booking ───────────── */
  function qty(text, n) {
    return text.replace(/\{(\d+)\}( [^\s,()–]+)?/g, (_, k, unit = '') => (n ? `${k * n}${unit}` : `${k}${unit} pr. person`));
  }

  function prepList(plan) {
    const n = plan.people?.length || 0;
    const groups = { book: [], buy: [], pack: [] };
    const seen = new Set();
    const add = (g, text, src) => {
      const t = qty(text, n);
      const key = g + ':' + t;
      if (seen.has(key)) return;
      seen.add(key);
      groups[g].push({ key, text: t, src });
    };
    const ids = plan.mode === 'epic' ? [plan.epic] : plan.steps.map((st) => st.act);
    ids.forEach((id) => {
      const pr = PREP[id];
      if (!pr) return;
      const src = plan.mode === 'epic' ? epicById(id).t : actById(id).t;
      if (pr.book) add('book', pr.book, src);
      (pr.buy || []).forEach((x) => add('buy', x, src));
      (pr.pack || []).forEach((x) => add('pack', x, src));
    });
    // Ud fra vejret og valgene
    const d = plan.wx.daily;
    const wet = plan.slots.some((sl) => slotWeather(plan.wx, sl).wet);
    if (wet || d.pp >= 50) add('pack', 'Regntøj – der er regn i udsigt', 'Vejret');
    if (d.tmin < 6) add('pack', 'Varmt tøj, hue og handsker', 'Vejret');
    if (d.tmax >= 20 && d.pp < 40) add('pack', 'Solcreme og solbriller', 'Vejret');
    if (plan.alc) {
      add('pack', 'Vandflaske – drik vand mellem øllene', 'Øl');
      add('book', 'Aftal hjemtransport (ingen kører efter øl)', 'Øl');
    }
    add('pack', 'Opladet telefon + powerbank', 'Hele dagen');
    add('pack', 'Betalingskort/MobilePay', 'Hele dagen');
    return groups;
  }

  function prepText(plan) {
    const g = prepList(plan);
    const sec = (title, list) => (list.length ? `${title}\n${list.map((x) => `${plan.prepDone?.[x.key] ? '✅' : '⬜'} ${x.text}`).join('\n')}\n` : '');
    return `🎲 Sidequest – forberedelse til ${fmtDate(plan.date)} kl. ${plan.slots[0].time}\n${plan.people?.length ? `👥 ${plan.people.join(', ')}\n` : ''}\n`
      + sec('📅 Book på forhånd:', g.book) + sec('🛒 Køb ind:', g.buy) + sec('🎒 Pak/find frem:', g.pack);
  }

  function renderPrep(plan, mode) {
    const g = prepList(plan);
    const all = [...g.book, ...g.buy, ...g.pack];
    if (!all.length) return '';
    plan.prepDone = plan.prepDone || {};
    const doneN = all.filter((x) => plan.prepDone[x.key]).length;
    const open = mode === 'preview' || (mode === 'live' && plan.steps[0].status === 'todo' && doneN < all.length);
    const list = (title, items) => (items.length ? `<h3>${title}</h3><ul class="prep">${items.map((x) => `
      <li><label class="check"><input type="checkbox" data-action="prep" data-key="${esc(x.key)}" ${plan.prepDone[x.key] ? 'checked' : ''}>
        <span>${esc(x.text)} <small class="muted">· ${esc(x.src)}</small></span></label></li>`).join('')}</ul>` : '');
    return `<details class="card prepcard" ${open ? 'open' : ''}>
      <summary><b>🧾 Forbered dagen</b> <span class="badge ${doneN === all.length ? 'ok' : ''}">${doneN}/${all.length}</span></summary>
      <p class="muted small">Det her skal købes, pakkes eller bookes, før I går i gang${plan.people?.length ? ` – mængder er regnet ud til ${plan.people.length} personer` : ''}.</p>
      ${list('📅 Book på forhånd', g.book)}${list('🛒 Køb ind', g.buy)}${list('🎒 Pak / find frem', g.pack)}
      <button class="btn ghost sm" data-action="shareprep">📤 Send listen til gruppen</button>
    </details>`;
  }

  /* ───────────── Dagens forløb ───────────── */
  function dayMode(plan) {
    const t = todayISO();
    if (plan.date > t) return 'preview';
    if (plan.date < t) return 'past';
    return 'live';
  }

  function isUnlocked(plan, i) {
    const mode = dayMode(plan);
    if (mode === 'past') return true;
    if (mode === 'preview') return false;
    if (i === 0) return plan.startedEarly || nowHours() >= plan.slots[0].h - 0.25;
    if (plan.steps[i - 1].status !== 'todo') return true;
    return nowHours() >= plan.slots[i].h;
  }

  function activeIndex(plan) {
    if (dayMode(plan) !== 'live') return -1;
    return plan.steps.findIndex((s, i) => s.status === 'todo' && isUnlocked(plan, i));
  }

  const missionIdx = (plan) => Math.min(plan.steps.length - 1, Math.floor(plan.steps.length / 3));
  const missionUnlocked = (plan) => isUnlocked(plan, missionIdx(plan));
  const allDone = (plan) => plan.steps.every((s) => s.status !== 'todo');

  function points(plan) {
    let p = 0;
    plan.steps.forEach((s) => { if (s.status === 'done') p += POINTS.done + (s.bonus ? POINTS.bonus : 0); });
    if (plan.missionDone) p += POINTS.mission;
    return p;
  }

  function totalCost(plan) {
    if (plan.mode === 'epic') return epicById(plan.epic).kr;
    return plan.steps.reduce((s, st) => s + (actById(st.act)?.kr || 0), 0);
  }

  function rank(p) {
    if (p >= 1000) return ['🏆', 'Sidequest-legende'];
    if (p >= 750) return ['🦸', 'Weekend-helt'];
    if (p >= 500) return ['⚔️', 'Eventyrer'];
    if (p >= 250) return ['🥾', 'På vej'];
    return ['🛋️', 'Sofakartoffel (i dag)'];
  }

  /* ───────────── UI: toast & modal ───────────── */
  function toast(msg) {
    const el = document.createElement('div');
    el.className = 'toast';
    el.textContent = msg;
    document.body.appendChild(el);
    requestAnimationFrame(() => el.classList.add('show'));
    setTimeout(() => { el.classList.remove('show'); setTimeout(() => el.remove(), 400); }, 3200);
  }

  function modal(html) {
    const wrap = document.createElement('div');
    wrap.className = 'modal-wrap';
    wrap.innerHTML = `<div class="modal">${html}</div>`;
    wrap.addEventListener('click', (e) => { if (e.target === wrap) wrap.remove(); });
    document.body.appendChild(wrap);
    return wrap;
  }

  /* ───────────── UI: opsætning ───────────── */
  let view = null;

  function startOptions(st) {
    const opts = [7, 8, 9, 10, 11, 12, 13, 14, 16].map((h) => ({ h, label: hoursToClock(h) }));
    if (st.date === todayISO()) {
      const now = Math.ceil(nowHours() * 4) / 4;
      if (now <= 21 && !opts.some((o) => o.h === now)) opts.unshift({ h: now, label: `Nu (${hoursToClock(now)})` });
    }
    return opts;
  }

  function renderSetup() {
    view = 'setup';
    const st = store.settings;
    const opts = weekendOptions();
    if (!st.date || !opts.some((o) => o.iso === st.date)) st.date = opts[opts.length === 3 ? 1 : 0].iso; // hverdag → lørdag, ellers i dag
    const season = seasonOf(st.date);
    const special = specialOf(st.date);
    setAccent(season, special);

    app.innerHTML = `
      <header class="hero">
        <div class="logo">🎲 Sidequest</div>
        <h1>Én dag. Én tilfældig plan.<br>Ingen undskyldninger.</h1>
        <p class="muted">Vi kigger på årstiden og vejret, hvor du er, og giver dig en komplet plan fra morgen til aften.
        Udfordringerne låses op i løbet af dagen – så hav appen med.</p>
        <div class="chips center">
          <span class="chip">${SEASON_META[season].icon} ${SEASON_META[season].label}</span>
          ${special ? `<span class="chip hot">${special.icon} ${special.name}</span>` : ''}
        </div>
      </header>

      <section class="card">
        <h2>1. Hvilken dag?</h2>
        <div class="seg" data-group="date">
          ${opts.map((o) => `<button class="${o.iso === st.date ? 'on' : ''}" data-action="set" data-key="date" data-val="${o.iso}">
            ${o.label}<small>${parseDate(o.iso).toLocaleDateString('da-DK', { day: 'numeric', month: 'short' })}</small></button>`).join('')}
        </div>
      </section>

      <section class="card">
        <h2>2. Hvornår starter I?</h2>
        <div class="seg times">
          ${startOptions(st).map((o) => `<button class="${o.h === st.start ? 'on' : ''}" data-action="set" data-key="start" data-val="${o.h}">${o.label}</button>`).join('')}
        </div>
        <div class="row"><label class="small muted" for="starttime">Eller vælg præcist:</label>
          <input id="starttime" type="time" step="900" value="${hoursToClock(st.start)}" style="width:auto"></div>
        <p class="muted small">Planen starter kl. <b>${hoursToClock(st.start)}</b> og kører til sent på aftenen. Frokost og aftensmad lægges på normale tidspunkter.</p>
      </section>

      <section class="card">
        <h2>3. Hvordan skal dagen være?</h2>
        <div class="big-choice">
          <button class="${st.mode === 'stop' ? 'on' : ''}" data-action="set" data-key="mode" data-val="stop">
            <span class="em">🎲</span><b>Mange stop</b><small>5–8 forskellige aktiviteter i løbet af dagen. Jokere og Plan B.</small></button>
          <button class="${st.mode === 'epic' ? 'on' : ''}" data-action="set" data-key="mode" data-val="epic">
            <span class="em">🗺️</span><b>Heldagsmission</b><small>Én stor sammenhængende oplevelse. Appen styrer hele dagen kapitel for kapitel.</small></button>
        </div>
      </section>

      <section class="card">
        <h2>4. Budget</h2>
        <div class="big-choice">
          <button class="${st.budget === 'billig' ? 'on' : ''}" data-action="set" data-key="budget" data-val="billig">
            <span class="em">🪙</span><b>Billig</b><small>Ca. 0–400 kr pr. person for hele dagen (lidt mere på en øl-dag). Kreativitet frem for kreditkort.</small></button>
          <button class="${st.budget === 'dyr' ? 'on' : ''}" data-action="set" data-key="budget" data-val="dyr">
            <span class="em">💎</span><b>Dyr</b><small>Gå all in. Oplevelser, restauranter og det, I plejer at sige nej til.</small></button>
        </div>
      </section>

      <section class="card">
        <h2>5. Alkohol?</h2>
        <div class="big-choice three">
          <button class="${st.alc === 0 ? 'on' : ''}" data-action="set" data-key="alc" data-val="0">
            <span class="em">🧃</span><span><b>Uden alkohol</b><small>Klar hjerne, vilde oplevelser, mocktails.</small></span></button>
          <button class="${st.alc === 1 ? 'on' : ''}" data-action="set" data-key="alc" data-val="1">
            <span class="em">🍻</span><span><b>Med alkohol</b><small>Et par øl-stop i løbet af dagen og aftenen.</small></span></button>
          <button class="${st.alc === 2 ? 'on' : ''}" data-action="set" data-key="alc" data-val="2">
            <span class="em">🍺</span><span><b>Øl-dag!</b><small>Bryghuse, beer pong, pubcrawl og øl-milen. Typisk 4–6 øl-stop.</small></span></button>
        </div>
        <p class="muted small">Kun 18+. Drik med omtanke. Planen lægger aldrig vand, sauna, kørsel eller højder efter et øl-stop.</p>
      </section>

      <section class="card">
        <h2>6. Hvem er med?</h2>
        <p class="muted small">Skriv navnene ind. Så får hvert stop en kaptajn, kaos-reglerne bruger jeres navne, I får en pointtavle, og indkøbslisten regnes ud til jeres antal.</p>
        <div class="chips">${st.people.map((n, k) => `<span class="chip person">${esc(n)} <button class="x" data-action="rmperson" data-i="${k}" aria-label="Fjern ${esc(n)}">×</button></span>`).join('') || '<span class="muted small">Ingen deltagere endnu (valgfrit)</span>'}</div>
        <form class="row" id="personform">
          <input id="person" placeholder="Navn (fx Anna)" maxlength="20" autocomplete="off">
          <button class="btn ghost" type="submit">＋ Tilføj</button>
        </form>
      </section>

      <section class="card">
        <h2>7. Hvor er I?</h2>
        <p class="muted small">Bruges kun til at hente vejrudsigten. Nu: <b id="locname">${esc(st.loc.name)}</b></p>
        <div class="row">
          <button class="btn ghost" data-action="geo">📍 Brug min position</button>
        </div>
        <form class="row" id="cityform">
          <input id="city" placeholder="…eller skriv en by (fx Aarhus)" autocomplete="off">
          <button class="btn ghost" type="submit">Søg</button>
        </form>
      </section>

      <button class="btn primary xl" data-action="generate" ${st.budget && st.alc != null ? '' : 'disabled'}>
        🎲 Rul dagens sidequest
      </button>
      <p class="muted small center">${st.budget && st.alc != null ? 'Klar? Tryk og få din plan.' : 'Vælg budget og alkohol for at fortsætte.'}</p>
    `;

    $('#starttime').addEventListener('change', (e) => {
      const [hh, mm] = e.target.value.split(':').map(Number);
      if (Number.isNaN(hh)) return;
      st.start = Math.min(21, Math.max(5, hh + (mm || 0) / 60));
      save(); renderSetup();
    });
    $('#personform').addEventListener('submit', (e) => {
      e.preventDefault();
      const names = $('#person').value.split(',').map((x) => x.trim()).filter(Boolean);
      if (!names.length) return;
      names.forEach((nm) => { if (st.people.length < 20 && !st.people.includes(nm)) st.people.push(nm); });
      save(); renderSetup();
      $('#person').focus();
    });
    $('#cityform').addEventListener('submit', async (e) => {
      e.preventDefault();
      const q = $('#city').value.trim();
      if (!q) return;
      try {
        const r = await fetch('https://geocoding-api.open-meteo.com/v1/search?' + new URLSearchParams({ name: q, count: 1, language: 'da' }));
        const j = await r.json();
        const hit = j.results?.[0];
        if (!hit) return toast('Kunne ikke finde ' + q);
        st.loc = { name: `${hit.name}${hit.country_code && hit.country_code !== 'DK' ? ', ' + hit.country_code : ''}`, lat: hit.latitude, lon: hit.longitude };
        save(); $('#locname').textContent = st.loc.name; toast('📍 ' + st.loc.name);
      } catch { toast('Søgningen fejlede – tjek din forbindelse.'); }
    });
  }

  function setAccent(season, special) {
    document.body.dataset.season = season;
    document.body.dataset.special = special ? special.name : '';
  }

  /* ───────────── UI: plan ───────────── */
  function renderPlan() {
    view = 'plan';
    const plan = store.plan;
    const mode = dayMode(plan);
    const season = seasonOf(plan.date);
    const special = specialOf(plan.date);
    setAccent(season, special);
    const d = plan.wx.daily;
    const [dIcon, dText] = WMO(d.code, false);
    const ai = activeIndex(plan);
    const p = points(plan);
    const doneCount = plan.steps.filter((s) => s.status !== 'todo').length;

    let banner = '';
    if (mode === 'preview') {
      banner = `<div class="banner">🔒 Det er ikke ${fmtDate(plan.date)} endnu. Planen ligger klar – udfordringerne og den hemmelige mission låses op på dagen. Jeres dag starter kl. ${plan.slots[0].time}!</div>`;
    } else if (mode === 'past') {
      banner = `<div class="banner">📅 Denne sidequest var ${fmtDate(plan.date)}. <button class="link" data-action="report">Se rapporten</button> eller <button class="link" data-action="new">rul en ny</button>.</div>`;
    }

    app.innerHTML = `
      <header class="planhead">
        <div class="topbar">
          <div class="logo small">🎲 Sidequest</div>
          <div class="score" title="Point">⭐ ${p}</div>
        </div>
        <div class="chips">
          <span class="chip">${SEASON_META[season].icon} ${SEASON_META[season].label}</span>
          ${special ? `<span class="chip hot">${special.icon} ${special.name}</span>` : ''}
          <span class="chip">${plan.budget === 'dyr' ? '💎 Dyr' : '🪙 Billig'}</span>
          <span class="chip">${['🧃 Alkoholfri', '🍻 Med alkohol', '🍺 Øl-dag'][plan.alc]}</span>
        </div>
        <h1 class="theme">${esc(plan.theme)}</h1>
        ${plan.mode === 'epic' ? `<p class="epic-intro">${epicById(plan.epic).icon} <b>Heldagsmission: ${esc(epicById(plan.epic).t)}.</b> ${esc(epicById(plan.epic).d)}</p>` : ''}
        <p class="muted">${cap(fmtDate(plan.date))} · ⏰ fra kl. ${plan.slots[0].time} · 📍 ${esc(plan.loc.name)}</p>
        ${plan.people?.length ? `<p class="small">👥 ${plan.people.map(esc).join(' · ')}</p>` : ''}
        <div class="wxbar">
          <div class="wxbig">${dIcon}</div>
          <div>
            <b>${dText}, ${Math.round(d.tmin)}–${Math.round(d.tmax)}°</b>
            <div class="muted small">💧 ${d.pp}% regnrisiko · 💨 ${Math.round(d.wind)} m/s · 🌅 ${hoursToClock(d.sunrise)} · 🌇 ${hoursToClock(d.sunset)}</div>
            ${plan.wx.fallback ? '<div class="small warn">Vejret kunne ikke hentes – planen er lavet ud fra typisk vejr for årstiden.</div>' : ''}
          </div>
        </div>
        <div class="progress"><div style="width:${(doneCount / plan.steps.length) * 100}%"></div></div>
        <div class="muted small row between"><span>${doneCount}/${plan.steps.length} stop klaret</span><span>Ca. ${totalCost(plan)} kr pr. person${plan.people?.length > 1 ? ` · ${totalCost(plan) * plan.people.length} kr i alt` : ''}</span></div>
      </header>

      ${banner}
      ${plan.alc === 2 && mode !== 'past' ? `<div class="banner">🍺 <b>Øl-dag-regler:</b> ét glas vand til hver øl, spis ordentligt til hvert måltid, og ingen kører bil. Det er helt okay at tage en alkoholfri – point tæller stadig.</div>` : ''}
      ${mode === 'live' ? renderNow(plan, ai) : ''}
      ${mode !== 'past' ? renderPrep(plan, mode) : ''}
      ${renderMission(plan)}

      <h2 class="section">Dagens plan</h2>
      <ol class="timeline">
        ${plan.steps.map((s, i) => renderStep(plan, s, i, ai)).join('')}
      </ol>

      <div class="footer-actions">
        ${mode === 'live' ? `<button class="btn ghost" data-action="notify">🔔 Påmind mig ved hvert stop</button>` : ''}
        ${mode !== 'preview' ? `<button class="btn ghost" data-action="report">📜 ${allDone(plan) ? 'Se dagens rapport' : 'Afslut dagen'}</button>` : ''}
        <button class="btn ghost danger" data-action="new">🎲 Ny sidequest</button>
      </div>
      <p class="muted small center">Vejrdata: Open-Meteo · Tjek altid åbningstider og book i god tid.</p>
    `;
    document.title = ai >= 0 ? `Nu: ${actById(plan.steps[ai].act).t} – Sidequest` : 'Sidequest';
  }

  function priceTag(a) { return a.id.includes('#') ? 'Inkl. i missionen' : a.kr === 0 ? 'Gratis' : `ca. ${a.kr} kr`; }
  const mapLink = (a) => a.map ? `<a class="btn ghost sm" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(a.map + ' nær mig')}">🗺️ Find på kort</a>` : '';
  const envTag = (a) => ({ ude: '🌳 Udendørs', mix: '🧥 Ude/inde', inde: '🏠 Indendørs' }[a.env]);

  function renderNow(plan, ai) {
    if (ai < 0) {
      if (allDone(plan)) {
        return `<section class="now done-card"><div class="em-xl">🏁</div><h2>Dagen er klaret!</h2>
          <p>Godt gået. Se jeres rapport og del den med nogen, der sad derhjemme.</p>
          <button class="btn primary" data-action="report">📜 Se rapporten</button></section>`;
      }
      const next = plan.steps.findIndex((s) => s.status === 'todo');
      if (next === 0) {
        return `<section class="now waiting"><div class="em-xl">⏰</div><h2>Dagen starter kl. ${plan.slots[0].time}</h2>
          <p class="muted">Om <b data-countdown="${plan.slots[0].h - 0.25}"></b>. Planen ligger klar nedenfor – udfordringer og kaos-regler låses op undervejs.</p>
          <button class="btn primary" data-action="startnow">🚀 Start nu alligevel</button></section>`;
      }
      return `<section class="now waiting"><h2>⏳ Næste ${plan.mode === 'epic' ? 'kapitel' : 'stop'} låses op kl. ${plan.slots[next].time}</h2>
        <p class="muted">Om <b data-countdown="${plan.slots[next].h}"></b>. Hold en pause – eller klar det forrige for at låse op tidligere.</p></section>`;
    }
    const step = plan.steps[ai];
    const slot = plan.slots[ai];
    const a = actById(step.act);
    const sw = slotWeather(plan.wx, slot);
    const ctx = makeCtx(plan);
    const badWx = a.env !== 'inde' && !fits(a, sw, ctx);
    const b = step.planB && actById(step.planB);
    return `
      <section class="now">
        <div class="now-label">NU · ${slot.icon} ${slot.label} · ${slot.time}</div>
        <h2>${esc(a.t)}</h2>
        <p>${esc(a.d)}</p>
        ${plan.alc && a.alcTip ? `<p class="tip">${esc(a.alcTip)}</p>` : ''}
        <div class="chips">
          <span class="chip">${sw.icon} ${sw.t}° · 💧${sw.pp}%</span>
          <span class="chip">${envTag(a)}</span>
          <span class="chip">💰 ${priceTag(a)}</span>
          ${step.captain ? `<span class="chip hot">👑 Kaptajn: ${esc(step.captain)}</span>` : ''}
        </div>
        ${badWx ? `<div class="banner warn">☔ Vejret er ikke med jer lige nu (${sw.text.toLowerCase()}, ${sw.t}°). ${b ? `Plan B: <b>${esc(b.t)}</b>.` : plan.mode === 'epic' ? 'Regntøj på – missionen fortsætter! Søg ly undervejs.' : 'Brug en joker for en indendørs idé.'}</div>` : ''}
        <div class="quest">
          <div class="quest-label">⚡ Udfordring (+${POINTS.bonus} point)</div>
          ${esc(a.q)}
        </div>
        ${step.kaos ? `<div class="kaos"><span class="quest-label">🌀 Kaos-regel</span> ${esc(step.kaos)}</div>` : ''}
        <div class="actions">
          <button class="btn primary" data-action="complete" data-i="${ai}">✅ Klaret!</button>
          ${b ? `<button class="btn ${badWx ? 'primary alt' : 'ghost'}" data-action="planb" data-i="${ai}">☔ Skift til Plan B</button>` : ''}
          ${plan.mode === 'epic' ? '' : `<button class="btn ghost" data-action="joker" data-i="${ai}" ${plan.jokers ? '' : 'disabled'}>🃏 Joker (${plan.jokers})</button>`}
          ${mapLink(a)}
          <button class="btn ghost sm" data-action="skip" data-i="${ai}">⏭️ Spring over</button>
        </div>
      </section>`;
  }

  function renderMission(plan) {
    const mode = dayMode(plan);
    if (mode === 'preview') return `<section class="mission locked"><b>🕵️ Hemmelig mission</b><p class="muted">Afsløres på dagen ved frokosttid.</p></section>`;
    if (!missionUnlocked(plan)) return `<section class="mission locked"><b>🕵️ Hemmelig mission</b><p class="muted">Låses op kl. ${plan.slots[missionIdx(plan)].time} (eller når I har klaret det forrige ${plan.mode === 'epic' ? 'kapitel' : 'stop'}).</p></section>`;
    return `<section class="mission ${plan.missionDone ? 'ok' : ''}">
      <b>🕵️ Hemmelig mission (+${POINTS.mission} point)</b>
      <p>${esc(plan.mission)}</p>
      <label class="check"><input type="checkbox" data-action="mission" ${plan.missionDone ? 'checked' : ''}> Mission fuldført</label>
    </section>`;
  }

  function renderStep(plan, s, i, ai) {
    const slot = plan.slots[i];
    const a = actById(s.act);
    const sw = slotWeather(plan.wx, slot);
    const unlocked = isUnlocked(plan, i);
    const cls = s.status === 'done' ? 'done' : s.status === 'skipped' ? 'skipped' : i === ai ? 'active' : unlocked ? '' : 'locked';
    const b = s.planB && actById(s.planB);
    return `
      <li class="step ${cls}">
        <div class="step-time"><b>${slot.time}</b><span>${slot.icon}</span></div>
        <div class="step-body">
          <div class="step-head">
            <span class="muted small">${slot.label} · ${sw.icon} ${sw.t}° · 💧${sw.pp}%${sw.dark ? ' · 🌑 mørkt' : ''}</span>
            ${s.status === 'done' ? `<span class="badge ok">✓ ${POINTS.done + (s.bonus ? POINTS.bonus : 0)}</span>` : s.status === 'skipped' ? '<span class="badge">Sprunget over</span>' : ''}
          </div>
          <h3>${esc(a.t)}</h3>
          <p class="small">${esc(a.d)}</p>
          ${plan.alc && a.alcTip ? `<p class="small tip">${esc(a.alcTip)}</p>` : ''}
          <div class="chips small">${s.captain ? `<span class="chip">👑 ${esc(s.captain)}</span>` : ''}<span class="chip">${envTag(a)}</span><span class="chip">💰 ${priceTag(a)}</span>${b ? `<span class="chip" title="${esc(b.t)}">☔ Plan B: ${esc(b.t)}</span>` : ''}</div>
          ${unlocked
            ? `<div class="quest small"><span class="quest-label">⚡ Udfordring</span> ${esc(a.q)}</div>${s.kaos ? `<div class="kaos small"><span class="quest-label">🌀 Kaos</span> ${esc(s.kaos)}</div>` : ''}`
            : `<div class="quest small locked">🔒 Udfordring og kaos-regel låses op kl. ${slot.time}</div>`}
          ${s.photo ? `<img class="thumb" src="${s.photo}" alt="">` : ''}
          ${s.note ? `<p class="small note">“${esc(s.note)}”</p>` : ''}
          ${i !== ai && s.status === 'todo' && dayMode(plan) !== 'past' && plan.jokers ? `<button class="link small" data-action="joker" data-i="${i}">🃏 Byt med joker</button>` : ''}
          ${s.status !== 'todo' && dayMode(plan) === 'live' ? `<button class="link small" data-action="undo" data-i="${i}">↩️ Fortryd</button>` : ''}
        </div>
      </li>`;
  }

  /* ───────────── UI: rapport ───────────── */
  function renderReport() {
    view = 'report';
    const plan = store.plan;
    const p = points(plan);
    const [rIcon, rName] = rank(p);
    const done = plan.steps.filter((s) => s.status === 'done');
    const badges = [];
    if (plan.steps[0].status === 'done') badges.push('🌅 Morgenfrisk');
    if (plan.steps.at(-1).status === 'done' && plan.slots.at(-1).h >= 19.5) badges.push('🌙 Natteravn');
    if (plan.mode === 'epic' && done.length === plan.steps.length) badges.push(`${epicById(plan.epic).icon} Mission fuldført: ${epicById(plan.epic).t}`);
    if (done.length === plan.steps.length) badges.push('💯 Fuld plan');
    if (done.length && done.every((s) => s.bonus)) badges.push('⚡ Udfordrings-mester');
    if (plan.missionDone) badges.push('🕵️ Hemmelig agent');
    if (plan.jokers === 3) badges.push('🃏 Ingen jokere brugt');
    if (done.filter((st) => isBeer(st.act)).length >= 4) badges.push('🍺 Ølkonge');
    if (done.filter((st) => actById(st.act).vild).length >= 3) badges.push('🤪 Fuldstændig vild');
    if (done.some((s) => { const a = actById(s.act); return a.env !== 'inde' && slotWeather(plan.wx, plan.slots[plan.steps.indexOf(s)]).wet; })) badges.push('☔ Vejr-trodser');
    if (plan.wx.daily.tmax < 5 && done.some((s) => actById(s.act).env !== 'inde')) badges.push('🥶 Kuldekriger');

    app.innerHTML = `
      <header class="hero">
        <div class="logo">📜 Dagens rapport</div>
        <h1>${esc(plan.theme)}</h1>
        <p class="muted">${cap(fmtDate(plan.date))} · 📍 ${esc(plan.loc.name)}</p>
        <div class="rank"><div class="em-xl">${rIcon}</div><div><div class="score big">⭐ ${p} point</div><b>${rName}</b></div></div>
        <div class="chips center">${badges.map((b) => `<span class="chip hot">${b}</span>`).join('') || '<span class="chip">Ingen badges i dag – næste gang!</span>'}</div>
      </header>
      ${plan.people?.length ? renderLeaderboard(plan) : ''}
      <section class="card">
        <h2>Sådan gik det</h2>
        <ul class="report-list">
          ${plan.steps.map((s, i) => {
            const a = actById(s.act);
            return `<li class="${s.status}"><span>${plan.slots[i].time}</span><div><b>${s.status === 'done' ? '✅' : s.status === 'skipped' ? '⏭️' : '⬜'} ${esc(a.t)}</b>
              ${s.bonus ? '<span class="badge ok">⚡ udfordring klaret</span>' : ''}
              ${s.heroes?.length ? `<span class="badge">🦸 ${s.heroes.map(esc).join(', ')}</span>` : ''}
              ${s.note ? `<p class="small note">“${esc(s.note)}”</p>` : ''}</div></li>`;
          }).join('')}
        </ul>
        ${missionUnlocked(plan) ? `<p class="small">🕵️ Mission: ${esc(plan.mission)} ${plan.missionDone ? '✅' : '❌'}</p>` : ''}
      </section>
      ${plan.steps.some((s) => s.photo) ? `<section class="card"><h2>Galleri</h2><div class="gallery">${plan.steps.filter((s) => s.photo).map((s) => `<img src="${s.photo}" alt="">`).join('')}</div></section>` : ''}
      <div class="footer-actions">
        <button class="btn primary" data-action="share">📤 Del rapporten</button>
        <button class="btn ghost" data-action="back">← Tilbage til planen</button>
        <button class="btn ghost" data-action="new">🎲 Ny sidequest</button>
      </div>`;
  }

  // Personlige point: kaptajn på et klaret stop = 50, helt i et stop = 50, mission = 100 til alle
  function personScores(plan) {
    const sc = Object.fromEntries(plan.people.map((n) => [n, 0]));
    plan.steps.forEach((st) => {
      if (st.status !== 'done') return;
      if (st.captain in sc) sc[st.captain] += 50;
      (st.heroes || []).forEach((h) => { if (h in sc) sc[h] += 50; });
    });
    if (plan.missionDone) plan.people.forEach((n) => (sc[n] += 100));
    return Object.entries(sc).sort((a, b) => b[1] - a[1]);
  }

  function renderLeaderboard(plan) {
    const rows = personScores(plan);
    const medal = ['🥇', '🥈', '🥉'];
    return `<section class="card"><h2>👥 Pointtavle</h2><ol class="leader">${rows.map(([n, p], k) =>
      `<li><span>${medal[k] || k + 1 + '.'} ${esc(n)}</span><b>${p}</b></li>`).join('')}</ol>
      ${rows.length && rows[0][1] > 0 ? `<p class="small">🏆 Dagens MVP: <b>${esc(rows[0][0])}</b></p>` : ''}</section>`;
  }

  function shareText(plan) {
    const [rIcon, rName] = rank(points(plan));
    const lines = plan.steps.map((s, i) => `${s.status === 'done' ? '✅' : s.status === 'skipped' ? '⏭️' : '⬜'} ${plan.slots[i].time} ${actById(s.act).t}${s.bonus ? ' ⚡' : ''}`);
    const lb = plan.people?.length ? '\n\n👥 ' + personScores(plan).map(([n, p]) => `${n}: ${p}`).join(' · ') : '';
    return `🎲 Sidequest: ${plan.theme}\n${cap(fmtDate(plan.date))}\n\n${lines.join('\n')}\n\n${rIcon} ${rName} – ⭐ ${points(plan)} point${lb}`;
  }

  /* ───────────── Handlinger ───────────── */
  function render() {
    if (!store.plan) return renderSetup();
    if (view === 'report') return renderReport();
    renderPlan();
  }

  async function generate() {
    const st = store.settings;
    app.innerHTML = `<div class="loading"><div class="dice">🎲</div><p>Tjekker vejret i ${esc(st.loc.name)} og ruller terningerne…</p></div>`;
    const wx = await getWeather(st.loc, st.date);
    await new Promise((r) => setTimeout(r, 700)); // lidt spænding
    store.plan = buildPlan({ date: st.date, budget: st.budget, alc: st.alc, loc: st.loc, wx, start: st.start, mode: st.mode, people: st.people });
    save();
    renderPlan();
    window.scrollTo({ top: 0 });
  }

  function openComplete(i) {
    const plan = store.plan;
    const a = actById(plan.steps[i].act);
    const m = modal(`
      <h2>✅ ${esc(a.t)}</h2>
      <label class="check big"><input type="checkbox" id="bonus"> Vi klarede udfordringen (+${POINTS.bonus})</label>
      <p class="small muted">${esc(a.q)}</p>
      ${plan.people?.length ? `<label class="small">Hvem var stoppets helte? (+${POINTS.bonus} hver)</label>
      <div class="chips heroes">${plan.people.map((n) => `<button type="button" class="chip pick" data-name="${esc(n)}">${esc(n)}</button>`).join('')}</div>` : ''}
      <label class="small">Et minde fra stoppet (valgfrit)</label>
      <textarea id="note" rows="2" placeholder="Hvad skete der?"></textarea>
      <label class="btn ghost file">📸 Tilføj billede<input type="file" id="photo" accept="image/*" capture="environment" hidden></label>
      <img id="preview" class="thumb" hidden alt="">
      <div class="actions"><button class="btn primary" id="save">Gem (+${POINTS.done})</button><button class="btn ghost" id="cancel">Annullér</button></div>
    `);
    let photo = null;
    m.querySelectorAll('.pick').forEach((b) => (b.onclick = () => b.classList.toggle('on')));
    $('#photo', m).addEventListener('change', async (e) => {
      const f = e.target.files[0];
      if (!f) return;
      photo = await shrink(f);
      const img = $('#preview', m); img.src = photo; img.hidden = false;
    });
    $('#cancel', m).onclick = () => m.remove();
    $('#save', m).onclick = () => {
      const heroes = [...m.querySelectorAll('.pick.on')].map((b) => b.dataset.name);
      Object.assign(plan.steps[i], { status: 'done', heroes, bonus: $('#bonus', m).checked, note: $('#note', m).value.trim(), photo, doneAt: Date.now() });
      save(); m.remove();
      celebrate();
      const ni = activeIndex(plan);
      toast(ni >= 0 ? `Næste stop er låst op: ${actById(plan.steps[ni].act).t}` : allDone(plan) ? '🏁 Hele dagen er klaret!' : 'Godt gået! 🎉');
      renderPlan();
    };
  }

  function shrink(file, max = 640) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const s = Math.min(1, max / Math.max(img.width, img.height));
        const c = document.createElement('canvas');
        c.width = Math.round(img.width * s); c.height = Math.round(img.height * s);
        c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
        URL.revokeObjectURL(img.src);
        resolve(c.toDataURL('image/jpeg', 0.7));
      };
      img.onerror = () => resolve(null);
      img.src = URL.createObjectURL(file);
    });
  }

  function celebrate() {
    const emojis = ['🎉', '⭐', '✨', '🎊', '🔥'];
    for (let k = 0; k < 24; k++) {
      const e = document.createElement('span');
      e.className = 'confetti';
      e.textContent = pick(emojis);
      e.style.left = Math.random() * 100 + 'vw';
      e.style.animationDelay = Math.random() * 0.4 + 's';
      document.body.appendChild(e);
      setTimeout(() => e.remove(), 2200);
    }
    navigator.vibrate?.(80);
  }

  function useJoker(i) {
    const plan = store.plan;
    if (!plan.jokers) return;
    const slot = plan.slots[i];
    const step = plan.steps[i];
    const used = usedIds(plan, i);
    used.add(step.act); // ikke den samme igen
    const a = chooseFor(slot, plan, used, { idx: i });
    if (!a) return toast('Ingen flere idéer til dette tidspunkt 🤷');
    used.add(a.id);
    step.act = a.id;
    step.planB = null;
    if (a.env !== 'inde') { const b = chooseFor(slot, plan, used, { indoorOnly: true, idx: i }); if (b) step.planB = b.id; }
    plan.jokers--;
    save();
    toast(`🃏 Ny idé: ${a.t}`);
    renderPlan();
  }

  function swapPlanB(i) {
    const step = store.plan.steps[i];
    if (!step.planB) return;
    [step.act, step.planB] = [step.planB, step.act];
    save();
    toast(`☔ Skiftet til: ${actById(step.act).t}`);
    renderPlan();
  }

  async function refreshWeather() {
    const plan = store.plan;
    if (!plan || dayMode(plan) !== 'live') return;
    if (Date.now() - plan.wx.fetched < 30 * 60 * 1000 && !plan.wx.fallback) return;
    try {
      plan.wx = await fetchWeather(plan.loc, plan.date);
      save();
      if (view === 'plan') renderPlan();
    } catch { /* prøv igen senere */ }
  }

  async function notify(title, body) {
    if (!('Notification' in window) || Notification.permission !== 'granted') return;
    try {
      const reg = await navigator.serviceWorker?.getRegistration();
      if (reg) reg.showNotification(title, { body, icon: 'icon.svg', badge: 'icon.svg', tag: 'sidequest' });
      else new Notification(title, { body, icon: 'icon.svg' });
    } catch { /* ignorer */ }
  }

  function tick() {
    const plan = store.plan;
    if (!plan || dayMode(plan) !== 'live') return;
    const ai = activeIndex(plan);
    if (ai >= 0 && !plan.notified.includes(ai)) {
      plan.notified.push(ai);
      save();
      if (ai > 0) {
        const a = actById(plan.steps[ai].act);
        notify(`${plan.slots[ai].icon} ${plan.slots[ai].label}: ${a.t}`, 'Nyt stop og ny udfordring er låst op!');
        navigator.vibrate?.([100, 50, 100]);
      }
      if (view === 'plan') renderPlan();
    }
    // Opdater nedtælling
    document.querySelectorAll('[data-countdown]').forEach((el) => {
      const diff = Math.max(0, +el.dataset.countdown - nowHours());
      const h = Math.floor(diff), m = Math.ceil((diff - h) * 60);
      el.textContent = h ? `${h} t ${m} min` : `${m} min`;
      if (diff <= 0 && view === 'plan') renderPlan();
    });
  }

  app.addEventListener('click', async (e) => {
    const el = e.target.closest('[data-action]');
    if (!el) return;
    const act = el.dataset.action;
    const i = +el.dataset.i;
    const st = store.settings;
    switch (act) {
      case 'set':
        st[el.dataset.key] = ['alc', 'start'].includes(el.dataset.key) ? +el.dataset.val : el.dataset.val;
        save(); renderSetup(); break;
      case 'startnow':
        store.plan.startedEarly = true; save(); renderPlan(); break;
      case 'geo':
        if (!navigator.geolocation) return toast('Din browser understøtter ikke position.');
        navigator.geolocation.getCurrentPosition(
          (pos) => { st.loc = { name: 'Din position', lat: +pos.coords.latitude.toFixed(3), lon: +pos.coords.longitude.toFixed(3) }; save(); $('#locname').textContent = st.loc.name; toast('📍 Position fundet'); },
          () => toast('Kunne ikke hente position – skriv en by i stedet.'),
          { timeout: 10000 });
        break;
      case 'generate': generate(); break;
      case 'complete': openComplete(i); break;
      case 'skip':
        if (confirm('Spring dette stop over? (0 point)')) { store.plan.steps[i].status = 'skipped'; save(); renderPlan(); }
        break;
      case 'undo':
        Object.assign(store.plan.steps[i], { status: 'todo', bonus: false, doneAt: null }); save(); renderPlan(); break;
      case 'joker':
        if (confirm(`Brug en joker og få en ny idé til ${store.plan.slots[i].label.toLowerCase()} kl. ${store.plan.slots[i].time}? (${store.plan.jokers} tilbage)`)) useJoker(i);
        break;
      case 'planb': swapPlanB(i); break;
      case 'rmperson':
        st.people.splice(i, 1); save(); renderSetup(); break;
      case 'prep':
        store.plan.prepDone = store.plan.prepDone || {};
        store.plan.prepDone[el.dataset.key] = el.checked; save();
        { // Opdater tælleren uden at gentegne (så listen forbliver åben)
          const box = el.closest('details'); const all = box.querySelectorAll('input[data-action=prep]');
          const n = [...all].filter((x) => x.checked).length; const badge = box.querySelector('summary .badge');
          badge.textContent = `${n}/${all.length}`; badge.classList.toggle('ok', n === all.length);
        }
        break;
      case 'shareprep': {
        const text = prepText(store.plan);
        if (navigator.share) { try { await navigator.share({ text }); } catch { /* annulleret */ } }
        else { await navigator.clipboard?.writeText(text); toast('📋 Listen er kopieret – indsæt den i gruppechatten.'); }
        break;
      }
      case 'mission':
        store.plan.missionDone = el.checked; save(); if (el.checked) celebrate(); renderPlan(); break;
      case 'notify': {
        if (!('Notification' in window)) return toast('Notifikationer understøttes ikke her.');
        const r = await Notification.requestPermission();
        toast(r === 'granted' ? '🔔 Du får besked, når næste stop låses op (mens appen er åben i baggrunden).' : 'Notifikationer er slået fra.');
        break;
      }
      case 'report': renderReport(); window.scrollTo({ top: 0 }); break;
      case 'back': renderPlan(); break;
      case 'share': {
        const text = shareText(store.plan);
        if (navigator.share) { try { await navigator.share({ text }); } catch { /* annulleret */ } }
        else { await navigator.clipboard?.writeText(text); toast('📋 Kopieret – indsæt hvor du vil.'); }
        break;
      }
      case 'new':
        if (!store.plan || confirm('Starte en ny sidequest? Den nuværende plan slettes.')) {
          store.plan = null; save(); view = null; renderSetup(); window.scrollTo({ top: 0 });
        }
        break;
    }
  });

  document.addEventListener('visibilitychange', () => { if (!document.hidden) { refreshWeather(); tick(); if (view === 'plan') renderPlan(); } });
  setInterval(tick, 20 * 1000);
  setInterval(refreshWeather, 10 * 60 * 1000);

  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }

  render();
  tick();
  refreshWeather();
})();
