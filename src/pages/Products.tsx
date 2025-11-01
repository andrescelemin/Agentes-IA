/**
 * Página de Servicios/Productos: estructura basada en Agentes, Workflows e Integraciones.
 * Presenta tres bloques claros y un CTA final.
 */
import PageSEO from '../components/PageSEO'
import { Card, CardContent } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Link } from 'react-router'

const WHATSAPP_URL = 'https://wa.me/51939140886'

/** ProductsPage: catálogo de capacidades alineado al nuevo concepto */
export default function ProductsPage(): JSX.Element {
  const items = [
    {
      title: 'Agentes de IA especializados',
      desc:
        'Ajustados a tu sector (legal, marketing, salud, etc.). Prompts, memoria y políticas que hablan el idioma de tu negocio.',
    },
    {
      title: 'Workflows que ejecutan procesos',
      desc:
        'Automatizaciones auditables: generación, revisión, aprobación y entrega con checkpoints y métricas.',
    },
    {
      title: 'Integraciones y datos',
      desc:
        'Conectores con n8n, Zapier, Slack, Notion, Drive y más. Entrada/salida de datos segura y trazable.',
    },
  ]

  return (
    <div className="bg-white">
      <PageSEO
        title="Servicios | Smart Fox AI"
        description="Agentes de IA, Workflows e Integraciones para ejecutar procesos críticos con calidad y velocidad."
      />

      {/* Hero corto */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Servicios diseñados para impacto
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-700">
            Combinamos agentes de IA con workflows e integraciones para convertir tus procesos
            en operaciones rápidas y estandarizadas.
          </p>
        </div>
      </section>

      {/* Bloques */}
      <section className="py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 sm:grid-cols-3 lg:px-8">
          {items.map((it) => (
            <Card key={it.title} className="border-blue-100">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900">{it.title}</h3>
                <p className="mt-2 text-gray-700">{it.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <div className="flex justify-center gap-3">
            <Button
              asChild
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
            >
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                Solicitar análisis gratuito
              </a>
            </Button>
            <Button asChild variant="outline" className="border-blue-600 text-blue-700 hover:bg-blue-50">
              <Link to="/solutions">Ver casos reales</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
