/**
 * About.tsx
 * Página "Nosotros" — compone múltiples secciones que presentan la identidad, equipo y metodología de Smart Prompt.
 *
 * Estructura:
 *  - Hero
 *  - Quiénes somos
 *  - Misión / Visión / Valores
 *  - Nuestra historia
 *  - Diferenciadores
 *  - Equipo
 *  - Metodología
 *  - Compromiso
 *  - CTA final
 */

import React from 'react'
import PageSEO from '../components/PageSEO'
import AboutHero from '../components/about/Hero'
import WhoWeAre from '../components/about/WhoWeAre'
import MissionVisionValues from '../components/about/MissionVisionValues'
import OurHistory from '../components/about/OurHistory'
import Differentiators from '../components/about/Differentiators'
import Team from '../components/about/Team'
import Methodology from '../components/about/Methodology'
import Commitment from '../components/about/Commitment'
import AboutFinalCTA from '../components/about/FinalCTA'

/**
 * AboutPage
 * Ensambla y renderiza la página "Nosotros" usando componentes pequeños y reutilizables.
 */
export default function AboutPage(): JSX.Element {
  return (
    <div className="bg-white">
      <PageSEO
        title="Nosotros | Smart Prompt"
        description="Conoce al equipo, misión y metodología de Smart Prompt: diseñamos agentes de IA y automatizaciones para negocios que buscan resultados reales."
      />

      <AboutHero />
      <WhoWeAre />
      <MissionVisionValues />
      <OurHistory />
      <Differentiators />
      <Team />
      <Methodology />
      <Commitment />
      <AboutFinalCTA />
    </div>
  )
}