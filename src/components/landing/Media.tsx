/**
 * Sección de medios y cobertura mediática
 * Solo testimonios textuales sin imágenes
 */
import { Quote } from 'lucide-react'
import { Card, CardContent } from '../../components/ui/card'

export default function LandingMedia(): JSX.Element {
  const pressQuotes = [
    {
      quote: 'SmartPrompt Solutions está revolucionando la forma en que las empresas implementan IA personalizada.',
      publication: 'TechCrunch',
      author: 'María Rodríguez',
    },
    {
      quote: 'El enfoque sectorial de SmartPrompt demuestra cómo la IA puede adaptarse a necesidades específicas.',
      publication: 'Digital Business Review',
      author: 'Carlos Mendoza',
    },
  ]

  return (
    <section className="py-20 sm:py-24 bg-gray-50" aria-label="Medios y prensa">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            En los medios
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Reconocidos por medios internacionales por nuestro enfoque innovador en IA personalizada
          </p>
        </div>

        {/* Citas de prensa */}
        <div className="mx-auto mt-20 max-w-4xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {pressQuotes.map((item, index) => (
              <Card key={index} className="border-blue-100 bg-white">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 flex-shrink-0">
                      <Quote className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <blockquote className="text-lg italic text-gray-700">
                        "{item.quote}"
                      </blockquote>
                      <div className="mt-4">
                        <p className="font-semibold text-gray-900">{item.author}</p>
                        <p className="text-sm text-gray-600">{item.publication}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA WhatsApp */}
        <div className="mx-auto mt-16 max-w-2xl text-center">
          <a
            href="https://wa.me/51939140886"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-md bg-green-600 px-8 py-4 text-lg font-semibold text-white shadow-sm hover:bg-green-500 transition-colors"
          >
            <span>💬 Solicitar consulta gratuita</span>
          </a>
        </div>
      </div>
    </section>
  )
}