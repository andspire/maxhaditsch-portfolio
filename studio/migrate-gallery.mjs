/**
 * Migration: exploreItem.gallery
 * Konvertiert alte Einträge vom Typ `image` in das neue `galleryImage`-Objekt-Format.
 *
 * Ausführen:
 *   node migrate-gallery.mjs
 *
 * Voraussetzung: SANITY_TOKEN muss als Umgebungsvariable gesetzt sein.
 * Token anlegen unter: https://www.sanity.io/manage → Project → API → Tokens
 * Benötigte Rechte: Editor (Write)
 */

import { createClient } from '@sanity/client'

const PROJECT_ID = 'ph135a5o'
const DATASET    = 'production'
const API_VER    = '2024-01-01'

const token = process.env.SANITY_TOKEN
if (!token) {
  console.error('❌  Kein SANITY_TOKEN gefunden.')
  console.error('   Setze ihn mit: export SANITY_TOKEN="dein-token"')
  process.exit(1)
}

const client = createClient({ projectId: PROJECT_ID, dataset: DATASET, apiVersion: API_VER, token, useCdn: false })

// Alle exploreItems mit Gallery laden
const items = await client.fetch(`*[_type == "exploreItem" && defined(gallery)] { _id, gallery }`)

console.log(`📦  ${items.length} Explore Items gefunden.`)

let migrated = 0

for (const item of items) {
  const needsMigration = item.gallery.some(entry => entry._type === 'image')
  if (!needsMigration) continue

  // Alte image-Einträge in galleryImage-Objekte umwandeln
  const newGallery = item.gallery.map(entry => {
    if (entry._type !== 'image') return entry   // bereits im neuen Format → unverändert

    // Altes Format: { _type: 'image', _key: '...', asset: { _ref, _type } }
    // Neues Format: { _type: 'galleryImage', _key: '...', image: { _type: 'image', asset: { _ref, _type } } }
    return {
      _type: 'galleryImage',
      _key:  entry._key,
      image: {
        _type: 'image',
        asset: entry.asset,
        ...(entry.hotspot ? { hotspot: entry.hotspot } : {}),
        ...(entry.crop    ? { crop:    entry.crop    } : {}),
      },
    }
  })

  await client.patch(item._id).set({ gallery: newGallery }).commit()
  console.log(`✅  ${item._id} migriert (${item.gallery.length} Slides)`)
  migrated++
}

if (migrated === 0) {
  console.log('ℹ️   Keine Migration nötig – alle Einträge sind bereits im neuen Format.')
} else {
  console.log(`\n🎉  Fertig! ${migrated} Dokument(e) aktualisiert.`)
}
