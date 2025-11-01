/**
 * Página de Soluciones
 * Muestra soluciones por industria y enlaza a casos de estudio reales.
 * Mantiene CTAs a WhatsApp para conversión.
 */

import PageSEO from '../components/PageSEO'
import { Card, CardContent } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Link } from 'react-router'
import { Lightbulb, ArrowRight } from 'lucide-react'

/** SolutionItem: solución por industria */
interface SolutionItem {
  slug?: string
  title: string
  description: string
  image: string
  ctaLabel: string
  href: string
  external?: boolean
}

export default function SolutionsPage(): JSX.Element {
  const WHATSAPP_URL = 'https://wa.me/51939140886'

  const solutions: SolutionItem[] = [
    {
      title: 'Legal: Redacción y revisión de contratos',
      description:
        'Agente legal especializado en cláusulas, referencias y riesgos. Ahorros de tiempo de hasta 80% con alta precisión.',
      image: 'https://pub-cdn.sider.ai/u/U04XH6E0RRN/web-coder/68902b460cd2d7c5a266e6a1/resource/c5ccf31b-3727-4f78-8896-27bad1d839fd.jpg',
      ctaLabel: 'Ver Caso de Estudio',
      href: '/case/bufete-legal-redujo-80-tiempo-de-contratos',
    },
    {
      title: 'Marketing: Producción de contenidos multicanal',
      description:
        'Calendarios, briefs y piezas en minutos manteniendo la voz de marca. Integración con CMS y redes sociales.',
      image: 'https://pub-cdn.sider.ai/u/U04XH6E0RRN/web-coder/68902b460cd2d7c5a266e6a1/resource/61148767-4efb-4137-ad17-f29ecf1dc620.jpg',
      ctaLabel: 'Ver Caso de Estudio',
      href: '/case/agencia-marketing-triplico-produccion-contenido',
    },
    {
      title: 'Salud: Informes clínicos y apoyo diagnóstico',
      description:
        'Estandariza informes, resume historiales y mejora precisión con flujos auditables y seguros.',
      image: 'https://pub-cdn.sider.ai/u/U04XH6E0RRN/web-coder/68902b460cd2d7c5a266e6a1/resource/886aa41d-fee9-49f8-ae80-eff89a37b83c.jpg',
      ctaLabel: 'Ver Caso de Estudio',
      href: '/case/hospital-mejoro-precision-informes-98',
    },
  ]

  return (
    <div className="bg-white">
      <PageSEO
        title="Soluciones por Industria | SmartPrompt Solutions"
        description="Agentes de IA especializados por sector para Legal, Marketing, Salud y más. Explora casos reales con resultados medibles."
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-800">
            <Lightbulb className="h-4 w-4" />
            Soluciones por industria
          </div>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Casos reales, impacto real
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Descubre cómo empresas como la tuya logran resultados con Agentes de IA, Workflows e Integraciones reales.
          </p>
        </div>
      </section>

      {/* Grid de soluciones */}
      <section className="py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 sm:grid-cols-2 lg:grid-cols-3 lg:px-8">
          {solutions.map((item) => (
            <Card key={item.title} className="overflow-hidden border-blue-100">
              <div className="h-40 w-full overflow-hidden bg-gray-100">
                <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                <p className="mt-2 text-gray-700">{item.description}</p>
                <div className="mt-6 flex items-center gap-3">
                  {item.href.startsWith('/case/') ? (
                    <Button
                      asChild
                      size="sm"
                      className="whitespace-nowrap bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    >
                      <Link to={item.href}>
                        Ver Caso
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  ) : (
                    <Button
                      asChild
                      size="sm"
                      className="whitespace-nowrap bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    >
                      <a href={item.href} target="_blank" rel="noopener noreferrer">
                        Ver Caso
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  )}
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="whitespace-nowrap border-blue-600 text-blue-700 hover:bg-blue-50 bg-transparent"
                  >
                    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                      Consulta
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            ¿Quieres una solución a tu medida?
          </h2>
          <p className="mt-6 text-lg leading-8 text-blue-100">
            Conversemos por WhatsApp y definamos el caso de uso con mejor ROI para tu empresa.
          </p>
          <div className="mt-8">
            <Button asChild size="lg" className="bg-white text-blue-700 hover:bg-gray-50">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                Solicitar consulta gratuita
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
