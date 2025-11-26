/**
 * FinalCTA.tsx
 * Sección final de llamada a la acción para agendar demo o ver servicios.
 *
 * Incluye botones principales visibles y microcopy de confianza.
 */

import React from 'react'
import { Button } from '../../components/ui/button'
import { Link } from 'react-router'

/**
 * AboutFinalCTA
 * Llamado a la acción para impulsar conversaciones comerciales.
 */
export default function AboutFinalCTA(): JSX.Element {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-white py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
        <h3 className="text-2xl font-bold text-gray-900">¿Listo para llevar tu negocio al siguiente nivel?</h3>
        <p className="mt-3 text-gray-700">
          Hablemos sobre lo que tu empresa necesita y diseñemos juntos la mejor forma de aplicar Inteligencia Artificial en tu operación.
        </p>

        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button asChild className="bg-gradient-to-r from-blue-600 to-indigo-600">
            <Link to="/demo">Agendar una demo</Link>
          </Button>

          <Button asChild variant="outline" className="bg-transparent border-gray-300 text-gray-700">
            <Link to="/products">Ver servicios</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}