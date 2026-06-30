/**
 * BulkImageUpload – Wiederverwendbarer Upload-Button für Array-Inputs.
 *
 * Öffnet einen nativen Multi-File-Picker, lädt die Bilder sequenziell
 * in das Sanity Asset-Backend und fügt sie als Objekte ans Array an.
 *
 * @param itemType  - Sanity-Typ-Name des neuen Array-Items (z.B. "slideImage", "galleryImage")
 * @param imageField - Feldname innerhalb des Objekts, das das Image enthält (Standard: "image")
 */

import React, { useCallback, useRef, useState } from 'react'
import { ArrayOfObjectsInputProps, useClient, insert, setIfMissing } from 'sanity'
import { Button, Stack, Box, Text, Spinner, Flex } from '@sanity/ui'
import { ImagesIcon } from '@sanity/icons'

interface BulkImageUploadProps extends ArrayOfObjectsInputProps {
  itemType: string
  imageField?: string
}

export function BulkImageUpload(props: BulkImageUploadProps) {
  const { itemType, imageField = 'image' } = props
  const client = useClient({ apiVersion: '2024-01-01' })
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [progress, setProgress] = useState('')

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files ?? [])
      if (!files.length) return

      setIsUploading(true)

      try {
        const newItems: object[] = []

        for (let i = 0; i < files.length; i++) {
          const file = files[i]
          setProgress(`${i + 1} / ${files.length} – ${file.name}`)

          const asset = await client.assets.upload('image', file, {
            filename: file.name,
          })

          newItems.push({
            _type: itemType,
            _key: `img_${Date.now()}_${i}`,
            [imageField]: {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: asset._id,
              },
            },
          })
        }

        props.onChange([
          setIfMissing([]),
          insert(newItems, 'after', [-1]),
        ])
      } catch (err) {
        console.error('[BulkImageUpload] Upload fehlgeschlagen:', err)
      } finally {
        setIsUploading(false)
        setProgress('')
        if (fileInputRef.current) fileInputRef.current.value = ''
      }
    },
    [client, props, itemType, imageField],
  )

  return (
    <Stack space={4}>
      {props.renderDefault(props)}

      <Box>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />

        {isUploading ? (
          <Flex align="center" gap={3}>
            <Spinner muted />
            <Text size={1} muted>
              Hochladen: {progress}
            </Text>
          </Flex>
        ) : (
          <Button
            icon={ImagesIcon}
            text="Mehrere Bilder auf einmal hochladen"
            mode="ghost"
            tone="primary"
            fontSize={1}
            padding={3}
            onClick={() => fileInputRef.current?.click()}
          />
        )}
      </Box>
    </Stack>
  )
}
