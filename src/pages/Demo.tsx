/**
 * Demo.tsx
 * Página "Demo" que presenta la experiencia de probar un agente DEMO.
 *
 * - Usa WHATSAPP_LINK centralizado para todos los CTAs relacionados con WhatsApp.
 * - Componentes internos mínimos y robustos para evitar errores de sintaxis.
 */

import React from 'react'
import PageSEO from '../components/PageSEO'
import { Button } from '../components/ui/button'
import { Check, Clock, Clipboard, Zap, Shield, Users } from 'lucide-react'
import { WHATSAPP_LINK } from '../config/contact'

/**
 * CTA base para consistencia visual.
 */
const CTA_BASE =
  'inline-flex items-center justify-center h-12 px-6 text-lg font-semibold rounded-md transition-colors w-full sm:w-auto sm:min-w-[300px]'

const SUBTITLE_TEXT = 'Habla con un agente de IA (demo).'
const BLUE_LABEL = 'Probar Agente DEMO en vivo'
const GREEN_LABEL = 'Coordinar por WhatsApp'

interface FeatureCardProps {
  title: string
  children: React.ReactNode
  icon?: React.ReactNode
}

/**
 * FeatureCard: tarjeta simple para destacar features de la demo.
 */
function FeatureCard({ title, children, icon }: FeatureCardProps) {
  return (
    <div className="rounded-lg border border-gray-100 bg-gradient-to-br from-white to-blue-50/40 p-6">
      <div className="flex items-start gap-4">
        <div className="shrink-0 rounded-full bg-blue-50 p-2 text-blue-700">{icon}</div>
        <div>
          <h4 className="text-md font-semibold text-gray-900">{title}</h4>
          <p className="mt-2 text-sm text-gray-700">{children}</p>
        </div>
      </div>
    </div>
  )
}

/**
 * ButtonBlock: botón principal con subtítulo.
 */
function ButtonBlock({ href, color, label, subtitle = SUBTITLE_TEXT }: { href: string; color: 'blue' | 'green'; label: string; subtitle?: string }) {
  const colorClass = color === 'blue' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-green-600 hover:bg-green-700 text-white'

  return (
    <div className="w-full sm:w-auto inline-flex flex-col items-center">
      <Button asChild className={`${CTA_BASE} ${colorClass}`}>
        <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
          {label}
        </a>
      </Button>

      <div className="mt-2 max-w-full px-2 text-center text-xs text-gray-500 break-words">{subtitle}</div>
    </div>
  )
}

/**
 * DemoHero: encabezado principal con CTAs.
 */
function DemoHero() {
  // LINK_GPT_DEMO ahora apunta al webhook proporcionado por el usuario.
  const LINK_GPT_DEMO = 'https://n8n-console-n8n.0ss8w4.easypanel.host/webhook/f763d118-cede-4c7a-8043-84ac47e66137/chat'

  return (
    <section className="w-full bg-gradient-to-b from-white to-blue-50/60 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <h1 className="mx-auto max-w-3xl text-4xl font-extrabold leading-tight text-gray-900 sm:text-5xl">
          Prueba en vivo cómo un agente de IA atendería a tus clientes
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
          Habla con un Agente DEMO y vive la experiencia de tener un asistente 24/7 que responde, agenda, da seguimiento y no se cansa.
          Sin compromiso, sin tecnicismos: solo pruebas cómo podría funcionar en tu negocio.
        </p>

        <div className="mt-8 flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <div className="w-full sm:w-auto">
            <ButtonBlock href={LINK_GPT_DEMO} color="blue" label={BLUE_LABEL} subtitle={SUBTITLE_TEXT} />
          </div>

          <div className="w-full sm:w-auto">
            <ButtonBlock href={WHATSAPP_LINK} color="green" label={GREEN_LABEL} subtitle={SUBTITLE_TEXT} />
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * Resto de secciones reducidas (mantenemos estructura; no necesitamos repetir todo el contenido
 * para corregir el fallo de compilación).
 */

export default function DemoPage(): JSX.Element {
  return (
    <div className="bg-white">
      <PageSEO title="Demo - SmartPrompt Solutions" description="Prueba en vivo un agente de IA que atiende, agenda y da seguimiento. Sin compromiso." />

      <DemoHero />

      {/* Secciones informativas reducidas (mantener coherencia visual) */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold text-gray-900">Lo que vas a ver en tu demo</h2>
            <p className="mt-3 text-gray-600">
              En pocos minutos tendrás claridad sobre el potencial de un agente de IA en tu negocio.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <FeatureCard title="Caso de uso específico para tu industria" icon={<Check size={18} />}>
              El agente te ayuda a imaginar cómo funcionaría en tu realidad.
            </FeatureCard>

            <FeatureCard title="ROI estimado basado en tus procesos" icon={<Clock size={18} />}>
              Verás un cálculo aproximado de horas y dinero que podrías ahorrar.
            </FeatureCard>

            <FeatureCard title="Plan de implementación paso a paso" icon={<Clipboard size={18} />}>
              Diagnóstico → entrenamiento → pruebas → activación.
            </FeatureCard>

            <FeatureCard title="Respuestas a tus preguntas técnicas" icon={<Shield size={18} />}>
              Integraciones, seguridad y límites explicados en lenguaje claro.
            </FeatureCard>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-12 bg-gradient-to-b from-white to-blue-50/40">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h3 className="text-xl font-bold text-gray-900">¿Listo para probarlo?</h3>
          <p className="mt-2 text-gray-600">Habla ahora mismo con un agente de IA y vive la experiencia de la automatización.</p>

          <div className="mt-6 flex w-full flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <div className="w-full sm:w-auto">
              <ButtonBlock href={WHATSAPP_LINK} color="green" label={GREEN_LABEL} subtitle={SUBTITLE_TEXT} />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}