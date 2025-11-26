/**
 * EnforceWhatsAppLinks.tsx
 * Componente runtime que asegura que todos los enlaces/CTAs de WhatsApp remitan
 * al WHATSAPP_LINK definido en src/config/contact.ts.
 *
 * Requisitos cubiertos:
 * - Detecta:
 *   - Botones/enlaces con wa.me
 *   - Enlaces api.whatsapp.com / web.whatsapp.com
 *   - Esquemas whatsapp://
 *   - Teléfonos usados como enlace para WhatsApp (tel: y phone= en la URL)
 * - No toca:
 *   - mailto:
 *   - rutas internas (/ o #)
 *   - elementos marcados con data-whatsapp-preserve="true"
 *
 * Comportamiento:
 * - Al montarse recorre todos los <a[href]> y, si detecta patrones asociados a WhatsApp,
 *   los reescribe al WHATSAPP_LINK, preservando mensajes predefinidos (text/body) y otros
 *   parámetros de la URL. Solo cambia el número.
 * - Observa mutaciones del DOM para capturar enlaces generados dinámicamente.
 */

import { useEffect } from 'react'
import { WHATSAPP_LINK } from '../config/contact'

/**
 * isWhatsappOrPhoneLink
 * Determina si una href corresponde a un link de WhatsApp o teléfono orientado a WhatsApp.
 * - Evita tocar mailto: y rutas internas (/ o #).
 * @param href - valor del atributo href
 * @returns boolean
 */
function isWhatsappOrPhoneLink(href: string | null): boolean {
  if (!href) return false
  const normalized = href.trim().toLowerCase()

  // No tocar mailto ni rutas internas
  if (normalized.startsWith('mailto:')) return false
  if (normalized.startsWith('/') || normalized.startsWith('#')) return false

  // Patrones típicos de WhatsApp:
  // - wa.me (enlace corto universal)
  // - api.whatsapp.com (API clásica)
  // - web.whatsapp.com (versión web)
  // - whatsapp:// (deep link app)
  // - whatsapp.com/send (variantes)
  if (
    normalized.includes('wa.me') ||
    normalized.includes('api.whatsapp.com') ||
    normalized.includes('web.whatsapp.com') ||
    normalized.startsWith('whatsapp://') ||
    normalized.includes('whatsapp.com/send')
  ) {
    return true
  }

  // Patrones de teléfono orientados a WhatsApp:
  // - tel:... (muchos sitios lo usan como CTA que dispara WhatsApp en móvil)
  // - phone= en query strings (ej.: api.whatsapp.com/send?phone=...)
  if (normalized.startsWith('tel:') || normalized.includes('phone=')) {
    return true
  }

  return false
}

/**
 * buildWhatsappHref
 * Construye una href final basada en WHATSAPP_LINK, preservando mensajes predefinidos
 * y otros parámetros de la URL original, cambiando únicamente el número.
 *
 * Reglas:
 * - Para http/https (wa.me, api.whatsapp.com, web.whatsapp.com, etc.):
 *   - Copia parámetros de query excepto phone.
 *   - Si existen text o body, los conserva (text tiene prioridad).
 * - Para whatsapp://:
 *   - Lee la query string después del ? y aplica las mismas reglas.
 * - Para tel: u otros patrones:
 *   - No hay mensaje predefinido; simplemente devuelve WHATSAPP_LINK.
 *
 * @param originalHref - href original del enlace detectado
 * @returns string - href final apuntando al número centralizado
 */
function buildWhatsappHref(originalHref: string | null): string {
  if (!originalHref) return WHATSAPP_LINK

  const href = originalHref.trim()
  const lower = href.toLowerCase()

  // URL base con el número ya correcto
  let baseUrl: URL
  try {
    baseUrl = new URL(WHATSAPP_LINK)
  } catch {
    // Si por alguna razón WHATSAPP_LINK es inválido, devolvemos el valor original para no romper el enlace.
    return originalHref
  }

  /**
   * Copia parámetros desde un conjunto de search params a la URL base,
   * preservando mensajes predefinidos y evitando sobreescribir phone.
   *
   * @param params - conjunto de parámetros a aplicar
   */
  const applyParams = (params: URLSearchParams): void => {
    const textParam = params.get('text') || params.get('body')
    if (textParam) {
      // text tiene prioridad sobre body; se usa text en la URL final
      baseUrl.searchParams.set('text', textParam)
    }

    params.forEach((value, key) => {
      if (key === 'phone' || key === 'text' || key === 'body') return
      baseUrl.searchParams.set(key, value)
    })
  }

  try {
    // Casos http/https (wa.me, api.whatsapp.com, web.whatsapp.com, etc.)
    if (lower.startsWith('http://') || lower.startsWith('https://')) {
      const originalUrl = new URL(href)
      applyParams(originalUrl.searchParams)
      return baseUrl.toString()
    }

    // Casos whatsapp:// (deep link app)
    if (lower.startsWith('whatsapp://')) {
      const queryIndex = href.indexOf('?')
      if (queryIndex !== -1) {
        const queryString = href.slice(queryIndex + 1)
        const params = new URLSearchParams(queryString)
        applyParams(params)
      }
      return baseUrl.toString()
    }

    // Casos tel: u otros patrones detectados:
    // no suelen tener mensaje predefinido, devolvemos solo el enlace base.
    return WHATSAPP_LINK
  } catch {
    // En caso de error inesperado, devolvemos el enlace base para no romper la UX.
    return WHATSAPP_LINK
  }
}

/**
 * replaceAllWhatsappLinks
 * Reescribe hrefs detectados a una versión basada en WHATSAPP_LINK,
 * preservando mensajes predefinidos y respetando elementos marcados para preservar.
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
        const newHref = buildWhatsappHref(href)

        // Solo reescribimos si realmente cambia
        if (href !== newHref) {
          a.setAttribute('href', newHref)
        }

        // Asegurar que se abra en nueva pestaña y rel seguro si es un CTA externo
        a.setAttribute('target', '_blank')
        a.setAttribute('rel', 'noopener noreferrer')
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