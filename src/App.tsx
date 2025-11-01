/**
 * App.tsx
 * Aplicación principal con enrutamiento para SmartPrompt Solutions.
 * - Monta proveedores globales (MetaPixel, FacebookEvents, Favicon) y layout.
 * - Usa react-router (HashRouter) según las restricciones del entorno.
 */

import { HashRouter, Route, Routes } from 'react-router'
import HomePage from './pages/Home'
import ProductsPage from './pages/Products'
import AboutPage from './pages/About'
import SolutionsPage from './pages/Solutions'
import ContactPage from './pages/Contact'
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
import Favicon from './components/Favicon'
import FacebookEvents from './components/FacebookEvents'

/**
 * Componente principal de la SPA.
 * - Restablece el scroll en cambio de ruta.
 * - Inyecta Meta Pixel y escucha eventos de conversión globales.
 * - Renderiza layout base con Header/Footer y contenido por rutas.
 */
export default function App(): JSX.Element {
  return (
    <HashRouter>
      {/* Restablece el scroll al cambiar de ruta para evitar quedar al pie (footer) */}
      <ScrollToTop />
      {/* Píxel de Meta instalado en todas las páginas + PageView en SPA */}
      <MetaPixel />
      {/* Delegación global de clics para eventos (WhatsApp, Lead, Contact, Tel) */}
      <FacebookEvents />
      {/* Favicon personalizado basado en el logo de SmartPrompt */}
      <Favicon />
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/solutions" element={<SolutionsPage />} />
            <Route path="/contact" element={<ContactPage />} />
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
