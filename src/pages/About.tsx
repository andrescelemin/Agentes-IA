/**
 * Página About: alinea la marca con el concepto "Agentes de IA + Workflows + Integraciones".
 * Incluye propuesta de valor, metodología y CTA.
 */
import PageSEO from '../components/PageSEO'
import { Card, CardContent } from '../components/ui/card'
import { Button } from '../components/ui/button'

const WHATSAPP_URL = 'https://wa.me/51939140886'

/** AboutPage: descripción y metodología de trabajo */
export default function AboutPage(): JSX.Element {
  return (
    <div className="bg-white">
      <PageSEO
        title="Sobre Smart Fox AI — Agentes de IA y Workflows para tu negocio"
        description="Diseñamos agentes de IA especializados y workflows que ejecutan procesos críticos, integrados con tus herramientas."
      />

      {/* Hero breve */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Agentes de IA + Workflows + Integraciones
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-700">
            Creamos soluciones que entienden tu contexto profesional, reducen tiempos críticos y
            estandarizan calidad. Conectamos todo con tus herramientas para que la IA opere en tu día a día.
          </p>
        </div>
      </section>

      {/* Metodología */}
      <section className="py-16">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 px-6 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          {[
            {
              t: '1. Descubrimiento',
              d: 'Mapeamos procesos y definimos objetivos y métricas.',
            },
            {
              t: '2. Diseño',
              d: 'Arquitectura del agente, prompts, datos y workflows.',
            },
            {
              t: '3. Implementación',
              d: 'Conectores, integraciones y pruebas con tu equipo.',
            },
            {
              t: '4. Medición y mejora',
              d: 'KPIs, feedback y ajustes continuos para ROI sostenido.',
            },
          ].map((s) => (
            <Card key={s.t} className="border-blue-100">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900">{s.t}</h3>
                <p className="mt-2 text-gray-700">{s.d}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <p className="text-lg text-gray-700">
            Nuestro enfoque prioriza rapidez de despliegue y resultados en semanas.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Button
              asChild
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
            >
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                Solicitar consulta gratuita
              </a>
            </Button>
            <Button asChild variant="outline" className="border-blue-600 text-blue-700 hover:bg-blue-50">
              <a href="#metodologia">Ver metodología completa</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
