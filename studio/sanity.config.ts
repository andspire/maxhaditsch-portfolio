import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'maxhaditsch-studio',
  title: 'Max Haditsch – Studio',

  projectId: 'ph135a5o',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Singletons
            S.listItem()
              .title('Homepage')
              .id('homePage')
              .child(
                S.document()
                  .schemaType('homePage')
                  .documentId('homePage')
              ),
            S.listItem()
              .title('About Page')
              .id('aboutPage')
              .child(
                S.document()
                  .schemaType('aboutPage')
                  .documentId('aboutPage')
              ),
            S.listItem()
              .title('Contact Page')
              .id('contactPage')
              .child(
                S.document()
                  .schemaType('contactPage')
                  .documentId('contactPage')
              ),
            S.divider(),
            // Legal
            S.listItem()
              .title('Imprint')
              .id('imprintPage')
              .child(
                S.document()
                  .schemaType('imprintPage')
                  .documentId('imprintPage')
              ),
            S.listItem()
              .title('Privacy Policy')
              .id('privacyPage')
              .child(
                S.document()
                  .schemaType('privacyPage')
                  .documentId('privacyPage')
              ),
            S.divider(),
            // Collections
            S.documentTypeListItem('project').title('Projects'),
            S.documentTypeListItem('exploreItem').title('Explore Items'),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
