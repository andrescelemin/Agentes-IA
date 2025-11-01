/**
 * Página de Contacto - SmartPrompt Solutions
 * Reemplazado formulario por llamado directo a WhatsApp
 */
import PageSEO from '../components/PageSEO'

export default function ContactPage(): JSX.Element {
  return (
    <div className="bg-white min-h-screen">
      <PageSEO 
        title="Contacto - SmartPrompt Solutions" 
        description="Contáctanos por WhatsApp para una consulta gratuita sobre soluciones de IA personalizada para tu empresa."
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Hablemos por WhatsApp
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              ¿Listo para transformar tu negocio con IA? Envíanos un mensaje directo por WhatsApp y te atenderemos personalmente en menos de 5 minutos.
            </p>
            <div className="mt-10">
              <a
                href="https://wa.me/51939140886"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-md bg-green-600 px-8 py-4 text-xl font-semibold text-white shadow-sm hover:bg-green-500 transition-colors"
              >
                <span>💬 Chatear por WhatsApp</span>
              </a>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              Respuesta garantizada en menos de 5 minutos • Consulta gratuita • Sin compromiso
            </p>
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                title: 'Respuesta Inmediata',
                description: 'Te respondemos en menos de 5 minutos, sin esperas',
                emoji: '⚡'
              },
              {
                title: 'Consulta Gratuita',
                description: '60 minutos de análisis sin costo para tu proyecto',
                emoji: '🎯'
              },
              {
                title: 'Solución Personalizada',
                description: 'Caso de uso específico para tu industria',
                emoji: '✨'
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-4">{item.emoji}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}