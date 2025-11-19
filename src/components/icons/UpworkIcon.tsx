/**
 * UpworkIcon.tsx
 * Renderiza el logotipo oficial de Upwork como imagen para mantener identidad de marca.
 * - Sustituye cualquier versión simplificada por el recurso original.
 * - API simple con props de tamaño y className.
 */

import React from 'react'

/**
 * Props para el componente de imagen de logotipo.
 */
export interface IconImageProps {
  /** Tamaño en píxeles para width/height (cuadrado). */
  size?: number
  /** Clases adicionales para estilado (ej. Tailwind). */
  className?: string
  /** Título accesible (opcional). */
  title?: string
}

/**
 * UpworkIcon
 * Muestra el logo oficial de Upwork usando la imagen subida al proyecto.
 */
export default function UpworkIcon({
  size = 24,
  className,
  title = 'Upwork logo',
}: IconImageProps): JSX.Element {
  // Usamos el recurso subido al proyecto (últimos archivos proporcionados).
  const SRC =
    'https://pub-cdn.sider.ai/u/U04XH6E0RRN/web-coder/68902b460cd2d7c5a266e6a1/resource/1d83b41f-754c-4ec5-a7a8-bcf10302f988.png'

  return (
    <img
      src={SRC}
      width={size}
      height={size}
      alt={title}
      className={['object-contain', className].filter(Boolean).join(' ')}
      loading="lazy"
    />
  )
}
