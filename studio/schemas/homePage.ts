import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Homepage',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    // ── ABOUT / BIO ──────────────────────────────
    defineField({
      name: 'bioText',
      title: 'About – Bio Text (EN)',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'bioText_de',
      title: 'About – Bio Text (DE)',
      type: 'text',
      rows: 4,
    }),

    // ── APPROACH ─────────────────────────────────
    defineField({
      name: 'approachHeadline',
      title: 'Approach – Headline (EN)',
      type: 'string',
    }),
    defineField({
      name: 'approachHeadline_de',
      title: 'Approach – Headline (DE)',
      type: 'string',
    }),
    defineField({
      name: 'approachPillars',
      title: 'Approach – Pillars',
      type: 'array',
      description: 'Reihenfolge = Anzeigereihenfolge auf der Seite',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title',       title: 'Title (EN)',       type: 'string' }),
            defineField({ name: 'title_de',    title: 'Title (DE)',       type: 'string' }),
            defineField({ name: 'description', title: 'Description (EN)', type: 'text', rows: 4 }),
            defineField({ name: 'description_de', title: 'Description (DE)', type: 'text', rows: 4 }),
          ],
          preview: { select: { title: 'title' } },
        },
      ],
    }),

    // ── SERVICES ─────────────────────────────────
    defineField({
      name: 'servicesIntro',
      title: 'Services – Intro Text (EN)',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'servicesIntro_de',
      title: 'Services – Intro Text (DE)',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'services',
      title: 'Services – Kategorien',
      type: 'array',
      description: 'Leistungskategorien mit Sub-Items. Reihenfolge = Anzeigereihenfolge.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name',    title: 'Kategorie (EN)', type: 'string' }),
            defineField({ name: 'name_de', title: 'Kategorie (DE)', type: 'string' }),
            defineField({
              name: 'items',
              title: 'Leistungen',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({ name: 'label',    title: 'Label (EN)', type: 'string' }),
                    defineField({ name: 'label_de', title: 'Label (DE)', type: 'string' }),
                  ],
                  preview: { select: { title: 'label' } },
                },
              ],
            }),
          ],
          preview: { select: { title: 'name' } },
        },
      ],
    }),

    // ── EXPLORE TEASER ───────────────────────────
    defineField({
      name: 'exploreHeadline',
      title: 'Explore – Headline (EN)',
      type: 'string',
    }),
    defineField({
      name: 'exploreHeadline_de',
      title: 'Explore – Headline (DE)',
      type: 'string',
    }),
    defineField({
      name: 'exploreSub',
      title: 'Explore – Subtext (EN)',
      type: 'string',
    }),
    defineField({
      name: 'exploreSub_de',
      title: 'Explore – Subtext (DE)',
      type: 'string',
    }),

    // ── SEO ──────────────────────────────────────
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description: 'Empfehlung: max. 60 Zeichen.',
          validation: Rule => Rule.max(60).warning('Über 60 Zeichen – wird in Google möglicherweise abgeschnitten.'),
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          description: 'Empfehlung: 120–155 Zeichen.',
          validation: Rule => Rule.max(155).warning('Über 155 Zeichen – wird in Google möglicherweise abgeschnitten.'),
        }),
        defineField({
          name: 'ogImage',
          title: 'OG Image',
          type: 'image',
          description: 'Vorschaubild für Social Media (empfohlen: 1200 × 630 px).',
          options: { hotspot: true },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Homepage' }
    },
  },
})
