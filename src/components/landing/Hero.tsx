/**
 * Hero principal del Home para Smart Fox AI
 * Mensaje: Agentes de IA + Workflows que ejecutan tu negocio
 * - CTA a WhatsApp y enlace a Soluciones
 * - Imagen ilustrativa (placeholder inteligente)
 */

import { Link } from 'react-router'
import { Button } from '../ui/button'

/** Hero: destaca el valor central del producto/servicio */
export default function LandingHero(): JSX.Element {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-16 sm:py-24 lg:grid-cols-2 lg:px-8">
        {/* Copy principal */}
        <div className="flex flex-col justify-center">
          <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
            Agentes de IA • Workflows • Integraciones
          </span>
          <h1 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
            Agentes de Inteligencia Artificial y Workflows que ejecutan tu negocio
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-700">
            Diseñamos agentes de IA especializados y workflows automatizados que entienden tu
            contexto profesional, reducen tiempos críticos y estandarizan calidad. Integra IA que
            habla el idioma de tu sector y se conecta con tus herramientas.
          </p>

          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
            >
              <a href="https://wa.me/51939140886" target="_blank" rel="noopener noreferrer">
                Solicitar análisis gratuito
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-blue-600 text-blue-700 hover:bg-blue-50"
            >
              <Link to="/solutions">Ver soluciones y casos</Link>
            </Button>
          </div>

          <ul className="mt-8 grid grid-cols-1 gap-3 text-sm text-gray-700 sm:grid-cols-2">
            <li className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-green-600" />
              Ahorro de tiempo en procesos core
            </li>
            <li className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-green-600" />
              Calidad estandarizada y auditable
            </li>
            <li className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-green-600" />
              Integración con herramientas existentes
            </li>
            <li className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-green-600" />
              Despliegue ágil y ROI en semanas
            </li>
          </ul>
        </div>

        {/* Imagen/Ilustración */}
        <div className="relative">
          <div className="absolute -left-16 -top-16 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl sm:-left-24 sm:-top-24" />
          <img
            src="https://pub-cdn.sider.ai/u/U04XH6E0RRN/web-coder/68902b460cd2d7c5a266e6a1/resource/e0e02130-fa77-4fc3-a6dc-c5544c3be5f3.jpg"
            alt="Agentes de IA y workflows"
            className="relative z-10 h-[420px] w-full rounded-xl object-cover shadow-xl"
          />
        </div>
      </div>
    </section>
  )
}
