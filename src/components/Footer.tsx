/**
 * Footer.tsx
 * Footer principal del sitio.
 *
 * - Renderiza navegación, enlaces sociales y datos de contacto.
 * - NO incluye "Servicios" (/products) ni "Contacto" (/contact) en la navegación.
 */

import React from 'react'
import { Link } from 'react-router'
import { Brain, Mail, MapPin, Linkedin } from 'lucide-react'
import { trackEvent } from '../utils/analytics'
import UpworkIcon from './icons/UpworkIcon'
import HotmartIcon from './icons/HotmartIcon'
import { WHATSAPP_LINK } from '../config/contact'
import { mainNavigation } from './Navigation'

/**
 * SocialItem
 * Tipado para los iconos/links sociales.
 */
interface SocialItem {
  name: string
  href: string
  IconComponent: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

/**
 * Social links estáticos (sin relación con navegación principal).
 */
const social: SocialItem[] = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/evergreen-latam/',
    IconComponent: Linkedin,
  },
  {
    name: 'Upwork',
    href:
      'https://www.upwork.com/services/product/development-it-your-custom-ai-agent-in-just-48-hours-1960380554091163349?ref=project_share&tier=1',
    IconComponent: UpworkIcon,
  },
  {
    name: 'Hotmart',
    href:
      'https://andrescelemincardoso.hotmart.host/smart-fox-agentes-de-ia-para-negocios-350f922e-86c5-479a-a135-a65acf8cfd93',
    IconComponent: HotmartIcon,
  },
]

/**
 * Footer
 * - Muestra el bloque de navegación (usando mainNavigation) sin las páginas eliminadas.
 */
export default function Footer(): JSX.Element {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Información de la empresa */}
          <div className="space-y-8 xl:col-span-1">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold">SmartPrompt</span>
                <span className="text-sm text-blue-400 font-medium">Consulting</span>
              </div>
            </div>
            <p className="text-gray-300 text-base">
              Agentes de IA hechos para tu negocio. Automatiza tareas, reduce costos y aumenta tus ventas con soluciones diseñadas para generar ROI inmediato y medible.
            </p>

            {/* Iconos sociales */}
            <div className="flex space-x-6">
              {social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                  onClick={() => {
                    trackEvent && trackEvent('social_click', { network: item.name, location: 'footer' })
                  }}
                >
                  <span className="sr-only">{item.name}</span>
                  <item.IconComponent className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Navegación (desde mainNavigation) */}
          <div className="mt-12 xl:mt-0">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Navegación</h3>
            <ul className="mt-4 space-y-4">
              {mainNavigation.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-base text-gray-300 hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div className="mt-12 xl:mt-0">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Contacto</h3>
            <div className="mt-4 space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">info@smartprompt.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">Medellín, CO · Trujillo, PE</span>
              </div>
              <div className="pt-2">
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('whatsapp_click', { location: 'footer_text_cta' })}
                  className="text-blue-400 hover:text-blue-300 underline underline-offset-4"
                >
                  Chatear por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Fila inferior */}
        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-gray-400 text-sm">© 2024 SmartPrompt Consulting. Todos los derechos reservados.</p>
            <div className="text-gray-400 text-sm">Transformando industrias con IA especializada por sector</div>
          </div>
        </div>
      </div>
    </footer>
  )
}