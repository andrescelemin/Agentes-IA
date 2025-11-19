/**
 * FacebookEvents: Delegación global de eventos para Meta Pixel.
 * - Detecta clics en anclas/botones a nivel de documento.
 * - Emite eventos estándar (Lead, Contact, ...) o personalizados (WhatsAppClick, PhoneClick).
 * - Compatible con SPA y el snippet inyectado por MetaPixel.tsx.
 */

import React, { useEffect } from 'react'

/** Conjunto de eventos estándar de Meta para usar fbq('track', ...) */
const STANDARD_EVENTS = new Set([
  'PageView',
  'ViewContent',
  'Lead',
  'Contact',
  'Purchase',
  'AddToCart',
  'InitiateCheckout',
  'CompleteRegistration',
  'Subscribe',
  'Search',
  'AddPaymentInfo',
  'AddToWishlist',
  'StartTrial',
])

/**
 * Envía un evento a Meta Pixel de forma segura.
 * Si es un evento estándar → 'track', si no → 'trackCustom'.
 */
function sendFbEvent(name: string, payload?: Record<string, any>): void {
  const fbq: any = (window as any)?.fbq
  if (typeof fbq !== 'function') return
  const data = payload ?? {}
  if (STANDARD_EVENTS.has(name)) {
    fbq('track', name, data)
  } else {
    fbq('trackCustom', name, data)
  }
}

/**
 * Obtiene un nombre descriptivo del elemento clicado para enriquecer el payload.
 */
function getElementLabel(el: HTMLElement): string {
  const aria = el.getAttribute('aria-label')
  if (aria) return aria
  const text = el.textContent?.trim() || ''
  return text.slice(0, 80)
}

/**
 * FacebookEvents Component
 * - Se monta una vez y añade un listener de clics al documento.
 * - Reglas:
 *   1) data-fb-event tiene prioridad. data-fb-payload (JSON) opcional.
 *   2) Enlaces WhatsApp → WhatsAppClick.
 *   3) mailto: → Contact.
 *   4) tel: → PhoneClick (custom).
 *   5) Botones/enlaces con "consulta" y "gratuit"/"gratis" → Lead.
 */
export default function FacebookEvents(): JSX.Element | null {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return

      // Elemento clicado más cercano relevante
      const clickable = target.closest('a, button') as HTMLElement | null
      if (!clickable) return

      let eventName: string | null = null
      let payload: Record<string, any> | undefined

      // 1) data-fb-event / data-fb-payload (tiene prioridad)
      const explicit = clickable.dataset?.fbEvent
      if (explicit) {
        eventName = explicit
        const payloadRaw = clickable.dataset?.fbPayload
        if (payloadRaw) {
          try {
            payload = JSON.parse(payloadRaw)
          } catch {
            payload = { payloadRaw }
          }
        }
      }

      // 2) Heurísticas si no hay data-fb-event
      if (!eventName) {
        // Si es un <a> usamos el href
        if (clickable instanceof HTMLAnchorElement && clickable.href) {
          const href = clickable.href

          // WhatsApp
          if (/wa\.me|whatsapp\.com/i.test(href)) {
            eventName = 'WhatsAppClick'
            payload = { href, label: getElementLabel(clickable) }
          }

          // Email
          if (!eventName && href.startsWith('mailto:')) {
            eventName = 'Contact'
            payload = { channel: 'email', href, label: getElementLabel(clickable) }
          }

          // Teléfono
          if (!eventName && href.startsWith('tel:')) {
            eventName = 'PhoneClick'
            payload = { channel: 'phone', href, label: getElementLabel(clickable) }
          }
        }

        // CTA "Consulta gratuita" (botón o enlace)
        if (!eventName) {
          const text = (clickable.textContent || '').toLowerCase()
          const isConsulta = text.includes('consulta')
          const isGratis = text.includes('gratuit') || text.includes('gratis')
          if (isConsulta && isGratis) {
            eventName = 'Lead'
            payload = { label: getElementLabel(clickable) }
          }
        }
      }

      // 3) Enviar si se determinó un evento
      if (eventName) {
        sendFbEvent(eventName, payload)
      }
    }

    document.addEventListener('click', onClick, { capture: true })
    return () => document.removeEventListener('click', onClick, { capture: true })
  }, [])

  return null
}
