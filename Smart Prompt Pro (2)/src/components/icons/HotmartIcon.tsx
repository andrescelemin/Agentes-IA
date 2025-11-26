/**
 * HotmartIcon.tsx
 * Renderiza el logotipo oficial de Hotmart como imagen para garantizar fidelidad visual.
 * - Sustituye cualquier SVG simplificado por el recurso original.
 * - Mantiene una API simple con props de tamaño y className.
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
 * HotmartIcon
 * Muestra el logo oficial de Hotmart usando la imagen subida al proyecto.
 */
export default function HotmartIcon({
  size = 24,
  className,
  title = 'Hotmart logo',
}: IconImageProps): JSX.Element {
  // Usamos el recurso subido al proyecto (últimos archivos proporcionados).
  const SRC =
    'https://pub-cdn.sider.ai/u/U04XH6E0RRN/web-coder/68902b460cd2d7c5a266e6a1/resource/09f38153-5ac6-476f-a6f8-f0c99b971c2a.png'

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
