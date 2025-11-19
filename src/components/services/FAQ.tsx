/**
 * FAQ.tsx
 * Preguntas frecuentes en formato accesible usando <details>.
 */

import React from 'react'

const faqs = [
  {
    q: '¿Necesito saber de programación para trabajar con ustedes?',
    a: 'No. Nuestro equipo se encarga de la implementación técnica. Tú defines objetivos y contenido; nosotros transformamos eso en un agente funcional.',
  },
  {
    q: '¿Cuánta información necesito para entrenar a mi agente de IA?',
    a: 'Con material básico (FAQ, políticas, catálogo, ejemplos de conversación) podemos crear un primer agente y luego ir mejorándolo con datos reales.',
  },
  {
    q: '¿Puedo empezar con algo pequeño y luego escalar?',
    a: 'Sí. Ofrecemos soluciones modulares: arrancamos con un flujo básico y ampliamos según resultados y prioridades.',
  },
  {
    q: '¿Qué pasa si no quedo conforme con el resultado?',
    a: 'Trabajamos en ciclos de ajuste. Si algo no funciona como esperas, proponemos mejoras y calibraciones hasta obtener resultados útiles para tu operación.',
  },
]

export default function FAQ(): JSX.Element {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-3xl px-6">
        <h3 className="text-2xl font-bold text-gray-900">Preguntas frecuentes</h3>
        <div className="mt-4 space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="group rounded-lg border border-gray-100 p-4">
              <summary className="cursor-pointer list-none font-semibold text-gray-900">{f.q}</summary>
              <div className="mt-2 text-gray-700 text-sm">{f.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}