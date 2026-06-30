import { defineField, defineType } from 'sanity'
import { GalleryInput } from '../components/GalleryInput'

export default defineType({
  name: 'exploreItem',
  title: 'Explore Item',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Cover Image (Tile)',
      type: 'image',
      options: { hotspot: true },
      description: 'Wird als Vorschau-Kachel auf dem Canvas angezeigt.',
    }),
    defineField({
      name: 'imageAlt',
      title: 'Cover Image – Alternativtext',
      type: 'string',
      description: 'Kurze Bildbeschreibung für Screenreader und SEO.',
    }),

    // ── FEATURE (Cover im Popup) ────────────────────────
    defineField({
      name: 'featureLottie',
      title: 'Feature – Lottie Animation',
      type: 'file',
      options: { accept: '.json,.lottie' },
      description: 'Ersetzt das Cover-Bild im Detail-Popup. Format: .json (Bodymovin) oder .lottie.',
    }),
    defineField({
      name: 'featureLottieBg',
      title: 'Feature – Hintergrundfarbe',
      type: 'string',
      description: 'CSS-Farbe als Hintergrund für die Lottie-Animation, z.B. "#0A0A0A".',
    }),

    // ── THUMBNAIL (Kachel auf dem Canvas) ──────────────
    defineField({
      name: 'thumbnailLottie',
      title: 'Thumbnail – Lottie Animation',
      type: 'file',
      options: { accept: '.json,.lottie' },
      description: 'Ersetzt das Cover Image auf der Canvas-Kachel. Lottie hat Vorrang vor Bild.',
    }),
    defineField({
      name: 'thumbnailLottieBg',
      title: 'Thumbnail – Hintergrundfarbe (Lottie)',
      type: 'string',
      description: 'CSS-Farbe als Hintergrund für die Thumbnail-Lottie, z.B. "#111111".',
    }),
    defineField({
      name: 'thumbnailVideo',
      title: 'Thumbnail – Video',
      type: 'file',
      options: { accept: 'video/mp4,video/webm,video/quicktime' },
      description: 'Ersetzt das Cover Image auf der Canvas-Kachel. Lottie hat Vorrang vor Video. Format: .mp4 oder .webm empfohlen.',
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery (Slideshow)',
      type: 'array',
      description: 'Bilder für den Slider im Detail-Popup. Hochformat und Querformat werden automatisch erkannt. Über den Button unten mehrere Bilder auf einmal hochladen, danach per Drag & Drop anordnen.',
      components: { input: GalleryInput },
      of: [
        {
          type: 'object',
          name: 'galleryImage',
          title: 'Bild',
          fields: [
            defineField({
              name: 'image',
              title: 'Bild',
              type: 'image',
              options: { hotspot: true },
            }),
            defineField({
              name: 'alt',
              title: 'Alternativtext',
              type: 'string',
              description: 'Kurze Bildbeschreibung für Screenreader und SEO.',
            }),
          ],
          preview: {
            select: { media: 'image', subtitle: 'alt' },
            prepare: ({ media, subtitle }) => ({
              title: 'Bild',
              subtitle: subtitle || '',
              media,
            }),
          },
        },
      ],
    }),
    defineField({
      name: 'category',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Photography',          value: 'photography' },
          { title: 'Logo Design',         value: 'logo' },
          { title: 'Identity Design',     value: 'identity' },
          { title: 'Web Design',          value: 'web' },
          { title: 'Motion',              value: 'motion' },
          { title: 'Editorial / Print',   value: 'editorial' },
        ],
        layout: 'grid',
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
    }),
    defineField({
      name: 'agency',
      title: 'Agency / Client',
      type: 'string',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
    }),
    defineField({
      name: 'showOnCanvas',
      title: 'Im Explore-Canvas anzeigen',
      type: 'boolean',
      description: 'Wenn aktiv, erscheint dieses Item auf dem Explore-Canvas (explore.html).',
      initialValue: true,
    }),
    defineField({
      name: 'showOnTeaser',
      title: 'Im Homepage-Teaser anzeigen',
      type: 'boolean',
      description: 'Wenn aktiv, erscheint dieses Item als schwebende Thumbnail-Vorschau auf der Startseite. Maximal 6 Items empfohlen (3 links, 3 rechts).',
      initialValue: false,
    }),

    // ── PROJEKT-VERKNÜPFUNG ─────────────────────────────
    defineField({
      name: 'linkedProject',
      title: 'Mit Projekt verknüpfen',
      type: 'reference',
      to: [{ type: 'project' }],
      description:
        'Optional: Verknüpft dieses Explore-Element mit einem Projekt. Bei Klick auf die Kachel öffnet sich das Projekt-Popup. Wenn aktiv, werden alle anderen Felder (Gallery, Description, etc.) ignoriert.',
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
      title:      'title',
      categories: 'category',
      media:      'image',
    },
    prepare({ title, categories, media }: { title?: string; categories?: string[]; media?: unknown }) {
      const cats = Array.isArray(categories) ? categories : (categories ? [categories] : [])
      return {
        title:    title || 'Untitled',
        subtitle: cats.join(', '),
        media,
      }
    },
  },
})
