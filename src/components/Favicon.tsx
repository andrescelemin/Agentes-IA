/**
 * Favicon dinámico
 * Inserta/actualiza los enlaces de íconos en el <head> usando el logo proporcionado.
 * Evita dependencias externas y garantiza consistencia en SPA.
 */
import React, { useEffect } from 'react'

/**
 * URL directa del favicon (alojado en Sider.ai)
 */
const LOGO_URL =
  'https://pub-cdn.sider.ai/u/U04XH6E0RRN/web-coder/68902b460cd2d7c5a266e6a1/resource/584138bb-e788-4e5e-8b2d-0c13a3048e5e.png'

/**
 * Crea un <link> para favicon/apple-touch-icon con marcado identificable.
 */
function createIconLink(rel: string, href: string, sizes?: string) {
  const link = document.createElement('link')
  link.rel = rel
  link.href = href
  link.type = 'image/png'
  if (sizes) link.sizes = sizes
  link.setAttribute('data-app-favicon', 'true')
  return link
}

/**
 * Favicon: componente sin UI que inyecta los favicons en el head cuando se monta.
 */
export default function Favicon(): JSX.Element | null {
  useEffect(() => {
    const head = document.head

    // Limpia favicons previos gestionados por la app
    head.querySelectorAll('link[data-app-favicon="true"]').forEach((n) => n.remove())

    // Íconos estándar
    const icons = [
      createIconLink('icon', LOGO_URL, '16x16'),
      createIconLink('icon', LOGO_URL, '32x32'),
      createIconLink('shortcut icon', LOGO_URL),
      createIconLink('apple-touch-icon', LOGO_URL, '180x180'),
    ]

    icons.forEach((l) => head.appendChild(l))

    // Limpieza al desmontar
    return () => {
      head.querySelectorAll('link[data-app-favicon="true"]').forEach((n) => n.remove())
    }
  }, [])

  return null
}
