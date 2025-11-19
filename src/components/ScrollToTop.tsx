/**
 * Componente global para restablecer el scroll al inicio en cada cambio de ruta
 * Soporta hashes (#id) desplazando al elemento indicado si existe
 */
import { useEffect } from 'react'
import { useLocation } from 'react-router'

/**
 * ScrollToTop
 * - Observa pathname/search/hash y lleva la vista al inicio o al ancla
 */
export default function ScrollToTop(): null {
  const location = useLocation()

  useEffect(() => {
    // Si hay hash, intenta desplazar hacia el elemento correspondiente
    if (location.hash) {
      const id = location.hash.replace('#', '')
      const el = document.getElementById(id)
      if (el) {
        // Evitar animaciones para una sensación inmediata de carga de página
        el.scrollIntoView({ behavior: 'auto', block: 'start' })
        return
      }
    }
    // Por defecto, ir al tope de la página
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [location.pathname, location.search, location.hash])

  return null
}
