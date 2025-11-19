/**
 * Página de Detalle de Caso - SmartPrompt Solutions
 * Muestra un caso de estudio completo con resultados y proceso
 */
import { useParams, Link } from 'react-router'
import { ArrowLeft, Users, TrendingUp, CheckCircle, BarChart } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import PageSEO from '../components/PageSEO'

/** Datos de casos de estudio */
const caseStudies = {
  'bufete-legal-redujo-80-tiempo-de-contratos': {
    title: 'Cómo un Bufete Legal Redujo 80% el Tiempo de Redacción de Contratos',
    industry: 'Legal',
    client: 'Martínez & Asociados',
    duration: '4 semanas',
    results: ['80% reducción en tiempo de redacción', '65% mejora en precisión de citas', 'Ahorro anual estimado de $150K'],
    challenge:
      'El bufete enfrentaba cuellos de botella en la redacción y revisión de contratos comerciales. Las revisiones internas consumían horas y carecían de estandarización.',
    solution:
      'Implementamos un Agente legal especializado ajustado con guías internas, plantillas y jurisprudencia clave. El sistema sugiere cláusulas, detecta ambigüedades y propone referencias.',
    image:
      'https://images.unsplash.com/photo-1499914485622-a88fac536970?q=80&w=2000&auto=format&fit=crop',
  },
  'agencia-marketing-triplico-produccion-contenido': {
    title: 'Agencia de Marketing Triplicó la Producción de Contenido Conservando la Voz de Marca',
    industry: 'Marketing',
    client: 'CreativeFlow Agency',
    duration: '3 semanas',
    results: ['3× más piezas/semana', '30% mejor consistencia de marca', 'Reducción del 45% en tiempos de revisión'],
    challenge:
      'La agencia necesitaba producir más para múltiples clientes sin perder coherencia de marca. Los flujos eran manuales y propensos a errores.',
    solution:
      'Desarrollamos un Agente de contenidos con guías de estilo por cliente, plantillas de briefs y generación multiformato (blogs, ads, emails). Integrado con el CMS y revisión asistida.',
    image:
      'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2000&auto=format&fit=crop',
  },
  'hospital-mejoro-precision-informes-98': {
    title: 'Hospital Mejoró al 98% la Precisión en Informes Clínicos con Flujos Auditables',
    industry: 'Salud',
    client: 'Hospital Metropolitano',
    duration: '5 semanas',
    results: ['98% precisión en informes', '60% menos tiempo por reporte', 'Cumplimiento y trazabilidad mejorados'],
    challenge:
      'El personal médico invertía mucho tiempo en informes y resúmenes, con variabilidad en calidad y sin trazabilidad clara.',
    solution:
      'Implementamos un Agente clínico con plantillas estandarizadas, extracción de hallazgos y verificación. Reportes consistentes con registros de cambios y controles de acceso.',
    image:
      'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=2000&auto=format&fit=crop',
  },
}

export default function CaseDetailPage(): JSX.Element {
  const { slug } = useParams<{ slug: string }>()
  const caseStudy = slug ? caseStudies[slug as keyof typeof caseStudies] : null

  if (!caseStudy) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-gray-900">Caso no encontrado</h1>
          <p className="mb-8 text-gray-600">El caso de estudio que buscas no existe.</p>
          <Button asChild>
            <Link to="/solutions">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a Soluciones
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white min-h-screen">
      <PageSEO
        title={`${caseStudy.title} - Smart Fox AI`}
        description={`Caso de estudio: ${caseStudy.client} — ${caseStudy.industry}. Agentes de IA y Workflows: resultados y solución detallados.`}
      />

      {/* Hero del Caso */}
      <section className="relative">
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/40 to-black/20" />
        <img src={caseStudy.image} alt={caseStudy.title} className="h-96 w-full object-cover" />
        <div className="absolute inset-0 z-20 flex items-end">
          <div className="mx-auto w-full max-w-4xl px-6 pb-12">
            <Button asChild variant="outline" className="mb-6 bg-transparent text-white border-white hover:bg-white/10">
              <Link to="/solutions">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver a Soluciones
              </Link>
            </Button>

            <div className="flex items-center gap-4 mb-4">
              <span className="inline-flex items-center rounded-full bg-blue-500/80 px-3 py-1 text-sm font-medium text-white">
                {caseStudy.industry}
              </span>
              <span className="inline-flex items-center rounded-full bg-green-500/80 px-3 py-1 text-sm font-medium text-white">
                {caseStudy.duration}
              </span>
            </div>

            <h1 className="mb-6 text-4xl font-bold leading-tight text-white">{caseStudy.title}</h1>

            <div className="flex flex-wrap items-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="font-medium">{caseStudy.client}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contenido del Caso */}
      <section className="py-16">
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-12 px-6 lg:grid-cols-3 lg:px-8">
          {/* Información principal */}
          <div className="lg:col-span-2">
            <div className="prose prose-lg max-w-none">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">El Desafío</h2>
              <p className="mb-8 text-lg leading-8 text-gray-700">{caseStudy.challenge}</p>

              <h2 className="mb-6 text-2xl font-bold text-gray-900">Nuestra Solución</h2>
              <p className="mb-8 text-lg leading-8 text-gray-700">{caseStudy.solution}</p>
            </div>
          </div>

          {/* Resultados y métricas */}
          <div className="space-y-6">
            <Card className="border-blue-200">
              <CardContent className="p-6">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  Resultados Clave
                </h3>
                <ul className="space-y-3">
                  {caseStudy.results.map((result, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                      {result}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-green-200">
              <CardContent className="p-6">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                  <BarChart className="h-5 w-5 text-green-600" />
                  Métricas
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Industria:</span>
                    <span className="font-semibold">{caseStudy.industry}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duración:</span>
                    <span className="font-semibold">{caseStudy.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cliente:</span>
                    <span className="font-semibold">{caseStudy.client}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <Button
              asChild
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              <Link to="/solutions">Solicitar Evaluación Similar</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            ¿Te gustaría lograr resultados similares?
          </h2>
          <p className="mt-6 text-lg leading-8 text-blue-100">
            Agenda una consulta gratuita y descubre cómo podemos adaptar esta solución a tu empresa.
          </p>
          <div className="mt-8">
            <Button asChild size="lg" className="bg-white text-blue-700 hover:bg-gray-50">
              <Link to="/solutions">Solicitar Consulta Gratuita</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
