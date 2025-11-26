/**
 * Why.tsx
 * Bloque diferenciador "¿Por qué Smart Prompt?"
 */

import React from 'react'
import { BadgeCheck, Users, Layers, Eye } from 'lucide-react'

export default function WhySmartPrompt(): JSX.Element {
  const bullets = [
    {
      icon: BadgeCheck,
      title: 'Enfoque práctico',
      desc: 'Hablamos tu idioma, no solo de tecnología: soluciones con impacto real en tu operación.',
    },
    {
      icon: Users,
      title: 'Implementación acompañada',
      desc: 'No te dejamos solo con un bot: acompañamiento desde el diseño hasta la adopción.',
    },
    {
      icon: Layers,
      title: 'Soluciones modulares',
      desc: 'Empezamos pequeño y escalamos según resultados y prioridades del negocio.',
    },
    {
      icon: Eye,
      title: 'Trabajo transparente',
      desc: 'Explicamos qué hace la IA y cómo se entrena para que tengas control y confianza.',
    },
  ]

  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-lg border border-blue-100 bg-blue-50 p-6">
            <h3 className="text-xl font-bold text-gray-900">¿Por qué trabajar con Smart Prompt?</h3>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {bullets.map((b) => (
                <div key={b.title} className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-white shadow-sm">
                    <b.icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{b.title}</p>
                    <p className="text-sm text-gray-700">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}