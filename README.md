# Odyssey of the Dragonlords — DM Tracker

Twee repo's:

- **`odl-tracker`** (publiek) — `index.html`, `sw.js`, `manifest.json`, de drie iconen. Bevat geen campagnedata.
- **`odl-data`** (privé) — `campaign.json`.

## Opzetten

1. Upload de bestanden uit deze map behalve `campaign.json` naar `odl-tracker`.
2. Upload `campaign.json` naar `odl-data`.
3. In `odl-tracker`: Settings → Pages → Deploy from a branch → `main` / root.
4. Maak een fine-grained token: alleen `odl-data`, Contents = Read and write.
5. Open de Pages-URL, klik **Verbinding**, vul eigenaar / repo / token in.
6. Chrome-menu → Toevoegen aan startscherm.

## Hoe het opslaat

Elke wijziging gaat direct naar localStorage. Acht seconden na je laatste klik wordt
`campaign.json` naar GitHub geschreven als één commit. Ook bij het wegklikken van het
tabblad en bij het terugkeren van de verbinding.

Offline blijft alles werken; het bolletje bovenaan zegt dan "Wacht op verbinding".

## Meerdere toestellen

Elk toestel verbindt zich één keer via **Verbinding** (liefst met een eigen token, zodat je
er één kan intrekken zonder de rest plat te leggen). Daarna haalt de app de nieuwste versie
op bij het openen én telkens het venster terugkeert naar de voorgrond. **↻ Ophalen** doet
het handmatig.

Twee toestellen tegelijk bewerken kan, maar is geen live sync: wie als tweede opslaat
krijgt de conflictkeuze in plaats van een stille overschrijving.

## Terugzetten

**Geschiedenis** toont de laatste 25 versies. Terugzetten vraagt om een tweede tik en
maakt een nieuwe versie bovenop — er verdwijnt niets.
