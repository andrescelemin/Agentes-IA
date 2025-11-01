/**
 * Barra fija de CTA para móviles
 * - Botones: WhatsApp y Calculadora ROI
 * - Mejora conversión en dispositivos pequeños sin invadir la UI de escritorio
 */
import { Link } from 'react-router'
import { MessageCircle, Calculator } from 'lucide-react'
import { trackEvent } from '../utils/analytics'

/**
 * MobileCTA: barra inferior visible en pantallas pequeñas
 */
export default function MobileCTA(): JSX.Element {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 sm:hidden">
      <div className="mx-auto max-w-7xl px-4 pb-4">
        <div className="rounded-xl border bg-white/95 shadow-lg backdrop-blur supports-[backdrop-filter]:backdrop-blur-md">
          <div className="grid grid-cols-2 gap-3 p-3">
            <a
              href="https://wa.me/51939140886"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('whatsapp_click', { location: 'mobile_cta_bar' })}
              aria-label="Hablar por WhatsApp"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-green-600 px-4 py-3 text-sm font-semibold text-white shadow hover:bg-green-700 active:scale-[0.99] transition"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Hablar por WhatsApp
            </a>

            <Link
              to="/roi-calculator"
              aria-label="Calcular ROI"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow hover:from-blue-700 hover:to-indigo-700 active:scale-[0.99] transition"
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