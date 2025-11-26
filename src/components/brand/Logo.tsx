/**
 * Componente de Marca (Logo)
 * Centraliza el uso del logo principal y expone componentes reutilizables con tamaños uniformes.
 * Al actualizar LOGO_URL, el cambio se propaga a Header, Favicon y cualquier lugar que use estos componentes.
 */

import React from 'react'

/**
 * URL del logo principal de Smart Prompt.
 * TODO: Reemplazar por la URL directa del logo provisto por el usuario (círculo azul con "SMART PROMPT").
 */
export const LOGO_URL =
  'https://pub-cdn.sider.ai/u/U04XH6E0RRN/web-coder/68902b460cd2d7c5a266e6a1/resource/584138bb-e788-4e5e-8b2d-0c13a3048e5e.png'

/** Props comunes para componentes de logo */
interface LogoProps {
  /** Clases adicionales de Tailwind */
  className?: string
  /** Texto alternativo accesible */
  alt?: string
}

/**
 * LogoMark: versión cuadrada del logo (solo imagen).
 * Usa altura/anchura uniformes para mantener consistencia en la UI.
 */
export function LogoMark({
  className = 'h-10 w-10',
  alt = 'Smart Prompt logo',
}: LogoProps) {
  return (
    <img
      src={LOGO_URL}
      alt={alt}
      className={`select-none rounded-md object-contain ${className}`}
      draggable={false}
    />
  )
}

/**
 * Props para el componente combinado (ícono + texto).
 */
interface LogoWithWordmarkProps extends LogoProps {
  /**
   * Controla si se muestra el texto "Smart Prompt" junto al ícono.
   * Útil cuando el asset ya incluye el wordmark para evitar duplicados.
   */
  showText?: boolean
}

/**
 * LogoWithWordmark: ícono a la izquierda y texto a la derecha con buen contraste.
 * Permite ocultar el texto con la prop `showText` cuando el asset ya incluye el wordmark.
 */
export function LogoWithWordmark({
  className = 'h-10 w-10',
  alt = 'Smart Prompt logo',
  showText = true,
}: LogoWithWordmarkProps) {
  return (
    <div className="flex items-center gap-2">
      <LogoMark className={className} alt={alt} />
      {showText && (
        <span className="hidden text-base font-semibold text-gray-900 sm:inline">
          Smart Prompt
        </span>
      )}
    </div>
  )
}
