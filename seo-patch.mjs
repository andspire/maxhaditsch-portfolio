/**
 * SEO Patch Script — maxhaditsch.com
 * Trägt SEO-Texte für alle Seiten und Projekte in Sanity ein.
 *
 * Verwendung:
 *   1. TOKEN unten eintragen (Sanity → API → Tokens → "Editor"-Token erstellen)
 *   2. node seo-patch.mjs
 */

const PROJECT_ID = 'ph135a5o'
const DATASET    = 'production'
const API_VER    = '2024-01-01'
const TOKEN      = 'skVtCru8uekjbLIajlP0bUYuU239Nk12VtuixEhvIYzrstpxPihUdN9Y7Y16zbLbXCMwG8EK3F8ProKy3ncNSaMDwC30DiuxBJ8aOt0JWWCrDVJ8J9kNQColaW1JGv0aeGEBsCQDPiTrVs92LOZ32xF5knoOBDaRIltGUfjNRExosnRRC1UY'   // ← hier eintragen

const endpoint = `https://${PROJECT_ID}.api.sanity.io/v${API_VER}/data/mutate/${DATASET}`

// ── SEO-Daten ────────────────────────────────────────────────────────────────

const patches = [

  // ── SINGLETON PAGES ───────────────────────────────────────────────────────

  {
    id: 'homePage',
    seo: {
      metaTitle:       'Max Haditsch — Brand Designer & Strategist',
      metaDescription: 'Brand designer and strategist based in Vienna. Max Haditsch creates holistic brand identities — from strategy to visual execution.',
    },
  },
  {
    id: 'aboutPage',
    seo: {
      metaTitle:       'About — Max Haditsch',
      metaDescription: 'Max Haditsch is a brand designer and strategist based in Vienna, with years of experience as a graphic designer and art director.',
    },
  },
  {
    id: 'contactPage',
    seo: {
      metaTitle:       'Contact — Max Haditsch',
      metaDescription: 'Get in touch with Max Haditsch for brand strategy, identity design and creative direction. Based in Vienna, Austria.',
    },
  },

  // ── PROJECTS ─────────────────────────────────────────────────────────────

  {
    id: '400baf1b-5d01-4bd1-88b4-43646205f7e2',   // peaches beauty
    seo: {
      metaTitle:       'peaches beauty — Brand Identity · Max Haditsch',
      metaDescription: 'Brand strategy and visual identity for peaches, a premium beauty salon in Vienna. Logo design, brand guidelines and art direction.',
    },
  },
  {
    id: 'project-visual-identity',   // WURMB
    seo: {
      metaTitle:       'WURMB — Brand Identity · Max Haditsch',
      metaDescription: 'Full brand relaunch for WURMB, a family-owned special machine manufacturer in Austria. Brand strategy, visual identity and logo design.',
    },
  },
  {
    id: '4c25ba08-1f26-422e-bbac-bb323acfcc06',   // Bon Vivant
    seo: {
      metaTitle:       'Bon Vivant — Brand Identity · Max Haditsch',
      metaDescription: 'Brand strategy and visual identity for Bon Vivant, a French wine bar on Neuer Markt, Vienna. Logo design and art direction.',
    },
  },
  {
    id: '2a3560bf-0645-4969-921b-3673504913a0',   // hafner+partner
    seo: {
      metaTitle:       'hafner+partner — Brand Identity · Max Haditsch',
      metaDescription: 'Visual identity and web design for hafner+partner, an independent insurance broker. Logo design, photography and digital presence.',
    },
  },
  {
    id: 'c55c9c39-6c9a-4797-9701-1e4fb82b00d3',   // KALLCO
    seo: {
      metaTitle:       'KALLCO — Web Design · Max Haditsch',
      metaDescription: 'Web redesign for KALLCO, one of Vienna\'s established residential developers. Confidence-building visual language across all page templates.',
    },
  },
  {
    id: '1656915a-70e0-4a9c-8347-c8d1a43e0f6b',   // Deiser's
    seo: {
      metaTitle:       'Deiser\'s — Brand Identity · Max Haditsch',
      metaDescription: 'Brand identity and packaging design for Deiser\'s, an Austrian family bakery founded in 1964. Logo, colour palette and tin label design.',
    },
  },
  {
    id: '1a669df8-c70a-4341-ab96-00806bcf6e7f',   // Holie Living
    seo: {
      metaTitle:       'Holie Living — Photography · Max Haditsch',
      metaDescription: 'Product and lifestyle photography for Holie Living, a natural all-in-one cleaning concentrate. Visual language for website and marketing.',
    },
  },
  {
    id: '9950d206-0b4c-4ce8-b1c0-515770c098ba',   // Plachutta
    seo: {
      metaTitle:       'Plachutta — Web Design · Max Haditsch',
      metaDescription: 'Web design for Plachutta, Vienna\'s iconic Tafelspitz restaurant. Information architecture, visual concept and all page templates.',
    },
  },
  {
    id: 'project-andspire',   // SZIHN Brand Identity
    seo: {
      metaTitle:       'SZIHN Brand Identity · Max Haditsch',
      metaDescription: 'Brand identity for SZIHN, a family-owned craft bakery in Vienna. Strategy, logo design, photography and brand guidelines.',
    },
  },
  {
    id: 'project-wayfinding',   // SZIHN Web
    seo: {
      metaTitle:       'SZIHN Web Design · Max Haditsch',
      metaDescription: 'Web design for SZIHN bakery — a warm, tactile digital presence that reflects the brand\'s craft-driven identity and values.',
    },
  },
  {
    id: 'drafts.a4893d51-2060-45d4-a944-1e6a1cc84e07',   // Lackner Creative (Draft)
    seo: {
      metaTitle:       'Lackner Creative — Web Design · Max Haditsch',
      metaDescription: 'Web design for Lackner Creative. A clean, modern digital presence crafted by Max Haditsch, brand designer and strategist.',
    },
  },
  {
    id: 'drafts.cc817936-1341-41e7-901b-f5bc732bdc61',   // Daniel Plos (Draft)
    seo: {
      metaTitle:       'Daniel Plos — Web Design · Max Haditsch',
      metaDescription: 'Web design for Weingut Daniel Plos. A refined digital presence for an Austrian winery, crafted by Max Haditsch.',
    },
  },
]

// ── Patch ausführen ───────────────────────────────────────────────────────────

const mutations = patches.map(({ id, seo }) => ({
  patch: {
    id,
    set: { seo },
    ifRevisionID: undefined,
  },
}))

console.log(`Patching ${mutations.length} documents…`)

const res = await fetch(endpoint, {
  method:  'POST',
  headers: {
    'Content-Type':  'application/json',
    'Authorization': `Bearer ${TOKEN}`,
  },
  body: JSON.stringify({ mutations }),
})

const json = await res.json()

if (!res.ok) {
  console.error('❌ Fehler:', JSON.stringify(json, null, 2))
  process.exit(1)
}

console.log('✅ Fertig! Ergebnis:')
json.results?.forEach(r => console.log(` • ${r.id}  →  ${r.operation}`))
