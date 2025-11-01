/**
 * Página de Demo - SmartPrompt Solutions
 * Reemplazado formulario por llamado directo a WhatsApp
 */
import PageSEO from '../components/PageSEO'

export default function DemoPage(): JSX.Element {
  return (
    <div className="bg-white min-h-screen">
      <PageSEO 
        title="Demo - SmartPrompt Solutions" 
        description="Solicita una demostración personalizada de nuestras soluciones de IA para tu empresa por WhatsApp."
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Demo Personalizada por WhatsApp
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Agenda una demostración en vivo de 45 minutos donde te mostraremos casos reales de tu industria. Sin compromiso.
            </p>
            <div className="mt-10">
              <a
                href="https://wa.me/51939140886"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-md bg-green-600 px-8 py-4 text-xl font-semibold text-white shadow-sm hover:bg-green-500 transition-colors"
              >
                <span>🎬 Solicitar Demo por WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Qué incluye la demo */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Lo que verás en tu demo
            </h2>
            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
              {[
                'Caso de uso específico para tu industria',
                'ROI estimado basado en tus procesos',
                'Plan de implementación paso a paso',
                'Respuestas a tus preguntas técnicas'
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 text-left">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
                    ✓
                  </div>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}