/**
 * main.tsx
 * Punto de entrada de la aplicación.
 *
 * - Monta el componente raíz <App />.
 * - Expone en window las constantes de contacto (WHATSAPP_LINK / WHATSAPP_NUMBER / WHATSAPP_URL)
 *   para compatibilidad con scripts que esperan variables globales en runtime.
 */

import { createRoot } from 'react-dom/client'
import './shadcn.css'
import App from './App'
import { WHATSAPP_LINK, WHATSAPP_NUMBER, WHATSAPP_URL } from './config/contact'

/**
 * Exponer valores de contacto en window para compatibilidad con scripts
 * que acceden a esas variables como globales (evita ReferenceError en runtime).
 * Añadimos WHATSAPP_URL como alias histórico.
 */
;(window as any).WHATSAPP_LINK = WHATSAPP_LINK
;(window as any).WHATSAPP_NUMBER = WHATSAPP_NUMBER
;(window as any).WHATSAPP_URL = WHATSAPP_URL

const root = createRoot(document.getElementById('app')!)
root.render(<App />)
