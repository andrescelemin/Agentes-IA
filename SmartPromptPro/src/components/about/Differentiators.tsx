/**
 * Differentiators.tsx
 * Sección "Lo que nos hace diferentes" con tarjetas verticales.
 *
 * Presenta de manera concisa los principales diferenciadores de la empresa.
 */

import React from 'react'
import { Card, CardContent } from '../../components/ui/card'
import { CheckCircle, Layers, Zap, Users } from 'lucide-react'

/**
 * Differentiators
 * Renderiza cuatro tarjetas con icono y texto explicativo.
 */
export default function Differentiators(): JSX.Element {
  const items = [
    {
      icon: CheckCircle,
      title: 'Acompañamiento real',
      desc: 'No solo configuramos bots. Te acompañamos en la estrategia, la implementación y los ajustes.',
    },
    {
      icon: Layers,
      title: 'Agentes realmente personalizados',
      desc: 'Tu agente se entrena con tu información, tu estilo y tus procesos.',
    },
    {
      icon: Zap,
      title: 'Automatizaciones inteligentes',
      desc: 'Conectamos tu IA con formularios, CRMs, agendas y sistemas internos.',
    },
    {
      icon: Users,
      title: 'Enfoque humano + tecnología',
      desc: 'La IA automatiza, tú decides. Mantenemos el equilibrio perfecto entre eficiencia y cercanía.',
    },
  ]

  return (
    <section className="py-12 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="rounded-lg border border-gray-100 bg-gray-50 p-6">
          <h3 className="text-2xl font-bold text-gray-900">Lo que nos hace diferentes</h3>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((it) => (
              <Card key={it.title} className="border-gray-100 shadow-sm">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-white shadow-sm">
                      <it.icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-md font-semibold text-gray-900">{it.title}</h4>
                      <p className="mt-2 text-sm text-gray-700">{it.desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}