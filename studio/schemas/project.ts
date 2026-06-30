import { defineField, defineType } from 'sanity'
import { SlidesInput } from '../components/SlidesInput'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order (sort)',
      type: 'number',
      description: 'Lower number = shown first',
    }),
    defineField({
      name: 'brand',
      title: 'Brand / Client',
      type: 'string',
    }),
    defineField({
      name: 'agency',
      title: 'Agency / Context',
      type: 'string',
      description: 'z.B. "Independent", "LKNR", "Studio XYZ"',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Brand Strategy',   value: 'Brand Strategy' },
          { title: 'Identity Design',  value: 'Identity Design' },
          { title: 'Logo Design',      value: 'Logo Design' },
          { title: 'Art Direction',    value: 'Art Direction' },
          { title: 'Typography',       value: 'Typography' },
          { title: 'Web Design',       value: 'Web Design' },
          { title: 'Photography',      value: 'Photography' },
          { title: 'Motion Design',    value: 'Motion Design' },
          { title: 'Brand Guidelines', value: 'Brand Guidelines' },
          { title: 'Wayfinding',       value: 'Wayfinding' },
        ],
      },
    }),

    // ── THUMBNAIL (Feature Image) ────────────────────────
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail – Bild',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Vorschaubild für die Projektliste und den Feature-Bereich.',
    }),
    defineField({
      name: 'thumbnailAlt',
      title: 'Thumbnail – Alternativtext',
      type: 'string',
      description: 'Kurze Bildbeschreibung für Screenreader und SEO, z.B. "Brand Identity System für Studio XYZ".',
    }),
    defineField({
      name: 'thumbnailLottie',
      title: 'Thumbnail – Lottie Animation',
      type: 'file',
      options: { accept: '.json,.lottie' },
      description: 'Ersetzt das Thumbnail-Bild wenn hochgeladen. Dateiformat: .json (Bodymovin) oder .lottie.',
    }),
    defineField({
      name: 'thumbnailLottieAspect',
      title: 'Thumbnail Lottie – Seitenverhältnis',
      type: 'string',
      description: 'Seitenverhältnis der Lottie-Animation, z.B. "16:9" oder "1:1". Nur relevant wenn Lottie als Thumbnail.',
      initialValue: '16:9',
    }),
    defineField({
      name: 'thumbnailBg',
      title: 'Thumbnail – Hintergrundfarbe',
      type: 'string',
      description: 'CSS-Farbe als Fallback / Hintergrund für Lottie oder Video, z.B. "#111111".',
    }),
    defineField({
      name: 'thumbnailVideo',
      title: 'Thumbnail – Video',
      type: 'file',
      options: { accept: 'video/mp4,video/webm,video/quicktime' },
      description: 'Ersetzt das Thumbnail-Bild wenn hochgeladen. Lottie hat Vorrang vor Video. Format: .mp4 oder .webm empfohlen.',
    }),

    // ── SLIDESHOW ────────────────────────────────────────
    defineField({
      name: 'slides',
      title: 'Slideshow',
      type: 'array',
      description: 'Alle Slides in beliebiger Reihenfolge – Bilder, Videos, Lotties. Über den Button unten mehrere Bilder gleichzeitig hochladen, danach per Drag & Drop anordnen.',
      components: { input: SlidesInput },
      of: [
        {
          type: 'object',
          name: 'slideImage',
          title: 'Bild',
          fields: [
            defineField({
              name: 'image',
              title: 'Bild',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'alt',
              title: 'Alternativtext',
              type: 'string',
              description: 'Kurze Bildbeschreibung für Screenreader und SEO.',
            }),
            defineField({
              name: 'caption',
              title: 'Bildunterschrift (optional)',
              type: 'string',
            }),
          ],
          preview: {
            select: { media: 'image', subtitle: 'caption' },
            prepare: ({ media, subtitle }) => ({
              title: 'Bild',
              subtitle: subtitle || '',
              media,
            }),
          },
        },
        {
          type: 'object',
          name: 'slideVideo',
          title: 'Video',
          fields: [
            defineField({
              name: 'video',
              title: 'Video-Datei',
              type: 'file',
              options: { accept: 'video/mp4,video/webm,video/quicktime' },
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'aspectRatio',
              title: 'Seitenverhältnis',
              type: 'string',
              description: 'z.B. "16:9", "4:3", "1:1", "9:16", "2:3"',
              initialValue: '16:9',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'autoplay',
              title: 'Autoplay',
              type: 'boolean',
              initialValue: true,
            }),
            defineField({
              name: 'loop',
              title: 'Loop',
              type: 'boolean',
              initialValue: true,
            }),
            defineField({
              name: 'muted',
              title: 'Stumm (empfohlen für Autoplay)',
              type: 'boolean',
              initialValue: true,
            }),
          ],
          preview: {
            select: { subtitle: 'aspectRatio' },
            prepare: ({ subtitle }) => ({
              title: 'Video',
              subtitle: subtitle ? `Seitenverhältnis: ${subtitle}` : '',
            }),
          },
        },
        {
          type: 'object',
          name: 'slideLottie',
          title: 'Lottie Animation',
          fields: [
            defineField({
              name: 'lottieFile',
              title: 'Lottie-Datei',
              type: 'file',
              options: { accept: '.json,.lottie' },
              description: 'Bodymovin JSON oder .lottie',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'aspectRatio',
              title: 'Seitenverhältnis',
              type: 'string',
              description: 'z.B. "1:1", "16:9", "4:3". Aus der Lottie-Datei ablesen (viewBox / w & h).',
              initialValue: '1:1',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'loop',
              title: 'Loop',
              type: 'boolean',
              initialValue: true,
            }),
            defineField({
              name: 'background',
              title: 'Hintergrundfarbe',
              type: 'string',
              description: 'CSS-Farbe für den Slide-Hintergrund, z.B. "#0A0A0A".',
            }),
          ],
          preview: {
            select: { subtitle: 'aspectRatio' },
            prepare: ({ subtitle }) => ({
              title: 'Lottie Animation',
              subtitle: subtitle ? `Seitenverhältnis: ${subtitle}` : '',
            }),
          },
        },
      ],
    }),

    // ── META ─────────────────────────────────────────────
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
    }),
    defineField({
      name: 'featured',
      title: 'Show on Homepage',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'caseStudyUrl',
      title: 'Case Study URL',
      type: 'url',
    }),
    defineField({
      name: 'description',
      title: 'Description (EN)',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'description_de',
      title: 'Description (DE)',
      type: 'text',
      rows: 4,
    }),

    // ── SEO ──────────────────────────────────────────────
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
          description: 'Empfehlung: max. 60 Zeichen. Leer lassen = Projekt-Titel wird verwendet.',
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
          description: 'Vorschaubild für Social Media und Messaging-Apps (z.B. iMessage, Slack). Empfohlen: 1200 × 630 px. Leer lassen = Thumbnail wird verwendet.',
          options: { hotspot: true },
        }),
        defineField({
          name: 'ogImageAlt',
          title: 'OG Image – Alternativtext',
          type: 'string',
          description: 'Bildbeschreibung für das OG Image.',
        }),
        defineField({
          name: 'noIndex',
          title: 'Nicht indexieren',
          type: 'boolean',
          description: 'Projekt aus Google-Index ausschließen (z.B. bei NDA-Projekten).',
          initialValue: false,
        }),
      ],
    }),
  ],

  orderings: [
    {
      title: 'Manual Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'brand',
      media: 'thumbnail',
    },
  },
})
