import type { Variants } from 'motion/react'

/** Contenedor con stagger para listas y páginas. */
export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}

/** Entrada estándar: fade + slide sutil hacia arriba. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
}
