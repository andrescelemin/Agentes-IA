/**
 * Sección de precios optimizada para conversión
 * Tres planes claros con CTAs directos
 */

import { Button } from '../../components/ui/button'
import { Check, Star } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'

interface Plan {
  name: string
  description: string
  price: string
  period: string
  features: string[]
  cta: string
  popular?: boolean
}

/** LandingPricing: tres planes con imagen de contexto */
export default function LandingPricing(): JSX.Element {
  const plans: Plan[] = [
    {
      name: 'Evaluación Inicial',
      description: 'Perfecto para explorar el potencial de IA en tu negocio',
      price: 'Gratis',
      period: '',
      features: [
        'Análisis de procesos clave',
        'Identificación de oportunidades',
        'Estimación de ROI',
        'Recomendaciones específicas',
        'Sesión de 60 minutos',
      ],
      cta: 'Solicitar Consulta Gratuita',
    },
    {
      name: 'Desarrollo de Agentes',
      description: 'Agentes de IA especializados para tu equipo',
      price: 'Desde $100',
      period: '/proyecto',
      features: [
        'Agente de IA personalizado',
        'Integración con 2-3 herramientas',
        'Workflows básicos',
        'Soporte por 30 días',
        'Documentación completa',
        'Capacitación del equipo',
      ],
      cta: 'Solicitar Propuesta',
      popular: true,
    },
    {
      name: 'Solución Empresarial',
      description: 'Sistema completo de IA para transformación digital',
      price: 'Personalizado',
      period: '',
      features: [
        'Múltiples agentes especializados',
        'Integración completa del stack',
        'Workflows avanzados',
        'Soporte prioritario 24/7',
        'Monitoreo y analytics',
        'Actualizaciones continuas',
        'ROI garantizado',
      ],
      cta: 'Contactar Ventas',
    },
  ]

  return (
    <section className="py-20 sm:py-24" aria-label="Planes y precios">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Elige Tu Camino Hacia la Automatización Inteligente
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Desde descubrir el potencial hasta la transformación total. Cada paso incluye métricas claras de ROI y resultados.
          </p>
        </div>

        {/* Imagen de contexto */}
        <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-xl border bg-white shadow-sm">
          <img 
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Presentación de tecnología empresarial moderna en entorno sofisticado"
            className="w-full h-48 object-cover"
          />
        </div>

        {/* Planes */}
        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative flex flex-col ${
                plan.popular
                  ? 'border-blue-300 bg-gradient-to-b from-blue-50 to-white shadow-lg ring-1 ring-blue-200'
                  : 'border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="inline-flex items-center gap-1 rounded-full bg-blue-600 px-4 py-1 text-sm font-semibold text-white">
                    <Star className="h-3 w-3" />
                    Más Popular
                  </div>
                </div>
              )}
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-gray-900">{plan.name}</CardTitle>
                <CardDescription className="text-gray-600">{plan.description}</CardDescription>
                <div className="mt-4 flex items-baseline">
                  <span className="text-3xl font-bold tracking-tight text-gray-900">{plan.price}</span>
                  {plan.period && (
                    <span className="ml-1 text-sm font-semibold text-gray-600">{plan.period}</span>
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col">
                <ul className="space-y-3 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="mr-3 h-5 w-5 flex-shrink-0 text-blue-600" aria-hidden="true" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  className={`mt-8 w-full ${
                    plan.popular
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
                      : 'bg-gray-900 hover:bg-gray-800'
                  }`}
                >
                  <a href="https://wa.me/51939140886" target="_blank" rel="noopener noreferrer">
                    {plan.cta}
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Nota adicional */}
        <div className="mx-auto mt-12 max-w-2xl text-center">
          <p className="text-sm text-gray-600">
            ¿Necesitas algo diferente?{' '}
            <a href="https://wa.me/51939140886" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600 hover:text-blue-500">
              Hablemos sobre tu caso específico
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}