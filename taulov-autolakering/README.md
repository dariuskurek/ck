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
| `billeder/hero.jpg` | Polaroid-billedet i toppen (valgfri, ellers vises en pladsholder) |
| `billeder/1.jpg` – `billeder/6.jpg` | Galleriet (billedtekster rettes øverst i `<script>` i `index.html`) |

Billeder, der ikke findes, vises som pladsholdere. Hent fx billederne fra virksomhedens egen Google-virksomhedsprofil, men brug kun billeder, som virksomheden selv har taget eller har tilladelse til. Billeder fra anmeldelser tilhører den, der har taget dem.

## Kilder til oplysningerne
- Adresse, telefon, CVR, startdato (25.03.1993), ejere og antal ansatte: [proff.dk](https://www.proff.dk/firma/taulov-autolakering-is-ved-jan-lykke-hansen-tommy-rauff-benzon/fredericia/bilv%C3%A6rksteder/GK2JX9I0064), [erhvervplus.dk](https://erhvervplus.dk/erhvervsbasen/taulov-autolakering-i-s-ved-jan-lykke-hansen-tommy-rauff-benzon-279746)
- E-mail, åbningstider og "lakerer både biler og lastbiler": virksomhedsoversigter (Krak/Cylex), bør bekræftes med værkstedet
- Branche: 95.31.20 Reparation og lakering af karosseri samt undervognsbehandling
