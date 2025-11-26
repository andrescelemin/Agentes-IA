/**
 * ServicesGrid.tsx
 * Muestra los servicios principales como tarjetas con CTAs que abren WhatsApp.
 */

import React from 'react'
import { Card, CardContent } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { BookOpen, GitPullRequest, MessageCircle, Users } from 'lucide-react'
import { WHATSAPP_LINK } from '../../config/contact'

/**
 * Single service item interface.
 */
interface ServiceItem {
  title: string
  subtitle: string
  bullets: string[]
  note?: string
  icon: React.ComponentType<any>
}

/**
 * ServicesGrid component
 * - Lista tarjetas de servicio con CTA a WhatsApp para contacto inmediato.
 */
export default function ServicesGrid(): JSX.Element {
  const items: ServiceItem[] = [
    {
      title: 'Agente de IA personalizado',
      subtitle: 'Asistente virtual entrenado con la información de tu marca.',
      bullets: [
        'Entrenamiento con tu contenido (productos, políticas y FAQs).',
        'Tono de voz alineado a tu marca.',
        'Úsalo para soporte, ventas o reservas.',
      ],
      note:
        'Ideal para: marcas personales, estudios jurídicos, inmobiliarias, agencias, turismo y servicios profesionales.',
      icon: Users,
    },
    {
      title: 'Automatización y Workflows',
      subtitle: 'Conecta IA con procesos reales para ahorrar tiempo.',
      bullets: [
        'Mensajes automáticos según eventos (formularios, pagos, reservas).',
        'Integración con herramientas (CRMs, Google Sheets, email, APIs).',
        'Reduce trabajo manual y errores operativos.',
      ],
      note: 'Tú defines la regla, nosotros la automatizamos.',
      icon: GitPullRequest,
    },
    {
      title: 'Agentes para WhatsApp Business',
      subtitle: 'Transforma tu WhatsApp en un canal inteligente de ventas y atención.',
      bullets: [
        'Respuestas automáticas personalizadas por tipo de cliente.',
        'Precalificación de leads antes del contacto humano.',
        'Confirmaciones, recordatorios y seguimientos automáticos.',
      ],
      note: 'Implementación guiada para que no necesites experiencia técnica.',
      icon: MessageCircle,
    },
    {
      title: 'Consultoría en IA para tu operación',
      subtitle: 'Estrategia práctica para aplicar IA donde aporta ROI.',
      bullets: [
        'Diagnóstico de oportunidades de IA en tu negocio.',
        'Plan de implementación por etapas y métricas de éxito.',
        'Ajustes continuos basados en datos reales.',
      ],
      note: 'Pensado para dueños que buscan resultados medibles.',
      icon: BookOpen,
    },
  ]

  return (
    <section className="py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-gray-900">Servicios principales</h2>
          <p className="mt-3 text-gray-600">Soluciones prácticas que generan valor desde el primer día.</p>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((it) => (
            <Card key={it.title} className="border-gray-100 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50">
                    <it.icon className="h-6 w-6 text-blue-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{it.title}</h3>
                    <p className="mt-1 text-sm text-gray-600">{it.subtitle}</p>

                    <ul className="mt-3 space-y-2 text-sm text-gray-700">
                      {it.bullets.map((b) => (
                        <li key={b} className="leading-snug">• {b}</li>
                      ))}
                    </ul>

                    {it.note && <p className="mt-4 text-sm text-gray-600 italic">{it.note}</p>}

                    <div className="mt-6">
                      <Button asChild className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
                        <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                          Chatear por WhatsApp
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}