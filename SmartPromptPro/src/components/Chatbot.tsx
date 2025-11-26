/**
 * src/components/Chatbot.tsx
 * Integración del widget @n8n/chat usando React/TSX para Sider.
 *
 * - Sin etiquetas <script> ni <link> sueltas en el JSX.
 * - Inyecta dinámicamente el CSS y el bundle ESM desde el CDN.
 * - Crea el chat conectado a n8n con textos en español.
 */

import React, { useEffect } from 'react'

const N8N_CHAT_CSS =
  'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css'
const N8N_CHAT_SCRIPT =
  'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js'

export default function Chatbot(): JSX.Element | null {
  useEffect(() => {
    // 1) Inyectar el CSS del chat si aún no existe
    let styleEl = document.querySelector(
      `link[href="${N8N_CHAT_CSS}"]`,
    ) as HTMLLinkElement | null

    let cssAddedByThisComponent = false

    if (!styleEl) {
      styleEl = document.createElement('link')
      styleEl.rel = 'stylesheet'
      styleEl.href = N8N_CHAT_CSS
      document.head.appendChild(styleEl)
      cssAddedByThisComponent = true
    }

    // 2) Cargar dinámicamente el bundle ESM desde el CDN
    let destroyed = false
    let chatInstance: any

    ;(async () => {
      try {
        // @vite-ignore evita que el bundler intente resolver la URL en build
        const mod: any = await import(
          /* @vite-ignore */ N8N_CHAT_SCRIPT
        )
        if (destroyed) return

        const { createChat } = mod

        chatInstance = createChat({
          webhookUrl:
            'https://smart-fox.app.n8n.cloud/webhook/f9fc3db4-e21e-4c59-a54c-6946f2d96664/chat',

          // Idioma principal
          defaultLanguage: 'es',

          // Mensajes de bienvenida dentro del chat
          initialMessages: [
            'Hola 👋',
            'Soy el asistente de Smart Consulting. ¿En qué puedo ayudarte hoy?',
          ],

          // Textos de la interfaz (header, placeholder, footer…)
          i18n: {
            es: {
              title: 'Hola 👋',
              subtitle: 'Estoy aquí para ayudarte con tus agentes de IA',
              inputPlaceholder: 'Escribe tu mensaje aquí...',
              footer: 'Impulsado por Smart Consulting',
            },
          },
        })
      } catch (error) {
        console.error('Error cargando @n8n/chat desde CDN:', error)
      }
    })()

    // 3) Limpieza al desmontar el componente
    return () => {
      destroyed = true
      if (chatInstance && typeof chatInstance.destroy === 'function') {
        chatInstance.destroy()
      }
      if (cssAddedByThisComponent && styleEl?.parentNode) {
        styleEl.parentNode.removeChild(styleEl)
      }
    }
  }, [])

  // El widget se dibuja por su cuenta (burbuja/panel), aquí no hace falta JSX
  return null
}
