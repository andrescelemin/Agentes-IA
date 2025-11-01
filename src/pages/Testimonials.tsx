/**
 * Página de Testimonios - SmartPrompt Solutions
 * Testimonios reales de clientes satisfechos
 */
import { Star, Quote } from 'lucide-react'
import { Card, CardContent } from '../components/ui/card'
import PageSEO from '../components/PageSEO'

export default function TestimonialsPage(): JSX.Element {
  const testimonials = [
    {
      name: 'María González',
      position: 'Directora Legal',
      company: 'Bufete González & Asociados',
      content: 'Implementamos un GPT para análisis de contratos y redujimos el tiempo de revisión de 3 horas a 15 minutos. La precisión es increíble y nuestro equipo ahora puede enfocarse en trabajo de mayor valor.',
      rating: 5,
      image: 'https://pub-cdn.sider.ai/u/U04XH6E0RRN/web-coder/68902b460cd2d7c5a266e6a1/resource/8e583bb0-15cf-486b-a917-277e25ecbea7.jpg'
    },
    {
      name: 'Carlos Mendoza',
      position: 'CEO',
      company: 'Consultoría Financiera Mendoza',
      content: 'La automatización del análisis crediticio nos permitió reducir el tiempo de evaluación de 4 horas a 15 minutos con 99.2% de precisión. Una transformación completa de nuestro proceso core.',
      rating: 5,
      image: 'https://pub-cdn.sider.ai/u/U04XH6E0RRN/web-coder/68902b460cd2d7c5a266e6a1/resource/935a5094-3422-4862-92a8-b34a52d65ff2.jpg'
    },
    {
      name: 'Dra. Laura Chen',
      position: 'Directora Médica',
      company: 'Clínica Central',
      content: 'Nuestro GPT médico genera informes con 98% de precisión y ha reducido la documentación en 70%. Los médicos recuperaron horas valiosas para atención al paciente.',
      rating: 5,
      image: 'https://pub-cdn.sider.ai/u/U04XH6E0RRN/web-coder/68902b460cd2d7c5a266e6a1/resource/2ce76cd9-8d45-440e-b3cd-727f94985a8b.jpg'
    },
    {
      name: 'Roberto Silva',
      position: 'Director de Marketing',
      company: 'Agencia Creativa Silva',
      content: 'Triplicamos nuestra productividad en contenido manteniendo la voz de marca consistente. El ROI fue evidente desde el primer mes.',
      rating: 5,
      image: 'https://pub-cdn.sider.ai/u/U04XH6E0RRN/web-coder/68902b460cd2d7c5a266e6a1/resource/c37a945b-ebee-44b7-8641-46d47ed5435d.jpg'
    },
    {
      name: 'Ana Rodríguez',
      position: 'Directora Académica',
      company: 'Instituto Educativo Moderno',
      content: 'El material didáctico personalizado aumentó el engagement estudiantil en 75%. Los profesores pueden crear contenido adaptado en minutos.',
      rating: 5,
      image: 'https://pub-cdn.sider.ai/u/U04XH6E0RRN/web-coder/68902b460cd2d7c5a266e6a1/resource/079b38f9-eb8f-429c-b407-c860ce8c6f8c.jpg'
    },
    {
      name: 'Ing. Javier López',
      position: 'Gerente de Proyectos',
      company: 'Constructora López Hermanos',
      content: 'Redujimos costos de proyectos en 30% y aceleramos entregas en 25%. La documentación técnica automatizada fue un cambio radical.',
      rating: 5,
      image: 'https://pub-cdn.sider.ai/u/U04XH6E0RRN/web-coder/68902b460cd2d7c5a266e6a1/resource/348f1b90-53d8-4340-adc7-33ca1fb4d189.jpg'
    }
  ]

  return (
    <div className="bg-white min-h-screen">
      <PageSEO 
        title="Casos Reales de Impacto - Smart Fox AI" 
        description="Resultados medibles con Agentes de IA y Workflows: productividad, precisión y ROI. Historias en legal, marketing, salud y más."
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Casos Reales de Impacto
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Casos reales de empresas que transformaron sus procesos con nuestras soluciones de IA personalizada.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-blue-100 hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 flex-shrink-0">
                      <Quote className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <blockquote className="text-lg text-gray-700 mb-6">
                        "{testimonial.content}"
                      </blockquote>
                      <div className="flex items-center space-x-4">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="h-12 w-12 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-semibold text-gray-900">{testimonial.name}</p>
                          <p className="text-blue-600">{testimonial.position}</p>
                          <p className="text-sm text-gray-600">{testimonial.company}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            ¿Listo para tu propia historia de éxito?
          </h2>
          <p className="mt-6 text-lg leading-8 text-green-100">
            Chatea con nosotros por WhatsApp y recibe una consulta gratuita de 60 minutos. Sin compromiso.
          </p>
          <a
            href="https://wa.me/51939140886"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-3 rounded-md bg-white px-8 py-4 text-xl font-semibold text-green-700 shadow-sm hover:bg-gray-50 transition-colors"
          >
            <span>💬 Chatear por WhatsApp</span>
          </a>
          <p className="mt-4 text-sm text-green-200">
            Respuesta en menos de 5 minutos • Consulta gratuita • Especialista asignado
          </p>
        </div>
      </section>
    </div>
  )
}