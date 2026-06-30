/**
 * GalleryInput – Custom Array Input für die Explore-Item Gallery.
 * Wrapper um BulkImageUpload mit dem korrekten itemType "galleryImage".
 */

import { ArrayOfObjectsInputProps } from 'sanity'
import { BulkImageUpload } from './BulkImageUpload'

export function GalleryInput(props: ArrayOfObjectsInputProps) {
  return <BulkImageUpload {...props} itemType="galleryImage" />
}
