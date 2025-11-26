/**
 * WhoWeAre.tsx
 * Sección "¿Quiénes somos?" — caja central con propuesta y acompañamiento.
 *
 * Explica con claridad la propuesta de valor y el compromiso de acompañamiento.
 */

import React from 'react'

/**
 * WhoWeAre
 * Muestra la descripción central de la compañía y su promesa de acompañamiento.
 */
export default function WhoWeAre(): JSX.Element {
  return (
    <section className="bg-gray-50 py-12 sm:py-16" aria-labelledby="who-we-are">
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
        <div className="rounded-lg border border-gray-100 bg-white p-8 shadow-sm">
          <h2 id="who-we-are" className="text-2xl font-semibold text-gray-900">
            ¿Quiénes somos?
          </h2>
          <p className="mt-4 text-gray-700">
            Smart Prompt es una empresa enfocada en diseñar y entrenar agentes de Inteligencia Artificial personalizados
            para emprendedores, negocios y empresas en crecimiento. Nos especializamos en automatizar procesos
            repetitivos, mejorar la atención al cliente y crear sistemas inteligentes que trabajan por ti 24/7.
          </p>

          <p className="mt-4 text-gray-700 font-medium">
            No solo implementamos tecnología:{' '}
            <span className="font-semibold">te acompañamos paso a paso para que la IA realmente funcione en tu operación diaria.</span>
          </p>
        </div>
      </div>
    </section>
  )
}