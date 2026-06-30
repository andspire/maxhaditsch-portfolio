import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline (EN)',
      type: 'string',
    }),
    defineField({
      name: 'headline_de',
      title: 'Headline (DE)',
      type: 'string',
    }),
    defineField({
      name: 'introText',
      title: 'Intro Text (EN)',
      type: 'string',
    }),
    defineField({
      name: 'introText_de',
      title: 'Intro Text (DE)',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Contact Email',
      type: 'string',
      description: 'Gleich für beide Sprachen',
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      description: 'Gleich für beide Sprachen',
    }),
    defineField({
      name: 'confirmationHeadline',
      title: 'Confirmation Headline (EN)',
      type: 'string',
    }),
    defineField({
      name: 'confirmationHeadline_de',
      title: 'Confirmation Headline (DE)',
      type: 'string',
    }),
    defineField({
      name: 'confirmationText',
      title: 'Confirmation Text (EN)',
      type: 'string',
    }),
    defineField({
      name: 'confirmationText_de',
      title: 'Confirmation Text (DE)',
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
      return { title: 'Contact Page' }
    },
  },
})
