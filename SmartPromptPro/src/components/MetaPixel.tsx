/**
 * MetaPixel: Inyecta el píxel de Meta en &lt;head&gt; y registra eventos en una SPA.
 * - Inserta el loader oficial + init + PageView UNA sola vez en &lt;head&gt; (al final, antes de &lt;/head&gt;).
 * - Añade el bloque noscript en &lt;body&gt;.
 * - Emite PageView en cambios de ruta (SPA) sin duplicar el inicial.
 */

import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'

/**
 * Component: MetaPixel
 * - Coloca el código base del píxel en &lt;head&gt; (debajo de cualquier otro script y antes de &lt;/head&gt;).
 * - Mantiene tracking consistente en una SPA.
 */
export default function MetaPixel(): JSX.Element | null {
  const location = useLocation()
  const hasHandledInitialRoute = useRef(false)

  // Inyección única del loader + init + PageView en HEAD
  useEffect(() => {
    const SCRIPT_ID = 'meta-pixel-base'
    if (document.getElementById(SCRIPT_ID)) return

    // Script base oficial dentro de &lt;head&gt;
    const script = document.createElement('script')
    script.id = SCRIPT_ID
    script.type = 'text/javascript'
    script.innerHTML =
      "!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?" +
      "n.callMethod.apply(n,arguments):n.queue.push(arguments)};" +
      "if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';" +
      "n.queue=[];t=b.createElement(e);t.async=!0;" +
      "t.src=v;s=b.getElementsByTagName(e)[0];" +
      "s.parentNode.insertBefore(t,s)}(window, document,'script'," +
      "'https://connect.facebook.net/en_US/fbevents.js');" +
      "fbq('init', '1308354527031907');" +
      "fbq('track', 'PageView');"

    // Se agrega al final del &lt;head&gt; (debajo de otros scripts y antes de &lt;/head&gt;)
    document.head.appendChild(script)

    // Bloque noscript (válido por especificación HTML) en BODY
    if (!document.getElementById('meta-pixel-noscript')) {
      const noScript = document.createElement('noscript')
      noScript.id = 'meta-pixel-noscript'
      noScript.innerHTML =
        '&lt;img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=1308354527031907&amp;ev=PageView&amp;noscript=1" /&gt;'
      if (document.body) {
        document.body.appendChild(noScript)
      } else {
        // Fallback mínimo si body no está disponible aún
        document.head.appendChild(noScript)
      }
    }
  }, [])

  // Disparar PageView en cada cambio de ruta SIN duplicar la carga inicial
  useEffect(() => {
    const fbqAny = (window as any)?.fbq
    // Saltar el primer render: ya fue trackeado por el snippet base en &lt;head&gt;
    if (!hasHandledInitialRoute.current) {
      hasHandledInitialRoute.current = true
      return
    }
    if (typeof fbqAny === 'function') {
      fbqAny('track', 'PageView')
    }
  }, [location.pathname])

  return null
}
