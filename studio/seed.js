// ─────────────────────────────────────────────────────
//  SANITY CONTENT SEED
//  Run with: npx sanity exec seed.js --with-user-token
// ─────────────────────────────────────────────────────
import { getCliClient } from 'sanity/cli'

const client = getCliClient({ apiVersion: '2024-01-01' })

async function seed() {
  console.log('🌱 Seeding Sanity content...\n')

  // ── HOMEPAGE ────────────────────────────────────────
  await client.createOrReplace({
    _id: 'homePage',
    _type: 'homePage',
    bioText: "I'm Max, a multidisciplinary brand designer & strategist based in Vienna, Austria. With years of experience as a graphic designer and art director I bring both strategic thinking and hands-on craft to every project. My holistic approach and branding process translates strategic positioning into compelling visual identities and consistent brand experiences across all touchpoints.",
    approachHeadline: 'What makes the process so effective.',
    approachPillars: [
      {
        _key: 'pillar-1',
        title: 'Brand strategy & positioning as a fundament',
        description: "A brand without strategy has no direction. Without a clear sense of where it's going and why, every decision becomes a guess. Strategy is what connects the brand's identity to every touchpoint, ensuring that what people experience actually reflects what the brand stands for.",
      },
      {
        _key: 'pillar-2',
        title: 'Design follows function',
        description: "Every visual and verbal element of a brand communicates something, whether intentionally or not. Color, typography, tone, imagery, space – each triggers associations, sets expectations, and builds or breaks trust. The question is never \"does it look good?\" but \"does it work?\"",
      },
      {
        _key: 'pillar-3',
        title: 'Consistency throughout all applications',
        description: "A brand is only as strong as its weakest touchpoint. A design system ensures that the brand looks, feels, and sounds like itself – wherever it appears. Consistency is not uniformity, it's coherence. And because brands are experienced through all the senses, the system has to account for more than what's visible.",
      },
    ],
    servicesIntro: "Most brand problems are not design problems – they are consistency problems. Gaps appear when brand elements are developed in isolation, without a shared strategic foundation. I design brands holistically, from the first strategic question to the last design decision.",
    exploreHeadline: 'A universe of work',
    exploreSub: 'Photography, logos, editorial, web design — collected, curated, and open to explore.',
  })
  console.log('✓ Homepage created')

  // ── ABOUT PAGE ──────────────────────────────────────
  await client.createOrReplace({
    _id: 'aboutPage',
    _type: 'aboutPage',
    bioMain: "Some people discover design through art. I discovered it through brands. As a kid, I could recite slogans before I could explain what a brand even was. I was just drawn to the way certain companies seemed to have a personality, a voice, a world of their own. That fascination eventually led me to 3D animation, and from there to design, which I went on to study. I worked in small agencies, spent some time in Berlin, and eventually found my home in Vienna. Throughout all of it, brand design remained the constant. My time at LKNR | THE BRAND AGENCY sharpened that focus considerably – it's where I developed a deeper understanding of brand strategy, explored the principles of neuromarketing, and learned how to translate strategic thinking into design that carries real emotional weight.",
    bioSecondary: "When I'm not designing (or reading about psychology or branding), I love spending time with my family, enjoying a good meal with some tasty Austrian wine, experiencing nature or traveling the unknown.",
  })
  console.log('✓ About Page created')

  // ── PROJECTS ────────────────────────────────────────
  const projects = [
    {
      _id: 'project-1',
      _type: 'project',
      title: 'Andspire Brand Identity',
      slug: { _type: 'slug', current: 'andspire-brand-identity' },
      brand: 'Andspire e.U.',
      tags: ['Brand Strategy', 'Identity Design', 'Web'],
      order: 1,
      featured: true,
      year: 2024,
    },
    {
      _id: 'project-2',
      _type: 'project',
      title: 'Visual Identity System',
      slug: { _type: 'slug', current: 'visual-identity-system' },
      brand: 'Undisclosed',
      tags: ['Identity Design', 'Art Direction'],
      order: 2,
      featured: true,
      year: 2024,
    },
    {
      _id: 'project-3',
      _type: 'project',
      title: 'Wayfinding & Signage System',
      slug: { _type: 'slug', current: 'wayfinding-signage-system' },
      brand: 'Undisclosed',
      tags: ['Wayfinding', 'Environmental Design', 'Typography'],
      order: 3,
      featured: true,
      year: 2023,
    },
  ]

  for (const project of projects) {
    await client.createOrReplace(project)
    console.log(`✓ Project: ${project.title}`)
  }

  console.log('\n✅ All content seeded successfully!')
  console.log('   Open http://localhost:3333 to review in Sanity Studio.')
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err.message)
  process.exit(1)
})
