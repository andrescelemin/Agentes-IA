/**
 * src/pages/Contact.tsx
 * Página "Contacto" para SmartPrompt Solutions.
 *
 * - Presenta un hero con CTA a un formulario externo.
 * - Muestra "Otras formas de contactar" con tarjetas centradas y botones alineados.
 * - Cumple las reglas de estilo y accesibilidad del proyecto.
 */

import React from 'react'
import PageSEO from '../components/PageSEO'
import { Button } from '../components/ui/button'
import { Mail, Phone, Calendar, CheckCircle } from 'lucide-react'

/**
 * Enlaces y datos externos (reemplaza por valores reales si los tienes).
 */
const FORM_LINK =
  'https://n8n-n8n.vn0m5y.easypanel.host/form/4baaef16-e9c0-4530-856e-98c7f278eace'
const LINK_WHATSAPP = '{{LINK_WHATSAPP}}'
const CORREO_SMARTPROMPT = '{{CORREO_SMARTPROMPT}}'
const LINK_CALENDLY = '{{LINK_CALENDLY_O_SIMILAR}}'

/**
 * CTA_HERO
 * Estilo para el botón principal del hero (más prominente).
 */
const CTA_HERO =
  'inline-flex items-center justify-center h-12 px-6 text-lg font-semibold rounded-md transition-colors w-full sm:w-auto sm:min-w-[300px]'

/**
 * CTA_OPTION
 * Estilo reducido y consistente para los botones de las opciones.
 */
const CTA_OPTION =
  'inline-flex items-center justify-center h-9 px-4 text-sm font-medium rounded-md transition-colors w-full sm:w-[240px]'

/**
 * ContactOptionProps
 * Props para renderizar una opción de contacto.
 */
interface ContactOptionProps {
  title: string
  description: string
  href?: string
  icon?: React.ReactNode
  variant?: 'primary' | 'outline'
  ariaLabel?: string
  buttonLabel?: string
}

/**
 * ContactOption
 * Tarjeta que muestra una forma alternativa de contacto.
 * - Contenido centrado y botón con tamaño reducido y fijo en desktop para alineación.
 */
function ContactOption({
  title,
  description,
  href,
  icon,
  variant = 'outline',
  ariaLabel,
  buttonLabel,
}: ContactOptionProps): JSX.Element {
  const isOutline = variant === 'outline'

  /**
   * buttonClass
   * Asegura que la variante outline incluya bg-transparent (OutlineButtonFix).
   */
  const buttonClass = isOutline
    ? `${CTA_OPTION} bg-transparent border border-gray-200 text-gray-800 hover:bg-gray-50`
    : `${CTA_OPTION} bg-green-600 hover:bg-green-700 text-white`

  return (
    <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm flex flex-col items-center text-center">
      <div className="rounded-md bg-indigo-50 p-3 text-indigo-700 flex items-center justify-center mb-4">
        {icon}
      </div>

      <h4 className="text-lg font-semibold text-gray-900">{title}</h4>
      <p className="mt-2 text-sm text-gray-600 max-w-[22rem]">{description}</p>

      {href ? (
        <div className="mt-6 w-full flex justify-center">
          {/* El contenedor centraliza el botón y fuerza el ancho sm:w-[240px] en desktop */}
          <div className="w-full sm:w-[240px]">
            <a href={href} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel}>
              <Button variant={isOutline ? 'outline' : undefined} className={buttonClass}>
                {buttonLabel ??
                  (title.includes('WhatsApp')
                    ? 'Escribir'
                    : title.includes('Correo')
                    ? 'Enviar correo'
                    : 'Agendar')}
              </Button>
            </a>
          </div>
        </div>
      ) : null}
    </div>
  )
}

/**
 * ContactHero
 * Hero principal con título, subtítulo, texto de confianza y CTA a formulario externo.
 */
function ContactHero(): JSX.Element {
  return (
    <section className="bg-gradient-to-b from-white to-blue-50/40 py-20">
      <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900">
          Hablemos sobre tu próximo agente de IA
        </h1>

        <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
          Cuéntanos brevemente sobre tu negocio y te ayudamos a ver si un agente de IA puede ahorrarte
          tiempo, dinero y trabajo. Responderemos lo antes posible con opciones claras para ti.
        </p>

        <div className="mt-4 inline-flex items-center justify-center gap-3">
          <div className="rounded-full bg-white px-4 py-1.5 text-sm text-gray-700 shadow-sm flex items-center gap-2">
            <span className="text-lg">📩</span>
            <span>Tiempo de respuesta habitual: entre 24 y 48 horas hábiles.</span>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '1.5rem' }} className="mt-8">
          <a
            href={FORM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Quiero dejar mis datos"
            className="inline-block"
          >
            <Button className={`${CTA_HERO} bg-blue-600 hover:bg-blue-700 text-white`}>
              Quiero dejar mis datos
            </Button>
          </a>

          <p className="mt-3 text-sm text-gray-500 max-w-xl mx-auto">
            Completa un formulario rápido y te contactamos con una propuesta clara.
          </p>
        </div>
      </div>
    </section>
  )
}

/**
 * NextSteps
 * Explica qué pasa después de que el usuario deja sus datos.
 */
function NextSteps(): JSX.Element {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="rounded-lg border border-gray-100 bg-gradient-to-br from-white to-indigo-50 p-6">
          <div className="flex items-start gap-4">
            <div className="mt-1">
              <CheckCircle className="text-indigo-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">¿Qué pasa después de enviar el formulario?</h3>
              <ul className="mt-3 space-y-2 text-gray-700 list-inside">
                <li>1. Revisamos la información que envías para entender tu caso.</li>
                <li>2. Te proponemos opciones claras y realistas sobre cómo un agente de IA puede ayudarte.</li>
                <li>3. Si te interesa, agendamos una llamada de diagnóstico y entregamos un plan y estimado de costo/ROI.</li>
              </ul>

              <p className="mt-3 text-sm text-gray-600">
                No hay compromiso al completar el formulario. Nuestro enfoque es ofrecer opciones prácticas y comprensibles.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * ContactPage
 * Página principal exportada que junta las secciones de contacto.
 */
export default function ContactPage(): JSX.Element {
  return (
    <div className="bg-white min-h-screen">
      <PageSEO
        title="Contacto - SmartPrompt Solutions"
        description="Contacta a SmartPrompt: deja tus datos en un formulario, escríbenos por WhatsApp o envíanos un correo. Respuesta en 24-48h hábiles."
      />

      <ContactHero />

      <section className="py-12">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center">Otras formas de contactar a Smart Prompt</h2>
          <p className="mt-2 text-center text-gray-600 max-w-2xl mx-auto">
            Si prefieres una vía distinta al formulario, elige la opción que mejor te acomode.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <ContactOption
              title="WhatsApp - Escríbenos por WhatsApp"
              description="Ideal si quieres resolver dudas rápidas o coordinar una demo."
              href={LINK_WHATSAPP}
              icon={<Phone size={20} className="text-green-600" />}
              variant="primary"
              ariaLabel="Abrir WhatsApp"
              buttonLabel="Escribir"
            />

            <ContactOption
              title="Correo electrónico"
              description="Si prefieres algo más detallado, puedes escribirnos directamente."
              href={`mailto:${CORREO_SMARTPROMPT}`}
              icon={<Mail size={20} className="text-indigo-600" />}
              variant="outline"
              ariaLabel="Enviar correo"
              buttonLabel="Enviar correo"
            />

            <ContactOption
              title="Agenda una llamada de 20 minutos"
              description="Elige el día y la hora que mejor te quede para que revisemos tu caso."
              href={LINK_CALENDLY}
              icon={<Calendar size={20} className="text-indigo-600" />}
              variant="outline"
              ariaLabel="Agendar llamada"
              buttonLabel="Agendar"
            />
          </div>
        </div>
      </section>

      <NextSteps />

      <footer className="py-12">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} SmartPrompt Solutions. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  )
}