import { useEffect, useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { formatUSD, parseMoney, round2 } from '@/lib/money'

interface MoneyInputProps {
  value: number
  onCommit: (value: number) => void
  placeholder?: string
  className?: string
  id?: string
}

/**
 * Input de dinero controlado y robusto:
 * - Se edita libremente y confirma en blur.
 * - Ante texto no parseable, CONSERVA el valor anterior (no lo borra a 0).
 * - Se re-sincroniza y reformatea cuando el valor cambia por fuera.
 */
export function MoneyInput({ value, onCommit, placeholder, className, id }: MoneyInputProps) {
  const [raw, setRaw] = useState(() => (value ? formatUSD(value) : ''))
  const lastValue = useRef(value)

  useEffect(() => {
    if (value !== lastValue.current) {
      lastValue.current = value
      setRaw(value ? formatUSD(value) : '')
    }
  }, [value])

  const commit = () => {
    if (raw.trim() === '') {
      lastValue.current = 0
      onCommit(0)
      setRaw('')
      return
    }
    const parsed = parseMoney(raw)
    if (!Number.isFinite(parsed)) {
      setRaw(value ? formatUSD(value) : '')
      return
    }
    const rounded = round2(parsed)
    lastValue.current = rounded
    onCommit(rounded)
    setRaw(formatUSD(rounded))
  }

  return (
    <Input
      id={id}
      type="text"
      inputMode="decimal"
      value={raw}
      placeholder={placeholder}
      onChange={(e) => setRaw(e.target.value)}
      onBlur={commit}
      className={cn('rounded-lg', className)}
    />
  )
}
