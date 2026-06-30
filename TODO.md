# Portfolio Website — To-Do-Liste
Stand: 2026-04-08

---

## ✅ Erledigt (Code-Änderungen)

### Sanity Schema
- [x] `exploreItem`: Neues Feld `linkedProject` (Reference zu `project`) — bei Klick öffnet Projekt-Popup statt eigenem Overlay

### Globales CSS (`app/globals.css`)
- [x] **Keine Konturen um Bilder** — `img { border: none; outline: none }` global
- [x] **Typografie-Hierarchie** — einheitliche Klassen für `h1`, `h2`, `h3`, `.copy`, `.tag`, `.btn`, `.nav-item`, `.label`
- [x] **Schriftgewicht** — Mindestgewicht auf 700 (Bold) erhöht für Headlines, Nav, Tags, Buttons

### About-Seite (`app/about/page.tsx`)
- [x] `paddingTop` von 8rem → 5.5rem (mehr Inhalt above fold sichtbar)
- [x] Text in 2 Absätze aufgeteilt (vor und nach Foto)
- [x] Foto-Slot eingebaut (Placeholder, wird via Sanity befüllt)
- [x] Abstand Foto → zweiter Absatz reduziert (1.25rem statt vorher kein Foto)
- [x] **Eingangsanimation** wie H1 auf Startseite: Label fade-up, Headline wortweise (identisch zu Homepage H1), erster Absatz wie hero-sub

### Explore-Seite (`app/explore/page.tsx`)
- [x] **Tags-Filter** mit Multi-Select-Logik:
  - ALL → alle anderen Tags deaktiviert
  - Tag aktivieren → ALL deaktiviert sich automatisch
  - Tag erneut klicken → deaktivieren
- [x] **Border-Farbe Tags Darkmode** — nutzt `.tag`-CSS-Klasse mit `var(--color-muted)` im aktiven Zustand (selbe Farbe wie Tag-Schrift)
- [x] **Keine Platzhalter** — `CMS_ITEMS = []`, leerer Canvas zeigt Hinweis-Text
- [x] **Automatische Platzierung** neuer CMS-Items — deterministischer Layout-Algorithmus (COLS × ROWS Grid + Jitter). Jedes neue Sanity-Item wird automatisch positioniert
- [x] **Größen-Randomizing** — ±28 % Variation per Item, seeded (deterministisch)
- [x] **Eingangsanimation** — Elemente erscheinen von links nach rechts (sortiert nach x-Position), staggered
- [x] **Parallax** auf Vorschaubildern wie Projektvorschau Startseite
- [x] **Hover-Effekt** — Parallax-Frame vergrößert sich (+20px), nicht das Element selbst → mehr Bild sichtbar, kein Border
- [x] Kein Border um Kacheln

### Suchfunktion (`components/Search.tsx`)
- [x] Volltextsuche: Titel, Subtitle, Tags (Projekte + Explore-Elemente)
- [x] Relevanz-Scoring (exakter Treffer > Prefix > Contains > Tag)
- [x] Keyboard-Navigation (↑↓ navigieren, ↵ öffnen, Esc schließen)
- [x] Öffnen via ⌘⇧K / Ctrl⇧K (Shift unterscheidet von CommandPalette ⌘K)
- [x] Typ-Badge (Projekt / Explore) in Ergebnissen

---

## 🔧 Frontend-Anpassungen (noch offen — brauchen Browser/Design-Review)

- [ ] **Einheitliche Schriftformate alle Unterseiten** — h1, h2, h3, Copy, Tags, Buttons in `globals.css` definiert; einzelne Seiten müssen noch auf `.h1`, `.h2`, `.copy`, `.tag`, `.btn` CSS-Klassen umgestellt werden
- [ ] **Start-Animation Text** auf Startseite (Loader-Text) auf `font-weight: 700` prüfen — in `Loader.tsx`
- [ ] **About-Seite** — echtes Foto via Sanity `aboutPage`-Singleton befüllen

---

## 📝 Inhalt anlegen (Sanity Studio — brauche ich von dir)

### Projekte (`/project`)
Für jedes Projekt: Titel, Slug, Client/Brand, Agency, Jahr, Tags, Thumbnail-Bild, Slides/Gallery, Description

- [ ] **Wurmb** — Brand Identity
- [ ] **Szihn Website** — Web Design
- [ ] **Szihn Identity** — Identity Design
- [ ] **peaches beauty** — Brand Identity
- [ ] **bon vivant** — Brand/Identity
- [ ] **hafner+partner** — Brand Identity
- [ ] **Plachutta Webdesign** — Web Design
- [ ] **Kallco Webdesign** — Web Design
- [ ] **Holie Living** — Brand Identity
- [ ] **Deiser's** — Brand Identity
- [ ] **PLOS Webdesign** — Web Design

### Explore-Elemente (`/exploreItem`)
Für jedes Element: Titel, Cover Image, Category, Tags, Optional: linkedProject

- [ ] **Saigon Logo** — Bild(er) notwendig; Tags, Category, ggf. Projekt-Verknüpfung
- [ ] **folk.art Logo** — Bild(er) notwendig; Tags, Category, ggf. Projekt-Verknüpfung

---

## 💡 Offen / Future

- [ ] **Suchfunktion einbinden** — `<Search />` in `app/layout.tsx` importieren + Sanity-Daten als `externalItems` übergeben
- [ ] **Sanity-Anbindung Explore** — `getExploreItems()` in `explore/page.tsx` aufrufen und `CMS_ITEMS` ersetzen
- [ ] **Sanity-Anbindung Projekte** — `getProjects()` in `work/page.tsx` aufrufen
- [ ] **About-Foto** via `aboutPage`-Singleton in Sanity befüllen
- [ ] `linkedProject`-Feld in Sanity Studio testen und deployen

---

*Automatisch generiert. Zuletzt aktualisiert: 2026-04-08*
