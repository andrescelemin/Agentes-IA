/**
 * Plans.tsx
 * Sección: Formas de trabajar contigo (planes sin precios).
 * - CTAs dirigidos a WhatsApp para facilitar el contacto inmediato.
 */

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { WHATSAPP_LINK } from '../../config/contact'

/**
 * Plans
 * - Presenta opciones de trabajo y facilita iniciar conversación por WhatsApp.
 */
export default function Plans(): JSX.Element {
  const plans = [
    {
      name: 'Emprende con IA',
      forWho: 'Para emprendedores o profesionales independientes',
      items: ['1 agente básico', 'Flujo simple', 'Soporte inicial'],
    },
    {
      name: 'Negocio en Crecimiento',
      forWho: 'Para negocios con más volumen de clientes',
      items: ['Agente avanzado', 'Automatizaciones clave', 'Soporte prioritario'],
    },
    {
      name: 'Solución a Medida',
      forWho: 'Para empresas que necesitan integraciones complejas',
      items: ['Diseño a medida', 'Integraciones específicas', 'Acompañamiento continuo'],
    },
  ]

  return (
    <section id="planes" className="py-12 sm:py-16 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-gray-900">Formas de trabajar contigo</h2>
          <p className="mt-3 text-gray-600">
            Planes claros con acompañamiento práctico: diseño del agente, configuración técnica y puesta en marcha.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((p) => (
            <Card key={p.name} className="border-gray-100 shadow-sm">
              <CardHeader className="p-6">
                <CardTitle className="text-lg font-semibold">{p.name}</CardTitle>
                <p className="mt-1 text-sm text-gray-600">{p.forWho}</p>
              </CardHeader>
              <CardContent className="p-6 flex flex-col">
                <ul className="space-y-2 text-gray-700 flex-1">
                  {p.items.map((it) => (
                    <li key={it} className="text-sm">
                      • {it}
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Button asChild className="w-full bg-gradient-to-r from-green-600 to-green-700">
                    <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                      Consultar por WhatsApp
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}