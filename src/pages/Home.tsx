/**
 * Página de inicio de alto rendimiento (tono español)
 * Secciones: Hero, Valor, Medios, Social, Precios, Contacto en línea
 * SEO listo con PageSEO y JSON-LD mínimo (Organización)
 */

import { useEffect } from 'react'
import { Link } from 'react-router'
import PageSEO from '../components/PageSEO'
import LandingHero from '../components/landing/Hero'
import LandingValue from '../components/landing/Value'
import LandingMedia from '../components/landing/Media'
import LandingSocial from '../components/landing/Social'
import LandingPricing from '../components/landing/Pricing'
import LandingIntegrations from '../components/landing/Integrations'

/** HomePage: landing compuesta usando secciones reutilizables */
export default function HomePage(): JSX.Element {
  useEffect(() => {
    document.title = 'Smart Fox AI — Agentes de IA y Workflows que ejecutan tu negocio'
  }, [])

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Smart Fox AI',
    url: 'https://smartprompt.example',
    logo:
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    sameAs: ['https://www.linkedin.com/', 'https://twitter.com/', 'https://github.com/'],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+57 316 757 1848',
        contactType: 'soporte al cliente',
        areaServed: 'CO',
        availableLanguage: ['es', 'en'],
      },
      {
        '@type': 'ContactPoint',
        telephone: '+51 939 140 886',
        contactType: 'soporte al cliente',
        areaServed: 'PE',
        availableLanguage: ['es', 'en'],
      },
      {
        '@type': 'ContactPoint',
        telephone: '+1 555 987 6543',
        contactType: 'soporte al cliente',
        areaServed: 'US',
        availableLanguage: ['es', 'en'],
      },
    ],
  }

  return (
    <div className="bg-white">
      <PageSEO
        title="Smart Fox AI — Agentes de IA y Workflows que ejecutan tu negocio"
        description="Diseñamos agentes de IA especializados y workflows automatizados que entienden tu contexto profesional, reducen tiempos críticos y estandarizan calidad. Integra IA que habla el idioma de tu sector y se conecta con tus herramientas."
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <LandingHero />
      <LandingValue />
      <LandingMedia />
      <LandingIntegrations />
      <LandingSocial />
      <LandingPricing />

      {/* CTA final reemplazando formulario */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            ¿Listo Para Transformar Tu Empresa Con IA Especializada?
          </h2>
          <p className="mt-6 text-lg leading-8 text-green-100">
            Agenda tu consulta estratégica gratuita y descubre exactamente cómo la IA especializada puede transformar tu negocio.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="https://wa.me/51939140886"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-md bg-white px-8 py-4 text-lg sm:text-xl font-semibold text-green-700 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <span>🎯 Obtener Mi Análisis Personalizado Gratuito</span>
            </a>
            <Link
              to="/solutions"
              className="inline-flex items-center gap-2 rounded-md border border-white/80 bg-transparent px-6 py-3 text-lg font-semibold text-white hover:bg-white/10 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <span>Ver casos reales con resultados</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
          <p className="mt-4 text-sm text-green-200">
            Respuesta en menos de 5 minutos • Consulta gratuita • Especialista asignado
          </p>
        </div>
      </section>
    </div>
  )
}