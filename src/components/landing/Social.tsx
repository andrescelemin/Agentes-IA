/**
 * LandingSocial.tsx
 * Sección de prueba social y testimonios del landing.
 * - Muestra métricas, testimonios y CTA finales.
 * - Usa WHATSAPP_LINK centralizado para enlaces a WhatsApp.
 * - Añade tracking cuando el usuario navega a la página de testimonios o abre WhatsApp.
 */

import { Star, Users, TrendingUp, Clock } from 'lucide-react'
import { Card, CardContent } from '../../components/ui/card'
import { Link } from 'react-router'
import { trackEvent } from '../../utils/analytics'
import { WHATSAPP_LINK } from '../../config/contact'

/**
 * LandingSocial
 * - Renderiza estadísticas, testimonios y un bloque de CTA.
 * - En móvil los botones ocupan el ancho completo para mejor usabilidad.
 * @returns JSX.Element
 */
export default function LandingSocial(): JSX.Element {
  const stats = [
    {
      value: '95%',
      label: 'Satisfacción del cliente',
      icon: Star,
    },
    {
      value: '150+',
      label: 'Proyectos completados',
      icon: Users,
    },
    {
      value: '40%',
      label: 'Ahorro promedio en tiempo',
      icon: TrendingUp,
    },
    {
      value: '2-4',
      label: 'Semanas para implementación',
      icon: Clock,
    },
  ]

  const testimonials = [
    {
      name: 'Ana Martínez',
      position: 'Directora Legal',
      company: 'Martínez & Asociados',
      content:
        'El Agente de IA personalizado redujo nuestro tiempo de redacción de contratos en un 80%. La precisión en terminología legal es impresionante.',
      rating: 5,
    },
    {
      name: 'Roberto García',
      position: 'Director de Marketing',
      company: 'CreativeFlow Agency',
      content:
        'Triplicamos nuestra productividad en creación de contenido manteniendo la voz de marca consistente en todos los canales.',
      rating: 5,
    },
    {
      name: 'Dra. Laura Chen',
      position: 'Jefa de Departamento',
      company: 'Hospital Metropolitano',
      content:
        'Los informes médicos generados por el Agente de IA tienen una precisión del 98% y han mejorado significativamente nuestra eficiencia.',
      rating: 5,
    },
  ]

  return (
    <section className="py-20 sm:py-24" aria-label="Prueba social y testimonios">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Estadísticas */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Resultados Comprobados que Transforman Negocios
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Únete a las más de 150 empresas que ya automatizaron sus procesos críticos y aumentaron su productividad
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-4xl">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-indigo-100">
                    <stat.icon className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonios */}
        <div className="mx-auto mt-20 max-w-4xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-blue-100 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  {/* Rating */}
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Contenido */}
                  <blockquote className="text-gray-700 mb-6">
                    "{testimonial.content}"
                  </blockquote>

                  {/* Información del cliente */}
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-semibold">
                        {testimonial.name.charAt(0)}
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.position}</p>
                      <p className="text-sm text-blue-600">{testimonial.company}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA adicional */}
        <div className="mx-auto mt-20 max-w-2xl text-center">
          <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
            <CardContent className="p-6 sm:p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                ¿Listo para unirte a nuestros clientes satisfechos?
              </h3>
              <p className="text-gray-600 mb-6">
                Agenda tu consulta gratuita y descubre cómo podemos transformar tus procesos con IA personalizada.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://n8n-console-n8n.0ss8w4.easypanel.host/form/4baaef16-e9c0-4530-856e-98c7f278eace"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Solicitar consulta gratuita"
                  onClick={() => trackEvent('cta_click', { action: 'request_consult_form', location: 'landing_social' })}
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-colors"
                >
                  Solicitar Consulta Gratuita
                </a>

                <Link
                  to="/testimonials"
                  aria-label="Ir a Casos reales de Impacto"
                  onClick={() =>
                    trackEvent('cta_click', {
                      action: 'view_testimonials',
                      location: 'landing_social',
                    })
                  }
                  className="w-full sm:w-auto border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  Ver Casos de Éxito
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
