/* ─────────────────────────────────────────────────────
   SANITY CLIENT
   Project: maxhaditsch  |  Dataset: production
───────────────────────────────────────────────────── */

const SANITY_PROJECT_ID = 'ph135a5o'
const SANITY_DATASET    = 'production'
const SANITY_API_VER    = '2024-01-01'
const SANITY_CDN        = false  // set false to bypass CDN cache

const BASE_URL = SANITY_CDN
  ? `https://${SANITY_PROJECT_ID}.apicdn.sanity.io/v${SANITY_API_VER}/data/query/${SANITY_DATASET}`
  : `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VER}/data/query/${SANITY_DATASET}`

/* ── QUERY HELPER ───────────────────────────────────── */
async function sanityFetch(query, params = {}) {
  const url = new URL(BASE_URL)
  url.searchParams.set('query', query)
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(`$${k}`, JSON.stringify(v)))

  const res = await fetch(url.toString())
  if (!res.ok) throw new Error(`Sanity fetch failed: ${res.status}`)
  const data = await res.json()
  return data.result
}

/* ── IMAGE URL BUILDER ──────────────────────────────── */
function sanityImageUrl(ref, { width, height, quality = 80 } = {}) {
  if (!ref) return null
  // ref format: "image-[id]-[dimensions]-[format]"
  const [, id, dimensions, format] = ref.split('-')
  let url = `https://cdn.sanity.io/images/${SANITY_PROJECT_ID}/${SANITY_DATASET}/${id}-${dimensions}.${format}`
  const params = []
  if (width)   params.push(`w=${width}`)
  if (height)  params.push(`h=${height}`)
  if (quality) params.push(`q=${quality}`)
  if (params.length) url += '?' + params.join('&')
  return url
}

/* ── FILE URL BUILDER ───────────────────────────────── */
// For non-image assets: videos, Lottie files, etc.
// ref format: "file-[id]-[extension]"
function sanityFileUrl(ref) {
  if (!ref) return null
  const parts = ref.split('-')
  // parts: ['file', id, extension]
  const ext = parts[parts.length - 1]
  const id  = parts.slice(1, -1).join('-')
  return `https://cdn.sanity.io/files/${SANITY_PROJECT_ID}/${SANITY_DATASET}/${id}.${ext}`
}

/* ── ASPECT RATIO HELPER ────────────────────────────── */
// Parses "16:9" → 1.777, or passes through a number
function parseAspectRatio(value) {
  if (!value) return 16 / 9
  if (typeof value === 'number') return value
  const [w, h] = String(value).split(':').map(Number)
  if (!w || !h) return 16 / 9
  return w / h
}

/* ── GROQ FRAGMENTS ─────────────────────────────────── */

// Full slide projection (image/video/lottie)
const SLIDES_PROJECTION = `
  slides[] {
    _type,
    _key,
    // Image slide
    _type == 'slideImage' => {
      image {
        hotspot,
        crop,
        asset-> {
          url,
          metadata { dimensions { width, height, aspectRatio } }
        }
      },
      caption
    },
    // Video slide
    _type == 'slideVideo' => {
      video { asset->{ url, _ref } },
      aspectRatio,
      autoplay,
      loop,
      muted
    },
    // Lottie slide
    _type == 'slideLottie' => {
      lottieFile { asset->{ url, _ref } },
      aspectRatio,
      loop,
      background
    }
  }
`

// Thumbnail projection (image OR lottie)
const THUMBNAIL_PROJECTION = `
  thumbnail {
    hotspot, crop,
    asset->{ url, metadata { dimensions { width, height, aspectRatio } } }
  },
  thumbnailLottie { asset->{ url, _ref } },
  thumbnailLottieAspect,
  thumbnailBg,
  thumbnailVideo { asset->{ url } }
`

/* ── QUERIES ────────────────────────────────────────── */

// Homepage singleton
async function getHomePage() {
  return sanityFetch(`*[_id == "homePage"][0]`)
}

// About page singleton
async function getAboutPage() {
  return sanityFetch(`*[_id == "aboutPage"][0]`)
}

// All projects, sorted by manual order
async function getProjects() {
  return sanityFetch(`*[_type == "project"] | order(order asc) {
    _id, title, slug, brand, agency, tags, year, featured, caseStudyUrl,
    description, description_de,
    "thumbnailRef": thumbnail.asset._ref,
    ${THUMBNAIL_PROJECTION},
    ${SLIDES_PROJECTION}
  }`)
}

// Featured projects only (homepage)
async function getFeaturedProjects() {
  return sanityFetch(`*[_type == "project" && featured == true] | order(order asc) {
    _id, title, slug, brand, agency, tags, year, caseStudyUrl,
    description, description_de,
    "thumbnailRef": thumbnail.asset._ref,
    ${THUMBNAIL_PROJECTION},
    ${SLIDES_PROJECTION}
  }`)
}

// All projects without slides — fast list query for initial page load
async function getProjectsLight() {
  return sanityFetch(`*[_type == "project"] | order(order asc) {
    _id, title, slug, brand, agency, tags, year, featured, caseStudyUrl,
    description, description_de,
    "thumbnailRef": thumbnail.asset._ref,
    ${THUMBNAIL_PROJECTION}
  }`)
}

// Featured projects without slides
async function getFeaturedProjectsLight() {
  return sanityFetch(`*[_type == "project" && featured == true] | order(order asc) {
    _id, title, slug, brand, agency, tags, year, caseStudyUrl,
    description, description_de,
    "thumbnailRef": thumbnail.asset._ref,
    ${THUMBNAIL_PROJECTION}
  }`)
}

// Single project by _id — full data including slides (lazy-loaded on detail open)
async function getProjectById(id) {
  return sanityFetch(`*[_type == "project" && _id == $id][0] {
    _id, title, slug, brand, agency, tags, year, featured, caseStudyUrl,
    description, description_de,
    "thumbnailRef": thumbnail.asset._ref,
    ${THUMBNAIL_PROJECTION},
    ${SLIDES_PROJECTION}
  }`, { id })
}

// Explore items without gallery — fast canvas query
async function getExploreItemsLight() {
  return sanityFetch(`*[_type == "exploreItem" && (showOnCanvas == true || !defined(showOnCanvas))] | order(order asc) {
    _id, title, category, description, year, agency, tags, order,
    "imageRef": image.asset._ref,
    "imageWidth":  image.asset->metadata.dimensions.width,
    "imageHeight": image.asset->metadata.dimensions.height,
    featureLottie { asset->{ url, _ref } },
    featureLottieBg,
    thumbnailLottie { asset->{ url, _ref } },
    thumbnailLottieBg,
    thumbnailVideo { asset->{ url } },
    "linkedProjectId": linkedProject->_id
  }`)
}

// Gallery for a single explore item — lazy-loaded on popup open
async function getExploreItemGallery(id) {
  return sanityFetch(`*[_type == "exploreItem" && _id == $id][0] {
    "gallery": gallery[]{
      "ref":    image.asset._ref,
      "width":  image.asset->metadata.dimensions.width,
      "height": image.asset->metadata.dimensions.height
    }
  }`, { id })
}

// Single project by slug
async function getProject(slug) {
  return sanityFetch(`*[_type == "project" && slug.current == $slug][0] {
    _id, title, slug, brand, agency, tags, year, featured, caseStudyUrl,
    description, description_de,
    "thumbnailRef": thumbnail.asset._ref,
    ${THUMBNAIL_PROJECTION},
    ${SLIDES_PROJECTION}
  }`, { slug })
}

// Contact page singleton
async function getContactPage() {
  return sanityFetch(`*[_id == "contactPage"][0]`)
}

// Imprint singleton
async function getImprintPage() {
  return sanityFetch(`*[_id == "imprintPage"][0]`)
}

// Privacy Policy singleton
async function getPrivacyPage() {
  return sanityFetch(`*[_id == "privacyPage"][0]`)
}

// Explore items (Canvas — explore.html)
async function getExploreItems() {
  return sanityFetch(`*[_type == "exploreItem" && (showOnCanvas == true || !defined(showOnCanvas))] | order(order asc) {
    _id, title, category, description, year, agency, tags, order,
    "imageRef": image.asset._ref,
    "imageWidth":  image.asset->metadata.dimensions.width,
    "imageHeight": image.asset->metadata.dimensions.height,
    featureLottie { asset->{ url, _ref } },
    featureLottieBg,
    thumbnailLottie { asset->{ url, _ref } },
    thumbnailLottieBg,
    thumbnailVideo { asset->{ url } },
    "linkedProjectId": linkedProject->_id,
    "gallery": gallery[]{
      "ref":    image.asset._ref,
      "width":  image.asset->metadata.dimensions.width,
      "height": image.asset->metadata.dimensions.height
    }
  }`)
}

// Teaser items (Homepage-Thumbnails — showOnTeaser flag)
async function getTeaserItems() {
  return sanityFetch(`*[_type == "exploreItem" && showOnTeaser == true] | order(order asc) {
    _id, title,
    "imageRef": image.asset._ref,
    imageAlt
  }`)
}

/* ── TAG TRANSLATIONS ───────────────────────────────── */
// EN values are the canonical keys stored in Sanity.
// Add DE translation here; if missing, EN value is used as fallback.
const TAG_TRANSLATIONS = {
  'Brand Strategy':   { de: 'Markenstrategie' },
  'Identity Design':  { de: 'Identity Design' },
  'Logo Design':      { de: 'Logo Design' },
  'Art Direction':    { de: 'Art Direction' },
  'Typography':       { de: 'Typografie' },
  'Web Design':       { de: 'Web Design' },
  'Photography':      { de: 'Fotografie' },
  'Motion Design':    { de: 'Motion Design' },
  'Brand Guidelines': { de: 'Brand Guidelines' },
  'Wayfinding':       { de: 'Wegeleitung' },
}

// Returns the translated tag label for a given language ('en' | 'de').
// Falls back to the original EN value if no translation exists.
function tagLabel(tag, lang = 'en') {
  if (lang === 'de' && TAG_TRANSLATIONS[tag]?.de) {
    return TAG_TRANSLATIONS[tag].de
  }
  return tag
}

/* ── DOM HELPERS ────────────────────────────────────── */

// Safely set text content of an element
function setText(selector, value) {
  const el = document.querySelector(selector)
  if (el && value) el.textContent = value
}

// Safely set data-en attribute AND text content (for language switching)
function setLangText(selector, value) {
  const el = document.querySelector(selector)
  if (el && value) {
    el.setAttribute('data-en', value)
    const lang = document.documentElement.lang || 'en'
    if (lang !== 'de') el.textContent = value
  }
}

/* ── ARROW UTILITY ──────────────────────────────────── */
// Converts ↗ text in link buttons to a custom SVG arrow span
function applyCustomArrows(root) {
  ;(root || document).querySelectorAll('.work-link, .btn-outline').forEach(el => {
    if (el.innerHTML.includes('↗')) {
      el.innerHTML = el.innerHTML.replace(/↗/g, '<span class="arr"></span>')
    }
  })
}

/* ── DESCRIPTION PARAGRAPH UTILITY ─────────────────── */
// Converts plain text with \n\n paragraph breaks into HTML <p> tags
function toParaHtml(text) {
  if (!text) return ''
  const paras = text.split(/\n{2,}/).filter(Boolean)
  if (paras.length > 1) {
    return paras.map(p => '<p class="desc-para">' + p.replace(/\n/g, '<br>') + '</p>').join('')
  }
  return text.replace(/\n/g, '<br>')
}

/* ── SEO META INJECTOR ──────────────────────────────── */
// Überschreibt <title>, description und OG-Tags wenn Sanity-Daten vorhanden.
// seoObj = { metaTitle, metaDescription, ogImage }  (alle optional)
// pageTitle = Fallback-Titel (z.B. "About — Max Haditsch")
function applySeoMeta(seoObj = {}, pageTitle) {
  const title = seoObj.metaTitle || pageTitle || document.title
  const desc  = seoObj.metaDescription

  if (title) {
    document.title = title
    _setMeta('property', 'og:title', title)
    _setMeta('name', 'twitter:title', title)
  }
  if (desc) {
    _setMeta('name', 'description', desc)
    _setMeta('property', 'og:description', desc)
    _setMeta('name', 'twitter:description', desc)
  }
  if (seoObj.ogImage?.asset?._ref) {
    const imgUrl = sanityImageUrl(seoObj.ogImage.asset._ref, { width: 1200 })
    if (imgUrl) {
      _setMeta('property', 'og:image', imgUrl)
      _setMeta('name', 'twitter:image', imgUrl)
    }
  }

  function _setMeta(attr, val, content) {
    let el = document.querySelector(`meta[${attr}="${val}"]`)
    if (!el) { el = document.createElement('meta'); el.setAttribute(attr, val); document.head.appendChild(el) }
    el.setAttribute('content', content)
  }
}

/* ── CMD PALETTE ENRICHMENT ─────────────────────────── */
async function populateCmdPalette({ onExploreItem } = {}) {
  const list = document.getElementById('cmd-results');
  if (!list) return;
  try {
    const [projects, exploreItems] = await Promise.all([
      sanityFetch(`*[_type == "project"] | order(order asc) { _id, title }`),
      sanityFetch(`*[_type == "exploreItem"] | order(order asc) { _id, title, "linkedProjectId": linkedProject->_id }`)
    ]);
    function makeItem(label, tag, href, onClick) {
      const li = document.createElement('li');
      li.className = 'cmd-result';
      li.dataset.href = href;
      li.innerHTML = `<span class="cmd-result-label">${label}</span><span class="cmd-result-tag">${tag}</span>`;
      li.addEventListener('click', onClick || (() => { window.location.href = href; }));
      return li;
    }
    (projects || []).forEach(p => {
      if (!p.title) return;
      const href = 'work.html#project=' + encodeURIComponent(p._id);
      list.appendChild(makeItem(p.title, 'Project', href));
    });
    (exploreItems || []).forEach(item => {
      if (!item.title) return;
      if (item.linkedProjectId) return; // bereits als Projekt in der Liste
      const href = 'explore.html?item=' + encodeURIComponent(item._id);
      const onClick = onExploreItem ? () => onExploreItem(item._id) : null;
      list.appendChild(makeItem(item.title, 'Explore', href, onClick));
    });
  } catch (e) {
    console.warn('populateCmdPalette failed', e);
  }

  // Hover aktiviert den jeweiligen Eintrag (immer, unabhängig vom Fetch)
  list.addEventListener('mouseover', e => {
    const item = e.target.closest('.cmd-result');
    if (!item || item.style.display === 'none') return;
    document.querySelectorAll('#cmd-results .cmd-result').forEach(r => r.classList.remove('active'));
    item.classList.add('active');
  });
}

/* ── EXPORTS ────────────────────────────────────────── */
window.Sanity = {
  getHomePage,
  getAboutPage,
  getContactPage,
  getImprintPage,
  getPrivacyPage,
  populateCmdPalette,
  getProjects,
  getProjectsLight,
  getFeaturedProjects,
  getFeaturedProjectsLight,
  getProjectById,
  getProject,
  getExploreItems,
  getExploreItemsLight,
  getExploreItemGallery,
  getTeaserItems,
  imageUrl:         sanityImageUrl,
  fileUrl:          sanityFileUrl,
  parseAspectRatio,
  tagLabel,
  TAG_TRANSLATIONS,
  setText,
  setLangText,
  applyCustomArrows,
  toParaHtml,
  applySeoMeta,
}
