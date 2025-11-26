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
 * Nuevo número solicitado por el cliente: +51 935 108 877
 */
export const WHATSAPP_NUMBER = '+51935108877'

/**
 * Enlace que abre el chat de WhatsApp (wa.me) para el número principal.
 * Formato universal sin signos ni espacios, solo código de país + número.
 */
export const WHATSAPP_LINK = `https://wa.me/51935108877`

/**
 * Alias de compatibilidad: algunos scripts antiguos esperan WHATSAPP_URL.
 * Mantener el alias facilita migraciones y evita ReferenceError en runtime.
 */
export const WHATSAPP_URL = WHATSAPP_LINK