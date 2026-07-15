import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Check, MapPin, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { STATE_ABBREVIATIONS } from '@/features/direcciones/addressData'

/** Solo 50 estados + DC (los territorios no aplican a las guías FPL del Marketplace). */
const TERRITORIES = new Set(['PR', 'VI', 'GU', 'AS', 'MP'])
export const US_STATES = STATE_ABBREVIATIONS.filter((s) => !TERRITORIES.has(s.abbr))

function normalize(value: string) {
  return value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
}

interface StateComboboxProps {
  /** Abreviatura seleccionada (p.ej. "FL") o null si no hay estado elegido. */
  value: string | null
  onChange: (abbr: string | null) => void
  placeholder?: string
  id?: string
}

/**
 * Autocompletado de estados: escribe las primeras letras (p.ej. "flo") y
 * elige entre las sugerencias. Selección vacía = tabla federal (48 estados + DC).
 */
export function StateCombobox({ value, onChange, placeholder, id }: StateComboboxProps) {
  const selected = useMemo(() => US_STATES.find((s) => s.abbr === value) ?? null, [value])
  const [query, setQuery] = useState(selected?.label ?? '')
  const [open, setOpen] = useState(false)
  const [highlight, setHighlight] = useState(0)
  const rootRef = useRef<HTMLDivElement | null>(null)

  // Re-sincroniza el texto cuando la selección cambia desde fuera (cargar cálculo, reset)
  useEffect(() => {
    setQuery(selected?.label ?? '')
  }, [selected])

  const matches = useMemo(() => {
    const q = normalize(query)
    if (!q) return []
    const starts = US_STATES.filter((s) => normalize(s.label).startsWith(q))
    const contains = US_STATES.filter(
      (s) =>
        !normalize(s.label).startsWith(q) &&
        (normalize(s.label).includes(q) || s.abbr.toLowerCase() === q),
    )
    return [...starts, ...contains].slice(0, 8)
  }, [query])

  // Cierra al hacer clic fuera
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [])

  const pick = (abbr: string) => {
    onChange(abbr)
    setOpen(false)
  }

  const clear = () => {
    onChange(null)
    setQuery('')
    setOpen(false)
  }

  return (
    <div ref={rootRef} className="relative">
      <div className="relative">
        <MapPin className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-secondary" />
        <Input
          id={id}
          type="text"
          role="combobox"
          aria-expanded={open && matches.length > 0}
          aria-autocomplete="list"
          placeholder={placeholder ?? 'Ej: Flo… → Florida'}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
            setHighlight(0)
            // Editar el texto invalida la selección previa hasta elegir de nuevo
            if (selected && e.target.value !== selected.label) onChange(null)
          }}
          onFocus={() => query && setOpen(true)}
          onKeyDown={(e) => {
            if (!open || matches.length === 0) return
            if (e.key === 'ArrowDown') {
              e.preventDefault()
              setHighlight((h) => Math.min(h + 1, matches.length - 1))
            } else if (e.key === 'ArrowUp') {
              e.preventDefault()
              setHighlight((h) => Math.max(h - 1, 0))
            } else if (e.key === 'Enter') {
              e.preventDefault()
              pick(matches[highlight].abbr)
            } else if (e.key === 'Escape') {
              setOpen(false)
            }
          }}
          className="rounded-xl pl-9 pr-16"
        />
        <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1">
          {selected && (
            <Badge className="border-brand/40 bg-brand/15 text-[10px] text-brand-strong">
              {selected.abbr}
            </Badge>
          )}
          {(selected || query) && (
            <button
              type="button"
              onClick={clear}
              aria-label="Quitar estado"
              className="flex size-5 items-center justify-center rounded-md text-text-secondary transition-colors hover:bg-foreground/10 hover:text-foreground"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {open && matches.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            role="listbox"
            className="absolute z-20 mt-1 w-full overflow-hidden rounded-xl border border-border bg-popover shadow-lg"
          >
            {matches.map((state, index) => (
              <li key={state.abbr} role="option" aria-selected={state.abbr === value}>
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => pick(state.abbr)}
                  onMouseEnter={() => setHighlight(index)}
                  className={cn(
                    'flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-sm transition-colors',
                    index === highlight
                      ? 'bg-brand/15 text-foreground'
                      : 'text-foreground hover:bg-foreground/5',
                  )}
                >
                  <span className="min-w-0 truncate">{state.label}</span>
                  <span className="flex shrink-0 items-center gap-1.5 text-xs text-text-secondary">
                    {state.abbr}
                    {state.abbr === value && <Check className="size-3.5 text-brand-strong" />}
                  </span>
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
