/**
 * contact.ts
 * Centraliza los datos de contacto para todo el proyecto.
 *
 * - WHATSAPP_NUMBER: número de teléfono en formato internacional con prefijo.
 * - WHATSAPP_LINK: enlace web que abre WhatsApp (wa.me).
 * - WHATSAPP_URL: alias histórico (compatibilidad con scripts que usan WHATSAPP_URL).
 *
 * Mantener un único punto de verdad evita fugas de números distintos en el código.
 */

/**
 * Número principal de WhatsApp en formato internacional.
 */
export const WHATSAPP_NUMBER = '+51945134479'

/**
 * Enlace que abre el chat de WhatsApp (wa.me) para el número principal.
 */
export const WHATSAPP_LINK = `https://wa.me/51945134479`

/**
 * Alias de compatibilidad: algunos scripts antiguos esperan WHATSAPP_URL.
 * Mantener el alias facilita migraciones y evita ReferenceError en runtime.
 */
export const WHATSAPP_URL = WHATSAPP_LINK