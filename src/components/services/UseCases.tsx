/**
 * UseCases.tsx
 * Casos de uso típicos y micro-testimonios (placemarkers).
 */

import React from 'react'
import { Card, CardContent } from '../../components/ui/card'

export default function UseCases(): JSX.Element {
  const cases = [
    {
      title: 'Estudio jurídico',
      desc: 'Agente que responde consultas frecuentes, agenda citas y filtra casos antes de pasar a un abogado.',
    },
    {
      title: 'Agencia de viajes / turismo',
      desc: 'Atiende reservas, envía información de paquetes y resuelve dudas frecuentes automáticamente.',
    },
    {
      title: 'Bienes raíces',
      desc: 'Responde sobre propiedades, agenda visitas y recopila datos de los interesados para seguimiento.',
    },
  ]

  return (
    <section className="py-12 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h3 className="text-2xl font-bold text-gray-900">Casos de uso típicos</h3>
          <p className="mt-2 text-gray-600">Ejemplos reales donde nuestros agentes aportan valor desde el primer día.</p>
        </div>

        <div className="mt-8 space-y-4">
          {cases.map((c) => (
            <Card key={c.title} className="border-gray-100">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{c.title}</h4>
                    <p className="mt-2 text-gray-700">{c.desc}</p>
                  </div>
                  <div className="text-sm text-gray-500 italic">Micro-testimonio disponible</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}