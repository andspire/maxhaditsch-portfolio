/**
 * SlidesInput – Custom Array Input für die Projekt-Slideshow.
 * Wrapper um BulkImageUpload mit dem korrekten itemType "slideImage".
 */

import { ArrayOfObjectsInputProps } from 'sanity'
import { BulkImageUpload } from './BulkImageUpload'

export function SlidesInput(props: ArrayOfObjectsInputProps) {
  return <BulkImageUpload {...props} itemType="slideImage" />
}
