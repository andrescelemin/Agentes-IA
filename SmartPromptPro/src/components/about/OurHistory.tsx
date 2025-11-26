/**
 * OurHistory.tsx
 * Sección "Nuestra Historia" con layout de dos columnas y espacio para imagen.
 *
 * Cuenta el origen y evolución de Smart Prompt con énfasis en foco práctico y escalabilidad.
 * Usa un placeholder inteligente orientado a hitos/crecimiento de empresa para reforzar la narrativa.
 */

import React from 'react'

/**
 * OurHistory
 * Presenta la narrativa de la compañía y los sectores a los que sirve.
 *
 * Reemplaza la ilustración por una más alineada a "company milestones / growth timeline".
 */
export default function OurHistory(): JSX.Element {
  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 items-center">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Nuestra Historia</h3>
            <p className="mt-4 text-gray-700">
              Smart Prompt nació con una idea clara:{' '}
              <strong>hacer que la inteligencia artificial deje de ser complicada y se convierta en una herramienta real para cualquier negocio.</strong>
            </p>
            <p className="mt-3 text-gray-700">
              Comenzamos creando soluciones para pequeños negocios y profesionales. Rápidamente vimos que cada empresa tenía necesidades diferentes, así que desarrollamos un método propio para entrenar, conectar y optimizar agentes de IA de forma personalizada.
            </p>
            <p className="mt-3 text-gray-700">
              Hoy trabajamos con sectores variados como:
            </p>

            <ul className="mt-3 list-inside list-disc text-gray-700">
              <li>turismo</li>
              <li>estudios jurídicos</li>
              <li>inmobiliarias</li>
              <li>comercios y servicios</li>
              <li>profesionales independientes</li>
            </ul>

            <p className="mt-3 text-gray-700">
              Nuestro enfoque ha sido siempre el mismo: <strong>soluciones claras, acompañamiento real y tecnología puesta al servicio de las personas.</strong>
            </p>
          </div>

          {/* Imagen ilustrativa más acorde: "company milestones / business growth timeline" */}
          <div className="flex items-center justify-center">
            <div className="h-64 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-blue-50 shadow-sm">
              <img
                src="https://pub-cdn.sider.ai/u/U04XH6E0RRN/web-coder/68902b460cd2d7c5a266e6a1/resource/ee57f31d-b8fb-4675-9b60-04e9ba76789a.jpg"
                alt="Hitos y crecimiento de la empresa - línea del tiempo de Smart Prompt"
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}