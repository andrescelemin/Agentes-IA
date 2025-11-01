/**
 * Integrations.tsx
 * Sección de Integraciones para Home.
 * Destaca n8n, Zapier, Make y Airtable usando logos oficiales.
 */

import React from 'react'
import { Button } from '../ui/button'

/** Elemento de integración mostrado en el grid */
interface IntegrationItem {
  /** Nombre de la herramienta */
  name: string
  /** Imagen del logo (URL) */
  src: string
  /** Enlace opcional a la herramienta */
  href?: string
}

/**
 * Grid con logos de integraciones principales.
 * Mantiene tamaños consistentes, buen contraste y carga diferida de imágenes.
 */
export default function LandingIntegrations(): JSX.Element {
  const tools: IntegrationItem[] = [
    {
      name: 'n8n',
      src: 'https://pub-cdn.sider.ai/u/U04XH6E0RRN/web-coder/68902b460cd2d7c5a266e6a1/resource/bf7e423d-9cce-4fed-a9ca-426fd7e65913.png',
      href: 'https://n8n.io/',
    },
    {
      name: 'Zapier',
      src: 'https://pub-cdn.sider.ai/u/U04XH6E0RRN/web-coder/68902b460cd2d7c5a266e6a1/resource/859e6840-0f41-4abb-be5a-b94a49338287.png',
      href: 'https://zapier.com/',
    },
    {
      name: 'Make (Integromat)',
      src: 'https://pub-cdn.sider.ai/u/U04XH6E0RRN/web-coder/68902b460cd2d7c5a266e6a1/resource/73e42b9f-eb68-4662-8336-e2d2038532be.png',
      href: 'https://www.make.com/',
    },
    {
      name: 'Airtable',
      src: 'https://pub-cdn.sider.ai/u/U04XH6E0RRN/web-coder/68902b460cd2d7c5a266e6a1/resource/483941a7-235c-4fa8-a203-67e0e23ae8f3.png',
      href: 'https://www.airtable.com/',
    },
  ]

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
            Integraciones principales
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Conectamos con tus herramientas favoritas
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-700">
            Nuestros agentes de IA se integran perfectamente con las plataformas de automatización más populares
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-4">
          {tools.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center rounded-lg border border-gray-200 bg-white p-8 transition-shadow hover:shadow-sm"
              aria-label={`Abrir ${item.name} en una nueva pestaña`}
            >
              <img
                src={item.src}
                alt={`Logo de ${item.name}`}
                title={item.name}
                loading="lazy"
                className="h-28 w-auto max-w-48 object-contain"
              />
            </a>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button
            asChild
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            <a
              href="https://wa.me/51939140886"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Consultar integraciones por WhatsApp"
              data-fb-event="WhatsAppClick"
              data-fb-payload='{"source":"IntegrationsSection"}'
            >
              Consultar integraciones
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
