// ─────────────────────────────────────────────────────
//  SANITY CONTENT SEED
//  Run with: SANITY_TOKEN=dein_token node seed.mjs
// ─────────────────────────────────────────────────────

const PROJECT_ID = 'ph135a5o'
const DATASET    = 'production'
const API_VER    = '2024-01-01'
const TOKEN      = process.env.SANITY_TOKEN

if (!TOKEN) {
  console.error('❌ Kein Token gefunden. Bitte so ausführen:')
  console.error('   SANITY_TOKEN=dein_token node seed.mjs')
  process.exit(1)
}

const url = `https://${PROJECT_ID}.api.sanity.io/v${API_VER}/data/mutate/${DATASET}`

async function mutate(mutations) {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({ mutations }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(JSON.stringify(data))
  return data
}

async function createOrReplace(doc) {
  return mutate([{ createOrReplace: doc }])
}

async function seed() {
  console.log('🌱 Seeding Sanity content...\n')

  // ── HOMEPAGE ────────────────────────────────────────
  await createOrReplace({
    _id: 'homePage',
    _type: 'homePage',
    bioText: "I'm Max, a multidisciplinary brand designer & strategist based in Vienna, Austria. With years of experience as a graphic designer and art director I bring both strategic thinking and hands-on craft to every project. My holistic approach and branding process translates strategic positioning into compelling visual identities and consistent brand experiences across all touchpoints.",
    bioText_de: "Ich bin Max, ein multidisziplinärer Markendesigner & Stratege aus Wien. Mit jahrelanger Erfahrung als Grafikdesigner und Art Director bringe ich sowohl strategisches Denken als auch handwerkliches Können in jedes Projekt ein. Mein ganzheitlicher Ansatz und Markenprozess übersetzt strategische Positionierung in überzeugende visuelle Identitäten und konsistente Markenerlebnisse über alle Touchpoints hinweg.",
    approachHeadline: 'My design process.',
    approachHeadline_de: 'Mein Designprozess.',
    approachPillars: [
      {
        _key: 'pillar-1',
        title: 'Brand strategy & positioning as a fundament',
        title_de: 'Markenstrategie & Positionierung als Fundament',
        description: "A brand without strategy has no direction. Without a clear sense of where it's going and why, every decision becomes a guess. Strategy is what connects the brand's identity to every touchpoint, ensuring that what people experience actually reflects what the brand stands for.",
        description_de: "Eine Marke ohne Strategie hat keine Richtung. Ohne ein klares Bild davon, wohin sie geht und warum, wird jede Entscheidung zum Ratespiel. Strategie ist das, was die Identität der Marke mit jedem Touchpoint verbindet und sicherstellt, dass das, was Menschen erleben, tatsächlich widerspiegelt, wofür die Marke steht.",
      },
      {
        _key: 'pillar-2',
        title: 'Design follows function',
        title_de: 'Design folgt der Funktion',
        description: 'Every visual and verbal element of a brand communicates something, whether intentionally or not. Color, typography, tone, imagery, space – each triggers associations, sets expectations, and builds or breaks trust. The question is never "does it look good?" but "does it work?"',
        description_de: 'Jedes visuelle und verbale Element einer Marke kommuniziert etwas – ob beabsichtigt oder nicht. Farbe, Typografie, Ton, Bildsprache, Raum – jedes löst Assoziationen aus, weckt Erwartungen und baut Vertrauen auf oder zerstört es. Die Frage lautet nie „Sieht es gut aus?", sondern „Funktioniert es?"',
      },
      {
        _key: 'pillar-3',
        title: 'Consistency throughout all applications',
        title_de: 'Konsistenz in allen Anwendungen',
        description: "A brand is only as strong as its weakest touchpoint. A design system ensures that the brand looks, feels, and sounds like itself – wherever it appears. Consistency is not uniformity, it's coherence. And because brands are experienced through all the senses, the system has to account for more than what's visible.",
        description_de: "Eine Marke ist nur so stark wie ihr schwächster Touchpoint. Ein Designsystem stellt sicher, dass die Marke überall – wie sie aussieht, sich anfühlt und klingt – wie sie selbst wirkt. Konsistenz ist keine Uniformität, sondern Kohärenz. Und weil Marken über alle Sinne erlebt werden, muss das System mehr berücksichtigen als das Sichtbare.",
      },
    ],
    servicesIntro: "Most brand problems are not design problems – they are consistency problems. Gaps appear when brand elements are developed in isolation, without a shared strategic foundation. I design brands holistically, from the first strategic question to the last design decision.",
    servicesIntro_de: "Die meisten Markenprobleme sind keine Designprobleme – sie sind Konsistenzprobleme. Lücken entstehen, wenn Markenelemente isoliert entwickelt werden, ohne ein gemeinsames strategisches Fundament. Ich gestalte Marken ganzheitlich – von der ersten strategischen Frage bis zur letzten Designentscheidung.",
    exploreHeadline: 'A universe of work',
    exploreHeadline_de: 'Ein Universum an Arbeit',
    exploreSub: 'Photography, logos, editorial, web design — collected, curated, and open to explore.',
    exploreSub_de: 'Fotografie, Logos, Editorial, Webdesign – gesammelt, kuratiert und frei zu erkunden.',
  })
  console.log('✓ Homepage')

  // ── ABOUT PAGE ──────────────────────────────────────
  await createOrReplace({
    _id: 'aboutPage',
    _type: 'aboutPage',
    bioMain: "Some people discover design through art. I discovered it through brands. As a kid, I could recite slogans before I could explain what a brand even was. I was just drawn to the way certain companies seemed to have a personality, a voice, a world of their own. That fascination eventually led me to 3D animation, and from there to design, which I went on to study. I worked in small agencies, spent some time in Berlin, and eventually found my home in Vienna. Throughout all of it, brand design remained the constant. My time at LKNR | THE BRAND AGENCY sharpened that focus considerably – it's where I developed a deeper understanding of brand strategy, explored the principles of neuromarketing, and learned how to translate strategic thinking into design that carries real emotional weight.",
    bioMain_de: "Manche entdecken Design durch Kunst. Ich habe es durch Marken entdeckt. Als Kind konnte ich Slogans aufsagen, bevor ich erklären konnte, was eine Marke überhaupt ist. Mich hat einfach fasziniert, wie manche Unternehmen eine Persönlichkeit, eine Stimme, eine eigene Welt zu haben schienen. Diese Faszination führte mich schließlich zur 3D-Animation und von dort zum Design, das ich dann studierte. Ich arbeitete in kleinen Agenturen, verbrachte einige Zeit in Berlin und fand schließlich mein Zuhause in Wien. Durch all das blieb Markendesign die Konstante. Meine Zeit bei LKNR | THE BRAND AGENCY hat diesen Fokus erheblich geschärft – dort entwickelte ich ein tieferes Verständnis für Markenstrategie, erkundete die Prinzipien des Neuromarketings und lernte, strategisches Denken in Design zu übersetzen, das echtes emotionales Gewicht trägt.",
    bioSecondary: "When I'm not designing (or reading about psychology or branding), I love spending time with my family, enjoying a good meal with some tasty Austrian wine, experiencing nature or traveling the unknown.",
    bioSecondary_de: "Wenn ich nicht gerade designe (oder über Psychologie oder Branding lese), verbringe ich gerne Zeit mit meiner Familie, genieße ein gutes Essen mit einem feinen österreichischen Wein, erlebe die Natur oder reise ins Unbekannte.",
  })
  console.log('✓ About Page')

  // ── PROJECTS ────────────────────────────────────────
  const projects = [
    {
      _id: 'project-andspire',
      _type: 'project',
      title: 'Andspire Brand Identity',
      slug: { _type: 'slug', current: 'andspire-brand-identity' },
      brand: 'Andspire e.U.',
      agency: 'Independent',
      tags: ['Brand Strategy', 'Identity Design', 'Web Design'],
      order: 1,
      featured: true,
      year: 2024,
      description: "A comprehensive brand identity system for Andspire e.U., a brand strategy and design studio based in Vienna. From naming strategy through to full visual identity, web presence, and brand guidelines. The identity balances intellectual rigour with expressive minimalism. Every element — from the logotype to the typographic system — was designed to communicate strategic precision while leaving room for creative expansion. The resulting system is modular, scalable, and deeply rooted in the studio's core positioning.",
      description_de: "Ein umfassendes Markenidentitätssystem für Andspire e.U., ein Markenstrategie- und Designstudio mit Sitz in Wien. Von der Namensstrategie bis hin zur vollständigen visuellen Identität, Webpräsenz und Brand Guidelines. Die Identität verbindet intellektuelle Strenge mit expressivem Minimalismus. Jedes Element – vom Logotyp bis zum typografischen System – wurde entwickelt, um strategische Präzision zu kommunizieren und gleichzeitig Raum für kreative Entfaltung zu lassen.",
    },
    {
      _id: 'project-visual-identity',
      _type: 'project',
      title: 'Visual Identity System',
      slug: { _type: 'slug', current: 'visual-identity-system' },
      brand: 'Undisclosed',
      agency: 'Studio XYZ',
      tags: ['Identity Design', 'Art Direction', 'Typography'],
      order: 2,
      featured: true,
      year: 2023,
      description: "A comprehensive visual identity system developed in collaboration with Studio XYZ for an undisclosed client. The project included logotype design, typographic system, colour palette, and motion guidelines for digital applications. The brand required a dual-register identity — premium and precise in formal contexts, approachable and energetic in consumer-facing touchpoints. A modular grid system underpins all applications, ensuring consistency across print, screen, and environmental formats.",
      description_de: "Ein umfassendes visuelles Identitätssystem, entwickelt in Zusammenarbeit mit Studio XYZ für einen nicht genannten Kunden. Das Projekt umfasste Logotypendesign, Typografiesystem, Farbpalette und Motion-Guidelines für digitale Anwendungen. Die Marke erforderte eine Dual-Register-Identität – premium und präzise in formellen Kontexten, zugänglich und energetisch an konsumentenorientierten Touchpoints.",
    },
    {
      _id: 'project-wayfinding',
      _type: 'project',
      title: 'Wayfinding & Signage System',
      slug: { _type: 'slug', current: 'wayfinding-signage-system' },
      brand: 'Undisclosed',
      agency: 'Undisclosed',
      tags: ['Wayfinding', 'Typography'],
      order: 3,
      featured: true,
      year: 2022,
      description: "An environmental wayfinding and signage system for a large public institution. The project encompassed spatial navigation design, typographic hierarchy, icon system development, and production coordination across 12 locations. The brief demanded clarity and accessibility as primary values — every decision was tested against a diverse audience including visitors with limited mobility and non-native language speakers. Material specifications, surface treatments, and illumination concepts were developed in close collaboration with the architectural team.",
      description_de: "Ein Wegeleitsystem und Beschilderungssystem für eine große öffentliche Institution. Das Projekt umfasste räumliches Navigationsdesign, typografische Hierarchie, Ikonensystem-Entwicklung und Produktionskoordination an 12 Standorten. Die Vorgabe forderte Klarheit und Barrierefreiheit als primäre Werte – jede Entscheidung wurde an einem diversen Publikum getestet, darunter Besucher mit eingeschränkter Mobilität und nicht-muttersprachliche Sprecher.",
    },
  ]

  for (const project of projects) {
    await createOrReplace(project)
    console.log(`✓ Project: ${project.title}`)
  }

  // ── CONTACT PAGE ────────────────────────────────────
  await createOrReplace({
    _id: 'contactPage',
    _type: 'contactPage',
    headline: 'Get in touch.',
    headline_de: 'Schreib mir.',
    introText: "Send me a message and I'll get back to you as soon as possible.",
    introText_de: 'Schick mir eine Nachricht und ich melde mich so bald wie möglich.',
    email: 'office@maxhaditsch.com',
    phone: '+43 676 90 333 38',
    confirmationHeadline: 'Message sent.',
    confirmationHeadline_de: 'Nachricht gesendet.',
    confirmationText: "Thank you for your message. I'll get back to you as soon as possible.",
    confirmationText_de: 'Danke für deine Nachricht. Ich melde mich so bald wie möglich.',
  })
  console.log('✓ Contact Page')

  console.log('\n✅ Fertig! Öffne http://localhost:3333 um die Inhalte zu sehen.')
}

seed().catch(err => {
  console.error('❌ Fehler:', err.message)
  process.exit(1)
})
