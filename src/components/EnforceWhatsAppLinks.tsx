/**
 * EnforceWhatsAppLinks.tsx
 * Componente runtime que asegura que todos los enlaces/CTAs de WhatsApp/tel remitan
 * al WHATSAPP_LINK definido en src/config/contact.ts.
 *
 * Motivo:
 * - Evita dejar enlaces a números antiguos que puedan quedar tras reemplazos parciales.
 * - No modifica mailto: ni enlaces internos (rutas que comienzan por /).
 * - Respeta elementos marcados con data-whatsapp-preserve="true" para no tocar enlaces
 *   intencionalmente preservados.
 *
 * Comportamiento:
 * - Al montarse recorre todos los <a[href]> y, si detecta patrones asociados a WhatsApp
 *   o tel (wa.me, api.whatsapp.com, tel:), los reescribe a WHATSAPP_LINK.
 * - También escucha mutaciones del DOM por si componentes cargan enlaces dinámicamente.
 */

import { useEffect } from 'react'
import { WHATSAPP_LINK } from '../config/contact'

/**
 * isWhatsappOrPhoneLink
 * Determina si una href corresponde a un link de WhatsApp o teléfono que debe forzarse.
 * - Evita tocar mailto: y rutas internas (/).
 * @param href - valor del atributo href
 * @returns boolean
 */
function isWhatsappOrPhoneLink(href: string | null): boolean {
  if (!href) return false
  const normalized = href.trim().toLowerCase()

  // No tocar mailto ni rutas internas
  if (normalized.startsWith('mailto:')) return false
  if (normalized.startsWith('/') || normalized.startsWith('#')) return false

  // Patrones que queremos forzar:
  // - wa.me
  // - api.whatsapp.com
  // - tel:
  // - phone= en query strings (ej.: api.whatsapp.com/send?phone=...)
  if (
    normalized.includes('wa.me') ||
    normalized.includes('api.whatsapp.com') ||
    normalized.startsWith('tel:') ||
    normalized.includes('phone=')
  ) {
    return true
  }

  return false
}

/**
 * replaceAllWhatsappLinks
 * Reescribe hrefs detectados a WHATSAPP_LINK, respetando elementos marcados para preservar.
 */
function replaceAllWhatsappLinks(): void {
  try {
    const anchors = Array.from(document.querySelectorAll<HTMLAnchorElement>('a[href]'))
    anchors.forEach((a) => {
      // Si el autor marcó explícitamente que no toque este enlace, respetamos.
      const preserve = a.getAttribute('data-whatsapp-preserve')
      if (preserve === 'true') return

      const href = a.getAttribute('href')
      if (isWhatsappOrPhoneLink(href)) {
        // Solo reescribimos si el valor es distinto
        if (href !== WHATSAPP_LINK) {
          a.setAttribute('href', WHATSAPP_LINK)
          // Asegurar que se abra en nueva pestaña y rel seguro si es un CTA externo
          a.setAttribute('target', '_blank')
          a.setAttribute('rel', 'noopener noreferrer')
        }
      }
    })
  } catch (e) {
    // No lanzar: este utilitario solo intenta proteger la UX en runtime.
    // eslint-disable-next-line no-console
    console.warn('EnforceWhatsAppLinks: error reemplazando enlaces', e)
  }
}

/**
 * EnforceWhatsAppLinks
 * Componente React que activa la lógica de reemplazo en mount y observa mutaciones DOM.
 */
export default function EnforceWhatsAppLinks(): null {
  useEffect(() => {
    // Ejecutar al montar
    replaceAllWhatsappLinks()

    // Observador para capturar enlaces que se agreguen dinámicamente (p. ej. widgets, SSR tarde)
    const observer = new MutationObserver(() => {
      replaceAllWhatsappLinks()
    })

    observer.observe(document.body, { childList: true, subtree: true })

    // Re-ejecutar en resize/orientationchange por si un widget se re-renderiza con otro enlace
    const handleResize = () => replaceAllWhatsappLinks()
    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleResize)

    // Limpieza
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
    }
  }, [])

  // No renderiza ningún DOM propio
  return null
}