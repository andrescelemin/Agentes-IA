/**
 * Calculadora de ROI
 * Mejora la claridad de "costos actuales semanales" con un estimador inteligente por rol,
 * desglose visible y cálculos transparentes.
 */

import { useMemo, useState } from 'react'
import PageSEO from '../components/PageSEO'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Button } from '../components/ui/button'

/** RolePreset: preset de costos típicos por rol */
interface RolePreset {
  label: string
  hourly: number
  hoursPerWeek: number
}

/** ROIInputs: entradas del formulario */
interface ROIInputs {
  employees: number
  role: string
  hourly: number
  hoursPerWeek: number
  timeSavedPct: number
  implementationCost: number
  monthlySubscription: number
}

/** ROICalculatorPage: calcula y explica el ROI de forma clara */
export default function ROICalculatorPage(): JSX.Element {
  const WHATSAPP_URL = 'https://wa.me/51939140886'

  const presets: Record<string, RolePreset> = {
    Legal: { label: 'Legal', hourly: 45, hoursPerWeek: 10 },
    Marketing: { label: 'Marketing', hourly: 35, hoursPerWeek: 12 },
    'Atención al Cliente': { label: 'Atención al Cliente', hourly: 22, hoursPerWeek: 15 },
    Salud: { label: 'Salud', hourly: 40, hoursPerWeek: 8 },
  }

  const [inputs, setInputs] = useState<ROIInputs>({
    employees: 5,
    role: 'Legal',
    hourly: presets.Legal.hourly,
    hoursPerWeek: presets.Legal.hoursPerWeek,
    timeSavedPct: 40,
    implementationCost: 1200,
    monthlySubscription: 200,
  })

  /** setField: actualiza un campo del estado */
  const setField = <K extends keyof ROIInputs>(key: K, value: number | string) => {
    setInputs((p) => ({ ...p, [key]: typeof value === 'string' ? (value as unknown as number) : value }))
  }

  /** currentWeeklyCost: costo actual semanal deducido (empleados * tarifa * horas) */
  const currentWeeklyCost = useMemo(() => {
    const employees = Math.max(0, inputs.employees)
    const hourly = Math.max(0, inputs.hourly)
    const hours = Math.max(0, inputs.hoursPerWeek)
    return employees * hourly * hours
  }, [inputs.employees, inputs.hourly, inputs.hoursPerWeek])

  /** savings: cálculos de ahorro y ROI */
  const { weeklySavings, monthlySavings, annualSavings, netMonthlyGain, paybackMonths, roiAnnualPct } = useMemo(() => {
    const savedFraction = Math.min(100, Math.max(0, inputs.timeSavedPct)) / 100
    const weeklySavings = currentWeeklyCost * savedFraction
    const monthlySavings = weeklySavings * 4.33
    const annualSavings = weeklySavings * 52
    const netMonthlyGain = monthlySavings - inputs.monthlySubscription
    const paybackMonths = netMonthlyGain > 0 ? inputs.implementationCost / netMonthlyGain : Infinity
    const totalCostYear = inputs.implementationCost + inputs.monthlySubscription * 12
    const netYear = annualSavings - inputs.monthlySubscription * 12 - inputs.implementationCost
    const roiAnnualPct = totalCostYear > 0 ? (netYear / totalCostYear) * 100 : 0
    return { weeklySavings, monthlySavings, annualSavings, netMonthlyGain, paybackMonths, roiAnnualPct }
  }, [currentWeeklyCost, inputs.timeSavedPct, inputs.monthlySubscription, inputs.implementationCost])

  /** handlePreset: aplica un preset y recalcula */
  const handlePreset = (role: string) => {
    const p = presets[role]
    setInputs((prev) => ({
      ...prev,
      role,
      hourly: p.hourly,
      hoursPerWeek: p.hoursPerWeek,
    }))
  }

  /** fmt: formato moneda */
  const fmt = (n: number) =>
    new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n || 0)

  return (
    <div className="bg-white">
      <PageSEO
        title="Calculadora de ROI | SmartPrompt Solutions"
        description="Calcula tu ROI en minutos. Estimamos costos actuales por rol, proyectamos ahorros y mostramos tu recuperación con Agentes de IA especializados."
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-800">
            Calculadora de ROI
          </div>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Calcula tu ROI en minutos
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Selecciona tu rol y te sugerimos tarifa y horas típicas basadas en presets reales. Ajusta los valores y obtén una proyección clara de ahorros y payback.
          </p>
        </div>
      </section>

      {/* Formulario y resultados */}
      <section className="py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 lg:grid-cols-3 lg:px-8">
          {/* Entradas */}
          <Card className="lg:col-span-2 border-blue-100">
            <CardHeader>
              <CardTitle className="text-gray-900">Parámetros</CardTitle>
              <CardDescription className="text-gray-600">
                Ajusta los valores o usa un preset para deducir tus costos actuales semanales.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <Label>Rol / Área</Label>
                  <Select value={inputs.role} onValueChange={(v) => handlePreset(v)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Selecciona un rol" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(presets).map((k) => (
                        <SelectItem key={k} value={k}>
                          {presets[k].label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Número de colaboradores</Label>
                  <Input
                    type="number"
                    min={0}
                    className="mt-2"
                    value={inputs.employees}
                    onChange={(e) => setField('employees', Number(e.target.value))}
                  />
                </div>

                <div>
                  <Label>Tarifa por hora (USD)</Label>
                  <Input
                    type="number"
                    min={0}
                    className="mt-2"
                    value={inputs.hourly}
                    onChange={(e) => setField('hourly', Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Horas por semana dedicadas</Label>
                  <Input
                    type="number"
                    min={0}
                    className="mt-2"
                    value={inputs.hoursPerWeek}
                    onChange={(e) => setField('hoursPerWeek', Number(e.target.value))}
                  />
                </div>

                <div>
                  <Label>% de tiempo ahorrado estimado</Label>
                  <Input
                    type="number"
                    min={0}
                    max={100}
                    className="mt-2"
                    value={inputs.timeSavedPct}
                    onChange={(e) => setField('timeSavedPct', Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Costo de implementación (único)</Label>
                  <Input
                    type="number"
                    min={0}
                    className="mt-2"
                    value={inputs.implementationCost}
                    onChange={(e) => setField('implementationCost', Number(e.target.value))}
                  />
                </div>

                <div>
                  <Label>Suscripción mensual (USD)</Label>
                  <Input
                    type="number"
                    min={0}
                    className="mt-2"
                    value={inputs.monthlySubscription}
                    onChange={(e) => setField('monthlySubscription', Number(e.target.value))}
                  />
                </div>
              </div>

              {/* Explicación de costos actuales semanales */}
              <div className="rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm text-blue-900">
                <strong>Cómo deducimos tus costos actuales semanales:</strong> multiplicamos colaboradores × tarifa por
                hora × horas semanales dedicadas. Puedes ajustar cualquiera de los valores según tu equipo.
              </div>
            </CardContent>
          </Card>

          {/* Resultados */}
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="text-gray-900">Resultados</CardTitle>
              <CardDescription className="text-gray-600">
                Ahorros, retorno y periodo de recuperación.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Costos actuales semanales</span>
                  <span className="font-semibold text-gray-900">{fmt(currentWeeklyCost)}</span>
                </div>
                <p className="mt-2 text-xs text-gray-600">
                  Según tus parámetros: {inputs.employees} colab. × {fmt(inputs.hourly)} × {inputs.hoursPerWeek} h.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Metric label="Ahorro semanal" value={fmt(weeklySavings)} />
                <Metric label="Ahorro mensual" value={fmt(monthlySavings)} />
                <Metric label="Ahorro anual" value={fmt(annualSavings)} />
                <Metric label="Ganancia neta mensual" value={fmt(netMonthlyGain)} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Metric
                  label="Payback (meses)"
                  value={Number.isFinite(paybackMonths) ? paybackMonths.toFixed(1) : '—'}
                />
                <Metric label="ROI anual (%)" value={`${roiAnnualPct.toFixed(0)}%`} />
              </div>

              <Button
                asChild
                className="mt-4 w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
              >
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  Solicitar consulta gratuita
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}

/** Metric: pequeño componente para mostrar una métrica */
function Metric({ label, value }: { label: string; value: string }): JSX.Element {
  return (
    <div className="rounded-lg border bg-white p-3">
      <div className="text-xs text-gray-600">{label}</div>
      <div className="mt-1 text-lg font-semibold text-gray-900">{value}</div>
    </div>
  )
}
