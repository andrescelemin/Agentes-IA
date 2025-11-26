/**
 * Pricing.tsx
 * Sección "Evaluación Inicial" del landing.
 *
 * - Presenta la tarjeta de evaluación con título, precio, duración, lista de características y CTA.
 * - Asegura valores por defecto para evitar errores cuando se renderiza sin props.
 * - Componentes internos pequeños para responsabilidad única y mejor legibilidad.
 */

import React from 'react'
import { Check } from 'lucide-react'
import { Button } from '../ui/button'
import { trackEvent } from '../../utils/analytics'

/**
 * PlanFeature
 * Interfaz que representa una característica listada en la tarjeta de plan.
 */
export interface PlanFeature {
  /** Texto descriptivo de la característica */
  text: string
}

/**
 * PlanCardProps
 * Props del componente principal.
 */
export interface PlanCardProps {
  title?: string
  priceLabel?: string
  sessionLabel?: string
  features?: PlanFeature[]
  ctaHref?: string
  ctaLabel?: string
}

/**
 * Valores por defecto para la tarjeta de Evaluación Inicial.
 * - Exportado para que otras partes de la app puedan reutilizarlos.
 */
export const DEFAULT_EVALUATION_PROPS: Required<PlanCardProps> = {
  title: 'Evaluación Inicial',
  priceLabel: 'Gratis',
  sessionLabel: 'Sesión de 60 minutos',
  features: [
    { text: 'Análisis de procesos clave' },
    { text: 'Identificación de oportunidades' },
    { text: 'Estimación de ROI' },
    { text: 'Recomendaciones específicas' },
  ],
  ctaHref: 'https://n8n-console-n8n.0ss8w4.easypanel.host/form/4baaef16-e9c0-4530-856e-98c7f278eace',
  ctaLabel: 'Solicitar Evaluación Gratuita',
}

/**
 * PriceBlock
 * Muestra el precio/etiqueta y la duración de la sesión con jerarquía visual.
 *
 * @param props.price - etiqueta principal (por ejemplo: "Gratis")
 * @param props.session - subtítulo de duración (por ejemplo: "Sesión de 60 minutos")
 */
function PriceBlock({ price, session }: { price: string; session: string }): JSX.Element {
  return (
    <div className="flex items-baseline gap-4">
      <div className="flex flex-col">
        <span className="text-4xl font-extrabold text-gray-900 leading-none">{price}</span>
        <span className="mt-1 text-sm text-gray-600">{session}</span>
      </div>
    </div>
  )
}

/**
 * FeatureItem
 * Elemento individual de la lista de características.
 *
 * @param props.text - Texto descriptivo de la característica
 */
function FeatureItem({ text }: { text: string }): JSX.Element {
  return (
    <li className="flex items-start gap-3">
      <div className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-blue-50 text-blue-600">
        <Check className="h-4 w-4" />
      </div>
      <p className="text-sm text-gray-700 leading-tight">{text}</p>
    </li>
  )
}

/**
 * FeaturesGrid
 * Renderiza la lista de características en una cuadrícula responsiva.
 *
 * - En móvil: 1 columna; en sm+: 2 columnas.
 */
function FeaturesGrid({ features }: { features: PlanFeature[] }): JSX.Element {
  return (
    <ul className="mt-6 grid gap-4 sm:grid-cols-2">
      {features.map((f, idx) => (
        <FeatureItem key={idx} text={f.text} />
      ))}
    </ul>
  )
}

/**
 * CTAButton
 * Botón CTA que abre el formulario en nueva pestaña y dispara un evento de tracking.
 *
 * @param props.href - URL a abrir
 * @param props.label - Texto del botón
 */
function CTAButton({ href, label }: { href: string; label: string }): JSX.Element {
  function handleClick() {
    try {
      trackEvent && trackEvent('cta_click', { action: 'request_evaluation', location: 'landing_pricing' })
    } catch (e) {
      // No bloquear navegación por errores de tracking
      // eslint-disable-next-line no-console
      console.warn('Tracking error', e)
    }
  }

  return (
    <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700">
      <a href={href} target="_blank" rel="noopener noreferrer" onClick={handleClick} aria-label={label}>
        {label}
      </a>
    </Button>
  )
}

/**
 * LandingPricing
 * Componente principal exportado.
 *
 * - Acepta props opcionales; si no se pasan, utiliza DEFAULT_EVALUATION_PROPS para evitar errores (p. ej. map de undefined).
 * - Divide visualmente la tarjeta en header (título + badge), cuerpo (features) y footer (CTA).
 */
export default function LandingPricing(props?: PlanCardProps): JSX.Element {
  // Merge props con valores por defecto para garantizar que `features` siempre exista.
  const {
    title,
    priceLabel,
    sessionLabel,
    features,
    ctaHref,
    ctaLabel,
  } = { ...DEFAULT_EVALUATION_PROPS, ...(props || {}) }

  // Aseguramos que features sea array antes de mapear (previene errors en tiempo de ejecución).
  const safeFeatures = Array.isArray(features) ? features : DEFAULT_EVALUATION_PROPS.features

  return (
    <section className="py-16 sm:py-20" aria-label="Evaluación Inicial">
      <div className="mx-auto max-w-3xl px-6">
        <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-blue-50/30 p-8 shadow-sm">
          {/* Header: Título y Badge */}
          <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
              <p className="mt-2 text-sm text-gray-600">Perfecto para explorar el potencial de IA en tu negocio</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="rounded-full bg-green-50 px-3 py-1 text-sm font-semibold text-green-700">
                Revisión inicial
              </div>
              <PriceBlock price={priceLabel} session={sessionLabel} />
            </div>
          </header>

          {/* Separator */}
          <div className="my-6 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

          {/* Features + CTA */}
          <div className="grid gap-6 sm:grid-cols-2 sm:items-start">
            <div className="sm:col-span-1">
              <h4 className="text-lg font-semibold text-gray-900">Qué incluye</h4>
              <p className="mt-2 text-sm text-gray-600">Una evaluación práctica y enfocada en resultados para tu caso específico.</p>

              <FeaturesGrid features={safeFeatures} />
            </div>

            <div className="sm:col-span-1 flex flex-col items-stretch justify-center">
              <div className="mb-4 text-sm text-gray-700">
                <strong className="font-semibold">Sesión de 60 minutos</strong> · Con diagnóstico y recomendaciones accionables
              </div>

              <div className="mt-auto">
                <CTAButton href={ctaHref} label={ctaLabel} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}