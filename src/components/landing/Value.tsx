/**
 * Sección de valor y diferenciadores
 * Explica por qué SmartPrompt Solutions es diferente
 */
import { Shield, Zap, Users, BarChart } from 'lucide-react'
import { Card, CardContent } from '../../components/ui/card'

export default function LandingValue(): JSX.Element {
  const valueProps = [
    {
      icon: Shield,
      title: 'Seguridad y Privacidad',
      description: 'Cumplimos con los más altos estándares de seguridad. Tus datos siempre están protegidos y nunca los usamos para entrenar modelos públicos.',
    },
    {
      icon: Zap,
      title: 'Implementación Rápida',
      description: 'De la evaluación a la implementación en 2-4 semanas. Entregamos resultados tangibles mientras otros siguen en fase de planificación.',
    },
    {
      icon: Users,
      title: 'Enfoque Sectorial',
      description: 'No somos genéricos. Diseñamos GPTs que entienden la terminología y procesos específicos de tu industria.',
    },
    {
      icon: BarChart,
      title: 'ROI Medible',
      description: 'Cada proyecto incluye métricas claras de retorno de inversión. Sabrás exactamente cuánto estás ahorrando y ganando.',
    },
  ]

  const processSteps = [
    {
      step: '1',
      title: 'Evaluación',
      description: 'Analizamos tus procesos actuales y identificamos oportunidades de automatización.',
    },
    {
      step: '2',
      title: 'Diseño',
      description: 'Creamos prompts personalizados y flujos de trabajo adaptados a tus necesidades.',
    },
    {
      step: '3',
      title: 'Implementación',
      description: 'Desplegamos la solución y capacitamos a tu equipo en su uso.',
    },
    {
      step: '4',
      title: 'Mejora Continua',
      description: 'Monitoreamos el rendimiento y optimizamos basándonos en datos reales.',
    },
  ]

  return (
    <section className="py-20 sm:py-24 bg-white" aria-label="Nuestro valor">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Propuestas de valor */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Por Qué Empresas Como la Tuya Eligen SmartPrompt
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Descubre la diferencia entre IA genérica y Agentes especializados que realmente entienden tu negocio.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-4xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {valueProps.map((prop, index) => (
              <Card key={prop.title} className="border-blue-100 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 flex-shrink-0">
                      <prop.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {prop.title}
                      </h3>
                      <p className="text-gray-600">
                        {prop.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Proceso */}
        <div className="mx-auto mt-20 max-w-4xl">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Nuestro proceso probado
            </h3>
            <p className="mt-4 text-lg text-gray-600">
              Una metodología clara que garantiza resultados desde el primer día
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <div key={step.step} className="text-center">
                <div className="relative">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-bold text-xl mb-4">
                    {step.step}
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-16 w-full h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 -z-10" />
                  )}
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {step.title}
                </h4>
                <p className="text-gray-600 text-sm">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Comparativa */}
        <div className="mx-auto mt-20 max-w-4xl">
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Agentes SmartPrompt vs Soluciones Genéricas
                </h3>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-green-600 mb-4 text-lg">Con SmartPrompt</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <div className="h-5 w-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
                        <div className="h-2 w-2 bg-white rounded-full" />
                      </div>
                      <span className="text-gray-700">Terminología específica de tu sector</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-5 w-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
                        <div className="h-2 w-2 bg-white rounded-full" />
                      </div>
                      <span className="text-gray-700">Integración con tus herramientas actuales</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-5 w-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
                        <div className="h-2 w-2 bg-white rounded-full" />
                      </div>
                      <span className="text-gray-700">Soporte técnico especializado</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-red-600 mb-4 text-lg">Soluciones Genéricas</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <div className="h-5 w-5 bg-red-500 rounded-full flex items-center justify-center mr-3">
                        <div className="h-2 w-2 bg-white rounded-full" />
                      </div>
                      <span className="text-gray-700">Respuestas genéricas sin contexto</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-5 w-5 bg-red-500 rounded-full flex items-center justify-center mr-3">
                        <div className="h-2 w-2 bg-white rounded-full" />
                      </div>
                      <span className="text-gray-700">Sin integración con flujos existentes</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-5 w-5 bg-red-500 rounded-full flex items-center justify-center mr-3">
                        <div className="h-2 w-2 bg-white rounded-full" />
                      </div>
                      <span className="text-gray-700">Soporte limitado o inexistente</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}