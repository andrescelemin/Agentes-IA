/**
 * Hero.tsx
 * Hero de la página de Servicios de Smart Prompt.
 * - Presenta un mensaje claro de valor y CTA principal para iniciar conversación por WhatsApp.
 */

import React from 'react'
import { Button } from '../../components/ui/button'
import { Sparkles } from 'lucide-react'
import { WHATSAPP_LINK } from '../../config/contact'

/**
 * ServicesHero
 * - Encabezado principal de la página de Servicios con CTAs que conducen a WhatsApp.
 * @returns JSX.Element
 */
export default function ServicesHero(): JSX.Element {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="flex flex-col justify-between h-full">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
                Agentes de IA y automatización hechos a la medida de tu negocio
              </h1>
              <p className="mt-6 text-lg text-gray-700 max-w-2xl">
                Responde consultas, automatiza tareas repetitivas y convierte más clientes con un agente que habla
                como tu marca — todo integrado con WhatsApp.
              </p>

              <ul className="mt-6 space-y-2 text-gray-700">
                <li className="flex items-start gap-3">
                  <Sparkles className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                  <span>Atención 24/7 y respuestas consistentes.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Sparkles className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                  <span>Reduce tiempos de respuesta y mejora la conversión.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Sparkles className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                  <span>Integración directa con tu WhatsApp para no perder leads.</span>
                </li>
              </ul>
            </div>

            <div>
              <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-3">
                <Button asChild className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                    Chatear por WhatsApp
                  </a>
                </Button>

                <Button asChild variant="outline" className="bg-transparent border-blue-600 text-blue-700 hover:bg-blue-50">
                  <a href="#planes">Ver planes y servicios</a>
                </Button>
              </div>

              <p className="mt-4 text-sm text-gray-500 max-w-md">
                Mensaje rápido por WhatsApp — te respondemos en menos de 24 horas para coordinar una demo o propuesta.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}