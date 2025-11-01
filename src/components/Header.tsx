/**
 * Header principal con menú desplegable para móviles
 * Muestra el logo y navegación con funcionalidad de menú hamburguesa
 */
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router'
import { Menu, X } from 'lucide-react'
import { LogoWithWordmark } from './brand/Logo'
import { Button } from './ui/button'

/** Elemento de navegación */
interface NavItem {
  /** Ruta interna */
  to: string
  /** Texto visible */
  label: string
}

/** Genera clases para el enlace activo/inactivo */
function navClasses(active: boolean): string {
  return [
    'text-sm font-medium transition-colors',
    active ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900',
  ].join(' ')
}

/**
 * Header: barra superior con logo, navegación y menú desplegable móvil
 */
export default function Header(): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { pathname } = useLocation()
  
  const nav: NavItem[] = [
    { to: '/', label: 'Inicio' },
    { to: '/products', label: 'Servicios' },
    { to: '/solutions', label: 'Soluciones' },
    { to: '/about', label: 'Nosotros' },
    { to: '/blog', label: 'Blog' },
    { to: '/testimonials', label: 'Testimonios' },
    { to: '/roi-calculator', label: 'Calculadora ROI' },
    { to: '/demo', label: 'Demo' },
    { to: '/contact', label: 'Contacto' },
  ]

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Marca */}
        <Link to="/" aria-label="Ir a inicio" className="flex items-center gap-2">
          <LogoWithWordmark className="h-10 w-10" showText={false} />
        </Link>

        {/* Navegación Desktop */}
        <nav className="hidden items-center gap-6 sm:flex">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className={navClasses(pathname === n.to)}>
              {n.label}
            </Link>
          ))}
        </nav>

        {/* CTA rápido (WhatsApp) */}
        <div className="hidden sm:flex items-center">
          <Button
            asChild
            size="sm"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700"
          >
            <a href="https://wa.me/51939140886" target="_blank" rel="noopener noreferrer">
              Consulta
            </a>
          </Button>
        </div>

        {/* Botón Menú Móvil */}
        <button
          className="sm:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Abrir menú"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Menú Desplegable Móvil */}
      {isMenuOpen && (
        <div className="sm:hidden border-t bg-white/95 backdrop-blur">
          <div className="px-4 py-3 space-y-2">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                  pathname === n.to
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {n.label}
              </Link>
            ))}
            <div className="pt-2 border-t">
              <Button
                asChild
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700"
                onClick={() => setIsMenuOpen(false)}
              >
                <a href="https://wa.me/51939140886" target="_blank" rel="noopener noreferrer">
                  Consulta
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
