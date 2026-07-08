import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface GradientCardProps {
  children: ReactNode
  className?: string
  innerClassName?: string
}

/** Card con borde-gradiente que se desvanece a transparente (wrapper p-px + fondo interior). */
export function GradientCard({ children, className, innerClassName }: GradientCardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl bg-gradient-to-b from-neon-magenta/40 via-white/10 to-transparent p-px',
        className,
      )}
    >
      <div className={cn('h-full rounded-[calc(1rem-1px)] bg-card-bg', innerClassName)}>
        {children}
      </div>
    </div>
  )
}
