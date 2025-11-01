/** 
 * Componente Footer para SmartPrompt Solutions (tono español)
 * - Navegación, enlaces sociales, copy de posicionamiento corto
 * - Elimina números de teléfono visibles en favor de un CTA de texto que abre WhatsApp (+51) 939 140 886
 */

import { Link } from 'react-router'
import { Brain, Mail, MapPin, Linkedin, Twitter, Github } from 'lucide-react'
import { trackEvent } from '../utils/analytics'

/** Navegación y enlaces sociales */
const navigation = {
  main: [
    { name: 'Inicio', href: '/' },
    { name: 'Servicios', href: '/products' },
    { name: 'Nosotros', href: '/about' },
    { name: 'Soluciones', href: '/solutions' },
    { name: 'Contacto', href: '/contact' },
  ],
  social: [
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/evergreen-latam/', icon: Linkedin },
    { name: 'Twitter', href: 'https://x.com/smart_prompt', icon: Twitter },
    { name: 'GitHub', href: 'https://andrescelemin.github.io/Smart-Prompt/', icon: Github },
  ],
}

export default function Footer() {
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
                <span className="text-sm text-blue-400 font-medium">Solutions</span>
              </div>
            </div>
            <p className="text-gray-300 text-base">
              Construimos GPTs personalizados y flujos de trabajo automatizados adaptados a tu industria — entregando ROI
              medible con calidad empresarial y claridad.
            </p>
            <div className="flex space-x-6">
              {navigation.social.map((item) => (
                <a key={item.name} href={item.href} className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Navegación */}
          <div className="mt-12 xl:mt-0">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Navegación</h3>
            <ul className="mt-4 space-y-4">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link to={item.href} className="text-base text-gray-300 hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Información de contacto (sin números de teléfono visibles) */}
          <div className="mt-12 xl:mt-0">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Contacto</h3>
            <div className="mt-4 space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">info@smartprompt.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">Silicon Valley, CA · Medellín, CO · Trujillo, PE</span>
              </div>
              {/* CTA de texto: Chat de WhatsApp (sin número visible, abre +51 939 140 886) */}
              <div className="pt-2">
                <a
                  href="https://wa.me/51939140886"
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
            <p className="text-gray-400 text-sm">© 2024 SmartPrompt Solutions. Todos los derechos reservados.</p>
            <div className="text-gray-400 text-sm">Transformando industrias con IA especializada por sector</div>
          </div>
        </div>
      </div>
    </footer>
  )
}