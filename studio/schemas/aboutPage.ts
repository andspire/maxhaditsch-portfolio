import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'bioMain',
      title: 'Bio – Main Paragraph (EN)',
      type: 'text',
      rows: 6,
    }),
    defineField({
      name: 'bioMain_de',
      title: 'Bio – Main Paragraph (DE)',
      type: 'text',
      rows: 6,
    }),
    defineField({
      name: 'bioSecondary',
      title: 'Bio – Personal Paragraph (EN)',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'bioSecondary_de',
      title: 'Bio – Personal Paragraph (DE)',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'photo',
      title: 'Profile Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'photoAlt',
      title: 'Profile Photo – Alternativtext',
      type: 'string',
      description: 'Kurze Bildbeschreibung für Screenreader und SEO, z.B. "Max Haditsch, Brand Designer und Strategist, Wien".',
    }),
    defineField({
      name: 'photoSecondary',
      title: 'Secondary Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'photoSecondaryAlt',
      title: 'Secondary Photo – Alternativtext',
      type: 'string',
      description: 'Kurze Bildbeschreibung für Screenreader und SEO.',
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
      return { title: 'About Page' }
    },
  },
})
