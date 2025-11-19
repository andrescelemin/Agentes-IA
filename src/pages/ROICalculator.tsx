/**
 * ROICalculator.tsx
 * Calculadora de ROI reescrita según las especificaciones del cliente:
 * - Paso 1: describir equipo y tiempo
 * - Paso 2: estimar ahorro con IA (incluye nivel de uso)
 * - Paso 3: seleccionar plan y configuración inicial
 * - Bloque de resultados con tiempo, dinero y ROI
 *
 * Añadidas validaciones y mensajes inline sin cambiar la estructura.
 */

import React, { useMemo, useState } from 'react'
import PageSEO from '../components/PageSEO'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Button } from '../components/ui/button'

/**
 * Tipos y constantes
 */

/**
 * PlanInfo
 * Describe la información que guarda cada plan disponible.
 */
interface PlanInfo {
  key: 'Starter' | 'Standard' | 'Advanced'
  label: string
  monthly: number
  description?: string
}

/**
 * ROIState
 * Estado principal de la calculadora con los campos que ingresan los usuarios.
 */
interface ROIState {
  n_personas: number
  horas_semana_por_persona: number
  costo_hora: number
  tipo_negocio: string
  pct_tiempo_ahorrado: number
  nivel_uso: 'Bajo' | 'Medio' | 'Alto'
  plan: PlanInfo['key']
  costo_setup: number
}

/**
 * ValidationErrors
 * Mensajes de validación por campo.
 */
interface ValidationErrors {
  n_personas?: string
  horas_semana_por_persona?: string
  costo_hora?: string
  pct_tiempo_ahorrado?: string
  costo_setup?: string
}

/**
 * factorDeUso
 * Asocia el nivel de uso con el factor requerido por la fórmula.
 */
const factorDeUsoMap: Record<ROIState['nivel_uso'], number> = {
  Bajo: 0.6,
  Medio: 0.8,
  Alto: 1,
}

/**
 * planes disponibles
 */
const PLANS: PlanInfo[] = [
  { key: 'Starter', label: 'Starter – 149 US$/mes', monthly: 149 },
  { key: 'Standard', label: 'Standard – 349 US$/mes', monthly: 349 },
  { key: 'Advanced', label: 'Advanced – 749 US$/mes', monthly: 749 },
]

/**
 * Formateador de moneda USD
 * @param n número a formatear
 */
function fmtUSD(n: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n || 0)
}

/**
 * Componente principal de la página de calculadora de ROI.
 *
 * Muestra el flujo en 3 pasos y el bloque de resultados con métricas y explicaciones.
 * Agrega validaciones y mensajes inline sin alterar la estructura solicitada.
 */
export default function ROICalculatorPage(): JSX.Element {
  const [state, setState] = useState<ROIState>({
    n_personas: 3,
    horas_semana_por_persona: 10,
    costo_hora: 8,
    tipo_negocio: '',
    pct_tiempo_ahorrado: 30,
    nivel_uso: 'Medio',
    plan: 'Starter',
    costo_setup: 1200,
  })

  /**
   * setField
   * Actualiza un campo del estado de forma segura.
   * @param key campo a actualizar
   * @param value nuevo valor
   */
  const setField = <K extends keyof ROIState>(key: K, value: ROIState[K]) => {
    setState((p) => ({ ...p, [key]: value }))
  }

  /**
   * validations
   * Calcula mensajes de validación para mostrar inline en la UI.
   */
  const validations: ValidationErrors = useMemo(() => {
    const errs: ValidationErrors = {}
    if (!Number.isFinite(state.n_personas) || state.n_personas <= 0) {
      errs.n_personas = 'Ingresa al menos 1 persona para calcular el ahorro.'
    }
    if (!Number.isFinite(state.horas_semana_por_persona) || state.horas_semana_por_persona < 0) {
      errs.horas_semana_por_persona = 'Ingresa horas válidas (0 o más).'
    }
    if (!Number.isFinite(state.costo_hora) || state.costo_hora < 0) {
      errs.costo_hora = 'Ingresa un costo por hora válido (0 o más).'
    }
    if (!Number.isFinite(state.pct_tiempo_ahorrado) || state.pct_tiempo_ahorrado < 0 || state.pct_tiempo_ahorrado > 100) {
      errs.pct_tiempo_ahorrado = 'Ingresa un porcentaje entre 0 y 100.'
    }
    if (!Number.isFinite(state.costo_setup) || state.costo_setup < 0) {
      errs.costo_setup = 'Ingresa un costo de configuración válido (0 o más).'
    }
    return errs
  }, [state])

  /**
   * hasErrors
   * Determina si existen errores críticos que impidan proceder.
   */
  const hasErrors = useMemo(() => Object.keys(validations).length > 0, [validations])

  /**
   * Cálculos principales (fórmulas según la especificación)
   * Devuelve todas las métricas necesarias para mostrar en la UI.
   */
  const results = useMemo(() => {
    const {
      n_personas,
      horas_semana_por_persona,
      costo_hora,
      pct_tiempo_ahorrado,
      nivel_uso,
      plan,
      costo_setup,
    } = state

    const factor_de_uso = factorDeUsoMap[nivel_uso]

    // 1) Tiempo
    const horas_totales_semana = Math.max(0, n_personas) * Math.max(0, horas_semana_por_persona)
    const porcentaje_ahorro_efectivo = (Math.max(0, pct_tiempo_ahorrado) * factor_de_uso) / 100

    const horas_ahorradas_semana = horas_totales_semana * porcentaje_ahorro_efectivo
    const horas_ahorradas_mes = horas_ahorradas_semana * 4.33
    const horas_ahorradas_anho = horas_ahorradas_semana * 52

    // 2) Dinero
    const costo_semanal_actual = Math.max(0, n_personas) * Math.max(0, horas_semana_por_persona) * Math.max(0, costo_hora)
    const costo_mensual_actual = costo_semanal_actual * 4.33
    const costo_anual_actual = costo_semanal_actual * 52

    const ahorro_semanal = costo_semanal_actual * porcentaje_ahorro_efectivo
    const ahorro_mensual = ahorro_semanal * 4.33
    const ahorro_anual = ahorro_semanal * 52

    // 3) Inversión y retorno
    const planInfo = PLANS.find((p) => p.key === plan)!
    const precio_plan_mensual = planInfo.monthly
    const costo_total_primer_anho = costo_setup + precio_plan_mensual * 12

    const ganancia_neta_mensual = ahorro_mensual - precio_plan_mensual
    const ganancia_neta_anual = ahorro_anual - costo_total_primer_anho

    const payback_meses = ganancia_neta_mensual > 0 ? costo_setup / ganancia_neta_mensual : Infinity

    const roi_anual_porcentaje =
      costo_total_primer_anho > 0 ? ((ahorro_anual - costo_total_primer_anho) / costo_total_primer_anho) * 100 : 0

    return {
      factor_de_uso,
      horas_totales_semana,
      porcentaje_ahorro_efectivo,
      horas_ahorradas_semana,
      horas_ahorradas_mes,
      horas_ahorradas_anho,
      costo_semanal_actual,
      costo_mensual_actual,
      costo_anual_actual,
      ahorro_semanal,
      ahorro_mensual,
      ahorro_anual,
      precio_plan_mensual,
      costo_total_primer_anho,
      ganancia_neta_mensual,
      ganancia_neta_anual,
      payback_meses,
      roi_anual_porcentaje,
      planInfo,
    }
  }, [state])

  const {
    horas_ahorradas_semana,
    horas_ahorradas_mes,
    ahorro_mensual,
    ahorro_anual,
    ganancia_neta_mensual,
    payback_meses,
    roi_anual_porcentaje,
    costo_mensual_actual,
    planInfo,
  } = results

  return (
    <div className="bg-white">
      <PageSEO
        title="Calculadora de ROI | SmartPrompt Solutions"
        description="Calcula tu ROI en minutos. Estimamos costos actuales por rol, proyectamos ahorros y mostramos tu recuperación con Agentes de IA especializados."
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-800">
            Calculadora de ROI
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Calcula cuánto tiempo y dinero puede ahorrar la IA en tu equipo
          </h1>
          <p className="mt-3 text-lg leading-7 text-gray-600">
            Completa 3 pasos simples: describe tu equipo, estima cuánto puede ayudar la IA y elige un plan. Los resultados
            se actualizan en tiempo real.
          </p>
        </div>
      </section>

      {/* Formulario y resultados */}
      <section className="py-12">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 lg:grid-cols-3 lg:px-8">
          {/* Formulario - ocupa 2 columnas en desktop */}
          <div className="lg:col-span-2 space-y-6">
            {/* Paso 1 */}
            <Card>
              <CardHeader>
                <CardTitle>1 — Tu equipo y tus horas de trabajo</CardTitle>
                <CardDescription>Describe quién hace las tareas repetitivas y cuánto tiempo dedican.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <Label>Personas en tu equipo</Label>
                    <Input
                      type="number"
                      placeholder="Ej: 3"
                      className="mt-2"
                      min={0}
                      value={state.n_personas}
                      onChange={(e) => setField('n_personas', Number(e.target.value))}
                      aria-invalid={!!validations.n_personas}
                      aria-describedby={validations.n_personas ? 'err-n-personas' : undefined}
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Incluye a quienes responden mensajes, correos, hacen seguimiento, agenda, etc.
                    </p>
                    {validations.n_personas && (
                      <p id="err-n-personas" className="mt-1 text-xs text-red-600">
                        {validations.n_personas}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label>Horas a la semana (por persona)</Label>
                    <Input
                      type="number"
                      placeholder="Ej: 10"
                      className="mt-2"
                      min={0}
                      value={state.horas_semana_por_persona}
                      onChange={(e) => setField('horas_semana_por_persona', Number(e.target.value))}
                      aria-invalid={!!validations.horas_semana_por_persona}
                      aria-describedby={validations.horas_semana_por_persona ? 'err-horas' : undefined}
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Horas que cada persona dedica a tareas repetitivas o de atención al cliente.
                    </p>
                    {validations.horas_semana_por_persona && (
                      <p id="err-horas" className="mt-1 text-xs text-red-600">
                        {validations.horas_semana_por_persona}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label>Costo por hora (USD)</Label>
                    <Input
                      type="number"
                      placeholder="Ej: 8"
                      className="mt-2"
                      min={0}
                      value={state.costo_hora}
                      onChange={(e) => setField('costo_hora', Number(e.target.value))}
                      aria-invalid={!!validations.costo_hora}
                      aria-describedby={validations.costo_hora ? 'err-costo-hora' : undefined}
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Costo aproximado por hora de esa persona (salario + cargas y otros costos).
                    </p>
                    {validations.costo_hora && (
                      <p id="err-costo-hora" className="mt-1 text-xs text-red-600">
                        {validations.costo_hora}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label>Tipo de negocio (opcional)</Label>
                    <Input
                      type="text"
                      placeholder="Ej: Estudio jurídico, inmobiliaria, turismo..."
                      className="mt-2"
                      value={state.tipo_negocio}
                      onChange={(e) => setField('tipo_negocio', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Paso 2 */}
            <Card>
              <CardHeader>
                <CardTitle>2 — Ahorro de tiempo con IA</CardTitle>
                <CardDescription>Estimemos cuánto tiempo podría automatizar la IA y con qué intensidad se usará.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <Label>% de tiempo que puede ahorrar la IA</Label>
                    <Input
                      type="number"
                      placeholder="Ej: 30"
                      className="mt-2"
                      min={0}
                      max={100}
                      value={state.pct_tiempo_ahorrado}
                      onChange={(e) => setField('pct_tiempo_ahorrado', Number(e.target.value))}
                      aria-invalid={!!validations.pct_tiempo_ahorrado}
                      aria-describedby={validations.pct_tiempo_ahorrado ? 'err-pct' : undefined}
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Si no estás seguro, puedes usar entre 20% y 40% como estimación inicial.
                    </p>
                    {validations.pct_tiempo_ahorrado && (
                      <p id="err-pct" className="mt-1 text-xs text-red-600">
                        {validations.pct_tiempo_ahorrado}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label>Nivel de uso del agente de IA</Label>
                    <Select
                      value={state.nivel_uso}
                      onValueChange={(v) => setField('nivel_uso', v as ROIState['nivel_uso'])}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Selecciona nivel de uso" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Bajo">Bajo (lo usamos de vez en cuando)</SelectItem>
                        <SelectItem value="Medio">Medio (uso frecuente)</SelectItem>
                        <SelectItem value="Alto">Alto (uso diario)</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="mt-1 text-xs text-gray-500">
                      El nivel de uso ajusta el impacto real de la IA: Bajo (0.6), Medio (0.8), Alto (1).
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Paso 3 */}
            <Card>
              <CardHeader>
                <CardTitle>3 — Inversión en tu agente de IA</CardTitle>
                <CardDescription>Elige un plan y define la configuración inicial (trabajo único).</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Elige tu plan</Label>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {PLANS.map((p) => {
                      const selected = state.plan === p.key
                      return (
                        <Button
                          key={p.key}
                          variant={selected ? undefined : 'outline'}
                          className={`${
                            selected
                              ? 'bg-gradient-to-r from-green-600 to-green-700 text-white'
                              : 'bg-transparent border-gray-300 text-gray-700'
                          } px-4 py-2 text-sm`}
                          onClick={() => setField('plan', p.key)}
                        >
                          {p.label}
                        </Button>
                      )
                    })}
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    El campo "Suscripción mensual" no se muestra porque el precio se aplica según el plan elegido.
                  </p>
                </div>

                <div>
                  <Label>Configuración inicial (único)</Label>
                  <Input
                    type="number"
                    placeholder="Ej: 1200"
                    className="mt-2"
                    min={0}
                    value={state.costo_setup}
                    onChange={(e) => setField('costo_setup', Number(e.target.value))}
                    aria-invalid={!!validations.costo_setup}
                    aria-describedby={validations.costo_setup ? 'err-setup' : undefined}
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Trabajo inicial de análisis, entrenamiento e integración del agente. Si no aplica, deja 0.
                  </p>
                  {validations.costo_setup && (
                    <p id="err-setup" className="mt-1 text-xs text-red-600">
                      {validations.costo_setup}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Detalle técnico - fórmulas */}
            <details className="rounded-lg border border-gray-100 bg-gray-50 p-4 text-sm">
              <summary className="cursor-pointer font-medium">Ver fórmulas y variables técnicas</summary>
              <div className="mt-2 text-xs text-gray-700">
                <p className="mt-2">
                  Variables de entrada: n_personas, horas_semana_por_persona, costo_hora, %_tiempo_ahorrado, nivel_uso,
                  plan, costo_setup.
                </p>
                <p className="mt-2">
                  Factor de uso: Bajo=0.6, Medio=0.8, Alto=1.
                </p>
                <p className="mt-2">
                  Horas: horas_totales_semana = n_personas × horas_semana_por_persona. porcentaje_ahorro_efectivo =
                  %_tiempo_ahorrado × factor_de_uso / 100.
                </p>
                <p className="mt-2">
                  Tiempo ahorrado: horas_ahorradas_semana = horas_totales_semana × porcentaje_ahorro_efectivo. mes x4.33.
                </p>
                <p className="mt-2">
                  Dinero: costo_semanal_actual = n_personas × horas_semana_por_persona × costo_hora. ahorro_mensual =
                  ahorro_semanal × 4.33.
                </p>
                <p className="mt-2">
                  Inversión: ganancia_neta_mensual = ahorro_mensual − precio_plan_mensual. payback_meses =
                  costo_setup / ganancia_neta_mensual (si ganancia_neta_mensual &gt; 0). ROI anual según la fórmula:
                  (ahorro_anual − costo_total_primer_anho) / costo_total_primer_anho × 100.
                </p>
              </div>
            </details>
          </div>

          {/* Resultados - derecha */}
          <div className="space-y-6">
            <Card className="border-green-100">
              <CardHeader>
                <CardTitle>Resultados para tu negocio</CardTitle>
                <CardDescription>Esto es lo que podrías ahorrar si implementas un agente de IA con los datos que ingresaste.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Tiempo recuperado */}
                <div className="rounded-lg border p-4">
                  <div className="text-sm text-gray-600">Tiempo que recupera tu equipo</div>
                  <div className="mt-2 flex items-baseline justify-between gap-4">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{Math.round(horas_ahorradas_semana * 10) / 10} h/semana</div>
                      <div className="text-sm text-gray-600">≈ {Math.round(horas_ahorradas_mes * 10) / 10} horas al mes</div>
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-gray-600">
                    Tu equipo recuperaría alrededor de {Math.round(horas_ahorradas_mes * 10) / 10} horas al mes para enfocarse en tareas de mayor valor, ventas o atención personalizada.
                  </p>
                </div>

                {/* Ahorros en dinero */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-1">
                  <div className="rounded-lg border bg-white p-3">
                    <div className="text-xs text-gray-600">Ahorro bruto mensual</div>
                    <div className="mt-1 text-xl font-semibold text-gray-900">{fmtUSD(ahorro_mensual)}</div>
                    <p className="mt-2 text-xs text-gray-600">
                      Es el valor aproximado que hoy estás gastando en tareas que la IA puede automatizar.
                    </p>
                  </div>

                  <div className="rounded-lg border bg-white p-3">
                    <div className="text-xs text-gray-600">Ahorro neto mensual</div>
                    <div className="mt-1 text-xl font-semibold text-gray-900">{fmtUSD(ganancia_neta_mensual)}</div>
                    <p className="mt-2 text-xs text-gray-600">
                      Después de pagar el plan {planInfo.label.split('–')[0].trim()} ({planInfo.monthly} US$/mes), te quedarían {fmtUSD(ganancia_neta_mensual)} de ahorro neto cada mes.
                    </p>
                    {/* Aviso si la ganancia neta es negativa o cero */}
                    {ganancia_neta_mensual <= 0 && (
                      <p className="mt-2 text-xs text-yellow-700">
                        Con los valores actuales no obtendrás ahorro neto mensual. Considera aumentar el % de tiempo ahorrado o el número de personas.
                      </p>
                    )}
                  </div>

                  <div className="rounded-lg border bg-white p-3">
                    <div className="text-xs text-gray-600">Recuperas tu inversión en</div>
                    <div className="mt-1 text-xl font-semibold text-gray-900">
                      {Number.isFinite(payback_meses) && payback_meses !== Infinity ? `${Math.round(payback_meses * 10) / 10} meses` : '—'}
                    </div>
                    <p className="mt-2 text-xs text-gray-600">
                      {Number.isFinite(payback_meses) && payback_meses !== Infinity
                        ? `En aproximadamente ${Math.round(payback_meses * 10) / 10} meses recuperarías la configuración inicial de tu agente de IA.`
                        : 'Con estos datos el plan no se paga solo. Prueba ajustando el % de tiempo ahorrado o el número de personas.'}
                    </p>
                  </div>

                  <div className="rounded-lg border bg-white p-3">
                    <div className="text-xs text-gray-600">Impacto anual</div>
                    <div className="mt-1 text-sm text-gray-700">Ahorro anual: <span className="font-semibold">{fmtUSD(ahorro_anual)}</span></div>
                    <div className="mt-1 text-sm text-gray-700">ROI estimado primer año: <span className="font-semibold">{Math.round(roi_anual_porcentaje)}%</span></div>
                    <p className="mt-2 text-xs text-gray-600">
                      En 12 meses, esto representa un ahorro total y una estimación de retorno sobre la inversión inicial.
                    </p>
                  </div>
                </div>

                {/* Resumen humano */}
                <div className="rounded-lg border border-gray-100 bg-gray-50 p-3 text-sm text-gray-700">
                  <strong>🔍 Resumen</strong>
                  <p className="mt-2">
                    Hoy tu equipo invierte aproximadamente {fmtUSD(costo_mensual_actual)} al mes en tareas que pueden ser apoyadas por un agente de IA.
                  </p>
                  <p className="mt-2">
                    Con un agente de IA del plan {planInfo.key}, podrías ahorrar {fmtUSD(ahorro_mensual)} al mes, y después de pagar la suscripción te quedarían {fmtUSD(ganancia_neta_mensual)} de ahorro neto mensual.
                  </p>
                  <p className="mt-2">
                    Además, tu equipo recuperaría unas {Math.round(horas_ahorradas_mes * 10) / 10} horas al mes, que pueden dedicarse a ventas, estrategia o atención de mayor calidad.
                  </p>
                  <p className="mt-2">
                    En 12 meses, esto representa un ahorro total de {fmtUSD(ahorro_anual)} y un retorno estimado de {Math.round(roi_anual_porcentaje)}% sobre la inversión inicial.
                  </p>
                </div>

                <a
                  className="inline-block w-full"
                  href={`https://wa.me/51939140886`}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <Button className="mt-3 w-full bg-gradient-to-r from-green-600 to-green-700" disabled={hasErrors}>
                    Solicitar consulta gratuita
                  </Button>
                </a>

                {/* Mensaje general de errores si existen */}
                {hasErrors && (
                  <div className="mt-2 rounded border border-red-100 bg-red-50 p-2 text-sm text-red-700">
                    Algunos valores requieren corrección antes de solicitar la consulta. Revisa los campos marcados en rojo.
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
