/**
 * App.tsx
 * Componente principal de la SPA.
 *
 * - Monta proveedores globales y layout (Header, Footer).
 * - Incluye EnforceWhatsAppLinks para garantizar enlaces de WhatsApp correctos en runtime.
 * - Usa HashRouter (preinstalado) y Routes para manejar la navegación interna.
 */

import './styles/mobile-buttons.css'
import { HashRouter, Route, Routes } from 'react-router'
import HomePage from './pages/Home'
import AboutPage from './pages/About'
import SolutionsPage from './pages/Solutions'
import ROICalculatorPage from './pages/ROICalculator'
import DemoPage from './pages/Demo'
import BlogPage from './pages/Blog'
import TestimonialsPage from './pages/Testimonials'
import Header from './components/Header'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'
import MobileCTA from './components/MobileCTA'
import CaseDetailPage from './pages/CaseDetail'
import BlogDetailPage from './pages/BlogDetail'
import ScrollToTop from './components/ScrollToTop'
import MetaPixel from './components/MetaPixel'
import EnforceWhatsAppLinks from './components/EnforceWhatsAppLinks'
import Favicon from './components/Favicon'
import FacebookEvents from './components/FacebookEvents'

/**
 * App
 * Componente raíz que organiza la aplicación.
 *
 * - Evita caracteres o textos visibles no deseados en el DOM.
 * - Se asegura de que EnforceWhatsAppLinks se ejecute en todas las rutas.
 */
export default function App(): JSX.Element {
  return (
    <HashRouter>
      {/* Restablece el scroll al cambiar de ruta */}
      <ScrollToTop />

      {/* Ejecutar utilitarios/trackers globales */}
      <MetaPixel />
      <FacebookEvents />
      <Favicon />

      {/* Asegura en runtime que todos los enlaces de WhatsApp/tel apunten al WHATSAPP_LINK */}
      <EnforceWhatsAppLinks />

      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/solutions" element={<SolutionsPage />} />
            <Route path="/roi-calculator" element={<ROICalculatorPage />} />
            <Route path="/demo" element={<DemoPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogDetailPage />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route path="/case/:slug" element={<CaseDetailPage />} />
          </Routes>
        </main>
        <Footer />
        <Chatbot />
        <MobileCTA />
      </div>
    </HashRouter>
  )
}