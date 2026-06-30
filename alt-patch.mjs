/**
 * Alt-Text Patch Script — maxhaditsch.com
 * Trägt Alternativtexte für alle Projekt-Thumbnails und Slideshow-Bilder ein.
 *
 * Verwendung:
 *   node alt-patch.mjs
 *
 * Strategie:
 *   1. Für jedes Projekt: thumbnailAlt direkt setzen
 *   2. Slides per GROQ laden (→ _key + asset._ref), dann alt setzen
 */

const PROJECT_ID = 'ph135a5o'
const DATASET    = 'production'
const API_VER    = '2024-01-01'
const TOKEN      = 'skVtCru8uekjbLIajlP0bUYuU239Nk12VtuixEhvIYzrstpxPihUdN9Y7Y16zbLbXCMwG8EK3F8ProKy3ncNSaMDwC30DiuxBJ8aOt0JWWCrDVJ8J9kNQColaW1JGv0aeGEBsCQDPiTrVs92LOZ32xF5knoOBDaRIltGUfjNRExosnRRC1UY'

const BASE = `https://${PROJECT_ID}.api.sanity.io/v${API_VER}/data`

// ── Alt-Texte nach Asset-Hash (ohne Extension) ───────────────────────────────
// Hash extrahiert aus dem CDN-Dateinamen, z.B.
//   b58aa09ba4b03f131493a9b0018b14c846a72c6d-2400x1600.jpg
//   → key: "b58aa09ba4b03f131493a9b0018b14c846a72c6d"

const ALT_BY_HASH = {

  // ── peaches beauty ─────────────────────────────────────────────────────────
  'b58aa09ba4b03f131493a9b0018b14c846a72c6d':
    'Peaches beauty salon sign on a Viennese Gründerzeit building facade, photographed from below',
  'e8fa4ee0d26c439177f773fbe04c07ca771480d4':
    'White paper shopping bag with Peaches logo mockup on a neutral background',
  '78f8312ebaeceb652e62fc4a1ed032bf98d7b91d':
    'Dark laptop mockup on concrete surface with Peaches website and a hand touching the screen',
  'b1aef24867bd6168442c53ebec53103f086dc5bc':
    'White gift box with Peaches branding on a light marble surface',
  '1da08746045ba7449dcd1cd20247539a9b127703':
    'iPhone mockup on a marble surface showing the Peaches website',
  '4f0a7bf2f30aacb8ef8c2fc96a7885f5991af43d':
    'Cream card mockup with Peaches logo, angled on a grey surface',
  'b4418c3df157b0b86dc198244b3ea81db7b989ff':
    'Peaches outdoor advertising mockup on a construction hoarding with nail close-ups and pink accents, person cycling past',
  '7770c83a67972f6b029453ddede8b97cdc7cdd58':
    'Peaches outdoor advertising on a construction site hoarding with nail photography, person walking past',
  'd8621ee91c96d29777f9edb478d19a90d67cafbc':
    'Peaches brand identity overview showing wordmark, peach icon logo, colour palette and beauty imagery',

  // ── WURMB ──────────────────────────────────────────────────────────────────
  '09b18b32be7168df43a5fc4c50e875aec29e48b7':
    'Modern office lobby with large illuminated WURMB signage on a glass wall',
  '277d7e61fd238df65efa543d6281788f53b079ed':
    'WURMB branded stationery set including a padded envelope and spiral notebook on a white background',
  '912e7515a474ac3c07fad80ab0ebbf9902a656d8':
    'Open spiral notebook with WURMB star logo on the cover, lying on a white surface',
  '7ca42ab2174f9c4cdb56bb6b51854c966b59ff7b':
    'Three WURMB branded notebooks in navy blue, orange and white, displayed side by side',
  'b0e6666cac57ae50dd0fae08e2c38d166c1163a7':
    'WURMB branded silver spray bottle on a dark studio background',
  'c5d020c5b79ad9f58a941f6fc75f27d47048310c':
    'Orange WURMB branded packaging box with white star logo on a light background',
  'e04e2603b5323a6d86c6f347e7fd8a89633c6ab3':
    'Two dark WURMB branded bottles with orange labels on a white surface',
  '24687ef50fe30ef285bebaf232edb34387cd594e':
    'White car photographed from above with WURMB logo on the roof',
  '725554c87d13646b03ac98c2d48514423aa49211':
    'White car photographed from the side with WURMB logo on the door',
  '0905cf0ac116f48fd968c315792925a771216885':
    'White workwear jacket with WURMB star logo and brand name embroidery on the chest',
  'b428e5c4de808a9a8cc638d95ce70d8508e36fc0':
    'Two WURMB branded metal keychains with star logo on a white background',
  '3b0ae7b2f41fd9c28da6f41dfcc9eda2b4fd8bbe':
    'WURMB branded brochure and stationery in orange and white on a light surface',
  '888e07ec372ac02533793ef486ef710b344792ea':
    'Smartphone on a dark industrial surface displaying a WURMB branded photo of a worker',
  '032897043554a27eefe47fa7a1f65eb452e729a6':
    'Industrial shipping crates with large WURMB star logo and lettering',
  '2073824bf1e149f8ae40212fd07577900cc5ad1a':
    'WURMB branded bags including an orange roll-top backpack and a navy rucksack',
  '57b062011de7e8604164785b2cfe96e460b599be':
    'WURMB brand identity overview with logo, star mark, orange and navy colour palette, and product applications',

  // ── Bon Vivant ─────────────────────────────────────────────────────────────
  'd7763034bf6caf92c3d85cf3b9f40ba7bec1bdaa':
    'Bon Vivant logotype in script lettering on a dark background',
  'c3b5c6435f6b4b2d79d0da9f8e2197cba8715e90':
    'Bon Vivant wine bar storefront illuminated at dusk in Vienna',
  '32f2890880e3ebbf054b4c63583c7a13d6a7d3dd':
    'Bon Vivant logo coaster on a dark marble table',
  '00b89661c79c9e852c7e5ef1dd5d09649d95797a':
    'Open Bon Vivant wine and food menu on a dark wooden table',
  '623a1c9cc51524c373e86deb70d0089c05f98b6a':
    'Dark red cocktail in a glass next to Bon Vivant branded coasters on a wooden table',
  '1c150028e6b49ee37e1d7a79cedbbe1bbd4640f9':
    'Fan of dark business cards with Bon Vivant script logo',
  'f1d609f6aa5811a6a081498c16db49df0c84fc31':
    'Table setting with folded napkins and cutlery at Bon Vivant',
  '9817303de00bcff0704ec67ee072234c97ef5af2':
    'Bowl of french fries on a rustic wooden table at Bon Vivant',
  '3b40bfbdcd31f0c22fd14f2e1af9f89bb86bd6d1':
    'Exterior view of the Bon Vivant wine bar with storefront signage in Vienna',
  'e78fbe03985b95771dbd47de72c351a25fb7d39b':
    'Close-up of a red wine glass with a Bon Vivant branded coaster',
  '3e5256fde85e8c00cb8c614377bcacc7424f907b':
    'Two women raising wine glasses at a table inside Bon Vivant',
  '9b323a3e69f248e0900edfc3ab249d06398e5335':
    'Bon Vivant stationery set with letterhead, business card and envelope',
  'cf9a0924b9122b18a5c4d99034db481691aae0db':
    'Dark brown leather menu cover on a wooden surface',

  // ── hafner+partner ─────────────────────────────────────────────────────────
  'e88b1d9a47b7efff410ca7cb415fb15733b537fe':
    'hafner+partner outdoor billboard advertisement — "Ihr kompetenter Verkäufer in Versicherungsfragen"',
  '2c570fc4d8b2324573f526ac6a208ea537ef9ff6':
    'Man standing in front of a large hafner+partner outdoor advertising poster',
  '23ec47c4981501692e043db9a3a1e7b661bb3f50':
    'Two navy blue hafner+partner branded folders with coral cross logo',
  '99c585f14aedd36029190d25c05704598a307aa4':
    'Laptop mockup showing the hafner+partner website with landscape photography',
  'fcb749ca08e0c2fec88ac0a8c24f9ff0a83fe3b7':
    'Stack of white hafner+partner business cards with coral plus logo',
  'bf5292967aec06b34bb236c9501805d1d2ba8bb9':
    'hafner+partner brand identity overview with logo, portrait, colour palette and billboard application',

  // ── KALLCO ─────────────────────────────────────────────────────────────────
  '0879b45c9a63a1454e7c2b82a731b74eb1369ba1':
    'Laptop mockup showing the KALLCO website',
  'cae971f4267ae8930a71c3f541689804b3416657':
    'KALLCO website homepage — "Wir bauen Wien von morgen" with a grid of residential building photos',
  'b29a801ad474fe42bc2fa08636d84bfda393f623':
    'KALLCO website page — "Wir schaffen Wohnen unter Einbindung gewerblicher und sozialer Infrastruktur" with building photography',
  '339f17e649360ac0746c9814b0273fdff8a93532':
    'KALLCO website statement page — "Wir denken in Jahrzehnten, nicht in Quartalen" on a dark navy background',
  'f8f127926641ed484ffa102c204063c160c35471':
    'KALLCO website company history page — "Seit 1987 setzt KALLCO Maßstäbe im Bereich der großvolumigen Immobilienprojekte"',
  'a49df79f0322aec7ad09d82d2c556f06e9dd9c42':
    'KALLCO website sustainability page — "Umweltfreundliche Lösungen und Innovationen" with aerial building photography',
  '56fe173663652c9aec35718c47eca0c5b0997a3d':
    'KALLCO website brand page with large bold "Kallco" wordmark on a dark navy background',
  '856e11d1484c7e330e0449693326962b9d8cd47c':
    'KALLCO website project detail page "Rosa-Jochmann-Ring" with residential building photography',
  '01c3e3c3ef329b92ffead1d59796f8c750447f8f':
    'KALLCO website architecture page — "Energiesparen durch intelligente Bauweise" with building photography',

  // ── Deiser's ───────────────────────────────────────────────────────────────
  '2beba8e268adc4a02ebc79fa35925e13f79754a1':
    'Deiser\'s brand identity card on a flour-dusted surface — dark green background with logo',
  'd725f5765923de69dfba6293cdf9a6a6b38f7192':
    'White Deiser\'s merchandise t-shirt with "100% natürliche Zutaten" lettering',
  '0f2bfa270b5270b8e0d15134cce0f2b7a0701f53':
    'Deiser\'s branded collateral set including booklet, smartphone packaging and product items',
  '8d2f0bfc56fc1223bf0815486c4a1d6fb790e146':
    'Sheet of round Deiser\'s product labels with green botanical designs',
  '0bf17813e70c0e36e0586de47f0773057891c22b':
    'Deiser\'s packaged bread product in a cylindrical tube on a white background',
  '20a67bea3c7678bc595995862c985f6ab32df8d7':
    'Several round rye bread crackers seen from above on a white surface',
  '202c4e4cc78dd62ef74c5610193887c0cc60c5e9':
    'Rows of circular tin cans stacked in a Deiser\'s bakery, viewed from above',
  'c353cbce8fba83bfab3c3ee512a6fe50fdc52a9a':
    'Stainless steel industrial oven doors in a Deiser\'s bakery',
  '58b77bf9fd5fc8c7b98aac0322088c6d004d7144':
    'Baker at work at a Deiser\'s bakery preparation table',
  '5ce8494cfc069f825351bac2b3e383ec645f34d9':
    'Fresh pastries and baked goods in dark baking trays',

  // ── Holie Living ───────────────────────────────────────────────────────────
  '70ba3a7c4b2dbdcaeca8b838a064a2a34ec2c119':
    'Holie Living amber glass spray bottle with "Holie Clear" label on a light surface',
  '0a7f31fa57d0ffc6b34c05654eaeb760a73b93e3':
    'Close-up of natural linen fabric with a small Holie Living product tag',
  'e5838864cfbd31e55f3738445a1ebd2a29cb177e':
    'Three Holie Living amber glass spray bottles with printed labels next to a folded linen cloth',
  'fab618d8ae9eb70d99a5acad6d6ae7082e0c11bc':
    'Person holding a large Holie Living glass spray bottle',
  '397b2c655ce4f10c0b2f288cb8e9c609a2b3989c':
    'Hand spraying a Holie Living cleaning product onto a surface',
  'aa4959bfacce77bd9469c0552c7ecfc40059aa0a':
    'Holie Living product card with "Du bist uns Holie" text on a natural linen background',
  'a6e89b664c987fca79d2ee427b77b5faf2daa050':
    'Close-up of a bundle of natural bristle brushes as eco cleaning props',
  'fdfc50656c81dcd2b51f8270b8162c9e027c9217':
    'Holie Living amber glass bottle label close-up showing "Holie Clear" product branding',
  '6b6e399ccce8eb3b8dc415ea3be95de6b7f66dab':
    'Two Holie Living amber glass spray bottles on a light surface',
  'c2a2b8938efa974b6d93cba0469eb85b2ce7c20d':
    'Hand holding a silver Holie Living spray bottle in use',

  // ── Plachutta ──────────────────────────────────────────────────────────────
  '1fdd1d67cf8fb42bfef9b755182d21af83f4d79a':
    'Laptop mockup showing the Plachutta website with dark green design',
  '20bb029100662451af8bf2185e0156b700c4eff1':
    'Plachutta website splash page with large wordmark on a dark green botanical background',
  '937793f0e5cea0e794fd3f10ef521cbd80853fe4':
    'Plachutta website page — "Die berühmteste Suppe der Welt" with food photography and editorial text',
  '45238e64ec795c196ac9639f905697be574947c9':
    'Plachutta website restaurants overview — "Plachutta Restaurants, jedes eine Institution für sich" with exterior photography',
  '4bea23adfe2f92517b410e81bb758bcf1c53843b':
    'Plachutta website homepage with large green header and a grid of food and interior photography',
  '1f4332d3b174c8f7f9f1be772ba88d22aa786fbd':
    'Plachutta website page — "Plachutta\'s Wien" dark green section with illustrated map of Vienna',
  '6e1ec4e8689871893bf4109ceddd9e1884e6f9e6':
    'Plachutta website page — "Die Ursprung des Wiener Guts" with chef portrait photography',
  '2f687297038859c630fc17207bed623b69a75999':
    'Plachutta website cookbook page — "Plachutta Rezepte" with three cookbook cover images',
  'aaa654e2bbd82ca72b48137dd11da4b5cbdeaecc':
    'Plachutta website page — "Wo der Tafelspitz zuhause ist" with editorial text content',
  '0d61bee9f3e1f02ca448d906ac3dc2036f3c527e':
    'Plachutta website content page with dark green header and illustrated food motifs on white cards',
  'a31b0893355fda999bedb45298ca61fc988802b3':
    'Plachutta website page — "So nimmt\'s gegessen" with ornamental food illustrations',
  '52b0c01856e09805003739dbdda2ff942021ba16':
    'Plachutta website cookbook shop page — "Plachutta Rezepte für zuhause" with cookbook display',
  '39d29b44c3ba1faed1dd6744ce86929990fada22':
    'Plachutta website location page — "Nahe dem kaiserlichen Schloss Schönbrunn" for the Schönbrunn branch',

  // ── SZIHN Brand Identity ───────────────────────────────────────────────────
  '4e3973fbb409443d5e57defb6edf1bf64b4211ef':
    'Baking tray filled with freshly baked mini pastries at SZIHN bakery',
  'e2f9c5fadaa8e2554672ea2c634f60fcffcd9835':
    'White SZIHN paper bakery bag with "Handwerklich Bäcke Szihn" branding',
  '1649021e053a2dfccb3b50f040e0982839382210':
    'Artisan sesame pretzel on a wooden board, SZIHN bakery',
  '71557be7fd6121c74ad60c1daba63d8e95c1b7c8':
    'Selection of SZIHN breads and pastries displayed on a dark wooden surface',
  'b3c3aea9322a2a72e79a5ed93ddc00063a061e57':
    'Hands breaking a fresh seeded sourdough loaf from SZIHN bakery',
  'c1e86dafe41af2929ee8f6718b03037db7f78b8f':
    'Woman smiling with a coffee cup in the warm interior of a SZIHN bakery',
  '7225531f1b518609cb51ffd3f24a320e8e598ecb':
    'Sliced sourdough bread with olive garnish on a wooden board',
  'c75f05f141a335a84e011716f1b6f58b28cff685':
    'SZIHN branded pizza dough packaging box in orange — "Zweimal Pizzaboden"',
  '146be7d8eb63fbd532db70c5d1530ad074f39ccc':
    'Stack of SZIHN branded orange packaging boxes showing brand identity',
  'a54212c8cefc2e26a578d7995fe9666bfcad86c5':
    'SZIHN brand identity overview with logo, typography and colour palette on a white background',
  '4b4131681823a87f28be4cb9005d32da46cde801':
    'SZIHN brand identity overview with logo mark, orange packaging and product mockups',

  // ── SZIHN Web ──────────────────────────────────────────────────────────────
  'ad00c481e7e44c8c4feebc6bca618ad5ed9b4e33':
    'Laptop mockup showing the SZIHN bakery website',
  '4f18ec06b7aa1857adffd14a0907ae965b5c390a':
    'SZIHN website hero section — "Wir geben unserem Brot die Zeit, die es zum Reifen braucht" with sourdough bread photography',
  '4de0f894cdef6766f0bb8eca60863e3d3622317f':
    'SZIHN website pre-order page — "Einfach vorbestellen & frisch abholen" with feature icons',
  'd65b105305673635c2a5461919c0c9817cc11ba3':
    'SZIHN website page — "Backen ist Familiensache" with bakery interior and display photography',
  '5e2992f9bfb22fd996e206e7e1c2ffcc8141fa4c':
    'SZIHN website outdoor section — "Bei uns dürfen sie von Früh- bis Spätstücken" with courtyard photography',
  'ad3065dc3b4cb0a03cd77daa66b05556e611dd61':
    'SZIHN website product page — "Natürlich. Echt. Unser Brot." with close-up bread photography',
  'eac31f5fce3c269b036f5b96e53544327bd06d96':
    'SZIHN website product detail page — "93er – Ein echter Liebling" with ingredients and nutrition information',
}

// ── Thumbnail-Alt per Dokument-ID ────────────────────────────────────────────
// (identisch mit dem jeweiligen Slide-Alt für dieselbe Bild-Hash)
const THUMB_ALT_BY_DOC = {
  '400baf1b-5d01-4bd1-88b4-43646205f7e2':   // peaches beauty
    'Peaches beauty salon sign on a Viennese Gründerzeit building facade, photographed from below',
  'project-visual-identity':                  // WURMB
    'Modern office lobby with large illuminated WURMB signage on a glass wall',
  '4c25ba08-1f26-422e-bbac-bb323acfcc06':    // Bon Vivant
    'Bon Vivant logotype in script lettering on a dark background',
  '2a3560bf-0645-4969-921b-3673504913a0':    // hafner+partner
    'hafner+partner brand identity overview with logo, portrait, colour palette and billboard application',
  'c55c9c39-6c9a-4797-9701-1e4fb82b00d3':    // KALLCO
    'Laptop mockup showing the KALLCO website',
  '1656915a-70e0-4a9c-8347-c8d1a43e0f6b':    // Deiser's
    'White Deiser\'s merchandise t-shirt with "100% natürliche Zutaten" lettering',
  '1a669df8-c70a-4341-ab96-00806bcf6e7f':    // Holie Living
    'Holie Living amber glass spray bottle with "Holie Clear" label on a light surface',
  '9950d206-0b4c-4ce8-b1c0-515770c098ba':    // Plachutta
    'Laptop mockup showing the Plachutta website with dark green design',
  'project-andspire':                         // SZIHN Brand Identity
    'SZIHN brand identity overview with logo mark, orange packaging and product mockups',
  'project-wayfinding':                       // SZIHN Web
    'Laptop mockup showing the SZIHN bakery website',
}

// ── Hilfsfunktionen ──────────────────────────────────────────────────────────

function hashFromRef(ref) {
  // ref z.B. "image-b58aa09ba4b03f131493a9b0018b14c846a72c6d-2400x1600-jpg"
  const m = ref?.match(/^image-([a-f0-9]+)-/)
  return m ? m[1] : null
}

async function fetchSlides(docId) {
  const query = encodeURIComponent(
    `*[_id == "${docId}"]{slides[_type=="slideImage"]{_key,"ref":image.asset._ref}}[0]`
  )
  const res = await fetch(`${BASE}/query/${DATASET}?query=${query}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  })
  const json = await res.json()
  return json.result?.slides ?? []
}

async function applyMutations(mutations) {
  const res = await fetch(`${BASE}/mutate/${DATASET}`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${TOKEN}` },
    body:    JSON.stringify({ mutations }),
  })
  return res.json()
}

// ── Hauptlogik ───────────────────────────────────────────────────────────────

const DOC_IDS = Object.keys(THUMB_ALT_BY_DOC)

let totalPatched = 0
let totalSkipped = 0

for (const docId of DOC_IDS) {
  console.log(`\n── ${docId} ──`)

  const mutations = []

  // 1. Thumbnail-Alt
  const thumbAlt = THUMB_ALT_BY_DOC[docId]
  mutations.push({ patch: { id: docId, set: { thumbnailAlt: thumbAlt } } })
  console.log(`  thumbnailAlt ✓`)

  // 2. Slide-Alts
  const slides = await fetchSlides(docId)
  console.log(`  ${slides.length} Slides geladen`)

  for (const slide of slides) {
    const hash = hashFromRef(slide.ref)
    const alt  = hash ? ALT_BY_HASH[hash] : undefined

    if (!alt) {
      console.log(`  ⚠ kein Alt für hash ${hash ?? '(kein ref)'}`)
      totalSkipped++
      continue
    }

    mutations.push({
      patch: {
        id:  docId,
        set: { [`slides[_key=="${slide._key}"].alt`]: alt },
      },
    })
    console.log(`  slide ${slide._key.slice(0,8)}… → "${alt.slice(0,55)}…"`)
    totalPatched++
  }

  // 3. Senden
  const result = await applyMutations(mutations)
  if (result.error) {
    console.error('  ❌ Fehler:', JSON.stringify(result.error))
  } else {
    const ops = result.results?.map(r => r.operation).join(', ') ?? '–'
    console.log(`  ✅ ${mutations.length} Mutations → ${ops}`)
  }
}

console.log(`\n═══════════════════════════════`)
console.log(`✅ Fertig. ${totalPatched} Slides gepatcht, ${totalSkipped} ohne Match übersprungen.`)
