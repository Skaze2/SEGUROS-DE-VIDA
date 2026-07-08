import { useEffect, useRef } from 'react'
import { animate, useMotionValue } from 'motion/react'

interface CountUpProps {
  value: number
  format: (value: number) => string
  className?: string
  duration?: number
}

/** Número animado con conteo (count-up) escrito directo al DOM para evitar re-renders por frame. */
export function CountUp({ value, format, className, duration = 0.8 }: CountUpProps) {
  const motionValue = useMotionValue(0)
  const spanRef = useRef<HTMLSpanElement>(null)
  const formatRef = useRef(format)
  formatRef.current = format

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration,
      ease: 'easeOut',
      onUpdate: (latest) => {
        if (spanRef.current) {
          spanRef.current.textContent = formatRef.current(latest)
        }
      },
    })
    return () => controls.stop()
  }, [motionValue, value, duration])

  return (
    <span ref={spanRef} className={className}>
      {format(0)}
    </span>
  )
}
