# Taulov Autolakering – hjemmeside

En statisk one-page-hjemmeside for **Taulov Autolakering I/S**, H. C. Ørsteds Vej 8, 7000 Fredericia (CVR 16843482).

Alt ligger i én fil: `index.html`. Åbn den i en browser, eller host mappen statisk (fx GitHub Pages).

## Tilbudsportal
Knappen **Gratis tilbud** (eller `index.html#tilbud`) åbner en formular i 3 trin: privat/firma, bil og skade (med billeder) og kontakt.
Når kunden trykker *Send*, åbnes deres mailprogram med en færdig mail til taulovautolak@mail.dk. Billeder skal kunden selv vedhæfte, fordi en mail-link ikke kan sende filer.
Hvis henvendelserne skal sendes automatisk med billeder, kræver det en formular-tjeneste (fx Formspree eller Netlify Forms).
Det, kunden har udfyldt, gemmes som kladde i browseren, indtil forespørgslen er sendt.

## Billeder
Siden henter billeder fra mappen `billeder/`:

| Fil | Bruges til |
|---|---|
| `billeder/hero.jpg` | Stort billede i toppen (valgfri, ellers vises en mørk pladsholder) |
| `billeder/foer.jpg` + `billeder/efter.jpg` | Før/efter-slideren (valgfri, begge skal findes) |
| `billeder/1.jpg` – `billeder/5.jpg` | Galleriet (billedtekster rettes øverst i `<script>` i `index.html`) |

Billeder, der ikke findes, vises som pladsholdere. Hent fx billederne fra virksomhedens egen Google-virksomhedsprofil, men brug kun billeder, som virksomheden selv har taget eller har tilladelse til. Billeder fra anmeldelser tilhører den, der har taget dem.

## Oplysninger
- Åbningstider (man–tors 06–15, fre 05–10:30) og ydelser (biler, varevogne, løsdele, industriemner, forsikringsskader, private skader, salgsbiler) er oplyst af værkstedet.
- Adresse, telefon, CVR og startår 1993: [proff.dk](https://www.proff.dk/firma/taulov-autolakering-is-ved-jan-lykke-hansen-tommy-rauff-benzon/fredericia/bilv%C3%A6rksteder/GK2JX9I0064), [erhvervplus.dk](https://erhvervplus.dk/erhvervsbasen/taulov-autolakering-i-s-ved-jan-lykke-hansen-tommy-rauff-benzon-279746). E-mail fra Krak/Cylex.
- Åbningstider rettes i tabellen under Kontakt og i `HOURS` i `<script>` (bruges til "Åbent nu").
