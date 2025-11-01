/**
 * Chatbot de asistencia (Asistente Virtual) con prompt guiado para Smart Fox
 * - Responde de forma profesional y cercana.
 * - Informa sobre los servicios según el sitio oficial.
 * - Gestiona citas dirigiendo a las páginas del sitio y a WhatsApp.
 *
 * UI:
 * - Burbuja flotante para abrir/cerrar.
 * - Ventana con historial, input y CTAs contextuales en mensajes del asistente.
 *
 * Accesibilidad:
 * - Botones con focus-visible y labels.
 * - Contraste adecuado.
 */

import { useState } from 'react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Send, MessageCircle, X } from 'lucide-react'

/**
 * Mensaje del chat, admite acciones opcionales para mostrar botones de CTA
 */
interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
  actions?: Array<{
    /** Texto del botón */
    label: string
    /** URL a la que dirige el botón */
    href: string
    /** Abrir en nueva pestaña, por defecto true para externos */
    newTab?: boolean
    /** Estilo visual del botón */
    tone?: 'primary' | 'secondary'
  }>
}

/**
 * Prompt del sistema (referencia interna):
 * Eres el asistente virtual de Smart Fox. Tu función es:
 * 1. Atender a los usuarios de manera profesional y cercana.
 * 2. Informar sobre los servicios de Smart Fox y según su sitio web y la información que allí contiene:
 *    👉 https://agentes-inteligencia-artificial.pages.dev/
 *    Gestionar citas de clientes dirigiéndolos a los links/páginas del sitio web que conectan con WhatsApp.
 */
const SYSTEM_PROMPT = `Eres el asistente virtual de Smart Fox AI. Atiendes de manera profesional y cercana, informas sobre servicios según el sitio oficial y gestionas citas dirigiendo a páginas que conectan con WhatsApp: https://agentes-inteligencia-artificial.pages.dev/`

/** URLs útiles conocidas (ajústalas si tienes enlaces oficiales específicos) */
const SITE_URL = 'https://agentes-inteligencia-artificial.pages.dev/'
const WHATSAPP_URL = 'https://wa.me/51939140886'

/**
 * Genera una respuesta automática simple basada en la intención del usuario.
 * - Sin dependencias externas. Heurística por palabras clave en español.
 */
function generateBotResponse(userText: string): Omit<Message, 'id' | 'timestamp' | 'isUser'> {
  const text = userText.toLowerCase()

  // Intención: agendar, citas, demo, reunión
  if (/(cita|agendar|agenda|demo|reunir|reunión|reunion|llamada)/i.test(text)) {
    return {
      text:
        '¡Perfecto! Puedo ayudarte a agendar una consulta con Smart Fox AI. Puedes iniciar la conversación por WhatsApp para confirmar fecha y hora.',
      actions: [
        { label: 'Contactar por WhatsApp', href: WHATSAPP_URL, newTab: true, tone: 'primary' },
        { label: 'Ver sitio Smart Fox AI', href: SITE_URL, newTab: true, tone: 'secondary' },
      ],
    }
  }

  // Intención: servicios / qué hacen
  if (/(servicio|servicios|que hacen|qué hacen|ofrecen|ofrecen|soluciones)/i.test(text)) {
    return {
      text:
        'Smart Fox AI ofrece soluciones de agentes de IA y workflows de automatización a medida. Te invito a revisar el detalle de servicios en el sitio, y si deseas te conecto directo con el equipo por WhatsApp.',
      actions: [
        { label: 'Ver servicios y casos', href: SITE_URL, newTab: true, tone: 'primary' },
        { label: 'Hablar por WhatsApp', href: WHATSAPP_URL, newTab: true, tone: 'secondary' },
      ],
    }
  }

  // Intención: precios / costos
  if (/(precio|precios|costo|costos|tarifa|tarifas|cuánto|cuanto)/i.test(text)) {
    return {
      text:
        'Los precios dependen del alcance y complejidad de cada proyecto. Podemos darte una estimación rápida tras una breve llamada o chat por WhatsApp.',
      actions: [
        { label: 'Solicitar estimación por WhatsApp', href: WHATSAPP_URL, newTab: true, tone: 'primary' },
        { label: 'Ver sitio Smart Fox', href: SITE_URL, newTab: true, tone: 'secondary' },
      ],
    }
  }

  // General / fallback
  return {
    text:
      'Soy el Asistente Virtual de Smart Fox. Puedo contarte sobre nuestros servicios de IA y ayudarte a coordinar una cita. ¿Qué te gustaría lograr?',
    actions: [
      { label: 'Contactar por WhatsApp', href: WHATSAPP_URL, newTab: true, tone: 'primary' },
      { label: 'Ver sitio Smart Fox', href: SITE_URL, newTab: true, tone: 'secondary' },
    ],
  }
}

/**
 * Renderiza un grupo de botones de acción de un mensaje del asistente.
 * Se usa Button de shadcn como contenedor de enlaces externos.
 */
function Actions({ actions }: { actions?: Message['actions'] }): JSX.Element | null {
  if (!actions || actions.length === 0) return null
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {actions.map((a, idx) => (
        <Button
          key={`${a.href}-${idx}`}
          asChild
          className={
            a.tone === 'secondary'
              ? 'border border-blue-600 bg-white text-blue-700 hover:bg-blue-50'
              : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700'
          }
          aria-label={a.label}
        >
          <a href={a.href} target={a.newTab !== false ? '_blank' : undefined} rel="noopener noreferrer">
            {a.label}
          </a>
        </Button>
      ))}
    </div>
  )
}

/**
 * Componente principal del Asistente Virtual
 */
export default function Chatbot(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      text:
        '¡Hola! Soy el Asistente Virtual de Smart Fox AI. Puedo ayudarte a conocer nuestros agentes de IA y workflows, y a agendar una cita. ¿Qué necesitas hoy?',
      isUser: false,
      timestamp: new Date(),
      actions: [
        { label: 'Contactar por WhatsApp', href: WHATSAPP_URL, newTab: true, tone: 'primary' },
        { label: 'Ver sitio Smart Fox', href: SITE_URL, newTab: true, tone: 'secondary' },
      ],
    },
  ])
  const [inputText, setInputText] = useState('')

  /** Envía el mensaje del usuario y genera respuesta automática */
  const handleSendMessage = () => {
    if (!inputText.trim()) return

    // Mensaje del usuario
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    }
    setMessages(prev => [...prev, userMessage])
    setInputText('')

    // Respuesta del asistente basada en el prompt y reglas simples
    setTimeout(() => {
      const generated = generateBotResponse(userMessage.text)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: generated.text,
        isUser: false,
        timestamp: new Date(),
        actions: generated.actions,
      }
      setMessages(prev => [...prev, botMessage])
    }, 600)
  }

  /** Enviar con Enter */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Botón flotante del chatbot */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg hover:from-blue-700 hover:to-indigo-700 z-50"
          aria-label="Abrir chat de asistencia"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Ventana del chatbot */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-80 sm:w-96 shadow-2xl border border-blue-200 z-50">
          <CardHeader className="pb-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Asistente Virtual
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 text-white hover:bg-white/20"
                aria-label="Cerrar chat"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {/* Área de mensajes */}
            <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {/* Nota: el SYSTEM_PROMPT no se muestra, solo guía la respuesta */}
              {messages.map(message => (
                <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.isUser
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    {!message.isUser && <Actions actions={message.actions} />}
                    <p className={`text-xs mt-2 ${message.isUser ? 'text-blue-100' : 'text-gray-500'}`}>
                      {message.timestamp.toLocaleTimeString('es-ES', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input para escribir */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex gap-2">
                <Input
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Escribe tu mensaje..."
                  className="flex-1"
                  aria-label="Escribe tu mensaje"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim()}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  aria-label="Enviar mensaje"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">Responde en menos de 2 minutos</p>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}
