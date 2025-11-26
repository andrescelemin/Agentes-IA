/**
 * Methodology.tsx
 * Sección "Cómo trabajamos" con pasos numerados.
 *
 * Presenta el proceso en cuatro pasos claros y escaneables.
 */

import React from 'react'

/**
 * Methodology
 * Describe el flujo de trabajo habitual para proyectos con Smart Prompt.
 */
export default function Methodology(): JSX.Element {
  const steps = [
    { n: 1, title: 'Diagnóstico', desc: 'Analizamos tu negocio, tus clientes y tus procesos.' },
    { n: 2, title: 'Diseño del agente', desc: 'Creamos un agente entrenado con tu información real.' },
    { n: 3, title: 'Automatización', desc: 'Conectamos el agente a los flujos clave para ahorrar tiempo.' },
    { n: 4, title: 'Acompañamiento y optimización', desc: 'Ajustes constantes basados en tus resultados y necesidades.' },
  ]

  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h3 className="text-2xl font-bold text-gray-900">Cómo trabajamos</h3>
          <p className="mt-2 text-gray-600">Un proceso claro y repetible para llevar la IA a tu operación.</p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.n} className="rounded-lg border border-gray-100 bg-white p-6 text-center shadow-sm">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                <span className="font-semibold">{s.n}</span>
              </div>
              <h4 className="mt-4 text-lg font-semibold text-gray-900">{s.title}</h4>
              <p className="mt-2 text-sm text-gray-700">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}