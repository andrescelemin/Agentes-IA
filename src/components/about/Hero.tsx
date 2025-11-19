/**
 * Hero.tsx
 * Hero de la página "Nosotros" — bloque superior con título, subtítulo, propósito y CTA.
 *
 * Presenta de forma clara la propuesta de valor inicial y deja espacio para una ilustración
 * alineada con el tema de equipo e IA. Se utiliza un placeholder inteligente para mostrar
 * una imagen relevante sin añadir assets locales.
 */

import React from 'react'
import { Button } from '../../components/ui/button'
import { Users } from 'lucide-react'
import { Link } from 'react-router'

/**
 * AboutHero
 * Renderiza el encabezado principal de la página "Nosotros".
 */
export default function AboutHero(): JSX.Element {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:flex lg:items-center lg:gap-12 lg:px-8">
        <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Somos Smart Prompt</h1>
          <p className="mt-4 text-lg text-gray-700">
            Ayudamos a negocios de todos los tamaños a aprovechar la Inteligencia Artificial de manera práctica,
            segura y personalizada.
          </p>

          <p className="mt-4 text-gray-600">
            Nuestro compromiso es que la tecnología te libere tiempo, mejore la atención a tus clientes y te ayude a
            crecer sin complicaciones.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-start">
            <Button asChild className="bg-gradient-to-r from-blue-600 to-indigo-600">
              <Link to="/products">Conoce nuestros servicios</Link>
            </Button>

            <Button asChild variant="outline" className="bg-transparent border-gray-300 text-gray-700">
              <a href="#compromiso">Ver compromiso</a>
            </Button>
          </div>
        </div>

        {/* Imagen ilustrativa: usa smart placeholder para mostrar una ilustración de equipo/IA */}
        <div className="mt-10 flex justify-center lg:mt-0 lg:ml-auto">
          <div className="relative h-64 w-80 overflow-hidden rounded-2xl border border-gray-100 bg-gradient-to-br from-blue-50 to-white shadow-sm">
            <img
              src="https://pub-cdn.sider.ai/u/U04XH6E0RRN/web-coder/68902b460cd2d7c5a266e6a1/resource/e34a0d02-da47-4f4f-a178-a0180db27146.jpg"
              alt="Equipo trabajando con IA - ilustración"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}