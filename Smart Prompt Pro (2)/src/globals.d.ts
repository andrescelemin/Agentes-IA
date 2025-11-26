/**
 * globals.d.ts
 * Declaraciones globales para TypeScript usadas en la app.
 *
 * - Añade propiedades opcionales a window para evitar errores de tipo
 *   cuando scripts externos esperan variables globales (WHATSAPP_*).
 */

declare global {
  interface Window {
    /**
     * Enlace canonical a WhatsApp (wa.me).
     */
    WHATSAPP_LINK?: string

    /**
     * Número principal en formato internacional.
     */
    WHATSAPP_NUMBER?: string

    /**
     * Alias histórico que algunos scripts usan.
     */
    WHATSAPP_URL?: string
  }
}

export {}