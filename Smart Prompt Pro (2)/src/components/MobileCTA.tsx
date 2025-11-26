/**
 * MobileCTA.tsx
 * Componente: Barra fija de CTA para móviles.
 *
 * - Muestra dos botones principales: WhatsApp y Calculadora de ROI.
 * - Ajusta dinámicamente la posición vertical para alinear el centro vertical
 *   de los botones con el centro vertical del widget del chatbot detectado en la página.
 * - No modifica colores, bordes, tipografía ni alturas.
 */

import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { MessageCircle, Calculator } from 'lucide-react'
import { trackEvent } from '../utils/analytics'
import { WHATSAPP_LINK } from '../config/contact'

/**
 * MobileCTA
 * - Componente de barra inferior para móviles.
 * - Detecta un posible widget fijado al borde derecho de la pantalla y
 *   alinea verticalmente el contenedor de botones con el centro del widget.
 * @returns JSX.Element
 */
export default function MobileCTA(): JSX.Element {
  /**
   * Ref al contenedor principal para medir su altura y calcular ajuste.
   */
  const containerRef = useRef<HTMLDivElement | null>(null)

  /**
   * Estado interno con el valor de bottom en px que se aplicará inline.
   * - Inicializamos con el valor previo (fallback) por si no se detecta widget.
   */
  const [bottomPx, setBottomPx] = useState<number>(26)

  /**
   * detectAndAlignWidget
   * - Busca en el DOM elementos position: fixed situados cerca del borde derecho.
   * - Selecciona el candidato más plausible (por tamaño, posición y z-index).
   * - Calcula el centro vertical del widget y ajusta bottom del contenedor para
   *   que coincid an los centros verticales.
   *
   * Nota: esta función es tolerante. Si no encuentra ningún candidato adecuado,
   * mantiene el valor por defecto de bottomPx para no alterar el layout.
   */
  function detectAndAlignWidget() {
    if (typeof window === 'undefined' || !containerRef.current) return

    const candidates: Element[] = []
    const all = Array.from(document.querySelectorAll('*'))

    // Recopilar elementos que probablemente son widgets fijados en la esquina derecha.
    for (const el of all) {
      const style = window.getComputedStyle(el)
      if (style.position !== 'fixed') continue
      // Debe tener un valor explícito en right (no 'auto')
      if (!style.right || style.right === 'auto') continue

      // Obtenemos rect para evaluar tamaño y posición
      const rect = (el as HTMLElement).getBoundingClientRect()
      // Filtramos elementos fuera de la pantalla o demasiado grandes
      if (rect.width <= 16 || rect.height <= 16) continue
      if (rect.top > window.innerHeight) continue

      // Consideramos únicamente elementos ubicados en la mitad derecha de la pantalla
      if (rect.left < window.innerWidth / 2) continue

      candidates.push(el)
    }

    if (candidates.length === 0) {
      // Ningún widget detectado: dejamos el fallback
      return
    }

    // Elegir el candidato con mayor z-index (más probable ser widget flotante)
    candidates.sort((a, b) => {
      const za = parseInt(window.getComputedStyle(a).zIndex || '0', 10) || 0
      const zb = parseInt(window.getComputedStyle(b).zIndex || '0', 10) || 0
      return zb - za
    })

    const chosen = candidates[0] as HTMLElement
    const widgetRect = chosen.getBoundingClientRect()
    const widgetCenterY = widgetRect.top + widgetRect.height / 2

    // Medimos el contenedor de los botones
    const containerRect = containerRef.current.getBoundingClientRect()
    const containerHeight = containerRect.height
    const desiredBottom = Math.round(window.innerHeight - widgetCenterY - containerHeight / 2)

    // Limitar valores razonables para evitar salir de pantalla
    const minBottom = 6
    const maxBottom = Math.round(window.innerHeight - containerHeight - 6)
    const normalized = Math.max(minBottom, Math.min(maxBottom, desiredBottom))

    setBottomPx(normalized)
  }

  /**
   * Efecto: detectar y alinear al montar y al redimensionar.
   * - También ejecutamos tras un pequeño timeout para cubrir widgets que cargan después.
   */
  useEffect(() => {
    detectAndAlignWidget()

    // Recalcular en resize/orientationchange
    const handleResize = () => {
      detectAndAlignWidget()
    }
    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleResize)

    // Pequeños reintentos si el widget carga de forma asíncrona
    const t1 = window.setTimeout(detectAndAlignWidget, 300)
    const t2 = window.setTimeout(detectAndAlignWidget, 1000)
    const t3 = window.setTimeout(detectAndAlignWidget, 2000)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
      window.clearTimeout(t1)
      window.clearTimeout(t2)
      window.clearTimeout(t3)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    // Mantener oculto en pantallas >= sm (consistent con diseño previo)
    <div
      ref={containerRef}
      className="fixed inset-x-0 z-40 sm:hidden"
      // Conservamos la reserva a la derecha para no invadir el widget.
      // Bottom se calcula dinámicamente en px.
      style={{ right: '96px', bottom: `${bottomPx}px` }}
    >
      <div className="px-4 pb-4">
        <div className="rounded-xl border bg-white/95 shadow-lg backdrop-blur supports-[backdrop-filter]:backdrop-blur-md">
          {/* Contenedor horizontal: cada botón usa flex-1 para expandirse */}
          <div className="flex gap-3 items-stretch pt-2 pb-4 px-3">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('whatsapp_click', { location: 'mobile_cta_bar' })}
              aria-label="Hablar por WhatsApp"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-green-600 px-4 py-3 text-sm font-semibold text-white shadow hover:bg-green-700 active:scale-[0.99] transition flex-1"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Hablar por WhatsApp
            </a>

            <Link
              to="/roi-calculator"
              aria-label="Calcular ROI"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow hover:from-blue-700 hover:to-indigo-700 active:scale-[0.99] transition flex-1"
              onClick={() => trackEvent('cta_click', { action: 'roi_calculator', location: 'mobile_cta_bar' })}
            >
              <Calculator className="h-4 w-4" aria-hidden="true" />
              Calcular ROI
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
