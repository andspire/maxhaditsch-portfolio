import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'ph135a5o',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

const services = [
  {
    _key: 'brand-strategy',
    name: 'Brand Strategy',
    name_de: 'Markenstrategie',
    items: [
      { _key: 'bs-1', label: 'brand identity',           label_de: 'Markenidentität' },
      { _key: 'bs-2', label: 'brand positioning',        label_de: 'Markenpositionierung' },
      { _key: 'bs-3', label: 'brand audience',           label_de: 'Zielgruppenanalyse' },
      { _key: 'bs-4', label: 'brand architecture',       label_de: 'Markenarchitektur' },
      { _key: 'bs-5', label: 'brand story',              label_de: 'Markenstory' },
      { _key: 'bs-6', label: 'customer journey mapping', label_de: 'Customer Journey Mapping' },
    ],
  },
  {
    _key: 'brand-design',
    name: 'Brand Design',
    name_de: 'Markendesign',
    items: [
      { _key: 'bd-1', label: 'logo design',              label_de: 'Logodesign' },
      { _key: 'bd-2', label: 'visual identity',          label_de: 'Visuelle Identität' },
      { _key: 'bd-3', label: 'pictorial language',       label_de: 'Bildsprache' },
      { _key: 'bd-4', label: 'materials',                label_de: 'Materialität' },
      { _key: 'bd-5', label: 'brand guidelines',         label_de: 'Brand Guidelines' },
      { _key: 'bd-6', label: 'application principles',   label_de: 'Anwendungsprinzipien' },
      { _key: 'bd-7', label: 'editorial design',         label_de: 'Editorial Design' },
      { _key: 'bd-8', label: 'webdesign',                label_de: 'Webdesign' },
      { _key: 'bd-9', label: 'motion design',            label_de: 'Motion Design' },
    ],
  },
  {
    _key: 'photography',
    name: 'Photography',
    name_de: 'Fotografie',
    items: [
      { _key: 'ph-1', label: 'product photography',  label_de: 'Produktfotografie' },
      { _key: 'ph-2', label: 'corporate photography', label_de: 'Corporate Photography' },
      { _key: 'ph-3', label: 'interior photography', label_de: 'Innenraumfotografie' },
    ],
  },
]

async function run() {
  // Patch the draft first (so the Studio reflects the change)
  await client
    .patch('drafts.homePage')
    .set({ services })
    .commit()
    .catch(() => {})

  // Also patch the published document
  await client
    .patch('homePage')
    .set({ services })
    .commit()

  console.log('✓ Services erfolgreich eingetragen')
}

run().catch(console.error)
