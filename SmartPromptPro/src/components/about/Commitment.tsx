/**
 * Commitment.tsx
 * Sección "Nuestro compromiso contigo" con fondo suave y frase destacada.
 *
 * Refuerza la promesa de valor de la empresa con un bloque emocional y confiable.
 */

import React from 'react'

/**
 * Commitment
 * Muestra un mensaje central de compromiso con los clientes.
 */
export default function Commitment(): JSX.Element {
  return (
    <section id="compromiso" className="bg-gray-50 py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-6 text-center lg:px-8">
        <h3 className="text-2xl font-bold text-gray-900">Nuestro compromiso contigo</h3>
        <p className="mt-4 text-gray-700">
          En Smart Prompt creemos que la tecnología debe adaptarse a ti, no al revés. Nos comprometemos a ofrecerte soluciones
          claras, útiles y pensadas para ayudarte a crecer sin complicaciones técnicas.
        </p>

        <div className="mt-6 rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
          <p className="text-lg font-semibold text-gray-900">“Tecnología que trabaja por ti, no que te complica la vida.”</p>
        </div>
      </div>
    </section>
  )
}