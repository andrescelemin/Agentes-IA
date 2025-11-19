/**
 * MissionVisionValues.tsx
 * Muestra Misión, Visión y Valores en tres tarjetas horizontales.
 *
 * Cada tarjeta es responsable de presentar uno de los pilares de identidad de la marca.
 */

import React from 'react'
import { Card, CardContent } from '../../components/ui/card'

/**
 * MissionVisionValues
 * Renderiza las tres tarjetas con misión, visión y valores.
 */
export default function MissionVisionValues(): JSX.Element {
  const values = ['Transparencia', 'Innovación constante', 'Orientación al cliente', 'Simplicidad', 'Resultados medibles']

  return (
    <section className="py-12 lg:py-16" aria-label="Misión Visión Valores">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h3 className="text-2xl font-bold text-gray-900">Misión, visión y valores</h3>
          <p className="mt-2 text-gray-600">Principios que guían nuestro trabajo con clientes y equipos.</p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <Card className="border-gray-100 shadow-sm">
            <CardContent className="p-6">
              <h4 className="text-lg font-semibold text-gray-900">Misión</h4>
              <p className="mt-2 text-gray-700 text-sm">
                Diseñar soluciones de IA accesibles, personalizadas y eficientes que ayuden a los negocios a ahorrar tiempo,
                mejorar su servicio y crecer con procesos automatizados.
              </p>
            </CardContent>
          </Card>

          <Card className="border-gray-100 shadow-sm">
            <CardContent className="p-6">
              <h4 className="text-lg font-semibold text-gray-900">Visión</h4>
              <p className="mt-2 text-gray-700 text-sm">
                Ser el aliado estratégico de referencia en Latinoamérica para la implementación práctica y segura de agentes de IA aplicados a negocios reales.
              </p>
            </CardContent>
          </Card>

          <Card className="border-gray-100 shadow-sm">
            <CardContent className="p-6">
              <h4 className="text-lg font-semibold text-gray-900">Valores</h4>
              <ul className="mt-3 space-y-2 text-gray-700 text-sm">
                {values.map((v) => (
                  <li key={v}>• {v}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}