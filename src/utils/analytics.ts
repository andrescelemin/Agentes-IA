/**
 * Utilidades de analítica del sitio
 * - trackEvent: envía eventos a window.dataLayer si existe (GTM); fallback a console.debug
 */

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>
  }
}

/**
 * Envía un evento con nombre y carga útil a dataLayer o consola.
 * @param name Nombre del evento
 * @param payload Datos adicionales del evento
 */
export function trackEvent(name: string, payload: Record<string, unknown> = {}): void {
  try {
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: name, ...payload })
    } else {
      // Fallback para entornos sin GTM
      // eslint-disable-next-line no-console
      console.debug('[trackEvent]', name, payload)
    }
  } catch {
    // Silencioso por robustez
  }
}
