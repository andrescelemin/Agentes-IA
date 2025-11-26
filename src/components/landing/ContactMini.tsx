/**
 * Sección de contacto en línea optimizada para conversiones (tono español)
 * - Formulario corto con campos esenciales
 * - Envío directo a n8n + Airtable + respaldo en localStorage
 */

import { useState } from 'react'
import { useNavigate } from 'react-router'
import { ArrowRight, Send, CheckCircle, XCircle } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { Textarea } from '../../components/ui/textarea'
import { saveToLocalBackup } from '../../utils/storageBackup'
import { sendToDatabase } from '../../utils/databaseService'

interface MiniForm {
  name: string
  email: string
  phone?: string
  interest?: string
  message?: string
}

type FormStatus = 'idle' | 'sending' | 'success' | 'error'

export default function LandingContactMini(): JSX.Element {
  const navigate = useNavigate()
  const [data, setData] = useState<MiniForm>({ name: '', email: '' })
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const setField = (k: keyof MiniForm, v: string) => setData((p) => ({ ...p, [k]: v }))

  /**
   * Envía los datos del formulario directamente al endpoint de n8n + Airtable + respaldo
   */
  const enviarAN8n = async (): Promise<void> => {
    if (!data.name || !data.email) {
      setErrorMessage('Nombre y email son obligatorios')
      return
    }

    setStatus('sending')
    setErrorMessage('')

    const formData = {
      nombre: data.name,
      email: data.email,
      telefono: data.phone || '',
      interes: data.interest || '',
      mensaje: data.message || '',
      fuente: 'landing-home',
      fecha: new Date().toISOString(),
    }

    try {
      // Guardar respaldo inmediatamente en localStorage
      saveToLocalBackup(formData)

      // Enviar a n8n
      const response = await fetch(
        'https://wsworkflow-wsworkflow.vn0m5y.easypanel.host/form-test/d6fa6adc-8266-47c0-aef4-6d76f9efd1b7',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      )

      // Enviar a Airtable en segundo plano (no bloqueante)
      sendToDatabase(formData, 'airtable').then(result => {
        if (!result.success) {
          console.warn('Error enviando a Airtable:', result.error)
        } else {
          console.log('Datos enviados exitosamente a Airtable')
        }
      })

      if (response.ok) {
        setStatus('success')
        // Resetear formulario después de éxito
        setTimeout(() => {
          setData({ name: '', email: '' })
          setStatus('idle')
        }, 3000)
      } else {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }
    } catch (error) {
      setStatus('error')
      setErrorMessage(
        error instanceof Error 
          ? error.message 
          : 'Error al enviar el formulario. Los datos se guardaron localmente como respaldo.'
      )
    }
  }

  /**
   * Redirige al formulario completo con datos prellenados
   */
  const irAlFormularioCompleto = (): void => {
    const params = new URLSearchParams()
    params.set('from', 'home-mini')
    if (data.name) params.set('name', data.name)
    if (data.interest) params.set('focus', data.interest)
    if (data.message) params.set('process', data.message.slice(0, 80))
    navigate(`/contact?${params.toString()}`)
  }

  return (
    <section className="py-20 sm:py-24" aria-label="Contacto rápido">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">¿Listo para despegar?</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Agenda una consulta gratuita de 60 minutos. Te llevamos de la idea a la ejecución con ROI real.
          </p>
        </div>

        <Card className="mx-auto mt-12 max-w-3xl border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-blue-900">Solicita tu consulta gratuita</CardTitle>
            <CardDescription className="text-blue-700">
              {status === 'success' 
                ? '¡Formulario enviado correctamente!' 
                : 'Respuesta en menos de 2 horas. Sin compromiso.'
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {status === 'success' ? (
              <div className="text-center py-8">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-green-800 mb-2">¡Mensaje Enviado!</h3>
                <p className="text-green-600">
                  Te contactaremos en menos de 2 horas. Mientras tanto, puedes explorar nuestras soluciones.
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="mini-nombre">Nombre *</Label>
                    <Input
                      id="mini-nombre"
                      required
                      value={data.name}
                      onChange={(e) => setField('name', e.target.value)}
                      className="mt-2"
                      placeholder="Tu nombre"
                      disabled={status === 'sending'}
                    />
                  </div>
                  <div>
                    <Label htmlFor="mini-email">Email laboral *</Label>
                    <Input
                      id="mini-email"
                      type="email"
                      required
                      value={data.email}
                      onChange={(e) => setField('email', e.target.value)}
                      className="mt-2"
                      placeholder="tu@empresa.com"
                      disabled={status === 'sending'}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="mini-telefono">Teléfono / WhatsApp (opcional)</Label>
                    <Input
                      id="mini-telefono"
                      type="tel"
                      value={data.phone || ''}
                      onChange={(e) => setField('phone', e.target.value)}
                      className="mt-2"
                      placeholder="+51 939 140 886"
                      disabled={status === 'sending'}
                    />
                  </div>
                  <div>
                    <Label htmlFor="mini-interes">Interés principal</Label>
                    <Select 
                      value={data.interest || ''} 
                      onValueChange={(v) => setField('interest', v)}
                      disabled={status === 'sending'}
                    >
                      <SelectTrigger id="mini-interes" className="mt-2">
                        <SelectValue placeholder="Selecciona una opción" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Evaluación gratuita">Evaluación gratuita</SelectItem>
                        <SelectItem value="Desarrollo de prompts">Desarrollo de prompts</SelectItem>
                        <SelectItem value="GPT completo">GPT completo</SelectItem>
                        <SelectItem value="Suscripción mensual">Suscripción mensual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="mini-mensaje">Objetivo (breve)</Label>
                  <Textarea
                    id="mini-mensaje"
                    rows={3}
                    value={data.message || ''}
                    onChange={(e) => setField('message', e.target.value)}
                    className="mt-2"
                    placeholder="Cuéntanos en una línea qué te gustaría lograr..."
                    disabled={status === 'sending'}
                  />
                </div>

                {errorMessage && (
                  <div className="flex items-center gap-2 text-red-600 text-sm">
                    <XCircle className="h-4 w-4" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
                  <Button
                    onClick={irAlFormularioCompleto}
                    disabled={status === 'sending'}
                    variant="outline"
                    className="w-full sm:w-auto bg-transparent"
                    aria-label="Continuar al formulario completo"
                  >
                    Continuar al formulario
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Button>
                  <Button
                    onClick={enviarAN8n}
                    disabled={!data.name || !data.email || status === 'sending'}
                    className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    aria-label="Enviar formulario ahora"
                  >
                    {status === 'sending' ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        Enviar ahora
                        <Send className="ml-2 h-4 w-4" aria-hidden="true" />
                      </>
                    )}
                  </Button>
                </div>

                <p className="text-xs text-blue-800">
                  ¿Prefieres WhatsApp? Inicia un chat mediante el enlace en el pie de página.
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
