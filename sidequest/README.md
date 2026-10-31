# 🎲 Sidequest – en tilfældig heldagsplan til weekenden

Åbn `index.html` (eller host mappen statisk, fx GitHub Pages) og få en komplet plan fra 09:00 til aften.

## Sådan virker den
1. **Vælg dag** (i dag / lørdag / søndag), **starttid** (fx 07:00, 14:00 eller "nu"), **type** (mange stop eller én heldagsmission), **budget** (billig eller dyr), **alkohol** (med eller uden, 18+) og **sted** (GPS eller by).
2. Appen henter **vejrudsigten time for time** samt solop- og solnedgang fra [Open-Meteo](https://open-meteo.com) (gratis og uden API-nøgle).
3. Den sammensætter 6 stop (morgen, formiddag, frokost, eftermiddag, aftensmad, aften) ud fra:
   - **årstid og måned** (svampejagt om efteråret, skøjter om vinteren, jordbær i juni/juli …)
   - **særlige dage** (Halloween, julemarked, nytår, fastelavn, sankthans)
   - **vejret ved hvert tidspunkt**: udendørs aktiviteter fravælges ved regn, kulde og storm, og efter solnedgang vælges kun aktiviteter, der fungerer i mørke. Nogle aktiviteter kræver bestemt vejr (stjernekig kræver klar himmel, dragefly kræver vind, kælkning kræver sne)
   - **budget og alkohol-valg**
4. Hvert udendørs stop har en indendørs **Plan B**.
5. **Heldagsmission**: i stedet for separate stop kan I vælge én sammenhængende oplevelse (fx Mystery-rejsen, Øl-pilgrimsfærden, Overlevelsesdagen, Karakter-dagen, Ja-dagen, Luksusdagen, Roadtrip-roulette), hvor appen styrer hele dagen kapitel for kapitel. Starter dagen sent, springes valgfrie kapitler over.

## Brug den i løbet af dagen
- **NU-kortet** viser det aktuelle stop. Stop låses op, når klokken når deres tidspunkt, eller når I har klaret det forrige.
- Hvert stop har en **udfordring**, der først vises, når stoppet låses op (+50 point).
- En **hemmelig mission** for hele dagen låses op ved frokosttid (+200 point).
- **✅ Klaret** giver 100 point, og I kan tilføje en note og et billede.
- **3 jokere** bytter et stop til en ny idé. **☔ Plan B** foreslås automatisk, hvis vejret slår om.
- **🔔 Påmindelser** giver en notifikation, når næste stop låses op.
- Om aftenen får I en **rapport** med point, rang, badges og galleri, som kan deles.

Alt gemmes lokalt i browseren (localStorage). Appen kan installeres som PWA ("Føj til hjemmeskærm").

Aktiviteterne ligger i `data.js` og er nemme at udvide.

## Én-fils-version
`sidequest.html` er hele appen i én fil (CSS og JavaScript indbygget). Den kan åbnes direkte i en browser uden server. Genereres ud fra `index.html`, `style.css`, `data.js` og `app.js`, så husk at bygge den igen efter ændringer.
