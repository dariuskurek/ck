// Billeder: læg filerne i mappen "billeder/" med disse navne.
// Billeder, der ikke findes, vises som pladsholdere i galleriet.
const GALLERI = [
  { fil: "billeder/1.jpg", tekst: "Værkstedet på H. C. Ørsteds Vej" },
  { fil: "billeder/2.jpg", tekst: "Lakboksen" },
  { fil: "billeder/3.jpg", tekst: "Færdiglakeret personbil" },
  { fil: "billeder/4.jpg", tekst: "Lastbil klar til lak" },
  { fil: "billeder/5.jpg", tekst: "Før og efter: skadesreparation" },
  { fil: "billeder/6.jpg", tekst: "Detalje: spejlblank finish" },
];
const HERO_BILLEDE = "billeder/hero.jpg";

function loadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

async function buildGallery() {
  const el = document.getElementById("gallery");
  const results = await Promise.all(GALLERI.map((g) => loadImage(g.fil)));
  results.forEach((img, i) => {
    const fig = document.createElement("figure");
    if (img) {
      img.alt = GALLERI[i].tekst;
      img.loading = "lazy";
      fig.appendChild(img);
      const cap = document.createElement("figcaption");
      cap.textContent = GALLERI[i].tekst;
      fig.appendChild(cap);
      img.addEventListener("click", () => openLightbox(img.src, img.alt));
    } else {
      fig.className = "ph";
      fig.innerHTML = `<div><b>${GALLERI[i].tekst}</b>Billede kommer snart</div>`;
    }
    el.appendChild(fig);
  });
}

function openLightbox(src, alt) {
  let lb = document.querySelector(".lightbox");
  if (!lb) {
    lb = document.createElement("div");
    lb.className = "lightbox";
    lb.innerHTML = "<img alt=''>";
    lb.addEventListener("click", () => lb.classList.remove("open"));
    document.addEventListener("keydown", (e) => e.key === "Escape" && lb.classList.remove("open"));
    document.body.appendChild(lb);
  }
  const img = lb.querySelector("img");
  img.src = src;
  img.alt = alt;
  lb.classList.add("open");
}

async function heroPhoto() {
  const img = await loadImage(HERO_BILLEDE);
  if (!img) return;
  const bg = document.querySelector(".hero__bg");
  bg.style.backgroundImage = `url("${HERO_BILLEDE}")`;
  bg.classList.add("has-photo");
}

function highlightToday() {
  const row = document.querySelector(`#hours tr[data-d="${new Date().getDay()}"]`);
  if (row) row.classList.add("today");
}

document.getElementById("year").textContent = new Date().getFullYear();
highlightToday();
buildGallery();
heroPhoto();
