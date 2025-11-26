/**
 * PageSEO: minimal SEO helper
 * Sets document title and meta description on mount/update.
 */
import { useEffect } from 'react'

interface PageSEOProps {
  /** Document title */
  title: string
  /** Meta description text */
  description?: string
}

/**
 * Component: PageSEO
 * Injects title and (if provided) meta[name="description"] tag content.
 */
export default function PageSEO({ title, description }: PageSEOProps): null {
  useEffect(() => {
    document.title = title

    if (description) {
      let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null
      if (!meta) {
        meta = document.createElement('meta')
        meta.name = 'description'
        document.head.appendChild(meta)
      }
      meta.content = description
    }
  }, [title, description])

  return null
}
