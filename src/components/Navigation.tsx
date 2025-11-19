/**
 * Navigation.tsx
 * Centraliza la definición y componentes reutilizables de navegación.
 *
 * - Exporta la lista principal de navegación (mainNavigation) que NO incluye
 *   las entradas eliminadas: "Servicios" (/products) ni "Contacto" (/contact).
 * - Provee un componente MainNav que puede usarse en header/footer u otros lugares.
 */

import React from 'react'
import { Link, useLocation } from 'react-router'

/**
 * NavItem
 * Interfaz para un elemento de navegación.
 */
export interface NavItem {
  /** Ruta interna (to) */
  to: string
  /** Texto visible en el menú */
  label: string
}

/**
 * Lista principal de navegación del sitio.
 * - Mantener en un único punto de verdad para evitar inconsistencias.
 * - NO contiene '/products' ni '/contact' (entradas eliminadas).
 */
export const mainNavigation: NavItem[] = [
  { to: '/', label: 'Inicio' },
  { to: '/solutions', label: 'Soluciones' },
  { to: '/about', label: 'Nosotros' },
  { to: '/blog', label: 'Blog' },
  { to: '/testimonials', label: 'Testimonios' },
  { to: '/roi-calculator', label: 'Calculadora ROI' },
  { to: '/demo', label: 'Demo' },
]

/**
 * MainNav
 * Componente pequeño que renderiza la navegación principal.
 *
 * @param props.className - Clase adicional para el contenedor (opcional)
 * @returns JSX.Element
 */
export function MainNav({ className }: { className?: string }): JSX.Element {
  const { pathname } = useLocation()

  /**
   * navLinkClass
   * Genera las clases CSS para un enlace de navegación según su estado activo.
   */
  function navLinkClass(active: boolean): string {
    return [
      'text-sm font-medium transition-colors',
      active ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900',
    ].join(' ')
  }

  return (
    <nav className={className}>
      <div className="hidden sm:flex items-center gap-6">
        {mainNavigation.map((n) => (
          <Link key={n.to} to={n.to} className={navLinkClass(pathname === n.to)}>
            {n.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default MainNav