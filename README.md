# maxhaditsch.com — Portfolio

Next.js 14 · Tailwind CSS · GSAP · Lenis

## Setup (auf deinem Rechner)

```bash
cd maxhaditsch-portfolio
npm install
npm run dev
# → http://localhost:3000
```

## Sofort testen (ohne npm)

Öffne `prototype.html` direkt im Browser — alle Animationen laufen via CDN.

## Font-Swap: Clash Grotesk

1. In `app/globals.css` oben einfügen:
```css
@import url('https://api.fontshare.com/v2/css?f[]=clash-grotesk@400,500&display=swap');
```
2. In `app/layout.tsx`: `Space_Grotesk` Import entfernen
3. In `tailwind.config.ts`: `--font-sans` bleibt gleich, da als CSS-Variable eingebunden

## Deployment (Vercel)

```bash
npm install -g vercel
vercel
# → Domain: maxhaditsch.com unter Settings → Domains verknüpfen
```

## CMS (Sanity) einrichten

```bash
npm create sanity@latest -- --project-id YOUR_ID --dataset production
```
Dann `next-sanity` und `@sanity/image-url` installieren und in `lib/sanity.ts` konfigurieren.

## Struktur

```
app/
  layout.tsx          → Root Layout: Font, Nav, Loader, Transitions
  page.tsx            → Homepage
  work/page.tsx       → Case Studies Overview
  explore/page.tsx    → Infinite Canvas Experience
  about/page.tsx      → About
  contact/page.tsx    → Contact

components/
  Loader.tsx          → © → © MH → © MAX HADITSCH Animation
  Navigation.tsx      → Fullscreen Overlay Menu
  CommandPalette.tsx  → ⌘K Palette
  Cursor.tsx          → Custom Cursor mit Hover-State
  PageTransition.tsx  → Panel Transition zwischen Seiten
  SmoothScroll.tsx    → Lenis Smooth Scroll Wrapper
```
