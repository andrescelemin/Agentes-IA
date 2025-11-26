/**
 * Team.tsx
 * Sección "Nuestro Equipo" con tarjetas de roles.
 *
 * Presenta una vista profesional del equipo sin usar datos personales.
 */

import React from 'react'
import { Card, CardContent } from '../../components/ui/card'

/**
 * Team
 * Muestra los roles principales del equipo con descripciones.
 */
export default function Team(): JSX.Element {
  const roles = [
    {
      title: 'Arquitecto de Agentes de IA',
      desc: 'Diseña, entrena y optimiza los agentes personalizados.',
    },
    {
      title: 'Especialista en Automatización',
      desc: 'Conecta sistemas y crea flujos inteligentes con n8n.',
    },
    {
      title: 'Estratega de Negocio & UX',
      desc: 'Traduce tus objetivos en soluciones prácticas centradas en el cliente.',
    },
  ]

  return (
    <section className="py-12 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h3 className="text-2xl font-bold text-gray-900">Nuestro Equipo</h3>
          <p className="mt-2 text-gray-600">
            Somos un equipo multidisciplinario compuesto por especialistas en IA, automatización, diseño conversacional y experiencia de usuario.
            Combinamos tecnología, estrategia y creatividad para crear soluciones que realmente impactan tu negocio.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {roles.map((r) => (
            <Card key={r.title} className="border-gray-100 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-16 w-16 flex-shrink-0 rounded-lg bg-white shadow"></div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{r.title}</h4>
                    <p className="mt-2 text-sm text-gray-700">{r.desc}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}